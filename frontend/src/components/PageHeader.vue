<script setup lang="ts">
/** 页面标题区：**一份电子文档的头**。
 *
 *  自上而下四层，对应真实在线文档/终端界面的头部结构：
 *    ① 文件头铭牌 —— 密级、版号、网格基准。密级写 INTERNAL USE ONLY 而不是
 *      CLASSIFIED：这个系统确实是登录才能进的内部工具，但没有分类分级制度，
 *      编一个"绝密"出来就是扮演，不是设计。
 *    ② 标题行 —— 斜切强调块 + 页面编号 + 大标题
 *    ③ 字段行 —— 等宽标签 + 点线引导 + 等宽值。这是"记录视图"的形状，
 *      而纸上同名信息的形状是实线格子；三个值都取自真实状态。
 *    ④ 收尾 —— 扫描基线 + 扇区读数 + 刻度尺
 *
 *  编号从路由 meta.code 取，不要求调用方传 ——「页面编号」只有一个事实来源
 *  （router/index.ts），页面增删时不会出现"界面上的编号和导航对不上"。
 *
 *  heading：管理端用 lg（30/44），学生端用 md（20/30）。手机屏幕高度有限，
 *  44px 标题会占掉近 1/6 屏高，而学生端以手机为主。
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClock } from '@/composables/clock'

const props = defineProps<{
  title: string
  subtitle?: string
  code?: string
  heading?: 'lg' | 'md'
}>()

const route = useRoute()
const pageCode = computed(() => props.code ?? (route.meta.code as string | undefined))
const headingClass = computed(() =>
  props.heading === 'md' ? 'text-xl sm:text-3xl' : 'text-3xl sm:text-4xl',
)

/** 同步时钟（SYNC 字段）。它是把"文档"读成"电子文档"最省力的一处 ——
 *  纸上不会有正在走的秒。约束与理由见 composables/clock.ts。 */
const clock = useClock()
</script>

<template>
  <header class="relative mb-5">
    <!-- ① 文件头铭牌。真实的工单/技术文件顶部都会有这类铭牌；
         这里的信息全部来自系统真实状态（页面编号、构建基准）。 -->
    <div
      class="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b pb-1.5"
      style="border-color: var(--border)"
    >
      <span class="readout">
        <template v-if="pageCode">{{ pageCode }} // </template>INTERNAL USE ONLY
      </span>
      <span class="readout hidden sm:inline">REV 2.006 / GRID 48</span>
    </div>

    <div class="relative mt-4 flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="flex items-baseline gap-2.5">
          <!-- 斜切强调块：整套视觉里最"宣传片"的一笔，用 clip-path 切出平行四边形。
               它是纯装饰、不可交互，所以不违反 clip-path 的两条禁令。 -->
          <span class="cut h-5 w-2.5 shrink-0 bg-[var(--accent-text)]" aria-hidden="true" />
          <span v-if="pageCode" class="readout shrink-0">{{ pageCode }} //</span>
          <h1 class="font-heading leading-none font-bold tracking-tight" :class="headingClass">
            {{ title }}
          </h1>
        </div>
        <p v-if="subtitle" class="mt-2 max-w-2xl text-sm text-ink-3">{{ subtitle }}</p>
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- ③ 字段行：等宽标签 + 点线引导 + 等宽值。
         窄屏整行一个字段（点线引导要有一截长度才读得出是"引导线"，
         挤成三个短横线就退化成装饰），sm 以上并排。 -->
    <div class="mt-3.5 flex flex-wrap gap-x-5 gap-y-1.5" aria-hidden="true">
      <span class="field w-full sm:w-auto sm:min-w-[13rem]">
        <span class="field__k">PATH</span>
        <span class="field__lead" />
        <span class="field__v">{{ route.path }}</span>
      </span>
      <span v-if="pageCode" class="field w-full sm:w-auto sm:min-w-[9rem]">
        <span class="field__k">CODE</span>
        <span class="field__lead" />
        <span class="field__v">{{ pageCode }}</span>
      </span>
      <span class="field w-full sm:w-auto sm:min-w-[10rem]">
        <span class="field__k">SYNC</span>
        <span class="field__lead" />
        <span class="field__v">{{ clock || '--:--:--' }}</span>
        <!-- 光标跟在时间后面：这行的读数是"活的"，光标是它最小的证据。 -->
        <span class="caret" />
      </span>
    </div>

    <!-- ④ 收尾：扫描基线 + 扇区读数 + 刻度尺。
         扫描高光走的就是这条 1px 基线本身，所以它永远压在**没有正文**的位置上。 -->
    <div class="relative mt-4 flex items-center gap-3">
      <span class="scan-rule flex-1" aria-hidden="true" />
      <span v-if="pageCode" class="readout shrink-0">SECTOR {{ pageCode }} / GRID 48</span>
      <span class="ticks w-20 shrink-0" aria-hidden="true" />
    </div>
  </header>
</template>
