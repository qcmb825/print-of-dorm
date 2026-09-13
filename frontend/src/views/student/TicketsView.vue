<script setup lang="ts">
import TicketPanel from '@/components/TicketPanel.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <TicketPanel :staff="false" :current-user-id="auth.user?.id ?? 0" />
</template>
