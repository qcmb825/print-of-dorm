<script setup lang="ts">
/** 点阵走纸：一排格子从左往右依次通电，代替连续进度条。
 *
 *  为什么不用 NProgress：那是一条"条在长"的读数，形状属于通用后台；这台机器上
 *  进度是**纸在走**——一格一格过去，走到哪一格就是哪一格。它也比连续条更容易
 *  在余光里读：亮格的**个数**就是进度，不需要比较长度。
 *
 *  三条边界：
 *  1. **格子数是固定的**，不随百分比增减。格子数量一变，"走到第几格"这个读数
 *     就失去参照（同样的进度，格子多了显得更满）。
 *  2. **亮/暗是信息，不是动画**：减少动效下格子照常亮，只撤掉行首那一格的呼吸
 *     （见 base.css 的降级块）。
 *  3. 只在**上传中**出现。传完之后这一行换成页数读数，进度条整件撤掉 ——
 *     留着一条 100% 的格子阵，读起来像"还在传"。
 *
 *  aria：整行给 progressbar 角色与真实百分比。格子本身是装饰（aria-hidden），
 *  读屏用户听到的是数字，不是"二十五格亮了七格"。
 */
import { computed } from 'vue'

/** 格子总数固定为 20：一行二十格在窄屏上仍有 2px 以上的缝隙。 */
const CELLS = 20

const props = defineProps<{
  /** 0~100，超出范围会被夹到两端（服务端偶尔会回 100.4 这类值）。 */
  percent: number
}>()

const clamped = computed(() => Math.min(100, Math.max(0, props.percent)))

/** 亮格数**向上取整**：0% 时一格都不亮，但一旦开始就至少亮一格 ——
 *  否则 1% 与 0% 看起来是同一件事（"是不是卡住了"）。 */
const lit = computed(() => (clamped.value <= 0 ? 0 : Math.ceil((clamped.value / 100) * CELLS)))
</script>

<template>
  <div
    class="dots-progress"
    role="progressbar"
    :aria-valuenow="Math.round(clamped)"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <span
      v-for="i in CELLS"
      :key="i"
      class="dots-progress__cell"
      :class="[
        i <= lit && 'dots-progress__cell--on',
        i === lit && lit > 0 && lit < CELLS && 'dots-progress__cell--head',
      ]"
      aria-hidden="true"
    />
  </div>
</template>
