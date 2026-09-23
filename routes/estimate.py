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
from config import (ESTIMATE_MAX_IN_WINDOW, ESTIMATE_WINDOW_SECONDS,
                    PENDING_UPLOAD_MAX_FILES, PENDING_UPLOAD_TTL_HOURS, UPLOAD_FOLDER, logger)
from db import db_conn, find_preset
import pricing
from security import client_ip, hit_limit, rate_limited
from utils import allowed_file, parse_copies
from .orders import (UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS,
                     create_order_from_saved_file, discard_upload_file, preset_doc_pages,
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


def _lookup_pending(user_id, token):
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
    found = _lookup_pending(user_id, token)
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


def _quote_payload(price, pages, label, reason, duplex):
    """试算响应的统一形状（文件单与预设单共用）。"""
    return jsonify({
        'code': 0,
        'price': price,
        'pages': pages,
        'label': label or '',
        'hint': _hint_for(reason),
        'duplex': duplex,
    })


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

        item, duplex, error = resolve_price_item(conn, data)
        if error:
            return _quote_payload(None, None, '', error, duplex)
        token = data.get('file_token')
        pages, note = pages_for_pending(g.user['id'], token) if token else (None, '还没上传文件')
        price, reason = pricing.estimate_for_order(conn, pages, copies, duplex, item)
        if price is None and pages is None:
            # 把「为什么没页数」说得更具体一点：没传文件 vs 传了但数不出来，
            # 这两件事对应学生完全不同的下一步动作。
            reason = note
        return _quote_payload(price, pages, pricing.format_item_label(item), reason, duplex)


@bp.post('/api/order/prepared')
@login_required
def api_order_from_prepared():
    """用一份预上传好的文件建单 —— 这是「先上传、后下单」那条链的最后一步。

    与 /api/upload 的区别只有一个：文件是**之前**传上来的，这里不再碰请求体里的文件。
    其余（份数 / 价目项 / 单双面 / 备注 / 估算 / 留痕 / 清理）全部走同一批函数 ——
    两条路径各写一遍的话，迟早出现「新路下的单没有预估、老路下的单有」。
    """
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        return rate_limited('upload_rate_limited',
                            '账号 %s 在 %s 秒内提交超过 %s 次下单'
                            % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW),
                            '提交太频繁了，稍等一会儿再试')

    data = request.get_json(silent=True) or {}
    token = data.get('file_token')
    found = _lookup_pending(g.user['id'], token)
    if found is None:
        return jsonify({
            'code': 400,
            'msg': '这份文件已经不在了（太久没下单会过期），请重新选择文件',
        }), 400
    src_path, ext = found

    #    原始文件名由前端回传（服务端只存了 uuid 名）。它只用来展示，
    #    但仍然要过一遍 os.path.basename 与扩展名一致性：这是学生的输入，
    #    而它会被写进 orders.filename、出现在订单台和详情页上。
    original_name = os.path.basename(str(data.get('filename') or '').strip())
    if not original_name or not allowed_file(original_name) \
            or original_name.rsplit('.', 1)[1].lower() != ext:
        original_name = '上传文件.' + ext

    color = (data.get('color') or 'black').strip()
    color = color if color in ('black', 'color') else 'black'
    remark = (data.get('remark') or '').strip()[:200]
    copies, error = parse_copies(data.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    with db_conn() as conn:
        item, duplex, error = resolve_price_item(conn, data)
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    # 搬出 .pending —— 这一步不能省，理由见模块注释最后一段。
    final_path = os.path.join(UPLOAD_FOLDER, '%s.%s' % (uuid.uuid4().hex, ext))
    try:
        shutil.move(src_path, final_path)
    except OSError:
        logger.exception('预上传文件搬出 .pending 失败：账号=%s token=%s',
                         g.user['nickname'], token)
        return jsonify({'code': 500, 'msg': '下单失败，请重新选择文件'}), 500

    try:
        order_id, pickup_code, est_price = create_order_from_saved_file(
            original_name, final_path, color, duplex, remark, copies, item)
    except Exception:
        # create_order_from_saved_file 失败时自己已经删过一次；这里判存在再删，
        # 与 /api/upload 那条路一个字不差。
        discard_upload_file(final_path)
        logger.exception('预上传下单失败：下单人=%s 文件=%s token=%s ip=%s',
                         g.user['nickname'], original_name, token, client_ip())
        return jsonify({'code': 500, 'msg': '下单失败，请稍后重试'}), 500

    logger.info('新订单 #%s（预上传）下单人=%s 文件=%s 类别=%s 单双面=%s 份数=%s '
                '价目项=%s 单号=%s ip=%s',
                order_id, g.user['nickname'], original_name, color, duplex, copies,
                pricing.format_item_label(item) if item else '未选',
                pickup_code, client_ip())
    return jsonify({
        'code': 0,
        'msg': '订单已提交',
        'order_id': order_id,
        'pickup_code': pickup_code,
        'est_price': est_price,
    })
