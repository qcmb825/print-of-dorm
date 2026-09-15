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
        :style="{ color: accent ? 'var(--primary)' : 'var(--text-quaternary)' }"
        aria-hidden="true"
      />
    </div>
    <div
      class="tnum font-heading text-[26px] leading-none font-bold sm:text-[30px]"
      :style="accent ? { color: 'var(--primary)' } : undefined"
    >
      {{ value }}
    </div>
    <div v-if="hint" class="text-xs text-ink-4">{{ hint }}</div>
  </div>
</template>
