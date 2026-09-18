<script setup lang="ts">
/** 页面标题区：编号 + 标题 + 说明，右侧操作位，底部一条 1px 分区线与右端刻度尺。
 *
 *  **编号从路由 meta.code 取，不要求调用方传** —— 这样「页面编号」只有一个事实来源
 *  （router/index.ts），页面增删时不会出现「界面上的编号和导航对不上」。调用方仍然可以传
 *  code 覆盖它，给将来不适配路由的场合留个口子。
 *
 *  标题用 <h1>：管理端 7 个页面全部走这个组件，原先写 h2 会让这 7 页整页没有一级标题
 *  （文档大纲从 h2 起步），而学生端那几页是各自手写的 h1 —— 同一套后台两套语义。
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps<{ title: string; subtitle?: string; code?: string }>()
const route = useRoute()
const pageCode = computed(() => props.code ?? (route.meta.code as string | undefined))
</script>

<template>
  <header class="mb-5">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-baseline gap-2">
          <!-- 编号：这套语言用「编号 + // + 名称」替代卡片边界来分区。
               走三级文字色而不是四级 —— 它是页面标识，不是纯装饰。 -->
          <span v-if="pageCode" class="tech-label shrink-0 text-2xs text-ink-3">{{ pageCode }} //</span>
          <h1 class="font-heading text-xl font-bold sm:text-2xl">{{ title }}</h1>
        </div>
        <p v-if="subtitle" class="mt-1 text-sm text-ink-3">{{ subtitle }}</p>
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <!-- 收尾：一条 1px 分区线，右端接刻度尺。刻度与 48px 网格是两个尺度，
         全站只在这里出现，避免两套刻度互相打架。 -->
    <div class="mt-4 flex items-center gap-3">
      <span class="h-px flex-1 bg-[var(--border)]" />
      <span class="ticks w-24 shrink-0" aria-hidden="true" />
    </div>
  </header>
</template>
