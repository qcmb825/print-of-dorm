"""identity.py —— 身份核验：拿学号去学生名单库里核对，并判定能不能注册。

名单是**从校外系统整份导入的别人的数据**，与本站主库刻意分开存
（理由见 config.ROSTER_DB_PATH 那段注释）。这个模块是唯一碰它的地方：
其余代码只调 lookup / fill_missing_name，不自己拼 SQL ——
免得哪天有人顺手拿 get_db() 去连名单库，把两张库的规矩搅到一起。

判定结果为什么集中在这里：注册接口和审核申请接口都要问「这个学号什么情况」，
各写一套的话迟早出现「注册说不行、申请说可以」这种自相矛盾的话术，
而用户只会觉得这个系统坏了。
"""

import sqlite3
from collections import namedtuple
from datetime import datetime
from pathlib import Path

from config import AUDIT_APPROVED, AUDIT_PENDING, ROSTER_DB_PATH, logger
from db import db_conn
from security import security_event


# 姓名这一栏是从哪来的。存下来不是为了当下的对错，而是为了**将来能不能信**：
#   import        —— 学校名单里原本就有的，属于权威数据；
#   self_reported —— 名单里空着、学生注册时自己填的，没有人核对过。
# 这两类值必须分得开：回填出去的姓名等于把这个学号锁死在那种写法上，
# 哪天发现填错了，得能查出来哪些是学生自报的、可以放心改。
NAME_SOURCE_IMPORT = 'import'

NAME_SOURCE_SELF = 'self_reported'


# 注册闸门的判定结果。用具名元组而不是一串裸值：
# 调用方要同时拿到「给用户看的话」和「写进日志的真实原因」，两者都是字符串，
# 只按位置传很容易接反 —— 而接反了不报错，只是把内部原因漏给用户看了。
GateResult = namedtuple('GateResult', ['allowed', 'reason', 'message', 'backfill'])

# reason 一律用这些短标识，不写中文句子。
# 因为调用方要拿它分支（比如决定「这次被拒是不是还有别的出路」），
# 而和中文提示语混在一起的话，改一个字就会让分支失效 ——
# 失效的表现只是前端那个入口不见了，不会报任何错。
GATE_OK_ROSTER = 'ok_roster'

GATE_OK_BACKFILL = 'ok_backfill'

GATE_OK_AUDITED = 'ok_audited'

GATE_ROSTER_UNAVAILABLE = 'roster_unavailable'

GATE_NAME_MISMATCH = 'name_mismatch'

GATE_NOT_IN_ROSTER = 'not_in_roster'

GATE_AUDIT_PENDING = 'audit_pending'

GATE_AUDIT_REJECTED = 'audit_rejected'

# 被拒之后还**能**去提交身份审核申请的两种情况。前端拿它决定要不要弹那个入口。
GATE_CAN_APPLY_AUDIT = (GATE_NAME_MISMATCH, GATE_NOT_IN_ROSTER)


class RosterUnavailable(Exception):
    """名单库读不出来：文件不在、结构不对、或者被别的进程锁着。"""


# students 表**必须**长这四列，一个不多一个不少。
#
# 为什么把这个结构写进代码、再在启动时对一遍：
# 这张表的写入方只有一处 —— fill_missing_name 的 UPDATE，而它整条语句
# 包在 `except sqlite3.Error` 里，失败只记一条 warning 就 `return False`。
# 这个设计本身是有意的（名单写不进去不能连带把注册搞失败），但它有个副作用：
# **表结构一旦对不上（比如名单是旧格式、少了 name_source 那一列），
# 回填就永远静默失败** —— 注册照常成功、日志里只有一行 warning，
# 「名单里缺姓名的学号」那一千多条就这么一直空着，没人会发现。
# 所以启动时把结构对一遍并**响亮地报出来**：让它在服务起来的那一刻就
# 出现在日志里，而不是等哪天有人去查「为什么补不上名字」。
#
# 用 tuple 而不是 set：顺序也一起钉住，将来真要加列，这里必须显式改。
EXPECTED_STUDENT_COLUMNS = ('num', 'real_name', 'name_source', 'update_time')


def check_roster_schema():
    """启动自检：名单库的 students 表结构是不是代码认的那一副。

    返回 (ok, message)：
      (True,  '')             结构对得上，或者名单库本来就没配（不算错）
      (False, '中文说明')      对不上，调用方负责**醒目地**记下来

    刻意不抛异常、也不阻断启动：名单库只服务「注册」这一条路径，
    订单、取件、管理端都不碰它。为了它把整个服务拒之门外，
    等于让一件局部故障升级成全体不可用 —— 那才是真的坏了。
    但也不能不出声：返回的 message 就是给日志用的，写清是哪一列对不上。

    这里用只读连接（和 lookup 同一口径）：自检不该有能力改动名单。
    """
    path = Path(ROSTER_DB_PATH)
    if not path.is_file():
        # 「没配名单库」是一种合法状态（本地开发、或先用审核通道顶着），
        # 但它有代价：注册闸门会走 RosterUnavailable 分支，谁都注册不了。
        # 所以既不算通过、也不算结构错，交给调用方决定用什么级别记。
        return None, '名单库文件不存在：%s' % path

    conn = _connect()
    try:
        rows = conn.execute('PRAGMA table_info(students)').fetchall()
    except sqlite3.Error as exc:
        return False, '名单库结构读不出来（%s）：%s' % (path, exc)
    finally:
        conn.close()

    if not rows:
        return False, '名单库里没有 students 表（%s）' % path

    actual = tuple(row['name'] for row in rows)
    if actual == EXPECTED_STUDENT_COLUMNS:
        return True, ''

    missing = [c for c in EXPECTED_STUDENT_COLUMNS if c not in actual]
    extra = [c for c in actual if c not in EXPECTED_STUDENT_COLUMNS]
    detail = '实际 %s / 期望 %s' % (list(actual), list(EXPECTED_STUDENT_COLUMNS))
    if missing:
        detail += '；缺少 %s' % missing
    if extra:
        detail += '；多出 %s' % extra
    return False, detail



def _connect(writable=False):
    """连名单库（默认只读）。每次调用都开关一个连接，不留长连接。

    两个刻意的选择：

    ① 文件不存在时直接报错，绝不「顺手建一个空库」。
       SQLite 连一个不存在的文件会默默建出空库，于是「名单文件忘了拷过来」
       会表现成「名单是空的、一个学生都查不到」—— 所有人注册都被拒，
       日志里却看不出任何异常，很难往「文件没拷过来」上想。宁可在这里就炸。

    ② 用完立刻关，不缓存连接。Windows 下只要还有连接开着，名单更新脚本的
       os.replace 就覆盖不了文件。名单是「换届时整份替换」的东西，
       为了省一次 connect 而让更新失败，不划算。
    """
    path = Path(ROSTER_DB_PATH)
    if not path.is_file():
        raise RosterUnavailable('名单库文件不存在：%s' % path)
    # 拼成 URI，Windows 的反斜杠在 URI 里是转义符，必须换成正斜杠
    uri = 'file:%s' % path.as_posix()
    if not writable:
        # 查询一律只读：这一步没有任何写需求，关掉写权限之后，
        # 就算这里将来被改出个写语句，也伤不到名单文件。
        uri += '?mode=ro'
    try:
        conn = sqlite3.connect(uri, uri=True, timeout=5)
    except sqlite3.Error as exc:
        raise RosterUnavailable('名单库打开失败：%s' % exc) from exc
    conn.row_factory = sqlite3.Row
    return conn



def lookup(student_id):
    """按学号查名单，返回 (是否在名单上, 名单里登记的姓名)。

    三种结果要分清楚，它们对应三件不同的事：
      (False, None)   名单里没这个学号 —— 机器认不出来，走人工审核通道；
      (True,  None)   有这个人，但学校那边没登记姓名 —— 允许注册，顺手把名字补上；
      (True,  '张三') 名单里有名有姓 —— 拿它和用户填的姓名比对。

    把后两种合并成一个「查到了」会让缺名的那批人被白白挡在门外，
    而「名单里有学号、没有名字」在真实数据里不算少见（这批源数据里有一千多条）。
    """
    conn = _connect()
    try:
        row = conn.execute(
            'SELECT real_name FROM students WHERE num = ?', (student_id,)).fetchone()
    except sqlite3.Error as exc:
        raise RosterUnavailable('名单库查询失败（%s）：%s' % (ROSTER_DB_PATH, exc)) from exc
    finally:
        conn.close()
    if row is None:
        return False, None
    name = (row['real_name'] or '').strip()
    return True, (name or None)



def fill_missing_name(student_id, real_name):
    """把学生自报的姓名补进名单里那个空位，补上了返回 True。

    为什么值得回填：这份名单是整份导入的，补进去的这条下次导入**会被覆盖**，
    所以它救不了自己 —— 但它能让这个学号在被人查的时候有名字可看。
    真正不会丢的那份记录在 users 表里（用户注册信息），回填只是顺手。

    写失败不让注册跟着失败：用户要的结果是注册成功，
    名单写不进去顶多是这条信息没留下，记一条 warning 就够了。

    为什么 WHERE 里带 real_name 为空的条件：这句只在**空位**上写，
    绝不覆盖已有的姓名。顺带也就幂等了 —— 重复执行第二次不会再改任何东西。
    """
    conn = _connect(writable=True)
    try:
        cursor = conn.execute('''
            UPDATE students
               SET real_name = ?, name_source = ?, update_time = ?
             WHERE num = ? AND (real_name IS NULL OR real_name = '')
        ''', (
            real_name, NAME_SOURCE_SELF,
            # 时间戳手写本地时间而不是用 CURRENT_TIMESTAMP：后者是 UTC，
            # 而这一列是给人看的（「这个名字什么时候补的」），
            # 和 build_roster_db.py 写入时用的是同一种格式，两者要能并排比较。
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'), student_id,
        ))
        conn.commit()
        return cursor.rowcount > 0
    except sqlite3.Error as exc:
        logger.warning('回填名单姓名失败（不影响本次注册）学号=%s：%s', student_id, exc)
        return False
    finally:
        conn.close()



def normalize_name(name):
    """比对姓名前先归一化：去掉所有空白、统一大小写。

    名单是别的系统导出的，名字中间夹个空格、全角空格都很常见
    （少数民族姓名尤其如此），直接字符串比对会把「阿依古丽 · 买买提」
    和「阿依古丽·买买提」判成两个人 —— 而那个人明明就在名单里，
    注册却让他去走人工审核，他会觉得这系统根本查不到他。

    只去空白和大小写，不做别的改写：名字怎么写属于本人，
    不该由程序替他决定（比如把异体字统一掉）。
    """
    return ''.join((name or '').split()).casefold()



def check_registration(student_id, real_name):
    """注册闸门：这个学号现在能不能注册？

    返回 GateResult，四个字段分别是：
      allowed  能不能放行
      reason   内部原因，只进日志和 security_event，不给用户看
      message  被拒时给用户看的话（放行时是空串）
      backfill 放行后要不要把用户填的姓名补进名单

    ★ 名单库不可用时**不放行**，这一点是刻意的。
      「读不到名单」和「名单里没有这个人」必须分开：混为一谈的话，
      名单文件一丢，任何学号都能注册进来，而且没有任何迹象 ——
      服务照常跑（老用户看订单、取件都不受影响），只是注册这道门关上了。
      真要出事，宁可让人先注册不了来报错，也不能让陌生人混进来。
    """
    try:
        found, roster_name = lookup(student_id)
    except RosterUnavailable as exc:
        logger.error('身份校验无法进行，本次注册被拒：%s', exc)
        security_event('roster_unavailable', '注册时名单库不可用：%s' % exc)
        return GateResult(False, GATE_ROSTER_UNAVAILABLE,
                          '身份校验暂时不可用，请稍后再试或联系管理员', False)

    if found:
        if roster_name is None:
            # 名单里有学号、没名字 —— 这正是这份名单缺的那一块，放行并补上。
            return GateResult(True, GATE_OK_BACKFILL, '', True)
        if normalize_name(roster_name) == normalize_name(real_name):
            return GateResult(True, GATE_OK_ROSTER, '', False)
        # 名单里登记的是另一个名字。这不是「查无此人」，更像是两种情况之一：
        # 本人改过名（名单还停在旧名），或者有人拿别人的学号来注册。
        # 机器分不出来，所以既不当场放行、也不当成骗子 —— 交给人工核对。
        # 留痕是必须的：同一个学号被反复用不同姓名来试，是有人在撞库的特征。
        security_event('register_name_mismatch',
                       '学号 %s 填写的姓名与名单登记的不一致' % student_id)
        return GateResult(False, GATE_NAME_MISMATCH,
                          '你填写的姓名与学校名单登记的不一致。'
                          '如果是本人改过名、或名单有误，可以提交身份审核申请', False)

    # 名单里没这个学号。机器到此为止，只能看有没有人已经人工核过。
    with db_conn() as conn:
        row = conn.execute(
            'SELECT status FROM audit_requests WHERE student_id = ?', (student_id,)).fetchone()

    if row is None:
        return GateResult(False, GATE_NOT_IN_ROSTER,
                          '你的学号不在学校名单中。可以提交身份审核申请，'
                          '通过后即可注册', False)
    if row['status'] == AUDIT_APPROVED:
        # 只认学号，不再拿姓名跟申请上的那份比对。
        # 管理员是**看着申请上的姓名和联系方式**批准这个学号的，那一刻已经核过；
        # 注册时再比一遍，只会让「申请时多打了一个空格」变成一道过不去的坎。
        return GateResult(True, GATE_OK_AUDITED, '', False)
    if row['status'] == AUDIT_PENDING:
        return GateResult(False, GATE_AUDIT_PENDING,
                          '你提交的身份审核申请正在处理中，请耐心等待', False)
    return GateResult(False, GATE_AUDIT_REJECTED,
                      '你提交的身份审核申请未通过。如确有需要，请联系管理员', False)
