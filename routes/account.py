"""routes/account.py —— 账号接口：存活检查、当前用户、注册、登录、登出。"""

import sqlite3
import secrets
from flask import Blueprint, g, jsonify, request, session

from config import (ROLE_LABELS, ROLE_SUPER, ROLE_USER, STATUS_ACTIVE, STATUS_CLOSED,
                    STUDENT_ID_RE, logger, public_role, public_role_label)
from db import get_db
from identity import (GATE_CAN_APPLY_AUDIT, GATE_ROSTER_UNAVAILABLE, check_registration,
                      fill_missing_name)
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
    return '小猫娘打印服务已启动！'



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

    # 身份核验必须排在下面那一段「判重」之前。用户最该先知道的不是
    # 「这个昵称被人用了」，而是「你这个学号根本不在我们学校的名单里」——
    # 让他先改昵称、再换密码、最后才被告知身份不对，前面那几步全白做了。
    verdict = check_registration(payload['student_id'], payload['real_name'])
    if not verdict.allowed:
        # 和判重里的处理一样也记一次失败：拿不存在的学号反复试，同样是异常流量。
        record_login_failure(key)
        logger.info('注册被拒（身份核验）：学号=%s 原因=%s ip=%s',
                    payload['student_id'], verdict.reason, client_ip())
        if verdict.reason == GATE_ROSTER_UNAVAILABLE:
            # 这个是服务端自己的问题（名单文件没放对 / 被占着），不是用户填错了什么，
            # 所以回 503 而不是 4xx：前端和监控能一眼分出是谁的责任。
            return jsonify({'code': 503, 'msg': verdict.message}), 503
        return jsonify({
            'code': 409,
            'msg': verdict.message,
            # need_audit 告诉前端「这次被拒是有正经出路的」——
            # 它据此弹出身份审核申请入口。不给这个标记，前端就只能去比对
            # 上面那两句中文提示语，改一个字入口就消失，而且不会报错。
            'need_audit': verdict.reason in GATE_CAN_APPLY_AUDIT,
        }), 409

    conn = get_db()
    try:
        # 判重必须带上「还没注销」这个条件，跟数据库里那部分唯一索引口径一致。
        # 少了它就会出现很气人的情况：注销的账号明明把昵称让出来了，
        # 注册却还是被这句 SELECT 拦住 —— 数据库说能用、代码说不能用。
        # 同一件事在两个地方各判一遍，这种不一致迟早会撞上，所以两边都把条件写全。
        #
        # 这里刻意不查姓名：同名同姓本来就该各注册各的账号（学号不同），
        # 挡住第二个「张伟」没道理，注册人也无法自证自己不是第一个。
        # 真正能唯一标识身份的是学号，唯一性也只留给它和登录用的昵称。
        for column, label in (('nickname', '昵称'), ('student_id', '学号')):
            exists = conn.execute(
                f'SELECT 1 FROM users WHERE {column} = ? AND status != ? LIMIT 1',
                (payload[column], STATUS_CLOSED),
            ).fetchone()
            if exists:
                record_login_failure(key)
                logger.info('注册被拒：%s「%s」已被占用 ip=%s', label, payload[column], client_ip())
                return jsonify({'code': 409, 'msg': f'{label}已被注册，请更换'}), 409
        # 密码哈希放到判重**之后**才算：pbkdf2 一次要三四百毫秒（那正是它防爆破的本钱），
        # 而在身份核验和判重面前，绝大多数被拒的请求根本走不到下面那句 INSERT。
        # 先算再判重的话，每一次「昵称重复」都要白白烧掉这几百毫秒 CPU ——
        # 谁都能拿个重复昵称来刷，等于白送一个拖慢服务的手段。
        password_hash, password_enc = make_password_records(payload['password'])
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
        logger.warning('注册写入冲突（并发下同一昵称/学号被同时注册）ip=%s', client_ip())
        return jsonify({'code': 409, 'msg': '昵称或学号已被注册'}), 409
    finally:
        conn.close()

    if verdict.backfill:
        # 名单里这个学号空着姓名，把他填的补进去 —— 补上的正是名单缺的那一块。
        # 失败不阻断注册：fill_missing_name 内部已经吞掉异常、只记一条 warning。
        # 用户要的结果是账号能用，名单里补没补上这件事不该把它连坐 ——
        # 补不上只表现成「下次有人查这个学号还是没名字」，功能一点不少。
        if not fill_missing_name(payload['student_id'], payload['real_name']):
            logger.info('注册成功，但名单姓名未能回填：学号=%s', payload['student_id'])

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
        return jsonify({'code': 400, 'msg': '请输入学号和密码'}), 400

    key = login_key(identifier)
    locked = login_blocked(key)
    if locked:
        security_event('login_locked', 'identifier=%s 仍在锁定中，剩余 %s 秒' % (identifier[:40], locked))
        return jsonify({'code': 429, 'msg': f'失败次数过多，请 {locked} 秒后再试'}), 429

    conn = get_db()
    fail_reason = ''
    row = None
    try:
        # 登录只认学号。以前写的是「姓名或昵称都可以」，那其实是重名逼出来的妥协：
        # 姓名一旦允许重复，登录框里这句「我是张伟」后面就站着好几个人，
        # 只能挨个拿密码去猜，还得处理「两个人密码恰好也一样」这个死局。
        # 学号是学校发的、唯一且连号，拿它当登录名，上面这些麻烦一次全没了。
        #
        # 格式先校验一遍，不合法就直接按登录失败处理，不拿它去查库：
        # 否则这个接口就成了「哪些学号注册过」的探测工具 ——
        # 填个没注册的学号响应快一点，填个注册过的慢一点，这点差别已经够用了。
        if STUDENT_ID_RE.match(identifier):
            row = conn.execute(
                'SELECT * FROM users WHERE student_id = ? LIMIT 1', (identifier,)).fetchone()
            # 返回给用户的永远是同一句话，避免泄露账号是否存在；
            # 但日志里要记清真实原因，不然后面排查完全抓瞎。这两者必须分开。
            if row is None:
                fail_reason = '账号不存在'
            elif not verify_password(row['password_hash'], password):
                fail_reason = '密码错误'
            elif row['status'] != STATUS_ACTIVE:
                # 对外同样只吐「学号或密码错误」，但日志里必须分清是哪一种，
                # 不然后面有人来问「我密码没打错啊」的时候，完全看不出是账号本身停了。
                fail_reason = '账号已注销' if row['status'] == STATUS_CLOSED else '账号已被禁用'
        else:
            fail_reason = '学号格式不合法'

        if fail_reason:
            record_login_failure(key)
            security_event('login_failed', 'identifier=%s 真实原因=%s' % (identifier[:40], fail_reason))
            return jsonify({'code': 401, 'msg': '学号或密码错误'}), 401
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
    # 退出之后必须再下发一个新令牌，这一条是实测踩出来的：
    # 前端点「退出登录」后并**不会刷新页面**，它手里那个旧令牌已经随着
    # session.clear() 一起作废了；这里不带回去，用户紧接着的「登录 / 注册」
    # 这类写请求会全部 403（日志里是 csrf_failed has_session_token=False），
    # 界面上却只显示一句「请求校验失败，请刷新页面后重试」——
    # 刷新确实能好，但没人知道要刷新。
    # 这和 GET /api/me 未登录也下发 csrf 是同一个口径：匿名会话也该有令牌。
    token = ensure_csrf_token()
    logger.info('用户退出登录 %s ip=%s', who, client_ip())
    return jsonify({'code': 0, 'msg': '已退出登录', 'csrf': token})
