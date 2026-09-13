<script setup lang="ts">
/** 路由 / 页面切换的统一过渡。三处在用：App 外壳（登录页 ↔ 布局）、学生端和管理端的
 *  RouterView。类名只写一份，免得三处各调各的、几次迭代后就不一致了。
 *
 *  - out-in：必须的。同时渲染新旧两棵树会让布局重叠（学生端的固定底栏会叠在管理端的
 *    侧栏上），而且两套页面的滚动高度会互相影响。
 *  - 时长压在 160ms + 80ms：导航对管理员是一天几十次的操作，属于"近乎察觉不到"那一档。
 *  - 不加 appear：首屏本来就在等 JS/接口，再叠一段入场动画只是推迟可用时间。
 *  - 进出都用 ease-out：ease-in 起步慢，而起步那一刻正是用户盯着看的时候。
 *
 *  只对**单根节点**的组件生效 —— 插槽里渲染出多个根时 Vue 会退化成直接切换。
 *  本项目的布局和各页面都是单根，新增页面时请保持这一点。
 */
</script>

<template>
  <Transition
    mode="out-in"
    enter-active-class="transition duration-[160ms] ease-out"
    enter-from-class="opacity-0 translate-y-1.5"
    leave-active-class="transition duration-[80ms] ease-out"
    leave-to-class="opacity-0"
  >
    <slot />
  </Transition>
</template>
