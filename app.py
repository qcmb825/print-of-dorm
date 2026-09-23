"""app.py —— 应用入口：创建 Flask 应用、注册蓝图与请求钩子、错误处理、启动服务。"""

import os
import sys
import time
import socket
import secrets
from datetime import timedelta
from pathlib import Path
from flask import (Flask, abort, g, jsonify, make_response, render_template,
                   request, send_from_directory, session)
from flask_cors import CORS

from config import (
    ALERT_MAIL_TO,
    ALLOWED_EXTENSIONS,
    BOT_TOKEN,
    CLAIM_ALERT_ENABLED,
    CLAIM_ALERT_MINUTES,
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
    MAIL_FROM,
    MAX_UPLOAD_BYTES,
    MAX_UPLOAD_MB,
    SECRET_KEY,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURITY,
    START_MAX_ATTEMPTS,
    START_RETRY_SECONDS,
    STATUS_ACTIVE,
    UI_MODE,
    UPLOAD_FOLDER,
    _BIND_IN_USE_CODES,
    _BIND_NO_ADDRESS_CODES,
    _BIND_PERMISSION_CODES,
    access_logger,
    env_bool,
    env_int,
    logger,
)
from db import db_conn, ensure_database_directory, init_database, seed_super_admin
from identity import check_roster_schema
from mail import mask_address
from notifier import start_claim_watcher
from pickup_notifier import start_pickup_watcher
from security import actor_label, client_ip, ensure_csrf_token, sanitize_log, security_event

from routes import register_blueprints

# 创建应用
app = Flask(__name__)

app.config['MAX_CONTENT_LENGTH'] = MAX_UPLOAD_BYTES


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
    logger.info('小猫娘打印服务 —— 启动')
    logger.info('  数据文件 : %s', DATABASE_PATH)
    logger.info('  上传目录 : %s', UPLOAD_FOLDER)
    logger.info('  日志目录 : %s', LOG_DIR)
    logger.info('  日志策略 : 级别=%s 单文件上限=%sMB 保留备份=%s 个 控制台=%s 访问日志=%s',
                LOG_LEVEL_NAME, LOG_MAX_BYTES // (1024 * 1024), LOG_BACKUP_COUNT,
                LOG_TO_CONSOLE, LOG_ACCESS)
    logger.info('  允许上传 : %s', '、'.join(sorted(ALLOWED_EXTENSIONS)))
    logger.info('  登录策略 : 连续失败 %s 次锁定 %s 秒；登录态保持 %s 天',
                LOGIN_MAX_FAILS, LOGIN_LOCK_SECONDS, env_int('SESSION_DAYS', 7))
    # 这里写死 'vue' 而不是引 UI_VUE：横幅在模块加载到一半时就被调用，
    # 那时 UI_VUE 还没赋值（它在下面「界面选择」那一段），引它会直接 NameError
    # —— 而且是把整个服务起不来的那种崩。界面版本真要改，两处一起改。
    logger.info('  界面版本 : %s（界面切换已关闭，?ui= 参数不再生效）', 'vue')
    # 这一行只报「配了什么」。「到底开没开」由 notifier.start_claim_watcher()
    # 在真正拉线程那一刻再打一条 —— 横幅是模块加载时执行的，那时线程还没起来。
    # 发件人地址打码，和 mail/recipients.py 里「日志中的邮箱一律打码」保持同一口径。
    if not CLAIM_ALERT_ENABLED:
        logger.info('  邮件提醒 : 已关闭（CLAIM_ALERT_ENABLED=false）')
    elif SMTP_HOST:
        logger.info('  邮件提醒 : SMTP=%s:%s(%s) 发件人=%s 门槛=%s 分钟 固定收件人=%s 个',
                    SMTP_HOST, SMTP_PORT, SMTP_SECURITY,
                    mask_address(MAIL_FROM) if MAIL_FROM else '(未配置)',
                    CLAIM_ALERT_MINUTES, len(ALERT_MAIL_TO))
    else:
        logger.info('  邮件提醒 : 未配置 SMTP_HOST，未接单提醒不会启用')
    logger.info('  调试模式 : %s', DEBUG_MODE)
    if DEBUG_MODE:
        logger.warning('调试模式已开启！该模式会暴露源码并允许执行任意代码，仅供本地开发，'
                       '上线前请把 .env 的 DEBUG 改为 false')
    if not app.config['SESSION_COOKIE_SECURE']:
        logger.info('  会话 Cookie : 未启用 Secure 标记（HTTP 环境正常；接入 HTTPS 后建议设为 true）')

    # 名单库结构自检。放在横幅最后，因为它是唯一一条可能报 error 的 ——
    # 前面全是「配了什么」，读日志的人一眼就能看出这一条不在同一个层级上。
    roster_ok, roster_detail = check_roster_schema()
    if roster_ok is None:
        # 文件就没在：这不算配置错误（本地开发常常不配），但必须说清代价 ——
        # 闸门读不到名单时会一律不放行，也就是**谁都没法注册**。
        logger.warning('  身份名单 : 未配置（%s）；注册闸门将一律拒绝', roster_detail)
    elif roster_ok:
        logger.info('  身份名单 : 结构正常（students 四列齐备）')
    else:
        # ★ 这一条要足够刺眼：结构对不上时，回填姓名那条路径会**静默失败**
        #   （只记 warning、不抛异常），症状是「注册都成功，但名单里的空名字
        #   一个都补不上」。不在这里报出来，就只能等哪天有人手工去查。
        logger.error('  身份名单 : 结构对不上，姓名回填将一直静默失败 —— %s', roster_detail)
        logger.error('  身份名单 : 请用 build_roster_db.py 重新生成名单库，'
                     '或在服务停止后按 EXPECTED_STUDENT_COLUMNS 补齐列')

    logger.info('=' * 62)



ensure_database_directory()

init_database()  # 模块加载时就建好表，gunicorn/waitress 这类部署方式一样生效

seed_super_admin()

log_startup_summary()



# 鉴权 / 会话

# bot 只允许访问 /api/bot/*，也不借用任何真实账号。认证必须排在 CSRF 之前，
# 否则它的写请求会先被浏览器专用的 CSRF 校验挡掉。
@app.before_request
def identify_bot_request():
    """验证 bot 专用 Bearer 令牌，并给后续钩子标记受限的虚拟身份。"""
    g.bot_endpoint = False
    if not request.path.startswith('/api/bot/'):
        return
    if not BOT_TOKEN:
        return jsonify({'code': 503, 'msg': 'QQ Bot 服务未配置'}), 503

    authorization = request.headers.get('Authorization', '')
    scheme, separator, token = authorization.partition(' ')
    token = token.strip()
    #    ⚠️ `compare_digest` 的两个参数都必须是 ASCII 字符串（或 bytes）：
    #    HTTP 头是按 latin-1 解码的，客户端塞一个 ≥0x80 的字节进来就会让它抛
    #    TypeError —— 未认证就能打出一个 500，而且**这条路径不记 bot_auth_failed**
    #    （真实探测不留痕）。所以先自己判 ASCII，非 ASCII 直接当鉴权失败。
    token_ok = bool(token) and token.isascii() and secrets.compare_digest(BOT_TOKEN, token)
    if (not separator or scheme.lower() != 'bearer' or not token_ok):
        security_event('bot_auth_failed', 'path=%s' % request.path)
        return jsonify({'code': 401, 'msg': 'Bot 鉴权失败'}), 401

    g.bot_endpoint = True


# CSRF 校验必须排在「读取登录用户」之前。顺序在这里有实际后果：
# 账号被禁用或注销后，浏览器里那份旧 Cookie 再发写请求时，应该先过安全校验，
# 再到下面那步把无效会话清掉，最后视图给出干净的 401，前端据此回登录页。
# 反过来写就会出现：会话先被清掉、令牌跟着没了，返回的却是一句
# 「请求校验失败，请刷新页面后重试」—— 用户完全看不出真正原因是被停用了。
@app.before_request
def csrf_protect():
    """所有写操作都要带上与会话匹配的 X-CSRF-Token，防止跨站伪造请求（CSRF）。"""
    if g.get('bot_endpoint'):
        return
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
        payload = {'code': 403, 'msg': '请求校验失败，请刷新页面后重试'}
        if not expected:
            # 会话里压根没有令牌，说明前端手里那张票过期了（退出登录后没刷新页面、
            # 会话到期、账号被禁用后会话被清），这不是攻击信号。
            # 补发一张并在响应里标出来，前端据此自动重握手 + 重发一次原请求，
            # 用户不用知道「刷新一下就好」这件事。
            # 只在「本来就没有」时才补发：令牌存在但对不上属于可疑情形，
            # 这时把有效令牌回给请求方，等于替伪造者把门打开。
            payload['csrf'] = ensure_csrf_token()
            payload['reason'] = 'csrf'
        return jsonify(payload), 403



@app.before_request
def load_current_user():
    """每个请求开头把当前登录用户放进 g.user，后面的视图直接用。"""
    g.user = None
    # 静态资源（CSS / JS / 字体 / 图片，Vue 产物也在 /static/app 下）不需要登录态：
    # 它们和请求者是谁毫无关系，模板和前端也不靠 g.user 渲染。
    # 而这里每命中一次就是「开一个连接 + 一次 SELECT users」——
    # 登录状态下刷新一次页面要拉几十个静态文件，等于白跑几十次查库，全是浪费。
    # 认前缀而不是逐条列路径：static 下的文件会随前端构建变来变去，
    # 白名单式的写法迟早漏掉新类型（漏掉不报错，只是每次都多查一次库，没人会发现）。
    if request.path.startswith('/static/'):
        return
    uid = session.get('uid')
    if not uid:
        return
    with db_conn() as conn:
        row = conn.execute('SELECT id, nickname, real_name, student_id, dorm, qq, contact_type, contact, pay_qr_file, role, status, create_time, last_login, session_epoch FROM users WHERE id = ?', (uid,)).fetchone()
    if row is None or row['status'] != STATUS_ACTIVE:
        session.clear()  # 账号被注销、被禁用之后，已登录的 Cookie 立刻失效
        logger.info('会话已失效：uid=%s 账号不存在、已禁用或已注销 ip=%s', uid, client_ip())
        return
    # 会话里那份 epoch 是「登录那一刻」从库里抄下来的快照，和库里现在的值对不上，
    # 就说明这条 Cookie 已经被吊销了：本人登出、管理员重置密码都会把库里的值 +1。
    # 必须这么反向验，因为登录态整个存在客户端 Cookie 里，服务端没有一份可以删掉的会话表。
    # 缺失（session.get 拿到 None）同样按失效处理：这一手之前发出的 Cookie 根本没有这个字段，
    # 顺带就把跨越这次升级的老登录态清干净了，不用另外写一段迁移。
    if session.get('epoch') != row['session_epoch']:
        session.clear()
        logger.info('会话已失效：uid=%s 登录态已被吊销（改密码或退出登录） ip=%s', uid, client_ip())
        return
    who = dict(row)
    # session_epoch 只是服务端记账用的，留在库里比对即可。
    # 不把它 pop 掉的话，它会跟着 g.user 一路进 /api/me 的响应体 ——
    # 多出一个谁也没要求过、前端也用不上的字段，等于悄悄改了对外接口。
    who.pop('session_epoch', None)
    g.user = who



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
        # 整行过一遍转义再落盘：路径（含被解码的 %0A）、query string、UA、反向代理
        # 传来的 X-Forwarded-For 全是外部可控的，任何一个没转义，一条请求就能在
        # access.log 里伪造出若干行看着像真的记录。放在拼完之后统一做，
        # 而不是逐个变量挑着转 —— 以后这行再加字段（比如 referer），也不会漏掉。
        # 日志分级不动：转义只改内容，不改这条记录该记成 ERROR 还是 WARNING。
        message = sanitize_log(message)
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



# 两套前端的标识，同时也是 ?ui= 参数的合法取值。
# 改这两个字符串等于改对外接口（书签、教程里都会写），中途不要重命名。
UI_CLASSIC = 'classic'
UI_VUE = 'vue'
UI_CHOICES = (UI_CLASSIC, UI_VUE)


# 【总开关】界面版本切换目前关掉了，全站只跑新版（vue）。
#
# 关它的原因不是经典版坏了，而是「同时维护两套外壳」这件事本身有代价：
# 每加一个功能（比如这套计费流程、注册时的身份审核）都得写两遍，
# 而漏掉一套不会报错，只会表现成「随机分到老界面的那一半用户点不到这个按钮」
# —— 这种故障得靠用户来报才会发现。先把精力集中在一套上，切换先锁死。
#
# 做成常量而不是「把代码删掉」：删掉之后想找回经典版就得翻提交历史，
# 而这里改一行 True 就全回来了（classic 的那条分支和模板都还在，没动）。
# 顺带看清楚了锁的到底是什么 —— 锁的是「选择」，不是「代码」。
#
# ⚠️ 这一行改 True 之前，先补上下面这些缺口。经典版最后一次跟进新功能是在
#    计费与身份审核之前，所以它现在不认识：
#      · 计费 —— 订单从「待计费」开始、由接单人填金额。老界面里既没有这一档
#        状态、也没有填金额的入口，放出来就是「订单一进来就卡在那儿」；
#      · 身份审核 —— 学号不在名单上时的人工放行通道，老界面的登录页没有入口；
#      · 预设打印 / 纸张规格、大文件分片上传 —— 学生端看不到这两条路；
#      · 账号管理页仍会平铺渲染全站明文密码（新版那边这一列默认关、退出
#        高级视图即清空）。
#    改开关不会有任何报错，这些缺口会直接暴露给用户 —— 所以别只改这一个布尔值。
UI_SWITCH_ENABLED = False

# 界面选择存在这个独立 Cookie 里，刻意不用 Flask 的 session。
# 原因：登录 / 注册 / 登出都会 session.clear()（防会话固定攻击），选择放在 session
# 里会被顺手清掉，用户刚登进来就莫名其妙换了一套界面。
# 不带 Max-Age，浏览器一关就忘 —— 正好等于「每个浏览器会话随机一次」。
UI_COOKIE = 'pod-ui'

# 前端产物目录。Vite 的 outDir 直接指向这里（见 frontend/vite.config.ts），
# 所以后端不需要 Node，也不需要在部署机上构建。
SPA_DIR = Path(app.static_folder or '') / 'app'
SPA_INDEX = SPA_DIR / 'index.html'


def _spa_missing_response():
    """产物不存在时给一句能直接照做的话，而不是丢一个 500 或白屏。"""
    logger.error('前端产物缺失：%s 不存在。请在 frontend/ 目录下执行：'
                 'npm install && npm run build', SPA_INDEX)
    # 用 make_response 包一层，不要直接 return (字符串, 503)。
    # 裸元组在 Flask 里也是合法返回值，但拿到它的调用方就只知道「这是个元组」，
    # 再也改不了响应头 —— _page_response 接下来要 resp.set_cookie，
    # 在元组上会直接 AttributeError，于是本该显示的 503 指引页变成一个 500，
    # 而且只在「部署机忘了 build」这一种情况下出现 —— 恰好是最需要看到那句话的时候。
    return make_response((
        '<!doctype html><meta charset="utf-8"><title>前端产物缺失</title>'
        '<body style="font-family:system-ui;padding:40px;line-height:1.7">'
        '<h1 style="font-size:20px">前端产物缺失</h1>'
        '<p>没有找到 <code>static/app/index.html</code>，页面无法渲染。</p>'
        '<p>构建一次即可：</p>'
        '<pre style="background:#f4f4f4;padding:12px;border-radius:8px">'
        'cd frontend\nnpm install\nnpm run build</pre>'
        '<p>后端接口不受影响，可以先访问 <code>/hello</code> 自检。</p>'
        '</body>'
    ), 503)


def _serve_spa():
    """下发 SPA 外壳：确保会话里有 CSRF 令牌，并禁止缓存入口 HTML。

    带 hash 的静态资源可以长缓存，但入口 HTML 绝不能缓存，
    否则发新版本后用户会一直拿着旧的 index.html 去请求已经不存在的资源。
    """
    ensure_csrf_token()  # 前端启动时还会通过 /api/me 再领一张，这里先垫一张
    if not SPA_INDEX.is_file():
        return _spa_missing_response()
    resp = send_from_directory(SPA_DIR, 'index.html')
    resp.headers['Cache-Control'] = 'no-store, must-revalidate'
    return resp


def _classic_page():
    """下发经典版页面（templates/index.html）。

    模板里有 url_for('static', ...) 生成的资源路径，必须渲染过才能发，
    所以不能像 Vue 那样直接读文件送出去。
    """
    ensure_csrf_token()  # 先把令牌写进会话，页面里的 JS 再从 /api/me 领新的那张
    resp = make_response(render_template('index.html'))
    # 入口页不缓存，理由同 _serve_spa：发新版后别让用户拿着旧页面去找已删除的资源。
    resp.headers['Cache-Control'] = 'no-store, must-revalidate'
    return resp


def _pick_ui():
    """决定这次用哪一套前端，返回 'classic' 或 'vue'。

    切换关掉的时候（UI_SWITCH_ENABLED 为假，当前就是）恒返回 vue，
    后面的三选一逻辑一点都不执行 —— 所以带不带 ?ui=classic 都是新版，
    Cookie 里就算还留着上次的 classic 也不会起作用。

    注意这里**故意不报错也不记日志**：老书签「/?ui=classic」会大量存在，
    每访问一次就写一条日志的话，访问日志两下就被这些废请求刷满，
    真正要看的 4xx 反而被埋了。安静地给新版即可。

    打开的时候，三个来源优先级从高到低，顺序不能调：

    1) URL 参数 ?ui=classic / ?ui=vue —— 临时看另一套，也用来回答
       「是只有我这套有问题，还是两套都这样」。带上就跟着走，不用反复写。
       ?ui=random 是反过来用：不要记住的那套，重新掷一次。

    2) 环境变量 UI_MODE —— 部署时全局定死一套。故意排在参数之后：
       定死了还能用参数临时切回来看另一套，否则只能改配置重启。

    3) 随机 —— 但粒度是「每个会话一次」，不是「每次请求一次」。
       每次请求都重掷的话，用户点一下页面就从一套界面换成另一套，
       连按钮在哪都不认识了，那不叫随机试用，叫故障。
    """
    if not UI_SWITCH_ENABLED:
        return UI_VUE

    wanted = (request.args.get('ui') or '').strip().lower()
    if wanted in UI_CHOICES:
        return wanted
    if wanted == 'random':
        return secrets.choice(UI_CHOICES)
    # 认不出来的值既不报错也不记安全事件：多半是手打错的参数，不值得留痕。

    if UI_MODE in UI_CHOICES:
        return UI_MODE

    remembered = (request.cookies.get(UI_COOKIE) or '').strip().lower()
    if remembered in UI_CHOICES:
        return remembered  # 这个会话已经定过了，保持稳定

    return secrets.choice(UI_CHOICES)


def _page_response():
    """按当前选择返回页面入口。两套界面共用同一套 /api，不同的只是外壳。"""
    ui = _pick_ui()
    resp = _serve_spa() if ui == UI_VUE else _classic_page()
    # 把这次的结果记进 Cookie，浏览器下次会自己带回来，就不用再掷一次。
    #
    # 切换关掉时整段跳过：_pick_ui 已经不看 Cookie 了，
    # 再写进去就是每个响应白多一个 Set-Cookie 头，而且下次改动的人会以为它还在起作用。
    # 已经有 pod-ui 的浏览器也不用管 —— 它不会再被读。
    if UI_SWITCH_ENABLED and (request.cookies.get(UI_COOKIE) or '') != ui:
        resp.set_cookie(UI_COOKIE, ui, httponly=True, samesite='Lax',
                        secure=app.config['SESSION_COOKIE_SECURE'])
    return resp


@app.route('/')
def index():
    """页面入口：按当前选择下发经典版或 Vue 版前端。

    登录页、学生端、管理端都在同一套前端里，由前端按登录账号的角色切换界面，
    所以这里不需要按角色分支，也不用给模板传任何上下文。
    """
    return _page_response()


@app.route('/<path:path>')
def spa_fallback(path):
    """前端路由兜底 —— 少一个这个，刷新页面就会挂。

    Vue 版用的是 history 模式：/upload、/my-orders、/staff/dashboard 这些路径
    只存在于它的路由表里。用户刷新页面、点书签、或者从别的站跳进来时，
    浏览器是真的拿这个路径来请求后端的；没有这条兜底就会返回一个 JSON 404，
    用户看到的是"接口不存在"而不是页面。
    经典版没有 URL 路由（换页只重绘 DOM），这条对它相当于「兜底回首页」。

    带 /api 前缀的路径不在此列 —— 那些是真接口，认不出来就该老实返回 JSON 404。
    """
    if path == 'api' or path.startswith('api/') or path == 'favicon.ico':
        abort(404)
    return _page_response()



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
    security_event('upload_too_large', '请求体超过 %s MB 上限' % MAX_UPLOAD_MB)
    return jsonify({'code': 413, 'msg': '文件太大，单个文件不能超过 %s MB' % MAX_UPLOAD_MB}), 413



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

    # waitress 能不能用，在真正开服务器之前就定下来，而且**必须放在下面那个 try 之外**：
    # 那个 try 顺带接住了 SystemExit（werkzeug 绑定失败时就是直接 sys.exit(1) 退出的），
    # 把这里的退出放进去会被它接住，然后按「端口在启动瞬间被抢占」报一遍 ——
    # 一个「没装 waitress」的问题，日志上却写着端口，排查方向当场就被带偏了。
    serve = None
    if not DEBUG_MODE:
        try:
            # 局部导入，不放到文件顶部：waitress 是生产环境才需要的依赖，
            # 调试模式或本地改代码时不该因为没装它就 import 失败。
            from waitress import serve
        except ImportError:
            # 这里以前是「回退到 Flask 内置服务器」，那条路其实是死的：
            # 文件顶部原本还有一句同样的 from waitress import serve，
            # 真没装 waitress 时模块加载阶段就已经抛 ModuleNotFoundError 了，
            # 根本走不到这个 except。现在顶部那句去掉，这条分支才第一次真的会被执行，
            # 于是得认真对待它 —— 内置服务器是给本地调试用的（单线程、无并发保护），
            # 在非调试模式下悄悄拿它顶生产流量，会比启动即失败更糟：
            # 服务看着是活的，只是慢、连接会排队、超时和 502 会随机出现，
            # 排查时还没人想得到真正的原因是「跑的根本不是 waitress」。
            # 所以这里明确退出，让部署的人立刻看到该装什么。
            logger.error('未安装 waitress。生产模式必须用它启动（Flask 内置服务器'
                         '单线程、无并发保护，不能承载实际流量），'
                         '请执行：pip install waitress（或 pip install -r requirements.txt）')
            sys.exit(1)

    try:
        if DEBUG_MODE:
            logger.info('使用 Flask 开发服务器启动（调试模式开启）：http://%s:%s', host, port)
            _run_dev_server(host, port)
        else:
            logger.info('使用 waitress 生产服务器启动：http://%s:%s（8 线程）', host, port)
            # waitress 出于防伪造，默认会把 X-Forwarded-* 从 WSGI environ 里整个删掉：
            # security.client_ip() 因此读不到 nginx 写进来的真实 IP，全站请求都记成
            # 127.0.0.1。而注册、身份审核那几个限流是**按 IP 记账**的（那时还没有账号，
            # 键只按 IP），全校于是共用一把计数器 —— 迎新季 20 次/小时的注册额度会被
            # 一批新生打满，3 次/小时的审核申请更是一碰就满；日志与安全留痕里的 ip=
            # 也全部失真，等于失去了「谁在做什么」这一维。
            # （登录失败锁定用的是「IP+学号」，不受这条影响。）
            #
            # 信任边界：只信**来自 127.0.0.1 的连接**（应用本身也只监听回环）。开启后
            # waitress 还会顺手净化：按 trusted_proxy_count（默认 1）只取 XFF 的
            # **最右一跳**、丢掉左边那些客户端可能自己填的部分再写回 environ，不在
            # 白名单里的其它 forwarded 头（X-Forwarded-Proto 之类）也一律清除 ——
            # 所以 nginx 那边就算换成追加式写法，伪造的值同样进不来。
            serve(app, host=host, port=port, threads=8,
                  trusted_proxy='127.0.0.1',
                  trusted_proxy_headers={'x-forwarded-for'})
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
    # 两个邮件提醒的守护线程都在这里拉起，**不放模块级**：
    # 放模块级的话，任何一次 import app 都会顺带把它们点着，
    # 而测试脚本、排查工具都会 import 它，里面的练习订单完全可能真的触发发信。
    # 放在这里，就只有「真的被当服务跑起来」时才会有提醒 ——
    # 这也正是这个项目实际的部署方式（python app.py）。
    #
    # 两条线程的职责不重叠：claim-alert 催管理员「有人下单了快去接」，
    # pickup-notify 通知学生「你的单子好了来取」。它们各自扫各自的凭证列
    # （claim_alert_time / ready_notify_time），互不影响。
    start_claim_watcher()
    start_pickup_watcher()
    start_server(os.getenv('HOST', '0.0.0.0'), env_int('PORT', 8080))
