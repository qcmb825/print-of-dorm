<script setup lang="ts">
/** 工单详情：消息流 + 回复 + 关闭/重开。学生端和管理端共用同一份实现。 */
import { computed, onMounted, ref, watch } from 'vue'
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

const messages = computed(() => detail.value?.messages ?? [])
const ticket = computed(() => detail.value?.ticket ?? null)
const closed = computed(() => ticket.value?.status === 'closed')

async function load(): Promise<void> {
  loading.value = true
  try {
    detail.value = await ticketApi.detail(props.ticketId)
    emit('changed') // 详情接口会推进已读时间，让列表同步刷新未读徽标
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载工单失败')
  } finally {
    loading.value = false
  }
}

async function send(): Promise<void> {
  const body = replyBody.value.trim()
  if (!body) return
  sending.value = true
  try {
    await ticketApi.reply(props.ticketId, body)
    replyBody.value = ''
    await load()
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

onMounted(load)
watch(() => props.ticketId, load)
</script>

<template>
  <div class="flex h-full flex-col">
    <header class="flex items-start justify-between gap-3 border-b px-4 py-3" style="border-color: var(--border)">
      <div class="min-w-0">
        <h3 class="truncate font-heading text-[15px] font-bold">
          {{ ticket?.subject ?? '加载中…' }}
        </h3>
        <p class="tech-label mt-1 text-ink-4">
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

    <div class="min-h-0 flex-1 overflow-y-auto px-4 py-3">
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
                class="mb-1 flex items-center gap-2 text-[11px] text-ink-4"
                :class="item.sender_id === currentUserId ? 'justify-end' : ''"
              >
                <span class="font-semibold">{{ item.sender_nickname ?? '（已注销）' }}</span>
                <span class="tnum">{{ item.create_time?.slice(5, 16) ?? '' }}</span>
              </div>
              <div
                class="rounded-xl border px-3 py-2 text-[13px] whitespace-pre-wrap break-words"
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
        <span class="tnum text-[11px] text-ink-4">{{ replyBody.length }} / 1000</span>
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
