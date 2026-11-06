<script setup lang="ts">
/** 下发确认弹窗 —— 订单台与订单详情页**共用这一个组件**。
 *
 *  在此之前两页各写一份模板（文件参数一处用下发口径、一处用完整口径），
 *  加打印机选择器时正好收拢：这里的参数行统一用「下发真正会用到的参数」
 *  （颜色 · 单双面 · 份数，本行为空沿用订单级），档位/纸张在详情页的
 *  文件区另有展示，确认框里不重复念。
 *
 *  打印机**每单手选**（v27 起两台实体）：选择器列出全部启用中的打印机，
 *  离线的照列并标注「· 未连接」——发不发由柜台判断，系统不越俎代庖。
 *  已成功下发过的单再发会撞后端 409+confirm，这里把弹窗切成「确认重打」
 *  再带 force 重发一次。成功反馈走事件回执（showReceipt），与下单成功同一条语言。
 */
import { computed, ref, watch } from 'vue'
import { NButton, NModal, NRadioButton, NRadioGroup, NSelect, useMessage } from 'naive-ui'
import { ApiError } from '@/api/client'
import { staffOrderApi } from '@/api/endpoints'
import { copiesLabel, fullTime, pickupCodeLabel } from '@/utils/format'
import type { ColorType, OrderDuplex, PrinterStatus } from '@/api/types'
import { showReceipt } from '@/composables/transition-receipt'

/** 两页的订单类型都能装进这个结构（结构化兼容，不取各自独有的字段）。 */
interface DispatchOrder {
  id: number
  pickup_code: string | null
  status: string
  filename: string | null
  preset_content?: string | null
  file_count?: number
  files?:
    | {
        id: number
        filename: string
        pages?: number | null
        color_type?: ColorType | null
        duplex?: 'single' | 'double' | null
        copies?: number | null
      }[]
    | null
  print_sent_time?: string | null
  print_error?: string | null
  color_type?: ColorType | null
  duplex?: OrderDuplex | null
  copies?: number | null
}

const props = defineProps<{
  show: boolean
  order: DispatchOrder | null
  /** 启用中的打印机（含各自在线态）——父页从 /api/admin/printers/status 拉来 */
  printers: PrinterStatus[]
}>()

const emit = defineEmits<{ close: []; dispatched: [] }>()

const message = useMessage()

/** true = 已成功下发过，弹窗要说清「重打会多印」，确认按钮也换成「确认重打」。 */
const force = ref(false)
const sending = ref(false)
const selectedPrinterId = ref<number | null>(null)

watch(
  () => props.show,
  (visible) => {
    if (!visible) return
    // 每次打开都重置：force 语义跟着「这一单此刻的库上事实」走，
    // 默认机选第一台在线的（没有在线的给第一台——发不发由柜台判断）。
    const item = props.order
    force.value = !!(item && item.print_sent_time && !(item.print_error ?? '').trim())
    const firstOnline = props.printers.find((p) => p.online)
    selectedPrinterId.value = firstOnline?.id ?? props.printers[0]?.id ?? null
    buildParamRows(item)
  },
)

const printerOptions = computed(() =>
  props.printers.map((p) => ({
    label: p.online ? p.name : `${p.name} · 未连接`,
    value: p.id,
  })),
)

/** 逐份的参数行（**可改**）：黑白/彩色、单/双面在确认框里直接定。
 *  默认值 = 文件行参数 → 订单级参数 → 兜底；订单级 'mixed' 只说明「各份不同」，
 *  不能当某一行的默认，落到单面。份数不在可改之列 —— 份数是计过价的。 */
const paramRows = ref<{
  key: number
  index: number
  filename: string
  pages: number | null
  copies: string
  color_type: ColorType
  duplex: 'single' | 'double'
}[]>([])

function buildParamRows(order: DispatchOrder | null): void {
  if (!order) {
    paramRows.value = []
    return
  }
  const defaultColor = (value: ColorType | null | undefined): ColorType =>
    value ?? ((order.color_type === 'color') ? 'color' : 'black')
  const defaultDuplex = (value: 'single' | 'double' | null | undefined): 'single' | 'double' =>
    value ?? ((order.duplex === 'double') ? 'double' : 'single')
  const files = order.files ?? []
  if (files.length) {
    paramRows.value = files.map((file, index) => ({
      key: file.id,
      index: index + 1,
      filename: file.filename,
      pages: file.pages ?? null,
      copies: copiesLabel(file.copies ?? order.copies),
      color_type: defaultColor(file.color_type),
      duplex: defaultDuplex(file.duplex),
    }))
    return
  }
  // 老单没有 order_files 行：按「一单一份」渲染，file_id 用 0 对号（后端同款约定）。
  paramRows.value = [{
    key: 0,
    index: 1,
    filename: order.filename || '预设打印服务',
    pages: null,
    copies: copiesLabel(order.copies),
    color_type: defaultColor(null),
    duplex: defaultDuplex(null),
  }]
}

async function submit(withForce: boolean): Promise<void> {
  const order = props.order
  if (!order || selectedPrinterId.value === null) {
    message.warning('先选一台打印机')
    return
  }
  const printerName =
    props.printers.find((p) => p.id === selectedPrinterId.value)?.name ?? '打印机'
  sending.value = true
  try {
    // 参数**整行显式发送**（不只在偏离时发）——后端把这份当作「那一次
    // 实际按什么参数发的」记录进 print_jobs，偏离订单参数的部分写进时间线。
    await staffOrderApi.print(order.id, selectedPrinterId.value, withForce,
      paramRows.value.map((row) => ({
        file_id: row.key,
        color_type: row.color_type,
        duplex: row.duplex,
      })))
    // 回执措辞是「已交给打印队列」而不是「打印完成」—— 入队这一刻，
    // 真正的答案要等轮询看到「打印中」，回执不能替打印机说话。
    showReceipt({
      code: 'PRINT QUEUED',
      title: '已交给打印队列',
      detail: `单号 ${pickupCodeLabel(order.pickup_code)} · ${order.files?.length || 1} 份文件 · ${printerName}`,
      target: '',
    })
    emit('dispatched')
  } catch (error) {
    // 409 + confirm = 「这单下发过，重打要明确确认」。不是失败，
    // 是把弹窗切成重打模式再说一遍 —— 按钮文案变了，人会看清自己在确认什么。
    if (error instanceof ApiError && error.status === 409 && error.detail['confirm']) {
      force.value = true
      return
    }
    message.error(error instanceof ApiError ? error.message : '下发未完成 · 稍后重试')
    emit('dispatched')
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <NModal
    :show="show && order !== null"
    preset="card"
    class="max-w-[520px]"
    title="下发打印机"
    :bordered="false"
    @update:show="(value: boolean) => !value && emit('close')"
  >
    <template v-if="order">
      <p v-if="force" class="mb-3 text-xs leading-5 text-ink-3">
        这单已于
        <span class="tnum">{{ fullTime(order.print_sent_time) }}</span>
        下发过打印机。重发会把整单再印一遍——上一份没出来的话，先看打印机是不是卡纸/缺纸。
      </p>
      <p v-else class="mb-3 text-xs leading-5 text-ink-3">
        确认后文件排进所选打印机的队列，逐份发往它；送达后状态自动变「打印中」，「可取件」仍由人工确认。
      </p>

      <!-- 打印机手选：每单发往哪台是柜台当场判断的事（v27 起有两台） -->
      <div class="mb-3">
        <p class="tech-label tech-label--cn mb-1.5 text-ink-3 text-xs">发往哪台</p>
        <NSelect
          v-model:value="selectedPrinterId"
          size="small"
          :options="printerOptions"
          placeholder="选择打印机"
          aria-label="选择打印机"
        />
      </div>

      <div class="space-y-2">
        <div
          v-for="entry in paramRows"
          :key="entry.key"
          class="border p-2.5"
          style="border-color: var(--border)"
        >
          <p class="mb-1.5 min-w-0 truncate text-xs font-semibold" :title="entry.filename">
            <span class="tnum text-ink-3">{{ entry.index }}.</span> {{ entry.filename }}
            <span v-if="entry.pages != null" class="tnum font-normal text-ink-3">
              · {{ entry.pages }} 页
            </span>
            <span class="tnum font-normal text-ink-3"> · {{ entry.copies }}</span>
          </p>
          <!-- 黑白/彩色、单/双面逐份可改：柜台在送出去之前最后的参数决定权。
               份数不在这里 —— 份数是计过价的，改份数走「改参数」重新计费。 -->
          <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
            <NRadioGroup v-model:value="entry.color_type" size="small" name="color">
              <NRadioButton value="black">黑白</NRadioButton>
              <NRadioButton value="color">彩色</NRadioButton>
            </NRadioGroup>
            <NRadioGroup v-model:value="entry.duplex" size="small" name="duplex">
              <NRadioButton value="single">单面</NRadioButton>
              <NRadioButton value="double">双面</NRadioButton>
            </NRadioGroup>
          </div>
        </div>
      </div>

      <p
        v-if="order.print_error"
        class="mt-3 border p-2.5 text-xs leading-5"
        style="border-color: var(--warn); color: var(--warn)"
      >
        上次下发失败：{{ order.print_error }}
      </p>
    </template>
    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton quaternary @click="emit('close')">取消</NButton>
        <NButton type="primary" :loading="sending" @click="submit(force)">
          {{ force ? '确认重打' : '确认下发' }}
        </NButton>
      </div>
    </template>
  </NModal>
</template>
