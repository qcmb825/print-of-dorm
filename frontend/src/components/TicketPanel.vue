<script setup lang="ts">
/** 工单面板：左侧列表 + 右侧详情（窄屏收进抽屉）。两个角色共用，靠 staff 开关区分行为。 */
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import { Inbox, MessageSquarePlus, Plus } from '@lucide/vue'
import {
  NBadge,
  NButton,
  NDrawer,
  NDrawerContent,
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
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import TicketDetail from '@/components/TicketDetail.vue'
import { TICKET_STATUS_LABEL, shortTime } from '@/utils/format'

const props = defineProps<{ staff: boolean; currentUserId: number }>()
const message = useMessage()

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
    if (!silent) message.error(error instanceof ApiError ? error.message : '工单读取失败')
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
    message.warning('标题与描述为必填')
    return
  }
  creating.value = true
  try {
    const data = await ticketApi.create(form.subject.trim(), form.body.trim())
    message.success('工单已提交 · 待回复')
    createOpen.value = false
    form.subject = ''
    form.body = ''
    await load()
    selectedId.value = data.id
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '提交未完成 · 稍后重试')
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
    <!-- 走公共的 PageHeader：这一页原先手写了一个标题（理由是"h1 里要嵌未读角标"），
         代价是它少了铭牌行、字段行（PATH/CODE/SYNC）与扇区读数 —— 全站 13 个页面里
         只有这一页没有"文件头"。现在给 PageHeader 补了 title-append 槽，
         编号仍取自 route.meta.code（学生端 04 / 管理端 07 各自不同），角标进槽。 -->
    <PageHeader
      heading="md"
      :title="staff ? '工单处理' : '问题反馈'"
      :subtitle="
        staff
          ? '学生提交的问题与需求 · 回复后对方收到未读提示'
          : '打印相关问题 · 在此留言给管理员'
      "
    >
      <template #title-append>
        <NBadge v-if="unreadTotal" :value="unreadTotal" type="warning" />
      </template>
      <template #actions>
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
      </template>
    </PageHeader>

    <div class="grid gap-4 lg:grid-cols-[minmax(260px,340px)_1fr]">
      <!-- 列表 -->
      <div class="panel overflow-hidden">
        <div v-if="loading && !tickets.length" class="flex flex-col gap-2 p-3">
          <NSkeleton v-for="index in 4" :key="index" height="58px" :sharp="false" />
        </div>
        <div v-else-if="!tickets.length" class="grid place-items-center py-12">
          <EmptyState
            code="00 / NO TICKET"
            :title="staff ? '无工单' : '尚未提交工单'"
            :hint="staff ? '学生提交后在此列示' : '打印相关问题 · 新建工单提交'"
          >
            <template #icon><Inbox :size="28" /></template>
          </EmptyState>
        </div>
        <!-- 工单按 update_time 倒序：新工单从上方落下，有人回复的旧工单会移回顶部。
             那段「让位 / 回到顶部」的位移由 move-class 负责 —— 30 秒轮询下这是唯一能看出
             「哪条动过」的线索。 -->
        <TransitionGroup
          v-else
          tag="ul"
          class="flex max-h-[62vh] list-none flex-col overflow-y-auto p-0"
          enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
          enter-from-class="opacity-0 translate-x-1"
          move-class="transition duration-[var(--motion-dur-base)] ease-out"
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
                  :style="{ color: ticket.status === 'open' ? 'var(--status-printing)' : 'var(--text-tertiary)' }"
                >
                  {{ TICKET_STATUS_LABEL[ticket.status] }}
                </span>
              </div>
              <p class="mt-1 line-clamp-2 text-xs text-ink-3">{{ ticket.last_body }}</p>
              <p class="tech-label mt-1.5 text-ink-3 tech-label--cn text-xs">
                工单 {{ ticket.id }}
                <template v-if="staff && ticket.owner_nickname"> · {{ ticket.owner_nickname }}</template>
                · {{ shortTime(ticket.update_time) }} · {{ ticket.msg_count }} 条
              </p>
            </button>
          </li>
        </TransitionGroup>
      </div>

      <!-- 详情：宽屏常驻 -->
      <!-- 分栏线：左列表右详情，一条 1px 线把"一栏"说清楚。 -->
      <div
        class="panel hidden min-h-[420px] overflow-hidden lg:block lg:border-l lg:border-[var(--border)] lg:pl-4"
      >
        <TicketDetail
          v-if="selected"
          :key="selected.id"
          :ticket-id="selected.id"
          :staff="staff"
          :current-user-id="currentUserId"
          @changed="load(true)"
        />
        <div v-else class="grid h-full place-items-center py-16">
          <EmptyState code="00 / NO TICKET" title="从左侧选择工单" hint="窄屏以抽屉打开">
            <template #icon><MessageSquarePlus :size="28" /></template>
          </EmptyState>
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
          placeholder="写清单号、遇到的问题与期望的处理方式"
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
