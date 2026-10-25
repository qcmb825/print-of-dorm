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

import collections
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

from . import api, config, llm, nlu
from .onebot import OneBotClient, OneBotError

# 使用说明**不再本地维护**：服务端存结构（config 里那份 BOT_HELP_SECTIONS），
# 机器人拿它拼文本、服务端拿它画卡片 —— 两边各存一份必然漂移，而且不报错。
# 这里只留一句「够不着服务器」时的兜底：帮助恰恰是网络不好时最想看到的东西。
# ⚠️ 兜底也要**有用**：只回一句「稍后再试」等于什么都没说，所以它会把本地认识的
# 命令列一遍（清单从命令表生成，见 _local_help_lines —— 手抄一份必然出现
# 「帮助里教了、解析表里没有」的旧流程，用户照着做才发现机器人不认识）。
def help_offline_text():
    """服务器够不着时的兜底帮助（命令清单与解析表同源）。"""
    lines = ['机器人暂时连不上服务器，稍后再试一次。',
             '这些命令我认识（服务器恢复后照常可用）：']
    lines += _local_help_lines()
    lines.append('要下单：等服务器恢复后把文件重发一次，要求写在同一条消息里就行，')
    lines.append('　例「黑白 2份」「第 2 份彩色」「A4 80g 双面」「都双面」。')
    lines.append('网页端也能下单和查单：%s'
                 % (config.SITE_URL or '地址请向管理员索取'))
    return chr(10).join(lines)



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
        client.send_private_msg(qq, '没能保存：%s\n稍后再发一次这条命令就行。'
                                    % resp.get('msg', '未知原因'))
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
    size = _digit_arg(argument)
    if size is None:
        client.send_private_msg(qq, '用法：「每页 8」（3-20 条之间）')
        return
    resp = api.save_prefs(qq, {'orders_page_size': size})
    if resp.get('code') != 0:
        client.send_private_msg(qq, '没能保存：%s\n稍后再发一次这条命令就行。'
                                    % resp.get('msg', '未知原因'))
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
        client.send_private_msg(qq, '没能保存：%s\n稍后再发一次这条命令就行。'
                                    % resp.get('msg', '未知原因'))
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

# 身份闸门回的三种 code，各对应**学生下一步要做的不同事**：
#   404 = 这个 QQ 还没注册/绑定 → 去注册（给可直接点的地址）；
#   403 = 账号被停用/注销     → 找管理员，不是再注册一遍（注册也过不了闸门）；
#   409 = 一个 QQ 命中多个账号 → 找管理员合并，学生自己无论怎么试都过不去。
_IDENTITY_CODES = (403, 404, 409)


def _site_line(label='网页端'):
    """带站点链接的一行；SITE_URL 没配时给一句能执行的替代话（不留空括号）。"""
    if config.SITE_URL:
        return '%s：%s' % (label, config.SITE_URL)
    return '网页端地址请向管理员索取。'


def _register_hint(qq):
    """「还没注册」时给学生的可执行路径。

    注册**没有独立路由**：登录与注册是同一个页面上的两个页签
    （frontend/src/views/LoginView.vue），路由表里只有 `/login`。
    所以链接只能给 `/login`，并且必须在话里点明「切到注册那一栏」——
    否则学生打开只看到登录框，会以为没有注册入口（这正是主人要求「一眼看明白」的由来）。
    SITE_URL 在 config.py 里已经 rstrip('/')，这里自己补 `/login`，不会拼出 `//login`。
    """
    if not config.SITE_URL:
        return ('先到打印服务网站注册一个账号再来找我：注册时把 QQ 填成 %s（就是你现在这个号），'
                '注册完直接回来发文件就行。' % qq)
    return ('先注册一个账号再来找我：%s/login（打开后切到「注册」那一栏）\n'
            '注册时把 QQ 填成 %s（就是你现在这个号），注册完直接回来发文件就行。'
            % (config.SITE_URL, qq))


def _identity_text(code, qq):
    """身份类失败的学生话术。**每条都要说清下一步做什么**，不暴露 code。"""
    if code == 404:
        return '你这个 QQ 还没注册/绑定账号，这一单不会落到任何账号上。\n' + _register_hint(qq)
    if code == 403:
        return ('这个 QQ 对应的账号现在用不了（被停用或已注销），不是重注册能解决的。\n'
                '请联系管理员帮你看一下账号状态，恢复之后直接回来发文件就行。\n'
                + _site_line())
    if code == 409:
        return ('这个 QQ 同时绑定了好几个账号，我这边分不出该用哪一个，所以先停下不动作。\n'
                '请联系管理员帮你合并成一个账号（只留一个），之后回来发文件就行。\n'
                + _site_line())
    return '这个 QQ 号现在不能用，请联系管理员。'


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
    try:
        resp = api.orders(qq)
    except api.ApiError:
        #    够不着服务器：**放行，也不写缓存**。把「网络不通」说成「你没注册」是
        #    更坏的错；而缓存一个「有账号」会在服务器恢复之后继续骗自己 60 秒。
        return None
    code = resp.get('code')
    if code in _IDENTITY_CODES:
        #    服务器原话只进日志：学生看到的是人话（见 _identity_text），
        #    运维要的是 code 与原文 —— 两边各取所需，不混在一句里。
        log.info('身份闸门拦下 qq=%s code=%s msg=%s', qq, code, resp.get('msg'))
        _identity_cache.pop(key, None)
        return _identity_text(code, qq)
    #    只有「确实有账号」才记缓存（理由见上面 IDENTITY_CACHE_TTL 那段）
    _identity_cache[key] = (now, None)
    return None


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
    client.send_private_msg(qq, prefix + help_offline_text())

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

# 离线兜底帮助里的每条命令 + 一句人话。
# **命令词必须真的在上面那三张表里**（_local_help_lines 会过滤），
# 否则就成了「帮助里教了、机器人不认识」——比不给帮助更糟。
# 也不许写已经删掉的旧流程：打印参数早就改成**一句话说完**（「黑白 2份」），
# 「先回打印方式、再回份数」那套三连问不存在了。
_COMMAND_HINTS = (
    ('订单', '最近的订单和状态（含单号）'),
    ('单号', '查一张单，例「单号 25124」'),
    ('撤回', '撤回还没被接单的单（两道口令：「撤回 25124」→「确认撤回 25124」）'),
    ('打印服务', '看可选的打印服务；「打印服务 2」就是按第 2 条下单'),
    ('价目表', '当前价目与说明'),
    ('我的', '单数、累计花费、存储用量'),
    ('公告', '看当前公告'),
    ('工单', '看工单进展'),
    ('反馈', '发起工单，例「反馈 3 号机打出来有黑边」'),
    ('回复工单', '接着聊，例「回复工单 3 已经取到了」'),
    ('设置', '看偏好与改法'),
    ('通知', '「通知 开」/「通知 关」：QQ 取件推送'),
    ('邮件', '「邮件 开」/「邮件 关」：邮件提醒'),
    ('免打扰', '「免打扰 22:00-08:00」/「免打扰 关」'),
    ('每页', '「每页 8」：机器人订单列表一次给几条'),
    ('默认', '「默认 3 双面 2份」：记住常用的下单参数'),
    ('取消', '放弃这一批，什么都不下'),
    ('帮助', '这份说明'),
)


def _local_help_lines():
    """把 _COMMAND_HINTS 里**解析表真的认识**的命令拼成几行。

    末尾再补一条**不是命令**的说明：这一批的规矩（一次发多份 → 一张单）。
    它进不了 _COMMAND_HINTS —— 那张表会被「命令词是否被解析表认识」过滤掉，
    塞进去就被静默滤走了；而不说这一条，学生一口气发三份会以为要拿三个单号。
    """
    known = set(_ZH_EXACT) | set(_ZH_PREFIX) | set(_ZH_FREETEXT)
    lines = ['　「%s」%s' % (word, desc)
             for word, desc in _COMMAND_HINTS if word in known]
    lines.append('　发文件：一次最多 %d 份，合成一张单、只给一个单号。'
                 % config.BATCH_MAX_FILES)
    return lines


# ---- 批量下单：文件怎么收、要求怎么听、什么时候下单 --------------------------
#
# 状态：qq → {
#     'kind': 'file' | 'preset',
#     'preset_id' / 'preset_content'：预设单才有（「打印服务 3」那条路），
#     'files': [{'path','name','size','spec'}]，   spec 见下（没定就是 None），
#     'items': [...],          本批用的价目项快照（一次请求拉回来，全批共用），
#     'remark': str | None,
#     'asked_at' / 'reminders'：上一次追问的时刻与次数（排提醒用），
#     'ts': 最后一次活动时刻（新文件、新消息都会刷新）。
# }
#
# **没有「步骤」这个概念了**（2026-09-28）。老流程是一串单选题：
# 打印方式 → 份数 → 纸张，学生要回好几次数字，而他要说的其实一句话就能说完
# （「黑白 2份」）。现在是：每份文件带一个可选的 spec，
# **全批都定下来了就下单**，没定下来才问一次 —— 问的那一次也允许直接回「好」
# 按默认参数成交。spec 的形状就是 nlu.resolve_spec 的返回值：
# {'price_item_id', 'label', 'color', 'duplex', 'copies', 'assumed'}。
#
# 状态存在内存里：printbot 重启后这份对话就没了，但暂存的文件在磁盘上，
# 启动时统一清理，用户重发即可（超时与丢失都有明确话术）。
_pending = {}
PENDING_DIR = Path(__file__).resolve().parent / 'data' / 'pending'

#    `_pending` 会被**两个线程**同时摸：事件线程（handle_attachments /
#    handle_event）与推送线程（_sweep_expired_pending 里到点作废）。原先既没有锁、
#    也不刷新 ts，于是会出现：大文件还在下载 → 巡检按 300 秒判超时 → 删掉暂存文件 →
#    事件线程下载完再把同一个 entry 写回去，僵尸条目复活 ——
#    之后每次下单都是 FileNotFoundError，而日志里只有一句「取回附件失败」。
#    这里只做三件最小的事（不做整体重构）：一把锁 + 两个读写函数 + entry['dead'] 标记。
_pending_lock = threading.RLock()


def _pending_get(qq):
    """拿某个 QQ 的待办（没有则 None）。**别再绕过它直接下标 `_pending`**。"""
    with _pending_lock:
        return _pending.get(qq)


def _pending_set(qq, entry):
    """挂上（或替换）某个 QQ 的待办。"""
    with _pending_lock:
        _pending[qq] = entry


def _pending_pop(qq):
    """摘掉某个 QQ 的待办（不删文件，删文件是 _clear_pending 的事）。"""
    with _pending_lock:
        return _pending.pop(qq, None)


# ---- 同一条消息只处理一次 -----------------------------------------------------
#
# 为什么要去重（真实反馈，2026-10-21）：学生只发了一份 PDF，机器人却问了两遍、
# 最后收成「2 份文件」（① ② 是同一个文件名）。现场是消息被**投递了两次** ——
# OneBot 实现在 WebSocket 重连、心跳超时补发、或者框架自己重试时会把同一条
# 事件再推一遍。而 `_pending` 是**累积**的（收到文件就往同一批里加），
# 于是第二遍进来的同一份被当成第二份文件：学生拿到的单子里有两份一样的纸。
#
# 判据用 `message_id`（同一条消息的唯一标识）。不按「文件名 + 内容」去重：
# 学生**真的**可能发两次同一个文件（比如他想打两份不同的页），
# 那种情况是两条消息、两个 id，不该被吃掉。
_SEEN_MAX = 400                 # 只记最近几百条：一条消息只会在几秒内重投
_seen_lock = threading.Lock()
_seen_order = collections.deque()
_seen_ids = set()


def _seen_before(message_id):
    """这条消息之前处理过吗？没处理过就记下来并返回 False。

    有界 + 加锁：事件线程只有一个，但推送线程和测试会并发调 handle_event，
    而无界集合会在跑几个月之后慢慢变成内存里的一条垃圾带。
    """
    if not message_id:
        return False                 # 框架没给 id：宁可处理，也不能把真消息吞掉
    with _seen_lock:
        if message_id in _seen_ids:
            return True
        _seen_ids.add(message_id)
        _seen_order.append(message_id)
        while len(_seen_order) > _SEEN_MAX:
            _seen_ids.discard(_seen_order.popleft())
    return False


def _pending_keys():
    """当前有待办的 QQ 列表（快照：巡检遍历时别人可能正在增删）。"""
    with _pending_lock:
        return list(_pending.keys())


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

# 份数上限：搬到 config.py 了（nlu / llm 也要用它判越界），这里留个别名，
# 老代码里的 COPY_MAX 与提示文案照旧。
COPY_MAX = config.COPY_MAX


def _items_menu(items, name=None, intro=None, defaults=None):
    """价目项菜单：**下单要选的就是这一条**（纸张 + 类型，自带单价）。

    现在它只在两种场合出现：学生明确说要看（「价目表」走卡片），
    以及**他的要求落不到任何一档**时（说了「A3」而管理员没配 A3）——
    那时把现有档位摆出来，比一句「没有这一档」有用得多。

    `defaults` 是用户的偏好（「默认 3 2份」设过的那份）。设过就在对应那条后面
    标一句「你的默认」—— 回执里写着「下次下单时当默认值」，这里要认得出它。

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
    tail = '要打哪一档？（回复编号；发「价目表」看完整价目，发「取消」可以放弃）'
    return '\n'.join([head, tail] + rows).strip()


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


def extract_attachments(message):
    """取消息里的**所有**附件段，返回 [(段类型, 段数据), ...]。

    段类型有两种都要认：
      - 'file'：QQ 里「发送文件」的附件（pdf / docx 等）；
      - 'image'：QQ 里直接发的图片。**图片不是文件附件**，段类型不同、
        data 里的字段也不同（file 是文件名、url 是带 rkey 的下载地址）——
        只认 'file' 的版本真机上把三张图片当成了「非命令」回帮助文本，
        这是实测抓出来的教训。

    为什么返回**列表**而不是第一个（2026-09-28 批量改造）：一次选几份文件发出去
    时，它们会落在同一条消息的多个段里。老版本只取第一个，后面的文件被静默丢掉 ——
    学生看到「收到 1 份」而自己明明发了 3 份，且没有任何地方会报错。
    字段名各实现略有出入（file_id / id / file 几种写法），取值留在
    _fetch_attachment 里按段类型分别处理。
    """
    if not isinstance(message, list):
        return []
    found = []
    for seg in message:
        if isinstance(seg, dict) and seg.get('type') in ('file', 'image'):
            found.append((seg.get('type'), (seg.get('data') or {})))
    return found


def extract_file(message):
    """取消息里的**第一个**附件段，返回 (段类型, 段数据)；没有就 (None, None)。

    保留这个「只取一个」的口径给还在用它的调用方（回归脚本、以及
    「这条消息里有没有附件」这类只关心有无的判断）。
    """
    found = extract_attachments(message)
    return found[0] if found else (None, None)


def extract_reply(message):
    """取「引用回复」指向的那条消息 id；没有引用就 None。

    OneBot v11 的 reply 段是 {'type': 'reply', 'data': {'id': '12345'}}，
    少数实现把字段写成 message_id —— 两种都认。引用本身**不带被引用的内容**，
    要拿它的附件名得再调一次 get_msg（见 _quoted_names）。
    """
    if not isinstance(message, list):
        return None
    for seg in message:
        if isinstance(seg, dict) and seg.get('type') == 'reply':
            data = seg.get('data') or {}
            value = str(data.get('id') or data.get('message_id') or '').strip()
            return value or None
    return None


def _quoted_names(client, reply_id):
    """被引用那条消息里的附件名，返回 (名单, 是否读成功)。

    读成功但名单为空 = 引用的是没带文件的消息（比如 bot 自己发的提问），
    那不是错误，调用方照常把要求当成「整批的」。读失败（get_msg 挂了）返回
    (None, False) —— 这两件事必须分开：batch 里有多份文件时，
    「读不到引用」和「引用里没有文件」对应完全不同的处理（前者宁可多问一句）。
    """
    try:
        info = client.call_action('get_msg', {'message_id': reply_id}) or {}
    except (OneBotError, OSError) as exc:
        log.warning('取引用消息失败 id=%s：%s', reply_id, exc)
        return None, False
    names = []
    for _kind, data in extract_attachments(info.get('message')):
        name = str(data.get('file_name') or data.get('name') or data.get('file') or '').strip()
        if name:
            names.append(name)
    return names, True


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
        #    列出**现在支持哪几种**（学生只会照着念，写「格式不支持」等于没说），
        #    并给出两条能立刻走的路：换格式再发，或去网页端。
        return ('这个文件类型（%s）打不了。现在支持：%s。\n'
                '换成这些格式再发一次就行；或者导出成 PDF 发给我，网页端也能上传：%s'
                % (ext or '无后缀', '、'.join(config.ALLOWED_EXTENSIONS),
                   config.SITE_URL or '地址请向管理员索取'))
    if size == 0:
        return '这个文件是空的，换一个再发'
    if size > config.MAX_UPLOAD_MB * 1024 * 1024:
        #    提了网页端就把链接给上：同一份文件里其它提到网页端的地方都带 SITE_URL，
        #    只有这里光说「到网页端上传」，用户还得自己找地址（对话审计）。
        return ('文件超过 %dMB 了，太大传不动；请压缩后分几次发，'
                '或到网页端上传：%s' % (config.MAX_UPLOAD_MB, config.SITE_URL))
    return None


def _new_entry(kind='file', preset=None):
    """开一批新的待办。preset 是预设记录（预设单才有）。"""
    return {
        'kind': kind,
        'preset_id': (preset or {}).get('id'),
        'preset_content': (preset or {}).get('content'),
        'preset_item_id': (preset or {}).get('price_item_id'),
        'files': [],
        'items': None,
        'remark': None,
        'raw': None,          # 预设单的要求（文件单是每份文件各存一份 raw）
        'asked_at': None,
        'reminders': 0,
        'ts': time.time(),
    }


def _file_refs(files):
    """把几份文件说成「第 1 份、第 3 份」—— 学生在下一句话里就是这么指它们的。"""
    return '、'.join('第 %d 份' % index for index, _item in files)


def _unspecified(entry):
    """这一批里还没定下打印要求的文件（带 1 起的序号）。"""
    return [(index, item) for index, item in enumerate(entry['files'], start=1)
            if not item.get('raw')]


def _all_specified(entry):
    """这一批是不是**每一份**都说清楚要什么了。

    判据是「有没有原始要求」（raw），不是「能不能算出档位」：
    后者永远为真（没说的地方都能用默认值补齐），拿它当判据会变成
    「文件一到就自动下单」—— 那不是少操作，那是替学生做主。
    """
    if entry['kind'] == 'preset':
        return bool(entry.get('raw'))
    return bool(entry['files']) and not _unspecified(entry)


def handle_attachments(client, qq, attachments, text=''):
    """一条消息里的**全部**附件：本地校验 → 暂存 → 挂进这一批 → 看要不要下单。

    attachments 是 [(段类型, 段数据), ...]。QQ 里一次选几份文件发出去，
    OneBot 可能给一条消息里多个附件段，也可能拆成几个独立事件 —— 两种都由
    这里接住：前者一次挂完，后者分几次挂进**同一批**（这就是「合并同样的要求
    一起下单」的基础）。

    附件与文字在同一条消息里时，那句要求只作用于**这条消息带来的这几份**
    （见 _apply_requirement 的 scope 参数）：学生一边发文件一边写「这张彩色」，
    说的是这一份，不是整批。
    """
    #    身份放在取附件之前问一次：没注册的号不该让他把文件全传完再被拒，
    #    还顺带省下几次下载（那些文件反正用不上）。
    problem = _identity_error(qq)
    if problem:
        client.send_private_msg(qq, problem)
        return

    entry = _pending_get(qq)
    if entry is not None and time.time() - (entry.get('ts') or 0) > config.BATCH_TTL_SECONDS:
        #    上一批已经超时了（推送循环每 15 秒扫一次，中间这几秒里进来的
        #    新文件不该被算进那批已经作废的东西里）。
        _clear_pending(qq)
        entry = None
    if entry is None:
        entry = _new_entry('file')

    #    **下载之前就把 ts 刷新**：取一份附件要走 QQ 的 file 接口、可能几十秒，
    #    而巡检是按 ts 判「闲置多久」的。不刷新的话，一份大文件还在下载时就被
    #    判成「300 秒没动静」→ 这一批当场作废、暂存被删，学生看到的是
    #    「文件没能取回来，请重新发一次」，而真正的原因是我们在自己拆自己的台。
    entry['ts'] = time.time()

    room = config.BATCH_MAX_FILES - len(entry['files'])
    if room <= 0:
        client.send_private_msg(
            qq, '这一批已经有 %d 份文件了，一次最多 %d 份。\n'
                '回「好」把这一批下掉，或发「取消」重来。'
                % (len(entry['files']), config.BATCH_MAX_FILES))
        return

    accepted = []
    for kind, data in attachments:
        if len(accepted) >= room:
            break
        added = _ingest_attachment(client, qq, kind, data)
        if added is not None:
            entry['files'].append(added)
            accepted.append(added)
    if len(attachments) > room:
        client.send_private_msg(
            qq, '一次最多 %d 份，这条消息里后 %d 份没有收下。'
                % (config.BATCH_MAX_FILES, len(attachments) - room))
    if not accepted:
        # 全都不合格：_ingest_attachment 已经逐份说过原因了，这里不再补一句。
        return

    if entry.get('dead'):
        #    下载这段时间里这一批已经被作废了（巡检判超时 / 学生发「取消」/
        #    又开了一批预设单）。刚落盘的这几份没有主人 —— 删掉就走，
        #    **绝不能**把僵尸 entry 写回 _pending（写回去的症状是之后每次下单
        #    都 FileNotFoundError，而日志里看不出是谁删了文件）。
        for item in accepted:
            _remove_quiet(item.get('path'))
        return

    entry['ts'] = time.time()
    if not entry.get('items'):
        entry['items'] = _fetch_price_items()
    _pending_set(qq, entry)

    if text.strip():
        if _apply_requirement(client, qq, entry, text, scope=accepted):
            return
        # 附件带的那句没听懂：不当作要求，退回「问一句」那条路。
        _after_change(client, qq, entry)
        return
    _after_change(client, qq, entry)


def _ingest_attachment(client, qq, kind, data):
    """取回一份附件 → 本地校验 → 落进暂存目录。成功返回文件条目，失败返回 None。

    失败路径都自己回了话（学生要知道是哪一份、为什么没收下），
    所以调用方只需要看返回值是不是 None。
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
        return None
    name = _normalize_attachment_name(kind, name, blob)
    if name is None:
        client.send_private_msg(qq, '这张图片的格式打不了（只支持 JPG / PNG），'
                                    '换一张，或把文件当附件发过来')
        return None
    problem = _local_prelaunch_check(name, len(blob))
    if problem:
        client.send_private_msg(qq, problem)
        return None
    PENDING_DIR.mkdir(parents=True, exist_ok=True)
    #    文件名里带一段随机串：同一秒里连发两份同名文件时，只按时间戳命名会
    #    让后一份覆盖前一份的暂存（学生看到「收到 2 份」，实际盘上只剩 1 份）。
    path = str(PENDING_DIR / ('%s_%s_%s' % (qq, uuid.uuid4().hex[:8],
                                            os.path.basename(name)[:80])))
    try:
        with open(path, 'wb') as fh:
            fh.write(blob)
    except OSError:
        log.exception('暂存文件失败 qq=%s', qq)
        client.send_private_msg(qq, '文件没能存下来，请重新发一次')
        return None
    return {'path': path, 'name': name, 'size': len(blob), 'raw': None}


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
    """清掉某个 QQ 的待办（内存 + 磁盘），返回被清掉的那条（没有则 None）。

    文件单要删掉**每一份**暂存（批量之后一单就是好几份）——
    只删第一份的话，剩下的会一直躺在 data/pending 里，直到下次重启才被扫掉，
    而重启之前它们既没主人、也没人知道该不该删。
    """
    entry = _pending_pop(qq)
    if entry:
        #    **先打死亡标记再删文件**：事件线程可能正拿着同一个 entry 在下载、
        #    马上要把文件 append 进去再写回 _pending。它在写回之前会查这个标记，
        #    发现就删掉刚落盘的文件并放弃（见 handle_attachments）。
        #    没有这一步的话，这里删掉的只是「当时」那几份，后来那份成了
        #    没有主人、也没有对应文件的僵尸，之后每次下单都 FileNotFoundError。
        entry['dead'] = True
        for item in entry.get('files') or []:
            _remove_quiet(item.get('path'))
    return entry


def _cancel_confirm_text(entry):
    """「已取消」的统一说法。

    **命令「取消」与整句「算了」共用同一句句式**：同一种结果两种说法，
    学生会以为其中一种没生效（对话审计里就吃过这种不一致）。
    每一句都带上「什么都没下」，因为他最担心的正是「是不是已经下了」。
    """
    if entry is None:
        return '现在没有正在进行的下单，什么都没取消。'
    count = len(entry.get('files') or []) if entry.get('kind') != 'preset' else 0
    if not count:
        return '已取消，什么都没下。'
    return '已取消，什么都没下（这 %d 份文件已作废，要打请重新发）。' % count


def _cancel_pending(client, qq):
    """丢弃这一批并回一句统一的话；返回有没有东西可取消。"""
    entry = _clear_pending(qq)
    client.send_private_msg(qq, _cancel_confirm_text(entry))
    return entry is not None


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
    """作废时的话术。**文件单与预设单分开说**：

    · 文件单要说明「哪几份」没了，并让用户重新发文件；
    · 预设单没有文件，「刚才那几份」不成立（它要重新发的是「打印服务 N」）。

    两种都不写「失败」二字：这是等太久了，不是出了错 —— 学生要做的动作
    是重发，不是去找管理员。
    """
    if entry.get('kind') == 'preset':
        return ('「打印服务 %s」等太久了，已取消。\n要打请重新发一次。'
                % (entry.get('preset_content') or entry.get('preset_id') or ''))
    names = [item.get('name') or '' for item in entry.get('files') or []]
    if len(names) == 1:
        return ('刚才那份「%s」等太久了，已取消。\n要打印请重新发一次。' % names[0])
    return ('刚才那 %d 份文件等太久了，已取消。\n要打印请重新发一次。' % len(names))


def _remind_text(entry, qq):
    """「还没回话」的追问：把默认配置完整念一遍，让回一个「好」就能成交。"""
    if entry.get('kind') == 'preset':
        head = '「打印服务 %s」还没说要怎么打。' % (entry.get('preset_content') or '')
    else:
        missing = _unspecified(entry)
        if missing:
            head = '%s 还没说要怎么打。' % _file_refs(missing)
        else:
            head = '还在等你的回复。'
    default, error = _default_spec(entry, qq)
    if error or default is None:
        return head + '\n回「好」直接下单，或发「取消」放弃。'
    return (head + '\n回「好」按 %s 下单，或说要怎么打（如「黑白 2份」）。'
            % nlu.describe(default))


def _sweep_expired_pending(client):
    """批量待办的巡检：到点追问、追几次没动静就作废（在推送循环里定期跑）。

    时间线（config 里可调）：闲置 45 秒问一次、150 秒再问一次、
    300 秒作废 —— 用户的要求是「过了几秒没回复就追问，追问几次仍然不回复则取消」。
    追问只针对**还没定下要求**的批次；已经说全的那批在收到消息的那一刻就下单了，
    根本不会留在这里。
    """
    keys = _pending_keys()
    if not keys:
        return
    now = time.time()
    for qq in keys:
        entry = _pending_get(qq)
        if entry is None:
            continue
        idle = now - (entry.get('ts') or 0)
        try:
            if idle > config.BATCH_TTL_SECONDS:
                _clear_pending(qq)
                client.send_private_msg(qq, _timeout_text(entry))
                continue
            asked = entry.get('reminders') or 0
            if asked >= len(config.BATCH_REMIND_AT):
                continue
            if idle >= config.BATCH_REMIND_AT[asked]:
                entry['reminders'] = asked + 1
                entry['asked_at'] = now
                client.send_private_msg(qq, _remind_text(entry, qq))
        except OneBotError:
            log.warning('待办提醒发送失败 qq=%s（连接不可用）', qq)


# ---- 数字参数的口径 ---------------------------------------------------------
# 「单号 / 工单号 / 打印服务编号 / 每页条数」原先各处各写一遍 `.isdigit()`：
#   · **不限长度** —— 一串 200 位数字会原样变成一次跨洋请求（和一条查不到的错误）；
#   · **放行全角数字** —— `'２５１２４'.isdigit()` 是 True，而服务端只认 ASCII，
#     于是「单号 ２５１２４」会被当成一个合法参数发出去、回一句「查不到」。
# 收口成一个判据：ASCII、纯数字、长度 ≤ 12（单号最长形态远小于此，
# 与 config.QQ_RE 的 12 位上限同一个量级）。
_MAX_DIGITS_ARG = 12


def _digit_arg(argument):
    """命令里的数字参数 → int；不合法返回 None。"""
    text = (argument or '').strip()
    if not (text.isascii() and text.isdigit()) or len(text) > _MAX_DIGITS_ARG:
        return None
    return int(text)


def _digit_arg_text(argument):
    """同上，但要原样字符串（查单 / 撤回都按字符串传给服务端）。"""
    value = _digit_arg(argument)
    return None if value is None else str(value)


def _site_hint(resp):
    """身份类失败（没注册/停用/多账号）才附网页端地址 ——
    参数错误（400）附了也没用，反而让回复变啰嗦。"""
    if resp.get('code') in (403, 404, 409):
        return '\n（网页端：%s）' % config.SITE_URL
    return ''


def _duplex_text(duplex):
    return '双面' if duplex == 'double' else '单面'


# 给学生看的序号。**上标圆圈**（①②③）比「1)」在手机上一眼能认出来，
# 而学生回话时说的「第 2 份」对应的就是这里的 ②。
_CIRCLED = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫'


def _file_label(index, item):
    return '%s %s' % (_CIRCLED[index - 1] if index <= len(_CIRCLED) else '%d.' % index,
                      item.get('name') or '')


def _resolve_raw(entry, qq, raw):
    """把一份「原始要求」落成一档（没说的地方用学生的默认值补）。

    ⚠️ 「能不能落成档」与「学生说没说」是两件事（见 _all_specified）：
    这个方法对**空要求**也会返回一个合法的默认档 —— 那是用来展示和下单的，
    不是用来判断学生是否已经表态的。

    管理员**一份价目项都没配**时不当成错误：这一单照下（不带 price_item_id），
    金额由管理员核定 —— 与老流程那句「先按老规矩提交」是同一个口径。
    把它当错误的话，学生会在最后一步收到一句「没有这一档」而下不了单，
    而那时他什么都做不了（价目表不是他能配的）。
    """
    if not entry.get('items'):
        prefs = _prefs_cache_get(qq)
        duplex = (raw or {}).get('duplex') or prefs.get('default_duplex') or 'single'
        #    份数上限在**这里也要夹**：没有价目项时这一单照样要提交，
        #    不夹的话「80 份」会在最后一步被服务端 400 顶回来（学生只能反复回「好」）。
        asked_copies = (raw or {}).get('copies') or prefs.get('default_copies')
        copies = nlu.clamp_copies(asked_copies or 1)
        assumed = []
        if (raw or {}).get('copies') and (raw or {}).get('copies') != copies:
            assumed.append('份数最多 %d 份，按 %d 份' % (config.COPY_MAX, copies))
        return {
            'price_item_id': None, 'label': '',
            'color': (raw or {}).get('color') or 'black',
            'duplex': duplex if duplex in ('single', 'double') else 'single',
            'copies': copies,
            'assumed': assumed,
        }, None
    prefs = _prefs_cache_get(qq)
    return nlu.resolve_spec(
        raw or {}, entry.get('items') or [],
        default_item_id=entry.get('preset_item_id') or prefs.get('default_price_item_id'),
        default_copies=prefs.get('default_copies'),
        default_duplex=prefs.get('default_duplex'))


def _resolve_file(entry, qq, item):
    return _resolve_raw(entry, qq, (item or {}).get('raw'))


def _default_spec(entry, qq):
    """这一批「什么都不说」时会落到哪儿 —— 提问与追问都要把它完整念出来。"""
    return _resolve_raw(entry, qq, None)


def _no_item_text(error, items):
    """要求落不到任何一档时的话术：先说错在哪，再把现有档摆出来。

    不摆编号菜单（老流程那种「回 1 选黑白」）：现在回一个数字是「打几份」的
    意思，再摆一份要人回编号的菜单，两套规则会当场打架。
    """
    labels = ' / '.join(str(item.get('label') or '') for item in (items or [])[:6])
    lines = [error or '这一档现在打不了。']
    if labels:
        lines.append('现有：%s' % labels)
    lines.append('再说一次要哪一档就行，例如「A4 70g 黑白」。')
    return '\n'.join(lines)


def _ask_text(entry, qq):
    """把「还缺什么 + 默认会怎么打」写成一条消息。"""
    default, error = _default_spec(entry, qq)
    lines = []
    if not entry.get('items') and entry.get('kind') != 'preset':
        #    管理员还没配价目表：不能装作没这回事（学生选了档却算不出价）。
        #    明说一句，然后**照常下单** —— 金额本来就由管理员核定。
        if entry.get('files'):
            names = [item.get('name') or '' for item in entry['files']]
            lines.append('收到「%s」。' % names[0] if len(names) == 1
                         else '收到 %d 份文件。' % len(names))
        lines.append('管理员还没配置价目表，这一单按老规矩提交、金额由管理员核定。')
        lines.append('回「好」直接下单，或发「取消」放弃。')
        return '\n'.join(lines)
    if entry.get('kind') == 'preset':
        lines.append('「打印服务 %s」还没说要怎么打。' % (entry.get('preset_content') or ''))
    else:
        files = entry.get('files') or []
        missing = _unspecified(entry)
        if len(files) == 1:
            #    只有一份：把文件名说出来就够了（「收到「论文.pdf」。」）——
            #    「第 1 份 还没说要怎么打」在只有一份时是句废话。
            lines.append('收到「%s」。' % (files[0].get('name') or ''))
        elif len(missing) == len(files):
            lines.append('收到 %d 份文件：' % len(files))
            for index, item in enumerate(files, start=1):
                lines.append(' ' + _file_label(index, item))
        elif missing:
            lines.append('%s 还没说要怎么打。' % _file_refs(missing))
    if error or default is None:
        #    管理员还没配价目表：不能装作没这回事（学生选了档却算不出价）。
        #    明说一句，然后**照常下单** —— 金额本来就由管理员核定。
        lines.append('管理员还没配置价目表，这一单按老规矩提交、金额由管理员核定。')
        lines.append('回「好」直接下单，或发「取消」放弃。')
        return '\n'.join(lines)
    lines.append('要按 %s 下单吗？' % nlu.describe(default))
    lines.append('回「好」直接下单，或说要怎么打：「黑白 2份」「第 2 份彩色」「都双面」。')
    return '\n'.join(lines)


def _after_change(client, qq, entry):
    """收完文件 / 听完要求之后的收口：能下单就下单，不能就问一句。"""
    entry['ts'] = time.time()
    if _all_specified(entry):
        _submit_batch(client, qq, entry)
        return
    #    学生刚说过话，追问重新计时（否则「他一直在回，我们一直在催」）。
    entry['asked_at'] = time.time()
    entry['reminders'] = 0
    client.send_private_msg(qq, _ask_text(entry, qq))


def _fill_defaults(entry):
    """把还没表态的那些文件标成「按默认来」（学生回了「好」时用）。

    标成一个**非空**的要求字典，是为了让 _all_specified 认为它已经表态 ——
    这个空壳里没有 color/duplex/copies/paper，resolve 时会逐项落到默认值上，
    所以它表达的正是「没说，按默认」。
    """
    if entry.get('kind') == 'preset':
        entry['raw'] = entry.get('raw') or {'default': True}
        return
    for item in entry.get('files') or []:
        if not item.get('raw'):
            item['raw'] = {'default': True}


def _match_by_name(entry, names):
    """按文件名把「被引用的那几份」找出来（返回文件条目列表）。

    QQ 的文件名常常被框架改过（hash.jpg / 时间戳命名），所以判据分三档、
    从严到松：完全同名 > 去扩展名同名 > 互为子串。三档都不中就不认领 ——
    宁可让用户用「第 2 份」再说一遍，也不要把要求安到别的文件上。
    """
    found = []
    for raw in names or []:
        base = os.path.basename(str(raw or '')).strip()
        if not base:
            continue
        stem = base.rsplit('.', 1)[0]
        for item in entry.get('files') or []:
            if item in found:
                continue
            name = item.get('name') or ''
            if name == base or name.rsplit('.', 1)[0] == stem \
                    or (len(stem) >= 4 and stem in name) or (len(name) >= 4 and name in base):
                found.append(item)
                break
    return found


def _apply_spec_to(client, qq, entry, targets, spec):
    """把一份要求并进这几份文件。**全部能落地才写**，否则一个字都不改。

    先整批试算、再整批提交，是因为「说了一半」比「什么都没说」更难处理：
    第 1 份并进去了、第 2 份因为「没有 A3 这一档」失败，学生看到的是一半生效的
    结果，而他刚才只说了**一句话**。要么整句生效，要么整句不认。
    """
    staged = []
    notes = []
    for item in targets:
        merged = dict(item.get('raw') or {})
        nlu.merge_spec(merged, spec)
        resolved, error = _resolve_raw(entry, qq, merged)
        if error:
            client.send_private_msg(qq, _no_item_text(error, entry.get('items') or []))
            return False
        #    份数被夹了（「彩色 80 份」→ 50）要**当场说**，不能等下单回执：
        #    回执上只会写「50 份」，学生会以为是自己说错了，或者干脆没注意到，
        #    然后拿到 50 份的账单。这里只说一次（同一句话不重复刷屏）。
        asked = merged.get('copies')
        if asked and resolved.get('copies') != asked:
            note = ('份数最多 %d 份：你说的 %s 份按 %d 份下。'
                    % (config.COPY_MAX, asked, resolved.get('copies')))
            if note not in notes:
                notes.append(note)
        staged.append((item, merged))
    for item, merged in staged:
        item['raw'] = merged
    for note in notes:
        client.send_private_msg(qq, note)
    return True


def _apply_requirement(client, qq, entry, text, scope=None, target_names=None):
    """把一条文本要求作用到这一批上。**消费掉了返回 True**。

    scope 是「这条消息里带来的那几份文件」（附件里带文字时用）；
    target_names 是「引用回复带过来的文件名」（学生引用某一份说要求时用）。

    三种作用范围的优先级，以及为什么这么定：
      · 引用点名的 → 只作用于那几份（他说得最具体）；
      · 这条消息带的文件 → 只作用于它们（「这张彩色」说的是这一张）；
      · 其余 → 作用于**还没表态**的那些（一句「黑白2份」就是给剩下那些的）。
        一份都不剩时改作用于全批 —— 那是「都彩色」这种改主意的说法。
    """
    parsed = nlu.parse_requirement(text)
    if parsed['cancel']:
        #    「算了」「不打了」这类整句取消：nlu 早就认出来了，但 bot 侧原先没人
        #    消费它 —— 于是这句话会掉进大模型兜底，学生收到的是一句「没看懂」，
        #    而他的意思恰恰是「别下了」。命令「取消」与它走同一个收口。
        _cancel_pending(client, qq)
        return True
    if not parsed['submit'] and not parsed['remark'] and parsed['empty']:
        #    「备注」两个字后面什么都没写：这不是「没听懂」，学生是想设备注、
        #    只是不知道格式。直接告诉他怎么写，比回一句「没看懂」有用得多。
        if (text or '').strip().startswith('备注'):
            client.send_private_msg(qq, '备注要写成「备注 你的内容」，比如「备注 靠窗那台打印」。')
            return True
        #    规则一个字都没认出来 → 让大模型看一遍（没配 key 时这步是空操作）。
        #    只在「确实没认出来」时才打扰它：绝大多数消息在上面那一行就结束了。
        fallback = llm.extract_requirement(text, entry.get('items') or [])
        if fallback is None:
            return False
        fallback['raw'] = text
        parsed = fallback

    if parsed['submit']:
        _fill_defaults(entry)
        _after_change(client, qq, entry)
        return True

    applied = False
    if parsed['remark']:
        entry['remark'] = parsed['remark']
        client.send_private_msg(qq, '备注记下了：%s' % parsed['remark'])
        applied = True

    global_spec = parsed['global']
    if not nlu.spec_is_empty(global_spec) or target_names:
        if target_names:
            targets = _match_by_name(entry, target_names)
            if not targets:
                client.send_private_msg(
                    qq, '引用的那几份不在这一批里（可能已经下过单了）。\n'
                        '用「第 1 份」这样告诉我，或者把文件重发一次。')
                return True
        elif scope:
            targets = list(scope)
        else:
            targets = [item for _index, item in _unspecified(entry)]
            if not targets:
                #    全都表过态了：这句话当作**改主意**，作用于全批
                #    （「都彩色」这种说法本来就是说给整个批量听的）。
                targets = list(entry.get('files') or [])
        if targets and not _apply_spec_to(client, qq, entry, targets, global_spec):
            return True
        applied = applied or bool(targets)

    for index, spec in parsed['scoped']:
        files = entry.get('files') or []
        #    「最后一份」在 nlu 里只是一个语义标记（REF_LAST = -1）：那一批到底有
        #    几份只有 bot 这边知道，所以到这一步才落成具体下标。
        if index == nlu.REF_LAST:
            if not files:
                client.send_private_msg(
                    qq, '现在没有待处理的文件。把文件发给我，再说「最后一份彩色」这样的要求。')
                return True
            index = len(files)
        if not 1 <= index <= len(files):
            client.send_private_msg(
                qq, '这一批一共 %d 份文件，没有第 %d 份。\n'
                    '可以说「第 1 份彩色」或「最后一份彩色」；也可以把文件重发一次。'
                    % (len(files), index))
            return True
        if not _apply_spec_to(client, qq, entry, [files[index - 1]], spec):
            return True
        applied = True

    if applied:
        _after_change(client, qq, entry)
        return True
    return False


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


def _upload_problem_text(problem):
    """这一批没下成时，把「接下来做什么」写清楚。

    分两种情形，因为学生要做的事完全不同：
      · **额度满**（服务端每账号的在途预上传有上限，默认 15 份）：QQ 里没有任何
        手段能处理它 —— 只能去网页看已下的单、或者等几分钟让旧令牌过期；
      · 其它（网络抖动、参数被拒）：那几份还在待办里，回「好」就能重试。
    只回一句服务端的原话（比如「太多了」）等于把问题丢回给学生，而这句话光是
    看不出「我该怎么办」的。
    """
    text = str(problem or '文件没能传上去')
    if any(word in text for word in ('太多', '额度', '上限', '满了', '超出', '配额')):
        return ('%s\n（服务器的上传额度满了。去网页「我的订单」核对已经下成的单：%s；'
                '或者等几分钟再回「好」重试。）' % (text, config.SITE_URL))
    return text


def _receipt_text(entry, created, failed, summary=None, note=None):
    """下单回执。**一个单号一行**；一张单里好几份时只念订单级汇总。

    「预估」两个字不能省：最终金额由管理员看过文件之后核定，
    学生掏钱时得知道这个数还不是账单。

    2026-10「一批 = 一张单」之后回执也跟着收口。三种情形分开写，因为学生
    要看的东西不一样：
      · 整单只有一份：照老样子把那**一份**的档位/份数/单双面念全 —— 参数只有
        一组，逐项说出来最有用，也不占几行；
      · 一张单好几份、各份参数一致：念档位与单双面 + **合计份数**（学生是按
        「一共多少张纸」心疼钱的，逐份念没有额外信息）；
      · 一张单好几份、参数不一致：**只**念份数与合计，再补一句「混合」——
        手机里逐份念参数是一大坨，反而把单号淹了；而硬说成某一档更是错的
        （那会让学生以为全批都是那一档），明细让他去网页看。

    summary 由 _submit_batch 按**已定参数**算出来（不是服务端返回的订单级字段）：
    混合与否、合计份数都只有调用方知道，服务端那个 copies 是订单级的单值。
    note 是「可能已经下成」这类只能由调用方判断的补充说明。
    """
    lines = []
    if created:
        if summary and len(created) == 1 and summary.get('file_count', 0) > 1:
            order = created[0]
            count = summary.get('file_count')
            total = summary.get('copies') or count
            est = order.get('est_price')
            est_text = (' · 预估 %.2f 元' % est) if isinstance(est, (int, float)) else ''
            #    「几个文件」与「每份几份」必须分开写。截图里那句
            #    「2 份文件 · 共 2 份」把两个量都叫「份」，学生读成「打了 2 份」，
            #    而实际是「2 个文件、每个 1 份」。
            #    能整除时写「各 X 份（共 M 份）」，除不尽只写合计（不编一个平均数）。
            per = total // count if count and total % count == 0 else None
            multi = ('各 %d 份（共 %d 份）' % (per, total)) if per else ('共 %d 份' % total)
            lines.append('已下单｜单号 %s' % (order.get('pickup_code'),))
            if summary.get('mixed'):
                lines.append('%d 个文件 · %s%s' % (count, multi, est_text))
                lines.append('（混合单：各份参数不同，明细见网页「我的订单」）')
            else:
                grade = (order.get('price_item_name') or summary.get('label')
                         or '未选档')
                lines.append('%d 个文件 · %s · %s · %s%s' % (
                    count, grade,
                    _duplex_text(order.get('duplex') or summary.get('duplex')),
                    multi, est_text))
        else:
            # 老形状（单文件单、预设单）与「服务端回了不止一张单」的极端情形
            # 都走这里：一张单一行，信息不删减。
            lines.append('已下单 %d 单' % len(created) if len(created) > 1 else '已下单')
            for order in created:
                parts = [order.get('price_item_name') or '未选档',
                         '%s 份' % (order.get('copies') or 1),
                         _duplex_text(order.get('duplex'))]
                est = order.get('est_price')
                if isinstance(est, (int, float)):
                    parts.append('预估 %.2f 元' % est)
                lines.append('单号 %s · %s' % (order.get('pickup_code'), ' · '.join(parts)))
                names = order.get('files') or []
                if names:
                    shown = ' / '.join(names[:3])
                    if len(names) > 3:
                        shown += ' 等 %d 份' % len(names)
                    lines.append('　%s' % shown)
        if entry.get('remark'):
            lines.append('备注：%s' % entry['remark'])
        if note:
            lines.append(note)
        lines.append('金额以管理员核定为准 · 网页端：%s' % config.SITE_URL)
    if failed:
        #    「一组没下成」的说法已经作废：一批现在就是一张单，
        #    学生看到的只有「这一批下了没有」。
        lines.append('这一批没下成：%s' % '；'.join(str(item) for item in failed[:2]))
        lines.append('这几份还在我这儿，回「好」重试一次；'
                     '也可以先去网页「我的订单」核对已经下成的单：%s' % config.SITE_URL)
    return '\n'.join(lines)


def _discard_tokens(qq, tokens):
    """把已经拿到的预上传令牌退回去（不退还一直占着在途额度）。

    失败只记日志：丢不掉只是白占服务端一份「每账号最多几份」的额度，
    而这条路径本来就是在处理别的失败 —— 不能让它把回执也一起吞掉。
    """
    if not tokens:
        return
    try:
        api.discard_prepared(qq, [token['file_token'] for token in tokens])
    except api.ApiError as exc:
        log.warning('丢弃预上传令牌失败 qq=%s：%s', qq, exc)


def _submit_batch(client, qq, entry):
    """下单：**这一批 = 一次请求 = 一张单、一个单号**（服务端 2026-10 起的新契约）。

    以前这里按 (档位, 单双面, 份数) 把这一批分成几组、一组发一次建单请求 ——
    于是学生一次发了 3 份、参数不一样，就拿到 3 个单号：取件要报三个号、
    管理员要接三次、还要计三次费，而他只做了一件事。现在服务端允许**一个 group
    里每份文件带自己的参数**，所以整批只发一次，学生只拿一个单号。

    逐份上传那段**保留**（见 api.upload_prepare 的说明）：不能把几份文件塞进
    一个 multipart —— 服务端的 MAX_CONTENT_LENGTH 卡的是整个请求体（50MB），
    三份 20MB 的讲义合在一起当场 413，而学生没做错任何事。

    失败时这一批**整批**留在待办里（已经拿到的预上传令牌一并退回），
    学生回一个「好」就能重试；只有真建成单了才删本地暂存。
    """
    if entry.get('kind') == 'preset':
        _submit_preset(client, qq, entry)
        return
    files = entry.get('files') or []
    if not files:
        _clear_pending(qq)
        return

    #    每一份的参数**各自**落成档：份数不同就是各自的份数、档位不同就是各自的
    #    档位。绝不取第一份或最大值代表全批 —— 那是打错纸、算错钱，
    #    而学生从回执上根本看不出来。
    resolved_files = []
    for item in files:
        resolved, error = _resolve_file(entry, qq, item)
        if error:
            client.send_private_msg(qq, _no_item_text(error, entry.get('items') or []))
            return
        resolved_files.append((item, resolved))

    #    回执要用的汇总：混合与否、合计份数只有这里知道（服务端返回的 copies
    #    是订单级的单值，一批里份数不同时它代表不了全批）。
    signature = {(resolved.get('price_item_id'), resolved.get('duplex'),
                  resolved.get('copies')) for _item, resolved in resolved_files}
    summary = {
        'file_count': len(resolved_files),
        'copies': sum(int(resolved.get('copies') or 1)
                      for _item, resolved in resolved_files),
        'mixed': len(signature) > 1,
        'label': resolved_files[0][1].get('label') or '',
        'duplex': resolved_files[0][1].get('duplex'),
    }

    tokens = []
    problem = None
    for item, _resolved in resolved_files:
        try:
            with open(item['path'], 'rb') as fh:
                blob = fh.read()
            resp = api.upload_prepare(qq, item['name'], blob)
        except (api.ApiError, OSError) as exc:
            problem = str(exc)
            break
        if resp.get('code') != 0:
            problem = resp.get('msg') or '文件没能传上去'
            break
        tokens.append({'file_token': resp.get('file_token'), 'filename': item['name']})

    created = []
    failed = []
    note = None
    if problem is not None:
        #    中途有一份传不上去：还没走到建单。先退掉手里那些令牌 ——
        #    不退的话它们一直占着「每账号最多几份」的在途额度，而学生在 QQ 里
        #    没有任何手段处理（额度只能在网页端看和清）。
        _discard_tokens(qq, tokens)
        failed.append(_upload_problem_text(problem))
    else:
        payload = [{
            'file_token': token['file_token'],
            'filename': token['filename'],
            'price_item_id': resolved.get('price_item_id'),
            'copies': resolved.get('copies'),
            'duplex': resolved.get('duplex'),
        } for token, (_item, resolved) in zip(tokens, resolved_files)]
        resp = None
        try:
            resp = api.order_prepared(qq, [{
                'files': payload,
                #    备注是**整批**的（学生只写一句），所以留在组上。
                'remark': entry.get('remark') or '',
            }])
        except api.ApiError as exc:
            #    建单这类请求**不重试**（见 api.py 的模块注释）：响应丢了不等于
            #    没建成。所以既不重发、也**不丢弃令牌** —— 万一单已经建好，
            #    丢令牌会把订单指着的文件删掉。让学生发「订单」自己看一眼。
            client.send_private_msg(
                qq, '%s\n这一单可能已经建好了，发「订单」可以核对；'
                    '没有的话回「好」再试一次。' % exc)
            failed.append('连不上服务器')
        if resp is not None:
            if resp.get('code') != 0:
                #    服务端明确回了错（不是连接层）：这批确定没建成，
                #    把已经传上去的预上传令牌收回来，别占着那份额度。
                _discard_tokens(qq, tokens)
                created = resp.get('orders') or []
                if created:
                    #    极端情形：服务端建到一半才 500，响应里仍带着已经形成的单。
                    #    这时候说「没下成」是撒谎、说「下成了」也是撒谎，
                    #    而且**绝不能**引导他回「好」重试（那就是重复下单）。
                    #    唯一的正确答案是让他自己发「订单」核对。
                    note = ('服务端报了错，但这一单可能已经下成了：'
                            '先发「订单」核对，别急着回「好」重试。')
                else:
                    failed.append(_upload_problem_text(resp.get('msg') or '下单失败'))
            else:
                created = resp.get('orders') or []
                for item in files:
                    _remove_quiet(item['path'])

    if not created and not failed:
        #    服务端回了 code=0 却一张单都没有：不能当作成功（暂存会被删掉、
        #    学生却什么都没有），也不能一声不吭地把整批扔掉。
        failed.append('服务端没有回单号')

    if failed:
        #    一条单只有两种结局：整批下成，或整批还在我这儿。
        entry['files'] = list(files)
        entry['ts'] = time.time()
        entry['asked_at'] = None
        entry['reminders'] = 0
        _pending_set(qq, entry)
    else:
        _pending_pop(qq)
        if note:
            #    「可能已经下成」那种情形**不给重试**（回「好」就是重复下单），
            #    所以本地暂存再没人认领，删掉 —— 否则它悄悄占着盘直到下次启动。
            for item in files:
                _remove_quiet(item['path'])

    text = _receipt_text(entry, created, failed, summary, note)
    if text:
        client.send_private_msg(qq, text)


def _submit_preset(client, qq, entry):
    """预设单的下单（没有文件，参数取自这一批的要求）。"""
    resolved, error = _resolve_raw(entry, qq, entry.get('raw'))
    if error:
        client.send_private_msg(qq, _no_item_text(error, entry.get('items') or []))
        return
    asked = (entry.get('raw') or {}).get('copies')
    if asked and resolved.get('copies') != asked:
        #    与文件单同一个口径：份数被夹到上限时**先说一句**再下单
        #    （「打印服务 2 80份」原先会静默变成 50 份）。
        client.send_private_msg(qq, '份数最多 %d 份：你说的 %s 份按 %d 份下。'
                                % (config.COPY_MAX, asked, resolved.get('copies')))
    _pending_pop(qq)
    try:
        resp = api.order_preset(qq, entry['preset_id'],
                                duplex=resolved['duplex'],
                                copies=resolved['copies'],
                                price_item_id=resolved['price_item_id'],
                                remark=entry.get('remark'))
    except api.ApiError as exc:
        #    连不上服务器（不是服务端明确拒绝）：**不重试**，也不猜单有没有建成。
        #    让它去发「订单」核对，是最省事的下一步。
        client.send_private_msg(qq, '%s\n这一单可能已经建好了，发「订单」可以核对；'
                                    '没有的话重新发一次「打印服务 %s」就行。'
                                % (exc, entry.get('preset_content') or entry.get('preset_id')))
        return
    if resp.get('code') != 0:
        client.send_private_msg(qq, '没有下成单：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))
        return
    order = {'pickup_code': resp.get('pickup_code'),
             'price_item_name': resolved.get('label'),
             'copies': resolved.get('copies'),
             'duplex': resolved.get('duplex'),
             'est_price': resp.get('est_price'),
             'files': []}
    client.send_private_msg(qq, _receipt_text(entry, [order], []))


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
    handle = _digit_arg_text(argument)
    if handle is None:
        #    别写死位数（升过一次位：4 → 5）：写成例子就够了，
        #    写「4 位」会让拿着 5 位单号的人以为自己的号不对。
        client.send_private_msg(qq, '用法：「单号 25124」（下单时给你的那串数字；'
                                    '忘了就发「订单」看列表）')
        return
    resp = api.order(qq, handle)
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    if resp.get('pickup_code') is None:
        client.send_private_msg(qq, '单号 %s：%s'
                                    % (handle, resp.get('msg') or '这张单已经取件了'))
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
        client.send_private_msg(qq, '价目表暂时取不到（%s）。\n稍后再发一次「价目表」；%s'
                                    % (exc, _site_line()))
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
                #    列表里要带**价格**：这是学生下单前唯一一次看到钱的机会
                #    （价目表是另一条命令，不是每个人都会去发）。服务端把
                #    preset_price（一口价，元/份）和 price_item_label（绑定的档位）
                #    都给了，两样都显示；两样都没有时才只写服务名。
                parts = [content[:40] + ('…' if len(content) > 40 else '')]
                price = preset.get('preset_price')
                if isinstance(price, (int, float)):
                    parts.append('%.2f 元/份' % price)
                elif preset.get('price_item_label'):
                    parts.append(str(preset['price_item_label']))
                lines.append('　%s：%s' % (preset.get('preset_id'), ' · '.join(parts)))
            return '\n'.join(lines)

        _send_card_or_text(client, qq, 'presets', text)
        return
    #    编号后面允许**直接把要求写在同一句里**（「打印服务 2 双面 2份」）：
    #    与文件单同一套解析，说得全就一次下单，说不全才问一句。
    parts = argument.split(None, 1)
    head = parts[0]
    inline = parts[1].strip() if len(parts) > 1 else ''
    preset_id = _digit_arg(head)
    if preset_id is None:
        client.send_private_msg(qq, '用法：「打印服务 编号」，比如「打印服务 2」。'
                                    '先发「打印服务」看看有哪些。')
        return
    resp = api.print_options()
    if resp.get('code') != 0:
        client.send_private_msg(qq, str(resp.get('msg', '查询失败')) + _site_hint(resp))
        return
    preset = next((p for p in resp.get('presets') or []
                   if p.get('preset_id') == preset_id), None)
    if preset is None:
        client.send_private_msg(qq, '这个预设服务不存在了，发「打印服务」看看现在的清单。')
        return
    label = (preset.get('content') or '')[:40]
    if _clear_pending(qq):
        client.send_private_msg(qq, '（上一批待办已作废，按这条服务来）')
    entry = _new_entry('preset', preset)
    entry['preset_id'] = preset_id
    entry['preset_content'] = label
    entry['items'] = resp.get('price_items') or _fetch_price_items()
    _pending_set(qq, entry)
    if inline:
        #    句子里的要求：说得全（比如「双面 2份」）就直接下单 —— 这正是这一轮
        #    要的「少打几次字」；说不全就走提问那条路，默认档在提问里写清楚。
        parsed = nlu.parse_requirement(inline)
        if parsed['empty'] and not parsed['submit']:
            fallback = llm.extract_requirement(inline, entry['items'])
            parsed = fallback or parsed
        if parsed['remark']:
            entry['remark'] = parsed['remark']
        if parsed['submit']:
            _fill_defaults(entry)
            _after_change(client, qq, entry)
            return
        if not nlu.spec_is_empty(parsed['global']):
            entry['raw'] = dict(parsed['global'])
    _after_change(client, qq, entry)


def reply_withdraw(client, qq, argument):
    """撤回第一步：只发确认口令、**不动任何数据**。

    为什么要第二道口令：撤回是删除类操作（订单记录 + 落盘文件一起没），
    网页端也有一个二次确认弹窗。QQ 里没法弹窗，就用「再说一遍完整命令」
    代替 —— 顺手也把订单号再核对一次。
    """
    handle = _digit_arg_text(argument)
    if handle is None:
        client.send_private_msg(qq, '用法：「撤回 25124」（把例子换成你的单号）。\n'
                                    '只有还没被接单的单能撤回；撤回后订单记录和文件都会删除、'
                                    '不能恢复。发「订单」可以看到自己的单号。')
        return
    client.send_private_msg(qq, '撤回后不能恢复（订单记录和文件一并删除）。\n'
                                '确实要撤回单号 %s，请回复：确认撤回 %s' % (handle, handle))


def reply_withdraw_confirm(client, qq, argument):
    handle = _digit_arg_text(argument)
    if handle is None:
        client.send_private_msg(qq, '用法：「确认撤回 单号」，单号发「订单」能看到。')
        return
    resp = api.withdraw_order(qq, handle)
    if resp.get('code') == 0:
        client.send_private_msg(qq, '单号 %s 已撤回。' % handle)
    else:
        client.send_private_msg(qq, '撤回失败：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


def reply_announcement(client, qq):
    resp = api.announcement()
    if resp.get('code') != 0:
        client.send_private_msg(qq, '公告暂时取不到：%s\n稍后再发一次「公告」；%s'
                                    % (resp.get('msg', '查询失败'), _site_line()))
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
    ticket_id = _digit_arg(parts[0]) if parts else None
    if ticket_id is None or len(parts) < 2:
        client.send_private_msg(qq, '用法：「回复工单 单号 内容」，比如「回复工单 3 已经取到了」。\n'
                                    '单号发「工单」能看到。')
        return
    resp = api.ticket_reply(qq, ticket_id, parts[1].strip()[:1000])
    if resp.get('code') == 0:
        client.send_private_msg(qq, '已回复工单 %s，管理员会看到。' % ticket_id)
    else:
        client.send_private_msg(qq, '没能回复：%s%s'
                                % (resp.get('msg', '未知原因'), _site_hint(resp)))


# 像「在回答追问」的短消息：数字、跳过、取消、默认一类。用来把「我这边没有待办」
# 从「普通聊天」里分出来，好回一句有用的话，而不是甩一整篇帮助。
# （批量流程里一个裸数字是**份数**的意思 —— 「打几份」那句提示就是这么写的。）
_ANSWER_LIKE = ('跳过', '取消', '取消吧', '算了', '默认', '默认值', '好', '好的')


def _looks_like_answer(text):
    text = (text or '').strip()
    return _digit_arg(text) is not None or text in _ANSWER_LIKE


def handle_event(client, event):
    """事件分发：只理私聊。任何异常都在 _route_frame 外层兜底。"""
    if event.get('post_type') != 'message' or event.get('message_type') != 'private':
        return
    qq = str(event.get('user_id') or '')
    if not config.QQ_RE.match(qq):
        return
    if qq == client.self_id:
        return  # 自己发出的消息（开了 reportSelfMessage 时会出现），别自问自答

    #    同一条消息被投递两次时，第二遍必须整条丢掉 —— 见 _seen_before 上面那段。
    #    放在附件处理之前：重复投递最典型的现场就是「同一份文件被加进第二批」。
    message_id = str(event.get('message_id') or '').strip()
    if _seen_before(message_id):
        log.info('重复投递的消息，已忽略 qq=%s message_id=%s', qq, message_id)
        return

    attachments = extract_attachments(event.get('message'))
    if attachments:
        text = extract_text(event.get('message'))
        log.info('收到附件 qq=%s 共 %s 个 类型=%s', qq, len(attachments),
                 ','.join(kind for kind, _data in attachments))
        #    附件与文字在同一条消息里（「这张彩色」）：文字只作用于这条消息带来的
        #    那几份，见 handle_attachments / _apply_requirement 的 scope 参数。
        handle_attachments(client, qq, attachments, text)
        return

    text = extract_text(event.get('message'))
    reply_id = extract_reply(event.get('message'))
    command, argument = parse_command(text)
    # 留痕：谁、什么时候、用了哪个命令。**不记消息正文**（正文可能有闲聊和隐私），
    # 非命令消息只留一句「非命令」——运维需要的是「这个 QQ 在用机器人」这件事。
    log.info('私聊消息 qq=%s 命令=%s%s', qq, command or '(非命令)',
             '(引用)' if reply_id else '')

    entry = _pending_get(qq)
    if entry is not None and time.time() - (entry.get('ts') or 0) > config.BATCH_TTL_SECONDS:
        #    超时：先作废（顺手删暂存文件）再回话。这一步不能交给推送循环 ——
        #    它每 15 秒才扫一次，中间这几秒进来的一句话会拿着**已经过期的那批**
        #    去下单，而那些文件的寿命已经到了（清理逻辑随手就会删掉它们）。
        _clear_pending(qq)
        client.send_private_msg(qq, _timeout_text(entry))
        return
    if command is None:
        # 不是命令：先看是不是对这一批的要求（「黑白 2份」「第 2 份彩色」「好」）。
        if entry is not None:
            #    引用里的文件名只取一次（get_msg 是一次动作调用，别为了两个判断
            #    各问一遍框架）。
            names, reply_ok = _quoted_names(client, reply_id) if reply_id else ([], True)
            if reply_id and not reply_ok and len(entry.get('files') or []) > 1:
                #    引用读不到、而这一批又不止一份文件：**宁可多问一句**。
                #    引用某一份说要求（「引用 + 彩色」）是最自然的用法，取不到时若照常
                #    当成「整批的」，学生说的「这一份」就会安到别的文件上 —— 那是实打实的
                #    误判，而多问一句只是多打几个字。只有一份文件时没有歧义，不拦。
                client.send_private_msg(
                    qq, '引用的那条消息没取到。\n'
                        '直接说文件名或「第 2 份」就行，比如「第 2 份彩色」。')
                return
            if _apply_requirement(client, qq, entry, text, target_names=names):
                return
            # 有批在等要求，但这句没听懂：明说一句，再把问题和默认档重发一遍
            # （不清空！学生可能只是没说清楚，重发文件才是真的烦）。
            # 分成两条消息：前一条只说「我没懂哪个词」，后一条是完整的提问 ——
            # 挤成一条的话，「没看懂」那句会被后面几行默认配置淹掉。
            client.send_private_msg(qq, '没看懂「%s」。' % ((text or '').strip()[:20] or '这句'))
            _after_change(client, qq, entry)
            return
        # 没有待办时的几条兜底路径。带斜杠却认不出 = 想执行命令但写错了；
        # 不带斜杠的就是普通聊天，只回帮助（让他知道发文件就能下单）。
        if text.strip()[:1] in ('/', '／'):
            reply_help(client, qq, '这个命令我不认识。' + chr(10))
        elif _looks_like_answer(text):
            #    「看着像在回答追问、其实我这边没有待办」——最典型的场景是机器人
            #    **刚重启**（待办存在内存里，重启就没了）。这时甩一整篇帮助等于装傻，
            #    用户只会以为机器人坏了（对话审计抓到的）。
            client.send_private_msg(
                qq, '我这边没有正在进行的下单了。\n'
                    '多半是刚才那批文件过期了（或者我重启过，待办不保留）。\n'
                    '把文件重新发一次就行，要求可以写在同一条消息里，'
                    '比如「黑白 2份」。')
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
            #    「默认」既是那条设置命令的名字，也是「按你的默认参数来」的意思。
            #    有批在等要求、而学生只发了「默认」两个字时，按后者走 ——
            #    否则他会收到一条用法说明，而他明明是在回答我们的提问。
            if entry is not None and not argument.strip() \
                    and _apply_requirement(client, qq, entry, '好'):
                pass
            else:
                reply_pref_default(client, qq, argument)
        elif command == 'pref_help':
            reply_settings(client, qq)
        elif command == 'cancel':
            # 命令优先于追问，所以「取消」在这里收口：
            # 有没有待办都有一句明确的回答，不让人猜。
            _cancel_pending(client, qq)
        else:
            reply_help(client, qq, '这个命令我不认识。' + chr(10))
    except api.ApiError as exc:
        # 命令处理里的网络错误在这里统一兜底：服务器暂时够不着，
        # 也要给人回一句话，而不是让消息掉进没有回应的黑洞。
        # 「稍后再发一次」是学生唯一能做的事，别让他自己猜。
        try:
            client.send_private_msg(qq, '%s\n稍后再发一次这条命令就好。' % exc)
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

    ⚠️ 整轮包在 `except Exception` 里：这条线程原先只捕 OneBotError 与 ApiError，
    于是服务器哪天回了一个形状不对的 events（`int('abc')` 之类一个 ValueError）
    就会**把推送线程永久打死** —— 之后所有「可取件」通知都发不出去，
    而进程还活着、日志里只有一条线程终止的 traceback，谁都不会注意到。
    循环体出错只该毁掉这一轮，不该毁掉这条线程。
    """
    cursor, notified = _load_state()
    while True:
        time.sleep(config.EVENTS_POLL_SECONDS)
        try:
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
        except Exception:  # noqa: BLE001 —— 这一轮报废，线程必须活下去
            log.exception('推送循环这一轮出错（已吞掉，下一轮继续；游标保持 %s）', cursor)


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
        except Exception as exc:  # noqa: BLE001
            #    **token 不对时抛的不是 OSError**：websocket-client 在握手阶段
            #    收到 401/403 会抛 WebSocketBadStatusException（WebSocketException
            #    的一条分支），它从 onebot.connect() 里原样冒出来。原先这里只 catch
            #    OneBotError，于是「token 填错」直接让整个进程退出 ——
            #    而部署形态是放养式，没人守着控制台。
            log.error('连接 OneBot 失败（%s：%s）。请检查 printbot/.env 里的 '
                      'ONEBOT_ACCESS_TOKEN 是否与 LLBot 那条「正向 WS 服务」连接里的 '
                      'token 一字不差（也要确认 ONEBOT_WS 的端口和它一致）；'
                      '%s 秒后重试', type(exc).__name__, exc, backoff)
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
        except Exception as exc:  # noqa: BLE001
            #    收帧线程里任何一条没被 OneBotError 包住的异常（比如框架把 message
            #    换成一种怪形状）都会冒到这里。宁可当成「这条连接废了、重连」，
            #    也不要让主循环带着进程一起退出。
            log.exception('收帧循环异常退出（%s：%s）；%s 秒后重连',
                          type(exc).__name__, exc, backoff)
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
