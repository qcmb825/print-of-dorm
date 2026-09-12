# 部署说明

## 启动

```bash
python -m venv .venv
.venv/Scripts/pip install -r requirements.txt   # Windows
# source .venv/bin/activate && pip install -r requirements.txt   # Linux/macOS

cp .env.example .env    # 然后按需修改
python app.py
```

`python app.py` 默认用 **waitress**（生产级 WSGI 服务器），不是 Flask 自带的开发服务器。
监听地址由 `HOST` / `PORT` 决定，默认 `0.0.0.0:8080`。

**Windows 上要让局域网内同学访问**，首次运行会弹防火墙授权，勾选「专用网络」即可。
想确认监听是否正常：`curl http://127.0.0.1:8080/hello`，应返回「打印服务已启动！」。

## ⚠️ 千万不要开 DEBUG

`.env` 里的 `DEBUG=true` 只用于本地调试。**debug 模式 + 局域网可达 = Werkzeug 调试器
任意代码执行**，等于把整台机器交出去。生产环境务必保持 `DEBUG=false`。

## 配置

全部配置项及其含义见 `.env.example`，此处只强调几个容易踩的：

| 配置项 | 说明 |
|---|---|
| `ADMIN_TOKEN` | 留空则订单管理、取文件等接口**完全不校验**，仅限纯内网自用。对局域网开放务必设置 |
| `UPLOAD_FOLDER` | 默认 `C:/print/print_files/`。权限不足时启动会报错并提示，改到用户目录下即可 |
| `DATABASE_PATH` | 相对路径时以 `app.py` 所在目录为基准 |
| `*_PRICE_*_CENTS` | 单位是**分/面**。加 `_CENTS` 后缀就是为了让单位不可能被搞错 |
| `PICKUP_CODE_LENGTH` | 默认 4 位，能在电话里念清楚。更在意防枚举可设 6（空间扩大 100 倍） |

### 关于计价

按「**面**」（一页纸的一面）计价，不是按「张」。所以双面时一张纸算两面的钱，
只是双面单价通常设得低些（省纸）。

想按「张」报价，把双面单价设成「每张价 ÷ 2」即可，注意整数分下必须是偶数
（0.16 可以，0.15 会落到 0.16）。

金额在下单时**快照落库**：之后改单价只影响新订单，已下单学生看到的金额不变。
这是刻意的——否则会出现「上传时看到 ¥0.50、到店被收 ¥0.60」的纠纷。

## 📌 备份提醒

**文件和数据库分居两个目录**（默认是 `C:\print\print_files\` 和项目目录下的
`print_service.db`），备份时极易只备一个。

两者必须一起备份：库里存的是订单元数据，文件夹里才是学生实际要打印的内容。
只恢复数据库会得到一堆指向不存在文件的订单；只恢复文件则订单关系全丢。

## nginx 反代（可选）

如果以后在 waitress 前面挂 nginx，**必须**转发真实 IP：

```nginx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header X-Real-IP $remote_addr;
```

并在 `app.py` 里启用 werkzeug 的 `ProxyFix`。否则所有请求的 `remote_addr`
都会是 `127.0.0.1`——`/my-orders` 的防枚举限流会把全楼学生当成同一个 IP 一起挡住。

## 已知限制

- **Word/PPT 暂不支持自动统计页数**。上传统计的 .doc/.docx 会被标记为「页数待定」，
  需要店主人工确认后计价。接入 LibreOffice 后可自动转换，扩展点在 `converter.py`。
- **没有自动清理机制**。已取件订单的文件会一直留在磁盘上，需要人工清理。
- **一个订单只能传一个文件**。多张照片需要分多次下单。
- **双面翻转方向（长边/短边）未建模**。横向内容或试卷用双面打印时，
  背面方向可能不对，需要店主在打印机驱动里自行设置。
