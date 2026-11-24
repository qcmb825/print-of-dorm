<script setup lang="ts">
/** 指标卡：**一枚仪表** —— 左缘刻度轨 + 滚动数字。
 *
 *  两件各司其职：
 *  · 左缘刻度轨（::before）：这一格是「读数」而不是「卡片」的最小证据；
 *  · 数字滚动（useOdometer）：轮询拿到新值时从旧值滚过去 —— 滚动方向本身
 *    就是信息（往下滚 = 变少）。落定那一跳的颜色反馈仍由 useValueTick 完成。
 *  （原先还有一枚右上角标三角，2026-11-23 撤掉：档案卡的层级靠数字与标签的
 *    落差建立，两层装饰减到一层，见 base.css 的 .stat-card 注记。）
 *
 *  数字带"变化反馈"（useValueTick）：看板是轮询刷新的，值真的变了才亮一下 ——
 *  它是"这一格刚刚更新过"的信号，而不是装饰。轮询但值没变时什么都不发生，
 *  所以不会变成每隔 20 秒全屏眨一次眼的定时闪烁。 */
import { computed, type Component } from 'vue'
import { useOdometer, useValueTick } from '@/composables/motion'

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
const display = useOdometer(() => props.value)

/** 数字的颜色：强调格一直是强调色；普通格只在"刚变过"的那一下取强调色。
 *  强调格因此看不到这一跳（它的数字本来就是强调色）—— 不给它另发明一种信号：
 *  同一页里两种变化反馈比"少一种"更容易让人误读。 */
const valueStyle = computed(() => (props.accent || ticking.value ? { color: 'var(--accent-text)' } : undefined))
</script>

<template>
  <div
    class="panel-raised stat-card flex flex-col gap-2.5 p-5 pl-6 sm:p-6 sm:pl-7"
    :class="accent && 'stat-card--accent'"
  >
    <div class="flex items-center justify-between gap-2">
      <span class="tech-label text-ink-3 tech-label--cn text-sm">{{ label }}</span>
      <component
        :is="icon"
        v-if="icon"
        :size="18"
        :style="{ color: accent ? 'var(--accent-text)' : 'var(--text-quaternary)' }"
        aria-hidden="true"
      />
    </div>
    <!-- 强调数字走 --accent-text 而不是 --primary：.panel 的底是 80% 白的半透明
         --card 叠在暖纸底上，琥珀铺上去只有约 1.8:1 —— 连大号字要的 3:1 都不够。
         换 --accent-text（古铜）后实测 7.29:1。 -->
    <div
      class="stat-card__value value-tick tnum font-heading text-3xl leading-none font-bold sm:text-4xl"
      :style="valueStyle"
    >
      {{ display }}
    </div>
    <div v-if="hint" class="text-sm text-ink-3">{{ hint }}</div>
  </div>
</template>
