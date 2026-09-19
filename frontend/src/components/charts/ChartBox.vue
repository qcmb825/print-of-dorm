<script setup lang="ts">
/** 图表容器：负责高度、自适应和空数据兜底。
 *  注意 vue-echarts/style.css 必须引，否则自定义元素是 inline，高度会塌成 0。 */
import { computed } from 'vue'
import VChart from 'vue-echarts'
import 'vue-echarts/style.css'
import type { EChartsOption } from 'echarts'
import EmptyState from '@/components/EmptyState.vue'

const props = withDefaults(
  defineProps<{ option: EChartsOption; height?: number; empty?: boolean; emptyText?: string }>(),
  { height: 260, empty: false, emptyText: '无数据' },
)

const boxHeight = computed(() => `${props.height}px`)
</script>

<template>
  <div class="relative w-full" :style="{ height: boxHeight }">
    <VChart v-if="!empty" :option="option" autoresize />
    <div v-else class="grid h-full place-items-center">
      <EmptyState code="00 / NO DATA" :title="emptyText" />
    </div>
  </div>
</template>
