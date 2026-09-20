"""OneBot v11 正向 WebSocket 客户端 —— 只实现 printbot 用到的那一小块。

协议要点（v11 规范，够用的部分）：
  - 连上后，实现方（LLBot / NapCat）会推**事件帧**（带 post_type）过来；
  - 我们发**动作帧** {'action': .., 'params': .., 'echo': ..} 去调 API
    （发消息等），实现方用同样的 echo 回**响应帧**；
  - 心跳（meta_event）周期性到达，长期没有帧 ≈ 连接半死，直接断开重连。

线程模型（真机踩过一次，结构就是为它这么定的）：
  - **收帧线程**只做一件事：读帧、路由。事件帧塞进队列，响应帧唤醒等 echo 的调用方；
  - **事件处理线程**从队列取事件，慢慢跑 on_event（里面常常要调动作、等响应）；
  - 动作调用（call_action）从处理线程发出，响应帧由收帧线程送回对应的等待队列。
  ⚠️ 为什么不能让收帧线程直接跑 on_event（最初的版本就是这样）：
  处理函数里一回消息就要 call_action 等响应，而「等响应」把这唯一的读帧线程
  卡死了 —— 响应帧到了没人读，必然 15 秒超时。收事件和发动作必须分在两个线程上，
  这不是优化，是正确性。
"""

import json
import logging
import queue
import threading
import uuid

try:
    import websocket  # websocket-client，见 printbot/requirements.txt
except ImportError:  # 让 import 本模块不炸，真正要用时再给出人话提示
    websocket = None

log = logging.getLogger('printbot.onebot')

# recv 超时 = 判定连接半死的秒数。LLBot 配的心跳是 60 秒一跳，
# 120 秒还一个字都没有，说明这条连接已经名存实亡，重连比干等强。
RECV_TIMEOUT_SECONDS = 120
# 动作响应的等待上限。发消息这类动作正常是毫秒级；
# 超时多半意味着连接已经坏了（响应永远等不到）。
ACTION_TIMEOUT_SECONDS = 15


class OneBotError(RuntimeError):
    """连接或动作调用的失败。断线重连由外层循环负责，这里只负责如实上报。"""


class OneBotClient:
    def __init__(self, url, access_token='', on_event=None):
        self.url = url
        self.access_token = access_token
        self.on_event = on_event or (lambda event: None)
        self.self_id = None  # 登录的这个 QQ 号（登录/心跳事件里带）
        self._ws = None
        self._send_lock = threading.Lock()
        self._pending = {}  # echo -> queue.Queue（响应帧的去处）
        self._events = queue.Queue()  # 事件帧的去处（见模块注释的线程模型）
        self._worker = None
        self._stop = False

    # ---- 连接管理 -------------------------------------------------------

    def connect(self):
        """建立一次连接。断线重连由外层 run 循环做，这里只做一次。"""
        if websocket is None:
            raise OneBotError('缺少 websocket-client：先在 printbot/ 目录跑 '
                              'pip install -r requirements.txt')
        header = []
        if self.access_token:
            header.append('Authorization: Bearer %s' % self.access_token)
        try:
            ws = websocket.create_connection(self.url, timeout=RECV_TIMEOUT_SECONDS,
                                             header=header)
        except OSError as exc:
            raise OneBotError('连不上 OneBot（%s）：%s' % (self.url, exc)) from exc
        self._ws = ws
        self._stop = False
        # 事件处理线程：每个连接一份（重连会换新 client 对象，旧线程靠哨兵退出）。
        self._worker = threading.Thread(target=self._dispatch_events,
                                        name='onebot-events', daemon=True)
        self._worker.start()

    def _dispatch_events(self):
        """事件处理线程的主体。见模块注释里那段「为什么必须分线程」。"""
        while True:
            event = self._events.get()
            if event is None:  # 哨兵：连接关闭
                return
            try:
                self.on_event(event)
            except Exception:  # noqa: BLE001 —— 处理函数炸了不能带崩处理线程
                log.exception('事件处理抛了异常（已吞掉，循环继续）')

    def close(self):
        self._stop = True
        self._events.put(None)  # 让处理线程退出（daemon 兜底，但主动收尾更干净）
        ws = self._ws
        self._ws = None
        if ws is not None:
            try:
                ws.close()
            except OSError:
                pass

    # ---- 收帧 -----------------------------------------------------------

    def recv_forever(self):
        """阻塞收帧，直到连接死亡（抛 OneBotError）。"""
        while not self._stop:
            try:
                raw = self._ws.recv()
            except websocket.WebSocketTimeoutException:
                raise OneBotError('%s 秒没收到任何帧（心跳也停了），判定连接已死'
                                  % RECV_TIMEOUT_SECONDS) from None
            except (OSError, websocket.WebSocketException) as exc:
                raise OneBotError('连接断开：%s' % exc) from exc
            if not raw:
                continue
            self._route_frame(raw)

    def _route_frame(self, raw):
        """把一帧原始数据送到该去的地方。**不碰 socket**，可以脱离连接单测。

        路由顺序有讲究：先看 echo（动作响应），再看 post_type（事件）——
        理论上两者的形状不重叠，但先 echo 的成本最低，还能挡住
        实现方哪天把响应也带上 post_type 的怪行为。
        """
        try:
            frame = json.loads(raw)
        except (ValueError, UnicodeDecodeError):
            log.warning('收到无法解析的帧，已忽略：%r', raw[:120])
            return
        if not isinstance(frame, dict):
            return

        echo = frame.get('echo')
        waiter = self._pending.pop(echo, None) if echo else None
        if waiter is not None:
            waiter.put(frame)
            return

        if frame.get('post_type') == 'meta_event':
            self_id = frame.get('self_id')
            if self_id:
                self.self_id = str(self_id)
            # 心跳/生命周期只用来更新 self_id，其余交给超时机制判死活。
            return

        if 'post_type' in frame:
            # 事件进队列，由处理线程消费 —— **绝不在这里直接跑 on_event**，
            # 那会把收帧线程卡在动作等待上（见模块注释的死锁复盘）。
            self._events.put(frame)

    # ---- 动作调用 -------------------------------------------------------

    def call_action(self, action, params, timeout=ACTION_TIMEOUT_SECONDS):
        """发一个动作帧并等它的响应帧。失败抛 OneBotError，成功返回 data 字段。"""
        if self._ws is None:
            raise OneBotError('连接还没建立（或已经断开），动作 %s 发不出去' % action)
        echo = uuid.uuid4().hex
        waiter = queue.Queue(maxsize=1)
        self._pending[echo] = waiter
        frame = json.dumps({'action': action, 'params': params, 'echo': echo})
        try:
            with self._send_lock:
                try:
                    self._ws.send(frame)
                except (OSError, websocket.WebSocketException) as exc:
                    raise OneBotError('动作 %s 发送失败：%s' % (action, exc)) from exc
            try:
                resp = waiter.get(timeout=timeout)
            except queue.Empty:
                raise OneBotError('动作 %s 在 %s 秒内没有得到响应'
                                  % (action, timeout)) from None
        finally:
            self._pending.pop(echo, None)  # 超时路径的清扫（正常路径已 pop 过）

        if resp.get('status') != 'ok':
            raise OneBotError('动作 %s 失败：%s（retcode=%s）'
                              % (action, resp.get('wording') or resp.get('status'),
                                 resp.get('retcode')))
        return resp.get('data')

    def send_private_msg(self, user_id, text):
        """发私聊消息。**绝不用 send_msg / send_group_msg** ——
        那两个会碰群聊，而单号、绑定码这类内容出现在群里就是泄露
        （大纲第 0 节把「不做群聊」列为硬边界）。"""
        return self.call_action('send_private_msg',
                                {'user_id': int(user_id), 'message': text})

    def send_private_image(self, user_id, path):
        """发一张私聊图片（本地文件路径）。

        用段数组 + `file` 给本地路径：图就在本机（服务端渲染好、printbot 存盘），
        让框架自己去读，比塞 base64 省事、也省掉 33% 的体积。
        前提是框架允许本地文件转 URL —— LLBot 那份配置里的 `enableLocalFile2Url`
        就是干这个的（见 `LLBot-CLI-win-x64-v8/bin/llbot/data/config_<QQ>.json`）。
        """
        return self.call_action('send_private_msg', {
            'user_id': int(user_id),
            'message': [{'type': 'image', 'data': {'file': str(path)}}],
        })
