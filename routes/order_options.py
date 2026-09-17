"""routes/order_options.py —— 打印选项：预设打印服务、纸张类型的查询与后台维护。

这一块和 routes/announcements.py 是同一类东西（管理员维护的一小张配置表），
但有一条关键区别：**这里的每一条都会被抄进订单里**。

预设的文本、纸张的名字和备注，在下单那一刻会整段复制到 orders
（preset_content / paper_name / paper_remark）。所以管理员之后随便改、随便删，
老订单读出来的仍然是当时那句原话 —— 打印员照着三个月的记录核对活件时，
看到的不会是一段被人改过的要求。
"""

from flask import Blueprint, g, jsonify, request

from auth import login_required, roles_required
from config import (PAPER_NAME_MAX, PAPER_REMARK_MAX, PRESET_CONTENT_MAX, PRESET_CONTENT_MIN,
                    ROLE_ADMIN, ROLE_SUPER, logger)
from db import find_paper_type, find_preset, get_db
from security import audit_action, client_ip

bp = Blueprint('order_options', __name__)


# 所有管理员都能维护打印选项（含新建/改名/停用/删除），这一点和账号管理不同 ——
# 账号管理把写接口收在 ROLE_SUPER，因为它动的是别人的身份，出事别人替你背。
# 而「楼里现在有哪种纸」正是打印员自己最清楚的事，还要求他去喊默认管理员
# 才能加一种纸，这条配置最后就会变成没人维护的摆设。
#
# 删除也不可怕：订单存的是文本快照，删掉一种纸不会让任何历史订单读不出来。
# 真正危险的动作（改别人的角色、看别人的明文密码）才归 ROLE_SUPER。


def _clean_text(value, field_label, max_length, min_length=1):
    """清洗一个人工填写的单行文本，返回 (文本, 错误信息)。

    换行和制表符一律拒掉：这些东西在详情页里是一行一个字段，
    混进一个换行就会把后面的字段挤到看不见的地方，而且没有任何报错。
    金额那边因为「数字里有 \n」而踩过同一类坑（见 utils.parse_price）。
    """
    text = (value or '').strip()
    if len(text) < min_length:
        return None, '请填写%s' % field_label
    if len(text) > max_length:
        return None, '%s不能超过 %s 个字' % (field_label, max_length)
    if not all(ch.isprintable() for ch in text):
        return None, '%s里不能有换行或制表符' % field_label
    return text, None



def _parse_preset(data):
    """校验预设内容，返回 (字典, 错误信息)。

    预设就是一段文本，没有名称：学生下单时看到的那句话，和订单里记下来的那句话，
    必须是同一份东西，所以不给它第二个可以描述自己的字段。
    """
    content, error = _clean_text(
        data.get('content'), '预设内容', PRESET_CONTENT_MAX, PRESET_CONTENT_MIN)
    if error:
        return None, error
    return {'content': content}, None



def _parse_paper(data):
    """校验纸张类型，返回 (字典, 错误信息)。remark 可以为空。"""
    name, error = _clean_text(data.get('name'), '纸张名称', PAPER_NAME_MAX)
    if error:
        return None, error
    remark = (data.get('remark') or '').strip()
    if len(remark) > PAPER_REMARK_MAX:
        return None, '备注不能超过 %s 个字' % PAPER_REMARK_MAX
    if remark and not all(ch.isprintable() for ch in remark):
        return None, '备注里不能有换行或制表符'
    # 空备注存 NULL 而不是空串：读的地方只需要判一次 None，
    # 不用再同时防 '' —— 两种「空」是同一个坑埋两次。
    return {'name': name, 'remark': remark or None}, None



@bp.route('/api/print-options')
@login_required
def api_print_options():
    """学生下单页要的两份清单：启用中的预设 + 启用中的纸张类型。

    一次全给，不拆成两个接口：这两份清单本来就是一起用的（选了预设就不能传文件、
    选了纸张才谈得上份数），拆开只会让下单页多一次往返、多一段「一个到了一个没到」
    的中间态要处理。

    只发启用中的：停用的项不该出现在学生的下拉框里。管理端要看全部，
    那有它自己的 /api/admin/* 接口。
    """
    conn = get_db()
    try:
        presets = conn.execute('''
            SELECT id, content, datetime(update_time, 'localtime') AS update_time
            FROM print_presets
            WHERE is_active = 1
            ORDER BY id DESC
        ''').fetchall()
        papers = conn.execute('''
            SELECT id, name, remark, datetime(update_time, 'localtime') AS update_time
            FROM paper_types
            WHERE is_active = 1
            ORDER BY id ASC
        ''').fetchall()
    finally:
        conn.close()
    return jsonify({
        'code': 0,
        'presets': [dict(row) for row in presets],
        'paper_types': [dict(row) for row in papers],
    })



# ---- 管理端：预设打印服务 ----

@bp.route('/api/admin/print-presets')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_print_presets():
    """预设台账，含已停用的，方便改回来。"""
    conn = get_db()
    try:
        # used_count 是给「删不删」这道判断用的：预设删掉之后，
        # 历史订单里那句话还在（存的是快照），但「当初是哪一条」就断了。
        # 不显示这个数字，管理员只能在删完之后才发现自己没有回头路。
        #
        # 统计口径是 COALESCE(preset_group_id, preset_id)，也就是「这一组里有多少单」：
        # 管理员手动归入的文件单也算。只数 preset_id 的话会出现「刚把 5 单归进去，
        # 台账上还写着『还没有人用过』」—— 那句话不报错，只是假的，
        # 而它会直接把人推向「删掉吧，反正没人用」。
        rows = conn.execute('''
            SELECT p.id, p.content, p.is_active,
                   datetime(p.create_time, 'localtime') AS create_time,
                   datetime(p.update_time, 'localtime') AS update_time,
                   u.nickname AS author,
                   (SELECT COUNT(*) FROM orders o
                     WHERE COALESCE(o.preset_group_id, o.preset_id) = p.id) AS used_count
            FROM print_presets p
            LEFT JOIN users u ON u.id = p.created_by
            ORDER BY p.is_active DESC, p.id DESC
            LIMIT 100
        ''').fetchall()
    finally:
        conn.close()
    return jsonify({'code': 0, 'presets': [dict(row) for row in rows]})



@bp.route('/api/admin/print-presets', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_print_preset():
    payload, error = _parse_preset(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        cursor = conn.execute('''
            INSERT INTO print_presets (content, is_active, created_by)
            VALUES (?, 1, ?)
        ''', (payload['content'], g.user['id']))
        conn.commit()
        new_id = cursor.lastrowid
    finally:
        conn.close()
    logger.info('新建预设打印服务 #%s 操作人=%s(%s) ip=%s',
                new_id, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '预设已创建', 'id': new_id})



@bp.route('/api/admin/print-presets/<int:pid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_print_preset(pid):
    """改预设内容。

    改之前的那句话还能在历史订单里读到（orders.preset_content 存的是快照），
    所以这里不需要「改了会影响老订单」那种确认 —— 影响不到。
    """
    payload, error = _parse_preset(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        if find_preset(conn, pid) is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        conn.execute('''
            UPDATE print_presets SET content = ?, update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payload['content'], pid))
        conn.commit()
    finally:
        conn.close()
    logger.info('修改预设打印服务 #%s 操作人=%s(%s) ip=%s',
                pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '预设已更新'})



@bp.route('/api/admin/print-presets/<int:pid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_print_preset(pid):
    """启用 / 停用。停用只是不再出现在学生的可选项里，记录和引用都保留。"""
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    conn = get_db()
    try:
        if find_preset(conn, pid) is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        conn.execute('UPDATE print_presets SET is_active = ?, update_time = CURRENT_TIMESTAMP '
                     'WHERE id = ?', (1 if active else 0, pid))
        conn.commit()
    finally:
        conn.close()
    logger.info('%s预设打印服务 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})



@bp.route('/api/admin/print-presets/<int:pid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_print_preset(pid):
    """删除预设。

    可以直接删是因为订单存了文本快照 —— 历史订单读的还是当时那句话，
    不会因为这条被删掉而变成空白。真要说损失，只有「这一单当初用的是哪条预设」
    里的那个 id 再也点不开，而那句话本身还在订单里摆着。
    """
    conn = get_db()
    try:
        row = find_preset(conn, pid)
        if row is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        conn.execute('DELETE FROM print_presets WHERE id = ?', (pid,))
        conn.commit()
    finally:
        conn.close()
    # 删除是破坏性动作，走审计留痕（同一句里不放预设正文：那是可能很长的中文，
    # 审计日志里要的是一眼能看懂的「谁删了哪一条」）。
    audit_action('delete_print_preset', '删除预设打印服务 #%s' % pid)
    logger.info('删除预设打印服务 #%s 操作人=%s(%s) ip=%s',
                pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '预设已删除'})



# ---- 管理端：纸张类型 ----

@bp.route('/api/admin/paper-types')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_paper_types():
    conn = get_db()
    try:
        # 同预设：used_count 让「删除」这个动作在点下去之前就有分量。
        rows = conn.execute('''
            SELECT t.id, t.name, t.remark, t.is_active,
                   datetime(t.create_time, 'localtime') AS create_time,
                   datetime(t.update_time, 'localtime') AS update_time,
                   u.nickname AS author,
                   (SELECT COUNT(*) FROM orders o WHERE o.paper_type_id = t.id) AS used_count
            FROM paper_types t
            LEFT JOIN users u ON u.id = t.created_by
            ORDER BY t.is_active DESC, t.id ASC
            LIMIT 100
        ''').fetchall()
    finally:
        conn.close()
    return jsonify({'code': 0, 'paper_types': [dict(row) for row in rows]})



def _name_taken(conn, name, exclude_id=None):
    """查名字有没有被占用（不区分大小写，连已停用的也算）。

    查重查在应用层而不是建唯一索引，是因为索引会连已停用的记录一起挡住，
    于是「停用 A4 之后再建一条 A4」会撞 IntegrityError，报出来的还是数据库层的错，
    用户只看到「保存失败」。查在应用层才能给出一句能看懂的话。
    """
    sql = 'SELECT id FROM paper_types WHERE name = ?'
    params = [name]
    if exclude_id is not None:
        sql += ' AND id <> ?'
        params.append(exclude_id)
    return conn.execute(sql, params).fetchone() is not None



@bp.route('/api/admin/paper-types', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_paper_type():
    payload, error = _parse_paper(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        if _name_taken(conn, payload['name']):
            # 409 而不是 400：这不是「填错了」，是「跟已有的撞了」，
            # 前端据此可以把冲突说得更具体。
            return jsonify({'code': 409, 'msg': '已经有同名纸张了，换一个名字或直接改那一条'}), 409
        cursor = conn.execute('''
            INSERT INTO paper_types (name, remark, is_active, created_by)
            VALUES (?, ?, 1, ?)
        ''', (payload['name'], payload['remark'], g.user['id']))
        conn.commit()
        new_id = cursor.lastrowid
    finally:
        conn.close()
    logger.info('新建纸张类型 #%s 名称=%s 操作人=%s(%s) ip=%s',
                new_id, payload['name'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '纸张类型已创建', 'id': new_id})



@bp.route('/api/admin/paper-types/<int:tid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_paper_type(tid):
    payload, error = _parse_paper(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        if find_paper_type(conn, tid) is None:
            return jsonify({'code': 404, 'msg': '纸张类型不存在'}), 404
        if _name_taken(conn, payload['name'], exclude_id=tid):
            return jsonify({'code': 409, 'msg': '已经有同名纸张了，换一个名字'}), 409
        conn.execute('''
            UPDATE paper_types SET name = ?, remark = ?, update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payload['name'], payload['remark'], tid))
        conn.commit()
    finally:
        conn.close()
    logger.info('修改纸张类型 #%s 名称=%s 操作人=%s(%s) ip=%s',
                tid, payload['name'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '纸张类型已更新'})



@bp.route('/api/admin/paper-types/<int:tid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_paper_type(tid):
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    conn = get_db()
    try:
        if find_paper_type(conn, tid) is None:
            return jsonify({'code': 404, 'msg': '纸张类型不存在'}), 404
        conn.execute('UPDATE paper_types SET is_active = ?, update_time = CURRENT_TIMESTAMP '
                     'WHERE id = ?', (1 if active else 0, tid))
        conn.commit()
    finally:
        conn.close()
    logger.info('%s纸张类型 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})



@bp.route('/api/admin/paper-types/<int:tid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_paper_type(tid):
    """删除纸张类型。

    不阻止「还有订单用过它」—— 订单里存的是名字和备注的快照，
    删掉之后老订单照样显示得出当时用的是什么纸。真要拦住，就得先扫一遍整张订单表，
    而换来的只是一句「不能删」，管理员最后还是得先去停用，等于多绕一步。
    """
    conn = get_db()
    try:
        row = find_paper_type(conn, tid)
        if row is None:
            return jsonify({'code': 404, 'msg': '纸张类型不存在'}), 404
        conn.execute('DELETE FROM paper_types WHERE id = ?', (tid,))
        conn.commit()
    finally:
        conn.close()
    audit_action('delete_paper_type', '删除纸张类型 #%s' % tid)
    logger.info('删除纸张类型 #%s 操作人=%s(%s) ip=%s',
                tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '纸张类型已删除'})
