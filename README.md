# 宿舍自助打印平台

学生自助上传文件下单、系统自动统计页数并计价、店主按队列打印、学生凭取件码取件。

## 技术栈

| 层 | 选型 |
|---|---|
| 后端 | Flask 3.1.3（单文件 `app.py`） |
| 数据库 | SQLite（标准库 `sqlite3`，同步） |
| WSGI 服务器 | waitress 3.0.2 |
| 页数统计 | pypdf 6.18.1 |
| 前端 | 单页 HTML + 原生 JS，无构建步骤 |

Python 3.9+（开发环境为 3.13）。

## 快速开始

```bash
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # Windows
# source .venv/bin/activate && pip install -r requirements.txt   # Linux/macOS

cp .env.example .env    # 按需修改
python app.py
```

默认监听 `0.0.0.0:8080`，浏览器打开 `http://localhost:8080`。

部署、备份、反向代理等事项见 [DEPLOY.md](DEPLOY.md)。

## 目录结构

```
app.py                  后端全部逻辑（路由、鉴权、计价、数据库）
converter.py            页数统计
templates/index.html    单页前端（学生上传 / 学生查单 / 店主管理 三张卡片）
requirements.txt        运行依赖
.env.example            配置项示例（复制成 .env 使用）
DEPLOY.md               部署说明
```

## 架构

```
                    ┌─────────────────────────────┐
   学生浏览器 ──────▶│  Flask (app.py)             │
                    │  ├ /upload   上传 + 页数 + 计价│
                    │  ├ /my-orders 凭码查单        │
                    │  └ /orders   订单管理         │
                    └──────┬──────────────┬───────┘
                           │              │
                    ┌──────▼─────┐  ┌─────▼──────┐
                    │ SQLite     │  │ 上传目录    │
                    │ 订单元数据  │  │ uuid 文件名 │
                    └────────────┘  └────────────┘
                           ▲
   店主浏览器 ─────────────┘  /orders · /order/<id>/file · /order/<id>/paid
```

上传的文件以 `<uuid>.<ext>` 存入 `UPLOAD_FOLDER`，原始文件名保存在数据库
`orders.filename` 里。店主通过 `/order/<id>/file` 取文件，该接口会把
原始文件名作为下载名返回。

**打印环节不在本系统内**：店主从后台下载/预览文件后，在本地用打印机驱动打印。

## 数据模型

### orders 表

| 列 | 类型 | 说明 |
|---|---|---|
| `id` | INTEGER PK | 自增主键 |
| `filename` | TEXT NOT NULL | 原始文件名（含中文），下载时作为文件名返回 |
| `file_path` | TEXT NOT NULL | 磁盘路径，形如 `<UPLOAD_FOLDER>/<uuid>.<ext>` |
| `color_type` | TEXT | `black` / `color` |
| `duplex` | TEXT | `single` / `double` |
| `status` | TEXT | 见下方状态机，默认 `待打印` |
| `pickup_code` | TEXT | 取件码，有唯一索引 |
| `create_time` | TIMESTAMP | 下单时间（UTC，展示时转本地时区） |
| `update_time` | TIMESTAMP | 最后修改时间 |
| `page_count` | INTEGER | 单份页数；`NULL` = 待定 |
| `copies` | INTEGER | 份数，默认 1 |
| `amount_cents` | INTEGER | 应付金额，单位**分**；`NULL` = 待定 |
| `paid` | INTEGER | 收款标记 0/1，默认 0 |
| `sheet_count` | — | **非数据库列**，由 `page_count`/`duplex`/`copies` 计算得出 |

### 订单状态机

```
待打印 ──▶ 打印中 ──▶ 可取了 ──▶ 已取件
```

四种状态可任意互转（误点可撤回）。`paid`（收款标记）独立于状态机，可反复切换。

处于 `待打印` / `打印中` 的订单会计入队列位次 `queue_no`；其余状态 `queue_no` 为 `NULL`。

### 迁移机制

`init_database()` 采用「检查 `PRAGMA table_info`，缺列则 `ALTER TABLE ADD COLUMN`」的补列模式，
新库走 `CREATE TABLE`、老库自动补齐。模块加载时即执行，waitress 部署下同样生效。

## 计价

```
amount_cents = max(page_count × copies × unit_price_cents(color, duplex), MIN_CHARGE_CENTS)
```

金额以**整数分**存储并落库快照。修改 `.env` 单价只影响之后的新订单，已下单订单的金额不变。

按「**面**」（一页纸的一面）计价。想按「张」报价，把双面单价设成「每张价 ÷ 2」即可
（整数分下需为偶数：0.16 可以，0.15 会落到 0.16）。

| 配置项 | 默认值 | 含义 |
|---|---|---|
| `PRICE_BLACK_SINGLE_CENTS` | 10 | 黑白单面，分/页 |
| `PRICE_BLACK_DOUBLE_CENTS` | 8 | 黑白双面，分/面 |
| `PRICE_COLOR_SINGLE_CENTS` | 100 | 彩色单面，分/页 |
| `PRICE_COLOR_DOUBLE_CENTS` | 75 | 彩色双面，分/面 |
| `MIN_CHARGE_CENTS` | 0 | 最低消费，0 = 不启用 |
| `MAX_COPIES` | 50 | 单笔最多份数 |

`page_count` 为 `NULL` 时 `amount_cents` 也为 `NULL`，前端显示「待定」。

相关函数：`unit_price_cents()` / `calc_amount_cents()` / `sheet_count()` / `format_cents()`（`app.py`）。

## 页数统计

`converter.py` 的 `count_pages(file_path, ext)` 返回单份页数，无法确定时返回 `None`：

| 输入 | 结果 |
|---|---|
| `.jpg` / `.jpeg` / `.png` | 1 |
| `.pdf` | 实际页数（空密码加密的会尝试解密） |
| `.pdf` 损坏 / 解不开 | `None`（记 warning 日志） |
| `.pdf` 页数为 0 | `None` |
| `.doc` / `.docx` | `None`（当前不支持转换） |

该函数不抛异常，最差返回 `None`，不会导致下单失败。pypdf 采用软导入，
未安装时降级为「页数未知」并打 warning。

## API 参考

所有接口返回 JSON，`code` 为 0 表示成功。

### 公开接口

#### `GET /hello`

存活检查，返回纯文本「打印服务已启动！」。

#### `GET /`

返回前端页面。

#### `POST /upload`

`multipart/form-data`。上传文件并创建订单。

| 字段 | 必填 | 说明 |
|---|---|---|
| `file` | 是 | 文件，扩展名须在 `ALLOWED_EXTENSIONS` 内 |
| `color` | 否 | `black`（默认）/ `color` |
| `duplex` | 否 | `single`（默认）/ `double` |
| `copies` | 否 | 份数，默认 1，超出 `MAX_COPIES` 会被截断，非法值回退为 1 |

成功返回：

```json
{
  "code": 0,
  "msg": "上传成功！7 页 × 1 份，应付 ¥0.70",
  "order_id": 1,
  "pickup_code": "9332",
  "page_count": 7,
  "page_count_known": true,
  "copies": 1,
  "sheet_count": 7,
  "amount_cents": 70,
  "amount_text": "0.70",
  "unit_price_cents": 10,
  "color_type": "black",
  "duplex": "single"
}
```

页数无法统计时 `page_count` / `amount_cents` / `sheet_count` 为 `null`、
`page_count_known` 为 `false`，`msg` 会提示需店主确认。

错误：`400` 缺文件或扩展名不在白名单；`413` 超过 `MAX_UPLOAD_MB`；`500` 写库失败。

#### `GET /my-orders?code=<取件码>`

学生凭取件码查询自己的订单。取件码不区分大小写。

```json
{
  "code": 0,
  "orders": [
    {
      "id": 1, "filename": "实验报告.pdf",
      "color_type": "black", "duplex": "single", "status": "可取了",
      "page_count": 7, "copies": 1, "sheet_count": 7,
      "amount_cents": 70, "amount_text": "0.70", "paid": 0,
      "create_time": "2026-09-12 13:32:41"
    }
  ]
}
```

错误：`400` 未提供取件码；`429` 触发限流（见「安全措施」）。

#### `GET /price-table`

返回价目表，供前端渲染价格提示。

```json
{
  "code": 0, "unit": "cents_per_side", "max_copies": 50, "min_charge_cents": 0,
  "prices": {"black_single": 10, "black_double": 8, "color_single": 100, "color_double": 75}
}
```

### 需管理口令的接口

以下接口在 `ADMIN_TOKEN` 非空时校验口令，口令通过以下任一方式提供：

- 请求头 `X-Admin-Token: <口令>`
- 查询参数 `?token=<口令>`（供浏览器直接打开链接使用）

口令为空时不做校验。校验失败返回 `401`。

#### `GET /orders`

| 参数 | 默认 | 说明 |
|---|---|---|
| `page` | 1 | 页码 |
| `size` | 20 | 每页条数，上限 100 |
| `status` | 空 | 按状态筛选，需为合法状态值 |

按 `id DESC` 排序。订单对象包含 `queue_no`（队列位次，非队列状态为 `null`）
以及派生的 `sheet_count` / `amount_text`。

#### `PUT /order/<id>/status`

请求体 `{"status": "可取了"}`。状态须为四种合法值之一，否则 `400`；订单不存在返回 `404`。

#### `PUT /order/<id>/paid`

请求体 `{"paid": true}` 或 `{"paid": false}`。订单不存在返回 `404`。

#### `GET /order/<id>/file`

返回订单对应的文件。

| 参数 | 说明 |
|---|---|
| `download` | 传 `1` 时强制作为附件下载；否则 PDF/图片内联预览，其它类型强制下载 |

响应带 `Content-Disposition`，内联时 `filename*=UTF-8''...` 携带原始中文文件名。
支持 Range 请求（返回 `206`）。订单不存在、文件路径异常或文件已被删除均返回 `404`。

## 安全措施

| 措施 | 位置 |
|---|---|
| 上传文件名 uuid 化，避免路径穿越与重名覆盖 | `upload_file()` |
| 扩展名白名单 | `ALLOWED_EXTENSIONS` |
| 取文件只按 `order_id` 查库，不接受客户端路径；取 basename 重组并断言落在上传目录内 | `get_order_file()` |
| 先判文件存在再 `send_file`，避免 500 | `get_order_file()` |
| 响应带 `X-Content-Type-Options: nosniff` | `get_order_file()` |
| 管理口令用 `compare_digest` 恒定时间比较（两侧编码为 bytes） | `require_admin()` |
| 取件码唯一索引 + 撞码重试 | `init_database()` / `upload_file()` |
| `/my-orders` 失败计数滑动窗口限流 | `my_orders_throttled()` / `my_orders_record()` |
| 文件名控制字符清洗 | `clean_filename()` |
| 接口不返回服务器绝对路径 | `get_orders()` / `upload_file()` |
| 前端一律用 `textContent` 构造 DOM | `templates/index.html` |

### 限流参数

| 配置项 | 默认 | 说明 |
|---|---|---|
| `MY_ORDERS_MAX_FAILS` | 20 | 窗口内「查不到」的次数上限 |
| `MY_ORDERS_WINDOW_SECONDS` | 300 | 滑动窗口长度（秒） |

只对「查不到」计数，「查到」即清零该 IP 记录。**限流拦截发生在查库之前**：
一旦某 IP 触发限流，窗口内连正确取件码也查不了。宿舍楼共用 NAT 出口时，
一个人的高频失败会让同 IP 的其他人在窗口内同样被挡。更在意可用性可把
`PICKUP_CODE_LENGTH` 调到 6（组合空间扩大 100 倍）。

## 配置项

完整列表及注释见 [.env.example](.env.example)。已存在的系统环境变量优先于 `.env` 文件。

| 配置项 | 默认 | 说明 |
|---|---|---|
| `HOST` / `PORT` | `0.0.0.0` / `8080` | 监听地址 |
| `DEBUG` | `false` | 生产必须保持 false |
| `LOG_LEVEL` | `INFO` | 日志级别 |
| `THREADS` | 4 | waitress 工作线程数 |
| `UPLOAD_FOLDER` | `C:/print/print_files/` | 文件保存目录 |
| `DATABASE_PATH` | `print_service.db` | 数据库路径（相对路径以 `app.py` 所在目录为基准） |
| `MAX_UPLOAD_MB` | 50 | 单文件上限 |
| `ALLOWED_EXTENSIONS` | `pdf,jpg,jpeg,png,doc,docx` | 扩展名白名单 |
| `ADMIN_TOKEN` | 空 | 管理口令，空则不校验 |
| `PICKUP_CODE_LENGTH` | 4 | 取件码长度 |
| `CORS_ORIGINS` | 空 | 跨域白名单，逗号分隔 |

## 前端说明

`templates/index.html` 为单文件页面，含三张卡片：学生上传下单、学生凭码查单、店主订单管理。

管理口令存于 `sessionStorage`（键 `print_admin_token`），由 `apiFetch()` 自动附加到
请求头。文件预览/下载链接因需在浏览器直接打开，改用 `?token=` 查询参数传递。

主要函数：

| 函数 | 用途 |
|---|---|
| `apiFetch(url, options)` | 统一封装 fetch，自动带管理口令 |
| `td(text)` | 生成纯文本单元格，免疫 XSS |
| `tdNode(node)` | 生成含子元素的单元格 |
| `specText(order)` | 规格文本，如「黑白 · 双面 · 12 页 × 2 份」 |
| `payText(order)` | 金额与收款状态文本 |
| `loadPriceTable()` | 拉取价目表渲染价格提示 |
| `loadOrders()` | 加载店主订单列表 |
| `updateStatus()` / `togglePaid()` | 改状态 / 切收款标记 |

订单列表每 10 秒自动刷新，页面切到后台时跳过刷新（`document.hidden`），
切回前台时立即刷新一次。

## 本地开发与测试

开发时建议把存储指向项目内目录，避免污染默认的 `C:/print`：

```ini
# .env
UPLOAD_FOLDER=./print_files
DATABASE_PATH=./print_service.db
ADMIN_TOKEN=test123
```

手工验证页数统计可用 pypdf 造测试 PDF：

```python
from pypdf import PdfWriter
w = PdfWriter()
for _ in range(7):
    w.add_blank_page(width=595, height=842)   # A4
with open('7pages.pdf', 'wb') as f:
    w.write(f)
```

`head -c 200 7pages.pdf > bad.pdf` 可造出截断的坏 PDF，用于验证降级路径。
页数无法统计时应有 warning 日志，且上传仍返回 `200`。

## 已知限制

- **Word / PPT 不支持自动统计页数**。`.doc` / `.docx` 可上传，但页数与金额记为「待定」，
  需店主人工确认。
- **无文件清理机制**。已取件订单的文件会一直留在磁盘上，需人工清理。
- **一个订单只能上传一个文件**。多张照片需分多次下单，各自生成取件码。
- **双面翻转方向（长边/短边）未建模**。横向内容或试卷双面打印时背面方向可能不对，
  需店主在打印机驱动中自行设置。
- **店主列表单页最多 100 条**，界面会提示「仅显示最新 N 条」。
- **限流按 IP 计数**，共用 NAT 出口时存在相互影响（见「安全措施」）。

## 后续扩展点

- **接入 LibreOffice 转换**：扩展点在 `converter.py` 的 `count_pages()`。
  转换产物需入库，并注意 Windows 下 `subprocess` 需带 `CREATE_NO_WINDOW`。
- **多文件批量上传**：当前一个订单一个文件，多文件需共享取件码。
  若采用共享取件码，`pickup_code` 的唯一索引需改为复合索引。
- **文件自动清理**：建议按「已取件」且超过 N 天的条件清理，保留数据库行以便对账。
- **取件通知**：状态变为「可取了」时通知学生。
- **打印任务下发**：接入打印机（如经 IPP）。
