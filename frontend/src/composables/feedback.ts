/** 全局反馈出口。
 *
 *  组件内直接用 Naive UI 的 useMessage()/useDialog()；
 *  这个 holder 是给拿不到 setup 上下文的地方兜底的（比如 axios 的 401 回调）。
 *  必须在 App.vue 的 provider 内部注册一次。
 */
import type { DialogApi, MessageApi, MessageOptions } from 'naive-ui'

let messageApi: MessageApi | null = null
let dialogApi: DialogApi | null = null

/** 读屏专用的 aria-live 区域。
 *
 *  Naive UI 的消息（.n-message）产物里没有 role="alert"/aria-live，provider 也没开放
 *  任何相关属性，所以读屏用户收不到「保存成功/失败」这类反馈。这里补一个隐藏的 live
 *  region，每次出消息时同步更新文本。
 *
 *  之所以能在这里集中处理：所有消费者拿到的都是 provider 注入的**同一个** message
 *  实例（组件里 useMessage() 返回的就是它），在注册处包一层就覆盖了全站。 */
let liveRegion: HTMLElement | null = null

function ensureLiveRegion(): HTMLElement {
  if (liveRegion) return liveRegion
  liveRegion = document.createElement('div')
  liveRegion.setAttribute('role', 'status')
  liveRegion.setAttribute('aria-live', 'polite')
  liveRegion.setAttribute('aria-atomic', 'true')
  // 视觉上不可见但仍留在无障碍树里：clip 而不是 display:none，后者会把节点
  // 一起移出读屏的可见范围，播报也就没了。
  liveRegion.style.cssText =
    'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0'
  document.body.appendChild(liveRegion)
  return liveRegion
}

/** 先清空再写入，并隔一小拍：连续两条相同文本时，读屏不会重播未变化的节点。 */
let liveRegionTimer: ReturnType<typeof setTimeout> | null = null
function announce(text: string): void {
  const el = ensureLiveRegion()
  el.textContent = ''
  if (liveRegionTimer !== null) clearTimeout(liveRegionTimer)
  liveRegionTimer = setTimeout(() => {
    el.textContent = text
    liveRegionTimer = null
  }, 100)
}

export function registerFeedback(api: { message: MessageApi; dialog: DialogApi }): void {
  messageApi = api.message
  dialogApi = api.dialog

  // 把四个会「报结果」的方法各包一层，附加读屏播报。
  // 直接改这个共享实例的属性即可生效：调用方是 message.success(...)，
  // 属性在调用那一刻才查表，不是解构走了原函数。
  const raw = {
    success: api.message.success,
    error: api.message.error,
    info: api.message.info,
    warning: api.message.warning,
  }
  for (const kind of ['success', 'error', 'info', 'warning'] as const) {
    api.message[kind] = ((content: string, option?: MessageOptions) => {
      announce(content)
      return raw[kind].call(api.message, content, option)
    }) as MessageApi[typeof kind]
  }
}

export const notify = {
  // 这四个只管「有没有 provider」；读屏播报已经由上面那层包办，
  // 在这里再播一次会重复。
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
