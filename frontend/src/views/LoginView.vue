<script setup lang="ts">
/** 登录 / 注册。同一个页面用标签切换，登录成功按角色分流。 */
import { computed, onMounted, reactive, ref } from 'vue'
import { ArrowRight, CircleAlert, CircleCheck, Loader2, Printer } from '@lucide/vue'
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NSelect,
  NTabPane,
  NTabs,
  useMessage,
  type FormInst,
  type FormRules,
} from 'naive-ui'
import { useRoute, useRouter } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { ApiError } from '@/api/client'
import { CONTACT_LABELS, type ContactType } from '@/api/types'
import { useAuthStore } from '@/stores/auth'
import {
  CONTACT_HINT,
  CONTACT_PLACEHOLDER,
  NICKNAME_RE,
  REALNAME_RE,
  STUDENT_ID_RE,
  passwordIssue,
  validateContact,
} from '@/utils/validators'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const message = useMessage()

const tab = ref<'login' | 'register'>('login')
const submitting = ref(false)
/** 后端 /hello 的探活结果，用来在页面上显示"系统就绪" */
const online = ref<boolean | null>(null)

const loginForm = reactive({ identifier: '', password: '' })
const loginRef = ref<FormInst | null>(null)

const registerForm = reactive({
  nickname: '',
  real_name: '',
  student_id: '',
  dorm: '',
  contact_type: 'wechat' as ContactType,
  contact: '',
  password: '',
  confirm_password: '',
})
const registerRef = ref<FormInst | null>(null)

const contactOptions = (Object.keys(CONTACT_LABELS) as ContactType[]).map((value) => ({
  label: CONTACT_LABELS[value],
  value,
}))

const loginRules: FormRules = {
  identifier: [{ required: true, message: '请输入姓名或昵称', trigger: ['blur', 'input'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['blur', 'input'] }],
}

const registerRules = computed<FormRules>(() => ({
  nickname: [
    { required: true, message: '请输入昵称', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => NICKNAME_RE.test(value),
      message: '昵称需为 2-20 位中文、字母、数字或下划线',
      trigger: ['blur', 'input'],
    },
  ],
  real_name: [
    { required: true, message: '请输入姓名', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => REALNAME_RE.test(value),
      message: '姓名需为 2-20 位中文或字母',
      trigger: ['blur', 'input'],
    },
  ],
  student_id: [
    { required: true, message: '请输入学号', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => STUDENT_ID_RE.test(value),
      message: '学号需为 4-20 位数字',
      trigger: ['blur', 'input'],
    },
  ],
  dorm: [
    { required: true, message: '请填写宿舍位置', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => value.trim().length >= 2 && value.trim().length <= 50,
      message: '宿舍位置需为 2-50 个字符（写到门牌号）',
      trigger: ['blur', 'input'],
    },
  ],
  contact: [
    { required: true, message: '请填写联系方式', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) =>
        value.length <= 50 && validateContact(registerForm.contact_type, value),
      message: '联系方式格式不正确',
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => passwordIssue(value) === null,
      message: '密码需 8-64 位且同时包含字母和数字',
      trigger: ['blur', 'input'],
    },
    {
      validator: (_rule, value: string) =>
        value !== registerForm.nickname && value !== registerForm.student_id,
      message: '密码不能与昵称或学号相同',
      trigger: ['blur', 'input'],
    },
  ],
  confirm_password: [
    { required: true, message: '请再次输入密码', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => value === registerForm.password,
      message: '两次输入的密码不一致',
      trigger: ['blur', 'input'],
    },
  ],
}))

function landingPath(): string {
  // 只在 redirect 与当前角色的界面一致时才采用它。
  // 注意 redirect 参数可能来自守卫内部的重定向（访问 "/" 会先跳到 /upload 再被拦下），
  // 那不是用户的真实目标；管理员照办就会被带到学生端，所以必须按角色过滤。
  const redirect = route.query.redirect
  if (typeof redirect === 'string' && redirect.startsWith('/')) {
    const isStaffPath = redirect.startsWith('/staff')
    if (isStaffPath === auth.isStaff) return redirect
  }
  return auth.isStaff ? '/staff/orders' : '/upload'
}

async function submitLogin(): Promise<void> {
  try {
    await loginRef.value?.validate()
  } catch {
    return
  }
  submitting.value = true
  try {
    await auth.login(loginForm.identifier.trim(), loginForm.password)
    message.success('登录成功')
    await router.replace(landingPath())
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '登录失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

async function submitRegister(): Promise<void> {
  try {
    await registerRef.value?.validate()
  } catch {
    return
  }
  submitting.value = true
  try {
    await auth.register({
      nickname: registerForm.nickname.trim(),
      real_name: registerForm.real_name.trim(),
      student_id: registerForm.student_id.trim(),
      dorm: registerForm.dorm.trim(),
      contact_type: registerForm.contact_type,
      contact: registerForm.contact.trim(),
      password: registerForm.password,
      confirm_password: registerForm.confirm_password,
    })
    message.success('注册成功')
    await router.replace('/upload')
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '注册失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    const response = await fetch('/hello')
    online.value = response.ok
  } catch {
    online.value = false
  }
})
</script>

<template>
  <div class="login-shell grid min-h-full place-items-center overflow-hidden px-4 py-8 sm:px-6">
    <div class="relative grid w-full max-w-[960px] items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
      <!-- 宽屏保留一块安静的品牌区：登录不是普通表单，先让用户确认自己到了对的服务。 -->
      <section class="hidden lg:block">
        <div class="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5" style="border-color: var(--accent-tint-border); background-color: var(--accent-tint)">
          <span class="size-1.5 rounded-full" style="background-color: var(--secondary); box-shadow: var(--glow-secondary)" />
          <span class="tech-label text-ink-2">Campus print service</span>
        </div>
        <h1 class="max-w-md font-heading text-[44px] leading-[1.08] font-bold tracking-[-0.04em]">
          从文件到取件，<br />
          <span style="color: var(--primary)">一张单</span>就够了。
        </h1>
        <p class="mt-5 max-w-sm text-[15px] leading-7 text-ink-3">
          上传文件、查看进度、凭取件码领取。打印流程清楚，等待也有回应。
        </p>
        <div class="mt-8 grid max-w-md grid-cols-3 gap-3">
          <div v-for="item in ['在线提交', '进度可查', '凭码取件']" :key="item" class="border-t pt-3" style="border-color: var(--border)">
            <span class="tech-label text-ink-2">{{ item }}</span>
          </div>
        </div>
      </section>

      <div class="w-full">
      <div class="mb-5 flex items-center justify-between">
        <span class="flex items-center gap-2.5">
          <span
            class="grid size-9 place-items-center rounded-[10px] border"
            style="
              background-color: var(--accent-tint-soft);
              border-color: var(--accent-tint-border);
              color: var(--primary);
            "
            aria-hidden="true"
          >
            <Printer :size="18" />
          </span>
          <span class="flex flex-col leading-none">
            <span class="font-heading text-[15px] font-bold">宿舍打印</span>
            <span class="tech-label mt-0.5 text-ink-4">Dorm Print</span>
          </span>
        </span>
        <ThemeToggle />
      </div>

      <div class="panel login-card p-5 sm:p-6">
        <!-- 服务状态：直接打后端的 /hello，让用户一眼看出是不是服务没起来 -->
        <div class="mb-4 flex items-center gap-2">
          <span
            class="tech-label inline-flex items-center gap-1.5 rounded-full px-2 py-1"
            :style="{
              color: online === false ? 'var(--err)' : 'var(--secondary)',
              backgroundColor: online === false ? '#f871711f' : 'var(--role-user-bg)',
            }"
          >
            <component
              :is="online === null ? Loader2 : online ? CircleCheck : CircleAlert"
              :size="12"
              :class="online === null && 'animate-spin'"
            />
            {{ online === null ? '正在连接' : online ? '服务在线' : '服务不可达' }}
          </span>
          <span class="tech-label ml-auto text-ink-4">v2</span>
        </div>

        <h1 class="font-heading text-[26px] leading-tight font-bold">
          {{ tab === 'login' ? '登录你的账号' : '注册新账号' }}
        </h1>
        <p class="mt-1.5 mb-5 text-[13px] text-ink-3">
          {{
            tab === 'login'
              ? '用姓名或昵称登录，提交文件后凭取件码取件。'
              : '注册后即可上传文件下单，取件码会随订单生成。'
          }}
        </p>

        <NTabs v-model:value="tab" type="line" animated>
          <NTabPane name="login" tab="登录">
            <NForm
              ref="loginRef"
              :model="loginForm"
              :rules="loginRules"
              label-placement="top"
              :show-require-mark="false"
              @submit.prevent="submitLogin"
            >
              <NFormItem label="姓名 / 昵称" path="identifier">
                <NInput
                  v-model:value="loginForm.identifier"
                  placeholder="请输入姓名或昵称"
                  autocomplete="username"
                  :input-props="{ autocapitalize: 'off', autocorrect: 'off' }"
                />
              </NFormItem>
              <NFormItem label="密码" path="password">
                <NInput
                  v-model:value="loginForm.password"
                  type="password"
                  show-password-on="click"
                  placeholder="请输入密码"
                  autocomplete="current-password"
                  @keydown.enter="submitLogin"
                />
              </NFormItem>
              <NButton
                type="primary"
                block
                size="large"
                :loading="submitting"
                class="mt-1 !font-bold shadow-[var(--glow-primary)]"
                @click="submitLogin"
              >
                登录
                <template #icon><ArrowRight :size="16" /></template>
              </NButton>
            </NForm>
          </NTabPane>

          <NTabPane name="register" tab="注册">
            <NForm
              ref="registerRef"
              :model="registerForm"
              :rules="registerRules"
              label-placement="top"
              :show-require-mark="false"
              @submit.prevent="submitRegister"
            >
              <div class="grid gap-x-3 sm:grid-cols-2">
                <NFormItem label="昵称" path="nickname">
                  <NInput v-model:value="registerForm.nickname" placeholder="登录名，2-20 位" />
                </NFormItem>
                <NFormItem label="姓名" path="real_name">
                  <NInput v-model:value="registerForm.real_name" placeholder="真实姓名" />
                </NFormItem>
                <NFormItem label="学号" path="student_id">
                  <NInput v-model:value="registerForm.student_id" placeholder="4-20 位数字" />
                </NFormItem>
                <NFormItem label="宿舍位置" path="dorm">
                  <NInput v-model:value="registerForm.dorm" placeholder="例：3 号楼 502" />
                </NFormItem>
              </div>

              <NFormItem label="联系方式" path="contact">
                <div class="flex w-full gap-2">
                  <NSelect
                    v-model:value="registerForm.contact_type"
                    :options="contactOptions"
                    class="!w-[112px] shrink-0"
                    :consistent-menu-width="false"
                  />
                  <NInput
                    v-model:value="registerForm.contact"
                    :placeholder="CONTACT_PLACEHOLDER[registerForm.contact_type]"
                    class="min-w-0 flex-1"
                  />
                </div>
              </NFormItem>
              <p class="-mt-3 mb-3 text-[11px] text-ink-4">
                {{ CONTACT_HINT[registerForm.contact_type] }}
              </p>

              <div class="grid gap-x-3 sm:grid-cols-2">
                <NFormItem label="密码" path="password">
                  <NInput
                    v-model:value="registerForm.password"
                    type="password"
                    show-password-on="click"
                    placeholder="8-64 位，含字母和数字"
                    autocomplete="new-password"
                  />
                </NFormItem>
                <NFormItem label="确认密码" path="confirm_password">
                  <NInput
                    v-model:value="registerForm.confirm_password"
                    type="password"
                    show-password-on="click"
                    placeholder="再输一次"
                    autocomplete="new-password"
                    @keydown.enter="submitRegister"
                  />
                </NFormItem>
              </div>

              <NButton
                type="primary"
                block
                size="large"
                :loading="submitting"
                class="!font-bold shadow-[var(--glow-primary)]"
                @click="submitRegister"
              >
                注册并登录
              </NButton>
            </NForm>
          </NTabPane>
        </NTabs>
      </div>

      <p class="mt-4 text-center text-[11px] text-ink-4">
        管理员账号由超管在后台开通，注册一律为普通用户。
      </p>
      </div>
    </div>
  </div>
</template>
