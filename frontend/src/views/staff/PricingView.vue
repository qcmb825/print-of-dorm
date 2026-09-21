<script setup lang="ts">
/** 计价规则：自动估价的公式系数（单价 / 基础费 / 最低消费）。
 *
 *  ⚠️ **这一页改的东西不是价目表本身，而是「预估价怎么算」。**
 *  预估价出现在学生下单成功时、以及他自己翻订单时（「预估 ¥x.xx，以管理员核定为准」），
 *  目的是让他下单前心里有数 —— 真正的金额永远由接单人在订单台上自己确认
 *  （订单台计费弹窗会拿预估价预填，管理员改不改都算他定的价）。
 *  所以：
 *    · 改这里的系数**不会**动到任何一笔已经下过的单（est_price 是下单那一刻的快照）；
 *    · 也说不出「系统自动收费」这种话 —— 收钱那一步始终有人在。
 *
 *  权限：所有管理员可改（后端 routes/price_rules.py 是 ROLE_ADMIN 起步）。
 *  价目表正是打印员自己最清楚的东西，收进超管只会让它没人维护 ——
 *  和「打印选项」页同一个理由。
 *
 *  纸张的**每页加价**不在这里改：那是纸张自己的属性，编辑入口在打印选项页
 *  （同一个字段有两个编辑框，迟早出现「这边改了那边没改」的困惑）。
 *  这一页把加价读出来展示，并在试算里把它算进去 —— 一屏就能看懂整条公式。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import { Calculator, RefreshCw, Save } from '@lucide/vue'
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
import { priceRulesApi } from '@/api/endpoints'
import { COLOR_LABELS, DUPLEX_LABELS, type ColorType, type Duplex, type PaperType } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import { priceLabel } from '@/utils/format'

const message = useMessage()

/* 四个系数在表单里一律是**字符串**：原样传给后端，不在前端 Number() 转一道 ——
 * 与下单页的备注、订单台的金额同一个规矩。浮点一转就会出现 0.1+0.2 那种残渣，
 * 而金额上的残渣会一路写进价目表。 */
const form = reactive({
  enabled: true,
  base_fee: '0',
  min_price: '0',
  page_black_single: '0',
  page_black_double: '0',
  page_color_single: '0',
  page_color_double: '0',
})

const papers = ref<PaperType[]>([])
const lines = ref<string[]>([])
const loading = ref(true)
const saving = ref(false)
const loadFailed = ref(false)

const COLOR_OPTIONS = [
  { label: COLOR_LABELS.black, value: 'black' },
  { label: COLOR_LABELS.color, value: 'color' },
]
const DUPLEX_OPTIONS = [
  { label: DUPLEX_LABELS.single, value: 'single' },
  { label: DUPLEX_LABELS.double, value: 'double' },
]

/* ---------- 试算 ----------
 *  公式只有一份（服务端 pricing.py），所以试算也**必须走服务端**：
 *  前端再镜像一遍必然漂移，而漂了不报错，只是页面上的数字开始说谎。
 *  表单里还没保存的改动**不参与**试算（试算读的是库里已保存的规则）——
 *  这一点在界面上要写清楚，否则管理员会以为试算算的是自己刚填的那个数。 */
const preview = reactive({
  pages: 10,
  copies: 1,
  color: 'black' as ColorType,
  duplex: 'single' as Duplex,
  paper_type_id: null as number | null,
})
const previewPrice = ref<number | null>(null)
const previewUnit = ref<number | null>(null)
const previewNote = ref('')
const previewLoading = ref(false)

const paperOptions = computed(() => [
  { label: '不指定纸张', value: 0 },
  ...papers.value.map((paper) => ({
    label: paper.price_delta
      ? `${paper.name}（每页 +${priceLabel(paper.price_delta)}）`
      : paper.name,
    value: paper.id,
  })),
])

async function runPreview(): Promise<void> {
  previewLoading.value = true
  try {
    const data = await priceRulesApi.preview({
      pages: preview.pages,
      copies: preview.copies,
      color: preview.color,
      duplex: preview.duplex,
      paper_type_id: preview.paper_type_id || null,
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
function fill(rules: {
  enabled: boolean
  base_fee: number
  min_price: number
  page_black_single: number
  page_black_double: number
  page_color_single: number
  page_color_double: number
}): void {
  form.enabled = rules.enabled
  form.base_fee = rules.base_fee.toFixed(2)
  form.min_price = rules.min_price.toFixed(2)
  form.page_black_single = rules.page_black_single.toFixed(2)
  form.page_black_double = rules.page_black_double.toFixed(2)
  form.page_color_single = rules.page_color_single.toFixed(2)
  form.page_color_double = rules.page_color_double.toFixed(2)
}

async function load(): Promise<void> {
  loading.value = true
  try {
    const data = await priceRulesApi.load()
    fill(data.rules)
    papers.value = data.papers
    lines.value = data.lines
    loadFailed.value = false
  } catch (error) {
    loadFailed.value = true
    message.error(error instanceof ApiError ? error.message : '加载计价规则失败')
  } finally {
    loading.value = false
  }
}

async function save(): Promise<void> {
  saving.value = true
  try {
    const data = await priceRulesApi.save({
      enabled: form.enabled,
      base_fee: form.base_fee.trim(),
      min_price: form.min_price.trim(),
      page_black_single: form.page_black_single.trim(),
      page_black_double: form.page_black_double.trim(),
      page_color_single: form.page_color_single.trim(),
      page_color_double: form.page_color_double.trim(),
    })
    // 用服务端**回显**的值回填表单：它才是真正落库的那份。
    // 只显示一句「已保存」的话，一个被后端夹过或改过的值会留在屏幕上，
    // 而它已经不是库里的数了（下一次刷新才会突然变）。
    fill(data.rules)
    lines.value = data.lines
    message.success('计价规则已保存 · 只影响之后下单的预估价')
    await runPreview()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  await load()
  await runPreview()
})
</script>

<template>
  <div class="mx-auto max-w-[1000px]">
    <PageHeader
      title="计价规则"
      subtitle="自动估价的公式系数。估出来的价格只给学生做参考，最终金额永远由接单人在订单台确认。"
    >
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
        <NButton
          size="small"
          type="primary"
          :loading="saving"
          :disabled="loading || loadFailed"
          @click="save()"
        >
          <template #icon><Save :size="15" /></template>
          保存
        </NButton>
      </template>
    </PageHeader>

    <NAlert v-if="loadFailed" type="warning" class="mb-4" title="规则没拉到">
      可能是网络或服务器临时的问题 —— 点右上角「刷新」重试。
      这一页拿不到数据时**不要让保存可用**：那会把一份空规则覆盖到线上。
    </NAlert>

    <NSkeleton v-if="loading" text :repeat="8" class="panel p-4" />

    <template v-else-if="!loadFailed">
      <!-- 公式本身：这一页的每一格都是它的一项，所以先把公式讲清楚 -->
      <section class="panel mb-4 p-4">
        <h3 class="mb-2 flex items-center gap-2 font-heading text-base font-bold">
          <Calculator :size="15" style="color: var(--accent-text)" />
          公式
        </h3>
        <p class="text-sm leading-6 text-ink-2">
          预估价 = 每单基础费 + 页数 × 份数 ×（该档单价 + 纸张加价），
          再取「最低消费」与它的较大值，保留两位小数。
        </p>
        <ul class="mt-2 flex list-none flex-col gap-1 p-0 text-xs text-ink-3">
          <li v-for="line in lines" :key="line">{{ line }}</li>
        </ul>
        <p class="mt-3 text-xs text-ink-3">
          页数是<strong>从学生上传的文件里数出来的</strong>：PDF 数页对象、docx 读文档属性、
          .doc 读摘要信息、图片按一页算。数不出来的（加密文档、扫描件、超大文件）
          就没有预估价，订单照常下、照样由管理员定价。
        </p>
      </section>

      <section class="panel mb-4 p-4">
        <div class="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h3 class="font-heading text-base font-bold">系数</h3>
          <label class="flex cursor-pointer items-center gap-2 text-sm">
            <NSwitch v-model:value="form.enabled" size="small" />
            <span :style="{ color: form.enabled ? undefined : 'var(--text-tertiary)' }">
              {{ form.enabled ? '已启用自动估价' : '已关闭（订单不再显示预估价）' }}
            </span>
          </label>
        </div>

        <div class="mb-3 grid gap-3 sm:grid-cols-2">
          <NFormItem label="每单基础费（元）" :show-feedback="false">
            <NInput v-model:value="form.base_fee" placeholder="例 0">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem label="最低消费（元）" :show-feedback="false">
            <NInput v-model:value="form.min_price" placeholder="例 0">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
        </div>

        <p class="tech-label mb-2 text-ink-3 tech-label--cn text-xs">单价（元/页）</p>
        <div class="grid gap-3 sm:grid-cols-2">
          <NFormItem label="黑白 · 单面" :show-feedback="false">
            <NInput v-model:value="form.page_black_single" placeholder="例 0.10">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem label="黑白 · 双面" :show-feedback="false">
            <NInput v-model:value="form.page_black_double" placeholder="例 0.08">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem label="彩色 · 单面" :show-feedback="false">
            <NInput v-model:value="form.page_color_single" placeholder="例 0.50">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
          <NFormItem label="彩色 · 双面" :show-feedback="false">
            <NInput v-model:value="form.page_color_double" placeholder="例 0.40">
              <template #prefix><span class="text-ink-3">¥</span></template>
            </NInput>
          </NFormItem>
        </div>
        <p class="text-xs text-ink-3">
          最多两位小数，0 也是合法值（不收这一项）。负数会被拒 ——
          「打折」请直接调低单价，不要靠负的加价去凑。
        </p>
      </section>

      <section class="panel mb-4 p-4">
        <h3 class="mb-2 font-heading text-base font-bold">试算</h3>
        <p class="mb-3 text-xs text-ink-3">
          按<strong>已经保存的</strong>规则算一遍。刚在表单里改过但还没点保存的，不参与试算 ——
          试算要回答的是「线上现在会算成多少」。
        </p>
        <div class="grid gap-3 sm:grid-cols-5">
          <NFormItem label="页数" :show-feedback="false">
            <NInputNumber v-model:value="preview.pages" :min="1" size="small" />
          </NFormItem>
          <NFormItem label="份数" :show-feedback="false">
            <NInputNumber v-model:value="preview.copies" :min="1" :max="50" size="small" />
          </NFormItem>
          <NFormItem label="颜色" :show-feedback="false">
            <NSelect v-model:value="preview.color" :options="COLOR_OPTIONS" size="small" />
          </NFormItem>
          <NFormItem label="单双面" :show-feedback="false">
            <NSelect v-model:value="preview.duplex" :options="DUPLEX_OPTIONS" size="small" />
          </NFormItem>
          <NFormItem label="纸张" :show-feedback="false">
            <NSelect
              v-model:value="preview.paper_type_id"
              :options="paperOptions"
              size="small"
            />
          </NFormItem>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <NButton size="small" :loading="previewLoading" @click="runPreview()">
            试算
          </NButton>
          <span v-if="previewUnit !== null" class="text-xs text-ink-3">
            这一页的单价：<span class="tnum">{{ priceLabel(previewUnit) }}</span>
          </span>
          <span v-if="previewPrice !== null" class="tnum text-sm font-bold">
            预估 {{ priceLabel(previewPrice) }}
          </span>
          <span v-else-if="previewNote" class="text-xs text-ink-3">{{ previewNote }}</span>
        </div>
      </section>

      <section class="panel p-4">
        <h3 class="mb-2 font-heading text-base font-bold">纸张加价</h3>
        <p class="mb-3 text-xs text-ink-3">
          每种纸每页比标准价贵多少。<strong>在这里不能改</strong> ——
          它是纸张自己的属性，编辑入口在打印选项页（一个字段有两个编辑框必然对不上）。
        </p>
        <ul class="flex list-none flex-col gap-1 p-0 text-sm">
          <li
            v-for="paper in papers"
            :key="paper.id"
            class="flex items-baseline justify-between gap-3 border-b py-1.5"
            style="border-color: var(--border)"
          >
            <span class="min-w-0 truncate">
              {{ paper.name }}
              <span v-if="paper.is_active === 0" class="text-xs text-ink-3">（已停用）</span>
            </span>
            <span class="tnum shrink-0 text-ink-2">
              {{ paper.price_delta ? `每页 +${priceLabel(paper.price_delta)}` : '不加价' }}
            </span>
          </li>
          <li v-if="!papers.length" class="text-sm text-ink-3">
            还没有配置纸张类型 —— 需要的话去「打印选项」页加。
          </li>
        </ul>
        <p class="mt-3 text-xs text-ink-3">
          改完记得点右上角「保存」，改动会写进审计日志（谁、什么时候、改成了什么）。
        </p>
      </section>
    </template>
  </div>
</template>
