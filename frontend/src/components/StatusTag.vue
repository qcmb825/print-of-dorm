<script setup lang="ts">
/** 订单状态标签：颜色全部走 --status-* 令牌，浅深色自动切换。
 *
 *  颜色变化带过渡：订单从「待打印」走到「可取件」时，标签会换掉整组的
 *  前景/背景/描边色。这三支都是通过内联 style 下发的，而 CSS 过渡对
 *  内联样式的变化同样生效 —— 所以不需要为它加任何动画类，
 *  一条 transition 就够。切换硬件加速属性（transform/opacity）在这里没有意义：
 *  要变的本来就是颜色，而颜色**只能**在主线程上过渡，这正好是它该待的地方。 */
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
    class="inline-flex items-center gap-1.5 border font-bold whitespace-nowrap transition-colors duration-[var(--motion-dur-slow)] ease-out"
    :class="size === 'sm' ? 'px-2 py-[1px] text-xs' : 'px-2.5 py-0.5 text-sm'"
    :style="style"
  >
    <span class="size-1.5 bg-current" aria-hidden="true" />
    {{ status }}
  </span>
</template>
