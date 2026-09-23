<script setup lang="ts">
/** 打印选项维护：预设打印服务。
 *
 *  ⚠️ **v20 起这一页只剩预设了**：纸张并进了「价目表」（一条 = 纸张 + 类型 +
 *  单面/双面单价），维护入口在 /staff/pricing。右边那一栏现在只是一句指路，
 *  底层 paper_types 表与它的接口都还在（老订单指着它），但没有维护入口了 ——
 *  理由见那段模板注释。
 *
 *  **v22 起预设不只是一段文本了**（见 routes/order_options.py 开头那段）：
 *  一条服务还可以绑一档价目项（用什么纸、什么工艺）、定一个价（元/份）、
 *  带一份**学生能在网页里直接看**的文档。三样都是选填 ——
 *  老预设那种「只有一句话」的形态照旧能用。
 *
 *  **权限口径：所有管理员都能进这一页，不是只给默认管理员。**
 *  「楼里现在有哪种纸、预设哪些服务」正是打印员自己最清楚的事，收进超管
 *  只会让这两张表没人维护。后端 routes/order_options.py 里那几个写接口
 *  也因此挂的是 ROLE_ADMIN 而不是 ROLE_SUPER（账号/角色/明文密码才是超管级的）。
 *  列表里那一列 `used_count` 是给删除按钮看的 —— 已经有人用过的预设删掉不算错
 *  （订单里存的是文本快照，学生那单照样显示原话），但删的人该知道这个数。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import {
  Eye,
  FileText,
  Pencil,
  Plus,
  Printer,
  ReceiptText,
  RefreshCw,
  Trash2,
  Upload,
} from '@lucide/vue'
import {
  NButton,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { printOptionsApi, staffPrintOptionsApi } from '@/api/endpoints'
import type { PresetInput, PriceItem, PrintPreset } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import PresetDocViewer from '@/components/PresetDocViewer.vue'
import { confirmAction } from '@/composables/feedback'
import { shortTime } from '@/utils/format'
import { PRESET_CONTENT_MAX } from '@/utils/validators'

const message = useMessage()

const presets = ref<PrintPreset[]>([])
/** 启用中的价目项 —— 预设只能绑这些（绑一档停用的纸，学生下单时那档根本不在清单里）。 */
const priceItems = ref<PriceItem[]>([])
const loading = ref(true)
const saving = ref(false)

/** 正在编辑的 id；null 表示「新建」。 */
const editingPresetId = ref<number | null>(null)

/** 表单里的金额是**字符串**：后端的金额一律按十进制正则校验，
 *  在前端先 Number() 转一遍就等于把浮点误差放进来（详见 utils.parse_price）。 */
const presetForm = reactive({
  content: '',
  priceItemId: null as number | null,
  presetPrice: '',
})

const canSubmitPreset = computed(
  () => presetForm.content.trim().length > 0 && !saving.value,
)

const priceItemOptions = computed(() =>
  priceItems.value.map((item) => ({
    label: `${item.paper} · ${item.kind}`,
    value: item.id,
  })),
)

function resetPresetForm(): void {
  editingPresetId.value = null
  presetForm.content = ''
  presetForm.priceItemId = null
  presetForm.presetPrice = ''
}

function startEditPreset(item: PrintPreset): void {
  editingPresetId.value = item.id
  presetForm.content = item.content
  presetForm.priceItemId = item.price_item_id ?? null
  presetForm.presetPrice = item.preset_price === null || item.preset_price === undefined
    ? ''
    : String(item.preset_price)
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
  const extra = item.has_doc ? '附带的那份文档也会一并删除。' : ''
  const ok = await confirmAction({
    title: '删除预设',
    content: used
      ? `已有 ${used} 笔订单用过它。订单里存的是下单当时的正文快照，删除不影响那些单的显示，只是之后「当初是哪一条」就只剩那句话可查。${extra}`
      : `尚无订单用过它。删除后这条服务不再出现在下单页。${extra}`,
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
    const [data, options] = await Promise.all([
      staffPrintOptionsApi.presets(),
      printOptionsApi.load(),
    ])
    presets.value = data.presets ?? []
    priceItems.value = options.price_items ?? []
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '预设读取失败')
  } finally {
    loading.value = false
  }
}

async function submitPreset(): Promise<void> {
  if (!canSubmitPreset.value) return
  saving.value = true
  const price = presetForm.presetPrice.trim()
  const payload: PresetInput = {
    content: presetForm.content.trim(),
    price_item_id: presetForm.priceItemId,
    // 空 = 不定价（后端把它存成 NULL，退回按文档页数估）。
    // **不要**把它变成 '0'：0 元是一个明确的定价，和「没定价」是两回事。
    preset_price: price === '' ? null : price,
  }
  try {
    if (editingPresetId.value === null) {
      await staffPrintOptionsApi.createPreset(payload)
      message.success('预设打印服务已新建')
    } else {
      await staffPrintOptionsApi.updatePreset(editingPresetId.value, payload)
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

/* ---------- 附带文档 ---------- */

/** 预览弹窗要显示哪一条预设（null = 不显示）。 */
const docPreview = ref<PrintPreset | null>(null)
/** 预览组件的重挂计数器：换一条预设、或换过文档之后必须重挂 ——
 *  否则它会把上一条的 canvas 留在屏幕上（组件内部只在 presetId 变化时重载，
 *  而 PDF 的渲染结果是画在 canvas 上的，不重挂就还是上一份的内容）。 */
const docVersion = ref(1)
const docInput = ref<HTMLInputElement | null>(null)
/** 正在传文档的那条预设 id（null = 没有在传）。 */
const docUploadingFor = ref<number | null>(null)

function pickPresetDoc(item: PrintPreset): void {
  if (editingPresetId.value !== item.id) {
    //    文档只能挂在**已经存在**的预设上（后端那条接口是按 id 走的）。
    //    所以先把这条载进表单 —— 否则管理员点了「传文档」却发现改的是另一条，
    //    而文件挂到了别人头上。
    startEditPreset(item)
  }
  docInput.value?.click()
}

/** 表单区那颗按钮：给「当前正在编辑的那一条」传文档。
 *  没在编辑任何一条时它是灰的（新建的预设还没有 id，文件无处可挂）。 */
function pickDocForEditing(): void {
  if (editingPresetId.value === null) return
  docInput.value?.click()
}


async function onPresetDocPicked(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''                       // 让同一个文件能再选一次
  const presetId = editingPresetId.value
  if (!file || presetId === null) return
  docUploadingFor.value = presetId
  try {
    await staffPrintOptionsApi.uploadPresetDoc(presetId, file)
    message.success(`文档已上传 · ${file.name}`)
    docVersion.value += 1
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '文档上传未生效')
  } finally {
    docUploadingFor.value = null
  }
}

async function removePresetDoc(item: PrintPreset): Promise<void> {
  const ok = await confirmAction({
    title: '撤下文档',
    content: `《${item.doc_name ?? '这份文档'}》将不再出现在学生端。这条服务本身保留。`,
    positiveText: '撤下',
    negativeText: '取消',
  })
  if (!ok) return
  try {
    await staffPrintOptionsApi.removePresetDoc(item.id)
    message.success('文档已撤下')
    docVersion.value += 1
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '撤下未生效')
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader
      title="打印选项"
      subtitle="预设打印服务：学生下单时可选 · 可绑价目表里的档位与定价 · 可附一份学生在线看的文档 · 停用只对新订单生效"
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

          <!-- 下面三项都是 v22 加的，全都选填：只填一句话的老预设照旧能用。
               绑了纸与价之后，学生下单时就不用再选一遍 —— 也就不会出现
               「服务写着胶装、纸却选了相纸」这种自相矛盾的组合。 -->
          <div class="grid gap-3 sm:grid-cols-2">
            <NFormItem label="绑定类型 / 纸张（选填）" :show-feedback="false" class="!mb-0">
              <NSelect
                v-model:value="presetForm.priceItemId"
                :options="priceItemOptions"
                clearable
                placeholder="不绑则由学生自己选"
                class="w-full"
              />
            </NFormItem>
            <NFormItem label="本服务定价（元/份，选填）" :show-feedback="false" class="!mb-0">
              <NInput
                v-model:value="presetForm.presetPrice"
                placeholder="留空 = 按文档页数估"
              />
            </NFormItem>
          </div>
          <p class="mb-3 text-xs leading-5 text-ink-3">
            绑了纸：学生下单时不再选类型，这一档以你选的为准（它停用后本条服务仍可用）。
            定了价：预估按「定价 × 份数」算 —— 它只是给学生看的参考，
            最终金额还是你在订单台上确认的那个数。
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

          <!-- 附带文档只能挂在**已经存在**的预设上（那条接口按 id 走）。
               没在编辑任何一条时按钮置灰并说明原因 —— 让学生点进去才发现不行更费事。 -->
          <div
            class="mt-3 flex flex-wrap items-center gap-2 border-t pt-3"
            style="border-color: var(--border)"
          >
            <input
              ref="docInput"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              class="hidden"
              @change="onPresetDocPicked"
            />
            <NButton
              size="small"
              :disabled="editingPresetId === null || docUploadingFor !== null"
              :loading="docUploadingFor !== null"
              :title="editingPresetId === null ? '先选一条预设（或建好之后再传）' : undefined"
              @click="pickDocForEditing"
            >
              <template #icon><Upload :size="14" /></template>
              上传附带文档
            </NButton>
            <span class="text-xs text-ink-3">
              PDF / JPG / PNG · 学生只能在线看，不提供下载 ·
              Word 请先导出成 PDF（浏览器渲染不出 Word 的版式）
            </span>
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
              <!-- v22 的三样：绑的纸、定的价、附带的文档。都用「没有就明说」的写法 ——
                   留空一片的话，管理员分不清是「没设」还是「页面没显示出来」。 -->
              <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <span class="flex items-center gap-1 text-ink-3">
                  <ReceiptText :size="12" aria-hidden="true" />
                  <template v-if="item.price_item_label">
                    {{ item.price_item_label }}
                    <!-- 绑的那一档被停用了：名字照给（老订单、这条服务都还指着它），
                         但要说一句 —— 否则管理员会以为学生还能选到那一档。 -->
                    <span v-if="item.price_item_stopped" style="color: var(--warn)">
                      · 该档已停用
                    </span>
                  </template>
                  <template v-else>未绑定档位</template>
                </span>
                <span class="tnum flex items-center gap-1 text-ink-3">
                  <template v-if="item.preset_price !== null && item.preset_price !== undefined">
                    定价 ¥{{ item.preset_price.toFixed(2) }} / 份
                  </template>
                  <template v-else>未定价 · 按文档页数估</template>
                </span>
                <span class="flex items-center gap-1 text-ink-3">
                  <FileText :size="12" aria-hidden="true" />
                  <template v-if="item.has_doc">
                    {{ item.doc_name }}
                  </template>
                  <template v-else>无附带文档</template>
                </span>
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
                class="mt-3 flex flex-wrap items-center gap-1.5 border-t pt-2.5"
                style="border-color: var(--border)"
              >
                <NButton size="tiny" quaternary @click="startEditPreset(item)">
                  <template #icon><Pencil :size="12" /></template>
                  编辑
                </NButton>
                <NButton v-if="item.has_doc" size="tiny" quaternary @click="docPreview = item">
                  <template #icon><Eye :size="12" /></template>
                  预览文档
                </NButton>
                <NButton
                  size="tiny"
                  quaternary
                  :loading="docUploadingFor === item.id"
                  @click="pickPresetDoc(item)"
                >
                  <template #icon><Upload :size="12" /></template>
                  {{ item.has_doc ? '换文档' : '传文档' }}
                </NButton>
                <NButton v-if="item.has_doc" size="tiny" quaternary @click="removePresetDoc(item)">
                  <template #icon><Trash2 :size="12" /></template>
                  撤下文档
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

        <div class="panel p-4">
          <h3 class="mb-2 flex items-center gap-2 font-heading text-base font-bold">
            <FileText :size="15" style="color: var(--accent-text)" />
            预设的附带文档
          </h3>
          <p class="text-sm leading-6 text-ink-2">
            一条服务可以带一份「标准文档」（模板、样张），学生在下单页点开就能看，
            <strong>只能在线看</strong> —— 界面里没有下载入口。
          </p>
          <p class="mt-2 text-xs leading-5 text-ink-3">
            只收 PDF / JPG / PNG：判据是浏览器能不能把它原样渲染出来。
            Word 文档请先导出成 PDF —— 转成文本再预览，学生看到的版式和真正打出来的
            不是一回事，而这一屏的用途恰恰是「看一眼长什么样」。
          </p>
        </div>
      </section>
    </div>

    <!-- 文档预览。管理端先看一眼自己传上去的是什么 —— 学生端看到的是同一份
         （同一个接口、同一个渲染组件），所以这里能过，那边就能过。 -->
    <NModal
      :show="docPreview !== null"
      preset="card"
      :bordered="false"
      class="max-w-[860px]"
      :title="docPreview ? `文档预览 · ${docPreview.doc_name ?? ''}` : '文档预览'"
      @update:show="(value: boolean) => { if (!value) docPreview = null }"
    >
      <!-- :key 带上 docVersion：换过文档之后必须重挂，否则 canvas 上留着的
           还是上一份的内容（组件只在 presetId 变化时重载）。 -->
      <PresetDocViewer
        v-if="docPreview"
        :key="`${docPreview.id}-${docVersion}`"
        :preset-id="docPreview.id"
        :doc-name="docPreview.doc_name ?? null"
        :width="760"
      />
    </NModal>
  </div>
</template>
