"""routes/lottery.py —— 抽奖：学生参与 + 管理端管理。

业务口径全部定死在这一段，别在调用方再推一遍：

  资格  **下单时间与取件时间都落在近 30 个自然日内**。取件时刻以
        order_logs 里 action='pickup' 的留痕为准（orders 表上没有取件时刻列，
        update_time 会被任何改动刷掉，见 db.py 那两列的注释）。资格在**加入时
        快照**：开奖时不重算 —— 开奖那一刻他仍是参与者，事后订单怎么变都不追溯，
        不然「撤回旧订单会不会取消我已中的奖」这种问题永远答不清。
  人数  一人一期一票。lottery_entries 的唯一索引就是这条规矩本身：
        并发下两个 POST 同时过校验，也只插得进一行。
  结余  「同奖品才累计」：建新一期时看**最近一条**已开奖/已归档的活动，
        奖品名相同才把「份数 - 中奖人数」带进来；换奖品即清零 —— 洞洞板的
        结余不该悄悄变成另一种奖品的份数。奖品名就是结余的钥匙，改名 = 换奖品，
        管理端表单会提示这一点。
  在架  同一时间只允许一个 open / drawn（未归档）的活动。学生端只看得到这一个；
        要开下一期，先把上一期归档或删除 —— 否则「我参加的是哪一期」
        在界面上就说不清了。

接口分级与学生端其他页同一哲学：**参与人名单只给昵称**；真实姓名、学号、
宿舍、QQ 只在管理端明细里出现（routes/orders.py 的 decorate_orders 是同一做法）。
"""
import os
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

from flask import Blueprint, g, jsonify, request, send_file

from auth import login_required, roles_required
from config import (LOTTERY_IMAGE_EXTENSIONS, LOTTERY_IMAGE_FOLDER, LOTTERY_IMAGE_MAX_BYTES,
                    LOTTERY_PARTICIPANT_LIMIT, ORDER_LOG_PICKUP, ROLE_ADMIN, ROLE_SUPER,
                    logger)
from db import db_conn
from security import actor_label, client_ip, security_event
from utils import content_signature_error

import lottery_worker

bp = Blueprint('lottery', __name__)

_MIME_TYPES = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
}

_PRIZE_NAME_MAX = 40
_QUANTITY_MAX = 10000


# ---- 小工具 ----

def _utcnow():
    """库里的时刻都是 UTC 字符串（见 db.py 的时间戳约定），比较前先造同一个格式。"""
    return datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M:%S')


def _to_local(utc_str):
    """出 API 前把 UTC 串转成本地时间。

    全站的约定是「库里存 UTC，接口返回前用 datetime(col,'localtime') 转成本地」
    （routes/orders.py 的列表 SELECT、frontend 的 shortTime 都按这个来）。
    这里用 Python 做同一个转换：datetime.astimezone() 无参时按系统时区解释，
    与 SQLite 的 'localtime' 用的是同一个来源。"""
    if not utc_str:
        return None
    try:
        dt = datetime.strptime(utc_str, '%Y-%m-%d %H:%M:%S').replace(tzinfo=timezone.utc)
    except ValueError:
        return utc_str
    return dt.astimezone().strftime('%Y-%m-%d %H:%M:%S')


def _to_utc_stamp(ms):
    """前端传来的时刻（本地墙钟的 epoch 毫秒）-> 库里那份 UTC 字符串。

    管理员在表单里挑的是「北京时间几点开」，前端把它当 epoch 毫秒发上来；
    这里按本地时区解释再转 UTC 入库，与「库里永远存 UTC、展示层转 localtime」
    的全库约定对齐。返回 None 表示值不合法。"""
    try:
        value = int(ms)
    except (TypeError, ValueError):
        return None
    if value <= 0:
        return None
    return datetime.fromtimestamp(value / 1000).astimezone(timezone.utc).strftime(
        '%Y-%m-%d %H:%M:%S')


def _validate_lottery(data):
    """校验建/改活动要用的字段，返回 (字典, 错误信息)。"""
    prize_name = (data.get('prize_name') or '').strip()
    if not prize_name:
        return None, '奖品名称不能为空'
    if len(prize_name) > _PRIZE_NAME_MAX:
        return None, '奖品名称不能超过 %d 个字' % _PRIZE_NAME_MAX
    try:
        quantity = int(data.get('prize_quantity'))
    except (TypeError, ValueError):
        return None, '份数必须是正整数'
    if quantity < 1 or quantity > _QUANTITY_MAX:
        return None, '份数必须在 1–%d 之间' % _QUANTITY_MAX
    draw_at = _to_utc_stamp(data.get('draw_at_ms'))
    if not draw_at:
        return None, '开奖时间不合法'
    if draw_at <= _utcnow():
        return None, '开奖时间必须晚于现在'
    archive_ms = data.get('archive_at_ms')
    archive_at = _to_utc_stamp(archive_ms) if archive_ms else None
    if archive_ms and not archive_at:
        return None, '归档时间不合法'
    if archive_at and archive_at <= draw_at:
        return None, '归档时间必须晚于开奖时间'
    return {
        'prize_name': prize_name,
        'prize_quantity': quantity,
        'draw_at': draw_at,
        'archive_at': archive_at,
    }, ''


def _current_lottery(conn):
    """当前「在架」的活动（open / drawn 未归档）。建活动时挡住了并存，
    这里 ORDER BY id DESC 只是防御：手工改库造出两期在架时，学生看到最新那期，
    而不是两期数据互相顶。"""
    return conn.execute('''
        SELECT * FROM lotteries
        WHERE status IN ('open', 'drawn')
        ORDER BY id DESC LIMIT 1
    ''').fetchone()


def _is_eligible(conn, user_id):
    """近 30 个自然日内「下过单且取件成功」。口径见模块头。

    日期比较沿用榜单那套写法（-29 days 含今天共 30 个自然日，见
    routes/orders.py 的 RECENT）—— 同一个口径在两处各写一份是因为
    它们描述的是两件不同的事（榜单看下单、抽奖看整条链），不共用常量。"""
    row = conn.execute('''
        SELECT 1
        FROM orders o
        JOIN order_logs l ON l.order_id = o.id
        WHERE o.user_id = ?
          AND l.action = ?
          AND date(o.create_time, 'localtime') >= date('now', 'localtime', '-29 days')
          AND date(l.create_time, 'localtime') >= date('now', 'localtime', '-29 days')
        LIMIT 1
    ''', (user_id, ORDER_LOG_PICKUP)).fetchone()
    return row is not None


def _compute_carry_in(conn, prize_name):
    """上一期同奖品的结余（份数 - 中奖人数）。口径见模块头。"""
    prev = conn.execute('''
        SELECT id, prize_name, prize_quantity FROM lotteries
        WHERE status IN ('drawn', 'archived')
        ORDER BY id DESC LIMIT 1
    ''').fetchone()
    if prev is None or prev['prize_name'] != prize_name:
        return 0
    row = conn.execute(
        'SELECT COUNT(*) AS n FROM lottery_entries WHERE lottery_id = ? AND is_winner = 1',
        (prev['id'],),
    ).fetchone()
    return max(0, int(prev['prize_quantity']) - int(row['n']))


def _payload(conn, lot, user_id):
    """学生端一期活动的完整载荷。参与人只给昵称（分级见模块头）。"""
    lottery_id = lot['id']
    count = conn.execute(
        'SELECT COUNT(*) AS n FROM lottery_entries WHERE lottery_id = ?', (lottery_id,)
    ).fetchone()['n']
    joined_row = conn.execute(
        'SELECT is_winner FROM lottery_entries WHERE lottery_id = ? AND user_id = ?',
        (lottery_id, user_id),
    ).fetchone()
    participants = [
        r['nickname'] for r in conn.execute('''
            SELECT u.nickname FROM lottery_entries e
            JOIN users u ON u.id = e.user_id
            WHERE e.lottery_id = ?
            ORDER BY e.create_time ASC, e.id ASC
            LIMIT ?
        ''', (lottery_id, LOTTERY_PARTICIPANT_LIMIT)).fetchall()
    ]
    winners = []
    if lot['status'] == 'drawn':
        winners = [
            r['nickname'] for r in conn.execute('''
                SELECT u.nickname FROM lottery_entries e
                JOIN users u ON u.id = e.user_id
                WHERE e.lottery_id = ? AND e.is_winner = 1
                ORDER BY e.create_time ASC, e.id ASC
                LIMIT ?
            ''', (lottery_id, LOTTERY_PARTICIPANT_LIMIT)).fetchall()
        ]
    joined = joined_row is not None
    if joined:
        eligible, reason = True, None
    elif lot['status'] != 'open':
        eligible, reason = False, 'closed'
    elif lot['draw_at'] <= _utcnow():
        eligible, reason = False, 'closed'
    else:
        eligible = _is_eligible(conn, user_id)
        reason = None if eligible else 'no_pickup'
    return {
        'exists': True,
        'id': lottery_id,
        'status': lot['status'],
        'prize_name': lot['prize_name'],
        'prize_quantity': lot['prize_quantity'],
        'carry_in': lot['carry_in'],
        'draw_at': _to_local(lot['draw_at']),
        'archive_at': _to_local(lot['archive_at']),
        'drawn_at': _to_local(lot['drawn_at']),
        'has_image': bool(lot['prize_image_file']),
        #    配图的缓存键：浏览器认的是 **URL**，而取图那条路是 /<id>/prize-image
        #    固定路径。只回 has_image 的话，管理员换完图、学生端最长一天仍看旧图
        #    （取图响应带 `Cache-Control: private, max-age=86400`），控制台一个错都没有。
        #    把文件名当版本号发出去，前端拼成 ?v=<文件名>，换图即换 URL。
        #    学生端与管理端都要（管理端列表里也可能渲染缩略图）。
        'image_version': lot['prize_image_file'] or '',
        'participant_count': count,
        'participants': participants,
        'participants_truncated': count > len(participants),
        #    上限本身也给出去：前端原来把「仅列前 500」写死在文案里，而这个数
        #    来自 config（LOTTERY_PARTICIPANT_LIMIT，可被 env 改）—— 改了配置，
        #    界面上的说明就开始说谎。
        'participant_limit': LOTTERY_PARTICIPANT_LIMIT,
        'winners': winners,
        #    中奖名单与参与名单共用同一个 LIMIT，但「被截断了」原先只有参与者那一侧
        #    告诉前端 —— 份数填到几千时，中奖名单只显示前 N 个而界面不说一句，
        #    学生会以为就这么多人中了。开奖时的中奖数 = min(份数, 参与数)，
        #    拿它跟实际发出去的长度比就知道有没有截断（不必再查一次库）。
        'winners_truncated': lot['status'] == 'drawn'
                             and len(winners) < min(int(lot['prize_quantity']), count),
        'joined': joined,
        'is_winner': bool(joined_row and joined_row['is_winner']),
        'eligible': eligible,
        'ineligible_reason': reason,
    }


# ---- 学生端接口 ----

@bp.get('/api/lottery/hint')
@login_required
def api_lottery_hint():
    """导航徽标的轻量探针：有没有在架的活动。学生端布局每次路由切换都调它，
    所以连参与人数都不查 —— 比这重一点，徽标就成了第二个轮询负担。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        lot = _current_lottery(conn)
    return jsonify({'code': 0, 'active': lot is not None,
                    'status': lot['status'] if lot else None})


@bp.get('/api/lottery')
@login_required
def api_lottery():
    """当前活动 + 我的参与状态 + 参与人名单。无在架活动时 exists=false。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        lot = _current_lottery(conn)
        if lot is None:
            return jsonify({'code': 0, 'exists': False})
        return jsonify({'code': 0, **_payload(conn, lot, g.user['id'])})


@bp.post('/api/lottery/join')
@login_required
def api_join():
    """确认参与。资格校验在**这一刻**做（快照口径见模块头）。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        lot = _current_lottery(conn)
        if lot is None:
            return jsonify({'code': 409, 'msg': '当前没有进行中的抽奖'}), 409
        if lot['status'] != 'open' or lot['draw_at'] <= _utcnow():
            return jsonify({'code': 409, 'msg': '参与已截止'}), 409
        if not _is_eligible(conn, g.user['id']):
            return jsonify({'code': 403, 'msg': '近 30 天内没有取件成功的订单'}), 403
        try:
            conn.execute(
                'INSERT INTO lottery_entries (lottery_id, user_id) VALUES (?, ?)',
                (lot['id'], g.user['id']),
            )
            conn.commit()
        except sqlite3.IntegrityError:
            # 唯一索引拦下的重复参与不是错误：目标状态（已在名单里）已达成。
            return jsonify({'code': 0, 'msg': '已在参与名单中'})
    logger.info('抽奖：user=%s 参与第 %s 期 ip=%s', g.user['id'], lot['id'], client_ip())
    return jsonify({'code': 0, 'msg': '已加入'})


@bp.delete('/api/lottery/join')
@login_required
def api_withdraw():
    """撤回参与。开奖后名单冻结，不能再动 —— 中奖名单要能对得上开奖那一刻。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        lot = _current_lottery(conn)
        if lot is None or lot['status'] != 'open':
            return jsonify({'code': 409, 'msg': '已开奖，不能撤回'}), 409
        if lot['draw_at'] <= _utcnow():
            return jsonify({'code': 409, 'msg': '参与已截止'}), 409
        cursor = conn.execute(
            'DELETE FROM lottery_entries WHERE lottery_id = ? AND user_id = ?',
            (lot['id'], g.user['id']),
        )
        conn.commit()
    return jsonify({'code': 0, 'msg': '已撤回', 'removed': cursor.rowcount})


@bp.get('/api/lottery/<int:lottery_id>/prize-image')
@login_required
def api_prize_image(lottery_id):
    """奖品配图。登录即可看：奖品图本来就是给全站参与人看的广告素材，
    不含任何个人信息 —— 按活动 id 取，管理端历史列表也用同一条路。"""
    with db_conn() as conn:
        row = conn.execute(
            'SELECT prize_image_file FROM lotteries WHERE id = ?', (lottery_id,)
        ).fetchone()
    filename = row['prize_image_file'] if row else None
    path = _resolve_image_path(filename)
    if path is None:
        return jsonify({'code': 404, 'msg': '没有配图'}), 404
    ext = filename.rsplit('.', 1)[1].lower()
    resp = send_file(path, mimetype=_MIME_TYPES.get(ext, 'image/png'))
    # 文件名是每次上传重新生成的 uuid，内容与名字一一对应，可以放心让浏览器缓存。
    resp.headers['Cache-Control'] = 'private, max-age=86400'
    return resp


# ---- 奖品配图 ----

def _image_dir():
    """每次现算（理由同 routes/pay_qr.py 的 _qr_dir：测试里改环境变量要能生效）。"""
    return Path(LOTTERY_IMAGE_FOLDER).resolve()


def _resolve_image_path(filename):
    """把库里的文件名还原成全路径，顺带确认它没跑出奖品图目录。

    与 pay_qr / bot_hint 的同名守卫是同一套：库里存的是文件名，正常情况
    一定是我们自己生成的 uuid；但历史数据、手工改库之后，这一步是唯一的拦网。
    校验不过一律当成「没有这张图」。"""
    if not filename:
        return None
    root = _image_dir()
    try:
        path = Path(root, filename).resolve()
        path.relative_to(root)
    except (OSError, ValueError):
        logger.warning('抽奖配图：库里的文件名不在资产目录内，已忽略（name=%s）', filename)
        return None
    return path if path.is_file() else None


def _remove_image_file(filename):
    """删掉被替换下来的旧图。**调用方必须在数据库提交成功之后才调它**。"""
    path = _resolve_image_path(filename)
    if path is None:
        return
    try:
        path.unlink()
    except FileNotFoundError:
        pass
    except OSError as exc:
        logger.warning('抽奖配图：旧文件删除失败（%s）', type(exc).__name__)


@bp.post('/api/admin/lotteries/<int:lottery_id>/prize-image')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_upload_prize_image(lottery_id):
    """上传（或替换）某期活动的奖品配图。守卫与 pay_qr 同一套。"""
    upload = request.files.get('file')
    if upload is None or not upload.filename:
        return jsonify({'code': 400, 'msg': '请选择要上传的奖品图片'}), 400
    original_name = os.path.basename(upload.filename)
    ext = original_name.rsplit('.', 1)[1].lower() if '.' in original_name else ''
    if ext not in LOTTERY_IMAGE_EXTENSIONS:
        security_event('lottery_image_blocked_type',
                       '上传了不在白名单内的抽奖配图「%s」' % original_name[:80])
        return jsonify({
            'code': 400,
            'msg': '只支持图片格式：' + '、'.join('.' + e for e in LOTTERY_IMAGE_EXTENSIONS)
        }), 400
    data = upload.read()
    if not data:
        return jsonify({'code': 400, 'msg': '这个图片是空的（0 字节），换一张再试'}), 400
    if len(data) > LOTTERY_IMAGE_MAX_BYTES:
        return jsonify({
            'code': 400,
            'msg': '图片太大了（上限 %d MB），压缩后再上传'
                   % (LOTTERY_IMAGE_MAX_BYTES // (1024 * 1024))
        }), 400

    new_filename = '%s.%s' % (uuid.uuid4().hex, ext)
    save_path = os.path.join(LOTTERY_IMAGE_FOLDER, new_filename)
    if Path(save_path).resolve().parent != _image_dir():
        security_event('lottery_image_path_blocked', '抽奖配图落盘路径不在资产目录内')
        return jsonify({'code': 400, 'msg': '上传失败，请稍后重试'}), 400

    with db_conn() as conn:
        row = conn.execute(
            'SELECT prize_image_file FROM lotteries WHERE id = ?', (lottery_id,)
        ).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        old_filename = row['prize_image_file']
        try:
            with open(save_path, 'wb') as fh:
                fh.write(data)
        except OSError:
            logger.exception('抽奖配图：写文件失败（name=%s）', new_filename)
            return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500
        # 落盘后核对文件头（理由见 utils.content_signature_error：扩展名白名单
        # 管不住改名过来的字节）。不合格的当场删掉，不留垃圾也不进库。
        sig_err = content_signature_error(save_path, ext)
        if sig_err:
            _remove_image_file(new_filename)
            return jsonify({'code': 400, 'msg': sig_err}), 400
        try:
            conn.execute('UPDATE lotteries SET prize_image_file = ? WHERE id = ?',
                         (new_filename, lottery_id))
            conn.commit()
        except sqlite3.Error:
            logger.exception('抽奖配图：写库失败，回滚已落盘的文件（name=%s）', new_filename)
            _remove_image_file(new_filename)
            return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    if old_filename and old_filename != new_filename:
        _remove_image_file(old_filename)
    logger.info('抽奖配图：%s 更新第 %s 期（%sKB）ip=%s',
                actor_label(), lottery_id, len(data) // 1024, client_ip())
    return jsonify({'code': 0, 'msg': '配图已更新', 'image_version': new_filename})


# ---- 管理端接口 ----

def _admin_row(conn, lot):
    """管理端列表/详情共用的一期摘要。leftover 只在开奖后有值：它就是
    「下一期同奖品能带进来的结余」，没开奖的活动没有这个数。"""
    counts = conn.execute(
        'SELECT COUNT(*) AS total, '
        'SUM(CASE WHEN is_winner = 1 THEN 1 ELSE 0 END) AS winners '
        'FROM lottery_entries WHERE lottery_id = ?',
        (lot['id'],),
    ).fetchone()
    total = int(counts['total'] or 0)
    winners = int(counts['winners'] or 0)
    return {
        'id': lot['id'],
        'prize_name': lot['prize_name'],
        'prize_quantity': lot['prize_quantity'],
        'carry_in': lot['carry_in'],
        'draw_at': _to_local(lot['draw_at']),
        'archive_at': _to_local(lot['archive_at']),
        'status': lot['status'],
        'drawn_at': _to_local(lot['drawn_at']),
        'create_time': _to_local(lot['create_time']),
        'has_image': bool(lot['prize_image_file']),
        #    配图的缓存键：浏览器认的是 **URL**，而取图那条路是 /<id>/prize-image
        #    固定路径。只回 has_image 的话，管理员换完图、学生端最长一天仍看旧图
        #    （取图响应带 `Cache-Control: private, max-age=86400`），控制台一个错都没有。
        #    把文件名当版本号发出去，前端拼成 ?v=<文件名>，换图即换 URL。
        #    学生端与管理端都要（管理端列表里也可能渲染缩略图）。
        'image_version': lot['prize_image_file'] or '',
        'participant_count': total,
        'winner_count': winners,
        'leftover': (int(lot['prize_quantity']) - winners) if lot['status'] in ('drawn', 'archived') else None,
    }


@bp.get('/api/admin/lotteries')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_list():
    """全部活动，最新在前。历史上限 30 期：一个学期的抽奖翻三页都翻不完。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        rows = conn.execute(
            'SELECT * FROM lotteries ORDER BY id DESC LIMIT 30'
        ).fetchall()
        items = [_admin_row(conn, lot) for lot in rows]
    return jsonify({'code': 0, 'items': items})


@bp.get('/api/admin/lotteries/carry')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_carry():
    """建表单的「上期同奖品结余」提示。奖品名是查询键（结余的钥匙，见模块头）。"""
    prize_name = (request.args.get('prize_name') or '').strip()
    if not prize_name:
        return jsonify({'code': 0, 'carry_in': 0})
    with db_conn() as conn:
        return jsonify({'code': 0, 'carry_in': _compute_carry_in(conn, prize_name)})


@bp.post('/api/admin/lotteries')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create():
    """建新一期。结余在这里算进 carry_in 存档 —— 之后改奖品名也不重算，
    「这期是从多少结余起跑的」要能对账。"""
    data = request.get_json(silent=True) or {}
    vals, err = _validate_lottery(data)
    if err:
        return jsonify({'code': 400, 'msg': err}), 400
    with db_conn() as conn:
        existing = conn.execute(
            "SELECT id FROM lotteries WHERE status IN ('open', 'drawn') LIMIT 1"
        ).fetchone()
        if existing:
            return jsonify({'code': 409, 'msg': '已有一个进行中/未归档的抽奖，先归档或删除'}), 409
        carry = _compute_carry_in(conn, vals['prize_name'])
        try:
            cursor = conn.execute('''
                INSERT INTO lotteries
                    (prize_name, prize_quantity, carry_in, draw_at, archive_at, created_by)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (vals['prize_name'], vals['prize_quantity'], carry,
                  vals['draw_at'], vals['archive_at'], g.user['id']))
            conn.commit()
        except sqlite3.IntegrityError:
            #    上面那句「先查有没有在架」在并发下挡不住两条请求（都查不到、都去插）。
            #    真正兜住的是 db.py 的 idx_lotteries_live 部分唯一索引 —— 被它拦下时
            #    这里如实回 409，而不是让 500 冲出去。不拦的后果不是 500：
            #    是两期 open 并存，其中一期谁都看不见却照样开奖、照样发中奖邮件。
            return jsonify({'code': 409,
                            'msg': '已有一个进行中/未归档的抽奖，先归档或删除'}), 409
    logger.info('抽奖：%s 建立第 %s 期（奖品 %s × %d，结余 %d）ip=%s',
                actor_label(), cursor.lastrowid, vals['prize_name'],
                vals['prize_quantity'], carry, client_ip())
    return jsonify({'code': 0, 'msg': '已创建', 'id': cursor.lastrowid, 'carry_in': carry})


@bp.put('/api/admin/lotteries/<int:lottery_id>')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update(lottery_id):
    """改一期活动。只许 open：drawn 的名单与结果已冻结，archive_at 是唯一
    还能动的字段（走「立即归档」或重开一期的归档时间）。"""
    data = request.get_json(silent=True) or {}
    vals, err = _validate_lottery(data)
    if err:
        return jsonify({'code': 400, 'msg': err}), 400
    with db_conn() as conn:
        row = conn.execute('SELECT status FROM lotteries WHERE id = ?',
                           (lottery_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        if row['status'] != 'open':
            return jsonify({'code': 409, 'msg': '已开奖的活动不能再修改'}), 409
        conn.execute('''
            UPDATE lotteries
            SET prize_name = ?, prize_quantity = ?, draw_at = ?, archive_at = ?
            WHERE id = ?
        ''', (vals['prize_name'], vals['prize_quantity'], vals['draw_at'],
              vals['archive_at'], lottery_id))
        conn.commit()
    return jsonify({'code': 0, 'msg': '已保存'})


@bp.post('/api/admin/lotteries/<int:lottery_id>/draw')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_draw(lottery_id):
    """立即开奖：可以在设的开奖时刻之前。开完的名单不可改，前端要确认过再调。"""
    with db_conn() as conn:
        row = conn.execute('SELECT status FROM lotteries WHERE id = ?',
                           (lottery_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        if row['status'] != 'open':
            return jsonify({'code': 409, 'msg': '这一期已经开过奖'}), 409
    drawn = lottery_worker.draw_now(lottery_id)
    if not drawn:
        return jsonify({'code': 409, 'msg': '这一期已经开过奖'}), 409
    logger.info('抽奖：%s 手动开出第 %s 期 ip=%s', actor_label(), lottery_id, client_ip())
    return jsonify({'code': 0, 'msg': '已开奖'})


@bp.post('/api/admin/lotteries/<int:lottery_id>/archive')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_archive(lottery_id):
    """立即归档：学生端从此看不到这一期，管理端历史保留。用于提前开下一期。"""
    with db_conn() as conn:
        cursor = conn.execute(
            "UPDATE lotteries SET status = 'archived' WHERE id = ? AND status = 'drawn'",
            (lottery_id,),
        )
        conn.commit()
    if cursor.rowcount != 1:
        return jsonify({'code': 409, 'msg': '只有已开奖的活动能归档'}), 409
    return jsonify({'code': 0, 'msg': '已归档'})


@bp.delete('/api/admin/lotteries/<int:lottery_id>')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete(lottery_id):
    """删一期活动（连参与记录）。配图文件在提交成功之后才删。"""
    with db_conn() as conn:
        row = conn.execute('SELECT prize_image_file FROM lotteries WHERE id = ?',
                           (lottery_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        conn.execute('DELETE FROM lottery_entries WHERE lottery_id = ?', (lottery_id,))
        conn.execute('DELETE FROM lotteries WHERE id = ?', (lottery_id,))
        conn.commit()
    if row['prize_image_file']:
        _remove_image_file(row['prize_image_file'])
    logger.info('抽奖：%s 删除第 %s 期 ip=%s', actor_label(), lottery_id, client_ip())
    return jsonify({'code': 0, 'msg': '已删除'})


@bp.get('/api/admin/lotteries/<int:lottery_id>')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_detail(lottery_id):
    """单期明细：参与人带用户信息（姓名/学号/宿舍/QQ）与中奖邮件的状态。
    学生端那个 /api/lottery 永远到不了这一层 —— 分级在 SELECT 里就划开了。"""
    with db_conn() as conn:
        lot = conn.execute('SELECT * FROM lotteries WHERE id = ?',
                           (lottery_id,)).fetchone()
        if lot is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        summary = _admin_row(conn, lot)
        entries = [
            {
                'user_id': r['user_id'],
                'nickname': r['nickname'],
                'real_name': r['real_name'],
                'student_id': r['student_id'],
                'dorm': r['dorm'],
                'qq': r['qq'],
                'joined_at': _to_local(r['create_time']),
                'is_winner': bool(r['is_winner']),
                'notify_time': _to_local(r['notify_time']),
                'notify_error': r['notify_error'],
            }
            for r in conn.execute('''
                SELECT e.user_id, e.create_time, e.is_winner, e.notify_time, e.notify_error,
                       u.nickname, u.real_name, u.student_id, u.dorm, u.qq
                FROM lottery_entries e
                JOIN users u ON u.id = e.user_id
                WHERE e.lottery_id = ?
                ORDER BY e.create_time ASC, e.id ASC
            ''', (lottery_id,)).fetchall()
        ]
    # _admin_row 要在连接还开着的时候算（它自己要查参与数）—— 刚才就是在
    # with 外面调它才炸了「Cannot operate on a closed database」。
    return jsonify({'code': 0, **summary, 'entries': entries})
