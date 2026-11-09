"""抽奖后台线程：到点开奖、到期归档、给中奖者发邮件。

为什么是「读接口里惰性触发 + 线程兜底」双保险：
    全站的定时能力就是几条 while True + sleep 的 daemon 线程，而它们只在
    `python app.py` 的 __main__ 里启动（见 app.py 那段注释）。抽奖如果只挂
    线程，将来哪天有人用 gunicorn 直接 import app，开奖就永远不发生 ——
    所以每个读接口入口还会先跑一遍 scan_once()（幂等，成本是三条小查询）。
    线程负责的是「没人访问页面时开奖也准时」；惰性触发负责的是「线程没起
    结果也不会错」。两边都靠数据库里的条件 UPDATE 抢占，谁先到谁开奖。

三个动作的顺序是刻意的（归档 -> 开奖 -> 发信）：
    归档把上一期「开奖了但还没归」的收掉，「同一时间只有一个在架」的闸门
    才不会卡住管理员开下一期；开奖把到期的那期收尾，中奖者才会出现在
    发信名单里；发信永远排在最后 —— 它是三件事里唯一可能慢的（SMTP 握手
    最长 SMTP_TIMEOUT 秒），不能挡在开奖前面。

「只发一次」的哲学与 notifier.py 相同（见它开头那段）：不用内存标记，
用 lottery_entries.notify_time 这一列当凭证。发送失败写 notify_error，
**不无限重试** —— 中奖名单在管理端一直看得到，通知失败该转人工而不是
每 30 秒轰炸一次 SMTP。
"""
import secrets
import threading
import time

from config import LOTTERY_WORKER_INTERVAL, logger
from db import db_conn
from mail import lottery as lottery_mail

# 一轮最多发多少封中奖信。正常一次开奖的中奖者就是个位数，这个上限纯粹是
# 防御性的：万一有人把份数填成几千，一轮全部发完会把线程占死半小时。
_NOTIFY_BATCH = 50


def _draw_one(conn, lottery_id, manual=False):
    """开一期奖。返回 True 表示这一轮真的把状态从 open 推到了 drawn。

    manual=True 时无视开奖时刻（管理端「立即开奖」）；条件 UPDATE 里的
    status='open' 仍然在 —— 手动开奖与线程/惰性触发并发时，只有一方生效。
    抽取用 secrets.SystemRandom().sample：crypto 级随机源，样本不重复，
    数量不足时 sample 自己会抛 —— 所以先 min() 截住。参与人数少于份数时
    全部中奖，剩余份数留给下一期同奖品（结余口径见 routes/lottery.py）。
    """
    conn.execute('BEGIN IMMEDIATE')
    try:
        query = ('SELECT id, prize_quantity FROM lotteries '
                 "WHERE id = ? AND status = 'open'")
        params = [lottery_id]
        if not manual:
            query += ' AND draw_at <= CURRENT_TIMESTAMP'
        row = conn.execute(query, params).fetchone()
        if row is None:
            # 别人已经开过、或者还没到点（被并发路径抢先）：不算错，安静退出。
            conn.rollback()
            return False
        entry_ids = [
            r['id']
            for r in conn.execute(
                'SELECT id FROM lottery_entries WHERE lottery_id = ?', (lottery_id,)
            ).fetchall()
        ]
        count = min(max(0, int(row['prize_quantity'])), len(entry_ids))
        if count:
            winners = secrets.SystemRandom().sample(entry_ids, count)
            conn.executemany(
                'UPDATE lottery_entries SET is_winner = 1 WHERE id = ?',
                [(w,) for w in winners],
            )
        conn.execute(
            "UPDATE lotteries SET status = 'drawn', drawn_at = CURRENT_TIMESTAMP "
            'WHERE id = ?',
            (lottery_id,),
        )
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    logger.info('抽奖：第 %s 期已开奖（奖品 %s，中奖 %d / 参与 %d）',
                lottery_id, _prize_name(conn, lottery_id), count, len(entry_ids))
    return True


def _prize_name(conn, lottery_id):
    row = conn.execute('SELECT prize_name FROM lotteries WHERE id = ?', (lottery_id,)).fetchone()
    return row['prize_name'] if row else '?'


def _archive_due(conn):
    """把归档时刻已到、还挂在「已开奖」上的活动转 archived。返回条数。

    只动 drawn 不动 open：open 的活动到 archive_at 只可能是配置错了
    （archive_at 必须晚于 draw_at，路由层拦），把它归档等于无奖而终，
    这种错要留给管理员看见并处理，不能被后台静默吞掉。"""
    cursor = conn.execute(
        "UPDATE lotteries SET status = 'archived' "
        "WHERE status = 'drawn' AND archive_at IS NOT NULL "
        '  AND archive_at <= CURRENT_TIMESTAMP'
    )
    conn.commit()
    return cursor.rowcount


def _draw_due(conn):
    """把到点还没开的活动全部开奖。返回开奖的期数。"""
    rows = conn.execute(
        "SELECT id FROM lotteries WHERE status = 'open' AND draw_at <= CURRENT_TIMESTAMP"
    ).fetchall()
    return sum(1 for r in rows if _draw_one(conn, r['id']))


def _notify_pending(conn):
    """给还没通知过的中奖者发信。返回 (发出, 失败) 对数。

    凭证列 notify_time 为空 **且** notify_error 也为空才发：错误是非空字符串，
    「通知失败但还没写原因」的窗口只有一行代码宽，用「两个字段都空」当判据
    比只看一个稳。失败不再重试（见模块头），管理员在参与名单里看得见原因。"""
    rows = conn.execute('''
        SELECT e.id AS entry_id, e.is_winner,
               u.id AS user_id, u.student_id, u.qq, u.contact_type, u.contact
        FROM lottery_entries e
        JOIN users u ON u.id = e.user_id
        JOIN lotteries l ON l.id = e.lottery_id
        WHERE e.is_winner = 1 AND e.notify_time IS NULL AND e.notify_error IS NULL
        ORDER BY e.id ASC
        LIMIT ?
    ''', (_NOTIFY_BATCH,)).fetchall()
    sent = failed = 0
    for row in rows:
        prize = conn.execute(
            'SELECT prize_name FROM lotteries WHERE id = ('
            '  SELECT lottery_id FROM lottery_entries WHERE id = ?)', (row['entry_id'],)
        ).fetchone()
        prize_name = prize['prize_name'] if prize else ''
        ok, why = lottery_mail.send_winner_mail(row, prize_name)
        if ok:
            conn.execute(
                'UPDATE lottery_entries SET notify_time = CURRENT_TIMESTAMP, '
                'notify_error = NULL WHERE id = ?',
                (row['entry_id'],),
            )
            sent += 1
            logger.info('中奖通知：user=%s 已发送（奖品 %s）', row['user_id'], prize_name)
        else:
            conn.execute(
                'UPDATE lottery_entries SET notify_error = ? WHERE id = ?',
                (why, row['entry_id']),
            )
            failed += 1
            logger.warning('中奖通知：user=%s 未能发送（原因 %s，奖品 %s）',
                           row['user_id'], why, prize_name)
    conn.commit()
    return sent, failed


def scan_once():
    """跑一轮：归档 -> 开奖 -> 发信。返回本轮动作摘要（测试与日志用）。"""
    with db_conn() as conn:
        archived = _archive_due(conn)
        drawn = _draw_due(conn)
        sent, failed = _notify_pending(conn)
    return {'archived': archived, 'drawn': drawn, 'notified': sent, 'notify_failed': failed}


def settle_once():
    """只做归档与开奖，不发信。读接口入口的惰性触发走这一支。

    发信是三件事里唯一可能慢的（SMTP 握手最长 SMTP_TIMEOUT 秒），不能让它
    跟在每一次页面读取后面 —— 邮件交给线程那一路，读接口只保证「结果正确」：
    该归的归了、该开的开了，学生看到的名单永远是最新状态。"""
    with db_conn() as conn:
        archived = _archive_due(conn)
        drawn = _draw_due(conn)
    return {'archived': archived, 'drawn': drawn}


def draw_now(lottery_id):
    """管理端「立即开奖」：无视开奖时刻，但只开 status='open' 的那一期。

    开完不发信 —— 发信永远走线程那一支（见 _notify_pending 的注释），
    这里只把状态推过去，下一轮扫描自然会把邮件带上。"""
    with db_conn() as conn:
        return _draw_one(conn, lottery_id, manual=True)


def start_lottery_watcher():
    """起一个后台线程，每 LOTTERY_WORKER_INTERVAL 秒扫一轮。

    与 notifier / pickup_notifier / archiver 同一套写法：daemon 线程 +
    整轮包 try，一轮失败只记日志 —— 线程一死，开奖就没人管了，而界面上
    看不出异常（读接口里的惰性触发会把结果补对，但「到点即开」就没了）。"""
    if LOTTERY_WORKER_INTERVAL < 5:
        logger.warning('抽奖后台：LOTTERY_WORKER_INTERVAL=%s 不合法，不启动（至少 5 秒）',
                       LOTTERY_WORKER_INTERVAL)
        return None

    def loop():
        while True:
            try:
                scan_once()
            except Exception:  # noqa: BLE001 —— 线程不能因为一轮失败就退出
                logger.exception('抽奖后台：本轮失败，下一轮继续')
            time.sleep(LOTTERY_WORKER_INTERVAL)

    thread = threading.Thread(target=loop, name='lottery-watcher', daemon=True)
    thread.start()
    logger.info('抽奖后台：每 %d 秒扫一轮（开奖 / 归档 / 中奖邮件）',
                LOTTERY_WORKER_INTERVAL)
    return thread
