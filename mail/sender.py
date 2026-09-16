"""sender.py —— 把信递给 SMTP 服务器。这是本系统唯一的出口。

它有一个刻意做出来的性质：**失败返回 False，绝不抛异常**。
理由和「订单留痕写失败只记 warning」一样 —— 通知是附加动作，
而调用它的是一条常驻的定时循环。异常逃出去会把线程带走，线程一死
往后所有提醒就都静默停了，可这件事不会有任何人发现（进程还在、接口还正常）。

另一条：写进日志的地址一律打码（recipients.mask_address）。
**主题和正文字段一概不写日志** —— 主题里有订单号和昵称，正文里有文件名。
要排查内容对不对，就对着一封真邮件看，别让它散进日志文件里。
"""
import smtplib
import ssl
from email.message import EmailMessage
from email.utils import formataddr

from config import (MAIL_FROM, MAIL_FROM_NAME, SMTP_HOST, SMTP_PASSWORD, SMTP_PORT,
                    SMTP_SECURITY, SMTP_TIMEOUT, SMTP_USER, logger)

from .recipients import mask_address


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


def send_mail(subject, body, recipients):
    """发一封纯文本邮件，成功返回 True。

    只发纯文本（原因见 template.py）：正文里拼着昵称和文件名，
    换成 HTML 就得自己转义，少转一处就是一个注入口子，而这个提醒不需要排版。

    本函数读的是**本模块**的 SMTP_* 常量。测试里要临时把服务器指到别处，
    得改 sender.SMTP_HOST —— 改 mail.SMTP_HOST 没有用，也不报错。
    """
    recipients = [address for address in (recipients or []) if address]
    if not recipients:
        logger.error('未接单提醒：没有解析出任何可用的收件地址，本次不发信。'
                     '请检查 .env 的 ALERT_MAIL_TO，或确认管理员账号填了 QQ 号 / 邮箱')
        return False
    if not is_configured():
        logger.error('未接单提醒：SMTP 未配置完整（需要 SMTP_HOST，以及 SMTP_USER 或 MAIL_FROM），本次不发信')
        return False

    message = EmailMessage()
    message['Subject'] = subject
    message['From'] = formataddr((MAIL_FROM_NAME, MAIL_FROM))
    message['To'] = ', '.join(recipients)
    message.set_content(body)

    try:
        _deliver(message)
    except (smtplib.SMTPException, OSError, ssl.SSLError) as exc:
        # 地址打码、正文和主题一概不写进日志：主题里有订单号和昵称，
        # 正文里还有文件名。要排查内容就对着一封真邮件看，别让它散进日志文件。
        logger.error('未接单提醒发送失败：smtp=%s:%s 收件人=%s 错误=%s',
                     SMTP_HOST, SMTP_PORT, [mask_address(a) for a in recipients], exc)
        return False
    logger.info('未接单提醒已发出：smtp=%s:%s 收件人=%s',
                SMTP_HOST, SMTP_PORT, [mask_address(a) for a in recipients])
    return True
