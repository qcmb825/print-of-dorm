"""recipients.py —— 「这封信该寄给谁」。

这段规则和 SMTP 没有一点关系，所以它不放在 sender 里：哪天要换成企业微信或者
钉钉推送，该留下来的恰恰是这套规则，而不是 smtplib 那几行。

一条自我约束：本文件写进日志的邮箱地址一律打码。
邮箱是个人信息，而日志恰恰是最容易被整包拷走、发给别人排错的东西 ——
和密码、完整文件路径是同一个道理，没有理由对它例外。
"""
from config import (ALERT_MAIL_TO, QQ_MAIL_SUFFIX, QQ_RE, ROLE_ADMIN, ROLE_SUPER,
                    STATUS_ACTIVE, logger)


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
        if row['contact_type'] == 'email':
            if row['contact']:
                addresses.append(row['contact'].strip())
        elif row['contact_type'] == 'qq':
            mailbox = qq_mailbox(row['contact'])
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
