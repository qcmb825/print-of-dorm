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

import { onBeforeUnmount, onMounted, ref, watch, type Ref } from 'vue'

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

/** 打字机的字间间隔（ms）。
 *
 *  这个值不进 tokens.css：它不是"过渡时长"，没有一条 CSS 曲线能表达"每 24ms 落一个字"。
 *  24ms 是等宽字体下一眼能看出"在敲"、又不至于慢到要等的档位 —— 再快就是瞬间出现，
 *  再慢（40ms 以上）一行 20 字的读数要 800ms，读者会先失去耐心。
 *
 *  **它不是动画时长**，所以不适用 tokens.css 里"交互反馈 < 200ms"那条规矩：
 *  整行打完的时长由字数决定，语义是"这条读数正在被写入"。 */
export const TYPE_MS = 24

/** 逐字打出文本。用于**编号读数**这类短、等宽、语义是"被写进去"的字符串。
 *
 *  三条边界，都是这套语言里已经定过的：
 *  1. **只给编号读数用**（空态编号、试算金额）。正文、表单标签、订单号一律不用 ——
 *     那些是要读准的东西，打字过程会把它们短暂变成不可读的残字。
 *  2. 减少动效下**直接给全量文本**，不是"打快一点"。位移和闪烁都撤掉，
 *     但"这段文字存在"这件事必须立刻成立。
 *  3. 值变化时从头打。同一时刻只有最后一次运行有效（run 号闸门）——
 *     轮询/防抖让源值连变时，旧的那次必须当场作废，否则两行字会叠在一起。
 */
export function useTypewriter(
  source: () => string,
  { skipFirst = false, typeMs = TYPE_MS }: { skipFirst?: boolean; typeMs?: number } = {},
): { text: Ref<string>; typing: Ref<boolean> } {
  const text = ref('')
  const typing = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined
  let run = 0
  let seen = 0

  function stop(): void {
    if (timer !== undefined) {
      clearTimeout(timer)
      timer = undefined
    }
    typing.value = false
  }

  function play(value: string): void {
    stop()
    run += 1
    const id = run
    if (prefersReducedMotion.value) {
      text.value = value
      return
    }
    typing.value = true
    text.value = ''
    let i = 0
    const step = (): void => {
      if (id !== run) return
      i += 1
      text.value = value.slice(0, i)
      if (i < value.length) {
        timer = setTimeout(step, typeMs)
      } else {
        timer = undefined
        typing.value = false
      }
    }
    timer = setTimeout(step, typeMs)
  }

  watch(
    source,
    (value) => {
      seen += 1
      // skipFirst：首次是"数据到达"，不是"数据更新"。与 useValueTick 同一口径 ——
      // 骨架屏收尾时打一遍字，读到的是"页面在抖"。
      if (skipFirst && seen === 1) {
        stop()
        text.value = value
        return
      }
      play(value)
    },
    { immediate: true },
  )

  onBeforeUnmount(stop)

  return { text, typing }
}

/** 断路器跳闸后的复位时间（ms）。要盖住最长的那一段跳闸动画（斜纹带 + 边框闪），
 *  否则类会在动画中途被摘掉，读到的是"闪了一下就没了"。 */
const TRIP_MS = 600

/** 断路器跳闸：**一次性**的错误反馈，取代通用的 shake。
 *
 *  `trip()` 只置一个布尔，视觉全在 CSS（`.trip--on`）。连续失败时每次都重播 ——
 *  跳闸是"这一下坏了"，不是"一直坏着"，所以它必须每次都能重新触发。
 *  减少动效下不置位：错误本身由文案与颜色承担，动画只是加粗。
 *
 *  重播**不靠 rAF 切类**：那种写法在 rAF 被冻结的环境里一次都不播（不报错）。
 *  这里改成：置位后直接用 WAAPI 在宿主上跑一遍，动画本身不依赖 rAF 调度。
 *  类名仍然保留，因为斜纹带是伪元素画的 —— WAAPI 碰不到伪元素，
 *  所以那条带子走 CSS transition（transition 由样式引擎驱动，不靠 rAF）。
 */
export function useBreakerTrip(): {
  tripped: Ref<boolean>
  trip: (host?: HTMLElement | null) => void
} {
  const tripped = ref(false)
  let timer: ReturnType<typeof setTimeout> | undefined

  function trip(host?: HTMLElement | null): void {
    if (prefersReducedMotion.value) return
    if (timer !== undefined) clearTimeout(timer)
    // 先归零再在**同步的下一拍**置位：同一帧内 true→true 不会重播 transition，
    // 必须真的经历一次 false。用微任务而不是 rAF —— 后者在后台会停。
    tripped.value = false
    void Promise.resolve().then(() => {
      tripped.value = true
    })
    // 边框闪一下（伪元素之外的那一圈）。WAAPI 在这里可用，且不依赖 rAF。
    if (host && typeof host.animate === 'function') {
      host.animate(
        [{ borderColor: 'var(--err)' }, { borderColor: '' }],
        { duration: 240, easing: 'ease-out' },
      )
    }
    timer = setTimeout(() => {
      timer = undefined
      tripped.value = false
    }, TRIP_MS)
  }

  onBeforeUnmount(() => {
    if (timer !== undefined) clearTimeout(timer)
  })

  return { tripped, trip }
}

/** 数据回响：轮询拿到**变了的数据**时，让页面上那几件装饰动一次。
 *
 *  与换场回响（`:root[data-veil-phase='out']`）是同一套动画、不同的触发通道：
 *  切页时"整页换了一口气"，数据更新时"有货进来了"。两条通道各自独立，
 *  同时发生也只是各播各的（不同属性、不同元素集合，不互相顶掉）。
 *
 *  实现上靠**类名的移除 → 同步的下一拍加回**强制重播。不能只靠 data-* 属性赋值：
 *  属性值变了但选择器始终匹配时，CSS 动画不会重新开始。
 *  用微任务而不是 rAF：后者在后台标签页里会停，而数据回响最常发生的时刻
 *  恰好就是"用户切回来、页面刚刷新"那一拍。
 *  减少动效下直接不挂 —— 这是纯装饰，没有它信息一字不少。
 */
const PULSE_CLASS = 'decor-pulse'
let pulseTimer: ReturnType<typeof setTimeout> | undefined

export function pulseDecor(): void {
  if (typeof document === 'undefined' || prefersReducedMotion.value) return
  const root = document.documentElement
  root.classList.remove(PULSE_CLASS)
  if (pulseTimer !== undefined) clearTimeout(pulseTimer)
  void Promise.resolve().then(() => {
    root.classList.add(PULSE_CLASS)
  })
  pulseTimer = setTimeout(() => {
    pulseTimer = undefined
    root.classList.remove(PULSE_CLASS)
  }, 400)
}

/** 刀架滑轨：一件共享的激活指示器沿导航滑到当前项（见 base.css 的 .nav-slider）。
 *
 *  为什么不让每项自己亮：逐项各自的缩放读起来是"两件东西各自动了一下"；
 *  一整条滑过去读起来才是"刀架换位"——一个机构，一次移动。
 *
 *  **几何全部走 transform**：滑块保持 1px 的基准尺寸，用 scaleX/scaleY 撑到目标长度，
 *  长度变化也只是合成属性（写 width/height 过渡会每帧 layout）。
 *  厚度恒定由 CSS 保证（只缩放长轴），所以这里不用管。
 *
 *  测量时机有三处，缺一不可：
 *  1. 路由变化后（nextTick）—— 激活项换了；
 *  2. 字体加载完（fonts.ready）—— 中文字体晚到会把导航项撑宽，滑块长度就短了；
 *  3. 容器尺寸变化（ResizeObserver）—— 窗口缩放、窄屏抽屉开合。
 *  另外滚动容器是 sticky（StaffLayout）或页面滚回顶部（router 的 scrollBehavior），
 *  两者都不改变 offsetTop/offsetLeft 的参照，所以滚动不需要重新测量。
 *
 *  减少动效下**仍然定位**，只是 CSS 把过渡关掉（滑块直接跳到目标）。
 *  它是"当前在哪一页"的指示，不是装饰 —— 没有它导航就少一个线索。
 */
export function useNavSlider(
  container: Ref<HTMLElement | null>,
  /** 会随导航变化的**依赖源**（路由路径 / 回退后的栏目路径）。
   *  它只负责"什么时候该重新量"，不负责选元素 —— 早期版本把选择器函数当成
   *  watch 的源，而那个函数返回的是常量字符串，永远不触发，滑块只会停在首帧位置，
   *  不报错、看起来"能用"（每次都是硬跳）。 */
  activeKey: () => unknown,
  { vertical = false, selector = '.nav-link--active' }: { vertical?: boolean; selector?: string } = {},
): void {
  const slider = ref<HTMLElement | null>(null)
  let first = true
  let ro: ResizeObserver | undefined

  function place(): void {
    const host = container.value
    const bar = slider.value
    if (!host || !bar) return
    const target = host.querySelector<HTMLElement>(selector)
    if (!target) {
      bar.style.opacity = '0'
      return
    }
    bar.style.opacity = '1'
    const x = target.offsetLeft
    const y = target.offsetTop
    // 纵向导航：滑块是 2px 宽、1px 高，scaleY 拉到项高，1px 的基准被放大到目标高度；
    // 横向导航同理反过来。厚度那一轴不参与缩放。
    const length = vertical ? target.offsetHeight : target.offsetWidth
    bar.style.transform = `translate3d(${x}px, ${y}px, 0) scale${vertical ? 'Y' : 'X'}(${length})`
    if (first) {
      bar.dataset.first = 'true'
      // 首帧定位不加过渡（理由见 base.css 的 .nav-slider），下一帧再放开。
      // 两条兜底并存：rAF 在个别环境（内嵌 WebView、后台标签页）不跑，
      // 只挂 rAF 的话 data-first 会永远留着，滑块从此再也不会滑 ——
      // 而它看起来仍然"能定位"，只是每次都是硬跳，不报错。
      const release = (): void => {
        if (!bar.isConnected) return
        delete bar.dataset.first
        first = false
      }
      requestAnimationFrame(release)
      setTimeout(release, 80)
    }
  }

  onMounted(() => {
    const host = container.value
    if (!host) return
    // 滑块由 JS 建、插在导航容器的第一个子节点之前 —— 不放进模板，
    // 因为三处导航（横向顶栏 / 纵向侧栏 / 底部标签栏）结构完全不同，
    // 模板里各写一份等于三份重复的几何宿主。
    const bar = document.createElement('span')
    bar.className = 'nav-slider'
    bar.dataset.orientation = vertical ? 'vertical' : 'horizontal'
    bar.setAttribute('aria-hidden', 'true')
    host.appendChild(bar)
    slider.value = bar
    place()

    // 字体晚到会把项撑宽：fonts.ready 之后重量一次。
    void document.fonts?.ready.then(place)
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(place)
      ro.observe(host)
    }
  })

  watch(activeKey, () => {
    // 先同步量一次（激活类在同一个 tick 里就落好了），再等一帧重量一次：
    // 窄屏抽屉里的导航要等它渲染出来才量得准。
    // 两条路径并存是刻意的 —— rAF 在后台标签页里不跑，只挂 rAF 的话
    // 切回前台时滑块会停在上一个位置，直到下一次导航才纠正。
    place()
    requestAnimationFrame(place)
    setTimeout(place, 90)
  })

  onBeforeUnmount(() => {
    ro?.disconnect()
    slider.value?.remove()
  })
}


