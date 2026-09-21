"""printbot 入口：连 OneBot 的 WS，把私聊消息变成对服务器的一次调用。

身份模型（产品决策 2026-09-20）：**QQ 号就是身份**。用户注册时在网页
填过 QQ 号，私聊里发消息的 user_id（OneBot 登录态给的，伪造不了）
就是账号凭证 —— 没有验证码、没有密码。服务器按 QQ 找不到账号时会
回引导文案，这里原样转达。

命令面：
  发文件      → 直接下单（本地预校验扩展名/大小，不合格一个字节都不跨洋）
  /preset     → 看有哪些预设打印服务；/preset 编号 → 按那条服务下单
  /orders     → 最近的订单和状态（含单号）
  /code 单号 → 查某一单（单号即句柄）
  /help       → 这份说明

「订单可取件」自动推送：后台线程按 EVENTS_POLL_SECONDS 轮询
/api/bot/events，游标存本地文件，重启不丢不重（详见 _notify_loop）。

铁律（QQbot对接大纲.md 第 0 节）：
  - 只理**私聊**，群消息一律忽略 —— 单号出现在群里等于任何人都能冒领；
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

# 使用说明**不再本地维护**：服务端存结构（config 里那份 BOT_HELP_SECTIONS），
# 机器人拿它拼文本、服务端拿它画卡片 —— 两边各存一份必然漂移，而且不报错。
# 这里只留一句「够不着服务器」时的兜底：帮助恰恰是网络不好时最想看到的东西。
HELP_OFFLINE = ('机器人暂时连不上服务器，稍后再试一次。' + chr(10) +
                               '网页端也能下单和查单：%s' % config.SITE_URL)


def render_help_text(sections):
    """把服务端给的帮助结构拼成文本（卡片的文本兜底走这条路）。"""
    lines = ['我是打印服务的机器人，直接用就行：']
    marks = '①②③④⑤⑥⑦⑧⑨'
    for i, section in enumerate(sections or []):
        title = section.get('title') or ''
        if title:
            lines.append('%s %s' % (marks[i] if i < len(marks) else '-', title))
        for item in section.get('items') or []:
            lines.append('　 「%s」%s' % (item.get('cmd') or '', item.get('desc') or ''))
    lines.append('更完整的操作（指定纸张、改参数、看公告）在网页端：')
    lines.append(config.SITE_URL)
    return '\n'.join(lines)


# ---- 偏好设置（用户偏好）-------------------------------------------------------
# 一条总览 + 几条直改。**偏好存在服务端**（routes/bot.py 的 /api/bot/prefs），
# 机器人这边只负责解析与展示 —— 客户端存一份的话，换台机器/重装就丢了，
# 而且服务端发提醒时看不到这份偏好。
_TRUE_WORDS = ('开', '打开', '是', 'on', '开启', '要', '1')
_FALSE_WORDS = ('关', '关掉', '关闭', '否', 'off', '不要', '0')


def _parse_switch(text):
    """把「开/关」解析成 True/False；认不出来返回 None。"""
    text = (text or '').strip().lower()
    if text in _TRUE_WORDS:
        return True
    if text in _FALSE_WORDS:
        return False
    return None


def _prefs_cache_clear(qq):
    """改完偏好要立刻生效（不然 60 秒缓存里还是旧的，用户会以为没改上）。"""
    _prefs_cache.pop(str(qq), None)


def reply_settings(client, qq):
    """「设置」：把当前偏好说清楚 + 教怎么改。"""
    resp = api.prefs(qq)
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    lines = ['你的偏好：']
    lines += ['　· ' + line for line in resp.get('lines') or []]
    lines.append('')
    lines.append('改法：「通知 关」「邮件 开」「免打扰 22:00-08:00」「免打扰 关」')
    lines.append('　　　「隐藏已取件 开」「卡片 关」「每页 8」「默认 黑白双面 2份」')
    lines.append('网页端「设置」里能改同一份偏好：%s' % config.SITE_URL)
    client.send_private_msg(qq, chr(10).join(lines))


def _save_pref(client, qq, fields, ok_text):
    resp = api.save_prefs(qq, fields)
    if resp.get('code') != 0:
        client.send_private_msg(qq, '没能保存：%s' % resp.get('msg', '未知原因'))
        return False
    _prefs_cache_clear(qq)
    client.send_private_msg(qq, ok_text)
    return True


def reply_pref_switch(client, qq, which, argument):
    """「通知 开/关」「邮件 开/关」「隐藏已取件 开/关」「卡片 开/关」。"""
    value = _parse_switch(argument)
    if value is None:
        client.send_private_msg(qq, '用法：「%s 开」或「%s 关」' % (which, which))
        return
    labels = {
        'pref_notify': ('notify_qq', 'QQ 取件推送'),
        'pref_mail': ('notify_mail', '邮件提醒'),
        'pref_hide': ('hide_done_orders', '订单列表里隐藏已取件'),
        'pref_card': ('card_replies', '表格类查询用卡片回复'),
    }
    field, label = labels[which]
    _save_pref(client, qq, {field: value}, '%s已%s。' % (label, '开启' if value else '关闭'))


def reply_pref_quiet(client, qq, argument):
    """「免打扰 22:00-08:00」/「免打扰 关」。"""
    text = (argument or '').strip()
    if not text:
        client.send_private_msg(qq, '用法：「免打扰 22:00-08:00」，或「免打扰 关」')
        return
    if text in _FALSE_WORDS or text in ('无', '取消'):
        _save_pref(client, qq, {'quiet_from': '', 'quiet_to': ''}, '免打扰已关闭。')
        return
    # 分隔符容忍中英文横线与波浪线（手机上打成什么都可能）
    for sep in ('-', '~', '—', '–', '到', '至'):
        if sep in text:
            start, _, end = text.partition(sep)
            break
    else:
        client.send_private_msg(qq, '要写成「免打扰 22:00-08:00」这样。')
        return
    start, end = start.strip(), end.strip()
    #    ⚠️ 保存失败时**别**再补一句「时间要写成 22:00」：失败可能只是网络不通、
    #    也可能是「两头一样」，跟格式无关 —— 那句瞎猜的话会和真正的错误信息打架
    #    （对话审计抓到的）。格式问题在发请求之前就该拦（见上）。
    _save_pref(client, qq, {'quiet_from': start, 'quiet_to': end},
               '免打扰已设为 %s - %s：这段时间的提醒会攒着，过后再发。' % (start, end))


def reply_pref_size(client, qq, argument):
    """「每页 N」：订单列表一次给几条。"""
    if not (argument or '').strip().isdigit():
        client.send_private_msg(qq, '用法：「每页 8」（3-20 条之间）')
        return
    resp = api.save_prefs(qq, {'orders_page_size': int(argument)})
    if resp.get('code') != 0:
        client.send_private_msg(qq, '没能保存：%s' % resp.get('msg', '未知原因'))
        return
    _prefs_cache_clear(qq)
    saved = (resp.get('prefs') or {}).get('orders_page_size')
    client.send_private_msg(qq, '订单列表改成每次 %s 条（允许范围 3-20）。' % saved)


def reply_pref_default(client, qq, argument):
    """「默认 3 双面 2份」：把常用下单参数记下来，下次下单时当默认值。

    只认关键词，不认顺序：**价目项编号**（下单菜单里那个号）、「单面」「双面」、
    「N 份」随便怎么排。

    ⚠️ 这里**不再认「黑白/彩色」**（v20 起）：颜色由价目项本身决定
    （「A4 70g · 黑白」这一条就是黑白）。再留一个"默认颜色"就会与价目项打架，
    而打架时谁赢都说不清 —— 所以那条关键词不认了，并且明说为什么，
    而不是静默忽略（用户会以为设上了）。
    """
    text = (argument or '').strip()
    if not text:
        client.send_private_msg(
            qq, '用法：「默认 3 双面 2份」（3 是下单菜单里那一档的编号）；发「默认 清空」去掉。')
        return
    if text in ('清空', '取消', '无'):
        _save_pref(client, qq, {'default_duplex': '', 'default_copies': None,
                                'default_price_item_id': None},
                   '默认下单参数已清空，以后每次都会问你。')
        return
    fields = {}
    if '双面' in text:
        fields['default_duplex'] = 'double'
    elif '单面' in text:
        fields['default_duplex'] = 'single'
    if '黑白' in text or '彩色' in text:
        client.send_private_msg(
            qq, '黑白还是彩色现在由**价目项**决定（比如「A4 70g · 黑白」这一档），'
                '所以不用单独设默认颜色 —— 把常打的那一档设成默认就行：'
                '发「默认 3 2份」，把 3 换成你那一档的编号。')
        return
    digits = ''.join(ch if ch.isdigit() else ' ' for ch in text).split()
    if digits:
        #    两个数字时的约定：**第一个是价目项编号、最后一个是份数** ——
        #    与「默认 3 双面 2份」的读法一致（编号在前、份数在后）。
        #    只给一个数字时按份数算：「默认 2份」是更常见的用法，
        #    而回执里会把认成什么原样念一遍，认错了用户当场看得见。
        if len(digits) >= 2:
            fields['default_price_item_id'] = int(digits[0])
            fields['default_copies'] = int(digits[-1])
        else:
            fields['default_copies'] = int(digits[0])
    if not fields:
        client.send_private_msg(qq, '没认出要设什么。用法：「默认 3 双面 2份」'
                                    '（价目项编号、单面/双面、几份，随便怎么排）')
        return
    resp = api.save_prefs(qq, fields)
    if resp.get('code') != 0:
        client.send_private_msg(qq, '没能保存：%s' % resp.get('msg', '未知原因'))
        return
    _prefs_cache_clear(qq)
    lines = ['默认打印参数已记下：']
    lines += ['　· ' + line for line in (resp.get('lines') or []) if '默认' in line]
    lines.append('以后下单（在这里发文件、或在网页端）都会按这几项预填，'
                 '下单时仍然可以现改；菜单里也会标出「你的默认」。')
    client.send_private_msg(qq, chr(10).join(lines))


# 偏好缓存的时长（秒）。取 10 而不是 60：用户在**网页设置页**改了「卡片关」
# 之后，机器人这边最多 10 秒就跟上（原先 60 秒，用户会以为没生效）。
# 这是一次很轻的 GET，代价可以忽略。
PREF_CACHE_TTL = 10


def _prefs_cache_get(qq):
    """偏好（带 PREF_CACHE_TTL 秒缓存）。

    「要不要发卡片」是**呈现方式**，得由机器人自己决定，所以这里要读一次偏好；
    其余偏好（通知开关、免打扰、隐藏已取件、条数）都在服务端生效，机器人不用管。
    另外「默认打印参数」也走这里：菜单里标「你的默认」、回「默认」时套用它。
    """
    key = str(qq)
    now = time.time()
    cached = _prefs_cache.get(key)
    if cached and now - cached[0] < PREF_CACHE_TTL:
        return cached[1]
    data = {}
    try:
        resp = api.prefs(qq)
        if resp.get('code') == 0:
            data = resp.get('prefs') or {}
    except api.ApiError:
        # 够不着服务器时按默认来（发卡）——门面偏好不值得让消息发不出去
        data = {}
    _prefs_cache[key] = (now, data)
    return data


# 「这个 QQ 有没有账号」**只有肯定答案**会被缓存，时长 60 秒。
# 它挡在每条带附件的消息前面，缓存是为了省掉那次纯只读的查询。
# ⚠️ **否定答案不缓存**（下面 if problem is None 那半句就是这个意思）：
# 一个学生刚在网页端注册完、回头就发文件，缓存里那句「还没注册」会把他顶回来 ——
# 而他刚刚才被告知「注册好了就能用」，这一句自相矛盾的话没人查得出来。
# 否定的情形（陌生人发文件）本来也不该继续往下走，每次多一次查询换正确性，值。
IDENTITY_CACHE_TTL = 60
_identity_cache = {}


def _identity_error(qq):
    """这个 QQ 有没有对应账号：没有就回一句给用户看的话，有（或问不到）回 None。

    为什么要提前问一次：没注册的号发文件，原先会**走完整个追问流程**
    （问打印方式 → 问份数 → 问纸张），直到最后一步提交时才被服务端顶回来
    「还没有账号关联这个 QQ 号」—— 用户白答了三轮，看起来像机器人坏了，
    而且他完全不知道问题出在哪（用户实测报上来的「换个号就区别对待」里
    也含着这一层：注册过的号一切正常，没注册的号处处碰壁）。

    判据用 **/api/bot/orders**（「订单」那条命令）而不是更新更轻的 /api/bot/prefs：
    它和别的 bot 接口走同一道身份闸门（routes/bot.py 的 _resolve_bot_user），
    403/404/409 回的就是身份问题的原话；而它从第一个版本就在，
    换过服务器版本也不会出现「接口本身 404 → 被当成『你没注册』」这种误判。
    （这条误判会很难查：用户明明注册过，机器人却一口咬定他没注册。）

    **够不着服务器时一律放行**（返回 None）：那种情况不该拦人，
    后面提交时还会照常报错，而把「网络不通」说成「你没注册」是更坏的错。
    """
    key = str(qq)
    now = time.time()
    cached = _identity_cache.get(key)
    if cached and now - cached[0] < IDENTITY_CACHE_TTL:
        return cached[1]
    problem = None
    try:
        resp = api.orders(qq)
        if resp.get('code') in (403, 404, 409):
            problem = resp.get('msg') or '这个 QQ 号还没有对应的账号'
    except api.ApiError:
        problem = None
    if problem is None:
        # 只有「确实有账号」才记缓存（理由见上面 IDENTITY_CACHE_TTL 那段）
        _identity_cache[key] = (now, None)
    else:
        _identity_cache.pop(key, None)
    return problem


def reply_help(client, qq, prefix=''):
    """发使用说明：优先发卡片，取不到卡就用服务端的结构拼文本。

    prefix 是「这个命令我不认识。」这类前置话术 —— 它只在文本那条路上有意义
    （卡片本身就是一份完整的说明书，前面再加一句反而怪）。**例外**：prefix 非空时
    一律走文本 —— 用户刚打错一个命令，该先看到「我不认识」再看说明书。
    """
    #    「卡片 关」的人一律纯文本：这是呈现偏好，帮助这条也得看它。
    #    原先只有 `_send_card_or_text` 那条路看这个偏好，帮助绕过了它（一致性审计抓到）。
    if prefix or not _prefs_cache_get(qq).get('card_replies', True):
        png = None
    else:
        try:
            png = api.card('help', qq)
        except api.ApiError:
            png = None
    if png:
        try:
            CARD_DIR.mkdir(parents=True, exist_ok=True)
            path = CARD_DIR / ('help-%s.png' % uuid.uuid4().hex[:10])
            with open(path, 'wb') as fh:
                fh.write(png)
            client.send_private_image(qq, path)
            return
        except Exception:  # noqa: BLE001
            log.exception('发帮助卡片失败，改发文本')
    try:
        resp = api.help_sections()
        if resp.get('code') == 0:
            client.send_private_msg(qq, prefix + render_help_text(resp.get('sections')))
            return
    except api.ApiError:
        pass
    client.send_private_msg(qq, prefix + HELP_OFFLINE)

log = logging.getLogger('printbot')

# ---- 命令面：中文为主，斜杠英文保留作兼容别名 --------------------------------
# 用户要求以中文命令为主（发「订单」「单号 8」…）；斜杠英文（/orders 等）
# 是之前就有的写法，留作别名 —— 老用户照旧能用，帮助里只教中文。
# 中文命令分两类：
#   - 整词命令（订单/帮助/取消…）：首段必须**完全相等**才算命令，
#     「订单还没好吗」这种聊天句首段不等于「订单」，不会被误吞；
#   - 带参命令（单号/打印服务）：允许紧贴参数（「单号1234」），
#     中文输入不带空格太常见，要求空格等于逼用户改打字习惯。
_ZH_EXACT = {
    '帮助': 'help', '说明': 'help', '菜单': 'help',
    # 偏好：一条总览 + 几条直改（见 reply_settings / reply_pref_set）
    # 「通知」**不进精确表**：它同时是「设置」的口语说法和「通知 开/关」那条开关命令。
    # 放进精确表的话，「通知 关」会先被精确匹配吃掉、参数被丢掉 ——
    # 用户照着帮助里的「通知 开/关」发，得到的却是设置总览（文案与实现对不上）。
    # 现在：光发「通知」走前缀表、回一句用法；「通知 关」正常改开关。
    '设置': 'settings', '偏好': 'settings',
    '订单': 'orders', '我的订单': 'orders', '查订单': 'orders',
    # 「价目表」：整词命令（「价目表多少钱」不会被误吞，首段不等于它）
    '价目表': 'price', '价目': 'price',
    '我的': 'me', '概况': 'me',
    '公告': 'announce',
    '工单': 'tickets',
    '取消': 'cancel',
}
_ZH_PREFIX = {
    # 2026-09-21：用户面前只保留一个标识 —— **单号**（5 位数字、首位非 0，下单时生成）。
    # 命令词跟着显示名走（两套词会冒出「撤回单号 1234」这种混搭），
    # 但「单号」留作兼容别名：老消息、老习惯里这么写的还认。
    #    「取件码」是从前的叫法（改名前的文档、老师傅的口头习惯里都还有）：
    #    留着当别名，免得老用户一开口就撞「不认识」。
    '单号': 'code', '取件码': 'code', '取件号': 'code', '查件': 'code',
    '打印服务': 'preset', '服务': 'preset',
    # 「撤回」是删除类操作，做成两道口令：撤回 13（给提示）→ 确认撤回 13（执行）。
    # 两句都走同一条前缀规则，数字紧贴也认（「撤回13」）。
    '撤回': 'withdraw', '确认撤回': 'withdraw_confirm',
    # 回复工单：单号紧贴也认（「回复工单3 已经取到了」）
    '回复工单': 'ticket_reply',
    # ---- 偏好设置（一条「设置」看总览，几条直改）----
    # 这些的参数是「开/关」「22:00-08:00」这类非数字，所以只能写成
    # 「命令 参数」（带空格）—— 紧贴形式按解析规则会被当成聊天句，那正是我们要的。
    '通知': 'pref_notify', '推送': 'pref_notify',
    '邮件': 'pref_mail',
    '免打扰': 'pref_quiet',
    '隐藏已取件': 'pref_hide', '隐藏完成': 'pref_hide',
    '卡片': 'pref_card',
    '每页': 'pref_size',
    '默认': 'pref_default',
    '快捷键': 'pref_help',
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

# 单双面：**不再是"打印方式"菜单**（那一步把颜色和单双面捆在一起，
# 而 v20 起颜色由价目项决定）。现在它是一道独立的小选择题，只在该档支持双面时才问。
_DUPLEX_MAP = {'1': 'single', '2': 'double'}

# 份数上限。⚠️ 必须与服务端 `config.COPIES_MAX` 一致 —— printbot 是自包含包
# （不 import 项目模块），所以这里只能各写一份，改的时候两边一起改。
COPY_MAX = 50

# 渲染好的数据卡落这儿（启动时统一清一次）。**别发完就删**：框架那边是拿到文件、
# 发完才回执的，抢在中间删会发出一张白图 —— 一张几十 KB，留着更稳。
CARD_DIR = Path(__file__).resolve().parent / 'data' / 'cards'

# 偏好缓存：qq -> (取到的时间, 偏好字典)。见 _prefs_cache_get 的说明。
_prefs_cache = {}


def _send_card_or_text(client, qq, kind, fallback):
    """表格型的回复**优先发一张卡**，拿不到卡就发 fallback() 的文本。

    哪些走卡、哪些走文本，判据是「这条回复是不是一张表」：
    订单 / 工单 / 预设 / 我的 是表；单号、下单成功、各种提示都不是 ——
    在手机 QQ 里点开一张图比读一行字慢，一句话能说清的别做成图。

    fallback 传**函数**而不是字符串：只在真的要用时才去拼那串文本。
    """
    # 「卡片 关」的人一律给文本：这是呈现偏好，得由机器人自己看
    if not _prefs_cache_get(qq).get('card_replies', True):
        client.send_private_msg(qq, fallback())
        return
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

_COPIES_ASK = '打几份？（回复数字，最多 %d 份；发「取消」可以放弃）' % COPY_MAX
# 纸张是可选项：管理员没配纸张类型时这一步整个跳过（见 _consume_pending_answer），
# 配了才问 —— 没人用得到的选择题不该占一轮对话。
_SKIP_WORDS = ('跳过', '默认', '不指定', '不用', '跳', '0')


def _items_menu(items, name=None, intro=None, defaults=None):
    """价目项菜单：**下单要选的就是这一条**（纸张 + 类型，自带单价）。

    intro 让预设单和文件单共用这一屏（预设没有文件，改成「下单：打印服务「…」」
    更准确）；不传就是文件单的默认说法。

    `defaults` 是用户的偏好（「默认 3 2份」设过的那份）。设过就在对应那条后面
    标一句「你的默认」、并允许直接回「默认」—— 否则那条命令只写不读，
    而回执里却说「下次下单时当默认值」，等于骗人（偏好审计抓到的）。

    每行把**单价**写出来：这一屏是学生下单时唯一一次看到价格的地方，
    不写的话他只能盲选（价目表本身是另一条命令，不是每个人都会去发）。
    """
    intro = intro or '收到「%s」。'
    default_id = (defaults or {}).get('default_price_item_id')
    rows = []
    for item in items:
        mark = '（你的默认）' if default_id and item['price_item_id'] == default_id else ''
        price = '单面 %.2f' % item['price_single']
        if item.get('price_double') is not None:
            price += ' / 双面 %.2f' % item['price_double']
        rows.append(' %s. %s（%s）%s'
                    % (item['price_item_id'], item['label'], price, mark))
    head = intro % name if name else ''
    tail = '选哪一档？（回复编号%s；发「价目表」看完整价目与说明，发「取消」可以放弃）' % (
        '，或回「默认」' if default_id else '')
    return '\n'.join([head, tail] + rows).strip()


def _duplex_menu():
    """单双面。**只在那一档支持双面时才问**（相纸那一档没有双面）。"""
    return '要单面还是双面？（回复 1 单面 / 2 双面；发「取消」可以放弃）'


def _duplex_text(duplex):
    return '双面' if duplex == 'double' else '单面'


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
    带参中文命令允许紧贴（「单号1234」）。
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
        # 斜杠 + 中文命令（/订单、／单号 8）
        if head in _ZH_PREFIX:
            return _ZH_PREFIX[head], rest
        return None, ''
    # 纯中文带参命令：允许「单号1234」「撤回13」这种紧贴写法。
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
        #    提了网页端就把链接给上：同一份文件里其它提到网页端的地方都带 SITE_URL，
        #    只有这里光说「到网页端上传」，用户还得自己找地址（对话审计）。
        return ('文件超过 %dMB 了，太大传不动；请压缩后分几次发，'
                '或到网页端上传：%s' % (config.MAX_UPLOAD_MB, config.SITE_URL))
    return None


def handle_file(client, qq, kind, data):
    """QQ 附件（图片或文件）→ 本地校验 → 暂存 → 追问打印参数。

    下载和校验放在提问之前：不合格的文件当场就拒（省一轮对话），
    合格的先落进暂存目录，等用户选完参数再上传建单。
    """
    #    身份也放在**下载之前**问一次：没注册的号不该让他答完三轮再被拒
    #    （见 _identity_error 的说明）。放在取附件之前还顺带省下一次
    #    下载 —— 那份文件反正也用不上。
    problem = _identity_error(qq)
    if problem:
        client.send_private_msg(qq, problem)
        return
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
                    'step': 'item', 'price_item_id': None, 'item_label': None,
                    'item_supports_duplex': False, 'duplex': None, 'copies': None,
                    'remark': None, 'ts': time.time()}
    items = _fetch_price_items()
    entry = _pending[qq]
    entry['items'] = items
    if items:
        client.send_private_msg(qq, _items_menu(items, name, defaults=_prefs_cache_get(qq)))
    else:
        #    管理员还没配价目表：不能装作没这回事（学生选了档却算不出价）。
        #    明说一句，然后**照常下单** —— 金额本来就由管理员核定。
        #    duplex 也要在这里定成单面：留 None 的话回执与状态里会是个空值，
        #    而服务端照样兜成单面 —— 两边说的不是同一件事。
        entry['duplex'] = 'single'
        entry['step'] = 'copies'
        client.send_private_msg(
            qq, '收到「%s」。\n管理员还没配置价目表，这一单先按老规矩提交、'
                '金额由管理员核定。\n%s' % (name, _COPIES_ASK))


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


def _timeout_text(entry):
    """超时取消的话术。**要看卡在哪一步、以及是不是预设单**：

    · 卡在份数/纸张的人早就选过打印方式了，跟他说「还没选打印方式」是错的；
    · 预设单没有文件，「刚才那份文件」也就不成立（它要重新发的是「打印服务 N」）。
    """
    preset = entry.get('kind') == 'preset'
    step_text = {'mode': '还没选打印方式', 'copies': '还没回份数',
                 'paper': '还没选纸张'}.get(entry.get('step'), '还没选完参数')
    if preset:
        return ('刚才那单「%s」%s，已超时取消。\n要打请重新发「打印服务 %s」。'
                % (entry.get('name'), step_text, entry.get('preset_id') or '编号'))
    return ('刚才发的「%s」%s，已超时取消。\n要打印请重新发一次文件。'
            % (entry.get('name'), step_text))


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
            client.send_private_msg(qq, _timeout_text(entry))
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
    if entry['step'] == 'item':
        client.send_private_msg(qq, _items_menu(entry.get('items') or [],
                                                entry.get('name'), entry.get('intro'),
                                                defaults=_prefs_cache_get(qq)))
    elif entry['step'] == 'duplex':
        client.send_private_msg(qq, _duplex_menu())
    elif entry['step'] == 'copies':
        client.send_private_msg(qq, _COPIES_ASK)


def _fetch_price_items():
    """拉价目表；失败就当作「没有价目项」——追问流程不该因为一个接口抖动而卡住，
    日志里留个痕即可。

    ⚠️ 一条都没有时**不能悄悄放行**：那意味着学生选了档却算不出价
    （服务端会回「这一单没选价目项」）。所以调用方要明确说一句
    「管理员还没配价目表，这一单按老规矩由管理员核定金额」，而不是装作没这回事。
    """
    try:
        resp = api.print_options()
    except api.ApiError as exc:
        log.warning('拉价目表失败，本次不带价目项下单：%s', exc)
        return []
    if resp.get('code') != 0:
        log.warning('拉价目表被拒：%s', resp.get('msg'))
        return []
    return resp.get('price_items') or []


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
        #    剥掉分隔符：用户很自然写成「备注：靠窗」，不剥的话备注值会带着那个冒号
        #    （管理员在订单台上看到「：靠窗」只会莫名其妙）。
        remark = answer[len('备注'):].lstrip('：: \t').strip()[:200]   # 与网页端同一长度上限
        if not remark:
            client.send_private_msg(qq, '备注要写成「备注 你的内容」，比如「备注 靠窗那台打印」。')
            return True
        entry['remark'] = remark
        entry['ts'] = time.time()
        client.send_private_msg(qq, '备注记下了：%s' % remark)
        _ask_current(client, qq, entry)
        return True

    if entry['step'] == 'item':
        #    「默认 3 2份」设过就要真的用上：那条命令原先只写不读，
        #    回执里却说「下次下单时当默认值」（偏好审计抓到的）。
        if answer in ('默认', '默认值'):
            now = _prefs_cache_get(qq)
            default_id = now.get('default_price_item_id')
            chosen = next((p for p in entry.get('items') or []
                           if p['price_item_id'] == default_id), None)
            if chosen is None:
                client.send_private_msg(
                    qq, '你还没设过默认价目项（或者它已经被管理员停用了）。'
                        '发「默认 3 2份」可以设一个 —— 3 是上面菜单里的编号。')
                return True
            if _apply_item(client, qq, entry, chosen) and now.get('default_copies'):
                #    份数也设过就一路套到底，直接下单（不再问单双面：默认单双面
                #    在 _apply_item 里已经套上了）
                entry['copies'] = int(now['default_copies'])
                _submit_pending(client, qq, entry)
            return True
        if answer.isdigit():
            chosen = next((p for p in entry.get('items') or []
                           if str(p['price_item_id']) == answer), None)
            if chosen is not None:
                _apply_item(client, qq, entry, chosen)
                return True
        client.send_private_msg(
            qq, '没看懂「%s」—— 回复上面菜单里的编号选一档，'
                '或发「价目表」看完整价目，发「取消」放弃。' % (answer or '')[:20])
        _ask_current(client, qq, entry)
        return True

    if entry['step'] == 'duplex':
        if answer in _DUPLEX_MAP:
            entry['duplex'] = _DUPLEX_MAP[answer]
            entry['ts'] = time.time()
            entry['step'] = 'copies'
            client.send_private_msg(qq, _COPIES_ASK)
        else:
            client.send_private_msg(qq, '回复 1（单面）或 2（双面），或发「取消」放弃。')
            _ask_current(client, qq, entry)
        return True

    if entry['step'] == 'copies':
        #    ⚠️ 上限必须与服务端 config.COPIES_MAX 一致（这里收 999 的话，
        #    用户在最后一步才会被 400 顶回来 —— 而那时暂存文件已经删了，
        #    他得把整份文件重发一遍）。
        if answer.isdigit() and 1 <= int(answer) <= COPY_MAX:
            entry['copies'] = int(answer)
            entry['ts'] = time.time()
            _submit_pending(client, qq, entry)
        else:
            client.send_private_msg(qq, '回复份数（数字，比如 1），或发「取消」放弃。')
        return True

        return True
    return False


def _apply_item(client, qq, entry, chosen):
    """把选中的价目项装进待办，并推进到下一步（单双面 或 份数）。返回是否已提交。

    两条分支合在一处，是因为**同一档的后续问法必须一致**：
    支持双面 → 问单双面；不支持（相纸那一档）→ 直接问份数，
    并把 duplex 定成 single。分开写的话，迟早出现「走默认那条路时不问单双面、
    手选编号时又问」这种一半对一半的行为差异。
    """
    entry['price_item_id'] = chosen['price_item_id']
    entry['item_label'] = chosen['label']
    entry['item_supports_duplex'] = bool(chosen.get('supports_duplex'))
    entry['ts'] = time.time()
    if not entry['item_supports_duplex']:
        #    不支持双面的档（相纸）：不问那一句，也不留一个能传出 double 的状态 ——
        #    服务端也会兜（resolve_price_item 会强制成 single），两处一致。
        entry['duplex'] = 'single'
        entry['step'] = 'copies'
        client.send_private_msg(
            qq, '「%s」不支持双面，按单面算。\n%s' % (chosen['label'], _COPIES_ASK))
        return False
    #    默认单双面设过就直接套上、跳过这一问（与「默认」命令的承诺一致）
    default_duplex = _prefs_cache_get(qq).get('default_duplex')
    if default_duplex in ('single', 'double'):
        entry['duplex'] = default_duplex
        entry['step'] = 'copies'
        client.send_private_msg(
            qq, '「%s」· 你的默认%s。\n%s'
                % (chosen['label'], _duplex_text(default_duplex), _COPIES_ASK))
        return False
    entry['step'] = 'duplex'
    client.send_private_msg(qq, '「%s」\n%s' % (chosen['label'], _duplex_menu()))
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
                                    duplex=entry['duplex'],
                                    copies=entry.get('copies') or 1,
                                    price_item_id=entry.get('price_item_id'),
                                    remark=entry.get('remark'))
        else:
            resp = api.order_file(qq, entry['name'], blob,
                                  duplex=entry['duplex'],
                                  copies=entry.get('copies') or 1,
                                  price_item_id=entry.get('price_item_id'),
                                  remark=entry.get('remark'))
    except api.ApiError as exc:
        client.send_private_msg(qq, str(exc))
        return
    finally:
        if not is_preset:
            _remove_quiet(entry['path'])
    if resp.get('code') == 0:
        lines = ['下单成功：%s' % entry['name'],
                 '　%s，%s 份' % (_duplex_text(entry['duplex']),
                                 entry.get('copies') or 1)]
        if entry.get('item_label'):
            lines.append('　价目项：%s' % entry['item_label'])
        if entry.get('remark'):
            lines.append('　备注：%s' % entry['remark'])
        # 预估价：服务端按下单时的文件页数算的（预设单没有文件，拿到的是 null）。
        # **「预估」两个字不能省** —— 最终金额由管理员看过文件之后核定，
        # 学生掏钱时得知道这个数还不是账单。
        est = resp.get('est_price')
        if isinstance(est, (int, float)):
            lines.append('　预估 %.2f 元（以管理员核定为准）' % est)
        # 只给单号：它是取件时报的号，也是查单/撤回时引用的号
        lines.append('单号：%s' % resp.get('pickup_code'))
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
        lines = ['你最近的 %d 单（单号｜状态｜金额）：' % len(orders)]
        for order in orders:
            price = order.get('price')
            #    两位小数：卡片、邮件、网页端都是这个口径，文本缺了就会
            #    「卡上 1.50 元、文字里 1.5 元」看着像两笔钱（一致性审计）
            price_text = '未计费' if price is None else ('%.2f 元' % price)
            # 只给单号：它既是取件时报的号，也是查单/撤回时引用的号
            lines.append('%s｜%s｜%s\n　%s' % (
                order.get('pickup_code') or '—', order.get('status'), price_text,
                order.get('title') or '（无标题）'))
        lines.append('查某一单：发「单号 25124」；撤回还没接单的单：发「撤回 25124」。')
        return '\n'.join(lines)

    _send_card_or_text(client, qq, 'orders', text)


def reply_code(client, qq, argument):
    """查一张单：**单号即句柄**（2026-09-21 起不再有内部编号）。"""
    if not argument or not argument.isdigit():
        #    别写死位数（升过一次位：4 → 5）：写成例子就够了，
        #    写「4 位」会让拿着 5 位单号的人以为自己的号不对。
        client.send_private_msg(qq, '用法：「单号 25124」（下单时给你的那串数字；'
                                    '忘了就发「订单」看列表）')
        return
    resp = api.order(qq, argument)
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    if resp.get('pickup_code') is None:
        client.send_private_msg(qq, '单号 %s：%s'
                                    % (argument, resp.get('msg') or '这张单已经取件了'))
        return
    client.send_private_msg(qq, '单号 %s：%s%s' % (
        resp.get('pickup_code'), resp.get('status'),
        '，可以来取了' if resp.get('status') == config.ST_READY else ''))


def reply_price(client, qq):
    """「价目表」：把当前价目与说明发出去（优先一张卡，卡发不出去就发文本）。

    卡片只画**价目**（那几行数才是要一眼扫到的），说明文字（「注」）随后单独发一条
    纯文本 —— 它是几句能读、能复制的话，塞进图里反而没法选中。
    两者都取不到时（服务器够不着）给一句兜底，绝不发一张空白图。
    """
    try:
        resp = api.price_table()
    except api.ApiError as exc:
        client.send_private_msg(qq, '价目表暂时取不到（%s）。%s'
                                    % (exc, _site_hint({})))
        return
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    items = resp.get('items') or []
    notes = (resp.get('notes') or '').strip()
    if not items:
        client.send_private_msg(
            qq, '管理员还没配置价目表。\n下单时直接发文件就行，金额由管理员核定。\n'
                '（网页端：%s）' % config.SITE_URL)
        return

    def text():
        lines = ['价目表（回复下单菜单里的编号选一档）：']
        for item in items:
            price = '单面 %.2f' % item['price_single']
            if item.get('price_double') is not None:
                price += ' / 双面 %.2f' % item['price_double']
            else:
                price += ' / 不支持双面'
            lines.append('　%s. %s（%s）' % (item['price_item_id'], item['label'], price))
            if item.get('note'):
                lines.append('　　　%s' % item['note'])
        return '\n'.join(lines)

    _send_card_or_text(client, qq, 'price', text)
    if notes:
        # 说明单独一条：它可能有好几条，跟在图后面读起来才顺
        client.send_private_msg(qq, '说明：\n' + notes)


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
                    'step': 'item', 'price_item_id': None, 'item_label': None,
                    'item_supports_duplex': False, 'duplex': None, 'copies': None,
                    'remark': None, 'ts': time.time()}
    items = _fetch_price_items()
    entry = _pending[qq]
    entry['items'] = items
    if items:
        client.send_private_msg(qq, _items_menu(items, label, '下单：打印服务「%s」。',
                                                defaults=_prefs_cache_get(qq)))
    else:
        entry['step'] = 'copies'
        client.send_private_msg(
            qq, '下单：打印服务「%s」。\n管理员还没配置价目表，这一单先按老规矩提交、'
                '金额由管理员核定。\n%s' % (label, _COPIES_ASK))


def reply_withdraw(client, qq, argument):
    """撤回第一步：只发确认口令、**不动任何数据**。

    为什么要第二道口令：撤回是删除类操作（订单记录 + 落盘文件一起没），
    网页端也有一个二次确认弹窗。QQ 里没法弹窗，就用「再说一遍完整命令」
    代替 —— 顺手也把订单号再核对一次。
    """
    if not argument or not argument.isdigit():
        client.send_private_msg(qq, '用法：「撤回 25124」（把例子换成你的单号）。\n'
                                    '只有还没被接单的单能撤回；撤回后订单记录和文件都会删除、'
                                    '不能恢复。发「订单」可以看到自己的单号。')
        return
    client.send_private_msg(qq, '撤回后不能恢复（订单记录和文件一并删除）。\n'
                                '确实要撤回单号 %s，请回复：确认撤回 %s' % (argument, argument))


def reply_withdraw_confirm(client, qq, argument):
    if not argument or not argument.isdigit():
        client.send_private_msg(qq, '用法：「确认撤回 单号」')
        return
    resp = api.withdraw_order(qq, argument)
    if resp.get('code') == 0:
        client.send_private_msg(qq, '单号 %s 已撤回。' % argument)
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
        client.send_private_msg(qq, '已提交给管理员（工单 %s）。\n'
                                    '有回复我会告诉你，也可以发「工单」看进展。'
                                % resp.get('ticket_id'))
    else:
        client.send_private_msg(qq, '没能提交：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


def reply_tickets(client, qq):
    #    ⚠️ **卡片要先取**。服务端「看列表即已读」：`api.tickets` 与卡片接口都会把
    #    这个账号的工单标成已读，而「未读」是在**标记之前**算的。
    #    所以先调 `api.tickets` 的话，紧接着取的卡片里 unread 全是 0 ——
    #    卡片上永远看不到「有新回复」，而文本兜底反而看得到（一致性审计抓到的）。
    #    现在：卡片先取（它就是主要那条路），只有发不出卡才回退去取文本，
    #    那时代价是文本里没有「有新回复」标记 —— 反正用户正在看这份列表。
    if _prefs_cache_get(qq).get('card_replies', True):
        try:
            png = api.card('tickets', qq)
        except api.ApiError:
            png = None
        if png:
            try:
                CARD_DIR.mkdir(parents=True, exist_ok=True)
                path = CARD_DIR / ('tickets-%s.png' % uuid.uuid4().hex[:10])
                with open(path, 'wb') as fh:
                    fh.write(png)
                client.send_private_image(qq, path)
                return
            except Exception:  # noqa: BLE001
                log.exception('发工单卡片失败，改发文本')
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
            rows_out.append('工单 %s｜%s%s｜%s' % (
                t.get('ticket_id'),
                _TICKET_STATUS_TEXT.get(t.get('status'), t.get('status')),
                unread, (t.get('subject') or '')[:20]))
            last_text = (t.get('last_body') or '').replace('\n', ' ')
            if last_text:
                rows_out.append('　最新：%s' % (last_text[:50] + ('…' if len(last_text) > 50 else '')))
        rows_out.append('要接着聊：发「回复工单 单号 内容」。')
        return '\n'.join(rows_out)

    client.send_private_msg(qq, text())


def reply_ticket_reply(client, qq, argument):
    parts = (argument or '').split(None, 1)
    if len(parts) < 2 or not parts[0].isdigit():
        client.send_private_msg(qq, '用法：「回复工单 单号 内容」，比如「回复工单 3 已经取到了」。\n'
                                    '单号发「工单」能看到。')
        return
    resp = api.ticket_reply(qq, int(parts[0]), parts[1].strip()[:1000])
    if resp.get('code') == 0:
        client.send_private_msg(qq, '已回复工单 %s，管理员会看到。' % parts[0])
    else:
        client.send_private_msg(qq, '没能回复：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


# 像「在回答追问」的短消息：数字、跳过、取消、默认一类。用来把「我这边没有待办」
# 从「普通聊天」里分出来，好回一句有用的话，而不是甩一整篇帮助。
_ANSWER_LIKE = ('跳过', '取消', '取消吧', '算了', '默认', '默认值')


def _looks_like_answer(text):
    text = (text or '').strip()
    return text.isdigit() or text in _ANSWER_LIKE


def _pending_mode_step(qq):
    """这个 QQ 是不是正卡在「选打印方式」那一步。"""
    entry = _pending.get(str(qq))
    if not entry:
        return False
    if time.time() - (entry.get('ts') or 0) > PENDING_TTL_SECONDS:
        return False
    return entry.get('step') == 'mode'


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
    #    ⚠️ 待办状态里回「默认」要先于命令解析：菜单上写着「或回「默认」」，
    #    而 `parse_command('默认')` 会把它当成设置默认参数那条命令（命令优先于追问），
    #    于是用户按提示回「默认」会收到一条用法说明 —— 菜单在教一个走不通的写法
    #    （对话审计抓到的）。这里只拦**待办处在选打印方式那一步 + 整词是「默认」**，
    #    其余情况一律照旧走命令。
    if text.strip() in ('默认', '默认值') and _pending_mode_step(qq):
        if _consume_pending_answer(client, qq, text.strip()):
            return
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
            reply_help(client, qq, '这个命令我不认识。' + chr(10))
        elif _looks_like_answer(text):
            #    「看着像在回答追问、其实我这边没有待办」——最典型的场景是机器人
            #    **刚重启**（待办存在内存里，重启就没了）。这时甩一整篇帮助等于装傻，
            #    用户只会以为机器人坏了（对话审计抓到的）。
            client.send_private_msg(
                qq, '我这边没有正在进行的下单了 —— 多半是刚才那份文件过期了'
                    '（或者我重启过，待办不保留）。\n麻烦把文件重新发一次，'
                    '我马上再问一遍打印方式和份数。')
        else:
            reply_help(client, qq)
        return

    try:
        if command == 'help':
            reply_help(client, qq)
        elif command == 'orders':
            reply_orders(client, qq)
        elif command == 'price':
            reply_price(client, qq)
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
        elif command == 'settings':
            reply_settings(client, qq)
        elif command in ('pref_notify', 'pref_mail', 'pref_hide', 'pref_card'):
            reply_pref_switch(client, qq, command, argument)
        elif command == 'pref_quiet':
            reply_pref_quiet(client, qq, argument)
        elif command == 'pref_size':
            reply_pref_size(client, qq, argument)
        elif command == 'pref_default':
            reply_pref_default(client, qq, argument)
        elif command == 'pref_help':
            reply_settings(client, qq)
        elif command == 'cancel':
            # 命令优先于追问，所以「取消」在这里收口：
            # 有没有待办都有一句明确的回答，不让人猜。
            if _clear_pending(qq):
                client.send_private_msg(qq, '已取消这份文件的打印。')
            else:
                client.send_private_msg(qq, '现在没有正在进行的操作。')
        else:
            reply_help(client, qq, '这个命令我不认识。' + chr(10))
    except api.ApiError as exc:
        # 命令处理里的网络错误在这里统一兜底：服务器暂时够不着，
        # 也要给人回一句话，而不是让消息掉进没有回应的黑洞。
        try:
            client.send_private_msg(qq, str(exc))
        except OneBotError:
            log.warning('回话失败（连接不可用）qq=%s', qq)


# ---- 「可取件」自动推送 -----------------------------------------------------

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
            text = ('你的订单「%s」可以取件了！\n单号：%s\n'
                    '取件时报这个号就行。'
                    % (ev.get('title') or '打印件', ev.get('pickup_code') or '—'))
            try:
                client.send_private_msg(str(ev.get('qq')), text)
            except OneBotError:
                log.warning('推送中断（连接不可用），游标保持 %s', cursor)
                break
            log.info('已推送「可取件」通知：订单 #%s → qq=%s', ev.get('order_id'), ev.get('qq'))
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
