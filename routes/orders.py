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
    ORDER_LOG_CLAIM,
    ORDER_LOG_CREATE,
    ORDER_LOG_DOWNLOAD,
    ORDER_LOG_LABELS,
    ORDER_LOG_PRICE,
    ORDER_LOG_RELEASE,
    ORDER_LOG_REPRICE,
    ORDER_LOG_STATUS,
    ORDER_LOG_WITHDRAW,
    ORDER_STATUSES,
    ORDER_STATUSES_MANUAL,
    ORDER_STATUSES_QUEUE,
    ROLE_ADMIN,
    ROLE_SUPER,
    ST_DONE,
    ST_PENDING,
    ST_PRINTING,
    ST_READY,
    ST_UNPRICED,
    UPLOAD_FOLDER,
    logger,
    public_role,
    public_role_label,
)
from db import find_paper_type, find_preset, get_db, insert_order_row, log_order_event
from mail import contact_mailbox
from security import audit_action, client_ip, hit_limit, security_event
from utils import (allowed_file, display_name, mask_nickname,
                   parse_copies, parse_price, positive_int)

bp = Blueprint('orders', __name__)

# 上传频控：同一账号 UPLOAD_WINDOW_SECONDS 秒内最多提交 UPLOAD_MAX_IN_WINDOW 次。
# 登录态只能证明「是谁」，拦不住「登录之后用脚本疯狂下单」；而上传是这个系统里
# 唯一会往磁盘写文件的接口，被刷起来磁盘和打印队列都会被填满。
# 数字给得比较宽松，正常一口气传十几份材料也碰不到它。
UPLOAD_WINDOW_SECONDS = 60
UPLOAD_MAX_IN_WINDOW = 20


def log_event(order_id, action, detail='', conn=None):
    """给订单写一条操作留痕。

    传了 conn 就并入调用方的事务 —— 改状态和写留痕必须一起成功或一起失败，
    否则会留下「状态变了、却查不到是谁改的」，而详情页的操作记录正是
    拿来回答这个问题的（见 db.log_order_event 里的说明）。

    不传 conn 时自己开一个短连接，给下载这类**只读**操作留痕用：它没有事务可搭，
    而且留痕失败也不该把用户的下载搞失败 —— 所以这里只记一条 warning。
    """
    if conn is not None:
        log_order_event(conn, order_id, g.user['id'], g.user['role'], action, detail)
        return
    short = None
    try:
        short = get_db()
        log_order_event(short, order_id, g.user['id'], g.user['role'], action, detail)
        short.commit()
    except sqlite3.Error:
        logger.warning('订单 #%s 的操作留痕写入失败（动作=%s）', order_id, action)
    finally:
        if short is not None:
            short.close()


def create_order_from_saved_file(original_name, save_path, color, duplex, remark, copies, paper=None):
    """把一份已经完整落盘的文件登记成订单，返回 (order_id, pickup_code)。

    单片直传（/api/upload）和分片上传合并完成之后都走这里，
    写库失败回滚、删孤儿文件的动作就只有一份。复制成两份的话，
    哪天改了其中一处，症状会是「直传的订单正常，分片传的订单缺字段」，
    而这种差异光看页面很难发现。

    调用方负责：扩展名已过白名单、文件已完整落盘、参数已清洗。
    写库失败时本函数会把 save_path 一起删掉再抛异常 —— 订单没建成，
    那份文件就是垃圾，留着只会占磁盘、让运维以为它属于某个订单。

    初始状态是「待计费」而不是「待打印」：新单要先等管理员看过文件、标好价格，
    才回到待打印池。直传和分片两条路都走这个函数，所以状态只在这里定一次，
    不会出现「分片传的单能直接接、直传的单卡住」这种一半对一半错的情形。

    paper 是已校验过的纸张类型字典（含 id / name / remark），学生没选就是 None。
    纸张的名字和备注**抄进订单**而不是只存 id：管理员随时能改名，
    只存 id 的话，三个月前那一单的「用什么纸」会跟着今天的改名一起变。
    """
    conn = None
    try:
        conn = get_db()
        order_id, pickup_code = insert_order_row(conn, {
            'user_id': g.user['id'],
            'filename': original_name,
            'file_path': save_path,
            'color_type': color,
            'duplex': duplex,
            'remark': remark,
            'status': ST_UNPRICED,
            'copies': copies,
            'paper_type_id': paper['id'] if paper else None,
            'paper_name': paper['name'] if paper else None,
            'paper_remark': paper['remark'] if paper else None,
        })
        # 留痕和订单在同一个事务里。订单落了库却没有「谁什么时候传的」这一条，
        # 详情页的操作记录就得从半路开始讲 —— 而第一条恰恰是最该有的那条。
        log_event(order_id, ORDER_LOG_CREATE,
                  '上传文件「%s」并提交打印%s' % (original_name, describe_print_options(copies, paper)),
                  conn=conn)
        conn.commit()
        return order_id, pickup_code
    except Exception:
        if conn is not None:
            conn.rollback()
        if save_path and os.path.exists(save_path):
            try:
                os.remove(save_path)
            except OSError:
                logger.warning('清理孤儿文件失败: %s', save_path)
        raise
    finally:
        if conn is not None:
            conn.close()



def describe_print_options(copies, paper):
    """把打印选项拼成一句给人看的补充说明，给操作留痕用。

    留痕是**事后复查的凭证**，所以它必须自洽：当时是几份、用什么纸，
    读这句话就能知道，不需要再去 JOIN 已经可能被改过的纸张表。
    """
    parts = []
    if copies is not None:
        parts.append('%s 份' % copies)
    if paper:
        parts.append('纸张 %s' % paper['name'])
    return ('，' + '，'.join(parts)) if parts else ''



def create_preset_order(preset, copies, paper, color, duplex, remark):
    """用预设打印服务下单 —— 这一单**没有文件**，返回 (order_id, pickup_code)。

    filename / file_path 存空字符串，不是编一个假路径：
    这两列是 NOT NULL，而 SQLite 要改掉 NOT NULL 只能把整张表重建一遍，
    为了一个空值去动 orders 这种核心表不划算。空串在这里是个明确的
    「没有文件」标记 —— 代价是**所有读 file_path 的地方都必须先判有没有文件**，
    这一点在下载、撤回、详情页三处都各自写了注释，改动时一处都别漏。

    preset 是已经校验过、且启用的预设记录；preset_content 抄的是**此刻的原文**。
    为什么订单不干脆只存 preset_id：预设随时能被编辑、停用、删除，
    只存 id 的话，三个月前那一单的打印要求会跟着今天的管理操作一起变。
    打印员拿着被改过的要求去核对一份早就打完的活，谁也说不清当时要的是什么。
    preset_id 一并留着，是为了能回答「这一单当初用的是哪条预设」。
    """
    conn = None
    try:
        conn = get_db()
        order_id, pickup_code = insert_order_row(conn, {
            'user_id': g.user['id'],
            'filename': '',
            'file_path': '',
            'color_type': color,
            'duplex': duplex,
            'remark': remark,
            'status': ST_UNPRICED,
            'preset_id': preset['id'],
            'preset_content': preset['content'],
            'copies': copies,
            'paper_type_id': paper['id'] if paper else None,
            'paper_name': paper['name'] if paper else None,
            'paper_remark': paper['remark'] if paper else None,
        })
        log_event(order_id, ORDER_LOG_CREATE,
                  '使用预设打印服务下单：%s%s'
                  % (preset['content'], describe_print_options(copies, paper)),
                  conn=conn)
        conn.commit()
        return order_id, pickup_code
    except Exception:
        if conn is not None:
            conn.rollback()
        raise
    finally:
        if conn is not None:
            conn.close()



def resolve_print_options(conn, data):
    """校验下单时选的纸张类型，返回 (纸张字典, 错误信息)。

    只有一处判定 —— 直传下单和预设下单都走它。分开写的话，
    很快就会出现「传文件下的单能选 A3、用预设下的单选不了」这种没人能解释的差异。

    纸张可以为空（学生没选）。空的时候落库是 NULL，
    不去猜一个「默认 A4」：我们并不知道楼里默认是哪种纸，
    替学生选一个，出了问题还查不出是谁选的。
    """
    raw_id = data.get('paper_type_id')
    if raw_id in (None, '', 0, '0'):
        return None, None
    if isinstance(raw_id, bool):
        return None, '纸张类型不合法，刷新页面重新选择'
    try:
        paper_type_id = int(raw_id)
    except (TypeError, ValueError):
        return None, '纸张类型不合法，刷新页面重新选择'
    row = find_paper_type(conn, paper_type_id)
    if row is None:
        return None, '这个纸张类型不存在了，刷新页面重新选择'
    if row['is_active'] != 1:
        # 学生打开页面之后管理员刚好把它停用了。这里只提醒刷新，
        # 不悄悄替他换一个 —— 换掉的那张纸可能正好是打不了的。
        return None, '这个纸张类型已经停用了，刷新页面重新选择'
    return {'id': row['id'], 'name': row['name'], 'remark': row['remark']}, None


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

    # 份数与纸张。份数在磁盘操作之前校验：填错一个数就不该先落一份文件再看结果。
    copies, error = parse_copies(request.form.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    # 纸张要查库，所以放后面一起做，别为了早而早把校验顺序搞得七零八落
    conn = get_db()
    try:
        paper, error = resolve_print_options(conn, request.form)
    finally:
        conn.close()
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

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
            original_name, save_path, color, duplex, remark, copies, paper)
    except Exception:
        logger.exception('上传订单失败：下单人=%s 文件=%s 落盘路径=%s ip=%s',
                         g.user['nickname'], original_name, save_path, client_ip())
        return jsonify({'code': 1, 'msg': '上传失败，请稍后重试'}), 500

    logger.info('新订单 #%s 下单人=%s 文件=%s 大小=%sKB 类别=%s 单双面=%s 份数=%s 纸张=%s 取件码=%s ip=%s',
                order_id, g.user['nickname'], original_name, file_size // 1024,
                color, duplex, copies, paper['name'] if paper else '未指定',
                pickup_code, client_ip())
    # 只返回订单号和取件码，不暴露服务器绝对路径
    return jsonify({
        'code': 0,
        'msg': '上传成功！订单已记录',
        'order_id': order_id,
        'pickup_code': pickup_code
    })



# 用预设打印服务下单：只有参数，**没有文件**。
#
# 为什么单独一个接口，而不是让 /api/upload 在「没传文件」时改走别的分支 ——
# 那样这个接口就有两种完全不同的输入形状（有文件 / 无文件），
# 校验、频控、错误文案全都要写两遍分支。分开之后各自的正常路径都很短，
# 而「用了预设就不许传文件」这条规矩在这里是一条明确的 400：
#     if request.files: 拒绝
# 这条规矩**必须在服务端成立**。前端把上传框藏起来只是让人看不见，
# 谁都能直接构造一个带文件的请求打过来，而学生看到的就是「能传」。
@bp.route('/api/order/preset', methods=['POST'])
@login_required
def api_create_preset_order():
    # 频控和上传共用一个计数器：不管走哪条路，一分钟能下多少单是同一个额度。
    # 分成两个计数器的话，两边各刷一半就等于额度翻倍。
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        security_event('preset_order_rate_limited',
                       '账号 %s 在 %s 秒内提交超过 %s 次下单'
                       % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW))
        return jsonify({'code': 429, 'msg': '提交太频繁了，稍等一会儿再试'}), 429

    if request.files:
        # 用了预设服务就不能再传文件。带文件来的一律拒掉，
        # 而不是「默默忽略那个文件」—— 忽略了就等于收下一单却把学生传的东西丢了。
        return jsonify({'code': 400, 'msg': '用了预设服务就不用再传文件了，请重新选择'}), 400

    data = request.get_json(silent=True) or {}
    preset_id = data.get('preset_id')
    if isinstance(preset_id, bool) or not isinstance(preset_id, int) or preset_id < 1:
        return jsonify({'code': 400, 'msg': '请选择一个预设服务'}), 400

    color = (data.get('color') or 'black').strip()
    duplex = (data.get('duplex') or 'single').strip()
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'
    remark = (data.get('remark') or '').strip()[:200]

    copies, error = parse_copies(data.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    conn = get_db()
    try:
        preset = find_preset(conn, preset_id)
        if preset is None:
            return jsonify({'code': 400, 'msg': '这个预设服务不存在了，刷新页面重新选择'}), 400
        if preset['is_active'] != 1:
            # 页面打开着、管理员刚好把它停用了。明确说清楚，别让学生以为是系统坏了。
            return jsonify({'code': 400, 'msg': '这个预设服务已经停用了，刷新页面重新选择'}), 400
        paper, error = resolve_print_options(conn, data)
        if error:
            return jsonify({'code': 400, 'msg': error}), 400
        order_id, pickup_code = create_preset_order(preset, copies, paper, color, duplex, remark)
    except Exception:
        logger.exception('预设下单失败：下单人=%s 预设#%s ip=%s',
                         g.user['nickname'], preset_id, client_ip())
        return jsonify({'code': 1, 'msg': '下单失败，请稍后重试'}), 500
    finally:
        conn.close()

    logger.info('新订单 #%s 下单人=%s 预设#%s 份数=%s 纸张=%s 取件码=%s ip=%s',
                order_id, g.user['nickname'], preset_id, copies,
                paper['name'] if paper else '未指定', pickup_code, client_ip())
    return jsonify({
        'code': 0,
        'msg': '下单成功！用的是预设服务，不需要上传文件',
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
                   o.preset_id, o.preset_content, o.copies,
                   o.paper_type_id, o.paper_name, o.paper_remark,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.update_time, 'localtime') AS update_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   datetime(o.price_time, 'localtime') AS price_time,
                   owner.nickname AS owner_nickname, owner.dorm AS owner_dorm, owner.status AS owner_status,
                   owner.contact_type AS owner_contact_type, owner.contact AS owner_contact,
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
        # owner_contact_type / owner_contact 是给「联系不上就手动喊人」用的：
        # 取件提醒发不出去的那一档（学生填的是微信号，没有邮箱可发），
        # 订单台会把这个单标出来，而管理员光看昵称和宿舍是找不到人的。
        # 这两个字段只在这一条管理端接口上给，学生自己的 /api/my-orders 不给 ——
        # 那边他自己知道自己的联系方式，多回一份没有用处、只是多一个外泄面。
        #
        # 「推不推得出邮箱」由服务端算，前端不镜像这套规则：镜像的代价是必然漂移 ——
        # QQ_RE / EMAIL_RE 哪天改一个字，前端那份不会跟着改，
        # 界面就会标出「需人工通知」而邮件其实发得出去（或者反过来），
        # 而且两边都不报错。判定直接用发信那一路的同一函数，只有一份规则。
        item['owner_mailbox_missing'] = contact_mailbox(
            item['owner_contact_type'], item['owner_contact'])[0] is None
        orders.append(item)
    return jsonify({'code': 0, 'total': total, 'page': page, 'size': size, 'orders': orders})



# 订单详情：比列表多给一层「这一单经历了什么」。
#
# 为什么不趁列表一次给全 —— 详情的开销在两件事上：一是每条订单都要去文件系统
# stat 一次（列表一页 20 条就是 20 次磁盘调用，纯浪费），二是操作留痕是
# 「按订单取一串行」，塞进列表就变成 N+1 查询。分成两条接口之后，
# 列表照旧只查一次库，这份代价只在真的点进去时才付。
#
# 只给管理员，不给学生端：这里连下单人的学号、姓名都列了出来，那是后台口径。
# 学生看自己的单用不上这些（/api/my-orders 已经给了全部展示字段），
# 顺手把它开给所有人，等于把一份「谁给谁打了什么」的花名册铺开。
@bp.route('/api/order/<int:order_id>/detail')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_order_detail(order_id):
    conn = get_db()
    try:
        row = conn.execute('''
            SELECT o.id, o.filename, o.file_path, o.color_type, o.duplex, o.remark,
                   o.status, o.pickup_code, o.user_id, o.claimed_by, o.price, o.priced_by,
                   o.preset_id, o.preset_content, o.copies,
                   o.paper_type_id, o.paper_name, o.paper_remark,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.update_time, 'localtime') AS update_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   datetime(o.price_time, 'localtime') AS price_time,
                   owner.nickname AS owner_nickname, owner.real_name AS owner_real_name,
                   owner.student_id AS owner_student_id, owner.dorm AS owner_dorm,
                   owner.status AS owner_status,
                   owner.contact_type AS owner_contact_type, owner.contact AS owner_contact,
                   claimer.nickname AS claimer_nickname, claimer.status AS claimer_status,
                   pricer.nickname AS pricer_nickname, pricer.status AS pricer_status
            FROM orders o
            LEFT JOIN users owner ON owner.id = o.user_id
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
            LEFT JOIN users pricer ON pricer.id = o.priced_by
            WHERE o.id = ?
        ''', (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404

        detail = dict(row)
        # file_path 只用来回一个「文件还在不在、多大」，拿到结果就地丢掉 ——
        # 服务器绝对路径没有任何理由进响应体（下载接口那边是同一口径）。
        #
        # 预设服务下的单没有文件（filename / file_path 都是空串，见 create_preset_order），
        # 所以这里必须先判空。别指望 Path('') 自己会失败：它等于当前目录，
        # stat() 是成功的，于是详情页会给一个没有文件的单显示「文件大小 = 4096 字节」，
        # 既离谱又不像出错，查起来得从渲染追到磁盘。
        path = Path(detail.pop('file_path'))
        if detail['filename']:
            try:
                detail['file_size'] = path.stat().st_size
                detail['file_exists'] = True
            except OSError:
                # 文件被外部清理过是可能的（运维手动清理、误删）。这里不报错：
                # 「订单还在、文件没了」本身就是要让人看见的一条信息 ——
                # 详情页会明确标出来，比对着一个下载按钮点半天强。
                detail['file_size'] = None
                detail['file_exists'] = False
        else:
            detail['file_size'] = None
            detail['file_exists'] = False

        # owner_status / claimer_status / pricer_status 是「拼标记用的原料」，
        # 拼完就 pop 掉，不让它们混进响应体 —— 前端要的只是展示用的名字。
        detail['owner_nickname'] = display_name(detail['owner_nickname'], detail.pop('owner_status', None))
        detail['claimer_nickname'] = display_name(detail['claimer_nickname'], detail.pop('claimer_status', None))
        detail['pricer_nickname'] = display_name(detail['pricer_nickname'], detail.pop('pricer_status', None))

        log_rows = conn.execute('''
            SELECT l.id, l.action, l.detail, l.actor_id, l.actor_role,
                   datetime(l.create_time, 'localtime') AS create_time,
                   u.nickname AS actor_nickname, u.status AS actor_status
            FROM order_logs l
            LEFT JOIN users u ON u.id = l.actor_id
            WHERE l.order_id = ?
            ORDER BY l.id DESC
        ''', (order_id,)).fetchall()
    finally:
        conn.close()

    logs = []
    for item in log_rows:
        entry = dict(item)
        # 倒序：翻详情的人第一个想知道的是「这单现在到哪一步了、上一步是谁做的」，
        # 而不是「三天前是谁传的」。时间线顺着往下读也不难，往上翻旧账才难。
        entry['action_label'] = ORDER_LOG_LABELS.get(entry['action'], entry['action'])
        # 角色也一律走对外口径（super 对外就叫管理员），
        # 不然这个接口会变成前端唯一能拿到 'super' 这个字符串的地方 ——
        # 那就是「藏了半天的东西从另一个门漏出去」。
        role = entry['actor_role']
        entry['actor_role'] = public_role(role) if role else None
        entry['actor_role_label'] = public_role_label(role) if role else ''
        entry['actor_nickname'] = display_name(
            entry.pop('actor_nickname'), entry.pop('actor_status', None))
        logs.append(entry)

    return jsonify({'code': 0, 'order': detail, 'logs': logs})



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
            log_action = ORDER_LOG_PRICE
            log_detail = f'核定金额 {amount:.2f} 元，订单进入「{ST_PENDING}」'
        else:
            conn.execute('''
                UPDATE orders
                SET price = ?, priced_by = ?, price_time = CURRENT_TIMESTAMP,
                    update_time = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (amount, g.user['id'], order_id))
            action, reply = 'reprice_order', f'金额已改为 {amount:.2f} 元'
            log_action = ORDER_LOG_REPRICE
            # 把「从多少改成多少」写进留痕：改价次数多了以后，只有最终金额
            # 根本看不出中间被改过几回，而标错一位数是常事（30 打成 300）。
            log_detail = ('金额 %.2f 元 → %.2f 元' % (row['price'], amount)
                          if row['price'] is not None else f'核定金额 {amount:.2f} 元')
        log_event(order_id, log_action, log_detail, conn=conn)
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
        log_event(order_id, ORDER_LOG_CLAIM, '从待接单池接取', conn=conn)
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
        # 默认管理员可以释放别人接的单，这件事必须留痕 ——
        # 「我接的单怎么又回到池子里了」只有这条记录答得上来。
        if row['claimed_by'] == g.user['id']:
            detail = '释放自己接的单，退回待接单池'
        else:
            other = conn.execute('SELECT nickname, status FROM users WHERE id = ?',
                                 (row['claimed_by'],)).fetchone()
            name = display_name(other['nickname'], other['status']) if other else '（账号已注销）'
            detail = '释放了「%s」接的单，退回待接单池' % name
        log_event(order_id, ORDER_LOG_RELEASE, detail, conn=conn)
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
        # 订单行随即被删掉，这条留痕就成了一份「悬空记录」（order_id 已经指不到订单了）。
        # 故意留着：它不参与任何查询（详情页是按订单号查的），
        # 但事后要知道「那天那份文件是被本人自己撤掉的，不是丢了」时，只有它答得上来。
        #
        # 预设下单没有文件（file_path 是空串），文案跟着分开 ——
        # 统一写成「文件已一并删除」的话，这条留痕会让人以为文件被删了，
        # 实际上从来就没有过，事后查「那份文件哪去了」会白查一场。
        log_event(order_id, ORDER_LOG_WITHDRAW,
                  '本人撤回订单%s' % ('，文件「%s」已一并删除' % row['filename']
                                      if row['filename'] else '（预设服务，无文件）'),
                  conn=conn)
        conn.commit()
    finally:
        conn.close()

    # 数据库那边确认删掉了才动文件。万一删文件失败，留下的只是一个没人引用的孤儿文件；
    # 反过来先删文件的话，就会出现「订单还在、文件没了」——接单人一点开就是 404。
    # 没文件的单直接跳过这一段：os.remove('') 一定抛 OSError，
    # 白白写一条「删除文件失败」的 warning，把日志留给别的问题。
    if row['file_path']:
        try:
            os.remove(row['file_path'])
        except OSError:
            logger.warning('撤回订单 #%s 时删除文件失败（可能早已被清理）：%s',
                           order_id, row['file_path'])
    logger.info('订单 #%s 被 %s 撤回，文件=%s ip=%s',
                order_id, g.user['nickname'], row['filename'] or '（无文件）', client_ip())
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
        # 「从什么改成什么」必须记下来：状态被连着改两次（可取了 → 打印中 → 可取了）之后，
        # 光看最终状态和一个 update_time，谁也说不清中间那一步是谁做的。
        log_event(order_id, ORDER_LOG_STATUS,
                  '「%s」→「%s」' % (row['status'], new_status), conn=conn)
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
                   o.preset_id, o.preset_content, o.copies,
                   o.paper_type_id, o.paper_name, o.paper_remark,
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



# 服务数据：给所有登录用户看的公开汇总 + 下单榜
@bp.route('/api/board')
@login_required
def api_board():
    """学生端「服务数据」页的数据源。

    和上面的 /api/my-stats（只查我自己）刻意分成两条，理由跟管理端那两条一样：
    一个函数里靠变量决定要不要加 user_id 过滤，那个变量写反就是「把别人的数据发给你」，
    而这种错上线之后几乎没人看得出来。两条 SQL 各自一眼看得出在查谁，多写一份值。

    放行的界线是「不含别人的经营数据」：
      · 排队情况 —— 不涉及具体是谁，学生真正想知道的是「我前面还堆着多少单」。
        只数还在流程里的四档（config.ORDER_STATUSES_QUEUE），已取件的单不算：
        它是终态、纸也已经被取走了，摆在「排队」里没有意义；
      · 下单榜 —— 榜上每个人都可能上去，是平等的公开信息，不是把某个人单拎出来看；
      · 我的概览（mine）—— 只数我自己的单，看得见也用得上。
    不放行的是两类，而它们连 SELECT 都不出现 —— 不是前端不显示，是根本没查。
    数据不出库，比指望界面上不画它可靠得多：
      · **金额**：它是经营数据，学生看了没用，还等于把营业额摊开；
      · **站点规模**（总单数 / 近 7 天 / 账号数 / 已取件数）：同样是经营数据。
        早先它是以「服务规模」的名义放在页面上的，现在收回来了 ——
        「多少人在用、一天出多少单、累计做完多少」该由业主对外说，不该由页面替他说。

    榜上别人的昵称一律打码（utils.mask_nickname），自己那一行原样显示：
    要挡的是「同学之间对号入座」，不是挡本人看自己。
    """
    uid = g.user['id']

    # 两个榜的口径只差一个时间条件，所以把差异当片段传进来，而不是把整条 SQL 抄两遍：
    # 抄两遍的话，哪天改排序规则漏掉一处，就变成「近 30 天榜和累计榜的并列顺序不一样」，
    # 而这种不一致不会有人去核对。
    #
    # 时间一律用 SQLite 的 localtime，和 /api/my-stats、管理端看板同一套口径。
    # create_time 存的是 UTC，拿 UTC 日期比会让 UTC+8 早上 8 点前的「今天」算成昨天。
    RECENT = " AND date(o.create_time, 'localtime') >= date('now', 'localtime', '-29 days')"

    conn = get_db()
    try:
        def rank_top(extra, limit=10):
            """取榜首。JOIN 而不是 LEFT JOIN —— 这一列数的是「人」，
            没有归属的订单（账号被删、单还留着）不属于任何一个人，不该占榜上一个位置。

            这和 /api/admin/stats 的榜单口径**故意不同**：那边必须带上无归属的单，
            因为它要和订单列表的总数对得上；这边叫「下单榜」，口径本来就是个「人」字，
            带上一个没有名字的「（无归属）」反而没人看得懂那行是什么。
            """
            # 并列时按「谁最近下的单」排（MAX(o.id)）：不加这一条的话，
            # 同单数的几个人谁在前是 SQLite 自己决定的，刷新一次换个位置，看着像在闪。
            return conn.execute('''
                SELECT o.user_id AS user_id, u.nickname AS nickname, COUNT(*) AS count
                FROM orders o JOIN users u ON u.id = o.user_id
                WHERE 1 = 1{extra}
                GROUP BY o.user_id
                ORDER BY count DESC, MAX(o.id) DESC
                LIMIT {limit}
            '''.format(extra=extra, limit=limit)).fetchall()

        def my_standing(extra, mine):
            """我的名次 = 单数比我多的人数 + 1（单数相同即同名次）。

            一条 SQL 同时出 ahead 和 ranked，省掉「并列怎么数」的第二种算法：
            换个写法（比如按 ROW_NUMBER 排）就得再定义一遍并列规则，
            两处定义迟早会对不上，而名次对不上是没有日志能提示的那种错。
            SUM 在没有匹配行时返回 NULL，所以 COALESCE 到 0 —— 一个单都没下过的时候，
            ahead 是 0 而不是 NULL，前端算出来的就是「第 1 名」。
            """
            row = conn.execute('''
                SELECT COALESCE(SUM(CASE WHEN n > ? THEN 1 ELSE 0 END), 0) AS ahead,
                       COUNT(*) AS ranked
                FROM (
                    SELECT o.user_id AS uid, COUNT(*) AS n
                    FROM orders o JOIN users u ON u.id = o.user_id
                    WHERE 1 = 1{extra}
                    GROUP BY o.user_id
                )
            '''.format(extra=extra), (mine,)).fetchone()
            return {'count': mine, 'rank': row['ahead'] + 1, 'ranked': row['ranked']}

        # 我自己各状态的单数，一条 GROUP BY 全出（卡片上只用到「进行中 / 可取了」两格）。
        # 之所以只查自己：总单数 / 近 7 天 / 账号数这类站点规模不再出库（见本函数开头），
        # 学生要的是「我自己的进度」，不是「这个站一共印了多少张纸」。
        # 分头查几个数字的写法也不可取：口径改一处漏一处，就会出现
        # 「进行中比我的单数还多」这种自相矛盾的卡片，而且不会报错。
        my_status = {}
        for item in conn.execute(
                'SELECT status AS k, COUNT(*) AS c FROM orders WHERE user_id = ?'
                ' GROUP BY k', (uid,)).fetchall():
            my_status[item['k']] = item['c']
        unclaimed = conn.execute(
            'SELECT COUNT(*) AS c FROM orders WHERE claimed_by IS NULL').fetchone()['c']
        # 只摆排队还认的那几档（config.ORDER_STATUSES_QUEUE，不含已取件）：
        # 只认 config 里的状态。直接把 GROUP BY 的结果塞给前端的话，
        # 库里万一留着一个历史脏状态，界面就冒出一格没人认识的分类，而且不报错。
        # 已取件那一档连条目都不出现在响应里，前端因此也没法「顺手」把它画出来。
        counted = {}
        for item in conn.execute(
                'SELECT status AS k, COUNT(*) AS c FROM orders GROUP BY k').fetchall():
            counted[item['k']] = item['c']
        # 这里发的是**有序数组**，不是 {状态: 数量} 字典 —— 顺序是这个接口的一部分。
        # 用字典的话，在 config 里按流程摆好的先后到了前端就没了：Flask 的 JSON
        # 序列化默认对键排序（app.json.sort_keys，Flask 2.3+ 起默认 True），
        # 排出来是「可取了 / 待打印 / 待计费 / 打印中」，看着像随手撒的。
        # 排队这一行要的是流程顺序（哪一档堵住了得一眼看出来），
        # 而 JSON 对象的键顺序在规范里本来就不作数，所以让数组来担这个保证。
        statuses = [{'status': status, 'count': counted.get(status, 0)}
                    for status in ORDER_STATUSES_QUEUE]
        day_rows = conn.execute('''
            SELECT date(create_time, 'localtime') AS d, COUNT(*) AS c
            FROM orders
            WHERE date(create_time, 'localtime') >= date('now', 'localtime', '-13 days')
            GROUP BY d ORDER BY d
        ''').fetchall()
        top_recent = rank_top(RECENT)
        top_all = rank_top('')
        me_recent = my_standing(RECENT, conn.execute(
            'SELECT COUNT(*) AS c FROM orders o WHERE o.user_id = ?' + RECENT,
            (uid,)).fetchone()['c'])
        me_all = my_standing('', conn.execute(
            'SELECT COUNT(*) AS c FROM orders WHERE user_id = ?', (uid,)).fetchone()['c'])
    finally:
        conn.close()

    def board_row(index, row):
        is_me = row['user_id'] == uid
        return {
            'rank': index,
            'nickname': row['nickname'] if is_me else mask_nickname(row['nickname']),
            'count': row['count'],
            'is_me': is_me,
        }

    # 缺的日子要补零：SQL 只返回「有单的那几天」，直接画会把柱子挤在一起，
    # 看上去像那段时间天天爆单。算法跟 /api/my-stats 一样，从今天往前数 14 天。
    counts = {row['d']: row['c'] for row in day_rows}
    today = datetime.now().date()
    daily = [
        {'date': (today - timedelta(days=offset)).isoformat(),
         'count': counts.get((today - timedelta(days=offset)).isoformat(), 0)}
        for offset in range(13, -1, -1)
    ]

    return jsonify({
        'code': 0,
        # 卡片上这四个数字全是本人的。rank / ranked 复用累计榜那条 SQL 的结果，
        # 前端不要再自己数「比我多的有几个人」—— 两处算法迟早对不上。
        # 注意没下过单时 rank 仍是 1（后端为了让算法少一个分支），
        # 所以前端必须先判 total，不能见数就画（见 BoardView 的 mineRankText）。
        'mine': {
            # total 故意取累计榜那个数（me_all['count']），而不是再 COUNT 一遍：
            # 卡片上的「我的单数」和榜上「你在这张榜上共 N 单」必须一模一样，
            # 同源才保证有一天改口径时不会只改一边。
            'total': me_all['count'],
            # 「进行中」把待计费算进来，跟学生端 /api/my-orders 的口径一致：
            # 刚提交完、还在等报价的单如果被算成「没在动」，
            # 学生看到「进行中 0」会以为没提交上，转头再传一遍。
            'active': sum(my_status.get(status, 0)
                          for status in (ST_UNPRICED, ST_PENDING, ST_PRINTING)),
            'ready': my_status.get(ST_READY, 0),
            'rank': me_all['rank'],
            'ranked': me_all['ranked'],
        },
        'queue': {'unclaimed': unclaimed, 'statuses': statuses},
        'daily': daily,
        'boards': [
            {'key': 'recent', 'label': '近 30 天', 'hint': 'Recent 30 days',
             'top': [board_row(i, row) for i, row in enumerate(top_recent, 1)],
             'me': me_recent},
            {'key': 'all', 'label': '累计', 'hint': 'All time',
             'top': [board_row(i, row) for i, row in enumerate(top_all, 1)],
             'me': me_all},
        ],
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

    # 预设服务下的单没有文件（file_path 是空串，见 create_preset_order），
    # 必须在这里就挡住。放过去的话，Path('').resolve() 等于当前目录，
    # 会被下面那道路径校验判成「不在上传目录内」——于是一次普通的点错按钮
    # 变成一条 path_traversal_blocked 安全告警，真正被篡改时反而淹在噪声里。
    if not row['file_path']:
        return jsonify({'code': 400, 'msg': '这一单用的是预设服务，没有文件可下载'}), 400

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
    # 下载也留痕：文件离开服务器这件事，事后要能回答「谁什么时候拿走的」。
    # 这条走独立短连接（见 log_event）—— 只读操作没有事务可搭，
    # 而且留痕失败不该把用户的下载搞失败。
    log_event(order_id, ORDER_LOG_DOWNLOAD, '下载文件「%s」' % row['filename'])
    return send_file(file_path, as_attachment=True, download_name=row['filename'])
