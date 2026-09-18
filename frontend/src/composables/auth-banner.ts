/** 认证回执横幅的单例状态 —— 与 composables/feedback.ts、route-veil.ts 同一个套路。
 *
 *  为什么是单例而不是放在 LoginView 里：它要在**换场期间**活着。登录成功后立刻
 *  走 `router.replace()`，那是一次外壳换场（整棵布局被换掉），放在登录页里的横幅
 *  会在换手那一帧跟着旧树一起被卸载 —— 用户看到的是它刚滑进来半截就凭空消失。
 *  所以状态收在这里、DOM 挂在 App.vue（Teleport 到 body），跨路由不重建。
 *
 *  也没有放进 Naive 的 message：那是通用后台的吐司形状（圆角 + 投影 + 自动居中堆叠），
 *  而这套界面里每一件东西都有自己的形状（见 EmptyState.vue 顶部同样的理由）。
 */
import { readonly, ref } from 'vue'

export interface AuthReceipt {
  /** 登录后的昵称 */
  nickname: string
  /** 角色中文名，如「管理员」 */
  role: string
  /** 即将进入的页面名，如「学生终端」 */
  target: string
}

const open = ref(false)
const receipt = ref<AuthReceipt | null>(null)

/** 默认停留时长。够读完两行字（约 1.2s），又不至于挡着新页面干活。
 *  它是"回执"不是"通知"：不需要用户做任何事，所以到点自己退场，也没有关闭按钮 ——
 *  整层 pointer-events: none，它永远不会挡住任何点击。 */
const DEFAULT_HOLD_MS = 2400

let timer: number | undefined

/** 在根元素上留一个记号，好让换场幕布的场记读数在这 2.4 秒里让位。
 *  两条读数说的是同一件事（都报目标页），挤在同一条中线上只是噪音；
 *  而回执条是这一下的主角。用根属性传信号，与 data-veil-phase 是同一个套路。 */
function mark(on: boolean): void {
  if (typeof document === 'undefined') return
  if (on) document.documentElement.dataset.authBand = ''
  else delete document.documentElement.dataset.authBand
}

export function showAuthBanner(next: AuthReceipt, holdMs: number = DEFAULT_HOLD_MS): void {
  receipt.value = next
  open.value = true
  mark(true)
  if (timer !== undefined) window.clearTimeout(timer)
  timer = window.setTimeout(() => {
    timer = undefined
    open.value = false
    mark(false)
  }, holdMs)
}

/** 手动收起（目前只有"连点登录"这类重入场景需要，正常路径靠计时器）。 */
export function dismissAuthBanner(): void {
  if (timer !== undefined) {
    window.clearTimeout(timer)
    timer = undefined
  }
  open.value = false
  mark(false)
}

export const authBanner = {
  open: readonly(open),
  receipt: readonly(receipt),
}
