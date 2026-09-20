"""routes/upload_chunks.py —— 分片上传：为「跨洋慢网络下传大文件」准备的。

## 为什么需要它

生产服务器在美国，国内上传一份 30MB 的 PDF 可能要几分钟。单片 POST 的痛点不是
「慢」，而是「一断就得从头再来」—— 传到 90% 掉线，前面那几分钟白花。
分片把一次大上传拆成若干个 8MB 的请求：某个请求失败只影响那一片，重传一片就行。

## 为什么不做「真正的断点续传」（刷新后自动接着传）

浏览器安全策略不允许 JS 读取本地文件的内容。页面一刷新，前端手里那个 File 对象
就没了，拿不到数据自然无从续传。所以这里的续传是：
**服务端记住已经收到的分片，用户重新选中同一个文件后，前端跳过已传部分继续。**
省掉的是已经走过的流量，不是「重新选文件」这个动作。

## 磁盘布局

    UPLOAD_FOLDER/
      .chunks/
        <upload_id>/
          meta.json      会话元数据（一次写入，之后只读）
          p000000        分片 0，写完后由 .tmp 原子改名而来
          p000001
        <upload_id>.lock   合并锁（文件）。O_CREAT|O_EXCL 抢占；
                           持有者结束后删除；超过 MERGE_LOCK_STALE_SECONDS
                           的残锁会被下一次提交接管

会话目录在合并期间原地不动，不再改名。.lock 是文件，不会被
_UPLOAD_ID_RE（只认 <upload_id>）当成会话，也不会被 _cleanup_stale
（只处理目录）当作会话目录清理。

meta.json 里记着 user_id，所有操作都要比对，别人的 upload_id 猜到了也用不了。
"""
import json
import os
import re
import secrets
import shutil
import time
import uuid

from flask import Blueprint, g, jsonify, request

from auth import login_required
from config import (
    ALLOWED_EXTENSIONS,
    MAX_UPLOAD_BYTES,
    MAX_UPLOAD_MB,
    UPLOAD_FOLDER,
    logger,
)
from security import client_ip, hit_limit, rate_limited, security_event
from db import db_conn
from utils import allowed_file, content_signature_error, parse_copies

from .orders import (
    UPLOAD_MAX_IN_WINDOW,
    UPLOAD_WINDOW_SECONDS,
    create_order_from_saved_file,
    quota_rejection,
    register_chunk_usage_provider,
    resolve_print_options,
)

bp = Blueprint('upload_chunks', __name__)

# 每片 8MB。取值的依据是跨洋 RTT：多一个请求就多一个「一来一回」，
# 片太小（比如 1MB）会让 50MB 变成五十次往返，光延迟就够呛；
# 片太大又失去意义（一断就要重传一大坨）。8MB 大约 50MB 分 7 片，
# 在 300KB/s 的家用上行下每片十秒出头，失败重传的代价可以接受。
# 与上限取 min，是为了「把 MAX_UPLOAD_MB 调小」时依然成立。
CHUNK_SIZE = min(8 * 1024 * 1024, MAX_UPLOAD_BYTES)

# 未完成会话的存活时间。超过就当作放弃，并顺手把磁盘上的分片清掉 ——
# 不清理的话，用户传一半直接关页面，那些分片会永远占着磁盘。
CHUNK_TTL_SECONDS = 24 * 3600

# 同一个账号最多同时挂几份没传完的。这不是防攻击，是防「手滑」：
# 反复选错文件再关页面，很容易攒下几十份垃圾会话把磁盘吃掉。
MAX_PENDING_PER_USER = 3

# 频控。init / part 的量级完全不同：一次上传 init 一次、part 七八次，
# 所以分开计数，阈值都留了很宽的余量，只为挡住脚本狂刷。
INIT_MAX_IN_WINDOW = 30
PART_MAX_IN_WINDOW = 240
INIT_WINDOW_SECONDS = 60
PART_WINDOW_SECONDS = 60

# 合并锁多久算「持有者已经不在了」。正常合并 50MB 顶多几十秒，
# 取一小时是「任何还活着的合并都不可能这么久」的保守上界：
# 超过它的锁一定是崩溃留下的残骸，允许下一次提交直接接管。
MERGE_LOCK_STALE_SECONDS = 3600

CHUNK_ROOT = os.path.join(UPLOAD_FOLDER, '.chunks')

# upload_id 由本模块用 secrets.token_urlsafe 生成，格式可控。
# 这里再校验一次，是因为它会直接拼进文件系统路径 ——
# 不校验就等于把「../」这种路径穿越的钥匙交出去了。
_UPLOAD_ID_RE = re.compile(r'^[A-Za-z0-9_-]{16,64}$')


# ---------------------------------------------------------------- 内部工具

def _part_name(index):
    """分片在磁盘上的文件名。定长补零是为了让文件名排序和序号一致，方便人工排查。"""
    return 'p%06d' % index


def _expected_part_size(meta, index):
    """第 index 片**应该**有多大。最后一片是余数，其余都是整片。

    校验分片大小不是多此一举：只有确认每一片都是完整的一片，
    合并出来的文件才敢信。不然「传了一半的分片」会静默拼进结果里，
    用户拿到的 PDF 打不开，而我们这边一个错误日志都不会有。
    """
    if index == meta['total_chunks'] - 1:
        return meta['size'] - CHUNK_SIZE * index
    return CHUNK_SIZE


def _session_dir(upload_id):
    return os.path.join(CHUNK_ROOT, upload_id)


def _lock_path(upload_id):
    """合并锁在磁盘上的位置。

    刻意用「会话 id + .lock」这个独立文件，而不是把会话目录本身搬走：
    搬目录当锁，等于把「锁被占着」和「数据不在了」变成同一件事，
    而这两件事必须分得开 —— 抢不到锁的人不该看到、更不该碰到别人的数据。
    """
    return os.path.join(CHUNK_ROOT, upload_id + '.lock')


def _merge_lock_is_stale(lock_path):
    """锁是不是「持有者早就不在了」的残锁。

    只有时间这一个判据：正常合并 50MB 顶多几十秒，超过 MERGE_LOCK_STALE_SECONDS
    还没放掉的锁，持有它的进程一定已经不在了（被 kill、断电、容器重启）。
    读不到 mtime 时返回 False —— 宁可多挡一次提交，也不去抢一把可能还活着的锁。
    """
    try:
        return time.time() - os.path.getmtime(lock_path) >= MERGE_LOCK_STALE_SECONDS
    except OSError:
        return False


def _try_create_lock(lock_path):
    """独占创建锁文件。成功返回 True，已被占用返回 False。

    其它 OSError（权限、磁盘满）原样抛出：创建锁失败和「别人正在合并」
    是两件完全不同的事，混成一句话会让运维拿着并发问题去查磁盘。

    为什么用 O_CREAT|O_EXCL 而不是「先 os.path.exists 再动手」：
    后者的两半之间隔着一段窗口，两个请求可以双双通过检查再一起动手，
    而独占创建在内核里就是原子的，只有一个能成功。
    """
    try:
        fd = os.open(lock_path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except FileExistsError:
        return False
    try:
        # 内容只为人排查（谁、什么时候拿的锁），写不进去不影响抢占结果
        os.write(fd, ('%s %s' % (os.getpid(), int(time.time()))).encode('ascii'))
    except OSError:
        pass
    finally:
        os.close(fd)
    return True


def _acquire_merge_lock(upload_id):
    """抢「合并权」，返回 (lock_path, busy)。busy 为真表示别人正在合并。

    被挡住之后还要分辨一次：是「有人正在合并」（如实回 409），
    还是「上次崩溃留下的残锁」（必须能自愈）。残锁放着不管的话，
    这份上传会被永久挡在「正在处理中」外面，只能等 24 小时过期、
    或者用户自己取消重传 —— 那等于把一次崩溃的成本转嫁给用户。
    """
    lock_path = _lock_path(upload_id)
    if _try_create_lock(lock_path):
        return lock_path, False
    if not _merge_lock_is_stale(lock_path):
        return None, True
    logger.warning('发现过期的合并锁，接管 upload_id=%s: %s', upload_id, lock_path)
    try:
        os.remove(lock_path)
    except OSError:
        return None, True
    if _try_create_lock(lock_path):
        return lock_path, False
    # 清掉残锁和重新创建之间被人抢先，属于正常竞争，照实回「正在处理中」
    return None, True


def _release_merge_lock(lock_path):
    """放锁。

    删不掉只记 warning：锁会留到过期后被下一次提交接管，期间这份上传一直
    提示「正在处理中」——不理想，但已经完成的这次合并不受影响。
    """
    try:
        os.remove(lock_path)
    except OSError:
        logger.warning('删除合并锁失败，这份上传在锁过期前会一直提示「正在处理中」: %s', lock_path)


def _read_meta(session_dir):
    """读会话元数据。任何异常都当「这个会话不存在」处理 —— 损坏的 meta 没法信任。"""
    try:
        with open(os.path.join(session_dir, 'meta.json'), 'r', encoding='utf-8') as fp:
            return json.load(fp)
    except (OSError, ValueError):
        return None


def _received_indexes(session_dir):
    """扫目录得出已经收齐的分片序号。

    故意不单独维护一份「已收到哪些片」的记录：多一份状态就多一处可能对不上的地方，
    而磁盘本身就是真相 —— 目录里有哪些完整分片，就是收到了哪些。
    """
    found = []
    try:
        for name in os.listdir(session_dir):
            if len(name) == 7 and name[0] == 'p' and name[1:].isdigit():
                index = int(name[1:])
                # 顺手校验大小：不完整的片（异常中断留下的）不能算数
                if os.path.getsize(os.path.join(session_dir, name)) > 0:
                    found.append(index)
    except OSError:
        return []
    found.sort()
    return found


def _cleanup_stale(reason):
    """惰性地清掉过期会话。

    为什么不做定时任务：这个项目刻意保持「一个进程、零后台线程」的形态，
    引入调度器会带来新的部署复杂度（多进程下还会重复执行）。
    惰性清理挂在 init / 列表接口上就够了 —— 只有想开新会话的人才需要空间，
    也就在那一刻顺手把垃圾收了。

    判据用**目录 mtime** 而不是 meta 里的 created_at：一个传了 20 小时、
    断断续续还在传的会话不该被清掉，而每次写新分片都会刷新目录 mtime。
    """
    if not os.path.isdir(CHUNK_ROOT):
        return 0
    now = time.time()
    removed = 0
    try:
        names = os.listdir(CHUNK_ROOT)
    except OSError:
        return 0
    for name in names:
        path = os.path.join(CHUNK_ROOT, name)
        if not os.path.isdir(path):
            continue
        try:
            touched = os.path.getmtime(path)
        except OSError:
            continue
        if now - touched < CHUNK_TTL_SECONDS:
            continue
        shutil.rmtree(path, ignore_errors=True)
        removed += 1
    if removed:
        logger.info('清理过期的分片上传会话 %s 个（触发点：%s）', removed, reason)
    return removed


def _session_bytes(session_dir):
    """一个会话目录此刻实际占了多少字节。

    按目录里的**实际字节**数，不按 meta 里声明的大小：声明值是客户端送来的，
    而这里要回答的是「盘已经被占掉多少」，在传到一半的会话上这两个数差得很远
    —— 按声明值算的话，一个几乎没开始传的会话会被当成已经占满了额度。

    会话目录是平铺的（meta.json + p000000…，外加中断留下的临时文件），
    扫一层就够。扫不动（会话刚被别的请求清掉）就按 0 算，
    它本来也已经不占盘了。
    """
    total = 0
    try:
        with os.scandir(session_dir) as entries:
            for entry in entries:
                try:
                    total += entry.stat().st_size
                except OSError:
                    continue
    except OSError:
        return 0
    return total



def _pending_of_user(user_id):
    """列出这个账号还没传完的会话（按创建时间倒序）。"""
    result = []
    if not os.path.isdir(CHUNK_ROOT):
        return result
    try:
        names = os.listdir(CHUNK_ROOT)
    except OSError:
        return result
    for name in names:
        # 名字必须是合法 upload_id：合并锁是 <id>.lock（带点号，这个正则认不出来），
        # 不过滤的话会把它当成一份未完成的会话推给前端。合并期间会话目录本身
        # 原地不动，所以「正在合并」的那份仍然会出现在这个列表里 —— 这正是想要的。
        if not _UPLOAD_ID_RE.match(name):
            continue
        meta = _read_meta(os.path.join(CHUNK_ROOT, name))
        if not isinstance(meta, dict) or meta.get('user_id') != user_id:
            continue
        result.append((name, meta))
    result.sort(key=lambda item: item[1].get('created_at', 0), reverse=True)
    return result



def _chunk_usage_info(user_id):
    """这个账号所有「还没传完的会话」占了多少字节、有几份。

    挂给 orders.register_chunk_usage_provider 用，让配额判定（在 orders 那边）
    也能看见分片占的这部分盘。放在这里是因为只有本模块知道会话目录的形状
    （见 orders.pending_disk_bytes 里那段说明：两边各抄一份迟早会漏）。

    同时给出**份数**和上限：设置页要能说清「有 2 份没传完、最多 3 份」，
    而 MAX_PENDING_PER_USER 这个上限就住在本模块里（它是本模块的规矩，
    不该在别处再抄一遍数字 —— 抄的那份改了不会报错，只是界面上那句话变成了假的）。

    按**实际字节**数而不是 meta 里声明的大小：这里要回答的是「盘已经被占掉多少」，
    在传到一半的会话上，声明值和实际值差得很远 —— 按声明值算的话，
    一个几乎没开始传的会话会被当成已经占满了额度。
    """
    pending = _pending_of_user(user_id)
    return {
        'bytes': sum(_session_bytes(_session_dir(uid)) for uid, _meta in pending),
        'sessions': len(pending),
        'max_sessions': MAX_PENDING_PER_USER,
    }



# 注册给配额判定用。放在模块级（import 时执行一次）：只要这个蓝图被挂上，
# 配额就算得进分片占用；而没走应用启动的脚本（比如单独测 orders）拿不到它，
# 也不会因此报错，只是少算一部分 —— 那正是 pending_disk_bytes 里那个默认值的作用。
register_chunk_usage_provider(_chunk_usage_info)


def _session_info(upload_id, meta, received=None):
    """会话对外的样子。绝不包含服务器上的绝对路径。"""
    if received is None:
        received = _received_indexes(_session_dir(upload_id))
    age = time.time() - meta.get('created_at', 0)
    return {
        'upload_id': upload_id,
        'filename': meta['filename'],
        'size': meta['size'],
        'chunk_size': CHUNK_SIZE,
        'total_chunks': meta['total_chunks'],
        'received': received,
        'received_count': len(received),
        # 前端拿它显示「还剩多久失效」，省得用户以为可以放到明天再传
        'expires_in': max(0, int(CHUNK_TTL_SECONDS - age)),
    }


def _load_session(upload_id):
    """校验 upload_id 与归属。

    返回 (session_dir, meta, error)。error 非 None 时说明校验没过，
    前两项无意义，调用方直接 `return error` 就是完整的响应。
    用三元组而不是「第二个值有时是 meta、有时是响应」的写法：
    后者在调用点读起来完全看不出区别，是最容易踩的那种坑。
    """
    if not _UPLOAD_ID_RE.match(upload_id or ''):
        return None, None, (jsonify({'code': 400, 'msg': '上传会话无效'}), 400)
    session_dir = _session_dir(upload_id)
    meta = _read_meta(session_dir)
    if meta is None:
        # 会话不存在有两种常见原因：过期被清掉了，或者用户换了台设备。
        # 前端的处理都是「重新开始」，所以这里给一句人话就够了。
        return None, None, (jsonify({'code': 404, 'msg': '这份上传已失效，请重新上传'}), 404)
    # meta 是磁盘上的 JSON，可能被截断或改坏。缺字段时如果继续往下走，
    # 报出来的是 KeyError 500，而不是「这份上传失效了」—— 排查起来会绕远路。
    if not all(key in meta for key in ('user_id', 'filename', 'size', 'total_chunks')):
        logger.warning('分片上传元数据不完整，按失效处理: %s', session_dir)
        return None, None, (jsonify({'code': 404, 'msg': '这份上传已失效，请重新上传'}), 404)
    if meta.get('user_id') != g.user['id']:
        # 拿到别人的 upload_id 想往里塞分片：典型越权，必须留痕
        security_event('chunk_access_denied',
                       '账号 %s 试图操作 uid=%s 的上传会话 %s'
                       % (g.user['nickname'], meta.get('user_id'), upload_id))
        return None, None, (jsonify({'code': 403, 'msg': '无权操作这份上传'}), 403)
    return session_dir, meta, None


def _int_or_none(value):
    """把 JSON 里的值掰成正整数；掰不动返回 None。"""
    if isinstance(value, bool):  # bool 是 int 的子类，得先排掉
        return None
    try:
        number = int(value)
    except (TypeError, ValueError):
        return None
    return number if number > 0 else None


# ---------------------------------------------------------------- 接口

@bp.route('/api/upload/chunked', methods=['POST'])
@login_required
def api_chunk_init():
    """开一次分片上传会话。

    前端在「文件超过 CHUNK_SIZE」时先调它，拿到 upload_id 和分片数，
    然后按片往 /api/upload/chunked/<upload_id>/<index> 上传。
    """
    if hit_limit('chunkinit:%s' % g.user['id'], INIT_MAX_IN_WINDOW, INIT_WINDOW_SECONDS):
        return rate_limited('chunk_init_rate_limited',
                            '账号 %s 在 %s 秒内开启了超过 %s 次分片上传'
                            % (g.user['nickname'], INIT_WINDOW_SECONDS, INIT_MAX_IN_WINDOW),
                            '上传太频繁了，稍等一会儿再试')

    _cleanup_stale('init')

    data = request.get_json(silent=True) or {}
    # 「用了预设服务就不许传文件」这条规矩要在**每条**能落盘的入口上成立，
    # 分片这条路也得挡。只挡单片直传的话，前端把 sort 一改就能下出
    # 「既是预设、又带文件」的单 —— 而这一单在打印员眼里到底要不要打文件，
    # 没有任何约定，只能靠猜。
    if data.get('preset_id'):
        return jsonify({'code': 400, 'msg': '用了预设服务就不用再传文件了，请重新选择'}), 400
    raw_name = data.get('filename') or ''
    if not isinstance(raw_name, str) or not raw_name.strip():
        return jsonify({'code': 400, 'msg': '请选择要上传的文件'}), 400

    # basename 是必做的：浏览器理论上不会给出带路径的文件名，
    # 但这个值会被写进 meta 并在建订单时落库，不能假设客户端老实。
    original_name = os.path.basename(raw_name.strip())[:200]
    if not allowed_file(original_name):
        security_event('upload_blocked_type', '分片上传：文件「%s」不在白名单内' % original_name[:80])
        return jsonify({
            'code': 400,
            'msg': '不支持的文件类型，仅允许：' + '、'.join(sorted(ALLOWED_EXTENSIONS))
        }), 400

    size = _int_or_none(data.get('size'))
    if size is None:
        return jsonify({'code': 400, 'msg': '文件大小不正确'}), 400
    if size > MAX_UPLOAD_BYTES:
        # 提前拦比传完再拦友好得多：前者一秒就告诉用户，后者让他白等几分钟
        security_event('upload_too_large',
                       '分片上传声明大小 %s 字节，超过 %s MB 上限' % (size, MAX_UPLOAD_MB))
        return jsonify({
            'code': 413,
            'msg': '文件太大，单个文件不能超过 %s MB' % MAX_UPLOAD_MB
        }), 413

    # 幂等：同一个文件重复 init（前端重试、或用户刷新页面后又选了同一个文件）
    # 直接复用已有会话，不会平白多出一份重复分片。前端也因此可以放心重试这个请求。
    for pending_id, meta in _pending_of_user(g.user['id']):
        if meta.get('filename') == original_name and meta.get('size') == size:
            return jsonify({
                'code': 0,
                'msg': '继续上次未完成的上传',
                'resumed': True,
                **_session_info(pending_id, meta),
            })

    pending = _pending_of_user(g.user['id'])
    if len(pending) >= MAX_PENDING_PER_USER:
        # 这里返回的是人话而不是「配额超限」：用户多半不知道自己攒了几份半截上传，
        # 告诉他去哪看、怎么处理，比让他对着一个报错发呆强。
        return jsonify({
            'code': 429,
            'msg': '你还有 %s 份没传完的文件，请先把它们传完或取消，再来上传新的'
                   % len(pending)
        }), 429

    # 上面那条挡的是会话**数量**，挡不住「三份都是 50MB」—— 而分片恰恰是
    # 这个系统里唯一能合法绕开单文件上限的写盘路。所以按字节再拦一道，和直传共用同一个上限。
    #
    # extra_bytes 只传**这一份新会话**的声明大小：已经在传的那些会话按实际字节算，
    # 而那一部分已经由 pending_disk_bytes 内部（经 register_chunk_usage_provider）
    # 一起算进去了，这里再传一次就是重复计数 —— 两边都以为对方没算，
    # 结果是一份从没传过的会话也能把人顶到上限。
    #
    # 分片 PUT 时不再查一遍：一次会话的总量在 init 就已经按 size 全算进来了
    # （每片的期望大小在 PUT 里逐个核对、合并时还要复核），中途涨不出这个数。
    # 放在「续传」分支之后也是有意的：续传不会新占额度，
    # 把人挡在这里只会让他完不成、额度也退不掉。
    quota_error = quota_rejection(size)
    if quota_error is not None:
        return quota_error

    total_chunks = (size + CHUNK_SIZE - 1) // CHUNK_SIZE
    upload_id = secrets.token_urlsafe(18)
    session_dir = _session_dir(upload_id)
    try:
        os.makedirs(session_dir, exist_ok=False)
    except OSError:
        # 同名目录基本不可能（token 是随机的），真撞上就让用户重试一次
        logger.exception('创建分片上传会话目录失败: %s', session_dir)
        return jsonify({'code': 500, 'msg': '创建上传会话失败，请重试'}), 500

    meta = {
        'user_id': g.user['id'],
        'filename': original_name,
        'size': size,
        'total_chunks': total_chunks,
        'created_at': time.time(),
    }
    try:
        with open(os.path.join(session_dir, 'meta.json'), 'w', encoding='utf-8') as fp:
            json.dump(meta, fp, ensure_ascii=False)
    except OSError:
        shutil.rmtree(session_dir, ignore_errors=True)
        logger.exception('写入分片上传元数据失败: %s', session_dir)
        return jsonify({'code': 500, 'msg': '创建上传会话失败，请重试'}), 500

    logger.info('分片上传开始 upload_id=%s 用户=%s 文件=%s 大小=%sKB 共 %s 片 ip=%s',
                upload_id, g.user['nickname'], original_name,
                size // 1024, total_chunks, client_ip())
    return jsonify({
        'code': 0,
        'msg': '可以开始上传',
        'resumed': False,
        **_session_info(upload_id, meta, received=[]),
    })


@bp.route('/api/upload/chunked', methods=['GET'])
@login_required
def api_chunk_list():
    """列出本账号没传完的会话 —— 页面刷新后靠它给出「继续上次上传」的提示。"""
    _cleanup_stale('list')
    sessions = [_session_info(uid, meta) for uid, meta in _pending_of_user(g.user['id'])]
    return jsonify({'code': 0, 'sessions': sessions, 'max_pending': MAX_PENDING_PER_USER})


@bp.route('/api/upload/chunked/<upload_id>', methods=['GET'])
@login_required
def api_chunk_status(upload_id):
    """查一份会话的进度：重选同一个文件后，前端用它决定从第几片开始传。"""
    session_dir, meta, failure = _load_session(upload_id)
    if failure is not None:
        return failure
    return jsonify({'code': 0, **_session_info(upload_id, meta)})


@bp.route('/api/upload/chunked/<upload_id>/<int:index>', methods=['PUT'])
@login_required
def api_chunk_put(upload_id, index):
    """上传第 index 片。请求体是**原始二进制**，不是 multipart。

    用原始 body 而不是 form-data：multipart 要传一遍边界和 part 头，解析也更重，
    而这里除了字节什么都没有。少一层封装，慢网络下的每一片都能省一点点。

    幂等：这一片已经收过了就直接返回成功。网络抖动导致前端重发同一片是常态，
    这时回一个错误只会让前端以为传丢了、再重试——白折腾一圈。
    """
    if hit_limit('chunkpart:%s' % g.user['id'], PART_MAX_IN_WINDOW, PART_WINDOW_SECONDS):
        return rate_limited('chunk_part_rate_limited',
                            '账号 %s 在 %s 秒内上传超过 %s 个分片'
                            % (g.user['nickname'], PART_WINDOW_SECONDS, PART_MAX_IN_WINDOW),
                            '上传太频繁了，稍等一会儿再试')

    session_dir, meta, failure = _load_session(upload_id)
    if failure is not None:
        return failure

    if index < 0 or index >= meta['total_chunks']:
        return jsonify({'code': 400, 'msg': '分片序号超出范围'}), 400

    part_path = os.path.join(session_dir, _part_name(index))
    expected = _expected_part_size(meta, index)
    if os.path.exists(part_path) and os.path.getsize(part_path) == expected:
        # 这一片已经完整收好了，重传也直接说成功
        return jsonify({
            'code': 0,
            'msg': '这一片已经上传过了',
            'skipped': True,
            **_session_info(upload_id, meta),
        })

    # 先按 Content-Length 对一遍。Content-Length 缺失（分块传输编码）时也不能放行，
    # 否则写入量无从预期，一片就可能把磁盘写满。
    declared = request.content_length
    if declared is None or declared != expected:
        # 大小对不上通常意味着前端切片逻辑算错了，也可能是有人手动构造请求。
        # 两种情况都不该把字节写进磁盘。
        security_event('chunk_size_mismatch',
                       '会话 %s 第 %s 片声明 %s 字节，期望 %s 字节'
                       % (upload_id, index, declared, expected))
        return jsonify({
            'code': 400,
            'msg': '分片大小不正确，请刷新页面后重试'
        }), 400

    # 临时文件用随机名：同一个分片并发重传时各写各的临时文件，
    # 谁最后改名成功谁留下，不会互相写坏。
    tmp_path = os.path.join(session_dir, '.%s.tmp' % uuid.uuid4().hex)
    written = 0
    try:
        with open(tmp_path, 'wb') as out:
            stream = request.stream
            while True:
                buf = stream.read(256 * 1024)
                if not buf:
                    break
                written += len(buf)
                if written > expected:
                    # 已经超过预期了，再写下去只会占磁盘 —— 立刻中断
                    raise ValueError('请求体比分片大小还长')
                out.write(buf)
        if written != expected:
            raise ValueError('实际收到 %s 字节，期望 %s 字节' % (written, expected))
        # 只有确认写全了才改名成正式分片名，这一步是原子的
        os.replace(tmp_path, part_path)
    except ValueError:
        if os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                logger.warning('清理分片临时文件失败: %s', tmp_path)
        logger.warning('分片上传失败 upload_id=%s 第 %s 片：写入 %s 字节 / 期望 %s 字节 ip=%s',
                       upload_id, index, written, expected, client_ip())
        return jsonify({'code': 400, 'msg': '分片上传失败，请重试'}), 400
    except OSError:
        if os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                pass
        logger.exception('分片写入失败 upload_id=%s 第 %s 片 ip=%s',
                         upload_id, index, client_ip())
        return jsonify({'code': 500, 'msg': '服务器暂时无法接收这份分片，请稍后重试'}), 500
    except Exception:
        if os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except OSError:
                pass
        logger.exception('分片写入失败 upload_id=%s 第 %s 片 ip=%s',
                         upload_id, index, client_ip())
        return jsonify({'code': 500, 'msg': '服务器暂时无法接收这份分片，请稍后重试'}), 500

    return jsonify({
        'code': 0,
        'msg': '已收到',
        **_session_info(upload_id, meta),
    })


@bp.route('/api/upload/chunked/<upload_id>/complete', methods=['POST'])
@login_required
def api_chunk_complete(upload_id):
    """把分片合并成完整文件并下单。"""
    # 分片请求不计入上传频控（一次上传本来就有好几片），但「下单」这件事要计，
    # 而且和单片直传共用同一个计数器：不管走哪条路，一分钟能下多少单是同一个额度。
    if hit_limit('upload:%s' % g.user['id'], UPLOAD_MAX_IN_WINDOW, UPLOAD_WINDOW_SECONDS):
        return rate_limited('upload_rate_limited',
                            '账号 %s 在 %s 秒内提交超过 %s 次上传'
                            % (g.user['nickname'], UPLOAD_WINDOW_SECONDS, UPLOAD_MAX_IN_WINDOW),
                            '上传太频繁了，稍等一会儿再试')

    session_dir, meta, failure = _load_session(upload_id)
    if failure is not None:
        return failure

    data = request.get_json(silent=True) or {}
    # 同上：预设服务不许带文件。init 那关挡过一道，这里再挡一道 ——
    # init 是几分钟前调的，中间改个参数重发 complete 就能绕过去。
    if data.get('preset_id'):
        return jsonify({'code': 400, 'msg': '用了预设服务就不用再传文件了，请重新选择'}), 400
    color = data.get('color', 'black')
    duplex = data.get('duplex', 'single')
    remark = (data.get('remark') or '').strip()[:200]
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'

    # 份数和纸张与单片直传同一套校验（parse_copies / resolve_print_options）。
    # 两边各写一套的下场是「大文件小文件能填的份数不一样」，没人能解释。
    copies, error = parse_copies(data.get('copies'))
    if error:
        return jsonify({'code': 400, 'msg': error}), 400
    with db_conn() as options_conn:
        paper, error = resolve_print_options(options_conn, data)
    if error:
        return jsonify({'code': 400, 'msg': error}), 400

    # 抢合并权。
    #
    # 原先的写法是「把整个会话目录改名成 <id>.merging」来当锁：发现 .merging
    # 存在就把它 rmtree 掉，理由是「那一定是上次被杀留下的残骸」。两个人同时点
    # 提交（或前端超时重试）时，后到的那一方会先删掉前一方正在读的目录，再发现
    # 会话目录已经不在了 —— 结果两边都失败，而用户传了半天的分片一条不剩。
    # 改名本身确实是原子的，问题出在它前面那句「先清掉残骸」。
    #
    # 锁文件把「占住位置」和「动数据」拆成了两件事：抢不到的人只拿到一个 409，
    # 碰不到别人的任何数据；会话目录也不再中途消失，进程被杀不会留下残骸。
    try:
        lock_path, busy = _acquire_merge_lock(upload_id)
    except OSError as exc:
        logger.exception('创建合并锁失败 upload_id=%s：%s', upload_id, exc)
        return jsonify({'code': 500, 'msg': '服务器暂时无法处理这份上传，请稍后重试'}), 500
    if busy:
        # 重复提交是常见操作（双击、超时重试），不是攻击，记 INFO
        logger.info('分片合并已被占用 upload_id=%s ip=%s', upload_id, client_ip())
        return jsonify({'code': 409, 'msg': '这份上传正在处理中，请勿重复提交'}), 409

    ext = meta['filename'].rsplit('.', 1)[1].lower()
    final_path = os.path.join(UPLOAD_FOLDER, '%s.%s' % (uuid.uuid4().hex, ext))
    try:
        received = set(_received_indexes(session_dir))
        missing = [i for i in range(meta['total_chunks']) if i not in received]
        if missing:
            # 会话目录原地没动过，用户把那几片补上再提交就行，不用从头开始
            return jsonify({
                'code': 400,
                'msg': '还有 %s 个分片没有收到，请继续上传' % len(missing),
                'missing': missing,
            }), 400

        with open(final_path, 'wb') as out:
            for index in range(meta['total_chunks']):
                part_path = os.path.join(session_dir, _part_name(index))
                # 每片的大小都要对得上 —— 前面收分片时已经查过一遍，
                # 这里再查是因为「文件被别人动过」和「磁盘写满」都只会在这一刻暴露。
                actual = os.path.getsize(part_path)
                want = _expected_part_size(meta, index)
                if actual != want:
                    raise ValueError('第 %s 片大小是 %s，期望 %s' % (index, actual, want))
                with open(part_path, 'rb') as src:
                    shutil.copyfileobj(src, out, 1024 * 1024)

        merged_size = os.path.getsize(final_path)
        if merged_size != meta['size']:
            raise ValueError('合并后 %s 字节，声明的是 %s 字节' % (merged_size, meta['size']))

        # 内容校验只能放在这一刻：init 时手上只有文件名和声明的大小，
        # 里面装的是什么字节，要到分片拼成一个完整文件之后才看得到。
        content_error = content_signature_error(final_path, ext)
        if content_error is not None:
            security_event('upload_content_mismatch',
                           '分片上传 upload_id=%s 文件「%s」的内容与扩展名 %s 不符'
                           % (upload_id, meta['filename'][:80], ext))
            # 整份丢掉，会话目录也一起清：这份文件里有问题的字节是接单人**必然会打开**的，
            # 留一份在盘上等人点开，正是要防的那件事；而同样的内容再合并一次也不会变得合规。
            try:
                os.remove(final_path)
            except OSError:
                logger.warning('清理内容校验失败的合并文件失败: %s', final_path)
            shutil.rmtree(session_dir, ignore_errors=True)
            return jsonify({'code': 400, 'msg': content_error}), 400

        # 落库。合并出来的文件和直传落盘的文件在这一点上没有任何区别，
        # 所以走同一个函数——取件码重摇、失败清理都只有一份实现。
        order_id, pickup_code = create_order_from_saved_file(
            meta['filename'], final_path, color, duplex, remark, copies, paper)
    except Exception:
        # create_order_from_saved_file 失败时自己删了文件；这里兜住合并阶段抛出的异常
        if os.path.exists(final_path):
            try:
                os.remove(final_path)
            except OSError:
                logger.warning('清理合并失败的文件失败: %s', final_path)
        logger.exception('分片合并失败 upload_id=%s 文件=%s 用户=%s ip=%s',
                         upload_id, meta['filename'], g.user['nickname'], client_ip())
        # 分片仍然清掉：失败的会话本来就已经不可用（分片可能被读坏了），
        # 让用户重传比留个再也合不上的残骸更干净。与改动前同一口径。
        shutil.rmtree(session_dir, ignore_errors=True)
        return jsonify({'code': 500, 'msg': '文件合并失败，请重新上传'}), 500
    else:
        # 分片已经在合并结果里了，留着没有意义
        shutil.rmtree(session_dir, ignore_errors=True)
    finally:
        _release_merge_lock(lock_path)

    logger.info('分片上传完成（合并 -> 订单 #%s）upload_id=%s 用户=%s 文件=%s 大小=%sKB '
                '共 %s 片 取件码=%s ip=%s',
                order_id, upload_id, g.user['nickname'], meta['filename'],
                meta['size'] // 1024, meta['total_chunks'], pickup_code, client_ip())
    return jsonify({
        'code': 0,
        'msg': '上传成功！订单已记录',
        'order_id': order_id,
        'pickup_code': pickup_code,
    })


@bp.route('/api/upload/chunked/<upload_id>', methods=['DELETE'])
@login_required
def api_chunk_cancel(upload_id):
    """用户主动放弃这份上传，把分片清掉。

    有它是为了配合「每人最多 3 份未完成」：用户在选文件前就能自己腾出额度，
    而不是只能干等到 24 小时后自动过期。
    """
    session_dir, meta, failure = _load_session(upload_id)
    if failure is not None:
        return failure
    lock_path = _lock_path(upload_id)
    if os.path.exists(lock_path) and not _merge_lock_is_stale(lock_path):
        # 合并正在进行的那几秒里取消，等于把目录从合并过程脚下抽走。
        # 等一下就好，所以给 409 而不是硬删。
        return jsonify({'code': 409, 'msg': '这份上传正在处理中，请稍后再取消'}), 409
    shutil.rmtree(session_dir, ignore_errors=True)
    # 锁文件顺手清掉：它还可能是崩溃留下的残锁，而「取消」正是用户遇到
    # 「一直提示正在处理中」时唯一的自救入口 —— 不清的话他就卡在这儿了。
    try:
        os.remove(lock_path)
    except OSError:
        pass
    logger.info('用户取消分片上传 upload_id=%s 用户=%s 文件=%s ip=%s',
                upload_id, g.user['nickname'], meta.get('filename'), client_ip())
    return jsonify({'code': 0, 'msg': '已取消这份上传'})
