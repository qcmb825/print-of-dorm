"""auth.py —— 登录态与角色校验装饰器。"""

from flask import g, jsonify, request
from functools import wraps

from config import ROLE_ADMIN, ROLE_SUPER
from security import security_event


def login_required(view):
    """要求已登录。"""
    @wraps(view)
    def wrapper(*args, **kwargs):
        if g.get('user') is None:
            return jsonify({'code': 401, 'msg': '请先登录'}), 401
        return view(*args, **kwargs)
    return wrapper



def roles_required(*roles):
    """要求登录且角色在允许列表内。"""
    def decorator(view):
        @wraps(view)
        def wrapper(*args, **kwargs):
            if g.get('user') is None:
                return jsonify({'code': 401, 'msg': '请先登录'}), 401
            if g.user['role'] not in roles:
                # 越权尝试必须留痕，这是攻击者在试探的最典型特征
                security_event('permission_denied',
                               'role=%s need=%s method=%s path=%s'
                               % (g.user['role'], '/'.join(roles), request.method, request.path))
                return jsonify({'code': 403, 'msg': '没有权限执行该操作'}), 403
            return view(*args, **kwargs)
        return wrapper
    return decorator



# 工单（站内信）接口

def _is_staff(user):
    """管理员和超管统称工单的另一方。"""
    return user['role'] in (ROLE_ADMIN, ROLE_SUPER)
