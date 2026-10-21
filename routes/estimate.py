"""routes/estimate.py —— 「先上传、后下单」：预上传、实时试算、用预上传的文件建单。

## 为什么把上传和下单拆成两步

原先它们是**一个动作**（`/api/upload` 落盘之后直接建单），所以学生在按下按钮
之前看不到任何价格 —— 而「大概多少钱」恰恰是他此刻最想知道的事。
要让它实时（改一次份数、换一档纸就重算一次），文件就必须先落地：
页数是从文件里数出来的，而**客户端报上来的页数不可信** ——
那个数直接进公式（见 pricing 模块注释第②条），
何况它来自用户上传的文件，不加约束就是一个可以伪造的输入。

于是有了这条链路（前端见 views/student/UploadView.vue）：

    选文件 → POST /api/upload/prepare      → {file_token, pages}
           → POST /api/estimate（可反复调） → {price, label}
           → POST /api/order/prepared       → {order_id, pickup_code, est_price}

大文件走的是同一条链，只是中间换成分片那一套
（`POST /api/upload/chunked/<upload_id>/prepare`，合并完同样落进 `.pending`）。

**老的 `/api/upload` 一个字都没改**：机器人、冒烟脚本、以及缓存里的旧页面
都还在用它，那条路仍然是「传完即下单」。这是两条并列的下单路径，
不是一条取代另一条。

## 预上传的文件住在哪

    UPLOAD_FOLDER/.pending/<user_id>/<uuid>.<ext>

按账号分子目录，所以 A 拿到的 token 在 B 的目录里根本不存在 ——
token 本身是 uuid4（猜不到），这一层防的是「同一个人拿错文件」，
同时让「每个账号最多留几份」这件事算得出来。

这些文件**还没有订单**，所以既不在订单清理的视野里，也不进配额那套算法。
代价是要自己管：TTL 清理 + 每账号份数上限，两样都在下面。
清理是**惰性**的（预上传时顺带扫一遍），不另起线程 ——
这个量级（一次上传一条目录项）不值得为它养一个定时任务。

建单时文件会**搬出** `.pending` 到 `UPLOAD_FOLDER` 根下，此后生命周期跟着订单走。
这一步不能省：留一份在 `.pending` 里，它迟早会被 TTL 清理删掉，
而那时订单正指着它 —— 系统一切正常，只有学生点「下载」的时候文件没了。
"""

import os
import re
import shutil
import time
import uuid

from flask import Blueprint, g, jsonify, request

from auth import login_required
from config import (BATCH_ORDER_MAX_FILES, DUPLEX_MIXED, ESTIMATE_MAX_IN_WINDOW,
                    ESTIMATE_WINDOW_SECONDS, ORDER_SOURCE_WEB, PENDING_UPLOAD_MAX_FILES,
                    PENDING_UPLOAD_TTL_HOURS, UPLOAD_FOLDER, logger)
from db import db_conn, find_preset
import pricing
from security import client_ip, hit_limit, rate_limited
from utils import allowed_file, parse_copies
from .orders import (UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS,
                     create_order_from_saved_files, discard_upload_file, preset_doc_pages,
                     preset_price_of, resolve_preset_item, resolve_price_item,
                     save_incoming_file)

bp = Blueprint('estimate', __name__)

# 预上传区的根目录。藏在 UPLOAD_FOLDER 下的点开头子目录里：
# 它和订单附件同属「运行期数据」，一起被备份、一起被搬走；
# 而点开头的名字让人一眼看出「这不是订单文件」——
# 运维手动清盘时不会误删，写清理脚本的人也不会把它当成订单扫进去。
PENDING_ROOT = os.path.join(UPLOAD_FOLDER, '.pending')

# token 的形状（32 位小写十六进制）。**先卡形状再去碰磁盘**：
# 拼接路径之前不校验，就是一个能让 `../` 走进来的口子。
_TOKEN_RE = re.compile(r'^[0-9a-f]{32}$')

# token -> (过期时间, 页数, 说明)。进程内存缓存 —— waitress 是单进程 8 线程，够用；
# 进程重启丢掉只是「下一次试算重新解析一遍」，不影响任何正确性。
# 有它是因为「改一次份数就重算一次」意味着同一个文件会被反复解析，
# 而一份 20MB 的 PDF 解析一次是几百毫秒 —— 学生每拨一下份数就等这么久，说不过去。
_PAGES_CACHE = {}
_PAGES_CACHE_TTL = 1800
_PAGES_CACHE_MAX = 500


# ---- 预上传区 ---------------------------------------------------------------

def _pending_dir(user_id):
    return os.path.join(PENDING_ROOT, str(user_id))


def cleanup_pending():
    """把过期的预上传文件删掉（连同空掉的账号目录）。

    惰性调用（每次预上传顺带扫一遍），见模块注释。
    按 mtime 判过期而不是按创建时间：学生传完之后又换了一份，旧的照样会自然过期。
    """
    if not os.path.isdir(PENDING_ROOT):
        return
    deadline = time.time() - PENDING_UPLOAD_TTL_HOURS * 3600
    try:
        user_dirs = os.listdir(PENDING_ROOT)
    except OSError:
        return
    for user_dir in user_dirs:
        folder = os.path.join(PENDING_ROOT, user_dir)
        if not os.path.isdir(folder):
            continue
        keep = 0
        try:
            names = os.listdir(folder)
        except OSError:
            continue
        for name in names:
            full = os.path.join(folder, name)
            try:
                if os.path.getmtime(full) < deadline:
                    os.remove(full)
                else:
                    keep += 1
            except OSError:
                continue
        if not keep:
            try:
                os.rmdir(folder)
            except OSError:
                pass


def pending_count(user_id):
    """这个账号在预上传区留了几份（份数上限用它）。"""
    folder = _pending_dir(user_id)
    if not os.path.isdir(folder):
        return 0
    try:
        return sum(1 for name in os.listdir(folder)
                   if os.path.isfile(os.path.join(folder, name)))
    except OSError:
        return 0


def store_pending_file(user_id, src_path, ext):
    """把一份**已经完整落盘**的文件收进预上传区，返回 token。

    分片那条路（upload_chunks）也调这里 —— 合并出来的文件和直传落盘的文件
    在这一点上没有任何区别，收进同一个区、同一个 token 形状，
    后续的试算与建单就只认 `.pending`，不必再分「你从哪条路来的」。
    """
    folder = _pending_dir(user_id)
    os.makedirs(folder, exist_ok=True)
    token = uuid.uuid4().hex
    dst = os.path.join(folder, '%s.%s' % (token, ext))
    #    用 move 而不是 rename：两者都在 UPLOAD_FOLDER 下（同一分区）时
    #    它是原子的改名；万一以后有人把 .pending 挪到别的盘上，move 会退化成
    #    「拷一份再删」，仍然是对的 —— 而 os.replace 会直接抛 EXDEV。
    shutil.move(src_path, dst)
    return token


def lookup_pending(user_id, token):
    """按 token 找那份预上传文件，返回 (路径, 扩展名)；找不到就是 None。

    只在自己的目录里找（见模块注释），所以别人的 token 在这里天然无效。
    """
    if not isinstance(token, str) or not _TOKEN_RE.match(token):
        return None
    folder = _pending_dir(user_id)
    if not os.path.isdir(folder):
        return None
    try:
        names = os.listdir(folder)
    except OSError:
        return None
    for name in names:
        stem, dot, ext = name.rpartition('.')
        if dot and stem == token:
            full = os.path.join(folder, name)
            return (full, ext) if os.path.isfile(full) else None
    return None


def pages_for_pending(user_id, token):
    """预上传文件的页数，返回 (页数, 说明)。读不出来时页数为 None。

    与 pricing.count_pages 同一条纪律：**绝不抛异常** —— 数不出页数只是
    「这单没有预估价」，订单照下。
    """
    found = lookup_pending(user_id, token)
    if found is None:
        return None, '预上传的文件不在'
    path = found[0]
    now = time.time()
    cached = _PAGES_CACHE.get(token)
    if cached is not None and cached[0] > now:
        return cached[1], cached[2]
    pages, note = pricing.count_pages(path)
    if len(_PAGES_CACHE) >= _PAGES_CACHE_MAX:
        #    满了就整个清掉，不做 LRU：这里存的是「(页数, 一句说明)」，
        #    重建的代价是重新解析一次文件，而 LRU 的记账成本比它高。
        _PAGES_CACHE.clear()
    # 解析不出来也缓存 —— 否则学生每改一次份数，就把一个坏文件重读一遍。
    _PAGES_CACHE[token] = (now + _PAGES_CACHE_TTL, pages, note)
    return pages, note


# 把 pricing 内部那句说明翻成给学生看的一句话。
# 分开写是因为那些句子是给日志和运维看的（「这一单没选价目项」），
# 直接摆到屏幕上读起来像系统在抱怨。
_HINTS = (
    ('没选价目项', '先选一档类型 / 纸张'),
    ('自动估价未启用', '管理员未开启自动估价'),
    ('读不出文件页数', '读不出这份文件的页数'),
    # v24 起逐份估价：明细里的说法比整单那句更具体（「读不出**这份**文件的页数」、
    # 「按这一项的单价算出来是 0 元」），两条都要能认出来 —— 认不出来时
    # _hint_for 只会回一句中性的兜底，学生就不知道下一步该改哪里。
    ('读不出这份文件的页数', '读不出这份文件的页数'),
    ('算出来是 0 元', '按当前价目表算出来是 0 元'),
    ('没有附带文档', '这条服务没有附带文档'),
    ('文档文件不在', '这条服务的文档文件不见了'),
    ('文档信息', '读不出这条服务的文档信息'),
    ('定价是 0', '这条服务的定价是 0 元'),
    ('超出金额上限', '按当前价格算出来超出上限'),
    ('读取计价规则失败', '价格读取失败'),
    ('估算时出错', '估算失败'),
    ('预上传的文件不在', '文件不在了，重新选一次'),
)


def _hint_for(reason):
    """内部说明 -> 学生看的一句话。认不出来时给一句中性的兜底。"""
    if not reason:
        return ''
    for key, text in _HINTS:
        if key in reason:
            return text
    return '暂时算不出预估'


def _quote_payload(price, pages, label, reason, duplex, files=None):
    """试算响应的统一形状（文件单与预设单共用）。

    files 只在「一次算多份、每份参数不同」那条路上给：逐份的页数、小计与
    归正后的参数。**老形状照旧不带这个键**（或为空），前端把它当可选的 ——
    一份文件的单本来就没有「逐份」可言，硬塞一条只会让页面上多出一层。
    """
    payload = {
        'code': 0,
        'price': price,
        'pages': pages,
        'label': label or '',
        'hint': _hint_for(reason),
        'duplex': duplex,
    }
    if files is not None:
        payload['files'] = files
    return jsonify(payload)


# ---- 接口 -------------------------------------------------------------------

@bp.post('/api/upload/prepare')
@login_required
def api_upload_prepare():
    """把文件先传上来（**先不下单**），拿一个 token 去试算。

    频控与 /api/upload 共用一把计数器：两条路都能往盘上写文件，
    分开计数等于额度翻倍（与预设单那条注释同一个道理）。
    """
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        return rate_limited('upload_rate_limited',
                            '账号 %s 在 %s 秒内提交超过 %s 次上传'
                            % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW),
                            '上传太频繁了，稍等一会儿再试')

    file = request.files.get('file')
    if file is None or not file.filename:
        return jsonify({'code': 400, 'msg': '请选择要上传的文件'}), 400

    #    份数上限在**落盘之前**判：先落一份再拒绝，等于拿磁盘替被拒的请求付一遍代价，
    #    而被拒的人正是那个在刷的人。
    #
    #    这是**软上限**，不是硬闸门：判 kept 与 store_pending_file 之间没有锁，
    #    同一个账号开几个并发请求就能多进来一两份。这是有意的取舍 ——
    #    真做原子化（每账号一把锁 / 落盘后再核一次并回滚）的代价比收益大，
    #    越界的那一两份会在 TTL 到期时被 cleanup_pending 收走。
    #    别把它当漏洞重写：真正的硬墙是 orders 那边按**在盘总量**算的配额。
    cleanup_pending()
    kept = pending_count(g.user['id'])
    if kept >= PENDING_UPLOAD_MAX_FILES:
        return jsonify({
            'code': 429,
            'msg': '还有 %s 份文件传了没下单，先下掉它们、或者重选一份' % kept,
        }), 429

    # 落盘 + 文件本身的校验（白名单 / 空文件 / 内容嗅探 / 配额）—— 与直传下单
    # 共用同一份实现，见 orders.save_incoming_file 的 docstring。
    info, error_response = save_incoming_file(file)
    if error_response is not None:
        return error_response

    try:
        token = store_pending_file(g.user['id'], info['path'], info['ext'])
    except OSError:
        discard_upload_file(info['path'])
        logger.exception('预上传文件收进 .pending 失败：账号=%s 文件=%s',
                         g.user['nickname'], info['name'])
        return jsonify({'code': 500, 'msg': '上传失败，请稍后重试'}), 500

    pages, note = pages_for_pending(g.user['id'], token)
    logger.info('预上传完成：账号=%s 文件=%s 大小=%sKB 页数=%s ip=%s',
                g.user['nickname'], info['name'], info['size'] // 1024,
                pages if pages is not None else '（%s）' % note, client_ip())
    return jsonify({
        'code': 0,
        'file_token': token,
        'filename': info['name'],
        'size': info['size'],
        'pages': pages,
        'pages_note': note,
    })


@bp.post('/api/estimate')
@login_required
def api_estimate():
    """实时试算：给「预上传的文件 / 某条打印服务 + 哪一档 + 几份 + 单双面」算一遍。

    公式在服务端（pricing.py），前端**不镜像** —— 镜像必然漂移，
    而漂了不报错，只是页面上的数字开始说谎
    （与 /api/admin/price-rules/preview 是同一句话，两条路都走 pricing）。

    两种来源二选一：
      · `preset_id` —— 打印服务单：价目项与定价都取自这条服务，页数取自它的附带文档；
      · `file_token` —— 文件单：页数由服务端从那份预上传文件里数出来。
    都没给也能调（返回一个「先选一档」的提示），前端进页面时不必特判。
    """
    if hit_limit('estimate:%s' % g.user['id'], ESTIMATE_MAX_IN_WINDOW,
                 ESTIMATE_WINDOW_SECONDS):
        return rate_limited('estimate_rate_limited',
                            '账号 %s 在 %s 秒内请求试算超过 %s 次'
                            % (g.user['nickname'], ESTIMATE_WINDOW_SECONDS,
                               ESTIMATE_MAX_IN_WINDOW),
                            '估算太频繁了，稍等一会儿再试')

    data = request.get_json(silent=True) or {}
    copies, error = parse_copies(data.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    duplex = pricing.normalize_duplex(data.get('duplex'))

    preset_id = data.get('preset_id')
    with db_conn() as conn:
        if preset_id not in (None, '', 0, '0'):
            try:
                pid = int(preset_id)
            except (TypeError, ValueError):
                return jsonify({'code': 400, 'msg': '预设服务不合法，刷新页面重新选择'}), 400
            preset = find_preset(conn, pid)
            if preset is None or preset['is_active'] != 1:
                # 页面开着、管理员刚好把它停用/删了。试算上如实说一句就够，
                # **不必**回 400：试算失败不该让学生看到一条失败提示，
                # hint 会显示成「暂时算不出预估」，下单时那道检查才是真闸门。
                return _quote_payload(None, None, '', '这条打印服务已经不能用了', duplex)
            item, duplex, error = resolve_preset_item(conn, preset, data)
            if error:
                return _quote_payload(None, None, '', error, duplex)
            pages, _note = preset_doc_pages(preset)
            price, reason = pricing.estimate_for_preset(
                conn, pages, copies, duplex, item, preset_price_of(preset))
            return _quote_payload(price, pages, pricing.format_item_label(item),
                                  reason, duplex)

        # v24：**一次算多份、每份带自己的档位 / 份数 / 单双面**。
        # 这是「一单多参数」的试算口，与建单请求里的 groups[].files[] 一一对应。
        # 放在老形状之前判：`files` 是新键，老页面不会发它。
        raw_files = data.get('files')
        if isinstance(raw_files, list) and raw_files:
            return _quote_for_files(conn, raw_files)

        item, duplex, error = resolve_price_item(conn, data)
        if error:
            return _quote_payload(None, None, '', error, duplex)
        # 页数来源两种形状都认：
        #   · file_tokens（列表）—— 一组的**多份文件**（批量下单页按「同样的参数」
        #     把它们合成一组再试算，页数就是这一组之和）；
        #   · file_token（单个）—— 老形状，缓存里的旧页面还在这么调。
        # 只认列表会让老页面试算全空（不报错，只是价格没了），
        # 只认单个则批量页永远算不出价 —— 所以两个都留。
        tokens = data.get('file_tokens')
        if isinstance(tokens, list) and tokens:
            pages, note = _pages_for_tokens(g.user['id'], tokens)
        else:
            token = data.get('file_token')
            pages, note = pages_for_pending(g.user['id'], token) if token else (None, '还没上传文件')
        price, reason = pricing.estimate_for_order(conn, pages, copies, duplex, item)
        if price is None and pages is None:
            # 把「为什么没页数」说得更具体一点：没传文件 vs 传了但数不出来，
            # 这两件事对应学生完全不同的下一步动作。
            reason = note
        return _quote_payload(price, pages, pricing.format_item_label(item), reason, duplex)


def _group_item_label(entries):
    """这一组文件共用的价目项名；逐份不一样时返回 None。

    响应里的 price_item_name / 日志里那一格都用它。**逐份不同时不挑第一份的名字**：
    挑一份写上去，回执就会显示「A4 70g · 黑白」而单里有一份是彩色 ——
    那是最容易在柜台吵起来的一句话。逐份的标签在 estimate 的 files 明细里、
    在建单后的 order_files 里，要看得去哪里看是明确的。
    """
    labels = []
    for entry in entries:
        item = entry.get('item')
        label = pricing.format_item_label(item) if item else ''
        if label not in labels:
            labels.append(label)
    return labels[0] if len(labels) == 1 else None


def _group_item_log(entries):
    """日志里那一格「价目项」：只有一档时照写，混用时写清楚是几档。"""
    labels = []
    for entry in entries:
        label = (pricing.format_item_label(entry.get('item')) if entry.get('item')
                 else '未选')
        if label not in labels:
            labels.append(label)
    return labels[0] if len(labels) == 1 else '逐份混用（%s 档）' % len(labels)


def _quote_for_files(conn, raw_files):
    """整单试算：一次提交里的每一份文件带自己的档位 / 份数 / 单双面（v24）。

    与建单那条路（validate_order_groups）**用同一套逐份判据**：
      · 每个 token 必须真的还在自己的 `.pending` 目录里；
      · 页数一律服务端数（客户端报的不可信，见模块注释）；
      · 档位走 resolve_price_item，所以「这一档不支持双面」在这里就已归正 ——
        否则学生会看到「双面」的价格，到下单时被改成单面，金额对不上。

    与单文件试算的差别只有一条：**任一份算不出来，整单就给 null**。
    少算几份的合计是一个偏低的数字，学生照着它备钱、到柜台发现不是这个数，
    比「暂时算不出预估」糟得多（详见 pricing.estimate_for_files 的注释）。
    """
    user_id = g.user['id']
    if len(raw_files) > BATCH_ORDER_MAX_FILES:
        #    不静默截断：截掉几份之后算出来的合计是**偏低**的，而偏低正是
        #    最容易让人当真的那种错。建单那边同一个上限也会拒，在这里说清楚更好。
        return jsonify({'code': 400,
                        'msg': '一次最多 %d 份文件' % BATCH_ORDER_MAX_FILES}), 400

    per_file = []          # 交给 pricing 的形状（只有计算需要的东西）
    quoted = []            # 只给前端展示的两项（token / 文件名），pricing 不认它们
    for index, raw in enumerate(raw_files, start=1):
        entry = raw if isinstance(raw, dict) else {}
        token = entry.get('file_token')
        if lookup_pending(user_id, token) is None:
            #    token 不在 = 已经过期被清理 / 已经下过单 / 是别人的。
            #    整单 400 而不是「跳过这一份」：跳过的价是假的，而学生点提交时
            #    撞上的也是同一句报错，先在这里说明白。
            return jsonify({'code': 400,
                            'msg': '第 %d 份已经不在了，请重新选择文件' % index}), 400
        copies, error = parse_copies(entry.get('copies'))
        if error:
            return jsonify({'code': 400, 'msg': '第 %d 份：%s' % (index, error)}), 400
        # 价目项不存在 / 已停用时**不回 400**：试算失败不该把学生挡在页面上，
        # 把原因交给明细里的 hint 说（下单那一步才是真闸门）。
        item, duplex, item_error = resolve_price_item(conn, entry)
        pages, pages_note = pages_for_pending(user_id, token)
        # 两句「为什么算不出」只留一句：档位的问题比页数的问题更靠前，
        # 学生先改档位才轮得到页数（页数他也改不了 —— 那是文件本身）。
        note = item_error or (pages_note if pages is None else '')
        per_file.append({'pages': pages, 'copies': copies, 'duplex': duplex,
                         'item': item, 'note': note})
        quoted.append({
            'file_token': token if isinstance(token, str) else '',
            'filename': os.path.basename(str(entry.get('filename') or '').strip())
                        or ('第 %d 份' % index),
        })

    total, details, reason = pricing.estimate_for_files(conn, per_file)

    files = []
    pages_total = 0
    names = []
    duplexes = set()
    for index, detail in enumerate(details):
        base = quoted[index] if index < len(quoted) else {}
        pages = detail.get('pages')
        if pages:
            pages_total += pages
        price = detail.get('price')
        files.append({
            'file_token': base.get('file_token') or '',
            'filename': base.get('filename') or '',
            'pages': pages,
            'price': price,
            #    price_item_name 是**字符串**（前端类型这么定的）：没选档时给空串，
            #    给 null 会让前端那格显示成 "null" 或者干脆不渲染。
            'price_item_id': detail.get('price_item_id'),
            'price_item_name': detail.get('price_item_name') or '',
            'copies': detail.get('copies'),
            'duplex': detail.get('duplex'),
            'hint': '' if price is not None else _hint_for(detail.get('reason')),
        })
        names.append(detail.get('price_item_name') or '')
        duplexes.add(detail.get('duplex'))

    # 顶层 label 只在「每一份都是同一档」时给：一份 A4、一份相纸的单，
    # 标上一个具体档位名只会让人以为整单都是那一档（逐份的标签在 files 里）。
    label = names[0] if names and len(set(names)) == 1 and names[0] else ''
    if len(duplexes) == 1:
        duplex_all = duplexes.pop()
    elif duplexes:
        #    单双面不一样时给 mixed（config.DUPLEX_MIXED）：让界面把「单/双」
        #    的选择器显示成「混合」，而不是挑一份的值冒充整单。
        duplex_all = DUPLEX_MIXED
    else:
        duplex_all = pricing.normalize_duplex(None)
    return _quote_payload(total, pages_total or None, label, reason, duplex_all, files)


def _pages_for_tokens(user_id, tokens):
    """一组预上传文件的**页数之和**，返回 (页数, 说明)。

    与 pricing.count_pages 同一条纪律：绝不抛异常、绝不因为数不出来就不让下单。
    一个 token 都数不出页数就返回 (None, 说明) —— 注意**不是 0**：
    0 会一路算出一个 0 元的预估价，而那个数比「算不出」更容易让人当真。

    token 最多认 BATCH_ORDER_MAX_FILES 个：这是学生的输入，不设上限的话
    一次请求就能让服务端去 number 几千个 token（每个都要读一遍 `.pending` 目录）。
    超出的直接忽略 —— 反正建单那边也会拒掉超量的那一组。

    **同一个 token 只数一次**：这里是**相加**，同一个 token 出现两次就等于把它的
    页数算了两遍，试算价直接虚高；而下单那边（validate_order_groups）会把重复的
    token 拒掉，于是学生看到的价格和最后成交的价格对不上，还找不到原因。
    跨组的重复由 validate_order_groups 拦，单组内的重复由这一行兜住。
    """
    unique = []
    seen = set()
    for token in tokens:
        # 去重键统一成字符串：JSON 里塞进数字或对象时 token 不是 str，
        # 而 set 里放不可哈希的东西会抛 TypeError —— 试算接口不该因为这种输入 500。
        key = token if isinstance(token, str) else repr(token)
        if key in seen:
            continue
        seen.add(key)
        unique.append(token)

    total = 0
    counted = 0
    notes = []
    for token in unique[:BATCH_ORDER_MAX_FILES]:
        pages, note = pages_for_pending(user_id, token)
        if pages:
            total += pages
            counted += 1
        else:
            notes.append(note)
    if not counted:
        return None, (notes[0] if notes else '还没上传文件')
    return total, ''


def normalize_group_files(user_id, raw_files):
    """把一组「预上传文件」的引用归一成 entries，返回 (entries, 错误信息)。

    raw_files 里每一项是 {'file_token': .., 'filename': ..}，来自调用方
    （网页的 JSON / 机器人的 JSON）。这里的规矩：
      · **每个 token 都必须在自己的 .pending 目录里真的存在** —— 任何一个不在，
        整组拒掉（400），一个字节都不搬。半组文件建出一张单，比整组失败糟糕得多：
        用户看到的是「下单成功」，而单子里少了一份他不知道的文件。
      · 文件名回传只是为了展示（服务端只存了 uuid 名）。它仍然要过
        basename + 扩展名一致性：这是学生的输入，而它会写进 orders.filename、
        出现在订单台和详情页上。
    """
    entries = []
    if not isinstance(raw_files, list) or not raw_files:
        return None, '没有要打印的文件'
    if len(raw_files) > BATCH_ORDER_MAX_FILES:
        return None, '一次最多 %d 份文件' % BATCH_ORDER_MAX_FILES
    for index, raw in enumerate(raw_files):
        if not isinstance(raw, dict):
            return None, '文件参数不合法，刷新页面重新选择'
        token = raw.get('file_token')
        found = lookup_pending(user_id, token)
        if found is None:
            label = os.path.basename(str(raw.get('filename') or '')) or ('第 %d 份' % (index + 1))
            return None, '「%s」已经不在了（太久没下单会过期），请重新选择文件' % label[:40]
        src_path, ext = found
        original_name = os.path.basename(str(raw.get('filename') or '').strip())
        if not original_name or not allowed_file(original_name) \
                or original_name.rsplit('.', 1)[1].lower() != ext:
            original_name = '上传文件.' + ext
        entries.append({'token': token, 'name': original_name,
                        'src_path': src_path, 'ext': ext})
    return entries, None


def validate_order_groups(user_id, groups):
    """把请求体里的 groups 校验并归一成可提交的形状。

    返回 (prepared, error)：
      · prepared = [{'entries': [...], 'options': {item, duplex, copies, remark, color}}, ...]；
        entries 里的**每一项**带它自己的 item / copies / duplex（v24 起可以各不相同，
        建单时逐份落进 order_files）；options 是组级的值，只在某份缺参数时回落、
        以及给日志与响应做摘要用；
      · error = (第几组（从 1 数）, 中文原因)，或 None。

    **先把每一组都校验完、再开始建单**（调用方照着这个顺序用）：
    一个 group 的文件不在了却已经建出了前面几张单，用户看到的是一个「半成功」的
    结果 —— 界面上一半单号、一半报错，他既不知道自己到底下了几单，
    也不知道那几份文件要不要重传。校验便宜（查目录 + 读价目表），
    而返工要重传文件、还要处理已建成的单。

    网页端（一次发多组）和机器人（一组一个请求）共用这一份：两边各写一遍的话，
    迟早出现「网页端会拦停用的价目项、机器人那边不拦」这种一半严一半松的口子。

    **token 要跨组去重**（2026-09-30）。原先每组各自 lookup_pending，同一个 token
    出现在两组、或同一组里写了两遍，三道检查全都能过，然后：
      · 试算（_pages_for_tokens）把同一份文件的页数**加了两遍** → 价格虚高；
      · 建单时第一次 shutil.move 把文件搬走，第二次 move 抛 FileNotFoundError
        → 500「第 N 组失败，前 M 单已提交」—— 用户以为是自己选错了文件。
    一份文件只能属于一张订单（三个下单口共用的那条边界），所以这里直接拒，
    让前端刷新重选，而不是替他把第二份悄悄丢掉。
    """
    prepared = []
    seen_tokens = set()
    for index, group in enumerate(groups, start=1):
        if not isinstance(group, dict):
            return None, (index, '下单参数不合法，刷新页面重新选择')
        copies, error = parse_copies(group.get('copies'))
        if error:
            return None, (index, error)
        with db_conn() as conn:
            item, duplex, error = resolve_price_item(conn, group)
        if error:
            return None, (index, error)
        entries, error = normalize_group_files(user_id, group.get('files'))
        if error:
            return None, (index, error)
        for entry in entries:
            if entry['token'] in seen_tokens:
                return None, (index, '同一份文件只能提交一次，请刷新页面重新选择')
            seen_tokens.add(entry['token'])
        # v24：**组内每份文件可以带自己的档位 / 份数 / 单双面**。
        # 判据只有这一处：份上的值优先，缺了落组级，再缺走默认（1 份 / 单面 /
        # 不选档）。服务端**不再要求组内同参数**，也**不按参数把一组拆成几张单** ——
        # 一次提交 = 一张订单 = 一个单号；参数不同只体现在 order_files 的逐份快照上。
        raw_files = group.get('files') or []
        with db_conn() as conn:
            for position, entry in enumerate(entries):
                raw = raw_files[position] if position < len(raw_files) else {}
                if not isinstance(raw, dict):
                    raw = {}
                #    报错要能指到具体那一份：「第 2 组第 3 份：份数需在 1-50 之间」。
                #    只报「第 2 组」的话，学生对着组里五份文件不知道是哪一份填错了。
                label = '第 %d 份' % (position + 1)
                file_copies, error = parse_copies(
                    raw.get('copies') if raw.get('copies') not in (None, '') else copies)
                if error:
                    return None, (index, '%s：%s' % (label, error))
                file_duplex = pricing.normalize_duplex(
                    raw.get('duplex') if raw.get('duplex') else duplex)
                raw_item_id = raw.get('price_item_id')
                if raw_item_id in (None, '', 0, '0'):
                    # 没带档位（或带了个空）→ 用组级那一档；组级也没有就是「不选档」。
                    raw_item_id = item['id'] if item else None
                #    每份都重走一遍 resolve_price_item：档位可能是这一份自己的，
                #    而「这一档不支持双面」的归正必须**基于这一份的档位**做 ——
                #    组级那次归正只对组级的档位成立。多查一次库换来一份判据，
                #    而一单最多 BATCH_ORDER_MAX_FILES 份。
                file_item, file_duplex, error = resolve_price_item(
                    conn, {'price_item_id': raw_item_id, 'duplex': file_duplex})
                if error:
                    return None, (index, '%s：%s' % (label, error))
                entry['item'] = file_item
                entry['copies'] = file_copies
                entry['duplex'] = file_duplex
        color = (group.get('color') or 'black').strip()
        prepared.append({
            'entries': entries,
            'options': {
                'item': item, 'duplex': duplex, 'copies': copies,
                'remark': (group.get('remark') or '').strip()[:200],
                'color': color if color in ('black', 'color') else 'black',
            },
        })
    return prepared, None


def commit_prepared_group(entries, options, source):
    """把一组预上传文件搬出 .pending 并建**一张**订单，返回 (order_id, pickup_code, est_price)。

    options 是已清洗过的 {'item', 'duplex', 'remark', 'copies'}。

    网页批量提交和机器人批量下单共用这一段 —— 两条路各写一遍的话，
    迟早出现「网页提交的会搬出 .pending、机器人提交的留在里面」这种
    一半对一半的情形，而后者要等 TTL 清理把文件删掉才会暴露（订单还指着它）。
    抛异常时调用方负责把已经搬出来的文件清掉（见下面那个 finally 的说明）。

    v24 起每份 entry 自己带着 item / copies / duplex（validate_order_groups 已经
    解析并校验过），这里原样交给 create_order_from_saved_files —— 一组一份参数
    的时代，那几个值就是 options 上的；现在它们逐份不同，**不能**在这里覆盖成
    options 的值，否则「两份彩色、三份黑白」会被抹成一整单同一档。
    """
    moved = []
    try:
        for entry in entries:
            # 搬出 .pending —— 这一步不能省，理由见模块注释最后一段。
            final_path = os.path.join(UPLOAD_FOLDER, '%s.%s' % (uuid.uuid4().hex, entry['ext']))
            shutil.move(entry['src_path'], final_path)
            moved.append(final_path)
            entry['final_path'] = final_path
            entry['size'] = os.path.getsize(final_path)
        return create_order_from_saved_files(
            [{'name': entry['name'], 'path': entry['final_path'], 'size': entry['size'],
              #    这三个键**总是**给（哪怕是 None）：「这一份不选档」是一句明确的话，
              #    而缺键会被 create_order_from_saved_files 当成「沿用函数参数的那一套」。
              'item': entry.get('item'), 'copies': entry.get('copies'),
              'duplex': entry.get('duplex')}
             for entry in entries],
            options.get('color') or 'black', options['duplex'], options['remark'],
            options['copies'], options.get('item'), source)
    except Exception:
        # 建单那一步失败时 create_order_from_saved_files 已经删过一遍它拿到的那几份；
        # 这里补一刀防的是**搬家途中**失败的情形（第 3 份 move 抛了 OSError，
        # 前两份已经在新位置上，而它们还没有任何订单认领）。
        # 判存在再删，与 /api/upload 那条路的收尾一个字不差。
        for path in moved:
            discard_upload_file(path)
        raise


def discard_prepared(user_id, tokens):
    """删掉几份还没下单的预上传文件，返回真正删掉的份数。

    谁能删：**只看 token 在不在这个账号自己的目录里**（lookup_pending 的判据），
    所以拿别人的 token 来删天然无效 —— 与「别人的 token 用不了」是同一条边界。

    存在它的理由：机器人批量下单是「先逐份传上来、再一次性建单」，
    中途任何一份失败（超了份数上限 / 服务器 500）都必须能把已经传上来的收回去。
    不收的话，那几份会一直占着「每账号最多几份」的额度直到 TTL 到期 ——
    用户看到的是「我什么都没下成，可它说我还有 5 份没下单」，而且无从处理。
    """
    removed = 0
    for token in (tokens or [])[:BATCH_ORDER_MAX_FILES]:
        found = lookup_pending(user_id, token)
        if found is None:
            continue
        try:
            os.remove(found[0])
            removed += 1
        except OSError:
            logger.warning('丢弃预上传文件失败（可能已被清理）：账号=%s token=%s',
                           user_id, token)
    return removed


@bp.post('/api/upload/discard')
@login_required
def api_discard_prepared():
    """丢弃自己还没下单的预上传文件（网页端将来要「取消这批」时也走这里）。"""
    data = request.get_json(silent=True) or {}
    tokens = data.get('file_tokens')
    if not isinstance(tokens, list):
        tokens = [data.get('file_token')] if data.get('file_token') else []
    removed = discard_prepared(g.user['id'], tokens)
    return jsonify({'code': 0, 'msg': '已丢弃 %d 份未下单的文件' % removed, 'removed': removed})


@bp.post('/api/order/prepared')
@login_required
def api_order_from_prepared():
    """用预上传好的文件建单 —— 这是「先上传、后下单」那条链的最后一步。

    与 /api/upload 的区别只有一个：文件是**之前**传上来的，这里不再碰请求体里的文件。
    其余（份数 / 价目项 / 单双面 / 备注 / 估算 / 留痕 / 清理）全部走同一批函数 ——
    两条路径各写一遍的话，迟早出现「新路下的单没有预估、老路下的单有」。

    两种请求形状：
      · `{'groups': [{files: [{file_token, filename}], price_item_id, copies, duplex, remark}, …]}`
        —— 批量下单：**一个 group = 一张订单**，组内几份文件同参数，按组分别建单。
        网页端「每份文件单独设选项」就是前端自己把同参数的合成一组再发过来；
      · 老的平铺形状 `{file_token, filename, copies, …}` —— 单文件，缓存里的旧页面在用。
    两种都会走到同一个 commit_prepared_group，所以「建出来的单长什么样」只有一份实现。
    """
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        return rate_limited('upload_rate_limited',
                            '账号 %s 在 %s 秒内提交超过 %s 次下单'
                            % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW),
                            '提交太频繁了，稍等一会儿再试')

    data = request.get_json(silent=True) or {}
    groups = data.get('groups')
    if not isinstance(groups, list) or not groups:
        # 老形状：平铺的单文件。包成一组，后面走同一条路。
        groups = [{
            'files': [{'file_token': data.get('file_token'), 'filename': data.get('filename')}],
            'price_item_id': data.get('price_item_id'),
            'copies': data.get('copies'),
            'duplex': data.get('duplex'),
            'remark': data.get('remark'),
            'color': data.get('color'),
        }]
    if len(groups) > BATCH_ORDER_MAX_FILES:
        # 组的数量也就是「一次最多能建几张单」，与份数上限共用一个常量：
        # 再多也只是同一批人同一批文件的排列组合，没有理由放开。
        return jsonify({'code': 400, 'msg': '一次最多提交 %d 张订单' % BATCH_ORDER_MAX_FILES}), 400

    prepared, error = validate_order_groups(g.user['id'], groups)
    if error is not None:
        return jsonify({'code': 400, 'msg': '第 %d 组：%s' % (error[0], error[1])}), 400

    orders = []
    for index, group in enumerate(prepared):
        try:
            order_id, pickup_code, est_price = commit_prepared_group(
                group['entries'], group['options'], ORDER_SOURCE_WEB)
        except Exception:
            logger.exception('预上传下单失败：下单人=%s 第 %s 组 文件=%s ip=%s',
                             g.user['nickname'], index + 1,
                             '、'.join(entry['name'] for entry in group['entries']),
                             client_ip())
            # 把**这一组没搬走的**、以及后面各组还没动的 token 一并丢弃。
            #
            # 不丢的话：第 i 组失败时，前几组的文件已经搬进订单（token 自然消失），
            # 而 i 之后各组的文件还躺在 .pending 里。学生照着提示「刷新重新提交整批」，
            # 第 1 组就会撞上「「xxx」已经不在了」—— 他已经下成的单号还在，
            # 剩下的却永远传不上去，人就卡在「一半单号」这个状态里。
            #
            # 只从 prepared[index] 起往后丢：前几组**已经建成订单**，它们的 token
            # 早已不在 .pending（discard_prepared 按 lookup_pending 找，
            # 找不到就跳过），所以这里既不会误删已在订单里的文件，也不必特判。
            # 失败组里已经 move 成功的那几份由 commit_prepared_group 自己清理
            # （它记着 moved 列表）；还留在 .pending 的由这里收走 —— 两边判的
            # 是同一个「文件在不在 .pending」的口径，重复调用也只是再来一次空操作。
            dropped = 0
            for pending_group in prepared[index:]:
                dropped += discard_prepared(
                    g.user['id'], [entry['token'] for entry in pending_group['entries']])
            if dropped:
                logger.info('批量下单失败后丢弃未成单的预上传文件 %s 份：下单人=%s',
                            dropped, g.user['nickname'])
            return jsonify({
                'code': 500,
                # 已经建成的几单**照实告诉用户**：说「整批失败」会让他把已经下过的
                # 文件再传一遍（而下单是真实发生的），说「全部成功」更是撒谎。
                # 没成单的那几份已经被丢掉了，学生重传就是干净的一批。
                'msg': '第 %d 组下单失败，前 %d 单已经提交，请到「我的订单」核对'
                       % (index + 1, len(orders)),
                'orders': orders,
            }), 500
        logger.info('新订单 #%s（预上传·第 %s/%s 组）下单人=%s 文件=%s 单双面=%s 份数=%s '
                    '价目项=%s 单号=%s ip=%s',
                    order_id, index + 1, len(prepared), g.user['nickname'],
                    '、'.join(entry['name'] for entry in group['entries']),
                    group['options']['duplex'], group['options']['copies'],
                    _group_item_log(group['entries']),
                    pickup_code, client_ip())
        orders.append({
            'order_id': order_id,
            'pickup_code': pickup_code,
            'est_price': est_price,
            'files': [entry['name'] for entry in group['entries']],
            #    逐份档位不同时给 null（前端回执会退回去显示文件名）——
            #    理由见 _group_item_label。
            'price_item_name': _group_item_label(group['entries']),
            'copies': group['options']['copies'],
            'duplex': group['options']['duplex'],
        })

    first = orders[0]
    return jsonify({
        'code': 0,
        'msg': '订单已提交' if len(orders) == 1 else '已提交 %d 张订单' % len(orders),
        # 老形状的四个键照给（缓存里的旧页面只读它们）：单组时它们就是那一组的值，
        # 多组时给第一组 —— 旧页面根本不会发出多组请求，所以这个取值只是为了不炸。
        'order_id': first['order_id'],
        'pickup_code': first['pickup_code'],
        'est_price': first['est_price'],
        'orders': orders,
    })
