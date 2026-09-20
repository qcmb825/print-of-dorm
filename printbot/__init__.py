"""printbot —— 宿舍打印服务的 QQ 机器人独立进程。

它不属于 Flask 那一层，本包**绝不 import 项目根的任何模块**（config / db / routes…）：
它将来部署在国内那台跑 QQ 客户端（LLBot / NapCat）的机器上，
与美国服务器之间只有一个 HTTPS 的距离。两边各自独立演化，
共享的只有 HTTP 协议（/api/bot/*）—— 这是 QQbot对接大纲.md 第 2 节定的三进程架构。

为什么必须是独立进程：Flask 用 waitress 单进程 8 线程，WebSocket 长连接
会**永久占住其中之一**，8 个在线用户就能把服务器占满 —— 这和当初否决
「用 SSE 给网页做实时回复」是同一个理由。

运行：在 printbot/ 的**父目录**执行 `python -m printbot.bot`；
依赖只有 websocket-client（见 printbot/requirements.txt）。
"""
