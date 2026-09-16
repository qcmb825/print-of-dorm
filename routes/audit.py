"""routes/audit.py —— 身份审核：学号不在名单上时的人工通道。

一个功能挂在两端，所以放在同一个文件里：

  公开端 —— 还没有账号的人提交申请、查自己的进度。这是全项目**唯一一个
            未登录也能写的接口**，所以频控和字段校验都比别处收得紧；
  管理端 —— 管理员看列表、批准或驳回。

为什么不复用工单（tickets）：工单是「已经登录进来的人和管理员对话」，
而申请人恰恰还没有账号，tickets.user_id 那一列根本填不出来。
硬塞过去就得把 NOT NULL 去掉，之后每个查工单的地方都要多问一句
「这条有没有主人」，把两个不相干的场景缠在一起。
"""

import sqlite3

from flask import Blueprint, g, jsonify, request

from auth import roles_required
from config import (AUDIT_APPROVED, AUDIT_PENDING, AUDIT_REJECTED, AUDIT_REVIEW_MAX,
                    AUDIT_STATUS_LABELS, AUDIT_STATUSES, ROLE_ADMIN, ROLE_SUPER, logger)
from db import get_db
from identity import RosterUnavailable, lookup, normalize_name
from security import audit_action, client_ip, hit_limit, security_event
from utils import display_name, validate_audit_request

bp = Blueprint('audit', __name__)


# 申请是全项目唯一「没登录也能写」的接口，天然是刷库的首选目标 ——
# 一个脚本每秒塞一条，这张表很快就没法看了。
# 一小时 3 次是有意的宽松值：正常人一辈子只需要提一次，
# 会撞到这个数的只可能是脚本，所以阈值给低了误伤、给高了没用。
SUBMIT_MAX_IN_WINDOW = 3

SUBMIT_WINDOW_SECONDS = 3600

# 查进度接口同样未登录可调，也得限速：不限的话它就成了一个
# 「拿学号批量试联系方式」的免费接口。
QUERY_MAX_IN_WINDOW = 20

QUERY_WINDOW_SECONDS = 3600


@bp.route('/api/audit-request', methods=['POST'])
def api_audit_submit():
    """提交身份审核申请。**不需要登录** —— 会来提这个的人恰恰是还没有账号的。"""
    data = request.get_json(silent=True) or {}
    payload, error = validate_audit_request(data)
    if error:
        # 用户填错很常见，只记 DEBUG；记 WARNING 会把真正的问题淹掉
        logger.debug('身份审核申请校验不通过：%s ip=%s', error, client_ip())
        return jsonify({'code': 400, 'msg': error}), 400

    if hit_limit('audit:' + client_ip(), SUBMIT_MAX_IN_WINDOW, SUBMIT_WINDOW_SECONDS):
        security_event('audit_request_rate_limited', '同一 IP 反复提交身份审核申请')
        return jsonify({'code': 429, 'msg': '申请提交过于频繁，请稍后再试'}), 429

    # 先看这个学号现在是什么情况。已经能和名单对齐的人不该占用一条申请记录 ——
    # 那不是「多一条待办」，而是让管理员去看一个本来不需要他看的东西。
    try:
        found, roster_name = lookup(payload['student_id'])
    except RosterUnavailable as exc:
        # 名单读不到时**不受理申请**。不是怕人滥用，是这时候收了也没用：
        # 管理员手里没有名单可对，只能攒下一堆处理不了的记录。
        logger.error('名单库不可用，拒绝受理审核申请：%s', exc)
        security_event('roster_unavailable', '提交审核申请时名单库不可用：%s' % exc)
        return jsonify({'code': 503, 'msg': '身份校验暂时不可用，请稍后再试'}), 503

    if found and (roster_name is None
                  or normalize_name(roster_name) == normalize_name(payload['real_name'])):
        # 两种情况都算「你本来就能注册」：名单里名字空着（注册时会自动补上），
        # 或者名字恰好对得上。指明这一点比回一句「已有记录」有用得多。
        return jsonify({'code': 409, 'msg': '你的信息可以直接注册，无需提交申请'}), 409

    conn = get_db()
    try:
        existing = conn.execute(
            'SELECT status FROM audit_requests WHERE student_id = ?',
            (payload['student_id'],)).fetchone()
        if existing is not None:
            # 一个学号只留一条记录（库里那个唯一索引也兜着这一条）。
            # 至于为什么不让重新提交：申请回答的是「我能不能注册」，
            # 同一个人不存在第二种答案，反复提交只会让管理员对着同一件事核对很多遍。
            # 驳回后确实需要重来的情形，管理员直接把那条改成「已通过」就行。
            label = AUDIT_STATUS_LABELS.get(existing['status'], existing['status'])
            return jsonify({'code': 409,
                            'msg': '该学号已有一条申请记录（%s），不能重复提交' % label}), 409
        cursor = conn.execute('''
            INSERT INTO audit_requests (student_id, real_name, contact_type, contact, note)
            VALUES (?, ?, ?, ?, ?)
        ''', (payload['student_id'], payload['real_name'], payload['contact_type'],
              payload['contact'], payload['note']))
        conn.commit()
        rid = cursor.lastrowid
    except sqlite3.IntegrityError:
        # 并发：两个请求同时越过了上面那句 SELECT，由唯一索引兜住第二个。
        # 这不是故障，是索引在正常工作，所以记 INFO 不记 WARNING。
        conn.rollback()
        logger.info('并发的重复申请被唯一索引拦下：学号=%s', payload['student_id'])
        return jsonify({'code': 409, 'msg': '该学号已有一条申请记录，不能重复提交'}), 409
    finally:
        conn.close()

    # 联系方式刻意不写进日志：日志是最容易被整包拷走、发给别人排错的东西
    # （README 里那段拒绝把管理员密码写进日志的理由，对这里同样成立）。
    # 申请记录本身在库里，需要时从管理端看。
    logger.info('收到身份审核申请 #%s 学号=%s 姓名=%s ip=%s',
                rid, payload['student_id'], payload['real_name'], client_ip())
    return jsonify({'code': 0, 'msg': '申请已提交，请等待管理员审核', 'id': rid})



@bp.route('/api/audit-request/status')
def api_audit_status():
    """查自己那条申请处理到哪一步了 —— 注册被拦时用来显示「我提的申请怎样了」。

    ★ 为什么必须学号 + 联系方式两个都对才给看：
      这个接口未登录就能调。只凭学号可查的话，拿一串学号挨个试
      就能问出「谁申请过、通没通过」—— 学号是连号的，猜起来没有任何成本。
      联系方式相当于一个只有申请人自己知道的口令，补上它才敢把结果给出去。
    """
    student_id = (request.args.get('student_id') or '').strip()
    contact = (request.args.get('contact') or '').strip()
    if not student_id or not contact:
        return jsonify({'code': 400, 'msg': '请填写学号和申请时留下的联系方式'}), 400

    if hit_limit('auditquery:' + client_ip(), QUERY_MAX_IN_WINDOW, QUERY_WINDOW_SECONDS):
        security_event('audit_query_rate_limited', '同一 IP 反复查询身份审核进度')
        return jsonify({'code': 429, 'msg': '查询过于频繁，请稍后再试'}), 429

    conn = get_db()
    try:
        row = conn.execute('''
            SELECT status, review_note, contact_type, contact,
                   datetime(create_time, 'localtime') AS create_time,
                   datetime(review_time, 'localtime') AS review_time
            FROM audit_requests
            WHERE student_id = ? AND contact = ?
        ''', (student_id, contact)).fetchone()
    finally:
        conn.close()

    if row is None:
        # 「学号不存在」和「联系方式对不上」合并成同一句：
        # 分开说等于告诉试探的人「学号蒙对了、联系方式没蒙对」，那正是他要的信息。
        return jsonify({'code': 404, 'msg': '没有找到对应的申请记录'}), 404
    return jsonify({'code': 0, 'request': {
        'student_id': student_id,
        'status': row['status'],
        'status_label': AUDIT_STATUS_LABELS.get(row['status'], row['status']),
        'review_note': row['review_note'],
        'create_time': row['create_time'],
        'review_time': row['review_time'],
    }})



@bp.route('/api/admin/audit-requests')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_audit_list():
    """申请列表，默认只看待审核的 —— 这是个待办队列，不是档案库。"""
    status = (request.args.get('status') or AUDIT_PENDING).strip()
    conn = get_db()
    try:
        where, params = '', []
        if status in AUDIT_STATUSES:
            where, params = 'WHERE r.status = ?', [status]
        rows = conn.execute('''
            SELECT r.id, r.student_id, r.real_name, r.contact_type, r.contact, r.note,
                   r.status, r.review_note, r.reviewed_by,
                   datetime(r.create_time, 'localtime') AS create_time,
                   datetime(r.review_time, 'localtime') AS review_time,
                   u.nickname AS reviewer_nickname, u.status AS reviewer_status
            FROM audit_requests r
            LEFT JOIN users u ON u.id = r.reviewed_by
            {where}
            ORDER BY r.id DESC
        '''.format(where=where), params).fetchall()
        # 三个状态各有多少条，一次查完给前端做筛选标签上的角标。
        # 一条一条去 COUNT 的话，列表刷新一次就是三趟查询。
        counts = dict(conn.execute(
            'SELECT status, COUNT(*) FROM audit_requests GROUP BY status').fetchall())
    finally:
        conn.close()

    items = [dict(r) for r in rows]
    for item in items:
        item['status_label'] = AUDIT_STATUS_LABELS.get(item['status'], item['status'])
        # 处理人账号注销之后名字会让给别人，不标就分不清这行字是谁写的（见 utils.display_name）
        item['reviewer_nickname'] = display_name(
            item['reviewer_nickname'], item.pop('reviewer_status', None))
    return jsonify({
        'code': 0,
        'requests': items,
        # 每个状态都给上，缺的那个补 0：前端直接取 counts.pending 就行，
        # 不用再写一层 `|| 0` 兜底 —— 少一处能写错的地方。
        'counts': {key: counts.get(key, 0) for key in AUDIT_STATUSES},
    })



@bp.route('/api/admin/audit-requests/<int:rid>/review', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_audit_review(rid):
    """批准或驳回一条申请。

    允许改判：管理员点错了、或者联系本人之后改了主意，都应该能修正。
    不给改判的话，他就只剩「直接去改数据库」这一条路 ——
    而那条路上连一行日志都不会留下。
    """
    data = request.get_json(silent=True) or {}
    action = (data.get('action') or '').strip().lower()
    note = (data.get('note') or '').strip()
    if action not in ('approve', 'reject'):
        return jsonify({'code': 400, 'msg': '操作不合法'}), 400
    if len(note) > AUDIT_REVIEW_MAX:
        return jsonify({'code': 400, 'msg': '备注不能超过 %s 个字' % AUDIT_REVIEW_MAX}), 400
    if action == 'reject' and not note:
        # 驳回必须写理由：申请人只看到「未通过」而不知道为什么，
        # 只会再找人来问一遍，一次处理变成两次。这段字是给他看的。
        return jsonify({'code': 400, 'msg': '驳回时请填写理由，申请人会看到它'}), 400

    new_status = AUDIT_APPROVED if action == 'approve' else AUDIT_REJECTED
    conn = get_db()
    try:
        row = conn.execute('SELECT * FROM audit_requests WHERE id = ?', (rid,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '申请不存在'}), 404
        conn.execute('''
            UPDATE audit_requests
               SET status = ?, review_note = ?, reviewed_by = ?, review_time = CURRENT_TIMESTAMP
             WHERE id = ?
        ''', (new_status, note or None, g.user['id'], rid))
        conn.commit()
    finally:
        conn.close()

    logger.info('身份审核 #%s 学号=%s 结论=%s 处理人=%s(%s) ip=%s',
                rid, row['student_id'], AUDIT_STATUS_LABELS[new_status],
                g.user['nickname'], g.user['role'], client_ip())
    # 管理动作必须留审计：这条记录决定了一个人能不能注册进来，
    # 事后得能查出来是谁、什么时候拍的板。
    audit_action('review_audit_request',
                 '申请 #%s（学号 %s）-> %s'
                 % (rid, row['student_id'], AUDIT_STATUS_LABELS[new_status]))
    return jsonify({'code': 0,
                    'msg': '已通过，该学号现在可以注册了' if new_status == AUDIT_APPROVED
                           else '已驳回'})
