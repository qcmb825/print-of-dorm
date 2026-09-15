# AGENTS.md

宿舍打印服务：学生上传文件下单，管理员接单打印，学生凭取件码取件。中文单语言项目。

## 运行与验证

后端没有任何自动化测试（README 已列为已知不足），前端只有 `vue-tsc` 类型检查。改完靠手工跑一遍验证。

```bash
pip install -r requirements.txt          # 或 .venv/Scripts/python.exe -m pip install -r requirements.txt
python app.py                            # 从项目根目录运行，读同目录 .env
```

- 入口 `app.py`，`DEBUG=false` 时用 waitress（8 线程），`DEBUG=true` 时用 Flask 开发服务器（关掉 reloader，否则启动横幅和日志会重复两遍）。
- 必须在项目根目录启动：模块是扁平布局、按裸名导入（`from config import ...`），且 `.env` 里 `UPLOAD_FOLDER=./print_files` 是相对 CWD 解析的（见下）。
- 导入 `app.py` 就会建库、建内置超管、写启动日志——它不是纯函数式导入，测试/脚本里 import 会碰到真实数据库。
- **端口被占用时先查再说**：`netstat -ano | findstr :8080`。本机常留着一两个旧的 python 实例，
  它们会继续用**旧代码**响应请求，让人误以为改动没生效（`app.py` 里那段中文注释讲的就是这个）。

### 前端命令（改界面才需要，Node 20+）

```bash
cd frontend
npm install
npm run dev            # 开发服务器 :5173，已把 /api 反代到 :8080；后端要另外跑着
npm run build          # vue-tsc 类型检查 + 打包进 ../static/app/（产物入库）
npm run typecheck      # 只做类型检查
npm run build:only     # 跳过类型检查出包（应急用）
```

- **`vue-tsc` 依赖 TypeScript 5.x**。TS 7（原生重写版）不再暴露 `lib/tsc`，装上就直接报
  `ERR_PACKAGE_PATH_NOT_EXPORTED`，别顺手升级。
- 构建产物 `static/app/` 是**刻意提交进仓库**的，部署机上不需要 Node。改完前端必须重新 build 并提交产物。
  > 产物文件名带内容 hash，改**任何一个**源文件都会让一批文件名跟着变（共享 chunk 会连锁），
  > 于是 `git status` 里出现一堆「已暂存的删除 + 未跟踪的新文件」。用 `git add -A static/app`
  > 让索引和目录对齐，**千万别只挑几个提交** —— 少一个 chunk 就是线上白屏。

## 分层边界

依赖单向，改动时不要打破：

```
config.py     ← 叶子模块，只依赖标准库 + cryptography，不 import 本项目任何模块
  ↑ security.py / utils.py
  ↑ db.py（还依赖 security）/ auth.py（还依赖 security）
  ↑ routes/*.py（只依赖 config / security / auth / utils / db，绝不 import app.py）
  ↑ app.py（注册蓝图 + before/after_request 钩子 + 错误处理 + 启动）
```

- 新增接口：在 `routes/` 下按功能域写 Blueprint，然后加进 `routes/__init__.py` 的 `BLUEPRINTS`，不要直接往 `app.py` 挂路由。
- 配置常量一律放 `config.py`（含正则、状态枚举、角色枚举），路由只 import 使用。
- `app.py` 里 `before_request` **顺序即执行顺序**：`load_current_user` → `record_request_start` → `csrf_protect`。

## 后端约定

- **统一响应** `{'code': 0, 'msg': '中文提示', ...}`，非 0 即失败；HTTP 状态码同时要对（400/401/403/404/409/429/500）。给用户的 `msg` 要含糊、日志里要写清真实原因（`routes/account.py` 登录就是范例）。
- **响应字段名要前后一致**：同一个字段别一处叫 `count` 一处叫 `c`。前端类型是手写的，字段对不上时 TS 查不出来，
  而且往往不报错、只是**静默不渲染**。这个坑真踩过：`/api/admin/stats` 的 `top_orderers` / `top_claimers`
  SQL 别名一度是 `c`，而两套前端都按 `count` 取 —— 图表和排行榜就那么空着，控制台一个错都没有。现已统一成 `count`，
  `memoryandtest/smoke.py` 里加了断言把它钉住。
  改字段名前后都 grep 一遍消费方，而且**必须两套前端都 grep**（`templates/index.html` 和 `frontend/src/`）。
- **CSRF**：所有写方法（POST/PUT/PATCH/DELETE）必须带 `X-CSRF-Token`，与 `session['csrf']` 常数时间比对。令牌由 `/` 和 `/api/me` 下发，前端每次响应后轮换。
- **鉴权**：用 `auth.py` 的 `login_required` / `roles_required(ROLE_ADMIN, ROLE_SUPER)`；越权要在装饰器或路由里 `security_event(...)` 留痕。
- **权限收口在服务端**：敏感数据用 SQL/响应体过滤（见 `routes/admin.py` 里超管账号对管理员不可见），不要靠前端不渲染。
- **日志**：禁止 `print`。用 `config.py` 的 `logger`（业务）、`access_logger`（访问，`app.py` 自动记）、`security_logger`。可疑行为走 `security_event(event, detail)`，敏感管理动作走 `audit_action(action, detail)`。身份用 `client_ip()` / `actor_label()`。**绝不把密码、明文、完整文件路径写进日志**。
- **密码**：只能通过 `security.make_password_records()` 生成，它同时产出 `password_hash`（pbkdf2，登录校验）和 `password_enc`（Fernet，仅超管可解密查看）。校验用 `verify_password`。
- 注释、docstring、日志、UI 文案全用中文，且注释解释**为什么**（历史 bug、安全取舍），不是复述代码——照这个风格写。

## 数据库（SQLite）

- 标准库 `sqlite3`，无 ORM、无连接池。`db.get_db()` 返回 `Row` 工厂连接，**调用方负责 `close()`**，全仓统一 `try/finally` 写法。
- 时间戳：SQLite `CURRENT_TIMESTAMP` 是 UTC，凡是要展示的时间列一律 `datetime(col, 'localtime')`。
- **迁移机制是个坑**：`db.SCHEMA_VERSION` 只是写在 `schema_meta` 里的标记，改它不会做任何迁移。真正的迁移只有两条路——① `schema_meta.schema_version` 缺失时（全新库/旧库）会 `DROP TABLE orders` 重建；② 加列必须自己写幂等的 `PRAGMA table_info` + `ALTER TABLE`（照抄 `db.py` 里 `contact_type` / `contact` 那段）。改表结构前先备份数据库和上传目录。
- 上传：文件以 `uuid4().hex` 重命名后存进 `UPLOAD_FOLDER`，库里存绝对路径；下载时用 `Path(...).resolve()` 双重校验文件必须落在上传目录内（防路径穿越）。写库失败要回滚并删掉已落盘的文件。
- 状态字符串 `待打印/打印中/可取了/已取件`（`config.ORDER_STATUSES`）既是展示文案，**也是前后端共用的标识**：
  后端按它落库，前端按它取状态色（`src/utils/format.ts` 的 `STATUS_COLOR_VAR`）。不要单独翻译或重命名。

## 环境变量

- `.env` 由 `config.load_env_file()` 在 import 时读取，**已存在的系统环境变量优先**（`setdefault`）。`.env.example` 是完整模板，新增配置项要同步补进去。
- `SECRET_KEY` 缺失 → 每次重启随机生成，所有登录态失效；`PASSWORD_ENC_KEY` 缺失 → 超管查不了明文密码（日志报 error）。两者都必配。
- `UI_MODE`：`classic` / `vue` / `random`（默认）。**拼错的值不报错**，只会静默按 `random` 走，
  同时在启动日志里记一条 error —— 只认小写，粘错一个字母就等于没配。
- `UPLOAD_FOLDER` **不像 `DATABASE_PATH`/`LOG_DIR` 那样被转成绝对路径**，它按 CWD 解析。换目录启动会让老订单的文件路径全部失效。
- 启动前会用普通 socket 自检端口：Windows 上 `winerror=10013` 是"不允许使用该端口"（常由代理/VPN 占着），会按 `START_MAX_ATTEMPTS` 自动重试；自检故意不设 `SO_REUSEADDR`（否则测不出占用）。
- 多进程部署要注意：登录失败计数和 CSRF 之外的限流都在进程内存里（`security._login_failures`），多进程会失效。

## 前端（两套，共用同一套 `/api`）

同一个后端下挂着两套**互相独立**的前端外壳，发哪一套由 `app.py` 的 `_pick_ui()` 决定。
两者只是外壳不同，接口、鉴权、数据完全共用。

| | 经典版 `classic` | 新版 `vue` |
| :--- | :--- | :--- |
| 源码 | `templates/index.html`（单文件 Jinja 模板） | `frontend/src/`（Vue 3 + TS） |
| 产物 | 无，后端每次用 `render_template` 渲染 | `static/app/`（**已提交**，部署机不需要 Node） |
| 静态资源 | `static/img/` | `static/app/assets/` |
| 路由 | 没有 URL 路由，换页只重绘 DOM | history 路由，靠 `/<path:path>` 兜底 |
| 改它需要 | 直接改模板 | Node 20+，改完 `npm run build` 并提交产物 |

选择优先级**从高到低，顺序不能调**：

1. URL 参数 `?ui=classic` / `?ui=vue` —— 临时看另一套，也用来回答「是只有我这套坏了，还是两套都这样」；
   `?ui=random` 是反过来用：不留着现在这套，重新掷一次。
2. 环境变量 `UI_MODE`（`config.py`）—— 部署时全局定死。故意排在参数之后：定死了还能用参数临时切回来看。
3. 随机 —— 粒度是**每个浏览器会话一次**，不是每次请求。每次请求都重掷的话，用户点一下就从一套界面
   变成另一套，连按钮在哪都不认识了，那不是随机试用，是故障。

- **界面选择存在 `pod-ui` Cookie 里，刻意不用 Flask session**：登录/注册/登出都会 `session.clear()`
  防会话固定，放 session 里会被顺手清掉，用户刚登进去就莫名其妙换了一套。Cookie 不带 `Max-Age`，
  浏览器一关就忘 —— 正好等于「每个会话随机一次」。
- **切换必须整页跳转**（`location.assign('/?ui=…')`），不能走 vue-router：经典版是后端渲染的另一份代码，
  前端路由表里根本没有它，`router.push` 只会掉进 404 兜底页。两套都留了入口（经典版在顶栏 + 登录页，
  新版在用户菜单 + 登录页）—— **没登录时顶栏不存在，所以登录页那个不能省**。
- **经典版模板由 Jinja 渲染，不能当静态文件发**：里面有 `url_for('static', …)` 生成的资源路径。
  `_classic_page()` 走 `render_template`，顺带把 CSRF 令牌写进会话。
- **`DEBUG=false` 时 Jinja 不重载模板**（`auto_reload` 跟着 `app.debug` 走），改完 `templates/index.html`
  必须重启进程才看得到效果 —— 页面毫无变化时先想想这一条，别去查浏览器缓存。
- **下面这些约定对两套都适用**。只改一套时别忘了另一套，典型症状是「不报错、只是空着」。

### 新版界面（`frontend/`，Vue 3 + TypeScript）

单页应用：登录页、学生端、管理端都在一个包里，**按登录账号的角色切换界面**（路由守卫 + 两套布局）。
源码在 `frontend/src/`，产物在 `static/app/`。

- **页面入口与 history 路由**：`app.py` 的 `/` 按 `_pick_ui()` 发对应外壳，`/<path:path>` 对非 `/api`、
  非 `/favicon.ico` 的未知路径回**同一套**外壳（经典版没有路由也要它：它把路径当不存在，回入口页）。
  **这条兜底不能删** —— 删了用户刷新 `/my-orders`、`/staff/dashboard` 这类深层链接就会拿到 JSON 404。
- **设计令牌是唯一事实来源**：`src/styles/tokens.css` 里 `:root` 与 `.dark` 各一套，
  Tailwind 通过 `@theme inline` 映射成工具类（`bg-background`、`text-ink-3`…）。
  改颜色只改令牌，不要在组件里写死色值；视觉语言（黄+青、细边框、磨砂面板、方角主按钮）参考 maaend.com。
- **Naive UI 的主题也从令牌反读**：`src/theme/naive.ts` 运行时读 CSS 变量再拼 `themeOverrides`，
  所以 CSS 和组件库不会各说一套。图表同理（canvas 用不了 `var()`，所以令牌取出来的是 hex）。
- **`box-sizing: border-box` 必须自己声明**：为了不和 Naive UI 打架，`base.css` 刻意没引 Tailwind 的
  preflight，但 preflight 里的 `box-sizing` 不能一起丢 —— 少了它，`w-full` + 内边距的元素会比容器
  正好宽出一个内边距，窄屏下整页横向溢出（表现为手机上能左右晃）。
- **body 的字体/字号规则不能挪进 `@layer`**：Naive UI 会在运行时往 `<head>` 插一条**无层级**的
  `body{font-family:v-sans…;font-size:14px}`，而无层级样式一律赢过分层样式 —— `base.css` 里
  body 那条因此刻意写在 `@layer base` 外面，选择器用 `:root body`（同特异度下靠源码顺序是赌
  它的插入位置，哪天它改成 append 就反过来）。改回 `body` 或挪进 `@layer` **都不报错**，
  只是正文静默变回 v-sans / 14px，标题却正常 —— 装好的 DM Sans 等于白装。
  Naive 组件不自己设字体，是靠继承拿 body 的，所以这一条同时决定组件里的字体。
- **字体名写在 `tokens.css`，字体包在 `src/main.ts` 里导入**：`--stack-heading` / `--stack-body` /
  `--stack-mono` 里只有字体名，包没装或 import 漏了都不会报错，字只是静默回落到系统字体
  （Space Grotesk 和 DM Sans 就这么空转过一阵）。加字体时这两处都要动，并在浏览器里确认
  字体真的从 200 加载、`document.fonts.check()` 为真 —— 纯拉丁字库里没有中文，
  「没看到请求」有时只是因为页面上没有拉丁字形。
- **布局里 `main` 必须带 `min-w-0`**：flex 子项默认 `min-width:auto`，会被内部 min-content 顶宽。
- **所有请求只走 `src/api/client.ts`**：它负责挂 `X-CSRF-Token`、按响应轮换令牌、把错误归一成
  `ApiError`（带中文提示）。新增接口写进 `src/api/endpoints.ts`，DTO 类型写进 `src/api/types.ts`。
  > 后端 `/api/me` 在未登录时返回 401 是**正常启动路径**，不是错误。
- **权限判定只用来决定渲染，不当作安全边界**：真正的把关在后端（见 `routes/admin.py`）。
  界面上的角色分支用 `useAuthStore()` 的 `isStaff` / `isSuper`。
- **验证规则是后端的镜像**：`src/utils/validators.ts` 抄的是 `utils.validate_registration()` 和
  `config.py` 里的正则。改后端校验记得同步这里，但永远以后端为准。
- **静态直通资源放 `frontend/public/`**（目前只有 `favicon.svg`），Vite 会原样复制进 `static/app/`，
  文件名不带 hash。入口页里用根路径引用（`href="/favicon.svg"`），构建时会自动按 `base` 重写成 `/static/app/...`。
  > 图标这一条别删：缺了它浏览器每次整页加载都会请求 `/favicon.ico`，拿到 404 并被打成 **WARNING**
  > 记进访问日志 —— 4xx 的 WARNING 是留给参数错/未登录/越权的，不该被缺图标刷屏。
  > **经典版模板同样要声明**（不然随机到经典版的那一半用户照样刷日志）。它引的是同一份
  > `static/app/favicon.svg` —— 不另存一份，否则两个图标早晚各改各的。

- **公告字体键要与 `config.ANNOUNCE_FONTS` 对齐**，前端在 `api/types.ts` 的 `ANNOUNCE_FONTS` 里把键翻成 CSS；
  公告正文一律插值渲染，**绝不 `v-html`**（那是存储型 XSS 入口）。
  > **公告正文色不能直接上屏**：正文颜色由管理员选、纸面颜色由主题决定，两者会撞车。
  > 必须过 `theme/color.ts` 的 `readableInk()`（WCAG 对比度，大字放宽到 3:1），
  > 不够就回落到 `--paper-ink`。改回 `color: item.font_color` 会让深色主题下的公告看不见。
  > 公告管理页的预览要给深浅两套，否则管理员看不到自己在另一套主题里被换掉的颜色。
- **无障碍**：只用 `:focus-visible`（禁止裸 `:focus`）；弹窗与抽屉用 Naive 的 `NModal` / `NDrawer`，
  焦点陷阱和 Esc 关闭由组件库提供；新增动画必须在 `prefers-reduced-motion` 下退化。
- **动效只认令牌**：曲线与时长在 `tokens.css` 的 `--motion-*` 里，组件里不要写裸 `cubic-bezier` / 毫秒数；
  映射层已把 Tailwind 的 `ease-out` / `ease-in-out` 覆盖成强缓动（内置那两条太弱，入场会显得拖）。
  路由与页面切换统一走 `components/RouteTransition.vue`，别在各页自己加 `<Transition>`。
  > 减少动效**不等于**零动效：`base.css` 的全局兜底会把第三方动画时长压到最短，但 `.motion-stagger`
  > 这类错峰入场必须显式把 `animation-delay` 也归零 —— 只压 duration 的话，排在后面的项会在延迟里
  > 一直保持透明、最后一起闪出来，比不做还糟。
- **模板注释里不要写 ASCII 双引号（`"`），用「」**：注释如果落在**组件插槽内**，`vue-tsc` 会静默丢掉
  它后面整个模板区域的类型检查，报出来的是「import 未使用」，完全不会提到注释。踩过一次，很难查。
  > 普通元素里的注释带 ASCII 引号没问题，但既然这个坑只有插槽会踩、而且症状离现场很远，全仓统一成「」更省事。
  > **目前没有针对 `(pointer: coarse)` 放大触控目标** —— 旧前端有一版，重写时没带过来。
  > 组件尺寸走的是 Naive 默认高度（中号 38px）。要补的话得覆写 `heightMedium` / `heightLarge` 这类令牌，
  > 别只在个别按钮上改。
- 图表：`src/charts/`，ECharts **按需注册**（只有看板页会加载，别整包 import）；颜色按实体绑定，
  不要按筛选后的下标取色。
- 前端类型里没有 `declare module '*.vue'` 通配声明 —— 加了会把组件 props 全退化成 `any`，
  `vue-tsc` 就形同虚设。

## 动手前先读

- `README.md`：安全设计、配置项、日志系统、前端开发流程（第 6 节）、目录结构。
- `.gitattributes`：`static/app/** -text`（产物不做行尾规范化）+ `frontend/index.html`、
  `frontend/public/**` 锁 `eol=lf`（否则 `core.autocrlf=true` 的机器上产物行尾变 CRLF，
  每次 build 都显示「已修改」，两台机器还会互相覆盖回去）。动前端产物前先读这两段注释。
- 改动 `app.py` 的启动/钩子逻辑前，先读该文件里大段的中文注释，那里记录了端口自检和日志分级的实测结论。
- `.gitignore` 里有 `*.md`，但 `AGENTS.md` 自己开了白名单，所以本文件会被跟踪。
