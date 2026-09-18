/** 转场回执的单例状态 —— 与 composables/feedback.ts、route-veil.ts 同一个套路。
 *
 *  **只给有结果的事件**：登录成功、下单成功、撤回、发布公告… 一条横贯全屏的带子，
 *  说清"刚才发生了什么、你现在去哪"，停留约 1.7 秒然后自己退场。
 *
 *  普通导航（点子页、点标签）**不走这里**：那条高频路径上的"去哪"由换场覆盖层自己
 *  在屏幕正中报出来（RouteVeil 的中心读数），屏幕中间不必再横着一条带子。
 *  曾经这里有个 pass 档专门管普通导航 —— 2026-09-18 撤掉了，两层意思的读数同时出现
 *  本来就是重复，而撤掉之后覆盖层才敢把停留放长到"读得完一行中文"。
 *
 *  状态收在这里、DOM 挂在 App.vue（Teleport 到 body）的原因：转场会换掉整棵布局树，
 *  挂在页面里的回执会在换手那一帧跟着旧树被卸载。
 */
import { readonly, ref } from 'vue'

export interface Receipt {
  /** 等宽状态码：AUTHORIZATION SUCCESS / ORDER SUBMITTED… */
  code: string
  /** 中文主文：认证成功 / 订单已提交… */
  title: string
  /** 可选补充：昵称（角色）、文件名、订单号 */
  detail?: string
  /** 目标页名，如「学生终端」 */
  target: string
}

const open = ref(false)
const receipt = ref<Receipt | null>(null)

/** 停留 1.7 秒：够读完两行字（进出场各 400/300ms，加上闪烁），
 *  又不至于挡着新页面干活。原来 2.4 秒被反馈"稍长"。 */
export const EVENT_HOLD_MS = 1700

let timer: number | undefined

/** 在根元素上留个记号，好让换场覆盖层的中心读数在回执期间让位。
 *  两条读数说的是同一件事（都报目标页），挤在同一个位置只是噪音。
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

/** 出一条回执。连出两条时后一条直接顶掉前一条（并重新计时）—— 带子只有一条，
 *  排队会让第二条在几秒后才说一件已经过去的事。 */
export function showReceipt(next: Receipt, holdMs?: number): void {
  receipt.value = next
  open.value = true
  mark(true)

  if (timer !== undefined) window.clearTimeout(timer)
  timer = window.setTimeout(() => close(), holdMs ?? EVENT_HOLD_MS)
}

export function dismissReceipt(): void {
  close()
}

export const transitionReceipt = {
  open: readonly(open),
  receipt: readonly(receipt),
}
