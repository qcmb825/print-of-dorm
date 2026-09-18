<script setup lang="ts">
/** 指标卡：沿用参考站的分层方式 —— 细边框 + 磨砂面板，不用阴影堆高度。 */
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    label: string
    value: number | string
    hint?: string
    icon?: Component
    accent?: boolean
  }>(),
  { accent: false },
)
</script>

<template>
  <div
    class="panel panel-raised flex flex-col gap-2 p-4 sm:p-5"
    :class="accent && 'border-primary/40'"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="tech-label text-ink-3">{{ label }}</span>
      <component
        :is="icon"
        v-if="icon"
        :size="16"
        :style="{ color: accent ? 'var(--accent-text)' : 'var(--text-quaternary)' }"
        aria-hidden="true"
      />
    </div>
    <!-- 强调数字走 --accent-text 而不是 --primary：.panel 的底是 80% 白的半透明
         --card 叠在页面底上（≈#fefefe），--primary 铺上去只有 2.36:1 —— 连 26-30px
         粗体要的 3:1 都不够。换 --accent-text 后是 5.43:1（顺手过了小字的 4.5:1）。 -->
    <div
      class="tnum font-heading text-[26px] leading-none font-bold sm:text-[30px]"
      :style="accent ? { color: 'var(--accent-text)' } : undefined"
    >
      {{ value }}
    </div>
    <div v-if="hint" class="text-xs text-ink-4">{{ hint }}</div>
  </div>
</template>
