"""printbot 入口：连 OneBot 的 WS，把私聊消息变成对服务器的一次调用。

身份模型（产品决策 2026-09-20）：**QQ 号就是身份**。用户注册时在网页
填过 QQ 号，私聊里发消息的 user_id（OneBot 登录态给的，伪造不了）
就是账号凭证 —— 没有验证码、没有密码。服务器按 QQ 找不到账号时会
回引导文案，这里原样转达。

命令面：
  发文件      → 直接下单（本地预校验扩展名/大小，不合格一个字节都不跨洋）
  /preset     → 看有哪些预设打印服务；/preset 编号 → 按那条服务下单
  /orders     → 最近的订单和状态（含取件码）
  /code 编号  → 查某一单的取件码
  /help       → 这份说明

「订单可取了」自动推送：后台线程按 EVENTS_POLL_SECONDS 轮询
/api/bot/events，游标存本地文件，重启不丢不重（详见 _notify_loop）。

铁律（QQbot对接大纲.md 第 0 节）：
  - 只理**私聊**，群消息一律忽略 —— 取件码出现在群里等于任何人都能冒领；
  - 不在 QQ 里做任何管理员操作；
  - 日志不记消息正文，只记 QQ 号与动作（正文可能有闲聊和隐私）。
"""

import json
import logging
import os
import sys
import threading
import time
import urllib.request
import uuid
from logging.handlers import RotatingFileHandler
from pathlib import Path

from . import api, config
from .onebot import OneBotClient, OneBotError

HELP_TEXT = (
    '我是打印服务的机器人，直接用就行：\n'
    '① 把要打的文件直接发给我（pdf / word / 图片），我会问你打印方式、份数、纸张\n'
    '　 （下单过程中想加备注，随时发「备注 你的内容」）\n'
    '② 「打印服务」看有哪些现成服务，「打印服务 编号」按那条服务下单（同样会问参数）\n'
    '③ 「订单」查最近的订单和状态；「取件码 订单号」查某一单的取件码\n'
    '④ 「我的」看下单概况和存储用量；「公告」看最新公告\n'
    '⑤ 有问题发「反馈 你的问题」提交工单，「工单」看进展、「回复工单 单号 内容」接着聊\n'
    '⑥ 「撤回 订单号」撤回还没被接单的订单（会要求再发一次「确认撤回 订单号」）\n'
    '更完整的操作（指定纸张、改参数、看公告）在网页端：\n'
    'https://print.qcmb.cloud'
)

log = logging.getLogger('printbot')

# ---- 命令面：中文为主，斜杠英文保留作兼容别名 --------------------------------
# 用户要求以中文命令为主（发「订单」「取件码 8」…）；斜杠英文（/orders 等）
# 是之前就有的写法，留作别名 —— 老用户照旧能用，帮助里只教中文。
# 中文命令分两类：
#   - 整词命令（订单/帮助/取消…）：首段必须**完全相等**才算命令，
#     「订单还没好吗」这种聊天句首段不等于「订单」，不会被误吞；
#   - 带参命令（取件码/打印服务）：允许紧贴参数（「取件码1234」），
#     中文输入不带空格太常见，要求空格等于逼用户改打字习惯。
_ZH_EXACT = {
    '帮助': 'help', '说明': 'help', '菜单': 'help',
    '订单': 'orders', '我的订单': 'orders', '查订单': 'orders',
    '我的': 'me', '概况': 'me',
    '公告': 'announce',
    '工单': 'tickets',
    '取消': 'cancel',
}
_ZH_PREFIX = {
    '取件码': 'code', '查件': 'code',
    '打印服务': 'preset', '服务': 'preset',
    # 「撤回」是删除类操作，做成两道口令：撤回 13（给提示）→ 确认撤回 13（执行）。
    # 两句都走同一条前缀规则，数字紧贴也认（「撤回13」）。
    '撤回': 'withdraw', '确认撤回': 'withdraw_confirm',
    # 回复工单：单号紧贴也认（「回复工单3 已经取到了」）
    '回复工单': 'ticket_reply',
}
# **自由文本**命令：参数是任意一句话，没法用「后面跟数字」来兜边界，
# 所以要求命令词后面必须有分隔符（空格或冒号）—— 「反馈 黑边」「反馈：黑边」都行，
# 而「反馈问题的同学请找我」这种聊天句不会被当成工单内容吞掉。
_ZH_FREETEXT = {
    '反馈': 'feedback',
}
_EN_ALIAS = {'help': 'help', 'orders': 'orders', 'code': 'code',
             'preset': 'preset', 'cancel': 'cancel', 'me': 'me',
             'announce': 'announce', 'announcement': 'announce',
             'withdraw': 'withdraw'}

# ---- 发完文件后的参数追问 ----------------------------------------------------
# 状态：qq → {'path','name','step','color','duplex','ts'}。
# step 只有两步：先问打印方式（mode），再问份数（copies）——
# 问题和选项都带默认值，用户一路回数字就能下单，不想选就发「取消」。
# 状态存在内存里：printbot 重启后这份对话就没了，但暂存的文件在磁盘上，
# 启动时统一清理，用户重发即可（下面有超时/丢失时的明确话术）。
_pending = {}
PENDING_TTL_SECONDS = 600  # 10 分钟没选完就作废（文件白占磁盘没意义）
PENDING_DIR = Path(__file__).resolve().parent / 'data' / 'pending'

_MODE_MAP = {'1': ('black', 'single'), '2': ('black', 'double'),
             '3': ('color', 'single'), '4': ('color', 'double')}

# 渲染好的数据卡落这儿（启动时统一清一次）。**别发完就删**：框架那边是拿到文件、
# 发完才回执的，抢在中间删会发出一张白图 —— 一张几十 KB，留着更稳。
CARD_DIR = Path(__file__).resolve().parent / 'data' / 'cards'


def _send_card_or_text(client, qq, kind, fallback):
    """表格型的回复**优先发一张卡**，拿不到卡就发 fallback() 的文本。

    哪些走卡、哪些走文本，判据是「这条回复是不是一张表」：
    订单 / 工单 / 预设 / 我的 是表；取件码、下单成功、各种提示都不是 ——
    在手机 QQ 里点开一张图比读一行字慢，一句话能说清的别做成图。

    fallback 传**函数**而不是字符串：只在真的要用时才去拼那串文本。
    """
    try:
        png = api.card(kind, qq)
    except api.ApiError as exc:
        log.warning('取卡片失败（%s），这条改发文本：%s', kind, exc)
        png = None
    if png:
        try:
            CARD_DIR.mkdir(parents=True, exist_ok=True)
            path = CARD_DIR / ('%s-%s.png' % (kind, uuid.uuid4().hex[:10]))
            with open(path, 'wb') as fh:
                fh.write(png)
            client.send_private_image(qq, path)
            return
        except Exception:  # noqa: BLE001 —— 发图这条路上任何一步失败，都别把消息吞掉
            log.exception('发卡片失败（%s），这条改发文本', kind)
    client.send_private_msg(qq, fallback())

_COPIES_ASK = '打几份？（回复数字，比如 1；发「取消」可以放弃）'
# 纸张是可选项：管理员没配纸张类型时这一步整个跳过（见 _consume_pending_answer），
# 配了才问 —— 没人用得到的选择题不该占一轮对话。
_SKIP_WORDS = ('跳过', '默认', '不指定', '不用', '跳', '0')


def _mode_menu(name, intro=None):
    """打印方式菜单。intro 让预设单和文件单共用这一屏（预设没有文件，
    改成「下单：打印服务「…」」更准确）；不传就是文件单的默认说法。"""
    intro = intro or '收到「%s」。'
    return ('%s\n打印方式？（回复数字）\n'
            ' 1. 黑白单面（默认）\n'
            ' 2. 黑白双面\n'
            ' 3. 彩色单面\n'
            ' 4. 彩色双面' % (intro % name))


def _mode_text(color, duplex):
    return '%s%s' % ('黑白' if color == 'black' else '彩色',
                    '单面' if duplex == 'single' else '双面')


def _papers_menu(papers):
    """纸张选择菜单。编号就是纸张的 id（可能不连续，菜单照实显示）。"""
    lines = ['要指定纸张吗？（回复编号；发「跳过」就用默认的）']
    for paper in papers:
        label = paper['name']
        if paper.get('remark'):
            label += '（%s）' % paper['remark']
        lines.append(' %s. %s' % (paper['paper_type_id'], label))
    return '\n'.join(lines)


def _human_bytes(num):
    """把字节数说成人话（设置页的用量、网页端也是这个口径）。"""
    try:
        value = float(num or 0)
    except (TypeError, ValueError):
        return '—'
    for unit in ('B', 'KB', 'MB', 'GB'):
        if value < 1024 or unit == 'GB':
            return ('%.0f %s' % (value, unit)) if unit == 'B' else ('%.1f %s' % (value, unit))
        value /= 1024.0
    return '%.1f GB' % value

# 推送游标与「已推过」清单存这里：重启之后接着推，不会把同一单推两遍。
_STATE_PATH = Path(__file__).resolve().parent / 'data' / 'state.json'
# notified 只是个防重集，不是账本：截断到最近 N 单，足够跨过任何一次重启。
_NOTIFIED_CAP = 500

# 当前活着的 OneBot 连接。WS 收帧在主线程，推送线程只持着它的引用发消息；
# 赋值是原子的，推送线程拿到的要么是旧连接要么是新连接，都是能用的
# （旧的断开了会被 OneBotError 打回，下一轮拿新的）。
_current_client = None


def setup_logging():
    """控制台 + 文件双出口，文件按 2MB 轮转、留 3 份。

    跟服务器那边一致的取舍：日志里**绝不出现消息正文和文件名**，
    出问题靠「QQ 号 + 动作」也完全够定位。
    """
    level = getattr(logging, config.LOG_LEVEL, logging.INFO)
    fmt = logging.Formatter('%(asctime)s [%(levelname)s] %(name)s %(message)s')
    root = logging.getLogger('printbot')
    root.setLevel(level)
    console = logging.StreamHandler()
    console.setFormatter(fmt)
    root.addHandler(console)
    log_dir = Path(__file__).resolve().parent / 'logs'
    log_dir.mkdir(exist_ok=True)
    file_handler = RotatingFileHandler(log_dir / 'printbot.log',
                                       maxBytes=2 * 1024 * 1024,
                                       backupCount=3, encoding='utf-8')
    file_handler.setFormatter(fmt)
    root.addHandler(file_handler)


def extract_text(message):
    """把 OneBot 的 message 字段抽成纯文本。

    消息格式有 string / array 两种（LLBot 配的是 array，但别赌它）：
    array 的每段长 {'type': 'text', 'data': {'text': '..'}}，
    图片、文件之类段没有 data.text，拼的时候自然被跳过。
    """
    if isinstance(message, str):
        return message
    if isinstance(message, list):
        parts = []
        for seg in message:
            if isinstance(seg, dict) and seg.get('type') == 'text':
                text = (seg.get('data') or {}).get('text')
                if text:
                    parts.append(text)
        return ''.join(parts)
    return ''


def extract_file(message):
    """取消息里的第一个附件段，返回 (段类型, 段数据)；没有就 (None, None)。

    段类型有两种都要认：
      - 'file'：QQ 里「发送文件」的附件（pdf / docx 等）；
      - 'image'：QQ 里直接发的图片。**图片不是文件附件**，段类型不同、
        data 里的字段也不同（file 是文件名、url 是带 rkey 的下载地址）——
        只认 'file' 的版本真机上把三张图片当成了「非命令」回帮助文本，
        这是实测抓出来的教训。
    字段名各实现略有出入（file_id / id / file 几种写法），取值留在
    _fetch_attachment 里按段类型分别处理。
    """
    if not isinstance(message, list):
        return None, None
    for seg in message:
        if isinstance(seg, dict) and seg.get('type') in ('file', 'image'):
            return seg.get('type'), (seg.get('data') or {})
    return None, None


def parse_command(text):
    """解析命令 → (命令, 参数)；不是命令返回 (None, '')。

    认三种写法：`/订单 2`（斜杠+中文）、`订单 2`（纯中文，首段整词匹配）、
    `/orders 2`（斜杠+英文别名）。**不带斜杠的英文不当命令** ——
    聊天里冒出个 orders 的概率比中文命令词小得多，不值得冒误吞的风险；
    带参中文命令允许紧贴（「取件码1234」）。
    """
    text = (text or '').strip()
    if not text:
        return None, ''
    prefixed = text[:1] in ('/', '／')
    if prefixed:
        text = text[1:].strip()
        if not text:
            return None, ''
    parts = text.split(None, 1)
    head = parts[0].lower() if prefixed else parts[0]
    rest = parts[1].strip() if len(parts) > 1 else ''

    if prefixed and head in _EN_ALIAS:
        return _EN_ALIAS[head], rest
    if head in _ZH_EXACT:
        return _ZH_EXACT[head], rest
    # 自由文本命令：命令词后面必须有分隔符（空格/冒号），见上面那张表的说明
    for word, command in _ZH_FREETEXT.items():
        if head == word:
            return command, rest
        for sep in ('：', ':'):
            if head.startswith(word + sep):
                tail = head[len(word) + len(sep):]
                return command, (tail + (' ' + rest if rest else '')).strip()
    if prefixed:
        # 斜杠 + 中文命令（/订单、／取件码 8）
        if head in _ZH_PREFIX:
            return _ZH_PREFIX[head], rest
        return None, ''
    # 纯中文带参命令：允许「取件码1234」「撤回13」这种紧贴写法。
    # 紧贴时要求后面紧跟数字（或没有参数）—— 否则「撤回消息怎么弄」这种
    # 聊天句会被当成「撤回」命令吞掉。
    for word, command in _ZH_PREFIX.items():
        if head == word:
            return command, rest
        if head.startswith(word) and len(head) > len(word):
            tail = head[len(word):]
            if not tail[:1].isdigit():
                continue
            return command, (tail + (' ' + rest if rest else ''))
    return None, ''


# 图片内容嗅探：QQ 图片的文件名经常是 hash.jpg，内容却可能是别的格式，
# 而服务器会校验「文件头 vs 扩展名」（对不上直接 400），所以按内容定后缀。
_IMAGE_SIGNATURES = ((b'\xff\xd8\xff', 'jpg'), (b'\x89PNG\r\n\x1a\n', 'png'))


def _sniff_image_ext(blob):
    for magic, ext in _IMAGE_SIGNATURES:
        if blob.startswith(magic):
            return ext
    return None


def _fetch_attachment(client, kind, data):
    """取回附件内容，返回 (字节数据, 文件名)。

    两条路的取值顺序不同：
      - 图片（image 段）：优先用段里自带的 url 直接下载（LLBot 会附上带 rkey
        的地址，实测有效）；其次本机路径；最后才走 get_file。
      - 文件（file 段）：走 get_file（本机路径优先，url 兜底）。
    """
    name = str(data.get('file_name') or data.get('name') or data.get('file') or '')
    if kind == 'image':
        url = data.get('url') or data.get('file_url')
        if url:
            with urllib.request.urlopen(str(url), timeout=60) as resp:
                return resp.read(), name
        local = data.get('file') or data.get('local_path')
        if local and os.path.exists(str(local)):
            with open(str(local), 'rb') as fh:
                return fh.read(), name

    file_id = data.get('file_id') or data.get('id') or data.get('file')
    if not file_id:
        raise OneBotError('这个附件段里没有可取的文件标识')
    info = client.call_action('get_file', {'file_id': file_id}) or {}
    local_path = info.get('file') or info.get('local_path')
    if local_path and os.path.exists(str(local_path)):
        with open(str(local_path), 'rb') as fh:
            return fh.read(), str(info.get('file_name') or info.get('name') or name)
    url = info.get('url') or info.get('file_url')
    if url:
        with urllib.request.urlopen(str(url), timeout=60) as resp:
            return resp.read(), str(info.get('file_name') or info.get('name') or name)
    raise OneBotError('取不到附件内容（既没有本机路径也没有下载地址）')


def _normalize_attachment_name(kind, name, blob):
    """给附件定一个「扩展名与内容对得上」的文件名；图片格式不认时返回 None。

    图片必须嗅探：QQ 图片常常名不副实，而服务器的内容校验（文件头 vs
    扩展名）对不上直接 400 —— 与其让用户看到「文件内容与扩展名不符」，
    不如在这里就把名字改对。文件附件保持原文件名，内容校验交给服务器。
    """
    base = os.path.basename((name or '').strip())
    if kind != 'image':
        return base or None
    ext = _sniff_image_ext(blob)
    if ext is None:
        return None
    stem = base.rsplit('.', 1)[0] if '.' in base else base
    return '%s.%s' % ((stem[:60] or 'QQ图片'), ext)


def _local_prelaunch_check(file_name, size):
    """本地预校验：扩展名白名单 + 非空 + 大小上限。

    返回错误文案（中文、直接可发给学生）或 None。放在国内机器上做，
    不合格的文件一个字节都不用往美国传 —— 这是整条链路最省钱的一道闸。
    """
    name = (file_name or '').strip()
    ext = name.rsplit('.', 1)[1].lower() if '.' in name else ''
    if ext not in config.ALLOWED_EXTENSIONS:
        return '这个文件类型（%s）打不了，目前支持：%s' % (
            ext or '无后缀', '、'.join(config.ALLOWED_EXTENSIONS))
    if size == 0:
        return '这个文件是空的，换一个再发'
    if size > config.MAX_UPLOAD_MB * 1024 * 1024:
        return '文件超过 %dMB 了，太大传不动；请压缩后分几次发，或到网页端上传' % config.MAX_UPLOAD_MB
    return None


def handle_file(client, qq, kind, data):
    """QQ 附件（图片或文件）→ 本地校验 → 暂存 → 追问打印参数。

    下载和校验放在提问之前：不合格的文件当场就拒（省一轮对话），
    合格的先落进暂存目录，等用户选完参数再上传建单。
    """
    try:
        blob, name = _fetch_attachment(client, kind, data)
    except (OneBotError, OSError) as exc:
        log.warning('取回附件失败 qq=%s kind=%s：%s', qq, kind, exc)
        hint = ''
        # 老版 LLBot 的 get_file 只支持 图片/视频/语音，「文件」附件会回
        # retcode 1200「不支持的文件类型」—— 这不是重发能解决的，
        # 得给用户一条走得通的路（截图/拍照当图片发）。
        if '不支持的文件类型' in str(exc):
            hint = '（当前机器人版本收不了「文件」附件，请把内容截图或拍照成图片发给我）'
        client.send_private_msg(qq, '文件没能取回来%s，请重新发一次' % hint)
        return
    name = _normalize_attachment_name(kind, name, blob)
    if name is None:
        client.send_private_msg(qq, '这张图片的格式打不了（只支持 JPG / PNG），'
                                    '换一张，或把文件当附件发过来')
        return
    problem = _local_prelaunch_check(name, len(blob))
    if problem:
        client.send_private_msg(qq, problem)
        return

    # 换新文件：旧的那份没选完就作废（同一时间只维护一份待办，少一种状态）。
    if _clear_pending(qq):
        client.send_private_msg(qq, '（上一份文件已作废，按新文件来）')
    PENDING_DIR.mkdir(parents=True, exist_ok=True)
    path = str(PENDING_DIR / ('%s_%d_%s' % (qq, int(time.time()),
                                            os.path.basename(name)[:80])))
    try:
        with open(path, 'wb') as fh:
            fh.write(blob)
    except OSError:
        log.exception('暂存文件失败 qq=%s', qq)
        client.send_private_msg(qq, '文件没能存下来，请重新发一次')
        return
    _pending[qq] = {'kind': 'file', 'path': path, 'name': name, 'intro': None,
                    'step': 'mode', 'color': None, 'duplex': None, 'copies': None,
                    'paper_type_id': None, 'paper_name': None, 'papers': None,
                    'remark': None, 'ts': time.time()}
    client.send_private_msg(qq, _mode_menu(name))


# ---- 参数追问的状态机 --------------------------------------------------------

def _remove_quiet(path):
    """删掉暂存文件，删不掉也不吵。

    ⚠️ 必须容忍 path 为空：**预设单没有文件**（`_pending[...]['path']` 就是 None），
    取消 / 超时清理走到这里时 `os.remove(None)` 抛的是 TypeError 而不是 OSError ——
    只 catch OSError 的写法会让「取消」整条流程崩掉，连回执都发不出去
    （表现：用户发「取消」石沉大海，日志里一条 TypeError）。实测踩过。
    """
    if not path:
        return
    try:
        os.remove(path)
    except OSError:
        pass


def _clear_pending(qq):
    """清掉某个 QQ 的待办（内存 + 磁盘），返回被清掉的那条（没有则 None）。"""
    entry = _pending.pop(qq, None)
    if entry:
        _remove_quiet(entry['path'])
    return entry


def _purge_pending_dir():
    """启动时清掉上一轮残留的暂存文件**和数据卡**。

    对话状态在内存里、重启即失效，这些文件不会再有主人认领 ——
    留着只会白占磁盘。返回清掉的数量（写进启动日志）。

    卡片是发完就没用的渲染快照（见 _send_card_or_text），一并清掉；
    两个目录都清，免得只清一个、另一个悄悄涨。
    """
    removed = 0
    for folder in (PENDING_DIR, CARD_DIR):
        try:
            for f in folder.glob('*'):
                try:
                    os.remove(f)
                    removed += 1
                except OSError:
                    pass
        except OSError:
            pass
    return removed


def _sweep_expired_pending(client):
    """超时未选参数的待办：删文件并告知本人（在推送循环里定期跑）。"""
    if not _pending:
        return
    now = time.time()
    for qq in list(_pending.keys()):
        entry = _pending.get(qq)
        if entry is None or now - entry['ts'] <= PENDING_TTL_SECONDS:
            continue
        _clear_pending(qq)
        try:
            client.send_private_msg(qq, '刚才发的「%s」还没选打印方式，已超时取消。\n'
                                        '要打印请重新发一次文件。' % entry['name'])
        except OneBotError:
            log.warning('超时提醒发送失败 qq=%s（连接不可用）', qq)


def _site_hint(resp):
    """身份类失败（没注册/停用/多账号）才附网页端地址 ——
    参数错误（400）附了也没用，反而让回复变啰嗦。"""
    if resp.get('code') in (403, 404, 409):
        return '\n（网页端：%s）' % config.SITE_URL
    return ''


def _ask_current(client, qq, entry):
    """按当前步骤把问题再发一遍（答案不合法、或用户中途设了备注时用）。"""
    if entry['step'] == 'mode':
        client.send_private_msg(qq, _mode_menu(entry['name'], entry.get('intro')))
    elif entry['step'] == 'copies':
        client.send_private_msg(qq, _COPIES_ASK)
    elif entry['step'] == 'paper':
        client.send_private_msg(qq, _papers_menu(entry['papers']))


def _fetch_papers():
    """拉纸张清单；失败就当作「没有纸张可选」——追问流程不该因为
    一个可选项的接口抖动而卡住，日志里留个痕即可。"""
    try:
        resp = api.print_options()
    except api.ApiError as exc:
        log.warning('拉纸张清单失败，本次跳过纸张选择：%s', exc)
        return []
    if resp.get('code') != 0:
        log.warning('拉纸张清单被拒：%s', resp.get('msg'))
        return []
    return resp.get('paper_types') or []


def _consume_pending_answer(client, qq, text):
    """把一条文本当成「参数追问」的回答处理。消费掉了返回 True。

    约定：**命令先于回答**（handle_event 里先 parse_command）——
    用户选到一半想查订单就发「订单」，不该被追问卡住。
    「备注 xxx」是**任何一步都能用的旁路**：记下备注、把当前问题重发一遍，
    不给流程增加必答步数（网页端也允许随时填备注）。
    """
    entry = _pending.get(qq)
    if entry is None:
        return False
    if time.time() - entry['ts'] > PENDING_TTL_SECONDS:
        _clear_pending(qq)
        client.send_private_msg(
            qq, '刚才那份文件等太久了（%d 分钟），已取消，请重新发一次。'
                % (PENDING_TTL_SECONDS // 60))
        return True
    answer = (text or '').strip()

    if answer.startswith('备注'):
        remark = answer[len('备注'):].strip()[:200]   # 与网页端同一长度上限
        if not remark:
            client.send_private_msg(qq, '备注要写成「备注 你的内容」，比如「备注 靠窗那台打印」。')
            return True
        entry['remark'] = remark
        entry['ts'] = time.time()
        client.send_private_msg(qq, '备注记下了：%s' % remark)
        _ask_current(client, qq, entry)
        return True

    if entry['step'] == 'mode':
        if answer in _MODE_MAP:
            entry['color'], entry['duplex'] = _MODE_MAP[answer]
            entry['step'] = 'copies'
            entry['ts'] = time.time()
            client.send_private_msg(qq, _COPIES_ASK)
        else:
            _ask_current(client, qq, entry)
        return True

    if entry['step'] == 'copies':
        if answer.isdigit() and 1 <= int(answer) <= 999:
            entry['copies'] = int(answer)
            entry['ts'] = time.time()
            papers = _fetch_papers()
            if papers:
                entry['papers'] = papers
                entry['step'] = 'paper'
                client.send_private_msg(qq, _papers_menu(papers))
            else:
                _submit_pending(client, qq, entry)
        else:
            client.send_private_msg(qq, '回复份数（数字，比如 1），或发「取消」放弃。')
        return True

    if entry['step'] == 'paper':
        if answer in _SKIP_WORDS:
            entry['paper_type_id'], entry['paper_name'] = None, None
            _submit_pending(client, qq, entry)
            return True
        if answer.isdigit():
            chosen = next((p for p in entry.get('papers') or []
                           if str(p['paper_type_id']) == answer), None)
            if chosen is not None:
                entry['paper_type_id'] = chosen['paper_type_id']
                entry['paper_name'] = chosen['name']
                _submit_pending(client, qq, entry)
                return True
        client.send_private_msg(qq, '回复菜单里的编号选纸张，或发「跳过」用默认的。')
        return True
    return False


def _submit_pending(client, qq, entry):
    """参数齐了：下单（文件单上传 / 预设单直接建）。成败都清掉待办。"""
    _pending.pop(qq, None)
    is_preset = entry.get('kind') == 'preset'
    blob = None
    if not is_preset:
        try:
            with open(entry['path'], 'rb') as fh:
                blob = fh.read()
        except OSError:
            _remove_quiet(entry['path'])
            client.send_private_msg(qq, '刚才那份文件没能读出来，请重新发一次。')
            return
    try:
        if is_preset:
            resp = api.order_preset(qq, entry['preset_id'],
                                    color=entry['color'], duplex=entry['duplex'],
                                    copies=entry.get('copies') or 1,
                                    paper_type_id=entry.get('paper_type_id'),
                                    remark=entry.get('remark'))
        else:
            resp = api.order_file(qq, entry['name'], blob,
                                  color=entry['color'], duplex=entry['duplex'],
                                  copies=entry.get('copies') or 1,
                                  paper_type_id=entry.get('paper_type_id'),
                                  remark=entry.get('remark'))
    except api.ApiError as exc:
        client.send_private_msg(qq, str(exc))
        return
    finally:
        if not is_preset:
            _remove_quiet(entry['path'])
    if resp.get('code') == 0:
        lines = ['下单成功：%s' % entry['name'],
                 '　%s，%s 份' % (_mode_text(entry['color'], entry['duplex']),
                                 entry.get('copies') or 1)]
        if entry.get('paper_name'):
            lines.append('　纸张：%s' % entry['paper_name'])
        if entry.get('remark'):
            lines.append('　备注：%s' % entry['remark'])
        lines.append('取件码：%s（订单 #%s）'
                     % (resp.get('pickup_code'), resp.get('order_id')))
        lines.append('订单进展在网页端看得更全：%s' % config.SITE_URL)
        client.send_private_msg(qq, '\n'.join(lines))
    else:
        client.send_private_msg(qq, '没有下成单：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


def reply_orders(client, qq):
    resp = api.orders(qq)
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    orders = resp.get('orders') or []
    if not orders:
        client.send_private_msg(qq, '你还没有订单，把要打的文件直接发我就行。\n'
                                    '（网页端也能下单：%s）' % config.SITE_URL)
        return
    def text():
        """纯文本版：卡片发不出去时的兜底，一个字都不能少。"""
        lines = ['你最近的 %d 单：' % len(orders)]
        for order in orders:
            price = order.get('price')
            price_text = '未计费' if price is None else ('%s 元' % price)
            lines.append('#%s｜%s｜取件码 %s｜%s\n　%s' % (
                order.get('order_id'), order.get('status'),
                order.get('pickup_code') or '—', price_text,
                order.get('title') or '（无标题）'))
        return '\n'.join(lines)

    _send_card_or_text(client, qq, 'orders', text)


def reply_code(client, qq, argument):
    if not argument or not argument.isdigit():
        client.send_private_msg(qq, '用法：取件码 订单号（比如「取件码 31」；'
                                    '订单号在「订单」列表里看）')
        return
    resp = api.code(qq, int(argument))
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    if resp.get('pickup_code') is None:
        client.send_private_msg(qq, str(resp.get('msg') or '这张单已经取件了'))
        return
    client.send_private_msg(qq, '订单 #%s（%s）的取件码：%s' % (
        argument, resp.get('status'), resp.get('pickup_code')))


def reply_preset(client, qq, argument):
    if not argument:
        resp = api.presets()
        if resp.get('code') != 0:
            client.send_private_msg(qq, str(resp.get('msg', '查询失败')))
            return
        presets = resp.get('presets') or []
        if not presets:
            client.send_private_msg(qq, '现在还没有可选的打印服务，把文件直接发我就行。\n'
                                        '（管理员可以在网页端添加服务：%s）' % config.SITE_URL)
            return
        def text():
            lines = ['可用的打印服务（回复「打印服务 编号」下单）：']
            for preset in presets:
                content = preset.get('content') or ''
                lines.append('　%s：%s' % (preset.get('preset_id'),
                                           content[:40] + ('…' if len(content) > 40 else '')))
            return '\n'.join(lines)

        _send_card_or_text(client, qq, 'presets', text)
        return
    if not argument.isdigit():
        client.send_private_msg(qq, '用法：「打印服务 编号」，比如「打印服务 2」。'
                                    '先发「打印服务」看看有哪些。')
        return
    # 选了编号：先确认这条预设还在，然后**进入和文件单一样的参数追问**
    #（网页端用预设下单时同样能选颜色/单双面/份数/纸张，这里对齐它）。
    resp = api.print_options()
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    preset_id = int(argument)
    preset = next((p for p in resp.get('presets') or []
                   if p.get('preset_id') == preset_id), None)
    if preset is None:
        client.send_private_msg(qq, '这个预设服务不存在了，发「打印服务」看看现在的清单。')
        return
    label = (preset.get('content') or '')[:40]
    if _clear_pending(qq):
        client.send_private_msg(qq, '（上一份待办已作废）')
    _pending[qq] = {'kind': 'preset', 'preset_id': preset_id, 'path': None,
                    'name': label, 'intro': '下单：打印服务「%s」。',
                    'step': 'mode', 'color': None, 'duplex': None, 'copies': None,
                    'paper_type_id': None, 'paper_name': None, 'papers': None,
                    'remark': None, 'ts': time.time()}
    client.send_private_msg(qq, _mode_menu(label, '下单：打印服务「%s」。'))


def reply_withdraw(client, qq, argument):
    """撤回第一步：只发确认口令、**不动任何数据**。

    为什么要第二道口令：撤回是删除类操作（订单记录 + 落盘文件一起没），
    网页端也有一个二次确认弹窗。QQ 里没法弹窗，就用「再说一遍完整命令」
    代替 —— 顺手也把订单号再核对一次。
    """
    if not argument or not argument.isdigit():
        client.send_private_msg(qq, '用法：「撤回 订单号」，比如「撤回 13」。\n'
                                    '只有还没被接单的单能撤回；撤回后订单记录和文件都会删除、'
                                    '不能恢复。发「订单」可以看单号。')
        return
    client.send_private_msg(qq, '订单撤回后不能恢复（记录和文件一并删除）。\n'
                                '确实要撤回 #%s，请回复：确认撤回 %s' % (argument, argument))


def reply_withdraw_confirm(client, qq, argument):
    if not argument or not argument.isdigit():
        client.send_private_msg(qq, '用法：「确认撤回 订单号」')
        return
    resp = api.withdraw_order(qq, int(argument))
    if resp.get('code') == 0:
        client.send_private_msg(qq, '订单 #%s 已撤回。' % argument)
    else:
        client.send_private_msg(qq, '撤回失败：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


def reply_announcement(client, qq):
    resp = api.announcement()
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')))
        return
    ann = resp.get('announcement')
    if not ann:
        client.send_private_msg(qq, '现在没有公告。\n网页端：%s' % config.SITE_URL)
        return
    client.send_private_msg(qq, '【公告】%s\n（%s · 网页端：%s）'
                            % (ann.get('content') or '', ann.get('update_time') or '—',
                               config.SITE_URL))


def reply_me(client, qq):
    resp = api.me(qq)
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    orders = resp.get('orders') or {}
    usage = resp.get('usage') or {}
    spent = orders.get('spent')

    def text():
        return '\n'.join([
            '%s 的打印概况：' % resp.get('nickname', '你'),
            '　我的单数：%s（进行中 %s · 待取件 %s · 已取件 %s）'
            % (orders.get('total', 0), orders.get('in_progress', 0),
               orders.get('ready', 0), orders.get('done', 0)),
            '　累计花费：%s' % ('还没有已计费的单' if not spent else '%.2f 元' % spent),
            '　存储用量：%s / %s（含未完成的分片）'
            % (_human_bytes(usage.get('used_bytes')), _human_bytes(usage.get('quota_bytes'))),
            '网页端「设置」里能看到完整明细：%s' % config.SITE_URL,
        ])

    _send_card_or_text(client, qq, 'me', text)


# ---- 工单（问题反馈）---------------------------------------------------------
# 网页端「问题反馈」是气泡对话；QQ 这边做等价的三件事：发起、看进展（含最新回复）、
# 回复。已关闭的工单不能在 QQ 里续（与网页端一致：要先重新打开），
# 这一句直接转达服务器的话，不另编文案。

_TICKET_STATUS_TEXT = {'open': '进行中', 'closed': '已关闭'}


def reply_feedback(client, qq, argument):
    """发起工单。标题从内容开头取（QQ 里让用户分两步填标题太啰嗦）。"""
    body = (argument or '').strip()
    if len(body) < 2:
        client.send_private_msg(qq, '用法：「反馈 你的问题」，比如「反馈 3 号机打出来有黑边」。\n'
                                    '（网页端「问题反馈」可以带上订单详情：%s）'
                                % config.SITE_URL)
        return
    subject = body.replace('\n', ' ')[:20]
    resp = api.ticket_create(qq, subject, body[:1000])
    if resp.get('code') == 0:
        client.send_private_msg(qq, '已提交给管理员（工单 #%s）。\n'
                                    '有回复我会告诉你，也可以发「工单」看进展。'
                                % resp.get('ticket_id'))
    else:
        client.send_private_msg(qq, '没能提交：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


def reply_tickets(client, qq):
    resp = api.tickets(qq)
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    rows = resp.get('tickets') or []
    if not rows:
        client.send_private_msg(qq, '你还没有工单。有问题发「反馈 你的问题」，管理员会看到。\n'
                                    '网页端：%s' % config.SITE_URL)
        return
    def text():
        rows_out = ['你的工单（最近 %d 条）：' % len(rows)]
        for t in rows:
            unread = '（有新回复）' if t.get('unread') else ''
            rows_out.append('#%s｜%s%s｜%s' % (
                t.get('ticket_id'),
                _TICKET_STATUS_TEXT.get(t.get('status'), t.get('status')),
                unread, (t.get('subject') or '')[:20]))
            last_text = (t.get('last_body') or '').replace('\n', ' ')
            if last_text:
                rows_out.append('　最新：%s' % (last_text[:50] + ('…' if len(last_text) > 50 else '')))
        rows_out.append('要接着聊：发「回复工单 单号 内容」。')
        return '\n'.join(rows_out)

    _send_card_or_text(client, qq, 'tickets', text)


def reply_ticket_reply(client, qq, argument):
    parts = (argument or '').split(None, 1)
    if len(parts) < 2 or not parts[0].isdigit():
        client.send_private_msg(qq, '用法：「回复工单 单号 内容」，比如「回复工单 3 已经取到了」。\n'
                                    '单号发「工单」能看到。')
        return
    resp = api.ticket_reply(qq, int(parts[0]), parts[1].strip()[:1000])
    if resp.get('code') == 0:
        client.send_private_msg(qq, '已回复工单 #%s，管理员会看到。' % parts[0])
    else:
        client.send_private_msg(qq, '没能回复：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


def handle_event(client, event):
    """事件分发：只理私聊。任何异常都在 _route_frame 外层兜底。"""
    if event.get('post_type') != 'message' or event.get('message_type') != 'private':
        return
    qq = str(event.get('user_id') or '')
    if not config.QQ_RE.match(qq):
        return
    if qq == client.self_id:
        return  # 自己发出的消息（开了 reportSelfMessage 时会出现），别自问自答

    kind, data = extract_file(event.get('message'))
    if kind:
        log.info('收到附件 qq=%s 类型=%s name=%s', qq, kind,
                 (data.get('file_name') or data.get('file') or '(无文件名)'))
        handle_file(client, qq, kind, data)
        return

    text = extract_text(event.get('message'))
    command, argument = parse_command(text)
    # 留痕：谁、什么时候、用了哪个命令。**不记消息正文**（正文可能有闲聊和隐私），
    # 非命令消息只留一句「非命令」——运维需要的是「这个 QQ 在用机器人」这件事。
    log.info('私聊消息 qq=%s 命令=%s', qq, command or '(非命令)')

    if command is None:
        # 不是命令：先看是不是「打印参数追问」的回答（选了数字/份数）。
        if _consume_pending_answer(client, qq, text):
            return
        # 也不是回答。带斜杠却认不出 = 想执行命令但写错了，明确说「不认识」；
        # 不带斜杠的就是普通聊天，只回帮助（让他知道发文件就能下单）。
        if text.strip()[:1] in ('/', '／'):
            client.send_private_msg(qq, '这个命令我不认识。\n' + HELP_TEXT)
        else:
            client.send_private_msg(qq, HELP_TEXT)
        return

    try:
        if command == 'help':
            client.send_private_msg(qq, HELP_TEXT)
        elif command == 'orders':
            reply_orders(client, qq)
        elif command == 'code':
            reply_code(client, qq, argument)
        elif command == 'preset':
            reply_preset(client, qq, argument)
        elif command == 'me':
            reply_me(client, qq)
        elif command == 'announce':
            reply_announcement(client, qq)
        elif command == 'tickets':
            reply_tickets(client, qq)
        elif command == 'feedback':
            reply_feedback(client, qq, argument)
        elif command == 'ticket_reply':
            reply_ticket_reply(client, qq, argument)
        elif command == 'withdraw':
            reply_withdraw(client, qq, argument)
        elif command == 'withdraw_confirm':
            reply_withdraw_confirm(client, qq, argument)
        elif command == 'cancel':
            # 命令优先于追问，所以「取消」在这里收口：
            # 有没有待办都有一句明确的回答，不让人猜。
            if _clear_pending(qq):
                client.send_private_msg(qq, '已取消这份文件的打印。')
            else:
                client.send_private_msg(qq, '现在没有正在进行的操作。')
        else:
            client.send_private_msg(qq, '这个命令我不认识。\n' + HELP_TEXT)
    except api.ApiError as exc:
        # 命令处理里的网络错误在这里统一兜底：服务器暂时够不着，
        # 也要给人回一句话，而不是让消息掉进没有回应的黑洞。
        try:
            client.send_private_msg(qq, str(exc))
        except OneBotError:
            log.warning('回话失败（连接不可用）qq=%s', qq)


# ---- 「可取了」自动推送 -----------------------------------------------------

def _load_state():
    """读游标与已推清单。文件坏了当没存过（重新从 0 扫一遍顶多重复推一次，
    比丢通知强）；没有 data 目录就顺手建一个。"""
    try:
        with open(_STATE_PATH, 'r', encoding='utf-8') as fh:
            state = json.load(fh)
        return int(state.get('cursor', 0)), set(state.get('notified') or [])
    except (OSError, ValueError, TypeError):
        return 0, set()


def _save_state(cursor, notified):
    _STATE_PATH.parent.mkdir(exist_ok=True)
    tmp = str(_STATE_PATH) + '.tmp'
    try:
        with open(tmp, 'w', encoding='utf-8') as fh:
            json.dump({'cursor': cursor,
                       'notified': sorted(notified)[-_NOTIFIED_CAP:]}, fh)
        # 先写临时文件再改名：中途断电不会留下半份 state.json。
        os.replace(tmp, _STATE_PATH)
    except OSError:
        log.exception('推送游标保存失败（不影响消息收发，只是重启后可能重复推）')


def _notify_loop():
    """每 EVENTS_POLL_SECONDS 拉一次「该通知谁」，逐个私聊推送。

    游标推进规则：**全部推成功才推进**。推到一半连接挂了的话，
    保持旧游标，下一轮从同一批重拉 —— 已推过的那几单靠 notified
    集合去重，不会因为重拉而收到第二条。
    """
    cursor, notified = _load_state()
    while True:
        time.sleep(config.EVENTS_POLL_SECONDS)
        client = _current_client
        if client is None:
            continue
        # 顺手巡检「发了文件但一直没选参数」的待办：超时就删文件并提醒本人。
        # 搭在这条循环上而不是单开线程：都是一分钟级的家务活，省一个线程。
        _sweep_expired_pending(client)
        try:
            resp = api.events(cursor)
        except api.ApiError:
            continue  # 服务器够不着：下轮再拉，游标不动
        if not isinstance(resp, dict) or resp.get('code') != 0:
            continue
        for ev in resp.get('events') or []:
            if ev.get('order_id') in notified:
                continue
            text = ('你的订单「%s」可以取件了！\n取件码：%s（订单 #%s）\n'
                    '取件时报这个码就行。'
                    % (ev.get('title') or '打印件', ev.get('pickup_code') or '—',
                       ev.get('order_id')))
            try:
                client.send_private_msg(str(ev.get('qq')), text)
            except OneBotError:
                log.warning('推送中断（连接不可用），游标保持 %s', cursor)
                break
            log.info('已推送「可取了」通知：订单 #%s → qq=%s', ev.get('order_id'), ev.get('qq'))
            notified.add(ev.get('order_id'))
        else:
            # for 没被 break 才走这里：这一批全推完了，游标才推进。
            cursor = int(resp.get('cursor', cursor))
        if len(notified) > _NOTIFIED_CAP:
            notified = set(sorted(notified)[-_NOTIFIED_CAP // 2:])
        _save_state(cursor, notified)


def run():
    """主循环：连上 → 收帧，断了就退避重连。**永不主动退出**。

    部署形态（大纲第 8 节）是任务计划 / systemd 拉起后放养，
    所以进程内部必须自己扛住一切故障：WS 断了重连、服务器 502 了
    重试、QQ 客户端重启了等它回来。退避从 1 秒翻倍到 60 秒封顶 ——
    对面真不在的话，1 秒一次的重连只会给本机日志刷屏。
    """
    global _current_client

    if not config.BOT_TOKEN:
        log.error('BOT_TOKEN 没有配置（printbot/.env）。这张票就是 bot 的全部身份，'
                  '没有它服务器只会回 401/503，先去服务器那边生成再启动。')
        return 2

    # 启动自检：链路不通就别进 WS 循环白转（大纲第 9 节：第 3 步之前不写业务）。
    try:
        resp = api.ping()
    except api.ApiError as exc:
        log.error('启动自检失败：%s', exc)
        return 2
    if resp.get('code') != 0:
        log.error('启动自检被拒：code=%s msg=%s', resp.get('code'), resp.get('msg'))
        return 2
    log.info('服务器可达：%s（%s）', config.API_BASE, resp.get('msg'))
    purged = _purge_pending_dir()
    if purged:
        # 对话状态在内存里，重启即失效 —— 上轮留下的暂存文件不会再有人认领。
        log.info('清理了上一轮残留的 %s 个待打印暂存文件', purged)

    threading.Thread(target=_notify_loop, daemon=True,
                     name='notify-poll').start()

    backoff = 1
    while True:
        client = OneBotClient(config.ONEBOT_WS, config.ONEBOT_ACCESS_TOKEN)
        client.on_event = lambda event, c=client: handle_event(c, event)
        try:
            client.connect()
        except OneBotError as exc:
            log.warning('连不上 OneBot：%s；%s 秒后重试', exc, backoff)
            time.sleep(backoff)
            backoff = min(backoff * 2, 60)
            continue

        _current_client = client
        log.info('已连接 OneBot：%s，等待私聊消息', config.ONEBOT_WS)
        backoff = 1  # 连上过一次就复位：断开重连的间隔不该越滚越大
        try:
            client.recv_forever()
        except OneBotError as exc:
            log.warning('连接结束：%s；%s 秒后重连', exc, backoff)
        finally:
            client.close()
            if _current_client is client:
                _current_client = None
        time.sleep(backoff)
        backoff = min(backoff * 2, 60)


def main():
    setup_logging()
    sys.exit(run())


if __name__ == '__main__':
    main()
