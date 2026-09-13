<script setup lang="ts">
import { NConfigProvider, NDialogProvider, NLoadingBarProvider, NMessageProvider, dateZhCN, zhCN } from 'naive-ui'
import { RouterView } from 'vue-router'
import AppBridge from '@/components/AppBridge.vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
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
          <RouterView />
        </NLoadingBarProvider>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
