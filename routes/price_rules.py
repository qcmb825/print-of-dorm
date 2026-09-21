"""routes/price_rules.py —— 自动估价的**计价规则**（管理员维护的公式系数）。

这一块和 routes/order_options.py 是同一类东西（管理员维护的配置），但有一处
关键区别必须写在这里，否则以后一定会被改错：

    **它只影响预估价，永远不影响真正要收的钱。**
    真正的金额是 orders.price，由管理员在订单台上自己填（PUT /api/orders/<id>/price）。
    自动估价充其量是给他一个「填什么」的起点 —— 把这里的系数当成价目表本身，
    去想「改了公式老订单的钱会不会跟着变」，就走反了：老订单的 est_price
    是下单那一刻算出来的快照，改了规则也不会被重算（这是有意的，
    与预设正文、纸张名字抄进订单同一个道理）。

页面在管理端「计价规则」（frontend/src/views/staff/PricingView.vue）。
纸张的每页加价**不在这里改** —— 那是纸张自己的属性，入口在「打印选项」页，
本模块只把它读出来展示，免得同一件事有两个编辑框。
"""

from flask import Blueprint, g, jsonify, request

from auth import login_required, roles_required
from config import (COPIES_MAX, COPIES_MIN, EST_PAGES_MAX, ROLE_ADMIN, ROLE_SUPER, logger)
from db import db_conn, find_paper_type
import pricing
from security import audit_action, client_ip

bp = Blueprint('price_rules', __name__)


def _papers(conn):
    """纸张清单（含加价）：给管理页展示用，含已停用的 —— 停用的纸也可能被改过加价，
    排查「为什么这张单估出来是那个数」时要看得到它。"""
    rows = conn.execute('''
        SELECT id, name, is_active, price_delta FROM paper_types ORDER BY is_active DESC, id ASC
    ''').fetchall()
    return [dict(row) for row in rows]


@bp.route('/api/admin/price-rules')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_price_rules():
    """取计价规则 + 纸张加价 + 几句公式说明（页面上一屏要的东西一次给全）。

    和 /api/print-options 同一个取舍：分两个接口只会多一段「一个到了一个没到」
    的中间态，而这两样本来就是同一屏里一起看的。
    """
    with db_conn() as conn:
        rules = pricing.get_rules(conn)
        papers = _papers(conn)
    return jsonify({
        'code': 0,
        'rules': rules,
        'papers': papers,
        'lines': pricing.describe(rules),
        'limits': {'copies_min': COPIES_MIN, 'copies_max': COPIES_MAX},
    })


@bp.route('/api/admin/price-rules', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_save_price_rules():
    """保存规则（整页保存，缺一项就整页拒绝 —— 见 pricing.save_rules 的说明）。"""
    data = request.get_json(silent=True) or {}
    rules, error = pricing.save_rules(data, g.user['id'])
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    # 改价格公式是要事后能问「谁在什么时候把它改成这样」的那类动作，
    # 所以走审计留痕（audit_action 里只放系数本身，没有任何用户数据）。
    audit_action('update_price_rules',
                 '更新计价规则：' + '、'.join('%s=%s' % (key, rules[key])
                                              for key in sorted(rules)))
    logger.info('计价规则更新 操作人=%s(%s) ip=%s',
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '计价规则已保存', 'rules': rules,
                    'lines': pricing.describe(rules)})


@bp.route('/api/admin/price-rules/preview', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_price_preview():
    """试算：给一组「页数 / 份数 / 颜色 / 单双面 / 纸张」，按**当前已保存的规则**算一遍。

    为什么不放在前端算：公式只有一份（pricing.py），前端再镜像一遍必然漂移 ——
    哪天加了一项（比如装订费），前端那份不会跟着改，页面上就会显示一个
    和实际预估不一致的数字，而且两边都不报错。这点往返开销换的是「只有一个真相」。
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
    paper_delta = 0.0
    raw_paper = data.get('paper_type_id')
    if raw_paper not in (None, '', 0, '0'):
        with db_conn() as conn:
            paper = find_paper_type(conn, raw_paper) if str(raw_paper).isdigit() else None
        if paper is None:
            return jsonify({'code': 400, 'msg': '这张纸不存在了，刷新页面'}), 400
        paper_delta = float(paper['price_delta'] or 0)
    with db_conn() as conn:
        rules = pricing.get_rules(conn)
    price, note = pricing.estimate(rules, pages, copies,
                                   data.get('color'), data.get('duplex'), paper_delta)
    unit = pricing.unit_price(rules, data.get('color'), data.get('duplex'), paper_delta)
    return jsonify({'code': 0, 'price': price, 'note': note,
                    'unit_price': round(unit, 2),
                    'pages': pages, 'copies': copies})


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
