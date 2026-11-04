<script setup lang="ts">
/** 订单状态标签：颜色全部走 --status-* 令牌，浅深色自动切换。
 *
 *  颜色变化带过渡：订单从「待打印」走到「可取件」时，标签会换掉整组的
 *  前景/背景/描边色。这三支都是通过内联 style 下发的，而 CSS 过渡对
 *  内联样式的变化同样生效 —— 所以不需要为它加任何动画类，
 *  一条 transition 就够。切换硬件加速属性（transform/opacity）在这里没有意义：
 *  要变的本来就是颜色，而颜色**只能**在主线程上过渡，这正好是它该待的地方。
 *
 *  ── 落章（2026-11）──────────────────────────────────────────────
 *  状态**真的变了**时，文字块自己盖下来一次（scale 1.14 → 1 + 淡入），
 *  像柜台在单据上补盖一枚章。三条边界：
 *  1. **只在变化时触发**，首次渲染不播（数据到达不是"更新"，与 useValueTick 同口径）；
 *  2. 只动内层文字块，不动外框 —— 外框的 border-color 还在做颜色过渡，
 *     同一个元素上同时跑 transform 和 color 过渡会互相拖慢；
 *  3. 减少动效下整件不播：状态语义本来就写在文字和颜色里。
 *  位移只有过冲那一档（--motion-ease-back），幅度小、面积小，密集表格里也读得清。 */
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { OrderStatus } from '@/api/types'
import { prefersReducedMotion } from '@/composables/motion'
import { STATUS_BG_VAR, STATUS_COLOR_VAR } from '@/utils/format'

const props = withDefaults(defineProps<{ status: OrderStatus; size?: 'sm' | 'md' }>(), {
  size: 'md',
})

const style = computed(() => ({
  color: STATUS_COLOR_VAR[props.status],
  backgroundColor: STATUS_BG_VAR[props.status],
  borderColor: STATUS_COLOR_VAR[props.status],
}))

/** 落章只在"用户眼前这个状态变了"时播。首帧是数据到达，不播。 */
const stamped = ref(false)
let seen = 0
let timer: ReturnType<typeof setTimeout> | undefined

watch(
  () => props.status,
  () => {
    seen += 1
    if (seen === 1 || prefersReducedMotion.value) return
    stamped.value = false
    // 与 useBreakerTrip 同理：类名要先真的消失一帧，动画才会重播。
    requestAnimationFrame(() => {
      stamped.value = true
    })
    if (timer !== undefined) clearTimeout(timer)
    // 动画本身 180ms（--motion-dur-base），这里留足再摘类。
    timer = setTimeout(() => {
      timer = undefined
      stamped.value = false
    }, 400)
  },
)

onBeforeUnmount(() => {
  if (timer !== undefined) clearTimeout(timer)
})

</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 border font-bold whitespace-nowrap transition-colors duration-[var(--motion-dur-slow)] ease-out"
    :class="size === 'sm' ? 'px-2 py-[1px] text-xs' : 'px-2.5 py-0.5 text-sm'"
    :style="style"
  >
    <span class="size-1.5 bg-current" aria-hidden="true" />
    <span class="stamp-in" :class="stamped && 'stamp-in--on'">{{ status }}</span>
  </span>
</template>
