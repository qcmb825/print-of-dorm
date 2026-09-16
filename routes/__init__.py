"""路由包：按功能域拆分的 Blueprint，由 register_blueprints() 统一挂到应用上。

各路由模块只依赖 config / security / auth / utils / db，不反向依赖 app.py，
所以不会出现循环导入。
"""
from . import account, admin, announcements, orders, tickets
# upload_chunks 依赖 orders 里的建订单函数，所以写在上面那行之后：
# Python 从左到右导入，到这一行时 orders 已经进了 sys.modules。
from . import upload_chunks

BLUEPRINTS = (
    account.bp,
    orders.bp,
    upload_chunks.bp,
    admin.bp,
    announcements.bp,
    tickets.bp,
)


def register_blueprints(app):
    """把所有蓝图注册到应用上。"""
    for bp in BLUEPRINTS:
        app.register_blueprint(bp)
