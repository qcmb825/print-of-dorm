"""routes/admin.py —— 管理员接口：账号管理、统计。"""

from datetime import datetime, timedelta
from flask import Blueprint, g, jsonify, request

from auth import roles_required
from config import ROLE_ADMIN, ROLE_LABELS, ROLE_SUPER, ROLE_USER
from db import get_db
from security import audit_action, decrypt_password, security_event

bp = Blueprint('admin', __name__)


# 超级管理员接口

# 账号列表，超管看全部，管理员看不到超管也看不到密码
@bp.route('/api/admin/users')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_users():
    """账号列表：管理员和超管都能看，但两类敏感信息各自做了收口。

    密码默认不出现在响应里，只有超管显式带 ?with_password=1 才解密，而且强制审计留痕；
    超管账号则是管理员看不到。

    超管账号这条故意放在 SQL 里过滤，不是让前端不渲染：
    前端过滤只是蒙眼睛，数据早就躺在响应体里了，按 F12 看网络请求或者 curl 一把就全看得见，
    等于没隐藏。敏感数据的正确做法是让不该给的人拿都拿不到，而不是给了但指望他不看。
    """
    is_super = g.user['role'] == ROLE_SUPER
    want_password = is_super and request.args.get('with_password') in ('1', 'true', 'yes')

    conn = get_db()
    try:
        # 片段都是代码里写死的常量，值一律走 ? 占位符，这样既没有注入口子，
        # 也不用把整条 SQL 抄两遍。（以后往这条 SQL 里加别的 {} 会和 .format 打架，
        # 到时候改成拼两条完整语句更稳。）
        where, params = '', ()
        if not is_super:
            where, params = 'WHERE u.role != ?', (ROLE_SUPER,)
        rows = conn.execute('''
            SELECT u.id, u.nickname, u.real_name, u.student_id, u.dorm, u.contact_type, u.contact,
                   u.password_enc, u.role, u.status,
                   datetime(u.create_time, 'localtime') AS create_time,
                   datetime(u.last_login, 'localtime') AS last_login,
                   (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count,
                   (SELECT COUNT(*) FROM orders o WHERE o.claimed_by = u.id) AS claimed_count
            FROM users u
            {where}
            ORDER BY CASE u.role WHEN 'super' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, u.id
        '''.format(where=where), params).fetchall()
    finally:
        conn.close()

    users = []
    for row in rows:
        item = dict(row)
        item.pop('password_enc', None)  # 密文绝不进响应体
        if want_password:
            item['password'] = decrypt_password(row['password_enc']) or '（无法解密）'
        item['role_label'] = ROLE_LABELS.get(item['role'], item['role'])
        users.append(item)

    if want_password:
        # 一次性吐出全部账号的明文密码，是系统里最敏感的操作，必须留痕。
        # 但只记是谁、什么时候、拉了几个账号，绝不记密码本身，日志不能变成第二个泄露源。
        audit_action('view_plaintext_passwords',
                     '拉取全部账号列表 %s 个（含明文密码）' % len(users))
    return jsonify({'code': 0, 'total_users': len(users),
                    'with_password': want_password, 'users': users})



# 升级 / 降级账号角色，超管专属，也不能动超管自己的角色
@bp.route('/api/admin/user/<int:user_id>/role', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_set_role(user_id):
    data = request.get_json(silent=True) or {}
    new_role = (data.get('role') or '').strip()
    if new_role not in (ROLE_USER, ROLE_ADMIN):
        return jsonify({'code': 400, 'msg': '只能设置成普通用户或管理员'}), 400
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能修改自己的角色'}), 400

    conn = get_db()
    try:
        target = conn.execute('SELECT role, nickname FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('role_change_denied', '试图修改超管 #%s 的角色' % user_id)
            return jsonify({'code': 403, 'msg': '不能修改超级管理员的角色'}), 403
        conn.execute('UPDATE users SET role = ? WHERE id = ?', (new_role, user_id))
        conn.commit()
    finally:
        conn.close()
    # 提权 / 降权是权限体系的核心动作，必须审计留痕，还要记清改前改后
    audit_action('change_role',
                 '目标 #%s/%s %s -> %s' % (user_id, target['nickname'], target['role'], new_role))
    return jsonify({'code': 0, 'msg': f'已设置为{ROLE_LABELS[new_role]}'})



# 启用 / 禁用账号
@bp.route('/api/admin/user/<int:user_id>/status', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_set_status(user_id):
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or '').strip()
    if new_status not in ('active', 'disabled'):
        return jsonify({'code': 400, 'msg': '状态只能是 active 或 disabled'}), 400
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能禁用自己的账号'}), 400

    conn = get_db()
    try:
        target = conn.execute('SELECT role, nickname, status FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('account_disable_denied', '试图禁用超管 #%s' % user_id)
            return jsonify({'code': 403, 'msg': '不能禁用超级管理员'}), 403
        conn.execute('UPDATE users SET status = ? WHERE id = ?', (new_status, user_id))
        conn.commit()
    finally:
        conn.close()
    audit_action('change_status',
                 '目标 #%s/%s 状态 %s -> %s' % (user_id, target['nickname'], target['status'], new_status))
    return jsonify({'code': 0, 'msg': '已启用' if new_status == 'active' else '已禁用'})



# 删除账号，订单作为业务凭证保留，只解除关联
@bp.route('/api/admin/user/<int:user_id>', methods=['DELETE'])
@roles_required(ROLE_SUPER)
def api_admin_delete_user(user_id):
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能删除自己的账号'}), 400

    conn = get_db()
    try:
        target = conn.execute('SELECT role, nickname FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('account_delete_denied', '试图删除超管 #%s' % user_id)
            return jsonify({'code': 403, 'msg': '不能删除超级管理员'}), 403
        conn.execute('UPDATE orders SET user_id = NULL WHERE user_id = ?', (user_id,))
        conn.execute('UPDATE orders SET claimed_by = NULL, claim_time = NULL WHERE claimed_by = ?', (user_id,))
        conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
    finally:
        conn.close()
    audit_action('delete_account',
                 '删除账号 #%s/%s，其订单保留但解除关联' % (user_id, target['nickname']))
    return jsonify({'code': 0, 'msg': '账号已删除'})



# 可视化统计数据，管理员和超管都能看，这里只有只读聚合数据，不含敏感字段
@bp.route('/api/admin/stats')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_stats():
    # 管理员视角下，超管账号在统计里也必须"不存在"。
    # 否则账号列表显示 3 个、统计却说总数 4，等于变相告诉管理员
    # 还有一个你看不到的账号。挡了列表却漏了数字，等于没挡。
    # 超管看自己的系统要完整口径，不加这个条件。
    role_filter = '' if g.user['role'] == ROLE_SUPER else " AND role != 'super'"

    conn = get_db()
    try:
        # 这几条都涉及账号，统一带上 role_filter；下面订单相关的不涉及角色，不动。
        users_total = conn.execute(
            'SELECT COUNT(*) AS c FROM users WHERE 1 = 1' + role_filter).fetchone()['c']
        users_active = conn.execute(
            "SELECT COUNT(*) AS c FROM users WHERE status = 'active'" + role_filter).fetchone()['c']
        orders_total = conn.execute('SELECT COUNT(*) AS c FROM orders').fetchone()['c']
        claimed = conn.execute('SELECT COUNT(*) AS c FROM orders WHERE claimed_by IS NOT NULL').fetchone()['c']
        new_users_7d = conn.execute(
            "SELECT COUNT(*) AS c FROM users WHERE create_time >= datetime('now', '-6 days')" + role_filter
        ).fetchone()['c']
        role_rows = conn.execute(
            'SELECT role, COUNT(*) AS c FROM users WHERE 1 = 1' + role_filter
            + ' GROUP BY role').fetchall()
        status_rows = conn.execute('SELECT status, COUNT(*) AS c FROM orders GROUP BY status').fetchall()
        color_rows = conn.execute(
            "SELECT COALESCE(color_type, 'black') AS k, COUNT(*) AS c FROM orders GROUP BY k"
        ).fetchall()
        duplex_rows = conn.execute(
            "SELECT COALESCE(duplex, 'single') AS k, COUNT(*) AS c FROM orders GROUP BY k"
        ).fetchall()
        day_rows = conn.execute('''
            SELECT date(create_time, 'localtime') AS d, COUNT(*) AS c
            FROM orders
            WHERE create_time >= datetime('now', '-13 days')
            GROUP BY d ORDER BY d
        ''').fetchall()
        # 别名用 count 而不是 c：这是返回给前端的字段名，要和 daily 里的 count 保持一致。
        # （当初写成 c，前端按 count 取就拿到 undefined，图表会静默画不出柱子。）
        top_claimers = conn.execute('''
            SELECT u.nickname AS nickname, COUNT(*) AS count
            FROM orders o JOIN users u ON u.id = o.claimed_by
            GROUP BY o.claimed_by ORDER BY count DESC LIMIT 5
        ''').fetchall()
    finally:
        conn.close()

    counts = {r['d']: r['c'] for r in day_rows}
    today = datetime.now().date()
    daily = [
        {'date': (today - timedelta(days=offset)).isoformat(), 'count': counts.get((today - timedelta(days=offset)).isoformat(), 0)}
        for offset in range(13, -1, -1)
    ]

    return jsonify({
        'code': 0,
        'users': {
            'total': users_total,
            'active': users_active,
            'disabled': users_total - users_active,
            'new_7d': new_users_7d,
            'by_role': {r['role']: r['c'] for r in role_rows},
        },
        'orders': {
            'total': orders_total,
            'claimed': claimed,
            'unclaimed': orders_total - claimed,
            'by_status': {r['status']: r['c'] for r in status_rows},
            'by_color': {r['k']: r['c'] for r in color_rows},
            'by_duplex': {r['k']: r['c'] for r in duplex_rows},
        },
        'daily': daily,
        'top_claimers': [dict(r) for r in top_claimers],
    })
