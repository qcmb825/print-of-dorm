"""routes/account.py —— 账号接口：存活检查、当前用户、注册、登录、登出。"""

import sqlite3
import secrets
from flask import Blueprint, g, jsonify, request, session

from config import ROLE_LABELS, ROLE_USER, logger
from db import get_db
from security import (
    actor_label,
    clear_login_failures,
    client_ip,
    ensure_csrf_token,
    login_blocked,
    login_key,
    make_password_records,
    record_login_failure,
    security_event,
    verify_password,
)
from utils import validate_registration

bp = Blueprint('account', __name__)

# 接口

# 探活接口，对应 Java 那边的 /hello
@bp.route('/hello')
def hello():
    return '打印服务已启动！'



# 账户接口

@bp.route('/api/me')
def api_me():
    """前端启动时调，返回当前登录用户和 CSRF 令牌。"""
    token = ensure_csrf_token()
    if g.get('user') is None:
        return jsonify({'code': 401, 'msg': '未登录', 'csrf': token, 'user': None}), 401
    user = dict(g.user)
    user['role_label'] = ROLE_LABELS.get(user['role'], user['role'])
    return jsonify({'code': 0, 'csrf': token, 'user': user})



@bp.route('/api/register', methods=['POST'])
def api_register():
    data = request.get_json(silent=True) or {}
    payload, error = validate_registration(data)
    if error:
        # 校验失败只记 DEBUG，用户填错很常见，记 WARNING 会把真正的问题淹了
        logger.debug('注册参数校验不通过：%s ip=%s', error, client_ip())
        return jsonify({'code': 400, 'msg': error}), 400

    key = 'register:' + client_ip()
    if login_blocked(key):
        security_event('register_rate_limited', '该 IP 短时间内反复提交注册')
        return jsonify({'code': 429, 'msg': '注册过于频繁，请稍后再试'}), 429

    password_hash, password_enc = make_password_records(payload['password'])
    conn = get_db()
    try:
        for column, label in (('nickname', '昵称'), ('real_name', '姓名'), ('student_id', '学号')):
            exists = conn.execute(
                f'SELECT 1 FROM users WHERE {column} = ? LIMIT 1', (payload[column],)
            ).fetchone()
            if exists:
                record_login_failure(key)
                logger.info('注册被拒：%s「%s」已被占用 ip=%s', label, payload[column], client_ip())
                return jsonify({'code': 409, 'msg': f'{label}已被注册，请更换'}), 409
        cursor = conn.execute('''
            INSERT INTO users
                (nickname, real_name, student_id, dorm, contact_type, contact,
                 password_hash, password_enc, role)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            payload['nickname'], payload['real_name'], payload['student_id'], payload['dorm'],
            payload['contact_type'], payload['contact'],
            password_hash, password_enc, ROLE_USER,  # 注册一律是普通用户，管理员只能由超管升级
        ))
        conn.commit()
        uid = cursor.lastrowid
    except sqlite3.IntegrityError:
        conn.rollback()
        logger.warning('注册写入冲突（并发下同一昵称/姓名/学号被同时注册）ip=%s', client_ip())
        return jsonify({'code': 409, 'msg': '昵称、姓名或学号已被注册'}), 409
    finally:
        conn.close()

    session.clear()  # 防会话固定攻击，登录前后换个全新的会话
    session['uid'] = uid
    session['csrf'] = secrets.token_urlsafe(32)
    session.permanent = True
    logger.info('新用户注册 #%s 昵称=%s 姓名=%s 学号=%s 宿舍=%s 联系方式=%s ip=%s',
                uid, payload['nickname'], payload['real_name'], payload['student_id'],
                payload['dorm'], payload['contact'] or '(未填写)', client_ip())
    return jsonify({'code': 0, 'msg': '注册成功', 'csrf': session['csrf'], 'user': {
        'id': uid, 'nickname': payload['nickname'], 'real_name': payload['real_name'],
        'student_id': payload['student_id'], 'dorm': payload['dorm'],
        'contact_type': payload['contact_type'], 'contact': payload['contact'],
        'role': ROLE_USER, 'role_label': ROLE_LABELS[ROLE_USER],
    }})



@bp.route('/api/login', methods=['POST'])
def api_login():
    data = request.get_json(silent=True) or {}
    identifier = (data.get('identifier') or '').strip()
    password = data.get('password') or ''
    if not identifier or not password:
        return jsonify({'code': 400, 'msg': '请输入姓名/昵称和密码'}), 400

    key = login_key(identifier)
    locked = login_blocked(key)
    if locked:
        security_event('login_locked', 'identifier=%s 仍在锁定中，剩余 %s 秒' % (identifier[:40], locked))
        return jsonify({'code': 429, 'msg': f'失败次数过多，请 {locked} 秒后再试'}), 429

    conn = get_db()
    fail_reason = ''
    try:
        row = conn.execute(
            'SELECT * FROM users WHERE nickname = ? COLLATE NOCASE OR real_name = ? LIMIT 1',
            (identifier, identifier),
        ).fetchone()
        # 返回给用户的永远是同一句话，避免泄露账号是否存在；
        # 但日志里要记清真实原因，不然后面排查完全抓瞎。这两者必须分开。
        if row is None:
            fail_reason = '账号不存在'
        elif not verify_password(row['password_hash'], password):
            fail_reason = '密码错误'
        elif row['status'] != 'active':
            fail_reason = '账号已被禁用'
        if fail_reason:
            record_login_failure(key)
            security_event('login_failed', 'identifier=%s 真实原因=%s' % (identifier[:40], fail_reason))
            return jsonify({'code': 401, 'msg': '账号或密码错误'}), 401
        conn.execute('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', (row['id'],))
        conn.commit()
    finally:
        conn.close()

    clear_login_failures(key)
    session.clear()  # 防会话固定攻击
    session['uid'] = row['id']
    session['csrf'] = secrets.token_urlsafe(32)
    session.permanent = True  # 配合 PERMANENT_SESSION_LIFETIME 实现保持登录
    logger.info('用户登录 #%s 昵称=%s 角色=%s ip=%s', row['id'], row['nickname'], row['role'], client_ip())
    return jsonify({'code': 0, 'csrf': session['csrf'], 'user': {
        'id': row['id'], 'nickname': row['nickname'], 'real_name': row['real_name'],
        'student_id': row['student_id'], 'dorm': row['dorm'],
        'contact_type': row['contact_type'], 'contact': row['contact'],
        'role': row['role'], 'role_label': ROLE_LABELS.get(row['role'], row['role']),
    }})



@bp.route('/api/logout', methods=['POST'])
def api_logout():
    who = actor_label()  # 必须在清空会话之前取，不然拿不到是谁退出的
    session.clear()
    logger.info('用户退出登录 %s ip=%s', who, client_ip())
    return jsonify({'code': 0, 'msg': '已退出登录'})
