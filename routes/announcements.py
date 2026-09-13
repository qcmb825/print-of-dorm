"""routes/announcements.py —— 公告接口：当前公告 + 管理端增删改查与生效切换。"""

from flask import Blueprint, g, jsonify, request

from auth import login_required, roles_required
from config import (
    ANNOUNCE_COLOR_RE,
    ANNOUNCE_CONTENT_MAX,
    ANNOUNCE_FONTS,
    ROLE_ADMIN,
    ROLE_SUPER,
    logger,
)
from db import get_db
from security import client_ip

bp = Blueprint('announce', __name__)


# 公告接口

def _parse_announcement(data):
    """校验并清洗公告的内容与样式，返回 (字典, 错误信息)。

    字体只收白名单里的键，不直接存 CSS 字符串，前端怎么渲染由前端决定，
    免得数据库变成能塞任意样式的 CSS 注入入口。
    """
    content = (data.get('content') or '').strip()
    if not content:
        return None, '公告内容不能为空'
    if len(content) > ANNOUNCE_CONTENT_MAX:
        return None, '公告内容不能超过 %s 个字' % ANNOUNCE_CONTENT_MAX

    font_family = (data.get('font_family') or 'system').strip()
    if font_family not in ANNOUNCE_FONTS:
        return None, '字体不在允许范围内'

    try:
        font_size = int(data.get('font_size', 15))
    except (TypeError, ValueError):
        return None, '字号必须是数字'
    if not 12 <= font_size <= 28:
        return None, '字号需在 12-28 之间'

    font_color = (data.get('font_color') or '#1f2328').strip()
    if not ANNOUNCE_COLOR_RE.match(font_color):
        return None, '颜色必须是 #RRGGBB 格式'

    return {
        'content': content,
        'font_family': font_family,
        'font_size': font_size,
        'font_color': font_color.lower(),
    }, None



@bp.route('/api/announcement')
@login_required
def api_announcement():
    """前台读当前生效的公告，没有就返回 null，前端据此隐藏公告栏。"""
    conn = get_db()
    try:
        row = conn.execute('''
            SELECT id, content, font_family, font_size, font_color,
                   datetime(update_time, 'localtime') AS update_time
            FROM announcements
            WHERE is_active = 1
            ORDER BY id DESC LIMIT 1
        ''').fetchone()
    finally:
        conn.close()
    return jsonify({'code': 0, 'announcement': dict(row) if row else None})



@bp.route('/api/admin/announcements')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_announcements():
    """公告列表，管理员 / 超管可看，含已停用的历史公告，方便编辑和重新启用。"""
    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT a.id, a.content, a.font_family, a.font_size, a.font_color, a.is_active,
                   datetime(a.update_time, 'localtime') AS update_time,
                   u.nickname AS author
            FROM announcements a
            LEFT JOIN users u ON u.id = a.created_by
            ORDER BY a.is_active DESC, a.id DESC
            LIMIT 50
        ''').fetchall()
    finally:
        conn.close()
    return jsonify({'code': 0, 'announcements': [dict(r) for r in rows]})



@bp.route('/api/admin/announcements', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_create_announcement():
    """发布公告，新公告生效时会自动停用旧的，同一时间只悬浮一条。"""
    payload, error = _parse_announcement(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        conn.execute('UPDATE announcements SET is_active = 0 WHERE is_active = 1')
        cursor = conn.execute('''
            INSERT INTO announcements (content, font_family, font_size, font_color, is_active, created_by)
            VALUES (?, ?, ?, ?, 1, ?)
        ''', (payload['content'], payload['font_family'], payload['font_size'],
              payload['font_color'], g.user['id']))
        conn.commit()
        new_id = cursor.lastrowid
    finally:
        conn.close()
    logger.info('发布公告 #%s 操作人=%s(%s) 字号=%s 颜色=%s ip=%s',
                new_id, g.user['nickname'], g.user['role'],
                payload['font_size'], payload['font_color'], client_ip())
    return jsonify({'code': 0, 'msg': '公告已发布', 'id': new_id})



@bp.route('/api/admin/announcements/<int:aid>', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_update_announcement(aid):
    """改公告内容或样式，不动生效状态。"""
    payload, error = _parse_announcement(request.get_json(silent=True) or {})
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM announcements WHERE id = ?', (aid,)).fetchone() is None:
            return jsonify({'code': 404, 'msg': '公告不存在'}), 404
        conn.execute('''
            UPDATE announcements
            SET content = ?, font_family = ?, font_size = ?, font_color = ?,
                update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payload['content'], payload['font_family'], payload['font_size'],
              payload['font_color'], aid))
        conn.commit()
    finally:
        conn.close()
    logger.info('修改公告 #%s 操作人=%s(%s) ip=%s',
                aid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '公告已更新'})



@bp.route('/api/admin/announcements/<int:aid>/active', methods=['PUT'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_toggle_announcement(aid):
    """启用 / 停用公告，启用一条时会先停用其它生效中的，保证只有一条悬浮。"""
    data = request.get_json(silent=True) or {}
    active = bool(data.get('active'))
    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM announcements WHERE id = ?', (aid,)).fetchone() is None:
            return jsonify({'code': 404, 'msg': '公告不存在'}), 404
        if active:
            conn.execute('UPDATE announcements SET is_active = 0 WHERE is_active = 1')
        conn.execute('UPDATE announcements SET is_active = ? WHERE id = ?',
                     (1 if active else 0, aid))
        conn.commit()
    finally:
        conn.close()
    logger.info('%s公告 #%s 操作人=%s(%s) ip=%s',
                '启用' if active else '停用', aid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '已启用' if active else '已停用'})



@bp.route('/api/admin/announcements/<int:aid>', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def api_admin_delete_announcement(aid):
    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM announcements WHERE id = ?', (aid,)).fetchone() is None:
            return jsonify({'code': 404, 'msg': '公告不存在'}), 404
        conn.execute('DELETE FROM announcements WHERE id = ?', (aid,))
        conn.commit()
    finally:
        conn.close()
    logger.info('删除公告 #%s 操作人=%s(%s) ip=%s',
                aid, g.user['nickname'], g.user['role'], client_ip())
    return jsonify({'code': 0, 'msg': '公告已删除'})
