<script setup lang="ts">
/** 空态 / 错误态：**一块被括角框住的空格 + 一行编号读数 + 一格刻度**。
 *
 *  为什么不用 `NEmpty`：那是"通用后台"的形状 —— 居中插图 + 一句话 + 圆角，
 *  和这套"工单/档案"的语言不同源（它的插图与圆角还绕不过全站归零的清点）。
 *  更要紧的是它把两种语义混成一个样子：**空**（这里还没有东西）和**错**
 *  （哪里不对）需要给出不同的下一步，而形状可以共用、文案与编号必须分开。
 *
 *  两种语义靠 `tone` 区分：`quiet` 是空态（陈述事实），`alarm` 是错误态
 *  （编号走警示色，因为它要人停下来看一眼）。编号自己写 —— 调用方最清楚
 *  这一格是"队列为空"还是"订单不存在"。
 *
 *  纯展示：不 aria-hidden（空态是这一页当前唯一的内容，读屏用户必须听到它），
 *  主文用 role="status" 播报。
 */
withDefaults(
  defineProps<{
    /** 编号读数，例如 '00 / QUEUE EMPTY'、'ERR / 404' */
    code: string
    /** 一句话主文 */
    title: string
    /** 可选的第二行：下一步该做什么 */
    hint?: string
    /** quiet = 空态；alarm = 错误态（编号走 err 色） */
    tone?: 'quiet' | 'alarm'
  }>(),
  { tone: 'quiet' },
)
</script>

<template>
  <div class="grid place-items-center py-6">
    <div class="bracket-lg w-full max-w-sm px-5 py-6 text-center" style="--bracket-arm: 20px">
      <span class="readout" :style="tone === 'alarm' ? { color: 'var(--err)' } : undefined">
        {{ code }}
      </span>
      <div v-if="$slots.icon" class="mt-3 flex justify-center text-ink-4" aria-hidden="true">
        <slot name="icon" />
      </div>
      <p class="mt-3 text-sm font-semibold" role="status">{{ title }}</p>
      <p v-if="hint" class="mt-1 text-xs text-ink-3">{{ hint }}</p>
      <span class="ticks mx-auto mt-3.5 block w-28" aria-hidden="true" />
      <div v-if="$slots.action" class="mt-4 flex justify-center">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>
