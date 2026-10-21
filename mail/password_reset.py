"""password_reset.py —— 「忘记密码」那封验证码邮件写什么、怎么寄出去。

和 pickup.py / template.py 并列，不塞进那两个文件：那两封是**通知**（单子好了、
有人接单了），这一封是**凭证**（一串能改密码的数字）。语气、有效期、正文形状都不同，
合在一起以后改这封得先读完那两封，而读与自己无关的代码正是改错的来源。

收件地址只认一条路：注册时那个必填的 QQ 号 -> `<QQ号>@qq.com`。
**不让用户当场填一个新地址** —— 那等于「谁先填谁就能接管这个账号」，
而 QQ 号是注册那一刻就绑在本人手里的东西（见 config 里 PASSWORD_RESET_* 那段）。

正文里刻意带上「不是你本人操作就忽略这封邮件」：别人拿着你的学号来申请找回时，
你会在邮箱里收到这封信。这时候最该让收信人确信两件事 ——
密码没有被改，这串码过期就作废。少写这一句，一次陌生人的误操作
看起来就完全像「我的账号被人动了」。
"""
import html

from config import MAIL_FROM_NAME, PASSWORD_RESET_TTL_MINUTES, SITE_URL

from .recipients import qq_mailbox
from .sender import send_mail

# 只用于 sender 的日志前缀：日志里得能分清是哪一种邮件出了问题。
_LABEL = '密码找回验证码'


def _e(value):
    """HTML 转义。昵称是用户自己起的，值一律从这儿过。"""
    return html.escape(str(value if value is not None else ''), quote=True)


def _field(row, key):
    """从 sqlite3.Row 里取一个字段，取不到就当空。

    用 try 而不是 row[key] 裸取：调用方可能只查了需要的几列
    （路由里那句 SELECT 就是挑着取的），少一列不该让整封邮件发不出去。
    """
    try:
        return (row[key] or '').strip()
    except (IndexError, KeyError):
        return ''


def compose_reset_subject(code):
    """主题：站点名 + 验证码本身。

    把码放进主题是有意的 —— 手机上收到信，锁屏通知里就能读到这六位，
    不用点进邮箱再复制一遍。它不构成泄露：这封信本来就只发给本人绑定的地址。
    """
    return '[%s] 密码找回验证码 %s' % (MAIL_FROM_NAME, code)


def compose_reset_body(row, code):
    """纯文本正文。

    不支持 HTML 的客户端看到的就是这一份，所以它必须**独立完整**：
    只写「请查看 HTML 版本」等于这封信没发。
    """
    nickname = _field(row, 'nickname')
    greeting = ('你好，%s：' % nickname) if nickname else '你好：'
    minutes = PASSWORD_RESET_TTL_MINUTES
    return '\n'.join([
        greeting,
        '',
        '你正在「打印服务」找回密码，验证码是：',
        '',
        '    %s' % code,
        '',
        '这串数字 %d 分钟内有效。' % minutes,
        '在网页上把它填进「忘记密码」的输入框，就能设置新密码。',
        '入口：%s（登录页 ->「忘记密码」）' % SITE_URL,
        '',
        '如果这不是你本人的操作，请直接忽略这封邮件。',
        '你的密码不会被改动，这串验证码也会在 %d 分钟后自动失效。' % minutes,
        '',
        '（本邮件由系统自动发出，请勿直接回复。）',
    ])


def compose_reset_html(row, code):
    """HTML 正文。样式一律内联：Gmail 会把 <style> 块整段删掉，
    内联是唯一到处都认的写法（与 pickup.py 同一套理由）。
    """
    nickname = _field(row, 'nickname')
    minutes = PASSWORD_RESET_TTL_MINUTES
    return (
        '<div style="font-family:-apple-system,\'Segoe UI\',\'Microsoft YaHei\',sans-serif;'
        'font-size:14px;line-height:1.7;color:#222;max-width:560px">'
        '<p style="margin:0 0 12px">你好%s：</p>'
        '<p style="margin:0 0 4px">你正在「打印服务」找回密码，验证码是</p>'
        '<p style="margin:0 0 16px;font-size:30px;font-weight:700;letter-spacing:8px">%s</p>'
        '<p style="margin:0 0 12px">这串数字 <strong>%d 分钟</strong>内有效，'
        '在网页上填进「忘记密码」的输入框即可设置新密码。</p>'
        '<p style="margin:0 0 12px;color:#666">如果这不是你本人的操作，请直接忽略这封邮件：'
        '你的密码不会被改动，这串验证码也会在 %d 分钟后自动失效。</p>'
        '<p style="margin:20px 0 0;color:#999;font-size:12px">'
        '入口：%s（登录页 -&gt;「忘记密码」）</p>'
        '<p style="margin:4px 0 0;color:#999;font-size:12px">'
        '（本邮件由系统自动发出，请勿直接回复。）</p>'
        '</div>'
    ) % (('，' + _e(nickname)) if nickname else '', _e(code), minutes, minutes, _e(SITE_URL))


def send_reset_code(row, code):
    """把验证码寄到 `<QQ号>@qq.com`，返回 (是否发出, 原因)。

    失败一律返回 `(False, 短标识)`，绝不抛异常：
    调用它的是**公开接口**的请求路径（没登录的人才需要找回密码），
    异常冒出去就是 500。而这条链对外那句话是固定的 ——
    一旦「500 还是 200」取决于账号内部状态，反复试探返回码就能分辨
    「这个学号注册没有 / 停用没有」，正是整条链最想藏住的那点信息。
    原因用短标识（smtp_failed / qq_invalid）而不是中文句子：
    调用方要按它分流（记不同的事件、不同的告警），中文句子改一个标点就会让分支静默失效。
    """
    mailbox = qq_mailbox(_field(row, 'qq'))
    if not mailbox:
        # QQ 是注册必填项，走到这里通常是「老账号还没补填」或人工改库改坏了。
        return False, 'qq_invalid'
    ok = send_mail(
        compose_reset_subject(code),
        compose_reset_body(row, code),
        [mailbox],
        html=compose_reset_html(row, code),
        label=_LABEL,
    )
    return (True, '') if ok else (False, 'smtp_failed')
