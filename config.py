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


BOT_TOKEN = os.getenv('BOT_TOKEN', '').strip()



def env_bool(name, default=False):
    """true/1/yes/on 都当成 True。"""
    return os.getenv(name, str(default)).strip().lower() in ('1', 'true', 'yes', 'on')



# env_int 解析失败时攒下的告警，等日志通道建好之后再补进日志文件。
#
# 为什么不就地记日志：env_int 在本模块很靠前的位置就被调用（LOG_MAX_BYTES、
# LOG_BACKUP_COUNT 那两行），那时下面的 logger 还没建出来，直接引它是 NameError，
# 而这一崩是在模块加载阶段，整个服务都起不来 —— 一个「提醒你配置写错了」的功能
# 反倒成了最严重的那个故障。
_env_int_warnings = []


def _warn_env_int(name, raw, default):
    """报告某个整数型环境变量没解析成功。

    这类问题（PORT=808O 把零敲成字母 O、LOGIN_MAX_FAILS= 留空、顺手写了 '5次'）
    以前是完全无声的：程序拿着默认值继续跑，看起来一切正常，只是行为和人想的不一样。
    等到有人来问「为什么改了 PORT 没生效」时，现场已经什么都不剩了，所以必须留一句话。

    默认值也一并报出来，是因为「回退到了什么」才是真正需要知道的那半个信息：
    只说「PORT 不合法」，看日志的人还是不知道服务实际听在哪个端口上。
    """
    message = ('环境变量 %s 的值 %r 解析不成整数，已回退到默认值 %s（请检查 .env：'
               '常见是把数字 0 写成了字母 O、带了单位，或者值整个留空了）'
               % (name, raw, default))
    target = globals().get('logger')  # 见上面那段说明：这里可能还没有日志对象
    if target is not None:
        target.warning(message)
        return
    _env_int_warnings.append(message)
    # 这一句跑在下面那个「把 stdout/stderr 转成 UTF-8」的循环之前，极少数终端编码
    # 容不下中文，会直接抛 UnicodeEncodeError。这里是配置解析路径，警告打不出来没关系，
    # 但绝不能因为打不出来就把服务拦在启动阶段 —— 那就成了「提醒你配置错了」比配置错本身还严重。
    try:
        print(message, file=sys.stderr)
    except (UnicodeEncodeError, OSError, ValueError):
        pass


def env_int(name, default):
    """读整数型环境变量，值不合法就用默认值，并留一条 warning。"""
    try:
        return int(os.getenv(name, str(default)).strip())
    except (TypeError, ValueError):
        _warn_env_int(name, os.getenv(name), default)
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


# 把 logger 建好之前攒下的那批告警补进日志文件（控制台当时已经打过一句了）。
# 只写在控制台是不行的：.env 写错这件事最常见的暴露方式是「事后翻日志对不上」，
# 而控制台那段滚屏早就没了。
for _message in _env_int_warnings:
    logger.warning('%s', _message)

_env_int_warnings.clear()



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


# ---- 收款码（每个管理员一份）----
# 取件通知邮件里要带上收款码，让学生当场扫码付款。而**收款的人不一样**：
# 谁接的单谁收钱，所以每个人的码必须分开存，不能全站共用一张 ——
# 共用一张的话，A 接单、钱进 B 的账户，对账时谁也说不清这笔是谁的。
#
# 为什么单独开一个子目录而不是塞进 UPLOAD_FOLDER：
# 那个目录装的是订单附件，生命周期跟着订单走（撤回订单会删文件、清理备份会整目录处理）。
# 收款码是长期资产，混进去早晚被顺手清掉，而且是**静默**清掉 ——
# 邮件里那张图会变成一块空白，没人会注意到。
PAY_QR_FOLDER = resolve_path(
    os.getenv('PAY_QR_FOLDER', '').strip() or os.path.join(DATA_DIR, 'pay_qr')
)

os.makedirs(PAY_QR_FOLDER, exist_ok=True)


# 只收这几种图片。收款码是给人扫的，转成 webp 或者收 PDF 都会让部分手机扫不出来，
# 所以不做格式转换、也不放宽白名单。
PAY_QR_EXTENSIONS = ('png', 'jpg', 'jpeg')

# 单张收款码大小上限。它是一张手机截图，正常几百 KB；给到 2MB 已经绰绰有余，
# 而这个上限直接决定邮件附件大小 —— 邮件里还有正文，别把学生的收件箱顶爆。
PAY_QR_MAX_BYTES = max(64 * 1024, env_int('PAY_QR_MAX_BYTES', 2 * 1024 * 1024))


# 兜底收款码：接单人没传自己的码、内置管理员也没传时，用这一张。
# 留住它是为了让「还没人上传过」这件事不表现为邮件缺图 ——
# 部署时把默认管理员那张码丢成 data/pay_qr/default.png 就能立刻跑起来。
PAY_QR_FALLBACK_IMAGE = resolve_path(
    os.getenv('PAY_QR_FALLBACK_IMAGE', '').strip()
    or os.path.join(PAY_QR_FOLDER, 'default.png')
)


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
# ---- 单号（面向用户的唯一标识）-------------------------------------------
# 5 位数字、首位非 0。为什么不是 4 位：号码会回收复用，4 位撑不住「一年内不重用」
# （一年约 1.46 万单 > 1 万），会让老聊天记录里的单号指到新的一单。详见 utils.generate_pickup_code。
PICKUP_CODE_DIGITS = 5
# 冷却期：同一个号码在这个窗口内不再发给新单（软规则，见生成器的说明）。
PICKUP_CODE_COOLDOWN = '-365 days'

# ---- 用户偏好（prefs.py）--------------------------------------------------
# 机器人/网页一次列多少单：太少了翻页烦，太多了手机上一屏刷不完。
PREF_ORDERS_PAGE_DEFAULT = 5
PREF_ORDERS_PAGE_MIN = 3
PREF_ORDERS_PAGE_MAX = 20

# 免打扰时段最长与格式说明（校验用；真正的解析在 prefs.parse_clock）
QUIET_FORMAT_HINT = 'HH:MM'

ST_UNPRICED = '待计费'

ST_PENDING = '待打印'

ST_PRINTING = '打印中'

# 「可取件」——2026-09-20 由旧值「可取了」改名而来。
# ⚠️ 这几个状态字符串**同时是展示文案与前后端共用的标识**（见下面 ORDER_STATUSES
# 那段注释），所以改它等于一次**数据迁移**：库里的旧值必须一起改，
# 否则那些单会变成「代码不认识的状态」——界面拿不到颜色、筛选漏掉，两边都不报错。
# 迁移见 db.py 的 _migrate_ready_status_wording（v16 → v17）。
ST_READY = '可取件'

ST_DONE = '已取件'

ORDER_STATUSES = (ST_UNPRICED, ST_PENDING, ST_PRINTING, ST_READY, ST_DONE)

# 能靠「改状态」按钮手动切到的状态。待计费不在里面：
# 它只能由计费动作产生（计费成功时自动从它走到待打印）。
# 允许手动往回切就会造出「已经标了价、又退回待计费」的单子 ——
# 那单的钱已经在界面上了，再显示成待计费，用户看到的费用就和状态对不上。
ORDER_STATUSES_MANUAL = (ST_PENDING, ST_PRINTING, ST_READY, ST_DONE)

# 「排队情况」画哪几档。比 ORDER_STATUSES 少一个已取件。
# 已取件是终态，单子已经走完流程、纸也被取走了，摆在「还在排队」里没有意义；
# 它同时是个累计数 —— 性质和总单数一样，属于站点规模，
# 不该由服务数据页替业主对外说。
# 注意它和 ORDER_STATUSES_MANUAL 长得像但**不能合并**：
# 排队里要显示待计费（它就是队列的一环：还没报价、还没开印），
# 而下拉框里不能有（手改回待计费会做出「已经收了钱又变回没报价」的单子）。
ORDER_STATUSES_QUEUE = (ST_UNPRICED, ST_PENDING, ST_PRINTING, ST_READY)

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
ORDER_LOG_PICKUP = 'pickup'      # 凭单号确认取件（柜台核对那一步）
ORDER_LOG_GROUP = 'group'        # 管理员把订单归入某条打印服务分组（不是下单时选的预设）

ORDER_LOG_ACTIONS = (
    ORDER_LOG_CREATE, ORDER_LOG_CLAIM, ORDER_LOG_RELEASE,
    ORDER_LOG_PRICE, ORDER_LOG_REPRICE, ORDER_LOG_STATUS,
    ORDER_LOG_WITHDRAW, ORDER_LOG_DOWNLOAD, ORDER_LOG_PICKUP, ORDER_LOG_GROUP,
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
    # 取件和改状态分开说：柜台那位可能不是接单人，「这单是被人凭码取走的」
    # 和「有人在下拉框里把状态改成了已取件」是两件事，时间线上要分得清。
    ORDER_LOG_PICKUP: '取件',
    ORDER_LOG_GROUP: '归入服务',
}

# detail 是给人看的一句话，不是给程序解析的字段，所以卡个长度就够了。
ORDER_LOG_DETAIL_MAX = 200

# ---- 订单台检索 ----
# 搜索框的输入长度上限。这不是防注入（查询全部走参数绑定），
# 而是挡住「往输入框里贴一整段文本」这种手滑，同时让 LIKE 的扫描量可控。
# 单号 4 位、昵称/姓名/宿舍都很短，64 个字足够放下任何一个人的信息。
ORDER_SEARCH_MAX = 64

# 「按打印服务筛选」里代表「什么都没归」的取值。
# 用字符串而不是 0 或 -1：前端把它当**下拉框的选项值**用，
# 而这个值要能一眼看出是「一个特殊选项」而不是「某条 id 为 0 的预设」。
ORDER_PRESET_FILTER_NONE = 'none'

# ---- 订单来源（orders.source）----
# 这一单是从哪条路下的。它**必须**是订单自己的一个字段，不能像 2026-09-21 之前
# 那样往学生备注里塞一句「通过 QQ 机器人下单」—— 备注是学生自己的话，
# 系统往里面写字，订单台上就再也分不清哪句是人写的、哪句是机器写的
# （用户实测报上来的就是这个）。
#
# 取值是稳定标识，界面上的中文由 ORDER_SOURCE_LABELS 翻 —— 沿状态那一套的惯例：
# 存进库里的东西不跟着展示文案走，改文案不用改数据。
ORDER_SOURCE_WEB = 'web'
ORDER_SOURCE_BOT = 'bot'

ORDER_SOURCES = (ORDER_SOURCE_WEB, ORDER_SOURCE_BOT)

ORDER_SOURCE_LABELS = {
    ORDER_SOURCE_WEB: '网页端',
    ORDER_SOURCE_BOT: 'QQ 机器人',
}


def order_source_label(value):
    """把来源标识翻成给人看的中文；认不出的（老数据/脏数据）一律当网页端。

    不返回「未知」：订单台那一列是给打印员扫一眼用的，冒出一句「未知来源」
    只会让人停下来琢磨它什么意思，而它没有任何可操作的后续动作。
    """
    return ORDER_SOURCE_LABELS.get(value, ORDER_SOURCE_LABELS[ORDER_SOURCE_WEB])


# ---- 自动估价（pricing.py）--------------------------------------------------
# 下单时按文件页数算一个**预估**价给学生看；最终价永远由管理员接单后自己确认。
# 这一段只管「形状」上的边界，具体系数住在 price_rules 表里（管理员可改）。
#
# 四项系数的上限：给得比现实高得多，只挡手滑多打几个零和恶意超长数字，
# 与 PRICE_MAX_YUAN 同一个口径。
PRICE_COEF_MAX = 999.99

# 页数上限：一个订单最多按多少页估。文件页数是从文件内容里数出来的，
# 而那个数**来自用户上传的文件**，不能不加约束地进公式（一个伪造的
# 几百兆 PDF 能把「99999 页」算进价格里）。超过就按这个上限截断，
# 并在结果里标出「已按上限估算」。
EST_PAGES_MAX = 2000

# 页数扫描的文件大小上限。页数解析要读一遍文件，而单文件上限是 50MB ——
# 每次上传都扫 50MB 会白白占着一个 waitress 线程。超过就不估了（预估留空），
# 管理员照常手动定价，功能不受影响。
EST_SCAN_MAX_BYTES = 20 * 1024 * 1024

# 计费金额
# 上限给得比现实高得多（够打印几千页），目的只是挡住手滑多打几个零和恶意超长数字。
PRICE_MAX_YUAN = 99999.99

# 金额一律以「元」为单位的十进制字符串处理，最多两位小数。
# 不用 float(x) 直接吃请求体：0.1 在二进制里存不下，
# 而 JSON 里的 0.1 传过来本来就已经带上浮点误差了，先转成字符串再按字符串解析，
# 精度才可控。真正落库时四舍五入到两位。
PRICE_RE = re.compile(r'^\d{1,6}(\.\d{1,2})?$')


# ---- 预设打印服务（print_presets）----
# 预设就是**一段文本**：管理员拿它描述一种固定的打印服务（「学位论文胶装：
# 黑白双面 + 封面覆膜」这类）。刻意不给它名称、价格、文件模板这些字段 ——
# 多一个短名，同一件东西就有两处描述，学生下单时看到的那句和管理员维护的那句
# 迟早会不一致，而界面上的不一致没人会当成 bug 报上来。
#
# 为什么订单要另外存一份快照（orders.preset_content）：
# 预设是可以被编辑、被停用、被删掉的。订单只存 preset_id、显示时去 JOIN 的话，
# 管理员随手改一个字，三个月前那一单的打印要求就跟着变了 ——
# 打印员拿着改过的要求去核对一份早就打完的活，谁也说不清当时到底要的是什么。
PRESET_CONTENT_MIN = 2

PRESET_CONTENT_MAX = 300

# ---- 纸张类型（paper_types）----
# 由管理员自己维护，不写死在代码里：楼里换一种纸就要改一次代码、重发一次版本，
# 那不是配置，那是把配置藏在了源码里。
# remark 是写给打印员看的备注（「较厚，别走自动双面送纸」这类），不是给学生看的说明。
PAPER_NAME_MAX = 20

PAPER_REMARK_MAX = 120

# ---- 打印选项 ----
# 份数是**算钱的一环**：三十份和一份是两笔完全不同的账，所以它必须跟着订单落库，
# 而不能只存在于学生的记忆里。
# 上限卡在 50 不是为了技术限制，是挡住「手滑多打两个零」——
# 一份文件打 500 份，打印员开工之前总得有人先问一句。
COPIES_MIN = 1

COPIES_MAX = 50

COPIES_DEFAULT = 1


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


# 「其他联系方式」：QQ 号单列一栏必填之后，这一栏只剩微信和邮箱，而且是**选填**。
#
# 为什么不干脆继续用 CONTACT_TYPES ——
# 那一份里带着 qq，把它当「其他联系方式」的候选，界面上就会出现两处填 QQ 的地方
# （一处必填、一处选填），而两处填的值一旦不一样，谁也说不清取件邮件该发给哪一个。
# 分成两份之后，「QQ 号」这件事全系统只有一处入口。
#
# 但 CONTACT_TYPES 本身不能删：身份审核申请（routes/audit.py）收的还是老形状
# （还没账号的人，学号姓名都不在名单上，让他填 QQ 是唯一能联系到他的办法），
# 而且历史数据的 contact_type 里确实存着 'qq'，CONTACT_LABELS 得认得它。
OTHER_CONTACT_TYPES = ('wechat', 'email')

OTHER_CONTACT_LABELS = {key: CONTACT_LABELS[key] for key in OTHER_CONTACT_TYPES}

WECHAT_RE = re.compile(r'^[A-Za-z][A-Za-z0-9_-]{4,19}$')  # 5-20 位，字母开头

QQ_RE = re.compile(r'^[1-9]\d{4,11}$')  # 5-12 位数字，不以 0 开头

EMAIL_RE = re.compile(r'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')


# 订单规格的两个枚举。库里存的是英文（black / single），中文一律过这两张表。
# 以前只有前端有一份（frontend/src/utils/format.ts），因为后端从来不把它们
# 直接展示给人 —— 取件邮件是第一个例外，没有这两张表，一封中文邮件里就会
# 夹着「black · single」两个英文单词。加后端这份时记得两边取值保持一致。
COLOR_TYPE_LABELS = {'black': '黑白', 'color': '彩色'}

DUPLEX_LABELS = {'single': '单面', 'double': '双面'}


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


# ---- 未接单提醒（邮件）----
# 新单落库时是「待计费 + 没人接」，得有人在管理端把它接走才算开始。
# 半夜、上课时段没人看页面，单子就一直在池子里躺着，直到学生来问才被发现。
# 所以超过 CLAIM_ALERT_MINUTES 分钟还没人碰过的单，主动发一封邮件出去。
#
# 为什么不改成「下单就发」：刚下完单的几秒内没人接是完全正常的，
# 每次下单都发一封会把邮箱变成下单流水，收信人两天之内就会把这个规则屏蔽掉 ——
# 提醒一旦被当成噪音，真正该看的那封也就一起被忽略了。
#
# 为什么门槛不用「price 为空」之类的字段表达：那和状态枚举是同一个道理，
# 用字段拼语义时，每个查询都得记得多写一个条件，漏写的那一处不报错，
# 只会表现成「明明没提醒，日志里却写着提醒过了」。
CLAIM_ALERT_ENABLED = env_bool('CLAIM_ALERT_ENABLED', True)

CLAIM_ALERT_MINUTES = max(1, env_int('CLAIM_ALERT_MINUTES', 3))

# 扫描间隔。60 秒对「3 分钟」这个门槛来说是够细的粒度，
# 再密就只是拿数据库 I/O 换几秒的及时性，没什么意义。
CLAIM_ALERT_INTERVAL = max(10, env_int('CLAIM_ALERT_INTERVAL', 60))

# 只提醒「最近这段时间内」下的单。
# 这一条是给重启场景兜底的：服务停了三天再起来，库里的老单全都满足
# 「没人接 + 超过 3 分钟」，不加这道闸就会一口气炸出几十封早就没人关心的邮件。
# 超过这个岁数的单不再提醒 —— 它们该靠人去看订单台，不是靠邮件。
CLAIM_ALERT_MAX_AGE_HOURS = max(1, env_int('CLAIM_ALERT_MAX_AGE_HOURS', 24))

# 发信失败后的退避秒数。SMTP 挂掉时（密码错、网络不通、服务商封了海外 IP）
# 每 60 秒重试一次只会把日志刷满、顺便让对方把我们限流，
# 所以失败后歇一会儿再来。
CLAIM_ALERT_RETRY_BACKOFF = max(30, env_int('CLAIM_ALERT_RETRY_BACKOFF', 300))

# 邮件正文里最多列几单，多的折成一句「另有 N 单」。
# 不给上限的话，积压一天的队列会做出一封长得没法读的邮件，
# 而那样一封邮件的实际效果等于没发。
CLAIM_ALERT_MAX_ITEMS = max(1, env_int('CLAIM_ALERT_MAX_ITEMS', 20))


# ---- 可取件提醒（邮件）----
# 上面那封是催管理员的（没人接单），这一封是通知**学生**的：
# 单子打完、状态改成「可取件」时，给下单人发一封邮件，
# 标题里带上单号，正文里带收款码 —— 学生不用再回网页查，看到邮件就能来取。
#
# 为什么也做成「后台线程扫描」而不是在改状态那个请求里直接发：
# 改状态是管理员点一下按钮，而 SMTP 握手最慢能到 SMTP_TIMEOUT 秒。
# 同步发信等于让管理员每次点「改状态」都陪着等一次网络往返，
# 而且 waitress 只有 8 个线程 —— 几个管理员同时改状态就能把整个站点卡住。
# 落库和发信分开之后，改状态永远是毫秒级的，发不出去也不影响订单本身。
PICKUP_NOTIFY_ENABLED = env_bool('PICKUP_NOTIFY_ENABLED', True)

# 扫描间隔（秒）。默认 30，比未接单提醒（60 秒）密一倍：
# 那个是「催人干活」，晚一分钟无所谓；这个是学生已经付了钱、站在打印机旁边等，
# 通知慢一拍他就得多跑一趟。30 秒是「够快」和「别白烧数据库」之间的折中。
PICKUP_NOTIFY_INTERVAL = max(10, env_int('PICKUP_NOTIFY_INTERVAL', 30))

# 发信失败后的退避秒数，理由同 CLAIM_ALERT_RETRY_BACKOFF。
PICKUP_NOTIFY_RETRY_BACKOFF = max(30, env_int('PICKUP_NOTIFY_RETRY_BACKOFF', 300))

# 只处理「最近多少小时内变成可取件」的单，默认 24。
# 这道闸是**升级兜底**，不是业务规则：本次升级之前就停在「可取件」的历史订单
# 一律没有发信凭证（新列是 NULL），不加限制的话，服务一启动就会把积压的老单
# 全部翻出来补发一遍 —— 收件人早就把东西取走了，突然收到一封「您的订单可取件」，
# 那是纯粹的骚扰邮件。这边和 CLAIM_ALERT_MAX_AGE_HOURS 是同一个道理，
# 也同样是**不回填历史数据**：回填等于把「没提醒过」记成「提醒过了」，
# 以后从数据上再也看不出发生过什么。
PICKUP_NOTIFY_MAX_AGE_HOURS = max(1, env_int('PICKUP_NOTIFY_MAX_AGE_HOURS', 24))


# 取件地址。邮件里要写清去哪儿拿，而这个词只有在本地生活过的人才说得准，
# 不是能猜出来的配置，所以留一个环境变量，默认值按当前取件点填。
# 地址会变（换宿舍楼、换桌子），写死在代码里意味着每次搬家都得改代码重新部署。
PICKUP_ADDRESS = os.getenv('PICKUP_ADDRESS', '2号北201').strip()

# 站点对外地址。邮件里要告诉学生「去哪儿看订单、在哪儿提工单」——
# 这个地址只有部署的人知道，所以也是环境变量。
# （printbot 自己那份 .env 里也有一个 SITE_URL：那个包要整个拷到跑 QQ 的机器上，
#   不 import 项目模块，所以两边各写一份；正常部署两个值应当指向同一个站点。）
SITE_URL = os.getenv('SITE_URL', 'https://print.qcmb.cloud').strip().rstrip('/')


# ---- SMTP（发信）----
# 不配 SMTP_HOST 就不启用未接单提醒，启动时记一条 info —— 这个功能的开关
# 实际上就是「有没有配发信服务器」，再多一个开关只会多一种配错的方式。
#
# 密码只从环境变量读，不落任何文件、不进日志：QQ / 163 用的是「授权码」，
# 它等价于密码，写进日志的后果和把密码写进日志一样。
SMTP_HOST = os.getenv('SMTP_HOST', '').strip()

# QQ / 163 是 465，Gmail 是 587
SMTP_PORT = env_int('SMTP_PORT', 465)

SMTP_USER = os.getenv('SMTP_USER', '').strip()

SMTP_PASSWORD = os.getenv('SMTP_PASSWORD', '').strip()

# 加密方式：ssl（465，连上就是 TLS）/ starttls（587，先说hello再升级）/ none（只在本地调试用）。
# 和 UI_MODE 一个套路：拼错的值不报错、只静默按默认走，很难发现，所以这里主动记一条 error。
SMTP_SECURITY = os.getenv('SMTP_SECURITY', 'ssl').strip().lower()

if SMTP_SECURITY not in ('ssl', 'starttls', 'none'):
    logger.error('SMTP_SECURITY=%s 不是有效值，只认 ssl / starttls / none，已按 ssl 处理', SMTP_SECURITY)
    SMTP_SECURITY = 'ssl'

# 发件人地址。留空就用 SMTP_USER —— 绝大多数服务商要求这两者一致，
# 但「转发到别的域名」这类配置确实存在，所以留一个能单独指定的口子。
MAIL_FROM = os.getenv('MAIL_FROM', '').strip() or SMTP_USER

# 收件人显示名，出现在对方邮箱的发件人那一栏
MAIL_FROM_NAME = os.getenv('MAIL_FROM_NAME', '小猫娘打印服务').strip() or '小猫娘打印服务'

# 额外收件人，逗号分隔。自动收集只能覆盖「联系方式填的是 QQ 或邮箱」的账号，
# 而内置管理账号压根没有联系方式 —— 它的收件地址只能从这里来。
ALERT_MAIL_TO = tuple(
    address.strip() for address in os.getenv('ALERT_MAIL_TO', '').split(',') if address.strip()
)

# QQ 号推邮箱：管理员注册时联系方式三选一，选 QQ 的话库里存的是号不是邮箱，
# 但 QQ 号本身就能拼出 QQ 邮箱，不必为此再加一列、再让每个人去补填一次。
QQ_MAIL_SUFFIX = '@qq.com'

# 发信超时（秒）。外网 SMTP 握手慢的时候不少，给短了会把能成功的信掐掉；
# 给长了又会把守护线程卡住 —— 卡住的是它自己，不影响请求处理，但仍然别太久。
SMTP_TIMEOUT = max(3, env_int('SMTP_TIMEOUT', 15))


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
