"""db.py —— SQLite 连接、建表与迁移、内置管理账号初始化。"""

import os
import shutil
import sqlite3
import sys
from datetime import datetime
from pathlib import Path

from config import (DATABASE_PATH, ORDER_LOG_DETAIL_MAX, ROLE_SUPER, ST_DONE, ST_UNPRICED,
                    STATUS_CLOSED, logger)
from security import audit_action, make_password_records
from utils import generate_pickup_code


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



def log_order_event(conn, order_id, actor_id, actor_role, action, detail=''):
    """往 order_logs 里写一条订单操作留痕。

    这个函数**不 commit**，也不自己开连接 —— 事务归调用方管。
    原因：留痕必须和它记录的那个动作同生共死。改状态和写留痕分成两个事务的话，
    中间那一下崩溃就会留下「状态变了、但没人知道是谁改的」，
    而订单详情页里的操作记录正是拿来回答这个问题的，缺一条它就不成立了。

    操作人按 id + 当时的角色一起存：角色会变（普通管理员后来升成默认管理员），
    事后拿 users.role 去反推，历史记录就会跟着一起变，
    变成「三月份的记录显示他是默认管理员」这种谁都解释不清的事。
    这里存的是**动作发生当时**的身份。

    detail 只是给人看的一句话，不含密码、明文和服务器绝对路径
    （沿项目惯例：这类内容一律不进日志，也不进留痕）。
    """
    conn.execute('''
        INSERT INTO order_logs (order_id, actor_id, actor_role, action, detail)
        VALUES (?, ?, ?, ?, ?)
    ''', (order_id, actor_id, actor_role, action, (detail or '')[:ORDER_LOG_DETAIL_MAX]))



# 插入订单时用到的列，顺序固定。
# 写成元组是为了让两条下单路径（传文件 / 用预设，后者没有文件）共用同一条 INSERT：
# 各写一条的话，哪天加了新列只更新了其中一条，就会出现「用预设下的单没记份数、
# 传文件下的单记了」这种一半生效的情形 —— 而页面上两单看起来一样。
_ORDER_INSERT_COLUMNS = (
    'user_id', 'filename', 'file_path', 'color_type', 'duplex', 'remark',
    'status', 'preset_id', 'preset_content', 'copies',
    'paper_type_id', 'paper_name', 'paper_remark',
)



def insert_order_row(conn, values):
    """插一行订单，取件码交给这里生成，返回 (order_id, pickup_code)。

    **不 commit** —— 订单和它那条「提交订单」留痕必须落在同一个事务里
    （理由同 log_order_event），事务边界归调用方管。

    values 是「列名 -> 值」的字典，缺的列按 NULL 处理。

    「摇取件码 → 撞了就重摇」这段刻意只写一份：直传下单、分片合并、预设下单
    三条路都走这里。复制成三份的话，哪天改了重试次数或者码长，
    改漏的那条路会变成偶发报错（「取件码连续 5 次都重复」），
    而另外两条一切正常 —— 这种一半好的毛病最难查。
    """
    placeholders = ', '.join(['?'] * (len(_ORDER_INSERT_COLUMNS) + 1))
    sql = 'INSERT INTO orders (%s, pickup_code) VALUES (%s)' % (
        ', '.join(_ORDER_INSERT_COLUMNS), placeholders)
    for attempt in range(5):
        pickup_code = generate_pickup_code(conn)
        try:
            cursor = conn.execute(
                sql, tuple(values.get(column) for column in _ORDER_INSERT_COLUMNS) + (pickup_code,))
            return cursor.lastrowid, pickup_code
        except sqlite3.IntegrityError:
            conn.rollback()
            logger.warning('取件码「%s」已被占用（第 %s 次），重摇一个', pickup_code, attempt + 1)
    # 连摇 5 次都撞上已经不是概率问题了，宁可报错也不能写进一个重码的单
    raise RuntimeError('取件码连续 5 次都与其他订单重复')



def find_preset(conn, preset_id):
    """按 id 取一条预设打印服务，没有就返回 None。

    只负责「有没有这一条」，「能不能用」（is_active）留给调用方判断 ——
    管理端要能停用之后再改回来，那它必须读得到停用记录；
    而学生下单时读到停用的就该被拒。同一个查询、两种结论，
    把结论写进这个函数里就必然有一边是错的。
    """
    return conn.execute('SELECT * FROM print_presets WHERE id = ?', (preset_id,)).fetchone()



def find_paper_type(conn, paper_type_id):
    """按 id 取一种纸张类型，没有就返回 None。is_active 的判定同上，留给调用方。"""
    return conn.execute('SELECT * FROM paper_types WHERE id = ?', (paper_type_id,)).fetchone()



# 数据库结构版本，用来判断是否要做一次性迁移
# v2 -> v3：新增了联系方式列、工单表和公告表，全是加东西，老数据一概保留
# v3 -> v4：users 表那三个列级 UNIQUE 换成「部分唯一索引」，
#          注销的账号不再占用昵称 / 姓名 / 学号（见 _migrate_release_unique_names）
# v4 -> v5：姓名不再要求唯一（接入全校名单后重名是常态），
#          改为普通索引，见 _migrate_relax_real_name_unique
# v5 -> v6：新增身份审核申请表 audit_requests（学号不在名单上时的人工通道）。
#          只加新表、不动老表，所以没有迁移函数 —— CREATE TABLE IF NOT EXISTS 本身幂等。
# v6 -> v7：orders 表新增计费三列（price / priced_by / price_time），
#          同样是纯加列，没有重建表，也就不需要整库备份。
# v7 -> v8：新增订单操作留痕表 order_logs。又是只加新表、不动老表，
#          所以同样没有迁移函数（老库启动时那条 CREATE TABLE IF NOT EXISTS 直接补上）。
#          历史订单在这个新表里是空的 —— 那些步骤本来就没被记下来，
#          不要为了「看起来完整」去用 orders 的列倒推补几条，
#          倒推出来的时间和操作人只会比空白更容易看错。
# v8 -> v9：新增预设打印服务表 print_presets、纸张类型表 paper_types，
#          再给 orders 加六列（preset_id / preset_content / copies /
#          paper_type_id / paper_name / paper_remark）。新表靠
#          CREATE TABLE IF NOT EXISTS 补，新列照抄下面 contact_type 那段
#          幂等的 PRAGMA TABLE_INFO + ALTER TABLE，没有重建表。
#          老订单这六列全是 NULL，含义是「下单时还没有这些选项」——
#          不要给它们补一个默认份数或默认纸张：那时候打的就是一份，
#          但记录里没有这件事，编一个「1 份」出来只会让人分不清
#          哪一单是学生真的选了一份、哪一单是我们替他猜的。
# v9 -> v10：orders 新增 claim_alert_time（「未接单邮件提醒」的发信凭证列）。
#          又是一个纯加列，不需要重建表。
#          它的语义是 **NULL = 这笔单还没提醒过**，据此刻意不对老订单做任何回填：
#          回填一个时间戳，等于把「没提醒过」说成「提醒过了」，
#          这些单以后就再也不会被提醒了 —— 而且从数据上看不出发生过什么。
#          留空则会走正常流程，但受 CLAIM_ALERT_MAX_AGE_HOURS 限制，
#          老单本来也不会被翻出来补发。
SCHEMA_VERSION = '10'



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



def _migrate_relax_real_name_unique(cursor, current_version):
    """v4 -> v5：姓名不再要求唯一，只留普通索引加速查询。

    为什么放开 ——
    原设计假设的是「一栋宿舍楼几十个人，重名不现实」，所以姓名和昵称、学号一样
    被部分唯一索引卡着。接入全校名单后这个假设不成立了：四万多人里同名同姓
    （学号不同）是常态，唯一索引会把第二个「张伟」直接挡在注册之外 ——
    而他们确实是两个不同的人。身份的唯一标识交给学号，姓名只是称呼。

    为什么必须显式 DROP ——
    索引名没变，而下面的 CREATE INDEX IF NOT EXISTS 碰到同名索引会直接跳过，
    于是老库会一直留着原来那把 UNIQUE 的锁：代码改了、行为却一模一样，
    这种「改了没生效」最耗时。所以这里主动把旧索引拆掉。
    拆索引不动表数据，不需要像重建表那样先备份整库。
    """
    if _migration_version(current_version) >= 5:
        return
    row = cursor.execute(
        "SELECT sql FROM sqlite_master WHERE type = 'index' AND name = 'idx_users_real_name_live'"
    ).fetchone()
    # 只有旧索引确实带 UNIQUE 才拆。这一句同时保证幂等：
    # 拆完重建的是非唯一索引，下次再进来会直接从这里返回。
    if row is None or 'UNIQUE' not in (row[0] or '').upper():
        return
    cursor.execute('DROP INDEX idx_users_real_name_live')
    logger.info('迁移：姓名索引去掉唯一约束，重名不再被拒绝注册')



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
                update_time TIMESTAMP,
                price REAL,
                priced_by INTEGER,
                price_time TIMESTAMP,
                preset_id INTEGER,
                preset_content TEXT,
                copies INTEGER,
                paper_type_id INTEGER,
                paper_name TEXT,
                paper_remark TEXT,
                claim_alert_time TIMESTAMP
            )
        ''')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_claimed ON orders(claimed_by)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)')
        # 「还没计费的单」是每次开台都要查一遍的队列，单独建个索引。
        # 写成部分索引：只盖住待计费的那些行，表里堆到几万条订单以后它依然很小。
        # 值取自 ST_UNPRICED 而不是手打的字符串，改常量时这里跟着一起变。
        cursor.execute(
            'CREATE INDEX IF NOT EXISTS idx_orders_unpriced ON orders(status) '
            "WHERE status = '%s'" % ST_UNPRICED
        )
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

        # 计费三列，同一个套路：全新库靠上面的 CREATE TABLE 就带上了，
        # 老库这里补。price 存的是「元」，最多两位小数，可空 ——
        # 可空是有意义的：历史订单（这列还不存在的时候下的单）永远补不出一个合理金额，
        # 与其编一个 0，不如让「没计过费」这件事在数据里能看出来。
        order_columns = {row[1] for row in cursor.execute('PRAGMA table_info(orders)').fetchall()}
        if 'price' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN price REAL')
        if 'priced_by' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN priced_by INTEGER')
        if 'price_time' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN price_time TIMESTAMP')

        # 预设打印服务与打印选项这六列，还是同一个套路。
        #
        # preset_content / paper_name / paper_remark 存的是**下单当时的文本快照**。
        # 订单里明明已经有 preset_id 和 paper_type_id 了，为什么还要再抄一份字？
        # 因为预设和纸张都是管理员随时能改名、改内容、停用的，
        # 只存 id 的话，三个月前那一单的「打印要求」会跟着今天的管理操作一起变 ——
        # 打印员照着被改过的要求去核对一份早就打完的活，谁也说不清当时要的是什么。
        # 同理，纸张被删掉之后，老订单里那句「是什么纸」还得读得出来。
        #
        # copies 可空是有意的，不给老订单补默认值 1：
        # 那些单子下的时候还没「份数」这个东西，库里没有这个事实。
        # 补一个 1 出来，界面就会显示「1 份」，而我们分不清这是学生真的选了一份、
        # 还是我们替他猜的。空着，读的地方一律把 NULL 说成「未指定」。
        if 'preset_id' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN preset_id INTEGER')
        if 'preset_content' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN preset_content TEXT')
        if 'copies' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN copies INTEGER')
        if 'paper_type_id' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN paper_type_id INTEGER')
        if 'paper_name' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN paper_name TEXT')
        if 'paper_remark' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN paper_remark TEXT')

        # 未接单提醒的发信凭证。只有一个状态位的作用：
        # NULL = 还没提醒过，非 NULL = 已经在那个时刻提醒过了（谁先改成功谁负责发）。
        # 它不参与任何业务判断，纯粹是给 notifier 用的「抢占锁」——
        # 之所以放进数据库而不是记在内存里，是因为这台机器上同时跑着两个实例
        # 是这个项目的历史常态，而内存里的标记第二个进程根本看不见，
        # 结果就是同一笔单被提醒两遍。详见 notifier.py 的模块注释。
        if 'claim_alert_time' not in order_columns:
            cursor.execute('ALTER TABLE orders ADD COLUMN claim_alert_time TIMESTAMP')

        # 补列必须在重建表之前：重建时要连这两列一起拷过去，
        # 老库里要是还没这两列，拷贝那一步会直接报「no such column」。
        _migrate_release_unique_names(cursor, current_version)

        # 姓名索引的去唯一化必须排在下面建索引之前。
        # 反过来的话会先建出（或跳过）索引、再把它 DROP 掉，
        # 结果是这一次启动没索引，下次重启才补回来。
        _migrate_relax_real_name_unique(cursor, current_version)

        # 判重只对「还没注销」的账号生效，注销的把那几个名字让出来。
        # 条件写成 status <> 'closed' 而不是 status = 'active'：
        # 被临时禁用的账号名字当然也算数（人还在，只是暂时进不来）。
        #
        # 顺带一个值得记下来的副作用：昵称和学号这两个索引把「注销之后不能恢复」
        # 在数据库这一层也守住了。因为名字已经让给别人用了，谁要是绕过接口
        # 直接 UPDATE 把某个注销账号改回 active，就会撞上唯一索引而失败。
        # 代码里的判断是给人看的，索引是给「代码忘了判断」兜底的。
        cursor.execute('''
            CREATE UNIQUE INDEX IF NOT EXISTS idx_users_nickname_live
                ON users(nickname) WHERE status <> 'closed'
        ''')
        # 姓名刻意不建唯一索引。接入全校名单后，「同名的两个人」是常态而不是异常，
        # 唯一索引会把第二个同名的人直接挡在注册之外。
        # 仍然建普通部分索引：判重和查列表都会按姓名过一遍，走索引比全表扫描便宜。
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_users_real_name_live
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

        # 身份审核申请：学号不在名单上时的人工通道。
        #
        # 为什么不复用 tickets —— 工单是「已经登录进来的人和管理员对话」，
        # 而申请恰恰是**还没有账号的人**提的，user_id 这一列根本填不出来。
        # 硬塞进 tickets 就得把 NOT NULL 去掉，之后每个查工单的地方
        # 都要多问一句「这条有没有主人」，把两个不相干的场景缠在一起。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS audit_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                student_id TEXT NOT NULL,
                real_name TEXT NOT NULL,
                contact_type TEXT NOT NULL,
                contact TEXT NOT NULL,
                note TEXT,
                status TEXT NOT NULL DEFAULT 'pending',
                review_note TEXT,
                reviewed_by INTEGER,
                review_time TIMESTAMP,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        # 一个学号只留一条申请。约束写在数据库这一层而不是只靠接口里查一遍：
        # 「同一个学号反复提交」在索引这一层就不可能发生，接口哪次忘了判断也捅不穿。
        # 副作用是驳回后不能重申 —— 这是有意的，想让同一个人再申请，
        # 管理员直接把那条改成「已通过」即可，不需要真的重新走一遍流程。
        cursor.execute('''
            CREATE UNIQUE INDEX IF NOT EXISTS idx_audit_student_id
                ON audit_requests(student_id)
        ''')
        cursor.execute('''
            CREATE INDEX IF NOT EXISTS idx_audit_status ON audit_requests(status)
        ''')

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

        # 订单操作留痕：一条订单发生过什么、谁做的、从什么变成什么。
        #
        # 为什么不塞进 tickets —— 工单是**双向对话**（学生和管理员一来一回），
        # 而留痕是单向的流水，没有「谁在跟谁说话」这回事，也没人会去回它。
        # 混在一张表里，查工单的地方都要多问一句「这条是不是自动记的」。
        #
        # 为什么不复用 security 的日志文件 —— 那是文本日志，按天滚动、
        # 会被清理，而且靠正则去解析它才能拼出一单的历史，改一行日志格式就全断了。
        # 订单详情页要的是「稳定可查」，所以它得进库。
        #
        # actor_role 存的是动作发生当时的角色，不是外键 —— 见 log_order_event 的说明。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS order_logs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                actor_id INTEGER,
                actor_role TEXT,
                action TEXT NOT NULL,
                detail TEXT,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        # 详情页永远是「按订单号取这几条」，所以索引直接建在 order_id 上。
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_order_logs_order ON order_logs(order_id)')

        # 预设打印服务：管理员维护的「一段描述」，学生下单时可以挑一条套用。
        #
        # 只有 content 一个业务字段，是刻意的：见 config.PRESET_CONTENT_MIN 上面那段
        # 「多一个短名就有两处描述」的说明。要停用一种预设就 is_active = 0，
        # 不删 —— 老订单里存的虽然是文本快照，列表页还按 preset_id 反查它是不是还在，
        # 删掉只会让那一列永远显示「预设已删除」，而停用还能说清「这条停用了」。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS print_presets (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content TEXT NOT NULL,
                is_active INTEGER NOT NULL DEFAULT 1,
                created_by INTEGER,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute(
            'CREATE INDEX IF NOT EXISTS idx_print_presets_active ON print_presets(is_active)'
        )

        # 纸张类型：管理员自己加（A4 / A3 / 16K / 相纸……），不写死在代码里。
        #
        # name 带 COLLATE NOCASE：'A4' 和 'a4' 是同一张纸，让它们同时存在的话，
        # 打印员点开列表会看到两个看起来一模一样的选项，只能靠猜哪个是哪个。
        # 重复判在**应用层**（新建/改名时查一遍，包括已停用的），不建唯一索引 ——
        # 唯一索引会连已停用的记录一起挡住，于是「删了再建」和「停用了再建同名」
        # 都会失败，报出来的还是数据库层的 IntegrityError，用户完全看不懂。
        # 顺带一提，这里也不能用部分唯一索引：WHERE 里要写 is_active = 1，
        # 那表达出来的意思是「停用的可以叫同一个名字」，
        # 而我们要的恰恰是「名字整表唯一，跟启停无关」。
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS paper_types (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL COLLATE NOCASE,
                remark TEXT,
                is_active INTEGER NOT NULL DEFAULT 1,
                created_by INTEGER,
                create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                update_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_paper_types_active ON paper_types(is_active)')

        cursor.execute(
            "INSERT OR REPLACE INTO schema_meta (key, value) VALUES ('schema_version', ?)",
            (SCHEMA_VERSION,),
        )
        conn.commit()
    finally:
        conn.close()



def _backfill_admin_student_id(conn, row, configured_student_id):
    """给老部署的内置管理账号补上学号 —— 登录方式改了，老账号得跟着走。

    为什么要在启动时自动补：升级前内置账号的学号允许留空，而空学号的账号
    在新的登录方式（学号 + 密码）下永远登不进去。管理账号又恰恰是唯一
    能把人救出来的那个入口，不能让它停在「代码升级完了、人却进不去」的状态里。

    配置里有就补上；没有就只记一条 error，不抛异常 —— 抛了会让生产环境起不来，
    而这里只是「有个字段没填」，为它停掉整个服务不划算。
    """
    if (row['student_id'] or '').strip():
        return  # 已经有学号，不用管
    if not configured_student_id:
        logger.error('内置管理账号 #%s 没有学号，而登录方式是「学号 + 密码」，它会登不进去。'
                     '请在 .env 里补上 SUPER_ADMIN_STUDENT_ID', row['id'])
        return
    try:
        conn.execute('UPDATE users SET student_id = ? WHERE id = ?',
                     (configured_student_id, row['id']))
        conn.commit()
    except sqlite3.IntegrityError:
        # 这个学号已经被某个真人注册占掉了。该给谁用是人的决定，不能让程序猜。
        logger.error('内置管理账号 #%s 补学号失败：学号「%s」已被别的账号占用，'
                     '请换一个 SUPER_ADMIN_STUDENT_ID', row['id'], configured_student_id)
        return
    logger.info('内置管理账号 #%s 已补齐学号 %s（登录改用学号后必须得有）',
                row['id'], configured_student_id)



def seed_super_admin():
    """按配置创建内置管理账号，同昵称已存在就跳过，可以放心重复执行。

    判断的是昵称有没有被占用，不是系统里有没有这个角色的账号。
    这个区别很关键：后者会让新配的昵称被已有账号挡住、永远建不出来，
    想换账号只能手工改数据库。改成按昵称判断之后，新增配置就自动补建，
    重复启动也不会重复创建（幂等）。
    """
    # 昵称是登录名，必须非空；姓名/学号/宿舍可以留空（数据库里存空字符串）。
    # student_id 上有部分唯一索引，空字符串也算一个值，
    # 所以多个内置账号不能同时留空学号，第二个会撞唯一约束，日志里会提示。
    # 姓名已经放开唯一（重名太常见），留空不会互相冲突。
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
        existing = conn.execute(
            'SELECT id, student_id FROM users WHERE nickname = ? COLLATE NOCASE',
            (nickname,)).fetchone()
        if existing is not None:
            _backfill_admin_student_id(conn, existing, student_id)
            return
        if not student_id:
            # 登录改成「学号 + 密码」之后，没有学号的账号等于进不去，
            # 而这是系统里唯一的初始管理入口 —— 登不进去就没人能再进来补救了。
            # 后果和「超管密码没配」一样是把自己锁在门外，所以同样在启动时中止。
            raise SystemExit(
                '\n[启动中止] 内置管理账号「%s」还不存在，而且没有配置 SUPER_ADMIN_STUDENT_ID。\n'
                '  登录方式是「学号 + 密码」，没有学号的账号无法登录，因此拒绝启动。\n'
                '  请在 .env 里补上：SUPER_ADMIN_STUDENT_ID=<这个账号的登录学号>\n'
                '  （任意 4-20 位数字即可，它只是这个管理账号的登录名。）\n' % nickname)
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
            logger.error('内置管理账号创建失败：昵称「%s」/ 学号「%s」已被占用，'
                         '请修改 .env 中的 SUPER_ADMIN_* 配置（昵称和学号都是唯一字段，'
                         '多个账号不能同时留空学号）', nickname, student_id)
    finally:
        conn.close()
