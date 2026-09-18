<script setup lang="ts">
/** 工单详情：消息流 + 回复 + 关闭/重开。学生端和管理端共用同一份实现。
 *
 *  消息流靠**增量轮询**保持新鲜（服务端 `GET /api/tickets/<id>/messages?since_id=N`）。
 *  为什么不做 SSE / WebSocket：服务端是 waitress 单进程 8 线程，一条长连接就独占一个线程，
 *  第 9 个在线用户会让整台服务器不再接客。而轮询是「用完就走」，线程立刻还回去 ——
 *  拿一点带宽换可用性，这笔账在跨洋部署下反而更划算。
 *
 *  轮询只调增量接口，不调详情接口：详情接口会推进已读时间，拿它轮询等于
 *  「用户盯着看，边看边把新消息标成已读」，未读徽标就永远不亮了。
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import { Lock, RotateCcw, Send } from '@lucide/vue'
import { NButton, NInput, NSpin, useMessage } from 'naive-ui'
import { ApiError } from '@/api/client'
import { ticketApi } from '@/api/endpoints'
import type { TicketDetailResponse } from '@/api/types'
import { TICKET_STATUS_LABEL } from '@/utils/format'

const props = defineProps<{ ticketId: number; staff: boolean; currentUserId: number }>()
const emit = defineEmits<{ changed: [] }>()

const message = useMessage()
const detail = ref<TicketDetailResponse | null>(null)
const loading = ref(false)
const replyBody = ref('')
const sending = ref(false)
const scroller = ref<HTMLElement | null>(null)

/** 轮询游标：只关心比它更新的消息。 */
const lastId = ref(0)

/** 间隔分三档：有新消息时最快，连续问空就逐渐放慢到上限。
 *  刚有人说话的工单最可能有下文（对方正在打字），闲下来之后就没必要一直问。 */
const POLL_ACTIVE = 3_000
const POLL_IDLE = 8_000
const POLL_MAX = 15_000
const pollInterval = ref(POLL_IDLE)

const messages = computed(() => detail.value?.messages ?? [])
const ticket = computed(() => detail.value?.ticket ?? null)
const closed = computed(() => ticket.value?.status === 'closed')

/** 是否允许播放动效。减少动效不等于零动效，滚动直接跳到底即可。 */
function animate(): boolean {
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

async function scrollToBottom(smooth: boolean): Promise<void> {
  await nextTick()
  const el = scroller.value
  if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth && animate() ? 'smooth' : 'auto' })
}

/** 用户现在是不是正贴着底部看。往上翻着读历史时不该被新消息硬拽下去。 */
function isNearBottom(): boolean {
  const el = scroller.value
  if (!el) return true
  return el.scrollHeight - el.scrollTop - el.clientHeight < 80
}

async function load(): Promise<void> {
  loading.value = true
  try {
    detail.value = await ticketApi.detail(props.ticketId)
    lastId.value = detail.value.last_id ?? 0
    emit('changed') // 详情接口会推进已读时间，让列表同步刷新未读徽标
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载工单失败')
  } finally {
    loading.value = false
  }
}

let polling = false

/** 拉一次增量。失败按最慢档重试，不弹提示。 */
async function poll(): Promise<void> {
  // 上一轮还没回来就跳过这一拍：跨洋链路偶尔慢过轮询间隔，
  // 不设这道闸的话请求会越堆越多，用户看到的反而更卡。
  if (polling || !detail.value) return
  polling = true
  try {
    const data = await ticketApi.messagesSince(props.ticketId, lastId.value)
    if (data.last_id > lastId.value) lastId.value = data.last_id

    const known = new Set(messages.value.map((item) => item.id))
    const fresh = data.messages.filter((item) => !known.has(item.id))
    if (fresh.length) {
      // 先记下滚动位置：push 之后 DOM 就变高了，再问「贴没贴底」已经晚了
      const wasNearBottom = isNearBottom()
      detail.value.messages.push(...fresh)
      pollInterval.value = POLL_ACTIVE
      // 只有用户没在往上翻、也没在打字时才自动滚。正在敲字的人最烦视野被顶走。
      if (wasNearBottom && !replyBody.value.trim()) await scrollToBottom(true)
      emit('changed') // 未读徽标和列表排序跟着变
    } else {
      pollInterval.value =
        pollInterval.value < POLL_IDLE
          ? POLL_IDLE
          : Math.min(Math.round(pollInterval.value * 1.6), POLL_MAX)
    }

    // 对方关掉或重开工单时，输入框的可用状态要跟着变
    if (data.status && detail.value.ticket.status !== data.status) {
      detail.value.ticket.status = data.status
      emit('changed')
    }
  } catch {
    // 轮询失败不打扰用户：网络抖一下就弹一次错误提示，比偶尔晚几秒刷新讨厌得多。
    // 放慢到上限，等链路恢复它自己会回来。
    pollInterval.value = POLL_MAX
  } finally {
    polling = false
  }
}

async function send(): Promise<void> {
  const body = replyBody.value.trim()
  if (!body) return
  sending.value = true
  try {
    await ticketApi.reply(props.ticketId, body)
    replyBody.value = ''
    // 回复接口只回 {code, msg}，拿不到新消息的 id，所以回读一次详情 ——
    // 发送是用户自己点的，多一个请求换「我说的话立刻出现」很值。
    await load()
    await scrollToBottom(true)
    pollInterval.value = POLL_ACTIVE
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '发送失败')
  } finally {
    sending.value = false
  }
}

async function toggleStatus(): Promise<void> {
  try {
    await ticketApi.setStatus(props.ticketId, closed.value ? 'open' : 'closed')
    message.success(closed.value ? '工单已重新打开' : '工单已关闭')
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '操作失败')
  }
}

const visibility = useDocumentVisibility()
const { pause, resume } = useIntervalFn(() => void poll(), pollInterval, { immediate: false })

watch(visibility, (state) => {
  if (state === 'visible') {
    // 切回来先立刻补一次，否则要干等一个间隔才看到别人刚才说的话
    void poll()
    resume()
  } else {
    pause()
  }
})

onMounted(async () => {
  await load()
  resume()
  await scrollToBottom(false)
})

// 父组件给了 :key，正常会整个重挂；这里兜底，免得哪天去掉 key 就串了游标
watch(
  () => props.ticketId,
  async () => {
    lastId.value = 0
    pollInterval.value = POLL_IDLE
    await load()
    await scrollToBottom(false)
    resume()
  },
)

onBeforeUnmount(pause)
</script>

<template>
  <div class="flex h-full flex-col">
    <header class="flex items-start justify-between gap-3 border-b px-4 py-3" style="border-color: var(--border)">
      <div class="min-w-0">
        <h3 class="truncate font-heading text-base font-bold">
          {{ ticket?.subject ?? '加载中…' }}
        </h3>
        <p class="tech-label mt-1 text-ink-4 tech-label--cn text-xs">
          #{{ ticketId }}
          <template v-if="staff && ticket"> · 提交人 {{ ticket.owner_nickname }}</template>
          <template v-if="ticket"> · {{ TICKET_STATUS_LABEL[ticket.status] }}</template>
        </p>
      </div>
      <NButton v-if="ticket" size="small" quaternary :disabled="loading" @click="toggleStatus">
        <template #icon>
          <component :is="closed ? RotateCcw : Lock" :size="14" />
        </template>
        {{ closed ? '重开' : '关闭' }}
      </NButton>
    </header>

    <div ref="scroller" class="min-h-0 flex-1 overflow-y-auto px-4 py-3">
      <NSpin :show="loading && !messages.length">
        <!-- 消息按 id 升序追加在末尾，所以新气泡从下方 4px 升起 —— 和「发出去的东西落在
             列表底部」这件事在空间上对得上。 -->
        <TransitionGroup
          tag="ul"
          class="flex list-none flex-col gap-3 p-0"
          enter-active-class="transition duration-[200ms] ease-out"
          enter-from-class="opacity-0 translate-x-1"
          move-class="transition duration-[200ms] ease-out"
        >
          <li
            v-for="item in messages"
            :key="item.id"
            class="flex"
            :class="item.sender_id === currentUserId ? 'justify-end' : 'justify-start'"
          >
            <div class="max-w-[86%]">
              <div
                class="mb-1 flex items-center gap-2 text-xs text-ink-4"
                :class="item.sender_id === currentUserId ? 'justify-end' : ''"
              >
                <span class="font-semibold">{{ item.sender_nickname ?? '（已注销）' }}</span>
                <span class="tnum">{{ item.create_time?.slice(5, 16) ?? '' }}</span>
              </div>
              <div
                class="rounded-xl border px-3 py-2 text-sm whitespace-pre-wrap break-words"
                :style="
                  item.sender_id === currentUserId
                    ? {
                        backgroundColor: 'var(--accent-tint)',
                        borderColor: 'var(--accent-tint-border)',
                      }
                    : { backgroundColor: 'var(--muted)', borderColor: 'var(--border)' }
                "
              >
                {{ item.body }}
              </div>
            </div>
          </li>
        </TransitionGroup>
      </NSpin>
    </div>

    <footer class="border-t px-4 py-3" style="border-color: var(--border)">
      <NInput
        v-model:value="replyBody"
        type="textarea"
        :maxlength="1000"
        :autosize="{ minRows: 2, maxRows: 5 }"
        :placeholder="closed ? '工单已关闭，先重新打开再回复' : '输入回复内容，Enter 发送'"
        :disabled="closed || sending"
        @keydown.enter.exact.prevent="send"
      />
      <div class="mt-2 flex items-center justify-between gap-3">
        <span class="tnum text-2xs text-ink-4">{{ replyBody.length }} / 1000</span>
        <NButton
          type="primary"
          size="small"
          :loading="sending"
          :disabled="closed || !replyBody.trim()"
          class="!font-bold"
          @click="send"
        >
          <template #icon><Send :size="14" /></template>
          发送
        </NButton>
      </div>
    </footer>
  </div>
</template>
