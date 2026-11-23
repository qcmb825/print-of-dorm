"""lottery.py —— 「你中奖了」这一路提醒，信里写什么。

与 template.py / pickup.py 并列而不是塞进去：那一封催管理员、那一封催学生取件，
这一封**报喜**。收件人、语气、发信时机完全不同，挤在一起改哪封都得读完另一封。

两个刻意的决定：

    ① **不走 prefs 的免打扰与渠道开关**（业主 2026-11 拍板）：中奖是一次性的
       事务通知，不是日常提醒 —— 把「该来领的奖品」静音掉，错过的不只是
       一封邮件，是奖品本身。收件地址照旧从 user_mailbox 推导，推不出来的
       老实记原因，不硬编一个地址。
    ② 纯文本、不带 HTML。取件信破例带 HTML 是为了嵌收款码图；这封信没有
       任何非图不可的内容，就不背那份「每个值都要过 _e()」的转义责任。

领取方式固定「到店报学号」：抽奖奖品不走站内核销（没有核销链路），柜台
认人靠的也是学号 —— 与取件是同一套动作，不发明第二种凭据。
"""
from db import get_pickup_info
from mail.recipients import user_mailbox
from mail.sender import send_mail


def compose_winner_subject(prize_name):
    """主题里带奖品名：收件箱里不用点开就知道中了什么。"""
    return '抽奖中奖 · %s' % (prize_name or '')


def compose_winner_body(user_row, prize_name):
    """正文。地点/时间有就写一行，没有就不写 —— 空着比编一个地点强。

    user_row 只取 student_id 一列进正文（收件人自己知道是谁，学号是柜台
    要核的那一项）。"""
    lines = [
        '你在本次抽奖中中奖：',
        '',
        '  奖品：%s × 1' % (prize_name or ''),
        '',
        '领取方式：到店报学号 %s 领取。' % ((user_row['student_id'] or '').strip() or '（见站内账号）'),
    ]
    pickup = get_pickup_info()
    if pickup['pickup_place']:
        place = '领取地点：%s' % pickup['pickup_place']
        if pickup['pickup_hours']:
            place += '（%s）' % pickup['pickup_hours']
        lines.append(place)
    lines += ['', '—— 猫娘打印服务']
    return '\n'.join(lines)


def send_winner_mail(user_row, prize_name):
    """给一个中奖者发信。成功 True；推不出地址/发送失败 False（原因由调用方记）。

    返回 (sent, reason)：reason 只在失败时有值 —— 'no_mailbox'（推不出地址）
    或 'smtp'（SMTP 配置缺失/发送失败）。日志里的地址打码由 sender 负责。
    """
    mailbox, _why = user_mailbox(user_row)
    if not mailbox:
        return False, 'no_mailbox'
    ok = send_mail(
        compose_winner_subject(prize_name),
        compose_winner_body(user_row, prize_name),
        [mailbox],
        label='中奖通知',
    )
    return (True, '') if ok else (False, 'smtp')
