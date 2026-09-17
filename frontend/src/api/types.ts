/** 后端 DTO 类型 —— 与 Flask 各路由的响应一一对应。
 *  改动接口时先改这里，TS 会把所有受影响的调用点报出来。
 */

export type Role = 'user' | 'admin' | 'super'

/** 对外只有两种叫法。第三种的文案刻意与 admin 完全相同：
 *  给它单独起个名字，等于在界面上给那一行盖了个「这行不一样」的记号。
 *  后端出库前也会把角色名一起换掉（config.public_role_label），两边口径一致。 */
export const ROLE_LABELS: Record<Role, string> = {
  user: '普通用户',
  admin: '管理员',
  super: '管理员',
}

/** 订单状态。这五个字符串既是展示文案、也是前后端共用的标识：
 *  后端按它落库（config.ST_*），前端按它取颜色 —— 不要单独翻译或重命名。
 *  改这里记得同时改 utils/format.ts 的两张颜色表，否则新状态会取不到颜色，
 *  表现为标签没背景色而不是报错。 */
export type OrderStatus = '待计费' | '待打印' | '打印中' | '可取了' | '已取件'

export const ORDER_STATUSES: OrderStatus[] = ['待计费', '待打印', '打印中', '可取了', '已取件']

/** 管理员能手动切到的状态，比上面少一个「待计费」。
 *  待计费只能由计费动作产生（后端 POST /api/order/<id>/price）；
 *  允许切回去就造得出「已标了价却又退回待计费」的单，
 *  而前端会照旧把那个金额显示出来，没人看得出它其实还没被确认。 */
export const ORDER_STATUSES_MANUAL: OrderStatus[] = ['待打印', '打印中', '可取了', '已取件']

export type ColorType = 'black' | 'color'
export type Duplex = 'single' | 'double'

export const COLOR_LABELS: Record<ColorType, string> = { black: '黑白', color: '彩色' }
export const DUPLEX_LABELS: Record<Duplex, string> = { single: '单面', double: '双面' }

export type ContactType = 'wechat' | 'qq' | 'email'

export const CONTACT_LABELS: Record<ContactType, string> = {
  wechat: '微信号',
  qq: 'QQ 号',
  email: '邮箱地址',
}

/** 账号状态。三种都要写全：'closed' 是注销 ——
 *  界面上要拿它区分「临时停用」和「已经走的人」，只写前两种的话，
 *  列表里已注销的行会取不到分支，看起来和正常账号一样（而且不报错）。 */
export type AccountStatus = 'active' | 'disabled' | 'closed'

export const ACCOUNT_STATUS_LABELS: Record<AccountStatus, string> = {
  active: '启用',
  disabled: '已禁用',
  closed: '已注销',
}

/** 所有接口的外层信封；code === 0 才算成功。 */
export interface ApiEnvelope {
  code: number
  msg?: string
  csrf?: string
  /** 失败时的机器可读原因，只在少数「还有别的出路」的场景出现 ——
   *  目前有两个：CSRF 令牌过期（'csrf'）和注册需要人工审核（need_audit）。
   *  前端一律按字段分流，绝不比对 msg 里的中文：后端改一个字，
   *  自愈逻辑和审核入口就会静默消失，而且不报任何错。 */
  reason?: string
  /** 注册专用：学号不在名单上，走一遍人工审核就能注册。 */
  need_audit?: boolean
}

export interface User {
  id: number
  nickname: string
  real_name: string
  student_id: string
  dorm: string
  contact_type: ContactType | null
  contact: string | null
  role: Role
  role_label?: string
  status?: AccountStatus
  create_time?: string | null
  last_login?: string | null
  /** 这个账号要不要多给一个「高级视图」入口。
   *
   *  和 role 是两件事，别合并：role 已经收敛成 user / admin 两种，
   *  而「谁是默认管理员」这件事就靠这个布尔值传达 ——
   *  正是为了不在界面上留下第三种角色名，它才单独存在。
   *  它只决定**界面**给不给你入口，能不能调那些接口始终由服务端说了算。 */
  advanced?: boolean
  /** 有没有上传过微信收款码。
   *
   *  没上传只是「取件邮件里不带收款码图」，不影响开关 ——
   *  邮件文案会换成「请到取件点向管理员付款」，而不是发一封破图的信。 */
  has_pay_qr?: boolean
  /** 收款码的版本号（就是服务端的落盘文件名）。
   *
   *  它唯一的用途是给 <img> 当缓存标识：不带着它的话，管理员刚换完码，
   *  浏览器还在放旧图，他会以为上传没生效，然后反复上传。
   *  空串 = 没上传。别拿它去拼文件路径，它只在 /api/me/pay-qr?v= 这一个位置有用。 */
  pay_qr_version?: string
}

export interface MeResponse extends ApiEnvelope {
  csrf: string
  user: User | null
}

export interface Order {
  id: number
  filename: string
  color_type: ColorType | null
  duplex: Duplex | null
  remark: string | null
  status: OrderStatus
  pickup_code: string | null
  user_id: number | null
  claimed_by: number | null
  create_time: string | null
  update_time?: string | null
  claim_time?: string | null
  /** 管理员核定的费用（元）。null 表示还没计费 ——
   *  别把它当 0 处理：0 元是一张合法的、已经定过价的单，两者含义完全不同。 */
  price?: number | null
  priced_by?: number | null
  price_time?: string | null
  owner_nickname?: string | null
  owner_dorm?: string | null
  /** 下单人的联系方式，**仅管理端列表与详情返回**。
   *
   *  给管理员手动喊人用的：取件邮件发不出去的那一档（学生填的是微信号），
   *  订单台会标出来，光看昵称和宿舍是找不到人的。
   *  学生自己的 /api/my-orders 不会有这两个字段。 */
  owner_contact_type?: ContactType | null
  owner_contact?: string | null
  /** 这个下单人的联系方式**推不出邮箱**，取件邮件发不出去，只能人工喊。
   *
   *  由服务端算（用的就是发信那一路的判定函数），前端不镜像那套正则 ——
   *  镜像必然漂移，而且漂了不报错，只是界面上的标签开始说谎。
   *  界面上只在状态是「可取了」时才展示它：别的状态本来也没到发通知那一步。 */
  owner_mailbox_missing?: boolean
  claimer_nickname?: string | null
  /** 计费人昵称，仅管理端列表返回 */
  pricer_nickname?: string | null
  /** 仅管理端列表返回 */
  is_mine?: boolean
  /** 仅管理端列表返回：当前账号能否改这单的状态 */
  can_manage?: boolean

  /* ---- 打印选项与预设（快照，见文件顶部那段说明） ---- */

  /** 用的哪条预设。null = 这一单传的是文件，不是预设单。 */
  preset_id?: number | null
  /** 下单那一刻预设的原文。**判「是不是预设单」看这个字段，
   *  不要看 preset_id**：预设有被删掉的可能，那时 id 还在、内容也在，
   *  但一条更早的、预设已被删的订单……这两者本来就该一起出现，
   *  所以只判一个即可 —— 判 preset_content 更直接，它就是页面要显示的东西。 */
  preset_content?: string | null
  /** 份数。老订单（本次升级之前下的）是 null —— 后端**刻意不回填 1**：
   *  分不清「当时真的要 1 份」和「我们猜的 1 份」，猜错会写进对账。
   *  所以渲染时要区分 null（「未记录」）和具体的数字，不要 `?? 1`。 */
  copies?: number | null
  paper_type_id?: number | null
  /** 下单那一刻的纸张名。管理员随时能改名，所以订单显示的是这个快照，不是纸张表的现值。 */
  paper_name?: string | null
  paper_remark?: string | null
}

export interface OrderListResponse extends ApiEnvelope {
  total: number
  page: number
  size: number
  orders: Order[]
}

export interface MyOrdersResponse extends ApiEnvelope {
  orders: Order[]
}

/** 订单操作留痕的动作名，与后端 config.ORDER_LOG_* 一一对应。
 *
 *  中文名（action_label）由服务端给，这里只用它取颜色和图标 ——
 *  两边各存一份中文映射的话，改文案时必漏一处，而漏掉的那一处不报错，
 *  只是时间线上那一行没有颜色。
 *
 *  动作集合一旦增加，这里的联合类型和 format.ts 的 LOG_ACTION_COLOR 都要跟着加：
 *  TS 会帮忙把所有取色的地方报出来，所以别把它写成 string。 */
export type OrderLogAction =
  | 'create'
  | 'claim'
  | 'release'
  | 'price'
  | 'reprice'
  | 'status'
  | 'withdraw'
  | 'download'

/** 一条订单操作记录。actor_* 是**动作发生当时**的身份 ——
 *  事后拿 users.role 反推的话，历史记录会跟着账号现状一起变。 */
export interface OrderLog {
  id: number
  action: OrderLogAction
  action_label: string
  detail: string | null
  actor_id: number | null
  /** 已经过对外口径转换：这里只会是 user / admin，不会出现 super */
  actor_role: Role | null
  actor_role_label: string
  actor_nickname: string | null
  create_time: string | null
}

/** 订单详情。比列表多的是「这一单是谁下的、文件还在不在、经历过什么」。
 *  刻意没有 file_path —— 服务端只回文件大小，绝对路径不出库。 */
export interface OrderDetail {
  id: number
  filename: string
  color_type: ColorType | null
  duplex: Duplex | null
  remark: string | null
  status: OrderStatus
  pickup_code: string | null
  user_id: number | null
  owner_nickname: string | null
  owner_real_name: string | null
  owner_student_id: string | null
  owner_dorm: string | null
  /** 下单人的联系方式（含义同 Order 上那两个字段）。
   *  详情页也要给：管理员点进详情，多半就是为了联系这个学生，
   *  让他为了一个微信号再退回去翻列表，等于白点一次。 */
  owner_contact_type: ContactType | null
  owner_contact: string | null
  claimed_by: number | null
  claimer_nickname: string | null
  price: number | null
  priced_by: number | null
  pricer_nickname: string | null
  create_time: string | null
  update_time: string | null
  claim_time: string | null
  price_time: string | null
  /** 上传时的大小（字节）；文件已被清掉时是 null */
  file_size: number | null
  /** 文件还在不在磁盘上。false 时界面上要给个明确提示 ——
   *  「订单还在、文件没了」是运维要知道的事，不该只是一个失效的下载按钮。
   *  预设单没有文件，这里**也是 false**，但那是正常情况，不是丢文件：
   *  要区分的话看 filename / preset_content，别把预设单渲染成「文件丢了」。 */
  file_exists: boolean
  /** 用的哪条预设；null = 传文件的单 */
  preset_id: number | null
  /** 下单那一刻预设的原文 */
  preset_content: string | null
  /** 份数；老订单是 null（后端刻意不回填，见 Order.copies） */
  copies: number | null
  paper_type_id: number | null
  paper_name: string | null
  paper_remark: string | null
}

export interface OrderDetailResponse extends ApiEnvelope {
  order: OrderDetail
  logs: OrderLog[]
}

/* ---------------- 预设打印服务 与 纸张类型 ----------------
   两者都是「管理员维护、学生下单时选用」的选项，形态很像，但**用途完全不同**，
   不要合并成一张表：预设是一段说明（下单时它替代了整个文件），
   纸张是打印的物料（下单时它只是选项之一，文件照样要传）。

   订单会**抄一份快照**（preset_content / paper_name / paper_remark）进自己那一行。
   所以这里的 PrintPreset.content 是「预设现在长什么样」，而订单里的
   preset_content 是「下单那一刻长什么样」—— 两个字段不能互相代用。 */

export interface PrintPreset {
  id: number
  /** 预设的说明文字。预设刻意**没有名字**：一个描述就够了，
   *  再加一个名字，两处描述迟早会各说一套，而学生看到的是名字、打印员看到的是描述。 */
  content: string
  is_active?: number
  create_time?: string | null
  update_time?: string | null
  /** 创建人昵称，仅管理端列表返回 */
  author?: string | null
  /** 已经有多少单用过它。删之前要让人看见这个数字 ——
   *  预设被删了，历史订单里那份快照还在，但「当初是哪条预设」就断线了。 */
  used_count?: number
}

export interface PaperType {
  id: number
  /** 纸张名（如 A4、A3）。后端用 COLLATE NOCASE 存，A4 和 a4 视为同一个。 */
  name: string
  /** 给打印员看的一句话备注（克重、装订、放哪一格纸盒）。可以是 null ——
   *  为空时后端存的是 NULL 而不是空串，这里只要判一次。 */
  remark: string | null
  is_active?: number
  create_time?: string | null
  update_time?: string | null
  author?: string | null
  used_count?: number
}

export interface PrintOptionsResponse extends ApiEnvelope {
  /** 只回**启用的**预设与纸张。停用的那些留在管理端，
   *  学生端拿不到 —— 「没拿过」比「不画出来」可靠。 */
  presets: PrintPreset[]
  paper_types: PaperType[]
}

/** 管理端列表：比学生端多停用项，以及各自的用量。 */
export interface PrintPresetListResponse extends ApiEnvelope {
  presets: PrintPreset[]
}

export interface PaperTypeListResponse extends ApiEnvelope {
  paper_types: PaperType[]
}

/** 用预设下单的请求体。**没有文件字段** —— 后端发现请求里带文件会直接 400
 *  （见 routes/orders.py 的 api_create_preset_order），前端把上传框藏起来
 *  只是让人看不见，规矩立在服务端。 */
export interface PresetOrderRequest {
  preset_id: number
  copies: number
  paper_type_id: number | null
  color: ColorType
  duplex: Duplex
  remark: string
}

export interface UploadResponse extends ApiEnvelope {
  order_id: number
  pickup_code: string
}

/** 下单时选的打印选项，直传、分片、预设三条路共用。
 *
 *  copies 在这里是 number，但**提交前不要对它做算术** ——
 *  后端按字符串收、只认纯整数文本（utils.parse_copies）。
 *  份数是个位数到两位数的整数，没有精度问题；
 *  真正有精度问题的是金额，那个一律原样传字符串。 */
export interface UploadOptions {
  color: string
  duplex: string
  remark: string
  /** 份数。不传或传空由后端兜成 COPIES_DEFAULT（老客户端兼容）。 */
  copies?: number
  /** 选中的纸张类型 id；null / 不传表示不指定。 */
  paper_type_id?: number | null
}

/** 分片上传会话 —— 服务端只回必要信息，不含磁盘路径。 */
export interface ChunkSession extends ApiEnvelope {
  upload_id: string
  filename: string
  size: number
  chunk_size: number
  total_chunks: number
  /** 服务端已经收到的分片序号，续传时拿它跳过已传部分 */
  received: number[]
  received_count: number
  /** 距离这个会话被自动清理还剩多少秒 */
  expires_in: number
  /** init 时命中同一份未完成的会话（断点续传的入口） */
  resumed?: boolean
  /** 这一片之前已经收到过，本次被跳过 */
  skipped?: boolean
}

export interface ChunkPendingResponse extends ApiEnvelope {
  sessions: ChunkSession[]
  max_pending: number
}

export interface AdminUser extends User {
  status: AccountStatus
  order_count: number
  claimed_count: number
  /** 这一行是不是调用者自己。只用来决定哪些按钮不显示 ——
   *  真正拦住「改自己」的是接口里的判断，前端藏按钮只是免得人白点一次。 */
  is_self: boolean
  /** 只有默认管理员显式带 ?detail=1 请求时才解密返回（见 routes/admin.py）。 */
  password?: string
}

export interface AdminUsersResponse extends ApiEnvelope {
  total_users: number
  /** 本次响应有没有带明文密码。字段名就是后端的 detail，
   *  这里千万别照感觉写成 with_password —— 对不上时后端不会报错，
   *  只会把密文列静静地空着（`with_password` 是老版本的叫法）。 */
  detail: boolean
  include_closed: boolean
  /** 列表里藏了几个已注销的账号。只给数字不给名单：开关没打开时，
   *  这些人的资料就真的不该出现在响应体里。 */
  closed_total: number
  users: AdminUser[]
}

/** 恢复注销账号时撞上的占用者。一个账号被注销后，它的昵称和学号
 *  会立刻让给别人，所以「恢复」可能因为名字已经有人用而失败 ——
 *  这时后端把这些信息结构化地还回来，好让操作者知道该去找谁。 */
export interface RestoreConflict {
  label: string
  value: string
  owner_id: number
  owner_nickname: string
}

export interface RestoreResponse extends ApiEnvelope {
  conflicts?: RestoreConflict[]
}

export interface DashboardStats extends ApiEnvelope {
  users: {
    total: number
    active: number
    disabled: number
    new_7d: number
    by_role: Record<string, number>
  }
  orders: {
    total: number
    claimed: number
    unclaimed: number
    /** 此刻停在「待计费」的单量 */
    unpriced: number
    /** 已计费单的金额合计（元）。不管有没有取件 —— 它是「累计计费」，不是「已收账」 */
    revenue: number
    by_status: Record<string, number>
    by_color: Record<string, number>
    by_duplex: Record<string, number>
  }
  daily: { date: string; count: number }[]
  top_claimers: { nickname: string; count: number }[]
}

/** 服务数据（学生端「服务数据」页）。字段名逐个对应 routes/orders.py 的 api_board。
 *
 *  别拿 DashboardStats 来复用：这条响应里**刻意没有金额**（revenue 只在管理端那份里），
 *  复用了类型就等于给前端开了个「顺手也把金额画出来」的口子。
 *  两边的字段名也确实不一样（比如这边叫 service、那边叫 users）。 */
export interface ServiceBoard extends ApiEnvelope {
  /** 我自己的概览。**刻意不含站点规模**（总单数 / 近 7 天 / 账号数）：
   *  那些是经营数据，后端 SQL 里就没查 —— 不是这里少一个字段，
   *  而是响应体里根本没有，网络面板里也看不到。 */
  mine: {
    /** 我的累计单数。跟累计榜上「你共 N 单」是同一个数（后端同源取的） */
    total: number
    /** 进行中：待计费 / 待打印 / 打印中。刚提交完在等报价的也算 */
    active: number
    /** 我还没取的件数（状态「可取了」） */
    ready: number
    /** 我在累计榜上的名次。**没下过单时后端也返回 1**，页面必须先判 total */
    rank: number
    /** 累计榜上一共有多少人上榜 */
    ranked: number
  }
  queue: {
    /** 还没人接过的单 */
    unclaimed: number
    /** 排队里各档各剩多少单，**按流程先后排好序的数组**（后端给全 4 档，没单的是 0）。
     *
     *  为什么是数组不是 `{ 状态: 数量 }`：Flask 的 JSON 序列化默认对键排序
     *  （`app.json.sort_keys`，Flask 2.3+ 起默认 True），字典里在 config 中按流程
     *  摆好的顺序，发出去会变成「可取了 / 待打印 / 待计费 / 打印中」这种字面顺序。
     *  排队这一行要的正是顺序，而 JSON 对象的键顺序规范上不作数，只能交给数组。
     *
     *  **没有「已取件」**：它已经出队，而且那是个累计数、属站点规模，
     *  后端压根没往响应里放。所以这里也不是 `OrderStatus[]` ——
     *  类型上就摆明「后端给什么画什么」，界面上那句「按后端给的顺序画」才是真的。 */
    statuses: { status: OrderStatus; count: number }[]
  }
  daily: { date: string; count: number }[]
  /** 两个榜（近 30 天 / 累计）一次性都给，切换不再发请求：
   *  两个查询都小，而切一下就要转圈的样子更像是页面卡住了。 */
  boards: Board[]
}

export interface Board {
  key: 'recent' | 'all'
  label: string
  /** 榜上的英文小注，跟别的页面一样当装饰用 */
  hint: string
  /** 前 10 名。名次已经排好，`rank` 直接用，前端不要再自己按数组下标算 ——
   *  后端并列时的排序规则（同单数按最近下单）在这里是看不出来的。 */
  top: BoardEntry[]
  /** 我在这张榜上的位置。没下过单时 count 是 0、rank 是 1，不是 null */
  me: { count: number; rank: number; ranked: number }
}

export interface BoardEntry {
  rank: number
  /** 别人的昵称已由**服务端**打码（张*三），只有 is_me 那行是完整的 ——
   *  之所以不在前端打码：前端能拿到的东西，网络面板里也拿得到。 */
  nickname: string
  count: number
  is_me: boolean
}

export type AnnounceFont = 'system' | 'songti' | 'heiti' | 'kaiti' | 'mono'

export const ANNOUNCE_FONTS: Record<AnnounceFont, { label: string; css: string }> = {
  system: { label: '默认黑体', css: 'system-ui, "Microsoft YaHei", Arial, sans-serif' },
  songti: { label: '宋体', css: '"SimSun", "Songti SC", serif' },
  heiti: { label: '黑体', css: '"Microsoft YaHei", "PingFang SC", sans-serif' },
  kaiti: { label: '楷体', css: '"KaiTi", "STKaiti", serif' },
  mono: { label: '等宽', css: 'ui-monospace, Consolas, monospace' },
}

export interface Announcement {
  id: number
  content: string
  font_family: AnnounceFont
  font_size: number
  font_color: string
  is_active?: number
  update_time?: string | null
  author?: string | null
}

export interface AnnouncementResponse extends ApiEnvelope {
  announcement: Announcement | null
}

export interface AnnouncementListResponse extends ApiEnvelope {
  announcements: Announcement[]
}

export type TicketStatus = 'open' | 'closed'

export interface Ticket {
  id: number
  subject: string
  status: TicketStatus
  user_id?: number
  create_time: string | null
  update_time: string | null
  unread: number
  msg_count: number
  last_body: string | null
  owner_nickname?: string | null
}

export interface TicketListResponse extends ApiEnvelope {
  staff: boolean
  unread_total: number
  tickets: Ticket[]
}

export interface TicketMessage {
  id: number
  sender_id: number | null
  sender_role: Role
  body: string
  create_time: string | null
  sender_nickname: string | null
}

export interface TicketDetailResponse extends ApiEnvelope {
  ticket: {
    id: number
    subject: string
    status: TicketStatus
    is_mine: boolean
    owner_nickname: string
  }
  messages: TicketMessage[]
  /** 增量轮询的起始游标：最后一条消息的 id，没有消息时为 0。 */
  last_id: number
}

/** 增量拉取新消息的响应（轮询专用）。
 *  服务端在**没有新消息时不会写库**，所以这个接口可以放心高频调用，
 *  不会把「有没有人看」这件事搞乱。
 */
export interface TicketMessagesResponse extends ApiEnvelope {
  status: TicketStatus
  messages: TicketMessage[]
  last_id: number
}

/* ---------------- 身份审核（学号不在名单上时的人工通道） ----------------
   和「审计日志」没有关系：这里指的是「这个人是谁，该不该放他注册」。
   状态字符串由后端 config.AUDIT_STATUSES 定，标签拿后端发的 status_label，
   前端不自己翻译 —— 两边各写一套，改的时候必漏一处。 */
export type AuditStatus = 'pending' | 'approved' | 'rejected'

export const AUDIT_STATUSES: AuditStatus[] = ['pending', 'approved', 'rejected']

/** 申请本体。注意**没有密码**：申请不等于注册，
 *  不能让一个还没通过审核的人提前把密码交给系统存着。 */
export interface AuditRequest {
  id: number
  student_id: string
  real_name: string
  contact_type: ContactType
  /** 管理端列表才有；查进度那个接口刻意不返回它（那是个未登录可调的接口） */
  contact?: string
  note: string | null
  status: AuditStatus
  status_label?: string
  review_note?: string | null
  reviewed_by?: number | null
  reviewer_nickname?: string | null
  create_time: string | null
  review_time?: string | null
}

/** 查询进度的返回：比列表少得多，只够让申请人知道「到哪一步了」。 */
export interface AuditStatusResponse extends ApiEnvelope {
  request: {
    student_id: string
    status: AuditStatus
    status_label: string
    review_note: string | null
    create_time: string | null
    review_time: string | null
  }
}

export interface AuditListResponse extends ApiEnvelope {
  requests: AuditRequest[]
  /** 三个状态都有键，后端已经补过 0，前端不用再写一层 `|| 0` */
  counts: Record<AuditStatus, number>
}
