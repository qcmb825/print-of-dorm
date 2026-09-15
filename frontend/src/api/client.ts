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

const WRITE_METHODS = new Set(['post', 'put', 'patch', 'delete'])

/** 后端约定的失败信息都走这里，业务层 catch 到的永远是它。 */
export class ApiError extends Error {
  readonly code: number
  readonly status: number

  constructor(message: string, code: number, status: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }

  /** 会话失效（未登录 / 账号被禁用）。 */
  get isAuthError(): boolean {
    return this.status === 401
  }

  /** 网络没通，或者请求根本没到服务器。 */
  get isNetworkError(): boolean {
    return this.status === 0
  }
}

export const http = axios.create({
  timeout: 30_000,
  withCredentials: true,
})

http.interceptors.request.use((config) => {
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
    const data = response.data as ApiEnvelope | undefined
    if (data && typeof data === 'object') setCsrf(data.csrf)
    return response
  },
  (error: AxiosError<ApiEnvelope>) => {
    const status = error.response?.status ?? 0
    const data = error.response?.data
    setCsrf(data?.csrf)

    let message: string
    if (data?.msg) {
      message = data.msg
    } else if (status === 0) {
      message = error.code === 'ECONNABORTED' ? '请求超时，请重试' : '网络连接失败，请检查网络后重试'
    } else if (status === 413) {
      message = '文件太大，请换一个更小的文件'
    } else if (status >= 500) {
      message = '服务器内部错误，请稍后重试'
    } else {
      message = `请求失败（HTTP ${status}）`
    }

    if (status === 401) unauthorizedHandler?.()

    return Promise.reject(new ApiError(message, data?.code ?? -1, status))
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

/** 以 blob 取回文件再触发浏览器下载 —— 走 axios 才有统一的错误处理。 */
export async function download(url: string, filename: string): Promise<void> {
  const response = await http.get<Blob>(url, { responseType: 'blob' })
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
