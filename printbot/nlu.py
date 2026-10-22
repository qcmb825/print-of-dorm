# -*- coding: utf-8 -*-
"""把学生的一句话翻译成打印参数 —— **纯规则，只用标准库**。

为什么住在 printbot 里而不是服务端：这句话是 QQ 私聊里的一句中文，
只有机器人这一侧看得到（服务器收到的是「哪一档、几份、单双面」这样的成品参数）。
而 printbot 是自包含包（不 import 项目模块、要整个目录拷到国内那台机器上），
所以这里不许出现任何项目内依赖。

## 它要认的句式（都是实测里最自然的说法）

    「黑白 2份」                 → 全局：颜色 + 份数
    「A4 80g 双面」              → 全局：纸张 + 单双面
    「都彩色」「全部黑白」        → 全局（「都/全部」只是语气词，判据是这句话带要求）
    「第 1 份彩色」「1黑白 2彩色」 → 按序号，只作用于那一份
    「报告.pdf 彩色」            → 按文件名（文件名由调用方先摘掉，见 bot.py）
    「备注 靠窗那台」            → 备注（与其它要求互斥，整句就是备注）
    「好」「下单」               → 提交（用默认参数补齐没说的地方）

## 三条不许破的纪律

① **只认说出来的**。没说的一律留 None，由 resolve_spec 拿默认值去补，
   并在回执里**写明补了什么** —— 「黑白 2份」不该悄悄变成「彩色 3 份」。
   拿不准的时候宁可返回「没听懂」，让机器人问一句，也不要猜。
② **解析绝不抛异常**。一条消息解析失败只是「这句话没听懂」，
   后面还有大模型兜底和「请再说一次」两条路；抛出去就是机器人装死。
③ **颜色/纸张只当筛选条件**，真正的档位永远取自服务端返回的价目表
   （`/api/bot/print-options` 的 price_items）—— 学生说「A3」而管理员没配 A3 时，
   答案是「没有这一档」，不是替他挑一档 A4。

## 与「打印方式菜单」的关系

老流程是一串单选题（打印方式 → 份数 → 纸张），学生要回好几次数字。
现在参数直接从这句话里抽，抽不全才问一次 —— 问的时候会把默认档写在最前面。
"""

import re

# printbot 包内的兄弟模块（自包含包，不 import 项目模块）—— 份数上限住在
# config.COPY_MAX，nlu 与 llm 都要用它判「学生说的份数越界了没有」。
from . import config

# ---- 词表 -------------------------------------------------------------------

# 颜色。顺序有意义：先长词后短词（「黑白」要在「黑」之前判，否则「黑」先命中，
# 而「黑白」里的「黑」也会被算一次 —— 结果一样，但「黑白色」这种半边词的判断要稳）。
_COLOR_WORDS = (
    ('black', ('黑白', '黑色', '单黑', '单色', '灰度', '黑')),
    ('color', ('彩色', '彩印', '彩打', '全彩', '彩', 'color', 'colour')),
)

# 单双面。**「单面」要在「面」之前**，而单独的「面」不是词（「打印面朝上」不该算）。
_DUPLEX_WORDS = (
    ('double', ('双面', '两面', '正反面', '双页', 'double', 'duplex')),
    ('single', ('单面', '单页', '一面', 'single')),
)

# 提交：整句等于其中之一才算（不做子串匹配 —— 「好的文件我明天发」不是在下单）。
_SUBMIT_WORDS = (
    '好', '好的', '好嘞', '行', '行吧', '可以', '可以的', '就这样', '就这样吧',
    '确认', '确定', '下单', '提交', '开始', '打吧', '印吧', 'ok', 'okay', '👌', '👍',
)

# 取消：同样只认整句。**它不是「提交」的反面**，而是丢弃这一批。
_CANCEL_WORDS = ('取消', '算了', '不要了', '作废', '不打了', '不印了')

# 中文数字（份数）。只到「五十」—— 服务端的份数上限就是 50，再大也没有意义。
_CN_DIGITS = {'一': 1, '两': 2, '二': 2, '三': 3, '四': 4, '五': 5,
              '六': 6, '七': 7, '八': 8, '九': 9}

# 「第 2 份」这种序号引用：**第 N 份 = 第 N 份文件**（不是「打 N 份」）。
# 批量场景下学生说的「第 2 份」几乎总是那个意思，而「2 份」才是份数。
#
# 三处否定条件都是踩出来的（各挡住一类误判）：
#   · `(?<![A-Za-z\d第])` —— 「A3」「A4 80g」里的数字不是序号（前面是字母）；
#     漏了它，「A3 黑白」会变成「第 3 份黑白」，学生说的是纸、我们听成了文件号。
#   · `(?<![A-Za-z]\s)`   —— **「A 4」也不是序号**（字母与数字之间隔了个空格）：
#     手机上打「A 4 80g」很常见，而前一条后视只看紧邻的那个字符（是空格，放过去了），
#     于是整句被当成「第 4 份」。两条后视各自定长，Python 允许叠加。
#   · `(?![\dA-Za-z])`    —— 「80g」里的 80 不是序号（后面是单位字母）。
#   · `(?!\s*[份张本页克])` —— 「2 份」是份数不是序号（「第 2 份」已经由左分支管）。
#
# 「第 N 份」的 N 既收阿拉伯数字也收**中文数字**（「第二份彩色」实测被当成
# 整批彩色 —— 学生说的是第 2 个文件，我们却改了全批，打错纸就是他掏钱）。
# 「最后一份」返回 **-1**：这一批到底有几份只有 bot 那边知道（nlu 看不到
# _pending），所以 nlu 只给出「最后一个」这个语义标记，由 bot 解释成 len(files)。
_REF_PATTERN = re.compile(
    r'(?:第\s*(?P<cn>\d{1,2}|[一二两三四五六七八九十]{1,3})\s*(?:份|个|张|号)?\s*(?:文件|材料|东西)?'
    r'(?!\s*(?:章|节|页|课|题|条|行|列|次|遍))'
    r'|(?P<last>最后\s*(?:一\s*)?份|末\s*份)'
    r'|(?<![A-Za-z\d第])(?<![A-Za-z]\s)(?P<n>\d{1,2})(?![\dA-Za-z])(?!\s*[份张本页克]))'
)

# 序号「最后一份」的语义标记（负数不会与 1 起的真实序号撞上）。
REF_LAST = -1


# 「第 2 份文件」里的「份」与前一个「2 份」的「份」是同一个字，靠上面那个
# 否定前瞻区分：数字后面紧跟（可带空格）「份/张/本/页」时是**份数**，不是序号。

# 份数：把所有能认出「打几份」的写法收在一处。三个分支的先后不重要，
# 因为它们要求的前缀互不相同；但**「第 N 份」已经被上面的序号吃掉**，
# 所以这里的 份 分支不会再看到「第」。
_COPIES_PATTERNS = (
    re.compile(r'(?:每份|各)\s*[:：]?\s*(?P<num>\d{1,2}|[一二两三四五六七八九十]{1,3})\s*(?:份|张|本)?'),
    re.compile(r'份数\s*[:：]?\s*(?P<num>\d{1,2}|[一二两三四五六七八九十]{1,3})'),
    re.compile(r'(?<![第\d])(?P<num>\d{1,2}|[一二两三四五六七八九十]{1,3})\s*(?:份|张|本)'),
    re.compile(r'[x×*]\s*(?P<num>\d{1,2})'),
)

# 「都/全部/所有」这类词只是把一句话的适用范围说满，不改变参数本身
# （调用方本来就是按「全局要求」处理的），列在这里是为了让 is_global 更准。
_ALL_WORDS = ('都', '全部', '全都', '所有', '每份', '各个', '每个')

_CN_NUM_RE = re.compile(r'^[一二两三四五六七八九十]{1,3}$')


def cn_number(text):
    """把「二 / 两 / 十二 / 二十五」这样的中文数字读成整数；读不出返回 None。

    只处理到「五十」（份数上限就在那个量级），不写完整的汉语数字文法 ——
    「一百二十三份」这种说法在打印场景里不会出现，而多写的那几百行
    每行都是一个新 bug。
    """
    text = (text or '').strip()
    if not text:
        return None
    if text.isdigit():
        return int(text)
    if not _CN_NUM_RE.match(text):
        return None
    if text == '十':
        return 10
    if '十' in text:
        left, _sep, right = text.partition('十')
        tens = _CN_DIGITS.get(left, 1) if left else 1
        ones = _CN_DIGITS.get(right, 0) if right else 0
        return tens * 10 + ones
    total = 0
    for char in text:
        # 「两三份」这种并列取最小值：学生自己也没定，取小的那个（宁可少打）
        value = _CN_DIGITS.get(char)
        if value is None:
            return None
        total = value if total == 0 else min(total, value)
    return total


def empty_spec():
    """一份「什么都没说」的要求。四个字段全 None，由 resolve_spec 补默认值。"""
    return {'color': None, 'duplex': None, 'copies': None, 'paper': None}


def spec_is_empty(spec):
    return not any((spec or {}).get(key) for key in ('color', 'duplex', 'copies', 'paper'))


#    否定的说法**不能当成正面的要求**。「别打黑白的」「不要彩色」里那个颜色词是
#    被否掉的，读成「要黑白」就是实打实的误判（打错一份纸），而这类句子
#    在口语里一点都不罕见。
#    判据：否定词出现在这个词**之前**（「除了第一份，都要黑白」），或者紧跟在
#    它**后面**（「黑白不要」）。
#    丢掉的代价只是「这句没懂，多问一句」；读反的代价是打错纸 —— 两者不对称，
#    所以宁可丢。
_NEGATION_WORDS = ('不要', '别打', '别印', '别用', '不想', '不用', '不能', '除了',
                   '去掉', '不是', '不用打', '不打')

# 分句的边界。**否定词的作用范围只到同一个分句为止** —— 整句一起判的话，
# 「别打彩色的，打黑白的」里后半句那个**肯定**的黑白也会被前半句的否定吃掉，
# 整句解析为空（实测：学生说清了要什么，我们回「没看懂」）。
# 口语里的分句就是逗号/顿号/分号/句号/换行这几样，逐个切开逐句解析，
# 再把「说出来的」按顺序并回去（后面的肯定自然覆盖前面的空）。


def _negated(text, word):
    """`word` 在句子里是不是被否定的（见上面那段说明）。"""
    lowered = text.lower()
    index = lowered.find(word)
    if index < 0:
        return False
    if index > 0 and any(neg in lowered[:index] for neg in _NEGATION_WORDS):
        return True
    tail = lowered[index + len(word):index + len(word) + 4]
    return any(neg in tail for neg in _NEGATION_WORDS)


def _find_color(text):
    lowered = text.lower()
    for value, words in _COLOR_WORDS:
        for word in words:
            if word in lowered and not _negated(lowered, word):
                return value
    return None


def _find_duplex(text):
    lowered = text.lower()
    for value, words in _DUPLEX_WORDS:
        for word in words:
            if word in lowered and not _negated(lowered, word):
                return value
    return None


def _find_copies(text):
    for pattern in _COPIES_PATTERNS:
        match = pattern.search(text)
        if not match:
            continue
        value = cn_number(match.group('num'))
        if value:
            return value
    return None


def paper_terms(item):
    """一档价目项可以被叫出来的名字（用于在句子里找它）。

    「A4 70g」要能被「a4」「70g」「A470g」「A4 纸」叫出来 —— 学生不会照抄
    价目表里的原文。拆词取的是「字母数字段」和**带单位的数字**：
      · 'A4'       → 'a4'
      · '70g'      → '70g'、'70克'
      · '相纸'      → '相纸'（纯中文整串照收）
    返回的都是小写、去空格的形式（匹配前句子也会这么处理）。
    """
    raw = str((item or {}).get('paper') or '')
    terms = set()
    compact = re.sub(r'\s+', '', raw).lower()
    if compact:
        terms.add(compact)
    for chunk in re.findall(r'[a-z]+\d+[a-z]*|\d+[a-z]+|[\u4e00-\u9fa5]+', compact):
        terms.add(chunk)
        # 「70g」学生常写成「70克」
        gram = re.match(r'^(\d+)g$', chunk)
        if gram:
            terms.add(gram.group(1) + '克')
    terms.discard('')
    return terms


def _compact(text):
    """匹配用的归一形式：小写、去掉所有空白全角空格。
    学生打「A 4」「a4」「A4」都该命中同一档纸。"""
    return re.sub(r'[\s\u3000]+', '', (text or '').lower())


# 颜色 / 单双面的词不进「纸张候选词」：它们由 _find_color / _find_duplex 管，
# 若也拿去和档位名比对，「黑白」会命中「A4 70g · 黑白」这一档的 kind，
# 于是「黑白 2份」在没有黑白档时会被误判成「提到了某一档纸」。
_COLOR_DUPLEX_WORDS = frozenset(
    word for _value, words in (_COLOR_WORDS + _DUPLEX_WORDS) for word in words)


def _text_words(compact, min_length=2, max_length=6):
    """从归一后的句子里切出候选词：汉字按 2..6 字滑窗、字母数字段整取。

    为什么要滑窗：「相纸双面」是一整段汉字，不切开就永远匹配不到档位名
    「6寸 高级高光相纸」里的「相纸」—— 而学生只会写「相纸」这两个字。
    """
    words = set()
    for run in re.findall(r'[\u4e00-\u9fa5]+', compact):
        limit = min(max_length, len(run))
        for size in range(min_length, limit + 1):
            for start in range(0, len(run) - size + 1):
                word = run[start:start + size]
                if word not in _COLOR_DUPLEX_WORDS:
                    words.add(word)
    for run in re.findall(r'[a-z]+\d+[a-z]*|\d+[a-z]+', compact):
        if run not in _COLOR_DUPLEX_WORDS:
            words.add(run)
    return words


# 「学生说的词」与「管理员给那一档起的名字」之间最常见的几组落差。
# 左边是口语，右边是要去档位名里找的词。**只影响能不能匹配上**，
# 匹配不上时报的还是「没有这一档 + 现有档位」，不会替学生挑一档。
# 所以这张表可以放心加：它只会让「说了纸却匹配不到」变少，不会让匹配变错。
_PAPER_SYNONYMS = {
    '照片': '相纸', '相片': '相纸', '亮面': '相纸', '高光': '相纸', '合影': '相纸',
    '复印纸': '普通', '打印纸': '普通', '普通纸': '普通',
}


def _find_paper(text, items):
    """句子里提到了哪几档纸。返回命中的**条目**（可能多条，也可能为空）。

    两个方向都要认，缺一个就会出现「学生说了纸、我们当他没说」：
      · 档位名出现在句子里（「A4 80g 黑白」里的 'a4'/'80g'）；
      · 句子里的词出现在档位名里（「相纸」对上「6寸 高级高光相纸」）。
    后者靠 _text_words 切词 + 上面那张同义词表 —— 学生不会照抄价目表上的全名。
    """
    compact = _compact(text)
    if not compact:
        return []
    words = _text_words(compact)
    words |= {_PAPER_SYNONYMS[word] for word in list(words) if word in _PAPER_SYNONYMS}
    hits = []
    for item in items:
        names = [name for name in (
            _compact((item or {}).get('paper') or ''),
            _compact((item or {}).get('kind') or ''),
            _compact((item or {}).get('label') or ''),
        ) if name]
        if any(term and term in compact
               for term in sorted(paper_terms(item), key=len, reverse=True)):
            hits.append(item)
            continue
        if any(word in name for word in words for name in names):
            hits.append(item)
    return hits


def paper_display(text):
    """报错时用来指代「学生说的那个纸」的短词：「照片纸来两张」→「照片纸」。

    直接用整句的话，回执会写成「没有『照片纸来两张』这一档」—— 学生的要求里
    还夹着份数，读起来像我们在复述他，而不是在回答他。
    """
    match = _PAPER_HINT_RE.search(text or '')
    if match:
        return match.group(0).strip()
    return (text or '').strip()[:20]


def parse_requirement(text):
    """解析一句（或几行）打印要求。

    返回：
        {
          'global': spec,                 # 没指定给哪一份的那些要求
          'scoped': [(序号, spec), ...],  # 「第 2 份彩色」这种，序号从 1 数
          'remark': str | None,           # 「备注 xxx」整句
          'submit': bool,                 # 「好」「下单」这类整句
          'cancel': bool,                 # 「取消」这类整句
          'empty': bool,                  # 整句里一个可识别的要求都没有
          'raw': 原文,
        }

    「empty」是给大模型兜底用的判据：规则什么都没认出来时才值得多花一次
    外网调用（见 llm.py）；认出来了就不问模型，省一次往返也避免它改口。
    """
    raw = (text or '').strip()
    out = {'global': empty_spec(), 'scoped': [], 'remark': None,
           'submit': False, 'cancel': False, 'empty': True, 'raw': raw}
    if not raw:
        return out
    if raw in _CANCEL_WORDS:
        out['cancel'] = True
        return out

    # 备注是**整句语义**：写了备注就等于这句话只是在设备注，
    # 不再从里面抽打印参数（否则「备注 双面打印」会顺手把单双面也改了）。
    remark_match = re.match(r'^备注\s*[:：]?\s*(.*)$', raw, re.S)
    if remark_match:
        remark = remark_match.group(1).strip()[:200]
        out['remark'] = remark or None
        out['empty'] = not remark
        return out

    stripped = raw.strip().strip('。.!！~～,， ')
    if stripped.lower() in _SUBMIT_WORDS:
        out['submit'] = True
        return out

    for line in re.split(r'[\n；;]+', raw):
        for index, chunk in _split_scoped(line):
            spec = _spec_of(chunk)
            if index is None:
                merge_spec(out['global'], spec)
            elif not spec_is_empty(spec):
                out['scoped'].append((index, spec))
    out['empty'] = spec_is_empty(out['global']) and not out['scoped']
    return out


def _spec_of(chunk):
    """从一个片段里抽参数（不做序号/文件名解析，那是调用方的事）。

    片段先按分句切开（见 _CLAUSE_SPLIT 的说明），逐句抽、按顺序合并 ——
    这样「别打彩色的，打黑白的」里的否定只吃掉前半句的「彩色」，
    后半句的「黑白」照常生效（读成「整批彩色」或「解析为空」都是实打实的误判）。
    """
    spec = empty_spec()
    paper_parts = []
    for clause in _CLAUSE_SPLIT.split(chunk or ''):
        if not clause.strip():
            continue
        merge_spec(spec, _spec_of_clause(clause))
        hint = _paper_hint(clause)
        #    纸张提示**按分句累积**而不是后句覆盖前句：「A4 80g，相纸」两句话
        #    说的是同一件事（规格 + 材质），拼起来交给 resolve_spec 一起比对
        #    才可能命中正确的档；只留最后一句会丢掉前面那句里的规格。
        if hint and hint not in paper_parts:
            paper_parts.append(hint)
    spec['paper'] = ' '.join(paper_parts)[:120] or None
    return spec


def _spec_of_clause(clause):
    """单个分句里的参数（颜色 / 单双面 / 份数）。纸张见 _spec_of。"""
    spec = empty_spec()
    clause = clause or ''
    spec['color'] = _find_color(clause)
    spec['duplex'] = _find_duplex(clause)
    spec['copies'] = _find_copies(clause)
    return spec



# 「提到了纸」的粗略判据：句子里出现了 A4/A3/16K 这类规格，或克重，
# 或「相纸 / 照片 / 亮面 / 铜版」这类材质词。真正的匹配在 resolve_spec 里
# 对着价目表做（这一步只决定「要不要开始按纸去筛」）。
# 命中不了只是「没提纸」—— 那会退化成按颜色/默认档挑，不会挑错档位。
_PAPER_HINT_RE = re.compile(
    r'([ab]\d(?=\D|$)|16k|8k|32k|\d{2,3}\s*(?:g|克|磅)'
    r'|照片|相片|相纸|亮面|高光|铜版|牛皮|卡纸|普通纸|打印纸|复印纸|封面)',
    re.I)


def _paper_hint(chunk):
    match = _PAPER_HINT_RE.search(chunk or '')
    if not match:
        return None
    # 原样留着这句话（而不是只留那个词）：resolve_spec 要拿它跟每一档纸的名字
    # 比对，而「A4 80g」这种组合只有在完整句子里才看得出。
    return (chunk or '').strip()


def merge_spec(target, spec):
    """把 spec 里**说出来的**字段并进 target（没说的一律不覆盖）。"""
    for key, value in (spec or {}).items():
        if value:
            target[key] = value


# 分句切分器（说明见 _NEGATION_WORDS 下面那段）。`.` 不切：
# 「0.5」「A4」这种带点的写法更常见，而句号在打印要求里几乎不出现。
_CLAUSE_SPLIT = re.compile(r'[，,、。;；\n]+')


def _split_scoped(line):
    """把一行切成 [(序号 | None, 片段), ...]。

    「1黑白2份 2彩色」「第2份双面」「第二份彩色」这类写法都靠它拆开 ——
    拆不出序号的就是全局要求（第 1 个元素序号为 None）。
    序号为 `REF_LAST`（-1）表示「最后一份」，由调用方按这一批的份数解释。
    """
    marks = [(m.start(), m.end(), _mark_index(m)) for m in _REF_PATTERN.finditer(line or '')]
    #    「除了第一份…」里那个「第一份」是**排除**的意思，不是作用域：
    #    把它当作用域的话，「除了第一份都要黑白」会变成「第 1 份黑白、其余不动」——
    #    正好说反了。认不出排除语义时**退回整句**（这句多半被当没听懂、多问一句），
    #    比把要求安到错的文件上安全。
    marks = [mark for mark in marks if not _excluded_ref(line, mark[0])]
    if not marks:
        return [(None, line)]
    chunks = []
    head = (line[:marks[0][0]] or '').strip(' ,，、:：。.')
    if head:
        chunks.append((None, head))
    for position, (start, end, index) in enumerate(marks):
        next_start = marks[position + 1][0] if position + 1 < len(marks) else len(line)
        body = (line[end:next_start] or '').strip(' ,，、:：。.')
        if body:
            chunks.append((index, body))
    return chunks


# 「除了 / 除去 / 不包括」这类排除词，紧贴在序号前面时那个序号不是作用域。
_EXCLUDE_PREFIX = ('除了', '除去', '除开', '不包括', '去掉', '不含')


def _excluded_ref(line, start):
    head = (line or '')[:start].rstrip(' 　')
    return any(head.endswith(word) for word in _EXCLUDE_PREFIX)



def _mark_index(match):
    """一个序号匹配 → 序号（1 起），「最后一份」→ REF_LAST。

    中文数字（「二」「十二」）与阿拉伯数字都收；读不出时退回 1 ——
    这个分支理论上走不到（正则已经限定了字符集），兜底是「宁可当成第 1 份
    并让 bot 在回执里念出来」，而不是抛异常把整条消息吞掉。
    """
    if match.group('last'):
        return REF_LAST
    value = cn_number(match.group('cn') or match.group('n'))
    return value if value else 1



# ---- 把 spec 落成一条真实档位 ------------------------------------------------

# 份数的合法区间（与服务端 routes/orders.py 的 parse_copies 同一口径：
# 1..config.COPIES_MAX，printbot 这边抄成 COPY_MAX）。
_COPIES_MIN, _COPIES_MAX = 1, config.COPY_MAX


def clamp_copies(value):
    """把份数夹进 1..COPY_MAX；读不成整数时退回 1。"""
    try:
        number = int(value)
    except (TypeError, ValueError):
        return _COPIES_MIN
    return max(_COPIES_MIN, min(number, _COPIES_MAX))


def _item_matches_color(item, color):
    return (item or {}).get('color') == color



def resolve_spec(spec, items, default_item_id=None, default_copies=None,
                 default_duplex=None):
    """把一份要求落成**具体的一档**，返回 (resolved, error)。

    resolved = {'price_item_id', 'label', 'color', 'duplex', 'copies',
                'assumed': [... 补了哪些默认值 ...]}

    判据顺序（每一步都可能是「筛到一档不剩 → 报错」，绝不回落）：
      ① 句子里提了纸 → 只留名字命中的那些档；
      ② 提了颜色 → 只留颜色相符的档；
      ③ 剩多档 → 学生自己的默认档（若在候选里）> 排在前面的一档
         （`sort_order` 是管理员排的，第一位就是他推荐的档 ——
          「黑白 2份」能落到「A4 70g · 黑白」靠的就是这一步）；
      ④ 一档都没剩 → error 里**列出可选档**，让学生照着重说。

    没说的部分（份数 / 单双面 / 档位）用默认值补，并记进 assumed ——
    回执要把这些原样念给学生听（「按 A4 70g · 黑白 · 1 份 · 单面 下单」），
    他看到不对还能改；悄悄补上不提，才是真的误判。
    """
    items = [item for item in (items or []) if item]
    if not items:
        return None, '管理员还没配置价目表，先按老规矩由管理员核定金额'
    assumed = []

    candidates = list(items)
    if (spec or {}).get('paper'):
        hits = _find_paper(spec['paper'], items)
        if not hits:
            return None, '没有「%s」这一档，现有：%s' % (
                paper_display(spec['paper']), _labels(items))
        candidates = hits
    if (spec or {}).get('color'):
        colored = [item for item in candidates if _item_matches_color(item, spec['color'])]
        if not colored:
            name = '黑白' if spec['color'] == 'black' else '彩色'
            return None, '没有「%s」这一档，现有：%s' % (name, _labels(candidates))
        candidates = colored

    chosen = None
    if default_item_id:
        chosen = next((item for item in candidates
                       if item.get('price_item_id') == default_item_id), None)
    if chosen is None:
        chosen = candidates[0]
    #    「档位按 X」只在**我们替他挑的**时候才说。学生自己设过默认档、
    #    而那一档正好在候选里时不写 —— 那是他的选择，不是我们的假设，
    #    写出来只会让回执多一句他早就知道的话。
    if not (spec or {}).get('paper') and not (spec or {}).get('color'):
        assumed.append('档位按 %s' % chosen.get('label'))
    elif len(candidates) > 1 and not default_item_id:
        # 说了纸或颜色，但符合条件的还不止一档（「黑白」对上 70g / 80g 两档）
        assumed.append('档位按 %s' % chosen.get('label'))

    #    份数**在这里就夹到 1..COPY_MAX**。不夹的话「彩色 80 份」会带着 80 一路
    #    走到服务端，被 parse_copies 顶回 400 —— 学生看到的只是一句「下不成单」，
    #    他会一遍遍回「好」，直到这一批 5 分钟作废，期间没有一句「份数最多 50」。
    #    夹完还必须**说出来**（进 assumed，回执会念）：静默改数比报错更坑，
    #    学生以为打了 80 份，实际只打了 50 份。
    asked_copies = (spec or {}).get('copies')
    copies = clamp_copies(asked_copies or default_copies or 1)
    if asked_copies and asked_copies != copies:
        assumed.append('份数最多 %d 份，按 %d 份' % (_COPIES_MAX, copies))
    if not asked_copies:
        assumed.append('%s 份' % copies)


    duplex_asked = (spec or {}).get('duplex')
    duplex = duplex_asked or default_duplex or 'single'
    if not chosen.get('supports_duplex'):
        #    学生**明确说了**「双面」、而这一档只有单面价：报错，不静默降级。
        #    原先这里是 `duplex = 'single'` 加一句 assumed —— 而多份文件的回执
        #    只念汇总、根本不念 assumed，于是学生看到的是「黑白 · 单面」，
        #    他要的双面就这么没了（真实反馈：截图里那句「黑白双面 一份」）。
        #    这与「说了 A3 而没这一档」是同一条纪律：说清楚有哪些、让他选，
        #    不替他改参数。默认值带来的 double（他没说）仍按单面并念出来。
        if duplex == 'double' and duplex_asked:
            able = [item for item in items if item.get('supports_duplex')]
            same_color = [item for item in able
                          if _item_matches_color(item, chosen.get('color'))]
            pool = same_color or able
            hint = ('换一档支持双面的：%s' % _labels(pool)) if pool else '现有档位都是单面'
            return None, ('你说了「双面」，但「%s」这一档只支持单面。\n'
                          '· 回「单面」按单面下；\n'
                          '· 或者%s' % (chosen.get('label'), hint))
        if duplex == 'double':
            assumed.append('这一档不支持双面，按单面')
        duplex = 'single'
    if not (spec or {}).get('duplex'):
        assumed.append('单面' if duplex == 'single' else '双面')

    return {
        'price_item_id': chosen.get('price_item_id'),
        'label': chosen.get('label'),
        'color': chosen.get('color') or (spec or {}).get('color') or 'black',
        'duplex': duplex,
        'copies': copies,
        'assumed': assumed,
    }, None


def _labels(items):
    """把候选档位列成一句话（报错信息里给学生照着念）。"""
    names = [str((item or {}).get('label') or '').strip() for item in (items or [])]
    names = [name for name in names if name]
    return ' / '.join(names[:6]) or '（空）'


def describe(resolved, with_copies=True):
    """把 resolved 拼成一句人话：「A4 70g · 黑白 · 2 份 · 双面」。"""
    if not resolved:
        return ''
    parts = [resolved.get('label') or '']
    if with_copies:
        parts.append('%s 份' % (resolved.get('copies') or 1))
    parts.append('双面' if resolved.get('duplex') == 'double' else '单面')
    return ' · '.join(part for part in parts if part)


def default_item_id(items, preferred=None):
    """默认档：学生自己设过的（若还在售）> 排在最前的那一档。

    与 resolve_spec 的第③步是同一个判据，单独抽出来是给「只发文件、
    一个字都没说」那条路用的 —— 那一条也要知道自己会落到哪一档，
    好在提问时把它写出来。
    """
    items = [item for item in (items or []) if item]
    if not items:
        return None
    if preferred:
        found = next((item for item in items
                      if item.get('price_item_id') == preferred), None)
        if found:
            return preferred
    return items[0].get('price_item_id')
