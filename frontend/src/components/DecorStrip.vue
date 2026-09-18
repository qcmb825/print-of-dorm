<script setup lang="ts">
/** 页面底部的装饰条：一排气动/制图记号 —— 危险斜纹块、半调网点块、括角坐标框、
 *  以及一串版号读数。
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
defineProps<{ code?: string | number }>()
</script>

<template>
  <div class="mt-4 flex items-end gap-4 overflow-hidden select-none" aria-hidden="true">
    <!-- 危险斜纹块：整套语言里唯一"有攻击性"的记号，这里只作色标。 -->
    <span class="hazard h-7 w-16 shrink-0 opacity-70" />

    <!-- 半调网点块：越靠右越疏，做一点密度过渡，不做出生硬的方块边。 -->
    <span
      class="h-7 w-24 shrink-0"
      style="
        background-image: radial-gradient(var(--hazard-ink) 1px, transparent 1.3px);
        background-size: 5px 5px;
        mask-image: linear-gradient(to right, #000, transparent);
        -webkit-mask-image: linear-gradient(to right, #000, transparent);
      "
    />

    <!-- 括角坐标框 + 版号读数：与页面右上角的编号系统同源。 -->
    <span class="bracket flex h-7 w-28 shrink-0 items-center justify-center">
      <span class="readout">{{ code ?? '--' }} / SEC</span>
    </span>

    <!-- 一串刻度尺 + 制图用的短读数，铺满剩余宽度。 -->
    <span class="ticks mb-1 min-w-8 flex-1" />
    <span class="readout mb-0.5 hidden shrink-0 sm:inline">REV 2.006 / GRID 48</span>
  </div>
</template>
