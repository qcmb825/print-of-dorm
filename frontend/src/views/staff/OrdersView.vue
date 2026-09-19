<script setup lang="ts">
/** 订单台：待接单池 / 我接的单 / 全部，支持状态筛选、分页、接单释放改状态、计费、下载文件。
 *  窄屏切换成卡片列表 —— 表格在手机上没法用，但管理员确实会拿手机接单。 */
import { computed, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useDocumentVisibility, useIntervalFn, useMediaQuery } from '@vueuse/core'
import {
  CircleDollarSign,
  Download,
  FolderPlus,
  Info,
  Inbox,
  Lock,
  Package,
  RefreshCw,
  ScanLine,
  Unlock,
} from '@lucide/vue'
import {
  NAlert,
  NButton,
  NDataTable,
  NDropdown,
  NInput,
  NModal,
  NPagination,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
  type DataTableColumns,
  type DropdownOption,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { staffOrderApi, staffPrintOptionsApi } from '@/api/endpoints'
import {
  ORDER_PRESET_FILTER_NONE,
  ORDER_STATUSES,
  ORDER_STATUSES_MANUAL,
  type Order,
  type OrderStatus,
  type PrintPreset,
} from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import PickupCheckDialog from '@/components/PickupCheckDialog.vue'
import StatCard from '@/components/StatCard.vue'
import StatusTag from '@/components/StatusTag.vue'
import { useAuthStore } from '@/stores/auth'
import {
  COLOR_TYPE_LABEL,
  DUPLEX_LABEL,
  contactLabel,
  copiesLabel,
  normalizePrice,
  orderFileLabel,
  paperLabel,
  pickupCodeLabel,
  priceLabel,
  shortTime,
} from '@/utils/format'

/** 待计费。单独提成常量是因为它在这个文件里到处要判：计费按钮能不能点、
 *  改状态要不要置灰、计费按钮是「计费」还是「改价」。 */
const WAIT_PRICE: OrderStatus = '待计费'

/** 已取件。取件时钱是当面结清的，所以这个是金额的终点，改价一路挡到这里为止。 */
const DONE: OrderStatus = '已取件'

/** 可取了。它同时是「学生到底收没收到提醒」这件事唯一有意义的位置 ——
 *  取件邮件只在进入这个状态时发一次。 */
const READY: OrderStatus = '可取了'

/** 需人工通知：已经可取件了，但这位学生推不出邮箱，邮件那一路发不出去。
 *
 *  判定用的是后端给的 owner_mailbox_missing，**不在这里重写一遍 QQ_RE** ——
 *  那套规则改一个字，本地这份不会跟着改，界面就会开始说谎，而且不报错。
 *  条件里的「可取了」不能省：别的状态还没走到发通知那一步，
 *  提前挂个标签等于催管理员去做一件现在还不该做的事。 */
function needsManualNotify(order: Order): boolean {
  return order.status === READY && order.owner_mailbox_missing === true
}

/** 「需人工通知」标签的样式。用 --warn 系列而不是借某个状态色：
 *  状态色跟着订单状态走，哪天有人调了「待计费」的颜色，这个标签会莫名其妙跟着变。 */
const NOTIFY_BADGE_STYLE =
  'color: var(--warn); background-color: var(--warn-tint); border-color: var(--warn-tint-border)'

const auth = useAuthStore()
const message = useMessage()
const router = useRouter()

/** 进详情页。用 router.push 而不是把按钮包进 RouterLink：
 *  这只是「换个页面」，没有中键新开标签的需求，而 a 标签包按钮
 *  在窄屏上会带来一整套焦点和嵌套交互元素的麻烦。 */
function openDetail(order: Order): void {
  void router.push(`/staff/orders/${order.id}`)
}

/** 权限判定依据当前登录账号，直接从 store 取，避免布局再往下传一层 props。
 *
 *  看的是 advancedAllowed（默认管理员），**不是** role === 'super'：
 *  对外角色已经收敛成 admin / user 两种，那个字符串永远不会出现，
 *  写出来的分支只会静默失效（界面上就是「别人接的单碰不得」）。
 *  这里不用 advanced（高级视图开关）：开关只决定界面多显示什么，
 *  而这里判的是权限 —— 关掉高级视图的人仍然是默认管理员，照样能代别人计费。 */
const isDefaultAdmin = computed(() => auth.advancedAllowed)
const currentUserId = computed(() => auth.user?.id ?? 0)

const AUTO_REFRESH_MS = 10_000

/** 宽屏表格各列宽之和。11 列加起来比容器（max-w-[1400px]）还宽，不给 scroll-x 的话
 *  NDataTable 会把表格直接撑出容器，而外层是 overflow-hidden —— 末尾那几列会被
 *  裁掉，连横向滚动都够不着（「详情」那颗按钮就是最先消失的那个）。
 *  **改任何一列的宽度时，这个数字要跟着改。**
 *
 *  卡片断点从 900px 提到 1024px，与侧栏的 lg 断点、账号管理页对齐：900–1100px
 *  这一段本来仍走表格，只能靠 NDataTable 内层容器自动横滚 —— 11 列挤在不到
 *  1000px 的宽度里，连「取件码 / 费用」都要左右拖才看得到，还不如卡片列表。
 *  `:scroll-x` 依旧显式声明（它就是表格这一侧的横滚契约，与账号管理页同一口径）。 */
const ORDER_TABLE_MIN_WIDTH = 1474

const orders = ref<Order[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(20)
const status = ref<string>('')
const scope = ref<'pool' | 'mine' | 'all'>('pool')
const loading = ref(true)
const autoRefresh = ref(true)
const busyId = ref<number | null>(null)

/** 请求序号闸门：只接受最后一次发起请求的响应，避免慢响应覆盖新数据
 *  （刚撤回的单「复活」、刚改的状态看似回退）。 */
let requestSeq = 0

/* ---------- 检索与筛选 ----------
 *  关键词、打印服务分组、隐藏已取件这三个都交给服务端去筛。
 *  页面上一共才 20 条，在前端再筛一道看着很便宜，但它会跟分页打架：
 *  筛选掉半页之后剩下的条数对不上 total，翻到第二页会出现「怎么又有了」
 *  ——而正确答案全在库里，不在手上这一页里。 */
const keyword = ref('')
const presetFilter = ref<string>('')
/** 默认隐藏已取件。打印员看的是「还有哪些活没干完」，而已取件是终态、
 *  还是个累计数，混在里面只会把真正待办的几单顶到下一页去。
 *  要看历史时把它关掉就行，开关就在筛选栏里，不用去改默认值。 */
const excludeDone = ref(true)

/** 搜索框防抖。每敲一个字发一次请求的话，输「20220101」要打 8 个包，
 *  而列表本身还有 10 秒一轮的自动刷新在发包；柜台那台机子未必快。 */
const KEYWORD_DEBOUNCE_MS = 300
const keywordPending = ref(false)
let keywordTimer: ReturnType<typeof setTimeout> | null = null

/** 打印服务下拉的候选项。特地取**管理端**那份名单（含已停用项）：
 *  一条预设停用之后，早就归在它下面的老单不会跟着消失，
 *  而这份下拉恰恰是拿来找这些老单的。只给启用项就会把它们变成搜不到的单。 */
const presets = ref<PrintPreset[]>([])

/** 取件核对弹窗。它是个二级窗口、不是路由页：柜台交件时手不能离开这一屏，
 *  跳走再跳回来会把后面的列表翻页和筛选全重置掉。 */
const pickupOpen = ref(false)

const isNarrow = useMediaQuery('(max-width: 1024px)')

const scopeOptions = [
  { label: '待接单池', value: 'pool' },
  { label: '我接的单', value: 'mine' },
  { label: '全部订单', value: 'all' },
]

const statusOptions = [
  { label: '全部状态', value: '' },
  ...ORDER_STATUSES.map((item) => ({ label: item, value: item })),
]

// 改状态下拉里**没有**「待计费」：那个状态只能由计费动作产生（后端
// config.ORDER_STATUSES_MANUAL 也是同一份名单）。让它出现在这里，管理员点了
// 就会造出「已经标过价、又退回待计费」的单，金额和状态互相矛盾。
const statusDropdownOptions: DropdownOption[] = ORDER_STATUSES_MANUAL.map((item) => ({
  label: item,
  key: item,
}))

/** 预设内容是一整句话，塞进下拉框必须截断；但截断之后好几条会长得一模一样
 *  （都是「打印学生证复印件……」），所以悬停要看得到全文。
 *
 *  已停用的要加个尾巴：它们照样能选（老单归在下面），但得让人知道自己选的
 *  是一条已经下线的服务，而不是它又被启用了。 */
function presetOptionLabel(preset: PrintPreset, max = 16): string {
  const text = preset.content.replace(/\s+/g, ' ').trim()
  const short = text.length > max ? `${text.slice(0, max)}…` : text
  return preset.is_active === 0 ? `${short}（已停用）` : short
}

/** 筛选栏的打印服务下拉。前两项是「不过滤」和「什么都没归」，都不是某条预设的 id，
 *  所以值一律当字符串传 —— 'none' 这个哨兵值两边各写一份字面量，
 *  改一处漏一处不会报错，只会让「未归类」静默变成「全部订单」。 */
const presetOptions = computed(() => [
  { label: '全部打印服务', value: '' },
  { label: '未归类', value: ORDER_PRESET_FILTER_NONE },
  ...presets.value.map((preset) => ({
    label: presetOptionLabel(preset),
    value: String(preset.id),
  })),
])

/** 这一单被归到了哪条服务（下单选预设的也算，服务端用 COALESCE 合成同一个键）。
 *  null = 真没归。模板里判「要不要显示分组名」就看它。 */
function hasGroup(order: Order): boolean {
  return order.preset_group_id !== null && order.preset_group_id !== undefined
}

/** 「改分组」下拉里的选项。已经归过的那一条才给「取消归类」：
 *  没归过的单上显示这个，等于邀请人去取消一个不存在的东西。 */
function groupDropdownOptions(order: Order): DropdownOption[] {
  const options: DropdownOption[] = presets.value.map((preset) => ({
    label: presetOptionLabel(preset, 20),
    key: String(preset.id),
  }))
  if (hasGroup(order)) {
    options.push({ type: 'divider', key: 'group-divider' })
    options.push({ label: '取消归类', key: ORDER_PRESET_FILTER_NONE })
  }
  return options
}

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / size.value)))

const poolSummary = computed(() => ({
  pool: orders.value.filter((order) => order.claimed_by === null).length,
  mine: orders.value.filter((order) => order.claimed_by === currentUserId.value).length,
  ready: orders.value.filter((order) => order.status === '可取了').length,
  unpriced: orders.value.filter((order) => order.status === WAIT_PRICE).length,
}))

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  // 本次请求的序号：回来时若已有更新的请求发出，就丢弃这份响应。
  // 轮询（10s）与用户操作触发的刷新会并发，先发的慢响应后到会覆盖新数据
  // （刚撤回的单"复活"、刚改的状态看似回退）。
  const mySeq = ++requestSeq
  try {
    const data = await staffOrderApi.list({
      page: page.value,
      size: size.value,
      status: status.value || undefined,
      scope: scope.value,
      // 空串一律转 undefined：服务端对空关键词会跳过那一段 WHERE，
      // 但把 '' 明明白白发过去，就是在说「我在按一个空模式搜」。
      q: keyword.value.trim() || undefined,
      preset: presetFilter.value || undefined,
      exclude_done: excludeDone.value ? '1' : undefined,
    })
    if (mySeq !== requestSeq) return
    orders.value = data.orders
    total.value = data.total
  } catch (error) {
    // 报错也只在「自己仍是最新请求」时提示：旧请求的失败盖在新数据之上，
    // 会让管理员以为刚刷出来的列表是坏的。
    if (!silent && mySeq === requestSeq)
      message.error(error instanceof ApiError ? error.message : '加载订单失败')
  } finally {
    // loading / 转圈状态也只由最后一次请求收尾：被丢弃的旧响应提前灭掉它，
    // 会让列表在真正的新数据到达前先「亮一下」。
    if (mySeq === requestSeq) {
      loading.value = false
      // 搜索框的转圈跟着请求走：防抖等待期间转，请求一回来就停。
      keywordPending.value = false
    }
  }
}

/** 接单人本人（或默认管理员）可以释放、下载 —— 与后端判定保持一致。 */
function canRelease(order: Order): boolean {
  return (
    order.claimed_by !== null &&
    (isDefaultAdmin.value || order.claimed_by === currentUserId.value)
  )
}

function canDownload(order: Order): boolean {
  // 预设单没有文件，后端会回 400「这一单用的是预设服务，没有文件可下载」。
  // 按钮得跟着一起消失：它本来就和「释放」一个条件，天生会跟着亮起来，
  // 而一颗点了就弹错的按钮比没有按钮更糟（管理员会以为文件丢了）。
  return (
    !!order.filename &&
    order.claimed_by !== null &&
    (isDefaultAdmin.value || order.claimed_by === currentUserId.value)
  )
}

/** 改状态按钮点不动的原因；null 表示可以点。分支与后端 `api_update_status` 一一对应。 */
function statusBlockReason(order: Order): string | null {
  if (order.status === WAIT_PRICE) return '还没计费 · 先填金额'
  if (!canReachOrder(order)) {
    // 未接单和「别人接的」是两回事：一个是还没轮到自己，一个是轮不到自己
    return order.claimed_by === null ? '先接单才能改状态' : '这单是别人接的'
  }
  return null
}

function canChangeStatus(order: Order): boolean {
  return statusBlockReason(order) === null
}

/** 这一单归不归自己管（是自己接的，或者自己是默认管理员）—— 管的是「按不按得动」。
 *  未接单时 `claimed_by` 是 null，而 `currentUserId` 是个数字，自然对不上。 */
function canReachOrder(order: Order): boolean {
  return isDefaultAdmin.value || order.claimed_by === currentUserId.value
}

/** 计费按钮点不动的原因；null 表示可以点。
 *  分三种而不是一句笼统的「不能计费」：按钮灰在那儿的时候，
 *  管理员得知道下一步该干什么 —— 是去接单，还是去找揽下这单的人。 */
function priceBlockReason(order: Order): string | null {
  if (order.status === DONE) return '订单已取件，金额不再改动'
  if (order.claimed_by === null) return '先接单，看过文件后再填金额'
  if (!canReachOrder(order)) return '这单是别人接的 · 只有接单人能计费'
  return null
}

function canPrice(order: Order): boolean {
  return priceBlockReason(order) === null
}

/* ---------- 计费 ----------
 *  顺序是**先接单、后计费**：金额是按文件本身算出来的（几页、黑白还是彩色、
 *  单面还是双面），没接过单就没人打开过那份文件，只能对着文件名猜价钱。
 *  接单人就是看过文件的人，所以计费权限也只给接单人（默认管理员不受限）。
 *  这里的每一条都跟后端 `api_price_order` 的分支一一对应。 */

const priceOrder = ref<Order | null>(null)
const priceInput = ref('')
const pricing = ref(false)

/** 空输入不算错（用户刚开始输），填了东西才给格式提示 */
const priceError = computed(() =>
  priceInput.value.trim() === '' ? null : normalizePrice(priceInput.value) === null
    ? '金额 ≤ 99999.99，最多两位小数'
    : null,
)

function openPrice(order: Order): void {
  // 按钮已经置灰了，这里再挡一道：入口不止一处，少写一个就漏一个。
  // 提示直接用那边算好的原因，两句文案分叉的话，以后改一处就会对不上。
  const blocked = priceBlockReason(order)
  if (blocked) {
    message.warning(blocked)
    return
  }
  priceOrder.value = order
  // 已有金额就带出来，方便微调；没有就是空，让管理员自己填
  priceInput.value = order.price === null || order.price === undefined ? '' : order.price.toFixed(2)
}

async function submitPrice(): Promise<void> {
  const order = priceOrder.value
  if (!order) return
  const amount = normalizePrice(priceInput.value)
  if (amount === null) {
    message.error('金额格式不对')
    return
  }
  pricing.value = true
  try {
    // 后端要的就是一个字符串（PRICE_RE 按十进制文本校验），
    // 不在前端转 Number —— 转一道就会出现 0.1+0.2 这种二进制浮点尾巴。
    await staffOrderApi.price(order.id, amount)
    message.success(
      order.price === null || order.price === undefined
        ? `订单 #${order.id} 已计费 ¥${Number(amount).toFixed(2)}`
        : `订单 #${order.id} 金额已改为 ¥${Number(amount).toFixed(2)}`,
    )
    priceOrder.value = null
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '计费失败')
    // 409「刚被别人计过费了」这类要刷一下才看得到新金额
    await load(true)
  } finally {
    pricing.value = false
  }
}
async function claim(order: Order): Promise<void> {
  busyId.value = order.id
  try {
    await staffOrderApi.claim(order.id)
    message.success(`已接单 #${order.id}`)
    await load(true)
  } catch (error) {
    // 抢单失败（409）是正常竞争，如实把后端的话转给用户
    message.error(error instanceof ApiError ? error.message : '接单失败')
    await load(true)
  } finally {
    busyId.value = null
  }
}

async function release(order: Order): Promise<void> {
  busyId.value = order.id
  try {
    await staffOrderApi.release(order.id)
    message.success(`已释放 #${order.id}`)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '释放失败')
  } finally {
    busyId.value = null
  }
}

async function changeStatus(order: Order, next: OrderStatus): Promise<void> {
  if (next === order.status) return
  busyId.value = order.id
  try {
    await staffOrderApi.setStatus(order.id, next)
    message.success(`订单 #${order.id} 已更新为「${next}」`)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '更新状态失败')
  } finally {
    busyId.value = null
  }
}

async function download(order: Order): Promise<void> {
  try {
    // 这里不传文件大小：列表接口的 Order 类型里没有 file_size（只有详情接口才回），
    // 所以走 client 里那条兜底超时；详情页那边才是按真实大小估的。
    await staffOrderApi.download(order.id, orderFileLabel(order))
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '下载失败')
  }
}

function statusButton(order: Order) {
  return h(
    NDropdown,
    {
      options: statusDropdownOptions,
      trigger: 'click',
      disabled: !canChangeStatus(order),
      onSelect: (key: string) => void changeStatus(order, key as OrderStatus),
    },
    {
      default: () =>
        h(
          NButton,
          {
            size: 'tiny',
            quaternary: true,
            disabled: !canChangeStatus(order),
            // 灰着的时候也要说清差在哪一步：待计费的单也能走到岔路上来
            // （自己刚接、还没填金额）
            title: statusBlockReason(order) ?? undefined,
          },
          { default: () => '改状态' },
        ),
    },
  )
}

const columns = computed<DataTableColumns<Order>>(() => [
  {
    title: '订单',
    key: 'id',
    width: 168,
    render: (row) =>
      h('div', { class: 'min-w-0' }, [
        // 文件名同时是详情入口：它本来就是这一列里最大的一块可点区域，
        // 比旁边再加一颗小按钮好按得多（手机上尤其明显）。
        // 标签走 orderFileLabel：预设单的 filename 是空串，直接渲染就是一列点不动的空气。
        h(
          RouterLink,
          {
            to: `/staff/orders/${row.id}`,
            class: 'block truncate text-sm font-semibold hover:underline',
            title: row.preset_content
              ? `${row.preset_content} · 点开看详情`
              : `${row.filename} · 点开看详情`,
          },
          { default: () => orderFileLabel(row) },
        ),
        h('div', { class: 'tnum text-2xs opacity-60' }, `#${row.id} · ${shortTime(row.create_time)}`),
      ]),
  },
  {
    title: '下单人',
    key: 'owner_nickname',
    // 从 132 放到 150：多了一行联系方式。邮箱地址是最长的那种，
    // 150 仍然要 truncate，但至少有 title 可以悬停看全。
    width: 150,
    render: (row) =>
      h('div', { class: 'min-w-0' }, [
        h('div', { class: 'truncate text-sm' }, row.owner_nickname ?? '（账号已注销）'),
        h('div', { class: 'truncate text-xs opacity-60' }, row.owner_dorm ?? '—'),
        // 联系方式：名字和宿舍都定位不到人（宿舍楼里几十号人，
        // 而昵称本来就是自填的），出事了得有个能直接喊到人的号码。
        h(
          'div',
          {
            class: 'truncate text-2xs opacity-60',
            title: contactLabel(row.owner_contact_type, row.owner_contact),
          },
          contactLabel(row.owner_contact_type, row.owner_contact),
        ),
        // 「需人工通知」只在取件那一步有意义，所以它和联系方式同列。
        needsManualNotify(row)
          ? h(
              'span',
              {
                class:
                  'mt-1 inline-flex items-center border px-1.5 py-[1px] text-xs font-bold whitespace-nowrap',
                style: NOTIFY_BADGE_STYLE,
                title: '推不出邮箱（填的是微信或没填）· 取件邮件发不出去，需手动联系',
              },
              '需人工通知',
            )
          : null,
      ]),
  },
  {
    // 规格两行，但两行不再等价：第一行是「拿错就会出事」的两项（几份、单双面），
    // 第二行才是颜色和纸张。
    //
    // 原来的写法把份数塞在第二行末尾、11px 小字，扫视一整屏订单时整行略过去
    // 是常事 —— 而拿错份数比拿错文件更难收拾，纸已经过机了。所以份数做成
    // .spec-chip 的牌子，单双面提到加粗 13px。
    // 份数用 copiesLabel 而不是 `copies ?? 1`：本次升级前的老订单是 null，
    // 显示成「1 份」等于替它们编了一个没人记得的数字。
    title: '规格',
    key: 'spec',
    width: 150,
    render: (row) =>
      h('div', { class: 'min-w-0' }, [
        h('div', { class: 'flex min-w-0 items-center gap-1.5' }, [
          h('span', { class: 'spec-chip tnum' }, copiesLabel(row.copies)),
          h(
            'span',
            { class: 'truncate text-sm font-semibold' },
            row.duplex ? DUPLEX_LABEL[row.duplex] : '单面',
          ),
        ]),
        h(
          'div',
          {
            class: 'mt-0.5 truncate text-xs opacity-60',
            title: row.paper_remark ?? undefined,
          },
          `${row.color_type ? COLOR_TYPE_LABEL[row.color_type] : '黑白'} · ${paperLabel(row.paper_name)}`,
        ),
      ]),
  },
  {
    // 打印服务。两种单在这一列碰头，显示的文案却不一样：
    //  · 下单时就选了预设的单（preset_id 有值）显示 preset_content ——
    //    那是**下单那一刻的快照**，学生当初选的就是这句话；
    //  · 事后被管理员归进来的单（没选预设、自己传了同一份表）显示
    //    preset_group_content —— 那是这条预设的**现值**。
    // 两者混用会让预设改名后这一列的显示来回跳，所以按 preset_id 分流。
    //
    // 右边那颗图标按钮就是「把自传文件的单归进某个预设集合」的入口，
    // 对所有管理员开放（后端同一个口径：它只改一个展示用的分组，
    // 不碰金额、不碰状态）。
    title: '打印服务',
    key: 'preset',
    width: 200,
    render: (row) => {
      const label =
        row.preset_id !== null && row.preset_id !== undefined
          ? (row.preset_content ?? row.preset_group_content ?? null)
          : (row.preset_group_content ?? null)
      const noPresets = presets.value.length === 0
      return h('div', { class: 'flex min-w-0 items-center gap-1' }, [
        label
          ? h('span', { class: 'truncate text-xs opacity-80', title: label }, label)
          : h('span', { class: 'text-xs opacity-40' }, '—'),
        h(
          NDropdown,
          {
            options: groupDropdownOptions(row),
            trigger: 'click',
            disabled: busyId.value === row.id || noPresets,
            onSelect: (key: string) => void setGroup(row, key),
          },
          {
            // #trigger（这里是 default 插槽）**必须恰好一个子节点** ——
            // 把 v-if 塞进来，条件不成立时插槽为空，Naive UI 会当面抛
            // slot[trigger] should have exactly one child。要条件渲染就把
            // v-if 提到 NDropdown 本身上。
            default: () =>
              h(
                NButton,
                {
                  size: 'tiny',
                  quaternary: true,
                  class: '!h-7 !w-7 !p-0',
                  type: hasGroup(row) ? 'primary' : 'default',
                  disabled: busyId.value === row.id || noPresets,
                  title: noPresets
                    ? '打印服务名单没取到，去「打印服务」页看看是不是一条都没有'
                    : hasGroup(row)
                      ? '改分组 / 取消归类'
                      : '归入某条打印服务后，按服务筛选就能和同一批单一起看到',
                },
                { icon: () => h(FolderPlus, { size: 13 }) },
              ),
          },
        ),
      ])
    },
  },
  {
    title: '备注',
    key: 'remark',
    width: 150,
    // 备注是学生写的要求（「只打第 3 页」「A4 双面」）。之前这一列压根不存在，
    // 于是管理员只能挨个点开文件才发现要求写在了备注里。
    // 空备注显示一个淡淡的「—」而不是空白：空白会让人怀疑是没渲染出来。
    render: (row) =>
      row.remark
        ? h('span', { class: 'block truncate text-xs opacity-80', title: row.remark }, row.remark)
        : h('span', { class: 'text-xs opacity-40' }, '—'),
  },
  {
    title: '状态',
    key: 'status',
    width: 92,
    render: (row) => h(StatusTag, { status: row.status, size: 'sm' }),
  },
  {
    title: '费用',
    key: 'price',
    width: 92,
    // 未计费时金额是 null 而不是 0（老库遗留订单也走这条路）——
    // 显示成「￥0.00」会让人以为这单免费。
    render: (row) => {
      const unpriced = row.price === null || row.price === undefined
      if (!unpriced) return h('span', { class: 'tnum text-sm font-bold' }, priceLabel(row.price))
      // 未计费：旁边挂一小段危险斜纹。
      // 斜纹是「这块有约束 / 待处理」的记号，**不铺在文字下面** —— 纹理压在文字上会让
      // 笔画与纹理混同（WCAG F83 型失败），所以只作为独立的色标。
      // 文字色从原来的 opacity-50（等效对比度约 2.6:1）提到三级文字色（4.86:1）：
      // 「未计费」是要读的状态，不是装饰。
      return h('span', { class: 'flex items-center gap-1.5' }, [
        h('span', { class: 'hazard h-3 w-2 shrink-0', 'aria-hidden': 'true' }),
        h('span', { class: 'text-xs text-ink-3' }, priceLabel(row.price)),
      ])
    },
  },
  {
    title: '取件码',
    key: 'pickup_code',
    width: 78,
    render: (row) =>
      h('span', { class: 'tnum text-sm font-bold tracking-wider' }, pickupCodeLabel(row.pickup_code)),
  },
  {
    title: '接单人',
    key: 'claimer_nickname',
    width: 96,
    render: (row) =>
      h(
        'span',
        { class: 'text-xs' },
        row.claimer_nickname ?? h('span', { class: 'opacity-50' }, '未接单'),
      ),
  },
  {
    title: '操作',
    key: 'actions',
    width: 264,
    render: (row) =>
      h('div', { class: 'flex flex-wrap items-center gap-1' }, [
        row.claimed_by === null
          ? h(
              NButton,
              {
                size: 'tiny',
                type: 'primary',
                loading: busyId.value === row.id,
                onClick: () => void claim(row),
              },
              { default: () => '接单' },
            )
          : null,
        h(
          NButton,
          {
            size: 'tiny',
            quaternary: true,
            type: row.price === null || row.price === undefined ? 'primary' : 'default',
            loading: busyId.value === row.id && !priceOrder.value,
            disabled: !canPrice(row),
            // 灰着的原因直接写在按钮上：否则管理员只看到一颗按不动的按钮，
            // 不知道是得先接单、还是该去找揽下这单的人。
            title: priceBlockReason(row) ?? undefined,
            onClick: () => openPrice(row),
          },
          { default: () => (row.price === null || row.price === undefined ? '计费' : '改价') },
        ),
        canChangeStatus(row) ? statusButton(row) : null,
        canRelease(row)
          ? h(
              NButton,
              {
                size: 'tiny',
                quaternary: true,
                disabled: busyId.value === row.id,
                onClick: () => void release(row),
              },
              { default: () => '释放' },
            )
          : null,
        canDownload(row)
          ? h(
              NButton,
              {
                size: 'tiny',
                quaternary: true,
                class: '!h-7 !w-7 !p-0',
                title: '下载文件',
                onClick: () => void download(row),
              },
              { icon: () => h(Download, { size: 13 }) },
            )
          : null,
      ]),
  },
  {
    // 详情入口。单独一列而不是塞进「操作」里：操作列那几个按钮是**改**这一单的，
    // 而详情是「看」。混在一起，管理员容易在急着点「接单」时点进详情页。
    // 文件名本身也是入口（见上面那一列），这里只是把它写明白，别指望所有人都会去点标题。
    title: '',
    key: 'detail',
    width: 34,
    render: (row) =>
      h(
        NButton,
        {
          size: 'tiny',
          quaternary: true,
          class: '!h-7 !w-7 !p-0',
          title: '查看详情与操作记录',
          onClick: () => openDetail(row),
        },
        { icon: () => h(Info, { size: 13 }) },
      ),
  },
])

/* 分页与筛选：不用 watcher 串联，一律由交互事件显式触发，
 * 保证一次点击只发一次请求（watch 链很容易在"重置页码"时双发）。 */
function onPageChange(next: number): void {
  page.value = next
  void load()
}

function onPageSizeChange(next: number): void {
  size.value = next
  page.value = 1
  void load()
}

function onFilterChange(): void {
  page.value = 1
  void load()
}

/** 关键词框的输入回调。只负责重新计时，真正的请求在防抖到点后发出。 */
function onKeywordInput(): void {
  keywordPending.value = true
  if (keywordTimer !== null) clearTimeout(keywordTimer)
  keywordTimer = setTimeout(() => {
    keywordTimer = null
    onFilterChange()
  }, KEYWORD_DEBOUNCE_MS)
}

/** 回车立即搜，不等防抖那 300ms：敲完一串学号再按回车就是一个「现在就查」的
 *  动作，再等一瞬反而像卡了一下。 */
function onKeywordEnter(): void {
  if (keywordTimer !== null) {
    clearTimeout(keywordTimer)
    keywordTimer = null
  }
  onFilterChange()
}

/** 状态筛选。多一道把手：选了「已取件」而「隐藏已取件」还开着时列表必然为空，
 *  后端把两条条件按交集处理是对的（隐藏不该反过来盖掉状态筛选），
 *  但那会让界面看上去像数据丢了。替用户把开关关掉 —— 开关就摆在旁边，
 *  他看得见它动了，比时着列表发懵强。 */
function onStatusChange(value: string): void {
  status.value = value
  if (value === DONE) excludeDone.value = false
  onFilterChange()
}

function onExcludeDoneChange(value: boolean): void {
  excludeDone.value = value
  onFilterChange()
}

/** 这一屏上到底有几个筛子开着？决定空列表要不要给「清除筛选」。
 *
 *  跟各自的**默认值**比，不是跟「空」比 —— 这几个控件的默认值本身就不是空
 *  （scope 是 pool、隐藏已取件是开），只有跟默认值比才知道用户到底动没动过。 */
const hasFilter = computed(
  () =>
    keyword.value.trim() !== '' ||
    presetFilter.value !== '' ||
    status.value !== '' ||
    scope.value !== 'pool' ||
    !excludeDone.value,
)

const emptyText = computed(() =>
  hasFilter.value
    ? '没有匹配的订单，换个条件或清除筛选'
    : scope.value === 'pool'
      ? '待接单池是空的，都处理完了'
      : '没有符合条件的订单',
)

/** 清掉这一屏所有筛子，回到「待接单池 + 隐藏已取件」的默认视角。 */
function resetFilters(): void {
  if (keywordTimer !== null) {
    clearTimeout(keywordTimer)
    keywordTimer = null
  }
  keyword.value = ''
  presetFilter.value = ''
  status.value = ''
  scope.value = 'pool'
  excludeDone.value = true
  onFilterChange()
}

/** 拿打印服务名单。它只服务两个下拉框（筛选、归类），拿不到时这两个框空着
 *  就是全部影响 —— 接单、计费、改状态、下载都不依赖它，所以这里不弹错误、
 *  也不把整页拦下来。真拿不到的话管理器打开下拉时会看到空名单，
 *  比一进页面就被一个红条拦住好。 */
async function loadPresets(): Promise<void> {
  try {
    const data = await staffPrintOptionsApi.presets()
    presets.value = data.presets
  } catch {
    presets.value = []
  }
}

/** 把这一单归入某条打印服务，或者（传 'none'）取消归类。
 *
 *  key 是下拉框给的字符串：预设 id 是数字，'none' 是个哨兵 —— 不在前端
 *  自己转一遍再发，因为「取消归类」到底用什么值表示是后端的约定。 */
async function setGroup(order: Order, key: string): Promise<void> {
  const target = key === ORDER_PRESET_FILTER_NONE ? null : Number(key)
  busyId.value = order.id
  try {
    // 后端已经把三种结果（已归入 / 已取消 / 本来就在这一组里）各自写好了一句话，
    // 直接用它的 —— 在前端再编一句就可能跟服务端的口径对不上。
    const res = await staffOrderApi.setPresetGroup(order.id, target)
    message.success(res.msg)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '归类失败')
    // 404「这条打印服务不存在（可能刚被删掉）」这类要重新拿一份名单，
    // 否则那个已消失的选项会一直赖在下拉框里。
    await loadPresets()
  } finally {
    busyId.value = null
  }
}

/** 取件核对窗口交了一单。不用等下一次轮询：柜台这边刚把纸递出去，
 *  屏幕上那一行还写着「可取了」的话，下一个人来取件时很容易看错行。 */
function onPickupDone(): void {
  void load(true)
}

/* 自动刷新：页面不可见时暂停，避免后台标签页空转 */
const visibility = useDocumentVisibility()
const { pause, resume } = useIntervalFn(() => void load(true), AUTO_REFRESH_MS, { immediate: false })

watch(visibility, (state) => {
  if (state === 'visible' && autoRefresh.value) {
    resume()
    void load(true)
  } else {
    pause()
  }
})

watch(autoRefresh, (enabled) => {
  if (enabled && visibility.value === 'visible') {
    resume()
    void load(true)
  } else {
    pause()
  }
})

onMounted(async () => {
  // 两份清单并行取：打印服务名单不是首屏必要数据，串行等它只会
  // 把订单列表的出来时间往后拖。
  await Promise.all([load(), loadPresets()])
  if (autoRefresh.value) resume()
})

// 防抖计时器必须随组件一起收掉：否则离开这一页之后它到点还会发一次
// 请求，而那些请求属于一个已经不存在的页面（自动刷新用的是 useIntervalFn，
// 它自己会随作用域停，这个裸 setTimeout 不会）。
onBeforeUnmount(() => {
  if (keywordTimer !== null) clearTimeout(keywordTimer)
})
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="订单台" subtitle="接单后即可改状态、下载文件">
      <template #actions>
        <!-- 取件核对是柜台最常用的那个动作，所以它是主按钮（这一排里唯一的实心按钮）。
             它是个弹窗而不是路由页：交件时手不能离开这一屏，跳走再跳回来会把
             后面的列表翻页和筛选全部重置掉。 -->
        <NButton size="small" type="primary" class="!font-bold" @click="pickupOpen = true">
          <template #icon><ScanLine :size="15" /></template>
          取件核对
        </NButton>
        <span class="flex items-center gap-2">
          <NSwitch :round="false" v-model:value="autoRefresh" size="small" aria-label="自动刷新" />
          <span class="tech-label text-ink-3 tech-label--cn text-xs">自动刷新 10s</span>
        </span>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div class="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
      <StatCard label="当页订单" :value="orders.length" :icon="Package" />
      <StatCard label="本页待接单" :value="poolSummary.pool" accent />
      <StatCard label="本页待计费" :value="poolSummary.unpriced" />
      <StatCard label="本页我接的" :value="poolSummary.mine" />
      <StatCard label="本页可取了" :value="poolSummary.ready" />
    </div>

    <div class="panel mb-3 flex flex-wrap items-center gap-2 p-2.5">
      <NSelect
        :value="scope"
        :options="scopeOptions"
        size="small"
        class="!w-[132px]"
        :consistent-menu-width="false"
        aria-label="范围筛选"
        @update:value="
          (value: 'pool' | 'mine' | 'all') => {
            scope = value
            onFilterChange()
          }
        "
      />
      <NSelect
        :value="status"
        :options="statusOptions"
        size="small"
        class="!w-[128px]"
        :consistent-menu-width="false"
        aria-label="状态筛选"
        @update:value="onStatusChange"
      />
      <NSelect
        :value="presetFilter"
        :options="presetOptions"
        size="small"
        class="!w-[180px]"
        :consistent-menu-width="false"
        aria-label="打印服务筛选"
        @update:value="
          (value: string) => {
            presetFilter = value
            onFilterChange()
          }
        "
      />
      <NInput
        v-model:value="keyword"
        size="small"
        class="!w-[280px]"
        placeholder="搜取件码 / 文件名 / 订单号 / 昵称 / 姓名 / 学号 / 宿舍 / 联系方式"
        clearable
        :loading="keywordPending"
        @update:value="onKeywordInput"
        @keydown.enter="onKeywordEnter"
      >
        <template #prefix><Search :size="14" /></template>
      </NInput>
      <!-- 开关的点击处理挂在**文字**上，不是挂在这一圈包裹元素上。
           挂外层的话：点开关本身会先后触发两次 —— 开关自己发 update:value，
           紧接着 click 冒泡到外层又翻一次，两次抵消，结果就是「点了没反应」。
           分开写之后，点文字翻 ref、点开关走它自己的事件，各自只生效一次。 -->
      <span class="flex items-center gap-1.5">
        <NSwitch :round="false" :value="excludeDone" size="small" @update:value="onExcludeDoneChange" />
        <span
          class="tech-label cursor-pointer text-ink-3 tech-label--cn text-xs"
          title="已取件是终态与累计数，看活件时它只会把待办的单顶到下一页"
          @click="onExcludeDoneChange(!excludeDone)"
        >
          隐藏已取件
        </span>
      </span>
      <span class="tech-label ml-auto text-ink-4 tech-label--cn text-xs">共 {{ total }} 条</span>
    </div>

    <div class="bracket panel overflow-hidden">
      <div v-if="loading && !orders.length" class="flex flex-col gap-2 p-3">
        <NSkeleton v-for="index in 5" :key="index" height="52px" :sharp="false" />
      </div>

      <div v-else-if="!orders.length" class="grid place-items-center py-14">
        <EmptyState code="00 / NO ORDER" :title="emptyText" hint="筛出来的空通常不是真的空">
          <template #icon><Inbox :size="28" /></template>
          <!-- 筛出一片空的时候得给条退路：这一屏上同时开着五个筛子
               （范围、状态、打印服务、关键词、隐藏已取件），挨个去关
               很容易漏掉一个，而漏掉的那个恰恰就是把单子藏起来的那个。 -->
          <template v-if="hasFilter" #action>
            <NButton size="small" quaternary @click="resetFilters">清除筛选条件</NButton>
          </template>
        </EmptyState>
      </div>

      <!-- 宽屏：表格 -->
      <NDataTable
        v-else-if="!isNarrow"
        :columns="columns"
        :data="orders"
        :bordered="false"
        :single-line="false"
        :scroll-x="ORDER_TABLE_MIN_WIDTH"
        size="small"
        :row-key="(row: Order) => row.id"
      />

      <!-- 窄屏：卡片。入场规则与学生端订单列表一致：10 秒轮询下只有新单会动。
           宽屏那张 NDataTable 是组件内部渲染的行，套不上 TransitionGroup，所以桌面端没有这项。 -->
      <TransitionGroup
        v-else
        tag="ul"
        class="flex list-none flex-col p-0"
        enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
        enter-from-class="opacity-0 translate-x-1"
        move-class="transition duration-[var(--motion-dur-base)] ease-out"
      >
        <li
          v-for="order in orders"
          :key="order.id"
          class="border-b p-3.5 last:border-b-0"
          style="border-color: var(--border)"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="min-w-0">
              <RouterLink
                :to="`/staff/orders/${order.id}`"
                class="block truncate text-sm font-bold hover:underline"
                :title="`${orderFileLabel(order)} · 点开看详情`"
              >
                {{ orderFileLabel(order) }}
              </RouterLink>
              <p class="tnum mt-0.5 text-2xs text-ink-4">
                #{{ order.id }} · {{ shortTime(order.create_time) }}
              </p>
            </div>
            <StatusTag :status="order.status" size="sm" />
          </div>

          <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-3">
            <span>{{ order.owner_nickname ?? '（已注销）' }} · {{ order.owner_dorm ?? '—' }}</span>
            <!-- 联系方式单独一格而不是拼到上面那句里：拼在一起，窄屏上先被挤掉的
                 恰恰是它，而这行里最要紧的就是它（找不到人时昵称和宿舍都白搭）。 -->
            <span class="truncate">{{ contactLabel(order.owner_contact_type, order.owner_contact) }}</span>
            <span class="tnum">取件码 {{ pickupCodeLabel(order.pickup_code) }}</span>
            <span v-if="order.claimer_nickname">接单 {{ order.claimer_nickname }}</span>
          </div>

          <!-- 邮件发不出去的那一档。宽屏在表格里是个小标签，窄屏得把原因一并写出来：
               手机上只看到「需人工通知」四个字，没人知道是要自己去通知什么。 -->
          <p v-if="needsManualNotify(order)" class="mt-2 flex flex-wrap items-center gap-1.5 text-xs leading-5">
            <span
              class="inline-flex items-center border px-1.5 py-[1px] text-xs font-bold whitespace-nowrap"
              :style="NOTIFY_BADGE_STYLE"
            >
              需人工通知
            </span>
            <span class="text-ink-3">没有可用邮箱 · 取件邮件发不出去，手动联系一下</span>
          </p>

          <!-- 规格。本来是宽屏表格里才有的一列，窄屏哪都没有 —— 于是管理员拿手机接单时
               完全看不到「几份、什么纸」，这两样恰恰是他最需要知道的。
               口径与宽屏那两行完全一致：份数是牌子、单双面加粗，颜色和纸张退到后面。 -->
          <p class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-ink-3">
            <span class="spec-chip tnum">{{ copiesLabel(order.copies) }}</span>
            <span class="text-sm font-semibold text-ink">
              {{ order.duplex ? DUPLEX_LABEL[order.duplex] : '单面' }}
            </span>
            <span>{{ order.color_type ? COLOR_TYPE_LABEL[order.color_type] : '黑白' }}</span>
            <span :title="order.paper_remark ?? undefined">{{ paperLabel(order.paper_name) }}</span>
          </p>

          <!-- 预设服务那一句话。没有文件名可看，这句话就是这一单的全部内容 -->
          <p v-if="order.preset_content" class="mt-2 text-xs leading-5">
            <span class="text-ink-4">预设</span>
            <span class="ml-1.5 text-ink-3">{{ order.preset_content }}</span>
          </p>

          <!-- 事后被归入的服务分组。下单选了预设的单不显示这一行：它上面「预设」
               那一句就是它的服务，同一件事写两遍会让人以为是两回事。 -->
          <p v-if="!order.preset_id && order.preset_group_content" class="mt-2 text-xs leading-5">
            <span class="text-ink-4">服务分组</span>
            <span class="ml-1.5 text-ink-3">{{ order.preset_group_content }}</span>
          </p>

          <!-- 备注：学生的打印要求（「只打第 3 页」这类）。宽屏在表格里有单独一列，
               窄屏之前哪都没有 —— 管理员拿手机接单时完全看不到。
               没有备注就不占位：一排卡片每张都多一行「无备注」，扫视时全是噪声。 -->
          <p v-if="order.remark" class="mt-2 text-xs leading-5">
            <span class="text-ink-4">备注</span>
            <span class="ml-1.5 text-ink-3">{{ order.remark }}</span>
          </p>

          <!-- 金额单独一行：它是这一屏上唯一跟钱有关的数字，跟规格、取件码挤在一行会被略过 -->
          <p class="mt-2 flex flex-wrap items-center gap-x-3 text-xs">
            <span
              :class="
                order.price === null || order.price === undefined
                  ? 'text-ink-4'
                  : 'tnum font-bold'
              "
            >
              费用 {{ priceLabel(order.price) }}
            </span>
            <span v-if="order.pricer_nickname" class="text-ink-4">
              由 {{ order.pricer_nickname }} 定价 {{ order.price_time ? shortTime(order.price_time) : '' }}
            </span>
          </p>

          <div class="mt-3 flex flex-wrap items-center gap-1.5">
            <!-- 接单不再需要额外条件：待计费的单正是要人接过来看文件的，
                 所以这颗按钮就是「我来处理这一单」，不带 Tooltip。
                 （这里原本套着一层 NTooltip，v-if 曾经放进 #trigger 里，
                 订单被接单后插槽变空，Naive UI 抛 slot[trigger] should have
                 exactly one child。现在整个 Tooltip 都没了，坑跟着消失 ——
                 但别再把 v-if 往 #trigger 里面塞。） -->
            <NButton
              v-if="order.claimed_by === null"
              size="tiny"
              type="primary"
              :loading="busyId === order.id"
              @click="claim(order)"
            >
              <template #icon><Lock :size="12" /></template>
              接单
            </NButton>

            <NButton
              size="tiny"
              :quaternary="order.price !== null && order.price !== undefined"
              :type="order.price === null || order.price === undefined ? 'primary' : 'default'"
              :disabled="!canPrice(order)"
              :title="priceBlockReason(order) ?? undefined"
              @click="openPrice(order)"
            >
              <template #icon><CircleDollarSign :size="12" /></template>
              {{ order.price === null || order.price === undefined ? '计费' : '改价' }}
            </NButton>

            <NDropdown
              v-if="canReachOrder(order)"
              :options="statusDropdownOptions"
              trigger="click"
              :disabled="!canChangeStatus(order)"
              @select="(key: string) => changeStatus(order, key as OrderStatus)"
            >
              <NButton
                size="tiny"
                quaternary
                :disabled="!canChangeStatus(order)"
                :title="statusBlockReason(order) ?? undefined"
              >
                改状态
              </NButton>
            </NDropdown>
            <NButton
              v-if="canRelease(order)"
              size="tiny"
              quaternary
              :disabled="busyId === order.id"
              @click="release(order)"
            >
              <template #icon><Unlock :size="12" /></template>
              释放
            </NButton>
            <NButton v-if="canDownload(order)" size="tiny" quaternary @click="download(order)">
              <template #icon><Download :size="12" /></template>
              下载
            </NButton>

            <!-- 「归入服务」。放这里而不是宽屏那张表的位置一致 ——
                 两套渲染得给到同一件事，否则窄屏能点、宽屏不能，看着像抽风。
                 名单没取到就不显示它：空下拉框比没有按钮更让人困惑。 -->
            <NDropdown
              v-if="presets.length"
              :options="groupDropdownOptions(order)"
              trigger="click"
              :disabled="busyId === order.id"
              @select="(key: string) => setGroup(order, key)"
            >
              <NButton size="tiny" quaternary :disabled="busyId === order.id">
                <template #icon><FolderPlus :size="12" /></template>
                {{ hasGroup(order) ? '改分组' : '归入服务' }}
              </NButton>
            </NDropdown>
          </div>
        </li>
      </TransitionGroup>
    </div>

    <div v-if="total > size" class="mt-4 flex justify-center">
      <NPagination
        :page="page"
        :page-size="size"
        :page-count="pageCount"
        :page-sizes="[20, 50, 100]"
        show-size-picker
        @update:page="onPageChange"
        @update:page-size="onPageSizeChange"
      />
    </div>

    <!-- 计费弹窗。金额一律以字符串来回（见 submitPrice 里的理由），
         所以这里用 NInput 而不是 NInputNumber。 -->
    <NModal
      :show="priceOrder !== null"
      preset="card"
      class="max-w-[420px]"
      :title="
        priceOrder && (priceOrder.price === null || priceOrder.price === undefined)
          ? '给订单计费'
          : '修改金额'
      "
      :bordered="false"
      @update:show="(value: boolean) => !value && (priceOrder = null)"
    >
      <template v-if="priceOrder">
        <p class="mb-3 min-w-0 text-sm leading-6 text-ink-3">
          <span
            class="block truncate font-semibold text-ink"
            :title="priceOrder.preset_content ?? priceOrder.filename"
          >
            {{ orderFileLabel(priceOrder) }}
          </span>
          <span class="tnum">
            #{{ priceOrder.id }} ·
            {{ priceOrder.color_type ? COLOR_TYPE_LABEL[priceOrder.color_type] : '黑白' }}
            /
            {{ priceOrder.duplex ? DUPLEX_LABEL[priceOrder.duplex] : '单面' }}
            · {{ copiesLabel(priceOrder.copies) }} · {{ paperLabel(priceOrder.paper_name) }}
          </span>
        </p>
        <!-- 计费时最该看到的就是这一单到底要打什么。预设单没有文件，
             不把它的那句话摆出来的话，管理员只能对着一颗空标题猜价钱。 -->
        <p
          v-if="priceOrder.preset_content"
          class="mb-3 px-3 py-2 text-xs leading-5 whitespace-pre-wrap"
          style="background-color: var(--muted)"
        >
          {{ priceOrder.preset_content }}
        </p>

        <NInput
          v-model:value="priceInput"
          size="large"
          placeholder="例 3.50"
          :status="priceError ? 'error' : undefined"
          @keydown.enter="submitPrice"
        >
          <template #prefix>
            <span class="font-heading font-bold" style="color: var(--accent-text)">¥</span>
          </template>
        </NInput>
        <!-- 这行是 11px 的操作说明，属于要读的字，走三级文字色而不是四级。
             原先的 var(--ink-4) 不存在（见 tokens.css 里 --color-ink-* 的说明），静默失效。 -->
        <p class="mt-2 text-xs" :style="{ color: priceError ? 'var(--err)' : 'var(--text-tertiary)' }">
          {{ priceError ?? '最多两位小数。计费后订单从「待计费」进入「待打印」。' }}
        </p>

        <NAlert
          v-if="priceOrder.price !== null && priceOrder.price !== undefined"
          type="warning"
          :bordered="false"
          class="mt-3"
        >
          当前 ¥{{ priceOrder.price.toFixed(2) }} · 改完学生端立即看到新金额。
        </NAlert>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton quaternary @click="priceOrder = null">取消</NButton>
          <NButton
            type="primary"
            class="!font-bold"
            :loading="pricing"
            :disabled="!priceInput.trim() || priceError !== null"
            @click="submitPrice"
          >
            {{ priceOrder && (priceOrder.price === null || priceOrder.price === undefined) ? '确认计费' : '保存金额' }}
          </NButton>
        </div>
      </template>
    </NModal>

    <!-- 取件核对二级窗口。@done 里去刷一下列表：刚交出去的那一单在本地还是
         「可取了」，不刷的话下一个人来取件时很容易看错行。 -->
    <PickupCheckDialog v-model:show="pickupOpen" @done="onPickupDone" />
  </div>
</template>
