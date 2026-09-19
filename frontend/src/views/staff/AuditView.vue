<script setup lang="ts">
/** 身份审核：名单里查不到学号的人提交的申请，在这里人工核对。
 *
 *  为什么要有这一页：名单是学校导出的静态数据，落后于现实（新生、转专业、名字写错），
 *  而注册又是「学号必须对上」的硬门槛。没有出口的话，这部分人只能找管理员私下改库。
 *
 *  收件人只有管理员：这批数据里有联系方式，属于个人信息，学生端一律看不到。
 *  接口本身也有 roles_required 兜着 —— 前端这里只是不渲染，不是安全边界。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import { Check, ClipboardCheck, RefreshCw, Undo2, X } from '@lucide/vue'
import {
  NAlert,
  NButton,
  NInput,
  NModal,
  NSkeleton,
  NTabPane,
  NTabs,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { auditApi } from '@/api/endpoints'
import { AUDIT_STATUSES, CONTACT_LABELS, type AuditRequest, type AuditStatus } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { fullTime } from '@/utils/format'

const message = useMessage()

const list = ref<AuditRequest[]>([])
const loading = ref(true)
const reviewing = ref(false)
const status = ref<AuditStatus>('pending')
/** 三个页签的角标。初值给 0 而不是 undefined：不补的话切到「已驳回」页角标会是空的，
 *  看起来像还没加载完。 */
const counts = reactive<Record<AuditStatus, number>>({ pending: 0, approved: 0, rejected: 0 })

const STATUS_TABS: { key: AuditStatus; label: string }[] = [
  { key: 'pending', label: '待审核' },
  { key: 'approved', label: '已通过' },
  { key: 'rejected', label: '已驳回' },
]

const STATUS_META: Record<AuditStatus, { label: string; color: string; bg: string }> = {
  pending: { label: '待审核', color: 'var(--status-unpriced)', bg: 'var(--status-unpriced-bg)' },
  approved: { label: '已通过', color: 'var(--status-done)', bg: 'var(--status-done-bg)' },
  rejected: { label: '已驳回', color: 'var(--err)', bg: 'var(--err-bg)' },
}

/** 待审核 0 条时给一句解释，否则管理员会以为是页面坏了 */
const emptyHint = computed(() =>
  status.value === 'pending'
    ? '没有待处理的申请。'
    : '这个状态下还没有记录。',
)

/** 处理弹窗。approve 时理由选填，reject 时必填 —— 与后端一致
 *  （routes/audit.py 里驳回缺理由直接 400，申请人看到的就是这段字）。 */
const dialog = reactive<{ show: boolean; action: 'approve' | 'reject'; target: AuditRequest | null }>(
  { show: false, action: 'approve', target: null },
)
const note = ref('')

/** 后端 AUDIT_REVIEW_MAX = 200，这里卡在同一个数：多打的字会被后端拒掉，
 *  不如让输入框自己停住。 */
const REVIEW_MAX = 200
/** 申请人那边填的说明下限是 4 个字，驳回理由同理 —— 一个「否」字等于没说。 */
const REJECT_MIN = 2

const canConfirm = computed(() => {
  if (dialog.action === 'approve') return true
  return note.value.trim().length >= REJECT_MIN
})

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await auditApi.staffList(status.value)
    list.value = data.requests
    for (const key of AUDIT_STATUSES) counts[key] = data.counts?.[key] ?? 0
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载审核申请失败')
  } finally {
    loading.value = false
  }
}

function openDialog(item: AuditRequest, action: 'approve' | 'reject'): void {
  dialog.target = item
  dialog.action = action
  // 改判时把已有的处理备注带出来，管理员通常是补充说明而不是重写
  note.value = item.review_note ?? ''
  dialog.show = true
}

async function confirm(): Promise<void> {
  const target = dialog.target
  if (!target || !canConfirm.value) return
  reviewing.value = true
  try {
    await auditApi.review(target.id, dialog.action, note.value.trim())
    message.success(dialog.action === 'approve' ? '已通过 · 对方可以注册了' : '已驳回')
    dialog.show = false
    // 处理完刷新：这条会从当前页签消失（待审核 → 已通过/已驳回），三个角标也跟着变。
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '处理失败')
  } finally {
    reviewing.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="身份审核" subtitle="名单里查不到学号的人，提交申请后由这里人工放行">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <NAlert type="info" :bordered="false" class="mb-4" :show-icon="true">
      通过只给「可以用这个学号注册」的资格，账号仍由本人注册；
      这里不设密码、不自动建号。一个学号一条记录，处理过可以改判。
    </NAlert>

    <NTabs v-model:value="status" type="line" animated @update:value="load()">
      <NTabPane v-for="tab in STATUS_TABS" :key="tab.key" :name="tab.key">
        <template #tab>
          <span class="inline-flex items-center gap-1.5">
            {{ tab.label }}
            <span
              class="px-1.5 py-px text-2xs font-bold"
              :style="{
                // 计数为 0 时刻意弱化（标签名本身已经说明了这一栏是什么），走四级文字色。
                // 原先的 var(--ink-4) 不存在，静默失效 —— 0 会显示成和计数非 0 一样的颜色。
                color: counts[tab.key] ? STATUS_META[tab.key].color : 'var(--text-quaternary)',
                backgroundColor: counts[tab.key] ? STATUS_META[tab.key].bg : 'transparent',
              }"
            >
              {{ counts[tab.key] }}
            </span>
          </span>
        </template>

        <div v-if="loading && !list.length" class="flex flex-col gap-2">
          <NSkeleton v-for="index in 3" :key="index" height="104px" :sharp="false" />
        </div>

        <div v-else-if="!list.length" class="panel flex flex-col items-center gap-3 py-12">
          <EmptyState code="00 / NO REQUEST" :title="emptyHint" hint="学生提交审核申请后会出现在这里" />
        </div>

        <ul v-else class="flex flex-col gap-3">
          <li v-for="item in list" :key="item.id" class="panel p-4">
            <div class="flex flex-wrap items-start justify-between gap-3">
              <div class="min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-heading text-lg font-bold">{{ item.real_name }}</span>
                  <span class="font-mono text-sm text-ink-3">{{ item.student_id }}</span>
                  <span
                    class="px-2 py-0.5 text-xs font-bold"
                    :style="{
                      color: STATUS_META[item.status].color,
                      backgroundColor: STATUS_META[item.status].bg,
                    }"
                  >
                    {{ item.status_label ?? STATUS_META[item.status].label }}
                  </span>
                  <span v-if="item.reviewer_nickname" class="tech-label text-ink-3 tech-label--cn text-xs">
                    由 {{ item.reviewer_nickname }} 处理
                  </span>
                  <span v-else class="tech-label text-ink-3 text-2xs">#{{ item.id }}</span>
                </div>

                <p class="mt-2 text-xs text-ink-3">
                  {{ CONTACT_LABELS[item.contact_type] }}：
                  <span class="font-mono">{{ item.contact }}</span>
                </p>
                <p class="mt-1 text-xs text-ink-3">提交于 {{ fullTime(item.create_time) }}</p>
              </div>

              <div class="flex shrink-0 items-center gap-2">
                <template v-if="item.status === 'pending'">
                  <NButton
                    size="small"
                    type="primary"
                    class="!font-bold"
                    @click="openDialog(item, 'approve')"
                  >
                    <template #icon><Check :size="14" /></template>
                    通过
                  </NButton>
                  <NButton size="small" quaternary @click="openDialog(item, 'reject')">
                    <template #icon><X :size="14" /></template>
                    驳回
                  </NButton>
                </template>
                <NButton
                  v-else
                  size="small"
                  quaternary
                  @click="openDialog(item, item.status === 'approved' ? 'reject' : 'approve')"
                >
                  <template #icon><Undo2 :size="14" /></template>
                  改判为{{ item.status === 'approved' ? '驳回' : '通过' }}
                </NButton>
              </div>
            </div>

            <div v-if="item.note" class="mt-3 border-l-2 pl-3 text-sm leading-6" style="border-color: var(--border)">
              <div class="tech-label mb-1 text-ink-3 tech-label--cn text-xs">申请人说明</div>
              <p class="whitespace-pre-wrap break-words">{{ item.note }}</p>
            </div>

            <div
              v-if="item.review_note"
              class="mt-3 px-3 py-2 text-sm leading-6"
              :style="{
                backgroundColor: STATUS_META[item.status].bg,
                color: STATUS_META[item.status].color,
              }"
            >
              <span class="tech-label tech-label--cn text-xs">处理备注</span>
              <p class="mt-1 whitespace-pre-wrap break-words">{{ item.review_note }}</p>
              <p v-if="item.review_time" class="mt-1 text-2xs opacity-80">
                {{ fullTime(item.review_time) }}
              </p>
            </div>
          </li>
        </ul>
      </NTabPane>
    </NTabs>

    <NModal
      v-model:show="dialog.show"
      preset="card"
      class="max-w-[480px]"
      :title="dialog.action === 'approve' ? '通过审核申请' : '驳回审核申请'"
      :bordered="false"
      :mask-closable="false"
    >
      <template v-if="dialog.target">
        <p class="mb-3 text-sm leading-6 text-ink-3">
          <span class="font-heading font-bold text-ink">{{ dialog.target.real_name }}</span>
          <span class="mx-1.5 font-mono">{{ dialog.target.student_id }}</span>
          ·
          {{ CONTACT_LABELS[dialog.target.contact_type] }}
          <span class="font-mono">{{ dialog.target.contact }}</span>
        </p>

        <NAlert v-if="dialog.action === 'approve'" type="default" :bordered="false" class="mb-3">
          通过后对方可以用该学号注册。备注可不填，会一并展示给申请人。
        </NAlert>
        <NAlert v-else type="warning" :bordered="false" class="mb-3">
          驳回必须填理由，<strong>申请人看得到</strong>：写清缺什么、去哪补。
          「不符合条件」只会让对方再交一次。
        </NAlert>

        <NInput
          v-model:value="note"
          type="textarea"
          :rows="3"
          :maxlength="REVIEW_MAX"
          show-count
          :placeholder="
            dialog.action === 'approve'
              ? '例：已核对 2025 级新生名单，属实'
              : '例：名单里这个学号对应的是「李四」，请确认是否填错'
          "
        />
      </template>

      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton quaternary @click="dialog.show = false">取消</NButton>
          <NButton
            :type="dialog.action === 'approve' ? 'primary' : 'error'"
            class="!font-bold"
            :loading="reviewing"
            :disabled="!canConfirm"
            @click="confirm"
          >
            <template #icon>
              <component :is="dialog.action === 'approve' ? ClipboardCheck : X" :size="15" />
            </template>
            {{ dialog.action === 'approve' ? '确认通过' : '确认驳回' }}
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
