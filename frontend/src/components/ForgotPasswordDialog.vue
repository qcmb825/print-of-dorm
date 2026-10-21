<script setup lang="ts">
/** 忘记密码：两步式找回（① 学号 → 发验证码到 QQ 邮箱 ② 验证码 + 新密码 → 重置）。
 *
 *  为什么是**弹窗**而不是登录页的第三个页签：它是「登录失败之后的补救路径」。
 *  做成页签的话，每天正常登录的人也得在三个选项里先做一次选择；而真正需要它的人，
 *  恰恰是刚刚在密码框前面卡住的那一个 —— 入口贴在密码框下方、弹窗盖在同一块登录面板上，
 *  路径最短，又不打扰主流程。
 *
 *  两条与后端约定绑死的纪律（改文案前先看 routes/account.py 的密码找回那一段）：
 *   · 服务端对「学号存不存在」**永远回同一句话**，前端绝不自己加「该学号不存在」之类的判断 ——
 *     那等于把找回接口变成一个学号探测器；
 *   · 发码与验码都限流，命中是 429。这里只把服务端的 msg 原样显示，不翻译成「学号不对」，
 *     因为「学号不对」正是限流要掩盖的信息。
 */
import { computed, nextTick, onBeforeUnmount, reactive, ref, watch } from 'vue'
import { ArrowLeft, CircleCheck, Send } from '@lucide/vue'
import {
  NAlert,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  type FormInst,
  type FormRules,
  type InputInst,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { passwordApi } from '@/api/endpoints'
import { STUDENT_ID_RE } from '@/utils/validators'

const props = defineProps<{ show: boolean; prefill?: string }>()
const emit = defineEmits<{
  'update:show': [boolean]
  /** 重置成功。父组件负责关弹窗、切回登录页签、把学号填进登录框并提示。 */
  success: [studentId: string]
}>()

/** 重发间隔。服务端另有自己的限流（60 秒只是界面上的按钮节流，不是边界）；
 *  真被服务端 429 挡下时，msg 会原样显示在弹窗里。 */
const RESEND_SECONDS = 60
const CODE_LEN = 6
/** 只做长度这一层即时反馈，**强度（字母 + 数字）交给服务端**：
 *  前端比后端更严时，学生会被一个「服务端其实会接受」的密码挡在门外，
 *  而红字只会说「需同时含字母与数字」—— 他改到最后也不知道是谁在拦。 */
const PASSWORD_MIN = 8
const PASSWORD_MAX = 64

const visible = computed({
  get: () => props.show,
  set: (value: boolean) => emit('update:show', value),
})

const step = ref<1 | 2>(1)
const sending = ref(false)
const submitting = ref(false)
/** 发码成功后**原样**展示服务端那句话（它刻意不区分账号是否存在）。 */
const serverNotice = ref('')
/** 失败时把服务端 msg 原样摆在弹窗里 —— 不关弹窗、不清空用户填的东西。 */
const serverError = ref('')

const sendForm = reactive({ student_id: props.prefill?.trim() ?? '' })
const resetForm = reactive({ code: '', password: '', confirm_password: '' })

const sendRef = ref<FormInst | null>(null)
const resetRef = ref<FormInst | null>(null)
const sendInput = ref<InputInst | null>(null)
const codeInput = ref<InputInst | null>(null)

/* ---- 倒计时 ----
 * 计时器只存本地变量、不进响应式：它会被 onBeforeUnmount 清掉，而组件销毁之后
 * 还在跑的 setInterval 会一直去写一个已经没人看的 ref（dev 下还会报警告）。
 * 关弹窗**不**清计时器也不重置：用户很可能是去邮箱里翻验证码，回来还接着填；
 * 这时候按钮若又能点，就等于白白给自己刷一次服务端限流。 */
const countdown = ref(0)
let timer: number | null = null

function clearTimer(): void {
  if (timer !== null) {
    window.clearInterval(timer)
    timer = null
  }
}

function startCountdown(): void {
  clearTimer()
  countdown.value = RESEND_SECONDS
  timer = window.setInterval(() => {
    countdown.value -= 1
    if (countdown.value <= 0) {
      countdown.value = 0
      clearTimer()
    }
  }, 1000)
}

onBeforeUnmount(clearTimer)

/** 验证码只收数字。
 *
 *  两个理由：① 输入法会把全角数字（１２３４５６）当正常输入，服务端拿到就是「验证码不对」，
 *  而界面上一串数字看着完全一样；② 粘贴常带空格。所以先转半角、再剔掉非数字、再截到 6 位 ——
 *  这一条属于「别让用户的输入在看不见的地方变形」，不是安全边界（边界在服务端）。 */
const codeValue = computed({
  get: () => resetForm.code,
  set: (value: string) => {
    const halfWidth = value.replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - 0xfee0),
    )
    resetForm.code = halfWidth.replace(/\D/g, '').slice(0, CODE_LEN)
  },
})

/* 学号规则与登录页那一套逐字对齐（LoginView 的 registerRules.student_id）：
 * 同一条正则、同一句提示 —— 这里放宽或收紧，都会出现「找回能填、注册不能填」这种怪事。 */
const sendRules: FormRules = {
  student_id: [
    { required: true, message: '学号为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => STUDENT_ID_RE.test(value),
      message: '学号 4-20 位数字',
      trigger: ['blur', 'input'],
    },
  ],
}

const resetRules: FormRules = {
  code: [
    { required: true, message: '验证码为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => value.length === CODE_LEN,
      message: `验证码 ${CODE_LEN} 位数字`,
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    { required: true, message: '新密码为必填', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) =>
        value.length >= PASSWORD_MIN && value.length <= PASSWORD_MAX,
      message: `新密码 ${PASSWORD_MIN}-${PASSWORD_MAX} 位`,
      trigger: ['blur', 'input'],
    },
  ],
  confirm_password: [
    { required: true, message: '请再输一次新密码', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => value === resetForm.password,
      message: '两次密码不一致',
      trigger: ['blur', 'input'],
    },
  ],
}

/** 发码（第一步的主按钮，也是第二步的「重新发送」）。
 *
 *  成功后自动进第二步：验证码已经发出去了，让用户再点一次「下一步」没有意义。
 *  失败（含 429）只把 msg 摆在弹窗里 —— 429 时按钮仍然可点，用户自己决定要不要再试，
 *  后端会继续按 IP + 学号计数。 */
async function sendCode(): Promise<void> {
  if (sending.value || countdown.value > 0) return
  try {
    await sendRef.value?.validate()
  } catch {
    return
  }
  sending.value = true
  serverError.value = ''
  try {
    const response = await passwordApi.forgot(sendForm.student_id.trim())
    // 服务端那句话本身就是给用户看的（它故意不区分学号是否存在），照抄，不改写、不判断。
    serverNotice.value = response.msg
    step.value = 2
    startCountdown()
  } catch (error) {
    serverError.value = error instanceof ApiError ? error.message : '验证码发送未完成 · 稍后重试'
  } finally {
    sending.value = false
  }
}

async function submitReset(): Promise<void> {
  if (submitting.value) return
  try {
    await resetRef.value?.validate()
  } catch {
    return
  }
  submitting.value = true
  serverError.value = ''
  const studentId = sendForm.student_id.trim()
  try {
    await passwordApi.reset({
      student_id: studentId,
      code: resetForm.code,
      password: resetForm.password,
    })
    // ⚠️ 这里**不**自动登录。服务端在重置密码时已经让该账号的所有会话失效（包括当前这个浏览器），
    // 手里的 Cookie 已经是废票；「重置成功」不等于「已登录」，必须回登录页用新密码走一次 /api/login。
    // 自动登录在这套契约下只会得到一个 401，用户看到的就是「密码改好了、人却被踢出去」。
    endRound()
    emit('success', studentId)
  } catch (error) {
    // 400（验证码不对 / 已过期）和 429（太频繁）都到这儿：**不关弹窗、不清输入**。
    // 用户刚把密码输了两遍，清掉等于让他从头再来一次。
    serverError.value = error instanceof ApiError ? error.message : '重置未完成 · 稍后重试'
  } finally {
    submitting.value = false
  }
}

/** 一轮结束（重置成功）时把两步的状态清干净。
 *
 *  不清的后果很具体：用户下次点「忘记密码」会看见上一轮的验证码、刚设的新密码
 *  和一句「验证码已发送」，看起来像上一次没做完。
 *  倒计时也一起清 —— 它约束的是「这一轮的那个验证码」，而那一轮已经用掉并作废了；
 *  留着它只会让下一次找回白等 60 秒。 */
function endRound(): void {
  clearTimer()
  countdown.value = 0
  step.value = 1
  serverNotice.value = ''
  serverError.value = ''
  sendForm.student_id = ''
  resetForm.code = ''
  resetForm.password = ''
  resetForm.confirm_password = ''
}

/** 回第一步改学号。不清已填的验证码/密码：改完学号回来还得重新做一遍，
 *  但把密码框清空只是多打几遍字，反而让人以为「刚才那步白做了」。 */
async function goBack(): Promise<void> {
  step.value = 1
  serverError.value = ''
  await nextTick()
  sendInput.value?.focus()
}

/** 弹窗打开时焦点落在第一个输入框（第一步是学号，第二步是验证码）。
 *  挂在 NModal 的 after-enter 上而不是 watch(props.show) + nextTick：
 *  弹窗内容是懒挂载的，那个时刻 ref 还不一定存在。 */
function focusFirst(): void {
  if (step.value === 1) sendInput.value?.focus()
  else codeInput.value?.focus()
}

watch(
  () => props.show,
  (open) => {
    if (!open) return
    // 登录框里已经输的学号顺手带进来（用户多半是先输了学号、才想起密码忘了）。
    // 只在本地为空时补：他可能在弹窗里已经改成另一个学号了，覆盖掉就是抢用户的输入。
    if (props.prefill && !sendForm.student_id) sendForm.student_id = props.prefill.trim()
    // 上一次的错误不带进新一轮：那句话说的是上一组输入。
    serverError.value = ''
  },
)
</script>

<template>
  <NModal
    v-model:show="visible"
    preset="card"
    class="max-w-[460px]"
    :title="step === 1 ? '找回密码' : '设置新密码'"
    :bordered="false"
    :mask-closable="false"
    @after-enter="focusFirst"
  >
    <div class="mb-3 flex items-center justify-between gap-3">
      <span class="readout">STEP 0{{ step }} / 02</span>
      <span class="readout">{{ step === 1 ? 'VERIFY ID' : 'RESET CREDENTIAL' }}</span>
    </div>

    <!-- 服务端发码成功的那句话：照抄，不加工。它刻意对「有没有这个学号」给出同一种回答。 -->
    <NAlert v-if="serverNotice && step === 2" type="success" :bordered="false" class="mb-4">
      {{ serverNotice }}
    </NAlert>
    <!-- 失败信息原样显示。用 alert 而不是 toast：toast 会自己消失，
         而这里往往是用户要照着改的东西（验证码错了 / 稍后再试）。 -->
    <NAlert v-if="serverError" type="error" :bordered="false" class="mb-4">
      {{ serverError }}
    </NAlert>

    <!-- ① 输学号 → 发码 -->
    <NForm
      v-if="step === 1"
      ref="sendRef"
      :model="sendForm"
      :rules="sendRules"
      label-placement="top"
      :show-require-mark="false"
      @submit.prevent="sendCode"
    >
      <p class="mb-4 text-sm leading-6 text-ink-3">
        验证码会发到你注册时填的 QQ 邮箱（QQ号@qq.com）。没收到？确认学号没输错，或过一分钟再试。
      </p>

      <NFormItem label="学号" path="student_id">
        <NInput
          ref="sendInput"
          v-model:value="sendForm.student_id"
          placeholder="4-20 位数字"
          :maxlength="20"
          autocomplete="username"
          :input-props="{ inputmode: 'numeric', autocapitalize: 'off', autocorrect: 'off' }"
          @keydown.enter="sendCode"
        />
      </NFormItem>

      <NButton
        type="primary"
        block
        size="large"
        :loading="sending"
        :disabled="countdown > 0"
        class="!font-bold"
        @click="sendCode"
      >
        {{ countdown > 0 ? `${countdown} 秒后可重发` : '发送验证码' }}
        <template #icon><Send :size="16" /></template>
      </NButton>
    </NForm>

    <!-- ② 验证码 + 新密码 -->
    <div v-else>
      <div class="mb-4 flex items-center gap-2 border-b pb-2" style="border-color: var(--border)">
        <span class="readout">学号</span>
        <span class="readout ml-auto">{{ sendForm.student_id }}</span>
      </div>

      <NForm
        ref="resetRef"
        :model="resetForm"
        :rules="resetRules"
        label-placement="top"
        :show-require-mark="false"
        @submit.prevent="submitReset"
      >
        <NFormItem label="验证码" path="code">
          <NInput
            ref="codeInput"
            v-model:value="codeValue"
            :maxlength="CODE_LEN"
            placeholder="6 位数字 · 见 QQ 邮箱"
            autocomplete="one-time-code"
            :input-props="{ inputmode: 'numeric', pattern: '[0-9]*' }"
            @keydown.enter="submitReset"
          />
        </NFormItem>

        <NFormItem label="新密码" path="password">
          <NInput
            v-model:value="resetForm.password"
            type="password"
            show-password-on="click"
            placeholder="8-64 位"
            autocomplete="new-password"
            @keydown.enter="submitReset"
          />
        </NFormItem>
        <NFormItem label="确认新密码" path="confirm_password">
          <NInput
            v-model:value="resetForm.confirm_password"
            type="password"
            show-password-on="click"
            placeholder="再次输入"
            autocomplete="new-password"
            @keydown.enter="submitReset"
          />
        </NFormItem>

        <NButton
          type="primary"
          block
          size="large"
          :loading="submitting"
          class="!font-bold"
          @click="submitReset"
        >
          重置密码
          <template #icon><CircleCheck :size="16" /></template>
        </NButton>
      </NForm>

      <!-- 退路：重新发送（受同一个倒计时约束，关掉弹窗再打开也还在计时）与返回上一步 -->
      <div class="mt-3 flex items-center justify-between gap-3">
        <!-- 颜色用 tailwind 的 text-ink-3 类，**不写 var(--ink-3)**：
             那支自定义属性只存在于 Tailwind 的命名空间里，var() 取不到、也不报错，
             表现只是「颜色不对」（见 styles/tokens.css 那段说明）。 -->
        <button
          type="button"
          class="text-xs text-ink-3 underline decoration-dotted underline-offset-2 hover:text-ink-2 disabled:no-underline disabled:opacity-60"
          :disabled="countdown > 0 || sending"
          @click="sendCode"
        >
          {{ countdown > 0 ? `${countdown} 秒后可重发` : '重新发送' }}
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1 text-xs text-ink-3 underline decoration-dotted underline-offset-2 hover:text-ink-2"
          @click="goBack"
        >
          <ArrowLeft :size="12" />
          返回上一步
        </button>
      </div>
    </div>
  </NModal>
</template>
