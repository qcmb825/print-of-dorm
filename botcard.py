"""botcard.py —— 给 QQ 机器人渲染「数据卡」图片（Pillow）。

为什么要有它：订单 / 工单 / 预设 / 我的 这几类回复是**表格型**的，
纯文本发出去在手机 QQ 里是一大坨、层级全糊。渲染成一张卡，
读起来像站内那些面板。

风格**与网页端同源**（`frontend/src/styles/tokens.css` 的深色一套）：深底、
工业黄、1px 描边、方角、等宽数字、蓝图括角与斜纹。两边的值刻意各写一份
（前端用 var()、这里用常量），改一边记得改另一边 —— 这与 `utils/validators.py`
镜像后端校验是同一类约定：**不共享代码，靠注释互相指路**。

字体：优先 .env 的 `CARD_FONT_PATH`，其次系统常见 CJK 字体。
**一个都找不到时不硬撑**：`render()` 返回 None，调用方退回纯文本 ——
宁可难看，也不能发一张全是方块的图出去。
"""

import io
import os

from PIL import Image, ImageDraw, ImageFont

from config import logger

# ---- 视觉令牌（镜像 frontend/src/styles/tokens.css 的 .dark 一套）----------
BG = (15, 15, 17)            # 面板底（--n-color / surface-overlay 那支深色）
BG_OUTER = (5, 5, 5)         # 最外层底（--deep-void #050505）
GRID = (255, 255, 255, 10)   # 蓝图网格（极淡）
BORDER = (255, 255, 255, 26)  # --border #ffffff1a
ACCENT = (255, 250, 0)       # --industrial-yellow #fffa00
CYAN = (0, 240, 255)         # --tech-cyan #00f0ff
INK = (255, 255, 255)        # --text-primary
INK_2 = (255, 255, 255, 204)  # --text-secondary #ffffffcc
INK_3 = (255, 255, 255, 153)  # --text-tertiary  #ffffff99
INK_4 = (255, 255, 255, 102)  # --text-quaternary #ffffff66

# 订单状态 → (前景, 背景)。与 tokens.css 里 .dark 的 --status-* 一一对应。
STATUS_INK = {
    '待计费': (192, 132, 252),
    '待打印': (161, 161, 170),
    '打印中': (34, 211, 238),
    '可取了': (255, 250, 0),
    '已取件': (74, 222, 128),
}

W = 1080            # 卡片宽（手机 QQ 里约等于整屏宽，再宽就要缩着看了）
PAD = 40
ROW_H = 62

# 字体候选：先 .env 指定，再 Windows，再 Linux 常见 CJK。都是「正文用」的常规体。
_FONT_CANDIDATES = (
    'CARD_FONT_PATH',
    r'C:\Windows\Fonts\msyh.ttc',
    r'C:\Windows\Fonts\simhei.ttf',
    r'C:\Windows\Fonts\Deng.ttf',
    '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc',
    '/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc',
    '/usr/share/fonts/truetype/arphic/uming.ttc',
)
_MONO_CANDIDATES = (
    'CARD_MONO_FONT_PATH',
    r'C:\Windows\Fonts\consola.ttf',
    '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf',
)


def _first_existing(names, env_key=None):
    if env_key:
        custom = (os.getenv(env_key) or '').strip()
        if custom and os.path.exists(custom):
            return custom
    for name in names:
        if name.endswith(('.ttf', '.ttc', '.otf')) and os.path.exists(name):
            return name
    return None


_font_path = None
_mono_path = None
_probed = False


def _probe():
    """探一次字体（结果缓存）。找不到就是找不到，别每渲染一次都摸一遍磁盘。"""
    global _font_path, _mono_path, _probed
    if _probed:
        return
    _probed = True
    _font_path = _first_existing(_FONT_CANDIDATES, 'CARD_FONT_PATH')
    _mono_path = _first_existing(_MONO_CANDIDATES, 'CARD_MONO_FONT_PATH') or _font_path
    if _font_path:
        logger.info('QQ 卡片字体：%s（等宽：%s）', _font_path, _mono_path)
    else:
        logger.error('QQ 卡片渲染：找不到任何 CJK 字体，卡片功能会自动退回纯文本。'
                     '可在 .env 里用 CARD_FONT_PATH 指定一个 ttf/ttc。')


def available():
    """能不能渲染（没有可用字体就返回 False）。"""
    _probe()
    return bool(_font_path)


def _font(size, mono=False):
    return ImageFont.truetype(_mono_path if mono else _font_path, size)


def _font_for(text, size, mono=False):
    """按**这段文字本身**选字体。

    ⚠️ 等宽那支（Consolas / DejaVu Mono）只有拉丁字形：拿它去画「码 0198」「2.0 元」
    这类带中文的串，中文会变成豆腐块方框 —— 卡片整体看着没错、只有几个字是方块，
    真机上就是这么发现的（本地渲染样张一眼看见）。
    所以：要等宽效果的地方，先看这段文字是不是纯 ASCII；不是就用 CJK 那支。
    """
    if mono and text and all(ord(ch) < 128 for ch in str(text)):
        return _font(size, mono=True)
    return _font(size)


def _blend(color, alpha=None):
    """把带透明度的颜色叠到卡片底色上，得到不透明的近似色。

    Pillow 画线/描边**不支持 alpha**（传 4 元组会被当成 RGB 用掉前三个），
    所以透明度得自己算：颜色可以是 (r,g,b) 或 (r,g,b,a)，也可以用第二个参数
    显式给一个 alpha（覆盖元组里的那个）。
    """
    r, g, b = color[:3]
    if alpha is None:
        alpha = color[3] / 255 if len(color) > 3 else 1.0
    else:
        alpha = alpha / 255 if alpha > 1 else alpha
    return (int(r * alpha + BG[0] * (1 - alpha)), int(g * alpha + BG[1] * (1 - alpha)),
            int(b * alpha + BG[2] * (1 - alpha)))


def _text_w(draw, text, font):
    return draw.textlength(text, font=font)


def _draw_blueprint(draw, box):
    """蓝图底纹：极淡的网格 + 四角括角 + 底部斜纹带。全是装饰，绝不压字。"""
    x0, y0, x1, y1 = box
    step = 48
    for x in range(x0 + step, x1, step):
        draw.line([(x, y0 + 8), (x, y1 - 8)], fill=_blend(GRID), width=1)
    for y in range(y0 + step, y1, step):
        draw.line([(x0 + 8, y), (x1 - 8, y)], fill=_blend(GRID), width=1)
    # 括角（站点里的 frame-brackets）
    arm = 26
    corners = [(x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)]
    for cx, cy, sx, sy in corners:
        draw.line([(cx, cy), (cx + arm * sx, cy)], fill=_blend((*ACCENT, 150)), width=3)
        draw.line([(cx, cy), (cx, cy + arm * sy)], fill=_blend((*ACCENT, 150)), width=3)


def _draw_hazard(draw, y, x0, x1, height=8, period=18):
    """底部斜纹带（站点里的 hazard）。用平行四边形拼，别用图案填充 —— 那样要额外依赖。"""
    color = _blend((*ACCENT, 120))
    for x in range(x0, x1, period * 2):
        draw.polygon([(x, y + height), (x + period, y + height),
                      (x + period + height, y), (x + height, y)], fill=color)
    draw.line([(x0, y), (x1, y)], fill=_blend(BORDER), width=1)


def _chip(draw, x, y, text, ink, font):
    """状态胶囊：方角 + 同色描边 + 低透明底色（与站内 StatusTag 一个形状）。"""
    w = _text_w(draw, text, font) + 22
    h = 34
    fill = (int(ink[0] * 0.12 + BG[0] * 0.88), int(ink[1] * 0.12 + BG[1] * 0.88),
            int(ink[2] * 0.12 + BG[2] * 0.88))
    draw.rectangle([x, y, x + w, y + h], fill=fill, outline=ink, width=1)
    draw.text((x + 11, y + h / 2), text, font=font, fill=ink, anchor='lm')
    return w


def _header(draw, title, meta_right):
    """卡头：黄色竖条 + 标题（中文粗体感靠字号）+ 右侧等宽读数。"""
    y = PAD + 6
    draw.rectangle([PAD, y + 4, PAD + 6, y + 40], fill=ACCENT)
    draw.text((PAD + 20, y + 22), title, font=_font(34), fill=INK, anchor='lm')
    if meta_right:
        draw.text((W - PAD, y + 26), meta_right, font=_font_for(meta_right, 22, mono=True), fill=INK_3, anchor='rm')
    line_y = y + 62
    draw.line([(PAD, line_y), (W - PAD, line_y)], fill=_blend(BORDER), width=1)
    return line_y + 22


def _footer(draw, left, right):
    draw.text((PAD, H_LAST[0] - PAD - 34), left, font=_font(20), fill=INK_4)
    if right:
        draw.text((W - PAD, H_LAST[0] - PAD - 34), right, font=_font(20, mono=True), fill=INK_4, anchor='ra')


H_LAST = [0]  # 由 render() 填：给 _footer 用（避免到处传高度）


def _empty_hint(draw, y, text):
    draw.text((PAD + 4, y + 8), text, font=_font(26), fill=INK_3)
    return y + ROW_H


def _rows_orders(draw, y, payload):
    f_id = _font(24, mono=True)
    f_title = _font(26)
    f_meta = _font(22, mono=True)
    for item in payload['orders']:
        draw.text((PAD + 4, y + 4), '#%s' % item['order_id'], font=f_id, fill=INK_3)
        title = item['title'] or '（无标题）'
        # 标题过长就截断：卡片宽度有限，宁可截也不换行（换行会让行高乱掉）
        while _text_w(draw, title, f_title) > 470 and len(title) > 4:
            title = title[:-2]
        draw.text((PAD + 92, y + 2), title, font=f_title, fill=INK)
        ink = STATUS_INK.get(item['status'], INK_2)
        _chip(draw, PAD + 92, y + 34, item['status'], ink, _font(20))
        detail = []
        if item.get('copies'):
            detail.append('%s 份' % item['copies'])
        if item.get('price') is not None:
            detail.append('%s 元' % item['price'])
        else:
            detail.append('未计费')
        draw.text((PAD + 250, y + 40), ' · '.join(detail), font=_font(20), fill=INK_3)
        draw.text((W - PAD, y + 6), '码 %s' % (item.get('pickup_code') or '—'),
                  font=_font_for('码', 22, mono=True), fill=INK_2, anchor='ra')
        draw.text((W - PAD, y + 38), (item.get('create_time') or '')[5:16], font=f_meta, fill=INK_4, anchor='ra')
        y += ROW_H
        draw.line([(PAD, y - 12), (W - PAD, y - 12)], fill=_blend((255, 255, 255, 12)), width=1)
    return y


def _rows_tickets(draw, y, payload):
    f_id = _font(24, mono=True)
    for item in payload['tickets']:
        draw.text((PAD + 4, y + 4), '#%s' % item['ticket_id'], font=f_id, fill=INK_3)
        subject = (item.get('subject') or '').replace('\n', ' ')
        while _text_w(draw, subject, _font(26)) > 700 and len(subject) > 4:
            subject = subject[:-2]
        draw.text((PAD + 92, y + 2), subject, font=_font(26), fill=INK)
        open_ = item.get('status') == 'open'
        chip_w = _chip(draw, PAD + 92, y + 34, '进行中' if open_ else '已关闭',
                       ACCENT if open_ else INK_3, _font(20))
        if item.get('unread'):
            # 与文本版同一口径：文本是「（有新回复）」，这里给一个小黄标。
            # 别只放在文本那条路上 —— 用卡片看一遍却看不出有新回复，等于漏消息。
            _chip(draw, PAD + 92 + chip_w + 8, y + 34, '有新回复', CYAN, _font(20))
        last = (item.get('last_body') or '').replace('\n', ' ')
        if last:
            while _text_w(draw, last, _font(20)) > 380 and len(last) > 4:
                last = last[:-2]
            draw.text((PAD + 250, y + 40), '最新：%s' % last, font=_font(20), fill=INK_3)
        draw.text((W - PAD, y + 6), (item.get('update_time') or '')[5:16],
                  font=_font(22, mono=True), fill=INK_4, anchor='ra')
        y += ROW_H
        draw.line([(PAD, y - 12), (W - PAD, y - 12)], fill=_blend((255, 255, 255, 12)), width=1)
    return y


def _rows_presets(draw, y, payload):
    for item in payload['presets']:
        draw.rectangle([PAD + 4, y + 12, PAD + 44, y + 52], fill=_blend((*ACCENT, 28)), outline=ACCENT, width=1)
        draw.text((PAD + 24, y + 32), str(item['preset_id']), font=_font(24, mono=True), fill=ACCENT, anchor='mm')
        content = (item.get('content') or '').replace('\n', ' ')
        while _text_w(draw, content, _font(28)) > 620 and len(content) > 4:
            content = content[:-2]
        draw.text((PAD + 70, y + 18), content, font=_font(28), fill=INK)
        if item.get('paper_name'):
            draw.text((W - PAD, y + 22), item['paper_name'], font=_font(20), fill=INK_4, anchor='ra')
        y += ROW_H + 6
    return y


def _rows_me(draw, y, payload):
    orders = payload['orders']
    cells = [('我的单数', str(orders['total']), INK),
             ('进行中', str(orders['in_progress']), INK),
             ('待我取件', str(orders['ready']), ACCENT),
             ('已取件', str(orders['done']), INK_2)]
    cw = (W - PAD * 2) // len(cells)
    for i, (label, value, color) in enumerate(cells):
        x = PAD + i * cw
        draw.text((x + 4, y), label, font=_font(22), fill=INK_3)
        draw.text((x + 4, y + 30), value, font=_font(44, mono=True), fill=color)
    y += 100
    draw.line([(PAD, y), (W - PAD, y)], fill=_blend(BORDER), width=1)
    y += 24
    spent = orders['spent']
    draw.text((PAD + 4, y), '累计花费', font=_font(22), fill=INK_3)
    draw.text((PAD + 150, y - 10), '%.2f 元' % spent,
              font=_font_for('元', 38, mono=True), fill=CYAN)
    usage = payload.get('usage') or {}
    used, quota = usage.get('used_bytes') or 0, usage.get('quota_bytes') or 0
    if quota:
        y += 64
        draw.text((PAD + 4, y), '存储用量', font=_font(22), fill=INK_3)
        draw.text((PAD + 150, y - 4), '%s / %s' % (_human(used), _human(quota)),
                  font=_font(24, mono=True), fill=INK_2)
        y += 40
        bar_w = W - PAD * 2 - 8
        draw.rectangle([PAD + 4, y, PAD + 4 + bar_w, y + 12], outline=_blend(BORDER), width=1)
        ratio = min(1.0, used / quota) if quota else 0
        if ratio > 0:
            # 至少给 2px：用量极小时 int() 会把它算成 0 宽，
            # 而 Pillow 对 x1 < x0 的矩形直接抛 ValueError（本地样张踩过）
            wpx = max(2, int(bar_w * ratio))
            draw.rectangle([PAD + 5, y + 1, PAD + 5 + wpx, y + 11], fill=ACCENT)
        y += 40
    return y


def _human(n):
    for unit, scale in (('GB', 1 << 30), ('MB', 1 << 20), ('KB', 1 << 10)):
        if n >= scale:
            return '%.1f %s' % (n / scale, unit)
    return '%d B' % n


_TITLES = {
    'orders': '我的订单',
    'tickets': '问题反馈',
    'presets': '打印服务',
    'me': '我的概况',
}
_KINDS_META = {
    'orders': 'ORDERS',
    'tickets': 'TICKETS',
    'presets': 'PRESETS',
    'me': 'PROFILE',
}
_ROW_RENDERERS = {
    'orders': _rows_orders,
    'tickets': _rows_tickets,
    'presets': _rows_presets,
    'me': _rows_me,
}


def _count_of(kind, payload):
    """这一类的「行数」—— 既决定画几行，也决定卡片高度。

    'me' 恒为 1：概况卡是固定几个读数，一单没下过也有内容要显示
    （四个计数 + 花费 + 用量条），不该掉进「还没有数据」那一支
    —— 本地样张就是这么露了馅：概况卡永远显示「还没有数据」。
    """
    if kind == 'orders':
        return len(payload.get('orders') or [])
    if kind == 'tickets':
        return len(payload.get('tickets') or [])
    if kind == 'presets':
        return len(payload.get('presets') or [])
    return 1


# 各类卡在「行高预算」之外还要多少垂直空间。
# 行高预算是按列表行算的，概况卡不是列表 —— 几个读数 + 花费 + 用量条约这么高。
_EXTRA_H = {'orders': 0, 'tickets': 0, 'presets': 0, 'me': 150}


def render(kind, payload):
    """把一份数据渲染成 PNG 字节。没有可用字体时返回 None（调用方退回文本）。

    kind 只认 orders / tickets / presets / me —— 都是「查询某些表」那类回复；
    一句话就能说清的内容**不要**做成卡片（手机里点开图比读一行字慢得多）。
    """
    if kind not in _ROW_RENDERERS:
        raise ValueError('未知的卡片类型：%s' % kind)
    if not available():
        return None

    rows = _count_of(kind, payload)
    height = PAD * 2 + 150 + max(rows, 1) * (ROW_H + 6) + 30 + _EXTRA_H[kind]
    img = Image.new('RGB', (W, height), BG_OUTER)
    draw = ImageDraw.Draw(img)
    draw.rectangle([10, 10, W - 10, height - 10], fill=BG, outline=_blend(BORDER), width=1)
    _draw_blueprint(draw, (10, 10, W - 10, height - 10))

    nickname = payload.get('nickname') or ''
    count = _count_of(kind, payload)
    meta = '%s' % _KINDS_META[kind]
    if kind in ('orders', 'tickets'):
        meta = '%s // %d' % (_KINDS_META[kind], count)
    y = _header(draw, _TITLES[kind], meta)

    H_LAST[0] = height
    if rows:
        y = _ROW_RENDERERS[kind](draw, y, payload)
    else:
        y = _empty_hint(draw, y, {
            'orders': '还没有订单 —— 直接把要打印的文件发给我就行。',
            'tickets': '还没有提过工单。发「反馈 你的问题」就能提。',
            'presets': '管理员还没配置打印服务。',
            'me': '还没有数据。',
        }[kind])

    _draw_hazard(draw, height - 34, 12, W - 12)
    _footer(draw, ('QQ %s · %s' % (payload.get('qq') or '', nickname)).strip(' ·'),
            (payload.get('stamp') or ''))

    buf = io.BytesIO()
    img.save(buf, format='PNG', optimize=True)
    return buf.getvalue()
