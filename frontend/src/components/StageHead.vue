<script setup lang="ts">
/** 表单分段头：`▰ 01 // 选择文件 ————————— STEP 1/3`。
 *
 *  为什么要有它：下单页是学生端**唯一的操作页**，也是最长的一页。长表单在手机上
 *  滚起来是一整坨 —— 填到一半退出去再回来，第一件事是"我刚才填到哪了"。
 *  切段之后，"我在第几步"变成眼睛能看到的，而不是靠记忆。
 *
 *  它不是那种通用的步骤条（带圆点、带连接线、当前步高亮）：那套是向导
 *  （wizard）的形状，暗示"你只能一步一步来"。这一页三段的字段一直是全部可编辑的，
 *  所以这里只给**编号 + 名称 + 一条线**，是分隔不是导航。
 *
 *  编号走 --stack-mono（与页面编号、读数同一套语气），中文名走标题字族：
 *  中文放进等宽栈会带上 0.14em 字距，两个字之间空出一大块，反而不好读。
 */
defineProps<{
  /** 段号，如 '01' */
  code: string
  /** 段落名，中文 */
  title: string
  /** 右侧的进度读数，如 'STEP 1/3'。窄屏隐藏（那一行已经很挤） */
  step?: string
}>()
</script>

<template>
  <div class="flex items-center gap-2.5">
    <span class="cut h-3.5 w-2 shrink-0 bg-[var(--accent-text)]" aria-hidden="true" />
    <span class="readout shrink-0">{{ code }} //</span>
    <h2 class="font-heading shrink-0 text-sm font-bold">{{ title }}</h2>
    <span class="h-px min-w-4 flex-1" style="background-color: var(--border)" aria-hidden="true" />
    <span v-if="step" class="readout hidden shrink-0 sm:inline">{{ step }}</span>
  </div>
</template>
