/** 微动态：指针视差。
 *
 *  三条纪律，每一条都是这类效果最常翻车的地方：
 *
 *  1. **减少动效下完全不启动。** 不是把位移调小，是不装监听器、不写变量。
 *     视差是"大面积缓慢位移"，正是前庭敏感最主要的一类触发器 ——
 *     MDN 与 A List Apart 都点名了它（"moves an object across a large amount of space"）。
 *  2. **触屏不出视差。** 只在 `(hover: hover) and (pointer: fine)` 上装：触屏没有指针悬停，
 *     装了只会在点按时抖一下，纯属噪声。
 *  3. **JS 只写 CSS 变量，位移交给 CSS 的 calc()。** 位移全程走 transform（合成属性），
 *     不触发重排；"谁动多少"由各元素自己的 `--depth` 决定，JS 只管"指针在哪"。
 *
 *  ── 平滑（2026-09-18 重做）──────────────────────────────────────────
 *  第一版是"JS 逐帧写目标值 + CSS 上挂一条 280ms 的 transform 过渡"。看着能用，
 *  但那是**两层错配**的平滑：
 *    · CSS 的过渡每帧都被一个新的目标值重新触发，等于每帧从"快起步、慢收尾"
 *      重来一次，尾段永远走不完 —— 观感是发涩的追赶，不是滑；
 *    · 它的实际响应取决于**指针事件的频率**：60Hz 屏和 120Hz 屏上手感不同，
 *      鼠标换成触控板（事件密度不同）也不同。这不是"平滑"，是"碰运气"。
 *  现在改成只由 JS 做**帧率无关的指数阻尼**：每帧按真实 dt 走掉剩余的
 *  `1 - e^(-dt/τ)`。掉帧时一步走得多一点，补得回来；与事件频率无关；
 *  指针停下后还会自己滑一小段再停住（这就是"不生硬"的来源）。
 *  CSS 那条 transition 随之删掉 —— 两层平滑叠在一起只会互相打架。
 */

import { onBeforeUnmount, ref, watch, type Ref } from 'vue'

/** 系统是否要求减少动效。**响应式**：用户可以在会话中途改系统设置，
 *  所以必须监听 change，不能只读一次 .matches（那会让设置改了也不生效）。 */
export const prefersReducedMotion = ref(false)

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches
    // 从"减少"切回"正常"时把变量归零，避免残留一个非零位移冻在那里
    if (e.matches) {
      document.documentElement.style.removeProperty('--px')
      document.documentElement.style.removeProperty('--py')
    }
  })
}

/** 指针 → 平滑位移的时间常数（ms）。走完约 63% 用这么久，95% 约 3τ=660ms。
 *  180 以内显得"黏"，300 以上会迟钝到像是页面在拖 —— 220 是"跟得上但不停顿"的一档，
 *  也正好在"指针停了之后还能滑一小段"的可感知区间里。 */
const TAU_MS = 220

/** 纵向增益。指针在竖直方向的实际可动范围通常比横向小（浏览器 chrome、
 *  任务栏、以及人手臂的横向行程更长），同一套幅度铺到纵向会显得更晃。
 *  0.72 是让两个方向的**角速度**看起来一致的经验值。 */
const GAIN_Y = 0.72

/** 判定"已经到位"的阈值（归一化单位，1 约等于半个视口）。低于它就直接吸附到目标
 *  并停掉 rAF —— 不停的话，指针静止时每帧仍在写两个 CSS 变量、
 *  让整棵子树里的 [data-parallax] 反复重算样式，纯属白烧电。 */
const SETTLED = 0.0008

/** 单帧 dt 上限（ms）。标签页切走再回来、或主线程卡了一下，dt 可能是几百毫秒；
 *  按真实 dt 算出的 k 会接近 1，位移一步到位 —— 那正好是一次可见的"跳"。
 *  封到 64ms（约 15fps 的帧）之后，最坏情况也只是一次较快的滑动。 */
const MAX_DT = 64

/** 把指针位置归一化成 -1~1、做指数阻尼平滑，再写进 `--px` / `--py`。
 *  元素侧的位移幅度由各自的 `--depth` 与全局 `--parallax-gain` 决定
 *  （见 base.css 的 [data-parallax]）—— 这样"谁动多少"是 CSS 的事，
 *  JS 只管"指针在哪、平滑到哪了"。 */
export function usePointerParallax(): void {
  if (typeof window === 'undefined') return
  // 减少动效 / 触屏：直接不装（纪律 1、2）
  if (prefersReducedMotion.value || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return
  }

  const root = document.documentElement
  // 目标（指针在哪）与当前值（平滑到哪了）分开存：这是这套平滑的全部秘密，
  // 合并成一个变量就只能"直接赋值"，也就是第一版那种生硬跟随。
  let tx = 0
  let ty = 0
  let cx = 0
  let cy = 0
  let raf = 0
  let last = 0

  function write(): void {
    root.style.setProperty('--px', cx.toFixed(4))
    root.style.setProperty('--py', cy.toFixed(4))
  }

  function frame(now: number): void {
    // 第一帧没有上一帧时间，按 60fps 的一帧估：写成 0 会让 k=0，那一帧原地不动
    const dt = last ? Math.min(now - last, MAX_DT) : 16
    last = now

    const k = 1 - Math.exp(-dt / TAU_MS)
    cx += (tx - cx) * k
    cy += (ty - cy) * k

    if (Math.abs(tx - cx) < SETTLED && Math.abs(ty - cy) < SETTLED) {
      // 到位就吸附 + 停表。不吸附的话会留下一个永远够不着的尾数，
      // 循环也就永远停不下来。
      cx = tx
      cy = ty
      raf = 0
      last = 0
    } else {
      raf = requestAnimationFrame(frame)
    }

    write()
  }

  function start(): void {
    if (!raf) raf = requestAnimationFrame(frame)
  }

  function onMove(e: PointerEvent): void {
    tx = (e.clientX / window.innerWidth) * 2 - 1
    ty = ((e.clientY / window.innerHeight) * 2 - 1) * GAIN_Y
    start()
  }

  /** 指针离开窗口 / 窗口失焦：滑回中位，而不是冻在离开时的那个位置。
   *  冻住的话，用户切走再回来会发现装饰还歪着一侧 —— 那时指针已经不在那里了。 */
  function recenter(): void {
    tx = 0
    ty = 0
    start()
  }

  /** relatedTarget 为空 = 真的离开了文档，而不是在元素之间移动。 */
  function onOut(e: PointerEvent): void {
    if (!e.relatedTarget) recenter()
  }

  function onVisibility(): void {
    if (document.visibilityState === 'hidden') recenter()
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  window.addEventListener('pointerout', onOut, { passive: true })
  window.addEventListener('blur', recenter)
  document.addEventListener('visibilitychange', onVisibility)

  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    window.removeEventListener('pointerout', onOut)
    window.removeEventListener('blur', recenter)
    document.removeEventListener('visibilitychange', onVisibility)
    if (raf) cancelAnimationFrame(raf)
    root.style.removeProperty('--px')
    root.style.removeProperty('--py')
  })
}

/** 数值变化反馈：被观察的值**真的变了**才亮一下，亮的是数字自己。
 *
 *  三条与"别把它做成定时闪烁"直接相关的设计：
 *
 *  1. **只在变化时触发**，不按时间触发。看板每 20 秒轮询一次，如果按"刷新了"就亮，
 *     那每隔 20 秒全屏的格子一起眨一下 —— 那是最糟的一类动效（无信息、有干扰、
 *     还停不下来）。这里看的是值本身，没变就什么都不发生。
 *  2. **用 class 切换 + transition，不用 animation。** 同一批元素上已经有
 *     .motion-stagger 挂着 animation-delay，再来一条 animation 会互相顶掉
 *     （同属性、同时长、后写的赢），表现成"要么不跳、要么入场延迟失效"。
 *     transition 走的是另一条通道，两者可以共存。
 *  3. **减少动效下直接不跳。** 这条反馈是锦上添花（数字已经变了），
 *     不值得为它破一次纪律 —— 不是"跳小一点"。
 *
 *  用法：`const ticking = useValueTick(() => props.value)`，
 *  然后把 `.value-tick--on` 按需挂到数字元素上。
 */
export function useValueTick(
  source: () => unknown,
  { holdMs = 420, skipFirst = true }: { holdMs?: number; skipFirst?: boolean } = {},
): Ref<boolean> {
  const ticking = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  let seen = 0

  watch(source, () => {
    // 首次变化是**数据到达**（占位值 → 真实值），不是"更新"。这一跳的语义是
    // "你正在看的这个数变了"，而第一次有值时还没有"你正在看的"那个数 ——
    // 让它在骨架屏收尾时再闪一下，读到的是"页面在抖"。
    seen += 1
    if (skipFirst && seen === 1) return
    if (prefersReducedMotion.value) return
    ticking.value = true
    if (timer !== undefined) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
      ticking.value = false
    }, holdMs)
  })

  onBeforeUnmount(() => {
    if (timer !== undefined) clearTimeout(timer)
  })

  return ticking
}
