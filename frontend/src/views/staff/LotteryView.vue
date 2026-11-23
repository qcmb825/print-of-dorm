<script setup lang="ts">
/** 抽奖管理：建活动、配图、立即开奖/归档、参与名单（含用户信息与通知状态）。
 *
 *  口径都在后端（routes/lottery.py 模块头），这里只照单显示：
 *  · 结余提示的「上期同奖品结余 N 份」来自 /api/admin/lotteries/carry ——
 *    奖品名是结余的钥匙，所以输入框一变就要重查；前端不算结余。
 *  · 立即开奖/删除是不可逆动作，走 confirmAction，正文写会发生什么，
 *    不复述问句（DESIGN_RULES §12）。
 *  · 参与名单在这里**有**姓名/学号/宿舍/QQ（后端只在这条管理接口给，
 *    分级见 api/types.ts 的注释）；学生端那个页面拿不到，也不该拿到。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { ImageUp, Pencil, Play, Plus, RefreshCw, Trash2 } from '@lucide/vue'
import {
  NButton,
  NDatePicker,
  NFormItem,
  NInput,
  NInputNumber,
  NSkeleton,
  useMessage,
} from 'naive-ui'
import { lotteryApi } from '@/api/endpoints'
import type { LotteryAdminDetail, LotteryAdminEntry, LotteryAdminItem } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { fullTime } from '@/utils/format'

const message = useMessage()

const items = ref<LotteryAdminItem[]>([])
const detail = ref<LotteryAdminDetail | null>(null)
const selectedId = ref<number | null>(null)
const loading = ref(true)
const detailLoading = ref(false)
const saving = ref(false)
const acting = ref(false)

const openItem = computed(() => items.value.find((item) => item.status === 'open') ?? null)
const inShelfItem = computed(
  () => items.value.find((item) => item.status === 'open' || item.status === 'drawn') ?? null,
)

// ---- 表单（建新一期，或编辑进行中的那一期）----
const editingId = ref<number | null>(null)
const form = reactive({
  prize_name: '',
  prize_quantity: 1,
  draw_at_ms: null as number | null,
  archive_at_ms: null as number | null,
})
/** 上期同奖品结余（结余口径在后端，这里只显示它）。 */
const carryHint = ref<number | null>(null)

const STATUS_LABEL: Record<LotteryAdminItem['status'], string> = {
  open: '进行中',
  drawn: '已开奖',
  archived: '已归档',
}

function fillForm(item: LotteryAdminItem | null): void {
  if (item && item.status === 'open') {
    editingId.value = item.id
    form.prize_name = item.prize_name
    form.prize_quantity = item.prize_quantity
    form.draw_at_ms = Date.parse(`${item.draw_at.replace(' ', 'T')}`) || null
    form.archive_at_ms = item.archive_at
      ? Date.parse(`${item.archive_at.replace(' ', 'T')}`) || null
      : null
  } else {
    editingId.value = null
    form.prize_name = ''
    form.prize_quantity = 1
    form.draw_at_ms = null
    form.archive_at_ms = null
  }
  carryHint.value = null
}

/** 归档默认跟开奖走 +7 天（清空 = 不自动归档）。管理员自己挑过就不动。 */
function onDrawPicked(value: number | null): void {
  form.draw_at_ms = value
  if (value && !form.archive_at_ms) {
    form.archive_at_ms = value + 7 * 86400_000
  }
}

// 结余随奖品名变：500ms 抖一下再查，别每敲一个字打一次接口。
let carryTimer: ReturnType<typeof setTimeout> | null = null
watch(
  () => form.prize_name,
  (name) => {
    if (editingId.value) return // 编辑时结余已定格在 carry_in 里，不重算
    if (carryTimer) clearTimeout(carryTimer)
    if (!name.trim()) {
      carryHint.value = null
      return
    }
    carryTimer = setTimeout(async () => {
      try {
        const data = await lotteryApi.adminCarry(name.trim())
        carryHint.value = data.carry_in
      } catch {
        carryHint.value = null
      }
    }, 500)
  },
)
onBeforeUnmount(() => {
  if (carryTimer) clearTimeout(carryTimer)
})

// ---- 读取 ----
async function load(): Promise<void> {
  loading.value = true
  try {
    const data = await lotteryApi.adminList()
    items.value = data.items
    // 默认选中在架那期；没有就选最近一期，详情区不至于整块空白。
    const target = inShelfItem.value ?? data.items[0] ?? null
    selectedId.value = target ? target.id : null
    fillForm(openItem.value)
    if (selectedId.value) await loadDetail(selectedId.value)
    else detail.value = null
  } catch {
    message.error('抽奖列表没读到 · 稍后重试')
  } finally {
    loading.value = false
  }
}

async function loadDetail(id: number): Promise<void> {
  detailLoading.value = true
  try {
    detail.value = await lotteryApi.adminDetail(id)
  } catch {
    detail.value = null
    message.error('参与名单没读到 · 稍后重试')
  } finally {
    detailLoading.value = false
  }
}

async function select(id: number): Promise<void> {
  selectedId.value = id
  await loadDetail(id)
}

// ---- 动作 ----
async function save(): Promise<void> {
  if (saving.value) return
  if (!form.prize_name.trim()) {
    message.warning('奖品名称不能为空')
    return
  }
  if (!form.draw_at_ms) {
    message.warning('先挑一个开奖时间')
    return
  }
  saving.value = true
  const payload = {
    prize_name: form.prize_name.trim(),
    prize_quantity: form.prize_quantity,
    draw_at_ms: form.draw_at_ms,
    archive_at_ms: form.archive_at_ms,
  }
  try {
    if (editingId.value) {
      await lotteryApi.adminUpdate(editingId.value, payload)
      message.success('已保存')
    } else {
      await lotteryApi.adminCreate(payload)
      message.success('已创建')
    }
    await load()
  } catch {
    // 失败文案（份数/时间不合法、已有在架活动等）由全局层弹，这里不再叠一句。
  } finally {
    saving.value = false
  }
}

async function drawNow(): Promise<void> {
  const target = selectedId.value
  if (!target || acting.value) return
  const ok = await confirmAction({
    title: '立即开奖',
    content: '开奖后参与名单冻结，不能修改。',
    positiveText: '开奖',
  })
  if (!ok) return
  acting.value = true
  try {
    await lotteryApi.adminDraw(target)
    message.success('已开奖')
    await load()
  } catch {
    // 409（已开过）等由全局层说。
  } finally {
    acting.value = false
  }
}

async function archiveNow(): Promise<void> {
  const target = selectedId.value
  if (!target || acting.value) return
  const ok = await confirmAction({
    title: '立即归档',
    content: '学生端将看不到这一期，管理端历史保留。',
    positiveText: '归档',
  })
  if (!ok) return
  acting.value = true
  try {
    await lotteryApi.adminArchive(target)
    message.success('已归档')
    await load()
  } catch {
    // 同上。
  } finally {
    acting.value = false
  }
}

async function remove(): Promise<void> {
  const target = selectedId.value
  if (!target || acting.value) return
  const ok = await confirmAction({
    title: '删除抽奖',
    content: '参与记录一起删除，不可恢复。',
    positiveText: '删除',
    dangerous: true,
  })
  if (!ok) return
  acting.value = true
  try {
    await lotteryApi.adminDelete(target)
    message.success('已删除')
    await load()
  } catch {
    // 同上。
  } finally {
    acting.value = false
  }
}

// 配图上传：隐藏 input + 按钮触发（全站没有用 NUpload 的先例，见 PayQrDialog）。
const imageInput = ref<HTMLInputElement | null>(null)

function pickImage(): void {
  imageInput.value?.click()
}

async function onImagePicked(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  const target = selectedId.value
  if (!file || !target) return
  acting.value = true
  try {
    await lotteryApi.adminUploadImage(target, file)
    message.success('配图已更新')
    await loadDetail(target)
  } catch {
    // 类型/大小/内容签名的拒绝文案由全局层弹。
  } finally {
    acting.value = false
  }
}

// ---- 展示辅助 ----
function notifyLabel(entry: LotteryAdminEntry): string {
  if (!entry.is_winner) return '—'
  if (entry.notify_time) return '已通知'
  if (entry.notify_error === 'no_mailbox') return '无邮箱'
  if (entry.notify_error === 'smtp') return '发送失败'
  return '未通知'
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <PageHeader heading="lg" title="抽奖" subtitle="奖品结余同奖品累计 · 开奖后名单冻结">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div v-if="loading" class="flex flex-col gap-3">
      <NSkeleton height="200px" :sharp="false" />
      <NSkeleton height="160px" :sharp="false" />
    </div>

    <template v-else>
      <!-- 建活动 / 编辑进行中的那一期。同一张表单两种用途，editingId 区分。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">
            {{ editingId ? '编辑进行中的抽奖' : '建新一期' }}
          </h2>
          <span v-if="editingId" class="readout">EDITING #{{ editingId }}</span>
        </div>

        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <NFormItem label="奖品名称" :show-feedback="false">
            <NInput
              v-model:value="form.prize_name"
              maxlength="40"
              show-count
              placeholder="例：洞洞板套件"
              :disabled="saving"
            />
          </NFormItem>
          <NFormItem label="本期总份数" :show-feedback="false">
            <NInputNumber
              v-model:value="form.prize_quantity"
              :min="1"
              :max="10000"
              :disabled="saving"
              class="w-full"
            />
          </NFormItem>
          <NFormItem label="开奖时间" :show-feedback="false">
            <NDatePicker
              :value="form.draw_at_ms"
              type="datetime"
              size="medium"
              :actions="['clear', 'confirm']"
              :disabled="saving"
              class="w-full"
              @update:value="onDrawPicked"
            />
          </NFormItem>
          <NFormItem label="归档时间（空 = 不自动归档）" :show-feedback="false">
            <NDatePicker
              v-model:value="form.archive_at_ms"
              type="datetime"
              size="medium"
              clearable
              :actions="['clear', 'confirm']"
              :disabled="saving"
              class="w-full"
            />
          </NFormItem>
        </div>

        <p v-if="carryHint && carryHint > 0" class="mt-2 px-3 py-2 text-xs" role="status"
           style="background-color: var(--accent-tint-soft); color: var(--accent-text)">
          上期同奖品结余 {{ carryHint }} 份 · 建议总份数不低于它（没发完的自动留到本期）
        </p>

        <div class="mt-3 flex flex-wrap gap-2">
          <NButton :loading="saving" @click="save">
            <template #icon><Plus v-if="!editingId" :size="15" /><Pencil v-else :size="15" /></template>
            {{ editingId ? '保存修改' : '创建' }}
          </NButton>
          <NButton v-if="editingId" quaternary :disabled="saving" @click="fillForm(openItem)">
            改回当前值
          </NButton>
        </div>
      </section>

      <!-- 活动列表：在架那期排最前，历史跟在后面。点一行，下面出参与名单。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">活动记录</h2>
          <span class="readout">{{ items.length }} 期</span>
        </div>

        <div v-if="!items.length" class="mt-3">
          <EmptyState code="00 / LOTTERY EMPTY" title="还没有抽奖活动"
            hint="填好上面那张表就能开第一期" />
        </div>

        <div v-else class="mt-3 overflow-x-auto">
          <table class="w-full min-w-140 text-sm">
            <thead>
              <tr class="border-b text-left" style="border-color: var(--border)">
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">状态</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">奖品</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">份数</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">参与</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">中奖</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">结余</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">开奖时刻</th>
                <th class="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                class="cursor-pointer border-b transition-colors duration-[var(--motion-dur-fast)]"
                style="border-color: var(--border-subtle)"
                :class="selectedId === item.id && 'bg-[var(--muted)]'"
                @click="select(item.id)"
              >
                <td class="px-2 py-2 font-semibold">{{ STATUS_LABEL[item.status] }}</td>
                <td class="px-2 py-2">
                  {{ item.prize_name }}
                  <span v-if="item.has_image" class="readout ml-1.5">图</span>
                </td>
                <td class="tnum px-2 py-2">{{ item.prize_quantity }}</td>
                <td class="tnum px-2 py-2">{{ item.participant_count }}</td>
                <td class="tnum px-2 py-2">{{ item.status === 'open' ? '—' : item.winner_count }}</td>
                <td class="tnum px-2 py-2">{{ item.leftover ?? '—' }}</td>
                <td class="tnum px-2 py-2">
                  {{ item.status === 'open' ? fullTime(item.draw_at) : fullTime(item.drawn_at) }}
                </td>
                <td class="px-2 py-2">
                  <NButton size="tiny" quaternary @click.stop="select(item.id)">名单</NButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 在架活动的快捷动作：开奖 / 归档 / 删除，都带确认。 -->
        <div
          v-if="inShelfItem && selectedId === inShelfItem.id"
          class="mt-3 flex flex-wrap gap-2 border-t pt-3"
          style="border-color: var(--border)"
        >
          <NButton v-if="inShelfItem.status === 'open'" size="small" :loading="acting" @click="drawNow">
            <template #icon><Play :size="14" /></template>
            立即开奖
          </NButton>
          <NButton v-if="inShelfItem.status === 'drawn'" size="small" :loading="acting" @click="archiveNow">
            立即归档
          </NButton>
          <NButton size="small" :loading="acting" @click="pickImage">
            <template #icon><ImageUp :size="14" /></template>
            {{ inShelfItem.has_image ? '换奖品图' : '上传奖品图' }}
          </NButton>
          <NButton size="small" quaternary :loading="acting" @click="remove">
            <template #icon><Trash2 :size="14" /></template>
            删除
          </NButton>
          <input
            ref="imageInput"
            type="file"
            accept="image/png,image/jpeg"
            class="hidden"
            @change="onImagePicked"
          >
        </div>
      </section>

      <!-- 参与名单：只对选中的那一期展开。管理端才有的用户信息列。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">参与名单</h2>
          <span v-if="detail" class="readout">
            #{{ detail.id }} · {{ detail.participant_count }} 人
            <template v-if="detail.status !== 'open'"> · 中奖 {{ detail.winner_count }}</template>
          </span>
        </div>

        <div v-if="detailLoading" class="mt-3">
          <NSkeleton height="120px" :sharp="false" />
        </div>
        <div v-else-if="!detail || !detail.entries.length" class="mt-3">
          <EmptyState code="00 / NO ENTRIES" title="这一期还没有人参与" />
        </div>
        <div v-else class="mt-3 overflow-x-auto">
          <table class="w-full min-w-200 text-sm">
            <thead>
              <tr class="border-b text-left" style="border-color: var(--border)">
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">昵称</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">姓名</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">学号</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">宿舍</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">QQ</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">参与时刻</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">中奖</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">邮件</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in detail.entries"
                :key="entry.user_id"
                class="border-b"
                style="border-color: var(--border-subtle)"
                :style="entry.is_winner ? 'background-color: var(--accent-tint-soft)' : undefined"
              >
                <td class="px-2 py-2 font-semibold">{{ entry.nickname }}</td>
                <td class="px-2 py-2">{{ entry.real_name }}</td>
                <td class="tnum px-2 py-2">{{ entry.student_id }}</td>
                <td class="px-2 py-2">{{ entry.dorm }}</td>
                <td class="tnum px-2 py-2">{{ entry.qq || '—' }}</td>
                <td class="tnum px-2 py-2">{{ fullTime(entry.joined_at) }}</td>
                <td class="px-2 py-2 font-semibold" :style="entry.is_winner ? 'color: var(--accent-text)' : undefined">
                  {{ entry.is_winner ? '中奖' : '' }}
                </td>
                <td class="px-2 py-2" :style="entry.notify_error ? 'color: var(--err)' : undefined">
                  {{ notifyLabel(entry) }}
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="detail.status === 'drawn' || detail.status === 'archived'" class="mt-2 text-xs text-ink-3">
            「无邮箱 / 发送失败」的，按名单上的 QQ 手动说一声。
          </p>
        </div>
      </section>
    </template>
  </div>
</template>
