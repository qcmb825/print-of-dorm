"""routes/order_options.py —— 打印选项：预设打印服务、纸张类型的查询与后台维护。

这一块和 routes/announcements.py 是同一类东西（管理员维护的一小张配置表），
但有一条关键区别：**这里的每一条都会被抄进订单里**。

预设的文本、纸张的名字和备注，在下单那一刻会整段复制到 orders
（preset_content / paper_name / paper_remark）。所以管理员之后随便改、随便删，
老订单读出来的仍然是当时那句原话 —— 打印员照着三个月的记录核对活件时，
看到的不会是一段被人改过的要求。

## 预设打印服务现在是一条「服务」，不只是一段文本（v22 起）

一条预设可以带四样东西：

  · content     —— 描述（学生下单时看到的、抄进订单当快照的那句话）
  · 附带文档    —— doc_file / doc_name，住 config.PRESET_DOC_FOLDER。
                    学生**只能在线看**（`GET /api/preset-doc/<id>`），界面上没有下载入口。
  · price_item_id —— 绑一条价目项（这条服务用什么纸、什么工艺）
  · preset_price  —— 这条服务的定价（元/份）；填了就不再按页数公式估

为什么要把后面三样加进来：原先预设只能描述要求，价格和纸还得学生自己再选一遍，
于是很容易出现「选的服务写着胶装、纸却选了相纸」这种自相矛盾的组合 ——
而管理员看着这类订单也没法判断学生到底想要什么。把纸和价捆在服务里，
学生就只需要选「哪条服务 + 几份」。
"""

import os
import uuid
from urllib.parse import quote

from flask import Blueprint, Response, g, jsonify, request

from auth import login_required, roles_required
from config import (PAPER_NAME_MAX, PAPER_REMARK_MAX, PRESET_CONTENT_MAX, PRESET_CONTENT_MIN,
                    PRESET_DOC_EXTENSIONS, PRESET_DOC_FOLDER, PRESET_DOC_MAX_BYTES,
                    PRESET_PRICE_MAX, ROLE_ADMIN, ROLE_SUPER, logger)
from db import db_conn, find_paper_type, find_preset
import pricing
from security import audit_action, client_ip, security_event
from utils import content_signature_error, resolve_contained_file

bp = Blueprint('order_options', __name__)


# 所有管理员都能维护打印选项（含新建/改名/停用/删除），这一点和账号管理不同 ——
# 账号管理把写接口收在 ROLE_SUPER，因为它动的是别人的身份，出事别人替你背。
# 而「楼里现在有哪种纸」正是打印员自己最清楚的事，还要求他去喊默认管理员
# 才能加一种纸，这条配置最后就会变成没人维护的摆设。
#
# 删除也不可怕：订单存的是文本快照，删掉一种纸不会让任何历史订单读不出来。
# 真正危险的动作（改别人的角色、看别人的明文密码）才归 ROLE_SUPER。


def _clean_text(value, field_label, max_length, min_length=1):
    """清洗一个人工填写的单行文本，返回 (文本, 错误信息)。

    换行和制表符一律拒掉：这些东西在详情页里是一行一个字段，
    混进一个换行就会把后面的字段挤到看不见的地方，而且没有任何报错。
    金额那边因为「数字里有 \n」而踩过同一类坑（见 utils.parse_price）。
    """
    text = (value or '').strip()
    if len(text) < min_length:
        return None, '请填写%s' % field_label
    if len(text) > max_length:
        return None, '%s不能超过 %s 个字' % (field_label, max_length)
    if not all(ch.isprintable() for ch in text):
        return None, '%s里不能有换行或制表符' % field_label
    return text, None



def _parse_preset(data, conn):
    """校验预设内容，返回 (字典, 错误信息)。

    content 仍然是主体：学生下单时看到的那句话，和订单里记下来的那句话，
    必须是同一份东西。

    v22 起还能带两样（都选填）：

      · price_item_id —— 绑一条价目项。**校验它存在且启用**：绑一条停用/删掉的纸，
        学生下单时就会卡在一个谁也解释不清的地方（「这条服务用的是哪一档？」）。
        传 null = 解绑。
      · preset_price —— 这条服务的定价（元/份）。传 null = 不定价，回到按页数估。

    ⚠️ 这两个字段按「键在不在」判断，**不是按值**：表单里把价格清空
    （键在、值是 null）和「客户端版本太老、根本没这个字段」是两件事 ——
    前者要把价格清掉，后者必须保持原值，否则一次保存就会把管理员设过的价悄悄清空，
    而列表里那一行看着还是原来的数字。

    文档（doc_file / doc_name）**不在这里**：它走独立的多部分上传接口，
    让一次 JSON「保存」顺手改掉文件名的话，就能把库里的引用指向一个不存在的文件。
    """
    content, error = _clean_text(
        data.get('content'), '预设内容', PRESET_CONTENT_MAX, PRESET_CONTENT_MIN)
    if error:
        return None, error
    payload = {'content': content}

    if 'price_item_id' in data:
        raw_item = data.get('price_item_id')
        if raw_item in (None, '', 0, '0'):
            payload['price_item_id'] = None
        else:
            if isinstance(raw_item, bool):
                return None, '价目项不合法，刷新页面重新选择'
            try:
                item_id = int(raw_item)
            except (TypeError, ValueError):
                return None, '价目项不合法，刷新页面重新选择'
            item = pricing.find_item(conn, item_id)
            if item is None or item['is_active'] != 1:
                # 停用的也不许绑：学生下单时那一档根本不在清单里，
                # 而服务却声称自己用它 —— 到了打印台上就是「纸不对」。
                return None, '这一档价目项不存在或已停用，请到价目表里确认'
            payload['price_item_id'] = item_id

    if 'preset_price' in data:
        raw_price = data.get('preset_price')
        if raw_price in (None, ''):
            payload['preset_price'] = None
        else:
            amount, error = pricing.parse_coefficient(raw_price, '本服务定价')
            if error:
                return None, error
            if amount > PRESET_PRICE_MAX:
                return None, '本服务定价不能超过 %s 元' % PRESET_PRICE_MAX
            payload['preset_price'] = amount

    return payload, None



def _resolve_doc_path(filename):
    """把库里的文档文件名还原成全路径，并确认它没跑出文档目录。

    守卫本体在 utils.resolve_contained_file（收款码、机器人二维码、预设文档
    三处共用一份，各写一遍迟早漏一处，而漏掉的那处就是个能读任意文件的口子）。
    这里只是把目录这一项固定下来，顺带让本模块的调用点读起来短一些。
    """
    return resolve_contained_file(PRESET_DOC_FOLDER, filename)


def _doc_mimetype(filename):
    ext = (filename or '').rsplit('.', 1)[-1].lower()
    return {'pdf': 'application/pdf', 'png': 'image/png'}.get(ext, 'image/jpeg')


def _remove_doc_file(filename):
    """删掉一份文档文件。删不掉只记 warning —— 库里已经不再引用它了。"""
    path = _resolve_doc_path(filename)
    if path is None:
        return
    try:
        path.unlink()
    except OSError:
        logger.warning('预设文档删除失败（库里已经撤下，界面不受影响）')



def _parse_paper(data):
    """校验纸张类型，返回 (字典, 错误信息)。remark 可以为空。

    price_delta 是「这种纸每页比标准价贵多少」（元/页），默认 0 ——
    A3 比 A4 贵就是填在这里。**可以为 0、不能为负**：加价的默认状态是「不加价」，
    而负的加价会让总价往下走，那是改价目表的事，不是纸张属性的事
    （口径与 pricing._as_coefficient 完全一致 —— 那边是公式侧的兜底，
    这里是入口侧的提前拦截，两边说的是同一句话）。
    """
    name, error = _clean_text(data.get('name'), '纸张名称', PAPER_NAME_MAX)
    if error:
        return None, error
    remark = (data.get('remark') or '').strip()
    if len(remark) > PAPER_REMARK_MAX:
        return None, '备注不能超过 %s 个字' % PAPER_REMARK_MAX
    if remark and not all(ch.isprintable() for ch in remark):
        return None, '备注里不能有换行或制表符'
    raw_delta = data.get('price_delta')
    if raw_delta in (None, ''):
        # 不给就保持原值：老前端（还没这个输入框的那一版）提交时不会带这个字段，
        # 而把它当成 0 会把管理员设过的加价**悄悄清掉**（PUT 是全量覆盖）。
        delta = None
    else:
        delta, error = pricing.parse_coefficient(raw_delta, '每页加价')
        if error:
            return None, error
    # 空备注存 NULL 而不是空串：读的地方只需要判一次 None，
    # 不用再同时防 '' —— 两种「空」是同一个坑埋两次。
    return {'name': name, 'remark': remark or None, 'price_delta': delta}, None



@bp.route('/api/print-options')
@login_required
def api_print_options():
    """学生下单页要的两份清单：启用中的预设 + 启用中的纸张类型。

    一次全给，不拆成两个接口：这两份清单本来就是一起用的（选了预设就不能传文件、
    选了纸张才谈得上份数），拆开只会让下单页多一次往返、多一段「一个到了一个没到」
    的中间态要处理。

    只发启用中的：停用的项不该出现在学生的下拉框里。管理端要看全部，
    那有它自己的 /api/admin/* 接口。

    预设这一项顺带把自己绑的价目项 **翻译成显示名**（price_item_label）——
    翻译由服务端做，是因为前端手上只有「启用中」的价目表：预设绑的那一档
    被管理员停用之后，前端就拼不出它叫什么了（屏幕上会变成一个裸 id），
    而这条服务其实还能照常用、名字也该照常显示。
    """
    with db_conn() as conn:
        presets = conn.execute('''
            SELECT p.id, p.content, datetime(p.update_time, 'localtime') AS update_time,
                   p.doc_name, p.price_item_id, p.preset_price,
                   i.paper AS item_paper, i.kind AS item_kind, i.is_active AS item_active
            FROM print_presets p
            LEFT JOIN price_items i ON i.id = p.price_item_id
            WHERE p.is_active = 1
            ORDER BY p.id DESC
        ''').fetchall()
        # 价目表（v20 起下单时选的就是它，而不是纸张）——
        # 与 /api/price-table 同一个取数函数，**不是各查一遍**：下单页要的是同一份东西，
        # 两处各写一条 SQL，迟早出现「价目表页显示 8 条、下单页只有 7 条」。
        items = pricing.list_items(conn, only_active=True)
        #    纸张那一段是**遗留**：v20 起纸张已经并进价目表，下单表单不再用它。
        #    留着它有两个实在的理由：① 老订单要读得出当时的纸（存的是快照，但
        #    SettingsView 的「默认纸张」偏好还引用着纸张 id）；② 回归脚本（smoke）
        #    还在验这张表的增删改查。**新加的下单相关字段一律走 price_items**，
        #    不要再往 paper_types 上挂东西 —— 那是一个正在退场的概念。
        papers = conn.execute('''
            SELECT id, name, remark, datetime(update_time, 'localtime') AS update_time
            FROM paper_types
            WHERE is_active = 1
            ORDER BY id ASC
        ''').fetchall()
    return jsonify({
        'code': 0,
        'presets': [_preset_public(dict(row)) for row in presets],
        'paper_types': [dict(row) for row in papers],
        'price_items': items,
    })



def _preset_public(row):
    """把一条预设整理成学生端要的形状（附不带附件内容，只带「有没有」）。"""
    label = pricing.format_item_label({'paper': row.pop('item_paper', None),
                                       'kind': row.pop('item_kind', None)})
    active = row.pop('item_active', None)
    row['price_item_label'] = label
    # 绑的这一档被停用了：名字照给，但界面要能提示「这一档已停用」——
    # 学生照价下单、打印员却发现纸不打了，是这条链路里最贵的一种误会。
    row['price_item_stopped'] = bool(row['price_item_id']) and not active
    row['has_doc'] = bool(row.get('doc_name'))
    return row



# ---- 管理端：预设打印服务 ----

@bp.route('/api/admin/print-presets')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_print_presets():
    """预设台账，含已停用的，方便改回来。"""
    with db_conn() as conn:
        # used_count 是给「删不删」这道判断用的：预设删掉之后，
        # 历史订单里那句话还在（存的是快照），但「当初是哪一条」就断了。
        # 不显示这个数字，管理员只能在删完之后才发现自己没有回头路。
        #
        # 统计口径是 COALESCE(preset_group_id, preset_id)，也就是「这一组里有多少单」：
        # 管理员手动归入的文件单也算。只数 preset_id 的话会出现「刚把 5 单归进去，
        # 台账上还写着『还没有人用过』」—— 那句话不报错，只是假的，
        # 而它会直接把人推向「删掉吧，反正没人用」。
        rows = conn.execute('''
            SELECT p.id, p.content, p.is_active, p.doc_name, p.price_item_id, p.preset_price,
                   datetime(p.create_time, 'localtime') AS create_time,
                   datetime(p.update_time, 'localtime') AS update_time,
                   u.nickname AS author,
                   i.paper AS item_paper, i.kind AS item_kind, i.is_active AS item_active,
                   (SELECT COUNT(*) FROM orders o
                     WHERE COALESCE(o.preset_group_id, o.preset_id) = p.id) AS used_count
            FROM print_presets p
            LEFT JOIN users u ON u.id = p.created_by
            LEFT JOIN price_items i ON i.id = p.price_item_id
            ORDER BY p.is_active DESC, p.id DESC
            LIMIT 100
        ''').fetchall()
    presets = []
    for row in rows:
        item = dict(row)
        item['price_item_label'] = pricing.format_item_label(
            {'paper': item.pop('item_paper', None), 'kind': item.pop('item_kind', None)})
        item['price_item_stopped'] = bool(item['price_item_id']) and not item.pop(
            'item_active', None)
        # has_doc 与学生端那份（_preset_public）**同一个口径**：两边都算一遍的话，
        # 迟早出现「管理端说没文档、学生端却点得开」——而这条差异不报错，
        # 只会在管理员按列表判断「要不要补一份文档」时把他带偏。
        item['has_doc'] = bool(item.get('doc_name'))
        presets.append(item)
    return jsonify({'code': 0, 'presets': presets})



@bp.route('/api/admin/print-presets', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_print_preset():
    data = request.get_json(silent=True) or {}
    with db_conn() as conn:
        payload, error = _parse_preset(data, conn)
        if error:
            return jsonify({'code': 400, 'msg': error}), 400
        cursor = conn.execute('''
            INSERT INTO print_presets (content, is_active, created_by,
                                       price_item_id, preset_price)
            VALUES (?, 1, ?, ?, ?)
        ''', (payload['content'], g.user['id'],
              payload.get('price_item_id'), payload.get('preset_price')))
        conn.commit()
        new_id = cursor.lastrowid
    logger.info('新建预设打印服务 #%s 操作人=%s(%s) ip=%s',
                new_id, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '预设已创建', 'id': new_id})



@bp.route('/api/admin/print-presets/<int:pid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_print_preset(pid):
    """改预设内容（含绑定的价目项与定价）。

    改之前的那句话还能在历史订单里读到（orders.preset_content 存的是快照），
    所以这里不需要「改了会影响老订单」那种确认 —— 影响不到。

    文档不在这里改：它走 /doc 那两条接口。理由见 _parse_preset 的 docstring。
    """
    data = request.get_json(silent=True) or {}
    with db_conn() as conn:
        row = find_preset(conn, pid)
        if row is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        payload, error = _parse_preset(data, conn)
        if error:
            return jsonify({'code': 400, 'msg': error}), 400
        # 请求里没带的键保持原值（见 _parse_preset 里那段「按键在不在判断」）。
        item_id = payload['price_item_id'] if 'price_item_id' in payload else row['price_item_id']
        preset_price = (payload['preset_price'] if 'preset_price' in payload
                        else row['preset_price'])
        conn.execute('''
            UPDATE print_presets SET content = ?, price_item_id = ?, preset_price = ?,
                   update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payload['content'], item_id, preset_price, pid))
        conn.commit()
    logger.info('修改预设打印服务 #%s 操作人=%s(%s) ip=%s',
                pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '预设已更新'})



@bp.route('/api/admin/print-presets/<int:pid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_print_preset(pid):
    """启用 / 停用。停用只是不再出现在学生的可选项里，记录和引用都保留。"""
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    with db_conn() as conn:
        if find_preset(conn, pid) is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        conn.execute('UPDATE print_presets SET is_active = ?, update_time = CURRENT_TIMESTAMP '
                     'WHERE id = ?', (1 if active else 0, pid))
        conn.commit()
    logger.info('%s预设打印服务 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})



@bp.route('/api/admin/print-presets/<int:pid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_print_preset(pid):
    """删除预设。

    可以直接删是因为订单存了文本快照 —— 历史订单读的还是当时那句话，
    不会因为这条被删掉而变成空白。真要说损失，只有「这一单当初用的是哪条预设」
    里的那个 id 再也点不开，而那句话本身还在订单里摆着。
    附带的那份文档跟着一起删：它是这条服务的一部分，留着就是一份没人引用的孤儿文件。

    顺序是**先删库、再删文件**（与撤回订单同一条纪律）：反过来的话，
    文件删成功而写库失败，列表里那条服务好端端地摆着、点「预览」却是个空白 ——
    这种状态只能靠人去比对，而且看不出发生过什么。
    """
    with db_conn() as conn:
        row = find_preset(conn, pid)
        if row is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        doc_file = row['doc_file'] if 'doc_file' in row.keys() else None
        conn.execute('DELETE FROM print_presets WHERE id = ?', (pid,))
        conn.commit()
    _remove_doc_file(doc_file)
    # 删除是破坏性动作，走审计留痕（同一句里不放预设正文：那是可能很长的中文，
    # 审计日志里要的是一眼能看懂的「谁删了哪一条」）。
    audit_action('delete_print_preset', '删除预设打印服务 #%s' % pid)
    logger.info('删除预设打印服务 #%s 操作人=%s(%s) ip=%s',
                pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '预设已删除'})


# ---- 预设的附带文档（管理员传，学生在线看）----

@bp.route('/api/admin/print-presets/<int:pid>/doc', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_upload_preset_doc(pid):
    """上传（或替换）一条打印服务的附带文档。

    校验顺序照抄二维码那一套：扩展名白名单 → 读进内存判大小 → 落盘 → 内容嗅探。
    先读进内存再判大小，是为了「绝不会有一个超限的文件先落在磁盘上」。

    只收 pdf / jpg / png（见 config.PRESET_DOC_EXTENSIONS）：这几种浏览器能原样渲染，
    而这份文档的全部用途就是「让学生在线看一眼长什么样」。docx 转文本再预览
    会让学生看到的排版和真正打出来的不是一回事 —— 给一份会骗人的预览比不给更糟。
    """
    upload = request.files.get('file')
    if upload is None or not upload.filename:
        return jsonify({'code': 400, 'msg': '请选择要上传的文档'}), 400
    original_name = os.path.basename(upload.filename)
    ext = original_name.rsplit('.', 1)[1].lower() if '.' in original_name else ''
    if ext not in PRESET_DOC_EXTENSIONS:
        security_event('preset_doc_blocked_type',
                       '上传了不在白名单内的预设文档「%s」' % original_name[:80])
        return jsonify({
            'code': 400,
            'msg': '只支持能在网页里直接看的格式：'
                   + '、'.join('.' + e for e in PRESET_DOC_EXTENSIONS)
                   + '（Word 文档请先导出成 PDF）',
        }), 400
    data = upload.read()
    if not data:
        return jsonify({'code': 400, 'msg': '这个文件是空的（0 字节），换一个再试'}), 400
    if len(data) > PRESET_DOC_MAX_BYTES:
        return jsonify({
            'code': 400,
            'msg': '文档太大了（上限 %d MB）'
                   % (PRESET_DOC_MAX_BYTES // (1024 * 1024)),
        }), 400

    with db_conn() as conn:
        row = find_preset(conn, pid)
        if row is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
    old_file = row['doc_file'] if 'doc_file' in row.keys() else None

    new_file = '%s.%s' % (uuid.uuid4().hex, ext)
    save_path = os.path.join(PRESET_DOC_FOLDER, new_file)
    try:
        with open(save_path, 'wb') as fh:
            fh.write(data)
    except OSError:
        logger.exception('预设文档落盘失败：%s', save_path)
        return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    # 内容嗅探放在**落盘之后**：utils 那个函数是按路径读开头几个字节的
    # （它刻意不把整份文件读进内存）。对不上就把刚落的那份删掉 ——
    # 这份文件会被摆到学生面前当"标准样张"，一份名不副实的更该拦。
    problem = content_signature_error(save_path, ext)
    if problem:
        try:
            os.remove(save_path)
        except OSError:
            pass
        security_event('preset_doc_content_mismatch',
                       '预设文档「%s」的内容与扩展名 %s 不符' % (original_name[:80], ext))
        return jsonify({'code': 400, 'msg': problem}), 400

    try:
        with db_conn() as conn:
            conn.execute('''
                UPDATE print_presets SET doc_file = ?, doc_name = ?,
                       update_time = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (new_file, original_name[:120], pid))
            conn.commit()
    except Exception:
        # 写库失败：把刚落盘的那份删掉，别留孤儿文件（与上传下单同一套纪律）
        try:
            os.remove(save_path)
        except OSError:
            pass
        logger.exception('预设文档写库失败，已清理落盘文件')
        return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    # **库里改成功之后**才删旧文件（反过来的话，中间失败会留下
    # 「库里指着旧名字、文件却没」的空预览，而管理员完全不知道发生过什么）。
    _remove_doc_file(old_file)

    logger.info('预设打印服务 #%s 的文档已更新（%s，%s 字节）操作人=%s(%s) ip=%s',
                pid, original_name[:80], len(data),
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '文档已上传', 'doc_name': original_name[:120]})


@bp.route('/api/admin/print-presets/<int:pid>/doc', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_preset_doc(pid):
    """撤下附带文档（这条服务保留，学生端只剩那段描述）。"""
    with db_conn() as conn:
        row = find_preset(conn, pid)
        if row is None:
            return jsonify({'code': 404, 'msg': '预设不存在'}), 404
        old_file = row['doc_file'] if 'doc_file' in row.keys() else None
        if not old_file:
            return jsonify({'code': 404, 'msg': '这条服务还没有上传文档'}), 404
        conn.execute('UPDATE print_presets SET doc_file = NULL, doc_name = NULL, '
                     'update_time = CURRENT_TIMESTAMP WHERE id = ?', (pid,))
        conn.commit()
    _remove_doc_file(old_file)
    logger.info('预设打印服务 #%s 的文档已撤下 操作人=%s(%s) ip=%s',
                pid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '文档已撤下'})


@bp.route('/api/preset-doc/<int:pid>')
@login_required
def api_preset_doc(pid):
    """预设服务的附带文档原图：**登录即可看**（学生也要看，所以不是管理员接口）。

    它是这条服务的「标准样张」——藏起来这个功能就不成立了。

    「不提供下载」在服务端能做的那一半：`Content-Disposition: inline` +
    `X-Content-Type-Options: nosniff`，再由前端用 canvas 渲染成图片
    （见 components/PresetDocViewer.vue）—— 界面上没有任何下载入口。
    **这不等于文件拿不到**：能看到的字节本来就已经在用户的浏览器里了，
    真正的防线是「只给登录用户」这一条，别把它当成 DRM。
    """
    with db_conn() as conn:
        row = find_preset(conn, pid)
    if row is None:
        return jsonify({'code': 404, 'msg': '这条打印服务不存在'}), 404
    doc_file = row['doc_file'] if 'doc_file' in row.keys() else None
    path = _resolve_doc_path(doc_file)
    if path is None:
        return jsonify({'code': 404, 'msg': '这条服务没有附带文档'}), 404
    try:
        data = path.read_bytes()
    except OSError:
        logger.warning('预设文档读不到：%s', path.name)
        return jsonify({'code': 404, 'msg': '文档文件不见了'}), 404
    resp = Response(data, mimetype=_doc_mimetype(doc_file))
    # 中文文件名要走 RFC 5987 的 filename*，直接塞进 filename= 会被
    # Latin-1 编码报错（或者被浏览器读成一串问号）。
    shown = (row['doc_name'] if 'doc_name' in row.keys() else None) or path.name
    resp.headers['Content-Disposition'] = "inline; filename*=UTF-8''%s" % quote(shown)
    resp.headers['X-Content-Type-Options'] = 'nosniff'
    resp.headers['Cache-Control'] = 'no-store'
    return resp



# ---- 管理端：纸张类型 ----

@bp.route('/api/admin/paper-types')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_paper_types():
    with db_conn() as conn:
        # 同预设：used_count 让「删除」这个动作在点下去之前就有分量。
        rows = conn.execute('''
            SELECT t.id, t.name, t.remark, t.is_active, t.price_delta,
                   datetime(t.create_time, 'localtime') AS create_time,
                   datetime(t.update_time, 'localtime') AS update_time,
                   u.nickname AS author,
                   (SELECT COUNT(*) FROM orders o WHERE o.paper_type_id = t.id) AS used_count
            FROM paper_types t
            LEFT JOIN users u ON u.id = t.created_by
            ORDER BY t.is_active DESC, t.id ASC
            LIMIT 100
        ''').fetchall()
    return jsonify({'code': 0, 'paper_types': [dict(row) for row in rows]})



def _name_taken(conn, name, exclude_id=None):
    """查名字有没有被占用（不区分大小写，连已停用的也算）。

    查重查在应用层而不是建唯一索引，是因为索引会连已停用的记录一起挡住，
    于是「停用 A4 之后再建一条 A4」会撞 IntegrityError，报出来的还是数据库层的错，
    用户只看到「保存失败」。查在应用层才能给出一句能看懂的话。
    """
    sql = 'SELECT id FROM paper_types WHERE name = ?'
    params = [name]
    if exclude_id is not None:
        sql += ' AND id <> ?'
        params.append(exclude_id)
    return conn.execute(sql, params).fetchone() is not None



@bp.route('/api/admin/paper-types', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_paper_type():
    payload, error = _parse_paper(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    with db_conn() as conn:
        if _name_taken(conn, payload['name']):
            # 409 而不是 400：这不是「填错了」，是「跟已有的撞了」，
            # 前端据此可以把冲突说得更具体。
            return jsonify({'code': 409, 'msg': '已经有同名纸张了，换一个名字或直接改那一条'}), 409
        cursor = conn.execute('''
            INSERT INTO paper_types (name, remark, is_active, created_by, price_delta)
            VALUES (?, ?, 1, ?, ?)
        ''', (payload['name'], payload['remark'], g.user['id'],
              payload['price_delta'] or 0.0))
        conn.commit()
        new_id = cursor.lastrowid
    logger.info('新建纸张类型 #%s 名称=%s 操作人=%s(%s) ip=%s',
                new_id, payload['name'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '纸张类型已创建', 'id': new_id})



@bp.route('/api/admin/paper-types/<int:tid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_paper_type(tid):
    payload, error = _parse_paper(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    with db_conn() as conn:
        if find_paper_type(conn, tid) is None:
            return jsonify({'code': 404, 'msg': '纸张类型不存在'}), 404
        if _name_taken(conn, payload['name'], exclude_id=tid):
            return jsonify({'code': 409, 'msg': '已经有同名纸张了，换一个名字'}), 409
        if payload['price_delta'] is None:
            # 请求里没带这个字段就不动它（理由见 _parse_paper 里那段）。
            conn.execute('''
                UPDATE paper_types SET name = ?, remark = ?, update_time = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (payload['name'], payload['remark'], tid))
        else:
            conn.execute('''
                UPDATE paper_types SET name = ?, remark = ?, price_delta = ?,
                       update_time = CURRENT_TIMESTAMP
                WHERE id = ?
            ''', (payload['name'], payload['remark'], payload['price_delta'], tid))
        conn.commit()
    logger.info('修改纸张类型 #%s 名称=%s 操作人=%s(%s) ip=%s',
                tid, payload['name'], g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '纸张类型已更新'})



@bp.route('/api/admin/paper-types/<int:tid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_paper_type(tid):
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    with db_conn() as conn:
        if find_paper_type(conn, tid) is None:
            return jsonify({'code': 404, 'msg': '纸张类型不存在'}), 404
        conn.execute('UPDATE paper_types SET is_active = ?, update_time = CURRENT_TIMESTAMP '
                     'WHERE id = ?', (1 if active else 0, tid))
        conn.commit()
    logger.info('%s纸张类型 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})



@bp.route('/api/admin/paper-types/<int:tid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_paper_type(tid):
    """删除纸张类型。

    不阻止「还有订单用过它」—— 订单里存的是名字和备注的快照，
    删掉之后老订单照样显示得出当时用的是什么纸。真要拦住，就得先扫一遍整张订单表，
    而换来的只是一句「不能删」，管理员最后还是得先去停用，等于多绕一步。
    """
    with db_conn() as conn:
        row = find_paper_type(conn, tid)
        if row is None:
            return jsonify({'code': 404, 'msg': '纸张类型不存在'}), 404
        conn.execute('DELETE FROM paper_types WHERE id = ?', (tid,))
        conn.commit()
    audit_action('delete_paper_type', '删除纸张类型 #%s' % tid)
    logger.info('删除纸张类型 #%s 操作人=%s(%s) ip=%s',
                tid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '纸张类型已删除'})
