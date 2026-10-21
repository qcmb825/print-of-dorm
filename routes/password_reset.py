"""routes/password_reset.py —— 忘记密码：学号 → QQ 邮箱验证码 → 换新密码。

为什么单独一个模块、不挂进 account.py：发码 / 限流 / 一次性验证记录 /
让所有旧会话失效，这一整件事自成一条链，读它的人不需要同时读完注册和登录；
而 account.py 已经六百行了。

三条贯穿全文件的纪律：

① **发码接口对外只有一句话**。无论账号不存在、已停用/注销、没填 QQ、QQ 形状不对、
   刚刚才发过一封还是发信失败，响应体一模一样。真实原因只进日志。
   这不是话术问题：只要响应能分出「这号注册过」，这个公开接口就是一台学号探测器，
   而学号是连号的 —— 注册接口那边为同一个理由专门做了判重（routes/account.py）。

② **时间一律 UTC**。库里 create_time / expire_time 是 SQLite 的 CURRENT_TIMESTAMP（UTC），
   比较也全交给 SQL 的 datetime('now')。只要有一处换成 date.today() 或 datetime.now()
   （本地时间，比 UTC 早 8 小时），10 分钟的有效期就会变成 8 小时 10 分钟，
   而且这事不会抛异常、只在半夜悄悄放行。

③ **验证码不落明文**。库里存的是 pbkdf2 哈希；6 位数字总共 100 万种，
   明文落库等于「拿到库就能重置任何人的密码」。同理：新密码和验证码
   一个字都不进日志（日志是被整包拷走排错的东西）。
"""
import secrets
import sqlite3

from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash, generate_password_hash

from config import (PASSWORD_RESET_CODE_DIGITS, PASSWORD_RESET_IP_MAX,
                    PASSWORD_RESET_IP_WINDOW, PASSWORD_RESET_MAX_ATTEMPTS,
                    PASSWORD_RESET_RESEND_SECONDS, PASSWORD_RESET_SID_MAX,
                    PASSWORD_RESET_SID_WINDOW, PASSWORD_RESET_TTL_MINUTES,
                    PASSWORD_RESET_VERIFY_MAX, PASSWORD_RESET_VERIFY_WINDOW,
                    STATUS_ACTIVE, STATUS_CLOSED, logger)
from db import db_conn
# 用别名而不是直接 from mail.password_reset import send_reset_code：
# 调用点必须走**模块属性**（reset_mail.send_reset_code），回归脚本才能打桩
# （打桩改的是模块上的名字，早绑进本模块的本地名是改不到的）。
from mail import password_reset as reset_mail
from mail.recipients import mask_address, qq_mailbox
from security import (audit_action, client_ip, hit_limit, make_password_records,
                      rate_limited, security_event)
import utils as _utils

bp = Blueprint('password_reset', __name__)

# 发码接口唯一的那句话。刻意带上有效期：用户下一步就是去邮箱翻信，
# 他最需要知道的是「这串数字还能用多久」。TTL 走 config，改配置这句话跟着变 ——
# 写死「10 分钟」的话，运维把 TTL 调到 30 分钟后就变成一句假话。
_MSG_SENT = ('如果这个学号绑定了 QQ，验证码已经发到对应的 QQ 邮箱，%d 分钟内有效。'
             % PASSWORD_RESET_TTL_MINUTES)

_MSG_STUDENT_INVALID = '学号格式不正确'
_MSG_EXPIRED = '验证码已过期，请重新获取'
_MSG_TOO_MANY = '验证码错误次数过多，请重新获取'
_MSG_WRONG = '验证码不正确'
_MSG_RESET_OK = '密码已重置，请用新密码重新登录'
_MSG_BUSY = '服务暂时不可用，请稍后再试'


def _payload():
    """请求体 -> dict。非 dict（`[1,2]` 这种）一律当空：`data.get` 会 AttributeError -> 500。

    两个接口都是**公开**的（没登录才需要找回密码），匿名就能打，
    所以「传个 list 就是一次远程 500」这种口子一个都不留。
    """
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else {}


def _text(data, key):
    """取一个字符串字段；不是字符串就当没填（理由同上，别让 int 蹦出 500）。"""
    value = data.get(key)
    return value.strip() if isinstance(value, str) else ''


def _mask_student_id(student_id):
    """日志里的学号只留前 4 位。

    学号是身份信息（连号的，拼得出一整届人的号段），而日志是最容易被整包拷走、
    发给别人排错的东西。前 4 位足够在排查时确认「是不是同一个人在反复试」，
    又拼不出完整学号 —— 与 mail/recipients.mask_address 是同一个取舍。
    """
    student_id = student_id or ''
    return (student_id[:4] + '***') if len(student_id) > 4 else '***'


def _new_code():
    """生成定长纯数字验证码。

    用 secrets 而不是 random：random 是可预测的 Mersenne Twister，
    知道它连续几个输出就能算出下一个「随机数」—— 而这里的随机数就是账号凭证。
    """
    return ''.join(str(secrets.randbelow(10)) for _ in range(PASSWORD_RESET_CODE_DIGITS))


def _pick_user(conn, student_id):
    """按学号找**当前可用的**那个账号，返回 (row, 不可用的原因)。

    一个学号在库里可能有多行：注销（closed）会把昵称/学号/QQ 让出来，
    同一个人重新注册就多了一行。登录接口那句 `WHERE student_id = ? LIMIT 1`
    没写排序，拿到哪一行其实没定义 —— 这里不能跟着含糊：
    先挑 status='active' 的那一行，其余情况只把原因带回日志。
    """
    rows = conn.execute(
        'SELECT id, nickname, qq, status FROM users WHERE student_id = ? ORDER BY id DESC',
        (student_id,)).fetchall()
    for row in rows:
        if row['status'] == STATUS_ACTIVE:
            return row, ''
    if not rows:
        return None, '账号不存在'
    if all(row['status'] == STATUS_CLOSED for row in rows):
        return None, '账号已注销'
    return None, '账号已被停用'


def _recent_reset_exists(conn, user_id):
    """这个账号在「重发间隔」内是否刚发过一条（含已用掉的）。

    `>` 而不是 `>=`：正好卡在边界上那一次应当放行。整段判断交给 SQL 的
    datetime('now','-N seconds')，不在 Python 里算时间差 —— 库里是 UTC，
    Python 的 time.time() 是对的，但下一个改这段的人很容易顺手写成 datetime.now()。
    """
    row = conn.execute(
        "SELECT 1 FROM password_resets WHERE user_id = ? AND create_time > datetime('now', ?) "
        'LIMIT 1',
        (user_id, '-%d seconds' % PASSWORD_RESET_RESEND_SECONDS)).fetchone()
    return row is not None


def _issue_code(student_id, ip):
    """写一条新的验证码记录，返回 (user_row, code, 不支持发送的原因)。

    「原因」非空就代表**什么都没有写库**（除了惰性清理），调用方只记日志、照旧回那句话。
    写库与发信刻意分开：发信要连外网 SMTP，可能卡十几秒，把它放在事务里
    等于让一个账号的行锁着全站等它 —— 而这段时间里同一账号的下一次申请
    会被判成「重发过于频繁」或直接 database is locked。
    """
    with db_conn() as conn:
        row, reason = _pick_user(conn, student_id)
        if row is None:
            return None, None, reason
        if not qq_mailbox(row['qq']):
            # QQ 是注册必填项。走到这里通常是老账号还没补填，或人工改库改坏了 ——
            # 都不能把信发到 `@qq.com` 这种半截地址上去。
            return None, None, '账号 #%s 没有可用的 QQ 号' % row['id']
        if _recent_reset_exists(conn, row['id']):
            return None, None, '重发过于频繁（%s 秒内已发过）' % PASSWORD_RESET_RESEND_SECONDS

        code = _new_code()
        # 只存哈希，且用与登录密码同一套 pbkdf2（不加盐的 sha256 在这里没有意义：
        # 6 位数的空间太小，一张彩虹表 100 万行就穷尽了）。
        code_hash = generate_password_hash(code, method='pbkdf2:sha256', salt_length=16)
        # 同一时刻只允许一个有效码：旧码不置 used 的话，用户点两次「重新发送」后
        # 邮箱里会同时有两串都能用的数字，而界面上只有一个输入框 —— 谁也说不清
        # 哪一串才算数。置 used 之后，最新那封就是唯一的答案。
        conn.execute('UPDATE password_resets SET used = 1 WHERE user_id = ? AND used = 0',
                     (row['id'],))
        # 惰性清理：不单开定时任务（这个项目里没有后台清理线程，也不该为一张小表加一个），
        # 一次发码顺手删掉 24 小时前的旧行。24 小时远大于 TTL，安全审计要看的那几条
        # 都还在；更老的记录留着只会让这张表无限长大。
        conn.execute("DELETE FROM password_resets WHERE create_time < datetime('now', '-1 day')")
        conn.execute(
            "INSERT INTO password_resets (user_id, code_hash, expire_time, request_ip) "
            "VALUES (?, ?, datetime('now', ?), ?)",
            (row['id'], code_hash, '+%d minutes' % PASSWORD_RESET_TTL_MINUTES, ip))
        conn.commit()
    return row, code, ''


@bp.route('/api/password/forgot', methods=['POST'])
def api_password_forgot():
    """发验证码。响应永远是 _MSG_SENT（除非学号形状不合法 / 被限流）。"""
    data = _payload()
    student_id = _text(data, 'student_id')
    error = _utils.password_reset_error(student_id)
    if error:
        return jsonify({'code': 400, 'msg': _MSG_STUDENT_INVALID}), 400

    ip = client_ip()
    # 两把尺子缺一不可：只按 IP 挡不住「换代理刷同一个学号」，
    # 只按学号挡不住「同一 IP 刷一堆学号」。命中时回 429 而不是那句话 ——
    # 限流说明的是「你来得太勤」，与学号存不存在无关，不会被拿去做探测器。
    if hit_limit('pwreset_ip:' + ip, PASSWORD_RESET_IP_MAX, PASSWORD_RESET_IP_WINDOW):
        return rate_limited('password_reset_ip_limit',
                            '学号=%s 发码过于频繁' % _mask_student_id(student_id),
                            '请求过于频繁，请稍后再试')
    if hit_limit('pwreset_sid:' + student_id, PASSWORD_RESET_SID_MAX,
                 PASSWORD_RESET_SID_WINDOW):
        return rate_limited('password_reset_sid_limit',
                            '学号=%s 发码过于频繁' % _mask_student_id(student_id),
                            '该学号申请找回过于频繁，请稍后再试')

    try:
        row, code, reason = _issue_code(student_id, ip)
    except sqlite3.Error:
        # 库出问题也不能在这条链上变成「这台机器上这个学号有点特别」的信号：
        # 回一句能让用户重试的话，真实错误进日志。
        logger.exception('密码找回：写验证码记录失败 学号=%s ip=%s',
                         _mask_student_id(student_id), ip)
        return jsonify({'code': 500, 'msg': _MSG_BUSY}), 500

    if row is None:
        # 「不发信」的每一种原因都只到这里。学号只留前 4 位、不记邮箱。
        logger.info('密码找回：未发信（%s）学号=%s ip=%s',
                    reason, _mask_student_id(student_id), ip)
        return jsonify({'code': 0, 'msg': _MSG_SENT})

    ok, why = reset_mail.send_reset_code(row, code)
    if not ok:
        # 留痕：发信失败是本功能唯一「什么错都没有、用户就是收不到」的故障，
        # 不记事件的话它只会表现成「学生说没收到」，而日志里一片正常。
        security_event('password_reset_mail_failed',
                       '账号 #%s 验证码邮件未发出 原因=%s ip=%s' % (row['id'], why, ip))
        logger.warning('密码找回：验证码邮件未发出 账号 #%s 原因=%s ip=%s', row['id'], why, ip)
    else:
        # 收件地址打码：它能直接推出 QQ 号，而 QQ 号就是这个人。
        logger.info('密码找回：验证码已发出 账号 #%s 收件=%s ip=%s',
                    row['id'], mask_address(qq_mailbox(row['qq'])), ip)
    return jsonify({'code': 0, 'msg': _MSG_SENT})


@bp.route('/api/password/reset', methods=['POST'])
def api_password_reset():
    """验证码 + 新密码 -> 重置。成功后该账号所有旧 Cookie 一起失效。"""
    data = _payload()
    student_id = _text(data, 'student_id')
    code = _text(data, 'code')
    password = data.get('password')
    password = password if isinstance(password, str) else ''

    # 顺序：学号形状 -> 验证码形状 -> 密码强度 -> 限流 -> 查库。
    # 前三条都不碰库，所以「填错了」永远先于「你来得太勤」被说出来 ——
    # 反过来写的话，一个人纠正错别字也会先被限流挡一次。
    error = _utils.password_reset_error(student_id, code, password)
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    ip = client_ip()
    if hit_limit('pwreset_verify:' + ip, PASSWORD_RESET_VERIFY_MAX,
                 PASSWORD_RESET_VERIFY_WINDOW):
        return rate_limited('password_reset_verify_limit',
                            '学号=%s 提交验证码过于频繁' % _mask_student_id(student_id),
                            '尝试过于频繁，请稍后再试')

    try:
        return _apply_reset(student_id, code, password, ip)
    except sqlite3.Error:
        logger.exception('密码找回：重置写入失败 学号=%s ip=%s',
                         _mask_student_id(student_id), ip)
        return jsonify({'code': 500, 'msg': _MSG_BUSY}), 500


def _apply_reset(student_id, code, password, ip):
    """真正的验码 + 改密码。拆出来只为让上面那个视图能把 sqlite3.Error 收成 500。"""
    with db_conn() as conn:
        row, reason = _pick_user(conn, student_id)
        if row is None:
            # 停用/注销/不存在的账号对外一律「验证码已过期」：那句话成立
            # （确实没有可用的验证码给你用），又不透露账号状态。
            logger.info('密码找回：重置被拒（%s）学号=%s ip=%s',
                        reason, _mask_student_id(student_id), ip)
            return jsonify({'code': 400, 'msg': _MSG_EXPIRED}), 400

        # 库里的昵称拿到之后补一次密码校验：「密码不能与昵称相同」这条规则
        # 在 utils.password_error 里，而昵称只有库里才有（请求体里没有它）。
        error = _utils.password_error(password, row['nickname'] or '', student_id)
        if error:
            return jsonify({'code': 400, 'msg': error}), 400

        # 取「最近一条未用且未过期」的。过期判断交给 SQL：两端都是 UTC 的
        # 'YYYY-MM-DD HH:MM:SS' 字符串，字典序即时间序。
        record = conn.execute(
            'SELECT id, code_hash, attempts FROM password_resets '
            'WHERE user_id = ? AND used = 0 AND expire_time > CURRENT_TIMESTAMP '
            'ORDER BY id DESC LIMIT 1', (row['id'],)).fetchone()
        if record is None:
            # 三种情况走到这里：从来没申请过、码已经过期、码已经被用掉。
            # 对外是同一句话（它们对用户的意义相同：重发一个），
            # 但日志里要能看出是这一种，而不是「账号不存在」那一种。
            logger.info('密码找回：重置被拒（没有未用且未过期的验证码）账号 #%s ip=%s',
                        row['id'], ip)
            return jsonify({'code': 400, 'msg': _MSG_EXPIRED}), 400

        if record['attempts'] >= PASSWORD_RESET_MAX_ATTEMPTS:
            # 到上限就把这条作废：留着它等于留一个「继续试」的接口，
            # 而用户真正该做的事是重新申请一个新码。
            conn.execute('UPDATE password_resets SET used = 1 WHERE id = ?', (record['id'],))
            conn.commit()
            security_event('password_reset_attempts_exceeded',
                           '账号 #%s 验证码错误次数到上限 ip=%s' % (row['id'], ip))
            return jsonify({'code': 400, 'msg': _MSG_TOO_MANY}), 400

        if not check_password_hash(record['code_hash'], code):
            # attempts 用 SQL 里的 +1 而不是「先读出来加一再写回」：
            # 后者在并发下会丢计数，而这里计的就是「还能试几次」——
            # 丢一次就是白送一次猜测机会。
            conn.execute('UPDATE password_resets SET attempts = attempts + 1 WHERE id = ?',
                         (record['id'],))
            conn.commit()
            logger.info('密码找回：验证码不正确 账号 #%s 已错 %s 次 ip=%s',
                        row['id'], record['attempts'] + 1, ip)
            return jsonify({'code': 400, 'msg': _MSG_WRONG}), 400

        # 先抢这条记录再改密码：`AND used = 0` 让「同一个码用第二次」在
        # 并发下也只能有一个赢家（rowcount=0 说明别人刚用掉了）。
        consumed = conn.execute('UPDATE password_resets SET used = 1 WHERE id = ? AND used = 0',
                               (record['id'],))
        if consumed.rowcount == 0:
            conn.rollback()
            return jsonify({'code': 400, 'msg': _MSG_EXPIRED}), 400

        # 同一个事务里做三件事：换密码、吊销全部旧会话、把这条验证记录作废。
        # session_epoch + 1 是这个项目吊销登录态的唯一手段（会话整个存在浏览器
        # Cookie 里，服务端没有可删的会话表，见 routes/account.py 的 _revoke_login_sessions），
        # 少了它，重置完密码后别人手里那条旧 Cookie 还能继续用 ——
        # 而「我改了密码」这句话的全部意义就在于把别人踢出去。
        password_hash, password_enc = make_password_records(password)
        conn.execute(
            'UPDATE users SET password_hash = ?, password_enc = ?, '
            'session_epoch = session_epoch + 1 WHERE id = ?',
            (password_hash, password_enc, row['id']))
        conn.commit()

    # 留痕里**不记密码、不记验证码**：审计日志的读者是后来的人，
    # 他们要知道的是「谁在什么时候用哪条路改了密码」，不是改成了什么。
    audit_action('password_reset', '账号 #%s 通过 QQ 邮箱验证码重置了密码' % row['id'])
    # 日志里同样不写学号全称（前 4 位够了），也不写任何与密码/验证码有关的字。
    logger.info('密码找回：密码已重置 账号 #%s 学号=%s ip=%s',
                row['id'], _mask_student_id(student_id), ip)
    return jsonify({'code': 0, 'msg': _MSG_RESET_OK})
