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
  MeOverviewResponse,
  MeResponse,
  OrderLogListResponse,
  OrderLogStatsResponse,
  MyOrdersResponse,
  OrderDetailResponse,
  OrderListResponse,
  OrderStatus,
  OtherContactType,
  PaperTypeListResponse,
  PickupLookupResponse,
  PrefsResponse,
  PresetOrderRequest,
  PrintOptionsResponse,
  PrintPresetListResponse,
  ProfileUpdateResponse,
  RestoreResponse,
  Role,
  ServiceBoard,
  TicketDetailResponse,
  TicketListResponse,
  TicketMessagesResponse,
  TicketStatus,
  UploadOptions,
  UploadResponse,
  UserPrefs,
} from './types'

/* 账号 */
export const authApi = {
  /** 应用启动时的握手：拿当前登录用户，顺便领一张 CSRF 令牌。未登录时返回 401。 */
  me: () => get<MeResponse>('/api/me'),
  login: (identifier: string, password: string) =>
    post<MeResponse>('/api/login', { identifier, password }),
  register: (payload: Record<string, unknown>) => post<MeResponse>('/api/register', payload),
  logout: () => post<{ code: number; msg: string }>('/api/logout'),

  /** 设置页要的那一份汇总：我的资料 + 我的订单概况 + 在盘用量。
   *
   *  为什么不动用现成的两个接口 ——
   *  /api/my-stats 是柱状图 + 分布的形状，塞进设置页等于挂一屏图表；
   *  /api/board 是公开口径，里面**刻意不含金额**，而设置页要显示「我花了多少」。
   *  所以后端单开一份最小集合（routes/account.py: api_me_overview）。 */
  overview: () => get<MeOverviewResponse>('/api/me/overview'),

  /** 自助改资料。只能改昵称 / 宿舍 / QQ / 其他联系方式 ——
   *  姓名和学号由服务端从当前会话带进来，改不了（那是身份核验的依据）。 */
  updateProfile: (payload: ProfilePayload) =>
    put<ProfileUpdateResponse>('/api/me/profile', payload),

  /** 自助改密码。改完服务端会把 session_epoch +1（其它设备全部掉线），
   *  但当前会话会跟着更新，所以这里不需要重新登录。
   *  响应里带回**新的 CSRF 令牌**，client.ts 会照常轮换。 */
  changePassword: (currentPassword: string, newPassword: string) =>
    put<{ code: number; msg: string; csrf?: string }>('/api/me/password', {
      current_password: currentPassword,
      new_password: newPassword,
    }),

  /** 我的偏好（通知开关、免打扰、默认打印参数、订单列表显示）。
   *
   *  与机器人「设置」命令读写的是**同一份**（服务端 prefs.py）。返回里的 `lines`
   *  是服务端翻好的人话，两个入口共用 —— 页面自己再拼一套解释文案，
   *  迟早与机器人那边对不上，而且谁都不会发现。
   *
   *  保存接口只认白名单里的键，多余字段静默忽略（所以拼错键名不会报错，
   *  只会「保存成功但没变」—— 加字段时务必与 api/types.ts 的 UserPrefs 对齐）。 */
  prefs: () => get<PrefsResponse>('/api/me/prefs'),

  savePrefs: (payload: Partial<UserPrefs>) => put<PrefsResponse>('/api/me/prefs', payload),

  /* 微信收款码：每个管理员只管自己那一张。谁接的单，学生就付给谁，
     所以邮件里嵌的必须是接单人自己的码，不是全局一张。

     服务端这三个接口都是 ROLE_ADMIN 起步。前端把入口藏起来只是省得普通人
     点进来碰一鼻子灰，真正把关的始终是服务端。 */
  payQr: {
    /** 上传或替换。multipart，字段名固定是 file。 */
    upload: (file: File) => {
      const form = new FormData()
      form.append('file', file)
      return upload<{ code: number; msg: string; pay_qr_version?: string }>('/api/me/pay-qr', form)
    },
    remove: () => del<{ code: number; msg: string }>('/api/me/pay-qr'),
    /** 预览地址。必须带上版本号（落盘文件名）做缓存标识 ——
     *  不带的后果是换完码浏览器还在放旧图，看着像上传没生效。
     *  这不是 XHR，走的是浏览器的图片加载，所以不经过 client.ts，
     *  也就不需要 CSRF 令牌（它是个纯 GET 读接口）。 */
    url: (version?: string) => `/api/me/pay-qr?v=${encodeURIComponent(version || '')}`,
  },
}

/** 自助改资料提交的字段。学号/姓名不在其中 —— 后端从会话里取，这里不传。 */
export interface ProfilePayload {
  nickname: string
  dorm: string
  qq: string
  /** 其他联系方式的类型。整组留空时传 null（后端也接受空串，会归一成 NULL）。 */
  contact_type: OtherContactType | null
  contact: string | null
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
    // 份数和纸张走同一个 FormData。空值**必须不 append**，不要 append('')：
    // 后端把空串当作「没填」处理，但「字段根本不存在」和「字段是空串」这两条路
    // 在 Flask 里就是两种输入形状，能少一种就少一种。
    if (options.copies != null) form.append('copies', String(options.copies))
    if (options.paper_type_id != null) form.append('paper_type_id', String(options.paper_type_id))
    return upload<UploadResponse>('/api/upload', form, onProgress)
  },
  /** 用预设打印服务下单 —— 这一单**没有文件**。
   *  单独一个接口而不是给 upload 传「文件为空」：那样这个函数就有两种
   *  完全不同的输入形状，谁调用它、传了什么都看不出。
   *  服务端也会挡带文件的请求（400），所以这里不传文件是必然的，不是约定。 */
  createPresetOrder: (payload: PresetOrderRequest) =>
    post<UploadResponse>('/api/order/preset', payload),
  mine: () => get<MyOrdersResponse>('/api/my-orders'),
  /** 撤回自己下的、还没被接单的订单。服务端会把整条记录和落盘的文件一起删掉，
   *  「已被接单」（400）和「已取件 / 状态刚变」（400 / 409）都会被挡回来。
   *  界面上的按钮置灰只管手滑，真正把关的是那几个状态码。 */
  withdraw: (id: number) => post<{ code: number; msg: string }>(`/api/order/${id}/withdraw`),
}

/* 服务数据：全站公开口径的汇总 + 下单榜。登录即可看，响应里没有金额、
   别人的昵称也已由服务端打码 —— 这两件事都在后端做，前端拿不到原文。 */
/* 历史记录：全部订单操作留痕的查询与统计（管理端）。
 *
 * 列表与统计吃**同一套筛选条件**，后端也共用同一条 WHERE —— 两边各算一遍的话，
 * 「列表 3 条、统计说 5 条」这种对不上会天天出现，而且没人会去核对。 */
export const historyApi = {
  list: (params: {
    page?: number
    size?: number
    action?: string
    status?: string
    q?: string
    from?: string
    to?: string
  }) => get<OrderLogListResponse>('/api/admin/order-logs', params),
  stats: (params: { action?: string; status?: string; q?: string; from?: string; to?: string }) =>
    get<OrderLogStatsResponse>('/api/admin/order-logs/stats', params),
}

export const boardApi = {
  load: () => get<ServiceBoard>('/api/board'),
}

/* 大文件分片上传。分片尺寸由服务端的 CHUNK_SIZE 定，前端跟着它的返回值走，不自己算。 */
export const chunkApi = {
  /** 开会话。同名同大小会复用上一次没传完的那份（resumed: true），断点续传就靠这条。
   *  **不接受 preset_id**：选了预设就没有文件，也就不需要分片上传
   *  （服务端在 init 和 complete 两处都会拒，不只是没入口）。 */
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
  list: (params: {
    page: number
    size: number
    status?: string
    scope?: string
    /** 关键词。一个框搜完：单号 / 文件名 / 订单号 / 昵称 / 姓名 / 学号 / 宿舍 / 联系方式。
     *
     *  订单号和学号在服务端走**精确相等**（搜「12」要的是第 12 单，而不是
     *  #12、#120 一起上来），其余是模糊匹配 —— 匹配方式由服务端定，前端不要
     *  在本地再筛一道：本地筛会跟分页打架，这一页没有不等于全库没有。 */
    q?: string
    /** 按打印服务分组筛选。传 ORDER_PRESET_FILTER_NONE（'none'）表示「什么都没归」；
     *  不传 = 不按服务筛。里面是**字符串**，服务端自己转整数。 */
    preset?: string
    /** '1' = 隐藏已取件。不传就是老行为（都显示）。 */
    exclude_done?: string
  }) => get<OrderListResponse>('/api/orders', params),
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
  /** 下载订单文件。sizeBytes 用于计算超时：大文件在慢链路上 30 秒会被掐断。 */
  download: (id: number, filename: string, sizeBytes?: number) =>
    download(`/api/order/${id}/download`, filename, sizeBytes),

  /* ---- 凭单号核对取件（柜台那一步）----
   *
   *  为什么单开两条接口，而不是复用「改成已取件」那颗按钮：
   *  ① 柜台核对只认「可取件」。改状态那个接口是给订单台推进流程用的，
   *     允许从「打印中」直接跳到「已取件」；而柜台拿到一个码、发现这单
   *     还在待打印，要的是被拦下来，不是把状态一把推到底 —— 纸都还没出来。
   *  ② 权限不一样：改状态是「只有接单人（或默认管理员）能动」，而柜台交件的人
   *     常常**不是**接单人（接单那个在里屋打印）。卡在这里的话，
   *     最该用这个功能的那个人反而用不了。服务端的留痕会写明「这是代谁交接的」。 */

  /** 按单号取一单，用于柜台核对。一位数、两位数都收，客户端不用补零
   *  （服务端会顺带试 4 位那一份）。找不到回 404。 */
  lookupPickup: (code: string) => get<PickupLookupResponse>('/api/order/pickup', { code }),
  /** 确认取件：把这一单置为「已取件」。只对「可取件」的单生效，
   *  其余情况服务端回 409 并说明卡在哪一步（已取走 / 还没计费 / 还没到那一步）。 */
  confirmPickup: (code: string) =>
    post<{ code: number; msg: string; order_id: number }>('/api/order/pickup', { code }),
  /** 把订单归入某条打印服务分组（传 null = 取消归类）。
   *
   *  这是「同一份文件的单子凑到一起」的另一半：下单时选了预设的单天然就在自己
   *  那一组里，而这个接口是给「没选预设、自己传了同一份表格」的订单补归类用的。 */
  setPresetGroup: (id: number, presetId: number | null) =>
    put<{
      code: number
      msg: string
      preset_group_id: number | null
      preset_group_content: string | null
    }>(`/api/order/${id}/preset-group`, { preset_id: presetId }),
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
 *  （utils.validate_identity_fields 与这里的 validators.ts 互为镜像）。
 *
 *  QQ 单独一栏且必填，contact 那组（微信 / 邮箱）整组选填 ——
 *  与后端 utils.validate_qq / validate_other_contact 的分工一一对应。 */
export interface AdminProfilePayload {
  nickname: string
  real_name: string
  student_id: string
  dorm: string
  qq: string
  contact_type: OtherContactType | null
  contact: string | null
}

/* 打印选项：预设打印服务 + 纸张类型
 *
 * 两块东西共用一组接口（后端也在同一个 Blueprint 里），因为它们是同一个下拉框
 * 的两半：选了预设就不用传文件，而纸张两边都要选。
 *
 * 权限口径与账号管理不同：**下面这些写接口全部是 ROLE_ADMIN 起步，不是只给默认管理员**。
 * 「楼里现在有哪种纸」正是打印员自己最清楚的事，收进超管只会让这张表没人维护。
 * 界面上因此对所有管理员都开入口，见 views/staff/PrintOptionsView.vue 顶部那段说明。 */
export const printOptionsApi = {
  /** 学生下单页用：一次拿回**启用中的**预设和纸张。
   *  拆两个请求的话，下单页要处理「一个到了一个没到」的中间态，
   *  而那个中间态下无论画什么都是错的。 */
  load: () => get<PrintOptionsResponse>('/api/print-options'),
}

export const staffPrintOptionsApi = {
  presets: () => get<PrintPresetListResponse>('/api/admin/print-presets'),
  createPreset: (content: string) =>
    post<{ code: number; msg: string; id: number }>('/api/admin/print-presets', { content }),
  updatePreset: (id: number, content: string) =>
    put<{ code: number; msg: string }>(`/api/admin/print-presets/${id}`, { content }),
  setPresetActive: (id: number, active: boolean) =>
    put<{ code: number; msg: string }>(`/api/admin/print-presets/${id}/active`, { active }),
  removePreset: (id: number) => del<{ code: number; msg: string }>(`/api/admin/print-presets/${id}`),

  papers: () => get<PaperTypeListResponse>('/api/admin/paper-types'),
  createPaper: (payload: { name: string; remark: string }) =>
    post<{ code: number; msg: string; id: number }>('/api/admin/paper-types', payload),
  updatePaper: (id: number, payload: { name: string; remark: string }) =>
    put<{ code: number; msg: string }>(`/api/admin/paper-types/${id}`, payload),
  setPaperActive: (id: number, active: boolean) =>
    put<{ code: number; msg: string }>(`/api/admin/paper-types/${id}/active`, { active }),
  removePaper: (id: number) => del<{ code: number; msg: string }>(`/api/admin/paper-types/${id}`),
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
