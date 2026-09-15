/** 全局反馈出口。
 *
 *  组件内直接用 Naive UI 的 useMessage()/useDialog()；
 *  这个 holder 是给拿不到 setup 上下文的地方兜底的（比如 axios 的 401 回调）。
 *  必须在 App.vue 的 provider 内部注册一次。
 */
import type { DialogApi, MessageApi } from 'naive-ui'

let messageApi: MessageApi | null = null
let dialogApi: DialogApi | null = null

export function registerFeedback(api: { message: MessageApi; dialog: DialogApi }): void {
  messageApi = api.message
  dialogApi = api.dialog
}

export const notify = {
  success(content: string): void {
    messageApi?.success(content)
  },
  error(content: string): void {
    messageApi?.error(content)
  },
  info(content: string): void {
    messageApi?.info(content)
  },
  warning(content: string): void {
    messageApi?.warning(content)
  },
}

export function confirmAction(options: {
  title: string
  content: string
  positiveText?: string
  negativeText?: string
  dangerous?: boolean
}): Promise<boolean> {
  if (!dialogApi) return Promise.resolve(window.confirm(`${options.title}\n${options.content}`))
  return new Promise((resolve) => {
    dialogApi!.warning({
      title: options.title,
      content: options.content,
      positiveText: options.positiveText ?? '确定',
      negativeText: options.negativeText ?? '取消',
      onPositiveClick: () => resolve(true),
      onNegativeClick: () => resolve(false),
      onClose: () => resolve(false),
      onMaskClick: () => resolve(false),
    })
  })
}
