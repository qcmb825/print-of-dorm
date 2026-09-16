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
  DashboardStats,
  MeResponse,
  MyOrdersResponse,
  OrderListResponse,
  OrderStatus,
  Role,
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

/* 账号管理：管理端 */
export const adminApi = {
  users: (withPassword = false) =>
    get<AdminUsersResponse>('/api/admin/users', withPassword ? { with_password: 1 } : undefined),
  setRole: (id: number, role: Role) =>
    put<{ code: number; msg: string }>(`/api/admin/user/${id}/role`, { role }),
  setStatus: (id: number, status: 'active' | 'disabled') =>
    put<{ code: number; msg: string }>(`/api/admin/user/${id}/status`, { status }),
  removeUser: (id: number) => del<{ code: number; msg: string }>(`/api/admin/user/${id}`),
  stats: () => get<DashboardStats>('/api/admin/stats'),
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
