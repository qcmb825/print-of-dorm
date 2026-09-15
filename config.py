"""config.py —— 环境变量加载、日志搭建与全部配置常量。最底层的叶子模块，不依赖任何本项目其它模块。"""

import os
import re
import sys
import errno
import logging
import secrets
from cryptography.fernet import Fernet
from logging.handlers import RotatingFileHandler
from pathlib import Path


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


# 数据库文件路径，默认放在项目目录下
DATABASE_PATH = os.getenv('DATABASE_PATH', 'print_service.db')

if not os.path.isabs(DATABASE_PATH):
    DATABASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), DATABASE_PATH)


# 上传文件保存路径，目录不存在会自动创建
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'C:/print/print_files/')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


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


# 账户角色
ROLE_USER = 'user'

ROLE_ADMIN = 'admin'

ROLE_SUPER = 'super'

ROLES = (ROLE_USER, ROLE_ADMIN, ROLE_SUPER)

# 中文名：只在写日志、做审计、排查故障时用，要求能精确到是哪一类账号。
ROLE_LABELS = {ROLE_USER: '普通用户', ROLE_ADMIN: '管理员', ROLE_SUPER: '管理端'}


# ---- 对外角色口径 ----
# 返回给浏览器的响应里，角色一律用下面这套收敛过的值：
#   role     — 只有 user / admin 两种，界面按它渲染；
#   advanced — 一个布尔值，表示这个账号的界面要不要多一个高级视图入口。
# 收敛的意义在于：界面按角色分支的地方越少，不同账号看到的界面差异就越小。
#
# 关键点：这里换的是「标签」，不是「闸门」——
# 鉴权读的始终是库里存着的真实角色（auth.roles_required 直接看 g.user['role']，
# 不经过这个函数），所以对外叫什么名字，跟谁能做什么事毫无关系。
PUBLIC_ROLE = {ROLE_SUPER: ROLE_ADMIN}

PUBLIC_ROLE_LABELS = {ROLE_USER: '普通用户', ROLE_ADMIN: '管理员'}


def public_role(role):
    """真实角色 -> 对外角色。没登记的映射原样返回。"""
    return PUBLIC_ROLE.get(role, role)


def public_role_label(role):
    """真实角色 -> 对外角色名。未知角色原样返回，方便排查脏数据。"""
    visible = public_role(role)
    return PUBLIC_ROLE_LABELS.get(visible, visible)



# ---- 账号状态 ----
# 和角色一样，取值只能有一个出处：散落在各文件里写 'closed' 这种字面量，
# 改的时候总会漏一处，而漏掉的那一处不会报错，只会在某天表现出
# 「状态明明是 closed，代码却不认识它」—— 这种毛病最难查。
STATUS_ACTIVE = 'active'      # 正常，能登录

STATUS_DISABLED = 'disabled'  # 管理员临时停用的，随时可以放回来

STATUS_CLOSED = 'closed'      # 已注销：不能登录，也不提供恢复入口


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


# PASSWORD_ENC_KEY 用来可逆加密密码（凭据查看功能依赖它），必须是合法的 Fernet 密钥
_enc_key = os.getenv('PASSWORD_ENC_KEY', '').strip()

FERNET = None

if _enc_key:
    try:
        FERNET = Fernet(_enc_key.encode())
    except Exception:
        logger.error('PASSWORD_ENC_KEY 不是合法的 Fernet 密钥，明文密码将无法查看')
else:
    logger.error('未配置 PASSWORD_ENC_KEY，明文密码将无法查看')


# 登录失败限制。内存计数只在单进程有效，多进程部署得换成 Redis 之类的共享存储
LOGIN_MAX_FAILS = env_int('LOGIN_MAX_FAILS', 5)

LOGIN_LOCK_SECONDS = env_int('LOGIN_LOCK_SECONDS', 300)


# 调试开关。生产环境必须为 false，调试器会暴露源码，还留了任意代码执行的口子
DEBUG_MODE = env_bool('DEBUG', False)


# 前端界面版本。两套界面共用同一套 /api 接口，区别只在外壳：
#   classic —— templates/index.html，单文件 Jinja 模板（樱花主题）
#   vue     —— static/app/，Vue 3 构建产物
#   random  —— 每个浏览器会话随机挑一套（默认）
#
# 这里给的只是默认值：app.py 的 _pick_ui() 里 ?ui= 参数优先级更高。
# 拼错的值不会报错、只会静默按 random 走，很难发现，所以这里主动记一条 error。
UI_MODE = os.getenv('UI_MODE', 'random').strip().lower()

if UI_MODE not in ('classic', 'vue', 'random'):
    logger.error('UI_MODE=%s 不是有效值，只认 classic / vue / random，已按 random 处理', UI_MODE)
    UI_MODE = 'random'



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
