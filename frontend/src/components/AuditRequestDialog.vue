<script setup lang="ts">
/** 身份审核通道：学号不在名单上时，本人提申请 -> 管理员核对 -> 通过后才能注册。
 *
 *  为什么做成对话框而不是单独一个页面：它出现的时机是**注册被拦下的那一刻**，
 *  用户手上正拿着刚填好的那一份资料。跳走一页，回来时表单空了，他得重新填一遍 ——
 *  所以这里接收注册表单的预填值，让他只需要补一句「为什么名单里没有我」。
 *
 *  两个页签：提交申请、查询进度。查询要**学号 + 联系方式两个都对**才给看
 *  （后端定的规矩，理由见 routes/audit.py），所以两条输入都得留着。
 */
import { computed, reactive, ref, watch } from 'vue'
import { CircleAlert, CircleCheck, CircleHelp, Loader2, Send } from '@lucide/vue'
import {
  NAlert,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NSelect,
  NTabPane,
  NTabs,
  useMessage,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { auditApi } from '@/api/endpoints'
import { CONTACT_LABELS, type AuditStatus, type ContactType } from '@/api/types'
import { fullTime } from '@/utils/format'
import {
  CONTACT_HINT,
  CONTACT_PLACEHOLDER,
  REALNAME_RE,
  STUDENT_ID_RE,
  validateContact,
} from '@/utils/validators'

/** 注册表单里已有的值，用来把申请表单预先填好。 */
export interface AuditPrefill {
  student_id?: string
  real_name?: string
  contact_type?: ContactType
  contact?: string
}

const props = defineProps<{ show: boolean; prefill?: AuditPrefill }>()
const emit = defineEmits<{ 'update:show': [boolean] }>()

const message = useMessage()

/** 说明给个下限是有意的：只写一个「无」字，管理员没有任何可以下手核对的东西，
 *  只能回头再问一遍，一次审核变成两次。上下限跟后端 config.AUDIT_NOTE_MIN/MAX 一致。 */
const NOTE_MIN = 4
const NOTE_MAX = 200

const visible = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
})

const tab = ref<'submit' | 'query'>('submit')
const submitting = ref(false)
const querying = ref(false)
const submitted = ref(false)

const form = reactive({
  student_id: '',
  real_name: '',
  contact_type: 'wechat' as ContactType,
  contact: '',
  note: '',
})
const formRef = ref<FormInst | null>(null)

const queryForm = reactive({ student_id: '', contact: '' })
const queryRef = ref<FormInst | null>(null)

/** 查到的结果。rejected 时把理由展示出来 —— 那段字本来就是写给申请人看的。 */
const result = ref<{
  status: AuditStatus
  status_label: string
  review_note: string | null
  create_time: string | null
  review_time: string | null
} | null>(null)

const contactOptions = (Object.keys(CONTACT_LABELS) as ContactType[]).map((value) => ({
  label: CONTACT_LABELS[value],
  value,
}))

const rules = computed<FormRules>(() => ({
  student_id: [
    { required: true, message: '学号为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => STUDENT_ID_RE.test(value),
      message: '学号 4-20 位数字',
      trigger: ['blur', 'input'],
    },
  ],
  real_name: [
    { required: true, message: '姓名为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => REALNAME_RE.test(value),
      message: '姓名 2-20 位 · 中文或字母',
      trigger: ['blur', 'input'],
    },
  ],
  contact: [
    { required: true, message: '联系方式为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) =>
        value.length <= 50 && validateContact(form.contact_type, value),
      message: '联系方式格式无效',
      trigger: ['blur', 'input'],
    },
  ],
  note: [
    { required: true, message: '情况说明为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) =>
        value.trim().length >= NOTE_MIN && value.trim().length <= NOTE_MAX,
      message: `${NOTE_MIN}-${NOTE_MAX} 字`,
      trigger: ['blur', 'input'],
    },
  ],
}))

const queryRules: FormRules = {
  student_id: [{ required: true, message: '学号为必填', trigger: ['blur', 'input'] }],
  contact: [{ required: true, message: '填写申请时留下的联系方式', trigger: ['blur', 'input'] }],
}

// 每次打开都把注册表单里已有的值带进来。用 watch 而不是 props 默认值：
// 用户可能先自己点开、又去改了注册表单再回来，默认值只会在组件挂载时算一次。
watch(
  () => props.show,
  (open) => {
    if (!open) return
    const pre = props.prefill ?? {}
    if (pre.student_id) form.student_id = pre.student_id
    if (pre.real_name) form.real_name = pre.real_name
    if (pre.contact_type) form.contact_type = pre.contact_type
    if (pre.contact) form.contact = pre.contact
  },
  { immediate: true },
)

async function submit(): Promise<void> {
  try {
    await formRef.value?.validate()
  } catch {
    return
  }
  submitting.value = true
  try {
    await auditApi.submit({
      student_id: form.student_id.trim(),
      real_name: form.real_name.trim(),
      contact_type: form.contact_type,
      contact: form.contact.trim(),
      note: form.note.trim(),
    })
    submitted.value = true
    message.success('申请已提交 · 待审核')
    // 顺手把查询页填好：这个弹窗关掉之后，用户下次回来大概率是来问「到哪一步了」，
    // 而他要填的两个值刚刚就在手上。
    queryForm.student_id = form.student_id.trim()
    queryForm.contact = form.contact.trim()
    tab.value = 'query'
    await check()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '提交未完成 · 稍后重试')
  } finally {
    submitting.value = false
  }
}

async function check(): Promise<void> {
  try {
    await queryRef.value?.validate()
  } catch {
    // 从提交后自动跳到查询时表单是预填好的，这里不该拦；
    // 真被拦下（用户把预填内容删了）就直接返回，校验提示已经显示了
    return
  }
  querying.value = true
  try {
    const data = await auditApi.status(queryForm.student_id.trim(), queryForm.contact.trim())
    result.value = data.request
  } catch (error) {
    result.value = null
    // 学号不存在和联系方式对不上在后端是同一句话（防「拿学号挨个试」），
    // 前端照原样显示，不自己拆开说。
    message.error(error instanceof ApiError ? error.message : '查询未完成 · 稍后重试')
  } finally {
    querying.value = false
  }
}
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    class="max-w-[520px]"
    :title="submitted ? '申请已提交' : '身份审核申请'"
    :bordered="false"
    :mask-closable="false"
  >
    <NTabs v-model:value="tab" type="line" animated>
      <NTabPane name="submit" tab="提交申请">
        <NAlert v-if="submitted" type="success" :bordered="false" class="mb-4">
          审核通过后即可用该学号注册 · 进度可随时回来查。
        </NAlert>

        <p class="mb-4 text-sm leading-6 text-ink-3">
          名单上查不到学号时才需要提交 · 填一份能联系到你的资料，由管理员人工核对。
          <span class="text-ink-3">一个学号只能提交一次。</span>
        </p>

        <NForm
          ref="formRef"
          :model="form"
          :rules="rules"
          label-placement="top"
          :show-require-mark="false"
          @submit.prevent="submit"
        >
          <div class="grid gap-x-3 sm:grid-cols-2">
            <NFormItem label="学号" path="student_id">
              <NInput v-model:value="form.student_id" placeholder="4-20 位数字" />
            </NFormItem>
            <NFormItem label="姓名" path="real_name">
              <NInput v-model:value="form.real_name" placeholder="真实姓名" />
            </NFormItem>
          </div>

          <NFormItem label="联系方式" path="contact">
            <div class="flex w-full gap-2">
              <NSelect
                v-model:value="form.contact_type"
                :options="contactOptions"
                class="!w-[112px] shrink-0"
                :consistent-menu-width="false"
              />
              <NInput
                v-model:value="form.contact"
                :placeholder="CONTACT_PLACEHOLDER[form.contact_type]"
                class="min-w-0 flex-1"
              />
            </div>
          </NFormItem>
          <p class="-mt-3 mb-3 text-xs text-ink-3">
            {{ CONTACT_HINT[form.contact_type] }}
          </p>

          <NFormItem label="情况说明" path="note">
            <NInput
              v-model:value="form.note"
              type="textarea"
              :rows="3"
              :maxlength="NOTE_MAX"
              show-count
              :placeholder="
                '例：新生还没录进名单 / 转专业换过学号 / 名单里的名字写错了（' +
                NOTE_MIN +
                '-' +
                NOTE_MAX +
                ' 字）'
              "
            />
          </NFormItem>

          <NButton
            type="primary"
            block
            size="large"
            :loading="submitting"
            class="!font-bold"
            @click="submit"
          >
            提交申请
            <template #icon><Send :size="16" /></template>
          </NButton>
        </NForm>
      </NTabPane>

      <NTabPane name="query" tab="查询进度">
        <p class="mb-4 text-sm leading-6 text-ink-3">
          填申请时留下的<strong>学号与联系方式</strong> · 两个都对才查得到
          （防止拿学号逐个试出谁申请过）。
        </p>

        <NForm
          ref="queryRef"
          :model="queryForm"
          :rules="queryRules"
          label-placement="top"
          :show-require-mark="false"
          @submit.prevent="check"
        >
          <NFormItem label="学号" path="student_id">
            <NInput v-model:value="queryForm.student_id" placeholder="4-20 位数字" />
          </NFormItem>
          <NFormItem label="申请时留下的联系方式" path="contact">
            <NInput
              v-model:value="queryForm.contact"
              placeholder="微信 / QQ / 邮箱"
              @keydown.enter="check"
            />
          </NFormItem>
          <NButton type="primary" block :loading="querying" class="!font-bold" @click="check">
            查询
          </NButton>
        </NForm>

        <div v-if="result" class="mt-5 border-t pt-4" style="border-color: var(--border)">
          <div class="flex items-center gap-2">
            <component
              :is="result.status === 'approved' ? CircleCheck : result.status === 'rejected' ? CircleAlert : Loader2"
              :size="16"
              :style="{
                color:
                  result.status === 'approved'
                    ? 'var(--status-done)'
                    : result.status === 'rejected'
                      ? 'var(--err)'
                      : 'var(--status-unpriced)',
              }"
            />
            <span class="font-heading text-base font-bold">{{ result.status_label }}</span>
          </div>

          <p class="mt-2 text-xs text-ink-3">提交于 {{ fullTime(result.create_time) }}</p>
          <p v-if="result.review_time" class="text-xs text-ink-3">
            处理于 {{ fullTime(result.review_time) }}
          </p>

          <NAlert
            v-if="result.review_note"
            :type="result.status === 'rejected' ? 'error' : 'default'"
            :bordered="false"
            class="mt-3"
          >
            {{ result.review_note }}
          </NAlert>

          <p v-if="result.status === 'approved'" class="mt-3 text-sm leading-6">
            现在可以用该学号注册。
          </p>
          <p v-else-if="result.status === 'rejected'" class="mt-3 text-sm leading-6 text-ink-3">
            情况有变化 · 找管理员当面说明；一个学号只有一条记录，
            不能重复提交。
          </p>
        </div>

        <p v-else class="mt-5 flex items-center gap-1.5 text-xs text-ink-3">
          <CircleHelp :size="13" />
          无此记录 · 学号与联系方式都对才查得到。
        </p>
      </NTabPane>
    </NTabs>
  </NModal>
</template>
