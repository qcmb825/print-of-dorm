<script setup lang="ts">
/** 页面标题区：**一份电子文档的头**。
 *
 *  自上而下三层（2026-11-22 从四层减到三层：原来还有一行「文件头铭牌」
 *  （INTERNAL USE ONLY / REV 2.006）和一行 PATH/CODE/SYNC 字段行，全是装饰性
 *  微小字，两行叠在标题上下让整页读出发闷 —— 铭牌整行撤掉，字段行只留下
 *  有功能的 SYNC（通道健康度挂在它的光标上）并进收尾行）：
 *    ① 眉题 —— 编号 + 英文页名（古铜等宽）
 *    ② 标题行 —— 骑字斜梁 + 巨题
 *    ③ 收尾行 —— 扫描基线 + 扇区读数 + SYNC 校时 + 刻度尺
 *
 *  编号从路由 meta.code 取，不要求调用方传 ——「页面编号」只有一个事实来源
 *  （router/index.ts），页面增删时不会出现"界面上的编号和导航对不上"。
 *
 *  heading：管理端用 lg，学生端用 md。手机屏幕高度有限，
 *  巨题会占掉过多屏高，而学生端以手机为主。
 */
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useClock } from '@/composables/clock'

const props = defineProps<{
  title: string
  subtitle?: string
  heading?: 'lg' | 'md'
  /** 数据通道的健康度。挂在校时基光标上：
   *  · live  正常（默认）—— 1.1s 单闪，与全站一致；
   *  · alarm 连续拉取失败 —— 同周期**双闪**。这是给既有循环加语义分档，
   *    不是新增一件常驻循环（全站常驻件的预算很紧，见 DESIGN_RULES §7）。
   *  为什么用闪烁频率而不是加个红点：红点会变成第二个"状态色"，
   *  而这一页没有"错误状态"这个概念 —— 数据旧了也是数据，只是别再装作是新的。 */
  channel?: 'live' | 'alarm'
}>()

const route = useRoute()
const pageCode = computed(() => route.meta.code as string | undefined)
/** 英文页名（眉题的第二段）。与巨号幽灵字同一个事实来源（route.meta.en）。 */
const enName = computed(() => route.meta.en as string | undefined)
/** 字号落差即层级：lg 档桌面 100px（--text-6xl），md 档 52px。
 *  上一版封顶 44px 被评「太规矩」—— 这套语言的层级本来就靠极端落差建立。 */
const headingClass = computed(() =>
  props.heading === 'md' ? 'text-2xl sm:text-4xl' : 'text-4xl sm:text-6xl',
)

/** 同步时钟（SYNC 字段）。它是把"文档"读成"电子文档"最省力的一处 ——
 *  纸上不会有正在走的秒。约束与理由见 composables/clock.ts。 */
const clock = useClock()
</script>

<template>
  <header class="relative mb-8">
    <div class="relative flex flex-wrap items-start justify-between gap-3">
      <div class="min-w-0">
        <div class="min-w-0">
          <!-- ① 眉题：黑块编号 + 方括号英文页名（古铜等宽），档案注记层。
               黑块与方括号词组来自 ignoredone.space 的语汇（SLEEP [CYCLE] 结构）：
               纯黑小方块是纸面上与巨题呼应的「对峙点」，方括号把英文页名切成「机读段」。 -->
          <span v-if="pageCode" class="title-eyebrow">
            <span class="title-eyebrow__code">{{ pageCode }}</span>
            <template v-if="enName"> // [{{ enName }}]</template>
          </span>
          <div class="relative inline-flex max-w-full items-center gap-2.5">
            <!-- ② 斜梁：骑跨字脚下缘的斜切琥珀（.title-beam），穿越是刻意的一笔。
                 纯装饰、不可交互，z-0 垫在标题之下。 -->
            <span class="title-beam" aria-hidden="true" />
            <h1 class="relative z-10 font-heading leading-none font-bold tracking-tight" :class="headingClass">
              {{ title }}
            </h1>
            <!-- 标题行右侧的补充记号（未读角标之类）。做成槽而不是 prop：
                 它承载的是"这一页独有的东西"，写进 prop 就得为每个调用方加一个字段。 -->
            <slot name="title-append" />
          </div>
        </div>
        <p v-if="subtitle" class="mt-3 max-w-2xl text-base text-ink-3">{{ subtitle }}</p>
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </div>

    <!-- ③ 收尾行：扫描基线 + 扇区读数 + SYNC 校时 + 刻度尺。
         扫描高光走的就是这条 1px 基线本身，所以它永远压在**没有正文**的位置上。
         SYNC 是唯一有功能的读数（通道健康度挂在它的光标上），
         PATH/CODE 两个纯装饰字段已撤（编号在眉题里，路径没有阅读价值）。
         窄屏整行撤掉：这一行不携带任务信息，而手机上它把内容顶到一屏半之外。 -->
    <div class="relative mt-5 hidden items-center gap-4 sm:flex">
      <span class="scan-rule flex-1" aria-hidden="true" />
      <span v-if="pageCode" class="readout shrink-0">SECTOR {{ pageCode }} / GRID 48</span>
      <span class="field shrink-0" aria-hidden="true">
        <span class="field__k">SYNC</span>
        <span class="field__v tnum">{{ clock || '--:--:--' }}</span>
        <!-- 光标跟在时间后面：这行的读数是"活的"，光标是它最小的证据。
             通道出问题时变成双闪（见 props.channel 的注释）。 -->
        <span class="caret" :class="channel === 'alarm' && 'caret--alarm'" />
      </span>
      <span class="ticks w-20 shrink-0" aria-hidden="true" />
    </div>
  </header>
</template>
