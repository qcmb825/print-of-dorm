<script setup lang="ts">
/** 页面标题区：左侧标题 + 说明，右侧操作位。管理端各页统一用它，保证间距一致。 */
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <header class="mb-5 flex flex-wrap items-start justify-between gap-3">
    <div class="min-w-0">
      <h2 class="font-heading text-xl font-bold sm:text-[22px]">{{ title }}</h2>
      <p v-if="subtitle" class="mt-1 text-[13px] text-ink-3">{{ subtitle }}</p>
    </div>
    <div class="flex shrink-0 flex-wrap items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
