"""routes/lottery.py —— 抽奖：学生参与 + 管理端管理。

业务口径全部定死在这一段，别在调用方再推一遍：

  资格  两档口径，建活动时选，存在 lotteries.audience 里：
          · pickup（默认）—— **近 30 个自然日内下过单，且这一单取件成功**。
            取件成功有两条落库路径，两条都得认：柜台凭单号确认取件（order_logs
            里 action='pickup'），以及在订单台上把状态直接点成「已取件」
            （只有一条 status 留痕，见 config.py 那段「取件和改状态分开说」）。
            只认前者的话，走下拉框结单的学生在「我的订单」里明明写着已取件，
            抽奖页却说他没有取件记录。
            取件时刻不单独卡窗口：orders 表没有这一列（update_time 会被任何改动
            刷掉，见 db.py 的注释），而取件必然发生在下单之后、此刻之前 ——
            下单时间已经卡在窗口里了。
          · all —— 登录即可参与（拉新/开学季那种「谁都能抽」的活动）。
        资格在**加入时快照**：开奖时不重算 —— 开奖那一刻他仍是参与者，
        事后订单怎么变、口径怎么改都不追溯，不然「撤回旧订单会不会取消我
        已中的奖」「换口径会不会把已经在名单里的人踢掉」这类问题永远答不清。
  人数  一人一期一票。lottery_entries 的唯一索引就是这条规矩本身：
        并发下两个 POST 同时过校验，也只插得进一行。
  奖品  一期可以有多档（一等奖 + 安慰奖），存在 lottery_prizes，各自份数与结余。
        **一人一期至多中一个奖**：开奖按 sort_order 从前往后抽，抽中的人从池子里
        移除 —— 一等奖的人不会再落到二等奖池里。落库形态是
        lottery_entries.win_prize_id 单值，用一张「中奖记录表」反而允许写出
        算法不允许的「同一期中两档」。
  结余  「同奖品才累计」：建期（或加一档新奖品）时按**奖品名**找最近一条已开奖/
        已归档的那一档，把「份数 - 已中人数」带进来；换奖品名即清零 —— 洞洞板的
        结余不该悄悄变成另一种奖品的份数。奖品名就是结余的钥匙，改名 = 换奖品，
        管理端表单会提示这一点。
  在架  open / drawn（未归档）的期数**不限**：学生端列出全部在架的活动，进哪一期
        由他自己点。原先「同一时间只允许一期」的唯一索引在 v30 拆掉了 ——
        季节活动（开学季）与常驻活动（每周抽）本来就会同时挂着。

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
                    ST_DONE, logger)
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
# 一期最多几档奖品。上限防的是「刷成一份名单几千行」那种误操作，不是为了限功能：
# 现实里的活动三五档就到头了（一等奖到参与奖）。
_PRIZES_MAX = 12

# 参与资格口径（存 lotteries.audience）。库里只存名字，判据只在这一段：
#   pickup —— 近 30 天取件成功（v28 时代唯一的规则，老活动迁移后都是它）
#   all    —— 登录即可参与
# 写成常量是因为前后端共用同一组字符串（前端 types.ts 的 LotteryAudience），
# 散着打字面量的话，拼错的那一处不会报错，只会让所有人都「没资格」。
AUDIENCE_PICKUP = 'pickup'
AUDIENCE_ALL = 'all'
AUDIENCES = (AUDIENCE_PICKUP, AUDIENCE_ALL)


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


def _validate_prizes(data):
    """校验奖品格（1~_PRIZES_MAX 档），返回 (列表, 错误信息)。

    每档只认名称与份数：配图单独走上传接口（一期一图的老规则改成**一档一图**，
    见下面 _prize_image 那段），所以这里不接文件。

    奖品名允许重名 —— 两档都叫「参与奖」是合理的。但**结余是按名字认的**，
    重名意味着两档会共享上一期的结余基数，所以管理端表单会提示；
    这里不拦，因为拦了就得编一个「名字不许重复」的错，而那不属于业务事实。"""
    raw = data.get('prizes')
    if not isinstance(raw, list) or not raw:
        return None, '至少要有一个奖品'
    if len(raw) > _PRIZES_MAX:
        return None, '一期最多 %d 个奖品' % _PRIZES_MAX
    prizes = []
    for index, item in enumerate(raw, start=1):
        if not isinstance(item, dict):
            return None, '第 %d 个奖品的格式不对' % index
        name = (item.get('prize_name') or '').strip()
        if not name:
            return None, '第 %d 个奖品的名称不能为空' % index
        if len(name) > _PRIZE_NAME_MAX:
            return None, '第 %d 个奖品的名称不能超过 %d 个字' % (index, _PRIZE_NAME_MAX)
        try:
            quantity = int(item.get('prize_quantity'))
        except (TypeError, ValueError):
            return None, '第 %d 个奖品的份数必须是正整数' % index
        if quantity < 1 or quantity > _QUANTITY_MAX:
            return None, '第 %d 个奖品的份数必须在 1–%d 之间' % (index, _QUANTITY_MAX)
        prizes.append({
            'prize_name': name,
            'prize_quantity': quantity,
            # 前端带回来的行 id：编辑时要靠它认出「哪一档是原有的」，
            # 从而保住它已经上传的配图与建期时定格的 carry_in。新建时全为 None。
            'id': item.get('id'),
        })
    return prizes, ''


def _validate_lottery(data):
    """校验建/改活动要用的字段，返回 (字典, 错误信息)。"""
    prizes, err = _validate_prizes(data)
    if err:
        return None, err
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
    # 老客户端不带这个字段：按 pickup 处理，等于原来那条规则，不因为升级就放宽活动。
    audience = (data.get('audience') or AUDIENCE_PICKUP)
    if audience not in AUDIENCES:
        return None, '参与资格口径不合法'
    return {
        'prizes': prizes,
        'audience': audience,
        'draw_at': draw_at,
        'archive_at': archive_at,
    }, ''


def _live_lotteries(conn):
    """全部在架的活动（open / drawn 未归档），最先开奖的排在前面。

    v30 起并列多期是合法的：学生端把这一列全画出来，进哪期由他自己点。
    ORDER BY 的写法：drawn_at IS NOT NULL 让「还没开奖的」排在前面（0 先于 1），
    同组里按 draw_at 升序 —— 快开奖的最该被看到；draw_at 相同（同时开的两期）
    再按 id 倒序，保证顺序稳定、刷新不跳。"""
    return conn.execute('''
        SELECT * FROM lotteries
        WHERE status IN ('open', 'drawn')
        ORDER BY drawn_at IS NOT NULL, draw_at ASC, id DESC
    ''').fetchall()


def _pick_lottery(conn, lottery_id):
    """按 id 取一期**在架**的活动；不给 id 时退回列表里的第一期。

    「不给 id」这条是给老前端的兼容口：它只会看到一期，发请求时不带 id。
    新前端永远带 id —— 多期并存之后，「当前那一期」不是一个确定的说法，
    靠「最新那一期」去猜会在并发里把人的参与记到别人的活动上。"""
    if lottery_id is not None:
        try:
            target = int(lottery_id)
        except (TypeError, ValueError):
            return None
        return conn.execute(
            "SELECT * FROM lotteries WHERE id = ? AND status IN ('open', 'drawn')",
            (target,)).fetchone()
    rows = _live_lotteries(conn)
    return rows[0] if rows else None


def _is_eligible(conn, user_id, audience):
    """这一期该账号有没有资格参与。口径见模块头。

    audience='all' 时不查订单：活动本身说了「谁都能抽」，再去问订单就是
    替管理员加了一道他没选的规则。'pickup' 的判据如下：

    「取件成功」认两条路：订单当前状态是「已取件」，或这一单有 pickup 留痕。
    两个条件只要一个成立 —— 柜台通常直接在订单台上把状态点成「已取件」，
    那条路只写 status 留痕；只查 pickup 留痕会把这些人挡在门外，
    而他们在「我的订单」里看到的明明是已取件（线上真出现过：订单已取件，
    抽奖页却提示「近 30 天内没有取件成功的订单」）。

    日期比较沿用榜单那套写法（-29 days 含今天共 30 个自然日，见
    routes/orders.py 的 RECENT）—— 同一个口径在两处各写一份是因为
    它们描述的是两件不同的事（榜单看下单、抽奖看整条链），不共用常量。"""
    if audience == AUDIENCE_ALL:
        return True
    row = conn.execute('''
        SELECT 1
        FROM orders o
        WHERE o.user_id = ?
          AND date(o.create_time, 'localtime') >= date('now', 'localtime', '-29 days')
          AND (
              o.status = ?
              OR EXISTS (
                  SELECT 1 FROM order_logs l
                  WHERE l.order_id = o.id AND l.action = ?
              )
          )
        LIMIT 1
    ''', (user_id, ST_DONE, ORDER_LOG_PICKUP)).fetchone()
    return row is not None


def _compute_carry_in(conn, prize_name):
    """这一档奖品能带进来的结余（份数 - 已中人数）。口径见模块头。

    按**奖品名**跨期找：取最近一期已开奖/已归档的**同名奖品**，而不是「最近一期
    活动的首个奖品」—— 多奖品之后，「最近一期」里有好几档，拿首档去对
    二等奖的名字必然对不上，结余就永远归零。"""
    prev = conn.execute('''
        SELECT p.id, p.prize_quantity
        FROM lottery_prizes p
        JOIN lotteries l ON l.id = p.lottery_id
        WHERE l.status IN ('drawn', 'archived') AND p.prize_name = ?
        ORDER BY l.id DESC, p.sort_order ASC, p.id ASC
        LIMIT 1
    ''', (prize_name,)).fetchone()
    if prev is None:
        return 0
    row = conn.execute(
        'SELECT COUNT(*) AS n FROM lottery_entries WHERE win_prize_id = ?',
        (prev['id'],),
    ).fetchone()
    return max(0, int(prev['prize_quantity']) - int(row['n']))


def _prize_rows(conn, lottery_id):
    """一期的全部奖品（含各自中奖人数）。开奖顺序 = sort_order ASC。"""
    return conn.execute('''
        SELECT p.id, p.prize_name, p.prize_quantity, p.carry_in, p.prize_image_file,
               p.sort_order,
               (SELECT COUNT(*) FROM lottery_entries e
                 WHERE e.win_prize_id = p.id) AS winner_count
        FROM lottery_prizes p
        WHERE p.lottery_id = ?
        ORDER BY p.sort_order ASC, p.id ASC
    ''', (lottery_id,)).fetchall()


def _prize_dict(row):
    """一档奖品的对外形状（学生端与管理端共用）。"""
    return {
        'id': row['id'],
        'prize_name': row['prize_name'],
        'prize_quantity': row['prize_quantity'],
        'carry_in': row['carry_in'],
        'winner_count': int(row['winner_count'] or 0),
        'has_image': bool(row['prize_image_file']),
        #    配图的缓存键：浏览器认的是 **URL**，而取图那条路是固定路径。
        #    只回 has_image 的话，管理员换完图、学生端最长一天仍看旧图
        #    （取图响应带 `Cache-Control: private, max-age=86400`），控制台一个错都没有。
        #    把文件名当版本号发出去，前端拼成 ?v=<文件名>，换图即换 URL。
        'image_version': row['prize_image_file'] or '',
    }


def _payload(conn, lot, user_id):
    """学生端一期活动的完整载荷。参与人只给昵称（分级见模块头）。"""
    lottery_id = lot['id']
    count = conn.execute(
        'SELECT COUNT(*) AS n FROM lottery_entries WHERE lottery_id = ?', (lottery_id,)
    ).fetchone()['n']
    joined_row = conn.execute(
        'SELECT win_prize_id FROM lottery_entries WHERE lottery_id = ? AND user_id = ?',
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
    prizes = [_prize_dict(row) for row in _prize_rows(conn, lottery_id)]
    winners = []
    if lot['status'] == 'drawn':
        winners = [
            r['nickname'] for r in conn.execute('''
                SELECT u.nickname FROM lottery_entries e
                JOIN users u ON u.id = e.user_id
                WHERE e.lottery_id = ? AND e.win_prize_id IS NOT NULL
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
        eligible = _is_eligible(conn, user_id, lot['audience'])
        reason = None if eligible else 'no_pickup'
    win_prize_id = joined_row['win_prize_id'] if joined_row else None
    won = next((p for p in prizes if p['id'] == win_prize_id), None)
    #    中奖名单与参与名单共用同一个 LIMIT。开奖时的中奖总数不会超过参与人数
    #    （一人至多中一个），所以拿它跟实际发出去的长度比就知道有没有截断。
    total_slots = sum(p['prize_quantity'] for p in prizes)
    return {
        'exists': True,
        'id': lottery_id,
        'status': lot['status'],
        'prizes': prizes,
        #    首奖品的名称单独给一份：导航徽标、列表卡片、邮件这些地方要一句
        #    「这一期抽什么」，而「一等奖 + 安慰奖」拼成一个字符串既长又会截断。
        #    它不是另一份真相 —— 值就取自 prizes[0]，前端也不许拿它去改奖品。
        'headline': prizes[0]['prize_name'] if prizes else '',
        #    资格口径也发给学生端：页面副标题要照它写（「谁都能抽」与
        #    「近 30 天取件成功可抽」是两句不同的话），前端不该自己猜。
        'audience': lot['audience'],
        'draw_at': _to_local(lot['draw_at']),
        'archive_at': _to_local(lot['archive_at']),
        'drawn_at': _to_local(lot['drawn_at']),
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
        #    学生会以为就这么多人中了。
        'winners_truncated': lot['status'] == 'drawn'
                             and len(winners) < min(total_slots, count),
        'joined': joined,
        'is_winner': won is not None,
        #    中了哪一档：学生端要在「已中奖」旁边写清是哪个奖品。
        #    没中 / 没参与都是 null。
        'won_prize': won,
        'eligible': eligible,
        'ineligible_reason': reason,
    }


# ---- 学生端接口 ----

@bp.get('/api/lottery/hint')
@login_required
def api_lottery_hint():
    """导航徽标的轻量探针：有没有在架的活动、共有几期。学生端布局每次路由切换
    都调它，所以连参与人数都不查 —— 比这重一点，徽标就成了第二个轮询负担。

    count 是给学生端徽标用的：多期并存时显示期数（学生要知道自己有两期可看），
    没有活动时徽标整枚不出现。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        lots = _live_lotteries(conn)
    return jsonify({'code': 0,
                    'active': bool(lots),
                    'count': len(lots),
                    # 兼容旧前端：只要有一期还没开奖就算 open。
                    'status': ('open' if any(l['status'] == 'open' for l in lots)
                               else ('drawn' if lots else None))})


@bp.get('/api/lottery')
@login_required
def api_lottery():
    """在架活动的列表 + 我的参与状态。无在架活动时 exists=false。

    v30 起可能有**多期同时挂着**，所以这里回的是一个列表 `items`（每一期都是
    _payload 的形状，含自己的奖品与参与名单）。顶层那些字段是**第一期**的复制：
    老前端只认单期，读 item 里的同名键一样能跑；新前端一律走 items。"""
    lottery_worker.settle_once()
    with db_conn() as conn:
        lots = _live_lotteries(conn)
        if not lots:
            return jsonify({'code': 0, 'exists': False})
        items = [_payload(conn, lot, g.user['id']) for lot in lots]
    return jsonify({'code': 0, 'exists': True, 'items': items, **items[0]})


@bp.post('/api/lottery/join')
@login_required
def api_join():
    """确认参与。资格校验在**这一刻**做（快照口径见模块头）。

    期次由请求体里的 lottery_id 指定（多期并存后「当前那一期」不再唯一）。
    不传时退回列表里的第一版（老前端的兼容口径：它看到的也只有那一期）。"""
    data = request.get_json(silent=True) or {}
    lottery_worker.settle_once()
    with db_conn() as conn:
        lot = _pick_lottery(conn, data.get('lottery_id'))
        if lot is None:
            return jsonify({'code': 409, 'msg': '这一期不存在或已结束'}), 409
        if lot['status'] != 'open' or lot['draw_at'] <= _utcnow():
            return jsonify({'code': 409, 'msg': '参与已截止'}), 409
        if not _is_eligible(conn, g.user['id'], lot['audience']):
            # 只有 pickup 口径会走到这里：all 口径下 _is_eligible 恒真。
            return jsonify({'code': 403, 'msg': '近 30 天内没有取件成功的订单'}), 403
        try:
            conn.execute(
                'INSERT INTO lottery_entries (lottery_id, user_id) VALUES (?, ?)',
                (lot['id'], g.user['id']),
            )
            conn.commit()
        except sqlite3.IntegrityError:
            # 唯一索引拦下的重复参与不是错误：目标状态（已在名单里）已达成。
            return jsonify({'code': 0, 'msg': '已在参与名单中', 'lottery_id': lot['id']})
    logger.info('抽奖：user=%s 参与第 %s 期 ip=%s', g.user['id'], lot['id'], client_ip())
    return jsonify({'code': 0, 'msg': '已加入', 'lottery_id': lot['id']})


@bp.delete('/api/lottery/join')
@login_required
def api_withdraw():
    """撤回参与。开奖后名单冻结，不能再动 —— 中奖名单要能对得上开奖那一刻。"""
    data = request.get_json(silent=True) or {}
    lottery_worker.settle_once()
    with db_conn() as conn:
        lot = _pick_lottery(conn, data.get('lottery_id'))
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
    不含任何个人信息。

    v30 起配图挂在**奖品档位**上（一期多档各有各的图），所以多一个
    prize_id：`/api/lottery/<期>/prize-image?prize=<档>`。不传 prize 时
    退回这一期的第一档 —— 与「老前端只认一期一张图」兼容。
    一档的图不跨档复用：换取图也就换 URL（前端带 ?v=）。"""
    prize_id = request.args.get('prize', type=int)
    with db_conn() as conn:
        if prize_id:
            row = conn.execute(
                'SELECT prize_image_file FROM lottery_prizes '
                'WHERE id = ? AND lottery_id = ?', (prize_id, lottery_id)).fetchone()
        else:
            row = conn.execute(
                'SELECT prize_image_file FROM lottery_prizes '
                'WHERE lottery_id = ? ORDER BY sort_order ASC, id ASC LIMIT 1',
                (lottery_id,)).fetchone()
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
    """上传（或替换）**某一档奖品**的配图。守卫与 pay_qr 同一套。

    v30 起配图挂在 Prize 上：一期多档各有各的图，所以档位由 prize 参数指定；
    不传时落在第一档（与「一期只有一张图」的老客户端兼容）。

    只有**进行中**的期次能换图：已开奖的名单与结果都冻结了，换图只是让当时的
    宣传素材对不上号。"""
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

    prize_id = request.form.get('prize', type=int)
    new_filename = '%s.%s' % (uuid.uuid4().hex, ext)
    save_path = os.path.join(LOTTERY_IMAGE_FOLDER, new_filename)
    if Path(save_path).resolve().parent != _image_dir():
        security_event('lottery_image_path_blocked', '抽奖配图落盘路径不在资产目录内')
        return jsonify({'code': 400, 'msg': '上传失败，请稍后重试'}), 400

    with db_conn() as conn:
        lot = conn.execute('SELECT status FROM lotteries WHERE id = ?',
                           (lottery_id,)).fetchone()
        if lot is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        if lot['status'] != 'open':
            return jsonify({'code': 409, 'msg': '已开奖的活动不能再换奖品图'}), 409
        if prize_id:
            row = conn.execute(
                'SELECT id, prize_image_file FROM lottery_prizes '
                'WHERE id = ? AND lottery_id = ?', (prize_id, lottery_id)).fetchone()
        else:
            row = conn.execute(
                'SELECT id, prize_image_file FROM lottery_prizes WHERE lottery_id = ? '
                'ORDER BY sort_order ASC, id ASC LIMIT 1', (lottery_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '这一期还没有奖品，先加一档'}), 404
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
            conn.execute('UPDATE lottery_prizes SET prize_image_file = ? WHERE id = ?',
                         (new_filename, row['id']))
            conn.commit()
        except sqlite3.Error:
            logger.exception('抽奖配图：写库失败，回滚已落盘的文件（name=%s）', new_filename)
            _remove_image_file(new_filename)
            return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    if old_filename and old_filename != new_filename:
        _remove_image_file(old_filename)
    logger.info('抽奖配图：%s 更新第 %s 期第 %s 档（%sKB）ip=%s',
                actor_label(), lottery_id, row['id'], len(data) // 1024, client_ip())
    return jsonify({'code': 0, 'msg': '配图已更新', 'image_version': new_filename,
                    'prize_id': row['id']})


# ---- 管理端接口 ----

def _admin_row(conn, lot):
    """管理端列表/详情共用的一期摘要。

    leftover 只在开奖后有值：它是**各档「份数 - 已中人数」之和**，也就是
    「下一期同名奖品还能带进来的总量」。逐档的结余在 prizes 里各给一份 ——
    这个汇总值只是列表上那一格，别用它去建下一期。"""
    counts = conn.execute(
        'SELECT COUNT(*) AS total, '
        'SUM(CASE WHEN win_prize_id IS NOT NULL THEN 1 ELSE 0 END) AS winners '
        'FROM lottery_entries WHERE lottery_id = ?',
        (lot['id'],),
    ).fetchone()
    total = int(counts['total'] or 0)
    winners = int(counts['winners'] or 0)
    prizes = [_prize_dict(row) for row in _prize_rows(conn, lot['id'])]
    leftover = None
    if lot['status'] in ('drawn', 'archived'):
        leftover = sum(max(0, p['prize_quantity'] - p['winner_count']) for p in prizes)
    return {
        'id': lot['id'],
        'prizes': prizes,
        'prize_count': len(prizes),
        'headline': prizes[0]['prize_name'] if prizes else '',
        'audience': lot['audience'],
        'draw_at': _to_local(lot['draw_at']),
        'archive_at': _to_local(lot['archive_at']),
        'status': lot['status'],
        'drawn_at': _to_local(lot['drawn_at']),
        'create_time': _to_local(lot['create_time']),
        'participant_count': total,
        'winner_count': winners,
        'leftover': leftover,
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
    """建新一期（可以带多档奖品）。结余在**建这一期的那一刻**按逐档奖品名算进
    carry_in 存档 —— 之后改奖品名也不重算，「这档是从多少结余起跑的」要能对账。

    「同时只有一期在架」这条规矩 v30 起没有了：多期并存是常态（开学季的常驻活动
    与每周抽并行），所以这里不再做「已有在架活动」的前置检查。"""
    data = request.get_json(silent=True) or {}
    vals, err = _validate_lottery(data)
    if err:
        return jsonify({'code': 400, 'msg': err}), 400
    with db_conn() as conn:
        try:
            cursor = conn.execute('''
                INSERT INTO lotteries (audience, draw_at, archive_at, created_by)
                VALUES (?, ?, ?, ?)
            ''', (vals['audience'], vals['draw_at'], vals['archive_at'], g.user['id']))
            lottery_id = cursor.lastrowid
            carries = []
            for index, prize in enumerate(vals['prizes']):
                carry = _compute_carry_in(conn, prize['prize_name'])
                carries.append(carry)
                conn.execute('''
                    INSERT INTO lottery_prizes
                        (lottery_id, prize_name, prize_quantity, carry_in, sort_order)
                    VALUES (?, ?, ?, ?, ?)
                ''', (lottery_id, prize['prize_name'], prize['prize_quantity'],
                      carry, index))
            conn.commit()
        except sqlite3.Error:
            conn.rollback()
            logger.exception('抽奖：建期写库失败')
            return jsonify({'code': 500, 'msg': '创建失败，稍后重试'}), 500
    logger.info('抽奖：%s 建立第 %s 期（%d 档奖品，资格 %s）ip=%s',
                actor_label(), lottery_id, len(vals['prizes']),
                vals['audience'], client_ip())
    return jsonify({'code': 0, 'msg': '已创建', 'id': lottery_id, 'carry_in': carries})


@bp.put('/api/admin/lotteries/<int:lottery_id>')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update(lottery_id):
    """改一期活动。只许 open：drawn 的名单与结果已冻结，archive_at 是唯一
    还能动的字段（走「立即归档」或重开一期的归档时间）。

    奖品按行 id 对账，三种情况：
      · 带 id 且是本期的档 → 就地改名/改份数（配图与 carry_in 都保住）
      · 不带 id 的 → 新增一档，结余按奖品名算
      · 库里有、这次没提交的 → 删除（连同已经指向它的中奖记录）

    那最后一档要挡住一种情况：**已经有人中过这档**。删它等于把中奖记录
    一起抹掉，而这一期可能已经开奖过（虽然 open 期不该有人中，但手工改库、
    或者「改回 open」这类操作会留下这种现场）。有中奖记录就拒，让管理员
    自己先想清楚 —— 不替他把别人的中奖抹掉。"""
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

        existing = {r['id']: r for r in _prize_rows(conn, lottery_id)}
        keep_ids = []
        for index, prize in enumerate(vals['prizes']):
            prize_id = prize.get('id')
            if prize_id in existing:
                conn.execute('''
                    UPDATE lottery_prizes
                    SET prize_name = ?, prize_quantity = ?, sort_order = ?
                    WHERE id = ? AND lottery_id = ?
                ''', (prize['prize_name'], prize['prize_quantity'], index,
                      prize_id, lottery_id))
                keep_ids.append(prize_id)
            else:
                carry = _compute_carry_in(conn, prize['prize_name'])
                cursor = conn.execute('''
                    INSERT INTO lottery_prizes
                        (lottery_id, prize_name, prize_quantity, carry_in, sort_order)
                    VALUES (?, ?, ?, ?, ?)
                ''', (lottery_id, prize['prize_name'], prize['prize_quantity'],
                      carry, index))
                keep_ids.append(cursor.lastrowid)
        dropped = [pid for pid in existing if pid not in keep_ids]
        if dropped:
            #    有中奖记录的档不许删（理由见 docstring）。
            placeholders = ','.join('?' * len(dropped))
            won = conn.execute(
                'SELECT COUNT(*) AS n FROM lottery_entries WHERE win_prize_id IN (%s)'
                % placeholders, dropped).fetchone()['n']
            if won:
                conn.rollback()
                return jsonify({
                    'code': 409,
                    'msg': '这一期已经有 %d 条中奖记录挂在被删的奖品上，先开奖归档再动' % int(won),
                }), 409
            #    配图文件要跟着档位一起清掉，否则盘上留下没人认领的图。
            images = [existing[pid]['prize_image_file'] for pid in dropped
                      if existing[pid]['prize_image_file']]
            conn.execute('DELETE FROM lottery_prizes WHERE id IN (%s)' % placeholders,
                         dropped)
        else:
            images = []
        conn.execute('''
            UPDATE lotteries
            SET audience = ?, draw_at = ?, archive_at = ?
            WHERE id = ?
        ''', (vals['audience'], vals['draw_at'], vals['archive_at'], lottery_id))
        conn.commit()
    # 文件在提交成功之后才删（与替换配图同一纪律）。
    for filename in images:
        _remove_image_file(filename)
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
    """立即归档：学生端从此看不到这一期，管理端历史保留。"""
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
    """删一期活动（连奖品、参与记录与配图文件）。"""
    with db_conn() as conn:
        row = conn.execute('SELECT id FROM lotteries WHERE id = ?',
                           (lottery_id,)).fetchone()
        if row is None:
            return jsonify({'code': 404, 'msg': '抽奖活动不存在'}), 404
        images = [r['prize_image_file'] for r in conn.execute(
            'SELECT prize_image_file FROM lottery_prizes WHERE lottery_id = ?',
            (lottery_id,)).fetchall() if r['prize_image_file']]
        conn.execute('DELETE FROM lottery_entries WHERE lottery_id = ?', (lottery_id,))
        conn.execute('DELETE FROM lottery_prizes WHERE lottery_id = ?', (lottery_id,))
        conn.execute('DELETE FROM lotteries WHERE id = ?', (lottery_id,))
        conn.commit()
    for filename in images:
        _remove_image_file(filename)
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
                #    中的是哪一档：多奖品之后「中奖」不再是布尔，得说清哪个奖品。
                #    名字取 win_prize_id 关联出来的那一行，NULL 就是没中。
                'win_prize_id': r['win_prize_id'],
                'win_prize_name': r['win_prize_name'],
                'is_winner': r['win_prize_id'] is not None,
                'notify_time': _to_local(r['notify_time']),
                'notify_error': r['notify_error'],
            }
            for r in conn.execute('''
                SELECT e.user_id, e.create_time, e.win_prize_id, e.notify_time,
                       e.notify_error, p.prize_name AS win_prize_name,
                       u.nickname, u.real_name, u.student_id, u.dorm, u.qq
                FROM lottery_entries e
                JOIN users u ON u.id = e.user_id
                LEFT JOIN lottery_prizes p ON p.id = e.win_prize_id
                WHERE e.lottery_id = ?
                ORDER BY e.create_time ASC, e.id ASC
            ''', (lottery_id,)).fetchall()
        ]
    # _admin_row 要在连接还开着的时候算（它自己要查参与数）—— 刚才就是在
    # with 外面调它才炸了「Cannot operate on a closed database」。
    return jsonify({'code': 0, **summary, 'entries': entries})
