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

  ② **单价只有一份真相，就在 price_items 表里**（一张价目表，管理员在「价目表」页改）。
     一条 = 纸张 + 类型 + 单面价 + 双面价 + 备注，学生下单时直接选一条 ——
     不是"先选纸、再选颜色单双面、再用加价拼出来"。理由见 db.py 里 v20 那段：
     真实价目表里同一种纸配不同工艺是各自定价的，用基价 + 加价去逼近只能得到近似值。
     全局只剩两个系数（每单基础费、最低消费），住在 price_rules 表里。
     网页端、机器人、试算接口都走这里，不许各读各的。

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

# 全局系数：单价之外只剩下的两项（键名与 price_rules 的列一一对应）。
COEF_KEYS = ('base_fee', 'min_price')

# 一整套默认系数。默认**启用**：这是业主点名要的功能，装了却不显示等于没装。
# **这里没有任何单价** —— 单价全部来自价目表，管理员自己维护（业主的要求：
# 不写死任何数值）。基础费与最低消费默认 0 = 不影响价格。
DEFAULTS = {
    'enabled': True,
    'base_fee': 0.0,             # 每单基础费（元/单）
    'min_price': 0.0,            # 最低消费（元/单）
    'notes': '',                 # 价目表说明（给学生看的那几条「注」，管理员可改）
}

# 一条价目项允许出现的字段（接口层白名单）。改这里要连 save_item 一起看。
ITEM_FIELDS = ('paper', 'kind', 'color', 'price_single', 'price_double', 'note', 'sort_order')

# 价目项里三个文本字段的长度上限。它们会被画进下单页的下拉、订单台的单元格、
# 机器人卡片 —— 不封顶的话，一句 200 字的「类型名」会把三处版面同时撑坏。
PAPER_MAX = 40
KIND_MAX = 40
NOTE_MAX = 120

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
        if 'notes' in row.keys() and row['notes']:
            rules['notes'] = str(row['notes'])
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
    # 说明文字（给学生看的那几条「注」）：整段自由文本，只做长度与「不能有控制字符」的
    # 收口。它会被渲染到网页与机器人卡片上，夹一个换行/制表符进去就是一处版式崩坏。
    notes = fields.get('notes')
    if notes is None:
        notes = ''
    if not isinstance(notes, str):
        return None, '价目表说明要填文字'
    notes = notes.strip()[:NOTES_MAX]
    if notes and not all(ch.isprintable() or ch == '\n' for ch in notes):
        return None, '价目表说明里不能有制表符之类的控制字符'
    rules['notes'] = notes
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


# 价目表说明的长度上限（给管理员填「注」用）
NOTES_MAX = 2000

_COEF_LABELS = {
    'base_fee': '每单基础费',
    'min_price': '最低消费',
}


def describe(rules):
    """把全局系数翻成人话（管理页与机器人共用，避免两处话术分叉）。"""
    if not rules.get('enabled'):
        return ['自动估价：已关闭（订单不再显示预估价，只由管理员计费）']
    return [
        '公式：总价 = 基础费 + 页数 × 份数 × 该档单价，再取「最低消费」与它的较大值',
        '每单基础费 %s 元，最低消费 %s 元；单价在下面那张价目表里，逐条维护'
        % (_money(rules['base_fee']), _money(rules['min_price'])),
    ]


# ---- 价目项 -----------------------------------------------------------------

def normalize_duplex(value):
    """单双面只认 'double'，其余一律当单面。"""
    return 'double' if value == 'double' else 'single'


def format_item_label(item):
    """价目项的显示名：「A4 70g · 黑白」。下单页的下拉、订单台的快照都用它。

    纸张或类型缺失时退化成另一个（而不是拼出「 · 黑白」这种以分隔符开头的怪东西）。
    """
    if not item:
        return ''
    paper = str(item['paper'] or '').strip()
    kind = str(item['kind'] or '').strip()
    if paper and kind:
        return '%s · %s' % (paper, kind)
    return paper or kind


def supports_duplex(item):
    """这一项支不支持双面。**空的双面价 = 不支持**（相纸那一档就是这样）。

    它决定下单页要不要给「双面」这个选项、机器人要不要多问一句 ——
    而不是"让学生选了再被拒"，那种交互比没有这个选项更糟。
    """
    if not item:
        return False
    try:
        return item['price_double'] is not None
    except (KeyError, TypeError):
        return False


def item_unit_price(item, duplex):
    """这一项、这一种单双面下的**每页单价**（元）。

    不支持双面却传了 double：**按单面算**，并在调用方（estimate）里把 duplex
    改写成 single —— 服务端不因为一个客户端参数就把价格算成另一档，
    而订单落库的 duplex 也必须与计价的那一档一致（否则账单上写着"双面"、钱按单面收）。
    """
    if not item:
        return 0.0
    if normalize_duplex(duplex) == 'double' and supports_duplex(item):
        return max(0.0, float(item['price_double'] or 0.0))
    return max(0.0, float(item['price_single'] or 0.0))


def item_color(item):
    """这一项的颜色（'black' / 'color'）—— 落 orders.color_type 用。"""
    if not item:
        return 'black'
    try:
        value = item['color']
    except (KeyError, TypeError):
        return 'black'
    return value if value in ('black', 'color') else 'black'


def list_items(conn=None, only_active=False):
    """取价目表。默认给全部（管理页要能看见停用的），only_active 给学生端。

    排序是 `sort_order, id`：管理员用 sort_order 把常打的那几档顶到前面，
    而 id 只是"先来后到"的兜底 —— 只按 id 排的话，新建一条想往上提就只能删了重建。
    """
    sql = 'SELECT * FROM price_items'
    if only_active:
        sql += ' WHERE is_active = 1'
    sql += ' ORDER BY sort_order ASC, id ASC'
    try:
        if conn is None:
            with db_conn() as own:
                return [dict(row) for row in own.execute(sql).fetchall()]
        return [dict(row) for row in conn.execute(sql).fetchall()]
    except Exception:
        # 表还没建出来（老库第一次启动、迁移中途挂了）：当作"没有价目表"。
        # 下单接口那边会因此不带预估价，但**订单照下** —— 见模块注释第①条。
        logger.exception('读取价目表失败，本次按「没有价目项」处理')
        return []


def find_item(conn, item_id):
    """按 id 取一条价目项，没有就 None。"""
    try:
        return conn.execute('SELECT * FROM price_items WHERE id = ?', (item_id,)).fetchone()
    except Exception:
        logger.exception('读取价目项 #%s 失败', item_id)
        return None


def parse_price_item(fields, item_id=None):
    """校验一条价目项（新建与修改共用），返回 (字典, 错误信息)。

    这是**入口侧的收口**：界面上的输入框挡不住直接打接口的手，
    而价目表是算钱的东西 —— 一个负数单价或一个空纸张名会让整张表失去意义。
    """
    paper, error = _clean_text(fields.get('paper'), '纸张', PAPER_MAX)
    if error:
        return None, error
    kind, error = _clean_text(fields.get('kind'), '类型', KIND_MAX)
    if error:
        return None, error
    color = fields.get('color')
    if color not in ('black', 'color'):
        return None, '颜色只能是黑白或彩色'
    single, error = parse_coefficient(fields.get('price_single'), '单面价')
    if error:
        return None, error
    raw_double = fields.get('price_double')
    if raw_double in (None, ''):
        # 空 = **不支持双面**（相纸那一档）。这不是"没填"，是一个明确的产品状态，
        # 所以它存 NULL 而不是 0 —— 0 元双面会被当成"双面免费"。
        double = None
    else:
        double, error = parse_coefficient(raw_double, '双面价')
        if error:
            return None, error
    note = fields.get('note')
    if note is None:
        note = ''
    if not isinstance(note, str):
        return None, '备注要填文字'
    note = note.strip()[:NOTE_MAX]
    if note and not all(ch.isprintable() for ch in note):
        return None, '备注里不能有换行或制表符'
    order = fields.get('sort_order')
    if order in (None, ''):
        order = 0
    else:
        try:
            order = int(str(order).strip())
        except (TypeError, ValueError):
            return None, '排序要填整数'
    return {'paper': paper, 'kind': kind, 'color': color, 'price_single': single,
            'price_double': double, 'note': note or None, 'sort_order': order}, None


def _clean_text(value, label, max_length):
    """清洗一个人工填写的单行文本，返回 (文本, 错误信息)。

    与 routes/order_options._clean_text 同一套规矩（那边管预设与纸张的旧接口）：
    换行和制表符一律拒掉 —— 它们会被画进下拉、单元格和卡片，
    混进去一个就是把后面那块版面挤到看不见的地方，而且不报错。
    """
    text = (value or '').strip() if isinstance(value, str) else ''
    if not text:
        return None, '请填写%s' % label
    if len(text) > max_length:
        return None, '%s不能超过 %s 个字' % (label, max_length)
    if not all(ch.isprintable() for ch in text):
        return None, '%s里不能有换行或制表符' % label
    return text, None


# ---- 算价 -------------------------------------------------------------------

def _money(value):
    """金额显示成两位小数的字符串（'0.10' / '12.00'）。"""
    return '%.2f' % value


def estimate(rules, item, pages, copies, duplex):
    """算预估价，返回 (金额, 说明)。算不出来时金额为 None，说明里写原因。

    说明是给日志和接口调用方看的一句话，**不是**给学生看的文案 ——
    界面上的那句话由前端拼（「预估 ¥x.xx，以管理员核定为准」）。

    算不出来的四种情形，都是「如实说不知道」而不是「猜一个 0」：
      · 没选价目项（老订单/老客户端没带这一项）—— 单价无从谈起；
      · 规则没启用；
      · 页数读不出来（没有文件、格式不认识、文件太大没扫）；
      · 算出来是 0 或超出金额上限（前者说明这一项的单价填了 0，
        后者已经不是一笔正常的账）。
    """
    if not item:
        return None, '这一单没选价目项'
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
        + pages * copies * item_unit_price(item, duplex)
    total = max(total, float(rules.get('min_price', 0.0)))
    total = round(total, 2)
    if total <= 0:
        return None, '按这一项的单价算出来是 0 元（检查价目表里的单价）'
    #    超出计费上限的预估**不给**：那个数连管理员都填不进最终价（parse_price 会拒），
    #    摆一个填不进去的数字在屏幕上，只会让人以为系统坏了一只手。
    if total > PRICE_MAX_YUAN:
        return None, '按当前价目表算出来的价格超出金额上限'
    return total, ('%s 页 × %s 份，%s' % (pages, copies, note or '价目表'))


def estimate_for_order(conn, pages, copies, duplex, item):
    """下单路径用的入口：自己取全局系数，返回 (金额, 说明)。

    两个便利之处，都是为了「下单接口里只写一行」：
      · 系数在这里读，调用方不用先查库再拼；
      · **任何异常都吞掉并返回 None** —— 预估算不出来是小事，
        让它把一次正常的下单搞成 500 是大事（见模块注释第①条）。
    """
    try:
        return estimate(get_rules(conn), item, pages, copies, duplex)
    except Exception:
        logger.exception('估算价格时出错了，这一单不带预估价')
        return None, '估算时出错'


def _clamp_copies(value):
    """份数夹到合法区间。读不出来（None / 非数字）按**最少份**算。

    与 estimate() 里内联的那一段同一个口径；单独摘出来只是因为
    estimate_for_files 要逐份做一次，抄一遍就有两处会各自漂移。
    """
    try:
        copies = int(value)
    except (TypeError, ValueError):
        copies = COPIES_MIN
    return max(COPIES_MIN, min(COPIES_MAX, copies))


# 明细里「这一份为什么算不出价」的几种原因，与 estimate() 的文案保持一致 ——
# 两份说法不同的话，同一个毛病在单文件页和多文件页上会显示成两句话，
# 而 routes/estimate.py 的 _hint_for 是按关键词认的，多一句认不出来就变成
# 那句中性的「暂时算不出预估」。
_FILES_NO_ITEM = '这一份没选价目项'
_FILES_NO_PAGES = '读不出这份文件的页数'
_FILES_ZERO_PRICE = '按这一项的单价算出来是 0 元（检查价目表里的单价）'


def estimate_for_files(conn, items):
    """按份算整单预估价 —— **一份文件一套参数**时的唯一入口。

    输入 items = [{'pages': int|None, 'copies': int, 'duplex': 'single'|'double',
                   'item': 价目项 dict|None, 'note': str（可选）}, ...]，
    顺序即文件顺序（与学生看到的一致）。

    返回 (总价|None, 每份明细, 说明)：
      · 每份明细带 pages / copies / duplex / price_item_id / price_item_name /
        price / reason —— 前端的「逐份小计」直接用它，**不自己乘一遍**；
      · 说明是给日志与接口调用方看的一句话，不是给学生看的文案。

    三条纪律（与 estimate() / estimate_for_order 同源）：

      ① **合计 = base_fee（只加一次）+ Σ 每份小计**，再取 min_price 与其较大值。
         基础费是「每单」的钱，一单五份也只收一次；把它按份加进去，
         学生一次交五份作业就会莫名其妙多付四笔基础费。

      ② **任一份算不出来 → 整单总价就是 None**。这一点比「尽量给个数」重要：
         少了三份的合计会显示成一个**偏低**的数字，学生照着它备钱、
         到柜台发现不是这个数 —— 那比「暂时算不出」糟得多。
         所以每份的 price 各自为 None，合计也 None，让界面如实说算不出。

      ③ **绝不抛异常**（与 estimate_for_order 同一条）：它跑在下单接口里，
         为一份坏文件抛一次异常就等于「上传成功、下单 500」。

    页数夹断（EST_PAGES_MAX）与金额上限（PRICE_MAX_YUAN）沿用 estimate()：
    页数来自用户上传的文件，不夹就是一个可伪造的乘数；超上限的预估不给，
    因为那个数连管理员都填不进最终价。
    """
    try:
        rules = get_rules(conn)
    except Exception:
        #    get_rules 自己已经兜了一层异常，这里是第二道 —— 预估价这块的
        #    每一层都不许把异常漏进下单流程（见模块注释第①条）。
        logger.exception('读取计价规则失败，这一单不带预估价')
        return None, [], '读取计价规则失败'

    entries = items if isinstance(items, list) else []
    details = []
    enabled = bool(rules.get('enabled'))

    subtotal = 0.0
    pages_total = 0
    counted = 0
    blocked = ''            # 第一份算不出来的原因（决定整单为什么没价）
    clamped = False

    for index, raw in enumerate(entries, start=1):
        entry = raw if isinstance(raw, dict) else {}
        item = entry.get('item')
        copies = _clamp_copies(entry.get('copies'))
        duplex = normalize_duplex(entry.get('duplex'))
        #    这一档不支持双面却传了 double：按单面算并把 duplex 归正 ——
        #    与 resolve_price_item 同一个判据，落库的 duplex 必须与计价那一档一致，
        #    否则账单上写着「双面」、钱按单面收。
        #    **没选档（item 为 None）时不动它**：没有档位就没有「支不支持双面」
        #    可问，硬降成单面会让明细显示一个调用方没选的参数。
        if duplex == 'double' and item and not supports_duplex(item):
            duplex = 'single'

        detail = {
            'index': index,
            'pages': None,
            'copies': copies,
            'duplex': duplex,
            'price_item_id': (item['id'] if item else None),
            'price_item_name': format_item_label(item),
            'price': None,
            'reason': '',
        }

        pages = entry.get('pages')
        try:
            pages = int(pages) if pages is not None else None
        except (TypeError, ValueError):
            pages = None

        #    页数是**文件本身的事实**，与「选没选档位」「估不估得出价」无关。
        #    所以先把能数的页数记进明细，再走后面的分支：
        #    没选档时学生仍然要能看到「这一份 2 页、整单 3 页」——
        #    拿不到页数他会分不清「这单真的没页数」和「只是还没选档」，
        #    而前者该找管理员、后者该自己点一下。
        #    注意夹断（EST_PAGES_MAX）要在这里做，后面算钱用的必须是夹断后的值。
        if pages is not None and pages > 0:
            if pages > EST_PAGES_MAX:
                pages = EST_PAGES_MAX
                clamped = True
            detail['pages'] = pages

        #    调用方可以带一句更具体的 note（比如「这一档已经停用了」）：
        #    它比通用的「没选价目项」准确，而明细里那句话是给人看的。
        note = str(entry.get('note') or '')
        if not enabled:
            detail['reason'] = '自动估价未启用'
        elif not item:
            detail['reason'] = note or _FILES_NO_ITEM
        elif not pages or pages < 1:
            detail['reason'] = note or _FILES_NO_PAGES
        else:
            amount = round(pages * copies * item_unit_price(item, duplex), 2)
            if amount <= 0:
                detail['reason'] = _FILES_ZERO_PRICE
            else:
                detail['price'] = amount
                subtotal += amount
                pages_total += pages
                counted += 1
        if detail['price'] is None and not blocked:
            blocked = '第 %d 份：%s' % (index, detail['reason'])
        details.append(detail)

    if not details:
        return None, [], '没有要估的文件'
    if blocked:
        #    只要有一份说不出价，整单就如实说「算不出」（见上面第②条）。
        return None, details, blocked

    try:
        total = float(rules.get('base_fee', 0.0)) + subtotal
        total = max(total, float(rules.get('min_price', 0.0)))
        total = round(total, 2)
    except (TypeError, ValueError):
        logger.warning('计价规则里的系数不是数字，这次不给预估价')
        return None, details, '计价规则里的系数不合法'
    if total <= 0:
        return None, details, '按当前价目表算出来是 0 元（检查价目表里的单价）'
    #    与 estimate() 同一条边界：超出计费上限的预估不给 —— 那个数连管理员
    #    都填不进最终价（utils.parse_price 会拒），摆在屏幕上只会让人以为系统坏了。
    if total > PRICE_MAX_YUAN:
        return None, details, '按当前价目表算出来的价格超出金额上限'

    note = '%d 份文件，共 %d 页' % (counted, pages_total)
    if clamped:
        note += '；' + PAGES_CLAMP_NOTE
    return total, details, note



def estimate_for_preset(conn, pages, copies, duplex, item, preset_price):
    """预设打印服务的预估价，返回 (金额, 说明)。**预设价优先**。

    两条路：
      · `preset_price` 填了（元/份）→ 总价 = 预设价 × 份数。
        **不过 min_price、也不加 base_fee**：那是管理员对这条服务定的一口价，
        而「每单基础费」是给"按页数算"那条路准备的全局系数，把它加在一口价头上
        会得出一个连定价人自己都算不出来的数。
      · 没填 → 退回按页数公式算（用预设附带的文档数出页数 + 它绑的价目项），
        规矩与文件单完全一致，直接复用 estimate()。

    仍然受 `enabled` 约束：关掉自动估价 = **订单上不再出现任何预估价**，
    预设价也不例外 —— 关它的理由通常是「不想让学生看到系统给的数」，
    而一个管理员手填的数同样会引来"凭什么收这么多"的追问。
    """
    try:
        rules = get_rules(conn)
    except Exception:
        logger.exception('读取计价规则失败，这一单不带预估价')
        return None, '读取计价规则失败'
    if not rules.get('enabled'):
        return None, '自动估价未启用'
    if preset_price is None:
        return estimate(rules, item, pages, copies, duplex)
    try:
        count = int(copies)
    except (TypeError, ValueError):
        count = COPIES_MIN
    count = max(COPIES_MIN, min(COPIES_MAX, count))
    total = round(max(0.0, float(preset_price)) * count, 2)
    if total <= 0:
        return None, '这条服务的定价是 0 元（检查预设里的价格）'
    #    与 estimate() 同一条边界：超出计费上限的预估**不给** —— 那个数连管理员
    #    都填不进最终价（utils.parse_price 会拒），摆在屏幕上只会让人以为系统坏了。
    if total > PRICE_MAX_YUAN:
        return None, '按这条服务的定价算出来的价格超出金额上限'
    return total, '预设价 %s 元 × %s 份' % (_money(preset_price), count)


# ---- 页数 -------------------------------------------------------------------
#
# 下面每个解析器都只做一件事：**尽力**给出一个页数，给不出就 None。
# 没有依赖（requirements.txt 里只有 Flask / waitress / cryptography / Pillow），
# 所以 PDF 与 .doc 都是手写的轻量解析 —— 结论见模块注释里「两档」那段：
# 这些解析器宁可说「数不出来」，也不猜一个看起来像页数的数字。

# PDF：页对象就是 `/Type /Page`（后面不能跟 s，那是页树节点 /Pages）。
# 写成 `\s*` 是为了同时吃下 `/Type/Page` 与 `/Type /Page` 两种排法。
_PDF_PAGE_OBJ = re.compile(rb'/Type\s*/Page(?![s])')
# 页树节点的页数汇总。它只当「下界校正」用：只有它比「明文页对象 + 对象流里的页对象」
# 还大时才采信它。**不能**直接返回它 —— 增量更新的 PDF、或者由多棵子树拼起来的文档里，
# /Count 只统计了其中一棵子树，单看它会少数；反过来某些修复过的文件里它又会残留一个大数，
# 所以下面还把它夹进 _PDF_COUNT_MAX。
_PDF_COUNT = re.compile(rb'/Count\s+(\d{1,7})')
# /Count 的合理区间。上限定 10000 是防「畸形或恶意文件里写个 9999999」：
# 页数读出来就直接进公式，而 EST_PAGES_MAX 那道夹断是给**预估价**兜底的，
# 不该让解析器自己连「这是不是一个可能的页数」都不问。
_PDF_COUNT_MAX = 10000
# 对象流（PDF 1.5+ 把对象压进 /Type /ObjStm 里）。页对象常常就住在里面。
_PDF_OBJSTM = re.compile(rb'/Type\s*/ObjStm')
_PDF_STREAM = re.compile(rb'stream\r?\n')
# 单个对象流的两道体积上限：
#   · 压缩数据本身不超过 4MB（畸形文件里 endstream 可能在很远处，读进来白占内存）；
#   · 解压后的输出不超过 16MB —— 4MB 的 deflate 可以膨胀到几百 MB（解压炸弹），
#     而真实的 /ObjStm 一般就几十 KB。用 decompressobj 的 max_length 硬顶，
#     超出的部分直接丢掉：数页数不需要完整的对象流。
_PDF_OBJSTM_RAW_MAX = 4 * 1024 * 1024
_PDF_OBJSTM_OUT_MAX = 16 * 1024 * 1024


def _pdf_pages_in(blob):
    """在（可能是解压后的）字节里数页对象。"""
    return len(_PDF_PAGE_OBJ.findall(blob))


def _count_pdf(blob):
    """PDF 页数：明文页对象 + 对象流里的页对象**相加**，再用 /Count 校正下界。

    为什么必须相加（这是修掉的一个真 bug）：混合型 PDF 很常见 —— 前几页是未压缩
    的对象，其余页被 PDF 1.5 压进 `/ObjStm` 对象流。旧写法「明文里数到 ≥1 就直接
    `return pages`」会让这种文件只数出 1~2 页，预估价明显偏低：学生看到的是假低价，
    而管理员照最终价收钱，差额全落在「预估和实际差多少」这种解释不清的地方。

    为什么也不能直接返回 /Count：它只是页树节点的汇总，上面那段注释讲了两种会错的情形。
    所以最终取的是「相加值」与「/Count 最大值」中的**大者** —— 两边都可能少数，
    但都少数到同一处的情形很少；真数不出来时仍回 None，交回给管理员自己看。

    三层都不成时返回 None —— 扫描件、加密的、页面全在压缩流里的都有可能走到这里，
    那种文件交回给管理员自己看页数，比报一个错数强。
    """
    plain = _pdf_pages_in(blob)
    packed = 0
    # 对象流：找到 /Type /ObjStm，再找它后面最近的 stream…endstream，解压出来数一遍。
    # 这里**不跳过**「明文已经数到页」的情形 —— 跳过正是上面那个 bug。
    for match in _PDF_OBJSTM.finditer(blob):
        stream_at = _PDF_STREAM.search(blob, match.end(), match.end() + 2048)
        if stream_at is None:
            continue
        end = blob.find(b'endstream', stream_at.end())
        if end < 0:
            continue
        start = stream_at.end()
        if end - start > _PDF_OBJSTM_RAW_MAX:
            continue
        try:
            #    max_length 顶住解压炸弹：解出来的东西超过上限就只要前一段。
            unpacker = zlib.decompressobj()
            raw = unpacker.decompress(blob[start:end], _PDF_OBJSTM_OUT_MAX)
        except zlib.error:
            #    坏流（不是 zlib、或者被截断）就当这一条不存在，继续看下一条 ——
            #    抛出去就等于「一个坏对象流让整份文件的页数都没了」。
            continue
        packed += _pdf_pages_in(raw)
    total = plain + packed
    # /Count 的候选：只要合理区间内的（越界的当一个坏数丢掉，不参与取大）。
    declared = 0
    for value in _PDF_COUNT.findall(blob):
        try:
            number = int(value)
        except ValueError:                          # 正则限定了 \d，理论上到不了这里
            continue
        if 1 <= number <= _PDF_COUNT_MAX and number > declared:
            declared = number
    if declared > total:
        return declared, 'PDF：按页树汇总的页数（/Count），共 %s 页' % declared
    if not total:
        return None, 'PDF：数不出页数'
    if packed and plain:
        return total, 'PDF：明文页对象 + 压缩流里的页对象，共 %s 页' % total
    if packed:
        return total, 'PDF：页面在压缩流里，解压后统计到 %s 页' % total
    return total, 'PDF：按页面对象统计，共 %s 页' % total


_DOCX_PAGES = re.compile(rb'<Pages>(\d{1,6})</Pages>')
_DOCX_BREAK = re.compile(rb'<w:lastRenderedPageBreak')
# 手工分页符：<w:br w:type="page"/>（Ctrl+Enter 敲下去的那个）。
# 必须单独数：WPS 存出来的 docx 往往**只**写这个、不写 lastRenderedPageBreak，
# 而学生交的作业一大半是 WPS 存的 —— 这正是「WPS 文档页数不准」的来源。
# [^>]* 把属性顺序不同的写法（w:type 在后面、中间夹别的属性）一并吃掉。
_DOCX_PAGE_BREAK = re.compile(rb'<w:br\b[^>]{0,200}?w:type\s*=\s*"page"')
# 节属性 <w:sectPr>。多节文档（分节符、横向页、双栏）通常一节一页起，
# 所以它只能当**下界**：一节可能有好几页，绝不可能少于节数。
_DOCX_SECT = re.compile(rb'<w:sectPr[\s/>]')
_DOCX_PARA = re.compile(rb'<w:p[ >]')
# 正文可见文本：<w:t ...>文字</w:t>（xml:space="preserve" 这类属性要先吃掉）。
_DOCX_TEXT = re.compile(rb'<w:t\b[^>]*>(.*?)</w:t>', re.S)
# w:t 里理论上没有子标签（'<' 会被 XML 转义），但转换工具生成的畸形文件里会出现，
# 去一遍标签再数字，成本几乎为零。
_DOCX_TAG = re.compile(rb'<[^>]{0,400}>')
# 字数折算用：一页 A4 正文（小四、单倍行距）中文约 1200 字，同样的版面换成英文约 500 词。
# 中英混排时两种都要计入，见 _docx_pages_by_text。
_CHARS_PER_PAGE_CJK = 1200
_WORDS_PER_PAGE_LATIN = 500
_CJK_CHAR = re.compile(r'[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]')
_LATIN_WORD = re.compile(r"[A-Za-z0-9][A-Za-z0-9'\-]*")
# 一页按多少行算（段落数折算页数时用）。中文课程作业一页 40 行上下，
# 段落之间还有空行，所以按 35 行/页稍保守一点。这一档只在正文里取不到文字时用。
_PARAS_PER_PAGE = 35
# 单个 zip 成员的解压后体积上限。zipfile.read() 会把整个成员解压进内存，
# 而 20MB 的 docx 里 document.xml 声明成几百 MB 就是一颗解压炸弹 ——
# 先看 header 里那个 file_size，超标就不解压。app.xml 正常只有几 KB，给 1MB 足够。
_DOCX_MAX_PART_BYTES = 64 * 1024 * 1024
_DOCX_MAX_META_BYTES = 1024 * 1024


def _docx_text_units(body):
    """正文里「可见文本」的量：返回 (中文字符数, 英文词数)。

    汉字按**字**算、拉丁按**词**算，因为一页的容量本来就是两种单位：
    1200 字 / 500 词。混排文档各占一部分版面，所以两种都要数出来。
    只数 <w:t> 里的东西 —— 页眉页脚、批注、样式表都不在 document.xml 的 w:t 里，
    或者虽是 w:t 但属于已经删掉的内容（<w:del>），那种量很小，不值得为它做结构解析。
    """
    raw = b''.join(_DOCX_TEXT.findall(body))
    if not raw:
        return 0, 0
    text = _DOCX_TAG.sub(b'', raw).decode('utf-8', 'ignore')
    return len(_CJK_CHAR.findall(text)), len(_LATIN_WORD.findall(text))


def _docx_pages_by_text(cjk, words):
    """按字数折算页数：ceil(cjk/1200 + words/500)，至少 1 页。

    用整数算而不是浮点：`-(-a // b)` 就是向上取整，没有 0.30000000000000004
    这类残渣影响页数（页数差一，预估价就差几毛钱，管理员解释不清）。
    """
    weighted = cjk * _WORDS_PER_PAGE_LATIN + words * _CHARS_PER_PAGE_CJK
    per_page = _CHARS_PER_PAGE_CJK * _WORDS_PER_PAGE_LATIN
    return max(1, -(-weighted // per_page))


def _count_docx(blob):
    """docx 页数：文档属性 > 分页符/节数 > 字数折算 > 段落兜底。

    优先级为什么这样排：
      · `docProps/app.xml` 里的 <Pages> 是 Word/WPS 保存时算好的**真实页数**，最准；
        缺点是 WPS 常常不写、转换工具生成的也可能缺这一项；
      · 分页符（渲染分页 + 手工分页）是文档自己记下的换页事实，没有元数据时最可信；
        多节文档一节一页起，只能当下界；
      · 字数折算比段落数靠谱得多：中文段落短、段间还有空行，按「段落数 ÷ 35」
        折算会系统性低估（4000 字、80 段的作业会被算成 3 页，实际 4 页）；
      · 段落兜底只在正文里取不到文字时用。

    两种「不知道」都返回 None：正文太大没解压、以及一份 zip 里根本没有正文。
    """
    #    zipfile 要一个能 seek 的对象，直接喂 bytes 不行（它会当成路径去打开）。
    with zipfile.ZipFile(io.BytesIO(blob)) as zf:
        names = set(zf.namelist())
        if 'docProps/app.xml' in names:
            if zf.getinfo('docProps/app.xml').file_size <= _DOCX_MAX_META_BYTES:
                found = _DOCX_PAGES.search(zf.read('docProps/app.xml'))
                if found:
                    pages = int(found.group(1))
                    if pages > 0:
                        return pages, 'Word：文档属性里的页数（最准），共 %s 页' % pages
        if 'word/document.xml' not in names:
            return None, 'Word：文档里没有正文'
        if zf.getinfo('word/document.xml').file_size > _DOCX_MAX_PART_BYTES:
            #    这里连读都不读：解压炸弹的代价不是「算错页数」，是进程被打爆。
            return None, 'Word：正文太大，没有做页数统计'
        body = zf.read('word/document.xml')
    breaks = len(_DOCX_BREAK.findall(body)) + len(_DOCX_PAGE_BREAK.findall(body))
    if breaks:
        #    分页符数的是「换页动作」，页数 = 换页次数 + 1（第一页也是页）。
        return breaks + 1, 'Word：按分页符统计，共 %s 页' % (breaks + 1)
    sections = len(_DOCX_SECT.findall(body))
    if sections > 1:
        #    只说「至少」：一节到底打几页，只有真正排版才知道。
        return sections, 'Word：按节数估算（至少 %s 页）' % sections
    cjk, words = _docx_text_units(body)
    if cjk or words:
        pages = _docx_pages_by_text(cjk, words)
        return pages, 'Word：按字数估算（可能不准），共 %s 页' % pages
    paras = len(_DOCX_PARA.findall(body))
    if paras:
        pages = max(1, (paras + _PARAS_PER_PAGE - 1) // _PARAS_PER_PAGE)
        return pages, 'Word：按段落数估算（可能不准），共 %s 页' % pages
    return None, 'Word：文档里没有可数的内容'


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
# 正文流里的换页符（Ctrl+Enter，8 位存储下就是单字节 0x0c；UTF-16LE 存储下是
# 「0x0c 0x00」，低字节照样落在流里，所以单字节计数两种存法都数得到）。
_DOC_PAGE_BREAK = b'\x0c'
# 只读正文流的前 8MB：页数不可能靠更长的正文改变量级，而 _ole_stream 会把
# 整条扇区链拼出来（文件上限 20MB，多读一遍就多一次几百毫秒的拷贝）。
_DOC_WORD_STREAM_MAX = 8 * 1024 * 1024
# 「这条流里确实装着正文」的判据用到的字节集合：正常正文（8 位代码页或 UTF-16LE）
# 里出现的字节几乎都在这里，剩下的控制字符就是二进制垃圾。
_DOC_GOOD_BYTES = bytes(range(0x20, 0x100)) + b'\x00\x09\x0a\x0c\x0d'
# 换页符那一档的上限护栏：一页 A4 正文最少也有几十个字符，所以「页数 × 50」
# 不该超过正文字数。这个数是**实测逼出来的** —— 仓库里那份 5 页的 .doc 在
# WordDocument 流里能数出 59 个 0x0c（压缩的图形/表格数据里也有这个字节），
# 60 页 vs 实际 5 页，预估价会直接抬到学生的 12 倍。多一道护栏，宁可说数不出来。
_DOC_MIN_CHARS_PER_PAGE = 50


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


def _doc_looks_textual(raw):
    """正文流里有没有成片的人类文本（决定采不采信换页符计数）。

    这只是个**密度**判据，不解析 piece table：要回答的问题只有「这条流像不像正文」，
    而不是「第几个字符对应文档里的哪一页」。正常正文（8 位代码页、UTF-16LE 两种存法）
    的字节几乎都落在 _DOC_GOOD_BYTES 里，剩下的控制字符占比很低；
    而一条填充了随机字节/全 0x01 的垃圾流会立刻超标。

    写这么糙是有代价的：判真之后我们只说「按换页符估算（近似）」，不假装这是准确页数。
    """
    if not raw:
        return False
    # translate(None, delete) 是「把 delete 里的字节删掉、剩下的照原样留下」，
    # 所以结果长度就是「不在正常文本字节集里的那些字节」的数量。
    junk = len(raw.translate(None, _DOC_GOOD_BYTES))
    return junk * 5 <= len(raw)


def _doc_ccp_text(raw):
    """从 FIB 里读正文字符数（ccpText，fibRgLw97 第一段，偏移 0x4C）。

    这是 Word 自己写下的字段（它决定正文在流里有多长），摘要信息缺失时它就是
    「这份文档大概有多少字」最可靠的来源 —— 也正因为它可靠，才拿它给换页符计数做护栏。
    流太短、或者开头不是 Word 的标识（wIdent = 0xA5EC）就返回 0：读不出来不是异常。
    """
    if len(raw) < 0x50:
        return 0
    if struct.unpack_from('<H', raw, 0)[0] != 0xA5EC:
        return 0
    value = struct.unpack_from('<i', raw, 0x4C)[0]
    return value if 0 < value <= 100 * 1000 * 1000 else 0


def _count_doc(blob):
    """.doc 页数：摘要信息的页数 > 摘要信息的字数折算 > 正文里的换页符（近似）。

    前两档读的是 SummaryInformation（Word 保存时自己写的），最可信。
    第三档是兜底：有些 .doc（另存/转换工具生成、被别的软件改过的）没有摘要信息，
    但 WordDocument 流里还留着正文 —— 数换页符就能给一个页数量级。

    为什么第三档放在最后、还要加护栏：换页符是**近似**。它不解析 piece table，
    不知道每段用了多大字号/行距、哪些页是图表撑出来的；更要紧的是 0x0c 在流里
    不只有换页符一个角色 —— 压缩的图形/表格数据里也会出现，实测能让 5 页的文件
    数出 60 页。所以这里用 FIB 的 ccpText（正文字符数）给结果封顶：
    超了就认为这一档被噪声骗了，宁可回 None 让管理员自己看，也不报一个几倍高估的数。

    字数折算的分母 1400：一页中文 A4 正文约 1200-1500 字（小四、单倍行距），取中值。
    """
    props = _ole_properties(_ole_stream(blob, 'SummaryInformation') or b'')
    pages = props.get(_PIDSI_PAGECOUNT)
    if isinstance(pages, int) and pages > 0:
        return pages, 'Word：文档属性里的页数（最准），共 %s 页' % pages
    chars = props.get(_PIDSI_CHARCOUNT)
    if isinstance(chars, int) and chars > 0:
        pages = max(1, (chars + 1399) // 1400)
        return pages, 'Word：按字数估算（可能不准），共 %s 页' % pages
    # 摘要信息缺失时的兜底：正文流里数换页符。
    raw = (_ole_stream(blob, 'WordDocument') or b'')[:_DOC_WORD_STREAM_MAX]
    page_breaks = raw.count(_DOC_PAGE_BREAK)
    if page_breaks and _doc_looks_textual(raw):
        pages = page_breaks + 1
        ccp = _doc_ccp_text(raw)
        #    护栏的说明见 _DOC_MIN_CHARS_PER_PAGE 上面那段：它不是「更准的算法」，
        #    只是一道「这个数看起来不可能」的检查。ccp 读不出来时只能信换页符。
        if not ccp or pages * _DOC_MIN_CHARS_PER_PAGE <= ccp:
            return pages, 'Word：按换页符数估算（近似），共 %s 页' % pages
        logger.warning('.doc 的换页符数与正文字数不符（%s 个换页符 / %s 字），这次不给页数',
                       page_breaks, ccp)
    return None, 'Word：文档里没有页数信息'


# ---- 对外入口 ---------------------------------------------------------------

# 后缀 -> 单页。图片**不解析内容**：一张图默认一页，所以这里只是「认不认得这个后缀」。
# 多页 TIFF（传真件、扫描仪一次扫多页）属于少数，而且真要数它就得解析 IFD，
# 成本远高于收益 —— 一张图先按 1 页算，页数由管理员在计费弹窗里确认
# （那边本来就要打开文件看一遍）。
# 注意：这份名单**不是上传白名单**（那是 config.ALLOWED_EXTENSIONS，管的是能不能传）。
# 名单里多认几种后缀，是为了「历史文件、别的入口传进来的文件、以及以后放开白名单时」
# 不会因为这里不认就丢掉预估价。
_IMAGE_EXTS = ('jpg', 'jpeg', 'png', 'webp', 'bmp', 'gif', 'tif', 'tiff')


def count_pages(path, filename=None):
    """数一份文件有几页，返回 (页数, 说明)。数不出来时页数为 None。

    **绝不抛异常**：任何解析问题都变成「这次没页数」。这个函数跑在下单接口里，
    为它抛一次异常就等于「学生传了一个奇怪的 PDF → 下单 500」。
    """
    name = filename or path
    ext = os.path.splitext(name)[1].lstrip('.').lower()
    if ext in _IMAGE_EXTS:
        return 1, '图片：按 1 页'
    try:
        size = os.path.getsize(path)
    except OSError:
        return None, '文件读不到，没有页数'
    if size <= 0:
        return None, '空文件，没有页数'
    if size > EST_SCAN_MAX_BYTES:
        #    读一遍大文件会给上传接口平白加几百毫秒，而预估只是给学生一个参考。
        return None, '文件超过 %sMB，没有做页数统计' % (EST_SCAN_MAX_BYTES // (1024 * 1024))
    try:
        with open(path, 'rb') as fh:
            blob = fh.read()
    except OSError:
        return None, '文件读不到，没有页数'
    try:
        if ext == 'pdf':
            return _count_pdf(blob)
        if ext == 'docx':
            return _count_docx(blob)
        if ext == 'doc':
            return _count_doc(blob)
        return None, '不认识的格式（%s），没有页数' % (ext or '无后缀')
    except Exception as exc:                       # noqa: BLE001 —— 见 docstring
        logger.warning('解析页数失败（%s，%s 字节）：%s', name, size, exc)
        return None, '解析页数时出错，这一单没有页数'
