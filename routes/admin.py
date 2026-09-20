"""routes/admin.py —— 管理员接口：账号管理、统计。"""

import sqlite3
from datetime import datetime, timedelta
from flask import Blueprint, g, jsonify, request

from auth import roles_required
from config import (ROLE_ADMIN, ROLE_LABELS, ROLE_SUPER, ROLE_USER,
                    STATUS_ACTIVE, STATUS_CLOSED, STATUS_DISABLED,
                    ST_UNPRICED, logger, public_role, public_role_label)
from db import db_conn
from security import (audit_action, client_ip, decrypt_password, make_password_records,
                      security_event)
from utils import display_name, password_error, validate_identity_fields

bp = Blueprint('admin', __name__)


# 管理员接口

# 账号列表，能看哪些字段按角色做了收口
@bp.route('/api/admin/users')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_users():
    """账号列表：两处敏感信息各自做了收口。

    1) 凭据列默认不存在，只有显式带 ?detail=1 才解密，而且强制审计留痕；
    2) 列表本身的可见范围由下面的 where 决定。

    第 2 条故意放在 SQL 里，不是让前端不渲染：
    前端过滤只是蒙眼睛，数据早就躺在响应体里了，按 F12 看网络请求或者 curl 一把就全看得见，
    等于没隐藏。敏感数据的正确做法是让不该给的人拿都拿不到，而不是给了但指望他不看。

    两个参数名（detail / role）都取得很平淡，属于有意为之：
    从抓包角度看这个请求，它就是个再普通不过的列表查询。
    """
    is_super = g.user['role'] == ROLE_SUPER
    want_detail = is_super and request.args.get('detail') in ('1', 'true', 'yes')
    # 已注销的账号默认不进列表。不是不能看 —— 它们的数据全部留着，
    # 把开关打开（include_closed=1）就能看到。
    # 默认藏起来只是因为「已经走的人」没必要天天占着一屏地方。
    include_closed = request.args.get('include_closed') in ('1', 'true', 'yes')

    with db_conn() as conn:
        # 条件一段段攒起来再拼，而不是按角色写死两种 where：
        # 以后想加「只看某状态」「按昵称搜索」，都只是往列表里多 append 一句。
        # 片段全是代码里写死的常量，值一律走 ? 占位符，所以照样没有注入口子。
        conds, params = [], []
        if not is_super:
            conds.append('u.role != ?')
            params.append(ROLE_SUPER)
        if not include_closed:
            conds.append('u.status != ?')
            params.append(STATUS_CLOSED)
        where = ('WHERE ' + ' AND '.join(conds)) if conds else ''
        rows = conn.execute('''
            SELECT u.id, u.nickname, u.real_name, u.student_id, u.dorm, u.qq, u.contact_type, u.contact,
                   u.password_enc, u.role, u.status,
                   datetime(u.create_time, 'localtime') AS create_time,
                   datetime(u.last_login, 'localtime') AS last_login,
                   (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count,
                   (SELECT COUNT(*) FROM orders o WHERE o.claimed_by = u.id) AS claimed_count
            FROM users u
        ''' + where + '''
            ORDER BY CASE WHEN u.role IN (?, ?) THEN 0 ELSE 1 END, u.id
        ''', (*params, ROLE_SUPER, ROLE_ADMIN)).fetchall()

        # 告诉前端「藏了几个」。数字的过滤条件必须跟列表一模一样，
        # 否则又会变成「列表说 5 个、这里说藏了 2 个」这种自己对不上自己的数字。
        # 只给个数，不给这些人是谁 —— 关了开关就真的看不到内容。
        closed_conds, closed_params = ['status = ?'], [STATUS_CLOSED]
        if not is_super:
            closed_conds.append('role != ?')
            closed_params.append(ROLE_SUPER)
        closed_total = conn.execute(
            'SELECT COUNT(*) AS c FROM users WHERE ' + ' AND '.join(closed_conds),
            closed_params).fetchone()['c']

    users = []
    for row in rows:
        item = dict(row)
        item.pop('password_enc', None)  # 密文绝不进响应体
        if want_detail:
            item['password'] = decrypt_password(row['password_enc']) or '（无法解密）'
        # 角色出库前统一过一遍对外口径。
        # 角色名也一起换掉，否则会出现「角色」列写着一种叫法、
        # 其它地方写着另一种的错位，反而成了告诉别人「这行不一样」的记号。
        item['role'] = public_role(item['role'])
        item['role_label'] = public_role_label(row['role'])
        # 这一行是不是调用者自己，交给前端去决定隐藏哪些按钮。
        # 它只是一个 UI 提示，真正拦住「改自己」的仍然是接口里的判断。
        item['is_self'] = (row['id'] == g.user['id'])
        users.append(item)

    if want_detail:
        # 一次性吐出全部账号的明文密码，是系统里最敏感的操作，必须留痕。
        # 但只记是谁、什么时候、拉了几个账号，绝不记密码本身，日志不能变成第二个泄露源。
        # 日志是给运维自己看的，所以这里允许写真话（含「明文密码」字样）。
        audit_action('view_plaintext_passwords',
                     '拉取全部账号列表 %s 个（含明文密码）' % len(users))
    return jsonify({'code': 0, 'total_users': len(users),
                    'detail': want_detail, 'include_closed': include_closed,
                    'closed_total': closed_total, 'users': users})



# 升级 / 降级账号角色，不能动自己的角色，也不是每个管理员都能调（看装饰器）
@bp.route('/api/admin/user/<int:user_id>/role', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_set_role(user_id):
    data = request.get_json(silent=True) or {}
    new_role = (data.get('role') or '').strip()
    if new_role not in (ROLE_USER, ROLE_ADMIN):
        return jsonify({'code': 400, 'msg': '只能设置成普通用户或管理员'}), 400
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能修改自己的角色'}), 400

    with db_conn() as conn:
        target = conn.execute('SELECT role, nickname, status FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('role_change_denied', '试图修改管理端账号 #%s 的角色' % user_id)
            # 提示文案保持中性：这句话会原样弹给操作者看。
            # 真相只留在服务端的安全日志里（上面那一行），对外没必要多说一个字。
            return jsonify({'code': 403, 'msg': '该账号的角色不可修改'}), 403
        if target['status'] == STATUS_CLOSED:
            # 注销是终态。已注销的账号进不来，改它的角色产生不了任何实际效果，
            # 却会留下一个「已经注销的管理员」这种谁看了都得猜的状态。
            return jsonify({'code': 403, 'msg': '该账号已注销，无需再调整角色'}), 403
        conn.execute('UPDATE users SET role = ? WHERE id = ?', (new_role, user_id))
        conn.commit()
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
    if new_status not in (STATUS_ACTIVE, STATUS_DISABLED):
        # 这里只收 active / disabled 两个值，closed 不放进来：
        # 注销有它自己的接口，因为它要处理的事比「改个字段」多，
        # 而启用 / 禁用是个可以来回切的动作，注销不是。
        return jsonify({'code': 400, 'msg': '状态只能是 active 或 disabled'}), 400
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能禁用自己的账号'}), 400

    with db_conn() as conn:
        target = conn.execute('SELECT role, nickname, status FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('account_disable_denied', '试图禁用管理端账号 #%s' % user_id)
            return jsonify({'code': 403, 'msg': '该账号不能被禁用'}), 403
        if target['status'] == STATUS_CLOSED:
            # 终态要靠这一句守死。上面那段只拦管理端账号，
            # 注销账号的角色还是 user 或 admin，不拦的话它会被一路放行到 UPDATE，
            # 那么这个「不能恢复」的承诺也就只是句文案了。
            return jsonify({'code': 403, 'msg': '该账号已注销，无法恢复'}), 403
        conn.execute('UPDATE users SET status = ? WHERE id = ?', (new_status, user_id))
        conn.commit()
    audit_action('change_status',
                 '目标 #%s/%s 状态 %s -> %s' % (user_id, target['nickname'], target['status'], new_status))
    return jsonify({'code': 0, 'msg': '已启用' if new_status == STATUS_ACTIVE else '已禁用'})



# 注销账号。注销只做一件事：把 status 改成 closed，从此登不进来。
#
# 早先这里是 DELETE，会真把 users 那一行删掉，顺便把订单的外键置空。
# 真删的毛病在业务凭证上：订单还在，可「谁下的」变成了空白，
# 排行榜里多出一行没主的单，出了问题连该去问谁都看不出来。
#
# 如今连路由方法都从 DELETE 换成了 POST .../close —— 这个动作没有删除任何东西，
# 继续挂在 DELETE 上就是骗以后读这份代码的人（包括几个月后的自己）。
#
# 为什么不顺手把密码也换掉：注销账号的身份已经由 status 卡死了，
# 清密码并不能多挡任何东西，反而弄没了「数据保留」这四个字的完整性。
@bp.route('/api/admin/user/<int:user_id>/close', methods=['POST'])
@roles_required(ROLE_SUPER)
def api_admin_close_user(user_id):
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能注销自己的账号'}), 400

    with db_conn() as conn:
        target = conn.execute(
            'SELECT role, nickname, status FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('account_close_denied', '试图注销管理端账号 #%s' % user_id)
            return jsonify({'code': 403, 'msg': '该账号不能被注销'}), 403
        if target['status'] == STATUS_CLOSED:
            return jsonify({'code': 400, 'msg': '该账号已经是注销状态'}), 400
        conn.execute('UPDATE users SET status = ? WHERE id = ?', (STATUS_CLOSED, user_id))
        conn.commit()
    # 注销是个不常发生但很重的动作，要记清对象和当时的状态
    audit_action('close_account',
                 '注销账号 #%s/%s，状态 %s -> closed，订单与工单全部保留'
                 % (user_id, target['nickname'], target['status']))
    return jsonify({'code': 0, 'msg': '账号已注销，历史数据保留'})



# 改资料：昵称 / 姓名 / 学号 / 宿舍 / 联系方式。
#
# 一次提交全量覆盖，不做「只改传了的字段」那种 PATCH ——
# 前端弹窗本来就是把当前值全填进去再让人改，全量写法就少一层
# 「这个字段到底传没传」的判断，也少一种「以为自己在清空、其实是没传」的歧义。
@bp.route('/api/admin/user/<int:user_id>/profile', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_set_profile(user_id):
    """管理员改账号资料。

    这里刻意**不查学生名单库**。名单库是注册的闸门，它回答的是
    「这个身份能不能开一个新账号」；而管理员改资料属于人工介入 ——
    名单本身就落后于现实（新生、转专业、名字写错都得靠人去改），
    再拿那份静态数据去挡在场的人的判断，只会把「名单里还没录」的人卡住，
    最后又绕回私下改库，那才是真的失控。
    格式和唯一性照旧严卡：学号是登录名，形状错了这人当场就登不进来了。
    """
    data = request.get_json(silent=True) or {}
    fields, error = validate_identity_fields(data)
    if fields is None:
        return jsonify({'code': 400, 'msg': error}), 400

    with db_conn() as conn:
        try:
            target = conn.execute('SELECT * FROM users WHERE id = ?', (user_id,)).fetchone()
            if target is None:
                return jsonify({'code': 404, 'msg': '账号不存在'}), 404
            if target['status'] == STATUS_CLOSED:
                # 注销账号的资料没有意义：人已经登不进来，而它的昵称/学号
                # 早就让给别人了，改它只会撞上唯一索引。
                return jsonify({'code': 403, 'msg': '该账号已注销，如需修改请先恢复'}), 403

            # 昵称和学号是全表仅有的两个「唯一」字段，改之前得先看有没有人占着。
            # 这里的条件要和数据库里那两条部分唯一索引**一字不差**地对上：
            # 只跟「还没注销」的账号比，还要把自己排除掉（不然改谁都撞自己）。
            # 两边口径不一致是最难受的失败形态 —— 代码说能用，改下去却撞索引报 500。
            for column, label in (('nickname', '昵称'), ('student_id', '学号')):
                if fields[column] == target[column]:
                    continue
                owner = conn.execute(
                    'SELECT id, nickname FROM users'
                    f' WHERE {column} = ? AND status != ? AND id != ? LIMIT 1',
                    (fields[column], STATUS_CLOSED, user_id)).fetchone()
                if owner is not None:
                    return jsonify({
                        'code': 409,
                        'msg': '%s「%s」已被账号 %s（#%s）占用'
                               % (label, fields[column], owner['nickname'], owner['id']),
                    }), 409

            conn.execute('''
                UPDATE users
                 SET nickname = ?, real_name = ?, student_id = ?, dorm = ?,
                     qq = ?, contact_type = ?, contact = ?
                 WHERE id = ?
            ''', (fields['nickname'], fields['real_name'], fields['student_id'], fields['dorm'],
                fields['qq'], fields['contact_type'], fields['contact'], user_id))
            conn.commit()
        except sqlite3.IntegrityError:
            # 上面查重到这句 UPDATE 之间还有一点缝（两个人同时改同一个昵称）。
            # 让它撞在这里并回一句人话，比抛 500 强：唯一索引是最后一道防线，不是唯一一道。
            conn.rollback()
            logger.warning('改资料撞唯一索引：目标 #%s ip=%s', user_id, client_ip())
            return jsonify({'code': 409, 'msg': '昵称或学号刚被别人占用，请刷新后重试'}), 409

    # 审计要记「哪个字段从什么改成了什么」。只列真的变了的字段：
    # 全量列一遍的话日志里九成是没动过的值，真去查「谁把学号改了」反而得一行行看。
    changes = [
        '%s %s → %s' % (label, target[column], fields[column])
        for column, label in (('nickname', '昵称'), ('real_name', '姓名'),
                              ('student_id', '学号'), ('dorm', '宿舍'))
        if fields[column] != target[column]
    ]
    # 联系方式是一组两个字段（类型 + 号码）。只比号码的话，「把微信换成 QQ、
    # 号码一个字没动」会被算成「没有变化」—— 改动就这么从日志里消失了。
    # 这里**不能**写 target.get('qq')：上面那句是 SELECT *，拿到的是 sqlite3.Row，
    # 它有 __getitem__ 但没有 get()，调用会直接 AttributeError（500）。
    # qq 是 v14 起就有的列，SELECT * 一定带着它，下标取就够。
    if (fields['qq'], fields['contact_type'], fields['contact']) != (
            target['qq'], target['contact_type'], target['contact']):
        changes.append('联系方式 qq=%s %s:%s → qq=%s %s:%s' % (
            target['qq'] or '(空)', target['contact_type'], target['contact'],
            fields['qq'] or '(空)', fields['contact_type'], fields['contact']))
    if changes:
        audit_action('change_profile',
                     '目标 #%s/%s %s' % (user_id, target['nickname'], '；'.join(changes)))
    logger.info('管理员修改账号资料 #%s 变更=%s ip=%s',
                user_id, '；'.join(changes) or '(无变化)', client_ip())
    return jsonify({'code': 0, 'msg': '资料已更新' if changes else '资料没有变化'})



@bp.route('/api/admin/user/<int:user_id>/password', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_reset_password(user_id):
    """管理员给账号设一个新密码。

    和「查看明文密码」不是一回事：那个是读，这个是写，写进去的东西
    当事人下次登录当场生效。所以这条也过审计，但**审计里绝不记密码本身** ——
    日志不能变成第二个泄露源，密钥轮换后翻日志还能捞到旧密码就更荒唐了。
    """
    data = request.get_json(silent=True) or {}
    new_password = data.get('password') or ''
    if not new_password:
        return jsonify({'code': 400, 'msg': '请填写新密码'}), 400

    with db_conn() as conn:
        target = conn.execute(
            'SELECT id, nickname, student_id, status FROM users WHERE id = ?',
            (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['status'] == STATUS_CLOSED:
            return jsonify({'code': 403, 'msg': '该账号已注销，如需修改请先恢复'}), 403
        # 强度规则和注册共用一份（utils.password_error）—— 两边各写一套的话，
        # 迟早变成「注册要带数字、重置却什么都不要求」，管理员随手设个 123 就进去了。
        # 这里只有一道：不比对「确认密码」，那是用户自己打字时防手滑用的，
        # 管理员重置是他打一串临时密码交给本人，多设一道挡不住任何事。
        error = password_error(new_password, target['nickname'], target['student_id'])
        if error:
            return jsonify({'code': 400, 'msg': error}), 400
        password_hash, password_enc = make_password_records(new_password)
        # 顺手把 session_epoch + 1，让这个账号已经发出的登录态全部作废。
        # 重置密码的场景有两种，两种都需要这一手：
        #   1) 本人在线、管理员给他换个新密码 —— 他那台机器上的旧 Cookie 必须马上不能用，
        #      否则新密码形同虚设，谁还留着旧登录态谁就照样进得来；
        #   2) 密码是被人偷走、事后才发现 —— 光改密码只挡住了「下次登录」，
        #      小偷手里那条已经生效的登录态还能一直用到会话到期为止。
        # 和 app.load_current_user 的 epoch 比对是配套的：库里这个数一变，
        # 所有旧 Cookie 下一个请求就对不上，只能用新密码重新登录。
        conn.execute('UPDATE users SET password_hash = ?, password_enc = ?, '
                     'session_epoch = session_epoch + 1 WHERE id = ?',
                     (password_hash, password_enc, user_id))
        conn.commit()
    audit_action('reset_password', '目标 #%s/%s' % (user_id, target['nickname']))
    logger.info('管理员重置账号密码 #%s/%s ip=%s', user_id, target['nickname'], client_ip())
    return jsonify({'code': 0, 'msg': '密码已重置，请把新密码转告本人'})



# 恢复一个已注销的账号。
#
# 注销当初是当终态设计的，连数据库都替它守着：昵称/学号的部分唯一索引
# 条件写的是 status <> 'closed'，意思是注销的账号把那两个名字**让了出去**。
# 所以「恢复」不是把状态改回来这么简单 —— 名字可能已经被别人用了，
# 直接改回来会撞索引。而这一撞其实是好事：它逼着恢复这件事必须先由人确认。
#
# 因此这里先查冲突，撞上了整体拒绝，并把「被谁占着」一并说清楚：
# 只回一句「冲突了」的话，管理员除了挨个翻列表没有别的办法，
# 而这件事最终也只能由人来定夺（让谁改名，还是就这么算了）。
@bp.route('/api/admin/user/<int:user_id>/restore', methods=['POST'])
@roles_required(ROLE_SUPER)
def api_admin_restore_user(user_id):
    """恢复已注销账号。昵称或学号被别人占了就整体拒绝，不做任何自动改名。"""
    with db_conn() as conn:
        try:
            target = conn.execute(
                'SELECT id, nickname, real_name, student_id, status FROM users WHERE id = ?',
                (user_id,)).fetchone()
            if target is None:
                return jsonify({'code': 404, 'msg': '账号不存在'}), 404
            # 和注销那侧对称：注销「已经注销的账号」返回 400，恢复「没注销的账号」也返回 400。
            # 这里不用 409 —— 它不是并发冲突，是这个动作本身不适用。
            if target['status'] != STATUS_CLOSED:
                return jsonify({'code': 400, 'msg': '该账号没有注销，无需恢复'}), 400

            conflicts = []
            for column, label in (('nickname', '昵称'), ('student_id', '学号')):
                owner = conn.execute(
                    'SELECT id, nickname FROM users WHERE %s = ? AND status != ? LIMIT 1' % column,
                    (target[column], STATUS_CLOSED)).fetchone()
                if owner is not None:
                    conflicts.append({'label': label, 'value': target[column],
                                      'owner_id': owner['id'],
                                      'owner_nickname': owner['nickname']})
            if conflicts:
                # 冲突项结构化地回给前端，不拼进 msg 里：前端要逐条列出来，
                # 还要让操作者能直接点进那个占用的账号去看 —— 都靠这些字段。
                return jsonify({
                    'code': 409,
                    'msg': '昵称或学号已被其他账号占用，无法恢复',
                    'conflicts': conflicts,
                }), 409

            conn.execute('UPDATE users SET status = ? WHERE id = ?', (STATUS_ACTIVE, user_id))
            conn.commit()
        except sqlite3.IntegrityError:
            conn.rollback()
            logger.warning('恢复账号撞唯一索引：目标 #%s ip=%s', user_id, client_ip())
            return jsonify({'code': 409, 'msg': '昵称或学号刚被别人占用，请刷新后重试'}), 409
    audit_action('restore_account',
                 '恢复账号 #%s/%s（状态 closed -> active）' % (user_id, target['nickname']))
    logger.info('恢复账号 #%s/%s ip=%s', user_id, target['nickname'], client_ip())
    return jsonify({'code': 0, 'msg': '账号已恢复，现在可以用原学号登录'})



# 概览统计。只有只读的聚合数字，不含任何敏感字段，所以两侧都能看。
@bp.route('/api/admin/stats')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_stats():
    # 口径分两类，别混：
    #
    # 【账号口径】带 account_filter。账号列表本身是过滤过的，
    #   统计里的账号数字必须跟着一起过滤 —— 列表显示 3 个、这里说总数 4，
    #   等于变相告诉看的人「还有一个你看不到的账号」。挡了列表却漏了数字，等于没挡。
    #
    # 【订单口径】不带任何过滤。订单列表是全量的，谁下的单都看得见，
    #   这里要是少算了，数字反而和列表对不上 —— 那种「两个页面数字打架」
    #   的毛病比多显示一个数更难查。
    #
    # 排行榜是「按账号列出来」的地方，跟账号列表一个口径，所以也带过滤。
    #
    # 过滤条件两边各自算，只在服务端发生：谁知道谁的口径，谁都不会算出矛盾。
    is_super = g.user['role'] == ROLE_SUPER
    # 账号口径还得再排掉已注销的：列表默认不显示他们，统计里要是还数着，
    # 就会出现「列表 5 个、这里说总数 8」—— 挡了列表却漏了数字，等于没挡。
    # 条件和值成对收在列表里，下面几条 SQL 直接拼片段、绑值，
    # 不把角色名写进 SQL 文本：字面量一旦写死，改常量时这里就会静默失准。
    account_filter = ' AND status != ?'
    account_params = [STATUS_CLOSED]
    if not is_super:
        account_filter += ' AND role != ?'
        account_params.append(ROLE_SUPER)
    # 排行榜不带「已注销」这个过滤，因为它数的是「单」不是「人」：
    # 注销账号留下的订单仍然要算在总数里，否则两个页面的数字又该打架了。
    # 排行榜的过滤条件多了一个 IS NULL 分支，因为下面用的是 LEFT JOIN：
    # 订单的 user_id 可能是空的（账号被删时订单会保留、归属解除），
    # 这时 u.role 是 NULL，而「NULL != 某个值」的结果是 NULL 而不是真 ——
    # 不带这个分支的话，这些订单会被默默筛掉，
    # 排行榜的总和就跟「近 30 天订单」对不上了，而且是那种谁也不会想到去核对的不一致。
    rank_filter = '' if is_super else ' AND (u.role IS NULL OR u.role != ?)'
    rank_params = [] if is_super else [ROLE_SUPER]

    # 榜单上也套一遍 display_name：注销账号留下的单照样算数（榜单数的是「单」不是「人」），
    # 但名字得标出来 —— 同一个名字在订单列表里带标注、在榜单里光秃秃的，
    # 看的人第一反应是「这两处到底哪个对」。
    def _rank_rows(rows):
        out = []
        for row in rows:
            item = dict(row)
            item['nickname'] = display_name(item['nickname'], item.pop('status', None))
            out.append(item)
        return out

    with db_conn() as conn:
        users_total = conn.execute(
            'SELECT COUNT(*) AS c FROM users WHERE 1 = 1' + account_filter,
            account_params).fetchone()['c']
        new_users_7d = conn.execute(
            "SELECT COUNT(*) AS c FROM users WHERE "
            "date(create_time, 'localtime') >= date('now', 'localtime', '-6 days')" + account_filter,
            account_params).fetchone()['c']
        # 启用 / 禁用分开数，不拿 total 减出来：注销的账号既不是启用也不是禁用，
        # 用减法得到的是「非启用」而不是「禁用」，界面上会多出一批不存在的禁用账号。
        #
        # 这两个数和下面的 by_role 都带 account_filter，跟账号列表一个口径：
        # 挡了列表却漏了数字，等于变相告诉看的人「还有一个你看不到的账号」。
        active_users = conn.execute(
            'SELECT COUNT(*) AS c FROM users WHERE status = ?' + account_filter,
            [STATUS_ACTIVE] + account_params).fetchone()['c']
        disabled_users = conn.execute(
            'SELECT COUNT(*) AS c FROM users WHERE status = ?' + account_filter,
            [STATUS_DISABLED] + account_params).fetchone()['c']
        # 角色分组按「对外角色」翻译成中文再发出去，不直接把 user/admin/super
        # 发给前端：界面上那一栏的标题就是拿这个键当文字显示的，
        # 发英文键会在卡片上出现一个光齾齾的 "admin"。
        role_rows = conn.execute(
            'SELECT role, COUNT(*) AS count FROM users WHERE 1 = 1' + account_filter +
            ' GROUP BY role', account_params).fetchall()
        by_role = {}
        for item in role_rows:
            label = public_role_label(item['role'])
            by_role[label] = by_role.get(label, 0) + item['count']
        # 订单量按「今天 / 近 7 天 / 近 30 天」三档给。
        # 时间范围交给 SQLite 自己算（now / localtime），不从浏览器传日期过来：
        # 基准永远是数据库的当前时间，就不会出现「浏览器时区和服务器时区不一致，
        # 今天被算成昨天」，也省掉了校验前端日期参数这件事。
        #
        # 三档都按「本地日期」比，不是为了好看：create_time 存的是 UTC，
        # 而分组和今天用的是 localtime，两套口径混着用就会出现
        # 「近 7 天」在 UTC+8 下其实只覆盖 6 天多一点，柱状图最早那根也被截掉一截，
        # 看上去就像那天单量特别少 —— 一个你说不出错在哪的假数据。
        orders_total = conn.execute('SELECT COUNT(*) AS c FROM orders').fetchone()['c']
        orders_today = conn.execute(
            "SELECT COUNT(*) AS c FROM orders WHERE date(create_time, 'localtime') = date('now', 'localtime')"
        ).fetchone()['c']
        orders_7d = conn.execute(
            "SELECT COUNT(*) AS c FROM orders WHERE "
            "date(create_time, 'localtime') >= date('now', 'localtime', '-6 days')"
        ).fetchone()['c']
        orders_30d = conn.execute(
            "SELECT COUNT(*) AS c FROM orders WHERE "
            "date(create_time, 'localtime') >= date('now', 'localtime', '-29 days')"
        ).fetchone()['c']
        unclaimed = conn.execute(
            'SELECT COUNT(*) AS c FROM orders WHERE claimed_by IS NULL').fetchone()['c']
        # 已接单。它和 unclaimed 加起来应该正好等于 total ——
        # 这两个数就是靠这个关系互相盯着的：哪天有人把「已接单」改成了
        # 「状态不是待打印」，两个数字加起来对不上总数，一眼就能发现。
        claimed = conn.execute(
            'SELECT COUNT(*) AS c FROM orders WHERE claimed_by IS NOT NULL').fetchone()['c']
        # 按状态 / 颜色 / 双面分组。这里**不补零值**：
        # 补上 0 的话「有没有数据」就永远是真，前端那个「暂无数据」的空状态
        # 再也不会出现 —— 刚上线、一单都没有的时候，用户看到的是五个 0 围成的
        # 空圆环，而不是一句「还没有订单」。
        # 缺的键交给前端的 ?? 0 处理，那本来就是它该干的活。
        #
        # 颜色和双面可能为 NULL（老数据、或者上传时没传），
        # COALESCE 到默认值上：不管的话 GROUP BY 会多出一个键叫 None/空串的分组，
        # 前端的「黑白」「单面」两栏就少算了这些单。
        status_rows = conn.execute(
            'SELECT status AS k, COUNT(*) AS count FROM orders GROUP BY k').fetchall()
        color_rows = conn.execute(
            "SELECT COALESCE(color_type, 'black') AS k, COUNT(*) AS count"
            ' FROM orders GROUP BY k').fetchall()
        duplex_rows = conn.execute(
            "SELECT COALESCE(duplex, 'single') AS k, COUNT(*) AS count"
            ' FROM orders GROUP BY k').fetchall()
        # 待计费单数和累计金额。口径必须写清楚，否则以后一对账就要扯皮：
        #
        #   unpriced —— 只数「此刻停在待计费状态」的单，它就是待办队列的长度。
        #   revenue  —— 已经计过费的单金额之和，不管有没有打印、有没有取件。
        #     为什么不是「只算已取件」：管理员看这个数字回答的是「这段时间开了多少钱的单」，
        #     而不是「收回了多少钱」（这个系统里根本没有收款环节，无法知道收了没）。
        #     把没收到的钱也算成收入是不对的，但这里两个都不是 ——
        #     它叫「累计计费金额」，改名字的时候要连这里一起改。
        #
        # SUM 在没有匹配行时返回 NULL，不是 0。直接发给前端会得到 null，
        # 而前端拿 null 做运算会得出 NaN，界面上就是一个空白的金额格子 ——
        # 所以用 COALESCE 在 SQL 里就补成 0。
        #
        # 金额求和后再 round 一次：SQLite 的 REAL 是二进制浮点，
        # 几千笔加起来末尾会带出 1e-13 这种尾巴，不修就会显示成
        # 「1234.5600000000002 元」——数字没错，但看起来像系统出错了。
        unpriced = conn.execute(
            'SELECT COUNT(*) AS c FROM orders WHERE status = ?',
            (ST_UNPRICED,)).fetchone()['c']
        revenue = round(conn.execute(
            'SELECT COALESCE(SUM(price), 0) AS total FROM orders WHERE price IS NOT NULL'
        ).fetchone()['total'], 2)
        day_rows = conn.execute('''
            SELECT date(create_time, 'localtime') AS d, COUNT(*) AS c
            FROM orders
            WHERE date(create_time, 'localtime') >= date('now', 'localtime', '-13 days')
            GROUP BY d ORDER BY d
        ''').fetchall()
        # 两个排行榜分别对应两个问题：
        #   top_orderers —— 谁在打印（业务量从哪来）
        #   top_claimers —— 谁在干活（接单集中在谁身上，要不要分摊）
        #
        # 下面两个 JOIN 左不同，不是随手写的：
        #   下单那个用 LEFT JOIN —— 订单不一定有主人（账号删了，单还在），
        #     用内连接会把它们直接丢掉，而这一列数的是「单」不是「人」，
        #     丢了就和订单总数对不上。没主人的归成一行，前端显示为「（无归属）」。
        #   接单那个用 INNER JOIN —— 它数的是「谁接的单」，
        #     没人接的单本来就不属于任何一个接单人的成绩，丢掉才是对的。
        #
        # 片段是代码里写死的常量，没有用户输入，所以直接拼；有值就一律走 ? 占位符。
        # 分组键是 o.user_id / o.claimed_by 而不是昵称，这点很要紧：
        # 按昵称分组的话，一个注销的人和一个刚注册的同名新人会被算成同一行，
        # 两家的单量被悄悄加在一起，还找不到是谁算错的。
        # 顺带把 u.status 取出来，交给 _rank_rows 决定要不要标注。
        #
        # 计数列的别名统一叫 count、不叫 c：这个字段是直接发给前端的，
        # 要和下面 daily 里的 count 对齐。历史上这里写过 c，前端按 count 取就是
        # undefined —— 图表不报错、只是静默画不出柱子，非常难查。
        top_orderers = conn.execute('''
            SELECT u.nickname AS nickname, u.status AS status, COUNT(*) AS count
            FROM orders o LEFT JOIN users u ON u.id = o.user_id
            WHERE 1 = 1{rank_filter}
            GROUP BY o.user_id ORDER BY count DESC LIMIT 5
        '''.format(rank_filter=rank_filter), rank_params).fetchall()
        top_claimers = conn.execute('''
            SELECT u.nickname AS nickname, u.status AS status, COUNT(*) AS count
            FROM orders o JOIN users u ON u.id = o.claimed_by
            WHERE 1 = 1{rank_filter}
            GROUP BY o.claimed_by ORDER BY count DESC LIMIT 5
        '''.format(rank_filter=rank_filter), rank_params).fetchall()

    # 日粒度：SQL 只会返回「有单的那些天」，缺的日子根本不在结果里。
    # 所以要按日期跟区间自己补齐序列，否则柱子会挤在一起，
    # 图上完全看不出哪几天是空的。
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
            'new_7d': new_users_7d,
            'active': active_users,
            'disabled': disabled_users,
            'by_role': by_role,
        },
        'orders': {
            'total': orders_total,
            'today': orders_today,
            'last_7d': orders_7d,
            'last_30d': orders_30d,
            'unclaimed': unclaimed,
            'unpriced': unpriced,
            'revenue': revenue,
            'claimed': claimed,
            'by_status': {r['k']: r['count'] for r in status_rows},
            'by_color': {r['k']: r['count'] for r in color_rows},
            'by_duplex': {r['k']: r['count'] for r in duplex_rows},
        },
        'daily': daily,
        'top_orderers': _rank_rows(top_orderers),
        'top_claimers': _rank_rows(top_claimers),
    })
