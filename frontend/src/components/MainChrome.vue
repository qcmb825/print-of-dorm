<script setup lang="ts">
/** 主区装饰四件套：括角 / 左缘竖刻度 / 右缘读数沟 / 巨号幽灵字。
 *
 *  2026-11-23 从 StaffLayout / StudentLayout 抽回一处：两件布局里这段 markup
 *  原本逐行重复（约 30 行 × 2），每加一件背景装饰要手动同步两处 ——
 *  照准环那一轮就险些漏同步。
 *
 *  四件各自的语义（与原布局内注释同一份）：
 *  - 括角与竖刻度各自独立成层：视差要给它们不同的速率，而背景图没法单独 transform；
 *  - 右缘读数沟：左尺右沟，像一块屏的标尺与滚动沟。两件分列内容区两缘，
 *    不会像早期括角与竖刻度那样叠在一起（它上一版是"穿孔边"—— 那是装订线的
 *    语言，属于纸；沟槽是屏的语言）；
 *  - 幽灵字是当前页的英文代号（route.meta.en），12% 琥珀、出血排印，
 *    是本套语言里唯一允许压在内容上的纹理（业主亲定的例外）。
 *
 *  ⚠️ 页面内容本体不参与视差 —— 只有这四件装饰带 data-parallax。 */
import { useRoute } from 'vue-router'

withDefaults(defineProps<{ /** 左缘竖刻度的追加类（管理端要给侧栏让 8px：'lg:left-2'）。 */ vticksClass?: string }>(), {
  vticksClass: '',
})

const route = useRoute()
</script>

<template>
  <span
    class="frame-brackets pointer-events-none absolute inset-1.5"
    data-parallax
    style="--depth: 4px"
    aria-hidden="true"
  />
  <span
    class="vticks pointer-events-none absolute top-0 bottom-0 left-0"
    :class="vticksClass"
    data-parallax
    style="--depth: 4px"
    aria-hidden="true"
  />
  <span
    class="decor-rail pointer-events-none absolute top-2 right-0 bottom-2 w-4"
    data-parallax
    style="--depth: 3px"
    aria-hidden="true"
  >
    <span class="decor-rail__text">TERRAIN SURVEY DIVISION</span>
  </span>
  <span class="watermark" data-parallax style="--depth: 20px" aria-hidden="true">
    {{ route.meta.en ?? route.meta.code }}
  </span>
</template>
