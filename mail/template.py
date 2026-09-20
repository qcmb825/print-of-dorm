"""template.py —— 信里写什么。

纯粹的字符串拼装，不碰 SMTP、不碰数据库，所以这是整个包里最好测的一块。

**正文是纯文本，不做 HTML 版本，也不打算做。** 正文里会拼进学生的昵称和文件名，
做成 HTML 就得自己转义，而少转一处就是一个注入口子 —— 那是存储型 XSS 的同类问题，
只是投放到了别人的邮箱里。这个提醒也不需要排版，一封信说清「哪几笔、躺了多久」
就够了。

（同包的 pickup.py 发了 HTML 版，那是因为取件提醒必须带一张收款码图片，
纯文本表达不了 —— 它是唯一的例外，不是这里的规矩松了。）

两个长度上限（_FILENAME_MAX / _PRESET_MAX）不是洁癖：上传接口允许的极端文件名
能到几 MB，原样拼进正文能让收信人的邮件客户端直接卡死 ——
而这是发信人完全看不到、只有收信人才能发现的故障。
"""
from config import CLAIM_ALERT_MAX_ITEMS, CLAIM_ALERT_MINUTES

_FILENAME_MAX = 60
_PRESET_MAX = 40


def _describe(row):
    """把一个订单写成正文里的一段。**绝不出现 file_path** ——
    「详情接口只给 file_exists 不给路径」那条规矩对邮件同样适用：
    服务器上的绝对路径没有任何理由离开服务器。"""
    what = (row['filename'] or '（无文件名）').strip()
    if len(what) > _FILENAME_MAX:
        what = what[:_FILENAME_MAX] + '…'
    parts = ['%s 份' % (row['copies'] or 1), row['color_type'] or '', row['duplex'] or '']
    options = ' · '.join(part for part in parts if part)
    lines = ['订单 #%s%s' % (row['id'], '（单号 %s）' % row['pickup_code'] if row['pickup_code'] else '')]
    lines.append('  内容：%s（%s）' % (what, options))
    preset = (row['preset_content'] or '').strip()
    if preset:
        if len(preset) > _PRESET_MAX:
            preset = preset[:_PRESET_MAX] + '…'
        lines.append('  要求：%s' % preset)
    if row['paper_name']:
        lines.append('  纸张：%s' % row['paper_name'])
    lines.append('  下单：%s%s' % (row['create_local'] or '(未知)',
                                '（%s）' % row['owner'] if row['owner'] else ''))
    return '\n'.join(lines)


def compose_subject(total):
    """主题。笔数写进主题是为了让管理员在收件箱列表里不用点开，就知道要不要立刻处理。"""
    return '[打印服务] %d 笔订单超过 %d 分钟无人接单' % (total, CLAIM_ALERT_MINUTES)


def compose_body(rows, total):
    """拼一封信。多笔单合成一封，而不是一单一封。

    理由很实际：一次涌进来五笔单就炸五封信的话，收信人用不了两天就会
    把这个发件人加进过滤规则 —— 而提醒一旦被当噪音忽略，真正着急的那封
    也就一起看不到了。合并之后一封说清「哪几笔、躺了多久」，看完能直接干活。
    """
    head = [
        '打印服务未接单提醒',
        '',
        '以下 %d 笔订单下单已超过 %d 分钟，仍未被任何管理员接单：' % (total, CLAIM_ALERT_MINUTES),
        '',
    ]
    # CLAIM_ALERT_MAX_ITEMS 在这里现读，不在模块级抓一份：
    # 它是给人调的（一封信列几笔），现读才改得动。
    shown = rows[:CLAIM_ALERT_MAX_ITEMS]
    body = '\n\n'.join(_describe(row) for row in shown)
    tail = ['', '']
    if total > len(shown):
        tail.append('另有 %d 笔未在此列出，请到管理端「订单台」查看。' % (total - len(shown)))
    tail.append('处理入口：管理端 -> 订单台。接单后本条提醒即结束（同一笔单只会提醒一次）。')
    tail.append('')
    tail.append('（本邮件由系统自动发出，请勿直接回复。）')
    return '\n'.join(head) + body + '\n'.join(tail)
