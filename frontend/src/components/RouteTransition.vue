<script setup lang="ts">
/** 路由 / 页面切换的统一过渡。三处在用：App 外壳（登录页 ↔ 布局）、学生端和管理端的
 *  RouterView。类名只写一份，免得三处各调各的、几次迭代后就不一致了。
 *
 *  重构说明（2026-09-15）：
 *  - 移除所有装饰性动画（边界锚点、粒子、测距标尺、HUD 卡片）
 *  - out-in 模式保留：避免布局重叠和滚动高度冲突
 *  - 不加 appear：首屏等接口，不叠入场动画
 *
 * transitionKey 由外层传入：App 只在「登录 / 学生 / 管理」三种外壳之间过场，两个布局
 * 则只在各自的子页面之间过场，避免一次导航触发两层同类动画。
 */
const props = defineProps<{ transitionKey: string }>()
</script>

<template>
  <Transition
    mode="out-in"
    enter-active-class="route-enter-active"
    enter-from-class="route-enter-from"
    leave-active-class="route-leave-active"
    leave-to-class="route-leave-to"
  >
    <div :key="props.transitionKey" class="route-stage">
      <slot />
    </div>
  </Transition>
</template>
