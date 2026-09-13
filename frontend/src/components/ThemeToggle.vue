<script setup lang="ts">
import { Moon, Sun } from '@lucide/vue'
import { NButton, NTooltip } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
</script>

<template>
  <NTooltip trigger="hover">
    <template #trigger>
      <NButton quaternary circle :aria-label="theme.isDark ? '切换到浅色主题' : '切换到深色主题'" @click="theme.toggle()">
        <template #icon>
          <component :is="theme.isDark ? Sun : Moon" :size="17" />
        </template>
      </NButton>
    </template>
    {{ theme.isDark ? '浅色主题' : '深色主题' }}
  </NTooltip>
</template>
