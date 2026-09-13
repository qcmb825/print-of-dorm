"""security.py —— IP/操作者取用、安全事件与审计留痕、密码哈希与可逆加密、CSRF 令牌、登录失败计数。"""

import time
import secrets
from cryptography.fernet import InvalidToken
from flask import g, has_request_context, request, session
from werkzeug.security import check_password_hash, generate_password_hash

from config import FERNET, LOGIN_LOCK_SECONDS, LOGIN_MAX_FAILS, env_bool, logger, security_logger


def client_ip():
    """取客户端 IP。

    前面挂了 Nginx 之类的反代时，真实 IP 在 X-Forwarded-For 里，得把 .env 的 TRUST_PROXY
    设成 true 才会采用它。但这个头客户端可以随便伪造，只有自己完全掌控代理时才该开，
    否则攻击者能伪造 IP，日志就失去意义了。
    没有 HTTP 请求时（比如启动时建超管、以后的定时任务）返回 '-'，那种场合本来就没有客户端。
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
    who = g.get('user')
    if not who:
        return '匿名'
    return '#%s/%s(%s)' % (who['id'], who['nickname'], who['role'])



def security_event(event, detail=''):
    """安全事件的统一出口，写 security.log。

    单独放一个文件是为了让可疑行为不被海量业务日志淹没，以后要接告警或者做审计，盯这一个文件就够。
    """
    try:
        security_logger.warning('event=%s ip=%s user=%s %s', event, client_ip(), actor_label(), detail)
    except Exception:
        # 记日志只是辅助，不能因为写不进去把主流程搞崩；也不能悄悄吞掉，
        # 所以用 logger.exception 把错误本身记下来。
        logger.exception('写安全日志失败 event=%s', event)



def audit_action(action, detail=''):
    """敏感管理动作留痕：改角色、禁用/删除账号、查看明文密码。"""
    try:
        security_logger.info('audit=%s ip=%s user=%s %s', action, client_ip(), actor_label(), detail)
    except Exception:
        logger.exception('写审计日志失败 action=%s', action)

_login_failures = {}



# 密码处理

def make_password_records(password):
    """返回 (哈希, 可逆密文)。

    哈希走 pbkdf2，用来登录校验，不可逆，是真正的安全防线；
    密文走 Fernet，只有超管能在后台查看，密钥在 .env 的 PASSWORD_ENC_KEY。
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
    """解密密码给超管查看，密钥缺失或密文损坏就返回 None。"""
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
    """登录失败计数的键：IP + 账号，避免一个 IP 拖垮所有人，也避免只针对某账号爆破。"""
    return f"{request.remote_addr or '-'}:{(identifier or '').strip().lower()}"



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
