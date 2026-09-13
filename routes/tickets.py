"""routes/tickets.py —— 工单（站内信）接口。"""

from flask import Blueprint, g, jsonify, request

from auth import _is_staff, login_required
from config import (
    TICKET_BODY_MAX,
    TICKET_CLOSED,
    TICKET_MAX_OPEN,
    TICKET_STATUSES,
    TICKET_SUBJECT_MAX,
    logger,
)
from db import get_db
from security import actor_label, client_ip, security_event

bp = Blueprint('tickets', __name__)


@bp.route('/api/tickets')
@login_required
def api_tickets():
    """工单列表：普通用户只看自己的，管理员 / 超管看全部，可按状态筛选。

    未读数是算出来的，不是存出来的：
      用户侧未读 = 对方（管理员）发的、且晚于我上次已读时刻的消息数；
      管理侧未读 = 用户发的、且晚于管理员上次已读时刻的消息数。
    这样多个管理员共用同一个队列时，谁点开就算谁已读，不用各自维护一份标记。
    """
    staff = _is_staff(g.user)
    status = (request.args.get('status') or '').strip()
    conn = get_db()
    try:
        if staff:
            where, params = '', []
            if status in TICKET_STATUSES:
                where, params = 'WHERE t.status = ?', [status]
            rows = conn.execute('''
                SELECT t.id, t.subject, t.status, t.user_id,
                       datetime(t.create_time, 'localtime') AS create_time,
                       datetime(t.update_time, 'localtime') AS update_time,
                       owner.nickname AS owner_nickname,
                       (SELECT COUNT(*) FROM ticket_messages m
                         WHERE m.ticket_id = t.id AND m.sender_role = 'user'
                           AND (t.admin_read_time IS NULL OR m.create_time > t.admin_read_time)) AS unread,
                       (SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id = t.id) AS msg_count,
                       (SELECT m.body FROM ticket_messages m WHERE m.ticket_id = t.id
                         ORDER BY m.id DESC LIMIT 1) AS last_body
                FROM tickets t
                LEFT JOIN users owner ON owner.id = t.user_id
                {where}
                ORDER BY t.update_time DESC, t.id DESC
            '''.format(where=where), params).fetchall()
        else:
            rows = conn.execute('''
                SELECT t.id, t.subject, t.status,
                       datetime(t.create_time, 'localtime') AS create_time,
                       datetime(t.update_time, 'localtime') AS update_time,
                       (SELECT COUNT(*) FROM ticket_messages m
                         WHERE m.ticket_id = t.id AND m.sender_role <> 'user'
                           AND (t.user_read_time IS NULL OR m.create_time > t.user_read_time)) AS unread,
                       (SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id = t.id) AS msg_count,
                       (SELECT m.body FROM ticket_messages m WHERE m.ticket_id = t.id
                         ORDER BY m.id DESC LIMIT 1) AS last_body
                FROM tickets t
                WHERE t.user_id = ?
                ORDER BY t.update_time DESC, t.id DESC
            ''', (g.user['id'],)).fetchall()
    finally:
        conn.close()

    tickets = [dict(r) for r in rows]
    return jsonify({
        'code': 0,
        'staff': staff,
        'unread_total': sum(t['unread'] for t in tickets),
        'tickets': tickets,
    })



@bp.route('/api/tickets', methods=['POST'])
@login_required
def api_create_ticket():
    """普通用户发起工单，第一条消息（详细描述）同时写进去。"""
    if _is_staff(g.user):
        return jsonify({'code': 403, 'msg': '管理员无需发起工单，直接在工单列表里回复即可'}), 403

    data = request.get_json(silent=True) or {}
    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()
    if not (2 <= len(subject) <= TICKET_SUBJECT_MAX):
        return jsonify({'code': 400, 'msg': '标题需为 2-%s 个字' % TICKET_SUBJECT_MAX}), 400
    if not (2 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '内容需为 2-%s 个字' % TICKET_BODY_MAX}), 400

    conn = get_db()
    try:
        open_count = conn.execute(
            "SELECT COUNT(*) AS c FROM tickets WHERE user_id = ? AND status = 'open'",
            (g.user['id'],)).fetchone()['c']
        if open_count >= TICKET_MAX_OPEN:
            # 限流，防止有人拿工单刷屏，把管理员的处理队列占满
            return jsonify({'code': 429,
                            'msg': '你有 %s 个进行中的工单，请等处理完再发起新的' % TICKET_MAX_OPEN}), 429
        cursor = conn.execute(
            "INSERT INTO tickets (user_id, subject, status) VALUES (?, ?, 'open')",
            (g.user['id'], subject))
        tid = cursor.lastrowid
        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (tid, g.user['id'], g.user['role'], body))
        conn.commit()
    finally:
        conn.close()
    logger.info('新工单 #%s 发起人=%s 标题=%s ip=%s',
                tid, g.user['nickname'], subject, client_ip())
    return jsonify({'code': 0, 'msg': '工单已提交，请等待管理员回复', 'id': tid})



@bp.route('/api/tickets/<int:tid>')
@login_required
def api_ticket_detail(tid):
    """读工单详情和全部消息，顺便把自己这一侧的已读时间推进到现在。"""
    staff = _is_staff(g.user)
    conn = get_db()
    try:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            # 水平越权：普通用户想翻别人的工单，必须留痕
            security_event('ticket_access_denied',
                           '工单 #%s 属于 uid=%s，访问者=%s' % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权查看该工单'}), 403

        if staff:
            conn.execute('UPDATE tickets SET admin_read_time = CURRENT_TIMESTAMP WHERE id = ?', (tid,))
        else:
            conn.execute('UPDATE tickets SET user_read_time = CURRENT_TIMESTAMP WHERE id = ?', (tid,))
        conn.commit()

        messages = conn.execute('''
            SELECT m.id, m.sender_id, m.sender_role, m.body,
                   datetime(m.create_time, 'localtime') AS create_time,
                   u.nickname AS sender_nickname
            FROM ticket_messages m
            LEFT JOIN users u ON u.id = m.sender_id
            WHERE m.ticket_id = ?
            ORDER BY m.id
        ''', (tid,)).fetchall()
        owner = conn.execute('SELECT nickname FROM users WHERE id = ?',
                             (ticket['user_id'],)).fetchone()
    finally:
        conn.close()

    return jsonify({
        'code': 0,
        'ticket': {
            'id': ticket['id'],
            'subject': ticket['subject'],
            'status': ticket['status'],
            'is_mine': ticket['user_id'] == g.user['id'],
            'owner_nickname': owner['nickname'] if owner else '（账号已注销）',
        },
        'messages': [dict(m) for m in messages],
    })



@bp.route('/api/tickets/<int:tid>/messages', methods=['POST'])
@login_required
def api_ticket_reply(tid):
    """回复工单，工单归属人和管理员 / 超管都能回。"""
    staff = _is_staff(g.user)
    data = request.get_json(silent=True) or {}
    body = (data.get('body') or '').strip()
    if not (1 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '回复内容需为 1-%s 个字' % TICKET_BODY_MAX}), 400

    conn = get_db()
    try:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            security_event('ticket_reply_denied',
                           '工单 #%s 属于 uid=%s，回复者=%s' % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权回复该工单'}), 403
        if ticket['status'] == TICKET_CLOSED:
            return jsonify({'code': 400, 'msg': '工单已关闭，请先重新打开'}), 400

        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (tid, g.user['id'], g.user['role'], body))
        # 回复就刷新会话时间，顺手推进自己这一侧的已读时间，免得刚发完还显示未读
        conn.execute('''
            UPDATE tickets
            SET update_time = CURRENT_TIMESTAMP,
                last_reply_by = ?,
                user_read_time = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE user_read_time END,
                admin_read_time = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE admin_read_time END
            WHERE id = ?
        ''', (g.user['id'], 0 if staff else 1, 1 if staff else 0, tid))
        conn.commit()
    finally:
        conn.close()
    logger.info('工单 #%s 收到回复 回复人=%s(%s) ip=%s',
                tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已发送'})



@bp.route('/api/tickets/<int:tid>/status', methods=['PUT'])
@login_required
def api_ticket_status(tid):
    """关闭 / 重新打开工单，工单归属人和管理员 / 超管都能操作。"""
    staff = _is_staff(g.user)
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or '').strip()
    if new_status not in TICKET_STATUSES:
        return jsonify({'code': 400, 'msg': '状态不合法'}), 400

    conn = get_db()
    try:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            security_event('ticket_status_denied',
                           '工单 #%s 属于 uid=%s，操作者=%s' % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权操作该工单'}), 403
        conn.execute('UPDATE tickets SET status = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?',
                     (new_status, tid))
        conn.commit()
    finally:
        conn.close()
    logger.info('工单 #%s 状态「%s」->「%s」 操作人=%s(%s) ip=%s',
                tid, ticket['status'], new_status, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0,
                    'msg': '工单已关闭' if new_status == TICKET_CLOSED else '工单已重新打开'})
