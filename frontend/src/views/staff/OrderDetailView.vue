<script setup lang="ts">
/** 订单详情：把这一单的所有字段摆开，再加上「谁在这单上做过什么」的流水。
 *
 *  为什么要单独一页 —— 列表按「一眼扫过去」设计，只放得下判断下一步动作所需的
 *  那几列（谁的单、什么状态、多少钱）。而事后复查要问的是另一类问题：
 *  这个金额是谁什么时候定的、状态被谁改过几回、文件还在不在。
 *  那些信息塞进列表会把每一行都撑成小作文，所以只在真的点进来时才拉。
 *
 *  刻意不轮询：这一页是「翻看」场景，停留时间短；而它背后的列表本来每 10 秒
 *  就在刷新，返回去就是最新的。给一页翻两分钟就走的详情挂轮询，
 *  等于让每个点开过的人都在后台多养一条定时器。
 */
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Download, FileWarning, RefreshCw } from '@lucide/vue'
import { NAlert, NButton, NEmpty, NSkeleton, NTimeline, NTimelineItem, useMessage } from 'naive-ui'
import { ApiError } from '@/api/client'
import { staffOrderApi } from '@/api/endpoints'
import type { OrderDetail, OrderLog } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import RoleTag from '@/components/RoleTag.vue'
import StatusTag from '@/components/StatusTag.vue'
import { useAuthStore } from '@/stores/auth'
import {
  COLOR_TYPE_LABEL,
  DUPLEX_LABEL,
  LOG_ACTION_COLOR,
  formatBytes,
  fullTime,
  pickupCodeLabel,
  priceLabel,
  shortTime,
} from '@/utils/format'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const message = useMessage()

/** 路由参数是字符串，后端那边是 <int:order_id>。这里先自己判一次：
 *  手输成 /staff/orders/abc 时不该发一个必然 404 的请求出去。 */
const orderId = computed(() => {
  const raw = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id
  const value = Number(raw)
  return Number.isInteger(value) && value > 0 ? value : null
})

const order = ref<OrderDetail | null>(null)
const logs = ref<OrderLog[]>([])
const loading = ref(false)
const downloading = ref(false)

const currentUserId = computed(() => auth.user?.id ?? 0)

/** 权限判定与订单台列表用同一套（看 advancedAllowed，不是 role === 'super'）：
 *  同一件事在两处渲染里必须给出同一个答案，否则宽屏能点、这里点不动，看着像抽风。 */
const isDefaultAdmin = computed(() => auth.advancedAllowed)

const canDownload = computed(() => {
  const item = order.value
  if (!item || item.claimed_by === null) return false
  return isDefaultAdmin.value || item.claimed_by === currentUserId.value
})

/** 字段网格的数据。写成数组是因为这些行长得一模一样，
 *  模板里复制十遍「<dt>…</dt><dd>…</dd>」只会让漏改某一行变得更难发现。 */
interface Field {
  label: string
  value: string | null
}

const specFields = computed<Field[]>(() => {
  const item = order.value
  if (!item) return []
  return [
    {
      label: '规格',
      value: `${item.color_type ? COLOR_TYPE_LABEL[item.color_type] : '黑白'} / ${
        item.duplex ? DUPLEX_LABEL[item.duplex] : '单面'
      }`,
    },
    { label: '文件名', value: item.filename },
    { label: '文件大小', value: formatBytes(item.file_size) },
  ]
})

const ownerFields = computed<Field[]>(() => {
  const item = order.value
  if (!item) return []
  return [
    // 备注里的「（已注销）」是后端 display_name 拼上去的，前端不再自己拼一遍
    { label: '账号昵称', value: item.owner_nickname },
    { label: '姓名', value: item.owner_real_name },
    { label: '学号', value: item.owner_student_id },
    { label: '宿舍', value: item.owner_dorm },
  ]
})

const flowFields = computed<Field[]>(() => {
  const item = order.value
  if (!item) return []
  return [
    { label: '取件码', value: pickupCodeLabel(item.pickup_code) },
    { label: '金额', value: priceLabel(item.price) },
    { label: '接单人', value: item.claimer_nickname },
    { label: '接单时间', value: item.claim_time ? fullTime(item.claim_time) : null },
    { label: '计费人', value: item.pricer_nickname },
    { label: '计费时间', value: item.price_time ? fullTime(item.price_time) : null },
    { label: '提交时间', value: fullTime(item.create_time) },
    { label: '最后更新', value: fullTime(item.update_time) },
  ]
})

async function load(): Promise<void> {
  if (orderId.value === null) return
  loading.value = true
  try {
    const data = await staffOrderApi.detail(orderId.value)
    order.value = data.order
    logs.value = data.logs
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载订单详情失败')
  } finally {
    loading.value = false
  }
}

async function download(): Promise<void> {
  const item = order.value
  if (!item) return
  downloading.value = true
  try {
    await staffOrderApi.download(item.id, item.filename)
    // 下载本身也会写一条留痕，所以拉一遍让时间线跟上 ——
    // 否则「我刚下载过」这件事要刷新才看得到，像没记上。
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '下载失败')
  } finally {
    downloading.value = false
  }
}

/** 回订单台。用 push 而不是 router.back()：这一页可能是从聊天里点进来的第一页，
 *  那时 back 会把人送出站（或者什么都退不出去）。 */
function back(): void {
  void router.push('/staff/orders')
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1000px]">
    <PageHeader
      :title="order ? `订单 #${order.id}` : '订单详情'"
      subtitle="完整的订单信息与操作记录"
    >
      <template #actions>
        <NButton size="small" quaternary @click="back">
          <template #icon><ArrowLeft :size="15" /></template>
          返回订单台
        </NButton>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div v-if="loading && !order" class="flex flex-col gap-3">
      <NSkeleton height="96px" :sharp="false" />
      <NSkeleton height="180px" :sharp="false" />
      <NSkeleton height="240px" :sharp="false" />
    </div>

    <div v-else-if="!order" class="panel grid place-items-center py-16">
      <NEmpty :description="orderId === null ? '订单号不对，检查一下地址栏' : '没有这个订单'" />
    </div>

    <template v-else>
      <!-- 头部：这是谁的文件、现在到哪一步、多少钱 -->
      <div class="panel mb-3 p-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div class="min-w-0">
            <h2 class="truncate text-[17px] font-bold" :title="order.filename">
              {{ order.filename }}
            </h2>
            <p class="tech-label mt-1 text-ink-4">
              提交于 {{ fullTime(order.create_time) }}
            </p>
          </div>
          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <StatusTag :status="order.status" />
            <span
              class="tnum font-heading text-[18px] font-bold"
              :style="{
                color:
                  order.price === null || order.price === undefined
                    ? 'var(--text-quaternary)'
                    : 'var(--primary)',
              }"
            >
              {{ priceLabel(order.price) }}
            </span>
          </div>
        </div>

        <!-- 「订单还在、文件没了」必须显式说出来：只把下载按钮置灰的话，
             管理员会以为是权限问题，跑去找人开权限而不是去找文件。 -->
        <NAlert
          v-if="!order.file_exists"
          type="warning"
          :bordered="false"
          class="mt-3"
          title="服务器上找不到这份文件了"
        >
          订单记录还在，但落盘的文件已经不在上传目录里。请先确认是不是被人手工清理过，
          再决定这一单怎么处理。
        </NAlert>
      </div>

      <div class="mb-3 grid gap-3 sm:grid-cols-2">
        <section class="panel p-4">
          <h3 class="tech-label mb-1 flex items-center gap-1.5 text-ink-3">
            打印要求
            <FileWarning v-if="!order.file_exists" :size="13" />
          </h3>
          <dl class="divide-y" style="border-color: var(--border)">
            <div
              v-for="field in specFields"
              :key="field.label"
              class="flex items-baseline justify-between gap-3 py-1.5"
              style="border-color: var(--border)"
            >
              <dt class="shrink-0 text-[12px] text-ink-4">{{ field.label }}</dt>
              <dd class="min-w-0 truncate text-right text-[13px]" :title="field.value ?? ''">
                {{ field.value ?? '—' }}
              </dd>
            </div>
          </dl>

          <!-- 备注单独一块、不截断：它是学生自己写的原话，
               截一半反而更容易看错（「只打第 1 页」和「只打第 1 页到第 3 页」）。 -->
          <p class="mt-2 text-[11px] text-ink-4">备注</p>
          <p
            v-if="order.remark"
            class="mt-1 whitespace-pre-wrap break-words rounded-md p-2 text-[13px] leading-6"
            style="background: var(--accent-tint-soft)"
          >
            {{ order.remark }}
          </p>
          <p v-else class="mt-1 text-[13px] text-ink-4">学生没有填写备注</p>
        </section>

        <div class="flex flex-col gap-3">
          <section class="panel p-4">
            <h3 class="tech-label mb-1 text-ink-3">下单人</h3>
            <dl class="divide-y" style="border-color: var(--border)">
              <div
                v-for="field in ownerFields"
                :key="field.label"
                class="flex items-baseline justify-between gap-3 py-1.5"
                style="border-color: var(--border)"
              >
                <dt class="shrink-0 text-[12px] text-ink-4">{{ field.label }}</dt>
                <dd class="min-w-0 truncate text-right text-[13px]" :title="field.value ?? ''">
                  {{ field.value ?? '—' }}
                </dd>
              </div>
            </dl>
          </section>

          <section class="panel p-4">
            <h3 class="tech-label mb-1 text-ink-3">流程信息</h3>
            <dl class="divide-y" style="border-color: var(--border)">
              <div
                v-for="field in flowFields"
                :key="field.label"
                class="flex items-baseline justify-between gap-3 py-1.5"
                style="border-color: var(--border)"
              >
                <dt class="shrink-0 text-[12px] text-ink-4">{{ field.label }}</dt>
                <dd class="tnum min-w-0 truncate text-right text-[13px]" :title="field.value ?? ''">
                  {{ field.value ?? '—' }}
                </dd>
              </div>
            </dl>

            <NButton
              v-if="canDownload"
              size="small"
              block
              class="mt-3"
              :loading="downloading"
              @click="download"
            >
              <template #icon><Download :size="14" /></template>
              下载文件（{{ formatBytes(order.file_size) }}）
            </NButton>
            <p v-else-if="order.claimed_by === null" class="mt-3 text-[11px] text-ink-4">
              接单后才能下载文件。
            </p>
          </section>
        </div>
      </div>

      <section class="panel p-4">
        <h3 class="tech-label mb-4 flex flex-wrap items-center gap-2 text-ink-3">
          操作记录
          <span class="text-ink-4">{{ logs.length }} 条</span>
        </h3>

        <NTimeline v-if="logs.length">
          <!-- 倒序（最近的在最上面）：翻这一页最常见的目的是「现在到哪一步了、
               上一步是谁做的」，顺着读反而要先划过一堆旧记录。 -->
          <NTimelineItem
            v-for="log in logs"
            :key="log.id"
            :time="fullTime(log.create_time)"
            :color="LOG_ACTION_COLOR[log.action]"
          >
            <div class="flex flex-wrap items-center gap-x-1.5 gap-y-1">
              <span class="text-[13px] font-semibold">{{ log.action_label }}</span>
              <span class="text-[12px] text-ink-3">
                {{ log.actor_nickname ?? '（账号已注销）' }}
              </span>
              <!-- actor_role 走的是对外口径，这里永远不会出现「默认管理员」这种标记 -->
              <RoleTag v-if="log.actor_role" :role="log.actor_role" />
            </div>
            <p v-if="log.detail" class="mt-0.5 break-words text-[12px] leading-5 text-ink-3">
              {{ log.detail }}
            </p>
          </NTimelineItem>
        </NTimeline>

        <!-- 老订单在这张表里本来就是空的：留痕是这次升级才加的，
             不能拿 orders 那几个时间戳倒推补几条（倒推出来的操作人只会是错的）。 -->
        <p v-else class="text-[12px] leading-6 text-ink-4">
          这一单还没有操作记录。留痕功能是后加的，升级之前发生的步骤不会被倒推补录 ——
          与其显示一条猜出来的记录，不如明确告诉你这里没有。
        </p>
      </section>

      <p class="tech-label mt-3 text-ink-4">最后更新 {{ shortTime(order.update_time) }}</p>
    </template>
  </div>
</template>
