<script setup lang="ts">
/** 价目表：管理员维护的一张表，学生下单时直接选一条。
 *
 *  ⚠️ **这一页改的东西不是价目表本身，而是「预估价怎么算」。**
 *  预估价出现在学生下单成功时、以及他自己翻订单时（「预估 ¥x.xx，以管理员核定为准」），
 *  目的是让他下单前心里有数 —— 真正的金额永远由接单人在订单台上自己确认
 *  （订单台计费弹窗会拿预估价预填，管理员改不改都算他定的价）。所以：
 *    · 改这里的数**不会**动到任何一笔已经下过的单（est_price 是下单那一刻的快照）；
 *    · 也说不出「系统自动收费」这种话 —— 收钱那一步始终有人在。
 *
 *  一条 = 纸张 + 类型 + 单面价 + 双面价 + 备注。**双面价留空 = 这一档不支持双面**
 *  （相纸那一档就是这样），下单时双面选项会消失，而不是"选了才发现不行"。
 *  颜色单独选一个（黑白/彩色）：订单落库、看板统计、邮件都按这个枚举走，
 *  而「类型」是一句给人看的话（「彩色（全覆盖）照片或证件照」），不能拿它当枚举。
 *
 *  权限：所有管理员可改（后端 routes/price_table.py 是 ROLE_ADMIN 起步）。
 *  价目表正是打印员自己最清楚的东西，收进超管只会让它没人维护。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import { Calculator, Pencil, Plus, ReceiptText, RefreshCw, Save, Trash2 } from '@lucide/vue'
import {
  NAlert,
  NButton,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { priceTableApi } from '@/api/endpoints'
import {
  COLOR_LABELS,
  DUPLEX_LABELS,
  type ColorType,
  type Duplex,
  type PriceItem,
  type PriceItemInput,
} from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { priceLabel } from '@/utils/format'

const message = useMessage()

const items = ref<PriceItem[]>([])
const lines = ref<string[]>([])
const loading = ref(true)
const saving = ref(false)
const loadFailed = ref(false)
const limits = reactive({
  paper_max: 40,
  kind_max: 40,
  note_max: 120,
  notes_max: 2000,
  copies_min: 1,
  copies_max: 50,
})

/* 金额一律**字符串**：原样传给后端，不在前端 Number() 转一道 ——
 * 与订单台的金额、下单页的备注同一个规矩。浮点一转就会出现 0.1+0.2 那种残渣，
 * 而金额上的残渣会一路写进价目表。 */
const form = reactive({
  paper: '',
  kind: '',
  color: 'black' as ColorType,
  price_single: '',
  price_double: '',
  note: '',
  sort_order: 0,
})
const editingId = ref<number | null>(null)
const canSubmit = computed(
  () => form.paper.trim().length > 0 && form.kind.trim().length > 0
    && form.price_single.trim().length > 0 && !saving.value,
)

/** 全局系数与说明 */
const rules = reactive({ enabled: true, base_fee: '0', min_price: '0', notes: '' })

const COLOR_OPTIONS = [
  { label: COLOR_LABELS.black, value: 'black' },
  { label: COLOR_LABELS.color, value: 'color' },
]

/* ---------- 试算 ----------
 *  公式只有一份（服务端 pricing.py），所以试算也**必须走服务端**：
 *  前端再镜像一遍必然漂移，而漂了不报错，只是页面上的数字开始说谎。 */
const preview = reactive({
  pages: 10,
  copies: 1,
  duplex: 'single' as Duplex,
  price_item_id: null as number | null,
})
const previewPrice = ref<number | null>(null)
const previewUnit = ref<number | null>(null)
const previewNote = ref('')
const previewLoading = ref(false)

const previewOptions = computed(() =>
  items.value
    .filter((item) => item.is_active !== 0)
    .map((item) => ({ label: item.label ?? `${item.paper} · ${item.kind}`, value: item.id })),
)

const previewItem = computed(
  () => items.value.find((item) => item.id === preview.price_item_id) ?? null,
)
const previewDuplexAllowed = computed(() => previewItem.value?.price_double !== null)

const duplexOptions = computed(() => [
  { label: DUPLEX_LABELS.single, value: 'single' },
  { label: DUPLEX_LABELS.double, value: 'double', disabled: !previewDuplexAllowed.value },
])

async function runPreview(): Promise<void> {
  if (preview.price_item_id === null) {
    previewPrice.value = null
    previewNote.value = '先选一档'
    return
  }
  previewLoading.value = true
  try {
    const data = await priceTableApi.preview({
      pages: preview.pages,
      copies: preview.copies,
      duplex: preview.duplex,
      price_item_id: preview.price_item_id,
    })
    previewPrice.value = data.price
    previewUnit.value = data.unit_price
    previewNote.value = data.note
  } catch (error) {
    previewPrice.value = null
    previewNote.value = error instanceof ApiError ? error.message : '试算失败'
  } finally {
    previewLoading.value = false
  }
}

/* ---------- 读写 ---------- */
function fillRules(next: {
  enabled: boolean
  base_fee: number
  min_price: number
  notes: string
}): void {
  rules.enabled = next.enabled
  rules.base_fee = next.base_fee.toFixed(2)
  rules.min_price = next.min_price.toFixed(2)
  rules.notes = next.notes ?? ''
}

async function load(): Promise<void> {
  loading.value = true
  try {
    const data = await priceTableApi.load()
    items.value = data.items
    lines.value = data.lines
    Object.assign(limits, data.limits)
    fillRules(data.rules)
    loadFailed.value = false
    if (preview.price_item_id === null && data.items.length) {
      preview.price_item_id = data.items[0].id
      void runPreview()
    }
  } catch (error) {
    loadFailed.value = true
    message.error(error instanceof ApiError ? error.message : '加载价目表失败')
  } finally {
    loading.value = false
  }
}

function resetForm(): void {
  editingId.value = null
  form.paper = ''
  form.kind = ''
  form.color = 'black'
  form.price_single = ''
  form.price_double = ''
  form.note = ''
  form.sort_order = 0
}

function startEdit(item: PriceItem): void {
  editingId.value = item.id
  form.paper = item.paper
  form.kind = item.kind
  form.color = item.color
  form.price_single = item.price_single.toFixed(2)
  form.price_double = item.price_double === null ? '' : item.price_double.toFixed(2)
  form.note = item.note ?? ''
  form.sort_order = item.sort_order ?? 0
}

function payload(): PriceItemInput {
  return {
    paper: form.paper.trim(),
    kind: form.kind.trim(),
    color: form.color,
    price_single: form.price_single.trim(),
    //    空串 = 不支持双面（后端存 NULL）。**不要**在这里填 0 ——
    //    0 元双面会被读成"双面免费"，而"不支持"与"免费"是两件事。
    price_double: form.price_double.trim(),
    note: form.note.trim(),
    sort_order: form.sort_order,
  }
}

async function submitItem(): Promise<void> {
  if (!canSubmit.value) return
  saving.value = true
  try {
    if (editingId.value === null) {
      await priceTableApi.createItem(payload())
      message.success('价目项已新增')
    } else {
      await priceTableApi.updateItem(editingId.value, payload())
      message.success('价目项已更新')
    }
    resetForm()
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '保存失败')
  } finally {
    saving.value = false
  }
}

async function toggleActive(item: PriceItem): Promise<void> {
  const next = item.is_active !== 1
  try {
    await priceTableApi.setItemActive(item.id, next)
    message.success(next ? '已启用' : '已停用')
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '操作失败')
  }
}

async function removeItem(item: PriceItem): Promise<void> {
  const used = item.used_count ?? 0
  const ok = await confirmAction({
    title: '删除这一档？',
    content: used
      ? `已经有 ${used} 笔订单用过它。订单里存的是当时的名字与预估价快照，删掉不影响那些单的显示 —— 但之后「当初按哪一档打的」就只剩那句话可查了。`
      : '还没有订单用过它。删掉之后这一档就从下单菜单里消失。',
    positiveText: '删除',
    negativeText: '再想想',
  })
  if (!ok) return
  try {
    await priceTableApi.removeItem(item.id)
    message.success('已删除')
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除失败')
  }
}

async function saveRules(): Promise<void> {
  saving.value = true
  try {
    const data = await priceTableApi.saveRules({
      enabled: rules.enabled,
      base_fee: rules.base_fee.trim(),
      min_price: rules.min_price.trim(),
      notes: rules.notes.trim(),
    })
    // 用服务端**回显**的值回填：它才是真正落库的那份。被夹过或改过的值留在屏幕上，
    // 下一次刷新会突然变 —— 那种「我没动它它自己变了」最难查。
    fillRules(data.rules)
    lines.value = data.lines
    message.success('计价设置已保存 · 只影响之后下单的预估价')
    await runPreview()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1100px]">
    <PageHeader
      title="价目表"
      subtitle="学生下单时选的档位与单价。估出来的价格只做参考，最终金额永远由接单人在订单台确认。"
    >
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
        <NButton size="small" :loading="saving" :disabled="loading || loadFailed" @click="saveRules()">
          <template #icon><Save :size="15" /></template>
          保存计价设置
        </NButton>
      </template>
    </PageHeader>

    <NAlert v-if="loadFailed" type="warning" class="mb-4" title="价目表没拉到">
      可能是网络或服务器临时的问题 —— 点右上角「刷新」重试。
      拿不到数据时**不要让保存可用**：那会把一份空规则覆盖到线上。
    </NAlert>

    <NSkeleton v-if="loading" text :repeat="8" class="panel p-4" />

    <template v-else-if="!loadFailed">
      <!-- 公式与全局系数 -->
      <section class="panel mb-4 p-4">
        <h3 class="mb-2 flex items-center gap-2 font-heading text-base font-bold">
          <Calculator :size="15" style="color: var(--accent-text)" />
          公式与全局设置
        </h3>
        <p class="text-sm leading-6 text-ink-2">
          预估价 = 每单基础费 + 页数 × 份数 × 该档单价，再取「最低消费」与它的较大值。
        </p>
        <ul class="mt-2 flex list-none flex-col gap-1 p-0 text-xs text-ink-3">
          <li v-for="line in lines" :key="line">{{ line }}</li>
        </ul>

        <div class="mt-3 flex flex-wrap items-end gap-3">
          <label class="flex cursor-pointer items-center gap-2 pb-2 text-sm">
            <NSwitch v-model:value="rules.enabled" size="small" />
            <span :style="{ color: rules.enabled ? undefined : 'var(--text-tertiary)' }">
              {{ rules.enabled ? '已启用自动估价' : '已关闭（订单不再显示预估价）' }}
            </span>
          </label>
          <NFormItem label="每单基础费（元）" :show-feedback="false" class="!mb-0 !w-[180px]">
            <NInput v-model:value="rules.base_fee" placeholder="例 0">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem label="最低消费（元）" :show-feedback="false" class="!mb-0 !w-[180px]">
            <NInput v-model:value="rules.min_price" placeholder="例 0">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
        </div>
      </section>

      <!-- 价目项：新建 / 编辑 -->
      <section class="panel mb-4 p-4">
        <h3 class="mb-3 flex items-center gap-2 font-heading text-base font-bold">
          <component
            :is="editingId === null ? Plus : Pencil"
            :size="15"
            style="color: var(--accent-text)"
          />
          {{ editingId === null ? '新增一档' : `编辑第 ${editingId} 档` }}
        </h3>
        <div class="grid gap-3 sm:grid-cols-2">
          <NFormItem label="纸张" :show-feedback="false" class="!mb-0">
            <NInput
              v-model:value="form.paper"
              :maxlength="limits.paper_max"
              placeholder="例：A4 70g / 6寸 230g 高级高光相纸"
            />
          </NFormItem>
          <NFormItem label="类型" :show-feedback="false" class="!mb-0">
            <NInput
              v-model:value="form.kind"
              :maxlength="limits.kind_max"
              placeholder="例：黑白 / 彩色（普通）/ 彩色（全覆盖）"
            />
          </NFormItem>
          <NFormItem label="颜色（落库与统计用）" :show-feedback="false" class="!mb-0">
            <NSelect v-model:value="form.color" :options="COLOR_OPTIONS" />
          </NFormItem>
          <NFormItem label="排序（小的在前）" :show-feedback="false" class="!mb-0">
            <NInputNumber v-model:value="form.sort_order" :min="0" :precision="0" class="w-full" />
          </NFormItem>
          <NFormItem label="单面价（元/张）" :show-feedback="false" class="!mb-0">
            <NInput v-model:value="form.price_single" placeholder="例 0.09">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem label="双面价（元/张，留空 = 不支持双面）" :show-feedback="false" class="!mb-0">
            <NInput v-model:value="form.price_double" placeholder="留空表示这一档不能双面">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem
            label="备注（可选，学生与打印员都会看到）"
            :show-feedback="false"
            class="!mb-0 sm:col-span-2"
          >
            <NInput
              v-model:value="form.note"
              :maxlength="limits.note_max"
              placeholder="例：塑封 +2.61 · 量大价优"
            />
          </NFormItem>
        </div>
        <p class="mt-2 text-xs text-ink-3">
          最多两位小数。<strong>双面价留空 = 这一档不支持双面</strong>（相纸那一档就是），
          下单时双面选项会直接消失 —— 不要为了"看起来完整"填 0，那会被读成双面免费。
        </p>
        <div class="mt-3 flex items-center gap-2">
          <NButton
            type="primary"
            class="!font-bold"
            :loading="saving"
            :disabled="!canSubmit"
            @click="submitItem"
          >
            <template #icon><ReceiptText :size="15" /></template>
            {{ editingId === null ? '新增这一档' : '保存修改' }}
          </NButton>
          <NButton v-if="editingId !== null" quaternary @click="resetForm">取消编辑</NButton>
        </div>
      </section>

      <!-- 价目项列表 -->
      <section class="panel mb-4 p-4">
        <h3 class="mb-3 font-heading text-base font-bold">
          价目表
          <span class="tech-label ml-2 text-ink-3 tech-label--cn text-xs">
            {{ items.length }} 档
          </span>
        </h3>

        <EmptyState
          v-if="!items.length"
          code="00 / NO PRICE ITEM"
          title="还没有任何一档"
          hint="学生下单时选不到类型，价格也就估不出来（订单照下，金额由你核定）。先加一档试试。"
        />

        <div v-else class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="text-left text-xs text-ink-3">
                <th class="border-b py-2 pr-3 font-normal" style="border-color: var(--border)">纸张</th>
                <th class="border-b py-2 pr-3 font-normal" style="border-color: var(--border)">类型</th>
                <th class="border-b py-2 pr-3 text-right font-normal" style="border-color: var(--border)">单面</th>
                <th class="border-b py-2 pr-3 text-right font-normal" style="border-color: var(--border)">双面</th>
                <th class="border-b py-2 pr-3 text-right font-normal" style="border-color: var(--border)">用过</th>
                <th class="border-b py-2 font-normal" style="border-color: var(--border)">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                :style="{ opacity: item.is_active === 0 ? 0.55 : 1 }"
              >
                <td class="border-b py-2 pr-3 align-top" style="border-color: var(--border)">
                  {{ item.paper }}
                  <span v-if="item.is_active === 0" class="block text-xs text-ink-3">已停用</span>
                </td>
                <td class="border-b py-2 pr-3 align-top" style="border-color: var(--border)">
                  {{ item.kind }}
                  <span class="text-xs text-ink-3">· {{ COLOR_LABELS[item.color] }}</span>
                  <span v-if="item.note" class="block text-xs text-ink-3">{{ item.note }}</span>
                </td>
                <td
                  class="tnum border-b py-2 pr-3 text-right align-top font-semibold"
                  style="border-color: var(--border)"
                >
                  {{ priceLabel(item.price_single) }}
                </td>
                <td class="tnum border-b py-2 pr-3 text-right align-top" style="border-color: var(--border)">
                  <span v-if="item.price_double !== null">{{ priceLabel(item.price_double) }}</span>
                  <span v-else class="text-xs text-ink-3">不支持</span>
                </td>
                <td
                  class="tnum border-b py-2 pr-3 text-right align-top text-xs text-ink-3"
                  style="border-color: var(--border)"
                >
                  {{ item.used_count ?? 0 }}
                </td>
                <td class="border-b py-2 align-top" style="border-color: var(--border)">
                  <div class="flex flex-wrap items-center gap-1">
                    <NButton size="tiny" quaternary @click="startEdit(item)">
                      <template #icon><Pencil :size="12" /></template>
                      编辑
                    </NButton>
                    <NButton size="tiny" quaternary @click="toggleActive(item)">
                      {{ item.is_active === 1 ? '停用' : '启用' }}
                    </NButton>
                    <NButton size="tiny" quaternary type="error" @click="removeItem(item)">
                      <template #icon><Trash2 :size="12" /></template>
                      删除
                    </NButton>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 说明（给学生看的那几条「注」） -->
      <section class="panel mb-4 p-4">
        <h3 class="mb-2 font-heading text-base font-bold">价目表说明</h3>
        <p class="mb-3 text-xs text-ink-3">
          学生点「价目表」弹窗时、以及机器人发「价目表」时，这几句会原样出现在价格表下面。
          一行一条，写清楚工艺差异与注意事项。
        </p>
        <NInput
          v-model:value="rules.notes"
          type="textarea"
          :maxlength="limits.notes_max"
          show-count
          :autosize="{ minRows: 4, maxRows: 12 }"
          placeholder="例：彩色（全覆盖）指覆盖率超过 50%，或打印整张图片的情况。"
        />
      </section>

      <!-- 试算 -->
      <section class="panel p-4">
        <h3 class="mb-2 font-heading text-base font-bold">试算</h3>
        <p class="mb-3 text-xs text-ink-3">
          按<strong>已经保存的</strong>价目表算一遍。刚在表单里改过但还没点保存的，不参与试算 ——
          试算要回答的是「线上现在会算成多少」。
        </p>
        <div class="grid gap-3 sm:grid-cols-4">
          <NFormItem label="价目项" :show-feedback="false" class="!mb-0">
            <NSelect v-model:value="preview.price_item_id" :options="previewOptions" size="small" />
          </NFormItem>
          <NFormItem label="页数" :show-feedback="false" class="!mb-0">
            <NInputNumber v-model:value="preview.pages" :min="1" size="small" class="w-full" />
          </NFormItem>
          <NFormItem label="份数" :show-feedback="false" class="!mb-0">
            <NInputNumber
              v-model:value="preview.copies"
              :min="limits.copies_min"
              :max="limits.copies_max"
              size="small"
              class="w-full"
            />
          </NFormItem>
          <NFormItem label="单双面" :show-feedback="false" class="!mb-0">
            <NSelect v-model:value="preview.duplex" :options="duplexOptions" size="small" />
          </NFormItem>
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-3">
          <NButton size="small" :loading="previewLoading" @click="runPreview()">试算</NButton>
          <span v-if="previewUnit !== null" class="text-xs text-ink-3">
            这一档单价：<span class="tnum">{{ priceLabel(previewUnit) }}</span>
          </span>
          <span v-if="previewPrice !== null" class="tnum text-sm font-bold">
            预估 {{ priceLabel(previewPrice) }}
          </span>
          <span v-else-if="previewNote" class="text-xs text-ink-3">{{ previewNote }}</span>
        </div>
      </section>
    </template>
  </div>
</template>
