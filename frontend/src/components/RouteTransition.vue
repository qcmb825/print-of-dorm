<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/** 路由 / 页面切换的统一过渡。三处在用：App 外壳（登录页 ↔ 布局）、学生端和管理端的
 *  RouterView。类名只写一份，免得三处各调各的、几次迭代后就不一致了。
 *
 *  - out-in：必须的。同时渲染新旧两棵树会让布局重叠（学生端的固定底栏会叠在管理端的
 *    侧栏上），而且两套页面的滚动高度会互相影响。
 *  - 过场容器把裁切、扫描线和临时 HUD 留在独立层，不能直接挂在页面根节点上：布局根里
 *    有固定底栏 / 侧栏，给它 transform 或 fixed 伪元素会改变定位参照，视觉上很容易"跳"。
 *  - 进入是水平切片揭示，离开是反向收束；视觉上像工业终端完成一次页面接入。
 *  - 不加 appear：首屏本来就在等 JS/接口，再叠一段入场动画只是推迟可用时间。
 *
 * transitionKey 由外层传入：App 只在「登录 / 学生 / 管理」三种外壳之间过场，两个布局
 * 则只在各自的子页面之间过场，避免一次导航触发两层同类动画。
 */
const props = defineProps<{ transitionKey: string }>()

const route = useRoute()
const routeLabel = computed(() => (route.meta.title as string | undefined) ?? '系统界面')
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
      <div class="route-stage__hud" aria-hidden="true">
        <span class="route-stage__hud-kicker">SYSTEM / ROUTE TRANSIT</span>
        <span class="route-stage__hud-title">{{ routeLabel }}</span>
        <span class="route-stage__hud-index">// 01</span>
      </div>
      <slot />
    </div>
  </Transition>
</template>
