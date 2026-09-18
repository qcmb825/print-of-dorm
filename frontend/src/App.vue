<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, dateZhCN, zhCN } from 'naive-ui'
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppBridge from '@/components/AppBridge.vue'
import RouteTransition from '@/components/RouteTransition.vue'
import RouteVeil from '@/components/RouteVeil.vue'
import { useThemeStore } from '@/stores/theme'
import { usePointerParallax } from '@/composables/motion'

const theme = useThemeStore()
const route = useRoute()

// 指针视差：减少动效与触屏情况下它什么都不做（见 composables/motion.ts）
usePointerParallax()

/** 外壳只在登录、学生、管理三种结构互换时切一次，子页面由各自布局处理。
 *  子页导航不改变这个 key，所以外壳那层 Transition 不会被内层导航连带触发。 */
const shellTransitionKey = computed(() => {
  if (route.path === '/login') return 'guest'
  return route.path.startsWith('/staff') ? 'staff' : 'student'
})

/** 路由是否已经落定。
 *
 *  vue-router 的初次导航是异步起的（install 里 push(history.location)），而本项目
 *  router/index.ts 的守卫里还有一次真实的 HTTP 往返（await auth.bootstrap()），
 *  所以首帧渲染时 currentRoute 仍是 START_LOCATION：path 是 '/'、matched 是空的。
 *  那时 shellTransitionKey 会算出 'student'，等路由落定再变成 'guest' 或 'staff' ——
 *  key 一变就是一次完整的外壳换场，而它的「旧页」是一棵空树。
 *  结果是：用户什么都没点，冷加载却先看 1.95 秒幕布（减少动效下约 1040ms），
 *  缝上还写着 GUEST / 接入终端 —— 正是 RouteTransition.vue 顶部说好不要的那种「推迟可用时间」。
 *
 *  首帧本来就只会渲染出一个空的 RouterView（没有任何组件可挂），所以这里干脆等落定
 *  再挂这一层：挂载时是这个 Transition 的**首次**渲染，没有 appear，不会补入场动画。
 *  不能改用「等 router.isReady() 再 mount」——那会让 #app 一直是空的，
 *  后端慢或不可达时用户连环境光背景都看不到。 */
const routed = computed(() => route.matched.length > 0)

/** 外壳档的场记读数。必须在这里写死，不能从 route.meta 取：换场那一刻读到的 meta
 *  是**目标页**的，登录 → 学生端会读到「下单打印」，而这一层换掉的是整个外壳，
 *  说「学生终端」才对。代号走等宽大写，是站内 .tech-label 既有的语气。 */
const shellLabel = computed(() => {
  switch (shellTransitionKey.value) {
    case 'guest':
      return { code: 'GUEST', title: '接入终端' }
    case 'staff':
      return { code: 'STAFF', title: '控制台' }
    default:
      return { code: 'STUDENT', title: '学生终端' }
  }
})
</script>

<template>
  <NConfigProvider
    :theme="theme.naiveTheme"
    :theme-overrides="theme.naiveOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    class="h-full"
  >
    <!-- 装饰层：固定铺满视口、在内容之下，承载随指针做视差的那几件装饰。
         **必须放在换场 stage 之外**：stage 在换场时会被 transform，而 transform 会给
         固定定位的后代换掉包含块，这一层就会跟着内容一起飘。
         它是 aria-hidden 且 pointer-events: none 的，不参与交互。 -->
    <div class="decor-layer" aria-hidden="true">
      <span class="decor-layer__grid" data-parallax style="--depth: 10px" />
    </div>

    <NMessageProvider :max="3" placement="top">
      <NDialogProvider>
        <NLoadingBarProvider>
          <AppBridge />
          <RouterView v-slot="{ Component }">
            <RouteTransition
              v-if="routed"
              :transition-key="shellTransitionKey"
              profile="shell"
              :veil-code="shellLabel.code"
              :veil-title="shellLabel.title"
            >
              <component :is="Component" />
            </RouteTransition>
          </RouterView>
          <!-- 换场覆盖层：全站唯一实例，Teleport 到 body。
               放在 provider 里只是为了拿到应用上下文，DOM 上它不在 #app 内。 -->
          <RouteVeil />
        </NLoadingBarProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
