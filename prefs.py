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
    if not (hh.isdigit() and mm.isdigit()):
        return None
    hour, minute = int(hh), int(mm)
    if not (0 <= hour <= 23 and 0 <= minute <= 59):
        return None
    return hour * 60 + minute


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
            value = 1 if value else 0
        elif key == 'orders_page_size':
            value = _clamp_page_size(value)
        elif key in ('default_copies', 'default_paper_type_id'):
            value = None if value in (None, '') else int(value)
        elif isinstance(value, str):
            value = value.strip()
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
    lines.append('通知：QQ 推送%s · 邮件%s'
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
    lines.append('订单列表：%s已取件的单 · %s条/次'
                 % ('隐藏' if prefs['hide_done_orders'] else '包含', prefs['orders_page_size']))
    lines.append('机器人回复：%s' % ('表格用卡片' if prefs['card_replies'] else '一律纯文本'))
    return lines
