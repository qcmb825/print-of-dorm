<script setup lang="ts">
/** 换场覆盖层：一块**斜切擦除面板**单向穿过整屏，前缘带一条扫描边；
 *  面板盖住的那一帧闪一次套准线，外壳档再从面板上浮出一行场记读数，然后同向滑走。
 *
 *  「单向穿过」是这个方案的关键：出相位从左侧外滑到正好盖住（那一帧就是 DOM 换手帧），
 *  入相位不停留、沿同一方向继续滑出右侧。所以全屏被遮死的窗口只有换手那一帧，
 *  而不是旧版两扇幕布咬合方案里的 480/600ms。
 *
 *  全站只有一个实例，挂在 App.vue 里 <RouterView> 的兄弟位置，并 Teleport 到 body。
 *  三个约束共同决定了它必须在这儿，一个都不能松：
 *
 *  1. 不能放进任何 .route-stage。stage 上有 isolation:isolate，层叠上下文会把 z-index
 *     关在里面 —— 写 z-index: 99999 也压不住 stage 外那三条 z-20 的 sticky/fixed 导航；
 *     而且 stage 一旦被加了 transform，fixed 底栏的包含块就变了。
 *  2. 不能放进 <Transition> 的被交换节点里。out-in 在离场结束时销毁旧节点，
 *     覆盖层会跟着旧树一起消失，面板在换场演到一半时凭空不见，比不做还糟。
 *  3. 必须挂到 body，不在 #app 内：这样它不受 app 里任何 transform/filter 影响，
 *     同时又能继承 html 上的 .dark —— 主题开关只落 html 一个 class（stores/theme.ts）。
 *     哪天有人把主题 class 改挂到 #app，面板的 --veil-mat 会静默退回浅色那套。
 *
 *  z-index: 100 —— 正好落在 (布局 chrome 的 20, Naive 弹层最低的 2000) 之间。
 *  高过 2000 会盖住 NDrawer/NDialog（vdirs 的 z-index 从 2000 递增）、loading bar(5999)、
 *  message(6000)，用户就看不到「下单成功」和「确认退出」了，这是功能性事故。
 *
 *  这一层永远挂在 DOM 里，靠 [data-phase] 切状态、靠 visibility 收掉。
 *  不用 v-if：一是 v-if 每次重挂都拿不到「从屏外滑进来」的那条过渡（初始样式即终态，
 *  不产生 transition）；二是快速连点时重建节点会让面板跳回屏外重播，
 *  而过渡是从当前计算值续上的，天然不会跳。也不能用 display:none —— 那会让过渡彻底不跑。
 */
import { useRouteVeil } from '@/composables/route-veil'

// 解构出来是顶层 ref，模板里自动解包；readonly 的那几个只读不写。
const { phase, profile, target, reentrant } = useRouteVeil()
</script>

<template>
  <Teleport to="body">
    <div
      class="route-veil"
      :data-phase="phase"
      :data-profile="profile"
      :data-run="reentrant ? 're' : 'first'"
      aria-hidden="true"
    >
      <!-- 擦除面板。前缘那 3px（1px 发丝线 + 2px 亮线 + 光晕）挂在它的 ::before 上、
           跟着面板一起走 —— 重绘面积只有那条窄边，而不是「一条线横扫全屏」。 -->
      <span class="route-veil__wipe" />
      <!-- 套准线：全程唯一一次"快"，也是唯一一处发光。 -->
      <span class="route-veil__rule" />
      <!-- 场记读数：等宽大写的目标页名，换场里唯一的文字。
           **只在外壳档显示**（子页档是高频导航，没有演出）—— 见 base.css 的 data-profile 规则。 -->
      <span class="route-veil__hud">
        <span class="tech-label tnum route-veil__hud-code">{{ target.code }}</span>
        <i class="route-veil__hud-sep" />
        <span class="tech-label route-veil__hud-title">{{ target.title }}</span>
      </span>
    </div>
  </Teleport>
</template>
