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
    数字一律等宽（单号、金额、时间对齐），同屏最多两档字重。

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
import random
import time

from PIL import Image, ImageChops, ImageDraw, ImageEnhance, ImageFilter, ImageFont

from config import ST_READY, logger

# ---- 原始色（镜像 tokens.css 深色一套 + 官方站实测值）----------------------
VOID = (16, 17, 16)          # #101110 底（带绿倾向，不是死黑）
VOID_DEEP = (8, 9, 8)        # 渐变下端
GLASS = (23, 27, 31)         # 玻璃的染色基准：偏冷的青蓝（暖色玻璃在暗底上会「脏」）
LINE_SOFT = (255, 255, 255, 18)
RULE_HEAVY = (53, 55, 60)    # #35373C 粗规线
INK = (245, 245, 240)        # #F5F5F0 正文
INK_2 = (245, 245, 240, 190)
# 次要灰提亮到 (170,174,170)：原先的 #898D89 在卡面中段只有 3.8:1，
# 缩到手机 400px 后等于看不清（实测评审给的对比度）。深色底上的灰要更亮才「读得出」。
INK_3 = (170, 174, 170)      # 次要
INK_4 = (152, 156, 152)      # 更弱一档（不再是半透明，半透明在缩放后更糊）
YELLOW = (255, 250, 0)       # 信号黄（点缀用）
CYAN = (0, 255, 162)         # 第二强调
MAGENTA = (255, 26, 172)     # 品红（只点一个方块）

# 状态色。**与网页端 tokens.css 有意不同**：卡片只有 1080px 宽、还会被缩到手机上，
# 五个色相（黄青品红紫绿）铺在一张卡上读起来就是「廉价」（三轮评审里两轮点了这条）。
# 卡上只留三种**有含义**的颜色：
#     黄   = 要你动手（可取件）
#     青   = 机器正在做（打印中）
#     品红 = 要你看一眼（「有新回复」那个胶囊，不在本表里）
# 其余一律灰阶 —— 它们只是「还没轮到 / 已经结束」，不需要抓眼睛。
STATUS_INK = {
    '待计费': (170, 174, 170),
    '待打印': (150, 154, 150),
    '打印中': (0, 255, 162),
    '可取件': (255, 250, 0),
    '已取件': (120, 126, 120),
}

# ---- 版面（1080px 宽；字号按调研的「标题:副标:正文:注释」阶梯放大）----------
# 边距从 30 提到 56：**玻璃要在背景上「浮」着，就得真有一圈背景能看见**。
# 30px 时面板几乎盖满画布，背景只剩一条缝 —— 糊不糊都看不出来，
# 用户那句「我没见到磨砂玻璃效果」有一半是这个原因。
W = 1080
PAD = 56                      # 画布到面板
PANEL_PAD = 44                # 面板内边距
RADIUS = 8                    # 玻璃圆角（官方小控件是 2–8px，大圆角不属于这套语言）
# 纹理（颗粒、网格断口）用的固定种子：**同样的数据必须渲染出同一张图** ——
# 用系统随机源的话，用户每刷一次卡片纹理都在跳，看着像故障；
# 而且 `test_bot_card.py` 有一条「渲染两次结果一致」的断言钉着这件事。
GRAIN_SEED = 20260921
ROW_H = 112
# 行内容占到 row_top+78（状态牌下缘），分隔线留在 row_top+84 —— 留 ~6px 气。
# 它与行高**解耦**：写成「推进后的 y 再减 N」那种算法，一调行高就会压到牌子上
# （复评实测 tickets 只剩 4px 就是这么来的）。
DIVIDER_DY = 98
# 模糊半径。⚠️ Pillow 的 `GaussianBlur(radius)` 里 **radius 就是 σ**（不是 σ/2）——
# 按「radius=2σ」估过一版，结果 σ=12 把 36px 周期的斜纹带衰减到 11%，
# 面板里外看不出是同一根纹理，玻璃的「透过去」就没有证据了（复评：「这是不透明板」）。
# 高斯对周期 T 的衰减是 exp(-(σ·2π/T)²/2)：σ=9 + T=36px → 衰减约 29%，留得下 5 LSB 的残影；
# σ=32（最初那版）→ exp(-15.6) ≈ 0，面板内部直接成了常数。
BLUR = 9
GLASS_LIFT = 8                # 玻璃比背后亮多少灰阶（加法提亮；给大了面板会变成「最亮的东西」）
# 透射层的降采样宽度（像素）：磨砂 = **低通**，不是「变淡」。
# 数值是按实测挑的（面板宽 968）：26 → 斜纹只剩 2–3 灰阶（等于没有）；
# 96 → 15–16 灰阶（几乎没糊，看着还是底纹）；**52 → 8–10 灰阶、边缘化开**，
# 才是「看得见底下有东西、但确实糊了」。改大改小前先量一遍这三个数。
BLUR_DOWN = 52
REFRACT_DX = 8                # 折射位移：玻璃有厚度时，透过去的东西整体偏一点
REFRACT_DY = 4
GLASS_MIX = 0.18              # 冷色染色混入比例（很轻：混多了就成了有色树脂板）
FOOT_H = 96                   # 面板下方的「机架条」高度（画在背景上，不在面板里）

T_TITLE = 52
T_EYEBROW = 26
T_BODY = 30
T_CODE = 36                   # 单号是本行的**主读数**，必须比正文（30）大一号
#    ⚠️ 小字不要再往 22 以下调：1080 的 22px 缩到手机约 400px 只有 8px，
#    暗底小字在这个尺寸下会被抗锯齿糊掉（「看不清」和「不存在」是一回事）。
T_META = 28                   # 26px 缩到 400px 只有 9.6px，再抬一档到 10.4px
T_CHIP = 30                   # 胶囊文字原先 26（10.3px）是全卡最小的字，而状态是第一眼要读的

# 标题区高度：必须与 `render()` 里那串推进**逐项对齐**
# （T_TITLE + 24 → 规线 4 → 28 → 元信息行 T_META → 34 → 22）。
# 写死一个漂亮数字（比如 152）会让内容整体比规划低 12px、悄悄吃掉底部内边距 ——
# 这类偏移不会报错，只会让版面「看着有点挤」。
HEAD_H = T_TITLE + 24 + 4 + 28 + T_META + 34 + 22

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
    拿它们画「单号 0198」「· 测试」会出豆腐块方框 —— 整张卡看着没错、
    只有几个字是方块，第一版就是这么翻车的（meta 行的昵称、单号标签全成了方块）。
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


def _grain(img, delta=4, block=2, blur=1):
    """块状颗粒：**2×2 一格**（不是逐像素），整幅铺、双向偏移 ±delta 灰阶。

    三个刻意的选择：
      · **不用逐像素噪点**：卡片最后会被手机缩到约 400px 宽（0.37 倍），
        逐像素的高频噪声在那一步会被抗锯齿平均掉，等于白做；
        2×2 的块缩完还剩约 0.7px，才留得住「这是块有颗粒的材质」。
      · **固定种子**（`GRAIN_SEED`）：同样的数据必须渲染出同一张图 ——
        每次刷新纹理都变，用户看着像故障，而且没法做「改前后对比」。
        ⚠️ 所以不能用 `Image.effect_noise`（它走 `random` 全局源，多线程下拦不住），
        这里用 `random.Random(seed).randbytes` + `bytes.translate`（都是 C 级）自己造。
      · **双向偏移**（有加有减），不会把整张图悄悄提亮 ——
        单向加噪会让「加了颗粒」和「整体变亮」分不开，两件事的判断会互相污染。
    """
    sw, sh = max(1, img.size[0] // block + 1), max(1, img.size[1] // block + 1)
    table = lambda sign: bytes(                                   # noqa: E731
        max(0, min(255, int((sign * (v - 128)) * delta / 64.0))) for v in range(256))
    raw = random.Random(GRAIN_SEED).randbytes(sw * sh)
    plus = Image.frombytes('L', (sw, sh), raw.translate(table(1)))
    minus = Image.frombytes('L', (sw, sh), raw.translate(table(-1)))
    size = (img.size[0] + block, img.size[1] + block)
    crop = (0, 0, img.size[0], img.size[1])
    plus = Image.merge('RGB', [plus.resize(size, Image.NEAREST)] * 3).crop(crop)
    minus = Image.merge('RGB', [minus.resize(size, Image.NEAREST)] * 3).crop(crop)
    out = ImageChops.subtract(ImageChops.add(img.convert('RGB'), plus), minus)
    return out.filter(ImageFilter.GaussianBlur(blur)) if blur else out


def _scene(w, h, band_y=None):
    """背景场景：**必须画得比「能看」更狠一点** —— 玻璃要有东西可模糊。

    上一版玻璃根本看不出来的根子就在这里：背景太干净（网格 1.6% 白、光斑 alpha 20），
    糊 16px 之后只剩一团均匀深灰，于是「玻璃」在物理上存在、在视觉上不存在。
    现在按三层铺，并且**故意让强对比的元素穿过面板边缘**：
      · 底层：竖向渐变 + 三团强调色光斑（大半径模糊，做体积感）；
      · 中层：96px 数系的规线网格（3px 线，缩到手机上还剩 1px）、
              -45° 斜纹带（横穿左下角）、250px 中空数字水印（骑在上边缘）；
      · 顶层：左侧信号条柱（一半在面板外、一半在面板下）、刻度、扫描线、噪点。
    穿过边缘的那几件在面板外是**清晰**的、进面板里被糊成一片彩带 ——
    「这是磨砂玻璃」就是靠这个被看出来的，不是靠面板自己那点描边。
    """
    img = Image.new('RGB', (w, h), VOID)
    dr = ImageDraw.Draw(img)

    # ① 竖向渐变（上微亮 → 下更沉）。不用死黑：暗底纯黑在小尺寸下会糊边（halation）。
    top, bottom = (21, 22, 24), (10, 11, 11)
    for y in range(h):
        k = y / max(1, h - 1)
        dr.line([(0, y), (w, y)], fill=(int(top[0] * (1 - k) + bottom[0] * k),
                                        int(top[1] * (1 - k) + bottom[1] * k),
                                        int(top[2] * (1 - k) + bottom[2] * k)))

    # ② 强调色光斑。比上一版亮一倍：模糊之后要还能看出「这里有色」，
    #    否则玻璃后面就是一张灰纸。（官方强调色比例极克制，但**底色里允许有光**。）
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    #    alpha 20/16/9 是「暗底上有一层色味」的量级；上一版照抄「可见」翻到 52 就翻车了 ——
    #    整张卡被泡成橄榄绿，玻璃成了蒙在黄光上的一块脏玻璃。
    for cx, cy, radius, color, alpha in (
            (int(w * 0.22), int(h * 0.02), int(w * 0.46), YELLOW, 14),
            (int(w * 1.04), int(h * 0.98), int(w * 0.44), CYAN, 16),
            (int(w * 0.92), int(h * 0.01), int(w * 0.20), MAGENTA, 9)):
        gd.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=_rgba(color, alpha))
    img = Image.alpha_composite(img.convert('RGBA'),
                                glow.filter(ImageFilter.GaussianBlur(int(w * 0.10)))).convert('RGB')
    dr = ImageDraw.Draw(img)

    # ③ 规线网格：主格 96px（8px 数系的 12 倍）、3px 线宽。
    #    3px 是硬要求 —— 1080 缩到手机约 400px 时 1px 只剩 0.37px，会被抗锯齿抹平，
    #    网格就「不存在」了（工业图纸感全丢）。
    grid = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    step = 96
    rng = random.Random(GRAIN_SEED)          # 固定种子：断口位置每次一样，图像可复现
    for x in range(0, w + 1, step):
        for seg in range(0, h, step):
            if rng.randrange(10) < 3:          # 挖掉约三成：完整网格像壁纸，断口才像被用过
                continue
            gd.rectangle([x, seg, x + 2, min(h, seg + step)], fill=(255, 255, 255, 8))
    for y in range(0, h + 1, step):
        for seg in range(0, w, step):
            if rng.randrange(10) < 3:
                continue
            gd.rectangle([seg, y, min(w, seg + step), y + 2], fill=(255, 255, 255, 5))
    # 3–5 个节点亮点：说明这套格子是真被「测」过，不是贴的底纹
    for _ in range(4):
        nx = rng.randrange(max(1, w // step)) * step
        ny = rng.randrange(max(1, h // step)) * step
        gd.rectangle([nx - 1, ny - 1, nx + 3, ny + 3], fill=(255, 255, 255, 30))
    img = Image.alpha_composite(img.convert('RGBA'), grid).convert('RGB')

    # ④ -45° 斜纹带：横穿左下角（一半露在面板外、一半压在面板下）。
    #    45° 是这套语言里唯一的斜线角度；周期 16px、线宽 8px 是缩到手机上
    #    还不出摩尔纹的下限（更密的斜纹在 QQ 里会变成一层脏噪点）。
    band = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    bd = ImageDraw.Draw(band)
    #    位置骑住面板下边缘：露在外面的一段清晰、进面板的一段被糊掉。
    #    （上一版按 62% 高度画，正好横穿内容行，既抢字又像脏块。）
    #    位置由调用方按**面板下边缘**算好传进来（`band_y`）：斜纹带永远骑在
    #    面板的左下角上 —— 既让每张卡都有一块「被玻璃糊掉的纹理」可看，
    #    又不会因为卡片高度不同而在面板中间留下一块位置随机的脏斑
    #    （评审原话：「五张脏斑位置不同，这是唯一越改越像 bug 的地方」）。
    #    **周期 60px（缎带 40 + 接缝 20）不是随便定的，要按垂直于斜纹的方向算**：
    #    45° 斜纹的有效周期是水平周期的 1/√2，水平 36px 只有 25.5px，
    #    被 σ=9 的高斯衰减到 8.6%（实测振幅 15 → 2，面板里外看不出是同一根纹理）；
    #    水平 60px → 有效 42px，保留约 40%，「里面糊、外面锐利」的对照才成立。
    #    2:1 的缎带/接缝比也接近明日方舟黄黑警示带实测的 3:1。
    band_top, band_h = (band_y if band_y is not None else h - 260), 112
    for i in range(-band_h, int(w * 0.72), 60):
        bd.polygon([(i, band_top + band_h), (i + 40, band_top + band_h),
                    (i + 40 + band_h, band_top), (i + band_h, band_top)],
                   fill=(255, 255, 255, 20))
    img = Image.alpha_composite(img.convert('RGBA'), band).convert('RGB')

    # ⑤ 中空数字水印：官方那个 250px「只有描边、没有填充」的巨型读数。
    #    刻意骑在面板上边缘 —— 露在外面的一段清晰、进面板的一段被糊掉，
    #    这是全图最直观的「玻璃在起作用」的证据。描边色比正文暗得多（它是纹理不是内容）。
    # ⑧ 角落噪点：1–2% 透明度、只铺角落一小片。
    #    全幅铺 = 脏；不铺 = 太干净、像矢量图而不是「终端里的画面」。
    img = _grain(img, delta=2)

    return img


def _glass(img, box, radius=RADIUS):
    """在背景上落一块**磨砂玻璃**面板。

    配方取自对 Apple Materials / Microsoft Acrylic / CSS 磨砂玻璃三条线的调研，
    顺序不能换（先染色再噪点会把噪点染成彩色；先描边再裁圆角会把边切掉）：

      ① 外投影    —— 下移 8px、大而软，只是「抬起」的暗示（深色底上投影本来就弱）
      ② 采样背景  —— 往外扩 blur×1.2 再裁回来：不扩的话边缘的模糊会衰减发暗，
                     面板四周出现一圈脏边
      ③ 折射      —— 裁一块略大的背景放大 3%：玻璃有厚度时背后的东西会略微放大，
                     这一下是「像玻璃」和「像灰贴纸」的分水岭
      ④ 模糊      —— 唯一的「磨砂」信号。半径按面板尺寸取 32（1080 画布）
      ⑤ 提亮+对比+饱和 —— 真玻璃是**透光**的：比背后更亮、更艳，而不是蒙一层灰。
                     深色底上不做这一步，玻璃就等于一块黑贴纸
      ⑥ 染色      —— 冷色只混 0.42，多一分就成了不透明面板
      ⑦ 顶部高光+内阴影 —— 顶部 2px 镜面线 + 其下的指数衰减；底部内侧压一道内阴影
      ⑧ 颗粒      —— 2×2 块状、±3 灰阶：磨砂的「砂」就是这一层，也是消色带的
      ⑨ 渐变描边  —— 上/左亮、下/右暗（只有一个光源方向），加四角括角

    ⚠️ 两件必须记住的事：
      1. 返回的是**新图**，调用方必须接返回值（早期版本没接，整层玻璃被丢掉，
         卡片上只剩背景加文字，看起来就是「没有磨砂玻璃效果」）。
      2. 不能拿半透明图层 `paste(..., mask)`：`paste` 是替换像素、之后 `convert('RGB')`
         又会丢掉 alpha，半透明白会变成纯白（更早那版整块面板糊成浅灰就是这么来的）。
         所有半透明都得先 `_over()` 混成实色、或不透明合成。
    """
    x0, y0, x1, y1 = box
    size = (x1 - x0, y1 - y0)
    mask = _rounded_mask(size, radius)

    # ① 采样背景（外扩一点，再把放大后的那块缩回面板尺寸）
    #
    #    ⚠️ **必须在叠投影之前采样**。投影那块圆角矩形是拿 alpha 190 的黑色铺满
    #    **整个面板范围**的（它靠模糊糊出一圈外晕），先叠它、再从这里裁背景的话，
    #    裁到的是一张被压成近黑的图 —— 面板内部于是永远是一片常数，
    #    「透过去的背景」根本不存在。「看不到磨砂玻璃」的真正病根就是这个：
    #    效果画了，只是画在了错的图上（和「`_glass` 返回值没被接住」是同一类错误）。
    pad = max(6, int(BLUR * 1.2))
    #    平移 (REFRACT_DX, REFRACT_DY) 是**折射**：玻璃有厚度时，透过去的东西整体偏一点。
    #    不偏的话边界两侧的纹理相位连续，读起来就是「卡片自带底纹」而不是「玻璃在透光」。
    region = img.crop((x0 - pad + REFRACT_DX, y0 - pad + REFRACT_DY,
                       x1 + pad + REFRACT_DX, y1 + pad + REFRACT_DY)).convert('RGB')
    region = region.resize(size, Image.LANCZOS)

    # ④ 磨砂 = **低通**，不是「变淡」。
    #    ⚠️ 复评实测出来的坑：在原分辨率上 `GaussianBlur(9)`、之后又要缩回面板尺寸，
    #    **有效 σ 只剩 3.5 上下** —— 26px 周期的斜纹理论该衰减 91%，实测只掉一半，
    #    于是它读作「卡片自带的底纹」，不是「玻璃后面的东西糊了」。
    #    正确做法是先降到很低的采样率再升回来：**高于这个频率的一切（斜纹、网格、
    #    颗粒）整块丢掉**，只剩低频光影 —— 那才是磨砂的样子。顺带更快（模糊作用在小图上）。
    small = region.resize((BLUR_DOWN, max(1, int(round(size[1] * BLUR_DOWN / float(size[0]))))),
                          Image.BILINEAR)
    backdrop = small.resize(size, Image.BICUBIC)
    backdrop = ImageEnhance.Color(backdrop).enhance(1.5)      # 玻璃会把背后的颜色染浓一点

    # ⑤ 提亮走**加法**（+GLASS_LIFT 灰阶），不走乘法 + 深色混色：
    #    乘法在亮背景上会把面板压得比背景还暗（实测 -0.3 LSB，「像贴纸」），
    #    加法保证「面板比它背后的东西亮一档」——但这一档要**小**：
    #    复评实测 +12 那版面板成了全画面最亮的东西，而「磨砂玻璃是滤镜，
    #    不可能比身后场景亮这么多」，能给 +6 就别给 +12。
    glass = ImageChops.add(backdrop, Image.new('RGB', size, (GLASS_LIFT,) * 3))
    # ⑥ 染色只混 0.18（很轻的冷调）：混多了色相就被换掉，看着像有色树脂板
    glass = Image.blend(glass, Image.new('RGB', size, GLASS), GLASS_MIX)

    # ⑦ 高光与内阴影：**必须画在一张 RGBA 叠加层上、再 alpha_composite**。
    #    ⚠️ 这里踩过一个大坑：早先是直接 `gd.line(fill=_over(...))` 画在玻璃本体上的 ——
    #    而 `_over()` 返回的是**实色**，实色画线是「覆盖像素」而不是「混合」，
    #    于是顶高光那 347 行、内阴影那 44 行整片被涂成常数，
    #    透射进来的背景结构在那几段里被统统抹掉。玻璃的「透过去」只剩中间一小条，
    #    看起来就是一块不透明的深色板（三位评审都在说这件事，根因在这里）。
    glow = Image.new('RGBA', size, (0, 0, 0, 0))
    gg = ImageDraw.Draw(glow)
    # ⑦a 顶部高光：**沿长度衰减**（左亮右暗，光源在左上）+ 其下的指数衰减。
    #    恒亮等宽的线物理上不可能来自反射，眼睛会立刻把它归成「边框系统」——
    #    先看到边框，就先看到「卡片」而不是「玻璃」（复评的核心意见）。
    for x in range(size[0]):
        gg.line([(x, 0), (x, 1)], fill=(255, 255, 255, max(0, int(96 - 62 * (x / float(size[0]))))))
    for i in range(int(size[1] * 0.45)):
        a = int(30 * (0.985 ** i))
        if not a:
            break
        gg.line([(0, 2 + i), (size[0], 2 + i)], fill=(255, 255, 255, a))
    # ⑦b 左侧竖直高光：只覆盖上端 22%（同一个光源方向，越往下越暗）
    for i in range(int(size[1] * 0.22)):
        a = int(58 * max(0.0, 1 - i / (size[1] * 0.22)) ** 1.6)
        if a:
            gg.line([(0, i), (1, i)], fill=(255, 255, 255, a))
    # ⑦c 底部内阴影：玻璃「嵌进」底盘的那一侧，缺了它面板会像浮在空中
    for i in range(44):
        a = int(58 * (i / 44.0) ** 2)
        if a:
            gg.line([(0, size[1] - 1 - i), (size[0], size[1] - 1 - i)], fill=(0, 0, 0, a))
    glass = Image.alpha_composite(glass.convert('RGBA'), glow).convert('RGB')

    # ⑧ 颗粒：**只铺在背景上，不铺在玻璃里**。面板内大面积纯色 + 颗粒，
    #    在 400px 下读作「脏」，而不是「磨砂」（视觉评审第二轮实测）。
    #    磨砂的质感靠那层模糊本身，不靠噪点。

    # ② 外投影：面板轮廓下移 12px、模糊 26 —— 深色底上它几乎不可见，
    #    作用是「面板浮着」那一点接触感。**必须放在采样之后**（见上面的说明）。
    shadow = Image.new('RGBA', img.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        [x0, y0 + 12, x1, y1 + 14], radius=radius, fill=(0, 0, 0, 200))
    img = Image.alpha_composite(img, shadow.filter(ImageFilter.GaussianBlur(26)))

    img.paste(glass, (x0, y0), mask)

    # ⑨ 渐变描边：上/左亮、下/右暗（只有一个光源方向，四边等亮一眼假）。
    #    仍用 3px：1080 → 手机 400px 时 1px 只剩 0.37px，会被抹平。
    dr = ImageDraw.Draw(img)
    #    上/左亮、下/右暗（一个光源方向）。但两者差距别拉太大：实测上 120 / 下 78
    #    的硬对比读作「发光边框」，而玻璃的棱是**受光**出来的，不是发光。
    #    底 / 右两条压到 alpha 14：它们只是「面板到这儿结束」的位置提示，
    #    不该和顶光一样抢眼（复评：「删掉下边与右边的亮线，或降到 12% α」）。
    top_l, dim_l = _over((255, 255, 255), 58, RULE_HEAVY), _over((255, 255, 255), 14, RULE_HEAVY)
    dr.rectangle([x0, y0, x1, y0 + 1], fill=top_l)                 # 顶
    dr.rectangle([x0, y0, x0 + 1, y1], fill=top_l)                 # 左
    dr.rectangle([x0, y1 - 2, x1, y1], fill=dim_l)                 # 底
    dr.rectangle([x1 - 2, y0, x1, y1], fill=dim_l)                 # 右
    #    **不要**在外圈压暗线：复评实测那条 8.7 LSB 的暗缝把面板从背景上「剪」出来，
    #    是贴纸感的元凶 —— 真实玻璃的边界处，背景是连续的。
    # 四角括角：臂长 46px、线宽 3px，与顶边同亮（两处亮度对不齐是「脚本拼的」最明显证据）
    #    括角压到顶光的 40%：它是角标，不该和玻璃的边缘抢解释权（复评）
    arm, bracket = 34, _over((255, 255, 255), 24, RULE_HEAVY)
    for cx, cy, dx, dy in ((x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)):
        dr.rectangle([min(cx, cx + dx * arm), cy, max(cx, cx + dx * arm), cy + 2], fill=bracket)
        dr.rectangle([cx, min(cy, cy + dy * arm), cx + 2, max(cy, cy + dy * arm)], fill=bracket)
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


CHIP_MIN_W = 132
CHIP_H = 44


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
    w = max(int(draw.textlength(text, font=font)) + 30, min_width)
    h = CHIP_H
    draw.rectangle([x, y, x + w, y + h], fill=_over(ink, 30))
    #    描边 2px：1px 在 400px 下只剩 0.37px，会被抗锯齿随机分配 ——
    #    同一个胶囊上边亮、下边暗，像缺了一条边（实测）。
    draw.rectangle([x, y, x + w, y + h], outline=_over(ink, 190), width=2)
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


def _signal_bar(draw, x, y, width=112, height=6):
    """三色信号条：品红 → 青 → 黄渐隐（官方那条的宽度比例就是 24/24/112）。

    它比一整条纯色条「有话说」：三段代表三种信号强度，
    放在页脚当作「这张卡是机器生成的、有状态」的记号。
    """
    seg = width / 160.0
    m = max(2, int(24 * seg))
    c = max(2, int(24 * seg))
    y2 = y + height
    draw.rectangle([x, y, x + m, y2], fill=MAGENTA)
    draw.rectangle([x + m + 3, y, x + m + 3 + c, y2], fill=CYAN)
    # 杨黄那段用逐像素渐隐画（Pillow 没有渐变填充）
    grad_x = x + m + c + 6
    total = max(8, int(112 * seg))
    for i in range(total):
        alpha = int(200 * (1 - i / float(total)))
        if alpha <= 0:
            break
        draw.line([(grad_x + i, y), (grad_x + i, y2)], fill=_over(YELLOW, alpha))


def _hazard_line(draw, x0, x1, y, height=8, period=8, alpha=None):
    """底部警示斜纹带：-45°。

    斜纹周期从 6px 放到 8px：手机 QQ 里图片会被缩到 ~400px 宽，周期太密会出摩尔纹，
    整条看着像一层脏噪点（视觉评审提醒的）。
    """
    for i in range(int(x0), int(x1), period):
        draw.polygon([(i, y + height), (i + 3, y + height),
                      (i + 3 + height, y), (i + height, y)],
                   fill=_over(INK, 46 if alpha is None else alpha))
    draw.line([(x0, y - 1), (x1, y - 1)], fill=_rgba(INK, 26))


def _progress(draw, x, y, width, ratio, height=10):
    """纯色实心进度条（官方就是这样：无圆角、无渐变）。

    轨道要**明显比填充暗**：两者都亮的话一眼看不出用掉多少（视觉评审读成「满格」）。
    末端再点一个 3px 游标 —— 比例再小也看得见。
    """
    ratio = max(0.0, min(1.0, ratio))
    draw.rectangle([x, y, x + width, y + height], fill=_over(INK, 34))
    filled = max(6, int(width * ratio))
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
    # 表头：一句话交代这两列是什么。上一版每一行都印一遍「单号」——
    # 四行重复四次，而真正该说的「这一列是时间」反倒没地方说。
    draw.text((x0, y + 4), '文件', font=_font('cjk', T_META), fill=INK_4)
    draw.text((x1, y + 4), '单号 · 提交时间', font=_font('cjk', T_META), fill=INK_4, anchor='ra')
    y += 44
    for item in payload.get('orders') or []:
        status = item.get('status') or ''
        ink = STATUS_INK.get(status, INK_2)
        # 2026-09-21：**不再展示内部订单编号，也不再在左边重复一遍单号** ——
        # 用户面前只有一个标识：单号（右侧那串大字）。它既是取件时报的号，
        # 也是查单 / 撤回时引用的号，左侧再抄一遍纯属噪音，白占 92px 标题宽度。
        code = str(item.get('pickup_code') or '—')
        draw.text((x1, y), code, font=_font('mono', T_CODE, 600), fill=INK, anchor='ra')
        code_w = draw.textlength(code, font=_font('mono', T_CODE, 600))
        draw.text((x0, y + 1),
                  _truncate(draw, (item.get('title') or '（无标题）').replace('\n', ' '),
                            _font('cjk', T_BODY), x1 - x0 - code_w - 120),
                  font=_font('cjk', T_BODY), fill=INK)
        _chip(draw, x0, y + 44, status, ink)
        bits = ['%s 份' % (item.get('copies') or 1),
                '未计费' if item.get('price') is None else '%.2f 元' % item['price']]
        draw.text((_chip_next_x(x0), y + 52), ' · '.join(bits),
                  font=_font('cjk', T_META), fill=INK_3)
        draw.text((x1, y + 52), (item.get('create_time') or '')[5:16],
                  font=_font('mono', T_META, 400), fill=INK_4, anchor='ra')
        y += ROW_H
        # 3px 线宽是硬要求：1080 缩到手机约 400px 时 1px 只剩 0.37px，
        # 会被抗锯齿抹平 —— 「看不清」和「不存在」在用户眼里是一回事。
        draw.rectangle([x0, y + DIVIDER_DY, x1, y + DIVIDER_DY + 3], fill=_over(INK, 34))
    return y


def _rows_tickets(draw, y, x0, x1, payload):
    for item in payload.get('tickets') or []:
        opened = item.get('status') == 'open'
        #    「工单 7」与用户自填的标题**必须隔开**：贴在标题前面会被读成
        #    「工单7打印出来有黑边」（复评原话）。编号占固定列，标题与状态从 x0+190 起。
        draw.text((x0, y + 8), '工单 %s' % item.get('ticket_id'),
                  font=_text_font('工单 %s' % item.get('ticket_id'), T_META, 500, mono=True),
                  fill=INK_4)
        draw.text((x0 + 190, y + 1),
                  _truncate(draw, (item.get('subject') or '').replace('\n', ' '),
                            _font('cjk', T_BODY), x1 - x0 - 190 - 240),
                  font=_font('cjk', T_BODY), fill=INK)
        #    「进行中」不再用黄：黄在这套语言里只给「你现在能行动的事」（可取件），
        #    工单开着不需要用户做任何事，用中性白就行。
        _chip(draw, x0 + 190, y + 50, '进行中' if opened else '已关闭',
              INK_2 if opened else INK_4, min_width=96)
        chip_x = x0 + 190 + 96 + 16
        if item.get('unread'):
            # 「有新回复」是这一行最该跳出来的信息，得给足分量：做成和状态牌同形状的
            # 品红胶囊（原先只有一个 8px 小方块 + 彩字，最该显眼的反倒最弱）。
            _chip(draw, chip_x, y + 50, '有新回复', MAGENTA, min_width=104)
        last = (item.get('last_body') or '').replace('\n', ' ')
        if last:
            # 摘要放**固定列**：跟着状态牌宽度浮动的话，两行的摘要起点会差十几像素，
            # 一列字看着就散了（复评指出的）。
            #    摘要列右移：品红胶囊的右缘在 x0+92+96+16+104+4≈x0+312，
            #    原先摘要从 x0+340 起，两者只隔 28px —— 缩到手机上就是撞在一起。
            draw.text((x0 + 440, y + 56),
                      _truncate(draw, last, _font('cjk', T_META), max(120, x1 - x0 - 440 - 170)),
                      font=_font('cjk', T_META), fill=INK_3)
        draw.text((x1, y + 56), (item.get('update_time') or '')[5:16],
                  font=_font('mono', T_META, 400), fill=INK_4, anchor='ra')
        y += ROW_H
        # 3px 线宽是硬要求：1080 缩到手机约 400px 时 1px 只剩 0.37px，
        # 会被抗锯齿抹平 —— 「看不清」和「不存在」在用户眼里是一回事。
        draw.rectangle([x0, y + DIVIDER_DY, x1, y + DIVIDER_DY + 3], fill=_over(INK, 34))
    return y


def _rows_presets(draw, y, x0, x1, payload):
    for item in payload.get('presets') or []:
        # 编号做成方框铭牌（黄框 + 低透黄底）
        #    编号牌改中性（原先黄框黄字）：黄色全卡只留三个角色 —— 标题标、
        #    「可取件」状态、信号条。多一个角色，强调就贬值一次。
        draw.rectangle([x0, y + 18, x0 + 52, y + 68], fill=_over(INK, 26),
                       outline=_over(INK, 150), width=2)
        draw.text((x0 + 26, y + 43), str(item.get('preset_id')),
                  font=_font('mono', 30, 600), fill=INK, anchor='mm')
        draw.text((x0 + 80, y + 14),
                  _truncate(draw, (item.get('content') or '').replace('\n', ' '),
                            _font('cjk', 32), 700),
                  font=_font('cjk', 32), fill=INK)
        # 第二行写「怎么用它」：既填掉原来横跨 600px 的空白，也省得用户去翻说明
        draw.text((x0 + 80, y + 62),
                  '发「打印服务 %s」按这条下单' % item.get('preset_id'),
                  font=_font('cjk', T_META), fill=INK_4)
        # 「可用」跟**两行整体**垂直居中（原先跟着第一行，重心偏上）
        draw.text((x1, y + 42), '可用', font=_font('cjk', T_META), fill=INK_4, anchor='ra')
        y += ROW_H + 16
        draw.rectangle([x0, y + DIVIDER_DY + 8, x1, y + DIVIDER_DY + 10], fill=_over(INK, 26))
    return y


def _rows_me(draw, y, x0, x1, payload):
    orders = payload.get('orders') or {}
    usage = payload.get('usage') or {}
    cells = [('我的单数', str(orders.get('total', 0)), INK),
             ('进行中', str(orders.get('in_progress', 0)), INK),
             ('待我取件', str(orders.get('ready', 0)), YELLOW),
             ('已取件', str(orders.get('done', 0)), INK_2)]
    #    四列右对齐到各自格子的右缘（第一列除外，它左对齐到内容左缘）——
    #    左对齐的话数字都短，最后一列右端会空出 140px，整行像没排满。
    cw = (x1 - x0) / float(len(cells))
    for i, (label, value, color) in enumerate(cells):
        right = int(x0 + cw * (i + 1) - 16)
        #    每一列自成一格：**标签靠左、数值靠右**，两缘都落在同一个网格上。
        #    四列全部右对齐时，标签左缘会随字数乱跳（实测列距 340/192/249）——
        #    仪表盘的行是「标签 + 读数」，不是一列右对齐的数字。
        left = int(x0 + cw * i) + (0 if i == 0 else 20)
        draw.text((left, y), label, font=_font('cjk', T_META), fill=INK_3)
        draw.text((left, y + 32), value, font=_font('mono', 56, 600), fill=color)
        if i:
            draw.rectangle([int(x0 + cw * i) - 20, y + 6, int(x0 + cw * i) - 18, y + 80],
                           fill=_over(INK, 34))
    y += 112
    draw.rectangle([x0, y, x1, y + 2], fill=_over(INK, 26))
    y += 26
    draw.text((x0, y + 12), '累计花费', font=_font('cjk', T_META), fill=INK_3)
    spent = orders.get('spent') or 0
    # 金额是**次要**信息：数字用正文色，只有单位带强调色。
    # （原先数字用亮青大字，成了第二视觉中心、盖过上面四个读数。）
    spent_text = '%.2f' % spent
    draw.text((x0 + 150, y), spent_text, font=_font('mono', 46, 600), fill=INK)
    #    「元」与数字**同基线**：`anchor='ls'` 是左-基线，避免中文往下掉（字号小一档时
    #    最容易看出来，评审实测差 7px）。
    #    单位用中性灰而不是青色：卡上只留三种有含义的颜色（黄=要你做 / 青=机器在做 /
    #    品红=要你看），「元」是单位，不该占一个语义色（复评）。
    draw.text((x0 + 160 + draw.textlength(spent_text, font=_font('mono', 46, 600)), y + 38),
              '元', font=_font('cjk', T_META), fill=INK_3, anchor='ls')
    used, quota = usage.get('used_bytes') or 0, usage.get('quota_bytes') or 0
    if quota:
        y += 68
        draw.text((x0, y + 8), '存储用量', font=_font('cjk', T_META), fill=INK_3)
        draw.text((x0 + 150, y), '%s / %s' % (_human(used), _human(quota)),
                  font=_font('mono', 26, 500), fill=INK_2)
        draw.text((x1, y + 6), '%.2f%%' % (100.0 * used / quota),
                  font=_font('mono', T_META, 500), fill=INK_4, anchor='ra')
        y += 46
        #    宽度必须与其它元素同一个右缘（x1）：早先这条画到了 1021，
        #    比所有文字多出 41px，缩到手机上就是明显出界（评审实测抓到的）。
        _progress(draw, x0, y, x1 - x0, used / quota if quota else 0)
        y += 40
    return y


def _rows_help(draw, y, x0, x1, payload):
    """帮助卡：命令清单分节排（左命令、右说明），命令名用等宽好对齐。"""
    for section in payload.get('help') or []:
        label = str(section.get('title') or '').upper()
        # 标题是中文，必须走 _text_font：Space Grotesk 只有拉丁字形，
        # 拿它画「下单 / 查询」会出豆腐块（这一版就漏过）
        #    分节标：8px 黄方块 + 宽字距白字。方块是全卡最小的一处黄，
        #    只做「这一节从这里开始」的分隔记号。
        draw.rectangle([x0, y + 4, x0 + 8, y + 20], fill=YELLOW)
        _tracked(draw, (x0 + 20, y), label, _text_font(label, 26, 600), INK, 0.10)
        #    引线从**说明列起点**（x0+320）开始，不另起一根谁都不对齐的轴
        #    横线从**卡的左内边距**起画：从说明列起画的话，它不对齐任何一根轴，
        #    是「一眼看出是渲染事故」的那种悬空半条线（复评）。
        draw.rectangle([x0, y + 17, x1, y + 19], fill=_over(INK, 26))
        y += 52
        for item in section.get('items') or []:
            cmd = item.get('cmd') or ''
            #    命令是「要照抄的东西」：亮一档 + 等宽 + 宽字距，和说明列拉开层级
            draw.text((x0 + 8, y + 2), cmd, font=_text_font(cmd, 30, 600, mono=True), fill=INK)
            draw.text((x0 + 320, y + 4),
                      _truncate(draw, item.get('desc') or '', _font('cjk', T_META),
                                x1 - (x0 + 306) - 8),
                      font=_font('cjk', T_META), fill=INK_3)
            y += 56
        y += 24
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


def _watermark_of(kind, payload, rows):
    """右上角那枚中空巨型读数是什么。

    它占的是全卡最大的位置，所以必须放**要用户行动的那个数**，
    而不是「数一遍就有的数」。复评的原话是「它用最大的位置承载了最低的信息量」——
    「本页 4 条」这种读数，用户自己数得出来；「有 2 件等着你取」才是要他动手的。

      orders  → 可取件的件数（去取件）
      tickets → 有新回复的条数（去看）
      me      → 待我取件的件数（同上）
      presets / help → 项目数（这两个没有「待办」维度，退回总量）
    数字是 0（或没有）就**不画** —— 一枚大号的 0 只会让人以为出了问题。
    """
    if kind == 'orders':
        value = sum(1 for o in (payload.get('orders') or []) if o.get('status') == ST_READY)
    elif kind == 'tickets':
        value = sum(1 for x in (payload.get('tickets') or []) if x.get('unread'))
    elif kind == 'me':
        value = (payload.get('orders') or {}).get('ready') or 0
    else:
        value = rows
    return '%02d' % value if value else ''


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


def _measure_body(kind, payload):
    """内容区**实际**会有多高 —— 把行函数在一张丢弃的探针图上真跑一遍再量。

    为什么不继续用「行高 × 行数」去估：那个模型已经错过三次（预设卡底部空一片、
    帮助卡改了行距之后直接溢出面板、行高调整后分隔线压到胶囊上），
    而每一次都是**不报错、只是排版不对**。改成实测之后，行函数的间距怎么改，
    高度自动跟着走，两者不可能再对不上。

    代价是多画一遍文字（几毫秒），买的是「这类 bug 从此不存在」。
    """
    probe = Image.new('RGB', (W, 4000))
    draw = ImageDraw.Draw(probe)
    x0, x1 = PAD + PANEL_PAD, W - PAD - PANEL_PAD
    top = PAD + PANEL_PAD + HEAD_H
    if not _count_of(kind, payload):
        return ROW_H
    #    减去末行没用完的那截：行函数推进一整行（ROW_H），而末行的内容只画到分隔线
    #    （y + DIVIDER_DY + 3）。不减的话，两行的工单卡底部会空出十几像素的死白，
    #    配上钉底的页脚，看着像「内容没填满模板」（复评）。
    used = _ROW_FN[kind](draw, top, x0, x1, payload) - top
    return max(ROW_H, used - ROW_H + DIVIDER_DY + 6)


def _chassis(draw, top, x0, x1, payload):
    """面板**下方**那条机架条（画在背景上，不在玻璃里）。

    为什么搬出来：上一版把它塞在面板内的底部，两头都别扭 —— 内容与页脚抢高度，
    而玻璃面板的下边缘又看不出来（边缘恰恰是「玻璃感」最该被看见的地方）。
    搬出来之后它同时干三件事：① 让玻璃上下都有背景可透；② 把「这是机器出的一张卡」
    说清楚；③ 用一条横带把整张卡收口。

    **只放真数据**：信号条 + 生成时刻。上一版这里还有「PRINT SERVICE」「1080 × 888」
    「04 ROWS」和一条刻度带 —— 视觉评审的原话是「读者无从理解，是渲染元信息漏到成品上」，
    而且四条装饰吃掉两成高度。装饰一旦不承载信息，在 400px 下就只是灰渍。
    """
    y = top + 30
    _signal_bar(draw, x0, y)
    stamp = payload.get('stamp') or ''
    if stamp:
        draw.text((x1, y - 5), '生成 %s' % stamp,
                  font=_text_font('生成 %s' % stamp, T_META), fill=INK_4, anchor='ra')


def render(kind, payload):
    """把一份数据渲染成 PNG 字节；没有可用字体时返回 None（调用方退回文本）。

    kind：orders / tickets / presets / me / help。
    一句话能说清的内容**不要**做成卡片（单号、下单成功这些仍走文本）——
    手机里点开一张图比读一行字慢。
    """
    if kind not in _ROW_FN:
        raise ValueError('未知的卡片类型：%s' % kind)
    if not available():
        return None

    body_h = _measure_body(kind, payload)
    # 面板里只留 PANEL_PAD 的收尾（页脚已经搬到面板外的机架条上）
    height = PAD * 2 + PANEL_PAD * 2 + HEAD_H + body_h + FOOT_H

    rows = _count_of(kind, payload)      # 给「空状态」判断与读数用
    box = (PAD, PAD, W - PAD, height - PAD - FOOT_H)
    # 斜纹带骑在面板左下角：一半露在背景上（清晰）、一半压进玻璃（被糊掉）
    base = _scene(W, height, band_y=box[3] - 56).convert('RGBA')
    # ⚠️ **必须接返回值**：`_glass()` 里的 alpha_composite 是「算出一张新图」而不是就地改，
    # 光写 `_glass(base, box, RADIUS)` 的话模糊/折射/描边/括角/高光**全都被丢掉** ——
    # 卡片上只剩一张纯背景加文字，看起来就是「没有玻璃」。
    # 这个 bug 一直活到第三轮才被抓出来：前两轮都在调模糊半径、混色比例那些参数，
    # 而那一层根本没画上去（调什么都没用）。
    base = _glass(base, box, RADIUS)
    draw = ImageDraw.Draw(base)

    x0 = PAD + PANEL_PAD
    x1 = W - PAD - PANEL_PAD
    y = PAD + PANEL_PAD

    # 标题：黄色竖条 + 中文大标题 + 右侧英文小标签
    # 标题竖条用**硬切渐变**（上白下黄、在 1/3 处直接切）—— 官方那个
    # 「#fff 到 101px 处直接变 #fffa00」的写法，比平滑渐变更有印刷感。
    bar_top, bar_bottom = y + 6, y + T_TITLE - 4
    cut = bar_top + (bar_bottom - bar_top) // 3
    draw.rectangle([x0, bar_top, x0 + 5, cut], fill=INK)
    draw.rectangle([x0, cut, x0 + 5, bar_bottom], fill=YELLOW)
    draw.text((x0 + 24, y), _TITLES[kind], font=_font('cjk_bold', T_TITLE), fill=INK)
    #    eyebrow 只留名字：编号交给右上角那枚**中空巨型读数**（官方母题），
    #    同一个数在一张卡上印两遍会让人以为它们不是一回事。
    _eyebrow(draw, x1, y + 16, _EYEBROW[kind])
    y += T_TITLE + 24
    _rule(draw, x0, x1, y)
    y += 28

    # 元信息行：账号（左）/ 同步时刻（右）
    meta_left = 'QQ %s' % (payload.get('qq') or '—')
    if payload.get('nickname'):
        meta_left += ' · %s' % payload['nickname']
    draw.text((x0, y), meta_left, font=_text_font(meta_left, T_META, 400, mono=True), fill=INK_4)
    # 生成时刻只在底盘出现一次（原先头部一行「SYNC」+ 底盘一行，重复且像伪遥测）：
    # 同一个读数印两遍，读的人就要花一次力气去确认它们是不是同一个东西。
    y += 34
    draw.rectangle([x0, y, x1, y + 1], fill=_over(INK, 30))
    y += 22

    if rows:
        y = _ROW_FN[kind](draw, y, x0, x1, payload)
    else:
        draw.text((x0 + 4, y + 6), _EMPTY[kind], font=_font('cjk', T_BODY), fill=INK_3)
        y += ROW_H

    # 右上角的中空巨型读数：**画在玻璃之上**。
    # 它是「印在面板上的主读数」，不是背景纹理 —— 画进背景层会被模糊和染色压到看不见
    # （实测：改成背景元素之后整枚水印直接消失）。官方那套里它也是压在内容上层的水印。
    mark = _watermark_of(kind, payload, rows)
    if mark:
        #    落位在**元信息行的右端**（那半行本来空着），与上方的 eyebrow 组成
        #    官方那对「宽字距小标签 + 中空巨型读数」。基线对齐元信息行，
        #    否则它会压到下面那张表的表头上（实测压得完全读不出来）。
        #    描边提到 96（≈#6a6a6a，对面板约 2.8:1）：先前 52 在 400px 下糊成一团灰雾，
        #    而它是全卡最响的一层，不该是「最看不清的那一层」（复评实测）。
        draw.text((x1, box[1] + PANEL_PAD + 136), mark, font=_font('display', 104, 700),
                  fill=(0, 0, 0, 0), stroke_width=3,
                  stroke_fill=_over(INK, 96, PANEL_SOLID), anchor='rs')

    # 底部机架条：在**面板之外**（见 _chassis 的说明）
    _chassis(draw, box[3], x0, x1, payload)

    buf = io.BytesIO()
    base.convert('RGB').save(buf, format='PNG', optimize=True)
    return buf.getvalue()
