"""QQ Bot 专用接口，只接受 app.py 已验证的受限 Bearer 身份。

鉴权闸门不在本模块 —— app.py 的 identify_bot_request 在 CSRF 之前
按路径前缀 /api/bot/ 统一拦截（没配 BOT_TOKEN 整组 503、令牌不对 401）。
本蓝图因此**不重复**校验令牌，但依赖关系是单向的：这里只写业务，
「谁能进」永远由 app.py 那一道管。新增 bot 接口时路径必须留在
/api/bot/ 前缀下，否则就会绕过闸门直接裸奔。

身份模型（产品决策 2026-09-20）：**QQ 号本身就是身份**。
用户注册时必填的 QQ 号（users.qq）就是 bot 侧的账号凭证 ——
OneBot 事件里的发送者 user_id 由登录态给出、伪造不了，
拿它到 users.qq 里找账号，找到就是这个人在操作，不再需要任何
验证码 / 密码。代价与边界（都已被产品决策接受）：
  - users.qq 是用户自己填的，填错成别人的 QQ，等于把 bot 操作权让了出去
    —— 注册与改资料两处判重 + idx_users_qq_live 唯一索引保证「一号一账号」，
    但填错号这件事只能靠用户自己核对；
  - 没注册过的 QQ 会得到「先去网页端注册」的引导，bot 不代注册
    （代注册会绕开学号名单这道身份闸门）。

建单全部复用 routes/orders.py 的共享函数（create_order_from_saved_file /
create_preset_order），上传频控也与网页端**共用同一把计数器** ——
不管从哪条路下单，一分钟内的下单额度是同一个，分 open 两把就是翻倍漏洞。
"""

import os
import sqlite3
import time
import uuid

from flask import Blueprint, Response, g, jsonify, request

import botcard

from config import (ALLOWED_EXTENSIONS, ORDER_LOG_WITHDRAW, ROLE_USER, ST_DONE,
                    ST_PENDING, ST_PRINTING, ST_READY, ST_UNPRICED, STATUS_ACTIVE,
                    STATUS_DISABLED, TICKET_BODY_MAX, TICKET_CLOSED, TICKET_MAX_OPEN,
                    TICKET_SUBJECT_MAX, UPLOAD_FOLDER, logger)
from db import db_conn, find_preset
from security import client_ip, hit_limit, rate_limited, security_event
from utils import allowed_file, content_signature_error, parse_copies
from .orders import (create_order_from_saved_file, create_preset_order, log_event,
                     quota_rejection, quota_snapshot, resolve_print_options,
                     UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS)

bp = Blueprint('bot', __name__)

# 机器人每次最多报多少单：/orders 是给人翻的，不是对账用的导出工具，
# 一屏之外的部分网页端看得更清楚。
BOT_ORDERS_LIMIT = 10


@bp.get('/api/bot/ping')
def api_bot_ping():
    """供独立 printbot 进程验证后端地址与令牌是否可用。"""
    return jsonify({'code': 0, 'msg': 'QQ Bot 接口可用'})


def _resolve_bot_user(conn, qq):
    """按 QQ 号解析账号，返回 (账号行, None) 或 (None, (响应, 状态码))。

    三种结果刻意分开说话：
      没有账号   → 引导去网页注册（bot 不代注册，那会绕开学号名单闸门）；
      已停用/注销 → 明说账号状态，让人知道该找管理员而不是反复重试；
      多个在用账号 → 存量脏数据（唯一索引建成前的历史遗留），拒绝并留痕，
                    这种时候选哪一个都是替用户猜，猜错就是把单下到别人头上。
    """
    rows = conn.execute(
        'SELECT id, nickname, real_name, role, status, qq FROM users WHERE qq = ?',
        (qq,)).fetchall()
    if not rows:
        return None, (jsonify({
            'code': 404,
            'msg': '还没有账号关联这个 QQ 号。请先在网页端用学号注册，'
                   '注册时把 QQ 号填成这个号，再来找我',
        }), 404)
    live = [r for r in rows if r['status'] == STATUS_ACTIVE]
    if not live:
        state = '已注销' if rows[0]['status'] != STATUS_DISABLED else '已被停用'
        return None, (jsonify({
            'code': 403, 'msg': '这个 QQ 关联的账号%s，请联系管理员处理' % state,
        }), 403)
    if len(live) > 1:
        security_event('bot_identity_ambiguous',
                       'qq=%s 命中 %s 个在用账号，已拒绝操作' % (qq, len(live)))
        return None, (jsonify({
            'code': 409, 'msg': '这个 QQ 关联了多个账号，请找管理员核对处理',
        }), 409)
    return live[0], None


def _identify(requested_qq):
    """解析 QQ 并把账号装进 g.user，之后的共享建单函数/留痕都以这个人署名。

    返回 None 表示已应答错误响应，调用方直接 return 那个响应。
    """
    qq = str(requested_qq or '').strip()
    if not qq.isdigit() or not (5 <= len(qq) <= 12) or qq.startswith('0'):
        return jsonify({'code': 400, 'msg': 'qq 缺失或格式不合法'}), 400
    with db_conn() as conn:
        user, error = _resolve_bot_user(conn, qq)
    if error is not None:
        return error
    # g.user 是本请求内的临时身份：identify_bot_request 只放了请求进来，
    # 这里才把「这个 QQ 是谁」定下来。建单、留痕都认它。
    g.user = dict(user)
    return None


@bp.get('/api/bot/orders')
def api_bot_orders():
    """这个 QQ 的最近订单（含状态与取件码）。都是本人自己的数据。"""
    error = _identify(request.args.get('qq'))
    if error is not None:
        return error
    # nickname 一定要带上：机器人那边用它称呼本人，测试里也钉着这条
    # （重构取数时漏过一次，test_bot_features 当场报出来）
    return jsonify({'code': 0, 'msg': 'ok', 'nickname': g.user['nickname'],
                    **_orders_payload(g.user['id'])})


def _orders_payload(uid, conn=None):
    """本人最近订单。文本回复与卡片**共用这一份取数** —— 两处各算一遍迟早对不上。

    conn 传进来就复用调用方的连接（卡片那条路要连查好几张表，
    每张表各开一次连接既慢、又容易在写库时互相撞锁）。
    """
    sql = '''
        SELECT o.id, o.status, o.pickup_code, o.price, o.filename,
               o.preset_content, o.copies,
               datetime(o.create_time, 'localtime') AS create_time
        FROM orders o WHERE o.user_id = ? ORDER BY o.id DESC LIMIT ?
    '''
    if conn is None:
        with db_conn() as own:
            rows = own.execute(sql, (uid, BOT_ORDERS_LIMIT)).fetchall()
    else:
        rows = conn.execute(sql, (uid, BOT_ORDERS_LIMIT)).fetchall()
    orders = []
    for row in rows:
        # 文件单报文件名、预设单报服务内容：bot 端拼的是同一条「这单要打什么」。
        title = (row['preset_content'] or row['filename'] or '').replace('\n', ' ')
        orders.append({
            'order_id': row['id'],
            'status': row['status'],
            'pickup_code': row['pickup_code'],
            'price': row['price'],
            'copies': row['copies'],
            'title': title[:60],
            'create_time': row['create_time'],
        })
    return {'orders': orders}


@bp.get('/api/bot/code')
def api_bot_code():
    """查一张单的取件码。只认自己的单：别人的单按「不存在」回答 ——
    这一个接口不能被拿去当「订单号是否存在」的探测仪。"""
    error = _identify(request.args.get('qq'))
    if error is not None:
        return error
    try:
        order_id = int(request.args.get('order_id', ''))
    except ValueError:
        return jsonify({'code': 400, 'msg': '订单号应为数字'}), 400
    with db_conn() as conn:
        row = conn.execute(
            'SELECT id, status, pickup_code FROM orders WHERE id = ? AND user_id = ?',
            (order_id, g.user['id'])).fetchone()
    if row is None:
        return jsonify({'code': 404, 'msg': '没有找到这张订单，检查一下订单号'}), 404
    if row['status'] == ST_DONE:
        return jsonify({'code': 0, 'msg': '这张单已经取件了', 'status': row['status'],
                        'pickup_code': None})
    return jsonify({'code': 0, 'msg': 'ok', 'status': row['status'],
                    'pickup_code': row['pickup_code']})


@bp.get('/api/bot/presets')
def api_bot_presets():
    """当前可用的预设打印服务清单（学生选一条来下单）。"""
    return jsonify({'code': 0, 'msg': 'ok', **_presets_payload()})


def _presets_payload(conn=None):
    """预设清单。文本回复与卡片共用（见 _orders_payload 的说明）。"""
    if conn is None:
        with db_conn() as own:
            rows = _active_presets(own)
    else:
        rows = _active_presets(conn)
    return {'presets': [{'preset_id': row['id'],
                         # 换行压成空格：QQ 消息里一段多行说明会把清单顶得没法看
                         'content': (row['content'] or '').replace('\n', ' ')}
                        for row in rows]}


def _active_presets(conn):
    """启用中的预设打印服务。两个端点共用一份 SQL，避免「一个改了另一个忘」。"""
    return conn.execute(
        'SELECT id, content FROM print_presets WHERE is_active = 1 ORDER BY id LIMIT 20'
    ).fetchall()


def _active_paper_types(conn):
    """启用中的纸张类型（与网页端 /api/print-options 同一口径：只给启用的）。"""
    return conn.execute(
        'SELECT id, name, remark FROM paper_types WHERE is_active = 1 ORDER BY id ASC LIMIT 20'
    ).fetchall()


@bp.get('/api/bot/print-options')
def api_bot_print_options():
    """下单要用的两份清单：预设服务 + 纸张类型（对应网页端 /api/print-options）。

    一次全给，和网页端一样的理由：这两份清单是下单流程的两步，
    拆成两个请求只会多一次往返、多一种「一个到了一个没到」的中间态。
    """
    with db_conn() as conn:
        presets = _active_presets(conn)
        papers = _active_paper_types(conn)
    return jsonify({
        'code': 0,
        'msg': 'ok',
        'presets': [{'preset_id': r['id'],
                     'content': (r['content'] or '').replace('\n', ' ')} for r in presets],
        'paper_types': [{'paper_type_id': r['id'],
                         'name': r['name'],
                         'remark': r['remark'] or ''} for r in papers],
    })


@bp.get('/api/bot/announcement')
def api_bot_announcement():
    """当前生效的公告（没有就 announcement=null）—— 与网页端公告栏同一个口径：
    只取 is_active=1 里最新的一条。"""
    with db_conn() as conn:
        row = conn.execute('''
            SELECT id, content, datetime(update_time, 'localtime') AS update_time
            FROM announcements WHERE is_active = 1 ORDER BY id DESC LIMIT 1
        ''').fetchone()
    return jsonify({'code': 0, 'msg': 'ok', 'announcement': dict(row) if row else None})


@bp.get('/api/bot/me')
def api_bot_me():
    """个人汇总：订单分档计数、累计花费、在盘用量。

    口径逐项对齐网页端设置页（`api_me_overview`）：进行中 = 待计费+待打印+打印中
    （对本人来说待计费这单还没结束），花费只算已定价的；用量走 quota_snapshot
    那一套。两处算法一致，才不会出现「网页说还剩 3GB、bot 说已满」。
    """
    error = _identify(request.args.get('qq'))
    if error is not None:
        return error
    return jsonify({'code': 0, 'msg': 'ok', **_me_payload(g.user['id'], g.user['nickname'])})


def _me_payload(uid, nickname, conn=None):
    """个人汇总（文本回复与卡片共用）。口径见上面的 docstring，别在这里另算一套。"""
    sql_counts = 'SELECT status, COUNT(*) AS c FROM orders WHERE user_id = ? GROUP BY status'
    sql_spent = 'SELECT COALESCE(SUM(price), 0) AS s FROM orders WHERE user_id = ?'
    if conn is None:
        with db_conn() as own:
            counts = {r['status']: r['c'] for r in own.execute(sql_counts, (uid,)).fetchall()}
            spent = own.execute(sql_spent, (uid,)).fetchone()['s']
    else:
        counts = {r['status']: r['c'] for r in conn.execute(sql_counts, (uid,)).fetchall()}
        spent = conn.execute(sql_spent, (uid,)).fetchone()['s']
    return {
        'nickname': nickname,
        'orders': {
            'total': sum(counts.values()),
            'in_progress': sum(counts.get(s, 0) for s in (ST_UNPRICED, ST_PENDING, ST_PRINTING)),
            'ready': counts.get(ST_READY, 0),
            'done': counts.get(ST_DONE, 0),
            'spent': round(spent or 0.0, 2),
        },
        'usage': quota_snapshot(uid),
    }


@bp.post('/api/bot/order/withdraw')
def api_bot_order_withdraw():
    """自助撤回「自己的、还没被接单的」订单（与网页端 /api/order/<id>/withdraw 同一套规则）。

    这是**唯一真会删数据**的 bot 接口，所以逐条对齐网页端的守卫：
    别人的单 403 并留痕、已接单 400、已取件 400；删除语句把条件再写一遍 +
    rowcount 兜并发（SELECT 到 DELETE 之间单可能被接走）。
    """
    data = request.get_json(silent=True) or {}
    error = _identify(data.get('qq'))
    if error is not None:
        return error
    order_id = data.get('order_id')
    if isinstance(order_id, bool) or not isinstance(order_id, int) or order_id < 1:
        return jsonify({'code': 400, 'msg': '订单号应为数字'}), 400

    uid = g.user['id']
    with db_conn() as conn:
        row = conn.execute(
            'SELECT user_id, claimed_by, status, filename, file_path FROM orders WHERE id = ?',
            (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404
        if row['user_id'] != uid:
            security_event('withdraw_denied',
                           '订单 #%s 的下单人 uid=%s，bot 请求来自 uid=%s'
                           % (order_id, row['user_id'], uid))
            return jsonify({'code': 403, 'msg': '只能撤回自己下的订单'}), 403
        if row['claimed_by'] is not None:
            return jsonify({'code': 400, 'msg': '订单已经被接取，无法撤回'}), 400
        if row['status'] == ST_DONE:
            return jsonify({'code': 400, 'msg': '订单已完成，不能撤回'}), 400
        cursor = conn.execute(
            'DELETE FROM orders WHERE id = ? AND user_id = ? AND claimed_by IS NULL AND status <> ?',
            (order_id, uid, ST_DONE))
        if cursor.rowcount == 0:
            conn.rollback()
            return jsonify({'code': 409, 'msg': '订单状态刚发生了变化，撤回失败'}), 409
        log_event(order_id, ORDER_LOG_WITHDRAW,
                  '本人撤回订单（QQ）%s' % ('，文件「%s」已一并删除' % row['filename']
                                            if row['filename'] else '（预设服务，无文件）'),
                  conn=conn)
        conn.commit()

    # 库里删干净了才动文件：反过来的话会出现「订单还在、文件没了」。
    if row['file_path']:
        try:
            os.remove(row['file_path'])
        except OSError:
            logger.warning('bot 撤回订单 #%s 时删除文件失败（可能早已被清理）：%s',
                           order_id, row['file_path'])
    logger.info('订单 #%s 被 %s 通过 QQ 撤回，文件=%s ip=%s',
                order_id, g.user['nickname'], row['filename'] or '（无文件）', client_ip())
    return jsonify({'code': 0, 'msg': '订单已撤回'})


# ---- 工单（问题反馈）：QQ 那一侧的三件事 —— 发起 / 看进展 / 回复 ----------------
# 复用的是网页端同一套表与同一套守卫：只有普通用户能发起（管理员直接在工单列表回复）、
# 进行中的工单数上限 TICKET_MAX_OPEN、只有本人能看和回、已关闭要先在网页端重开。
# 差别只在「谁在看」：网页端点开详情算已读，bot 这边**看列表就算已读** ——
# 列表里带着最新回复的正文，用户确实看到了，再留着未读标记只会让网页端白闪一个红点。

@bp.post('/api/bot/ticket')
def api_bot_ticket_create():
    data = request.get_json(silent=True) or {}
    error = _identify(data.get('qq'))
    if error is not None:
        return error
    if g.user['role'] != ROLE_USER:
        return jsonify({'code': 403, 'msg': '管理员无需发起工单，直接在网页端工单列表里回复即可'}), 403
    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()
    if not (2 <= len(subject) <= TICKET_SUBJECT_MAX):
        return jsonify({'code': 400, 'msg': '标题需为 2-%s 个字' % TICKET_SUBJECT_MAX}), 400
    if not (2 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '内容需为 2-%s 个字' % TICKET_BODY_MAX}), 400

    with db_conn() as conn:
        open_count = conn.execute(
            "SELECT COUNT(*) AS c FROM tickets WHERE user_id = ? AND status = 'open'",
            (g.user['id'],)).fetchone()['c']
        if open_count >= TICKET_MAX_OPEN:
            return jsonify({'code': 429,
                            'msg': '你有 %s 个进行中的工单，请等处理完再发起新的'
                                   % TICKET_MAX_OPEN}), 429
        cursor = conn.execute(
            "INSERT INTO tickets (user_id, subject, status) VALUES (?, ?, 'open')",
            (g.user['id'], subject))
        ticket_id = cursor.lastrowid
        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (ticket_id, g.user['id'], g.user['role'], body))
        conn.commit()
    logger.info('工单 #%s 由 %s 通过 QQ 发起 ip=%s', ticket_id, g.user['nickname'], client_ip())
    return jsonify({'code': 0, 'msg': '已提交', 'ticket_id': ticket_id})


@bp.get('/api/bot/tickets')
def api_bot_tickets():
    """我的工单（最近的在前）。未读数照网页端的算法现算，顺手标记已读。"""
    error = _identify(request.args.get('qq'))
    if error is not None:
        return error
    return jsonify({'code': 0, 'msg': 'ok', **_tickets_payload(g.user['id'])})


def _tickets_payload(uid):
    """我的工单列表。文本回复与卡片共用。

    **「看列表即已读」的口径写在这里**：两条路都必须做同一次标记，
    否则用卡片看一遍、未读还在，用户会以为没看到过回复。
    """
    with db_conn() as conn:
        rows = conn.execute('''
            SELECT t.id, t.subject, t.status,
                   datetime(t.update_time, 'localtime') AS update_time,
                   (SELECT COUNT(*) FROM ticket_messages m
                     WHERE m.ticket_id = t.id AND m.sender_role <> 'user'
                       AND (t.user_read_time IS NULL OR m.create_time > t.user_read_time)) AS unread,
                   (SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id = t.id) AS msg_count,
                   (SELECT m.body FROM ticket_messages m WHERE m.ticket_id = t.id
                     ORDER BY m.id DESC LIMIT 1) AS last_body
            FROM tickets t WHERE t.user_id = ?
            ORDER BY t.update_time DESC, t.id DESC LIMIT 5
        ''', (uid,)).fetchall()
        if rows:
            # 列表里就带着最新回复，用户看到了 —— 与网页端「点开即已读」同一个口径
            conn.execute('UPDATE tickets SET user_read_time = CURRENT_TIMESTAMP '
                         'WHERE user_id = ?', (uid,))
            conn.commit()
    return {'tickets': [{'ticket_id': r['id'], 'subject': r['subject'], 'status': r['status'],
                         'unread': r['unread'], 'msg_count': r['msg_count'],
                         'last_body': r['last_body'] or '', 'update_time': r['update_time']}
                        for r in rows]}


@bp.post('/api/bot/ticket/reply')
def api_bot_ticket_reply():
    data = request.get_json(silent=True) or {}
    error = _identify(data.get('qq'))
    if error is not None:
        return error
    ticket_id = data.get('ticket_id')
    body = (data.get('body') or '').strip()
    if isinstance(ticket_id, bool) or not isinstance(ticket_id, int) or ticket_id < 1:
        return jsonify({'code': 400, 'msg': '工单号应为数字'}), 400
    if not (1 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '回复内容需为 1-%s 个字' % TICKET_BODY_MAX}), 400

    uid = g.user['id']
    with db_conn() as conn:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (ticket_id,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if ticket['user_id'] != uid:
            security_event('ticket_reply_denied',
                           '工单 #%s 属于 uid=%s，bot 请求来自 uid=%s'
                           % (ticket_id, ticket['user_id'], uid))
            return jsonify({'code': 403, 'msg': '无权回复该工单'}), 403
        if ticket['status'] == TICKET_CLOSED:
            return jsonify({'code': 400,
                            'msg': '这个工单已经关闭了，要接着聊请到网页端重新开一个'}), 400
        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (ticket_id, uid, g.user['role'], body))
        # 回复即刷新会话时间，并推进自己这一侧的已读（刚发完不该还显示未读）
        conn.execute('''
            UPDATE tickets
            SET update_time = CURRENT_TIMESTAMP, last_reply_by = ?,
                user_read_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (uid, ticket_id))
        conn.commit()
    logger.info('工单 #%s 收到来自 QQ 的回复 回复人=%s ip=%s',
                ticket_id, g.user['nickname'], client_ip())
    return jsonify({'code': 0, 'msg': '已发送'})


@bp.post('/api/bot/order/preset')
def api_bot_order_preset():
    """用预设打印服务下单（没有文件，机器人代学生提交）。

    打印参数用默认值（黑白 / 单面 / 1 份）：QQ 里追问颜色单双面会把流程
    拖成审问，参数留给网页端改（大纲第 10 节的既定取舍）。
    """
    data = request.get_json(silent=True) or {}
    error = _identify(data.get('qq'))
    if error is not None:
        return error

    # 与网页端共用同一把下单频控（见模块注释）。
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        return rate_limited('bot_preset_order_rate_limited',
                            '账号 %s 在 %s 秒内提交超过 %s 次下单'
                            % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW),
                            '提交太频繁了，稍等一会儿再试')

    preset_id = data.get('preset_id')
    if isinstance(preset_id, bool) or not isinstance(preset_id, int) or preset_id < 1:
        return jsonify({'code': 400, 'msg': '请先发 /preset 看看有哪些服务，再发 /preset 编号 下单'}), 400

    color = (data.get('color') or 'black').strip()
    duplex = (data.get('duplex') or 'single').strip()
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'
    remark = ((data.get('remark') or '').strip() or '通过 QQ 机器人下单')[:200]

    copies, error = parse_copies(data.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    with db_conn() as conn:
        try:
            preset = find_preset(conn, preset_id)
            if preset is None:
                return jsonify({'code': 400, 'msg': '这个预设服务不存在了，重新发 /preset 看一下清单'}), 400
            if preset['is_active'] != 1:
                return jsonify({'code': 400, 'msg': '这个预设服务已经停用了，重新发 /preset 看一下清单'}), 400
            paper, error = resolve_print_options(conn, data)
            if error:
                return jsonify({'code': 400, 'msg': error}), 400
            order_id, pickup_code = create_preset_order(preset, copies, paper, color, duplex, remark)
        except Exception:
            logger.exception('bot 预设下单失败：下单人=%s 预设#%s ip=%s',
                             g.user['nickname'], preset_id, client_ip())
            return jsonify({'code': 500, 'msg': '下单失败，请稍后重试'}), 500

    logger.info('新订单 #%s 下单人=%s（QQ） 预设#%s 份数=%s 取件码=%s ip=%s',
                order_id, g.user['nickname'], preset_id, copies, pickup_code, client_ip())
    return jsonify({'code': 0, 'msg': '下单成功', 'order_id': order_id,
                    'pickup_code': pickup_code})


@bp.post('/api/bot/order/file')
def api_bot_order_file():
    """QQ 里发来的文件落成订单：机器人取回文件后传到这里，与网页端
    /api/upload 走同一套校验（白名单 / 空文件 / 文件头 / 配额）和同一套
    建单函数。差别只有身份来源 —— 会话换成了「按 QQ 号解析出的账号」。"""
    error = _identify(request.form.get('qq'))
    if error is not None:
        return error

    # 与网页上传、预设下单共用同一把频控。
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        return rate_limited('bot_file_order_rate_limited',
                            '账号 %s 在 %s 秒内提交超过 %s 次上传'
                            % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW),
                            '上传太频繁了，稍等一会儿再试')

    file = request.files.get('file')
    if file is None or not file.filename:
        return jsonify({'code': 400, 'msg': '没有收到文件，直接把文件发给我（不要压缩包）'}), 400

    color = request.form.get('color', 'black')
    duplex = request.form.get('duplex', 'single')
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'
    remark = ((request.form.get('remark') or '').strip() or '通过 QQ 机器人下单')[:200]

    copies, error = parse_copies(request.form.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    with db_conn() as conn:
        paper, error = resolve_print_options(conn, request.form)
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    original_name = os.path.basename(file.filename)
    if not allowed_file(original_name):
        security_event('upload_blocked_type', '文件「%s」不在白名单内（QQ 来源）' % original_name[:80])
        return jsonify({
            'code': 400,
            'msg': '不支持的文件类型，仅允许：' + '、'.join(sorted(ALLOWED_EXTENSIONS))
        }), 400

    ext = original_name.rsplit('.', 1)[1].lower()
    new_filename = '%s.%s' % (uuid.uuid4().hex, ext)
    save_path = os.path.join(UPLOAD_FOLDER, new_filename)

    try:
        quota_error = quota_rejection()
        if quota_error is not None:
            return quota_error

        file.save(save_path)
        file_size = os.path.getsize(save_path)
        if file_size == 0:
            os.remove(save_path)
            return jsonify({'code': 400, 'msg': '这个文件是空的（0 字节），换一个再试'}), 400

        content_error = content_signature_error(save_path, ext)
        if content_error is not None:
            os.remove(save_path)
            security_event('upload_content_mismatch',
                           '文件「%s」的内容与扩展名 %s 不符（QQ 来源）'
                           % (original_name[:80], ext))
            return jsonify({'code': 400, 'msg': content_error}), 400

        quota_error = quota_rejection(file_size)
        if quota_error is not None:
            os.remove(save_path)
            return quota_error

        order_id, pickup_code = create_order_from_saved_file(
            original_name, save_path, color, duplex, remark, copies, paper)
    except Exception:
        if os.path.exists(save_path):
            try:
                os.remove(save_path)
            except OSError:
                logger.warning('清理上传失败的文件失败: %s', save_path)
        logger.exception('bot 文件下单失败：下单人=%s 文件=%s ip=%s',
                         g.user['nickname'], original_name, client_ip())
        return jsonify({'code': 500, 'msg': '下单失败，请稍后重试'}), 500

    logger.info('新订单 #%s 下单人=%s（QQ） 文件=%s 大小=%sKB 取件码=%s ip=%s',
                order_id, g.user['nickname'], original_name, file_size // 1024,
                pickup_code, client_ip())
    return jsonify({'code': 0, 'msg': '下单成功', 'order_id': order_id,
                    'pickup_code': pickup_code})


@bp.get('/api/bot/card')
def api_bot_card():
    """把「表格型」回复渲染成一张 PNG 卡（订单 / 工单 / 预设 / 我的）。

    为什么要它：那几类回复在手机 QQ 里是一大坨等宽文字，层级全糊；
    渲染成一张卡更像站内的面板。**一句话能说清的内容不要做成卡**
    （取件码、下单成功这些仍然走文本）—— 在手机里点开一张图比读一行字慢。

    取数一律走 *_payload() 那几个共用函数，卡片与文本看到的是同一份数据。

    渲染不出来（服务器没有中文字体）时回 **501**，机器人会自己退回纯文本 ——
    宁可难看，也不能发一张全是方块的图。
    """
    error = _identify(request.args.get('qq'))
    if error is not None:
        return error
    kind = (request.args.get('kind') or '').strip()
    if kind not in ('orders', 'tickets', 'presets', 'me'):
        return jsonify({'code': 400, 'msg': '卡片类型不对'}), 400
    uid = g.user['id']
    with db_conn() as conn:
        if kind == 'orders':
            payload = _orders_payload(uid, conn)
        elif kind == 'tickets':
            payload = _tickets_payload(uid)
        elif kind == 'presets':
            payload = _presets_payload(conn)
        else:
            payload = _me_payload(uid, g.user['nickname'], conn)
    payload['nickname'] = g.user['nickname']
    payload['qq'] = g.user['qq']
    payload['stamp'] = time.strftime('%H:%M:%S')
    png = botcard.render(kind, payload)
    if png is None:
        return jsonify({'code': 501, 'msg': '服务器没有可用的中文字体，卡片暂不可用'}), 501
    resp = Response(png, mimetype='image/png')
    # 卡片是给人看的快照，别让任何一层缓存住（数据每分钟都在变）
    resp.headers['Cache-Control'] = 'no-store'
    return resp


@bp.get('/api/bot/events')
def api_bot_events():
    """机器人轮询的「该通知谁」清单：自 since 这条留痕以来、**现在仍停在
    「可取件」**的订单。

    游标是 order_logs.id（每个状态变化都会写一条留痕，自增、单调）——
    不用时间戳当游标：留痕 id 不会因为时钟回拨 / 同秒多单而漏行或重行。
    只回当前仍是「可取件」的：期间已经被取走的单（状态走到已取件）不推，
    学生自己刚取完，再推就是骚扰。没有变化时 events 是空数组、cursor
    照常前进 —— 机器人每轮把 cursor 存下来，重启后从那里接着看，
    天然不丢也不重。
    """
    try:
        since = int(request.args.get('since', '0'))
    except ValueError:
        return jsonify({'code': 400, 'msg': 'since 应为数字'}), 400
    since = max(0, since)

    with db_conn() as conn:
        cursor_row = conn.execute('SELECT COALESCE(MAX(id), 0) AS m FROM order_logs').fetchone()
        cursor = cursor_row['m']
        rows = conn.execute('''
            SELECT l.order_id, o.pickup_code, o.price, o.copies,
                   o.filename, o.preset_content, u.qq
            FROM order_logs l
            JOIN orders o ON o.id = l.order_id
            JOIN users u ON u.id = o.user_id
            WHERE l.id > ? AND o.status = ? AND u.qq <> ''
            GROUP BY l.order_id
            ORDER BY MIN(l.id)
        ''', (since, ST_READY)).fetchall()

    events = []
    for row in rows:
        title = (row['preset_content'] or row['filename'] or '').replace('\n', ' ')
        events.append({
            'order_id': row['order_id'],
            'qq': row['qq'],
            'pickup_code': row['pickup_code'],
            'title': title[:60],
        })
    return jsonify({'code': 0, 'msg': 'ok', 'events': events, 'cursor': cursor})
