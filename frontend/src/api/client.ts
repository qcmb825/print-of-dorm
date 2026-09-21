/** HTTP 客户端 —— 全局唯一出口。
 *
 *  它替全应用扛下三件事，业务代码不需要再关心：
 *    1. 写操作自动挂 X-CSRF-Token（后端对所有 POST/PUT/PATCH/DELETE 强制校验）；
 *    2. 令牌轮换：后端每次响应都会带回新的 csrf，这里自动收下；
 *    3. 错误归一：把 axios 的异常统一成带中文提示的 ApiError，调用方只需 try/catch 一个类型。
 */
import axios, { AxiosError, AxiosHeaders, type AxiosRequestConfig } from 'axios'
import type { ApiEnvelope } from './types'

let csrfToken = ''

export function getCsrf(): string {
  return csrfToken
}

export function setCsrf(token: string | undefined): void {
  if (token) csrfToken = token
}

/** 会话失效时的回调，由 auth store 注册（用注册制避免 store 和 client 互相 import）。 */
let unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(fn: () => void): void {
  unauthorizedHandler = fn
}

/* ── 进行中的请求数 ────────────────────────────────────────────────────────
 *  换场覆盖层靠它回答一个问题：「新页面该显示的数据到了没有？」到了就把面板扫开，
 *  没到就再等一会儿（有上限，见 composables/route-veil.ts）。
 *
 *  为什么放在这里、而不是让每个页面自己举手：这是全应用**唯一的请求出口**，
 *  计数在这里天然完整。让页面各自声明「我要等数据」的话，漏一个页面不会报错 ——
 *  只是那一页的换场不等数据，而「不报错、只是行为不对」正是这个项目最忌讳的一类问题。
 */
let inFlight = 0
const idleWaiters = new Set<() => void>()

function trackEnd(): void {
  inFlight = Math.max(0, inFlight - 1)
  if (inFlight === 0) {
    // 只在归零那一刻通知一次；等着的人自己决定还等不等
    for (const fn of [...idleWaiters]) fn()
  }
}

/** 等到「此刻没有进行中的请求」，最多等 maxMs 毫秒。 */
export async function whenRequestsIdle(maxMs: number): Promise<void> {
  // 先让出一个宏任务再数：新页面的请求是在 onMounted 里发的，
  // 而 axios 的拦截器链要过几道 Promise 才会真正把请求发出去（也就才会被计数）。
  // 少了这一让，open() 那一刻计数还是 0，于是「等数据」永远等于「不等」——
  // 功能看着装上了，实际一次都没生效。
  await new Promise((resolve) => setTimeout(resolve, 0))
  if (inFlight === 0) return
  await new Promise<void>((resolve) => {
    let settled = false
    const finish = (): void => {
      if (settled) return
      settled = true
      idleWaiters.delete(finish)
      clearTimeout(timer)
      resolve()
    }
    const timer = setTimeout(finish, maxMs)
    idleWaiters.add(finish)
  })
}

const WRITE_METHODS = new Set(['post', 'put', 'patch', 'delete'])

/** 后端约定的失败信息都走这里，业务层 catch 到的永远是它。 */
export class ApiError extends Error {
  readonly code: number
  readonly status: number

  /** 后端错误信封里的**原始**字段（除了 code / msg）。
   *  为什么要把整个信封兜着：有些失败不是「报个错」而是「换个入口」，
   *  比如注册被身份核验拦下时后端会多带一个 need_audit，前端据此弹审核申请。
   *  不把字段透出来的话，调用方就只能去比对 msg 里那串中文 ——
   *  后端改一个字，入口就静默消失，而且不报任何错。 */
  readonly detail: Record<string, unknown>

  constructor(
    message: string,
    code: number,
    status: number,
    detail: Record<string, unknown> = {},
  ) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
    this.detail = detail
  }

  /** 会话失效（未登录 / 账号被禁用）。 */
  get isAuthError(): boolean {
    return this.status === 401
  }

  /** 网络没通，或者请求根本没到服务器。 */
  get isNetworkError(): boolean {
    return this.status === 0
  }

  /** 这次失败是有正经出路的：可以提交身份审核申请。目前只有注册会给这个标记。 */
  get needAudit(): boolean {
    return this.detail.need_audit === true
  }
}

export const http = axios.create({
  timeout: 30_000,
  withCredentials: true,
})

/** 重新握手：只为了拿一张新的 CSRF 令牌。
 *
 *  未登录时 /api/me 会返回 401，但响应体里照样带着一张新令牌，
 *  下面的响应拦截器会顺手收下 —— 所以这里把失败当正常分支吞掉。
 *  并发失败时共用一个 Promise，避免一次页面操作打出一串握手请求。
 */
let handshake: Promise<void> | null = null

function refreshCsrf(): Promise<void> {
  if (!handshake) {
    handshake = http
      .get('/api/me')
      .then(() => undefined)
      .catch(() => undefined)
      .finally(() => {
        handshake = null
      })
  }
  return handshake
}

http.interceptors.request.use((config) => {
  inFlight += 1
  const method = (config.method ?? 'get').toLowerCase()
  if (WRITE_METHODS.has(method) && csrfToken) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set('X-CSRF-Token', csrfToken)
    } else {
      ;(config.headers as Record<string, string>)['X-CSRF-Token'] = csrfToken
    }
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    trackEnd()
    const data = response.data as ApiEnvelope | undefined
    if (data && typeof data === 'object') setCsrf(data.csrf)
    return response
  },
  async (error: AxiosError<ApiEnvelope>) => {
    //    ⚠️ 减计数必须**只做一次**：下面那条 403 自愈会重发原请求，
    //    重发走的是 `http.request(config)` —— 那会再进一次 request 拦截器（+1），
    //    所以这里先把自己这次减掉，重发的那次由它自己的响应负责减。
    //    漏了这一句，计数只增不减，「等数据」就变成「永远等到超时」。
    trackEnd()
    const status = error.response?.status ?? 0
    const data = error.response?.data
    setCsrf(data?.csrf)

    // 令牌过期自愈。这一条是实测撞出来的：退出登录之后不刷新页面直接再登录/注册，
    // 前端手里那张票已经作废（后端日志是 csrf_failed has_session_token=False），
    // 于是写请求全被 403 挡下，用户只看到「请求校验失败，请刷新页面后重试」。
    // 后端在这种情况下会补发一张新令牌并标 reason=csrf（令牌存在但对不上时刻意不补，
    // 那种才可能是真的伪造），这里重新握手拿到它、再把原请求原样重发一次。
    // 只重发一次：标记打在 config 上，两个请求同时失败也不会互相串。
    const config = error.config as (AxiosRequestConfig & { csrfRetried?: boolean }) | undefined
    if (status === 403 && data?.reason === 'csrf' && config && !config.csrfRetried) {
      config.csrfRetried = true
      await refreshCsrf()
      return http.request(config)
    }

    let message: string
    if (data?.msg) {
      message = data.msg
    } else if (status === 0) {
      message = error.code === 'ECONNABORTED' ? '请求超时 · 重试' : '网络不可达 · 检查连接后重试'
    } else if (status === 413) {
      message = '文件过大 · 换一份更小的'
    } else if (status >= 500) {
      message = '服务器错误 · 稍后重试'
    } else {
      message = `请求失败 · HTTP ${status}`
    }

    if (status === 401) unauthorizedHandler?.()

    return Promise.reject(
      new ApiError(message, data?.code ?? -1, status, (data ?? {}) as Record<string, unknown>),
    )
  },
)

export async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const response = await http.get<T>(url, { params })
  return response.data
}

export async function post<T>(
  url: string,
  body?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  const response = await http.post<T>(url, body, config)
  return response.data
}

export async function put<T>(url: string, body?: unknown): Promise<T> {
  const response = await http.put<T>(url, body)
  return response.data
}

export async function del<T>(url: string): Promise<T> {
  const response = await http.delete<T>(url)
  return response.data
}

/** 带进度的上传：后端单文件上限由 MAX_UPLOAD_MB 决定，前端不重复设限。 */
export async function upload<T>(
  url: string,
  form: FormData,
  onProgress?: (percent: number) => void,
): Promise<T> {
  const response = await http.post<T>(url, form, {
    timeout: 0,
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return
      onProgress(Math.round((event.loaded / event.total) * 100))
    },
  })
  return response.data
}

/** 直接发一段原始二进制（分片走的就是它，不是 multipart —— 少一层包装就少一份开销）。
 *
 *  `timeout: 0` 是必须的：8MB 一片在跨洋链路上可能要一分钟以上，
 *  默认的 30 秒超时会把上传了九成的分片白白掐断。
 */
export async function putRaw<T>(
  url: string,
  blob: Blob,
  onProgress?: (percent: number) => void,
): Promise<T> {
  const response = await http.put<T>(url, blob, {
    timeout: 0,
    headers: { 'Content-Type': 'application/octet-stream' },
    onUploadProgress: (event) => {
      if (!onProgress || !event.total) return
      onProgress(Math.round((event.loaded / event.total) * 100))
    },
  })
  return response.data
}

/** 以 blob 取回文件再触发浏览器下载 -- 走 axios 才有统一的错误处理。
 *
 *  @param sizeBytes 文件预期大小（字节）。用于计算超时：按 300KB/s 的保守速率
 *  估算下载耗时，加 50% 余量，上限 10 分钟。不传则用 5 分钟兜底。
 *  大文件在慢链路上 30 秒会被 axios 默认超时掐断，已收字节作废，重试必然再失败，
 *  所以上传那两路（upload/putRaw）已经显式写了 timeout: 0，下载不能沿用默认值。 */
export async function download(
  url: string,
  filename: string,
  sizeBytes?: number,
): Promise<void> {
  const timeout = sizeBytes
    ? Math.min(
        Math.ceil((sizeBytes / 307_200) * 1.5 * 1000),
        600_000,
      )
    : 300_000
  const response = await http.get<Blob>(url, { responseType: 'blob', timeout })
  const objectUrl = URL.createObjectURL(response.data)
  try {
    const anchor = document.createElement('a')
    anchor.href = objectUrl
    anchor.download = filename
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  } finally {
    // 交给浏览器读完再释放，立刻 revoke 会让下载中断
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 10_000)
  }
}
