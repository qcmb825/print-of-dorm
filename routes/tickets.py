"""routes/tickets.py —— 工单（站内信）接口。"""

from flask import Blueprint, g, jsonify, request

from auth import _is_staff, login_required, roles_required
from config import (
    ROLE_SUPER,
    ROLE_USER,
    STATUS_CLOSED,
    TICKET_BODY_MAX,
    TICKET_CLOSED,
    TICKET_MAX_OPEN,
    TICKET_STATUSES,
    TICKET_SUBJECT_MAX,
    logger,
    public_role,
)
from db import db_conn
from security import actor_label, audit_action, client_ip, hit_limit, rate_limited, security_event
from utils import display_name, positive_int

bp = Blueprint('tickets', __name__)

# 查消息的统一 SQL 片段。详情接口和增量接口都从这一段出发，
# 字段名就不会两边各写一套 —— 改字段时漏掉一处，症状是前端静默不渲染。
# 末尾不带 WHERE/ORDER BY，由调用方按需要拼。
_MESSAGE_SELECT = '''
    SELECT m.id, m.sender_id, m.sender_role, m.body,
           datetime(m.create_time, 'localtime') AS create_time,
           u.nickname AS sender_nickname, u.status AS sender_status
    FROM ticket_messages m
    LEFT JOIN users u ON u.id = m.sender_id
'''


def _serialize_messages(rows):
    """把 ticket_messages 的行整理成响应体里的样子。

    两件事必须在出库前做完：
      1. sender_role 过一遍对外口径 —— 库里仍存 'super' 原值，出库统一收敛成 admin，
         前端只判断「是不是 user」，收敛不影响显示，但能不出现 ''super'' 这个词；
      2. 昵称过 display_name —— 发送者账号注销后名字会被释放给别人顶用，不标就分不清。
    """
    items = []
    for row in rows:
        item = dict(row)
        item['sender_role'] = public_role(item['sender_role'])
        item['sender_nickname'] = display_name(
            item['sender_nickname'], item.pop('sender_status', None))
        items.append(item)
    return items


@bp.route('/api/tickets')
@login_required
def api_tickets():
    """工单列表：普通用户只看自己的，管理端看全部，可按状态筛选。

    未读数是算出来的，不是存出来的：
      用户侧未读 = 对方（管理员）发的、且晚于我上次已读时刻的消息数；
      管理侧未读 = 用户发的、且晚于管理员上次已读时刻的消息数。
    这样多个管理员共用同一个队列时，谁点开就算谁已读，不用各自维护一份标记。
    """
    staff = _is_staff(g.user)
    status = (request.args.get('status') or '').strip()
    with db_conn() as conn:
        if staff:
            where, params = '', []
            if status in TICKET_STATUSES:
                where, params = 'WHERE t.status = ?', [status]
            rows = conn.execute('''
                SELECT t.id, t.subject, t.status, t.user_id,
                       datetime(t.create_time, 'localtime') AS create_time,
                       datetime(t.update_time, 'localtime') AS update_time,
                       owner.nickname AS owner_nickname, owner.status AS owner_status,
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

    tickets = [dict(r) for r in rows]
    # 管理端的列表里才有 owner_nickname（用户看的是自己的工单，没必要显示是谁的）。
    # 顺手把「已注销」标到名字上，理由见 utils.display_name。
    for t in tickets:
        if 'owner_nickname' in t:
            t['owner_nickname'] = display_name(t['owner_nickname'], t.pop('owner_status', None))
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

    with db_conn() as conn:
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
    logger.info('新工单 #%s 发起人=%s 标题=%s ip=%s',
                tid, g.user['nickname'], subject, client_ip())
    return jsonify({'code': 0, 'msg': '工单已提交，请等待管理员回复', 'id': tid})



# 代发工单：管理员替某个学生提一条工单。
#
# 为什么需要它：学生的正常路径是自己发工单，但现实里总会遇到
# 「不太会用 / 手机上没留登录态 / 当面跟管理员说了一声」这些情况 ——
# 于是那件事在系统里根本不存在，谁在跟进、进行到哪一步都没有记录。
#
# 工单**归属那个学生**（tickets.user_id 是学生），不只是为了好看：
# 学生端只会列出自己的工单，归属写成管理员的话，这件事在当事人那边
# 压根不存在，他看到回复也无从追问，等于白记一笔。
#
# 第一条消息按「学生说的话」入库（sender_id 是学生、sender_role 是 user）：
# 这样学生端的会话视图不需要任何特殊分支。若按管理员的身份写进去，
# 学生打开看到的是一屏管理员自问自答，且未读计数会一直错着 ——
# 他自己发的话被算成「对方发来的新消息」。
@bp.route('/api/admin/user/<int:user_id>/ticket', methods=['POST'])
@roles_required(ROLE_SUPER)
def api_admin_create_ticket_for(user_id):
    """管理员替指定学生发起工单，正文以该学生的名义入库。"""
    data = request.get_json(silent=True) or {}
    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()
    if not (2 <= len(subject) <= TICKET_SUBJECT_MAX):
        return jsonify({'code': 400, 'msg': '标题需为 2-%s 个字' % TICKET_SUBJECT_MAX}), 400
    if not (2 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '内容需为 2-%s 个字' % TICKET_BODY_MAX}), 400

    with db_conn() as conn:
        target = conn.execute(
            'SELECT id, nickname, status FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['status'] == STATUS_CLOSED:
            # 注销账号登不进来、也打不开学生端，发给他的工单永远不会被读到。
            # 留在队列里只会占着位置，看着像有人一直没处理。
            return jsonify({'code': 400, 'msg': '该账号已注销，无法接收工单'}), 400
        open_count = conn.execute(
            "SELECT COUNT(*) AS c FROM tickets WHERE user_id = ? AND status = 'open'",
            (user_id,)).fetchone()['c']
        if open_count >= TICKET_MAX_OPEN:
            # 沿用同一个上限。代发这条路绕开了「学生自己发」那道限流，
            # 就得在这里补上，否则它变成一条把管理队列刷满的近路。
            return jsonify({'code': 429,
                            'msg': '该学生已有 %s 个进行中的工单，请等处理完再代发'
                                   % TICKET_MAX_OPEN}), 429
        cursor = conn.execute(
            "INSERT INTO tickets (user_id, subject, status) VALUES (?, ?, 'open')",
            (user_id, subject))
        tid = cursor.lastrowid
        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (tid, user_id, ROLE_USER, body))
        conn.commit()
    audit_action('create_ticket_for',
                 '代发工单 #%s 归属 #%s/%s 标题=%s'
                 % (tid, user_id, target['nickname'], subject))
    logger.info('代发工单 #%s 归属=%s 代发人=%s 标题=%s ip=%s',
                tid, target['nickname'], g.user['nickname'], subject, client_ip())
    return jsonify({'code': 0, 'msg': '工单已为该学生提交', 'id': tid})



@bp.route('/api/tickets/<int:tid>')
@login_required
def api_ticket_detail(tid):
    """读工单详情和全部消息，顺便把自己这一侧的已读时间推进到现在。"""
    staff = _is_staff(g.user)
    with db_conn() as conn:
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

        messages = conn.execute(
            _MESSAGE_SELECT + ' WHERE m.ticket_id = ? ORDER BY m.id', (tid,)).fetchall()
        owner = conn.execute('SELECT nickname, status FROM users WHERE id = ?',
                             (ticket['user_id'],)).fetchone()

    # 每条消息都带上发送者的角色，前端靠它区分「用户」和「客服」两方气泡。
    # 角色口径和昵称标注都在 _serialize_messages 里统一处理。
    msg_list = _serialize_messages(messages)

    return jsonify({
        'code': 0,
        'ticket': {
            'id': ticket['id'],
            'subject': ticket['subject'],
            'status': ticket['status'],
            'is_mine': ticket['user_id'] == g.user['id'],
            # 同理：owner 查不到不等于「已注销」，注销的账号行还在、状态是 closed，
            # 那种情况 nickname 有值，由 display_name 加后缀。空只说明这一行没人可指。
            'owner_nickname': display_name(owner['nickname'], owner['status']) if owner else '（无归属）',
        },
        'messages': msg_list,
        # 轮询游标：前端拿它当 since_id 开始增量拉取，省掉「自己去数最后一条 id」。
        # 工单创建时必定写了第一条消息，所以这里不会是「空列表取不到」的情况；
        # 真要是空（历史脏数据），给 0 也能让增量接口从头拉一遍，不会漏消息。
        'last_id': msg_list[-1]['id'] if msg_list else 0,
    })



@bp.route('/api/tickets/<int:tid>/messages', methods=['POST'])
@login_required
def api_ticket_reply(tid):
    """回复工单，工单归属人和管理端都能回。"""
    staff = _is_staff(g.user)
    data = request.get_json(silent=True) or {}
    body = (data.get('body') or '').strip()
    if not (1 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '回复内容需为 1-%s 个字' % TICKET_BODY_MAX}), 400

    with db_conn() as conn:
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
    logger.info('工单 #%s 收到回复 回复人=%s(%s) ip=%s',
                tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已发送'})



@bp.route('/api/tickets/<int:tid>/status', methods=['PUT'])
@login_required
def api_ticket_status(tid):
    """关闭 / 重新打开工单，工单归属人和管理端都能操作。"""
    staff = _is_staff(g.user)
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or '').strip()
    if new_status not in TICKET_STATUSES:
        return jsonify({'code': 400, 'msg': '状态不合法'}), 400

    with db_conn() as conn:
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
    logger.info('工单 #%s 状态「%s」->「%s」 操作人=%s(%s) ip=%s',
                tid, ticket['status'], new_status, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0,
                    'msg': '工单已关闭' if new_status == TICKET_CLOSED else '工单已重新打开'})



# 轮询频控：详情页开着的时候，前端按自适应间隔来取新消息，正常情况下每秒不到一次。
# 给到 4 次/秒是特意留的余量 —— 多开几个标签页、网络抖动触发的立即重试，都会叠加，
# 阈值卡太紧会把正常用户挡在外面；这一条只为拦住脚本级别的狂刷。
POLL_MAX_IN_WINDOW = 240
POLL_WINDOW_SECONDS = 60


@bp.route('/api/tickets/<int:tid>/messages')
@login_required
def api_ticket_messages_since(tid):
    """增量拉取工单消息 —— 供详情页做「实时」刷新。

    ★ 为什么不直接轮询 /api/tickets/<id>：
    那个接口每次进来都要把已读时间推进到现在（UPDATE ... = CURRENT_TIMESTAMP）。
    拿它当轮询接口，等于每几秒往库里写一次；SQLite 写操作要拿排他锁，
    而本服务压根没有连接池，这些写纯属自己给自己制造竞争。
    这里定了条规矩：**没读到新消息就一个字节都不改**，有新的才顺手推进已读。

    为什么是「轮询」而不是 SSE / WebSocket：
    生产用的是 waitress，8 个线程干所有活，而一条长连接会独占一个线程直到断开 ——
    8 个开着页面的用户就能把服务器堵死，第 9 个人连登录都进不来。
    短轮询每个请求几十毫秒就归还线程，代价只有一点点流量，这才是这个架构下能用的实时。

    since_id = 客户端手里最大的消息 id，返回 id 比它大的那批。
    """
    if hit_limit('ticketpoll:%s' % g.user['id'], POLL_MAX_IN_WINDOW, POLL_WINDOW_SECONDS):
        # 前端对这个 429 是静默忽略的（下个周期接着来），所以这里留痕比返回它更重要：
        # 正常界面碰不到这条线，一旦刷出来就是有人在写脚本。
        return rate_limited('ticket_poll_rate_limited',
                            '账号 %s 在 %s 秒内轮询工单消息超过 %s 次'
                            % (g.user['nickname'], POLL_WINDOW_SECONDS, POLL_MAX_IN_WINDOW),
                            '请求过于频繁，请稍后再试')

    since_id = positive_int(request.args.get('since_id'), 0)
    staff = _is_staff(g.user)

    with db_conn() as conn:
        ticket = conn.execute(
            'SELECT id, user_id, status FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            security_event('ticket_access_denied',
                           '工单 #%s 属于 uid=%s，轮询者=%s'
                           % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权查看该工单'}), 403

        rows = conn.execute(
            _MESSAGE_SELECT + ' WHERE m.ticket_id = ? AND m.id > ? ORDER BY m.id',
            (tid, since_id)).fetchall()
        if rows:
            # 人正开着详情页看，这条已读时间推得有道理；没新消息就不动它。
            column = 'admin_read_time' if staff else 'user_read_time'
            conn.execute(
                'UPDATE tickets SET %s = CURRENT_TIMESTAMP WHERE id = ?' % column, (tid,))
            conn.commit()

    messages = _serialize_messages(rows)
    return jsonify({
        'code': 0,
        # 状态也带上：对方在你眼皮底下关掉/重开工单，界面得跟着变，
        # 不然用户会对着一个已关闭的输入框打半天字。
        'status': ticket['status'],
        'messages': messages,
        # 没有新消息时原样回传 since_id，前端不用做分支判断，直接刷新游标即可。
        'last_id': messages[-1]['id'] if messages else since_id,
    })
