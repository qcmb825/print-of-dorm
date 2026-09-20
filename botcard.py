"""botcard.py —— 给 QQ 机器人渲染「数据卡」图片（Pillow）。

为什么要有它：订单 / 工单 / 预设 / 我的 / 帮助 这几类回复是**表格型**的，
纯文本发出去在手机 QQ 里是一大坨、层级全糊。渲染成一张卡读起来像站内的面板。

## 视觉：明日方舟·终末地那套工业语言 + 磨砂玻璃
参数取自对官方站 CSS 的实测（见 AGENTS.md 的「数据卡」一节），要点：
  - 底 `#101110`（带一点绿，不用死黑）、面板 `#181A18`、玻璃 `#1F2422`；
  - **信号黄 `#FFFA00` 只做点缀**（面积 ≤5%：竖条、发光、进度填充、状态点），
    铺面会立刻廉价；第二强调青 `#00FFA2`、品红 `#FF1AAC` 只点一个方块；
  - 母题：4px 细网格、8px 刻度条、**-45° 三像素斜纹当「选中」底纹**、
    6px 粗规线、纯色实心进度条（无圆角无渐变）、圆角克制（面板 0–4，玻璃最多 8–12）；
  - 排版：英文小标签**全大写 + 宽字距**（`+.08em`）并用「—◆—」夹住，
    数字一律等宽（取件码、金额、时间对齐），同屏最多两档字重。

## 磨砂玻璃在**静态图**里的做法（关键，别用「半透明白色蒙版」糊弄）
没有 backdrop-filter，纯半透明面板只会像蒙了层灰。正确顺序：
  ① 先画背景（渐变 + 网格 + 角落光斑 + 刻度/等高线这类母题）——
     背景必须**有东西可模糊**，否则玻璃看起来还是平的；
  ② 把面板区域的背景**裁出来做高斯模糊**（12–20px）；
  ③ 用圆角蒙版贴回，再叠半透明底色 `#1F2422`；
  ④ 叠斜向高光（顶部更亮）、1px 描边（顶边更亮）、底部内阴影；
  ⑤ 面板底下垫一层模糊的暗色 → 悬空感。

## 与站内其它部分的关系
颜色是 `frontend/src/styles/tokens.css` 的**镜像**（那边 `var()`、这边常量），
字体用站内那几支（见 `assets/fonts/README.md`）。改一边记得改另一边 ——
与 `utils/validators.py` 镜像后端校验是同一类约定。

服务器没有 CJK 字体时 `render()` 返回 None，调用方退回纯文本：
**绝不发一张全是方块的图**。
"""

import io
import os
import time

from PIL import Image, ImageDraw, ImageFilter, ImageFont

from config import logger

# ---- 原始色（镜像 tokens.css 深色一套 + 官方站实测值）----------------------
VOID = (16, 17, 16)          # #101110 底（带绿倾向，不是死黑）
VOID_DEEP = (8, 9, 8)        # 渐变下端
GLASS = (31, 36, 34)         # #1F2422 玻璃底
LINE_SOFT = (255, 255, 255, 18)
RULE_HEAVY = (53, 55, 60)    # #35373C 粗规线
INK = (245, 245, 240)        # #F5F5F0 正文
INK_2 = (245, 245, 240, 190)
INK_3 = (137, 141, 137)      # #898D89 次要
INK_4 = (137, 141, 137, 150)
YELLOW = (255, 250, 0)       # 信号黄（点缀用）
CYAN = (0, 255, 162)         # 第二强调
MAGENTA = (255, 26, 172)     # 品红（只点一个方块）

# 状态色：与 tokens.css 深色那套的 --status-* 对齐
STATUS_INK = {
    '待计费': (192, 132, 252),
    '待打印': (137, 141, 137),
    '打印中': (0, 255, 162),
    '可取件': (255, 250, 0),
    '已取件': (79, 191, 92),
}

# ---- 版面（1080px 宽；字号按调研的「标题:副标:正文:注释」阶梯放大）----------
W = 1080
PAD = 30                      # 画布到面板
PANEL_PAD = 40                # 面板内边距
RADIUS = 12                   # 玻璃圆角（官方更克制，这里为玻璃悬浮感放宽）
ROW_H = 96
# 行内容占到 row_top+78（状态牌下缘），分隔线留在 row_top+84 —— 留 ~6px 气。
# 它与行高**解耦**：写成「推进后的 y 再减 N」那种算法，一调行高就会压到牌子上
# （复评实测 tickets 只剩 4px 就是这么来的）。
DIVIDER_DY = 84
BLUR = 16                     # 背景模糊半径（12–20 区间取中）

T_TITLE = 52
T_EYEBROW = 24
T_BODY = 30
T_CODE = 28
T_META = 22
T_CHIP = 22

_FONT_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'assets', 'fonts')
_font_paths = {}
_probed = False
_font_cache = {}


def _pick(env_key, filename):
    """优先 .env 指定的路径，其次仓库里自带的那份。"""
    custom = (os.getenv(env_key) or '').strip()
    if custom and os.path.exists(custom):
        return custom
    local = os.path.join(_FONT_DIR, filename)
    return local if os.path.exists(local) else None


def _probe():
    global _probed
    if _probed:
        return
    _probed = True
    _font_paths['cjk'] = _pick('CARD_FONT_PATH', 'SourceHanSans-SC-Regular.ttf')
    _font_paths['cjk_bold'] = _pick('CARD_FONT_BOLD_PATH', 'SourceHanSans-SC-Bold.ttf') or _font_paths['cjk']
    _font_paths['display'] = _pick('CARD_DISPLAY_FONT_PATH', 'SpaceGrotesk-Variable.ttf')
    _font_paths['mono'] = _pick('CARD_MONO_FONT_PATH', 'JetBrainsMono-Variable.ttf')
    if _font_paths['cjk']:
        logger.info('QQ 卡片字体：%s（拉丁 %s / 等宽 %s）', os.path.basename(_font_paths['cjk']),
                    os.path.basename(str(_font_paths['display'])),
                    os.path.basename(str(_font_paths['mono'])))
    else:
        logger.error('QQ 卡片渲染：找不到中文字体，卡片功能会自动退回纯文本。'
                     '可用 .env 的 CARD_FONT_PATH 指定一个 ttf/otf。')


def available():
    _probe()
    return bool(_font_paths.get('cjk'))


def _font(role, size, weight=None):
    """取字体。role: cjk / cjk_bold / display / mono；weight 只对变量字体有效。"""
    _probe()
    key = (role, size, weight)
    if key in _font_cache:
        return _font_cache[key]
    path = _font_paths.get(role) or _font_paths['cjk']
    font = ImageFont.truetype(path, size)
    if weight is not None:
        try:
            font.set_variation_by_axes([weight])
        except Exception:  # noqa: BLE001 —— 静态字体没有轴，用默认字重即可
            pass
    _font_cache[key] = font
    return font


# ---- 基础绘制 ---------------------------------------------------------------

def _rgba(color, alpha):
    return (color[0], color[1], color[2], alpha)


# 面板的「等效实色」：玻璃在模糊背景上叠加后的代表色。
# 用它做**预先混色**的底 —— 半透明色块（胶囊底、斜纹、进度槽）都不必再走 alpha，
# 因为 Pillow 的 `paste(img, mask)` 会**直接替换像素**、最后 `convert('RGB')` 又把
# alpha 丢掉：半透明的白会被当成纯白（第一版整块面板糊成浅灰就是这么来的）。
PANEL_SOLID = (26, 30, 28)


def _over(color, alpha, base=PANEL_SOLID):
    """把 color 按 alpha（0-255）混到 base 上，返回实色。"""
    k = alpha / 255.0
    if len(color) == 4:
        k *= color[3] / 255.0
    return (int(color[0] * k + base[0] * (1 - k)),
            int(color[1] * k + base[1] * (1 - k)),
            int(color[2] * k + base[2] * (1 - k)))


def _text_font(text, size, weight=None, mono=False):
    """按**这段文字本身**选字体：含中文时一律用 CJK 那支。

    ⚠️ 等宽（JetBrains Mono）与拉丁（Space Grotesk）都**只有拉丁字形**：
    拿它们画「取件码 0198」「· 测试」会出豆腐块方框 —— 整张卡看着没错、
    只有几个字是方块，第一版就是这么翻车的（meta 行的昵称、取件码标签全成了方块）。
    """
    text = str(text or '')
    ascii_only = bool(text) and all(ord(ch) < 128 for ch in text)
    if mono and ascii_only:
        return _font('mono', size, weight)
    return _font('cjk', size, None)


def _rounded_mask(size, radius):
    mask = Image.new('L', size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size[0] - 1, size[1] - 1],
                                           radius=radius, fill=255)
    return mask


def _scene(w, h):
    """背景场景：渐变 + 角落光斑 + 细网格 + 等高线弧 + 坐标刻度。

    玻璃要有东西可模糊，背景就不能是纯色 —— 这几样都是官方站里真有的母题。
    """
    img = Image.new('RGB', (w, h), VOID)
    dr = ImageDraw.Draw(img)

    # ① 竖向渐变（上暖下冷，制造纵深）
    for y in range(h):
        k = y / max(1, h - 1)
        dr.line([(0, y), (w, y)], fill=(int(VOID[0] * (1 - k) + VOID_DEEP[0] * k),
                                        int(VOID[1] * (1 - k) + VOID_DEEP[1] * k),
                                        int(VOID[2] * (1 - k) + VOID_DEEP[2] * k)))

    # ② 角落光斑（强调色 8–10%，大半径模糊）—— 玻璃模糊后就是这几团光
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    for cx, cy, radius, color, alpha in (
            (int(w * 0.16), int(h * 0.10), int(w * 0.46), YELLOW, 26),
            (int(w * 0.94), int(h * 0.84), int(w * 0.40), CYAN, 20),
            (int(w * 0.84), int(h * 0.04), int(w * 0.20), MAGENTA, 10)):
        gd.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=_rgba(color, alpha))
    img = Image.alpha_composite(img.convert('RGBA'),
                                glow.filter(ImageFilter.GaussianBlur(int(w * 0.09)))).convert('RGB')
    dr = ImageDraw.Draw(img)

    # ③ 细网格：官方 1px 高 / ~1.4% 白 / 周期 4px；竖线 1% 白 / 周期 120px
    grid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for y in range(0, h, 4):
        gd.line([(0, y), (w, y)], fill=(255, 255, 255, 4))
    for x in range(0, w, 120):
        gd.line([(x, 0), (x, h)], fill=(255, 255, 255, 3))
    img = Image.alpha_composite(img.convert('RGBA'), grid).convert('RGB')

    # ④ 等高线弧（1px / 3–6% 白）：右上一族同心弧，呼应「地形 / 扫描」
    arcs = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    ad = ImageDraw.Draw(arcs)
    for i in range(7):
        rr = int(w * 0.24) + i * 46
        ad.arc([w - rr - 40, -rr + 60, w + rr - 40, rr + 60], start=90, end=180,
               fill=(255, 255, 255, 10), width=1)
    img = Image.alpha_composite(img.convert('RGBA'), arcs).convert('RGB')

    # ⑤ 边缘坐标刻度（工业图纸味）：每 5 格一根长刻度
    dr = ImageDraw.Draw(img)
    for y in range(80, h - 80, 34):
        long_tick = (y // 34) % 5 == 0
        dr.line([(12, y), (12 + (18 if long_tick else 9), y)],
                fill=_rgba(INK, 60 if long_tick else 30))
    for x in range(80, w - 80, 34):
        long_tick = (x // 34) % 5 == 0
        dr.line([(x, h - 12), (x, h - 12 - (18 if long_tick else 9))],
                fill=_rgba(INK, 60 if long_tick else 30))
    return img


def _glass(img, box, radius=RADIUS):
    """在背景上落一块磨砂玻璃面板。

    ⚠️ 实现上唯一容易翻车的地方：**别拿半透明图层去 `paste(..., mask)`**。
    `paste` 是「替换像素」而不是「混合」，之后 `convert('RGB')` 又会把 alpha 直接丢掉 ——
    结果半透明白高光变成实心白，整块面板糊成浅灰（第一版就是这样，看着像白卡）。
    正确做法：把「模糊背景 + 玻璃底色 + 斜向高光」先混成**一张不透明图**，
    再按圆角形状贴回去；描边这类只有 1px 的东西直接画在底上、用预先混好的实色。
    """
    x0, y0, x1, y1 = box
    size = (x1 - x0, y1 - y0)
    mask = _rounded_mask(size, radius)

    # ① 投影：模糊的深色垫在面板下方 → 悬空感（这一层是 alpha_composite，语义正确）
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle([x0 + 2, y0 + 12, x1 + 2, y1 + 14],
                                             radius=radius, fill=(0, 0, 0, 165))
    img = Image.alpha_composite(img, shadow.filter(ImageFilter.GaussianBlur(24)))

    # ② 玻璃本体：把面板区域的背景糊掉，按 72% 混上 #1F2422 —— 得到一张不透明图
    blurred = img.crop(box).convert('RGB').filter(ImageFilter.GaussianBlur(BLUR))
    glass = Image.blend(blurred, Image.new('RGB', size, GLASS), 0.72)

    # ③ 斜向高光（顶部亮、往下淡出）：直接混进那张不透明图，圆角由 mask 收边
    gd = ImageDraw.Draw(glass)
    for i in range(size[1]):
        a = int(22 * max(0.0, 1 - i / (size[1] * 0.6)))
        if a:
            gd.line([(0, i), (size[0], i)], fill=_over((255, 255, 255), a, GLASS))
    # 左上角再补一小片对角光（玻璃常见的「反光」）
    for i in range(min(size[1], 90)):
        w_line = int(size[0] * 0.34 * max(0.0, 1 - i / 90))
        if w_line:
            gd.line([(0, i), (w_line, i)], fill=_over((255, 255, 255), 12, GLASS))

    img.paste(glass, (x0, y0), mask)

    # ④ 描边：1px 白；顶边更亮（顶光），底边压一条深色（内阴影）
    dr = ImageDraw.Draw(img)
    dr.rounded_rectangle([x0, y0, x1, y1], radius=radius,
                         outline=_over(INK, 52, VOID), width=1)
    dr.line([(x0 + radius, y0 + 1), (x1 - radius, y0 + 1)], fill=_over(INK, 86, GLASS))
    dr.line([(x0 + radius, y1 - 1), (x1 - radius, y1 - 1)], fill=_over((0, 0, 0), 120, GLASS))
    return img


# ---- 母题零件 ---------------------------------------------------------------

def _tracked(draw, xy, text, font, fill, tracking=0.0, anchor='la'):
    """带字距的文本（Pillow 没有 letter-spacing，只能逐字画）。

    tracking 单位 em：官方小标签 +.05~.08、大标题 -.02~-.04。
    """
    step = font.size * tracking
    total = sum(draw.textlength(ch, font=font) + step for ch in text) - step
    x, y = xy
    if anchor.endswith('m'):
        x -= total / 2
    elif anchor.endswith('r'):
        x -= total
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + step
    return total


def _eyebrow(draw, x, y, text, fill=None):
    """英文小标签：全大写 + 宽字距，右侧接「—◆—」（官方版本图里的用法）。"""
    label = str(text).upper()
    font = _text_font(label, T_EYEBROW) if not label.isascii() else _font('display', T_EYEBROW, 600)
    fill = fill or INK_3
    w_label = _tracked(draw, (-9999, y), label, font, fill, 0.08)
    _tracked(draw, (x - w_label, y), label, font, fill, 0.08)
    dx = x - w_label - 44
    cy = y + T_EYEBROW * 0.55
    draw.line([(dx, cy), (dx + 16, cy)], fill=_rgba(fill[:3], 120))
    draw.polygon([(dx + 27, cy), (dx + 22, cy - 5), (dx + 17, cy), (dx + 22, cy + 5)],
                 fill=YELLOW)
    return w_label


CHIP_MIN_W = 112
CHIP_H = 34


def _chip(draw, x, y, text, ink, min_width=CHIP_MIN_W):
    """状态胶囊：方角 + 12% 同色底 + 1px 同色描边 + 同色字（与站内 StatusTag 同形状）。

    两个取舍（都是视觉评审提出来之后改的）：
      · **不在胶囊上用斜纹**。警示斜纹是这套语言的宝贝，但官方拿它铺整块导航底
        （522×72 那种量级）；缩进 112px 宽的胶囊里，条纹会和笔画互相干扰，
        在手机 QQ 的显示宽度下三个字糊成一团。斜纹统一留给页脚那条带。
      · **给最小宽度**：宽度随字数变的话，后面那列（份数 / 金额）的起点会逐行跳动。
    """
    font = _font('cjk', T_CHIP)
    x, y = int(x), int(y)
    w = max(int(draw.textlength(text, font=font)) + 26, min_width)
    h = CHIP_H
    draw.rectangle([x, y, x + w, y + h], fill=_over(ink, 30))
    draw.rectangle([x, y, x + w, y + h], outline=_over(ink, 170), width=1)
    draw.text((x + w / 2, y + h / 2 + 1), text, font=_text_font(text, T_CHIP),
              fill=ink, anchor='mm')
    return w


def _chip_next_x(x):
    """胶囊后面那列文字的起点（胶囊宽度恒定，可以直接算出来）。"""
    return int(x) + CHIP_MIN_W + 16


def _rule(draw, x0, x1, y):
    """粗规线 + 细线（官方 6px 实线下方常跟一条 1px 细线）。"""
    draw.rectangle([x0, y, x1, y + 4], fill=RULE_HEAVY)
    draw.line([(x0, y + 4), (x1, y + 4)], fill=_rgba(INK, 30))


def _tick_strip(draw, x, y, width, height=7, on=7, off=4):
    """刻度条：8px 实 + 4px 空（周期 12），官方实测值。"""
    for i, xx in enumerate(range(int(x), int(x + width), on + off)):
        h = height if i % 3 else int(height * 1.6)
        draw.rectangle([xx, y + (height - h), xx + on, y + height], fill=_over(INK, 110))


def _hazard_line(draw, x0, x1, y, height=8, period=8):
    """底部警示斜纹带：-45°。

    斜纹周期从 6px 放到 8px：手机 QQ 里图片会被缩到 ~400px 宽，周期太密会出摩尔纹，
    整条看着像一层脏噪点（视觉评审提醒的）。
    """
    for i in range(int(x0), int(x1), period):
        draw.polygon([(i, y + height), (i + 3, y + height),
                      (i + 3 + height, y), (i + height, y)], fill=_over(YELLOW, 130))
    draw.line([(x0, y - 1), (x1, y - 1)], fill=_rgba(INK, 26))


def _progress(draw, x, y, width, ratio, height=10):
    """纯色实心进度条（官方就是这样：无圆角、无渐变）。

    轨道要**明显比填充暗**：两者都亮的话一眼看不出用掉多少（视觉评审读成「满格」）。
    末端再点一个 3px 游标 —— 比例再小也看得见。
    """
    ratio = max(0.0, min(1.0, ratio))
    draw.rectangle([x, y, x + width, y + height], fill=_over(INK, 14))
    filled = max(3, int(width * ratio))
    draw.rectangle([x, y, x + filled, y + height], fill=YELLOW)
    draw.rectangle([x + filled - 3, y - 2, x + filled, y + height + 2], fill=INK)


def _truncate(draw, text, font, limit):
    """超宽就截断加省略号（换行会让行高乱掉，宁可截）。"""
    if draw.textlength(text, font=font) <= limit:
        return text
    while text and draw.textlength(text + '…', font=font) > limit:
        text = text[:-1]
    return text + '…'


# ---- 各类型的行 ---------------------------------------------------------------

def _rows_orders(draw, y, x0, x1, payload):
    for item in payload.get('orders') or []:
        status = item.get('status') or ''
        ink = STATUS_INK.get(status, INK_2)
        draw.text((x0, y + 8), '#%s' % item.get('order_id'),
                  font=_font('mono', T_META, 500), fill=INK_4)
        draw.text((x0 + 92, y + 1),
                  _truncate(draw, (item.get('title') or '（无标题）').replace('\n', ' '),
                            _font('cjk', T_BODY), 430),
                  font=_font('cjk', T_BODY), fill=INK)
        _chip(draw, x0 + 92, y + 44, status, ink)
        bits = ['%s 份' % (item.get('copies') or 1),
                '未计费' if item.get('price') is None else '%.2f 元' % item['price']]
        draw.text((_chip_next_x(x0 + 92), y + 52), ' · '.join(bits),
                  font=_font('cjk', T_META), fill=INK_3)
        code = str(item.get('pickup_code') or '—')
        draw.text((x1, y + 1), code, font=_font('mono', T_CODE, 600), fill=INK, anchor='ra')
        code_w = draw.textlength(code, font=_font('mono', T_CODE, 600))
        draw.text((x1 - code_w - 12, y + 8), '取件码',
                  font=_font('cjk', T_META), fill=INK_3, anchor='ra')
        draw.text((x1, y + 52), (item.get('create_time') or '')[5:16],
                  font=_font('mono', T_META, 400), fill=INK_4, anchor='ra')
        y += ROW_H
        draw.line([(x0, y + DIVIDER_DY), (x1, y + DIVIDER_DY)], fill=_over(INK, 18))
    return y


def _rows_tickets(draw, y, x0, x1, payload):
    for item in payload.get('tickets') or []:
        opened = item.get('status') == 'open'
        draw.text((x0, y + 8), '#%s' % item.get('ticket_id'),
                  font=_font('mono', T_META, 500), fill=INK_4)
        draw.text((x0 + 92, y + 1),
                  _truncate(draw, (item.get('subject') or '').replace('\n', ' '),
                            _font('cjk', T_BODY), 600),
                  font=_font('cjk', T_BODY), fill=INK)
        _chip(draw, x0 + 92, y + 44, '进行中' if opened else '已关闭',
              YELLOW if opened else INK_3, min_width=96)
        chip_x = x0 + 92 + 96 + 16
        if item.get('unread'):
            # 「有新回复」是这一行最该跳出来的信息，得给足分量：做成和状态牌同形状的
            # 品红胶囊（原先只有一个 8px 小方块 + 彩字，最该显眼的反倒最弱）。
            _chip(draw, chip_x, y + 44, '有新回复', MAGENTA, min_width=104)
        last = (item.get('last_body') or '').replace('\n', ' ')
        if last:
            # 摘要放**固定列**：跟着状态牌宽度浮动的话，两行的摘要起点会差十几像素，
            # 一列字看着就散了（复评指出的）。
            draw.text((x0 + 340, y + 50),
                      _truncate(draw, last, _font('cjk', T_META), max(120, x1 - x0 - 340 - 150)),
                      font=_font('cjk', T_META), fill=INK_3)
        draw.text((x1, y + 50), (item.get('update_time') or '')[5:16],
                  font=_font('mono', T_META, 400), fill=INK_4, anchor='ra')
        y += ROW_H
        draw.line([(x0, y + DIVIDER_DY), (x1, y + DIVIDER_DY)], fill=_over(INK, 18))
    return y


def _rows_presets(draw, y, x0, x1, payload):
    for item in payload.get('presets') or []:
        # 编号做成方框铭牌（黄框 + 低透黄底）
        draw.rectangle([x0, y + 18, x0 + 46, y + 64], fill=_over(YELLOW, 34), outline=YELLOW, width=1)
        draw.text((x0 + 23, y + 42), str(item.get('preset_id')),
                  font=_font('mono', 26, 700), fill=YELLOW, anchor='mm')
        draw.text((x0 + 74, y + 18),
                  _truncate(draw, (item.get('content') or '').replace('\n', ' '),
                            _font('cjk', 32), 700),
                  font=_font('cjk', 32), fill=INK)
        # 第二行写「怎么用它」：既填掉原来横跨 600px 的空白，也省得用户去翻说明
        draw.text((x0 + 74, y + 60),
                  '发「打印服务 %s」按这条下单' % item.get('preset_id'),
                  font=_font('cjk', T_META), fill=INK_4)
        # 「可用」跟**两行整体**垂直居中（原先跟着第一行，重心偏上）
        draw.text((x1, y + 42), '可用', font=_font('cjk', T_META), fill=INK_4, anchor='ra')
        y += ROW_H + 44
        draw.line([(x0, y + DIVIDER_DY - 4), (x1, y + DIVIDER_DY - 4)], fill=_over(INK, 18))
    return y


def _rows_me(draw, y, x0, x1, payload):
    orders = payload.get('orders') or {}
    usage = payload.get('usage') or {}
    cells = [('我的单数', str(orders.get('total', 0)), INK),
             ('进行中', str(orders.get('in_progress', 0)), INK),
             ('待我取件', str(orders.get('ready', 0)), YELLOW),
             ('已取件', str(orders.get('done', 0)), INK_2)]
    cw = (x1 - x0) // len(cells)
    for i, (label, value, color) in enumerate(cells):
        cx = x0 + i * cw
        draw.text((cx, y), label, font=_font('cjk', T_META), fill=INK_3)
        draw.text((cx, y + 32), value, font=_font('mono', 52, 600), fill=color)
        if i:
            draw.line([(cx - 18, y + 4), (cx - 18, y + 76)], fill=_over(INK, 18))
    y += 108
    draw.line([(x0, y), (x1, y)], fill=_over(INK, 18))
    y += 26
    draw.text((x0, y + 12), '累计花费', font=_font('cjk', T_META), fill=INK_3)
    spent = orders.get('spent') or 0
    # 金额是**次要**信息：数字用正文色，只有单位带强调色。
    # （原先数字用亮青大字，成了第二视觉中心、盖过上面四个读数。）
    spent_text = '%.2f' % spent
    draw.text((x0 + 150, y), spent_text, font=_font('mono', 46, 600), fill=INK)
    draw.text((x0 + 150 + draw.textlength(spent_text, font=_font('mono', 46, 600)) + 10,
               y + 20), '元', font=_font('cjk', T_META), fill=CYAN)
    used, quota = usage.get('used_bytes') or 0, usage.get('quota_bytes') or 0
    if quota:
        y += 68
        draw.text((x0, y + 8), '存储用量', font=_font('cjk', T_META), fill=INK_3)
        draw.text((x0 + 150, y), '%s / %s' % (_human(used), _human(quota)),
                  font=_font('mono', 26, 500), fill=INK_2)
        draw.text((x1, y + 6), '%.2f%%' % (100.0 * used / quota),
                  font=_font('mono', T_META, 500), fill=INK_4, anchor='ra')
        y += 46
        _progress(draw, x0, y, x1 - x0, used / quota if quota else 0)
        y += 38          # 与页脚条码带拉开到 28px 以上（两条横杠离太近会糊在一起）
    return y


def _rows_help(draw, y, x0, x1, payload):
    """帮助卡：命令清单分节排（左命令、右说明），命令名用等宽好对齐。"""
    for section in payload.get('help') or []:
        label = str(section.get('title') or '').upper()
        # 标题是中文，必须走 _text_font：Space Grotesk 只有拉丁字形，
        # 拿它画「下单 / 查询」会出豆腐块（这一版就漏过）
        _tracked(draw, (x0, y), label, _text_font(label, 22), YELLOW, 0.08)
        draw.line([(x0 + 150, y + 15), (x1, y + 15)], fill=LINE_SOFT)
        y += 42
        for item in section.get('items') or []:
            cmd = item.get('cmd') or ''
            draw.text((x0 + 8, y + 2), cmd, font=_text_font(cmd, 28, 600, mono=True), fill=INK)
            draw.text((x0 + 300, y + 4),
                      _truncate(draw, item.get('desc') or '', _font('cjk', T_META),
                                x1 - (x0 + 300) - 16),
                      font=_font('cjk', T_META), fill=INK_2)
            y += 44
        y += 14
    return y


def _human(n):
    for unit, scale in (('GB', 1 << 30), ('MB', 1 << 20), ('KB', 1 << 10)):
        if n >= scale:
            return '%.1f %s' % (n / scale, unit)
    return '%d B' % n


_TITLES = {'orders': '我的订单', 'tickets': '问题反馈', 'presets': '打印服务',
           'me': '我的概况', 'help': '使用说明'}
# 英文小标签走官方那套「名词 // 读数」的写法
_EYEBROW = {'orders': 'ORDERS', 'tickets': 'TICKETS', 'presets': 'PRESETS',
            'me': 'PROFILE', 'help': 'MANUAL'}
_EMPTY = {'orders': '还没有订单 —— 把要打印的文件直接发给我就行。',
          'tickets': '还没有提过工单。发「反馈 你的问题」就能提。',
          'presets': '管理员还没配置打印服务。',
          'me': '还没有数据。',
          'help': '帮助内容暂时取不到。'}
_ROW_FN = {'orders': _rows_orders, 'tickets': _rows_tickets, 'presets': _rows_presets,
           'me': _rows_me, 'help': _rows_help}


def _count_of(kind, payload):
    """这一类的「条目数」：给 eyebrow 的读数和空状态判断用。

    me / help 不是列表：me 恒为 1（几个固定读数），help 按分节条目数算。
    """
    if kind == 'orders':
        return len(payload.get('orders') or [])
    if kind == 'tickets':
        return len(payload.get('tickets') or [])
    if kind == 'presets':
        return len(payload.get('presets') or [])
    if kind == 'help':
        return sum(len(s.get('items') or []) for s in payload.get('help') or [])
    return 1


def _body_height(kind, payload):
    """内容区高度：**按类型的排版各算各的**。

    原先一律按「列表行高 × 行数」估，结果帮助卡（行更密）底部空出一大片、
    概况卡（固定几个读数）也不准。分开算以后加类型时照着加一条即可。
    """
    if kind in ('orders', 'tickets'):
        return max(len(payload.get(kind) or []), 1) * (ROW_H + 4)
    if kind == 'presets':
        # ⚠️ 这里必须与 _rows_presets 的推进量**一致**（每行 ROW_H + 44）：
        # 高度模型比实际排版小的话，最后一行的第二行文字会贴到页脚条码带上
        # （复评实测只剩 10–16px，而别的卡是 ~27px）。
        return max(len(payload.get('presets') or []), 1) * (ROW_H + 44) + 12
    if kind == 'help':
        sections = payload.get('help') or []
        items = sum(len(s.get('items') or []) for s in sections)
        # 分节标题 42 + 收尾 14；每条 44
        return max(items, 1) * 44 + len(sections) * 56 + 20
    return ROW_H + 150          # me：四个读数 + 花费 + 用量条


def render(kind, payload):
    """把一份数据渲染成 PNG 字节；没有可用字体时返回 None（调用方退回文本）。

    kind：orders / tickets / presets / me / help。
    一句话能说清的内容**不要**做成卡片（取件码、下单成功这些仍走文本）——
    手机里点开一张图比读一行字慢。
    """
    if kind not in _ROW_FN:
        raise ValueError('未知的卡片类型：%s' % kind)
    if not available():
        return None

    head_h = 152
    body_h = _body_height(kind, payload)
    height = PAD * 2 + PANEL_PAD * 2 + head_h + body_h + 76

    base = _scene(W, height).convert('RGBA')
    box = (PAD, PAD, W - PAD, height - PAD)
    _glass(base, box, RADIUS)
    draw = ImageDraw.Draw(base)

    rows = _count_of(kind, payload)      # 给 eyebrow 的读数与「空状态」判断用
    x0 = PAD + PANEL_PAD
    x1 = W - PAD - PANEL_PAD
    y = PAD + PANEL_PAD

    # 标题：黄色竖条 + 中文大标题 + 右侧英文小标签
    draw.rectangle([x0, y + 6, x0 + 5, y + T_TITLE - 4], fill=YELLOW)
    draw.text((x0 + 24, y), _TITLES[kind], font=_font('cjk_bold', T_TITLE), fill=INK)
    eyebrow = _EYEBROW[kind]
    if kind in ('orders', 'tickets', 'presets') and rows:
        eyebrow = '%s // %02d' % (eyebrow, rows)
    _eyebrow(draw, x1, y + 16, eyebrow)
    y += T_TITLE + 24
    _rule(draw, x0, x1, y)
    y += 28

    # 元信息行：账号（左）/ 同步时刻（右）
    meta_left = 'QQ %s' % (payload.get('qq') or '—')
    if payload.get('nickname'):
        meta_left += ' · %s' % payload['nickname']
    draw.text((x0, y), meta_left, font=_text_font(meta_left, T_META, 400, mono=True), fill=INK_4)
    draw.text((x1, y), 'SYNC %s' % (payload.get('stamp') or time.strftime('%H:%M:%S')),
              font=_font('mono', T_META, 400), fill=INK_4, anchor='ra')
    y += 34
    draw.line([(x0, y), (x1, y)], fill=LINE_SOFT)
    y += 22

    if rows:
        y = _ROW_FN[kind](draw, y, x0, x1, payload)
    else:
        draw.text((x0 + 4, y + 6), _EMPTY[kind], font=_font('cjk', T_BODY), fill=INK_3)
        y += ROW_H

    # 底部：刻度条 + 斜纹带 + 一枚品红方块（整张卡唯一的品红）
    foot = box[3] - PANEL_PAD
    _tick_strip(draw, x0, foot - 28, x1 - x0)
    _hazard_line(draw, x0, x1, foot - 6)
    # 页脚这枚小方块不跟「有新回复」抢品红：降成中灰（整卡只留一处品红）
    draw.rectangle([x1 - 8, foot - 42, x1, foot - 34], fill=_over(INK, 90))

    buf = io.BytesIO()
    base.convert('RGB').save(buf, format='PNG', optimize=True)
    return buf.getvalue()
