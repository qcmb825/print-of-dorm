<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, dateZhCN, zhCN } from 'naive-ui'
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppBridge from '@/components/AppBridge.vue'
import RouteTransition from '@/components/RouteTransition.vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const route = useRoute()

/** 外壳只在登录、学生、管理三种结构互换时切一次，子页面由各自布局处理。 */
const shellTransitionKey = computed(() => {
  if (route.path === '/login') return 'guest'
  return route.path.startsWith('/staff') ? 'staff' : 'student'
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
    <NMessageProvider :max="3" placement="top">
      <NDialogProvider>
        <NLoadingBarProvider>
          <AppBridge />
          <RouterView v-slot="{ Component }">
            <RouteTransition :transition-key="shellTransitionKey">
              <component :is="Component" />
            </RouteTransition>
          </RouterView>
        </NLoadingBarProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
