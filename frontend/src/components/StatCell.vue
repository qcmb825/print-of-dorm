<script setup lang="ts">
/** 小号读数格：刻度轨面板 + 标签/数值两行，列表页顶栏那排小读数。
 *
 *  与 StatCard 的分工：StatCard 是「仪表卡」（36/52px 大数字、图标、odometer 滚动），
 *  StatCell 是页眉下那排小格（text-xl）。2026-11-23 抽自 BoardView / MyOrdersView /
 *  SettingsView 里逐行重复的同一段 markup —— 三处的面板类、刻度轨、标签写法
 *  已经开始各自漂移（SettingsView 就把刻度轨丢了），收回到一处。
 *
 *  accent：数值用强调色。hot：面板描边也用琥珀（「这格要你注意」）。
 *  accent 格不该再接 value-tick：数字本来就是强调色，那一跳在它身上看不见，
 *  不为它另发明第二种信号（调用方别给它传 ticking）。 */
withDefaults(
  defineProps<{
    label: string
    value: string | number
    accent?: boolean
    hot?: boolean
    ticking?: boolean
  }>(),
  { accent: false, hot: false, ticking: false },
)
</script>

<template>
  <!-- pl-4 不能省：刻度轨占的是格子自己的内边距，压到标签上就成了脏东西。 -->
  <div
    class="gauge panel panel-raised py-2.5 pr-3 pl-4"
    :class="hot && 'border-[var(--accent-tint-border)]'"
  >
    <div class="tech-label text-ink-3 tech-label--cn text-xs">{{ label }}</div>
    <div
      class="value-tick tnum font-heading text-xl font-bold"
      :class="ticking && 'value-tick--on'"
      :style="accent ? 'color: var(--accent-text)' : undefined"
    >
      {{ value }}
    </div>
  </div>
</template>
