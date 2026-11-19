# 交接书 —— 打印服务（给下一个接手的人）

> 写于 2026-11-01，对应 `main = 3df2428`，数据库 `SCHEMA_VERSION = '27'`。
> 这份是**上手手册**：怎么跑、怎么验、哪里没测试、哪里有坑。
> 长期约定与代码风格在 `AGENTS.md` —— **它不入库**（项目规定 `*.md` 默认不提交），
> 所以 clone 下来看不到，得找上一任要一份原始文件。它很长，但值得从头读一遍。
> 部署步骤在 `memoryandtest/docs/交接-服务器部署-v25-*.md`。
> 三者分工：`AGENTS.md` 管「为什么这么写」，这份管「你明天上班第一步做什么」。

---

## 0. 三十秒版本

学生上传文件下单 → 管理员接单、计费、打印 → 学生凭单号取件。
一个 Flask 单进程（waitress 8 线程）+ SQLite，前端 Vue 3 打包进 `static/app/`，
QQ 机器人在 `printbot/`（**独立进程、独立机器、只走 HTTP**）。

三层角色：`user`（学生）/ `admin`（打印员、柜台）/ `super`（超管）。
状态机：`待计费 → 待打印 → 打印中 → 可取件 ⇄ 未取件 → 已取件`。

---

## 1. 跑起来

### 1.1 后端（本机开发）

```bash
.venv/Scripts/python.exe -m pip install -r requirements.txt   # 首次
python app.py            # 必须在项目根目录：扁平布局 + 裸名 import
```

打开 <http://127.0.0.1:8080>。`.env` 不在仓库里，照 `.env.example` 抄一份。

### 1.2 前端（只有改界面才需要）

```bash
cd frontend
npm install
npm run dev        # :5173，已把 /api 反代到 :8080；后端要另外跑着
npm run build      # vue-tsc + 打包进 ../static/app（产物**要提交**）
```

产物文件名带内容 hash，改一个源文件会连锁改一批。**用 `git add -A static/app`
让索引和目录对齐，别只挑几个提交** —— 少一个 chunk 就是线上白屏。

### 1.3 QQ 机器人

```bash
python -m printbot.bot     # 在其父目录运行；自己的 .env（SITE_URL / API_BASE / BOT_TOKEN）
```

它**不 import 项目任何模块**，整个目录要能单独拷到跑 QQ 的那台机器上。

### 1.4 测试实例（跑 HTTP 级回归用）

```bash
.venv/Scripts/python.exe memoryandtest/tools/run_test_server.py   # 起在 :8091，临时库
```

它每次都**重建**临时库 —— 这是故意的（回归脚本不幂等）。

---

## 2. 怎么验（这一节最重要）

### 2.1 两批脚本，用法不同

| 批次 | 需要 8091？ | 跑法 |
|---|---|---|
| 进程内（16 个） | 不需要 | `.venv/Scripts/python.exe memoryandtest/tests/<name>.py` |
| 服务器端（8 个） | **每个脚本配一台新实例** | 先起 `run_test_server.py`，再跑脚本 |

服务器端那 8 个：`smoke.py`、`test_settings.py`、`test_orders_tools.py`、
`test_pickup_notify.py`、`check_chunked.py`、`test_password_reset_http.py`、
`test_batch_single_code_http.py`、`test_printbot.py`（只有它的 [B] 段要服务器）。

> **每个脚本必须配一台干净的实例**。它们会造数据，上一轮的残留会让下一轮假失败 ——
> 看起来像「功能坏了」，其实只是脏库。我踩过一次，查了半小时。

### 2.2 每个脚本管什么（按改动挑着跑）

| 脚本 | 覆盖 | 什么时候必须跑 |
|---|---|---|
| `smoke.py` | 端到端主流程 + 权限边界（320 项，最大的那张网） | 任何后端改动 |
| `test_pricing.py` | 计费全流程 + 看板字段 + CSRF 自愈 | 钱相关 |
| `test_pages.py` | 页数解析（PDF / docx / doc / RTF / 图片 / 别名后缀） | 动 `pricing.count_pages` |
| `test_auto_price.py` | 自动估价落库与展示 | 动 `est_price` |
| `test_estimate.py` | 先上传后下单（`.pending` → token → 建单） | 动 `routes/estimate.py` |
| `test_batch.py` + `test_batch_single_code_http.py` | 一单多文件、逐份参数、单号唯一 | 动批量 |
| `test_printbot.py` | 机器人全部状态机与话术（180 项） | 动 `printbot/` |
| `test_bot_nlu.py` | 一句话解析（颜色/份数/双面/纸张/序号/否定） | 动 `nlu.py` |
| `test_bot_card.py` | 数据卡渲染与降级 | 动 `botcard.py` |
| `test_bot_features.py` | `/api/bot/*` 的身份与参数透传 | 动 bot 接口 |
| `check_old_db_upgrade.py` | **从 v13 的库一路升到当前版本** | **任何加列/建表** |
| `test_history.py` | 历史记录筛选（三种老留痕形状） | 动留痕 |
| `test_prefs.py` / `test_claim_alert.py` / `test_pickup_notify.py` | 偏好、两个提醒线程 | 动它们 |
| `test_archive.py` | 未取件自动归档 | 动 `archiver.py` |
| `test_data_dir.py` / `test_roster_schema.py` / `test_bot_auth.py` | 数据目录、名单库、bot 令牌闸门 | 动这些 |

> 这些脚本**被 gitignore**（在 `memoryandtest/tests/`）。clone 下来没有它们 ——
> 向上一个接手的人要，或者照 AGENTS.md 的规矩重写：
> `tempfile.mkdtemp()` + 在 `import config` **之前**设好 `DATA_DIR` /
> `DATABASE_PATH` / `ROSTER_DB_PATH` / `UPLOAD_FOLDER` 四个环境变量，漏一个就会摸到真实库。

### 2.3 断言跟着契约走

失败先分清是**功能坏了**还是**契约变了**。这轮我改了两条契约，一批断言跟着改：

- 建单响应的 `duplex` 从「组级 options」改成「落库值」→ 旧断言里那个 `'single'` 不再成立；
- 单双面变成必答项 → 所有「发文件 → 回好 → 下单」的用例都要补一句「单面」。

**别把契约变更当成 bug 去改代码**，也别为了让测试过而放宽断言（那等于删掉保险）。

### 2.4 前端没有单元测试

只有 `npm run typecheck`（vue-tsc）。界面问题靠**真机/真浏览器**看：
headless Edge + CDP（`--remote-debugging-port`）+ `Runtime.evaluate` 点按钮、
读 `getBoundingClientRect()`、`Page.captureScreenshot` 截图。
这轮靠它抓到「移动端下拉菜单比屏幕还宽」（430px 下菜单 28→392 才算过）。

**不报错、只是不对劲**的问题，只能这么抓。

---

## 3. 代码地图

```
config.py      叶子：常量 / 状态枚举 / 角色 / 正则 / logger。不 import 本项目任何模块
security.py   密码哈希 + Fernet（可解密查看，仅超管）
utils.py      文件签名校验、parse_copies、parse_price、路径校验
identity.py   唯一能碰名单库的地方（注册闸门 GATE_*）
db.py         建库 + 迁移（SCHEMA_VERSION 只是标记，迁移要自己写）
auth.py       login_required / roles_required
pricing.py    页数解析 + 计价公式（**唯一一份**，网页/机器人/试算都走它）
archiver.py   未取件自动归档线程
notifier.py / pickup_notifier.py   未接单提醒 / 取件提醒
printer.py    打印机 IPP 客户端（自写协议，不装驱动、不起外部命令）
printer_worker.py  每台机器一条串行队列 + 一个消费者线程
botcard.py    数据卡（Pillow 画，服务端渲染）
routes/*.py   全部按功能域分 Blueprint，在 routes/__init__.py 的 BLUEPRINTS 注册
app.py        钩子顺序：identify_bot_request → csrf_protect → load_current_user
printbot/     独立包：bot.py（状态机）/ nlu.py（解析）/ llm.py（兜底）/ api.py
```

### 三条不能破的约束

1. **根目录那十几个 `.py` 搬不动**（扁平布局 + 裸名 import）。
2. **`pricing.py` 是公式的唯一来源**；前端不许镜像公式（镜像必然漂移，漂了不报错）。
3. **`est_price` 永远不是价格**。最终金额只能由管理员填进 `price`。

---

## 4. 这一轮（v24 → v27）改了什么

按时间顺序，都是我亲手改并验过的：

| 提交 | 内容 | 记住这一点 |
|---|---|---|
| `3ca3f93` | 说了「双面」却被静默打成单面 → 改成报错并给可选档 | 静默改参数比报错糟 |
| `5938bb7` | 订单台多文件改行内展开 | 纯前端 |
| `2264fb6` | 注册页点了没反应（红字重叠）+ 加站长 QQ | 校验规则一个字段只能有一条 |
| `2ef19e9` | **新增状态「未取件」**（可取件满 7 天自动归档，红色） | 见 5.1 |
| `1e0816b` | 机器人同一条消息重投 → 同一份被下两份；`.doc` 不计费 | 见 5.2 |
| `421a1fe` | 双面回执 / 移动端下拉 / **改参数** / 下载放开 | 见 5.3 |
| `3df2428` | **单双面改成必答项** + `nlu` 的「都X」归属修复 | 见 5.4 |
| 远端 `fcb1190..cfb0d4a` | 打印机联动（v26/v27）、暗色删除、动效 | 见第 6 节：**没有测试** |

### 5.1 未取件（v25）

`orders.ready_at` 记住「什么时候变成可取件的」，`archiver.py` 每 30 分钟扫一轮，
满 `ARCHIVE_AFTER_DAYS=7` 天转「未取件」，**写留痕**。未取件的单仍是「可取件」语气 ——
**凭单号照样能取件**（`api_confirm_pickup` 的 WHERE 里带着它），这是设计前提。

### 5.2 两个「不计费/重复计」的真凶

- **同一份文件被下成两份**：不是解析错，是 OneBot 把同一条消息**投递了两次**，
  而 `_pending` 是累积的。修法：`handle_event` 按 `message_id` 去重（有界 400 条）。
  **不要**按「文件名 + 内容」去重 —— 学生真可能先后发两次同一份。
- **`.doc` 没有预估价**：最常见的原因不是 Word 97 解析失败，而是那个文件
  **其实是 docx 改名 / RTF**。现在先认魔术字节再解析；摘要信息缺失时退回字数估算
  （偏低，但不再「没有数」）。

### 5.3 改参数与下载

- `PUT /api/order/<id>/params`：任何管理员、逐份改档位/份数/单双面，
  没传的字段**保持原值**（不是整体替换），重算 `est_price`，写 `ORDER_LOG_EDIT` 留痕。
  **已取件的单拒绝**。
- 下载不再限「接单人」，任何管理员都能下；学生仍然不能（纸在店里，他不需要原件）。

### 5.4 单双面必答（最新一条契约）

学生必须说「单面」或「双面」才能下单，机器人**不再默认单面**：

- 判据在 `_unspecified`：没说 duplex 的文件仍算「没说完」，回「好」也不会被
  `_fill_defaults` 标成已表态；
- 只有一种可选时（档位不支持双面）不问 —— 只有一个答案的问题不该问；
- 偏好里的 `default_duplex` 不再自动生效，只在追问时提示一句；
- 预设单也要问，它的要求挂在 `entry['raw']` 上（`targets=[entry]` 那个分支）。

顺带修了 `nlu`：「1黑白 2彩色 **都双面**」里的「都双面」原本被算成第 3 份自己的要求，
`都` 被吃掉一半、还不报错（`_split_global_tail`）。

---

## 6. 数据与迁移（踩过四次同一类坑）

`db.SCHEMA_VERSION` **只是一个标记**，改它什么都不做。真正的迁移是：

1. `schema_meta.schema_version` 缺失 → 老库走「DROP TABLE orders 重建」那条老路；
2. 加列必须自己写幂等的 `PRAGMA table_info` + `ALTER TABLE`。

**四次同类型的坑，方向不同，判据相同**：

| 版本 | 坑 |
|---|---|
| v12 | 索引建在补列之前 → 老库 `no such column`，服务起不来 |
| v16 | `ALTER` 写在 `CREATE TABLE` 之前 |
| v19/v21/v22 | 补列区在**建表之前**（全新库 `no such table`） |
| v23/v25 | 回填数据的迁移要单独测（`_migrate_ready_at`） |

**改表必须先跑 `check_old_db_upgrade.py`**：它造一个 **v13** 形状的库，
一路升到当前版本，专门走「老库」那条路。所有其他回归跑的都是全新库，**发现不了这类问题**。

> v26（打印机三列）/ v27（`printers` + `print_jobs` 两张新表）的迁移代码会被这条链
> **执行到**，但脚本里**没有针对这两张新表的断言** —— 见下一节，这是我留给你的活。

---

## 7. 没有自动化覆盖的地方（诚实清单）

按风险排序。这些地方出问题**不会报错**，只会「行为不对」：

1. **打印机联动（v26/v27）整个模块零断言**：`printer.py`（IPP 协议）、
   `printer_worker.py`（队列与线程）、`routes/printers.py`（CRUD / probe / status）。
   连「v27 迁移后两张新表建对了没有」都没断言。**这是当前最大的空洞。**
   建议第一件事：给 `check_old_db_upgrade.py` 补 v26/v27 断言（列 + 两表 + 索引），
   再写一个 `test_printer_queue.py`（用假 socket，别连真机）。
2. **前端**：只有类型检查。三处历史 bug（窄屏 Naive UI 的 slot 报错、品牌 logo
   跳错端、后台标签页轮询空转）都是真点出来的。
3. **机器人真机链路**：`test_printbot.py` 用假 client 跑状态机，
   OneBot 那一层的重复投递、超时、断线重连只有真机才碰得到。
4. **数据卡**：`botcard.py` 的两个工具（`render_cards.py` 出图并带 400px 缩略图、
   `check_card_pixels.py` 量六个像素指标）**是验收环节，不是可选步骤**。
   卡片的问题不报错，只是难看/看不清。
5. **取件提醒 / 未接单提醒**的线程行为（并发、凭证占用）只覆盖了函数层。

---

## 8. 开发环境的坑

- **两个实例抢同一个端口**：Flask 设 `SO_REUSEADDR`，第二个进程也能 `LISTEN` 成功，
  但连接全给先绑的那个 → 「重启了、日志正常、接口还是旧行为」。
  用 `netstat -ano | findstr :8080` 看是不是两个 PID；杀父带子
  （`.venv\Scripts\python.exe` 是包装器，`taskkill /PID <父> /T /F`）。
- **本机代理**：访问 GitHub 要走 `http://127.0.0.1:7888`（XiyouYun 的混合端口）
  或 7898（mihomo）。它会抖（TLS 握手失败），脚本里要「先测 200 再推」，
  失败就重启 `I:\aicodeworkarea\tools\proxy.ps1`。git 用法：
  `git -c http.proxy=http://127.0.0.1:7888 push`。
- **中文路径与控制字符**：用脚本改文件时，`\b` `\f` `\a` 会被解释成控制字符
  （曾经把 Windows 路径写坏，文件看着正常、grep 搜不到）。用 Edit 工具改，或写 `r'...'`。
- **控制台编码**：跑 Python 前设 `PYTHONIOENCODING=utf-8`，否则中文断言输出变乱码。
- **测试实例密码**：超管账号与密码在 `run_test_server.py` 里设，别去猜生产那套。
- **前端产物**：`static/app/` 是刻意入库的，部署机不需要 Node。改完前端必须 build 并提交。

---

## 9. 待办（按我判断的顺序）

1. **补 v26/v27 的迁移断言 + 打印机队列测试**（见 7.1）。
2. **`memoryandtest/` 的测试脚本要不要入库**：现在它们被 gitignore，
   换一个 agent 就全没了。至少把这份清单和重建规矩留在库里（本文就是尝试）。
3. `pricing.count_pages` 对 **`.doc` 的图表类文档**仍然偏低（字数估算法在
   199 字/页的文档上会把 5 页算成 1 页）。要准就得解析 piece table（CLX），成本较高；
   现状是「宁可偏低，也不高估」，管理员计费时本来就要打开文件确认。
4. 机器人话术里「要按 … 下单吗」那句仍用「什么都不说时的默认档」，
   当一批里部分文件已经表过态时念的不是他说的那套（老问题，不影响下单)。
5. 前端没有测试，值得先补一两个 E2E（Playwright）把登录 → 下单 → 取件串起来。

---

## 10. 边界

- 不要 `git clean -fdx`：`data/` 是 gitignore，里面是**真实**的库、上传件、收款码。
- 不要 `git branch -D` 硬删未合并分支（本机有安全网会拦，别绕过它）。
- 不要把密钥、明文密码、完整文件路径写进日志（项目有硬约定，见 AGENTS.md）。
- 部署、重启、迁移的步骤在 `memoryandtest/docs/交接-服务器部署-v25-2026-10-25.md`；
  注意那之后又进了 v26/v27（打印机），**部署前先看第 6 节**。

---

## 11. 一句话建议

这个仓库的注释写得很细，**先读注释再读代码**：几乎每个奇怪的分支旁边都写着
「为什么这么写、不这么写会怎样」，那些都是踩出来的。改动之前先 grep 所有消费方 ——
这里最贵的 bug 不是报错的，是**不报错但行为不对**的那种。
