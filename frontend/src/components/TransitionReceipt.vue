<script setup lang="ts">
/** 转场回执条：**每一次转场都出一条**，说清"刚才发生了什么 / 你现在去哪"。
 *
 *  两档，动效与权重匹配（见 composables/transition-receipt.ts）：
 *    event  两层（黄色承载带 + 数据带）、有停留、底边排空线。给"有结果的事件"：
 *           登录成功、下单成功、撤回…  形状沿用最初那版：黄带先进后出，
 *           数据带后进先出，右进左出。
 *    pass   只有数据带、更薄、不停留，从右进、接着从左边出去。给普通导航。
 *
 *  形状上的三条取舍（与之前几版一致）：
 *   ① 走在**垂直中线**上、贯穿全宽：转场期间屏幕上正有一块擦除面板横着切过去，
 *      横贯全宽的条子和它是同一套语汇（"截断屏幕的一道"）；
 *   ② 压在换场幕布之上（z-index 300）；回执活着时幕布的场记读数让位（根属性 data-receipt）；
 *   ③ 整层 pointer-events: none，到点自己退场，没有关闭按钮 —— 它不需要回应。
 *
 *  进场用**挂载即播的 keyframes**（不用 <Transition> 的类）：<Transition> 的进场靠 rAF
 *  摘掉 enter-from，而回执正好出现在换场进行中（主线程在加载 chunk、换整棵树），
 *  rAF 可能被节流，那时 enter-from 永远摘不掉、回执会停在屏外。
 */
import { computed } from 'vue'
import { CircleCheck } from '@lucide/vue'
import { EVENT_HOLD_MS, transitionReceipt } from '@/composables/transition-receipt'

const info = computed(() => transitionReceipt.receipt.value)
const isEvent = computed(() => transitionReceipt.kind.value === 'event')

/** 回执上的时间戳：本机时间，与页面头部的 SYNC 同一套读数。 */
const stamp = computed(() => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
})

/** 排空线的时长：只有 event 有停留可排，pass 不停留，给它 0 让 CSS 关掉这条。 */
const drainStyle = computed(() => ({
  '--receipt-hold': isEvent.value ? `${EVENT_HOLD_MS}ms` : '0ms',
}))
</script>

<template>
  <Teleport to="body">
    <Transition name="receipt">
      <div
        v-if="transitionReceipt.open.value && info"
        class="receipt"
        :data-kind="transitionReceipt.kind.value"
        role="status"
        :style="drainStyle"
      >
        <!-- 黄承载带：只有 event 有。它比数据带厚，所以永远从上下露出边 ——
             读起来是"一条黄色承载带 + 压在上面的一条数据带"。
             pass 不出这层：普通导航没有"承载"这层意思，一条数据带穿过去就够。 -->
        <span class="receipt__mat" aria-hidden="true" />

        <span class="receipt__strip">
          <span class="receipt__mark" aria-hidden="true">
            <CircleCheck :size="15" />
          </span>

          <!-- 读数文字包成一块：停顿那一下的闪烁**只打在字上**，不打整条带的底 ——
               整条带闪一下是 56×1430px 的大面积亮度摆动，那是前庭与闪光敏感的地界；
               字闪一下只是"这块屏刷新了"的一眼。 -->
          <span class="receipt__ink">
            <span class="receipt__code shrink-0">{{ info.code }}</span>
            <span class="shrink-0 font-heading text-sm font-bold">{{ info.title }}</span>

            <span v-if="info.detail" class="hidden min-w-0 truncate text-xs text-ink-3 sm:inline">
              {{ info.detail }}
            </span>

          </span>

          <!-- "正在进入 X"只在 X 与主文不是同一个词时才出。
               pass 档主文就是目的页名（SECTOR 02 数据看板），再补一句"正在进入数据看板"
               是同一句话说两遍。 -->
          <span
            v-if="info.target && info.target !== info.title"
            class="min-w-0 truncate text-xs text-ink-3"
          >
            <span class="hidden sm:inline">· </span>正在进入{{ info.target }}
          </span>

          <!-- 右侧读数带：刻度 + 时间戳。机能风里"这一条是系统自己报的"靠这截收尾。 -->
          <span class="ml-auto hidden shrink-0 items-center gap-3 lg:flex" aria-hidden="true">
            <span class="ticks w-24" />
            <span class="readout">{{ stamp }}</span>
          </span>
        </span>

        <!-- 排空线：event 才画。它把"这条回执还剩多久"画出来 ——
             到点自己退场这件事不该让用户猜；pass 没有停留，也就没有可排的东西。 -->
        <span v-if="isEvent" class="receipt__drain" aria-hidden="true" />
      </div>
    </Transition>
  </Teleport>
</template>
