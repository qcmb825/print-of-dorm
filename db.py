"""db.py —— SQLite 连接、建表与迁移、内置管理账号初始化。"""

import os
import shutil
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

from config import DATABASE_PATH, ROLE_SUPER, ST_DONE, STATUS_CLOSED, logger
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
# v2 -> v3：新增了联系方式列、工单表和公告表，全是加东西，老数据一概保留
# v3 -> v4：users 表那三个列级 UNIQUE 换成「部分唯一索引」，
#          注销的账号不再占用昵称 / 姓名 / 学号（见 _migrate_release_unique_names）
SCHEMA_VERSION = '4'



def backup_database_file():
    """改表结构之前，先把整库文件原样复制一份。

    重建表和「加一列」不是一回事：加列随时能撤，重建表里的 DROP TABLE 一执行，
    老表就没了。SQLite 也没有能让我们事后手动回滚的归档日志，
    所以老老实实复制一份文件 —— 真出事就把 .bak 换回去，等于什么都没发生。
    返回备份文件路径，没有可备份的文件（全新库）时返回 None。
    """
    src = Path(DATABASE_PATH)
    if not src.exists():
        return None
    stamp = datetime.now().strftime('%Y%m%d-%H%M%S')
    dst = src.with_name(src.name + '.bak-' + stamp)
    shutil.copy2(src, dst)
    return str(dst)



def _migration_version(text):
    """把 schema_meta 里存的版本号读成整数，读不出来就当 0（等同于很老的库）。"""
    try:
        return int(str(text).strip())
    except (TypeError, ValueError):
        return 0



def _migrate_release_unique_names(cursor, current_version):
    """v3 -> v4：注销的账号要把昵称 / 姓名 / 学号还回去。

    为什么必须动表结构 ——
    这三个字段原来是列级 UNIQUE，它对表里所有行无条件生效。注销只是把 status
    改掉、行还留在表里，那它的昵称就永远占着位置，别人想用同一个昵称注册，
    数据库会直接拒掉。而 SQLite 不支持 ALTER TABLE ... DROP CONSTRAINT，
    唯一约束只能靠重建表拿掉。

    换成什么 ——
    部分唯一索引：CREATE UNIQUE INDEX ... WHERE status <> 'closed'。
    约束只对「还在用的账号」生效，注销的行不参与判重，名字就释放出来了。
    顺带比原来更结实一点：判重范围写死在索引定义里，不靠应用层每次都记得加条件，
    应用层哪次漏了 check，数据库这一层还兜着。

    重建表是 SQLite 里的标准三步：建新表 -> 拷数据 -> 删旧表 -> 改名。
    拷数据用的是显式列名而不是 SELECT *，这样两张表的列顺序不用迁就彼此。
    表名带 _new 后缀而不是「先删再建」，是为了让整个迁移只在最后一步失败时
    才会丢东西，其余任何一步炸了，老表都还原封不动躺在那儿。
    """
    row = cursor.execute(
        "SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'users'"
    ).fetchone()
    # 版本号是主判据：已经是 v4 及以上的库，结构上早就换成部分唯一索引了，直接跳过。
    # 下面那句 DDL 检查是兜底 —— 很老的库可能压根没有版本记录，那时只能看表结构本
    # 身判断有没有迁过，顺带让这个函数重复执行也安全。
    if _migration_version(current_version) >= 4:
        return None
    if row is None or 'UNIQUE' not in (row[0] or '').upper():
        return None

    # 复制文件前先把当前事务落盘。SQLite 的改动是先写日志再回放主文件的，
    # 事务还没提交时直接复制主文件，可能拷到一个「少了刚那几步 ALTER」的中间态。
    # 备份的意义就是拿它换回来，那就得保证它本身是一个完整的状态。
    cursor.connection.commit()

    backup = backup_database_file()
    logger.info('开始迁移 users 表（释放注销账号占用的昵称等），迁移前备份：%s', backup)

    cursor.execute('''
        CREATE TABLE users_new (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nickname TEXT NOT NULL COLLATE NOCASE,
            real_name TEXT NOT NULL,
            student_id TEXT NOT NULL,
            dorm TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            password_enc TEXT,
            role TEXT NOT NULL DEFAULT 'user',
            status TEXT NOT NULL DEFAULT 'active',
            create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMP,
            contact_type TEXT,
            contact TEXT
        )
    ''')
    # id 也一起拷过去：orders.user_id / claimed_by、tickets.user_id 都是按 id 关联的，
    # 换了 id 就等于把历史订单和工单的归属全打乱。
    cursor.execute('''
        INSERT INTO users_new
            (id, nickname, real_name, student_id, dorm, password_hash, password_enc,
             role, status, create_time, last_login, contact_type, contact)
        SELECT id, nickname, real_name, student_id, dorm, password_hash, password_enc,
               role, status, create_time, last_login, contact_type, contact
        FROM users
    ''')
    cursor.execute('DROP TABLE users')
    cursor.execute('ALTER TABLE users_new RENAME TO users')
    logger.info('users 表迁移完成')
    return backup



def init_database():
    """建立 / 升级数据表。

    这次账号体系改造按用户要求：旧订单不迁移。
    判断看 schema_meta 里的 schema_version：
      全新库（schema_meta 刚建出来，orders 表还不存在）才执行那句 DROP，实际是空动作；
      已有标记就只做 CREATE IF NOT EXISTS，不再清空数据。
    """
    conn = get_db()
    try:
        cursor = conn.cursor()
        cursor.execute('CREATE TABLE IF NOT EXISTS schema_meta (key TEXT PRIMARY KEY, value TEXT)')
        row = cursor.execute("SELECT value FROM schema_meta WHERE key = 'schema_version'").fetchone()
        current_version = row['value'] if row is not None else None
        if row is None:
            # 真正要防的是这一种：表里躺着订单，版本记录却没了（schema_meta 被误删、
            # 库文件被换过、DATABASE_PATH 指到了别的库）。这种时候再无条件 DROP，
            # 就是一声不吭地把所有订单清空。宁可服务起不来，把决定权交回人手。
            exists = cursor.execute(
                "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'orders'"
            ).fetchone()
            if exists is not None and cursor.execute('SELECT COUNT(*) FROM orders').fetchone()[0]:
                logger.error('数据库里已有订单，却没有版本记录（schema_meta 里没有 schema_version）。')
                logger.error('  为避免误删数据，服务已停止启动。数据库文件：%s', DATABASE_PATH)
                logger.error('  这个库还要用，就自己确认一下它的结构并补上版本记录；')
                logger.error('  确实要丢弃里面的旧数据，把文件备份后删掉再启动即可。')
                sys.exit(1)
            cursor.execute('DROP TABLE IF EXISTS orders')  # 老库没有版本记录，一次性清掉旧结构

        # users 表的 DDL 里刻意不写 UNIQUE：唯一性靠下面那三个部分唯一索引来保证，
        # 只有「还没注销」的账号参与判重。别处看到这张表没约束，不是漏写了。
        # nickname 保留 COLLATE NOCASE，让「Tom」和「tom」在判重和登录查询里算同一个名字。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nickname TEXT NOT NULL COLLATE NOCASE,
                real_name TEXT NOT NULL,
                student_id TEXT NOT NULL,
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
        # 取件码得唯一：两个人拿到同一个码，打印员就会把件取错。
        # 只对「还没取件」的单子判重，历史单子不参与 —— 老数据里万一已经存在重复值，
        # 也不该因为建不上索引就让整个服务起不来，所以这里建失败只记一条 error。
        #
        # 「已取件」在这里只能拼成字面量，不能用 ? 占位：
        # 部分索引的 WHERE 里不允许带参数，写 ? 会直接抛
        # parameters prohibited in partial index WHERE clauses，启动就挂。
        # 值还是取自 ST_DONE，不是手打的字符串，改常量时这里跟着一起变。
        live_index_sql = (
            'CREATE UNIQUE INDEX IF NOT EXISTS idx_orders_pickup_live '
            "ON orders(pickup_code) WHERE status <> '%s' AND pickup_code IS NOT NULL" % ST_DONE
        )
        try:
            cursor.execute(live_index_sql)
        except sqlite3.IntegrityError:
            logger.error('取件码唯一索引没建成：还没取件的订单里存在重复的取件码，'
                         '请先处理这些重复数据；本次仍会继续启动，但取件码暂时不能保证唯一')

        # 这轮新增联系方式，给已有的 users 表补两列。
        # CREATE TABLE IF NOT EXISTS 对已存在的表没有任何改动，老库只能靠 ALTER TABLE；
        # 先用 PRAGMA 查一下现有的列，保证重复执行也安全（幂等）。
        user_columns = {row[1] for row in cursor.execute('PRAGMA table_info(users)').fetchall()}
        if 'contact_type' not in user_columns:
            cursor.execute('ALTER TABLE users ADD COLUMN contact_type TEXT')
        if 'contact' not in user_columns:
            cursor.execute('ALTER TABLE users ADD COLUMN contact TEXT')

        # 补列必须在重建表之前：重建时要连这两列一起拷过去，
        # 老库里要是还没这两列，拷贝那一步会直接报「no such column」。
        _migrate_release_unique_names(cursor, current_version)

        # 判重只对「还没注销」的账号生效，注销的把那三个名字让出来。
        # 条件写成 status <> 'closed' 而不是 status = 'active'：
        # 被临时禁用的账号名字当然也算数（人还在，只是暂时进不来）。
        #
        # 顺带一个值得记下来的副作用：这三个索引把「注销之后不能恢复」这件事
        # 在数据库这一层也守住了。因为名字已经让给别人用了，谁要是绕过接口
        # 直接 UPDATE 把某个注销账号改回 active，就会撞上唯一索引而失败。
        # 代码里的判断是给人看的，索引是给「代码忘了判断」兜底的。
        cursor.execute('''
            CREATE UNIQUE INDEX IF NOT EXISTS idx_users_nickname_live
                ON users(nickname) WHERE status <> 'closed'
        ''')
        cursor.execute('''
            CREATE UNIQUE INDEX IF NOT EXISTS idx_users_real_name_live
                ON users(real_name) WHERE status <> 'closed'
        ''')
        cursor.execute('''
            CREATE UNIQUE INDEX IF NOT EXISTS idx_users_student_id_live
                ON users(student_id) WHERE status <> 'closed'
        ''')

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
    """按配置创建内置管理账号，同昵称已存在就跳过，可以放心重复执行。

    判断的是昵称有没有被占用，不是系统里有没有这个角色的账号。
    这个区别很关键：后者会让新配的昵称被已有账号挡住、永远建不出来，
    想换账号只能手工改数据库。改成按昵称判断之后，新增配置就自动补建，
    重复启动也不会重复创建（幂等）。
    """
    # 昵称是登录名，必须非空；姓名/学号/宿舍可以留空（数据库里存空字符串）。
    # real_name 和 student_id 都是 UNIQUE 字段，空字符串也算一个值，
    # 所以多个内置账号不能同时留空，第二个会撞唯一约束，日志里会提示。
    nickname = os.getenv('SUPER_ADMIN_NICKNAME', 'superadmin').strip() or 'superadmin'
    real_name = os.getenv('SUPER_ADMIN_REALNAME', '').strip()
    student_id = os.getenv('SUPER_ADMIN_STUDENT_ID', '').strip()
    dorm = os.getenv('SUPER_ADMIN_DORM', '').strip()
    password = os.getenv('SUPER_ADMIN_PASSWORD', '').strip()

    conn = get_db()
    try:
        # 账号已经在了就直接返回。这一步必须排在检查密码之前：
        # 密码只在「第一次建这个账号」时用得上，老部署重启时不该因为
        # 后来把 SUPER_ADMIN_PASSWORD 删了、或者改短了而起不来。
        if conn.execute('SELECT 1 FROM users WHERE nickname = ? COLLATE NOCASE',
                        (nickname,)).fetchone():
            return
        if len(password) < 8:
            # 以前这里是配置缺失时随机生成一个，再把明文写进日志。
            # 那等于把一个能用的管理员口令存进了日志文件，而日志恰恰是
            # 最容易被整包拷走、发给别人排错的东西；看日志的人多半不知道
            # 自己手里拿的是一把钥匙，账号就这么失守了。
            #
            # 改成拒绝启动：出问题的是部署这一步，就让它在启动时显形，
            # 而不是把秘密留在没人会去看的地方，然后当作没事发生。
            raise SystemExit(
                '\n[启动中止] 内置管理账号「%s」还不存在，而且没有可用的 SUPER_ADMIN_PASSWORD。\n'
                '  首次启动必须显式设置初始密码（至少 8 位），否则拒绝启动 ——\n'
                '  这是为了避免把管理员密码写进日志文件。\n'
                '  请在 .env 里补上：SUPER_ADMIN_PASSWORD=<你的初始密码>\n' % nickname)
        password_hash, password_enc = make_password_records(password)
        try:
            cursor = conn.execute('''
                INSERT INTO users (nickname, real_name, student_id, dorm, password_hash, password_enc, role)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (nickname, real_name, student_id, dorm, password_hash, password_enc, ROLE_SUPER))
            conn.commit()
            # 账号创建必须留痕：这是系统自己建出来的第一个账号，
            # 谁、什么时候出现的，翻日志就能对上。
            logger.info('已创建内置管理账号 #%s：昵称=%s 姓名=%s 学号=%s',
                        cursor.lastrowid, nickname, real_name or '(空)', student_id or '(空)')
            audit_action('create_builtin_admin', '系统初始化时创建内置管理账号 #%s/%s' % (cursor.lastrowid, nickname))
        except sqlite3.IntegrityError:
            logger.error('内置管理账号创建失败：昵称「%s」/ 姓名「%s」/ 学号「%s」已被占用，'
                         '请修改 .env 中的 SUPER_ADMIN_* 配置（姓名和学号都是唯一字段，'
                         '多个账号不能同时留空）', nickname, real_name, student_id)
    finally:
        conn.close()
