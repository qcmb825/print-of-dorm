<script setup lang="ts">
/** 学生下单：选文件**或用预设打印服务** + 打印选项，上传成功后把取件码放大展示 ——
 *  那是学生真正要记住的东西。
 *
 *  两条下单路径互斥，而且是在**服务端**互斥的：用了预设就不许带文件
 *  （routes/orders.py 的 api_create_preset_order 见到 request.files 直接 400，
 *  分片上传那三条路也各自挡了一道）。这里把上传框藏起来只是让人看不见它，
 *  不是那条规矩本身 —— 谁都能手搓一个带文件的请求打过来。
 *
 *  上传分两条路，由 `uploadFile()` 按文件大小自动选：
 *  小文件走单请求直传；大文件切 8MB 分片。原因见 utils/chunkedUpload.ts 顶部的注释。
 *  预设那条路根本没有文件，所以和分片上传完全不搭界。
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  CircleCheck,
  FileText,
  Hash,
  History,
  Layers,
  Printer,
  Rocket,
  Upload,
  X,
} from '@lucide/vue'
import PageHeader from '@/components/PageHeader.vue'
import StageHead from '@/components/StageHead.vue'
import {
  NButton,
  NFormItem,
  NInput,
  NInputNumber,
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
import { chunkApi, orderApi, printOptionsApi } from '@/api/endpoints'
import type { ChunkSession, PaperType, PrintPreset } from '@/api/types'
import { pendingUploads, prettySize, uploadFile } from '@/utils/chunkedUpload'
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
const color = ref<'black' | 'color'>('black')
const duplex = ref<'single' | 'double'>('single')
const remark = ref('')
const copies = ref<number>(COPIES_DEFAULT)
const paperTypeId = ref<number | null>(null)
/** 选中的预设 id。null = 还没选，这时不允许提交（不能替学生挑一条）。 */
const presetId = ref<number | null>(null)
const router = useRouter()
const submitting = ref(false)
const progress = ref(0)
const uploadedBytes = ref(0)
const totalBytes = ref(0)
/** 服务端还留着的未完成上传，进页面时提醒一句 */
const pending = ref<ChunkSession[]>([])
/** 当前分片会话的 upload_id，组件卸载时若会话仍未完成就调 cancel 释放额度 */
const activeChunkUploadId = ref<string | null>(null)
/** 服务端给的启用中预设与纸张 */
const presets = ref<PrintPreset[]>([])
const paperTypes = ref<PaperType[]>([])
/** 预设/纸张清单没拉到时的提示语。清单为空**不等于**没有可选项 ——
 *  这两种情况在下拉框里长得一模一样（都是空的），但一个是「还没配置」、
 *  一个是「网络出问题了」。不给提示的话，学生只会以为这功能不存在。 */
const optionsError = ref('')
const optionsLoading = ref(true)
/** 下单成功后的回执 */
const receipt = ref<{ orderId: number; code: string; filename: string } | null>(null)

const selected = computed(() => fileList.value[0] ?? null)
const selectedFile = computed(() => selected.value?.file ?? null)

const usingPreset = computed(() => mode.value === 'preset')
const selectedPreset = computed(
  () => presets.value.find((item) => item.id === presetId.value) ?? null,
)

const presetOptions = computed(() =>
  presets.value.map((item) => ({ label: item.content, value: item.id })),
)
/** 纸张可以不选（后端落 NULL）。「不指定」是一个真实选项，
 *  不是「还没选」—— 所以我们不去猜一个默认纸张。 */
const paperOptions = computed(() =>
  paperTypes.value.map((item) => ({
    label: item.remark ? `${item.name} · ${item.remark}` : item.name,
    value: item.id,
  })),
)

/** 只有大文件才会走分片，提前告诉用户「会分几片」，免得他以为卡住了。 */
const chunkCount = computed(() => {
  const size = selectedFile.value?.size ?? 0
  return size > 8 * 1024 * 1024 ? Math.ceil(size / (8 * 1024 * 1024)) : 0
})

const progressHint = computed(() => {
  if (progress.value >= 99) return '正在生成订单，请不要关闭页面'
  return '正在上传，请不要关闭页面或断网'
})

/** 能不能提交。分两种模式各算一次，别合成一个布尔表达式 ——
 *  按钮上要显示的「为什么按不动」是两套完全不同的话。 */
const blockReason = computed<string | null>(() => {
  if (submitting.value) return null
  if (usingPreset.value) {
    if (!presets.value.length) return '还没有可用的预设打印服务'
    if (presetId.value === null) return '请选择一项预设打印服务'
    return null
  }
  if (!selected.value) return '请先选择要打印的文件'
  return null
})

async function loadOptions(): Promise<void> {
  optionsLoading.value = true
  optionsError.value = ''
  try {
    const data = await printOptionsApi.load()
    presets.value = data.presets ?? []
    paperTypes.value = data.paper_types ?? []
  } catch (error) {
    optionsError.value = error instanceof ApiError ? error.message : '打印选项加载失败'
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
    message.success('已放弃该上传，额度已释放')
    await refreshPending()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '取消失败，请稍后重试')
  }
}

/** 组件卸载时：若分片会话仍在进行就取消它，避免残留占用额度 */
onBeforeUnmount(() => {
  if (activeChunkUploadId.value) {
    void chunkApi.cancel(activeChunkUploadId.value).catch(() => {})
  }
})

function reset(): void {
  fileList.value = []
  remark.value = ''
  color.value = 'black'
  duplex.value = 'single'
  copies.value = COPIES_DEFAULT
  paperTypeId.value = null
  presetId.value = null
  mode.value = 'file'
  progress.value = 0
  uploadedBytes.value = 0
  totalBytes.value = 0
}

type OrderInfo = { orderId: number; code: string; filename: string }

/** 下单成功后的那一套：先出跨换场的回执，再跳到我的订单。
 *
 *  和登录成功走的是同一条（components/TransitionReceipt.vue 的 event 档）：
 *  回执压在换场覆盖层之上、跨过换场留在屏幕上，覆盖层自己的中心读数在回执期间让位
 *  （:root[data-receipt] 那条），所以整场只有一句话。
 *
 *  取件码写在回执的补充行上，而不是只留在这一页的成功面板里 ——
 *  面板会跟着跳转一起消失，而回执**跨过换场还在**，学生至少多一秒看清它。
 *  目标页名从路由表取，和守卫算的是同一份事实来源（与 LoginView 一致）。 */
function announceOrder(info: OrderInfo): void {
  showReceipt({
    code: 'ORDER SUBMITTED',
    title: '下单成功',
    detail: `取件码 ${pickupCodeLabel(info.code)} · ${info.filename}`,
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
  progress.value = 0
  uploadedBytes.value = 0
  try {
    // 份数已经是 number（NInputNumber），这里原样传 —— 不做字符串拼装、不做算术。
    // 顺着后端的口径走：份数只认整数，范围由服务端最终裁定。
    const common = {
      color: color.value,
      duplex: duplex.value,
      remark: remark.value.trim(),
      copies: copies.value ?? COPIES_DEFAULT,
      paper_type_id: paperTypeId.value,
    }

    if (usingPreset.value) {
      const preset = selectedPreset.value
      if (!preset) return
      const data = await orderApi.createPresetOrder({ preset_id: preset.id, ...common })
      const info = {
        orderId: data.order_id,
        code: data.pickup_code,
        filename: preset.content,
      }
      receipt.value = info
      reset()
      announceOrder(info)
      return
    }

    const file = selectedFile.value
    if (!file) return
    totalBytes.value = file.size
    const data = await uploadFile(
      file,
      common,
      (state) => {
        progress.value = state.percent
        uploadedBytes.value = state.uploaded
      },
      (uploadId) => {
        activeChunkUploadId.value = uploadId
      },
    )
    activeChunkUploadId.value = null
    const info = { orderId: data.order_id, code: data.pickup_code, filename: file.name }
    receipt.value = info
    reset()
    announceOrder(info)
  } catch (error) {
    if (error instanceof ApiError && error.status === 429) {
      // 额度已满：刷新 pending 列表，让顶部的「放弃这次上传」入口可见
      void refreshPending()
      message.error('额度已满，请先放弃一份未完成的上传')
    } else {
      message.error(error instanceof ApiError ? error.message : '提交失败，请稍后重试')
    }
  } finally {
    submitting.value = false
    // 不管成没成，服务端那边的会话状态都变了（成功则清掉，失败则留下一份半成品），
    // 这条提醒要跟着实际情况走。
    void refreshPending()
  }
}

onMounted(async () => {
  await Promise.all([refreshPending(), loadOptions()])
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <!-- 成功回执：取件码是页面上最该被看到的信息。
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
            <p class="font-heading text-base font-bold">下单成功</p>
            <p class="mt-0.5 truncate text-sm text-ink-3">
              订单 #{{ receipt.orderId }} · {{ receipt.filename }}
            </p>
            <div class="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
              <!-- 取件码是学生端唯一的"情绪峰值"：整页最该被记住的一件东西。
                   给它长臂角标框 + 底下一整条刻度尺 —— 像一张被框起来的凭证。
                   下单成功后这一页会立刻跳去我的订单（回执跨换场留着），所以这块面板平时
                   只是"跳转失败时还在原地"的兜底；取件码另外写进了那条回执的补充行。 -->
              <div class="bracket-lg px-4 py-3" style="--bracket-arm: 26px">
                <div class="tech-label mb-1.5 text-ink-3 tech-label--cn text-xs">取件码</div>
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
            <p class="mt-3 text-xs text-ink-4">
              管理员接单并打印完成后，凭上面的取件码到打印点取件。
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
        放弃这次上传
      </NButton>
    </section>

    <PageHeader
      heading="md"
      title="下单打印"
      :subtitle="
        usingPreset
          ? '选一项预设打印服务下单，管理员按它的说明打印，不需要上传文件。'
          : '支持 PDF、Word 和图片。上传后由管理员接单打印。'
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
            placeholder="选一项已经配置好的打印服务"
            class="w-full"
          />
        </NFormItem>

        <div
          v-if="selectedPreset"
          class="mt-3 flex items-start gap-3 border p-3"
          style="border-color: var(--border); background-color: var(--muted)"
        >
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
            <p class="text-base font-semibold">点击选择文件，或拖到这里</p>
            <p class="tech-label text-ink-4 text-2xs">PDF · JPG · PNG · DOC · DOCX</p>
          </div>
        </NUploadDragger>
      </NUpload>

      <!-- 已选文件 -->
      <div
        v-if="!usingPreset && selected"
        class="mt-3 flex items-center gap-3 border p-3"
        style="border-color: var(--border)"
      >
        <span
          class="grid size-9 shrink-0 place-items-center"
          style="background-color: var(--muted); color: var(--secondary)"
          aria-hidden="true"
        >
          <FileText :size="17" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold">{{ selected.name }}</p>
          <p class="tnum text-2xs text-ink-4">
            {{ selectedFile ? prettySize(selectedFile.size) : '' }}
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

      <!-- ② 打印参数 -->
      <StageHead code="02" title="打印参数" step="STEP 2/3" class="mt-6 mb-3" />

      <div class="grid gap-4 sm:grid-cols-2">
        <NFormItem label="打印颜色" :show-feedback="false" class="!mb-0">
          <NRadioGroup v-model:value="color" :disabled="submitting">
            <NRadioButton value="black">黑白</NRadioButton>
            <NRadioButton value="color">彩色</NRadioButton>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="单双面" :show-feedback="false" class="!mb-0">
          <NRadioGroup v-model:value="duplex" :disabled="submitting">
            <NRadioButton value="single">单面</NRadioButton>
            <NRadioButton value="double">双面</NRadioButton>
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
          />
        </NFormItem>
        <NFormItem label="纸张（可选）" :show-feedback="false" class="!mb-0">
          <NSelect
            v-model:value="paperTypeId"
            :options="paperOptions"
            :loading="optionsLoading"
            :disabled="submitting || optionsLoading"
            clearable
            placeholder="不指定"
            class="w-full"
          />
        </NFormItem>
      </div>
      <p class="mt-2 text-xs text-ink-4">
        份数范围 {{ COPIES_MIN }}-{{ COPIES_MAX }}。纸张由管理员维护，
        不确定就用「不指定」，打印时会按常规纸走。
      </p>

      <NFormItem label="备注（可选）" :show-feedback="false" class="mt-4">
        <NInput
          v-model:value="remark"
          type="textarea"
          :maxlength="200"
          show-count
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="例：只打印第 3-10 页；需要装订"
          :disabled="submitting"
        />
      </NFormItem>

      <!-- ③ 提交 -->
      <StageHead code="03" title="提交" step="STEP 3/3" class="mt-6 mb-3" />

      <!-- 上传进度。进度条只在真正上传时出现（而不是一直占着位置显示 0%），
           它存在本身就意味着「有事在发生」。预设单没有文件，所以这一块不会出现
           （它被 `submitting` 关着，但预设单提交时 totalBytes 是 0，
           进度条会出现一条 0/0 的空条 —— 所以这里还要排掉 usingPreset）。 -->
      <div v-if="submitting && !usingPreset" class="mt-4">
        <div class="mb-1.5 flex items-center justify-between gap-3 text-xs">
          <span class="text-ink-3">{{ progressHint }}</span>
          <span class="tnum shrink-0 text-ink-4">
            {{ prettySize(uploadedBytes) }} / {{ prettySize(totalBytes) }}
          </span>
        </div>
        <NProgress
          type="line"
          :percentage="progress"
          :height="6"
          :border-radius="0"
          :show-indicator="false"
          :status="progress >= 100 ? 'success' : 'default'"
        />
      </div>

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
          {{ submitting ? (usingPreset ? '提交中…' : '上传中…') : '提交订单' }}
        </NButton>
        <span class="tech-label flex items-center gap-1.5 text-ink-4 tech-label--cn text-xs">
          <Hash :size="12" />
          <template v-if="usingPreset">不需要上传文件，提交后立即生成取件码</template>
          <template v-else-if="chunkCount">分 {{ chunkCount }} 片上传，断了可续传</template>
          <template v-else>上传完成后立即生成取件码</template>
        </span>
      </div>
    </div>
  </div>
</template>
