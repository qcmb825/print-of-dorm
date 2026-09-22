# -*- coding: utf-8 -*-
"""把「散在各处」的运行期数据搬进统一的 DATA_DIR。

背景（为什么要有这个脚本）：
    这套服务的数据一度分在两个地方 —— 库文件在 `data/`，上传的打印件却在
    `D:/print/print_files/`，日志又在项目根的 `logs/`。后果是**换服务器时只拷 `data/`
    过去，订单记录都在、文件全找不到**：`orders.file_path` 存的是**绝对路径**，
    换台机器就是另一套前缀，而这种错要等学生点下载才暴露。

现在的纪律：`config.DATA_DIR` 是运行期数据的唯一根，库里、上传件、收款码、二维码、
日志全在它下面。想放数据盘就在 `.env` 里改 `DATA_DIR`；本脚本负责把**存量**数据搬过去。

它做两件事，缺一不可：
    ① 移动文件（默认假设同一块盘，用重命名；跨盘自动退化成复制 + 删源）；
    ② 改库里所有指向旧目录的路径 —— 只搬文件不改库，等于把每一单都指空。

用法：
    # 先看要搬什么（默认就是预演，什么都不改）
    .venv/Scripts/python.exe scripts/migrate_data_root.py
    # 确认无误再落盘
    .venv/Scripts/python.exe scripts/migrate_data_root.py --apply

安全约定：
  * 默认预演；`--apply` 才动手。
  * 搬之前**先备份数据库**（脚本自己会做一份 `.bak-<时间戳>`），再动文件。
  * 目标目录里已有同名文件时**不覆盖**，只报告 —— 静默覆盖就是数据丢失。
  * 全部搬完后逐条复核 `orders.file_path` 指向的文件确实存在，有问题就非零退出。
"""
import argparse
import os
import shutil
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# 项目根：往上找到含 app.py 的那一层（脚本按用途分了目录，写死层数会静默失效）
PROJECT = Path(__file__).resolve().parent
while not (PROJECT / 'app.py').exists() and PROJECT.parent != PROJECT:
    PROJECT = PROJECT.parent
sys.path.insert(0, str(PROJECT))

import config  # noqa: E402  —— 必须在 sys.path 就位之后导入


def backup_database(db_path: Path) -> Path | None:
    """动手前备份数据库。迁移写坏了还能回去，不备份就是赌。"""
    if not db_path.exists():
        return None
    stamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    dst = db_path.with_name('%s.bak-%s' % (db_path.name, stamp))
    shutil.copy2(db_path, dst)
    return dst


def plan_moves(old_dir: Path, new_dir: Path):
    """列出要搬的文件，以及会撞名的那些。"""
    moves, clashes = [], []
    if not old_dir.exists():
        return moves, clashes
    for src in sorted(old_dir.iterdir()):
        if not src.is_file():
            continue
        dst = new_dir / src.name
        if dst.exists() and dst.stat().st_size == src.stat().st_size:
            clashes.append((src, dst, '目标已有同名同大小文件'))
        elif dst.exists():
            clashes.append((src, dst, '目标已有同名**不同大小**文件'))
        else:
            moves.append((src, dst))
    return moves, clashes


def rows_to_fix(conn: sqlite3.Connection, old_dir: Path, new_dir: Path):
    """找出 file_path 落在旧目录里的订单，算出它们的新路径。"""
    conn.row_factory = sqlite3.Row
    fixed = []
    for row in conn.execute(
            "SELECT id, pickup_code, file_path FROM orders "
            "WHERE file_path IS NOT NULL AND file_path <> ''"):
        p = Path(row['file_path'])
        try:
            inside = p.resolve().is_relative_to(old_dir.resolve())   # py3.9+ 才有的写法见下
        except AttributeError:                                       # 兼容老解释器
            inside = str(p.resolve()).startswith(str(old_dir.resolve()))
        if not inside:
            continue
        fixed.append((row['id'], row['pickup_code'], row['file_path'],
                      str(new_dir / p.name)))
    return fixed


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--apply', action='store_true', help='真正落盘（默认只预演）')
    ap.add_argument('--from', dest='src', default=None, help='源目录（默认取当前 .env 的 UPLOAD_FOLDER）')
    ap.add_argument('--to', dest='dst', default=None, help='目标目录（默认 DATA_DIR/uploads）')
    args = ap.parse_args()

    old_dir = Path(args.src).resolve() if args.src else Path(config.UPLOAD_FOLDER).resolve()
    new_dir = Path(args.dst).resolve() if args.dst else (Path(config.DATA_DIR) / 'uploads').resolve()
    db_path = Path(config.DATABASE_PATH)

    print('运行期数据根（DATA_DIR） : %s' % config.DATA_DIR)
    print('上传件：旧位置           : %s' % old_dir)
    print('上传件：新位置           : %s' % new_dir)
    print('数据库                   : %s' % db_path)
    print()

    if old_dir == new_dir:
        print('旧位置与新位置是同一个目录 —— 已经统一过了，无需迁移。')
        return 0

    moves, clashes = plan_moves(old_dir, new_dir)
    conn = sqlite3.connect(db_path)
    try:
        fix = rows_to_fix(conn, old_dir, new_dir)

        print('要移动的文件：%d 个（合计 %.1f MB）'
              % (len(moves), sum(s.stat().st_size for s, _ in moves) / 1048576))
        for s, d in moves[:8]:
            print('    %s → %s' % (s.name, d.parent))
        if len(moves) > 8:
            print('    … 另有 %d 个' % (len(moves) - 8))
        if clashes:
            print()
            print('!! 目标目录已有 %d 个同名文件，**不会覆盖**：' % len(clashes))
            for s, d, why in clashes[:8]:
                print('    %s（%s）' % (s.name, why))
            print('   先人工确认这批怎么处理，再重跑本脚本。')
        print()
        print('要改的订单行：%d 条' % len(fix))
        for oid, code, before, after in fix[:5]:
            print('    单号 %-6s %s → %s' % (code, before, after))
        if len(fix) > 5:
            print('    … 另有 %d 条' % (len(fix) - 5))

        if not args.apply:
            print()
            print('（预演结束，什么都没改。确认无误后加 --apply 落盘。）')
            return 0

        if clashes:
            print()
            print('存在同名冲突，拒绝落盘。')
            return 2

        bak = backup_database(db_path)
        if bak:
            print()
            print('已备份数据库：%s' % bak.name)

        new_dir.mkdir(parents=True, exist_ok=True)
        moved = 0
        for s, d in moves:
            shutil.move(str(s), str(d))
            moved += 1
        print('已移动 %d 个文件' % moved)

        for oid, code, before, after in fix:
            conn.execute('UPDATE orders SET file_path = ? WHERE id = ?', (after, oid))
        conn.commit()
        print('已更新 %d 条订单的文件路径' % len(fix))

        # 复核：库里每一条 file_path 都要真的落在文件系统上
        missing = []
        for row in conn.execute(
                "SELECT id, pickup_code, file_path FROM orders "
                "WHERE file_path IS NOT NULL AND file_path <> ''"):
            if not Path(row['file_path']).exists():
                missing.append((row['pickup_code'], row['file_path']))
        print()
        if missing:
            print('!! 复核失败：还有 %d 条订单的文件找不到' % len(missing))
            for code, p in missing[:10]:
                print('   单号 %s → %s' % (code, p))
            print('数据库备份在 %s，可以据此回退。' % (bak.name if bak else '（未生成）'))
            return 3
        print('复核通过：所有订单的文件都在新目录下找得到。')
        print()
        print('下一步：把 .env 里的 UPLOAD_FOLDER 那一行删掉（或改成新位置），')
        print('        让它跟着 DATA_DIR 走；旧的空目录确认无用后即可删除。')
        return 0
    finally:
        conn.close()


if __name__ == '__main__':
    sys.exit(main())
