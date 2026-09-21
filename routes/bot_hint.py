"""routes/bot_hint.py —— QQ 机器人引导：悬浮提示的出现规则 + 那张二维码。

**一份状态的真相在服务端**（`user_prefs.bot_hint_clicks`）：点掉几次是「每个登录用户」
的状态，换台设备该带着走，而且「要不要显示」这个判断必须由服务端说了算 ——
只在前端藏起来，换个人、换个浏览器就又冒出来，等于没关。

## 出现规则（三条，缺一条就会出怪事）

  ① **登录页 / 注册页不设永久关闭**：那时还没有账号，没有地方记「关过几次」。
     前端只用 sessionStorage 记「这一屏会话里别再挡我」，退出重进就还会看到 ——
     引导的目的正是把「还没用机器人下单的人」拉过去，对陌生人关掉它没意义。
  ② 已登录用户点「关闭」→ 计数 +1；**点满 `BOT_HINT_MAX_CLICKS` 次就永久不再出现**
     （由服务端读计数决定，前端拿 `closed` 字段渲染）。
  ③ 永久关闭之后**收进设置页**：那里能重新打开（`POST /api/bot-hint/reset`），
     二维码也在同一处 —— 用户不会因为「关掉过一次」就再也找不到机器人号。

## 二维码

**全站一张**（不是每人一张，所以没走 users 表），由超管上传，存
`site_assets.bot_qr_file`（**文件名**，目录由 `config.ASSET_FOLDER` 决定）。
读取接口 `GET /api/bot-qr` **不要求登录** —— 登录页也要显示它，而它本来就是
贴在校门口给所有人扫的那种二维码。
"""

import os
import uuid
from pathlib import Path

from flask import Blueprint, Response, g, jsonify, request

from auth import login_required, roles_required
from config import (ASSET_FOLDER, BOT_HINT_MAX_CLICKS, BOT_QR_EXTENSIONS, BOT_QR_MAX_BYTES,
                    ROLE_SUPER, logger)
from db import db_conn
import prefs
from security import client_ip, security_event
from utils import content_signature_error

bp = Blueprint('bot_hint', __name__)


def _resolve_qr_path(filename):
    """把库里的文件名还原成全路径，顺带确认它没跑出资产目录。

    与收款码同一套守卫（见 routes/pay_qr.py 的 _resolve_qr_path）：库里存的是文件名，
    正常情况一定是我们自己生成的 uuid；但历史数据、手工改库、或者以后有人把这段
    改成「用原始文件名」之后，这一步就是唯一的拦网。校验不过一律当成「没有这张图」。
    """
    if not filename:
        return None
    root = Path(ASSET_FOLDER).resolve()
    try:
        path = Path(root, filename).resolve()
        path.relative_to(root)          # 不在目录内会抛 ValueError
    except (OSError, ValueError):
        logger.warning('机器人二维码：库里的文件名不在资产目录内，已忽略（name=%s）', filename)
        return None
    return path if path.is_file() else None


def _current_qr_file(conn=None):
    """当前那张二维码的文件名（没有就是 None）。"""
    sql = 'SELECT bot_qr_file FROM site_assets WHERE id = 1'
    try:
        if conn is None:
            with db_conn() as own:
                row = own.execute(sql).fetchone()
        else:
            row = conn.execute(sql).fetchone()
    except Exception:
        # 表还没建出来（老库第一次启动、迁移中途挂了）：当作「没有二维码」。
        # 引导照常显示，只是没有图 —— 绝不能因为它让整个接口 500。
        logger.exception('读取站内资产失败，本次按「没有二维码」处理')
        return None
    return (row['bot_qr_file'] if row is not None else None) or None


@bp.get('/api/bot-hint')
@login_required
def api_bot_hint():
    """引导该不该显示、以及那张二维码在哪。

    `closed` 由服务端算（计数是否点满）—— 前端不自己比数字：
    阈值改了（以后想从 3 次改成 5 次）只改一处，不用跟着改前端。
    """
    with db_conn() as conn:
        clicks = int(prefs.get_prefs(g.user['id'], conn).get('bot_hint_clicks') or 0)
        has_qr = _resolve_qr_path(_current_qr_file(conn)) is not None
    return jsonify({
        'code': 0,
        'clicks': clicks,
        'max_clicks': BOT_HINT_MAX_CLICKS,
        'closed': clicks >= BOT_HINT_MAX_CLICKS,
        'has_qr': has_qr,
    })


@bp.post('/api/bot-hint/dismiss')
@login_required
def api_bot_hint_dismiss():
    """点了「关闭」：计数 +1，返回新的次数与「是不是永久关掉了」。

    不校验请求体里带什么：次数只能由服务端加 —— 让客户端自己报
    「我点了 3 次」，等于把「别再烦我」变成一句可以让别人代说的话。
    """
    clicks = prefs.bump_bot_hint(g.user['id'])
    closed = clicks >= BOT_HINT_MAX_CLICKS
    if closed:
        logger.info('账号 #%s 的 QQ 机器人引导已收起（点满 %s 次）', g.user['id'], clicks)
    return jsonify({'code': 0, 'clicks': clicks, 'max_clicks': BOT_HINT_MAX_CLICKS,
                    'closed': closed})


@bp.post('/api/bot-hint/reset')
@login_required
def api_bot_hint_reset():
    """设置页的「重新显示引导」：计数归零，下次进页面又会看到。"""
    prefs.reset_bot_hint(g.user['id'])
    return jsonify({'code': 0, 'clicks': 0, 'closed': False})


@bp.get('/api/bot-qr')
def api_bot_qr():
    """QQ 机器人二维码原图。**不要求登录** —— 登录页也要显示它。

    没有上传过时回 404（前端据此显示一句「管理员还没上传二维码」而不是一张裂图）。
    也不做任何缓存策略上的花样：换码之后应当立刻生效，所以 no-store。
    """
    path = _resolve_qr_path(_current_qr_file())
    if path is None:
        return jsonify({'code': 404, 'msg': '还没有上传机器人二维码'}), 404
    try:
        data = path.read_bytes()
    except OSError:
        logger.warning('机器人二维码文件读不到：%s', path.name)
        return jsonify({'code': 404, 'msg': '二维码文件不见了'}), 404
    resp = Response(data, mimetype='image/png' if path.suffix.lower() == '.png' else 'image/jpeg')
    resp.headers['Cache-Control'] = 'no-store'
    return resp


@bp.post('/api/admin/bot-qr')
@roles_required(ROLE_SUPER)
def api_admin_upload_bot_qr():
    """上传（或替换）QQ 机器人二维码。**超管专属** —— 它代表这个站点对外的一个门面。

    校验顺序照抄收款码那一套：扩展名白名单 → 读进内存判大小 → 内容嗅探。
    先读进内存再判大小，是为了「绝不会有一个超限的文件先落在磁盘上」。
    """
    upload = request.files.get('file')
    if upload is None or not upload.filename:
        return jsonify({'code': 400, 'msg': '请选择要上传的二维码图片'}), 400
    original_name = os.path.basename(upload.filename)
    ext = original_name.rsplit('.', 1)[1].lower() if '.' in original_name else ''
    if ext not in BOT_QR_EXTENSIONS:
        security_event('bot_qr_blocked_type',
                       '上传了不在白名单内的二维码文件「%s」' % original_name[:80])
        return jsonify({
            'code': 400,
            'msg': '只支持图片格式：' + '、'.join('.' + e for e in BOT_QR_EXTENSIONS),
        }), 400
    data = upload.read()
    if not data:
        return jsonify({'code': 400, 'msg': '这个图片是空的（0 字节），换一张再试'}), 400
    if len(data) > BOT_QR_MAX_BYTES:
        return jsonify({
            'code': 400,
            'msg': '图片太大了（上限 %d MB），请压缩后再上传' % (BOT_QR_MAX_BYTES // (1024 * 1024)),
        }), 400
    old_file = _current_qr_file()
    new_file = '%s.%s' % (uuid.uuid4().hex, ext)
    save_path = os.path.join(ASSET_FOLDER, new_file)
    try:
        with open(save_path, 'wb') as fh:
            fh.write(data)
    except OSError:
        logger.exception('二维码落盘失败：%s', save_path)
        return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    # 内容嗅探放在**落盘之后**：utils 那个函数是「按路径读开头几个字节」的
    # （它刻意不把整份文件读进内存）。与 /api/upload 同一条顺序：
    # 先落盘、再核对文件头，对不上就把刚落的那张删掉 —— 一份名不副实的图
    # 会被摆在登录页上给全站看，比一份可疑的打印文件更该拦。
    problem = content_signature_error(save_path, ext)
    if problem:
        try:
            os.remove(save_path)
        except OSError:
            pass
        security_event('bot_qr_content_mismatch',
                       '二维码文件「%s」的内容与扩展名 %s 不符' % (original_name[:80], ext))
        return jsonify({'code': 400, 'msg': problem}), 400

    try:
        with db_conn() as conn:
            conn.execute('''
                INSERT INTO site_assets (id, bot_qr_file, updated_by)
                VALUES (1, ?, ?)
                ON CONFLICT(id) DO UPDATE SET
                    bot_qr_file = excluded.bot_qr_file,
                    updated_by = excluded.updated_by,
                    update_time = CURRENT_TIMESTAMP
            ''', (new_file, g.user['id']))
            conn.commit()
    except Exception:
        # 写库失败：把刚落盘的那张删掉，别留孤儿文件（与上传下单同一套纪律）
        try:
            os.remove(save_path)
        except OSError:
            pass
        logger.exception('二维码写库失败，已清理落盘文件')
        return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    # **库里改成功之后**才删旧图（反过来的话，中间失败会留下「库里指着旧名字、
    # 文件却没」的裂图，而管理员完全不知道发生过什么）。
    old_path = _resolve_qr_path(old_file)
    if old_path is not None:
        try:
            old_path.unlink()
        except OSError:
            logger.warning('旧二维码删除失败（不影响这次上传）')

    logger.info('QQ 机器人二维码已更新（%s 字节）操作人=%s(%s) ip=%s',
                len(data), g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '二维码已更新'})


@bp.delete('/api/admin/bot-qr')
@roles_required(ROLE_SUPER)
def api_admin_delete_bot_qr():
    """撤下二维码（引导里的图会变成一句「还没上传」）。"""
    old_file = _current_qr_file()
    if not old_file:
        return jsonify({'code': 404, 'msg': '还没有上传过二维码'}), 404
    with db_conn() as conn:
        conn.execute('UPDATE site_assets SET bot_qr_file = NULL, updated_by = ?, '
                     'update_time = CURRENT_TIMESTAMP WHERE id = 1', (g.user['id'],))
        conn.commit()
    path = _resolve_qr_path(old_file)
    if path is not None:
        try:
            path.unlink()
        except OSError:
            logger.warning('二维码文件删除失败（库里已经撤下，界面不受影响）')
    logger.info('QQ 机器人二维码已撤下 操作人=%s(%s) ip=%s',
                g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '二维码已撤下'})
