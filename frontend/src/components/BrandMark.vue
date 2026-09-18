<script setup lang="ts">
/** 品牌标识：方块图标 + 名称 + 等宽副标签，取自参考站的顶栏处理。 */
import { Printer } from '@lucide/vue'

withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <RouterLink to="/" class="flex items-center gap-2.5 no-underline" style="color: inherit">
    <span
      class="grid size-9 shrink-0 place-items-center rounded-[10px] border"
      style="
        background-color: var(--accent-tint-soft);
        border-color: var(--accent-tint-border);
        color: var(--accent-text);
      "
      aria-hidden="true"
    >
      <Printer :size="18" />
    </span>
    <span v-if="!compact" class="flex flex-col leading-none">
      <span class="font-heading text-base font-bold tracking-tight">猫娘打印服务</span>
      <span class="tech-label mt-0.5 text-ink-4 text-2xs">Neko Print</span>
    </span>
  </RouterLink>
</template>
