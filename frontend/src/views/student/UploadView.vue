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
import type { ChunkSession, EstimateResponse, PriceItem, PrintPreset } from '@/api/types'
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
/** 已经传上去的字节数与总量 —— 进度条用（预上传那一次，不是提交）。 */
const uploadedBytes = ref(0)
const totalBytes = ref(0)
/** 服务端还留着的未完成上传，进页面时提醒一句 */
const pending = ref<ChunkSession[]>([])
/** 当前分片会话的 upload_id，组件卸载时若会话仍未完成就调 cancel 释放额度 */
const activeChunkUploadId = ref<string | null>(null)
/** 服务端给的启用中预设与纸张 */
const presets = ref<PrintPreset[]>([])
const priceItems = ref<PriceItem[]>([])
/** 预设/纸张清单没拉到时的提示语。清单为空**不等于**没有可选项 ——
 *  这两种情况在下拉框里长得一模一样（都是空的），但一个是「还没配置」、
 *  一个是「网络出问题了」。不给提示的话，学生只会以为这功能不存在。 */
const optionsError = ref('')
const optionsLoading = ref(true)
/** 下单成功后的回执（类型与 announceOrder 的入参是同一个 —— 两处各写一份，
 *  加一个字段时必然会漏掉一处，而漏掉的那处不报错，只是那一格不显示）。 */
const receipt = ref<OrderInfo | null>(null)

/* ---------- 实时预估（见文件开头那段「上传与下单是两步」）----------
 *
 *  三个状态分开表达，因为它们在界面上是三句话：
 *    · prepareState —— 文件传上去了没有（传的过程中显示进度条）；
 *    · fileToken    —— 传上去了才有，之后每次试算都要带上它；
 *    · quote        —— 服务端最后一次算出来的价（可能算不出，hint 里写着为什么）。
 */
type PrepareState = 'idle' | 'uploading' | 'ready' | 'failed'
const prepareState = ref<PrepareState>('idle')
/** 预上传返回的凭据。**文件单提交时用它，不用再把文件传一遍。** */
const fileToken = ref<string | null>(null)
const preparedPages = ref<number | null>(null)
const prepareError = ref('')
/** 预上传期间的进度（它独立于「提交」那一次上传的进度）。 */
const preparePercent = ref(0)
const uploading = computed(() => prepareState.value === 'uploading')

const quote = ref<EstimateResponse | null>(null)
const quoting = ref(false)
/** 防抖用的定时器：份数是输入框，连着按上下箭头会一秒打出七八次请求。 */
let quoteTimer: number | null = null

const selected = computed(() => fileList.value[0] ?? null)
const selectedFile = computed(() => selected.value?.file ?? null)

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

/** 选中的那一档。决定「双面能不能选」，也决定提交时要不要带 price_item_id。 */
const selectedItem = computed(
  () => priceItems.value.find((item) => item.id === priceItemId.value) ?? null,
)

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
  return selectedItem.value?.price_double !== null
})

/** 只有大文件才会走分片，提前告诉用户「会分几片」，免得他以为卡住了。 */
const chunkCount = computed(() => {
  const size = selectedFile.value?.size ?? 0
  return size > 8 * 1024 * 1024 ? Math.ceil(size / (8 * 1024 * 1024)) : 0
})

const progressHint = computed(() => {
  if (preparePercent.value >= 99) return '正在解析文件 · 请稍候'
  return '上传中 · 勿关闭页面 / 勿断网'
})

/** 能不能提交。分两种模式各算一次，别合成一个布尔表达式 ——
 *  按钮上要显示的「为什么按不动」是两套完全不同的话。
 *
 *  文件模式多一道「文件必须已经传完」：预上传现在是**自动**跑的（选完文件就传），
 *  所以学生完全有可能在传完之前就点了提交 —— 那时 file_token 还不存在，
 *  建单接口会顶回来。在这一句里挡掉，比让他点一次、再看到一屏报错要好。 */
const blockReason = computed<string | null>(() => {
  if (submitting.value) return null
  if (usingPreset.value) {
    if (!presets.value.length) return '暂无可用预设打印服务'
    if (presetId.value === null) return '尚未选择预设打印服务'
    return null
  }
  if (!selected.value) return '尚未选择文件'
  if (uploading.value) return '文件上传中 · 传完即可提交'
  if (prepareState.value !== 'ready') return '文件还没传完 · 重新选择一次'
  return null
})

async function loadOptions(): Promise<void> {
  optionsLoading.value = true
  optionsError.value = ''
  try {
    const data = await printOptionsApi.load()
    presets.value = data.presets ?? []
    priceItems.value = data.price_items ?? []
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
    if (activeChunkUploadId.value === uploadId) activeChunkUploadId.value = null
    message.success('上传已终止 · 额度已释放')
    await refreshPending()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '终止未完成 · 稍后重试')
  }
}

/** 组件卸载时：若分片会话仍在进行就取消它，避免残留占用额度 */
onBeforeUnmount(() => {
  if (activeChunkUploadId.value) {
    void chunkApi.cancel(activeChunkUploadId.value).catch(() => {})
  }
  // 防抖定时器也要停掉：组件都没了还去打一次试算，纯属白跑一趟。
  if (quoteTimer !== null) window.clearTimeout(quoteTimer)
})

function reset(): void {
  fileList.value = []
  remark.value = ''
  presetId.value = null
  mode.value = 'file'
  uploadedBytes.value = 0
  totalBytes.value = 0
  // 预上传与报价的那一份状态：清干净，下一单从头来。
  // （fileList 置空本身会触发 watcher 把 prepareState 打回 idle，
  //   但 token / 报价不会跟着走 —— 它们是「上一条文件」的东西，必须显式清。）
  fileToken.value = null
  preparedPages.value = null
  prepareState.value = 'idle'
  preparePercent.value = 0
  prepareError.value = ''
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

async function refreshQuote(): Promise<void> {
  // 预设模式还没选服务、文件模式还没有 token —— 都没什么可算的。
  let payload: { preset_id: number } | { file_token: string } | null = null
  if (usingPreset.value) {
    if (presetId.value !== null) payload = { preset_id: presetId.value }
  } else if (fileToken.value) {
    payload = { file_token: fileToken.value }
  }
  if (!payload) {
    quote.value = null
    return
  }
  quoting.value = true
  try {
    const data = await orderApi.estimate({
      ...payload,
      copies: copies.value ?? COPIES_DEFAULT,
      duplex: duplex.value,
      price_item_id: priceItemId.value,
    })
    quote.value = data
    //    服务端归正过的单双面要跟着改回来：这一档不支持双面时它会回 single，
    //    而屏幕上还写着「双面」的话，学生看到的选项和计价就不是一回事了。
    if (data.duplex !== duplex.value) duplex.value = data.duplex
  } catch {
    //    试算失败**不报错**：它是锦上添花的东西，为它弹一个红条会让下单页看着像坏了。
    //    界面上那句「暂时算不出预估」已经把状态说清楚了。
    quote.value = null
  } finally {
    quoting.value = false
  }
}

const quoteText = computed(() => {
  if (quoting.value && !quote.value) return '估算中'
  if (!quote.value || quote.value.price === null) return '暂时算不出预估'
  return `预估 ¥${quote.value.price.toFixed(2)}`
})

const quoteHint = computed(() => {
  const data = quote.value
  if (!data) return ''
  if (data.price === null) return data.hint || '以管理员核定为准'
  const parts = ['以管理员核定为准']
  if (data.pages !== null) parts.unshift(`按 ${data.pages} 页`)
  return parts.join(' · ')
})

/** 选完文件立刻预上传。**它不下单** —— 只是把文件交上去换一个 token，
 *  服务端据此数出页数（页数只能在服务端数：客户端报上来的数直接进公式，不可信）。 */
async function prepareSelectedFile(): Promise<void> {
  const file = selectedFile.value
  if (!file) {
    prepareState.value = 'idle'
    fileToken.value = null
    preparedPages.value = null
    return
  }
  prepareState.value = 'uploading'
  prepareError.value = ''
  fileToken.value = null
  preparedPages.value = null
  preparePercent.value = 0
  totalBytes.value = file.size
  try {
    const data = await prepareUpload(
      file,
      (state) => {
        preparePercent.value = state.percent
        uploadedBytes.value = state.uploaded
      },
      (uploadId) => {
        activeChunkUploadId.value = uploadId
      },
    )
    activeChunkUploadId.value = null
    fileToken.value = data.file_token
    preparedPages.value = data.pages
    prepareState.value = 'ready'
    uploadedBytes.value = file.size
    void refreshQuote()
  } catch (error) {
    activeChunkUploadId.value = null
    prepareState.value = 'failed'
    prepareError.value = error instanceof ApiError ? error.message : '文件上传未完成'
    if (error instanceof ApiError && error.status === 429) {
      // 额度已满：刷新 pending 列表，让顶部的「放弃这次上传」入口可见
      void refreshPending()
    }
  } finally {
    void refreshPending()
  }
}

/** 换文件 → 重新预上传（顺带把上一条的报价清掉，免得旧价留在屏幕上）。 */
watch(selectedFile, () => {
  quote.value = null
  if (usingPreset.value) return
  void prepareSelectedFile()
})

/** 换路径（文件 ↔ 预设）：两边都清一次。 */
watch(mode, () => {
  quote.value = null
  if (usingPreset.value) {
    if (presetId.value !== null) scheduleQuote()
  } else if (selectedFile.value) {
    if (fileToken.value) scheduleQuote()
    else void prepareSelectedFile()
  }
})

/** 换打印服务 → 它的纸与价都变了。 */
watch(presetId, () => {
  quote.value = null
  if (usingPreset.value) scheduleQuote()
})

/** 价目项 / 份数 / 单双面：这三个是「改一下就要重算」的那一组。 */
watch([priceItemId, copies, duplex], () => scheduleQuote())

/** 下单成功的回执信息。
 *
 *  estPrice 是**预估价**（服务端按下单时的文件页数算的），null = 没估出来。
 *  它只出现在两句「下次看不到」的地方：这条回执、以及成功面板 ——
 *  学生下单后最想知道的两件事就是「单号是多少」和「大概多少钱」，
 *  而后者在这一刻之后要翻到我的订单页才有（那边也有一份，口径相同）。 */
type OrderInfo = {
  orderId: number
  code: string
  filename: string
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
function announceOrder(info: OrderInfo): void {
  // 预估价只在这一行里带一下（「预估」两个字不能省，它还不是最终价）：
  // 回执是学生下单后唯一会认真看的一屏，而金额正是他此刻最想知道的数字之一。
  const estimate = info.estPrice === null
    ? ''
    : ` · 预估 ¥${info.estPrice.toFixed(2)}`
  showReceipt({
    code: 'ORDER SUBMITTED',
    title: '订单已提交',
    detail: `单号 ${pickupCodeLabel(info.code)} · ${info.filename}${estimate}`,
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
    // 份数已经是 number（NInputNumber），这里原样传 —— 不做字符串拼装、不做算术。
    // 顺着后端的口径走：份数只认整数，范围由服务端最终裁定。
    const common = {
      duplex: duplex.value,
      remark: remark.value.trim(),
      copies: copies.value ?? COPIES_DEFAULT,
      price_item_id: priceItemId.value,
    }

    if (usingPreset.value) {
      const preset = selectedPreset.value
      if (!preset) return
      const data = await orderApi.createPresetOrder({ preset_id: preset.id, ...common })
      const info = {
        orderId: data.order_id,
        code: data.pickup_code,
        filename: preset.content,
        // v22 起预设单也可能有预估价（预设价 × 份数，或按附带文档的页数算）；
        // 都没有时仍是 null。
        estPrice: data.est_price,
      }
      receipt.value = info
      reset()
      announceOrder(info)
      return
    }

    //    文件单：文件**早就传上去了**（选完文件就自动预上传），这里只是拿那个
    //    token 去建单 —— 所以这一下几乎不花时间，进度条那块也不会再出现。
    const file = selectedFile.value
    const token = fileToken.value
    if (!file || !token) return
    const data = await orderApi.createFromPrepared({
      file_token: token,
      filename: file.name,
      ...common,
    })
    const info = {
      orderId: data.order_id,
      code: data.pickup_code,
      filename: file.name,
      estPrice: data.est_price,
    }
    receipt.value = info
    reset()
    announceOrder(info)
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
            <p class="font-heading text-base font-bold">订单已提交</p>
            <!-- 不显示内部订单 id：学生面前只有单号（下面那块就是）。
                 这里原先写「订单 #12」，而 12 是数据库主键 —— 学生照着它
                 跟打印员对不上任何东西。 -->
            <p class="mt-0.5 truncate text-sm text-ink-3">
              {{ receipt.filename || '已提交' }}
            </p>
            <div class="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
              <!-- 单号是学生端唯一的"情绪峰值"：整页最该被记住的一件东西。
                   给它长臂角标框 + 底下一整条刻度尺 —— 像一张被框起来的凭证。
                   下单成功后这一页会立刻跳去我的订单（回执跨换场留着），所以这块面板平时
                   只是"跳转失败时还在原地"的兜底；单号另外写进了那条回执的补充行。 -->
              <div class="bracket-lg px-4 py-3" style="--bracket-arm: 26px">
                <div class="tech-label mb-1.5 text-ink-3 tech-label--cn text-xs">单号</div>
                <div
                  class="tnum font-heading text-[34px] leading-none font-bold tracking-[0.12em]"
                  style="color: var(--accent-text)"
                >
                  {{ pickupCodeLabel(receipt.code) }}
                </div>
                <span class="ticks mt-2.5 block w-full" aria-hidden="true" />
              </div>
              <NButton size="small" quaternary @click="receipt = null">再下一单</NButton>
            </div>
            <!-- 预估价：跟单号并排，因为这两个数是学生下单后立刻要记住的。
                 「预估」两个字**必须留着** —— 它按提交的文件页数算的，
                 最终金额由管理员看过文件之后核定。 -->
            <p
              v-if="receipt.estPrice !== null"
              class="tnum mt-2 text-sm text-ink-2"
            >
              预估 <span class="font-semibold">¥{{ receipt.estPrice.toFixed(2) }}</span>
              <span class="text-xs text-ink-3">· 以管理员核定为准</span>
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

      <NUpload
        v-else
        v-model:file-list="fileList"
        :default-upload="false"
        :max="1"
        :accept="ACCEPT"
        class="block"
        :disabled="submitting"
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
            <p class="tech-label text-ink-3 text-2xs">PDF · JPG · PNG · DOC · DOCX</p>
          </div>
        </NUploadDragger>
      </NUpload>

      <!-- 已选文件。选完就**自动预上传**（还没下单）—— 所以这里同时是那一次
           上传的进度面板：传完了显示页数，失败了给「重试上传」。
           学生不必知道后面那一步叫什么，他只需要看到「文件传上去了没有」。 -->
      <div
        v-if="!usingPreset && selected"
        class="mt-3 border p-3"
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
            <p class="truncate text-sm font-semibold">{{ selected.name }}</p>
            <p class="tnum text-2xs text-ink-3">
              {{ selectedFile ? prettySize(selectedFile.size) : '' }}
              <template v-if="uploading"> · 上传中 {{ preparePercent }}%</template>
              <template v-else-if="prepareState === 'ready'">
                <template v-if="preparedPages"> · 共 {{ preparedPages }} 页</template>
                <template v-else> · 页数读不出</template>
              </template>
            </p>
          </div>
          <NButton
            quaternary
            class="!h-8 !w-8 !p-0"
            size="small"
            aria-label="移除已选文件"
            :disabled="submitting"
            @click="fileList = []"
          >
            <template #icon><X :size="15" /></template>
          </NButton>
        </div>

        <NProgress
          v-if="uploading"
          type="line"
          :percentage="preparePercent"
          :height="4"
          :border-radius="0"
          :show-indicator="false"
          class="mt-2.5"
        />
        <p v-if="uploading" class="mt-1 flex flex-wrap justify-between gap-2 text-2xs text-ink-3">
          <span>{{ progressHint }}</span>
          <span class="tnum">{{ prettySize(uploadedBytes) }} / {{ prettySize(totalBytes) }}</span>
        </p>

        <div
          v-else-if="prepareState === 'failed'"
          class="mt-2 flex flex-wrap items-center gap-2 text-xs"
          style="color: var(--warn)"
        >
          <TriangleAlert :size="13" aria-hidden="true" />
          <span>{{ prepareError }}</span>
          <NButton size="tiny" quaternary :disabled="submitting" @click="prepareSelectedFile">
            重试上传
          </NButton>
        </div>
      </div>

      <!-- ② 打印参数 -->
      <StageHead code="02" title="打印参数" step="STEP 2/3" class="mt-6 mb-3" />

      <div class="grid gap-4 sm:grid-cols-2">
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
      <p class="mt-2 text-xs text-ink-3">
        份数 {{ COPIES_MIN }}-{{ COPIES_MAX }}。
        <template v-if="(selectedItem || presetBoundItem) && !duplexAllowed">
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
        v-if="quote || quoting"
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
