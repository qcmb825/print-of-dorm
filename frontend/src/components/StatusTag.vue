<script setup lang="ts">
/** 订单状态标签：颜色全部走 --status-* 令牌，浅深色自动切换。 */
import { computed } from 'vue'
import type { OrderStatus } from '@/api/types'
import { STATUS_BG_VAR, STATUS_COLOR_VAR } from '@/utils/format'

const props = withDefaults(defineProps<{ status: OrderStatus; size?: 'sm' | 'md' }>(), {
  size: 'md',
})

const style = computed(() => ({
  color: STATUS_COLOR_VAR[props.status],
  backgroundColor: STATUS_BG_VAR[props.status],
  borderColor: STATUS_COLOR_VAR[props.status],
}))
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border font-bold whitespace-nowrap"
    :class="size === 'sm' ? 'px-2 py-[1px] text-[11px]' : 'px-2.5 py-0.5 text-xs'"
    :style="style"
  >
    <span class="size-1.5 rounded-full bg-current" aria-hidden="true" />
    {{ status }}
  </span>
</template>
