"""prefs.py —— 用户偏好（通知开关、免打扰、默认打印参数、显示偏好）。

**一份偏好的真相只有这里**：网页设置页、机器人命令、提醒线程都从这里读，
各写各的 SQL 迟早出现「设置页说关了、提醒照发」——而那种错两边都不报警。

几个刻意的设计：
  · **没有行 = 全默认**：新用户不必先写一行；`get_prefs()` 把缺省补齐后返回，
    调用方永远拿到一份完整字典，不用到处判 None。
  · **默认参数只当表单初值**：`default_*` 是给「下次下单」预填的，**绝不能**由服务端
    替用户补参数 —— 那样「没选」和「选了默认」就分不开，计费时会吵。
  · **免打扰是「延后」不是「丢弃」**：取件号有时效，夜里不发、早上补发，
    所以这里只回答「此刻该不该发」，由调用方决定排到什么时候（见 notifier 的补发）。
"""

import sqlite3
from datetime import datetime

from config import (
    COPIES_MAX,
    COPIES_MIN,
    PREF_ORDERS_PAGE_DEFAULT,
    PREF_ORDERS_PAGE_MAX,
    PREF_ORDERS_PAGE_MIN,
    logger,
)
from db import db_conn

# 允许的通知渠道：与 user_prefs 的列一一对应（加渠道时这两处一起加）
NOTIFY_CHANNELS = ('qq', 'mail')


DEFAULTS = {
    'notify_qq': True,
    'notify_mail': True,
    'quiet_from': '',          # 'HH:MM'，空 = 不启用免打扰
    'quiet_to': '',
    'default_color': '',       # '' = 没设过偏好
    'default_duplex': '',
    'default_copies': None,
    'default_paper_type_id': None,
    'hide_done_orders': False,
    'card_replies': True,      # 机器人用卡片回「表」类查询；关掉就一律纯文本
    'orders_page_size': PREF_ORDERS_PAGE_DEFAULT,
}


def _row_to_prefs(row):
    """把库里的行翻成完整字典（缺的用默认值补），并把 0/1 还原成 bool。"""
    if row is None:
        return dict(DEFAULTS)
    prefs = dict(DEFAULTS)
    for key in DEFAULTS:
        if key in row.keys() and row[key] is not None:
            prefs[key] = row[key]
    for key in ('notify_qq', 'notify_mail', 'hide_done_orders', 'card_replies'):
        prefs[key] = bool(prefs[key])
    size = prefs.get('orders_page_size')
    prefs['orders_page_size'] = _clamp_page_size(size)
    return prefs


def get_prefs(user_id, conn=None):
    """取某个账号的偏好（缺省自动补齐）。"""
    sql = 'SELECT * FROM user_prefs WHERE user_id = ?'
    if conn is None:
        with db_conn() as own:
            row = own.execute(sql, (user_id,)).fetchone()
    else:
        row = conn.execute(sql, (user_id,)).fetchone()
    return _row_to_prefs(row)


def _as_int(value):
    """把输入转成整数；认不出（非数字、浮点串、True 这种）一律回 None。

    白名单只保证「键是允许的」，不保证「值是这个类型」——
    路由层不做类型校验，所以类型收口必须在这里。
    """
    if value is None or isinstance(value, bool):
        return None
    if isinstance(value, int):
        return value
    text = str(value).strip()
    if not (text.isascii() and text.isdigit()):
        return None
    return int(text)


def _clamp_page_size(value):
    try:
        size = int(value)
    except (TypeError, ValueError):
        return PREF_ORDERS_PAGE_DEFAULT
    return max(PREF_ORDERS_PAGE_MIN, min(PREF_ORDERS_PAGE_MAX, size))


def parse_clock(text):
    """把 'HH:MM' 解析成分钟数；格式不对返回 None（当作没设）。"""
    text = (text or '').strip()
    if len(text) != 5 or text[2] != ':':
        return None
    hh, mm = text[:2], text[3:]
    #    ⚠️ `str.isdigit()` 与 `int()` **不等价**：'²'.isdigit() 是 True 而 int('²') 抛
    #    ValueError（上标数字、部分全角数字都这样）。这个函数会被提醒线程每轮调用，
    #    一个坏值就能把整轮扫描抛掉、所有学生那一轮都不发信。所以先要求 ASCII 数字。
    if not (hh.isascii() and hh.isdigit() and mm.isascii() and mm.isdigit()):
        return None
    hour, minute = int(hh), int(mm)
    if not (0 <= hour <= 23 and 0 <= minute <= 59):
        return None
    return hour * 60 + minute


def valid_quiet_pair(start, end):
    """这一对免打扰时间能不能用。

    `22:00-22:00` 这种 start == end 是**没意义**的：`in_quiet_hours` 会把它当成
    「没设」（判据就是 start == end），可它又会被存进库、`describe` 还会说
    「已设为 22:00 - 22:00，会攒着」—— 用户以为自己设上了（审计抓到的）。
    网页端拦了这一条，机器人那条命令没有，所以判定收口到这里，两边都问它。
    """
    a, b = parse_clock(start), parse_clock(end)
    return a is not None and b is not None and a != b


def in_quiet_hours(prefs, when=None):
    """此刻是否落在免打扰时段。跨零点（22:00-08:00）也要判对。"""
    start = parse_clock(prefs.get('quiet_from'))
    end = parse_clock(prefs.get('quiet_to'))
    if start is None or end is None or start == end:
        return False
    now = when or datetime.now()
    minutes = now.hour * 60 + now.minute
    if start < end:
        return start <= minutes < end
    # 跨零点：22:00-08:00 是 [22:00, 24:00) ∪ [00:00, 08:00)
    return minutes >= start or minutes < end


def should_notify(prefs, channel, when=None):
    """这一刻该不该给这个账号发这个渠道的通知。

    ⚠️ 它必须在**发信线程的取数里**被调用，而不是在界面上把开关藏起来 ——
    藏按钮挡不住已经排队的提醒，而用户以为自己关掉了。
    """
    if channel not in NOTIFY_CHANNELS:
        raise ValueError('未知的通知渠道：%s' % channel)
    if not prefs.get('notify_%s' % channel):
        return False
    return not in_quiet_hours(prefs, when)


# 允许被保存的字段（白名单：接口层别直接把请求体塞进 SQL）
EDITABLE = ('notify_qq', 'notify_mail', 'quiet_from', 'quiet_to', 'default_color',
            'default_duplex', 'default_copies', 'default_paper_type_id',
            'hide_done_orders', 'card_replies', 'orders_page_size')


def save_prefs(user_id, fields):
    """保存偏好（只认白名单里的键）。返回保存后的完整偏好。

    用 UPSERT：没有行就插、有就改。这样调用方不用先查再写。
    """
    values = {}
    for key in EDITABLE:
        if key not in fields:
            continue
        value = fields[key]
        if key in ('notify_qq', 'notify_mail', 'hide_done_orders', 'card_replies'):
            #    ⚠️ 只认真正的布尔与 0/1。用 `1 if value else 0` 的话，
            #    字符串 "false" / "0" 都是 truthy —— 想关推送的人会被**静默留在开启态**
            #    （这正是本项目最忌讳的「不报错、只是行为不对」，安全审计抓到的）。
            if isinstance(value, str):
                text = value.strip().lower()
                if text in ('1', 'true', 'on', 'yes', '开'):
                    value = 1
                elif text in ('0', 'false', 'off', 'no', '关'):
                    value = 0
            if value not in (True, False, 0, 1):
                continue                      # 认不出就整项忽略，别猜
            value = 1 if value else 0
        elif key == 'orders_page_size':
            value = _clamp_page_size(value)
        elif key == 'default_copies':
            #    ⚠️ 两件事：① 不能直接 `int(value)`（`'abc'` / `'3.5'` / True 都会出问题）；
            #    ② **必须夹到 COPIES_MIN..COPIES_MAX** —— 设置页和机器人原先允许存到 99，
            #    而下单接口只收 1-50，于是「设了默认 60 份」的人每次下单都被 400 顶回来，
            #    而且他看到的预填值就是那个非法值（用户端最要命的那种坏法）。
            value = _as_int(value)
            if value is not None:
                value = max(COPIES_MIN, min(COPIES_MAX, value))
        elif key == 'default_paper_type_id':
            value = _as_int(value)
        elif key == 'default_color':
            #    枚举收口：界面只给「黑白/彩色/每次问我」，但接口是公开的 ——
            #    不认的值一律当「没设」，免得把一个随便的字符串一路带到下单表单。
            value = value if value in ('black', 'color', '') else ''
        elif key == 'default_duplex':
            value = value if value in ('single', 'double', '') else ''
        elif isinstance(value, str):
            #    其它字符串字段统一截断：原先只有 `.strip()`，于是
            #    `{"default_color": "A"*5e7}` 这种请求能把库撑大、每次读还整串回吐
            #    （安全审计：PUT 没有限流，MAX_CONTENT_LENGTH 又是 50MB）。
            value = value.strip()[:120]
        values[key] = value
    if not values:
        return get_prefs(user_id)
    columns = ', '.join(values.keys())
    placeholders = ', '.join('?' for _ in values)
    updates = ', '.join('%s = excluded.%s' % (k, k) for k in values)
    with db_conn() as conn:
        conn.execute(
            'INSERT INTO user_prefs (user_id, %s) VALUES (?, %s) '
            'ON CONFLICT(user_id) DO UPDATE SET %s, update_time = CURRENT_TIMESTAMP'
            % (columns, placeholders, updates),
            (user_id, *values.values()))
        conn.commit()
        row = conn.execute('SELECT * FROM user_prefs WHERE user_id = ?', (user_id,)).fetchone()
    logger.info('账号 #%s 更新了偏好：%s', user_id, '、'.join(sorted(values)))
    return _row_to_prefs(row)


def describe(prefs):
    """把偏好翻成几句人话（机器人「设置」命令与网页端都用它，避免两处话术分叉）。"""
    lines = []
    #    「邮件」要说清是**你自己的取件提醒**：值班类提醒（有人等你接单、
    #    有人需要人工联系）不走这个开关 —— 那句含糊的「邮件：关」会让管理员
    #    以为自己夜里什么都不会收到了（邮件审计的结论）。
    lines.append('取件提醒：QQ 推送%s · 邮件%s'
                 '（只管你自己的取件提醒；值班类提醒不受影响）'
                 % ('开' if prefs['notify_qq'] else '关', '开' if prefs['notify_mail'] else '关'))
    if prefs['quiet_from'] and prefs['quiet_to']:
        lines.append('免打扰：%s - %s（这段时间的提醒会攒着，过后再发）'
                     % (prefs['quiet_from'], prefs['quiet_to']))
    else:
        lines.append('免打扰：未设置')
    color = {'black': '黑白', 'color': '彩色'}.get(prefs['default_color'], '')
    duplex = {'single': '单面', 'double': '双面'}.get(prefs['default_duplex'], '')
    parts = [p for p in (color, duplex) if p]
    if prefs['default_copies']:
        parts.append('%s 份' % prefs['default_copies'])
    if prefs['default_paper_type_id']:
        parts.append('纸张 #%s' % prefs['default_paper_type_id'])
    lines.append('默认打印参数：%s' % ('、'.join(parts) if parts else '未设置（每次都会问你）'))
    #    「隐藏已取件」两端都生效；「每页」只管**机器人**一次列几条（网页是自己的
    #    滚动列表，没有分页）—— 不写清楚用户会以为网页端也按它分页。
    lines.append('订单列表：%s已取件的单 · 机器人每次 %s 条'
                 % ('隐藏' if prefs['hide_done_orders'] else '包含', prefs['orders_page_size']))
    lines.append('机器人回复：%s' % ('表格用卡片' if prefs['card_replies'] else '一律纯文本'))
    return lines
