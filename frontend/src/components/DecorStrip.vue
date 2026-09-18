<script setup lang="ts">
/** 页面底部的装饰条：一排**机读记号** —— 危险斜纹色标、条码块、括角坐标框、
 *  一串版号读数，以及大号的十六进制转储块。
 *
 *  为什么把它放在**文档流里**（而不是固定在视口某个角落）：
 *  页面是纵向铺满的，任何固定装饰都会压在某段文字上 —— 而"纹理/图形压在文字上"
 *  是这套视觉里唯一不能碰的红线（笔画会与图形混同，属 WCAG F83 型失败）。
 *  放在内容流的末尾就没有这个问题：它只和空白争地方。
 *
 *  同时它也是这套语言的"印刷标记"：真实的技术文档底部会有色标、套准线、版号 ——
 *  这里用同样的位置放同样的东西，读起来就不是"贴上去的图案"，而是这份文件的一部分。
 *
 *  纯装饰：整块 aria-hidden，不可选中，不吃指针事件。
 */
import { computed } from 'vue'

const props = defineProps<{ code?: string | number }>()

/** 十六进制转储的内容是**真的**：这段字符串（页面编号 + 本次渲染的 ISO 时间戳）
 *  的 UTF-8 字节，每行 16 字节、前面带偏移量。
 *  装饰件可以"无意义"，但不该"假" —— 随机字节在截图里和真字节长得一样，
 *  可一旦有人真去数（或者把它丢进文本对照），它就会露馅。
 *  这里还额外捡到一个好处：偏移量与换行让这块看起来是"被读出来的一段内存"，
 *  而随机 32 位十六进制串更像一块噪声。
 *  它是 computed 而不是 ref：页面编号变了（换页）会重算，否则一段渲染的成本只付一次。 */
const dump = computed(() => {
  const bytes = new TextEncoder().encode(`${props.code ?? '--'}@${new Date().toISOString()}`)
  const lines: string[] = []
  for (let i = 0; i < bytes.length && lines.length < 3; i += 16) {
    const hex = Array.from(bytes.slice(i, i + 16))
      .map((byte) => byte.toString(16).padStart(2, '0').toUpperCase())
      .join(' ')
    lines.push(`${i.toString(16).padStart(4, '0').toUpperCase()}  ${hex}`)
  }
  return lines
})
</script>

<template>
  <div class="mt-4 flex items-end gap-4 overflow-hidden select-none" aria-hidden="true">
    <!-- 危险斜纹块：整套语言里唯一"有攻击性"的记号，这里只作色标。 -->
    <span class="hazard h-7 w-16 shrink-0 opacity-70" />

    <!-- 条码块：三层互质周期的竖条叠出来的疏密。它顶替的是原来的半调网点块 ——
         网点是"油墨印在纸上"，条码是"屏幕上被扫的东西"，同一块位置的两种语言。 -->
    <span class="decor-bars h-7 w-24 shrink-0 opacity-80" />

    <!-- 括角坐标框 + 版号读数：与页面右上角的编号系统同源。 -->
    <span class="bracket flex h-7 w-28 shrink-0 items-center justify-center">
      <span class="readout">{{ code ?? '--' }} / SEC</span>
    </span>

    <!-- 一串刻度尺 + 制图用的短读数，铺满剩余宽度。 -->
    <span class="ticks mb-1 min-w-8 flex-1" />
    <span class="readout mb-0.5 hidden shrink-0 sm:inline">REV 2.006 / GRID 48</span>
  </div>
  <!-- 大号装饰组：这一页尺度最大的几件，压在内容末尾的空处。
       全部在文档流里，所以永远不会和正文抢位置。
       转储块这一件是"屏"的签名：纸上不会有十六进制偏移量。
       版号走自家产品名 NEKO PRINT SERVICE —— 版式学的是技术档案那套
       （密级/版号/页码/转储），名字用系统自己的，不借别的作品。 -->
  <div class="mt-5 flex flex-wrap items-end gap-x-6 gap-y-3" aria-hidden="true">
    <div class="data-dump w-full shrink-0 sm:w-60">
      <div v-for="line in dump" :key="line">{{ line }}</div>
    </div>
    <span class="decor-band h-11 min-w-40 flex-1" />
    <span class="readout-lg pb-1">NEKO PRINT SERVICE / SEC {{ code ?? '--' }}</span>
  </div>
</template>
