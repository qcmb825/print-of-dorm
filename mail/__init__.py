"""邮件相关的代码都收在这个包里。

拆成四个文件，是因为这里其实是四件互不相干的事：

    recipients.py  「这封信该寄给谁」—— 推导规则跟 SMTP 没有任何关系；
    sender.py      「怎么把信递出去」—— 传输细节跟收件人是谁没关系；
    template.py    「未接单提醒里写什么」—— 催管理员那一路；
    pickup.py      「可取件提醒里写什么」—— 通知学生那一路（带收款码图，要 HTML）。

挤在一个文件里当然也能跑。分开是为了能**一件一件地测**：收件人规则要造几个
假账号、正文格式只要两次字符串比较、传输要真的碰 SMTP —— 混在一起就只能一起测，
而「一起测」的实际后果是回归脚本必须往外发真邮件，于是干脆不测了。

两个 template 类模块分开而不是合并：它们唯一的共同点是「都是字符串拼装」，
而收件人、语气、要不要配图全不一样 —— 合在一起后，改催单那封信
得先读完给学生的信，反之亦然，而这种无关的阅读量就是改错的来源。

注：本包会 import 自己的子模块并再导出一遍（见下），这样调用方写
`from mail import send_mail` 一行就够，不用关心它具体住在哪个文件里。
但**改模块级常量时不能这么写** —— `mail.SMTP_HOST = xxx` 改的是包对象上的属性，
而 send_mail 读的是 sender 自己模块的全局变量，两边不是一回事。
这种「改了没反应」的写法不会报错，只会让人以为测过了（测试脚本里有专门一条注释）。

**命名风险，建这个目录之前确认过一次：** 本项目的导入是裸名、按 sys.path 顺序
找，项目根排在最前面，所以 `mail` 这个目录会遮住任何同名的第三方顶层模块。
建之前跑过 `importlib.util.find_spec('mail')` 是 None（标准库里只有 mailbox /
mailcap，不叫 mail）。将来装了同名的新依赖，报出来的会是**别人模块**的
ModuleNotFoundError，症状完全不像命名冲突，如果哪天有依赖莫名其妙找不到了，
回头看一眼这里。
"""
from . import pickup, recipients, sender, template
from .pickup import (PAY_QR_CID, compose_manual_body, compose_manual_subject,
                     compose_pickup_body, compose_pickup_html, compose_pickup_subject)
from .recipients import (NO_MAILBOX_EMPTY, NO_MAILBOX_INVALID, NO_MAILBOX_WECHAT,
                         alert_recipients, contact_mailbox, mask_address, qq_mailbox,
                         user_mailbox)
from .sender import is_configured, send_mail
from .template import compose_body, compose_subject

__all__ = (
    'pickup', 'recipients', 'sender', 'template',
    'PAY_QR_CID', 'compose_manual_body', 'compose_manual_subject',
    'compose_pickup_body', 'compose_pickup_html', 'compose_pickup_subject',
    'NO_MAILBOX_EMPTY', 'NO_MAILBOX_INVALID', 'NO_MAILBOX_WECHAT',
    'alert_recipients', 'contact_mailbox', 'mask_address', 'qq_mailbox', 'user_mailbox',
    'is_configured', 'send_mail',
    'compose_body', 'compose_subject',
)
