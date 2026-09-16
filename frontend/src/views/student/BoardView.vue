<script setup lang="ts">
/** 服务数据：这台打印机至今为止的公开数据 —— 服务规模、排队情况、下单榜、近两周趋势。
 *
 *  只有「登录用户能看」和「谁都能看」的交集才放上来，界线由后端划（routes/orders.py 的
 *  api_board）：规模与排队不涉及具体是谁，榜单是人人都在同一张榜上的对等信息。
 *  **响应里没有金额** —— 后端就没查 price 那一列，所以这个页面不是「不画金额」，
 *  而是根本拿不到金额。同样地，别人昵称是服务端打的码（张*三），这里拿到什么画什么，
 *  不在前端再补一层打码：前端能解出来的东西，网络面板里也解得出。
 *
 *  不复用 /api/my-stats：那条只查我自己，而管理端的 /api/admin/stats 又带
 *  账号数、工作量分布和营业额，整条开给学生会一并漏出去。 */
import { computed, onMounted, ref } from 'vue'
import { Inbox, RefreshCw } from '@lucide/vue'
import { NButton, NEmpty, NSkeleton } from 'naive-ui'
import { ApiError } from '@/api/client'
import { boardApi } from '@/api/endpoints'
import type { Board, OrderStatus, ServiceBoard } from '@/api/types'
import { trendOption } from '@/charts/options'
import type { ChartPalette } from '@/charts/setup'
import ChartBox from '@/components/charts/ChartBox.vue'
import { notify } from '@/composables/feedback'
import { useThemeStore } from '@/stores/theme'
import { STATUS_COLOR_VAR } from '@/utils/format'

const theme = useThemeStore()

const board = ref<ServiceBoard | null>(null)
const loading = ref(true)
/** 当前看的是哪张榜。两张榜后端一次响应就都给了（两个查询都很小），
 *  切换只换本地数据 —— 切一下就要转圈的样子更像页面卡住了，不像在切榜单。 */
const tab = ref<Board['key']>('recent')

const palette = computed<ChartPalette>(() => {
  const t = theme.tokens
  return {
    text: t.textPrimary,
    textMuted: t.textTertiary,
    border: t.border,
    primary: t.primary,
    secondary: t.secondary,
    ok: t.ok,
    err: t.err,
    warn: t.warn,
    info: t.info,
    // 提示框要实心，半透明的 --card 在深色下几乎全透
    surface: t.surfaceOverlay,
  }
})

const trend = computed(() => trendOption(board.value?.daily ?? [], palette.value))

const service = computed(() => board.value?.service)
const queue = computed(() => board.value?.queue)
const current = computed<Board | undefined>(
  () => board.value?.boards.find((item) => item.key === tab.value),
)

/* 下面这三个都用 computed 取出，不在模板里写 board.value.x。
   模板里靠 v-if 把可选类型收窄是可行的，但那要求读代码的人先把 v-if 链对上；
   取值只有一次、又都带默认值，这里顺手做掉比让模板去担这个责任划算。 */
const boardTabs = computed(() => board.value?.boards ?? [])
const topRows = computed(() => current.value?.top ?? [])

/** 五档按 config.ORDER_STATUSES 的顺序摆（也就是流程本身的顺序）：
 *  按数字大小排的话，「哪一档堵住了」就看不出来了。 */
const statusRows = computed(() =>
  (Object.keys(STATUS_COLOR_VAR) as OrderStatus[]).map((status) => ({
    status,
    color: STATUS_COLOR_VAR[status],
    count: queue.value?.by_status?.[status] ?? 0,
  })),
)

/** 条形按本榜第一名归一化。拿绝对单数当宽度的话，小站里前三名会挤成三根
 *  差不多长的短线，看榜的人分不出谁在前面 —— 榜单的形状比绝对长度重要。 */
const topCount = computed(() => current.value?.top[0]?.count ?? 0)

function barWidth(count: number): string {
  if (!topCount.value) return '0%'
  return `${Math.max(8, Math.round((count / topCount.value) * 100))}%`
}

/** 我在榜上的位置。**没下过单的时候不报名次**：后端为了让「比我多的有几个人 + 1」
 *  这个算法少一个分支，没单时返回的也是 rank: 1，照它显示就成了
 *  「你还没下过单，排第 1」—— 一句自己打自己的话。 */
const myLine = computed(() => {
  const me = current.value?.me
  if (!me) return ''
  if (!me.count) return '你还没有下过单 —— 榜上给你留着一个位置'
  return `你在这张榜上共 ${me.count} 单，排在第 ${me.rank} 名（共 ${me.ranked} 人上榜）`
})

const hasTrendData = computed(() => (board.value?.daily ?? []).some((item) => item.count > 0))

/** 这个页面刻意不自动刷新（订单列表那种轮询不适合它）：
 *  服务规模和小榜单一天也变不了几次，而它每次访问都要算两遍榜单，
 *  后台开着标签页一直轮询只是在白烧数据库。 */
async function load(): Promise<void> {
  loading.value = true
  try {
    board.value = await boardApi.load()
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '加载服务数据失败')
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <header class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h1 class="font-heading text-lg font-bold sm:text-xl">服务数据</h1>
        <p class="mt-0.5 text-[13px] text-ink-3">这台打印机至今的公开数据 · 不含费用</p>
      </div>
      <NButton size="small" quaternary :loading="loading" @click="load()">
        <template #icon><RefreshCw :size="15" /></template>
        刷新
      </NButton>
    </header>

    <div v-if="loading && !board" class="flex flex-col gap-3">
      <NSkeleton v-for="index in 3" :key="index" height="96px" :sharp="false" />
    </div>

    <template v-else-if="board">
      <div class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-4">累计打印</div>
          <div class="tnum font-heading text-xl font-bold">{{ service?.orders_total ?? 0 }}</div>
        </div>
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-4">近 7 天</div>
          <div class="tnum font-heading text-xl font-bold">{{ service?.orders_7d ?? 0 }}</div>
        </div>
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-4">今日</div>
          <div class="tnum font-heading text-xl font-bold">{{ service?.orders_today ?? 0 }}</div>
        </div>
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-4">同学人数</div>
          <div class="tnum font-heading text-xl font-bold">{{ service?.users_total ?? 0 }}</div>
        </div>
      </div>

      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-[14px] font-bold">排队情况</h2>
          <span class="text-[12px] text-ink-3">
            {{ queue?.unclaimed ?? 0 }} 单还没人接
          </span>
        </div>
        <ul class="mt-3 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-5">
          <li
            v-for="row in statusRows"
            :key="row.status"
            class="rounded-lg px-2.5 py-2"
            style="background-color: var(--muted)"
          >
            <div class="tech-label" :style="{ color: row.color }">{{ row.status }}</div>
            <div class="tnum font-heading text-lg leading-tight font-bold">{{ row.count }}</div>
          </li>
        </ul>
      </section>

      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <h2 class="font-heading text-[14px] font-bold">下单排行 · 前 10</h2>
          <!-- 分段切换用原生 button：这里只是换个本地 ref，套一层 NRadioGroup
               反而要处理它的 string | number 值类型，得不偿失。 -->
          <div class="flex items-center gap-0.5 rounded-lg p-0.5" style="background-color: var(--muted)">
            <button
              v-for="item in boardTabs"
              :key="item.key"
              type="button"
              class="rounded-md px-2.5 py-1 text-[12px] font-semibold"
              :style="
                tab === item.key
                  ? { backgroundColor: 'var(--card)', color: 'var(--foreground)' }
                  : { color: 'var(--text-tertiary)' }
              "
              @click="tab = item.key"
            >
              {{ item.label }}
            </button>
          </div>
        </div>

        <ul v-if="topRows.length" class="mt-3 flex list-none flex-col gap-1 p-0">
          <li
            v-for="entry in topRows"
            :key="entry.rank"
            class="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
            :style="
              entry.is_me
                ? { backgroundColor: 'var(--muted)', outline: '1px solid var(--primary)' }
                : undefined
            "
          >
            <span
              class="tnum font-heading w-5 shrink-0 text-center text-[13px] font-bold"
              :style="{ color: entry.rank <= 3 ? 'var(--primary)' : 'var(--text-quaternary)' }"
            >
              {{ entry.rank }}
            </span>
            <div class="min-w-0 flex-1">
              <div class="truncate text-[13px] font-semibold">
                {{ entry.nickname }}
                <span v-if="entry.is_me" class="tech-label ml-1" style="color: var(--primary)">你</span>
              </div>
              <div class="mt-1 h-1.5 w-full overflow-hidden rounded-full" style="background-color: var(--muted)">
                <div
                  class="h-full rounded-full"
                  :style="{ width: barWidth(entry.count), backgroundColor: 'var(--primary)' }"
                />
              </div>
            </div>
            <span class="tnum font-heading shrink-0 text-[13px] font-bold">{{ entry.count }} 单</span>
          </li>
        </ul>

        <div v-else class="grid place-items-center py-8">
          <NEmpty description="这张榜还空着，第 1 单就是你" size="small">
            <template #icon><Inbox :size="30" /></template>
          </NEmpty>
        </div>

        <p
          v-if="myLine"
          class="mt-3 rounded-lg px-2.5 py-2 text-[12px] text-ink-2"
          style="background-color: var(--muted)"
        >
          {{ myLine }}
        </p>
      </section>

      <section class="panel panel-raised p-3.5 sm:p-4">
        <h2 class="font-heading mb-2 text-[14px] font-bold">近 14 天单量</h2>
        <ChartBox
          :option="trend"
          :height="200"
          :empty="!hasTrendData"
          empty-text="近两周还没有订单"
        />
      </section>
    </template>
  </div>
</template>
