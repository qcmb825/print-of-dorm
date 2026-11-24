<script setup lang="ts">
/** 页面底部的装饰条：一行**印刷标记** —— 危险斜纹色标、括角坐标框、刻度尺、版号读数。
 *
 *  为什么把它放在**文档流里**（而不是固定在视口某个角落）：
 *  页面是纵向铺满的，任何固定装饰都会压在某段文字上 —— 而"纹理/图形压在文字上"
 *  是这套视觉里唯一不能碰的红线（笔画会与图形混同，属 WCAG F83 型失败）。
 *  放在内容流的末尾就没有这个问题：它只和空白争地方。
 *
 *  2026-11-22 重写：撤掉了条码块与十六进制转储块。那两件是"伪技术"噪音 —
 *  一屏微小字符不产生信息，只产生脏；真实的技术文档页脚恰恰很空（一条色标、
 *  一个版号）。克制的单行比堆满记号的条带更接近参考对象的做法。
 *
 *  纯装饰：整块 aria-hidden，不可选中，不吃指针事件。
 */
defineProps<{ code?: string | number }>()
</script>

<template>
  <!-- 单行页脚。**视差深度必须写在这里而不是调用处**：这个组件是多根模板的历史包袱
       已随重写消除，但 data-parallax 留在组件内部可以让两端的布局文件保持原样。 -->
  <div
    class="mt-10 hidden items-center gap-4 select-none sm:flex"
    style="--depth: 5px"
    data-parallax
    aria-hidden="true"
  >
    <!-- 危险斜纹块：整套语言里唯一"有攻击性"的记号，这里只作色标。 -->
    <span class="hazard h-6 w-14 shrink-0 opacity-70" />

    <!-- 括角坐标框 + 扇区读数：与页头的编号系统同源。 -->
    <span class="bracket flex h-7 w-28 shrink-0 items-center justify-center">
      <span class="readout">{{ code ?? '--' }} / SEC</span>
    </span>

    <!-- 刻度尺铺满剩余宽度，收尾是版号。 -->
    <span class="ticks mb-1 min-w-8 flex-1" />
    <span class="readout shrink-0">NEKO PRINT SERVICE · REV 2.006</span>
  </div>
</template>
