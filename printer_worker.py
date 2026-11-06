"""printer_worker.py —— 打印机下发队列：管理端点「下发打印」之后，真正把文件送出去的地方。

架构是**每台打印机一条串行队列、一个消费者线程**（README 定过调：不需要消息队列）。
两台打印机物理上就是两个可以同时吃纸的口子，所以按机器分队列 —— 同一台严格串行，
两台之间并行。线程**惰性起**：打印机是数据库实体，管理员随时能在网页上加一台、
改一台地址，第一次有活派给它的时候线程才出现，不用重启服务。

队列在内存里 —— 服务重启丢掉的只是「还没发出去的活」，订单状态不会说谎
（没发出去就还是「待打印」，柜台重新点一次就行），为此引入一张队列表不划算。

与 notifier / archiver 同一套写法：daemon 线程、整轮包 try。
线程一死，那台机器的下发就永久停摆，而界面上只会看到「点了没反应」——
所以每一轮的失败都只记日志，不能让它死。

防重复有两道：
    ① (订单, 打印机) 二元组的 _inflight 集合 —— 同一单对同一台还在队列里/正在发时，
       第二次入队直接拒绝（换一台不受影响：那是操作员的明确选择）；
    ② orders.print_sent_time（订单级）—— 发成功过且没报错的单，再发**任何一台**
       都要操作人明确确认。纸是按单算的，多一台就多一份。
   跨进程的第三种情况（同一台库起两个服务实例）没有防 —— 真要那么跑的话，
   下发这一条本来也只该有一个实例碰打印机。
"""
import queue
import threading
import time
from pathlib import Path

from config import (ORDER_LOG_PRINT, PRINTER_RETRIES, ST_PENDING,
                    ST_PRINTING, UPLOAD_FOLDER, logger)
from db import db_conn, find_printer, files_for_orders, log_order_event
from printer import (DispatchError, TransientDispatchError, send_job)

# 每台打印机一条队列 + 一个消费者线程。_lock 只护 _queues/_workers_started
# 与 _inflight —— queue.Queue 自己是线程安全的。
_queues = {}
_workers_started = set()
_threads_lock = threading.Lock()
_inflight = set()

# 瞬时失败的退避：第 n 次重试前等 3n 秒，最多等 30 秒。
# 这是后台线程，等得起；柜台的人也等得起 —— 界面上那单还停在待打印。
_RETRY_BACKOFF_SECONDS = 3
_RETRY_BACKOFF_MAX_SECONDS = 30


def enqueue_dispatch(order_id, printer_id, actor_id, actor_role, overrides=None):
    """把一张订单排进**指定打印机**的下发队列。返回 False = 这单对这台已在队列里/正在发。

    overrides 是**下发时的参数覆盖**（{file_id: {'color_type':…, 'duplex':…}}，
    file_id 用 0 表示老库单的第一份）：柜台在确认框里逐份改的黑白/彩色、单/双面。
    份数不在可覆盖之列 —— 份数是计过价的，改份数请走「改参数」重新走计费口径。
    actor 是点按钮的那个人：下发的成败留痕要记的是**他**，
    而不是后台线程 —— 时间线上「谁送进打印机的」是柜台的问题，
    「哪个线程发的」不是。
    """
    key = (order_id, printer_id)
    with _threads_lock:
        if key in _inflight:
            return False
        _inflight.add(key)
        queue_for = _queues.setdefault(printer_id, queue.Queue())
        if printer_id not in _workers_started:
            _workers_started.add(printer_id)
            thread = threading.Thread(target=_loop, args=(printer_id,),
                                      name='printer-worker-%d' % printer_id, daemon=True)
            thread.start()
            logger.info('打印机下发：为打印机 #%s 起了下发线程', printer_id)
    queue_for.put((order_id, printer_id, actor_id, actor_role, overrides or {}))
    logger.info('打印机下发：订单 #%s 已排入打印机 #%s 的队列（操作人 uid=%s，前方 %d 单）',
                order_id, printer_id, actor_id, queue_for.qsize() - 1)
    return True


def _resolve_order_file(raw_path):
    """把库里的文件路径校验成「上传目录内、真实存在」的 Path，不对就 None。

    与 routes/orders.py 的 api_download 是同一套双重校验：库里的路径解析后
    必须还在上传目录内，防止路径穿越；这是从库里读出来的数据，
    被篡改时按理不该发生，但下发这一步是要把文件原样交给外部设备的，
    拦网必须拉在出去之前。
    """
    if not raw_path:
        return None
    try:
        upload_root = Path(UPLOAD_FOLDER).resolve()
        path = Path(raw_path).resolve()
    except (OSError, ValueError):
        return None
    if upload_root != path.parent and upload_root not in path.parents:
        return None
    return path if path.is_file() else None


def _pick_param(file_row, order_row, column, fallback):
    """读一份文件的打印参数：本行的值优先，为空（v24 前的老单、整单一套参数的新单）
    沿用订单级的值，再没有就用兜底。与前端展示的读法是同一个口径。"""
    value = file_row[column] if file_row is not None else None
    if value is None:
        value = order_row[column]
    if value is None or value == '':
        value = fallback
    return value


def _dispatch_params(entry, order, overrides, file_key):
    """算出这一份**实际发送**的颜色与单双面，以及它是否偏离了订单参数。

    优先级：确认框的逐份覆盖 > 文件行参数 > 订单级参数 > 兜底。
    订单级的 'mixed' 不能当某一仢单双面的值（它只说明「各份不同」），落到单面。
    返回 (dispatched_color, dispatched_duplex, deviated: bool)。
    """
    over = overrides.get(file_key) or {}
    order_color = _pick_param(entry, order, 'color_type', 'black')
    order_duplex = _pick_param(entry, order, 'duplex', 'single')
    color = over.get('color_type') or order_color
    duplex = over.get('duplex') or (order_duplex if order_duplex in ('single', 'double') else 'single')
    deviated = (color != order_color) or (duplex != order_duplex and order_duplex != 'mixed')
    return color, duplex, deviated


_LABEL_COLOR = {'black': '黑白', 'color': '彩色'}
_LABEL_DUPLEX = {'single': '单面', 'double': '双面'}


def _send_with_retry(pr, file_path, job_name, copies, duplex, color, paper_name):
    """发一份文件，瞬时失败按 PRINTER_RETRIES 退避重试。
    返回打印机给的 {'job_id': ...}；永久失败直接抛，重试没意义。"""
    last_exc = None
    for attempt in range(1 + max(0, PRINTER_RETRIES)):
        try:
            return send_job(pr, file_path, job_name, copies, duplex, color, paper_name)
        except TransientDispatchError as exc:
            last_exc = exc
            wait = min(_RETRY_BACKOFF_MAX_SECONDS, _RETRY_BACKOFF_SECONDS * (attempt + 1))
            logger.warning('打印机下发：第 %d/%d 次失败（%s），%d 秒后重试',
                           attempt + 1, 1 + PRINTER_RETRIES, exc, wait)
            if attempt < PRINTER_RETRIES:
                time.sleep(wait)
    raise last_exc


def _record_job(conn, order_id, printer, job_id, error, params, actor_id, actor_role,
                sent_time=True):
    """往 print_jobs 写一行 —— 逐台逐次的下发明细（D.4 要的口径）。

    成败都写：成功行带 sent_time 与 job_id，失败行带 error。参数四列是
    下发当时的快照（订单参数事后能被改，这张表要能回答「那一次按什么参数发的」）。
    sent_time 用 SQL 的 CURRENT_TIMESTAMP 拼进语句而不是当绑定参数传 ——
    绑定参数只会存进字面字符串，拿不到时间戳语义。
    """
    conn.execute('''
        INSERT INTO print_jobs (order_id, printer_id, printer_name, job_id, sent_time,
                                error, color_type, duplex, copies, paper_name,
                                actor_id, actor_role)
        VALUES (?, ?, ?, ?, CASE WHEN ? THEN CURRENT_TIMESTAMP ELSE NULL END,
                ?, ?, ?, ?, ?, ?, ?)
    ''', (order_id, printer['id'], printer['name'], job_id,
          1 if sent_time else 0, error, params[0], params[1], params[2], params[3],
          actor_id, actor_role))


def _dispatch(order_id, printer_id, actor_id, actor_role, overrides=None):
    """真正的一单下发：取单与打印机 → 逐份发送 → 按结果写状态、明细与留痕。

    overrides 是确认框的逐份参数覆盖（见 enqueue_dispatch）。抽成独立函数与
    archiver.scan_once 同一个理由：循环本身没什么好测的，要钉住的是
    「哪些路径能发、哪些不能，以及留痕写了没有」。
    """
    overrides = overrides or {}
    with db_conn() as conn:
        order = conn.execute(
            'SELECT id, pickup_code, filename, file_path, color_type, duplex, copies, '
            'paper_name, status, print_sent_time, print_error '
            'FROM orders WHERE id = ?', (order_id,)).fetchone()
        printer = conn.execute(
            'SELECT id, name, host, mode, port, ipp_path, is_active '
            'FROM printers WHERE id = ?', (printer_id,)).fetchone()
        if order is None or printer is None:
            # 排队期间单子被撤回、或打印机被管理员删掉：都不发。
            # 单子没了自然发不成；打印机没了更不能凭记忆发 ——
            # 地址可能已经被改成另一台了。
            logger.warning('打印机下发：订单 #%s 或打印机 #%s 已不存在，跳过',
                           order_id, printer_id)
            return
        if order['status'] not in (ST_PENDING, ST_PRINTING):
            # 排队期间单子被撤回/取走了。这时候把文件塞进打印机，
            # 出来的纸就是没人认领的 —— 拦下，留痕，让人知道为什么没打。
            log_order_event(conn, order_id, actor_id, actor_role, ORDER_LOG_PRINT,
                            '下发时订单已不处于待打印/打印中（当时是「%s」），未送打印机'
                            % order['status'])
            conn.commit()
            logger.info('打印机下发：订单 #%s 在排队期间被改成「%s」，未送打印机',
                        order_id, order['status'])
            return
        if printer['is_active'] != 1:
            log_order_event(conn, order_id, actor_id, actor_role, ORDER_LOG_PRINT,
                            '打印机「%s」已被停用，未送打印机' % printer['name'])
            conn.commit()
            logger.info('打印机下发：打印机 #%s 已停用，订单 #%s 未送', printer_id, order_id)
            return
        # 下发时的打印机档案：网页上改过地址就以库里这份最新值为准。
        pr = {'host': printer['host'], 'mode': printer['mode'],
              'port': printer['port'], 'ipp_path': printer['ipp_path']}

        listed = files_for_orders(conn, [order_id]).get(order_id, [])
        # 预设服务下的单没有文件（file_path 是空串，见 create_preset_order）——
        # 这种单是「服务」不是「文件」，本就没有可送进打印机的东西。
        if not order['file_path'] and not listed:
            log_order_event(conn, order_id, actor_id, actor_role, ORDER_LOG_PRINT,
                            '这一单用的是预设服务，没有文件可下发')
            conn.execute('UPDATE orders SET print_error = ?, update_time = CURRENT_TIMESTAMP '
                         'WHERE id = ?', ('预设服务单没有文件可下发', order_id))
            conn.commit()
            return

        if listed:
            entries = list(listed)
        else:
            # 老库回填之前的行（order_files 里没有记录）仍按老列走，
            # 与 api_download 的回退口径一致。id 给 0：确认框的参数覆盖按它对号。
            entries = [{'id': 0, 'filename': order['filename'], 'file_path': order['file_path'],
                        'color_type': None, 'duplex': None, 'copies': None}]

        sent = 0
        job_id = None
        # 失败的两份文本**在各分支里显式给出**，不靠事后猜内容拼装：
        #   column_error —— 写进 orders.print_error 与 print_jobs.error 的「原因本身」。
        #                   界面那句「上次下发失败：…」已经替它带过了前缀，这里再带
        #                   就成了「上次下发失败：下发失败：…」（视觉验收实测踩过）。
        #   log_detail   —— 写进 order_logs 的时间线叙事，该带前缀的带前缀。
        column_error = None
        log_detail = None
        deviations = []  # 与订单参数不一致的逐份记录（确认框改了黑白/单双面才发生）
        for index, entry in enumerate(entries, 1):
            path = _resolve_order_file(entry['file_path'])
            if path is None:
                # 前面送出去的纸收不回来，如实说清：重发会整单重打。
                if sent:
                    column_error = ('第 %d/%d 份（%s）文件已不在服务器上，前 %d 份已送出 —— '
                                    '要补打缺的那几份，请按份下载后手动打印，整单重发会多印'
                                    % (index, len(entries), entry['filename'], sent))
                else:
                    column_error = ('第 %d/%d 份（%s）文件已不在服务器上'
                                    % (index, len(entries), entry['filename']))
                log_detail = column_error
                break
            dispatched_color, dispatched_duplex, deviated = _dispatch_params(
                entry, order, overrides, entry['id'])
            order_color = _pick_param(entry, order, 'color_type', 'black')
            order_duplex = _pick_param(entry, order, 'duplex', 'single')
            params = (dispatched_color, dispatched_duplex,
                      _pick_param(entry, order, 'copies', 1),
                      order['paper_name'] or '')
            if deviated:
                deviations.append(
                    '第 %d 份按 %s·%s 发送（订单原为 %s·%s）'
                    % (index, _LABEL_COLOR.get(dispatched_color, dispatched_color),
                       _LABEL_DUPLEX.get(dispatched_duplex, dispatched_duplex),
                       _LABEL_COLOR.get(order_color, order_color),
                       _LABEL_DUPLEX.get(order_duplex, order_duplex)))
            try:
                result = _send_with_retry(
                    pr, str(path),
                    '单号 %s · %s' % (order['pickup_code'] or order_id, entry['filename']),
                    params[2], params[1], params[0], params[3])
            except DispatchError as exc:
                if sent:
                    column_error = ('第 %d/%d 份（%s）下发失败：%s —— 前 %d 份已送出，'
                                    '整单重发会多印，缺的几份请按份下载后手动打印'
                                    % (index, len(entries), entry['filename'], exc, sent))
                    log_detail = column_error
                else:
                    column_error = str(exc)
                    log_detail = '下发失败：%s' % exc
                _record_job(conn, order_id, printer, None, column_error, params,
                            actor_id, actor_role, sent_time=False)
                break
            sent += 1
            if result.get('job_id') and not job_id:
                job_id = result['job_id']
            _record_job(conn, order_id, printer, result.get('job_id'), None, params,
                        actor_id, actor_role, sent_time=True)

        printer_label = '「%s」' % printer['name']
        if sent == len(entries):
            # 全部送出才算「已下发」。条件 UPDATE 与改状态接口同一个守卫：
            # 排队期间单子被人动过（撤回/改状态），rowcount = 0，不硬掰 ——
            # 少标一张状态无所谓，把一张已撤回的单标成打印中才是真的错账。
            cursor = conn.execute(
                'UPDATE orders SET status = ?, print_job_id = ?, print_sent_time = CURRENT_TIMESTAMP, '
                'print_error = NULL, update_time = CURRENT_TIMESTAMP '
                'WHERE id = ? AND status IN (?, ?)',
                (ST_PRINTING, job_id, order_id, ST_PENDING, ST_PRINTING))
            to_status = ST_PRINTING if order['status'] == ST_PENDING else None
            if sent == 1:
                detail = ('已送进打印机%s%s'
                          % (printer_label, '，任务号 %s' % job_id if job_id else ''))
            else:
                detail = ('已送进打印机%s：%d 份文件%s'
                          % (printer_label, sent, '，任务号 %s' % job_id if job_id else ''))
            # 参数偏离必须进时间线：钱按订单参数收的，纸按覆盖参数打的，
            # 这段话就是那笔账的凭证（D.5 的「收的钱和打的纸不一样」防线）。
            if deviations:
                detail += '（按确认框选择发送：%s）' % '；'.join(deviations)
            log_order_event(conn, order_id, actor_id, actor_role, ORDER_LOG_PRINT,
                            detail, to_status=to_status if cursor.rowcount == 1 else None)
            conn.commit()
            logger.info('打印机下发：订单 #%s 全部 %d 份已送出 %s（job=%s）',
                        order_id, sent, printer_label, job_id)
        else:
            # 没能全部送出：状态不动（原地等人工决定重发还是手动处理），
            # print_error 写给界面看，留痕写给时间线看 —— 两条记录缺一不可，
            # 只写库列的话时间线上就出现「凭空消失的失败」。
            # WHERE 带状态守卫，与成功分支同一个道理：发送的那几十秒里单子可能
            # 被人标成可取件/取走 —— 把「下发失败」挂到一张已经交出去的单上，
            # 柜台会当它没打好扣下来，比不写更糟。错误详情留在上面的留痕里。
            if sent and job_id and not order['print_sent_time']:
                conn.execute('UPDATE orders SET print_error = ?, print_job_id = ?, '
                             'update_time = CURRENT_TIMESTAMP '
                             'WHERE id = ? AND status IN (?, ?)',
                             (column_error, job_id, order_id, ST_PENDING, ST_PRINTING))
            else:
                conn.execute('UPDATE orders SET print_error = ?, update_time = CURRENT_TIMESTAMP '
                             'WHERE id = ? AND status IN (?, ?)',
                             (column_error, order_id, ST_PENDING, ST_PRINTING))
            log_order_event(conn, order_id, actor_id, actor_role, ORDER_LOG_PRINT,
                            '%s%s' % (printer_label, log_detail))
            conn.commit()
            logger.warning('打印机下发：订单 #%s 失败 %s（%d/%d 份送出）：%s',
                           order_id, printer_label, sent, len(entries), column_error)


def _loop(printer_id):
    while True:
        item = _queues[printer_id].get()  # 阻塞等活：daemon 线程，进程退出时它跟着消失
        try:
            _dispatch(*item)
        except Exception:  # noqa: BLE001 —— 走到这里说明是代码 bug，不是打印机问题
            logger.exception('打印机下发：订单 #%s 处理流程出错', item[0])
            try:
                with db_conn() as conn:
                    conn.execute('UPDATE orders SET print_error = ?, update_time = CURRENT_TIMESTAMP '
                                 'WHERE id = ? AND status IN (?, ?)',
                                 ('下发流程内部错误（详见服务日志）', item[0], ST_PENDING, ST_PRINTING))
                    # 内部错误同样要进时间线 —— 只写库列的话，时间线上就是
                    # 一次「凭空消失的失败」（与上面 _dispatch 失败分支同一条原则）。
                    log_order_event(conn, item[0], item[2], item[3], ORDER_LOG_PRINT,
                                    '下发流程内部错误（详见服务日志）')
                    conn.commit()
            except Exception:  # noqa: BLE001
                logger.exception('打印机下发：订单 #%s 的失败标记也写不进去', item[0])
        finally:
            with _threads_lock:
                _inflight.discard((item[0], item[1]))


def start_printer_worker():
    """启动时就位。线程按打印机**惰性起**（第一次有活派给某台的时候）——
    打印机是网页端随时能加的数据，启动时它可能还没存在。"""
    logger.info('打印机下发：已就绪（每台打印机一条队列，首次派活时起线程）')
    return None
