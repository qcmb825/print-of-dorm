<script setup lang="ts">
/** 打印选项维护：预设打印服务 + 纸张类型。
 *
 *  这两张表合在一页，因为它们是同一个下拉框的两半：学生下单时要么选一项预设
 *  （那就不用传文件），要么传文件并选纸张。分开两页的话，配了预设忘了配纸张
 *  这种错要跨页才能发现。
 *
 *  **权限口径：所有管理员都能进这一页，不是只给默认管理员。**
 *  「楼里现在有哪种纸、预设哪些服务」正是打印员自己最清楚的事，收进超管
 *  只会让这两张表没人维护。后端 routes/order_options.py 里那几个写接口
 *  也因此挂的是 ROLE_ADMIN 而不是 ROLE_SUPER（账号/角色/明文密码才是超管级的）。
 *  列表里那一列 `used_count` 是给删除按钮看的 —— 已经有人用过的预设删掉不算错
 *  （订单里存的是文本快照，学生那单照样显示原话），但删的人该知道这个数。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import { FileStack, Pencil, Plus, Printer, RefreshCw, Trash2 } from '@lucide/vue'
import {
  NButton,
  NFormItem,
  NInput,
  NSkeleton,
  NSwitch,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { staffPrintOptionsApi } from '@/api/endpoints'
import type { PaperType, PrintPreset } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { shortTime } from '@/utils/format'
import { PAPER_NAME_MAX, PAPER_REMARK_MAX, PRESET_CONTENT_MAX } from '@/utils/validators'

const message = useMessage()

const presets = ref<PrintPreset[]>([])
const papers = ref<PaperType[]>([])
const loading = ref(true)
const saving = ref(false)

/** 正在编辑的 id；null 表示「新建」。两张表各一个，互不影响 ——
 *  合成一个的话，编辑预设时去点纸张的编辑按钮会把预设的草稿冲掉。 */
const editingPresetId = ref<number | null>(null)
const editingPaperId = ref<number | null>(null)

const presetForm = reactive({ content: '' })
/** price_delta 是字符串：原样交给后端（与金额同一个规矩，不在前端 Number()）。
 *  空串表示「不填」—— 后端收到空值时会保留原值，不会被当成 0 清掉。 */
const paperForm = reactive({ name: '', remark: '', price_delta: '' })

const canSubmitPreset = computed(
  () => presetForm.content.trim().length > 0 && !saving.value,
)
const canSubmitPaper = computed(() => paperForm.name.trim().length > 0 && !saving.value)

function resetPresetForm(): void {
  editingPresetId.value = null
  presetForm.content = ''
}

function resetPaperForm(): void {
  editingPaperId.value = null
  paperForm.name = ''
  paperForm.remark = ''
  paperForm.price_delta = ''
}

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    // 两个请求并发，但**分别**回落：一边挂了不该让另一边也空着。
    // 合成一个 Promise.all 的话，纸张接口 500 会把预设列表一起吞掉，
    // 页面看起来像「什么都没配过」。
    const [presetResult, paperResult] = await Promise.allSettled([
      staffPrintOptionsApi.presets(),
      staffPrintOptionsApi.papers(),
    ])
    if (presetResult.status === 'fulfilled') presets.value = presetResult.value.presets ?? []
    else message.error(presetResult.reason instanceof ApiError ? presetResult.reason.message : '加载预设失败')
    if (paperResult.status === 'fulfilled') papers.value = paperResult.value.paper_types ?? []
    else message.error(paperResult.reason instanceof ApiError ? paperResult.reason.message : '加载纸张失败')
  } finally {
    loading.value = false
  }
}

async function submitPreset(): Promise<void> {
  if (!canSubmitPreset.value) return
  saving.value = true
  const content = presetForm.content.trim()
  try {
    if (editingPresetId.value === null) {
      await staffPrintOptionsApi.createPreset(content)
      message.success('预设打印服务已新建')
    } else {
      await staffPrintOptionsApi.updatePreset(editingPresetId.value, content)
      message.success('预设打印服务已更新')
    }
    resetPresetForm()
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '保存失败')
  } finally {
    saving.value = false
  }
}

async function submitPaper(): Promise<void> {
  if (!canSubmitPaper.value) return
  saving.value = true
  // remark 允许为空，空就是空 —— 不填一个占位字符串，"没有备注"和
  // "备注写着「无」"在列表里必须能分开。
  const payload = {
    name: paperForm.name.trim(),
    remark: paperForm.remark.trim(),
    // 每页加价：空串**照样传**（后端把空值当「没填」处理、保留原值）。
    // 传 undefined 也行，但显式一个键更好读 —— 两种都不会把 0.30 悄悄清成 0。
    price_delta: paperForm.price_delta.trim(),
  }
  try {
    if (editingPaperId.value === null) {
      await staffPrintOptionsApi.createPaper(payload)
      message.success('纸张类型已新建')
    } else {
      await staffPrintOptionsApi.updatePaper(editingPaperId.value, payload)
      message.success('纸张类型已更新')
    }
    resetPaperForm()
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '保存失败')
  } finally {
    saving.value = false
  }
}

function startEditPreset(item: PrintPreset): void {
  editingPresetId.value = item.id
  presetForm.content = item.content
}

function startEditPaper(item: PaperType): void {
  editingPaperId.value = item.id
  paperForm.name = item.name
  paperForm.remark = item.remark ?? ''
  // 0 显示成空（不是 '0.00'）：加价 0 是绝大多数纸的情况，
  // 每张纸都顶着一个 '0.00' 只会让人以为那是个要填的字段。
  paperForm.price_delta = item.price_delta ? item.price_delta.toFixed(2) : ''
}

async function togglePresetActive(item: PrintPreset): Promise<void> {
  const next = item.is_active !== 1
  try {
    await staffPrintOptionsApi.setPresetActive(item.id, next)
    message.success(next ? '预设已启用' : '预设已停用')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '操作失败')
  }
}

async function togglePaperActive(item: PaperType): Promise<void> {
  const next = item.is_active !== 1
  try {
    await staffPrintOptionsApi.setPaperActive(item.id, next)
    message.success(next ? '纸张已启用' : '纸张已停用')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '操作失败')
  }
}

async function removePreset(item: PrintPreset): Promise<void> {
  const used = item.used_count ?? 0
  const ok = await confirmAction({
    title: '删除预设打印服务',
    content: used
      ? `已被 ${used} 个订单用过。删除后学生不能再选它；那些订单里记着的文字不受影响。`
      : '删除后不可恢复。',
    positiveText: '删除',
  })
  if (!ok) return
  try {
    await staffPrintOptionsApi.removePreset(item.id)
    message.success('预设已删除')
    if (editingPresetId.value === item.id) resetPresetForm()
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除失败')
  }
}

async function removePaper(item: PaperType): Promise<void> {
  const used = item.used_count ?? 0
  const ok = await confirmAction({
    title: '删除纸张类型',
    content: used
      ? `已被 ${used} 个订单用过。删除后学生不能再选它；那些订单里记着的名字不受影响。`
      : '删除后不可恢复。',
    positiveText: '删除',
  })
  if (!ok) return
  try {
    await staffPrintOptionsApi.removePaper(item.id)
    message.success('纸张已删除')
    if (editingPaperId.value === item.id) resetPaperForm()
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除失败')
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader
      title="打印选项"
      subtitle="预设打印服务与纸张类型在这里维护，学生下单时可选。停用只对新订单生效，旧订单记录不变。"
    >
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 lg:grid-cols-2">
      <!-- ============ 预设打印服务 ============ -->
      <section class="flex min-w-0 flex-col gap-4">
        <div class="panel p-4">
          <h3 class="mb-3 flex items-center gap-2 font-heading text-base font-bold">
            <component
              :is="editingPresetId === null ? Plus : Pencil"
              :size="15"
              style="color: var(--accent-text)"
            />
            {{ editingPresetId === null ? '新建预设打印服务' : `编辑预设 #${editingPresetId}` }}
          </h3>

          <NFormItem label="服务说明" :show-feedback="false">
            <NInput
              v-model:value="presetForm.content"
              type="textarea"
              :maxlength="PRESET_CONTENT_MAX"
              show-count
              :autosize="{ minRows: 3, maxRows: 6 }"
              placeholder="例：A4 黑白双面，装订成册，次日中午前可取"
            />
          </NFormItem>
          <p class="mb-3 text-xs text-ink-3">
            预设只有这一句话，没有名字。
            这句话会原样显示给学生，也会被订单存下来。
          </p>

          <div class="flex items-center gap-2">
            <NButton
              type="primary"
              class="!font-bold"
              :loading="saving"
              :disabled="!canSubmitPreset"
              @click="submitPreset"
            >
              <template #icon><Printer :size="15" /></template>
              {{ editingPresetId === null ? '新建预设' : '保存修改' }}
            </NButton>
            <NButton v-if="editingPresetId !== null" quaternary @click="resetPresetForm">
              取消编辑
            </NButton>
          </div>
        </div>

        <div>
          <h3 class="mb-3 font-heading text-base font-bold">
            预设列表
            <span class="tech-label ml-2 text-ink-3 tech-label--cn text-xs">{{ presets.length }} 项</span>
          </h3>

          <div v-if="loading && !presets.length" class="flex flex-col gap-2">
            <NSkeleton v-for="index in 2" :key="index" height="88px" :sharp="false" />
          </div>

          <div v-else-if="!presets.length" class="panel grid place-items-center py-10">
            <EmptyState code="00 / NO PRESET" title="还没有配置预设打印服务" hint="左侧新建一条，学生端就能选到">
              <template #icon><Printer :size="26" /></template>
            </EmptyState>
          </div>

          <TransitionGroup
            v-else
            tag="ul"
            class="flex list-none flex-col gap-3 p-0"
            enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
            enter-from-class="opacity-0 translate-x-1"
            leave-active-class="transition duration-[var(--motion-dur-fast)] ease-out"
            leave-to-class="opacity-0"
            move-class="transition duration-[var(--motion-dur-base)] ease-out"
          >
            <li
              v-for="item in presets"
              :key="item.id"
              class="panel p-3.5"
              :class="item.is_active === 1 && 'border-[var(--accent-tint-border)]'"
            >
              <div class="flex items-start justify-between gap-3">
                <p class="min-w-0 flex-1 text-sm leading-relaxed whitespace-pre-wrap">
                  {{ item.content }}
                </p>
                <NSwitch :round="false"
                  :value="item.is_active === 1"
                  size="small"
                  @update:value="togglePresetActive(item)"
                />
              </div>
              <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  class="tech-label px-2 py-0.5 tech-label--cn text-xs"
                  :style="
                    item.is_active === 1
                      ? { backgroundColor: 'var(--status-ready-bg)', color: 'var(--status-ready)' }
                      : { backgroundColor: 'var(--muted)', color: 'var(--text-quaternary)' }
                  "
                >
                  {{ item.is_active === 1 ? '启用中' : '已停用' }}
                </span>
                <span class="text-xs text-ink-3">
                  #{{ item.id }} · {{ item.author ?? '系统' }} ·
                  {{ shortTime(item.update_time) }}
                </span>
              </div>

              <div
                class="mt-3 flex items-center gap-1.5 border-t pt-2.5"
                style="border-color: var(--border)"
              >
                <NButton size="tiny" quaternary @click="startEditPreset(item)">
                  <template #icon><Pencil :size="12" /></template>
                  编辑
                </NButton>
                <!-- 用过多少单要写在删除按钮旁边，而不是藏进二次确认里：
                     点了删除才知道「这玩意儿有 87 单在用」，后退一步很尴尬。 -->
                <span class="text-xs text-ink-3">
                  {{ item.used_count ? `已被 ${item.used_count} 单使用` : '还没有人用过' }}
                </span>
                <NButton size="tiny" quaternary class="ml-auto" @click="removePreset(item)">
                  <template #icon><Trash2 :size="12" /></template>
                  删除
                </NButton>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </section>

      <!-- ============ 纸张类型 ============ -->
      <!-- 分栏线：两块并排时只靠间隙分不出"这是一栏还是两块"。 -->
      <section class="flex min-w-0 flex-col gap-4 lg:border-l lg:border-[var(--border)] lg:pl-4">
        <div class="panel p-4">
          <h3 class="mb-3 flex items-center gap-2 font-heading text-base font-bold">
            <component
              :is="editingPaperId === null ? Plus : Pencil"
              :size="15"
              style="color: var(--accent-text)"
            />
            {{ editingPaperId === null ? '新增纸张类型' : `编辑纸张 #${editingPaperId}` }}
          </h3>

          <NFormItem label="纸张名称" :show-feedback="false">
            <NInput
              v-model:value="paperForm.name"
              :maxlength="PAPER_NAME_MAX"
              show-count
              placeholder="例：A4 / B5 / 铜版纸"
            />
          </NFormItem>
          <NFormItem label="备注（可选）" :show-feedback="false">
            <NInput
              v-model:value="paperForm.remark"
              :maxlength="PAPER_REMARK_MAX"
              show-count
              placeholder="例：80g，只有二楼那台机能出"
            />
          </NFormItem>
          <NFormItem label="每页加价（元/页，可选）" :show-feedback="false">
            <NInput
              v-model:value="paperForm.price_delta"
              placeholder="留空 = 不加价，例：A3 填 0.30"
            />
          </NFormItem>
          <p class="mb-3 text-xs text-ink-3">
            备注是给打印的人看的（哪台机器、多少克重）；学生端只在名称后面带一句。
            不选纸张也能下单。
            加价只影响<strong>预估价</strong>（A3 比 A4 贵就填在这里，
            可以留空、可以填 0，不能填负数）—— 系数与公式在「计价规则」页。
          </p>

          <div class="flex items-center gap-2">
            <NButton
              type="primary"
              class="!font-bold"
              :loading="saving"
              :disabled="!canSubmitPaper"
              @click="submitPaper"
            >
              <template #icon><FileStack :size="15" /></template>
              {{ editingPaperId === null ? '新增纸张' : '保存修改' }}
            </NButton>
            <NButton v-if="editingPaperId !== null" quaternary @click="resetPaperForm">
              取消编辑
            </NButton>
          </div>
        </div>

        <div>
          <h3 class="mb-3 font-heading text-base font-bold">
            纸张列表
            <span class="tech-label ml-2 text-ink-3 tech-label--cn text-xs">{{ papers.length }} 种</span>
          </h3>

          <div v-if="loading && !papers.length" class="flex flex-col gap-2">
            <NSkeleton v-for="index in 2" :key="index" height="88px" :sharp="false" />
          </div>

          <div v-else-if="!papers.length" class="panel grid place-items-center py-10">
            <EmptyState code="00 / NO PAPER" title="还没有配置纸张类型" hint="左侧新建一条，订单里的「纸张」才有得选">
              <template #icon><FileStack :size="26" /></template>
            </EmptyState>
          </div>

          <TransitionGroup
            v-else
            tag="ul"
            class="flex list-none flex-col gap-3 p-0"
            enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
            enter-from-class="opacity-0 translate-x-1"
            leave-active-class="transition duration-[var(--motion-dur-fast)] ease-out"
            leave-to-class="opacity-0"
            move-class="transition duration-[var(--motion-dur-base)] ease-out"
          >
            <li
              v-for="item in papers"
              :key="item.id"
              class="panel p-3.5"
              :class="item.is_active === 1 && 'border-[var(--accent-tint-border)]'"
            >
              <div class="flex items-start justify-between gap-3">
                <div class="min-w-0 flex-1">
                  <p class="text-sm font-semibold">{{ item.name }}</p>
                  <!-- 备注为空时什么都不画。写「无备注」会让列表里多出一行噪音，
                       而且和真的备注写着「无」分不开。 -->
                  <p v-if="item.remark" class="mt-0.5 text-xs text-ink-3">
                    {{ item.remark }}
                  </p>
                </div>
                <NSwitch :round="false"
                  :value="item.is_active === 1"
                  size="small"
                  @update:value="togglePaperActive(item)"
                />
              </div>
              <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  class="tech-label px-2 py-0.5 tech-label--cn text-xs"
                  :style="
                    item.is_active === 1
                      ? { backgroundColor: 'var(--status-ready-bg)', color: 'var(--status-ready)' }
                      : { backgroundColor: 'var(--muted)', color: 'var(--text-quaternary)' }
                  "
                >
                  {{ item.is_active === 1 ? '启用中' : '已停用' }}
                </span>
                <span class="text-xs text-ink-3">
                  #{{ item.id }} · {{ item.author ?? '系统' }} ·
                  {{ shortTime(item.update_time) }}
                </span>
              </div>

              <div
                class="mt-3 flex items-center gap-1.5 border-t pt-2.5"
                style="border-color: var(--border)"
              >
                <NButton size="tiny" quaternary @click="startEditPaper(item)">
                  <template #icon><Pencil :size="12" /></template>
                  编辑
                </NButton>
                <span class="text-xs text-ink-3">
                  {{ item.used_count ? `已被 ${item.used_count} 单使用` : '还没有人用过' }}
                </span>
                <NButton size="tiny" quaternary class="ml-auto" @click="removePaper(item)">
                  <template #icon><Trash2 :size="12" /></template>
                  删除
                </NButton>
              </div>
            </li>
          </TransitionGroup>
        </div>
      </section>
    </div>
  </div>
</template>
