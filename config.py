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



# 项目根目录：所有相对路径配置都以它为基准。
# 这里刻意用 __file__ 而不是 os.getcwd()。本项目要求从项目根启动，但「要求」不是「保证」——
# 计划任务、IDE 调试配置、被别的进程 import 时，CWD 可能是任何地方，
# 而同一个 './print_files' 在不同 CWD 下会指向不同目录，症状是「订单记录在，文件却找不到」。
BASE_DIR = os.path.dirname(os.path.abspath(__file__))



def resolve_path(value, base=BASE_DIR):
    """把配置里的路径统一成绝对路径：相对路径按 base（默认项目根）解析。

    调用方负责保证 value 非空（空值会解析成 base 本身）。
    """
    value = (value or '').strip()
    if not os.path.isabs(value):
        value = os.path.join(base, value)
    return os.path.normpath(value)



# 日志
# 控制台给人看，文件留给事后排查，按大小轮转，不会撑爆磁盘。
# 业务 / 访问 / 安全各写一个文件，出事时直接看对应的那个；
# 全混在一起的话，海量请求日志会把关键的安全告警淹掉。
# 控制台强制走 UTF-8，Windows 默认 GBK，中文日志会乱码。
# 访问日志分级：5xx=ERROR、4xx=WARNING、写操作=INFO、只读成功=DEBUG。
# 页面每 10 秒自动刷一次订单，全都按 INFO 记会把日志刷爆。
LOG_LEVEL_NAME = os.getenv('LOG_LEVEL', 'INFO').strip().upper()

LOG_LEVEL = getattr(logging, LOG_LEVEL_NAME, logging.INFO)

LOG_DIR = resolve_path(os.getenv('LOG_DIR', 'logs').strip() or 'logs')

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


# 数据目录：所有 SQLite 库文件（主库、学生名单库、迁移前自动生成的 .bak 备份）都放这里。
# 单独收进 data/ 而不是散在项目根：库文件和源码、前端产物混在一起时，
# 「哪些文件是运行期数据、哪些能删」光看目录根本分不出来，
# 清理旧版本或整目录替换前端产物时特别容易误伤。
DATA_DIR = resolve_path(os.getenv('DATA_DIR', '').strip() or 'data')

os.makedirs(DATA_DIR, exist_ok=True)


# 主数据库路径。默认落在 data/ 下，也可以用环境变量指到别的磁盘（迁移时用得上）
DATABASE_PATH = resolve_path(
    os.getenv('DATABASE_PATH', '').strip() or os.path.join(DATA_DIR, 'print_service.db')
)


# 学生身份名单库（学号 -> 姓名），注册时按学号查它校验身份。
# 为什么不并进主库：主库是本站自己的业务数据，名单是从校外系统整份导入的**别人的数据**，
# 两者生命周期完全不同 —— 换届时名单要整份换掉，主库一条都不能动。
# 代价是没法 JOIN，但校验只需要「按学号查一行」，用不上跨库查询。
ROSTER_DB_PATH = resolve_path(
    os.getenv('ROSTER_DB_PATH', '').strip() or os.path.join(DATA_DIR, 'roster.db')
)


# 上传文件保存路径，目录不存在会自动创建。
# 默认落在 data/uploads 下，但建议在 .env 里指到数据盘：
# 学生上传的是待打印文件，和数据库一样属于运行期数据，混在源码目录里不合适。
# 相对路径按项目根解析（和 DATABASE_PATH 一套规则），不受启动目录影响。
UPLOAD_FOLDER = resolve_path(
    os.getenv('UPLOAD_FOLDER', '').strip() or os.path.join(DATA_DIR, 'uploads')
)

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# 单文件大小上限。Flask 的 MAX_CONTENT_LENGTH 和分片上传那一侧的服务端校验
# 都从这里取值 —— 同一个数只写一遍，才不会出现「框架按 50MB 拦，
# 业务代码按 100MB 放行」这种口径打架的情况。
MAX_UPLOAD_MB = max(1, env_int('MAX_UPLOAD_MB', 50))

MAX_UPLOAD_BYTES = MAX_UPLOAD_MB * 1024 * 1024


# 允许上传的扩展名白名单，不在名单里的一律拒绝
ALLOWED_EXTENSIONS = {
    ext.strip().lower().lstrip('.')
    for ext in os.getenv('ALLOWED_EXTENSIONS', 'pdf,jpg,jpeg,png,doc,docx').split(',')
    if ext.strip()
}


# 订单状态机
#
# 「待计费」排在最前面，是这个流程里唯一没有替代方案的一环：
# 打印是按份数和纸张算钱的，只有管理员看过文件才知道该收多少，
# 下单人在提交时并不知道总价。所以订单不是直接进待打印池，
# 而是先停在待计费等管理员标价；标完价才回到「待打印」走原来的流程。
#
# 为什么单独给它一个状态，而不是用「price 为空」当标志：
# 打印员在待接单池里看到的就是「能不能接」。用空字段表达同一件事，
# 就得每个查询都记得多写一个条件，而漏写的那一处不会报错，
# 只会表现成「打印员把没标价的单接走了」。状态是显式的，漏不掉。
ST_UNPRICED = '待计费'

ST_PENDING = '待打印'

ST_PRINTING = '打印中'

ST_READY = '可取了'

ST_DONE = '已取件'

ORDER_STATUSES = (ST_UNPRICED, ST_PENDING, ST_PRINTING, ST_READY, ST_DONE)

# 能靠「改状态」按钮手动切到的状态。待计费不在里面：
# 它只能由计费动作产生（计费成功时自动从它走到待打印）。
# 允许手动往回切就会造出「已经标了价、又退回待计费」的单子 ——
# 那单的钱已经在界面上了，再显示成待计费，用户看到的费用就和状态对不上。
ORDER_STATUSES_MANUAL = (ST_PENDING, ST_PRINTING, ST_READY, ST_DONE)

# ---- 订单操作留痕（order_logs）----
# 订单详情页要回答的是「这一单被谁动过、动了什么」。光看 orders 表那几个
# 时间戳列（claim_time / price_time / update_time）只能知道「发生过什么」，
# 答不出「谁改的、从什么改成什么」—— 状态被连改两次，中间那一步就永远查不到了。
# 所以每个会改变订单的动作都往 order_logs 里写一条。
#
# 动作名收在这里的理由和状态枚举一模一样：前端按 action 取图标和配色，
# 散着写成字面量的话，哪一处拼错了不会报错，只会让那条记录在时间线上
# 变成一行没有样式的东西 —— 又是那种只能靠肉眼发现的毛病。
ORDER_LOG_CREATE = 'create'      # 下单（上传成功、订单落库）
ORDER_LOG_CLAIM = 'claim'        # 接单
ORDER_LOG_RELEASE = 'release'    # 释放回待接单池
ORDER_LOG_PRICE = 'price'        # 首次计费
ORDER_LOG_REPRICE = 'reprice'    # 改价（计过一次之后再改）
ORDER_LOG_STATUS = 'status'      # 手动改状态
ORDER_LOG_WITHDRAW = 'withdraw'  # 下单人自己撤回
ORDER_LOG_DOWNLOAD = 'download'  # 下载了订单文件

ORDER_LOG_ACTIONS = (
    ORDER_LOG_CREATE, ORDER_LOG_CLAIM, ORDER_LOG_RELEASE,
    ORDER_LOG_PRICE, ORDER_LOG_REPRICE, ORDER_LOG_STATUS,
    ORDER_LOG_WITHDRAW, ORDER_LOG_DOWNLOAD,
)

# 动作的中文名由**服务端**给（响应里带 action_label），前端只管拿来显示。
# 这和状态文案不放在前端翻译是同一个道理：两处各存一份映射，改文案时必漏一处，
# 而漏掉的那一处不会报错，只是界面上写着个没人认识的词。
ORDER_LOG_LABELS = {
    ORDER_LOG_CREATE: '提交订单',
    ORDER_LOG_CLAIM: '接单',
    ORDER_LOG_RELEASE: '释放订单',
    ORDER_LOG_PRICE: '计费',
    ORDER_LOG_REPRICE: '修改金额',
    ORDER_LOG_STATUS: '修改状态',
    ORDER_LOG_WITHDRAW: '撤回订单',
    ORDER_LOG_DOWNLOAD: '下载文件',
}

# detail 是给人看的一句话，不是给程序解析的字段，所以卡个长度就够了。
ORDER_LOG_DETAIL_MAX = 200

# 计费金额
# 上限给得比现实高得多（够打印几千页），目的只是挡住手滑多打几个零和恶意超长数字。
PRICE_MAX_YUAN = 99999.99

# 金额一律以「元」为单位的十进制字符串处理，最多两位小数。
# 不用 float(x) 直接吃请求体：0.1 在二进制里存不下，
# 而 JSON 里的 0.1 传过来本来就已经带上浮点误差了，先转成字符串再按字符串解析，
# 精度才可控。真正落库时四舍五入到两位。
PRICE_RE = re.compile(r'^\d{1,6}(\.\d{1,2})?$')


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

STATUS_CLOSED = 'closed'      # 已注销：不能登录，昵称/学号让给别人，恢复要显式走恢复接口


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


# ---- 身份审核（学号不在名单上时的人工核验通道）----
# 名单库是整份导入的外部数据，必然有遗漏：新生还没入库、转过专业换过学号、
# 名单本身录错了。这些人不是「不配注册」，只是机器认不出来，
# 所以留一条人工通道：本人提交申请 -> 管理员核对 -> 通过后才放行注册。
#
# 为什么不像工单那样允许多条：申请回答的是「我能不能注册」，
# 同一个人不存在第二种答案。多条申请只会让管理员对着同一个学号反复核对同一件事。
AUDIT_PENDING = 'pending'

AUDIT_APPROVED = 'approved'

AUDIT_REJECTED = 'rejected'

AUDIT_STATUSES = (AUDIT_PENDING, AUDIT_APPROVED, AUDIT_REJECTED)

# 状态文案收在这里，前端不自己翻译：两边各写一套，改的时候必漏一处，
# 而漏掉的那一处不会报错，只是界面上写着个没人认识的状态。
AUDIT_STATUS_LABELS = {AUDIT_PENDING: '待审核', AUDIT_APPROVED: '已通过', AUDIT_REJECTED: '已驳回'}

# 申请说明给个下限：一个字「无」等于没写，管理员没法据此判断该不该放行。
AUDIT_NOTE_MIN = 4

AUDIT_NOTE_MAX = 200

AUDIT_REVIEW_MAX = 200


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
