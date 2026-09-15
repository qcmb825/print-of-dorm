<script setup lang="ts">
/** 账号管理。
 *  普通管理员只能查看列表（后端在 SQL 层就把超管账号过滤掉了）；改角色/禁用/删除只有超管能做。
 *  明文密码默认不显示，只有超管显式打开开关才拉取，且后端会记一条审计日志。 */
import { computed, h, onMounted, ref } from 'vue'
import { Eye, RefreshCw, Search, ShieldCheck, Trash2, UserCog } from '@lucide/vue'
import {
  NButton,
  NDataTable,
  NDropdown,
  NEmpty,
  NInput,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
  type DataTableColumns,
  type DropdownOption,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { adminApi } from '@/api/endpoints'
import { ROLE_LABELS, type AdminUser, type Role } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import RoleTag from '@/components/RoleTag.vue'
import { confirmAction } from '@/composables/feedback'
import { shortTime } from '@/utils/format'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const message = useMessage()

const users = ref<AdminUser[]>([])
const loading = ref(true)
const keyword = ref('')
const roleFilter = ref<'all' | Role>('all')
const withPassword = ref(false)

const isSuper = computed(() => auth.isSuper)

const roleOptions = [
  { label: '全部角色', value: 'all' },
  { label: ROLE_LABELS.user, value: 'user' },
  { label: ROLE_LABELS.admin, value: 'admin' },
  { label: ROLE_LABELS.super, value: 'super' },
]

const roleDropdownOptions: DropdownOption[] = [
  { label: `设为${ROLE_LABELS.user}`, key: 'user' },
  { label: `设为${ROLE_LABELS.admin}`, key: 'admin' },
]

const filtered = computed(() => {
  const needle = keyword.value.trim().toLowerCase()
  return users.value.filter((user) => {
    if (roleFilter.value !== 'all' && user.role !== roleFilter.value) return false
    if (!needle) return true
    return [user.nickname, user.real_name, user.student_id, user.dorm, user.contact ?? '']
      .join(' ')
      .toLowerCase()
      .includes(needle)
  })
})

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await adminApi.users(isSuper.value && withPassword.value)
    users.value = data.users
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载账号列表失败')
  } finally {
    loading.value = false
  }
}

/** 超管账号不允许被改动（后端也会拒绝），这里把入口一并禁掉。 */
function isLocked(user: AdminUser): boolean {
  return user.role === 'super'
}

async function setRole(user: AdminUser, role: Role): Promise<void> {
  try {
    await adminApi.setRole(user.id, role)
    message.success(`已将「${user.nickname}」设为${ROLE_LABELS[role]}`)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '修改角色失败')
  }
}

async function toggleStatus(user: AdminUser): Promise<void> {
  const next = user.status === 'active' ? 'disabled' : 'active'
  try {
    await adminApi.setStatus(user.id, next)
    message.success(next === 'active' ? '账号已启用' : '账号已禁用')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '修改状态失败')
  }
}

async function removeUser(user: AdminUser): Promise<void> {
  const ok = await confirmAction({
    title: '删除账号',
    content: `确定删除「${user.nickname}」吗？该账号的订单会保留，但会解除关联。此操作不可撤销。`,
    positiveText: '删除',
  })
  if (!ok) return
  try {
    await adminApi.removeUser(user.id)
    message.success('账号已删除')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除失败')
  }
}

const columns = computed<DataTableColumns<AdminUser>>(() => {
  const base: DataTableColumns<AdminUser> = [
    {
      title: '账号',
      key: 'nickname',
      width: 150,
      render: (row) =>
        h('div', { class: 'min-w-0' }, [
          h('div', { class: 'truncate text-[13px] font-semibold' }, row.nickname),
          h('div', { class: 'tnum text-[11px] opacity-60' }, `#${row.id}`),
        ]),
    },
    {
      title: '姓名 / 学号',
      key: 'real_name',
      width: 150,
      render: (row) =>
        h('div', { class: 'min-w-0' }, [
          h('div', { class: 'truncate text-[13px]' }, row.real_name || '—'),
          h('div', { class: 'tnum truncate text-[11px] opacity-60' }, row.student_id || '—'),
        ]),
    },
    {
      title: '宿舍',
      key: 'dorm',
      width: 118,
      render: (row) => h('span', { class: 'truncate text-[12px]' }, row.dorm || '—'),
    },
    {
      title: '联系方式',
      key: 'contact',
      width: 168,
      render: (row) =>
        h(
          'span',
          { class: 'truncate text-[12px] opacity-80' },
          row.contact ? `${row.contact_type === 'wechat' ? '微信' : row.contact_type === 'qq' ? 'QQ' : '邮箱'} ${row.contact}` : '—',
        ),
    },
    {
      title: '角色',
      key: 'role',
      width: 100,
      render: (row) => h(RoleTag, { role: row.role }),
    },
    {
      title: '状态',
      key: 'status',
      width: 82,
      render: (row) =>
        h(
          'span',
          {
            class: 'tech-label',
            style: { color: row.status === 'active' ? 'var(--ok)' : 'var(--err)' },
          },
          row.status === 'active' ? '启用' : '禁用',
        ),
    },
    {
      title: '订单 / 接单',
      key: 'order_count',
      width: 96,
      render: (row) =>
        h('span', { class: 'tnum text-[12px]' }, `${row.order_count} / ${row.claimed_count}`),
    },
    {
      title: '注册 / 最后登录',
      key: 'last_login',
      width: 140,
      render: (row) =>
        h('div', { class: 'tnum text-[11px] opacity-70' }, [
          h('div', {}, shortTime(row.create_time)),
          h('div', {}, shortTime(row.last_login)),
        ]),
    },
  ]

  if (isSuper.value && withPassword.value) {
    base.push({
      title: '明文密码',
      key: 'password',
      width: 130,
      render: (row) =>
        h(
          'span',
          { class: 'tnum text-[12px]', style: { color: 'var(--warn)' } },
          row.password ?? '—',
        ),
    })
  }

  if (isSuper.value) {
    base.push({
      title: '操作',
      key: 'actions',
      width: 180,
      render: (row) =>
        h('div', { class: 'flex items-center gap-1' }, [
          h(
            NDropdown,
            {
              options: roleDropdownOptions,
              trigger: 'click',
              disabled: isLocked(row),
              onSelect: (key: string) => void setRole(row, key as Role),
            },
            {
              default: () =>
                h(
                  NButton,
                  { size: 'tiny', quaternary: true, disabled: isLocked(row), title: '修改角色' },
                  { icon: () => h(UserCog, { size: 13 }) },
                ),
            },
          ),
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              disabled: isLocked(row),
              title: row.status === 'active' ? '禁用账号' : '启用账号',
              onClick: () => void toggleStatus(row),
            },
            { icon: () => h(ShieldCheck, { size: 13 }) },
          ),
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              disabled: isLocked(row),
              title: '删除账号',
              onClick: () => void removeUser(row),
            },
            { icon: () => h(Trash2, { size: 13 }) },
          ),
        ]),
    })
  }

  return base
})

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="账号管理" subtitle="改角色、禁用、删除账号均会写入审计日志">
      <template #actions>
        <span v-if="isSuper" class="flex items-center gap-2">
          <NSwitch v-model:value="withPassword" size="small" @update:value="load()" />
          <span class="tech-label flex items-center gap-1 text-ink-3">
            <Eye :size="12" />
            显示明文密码
          </span>
        </span>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div class="panel mb-3 flex flex-wrap items-center gap-2 p-2.5">
      <NInput v-model:value="keyword" placeholder="搜索昵称 / 姓名 / 学号 / 宿舍" size="small" class="!w-[260px]">
        <template #prefix><Search :size="14" /></template>
      </NInput>
      <NSelect
        v-model:value="roleFilter"
        :options="roleOptions"
        size="small"
        class="!w-[128px]"
        :consistent-menu-width="false"
      />
      <span class="tech-label ml-auto text-ink-4">
        显示 {{ filtered.length }} / {{ users.length }} 个账号
      </span>
    </div>

    <p
      v-if="withPassword"
      class="mb-3 rounded-lg border px-3 py-2 text-[12px]"
      style="
        border-color: var(--warn-tint-border);
        background-color: var(--warn-tint);
        color: var(--warn);
      "
    >
      正在显示全部账号的明文密码。此操作已被记录到安全日志，请勿截图或外传。
    </p>

    <div class="panel overflow-hidden">
      <div v-if="loading && !users.length" class="flex flex-col gap-2 p-3">
        <NSkeleton v-for="index in 6" :key="index" height="48px" :sharp="false" />
      </div>
      <div v-else-if="!filtered.length" class="grid place-items-center py-14">
        <NEmpty description="没有匹配的账号" />
      </div>
      <NDataTable
        v-else
        :columns="columns"
        :data="filtered"
        :bordered="false"
        :single-line="false"
        size="small"
        :scroll-x="1180"
        :row-key="(row: AdminUser) => row.id"
      />
    </div>
  </div>
</template>
