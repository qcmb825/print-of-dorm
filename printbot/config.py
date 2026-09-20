"""printbot 自己的配置加载。

和项目根 config.py **同名不同物**，刻意不共享代码：printbot 要整个目录
拷到国内机器上独立运行，拖着一个「顺便 import 了全项目」的配置模块
就等于把服务器代码也拖上去了。

加载语义与项目根保持一致：系统环境变量优先，.env 文件用 setdefault 补缺 ——
两边的规矩统一成一份，运维不用记两套。
"""

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
# 显式写美国服务器的地址，下面 bot.py 启动时会对「还挂着默认值」的情况报警。
API_BASE = os.getenv('API_BASE', 'http://127.0.0.1:8091').strip().rstrip('/')

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

# 「订单可取了」的推送轮询间隔（秒）。大纲第 5.2 节：30 秒一次，
# 一天约 2880 个短请求，对服务器毫无压力；再密就是白烧跨洋流量。
EVENTS_POLL_SECONDS = int(os.getenv('EVENTS_POLL_SECONDS', '30') or '30')

# QQ 号的形状（5-12 位、不以 0 开头）与服务器 config.QQ_RE 是同一份的抄写。
# 两边必须同步改 —— 不过 OneBot 给的 user_id 天然长这样，这里只是
# 兜底挡一下「事件里混进了说不清的东西」。
QQ_RE = re.compile(r'^[1-9]\d{4,11}$')
