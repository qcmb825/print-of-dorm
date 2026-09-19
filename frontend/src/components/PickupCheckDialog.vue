<script setup lang="ts">
/** 取件核对：柜台上输一串取件码 → 看清是哪一单、是谁的 → 直接确认取件。
 *
 *  为什么值得单独做一屏，而不是让管理员在订单台里搜取件码再点改状态：
 *  学生站在柜台前报一串数字，管理员要做的是「核一眼、把纸递过去」，中间
 *  不该夹着翻页、找行、点下拉、选「已取件」这几步 —— 那几步里的每一步
 *  都可能在忙的时候点错（尤其下拉里「已取件」和「可取了」挨着）。
 *
 *  三个刻意的取舍：
 *  ① **确认取件走独立接口**，不借「改状态」。改状态有「只有接单人能改」的限制，
 *     而柜台交件的人常常不是接单人（接单那个还在里屋打印）；套用那条规则，
 *     最该用这个功能的人反而用不了。服务端的留痕会写明「这是代谁交接的」。
 *  ② **只认「可取了」**。柜台拿到一个码、发现这单还在待打印，要的是被拦下来
 *     —— 纸还没出来，绝不能一个按钮把它推成已取件。
 *  ③ 确认成功后**不关窗**。柜台上常常是一串人连着来取，关掉再点开纯属多余；
 *     留在原地、把下一串码敲进去，是这一屏最省事的形态。
 */
import { computed, nextTick, ref, watch } from 'vue'
import { CircleAlert, PackageCheck, Search } from '@lucide/vue'
import { NAlert, NButton, NInput, NModal, useMessage } from 'naive-ui'
import { ApiError } from '@/api/client'
import { staffOrderApi } from '@/api/endpoints'
import type { PickupOrder } from '@/api/types'
import StatusTag from '@/components/StatusTag.vue'
import {
  COLOR_TYPE_LABEL,
  DUPLEX_LABEL,
  contactLabel,
  copiesLabel,
  orderFileLabel,
  paperLabel,
  pickupCodeLabel,
  priceLabel,
  shortTime,
} from '@/utils/format'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{
  'update:show': [boolean]
  /** 真取走了一单。外层拿它去刷新列表 —— 不刷的话订单台那一行还停在「可取了」。 */
  done: [number]
}>()

const message = useMessage()

const READY = '可取了'
const DONE = '已取件'
const WAIT_PRICE = '待计费'

const visible = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
})

const code = ref('')
const order = ref<PickupOrder | null>(null)
const looking = ref(false)
const confirming = ref(false)
/** 查不到时把服务端原话摆在这里。不用 message 弹一下就走：柜台这人多半要照着
 *  屏幕上的码一位一位对，提示必须有地方停着，不能自己消失。 */
const missHint = ref('')
/** 刚刚这一单是我们交出去的。用来给一条明确的「已完成」反馈 ——
 *  确认之后按钮会自己置灰，光靠这个变化太安静，忙的时候看不出到底成没成。 */
const justPicked = ref(false)

const inputRef = ref<InstanceType<typeof NInput> | null>(null)

/** 每次打开都清空重来：刚交完上一个学生的件，屏幕上还留着他的姓名学号，
 *  下一个人凑过来看屏幕就看见了。 */
watch(
  () => props.show,
  async (open) => {
    if (!open) return
    code.value = ''
    order.value = null
    missHint.value = ''
    justPicked.value = false
    await nextTick()
    inputRef.value?.focus()
  },
)

async function lookup(): Promise<void> {
  const text = code.value.trim()
  if (!text || looking.value) return
  looking.value = true
  missHint.value = ''
  justPicked.value = false
  // 上一次的结果先清掉：留着一份「上次查到的单」而这次查不到，会让管理员
  // 以为屏幕上这个人就是要取件的那个。
  order.value = null
  try {
    const data = await staffOrderApi.lookupPickup(text)
    order.value = data.order
    if (data.order.status !== READY) missHint.value = ''
  } catch (error) {
    missHint.value = error instanceof ApiError ? error.message : '查不到这一单 · 核对取件码'
  } finally {
    looking.value = false
  }
}

/** 确认按钮点不动的原因；null 表示可以点。
 *
 *  分支与后端 `_pickup_conflict_response` 一一对应。这里只是**渲染**上的拦截：
 *  真正的把关在服务端（并发下两次点击、或者别人刚好在这一刻改了状态，
 *  本地这份判断都可能是过期的）。之所以还要在本地算一遍，是因为让柜台
 *  填完、点下去、再被 409 拒回来，白让人等一个来回 —— 而屏幕上
 *  本来就已经显示着这一单的状态了。 */
function confirmBlockReason(current: PickupOrder): string | null {
  if (current.status === DONE) return '这一单已经取走了'
  if (current.status === WAIT_PRICE) return '还没计费 · 先在订单台填金额'
  if (current.status !== READY) return `当前「${current.status}」· 还不能交件`
  return null
}

const blockReason = computed(() => (order.value ? confirmBlockReason(order.value) : null))

async function confirmPickup(): Promise<void> {
  const current = order.value
  if (!current || blockReason.value !== null) return
  confirming.value = true
  try {
    const data = await staffOrderApi.confirmPickup(current.pickup_code ?? code.value.trim())
    message.success(data.msg)
    // 本地就地改成已取件：服务端已经确认改成了，这一屏接着显示的就是它的现状。
    // 按钮因此自动置灰、原因自动变成「已经取走了」，不用为一次成功再跑一趟查询。
    current.status = DONE
    justPicked.value = true
    emit('done', data.order_id)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '取件失败')
    // 409 多数是「刚刚被别人改过状态」，本地这份已经过期了，重新拉一次才对得上。
    await lookup()
  } finally {
    confirming.value = false
  }
}

function close(): void {
  visible.value = false
}
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    class="max-w-[460px]"
    title="取件核对"
    :bordered="false"
  >
    <p class="mb-3 text-xs leading-5 text-ink-4">
      输入取件码回车。核对姓名、学号、份数再交件：交错了，纸找不回来。
    </p>

    <NInput
      ref="inputRef"
      v-model:value="code"
      size="large"
      clearable
      placeholder="取件码 · 例 0012"
      :status="missHint ? 'error' : undefined"
      @keydown.enter="lookup"
    >
      <template #prefix>
        <Search :size="16" />
      </template>
      <template #suffix>
        <!-- 回车才是主入口（柜台是键盘操作），但按钮也得有：不是所有人都知道
             这个框能直接回车，而他会去找一颗「查一下」的按钮。 -->
        <NButton size="tiny" type="primary" :loading="looking" @click="lookup">核对</NButton>
      </template>
    </NInput>

    <p v-if="missHint" class="mt-2 flex items-start gap-1.5 text-xs leading-5" style="color: var(--err)">
      <CircleAlert :size="14" class="mt-0.5 shrink-0" />
      <span>{{ missHint }}</span>
    </p>

    <template v-if="order">
      <div
        class="mt-4 border p-3"
        style="border-color: var(--border); background-color: var(--muted)"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p
              class="truncate text-sm font-bold"
              :title="order.preset_content ?? order.filename"
            >
              {{ orderFileLabel(order) }}
            </p>
            <p class="tnum mt-0.5 text-2xs text-ink-4">
              #{{ order.id }} · {{ shortTime(order.create_time) }}
            </p>
          </div>
          <StatusTag :status="order.status" size="sm" />
        </div>

        <!-- 规格。取件时最常被弄错的就是份数和单双面（「6 份」看成「6 张」，
             双面打成单面），所以这里不跟别的信息挤成一行小字，
             份数单独做一个牌子、单双面放在它旁边。 -->
        <div class="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span class="spec-chip">{{ copiesLabel(order.copies) }}</span>
          <span class="text-sm font-bold">
            {{ order.duplex ? DUPLEX_LABEL[order.duplex] : '单面' }}
            <span class="font-normal text-ink-3">
              · {{ order.color_type ? COLOR_TYPE_LABEL[order.color_type] : '黑白' }}
            </span>
          </span>
          <span class="text-xs text-ink-3" :title="order.paper_remark ?? undefined">
            {{ paperLabel(order.paper_name) }}
          </span>
        </div>

        <!-- 姓名和学号放在最显眼的一格：这一屏存在的理由就是「把纸交对人」，
             昵称是学生自己起的、重名和改名都很常见，对不上柜台前的人。 -->
        <div class="mt-3 border-t pt-3" style="border-color: var(--border)">
          <p class="tech-label mb-1 text-ink-4 tech-label--cn text-xs">核对领取人</p>
          <p class="text-base leading-6 font-bold">
            {{ order.owner_real_name ?? order.owner_nickname ?? '（账号已注销）' }}
            <span class="tnum ml-1 text-xs font-normal text-ink-3">
              {{ order.owner_student_id ? `学号 ${order.owner_student_id}` : '名单里没有学号' }}
            </span>
          </p>
          <p class="mt-0.5 text-xs text-ink-3">
            {{ order.owner_nickname ?? '（已注销）' }} · {{ order.owner_dorm ?? '—' }}
          </p>
          <!-- 联系方式：本人来不了、托室友代取的情况，得有个能当场打过去的电话 -->
          <p class="mt-0.5 truncate text-xs text-ink-3">
            {{ contactLabel(order.owner_contact_type, order.owner_contact) }}
          </p>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-x-3 border-t pt-3 text-xs" style="border-color: var(--border)">
          <span
            :class="
              order.price === null || order.price === undefined ? 'text-ink-4' : 'tnum font-bold'
            "
          >
            费用 {{ priceLabel(order.price) }}
          </span>
          <span class="tnum text-ink-3">
            取件码 {{ pickupCodeLabel(order.pickup_code) }}
          </span>
          <span v-if="order.claimer_nickname" class="text-ink-4">
            接单 {{ order.claimer_nickname }}
          </span>
        </div>

        <!-- 预设服务那一句话：没有文件可看，这句话就是这一单的全部内容 -->
        <p
          v-if="order.preset_content"
          class="mt-3 border-t pt-3 text-xs leading-5 whitespace-pre-wrap text-ink-3"
          style="border-color: var(--border)"
        >
          {{ order.preset_content }}
        </p>
      </div>

      <NAlert v-if="justPicked" type="success" :bordered="false" class="mt-3">
        已标记「已取件」，可以交件了。
      </NAlert>
      <NAlert v-else-if="blockReason" type="warning" :bordered="false" class="mt-3">
        {{ blockReason }}
      </NAlert>
    </template>

    <template #footer>
      <div class="flex justify-end gap-2">
        <NButton quaternary @click="close">关闭</NButton>
        <NButton
          type="primary"
          class="!font-bold"
          :loading="confirming"
          :disabled="!order || blockReason !== null"
          :title="blockReason ?? undefined"
          @click="confirmPickup"
        >
          <template #icon><PackageCheck :size="15" /></template>
          确认取件
        </NButton>
      </div>
    </template>
  </NModal>
</template>
