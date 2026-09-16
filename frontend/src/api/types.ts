/** 后端 DTO 类型 —— 与 Flask 各路由的响应一一对应。
 *  改动接口时先改这里，TS 会把所有受影响的调用点报出来。
 */

export type Role = 'user' | 'admin' | 'super'

export const ROLE_LABELS: Record<Role, string> = {
  user: '普通用户',
  admin: '管理员',
  super: '超级管理员',
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

export type AccountStatus = 'active' | 'disabled'

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
  claimer_nickname?: string | null
  /** 计费人昵称，仅管理端列表返回 */
  pricer_nickname?: string | null
  /** 仅管理端列表返回 */
  is_mine?: boolean
  /** 仅管理端列表返回：当前账号能否改这单的状态 */
  can_manage?: boolean
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

export interface UploadResponse extends ApiEnvelope {
  order_id: number
  pickup_code: string
}

/** 上传时选的打印选项，直传与分片两条路共用。 */
export interface UploadOptions {
  color: string
  duplex: string
  remark: string
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
  /** 只有超管显式请求 with_password 时才有 */
  password?: string
}

export interface AdminUsersResponse extends ApiEnvelope {
  total_users: number
  with_password: boolean
  users: AdminUser[]
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
