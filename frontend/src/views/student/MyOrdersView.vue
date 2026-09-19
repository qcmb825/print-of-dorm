<script setup lang="ts">
/** 我的订单：手机优先的卡片列表。
 *  自动刷新用 useIntervalFn，并在页面不可见时暂停 —— 后台标签页不该继续发请求。 */
import { computed, onMounted, ref, watch } from 'vue'
import { useDocumentVisibility, useIntervalFn } from '@vueuse/core'
import { Clock, Inbox, RefreshCw, Trash2 } from '@lucide/vue'
import { NButton, NSkeleton } from 'naive-ui'
import { ApiError } from '@/api/client'
import { orderApi } from '@/api/endpoints'
import type { Order } from '@/api/types'
import StatusTag from '@/components/StatusTag.vue'
import PageHeader from '@/components/PageHeader.vue'
import {
  COLOR_TYPE_LABEL,
  DUPLEX_LABEL,
  STATUS_COLOR_VAR,
  copiesLabel,
  fullTime,
  orderFileLabel,
  paperLabel,
  pickupCodeLabel,
  priceLabel,
  shortTime,
} from '@/utils/format'
import { confirmAction, notify } from '@/composables/feedback'
import { useValueTick } from '@/composables/motion'

const orders = ref<Order[]>([])
const loading = ref(true)

const refreshMs = 20_000
const visibility = useDocumentVisibility()

/** 请求序号闸门：只接受最后一次发起请求的响应，避免慢响应覆盖新数据
 *  （刚撤回的单「复活」、刚改的状态看似回退）。 */
let requestSeq = 0

const summary = computed(() => ({
  // 「待计费」也算进行中：学生那边这单同样还没结束（正等管理员报价），
  // 不算进任何一格的话，刚提交完订单的学生会看到「进行中 0」而以为没提交上。
  active: orders.value.filter(
    (o) => o.status === '待计费' || o.status === '待打印' || o.status === '打印中',
  ).length,
  ready: orders.value.filter((o) => o.status === '可取了').length,
  done: orders.value.filter((o) => o.status === '已取件').length,
}))

/** 花费合计：只算已经定过价的单。未计费的单金额是 null，当成 0 加进去没错，
 *  但不应该把它显示成「￥0.00」让用户以为这单免费。 */
const spent = computed(() =>
  orders.value.reduce((sum, o) => (typeof o.price === 'number' ? sum + o.price : sum), 0),
)

/** 四格的"变化反馈"：这一页每 20 秒自己刷一次，值真的变了才亮一下。
 *  四格各拿一个 tick 而不是共用一个 —— 共用会把"只变了一格"演成"四格都动了"。
 *  首次变化（数据到达）由 useValueTick 内部跳过，理由见那个函数的注释。 */
const tickActive = useValueTick(() => summary.value.active)
const tickDone = useValueTick(() => summary.value.done)
const tickSpent = useValueTick(() => spent.value)

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  const mySeq = ++requestSeq
  try {
    const data = await orderApi.mine()
    // 只接受最后一次请求的响应：防止旧响应覆盖新数据
    if (mySeq !== requestSeq) return
    orders.value = data.orders
  } catch (error) {
    // 报错也只在「自己仍是最新请求」时提示：旧请求的失败盖在新数据之上，
    // 会让用户以为刚刷出来的列表是坏的。
    if (!silent && mySeq === requestSeq)
      notify.error(error instanceof ApiError ? error.message : '加载订单失败')
  } finally {
    if (mySeq === requestSeq) loading.value = false
  }
}

const { pause, resume } = useIntervalFn(() => void load(true), refreshMs, { immediate: false })

watch(visibility, (state) => {
  if (state === 'visible') {
    resume()
    void load(true)
  } else {
    pause()
  }
})

onMounted(async () => {
  await load()
  resume()
})

/* ---------- 撤回 ----------
 *  传错文件、参数选错，在「还没人接单」之前都是无害的，让本人自己收起
 *  比找管理员删更省事。一旦有人接了，这单就在别人的工作里了（可能已经下载、
 *  已经在打印），单子凭空消失最轻的结果也是白打一份纸 —— 那种情况该走「释放」，
 *  把单退回答待接单池，而不是让整条记录不存在。
 *  下面这个判定跟后端 `api_withdraw_order` 的两道闸门一一对应。 */

/** 撤回按钮点不动的原因；null 表示可以点。
 *  两句话分别对应后端的 400「订单已经被接取，无法撤回」和 400「订单已完成，不能撤回」。 */
function withdrawBlockReason(order: Order): string | null {
  if (order.status === '已取件') return '这单已经取走了，不能再撤回'
  if (order.claimed_by !== null) return '已经有管理员接单了，需要撤回请到工单里说一声'
  return null
}

/** 正在撤回的订单 id。撤回是删数据、又没有可供对照的进度，
 *  点了必须立刻有反馈，否则用户会连点，第二次就撞 404 了。 */
const withdrawingId = ref<number | null>(null)

async function withdraw(order: Order): Promise<void> {
  // 按钮已经置灰，这里再挡一道：提示直接用上面算好的原因，
  // 两处文案分叉的话，以后改一处就会对不上。
  const blocked = withdrawBlockReason(order)
  if (blocked) {
    notify.warning(blocked)
    return
  }
  // 二次确认，并且把文件名和单号摆在里面：一屏订单长得都差不多，
  // 确认框只写「确定要撤回吗」等于没问。文件和记录都会没，先把后果说清楚。
  // 预设单没有文件，「上传的文件也会一并删掉」在那时候是假的 ——
  // 后果说错比少说更糟，所以两种说法分开写。
  const ok = await confirmAction({
    title: '撤回这份订单？',
    content: order.preset_content
      ? `「${orderFileLabel(order)}」#${order.id} 会被整条删除，无法恢复。这一单没有文件，不会动到任何文件。`
      : `「${orderFileLabel(order)}」#${order.id} 会被整条删除，上传的文件也会一并删掉，无法恢复。`,
    positiveText: '撤回订单',
    negativeText: '再想想',
  })
  if (!ok) return

  withdrawingId.value = order.id
  try {
    await orderApi.withdraw(order.id)
    notify.success('订单已撤回')
    // 用静默刷新：列表里少一项，但整页转圈会让人以为跳页了
    await load(true)
  } catch (error) {
    // 409 是这期间刚好被人接走了，照原样把后端那句中文透出来，
    // 再补一次刷新，界面就回到真实状态了。
    notify.error(error instanceof ApiError ? error.message : '撤回失败')
    await load(true)
  } finally {
    withdrawingId.value = null
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <PageHeader heading="md" title="我的订单" subtitle="每 20 秒自动刷新，切走页面时暂停">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <!-- 四格汇总：与「服务数据」的指标格同一件东西 —— 左缘立一条竖刻度（.gauge），
         读起来像仪表读数窗。pl-4 不能省：刻度占的是内边距，压到标签上就成了脏东西。 -->
    <div v-if="orders.length" class="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
      <div class="gauge panel panel-raised py-2.5 pr-3 pl-4">
        <div class="tech-label text-ink-4 tech-label--cn text-xs">进行中</div>
        <div class="value-tick tnum font-heading text-xl font-bold" :class="tickActive && 'value-tick--on'">
          {{ summary.active }}
        </div>
      </div>
      <!-- 「可取了」那格的数字本来就是强调色，所以这一跳在它身上看不见 ——
           不给它另发明第二种信号（同一页里两种变化反馈比少一种更容易误读）。 -->
      <div class="gauge panel panel-raised border-[var(--accent-tint-border)] py-2.5 pr-3 pl-4">
        <div class="tech-label text-ink-4 tech-label--cn text-xs">可取了</div>
        <div class="tnum font-heading text-xl font-bold" style="color: var(--accent-text)">
          {{ summary.ready }}
        </div>
      </div>
      <div class="gauge panel panel-raised py-2.5 pr-3 pl-4">
        <div class="tech-label text-ink-4 tech-label--cn text-xs">已取件</div>
        <div class="value-tick tnum font-heading text-xl font-bold" :class="tickDone && 'value-tick--on'">
          {{ summary.done }}
        </div>
      </div>
      <!-- 合计只统计当前这一页拉到的订单（此接口不带分页，学生自己能看到全部） -->
      <div class="gauge panel panel-raised py-2.5 pr-3 pl-4">
        <div class="tech-label text-ink-4 tech-label--cn text-xs">已计费合计</div>
        <div class="value-tick tnum font-heading text-xl font-bold" :class="tickSpent && 'value-tick--on'">
          ￥{{ spent.toFixed(2) }}
        </div>
      </div>
    </div>

    <div v-if="loading && !orders.length" class="flex flex-col gap-3">
      <NSkeleton v-for="index in 3" :key="index" height="96px" :sharp="false" />
    </div>

    <!-- 空态：一块被括角框住的空格 + 一行编号读数。
         空队列在这个系统里不是"出错了"，而是"队列是空的" —— 所以它长得像一份待填的
         表格，而不是一个失败的画面（NEmpty 那种居中图标 + 一句话是通用后台的形状，
         这里换成"空的工单格"，与列表同源）。 -->
    <div v-else-if="!orders.length" class="grid place-items-center py-8">
      <div
        class="bracket-lg w-full max-w-md px-6 py-8 text-center"
        style="--bracket-arm: 22px"
      >
        <span class="readout">00 / QUEUE EMPTY</span>
        <div class="mt-3 flex justify-center text-ink-4">
          <Inbox :size="30" />
        </div>
        <p class="mt-3 text-sm font-semibold">还没有订单</p>
        <p class="mt-1 text-xs text-ink-4">
          去「下单打印」提交第一份文件，提交后会立刻生成取件码
        </p>
        <span class="ticks mx-auto mt-4 block w-32" aria-hidden="true" />
      </div>
    </div>

    <!-- 列表用 TransitionGroup 而不是 Transition：接口每 20 秒轮询一次，数组是整体替换的，
         按 key 打补丁时只有「真正新进来」的订单会跑入场动画 —— 每次轮询都重放一遍的话
         就是一屏东西在定时乱动。新订单从右侧切入，后面的项目只做让位移动。
         move-class 管的是「新单插进来、后面的项往下让位」这一段位移（FLIP）。
         列表本体没有 gap：一条条的间距由 .wo 自己的 1px 上边线给，整列读成一张表。

         leave 只属于**用户自己按下的那个撤回**：这一页有两条会让条目消失的路径 ——
         轮询发现管理员那边删了单，和自己点撤回。前者补离场动画就变成了"定时闪烁"，
         而这里写的是同一条 class，它管不到"是谁删的"。
         好在两者不会同时发生：撤回走的是 withdraw() → 立刻 load(true)，
         那一轮响应到达时数组已经少了一项，跑的就是这次 leave。
         轮询删单极少见（管理员侧没有删单入口，只有撤回），出现时也只是没有动画而已 ——
         这正是"宁可少动一次"的那一侧。 -->
    <TransitionGroup
      v-else
      tag="ul"
      class="m-0 flex list-none flex-col p-0"
      enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
      enter-from-class="opacity-0 translate-x-1"
      leave-active-class="transition duration-[var(--motion-dur-fast)] ease-out"
      leave-to-class="opacity-0"
      move-class="transition duration-[var(--motion-dur-base)] ease-out"
    >
      <li
        v-for="order in orders"
        :key="order.id"
        class="wo"
        :style="{ '--wo-accent': STATUS_COLOR_VAR[order.status] }"
      >
        <!-- 左缘状态色条：把「这一单在哪一步」从"读标签"降到"扫一眼"。 -->
        <span class="wo__bar" aria-hidden="true" />

        <!-- ① 读数行：单号与提交时刻走等宽，位置固定在右端 —— 扫视时不会因为
             文件名长短而错位。状态标签也钉在这一行上。 -->
        <div class="flex items-center justify-between gap-3">
          <span class="readout">
            #{{ order.id }} · {{ shortTime(order.create_time) }}
          </span>
          <StatusTag :status="order.status" />
        </div>

        <div class="mt-1.5 flex flex-wrap items-end gap-x-5 gap-y-3">
          <!-- basis-[60%] 是给窄屏用的：这一块收缩到 0 也不会换行（flex-wrap 只在**基准宽度**
               放不下时才折行），于是 390px 上文件名被右侧那对读数挤成 95px —— 实测
               「VRChat_2026-09…」只剩自然宽度的 24%。给它 60% 的基准，右侧那对读数就整体换到
               下一行，第一行整行留给文件名。 -->
          <div class="min-w-0 flex-1 basis-[60%] sm:basis-0">
            <!-- 预设单没有文件名（后端存的是空串哨兵值），直接插值会得到一片空白，
                 学生会以为自己的订单没记录上。 -->
            <p class="truncate text-base font-bold" :title="orderFileLabel(order)">
              {{ orderFileLabel(order) }}
            </p>

            <!-- ② 规格标签：左强调边的小条，不是药丸。它们说的是"这份文件怎么打"，
                 所以紧跟在文件名下面。 -->
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span class="spec tech-label tech-label--cn text-xs">
                {{ order.color_type ? COLOR_TYPE_LABEL[order.color_type] : '黑白' }}
              </span>
              <span class="spec tech-label tech-label--cn text-xs">
                {{ order.duplex ? DUPLEX_LABEL[order.duplex] : '单面' }}
              </span>
              <!-- 份数一定要显示：它直接决定交多少钱，学生看不出来就会反复问管理员。
                   null 是「未记录」（本次升级前的老订单）而不是 1 份，走 copiesLabel。 -->
              <span class="spec tech-label tech-label--cn tnum text-xs">
                {{ copiesLabel(order.copies) }}
              </span>
              <span
                v-if="order.paper_name"
                class="spec tech-label tech-label--cn text-xs"
                :style="{ '--spec-edge': 'var(--accent-tint-border)' }"
              >
                {{ paperLabel(order.paper_name) }}
              </span>
            </div>
          </div>

          <!-- ③ 右侧两块读数并排：费用与取件码。它们都是"查得到的数"，
                 所以用同一个形状（等宽大字 + 上方小标签），只是取件码多一层角标框 ——
                 它和回执上那个是同一件东西的两个尺度，框住是为了让"这是凭证"
                 在列表里也读得出来。 -->
          <div class="flex shrink-0 items-end gap-x-5">
            <div>
              <div class="tech-label mb-0.5 text-ink-4 tech-label--cn text-xs">费用</div>
              <!-- 未计费显示「未计费」而不是「￥0.00」：刚提交的订单本来就是 null，
                   写成 0 元会让学生以为这单不要钱。 -->
              <div
                v-if="typeof order.price === 'number'"
                class="tnum font-heading text-2xl leading-none font-bold"
              >
                ￥{{ order.price.toFixed(2) }}
              </div>
              <div v-else class="text-sm leading-[23px] text-ink-4">
                {{ priceLabel(order.price) }}
                <span class="text-xs">· 等管理员确认</span>
              </div>
            </div>
            <div class="bracket-lg px-2.5 py-1.5" style="--bracket-arm: 16px">
              <div class="tech-label mb-0.5 text-ink-4 tech-label--cn text-xs">取件码</div>
              <div
                class="tnum font-heading text-2xl leading-none font-bold tracking-[0.1em]"
                :style="order.status === '可取了' ? { color: 'var(--accent-text)' } : undefined"
              >
                {{ pickupCodeLabel(order.pickup_code) }}
              </div>
            </div>
          </div>
        </div>

        <!-- 预设服务那句话：学生看不到「自己下单时选了什么」会很没安全感，
             而他们甚至没有文件名可以对照。 -->
        <p
          v-if="order.preset_content"
          class="spec mt-2.5 px-2.5 py-1.5 text-xs text-ink-2"
        >
          预设服务：{{ order.preset_content }}
        </p>

        <p v-if="order.remark" class="spec mt-2 px-2.5 py-1.5 text-xs text-ink-2">
          备注：{{ order.remark }}
        </p>

        <div class="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-4">
          <span class="flex items-center gap-1">
            <Clock :size="12" />
            提交 {{ fullTime(order.create_time) }}
          </span>
          <span v-if="order.claimer_nickname">接单：{{ order.claimer_nickname }}</span>
          <!-- 已取件的单不显示这个入口：终态没什么可撤回的，摆一个永远灰着的按钮只是噪音。
               其余情况一律显示，不能点的时候用 title 说明原因 —— 按钮直接消失的话，
               学生会以为功能没了，而不是「这一单现在不能撤」。 -->
          <NButton
            v-if="order.status !== '已取件'"
            class="ml-auto"
            size="tiny"
            quaternary
            type="error"
            :disabled="withdrawBlockReason(order) !== null"
            :loading="withdrawingId === order.id"
            :title="withdrawBlockReason(order) ?? undefined"
            @click="withdraw(order)"
          >
            <template #icon><Trash2 :size="12" /></template>
            撤回
          </NButton>
        </div>
      </li>
    </TransitionGroup>
  </div>
</template>
