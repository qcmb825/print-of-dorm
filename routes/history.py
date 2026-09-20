"""routes/history.py —— 管理端「历史记录」：全部订单操作留痕的查询与统计。

这是订单详情页那份时间线的**全局版**：详情页回答「这一单经历了什么」，
这里回答「这段时间里大家都在干什么、哪一档堵住了」。

数据源只有一张表 `order_logs`（谁、什么时候、对哪一单做了什么），
它从 v8 起就是订单操作的唯一留痕出口，所以这里不需要任何新写入路径 ——
本模块**只读**。

两个接口：
  GET /api/admin/order-logs        列表（筛选 + 分页）
  GET /api/admin/order-logs/stats  统计（与列表同一套筛选条件）

筛选条件两边共用一份 SQL 片段（见 _build_where），否则「列表里 3 条、
统计说 5 条」这种对不上会天天出现，而且没人会去核对。
"""

from flask import Blueprint, jsonify, request

from auth import roles_required
from config import (ORDER_LOG_ACTIONS, ORDER_LOG_LABELS, ORDER_LOG_PICKUP,
                    ORDER_LOG_STATUS, ORDER_STATUSES, ROLE_ADMIN, ROLE_SUPER,
                    ST_DONE, public_role_label)
from db import db_conn
from utils import display_name, positive_int

bp = Blueprint('history', __name__)

# 关键词搜索的最大长度：与订单台检索同一个量级（ORDER_SEARCH_MAX），
# 超长的输入没有意义，还会让 LIKE 变慢。
SEARCH_MAX = 64
# 按天趋势最多回多少天：不设上限的话，一个三年的库能让响应变成几百个点，
# 而页面上根本画不下 —— 超出部分由时间范围筛选去取。
TREND_MAX_DAYS = 60
# 操作人排行取前几名
ACTOR_TOP = 8


def _status_like(status):
    """detail 里「状态被改成 X」的匹配串（老留痕兜底用）。

    detail 的格式是「「旧状态」→「新状态」」，所以匹配串是 `%→「X」%`。
    ⚠️ 这个格式串**以 % 开头**，两个百分号都必须写成 %%（一个转义开头的 %，
    一个转义结尾的通配 %）—— 少转义一个，Python 会当场
    `ValueError: unsupported format character`（实测踩过一次，接口直接 500）。
    """
    return '%%→「%s」%%' % status


def _status_clause():
    """「这一单被改成了某个状态」的 SQL 判定式（列表筛选与统计共用同一份）。

    三种留痕都要认，少认一种就会**静默漏数**（筛选出来少几条、统计也跟着小，
    但两边看着都「很正常」）：
      ① v16 起的新留痕：`to_status` 列直接写着；
      ② v16 之前改状态的留痕：detail 里写着「「旧」→「新」」；
      ③ v16 之前**柜台凭码取件**的留痕：detail 只有「凭单号确认取件」，
         没有箭头 —— 但 `action='pickup'` 本身就意味着终态是「已取件」。

    判定式里 ? 依次是：目标状态、LIKE 串、目标状态、ST_DONE（最后一个 ? 用来
    和「已取件」比大小写不敏感的相等 —— 写成 SQL 字面量会把状态文案钉死在 SQL 里）。
    """
    return "(l.to_status = ? OR l.detail LIKE ? OR (l.action = 'pickup' AND ? = ?))"


def _derive_to_status(action, detail, stored):
    """列表里「结果状态」那一列显示什么。

    与 _status_clause 是同一套口径的三个分支，否则会出现「筛已取件筛到了这条、
    它的结果状态列却是空的」——筛选和展示自相矛盾，看的人只会以为数据错了。
    推导只用于**展示**，不写回库（v16 刻意不倒推历史数据，见 db.py 的迁移注释）。
    """
    if stored:
        return stored
    if action == ORDER_LOG_PICKUP:
        return ST_DONE
    if action == ORDER_LOG_STATUS and detail:
        # detail 形如「「待打印」→「可取件」」：取箭头右边、剥掉书名号再校验
        tail = detail.rsplit('→', 1)
        if len(tail) == 2:
            candidate = tail[1].strip().strip('「」')
            if candidate in ORDER_STATUSES:
                return candidate
    return None


def _build_where(args):
    """把查询参数拼成 WHERE 子句与参数表。列表和统计共用。

    支持：
      action   操作类型（config.ORDER_LOG_ACTIONS 之一）
      status   结果状态 —— 「这一单被改成了 X」（改状态/柜台取件）
      from/to  日期范围（本地日期，YYYY-MM-DD，含头含尾）
      q        关键词：订单号（精确）、留痕正文、操作人昵称/姓名（模糊）

    ⚠️ status 的匹配写成 `to_status = ? OR detail LIKE '%→「X」%'`：
    v16 之后的新留痕有 to_status 列，老留痕没有（刻意不倒推数据），
    但老留痕的 detail 里本来就写着「「旧」→「新」」，所以两种都能认下来。
    """
    clauses, params = [], []

    action = (args.get('action') or '').strip()
    if action in ORDER_LOG_ACTIONS:
        clauses.append('l.action = ?')
        params.append(action)

    status = (args.get('status') or '').strip()
    if status in ORDER_STATUSES:
        clauses.append(_status_clause())
        # LIKE 里的中文按「→「状态」」这种原文匹配；ESCAPE 用不上（状态里没有通配符）
        params.extend([status, _status_like(status), status, ST_DONE])

    date_from = (args.get('from') or '').strip()
    if _looks_like_date(date_from):
        # 时间戳是 UTC，展示与筛选一律换成本地时间再比 —— 与列表里显示的口径一致
        clauses.append("datetime(l.create_time, 'localtime') >= ?")
        params.append(date_from + ' 00:00:00')

    date_to = (args.get('to') or '').strip()
    if _looks_like_date(date_to):
        clauses.append("datetime(l.create_time, 'localtime') <= ?")
        params.append(date_to + ' 23:59:59')

    keyword = (args.get('q') or '').strip()[:SEARCH_MAX]
    if keyword:
        like = '%' + keyword.replace('%', r'\%').replace('_', r'\_') + '%'
        # 订单号是精确匹配（人报的号码不是拿来模糊匹配的），其余走 LIKE。
        # 操作人姓名也一起搜：出问题时最常见的问法是「某某那天改了什么」。
        clauses.append(r'''(
            CAST(l.order_id AS TEXT) = ?
            OR l.detail LIKE ? ESCAPE '\'
            OR u.nickname LIKE ? ESCAPE '\'
            OR u.real_name LIKE ? ESCAPE '\'
        )''')
        params.extend([keyword, like, like, like])

    where = ('WHERE ' + ' AND '.join(clauses)) if clauses else ''
    return where, params


def _looks_like_date(text):
    """只做形状检查（YYYY-MM-DD）。格式不对就当没传，不报 400 ——
    筛选框清空时前端可能送来空串或半个日期，那不是错误，只是没选。"""
    if len(text) != 10 or text[4] != '-' or text[7] != '-':
        return False
    return text[:4].isdigit() and text[5:7].isdigit() and text[8:].isdigit()


@bp.route('/api/admin/order-logs')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_order_logs():
    """订单操作留痕列表，按时间倒序 + 分页。"""
    where, params = _build_where(request.args)
    page = positive_int(request.args.get('page'), 1)
    size = positive_int(request.args.get('size'), 30, maximum=100)

    with db_conn() as conn:
        total = conn.execute(
            'SELECT COUNT(*) AS c FROM order_logs l LEFT JOIN users u ON u.id = l.actor_id '
            + where, params).fetchone()['c']
        rows = conn.execute('''
            SELECT l.id, l.order_id, l.action, l.detail, l.to_status, l.actor_role,
                   datetime(l.create_time, 'localtime') AS create_time,
                   u.nickname AS actor_nickname, u.status AS actor_status
            FROM order_logs l
            LEFT JOIN users u ON u.id = l.actor_id
            {where}
            ORDER BY l.id DESC
            LIMIT ? OFFSET ?
        '''.format(where=where), (*params, size, (page - 1) * size)).fetchall()

    logs = []
    for row in rows:
        entry = dict(row)
        entry['action_label'] = ORDER_LOG_LABELS.get(entry['action'], entry['action'])
        # 结果状态：老留痕没有 to_status 列，按同一套口径推导出来再给前端，
        # 避免「筛得到、列里却是空的」（见 _derive_to_status）
        entry['to_status'] = _derive_to_status(entry['action'], entry['detail'],
                                               entry['to_status'])
        # 昵称可能为 None（那条留痕的操作账号已被物理删除）—— display_name 对 None
        # **原样返回 None**，由前端显示成「（无归属）」：服务端不编文案，
        # 否则「没有账号」和「有账号但昵称就叫这个」在界面上分不开。
        entry['actor_nickname'] = display_name(entry.pop('actor_nickname'),
                                               entry.pop('actor_status', None))
        # 角色走对外口径（super 对外就叫管理员），与详情页时间线一致
        entry['actor_role_label'] = public_role_label(entry.pop('actor_role', None))
        logs.append(entry)

    return jsonify({'code': 0, 'total': total, 'page': page, 'size': size, 'logs': logs})


@bp.route('/api/admin/order-logs/stats')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_order_logs_stats():
    """与列表同一套筛选条件下的统计。

    by_action 里**十种动作全给**（没有的记 0）：筛选下拉直接从它取选项，
    少给一种就等于那一类永远筛不出来，而且界面上看不出来少了什么。
    by_status 同理，五个状态按流程顺序全给。
    """
    where, params = _build_where(request.args)

    with db_conn() as conn:
        total = conn.execute(
            'SELECT COUNT(*) AS c FROM order_logs l LEFT JOIN users u ON u.id = l.actor_id '
            + where, params).fetchone()['c']
        action_rows = {r['action']: r['c'] for r in conn.execute(
            'SELECT l.action, COUNT(*) AS c FROM order_logs l '
            'LEFT JOIN users u ON u.id = l.actor_id ' + where + ' GROUP BY l.action',
            params).fetchall()}
        # 状态流转：新记录读 to_status，老记录从 detail 的「→「X」」里认。
        # 与列表页 status 筛选用的是同一个判定式，两处口径必须一致。
        status_rows = {}
        for status in ORDER_STATUSES:
            status_clause = _status_clause()
            sql = ('SELECT COUNT(*) AS c FROM order_logs l '
                   'LEFT JOIN users u ON u.id = l.actor_id ')
            sql += (where + ' AND ' + status_clause) if where else ('WHERE ' + status_clause)
            status_rows[status] = conn.execute(
                sql, (*params, status, _status_like(status), status, ST_DONE)).fetchone()['c']
        day_rows = conn.execute(
            "SELECT date(datetime(l.create_time, 'localtime')) AS d, COUNT(*) AS c "
            'FROM order_logs l LEFT JOIN users u ON u.id = l.actor_id ' + where +
            ' GROUP BY d ORDER BY d DESC LIMIT ?',
            (*params, TREND_MAX_DAYS)).fetchall()
        actor_rows = conn.execute(
            'SELECT u.id AS actor_id, u.nickname, u.real_name, u.status AS actor_status, '
            'l.actor_role, COUNT(*) AS c '
            'FROM order_logs l LEFT JOIN users u ON u.id = l.actor_id ' + where +
            ' GROUP BY l.actor_id ORDER BY c DESC LIMIT ?',
            (*params, ACTOR_TOP)).fetchall()

    return jsonify({
        'code': 0,
        'total': total,
        'by_action': [{'action': action, 'label': ORDER_LOG_LABELS.get(action, action),
                       'count': action_rows.get(action, 0)} for action in ORDER_LOG_ACTIONS],
        'by_status': [{'status': status, 'count': status_rows.get(status, 0)}
                      for status in ORDER_STATUSES],
        # 按天趋势给的是**日期的升序**（画图从左到右），SQL 里为了 LIMIT 取的是
        # 最近 N 天所以先倒序，这里翻回来 —— 顺序本身是接口的一部分。
        'by_day': [{'date': r['d'], 'count': r['c']} for r in reversed(day_rows)],
        'by_actor': [{'nickname': display_name(r['nickname'], r['actor_status']),
                      'role_label': public_role_label(r['actor_role']),
                      'count': r['c']} for r in actor_rows],
    })
