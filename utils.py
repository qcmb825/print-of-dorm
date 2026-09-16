"""utils.py —— 上传/取件码/分页/注册校验等通用辅助函数。"""

import re
import uuid
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
    STATUS_CLOSED,
    STUDENT_ID_RE,
    WECHAT_RE,
)


# 辅助函数

def allowed_file(filename):
    """按白名单校验扩展名，避免上传可执行文件。"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



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
        if conn.execute('SELECT 1 FROM orders WHERE pickup_code = ?', (code,)).fetchone() is None:
            return code
    # 数字码极端冲突时退化成短码，保证下单不被卡住
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
