"""security.py —— IP/操作者取用、安全事件与审计留痕、密码哈希与可逆加密、CSRF 令牌、登录失败计数。"""

import time
import secrets
from cryptography.fernet import InvalidToken
from flask import g, has_request_context, jsonify, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from config import FERNET, LOGIN_LOCK_SECONDS, LOGIN_MAX_FAILS, env_bool, logger, security_logger


def client_ip():
    """取客户端 IP。

    前面挂了 Nginx 之类的反代时，真实 IP 在 X-Forwarded-For 里，得把 .env 的 TRUST_PROXY
    设成 true 才会采用它。但这个头客户端可以随便伪造，只有自己完全掌控代理时才该开，
    否则攻击者能伪造 IP，日志就失去意义了。
    没有 HTTP 请求时（比如启动时初始化内置账号、以后的定时任务）返回 '-'，那种场合本来就没有客户端。
    """
    if not has_request_context():
        return '-'
    if env_bool('TRUST_PROXY', False):
        forwarded = request.headers.get('X-Forwarded-For', '')
        if forwarded:
            return forwarded.split(',')[0].strip() or '-'
    return request.remote_addr or '-'



def actor_label():
    """当前请求的操作者标签，比如 #3/bob(admin)，没登录时是 "匿名"。

    没有 HTTP 请求时返回 'system'（系统自己发起的动作），和 "匿名"（有请求但没登录）
    区分开，否则启动日志会看着像有人在操作。
    """
    if not has_request_context():
        return 'system'
    if g.get('bot_endpoint'):
        return 'qqbot'
    who = g.get('user')
    if not who:
        return '匿名'
    return '#%s/%s(%s)' % (who['id'], who['nickname'], who['role'])



def sanitize_log(value):
    """把要写进日志的动态值里的控制字符转成可见的转义写法。

    为什么非做不可：query string、路径、UA、昵称、学号这些都是外部输入，而它们进日志之前
    会先被 URL 解码 / 表单解码，%0A、%0D、%09 各自变成真换行和制表符。日志是按行读的，
    一条请求里塞几个 %0A，就能在 access.log / security.log 里凭空造出好几行
    看起来完全正常的记录（比如伪造一条「某 IP 登录失败」）—— 事后翻日志的人
    没有任何办法分辨哪几行是真的。安全日志尤其经不起这个：它就一个文件的体量，
    伪造进去的假线索足够把真正的线索盖掉。

    只动控制字符，不截断、不改写别的字符，所以日志原有的 key=value 结构
    （包括调用方自己用 %s 拼出来的中文字段）保持不变；信息一点没少，
    只是换成了 \n 这种一眼能看出「这里有人塞了换行」的写法。
    """
    if value is None:
        return '-'
    text = value if isinstance(value, str) else str(value)
    pieces = []
    for ch in text:
        if ch == '\n':
            pieces.append('\\n')
        elif ch == '\r':
            pieces.append('\\r')
        elif ch == '\t':
            pieces.append('\\t')
        elif ch < ' ' or ch == '\x7f':  # 其余不可打印字符（含垂直制表、退格）统一走 \xNN
            pieces.append('\\x%02x' % ord(ch))
        else:
            pieces.append(ch)
    return ''.join(pieces)



def security_event(event, detail=''):
    """安全事件的统一出口，写 security.log。

    单独放一个文件是为了让可疑行为不被海量业务日志淹没，以后要接告警或者做审计，盯这一个文件就够。

    event 与 detail 里的动态部分一律过 sanitize_log：调用方有二十几处，要求每一处自己记得
    转义是不现实的（漏一处就等于没做），放这里收口最稳。
    """
    try:
        security_logger.warning('event=%s ip=%s user=%s %s', sanitize_log(event),
                                sanitize_log(client_ip()), sanitize_log(actor_label()),
                                sanitize_log(detail))
    except Exception:
        # 记日志只是辅助，不能因为写不进去把主流程搞崩；也不能悄悄吞掉，
        # 所以用 logger.exception 把错误本身记下来。
        logger.exception('写安全日志失败 event=%s', event)



def audit_action(action, detail=''):
    """敏感管理动作留痕：改角色、禁用/注销账号、查看明文密码。

    注销也记账，而且记的是「注销」而不是「删除」——
    数据一条没少，说成删除会让后来翻日志的人以为得去备份里找。
    detail 里常带昵称等用户自己起的内容，同样要转义，理由见 sanitize_log。
    """
    try:
        security_logger.info('audit=%s ip=%s user=%s %s', sanitize_log(action),
                             sanitize_log(client_ip()), sanitize_log(actor_label()),
                             sanitize_log(detail))
    except Exception:
        logger.exception('写审计日志失败 action=%s', action)

_login_failures = {}



# 密码处理

def make_password_records(password):
    """返回 (哈希, 可逆密文)。

    哈希走 pbkdf2，用来登录校验，不可逆，是真正的安全防线；
    密文走 Fernet，供管理端查看，密钥在 .env 的 PASSWORD_ENC_KEY。
    """
    password_hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=16)
    password_enc = None
    if FERNET is not None:
        try:
            password_enc = FERNET.encrypt(password.encode('utf-8')).decode('ascii')
        except Exception:
            logger.exception('密码可逆加密失败，本次仅保存哈希')
    return password_hash, password_enc



def verify_password(password_hash, password):
    """校验密码。任何异常都返回 False，绝不往外抛 500。"""
    if not password_hash:
        return False
    try:
        return check_password_hash(password_hash, password)
    except Exception:
        logger.exception('密码校验异常')
        return False



def decrypt_password(password_enc):
    """解密密码供管理端查看，密钥缺失或密文损坏就返回 None。"""
    if not password_enc or FERNET is None:
        return None
    try:
        return FERNET.decrypt(password_enc.encode('ascii')).decode('utf-8')
    except (InvalidToken, ValueError, TypeError):
        return None



def ensure_csrf_token():
    """确保会话里有 CSRF 令牌并返回它。"""
    token = session.get('csrf')
    if not token:
        token = secrets.token_urlsafe(32)
        session['csrf'] = token
    return token



def login_key(identifier):
    """登录失败计数的键：IP + 账号，避免一个 IP 拖垮所有人，也避免只针对某账号爆破。

    取 IP 统一走 client_ip()：开了 TRUST_PROXY 之后，如果这里还直接用 remote_addr，
    计数用的是代理地址、日志里记的却是真实地址，两边对不上；更难受的是反代场景下
    所有人都共用同一个代理 IP，别人试错会把你一起锁在门外。
    """
    return '%s:%s' % (client_ip(), (identifier or '').strip().lower())



def login_blocked(key):
    """返回剩余锁定秒数，没被锁就返回 0。"""
    entry = _login_failures.get(key)
    if not entry:
        return 0
    _, _, lock_until = entry
    return int(lock_until - time.monotonic()) + 1 if lock_until and time.monotonic() < lock_until else 0



def record_login_failure(key):
    """记一次失败，到阈值就锁一段时间。"""
    now = time.monotonic()
    count, first_ts, _ = _login_failures.get(key, (0, now, 0))
    if now - first_ts > LOGIN_LOCK_SECONDS:  # 超出统计窗口，重新计数
        count, first_ts = 0, now
    count += 1
    lock_until = now + LOGIN_LOCK_SECONDS if count >= LOGIN_MAX_FAILS else 0
    _login_failures[key] = (count, first_ts, lock_until)
    if len(_login_failures) > 5000:  # 简单清理一下，避免字典无限增长
        for k, (_, ts, _) in list(_login_failures.items()):
            if now - ts > LOGIN_LOCK_SECONDS * 4:
                _login_failures.pop(k, None)



def clear_login_failures(key):
    _login_failures.pop(key, None)



_hits = {}



def hit_limit(key, limit, window_seconds):
    """通用限流：在 window_seconds 秒内第 limit 次之外再来的就返回 True。

    和登录失败计数一样放在内存里。本服务是单进程的 waitress，这点完全够用；
    重启就清空也无所谓 —— 它挡的是手抖连点和刷量，不是需要长期准确的账。
    """
    now = time.monotonic()
    recent = [ts for ts in _hits.get(key, ()) if now - ts < window_seconds]
    recent.append(now)
    _hits[key] = recent
    if len(_hits) > 5000:  # 键太多了就顺带扫一遍，把窗口早已过期的清掉
        for k, stamps in list(_hits.items()):
            if all(now - ts >= window_seconds for ts in stamps):
                _hits.pop(k, None)
    return len(recent) > limit



def rate_limited(event, detail, msg):
    """限流撞线之后的统一动作：记一条安全事件，再回一个 code=429。

    调用方仍然自己判 hit_limit(...)：键名、阈值、窗口是各接口自己的口径
    （按账号、按 IP、按分片片数），收进这里只会变成一个参数更多的中转函数，
    还会把「哪个接口用哪把尺子」藏到看不见的地方。
    真正收掉的是后面那两步 ——「写 security_event + 回 429」。
    原先每个调用点各写一遍，漏掉 security_event 的那一处不会有任何报错，
    只是那类刷量再也不会出现在安全日志里；而安全日志正是为它们准备的
    （见 security_event 的说明），所以宁可让这两步永远绑在一起。

    返回的是完整的 (响应, 429)，调用方直接 `return rate_limited(...)` 即可。
    """
    security_event(event, detail)
    return jsonify({'code': 429, 'msg': msg}), 429
