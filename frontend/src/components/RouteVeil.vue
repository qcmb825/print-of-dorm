<script setup lang="ts">
/** 换场覆盖层：「百叶拼版 · 巨号落版」（2026-11-23 重设计）。
 *
 *  五条斜切百叶板从左向右**错峰咬合**封屏（每条前缘带琥珀扫描边），盖死的那一帧
 *  整版纹理（48px 网格 + 十字准星）压上来，屏幕正中完成一次「落版」：
 *  纸白窄体巨号词从下方浮起、字距收紧，琥珀斜梁从左扫过它的下三分之一，
 *  四角十字准星钉版，底部一条扫描线扫过 —— 然后百叶板沿同一方向依次让开。
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
 *  连点重入的分流见 base.css「重入分流」段与 composables/route-veil.ts 的 reFrom：
 *  从让开相位打断时板条走 recover 动画（瞬回左侧重新扫入），不倒飞。
 */
import { useRouteVeil } from '@/composables/route-veil'

// 解构出来是顶层 ref，模板里自动解包；readonly 的那几个只读不写。
const { phase, profile, target, reentrant, reFrom, exitDone } = useRouteVeil()

/** 这一相位里是否还有实际运行的板条过渡。
 *  不能把「第五条板条的 transitionend」当作完成信号：重入时它可能已经在终点，
 *  浏览器不会再创建 transition，那条事件便永远不会到来（强连点实测可稳定触发看门狗）。
 *  实际创建了哪些过渡由 getAnimations() 回答；最后一个**真实运行的**结束即可收尾。 */
function hasRunningSlatTransition(root: HTMLElement): boolean {
  return [...root.querySelectorAll<HTMLElement>('.route-veil__slat')].some((slat) =>
    slat.getAnimations().some(
      (animation) =>
        animation instanceof CSSTransition &&
        animation.transitionProperty === 'transform' &&
        animation.playState !== 'finished' &&
        animation.playState !== 'idle',
    ),
  )
}

/** 「让开演完」的回报：两个信号都算 ——
 *  1. 常规路径：板条 transform transitionend 后，确认已没有仍在运行的板条过渡；
 *  2. 减少动效路径：根元素的 opacity transitionend（板条整层 display:none）。
 *  其余 transitionend（黄层、读数）一律忽略。时长判断仍全在 CSS 里。 */
function onTransitionEnd(e: TransitionEvent): void {
  const el = e.target as HTMLElement
  const root = e.currentTarget as HTMLElement
  if (el === root) {
    if (e.propertyName === 'opacity') exitDone()
    return
  }
  if (e.propertyName !== 'transform' || !el.classList.contains('route-veil__slat')) return
  if (!hasRunningSlatTransition(root)) exitDone()
}

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
      class="route-veil"
      :data-phase="phase"
      :data-profile="profile"
      :data-run="reentrant ? 're' : 'first'"
      :data-re-from="reentrant ? reFrom : undefined"
      aria-hidden="true"
      @transitionend="onTransitionEnd"
      @transitioncancel="onTransitionEnd"
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
            <span class="route-veil__word">{{ target.word }}</span>
            <span class="route-veil__beam" />
          </span>
          <span class="route-veil__hud-line">
            <span v-if="target.code && target.code !== target.word" class="route-veil__hud-chip">
              {{ target.code }}
            </span>
            <span class="route-veil__hud-title">{{ target.title }}</span>
          </span>
        </span>
        <!-- 制版扫描线：盖死之后从左向右扫一次，揭示相位再扫一次。 -->
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
