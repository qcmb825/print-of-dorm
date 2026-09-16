"""routes/orders.py —— 订单接口：上传下单、订单列表、接单/释放/改状态、撤单、我的订单、取文件。"""

import os
import sqlite3
import uuid
from datetime import datetime, timedelta

from flask import Blueprint, g, jsonify, request, send_file
from pathlib import Path

from auth import login_required, roles_required
from config import (
    ALLOWED_EXTENSIONS,
    ORDER_STATUSES,
    ORDER_STATUSES_MANUAL,
    ROLE_ADMIN,
    ROLE_SUPER,
    ST_DONE,
    ST_PENDING,
    ST_READY,
    ST_UNPRICED,
    UPLOAD_FOLDER,
    logger,
)
from db import get_db
from security import audit_action, client_ip, hit_limit, security_event
from utils import allowed_file, display_name, generate_pickup_code, parse_price, positive_int

bp = Blueprint('orders', __name__)

# 上传频控：同一账号 UPLOAD_WINDOW_SECONDS 秒内最多提交 UPLOAD_MAX_IN_WINDOW 次。
# 登录态只能证明「是谁」，拦不住「登录之后用脚本疯狂下单」；而上传是这个系统里
# 唯一会往磁盘写文件的接口，被刷起来磁盘和打印队列都会被填满。
# 数字给得比较宽松，正常一口气传十几份材料也碰不到它。
UPLOAD_WINDOW_SECONDS = 60
UPLOAD_MAX_IN_WINDOW = 20


def create_order_from_saved_file(original_name, save_path, color, duplex, remark):
    """把一份已经完整落盘的文件登记成订单，返回 (order_id, pickup_code)。

    单片直传（/api/upload）和分片上传合并完成之后都走这里，
    取件码重摇、写库失败回滚的动作就只有一份。复制成两份的话，
    哪天改了其中一处，症状会是「直传的订单正常，分片传的订单缺字段」，
    而这种差异光看页面很难发现。

    调用方负责：扩展名已过白名单、文件已完整落盘、三个参数已清洗。
    写库失败时本函数会把 save_path 一起删掉再抛异常 —— 订单没建成，
    那份文件就是垃圾，留着只会占磁盘、让运维以为它属于某个订单。

    初始状态是「待计费」而不是「待打印」：新单要先等管理员看过文件、标好价格，
    才回到待打印池。直传和分片两条路都走这个函数，所以状态只在这里定一次，
    不会出现「分片传的单能直接接、直传的单卡住」这种一半对一半错的情形。
    """
    conn = None
    try:
        conn = get_db()
        # 取件码是 4 位随机数字，重码的概率很小但不是零。generate_pickup_code
        # 的做法是「先查有没有人用、没有就用」，两个人同时下单就可能都查到「没人用」。
        # 库里那个部分唯一索引会把后来者挡住，所以撞了就重摇一个。
        for attempt in range(5):
            pickup_code = generate_pickup_code(conn)
            try:
                cursor = conn.execute('''
                    INSERT INTO orders (user_id, filename, file_path, color_type, duplex, remark, status, pickup_code)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                ''', (g.user['id'], original_name, save_path, color, duplex, remark, ST_UNPRICED, pickup_code))
                break
            except sqlite3.IntegrityError:
                conn.rollback()
                logger.warning('取件码「%s」已被占用（第 %s 次），重摇一个',
                               pickup_code, attempt + 1)
        else:
            # 连摇 5 次都撞上已经不是概率问题了，宁可报错也不能写进一个重码的单
            raise RuntimeError('取件码连续 5 次都与其他订单重复')
        conn.commit()
        return cursor.lastrowid, pickup_code
    except Exception:
        if conn is not None:
            conn.rollback()
        if os.path.exists(save_path):
            try:
                os.remove(save_path)
            except OSError:
                logger.warning('清理孤儿文件失败: %s', save_path)
        raise
    finally:
        if conn is not None:
            conn.close()


@bp.route('/api/upload', methods=['POST'])
@login_required
def api_upload():
    # 频控放在最前面：还没碰磁盘就把它拦掉，被刷的时候连文件都不会落盘
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        security_event('upload_rate_limited',
                       '账号 %s 在 %s 秒内提交超过 %s 次上传'
                       % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW))
        return jsonify({'code': 429, 'msg': '上传太频繁了，稍等一会儿再试'}), 429

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

    try:
        file.save(save_path)
        file_size = os.path.getsize(save_path)
        if file_size == 0:
            # 0 字节的文件排出来就是一张白纸。上传成功、下单成功、到手却什么都没有——
            # 这种结果用户只会当成「这系统坏了」，不如在门口就告诉他选错文件了。
            os.remove(save_path)
            return jsonify({'code': 1, 'msg': '这个文件是空的（0 字节），换一个再试'}), 400
        order_id, pickup_code = create_order_from_saved_file(
            original_name, save_path, color, duplex, remark)
    except Exception:
        logger.exception('上传订单失败：下单人=%s 文件=%s 落盘路径=%s ip=%s',
                         g.user['nickname'], original_name, save_path, client_ip())
        return jsonify({'code': 1, 'msg': '上传失败，请稍后重试'}), 500

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


# 订单列表，管理端可看，支持分页、状态筛选、范围筛选
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
                   o.user_id, o.claimed_by, o.price,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.update_time, 'localtime') AS update_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   datetime(o.price_time, 'localtime') AS price_time,
                   owner.nickname AS owner_nickname, owner.dorm AS owner_dorm, owner.status AS owner_status,
                   claimer.nickname AS claimer_nickname, claimer.status AS claimer_status,
                   pricer.nickname AS pricer_nickname, pricer.status AS pricer_status
            FROM orders o
            LEFT JOIN users owner ON owner.id = o.user_id
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
            LEFT JOIN users pricer ON pricer.id = o.priced_by
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
        # 能不能改状态由服务端按角色判定，这里只负责把结果算成一个布尔值
        item['can_manage'] = is_super or item['is_mine']
        # 已注销的账号在名字后面标一下。订单是按 user_id 关联的，关联本身没变，
        # 但注销会把昵称释放出去、可能被新人顶用，不标就分不清这单是谁下的。
        # owner_status 是「算这个标记用的原料」，拼完就 pop 掉，不让它混进响应体 ——
        # 前端要的只是展示用的名字，多给一个字段就等于多一处要跟着改的地方。
        item['owner_nickname'] = display_name(item['owner_nickname'], item.pop('owner_status', None))
        item['claimer_nickname'] = display_name(item['claimer_nickname'], item.pop('claimer_status', None))
        item['pricer_nickname'] = display_name(item['pricer_nickname'], item.pop('pricer_status', None))
        orders.append(item)
    return jsonify({'code': 0, 'total': total, 'page': page, 'size': size, 'orders': orders})



# 计费：管理员**看过文件之后**填写金额。
#
# 为什么必须先接单：金额是按文件本身算出来的 —— 几页、黑白还是彩色、单面还是双面，
# 全在文件里。不接单就计费，等于对着一行文件名猜价钱。接单这个动作同时把
# 「谁看的这份文件」和「这单该收多少」两个人合成一个 —— 标错了找得到人问。
#
# 一个接口担两件事，靠订单当前状态分流：
#   还在「待计费」-> 这是第一次标价，标完推进到待打印，流程才开始走；
#   已经计过费   -> 是来改价的。
#
# 为什么要留改价这条路 —— 标错一位数是常事（30 打成 300），
# 没有它，唯一能修的办法就是直接改数据库。改库这件事只要开了头，
# 后面每一次出错都会走同一条路，而这单到底该收多少就再也没人说得清了。
# 改价同样进审计日志，所以「谁在什么时候把 300 改成了 30」是有据可查的。
@bp.route('/api/order/<int:order_id>/price', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_price_order(order_id):
    data = request.get_json(silent=True) or {}
    amount, error = parse_price(data.get('price'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    conn = get_db()
    try:
        row = conn.execute(
            'SELECT status, price, claimed_by FROM orders WHERE id = ?', (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404
        if row['status'] == ST_DONE:
            # 已取件的单再改价，等于事后改一笔已经结清的钱。
            # 真要退钱或者补收，那是收银那边的事，不该悄悄改这条记录。
            return jsonify({'code': 400, 'msg': '订单已取件，不能再改金额'}), 400
        if row['claimed_by'] is None:
            # 没人接 = 还没人打开过这个文件，价格只能靠猜。
            # 这里连超管一起挡：它是流程约束，不是权限问题。
            return jsonify({'code': 400, 'msg': '这单还没人接，请先接单、看过文件后再填金额'}), 400
        if g.user['role'] != ROLE_SUPER and row['claimed_by'] != g.user['id']:
            # 别人接了单，说明文件已经在他手上；两个人都往同一单上填价钱，
            # 后填的那个会把先填的盖掉，而先填的人还以为自己已经标好了。
            security_event('price_denied',
                           '订单 #%s 的接单人 uid=%s，操作人试图代为计费'
                           % (order_id, row['claimed_by']))
            return jsonify({'code': 403, 'msg': '这单是别人接的，只有接单人能给它计费'}), 403

        if row['status'] == ST_UNPRICED:
            # 两个管理员同时打开这单是正常的。条件写进 WHERE，让数据库来判谁先到，
            # 而不是「先 SELECT 判一下、再 UPDATE」—— 那中间有个空隙，
            # 两个人会双双通过检查，后写的把先写的金额直接盖掉。
            cursor = conn.execute('''
                UPDATE orders
                SET price = ?, priced_by = ?, price_time = CURRENT_TIMESTAMP,
                    status = ?, update_time = CURRENT_TIMESTAMP
                WHERE id = ? AND status = ?
            ''', (amount, g.user['id'], ST_PENDING, order_id, ST_UNPRICED))
            if cursor.rowcount == 0:
                conn.rollback()
                return jsonify({'code': 409, 'msg': '这单刚被别人计过费了，刷新看看'}), 409
            action, reply = 'price_order', f'已计费 {amount:.2f} 元，可以开始打印了'
        else:
            conn.execute('''
                UPDATE orders
                SET price = ?, priced_by = ?, price_time = CURRENT_TIMESTAMP,
                    update_time = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (amount, g.user['id'], order_id))
            action, reply = 'reprice_order', f'金额已改为 {amount:.2f} 元'
        conn.commit()
    finally:
        conn.close()

    audit_action(action,
                 '订单 #%s 金额 %s -> %.2f 元，状态=%s'
                 % (order_id, row['price'] if row['price'] is not None else '未计费',
                    amount, row['status']))
    logger.info('订单 #%s 计费 %.2f 元（原 %s）操作人=%s(%s) ip=%s',
                order_id, amount, row['price'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': reply, 'price': amount})



# 接单，用原子更新保证同一订单不会被两个人同时接走
#
# 接单和计费的先后顺序是**接单在前**：金额要看过文件才算得出来（页数、颜色、单双面），
# 所以「谁接的谁计费」—— 接单页上那份文件就是计费的依据。
#
# 只有「已取件」接不了：这单早就打完、也被取走了，再放回某个人手上，
# 他会对着一份已经不存在的活干半天。把条件写进 UPDATE 而不是先查后改，
# 是为了挡住「查的时候还没人接、改的时候刚好被接走」这种夹缝 ——
# 写进 WHERE 之后，这一句本身就是原子判断。
@bp.route('/api/order/<int:order_id>/claim', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_claim_order(order_id):
    conn = get_db()
    try:
        cursor = conn.execute('''
            UPDATE orders SET claimed_by = ?, claim_time = CURRENT_TIMESTAMP
            WHERE id = ? AND claimed_by IS NULL AND status <> ?
        ''', (g.user['id'], order_id, ST_DONE))
        if cursor.rowcount == 0:
            conn.rollback()
            row = conn.execute(
                'SELECT claimed_by, status FROM orders WHERE id = ?', (order_id,)).fetchone()
            if row is None:
                logger.info('接单失败：订单 #%s 不存在，操作人=%s', order_id, g.user['nickname'])
                return jsonify({'code': 404, 'msg': '订单不存在'}), 404
            if row['status'] == ST_DONE:
                # 不是权限问题，是这单已经完结了 —— 提示里说清为什么，
                # 只说「不能接」的话，打印员只会以为是系统抽风。
                return jsonify({'code': 400, 'msg': '这单已经被取走了，不用再接'}), 400
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



# 释放订单，接单人本人或管理端可用，方便误点后撤回
#
# 已取件不给释放。这单早就打完、也被取走了，再放回待接单池就成了
# 「已完成的单还等着别人来接」—— 池子里多一张永远不会有人处理的单，
# 谁看到都会以为系统出错。终态就该是终态，服务端和界面都按这个来。
@bp.route('/api/order/<int:order_id>/release', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_release_order(order_id):
    conn = get_db()
    try:
        row = conn.execute('SELECT claimed_by, status FROM orders WHERE id = ?', (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404
        if row['status'] == ST_DONE:
            return jsonify({'code': 400, 'msg': '订单已取件，不能释放'}), 400
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



# 撤回订单：下单人自己把还没人接的单收起。
#
# 为什么需要它：传错文件、参数选错，在「还没人接单」之前都是无害的。
# 让本人自己收起，比找管理员删更省事，待接单池里也不会堆着一堆废单。
#
# 为什么只允许「没被接单」的时候：一旦有人接了，这单就在别人的工作里了——
# 他可能已经下载、已经在打印，单子这时候凭空消失，最轻的结果也是白打一份纸。
# 那种情况该走「释放」，把单退回答待接单池，而不是让整条记录不存在。
@bp.route('/api/order/<int:order_id>/withdraw', methods=['POST'])
@login_required
def api_withdraw_order(order_id):
    conn = get_db()
    try:
        row = conn.execute(
            'SELECT user_id, claimed_by, status, filename, file_path FROM orders WHERE id = ?',
            (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404
        if row['user_id'] != g.user['id']:
            security_event('withdraw_denied',
                           '订单 #%s 的下单人 uid=%s，操作人试图撤回他人订单'
                           % (order_id, row['user_id']))
            return jsonify({'code': 403, 'msg': '只能撤回自己下的订单'}), 403
        if row['claimed_by'] is not None:
            return jsonify({'code': 400, 'msg': '订单已经被接取，无法撤回'}), 400
        if row['status'] == ST_DONE:
            return jsonify({'code': 400, 'msg': '订单已完成，不能撤回'}), 400
        # 删除语句把刚刚判过的条件又写了一遍，不是重复劳动：
        # 从 SELECT 到这里之间，完全可能有人正好把单接走，上面那句拦不住。
        # rowcount 为 0 就说明条件已经不成立了，那就别再删。
        cursor = conn.execute(
            'DELETE FROM orders WHERE id = ? AND user_id = ? AND claimed_by IS NULL AND status <> ?',
            (order_id, g.user['id'], ST_DONE))
        if cursor.rowcount == 0:
            conn.rollback()
            return jsonify({'code': 409, 'msg': '订单状态刚发生了变化，撤回失败，刷新看看'}), 409
        conn.commit()
    finally:
        conn.close()

    # 数据库那边确认删掉了才动文件。万一删文件失败，留下的只是一个没人引用的孤儿文件；
    # 反过来先删文件的话，就会出现「订单还在、文件没了」——接单人一点开就是 404。
    try:
        os.remove(row['file_path'])
    except OSError:
        logger.warning('撤回订单 #%s 时删除文件失败（可能早已被清理）：%s',
                       order_id, row['file_path'])
    logger.info('订单 #%s 被 %s 撤回，文件=%s ip=%s',
                order_id, g.user['nickname'], row['filename'], client_ip())
    return jsonify({'code': 0, 'msg': '订单已撤回'})



# 改订单状态，能改哪些单由服务端判定
@bp.route('/api/order/<int:order_id>/status', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_update_status(order_id):
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or request.form.get('status') or '').strip()
    if new_status == ST_UNPRICED:
        # 「待计费」只能由计费动作产生，不能手动切回去。
        # 单独给一句提示而不是并进下面那句「状态不合法」：它是个合法状态，
        # 只是不从这里进 —— 说成「不合法」，操作人只会去翻文档确认自己看错了。
        return jsonify({'code': 400, 'msg': '不能手动切回「待计费」，改金额请用计费'}), 400
    if new_status not in ORDER_STATUSES_MANUAL:
        return jsonify({
            'code': 400,
            'msg': '状态不合法，可选：' + '、'.join(ORDER_STATUSES_MANUAL)
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
        if row['status'] == ST_UNPRICED:
            # 待计费的单只能通过「计费」离开这个状态。跳过计费直接标成待打印，
            # 这张单的金额就永远是空的 —— 打完印找不到人收钱，
            # 和允许手动切回「待计费」是同一个破洞，只是从另一头进。
            # 老库遗留的单（金额为空但不是待计费）不受影响，状态照旧走。
            return jsonify({'code': 400, 'msg': '这单还没计费，请先填好金额'}), 400
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
                   o.claimed_by, o.price,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   datetime(o.price_time, 'localtime') AS price_time,
                   claimer.nickname AS claimer_nickname, claimer.status AS claimer_status
            FROM orders o
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
            WHERE o.user_id = ?
            ORDER BY o.id DESC
        ''', (g.user['id'],)).fetchall()
    finally:
        conn.close()
    orders = []
    for row in rows:
        item = dict(row)
        item['claimer_nickname'] = display_name(item['claimer_nickname'], item.pop('claimer_status', None))
        orders.append(item)
    return jsonify({'code': 0, 'orders': orders})



# 普通用户看自己的下单汇总，顺带一个全站累计数当趣味
@bp.route('/api/my-stats')
@login_required
def api_my_stats():
    """当前用户自己的下单统计。

    和管理端的 /api/admin/stats 刻意分成两条，不共用一个函数：
    管理端要的是「全站」，这里要的是「只有我」。共用的话就得靠一个变量
    决定要不要往 where 里加 user_id —— 那个变量一旦写反或者漏加，
    普通用户看到的就是别人的数据，而这种错上线之后几乎没人会发现。
    多写一份 SQL 让它一眼能看出在查谁，这个代价值得。

    查询也只有一条：把自己所有订单的几列拉回来，在 Python 里一趟算完。
    这里最多几百行，比发五六条 GROUP BY 更省事，也不会出现
    「几条 SQL 之间口径对不上」这种最难查的毛病。
    """
    uid = g.user['id']
    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT o.status, o.color_type, o.duplex, o.price,
                   date(o.create_time, 'localtime') AS d
            FROM orders o
            WHERE o.user_id = ?
        ''', (uid,)).fetchall()
        # 趣味数字：全站累计收到多少单。它回答的是「这个服务有多忙」，
        # 不涉及谁是谁、谁打了什么 —— 属于可以公开给所有登录用户的那一类数据。
        site_total = conn.execute('SELECT COUNT(*) AS c FROM orders').fetchone()['c']
    finally:
        conn.close()

    mine = {'total': len(rows), 'in_progress': 0, 'ready': 0, 'done': 0, 'unpriced': 0, 'spent': 0.0}
    by_color = {'black': 0, 'color': 0}
    by_duplex = {'single': 0, 'double': 0}
    counts = {}
    spent = 0.0
    for r in rows:
        if r['price'] is not None:
            # 「花掉多少」只算已经标过价的单。待计费的不算进去 ——
            # 它连多少钱都还不知道，占个 0 会让总额看起来比实际低；
            # 而归到另一档（待计费笔数）才是它真实的状态。
            spent += r['price']
        if r['status'] == ST_READY:
            mine['ready'] += 1
        elif r['status'] == ST_DONE:
            mine['done'] += 1
        elif r['status'] == ST_UNPRICED:
            # 待计费单独报一笔数，因为它卡在管理员那边、用户催不了，
            # 只能靠这个数字告诉用户「还没轮到你，不是系统没收到」。
            # 但它同样属于「还没到我手上」，所以下面也要计入 in_progress。
            mine['unpriced'] += 1
            mine['in_progress'] += 1
        else:
            # 待打印 / 打印中都算「进行中」。数据库里万一出现第三个值，
            # 也归到这一档 —— 对用户来说「还没到我手上」才是他关心的分类。
            mine['in_progress'] += 1
        # 老数据里 color_type / duplex 可能是 NULL，按默认值算，
        # 免得统计里冒出一个 "None" 分类
        by_color[r['color_type'] if r['color_type'] in ('black', 'color') else 'black'] += 1
        by_duplex[r['duplex'] if r['duplex'] in ('single', 'double') else 'single'] += 1
        if r['d']:
            counts[r['d']] = counts.get(r['d'], 0) + 1

    # 补齐日期序列：SQL 里没有单的日子根本不在结果里，直接画会把柱子挤在一起
    today = datetime.now().date()
    daily = [
        {'date': (today - timedelta(days=offset)).isoformat(),
         'count': counts.get((today - timedelta(days=offset)).isoformat(), 0)}
        for offset in range(13, -1, -1)
    ]

    # 金额求和后 round 一下：SQLite 里 price 是 REAL（二进制浮点），
    # 几十单加起来末尾会挂出 1e-13 那种尾巴，界面就显示成「35.70000000000001 元」。
    mine['spent'] = round(spent, 2)

    return jsonify({
        'code': 0,
        'mine': mine,
        'by_color': by_color,
        'by_duplex': by_duplex,
        'daily': daily,
        'site': {'orders_total': site_total},
    })



# 下载订单文件，只有接单人和管理端可以下
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
