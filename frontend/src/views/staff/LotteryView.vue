<script setup lang="ts">
/** 抽奖管理：建活动、配图、立即开奖/归档、参与名单（含用户信息与通知状态）。
 *
 *  口径都在后端（routes/lottery.py 模块头），这里只照单显示：
 *  · 结余提示的「上期同奖品结余 N 份」来自 /api/admin/lotteries/carry ——
 *    奖品名是结余的钥匙，所以输入框一变就要重查；前端不算结余。
 *  · 立即开奖/删除是不可逆动作，走 confirmAction，正文写会发生什么，
 *    不复述问句（DESIGN_RULES §12）。
 *  · 参与名单在这里**有**姓名/学号/宿舍/QQ（后端只在这条管理接口给，
 *    分级见 api/types.ts 的注释）；学生端那个页面拿不到，也不该拿到。
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { ImageUp, Pencil, Play, Plus, RefreshCw, Trash2 } from '@lucide/vue'
import {
  NButton,
  NDatePicker,
  NFormItem,
  NInput,
  NInputNumber,
  NRadioButton,
  NRadioGroup,
  NSkeleton,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { lotteryApi } from '@/api/endpoints'
import type {
  LotteryAdminDetail,
  LotteryAdminEntry,
  LotteryAdminItem,
  LotteryAudience,
} from '@/api/types'
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { fullTime } from '@/utils/format'

const message = useMessage()

/** 奖品图上限：与后端 `LOTTERY_IMAGE_MAX_BYTES` 同一档（默认 4MB）。
 *  前端这一道只为省掉「白传一遍再被拒」，真正的边界永远在服务端 ——
 *  所以它写死在这里可以，但后端调小时这里要跟着调（否则用户能选、传上去才被拒）。 */
const LOTTERY_IMAGE_MAX_BYTES = 4 * 1024 * 1024

/** 一期最多几档奖品 —— 与后端 routes/lottery.py 的 _PRIZES_MAX 同一档。
 *  前端这一道只为提前说清，真正的边界在服务端。 */
const PRIZES_MAX = 12

const items = ref<LotteryAdminItem[]>([])
const detail = ref<LotteryAdminDetail | null>(null)
const selectedId = ref<number | null>(null)
const loading = ref(true)
const detailLoading = ref(false)
/** 名单**没读到**（与「读到空名单」是两件事，见 loadDetail 里的注释）。 */
const detailError = ref(false)
const saving = ref(false)
const acting = ref(false)

const openItem = computed(() => items.value.find((item) => item.status === 'open') ?? null)
const inShelfItem = computed(
  () => items.value.find((item) => item.status === 'open' || item.status === 'drawn') ?? null,
)

// ---- 表单（建新一期，或编辑进行中的那一期）----
const editingId = ref<number | null>(null)
/** 一期可以有多档奖品。每行一个奖品：名称 + 份数。
 *  id 只有编辑已有档时才有 —— 带上它后端才会「就地改这一档」，
 *  从而保住已经上传的配图和建期时定格的 carry_in（见 api/types.ts 的注释）。 */
interface PrizeDraft {
  key: number         // 前端自己的行键（拖动/删除时不该用后端 id，新行还没有 id）
  id?: number         // 后端档位 id（编辑已有档才有）
  prize_name: string
  prize_quantity: number | null
  /** 这一档的配图版本（= 文件名）；无图为空串。编辑时从后端带回来。 */
  image_version: string
}
let prizeKeySeed = 0
function newPrizeDraft(): PrizeDraft {
  prizeKeySeed += 1
  return { key: prizeKeySeed, prize_name: '', prize_quantity: 1, image_version: '' }
}

const form = reactive({
  prizes: [newPrizeDraft()] as PrizeDraft[],
  /** 参与资格口径。默认沿用老规则（近 30 天取件成功）：新建一期时
   *  「谁都能抽」应该是**主动选**的结果，不能因为升级就放宽。 */
  audience: 'pickup' as LotteryAudience,
  draw_at_ms: null as number | null,
  archive_at_ms: null as number | null,
})
/** 各档的「上期同奖品结余」（结余口径在后端，这里只显示它）。按行键记。 */
const carryHints = ref<Record<number, number>>({})

const STATUS_LABEL: Record<LotteryAdminItem['status'], string> = {
  open: '进行中',
  drawn: '已开奖',
  archived: '已归档',
}

/** 列表里那一列的字面量（与上面表单的两个选项同源，不另起一套叫法）。 */
const AUDIENCE_LABEL: Record<LotteryAudience, string> = {
  pickup: '30 天取件',
  all: '所有人',
}

/** 表单里正在编辑的那一期（详情带配图版本，比列表项全）。 */
function fillForm(item: LotteryAdminItem | null): void {
  if (item && item.status === 'open') {
    editingId.value = item.id
    form.prizes = item.prizes.length
      ? item.prizes.map((prize) => {
        prizeKeySeed += 1
        return {
          key: prizeKeySeed,
          id: prize.id,
          prize_name: prize.prize_name,
          prize_quantity: prize.prize_quantity,
          image_version: prize.image_version,
        }
      })
      : [newPrizeDraft()]
    form.audience = item.audience
    form.draw_at_ms = Date.parse(`${item.draw_at.replace(' ', 'T')}`) || null
    form.archive_at_ms = item.archive_at
      ? Date.parse(`${item.archive_at.replace(' ', 'T')}`) || null
      : null
  } else {
    editingId.value = null
    form.prizes = [newPrizeDraft()]
    form.audience = 'pickup'
    form.draw_at_ms = null
    form.archive_at_ms = null
  }
  carryHints.value = {}
}

function addPrize(): void {
  if (form.prizes.length >= PRIZES_MAX) {
    message.warning(`一期最多 ${PRIZES_MAX} 个奖品`)
    return
  }
  form.prizes.push(newPrizeDraft())
}

/** 删一档。**不能删到 0 档**：一期没有奖品的活动没有意义，后端也会回 400。 */
function removePrize(index: number): void {
  if (form.prizes.length <= 1) {
    message.warning('至少要留一个奖品')
    return
  }
  const [removed] = form.prizes.splice(index, 1)
  delete carryHints.value[removed.key]
}

/** 归档默认跟开奖走 +7 天（清空 = 不自动归档）。管理员自己挑过就不动。 */
function onDrawPicked(value: number | null): void {
  form.draw_at_ms = value
  if (value && !form.archive_at_ms) {
    form.archive_at_ms = value + 7 * 86400_000
  }
}

// 结余随各档奖品名变：每档自己抖 500ms 再查，别每敲一个字打一次接口。
const carryTimers = new Map<number, ReturnType<typeof setTimeout>>()
function scheduleCarryLookup(draft: PrizeDraft): void {
  //    编辑时结余已定格在 carry_in 里，不重算（改名字也不重算 —— 口径见后端模块头）。
  if (editingId.value && draft.id) return
  const timer = carryTimers.get(draft.key)
  if (timer) clearTimeout(timer)
  const name = draft.prize_name.trim()
  if (!name) {
    delete carryHints.value[draft.key]
    return
  }
  carryTimers.set(draft.key, setTimeout(async () => {
    try {
      const data = await lotteryApi.adminCarry(name)
      if (data.carry_in > 0) carryHints.value = { ...carryHints.value, [draft.key]: data.carry_in }
      else {
        const next = { ...carryHints.value }
        delete next[draft.key]
        carryHints.value = next
      }
    } catch {
      const next = { ...carryHints.value }
      delete next[draft.key]
      carryHints.value = next
    }
  }, 500))
}
watch(
  () => form.prizes.map((prize) => prize.prize_name).join('\u0000'),
  () => {
    for (const draft of form.prizes) scheduleCarryLookup(draft)
  },
)
onBeforeUnmount(() => {
  for (const timer of carryTimers.values()) clearTimeout(timer)
  carryTimers.clear()
})

// ---- 读取 ----
async function load(): Promise<void> {
  loading.value = true
  try {
    const data = await lotteryApi.adminList()
    items.value = data.items
    //    默认选中在架那期；没有就选最近一期，详情区不至于整块空白。
    //    **已经在看某一期时不要把手挪走**：多期并存之后「在架那期」不再是唯一
    //    说法，保存完第一期的份数却被跳到第二期上，等于把人刚看的地方抽掉。
    const stillThere = data.items.find((item) => item.id === selectedId.value)
    const target = stillThere ?? inShelfItem.value ?? data.items[0] ?? null
    selectedId.value = target ? target.id : null
    //    表单编辑哪一期：跟着选中走（选中那期可编辑就编它），否则退回第一个进行中的。
    const editable = data.items.find(
      (item) => item.id === selectedId.value && item.status === 'open',
    )
    fillForm(editable ?? openItem.value)
    if (selectedId.value) await loadDetail(selectedId.value)
    else detail.value = null
  } catch {
    message.error('抽奖列表没读到 · 稍后重试')
  } finally {
    loading.value = false
  }
}

async function loadDetail(id: number): Promise<void> {
  detailLoading.value = true
  detailError.value = false
  try {
    detail.value = await lotteryApi.adminDetail(id)
  } catch {
    detail.value = null
    //    单独一位：模板里「没有 detail 或没有 entries」会渲染成空态结论
    //    「这一期还没有人参与」，而这里其实是**没读到**。两种情形必须分开。
    detailError.value = true
    message.error('参与名单没读到 · 稍后重试')
  } finally {
    detailLoading.value = false
  }
}

async function select(id: number): Promise<void> {
  selectedId.value = id
  //    点哪一期，表单就编哪一期（多期并存后「编辑进行中的那一期」没有唯一解）。
  //    选中的是已开奖/已归档的期时，表单退回「新建」—— 那两档不能改。
  const picked = items.value.find((item) => item.id === id) ?? null
  fillForm(picked && picked.status === 'open' ? picked : null)
  await loadDetail(id)
}

// ---- 动作 ----
async function save(): Promise<void> {
  if (saving.value) return
  //    逐档校验：哪一档有问题就说清是第几档。一次性把 NInputNumber 的 null
  //    （清空后是 null，而 `!Number.isInteger(null)` 为真）和空名字都挡在这儿 ——
  //    不挡的话提交上去就是后端一句 400，而 400 在这页上原本是无声的。
  for (const [index, draft] of form.prizes.entries()) {
    const label = form.prizes.length > 1 ? `第 ${index + 1} 个奖品` : '奖品名称'
    if (!draft.prize_name.trim()) {
      message.warning(`${label}不能为空`)
      return
    }
    if (!Number.isInteger(draft.prize_quantity) || (draft.prize_quantity as number) < 1) {
      message.warning(`${label}的份数至少 1 份`)
      return
    }
  }
  if (!form.draw_at_ms) {
    message.warning('先挑一个开奖时间')
    return
  }
  if (form.draw_at_ms <= Date.now()) {
    //    ⚠️ 编辑在架期时表单回填的是**原始开奖时刻**，一旦过了点（worker 还没结算，
    //    默认 30 秒窗口；线程没跑时更久）这里原样提交就必吃 400「开奖时间必须晚于现在」。
    //    **不自动顺延**：那是替管理员改业务时间（他只是想改份数），与「不替用户猜」
    //    同一条纪律。让他自己往后选一档，并说清为什么。
    message.warning(editingId.value
      ? '这一期已经到开奖时刻了（等后台结算），先把开奖时间往后选再保存'
      : '开奖时间要晚于现在')
    return
  }
  saving.value = true
  const payload = {
    prizes: form.prizes.map((draft) => ({
      //    只把已有档的 id 发回去：新档不带 id，后端才会 insert。
      ...(draft.id ? { id: draft.id } : {}),
      prize_name: draft.prize_name.trim(),
      prize_quantity: draft.prize_quantity as number,
    })),
    audience: form.audience,
    draw_at_ms: form.draw_at_ms,
    archive_at_ms: form.archive_at_ms,
  }
  try {
    if (editingId.value) {
      await lotteryApi.adminUpdate(editingId.value, payload)
      message.success('已保存')
    } else {
      await lotteryApi.adminCreate(payload)
      message.success('已创建')
    }
    await load()
  } catch (error) {
    //    ⚠️ 这里原本写的是「失败文案由全局层弹」——**项目里没有那个全局层**：
    //    main.ts 只挂 provider、client.ts 只 reject、feedback.ts 只注册 message 实例，
    //    没有任何地方把 ApiError 自动弹出来。照那句话写空 catch，失败的样子就是
    //    「点创建没反应」。
    //    每个 catch 自己报一句，与 LogsView / MyOrdersView 同一写法。
    message.error(error instanceof ApiError ? error.message : '保存没生效 · 稍后重试')
  } finally {
    saving.value = false
  }
}

async function drawNow(): Promise<void> {
  const target = selectedId.value
  if (!target || acting.value) return
  const ok = await confirmAction({
    title: '立即开奖',
    content: '开奖后参与名单冻结，不能修改。',
    positiveText: '开奖',
  })
  if (!ok) return
  acting.value = true
  try {
    await lotteryApi.adminDraw(target)
    message.success('已开奖')
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '开奖没生效 · 稍后重试')
  } finally {
    acting.value = false
  }
}

async function archiveNow(): Promise<void> {
  const target = selectedId.value
  if (!target || acting.value) return
  const ok = await confirmAction({
    title: '立即归档',
    content: '学生端将看不到这一期，管理端历史保留。',
    positiveText: '归档',
  })
  if (!ok) return
  acting.value = true
  try {
    await lotteryApi.adminArchive(target)
    message.success('已归档')
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '归档没生效 · 稍后重试')
  } finally {
    acting.value = false
  }
}

async function remove(): Promise<void> {
  const target = selectedId.value
  if (!target || acting.value) return
  const ok = await confirmAction({
    title: '删除抽奖',
    content: '参与记录一起删除，不可恢复。',
    positiveText: '删除',
    dangerous: true,
  })
  if (!ok) return
  acting.value = true
  try {
    await lotteryApi.adminDelete(target)
    message.success('已删除')
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除没生效 · 稍后重试')
  } finally {
    acting.value = false
  }
}

// 配图上传：隐藏 input + 按钮触发（全站没有用 NUpload 的先例，见 PayQrDialog）。
//    多奖品之后「传哪一档的图」必须由点按钮的那一行决定，所以把目标档位记在
//    pendingPrizeId 里，选完文件再一起发。走这个变量的路径有两条：
//    表单里某一行（新建还没 id 的档不走这里 —— 那要等这期建好），
//    以及参与名单上方那排「已上传档位」的换图按钮。
const imageInput = ref<HTMLInputElement | null>(null)
const pendingPrizeId = ref<number | undefined>(undefined)

function pickImage(prizeId?: number): void {
  pendingPrizeId.value = prizeId
  imageInput.value?.click()
}

async function onImagePicked(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  const target = selectedId.value
  const prizeId = pendingPrizeId.value
  pendingPrizeId.value = undefined
  if (!file || !target) return
  //    前端先挡一道大小与类型：与 PayQrDialog 同一判据。后端那道防线齐全
  //    （白名单 / 0 字节 / 上限 / 内容嗅探），但让 5MB 的图白传一遍再被拒，
  //    体验上就是「点了没反应」—— 而这一页的失败已经够不显眼了。
  if (file.size > LOTTERY_IMAGE_MAX_BYTES) {
    message.warning('图片太大了（上限 %d MB），压缩后再传'
      .replace('%d', String(LOTTERY_IMAGE_MAX_BYTES / (1024 * 1024))))
    return
  }
  acting.value = true
  try {
    await lotteryApi.adminUploadImage(target, file, prizeId)
    message.success('配图已更新')
    //    列表与详情都要重取：列表里那一列的「图」标记也来自 prizes。
    await load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '配图没更新 · 稍后重试')
  } finally {
    acting.value = false
  }
}

/** 详情里选中那一期可换图的档位（已开奖的不让换，与后端同一口径）。 */
const editablePrizes = computed(() =>
  detail.value && detail.value.status === 'open' ? detail.value.prizes : [],
)

// ---- 展示辅助 ----
function notifyLabel(entry: LotteryAdminEntry): string {
  if (!entry.is_winner) return '—'
  if (entry.notify_time) return '已通知'
  if (entry.notify_error === 'no_mailbox') return '无邮箱'
  if (entry.notify_error === 'smtp') return '发送失败'
  return '未通知'
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-6xl">
    <PageHeader heading="lg" title="抽奖" subtitle="奖品结余同奖品累计 · 开奖后名单冻结">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div v-if="loading" class="flex flex-col gap-3">
      <NSkeleton height="200px" :sharp="false" />
      <NSkeleton height="160px" :sharp="false" />
    </div>

    <template v-else>
      <!-- 建活动 / 编辑进行中的那一期。同一张表单两种用途，editingId 区分。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">
            {{ editingId ? '编辑进行中的抽奖' : '建新一期' }}
          </h2>
          <span v-if="editingId" class="readout">EDITING #{{ editingId }}</span>
        </div>

        <div class="mt-3 grid gap-3 sm:grid-cols-2">
          <!-- 参与资格：**每期活动自己的设定**，不是全局开关。「谁都能抽」的
               拉新活动和「取过件的才能抽」的回馈活动可以轮流开，多期并存之后
               这两种活动同时挂着也说得清。选了之后学生端副标题也跟着变
               （后端把 audience 一起发给学生端）。 -->
          <NFormItem label="谁可以参与" :show-feedback="false" class="sm:col-span-2">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <NRadioGroup
                v-model:value="form.audience"
                size="small"
                name="audience"
                :disabled="saving"
              >
                <NRadioButton value="pickup">近 30 天取件成功</NRadioButton>
                <NRadioButton value="all">所有人可参与</NRadioButton>
              </NRadioGroup>
              <span class="text-xs text-ink-3">
                {{ form.audience === 'all'
                  ? '登录账号都能参与，不校验订单'
                  : '近 30 天内下过单、且这一单已取件成功才能参与' }}
              </span>
            </div>
          </NFormItem>
          <NFormItem label="开奖时间" :show-feedback="false">
            <NDatePicker
              :value="form.draw_at_ms"
              type="datetime"
              size="medium"
              :actions="['clear', 'confirm']"
              :disabled="saving"
              class="w-full"
              @update:value="onDrawPicked"
            />
          </NFormItem>
          <NFormItem label="归档时间（空 = 不自动归档）" :show-feedback="false">
            <NDatePicker
              v-model:value="form.archive_at_ms"
              type="datetime"
              size="medium"
              clearable
              :actions="['clear', 'confirm']"
              :disabled="saving"
              class="w-full"
            />
          </NFormItem>
        </div>

        <!-- 奖品档位：一期可以有多档（一等奖 + 安慰奖）。顺序就是开奖顺序，
             抽中的人不会进下一档的池子 —— 一人一期至多中一个奖（口径在后端）。 -->
        <div class="mt-1 border-t pt-3" style="border-color: var(--border)">
          <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p class="text-sm font-bold">奖品档位 · {{ form.prizes.length }}</p>
            <span class="readout">按顺序开奖 · 一人至多中一个</span>
          </div>

          <ul class="mt-2 flex flex-col gap-2">
            <li
              v-for="(draft, index) in form.prizes"
              :key="draft.key"
              class="border p-2.5"
              style="border-color: var(--border-subtle)"
            >
              <div class="flex flex-wrap items-end gap-2">
                <span class="readout w-5 shrink-0 pb-2">{{ index + 1 }}</span>
                <div class="min-w-40 flex-1">
                  <NFormItem label="奖品名称" :show-feedback="false">
                    <NInput
                      v-model:value="draft.prize_name"
                      maxlength="40"
                      show-count
                      placeholder="例：洞洞板套件"
                      :disabled="saving"
                    />
                  </NFormItem>
                </div>
                <div class="w-32 shrink-0">
                  <NFormItem label="份数" :show-feedback="false">
                    <NInputNumber
                      v-model:value="draft.prize_quantity"
                      :min="1"
                      :max="10000"
                      :disabled="saving"
                      class="w-full"
                    />
                  </NFormItem>
                </div>
                <!-- 配图挂在档位上。新建期还没存库，配图等建好之后再传
                     （那一行的按钮就禁用 + 说明原因，不给一颗点了必失败的按钮）。 -->
                <div class="flex shrink-0 gap-1 pb-0.5">
                  <NButton
                    v-if="draft.id"
                    size="tiny"
                    quaternary
                    :disabled="saving"
                    @click="pickImage(draft.id)"
                  >
                    <template #icon><ImageUp :size="13" /></template>
                    {{ draft.image_version ? '换图' : '上传图' }}
                  </NButton>
                  <span v-else class="readout pb-1.5 text-ink-3">建好后再传图</span>
                  <NButton
                    size="tiny"
                    quaternary
                    :disabled="saving || form.prizes.length <= 1"
                    :aria-label="`删除第 ${index + 1} 个奖品`"
                    @click="removePrize(index)"
                  >
                    <template #icon><Trash2 :size="13" /></template>
                  </NButton>
                </div>
              </div>
              <p
                v-if="carryHints[draft.key] > 0"
                class="mt-1 px-3 py-1.5 text-xs"
                role="status"
                style="background-color: var(--accent-tint-soft); color: var(--accent-text)"
              >
                上期同名奖品结余 {{ carryHints[draft.key] }} 份 · 建议份数不低于它（没发完的自动留到本期）
              </p>
            </li>
          </ul>

          <NButton
            size="small"
            quaternary
            class="mt-2"
            :disabled="saving || form.prizes.length >= PRIZES_MAX"
            @click="addPrize"
          >
            <template #icon><Plus :size="14" /></template>
            再加一个奖品
          </NButton>
        </div>

        <div class="mt-3 flex flex-wrap gap-2">
          <NButton :loading="saving" @click="save">
            <template #icon><Plus v-if="!editingId" :size="15" /><Pencil v-else :size="15" /></template>
            {{ editingId ? '保存修改' : '创建' }}
          </NButton>
          <NButton v-if="editingId" quaternary :disabled="saving" @click="fillForm(openItem)">
            改回当前值
          </NButton>
        </div>
      </section>

      <!-- 活动列表：在架那期排最前，历史跟在后面。点一行，下面出参与名单。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">活动记录</h2>
          <span class="readout">{{ items.length }} 期</span>
        </div>

        <div v-if="!items.length" class="mt-3">
          <EmptyState code="00 / LOTTERY EMPTY" title="还没有抽奖活动"
            hint="填好上面那张表就能开第一期" />
        </div>

        <div v-else class="mt-3 overflow-x-auto">
          <table class="w-full min-w-140 text-sm">
            <thead>
              <tr class="border-b text-left" style="border-color: var(--border)">
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">状态</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">奖品</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">份数</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">资格</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">参与</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">中奖</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">结余</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">开奖时刻</th>
                <th class="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in items"
                :key="item.id"
                class="cursor-pointer border-b transition-colors duration-[var(--motion-dur-fast)]"
                style="border-color: var(--border-subtle)"
                :class="selectedId === item.id && 'bg-[var(--muted)]'"
                @click="select(item.id)"
              >
                <td class="px-2 py-2 font-semibold">{{ STATUS_LABEL[item.status] }}</td>
                <!-- 列的是首奖品名 + 「等 N 档」：一期多档时把名字全列出来会把表格撑爆，
                     档数比全名更有用；具体哪几档点进详情看。 -->
                <td class="px-2 py-2">
                  {{ item.headline }}
                  <span v-if="item.prize_count > 1" class="readout ml-1.5">等 {{ item.prize_count }} 档</span>
                  <span v-if="item.prizes.some((prize) => prize.has_image)" class="readout ml-1.5">图</span>
                </td>
                <td class="tnum px-2 py-2">
                  {{ item.prizes.reduce((sum, prize) => sum + prize.prize_quantity, 0) }}
                </td>
                <td class="px-2 py-2">{{ AUDIENCE_LABEL[item.audience] }}</td>
                <td class="tnum px-2 py-2">{{ item.participant_count }}</td>
                <td class="tnum px-2 py-2">{{ item.status === 'open' ? '—' : item.winner_count }}</td>
                <td class="tnum px-2 py-2">{{ item.leftover ?? '—' }}</td>
                <td class="tnum px-2 py-2">
                  {{ item.status === 'open' ? fullTime(item.draw_at) : fullTime(item.drawn_at) }}
                </td>
                <td class="px-2 py-2">
                  <NButton size="tiny" quaternary @click.stop="select(item.id)">名单</NButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 快捷动作。**外层只看「选中了哪一期」**，不要求它是「在架」的那期：
             原先外层判 inShelfItem，于是选中一张已归档的历史期时整块都不渲染 ——
             连删除按钮都没有，而后端 DELETE 允许删任何期（历史列表上限 30 期，
             攒满之后只能用改库的方式清）。开奖/归档仍然只对选中那一期出现，
             判据留在各自按钮上（多期并存后「在架的那一期」不再是唯一说法）。 -->
        <div
          v-if="selectedId"
          class="mt-3 flex flex-wrap items-center gap-2 border-t pt-3"
          style="border-color: var(--border)"
        >
          <NButton
            v-if="detail?.status === 'open'"
            size="small" :loading="acting" @click="drawNow"
          >
            <template #icon><Play :size="14" /></template>
            立即开奖
          </NButton>
          <NButton
            v-if="detail?.status === 'drawn'"
            size="small" :loading="acting" @click="archiveNow"
          >
            立即归档
          </NButton>
          <NButton size="small" quaternary :loading="acting" @click="remove">
            <template #icon><Trash2 :size="14" /></template>
            删除
          </NButton>
          <span v-if="editablePrizes.length" class="readout">
            换图：点奖品行里的按钮
          </span>
          <input
            ref="imageInput"
            type="file"
            accept="image/png,image/jpeg"
            class="hidden"
            @change="onImagePicked"
          >
        </div>
      </section>

      <!-- 参与名单：只对选中的那一期展开。管理端才有的用户信息列。 -->
      <section class="panel panel-raised mb-4 p-4 sm:p-5">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="font-heading text-base font-bold">参与名单</h2>
          <span v-if="detail" class="readout">
            #{{ detail.id }} · {{ detail.participant_count }} 人
            <template v-if="detail.status !== 'open'"> · 中奖 {{ detail.winner_count }}</template>
          </span>
        </div>

        <div v-if="detailLoading" class="mt-3">
          <NSkeleton height="120px" :sharp="false" />
        </div>
        <!-- 读取失败不能落进「还没有人参与」那个空态：那是**一句结论**，而这时
             我们什么都不知道（cc1c536 修过的正是这种假空态）。 -->
        <div v-else-if="detailError" class="mt-3">
          <EmptyState code="ERR / ENTRIES" title="参与名单没读到" hint="多半是网络没跟上" tone="alarm">
            <template #action>
              <NButton v-if="selectedId" size="small" @click="loadDetail(selectedId)">
                <template #icon><RefreshCw :size="14" /></template>
                重试
              </NButton>
            </template>
          </EmptyState>
        </div>
        <div v-else-if="!detail || !detail.entries.length" class="mt-3">
          <EmptyState code="00 / NO ENTRIES" title="这一期还没有人参与" />
        </div>
        <div v-else class="mt-3 overflow-x-auto">
          <table class="w-full min-w-200 text-sm">
            <thead>
              <tr class="border-b text-left" style="border-color: var(--border)">
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">昵称</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">姓名</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">学号</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">宿舍</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">QQ</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">参与时刻</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">中的奖品</th>
                <th class="tech-label tech-label--cn px-2 py-2 text-xs font-bold text-ink-3">邮件</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="entry in detail.entries"
                :key="entry.user_id"
                class="border-b"
                style="border-color: var(--border-subtle)"
                :style="entry.is_winner ? 'background-color: var(--accent-tint-soft)' : undefined"
              >
                <td class="px-2 py-2 font-semibold">{{ entry.nickname }}</td>
                <td class="px-2 py-2">{{ entry.real_name }}</td>
                <td class="tnum px-2 py-2">{{ entry.student_id }}</td>
                <td class="px-2 py-2">{{ entry.dorm }}</td>
                <td class="tnum px-2 py-2">{{ entry.qq || '—' }}</td>
                <td class="tnum px-2 py-2">{{ fullTime(entry.joined_at) }}</td>
                <!--    中的是哪一档：多奖品之后「中奖」不再是一个布尔，
                        「中了二等奖」和「中了一等奖」在柜台是两件事。 -->
                <td
                  class="px-2 py-2 font-semibold"
                  :style="entry.is_winner ? 'color: var(--accent-text)' : undefined"
                >
                  {{ entry.win_prize_name ?? '' }}
                </td>
                <td class="px-2 py-2" :style="entry.notify_error ? 'color: var(--err)' : undefined">
                  {{ notifyLabel(entry) }}
                </td>
              </tr>
            </tbody>
          </table>
          <p v-if="detail.status === 'drawn' || detail.status === 'archived'" class="mt-2 text-xs text-ink-3">
            「无邮箱 / 发送失败」的，按名单上的 QQ 手动说一声。
          </p>
        </div>
      </section>
    </template>
  </div>
</template>
