"""printer.py —— 打印机客户端：把订单文件用网络协议直接塞进同内网的打印机。

为什么自己写 IPP、不用系统打印队列 / 不起外部命令：
    ① 注入防护是路线图里的硬要求，而最稳的注入防护是**根本没有那道口子**——
       全程只有 socket 和长度前缀的二进制协议，没有 shell、没有命令行、
       没有把任何用户可控字符串拼进可执行文本的机会。
    ② 部署机没有也不需要装驱动：IPP 是几乎所有网络打印机的通用语（AirPrint 的底座），
       stdlib 的 urllib + struct 就够说话。与 config.py 自写 .env 解析、raw sqlite3
       是同一个仓库口味：能不引入依赖就不引入。
    ③ 打印机返回 job-id，卡纸缺纸时对着面板上的作业号查，这是唯一的钥匙。

打印机是**数据库实体**（printers 表，管理员在「打印选项」页增删改），所以本模块
的每个函数都吃一个 `pr` 字典（{host, mode, port, ipp_path}，来自 printers 行），
不再读任何环境变量——网页上改完地址，下一次下发就以新值为准。

两个协议的分工（每台打印机在 printers.mode 里各选各的）：
    ipp     —— 首选。份数/单双面/彩黑/纸张都是协议属性，打印机明着答应或明着拒绝，
               没有中间态。
    raw9100 —— 老式端口兜底。往 9100 端口直塞「PJL 头 + PDF 字节」，多数网络激光
               打印机的直打通道都认 PDF；但参数只敢设单双面和份数（PJL），
               彩黑没有跨型号统一的开关，盲写要么被忽略、要么被记成错误，
               所以不设，让打印机按默认走。**它没有任务回报**：socket 发完即算成功，
               打印机不吐纸也不会有人知道 —— 所以型号支持 IPP 时别用这档。
               份数只写 PJL 的 QTY 不写 COPIES：有的型号认前者有的认后者，
               两个都写就有型号把份数乘起来 —— 宁可少写，不可翻倍。

参数映射的口径（与 config 的 PRINTER_MEDIA_* 对齐）：
    订单上的 duplex/color_type/paper_name 是人话（'double'/'black'/'A4 80g'），
    这里负责翻成打印机的话（sides/print-color-mode/media）。
    没配映射的纸型一律按 PRINTER_MEDIA_DEFAULT 发：映射缺了的后果只是打印机挑
    自己的默认纸 —— 可接受；为了「映射全」把下发卡住，不可接受。
"""
import socket
import struct
import urllib.error
import urllib.request

from config import (PRINTER_MEDIA_DEFAULT, PRINTER_MEDIA_MAP,
                    PRINTER_TIMEOUT, logger)


class DispatchError(Exception):
    """下发失败，且**重试也没用**：打印机明确拒绝了这份任务（路径不对、格式不收、参数不认）。"""


class TransientDispatchError(DispatchError):
    """下发失败，但多半是暂时的（连不上 / 超时 / 打印机正忙）—— 自动重试值得试。"""


def _endpoint(pr):
    """从打印机档案里取 (host, port, ipp_path)。端口留 0 = 按协议取公认端口。"""
    mode = pr['mode']
    port = pr['port'] or (631 if mode == 'ipp' else 9100)
    return pr['host'], port, pr['ipp_path']


# ---------------------------------------------------------------------------
# IPP/1.1 最小实现。只覆盖本仓库用到的两个操作（下发 / 查打印机能力）：
# 编解码按 RFC 8011 的线格式手写：integer/enum 定长 4 字节、字符串走长度前缀。
# ---------------------------------------------------------------------------

IPP_VERSION = b'\x01\x01'          # 1.1 —— 打印机都向后兼容 1.1，没有升级的必要
OP_PRINT_JOB = 0x0002
OP_GET_PRINTER_ATTRIBUTES = 0x000B

_TAG_OPERATION_GROUP = 0x01        # 分组分隔符：后面跟着的是操作属性
_TAG_JOB_GROUP = 0x02              # ……作业模板属性（份数/单双面这类）
_TAG_PRINTER_GROUP = 0x04          # ……打印机描述属性
_TAG_END = 0x03                    # 属性区结束，之后是文档字节

_TAG_INTEGER = 0x21
_TAG_BOOLEAN = 0x22                # 1 字节 0/1 —— printer-is-accepting-jobs 用它
_TAG_ENUM = 0x23
_TAG_KEYWORD = 0x44
_TAG_URI = 0x45
_TAG_CHARSET = 0x47
_TAG_LANGUAGE = 0x48
_TAG_NAME_WO_LANG = 0x42
_TAG_TEXT_WO_LANG = 0x41           # 与 0x42 同义；打印机报型号名常用它
_TAG_RANGE = 0x33                  # rangeOfInteger：8 字节两个 int32


def _attr(tag, name, value):
    """编码一条属性。value 给 str（按 utf-8）或 bytes（integer/enum 调用方先 pack 好）。"""
    if isinstance(value, str):
        value = value.encode('utf-8')
    name_bytes = name.encode('ascii')
    return (struct.pack('>B', tag)
            + struct.pack('>H', len(name_bytes)) + name_bytes
            + struct.pack('>H', len(value)) + value)


def _group(tag, pairs):
    """编码一个属性组。pairs: [(value_tag, name, value), ...]；
    value 给 list/tuple 时第一个带名字、其余按「追加值」编码（name 长度为 0）——
    这是 IPP 表达一排关键字（比如 document-format-supported）的唯一办法。"""
    out = struct.pack('>B', tag)
    for value_tag, name, value in pairs:
        values = value if isinstance(value, (list, tuple)) else [value]
        out += _attr(value_tag, name, values[0])
        for extra in values[1:]:
            out += _attr(value_tag, '', extra)
    return out


def _decode_value(tag, raw):
    """按值标签把字节翻回 Python 值。认识的范围之外原样给 bytes ——
    打印机的私有标签不该让解析当场崩掉，读不懂的忽略比炸掉好。"""
    if tag in (_TAG_INTEGER, _TAG_ENUM):
        return struct.unpack('>i', raw)[0]
    if tag == _TAG_BOOLEAN:
        # 不能让它以 bytes 漏出去：boolean 字段（接单中与否）要进 JSON 响应，
        # Flask 序列化 bytes 直接 500 —— 这类坏法只在真打印机接上来时发生，
        # 离线自检碰不到它。
        return raw != b'\x00'
    if tag == _TAG_RANGE:
        low, high = struct.unpack('>ii', raw)
        return (low, high)
    if tag in (_TAG_KEYWORD, _TAG_URI, _TAG_CHARSET, _TAG_LANGUAGE,
               _TAG_NAME_WO_LANG, _TAG_TEXT_WO_LANG):
        return raw.decode('utf-8', 'replace')
    return raw


def _parse_ipp_response(body):
    """把 IPP 响应拆成 (status_code, groups)。

    groups 是 {组标签: {属性名: [值, ...]}} —— 同名多值都留着，
    「supported」一族几乎全是多值的，扔掉第二枚起就等于谎报能力。
    """
    if len(body) < 8:
        raise DispatchError('IPP 响应太短（%d 字节），打印机没按协议说话' % len(body))
    status = struct.unpack('>H', body[2:4])[0]
    groups = {}
    current = None
    pos = 8
    while pos < len(body):
        tag = body[pos]
        pos += 1
        if tag == _TAG_END:
            break
        if tag <= 0x0F:  # 分组分隔符
            current = groups.setdefault(tag, {})
            continue
        if current is None:  # 分组开始前就冒出属性：按操作组兜住，别让它丢
            current = groups.setdefault(_TAG_OPERATION_GROUP, {})
        (name_len,) = struct.unpack('>H', body[pos:pos + 2])
        pos += 2
        name = body[pos:pos + name_len].decode('ascii', 'replace')
        pos += name_len
        (value_len,) = struct.unpack('>H', body[pos:pos + 2])
        pos += 2
        value = _decode_value(tag, body[pos:pos + value_len])
        pos += value_len
        if name:
            current.setdefault(name, []).append(value)
        elif current:  # name 为空 = 上一个属性的追加值
            last = next(reversed(current)) if current else None
            if last is not None:
                current[last].append(value)
    return status, groups


def _ipp_post(pr, payload, timeout):
    """IPP 的 HTTP 载体：一个 POST，Content-Type application/ipp。"""
    host, port, ipp_path = _endpoint(pr)
    url = 'http://%s:%d%s' % (host, port, ipp_path)
    request = urllib.request.Request(url, data=payload,
                                     headers={'Content-Type': 'application/ipp'})
    try:
        with urllib.request.urlopen(request, timeout=timeout) as resp:
            return resp.read()
    except urllib.error.HTTPError as exc:
        # HTTP 层的报错（路径不对 / 被拒）换台打印机也不会自己好，按永久失败算。
        raise DispatchError('打印机 HTTP 层拒绝了请求（%s）：%s' % (url, exc)) from exc
    except (urllib.error.URLError, socket.timeout, OSError, TimeoutError) as exc:
        raise TransientDispatchError('连不上打印机 %s:%d（%s）' % (host, port, exc)) from exc


def _operation_group(uri, extra_pairs):
    """操作属性组。charset 必须是第一条、natural-language 第二条 —— 协议规定的顺序，
    乱序有打印机直接回 bad-request，这种错查起来最冤。"""
    pairs = [
        (_TAG_CHARSET, 'attributes-charset', 'utf-8'),
        (_TAG_LANGUAGE, 'attributes-natural-language', 'en'),
        (_TAG_URI, 'printer-uri', uri),
    ]
    pairs.extend(extra_pairs)
    return _group(_TAG_OPERATION_GROUP, pairs)


def send_ipp_job(pr, file_path, job_name, copies, duplex, color, paper_name):
    """IPP 下发一份文件。成功返回 {'job_id': str 或 None}。

    打印机若连参数都不肯收（client-error-unsupported-attributes），退一步只带份数重发：
    份数几乎哪台都支持，而 sides / print-color-mode / media 这几样恰恰是各家覆盖参差
    的地方 —— 少带参数印出默认效果，好过整单发不出去。
    """
    host, port, ipp_path = _endpoint(pr)
    uri = 'ipp://%s:%d%s' % (host, port, ipp_path)
    with open(file_path, 'rb') as fh:
        document = fh.read()

    job_pairs = [
        (_TAG_INTEGER, 'copies', struct.pack('>i', max(1, int(copies)))),
        (_TAG_KEYWORD, 'sides', 'two-sided-long-edge' if duplex == 'double' else 'one-sided'),
        (_TAG_KEYWORD, 'print-color-mode', 'color' if color == 'color' else 'monochrome'),
        (_TAG_KEYWORD, 'media', PRINTER_MEDIA_MAP.get(paper_name, PRINTER_MEDIA_DEFAULT)),
    ]

    def build(with_job_attrs):
        request_id = 1
        body = IPP_VERSION + struct.pack('>H', OP_PRINT_JOB) + struct.pack('>I', request_id)
        body += _operation_group(uri, [(_TAG_NAME_WO_LANG, 'job-name', job_name)])
        if with_job_attrs:
            body += _group(_TAG_JOB_GROUP, job_pairs)
        body += struct.pack('>B', _TAG_END) + document
        return body

    timeout = PRINTER_TIMEOUT
    status, groups = _parse_ipp_response(_ipp_post(pr, build(True), timeout))
    if status == 0x040B:
        logger.warning('打印机不认下发参数，退回只带份数重发（job=%s）', job_name)
        status, groups = _parse_ipp_response(_ipp_post(pr, build(False), timeout))
    if status >= 0x0100:
        raise DispatchError('打印机拒绝了任务（IPP 状态码 0x%04X）' % status)
    # job-id 在响应的属性组里找一圈：规范上它该在作业组，个别固件放操作组，
    # 找不到就留空 —— 它是排障用的钥匙，不是流程判据，不为它失败。
    job_id = None
    for attrs in groups.values():
        if 'job-id' in attrs:
            job_id = str(attrs['job-id'][0])
            break
    return {'job_id': job_id}


def query_printer(pr, timeout=None):
    """查打印机的能力与状态，返回扁平字典；字段缺失就少给 —— 探测与设备徽标按有啥说啥。"""
    host, port, ipp_path = _endpoint(pr)
    uri = 'ipp://%s:%d%s' % (host, port, ipp_path)
    wanted = ['printer-name', 'printer-state', 'printer-state-reasons',
              'printer-is-accepting-jobs', 'printer-make-and-model',
              'sides-supported', 'print-color-mode-supported', 'copies-supported',
              'media-default', 'document-format-supported']
    body = IPP_VERSION + struct.pack('>H', OP_GET_PRINTER_ATTRIBUTES) + struct.pack('>I', 1)
    body += _operation_group(uri, [(_TAG_KEYWORD, 'requested-attributes', wanted)])
    body += struct.pack('>B', _TAG_END)
    status, groups = _parse_ipp_response(_ipp_post(pr, body, timeout or PRINTER_TIMEOUT))
    if status >= 0x0100:
        raise DispatchError('打印机拒绝了能力查询（IPP 状态码 0x%04X）' % status)
    flat = {}
    for attrs in groups.values():
        for name, values in attrs.items():
            flat[name] = values[0] if len(values) == 1 else values
    return flat


# ---------------------------------------------------------------------------
# RAW 9100 兜底。见模块注释：没有任务回报，参数只设单双面与份数。
# ---------------------------------------------------------------------------

# PJL 作业的起止符。@PJL 行一律 CRLF 结尾 —— 老固件按裸 LF 分行会整段不认。
_PJL_START = b'\x1b%-12345X@PJL\r\n'
_PJL_END = b'\x1b%-12345X'


def send_raw9100_job(pr, file_path, copies, duplex):
    """往 9100 端口直塞一份 PDF。发完即返回（{'job_id': None}）——
    这个协议没有回报可拿，socket 收尾就是它能给出的全部真相。"""
    host, port, _ipp_path = _endpoint(pr)
    with open(file_path, 'rb') as fh:
        document = fh.read()
    lines = ['@PJL']
    if duplex == 'double':
        lines += ['@PJL SET DUPLEX=ON', '@PJL SET BINDING=LONGEDGE']
    lines.append('@PJL SET QTY=%d' % max(1, int(copies)))
    # 任务名**不**写进 PJL：那里是行文本，没有长度前缀，往里拼任何
    # 不是我们自己生成的字符串都是白送一个注入面 —— 而排障有日志可查。
    lines.append('@PJL ENTER LANGUAGE = PDF')
    payload = _PJL_START + ''.join(line + '\r\n' for line in lines).encode('ascii') + document + _PJL_END
    try:
        with socket.create_connection((host, port), timeout=PRINTER_TIMEOUT) as sock:
            sock.settimeout(PRINTER_TIMEOUT)
            sock.sendall(payload)
    except (socket.timeout, OSError, TimeoutError) as exc:
        raise TransientDispatchError('连不上打印机 %s:%d（%s）' % (host, port, exc)) from exc
    return {'job_id': None}


def send_job(pr, file_path, job_name, copies, duplex, color, paper_name):
    """按打印机档案里的 mode 把一份文件发进去。参数在这里集中翻译，
    worker 不必知道两个协议的方言差别。"""
    if pr['mode'] == 'raw9100':
        return send_raw9100_job(pr, file_path, copies, duplex)
    return send_ipp_job(pr, file_path, job_name, copies, duplex, color, paper_name)


# ---------------------------------------------------------------------------
# 探测：给一个 IP，摸清它说哪种协议、队列路径是什么、型号叫什么。
# 管理页表单的「探测」按钮与 scripts/probe_printer.py 的 CLI 共用这一份逻辑
# —— 两处各写一遍，迟早一边认得出另一边认不出。
# ---------------------------------------------------------------------------

# 常见的 IPP 队列路径。打印机网页管理界面能配置的往往就是这几个变体，
# 逐个试一遍比让人去翻说明书快。
IPP_PATH_CANDIDATES = ('/ipp/print', '/ipp', '/ipp/printer', '/printers/queue', '/')


def probe_host(host, timeout=None):
    """探测一台打印机：IPP 候选路径逐个试能力查询，全败再看 9100 通不通。

    返回 {'mode': 'ipp'|'raw9100', 'port': int, 'ipp_path': str|None,
          'state': 扁平能力字典|None, 'error': str|None}。
    端口/路径是**可以直接填进 printers 表单**的值 —— 探测的意义就是省掉翻说明书。
    """
    from config import PRINTER_TIMEOUT
    timeout = timeout or PRINTER_TIMEOUT
    fake_pr = {'host': host, 'mode': 'ipp', 'port': 631, 'ipp_path': IPP_PATH_CANDIDATES[0]}
    last_exc = None
    for path in IPP_PATH_CANDIDATES:
        fake_pr['ipp_path'] = path
        try:
            state = query_printer(fake_pr, timeout=timeout)
            return {'mode': 'ipp', 'port': 631, 'ipp_path': path, 'state': state, 'error': None}
        except Exception as exc:  # noqa: BLE001 —— 换下一个路径继续试
            last_exc = exc
    # IPP 全败：9100 端口能不能建立连接也算一种答案（无回报协议，只能探「通」）。
    try:
        with socket.create_connection((host, 9100), timeout=timeout):
            return {'mode': 'raw9100', 'port': 9100, 'ipp_path': None,
                    'state': None, 'error': None}
    except OSError as exc:
        return {'mode': None, 'port': None, 'ipp_path': None, 'state': None,
                'error': str(last_exc or exc)}
