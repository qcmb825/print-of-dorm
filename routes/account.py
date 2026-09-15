"""routes/account.py —— 账号接口：存活检查、当前用户、注册、登录、登出。"""

import sqlite3
import secrets
from flask import Blueprint, g, jsonify, request, session

from config import (ROLE_LABELS, ROLE_SUPER, ROLE_USER, STATUS_ACTIVE, STATUS_CLOSED,
                    logger, public_role, public_role_label)
from db import get_db
from security import (
    actor_label,
    clear_login_failures,
    client_ip,
    ensure_csrf_token,
    login_blocked,
    login_key,
    make_password_records,
    record_login_failure,
    security_event,
    verify_password,
)
from utils import validate_registration

bp = Blueprint('account', __name__)

# 接口

# 探活接口，对应 Java 那边的 /hello
@bp.route('/hello')
def hello():
    return '打印服务已启动！'



@bp.route('/healthz')
def healthz():
    """探活：给反向代理、进程守护和监控用的。

    和 /hello 的区别是它会真的访问一下数据库。只检查进程还活着是不够的：
    数据库文件被别的进程占着、数据目录被挪走这类情况下，进程看着好好的，
    接口却全在报错 —— 探活报「正常」而业务全挂，比直接探活失败难查得多。
    """
    try:
        conn = get_db()
        try:
            conn.execute('SELECT 1').fetchone()
        finally:
            conn.close()
    except sqlite3.Error as exc:
        logger.error('健康检查失败：数据库不可用（%s）', exc)
        return jsonify({'code': 503, 'msg': 'database unavailable'}), 503
    return jsonify({'code': 0, 'msg': 'ok'})



# 账户接口

@bp.route('/api/me')
def api_me():
    """前端启动时调，返回当前登录用户和 CSRF 令牌。"""
    token = ensure_csrf_token()
    if g.get('user') is None:
        return jsonify({'code': 401, 'msg': '未登录', 'csrf': token, 'user': None}), 401
    user = dict(g.user)
    # 角色出库前统一过一遍对外口径，前端只会拿到 user / admin 两种值。
    # 好处是界面按角色分支的地方能少一处是一处，两套界面要各自维护的量也跟着少。
    real_role = user['role']
    user['role'] = public_role(real_role)
    user['role_label'] = public_role_label(real_role)
    # advanced 不是角色名，只是告诉前端「这个账号要不要多一份高级视图的入口」。
    # 叫这个名字是有意的：它描述的是界面，不是身份；光看响应体，
    # 能看出的只是「这个账号的界面多一个开关」。
    user['advanced'] = (real_role == ROLE_SUPER)
    return jsonify({'code': 0, 'csrf': token, 'user': user})



@bp.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json(silent=True) or {}
    payload, error = validate_registration(data)
    if error:
        # 校验失败只记 DEBUG，用户填错很常见，记 WARNING 会把真正的问题淹了
        logger.debug('注册参数校验不通过：%s ip=%s', error, client_ip())
        return jsonify({'code': 400, 'msg': error}), 400

    key = 'register:' + client_ip()
    if login_blocked(key):
        security_event('register_rate_limited', '该 IP 短时间内反复提交注册')
        return jsonify({'code': 429, 'msg': '注册过于频繁，请稍后再试'}), 429

    password_hash, password_enc = make_password_records(payload['password'])
    conn = get_db()
    try:
        # 判重必须带上「还没注销」这个条件，跟数据库里那三个部分唯一索引口径一致。
        # 少了它就会出现很气人的情况：注销的账号明明把昵称让出来了，
        # 注册却还是被这句 SELECT 拦住 —— 数据库说能用、代码说不能用。
        # 同一件事在两个地方各判一遍，这种不一致迟早会撞上，所以两边都把条件写全。
        for column, label in (('nickname', '昵称'), ('real_name', '姓名'), ('student_id', '学号')):
            exists = conn.execute(
                f'SELECT 1 FROM users WHERE {column} = ? AND status != ? LIMIT 1',
                (payload[column], STATUS_CLOSED),
            ).fetchone()
            if exists:
                record_login_failure(key)
                logger.info('注册被拒：%s「%s」已被占用 ip=%s', label, payload[column], client_ip())
                return jsonify({'code': 409, 'msg': f'{label}已被注册，请更换'}), 409
        cursor = conn.execute('''
            INSERT INTO users
                (nickname, real_name, student_id, dorm, contact_type, contact,
                 password_hash, password_enc, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            payload['nickname'], payload['real_name'], payload['student_id'], payload['dorm'],
            payload['contact_type'], payload['contact'],
            password_hash, password_enc, ROLE_USER,  # 注册一律是普通用户，管理员只能由管理端升级
        ))
        conn.commit()
        uid = cursor.lastrowid
    except sqlite3.IntegrityError:
        conn.rollback()
        logger.warning('注册写入冲突（并发下同一昵称/姓名/学号被同时注册）ip=%s', client_ip())
        return jsonify({'code': 409, 'msg': '昵称、姓名或学号已被注册'}), 409
    finally:
        conn.close()

    session.clear()  # 防会话固定攻击，登录前后换个全新的会话
    session['uid'] = uid
    session['csrf'] = secrets.token_urlsafe(32)
    session.permanent = True
    logger.info('新用户注册 #%s 昵称=%s 姓名=%s 学号=%s 宿舍=%s 联系方式=%s ip=%s',
                uid, payload['nickname'], payload['real_name'], payload['student_id'],
                payload['dorm'], payload['contact'] or '(未填写)', client_ip())
    return jsonify({'code': 0, 'msg': '注册成功', 'csrf': session['csrf'], 'user': {
        'id': uid, 'nickname': payload['nickname'], 'real_name': payload['real_name'],
        'student_id': payload['student_id'], 'dorm': payload['dorm'],
        'contact_type': payload['contact_type'], 'contact': payload['contact'],
        'role': ROLE_USER, 'role_label': ROLE_LABELS[ROLE_USER],
        # 新注册的账号一律走普通视图。字段固定写上而不是省掉 ——
        # 前端两个登录入口拿到的 user 长得一样，少一个字段就得再多一层兜底。
        'advanced': False,
    }})



@bp.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json(silent=True) or {}
    identifier = (data.get('identifier') or '').strip()
    password = data.get('password') or ''
    if not identifier or not password:
        return jsonify({'code': 400, 'msg': '请输入姓名/昵称和密码'}), 400

    key = login_key(identifier)
    locked = login_blocked(key)
    if locked:
        security_event('login_locked', 'identifier=%s 仍在锁定中，剩余 %s 秒' % (identifier[:40], locked))
        return jsonify({'code': 429, 'msg': f'失败次数过多，请 {locked} 秒后再试'}), 429

    conn = get_db()
    fail_reason = ''
    row = None
    try:
        # 登录框里填的是「姓名或昵称」，而这两个字段之间没有任何约束，
        # 完全可能出现「甲的昵称恰好等于乙的姓名」。所以这里把两边命中的行都取回来，
        # 再用密码去认人 —— 密码才是真正能区分身份的东西。
        #
        # 早先这里写的是 `nickname = ? OR real_name = ? LIMIT 1`，
        # 两处都命中时返回哪一行取决于扫描顺序，而扫描顺序不是我们能指望的东西：
        # 一旦拿到的是别人的那一行，密码自然永远对不上，提示还偏偏是「密码错误」——
        # 用户只能一遍遍怀疑自己打错了。这种 bug 只在撞名时发病，最难查。
        rows = conn.execute(
            'SELECT * FROM users WHERE nickname = ? COLLATE NOCASE OR real_name = ? COLLATE NOCASE',
            (identifier, identifier),
        ).fetchall()
        # 返回给用户的永远是同一句话，避免泄露账号是否存在；
        # 但日志里要记清真实原因，不然后面排查完全抓瞎。这两者必须分开。
        if not rows:
            fail_reason = '账号不存在'
        else:
            for candidate in rows:
                if verify_password(candidate['password_hash'], password):
                    row = candidate
                    break
            if row is None:
                fail_reason = '密码错误'
            elif row['status'] != STATUS_ACTIVE:
                # 对外永远只吐「账号或密码错误」这一句，但日志里必须分清是哪一种，
                # 不然后面有人来问「我密码没打错啊」的时候，完全看不出是账号本身停了。
                fail_reason = '账号已注销' if row['status'] == STATUS_CLOSED else '账号已被禁用'
        if fail_reason:
            record_login_failure(key)
            security_event('login_failed', 'identifier=%s 真实原因=%s' % (identifier[:40], fail_reason))
            return jsonify({'code': 401, 'msg': '账号或密码错误'}), 401
        conn.execute('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', (row['id'],))
        conn.commit()
    finally:
        conn.close()

    clear_login_failures(key)
    session.clear()  # 防会话固定攻击
    session['uid'] = row['id']
    session['csrf'] = secrets.token_urlsafe(32)
    session.permanent = True  # 配合 PERMANENT_SESSION_LIFETIME 实现保持登录
    logger.info('用户登录 #%s 昵称=%s 角色=%s ip=%s', row['id'], row['nickname'], row['role'], client_ip())
    return jsonify({'code': 0, 'csrf': session['csrf'], 'user': {
        'id': row['id'], 'nickname': row['nickname'], 'real_name': row['real_name'],
        'student_id': row['student_id'], 'dorm': row['dorm'],
        'contact_type': row['contact_type'], 'contact': row['contact'],
        # 同样走对外口径：登录接口和 /api/me 返回的角色写法完全一致，
        # 前端不用管自己是从哪个入口登进来的。
        'role': public_role(row['role']), 'role_label': public_role_label(row['role']),
        # 和 /api/me 保持同一个口径：这个字段决定侧边栏那个入口要不要绑上。
        'advanced': (row['role'] == ROLE_SUPER),
    }})



@bp.route('/api/logout', methods=['POST'])
def api_logout():
    who = actor_label()  # 必须在清空会话之前取，不然拿不到是谁退出的
    session.clear()
    logger.info('用户退出登录 %s ip=%s', who, client_ip())
    return jsonify({'code': 0, 'msg': '已退出登录'})
