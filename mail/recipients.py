"""recipients.py —— 「这封信该寄给谁」。

这段规则和 SMTP 没有一点关系，所以它不放在 sender 里：哪天要换成企业微信或者
钉钉推送，该留下来的恰恰是这套规则，而不是 smtplib 那几行。

一条自我约束：本文件写进日志的邮箱地址一律打码。
邮箱是个人信息，而日志恰恰是最容易被整包拷走、发给别人排错的东西 ——
和密码、完整文件路径是同一个道理，没有理由对它例外。
"""
from config import (ALERT_MAIL_TO, EMAIL_RE, QQ_MAIL_SUFFIX, QQ_RE, ROLE_ADMIN, ROLE_SUPER,
                    STATUS_ACTIVE, logger)


# 推不出收件地址的原因。一律用短标识而不是中文句子：
# 调用方要按它分流（记不同的日志、给订单页挂不同的标记），
# 用中文句子的话，改一个标点就会让那个分支静默失效 —— 而且不报错。
NO_MAILBOX_EMPTY = 'no_contact'      # 压根没填联系方式
NO_MAILBOX_WECHAT = 'wechat'         # 填的是微信号：微信收不到邮件，这条路走不通
NO_MAILBOX_INVALID = 'invalid'       # 填了，但拼不出一个像样的地址


def mask_address(address):
    """把邮箱地址打成日志能写的样子：ab***@qq.com。

    保留前两位是为了在排查时能认出「是不是同一个人的地址」，
    而剩下的部分足够让人名、学号之类的东西不出现在日志里。
    """
    address = (address or '').strip()
    if '@' not in address:
        return '***'
    local, _, domain = address.partition('@')
    return '%s***@%s' % (local[:2], domain)


def qq_mailbox(contact):
    """QQ 号 -> QQ 邮箱；不是合法的 QQ 号就返回 None。

    这里用 QQ_RE 再判一次形状，而不是只检查「是不是数字」。
    库里存的值本来已经过过注册校验，但这是一条**推导**出来的地址：
    推错了不会在本站报错，只会被对方的 SMTP 服务商退信，
    而退信在日志里就是一句 550，看起来和「对方拒收」没有区别 ——
    为省一次正则，换来一个要查半天的假象，不划算。
    """
    contact = (contact or '').strip()
    if not QQ_RE.match(contact):
        return None
    return contact + QQ_MAIL_SUFFIX


def contact_mailbox(contact_type, contact):
    """一个账号自己的收件地址：返回 (邮箱, 推不出来的原因)。

    成功时第二个值是一空串；失败时第一个值是 None。两个都返回，
    是因为「为什么发不了」这件事调用方必须分得清：
    没填联系方式要催用户补，填了微信号是**根本没法发**（该转人工通知），
    而填错了是用户自己填错 —— 三种情况在管理端的处理方式完全不同，
    只返回一个 None 的话，界面只能笼统地说「无法通知」。

    微信号推不出邮箱：微信不从邮件系统收信，这不是「暂时没有实现」，
    而是这条路本来就不通。所以这里不猜「微信号 + @qq.com」之类的东西 ——
    猜出来的地址会真的发出去，然后被对方服务商退信，
    而我们只会看到一句 550，跟「对方拒收」长得一模一样。
    """
    contact_type = (contact_type or '').strip()
    contact = (contact or '').strip()
    if not contact_type or not contact:
        return None, NO_MAILBOX_EMPTY
    if contact_type == 'qq':
        mailbox = qq_mailbox(contact)
        return (mailbox, '') if mailbox else (None, NO_MAILBOX_INVALID)
    if contact_type == 'email':
        # 同样再判一次形状。库里这个值过过注册校验，但地址是一条**推导**出来的东西，
        # 和 qq_mailbox 里那段是同一个理由：推错了只会被退信，不会在本站报错。
        return (contact, '') if EMAIL_RE.match(contact) else (None, NO_MAILBOX_INVALID)
    if contact_type == 'wechat':
        return None, NO_MAILBOX_WECHAT
    # 理论上到不了这里（CONTACT_TYPES 就那三种），但库里的值可能来自
    # 更早的版本或人工改库。当成「推不出来」而不是抛异常：
    # 这是一个通知功能，为了一个脏字段把整条提醒线程搞挂不划算。
    return None, NO_MAILBOX_INVALID


def user_mailbox(row):
    """把一行 users 记录翻成收件地址，返回值和 contact_mailbox 一样。

    存在的意义是让调用方不必记住「联系方式在这两个列里」——
    列名散落在各个调用点，改名时总会漏掉一处，而漏掉的地方不报错。
    """
    if row is None:
        return None, NO_MAILBOX_EMPTY
    # Row 工厂出来的对象用下标取，sqlite3.Row 没有 get()
    try:
        contact_type = row['contact_type']
    except (IndexError, KeyError):
        contact_type = None
    try:
        contact = row['contact']
    except (IndexError, KeyError):
        contact = None
    return contact_mailbox(contact_type, contact)


def admin_mailboxes(conn):
    """把「启用中的管理员」翻译成邮箱地址列表。

    规则只有两条：
      - 联系方式填的是邮箱 -> 直接用；
      - 联系方式填的是 QQ 号 -> 拼一个 QQ 邮箱出来。

    填微信的、以及压根没填联系方式的账号推不出地址，会被安静地跳过：
    前者本来就没有邮箱可用，后者（内置管理账号就是这样）靠 .env 里的
    ALERT_MAIL_TO 补上 —— 那不是「漏了」，是这个功能的已知边界。

    停用和已注销的账号不参与。通知的目的是「让现在能干活的人知道」，
    给一个已经登不进来的账号发信，只会让收件人列表里挂着一串死地址，
    而真出事的时候没人会去分辨哪几个是死的。
    """
    rows = conn.execute('''
        SELECT nickname, contact_type, contact FROM users
        WHERE role IN (?, ?) AND status = ?
        ORDER BY id
    ''', (ROLE_ADMIN, ROLE_SUPER, STATUS_ACTIVE)).fetchall()
    addresses = []
    for row in rows:
        # 复用 user_mailbox，而不是在这里再写一遍 if 联系方式的判断：
        # 这两处只要各写一套，早晚会出现「管理员汇总信发得出去、
        # 学生提醒信说发不了」这种同一件事两个结论的矛盾。
        mailbox, _ = user_mailbox(row)
        if mailbox:
            addresses.append(mailbox)
    return addresses


def alert_recipients(conn):
    """这封信该发给哪些地址：.env 里配的 + 从管理员联系方式推出来的，去重后返回。

    顺序是「先配置、后推导」：配置里那个通常就是业主本人，
    让他排在收件人列表第一位，真出问题时第一眼看到的就是他。
    去重按小写比较 —— QQ 邮箱地址不区分大小写，而人填的时候是会变的。

    注意这里读的是**本模块**的 ALERT_MAIL_TO（from config import 进来的那个名字）。
    测试里要临时换掉它，得改 recipients.ALERT_MAIL_TO ——
    改包对象上的 mail.ALERT_MAIL_TO 不会影响这里，而且不报错。
    """
    addresses = []
    seen = set()

    def add(address):
        address = (address or '').strip()
        # 只做「像不像一个地址」的粗筛，不当校验器：
        # 地址对不对最终由对方的 SMTP 服务商说了算，在这里写一套正则
        # 只会把一些合法但不常见的地址误伤掉。
        if not address or '@' not in address:
            return
        key = address.lower()
        if key in seen:
            return
        seen.add(key)
        addresses.append(address)

    for address in ALERT_MAIL_TO:
        add(address)
    for address in admin_mailboxes(conn):
        add(address)
    return addresses
