/** 转场回执的单例状态 —— 与 composables/feedback.ts、route-veil.ts 同一个套路。
 *
 *  **每一次转场都出一条回执**：说清"刚才发生了什么 / 你现在去哪"。
 *  分两档，动效与权重匹配：
 *
 *    event  有结果的事件（登录成功、下单成功、撤回、发布公告…）——
 *           两层（黄承载带 + 数据带）、有停留、底边排空线，2.4 秒；
 *    pass   普通导航（点子页、点标签）—— **只有一层**、更薄、不停留，
 *           从右进、接着从左边出去，约 600ms 走完。
 *
 *  为什么分两档而不是都按 event 演：一次 2.4 秒的停留挂在每次点导航上，
 *  界面就成了老虎机 —— 高频动作要的是"一眼看见去哪"，不是"停下来看演出"。
 *  两档共用同一副结构与同一套语汇，只有权重不同。
 *
 *  状态收在这里、DOM 挂在 App.vue（Teleport 到 body）的原因见上一版：
 *  转场会换掉整棵布局树，挂在页面里的回执会在换手那一帧跟着旧树被卸载。
 */
import { readonly, ref } from 'vue'

export type ReceiptKind = 'event' | 'pass'

export interface Receipt {
  /** 等宽状态码：AUTHORIZATION SUCCESS / SECTOR 04 / ORDER SUBMITTED… */
  code: string
  /** 中文主文：认证成功 / 订单已提交 / 问题反馈… */
  title: string
  /** 可选补充：昵称（角色）、文件名、订单号 */
  detail?: string
  /** 目标页名，如「学生终端」 */
  target: string
}

const open = ref(false)
const kind = ref<ReceiptKind>('pass')
const receipt = ref<Receipt | null>(null)

/** 停留时长。event 够读完两行字（约 1.2s）又不至于挡着新页面干活；
 *  pass 只留一拍 —— 它本来就是"穿过去"，停久了就变成演出。 */
export const EVENT_HOLD_MS = 2400
export const PASS_HOLD_MS = 380

/** event 之后这段时间内，普通导航的回执要让位。
 *  登录成功会先出 event 回执、紧接着发生一次路由跳转；那次跳转也会想出一条 pass
 *  回执，而它说的正是同一件事 —— 拦掉它，别把刚打出来的回执顶掉。 */
const EVENT_SHIELD_MS = 3000

let timer: number | undefined
let eventShownAt = 0

/** 在根元素上留个记号，好让换场幕布的场记读数在回执期间让位。
 *  两条读数说的是同一件事（都报目标页），挤在同一条中线上只是噪音。
 *  传信号的方式与 data-veil-phase 同源（根属性）。 */
function mark(on: boolean): void {
  if (typeof document === 'undefined') return
  if (on) document.documentElement.dataset.receipt = ''
  else delete document.documentElement.dataset.receipt
}

function close(): void {
  if (timer !== undefined) {
    window.clearTimeout(timer)
    timer = undefined
  }
  open.value = false
  mark(false)
}

/** 出一条回执。event 优先级高于 pass：event 刚出过时，pass 会被丢掉。 */
export function showReceipt(next: Receipt, nextKind: ReceiptKind = 'pass', holdMs?: number): void {
  if (nextKind === 'pass' && Date.now() - eventShownAt < EVENT_SHIELD_MS) return

  const now = Date.now()
  if (nextKind === 'event') eventShownAt = now

  kind.value = nextKind
  receipt.value = next
  open.value = true
  mark(true)

  if (timer !== undefined) window.clearTimeout(timer)
  timer = window.setTimeout(
    () => close(),
    holdMs ?? (nextKind === 'event' ? EVENT_HOLD_MS : PASS_HOLD_MS),
  )
}

export function dismissReceipt(): void {
  close()
}

export const transitionReceipt = {
  open: readonly(open),
  kind: readonly(kind),
  receipt: readonly(receipt),
}
