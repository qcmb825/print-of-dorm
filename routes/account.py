"""routes/account.py —— 账号接口：存活检查、当前用户、注册、登录、登出。"""

import sqlite3
import secrets
from flask import Blueprint, g, jsonify, request, session

from config import (ROLE_LABELS, ROLE_SUPER, ROLE_USER, STATUS_ACTIVE, STATUS_CLOSED,
                    STUDENT_ID_RE, logger, public_role, public_role_label)
from db import db_conn
from identity import (GATE_CAN_APPLY_AUDIT, GATE_ROSTER_UNAVAILABLE, check_registration,
                      fill_missing_name)
from security import (
    actor_label,
    clear_login_failures,
    client_ip,
    ensure_csrf_token,
    hit_limit,
    login_blocked,
    login_key,
    make_password_records,
    rate_limited,
    record_login_failure,
    sanitize_log,
    security_event,
    verify_password,
)
from utils import validate_registration

bp = Blueprint('account', __name__)

# 注册频控：同一 IP 在 REGISTER_WINDOW_SECONDS 秒内最多提交 REGISTER_MAX_IN_WINDOW 次注册。
#
# 为什么单开一个计数器、不复用登录那套锁定：
# 1) 两者要数的东西不一样。登录要数的是「密码错了几次」——那是攻击信号；
#    注册要数的是「提交了几次」——正常用户也会因为昵称被占、学号不在名单上而重来。
#    以前把「昵称已被注册」「身份不符」也记成登录失败，等于把用户的手误
#    记进了安全日志，还拿它去锁人。
# 2) 粒度也不一样。登录按「IP + 账号」计数，注册还没有账号可用，只能按 IP；
#    而校园网出口是 NAT，一栋楼共用几个 IP，按登录那套默认的「5 次锁 300 秒」，
#    一个人写错几遍就能把整个出口封掉半小时 —— 被封的人做错了什么？什么都没做。
# 所以这里只做一件事：压住脚本化的批量注册。数字给得宽，
# 一个人一辈子在这系统里注册一次，同一条出口 IP 在开学季连续来十几个新生也碰不到。
REGISTER_WINDOW_SECONDS = 3600
REGISTER_MAX_IN_WINDOW = 20


def _revoke_login_sessions(uid):
    """把某个账号已发出的全部登录态作废，登出时调用。

    做法是让库里的 session_epoch + 1，配合 app.load_current_user 的比对：
    会话里存的是登录那一刻抄下来的快照，库里这个数一变，所有旧 Cookie
    下一次请求就对不上了（前端收到 401，退回登录页）。
    登录态整个存在客户端 Cookie 里，服务端没有一份可以删掉的会话表，
    所以「让旧的失效」只能从库里这个数反向做。

    管理端重置密码也要同样的 +1，但那边的 UPDATE 本来就开着连接、动的是同一行，
    所以直接写在那条语句里，没走这个函数。

    写库失败只记一条 warning、不影响本次响应：登出这件事对当前这台机器已经完成了
    （Cookie 已经清掉），为一次写库失败回 500 只会让人以为没退干净、然后反复点退出。
    但也不能不吭声 —— 那意味着别的设备上的登录态还活着，出问题时日志里得有这个线索。
    """
    with db_conn() as conn:
        try:
            conn.execute('UPDATE users SET session_epoch = session_epoch + 1 WHERE id = ?', (uid,))
            conn.commit()
        except sqlite3.Error as exc:
            logger.warning('吊销登录态失败（本机已退出，其它设备上的登录态可能仍然有效）：'
                           'uid=%s 原因=%s', uid, exc)



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
        with db_conn() as conn:
            conn.execute('SELECT 1').fetchone()
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
    # 收款码只向外说「有没有」和「是哪一版」。版本就是落盘文件名，前端拿它给
    # <img> 当缓存标识 —— 不这么做的话，管理员刚换完码，浏览器还在放旧的，
    # 他会以为上传没生效，然后反复上传。
    pay_qr_file = user.pop('pay_qr_file', None)
    user['has_pay_qr'] = bool(pay_qr_file)
    user['pay_qr_version'] = pay_qr_file or ''
    return jsonify({'code': 0, 'csrf': token, 'user': user})



@bp.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json(silent=True) or {}
    payload, error = validate_registration(data)
    if error:
        # 校验失败只记 DEBUG，用户填错很常见，记 WARNING 会把真正的问题淹了
        logger.debug('注册参数校验不通过：%s ip=%s', error, client_ip())
        return jsonify({'code': 400, 'msg': error}), 400

    # 频控放在字段校验之后：真正要压的是「脚本反复提交注册」，
    # 而连格式都没过的那几次请求在 validate_registration 就返回了，不会走到这里
    # —— 被它记进计数的是提交次数，不是用户的每一次手误。
    # 键只按 IP：注册这一步还没有账号，没有比 IP 更能定位的东西可用。
    key = 'register:' + client_ip()
    if hit_limit(key, REGISTER_MAX_IN_WINDOW, REGISTER_WINDOW_SECONDS):
        return rate_limited('register_rate_limited',
                            '该 IP 在 %s 秒内提交注册超过 %s 次'
                            % (REGISTER_WINDOW_SECONDS, REGISTER_MAX_IN_WINDOW),
                            '注册过于频繁，请稍后再试')

    # 身份核验必须排在下面那一段「判重」之前。用户最该先知道的不是
    # 「这个昵称被人用了」，而是「你这个学号根本不在我们学校的名单里」——
    # 让他先改昵称、再换密码、最后才被告知身份不对，前面那几步全白做了。
    verdict = check_registration(payload['student_id'], payload['real_name'])
    if not verdict.allowed:
        # 这里不再记失败次数：身份不符多数是用户填错了学号 / 名字，
        # 而刷不刷得动由上面的提交次数计数器管着，安全日志这一份要留给人看真正的异常。
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

    with db_conn() as conn:
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
            # 注册即登录，会话里那份 epoch 也得跟库里的对齐，否则下一个请求就被
            # load_current_user 判成「登录态已被吊销」，用户刚注册完立刻被弹回登录页。
            # 读回来而不是直接写 0：默认值多少是数据库那边的约定（建表语句里写着的），
            # 在代码里再抄一遍就是两处真相，哪天默认值变了这边不会报错、只会把人锁在门外。
            epoch = conn.execute('SELECT session_epoch FROM users WHERE id = ?',
                                 (uid,)).fetchone()['session_epoch']
        except sqlite3.IntegrityError:
            conn.rollback()
            logger.warning('注册写入冲突（并发下同一昵称/学号被同时注册）ip=%s', client_ip())
            return jsonify({'code': 409, 'msg': '昵称或学号已被注册'}), 409

    if verdict.backfill:
        # 名单里这个学号空着姓名，把他填的补进去 —— 补上的正是名单缺的那一块。
        # 失败不阻断注册：fill_missing_name 内部已经吞掉异常、只记一条 warning。
        # 用户要的结果是账号能用，名单里补没补上这件事不该把它连坐 ——
        # 补不上只表现成「下次有人查这个学号还是没名字」，功能一点不少。
        if not fill_missing_name(payload['student_id'], payload['real_name']):
            logger.info('注册成功，但名单姓名未能回填：学号=%s', payload['student_id'])

    session.clear()  # 防会话固定攻击，登录前后换个全新的会话
    session['uid'] = uid
    session['epoch'] = epoch  # 登录那一刻的登录态版本，之后靠它判断这条 Cookie 有没有被吊销
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
        security_event('login_locked',
                       'identifier=%s 仍在锁定中，剩余 %s 秒' % (sanitize_log(identifier[:40]), locked))
        return jsonify({'code': 429, 'msg': f'失败次数过多，请 {locked} 秒后再试'}), 429

    # 两个初值提到 with 之前：连接块里的每条分支都靠它们兜底（没命中任何分支时
    # row 是 None、fail_reason 是空串），而 row 在连接关掉之后还要用来写会话。
    fail_reason = ''
    row = None
    with db_conn() as conn:
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
            # identifier 是用户原样提交的（可能是 "学号%0A伪造行" 这种），
            # 进安全日志前先转义，具体理由见 security.sanitize_log
            security_event('login_failed',
                           'identifier=%s 真实原因=%s' % (sanitize_log(identifier[:40]), fail_reason))
            return jsonify({'code': 401, 'msg': '学号或密码错误'}), 401
        conn.execute('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', (row['id'],))
        conn.commit()

    clear_login_failures(key)
    session.clear()  # 防会话固定攻击
    session['uid'] = row['id']
    # 记下「登录那一刻」的登录态版本。之后每个请求拿它和库里的值比对，
    # 对不上就说明这条 Cookie 已经被吊销（本人登出或管理员重置过密码）。
    # 登录时重新抄一份是必须的：管理员重置密码会把库里的值 +1，
    # 不抄的话老用户即使重新登录，会话里揣的还是那个过期的数字，登录成功也被立刻踢出去。
    session['epoch'] = row['session_epoch']
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
        # 收款码的口径也必须和 /api/me 一模一样，否则「登录进来」和「刷新一下」
        # 会得到两个不同的界面（一个显示已传码、一个显示未传）。
        'has_pay_qr': bool(row['pay_qr_file']),
        'pay_qr_version': row['pay_qr_file'] or '',
    }})



@bp.route('/api/logout', methods=['POST'])
def api_logout():
    who = actor_label()  # 必须在清空会话之前取，不然拿不到是谁退出的
    uid = session.get('uid')  # 同理，clear() 之后就问不出来了
    session.clear()
    if uid:
        # 登出不只是「把这台浏览器的 Cookie 清掉」：库里把该账号的版本 +1，
        # 于是这个账号在别处（另一台电脑、之前复制的 Cookie）的所有登录态一起失效。
        # 不这么做的话，登出只影响当前这台设备，别的设备上那条 Cookie 照旧能用 ——
        # 用户「登出」时想的是「账号退出来了」，不是「这一个浏览器退出来了」。
        _revoke_login_sessions(uid)
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
