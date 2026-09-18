<script setup lang="ts">
/** 页面标题区：左侧标题 + 说明，右侧操作位。管理端各页统一用它，保证间距一致。 */
defineProps<{ title: string; subtitle?: string }>()
</script>

<template>
  <!-- 用 <h1> 而不是 <h2>：管理端 7 个页面全部走这个组件，原来写 h2 会让这 7 页整页没有
       一级标题（文档大纲从 h2 起步），而学生端那几页是各自手写的 h1 —— 同一套后台两套语义。
       学生端页头标题的字号也一并提到了同一档（20/24），否则管理端标题比学生端大一档。 -->
  <header class="mb-5 flex flex-wrap items-start justify-between gap-3">
    <div class="min-w-0">
      <h1 class="font-heading text-xl font-bold sm:text-2xl">{{ title }}</h1>
      <p v-if="subtitle" class="mt-1 text-sm text-ink-3">{{ subtitle }}</p>
    </div>
    <div class="flex shrink-0 flex-wrap items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
