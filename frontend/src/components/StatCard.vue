<script setup lang="ts">
/** 指标卡：细边框 + 无阴影的分层，数字是这个格子的主角。
 *
 *  数字带"变化反馈"（useValueTick）：看板是轮询刷新的，值真的变了才亮一下 ——
 *  它是"这一格刚刚更新过"的信号，而不是装饰。轮询但值没变时什么都不发生，
 *  所以不会变成每隔 20 秒全屏眨一次眼的定时闪烁。 */
import { computed, type Component } from 'vue'
import { useValueTick } from '@/composables/motion'

const props = withDefaults(
  defineProps<{
    label: string
    value: number | string
    hint?: string
    icon?: Component
    accent?: boolean
  }>(),
  { accent: false },
)

const ticking = useValueTick(() => props.value)

/** 数字的颜色：强调格一直是强调色；普通格只在"刚变过"的那一下取强调色。
 *  强调格因此看不到这一跳（它的数字本来就是强调色）—— 不给它另发明一种信号：
 *  同一页里两种变化反馈比"少一种"更容易让人误读。 */
const valueStyle = computed(() => (props.accent || ticking.value ? { color: 'var(--accent-text)' } : undefined))
</script>

<template>
  <div
    class="panel panel-raised flex flex-col gap-2 p-4 sm:p-5"
    :class="accent && 'border-[var(--accent-tint-border)]'"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="tech-label text-ink-3 tech-label--cn text-xs">{{ label }}</span>
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
      class="value-tick tnum font-heading text-2xl leading-none font-bold sm:text-3xl"
      :style="valueStyle"
    >
      {{ value }}
    </div>
    <div v-if="hint" class="text-xs text-ink-4">{{ hint }}</div>
  </div>
</template>
