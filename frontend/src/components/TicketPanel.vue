<script setup lang="ts">
/** 工单面板：左侧列表 + 右侧详情（窄屏收进抽屉）。两个角色共用，靠 staff 开关区分行为。 */
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { Inbox, MessageSquarePlus, Plus } from '@lucide/vue'
import {
  NBadge,
  NButton,
  NDrawer,
  NDrawerContent,
  NEmpty,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NSkeleton,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { ticketApi } from '@/api/endpoints'
import type { Ticket, TicketStatus } from '@/api/types'
import TicketDetail from '@/components/TicketDetail.vue'
import { TICKET_STATUS_LABEL, shortTime } from '@/utils/format'

const props = defineProps<{ staff: boolean; currentUserId: number }>()
const message = useMessage()
// 页面编号取自路由 meta（与 PageHeader 同一个事实来源）。这个组件同时服务
// 学生端「问题反馈」与管理端「工单处理」两条路由，所以只能运行时读，不能写死。
const pageCode = computed(() => useRoute().meta.code as string | undefined)

const tickets = ref<Ticket[]>([])
const unreadTotal = ref(0)
const loading = ref(true)
const statusFilter = ref<'all' | TicketStatus>('all')
const selectedId = ref<number | null>(null)
const drawerOpen = ref(false)

const createOpen = ref(false)
const creating = ref(false)
const form = reactive({ subject: '', body: '' })

const statusOptions = [
  { label: '全部', value: 'all' },
  { label: '进行中', value: 'open' },
  { label: '已关闭', value: 'closed' },
]

const selected = computed(() => tickets.value.find((item) => item.id === selectedId.value) ?? null)

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await ticketApi.list(statusFilter.value === 'all' ? undefined : statusFilter.value)
    tickets.value = data.tickets
    unreadTotal.value = data.unread_total
    // 选中的工单被筛掉时清掉选中态，避免详情和列表不一致
    if (selectedId.value && !tickets.value.some((item) => item.id === selectedId.value)) {
      selectedId.value = null
    }
  } catch (error) {
    if (!silent) message.error(error instanceof ApiError ? error.message : '加载工单失败')
  } finally {
    loading.value = false
  }
}

function open(ticket: Ticket): void {
  selectedId.value = ticket.id
  // 窄屏用抽屉看详情，宽屏直接右栏渲染
  if (window.matchMedia('(max-width: 1023px)').matches) drawerOpen.value = true
}

async function createTicket(): Promise<void> {
  if (!form.subject.trim() || !form.body.trim()) {
    message.warning('标题和描述都要填')
    return
  }
  creating.value = true
  try {
    const data = await ticketApi.create(form.subject.trim(), form.body.trim())
    message.success('工单已提交，等待管理员回复')
    createOpen.value = false
    form.subject = ''
    form.body = ''
    await load()
    selectedId.value = data.id
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '提交失败')
  } finally {
    creating.value = false
  }
}

const visibility = useDocumentVisibility()
const { pause, resume } = useIntervalFn(() => void load(true), 30_000, { immediate: false })

watch(visibility, (state) => (state === 'visible' ? (resume(), void load(true)) : pause()))
watch(statusFilter, () => void load())

onMounted(async () => {
  await load()
  resume()
})
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <header class="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="flex items-baseline gap-2 font-heading text-xl font-bold sm:text-2xl">
          <!-- 编号内联在这里而不是走 PageHeader：这个 h1 里嵌着未读角标，套不进那个组件的结构。
               编号同样取自 route.meta.code，两条路由（学生端 04 / 管理端 07）各自不同。 -->
          <span v-if="pageCode" class="tech-label shrink-0 text-2xs text-ink-3">{{ pageCode }} //</span>
          <span class="flex items-center gap-2">{{ staff ? '工单处理' : '问题反馈' }}</span>
          <NBadge v-if="unreadTotal" :value="unreadTotal" type="warning" />
        </h1>
        <p class="mt-0.5 text-sm text-ink-3">
          {{ staff ? '学生提交的问题与需求，回复后对方会看到未读提示' : '有打印相关的问题，在这里留言给管理员' }}
        </p>
      </div>
      <div class="flex items-center gap-2">
        <NSelect
          v-model:value="statusFilter"
          :options="statusOptions"
          size="small"
          class="!w-[112px]"
          :consistent-menu-width="false"
        />
        <NButton v-if="!staff" type="primary" size="small" class="!font-bold" @click="createOpen = true">
          <template #icon><Plus :size="15" /></template>
          新建工单
        </NButton>
      </div>
    </header>

    <div class="grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]">
      <!-- 列表 -->
      <div class="panel overflow-hidden">
        <div v-if="loading && !tickets.length" class="flex flex-col gap-2 p-3">
          <NSkeleton v-for="index in 4" :key="index" height="58px" :sharp="false" />
        </div>
        <div v-else-if="!tickets.length" class="grid place-items-center py-12">
          <NEmpty :description="staff ? '暂无工单' : '还没有工单'" size="small">
            <template #icon><Inbox :size="30" /></template>
          </NEmpty>
        </div>
        <!-- 工单按 update_time 倒序：新工单从上方落下，有人回复的旧工单会移回顶部。
             那段「让位 / 回到顶部」的位移由 move-class 负责 —— 30 秒轮询下这是唯一能看出
             「哪条动过」的线索。 -->
        <TransitionGroup
          v-else
          tag="ul"
          class="flex max-h-[62vh] list-none flex-col overflow-y-auto p-0"
          enter-active-class="transition duration-[200ms] ease-out"
          enter-from-class="opacity-0 translate-x-1"
          move-class="transition duration-[200ms] ease-out"
        >
          <li v-for="ticket in tickets" :key="ticket.id">
            <button
              type="button"
              class="w-full border-b px-3.5 py-3 text-left transition-colors"
              :style="{
                borderColor: 'var(--border)',
                backgroundColor: selectedId === ticket.id ? 'var(--muted)' : 'transparent',
              }"
              :aria-current="selectedId === ticket.id ? 'true' : undefined"
              @click="open(ticket)"
            >
              <div class="flex items-start justify-between gap-2">
                <span class="min-w-0 flex-1 truncate text-sm font-semibold">
                  {{ ticket.subject }}
                </span>
                <NBadge v-if="ticket.unread" :value="ticket.unread" type="warning" />
                <span
                  v-else
                  class="tech-label shrink-0 tech-label--cn text-xs"
                  :style="{ color: ticket.status === 'open' ? 'var(--secondary)' : 'var(--text-quaternary)' }"
                >
                  {{ TICKET_STATUS_LABEL[ticket.status] }}
                </span>
              </div>
              <p class="mt-1 line-clamp-2 text-xs text-ink-3">{{ ticket.last_body }}</p>
              <p class="tech-label mt-1.5 text-ink-4 tech-label--cn text-xs">
                #{{ ticket.id }}
                <template v-if="staff && ticket.owner_nickname"> · {{ ticket.owner_nickname }}</template>
                · {{ shortTime(ticket.update_time) }} · {{ ticket.msg_count }} 条
              </p>
            </button>
          </li>
        </TransitionGroup>
      </div>

      <!-- 详情：宽屏常驻 -->
      <div class="panel hidden min-h-[420px] overflow-hidden lg:block">
        <TicketDetail
          v-if="selected"
          :key="selected.id"
          :ticket-id="selected.id"
          :staff="staff"
          :current-user-id="currentUserId"
          @changed="load(true)"
        />
        <div v-else class="grid h-full place-items-center py-16">
          <NEmpty description="从左侧选一个工单查看详情" size="small">
            <template #icon><MessageSquarePlus :size="30" /></template>
          </NEmpty>
        </div>
      </div>
    </div>

    <!-- 窄屏详情抽屉 -->
    <NDrawer v-model:show="drawerOpen" :width="'min(92vw, 440px)'" placement="right">
      <NDrawerContent :native-scrollbar="false" body-content-style="padding: 0">
        <div class="h-[82vh]">
          <TicketDetail
            v-if="selected"
            :key="selected.id"
            :ticket-id="selected.id"
            :staff="staff"
            :current-user-id="currentUserId"
            @changed="load(true)"
          />
        </div>
      </NDrawerContent>
    </NDrawer>

    <!-- 新建工单 -->
    <NModal
      v-model:show="createOpen"
      preset="card"
      title="新建工单"
      class="max-w-[520px]"
      :bordered="false"
    >
      <NFormItem label="标题" :show-feedback="false">
        <NInput v-model:value="form.subject" :maxlength="60" show-count placeholder="一句话说明问题" />
      </NFormItem>
      <NFormItem label="详细描述" :show-feedback="false">
        <NInput
          v-model:value="form.body"
          type="textarea"
          :maxlength="1000"
          show-count
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="请写清订单号、遇到的问题和期望的处理方式"
        />
      </NFormItem>
      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton quaternary @click="createOpen = false">取消</NButton>
          <NButton type="primary" class="!font-bold" :loading="creating" @click="createTicket">
            提交工单
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
