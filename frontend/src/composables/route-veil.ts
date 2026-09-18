/** 换场覆盖层（RouteVeil）的单例状态机 —— 模块级单例，与 composables/feedback.ts 同一个套路。
 *
 *  为什么是单例：RouteTransition 在三个地方用（App 外壳、学生端布局、管理端布局），
 *  如果每个宿主各自渲染一份覆盖层，跨布局过场时会有两三层全屏 fixed 互相叠加，
 *  同一时刻可能出现两层面板、两条读数。所以状态收在这里，覆盖层只在 App.vue 渲染一次。
 *
 *  状态机只有三态：idle → out（面板滑到盖住）→ in（停留、换手、开幕）→ idle。
 *  推进全靠 Vue 的过渡钩子（before-leave / after-leave / after-enter），
 *  这里**不放任何驱动动画的定时器** —— 时长只有 tokens.css 一份事实来源，
 *  改令牌不用改这里，也不会出现"CSS 改了 100ms、JS 没跟"的错位。
 *
 *  JS 侧刻意不读 prefers-reduced-motion：减少动效下的降级完全由 CSS 承担
 *  （面板整层不出现、只留一次缓慢的明暗过渡）。少一处可能和 CSS 漂移的状态。
 *  也正因为这里不依赖任何时长，全局那条 `transition-duration: 0.001ms !important`
 *  兜底不会把状态机压坏 —— 时长被压短只是让钩子更早回来，状态流转照旧。
 */
import { readonly, ref, watch } from 'vue'

export type VeilPhase = 'idle' | 'out' | 'in'

/** shell = 登录 / 学生端 / 管理端之间的整壳切换；inline = 布局内子页之间。
 *  两档共用同一副结构、同一批类名，只有幅度与时长各降一档（见 tokens.css 的 --veil-*）。 */
export type VeilProfile = 'shell' | 'inline'

export interface VeilTarget {
  /** 等宽大写的代号：外壳档是 GUEST / STUDENT / STAFF，子页档是 SECTOR + meta.code */
  code: string
  /** 目标页名，中文 */
  title: string
}

const phase = ref<VeilPhase>('idle')
const profile = ref<VeilProfile>('inline')
const target = ref<VeilTarget>({ code: '', title: '' })

/** 本次 out 是不是「上一次换场还没走完就又点了一次」。
 *  重入时不能再留那一段空拍（--veil-latch）：面板多半已经滑到半路，
 *  再等 120ms 就是一次肉眼看得见的卡顿。它只在一次完整换场的开头有意义 ——
 *  那一下是留给「旧页先自己淡掉一点」的。 */
const reentrant = ref(false)

let runSeq = 0
let watchdog: ReturnType<typeof setTimeout> | null = null

/** 兜底复位。正常路径永远由 @after-enter 收尾，这里只防一种情况：
 *  正在播的 enter 被一次新的 leave 取消（Vue 的 leave() 会先取消同元素的 enter），
 *  取消走的是 onEnterCancelled 而不是 onAfterEnter，settle() 就永远不会被调用。
 *  那种情况下用户必然已经点了下一次导航 —— 新的一次 begin() 会重新计时并自行收尾，
 *  所以这个计时器存在的意义只是「万一」，给得比任何一档总时长都宽。 */
const WATCHDOG_MS = 3000

function disarmWatchdog(): void {
  if (watchdog !== null) {
    clearTimeout(watchdog)
    watchdog = null
  }
}

// 把换场相位镜像到 <html> 的 data-veil-phase 上。
// 装饰元素（刻度尺、水印、斜切块）用它挂"切页时动起来"的动效 —— 换场覆盖层那三个
// data-* 挂在 body 上的 .route-veil 上，装饰元素在内容树里，够不到它，只能借 html 传。
if (typeof document !== 'undefined') {
  watch(phase, (v) => {
    document.documentElement.dataset.veilPhase = v
  })
}

export function useRouteVeil() {
  /** @before-leave 调用。此刻 vue-router 已经提交了新路由（路由先落、组件后换），
   *  所以传进来的就是**要去哪**，不是从哪来 —— 场记板上写的是目标页名。 */
  function begin(next: VeilProfile, nextTarget: VeilTarget): number {
    const id = ++runSeq
    reentrant.value = phase.value !== 'idle'
    profile.value = next
    target.value = nextTarget
    phase.value = 'out'

    disarmWatchdog()
    watchdog = setTimeout(() => {
      watchdog = null
      if (id === runSeq) {
        phase.value = 'idle'
        reentrant.value = false
      }
    }, WATCHDOG_MS)

    return id
  }

  /** @after-leave 调用 —— 源码里 remove() 先跑、钩子后调，所以这一刻
   *  新树的 DOM 已经插进页面了，而它带的是 enter-from（透明）。
   *  面板此时已经盖到位，换手就发生在它后面。 */
  function open(id: number): void {
    if (id !== runSeq || phase.value !== 'out') return
    phase.value = 'in'
  }

  /** @after-enter 调用。Vue 的 getTimeout() 算的是 max(duration + delay)，
   *  而内容层的 transition-delay 就是 --veil-hold，所以这一刻恰好等于
   *  「停留 + 开幕」走完的那一帧，和面板滑到屏外同帧。 */
  function settle(id: number): void {
    if (id !== runSeq) return
    disarmWatchdog()
    phase.value = 'idle'
    reentrant.value = false
  }

  /** 换场进行中又导航了一次时，把场记读数改写到新的目标上。
   *
   *  为什么需要它：out-in 期间 BaseTransition 的 render 开头就 `if (state.isLeaving) return`，
   *  直接返回占位 —— 既不起第二次 leave，也不会再调 onBeforeLeave，所以 begin() 不会被
   *  再调一次，target 会停在第一次的值上。但父组件的这次重渲染已经把新的 transition-key
   *  写进了 props，换手时挂上的是**最新**那棵树。于是屏幕上写着 A、面板后面出现的是 B，
   *  而 settle() 照样用同一个 runId 正常收尾、不报错 —— 错误只体现在读数上。
   *
   *  只在换场进行中生效（idle 时由紧接着的 begin() 写正确值，这里插手反而会写早一步）。 */
  function retarget(next: VeilProfile, nextTarget: VeilTarget): void {
    if (phase.value === 'idle') return
    profile.value = next
    target.value = nextTarget
  }

  return {
    phase: readonly(phase),
    profile: readonly(profile),
    target: readonly(target),
    reentrant: readonly(reentrant),
    begin,
    open,
    settle,
    retarget,
  }
}
