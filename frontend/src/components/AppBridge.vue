<script setup lang="ts">
/** 唯一职责：在 Naive UI 的 provider 内部把 message / dialog 注册成全局可用。
 *  useMessage() 必须在 provider 的子树里调用，所以只能靠一个组件来桥接。
 */
import { useDialog, useMessage } from 'naive-ui'
import { registerFeedback } from '@/composables/feedback'

registerFeedback({ message: useMessage(), dialog: useDialog() })
</script>

<template>
  <span />
</template>
