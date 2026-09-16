/** 接口封装 —— 按功能域分组，返回的已经是拆过信封的强类型数据。
 *  路径与权限见 README「接口一览」和 routes/ 下各模块。
 */
import { del, download, get, post, put, putRaw, upload } from './client'
import type {
  AdminUsersResponse,
  AnnounceFont,
  AnnouncementListResponse,
  AnnouncementResponse,
  AuditListResponse,
  AuditStatus,
  AuditStatusResponse,
  ChunkPendingResponse,
  ChunkSession,
  ContactType,
  DashboardStats,
  MeResponse,
  MyOrdersResponse,
  OrderDetailResponse,
  OrderListResponse,
  OrderStatus,
  RestoreResponse,
  Role,
  ServiceBoard,
  TicketDetailResponse,
  TicketListResponse,
  TicketMessagesResponse,
  TicketStatus,
  UploadOptions,
  UploadResponse,
} from './types'

/* 账号 */
export const authApi = {
  /** 应用启动时的握手：拿当前登录用户，顺便领一张 CSRF 令牌。未登录时返回 401。 */
  me: () => get<MeResponse>('/api/me'),
  login: (identifier: string, password: string) =>
    post<MeResponse>('/api/login', { identifier, password }),
  register: (payload: Record<string, unknown>) => post<MeResponse>('/api/register', payload),
  logout: () => post<{ code: number; msg: string }>('/api/logout'),
}

/* 订单：学生端 */
export const orderApi = {
  upload: (
    file: File,
    options: UploadOptions,
    onProgress?: (percent: number) => void,
  ) => {
    const form = new FormData()
    form.append('file', file)
    form.append('color', options.color)
    form.append('duplex', options.duplex)
    form.append('remark', options.remark)
    return upload<UploadResponse>('/api/upload', form, onProgress)
  },
  mine: () => get<MyOrdersResponse>('/api/my-orders'),
  /** 撤回自己下的、还没被接单的订单。服务端会把整条记录和落盘的文件一起删掉，
   *  「已被接单」（400）和「已取件 / 状态刚变」（400 / 409）都会被挡回来。
   *  界面上的按钮置灰只管手滑，真正把关的是那几个状态码。 */
  withdraw: (id: number) => post<{ code: number; msg: string }>(`/api/order/${id}/withdraw`),
}

/* 服务数据：全站公开口径的汇总 + 下单榜。登录即可看，响应里没有金额、
   别人的昵称也已由服务端打码 —— 这两件事都在后端做，前端拿不到原文。 */
export const boardApi = {
  load: () => get<ServiceBoard>('/api/board'),
}

/* 大文件分片上传。分片尺寸由服务端的 CHUNK_SIZE 定，前端跟着它的返回值走，不自己算。 */
export const chunkApi = {
  /** 开会话。同名同大小会复用上一次没传完的那份（resumed: true），断点续传就靠这条。 */
  init: (filename: string, size: number) =>
    post<ChunkSession>('/api/upload/chunked', { filename, size }),
  /** 未完成的会话列表，用来提醒「上次那份还没传完」。 */
  pending: () => get<ChunkPendingResponse>('/api/upload/chunked'),
  info: (uploadId: string) => get<ChunkSession>(`/api/upload/chunked/${uploadId}`),
  /** 传一片。body 是原始二进制，不是 multipart。 */
  putChunk: (
    uploadId: string,
    index: number,
    blob: Blob,
    onProgress?: (percent: number) => void,
  ) => putRaw<ChunkSession>(`/api/upload/chunked/${uploadId}/${index}`, blob, onProgress),
  /** 所有分片到位后合并落盘并生成订单。 */
  complete: (uploadId: string, options: UploadOptions) =>
    post<UploadResponse>(`/api/upload/chunked/${uploadId}/complete`, options),
  /** 放弃一份未完成的上传，腾出额度。界面上没放入口，留给工具和未来的运维需要。 */
  cancel: (uploadId: string) =>
    del<{ code: number; msg: string }>(`/api/upload/chunked/${uploadId}`),
}

/* 订单：管理端 */
export const staffOrderApi = {
  list: (params: { page: number; size: number; status?: string; scope?: string }) =>
    get<OrderListResponse>('/api/orders', params),
  /** 订单详情：完整字段 + 操作留痕时间线。
   *  单开一条接口而不是往列表里塞：详情要顺手 stat 一下文件、再取一串留痕，
   *  塞进列表就变成每页 20 次磁盘调用 + 一次 N+1 查询（见后端 api_order_detail）。 */
  detail: (id: number) => get<OrderDetailResponse>(`/api/order/${id}/detail`),
  claim: (id: number) => post<{ code: number; msg: string }>(`/api/order/${id}/claim`),
  release: (id: number) => post<{ code: number; msg: string }>(`/api/order/${id}/release`),
  setStatus: (id: number, status: OrderStatus) =>
    put<{ code: number; msg: string }>(`/api/order/${id}/status`, { status }),
  /** 计费 / 改价。金额传**字符串**：后端按十进制正则校验（config.PRICE_RE），
   *  在这里先转成 number 再传，就轮到浮点误差来接管那个值了。
   *  首次计费会顺带把单从「待计费」推到「待打印」（后端一个原子 UPDATE 完成）。 */
  price: (id: number, price: string) =>
    post<{ code: number; msg: string; price: number }>(`/api/order/${id}/price`, { price }),
  download: (id: number, filename: string) => download(`/api/order/${id}/download`, filename),
}

/* 账号管理：管理端
 * 列表对**所有管理员**开放（普通管理员看不到默认管理员那一行，服务端过滤的）；
 * 下面那些写操作全部只对默认管理员开放，接口上都有 @roles_required(ROLE_SUPER)。
 * 也就是说：这里是不是渲染出了那个按钮，纯属界面礼貌，拦人在后端。 */
export const adminApi = {
  /** 列表。detail 要明文密码（服务端会强制审计留痕），includeClosed 带上已注销账号。
   *  两个参数的字段名跟后端保持一致：detail / include_closed。 */
  users: (detail = false, includeClosed = false) => {
    const params: Record<string, number> = {}
    if (detail) params.detail = 1
    if (includeClosed) params.include_closed = 1
    return get<AdminUsersResponse>(
      '/api/admin/users',
      Object.keys(params).length ? params : undefined,
    )
  },
  setRole: (id: number, role: Role) =>
    put<{ code: number; msg: string }>(`/api/admin/user/${id}/role`, { role }),
  setStatus: (id: number, status: 'active' | 'disabled') =>
    put<{ code: number; msg: string }>(`/api/admin/user/${id}/status`, { status }),
  /** 注销是 POST，不是 DELETE。数据一条都不会少 —— 账号只是登不进来了，
   *  订单和工单全部原样留着，所以「删除」这个动作在这个系统里根本不存在。 */
  closeUser: (id: number) =>
    post<{ code: number; msg: string }>(`/api/admin/user/${id}/close`),
  /** 恢复已注销的账号。昵称/学号被别人占了会被整体拒绝（409 + conflicts），
   *  这时失败信息里带着占用者是谁，界面上要能显示出来。 */
  restoreUser: (id: number) =>
    post<RestoreResponse>(`/api/admin/user/${id}/restore`),
  /** 改资料：昵称 / 姓名 / 学号 / 宿舍 / 联系方式，一次全量提交。
   *  学号是登录名，改完本人就得用新的学号登录。 */
  setProfile: (id: number, payload: AdminProfilePayload) =>
    put<{ code: number; msg: string }>(`/api/admin/user/${id}/profile`, payload),
  /** 重置密码。密码是**明文传一次**，由服务端做哈希与可逆加密 —— 
   *  客户端不做任何加工，也就不会在本地留下浮点式的那种「处理痕迹」。 */
  resetPassword: (id: number, password: string) =>
    put<{ code: number; msg: string }>(`/api/admin/user/${id}/password`, { password }),
  /** 代发工单：工单归属指定学生，正文以该学生名义入库（学生端能正常看到并追问）。 */
  ticketFor: (id: number, subject: string, body: string) =>
    post<{ code: number; msg: string; id: number }>(`/api/admin/user/${id}/ticket`, {
      subject,
      body,
    }),
  stats: () => get<DashboardStats>('/api/admin/stats'),
}

/** 改资料提交的字段。和注册表单是同一批字段、同一套校验规则
 *  （utils.validate_identity_fields 与这里的 validators.ts 互为镜像）。 */
export interface AdminProfilePayload {
  nickname: string
  real_name: string
  student_id: string
  dorm: string
  contact_type: ContactType
  contact: string
}

/* 公告 */
export interface AnnouncementPayload {
  content: string
  font_family: AnnounceFont
  font_size: number
  font_color: string
}

export const announcementApi = {
  current: () => get<AnnouncementResponse>('/api/announcement'),
  list: () => get<AnnouncementListResponse>('/api/admin/announcements'),
  create: (payload: AnnouncementPayload) =>
    post<{ code: number; msg: string; id: number }>('/api/admin/announcements', payload),
  update: (id: number, payload: AnnouncementPayload) =>
    put<{ code: number; msg: string }>(`/api/admin/announcements/${id}`, payload),
  setActive: (id: number, active: boolean) =>
    put<{ code: number; msg: string }>(`/api/admin/announcements/${id}/active`, { active }),
  remove: (id: number) => del<{ code: number; msg: string }>(`/api/admin/announcements/${id}`),
}

/* 工单 */
export const ticketApi = {
  list: (status?: string) => get<TicketListResponse>('/api/tickets', status ? { status } : undefined),
  detail: (id: number) => get<TicketDetailResponse>(`/api/tickets/${id}`),
  /** 只要比 sinceId 新的消息。没有新消息时返回空数组，且不会动已读时间。 */
  messagesSince: (id: number, sinceId: number) =>
    get<TicketMessagesResponse>(`/api/tickets/${id}/messages`, { since_id: sinceId }),
  create: (subject: string, body: string) =>
    post<{ code: number; msg: string; id: number }>('/api/tickets', { subject, body }),
  reply: (id: number, body: string) =>
    post<{ code: number; msg: string }>(`/api/tickets/${id}/messages`, { body }),
  setStatus: (id: number, status: TicketStatus) =>
    put<{ code: number; msg: string }>(`/api/tickets/${id}/status`, { status }),
}

/* 身份审核
 * 与「审计日志」无关：这里指的是「这个人是谁、该不该放他进来」。
 * submit / status 两个**未登录也能调**，所以后端频控卡得比别处紧（提交 3 次/小时）。 */
export const auditApi = {
  /** 提交申请。后端只会存「学号 + 姓名 + 联系方式 + 说明」，不收密码。 */
  submit: (payload: {
    student_id: string
    real_name: string
    contact_type: string
    contact: string
    note: string
  }) => post<{ code: number; msg: string; id: number }>('/api/audit-request', payload),
  /** 查进度。**学号和联系方式两个都得对**才给看 ——
   *  只凭学号可查的话，拿一串连号学号挨个试就能问出「谁申请过、通没通过」。 */
  status: (student_id: string, contact: string) =>
    get<AuditStatusResponse>('/api/audit-request/status', { student_id, contact }),
  /** 管理端列表。status 省略时后端默认只看待审核的 —— 那是个待办队列，不是档案库。 */
  staffList: (status?: AuditStatus) =>
    get<AuditListResponse>('/api/admin/audit-requests', status ? { status } : undefined),
  /** 批准或驳回。驳回必须带理由：申请人只看到「未通过」而不知道为什么，
   *  只会再找人来问一遍，一次处理变成两次。允许改判（调错、事后联系本人改主意）。 */
  review: (id: number, action: 'approve' | 'reject', note = '') =>
    post<{ code: number; msg: string }>(`/api/admin/audit-requests/${id}/review`, { action, note }),
}
