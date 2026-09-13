import os
import re
import sys
import uuid  # 生成唯一的文件名
import time
import errno  # 判断端口绑定失败的类型
import socket  # 启动前检查端口是否可用
import sqlite3
import logging
import secrets
from datetime import datetime, timedelta
from functools import wraps
from logging.handlers import RotatingFileHandler
from pathlib import Path

from flask import Flask, request, jsonify, render_template, session, send_file, g, has_request_context
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from cryptography.fernet import Fernet, InvalidToken


# 环境变量：从 .env 读取，系统里已经存在的优先
def load_env_file(env_file='.env'):
    """把 .env 里的配置读进 os.environ，已经存在的系统环境变量不覆盖（方便在服务器上覆盖）。

    支持 # 注释、空行、export KEY=VALUE 和带引号的值。
    """
    path = Path(env_file)
    if not path.is_absolute():
        path = Path(__file__).resolve().parent / env_file
    if not path.is_file():
        return
    for raw_line in path.read_text(encoding='utf-8-sig').splitlines():
        line = raw_line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        if line.startswith('export '):
            line = line[len('export '):].strip()
        key, _, value = line.partition('=')
        key, value = key.strip(), value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
            value = value[1:-1]
        if key:
            os.environ.setdefault(key, value)


load_env_file()


def env_bool(name, default=False):
    """true/1/yes/on 都当成 True。"""
    return os.getenv(name, str(default)).strip().lower() in ('1', 'true', 'yes', 'on')


def env_int(name, default):
    """读整数型环境变量，值不合法就用默认值。"""
    try:
        return int(os.getenv(name, str(default)).strip())
    except (TypeError, ValueError):
        return default


# 日志
# 控制台给人看，文件留给事后排查，按大小轮转，不会撑爆磁盘。
# 业务 / 访问 / 安全各写一个文件，出事时直接看对应的那个；
# 全混在一起的话，海量请求日志会把关键的安全告警淹掉。
# 控制台强制走 UTF-8，Windows 默认 GBK，中文日志会乱码。
# 访问日志分级：5xx=ERROR、4xx=WARNING、写操作=INFO、只读成功=DEBUG。
# 页面每 10 秒自动刷一次订单，全都按 INFO 记会把日志刷爆。
LOG_LEVEL_NAME = os.getenv('LOG_LEVEL', 'INFO').strip().upper()
LOG_LEVEL = getattr(logging, LOG_LEVEL_NAME, logging.INFO)
LOG_DIR = os.getenv('LOG_DIR', 'logs').strip() or 'logs'
if not os.path.isabs(LOG_DIR):
    LOG_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), LOG_DIR)
LOG_FILE = os.getenv('LOG_FILE', 'app.log').strip() or 'app.log'
LOG_MAX_BYTES = max(64 * 1024, env_int('LOG_MAX_BYTES', 5 * 1024 * 1024))
LOG_BACKUP_COUNT = max(0, env_int('LOG_BACKUP_COUNT', 10))
LOG_TO_CONSOLE = env_bool('LOG_CONSOLE', True)
LOG_ACCESS = env_bool('LOG_ACCESS', True)

LOG_FORMAT = '%(asctime)s.%(msecs)03d [%(levelname)s] %(name)s %(message)s'
LOG_DATEFMT = '%Y-%m-%d %H:%M:%S'

os.makedirs(LOG_DIR, exist_ok=True)

# 控制台转成 UTF-8，不然 Windows 下中文日志是乱码
for _stream in (sys.stdout, sys.stderr):
    try:
        _stream.reconfigure(encoding='utf-8', errors='replace')
    except (AttributeError, ValueError, OSError):
        pass


def _log_formatter():
    return logging.Formatter(LOG_FORMAT, LOG_DATEFMT)


def _console_handler():
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(_log_formatter())
    return handler


def _file_handler(filename, level=logging.NOTSET):
    """按大小轮转：写满 LOG_MAX_BYTES 就换下一个，最多留 LOG_BACKUP_COUNT 个备份。"""
    handler = RotatingFileHandler(
        os.path.join(LOG_DIR, filename),
        maxBytes=LOG_MAX_BYTES,
        backupCount=LOG_BACKUP_COUNT,
        encoding='utf-8',
    )
    handler.setFormatter(_log_formatter())
    if level:
        handler.setLevel(level)
    return handler


def _setup_logger(name, filename, level=None):
    """建一条独立的日志通道：写自己的文件（可选带上控制台），不向 root 传播，避免重复输出。"""
    target = logging.getLogger(name)
    target.setLevel(level or LOG_LEVEL)
    target.propagate = False
    target.handlers.clear()
    target.addHandler(_file_handler(filename))
    if LOG_TO_CONSOLE:
        target.addHandler(_console_handler())
    return target


# 业务日志：注册、登录、下单、接单、改状态、后台管理
logger = _setup_logger('print_service', LOG_FILE)
# 访问日志：每个请求一行，含方法、路径、状态、耗时、来源 IP、账号
access_logger = _setup_logger('print_service.access', 'access.log')
# 安全日志：登录爆破、CSRF 拦截、越权、路径穿越、明文密码被查看
security_logger = _setup_logger('print_service.security', 'security.log')

# root 兜底，别把框架和第三方库的日志（waitress 警告、werkzeug 启动横幅）丢了
_root_logger = logging.getLogger()
_root_logger.setLevel(LOG_LEVEL)
_root_logger.handlers.clear()
_root_logger.addHandler(_file_handler('other.log', level=logging.WARNING))
if LOG_TO_CONSOLE:
    _root_logger.addHandler(_console_handler())


class _DropWerkzeugRequestLines(logging.Filter):
    """过滤掉 werkzeug 自带的一请求一行日志。

    它们一定以双引号开头（比如 "GET /hello HTTP/1.1" 200 -），启动横幅（* Running on ...）不受影响。
    字段更全的访问日志我们已经记了，留着它只是重复刷屏。
    """

    def filter(self, record):
        return not record.getMessage().lstrip().startswith('"')


logging.getLogger('werkzeug').addFilter(_DropWerkzeugRequestLines())


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

# 数据库文件路径，默认放在项目目录下
DATABASE_PATH = os.getenv('DATABASE_PATH', 'print_service.db')
if not os.path.isabs(DATABASE_PATH):
    DATABASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), DATABASE_PATH)

# 上传文件保存路径，目录不存在会自动创建
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'C:/print/print_files/')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


def ensure_database_directory():
    """确保 SQLite 数据库所在目录存在，免得目录缺失导致建库失败。"""
    db_dir = Path(DATABASE_PATH).resolve().parent
    db_dir.mkdir(parents=True, exist_ok=True)

# 允许上传的扩展名白名单，不在名单里的一律拒绝
ALLOWED_EXTENSIONS = {
    ext.strip().lower().lstrip('.')
    for ext in os.getenv('ALLOWED_EXTENSIONS', 'pdf,jpg,jpeg,png,doc,docx').split(',')
    if ext.strip()
}

# 订单状态机
ST_PENDING = '待打印'
ST_PRINTING = '打印中'
ST_READY = '可取了'
ST_DONE = '已取件'
ORDER_STATUSES = (ST_PENDING, ST_PRINTING, ST_READY, ST_DONE)

# 账户角色：普通用户 / 管理员 / 超级管理员
ROLE_USER = 'user'
ROLE_ADMIN = 'admin'
ROLE_SUPER = 'super'
ROLES = (ROLE_USER, ROLE_ADMIN, ROLE_SUPER)
ROLE_LABELS = {ROLE_USER: '普通用户', ROLE_ADMIN: '管理员', ROLE_SUPER: '超级管理员'}

# 注册字段的格式约束。服务端必须校验，前端的只是体验，不能当安全边界
NICKNAME_RE = re.compile(r'^[0-9A-Za-z_\u4e00-\u9fa5]{2,20}$')
REALNAME_RE = re.compile(r'^[\u4e00-\u9fa5A-Za-z·]{2,20}$')
STUDENT_ID_RE = re.compile(r'^\d{4,20}$')

# 联系方式：注册必填，微信 / QQ / 邮箱里选一种
CONTACT_TYPES = ('wechat', 'qq', 'email')
CONTACT_LABELS = {'wechat': '微信号', 'qq': 'QQ 号', 'email': '邮箱地址'}
WECHAT_RE = re.compile(r'^[A-Za-z][A-Za-z0-9_-]{4,19}$')  # 5-20 位，字母开头
QQ_RE = re.compile(r'^[1-9]\d{4,11}$')  # 5-12 位数字，不以 0 开头
EMAIL_RE = re.compile(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')

# 工单（站内信）状态和长度限制
TICKET_OPEN = 'open'
TICKET_CLOSED = 'closed'
TICKET_STATUSES = (TICKET_OPEN, TICKET_CLOSED)
TICKET_MAX_OPEN = 5  # 同一用户同时进行中的工单上限，防止刷屏占满队列
TICKET_SUBJECT_MAX = 60
TICKET_BODY_MAX = 1000

# 公告：字体只能用白名单里的键，前端按同样的键映射成 CSS，两端保持一致
ANNOUNCE_FONTS = ('system', 'songti', 'heiti', 'kaiti', 'mono')
ANNOUNCE_COLOR_RE = re.compile(r'^#[0-9A-Fa-f]{6}$')
ANNOUNCE_CONTENT_MAX = 500

# 密钥
# SECRET_KEY 用来给会话 Cookie 签名。泄露出去别人就能伪造登录态，务必自己配好、别外传
SECRET_KEY = os.getenv('SECRET_KEY', '').strip()
if not SECRET_KEY:
    SECRET_KEY = secrets.token_hex(32)
    logger.warning('未配置 SECRET_KEY，已临时生成；重启后所有登录态会失效，请在 .env 中固定配置')

# PASSWORD_ENC_KEY 用来可逆加密密码（只有超管能查看），必须是合法的 Fernet 密钥
_enc_key = os.getenv('PASSWORD_ENC_KEY', '').strip()
FERNET = None
if _enc_key:
    try:
        FERNET = Fernet(_enc_key.encode())
    except Exception:
        logger.error('PASSWORD_ENC_KEY 不是合法的 Fernet 密钥，超级管理员将无法查看明文密码')
else:
    logger.error('未配置 PASSWORD_ENC_KEY，超级管理员将无法查看明文密码')

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

# 登录失败限制。内存计数只在单进程有效，多进程部署得换成 Redis 之类的共享存储
LOGIN_MAX_FAILS = env_int('LOGIN_MAX_FAILS', 5)
LOGIN_LOCK_SECONDS = env_int('LOGIN_LOCK_SECONDS', 300)
_login_failures = {}

# 调试开关。生产环境必须为 false，调试器会暴露源码，还留了任意代码执行的口子
DEBUG_MODE = env_bool('DEBUG', False)


def get_db():
    """开一个支持按行名访问的 SQLite 连接，调用方记得 close()。"""
    ensure_database_directory()
    conn = sqlite3.connect(DATABASE_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


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


# 数据库结构版本，用来判断是否要做一次性迁移
# 从 v2 升到 v3：新增了联系方式列、工单表和公告表，全是加东西，老数据一概保留
SCHEMA_VERSION = '3'


def init_database():
    """建立 / 升级数据表。

    这次账号体系改造按用户要求：旧订单不迁移。
    判断看 schema_meta 里的 schema_version：
      没有版本标记（全新库或旧库）就先 DROP 掉旧 orders 表，再按新结构重建；
      已有标记就只做 CREATE IF NOT EXISTS，不再清空数据。
    """
    conn = get_db()
    try:
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS schema_meta (key TEXT PRIMARY KEY, value TEXT)')
        row = cursor.execute("SELECT value FROM schema_meta WHERE key = 'schema_version'").fetchone()
        if row is None:
            cursor.execute('DROP TABLE IF EXISTS orders')  # 一次性清掉旧结构

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nickname TEXT NOT NULL UNIQUE COLLATE NOCASE,
                real_name TEXT NOT NULL UNIQUE,
                student_id TEXT NOT NULL UNIQUE,
                dorm TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                password_enc TEXT,
                role TEXT NOT NULL DEFAULT 'user',
                status TEXT NOT NULL DEFAULT 'active',
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                filename TEXT NOT NULL,
                file_path TEXT NOT NULL,
                color_type TEXT,
                duplex TEXT,
                remark TEXT,
                status TEXT DEFAULT '待打印',
                pickup_code TEXT,
                claimed_by INTEGER,
                claim_time TIMESTAMP,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP
            )
        ''')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_claimed ON orders(claimed_by)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)')

        # 这轮新增联系方式，给已有的 users 表补两列。
        # CREATE TABLE IF NOT EXISTS 对已存在的表没有任何改动，老库只能靠 ALTER TABLE；
        # 先用 PRAGMA 查一下现有的列，保证重复执行也安全（幂等）。
        user_columns = {row[1] for row in cursor.execute('PRAGMA table_info(users)').fetchall()}
        if 'contact_type' not in user_columns:
            cursor.execute('ALTER TABLE users ADD COLUMN contact_type TEXT')
        if 'contact' not in user_columns:
            cursor.execute('ALTER TABLE users ADD COLUMN contact TEXT')

        # 工单（站内信）：tickets 是会话，ticket_messages 是会话里的消息。
        # user_read_time / admin_read_time 分别记录双方最后一次已读的时刻，
        # 未读数就是对方发的、且比我上次已读更晚的消息条数，天然支持多个管理员一起处理。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                subject TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'open',
                last_reply_by INTEGER,
                user_read_time TIMESTAMP,
                admin_read_time TIMESTAMP,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ticket_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticket_id INTEGER NOT NULL,
                sender_id INTEGER NOT NULL,
                sender_role TEXT NOT NULL,
                body TEXT NOT NULL,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_ticket_msgs ON ticket_messages(ticket_id)')

        # 公告：同一时间只有一条 is_active=1，历史公告留着方便编辑或回滚。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS announcements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                font_family TEXT NOT NULL DEFAULT 'system',
                font_size INTEGER NOT NULL DEFAULT 15,
                font_color TEXT NOT NULL DEFAULT '#1f2328',
                is_active INTEGER NOT NULL DEFAULT 1,
                created_by INTEGER,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        cursor.execute(
            "INSERT OR REPLACE INTO schema_meta (key, value) VALUES ('schema_version', ?)",
            (SCHEMA_VERSION,),
        )
        conn.commit()
    finally:
        conn.close()


def seed_super_admin():
    """按配置创建内置超级管理员账号，同昵称已存在就跳过，可以放心重复执行。

    判断的是昵称有没有被占用，不是系统里有没有超管。
    这个区别很关键：后者会让新加的内置超管被已有的超管挡住，
    永远建不出来，想换内置超管只能手工改数据库。
    改成按昵称判断之后：新增配置就自动补建，重复启动也不会重复创建（幂等）。
    """
    # 昵称是登录名，必须非空；姓名/学号/宿舍可以留空（数据库里存空字符串）。
    # real_name 和 student_id 都是 UNIQUE 字段，空字符串也算一个值，
    # 所以多个内置超管不能同时留空，第二个会撞唯一约束，日志里会提示。
    nickname = os.getenv('SUPER_ADMIN_NICKNAME', 'superadmin').strip() or 'superadmin'
    real_name = os.getenv('SUPER_ADMIN_REALNAME', '').strip()
    student_id = os.getenv('SUPER_ADMIN_STUDENT_ID', '').strip()
    dorm = os.getenv('SUPER_ADMIN_DORM', '').strip()
    password = os.getenv('SUPER_ADMIN_PASSWORD', '').strip()

    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM users WHERE nickname = ? COLLATE NOCASE',
                        (nickname,)).fetchone():
            return
        if len(password) < 8:
            password = secrets.token_urlsafe(12)
            logger.warning('未配置 SUPER_ADMIN_PASSWORD（或长度不足 8），已随机生成超管「%s」的初始密码：%s',
                           nickname, password)
        password_hash, password_enc = make_password_records(password)
        try:
            cursor = conn.execute('''
                INSERT INTO users (nickname, real_name, student_id, dorm, password_hash, password_enc, role)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (nickname, real_name, student_id, dorm, password_hash, password_enc, ROLE_SUPER))
            conn.commit()
            # 超管账号的创建必须留痕，这是系统里权限最高的那把钥匙
            logger.info('已创建超级管理员账号 #%s：昵称=%s 姓名=%s 学号=%s',
                        cursor.lastrowid, nickname, real_name or '(空)', student_id or '(空)')
            audit_action('create_super_admin', '系统初始化时创建超管 #%s/%s' % (cursor.lastrowid, nickname))
        except sqlite3.IntegrityError:
            logger.error('超级管理员账号创建失败：昵称「%s」/ 姓名「%s」/ 学号「%s」已被占用，'
                         '请修改 .env 中的 SUPER_ADMIN_* 配置（姓名和学号都是唯一字段，'
                         '多个超管不能同时留空）', nickname, real_name, student_id)
    finally:
        conn.close()


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


def login_required(view):
    """要求已登录。"""
    @wraps(view)
    def wrapper(*args, **kwargs):
        if g.get('user') is None:
            return jsonify({'code': 401, 'msg': '请先登录'}), 401
        return view(*args, **kwargs)
    return wrapper


def roles_required(*roles):
    """要求登录且角色在允许列表内。"""
    def decorator(view):
        @wraps(view)
        def wrapper(*args, **kwargs):
            if g.get('user') is None:
                return jsonify({'code': 401, 'msg': '请先登录'}), 401
            if g.user['role'] not in roles:
                # 越权尝试必须留痕，这是攻击者在试探的最典型特征
                security_event('permission_denied',
                               'role=%s need=%s method=%s path=%s'
                               % (g.user['role'], '/'.join(roles), request.method, request.path))
                return jsonify({'code': 403, 'msg': '没有权限执行该操作'}), 403
            return view(*args, **kwargs)
        return wrapper
    return decorator


def ensure_csrf_token():
    """确保会话里有 CSRF 令牌并返回它。"""
    token = session.get('csrf')
    if not token:
        token = secrets.token_urlsafe(32)
        session['csrf'] = token
    return token


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


# 辅助函数

def allowed_file(filename):
    """按白名单校验扩展名，避免上传可执行文件。"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def generate_pickup_code(conn, length=4):
    """生成不重复的数字取件码。"""
    for _ in range(50):
        code = ''.join(secrets.choice('0123456789') for _ in range(length))
        if conn.execute('SELECT 1 FROM orders WHERE pickup_code = ?', (code,)).fetchone() is None:
            return code
    # 数字码极端冲突时退化成短码，保证下单不被卡住
    return uuid.uuid4().hex[:6].upper()


def positive_int(value, default, maximum=None):
    """把查询参数解析成正整数，不合法或超范围就回退。"""
    try:
        result = int(value)
    except (TypeError, ValueError):
        return default
    if result < 1:
        return default
    if maximum is not None:
        result = min(result, maximum)
    return result


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


def validate_registration(data):
    """校验注册字段，返回 (清洗后的字典, 错误信息)，失败时字典为 None。"""
    nickname = (data.get('nickname') or '').strip()
    real_name = (data.get('real_name') or '').strip()
    student_id = (data.get('student_id') or '').strip()
    dorm = (data.get('dorm') or '').strip()
    password = data.get('password') or ''
    confirm = data.get('confirm_password') or ''
    # 联系方式必填：先选类型（微信 / QQ / 邮箱），号码再按对应类型校验格式。
    # 前端也会校验一遍，但那只是让用户少等一次请求，真正的把关必须在后端。
    contact_type = (data.get('contact_type') or '').strip().lower()
    contact = (data.get('contact') or '').strip()

    if not NICKNAME_RE.match(nickname):
        return None, '昵称需为 2-20 位中文、字母、数字或下划线'
    if not REALNAME_RE.match(real_name):
        return None, '姓名需为 2-20 位中文或字母'
    if not STUDENT_ID_RE.match(student_id):
        return None, '学号需为 4-20 位数字'
    if not (2 <= len(dorm) <= 50) or not all(ch.isprintable() for ch in dorm):
        return None, '宿舍位置需为 2-50 个可见字符（请写到门牌号）'
    if contact_type not in CONTACT_TYPES:
        return None, '请选择联系方式类型（微信 / QQ / 邮箱）'
    if not contact:
        return None, '请填写%s' % CONTACT_LABELS[contact_type]
    if len(contact) > 50:
        return None, '联系方式不能超过 50 个字符'
    if contact_type == 'wechat' and not WECHAT_RE.match(contact):
        return None, '微信号需为 5-20 位、以字母开头（可含字母、数字、_ 和 -）'
    if contact_type == 'qq' and not QQ_RE.match(contact):
        return None, 'QQ 号需为 5-12 位数字，且不能以 0 开头'
    if contact_type == 'email' and not EMAIL_RE.match(contact):
        return None, '邮箱格式不正确，例：name@example.com'
    if not (8 <= len(password) <= 64):
        return None, '密码长度需为 8-64 位'
    if not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password):
        return None, '密码需同时包含字母和数字'
    if password != confirm:
        return None, '两次输入的密码不一致'
    if password in (nickname, student_id):
        return None, '密码不能与昵称或学号相同'
    return {
        'nickname': nickname,
        'real_name': real_name,
        'student_id': student_id,
        'dorm': dorm,
        'contact_type': contact_type,
        'contact': contact,
        'password': password,
    }, None

# 接口

# 探活接口，对应 Java 那边的 /hello
@app.route('/hello')
def hello():
    return '打印服务已启动！'


# 账户接口

@app.route('/api/me')
def api_me():
    """前端启动时调，返回当前登录用户和 CSRF 令牌。"""
    token = ensure_csrf_token()
    if g.get('user') is None:
        return jsonify({'code': 401, 'msg': '未登录', 'csrf': token, 'user': None}), 401
    user = dict(g.user)
    user['role_label'] = ROLE_LABELS.get(user['role'], user['role'])
    return jsonify({'code': 0, 'csrf': token, 'user': user})


@app.route('/api/register', methods=['POST'])
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
        for column, label in (('nickname', '昵称'), ('real_name', '姓名'), ('student_id', '学号')):
            exists = conn.execute(
                f'SELECT 1 FROM users WHERE {column} = ? LIMIT 1', (payload[column],)
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
            password_hash, password_enc, ROLE_USER,  # 注册一律是普通用户，管理员只能由超管升级
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
    }})


@app.route('/api/login', methods=['POST'])
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
    try:
        row = conn.execute(
            'SELECT * FROM users WHERE nickname = ? COLLATE NOCASE OR real_name = ? LIMIT 1',
            (identifier, identifier),
        ).fetchone()
        # 返回给用户的永远是同一句话，避免泄露账号是否存在；
        # 但日志里要记清真实原因，不然后面排查完全抓瞎。这两者必须分开。
        if row is None:
            fail_reason = '账号不存在'
        elif not verify_password(row['password_hash'], password):
            fail_reason = '密码错误'
        elif row['status'] != 'active':
            fail_reason = '账号已被禁用'
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
        'role': row['role'], 'role_label': ROLE_LABELS.get(row['role'], row['role']),
    }})


@app.route('/api/logout', methods=['POST'])
def api_logout():
    who = actor_label()  # 必须在清空会话之前取，不然拿不到是谁退出的
    session.clear()
    logger.info('用户退出登录 %s ip=%s', who, client_ip())
    return jsonify({'code': 0, 'msg': '已退出登录'})


@app.route('/api/upload', methods=['POST'])
@login_required
def api_upload():
    # 先收文件和参数，缺参数返回 400 而不是 500
    file = request.files.get('file')
    if file is None or not file.filename:
        return jsonify({'code': 1, 'msg': '请选择要上传的文件'}), 400

    color = request.form.get('color', 'black')
    duplex = request.form.get('duplex', 'single')
    remark = (request.form.get('remark') or '').strip()[:200]  # 备注限长，防止有人塞超长文本
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'

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

    conn = None
    file_size = 0
    try:
        file.save(save_path)
        file_size = os.path.getsize(save_path)
        conn = get_db()
        pickup_code = generate_pickup_code(conn)  # 生成不重复的 4 位取件码
        cursor = conn.execute('''
            INSERT INTO orders (user_id, filename, file_path, color_type, duplex, remark, status, pickup_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (g.user['id'], original_name, save_path, color, duplex, remark, ST_PENDING, pickup_code))
        conn.commit()
        order_id = cursor.lastrowid
    except Exception:
        if conn is not None:
            conn.rollback()
        if os.path.exists(save_path):  # 写库失败就把已保存的文件删掉
            try:
                os.remove(save_path)
            except OSError:
                logger.warning('清理孤儿文件失败: %s', save_path)
        logger.exception('上传订单失败：下单人=%s 文件=%s 落盘路径=%s ip=%s',
                         g.user['nickname'], original_name, save_path, client_ip())
        return jsonify({'code': 1, 'msg': '上传失败，请稍后重试'}), 500
    finally:
        if conn is not None:
            conn.close()

    logger.info('新订单 #%s 下单人=%s 文件=%s 大小=%sKB 类别=%s 单双面=%s 取件码=%s ip=%s',
                order_id, g.user['nickname'], original_name, file_size // 1024,
                color, duplex, pickup_code, client_ip())
    # 只返回订单号和取件码，不暴露服务器绝对路径
    return jsonify({
        'code': 0,
        'msg': '上传成功！订单已记录',
        'order_id': order_id,
        'pickup_code': pickup_code
    })

# 订单列表，管理员和超管可看，支持分页、状态筛选、范围筛选
@app.route('/api/orders')
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
                   o.user_id, o.claimed_by,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.update_time, 'localtime') AS update_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   owner.nickname AS owner_nickname, owner.dorm AS owner_dorm,
                   claimer.nickname AS claimer_nickname
            FROM orders o
            LEFT JOIN users owner ON owner.id = o.user_id
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
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
        # 能不能改状态：超管随便，管理员只限自己接的单
        item['can_manage'] = is_super or item['is_mine']
        orders.append(item)
    return jsonify({'code': 0, 'total': total, 'page': page, 'size': size, 'orders': orders})


# 接单，用原子更新保证同一订单不会被两个人同时接走
@app.route('/api/order/<int:order_id>/claim', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_claim_order(order_id):
    conn = get_db()
    try:
        cursor = conn.execute('''
            UPDATE orders SET claimed_by = ?, claim_time = CURRENT_TIMESTAMP
            WHERE id = ? AND claimed_by IS NULL
        ''', (g.user['id'], order_id))
        if cursor.rowcount == 0:
            conn.rollback()
            row = conn.execute('SELECT claimed_by FROM orders WHERE id = ?', (order_id,)).fetchone()
            if row is None:
                logger.info('接单失败：订单 #%s 不存在，操作人=%s', order_id, g.user['nickname'])
                return jsonify({'code': 404, 'msg': '订单不存在'}), 404
            claimer = conn.execute('SELECT nickname FROM users WHERE id = ?', (row['claimed_by'],)).fetchone()
            name = claimer['nickname'] if claimer else '其他账户'
            # 抢单失败是正常的并发竞争，不算攻击，记 INFO 就行，别滥用安全告警
            logger.info('接单竞争失败：订单 #%s 已被「%s」接取，操作人=%s',
                        order_id, name, g.user['nickname'])
            return jsonify({'code': 409, 'msg': f'手慢了，该订单已被「{name}」接取'}), 409
        conn.commit()
    finally:
        conn.close()
    logger.info('订单 #%s 被 %s(%s) 接取 ip=%s',
                order_id, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '接单成功'})


# 释放订单，接单人本人或超管可用，方便误点后撤回
@app.route('/api/order/<int:order_id>/release', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_release_order(order_id):
    conn = get_db()
    try:
        row = conn.execute('SELECT claimed_by FROM orders WHERE id = ?', (order_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '订单不存在'}), 404
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
        conn.commit()
    finally:
        conn.close()
    logger.info('订单 #%s 被 %s(%s) 释放，原接单人 uid=%s ip=%s',
                order_id, g.user['nickname'], g.user['role'], row['claimed_by'], client_ip())
    return jsonify({'code': 0, 'msg': '已释放订单'})


# 改订单状态，超管可以改任意单，普通管理员只能改自己接的
@app.route('/api/order/<int:order_id>/status', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_update_status(order_id):
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or request.form.get('status') or '').strip()
    if new_status not in ORDER_STATUSES:
        return jsonify({
            'code': 400,
            'msg': '状态不合法，可选：' + '、'.join(ORDER_STATUSES)
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
        conn.execute('''
            UPDATE orders SET status = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?
        ''', (new_status, order_id))
        conn.commit()
    finally:
        conn.close()

    logger.info('订单 #%s 状态「%s」->「%s」 操作人=%s(%s) ip=%s',
                order_id, row['status'], new_status, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': f'订单 {order_id} 已更新为「{new_status}」'})


# 普通用户查自己的订单，只能看到自己的
@app.route('/api/my-orders')
@login_required
def api_my_orders():
    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT o.id, o.filename, o.color_type, o.duplex, o.remark, o.status, o.pickup_code,
                   o.claimed_by,
                   datetime(o.create_time, 'localtime') AS create_time,
                   datetime(o.claim_time, 'localtime') AS claim_time,
                   claimer.nickname AS claimer_nickname
            FROM orders o
            LEFT JOIN users claimer ON claimer.id = o.claimed_by
            WHERE o.user_id = ?
            ORDER BY o.id DESC
        ''', (g.user['id'],)).fetchall()
    finally:
        conn.close()
    return jsonify({'code': 0, 'orders': [dict(row) for row in rows]})


# 下载订单文件，只有接单人和超管可以下
@app.route('/api/order/<int:order_id>/download')
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
    return send_file(file_path, as_attachment=True, download_name=row['filename'])


# 超级管理员接口

# 账号列表，超管看全部，管理员看不到超管也看不到密码
@app.route('/api/admin/users')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_users():
    """账号列表：管理员和超管都能看，但两类敏感信息各自做了收口。

    密码默认不出现在响应里，只有超管显式带 ?with_password=1 才解密，而且强制审计留痕；
    超管账号则是管理员看不到。

    超管账号这条故意放在 SQL 里过滤，不是让前端不渲染：
    前端过滤只是蒙眼睛，数据早就躺在响应体里了，按 F12 看网络请求或者 curl 一把就全看得见，
    等于没隐藏。敏感数据的正确做法是让不该给的人拿都拿不到，而不是给了但指望他不看。
    """
    is_super = g.user['role'] == ROLE_SUPER
    want_password = is_super and request.args.get('with_password') in ('1', 'true', 'yes')

    conn = get_db()
    try:
        # 片段都是代码里写死的常量，值一律走 ? 占位符，这样既没有注入口子，
        # 也不用把整条 SQL 抄两遍。（以后往这条 SQL 里加别的 {} 会和 .format 打架，
        # 到时候改成拼两条完整语句更稳。）
        where, params = '', ()
        if not is_super:
            where, params = 'WHERE u.role != ?', (ROLE_SUPER,)
        rows = conn.execute('''
            SELECT u.id, u.nickname, u.real_name, u.student_id, u.dorm, u.contact_type, u.contact,
                   u.password_enc, u.role, u.status,
                   datetime(u.create_time, 'localtime') AS create_time,
                   datetime(u.last_login, 'localtime') AS last_login,
                   (SELECT COUNT(*) FROM orders o WHERE o.user_id = u.id) AS order_count,
                   (SELECT COUNT(*) FROM orders o WHERE o.claimed_by = u.id) AS claimed_count
            FROM users u
            {where}
            ORDER BY CASE u.role WHEN 'super' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, u.id
        '''.format(where=where), params).fetchall()
    finally:
        conn.close()

    users = []
    for row in rows:
        item = dict(row)
        item.pop('password_enc', None)  # 密文绝不进响应体
        if want_password:
            item['password'] = decrypt_password(row['password_enc']) or '（无法解密）'
        item['role_label'] = ROLE_LABELS.get(item['role'], item['role'])
        users.append(item)

    if want_password:
        # 一次性吐出全部账号的明文密码，是系统里最敏感的操作，必须留痕。
        # 但只记是谁、什么时候、拉了几个账号，绝不记密码本身，日志不能变成第二个泄露源。
        audit_action('view_plaintext_passwords',
                     '拉取全部账号列表 %s 个（含明文密码）' % len(users))
    return jsonify({'code': 0, 'total_users': len(users),
                    'with_password': want_password, 'users': users})


# 升级 / 降级账号角色，超管专属，也不能动超管自己的角色
@app.route('/api/admin/user/<int:user_id>/role', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_set_role(user_id):
    data = request.get_json(silent=True) or {}
    new_role = (data.get('role') or '').strip()
    if new_role not in (ROLE_USER, ROLE_ADMIN):
        return jsonify({'code': 400, 'msg': '只能设置成普通用户或管理员'}), 400
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能修改自己的角色'}), 400

    conn = get_db()
    try:
        target = conn.execute('SELECT role, nickname FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('role_change_denied', '试图修改超管 #%s 的角色' % user_id)
            return jsonify({'code': 403, 'msg': '不能修改超级管理员的角色'}), 403
        conn.execute('UPDATE users SET role = ? WHERE id = ?', (new_role, user_id))
        conn.commit()
    finally:
        conn.close()
    # 提权 / 降权是权限体系的核心动作，必须审计留痕，还要记清改前改后
    audit_action('change_role',
                 '目标 #%s/%s %s -> %s' % (user_id, target['nickname'], target['role'], new_role))
    return jsonify({'code': 0, 'msg': f'已设置为{ROLE_LABELS[new_role]}'})


# 启用 / 禁用账号
@app.route('/api/admin/user/<int:user_id>/status', methods=['PUT'])
@roles_required(ROLE_SUPER)
def api_admin_set_status(user_id):
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or '').strip()
    if new_status not in ('active', 'disabled'):
        return jsonify({'code': 400, 'msg': '状态只能是 active 或 disabled'}), 400
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能禁用自己的账号'}), 400

    conn = get_db()
    try:
        target = conn.execute('SELECT role, nickname, status FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('account_disable_denied', '试图禁用超管 #%s' % user_id)
            return jsonify({'code': 403, 'msg': '不能禁用超级管理员'}), 403
        conn.execute('UPDATE users SET status = ? WHERE id = ?', (new_status, user_id))
        conn.commit()
    finally:
        conn.close()
    audit_action('change_status',
                 '目标 #%s/%s 状态 %s -> %s' % (user_id, target['nickname'], target['status'], new_status))
    return jsonify({'code': 0, 'msg': '已启用' if new_status == 'active' else '已禁用'})


# 删除账号，订单作为业务凭证保留，只解除关联
@app.route('/api/admin/user/<int:user_id>', methods=['DELETE'])
@roles_required(ROLE_SUPER)
def api_admin_delete_user(user_id):
    if user_id == g.user['id']:
        return jsonify({'code': 400, 'msg': '不能删除自己的账号'}), 400

    conn = get_db()
    try:
        target = conn.execute('SELECT role, nickname FROM users WHERE id = ?', (user_id,)).fetchone()
        if target is None:
            return jsonify({'code': 404, 'msg': '账号不存在'}), 404
        if target['role'] == ROLE_SUPER:
            security_event('account_delete_denied', '试图删除超管 #%s' % user_id)
            return jsonify({'code': 403, 'msg': '不能删除超级管理员'}), 403
        conn.execute('UPDATE orders SET user_id = NULL WHERE user_id = ?', (user_id,))
        conn.execute('UPDATE orders SET claimed_by = NULL, claim_time = NULL WHERE claimed_by = ?', (user_id,))
        conn.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
    finally:
        conn.close()
    audit_action('delete_account',
                 '删除账号 #%s/%s，其订单保留但解除关联' % (user_id, target['nickname']))
    return jsonify({'code': 0, 'msg': '账号已删除'})


# 可视化统计数据，管理员和超管都能看，这里只有只读聚合数据，不含敏感字段
@app.route('/api/admin/stats')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_stats():
    # 管理员视角下，超管账号在统计里也必须"不存在"。
    # 否则账号列表显示 3 个、统计却说总数 4，等于变相告诉管理员
    # 还有一个你看不到的账号。挡了列表却漏了数字，等于没挡。
    # 超管看自己的系统要完整口径，不加这个条件。
    role_filter = '' if g.user['role'] == ROLE_SUPER else " AND role != 'super'"

    conn = get_db()
    try:
        # 这几条都涉及账号，统一带上 role_filter；下面订单相关的不涉及角色，不动。
        users_total = conn.execute(
            'SELECT COUNT(*) AS c FROM users WHERE 1 = 1' + role_filter).fetchone()['c']
        users_active = conn.execute(
            "SELECT COUNT(*) AS c FROM users WHERE status = 'active'" + role_filter).fetchone()['c']
        orders_total = conn.execute('SELECT COUNT(*) AS c FROM orders').fetchone()['c']
        claimed = conn.execute('SELECT COUNT(*) AS c FROM orders WHERE claimed_by IS NOT NULL').fetchone()['c']
        new_users_7d = conn.execute(
            "SELECT COUNT(*) AS c FROM users WHERE create_time >= datetime('now', '-6 days')" + role_filter
        ).fetchone()['c']
        role_rows = conn.execute(
            'SELECT role, COUNT(*) AS c FROM users WHERE 1 = 1' + role_filter
            + ' GROUP BY role').fetchall()
        status_rows = conn.execute('SELECT status, COUNT(*) AS c FROM orders GROUP BY status').fetchall()
        color_rows = conn.execute(
            "SELECT COALESCE(color_type, 'black') AS k, COUNT(*) AS c FROM orders GROUP BY k"
        ).fetchall()
        duplex_rows = conn.execute(
            "SELECT COALESCE(duplex, 'single') AS k, COUNT(*) AS c FROM orders GROUP BY k"
        ).fetchall()
        day_rows = conn.execute('''
            SELECT date(create_time, 'localtime') AS d, COUNT(*) AS c
            FROM orders
            WHERE create_time >= datetime('now', '-13 days')
            GROUP BY d ORDER BY d
        ''').fetchall()
        top_claimers = conn.execute('''
            SELECT u.nickname AS nickname, COUNT(*) AS c
            FROM orders o JOIN users u ON u.id = o.claimed_by
            GROUP BY o.claimed_by ORDER BY c DESC LIMIT 5
        ''').fetchall()
    finally:
        conn.close()

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
            'active': users_active,
            'disabled': users_total - users_active,
            'new_7d': new_users_7d,
            'by_role': {r['role']: r['c'] for r in role_rows},
        },
        'orders': {
            'total': orders_total,
            'claimed': claimed,
            'unclaimed': orders_total - claimed,
            'by_status': {r['status']: r['c'] for r in status_rows},
            'by_color': {r['k']: r['c'] for r in color_rows},
            'by_duplex': {r['k']: r['c'] for r in duplex_rows},
        },
        'daily': daily,
        'top_claimers': [dict(r) for r in top_claimers],
    })


# 公告接口

def _parse_announcement(data):
    """校验并清洗公告的内容与样式，返回 (字典, 错误信息)。

    字体只收白名单里的键，不直接存 CSS 字符串，前端怎么渲染由前端决定，
    免得数据库变成能塞任意样式的 CSS 注入入口。
    """
    content = (data.get('content') or '').strip()
    if not content:
        return None, '公告内容不能为空'
    if len(content) > ANNOUNCE_CONTENT_MAX:
        return None, '公告内容不能超过 %s 个字' % ANNOUNCE_CONTENT_MAX

    font_family = (data.get('font_family') or 'system').strip()
    if font_family not in ANNOUNCE_FONTS:
        return None, '字体不在允许范围内'

    try:
        font_size = int(data.get('font_size', 15))
    except (TypeError, ValueError):
        return None, '字号必须是数字'
    if not 12 <= font_size <= 28:
        return None, '字号需在 12-28 之间'

    font_color = (data.get('font_color') or '#1f2328').strip()
    if not ANNOUNCE_COLOR_RE.match(font_color):
        return None, '颜色必须是 #RRGGBB 格式'

    return {
        'content': content,
        'font_family': font_family,
        'font_size': font_size,
        'font_color': font_color.lower(),
    }, None


@app.route('/api/announcement')
@login_required
def api_announcement():
    """前台读当前生效的公告，没有就返回 null，前端据此隐藏公告栏。"""
    conn = get_db()
    try:
        row = conn.execute('''
            SELECT id, content, font_family, font_size, font_color,
                   datetime(update_time, 'localtime') AS update_time
            FROM announcements
            WHERE is_active = 1
            ORDER BY id DESC LIMIT 1
        ''').fetchone()
    finally:
        conn.close()
    return jsonify({'code': 0, 'announcement': dict(row) if row else None})


@app.route('/api/admin/announcements')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_announcements():
    """公告列表，管理员 / 超管可看，含已停用的历史公告，方便编辑和重新启用。"""
    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT a.id, a.content, a.font_family, a.font_size, a.font_color, a.is_active,
                   datetime(a.update_time, 'localtime') AS update_time,
                   u.nickname AS author
            FROM announcements a
            LEFT JOIN users u ON u.id = a.created_by
            ORDER BY a.is_active DESC, a.id DESC
            LIMIT 50
        ''').fetchall()
    finally:
        conn.close()
    return jsonify({'code': 0, 'announcements': [dict(r) for r in rows]})


@app.route('/api/admin/announcements', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_announcement():
    """发布公告，新公告生效时会自动停用旧的，同一时间只悬浮一条。"""
    payload, error = _parse_announcement(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        conn.execute('UPDATE announcements SET is_active = 0 WHERE is_active = 1')
        cursor = conn.execute('''
            INSERT INTO announcements (content, font_family, font_size, font_color, is_active, created_by)
            VALUES (?, ?, ?, ?, 1, ?)
        ''', (payload['content'], payload['font_family'], payload['font_size'],
              payload['font_color'], g.user['id']))
        conn.commit()
        new_id = cursor.lastrowid
    finally:
        conn.close()
    logger.info('发布公告 #%s 操作人=%s(%s) 字号=%s 颜色=%s ip=%s',
                new_id, g.user['nickname'], g.user['role'],
                payload['font_size'], payload['font_color'], client_ip())
    return jsonify({'code': 0, 'msg': '公告已发布', 'id': new_id})


@app.route('/api/admin/announcements/<int:aid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_announcement(aid):
    """改公告内容或样式，不动生效状态。"""
    payload, error = _parse_announcement(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM announcements WHERE id = ?', (aid,)).fetchone() is None:
            return jsonify({'code': 404, 'msg': '公告不存在'}), 404
        conn.execute('''
            UPDATE announcements
            SET content = ?, font_family = ?, font_size = ?, font_color = ?,
                update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payload['content'], payload['font_family'], payload['font_size'],
              payload['font_color'], aid))
        conn.commit()
    finally:
        conn.close()
    logger.info('修改公告 #%s 操作人=%s(%s) ip=%s',
                aid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '公告已更新'})


@app.route('/api/admin/announcements/<int:aid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_announcement(aid):
    """启用 / 停用公告，启用一条时会先停用其它生效中的，保证只有一条悬浮。"""
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM announcements WHERE id = ?', (aid,)).fetchone() is None:
            return jsonify({'code': 404, 'msg': '公告不存在'}), 404
        if active:
            conn.execute('UPDATE announcements SET is_active = 0 WHERE is_active = 1')
        conn.execute('UPDATE announcements SET is_active = ? WHERE id = ?',
                     (1 if active else 0, aid))
        conn.commit()
    finally:
        conn.close()
    logger.info('%s公告 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', aid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})


@app.route('/api/admin/announcements/<int:aid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_announcement(aid):
    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM announcements WHERE id = ?', (aid,)).fetchone() is None:
            return jsonify({'code': 404, 'msg': '公告不存在'}), 404
        conn.execute('DELETE FROM announcements WHERE id = ?', (aid,))
        conn.commit()
    finally:
        conn.close()
    logger.info('删除公告 #%s 操作人=%s(%s) ip=%s',
                aid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '公告已删除'})


# 工单（站内信）接口

def _is_staff(user):
    """管理员和超管统称工单的另一方。"""
    return user['role'] in (ROLE_ADMIN, ROLE_SUPER)


@app.route('/api/tickets')
@login_required
def api_tickets():
    """工单列表：普通用户只看自己的，管理员 / 超管看全部，可按状态筛选。

    未读数是算出来的，不是存出来的：
      用户侧未读 = 对方（管理员）发的、且晚于我上次已读时刻的消息数；
      管理侧未读 = 用户发的、且晚于管理员上次已读时刻的消息数。
    这样多个管理员共用同一个队列时，谁点开就算谁已读，不用各自维护一份标记。
    """
    staff = _is_staff(g.user)
    status = (request.args.get('status') or '').strip()
    conn = get_db()
    try:
        if staff:
            where, params = '', []
            if status in TICKET_STATUSES:
                where, params = 'WHERE t.status = ?', [status]
            rows = conn.execute('''
                SELECT t.id, t.subject, t.status, t.user_id,
                       datetime(t.create_time, 'localtime') AS create_time,
                       datetime(t.update_time, 'localtime') AS update_time,
                       owner.nickname AS owner_nickname,
                       (SELECT COUNT(*) FROM ticket_messages m
                         WHERE m.ticket_id = t.id AND m.sender_role = 'user'
                           AND (t.admin_read_time IS NULL OR m.create_time > t.admin_read_time)) AS unread,
                       (SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id = t.id) AS msg_count,
                       (SELECT m.body FROM ticket_messages m WHERE m.ticket_id = t.id
                         ORDER BY m.id DESC LIMIT 1) AS last_body
                FROM tickets t
                LEFT JOIN users owner ON owner.id = t.user_id
                {where}
                ORDER BY t.update_time DESC, t.id DESC
            '''.format(where=where), params).fetchall()
        else:
            rows = conn.execute('''
                SELECT t.id, t.subject, t.status,
                       datetime(t.create_time, 'localtime') AS create_time,
                       datetime(t.update_time, 'localtime') AS update_time,
                       (SELECT COUNT(*) FROM ticket_messages m
                         WHERE m.ticket_id = t.id AND m.sender_role <> 'user'
                           AND (t.user_read_time IS NULL OR m.create_time > t.user_read_time)) AS unread,
                       (SELECT COUNT(*) FROM ticket_messages m WHERE m.ticket_id = t.id) AS msg_count,
                       (SELECT m.body FROM ticket_messages m WHERE m.ticket_id = t.id
                         ORDER BY m.id DESC LIMIT 1) AS last_body
                FROM tickets t
                WHERE t.user_id = ?
                ORDER BY t.update_time DESC, t.id DESC
            ''', (g.user['id'],)).fetchall()
    finally:
        conn.close()

    tickets = [dict(r) for r in rows]
    return jsonify({
        'code': 0,
        'staff': staff,
        'unread_total': sum(t['unread'] for t in tickets),
        'tickets': tickets,
    })


@app.route('/api/tickets', methods=['POST'])
@login_required
def api_create_ticket():
    """普通用户发起工单，第一条消息（详细描述）同时写进去。"""
    if _is_staff(g.user):
        return jsonify({'code': 403, 'msg': '管理员无需发起工单，直接在工单列表里回复即可'}), 403

    data = request.get_json(silent=True) or {}
    subject = (data.get('subject') or '').strip()
    body = (data.get('body') or '').strip()
    if not (2 <= len(subject) <= TICKET_SUBJECT_MAX):
        return jsonify({'code': 400, 'msg': '标题需为 2-%s 个字' % TICKET_SUBJECT_MAX}), 400
    if not (2 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '内容需为 2-%s 个字' % TICKET_BODY_MAX}), 400

    conn = get_db()
    try:
        open_count = conn.execute(
            "SELECT COUNT(*) AS c FROM tickets WHERE user_id = ? AND status = 'open'",
            (g.user['id'],)).fetchone()['c']
        if open_count >= TICKET_MAX_OPEN:
            # 限流，防止有人拿工单刷屏，把管理员的处理队列占满
            return jsonify({'code': 429,
                            'msg': '你有 %s 个进行中的工单，请等处理完再发起新的' % TICKET_MAX_OPEN}), 429
        cursor = conn.execute(
            "INSERT INTO tickets (user_id, subject, status) VALUES (?, ?, 'open')",
            (g.user['id'], subject))
        tid = cursor.lastrowid
        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (tid, g.user['id'], g.user['role'], body))
        conn.commit()
    finally:
        conn.close()
    logger.info('新工单 #%s 发起人=%s 标题=%s ip=%s',
                tid, g.user['nickname'], subject, client_ip())
    return jsonify({'code': 0, 'msg': '工单已提交，请等待管理员回复', 'id': tid})


@app.route('/api/tickets/<int:tid>')
@login_required
def api_ticket_detail(tid):
    """读工单详情和全部消息，顺便把自己这一侧的已读时间推进到现在。"""
    staff = _is_staff(g.user)
    conn = get_db()
    try:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            # 水平越权：普通用户想翻别人的工单，必须留痕
            security_event('ticket_access_denied',
                           '工单 #%s 属于 uid=%s，访问者=%s' % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权查看该工单'}), 403

        if staff:
            conn.execute('UPDATE tickets SET admin_read_time = CURRENT_TIMESTAMP WHERE id = ?', (tid,))
        else:
            conn.execute('UPDATE tickets SET user_read_time = CURRENT_TIMESTAMP WHERE id = ?', (tid,))
        conn.commit()

        messages = conn.execute('''
            SELECT m.id, m.sender_id, m.sender_role, m.body,
                   datetime(m.create_time, 'localtime') AS create_time,
                   u.nickname AS sender_nickname
            FROM ticket_messages m
            LEFT JOIN users u ON u.id = m.sender_id
            WHERE m.ticket_id = ?
            ORDER BY m.id
        ''', (tid,)).fetchall()
        owner = conn.execute('SELECT nickname FROM users WHERE id = ?',
                             (ticket['user_id'],)).fetchone()
    finally:
        conn.close()

    return jsonify({
        'code': 0,
        'ticket': {
            'id': ticket['id'],
            'subject': ticket['subject'],
            'status': ticket['status'],
            'is_mine': ticket['user_id'] == g.user['id'],
            'owner_nickname': owner['nickname'] if owner else '（账号已注销）',
        },
        'messages': [dict(m) for m in messages],
    })


@app.route('/api/tickets/<int:tid>/messages', methods=['POST'])
@login_required
def api_ticket_reply(tid):
    """回复工单，工单归属人和管理员 / 超管都能回。"""
    staff = _is_staff(g.user)
    data = request.get_json(silent=True) or {}
    body = (data.get('body') or '').strip()
    if not (1 <= len(body) <= TICKET_BODY_MAX):
        return jsonify({'code': 400, 'msg': '回复内容需为 1-%s 个字' % TICKET_BODY_MAX}), 400

    conn = get_db()
    try:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            security_event('ticket_reply_denied',
                           '工单 #%s 属于 uid=%s，回复者=%s' % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权回复该工单'}), 403
        if ticket['status'] == TICKET_CLOSED:
            return jsonify({'code': 400, 'msg': '工单已关闭，请先重新打开'}), 400

        conn.execute('''
            INSERT INTO ticket_messages (ticket_id, sender_id, sender_role, body)
            VALUES (?, ?, ?, ?)
        ''', (tid, g.user['id'], g.user['role'], body))
        # 回复就刷新会话时间，顺手推进自己这一侧的已读时间，免得刚发完还显示未读
        conn.execute('''
            UPDATE tickets
            SET update_time = CURRENT_TIMESTAMP,
                last_reply_by = ?,
                user_read_time = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE user_read_time END,
                admin_read_time = CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE admin_read_time END
            WHERE id = ?
        ''', (g.user['id'], 0 if staff else 1, 1 if staff else 0, tid))
        conn.commit()
    finally:
        conn.close()
    logger.info('工单 #%s 收到回复 回复人=%s(%s) ip=%s',
                tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已发送'})


@app.route('/api/tickets/<int:tid>/status', methods=['PUT'])
@login_required
def api_ticket_status(tid):
    """关闭 / 重新打开工单，工单归属人和管理员 / 超管都能操作。"""
    staff = _is_staff(g.user)
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or '').strip()
    if new_status not in TICKET_STATUSES:
        return jsonify({'code': 400, 'msg': '状态不合法'}), 400

    conn = get_db()
    try:
        ticket = conn.execute('SELECT * FROM tickets WHERE id = ?', (tid,)).fetchone()
        if ticket is None:
            return jsonify({'code': 404, 'msg': '工单不存在'}), 404
        if not staff and ticket['user_id'] != g.user['id']:
            security_event('ticket_status_denied',
                           '工单 #%s 属于 uid=%s，操作者=%s' % (tid, ticket['user_id'], actor_label()))
            return jsonify({'code': 403, 'msg': '无权操作该工单'}), 403
        conn.execute('UPDATE tickets SET status = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?',
                     (new_status, tid))
        conn.commit()
    finally:
        conn.close()
    logger.info('工单 #%s 状态「%s」->「%s」 操作人=%s(%s) ip=%s',
                tid, ticket['status'], new_status, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0,
                    'msg': '工单已关闭' if new_status == TICKET_CLOSED else '工单已重新打开'})


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


# 启动服务
#
# 这里为什么要单独做一段端口自检：
#   werkzeug 内部就把绑定端口的 OSError 吞掉了，只往 stderr 打一句系统原文
#   （Windows 上提示“以一种访问权限不允许的方式做了一个访问套接字的尝试”），
#   紧接着 sys.exit(1)。等错误传到 __main__，只剩一个空壳 SystemExit，错误码已经丢了，
#   用户看到的就只有一句没法下手的系统提示。
#   改成启动前先用普通 socket 自己绑一次端口，只有这一步由我们来做，
#   才拿得到确切的错误码，进而分辨原因、给中文建议、能恢复的就自动重试。
#
# 写这段之前在本机实测（Windows + Python 3.11）的两个结论：
#   端口被别的程序占用是 errno=10048 / winerror=10048，
#   端口被系统拒绝则是 errno=13 / winerror=10013，本次故障就是后一种；
#   自检时不能打开 SO_REUSEADDR：Windows 下开了它，端口即使正被别的进程监听也照样绑成功，
#   就测不出占用了；而被拒绝的情况开不开都一样失败，所以关掉它不影响我们要抓的错误。

# 同一类错误在不同平台编号不同，统一登记在这里方便跨平台判断
_BIND_PERMISSION_CODES = (10013, errno.EACCES, errno.EPERM)  # 端口不允许使用
_BIND_IN_USE_CODES = (10048, errno.EADDRINUSE)  # 端口已被占用
_BIND_NO_ADDRESS_CODES = (10049, errno.EADDRNOTAVAIL)  # 地址不是本机的

# 端口被拒绝多半是本机代理 / 加速器类软件临时占用，过几秒会自己恢复，
# 所以自动重试几次，让人感觉等一下就自己起来了，而不是被一句报错劝退。
START_MAX_ATTEMPTS = max(1, env_int('START_MAX_ATTEMPTS', 3))
START_RETRY_SECONDS = max(1, env_int('START_RETRY_SECONDS', 3))


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
