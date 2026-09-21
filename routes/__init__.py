"""路由包：按功能域拆分的 Blueprint，由 register_blueprints() 统一挂到应用上。

各路由模块只依赖 config / security / auth / utils / db，不反向依赖 app.py，
所以不会出现循环导入。
"""
from . import (account, admin, announcements, bot, bot_hint, history, order_options, orders,
               price_table, tickets)
# upload_chunks 依赖 orders 里的建订单函数，所以写在上面那行之后：
# Python 从左到右导入，到这一行时 orders 已经进了 sys.modules。
from . import upload_chunks
# audit 这个名字容易和「审计日志」(audit_action) 混起来，这里指的是
# 「身份审核」—— 学号不在名单上时的人工通道，见 routes/audit.py 开头。
from . import audit
# pay_qr 是「管理员自己的收款二维码」：上传 / 删除 / 预览，见 routes/pay_qr.py 开头。
from . import pay_qr

BLUEPRINTS = (
    account.bp,
    bot.bp,
    orders.bp,
    upload_chunks.bp,
    admin.bp,
    history.bp,
    announcements.bp,
    tickets.bp,
    audit.bp,
    order_options.bp,
    # price_table 是价目表（一条 = 纸张 + 类型 + 单面/双面单价），只影响预估价、
    # 不影响最终金额，见 routes/price_table.py 开头那段。
    price_table.bp,
    # bot_hint 是 QQ 机器人引导（悬浮提示的出现规则 + 全站那张二维码），
    # 见 routes/bot_hint.py 开头那段。
    bot_hint.bp,
    pay_qr.bp,
)


def register_blueprints(app):
    """把所有蓝图注册到应用上。"""
    for bp in BLUEPRINTS:
        app.register_blueprint(bp)
