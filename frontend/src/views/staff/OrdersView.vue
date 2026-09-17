<script setup lang="ts">
/** 订单台：待接单池 / 我接的单 / 全部，支持状态筛选、分页、接单释放改状态、计费、下载文件。
 *  窄屏切换成卡片列表 —— 表格在手机上没法用，但管理员确实会拿手机接单。 */
import { computed, h, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useDocumentVisibility, useIntervalFn, useMediaQuery } from '@vueuse/core'
import {
  CircleDollarSign,
  Download,
  Info,
  Inbox,
  Lock,
  Package,
  RefreshCw,
  Unlock,
} from '@lucide/vue'
import {
  NAlert,
  NButton,
  NDataTable,
  NDropdown,
  NEmpty,
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
import { staffOrderApi } from '@/api/endpoints'
import { CONTACT_LABELS, ORDER_STATUSES, ORDER_STATUSES_MANUAL, type Order, type OrderStatus } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import StatCard from '@/components/StatCard.vue'
import StatusTag from '@/components/StatusTag.vue'
import { useAuthStore } from '@/stores/auth'
import {
  COLOR_TYPE_LABEL,
  DUPLEX_LABEL,
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

/** 下单人的联系方式，拼成一行：`QQ 号 12345678` / `微信号 zhang*`。
 *
 *  没填时回一个短横而不是空串：空串会让这一行塔掉，管理员看不出到底是
 *  「他没填」还是「模板没渲染出来」，而这两种情况的处理完全不同。 */
function contactLabel(order: Order): string {
  if (!order.owner_contact) return '—'
  const kind = order.owner_contact_type ? CONTACT_LABELS[order.owner_contact_type] : ''
  return kind ? `${kind} ${order.owner_contact}` : order.owner_contact
}

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

const orders = ref<Order[]>([])
const total = ref(0)
const page = ref(1)
const size = ref(20)
const status = ref<string>('')
const scope = ref<'pool' | 'mine' | 'all'>('pool')
const loading = ref(true)
const autoRefresh = ref(true)
const busyId = ref<number | null>(null)

const isNarrow = useMediaQuery('(max-width: 900px)')

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

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / size.value)))

const poolSummary = computed(() => ({
  pool: orders.value.filter((order) => order.claimed_by === null).length,
  mine: orders.value.filter((order) => order.claimed_by === currentUserId.value).length,
  ready: orders.value.filter((order) => order.status === '可取了').length,
  unpriced: orders.value.filter((order) => order.status === WAIT_PRICE).length,
}))

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await staffOrderApi.list({
      page: page.value,
      size: size.value,
      status: status.value || undefined,
      scope: scope.value,
    })
    orders.value = data.orders
    total.value = data.total
  } catch (error) {
    if (!silent) message.error(error instanceof ApiError ? error.message : '加载订单失败')
  } finally {
    loading.value = false
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
  if (order.status === WAIT_PRICE) return '这单还没计费，先填好金额'
  if (!canReachOrder(order)) {
    // 未接单和「别人接的」是两回事：一个是还没轮到自己，一个是轮不到自己
    return order.claimed_by === null ? '请先接单，再接单后才能改状态' : '这单是别人接的'
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
  if (order.claimed_by === null) return '请先接单，看过文件后再填金额'
  if (!canReachOrder(order)) return '这单是别人接的，只有接单人能给它计费'
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
    ? '金额需为不超过 99999.99 元的数字，最多两位小数'
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
    message.error('请填写正确的金额')
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
            class: 'block truncate text-[13px] font-semibold hover:underline',
            title: row.preset_content
              ? `${row.preset_content} — 点开看详情`
              : `${row.filename} — 点开看详情`,
          },
          { default: () => orderFileLabel(row) },
        ),
        h('div', { class: 'tnum text-[11px] opacity-60' }, `#${row.id} · ${shortTime(row.create_time)}`),
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
        h('div', { class: 'truncate text-[13px]' }, row.owner_nickname ?? '（账号已注销）'),
        h('div', { class: 'truncate text-[11px] opacity-60' }, row.owner_dorm ?? '—'),
        // 联系方式：名字和宿舍都定位不到人（宿舍楼里几十号人，
        // 而昵称本来就是自填的），出事了得有个能直接喊到人的号码。
        h(
          'div',
          { class: 'truncate text-[11px] opacity-60', title: contactLabel(row) },
          contactLabel(row),
        ),
        // 「需人工通知」只在取件那一步有意义，所以它和联系方式同列。
        needsManualNotify(row)
          ? h(
              'span',
              {
                class:
                  'mt-1 inline-flex items-center rounded-full border px-1.5 py-[1px] text-[10px] font-bold whitespace-nowrap',
                style: NOTIFY_BADGE_STYLE,
                title: '这位学生推不出邮箱（填的是微信、或者没填），取件邮件发不出去，需要你手动联系他',
              },
              '需人工通知',
            )
          : null,
      ]),
  },
  {
    // 规格两行：第一行颜色/单双面，第二行份数/纸张。
    // 挤成一行的话这一列要 200px 出头，而「份数」正是打印的人最先要看的东西，
    // 放在第二行反而更抓眼。
    // 份数用 copiesLabel 而不是 `copies ?? 1` —— 本次升级前的老订单是 null，
    // 显示成「1 份」等于替它们编了一个没人记得的数字。
    title: '规格',
    key: 'spec',
    width: 132,
    render: (row) =>
      h('div', { class: 'min-w-0' }, [
        h(
          'div',
          { class: 'truncate text-[12px] opacity-80' },
          `${row.color_type ? COLOR_TYPE_LABEL[row.color_type] : '黑白'} / ${
            row.duplex ? DUPLEX_LABEL[row.duplex] : '单面'
          }`,
        ),
        h(
          'div',
          {
            class: 'truncate text-[11px] opacity-60',
            title: row.paper_remark ?? undefined,
          },
          `${copiesLabel(row.copies)} · ${paperLabel(row.paper_name)}`,
        ),
      ]),
  },
  {
    // 预设单。它没有文件名，也不该在「备注」里找说明 —— 那句话是这项服务本身。
    // 用单独一列而不是塞进规格：它比规格长得多，挤进去会把列宽撑坏。
    title: '打印服务',
    key: 'preset',
    width: 168,
    render: (row) =>
      row.preset_content
        ? h(
            'span',
            {
              class: 'block truncate text-[12px] opacity-80',
              title: row.preset_content,
            },
            row.preset_content,
          )
        : h('span', { class: 'text-[12px] opacity-40' }, '—'),
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
        ? h('span', { class: 'block truncate text-[12px] opacity-80', title: row.remark }, row.remark)
        : h('span', { class: 'text-[12px] opacity-40' }, '—'),
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
    render: (row) =>
      h(
        'span',
        {
          class: row.price === null || row.price === undefined ? 'text-[12px] opacity-50' : 'tnum text-[13px] font-bold',
        },
        priceLabel(row.price),
      ),
  },
  {
    title: '取件码',
    key: 'pickup_code',
    width: 78,
    render: (row) =>
      h('span', { class: 'tnum text-[14px] font-bold tracking-wider' }, pickupCodeLabel(row.pickup_code)),
  },
  {
    title: '接单人',
    key: 'claimer_nickname',
    width: 96,
    render: (row) =>
      h(
        'span',
        { class: 'text-[12px]' },
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
                circle: true,
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
          circle: true,
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
  await load()
  if (autoRefresh.value) resume()
})
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="订单台" subtitle="接单后即可改状态、下载文件">
      <template #actions>
        <span class="flex items-center gap-2">
          <NSwitch v-model:value="autoRefresh" size="small" />
          <span class="tech-label text-ink-3">自动刷新 10s</span>
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
        @update:value="
          (value: string) => {
            status = value
            onFilterChange()
          }
        "
      />
      <span class="tech-label ml-auto text-ink-4">共 {{ total }} 条</span>
    </div>

    <div class="panel overflow-hidden">
      <div v-if="loading && !orders.length" class="flex flex-col gap-2 p-3">
        <NSkeleton v-for="index in 5" :key="index" height="52px" :sharp="false" />
      </div>

      <div v-else-if="!orders.length" class="grid place-items-center py-14">
        <NEmpty :description="scope === 'pool' ? '待接单池是空的，都处理完了' : '没有符合条件的订单'">
          <template #icon><Inbox :size="32" /></template>
        </NEmpty>
      </div>

      <!-- 宽屏：表格 -->
      <NDataTable
        v-else-if="!isNarrow"
        :columns="columns"
        :data="orders"
        :bordered="false"
        :single-line="false"
        size="small"
        :row-key="(row: Order) => row.id"
      />

      <!-- 窄屏：卡片。入场规则与学生端订单列表一致：10 秒轮询下只有新单会动。
           宽屏那张 NDataTable 是组件内部渲染的行，套不上 TransitionGroup，所以桌面端没有这项。 -->
      <TransitionGroup
        v-else
        tag="ul"
        class="flex list-none flex-col p-0"
        enter-active-class="transition duration-[200ms] ease-out"
        enter-from-class="opacity-0 translate-x-1"
        move-class="transition duration-[200ms] ease-out"
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
                class="block truncate text-[13px] font-bold hover:underline"
                :title="`${orderFileLabel(order)} — 点开看详情`"
              >
                {{ orderFileLabel(order) }}
              </RouterLink>
              <p class="tnum mt-0.5 text-[11px] text-ink-4">
                #{{ order.id }} · {{ shortTime(order.create_time) }}
              </p>
            </div>
            <StatusTag :status="order.status" size="sm" />
          </div>

          <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-3">
            <span>{{ order.owner_nickname ?? '（已注销）' }} · {{ order.owner_dorm ?? '—' }}</span>
            <!-- 联系方式单独一格而不是拼到上面那句里：拼在一起，窄屏上先被挤掉的
                 恰恰是它，而这行里最要紧的就是它（找不到人时昵称和宿舍都白搭）。 -->
            <span class="truncate">{{ contactLabel(order) }}</span>
            <span class="tnum">取件码 {{ pickupCodeLabel(order.pickup_code) }}</span>
            <span v-if="order.claimer_nickname">接单 {{ order.claimer_nickname }}</span>
          </div>

          <!-- 邮件发不出去的那一档。宽屏在表格里是个小标签，窄屏得把原因一并写出来：
               手机上只看到「需人工通知」四个字，没人知道是要自己去通知什么。 -->
          <p v-if="needsManualNotify(order)" class="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] leading-5">
            <span
              class="inline-flex items-center rounded-full border px-1.5 py-[1px] text-[10px] font-bold whitespace-nowrap"
              :style="NOTIFY_BADGE_STYLE"
            >
              需人工通知
            </span>
            <span class="text-ink-3">没有可用邮箱，取件邮件发不出去，麻烦手动联系一下</span>
          </p>

          <!-- 规格。本来是宽屏表格里才有的一列，窄屏哪都没有 —— 于是管理员拿手机接单时
               完全看不到「几份、什么纸」，这两样恰恰是他最需要知道的。
               这里和宽屏那两行取同一组助函数，口径必须一样。 -->
          <p class="mt-2 flex flex-wrap items-center gap-x-3 text-[12px] text-ink-3">
            <span>
              {{ order.color_type ? COLOR_TYPE_LABEL[order.color_type] : '黑白' }}
              / {{ order.duplex ? DUPLEX_LABEL[order.duplex] : '单面' }}
            </span>
            <span class="tnum">{{ copiesLabel(order.copies) }}</span>
            <span :title="order.paper_remark ?? undefined">{{ paperLabel(order.paper_name) }}</span>
          </p>

          <!-- 预设服务那一句话。没有文件名可看，这句话就是这一单的全部内容 -->
          <p v-if="order.preset_content" class="mt-2 text-[12px] leading-5">
            <span class="text-ink-4">预设</span>
            <span class="ml-1.5 text-ink-3">{{ order.preset_content }}</span>
          </p>

          <!-- 备注：学生的打印要求（「只打第 3 页」这类）。宽屏在表格里有单独一列，
               窄屏之前哪都没有 —— 管理员拿手机接单时完全看不到。
               没有备注就不占位：一排卡片每张都多一行「无备注」，扫视时全是噪声。 -->
          <p v-if="order.remark" class="mt-2 text-[12px] leading-5">
            <span class="text-ink-4">备注</span>
            <span class="ml-1.5 text-ink-3">{{ order.remark }}</span>
          </p>

          <!-- 金额单独一行：它是这一屏上唯一跟钱有关的数字，跟规格、取件码挤在一行会被略过 -->
          <p class="mt-2 flex flex-wrap items-center gap-x-3 text-[12px]">
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
        <p class="mb-3 min-w-0 text-[13px] leading-6 text-ink-3">
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
          class="mb-3 rounded-lg px-3 py-2 text-[12px] leading-5 whitespace-pre-wrap"
          style="background-color: var(--muted)"
        >
          {{ priceOrder.preset_content }}
        </p>

        <NInput
          v-model:value="priceInput"
          size="large"
          placeholder="例如 3.50"
          :status="priceError ? 'error' : undefined"
          @keydown.enter="submitPrice"
        >
          <template #prefix>
            <span class="font-heading font-bold" style="color: var(--primary)">¥</span>
          </template>
        </NInput>
        <p class="mt-2 text-[11px]" :style="{ color: priceError ? 'var(--err)' : 'var(--ink-4)' }">
          {{ priceError ?? '最多两位小数。计费完成后订单会从「待计费」进入「待打印」。' }}
        </p>

        <NAlert
          v-if="priceOrder.price !== null && priceOrder.price !== undefined"
          type="warning"
          :bordered="false"
          class="mt-3"
        >
          这单当前金额是 ¥{{ priceOrder.price.toFixed(2) }}，修改后学生端会立即看到新金额。
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
  </div>
</template>
