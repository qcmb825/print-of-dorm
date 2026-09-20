"""pickup.py —— 「订单可取件了」这一路提醒，信里写什么。

和 template.py 并列，不是塞进去：那一封是**催管理员**的（没人接单），
这一封是**通知学生**的（可以来取了）。两封信的收件人、语气、要不要配图
完全不同，挤在一个文件里改哪一封都得先读完另一封。

这里其实是两种信：

  ① 主角给下单学生：「你的单子打好了，单号 XXXX，来 2 号北 201 拿」，
     带金额和**接单人那张**微信收款码 —— 谁接的单钱就归谁，所以图不是全站共用的。
  ② 兜底给接单管理员：「这几笔单的学生填的是微信号，系统发不出邮件，你去说一声」。

②只发给接单人、不发全体管理员，是刻意的：单子是他接的、钱是他收的、
人也是他去联系，别的管理员收到只会多问一句「这跟我有关系吗」。
一封人人都收到、又只有一个人需要动手的提醒，用不了多久就会被整体忽略 ——
连同真正该看的那封一起。

关于 HTML：本包原本只发纯文本（理由见 template.py），这一路破了例，
因为收款码是一张**图**，纯文本表达不了。代价是正文里插进去的每个值
都必须过 html.escape —— 学生昵称、文件名、备注都是用户自己填的，
少转一处就等于允许他往别人的收件箱里写标签。所以本文件里
没有任何一处直接把值拼进 HTML，全部经过 _e()。
"""
import html

from config import CLAIM_ALERT_MAX_ITEMS, COLOR_TYPE_LABELS, DUPLEX_LABELS, PICKUP_ADDRESS

# 和 template.py 同一套上限，理由也一样：上传接口允许的极端文件名能到几 MB，
# 原样拼进正文能让收信人的邮件客户端直接卡死 —— 这是发信人完全看不到、
# 只有收信人才能发现的故障。两处上限各写一份而不是互相 import 私有名，
# 因为这两个数字会各自调整（这个提醒里文件名更该被压缩，正文还得给收款码留位置）。
_FILENAME_MAX = 60
_PRESET_MAX = 40

# 内嵌收款码的 Content-ID。固定一个名字就够：一封邮件只带一张码。
PAY_QR_CID = 'payqr'


def _e(value):
    """HTML 转义。本文件里**所有**要进 HTML 的值都从这儿过。"""
    return html.escape(str(value if value is not None else ''), quote=True)


def _shorten(text, limit):
    text = (text or '').strip()
    if len(text) > limit:
        text = text[:limit] + '…'
    return text


def _price_text(value):
    """金额。库里存的是「元」，两位小数。

    读的是 value 而不是把它当 truthy 用：0 元（免费单）是合法金额，
    `if not value` 会把 0 元说成「未计费」，而这两件事在对账时意义完全相反。
    """
    if value is None:
        return '未计费'
    try:
        return '¥%.2f' % float(value)
    except (TypeError, ValueError):
        return '未计费'


def _spec_text(order):
    """规格那一行：份数 · 颜色 · 单双面。

    颜色和单双面在库里是英文枚举，直接拼就是把 black / single 塞进一封中文邮件。
    份数用 `is None` 而不是 `or 1`：本次升级前的老订单没有回填份数，
    说成「1 份」是替它们编了一个没人记得的数字（跟前端 copiesLabel() 同一个口径）。
    """
    copies = order['copies']
    parts = [
        '未记录份数' if copies is None else '%s 份' % copies,
        COLOR_TYPE_LABELS.get(order['color_type'] or ''),
        DUPLEX_LABELS.get(order['duplex'] or ''),
    ]
    return ' · '.join(part for part in parts if part)


def compose_pickup_subject(order):
    """主题里必须带单号。

    这是整个功能的要点：学生在收件箱列表里不点开就能看到码，
    省掉「打开邮件 -> 找码 -> 回去输码」这一串动作。
    所以单号没有时不能退化成一句话了事 —— 那种情况本来就该在发信前被拦掉。
    """
    code = (order['pickup_code'] or '').strip()
    return '[打印服务] 订单 #%s 已可取件，单号 %s' % (order['id'], code or '（缺失）')


def compose_pickup_body(order):
    """纯文本正文。不支持 HTML 的客户端看到的就是这一份，
    所以它必须**独立完整** —— 只写「请查看 HTML 版本」等于这封信没发。"""
    lines = [
        '你好%s：' % ('，' + order['owner'] if order['owner'] else ''),
        '',
        '你在小猫娘打印服务提交的订单已经打印完成，可以来取了。',
        '',
        '单号：%s' % (order['pickup_code'] or '（缺失，请联系管理员）'),
        '取件地点：%s' % PICKUP_ADDRESS,
        '应付金额：%s' % _price_text(order['price']),
        '',
        '订单 #%s' % order['id'],
        '  内容：%s（%s）' % (_shorten(order['filename'] or '（无文件名）', _FILENAME_MAX),
                            _spec_text(order)),
    ]
    preset = _shorten(order['preset_content'], _PRESET_MAX)
    if preset:
        lines.append('  要求：%s' % preset)
    if order['paper_name']:
        lines.append('  纸张：%s' % order['paper_name'])
    lines += [
        '',
        '请到取件点用微信扫描下方收款码支付，然后凭单号取件。',
        '（本邮件由系统自动发出，请勿直接回复。）',
    ]
    return '\n'.join(lines)


def compose_pickup_html(order, has_qr=True):
    """HTML 正文。

    has_qr=False 时不渲染 <img>：宁可不显示图，也不要让收件人看到一张破图 ——
    破图会让人以为邮件坏了，而实际上只是接单人还没上传收款码。
    这种情况下正文里那句「扫描下方收款码」也得跟着去掉，
    不然说的是一张不存在的图，同样是假话。

    样式一律写成内联 style：邮件客户端对 <style> 块和 class 的支持
    各不相同（Gmail 会直接删掉 <style>），内联是唯一到处都认的写法。
    """
    safe = [_e(order['owner']), _e(order['id']), _e(order['pickup_code'] or '（缺失，请联系管理员）'),
            _e(PICKUP_ADDRESS), _e(_price_text(order['price'])),
            _e(_shorten(order['filename'] or '（无文件名）', _FILENAME_MAX)), _e(_spec_text(order))]
    owner, order_id, code, address, price, filename, spec = safe

    rows = [
        ('订单号', '#%s' % order_id),
        ('内容', filename),
        ('规格', spec),
    ]
    preset = _shorten(order['preset_content'], _PRESET_MAX)
    if preset:
        rows.append(('要求', _e(preset)))
    if order['paper_name']:
        rows.append(('纸张', _e(order['paper_name'])))

    detail_rows = ''.join(
        '<tr><td style="padding:2px 12px 2px 0;color:#888;white-space:nowrap">%s</td>'
        '<td style="padding:2px 0;word-break:break-all">%s</td></tr>' % (label, value)
        for label, value in rows
    )

    pay_line = ('<p style="margin:16px 0 6px">请用微信扫描下方收款码支付 <strong>%s</strong>：</p>'
                % price) if has_qr else ''
    qr_block = (
        '<img src="cid:%s" alt="微信收款码" '
        'style="width:220px;height:220px;border:1px solid #e5e5e5;border-radius:6px">'
        % PAY_QR_CID
    ) if has_qr else ''
    pay_hint = '' if has_qr else ('<p style="margin:16px 0 6px">应付金额 <strong>%s</strong>，'
                                 '请到取件点向管理员付款。</p>' % price)

    return (
        '<div style="font-family:-apple-system,\'Segoe UI\',\'Microsoft YaHei\',sans-serif;'
        'font-size:14px;line-height:1.7;color:#222;max-width:560px">'
        '<p style="margin:0 0 12px">你好%s：</p>'
        '<p style="margin:0 0 16px">你在小猫娘打印服务提交的订单已经打印完成，可以来取了。</p>'
        '<p style="margin:0 0 4px">单号</p>'
        '<p style="margin:0 0 16px;font-size:28px;font-weight:700;letter-spacing:4px">%s</p>'
        '<p style="margin:0 0 4px">取件地点</p>'
        '<p style="margin:0 0 16px;font-weight:600">%s</p>'
        '<table style="border-collapse:collapse;font-size:13px;color:#444">%s</table>'
        '%s%s'
        '<p style="margin:20px 0 0;color:#999;font-size:12px">'
        '（本邮件由系统自动发出，请勿直接回复。）</p>'
        '</div>'
    ) % (('，' + owner) if order['owner'] else '', code, address, detail_rows, pay_hint, pay_line + qr_block)


def compose_manual_subject(total):
    """发给接单管理员的主题：一眼看出「有几笔要我自己去联系」。"""
    return '[打印服务] %d 笔订单无法邮件通知学生，需手动联系' % total


def compose_manual_body(rows, total):
    """哪些单要手动联系、学生是谁、怎么联系 —— 一封信列全。

    **只给接单人看**，所以联系方式在这里是明文：他本来就要拿这个去联系人，
    而订单台上也看得到同一个值。这不是「把用户信息发出去」，
    是把它送到唯一需要它的那个人手上。

    学号不写：联系学生用微信号就够了，学号属于身份信息，
    多带一个字段就多一份泄露面，而这个字段在这件事上没有任何用处。
    """
    head = [
        '以下 %d 笔订单已经进入「可取件」，但系统没能给学生发邮件提醒，' % total,
        '请你手动联系他一下。',
        '',
    ]
    shown = rows[:CLAIM_ALERT_MAX_ITEMS]
    blocks = []
    for row in shown:
        contact = (row['owner_contact'] or '').strip()
        qq = (row.get('owner_qq') or '').strip()
        if qq:
            # QQ 是必填那一栏、也是取件提醒的正路。走到这封信里通常意味着
            # 「QQ 号填了但形状不对」—— 那更该把它原样摆出来：
            # 接单人照着这一行就能看出学生填错了，让他改完下次就收得到信了。
            how = 'QQ 号 %s' % qq
            if contact:
                how += '（另有%s %s）' % (row['owner_contact_label'] or '联系方式', contact)
        elif contact:
            how = '%s %s' % (row['owner_contact_label'] or '联系方式', contact)
        else:
            how = '未填写联系方式（订单台上也看不到，可能要在宿舍找他）'
        blocks.append('\n'.join([
            '订单 #%s（单号 %s）' % (row['id'], row['pickup_code'] or '（缺失）'),
            '  学生：%s' % (row['owner'] or '（账号已注销）'),
            '  联系：%s' % how,
            '  金额：%s' % _price_text(row['price']),
        ]))
    body = '\n\n'.join(blocks)
    tail = ['', '']
    if total > len(shown):
        tail.append('另有 %d 笔未在此列出，请到管理端「订单台」查看。' % (total - len(shown)))
    tail.append('处理入口：管理端 -> 订单台（这些订单在列表里带「需人工通知」标记）。')
    tail.append('')
    tail.append('（本邮件由系统自动发出，请勿直接回复。）')
    return '\n'.join(head) + body + '\n'.join(tail)
