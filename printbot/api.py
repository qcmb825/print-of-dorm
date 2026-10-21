"""printbot → 打印服务器的 HTTP 客户端。

只用标准库 urllib：国内那台机器不值得为它装 requests ——
依赖越少，「那台机器随时可能不在」（大纲第 10 节的原话）时恢复得越快。

重试口径（想清楚了再改）：
  - **只读接口**（ping / orders / code / presets / events）连接层失败
    重试一次。跨太平洋链路上丢包是常态不是异常；
  - **会建单的 POST**（order_preset / order_file）**绝不自动重试**：
    第一次请求可能已经到了服务器、单已经建成了，只是响应没回来 ——
    重试一次就是重复下单。宁可把失败报给学生让他重发，
    也不替他做「可能多收一次钱」的决定。
  - **HTTP 层失败**（4xx/5xx）一律不重试：服务器明确回了话，
    再问一遍得到的还是同一句。
"""

import json
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid

from . import config


class ApiError(RuntimeError):
    """连接层失败（重试后仍不通）。与「服务器给了明确回答」区分开。"""


def _send(req, timeout):
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except urllib.error.HTTPError as exc:
        # HTTP 层有回答：响应体里就是那套统一信封，照常返回给调用方看 code。
        try:
            return json.loads(exc.read().decode('utf-8'))
        except (ValueError, UnicodeDecodeError):
            return {'code': exc.code, 'msg': '服务器返回了非 JSON 的错误'}
    # 连接层异常由调用方（_request / _request_multipart）处理


def _request(method, path, payload=None, timeout=30, retries=1):
    """JSON 请求，返回服务器统一信封 {'code': .., 'msg': ..}。"""
    url = config.API_BASE + path
    data = json.dumps(payload).encode('utf-8') if payload is not None else None
    headers = {
        'Authorization': 'Bearer ' + config.BOT_TOKEN,
        'Content-Type': 'application/json',
    }
    last_exc = None
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, data=data, headers=headers, method=method)
            return _send(req, timeout)
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last_exc = exc
            if attempt < retries:
                time.sleep(2 * (attempt + 1))
    raise ApiError('服务器暂时不可达（%s）' % last_exc)


def _request_bytes(path, timeout=60, retries=1):
    """取二进制（数据卡 PNG）。只读，按既有口径连接层失败重试一次。

    服务器返回 JSON（比如没字体时的 501）时返回 None —— 那是「这次没图」，
    不是错误：调用方会退回纯文本，用户不该因此少看到任何内容。
    """
    url = config.API_BASE + path
    headers = {'Authorization': 'Bearer ' + config.BOT_TOKEN}
    last_exc = None
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers=headers, method='GET')
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                body = resp.read()
            # 用文件头判断，而不是看 Content-Type：中间层改错头的情况见过
            if body[:8] == b'\x89PNG\r\n\x1a\n':
                return body
            return None
        except urllib.error.HTTPError:
            # 4xx/5xx 都是明确回答（501 = 没字体、404 = 服务器还没这接口）
            return None
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            last_exc = exc
            if attempt < retries:
                time.sleep(2 * (attempt + 1))
    raise ApiError('服务器暂时不可达（%s）' % last_exc)


def _safe_filename(name):
    """把文件名洗成**不会破坏 multipart 表单**的形状。

    表单里的 filename 是用双引号包起来的，所以名字里出现 `"`、`\r`、`\n` 或
    控制字符时，那一行会提前结束 / 分裂成两行 —— 轻则服务器收到的文件名被截断，
    重则整个请求体解析失败（学生看到「上传失败」，而他什么都没做错）。
    QQ 里的文件名是对方给的，`a"b.pdf` 这种完全可能出现。

    只做最小转义：引号换成单引号、去掉换行与控制字符（含 DEL）。
    **不做路径净化、不改扩展名** —— 那是服务端校验的事；客户端偷偷改名会让
    盘上的文件名和学生发的那个对不上，反而更难排查。
    """
    text = str(name or '')
    text = text.replace('"', "'").replace('\r', '').replace('\n', '')
    text = ''.join(ch for ch in text if ord(ch) >= 32 and ord(ch) != 127)
    return text or 'file'


def _request_multipart(path, fields, file_field, file_name, file_bytes,
                       timeout=180):
    """multipart 文件上传（手工拼 body，标准库没有现成的）。

    文件名原样用 UTF-8 放进 Content-Disposition：服务器端（werkzeug）
    按同一套编码解，中文文件名到库里的还是原文。
    不做连接层重试 —— 见模块注释「会建单的 POST 绝不自动重试」。
    """
    boundary = uuid.uuid4().hex
    lines = []
    for name, value in fields.items():
        lines.append('--%s\r\nContent-Disposition: form-data; name="%s"\r\n\r\n%s\r\n'
                     % (boundary, name, value))
    lines.append('--%s\r\nContent-Disposition: form-data; name="%s"; filename="%s"\r\n'
                 'Content-Type: application/octet-stream\r\n\r\n'
                 % (boundary, file_field, _safe_filename(file_name)))
    body = ''.join(lines).encode('utf-8') + file_bytes + \
        ('\r\n--%s--\r\n' % boundary).encode('ascii')
    req = urllib.request.Request(
        config.API_BASE + path, data=body, method='POST',
        headers={
            'Authorization': 'Bearer ' + config.BOT_TOKEN,
            'Content-Type': 'multipart/form-data; boundary=%s' % boundary,
        })
    try:
        return _send(req, timeout)
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        raise ApiError('上传失败（%s）。单子可能没有建成 —— 请重新发一次文件' % exc) from exc


def ping():
    """启动自检：服务器地址、令牌、网络通不通，一句话就知道。"""
    return _request('GET', '/api/bot/ping')


def orders(qq):
    """这个 QQ 的最近订单（含状态与单号）。"""
    return _request('GET', '/api/bot/orders?%s' % urllib.parse.urlencode({'qq': qq}))


def order(qq, handle):
    """按**单号**查一张单（状态 + 单号）。

    2026-09-21 起用户面前只有一个标识：单号（5 位数字，首位非 0；老单可能还是 4 位）。
    内部自增 ID 不再出库，查询与撤回都拿它来。
    """
    return _request('GET', '/api/bot/order?%s' % urllib.parse.urlencode(
        {'qq': qq, 'handle': handle}))


def presets():
    """当前可用的预设打印服务清单。"""
    return _request('GET', '/api/bot/presets')


def print_options():
    """下单用的两份清单：预设服务 + 纸张类型（对应网页端下单页的那两份下拉）。"""
    return _request('GET', '/api/bot/print-options')


def price_table():
    """当前价目表 + 说明文字（「价目表」命令用）。与网页端同一个接口。"""
    return _request('GET', '/api/bot/price-table')


def announcement():
    """当前生效的公告（可能是 null）。"""
    return _request('GET', '/api/bot/announcement')


def me(qq):
    """个人汇总：订单分档计数 + 累计花费 + 在盘用量。"""
    return _request('GET', '/api/bot/me?%s' % urllib.parse.urlencode({'qq': qq}))


def card(kind, qq=None):
    """取一张数据卡（PNG 字节）；取不到返回 None，调用方退回纯文本。

    三种「取不到」都不算错误（详见 _request_bytes）：
    服务器没装中文字体（501）、接口还没上线（404）、网络不通。
    任何一种都只是「这次没图」，用户该看到的文字一个字都不能少。
    """
    query = {'kind': kind}
    if qq is not None:
        query['qq'] = qq
    return _request_bytes('/api/bot/card?%s' % urllib.parse.urlencode(query))


def prefs(qq):
    """读用户偏好（「设置」命令用）。"""
    return _request('GET', '/api/bot/prefs?%s' % urllib.parse.urlencode({'qq': qq}))


def save_prefs(qq, fields):
    """改用户偏好。字段白名单在服务端（prefs.EDITABLE），这里原样透传。"""
    return _request('PUT', '/api/bot/prefs', {'qq': qq, 'prefs': fields})


def help_sections():
    """使用说明的结构（**服务端是唯一来源**，见 routes/bot.py 的 BOT_HELP_SECTIONS）。

    机器人拿它拼正文、服务端拿它画卡片 —— 本地不再存一份文案：
    两份必然漂移，而且改了一边不会报错，只是话术悄悄对不上。
    """
    return _request('GET', '/api/bot/help')


def withdraw_order(qq, handle):
    """按单号撤回自己未接单的订单。**不重试**：删除类操作，重试没有意义还有风险。"""
    return _request('POST', '/api/bot/order/withdraw',
                    {'qq': qq, 'handle': handle}, retries=0)


def order_preset(qq, preset_id, duplex='single', copies=1,
                 price_item_id=None, remark=None):
    """用预设下单。不重试（见模块注释）。

    打印参数与文件下单同一套：网页端用预设下单时也能选单双面/份数/价目项，
    bot 这边的追问流程问的就是这几个，所以一并带上（空值不传，同 order_file）。
    """
    payload = {'qq': qq, 'preset_id': preset_id,
               'duplex': duplex, 'copies': copies}
    if price_item_id:
        payload['price_item_id'] = price_item_id
    if remark:
        payload['remark'] = remark
    return _request('POST', '/api/bot/order/preset', payload, retries=0)


def ticket_create(qq, subject, body):
    """发起工单（问题反馈）。不重试：建单类操作重试会多一条。"""
    return _request('POST', '/api/bot/ticket',
                    {'qq': qq, 'subject': subject, 'body': body}, retries=0)


def tickets(qq):
    """我的工单列表（含最新一条回复，看列表即已读，与网页端点开详情同口径）。"""
    return _request('GET', '/api/bot/tickets?%s' % urllib.parse.urlencode({'qq': qq}))


def ticket_reply(qq, ticket_id, body):
    """回复自己的工单。不重试：重复发一条消息比丢一条更烦人。"""
    return _request('POST', '/api/bot/ticket/reply',
                    {'qq': qq, 'ticket_id': ticket_id, 'body': body}, retries=0)


def order_file(qq, file_name, file_bytes, duplex='single',
               copies=1, price_item_id=None, remark=None):
    """把 QQ 里收到的文件传给服务器建单。不重试（见模块注释）。

    打印参数随表单一起传（服务端 /api/bot/order/file 与网页上传同一套校验）：
    duplex / copies 必带，价目项与学生备注选填 —— 空值的字段**不 append**，
    让「没填」和「填了个空串」在服务端是同一种输入形状（与网页端 orderApi.upload 同规矩）。
    ⚠️ v20 起**没有 color 了**：颜色由价目项本身决定（「A4 70g · 黑白」这一条就是黑白）。
    """
    fields = {'qq': qq, 'duplex': duplex, 'copies': str(copies)}
    if price_item_id:
        fields['price_item_id'] = str(price_item_id)
    if remark:
        fields['remark'] = remark
    return _request_multipart('/api/bot/order/file',
                              fields=fields,
                              file_field='file',
                              file_name=file_name,
                              file_bytes=file_bytes)


def upload_prepare(qq, file_name, file_bytes):
    """**批量下单的第一步**：把一份文件先传上来（不下单），换一个 file_token。

    批量不能像单文件那样一次请求塞几份：服务端的 MAX_CONTENT_LENGTH 卡的是
    **整个请求体**（默认 50MB），三份 20MB 的讲义合在一个请求里当场 413 ——
    而用户没做错任何事。所以走「一份一个请求 → 最后按组一次性建单」这条路，
    与网页端的「先上传、后下单」共用服务端同一套逻辑（.pending 那一套）。

    不重试：它虽然不是建单，但同一份文件重复传会白占服务端的暂存额度
    （每账号最多几份），失败时让学生重发一遍更干净。
    """
    return _request_multipart('/api/bot/upload/prepare',
                              fields={'qq': qq},
                              file_field='file',
                              file_name=file_name,
                              file_bytes=file_bytes)


def order_prepared(qq, groups):
    """**批量下单的第二步**：用已经传上来的文件建单，一个 group = 一张订单。

    groups 里每一项：{'files': [{'file_token','filename'}, …],
    'price_item_id', 'copies', 'duplex', 'remark'}。
    组内几份文件同参数、合成一张单；参数不一样的由**调用方**分成多组
    （机器人那边按「档位 + 单双面 + 份数」分，学生看到的就是「同类型的合并」）。

    不重试（见模块注释）：响应丢了不等于没建成，重发一次就是重复下单。
    """
    return _request('POST', '/api/bot/order/prepared',
                    {'qq': qq, 'groups': groups}, retries=0)


def discard_prepared(qq, tokens):
    """丢弃几份还没下单的预上传文件（批量中途失败时把已传的收回来）。

    语义上是删除，**不重试**：丢不掉只是白占一份额度，重试没有收益，
    而多一次请求就多一次跨洋往返 —— 这条路径本来就是在处理失败。
    """
    return _request('POST', '/api/bot/upload/discard',
                    {'qq': qq, 'file_tokens': list(tokens or [])}, retries=0)


def events(since):
    """拉「该通知谁」：自 since 以来变成可取件、现在还停在那儿的订单。"""
    return _request('GET', '/api/bot/events?%s' % urllib.parse.urlencode({'since': since}))
