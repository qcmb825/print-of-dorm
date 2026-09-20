"""pickup_notifier.py —— 「订单变成可取件就通知学生」的定时检查。

和 notifier.py（催管理员接单）是同一套骨架：后台线程定时扫、用数据库里的一个列
当发信凭证、失败撤回并退避、异常一律不逃出循环。但有三处**故意做得不一样**，
每一处都是因为这一路的需求不同：

  ① **一单一封，不合并。** 催单那封是发给同一个人（管理员）的，五笔单合成一封
     反而更清楚。这一封的收件人是**下单学生本人**，两个人不能塞进同一封信 ——
     邮件的 To 字段所有人都看得见，合并就等于把 A 的取件码和订单内容告诉 B。
     这不是排版问题，是泄露。所以失败的撤回也只能**逐单**撤，
     不能像催单那样整批撤回（那会把已经发成功的几封又重发一遍）。

  ② **凭证列是 ready_notify_time**，语义和 claim_alert_time 一样（NULL = 没提醒过），
     但分成两列。共用一列的话「催过管理员」会把这一路判成「已提醒学生」——
     学生永远收不到取件码，而日志上完全看不出异常。

  ③ **收件人是现查的单个学生**，不是 alert_recipients 那份管理员名单。
     学生的联系方式（QQ / 邮箱 / 微信）决定这封信发得出去还是发不出去：
     填微信的推不出邮箱，那就**转人工**（见下）。

关于「转人工」：推不出邮箱的订单会被汇总成一封信，发给**接单的那位管理员**，
提醒他手动联系学生。只发给接单人（不是全体管理员）是刻意的 —— 单子是他接的、
钱是他收的、人也是他去联系，别人收到只会多问一句「这跟我有关系吗」。
一封人人都收到、又只有一个人需要动手的提醒，用不了多久就会被整体忽略。

「需人工通知」这个标记**不落库**，而是订单台按「状态 = 可取件 且 学生联系方式
推不出邮箱」现算。理由：能不能发信完全由学生**当前**填的联系方式决定，
存一个状态位就有了同步问题 —— 学生改成 QQ 号之后，存下来的标记会一直挂着，
而页面上的标记和实际能不能发信从此各说各话。

时间的那点事（和 notifier.py 同一个坑）：SQLite 的 CURRENT_TIMESTAMP 是 UTC，
比较两边必须都是 UTC，只有要显示给人看的时间才转 localtime。

正文与传输都不在本文件：全部在 mail/ 包里（template.py 催管理员、pickup.py 通知学生）。
"""

import threading
import time
from pathlib import Path

from config import (CONTACT_LABELS, PAY_QR_FALLBACK_IMAGE, PAY_QR_FOLDER, PICKUP_ADDRESS,
                    PICKUP_NOTIFY_ENABLED, PICKUP_NOTIFY_INTERVAL,
                    PICKUP_NOTIFY_MAX_AGE_HOURS, PICKUP_NOTIFY_RETRY_BACKOFF,
                    ST_READY, logger)
from db import db_conn
from mail import (PAY_QR_CID, alert_recipients, compose_manual_body, compose_manual_subject,
                  compose_pickup_body, compose_pickup_html, compose_pickup_subject,
                  is_configured, send_mail, user_mailbox)

# 同 notifier.py：线程只拉起一次。
_start_lock = threading.Lock()
_started = False

# 发信失败后的退避截止时刻（time.time()）。None 表示不处于退避中。
_next_retry_at = None


def _pending_orders(conn):
    """找出「已经可取件、但还没通知过学生」的订单。

    三个条件：

      status = 可取件        —— 只有这一档才该通知「可以来拿了」；
      ready_notify_time IS NULL —— 还没通知过（这一列就是发信凭证）。
                                   它同时也是「转人工」的凭证：学生填微信的单子
                                   发不出信，但也要占掉这一列，否则每轮扫描都会
                                   重新选中它，管理员会被同一批单反复轰炸；
      COALESCE(update_time, create_time) 在最近 N 小时内
                             —— 升级兜底。本次升级之前就停在「可取件」的老订单
                                全都没有凭证（新列是 NULL），不加这道闸的话
                                服务一启动就会把积压的老单全部翻出来补发一遍，
                                而收件人早就把东西取走了。这跟催单那路是同一个
                                考虑，也同样是**不回填历史数据**。

    用 update_time 而不是 create_time 圈时间窗：判断「多久之前可取件的」用的是
    改状态那一刻，而改状态会更新 update_time。老订单这一列可能是 NULL，
    所以兜回 create_time —— 用 COALESCE 而不是 `update_time >= ...`，
    后者在 NULL 上恒为假，会让所有老单静默地永远不被通知。
    """
    return conn.execute('''
        SELECT o.id, o.pickup_code, o.filename, o.preset_content, o.copies,
               o.color_type, o.duplex, o.paper_name, o.price,
               o.claimed_by,
               u.nickname AS owner,
               u.qq AS owner_qq,
               u.contact_type AS owner_contact_type,
               u.contact AS owner_contact
        FROM orders o
        LEFT JOIN users u ON u.id = o.user_id
        WHERE o.status = ?
          AND o.ready_notify_time IS NULL
          AND COALESCE(o.update_time, o.create_time) >= datetime('now', ?)
        ORDER BY o.id
    ''', (ST_READY, '-%d hours' % PICKUP_NOTIFY_MAX_AGE_HOURS)).fetchall()


def _claim(conn, order_id):
    """抢占这一单的「通知权」，抢到返回 True。

    WHERE 里再判一次 status = 可取件，不是啰嗦：从上面那次 SELECT 到这里，
    中间隔着一句 SQL 的时间 —— 管理员正好在这期间把状态改回「打印中」
    （发现少打了一页）是完全可能的，那这封信就不该再发。
    改到 0 行就说明「轮不到我发」，于是不发 —— 和接单、计费用的是同一条规矩。
    """
    cursor = conn.execute('''
        UPDATE orders SET ready_notify_time = CURRENT_TIMESTAMP
        WHERE id = ? AND ready_notify_time IS NULL AND status = ?
    ''', (order_id, ST_READY))
    return cursor.rowcount == 1


def _release(order_ids):
    """把「占了但没发出去」的凭证撤回来，下一轮才有机会重试。

    仍然是 ST_READY 才撤：学生已经取走了的话，标记留着更好 —— 那单不需要再通知。
    """
    with db_conn() as conn:
        try:
            for order_id in order_ids:
                conn.execute('UPDATE orders SET ready_notify_time = NULL '
                             'WHERE id = ? AND status = ?', (order_id, ST_READY))
            conn.commit()
        except Exception:
            # 这里失败意味着那些单要等到下一轮才可能被重新选中（如果凭证没撤掉，
            # 就是永远不再通知）。声音要大一点。
            logger.exception('取件提醒：撤回提醒标记失败，涉及的订单 %s 本轮不会再通知', order_ids)


def _pay_qr_path(conn, claimed_by):
    """这一单该带哪张收款码：接单人自己传的 -> 兜底图 -> 没有图。

    收款码是**谁接单谁收款**，所以优先用接单人自己的那张 —— 拿别人的码，
    钱就进了别人的账户，这是业务错误，不是技术错误。

    接单人没传过时用兜底图（PAY_QR_FALLBACK_IMAGE，业主自己放的一张）。
    这里刻意**不**回落到「内置超管的码」：那同样是「把钱打给别人」
    —— 普通管理员接了单却让学生扫超管的码，他会越干越不明白钱去哪了。
    """
    if claimed_by:
        row = conn.execute('SELECT pay_qr_file FROM users WHERE id = ?',
                           (claimed_by,)).fetchone()
        name = (row['pay_qr_file'] or '').strip() if row else ''
        if name:
            folder = Path(PAY_QR_FOLDER).resolve()
            path = Path(folder, name).resolve()
            # 文件名来自数据库，而数据库可能被人工改过。校验它没跑出收款码目录 ——
            # 和订单下载那条路径穿越防守是同一套规矩，理由也一样：
            # 少判这一次，一个 `../../` 开头的文件名就能让邮件附上服务器上的任意文件。
            try:
                path.relative_to(folder)
            except ValueError:
                logger.error('取件提醒：接单人 id=%s 的收款码文件名不合法，已忽略', claimed_by)
            else:
                if path.is_file():
                    return str(path)
                logger.warning('取件提醒：接单人 id=%s 的收款码文件不存在，改用兜底图', claimed_by)

    fallback = Path(PAY_QR_FALLBACK_IMAGE)
    if fallback.is_file():
        return str(fallback)
    logger.warning('取件提醒：没有可用的收款码图片（接单人未上传、兜底图也不存在），本封邮件不带图')
    return None


def _send_student(order, mailbox, qr_path):
    """给一个学生发他的取件通知。一单一封，所以这里只管一笔。"""
    has_qr = bool(qr_path)
    return send_mail(
        compose_pickup_subject(order),
        compose_pickup_body(order),
        [mailbox],
        html=compose_pickup_html(order, has_qr=has_qr),
        inline_images=[(PAY_QR_CID, qr_path)] if has_qr else [],
        label='取件提醒',
    )


def _claimer_recipients(conn, claimer_id, count):
    """「需人工联系」的汇总信该发给谁。

    有接单人 -> 只发给他。他要是自己也没留可用的邮箱，就返回空列表
    （send_mail 会记一条明确的 error），而不是退回去轰炸全体管理员 ——
    「只有一个人该动手」这件事不能因为配置不全就变成群发。
    """
    if claimer_id:
        row = conn.execute('SELECT contact_type, contact FROM users WHERE id = ?',
                           (claimer_id,)).fetchone()
        mailbox, reason = user_mailbox(row)
        if mailbox:
            return [mailbox]
        logger.error('取件提醒：接单人 id=%s 没有可用的邮箱地址（原因=%s），'
                     '%d 笔需人工联系的订单没有发出汇总。请让他补充联系方式',
                     claimer_id, reason or 'unknown', count)
        return []
    # 没有接单人：超管可以直接把没接单的订单改成「可取件」（改状态那道
    # 「先接单」的校验对超管是跳过的）。这时不存在「谁该负责」，
    # 只能退回给全体管理员 —— 这也是本功能最初说的「通知管理员」。
    try:
        return alert_recipients(conn)
    except Exception:
        logger.exception('取件提醒：解析管理员收件人失败')
        return []


def _notify_claimers(conn, groups):
    """把「发不出邮件的学生」按接单人分组，各发一封汇总。返回发送失败的订单 id。"""
    failed = []
    for claimer_id, orders in groups.items():
        rows = []
        for order in orders:
            row = dict(order)
            # 汇总信里要写清「怎么联系他」，所以把 contact_type 翻成中文标签
            row['owner_contact_label'] = CONTACT_LABELS.get(
                (row.get('owner_contact_type') or '').strip())
            rows.append(row)
        recipients = _claimer_recipients(conn, claimer_id, len(rows))
        if send_mail(compose_manual_subject(len(rows)), compose_manual_body(rows, len(rows)),
                     recipients, label='需人工联系提醒'):
            continue
        failed.extend(order['id'] for order in orders)
    return failed


def scan_once():
    """跑一轮检查，返回这一轮成功发给学生的通知数。

    单独抽成函数是为了能被测试直接调用 —— 定时循环本身没什么好测的，
    真正需要钉住的是「什么情况该发、什么情况该转人工」。
    """
    global _next_retry_at

    failed = []
    sent = 0

    with db_conn() as conn:
        rows = _pending_orders(conn)
        if not rows:
            return 0
        claimed = []
        for row in rows:
            if _claim(conn, row['id']):
                claimed.append(dict(row))
        conn.commit()
        if not claimed:
            return 0

        manual = {}
        for order in claimed:
            # user_mailbox 认的是 users 表的列名（qq / contact_type / contact），
            # 而上面那条 SQL 为免和 orders 的列撞名，把它们整成了 owner_* 别名。
            # 这里手工翻回去：两边对不上**不会报错**，只会静默落进
            # 「推不出邮箱 -> 转人工」那条路 —— 学生明明填了 QQ 却收不到信，
            # 而日志里只有一句「推不出邮箱」。
            mailbox, reason = user_mailbox({
                'qq': order.get('owner_qq'),
                'contact_type': order.get('owner_contact_type'),
                'contact': order.get('owner_contact'),
            })
            if not mailbox:
                # 微信 / 没填 / 填错 —— 三种都发不出去，但原因要写进日志：
                # 「没填」该催用户补，「填了微信」是根本没法发，处理方式不一样。
                logger.info('取件提醒：订单 #%s 的下单人联系方式推不出邮箱（%s），转人工联系',
                            order['id'], reason)
                manual.setdefault(order['claimed_by'], []).append(order)
                continue
            if _send_student(order, mailbox, _pay_qr_path(conn, order['claimed_by'])):
                sent += 1
            else:
                failed.append(order['id'])

        if manual:
            failed.extend(_notify_claimers(conn, manual))

    if failed:
        _release(failed)
        _next_retry_at = time.time() + PICKUP_NOTIFY_RETRY_BACKOFF
        logger.error('取件提醒：本轮 %d 笔未能发出，已撤回提醒标记，%d 秒后重试',
                     len(failed), PICKUP_NOTIFY_RETRY_BACKOFF)
    return sent


def _watch_loop():
    """守护线程的主体：醒了就扫一轮，然后睡到下一轮。

    整个循环包在 try/except 里 —— 理由和 notifier.py 完全相同：
    **死了的定时任务是不会有任何提示的**，日志正常、接口正常，
    只是学生再也收不到取件码，可能过很久才有人发现。
    """
    global _next_retry_at
    while True:
        try:
            if _next_retry_at is None or time.time() >= _next_retry_at:
                if scan_once():
                    _next_retry_at = None
        except Exception:
            # 出错不调退避：那是给「SMTP 发不出去」准备的，
            # 而这里的异常更像是代码或数据库的问题，早点再试一次反而更容易看清。
            logger.exception('取件提醒：本轮检查出错，%d 秒后重试', PICKUP_NOTIFY_INTERVAL)
        time.sleep(PICKUP_NOTIFY_INTERVAL)


def start_pickup_watcher():
    """拉起取件提醒线程；条件不满足时安静地返回 False。

    不拉的条件和 notifier.py 一样（开关关了、SMTP 没配全），
    同样只记日志、不报错、不退出进程：提醒是锦上添花的功能，
    为它拦住整个服务启动，等于把「邮件没配好」升级成「打印服务不可用」。
    """
    global _started
    with _start_lock:
        if _started:
            return False
        if not PICKUP_NOTIFY_ENABLED:
            logger.info('取件提醒未启用：PICKUP_NOTIFY_ENABLED=false')
            return False
        if not is_configured():
            logger.info('取件提醒未启用：SMTP 未配置（需要 SMTP_HOST，以及 SMTP_USER 或 MAIL_FROM）。'
                        '配好之后重启即生效')
            return False
        _started = True

    try:
        thread = threading.Thread(target=_watch_loop, name='pickup-notify', daemon=True)
        thread.start()
    except Exception:
        logger.exception('取件提醒线程启动失败，本次运行学生将不会收到取件邮件')
        with _start_lock:
            _started = False
        return False

    logger.info('取件提醒已启动：每 %d 秒检查一次，订单变为「%s」即给学生发信'
                '（取件地址 %s；填微信联系方式的转人工通知接单人）',
                PICKUP_NOTIFY_INTERVAL, ST_READY, PICKUP_ADDRESS)
    return True
