/** 接口封装 —— 按功能域分组，返回的已经是拆过信封的强类型数据。
 *  路径与权限见 README「接口一览」和 routes/ 下各模块。
 */
import { del, download, get, post, put, upload } from './client'
import type {
  AdminUsersResponse,
  AnnounceFont,
  AnnouncementListResponse,
  AnnouncementResponse,
  DashboardStats,
  MeResponse,
  MyOrdersResponse,
  OrderListResponse,
  OrderStatus,
  Role,
  TicketDetailResponse,
  TicketListResponse,
  TicketStatus,
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
    options: { color: string; duplex: string; remark: string },
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

/* 订单：管理端 */
export const staffOrderApi = {
  list: (params: { page: number; size: number; status?: string; scope?: string }) =>
    get<OrderListResponse>('/api/orders', params),
  claim: (id: number) => post<{ code: number; msg: string }>(`/api/order/${id}/claim`),
  release: (id: number) => post<{ code: number; msg: string }>(`/api/order/${id}/release`),
  setStatus: (id: number, status: OrderStatus) =>
    put<{ code: number; msg: string }>(`/api/order/${id}/status`, { status }),
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
  create: (subject: string, body: string) =>
    post<{ code: number; msg: string; id: number }>('/api/tickets', { subject, body }),
  reply: (id: number, body: string) =>
    post<{ code: number; msg: string }>(`/api/tickets/${id}/messages`, { body }),
  setStatus: (id: number, status: TicketStatus) =>
    put<{ code: number; msg: string }>(`/api/tickets/${id}/status`, { status }),
}
