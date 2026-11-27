<script setup lang="ts">
/** 抽奖（学生端）：在架的每一期各一张卡 —— 奖品档位、参与名单、参与动作。
 *
 *  口径全部在后端（routes/lottery.py 模块头）：**每期活动自己定参与资格**
 *  （audience：登录即可 / 近 30 天取件成功）、一人一期一票、一人一期至多中
 *  一个奖、开奖前可撤回。这里只照单显示 —— 前端不复制资格判断，服务端
 *  403/409 回来什么就说什么，两边各算一套必然漂移。
 *
 *  v30 起**多期可以并存**（开学季活动与每周抽并行），所以页面是「一列卡」
 *  而不是「一张大卡」；每张卡的动作都要带上自己的期次 id —— 不带的话后端
 *  会退回到列表第一期，人的参与就记到别人的活动上了。
 *
 *  参与人名单**只有昵称**：后端就没给别的字段（分级见 api/types.ts 那段注释），
 *  别为了「卡片好看」在前端拼任何真实信息。
 *
 *  中奖邮件由后台线程发（不发站内通知），所以页面上没有「通知已发」这类状态；
 *  中没中，开奖后这一页就是权威 —— 状态列写「未通知」是邮件的事，不是结果的事。
 */
import { computed, onMounted, ref } from 'vue'
import { RefreshCw, Trophy } from '@lucide/vue'
import { NButton, NSkeleton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { lotteryApi } from '@/api/endpoints'
import { ApiError } from '@/api/client'
import type { Lottery, LotteryPrize } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { notify } from '@/composables/feedback'
import { fullTime } from '@/utils/format'

const router = useRouter()

const rounds = ref<Lottery[]>([])
/** 后端明确回了 exists:false（当前没有活动）与「没读到」是两回事：前者是空态，
 *  后者是错误态给重试 —— 混成一个样子，学生分不清是没活动还是页面坏了。 */
const none = ref(false)
const loading = ref(true)
const loadError = ref(false)
/** 正在动的那一期的 id（按批：同一时刻只允许一个动作在飞）。 */
const actingId = ref<number | null>(null)
/** 配图加载失败就退回占位框：裂图比没有图更糟。按档位 id 记 —— 一期多档，
 *  某一档的图坏了不该把别的档的图也一起藏掉。 */
const failedImages = ref<Set<number>>(new Set())

const title = computed(() => (rounds.value.length > 1
  ? `在抽的活动 · ${rounds.value.length} 期`
  : '抽奖'))

async function load(): Promise<void> {
  loading.value = true
  loadError.value = false
  try {
    const data = await lotteryApi.get()
    if (data.exists) {
      rounds.value = data.items
      none.value = false
      failedImages.value = new Set()
    } else {
      rounds.value = []
      none.value = true
    }
  } catch {
    rounds.value = []
    loadError.value = true
  } finally {
    loading.value = false
  }
}

async function join(round: Lottery): Promise<void> {
  if (actingId.value !== null) return
  actingId.value = round.id
  try {
    const data = await lotteryApi.join(round.id)
    notify.success(data.msg || '已加入')
    await load()
  } catch (error) {
    //    这里原本写「失败提示由全局拦截器弹」——**没有那个全局层**（main.ts 只挂
    //    provider、client.ts 只 reject），照那样写空 catch，学生点「我也要参与」
    //    被 403 挡下时界面毫无反应。每个 catch 自己报，与 MyOrdersView 同款。
    notify.error(error instanceof ApiError ? error.message : '没能参与 · 稍后重试')
  } finally {
    actingId.value = null
  }
}

async function withdraw(round: Lottery): Promise<void> {
  if (actingId.value !== null) return
  actingId.value = round.id
  try {
    await lotteryApi.withdraw(round.id)
    notify.success('已撤回')
    await load()
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '没能撤回 · 稍后重试')
  } finally {
    actingId.value = null
  }
}

/** 副标题照**这一期自己的口径**写：all 的活动再去说「近 30 天取件成功」就是
 *  一句谎话，而后端并不会拦人。 */
function audienceHint(round: Lottery): string {
  return round.audience === 'all' ? '登录即可参与' : '近 30 天取件成功可参与'
}

function prizeImageSrc(round: Lottery, prize: LotteryPrize): string {
  return lotteryApi.prizeImageUrl(round.id, prize.id, prize.image_version)
}

function onImageError(prizeId: number): void {
  // Set 是原地改的，Vue 的响应式追踪不到 —— 换一个新 Set，模板才会重算。
  const next = new Set(failedImages.value)
  next.add(prizeId)
  failedImages.value = next
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <PageHeader heading="md" :title="title" subtitle="一人一期一票 · 开奖前可撤回">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div v-if="loading && !rounds.length" class="flex flex-col gap-3">
      <NSkeleton height="180px" :sharp="false" />
      <NSkeleton height="120px" :sharp="false" />
    </div>

    <!-- 读取失败：带重试的页内落点（与 BoardView 同一形状，toast 会消失而它不会）。 -->
    <EmptyState
      v-else-if="loadError && !rounds.length"
      code="ERR / LOTTERY"
      title="抽奖信息没读到"
      hint="多半是网络没跟上"
      tone="alarm"
    >
      <template #action>
        <NButton size="small" @click="load()">
          <template #icon><RefreshCw :size="14" /></template>
          重试
        </NButton>
      </template>
    </EmptyState>

    <EmptyState
      v-else-if="none"
      code="00 / LOTTERY EMPTY"
      title="当前没有抽奖"
      hint="下一期开出来，顶栏会出现「抽奖」入口"
    >
      <template #action>
        <NButton size="small" @click="router.push('/upload')">回到下单</NButton>
      </template>
    </EmptyState>

    <!-- 在架的每一期一张卡。期数多时是一列，不是一张大卡 ——
         多期并存之后「这一页只有一期」的假设不成立了。 -->
    <template v-else>
      <div class="flex flex-col gap-4">
        <section
          v-for="round in rounds"
          :key="round.id"
          class="panel panel-raised p-4 sm:p-5"
        >
          <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p class="readout">
              #{{ round.id }} · {{ audienceHint(round) }}
            </p>
            <span class="readout">
              {{ round.status === 'drawn'
                ? `已开奖 · ${fullTime(round.drawn_at)}`
                : `开奖 ${fullTime(round.draw_at)}` }}
            </span>
          </div>

          <!-- 中奖横幅：开奖后它是这一张卡的第一眼。 -->
          <div
            v-if="round.status === 'drawn'"
            class="mt-3 flex items-start gap-3 border p-3"
            style="border-color: var(--accent-tint-border); background-color: var(--accent-tint-soft)"
            role="status"
            aria-live="polite"
          >
            <Trophy :size="17" class="mt-0.5 shrink-0" style="color: var(--accent-text)" aria-hidden="true" />
            <div class="min-w-0 flex-1">
              <p class="text-sm font-bold">中奖名单</p>
              <p class="mt-1 text-sm">
                <template v-if="round.winners.length">
                  <span
                    v-for="(name, index) in round.winners"
                    :key="name"
                    class="tnum font-semibold"
                  >{{ index > 0 ? ' · ' : '' }}{{ name }}</span>
                </template>
                <span v-else class="text-ink-3">无人参与，本期未开出</span>
              </p>
              <p v-if="round.winners_truncated" class="mt-1 text-xs text-ink-3">
                中奖名单较长，这里只列出前 {{ round.participant_limit }} 位 · 完整名单见到店核对
              </p>
              <p
                v-if="round.is_winner && round.won_prize"
                class="mt-1 text-sm font-semibold"
                style="color: var(--accent-text)"
              >
                你中了「{{ round.won_prize.prize_name }}」· 到店报学号领取
              </p>
            </div>
          </div>

          <!-- 奖品档位：一期可以有多档，一等奖在前。每档一行，图与份数都在行里。 -->
          <ul class="mt-3 flex flex-col gap-3">
            <li
              v-for="(prize, index) in round.prizes"
              :key="prize.id"
              class="flex flex-wrap items-start gap-3"
            >
              <div
                v-if="prize.has_image && !failedImages.has(prize.id)"
                class="w-full max-w-32 shrink-0 border sm:w-32"
                style="border-color: var(--border)"
              >
                <img
                  :src="prizeImageSrc(round, prize)"
                  :alt="`奖品图：${prize.prize_name}`"
                  class="block max-h-32 w-full object-contain"
                  loading="lazy"
                  @error="onImageError(prize.id)"
                >
              </div>
              <div
                v-else
                class="grid h-24 w-full max-w-32 shrink-0 place-items-center border sm:w-32"
                style="border-color: var(--border)"
                aria-hidden="true"
              >
                <span class="readout">NO IMAGE</span>
              </div>
              <div class="min-w-0 flex-1">
                <h3 class="font-heading text-base font-bold">
                  <span v-if="round.prizes.length > 1" class="readout mr-1.5">{{ index + 1 }}</span>
                  {{ prize.prize_name }}
                </h3>
                <p class="mt-1 text-sm text-ink-2">
                  共 {{ prize.prize_quantity }} 份
                  <template v-if="prize.carry_in > 0">
                    · 含上期结余 {{ prize.carry_in }} 份
                  </template>
                </p>
                <p v-if="round.status === 'drawn'" class="mt-0.5 text-sm text-ink-2">
                  已中 {{ prize.winner_count }} 人
                </p>
                <p v-if="prize.carry_in > 0" class="mt-1 text-xs text-ink-3">
                  没发完的份数会留到下一期同奖品
                </p>
              </div>
            </li>
          </ul>

          <!-- 参与动作：一种状态一个按钮，理由写在禁用行里 ——
               灰按钮与「功能没做」分不开（UploadView 预设那一课）。 -->
          <div class="mt-4 border-t pt-3.5" style="border-color: var(--border)">
            <template v-if="round.status === 'drawn'">
              <NButton disabled>{{ round.is_winner ? '已中奖' : '参与已截止' }}</NButton>
            </template>
            <template v-else-if="round.joined">
              <div class="flex flex-wrap items-center gap-2">
                <NButton
                  secondary
                  :loading="actingId === round.id"
                  @click="withdraw(round)"
                >
                  撤回参与
                </NButton>
                <span class="tech-label tech-label--cn text-xs text-ink-3">已参与 · 开奖前可撤回</span>
              </div>
            </template>
            <template v-else-if="round.ineligible_reason === 'no_pickup'">
              <NButton disabled>我也要参与</NButton>
              <p class="mt-1.5 text-xs text-ink-3">近 30 天内没有取件成功的订单</p>
            </template>
            <!-- 已到开奖时刻、但后台还没把它结算成 drawn（默认 30 秒窗口，
                 线程没跑时更久）：后端 join 对同条件回 409，所以按钮必须禁掉并
                 写清原因 —— 给一颗点了必失败的按钮，与「一个状态一个理由」自相矛盾。 -->
            <template v-else-if="round.ineligible_reason === 'closed'">
              <NButton disabled>我也要参与</NButton>
              <p class="mt-1.5 text-xs text-ink-3">参与已截止，正在等开奖结果</p>
            </template>
            <template v-else>
              <NButton :loading="actingId === round.id" @click="join(round)">我也要参与</NButton>
            </template>
          </div>

          <!-- 参与名单：只有昵称（后端就没给别的），开奖后中奖者打标。 -->
          <div class="mt-4 border-t pt-3.5" style="border-color: var(--border)">
            <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p class="text-sm font-bold">参与名单</p>
              <span class="readout">
                {{ round.participant_count }} 人
                <template v-if="round.participants_truncated"> · 仅列前 {{ round.participant_limit }} 位</template>
              </span>
            </div>
            <p v-if="round.participants.length" class="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
              <span
                v-for="name in round.participants"
                :key="name"
                class="inline-flex items-center gap-1.5"
              >
                {{ name }}
                <Trophy
                  v-if="round.status === 'drawn' && round.winners.includes(name)"
                  :size="13"
                  aria-label="中奖"
                  style="color: var(--accent-text)"
                />
              </span>
            </p>
            <p v-else class="mt-2 text-sm text-ink-3">还没人参与</p>
          </div>
        </section>
      </div>

      <p class="readout mt-4">中奖后到店报学号领取 · 结果同步发邮件</p>
    </template>
  </div>
</template>
