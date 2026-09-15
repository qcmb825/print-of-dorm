"""utils.py —— 上传/取件码/分页/注册校验等通用辅助函数。"""

import re
import uuid
import secrets

from config import (
    ALLOWED_EXTENSIONS,
    CONTACT_LABELS,
    CONTACT_TYPES,
    EMAIL_RE,
    NICKNAME_RE,
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



def validate_registration(data):
    """校验注册字段，返回 (清洗后的字典, 错误信息)，失败时字典为 None。"""
    nickname = (data.get('nickname') or '').strip()
    real_name = (data.get('real_name') or '').strip()
    student_id = (data.get('student_id') or '').strip()
    dorm = (data.get('dorm') or '').strip()
    password = data.get('password') or ''
    confirm = data.get('confirm_password') or ''
    # 联系方式必填：先选类型（微信 / QQ / 邮箱），号码再按对应类型校验格式。
    # 前端也会校验一遍，但那只是让用户少等一次请求，真正的把关必须在后端。
    contact_type = (data.get('contact_type') or '').strip().lower()
    contact = (data.get('contact') or '').strip()

    if not NICKNAME_RE.match(nickname):
        return None, '昵称需为 2-20 位中文、字母、数字或下划线'
    if not REALNAME_RE.match(real_name):
        return None, '姓名需为 2-20 位中文或字母'
    if not STUDENT_ID_RE.match(student_id):
        return None, '学号需为 4-20 位数字'
    if not (2 <= len(dorm) <= 50) or not all(ch.isprintable() for ch in dorm):
        return None, '宿舍位置需为 2-50 个可见字符（请写到门牌号）'
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
    if not (8 <= len(password) <= 64):
        return None, '密码长度需为 8-64 位'
    if not re.search(r'[A-Za-z]', password) or not re.search(r'\d', password):
        return None, '密码需同时包含字母和数字'
    if password != confirm:
        return None, '两次输入的密码不一致'
    if password in (nickname, student_id):
        return None, '密码不能与昵称或学号相同'
    return {
        'nickname': nickname,
        'real_name': real_name,
        'student_id': student_id,
        'dorm': dorm,
        'contact_type': contact_type,
        'contact': contact,
        'password': password,
    }, None
