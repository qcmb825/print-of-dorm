<script setup lang="ts">
/** 订单台：待接单池 / 我接的单 / 全部，支持状态筛选、分页、接单释放改状态、下载文件。
 *  窄屏切换成卡片列表 —— 表格在手机上没法用，但管理员确实会拿手机接单。 */
import { computed, h, onMounted, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn, useMediaQuery } from '@vueuse/core'
import { Download, Inbox, Lock, Package, RefreshCw, Unlock } from '@lucide/vue'
import {
  NButton,
  NDataTable,
  NDropdown,
  NEmpty,
  NPagination,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
  type DataTableColumns,
  type DropdownOption,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { staffOrderApi } from '@/api/endpoints'
import { ORDER_STATUSES, type Order, type OrderStatus } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import StatusTag from '@/components/StatusTag.vue'
import { useAuthStore } from '@/stores/auth'
import { COLOR_TYPE_LABEL, DUPLEX_LABEL, pickupCodeLabel, shortTime } from '@/utils/format'

const auth = useAuthStore()
const message = useMessage()

/** 权限判定依据当前登录账号，直接从 store 取，避免布局再往下传一层 props。 */
const isSuper = computed(() => auth.isSuper)
const currentUserId = computed(() => auth.user?.id ?? 0)

const AUTO_REFRESH_MS = 10_000

const orders = ref<Order[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(20)
const status = ref<string>('')
const scope = ref<'pool' | 'mine' | 'all'>('pool')
const loading = ref(true)
const autoRefresh = ref(true)
const busyId = ref<number | null>(null)

const isNarrow = useMediaQuery('(max-width: 900px)')

const scopeOptions = [
  { label: '待接单池', value: 'pool' },
  { label: '我接的单', value: 'mine' },
  { label: '全部订单', value: 'all' },
]

const statusOptions = [
  { label: '全部状态', value: '' },
  ...ORDER_STATUSES.map((item) => ({ label: item, value: item })),
]

const statusDropdownOptions: DropdownOption[] = ORDER_STATUSES.map((item) => ({
  label: item,
  key: item,
}))

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / size.value)))

const poolSummary = computed(() => ({
  pool: orders.value.filter((order) => order.claimed_by === null).length,
  mine: orders.value.filter((order) => order.claimed_by === currentUserId.value).length,
  ready: orders.value.filter((order) => order.status === '可取了').length,
}))

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await staffOrderApi.list({
      page: page.value,
      size: size.value,
      status: status.value || undefined,
      scope: scope.value,
    })
    orders.value = data.orders
    total.value = data.total
  } catch (error) {
    if (!silent) message.error(error instanceof ApiError ? error.message : '加载订单失败')
  } finally {
    loading.value = false
  }
}

/** 接单人本人或超管可以释放；超管或本人接的单可以改状态 —— 与后端判定保持一致。 */
function canRelease(order: Order): boolean {
  return order.claimed_by !== null && (isSuper.value || order.claimed_by === currentUserId.value)
}

function canDownload(order: Order): boolean {
  return order.claimed_by !== null && (isSuper.value || order.claimed_by === currentUserId.value)
}

function canChangeStatus(order: Order): boolean {
  return isSuper.value || order.claimed_by === currentUserId.value
}

async function claim(order: Order): Promise<void> {
  busyId.value = order.id
  try {
    await staffOrderApi.claim(order.id)
    message.success(`已接单 #${order.id}`)
    await load(true)
  } catch (error) {
    // 抢单失败（409）是正常竞争，如实把后端的话转给用户
    message.error(error instanceof ApiError ? error.message : '接单失败')
    await load(true)
  } finally {
    busyId.value = null
  }
}

async function release(order: Order): Promise<void> {
  busyId.value = order.id
  try {
    await staffOrderApi.release(order.id)
    message.success(`已释放 #${order.id}`)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '释放失败')
  } finally {
    busyId.value = null
  }
}

async function changeStatus(order: Order, next: OrderStatus): Promise<void> {
  if (next === order.status) return
  busyId.value = order.id
  try {
    await staffOrderApi.setStatus(order.id, next)
    message.success(`订单 #${order.id} 已更新为「${next}」`)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '更新状态失败')
  } finally {
    busyId.value = null
  }
}

async function download(order: Order): Promise<void> {
  try {
    await staffOrderApi.download(order.id, order.filename)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '下载失败')
  }
}

function statusButton(order: Order) {
  return h(
    NDropdown,
    {
      options: statusDropdownOptions,
      trigger: 'click',
      disabled: !canChangeStatus(order),
      onSelect: (key: string) => void changeStatus(order, key as OrderStatus),
    },
    {
      default: () =>
        h(
          NButton,
          { size: 'tiny', quaternary: true, disabled: !canChangeStatus(order) },
          { default: () => '改状态' },
        ),
    },
  )
}

const columns = computed<DataTableColumns<Order>>(() => [
  {
    title: '订单',
    key: 'id',
    width: 168,
    render: (row) =>
      h('div', { class: 'min-w-0' }, [
        h('div', { class: 'truncate text-[13px] font-semibold', title: row.filename }, row.filename),
        h('div', { class: 'tnum text-[11px] opacity-60' }, `#${row.id} · ${shortTime(row.create_time)}`),
      ]),
  },
  {
    title: '下单人',
    key: 'owner_nickname',
    width: 132,
    render: (row) =>
      h('div', { class: 'min-w-0' }, [
        h('div', { class: 'truncate text-[13px]' }, row.owner_nickname ?? '（账号已注销）'),
        h('div', { class: 'truncate text-[11px] opacity-60' }, row.owner_dorm ?? '—'),
      ]),
  },
  {
    title: '规格',
    key: 'spec',
    width: 106,
    render: (row) =>
      h(
        'span',
        { class: 'text-[12px] opacity-80' },
        `${row.color_type ? COLOR_TYPE_LABEL[row.color_type] : '黑白'} / ${
          row.duplex ? DUPLEX_LABEL[row.duplex] : '单面'
        }`,
      ),
  },
  {
    title: '状态',
    key: 'status',
    width: 92,
    render: (row) => h(StatusTag, { status: row.status, size: 'sm' }),
  },
  {
    title: '取件码',
    key: 'pickup_code',
    width: 78,
    render: (row) =>
      h('span', { class: 'tnum text-[14px] font-bold tracking-wider' }, pickupCodeLabel(row.pickup_code)),
  },
  {
    title: '接单人',
    key: 'claimer_nickname',
    width: 96,
    render: (row) =>
      h(
        'span',
        { class: 'text-[12px]' },
        row.claimer_nickname ?? h('span', { class: 'opacity-50' }, '未接单'),
      ),
  },
  {
    title: '操作',
    key: 'actions',
    width: 210,
    render: (row) =>
      h('div', { class: 'flex flex-wrap items-center gap-1' }, [
        row.claimed_by === null
          ? h(
              NButton,
              {
                size: 'tiny',
                type: 'primary',
                loading: busyId.value === row.id,
                onClick: () => void claim(row),
              },
              { default: () => '接单' },
            )
          : null,
        canChangeStatus(row) ? statusButton(row) : null,
        canRelease(row)
          ? h(
              NButton,
              {
                size: 'tiny',
                quaternary: true,
                disabled: busyId.value === row.id,
                onClick: () => void release(row),
              },
              { default: () => '释放' },
            )
          : null,
        canDownload(row)
          ? h(
              NButton,
              {
                size: 'tiny',
                quaternary: true,
                circle: true,
                title: '下载文件',
                onClick: () => void download(row),
              },
              { icon: () => h(Download, { size: 13 }) },
            )
          : null,
      ]),
  },
])

/* 分页与筛选：不用 watcher 串联，一律由交互事件显式触发，
 * 保证一次点击只发一次请求（watch 链很容易在"重置页码"时双发）。 */
function onPageChange(next: number): void {
  page.value = next
  void load()
}

function onPageSizeChange(next: number): void {
  size.value = next
  page.value = 1
  void load()
}

function onFilterChange(): void {
  page.value = 1
  void load()
}

/* 自动刷新：页面不可见时暂停，避免后台标签页空转 */
const visibility = useDocumentVisibility()
const { pause, resume } = useIntervalFn(() => void load(true), AUTO_REFRESH_MS, { immediate: false })

watch(visibility, (state) => {
  if (state === 'visible' && autoRefresh.value) {
    resume()
    void load(true)
  } else {
    pause()
  }
})

watch(autoRefresh, (enabled) => {
  if (enabled && visibility.value === 'visible') {
    resume()
    void load(true)
  } else {
    pause()
  }
})

onMounted(async () => {
  await load()
  if (autoRefresh.value) resume()
})
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="订单台" subtitle="接单后即可改状态、下载文件；超管可操作任意订单">
      <template #actions>
        <span class="flex items-center gap-2">
          <NSwitch v-model:value="autoRefresh" size="small" />
          <span class="tech-label text-ink-3">自动刷新 10s</span>
        </span>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <StatCard label="当页订单" :value="orders.length" :icon="Package" />
      <StatCard label="本页待接单" :value="poolSummary.pool" accent />
      <StatCard label="本页我接的" :value="poolSummary.mine" />
      <StatCard label="本页可取了" :value="poolSummary.ready" />
    </div>

    <div class="panel mb-3 flex flex-wrap items-center gap-2 p-2.5">
      <NSelect
        :value="scope"
        :options="scopeOptions"
        size="small"
        class="!w-[132px]"
        :consistent-menu-width="false"
        @update:value="
          (value: 'pool' | 'mine' | 'all') => {
            scope = value
            onFilterChange()
          }
        "
      />
      <NSelect
        :value="status"
        :options="statusOptions"
        size="small"
        class="!w-[128px]"
        :consistent-menu-width="false"
        @update:value="
          (value: string) => {
            status = value
            onFilterChange()
          }
        "
      />
      <span class="tech-label ml-auto text-ink-4">共 {{ total }} 条</span>
    </div>

    <div class="panel overflow-hidden">
      <div v-if="loading && !orders.length" class="flex flex-col gap-2 p-3">
        <NSkeleton v-for="index in 5" :key="index" height="52px" :sharp="false" />
      </div>

      <div v-else-if="!orders.length" class="grid place-items-center py-14">
        <NEmpty :description="scope === 'pool' ? '待接单池是空的，都处理完了' : '没有符合条件的订单'">
          <template #icon><Inbox :size="32" /></template>
        </NEmpty>
      </div>

      <!-- 宽屏：表格 -->
      <NDataTable
        v-else-if="!isNarrow"
        :columns="columns"
        :data="orders"
        :bordered="false"
        :single-line="false"
        size="small"
        :row-key="(row: Order) => row.id"
      />

      <!-- 窄屏：卡片 -->
      <ul v-else class="flex list-none flex-col p-0">
        <li
          v-for="order in orders"
          :key="order.id"
          class="border-b p-3.5 last:border-b-0"
          style="border-color: var(--border)"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <p class="truncate text-[13px] font-bold">{{ order.filename }}</p>
              <p class="tnum mt-0.5 text-[11px] text-ink-4">
                #{{ order.id }} · {{ shortTime(order.create_time) }}
              </p>
            </div>
            <StatusTag :status="order.status" size="sm" />
          </div>

          <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-3">
            <span>{{ order.owner_nickname ?? '（已注销）' }} · {{ order.owner_dorm ?? '—' }}</span>
            <span class="tnum">取件码 {{ pickupCodeLabel(order.pickup_code) }}</span>
            <span v-if="order.claimer_nickname">接单 {{ order.claimer_nickname }}</span>
          </div>

          <div class="mt-3 flex flex-wrap items-center gap-1.5">
            <NButton
              v-if="order.claimed_by === null"
              size="tiny"
              type="primary"
              :loading="busyId === order.id"
              @click="claim(order)"
            >
              <template #icon><Lock :size="12" /></template>
              接单
            </NButton>
            <NDropdown
              v-if="canChangeStatus(order)"
              :options="statusDropdownOptions"
              trigger="click"
              @select="(key: string) => changeStatus(order, key as OrderStatus)"
            >
              <NButton size="tiny" quaternary>改状态</NButton>
            </NDropdown>
            <NButton
              v-if="canRelease(order)"
              size="tiny"
              quaternary
              :disabled="busyId === order.id"
              @click="release(order)"
            >
              <template #icon><Unlock :size="12" /></template>
              释放
            </NButton>
            <NButton v-if="canDownload(order)" size="tiny" quaternary @click="download(order)">
              <template #icon><Download :size="12" /></template>
              下载
            </NButton>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="total > size" class="mt-4 flex justify-center">
      <NPagination
        :page="page"
        :page-size="size"
        :page-count="pageCount"
        :page-sizes="[20, 50, 100]"
        show-size-picker
        @update:page="onPageChange"
        @update:page-size="onPageSizeChange"
      />
    </div>
  </div>
</template>
