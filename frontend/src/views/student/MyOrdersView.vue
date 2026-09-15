<script setup lang="ts">
/** 我的订单：手机优先的卡片列表。
 *  自动刷新用 useIntervalFn，并在页面不可见时暂停 —— 后台标签页不该继续发请求。 */
import { computed, onMounted, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import { Clock, Inbox, RefreshCw } from '@lucide/vue'
import { NButton, NEmpty, NSkeleton } from 'naive-ui'
import { ApiError } from '@/api/client'
import { orderApi } from '@/api/endpoints'
import type { Order } from '@/api/types'
import StatusTag from '@/components/StatusTag.vue'
import { COLOR_TYPE_LABEL, DUPLEX_LABEL, fullTime, pickupCodeLabel, shortTime } from '@/utils/format'
import { notify } from '@/composables/feedback'

const orders = ref<Order[]>([])
const loading = ref(true)

const refreshMs = 20_000
const visibility = useDocumentVisibility()

const summary = computed(() => ({
  active: orders.value.filter((o) => o.status === '待打印' || o.status === '打印中').length,
  ready: orders.value.filter((o) => o.status === '可取了').length,
  done: orders.value.filter((o) => o.status === '已取件').length,
}))

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await orderApi.mine()
    orders.value = data.orders
  } catch (error) {
    if (!silent) notify.error(error instanceof ApiError ? error.message : '加载订单失败')
  } finally {
    loading.value = false
  }
}

const { pause, resume } = useIntervalFn(() => void load(true), refreshMs, { immediate: false })

watch(visibility, (state) => {
  if (state === 'visible') {
    resume()
    void load(true)
  } else {
    pause()
  }
})

onMounted(async () => {
  await load()
  resume()
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <header class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h1 class="font-heading text-lg font-bold sm:text-xl">我的订单</h1>
        <p class="mt-0.5 text-[13px] text-ink-3">每 20 秒自动刷新，切走页面时暂停</p>
      </div>
      <NButton size="small" quaternary :loading="loading" @click="load()">
        <template #icon><RefreshCw :size="15" /></template>
        刷新
      </NButton>
    </header>

    <div v-if="orders.length" class="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
      <div class="panel panel-raised px-3 py-2.5">
        <div class="tech-label text-ink-4">进行中</div>
        <div class="tnum font-heading text-xl font-bold">{{ summary.active }}</div>
      </div>
      <div class="panel panel-raised border-primary/40 px-3 py-2.5">
        <div class="tech-label text-ink-4">可取了</div>
        <div class="tnum font-heading text-xl font-bold" style="color: var(--primary)">
          {{ summary.ready }}
        </div>
      </div>
      <div class="panel panel-raised px-3 py-2.5">
        <div class="tech-label text-ink-4">已取件</div>
        <div class="tnum font-heading text-xl font-bold">{{ summary.done }}</div>
      </div>
    </div>

    <div v-if="loading && !orders.length" class="flex flex-col gap-3">
      <NSkeleton v-for="index in 3" :key="index" height="96px" :sharp="false" />
    </div>

    <div v-else-if="!orders.length" class="panel grid place-items-center py-12">
      <NEmpty description="还没有订单，去「下单打印」提交第一份文件吧">
        <template #icon><Inbox :size="34" /></template>
      </NEmpty>
    </div>

    <!-- 列表用 TransitionGroup 而不是 Transition：接口每 20 秒轮询一次，数组是整体替换的，
         按 key 打补丁时只有「真正新进来」的订单会跑入场动画 —— 每次轮询都重放一遍的话
         就是一屏东西在定时乱动。新订单从右侧切入，后面的项目只做让位移动。
         move-class 管的是「新单插进来、后面的项往下让位」这一段位移（FLIP）。 -->
    <TransitionGroup
      v-else
      tag="ul"
      class="flex list-none flex-col gap-3 p-0"
      enter-active-class="transition duration-[200ms] ease-out"
      enter-from-class="opacity-0 translate-x-1"
      move-class="transition duration-[200ms] ease-out"
    >
      <li v-for="order in orders" :key="order.id" class="panel p-3.5 sm:p-4">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="truncate text-[14px] font-bold">{{ order.filename }}</p>
            <p class="tnum mt-1 text-[11px] text-ink-4">
              #{{ order.id }} · {{ shortTime(order.create_time) }}
            </p>
          </div>
          <StatusTag :status="order.status" />
        </div>

        <div class="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
          <div>
            <div class="tech-label mb-0.5 text-ink-4">取件码</div>
            <div
              class="tnum font-heading text-[23px] leading-none font-bold tracking-[0.1em]"
              :style="order.status === '可取了' ? { color: 'var(--primary)' } : undefined"
            >
              {{ pickupCodeLabel(order.pickup_code) }}
            </div>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span class="tech-label rounded-full px-2 py-1" style="background-color: var(--muted)">
              {{ order.color_type ? COLOR_TYPE_LABEL[order.color_type] : '黑白' }}
            </span>
            <span class="tech-label rounded-full px-2 py-1" style="background-color: var(--muted)">
              {{ order.duplex ? DUPLEX_LABEL[order.duplex] : '单面' }}
            </span>
          </div>
        </div>

        <p v-if="order.remark" class="mt-3 rounded-lg px-2.5 py-1.5 text-[12px] text-ink-2" style="background-color: var(--muted)">
          备注：{{ order.remark }}
        </p>

        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-2.5 text-[11px] text-ink-4" style="border-color: var(--border)">
          <span class="flex items-center gap-1">
            <Clock :size="12" />
            提交 {{ fullTime(order.create_time) }}
          </span>
          <span v-if="order.claimer_nickname">接单：{{ order.claimer_nickname }}</span>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>
