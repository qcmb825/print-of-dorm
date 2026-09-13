"""db.py —— SQLite 连接、建表与迁移、内置超管创建。"""

import os
import sqlite3
import secrets
from pathlib import Path

from config import DATABASE_PATH, ROLE_SUPER, logger
from security import audit_action, make_password_records


def ensure_database_directory():
    """确保 SQLite 数据库所在目录存在，免得目录缺失导致建库失败。"""
    db_dir = Path(DATABASE_PATH).resolve().parent
    db_dir.mkdir(parents=True, exist_ok=True)



def get_db():
    """开一个支持按行名访问的 SQLite 连接，调用方记得 close()。"""
    ensure_database_directory()
    conn = sqlite3.connect(DATABASE_PATH, timeout=10)
    conn.row_factory = sqlite3.Row
    return conn



# 数据库结构版本，用来判断是否要做一次性迁移
# 从 v2 升到 v3：新增了联系方式列、工单表和公告表，全是加东西，老数据一概保留
SCHEMA_VERSION = '3'



def init_database():
    """建立 / 升级数据表。

    这次账号体系改造按用户要求：旧订单不迁移。
    判断看 schema_meta 里的 schema_version：
      没有版本标记（全新库或旧库）就先 DROP 掉旧 orders 表，再按新结构重建；
      已有标记就只做 CREATE IF NOT EXISTS，不再清空数据。
    """
    conn = get_db()
    try:
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS schema_meta (key TEXT PRIMARY KEY, value TEXT)')
        row = cursor.execute("SELECT value FROM schema_meta WHERE key = 'schema_version'").fetchone()
        if row is None:
            cursor.execute('DROP TABLE IF EXISTS orders')  # 一次性清掉旧结构

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nickname TEXT NOT NULL UNIQUE COLLATE NOCASE,
                real_name TEXT NOT NULL UNIQUE,
                student_id TEXT NOT NULL UNIQUE,
                dorm TEXT NOT NULL,
                password_hash TEXT NOT NULL,
                password_enc TEXT,
                role TEXT NOT NULL DEFAULT 'user',
                status TEXT NOT NULL DEFAULT 'active',
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_login TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                filename TEXT NOT NULL,
                file_path TEXT NOT NULL,
                color_type TEXT,
                duplex TEXT,
                remark TEXT,
                status TEXT DEFAULT '待打印',
                pickup_code TEXT,
                claimed_by INTEGER,
                claim_time TIMESTAMP,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP
            )
        ''')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_claimed ON orders(claimed_by)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)')

        # 这轮新增联系方式，给已有的 users 表补两列。
        # CREATE TABLE IF NOT EXISTS 对已存在的表没有任何改动，老库只能靠 ALTER TABLE；
        # 先用 PRAGMA 查一下现有的列，保证重复执行也安全（幂等）。
        user_columns = {row[1] for row in cursor.execute('PRAGMA table_info(users)').fetchall()}
        if 'contact_type' not in user_columns:
            cursor.execute('ALTER TABLE users ADD COLUMN contact_type TEXT')
        if 'contact' not in user_columns:
            cursor.execute('ALTER TABLE users ADD COLUMN contact TEXT')

        # 工单（站内信）：tickets 是会话，ticket_messages 是会话里的消息。
        # user_read_time / admin_read_time 分别记录双方最后一次已读的时刻，
        # 未读数就是对方发的、且比我上次已读更晚的消息条数，天然支持多个管理员一起处理。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tickets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                subject TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'open',
                last_reply_by INTEGER,
                user_read_time TIMESTAMP,
                admin_read_time TIMESTAMP,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS ticket_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ticket_id INTEGER NOT NULL,
                sender_id INTEGER NOT NULL,
                sender_role TEXT NOT NULL,
                body TEXT NOT NULL,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_tickets_user ON tickets(user_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_ticket_msgs ON ticket_messages(ticket_id)')

        # 公告：同一时间只有一条 is_active=1，历史公告留着方便编辑或回滚。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS announcements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                font_family TEXT NOT NULL DEFAULT 'system',
                font_size INTEGER NOT NULL DEFAULT 15,
                font_color TEXT NOT NULL DEFAULT '#1f2328',
                is_active INTEGER NOT NULL DEFAULT 1,
                created_by INTEGER,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')

        cursor.execute(
            "INSERT OR REPLACE INTO schema_meta (key, value) VALUES ('schema_version', ?)",
            (SCHEMA_VERSION,),
        )
        conn.commit()
    finally:
        conn.close()



def seed_super_admin():
    """按配置创建内置超级管理员账号，同昵称已存在就跳过，可以放心重复执行。

    判断的是昵称有没有被占用，不是系统里有没有超管。
    这个区别很关键：后者会让新加的内置超管被已有的超管挡住，
    永远建不出来，想换内置超管只能手工改数据库。
    改成按昵称判断之后：新增配置就自动补建，重复启动也不会重复创建（幂等）。
    """
    # 昵称是登录名，必须非空；姓名/学号/宿舍可以留空（数据库里存空字符串）。
    # real_name 和 student_id 都是 UNIQUE 字段，空字符串也算一个值，
    # 所以多个内置超管不能同时留空，第二个会撞唯一约束，日志里会提示。
    nickname = os.getenv('SUPER_ADMIN_NICKNAME', 'superadmin').strip() or 'superadmin'
    real_name = os.getenv('SUPER_ADMIN_REALNAME', '').strip()
    student_id = os.getenv('SUPER_ADMIN_STUDENT_ID', '').strip()
    dorm = os.getenv('SUPER_ADMIN_DORM', '').strip()
    password = os.getenv('SUPER_ADMIN_PASSWORD', '').strip()

    conn = get_db()
    try:
        if conn.execute('SELECT 1 FROM users WHERE nickname = ? COLLATE NOCASE',
                        (nickname,)).fetchone():
            return
        if len(password) < 8:
            password = secrets.token_urlsafe(12)
            logger.warning('未配置 SUPER_ADMIN_PASSWORD（或长度不足 8），已随机生成超管「%s」的初始密码：%s',
                           nickname, password)
        password_hash, password_enc = make_password_records(password)
        try:
            cursor = conn.execute('''
                INSERT INTO users (nickname, real_name, student_id, dorm, password_hash, password_enc, role)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (nickname, real_name, student_id, dorm, password_hash, password_enc, ROLE_SUPER))
            conn.commit()
            # 超管账号的创建必须留痕，这是系统里权限最高的那把钥匙
            logger.info('已创建超级管理员账号 #%s：昵称=%s 姓名=%s 学号=%s',
                        cursor.lastrowid, nickname, real_name or '(空)', student_id or '(空)')
            audit_action('create_super_admin', '系统初始化时创建超管 #%s/%s' % (cursor.lastrowid, nickname))
        except sqlite3.IntegrityError:
            logger.error('超级管理员账号创建失败：昵称「%s」/ 姓名「%s」/ 学号「%s」已被占用，'
                         '请修改 .env 中的 SUPER_ADMIN_* 配置（姓名和学号都是唯一字段，'
                         '多个超管不能同时留空）', nickname, real_name, student_id)
    finally:
        conn.close()
