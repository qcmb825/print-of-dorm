"""routes/price_table.py —— **价目表**：管理员维护的一张表，学生下单时直接选一条。

一条价目项 = 纸张 + 类型 + 单面价 + 双面价 + 备注（见 db.py 里 v20 那段：
为什么不是「基价 + 加价」的算法）。这里管它的增删改查，外加两件配套的东西：

  · **全局系数**（每单基础费 / 最低消费）与**价目表说明**（给学生看的那几条「注」）——
    它们住在 price_rules 表里，和价目项一起在管理页上编辑；
  · **试算**：给「价目项 + 页数 + 份数 + 单双面」按当前价目表算一遍。
    试算**必须走服务端**：公式只有一份（pricing.py），前端再镜像一遍必然漂移，
    而漂了不报错，只是页面上的数字开始说谎。

一处必须写在这里、否则以后一定会被改错的边界：

    **价目表只影响预估价，永远不影响真正要收的钱。**
    最终金额是 orders.price，由管理员在订单台上自己填（接单后点「计费」，
    弹窗拿预估价预填）。把这张表当成"价目表本身"去想「改了会不会动到老订单的钱」，
    就走反了：老订单的 est_price 是下单那一刻的快照，改价目表不会重算它 ——
    与预设正文、纸张名字抄进订单同一个道理。

页面在管理端「价目表」（frontend/src/views/staff/PricingView.vue）。
"""

from flask import Blueprint, g, jsonify, request

from auth import login_required, roles_required
from config import (COPIES_MAX, COPIES_MIN, EST_PAGES_MAX, ROLE_ADMIN, ROLE_SUPER, logger)
from db import db_conn
import pricing
from security import audit_action, client_ip

bp = Blueprint('price_table', __name__)


def _items_with_usage(conn):
    """价目表 + 每条被多少订单用过（给「删不删」这道判断用）。

    统计口径是 orders.price_item_id：快照列（price_item_name）证明的是"当时那句话"，
    而"当初是哪一条"只有 id 记得住 —— 不显示这个数字，管理员只能在删完之后
    才发现自己没有回头路。
    """
    rows = conn.execute('''
        SELECT p.*,
               (SELECT COUNT(*) FROM orders o WHERE o.price_item_id = p.id) AS used_count
        FROM price_items p
        ORDER BY p.is_active DESC, p.sort_order ASC, p.id ASC
        LIMIT 200
    ''').fetchall()
    return [dict(row) for row in rows]


@bp.route('/api/price-table')
@login_required
def api_price_table():
    """学生（与机器人）看的价目表：**只给启用中的**条目 + 说明文字。

    停用的条目不出现在这里 —— 与打印预设同一个口径：停用就是不再接新单，
    而"拿不到"比"不画出来"可靠。老订单照样读得到当时那句话（存的是快照）。
    """
    with db_conn() as conn:
        items = pricing.list_items(conn, only_active=True)
        rules = pricing.get_rules(conn)
    return jsonify({
        'code': 0,
        'items': [{
            'id': item['id'],
            'paper': item['paper'],
            'kind': item['kind'],
            'color': item['color'],
            'price_single': item['price_single'],
            'price_double': item['price_double'],
            'note': item['note'],
            'label': pricing.format_item_label(item),
        } for item in items],
        # 自动估价关掉时也把价目表给出去：那张表本身是**价目**，学生看得到价格
        # 仍然是好事（下单页照样能用它选类型），只是不再给"预估"那一句。
        'enabled': bool(rules.get('enabled')),
        'notes': rules.get('notes') or '',
    })


# ---- 管理端：价目项 ---------------------------------------------------------

@bp.route('/api/admin/price-items')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_price_items():
    with db_conn() as conn:
        items = _items_with_usage(conn)
        rules = pricing.get_rules(conn)
    return jsonify({
        'code': 0,
        'items': items,
        'rules': rules,
        'lines': pricing.describe(rules),
        'limits': {'copies_min': COPIES_MIN, 'copies_max': COPIES_MAX,
                   'paper_max': pricing.PAPER_MAX, 'kind_max': pricing.KIND_MAX,
                   'note_max': pricing.NOTE_MAX, 'notes_max': pricing.NOTES_MAX},
    })


@bp.route('/api/admin/price-items', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_price_item():
    payload, error = pricing.parse_price_item(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    with db_conn() as conn:
        cursor = conn.execute('''
            INSERT INTO price_items (paper, kind, color, price_single, price_double,
                                     note, is_active, sort_order, created_by)
            VALUES (?, ?, ?, ?, ?, ?, 1, ?, ?)
        ''', (payload['paper'], payload['kind'], payload['color'], payload['price_single'],
              payload['price_double'], payload['note'], payload['sort_order'], g.user['id']))
        conn.commit()
        new_id = cursor.lastrowid
    logger.info('新建价目项 #%s %s · %s 单面=%s 双面=%s 操作人=%s(%s) ip=%s',
                new_id, payload['paper'], payload['kind'], payload['price_single'],
                payload['price_double'] if payload['price_double'] is not None else '不支持',
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '价目项已创建', 'id': new_id})


@bp.route('/api/admin/price-items/<int:item_id>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_price_item(item_id):
    """改一条价目项。

    改了之后**老订单不受影响**（它们存的是当时那句快照 + 当时的预估价），
    所以这里不需要"改了会影响老订单"那种确认 —— 影响不到。
    """
    payload, error = pricing.parse_price_item(request.get_json(silent=True) or {},
                                              item_id=item_id)
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    with db_conn() as conn:
        if pricing.find_item(conn, item_id) is None:
            return jsonify({'code': 404, 'msg': '这条价目项不存在'}), 404
        conn.execute('''
            UPDATE price_items
            SET paper = ?, kind = ?, color = ?, price_single = ?, price_double = ?,
                note = ?, sort_order = ?, update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payload['paper'], payload['kind'], payload['color'], payload['price_single'],
              payload['price_double'], payload['note'], payload['sort_order'], item_id))
        conn.commit()
    logger.info('修改价目项 #%s %s · %s 单面=%s 双面=%s 操作人=%s(%s) ip=%s',
                item_id, payload['paper'], payload['kind'], payload['price_single'],
                payload['price_double'] if payload['price_double'] is not None else '不支持',
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '价目项已更新'})


@bp.route('/api/admin/price-items/<int:item_id>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_price_item(item_id):
    """启用 / 停用。停用只是不再出现在学生的可选项里，记录与历史订单都保留。"""
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    with db_conn() as conn:
        if pricing.find_item(conn, item_id) is None:
            return jsonify({'code': 404, 'msg': '这条价目项不存在'}), 404
        conn.execute('UPDATE price_items SET is_active = ?, update_time = CURRENT_TIMESTAMP '
                     'WHERE id = ?', (1 if active else 0, item_id))
        conn.commit()
    logger.info('%s价目项 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', item_id,
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})


@bp.route('/api/admin/price-items/<int:item_id>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_price_item(item_id):
    """删除一条价目项。

    不阻止"还有订单用过它"：订单里存的是当时的名字与预估价快照，
    删掉之后老订单照样显示得出当时按什么打的。真要拦住，就得先扫一遍整张订单表，
    换来的只是一句「不能删」，管理员最后还是得先去停用，等于多绕一步。
    """
    with db_conn() as conn:
        row = pricing.find_item(conn, item_id)
        if row is None:
            return jsonify({'code': 404, 'msg': '这条价目项不存在'}), 404
        conn.execute('DELETE FROM price_items WHERE id = ?', (item_id,))
        conn.commit()
    audit_action('delete_price_item',
                 '删除价目项 #%s（%s · %s）' % (item_id, row['paper'], row['kind']))
    logger.info('删除价目项 #%s 操作人=%s(%s) ip=%s',
                item_id, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '价目项已删除'})


# ---- 管理端：全局系数与说明 -------------------------------------------------

@bp.route('/api/admin/price-rules', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_save_price_rules():
    """保存全局系数与价目表说明（整页保存，缺一项就整页拒绝 —— 见 pricing.save_rules）。"""
    data = request.get_json(silent=True) or {}
    rules, error = pricing.save_rules(data, g.user['id'])
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    audit_action('update_price_rules',
                 '更新计价设置：基础费=%s 最低消费=%s 自动估价=%s'
                 % (rules['base_fee'], rules['min_price'],
                    '开' if rules['enabled'] else '关'))
    logger.info('计价设置更新 操作人=%s(%s) ip=%s',
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '计价设置已保存', 'rules': rules,
                    'lines': pricing.describe(rules)})


@bp.route('/api/admin/price-rules/preview', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_price_preview():
    """试算：给「价目项 + 页数 + 份数 + 单双面」，按**当前价目表**算一遍。

    前端不自己算（理由见模块开头）。它同时是管理员改价目表时的核对手段 ——
    「我填的这两个数对不对」看这里最快。
    """
    data = request.get_json(silent=True) or {}
    pages, error = _parse_pages(data.get('pages'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    try:
        copies = int(data.get('copies') or 1)
    except (TypeError, ValueError):
        return jsonify({'code': 400, 'msg': '份数要填数字'}), 400
    copies = max(COPIES_MIN, min(COPIES_MAX, copies))
    raw_item = data.get('price_item_id')
    if isinstance(raw_item, bool) or raw_item in (None, '', 0, '0'):
        return jsonify({'code': 400, 'msg': '请先选一条价目项'}), 400
    try:
        item_id = int(raw_item)
    except (TypeError, ValueError):
        return jsonify({'code': 400, 'msg': '价目项不合法，刷新页面重新选择'}), 400
    with db_conn() as conn:
        item = pricing.find_item(conn, item_id)
        if item is None:
            return jsonify({'code': 400, 'msg': '这条价目项不存在了，刷新页面'}), 400
        rules = pricing.get_rules(conn)
    duplex = pricing.normalize_duplex(data.get('duplex'))
    if duplex == 'double' and not pricing.supports_duplex(item):
        # 试算里直接说清楚：这一档不支持双面。不悄悄按单面算 ——
        # 那样管理员会以为"双面能打，只是价格一样"，而下单时这个选项根本不出现。
        return jsonify({'code': 400, 'msg': '这一档不支持双面'}), 400
    price, note = pricing.estimate(rules, item, pages, copies, duplex)
    return jsonify({'code': 0, 'price': price, 'note': note,
                    'unit_price': round(pricing.item_unit_price(item, duplex), 2),
                    'pages': pages, 'copies': copies, 'duplex': duplex,
                    'label': pricing.format_item_label(item)})


def _parse_pages(raw):
    """试算里的页数：正整数，卡在 1..EST_PAGES_MAX。

    上限和真实估算用的是同一个常数 —— 试算能填 5000 页、实际下单却按 2000 页截断的话，
    管理员会以为公式算错了。
    """
    if isinstance(raw, bool):
        return None, '页数要填数字'
    try:
        pages = int(str(raw).strip())
    except (TypeError, ValueError):
        return None, '页数要填数字'
    if pages < 1:
        return None, '页数至少是 1'
    if pages > EST_PAGES_MAX:
        return None, '页数最多按 %s 页算' % EST_PAGES_MAX
    return pages, None
