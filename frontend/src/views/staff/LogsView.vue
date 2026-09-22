<script setup lang="ts">
/** 历史记录：全部订单操作留痕的查询与统计（管理端）。
 *
 *  与订单详情页那份时间线是同一份数据（`order_logs`），区别是这里看全局：
 *  「这段时间里大家都在干什么、哪一档堵住了」。页面分三块，从上到下依次是
 *  **筛条件 → 统计 → 明细**，因为读的人通常是先圈时间范围，再看总览，最后才逐条看。
 *
 *  两个约定：
 *  1. 列表与统计**共用同一份筛选条件**（后端也是同一个 WHERE）——
 *     各带各的筛选条件的话，统计上的数字和下面的明细对不上，而两边都"看着没错"。
 *  2. 动作文案、状态清单**全部来自后端响应**（`by_action` / `by_status`），
 *     前端不另抄一份：抄的那份不会报错，只会在后端调整时静静地过期。
 */
import { computed, h, onMounted, reactive, ref } from 'vue'
import { RefreshCw, Search, X } from '@lucide/vue'
import { NButton, NDataTable, NDatePicker, NInput, NSelect } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import { ApiError } from '@/api/client'
import { historyApi } from '@/api/endpoints'
import type { OrderLogRow, OrderLogStatsResponse, OrderStatus } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import StatusTag from '@/components/StatusTag.vue'
import { notify } from '@/composables/feedback'
import { LOG_ACTION_COLOR, fullTime } from '@/utils/format'

const filters = reactive({
  range: null as [number, number] | null,
  action: null as string | null,
  status: null as OrderStatus | null,
  q: '',
})

const logs = ref<OrderLogRow[]>([])
const stats = ref<OrderLogStatsResponse | null>(null)
const loading = ref(false)
const page = ref(1)
const size = ref(30)
const total = ref(0)

/** 本地日期（YYYY-MM-DD）。用本地时区而不是 toISOString：后者是 UTC，
 *  在东八区会让「今天」在晚上 8 点之后变成「明天」，筛出来的结果莫名其妙少一天。 */
function localDate(ts: number): string {
  const d = new Date(ts)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

function queryParams(): Record<string, string | number> {
  const params: Record<string, string | number> = {}
  if (filters.range) {
    params.from = localDate(filters.range[0])
    params.to = localDate(filters.range[1])
  }
  if (filters.action) params.action = filters.action
  if (filters.status) params.status = filters.status
  if (filters.q.trim()) params.q = filters.q.trim()
  return params
}

async function load(): Promise<void> {
  loading.value = true
  try {
    const params = queryParams()
    const [list, overview] = await Promise.all([
      historyApi.list({ ...params, page: page.value, size: size.value }),
      historyApi.stats(params),
    ])
    logs.value = list.logs
    total.value = list.total
    stats.value = overview
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '历史记录读取失败 · 稍后重试')
  } finally {
    loading.value = false
  }
}

/** 改筛选条件一定要回到第 1 页：留在第 5 页会看到空列表，看着像「筛出来没有数据」。 */
function applyFilters(): void {
  page.value = 1
  void load()
}

function resetFilters(): void {
  filters.range = null
  filters.action = null
  filters.status = null
  filters.q = ''
  applyFilters()
}

const hasFilters = computed(
  () => !!(filters.range || filters.action || filters.status || filters.q.trim()),
)

// 下拉选项全部来自后端响应，见文件头第 2 条
const actionOptions = computed(() =>
  (stats.value?.by_action ?? []).map((item) => ({
    label: `${item.label}（${item.count}）`,
    value: item.action,
  })),
)
const statusOptions = computed(() =>
  (stats.value?.by_status ?? []).map((item) => ({
    label: `${item.status}（${item.count}）`,
    value: item.status,
  })),
)

/** 按天趋势画成一排小竖条：不引 ECharts —— 这一页只有一个单序列，
 *  为它加载 200KB 的图表库不值（看板页那边是另一回事，它图表多）。
 *  高度按最大值归一，最少留 2px，否则「有 1 条」和「一条没有」看起来一样。 */
const trend = computed(() => {
  const days = stats.value?.by_day ?? []
  const max = Math.max(1, ...days.map((d) => d.count))
  return days.map((d) => ({ ...d, percent: Math.round((d.count / max) * 100) }))
})

const statusFlow = computed(() => (stats.value?.by_status ?? []).filter((s) => s.count > 0))

const columns = computed<DataTableColumns<OrderLogRow>>(() => [
  {
    title: '时间',
    key: 'create_time',
    width: 165,
    render: (row) => h('span', { class: 'tnum text-[12px] text-ink-2' }, fullTime(row.create_time)),
  },
  {
    title: '订单',
    key: 'order_id',
    width: 90,
    render: (row) => h('span', { class: 'tnum text-[12px]' }, `#${row.order_id}`),
  },
  {
    title: '操作',
    key: 'action',
    width: 110,
    render: (row) =>
      h('span', { class: 'inline-flex items-center gap-1.5 text-[12px] font-semibold' }, [
        h('span', {
          class: 'inline-block size-2 shrink-0',
          style: `background-color: ${LOG_ACTION_COLOR[row.action] ?? 'var(--text-tertiary)'}`,
        }),
        row.action_label,
      ]),
  },
  {
    title: '说明',
    key: 'detail',
    minWidth: 260,
    render: (row) => h('span', { class: 'text-[12px] text-ink-2' }, row.detail || '—'),
  },
  {
    title: '结果状态',
    key: 'to_status',
    width: 110,
    render: (row) =>
      row.to_status
        ? h(StatusTag, { status: row.to_status, size: 'sm' })
        : h('span', { class: 'text-[12px] text-ink-4' }, '—'),
  },
  {
    title: '操作人',
    key: 'actor_nickname',
    width: 150,
    render: (row) =>
      h('span', { class: 'text-[12px]' }, [
        row.actor_nickname ?? h('span', { class: 'opacity-50' }, '（无归属）'),
        row.actor_role_label ? h('span', { class: 'ml-1 text-[11px] text-ink-4' },
                                 `· ${row.actor_role_label}`) : null,
      ]),
  },
])

/** 分页配置写在 setup 里而不是模板内联：内联那版要在模板里给 ref 赋值，
 *  编译出来是什么行为得靠记；写在这里一眼就是 page.value = next。 */
const pagination = computed(() => ({
  page: page.value,
  pageSize: size.value,
  itemCount: total.value,
  showSizePicker: true,
  pageSizes: [20, 30, 50, 100],
  // Naive 的 RenderPrefix 把 itemCount 声明成 number | undefined（分页器还没拿到总数时），
  // 照着它写就行 —— 这里给的 itemCount 恒有值，兜一个 0 只为对齐类型。
  prefix: ({ itemCount }: { itemCount: number | undefined }) => `共 ${itemCount ?? 0} 条`,
  onUpdatePage: (next: number) => {
    page.value = next
    void load()
  },
  onUpdatePageSize: (next: number) => {
    size.value = next
    page.value = 1
    void load()
  },
}))

onMounted(() => {
  void load()
})
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="历史记录" subtitle="全部订单操作留痕 · 按时间 / 类型 / 结果状态 / 关键词筛选">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <!-- 筛选区 -->
    <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
      <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <label class="flex flex-col gap-1">
          <span class="tech-label text-ink-4">时间范围</span>
          <NDatePicker
            v-model:value="filters.range"
            type="daterange"
            size="small"
            clearable
            :actions="['clear', 'confirm']"
            @update:value="applyFilters"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="tech-label text-ink-4">操作类型</span>
          <NSelect
            v-model:value="filters.action"
            :options="actionOptions"
            size="small"
            clearable
            placeholder="全部类型"
            @update:value="applyFilters"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="tech-label text-ink-4">结果状态</span>
          <NSelect
            v-model:value="filters.status"
            :options="statusOptions"
            size="small"
            clearable
            placeholder="全部状态"
            @update:value="applyFilters"
          />
        </label>
        <label class="flex flex-col gap-1">
          <span class="tech-label text-ink-4">关键词</span>
          <div class="flex gap-2">
            <NInput
              v-model:value="filters.q"
              size="small"
              clearable
              placeholder="订单号 / 说明 / 操作人"
              @keydown.enter="applyFilters"
            />
            <NButton size="small" type="primary" :loading="loading" @click="applyFilters">
              <template #icon><Search :size="14" /></template>
              查询
            </NButton>
          </div>
        </label>
      </div>
      <div v-if="hasFilters" class="mt-2 flex items-center gap-2 text-[12px] text-ink-4">
        <NButton size="tiny" quaternary @click="resetFilters">
          <template #icon><X :size="13" /></template>
          清除筛选
        </NButton>
        <span>共 {{ total }} 条记录 · 统计与明细共用同一套筛选条件</span>
      </div>
    </section>

    <!-- 统计 -->
    <section v-if="stats" class="mb-3 grid gap-3 lg:grid-cols-3">
      <div class="panel panel-raised p-3.5 sm:p-4 lg:col-span-2">
        <div class="mb-2 flex items-baseline justify-between gap-2">
          <h2 class="font-heading text-[14px] font-bold">操作类型分布</h2>
          <span class="tnum text-[12px] text-ink-4">共 {{ stats.total }} 条</span>
        </div>
        <!-- 十种动作全给（含 0）：少给一种，那种就永远筛不出来，界面上还看不出来少了什么 -->
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="item in stats.by_action"
            :key="item.action"
            class="flex items-center gap-1.5 px-2 py-1 text-[12px]"
            :class="item.count === 0 ? 'opacity-45' : ''"
            style="background-color: var(--muted)"
          >
            <span
              class="inline-block size-2"
              :style="{ backgroundColor: LOG_ACTION_COLOR[item.action] ?? 'var(--text-tertiary)' }"
            />
            {{ item.label }}
            <b class="tnum">{{ item.count }}</b>
          </span>
        </div>

        <div class="mt-3">
          <div class="mb-1 flex items-baseline justify-between">
            <h2 class="font-heading text-[14px] font-bold">按天记录数</h2>
            <span class="text-[12px] text-ink-4">
              {{ trend.length }} 天有记录 · 最多显示最近 60 天
            </span>
          </div>
          <!-- 柱宽必须封顶（max-w-*）：只筛出一天时，flex-1 会让那唯一一根柱子
               撑满整行、看着像一块色块而不是图表（真截图里就是这么崩的）。 -->
          <div v-if="trend.length" class="flex h-16 items-end gap-[3px]">
            <div
              v-for="day in trend"
              :key="day.date"
              class="w-full max-w-[22px] shrink"
              :style="{
                height: `${Math.max(2, day.percent)}%`,
                backgroundColor: 'var(--primary)',
                opacity: 0.75,
              }"
              :title="`${day.date}：${day.count} 条`"
            />
          </div>
          <p v-else class="text-[12px] text-ink-4">此范围内无记录</p>
        </div>
      </div>

      <div class="panel panel-raised p-3.5 sm:p-4">
        <h2 class="mb-2 font-heading text-[14px] font-bold">状态流转</h2>
        <dl v-if="statusFlow.length" class="grid gap-1.5">
          <div
            v-for="item in statusFlow"
            :key="item.status"
            class="flex items-baseline justify-between px-2.5 py-1.5 text-[12px]"
            style="background-color: var(--muted)"
          >
            <dt><StatusTag :status="item.status" size="sm" /></dt>
            <dd class="tnum m-0 font-semibold">{{ item.count }}</dd>
          </div>
        </dl>
        <p v-else class="text-[12px] text-ink-4">此范围内无状态变更记录</p>

        <h2 class="mt-3 mb-1.5 font-heading text-[14px] font-bold">操作人排行</h2>
        <ol v-if="stats.by_actor.length" class="m-0 list-none p-0 text-[12px]">
          <li
            v-for="(item, index) in stats.by_actor"
            :key="`${item.nickname}-${index}`"
            class="flex items-baseline justify-between border-b py-1 last:border-0"
            style="border-color: var(--border)"
          >
            <span>{{ item.nickname ?? '（无归属）' }}
              <span class="text-ink-4">· {{ item.role_label ?? '—' }}</span>
            </span>
            <b class="tnum">{{ item.count }}</b>
          </li>
        </ol>
        <p v-else class="text-[12px] text-ink-4">暂无数据</p>
      </div>
    </section>

    <!-- 明细 -->
    <section class="panel panel-raised overflow-hidden">
      <NDataTable
        :columns="columns"
        :data="logs"
        :loading="loading"
        :row-key="(row: OrderLogRow) => row.id"
        :scroll-x="980"
        size="small"
        remote
        :pagination="pagination"
      />
    </section>
  </div>
</template>
