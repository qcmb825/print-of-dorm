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
 *  JS 侧刻意不读 prefers-reduced-motion：CSS 决定板条是否显示及全部时长，
 *  RouteVeil 只根据计算样式选择板条事件或根 WAAPI finished 作为收尾信号。
 *  少一处可能和 CSS 漂移的媒体查询状态。
 *  也正因为这里不依赖任何时长，全局那条 `transition-duration: 0.001ms !important`
 *  兜底不会把状态机压坏 —— 时长被压短只是让钩子更早回来，状态流转照旧。
 */
import { readonly, ref, watch } from 'vue'
import { whenRequestsIdle } from '@/api/client'

export type VeilPhase = 'idle' | 'out' | 'in'

/** shell = 登录 / 学生端 / 管理端之间的整壳切换；inline = 布局内子页之间。
 *  两档共用同一副结构、同一批类名，只有幅度与时长各降一档（见 tokens.css 的 --veil-*）。 */
export type VeilProfile = 'shell' | 'inline'

export interface VeilTarget {
  /** 等宽大写的代号：外壳档是 GUEST / STUDENT / STAFF，子页档是 SECTOR + meta.code */
  code: string
  /** 目标页名，中文 */
  title: string
  /** 巨号落版的拉丁代号（2026-11-23 百叶拼版换场新增）：外壳档是 STAFF / STUDENT / GUEST，
   *  子页档是 route.meta.en（ORDERS / METRICS…）—— 就是页面上那个出血幽灵字的同一支词。
   *  空串时场记板退化为只显示 code。 */
  word: string
}

const phase = ref<VeilPhase>('idle')
const profile = ref<VeilProfile>('inline')
const target = ref<VeilTarget>({ code: '', title: '', word: '' })

/** 本次 out 是不是「上一次换场还没走完就又点了一次」。 */
const reentrant = ref(false)

/** 重入发生的那一刻状态机停在哪个相位（'out' | 'in' | ''）。CSS 靠它分流：
 *  - 从 'out' 重入（数据等待中连点）：原有封屏动作继续，不重新播放；
 *  - 从 'in' 重入（板条正在让开时连点）：RouteVeil 捕获旧帧并连续收回拼版位，
 *    不重新扫入、不重播整块读数，只交叉切换目标文字；下一轮由 release 柔和揭开。 */
const reFrom = ref<'' | 'out' | 'in'>('')

let runSeq = 0
let enterDone = false
let exitDoneFlag = false
let watchdog: ReturnType<typeof setTimeout> | null = null

/** 兜底复位。正常路径由 settle（内容进场演完）+ exitDone（板条让开演完）双信号
 *  收尾（见 settle 的注释），这里只防意外路径：比如正在播的 enter 被一次新的
 *  leave 取消（走 onEnterCancelled 而不是 onAfterEnter，enterDone 就永远等不到）。
 *  那种情况下用户必然已经点了下一次导航 —— 新的一次 begin() 会重新计时并自行收尾，
 *  所以这个计时器存在的意义只是「万一」，给得比任何一档总时长都宽
 *  （生产最差：gate 540 + 等数据 800 + hold 480 + part 600 = 2.42s）。 */
const WATCHDOG_MS = 3000

/** 面板盖着屏、等新页面把首屏数据拿回来的上限（毫秒）。
 *
 *  为什么要有它、而不是「一直等到数据到」：接口慢起来是没底的（弱网、大列表），
 *  让用户对着一块盖着屏幕的面板等三秒，比「先揭开、让页面自己转圈」更糟 ——
 *  后者至少能看见页面骨架、知道自己在哪一页。
 *  取 800ms：本机与校园网的首屏请求都在 100ms 上下，这个数基本只在真的慢时才用满。
 *
 *  三幕本体子页 1.46s、外壳 1.62s，慢请求最多再等待 0.8s；
 *  即使触发等待上限，也仍低于 3s watchdog。 */
const DATA_WAIT_MAX_MS = 800

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

/** 等屏幕上那两层「盖住整屏」的东西都让开：开屏层（index.html 里的 #boot，
 *  让位之后会把自己从 DOM 摘掉）与换场幕布（相位回到 idle）。
 *
 *  给谁用：挂在内容树里、却必须在**所有层之上**出现的东西。QQ 引导弹窗就是撞上这一条的 ——
 *  NModal 的层级本来就压过幕布，于是它在开屏还没走完、幕布还盖着屏时浮到最前面，
 *  看着像「弹窗从黑幕里钻出来」。这没法靠排层级解决（要的就是它在幕布之上），
 *  只能等两层都让开再出现。
 *
 *  认的是 DOM 上的事实而不是事件：<html> 上的 data-veil-phase、以及 #boot 还在不在。
 *  与开屏层自己的做法一致（它轮询属性，因此不依赖谁先执行）。 */
export function whenScreenLayersIdle(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve()
  const root = document.documentElement
  const idle = () =>
    document.getElementById('boot') === null &&
    root.dataset.veilPhase !== 'out' &&
    root.dataset.veilPhase !== 'in'
  if (idle()) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const attrObserver = new MutationObserver(check)
    const bodyObserver = new MutationObserver(check)
    function check(): void {
      if (!idle()) return
      window.clearTimeout(cap)
      attrObserver.disconnect()
      bodyObserver.disconnect()
      resolve()
    }
    // 保险：正常路径上开屏层有自己的兜底摘除、幕布有 WATCHDOG_MS，两个信号都会到；
    // 万一某个没到，宁可让"等层让开"退化成"最多等这么久"，也不要让调用方永远悬着。
    const cap = window.setTimeout(() => {
      attrObserver.disconnect()
      bodyObserver.disconnect()
      resolve()
    }, WATCHDOG_MS)
    attrObserver.observe(root, { attributes: true, attributeFilter: ['data-veil-phase', 'data-boot'] })
    bodyObserver.observe(document.body, { childList: true })
  })
}

export function useRouteVeil() {
  /** @before-leave 调用。此刻 vue-router 已经提交了新路由（路由先落、组件后换），
   *  所以传进来的就是**要去哪**，不是从哪来 —— 场记板上写的是目标页名。
   *
   *  跨 shell 时旧 inline 在外壳离场结束前仍然挂载。RouteTransition 会先用 routeRoot
   *  排除它；这里再设一道仲裁：shell 在飞时拒绝迟到的 inline，且 shell 可以抢占旧 inline。
   *  返回 null 表示本次没有取得所有权，调用方的 open / settle / retarget 都必须保持静默。 */
  function begin(next: VeilProfile, nextTarget: VeilTarget): number | null {
    if (phase.value !== 'idle' && profile.value === 'shell' && next === 'inline') return null
    const id = ++runSeq
    reentrant.value = phase.value !== 'idle'
    reFrom.value = phase.value === 'idle' ? '' : phase.value
    enterDone = false
    exitDoneFlag = false
    profile.value = next
    target.value = nextTarget
    phase.value = 'out'

    disarmWatchdog()
    watchdog = setTimeout(() => {
      watchdog = null
      if (id === runSeq) {
        phase.value = 'idle'
        reentrant.value = false
        reFrom.value = ''
      }
    }, WATCHDOG_MS)

    return id
  }

  /** @after-leave 调用 —— 源码里 remove() 先跑、钩子后调，所以这一刻
   *  新树的 DOM 已经插进页面了，而它带的是 enter-from（透明）。
   *  面板此时已经盖到位，换手就发生在它后面。
   *
   *  **这里要等一下新页面的首屏数据**：面板盖着的时候，新页面的 onMounted 已经把
   *  请求发出去了（它们由 api/client.ts 统一计数），等这批请求落地再开幕，
   *  用户看到的就是「换场结束 = 内容已经在」；不等的话，面板扫开之后还要空一下、
   *  再自己填上，那一眼就是「这页有点卡」。
   *  等多久由 DATA_WAIT_MAX_MS 封顶，且**没有请求在飞时立刻放行**（绝大多数页面）。 */
  async function open(id: number): Promise<void> {
    if (id !== runSeq || phase.value !== 'out') return
    await whenRequestsIdle(DATA_WAIT_MAX_MS)
    // 等待期间可能又导航了一次、或者看门狗已经复位：那就别再推进了
    if (id !== runSeq || phase.value !== 'out') return
    phase.value = 'in'
  }

  /** @after-enter 调用 —— 标记「内容进场演完」。这只是收尾的两个条件之一：
   *  另一个是覆盖层自己让开演完（首轮等待实际板条过渡，重入等待显式 release 动画，
   *  减少动效首轮等待根淡出、重入等待根 WAAPI finished；RouteVeil 据以调用 exitDone()）。两个都齐了才回 idle。
   *
   *  为什么不能再让 after-enter 单独收尾：等数据（DATA_WAIT_MAX_MS）一旦超过
   *  hold+part，after-enter 会在**板条还盖着屏**的 out 相位里提前到来，
   *  此时回 idle 会让 [data-phase='in'] 的规则整片脱落 —— 板条带着基类的
   *  过渡时长**向左弹回起点**，而不是向右让开。2026-11-23 拍帧实测抓到现场。 */
  function settle(id: number): void {
    if (id !== runSeq || phase.value === 'idle') return
    enterDone = true
    tryFinalize()
  }

  /** RouteVeil 在「让开」演完时调用（首轮的实际板条 transform 过渡结束、
   *  重入的显式 release 动画结束，或减少动效下根元素的首轮淡出／重入 WAAPI 完成）。
   *  时长均由 CSS 驱动，不在这里另抄一份毫秒数。 */
  function exitDone(): void {
    if (phase.value !== 'in') return
    exitDoneFlag = true
    tryFinalize()
  }

  function tryFinalize(): void {
    if (!enterDone || !exitDoneFlag || phase.value !== 'in') return
    disarmWatchdog()
    phase.value = 'idle'
    reentrant.value = false
    reFrom.value = ''
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
  function retarget(id: number, next: VeilProfile, nextTarget: VeilTarget): void {
    // 本实例 still inFlight 不等于它仍拥有全局 run：shell 可能已经抢走了跨布局导航。
    if (id !== runSeq || phase.value === 'idle') return
    profile.value = next
    target.value = nextTarget
  }

  return {
    phase: readonly(phase),
    profile: readonly(profile),
    target: readonly(target),
    reentrant: readonly(reentrant),
    reFrom: readonly(reFrom),
    begin,
    open,
    settle,
    exitDone,
    retarget,
  }
}
