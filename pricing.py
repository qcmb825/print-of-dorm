"""pricing.py —— 自动**预估**价（下单时按文件页数算给学生看的参考价）。

先把一件事说清楚，因为它决定了这个模块的每一处取舍：

    **预估价不是价格。** 最终价永远由管理员接单、看过文件之后自己确认
    （orders.price，走 routes/orders.py 的 PUT /price）。这里算出来的东西
    只写进 orders.est_price，只用来在学生下单成功时、以及他翻自己的订单时
    显示一句「预估 ¥x.xx（以管理员核定为准）」。

    所以 `est_price` 和 `price` 是**两列**，任何地方都不许拿前者去填后者 ——
    一旦自动算出来的数字变成真正要收的钱，就没有人去核对它了，
    而这份估算的依据（文件页数）本身是**从用户上传的文件里读出来的**。

三条硬约束（改这个模块之前先读一遍）：

  ① **页数解析绝不能抛异常、绝不能拖慢上传。** 它读的是学生刚传上来的文件，
     格式不对、文件损坏、密码保护、几十兆的扫描件都可能出现。
     任何解析失败都只是「这次没预估价」，订单照下、流程照走 ——
     为了一个给人看的参考值把下单卡住，是本末倒置。
     文件超过 config.EST_SCAN_MAX_BYTES 就直接不读（不估），
     单文件上限是 50MB，每次都扫一遍会白占一个 waitress 线程。

  ② **系数只有一份真相，就在 price_rules 表里**（管理员在「计价规则」页改）。
     默认值写在这里的 DEFAULTS，只在库里没有那一行时生效。
     网页端、机器人、试算接口都走 get_rules()，不许各读各的。

  ③ **金额一律两位小数**，和 orders.price 同一套口径（元）。
     系数填错（负数、天文数字）在 save_rules 里收口，
     不靠界面上的输入框拦 —— 界面挡不住直接打接口的手。

页数是从文件里数出来的，所以它天然分两档：**确定**（PDF 的对象数、docx/doc
元数据里的页数）和**估算**（按分页符、段落数、字数折算）。两档都用同一个
数字返回，只在说明文字里区分 —— 界面上那句「预估」已经说明了一切，
再让用户去分辨「这个页数是算的还是猜的」没有意义；而管理员本来就会打开文件看。
"""

import io
import os
import re
import struct
import zipfile
import zlib

from config import (COPIES_MAX, COPIES_MIN, EST_PAGES_MAX, EST_SCAN_MAX_BYTES,
                    PRICE_COEF_MAX, PRICE_MAX_YUAN, PRICE_RE, logger)
from db import db_conn

# 计价公式的四档单价（元/页）。键名与 orders.color_type / duplex 的取值一一对应，
# 拼法见 unit_price()：`page_<black|color>_<single|double>`。
COEF_KEYS = ('base_fee', 'min_price', 'page_black_single', 'page_black_double',
             'page_color_single', 'page_color_double')

# 一整套默认系数。默认**启用**：这是业主点名要的功能，装了却不显示等于没装。
# 数字给的是校园打印里常见的一档，业主在「计价规则」页按自己的价目表改。
DEFAULTS = {
    'enabled': True,
    'base_fee': 0.0,             # 每单基础费（元/单）
    'min_price': 0.0,            # 最低消费（元/单）
    'page_black_single': 0.10,
    'page_black_double': 0.08,
    'page_color_single': 0.50,
    'page_color_double': 0.40,
}

# 一次最多认多少页。**这个数是防着上传文件的**：页数读出来就直接进公式，
# 没有上限的话，一个伪造的「999999 页」PDF 能算出一个天文数字的预估价挂在下单页上。
# 超了就按上限截断，并在说明里写明截断了。
PAGES_CLAMP_NOTE = '已按上限 %s 页估算' % EST_PAGES_MAX


# ---- 规则读写 ---------------------------------------------------------------

def parse_coefficient(value, label):
    """把管理员填的系数字符串解析成「元」，返回 (金额, 错误信息)。

    形状与计费金额同一套（config.PRICE_RE：最多六位整数、最多两位小数），
    再卡一道上限。**允许 0**（`base_fee = 0` 是完全正常的填法），
    但**不允许负数**：负的单价会让总价变成负数，而「退钱给学生」不是这个系统的事。
    """
    if isinstance(value, bool):
        return None, '%s请填写数字' % label
    text = repr(value) if isinstance(value, (int, float)) else str(value or '').strip()
    if not text:
        return None, '请填写%s' % label
    if not PRICE_RE.match(text):
        return None, '%s要填不超过 %s 元的数字，最多两位小数' % (label, PRICE_COEF_MAX)
    amount = round(float(text), 2)
    if amount > PRICE_COEF_MAX:
        return None, '%s不能超过 %s 元' % (label, PRICE_COEF_MAX)
    return amount, None


def get_rules(conn=None):
    """取计价规则（库里没有那一行就是默认值）。

    永远返回一份**完整**的字典：少一个键就要在每个调用点上判一次 None，
    而漏判的那一处不会报错，只会静默地少算一项。
    """
    sql = 'SELECT * FROM price_rules WHERE id = 1'
    try:
        if conn is None:
            with db_conn() as own:
                row = own.execute(sql).fetchone()
        else:
            row = conn.execute(sql).fetchone()
    except Exception:
        #    表还没建出来（老库第一次启动、或迁移中途挂了）时按默认值走 ——
        #    预估是个附加功能，它读不到配置不该让下单接口直接 500。
        logger.exception('读取计价规则失败，本次按默认系数估算')
        row = None
    rules = dict(DEFAULTS)
    if row is not None:
        for key in COEF_KEYS:
            try:
                if row[key] is not None:
                    rules[key] = float(row[key])
            except (KeyError, TypeError, ValueError):
                logger.warning('计价规则里的 %s 读不出来，按默认值 %s 处理', key, DEFAULTS[key])
        rules['enabled'] = bool(row['enabled']) if 'enabled' in row.keys() else True
    return rules


def save_rules(fields, user_id=None):
    """保存计价规则，返回 (规则, 错误信息)。

    只认白名单里的键（接口层别把请求体直接塞进 SQL）。**一次提交要覆盖全部系数**：
    界面是「整页一起保存」，只改一项却漏传其它项，落在 UPSERT 上就是把它们
    悄悄清成 NULL —— 而那一列的默认值和我们读出来的值不是一回事。
    """
    rules = {}
    for key in COEF_KEYS:
        if key not in fields:
            return None, '缺少%s，请整页保存' % key
        amount, error = parse_coefficient(fields.get(key), _COEF_LABELS[key])
        if error:
            return None, error
        rules[key] = amount
    enabled = fields.get('enabled')
    if isinstance(enabled, str):
        text = enabled.strip().lower()
        if text in ('1', 'true', 'on', 'yes', '开'):
            enabled = True
        elif text in ('0', 'false', 'off', 'no', '关'):
            enabled = False
    if enabled not in (True, False, 0, 1):
        return None, '「启用自动估价」只能是开或关'
    rules['enabled'] = bool(enabled)

    columns = ', '.join(rules.keys())
    placeholders = ', '.join('?' for _ in rules)
    updates = ', '.join('%s = excluded.%s' % (k, k) for k in rules)
    with db_conn() as conn:
        conn.execute(
            'INSERT INTO price_rules (id, %s, updated_by) VALUES (1, %s, ?) '
            'ON CONFLICT(id) DO UPDATE SET %s, updated_by = excluded.updated_by, '
            'update_time = CURRENT_TIMESTAMP' % (columns, placeholders, updates),
            (*rules.values(), user_id))
        conn.commit()
    logger.info('计价规则已更新：%s', '、'.join('%s=%s' % (k, rules[k]) for k in sorted(rules)))
    return rules, None


_COEF_LABELS = {
    'base_fee': '每单基础费',
    'min_price': '最低消费',
    'page_black_single': '黑白单面单价',
    'page_black_double': '黑白双面单价',
    'page_color_single': '彩色单面单价',
    'page_color_double': '彩色双面单价',
}


def describe(rules):
    """把规则翻成人话（管理页与机器人共用，避免两处话术分叉）。"""
    if not rules.get('enabled'):
        return ['自动估价：已关闭（订单不再显示预估价，只由管理员计费）']
    lines = [
        '单价（元/页）：黑白单面 %s · 黑白双面 %s · 彩色单面 %s · 彩色双面 %s'
        % tuple(_money(rules[key]) for key in ('page_black_single', 'page_black_double',
                                               'page_color_single', 'page_color_double')),
        '每单基础费 %s 元，最低消费 %s 元；纸张可以另设每页加价' % (
            _money(rules['base_fee']), _money(rules['min_price'])),
        '公式：总价 = 基础费 + 页数 × 份数 × (单价 + 纸张加价)，再取「最低消费」与它的较大值',
    ]
    return lines


# ---- 算价 -------------------------------------------------------------------

def _money(value):
    """金额显示成两位小数的字符串（'0.10' / '12.00'）。"""
    return '%.2f' % value


def normalize_color(value):
    """颜色只认 'color'，其余（含 None / 脏值）一律当黑白。"""
    return 'color' if value == 'color' else 'black'


def normalize_duplex(value):
    """单双面只认 'double'，其余一律当单面。"""
    return 'double' if value == 'double' else 'single'


def unit_price(rules, color, duplex, paper_delta=0.0):
    """一页的单价（元）：四档基础单价 + 这种纸的加价。

    加价**不允许把单价压成负数**：管理员把某一种纸的加价填得比单价还大时，
    夹到 0 —— 总价不会因此变成负数，也不会出现「打得多、反而倒贴」的算式。
    """
    key = 'page_%s_%s' % (normalize_color(color), normalize_duplex(duplex))
    return max(0.0, float(rules.get(key, 0.0)) + float(paper_delta or 0.0))


def estimate(rules, pages, copies, color, duplex, paper_delta=0.0):
    """算预估价，返回 (金额, 说明)。算不出来时金额为 None，说明里写原因。

    说明是给日志和接口调用方看的一句话，**不是**给学生看的文案 ——
    界面上的那句话由前端拼（「预估 ¥x.xx，以管理员核定为准」）。

    算不出来的三种情形，都是「如实说不知道」而不是「猜一个 0」：
      · 规则没启用；
      · 页数读不出来（没有文件、格式不认识、文件太大没扫）；
      · 算出来是 0 或超出金额上限（前者说明系数全填了 0，后者已经不是一笔正常的账）。
    """
    if not rules.get('enabled'):
        return None, '自动估价未启用'
    if not pages or pages < 1:
        return None, '读不出文件页数'
    pages = int(pages)
    note = ''
    if pages > EST_PAGES_MAX:
        pages = EST_PAGES_MAX
        note = PAGES_CLAMP_NOTE
    try:
        copies = int(copies)
    except (TypeError, ValueError):
        copies = 1
    copies = max(COPIES_MIN, min(COPIES_MAX, copies))
    total = float(rules.get('base_fee', 0.0)) \
        + pages * copies * unit_price(rules, color, duplex, paper_delta)
    total = max(total, float(rules.get('min_price', 0.0)))
    total = round(total, 2)
    if total <= 0:
        return None, '按当前规则算出来的价格是 0（检查单价是不是都填了 0）'
    #    超出计费上限的预估**不给**：那个数连管理员都填不进最终价（parse_price 会拒），
    #    摆一个填不进去的数字在屏幕上，只会让人以为系统坏了一只手。
    if total > PRICE_MAX_YUAN:
        return None, '按当前规则算出来的价格超出金额上限'
    return total, ('%s 页 × %s 份，%s' % (pages, copies, note or '规则价'))


def paper_delta_of(paper):
    """从纸张字典/行里取「每页加价」，取不到就是 0。

    为什么写得这么小心：这个值会从三条路径传进来（网页上传 / 分片合并 / 机器人），
    而它们拿到的 paper 形状并不统一 —— 有一条路给的是 `resolve_print_options`
    裁过的快照字典（只有 id/name/remark），另一条给的是 `SELECT *` 的整行。
    直接 `paper['price_delta']` 会在前者上抛 KeyError，而它被下面那句
    `except Exception` 吞掉之后，症状是**这一单没有预估价**，
    页数明明读到了、价格却不见 —— 本轮实测就是这么栽的（A3 加价那一条断言）。
    """
    if not paper:
        return 0.0
    try:
        keys = paper.keys()
    except AttributeError:
        return 0.0
    if 'price_delta' not in keys:
        return 0.0
    try:
        return float(paper['price_delta'] or 0.0)
    except (TypeError, ValueError):
        return 0.0


def estimate_for_order(conn, pages, copies, color, duplex, paper):
    """下单路径用的入口：自己取规则、自己取纸张加价，返回 (金额, 说明)。

    两个便利之处，都是为了「下单接口里只写一行」：
      · 规则与纸张加价都在这里读，调用方不用先查库再拼；
      · **任何异常都吞掉并返回 None** —— 预估算不出来是小事，
        让它把一次正常的下单搞成 500 是大事（见模块注释第①条）。
    """
    try:
        rules = get_rules(conn)
        return estimate(rules, pages, copies, color, duplex, paper_delta_of(paper))
    except Exception:
        logger.exception('估算价格时出错了，这一单不带预估价')
        return None, '估算时出错'


# ---- 页数 -------------------------------------------------------------------
#
# 下面每个解析器都只做一件事：**尽力**给出一个页数，给不出就 None。
# 没有依赖（requirements.txt 里只有 Flask / waitress / cryptography / Pillow），
# 所以 PDF 与 .doc 都是手写的轻量解析 —— 结论见模块注释里「两档」那段：
# 这些解析器宁可说「数不出来」，也不猜一个看起来像页数的数字。

# PDF：页对象就是 `/Type /Page`（后面不能跟 s，那是页树节点 /Pages）。
# 写成 `\s*` 是为了同时吃下 `/Type/Page` 与 `/Type /Page` 两种排法。
_PDF_PAGE_OBJ = re.compile(rb'/Type\s*/Page(?![s])')
# 页树节点的页数汇总。只在数不出页对象时才用它（压缩过的页树里页对象看不到，
# 但顶层 /Count 有时还留在明文里）。取所有候选里最大的那个。
_PDF_COUNT = re.compile(rb'/Count\s+(\d{1,7})')
# 对象流（PDF 1.5+ 把对象压进 /Type /ObjStm 里）。页对象常常就住在里面。
_PDF_OBJSTM = re.compile(rb'/Type\s*/ObjStm')
_PDF_STREAM = re.compile(rb'stream\r?\n')


def _pdf_pages_in(blob):
    """在（可能是解压后的）字节里数页对象。"""
    return len(_PDF_PAGE_OBJ.findall(blob))


def _count_pdf(blob):
    """PDF 页数：先数页对象，再（数不出来时）试着解压对象流，最后看 /Count。

    三层都不成时返回 None —— 扫描件、加密的、页面全在压缩流里的都有可能走到这里，
    那种文件交回给管理员自己看页数，比报一个错数强。
    """
    pages = _pdf_pages_in(blob)
    if pages:
        return pages, 'PDF 页对象数'
    # 对象流：找到 /Type /ObjStm，再找它后面最近的 stream…endstream，解压出来数一遍。
    for match in _PDF_OBJSTM.finditer(blob):
        stream_at = _PDF_STREAM.search(blob, match.end(), match.end() + 2048)
        if stream_at is None:
            continue
        end = blob.find(b'endstream', stream_at.end())
        if end < 0:
            continue
        try:
            #    单个对象流不该很大；给个上限免得遇到畸形文件时解压出个几百兆的东西。
            if end - stream_at.end() > 4 * 1024 * 1024:
                continue
            pages += _pdf_pages_in(zlib.decompress(blob[stream_at.end():end]))
        except zlib.error:
            continue
    if pages:
        return pages, 'PDF 对象流里的页对象数'
    counts = [int(value) for value in _PDF_COUNT.findall(blob)]
    if counts:
        return max(counts), 'PDF 页树的 /Count'
    return None, 'PDF 里数不出页数'


_DOCX_PAGES = re.compile(rb'<Pages>(\d{1,6})</Pages>')
_DOCX_BREAK = re.compile(rb'<w:lastRenderedPageBreak')
_DOCX_PARA = re.compile(rb'<w:p[ >]')

# 一页按多少行算（拿段落数折算页数时用）。中文课程作业一页 40 行上下，
# 段落之间还有空行，所以按 35 行/页稍保守一点。
_PARAS_PER_PAGE = 35


def _count_docx(blob):
    """docx 页数：优先读 Word 自己写下的元数据，其次数分页符，最后按段落折算。

    `docProps/app.xml` 里的 <Pages> 是 Word/WPS 保存时算好的真实页数，最准；
    它只在文档被这两个软件保存过时才有。都没有时按段落折算 —— 那是**估**，
    所以说明里写的是「按段落估算」。
    """
    #    zipfile 要一个能 seek 的对象，直接喂 bytes 不行（它会当成路径去打开）。
    with zipfile.ZipFile(io.BytesIO(blob)) as zf:
        names = set(zf.namelist())
        if 'docProps/app.xml' in names:
            found = _DOCX_PAGES.search(zf.read('docProps/app.xml'))
            if found:
                pages = int(found.group(1))
                if pages > 0:
                    return pages, 'docx 文档属性里的页数'
        if 'word/document.xml' not in names:
            return None, 'docx 里没有正文'
        body = zf.read('word/document.xml')
    breaks = len(_DOCX_BREAK.findall(body))
    if breaks:
        return breaks + 1, 'docx 分页符数'
    paras = len(_DOCX_PARA.findall(body))
    if paras:
        return max(1, (paras + _PARAS_PER_PAGE - 1) // _PARAS_PER_PAGE), '按 docx 段落数估算'
    return None, 'docx 里没有可数的内容'


# ---- .doc（OLE2 复合文档）---------------------------------------------------
#
# 老 .doc 是复合文档：一个「小文件系统」，页数住在 SummaryInformation 流里
# （PIDSI_PAGECOUNT，编号 14）。标准库读不了它，所以下面这几段是手写的最小解析器：
# 只认 FAT（扇区链）、只找我们要的那条流。学生交的作业里 .doc 相当常见
# （Word 97-2003 另存），读不出页数这个格式的预估价就等于没有。
_OLE_MAGIC = b'\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1'
_OLE_ENDOFCHAIN = 0xFFFFFFFE
_OLE_FREESECT = 0xFFFFFFFF
_OLE_MINI_CUTOFF = 4096          # 小于这个大小的流住在 mini 流里
_PIDSI_PAGECOUNT = 14
_PIDSI_CHARCOUNT = 16


def _ole_fat(blob, sector_size):
    """读出 FAT（扇区分配表）：一个扇区号 -> 下一个扇区号。"""
    num_fat = struct.unpack_from('<I', blob, 44)[0]
    first_difat = struct.unpack_from('<I', blob, 68)[0]
    num_difat = struct.unpack_from('<I', blob, 72)[0]
    difat = list(struct.unpack_from('<109I', blob, 76))
    # DIFAT 链：头里放不下时，后面还有若干「装 FAT 扇区号」的扇区
    sector = first_difat
    for _ in range(num_difat):
        if sector in (_OLE_ENDOFCHAIN, _OLE_FREESECT):
            break
        start = (sector + 1) * sector_size
        entries = struct.unpack_from('<%dI' % (sector_size // 4 - 1), blob, start)
        difat.extend(entries)
        sector = struct.unpack_from('<I', blob, start + sector_size - 4)[0]
    fat = []
    for index in difat[:num_fat]:
        if index in (_OLE_ENDOFCHAIN, _OLE_FREESECT):
            continue
        start = (index + 1) * sector_size
        fat.extend(struct.unpack_from('<%dI' % (sector_size // 4), blob, start))
    return fat


def _ole_chain(fat, start, sector_size, blob, limit=None):
    """把一条扇区链拼成字节。链断了/太长就停在那儿（不抛异常）。"""
    out = bytearray()
    sector = start
    seen = set()
    while sector not in (_OLE_ENDOFCHAIN, _OLE_FREESECT) and sector not in seen:
        seen.add(sector)
        start = (sector + 1) * sector_size
        out += blob[start:start + sector_size]
        if limit is not None and len(out) >= limit:
            break
        if sector >= len(fat):
            break
        sector = fat[sector]
    return bytes(out[:limit] if limit is not None else out)


def _ole_directory(blob, fat, sector_size):
    """读出目录（每条 128 字节），返回 [{name, type, start, size}]。"""
    first_dir = struct.unpack_from('<I', blob, 48)[0]
    raw = _ole_chain(fat, first_dir, sector_size, blob)
    entries = []
    for offset in range(0, len(raw) - 127, 128):
        entry = raw[offset:offset + 128]
        name_len = struct.unpack_from('<H', entry, 64)[0]
        if name_len < 2 or name_len > 64:
            continue
        try:
            name = entry[:name_len - 2].decode('utf-16-le')
        except UnicodeDecodeError:
            continue
        entries.append({
            'name': name,
            'type': entry[66],
            'start': struct.unpack_from('<I', entry, 116)[0],
            'size': struct.unpack_from('<I', entry, 120)[0],
        })
    return entries


def _ole_stream(blob, wanted):
    """按名字取一条流（名字不区分大小写），取不到返回 None。

    小流（< 4096 字节）住在 mini 流里（SummaryInformation 基本都在那儿），
    大流直接在正常扇区链上。两条路都得走，只做一条就会出现
    「这份 .doc 读得出、那份读不出」这种没法解释的差别。
    """
    sector_size = 1 << struct.unpack_from('<H', blob, 30)[0]
    mini_size = 1 << struct.unpack_from('<H', blob, 32)[0]
    fat = _ole_fat(blob, sector_size)
    entries = _ole_directory(blob, fat, sector_size)
    root = next((e for e in entries if e['type'] == 5), None)
    target = next((e for e in entries
                   if e['type'] == 2 and e['name'].lower().endswith(wanted.lower())), None)
    if root is None or target is None:
        return None
    if target['size'] >= _OLE_MINI_CUTOFF:
        return _ole_chain(fat, target['start'], sector_size, blob, target['size'])
    # mini 流：先顺出整条 mini 流，再按 mini FAT 走链
    mini_fat = []
    first_mini = struct.unpack_from('<I', blob, 60)[0]
    raw = _ole_chain(fat, first_mini, sector_size, blob)
    mini_fat.extend(struct.unpack_from('<%dI' % (len(raw) // 4), raw, 0))
    stream = _ole_chain(fat, root['start'], sector_size, blob)
    out = bytearray()
    sector = target['start']
    seen = set()
    while sector not in (_OLE_ENDOFCHAIN, _OLE_FREESECT) and sector not in seen:
        seen.add(sector)
        start = sector * mini_size
        out += stream[start:start + mini_size]
        if len(out) >= target['size'] or sector >= len(mini_fat):
            break
        sector = mini_fat[sector]
    return bytes(out[:target['size']])


def _ole_properties(blob):
    """解析属性集（property set）：返回 {属性号: 值}。

    SummaryInformation 用的就是这个格式：头 28 字节，然后一条「偏移表」，
    记着每个属性在流里的位置。我们只要页数和字数两个整数属性。
    """
    if len(blob) < 48 or struct.unpack_from('<H', blob, 0)[0] != 0xFFFE:
        return {}
    count = struct.unpack_from('<I', blob, 24)[0]
    if not 1 <= count <= 64:
        return {}
    section = struct.unpack_from('<I', blob, 44)[0]
    if section + 8 > len(blob):
        return {}
    num_props = struct.unpack_from('<I', blob, section + 4)[0]
    if num_props > 256:
        return {}
    props = {}
    for index in range(num_props):
        at = section + 8 + index * 8
        if at + 8 > len(blob):
            break
        prop_id, offset = struct.unpack_from('<II', blob, at)
        value_at = section + offset
        if value_at + 8 > len(blob):
            continue
        variant_type = struct.unpack_from('<I', blob, value_at)[0]
        if variant_type == 3:                      # VT_I4
            props[prop_id] = struct.unpack_from('<i', blob, value_at + 4)[0]
    return props


def _count_doc(blob):
    """.doc 页数：读 SummaryInformation 里的页数，其次按字数折算。

    字数折算：一页中文 A4 正文约 1200-1500 字（小四、单倍行距），
    取 1400 当分母。这是**估算**，说明里写清楚。
    """
    props = _ole_properties(_ole_stream(blob, 'SummaryInformation') or b'')
    pages = props.get(_PIDSI_PAGECOUNT)
    if isinstance(pages, int) and pages > 0:
        return pages, '.doc 摘要信息里的页数'
    chars = props.get(_PIDSI_CHARCOUNT)
    if isinstance(chars, int) and chars > 0:
        return max(1, (chars + 1399) // 1400), '按 .doc 字数估算'
    return None, '.doc 里没有页数信息'


# ---- 对外入口 ---------------------------------------------------------------

# 后缀 -> 解析器。图片固定一页（一张图就是一张纸），所以单列一类。
_IMAGE_EXTS = ('jpg', 'jpeg', 'png')


def count_pages(path, filename=None):
    """数一份文件有几页，返回 (页数, 说明)。数不出来时页数为 None。

    **绝不抛异常**：任何解析问题都变成「这次没页数」。这个函数跑在下单接口里，
    为它抛一次异常就等于「学生传了一个奇怪的 PDF → 下单 500」。
    """
    name = filename or path
    ext = os.path.splitext(name)[1].lstrip('.').lower()
    if ext in _IMAGE_EXTS:
        return 1, '图片按 1 页'
    try:
        size = os.path.getsize(path)
    except OSError:
        return None, '文件读不到'
    if size <= 0:
        return None, '空文件'
    if size > EST_SCAN_MAX_BYTES:
        #    读一遍大文件会给上传接口平白加几百毫秒，而预估只是给学生一个参考。
        return None, '文件超过 %sMB，不做页数扫描' % (EST_SCAN_MAX_BYTES // (1024 * 1024))
    try:
        with open(path, 'rb') as fh:
            blob = fh.read()
    except OSError:
        return None, '文件读不到'
    try:
        if ext == 'pdf':
            return _count_pdf(blob)
        if ext == 'docx':
            return _count_docx(blob)
        if ext == 'doc':
            return _count_doc(blob)
        return None, '不认识的格式（%s）' % (ext or '无后缀')
    except Exception as exc:                       # noqa: BLE001 —— 见 docstring
        logger.warning('解析页数失败（%s，%s 字节）：%s', name, size, exc)
        return None, '解析失败'
