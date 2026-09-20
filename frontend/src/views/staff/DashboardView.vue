<script setup lang="ts">
/** 数据看板：聚合统计 + 四张图。
 *  图表配色全部从主题令牌推导（canvas 用不了 CSS 变量，所以取的是 hex），
 *  因此切换明暗主题时图表跟着换，不需要重画两套。 */
import { computed, onMounted, ref } from 'vue'
import {
  CheckCircle2,
  CircleDollarSign,
  Clock,
  Package,
  RefreshCw,
  TrendingUp,
  Users,
  Wallet,
} from '@lucide/vue'
import { NButton, NSkeleton, useMessage } from 'naive-ui'
import { ApiError } from '@/api/client'
import { adminApi } from '@/api/endpoints'
import type { DashboardStats, OrderStatus } from '@/api/types'
import ChartBox from '@/components/charts/ChartBox.vue'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import { rankOption, splitBarOption, statusOption, trendOption } from '@/charts/options'
import type { ChartPalette } from '@/charts/setup'
import { useThemeStore } from '@/stores/theme'

const message = useMessage()
const theme = useThemeStore()

const stats = ref<DashboardStats | null>(null)
const loading = ref(true)

const palette = computed<ChartPalette>(() => {
  const t = theme.tokens
  return {
    text: t.textPrimary,
    textMuted: t.textTertiary,
    border: t.border,
    /* 图表序列色属于「线」：它画在图表自己的底上，浅色下是白/近白，
       荧光黄 #fffa00 铺上去只有 1.11:1 会整条消失。走 --accent-text。
       注意 options.ts 会在这串色值后面拼十六进制 alpha（如 `${p.primary}59`），
       所以它必须是 6 位 hex —— --accent-text 在两套主题下都是字面 hex，成立。 */
    primary: t.accentText,
    secondary: t.secondary,
    ok: t.ok,
    err: t.err,
    warn: t.warn,
    info: t.info,
    // 提示框要实心，半透明的 --card 在深色下几乎全透
    surface: t.surfaceOverlay,
  }
})

const statusColors = computed<Record<string, string>>(() => ({
  // 「待计费」不在 config.ORDER_STATUSES_MANUAL 里（只能由计费动作产生），
  // 但它确实会出现在 by_status 里，少的这一个会让饼图多出一块默认色。
  待计费: theme.tokens.statusUnpriced,
  待打印: theme.tokens.statusPending,
  打印中: theme.tokens.statusPrinting,
  可取件: theme.tokens.statusReady,
  已取件: theme.tokens.statusDone,
}))

const orderStats = computed(() => stats.value?.orders)
const userStats = computed(() => stats.value?.users)

const trend = computed(() => trendOption(stats.value?.daily ?? [], palette.value))

const byStatus = computed(() =>
  statusOption(
    orderStats.value?.by_status ?? {},
    palette.value,
    (status) => statusColors.value[status as OrderStatus] ?? palette.value.primary,
  ),
)

const splitBar = computed(() =>
  splitBarOption(
    [
      { label: '打印颜色', data: colorRows.value },
      { label: '单双面', data: duplexRows.value },
    ],
    palette.value,
  ),
)

const colorRows = computed(() => [
  { name: '黑白', value: orderStats.value?.by_color?.black ?? 0 },
  { name: '彩色', value: orderStats.value?.by_color?.color ?? 0 },
])

const duplexRows = computed(() => [
  { name: '单面', value: orderStats.value?.by_duplex?.single ?? 0 },
  { name: '双面', value: orderStats.value?.by_duplex?.double ?? 0 },
])

const rank = computed(() => rankOption(stats.value?.top_claimers ?? [], palette.value))

const hasStatusData = computed(() => Object.keys(orderStats.value?.by_status ?? {}).length > 0)
const hasTrendData = computed(() => (stats.value?.daily ?? []).some((item) => item.count > 0))
const hasRankData = computed(() => (stats.value?.top_claimers ?? []).length > 0)

const claimRate = computed(() => {
  const orders = orderStats.value
  if (!orders || !orders.total) return '—'
  return `${Math.round((orders.claimed / orders.total) * 100)}%`
})

/** 累计金额。后端已经 COALESCE + round 过，这里只负责补上￥和两位小数 ——
 *  直接插值会得到「12.5」这种少了小数位的写法。 */
const revenueLabel = computed(() => `￥${(orderStats.value?.revenue ?? 0).toFixed(2)}`)

async function load(): Promise<void> {
  loading.value = true
  try {
    stats.value = await adminApi.stats()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载统计数据失败')
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="数据看板" subtitle="订单与账号的实时汇总，含近 14 天趋势">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div v-if="loading && !stats" class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <NSkeleton v-for="index in 10" :key="index" height="104px" :sharp="false" />
    </div>

    <template v-else>
      <!-- 十张卡片一起出现会像「整块糊上来」，这里给 40ms 的错峰。
           只加在这组轻量卡片上：下面那几块图表面板是 ECharts 实打实画出来的，
           让它们错峰入场等于把绘制压力排队，反而更容易掉帧。
           数值刷新（点「刷新」）时元素是原地打补丁的，不会重放动画。 -->
      <div class="motion-stagger mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="订单总数" :value="orderStats?.total ?? 0" :icon="Package" />
        <StatCard label="已接单" :value="orderStats?.claimed ?? 0" :icon="CheckCircle2" accent />
        <!-- 待计费的单也算「待接单」：它确实还没人认领 —— 而且这时候正该有人去接，
             接单之后才能下载看过文件、算出金额。不写清楚的话，
             「待接单」和「待计费」两个数字一起变大时会看起来像统计错了。 -->
        <StatCard
          label="待接单"
          :value="orderStats?.unclaimed ?? 0"
          :icon="Clock"
          hint="含待计费的单"
        />
        <StatCard label="接单率" :value="claimRate" :icon="TrendingUp" hint="已接单 / 订单总数" />
        <StatCard
          label="待计费"
          :value="orderStats?.unpriced ?? 0"
          :icon="CircleDollarSign"
          accent
          hint="接单后填金额"
        />
        <StatCard label="累计计费" :value="revenueLabel" :icon="Wallet" hint="已定价订单合计" />
        <StatCard label="账号总数" :value="userStats?.total ?? 0" :icon="Users" />
        <StatCard label="启用中" :value="userStats?.active ?? 0" />
        <StatCard label="已禁用" :value="userStats?.disabled ?? 0" />
        <StatCard label="近 7 天新增" :value="userStats?.new_7d ?? 0" accent />
      </div>

      <div class="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section class="panel p-4">
          <h3 class="mb-1 font-heading text-base font-bold">近 14 天订单量</h3>
          <p class="tech-label mb-3 text-ink-3 text-2xs">Orders / day</p>
          <ChartBox :option="trend" :height="248" :empty="!hasTrendData" />
        </section>

        <!-- 右列。lg 起这条左线是**分栏线**：两块并排时只靠间隙分不出
             "这是一栏还是两块"。行与行之间会断开 16px（grid 的 gap）——
             接受这个断口：它是"每行一栏"的读法，而不是一条贯穿全页的竖线。 -->
        <section class="panel p-4 lg:border-l lg:border-[var(--border)] lg:pl-4">
          <h3 class="mb-1 font-heading text-base font-bold">订单状态分布</h3>
          <p class="tech-label mb-3 text-ink-3 text-2xs">By status</p>
          <ChartBox :option="byStatus" :height="248" :empty="!hasStatusData" />
        </section>

        <section class="panel p-4">
          <h3 class="mb-1 font-heading text-base font-bold">打印规格分布</h3>
          <p class="tech-label mb-3 text-ink-3 text-2xs">Color / duplex</p>
          <ChartBox :option="splitBar" :height="248" />
        </section>

        <!-- 右列。lg 起这条左线是**分栏线**：两块并排时只靠间隙分不出
             "这是一栏还是两块"。行与行之间会断开 16px（grid 的 gap）——
             接受这个断口：它是"每行一栏"的读法，而不是一条贯穿全页的竖线。 -->
        <section class="panel p-4 lg:border-l lg:border-[var(--border)] lg:pl-4">
          <h3 class="mb-1 font-heading text-base font-bold">接单排行</h3>
          <p class="tech-label mb-3 text-ink-3 text-2xs">Top 5 claimers</p>
          <ChartBox :option="rank" :height="248" :empty="!hasRankData" empty-text="还没有接单记录" />
        </section>
      </div>

      <section class="panel mt-4 p-4">
        <h3 class="mb-3 font-heading text-base font-bold">账号角色分布</h3>
        <div class="flex flex-wrap gap-6">
          <div v-for="(count, role) in userStats?.by_role ?? {}" :key="role">
            <div class="tech-label mb-1 text-ink-3 tech-label--cn text-xs">{{ role }}</div>
            <div class="tnum font-heading text-2xl font-bold">{{ count }}</div>
          </div>
          <p v-if="!Object.keys(userStats?.by_role ?? {}).length" class="text-sm text-ink-3">
            无账号数据
          </p>
        </div>
      </section>
    </template>
  </div>
</template>
