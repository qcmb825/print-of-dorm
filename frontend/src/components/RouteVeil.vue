<script setup lang="ts">
/** 换场覆盖层：「百叶拼版 · 巨号落版」（2026-11-23 重设计）。
 *
 *  五条斜切百叶板从左向右**错峰咬合**封屏（每条前缘带琥珀扫描边），盖死的那一帧
 *  整版纹理（48px 网格 + 十字准星）压上来，屏幕正中完成一次「落版」：
 *  纸白窄体巨号词从下方浮起、字距收紧，琥珀斜梁从左扫过它的下三分之一，
 *  四角十字准星钉版，底部细线随版式就位微亮 —— 然后百叶板沿同一方向依次让开。
 *  「单向穿过」的骨架不变：出相位封屏（那一帧就是 DOM 换手帧），入相位同向滑走，
 *  全屏被遮死的窗口只有换手前后那一小段。
 *
 *  全站只有一个实例，挂在 App.vue 里 <RouterView> 的兄弟位置，并 Teleport 到 body。
 *  三个约束共同决定了它必须在这儿，一个都不能松：
 *
 *  1. 不能放进任何 .route-stage。stage 上有 isolation:isolate，层叠上下文会把 z-index
 *     关在里面 —— 写 z-index: 99999 也压不住 stage 外那三条 z-20 的 sticky/fixed 导航；
 *     而且 stage 一旦被加了 transform，fixed 底栏的包含块就变了。
 *  2. 不能放进 <Transition> 的被交换节点里。out-in 在离场结束时销毁旧节点，
 *     覆盖层会跟着旧树一起消失，面板在换场演到一半时凭空不见，比不做还糟。
 *  3. 必须挂到 body，不在 #app 内：这样它不受 app 里任何 transform/filter 影响。
 *
 *  z-index: 100 —— 正好落在 (布局 chrome 的 20, Naive 弹层最低的 2000) 之间。
 *  高过 2000 会盖住 NDrawer/NDialog（vdirs 的 z-index 从 2000 递增）、loading bar(5999)、
 *  message(6000)，用户就看不到「下单成功」和「确认退出」了，这是功能性事故。
 *
 *  这一层永远挂在 DOM 里，靠 [data-phase] 切状态、靠 visibility 收掉。
 *  不用 v-if：一是 v-if 每次重挂都拿不到「从屏外滑进来」的那条过渡（初始样式即终态，
 *  不产生 transition）；二是快速连点时重建节点会让面板跳回屏外重播。
 *  也不能用 display:none —— 那会让过渡彻底不跑。
 *  连点重入不再整屏重播：从 out 重入沿用当前封屏，从 in 重入先捕获每片板条的
 *  实际计算位置，再由 WAAPI 连续收回拼版位；目标词与页名有各自的淡出、淡入。
 *  随后由独立的 release 动画柔和揭开并给出确定的完成信号。
 */
import { onBeforeUnmount, onBeforeUpdate, onUpdated, ref, watch } from 'vue'
import { useRouteVeil } from '@/composables/route-veil'

// 解构出来是顶层 ref，模板里自动解包；readonly 的那几个只读不写。
const { phase, profile, target, reentrant, reFrom, exitDone } = useRouteVeil()

/** 这一相位里是否还有实际运行的板条动作。
 *  常规场次是 transform transition；普通重入场次是显式 release CSS animation。
 *  两者都按 DOM 上真实存在的动画判断，不能押注某一条板条必定发事件。
 *  减少动效重入没有板条，由 syncMotionAfterUpdate 中根 WAAPI 的 finished 单独收尾。 */
function hasRunningSlatMotion(root: HTMLElement): boolean {
  const active = (animation: Animation): boolean => {
    const isTransition =
      animation instanceof CSSTransition && animation.transitionProperty === 'transform'
    const isRelease = animation instanceof CSSAnimation && animation.animationName === 'veil-slat-release'
    return (isTransition || isRelease) && animation.playState !== 'finished' && animation.playState !== 'idle'
  }
  return [...root.querySelectorAll<HTMLElement>('.route-veil__slat')].some((slat) =>
    slat.getAnimations().some(active),
  )
}

/** 「让开演完」的回报：常规路径在板条 transitionend 后核对是否仍有动作；
 *  减少动效首轮由根元素 opacity transitionend 收尾（板条整层 display:none）。
 *  普通重入由 onAnimationEnd 收集 release，减少动效重入由根 WAAPI finished 收尾。 */
function onTransitionEnd(e: TransitionEvent): void {
  const el = e.target as HTMLElement
  const root = e.currentTarget as HTMLElement
  if (el === root) {
    if (e.propertyName === 'opacity') exitDone()
    return
  }
  if (e.propertyName !== 'transform' || !el.classList.contains('route-veil__slat')) return
  if (!hasRunningSlatMotion(root)) exitDone()
}

/** 重入场次不看 transition，而看本轮 release 动画；其他氛围动画一律忽略。 */
function onAnimationEnd(e: AnimationEvent): void {
  const el = e.target as HTMLElement
  if (e.animationName !== 'veil-slat-release' || !el.classList.contains('route-veil__slat')) return
  if (!hasRunningSlatMotion(e.currentTarget as HTMLElement)) exitDone()
}

/**
 * 揭幕被点击打断时，CSS 的静态终点只负责提供目标值；真正的运动从旧帧开始。
 *
 * onBeforeUpdate 看到的是旧 DOM（仍是 in），此时 getComputedStyle 能读到 transition
 * 或 CSS animation 正在呈现的实际矩阵。onUpdated 看到的是新 DOM（已是 out），此时
 * CSS 中保留的 transition-duration / delay / timing-function 就是本轮中断动作的参数。
 * 两段钩子在同一帧提交之间执行，WAAPI 接管前不会把静态终点绘制出来。
 */
interface InterruptedFrame {
  element: HTMLElement
  transform: string
  opacity: string
}

const veilRoot = ref<HTMLElement | null>(null)
let pendingFrames: InterruptedFrame[] = []
let pendingRootOpacity: string | null = null
let interruptedAnimations: Animation[] = []
let reducedRelease: Animation | null = null

function cancelInterruptedMotion(): void {
  interruptedAnimations.forEach((animation) => animation.cancel())
  interruptedAnimations = []
  reducedRelease = null
}

function cssMilliseconds(value: string): number {
  const parsed = Number.parseFloat(value)
  if (!Number.isFinite(parsed) || parsed <= 0) return 0
  return value.endsWith('ms') ? parsed : parsed * 1000
}

function captureInterruptedFrame(): void {
  const root = veilRoot.value
  pendingFrames = []
  pendingRootOpacity = null
  if (
    !root ||
    root.dataset.phase !== 'in' ||
    phase.value !== 'out' ||
    !reentrant.value ||
    reFrom.value !== 'in'
  ) {
    return
  }

  const parts = root.querySelectorAll<HTMLElement>(
    '.route-veil__slat, .route-veil__wipe-under, .route-veil__plate, .route-veil__read, ' +
      '.route-veil__corner, .route-veil__cross, .route-veil__scanline',
  )
  pendingFrames = [...parts].map((element) => {
    const style = getComputedStyle(element)
    return { element, transform: style.transform, opacity: style.opacity }
  })
  pendingRootOpacity = getComputedStyle(root).opacity
}

function playInterruptedFrames(): void {
  const root = veilRoot.value
  if (
    !root ||
    !pendingFrames.length ||
    root.dataset.phase !== 'out' ||
    root.dataset.run !== 're' ||
    root.dataset.reFrom !== 'in'
  ) {
    pendingFrames = []
    pendingRootOpacity = null
    return
  }

  cancelInterruptedMotion()
  for (const frame of pendingFrames) {
    const style = getComputedStyle(frame.element)
    const duration = cssMilliseconds(style.transitionDuration)
    const samePlace = style.transform === frame.transform && style.opacity === frame.opacity
    if (!duration || samePlace) continue

    // 去掉旧 CSS 动作再创建新动作发生在同一个 JS 任务里，不会插入一帧静态终点。
    frame.element.getAnimations().forEach((animation) => animation.cancel())
    const animation = frame.element.animate(
      [
        { transform: frame.transform, opacity: frame.opacity },
        { transform: style.transform, opacity: style.opacity },
      ],
      {
        duration,
        delay: cssMilliseconds(style.transitionDelay),
        easing: style.transitionTimingFunction,
        fill: 'both',
      },
    )
    interruptedAnimations.push(animation)
  }

  // 减少动效下板条不显示，只把当前根不透明度连续接回 1，不闪一次全黑。
  if (pendingRootOpacity !== null) {
    const style = getComputedStyle(root)
    const duration = cssMilliseconds(style.transitionDuration)
    if (duration && style.opacity !== pendingRootOpacity) {
      root.getAnimations().forEach((animation) => animation.cancel())
      interruptedAnimations.push(
        root.animate(
          [{ opacity: pendingRootOpacity }, { opacity: style.opacity }],
          {
            duration,
            delay: cssMilliseconds(style.transitionDelay),
            easing: style.transitionTimingFunction,
            fill: 'both',
          },
        ),
      )
    }
  }
  pendingFrames = []
  pendingRootOpacity = null
}

function syncMotionAfterUpdate(): void {
  playInterruptedFrames()

  const root = veilRoot.value
  const firstSlat = root?.querySelector<HTMLElement>('.route-veil__slat')
  if (
    !root ||
    root.dataset.phase !== 'in' ||
    root.dataset.run !== 're' ||
    !firstSlat ||
    getComputedStyle(firstSlat).display !== 'none' ||
    reducedRelease
  ) {
    return
  }

  // 减少动效重入也不能押注“取消旧 transition 后浏览器一定再建一条”。
  // 显式 WAAPI 的 finished 是本轮唯一收尾信号；重入取消时 finished 会 reject，不会误收尾新场次。
  const style = getComputedStyle(root)
  const duration = cssMilliseconds(style.transitionDuration)
  if (!duration) return
  reducedRelease = root.animate([{ opacity: 1 }, { opacity: style.opacity }], {
    duration,
    delay: cssMilliseconds(style.transitionDelay),
    easing: style.transitionTimingFunction,
    fill: 'both',
  })
  interruptedAnimations.push(reducedRelease)
  reducedRelease.finished
    .then(() => {
      if (root.dataset.phase === 'in') exitDone()
    })
    .catch(() => {
      // 下一次导航取消本次揭幕属于正常控制流。
    })
}

onBeforeUpdate(captureInterruptedFrame)
onUpdated(syncMotionAfterUpdate)
onBeforeUnmount(cancelInterruptedMotion)

// 最终揭幕或真正离场前取消中断 WAAPI；out → out 的连点保持已有收回动作。
watch(phase, (next, previous) => {
  if (next === 'out' && previous === 'in') return
  cancelInterruptedMotion()
})

/** 百叶板条数。板宽 / 步进 / 错峰全部按 5 条算死在 base.css（28% 宽、24% 步进、
 *  错峰走 --veil-slat-step），改条数必须连同那几处的 nth 计算一起改 ——
 *  所以这里写成常量而不是魔法数。 */
const SLATS = [0, 1, 2, 3, 4]

/** 四角钉版准星的位置修饰类。 */
const CROSSES = ['tl', 'tr', 'bl', 'br']

/** 三角阵列的八个格子：两行 × 四列，**第七格刻意空着**（理由见 base.css 的 .route-veil__tri）。
 *  写成数据而不是复制八份 <i>：位置与格子数一一对应，改阵列形状只要改这一行。 */
const TRI_CELLS = [true, true, true, true, true, true, false, true]
</script>

<template>
  <Teleport to="body">
    <div
      ref="veilRoot"
      class="route-veil"
      :data-phase="phase"
      :data-profile="profile"
      :data-run="reentrant ? 're' : 'first'"
      :data-re-from="reentrant ? reFrom : undefined"
      aria-hidden="true"
      @transitionend="onTransitionEnd"
      @transitioncancel="onTransitionEnd"
      @animationend="onAnimationEnd"
      @animationcancel="onAnimationEnd"
    >
      <!-- 黄层写在**前**：同一层叠层下 DOM 顺序就是绘制顺序，它必须垫在百叶板下面。
           整个行程比板条多走一个 --motion-route-wipe-lead，于是两个相位里都能从
           板条的边下露出一条黄边（黄带先进后出，全站同一条规矩）。 -->
      <span class="route-veil__wipe-under" />
      <!-- 五条百叶板：--i 是板序（0 在最左），几何与错峰全在 base.css 按它算。 -->
      <span v-for="i in SLATS" :key="i" class="route-veil__slat" :style="{ '--i': i }" />
      <!-- 整版纹理：板条咬合之后压上来的 48px 网格 + 240px 十字准星。
           它独立成层而不是画在板条上 —— 板条有 4% 重叠，各画各的网格会在接缝处错位，
           一层整版就没这个问题（「拼版」成立的关键）。 -->
      <span class="route-veil__plate" />
      <!-- 读数层：一个**固定在屏幕上的版面**（四角准星 + 中心场记板 + 扫描线 + 右下角），
           自己不跟板条走，只在盖死的那一段里完成落版与退版。 -->
      <span class="route-veil__hud">
        <span
          v-for="pos in CROSSES"
          :key="pos"
          class="route-veil__cross"
          :class="`route-veil__cross--${pos}`"
        />
        <span class="route-veil__read">
          <span class="hazard route-veil__hazard" />
          <span class="route-veil__hud-lead">REDIRECTING TO:</span>
          <!-- 落版主体：纸白窄体巨号词 + 琥珀骑字斜梁（与页头 .title-beam 同一签名，
               暗版上对应官方 PV 里白字 + 黄块的那一类构图）。 -->
          <span v-if="target.word" class="route-veil__word-wrap">
            <span class="route-veil__word">
              <!-- 外层字距、斜梁与尺寸保持稳定；只有目标值本身交叉淡出／淡入。 -->
              <Transition name="veil-target">
                <span :key="target.word" class="route-veil__word-value">{{ target.word }}</span>
              </Transition>
            </span>
            <span class="route-veil__beam" />
          </span>
          <span class="route-veil__hud-line">
            <Transition name="veil-target">
              <span :key="`${target.code}:${target.title}`" class="route-veil__hud-value">
                <span v-if="target.code && target.code !== target.word" class="route-veil__hud-chip">
                  {{ target.code }}
                </span>
                <span class="route-veil__hud-title">{{ target.title }}</span>
              </span>
            </Transition>
          </span>
        </span>
        <!-- 制版细线：固定在轨道内，仅在版式就位时微微亮起，不再横穿屏幕。 -->
        <span class="route-veil__scanline" />
        <!-- 右下角：位置对着页面自己的水印大字（那份也是右下角贴边的巨号编号）。 -->
        <span class="route-veil__corner">
          <span class="route-veil__tri">
            <i v-for="(on, i) in TRI_CELLS" :key="i" :class="{ 'is-blank': !on }" />
          </span>
          <span class="route-veil__hud-code route-veil__corner-label">REDIRECT PROTOCOL</span>
        </span>
      </span>
    </div>
  </Teleport>
</template>
