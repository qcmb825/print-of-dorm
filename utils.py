"""utils.py —— 上传/取件码/分页/注册校验等通用辅助函数。"""

import re
import uuid
import zipfile
import secrets

from config import (
    ALLOWED_EXTENSIONS,
    AUDIT_NOTE_MAX,
    AUDIT_NOTE_MIN,
    CONTACT_LABELS,
    CONTACT_TYPES,
    COPIES_DEFAULT,
    COPIES_MAX,
    COPIES_MIN,
    EMAIL_RE,
    NICKNAME_RE,
    PRICE_MAX_YUAN,
    PRICE_RE,
    QQ_RE,
    REALNAME_RE,
    ST_DONE,
    STATUS_CLOSED,
    STUDENT_ID_RE,
    WECHAT_RE,
    logger,
)


# 辅助函数

def allowed_file(filename):
    """按白名单校验扩展名，避免上传可执行文件。"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# 文件头（魔数）对照表：扩展名 -> (开头必须出现的字节, 写给人看的格式名)。
#
# 只认「文件开头就是它」，不做「前 N 字节里找一找」的宽松匹配 ——
# 宽松匹配等于把绕过成本压到「在第 100 字节里塞一段魔数」。
_FILE_SIGNATURES = {
    'pdf': (b'%PDF-', 'PDF'),
    'png': (b'\x89PNG\r\n\x1a\n', 'PNG'),
    # JPEG 的 SOI 标记本身只有 FF D8 两字节，但紧跟其后的 JFIF/EXIF 段一律以 FF 开头，
    # 所以真实文件的前三字节是 FF D8 FF。只认两字节的话，
    # 一个恰好以 FF D8 开头的其它容器也会被当成图片。
    'jpg': (b'\xff\xd8\xff', 'JPEG'),
    'jpeg': (b'\xff\xd8\xff', 'JPEG'),
    # .doc 是 OLE2 复合文档（Word 97-2003 和同期的 Excel / PowerPoint 共用一个容器格式），
    # 文件头是固定的这 8 个字节。有一类「.doc」其实是 RTF 文本流（部分导出工具这么干），
    # 会被这一关挡住；真碰上了应该往表里补 {\rtf，而不是把校验放宽成「不校验」。
    'doc': (b'\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1', 'OLE2 复合文档'),
    # .docx 是 OOXML 的 zip 包，本地文件头固定以 PK\x03\x04 开头。
    'docx': (b'PK\x03\x04', 'ZIP'),
}

# 反解压炸弹的两个阈值，给得刻意宽松：正常的 docx 里图片、字体本来就压不动，
# 声明的解压总量和原文件差不多；能把这两个数同时顶爆的只有刻意做出来的包。
# 一份 50MB 上限的文档声明解压出 300MB 已经很离谱；文本 XML 正常能压十几倍，
# 200 倍的压缩比远超这个量级。
_ZIP_MAX_UNCOMPRESSED_BYTES = 300 * 1024 * 1024
_ZIP_MAX_RATIO = 200

# 回给用户的话。里面不放任何内部细节（期望的魔数是什么、包里声明了多少字节都不能说）：
# 那等于把「怎么绕过这一关」直接告诉对方，而这些话是要显示给学生看的。
_SIGNATURE_MISMATCH_HINT = '文件内容与扩展名不符，请确认没有改名后上传'
_BROKEN_ZIP_HINT = '这个文件内容异常或已损坏，请重新导出后再上传'


def _zip_archive_error(path):
    """把 zip 包（.docx）当成「像不像解压炸弹」看一眼，可疑返回错误信息，正常返回 None。

    只查中央目录里**声明**的大小，不真的解压：解压就等于让攻击者拿几十 KB 的上传量
    换我们这边几百 MB 的内存和磁盘 —— 那正是要躲开的事情。
    代价是它挡不住「声明值造假」的老练对手：这是一道便宜的筛子，不是保险，
    真正把关的地方在别处（打开文件的是接单人自己的机器）。

    读中央目录的代价是一次目录读，不会把整个文件读进内存。
    """
    try:
        with zipfile.ZipFile(path) as archive:
            infos = archive.infolist()
    except (zipfile.BadZipFile, OSError, ValueError, NotImplementedError):
        # 扩展名说是 zip 包，却连目录都读不出来：要么文件坏了，要么是改名来的。
        return _BROKEN_ZIP_HINT
    raw_total = sum(info.file_size for info in infos)
    packed_total = sum(info.compress_size for info in infos)
    if raw_total > _ZIP_MAX_UNCOMPRESSED_BYTES or (
            packed_total > 0 and raw_total / packed_total > _ZIP_MAX_RATIO):
        logger.warning('上传的 Office 文档像解压炸弹，已拒绝：声明解压 %s 字节 / 压缩包 %s 字节',
                       raw_total, packed_total)
        return _BROKEN_ZIP_HINT
    return None



def content_signature_error(path, ext):
    """按扩展名核对文件头，返回要回给用户的错误信息；对得上（或判定不了）返回 None。

    为什么光有扩展名白名单不够 —— 白名单管的是文件名，里面的字节它一个都不管：
    把 .exe 改名成 .pdf 一样能过。而这份文件是**接单人必然会打开**的
    （不打出来就没法完成这一单），等于把「名不副实」的东西直接送到别人的机器上。
    系统管不了对方装没装杀软，至少要把这个最廉价的信号挡在门口。

    只读开头那几个字节。单文件上限 50MB，为了看 8 个字节把整个文件读进内存，
    等于给每个上传请求凭空加一份 50MB 的内存占用，被刷几下就能把进程顶爆。

    ext 不在对照表里时放行：白名单之外的扩展名在更早的关卡就该被拒了，
    漏到这里说明白名单新加了扩展名而对照表没跟上 —— 那种情况下不校验比拦错强，
    拦错的表现是「正常文件突然传不上来」，而且没人知道是为什么。
    """
    entry = _FILE_SIGNATURES.get((ext or '').lower())
    if entry is None:
        return None
    expected, kind = entry
    try:
        with open(path, 'rb') as fp:
            head = fp.read(len(expected))
    except OSError:
        # 读不到就当作「判定不了」放行，不在这里编一个错误：这个函数只回答「像不像」，
        # 读不了盘的异常留给后面如实报（那时候才知道该说「服务器问题」还是「文件问题」）。
        return None
    if head != expected:
        # 日志里不带路径：沿项目惯例，服务器绝对路径不出现在任何对外文本里，
        # 而这条 warning 只给运维看，知道是哪个扩展名、头几个字节是什么就够了。
        logger.warning('上传文件内容与扩展名不符：扩展名=%s 期望=%s 实际文件头=%r',
                       ext, kind, head)
        return _SIGNATURE_MISMATCH_HINT
    if (ext or '').lower() == 'docx':
        return _zip_archive_error(path)
    return None



def display_name(nickname, status):
    """给列表展示用的昵称：账号已注销的，在名字后面标一下。

    为什么非标不可 —— 注销的账号会把昵称 / 姓名 / 学号让出去，别人可以顶着
    一模一样的昵称重新注册。订单和工单都是按 user_id 关联的，关联本身没问题，
    可页面是给人看的：一个已经走掉的人和一个刚来的新人可能同名，
    只显示昵称的话，历史记录会被读成「这是新来那位做的」。
    这个标注不是装饰，是防止把历史读错。

    nickname 为 None 表示这条记录没有关联到任何账号（LEFT JOIN 没匹配上），
    原样返回 None，交给前端显示成「（无归属）」这类文案。
    """
    if nickname is None:
        return None
    if status == STATUS_CLOSED:
        return nickname + '（已注销）'
    return nickname



def mask_nickname(nickname):
    """榜单展示用的打码昵称：首尾各留一个字，中间一律换成 *。

    为什么要打码 —— 榜单是给所有登录用户看的，它把「某人打了多少单」
    变成了一条可以被同学对号入座的信息。昵称在整个系统里是用户注册时自己填的，
    除了公告和工单（那两处本来就带名字），别的地方都是本人视角，它并不天然是公开字段，
    换到公开场合就得先遮一层。

    首尾留字是为了还能认出是张三还是小李：打码要的效果是让人没法一眼看穿，
    不是把榜单变成一排看不出区别的星号。

    两个字的名字只遮后一个（「小明」→「小*」）。
    只留首字和留首尾的暴露程度是一样的，而「**」看着像系统出错了。
    """
    if not nickname:
        return nickname
    if len(nickname) <= 1:
        return '*'
    if len(nickname) == 2:
        return nickname[0] + '*'
    return nickname[0] + '*' * (len(nickname) - 2) + nickname[-1]



def generate_pickup_code(conn, length=4):
    """生成不重复的数字取件码。"""
    for _ in range(50):
        code = ''.join(secrets.choice('0123456789') for _ in range(length))
        if conn.execute(
            'SELECT 1 FROM orders WHERE pickup_code = ? AND status <> ?',
            (code, ST_DONE),
        ).fetchone() is None:
            return code
    # 数字码极端冲突时退化成短码，保证下单不被卡住
    logger.warning(
        '取件码空间紧张：50 次随机数字码全部冲突，已回退为 uuid 前缀取件码（形态变化）'
    )
    return uuid.uuid4().hex[:6].upper()



def positive_int(value, default, maximum=None):
    """把查询参数解析成正整数，不合法或超范围就回退。"""
    try:
        result = int(value)
    except (TypeError, ValueError):
        return default
    if result < 1:
        return default
    if maximum is not None:
        result = min(result, maximum)
    return result



def parse_price(value):
    """把计费金额解析成「元」，返回 (金额, 错误信息)，失败时金额为 None。

    为什么先转字符串再解析，而不是 float(value) 一路到底 ——
    请求体是 JSON，`{"price": 12.5}` 到这边已经是二进制浮点数了，精度早丢了；
    更麻烦的是 float 能接受一大堆不该当金额的东西：`Infinity`、`NaN`、
    `1e500`。它们在比较大小那一步全都不按常理出牌（NaN 跟任何数比都是 False），
    于是「大于 0 且小于上限」这个看起来无懈可击的判断会把 NaN 放进来，
    最后落库变成一个显示成「nan 元」的订单。
    按字符串走，正则先把形状卡死（最多六位整数、最多两位小数），再转一次，
    这一步已经没有异常值能溜过去了。

    注意 bool 要单独挡：Python 里 True 是 int 的子类，不挡的话
    `{"price": true}` 会算成 1 元，静默地给一单标上一块钱。
    """
    if isinstance(value, bool):
        return None, '金额请填写数字'
    if isinstance(value, (int, float)):
        # 数字型也统一按字符串走一遍，好让两种写法共用同一套规则。
        # repr 而不是 str：str(1e21) 是 '1e+21'，repr 也是，两者在这里等价，
        # 但 repr 对 float 的往返表示更可靠。
        text = repr(value)
    else:
        text = (value or '').strip() if isinstance(value, str) else ''
    if not text:
        return None, '请填写金额'
    if not PRICE_RE.match(text):
        return None, '金额需为不超过 %s 元的数字，最多两位小数' % PRICE_MAX_YUAN
    amount = round(float(text), 2)
    if amount <= 0:
        # 允许 0 没有意义：真要免费，那单就不该走计费这一步。
        # 拦在这里，免得屏幕上出现一批 0 元的「已计费」订单。
        return None, '金额要大于 0'
    if amount > PRICE_MAX_YUAN:
        return None, '金额不能超过 %s 元' % PRICE_MAX_YUAN
    return amount, None



def parse_copies(value):
    """把份数解析成整数，返回 (份数, 错误信息)。

    空值（None / 空串）当作**没填**，回落到 COPIES_DEFAULT —— 这是老前端
    （升级前那个只会传 color/duplex/remark 的版本）发过来的形状，
    它没有份数这个概念，而那时候的含义就是「打一份」。
    不能因为客户端少传一个字段就判 400：那会变成「缓存里的旧页面突然下不了单」。

    bool 必须单独挡：Python 里 True 是 int 的子类，不挡的话 {"copies": true}
    会静默变成 1 份 —— 金额那边踩过同一个坑，见 parse_price 的说明。

    字符串照收（表单传过来就是字符串），但只认纯整数文本：'2.5' 会被 int() 拒掉，
    这是对的，从来没听说过打 2.5 份。
    """
    if value is None or (isinstance(value, str) and not value.strip()):
        return COPIES_DEFAULT, None
    if isinstance(value, bool):
        return None, '份数请填写 %s-%s 之间的整数' % (COPIES_MIN, COPIES_MAX)
    try:
        copies = int(str(value).strip())
    except (TypeError, ValueError):
        return None, '份数请填写 %s-%s 之间的整数' % (COPIES_MIN, COPIES_MAX)
    if not COPIES_MIN <= copies <= COPIES_MAX:
        return None, '份数需在 %s-%s 之间' % (COPIES_MIN, COPIES_MAX)
    return copies, None



def validate_contact(data):
    """校验「联系方式」这一组字段，返回 (清洗后的字段, 错误信息)。

    注册和身份审核申请都要收联系方式，所以规则只能有一份 ——
    各写一套的话，改了一处忘了另一处，就会出现「注册时要求微信号字母开头、
    申请时不管」这种前后不一：用户填同一个号，一个入口过、另一个入口不过。

    联系方式在注册时是必填的，理由不是为了骚扰用户，而是因为它**是唯一
    能把线上账号和线下真人对上号的东西**：出了事（传了不该传的文件、
    订单一直不取），管理员得能找得到这个人。
    """
    contact_type = (data.get('contact_type') or '').strip().lower()
    contact = (data.get('contact') or '').strip()
    if contact_type not in CONTACT_TYPES:
        return None, '请选择联系方式类型（微信 / QQ / 邮箱）'
    if not contact:
        return None, '请填写%s' % CONTACT_LABELS[contact_type]
    if len(contact) > 50:
        return None, '联系方式不能超过 50 个字符'
    if contact_type == 'wechat' and not WECHAT_RE.match(contact):
        return None, '微信号需为 5-20 位、以字母开头（可含字母、数字、_ 和 -）'
    if contact_type == 'qq' and not QQ_RE.match(contact):
        return None, 'QQ 号需为 5-12 位数字，且不能以 0 开头'
    if contact_type == 'email' and not EMAIL_RE.match(contact):
        return None, '邮箱格式不正确，例：name@example.com'
    return {'contact_type': contact_type, 'contact': contact}, None



def validate_identity_fields(data):
    """校验「身份资料」这一组字段：昵称 / 姓名 / 学号 / 宿舍 / 联系方式。

    注册和管理端改资料收的是同一批字段，规则就只该有一份 ——
    各写一套的话，改了一处忘了另一处，会出现「注册说昵称不能带减号、
    管理端改资料却放行」这种自相矛盾：同一个值，一个入口过、另一个入口不过。
    和 validate_contact 拆出来的理由完全一样，只是往外再拆一层。

    返回 (清洗后的字典, 错误信息)，失败时字典为 None。
    """
    nickname = (data.get('nickname') or '').strip()
    real_name = (data.get('real_name') or '').strip()
    student_id = (data.get('student_id') or '').strip()
    dorm = (data.get('dorm') or '').strip()

    if not NICKNAME_RE.match(nickname):
        return None, '昵称需为 2-20 位中文、字母、数字或下划线'
    if not REALNAME_RE.match(real_name):
        return None, '姓名需为 2-20 位中文或字母'
    if not STUDENT_ID_RE.match(student_id):
        return None, '学号需为 4-20 位数字'
    if not (2 <= len(dorm) <= 50) or not all(ch.isprintable() for ch in dorm):
        return None, '宿舍位置需为 2-50 个可见字符（请写到门牌号）'
    # 联系方式这组字段和身份审核申请也共用同一份规则（见 validate_contact）。
    contact_fields, error = validate_contact(data)
    if contact_fields is None:
        # 判 None 而不是判 error 真假：两者本来就同进同出，
        # 但写成判 None 才能让读代码的人和类型检查器都确定后面能安全取键。
        return None, error
    return {
        'nickname': nickname,
        'real_name': real_name,
        'student_id': student_id,
        'dorm': dorm,
        'contact_type': contact_fields['contact_type'],
        'contact': contact_fields['contact'],
    }, None



def password_error(password, nickname='', student_id=''):
    """密码本身的强度规则，返回错误信息；合规时返回 None。

    注册和管理端重置密码共用这一份：两处各写一套的话，会变成
    「注册要求带数字、重置却什么都不要求」，管理员随手设一个 123 就进去了。

    确认密码**不在这里比** —— 确认框是防手滑的交互手段，只有用户自己打字的
    注册流程需要它；管理端重置是管理员打一串临时密码交给本人，
    多设一道「两次一致」只是让人多打一遍，挡不住任何事。
    """
    if not (8 <= len(password) <= 64):
        return '密码长度需为 8-64 位'
    if not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password):
        return '密码需同时包含字母和数字'
    if password in (nickname, student_id):
        return '密码不能与昵称或学号相同'
    return None



def validate_registration(data):
    """校验注册字段，返回 (清洗后的字典, 错误信息)，失败时字典为 None。"""
    fields, error = validate_identity_fields(data)
    if fields is None:
        return None, error
    password = data.get('password') or ''
    confirm = data.get('confirm_password') or ''
    error = password_error(password, fields['nickname'], fields['student_id'])
    if error:
        return None, error
    if password != confirm:
        return None, '两次输入的密码不一致'
    # 报错顺序和原来一致：先把各字段的格式挑完，最后才说密码的事。
    fields['password'] = password
    return fields, None



def validate_audit_request(data):
    """校验身份审核申请，返回 (清洗后的字典, 错误信息)。

    只收「学号 + 姓名 + 联系方式 + 说明」四样。
    申请要回答的是「你是谁、怎么联系到你」，管理员据此人工核对 ——
    所以**密码不在其中**：申请不等于注册，不能让一个还没通过审核的人
    提前把密码交给系统存着（存的东西越多，出了泄露事就越大）。
    """
    student_id = (data.get('student_id') or '').strip()
    real_name = (data.get('real_name') or '').strip()
    note = (data.get('note') or '').strip()

    if not STUDENT_ID_RE.match(student_id):
        return None, '学号需为 4-20 位数字'
    if not REALNAME_RE.match(real_name):
        return None, '姓名需为 2-20 位中文或字母'
    contact_fields, error = validate_contact(data)
    if contact_fields is None:
        return None, error
    if not (AUDIT_NOTE_MIN <= len(note) <= AUDIT_NOTE_MAX):
        # 说明给个下限是有必要的：只写「无」的话管理员没有任何可以下手核对的东西，
        # 只能回头再问一遍，一次审核变成两次。
        return None, ('请用 %s-%s 个字说明一下情况'
                      '（比如：我是新生还没录进名单、转过专业换了学号）'
                      % (AUDIT_NOTE_MIN, AUDIT_NOTE_MAX))
    return {
        'student_id': student_id,
        'real_name': real_name,
        'contact_type': contact_fields['contact_type'],
        'contact': contact_fields['contact'],
        'note': note,
    }, None
