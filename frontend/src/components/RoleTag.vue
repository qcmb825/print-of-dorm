<script setup lang="ts">
import { computed } from 'vue'
import { ROLE_LABELS, type Role } from '@/api/types'
import { ROLE_BG_VAR, ROLE_COLOR_VAR } from '@/utils/format'

const props = defineProps<{ role: Role }>()

const style = computed(() => ({
  color: ROLE_COLOR_VAR[props.role],
  backgroundColor: ROLE_BG_VAR[props.role],
}))
</script>

<template>
  <span
    class="tech-label inline-flex items-center px-2 py-[3px] leading-none tech-label--cn text-xs"
    :style="style"
  >
    {{ ROLE_LABELS[role] }}
  </span>
</template>
