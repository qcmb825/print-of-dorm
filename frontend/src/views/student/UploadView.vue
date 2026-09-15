<script setup lang="ts">
/** 学生下单：选文件 + 打印选项，上传成功后把取件码放大展示 —— 那是学生真正要记住的东西。 */
import { computed, ref } from 'vue'
import { CircleCheck, FileText, Hash, Rocket, Upload, X } from '@lucide/vue'
import {
  NButton,
  NFormItem,
  NInput,
  NRadioButton,
  NRadioGroup,
  NUpload,
  NUploadDragger,
  useMessage,
  type UploadFileInfo,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { orderApi } from '@/api/endpoints'
import { pickupCodeLabel } from '@/utils/format'

const message = useMessage()

/** 与后端 config.ALLOWED_EXTENSIONS 对齐；只用于提前拦掉白名单外的文件，省一次大文件上传。
 *  真正的把关在服务端（上传接口会再校验一次）。 */
const ACCEPT = '.pdf,.jpg,.jpeg,.png,.doc,.docx'

const fileList = ref<UploadFileInfo[]>([])
const color = ref<'black' | 'color'>('black')
const duplex = ref<'single' | 'double'>('single')
const remark = ref('')
const submitting = ref(false)
const progress = ref(0)
/** 下单成功后的回执 */
const receipt = ref<{ orderId: number; code: string; filename: string } | null>(null)

const selected = computed(() => fileList.value[0] ?? null)
const selectedFile = computed(() => selected.value?.file ?? null)

function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function reset(): void {
  fileList.value = []
  remark.value = ''
  color.value = 'black'
  duplex.value = 'single'
  progress.value = 0
}

async function submit(): Promise<void> {
  const file = selectedFile.value
  if (!file) {
    message.warning('请先选择要打印的文件')
    return
  }
  submitting.value = true
  progress.value = 0
  try {
    const data = await orderApi.upload(
      file,
      { color: color.value, duplex: duplex.value, remark: remark.value.trim() },
      (percent) => {
        progress.value = percent
      },
    )
    receipt.value = { orderId: data.order_id, code: data.pickup_code, filename: file.name }
    reset()
    message.success('下单成功，请记住取件码')
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '上传失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <!-- 成功回执：取件码是页面上最该被看到的信息。
         这里给整页唯一一段「有分量」的动效（rare 档，一单只出现一次）：0.97→1 的缩放配淡入，
         只用透明度会像换了张图，不像「东西出现了」。起点是 0.97 而不是 0 —— 现实里没有东西
         从虚无里冒出来，scale(0) 一律禁止。 -->
    <Transition
      enter-active-class="transition duration-[240ms] ease-out"
      enter-from-class="opacity-0 scale-[0.97]"
      leave-active-class="transition duration-[140ms] ease-out"
      leave-to-class="opacity-0"
    >
      <section
        v-if="receipt"
        class="panel mb-4 border-primary/40 p-4 sm:p-5"
        role="status"
        aria-live="polite"
      >
        <div class="flex items-start gap-3">
          <span
            class="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg"
            style="background-color: var(--status-done-bg); color: var(--status-done)"
            aria-hidden="true"
          >
            <CircleCheck :size="17" />
          </span>
          <div class="min-w-0 flex-1">
            <h2 class="font-heading text-base font-bold">下单成功</h2>
            <p class="mt-0.5 truncate text-[13px] text-ink-3">
              订单 #{{ receipt.orderId }} · {{ receipt.filename }}
            </p>
            <div class="mt-3 flex flex-wrap items-end gap-x-6 gap-y-2">
              <div>
                <div class="tech-label mb-1 text-ink-4">取件码</div>
                <div
                  class="tnum font-heading text-[34px] leading-none font-bold tracking-[0.12em]"
                  style="color: var(--primary)"
                >
                  {{ pickupCodeLabel(receipt.code) }}
                </div>
              </div>
              <NButton size="small" quaternary @click="receipt = null">再下一单</NButton>
            </div>
            <p class="mt-3 text-[12px] text-ink-4">
              管理员接单并打印完成后，凭上面的取件码到打印点取件。
            </p>
          </div>
        </div>
      </section>
    </Transition>

    <div class="panel p-4 sm:p-5">
      <h1 class="font-heading text-lg font-bold sm:text-xl">下单打印</h1>
      <p class="mt-1 mb-4 text-[13px] text-ink-3">
        支持 PDF、Word 和图片。上传后由管理员接单打印。
      </p>

      <NUpload
        v-model:file-list="fileList"
        :default-upload="false"
        :max="1"
        :accept="ACCEPT"
        class="block"
      >
        <NUploadDragger>
          <div class="flex flex-col items-center gap-2 py-5">
            <span
              class="grid size-11 place-items-center rounded-xl border"
              style="
                background-color: var(--accent-tint);
                border-color: var(--accent-tint-border);
                color: var(--primary);
              "
              aria-hidden="true"
            >
              <Upload :size="20" />
            </span>
            <p class="text-[14px] font-semibold">点击选择文件，或拖到这里</p>
            <p class="tech-label text-ink-4">PDF · JPG · PNG · DOC · DOCX</p>
          </div>
        </NUploadDragger>
      </NUpload>

      <!-- 已选文件 -->
      <div
        v-if="selected"
        class="mt-3 flex items-center gap-3 rounded-xl border p-3"
        style="border-color: var(--border)"
      >
        <span
          class="grid size-9 shrink-0 place-items-center rounded-lg"
          style="background-color: var(--muted); color: var(--secondary)"
          aria-hidden="true"
        >
          <FileText :size="17" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-[13px] font-semibold">{{ selected.name }}</p>
          <p class="tnum text-[11px] text-ink-4">
            {{ selectedFile ? prettySize(selectedFile.size) : '' }}
          </p>
        </div>
        <NButton
          quaternary
          circle
          size="small"
          aria-label="移除已选文件"
          :disabled="submitting"
          @click="fileList = []"
        >
          <template #icon><X :size="15" /></template>
        </NButton>
      </div>

      <div class="mt-4 grid gap-4 sm:grid-cols-2">
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
      </div>

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

      <div class="mt-4 flex items-center gap-3">
        <NButton
          type="primary"
          size="large"
          class="!font-bold shadow-[var(--glow-primary)]"
          :loading="submitting"
          :disabled="!selected"
          @click="submit"
        >
          <template #icon><Rocket :size="16" /></template>
          {{ submitting ? `上传中 ${progress}%` : '提交订单' }}
        </NButton>
        <span class="tech-label flex items-center gap-1.5 text-ink-4">
          <Hash :size="12" />
          上传完成后立即生成取件码
        </span>
      </div>
    </div>
  </div>
</template>
