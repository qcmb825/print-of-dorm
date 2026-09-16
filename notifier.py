"""notifier.py —— 「新单 N 分钟没人接就发邮件」的定时检查。

这个模块要解决的是一件事：**同一笔订单只提醒一次**。
它比看起来难，因为这个系统里同时存在三种会让「提醒两遍」的情况：

  1. 扫描和发信之间被人接了单 —— 那封信就不该再发（人都接走了，还催什么）；
  2. 本机同时跑着两个实例（这个项目的历史惯例，端口上常留着旧进程）——
     两个线程会各扫各的、各发各的；
  3. 上一轮发信失败，这一轮要能重试 —— 但重试的前提是**上一轮确实没发出去**。

三种情况的答案都是同一个：不要用内存里的标记，用数据库里的一个列当状态。
「谁把 claim_alert_time 从 NULL 改成时间戳改成功了，谁负责发这封信」——
UPDATE 的 rowcount 会告诉我们谁成功了，这件事在一个 SQLite 事务里是原子的，
而内存标记连第二个进程都看不见。

时间的那点事（这里错一次就会静默永不提醒）：
SQLite 的 CURRENT_TIMESTAMP 是 **UTC**，orders.create_time 落库时也是 UTC，
所以「下单时间 <= 现在减 3 分钟」这个比较必须两边都是 UTC。
写成 datetime(create_time, 'localtime') <= datetime('now', '-3 minutes')
在东八区会整整差出 8 小时 —— 界面上的时间看着是对的，邮件却一封都发不出来。
只有**要显示给人看**的时间才转 localtime，比较绝不转。

正文与传输都不在本文件：信该寄给谁、正文怎么写、怎么递给 SMTP，全部在
mail/ 包里（见 mail/__init__.py）。这里只留下「什么时候该发、谁来发」——
这两件事和怎么发信是正交的，而正交的部分正是测试要打桩的部分。
"""

import threading
import time

from config import (CLAIM_ALERT_ENABLED, CLAIM_ALERT_INTERVAL, CLAIM_ALERT_MAX_AGE_HOURS,
                    CLAIM_ALERT_MINUTES, CLAIM_ALERT_RETRY_BACKOFF, ST_UNPRICED, logger)
from db import get_db
from mail import alert_recipients, compose_body, compose_subject, is_configured, send_mail

# 线程只拉起一次。（app.py 的 __main__ 里调一次就够，加这个锁是为了
# 以后万一有人在别处也调了一下，不至于悄悄多出一个一模一样的线程在扫。）
_start_lock = threading.Lock()
_started = False

# 发信失败后的退避截止时刻（time.time()）。None 表示不处于退避中。
# 放在内存里是刻意的：它的作用只是「别把日志刷满」，进程重启就重来一遍，
# 大不了多失败几次 —— 而把它落库又会多出一列状态要维护。
_next_retry_at = None


def _pending_orders(conn):
    """找出「该提醒但还没提醒过」的订单。

    四个条件各有各的用处，一个都不能省：

      status = 待计费        —— 只有新下的单会停在这一档，它本身就代表「还没开印」；
      claimed_by IS NULL     —— 没人接；
      claim_time IS NULL     —— **从来没被接过**。这一条是为了把
                                「接过又释放回池子」的单排除掉：释放会把
                                claimed_by 和 claim_time 一起清空，
                                只看前者的话，一笔已经有人看过、甚至报过价的单
                                会被当成新单再催一遍，收信人会以为系统坏了；
      claim_alert_time IS NULL —— 还没提醒过（这一列就是「提醒凭证」）。

    另外用 created 的下限圈出「最近 CLAIM_ALERT_MAX_AGE_HOURS 小时内」的单 ——
    服务停了三天再起来时，库里所有老单都满足上面四条，不加这道闸会一口气
    炸出几十封早就没人关心的邮件。
    """
    return conn.execute('''
        SELECT o.id, o.pickup_code, o.filename, o.preset_content, o.copies,
               o.color_type, o.duplex, o.paper_name,
               datetime(o.create_time, 'localtime') AS create_local,
               u.nickname AS owner
        FROM orders o
        LEFT JOIN users u ON u.id = o.user_id
        WHERE o.status = ?
          AND o.claimed_by IS NULL
          AND o.claim_time IS NULL
          AND o.claim_alert_time IS NULL
          AND o.create_time <= datetime('now', ?)
          AND o.create_time >= datetime('now', ?)
        ORDER BY o.id
    ''', (ST_UNPRICED,
          '-%d minutes' % CLAIM_ALERT_MINUTES,
          '-%d hours' % CLAIM_ALERT_MAX_AGE_HOURS)).fetchall()


def _claim(conn, order_id):
    """抢占这一单的「提醒权」，抢到返回 True。

    WHERE 里把三个条件又写了一遍，不是啰嗦：从上面那次 SELECT 到这里，
    中间隔着一句 SQL 的时间 —— 有人正好在这期间把这单接走是完全可能的。
    把条件写进 UPDATE 里，改到 0 行就说明「轮不到我发」，于是不发光。
    这和接单、计费用的是同一条规矩（带条件的 UPDATE + 看 rowcount），
    不是先查后写 —— 先查后写在这里会退化成「两个进程都查到、都发」。
    """
    cursor = conn.execute('''
        UPDATE orders SET claim_alert_time = CURRENT_TIMESTAMP
        WHERE id = ? AND claim_alert_time IS NULL
          AND claimed_by IS NULL AND claim_time IS NULL
    ''', (order_id,))
    return cursor.rowcount == 1


def _release_claims(order_ids):
    """把「占了但没发出去」的凭证撤回来，下一轮才有机会重试。

    为什么失败时选择撤回标记，而不是「成功才标记」：
    后者等于每 60 秒重试一次 SMTP，服务商那边看到的是一台机器在捶它的登录接口，
    被限流的概率比被修好大得多。先占位、失败撤回，配合调用方那层退避，
    既不会重复发，也不会因为一次网络抖动就把这次提醒永久丢掉。

    claimed_by 仍然为空才撤回。中途有人接了单的话，标记留着更好 —— 那单
    已经有人管了，本来也不需要再提醒。
    """
    conn = get_db()
    try:
        for order_id in order_ids:
            conn.execute('UPDATE orders SET claim_alert_time = NULL '
                         'WHERE id = ? AND claimed_by IS NULL', (order_id,))
        conn.commit()
    except Exception:
        # 这里失败意味着那些单要等到下一轮才可能被重新选中（如果它们的
        # claim_alert_time 没撤掉，就是永远不再提醒）。声音要大一点。
        logger.exception('未接单提醒：撤回提醒标记失败，涉及的订单 %s 本轮不会再提醒', order_ids)
    finally:
        conn.close()


def scan_once():
    """跑一轮检查，返回这一轮成功发出提醒的订单数。

    单独抽成函数是为了能被测试直接调用 —— 定时循环本身没什么好测的，
    真正需要钉住的是「什么情况该发、什么情况不该发」。
    """
    global _next_retry_at

    conn = get_db()
    try:
        rows = _pending_orders(conn)
        if not rows:
            return 0
        # 先全部占位再发信。占完再发，是为了让「这一批」在数据库里立刻
        # 变成一个整体 —— 发信要几秒到几十秒，期间第二个实例扫过来
        # 看到的是一批已经占好的行，不会再挑中它们。
        claimed = [row for row in rows if _claim(conn, row['id'])]
        conn.commit()
    finally:
        conn.close()

    if not claimed:
        return 0

    total = len(claimed)
    subject = compose_subject(total)

    # 收件人在发信这一刻现算：管理员可能刚改了联系方式、刚被停用，
    # 缓存一份名单只会让通知发到一个已经不该收信的地方。
    conn = get_db()
    try:
        recipients = alert_recipients(conn)
    except Exception:
        logger.exception('未接单提醒：解析收件人失败')
        recipients = []
    finally:
        conn.close()

    if send_mail(subject, compose_body(claimed, total), recipients):
        return total

    # 没发出去 —— 凭证撤回，并进入退避，避免 SMTP 挂着的时候每轮都捶一次。
    _release_claims([row['id'] for row in claimed])
    _next_retry_at = time.time() + CLAIM_ALERT_RETRY_BACKOFF
    logger.error('未接单提醒：本轮 %d 笔未能发出，已撤回提醒标记，%d 秒后重试',
                 total, CLAIM_ALERT_RETRY_BACKOFF)
    return 0


def _watch_loop():
    """守护线程的主体：醒了就扫一轮，然后睡到下一轮。

    整个循环包在 try/except 里。这个线程崩掉的后果很不对称 ——
    它自己只是「少了个提醒」，但如果异常逃出去，线程就死了，
    而**死了的定时任务是不会有任何提示的**：日志正常、接口正常、
    只是邮件再也没有来过，可能过很久才有人发现。所以宁可这里
    每次都把异常记下来继续跑。
    """
    global _next_retry_at
    while True:
        try:
            if _next_retry_at is None or time.time() >= _next_retry_at:
                sent = scan_once()
                if sent:
                    _next_retry_at = None
        except Exception:
            # 出错不调退避：那是给「SMTP 发不出去」准备的，
            # 而这里的异常更像是代码或数据库的问题，早点再试一次反而更容易看清。
            logger.exception('未接单提醒：本轮检查出错，%d 秒后重试', CLAIM_ALERT_INTERVAL)
        time.sleep(CLAIM_ALERT_INTERVAL)


def start_claim_watcher():
    """拉起未接单提醒线程；条件不满足时安静地返回 False。

    什么时候不拉：
      - CLAIM_ALERT_ENABLED=false；
      - SMTP 没配全 —— 拉起来也只是一遍遍写「发不出去」的错误日志，
        不如干脆不开，并在启动日志里说清原因。

    这两条都**只记日志、不报错、不退出进程**。提醒是锦上添花的功能，
    为它拦住整个服务启动，等于把「邮件没配好」升级成「打印服务不可用」，
    那个代价完全不成比例。

    线程是 daemon：进程一退它就跟着走，不会出现主进程结束了、
    后台还挂着一个 python 在发信的情况。
    """
    global _started
    with _start_lock:
        if _started:
            return False
        if not CLAIM_ALERT_ENABLED:
            logger.info('未接单提醒未启用：CLAIM_ALERT_ENABLED=false')
            return False
        if not is_configured():
            logger.info('未接单提醒未启用：SMTP 未配置（需要 SMTP_HOST，以及 SMTP_USER 或 MAIL_FROM）。'
                        '配好之后重启即生效')
            return False
        _started = True

    try:
        thread = threading.Thread(target=_watch_loop, name='claim-alert', daemon=True)
        thread.start()
    except Exception:
        # 拉不起线程是环境问题（比如线程数已到上限），同样不拦服务。
        logger.exception('未接单提醒线程启动失败，本次运行将不会有邮件提醒')
        with _start_lock:
            _started = False
        return False

    logger.info('未接单提醒已启动：每 %d 秒检查一次，超过 %d 分钟无人接单即发信（收件人由 ALERT_MAIL_TO '
                '与管理员联系方式共同决定）', CLAIM_ALERT_INTERVAL, CLAIM_ALERT_MINUTES)
    return True
