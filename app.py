"""app.py —— 应用入口：创建 Flask 应用、注册蓝图与请求钩子、错误处理、启动服务。"""

import os
import sys
import time
import socket
import secrets
from datetime import timedelta
from flask import Flask, g, jsonify, render_template, request, session
from flask_cors import CORS
from waitress import serve

from config import (
    ALLOWED_EXTENSIONS,
    DATABASE_PATH,
    DEBUG_MODE,
    LOGIN_LOCK_SECONDS,
    LOGIN_MAX_FAILS,
    LOG_ACCESS,
    LOG_BACKUP_COUNT,
    LOG_DIR,
    LOG_LEVEL_NAME,
    LOG_MAX_BYTES,
    LOG_TO_CONSOLE,
    SECRET_KEY,
    START_MAX_ATTEMPTS,
    START_RETRY_SECONDS,
    UPLOAD_FOLDER,
    _BIND_IN_USE_CODES,
    _BIND_NO_ADDRESS_CODES,
    _BIND_PERMISSION_CODES,
    access_logger,
    env_bool,
    env_int,
    logger,
)
from db import ensure_database_directory, get_db, init_database, seed_super_admin
from security import actor_label, client_ip, ensure_csrf_token, security_event

from routes import register_blueprints

# 创建应用
app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = env_int('MAX_UPLOAD_MB', 50) * 1024 * 1024


# 会话安全：HttpOnly 让 JS 读不到 Cookie，SameSite 挡跨站携带，Secure 只在 HTTPS 下开
app.config['SECRET_KEY'] = SECRET_KEY

app.config['SESSION_COOKIE_HTTPONLY'] = True

app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

app.config['SESSION_COOKIE_SECURE'] = env_bool('SESSION_COOKIE_SECURE', False)

app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=env_int('SESSION_DAYS', 7))

app.json.ensure_ascii = False  # 返回中文不转义成 \uXXXX


# 跨域：默认只允许同源。确实要给小程序或别的域名调用时，在 .env 里配 CORS_ORIGINS
_cors_origins = [o.strip() for o in os.getenv('CORS_ORIGINS', '').split(',') if o.strip()]

if _cors_origins:
    CORS(app, origins=_cors_origins, allow_headers=['Content-Type', 'X-CSRF-Token'])



register_blueprints(app)


def log_startup_summary():
    """启动横幅，把关键配置一次性写进日志。

    排查故障先看这一段，能马上确认服务到底读了哪些配置，
    比如 .env 改了却不生效，看一眼这里基本就明白了。
    """
    logger.info('=' * 62)
    logger.info('打印服务 —— 启动')
    logger.info('  数据文件 : %s', DATABASE_PATH)
    logger.info('  上传目录 : %s', UPLOAD_FOLDER)
    logger.info('  日志目录 : %s', LOG_DIR)
    logger.info('  日志策略 : 级别=%s 单文件上限=%sMB 保留备份=%s 个 控制台=%s 访问日志=%s',
                LOG_LEVEL_NAME, LOG_MAX_BYTES // (1024 * 1024), LOG_BACKUP_COUNT,
                LOG_TO_CONSOLE, LOG_ACCESS)
    logger.info('  允许上传 : %s', '、'.join(sorted(ALLOWED_EXTENSIONS)))
    logger.info('  登录策略 : 连续失败 %s 次锁定 %s 秒；登录态保持 %s 天',
                LOGIN_MAX_FAILS, LOGIN_LOCK_SECONDS, env_int('SESSION_DAYS', 7))
    logger.info('  调试模式 : %s', DEBUG_MODE)
    if DEBUG_MODE:
        logger.warning('调试模式已开启！该模式会暴露源码并允许执行任意代码，仅供本地开发，'
                       '上线前请把 .env 的 DEBUG 改为 false')
    if not app.config['SESSION_COOKIE_SECURE']:
        logger.info('  会话 Cookie : 未启用 Secure 标记（HTTP 环境正常；接入 HTTPS 后建议设为 true）')
    logger.info('=' * 62)



ensure_database_directory()

init_database()  # 模块加载时就建好表，gunicorn/waitress 这类部署方式一样生效

seed_super_admin()

log_startup_summary()



# 鉴权 / 会话

@app.before_request
def load_current_user():
    """每个请求开头把当前登录用户放进 g.user，后面的视图直接用。"""
    g.user = None
    uid = session.get('uid')
    if not uid:
        return
    conn = get_db()
    try:
        row = conn.execute('''
            SELECT id, nickname, real_name, student_id, dorm, contact_type, contact,
                   role, status, create_time, last_login
            FROM users WHERE id = ?
        ''', (uid,)).fetchone()
    finally:
        conn.close()
    if row is None or row['status'] != 'active':
        session.clear()  # 账号被删或被禁用后，已登录的 Cookie 立刻失效
        logger.info('会话已失效：uid=%s 账号不存在或已被禁用 ip=%s', uid, client_ip())
        return
    g.user = dict(row)



@app.after_request
def set_security_headers(resp):
    """补几个常见的安全响应头，降低点击劫持、MIME 嗅探的风险。"""
    resp.headers.setdefault('X-Content-Type-Options', 'nosniff')
    resp.headers.setdefault('X-Frame-Options', 'DENY')
    resp.headers.setdefault('Referrer-Policy', 'same-origin')
    return resp



@app.before_request
def record_request_start():
    """记下请求开始时刻，after_request 里用来算耗时。"""
    g.request_start = time.perf_counter()



@app.after_request
def log_request(resp):
    """访问日志，每个请求一行，含状态码、耗时、响应大小、来源 IP 和账号身份。

    按级别写（页面每 10 秒自动刷一次，全按 INFO 记会把日志刷爆）：
    5xx 记 ERROR，服务端出错，要一眼看到；
    4xx 记 WARNING，参数错 / 未登录 / 越权 / 被限流；
    写操作记 INFO，谁改了什么，算业务留痕；
    只读成功记 DEBUG，默认不落盘，要全量排查就把 LOG_LEVEL 改成 DEBUG。
    """
    if not LOG_ACCESS:
        return resp
    try:
        start = g.get('request_start')
        duration_ms = (time.perf_counter() - start) * 1000 if start else -1.0
        query = '?' + request.query_string.decode('utf-8', 'replace') if request.query_string else ''
        size = resp.calculate_content_length()
        message = '%s %s%s -> %s %.1fms size=%s ip=%s user=%s ua="%s"' % (
            request.method,
            request.path,
            query,
            resp.status_code,
            duration_ms,
            size if size is not None else '-',
            client_ip(),
            actor_label(),
            (request.headers.get('User-Agent') or '-')[:120],
        )
        if resp.status_code >= 500:
            access_logger.error(message)
        elif resp.status_code >= 400:
            access_logger.warning(message)
        elif request.method in ('POST', 'PUT', 'PATCH', 'DELETE'):
            access_logger.info(message)
        else:
            access_logger.debug(message)
    except Exception:
        logger.exception('写访问日志失败')  # 记日志本身不能影响正常响应
    return resp



@app.before_request
def csrf_protect():
    """所有写操作都要带上与会话匹配的 X-CSRF-Token，防止跨站伪造请求（CSRF）。"""
    if request.method not in ('POST', 'PUT', 'PATCH', 'DELETE'):
        return
    expected = session.get('csrf')
    sent = request.headers.get('X-CSRF-Token', '')
    if not expected or not sent or not secrets.compare_digest(expected, sent):
        # 令牌对不上一般就两种情况：页面放太久令牌过期，或者有人在跨站伪造请求。
        # 两种都值得记一笔，后者要是密集出现，就是被攻击的信号。
        security_event('csrf_failed',
                       'method=%s path=%s has_session_token=%s has_header_token=%s'
                       % (request.method, request.path, bool(expected), bool(sent)))
        return jsonify({'code': 403, 'msg': '请求校验失败，请刷新页面后重试'}), 403



@app.route('/')
def index():
    ensure_csrf_token()  # 页面一打开就下发 CSRF 令牌，写进会话 Cookie
    return render_template('index.html')



# 统一错误处理

@app.errorhandler(404)
def handle_404(err):
    """访问了不存在的路径。

    正常用户走不到这里（我们自己会把错误处理干净），
    所以密集的 404 通常是有人在扫后台路径，值得留痕。
    favicon.ico 跳过，那是浏览器自动请求的，记了只是噪音。
    """
    if request.path != '/favicon.ico':
        security_event('not_found', '访问了不存在的路径')
    return jsonify({'code': 404, 'msg': '接口不存在'}), 404



@app.errorhandler(413)
def handle_413(err):
    """请求体超过 MAX_CONTENT_LENGTH 上限，多半是有人传了大文件。"""
    limit_mb = app.config['MAX_CONTENT_LENGTH'] // (1024 * 1024)
    security_event('upload_too_large', '请求体超过 %s MB 上限' % limit_mb)
    return jsonify({'code': 413, 'msg': '文件太大，单个文件不能超过 %s MB' % limit_mb}), 413



@app.errorhandler(500)
def handle_500(err):
    """未捕获异常：日志里带完整堆栈，返回给用户的只给不含细节的通用提示。

    这两个必须分开，把堆栈暴露给用户等于免费给攻击者送情报。
    """
    original = getattr(err, 'original_exception', None)
    if original is not None:
        logger.error('未捕获异常：%s %s', request.method, request.path, exc_info=original)
    else:
        logger.error('服务端错误：%s %s', request.method, request.path)
    return jsonify({'code': 500, 'msg': '服务器内部错误，请稍后重试'}), 500



def describe_bind_error(exc):
    """把端口绑定失败翻译成 (原因, [处理建议], 处理方式)。

    处理方式有三种：
      'retry'    瞬时故障，自动重试几次，还失败才放弃；
      'continue' 只提醒，不阻断启动（有些报错其实不影响最终绑定成功）；
      'stop'     确定性问题，把原因和建议说清楚后退出。

    认不出来的错误返回 None，交给上层原样抛出，不能把没见过的问题也一起吞掉，
    否则以后真出了别的故障很难排查。
    """
    code = getattr(exc, 'winerror', None) or getattr(exc, 'errno', None)
    if code in _BIND_PERMISSION_CODES:
        return (
            '端口 {port} 被操作系统拒绝（注意：不是被占用，而是「不允许使用」）',
            [
                '这类拒绝通常来自代理 / VPN / 加速器一类软件（它们会在系统里保留或过滤端口，'
                '本机就装了一块 Wintun 隧道网卡）；',
                '退出那类软件后再启动，一般就恢复正常了；',
                '若反复出现，把 .env 里的 PORT 换成一个不常用的端口（例如 8090）可以彻底绕开；',
                '也可以先看看当前是谁在用这个端口：netstat -ano | findstr :{port}',
            ],
            'retry',
        )
    if code in _BIND_IN_USE_CODES:
        return (
            '端口 {port} 看起来已被占用',
            [
                '很可能已经启动过一个本服务的实例，先在任务管理器里结束多余的 python.exe；',
                '确认占用者：netstat -ano | findstr :{port}',
                '或者把 .env 里的 PORT 换成别的端口。',
            ],
            # 只提醒不阻断：werkzeug 自己开了 SO_REUSEADDR，多数情况还能绑上；
            # 而且刚停掉服务又立刻重启时端口可能还在 TIME_WAIT，也会报这个错，
            # 在这里直接退出会把正常的重启误伤。
            'continue',
        )
    if code in _BIND_NO_ADDRESS_CODES:
        return (
            '要监听的地址 {host} 不是本机的 IP',
            [
                '检查 .env 里的 HOST 是否写成了本机并不存在的地址；',
                '本机开发一般写 0.0.0.0（监听所有网卡）或 127.0.0.1（只允许本机访问）。',
            ],
            'stop',
        )
    return None



def probe_port(host, port):
    """先用普通 socket 试绑端口，成功返回 None，失败返回那个 OSError。

    这里故意不设 SO_REUSEADDR，原因见本段开头实测结论的第二条。
    """
    probe = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        probe.bind((host, port))
        return None
    except OSError as exc:
        return exc
    finally:
        probe.close()



def report_bind_failure(exc, host, port, reason, hints):
    """把失败原因和处理建议一次写清楚，控制台和日志文件都能看到。"""
    logger.error('=' * 62)
    logger.error('启动失败：%s', reason.format(host=host, port=port))
    logger.error('  监听地址：%s:%s', host, port)
    logger.error('  系统原始报错：%s', exc)
    for index, hint in enumerate(hints, 1):
        logger.error('  %s. %s', index, hint.format(host=host, port=port))
    logger.error('=' * 62)



def _run_dev_server(host, port):
    """Flask 内置服务器，只适合本地调试，并发差还有安全限制，生产别用。

    关掉自动重载：重载会 fork 出子进程重复导入本模块，
    结果就是启动横幅打印两遍、日志文件被两个进程同时写。
    """
    app.run(host=host, port=port, debug=DEBUG_MODE, use_reloader=False)



def start_server(host, port):
    """启动服务器，端口不可用时给中文说明，瞬时故障自动重试。"""
    for attempt in range(1, START_MAX_ATTEMPTS + 1):
        exc = probe_port(host, port)
        described = describe_bind_error(exc) if exc is not None else None

        # 端口可用，或者碰到我们没见过的错误，都交给服务器自己处理
        if described is None:
            break

        reason, hints, action = described
        if action == 'continue':
            logger.warning('%s，仍尝试启动（若紧接着出现异常，请检查是否重复启动了实例）',
                           reason.format(host=host, port=port))
            break
        if action == 'retry' and attempt < START_MAX_ATTEMPTS:
            logger.warning('%s，%s 秒后自动重试（第 %s/%s 次）',
                           reason.format(host=host, port=port), START_RETRY_SECONDS,
                           attempt, START_MAX_ATTEMPTS)
            time.sleep(START_RETRY_SECONDS)
            continue
        report_bind_failure(exc, host, port, reason, hints)
        sys.exit(1)

    try:
        if DEBUG_MODE:
            logger.info('使用 Flask 开发服务器启动（调试模式开启）：http://%s:%s', host, port)
            _run_dev_server(host, port)
        else:
            try:
                from waitress import serve
            except ImportError:
                logger.warning('未安装 waitress，已回退到 Flask 内置服务器；生产环境请执行 pip install waitress')
                _run_dev_server(host, port)
            else:
                logger.info('使用 waitress 生产服务器启动：http://%s:%s（8 线程）', host, port)
                serve(app, host=host, port=port, threads=8)
    except (OSError, SystemExit) as exc:
        # 自检通过、真正绑定时仍然失败：属于极小概率的竞争（自检释放端口到服务器绑定
        # 之间被别的程序抢走），这种情况没什么好办法，如实报出来就行。
        # 这里必须连 SystemExit 一起接住，werkzeug 绑定失败时是直接 sys.exit(1) 退出的。
        report_bind_failure(exc, host, port,
                            '端口在启动瞬间被抢占或被拒绝（自检通过之后又被占用）',
                            ['先关掉多余的实例后重试；',
                             '或把 .env 里的 PORT 换成别的端口。'])
        sys.exit(1)



if __name__ == '__main__':
    start_server(os.getenv('HOST', '0.0.0.0'), env_int('PORT', 8080))
