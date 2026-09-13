<script setup lang="ts">
/** 账号下拉：昵称、角色、退出登录。两个布局共用，避免各写一份。 */
import { computed, h } from 'vue'
import { ChevronDown, LogOut } from '@lucide/vue'
import { NButton, NDropdown } from 'naive-ui'
import { useRouter } from 'vue-router'
import RoleTag from '@/components/RoleTag.vue'
import { confirmAction } from '@/composables/feedback'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const initial = computed(() => auth.displayName.slice(0, 1).toUpperCase() || '?')

const options = [
  {
    key: 'header',
    type: 'render' as const,
    render: () =>
      h('div', { class: 'px-3 py-2' }, [
        h('div', { class: 'text-[13px] font-bold' }, auth.user?.real_name || auth.displayName),
        h(
          'div',
          { class: 'tnum mt-0.5 text-[11px] opacity-60' },
          `学号 ${auth.user?.student_id || '—'}`,
        ),
      ]),
  },
  { key: 'divider', type: 'divider' as const },
  {
    key: 'logout',
    label: '退出登录',
    icon: () => h(LogOut, { size: 15 }),
  },
]

async function onSelect(key: string): Promise<void> {
  if (key !== 'logout') return
  const ok = await confirmAction({
    title: '退出登录',
    content: '确定要退出当前账号吗？',
    positiveText: '退出',
  })
  if (!ok) return
  await auth.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <NDropdown :options="options" trigger="click" placement="bottom-end" @select="onSelect">
    <NButton quaternary class="!px-2">
      <span class="flex items-center gap-2">
        <span
          class="grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold"
          style="background-color: var(--muted); color: var(--primary)"
          aria-hidden="true"
        >
          {{ initial }}
        </span>
        <span class="hidden max-w-[120px] truncate text-[13px] font-semibold sm:inline">
          {{ auth.displayName }}
        </span>
        <RoleTag v-if="auth.user" :role="auth.user.role" class="hidden sm:inline-flex" />
        <ChevronDown :size="14" class="opacity-50" />
      </span>
    </NButton>
  </NDropdown>
</template>
