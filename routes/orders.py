"""routes/orders.py —— 订单接口：上传下单、订单列表、接单/释放/改状态、我的订单、取文件。"""

import os
import uuid
from flask import Blueprint, g, jsonify, request, send_file
from pathlib import Path

from auth import login_required, roles_required
from config import (
    ALLOWED_EXTENSIONS,
    ORDER_STATUSES,
    ROLE_ADMIN,
    ROLE_SUPER,
    ST_PENDING,
    UPLOAD_FOLDER,
    logger,
)
from db import get_db
from security import client_ip, security_event
from utils import allowed_file, generate_pickup_code, positive_int

bp = Blueprint('orders', __name__)


@bp.route('/api/upload', methods=['POST'])
@login_required
def api_upload():
    # 先收文件和参数，缺参数返回 400 而不是 500
    file = request.files.get('file')
    if file is None or not file.filename:
        return jsonify({'code': 1, 'msg': '请选择要上传的文件'}), 400

    color = request.form.get('color', 'black')
    duplex = request.form.get('duplex', 'single')
    remark = (request.form.get('remark') or '').strip()[:200]  # 备注限长，防止有人塞超长文本
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'

    # 文件名安全处理 + 扩展名白名单校验
    original_name = os.path.basename(file.filename)
    if not allowed_file(original_name):
        # 上传可执行文件或脚本是典型的攻击试探，必须单独留痕
        security_event('upload_blocked_type', '文件「%s」不在白名单内' % original_name[:80])
        return jsonify({
            'code': 1,
            'msg': '不支持的文件类型，仅允许：' + '、'.join(sorted(ALLOWED_EXTENSIONS))
        }), 400
    
    # 先落盘再写库，哪一步失败都不留下孤儿文件
    ext = original_name.rsplit('.', 1)[1].lower()
    new_filename = f"{uuid.uuid4().hex}.{ext}"
    save_path = os.path.join(UPLOAD_FOLDER, new_filename)

    conn = None
    file_size = 0
    try:
        file.save(save_path)
        file_size = os.path.getsize(save_path)
        conn = get_db()
        pickup_code = generate_pickup_code(conn)  # 生成不重复的 4 位取件码
        cursor = conn.execute('''
            INSERT INTO orders (user_id, filename, file_path, color_type, duplex, remark, status, pickup_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (g.user['id'], original_name, save_path, color, duplex, remark, ST_PENDING, pickup_code))
        conn.commit()
        order_id = cursor.lastrowid
    except Exception:
        if conn is not None:
            conn.rollback()
        if os.path.exists(save_path):  # 写库失败就把已保存的文件删掉
            try:
                os.remove(save_path)
            except OSError:
                logger.warning('清理孤儿文件失败: %s', save_path)
        logger.exception('上传订单失败：下单人=%s 文件=%s 落盘路径=%s ip=%s',
                         g.user['nickname'], original_name, save_path, client_ip())
        return jsonify({'code': 1, 'msg': '上传失败，请稍后重试'}), 500
    finally:
        if conn is not None:
            conn.close()

    logger.info('新订单 #%s 下单人=%s 文件=%s 大小=%sKB 类别=%s 单双面=%s 取件码=%s ip=%s',
                order_id, g.user['nickname'], original_name, file_size // 1024,
                color, duplex, pickup_code, client_ip())
    # 只返回订单号和取件码，不暴露服务器绝对路径
    return jsonify({
        'code': 0,
        'msg': '上传成功！订单已记录',
        'order_id': order_id,
        'pickup_code': pickup_code
    })


# 订单列表，管理员和超管可看，支持分页、状态筛选、范围筛选
@bp.route('/api/orders')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_orders():
    page = positive_int(request.args.get('page'), 1)
    size = positive_int(request.args.get('size'), 20, maximum=100)
    status = (request.args.get('status') or '').strip()
    scope = (request.args.get('scope') or 'all').strip()

    where, params = [], []
    if status in ORDER_STATUSES:
        where.append('o.status = ?')
        params.append(status)
    if scope == 'pool':      # 待接单池，还没人接
        where.append('o.claimed_by IS NULL')
    elif scope == 'mine':    # 我接的单
        where.append('o.claimed_by = ?')
        params.append(g.user['id'])
    where_sql = ('WHERE ' + ' AND '.join(where)) if where else ''

    conn = get_db()
    try:
        total = conn.execute(f'SELECT COUNT(*) AS c FROM orders o {where_sql}', params).fetchone()['c']
        rows = conn.execute(f'''
            SELECT o.id, o.filename, o.color_type, o.duplex, o.remark, o.status, o.pickup_code,
                   o.user_id, o.claimed_by,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.update_time, 'localtime') AS update_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   owner.nickname AS owner_nickname, owner.dorm AS owner_dorm,
                   claimer.nickname AS claimer_nickname
            FROM orders o
            LEFT JOIN users owner ON owner.id = o.user_id
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
            {where_sql}
            ORDER BY o.id DESC
            LIMIT ? OFFSET ?
        ''', (*params, size, (page - 1) * size)).fetchall()
    finally:
        conn.close()

    my_id = g.user['id']
    is_super = g.user['role'] == ROLE_SUPER
    orders = []
    for row in rows:
        item = dict(row)
        item['is_mine'] = item['claimed_by'] == my_id
        # 能不能改状态：超管随便，管理员只限自己接的单
        item['can_manage'] = is_super or item['is_mine']
        orders.append(item)
    return jsonify({'code': 0, 'total': total, 'page': page, 'size': size, 'orders': orders})



# 接单，用原子更新保证同一订单不会被两个人同时接走
@bp.route('/api/order/<int:order_id>/claim', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_claim_order(order_id):
    conn = get_db()
    try:
        cursor = conn.execute('''
            UPDATE orders SET claimed_by = ?, claim_time = CURRENT_TIMESTAMP
            WHERE id = ? AND claimed_by IS NULL
        ''', (g.user['id'], order_id))
        if cursor.rowcount == 0:
            conn.rollback()
            row = conn.execute('SELECT claimed_by FROM orders WHERE id = ?', (order_id,)).fetchone()
            if row is None:
                logger.info('接单失败：订单 #%s 不存在，操作人=%s', order_id, g.user['nickname'])
                return jsonify({'code': 404, 'msg': '订单不存在'}), 404
            claimer = conn.execute('SELECT nickname FROM users WHERE id = ?', (row['claimed_by'],)).fetchone()
            name = claimer['nickname'] if claimer else '其他账户'
            # 抢单失败是正常的并发竞争，不算攻击，记 INFO 就行，别滥用安全告警
            logger.info('接单竞争失败：订单 #%s 已被「%s」接取，操作人=%s',
                        order_id, name, g.user['nickname'])
            return jsonify({'code': 409, 'msg': f'手慢了，该订单已被「{name}」接取'}), 409
        conn.commit()
    finally:
        conn.close()
    logger.info('订单 #%s 被 %s(%s) 接取 ip=%s',
                order_id, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '接单成功'})



# 释放订单，接单人本人或超管可用，方便误点后撤回
@bp.route('/api/order/<int:order_id>/release', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_release_order(order_id):
    conn = get_db()
    try:
        row = conn.execute('SELECT claimed_by FROM orders WHERE id = ?', (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404
        if row['claimed_by'] is None:
            return jsonify({'code': 400, 'msg': '该订单尚未被接取'}), 400
        if g.user['role'] != ROLE_SUPER and row['claimed_by'] != g.user['id']:
            security_event('release_denied',
                           '订单 #%s 的接单人 uid=%s，操作人试图释放他人订单'
                           % (order_id, row['claimed_by']))
            return jsonify({'code': 403, 'msg': '只能释放自己接取的订单'}), 403
        conn.execute('''
            UPDATE orders SET claimed_by = NULL, claim_time = NULL, update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (order_id,))
        conn.commit()
    finally:
        conn.close()
    logger.info('订单 #%s 被 %s(%s) 释放，原接单人 uid=%s ip=%s',
                order_id, g.user['nickname'], g.user['role'], row['claimed_by'], client_ip())
    return jsonify({'code': 0, 'msg': '已释放订单'})



# 改订单状态，超管可以改任意单，普通管理员只能改自己接的
@bp.route('/api/order/<int:order_id>/status', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_update_status(order_id):
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or request.form.get('status') or '').strip()
    if new_status not in ORDER_STATUSES:
        return jsonify({
            'code': 400,
            'msg': '状态不合法，可选：' + '、'.join(ORDER_STATUSES)
        }), 400

    conn = get_db()
    try:
        row = conn.execute('SELECT claimed_by, status FROM orders WHERE id = ?', (order_id,)).fetchone()
        if row is None:
            logger.info('改状态失败：订单 #%s 不存在，操作人=%s', order_id, g.user['nickname'])
            return jsonify({'code': 404, 'msg': '没找到这个订单'}), 404
        if g.user['role'] != ROLE_SUPER:
            if row['claimed_by'] is None:
                security_event('status_denied',
                               '订单 #%s 尚未被接取，操作人试图直接改状态为「%s」' % (order_id, new_status))
                return jsonify({'code': 403, 'msg': '请先接单，再接单后才能修改状态'}), 403
            if row['claimed_by'] != g.user['id']:
                security_event('status_denied',
                               '订单 #%s 接单人 uid=%s，操作人越权改为「%s」'
                               % (order_id, row['claimed_by'], new_status))
                return jsonify({'code': 403, 'msg': '该订单已被他人接取，你无权修改其状态'}), 403
        conn.execute('''
            UPDATE orders SET status = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?
        ''', (new_status, order_id))
        conn.commit()
    finally:
        conn.close()

    logger.info('订单 #%s 状态「%s」->「%s」 操作人=%s(%s) ip=%s',
                order_id, row['status'], new_status, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': f'订单 {order_id} 已更新为「{new_status}」'})



# 普通用户查自己的订单，只能看到自己的
@bp.route('/api/my-orders')
@login_required
def api_my_orders():
    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT o.id, o.filename, o.color_type, o.duplex, o.remark, o.status, o.pickup_code,
                   o.claimed_by,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   claimer.nickname AS claimer_nickname
            FROM orders o
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
            WHERE o.user_id = ?
            ORDER BY o.id DESC
        ''', (g.user['id'],)).fetchall()
    finally:
        conn.close()
    return jsonify({'code': 0, 'orders': [dict(row) for row in rows]})



# 下载订单文件，只有接单人和超管可以下
@bp.route('/api/order/<int:order_id>/download')
@login_required
def api_download(order_id):
    conn = get_db()
    try:
        row = conn.execute(
            'SELECT filename, file_path, claimed_by FROM orders WHERE id = ?', (order_id,)
        ).fetchone()
    finally:
        conn.close()
    if row is None:
        return jsonify({'code': 404, 'msg': '订单不存在'}), 404

    if g.user['role'] != ROLE_SUPER and row['claimed_by'] != g.user['id']:
        security_event('download_denied',
                       '订单 #%s 接单人 uid=%s，操作人试图下载他人订单文件'
                       % (order_id, row['claimed_by']))
        return jsonify({'code': 403, 'msg': '只有接单人可以下载该订单的文件'}), 403

    # 双重校验：解析后的真实路径必须在上传目录内，防止路径穿越
    upload_root = Path(UPLOAD_FOLDER).resolve()
    file_path = Path(row['file_path']).resolve()
    if upload_root != file_path.parent and upload_root not in file_path.parents:
        # 库里的路径跑到上传目录外面，只有被篡改才可能发生，按安全事件记
        security_event('path_traversal_blocked',
                       '订单 #%s 的 file_path=%s 不在上传目录内' % (order_id, row['file_path']))
        return jsonify({'code': 400, 'msg': '文件路径不合法'}), 400
    if not file_path.is_file():
        logger.warning('订单 #%s 的文件已丢失：%s', order_id, row['file_path'])
        return jsonify({'code': 404, 'msg': '文件不存在或已被清理'}), 404

    logger.info('订单 #%s 的文件「%s」被 %s(%s) 下载 ip=%s',
                order_id, row['filename'], g.user['nickname'], g.user['role'], client_ip())
    return send_file(file_path, as_attachment=True, download_name=row['filename'])
