<script setup lang="ts">
/** 学生下单：选文件**或用预设打印服务** + 打印选项，上传成功后把单号放大展示 ——
 *  那是学生真正要记住的东西。
 *
 *  两条下单路径互斥，而且是在**服务端**互斥的：用了预设就不许带文件
 *  （routes/orders.py 的 api_create_preset_order 见到 request.files 直接 400，
 *  分片上传那三条路也各自挡了一道）。这里把上传框藏起来只是让人看不见它，
 *  不是那条规矩本身 —— 谁都能手搓一个带文件的请求打过来。
 *
 *  ## 上传与下单是**两步**（2026-09-24 改）
 *
 *  原先上传完成的那一刻就把单建好了，学生要等下单成功才看到「预估 ¥x.xx」——
 *  而价格恰恰是他最想知道的事。现在：
 *
 *    选完文件 → 立刻自动预上传（只是传上去，**没有订单**）→ 拿到 file_token
 *             → 只要改了类型/份数/单双面，就请服务端重算一次预估价
 *             → 点「提交订单」才真的建单
 *
 *  页数由服务端从文件里数（客户端报上来的数不可信，见 pricing 模块注释第②条），
 *  公式也只有服务端一份（前端不镜像 —— 镜像必然漂移，而漂了不报错，
 *  只是页面上的数字开始说谎）。
 *
 *  上传分两条路，由 `prepareUpload()` 按文件大小自动选：
 *  小文件走单请求直传；大文件切 8MB 分片。原因见 utils/chunkedUpload.ts 顶部的注释。
 *  预设那条路根本没有文件，报价走预设自己的纸与价。
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  CircleCheck,
  FileText,
  Hash,
  History,
  Layers,
  Loader2,
  Printer,
  ReceiptText,
  Rocket,
  ScanEye,
  TriangleAlert,
  Upload,
  X,
} from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import PresetDocViewer from '@/components/PresetDocViewer.vue'
import PriceTableDialog from '@/components/PriceTableDialog.vue'
import StageHead from '@/components/StageHead.vue'
import {
  NButton,
  NFormItem,
  NInput,
  NInputNumber,
  NModal,
  NProgress,
  NRadioButton,
  NRadioGroup,
  NSelect,
  NUpload,
  NUploadDragger,
  useMessage,
  type UploadFileInfo,
} from 'naive-ui'
import { useRouter } from 'vue-router'
import { ApiError } from '@/api/client'
import { showReceipt } from '@/composables/transition-receipt'
import { chunkApi, orderApi, printOptionsApi, authApi } from '@/api/endpoints'
import type {
  ChunkSession,
  EstimateFileQuote,
  EstimateResponse,
  PriceItem,
  PrintPreset,
} from '@/api/types'
import { pendingUploads, prettySize, prepareUpload } from '@/utils/chunkedUpload'
import { pickupCodeLabel } from '@/utils/format'
import { COPIES_DEFAULT, COPIES_MAX, COPIES_MIN } from '@/utils/validators'

const message = useMessage()

/** 与后端 config.ALLOWED_EXTENSIONS 对齐；只用于提前拦掉白名单外的文件，省一次大文件上传。
 *  真正的把关在服务端（上传接口会再校验一次）。 */
const ACCEPT = '.pdf,.jpg,.jpeg,.png,.doc,.docx'

/** 下单方式。'preset' 时整块文件上传区都不渲染，这份 ref 是唯一的开关。 */
type OrderMode = 'file' | 'preset'
const mode = ref<OrderMode>('file')

const fileList = ref<UploadFileInfo[]>([])
const duplex = ref<'single' | 'double'>('single')
const remark = ref('')
const copies = ref<number>(COPIES_DEFAULT)
/** 选的**价目项**（v20 起取代"颜色 + 纸张"两个下拉）：
 *  纸张、类型、单价都在这一条里，颜色由它决定（服务端从价目项取 color_type）。 */
const priceItemId = ref<number | null>(null)
/** 选中的预设 id。null = 还没选，这时不允许提交（不能替学生挑一条）。 */
const presetId = ref<number | null>(null)
const router = useRouter()
const submitting = ref(false)
/** 服务端还留着的未完成上传，进页面时提醒一句 */
const pending = ref<ChunkSession[]>([])
/** 服务端给的启用中预设与纸张 */
const presets = ref<PrintPreset[]>([])
const priceItems = ref<PriceItem[]>([])
/** 预设/纸张清单没拉到时的提示语。清单为空**不等于**没有可选项 ——
 *  这两种情况在下拉框里长得一模一样（都是空的），但一个是「还没配置」、
 *  一个是「网络出问题了」。不给提示的话，学生只会以为这功能不存在。 */
const optionsError = ref('')
const optionsLoading = ref(true)
/** 下单成功后的回执（类型与 announceOrders 的入参是同一个 —— 两处各写一份，
 *  加一个字段时必然会漏掉一处，而漏掉的那处不报错，只是那一格不显示）。 */
const receipt = ref<ReceiptOrder[] | null>(null)

/* ---------- 实时预估（见文件开头那段「上传与下单是两步」）----------
 *
 *  quote 是**整单**的报价：一次请求把这一批文件全带上（每份带自己的档位 /
 *  份数 / 单双面），服务端回的 `files` 是逐份明细（每份自己的小计），
 *  顶层 `price` 是这**一张单**的合计。
 *
 *  ⚠️ 不再按参数分组试算，也不再一份一次请求 —— 一张单里的每一份参数可以不同，
 *  那正是 v24 要表达的「多份一个号」；分组是上一版（多份多个号）的遗留。
 */

/* ---------- 选中的文件：**一批**（2026-09-28 起支持一次选多份）----------
 *
 *  每一份文件带**自己的一套打印选项**（档位 / 份数 / 单双面）和自己的预上传状态 ——
 *  学生要的就是「一次传几份，各打各的」。
 *
 *  提交时**不再按参数分组**：这一批只发一个 group，也就是**一张订单、一个单号**；
 *  每份自己的参数随它一起提交，服务端按份记录（见 PreparedOrderFile）。
 *  上一版把不同参数拆成几张单，学生要跑几趟取件 —— 那是这一版要消掉的事。
 *
 *  NUpload 只管「选了哪些文件」（fileList），打印参数与上传状态都在 rows 上：
 *  两边各存一份参数的话，删掉一份文件时总有一边不知道。
 */
type FileRow = {
  /** NUpload 的文件 id（字符串形式）——两边的唯一纽带 */
  key: string
  file: File
  name: string
  size: number
  status: 'uploading' | 'ready' | 'failed'
  /** 预上传换回来的凭据。**提交时用它，不用再把文件传一遍**。 */
  token: string | null
  pages: number | null
  percent: number
  error: string
  /** 分片会话 id（大文件才有）—— 组件卸载时要能取消它，别占着额度 */
  uploadId?: string | null
  priceItemId: number | null
  copies: number
  duplex: 'single' | 'double'
  /** 这一份在**传完之前**就被学生移除了。
   *
   *  为什么需要这个标记：`rows` 只是数组，移除就是把它摘掉，而预上传的
   *  Promise 闭包里仍握着这个对象 —— token 可能几百毫秒后才回来。
   *  不标记的话那份 token 永远没人认领，服务端的 `.pending` 文件一直占着
   *  「每账号最多几份」的额度，而学生以为他已经把这份删掉了。 */
  removed?: boolean
}
const rows = ref<FileRow[]>([])
/** 正在上传的那一份。上传是串行的，所以同一时间只有一份在动。 */
const activeRowKey = ref<string | null>(null)

/** 一次最多几份：**用服务端给的那个数**（/api/print-options 的 batch_max_files），
 *  不在前端写死 —— 服务端配成 5 而这里写 10 的话，学生会选满 10 份、传完，
 *  在最后一步才被拒。拉不到清单时退回 1（保守：宁可他一份份传）。 */
const batchMax = ref(1)

const uploading = computed(() => rows.value.some((item) => item.status === 'uploading'))
const readyRows = computed(() => rows.value.filter((item) => item.status === 'ready' && item.token))

const quote = ref<EstimateResponse | null>(null)
const quoting = ref(false)
/** 防抖用的定时器：份数是输入框，连着按上下箭头会一秒打出七八次请求。 */
let quoteTimer: number | null = null
/** 试算的请求序号闸门（口径同 OrdersView / MyOrdersView 的 requestSeq）。
 *  350ms 防抖挡不住「改完档位立刻改份数」这类组合：两个请求都在飞，
 *  先发的那个若后到，就会把 quote / quotes 整体盖回旧参数的值 ——
 *  学生看到的是「我把份数从 1 改成 3，价格反而退回去了」。 */
let quoteSeq = 0

const usingPreset = computed(() => mode.value === 'preset')
const selectedPreset = computed(
  () => presets.value.find((item) => item.id === presetId.value) ?? null,
)

const presetOptions = computed(() =>
  presets.value.map((item) => ({ label: item.content, value: item.id })),
)
/** 价目项下拉。标签里带上**单价**：这一屏是学生下单前唯一一次看到价格的地方
 *  （价目表弹窗是「想细看才点」的补充，不是必经之路）。
 *  双面价为空 = 这一档不支持双面，标签里明写，选完之后双面单选也会禁用。 */
const priceItemOptions = computed(() =>
  priceItems.value.map((item) => {
    const price = item.price_double === null
      ? `单面 ¥${item.price_single.toFixed(2)} · 不支持双面`
      : `单面 ¥${item.price_single.toFixed(2)} / 双面 ¥${item.price_double.toFixed(2)}`
    const note = item.note ? ` · ${item.note}` : ''
    return { label: `${item.paper} · ${item.kind}（${price}${note}）`, value: item.id }
  }),
)

/** 某一档支不支持双面（按行问：每份文件可能选的是不同的档）。 */
function duplexAllowedFor(itemId: number | null): boolean {
  if (itemId === null) return true
  const item = priceItems.value.find((entry) => entry.id === itemId)
  // 找不到那一档（被停用了）时**不禁用**：服务端会在试算里把 duplex 归正成
  // single 并回给前端，界面跟着它改 —— 那一条路比在这里猜要准。
  return item ? item.price_double !== null : true
}

/** 预设模式下、且那条服务**绑了**档位 → 这一格变成只读。
 *
 *  与后端 orders.resolve_preset_item 是同一个判据：绑了就以预设为准，
 *  请求里带的 price_item_id 一律忽略。两边各写一套的话，会出现
 *  「界面让学生选、服务端却不理」这种谁也说不清的状态。 */
const presetBoundItem = computed(() =>
  usingPreset.value && selectedPreset.value?.price_item_id ? selectedPreset.value : null,
)

/** 这一档支不支持双面。不支持时把双面单选禁掉 —— 而不是让学生选了再被服务端改回单面
 *  （那样他看到的选项和最终计价就不是一回事）。 */
const duplexAllowed = computed(() => {
  // 预设指定了档位时以那一档为准。它可能不在 priceItems 里（那一档被停用后
  // 学生端就拿不到了），这时**不禁用**双面：服务端会在试算里把 duplex 归正成
  // single 并回给前端，界面跟着它改 —— 那一条路比在这里猜要准。
  if (presetBoundItem.value) {
    const bound = priceItems.value.find((item) => item.id === presetBoundItem.value?.price_item_id)
    return bound ? bound.price_double !== null : true
  }
  return duplexAllowedFor(priceItemId.value)
})

/** 分片阈值：**必须与 utils/chunkedUpload.ts 的 CHUNK_THRESHOLD 是同一个数**
 *  （那里决定真的走不走分片，这里只负责念「会分几片」）。
 *
 *  本来该 import 那个常量，但它没有 export，而那个文件不在这次改动的白名单里，
 *  所以只能在这里再写一份。两个数一分叉，界面就会说一套、上传做另一套，
 *  而且两边都不报错 —— 改阈值时这两处要一起改。 */
const CHUNK_THRESHOLD = 8 * 1024 * 1024

/** 大文件才会走分片：把这一批里所有要走分片的文件加起来，告诉学生「会分几片」，
 *  免得他以为卡住了。 */
const chunkCount = computed(() =>
  rows.value.reduce((total, row) => {
    if (row.size <= CHUNK_THRESHOLD) return total
    return total + Math.ceil(row.size / CHUNK_THRESHOLD)
  }, 0),
)

/** 能不能提交。分两种模式各算一次，别合成一个布尔表达式 ——
 *  按钮上要显示的「为什么按不动」是两套完全不同的话。
 *
 *  文件模式多一道「文件必须已经传完」：预上传是**自动**跑的（选完文件就传），
 *  所以学生完全有可能在传完之前就点了提交 —— 那时 token 还不存在，
 *  建单接口会顶回来。在这一句里挡掉，比让他点一次、再看到一屏报错要好。 */
const blockReason = computed<string | null>(() => {
  if (submitting.value) return null
  if (usingPreset.value) {
    if (!presets.value.length) return '暂无可用预设打印服务'
    if (presetId.value === null) return '尚未选择预设打印服务'
    return null
  }
  if (!rows.value.length) return '尚未选择文件'
  if (uploading.value) return '文件上传中 · 传完即可提交'
  if (rows.value.some((item) => item.status === 'failed')) return '有文件没传完 · 移除后重选'
  if (!readyRows.value.length) return '文件还没传完 · 重新选择一次'
  return null
})

async function loadOptions(): Promise<void> {
  optionsLoading.value = true
  optionsError.value = ''
  try {
    const data = await printOptionsApi.load()
    presets.value = data.presets ?? []
    priceItems.value = data.price_items ?? []
    // 一次最多几份**由服务端给**（见 PrintOptionsResponse.batch_max_files）：
    // 前端不写死，否则服务端调小了这里还在放行。
    if (typeof data.batch_max_files === 'number' && data.batch_max_files > 0) {
      batchMax.value = data.batch_max_files
    }
  } catch (error) {
    optionsError.value = error instanceof ApiError ? error.message : '打印选项读取失败'
  } finally {
    optionsLoading.value = false
  }
}

async function refreshPending(): Promise<void> {
  pending.value = await pendingUploads()
}

/** 放弃某一份未完成的上传，腾出额度 */
async function cancelSession(uploadId: string): Promise<void> {
  try {
    await chunkApi.cancel(uploadId)
    const row = rows.value.find((item) => item.uploadId === uploadId)
    if (row) row.uploadId = null
    message.success('上传已终止 · 额度已释放')
    await refreshPending()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '终止未完成 · 稍后重试')
  }
}

/** 组件卸载时：把还在进行的分片会话都取消、把已经拿到手的 token 都丢掉，
 *  避免残留占用额度。 */
onBeforeUnmount(() => {
  for (const row of rows.value) {
    if (row.uploadId) void chunkApi.cancel(row.uploadId).catch(() => {})
    // 这一页已经离开，不会有人再为这些 token 建单了：不丢弃的话，服务端那几份
    // `.pending` 文件要一直占着「每账号最多几份」的额度，直到惰性清理把 TTL 到期
    // 的扫掉 —— 而学生只是「返回上一步改了个参数」。
    // 发完即走（不 await、失败吞掉）：卸载钩子里等网络返回会把路由跳转拖住。
    if (row.token) void orderApi.discardPrepared([row.token]).catch(() => {})
  }
  // 防抖定时器也要停掉：组件都没了还去打一次试算，纯属白跑一趟。
  if (quoteTimer !== null) window.clearTimeout(quoteTimer)
})

function reset(): void {
  fileList.value = []
  rows.value = []
  quotes.value = []
  remark.value = ''
  presetId.value = null
  mode.value = 'file'
  quote.value = null
  presetDocOpen.value = false
  // 打印参数回到**偏好里的默认值**（而不是写死的黑白/单面/1 份）：
  // 下第二单时把自己设过的默认值丢掉，那个设置就等于不存在。
  applyDefaults()
}

/* ---------- 偏好里的「默认打印参数」 ----------
 *
 *  它只当**表单初值**（服务端 prefs.py 那条注释讲的就是这件事）：
 *  服务端绝不替用户补参数，学生交上来的就是表单里那个值。
 *  两边都默认的话，「没选」和「选了默认」就分不开，计费时会为
 *  「这份到底是不是彩色」吵架。
 *
 *  表单初值而非锁定值：预填之后学生照样能改，改完这一单按改后的走，
 *  默认值本身不动（要改默认值得去设置页 / 机器人「默认 …」命令）。
 */
const formDefaults = ref<{
  duplex: 'single' | 'double' | null
  copies: number
  priceItemId: number | null
}>({ duplex: null, copies: COPIES_DEFAULT, priceItemId: null })

/** 有没有真的用过默认值。用来决定要不要显示那句「已按你的默认参数预填」——
 *  没设过默认值的人也看到这句话，会去找一个自己从没设过的东西。 */
const defaultsApplied = computed(() => {
  const d = formDefaults.value
  return !!(d.duplex || d.priceItemId || d.copies !== COPIES_DEFAULT)
})

/** 表单里有没有被用户动过。预填**只填空着的字段** ——
 *  偏好和纸张清单是两个请求，慢的那几百毫秒里用户完全可能已经点好了颜色，
 *  这时再套一次默认值就是「我选的怎么自己变了」（前端审计抓到）。 */
const formTouched = ref(false)

function applyDefaults(): void {
  const d = formDefaults.value
  if (!formTouched.value) {
    duplex.value = d.duplex ?? 'single'
    copies.value = d.copies
    priceItemId.value = d.priceItemId
  }
}

async function loadPrefs(): Promise<void> {
  try {
    const response = await authApi.prefs()
    const saved = response.prefs
    formDefaults.value = {
      // 只认这两个值：库里存了别的东西（手改过库、旧版本留下的）时当作「没设」，
      // 塞进 NRadioGroup 会变成一个选不中的状态，看着像坏了。
      duplex: saved.default_duplex === 'single' || saved.default_duplex === 'double'
        ? saved.default_duplex
        : null,
      copies: typeof saved.default_copies === 'number' ? saved.default_copies : COPIES_DEFAULT,
      priceItemId: saved.default_price_item_id ?? null,
    }
    applyDefaults()
  } catch {
    // 拉不到就按硬编码初值走：默认参数本来就是个锦上添花的东西，
    // 为它弹一个错误反而像是下单页坏了。
  }
}

/** 选了价目项：把「用户动过表单」标上，并在这一档不支持双面时把 duplex 拨回单面 ——
 *  否则会留下一个「选项是双面、这一档却打不了双面」的状态，提交时被服务端改回单面，
 *  而屏幕上还写着双面（价钱却按单面算）。 */
function onItemChange(): void {
  formTouched.value = true
  if (!duplexAllowed.value) duplex.value = 'single'
}

/** 价目表弹窗 */
const priceTableOpen = ref(false)

/** 预设附带文档的预览弹窗（null = 不显示）。 */
const presetDocOpen = ref(false)

/** 试算的输入变了就重算。**350ms 防抖**：份数是数字输入框，
 *  连点上下箭头会一秒打出七八个请求，而每一次都要服务端读一遍文件页数。 */
function scheduleQuote(): void {
  if (quoteTimer !== null) window.clearTimeout(quoteTimer)
  quoteTimer = window.setTimeout(() => {
    quoteTimer = null
    void refreshQuote()
  }, 350)
}

/** 逐份报价明细（服务端 EstimateResponse.files）。
 *  一份一条，带它自己的页数、小计与归正后的参数 —— 页面上每份小计就从这里取。
 *  **不是「一组一条」**：整单只有一张，明细按份给。 */
const quotes = ref<EstimateFileQuote[]>([])

async function refreshQuote(): Promise<void> {
  // 先领一个序号：回来时若不是最新那一次，连同 loading 与失败提示一起丢掉。
  const mySeq = ++quoteSeq
  // 预设模式：一条服务一次报价（没有文件，也就没有分组这回事）。
  if (usingPreset.value) {
    quotes.value = []
    if (presetId.value === null) {
      quote.value = null
      return
    }
    quoting.value = true
    try {
      const data = await orderApi.estimate({
        preset_id: presetId.value,
        copies: copies.value ?? COPIES_DEFAULT,
        duplex: duplex.value,
        price_item_id: priceItemId.value,
      })
      if (mySeq !== quoteSeq) return
      quote.value = data
      //    服务端归正过的单双面要跟着改回来：这一档不支持双面时它会回 single，
      //    而屏幕上还写着「双面」的话，学生看到的选项和计价就不是一回事了。
      //    预设单只有一份，'mixed' 在语义上不会出现；但类型上是宽的那个联合
      //    （OrderDuplex），所以只认 single / double，其余一律不动 —— 不猜。
      if (data.duplex === 'single' || data.duplex === 'double') {
        if (data.duplex !== duplex.value) duplex.value = data.duplex
      }
    } catch {
      //    试算失败**不报错**：它是锦上添花的东西，为它弹一个红条会让下单页看着像坏了。
      //    界面上那句「暂时算不出预估」已经把状态说清楚了。
      //    旧请求的失败更是不能盖在新结果上（同一条序号闸门）。
      if (mySeq === quoteSeq) quote.value = null
    } finally {
      //    转圈也只由最后一次请求收尾：被丢弃的旧响应提前灭掉它，
      //    估算中的读数会在新数据到达前先「亮一下」。
      if (mySeq === quoteSeq) quoting.value = false
    }
    return
  }

  // 文件单：**一次请求把这一批全带上**，每份带自己的档位 / 份数 / 单双面。
  // 服务端回的 `files` 是逐份小计，顶层 `price` 是这**一张单**的合计。
  // 这里原先按参数分组、一组一次请求 —— 那套对应「多份拆成多个单号」，
  // 而这一版一次提交只建一张单，分组在服务端也已经不再做。
  quote.value = null
  if (!readyRows.value.length) {
    quotes.value = []
    return
  }
  quoting.value = true
  try {
    const data = await orderApi.estimate({
      files: readyRows.value.map((row) => ({
        file_token: row.token as string,
        price_item_id: row.priceItemId,
        copies: row.copies,
        duplex: row.duplex,
      })),
    })
    if (mySeq !== quoteSeq) return
    quote.value = data
    quotes.value = data.files ?? []
    // 归正过的单双面要写回**那一份**（这一档不支持双面时服务端会给回 single）。
    // 按 file_token 对号，不能拿顶层 duplex 一把刷：多份时顶层可能是 'mixed'，
    // 而每份自己的 duplex 只会是 single / double。
    for (const row of readyRows.value) {
      const one = quotes.value.find((item) => item.file_token === row.token)
      if (one && one.duplex !== row.duplex) row.duplex = one.duplex
    }
  } catch {
    if (mySeq === quoteSeq) quotes.value = []
  } finally {
    if (mySeq === quoteSeq) quoting.value = false
  }
}

/** 整单的预估合计。**直接用服务端给的顶层 price**，不在前端把各份小计相加 ——
 *  有一份算不出时服务端那个和就是 null，前端自己相加只会得出一个漏算了某几份、
 *  却看着很像真的总数（与「est_price 不是价格」同一条纪律：一个自己拼出来的
 *  数字，没人能说清它是怎么来的）。 */
const quoteTotal = computed<number | null>(() => quote.value?.price ?? null)

const quoteText = computed(() => {
  // 「估算中」只在**一次响应都还没有**时出现：改一个参数就闪一下「估算中」，
  // 已经显示的合计会跟着闪，读起来像价格在乱跳。
  if (quoting.value && !quote.value) return '估算中'
  const total = quoteTotal.value
  if (total === null) return quote.value ? '合计暂不显示' : '暂时算不出预估'
  return `预估 ¥${total.toFixed(2)}`
})

const quoteHint = computed(() => {
  const data = quote.value
  if (!data) return ''
  // 有哪一份算不出价时，合计一律不显示（见 quoteText），这里把原因说到底：
  // 一句「合计暂不显示」比一个少算了几份的数字安全得多，后者会被当真。
  // 逐份的原因与「这一份暂时算不出」在各自那一行（见 rowQuoteText）。
  if (data.price === null) {
    const parts = ['部分文件算不出，合计暂不显示']
    const failing = quotes.value.find((item) => item.price === null)
    if (failing?.hint) parts.push(failing.hint)
    parts.push('以管理员核定为准')
    return parts.join(' · ')
  }
  const parts: string[] = []
  if (data.pages !== null) {
    // 顶层页数是**整单各份页数之和**（每份的份数不乘进页数），所以措辞不能写
    // 「按 N 页」—— 多份时那句话会被读成「这一单只有 N 页」。
    const portions = usingPreset.value ? 1 : readyRows.value.length
    parts.push(portions > 1 ? `各份合计 ${data.pages} 页` : `共 ${data.pages} 页`)
  }
  // 逐份小计写在每一份自己那一行下面（见 rowQuoteText），这里不再重复：
  // 同一批数字出现两处，改参数时两处一起跳，反而更难读。
  parts.push('以管理员核定为准')
  return parts.join(' · ')
})

/** 某一份的报价。按 file_token 对号 —— 行与 quotes 之间没有别的稳定 id
 *  （行的 key 是 NUpload 给的，服务端不认识它）。 */
function rowQuote(row: FileRow): EstimateFileQuote | null {
  if (!row.token) return null
  return quotes.value.find((item) => item.file_token === row.token) ?? null
}

/** 这一份的小计文案。算不出就说「算不出」—— 既不显示一个数，也不留白：
 *  留白会被读成「还没轮到这一份算」。 */
function rowQuoteText(row: FileRow): string {
  if (quoting.value && !quotes.value.length) return '估算中'
  const one = rowQuote(row)
  if (!one) return ''
  if (one.price === null) return '这一份暂时算不出'
  return `小计 ¥${one.price.toFixed(2)}`
}

/** 这一批**只生成一张单**（一个单号），所以这里不再有「分组」这一步。
 *
 *  上一版有一个 groupReadyRows()，按（档位 + 份数 + 单双面）把文件分进几个组、
 *  一组一张单 —— 后果是学生一次传 5 份却拿到两三个单号，要跑几趟取件。
 *  现在每份参数随那一份提交（PreparedOrderFile），整批就是一个 group。
 *  这也是「一组 = 一张订单」这句话唯一还成立的地方。
 */

/** 把一份文件传上去换 token。**它不下单** ——
 *  服务端据此数出页数（页数只能在服务端数：客户端报上来的数直接进公式，不可信）。 */
async function prepareRow(row: FileRow): Promise<void> {
  row.status = 'uploading'
  row.error = ''
  row.percent = 0
  row.token = null
  row.pages = null
  activeRowKey.value = row.key
  try {
    const data = await prepareUpload(
      row.file,
      (state) => {
        row.percent = state.percent
      },
      (uploadId) => {
        row.uploadId = uploadId
      },
    )
    row.uploadId = null
    row.token = data.file_token
    row.pages = data.pages
    row.status = 'ready'
    // 传完之前这一份就被移除了（removeRow 打的标记）：这一页不会再为它下单，
    // token 立刻丢掉，否则服务端那份 `.pending` 文件一直占着额度。
    if (row.removed) void orderApi.discardPrepared([row.token]).catch(() => {})
  } catch (error) {
    row.uploadId = null
    row.status = 'failed'
    row.error = error instanceof ApiError ? error.message : '文件上传未完成'
    if (error instanceof ApiError && error.status === 429) {
      // 额度已满：刷新 pending 列表，让顶部的「放弃这次上传」入口可见
      void refreshPending()
    }
  } finally {
    activeRowKey.value = null
  }
}

/** 串行上传这一批（一次只有一份在动：并行传几份大文件会把上行带宽分光，
 *  而进度条也就看不出哪一份在走了）。 */
async function prepareRows(keys: string[]): Promise<void> {
  for (const key of keys) {
    const row = rows.value.find((item) => item.key === key)
    if (row && row.status !== 'ready') await prepareRow(row)
  }
  void refreshPending()
  scheduleQuote()
}

/** 选完文件（多选就是一次进来好几份）：建行 + 预上传 + 按偏好预填参数。 */
function onFileChange(options: {
  file: Required<UploadFileInfo>
  fileList: Required<UploadFileInfo>[]
  event?: Event | ProgressEvent
}): void {
  const id = String(options.file.id)
  //    Naive 的 event 是 DOM 事件或 'remove' 这类**字符串动作**（类型上写的是 Event，
  //    实际回调时会塞动作名进来）。这里只关心「这一份是不是被移除了」，
  //    所以按字符串比 —— 与 Naive 自己的文档口径一致。
  if (String(options.event) === 'remove') {
    removeRow(id)
    return
  }
  if (rows.value.some((row) => row.key === id)) return
  const file = options.file.file
  if (!file) return
  rows.value.push({
    key: id,
    file,
    name: file.name,
    size: file.size,
    status: 'uploading',
    token: null,
    pages: null,
    percent: 0,
    error: '',
    uploadId: null,
    priceItemId: formDefaults.value.priceItemId,
    copies: formDefaults.value.copies,
    duplex: formDefaults.value.duplex ?? 'single',
  })
  void prepareRows([id])
}

/** 从这一批里拿掉一份：内存、NUpload 的列表、以及**服务端那份没下单的预上传文件**
 *  一起清掉。最后一件不能省 —— 它一直占着「每账号最多几份」的额度，
 *  而学生以为他已经把这份删了。 */
function removeRow(key: string): void {
  const row = rows.value.find((item) => item.key === key)
  // 先打标记、再把它从数组里摘掉：预上传的 Promise 闭包里仍握着这个对象，
  // token 可能几百毫秒后才回来（直传途中被移除就是这种情形）。
  // 只按「token 已存在」去丢弃，那一份的 token 就成了没人认领的孤儿。
  if (row) row.removed = true
  rows.value = rows.value.filter((item) => item.key !== key)
  fileList.value = fileList.value.filter((item) => String(item.id) !== key)
  // 已经拿到 token 的：立刻还回额度；token 还没回来的交给 prepareRow 里那句 removed 判定。
  if (row?.token) void orderApi.discardPrepared([row.token]).catch(() => {})
  if (row?.uploadId) void chunkApi.cancel(row.uploadId).catch(() => {})
  quote.value = null
  scheduleQuote()
}

/** 把某一行的打印参数套到这一批的所有文件上。
 *  一次选 5 份、参数都一样时，这是学生唯一需要按的那一下。 */
function applyRowToAll(row: FileRow): void {
  for (const item of rows.value) {
    item.priceItemId = row.priceItemId
    item.copies = row.copies
    item.duplex = duplexAllowedFor(row.priceItemId) ? row.duplex : 'single'
  }
  message.success('已应用到全部 %d 份'.replace('%d', String(rows.value.length)))
  scheduleQuote()
}

/** 换路径（文件 ↔ 预设）：两边都清一次。 */
watch(mode, () => {
  quote.value = null
  quotes.value = []
  if (usingPreset.value) {
    if (presetId.value !== null) scheduleQuote()
  } else if (rows.value.some((item) => item.status !== 'ready')) {
    void prepareRows(rows.value.filter((item) => item.status !== 'ready').map((item) => item.key))
  } else if (rows.value.length) {
    scheduleQuote()
  }
})

/** 换打印服务 → 它的纸与价都变了。 */
watch(presetId, () => {
  quote.value = null
  if (usingPreset.value) scheduleQuote()
})

/** 预设单的那一套参数（文件单选的是**每份自己的**那一套，见 FileRow）。 */
watch([priceItemId, copies, duplex], () => scheduleQuote())

/** 一条回执：一张订单 + 它挂着哪几份文件。 */
type ReceiptOrder = {
  code: string
  /** 档位名快照（「A4 70g · 黑白」），没选档时是空串 */
  label: string
  files: string[]
  estPrice: number | null
}

/** 下单成功后的那一套：先出跨换场的回执，再跳到我的订单。
 *
 *  和登录成功走的是同一条（components/TransitionReceipt.vue 的 event 档）：
 *  回执压在换场覆盖层之上、跨过换场留在屏幕上，覆盖层自己的中心读数在回执期间让位
 *  （:root[data-receipt] 那条），所以整场只有一句话。
 *
 *  单号写在回执的补充行上，而不是只留在这一页的成功面板里 ——
 *  面板会跟着跳转一起消失，而回执**跨过换场还在**，学生至少多一秒看清它。
 *  目标页名从路由表取，和守卫算的是同一份事实来源（与 LoginView 一致）。 */
function announceOrders(orders: ReceiptOrder[]): void {
  const first = orders[0]
  // 预估价在这两行里带一下（「预估」两个字不能省，它还不是最终价）：
  // 回执是学生下单后唯一会认真看的一屏，而金额正是他此刻最想知道的数字之一。
  // 多张单时给**合计**：他这一批一共大概要花多少，比逐张念更贴近他想知道的事。
  const prices = orders.map((order) => order.estPrice).filter((value): value is number => value !== null)
  const estimate = prices.length
    ? ` · 预估 ¥${prices.reduce((sum, value) => sum + value, 0).toFixed(2)}${orders.length > 1 ? '（合计）' : ''}`
    : ''
  // 一次提交只出一张单（一个单号）。回执第一句就要把「几份、一个号」说清 ——
  // 学生最怕的正是「我传了 5 份，是不是要跑 5 趟」。
  const portions = first.files.length || 1
  const detail = orders.length === 1
    ? `一张单 · ${portions} 份文件 · 单号 ${pickupCodeLabel(first.code)}${estimate}`
    : `${orders.length} 张订单 · 单号 ${pickupCodeLabel(first.code)} 等${estimate}`
  showReceipt({
    code: 'ORDER SUBMITTED',
    title: orders.length === 1 ? '订单已提交' : `已提交 ${orders.length} 张订单`,
    detail,
    target: (router.resolve('/my-orders').meta.title as string | undefined) ?? '我的订单',
  })
  // **不 await**：路由守卫要是抛出来，会被下面那个 catch 逮成"提交失败，请稍后重试" ——
  // 单已经下成了，报一个假的失败比什么都不报更糟。
  void router.push('/my-orders')
}

async function submit(): Promise<void> {
  if (blockReason.value) {
    message.warning(blockReason.value)
    return
  }
  submitting.value = true
  try {
    if (usingPreset.value) {
      const preset = selectedPreset.value
      if (!preset) return
      // 预设单是**一条服务一套参数**（没有文件，所以没有分组这回事）。
      const data = await orderApi.createPresetOrder({
        preset_id: preset.id,
        duplex: duplex.value,
        remark: remark.value.trim(),
        copies: copies.value ?? COPIES_DEFAULT,
        price_item_id: priceItemId.value,
      })
      const orders: ReceiptOrder[] = [{
        code: data.pickup_code,
        label: preset.content,
        files: [],
        // v22 起预设单也可能有预估价（预设价 × 份数，或按附带文档的页数算）；
        // 都没有时仍是 null。
        estPrice: data.est_price,
      }]
      receipt.value = orders
      reset()
      announceOrders(orders)
      return
    }

    //    文件单：文件**早就传上去了**（选完文件就自动预上传），这里只是拿那几个
    //    token 去建单 —— 所以这一下几乎不花时间。
    //    **一次提交只发一个 group = 一张单 = 一个单号**：每份文件带自己的
    //    档位 / 份数 / 单双面（PreparedOrderFile），服务端按份记录。
    //    上一版把参数相同的合并、不同的拆成几张单，那种「多份多个号」已经废掉了。
    if (!readyRows.value.length) return
    const submittedFiles = readyRows.value.map((row) => ({
      file_token: row.token as string,
      filename: row.name,
      price_item_id: row.priceItemId,
      copies: row.copies,
      duplex: row.duplex,
    }))
    const data = await orderApi.createFromPrepared({
      groups: [{
        files: submittedFiles,
        // group 级的那几项是**兜底值**（某一份没带自己的值时才用到）。
        // 类型上 duplex 是必填，所以给第一份的值；它不会盖掉上面逐份的参数。
        duplex: readyRows.value[0]?.duplex ?? 'single',
        remark: remark.value.trim(),
      }],
    })
    //    服务端回的 orders 才是权威（单号、档位名、预估价都是它算的）。
    //    它没给 orders（老服务端）时退回单条那一套 —— 缓存里的旧页面场景。
    //    `data.orders` 仍然按数组读：兼容的那一侧还在，只是这一版只会有一张。
    const first = data.orders?.[0]
    const orders: ReceiptOrder[] = [{
      code: first?.pickup_code ?? data.pickup_code,
      label: first?.price_item_name ?? '',
      files: first?.files ?? submittedFiles.map((item) => item.filename),
      estPrice: first ? first.est_price : data.est_price,
    }]
    receipt.value = orders
    reset()
    announceOrders(orders)
  } catch (error) {
    if (error instanceof ApiError && error.status === 429) {
      // 额度已满：刷新 pending 列表，让顶部的「放弃这次上传」入口可见
      void refreshPending()
      message.error('上传额度已满 · 需先终止一份未完成任务')
    } else {
      message.error(error instanceof ApiError ? error.message : '提交未完成 · 稍后重试')
    }
  } finally {
    submitting.value = false
    // 不管成没成，服务端那边的会话状态都变了（成功则清掉，失败则留下一份半成品），
    // 这条提醒要跟着实际情况走。
    void refreshPending()
  }
}

/** 回执上的预估合计（有一张算不出价就不显示总数 —— 报一个漏算的数字比不报更糟）。 */
const receiptEstimate = computed<number | null>(() => {
  const orders = receipt.value
  if (!orders?.length) return null
  if (orders.some((order) => order.estPrice === null)) return null
  return orders.reduce((sum, order) => sum + (order.estPrice ?? 0), 0)
})

onMounted(async () => {
  await Promise.all([refreshPending(), loadOptions(), loadPrefs()])
  // 偏好里的默认价目项可能已经被管理员停用或删掉了 —— 那种情况下下拉框里
  // 找不到它的名字，会显示成一个裸 id（看着像乱码）。对一次账，不在清单里就当没设。
  // ⚠️ 只在清单**真的拉到了**时对账：拉失败时 priceItems 是空的，
  //    照对不误会把一个好好的默认项当成「已删除」丢掉（而且用户看不到任何提示）。
  if (!optionsError.value && priceItemId.value !== null
      && !priceItems.value.some((item) => item.id === priceItemId.value)) {
    priceItemId.value = null
    formDefaults.value.priceItemId = null
  }
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <!-- 成功回执：单号是页面上最该被看到的信息。
         这里给整页唯一一段「有分量」的动效（rare 档，一单只出现一次）：0.97→1 的缩放配淡入，
         只用透明度会像换了张图，不像「东西出现了」。起点是 0.97 而不是 0 —— 现实里没有东西
         从虚无里冒出来，scale(0) 一律禁止。 -->
    <Transition
      enter-active-class="transition duration-[var(--motion-dur-slow)] ease-out"
      enter-from-class="opacity-0 scale-[0.97]"
      leave-active-class="transition duration-[var(--motion-dur-fast)] ease-out"
      leave-to-class="opacity-0"
    >
      <section
        v-if="receipt"
        class="panel mb-4 border-[var(--accent-tint-border)] p-4 sm:p-5"
        role="status"
        aria-live="polite"
      >
        <div class="flex items-start gap-3">
          <span
            class="mt-0.5 grid size-8 shrink-0 place-items-center"
            style="background-color: var(--status-done-bg); color: var(--status-done)"
            aria-hidden="true"
          >
            <CircleCheck :size="17" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-heading text-base font-bold">
              {{ receipt.length === 1 ? '订单已提交' : `已提交 ${receipt.length} 张订单` }}
            </p>
            <!-- 不显示内部订单 id：学生面前只有单号（下面那块就是）。
                 这里原先写「订单 #12」，而 12 是数据库主键 —— 学生照着它
                 跟打印员对不上任何东西。

                 多张订单（批量里混杂着黑白和彩色）时**每一张一行**：
                 单号是取件时唯一的凭证，少写一个他就得去订单页翻。 -->
            <ul v-if="receipt.length > 1" class="mt-1.5 space-y-1">
              <li v-for="order in receipt" :key="order.code" class="text-xs text-ink-2">
                <span class="tnum font-semibold">{{ pickupCodeLabel(order.code) }}</span>
                <span class="text-ink-3">
                  · {{ order.label || '未选档' }}
                  <template v-if="order.files.length"> · {{ order.files.join(' / ') }}</template>
                </span>
              </li>
            </ul>
            <!-- 一张单：把「几份、一个号」写在同一句里。单号下面还有一块大字，
                 这里重复一次是有意的 —— 这一行是页面跳走之前扫一眼就记住的那句。 -->
            <p v-else class="mt-0.5 text-sm text-ink-3">
              一张单 · {{ receipt[0].files.length || 1 }} 份文件 · 单号
              <span class="tnum font-semibold">{{ pickupCodeLabel(receipt[0].code) }}</span>
              <template v-if="receipt[0].label"> · {{ receipt[0].label }}</template>
            </p>
            <!-- 文件名仍然列出来（一行、超长省略）：学生要能核对「我传的确实是这几份」。 -->
            <p
              v-if="receipt.length === 1 && receipt[0].files.length"
              class="mt-0.5 truncate text-xs text-ink-3"
              :title="receipt[0].files.join(' / ')"
            >
              {{ receipt[0].files.join(' / ') }}
            </p>
            <div class="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
              <!-- 单号是学生端唯一的"情绪峰值"：整页最该被记住的一件东西。
                   给它长臂角标框 + 底下一整条刻度尺 —— 像一张被框起来的凭证。
                   下单成功后这一页会立刻跳去我的订单（回执跨换场留着），所以这块面板平时
                   只是"跳转失败时还在原地"的兜底；单号另外写进了那条回执的补充行。
                   多张订单时这里放最大号的那个「第一个单号」，其余在上面逐行列出。 -->
              <div class="bracket-lg px-4 py-3" style="--bracket-arm: 26px">
                <div class="tech-label mb-1.5 text-ink-3 tech-label--cn text-xs">
                  单号{{ receipt.length > 1 ? ' · 共 ' + receipt.length + ' 张单' : '' }}
                </div>
                <div
                  class="tnum font-heading text-[34px] leading-none font-bold tracking-[0.12em]"
                  style="color: var(--accent-text)"
                >
                  {{ pickupCodeLabel(receipt[0].code) }}
                </div>
                <span class="ticks mt-2.5 block w-full" aria-hidden="true" />
              </div>
              <NButton size="small" quaternary @click="receipt = null">再下一单</NButton>
            </div>
            <!-- 预估价：跟单号并排，因为这两个数是学生下单后立刻要记住的。
                 「预估」两个字**必须留着** —— 它按提交的文件页数算的，
                 最终金额由管理员看过文件之后核定。
                 多张订单时显示**合计**（逐张的金额在回执行里没有，学生要看明细
                 可以去我的订单 —— 那里有每一单自己的预估价）。 -->
            <p
              v-if="receiptEstimate !== null"
              class="tnum mt-2 text-sm text-ink-2"
            >
              预估 <span class="font-semibold">¥{{ receiptEstimate.toFixed(2) }}</span>
              <span class="text-xs text-ink-3">
                · {{ receipt.length > 1 ? '合计 · ' : '' }}以管理员核定为准
              </span>
            </p>
            <p class="mt-3 text-xs text-ink-3">
              管理员接单打印后，凭单号到打印点取件。
            </p>
          </div>
        </div>
      </section>
    </Transition>

    <!-- 未完成的大文件上传：列出全部，每条给「放弃」入口 -->
    <section
      v-for="session in pending"
      :key="session.upload_id"
      class="panel mb-4 flex items-start gap-3 p-3.5"
      role="status"
    >
      <span
        class="mt-0.5 grid size-7 shrink-0 place-items-center"
        style="background-color: var(--accent-tint); color: var(--secondary)"
        aria-hidden="true"
      >
        <History :size="15" />
      </span>
      <div class="min-w-0 flex-1">
        <p class="truncate text-sm font-semibold">
          《{{ session.filename }}》
          <span v-if="session.resumed" class="text-primary">（续传）</span>
        </p>
        <p class="mt-0.5 text-xs text-ink-3">
          {{ prettySize(session.size) }} · {{ session.received_count }}/
          {{ session.total_chunks }} 片
          · 剩余 {{ session.expires_in < 60 ? session.expires_in + ' 秒' : Math.ceil(session.expires_in / 60) + ' 分钟' }}
        </p>
        <NProgress
          v-if="session.total_chunks > 0"
          :percentage="Math.round((session.received_count / session.total_chunks) * 100)"
          :height="4"
          :border-radius="0"
          :show-indicator="false"
          class="mt-2"
        />
      </div>
      <NButton size="small" @click="cancelSession(session.upload_id)" :disabled="submitting">
        终止上传
      </NButton>
    </section>

    <PageHeader
      heading="md"
      title="下单打印"
      :subtitle="
        usingPreset
          ? '选预设服务下单 · 管理员按其说明打印 · 无需上传文件'
          : 'PDF / Word / 图片 · 上传后由管理员接单打印'
      "
    />

    <div class="p-4 sm:p-5">

      <!-- ① 选择文件 -->
      <StageHead code="01" title="选择文件" step="STEP 1/3" class="mb-3" />

      <!-- 下单方式。两个按钮而不是下拉框：这是两条完全不同的流程（一个有文件、
           一个没有），下拉框会让人以为「选了预设之后还能再补个文件」。 -->
      <NRadioGroup v-model:value="mode" :disabled="submitting" class="mb-4 flex flex-wrap gap-2">
        <NRadioButton value="file">上传文件</NRadioButton>
        <NRadioButton value="preset" :disabled="!presets.length && !optionsLoading">
          使用预设打印服务
        </NRadioButton>
      </NRadioGroup>

      <!-- 预设清单拉不到时给一句人话。不写它的话，第二个按钮是灰的、
           下拉框是空的，看起来就是这个功能没做。 -->
      <p v-if="optionsError" class="mb-4 px-3 py-2 text-xs" role="alert"
         style="background-color: var(--err-bg); color: var(--err)">
        {{ optionsError }}
      </p>

      <!-- 预设模式：上传区整块换成预设选择。**不是把上传框 disabled 掉** ——
           置灰的拖拽区还在那儿招手，学生照样会把文件拖上去，然后什么也不发生。 -->
      <template v-if="usingPreset">
        <NFormItem label="选择预设打印服务" :show-feedback="false" class="!mb-0">
          <NSelect
            v-model:value="presetId"
            :options="presetOptions"
            :loading="optionsLoading"
            :disabled="submitting || !presets.length"
            placeholder="选择打印服务"
            class="w-full"
          />
        </NFormItem>

        <div
          v-if="selectedPreset"
          class="mt-3 border p-3"
          style="border-color: var(--border); background-color: var(--muted)"
        >
          <div class="flex items-start gap-3">
            <span
              class="mt-0.5 grid size-9 shrink-0 place-items-center"
              style="background-color: var(--accent-tint); color: var(--accent-text)"
              aria-hidden="true"
            >
              <Printer :size="17" />
            </span>
            <p class="min-w-0 flex-1 text-sm leading-relaxed whitespace-pre-wrap">
              {{ selectedPreset.content }}
            </p>
          </div>

          <!-- v22：这条服务自带的档位与定价。有哪样显示哪样 ——
               都没设置时不占一行（老预设就是只有一句描述）。 -->
          <div
            v-if="selectedPreset.price_item_label || selectedPreset.preset_price != null"
            class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-3"
          >
            <span v-if="selectedPreset.price_item_label" class="flex items-center gap-1">
              <ReceiptText :size="12" aria-hidden="true" />
              本条服务指定：{{ selectedPreset.price_item_label }}
              <span v-if="selectedPreset.price_item_stopped" style="color: var(--warn)">
                · 该档已停用
              </span>
            </span>
            <span
              v-if="selectedPreset.preset_price !== null && selectedPreset.preset_price !== undefined"
              class="tnum"
            >
              定价 ¥{{ selectedPreset.preset_price.toFixed(2) }} / 份
            </span>
          </div>

          <!-- 附带文档：**在线看**，不给下载。按钮只在真的有文档时才出现 ——
               一个点了没反应的按钮比没有按钮更让人困惑。 -->
          <NButton
            v-if="selectedPreset.has_doc"
            size="tiny"
            quaternary
            class="mt-1.5"
            @click="presetDocOpen = true"
          >
            <template #icon><ScanEye :size="12" /></template>
            查看附带文档{{ selectedPreset.doc_name ? ` · ${selectedPreset.doc_name}` : '' }}
          </NButton>
        </div>
      </template>

      <!-- 关掉 Naive 自带的文件列表：下面那块「已选文件」才是真正的列表
           （每份带自己的打印参数与上传状态）。不关的话 Naive 会再画一份，
           于是每份文件在屏幕上出现两行 —— 多出来的那一行既没有参数，
           点它的删除也只会删掉同一份的另一半。 -->
      <NUpload
        v-else
        v-model:file-list="fileList"
        :default-upload="false"
        :multiple="true"
        :max="batchMax"
        :accept="ACCEPT"
        :show-file-list="false"
        class="block"
        :disabled="submitting"
        @change="onFileChange"
      >
        <NUploadDragger>
          <div class="flex flex-col items-center gap-2 py-5">
            <span
              class="grid size-11 place-items-center border"
              style="
                background-color: var(--accent-tint);
                border-color: var(--accent-tint-border);
                color: var(--accent-text);
              "
              aria-hidden="true"
            >
              <Upload :size="20" />
            </span>
            <p class="text-base font-semibold">点击选择文件 · 或将文件拖入此处</p>
            <p class="tech-label text-ink-3 text-2xs">
              PDF · JPG · PNG · DOC · DOCX · 一次最多 {{ batchMax }} 份
            </p>
          </div>
        </NUploadDragger>
      </NUpload>

      <!-- 已选文件：**每份一行**，各自带一套打印参数与自己那份的上传状态。
           选完就自动预上传（还没下单）—— 学生不必知道后面那一步叫什么，
           他只需要看到「文件传上去了没有」。 -->
      <div
        v-if="!usingPreset && rows.length"
        class="mt-3 space-y-2"
      >
        <div
          v-for="row in rows"
          :key="row.key"
          class="border p-3"
          style="border-color: var(--border)"
        >
          <div class="flex items-center gap-3">
            <span
              class="grid size-9 shrink-0 place-items-center"
              style="background-color: var(--muted); color: var(--secondary)"
              aria-hidden="true"
            >
              <FileText :size="17" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-semibold">{{ row.name }}</p>
              <p class="tnum text-2xs text-ink-3">
                {{ prettySize(row.size) }}
                <template v-if="row.status === 'uploading'">
                  · 上传中 {{ row.percent }}%
                </template>
                <template v-else-if="row.status === 'ready'">
                  <template v-if="row.pages"> · 共 {{ row.pages }} 页</template>
                  <template v-else> · 页数读不出</template>
                </template>
              </p>
            </div>
            <NButton
              size="tiny"
              quaternary
              :disabled="submitting || rows.length < 2"
              title="把这一份的打印参数套到全部文件上"
              @click="applyRowToAll(row)"
            >
              应用到全部
            </NButton>
            <NButton
              quaternary
              class="!h-8 !w-8 !p-0"
              size="small"
              :aria-label="`移除 ${row.name}`"
              :disabled="submitting"
              @click="removeRow(row.key)"
            >
              <template #icon><X :size="15" /></template>
            </NButton>
          </div>

          <NProgress
            v-if="row.status === 'uploading'"
            type="line"
            :percentage="row.percent"
            :height="4"
            :border-radius="0"
            :show-indicator="false"
            class="mt-2.5"
          />

          <div
            v-else-if="row.status === 'failed'"
            class="mt-2 flex flex-wrap items-center gap-2 text-xs"
            style="color: var(--warn)"
          >
            <TriangleAlert :size="13" aria-hidden="true" />
            <span>{{ row.error }}</span>
            <NButton size="tiny" quaternary :disabled="submitting" @click="prepareRows([row.key])">
              重试上传
            </NButton>
          </div>

          <!-- 这一份的打印参数。**每份各一套**（2026-09-28 起）：
               「第一份黑白 2 份、第二份彩色 1 份」这种事，一次选完就能一次下掉。 -->
          <div class="mt-2.5 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
            <NSelect
              v-model:value="row.priceItemId"
              :options="priceItemOptions"
              :loading="optionsLoading"
              :disabled="submitting || optionsLoading || row.status !== 'ready'"
              size="small"
              placeholder="选择档位 · 含纸张与单价"
              @update:value="() => { if (!duplexAllowedFor(row.priceItemId)) row.duplex = 'single'; scheduleQuote() }"
            />
            <NRadioGroup
              v-model:value="row.duplex"
              size="small"
              :disabled="submitting || row.status !== 'ready'"
              @update:value="scheduleQuote()"
            >
              <NRadioButton value="single">单面</NRadioButton>
              <NRadioButton value="double" :disabled="!duplexAllowedFor(row.priceItemId)">双面</NRadioButton>
            </NRadioGroup>
            <NInputNumber
              v-model:value="row.copies"
              size="small"
              :min="COPIES_MIN"
              :max="COPIES_MAX"
              :precision="0"
              :step="1"
              :disabled="submitting || row.status !== 'ready'"
              class="w-[104px]"
              placeholder="份数"
              @update:value="scheduleQuote()"
            />
          </div>

          <!-- 这一份自己的小计。**逐份给**是这次改动的重点之一：
               一次提交只有一张单、一个总价，学生要能看出「钱是花在哪一份上的」。
               算不出价时这一行明说「这一份暂时算不出」，而不是留空。 -->
          <p
            v-if="rowQuoteText(row)"
            class="mt-1.5 tnum text-2xs"
            :style="
              rowQuote(row)?.price === null
                ? 'color: var(--warn)'
                : 'color: var(--text-tertiary)'
            "
          >
            {{ rowQuoteText(row) }}
          </p>
        </div>

        <!-- 一次提交 = 一张单：这句贴在文件列表下方，因为「多选会不会多出几个单号」
             正是刚选完文件的这一刻最容易被误解的事（上一版确实会拆成几个单号）。
             份数范围也写在这儿：每行的输入框本来就夹着 1-50，但一屏小字里
             不写出来的话，学生只会在按到边界时才撞上。 -->
        <p v-if="rows.length" class="text-xs text-ink-3">
          <template v-if="rows.length > 1">
            共 {{ rows.length }} 份文件 · 会合成
            <strong class="text-ink-2">一张单、一个单号</strong>；
            每份的档位 / 份数 / 面数在单子里各自记录。
          </template>
          每份份数 {{ COPIES_MIN }}–{{ COPIES_MAX }}。
        </p>
      </div>

      <!-- ② 打印参数 -->
      <StageHead
        code="02"
        title="打印参数"
        step="STEP 2/3"
        class="mt-6 mb-3"
      />

      <!-- 文件模式：参数**挂在每份文件上**（上面那几行各有一套）——
           这里只留一句说明，不再放一套会让人误以为「整批共用」的表单。
           一次选 5 份、参数都一样时，用某一行上的「应用到全部」一下搞定。 -->
      <p v-if="!usingPreset && rows.length > 1" class="text-xs text-ink-3">
        每份文件的档位 / 面数 / 份数都在上面那一行里改；
        这 {{ rows.length }} 份合成一张单（只给一个单号），参数不同的份在单子里各自记录。
      </p>

      <div v-if="usingPreset" class="grid gap-4 sm:grid-cols-2">
        <!-- 价目项：纸张 + 类型 + 单价都在这一条里（v20 起取代了"颜色 + 纸张"两个下拉）。
             颜色由它决定，所以这一屏不再有「打印颜色」那一项 —— 让学生再选一次颜色，
             就会出现「选了彩色、价目项却是黑白」这种自相矛盾的组合。

             v22：预设**绑了**档位时这一格变成只读 —— 以那条服务指定的为准。
             服务端也这么判（orders.resolve_preset_item 忽略请求里带的 id），
             所以这里不是"界面上不让改"，而是"这条服务本来就只有一种打法"。 -->
        <NFormItem label="类型 / 纸张" :show-feedback="false" class="!mb-0 sm:col-span-2">
          <div v-if="presetBoundItem" class="flex w-full min-w-0 flex-wrap items-center gap-2">
            <span class="tech-label px-2 py-0.5 tech-label--cn text-xs"
                  style="background-color: var(--accent-tint); color: var(--accent-text)">
              本条服务指定
            </span>
            <span class="min-w-0 flex-1 truncate text-sm font-semibold">
              {{ presetBoundItem.price_item_label || '（这一档已删除）' }}
            </span>
            <NButton
              size="small"
              quaternary
              :disabled="submitting"
              title="查看完整价目表与说明"
              @click="priceTableOpen = true"
            >
              <template #icon><ReceiptText :size="15" /></template>
              价目表
            </NButton>
          </div>
          <div v-else class="flex w-full min-w-0 items-center gap-2">
            <NSelect
              v-model:value="priceItemId"
              :options="priceItemOptions"
              :loading="optionsLoading"
              :disabled="submitting || optionsLoading"
              class="min-w-0 flex-1"
              placeholder="选择档位 · 含纸张与单价"
              @update:value="onItemChange"
            />
            <NButton
              size="small"
              quaternary
              :disabled="submitting"
              title="查看完整价目表与说明"
              @click="priceTableOpen = true"
            >
              <template #icon><ReceiptText :size="15" /></template>
              价目表
            </NButton>
          </div>
        </NFormItem>
        <NFormItem label="单双面" :show-feedback="false" class="!mb-0">
          <!-- ⚠️ **只禁「双面」那一个按钮**，不要用 :disabled 把整个 NRadioGroup 关掉 ——
               那样「单面」也会变灰，而它恰恰是这一档唯一能选的（实测截图里两个都灰着，
               看起来像「这一档不能下单」）。 -->
          <NRadioGroup v-model:value="duplex" :disabled="submitting" @update:value="formTouched = true">
            <NRadioButton value="single">单面</NRadioButton>
            <NRadioButton value="double" :disabled="!duplexAllowed">双面</NRadioButton>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="份数" :show-feedback="false" class="!mb-0">
          <NInputNumber
            v-model:value="copies"
            :min="COPIES_MIN"
            :max="COPIES_MAX"
            :precision="0"
            :step="1"
            :disabled="submitting"
            class="w-full"
            placeholder="份数"
            @update:value="formTouched = true"
          />
        </NFormItem>
      </div>
      <p v-if="usingPreset" class="mt-2 text-xs text-ink-3">
        份数 {{ COPIES_MIN }}-{{ COPIES_MAX }}。
        <template v-if="(presetBoundItem) && !duplexAllowed">
          本档<strong>不支持双面</strong>，按单面计。
        </template>
        <template v-if="!priceItemOptions.length && !optionsLoading">
          价目表未配置 · 仍可下单 · 金额由管理员核定。
        </template>
        <template v-if="defaultsApplied">
          已按「设置」里的<strong>默认参数</strong>预填 · 可随时修改。
        </template>
      </p>

      <!-- 价目表弹窗：想细看才点（价目项下拉里已经带了单价，这里给的是完整那张表 + 注） -->
      <PriceTableDialog v-model:show="priceTableOpen" />

      <!-- 实时预估：文件传完（或选了预设）就显示，改一次份数/档位/面数就重算一次。
           它是这一页在改版之后新增的**唯一**一处「还没提交就有反馈」的地方 ——
           「预估」三个字必须留着：最终金额由管理员看过文件之后核定，
           这个数只是让学生在按下提交之前心里有数。 -->
      <div
        v-if="quote || quotes.length || quoting"
        class="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border px-3 py-2.5"
        style="
          border-color: var(--accent-tint-border);
          background-color: var(--accent-tint-soft);
        "
        role="status"
        aria-live="polite"
      >
        <span class="tech-label text-ink-3 tech-label--cn text-xs">预估费用</span>
        <span class="tnum font-heading text-xl font-bold" style="color: var(--accent-text)">
          {{ quoteText }}
        </span>
        <span v-if="quoteHint" class="text-xs text-ink-3">· {{ quoteHint }}</span>
        <Loader2
          v-if="quoting"
          :size="13"
          class="animate-spin"
          style="color: var(--text-tertiary)"
          aria-hidden="true"
        />
      </div>

      <NFormItem label="备注（选填）" :show-feedback="false" class="mt-4">
        <NInput
          v-model:value="remark"
          type="textarea"
          :maxlength="200"
          show-count
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="例：只打印第 3–10 页 / 需装订"
          :disabled="submitting"
        />
      </NFormItem>

      <!-- ③ 提交 -->
      <StageHead code="03" title="提交" step="STEP 3/3" class="mt-6 mb-3" />

      <!-- 上传进度**不在这里**：文件是选完就传的（见上面那张文件卡片），
           点「提交订单」时只剩一次建单请求，几乎不花时间。
           原先那块进度条挂在这里，是因为那时「提交」才等于「开始上传」——
           改版之后留着它，它会一直显示 0%，看着像卡住了。 -->

      <div class="flex flex-wrap items-center gap-3">
        <!-- 按钮禁用时把原因**写在脸上**：title 提示在触摸端出不来（禁用的按钮连 hover 都没有），
             学生只会看到一颗按不动的按钮，还以为是自己点得不对。 -->
        <p v-if="blockReason" class="basis-full text-xs font-semibold" style="color: var(--warn)">
          {{ blockReason }}
        </p>
        <!-- **本次功能的关键提示，必须一直可见**（不是 title、不是帮助里的一句话）：
             「多选多单」是学生最容易误解的一条，误解的代价是他以为要跑几趟取件。
             参数不同的份不拆分，而是各自记在同一张单里。 -->
        <p v-if="!usingPreset && rows.length" class="basis-full text-xs leading-5 text-ink-2">
          这 {{ rows.length }} 份会合成一张单，只给一个单号；参数不同的份在单子里各自记录。
        </p>
        <NButton
          type="primary"
          size="large"
          class="!font-bold"
          :loading="submitting"
          :disabled="!!blockReason"
          :title="blockReason ?? undefined"
          @click="submit"
        >
          <template #icon>
            <Layers v-if="usingPreset" :size="16" />
            <Rocket v-else :size="16" />
          </template>
          {{ submitting ? '提交中' : '提交订单' }}
        </NButton>
        <span class="tech-label flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs">
          <Hash :size="12" />
          <template v-if="usingPreset">无需上传文件 · 提交后即生成单号</template>
          <template v-else-if="chunkCount">分 {{ chunkCount }} 片上传 · 断了可续传</template>
          <template v-else>上传完成后即生成单号</template>
        </span>
      </div>
    </div>

    <!-- 预设附带文档：**在线看**，页面里没有下载入口（见 PresetDocViewer 开头那段）。
         用 NModal 而不是抽屉：文档是「看一眼就关」的东西，抽屉会让人以为它是个工作区。 -->
    <NModal
      :show="presetDocOpen"
      preset="card"
      :bordered="false"
      class="max-w-[860px]"
      :title="`附带文档 · ${selectedPreset?.doc_name ?? ''}`"
      @update:show="(value: boolean) => (presetDocOpen = value)"
    >
      <PresetDocViewer
        v-if="selectedPreset"
        :key="selectedPreset.id"
        :preset-id="selectedPreset.id"
        :doc-name="selectedPreset.doc_name ?? null"
        :width="740"
      />
    </NModal>
  </div>
</template>
