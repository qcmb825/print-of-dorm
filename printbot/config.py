"""printbot 自己的配置加载。

和项目根 config.py **同名不同物**，刻意不共享代码：printbot 要整个目录
拷到国内机器上独立运行，拖着一个「顺便 import 了全项目」的配置模块
就等于把服务器代码也拖上去了。

加载语义与项目根保持一致：系统环境变量优先，.env 文件用 setdefault 补缺 ——
两边的规矩统一成一份，运维不用记两套。
"""

import logging
import os
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent


def load_env_file(env_file='.env'):
    """读 printbot/.env（如果存在），键用 setdefault 进环境变量。

    不存在不报错：用系统环境变量跑（比如做成 Windows 服务时）是合法姿势。
    """
    path = Path(env_file)
    if not path.is_absolute():
        path = HERE / env_file
    if not path.exists():
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

# OneBot v11 正向 WebSocket 地址：LLBot / NapCat 在**本机**开的那个端口。
# 默认 8085（本仓实测用的值，避开了网页端 8080 的端口名）。
ONEBOT_WS = os.getenv('ONEBOT_WS', 'ws://127.0.0.1:8085').strip()
# 与 OneBot 实现里配的 access token 一致；两边都留空也算合法。
ONEBOT_ACCESS_TOKEN = os.getenv('ONEBOT_ACCESS_TOKEN', '').strip()

# 打印服务器根地址。默认指向本机 8091（联调用）；上生产必须在 .env 里
# 显式写美国服务器的地址，bot.py 启动时会对「还挂着默认值」的情况报警。
API_BASE_DEFAULT = 'http://127.0.0.1:8091'
API_BASE = os.getenv('API_BASE', API_BASE_DEFAULT).strip().rstrip('/')

# bot 的全部身份就是这张票，必须与服务器 .env 的 BOT_TOKEN 一字不差。
BOT_TOKEN = os.getenv('BOT_TOKEN', '').strip()

# 站点地址：所有「去网页端操作」的引导都带上它。
# 默认是生产域名；联调时可指到别的地址（比如本机测试实例）。
SITE_URL = os.getenv('SITE_URL', 'https://print.qcmb.cloud').strip().rstrip('/')

LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO').strip().upper()

# ---- QQ 文件下单的本地预校验口径 -------------------------------------------
# 这两个值是服务器 config.py 同名常量的**抄写**，改一边要改另一边。
# 本地这道闸的价值是「早拒」：不合格的文件在国内机器上就拦下，
# 一个字节都不往美国传（跨洋流量是真金白银）。服务器那边还会再查一遍，
# 本地这道不能、也不需要替代服务端校验。
MAX_UPLOAD_MB = int(os.getenv('MAX_UPLOAD_MB', '50') or '50')
_raw_extensions = os.getenv('ALLOWED_EXTENSIONS', 'pdf,jpg,jpeg,png,doc,docx')
ALLOWED_EXTENSIONS = tuple(
    ext.strip().lstrip('.').lower()
    for ext in _raw_extensions.replace('，', ',').split(',') if ext.strip())

# 「订单可取件」的推送轮询间隔（秒）。大纲第 5.2 节：30 秒一次，
# 一天约 2880 个短请求，对服务器毫无压力；再密就是白烧跨洋流量。
EVENTS_POLL_SECONDS = int(os.getenv('EVENTS_POLL_SECONDS', '30') or '30')

# QQ 号的形状（5-12 位、不以 0 开头）与服务器 config.QQ_RE 是同一份的抄写。
# 两边必须同步改 —— 不过 OneBot 给的 user_id 天然长这样，这里只是
# 兜底挡一下「事件里混进了说不清的东西」。
#
# ⚠️ 用 **ASCII 的 [0-9]**，不用 `\d`：Python 的 `\d` 会匹配全角数字（'１２３'），
# 而全角数字经 `.isdigit()` / `int()` 一路都能过，只会把「事件里的 qq」变成
# 一个永远查不到的账号。服务端 config.QQ_RE 是同一个口径，两边一起改。
QQ_RE = re.compile(r'^[1-9][0-9]{4,11}$')

# ---- 订单状态文案（**协议的一部分，不是随便起的显示名**）--------------------
# 这五个字符串既是对学生展示的状态文案，也是前后端共用的**标识**：
# 服务端按它们落库与查库（config.ORDER_STATUSES），网页端按它们取状态色。
# printbot 是自包含包、不 import 项目模块，所以只能抄一份 ——
# **必须与服务器 config.py 的 ST_UNPRICED / ST_PENDING / ST_PRINTING /
# ST_READY / ST_DONE 完全同值，文案就是协议，改一个字就对不上。**
# （2026-09 实测踩过：这里少了 ST_READY，reply_code 拼「可以来取了」时抛
#  AttributeError，被事件线程的 except Exception 吞掉 —— 学生发「单号 25124」
#  永远收不到任何回复，两个进程的日志里都看不出问题。补常量比加 try 更对。）
ST_UNPRICED = '待计费'
ST_PENDING = '待打印'
ST_PRINTING = '打印中'
ST_READY = '可取件'
ST_DONE = '已取件'

# ---- 批量打印（2026-09-28 起）----------------------------------------------
# 一次最多收几份文件。**必须 ≤ 服务端的 BATCH_ORDER_MAX_FILES**（默认 10）：
# 这边放行 20 份、那边只收 10 份，学生会在传完 20 份之后才看到一句
# 「一次最多 10 份」—— 而那时文件已经全传上去了。
BATCH_MAX_FILES = int(os.getenv('BATCH_MAX_FILES', '10') or '10')

# 份数上限。⚠️ 必须与服务端 `config.COPIES_MAX` 一致 —— printbot 是自包含包
# （不 import 项目模块），所以这里只能各写一份，改的时候两边一起改。
# 这个数同时被 nlu/llm 用来判「学生说的份数越界了没有」：在这边收下来、
# 到最后一步才被服务端 400 顶回来，学生得把整批文件重发一遍。
COPY_MAX = int(os.getenv('COPY_MAX', '50') or '50')

# 一批文件收到之后，隔多久没动静就「追问」一句、追几次之后作废。
# 用户（2026-09-28）的原话是「过了几秒没回复就按这个配置追问，
# 追问几次仍然不回复则取消订单」——所以：
#   · BATCH_REMIND_AT 是两次追问的时间点（从**最后一次活动**算起，秒）；
#   · BATCH_TTL_SECONDS 是最终作废的时刻，比最后一次追问再宽一点。
# 追问里一定会把「按 A4 70g · 黑白 · 1 份 下单」这句完整写出来，
# 学生只要回一个「好」就成单。
BATCH_REMIND_AT = tuple(
    int(value) for value in
    (os.getenv('BATCH_REMIND_SECONDS', '45,150') or '45,150').replace('，', ',').split(',')
    if value.strip().isdigit())
BATCH_TTL_SECONDS = int(os.getenv('BATCH_TTL_SECONDS', '300') or '300')

# ---- 大模型兜底（可选）-----------------------------------------------------
# 规则解析（nlu.py）认不出来的那句话才走这里。**不配 key 就是关掉这一层**，
# 规则照常工作，功能不残缺（用户 2026-09-28：规则做扎实了再上大模型，锦上添花）。
# key 是凭据：只写在本文件同目录的 .env 里（那个文件被 .gitignore 忽略）。
LLM_API_KEY = os.getenv('LLM_API_KEY', '').strip()
LLM_BASE_URL = os.getenv('LLM_BASE_URL', 'https://api.deepseek.com').strip().rstrip('/')
LLM_MODEL = os.getenv('LLM_MODEL', 'deepseek-chat').strip()
#    超时给 8 秒：它是**对话中间**的一次调用，学生在等回话。
#    宁可这一次没听懂、让他重说一遍，也不要让屏幕静默十几秒。
LLM_TIMEOUT = float(os.getenv('LLM_TIMEOUT', '8') or '8')

# 模块级的 logger：config.py 是叶子模块（不 import 本项目任何东西），
# 但 printbot 里的其它模块要拿它记日志，所以在这里建一个共用的。
# bot.py 的 setup_logging() 会给 root logger 配上 handler，两边是同一个 logger 树。
log = logging.getLogger('printbot')
