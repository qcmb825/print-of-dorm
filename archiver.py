"""取件超期归档：可取件摆满 N 天还没人来取，自动转成「未取件」。

为什么要有这个东西（产品理由，不是技术理由）：
    柜台上那排「可取件」是**等人来**的活单。一张单打完、学生迟迟不来，
    它就一直占着那一列 —— 一个月后「可取件」里躺着二十张没人认领的纸，
    而今天真该催的那三张就淹在里面了。归档做的事只有一件：把超期的那批
    从柜台上挪到「未取件」（红色），让柜台一眼看见「这些是存货」。

三个刻意的决定：
    ① **不是删除、也不是废弃**。超期的单照样能凭单号取件（routes/orders.py
       的取件 UPDATE 认「未取件」），管理员也能手动改回「可取件」重新计时。
       同学隔半个月才来取是常事，系统不该让他白跑一趟。
    ② **天数只从「进入可取件」那一刻算**（orders.ready_at，v25 那一列），
       不拿 update_time：那列会被任何一次改状态、改金额刷掉，
       用它算会把「刚改过备注的老单」当成刚打完。
    ③ **留痕要写**（order_logs，action=status、to_status=未取件）。
       时间线上必须看得出「它不是人改的、是到期归的」——
       否则管理员会以为同事动过这一单。
"""
import threading
import time

from config import (ARCHIVE_AFTER_DAYS, ARCHIVE_BATCH, ARCHIVE_ENABLED,
                    ARCHIVE_INTERVAL, ORDER_LOG_STATUS, ST_READY,
                    ST_UNCLAIMED, logger)
from db import db_conn, log_order_event


def scan_once(days=None, limit=None):
    """跑一轮归档，返回**真正改掉**的条数。

    抽成独立函数是为了能被测试直接调用：定时循环本身没什么好测的，
    要钉住的是「哪些该归、哪些不该归」以及「留痕写了没有」。
    """
    days = ARCHIVE_AFTER_DAYS if days is None else int(days)
    limit = ARCHIVE_BATCH if limit is None else int(limit)
    if days < 1 or limit < 1:
        # 0 天等于「一进可取件就归档」，那不是配置错误而是灾难，
        # 这里直接不做事，让日志里那句「间隔/天数不合法」去提醒人。
        return 0

    cutoff = '-%d days' % days
    archived = 0
    with db_conn() as conn:
        rows = conn.execute('''
            SELECT id, pickup_code, ready_at
            FROM orders
            WHERE status = ? AND ready_at IS NOT NULL
              AND ready_at <= datetime('now', ?)
            ORDER BY ready_at ASC
            LIMIT ?
        ''', (ST_READY, cutoff, limit)).fetchall()
        for row in rows:
            # 带条件的 UPDATE：这一轮扫描和「学生刚好来取件」可能同时发生。
            # 那条 UPDATE 会把 status 改成已取件，于是这里 rowcount = 0，
            # 我们**不覆盖**它 —— 少归一张无所谓，把一张已经交出去的件
            # 标成「未取件」才是真的错账。
            cursor = conn.execute(
                'UPDATE orders SET status = ?, update_time = CURRENT_TIMESTAMP '
                'WHERE id = ? AND status = ?',
                (ST_UNCLAIMED, row['id'], ST_READY))
            if cursor.rowcount != 1:
                continue
            log_order_event(
                conn, row['id'], None, None, ORDER_LOG_STATUS,
                '可取件超过 %d 天未取，自动归档为「%s」' % (days, ST_UNCLAIMED),
                to_status=ST_UNCLAIMED)
            archived += 1
            logger.info('超期归档：订单 #%s（单号 %s）可取件已满 %d 天，转「%s」',
                        row['id'], row['pickup_code'], days, ST_UNCLAIMED)
        conn.commit()
    return archived


def start_archive_watcher():
    """起一个后台线程，每 ARCHIVE_INTERVAL 秒归一轮。

    与 notifier / pickup_notifier 同一套写法（daemon 线程 + 整轮包 try）：
    一轮失败只记日志，不能让线程死掉 —— 线程一死，超期归档就永久停摆，
    而界面上完全看不出异常（「可取件」里那批单会一直躺着）。
    """
    if not ARCHIVE_ENABLED:
        logger.info('取件超期归档：已关闭（ARCHIVE_ENABLED=false）')
        return None
    if ARCHIVE_AFTER_DAYS < 1 or ARCHIVE_INTERVAL < 60:
        logger.warning('取件超期归档：ARCHIVE_AFTER_DAYS=%s / ARCHIVE_INTERVAL=%s 不合法，'
                       '不启动（天数至少 1、间隔至少 60 秒）',
                       ARCHIVE_AFTER_DAYS, ARCHIVE_INTERVAL)
        return None

    def loop():
        while True:
            try:
                count = scan_once()
                if count:
                    logger.info('取件超期归档：本轮把 %d 单转入「%s」', count, ST_UNCLAIMED)
            except Exception:  # noqa: BLE001 —— 线程不能因为一轮失败就退出
                logger.exception('取件超期归档：本轮失败，下一轮继续')
            time.sleep(ARCHIVE_INTERVAL)

    thread = threading.Thread(target=loop, name='archive-watcher', daemon=True)
    thread.start()
    logger.info('取件超期归档：每 %d 秒扫一轮，可取件满 %d 天转「%s」',
                ARCHIVE_INTERVAL, ARCHIVE_AFTER_DAYS, ST_UNCLAIMED)
    return thread
