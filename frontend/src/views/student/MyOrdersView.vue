<script setup lang="ts">
/** 我的订单：手机优先的卡片列表。
 *  自动刷新用 useIntervalFn，并在页面不可见时暂停 —— 后台标签页不该继续发请求。 */
import { computed, onMounted, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import { Clock, Inbox, RefreshCw, Trash2 } from '@lucide/vue'
import { NButton, NEmpty, NSkeleton } from 'naive-ui'
import { ApiError } from '@/api/client'
import { orderApi } from '@/api/endpoints'
import type { Order } from '@/api/types'
import StatusTag from '@/components/StatusTag.vue'
import {
  COLOR_TYPE_LABEL,
  DUPLEX_LABEL,
  copiesLabel,
  fullTime,
  orderFileLabel,
  paperLabel,
  pickupCodeLabel,
  priceLabel,
  shortTime,
} from '@/utils/format'
import { confirmAction, notify } from '@/composables/feedback'

const orders = ref<Order[]>([])
const loading = ref(true)

const refreshMs = 20_000
const visibility = useDocumentVisibility()

const summary = computed(() => ({
  // 「待计费」也算进行中：学生那边这单同样还没结束（正等管理员报价），
  // 不算进任何一格的话，刚提交完订单的学生会看到「进行中 0」而以为没提交上。
  active: orders.value.filter(
    (o) => o.status === '待计费' || o.status === '待打印' || o.status === '打印中',
  ).length,
  ready: orders.value.filter((o) => o.status === '可取了').length,
  done: orders.value.filter((o) => o.status === '已取件').length,
}))

/** 花费合计：只算已经定过价的单。未计费的单金额是 null，当成 0 加进去没错，
 *  但不应该把它显示成「￥0.00」让用户以为这单免费。 */
const spent = computed(() =>
  orders.value.reduce((sum, o) => (typeof o.price === 'number' ? sum + o.price : sum), 0),
)

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

/* ---------- 撤回 ----------
 *  传错文件、参数选错，在「还没人接单」之前都是无害的，让本人自己收起
 *  比找管理员删更省事。一旦有人接了，这单就在别人的工作里了（可能已经下载、
 *  已经在打印），单子凭空消失最轻的结果也是白打一份纸 —— 那种情况该走「释放」，
 *  把单退回答待接单池，而不是让整条记录不存在。
 *  下面这个判定跟后端 `api_withdraw_order` 的两道闸门一一对应。 */

/** 撤回按钮点不动的原因；null 表示可以点。
 *  两句话分别对应后端的 400「订单已经被接取，无法撤回」和 400「订单已完成，不能撤回」。 */
function withdrawBlockReason(order: Order): string | null {
  if (order.status === '已取件') return '这单已经取走了，不能再撤回'
  if (order.claimed_by !== null) return '已经有管理员接单了，需要撤回请到工单里说一声'
  return null
}

/** 正在撤回的订单 id。撤回是删数据、又没有可供对照的进度，
 *  点了必须立刻有反馈，否则用户会连点，第二次就撞 404 了。 */
const withdrawingId = ref<number | null>(null)

async function withdraw(order: Order): Promise<void> {
  // 按钮已经置灰，这里再挡一道：提示直接用上面算好的原因，
  // 两处文案分叉的话，以后改一处就会对不上。
  const blocked = withdrawBlockReason(order)
  if (blocked) {
    notify.warning(blocked)
    return
  }
  // 二次确认，并且把文件名和单号摆在里面：一屏订单长得都差不多，
  // 确认框只写「确定要撤回吗」等于没问。文件和记录都会没，先把后果说清楚。
  // 预设单没有文件，「上传的文件也会一并删掉」在那时候是假的 ——
  // 后果说错比少说更糟，所以两种说法分开写。
  const ok = await confirmAction({
    title: '撤回这份订单？',
    content: order.preset_content
      ? `「${orderFileLabel(order)}」#${order.id} 会被整条删除，无法恢复。这一单没有文件，不会动到任何文件。`
      : `「${orderFileLabel(order)}」#${order.id} 会被整条删除，上传的文件也会一并删掉，无法恢复。`,
    positiveText: '撤回订单',
    negativeText: '再想想',
  })
  if (!ok) return

  withdrawingId.value = order.id
  try {
    await orderApi.withdraw(order.id)
    notify.success('订单已撤回')
    // 用静默刷新：列表里少一项，但整页转圈会让人以为跳页了
    await load(true)
  } catch (error) {
    // 409 是这期间刚好被人接走了，照原样把后端那句中文透出来，
    // 再补一次刷新，界面就回到真实状态了。
    notify.error(error instanceof ApiError ? error.message : '撤回失败')
    await load(true)
  } finally {
    withdrawingId.value = null
  }
}
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

    <div v-if="orders.length" class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
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
      <!-- 合计只统计当前这一页拉到的订单（此接口不带分页，学生自己能看到全部） -->
      <div class="panel panel-raised px-3 py-2.5">
        <div class="tech-label text-ink-4">已计费合计</div>
        <div class="tnum font-heading text-xl font-bold">￥{{ spent.toFixed(2) }}</div>
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
            <!-- 预设单没有文件名（后端存的是空串哨兵值），直接插值会得到一片空白，
                 学生会以为自己的订单没记录上。 -->
            <p class="truncate text-[14px] font-bold">{{ orderFileLabel(order) }}</p>
            <p class="tnum mt-1 text-[11px] text-ink-4">
              #{{ order.id }} · {{ shortTime(order.create_time) }}
            </p>
          </div>
          <StatusTag :status="order.status" />
        </div>

        <div class="mt-3 flex flex-wrap items-end gap-x-5 gap-y-2">
          <div>
            <div class="tech-label mb-0.5 text-ink-4">费用</div>
            <!-- 未计费显示「未计费」而不是「￥0.00」：刚提交的订单本来就是 null，
                 写成 0 元会让学生以为这单不要钱。 -->
            <div
              v-if="typeof order.price === 'number'"
              class="tnum font-heading text-[23px] leading-none font-bold"
            >
              ￥{{ order.price.toFixed(2) }}
            </div>
            <div v-else class="text-[13px] leading-[23px] text-ink-4">
              {{ priceLabel(order.price) }}
              <span class="text-[11px]">· 等管理员确认</span>
            </div>
          </div>
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
            <!-- 份数一定要显示：它直接决定交多少钱，学生看不出来就会反复问管理员。
                 null 是「未记录」（本次升级前的老订单）而不是 1 份，走 copiesLabel。 -->
            <span class="tech-label tnum rounded-full px-2 py-1" style="background-color: var(--muted)">
              {{ copiesLabel(order.copies) }}
            </span>
            <span
              v-if="order.paper_name"
              class="tech-label rounded-full px-2 py-1"
              style="background-color: var(--muted)"
            >
              {{ paperLabel(order.paper_name) }}
            </span>
          </div>
        </div>

        <!-- 预设服务那句话：学生看不到「自己下单时选了什么」会很没安全感，
             而他们甚至没有文件名可以对照。 -->
        <p
          v-if="order.preset_content"
          class="mt-3 rounded-lg px-2.5 py-1.5 text-[12px] text-ink-2"
          style="background-color: var(--muted)"
        >
          预设服务：{{ order.preset_content }}
        </p>

        <p v-if="order.remark" class="mt-3 rounded-lg px-2.5 py-1.5 text-[12px] text-ink-2" style="background-color: var(--muted)">
          备注：{{ order.remark }}
        </p>

        <div class="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t pt-2.5 text-[11px] text-ink-4" style="border-color: var(--border)">
          <span class="flex items-center gap-1">
            <Clock :size="12" />
            提交 {{ fullTime(order.create_time) }}
          </span>
          <span v-if="order.claimer_nickname">接单：{{ order.claimer_nickname }}</span>
          <!-- 已取件的单不显示这个入口：终态没什么可撤回的，摆一个永远灰着的按钮只是噪音。
               其余情况一律显示，不能点的时候用 title 说明原因 —— 按钮直接消失的话，
               学生会以为功能没了，而不是「这一单现在不能撤」。 -->
          <NButton
            v-if="order.status !== '已取件'"
            class="ml-auto"
            size="tiny"
            quaternary
            type="error"
            :disabled="withdrawBlockReason(order) !== null"
            :loading="withdrawingId === order.id"
            :title="withdrawBlockReason(order) ?? undefined"
            @click="withdraw(order)"
          >
            <template #icon><Trash2 :size="12" /></template>
            撤回
          </NButton>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>
