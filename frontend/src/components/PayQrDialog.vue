<script setup lang="ts">
/** 我的微信收款码：上传、预览、替换、删除。
 *
 *  为什么需要这个入口：学生收到「可取件」邮件后是扫码付款的，而**谁接的单就付给谁** ——
 *  邮件里嵌的必须是接单人自己的码。全站只放一张码的话，换个管理员接单，
 *  钱还是进原来那个人账上，而且不会报错。
 *
 *  没上传**不算故障**：邮件照发，只是不带图、文案换成「到取件点向管理员付款」
 *  （见 mail/pickup.py 的 has_qr 分支）。所以下面那块占位区写的是「还没有上传」，
 *  不是红色的错误提示 —— 它描述的是状态，不是出了问题。
 */
import { computed, ref, watch } from 'vue'
import { ImagePlus, QrCode, Trash2 } from '@lucide/vue'
import { NAlert, NButton, NModal, useMessage } from 'naive-ui'
import { ApiError } from '@/api/client'
import { authApi } from '@/api/endpoints'
import { confirmAction } from '@/composables/feedback'
import { useAuthStore } from '@/stores/auth'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ 'update:show': [boolean] }>()

const auth = useAuthStore()
const message = useMessage()

const fileInput = ref<HTMLInputElement | null>(null)
const busy = ref(false)
/** 图片加载失败。库里有文件名、磁盘上那张图却被清掉时就是这个样子 ——
 *  <img> 只留一片空白，不单独标一句的话，看起来和「没上传」一模一样。 */
const broken = ref(false)

const visible = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
})

const version = computed(() => auth.user?.pay_qr_version ?? '')
const previewUrl = computed(() => authApi.payQr.url(version.value))
const hasQr = computed(() => auth.user?.has_pay_qr === true && !broken.value)

/** 每次打开都重新判一次图片是否还在，不然失败过一次就再也不会重新尝试加载。 */
watch(visible, (open) => {
  if (open) broken.value = false
})

/** 上限跟后端 config.PAY_QR_MAX_BYTES 保持一致（2MB）。
 *  前端拦这一道只是为了让用户不必先传完 20MB 才知道超了；
 *  真正说「不」的始终是服务端，所以这里挡不住也不影响正确性。 */
const MAX_BYTES = 2 * 1024 * 1024

async function onFile(event: Event): Promise<void> {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  // 先把 input 清空：不清的话，连着两次选同一个文件不会再触发 change，
  // 用户看到的就是「点了选择图片，然后什么都没发生」。
  input.value = ''
  if (!file) return

  if (!/\.(png|jpe?g)$/i.test(file.name)) {
    message.error('只支持 PNG / JPG 图片')
    return
  }
  if (file.size > MAX_BYTES) {
    message.error('图片太大了（上限 2 MB），请压缩后再上传')
    return
  }

  busy.value = true
  try {
    const data = await authApi.payQr.upload(file)
    auth.setPayQr(data.pay_qr_version ?? '')
    broken.value = false
    message.success('收款码已更新')
  } catch (err) {
    message.error(err instanceof ApiError ? err.message : '上传失败，请稍后重试')
  } finally {
    busy.value = false
  }
}

async function onRemove(): Promise<void> {
  const ok = await confirmAction({
    title: '删除收款码',
    content: '删除后取件邮件里不再带收款码图片，会改成让学生到取件点找你付款。',
    positiveText: '删除',
    dangerous: true,
  })
  if (!ok) return

  busy.value = true
  try {
    await authApi.payQr.remove()
    auth.setPayQr('')
    broken.value = false
    message.success('收款码已删除')
  } catch (err) {
    message.error(err instanceof ApiError ? err.message : '删除失败，请稍后重试')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    title="我的微信收款码"
    :style="{ width: 'min(92vw, 420px)' }"
    :mask-closable="!busy"
    :closable="!busy"
  >
    <div class="flex flex-col gap-4">
      <NAlert type="info" :bordered="false">
        <!-- 正文里的「你」要落到实处：这条最容易被误解成「传一张全站公用的码」，
             所以第一句先说清归属，再说发不出去的后果。 -->
        谁接的单，学生就付给谁 —— 所以这张码只代表你自己。
        上传后它会出现在你接单的取件邮件里；不上传也能用，只是邮件里不带图。
      </NAlert>

      <div
        class="grid min-h-[200px] place-items-center border border-dashed p-4"
        style="border-color: var(--border); background-color: var(--muted)"
      >
        <img
          v-if="hasQr"
          :src="previewUrl"
          alt="我的微信收款码"
          class="max-h-[260px] w-auto max-w-full object-contain"
          @error="broken = true"
        />
        <div v-else class="flex flex-col items-center gap-2 text-center">
          <QrCode :size="34" class="opacity-40" aria-hidden="true" />
          <p class="text-sm font-semibold">
            {{ broken ? '这张图读不到了' : '还没有上传收款码' }}
          </p>
          <p class="text-xs opacity-60">
            {{
              broken
                ? '服务端还记着它，但文件已经不在了，重新上传一张即可。'
                : '上传后，学生收到的取件邮件里会带上它。'
            }}
          </p>
        </div>
      </div>

      <input
        ref="fileInput"
        type="file"
        accept="image/png,image/jpeg"
        class="hidden"
        @change="onFile"
      />

      <div class="flex items-center gap-2">
        <NButton type="primary" :loading="busy" @click="fileInput?.click()">
          <template #icon><ImagePlus :size="15" /></template>
          {{ hasQr || broken ? '换一张' : '上传收款码' }}
        </NButton>
        <!-- 没码时不给删除按钮：那个按钮点下去什么都不会发生，
             留着只是让人以为「是不是我这里坏了」。 -->
        <NButton v-if="auth.user?.has_pay_qr" :disabled="busy" @click="onRemove">
          <template #icon><Trash2 :size="15" /></template>
          删除
        </NButton>
      </div>

      <p class="text-xs leading-relaxed opacity-60">
        支持 PNG / JPG，不超过 2 MB。建议用微信「收付款 - 二维码收款」里保存下来的那张原图，
        截图也行，但别裁掉码四周的留白 —— 留白没了有些手机扫不出来。
      </p>
    </div>
  </NModal>
</template>
