<script setup lang="ts">
/** 路由 / 页面切换的统一过渡。三处在用：App 外壳（登录页 ↔ 布局）、学生端和管理端的
 *  RouterView。类名只写一份，免得三处各调各的、几次迭代后就不一致了。
 *
 *  这个组件只负责两件事：把 keyed 的 .route-stage 交给 <Transition>，
 *  以及在正确的钩子里把「换场开始了 / 该换手了 / 演完了」报给 RouteVeil 的单例状态机。
 *  真正的视觉全在 styles/base.css 的 route-* 区块和 RouteVeil.vue 里。
 *
 *  保留 mode="out-in"（不可改）：
 *  - 同时渲染新旧两棵树，学生端 position:fixed 的底部标签栏会叠在管理端侧栏上；
 *  - 两棵树的滚动高度会互相干扰，进出页面时会互相顶。
 *
 *  不加 appear：登录首屏本来就在等 /hello 探活，再叠 1.4 秒入场只是推迟可用时间。
 *
 *  profile 决定这一处的档位：
 *  - "shell"（App.vue）：整壳切换，外壳那层 stage 里包着整个布局，包含 StudentLayout 的
 *    fixed 底栏与两端的 sticky 头/侧栏，所以那一层只允许动 opacity；时长也拉满。
 *  - "inline"（两个布局，默认值）：只包 <main> 里的页面组件，站点里唯一的 fixed 与三处
 *    sticky 全在 main 之外（已核对 src 全目录），所以这一档可以接回站点既有的横向接入语汇。
 */
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouteVeil, type VeilProfile, type VeilTarget } from '@/composables/route-veil'

const props = withDefaults(
  defineProps<{
    transitionKey: string
    /** 不传就是布局内子页档 */
    profile?: VeilProfile
    /** 外壳档的代号与页名，见 App.vue；子页档留空则自动取 meta.code / meta.title */
    veilCode?: string
    veilTitle?: string
  }>(),
  { profile: 'inline' },
)

const route = useRoute()
const veil = useRouteVeil()

/** 这一次换场的编号。三个钩子都是异步到场的（after-leave 在离场结束时、
 *  after-enter 在入场结束时），必须带着编号回去认领 —— 否则连点导航时，
 *  上一次的 after-enter 会把新一次换场提前收掉，面板在半路被切掉。 */
let runId = 0
/** 本实例是不是正拥有一次在飞的换场。用来判断「这次 props 变化该不该改写场记读数」。 */
let inFlight = false

/** 目标页。before-leave 那一刻 vue-router 已经提交了新路由（路由先落、组件后换），
 *  所以 route 上读到的是**要去哪**，不是从哪来。
 *  代号取路由表里的 meta.code（01–07），不拿 route.path：读数是给人看的编号，
 *  而 route.path 是一串以斜杠开头的英文路径 —— 那是调试信息。 */
function currentTarget(): VeilTarget {
  return {
    code: props.veilCode ?? `SECTOR ${(route.meta.code as string | undefined) ?? '--'}`,
    title: props.veilTitle ?? (route.meta.title as string | undefined) ?? props.transitionKey,
  }
}

function onBeforeLeave(): void {
  inFlight = true
  runId = veil.begin(props.profile, currentTarget())
}

function onAfterLeave(): void {
  veil.open(runId)
}

function onAfterEnter(): void {
  inFlight = false
  veil.settle(runId)
}

/** 换场还没演完又导航了一次时，Vue 不会再调 before-leave（见 route-veil.ts 的 retarget），
 *  但新的 transition-key 已经写进 props、换手时挂上的是最新那棵树 ——
 *  不跟着改写，缝上就会写着上一个目标页名。只有拥有在飞换场的那个实例才改写：
 *  同一时刻另一个布局的实例是 idle 的，让它插手会把别人的读数改坏。 */
watch(
  () => props.transitionKey,
  () => {
    if (!inFlight) return
    veil.retarget(props.profile, currentTarget())
  },
)
</script>

<template>
  <Transition
    mode="out-in"
    enter-active-class="route-enter-active"
    enter-from-class="route-enter-from"
    leave-active-class="route-leave-active"
    leave-to-class="route-leave-to"
    @before-leave="onBeforeLeave"
    @after-leave="onAfterLeave"
    @after-enter="onAfterEnter"
  >
    <div :key="props.transitionKey" class="route-stage" :data-profile="props.profile">
      <slot />
    </div>
  </Transition>
</template>
