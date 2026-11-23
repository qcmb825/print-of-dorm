<script setup lang="ts">
/** 抽奖（学生端）：奖品、参与名单、我也要参与。
 *
 *  口径全部在后端（routes/lottery.py 模块头）：资格=近 30 天内下单且取件成功、
 *  一人一期一票、开奖前可撤回。这里只照单显示 —— 前端不复制资格判断，
 *  服务端 403/409 回来什么就说什么，两边各算一套必然漂移。
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
import type { Lottery } from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { notify } from '@/composables/feedback'
import { fullTime } from '@/utils/format'

const router = useRouter()

const lottery = ref<Lottery | null>(null)
/** 后端明确回了 exists:false（当前没有活动）与「没读到」是两回事：前者是空态，
 *  后者是错误态给重试 —— 混成一个样子，学生分不清是没活动还是页面坏了。 */
const none = ref(false)
const loading = ref(true)
const loadError = ref(false)
const acting = ref(false)
/** 配图加载失败就退回占位框：裂图比没有图更糟。 */
const imageFailed = ref(false)

const isDrawn = computed(() => lottery.value?.status === 'drawn')
const prizeImageSrc = computed(() =>
  lottery.value
    ? lotteryApi.prizeImageUrl(lottery.value.id, lottery.value.image_version)
    : '',
)

async function load(): Promise<void> {
  loading.value = true
  loadError.value = false
  try {
    const data = await lotteryApi.get()
    if (data.exists) {
      lottery.value = data
      none.value = false
      imageFailed.value = false
    } else {
      lottery.value = null
      none.value = true
    }
  } catch {
    lottery.value = null
    loadError.value = true
  } finally {
    loading.value = false
  }
}

async function join(): Promise<void> {
  if (acting.value) return
  acting.value = true
  try {
    const data = await lotteryApi.join()
    notify.success(data.msg || '已加入')
    await load()
  } catch (error) {
    //    这里原本写「失败提示由全局拦截器弹」——**没有那个全局层**（main.ts 只挂
    //    provider、client.ts 只 reject），照那样写空 catch，学生点「我也要参与」
    //    被 403 挡下时界面毫无反应。每个 catch 自己报，与 MyOrdersView 同款。
    notify.error(error instanceof ApiError ? error.message : '没能参与 · 稍后重试')
  } finally {
    acting.value = false
  }
}

async function withdraw(): Promise<void> {
  if (acting.value) return
  acting.value = true
  try {
    await lotteryApi.withdraw()
    notify.success('已撤回')
    await load()
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '没能撤回 · 稍后重试')
  } finally {
    acting.value = false
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <PageHeader
      heading="md"
      title="抽奖"
      subtitle="近 30 天内下单并取件成功的账号可参与"
    >
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div v-if="loading && !lottery" class="flex flex-col gap-3">
      <NSkeleton height="180px" :sharp="false" />
      <NSkeleton height="120px" :sharp="false" />
    </div>

    <!-- 读取失败：带重试的页内落点（与 BoardView 同一形状，toast 会消失而它不会）。 -->
    <EmptyState
      v-else-if="loadError && !lottery"
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

    <template v-else-if="lottery">
      <!-- 中奖横幅：开奖后它是这一页的第一眼，压过奖品信息。 -->
      <section
        v-if="isDrawn"
        class="panel mb-4 border-[var(--accent-tint-border)] p-4 sm:p-5"
        role="status"
        aria-live="polite"
      >
        <div class="flex items-start gap-3">
          <span
            class="mt-0.5 grid size-8 shrink-0 place-items-center"
            style="background-color: var(--accent-tint); color: var(--accent-text)"
            aria-hidden="true"
          >
            <Trophy :size="17" />
          </span>
          <div class="min-w-0 flex-1">
            <p class="font-heading text-base font-bold">中奖名单</p>
            <p class="mt-1 text-sm">
              <template v-if="lottery.winners.length">
                <span
                  v-for="(name, index) in lottery.winners"
                  :key="name"
                  class="tnum font-semibold"
                >{{ index > 0 ? ' · ' : '' }}{{ name }}</span>
              </template>
              <span v-else class="text-ink-3">无人参与，本期未开出</span>
            </p>
            <p v-if="lottery.winners_truncated" class="mt-1 text-xs text-ink-3">
              中奖名单较长，这里只列出前 {{ lottery.participant_limit }} 位 · 完整名单见到店核对
            </p>
            <p v-if="lottery.is_winner" class="mt-1 text-sm font-semibold" style="color: var(--accent-text)">
              你在名单里 · 到店报学号领取
            </p>
          </div>
        </div>
      </section>

      <!-- 奖品区：图（或占位）+ 名称 + 份数 + 开奖时刻。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-start gap-4">
          <div
            v-if="lottery.has_image && !imageFailed"
            class="w-full max-w-56 shrink-0 border sm:w-56"
            style="border-color: var(--border)"
          >
            <img
              :src="prizeImageSrc"
              :alt="`奖品图：${lottery.prize_name}`"
              class="block max-h-64 w-full object-contain"
              loading="lazy"
              @error="imageFailed = true"
            >
          </div>
          <div
            v-else
            class="grid h-40 w-full max-w-56 shrink-0 place-items-center border sm:w-56"
            style="border-color: var(--border)"
            aria-hidden="true"
          >
            <span class="readout">NO IMAGE</span>
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="font-heading text-xl font-bold">{{ lottery.prize_name }}</h2>
            <p class="mt-1.5 text-sm text-ink-2">
              共 {{ lottery.prize_quantity }} 份
              <template v-if="lottery.carry_in > 0">
                · 含上期结余 {{ lottery.carry_in }} 份
              </template>
            </p>
            <p class="mt-1 text-sm text-ink-2">
              {{ isDrawn ? `已开奖 · ${fullTime(lottery.drawn_at)}` : `开奖 ${fullTime(lottery.draw_at)}` }}
            </p>
            <p class="mt-1 text-sm text-ink-2">参与 {{ lottery.participant_count }} 人</p>
            <p v-if="lottery.carry_in > 0" class="mt-2 text-xs text-ink-3">
              没发完的份数会留到下一期同奖品
            </p>
          </div>
        </div>

        <!-- 参与动作：一种状态一个按钮，理由写在禁用行里 ——
             灰按钮与「功能没做」分不开（UploadView 预设那一课）。 -->
        <div class="mt-4 border-t pt-3.5" style="border-color: var(--border)">
          <template v-if="isDrawn">
            <NButton disabled>{{ lottery.is_winner ? '已中奖' : '参与已截止' }}</NButton>
          </template>
          <template v-else-if="lottery.joined">
            <div class="flex flex-wrap items-center gap-2">
              <NButton secondary :loading="acting" @click="withdraw">撤回参与</NButton>
              <span class="tech-label tech-label--cn text-xs text-ink-3">已参与 · 开奖前可撤回</span>
            </div>
          </template>
          <template v-else-if="lottery.ineligible_reason === 'no_pickup'">
            <NButton disabled>我也要参与</NButton>
            <p class="mt-1.5 text-xs text-ink-3">近 30 天内没有取件成功的订单</p>
          </template>
          <!-- 已到开奖时刻、但后台还没把它结算成 drawn（默认 30 秒窗口，
               线程没跑时更久）：后端 join 对同条件回 409，所以按钮必须禁掉并
               写清原因 —— 给一颗点了必失败的按钮，与「一个状态一个理由」自相矛盾。 -->
          <template v-else-if="lottery.ineligible_reason === 'closed'">
            <NButton disabled>我也要参与</NButton>
            <p class="mt-1.5 text-xs text-ink-3">参与已截止，正在等开奖结果</p>
          </template>
          <template v-else>
            <NButton :loading="acting" @click="join">我也要参与</NButton>
          </template>
        </div>
      </section>

      <!-- 参与名单：只有昵称（后端就没给别的），开奖后中奖者打标。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">参与名单</h2>
          <span class="readout">
            {{ lottery.participant_count }} 人{{ lottery.participants_truncated ? ` · 仅列前 ${lottery.participant_limit} 位` : '' }}
          </span>
        </div>
        <p v-if="lottery.participants.length" class="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
          <span
            v-for="name in lottery.participants"
            :key="name"
            class="inline-flex items-center gap-1.5"
          >
            {{ name }}
            <Trophy
              v-if="isDrawn && lottery.winners.includes(name)"
              :size="13"
              aria-label="中奖"
              style="color: var(--accent-text)"
            />
          </span>
        </p>
        <p v-else class="mt-3 text-sm text-ink-3">还没人参与</p>
      </section>

      <p class="readout">中奖后到店报学号领取 · 结果同步发邮件</p>
    </template>
  </div>
</template>
