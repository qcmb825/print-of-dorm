"""sender.py —— 把信递给 SMTP 服务器。这是本系统唯一的出口。

它有一个刻意做出来的性质：**失败返回 False，绝不抛异常**。
理由和「订单留痕写失败只记 warning」一样 —— 通知是附加动作，
而调用它的是一条常驻的定时循环。异常逃出去会把线程带走，线程一死
往后所有提醒就都静默停了，可这件事不会有任何人发现（进程还在、接口还正常）。

另一条：写进日志的地址一律打码（recipients.mask_address）。
**主题和正文字段一概不写日志** —— 主题里有订单号和昵称，正文里有文件名。
要排查内容对不对，就对着一封真邮件看，别让它散进日志文件里。

关于 HTML：本文件一度只发纯文本，理由是正文里拼着昵称和文件名，
换成 HTML 就得自己转义，少转一处就是一个注入口子。
取件提醒打破了这条规矩，因为**它必须带一张图**（收款码），
而截图没办法用纯文本表达。规矩改为两条更严的：
  ① 纯文本部分照旧存在（邮件客户端不支持 HTML 时看到的是它）；
  ② HTML 里插进去的每一个值都由发送方用 html.escape 转义（见 pickup.py），
     模板本身固定不变，不接受任何直接拼接的原文。
"""
import os
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr

from config import (MAIL_FROM, MAIL_FROM_NAME, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT,
                    SMTP_SECURITY, SMTP_TIMEOUT, SMTP_USER, logger)

from .recipients import mask_address


# 内嵌图片的扩展名 -> MIME 子类型。只收这几种：收款码是要给人扫的，
# 转成别的格式（或者收进来的是一张 PDF）都会让部分手机扫不出来。
_INLINE_SUBTYPES = {'png': 'png', 'jpg': 'jpeg', 'jpeg': 'jpeg'}


def is_configured():
    """发信需要的最小配置齐了没有：一台服务器 + 一个发件人地址。

    单独抽出来是为了让调用方能在启动时**一次性**说清「这个功能能不能用」，
    而不是等到第一封该发的邮件发不出去，才发现配置根本没填 ——
    那种失败发生在凌晨，谁也不会看到。

    密码刻意不在这里判：有些内网 SMTP 允许匿名发信，
    把「必须有密码」当成硬条件是替别人做决定。
    """
    return bool(SMTP_HOST and MAIL_FROM)


def _deliver(message):
    """真正把信交给 SMTP 服务器。异常原样往外抛，由 send_mail 统一处理。"""
    if SMTP_SECURITY == 'ssl':
        # 465：连上就是加密通道，QQ / 163 都是这种
        with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT,
                              context=ssl.create_default_context()) as server:
            if SMTP_USER:
                server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(message)
        return
    # 587（STARTTLS）和 none 都是先连明文，区别只在于要不要升级成加密
    with smtplib.SMTP(SMTP_HOST, SMTP_PORT, timeout=SMTP_TIMEOUT) as server:
        if SMTP_SECURITY == 'starttls':
            server.starttls(context=ssl.create_default_context())
        if SMTP_USER:
            server.login(SMTP_USER, SMTP_PASSWORD)
        server.send_message(message)


def _read_inline_image(path):
    """读一张要内嵌进邮件的图，返回 (字节, MIME 子类型)；拿不到就返回 (None, None)。

    读不到不抛异常、也不阻止发信：图是加分项，单号才是这封信的正事。
    宁可发一封没有图的信，也不能因为某个人没传收款码就让别人收不到单号。

    日志里不写路径（只写文件名后缀），和全仓「不把完整文件路径写进日志」一致。
    """
    extension = os.path.splitext(path or '')[1].lower().lstrip('.')
    subtype = _INLINE_SUBTYPES.get(extension)
    if not subtype:
        logger.warning('邮件配图：扩展名 %s 不在内嵌白名单里，本封邮件不带此图', extension or '（空）')
        return None, None
    try:
        with open(path, 'rb') as handle:
            data = handle.read()
    except OSError as exc:
        # 只记异常类型，不记路径：路径里有用户名和目录结构。
        # 一张图读不到的原因基本就那几种（文件被删、权限、磁盘），异常类型够定位。
        logger.warning('邮件配图读取失败（%s），本封邮件不带此图', exc.__class__.__name__)
        return None, None
    if not data:
        logger.warning('邮件配图是个空文件，本封邮件不带此图')
        return None, None
    return data, subtype


def _safe_reason(exc, recipients):
    """把异常原因压成能进日志的样子：**收件地址一律换掉**。

    smtplib 的 `SMTPRecipientsRefused` 的 `str()` 就是 `{'a@b.com': (550, b'...')}`
    这种字典 —— 直接写日志等于把上面那层 mask_address 白做了。
    """
    text = str(exc or '')
    for address in recipients or ():
        address = (address or '').strip()
        if address:
            text = text.replace(address, mask_address(address))
    return text[:200]


def send_mail(subject, body, recipients, html=None, inline_images=None, label='邮件'):
    """发一封信，成功返回 True。

    body 是纯文本正文，永远是这封信的主体部分；html 非空时作为
    「更丰富的那一版」附在后面，客户端自己选一个显示 —— 不支持 HTML 的
    客户端看到的就是 body。inline_images 是 [(cid, 图片路径)]，
    对应 html 里那些 src="cid:..."。

    label 只用于日志（「未接单提醒发送失败」这样），不参与任何判断：
    日志里得能分出是哪一种提醒出了问题。

    本函数读的是**本模块**的 SMTP_* 常量。测试里要临时把服务器指到别处，
    得改 sender.SMTP_HOST —— 改 mail.SMTP_HOST 没有用，也不报错。
    """
    recipients = [address for address in (recipients or []) if address]
    if not recipients:
        logger.error('%s：没有解析出任何可用的收件地址，本次不发信。'
                     '请检查 .env 的 ALERT_MAIL_TO，或确认相关账号填了 QQ 号 / 邮箱', label)
        return False
    if not is_configured():
        logger.error('%s：SMTP 未配置完整（需要 SMTP_HOST，以及 SMTP_USER 或 MAIL_FROM），本次不发信', label)
        return False

    message = EmailMessage()
    message['Subject'] = subject
    message['From'] = formataddr((MAIL_FROM_NAME, MAIL_FROM))
    message['To'] = ', '.join(recipients)
    message.set_content(body)

    if html:
        message.add_alternative(html, subtype='html')
        # 图片必须挂在 HTML 那一段上（add_related 只影响当前那一段），
        # 挂到外层的话纯文本版本也会被当成带附图的多部分邮件。
        html_part = message.get_payload()[-1]
        for cid, path in (inline_images or []):
            data, subtype = _read_inline_image(path)
            if data is None:
                continue
            # cid 传带尖括号的写法，正文里则写 src="cid:名字"（不带尖括号）——
            # 这两处格式不一样，写反了就是一张破图，而且不报错。
            html_part.add_related(data, maintype='image', subtype=subtype, cid='<%s>' % cid)

    try:
        _deliver(message)
    except (smtplib.SMTPException, OSError, ssl.SSLError) as exc:
        # 地址打码、正文和主题一概不写进日志：主题里有订单号和昵称，
        # 正文里还有文件名。要排查内容就对着一封真邮件看，别让它散进日志文件。
        #    ⚠️ 异常本身**不能直接写**：smtplib 的 SMTPRecipientsRefused 的 str 里
        #    带着**完整收件地址**（字典形式），一写就把上面那层打码绕过去了
        #    （邮件审计抓到的）。只留异常类型与一句脱敏后的原因。
        logger.error('%s发送失败：smtp=%s:%s 收件人=%s 错误=%s: %s',
                     label, SMTP_HOST, SMTP_PORT, [mask_address(a) for a in recipients],
                     type(exc).__name__, _safe_reason(exc, recipients))
        return False
    logger.info('%s已发出：smtp=%s:%s 收件人=%s',
                label, SMTP_HOST, SMTP_PORT, [mask_address(a) for a in recipients])
    return True
