<script setup lang="ts">
/** 打印选项维护：预设打印服务。
 *
 *  ⚠️ **v20 起这一页只剩预设了**：纸张并进了「价目表」（一条 = 纸张 + 类型 +
 *  单面/双面单价），维护入口在 /staff/pricing。右边那一栏现在只是一句指路，
 *  底层 paper_types 表与它的接口都还在（老订单指着它），但没有维护入口了 ——
 *  理由见那段模板注释。
 *
 *  **权限口径：所有管理员都能进这一页，不是只给默认管理员。**
 *  「楼里现在有哪种纸、预设哪些服务」正是打印员自己最清楚的事，收进超管
 *  只会让这两张表没人维护。后端 routes/order_options.py 里那几个写接口
 *  也因此挂的是 ROLE_ADMIN 而不是 ROLE_SUPER（账号/角色/明文密码才是超管级的）。
 *  列表里那一列 `used_count` 是给删除按钮看的 —— 已经有人用过的预设删掉不算错
 *  （订单里存的是文本快照，学生那单照样显示原话），但删的人该知道这个数。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import { Pencil, Plus, Printer, ReceiptText, RefreshCw, Trash2 } from '@lucide/vue'
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
import type { PrintPreset } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { shortTime } from '@/utils/format'
import { PRESET_CONTENT_MAX } from '@/utils/validators'

const message = useMessage()

const presets = ref<PrintPreset[]>([])
const loading = ref(true)
const saving = ref(false)

/** 正在编辑的 id；null 表示「新建」。 */
const editingPresetId = ref<number | null>(null)
const presetForm = reactive({ content: '' })

const canSubmitPreset = computed(
  () => presetForm.content.trim().length > 0 && !saving.value,
)

function resetPresetForm(): void {
  editingPresetId.value = null
  presetForm.content = ''
}

function startEditPreset(item: PrintPreset): void {
  editingPresetId.value = item.id
  presetForm.content = item.content
}

async function togglePresetActive(item: PrintPreset): Promise<void> {
  const next = item.is_active !== 1
  try {
    await staffPrintOptionsApi.setPresetActive(item.id, next)
    message.success(next ? '预设已启用 · 学生端可选' : '预设已停用 · 学生端不再可选')
    await load(true)
  } catch (error) {
    message.error(
      error instanceof ApiError
        ? error.message
        : next
          ? '启用未完成 · 稍后重试'
          : '停用未完成 · 稍后重试',
    )
  }
}

async function removePreset(item: PrintPreset): Promise<void> {
  const used = item.used_count ?? 0
  const ok = await confirmAction({
    title: '删除预设',
    content: used
      ? `已有 ${used} 笔订单用过它。订单里存的是下单当时的正文快照，删除不影响那些单的显示，只是之后「当初是哪一条」就只剩那句话可查。`
      : '尚无订单用过它。删除后这条服务不再出现在下单页。',
    positiveText: '删除',
    negativeText: '取消',
  })
  if (!ok) return
  try {
    await staffPrintOptionsApi.removePreset(item.id)
    message.success('预设已删除')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除未生效')
  }
}

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await staffPrintOptionsApi.presets()
    presets.value = data.presets ?? []
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '预设读取失败')
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
    message.error(error instanceof ApiError ? error.message : '保存未生效')
  } finally {
    saving.value = false
  }
}
onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader
      title="打印选项"
      subtitle="预设打印服务：学生下单时可选 · 停用只对新订单生效，旧订单记录不变 · 纸张与单价在「价目表」维护"
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
            预设没有名字，只有这一句话：
            它会原样显示给学生，也会随订单存下来。
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
            <EmptyState code="00 / NO PRESET" title="暂无预设打印服务" hint="新建后学生端即可选到">
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
                  {{ item.is_active === 1 ? '已启用' : '已停用' }}
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
                  {{ item.used_count ? `已被 ${item.used_count} 单使用` : '暂无使用记录' }}
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

      <!-- ============ 纸张类型（已并入价目表）============ -->
      <!--
        ⚠️ **这里原先是一整栏纸张类型的维护界面，v20 起撤掉了。**
        纸张不再是一个独立的可选项 —— 它并进了「价目表」：那里的一条 = 纸张 + 类型 +
        单面价 + 双面价，学生下单时直接选那一条（见 routes/price_table.py 开头那段）。

        为什么是撤掉而不是保留：留着它，管理员会在两个地方维护同一种纸
        （这里加一条「A4 230g 哑光铜版纸」、价目表里还要再写一遍），
        而两处迟早对不上 —— 学生下单时看到的是价目表那份，这里加的那条谁也不认识。

        底层那张 paper_types 表**还在**（老订单的 paper_type_id 指着它，
        /api/admin/paper-types 也仍可用）—— 只是不再有维护入口。
      -->
      <section class="flex min-w-0 flex-col gap-4 lg:border-l lg:border-[var(--border)] lg:pl-4">
        <div class="panel p-4">
          <h3 class="mb-2 flex items-center gap-2 font-heading text-base font-bold">
            <ReceiptText :size="15" style="color: var(--accent-text)" />
            纸张与单价都在「价目表」
          </h3>
          <p class="mb-3 text-sm leading-6 text-ink-2">
            一条价目项 = 纸张 + 类型 + 单面价 + 双面价 + 备注，学生下单时选的就是它。
            纸张（A4 70g、6 寸相纸这些）在价目表里与价格一起填，
            不要在此单独维护。
          </p>
          <RouterLink to="/staff/pricing" class="no-underline">
            <NButton size="small" type="primary" class="!font-bold">
              <template #icon><ReceiptText :size="15" /></template>
              维护价目表
            </NButton>
          </RouterLink>
          <p class="mt-3 text-xs text-ink-3">
            历史订单里那句「用什么纸」存的是下单当时的快照，不受这次调整影响。
          </p>
        </div>
      </section>
    </div>
  </div>
</template>
