<script setup lang="ts">
/** 转场回执条：**有结果的事件**才出一条（登录成功、下单成功、撤回、发布公告…），
 *  说清"刚才发生了什么 / 你现在去哪"。两层（黄承载带 + 数据带）、有停留、底边排空线，
 *  形状是最初那版：黄带先进后出，数据带后进先出，右进左出。
 *
 *  普通导航不出这一条了（见 composables/transition-receipt.ts）：高频路径上的"去哪"
 *  由换场覆盖层自己在屏幕正中报，屏幕中间不必再横着一条带子。
 *
 *  形状上的三条取舍（与之前几版一致）：
 *   ① 走在**垂直中线**上、贯穿全宽：转场正在换的那一帧，屏幕正中是覆盖层的读数，
 *      回执出现时覆盖层的读数让位（根属性 data-receipt），同一时刻只有一条读数；
 *   ② 压在换场覆盖层之上（z-index 300）；
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

/** 回执上的时间戳：本机时间，与页面头部的 SYNC 同一套读数。 */
const stamp = computed(() => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
})

/** 排空线的时长 = 停留时长。从 composable 传进来而不是在 CSS 里再写一遍毫秒：
 *  两处各写一份就是第二个需要同步的真相（动画画到一半就停/画完了还在等）。 */
const holdStyle = { '--receipt-hold': `${EVENT_HOLD_MS}ms` }
</script>

<template>
  <Teleport to="body">
    <Transition name="receipt">
      <div
        v-if="transitionReceipt.open.value && info"
        class="receipt"
        role="status"
        :style="holdStyle"
      >
        <!-- 黄承载带：它比数据带厚，所以永远从上下露出边 ——
             读起来是"一条黄色承载带 + 压在上面的一条数据带"。 -->
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

          <!-- "进入中 · X"只在 X 与主文不是同一个词时才出：
               主文本身就是目的页名时，再补一句是同一句话说两遍。 -->
          <span
            v-if="info.target && info.target !== info.title"
            class="min-w-0 truncate text-xs text-ink-3"
          >
            <span class="hidden sm:inline">· </span>进入中 · {{ info.target }}
          </span>

          <!-- 右侧读数带：刻度 + 时间戳。机能风里"这一条是系统自己报的"靠这截收尾。 -->
          <span class="ml-auto hidden shrink-0 items-center gap-3 lg:flex" aria-hidden="true">
            <span class="ticks w-24" />
            <span class="readout">{{ stamp }}</span>
          </span>
        </span>

        <!-- 排空线：把"这条回执还剩多久"画出来 —— 到点自己退场这件事不该让用户猜。 -->
        <span class="receipt__drain" aria-hidden="true" />
      </div>
    </Transition>
  </Teleport>
</template>
