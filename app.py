import os
import uuid  # 用来生成唯一文件名
import sqlite3
import logging
import secrets
import threading
import time
from collections import deque
from functools import wraps
from pathlib import Path

from flask import Flask, request, jsonify, render_template, send_file
from flask_cors import CORS

from converter import count_pages


# ---------- 环境变量（从 .env 读取，已存在的系统环境变量优先） ----------
def load_env_file(env_file='.env'):
    """把 .env 里的配置读进 os.environ。

    支持 # 注释、空行、export KEY=VALUE、带引号的值。
    已经存在的系统环境变量不会被文件覆盖，方便在服务器上用系统环境变量覆盖。
    """
    path = Path(env_file)
    if not path.is_absolute():
        path = Path(__file__).resolve().parent / env_file
    if not path.is_file():
        return
    for raw_line in path.read_text(encoding='utf-8-sig').splitlines():
        line = raw_line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        if line.startswith('export '):
            line = line[len('export '):].strip()
        key, _, value = line.partition('=')
        key, value = key.strip(), value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in ('"', "'"):
            value = value[1:-1]
        if key:
            os.environ.setdefault(key, value)


load_env_file()


def env_bool(name, default=False):
    """把 true/1/yes/on 这类字符串转换成布尔值。"""
    return os.getenv(name, str(default)).strip().lower() in ('1', 'true', 'yes', 'on')


def env_int(name, default):
    """读取整数型环境变量，非法值回退到默认值。"""
    try:
        return int(os.getenv(name, str(default)).strip())
    except (TypeError, ValueError):
        return default


def env_cents(name, default):
    """读取以「分」为单位的金额配置，非法或负数回退默认值。"""
    return max(0, env_int(name, default))


# ---------- 日志 ----------
logging.basicConfig(
    level=getattr(logging, os.getenv('LOG_LEVEL', 'INFO').strip().upper(), logging.INFO),
    format='%(asctime)s [%(levelname)s] %(name)s: %(message)s',
)
logger = logging.getLogger('print_service')

# 数据库文件路径（默认放在项目目录下）
DATABASE_PATH = os.getenv('DATABASE_PATH', 'print_service.db')
if not os.path.isabs(DATABASE_PATH):
    DATABASE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), DATABASE_PATH)

# 文件保存路径（文件夹不存在时自动创建）
UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', 'C:/print/print_files/')
try:
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
except OSError as exc:
    # 权限不足时默认路径 C:/print 会创建失败。给出可操作的提示，而不是裸 PermissionError。
    raise SystemExit(
        f'无法创建文件保存目录 {UPLOAD_FOLDER}：{exc}\n'
        f'请检查该路径的写入权限，或用 UPLOAD_FOLDER 指定到用户目录下（如 ./print_files）。'
    ) from exc


def ensure_database_directory():
    """确保 SQLite 数据库所在目录存在，避免目录缺失导致创建失败。"""
    db_dir = Path(DATABASE_PATH).resolve().parent
    db_dir.mkdir(parents=True, exist_ok=True)

# 允许上传的扩展名白名单（不在名单里的一律拒绝）
ALLOWED_EXTENSIONS = {
    ext.strip().lower().lstrip('.')
    for ext in os.getenv('ALLOWED_EXTENSIONS', 'pdf,jpg,jpeg,png,doc,docx').split(',')
    if ext.strip()
}

# 订单状态机
ST_PENDING = '待打印'
ST_PRINTING = '打印中'
ST_READY = '可取了'
ST_DONE = '已取件'
ORDER_STATUSES = (ST_PENDING, ST_PRINTING, ST_READY, ST_DONE)

# 管理口令：配置后，订单列表 / 改状态接口需要携带 X-Admin-Token，留空则不校验（内网自用）
ADMIN_TOKEN = os.getenv('ADMIN_TOKEN', '').strip()

# ---------- 计价配置 ----------
# 单价单位一律是「分/面」（面 = 一页纸的一面）。加 _CENTS 后缀是为了让单位不可能
# 被搞错——一次 100 倍的定价事故就够毁掉这个功能。
# 按「面」而非「张」计价：单/双面公式完全统一，学生最容易理解（"7 页双面，每面 8 分"）。
# 店主想按张报价，把双面单价设成「每张价 ÷ 2」即可（整数分下需为偶数）。
PRICE_TABLE = {
    ('black', 'single'): env_cents('PRICE_BLACK_SINGLE_CENTS', 10),   # 黑白单面 0.10 元/页
    ('black', 'double'): env_cents('PRICE_BLACK_DOUBLE_CENTS', 8),    # 黑白双面 0.08 元/面
    ('color', 'single'): env_cents('PRICE_COLOR_SINGLE_CENTS', 100),  # 彩色单面 1.00 元/页
    ('color', 'double'): env_cents('PRICE_COLOR_DOUBLE_CENTS', 75),   # 彩色双面 0.75 元/面
}
MIN_CHARGE_CENTS = env_cents('MIN_CHARGE_CENTS', 0)   # 最低消费，0 = 不启用
MAX_COPIES = env_int('MAX_COPIES', 50)
# 取件码长度默认保持 4 位——它要能在电话里念清楚，这是核心易用性，不轻易牺牲
PICKUP_CODE_LENGTH = env_int('PICKUP_CODE_LENGTH', 4)

# /my-orders 防枚举参数（见 my_orders() 的说明）
MY_ORDERS_MAX_FAILS = env_int('MY_ORDERS_MAX_FAILS', 20)
MY_ORDERS_WINDOW_SECONDS = env_int('MY_ORDERS_WINDOW_SECONDS', 300)

# 1. 创建应用
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = env_int('MAX_UPLOAD_MB', 50) * 1024 * 1024

# 2. 跨域：默认只允许同源；确需给小程序/其它域名调用时，在 .env 配置 CORS_ORIGINS
_cors_origins = [o.strip() for o in os.getenv('CORS_ORIGINS', '').split(',') if o.strip()]
if _cors_origins:
    CORS(app, origins=_cors_origins, allow_headers=['Content-Type', 'X-Admin-Token'])

def get_db():
    """打开一个带行名访问的 SQLite 连接。调用方负责 close()。"""
    ensure_database_directory()
    conn = sqlite3.connect(DATABASE_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn


# 创建数据库表 / 补列
def init_database():
    conn = get_db()
    try:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filename TEXT NOT NULL,
                file_path TEXT NOT NULL,
                color_type TEXT,
                duplex TEXT,
                status TEXT DEFAULT '待打印',
                pickup_code TEXT,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP,
                page_count INTEGER,
                copies INTEGER DEFAULT 1,
                amount_cents INTEGER,
                paid INTEGER DEFAULT 0
            )
        ''')
        # 老库补齐后加的列（列已存在时跳过）
        existing = {row['name'] for row in cursor.execute('PRAGMA table_info(orders)')}
        for column, ddl in (
            ('pickup_code', 'ALTER TABLE orders ADD COLUMN pickup_code TEXT'),
            ('update_time', 'ALTER TABLE orders ADD COLUMN update_time TIMESTAMP'),
            ('page_count', 'ALTER TABLE orders ADD COLUMN page_count INTEGER'),
            ('copies', 'ALTER TABLE orders ADD COLUMN copies INTEGER DEFAULT 1'),
            ('amount_cents', 'ALTER TABLE orders ADD COLUMN amount_cents INTEGER'),
            ('paid', 'ALTER TABLE orders ADD COLUMN paid INTEGER DEFAULT 0'),
        ):
            if column not in existing:
                cursor.execute(ddl)
        # 取件码唯一：堵住并发上传时「两单同码」——那会让 /my-orders 查到别人的订单。
        # 历史库可能已有重复码，建索引失败只告警，不阻塞启动。
        try:
            cursor.execute(
                'CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_pickup_code ON orders(pickup_code)')
        except sqlite3.IntegrityError:
            logger.warning('pickup_code 存在重复数据，唯一索引未建立，请手动排查重复取件码')
        conn.commit()
    finally:
        conn.close()


ensure_database_directory()
init_database()  # 模块加载时就建好表，gunicorn/waitress 这类部署方式同样生效


# ---------- 辅助函数 ----------

def allowed_file(filename):
    """扩展名白名单校验，避免上传可执行文件。"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# 文件名里可能混进控制字符（浏览器能提交含 \n、\x00 的名字），落库和做下载名之前先清一遍
_CONTROL_CHARS = {c: None for c in range(0x20)}
_CONTROL_CHARS[0x7f] = None


def clean_filename(name):
    """去掉控制字符并限长。纵深防御，不是主防线。"""
    return name.translate(_CONTROL_CHARS).strip()[:200] or 'unnamed'


def generate_pickup_code(conn, length=4):
    """生成不重复的数字取件码。"""
    for _ in range(50):
        code = ''.join(secrets.choice('0123456789') for _ in range(length))
        if conn.execute('SELECT 1 FROM orders WHERE pickup_code = ?', (code,)).fetchone() is None:
            return code
    # 数字码极端冲突时退化为短码，保证下单不被阻塞
    return uuid.uuid4().hex[:6].upper()


def positive_int(value, default, maximum=None):
    """把查询参数解析成正整数，非法或超范围时回退。"""
    try:
        result = int(value)
    except (TypeError, ValueError):
        return default
    if result < 1:
        return default
    if maximum is not None:
        result = min(result, maximum)
    return result


# ---------- 计价 ----------

def unit_price_cents(color, duplex):
    """取单价（分/面）。参数非法时回退到黑白单面。"""
    return PRICE_TABLE.get((color, duplex), PRICE_TABLE[('black', 'single')])


def calc_amount_cents(page_count, color, duplex, copies):
    """算应付金额（分）。页数未知时返回 None（前端显示「金额待定」）。"""
    if page_count is None:
        return None
    return max(page_count * copies * unit_price_cents(color, duplex), MIN_CHARGE_CENTS)


def sheet_count(page_count, duplex, copies):
    """实际用纸张数，给店主装纸用。双面奇数页时最后一张只印一面。"""
    if page_count is None:
        return None
    return ((page_count + 1) // 2 if duplex == 'double' else page_count) * copies


def format_cents(cents):
    """分 -> 「12.34」字符串。前端不做金额算术，格式化统一收在这里。"""
    return None if cents is None else f'{cents / 100:.2f}'


def order_public_fields(row):
    """给订单行补上派生字段（不落库），各接口统一用它组装返回值。"""
    data = dict(row)
    data['copies'] = data.get('copies') or 1
    data['sheet_count'] = sheet_count(data.get('page_count'), data.get('duplex'), data['copies'])
    data['amount_text'] = format_cents(data.get('amount_cents'))
    return data


def require_admin(view):
    """配置了 ADMIN_TOKEN 时校验请求头里的 X-Admin-Token。"""
    @wraps(view)
    def wrapper(*args, **kwargs):
        if ADMIN_TOKEN:
            token = request.headers.get('X-Admin-Token') or request.args.get('token', '')
            # compare_digest 不接受非 ASCII 的 str（直接抛 TypeError -> 500），
            # 所以两边都编码成 bytes 再比，仍然是恒定时间比较。
            if not secrets.compare_digest(token.encode('utf-8'), ADMIN_TOKEN.encode('utf-8')):
                return jsonify({'code': 401, 'msg': '口令错误或未登录'}), 401
        return view(*args, **kwargs)
    return wrapper


# ---------- /my-orders 防枚举限流 ----------
# 4 位取件码只有 1 万种组合，枚举一遍就能拿到别人的订单文件名。
# 这里用「失败计数滑动窗口」：只有查不到才计数，查到就清零。
# waitress 是多线程，dict 操作不原子，锁必须加。
_my_orders_fails = {}                      # ip -> deque[失败时间戳]
_my_orders_lock = threading.Lock()


def my_orders_throttled(ip):
    """该 IP 是否已触发限流。（只读判断，不改状态）"""
    now = time.time()
    with _my_orders_lock:
        fails = _my_orders_fails.get(ip)
        if not fails:
            return False
        while fails and now - fails[0] > MY_ORDERS_WINDOW_SECONDS:
            fails.popleft()
        if not fails:
            _my_orders_fails.pop(ip, None)  # 顺手清掉空 deque，不用定时任务
            return False
        return len(fails) >= MY_ORDERS_MAX_FAILS


def my_orders_record(ip, found):
    """记一次查询结果。

    「查到就清零」保证的是一个偶尔输错码的正常学生永远攒不到阈值。
    但要清楚：IP 一旦被限流，my_orders() 会在查库之前直接返回 429，
    连正确的取件码也查不了。这是有意为之——若改成「先查库、限流时只把
    『没找到』换成 429」，攻击者仍可全速枚举（只是错误响应换了文案），
    限流就等于零保护。代价是宿舍楼共用 NAT 出口时，一个人的攻击会让
    同 IP 的其他人在窗口内也查不了单。

    更在意可用性的话，把 PICKUP_CODE_LENGTH 调到 6（空间扩大 100 倍），
    此时限流可以放宽甚至关掉。
    """
    with _my_orders_lock:
        if found:
            _my_orders_fails.pop(ip, None)
            return
        fails = _my_orders_fails.setdefault(ip, deque())
        fails.append(time.time())

# ---------- 接口 ----------

# 接口1：测试服务器是否活着（对应Java的/hello）
@app.route('/hello')
def hello():
    return '打印服务已启动！'

@app.route('/upload', methods=['POST'])
def upload_file():
    # 1. 接收文件和参数（缺参数返回 400 而不是 500）
    file = request.files.get('file')
    if file is None or not file.filename:
        return jsonify({'code': 1, 'msg': '请选择要上传的文件'}), 400

    color = request.form.get('color', 'black')
    duplex = request.form.get('duplex', 'single')
    color = color if color in ('black', 'color') else 'black'
    duplex = duplex if duplex in ('single', 'double') else 'single'
    # 复用 positive_int：999 会被夹到 MAX_COPIES，abc / -3 回退为 1
    copies = positive_int(request.form.get('copies'), 1, maximum=MAX_COPIES)

    # 2. 文件名安全处理 + 扩展名白名单校验
    original_name = clean_filename(os.path.basename(file.filename))
    if not allowed_file(original_name):
        return jsonify({
            'code': 1,
            'msg': '不支持的文件类型，仅允许：' + '、'.join(sorted(ALLOWED_EXTENSIONS))
        }), 400

    # 3. 先落盘，再写库；任一步失败都保证不留下孤儿文件
    ext = original_name.rsplit('.', 1)[1].lower()
    new_filename = f"{uuid.uuid4().hex}.{ext}"
    save_path = os.path.join(UPLOAD_FOLDER, new_filename)

    conn = None
    try:
        file.save(save_path)
        # 数页数放在落盘之后（传路径而不是内存流，避免大文件二次进内存）。
        # count_pages 内部吞掉所有异常，最差返回 None，不会让下单失败。
        page_count = count_pages(save_path, ext)
        amount_cents = calc_amount_cents(page_count, color, duplex, copies)

        conn = get_db()
        # 取件码靠唯一索引兜底：并发下撞码会抛 IntegrityError，重试一次换新码。
        # 没有这一步的话，两单同码会让 /my-orders 查到别人的订单。
        cursor = None
        for attempt in range(2):
            pickup_code = generate_pickup_code(conn, PICKUP_CODE_LENGTH)
            try:
                cursor = conn.execute('''
                    INSERT INTO orders (filename, file_path, color_type, duplex, status,
                                        pickup_code, page_count, copies, amount_cents, paid)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
                ''', (original_name, save_path, color, duplex, ST_PENDING,
                      pickup_code, page_count, copies, amount_cents))
                conn.commit()
                break
            except sqlite3.IntegrityError:
                conn.rollback()
                if attempt == 1:
                    raise
        order_id = cursor.lastrowid
    except Exception:
        if conn is not None:
            conn.rollback()
        if os.path.exists(save_path):  # 写库失败 -> 删掉已保存的文件
            try:
                os.remove(save_path)
            except OSError:
                logger.warning('清理孤儿文件失败: %s', save_path)
        logger.exception('上传订单失败: %s', original_name)
        return jsonify({'code': 1, 'msg': '上传失败，请稍后重试'}), 500
    finally:
        if conn is not None:
            conn.close()

    if page_count is None:
        # 页数算不出来的情况有两种：doc/docx（本轮不支持转换）、或是 PDF 解析失败。
        # 措辞要对两者都成立。
        msg = '上传成功！页数无法自动统计，需店主确认后计价，到店请核对'
    else:
        msg = f'上传成功！{page_count} 页 × {copies} 份，应付 ¥{format_cents(amount_cents)}'

    logger.info('新订单 #%s「%s」取件码=%s 页数=%s 份数=%s 金额=%s分',
                order_id, original_name, pickup_code, page_count, copies, amount_cents)
    # 只返回订单号与取件码，不暴露服务器绝对路径
    return jsonify({
        'code': 0,
        'msg': msg,
        'order_id': order_id,
        'pickup_code': pickup_code,
        'page_count': page_count,
        'page_count_known': page_count is not None,
        'copies': copies,
        'sheet_count': sheet_count(page_count, duplex, copies),
        'amount_cents': amount_cents,
        'amount_text': format_cents(amount_cents),
        'unit_price_cents': unit_price_cents(color, duplex),
        'color_type': color,
        'duplex': duplex,
    })

# 接口3：获取订单列表（需管理口令；支持分页与状态筛选）
@app.route('/orders')
@require_admin
def get_orders():
    page = positive_int(request.args.get('page'), 1)
    size = positive_int(request.args.get('size'), 20, maximum=100)
    status = (request.args.get('status') or '').strip()

    where, params = '', []
    if status in ORDER_STATUSES:
        where = 'WHERE status = ?'
        params.append(status)

    conn = get_db()
    try:
        total = conn.execute(f'SELECT COUNT(*) AS c FROM orders {where}', params).fetchone()['c']
        rows = conn.execute(f'''
            SELECT id, filename, color_type, duplex, status, pickup_code,
                   page_count, copies, amount_cents, paid,
                   -- 队列位次用相关子查询，而不是 ROW_NUMBER() OVER：
                   -- 它是全表 FIFO 位次，按状态筛选时不能重新从 1 编号。
                   CASE WHEN status IN ('待打印', '打印中')
                        THEN (SELECT COUNT(*) FROM orders q
                               WHERE q.status IN ('待打印', '打印中') AND q.id <= orders.id)
                   END AS queue_no,
                   datetime(create_time, 'localtime') AS create_time,
                   datetime(update_time, 'localtime') AS update_time
            FROM orders {where}
            ORDER BY id DESC
            LIMIT ? OFFSET ?
        ''', (*params, size, (page - 1) * size)).fetchall()
    finally:
        conn.close()

    # 不再返回服务器绝对路径，避免信息泄露
    return jsonify({
        'code': 0,
        'total': total,
        'page': page,
        'size': size,
        'orders': [order_public_fields(row) for row in rows]
    })


# 更改订单状态（需管理口令；支持四种状态互转，误点可撤回）
@app.route('/order/<int:order_id>/status', methods=['PUT'])
@require_admin
def update_order_status(order_id):
    data = request.get_json(silent=True) or {}
    new_status = (data.get('status') or request.form.get('status') or '').strip()
    if new_status not in ORDER_STATUSES:
        return jsonify({
            'code': 400,
            'msg': '状态不合法，可选：' + '、'.join(ORDER_STATUSES)
        }), 400

    conn = get_db()
    try:
        cursor = conn.execute('''
            UPDATE orders
            SET status = ?, update_time = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (new_status, order_id))
        if cursor.rowcount == 0:
            return jsonify({'code': 404, 'msg': '没找到这个订单'}), 404
        conn.commit()
    finally:
        conn.close()

    logger.info('订单 #%s 状态改为「%s」', order_id, new_status)
    return jsonify({'code': 0, 'msg': f'订单 {order_id} 已更新为「{new_status}」'})


# 标记收款（需管理口令）。刻意不塞进 update_order_status：
# 那个接口用 ORDER_STATUSES 白名单校验，塞进去会污染状态机语义。
@app.route('/order/<int:order_id>/paid', methods=['PUT'])
@require_admin
def update_order_paid(order_id):
    data = request.get_json(silent=True) or {}
    raw = data.get('paid', request.form.get('paid'))
    if isinstance(raw, str):
        paid = raw.strip().lower() in ('1', 'true', 'yes', 'on')
    else:
        paid = bool(raw)

    conn = get_db()
    try:
        cursor = conn.execute(
            'UPDATE orders SET paid = ?, update_time = CURRENT_TIMESTAMP WHERE id = ?',
            (1 if paid else 0, order_id))
        if cursor.rowcount == 0:
            return jsonify({'code': 404, 'msg': '没找到这个订单'}), 404
        conn.commit()
    finally:
        conn.close()

    logger.info('订单 #%s 收款标记改为 %s', order_id, '已收' if paid else '未收')
    return jsonify({
        'code': 0,
        'paid': paid,
        'msg': f'订单 {order_id} 已标记为「{"已收款" if paid else "未收款"}」',
    })


PREVIEWABLE_EXTS = {'pdf', 'jpg', 'jpeg', 'png'}
MIMETYPE_BY_EXT = {
    'pdf': 'application/pdf',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}


# 取文件（需管理口令）。店主靠它预览/下载——这是把 uuid 文件名翻译回人话的关键。
@app.route('/order/<int:order_id>/file')
@require_admin
def get_order_file(order_id):
    conn = get_db()
    try:
        row = conn.execute(
            'SELECT filename, file_path FROM orders WHERE id = ?', (order_id,)
        ).fetchone()
    finally:
        conn.close()

    if row is None:
        return jsonify({'code': 404, 'msg': '没找到这个订单'}), 404

    # 路径安全：路由参数是 <int:order_id>，客户端根本传不进路径字符串，
    # 目录穿越在结构上就不可能。这里只取 basename 再与配置目录拼接——
    # 即使 file_path 被写脏成 C:/Windows/win.ini，也只会取到「win.ini」。
    stored_name = os.path.basename(row['file_path'])
    target = os.path.join(UPLOAD_FOLDER, stored_name)

    # 纵深防御：断言拼接结果确实落在上传目录内（是断言，不是主防线）
    try:
        inside = Path(target).resolve().is_relative_to(Path(UPLOAD_FOLDER).resolve())
    except OSError:
        inside = False
    if not inside:
        logger.warning('订单 #%s 的文件路径越界，已拒绝: %s', order_id, target)
        return jsonify({'code': 404, 'msg': '文件不存在'}), 404

    # send_file 遇到不存在的文件会抛 FileNotFoundError -> 500，必须先判存在。
    # 文件清理机制迟早会删掉文件，这条路径是常规情况而非异常。
    if not os.path.isfile(target):
        return jsonify({'code': 404, 'msg': '文件不存在或已被清理'}), 404

    ext = stored_name.rsplit('.', 1)[-1].lower()
    want_download = (request.args.get('download') or '').lower() not in ('', '0', 'false')
    # doc/docx 浏览器无法内联渲染，inline 只会开个空白标签页，强制走下载
    as_attachment = want_download or ext not in PREVIEWABLE_EXTS

    resp = send_file(
        target,
        mimetype=MIMETYPE_BY_EXT.get(ext),
        as_attachment=as_attachment,
        # 本轮性价比最高的一行：werkzeug 会做 RFC 5987 编码，店主存盘拿到的是
        # 「张三-实验报告.pdf」而不是 a3f9c2....pdf，这才是「文件整理很乱」的正解。
        download_name=row['filename'],
        conditional=True,  # 启用 Range，浏览器内置 PDF 阅读器可流式加载
    )
    resp.headers['X-Content-Type-Options'] = 'nosniff'
    return resp


# 公开价目表，供前端渲染「黑白单面 0.10 元/页」这类提示。
# 目的只有一个：别在 HTML 里硬编码价格，否则店主改完 .env 页面就开始撒谎。
@app.route('/price-table')
def price_table():
    return jsonify({
        'code': 0,
        'unit': 'cents_per_side',
        'max_copies': MAX_COPIES,
        'min_charge_cents': MIN_CHARGE_CENTS,
        'prices': {
            'black_single': PRICE_TABLE[('black', 'single')],
            'black_double': PRICE_TABLE[('black', 'double')],
            'color_single': PRICE_TABLE[('color', 'single')],
            'color_double': PRICE_TABLE[('color', 'double')],
        },
    })


# 学生查单：凭取件码查询自己的订单（公开接口，无需管理口令）
@app.route('/my-orders')
def my_orders():
    # upper() 兼容 generate_pickup_code 在极端冲突下退化的 hex 短码——
    # 那是大小写敏感的，学生输小写原本会查不到。
    code = (request.args.get('code') or '').strip().upper()
    if not code:
        return jsonify({'code': 1, 'msg': '请输入取件码'}), 400

    # 4 位取件码只有 1 万种组合，不限流就能枚举出别人的订单文件名。
    # 阈值放宽到 20 次/5 分钟：宿舍楼整栋可能共用同一个 NAT 出口 IP，
    # 卡太严会误伤真实学生；而「查到就清零」让正常用户几乎不可能攒到阈值。
    # 注意这里是查库「之前」拦截——被限流后连正确取件码也查不了，这是刻意的，
    # 详见 my_orders_record() 的说明。
    ip = request.remote_addr or 'unknown'
    if my_orders_throttled(ip):
        return jsonify({'code': 429, 'msg': '查询过于频繁，请稍后再试'}), 429

    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT id, filename, color_type, duplex, status,
                   page_count, copies, amount_cents, paid,
                   datetime(create_time, 'localtime') AS create_time
            FROM orders
            WHERE pickup_code = ?
            ORDER BY id DESC
        ''', (code,)).fetchall()
    finally:
        conn.close()

    my_orders_record(ip, found=bool(rows))
    return jsonify({'code': 0, 'orders': [order_public_fields(row) for row in rows]})


@app.route('/')
def index():
    return render_template('index.html')


# ---------- 错误处理 ----------
# Flask 默认给 413/500 返回 HTML，前端 response.json() 会抛错，
# 学生看到的是「网络错误，请确认后端正在运行！」这条完全误导的文案。
@app.errorhandler(413)
def handle_413(_err):
    return jsonify({
        'code': 1,
        'msg': f'文件超过 {env_int("MAX_UPLOAD_MB", 50)}MB 限制，请压缩后再传',
    }), 413


@app.errorhandler(500)
def handle_500(_err):
    return jsonify({'code': 1, 'msg': '服务器内部错误，请稍后重试'}), 500


# ---------- 启动服务 ----------
if __name__ == '__main__':
    host = os.getenv('HOST', '0.0.0.0')
    port = env_int('PORT', 8080)
    if env_bool('DEBUG', False):
        # 仅限本地调试。注意：debug=True + 局域网可达 = Werkzeug 调试器任意代码执行，
        # 生产环境绝对不能开。
        app.run(host=host, port=port, debug=True)
    else:
        # 用 waitress，而不是 Flask 自带的开发服务器（后者不适合长期跑）
        from waitress import serve

        logger.info('打印服务启动于 http://%s:%s', host, port)
        serve(app, host=host, port=port, threads=env_int('THREADS', 4))
