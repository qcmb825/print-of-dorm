"""routes/pay_qr.py —— 收款二维码：管理员上传 / 删除 / 查看自己的那一张。

为什么单独立一个蓝图，不塞进 account.py：

    收款码名义上是「账号资料」，但它有一整套自己的落盘规矩 —— 扩展名白名单、
    体积上限、路径穿越校验、换码时必须先写新文件再删旧文件。这些和登录注册那种
    纯数据库操作完全不是一回事，混在一起的话 account.py 会同时长着「会话」和
    「文件」两种东西，改哪一边都得先读完另一边。

为什么是「每个管理员一份」而不是全局一份：

    谁接的单，学生就把钱付给谁 —— 所以邮件里嵌的必须是**接单人自己**的码。
    全局一份的话，换个管理员接单，钱还是打到原来那个人账上，而且不会报错。

为什么没有「按用户 id 取码」的接口（比如 /api/pay-qr/<id>）：

    那等于开了一个「任何登录用户都能翻任意管理员收款码」的洞，而需求里根本没有
    这个场景。学生需要看码的时机只有一个 —— 收到取件邮件去付款 —— 走的是邮件
    内嵌图，不由网页承担。所以这里只有「本人看本人的」。
"""

import os
import sqlite3
import uuid
from pathlib import Path

from flask import Blueprint, g, jsonify, request, send_file

from config import (PAY_QR_EXTENSIONS, PAY_QR_FOLDER, PAY_QR_MAX_BYTES, ROLE_ADMIN,
                    ROLE_SUPER, logger)
from db import db_conn
from auth import roles_required
from security import actor_label, client_ip, security_event

bp = Blueprint('pay_qr', __name__)

# 前端展示时能认的图片类型（扩展名 -> MIME），用于 send_file 明确指定。
# 不写死成猜扩展名：jpg / jpeg 都可能是 image/jpeg，交给 mimetypes 反而多一层不确定。
_MIME_TYPES = {
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
}


def _qr_dir():
    """取收款码目录的绝对路径。

    每次现算而不是模块级缓存：配置本来就是常量，缓存它只能省一次字符串拼接，
    却会把「目录在哪」这个事实多存一份 —— 测试里改环境变量重跑时，
    模块级那份会固执地指着旧目录。
    """
    return Path(PAY_QR_FOLDER).resolve()


def _resolve_qr_path(filename):
    """把库里的文件名还原成全路径，顺带确认它没跑出收款码目录。

    库里的 pay_qr_file 存的是**文件名**，不是路径（见 db.py 的 v10 -> v11 说明）。
    正常情况它一定是我们自己生成的 uuid，跑不出去；但历史数据、手工改库、
    或者以后有人把这段改成「用原始文件名」之后，这一步就是唯一的拦网。
    校验不过一律当成「没有这张图」，不回退、不猜。
    """
    if not filename:
        return None
    root = _qr_dir()
    try:
        path = Path(root, filename).resolve()
        path.relative_to(root)  # 不在目录内会抛 ValueError
    except (OSError, ValueError):
        logger.warning('收款码：库里的文件名不在收款码目录内，已忽略（name=%s）', filename)
        return None
    return path if path.is_file() else None


def _remove_qr_file(filename):
    """删掉被替换下来的旧图。**调用方必须在数据库提交成功之后才调它。**

    反过来（先删旧再改库）的话，中间任何一步失败，库里还挂着旧文件名、
    文件却已经没了 —— 界面会显示一张裂图，而且管理员不知道发生过什么。
    """
    path = _resolve_qr_path(filename)
    if path is None:
        return
    try:
        path.unlink()
    except FileNotFoundError:
        # 已经被别的路径清掉了（比如手工清理过文件），不算错
        pass
    except OSError as exc:
        # 删不掉只影响占用的那点磁盘，不该把已经成功的上传报成失败
        logger.warning('收款码：旧文件删除失败（%s）', type(exc).__name__)


@bp.route('/api/me/pay-qr', methods=['POST'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def upload_pay_qr():
    """上传（或替换）本人收款码。只收 PNG / JPG，且不超过 PAY_QR_MAX_BYTES。"""
    upload = request.files.get('file')
    if upload is None or not upload.filename:
        return jsonify({'code': 400, 'msg': '请选择要上传的收款码图片'}), 400

    # basename 一次再去扩展名：上传方可能塞进 'a/b/c.png' 甚至 '..\\x.png'
    original_name = os.path.basename(upload.filename)
    if '.' not in original_name:
        ext = ''
    else:
        ext = original_name.rsplit('.', 1)[1].lower()
    if ext not in PAY_QR_EXTENSIONS:
        # 往收款码入口传脚本、传别的格式，多半是试探而不是手滑，单独留痕。
        # detail 里不再拼一遍操作人 —— security_event 自己会记 ip/user/role，
        # 这里再写一次，日志就会变成「user=#2/小明 #2/小明 上传了……」。
        security_event('pay_qr_blocked_type', '上传了不在白名单内的收款码文件「%s」' % original_name[:80])
        return jsonify({
            'code': 400,
            'msg': '只支持图片格式：' + '、'.join('.' + e for e in PAY_QR_EXTENSIONS)
        }), 400

    # 读进内存再判大小，而不是先落盘再看 os.path.getsize：
    # 收款码上限只有几 MB，读进来的代价可以忽略，换来的是「绝不会有一个超限的
    # 文件先落在磁盘上」—— 先落盘的话，超限时又得删一次，删失败就留下垃圾。
    data = upload.read()
    if not data:
        # 0 字节的图在各个界面上都表现为「收款码没显示出来」，用户只会认为功能坏了。
        # 在门口说清楚比他回头去猜为什么邮件里没图要省事。
        return jsonify({'code': 400, 'msg': '这个图片是空的（0 字节），换一张再试'}), 400
    if len(data) > PAY_QR_MAX_BYTES:
        return jsonify({
            'code': 400,
            'msg': '图片太大了（上限 %d MB），请压缩后再上传'
                   % (PAY_QR_MAX_BYTES // (1024 * 1024))
        }), 400

    new_filename = '%s.%s' % (uuid.uuid4().hex, ext)
    save_path = os.path.join(PAY_QR_FOLDER, new_filename)

    # 名字是我们自己生成的 uuid，理论上越不出目录；再确认一次是为了万一以后
    # 有人把这里改成沿用用户传来的原始文件名 —— 那时这一行就是最后一道拦网。
    if Path(save_path).resolve().parent != _qr_dir():
        security_event('pay_qr_path_blocked', '收款码落盘路径不在收款码目录内')
        return jsonify({'code': 400, 'msg': '上传失败，请稍后重试'}), 400

    try:
        with open(save_path, 'wb') as fh:
            fh.write(data)
    except OSError:
        logger.exception('收款码：写文件失败（name=%s）', new_filename)
        return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    with db_conn() as conn:
        try:
            row = conn.execute('SELECT pay_qr_file FROM users WHERE id = ?', (g.user['id'],)).fetchone()
            old_filename = row['pay_qr_file'] if row else None
            conn.execute('UPDATE users SET pay_qr_file = ? WHERE id = ?', (new_filename, g.user['id']))
            conn.commit()
        except sqlite3.Error:
            # 库没写进去，刚落盘的那张图就是孤儿，必须自己收拾掉
            logger.exception('收款码：写库失败，回滚已落盘的文件（name=%s）', new_filename)
            _remove_qr_file(new_filename)
            return jsonify({'code': 500, 'msg': '保存失败，请稍后重试'}), 500

    # 到这一步库里已经是新文件名了，旧图才允许删
    if old_filename and old_filename != new_filename:
        _remove_qr_file(old_filename)

    logger.info('收款码：%s 已更新（%sKB）ip=%s',
                actor_label(), len(data) // 1024, client_ip())
    return jsonify({'code': 0, 'msg': '收款码已更新', 'pay_qr_version': new_filename})


@bp.route('/api/me/pay-qr', methods=['DELETE'])
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def delete_pay_qr():
    """删掉本人收款码。删完之后邮件里就不带图了（文案会换成「向管理员付款」）。"""
    with db_conn() as conn:
        try:
            row = conn.execute('SELECT pay_qr_file FROM users WHERE id = ?', (g.user['id'],)).fetchone()
            old_filename = row['pay_qr_file'] if row else None
            conn.execute('UPDATE users SET pay_qr_file = NULL WHERE id = ?', (g.user['id'],))
            conn.commit()
        except sqlite3.Error:
            logger.exception('收款码：删除时写库失败')
            return jsonify({'code': 500, 'msg': '删除失败，请稍后重试'}), 500

    _remove_qr_file(old_filename)
    logger.info('收款码：%s 已删除 ip=%s', actor_label(), client_ip())
    return jsonify({'code': 0, 'msg': '收款码已删除'})


@bp.route('/api/me/pay-qr')
@roles_required(ROLE_ADMIN, ROLE_SUPER)
def get_pay_qr():
    """把本人收款码图片发回去，供上传页预览。

    每次都现读磁盘、且 max_age=0：换码之后必须立刻看到新的，
    浏览器缓存住旧图会让管理员以为「上传没生效」，然后反复上传。
    前端另有一个 ?v=文件名 的版本参数，两层一起挡。
    """
    path = _resolve_qr_path(g.user.get('pay_qr_file'))
    if path is None:
        return jsonify({'code': 404, 'msg': '还没有上传收款码'}), 404
    return send_file(path, mimetype=_MIME_TYPES.get(path.suffix[1:].lower()),
                     max_age=0)
