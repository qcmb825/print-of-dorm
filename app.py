import os
import uuid  # 用来生成唯一文件名
import sqlite3
import logging
import secrets
from functools import wraps
from pathlib import Path

from flask import Flask, request, jsonify, render_template
from flask_cors import CORS


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
os.makedirs(UPLOAD_FOLDER, exist_ok=True)


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
                update_time TIMESTAMP
            )
        ''')
        # 老库补齐后加的列（列已存在时跳过）
        existing = {row['name'] for row in cursor.execute('PRAGMA table_info(orders)')}
        for column, ddl in (
            ('pickup_code', 'ALTER TABLE orders ADD COLUMN pickup_code TEXT'),
            ('update_time', 'ALTER TABLE orders ADD COLUMN update_time TIMESTAMP'),
        ):
            if column not in existing:
                cursor.execute(ddl)
        conn.commit()
    finally:
        conn.close()


ensure_database_directory()
init_database()  # 模块加载时就建好表，gunicorn/waitress 这类部署方式同样生效


# ---------- 辅助函数 ----------

def allowed_file(filename):
    """扩展名白名单校验，避免上传可执行文件。"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


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


def require_admin(view):
    """配置了 ADMIN_TOKEN 时校验请求头里的 X-Admin-Token。"""
    @wraps(view)
    def wrapper(*args, **kwargs):
        if ADMIN_TOKEN:
            token = request.headers.get('X-Admin-Token') or request.args.get('token', '')
            if not secrets.compare_digest(token, ADMIN_TOKEN):
                return jsonify({'code': 401, 'msg': '口令错误或未登录'}), 401
        return view(*args, **kwargs)
    return wrapper

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

    # 2. 文件名安全处理 + 扩展名白名单校验
    original_name = os.path.basename(file.filename)
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
        conn = get_db()
        pickup_code = generate_pickup_code(conn)  # 生成不重复的 4 位取件码
        cursor = conn.execute('''
            INSERT INTO orders (filename, file_path, color_type, duplex, status, pickup_code)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (original_name, save_path, color, duplex, ST_PENDING, pickup_code))
        conn.commit()
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

    logger.info('新订单 #%s「%s」取件码=%s', order_id, original_name, pickup_code)
    # 只返回订单号与取件码，不暴露服务器绝对路径
    return jsonify({
        'code': 0,
        'msg': '上传成功！订单已记录',
        'order_id': order_id,
        'pickup_code': pickup_code
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
        'orders': [dict(row) for row in rows]
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


# 学生查单：凭取件码查询自己的订单（公开接口，无需管理口令）
@app.route('/my-orders')
def my_orders():
    code = (request.args.get('code') or '').strip()
    if not code:
        return jsonify({'code': 1, 'msg': '请输入取件码'}), 400

    conn = get_db()
    try:
        rows = conn.execute('''
            SELECT id, filename, color_type, duplex, status,
                   datetime(create_time, 'localtime') AS create_time
            FROM orders
            WHERE pickup_code = ?
            ORDER BY id DESC
        ''', (code,)).fetchall()
    finally:
        conn.close()

    return jsonify({'code': 0, 'orders': [dict(row) for row in rows]})


@app.route('/')
def index():
    return render_template('index.html')

# ---------- 启动服务 ----------
if __name__ == '__main__':
    app.run(
        host=os.getenv('HOST', '0.0.0.0'),
        port=env_int('PORT', 8080),
        debug=env_bool('DEBUG', False)  # 生产环境保持 False
    )
