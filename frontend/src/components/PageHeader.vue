<script setup lang="ts">
/** 页面标题区：**标题卡**。斜切强调块 + 技术读数 + 大标题 + 超大水印编号，
 *  底部一条 1px 分区线与右端刻度尺收尾，右侧是操作位。
 *
 *  编号从路由 meta.code 取，不要求调用方传 —— 「页面编号」只有一个事实来源
 *  （router/index.ts），页面增删时不会出现「界面上的编号和导航对不上」。
 *
 *  标题用 <h1>：管理端 7 个页面全部走这个组件，学生端也换用它，全站一套标题语义。
 *
 *  超大水印编号不在这里：页头右上角被操作按钮占着，水印压上去会像一块脏印子。
 *  它改挂在主内容区的右下角空白处（见两个 layout 的 <main>）。
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ title: string; subtitle?: string; code?: string }>()
const route = useRoute()
const pageCode = computed(() => props.code ?? (route.meta.code as string | undefined))
</script>

<template>
  <header class="relative mb-5 overflow-hidden">
    <div class="relative flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-baseline gap-2.5">
          <!-- 斜切强调块：整套视觉里最「宣传片」的一笔，用 clip-path 切出平行四边形。
               它是纯装饰、不可交互，所以不违反 clip-path 的两条禁令。 -->
          <span class="cut h-5 w-2.5 shrink-0 bg-[var(--accent-text)]" aria-hidden="true" />
          <span v-if="pageCode" class="readout shrink-0">{{ pageCode }} //</span>
          <h1 class="font-heading text-3xl leading-none font-bold tracking-tight sm:text-4xl">
            {{ title }}
          </h1>
        </div>
        <p v-if="subtitle" class="mt-2 max-w-2xl text-sm text-ink-3">{{ subtitle }}</p>
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- 收尾：强调色的线头 + 技术读数 + 刻度尺。
         刻度与 48px 网格是两个尺度，全站只在这里出现，避免两套刻度互相打架。 -->
    <div class="relative mt-4 flex items-center gap-3">
      <span class="rule-accent flex-1" />
      <span v-if="pageCode" class="readout shrink-0">SECTOR {{ pageCode }} / GRID 48</span>
      <span class="ticks w-20 shrink-0" aria-hidden="true" />
    </div>
  </header>
</template>
