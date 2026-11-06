"""routes/printers.py —— 打印机管理：管理员在「打印选项」页增删改启停打印机，
以及下发前的设备状态查询与表单探测。

打印机是**数据库实体**（printers 表），所以这里没有「联动开关键」——
启用中的打印机 ≥ 1 台，订单台的下发按钮与设备徽标就出现。
CRUD 的形状照 order_options.py 的 print-presets / paper-types 惯例：
roles_required、_clean_text、重名 409、删除才写 audit。
"""
from flask import Blueprint, g, jsonify, request

from auth import roles_required
from config import ROLE_ADMIN, ROLE_SUPER, logger
from db import db_conn, find_printer, find_active_printers
from printer import DispatchError, probe_host, query_printer
from security import audit_action, client_ip
from utils import parse_bool_flag

bp = Blueprint('printers', __name__)

PRINTER_NAME_MAX = 40
PRINTER_HOST_MAX = 120
IPP_PATH_MAX = 120
# 设备在线态的缓存（每台一份）。打印机在不在线不比订单流转变得勤，
# 而每次轮询都去戳它，等于把打印机的 HTTP 口也当成了数据库。
_STATUS_TTL_SECONDS = 30
_status_cache = {}
_STATUS_QUERY_TIMEOUT = 8


def _clean_text(value, field, min_len, max_len):
    text = (value or '').strip()
    if len(text) < min_len or len(text) > max_len:
        return None, '%s长度须在 %d–%d 字之间' % (field, min_len, max_len)
    if not all(ch.isprintable() for ch in text):
        return None, '%s含不可见字符' % field
    return text, None


def _parse_printer(data):
    """校验一台打印机的表单。返回 (payload, error) —— 照 _parse_preset 的形状。

    mode/port/ipp_path 都给缺省：默认 ipp + 协议公认端口 + 最常见的队列路径，
    探测按钮会把这三个值回填成实测结论。
    """
    name, err = _clean_text(data.get('name'), '名称', 2, PRINTER_NAME_MAX)
    if err:
        return None, err
    host, err = _clean_text(data.get('host'), '主机地址', 3, PRINTER_HOST_MAX)
    if err:
        return None, err
    mode = (data.get('mode') or 'ipp').strip().lower()
    if mode not in ('ipp', 'raw9100'):
        return None, '下发协议只认 ipp / raw9100'
    port = data.get('port')
    if port in (None, ''):
        port = 0
    else:
        try:
            port = int(port)
        except (TypeError, ValueError):
            return None, '端口须是数字'
        if not (0 <= port <= 65535):
            return None, '端口超出 0–65535'
    ipp_path, err = _clean_text(data.get('ipp_path') or '/ipp/print',
                                'IPP 路径', 1, IPP_PATH_MAX)
    if err:
        return None, err
    if not ipp_path.startswith('/'):
        return None, 'IPP 路径须以 / 开头'
    return {'name': name, 'host': host, 'mode': mode, 'port': port, 'ipp_path': ipp_path}, None


def _name_taken(conn, name, exclude_id=None):
    """重名检查：包含停用的行（停用不是让位，改回来才不撞名）—— 照 paper_types 的口径。"""
    row = conn.execute('SELECT id FROM printers WHERE name = ? COLLATE NOCASE',
                       (name,)).fetchone()
    return row is not None and row['id'] != exclude_id


@bp.route('/api/admin/printers')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_printers():
    with db_conn() as conn:
        rows = conn.execute('''
            SELECT p.*, u.nickname AS author
            FROM printers p LEFT JOIN users u ON u.id = p.created_by
            ORDER BY p.is_active DESC, p.id
        ''').fetchall()
    items = []
    for row in rows:
        item = dict(row)
        item['author'] = item.pop('author') or None
        items.append(item)
    return jsonify({'code': 0, 'printers': items})


@bp.route('/api/admin/printers', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_printer():
    payload, err = _parse_printer(request.get_json(silent=True) or {})
    if err:
        return jsonify({'code': 400, 'msg': err}), 400
    with db_conn() as conn:
        if _name_taken(conn, payload['name']):
            return jsonify({'code': 409, 'msg': '已有同名的打印机'}), 409
        cursor = conn.execute(
            'INSERT INTO printers (name, host, mode, port, ipp_path, is_active, created_by) '
            'VALUES (?, ?, ?, ?, ?, 1, ?)',
            (payload['name'], payload['host'], payload['mode'],
             payload['port'], payload['ipp_path'], g.user['id']))
        new_id = cursor.lastrowid
        conn.commit()
    logger.info('新建打印机 #%s「%s」(%s %s:%s) 操作人=%s(%s) ip=%s',
                new_id, payload['name'], payload['mode'], payload['host'],
                payload['port'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '打印机已创建', 'id': new_id})


@bp.route('/api/admin/printers/<int:pid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_printer(pid):
    payload, err = _parse_printer(request.get_json(silent=True) or {})
    if err:
        return jsonify({'code': 400, 'msg': err}), 400
    with db_conn() as conn:
        if find_printer(conn, pid) is None:
            return jsonify({'code': 404, 'msg': '打印机不存在'}), 404
        if _name_taken(conn, payload['name'], exclude_id=pid):
            return jsonify({'code': 409, 'msg': '已有同名的打印机'}), 409
        conn.execute(
            'UPDATE printers SET name = ?, host = ?, mode = ?, port = ?, ipp_path = ?, '
            'update_time = CURRENT_TIMESTAMP WHERE id = ?',
            (payload['name'], payload['host'], payload['mode'],
             payload['port'], payload['ipp_path'], pid))
        conn.commit()
    logger.info('修改打印机 #%s「%s」 操作人=%s(%s) ip=%s',
                pid, payload['name'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '打印机已更新'})


@bp.route('/api/admin/printers/<int:pid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_printer_active(pid):
    data = request.get_json(silent=True) or {}
    active = parse_bool_flag(data.get('active'))
    if active is None:
        return jsonify({'code': 400, 'msg': 'active 只认 true / false'}), 400
    with db_conn() as conn:
        if find_printer(conn, pid) is None:
            return jsonify({'code': 404, 'msg': '打印机不存在'}), 404
        conn.execute('UPDATE printers SET is_active = ?, update_time = CURRENT_TIMESTAMP '
                     'WHERE id = ?', (1 if active else 0, pid))
        conn.commit()
    logger.info('打印机 #%s %s 操作人=%s(%s) ip=%s',
                pid, '已启用' if active else '已停用',
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})


@bp.route('/api/admin/printers/<int:pid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_printer(pid):
    with db_conn() as conn:
        printer = find_printer(conn, pid)
        if printer is None:
            return jsonify({'code': 404, 'msg': '打印机不存在'}), 404
        conn.execute('DELETE FROM printers WHERE id = ?', (pid,))
        conn.commit()
    # 历史不跟着删：print_jobs 里存的是名字快照，删机后逐台明细照读。
    audit_action('delete_printer', '删除打印机 #%s「%s」' % (pid, printer['name']))
    return jsonify({'code': 0, 'msg': '打印机已删除'})


@bp.route('/api/admin/printers/probe', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_probe_printer():
    """表单的「探测」按钮：给一个主机地址，回协议/端口/队列路径/型号 ——
    探测逻辑与 scripts/probe_printer.py 的 CLI 共用 printer.probe_host。"""
    host = ((request.get_json(silent=True) or {}).get('host') or '').strip()
    if not host:
        return jsonify({'code': 400, 'msg': '先填主机地址再探测'}), 400
    result = probe_host(host)
    if result['error']:
        return jsonify({'code': 400, 'msg': '探测失败：%s' % result['error']}), 400
    model = result['state'].get('printer-make-and-model') if result['state'] else None
    if isinstance(model, list):
        model = model[0] if model else None
    return jsonify({'code': 0, 'mode': result['mode'], 'port': result['port'],
                    'ipp_path': result['ipp_path'], 'model': model})


def _printer_online_state(printer):
    """问一台打印机的实时状态。成功返回 (state 字典, None)，失败返回 (None, 原因)。"""
    pr = {'host': printer['host'], 'mode': printer['mode'],
          'port': printer['port'], 'ipp_path': printer['ipp_path']}
    try:
        return query_printer(pr, timeout=_STATUS_QUERY_TIMEOUT), None
    except DispatchError as exc:
        return None, str(exc)


@bp.route('/api/admin/printers/status')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_printer_status():
    """订单台轮询拉的设备状态：启用中的打印机逐台一条。

    在线态带 per-printer 30 秒缓存；问不到的打印机状态给 null、原因原样带回 ——
    联动坏了不该把订单台一起弄坏。"""
    import time
    now = time.monotonic()
    with db_conn() as conn:
        printers = find_active_printers(conn)
    items = []
    for printer in printers:
        cached = _status_cache.get(printer['id'])
        if cached and now - cached['at'] < _STATUS_TTL_SECONDS:
            items.append(cached['payload'])
            continue
        state, error = _printer_online_state(printer)
        payload = {'id': printer['id'], 'name': printer['name'],
                   'online': state is not None, 'state': state, 'error': error}
        _status_cache[printer['id']] = {'at': now, 'payload': payload}
        items.append(payload)
    return jsonify({'code': 0, 'printers': items})
