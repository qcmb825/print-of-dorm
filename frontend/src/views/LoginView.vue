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
import AuditRequestDialog from '@/components/AuditRequestDialog.vue'
import BlueprintSheet from '@/components/BlueprintSheet.vue'
import { ApiError } from '@/api/client'
import { showReceipt } from '@/composables/transition-receipt'
import { useClock } from '@/composables/clock'
import {
  OTHER_CONTACT_LABELS,
  ROLE_LABELS,
  type ContactType,
  type OtherContactType,
} from '@/api/types'
import { useAuthStore } from '@/stores/auth'
import {
  NICKNAME_RE,
  OTHER_CONTACT_HINT,
  OTHER_CONTACT_PLACEHOLDER,
  OTHER_CONTACT_TYPES,
  REALNAME_RE,
  STUDENT_ID_RE,
  otherContactIssue,
  passwordIssue,
  qqIssue,
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
  // QQ 号是单列的**必填**项，其他联系方式（微信 / 邮箱）整组选填。
  // 这里刻意不再给 contact_type 一个 'wechat' 默认值：默认选中微信会让人
  // 以为「必须留一个联系方式」，于是随手填个微信号 —— 而他真正需要填的是 QQ，
  // 因为取件邮件只能发到 <QQ号>@qq.com（见后端 utils.validate_qq 的说明）。
  qq: '',
  contact_type: null as OtherContactType | null,
  contact: '',
  password: '',
  confirm_password: '',
})
const registerRef = ref<FormInst | null>(null)

const contactOptions = OTHER_CONTACT_TYPES.map((value) => ({
  label: OTHER_CONTACT_LABELS[value],
  value,
}))

/** 品牌区那三条流程说明。编号写死在这里而不是从路由取：它们描述的是**服务流程**，
 *  不是页面 —— 与导航栏那几项没有一一对应关系，混用会让以后改导航的人莫名背锅。 */
const flowRows = [
  { code: '01', label: '在线提交' },
  { code: '02', label: '进度可查' },
  { code: '03', label: '凭码取件' },
]

/** 认证告示上的三行范围读数。三行都对应系统里真实存在的东西：
 *  本页只发放普通用户权限（见页面底部那句）、服务范围是校园打印、
 *  进页面时会话尚未建立。**不写"机密/绝密"一类的分级** —— 这个系统没有
 *  分类分级制度，编一个出来是扮演；学那套版式就够了，密级那一栏留空。 */
const scopeRows = [
  { key: 'SCOPE', value: '校园打印服务' },
  { key: 'CLEARANCE', value: '普通用户（USER）' },
  { key: 'SESSION', value: '未建立 · PENDING' },
]

/** 面板底行的同步读数：与页面头部的 SYNC 同一件东西 —— 纸上的表单是静止的，
 *  而这块面板在"接入"这个动作发生之前就该是活的。 */
const clock = useClock()

const loginRules: FormRules = {
  // 登录只用学号（后端也拿 STUDENT_ID_RE 卡一道）。这里不再提「昵称」：
  // 提示文案里写着昵称、后端又不收，用户会先把昵称输一遍才被告知不行。
  identifier: [{ required: true, message: '填写学号', trigger: ['blur', 'input'] }],
  password: [{ required: true, message: '填写密码', trigger: ['blur', 'input'] }],
}

const registerRules = computed<FormRules>(() => ({
  nickname: [
    { required: true, message: '填写昵称', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => NICKNAME_RE.test(value),
      message: '昵称 2-20 位：中文、字母、数字或下划线',
      trigger: ['blur', 'input'],
    },
  ],
  real_name: [
    { required: true, message: '填写姓名', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => REALNAME_RE.test(value),
      message: '姓名 2-20 位中文或字母',
      trigger: ['blur', 'input'],
    },
  ],
  student_id: [
    { required: true, message: '填写学号', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => STUDENT_ID_RE.test(value),
      message: '学号 4-20 位数字',
      trigger: ['blur', 'input'],
    },
  ],
  dorm: [
    { required: true, message: '填写宿舍', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => value.trim().length >= 2 && value.trim().length <= 50,
      message: '宿舍 2-50 字符，写到门牌号',
      trigger: ['blur', 'input'],
    },
  ],
  qq: [
    { required: true, message: '填写 QQ 号', trigger: ['blur', 'input'] },
    {
      // 文案直接取 qqIssue() 的返回值，别在这里另抄一句：
      // 提示语抄两份时，改一处就会出现「框里说 5-12 位、红字说别的」。
      validator: (_rule, value: string) => qqIssue(value) === null,
      message: '请填写 QQ 号（用来给你发送取件邮件提醒）',
      trigger: ['blur', 'input'],
    },
  ],
  contact: [
    {
      // 这一栏整组选填，所以**没有 required**：QQ 才是必填的那个。
      // 但填了一半要拦住 —— 只选类型不填号码，库里会留下一个说不清是什么的东西。
      validator: (_rule, value: string) =>
        otherContactIssue(registerForm.contact_type, value ?? '') === null,
      message: '其他联系方式格式不对，或者整组留空',
      trigger: ['blur', 'input'],
    },
  ],
  password: [
    { required: true, message: '填写密码', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => passwordIssue(value) === null,
      message: '密码 8-64 位，含字母与数字',
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
    { required: true, message: '再输一次密码', trigger: ['blur', 'input'] },
    {
      validator: (_rule, value: string) => value === registerForm.password,
      message: '两次密码不一致',
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
    // 不再用 message.success('登录成功')：通用的吐司是"操作成功"的形状，
    // 而这一下是**身份被接收**——换成一张会跨换场留下来的回执
    // （components/TransitionReceipt.vue）。目标页名从路由表取，和守卫算的是同一份事实来源。
    const target = landingPath()
    showReceipt({
      code: 'AUTHORIZATION SUCCESS',
      title: '认证成功',
      detail: `${auth.user?.nickname ?? '已登录'}（${auth.user ? ROLE_LABELS[auth.user.role] : '用户'}）`,
      target: (router.resolve(target).meta.title as string | undefined) ?? '主页',
    })
    await router.replace(target)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '登录失败 · 稍后重试')
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
      qq: registerForm.qq.trim(),
      contact_type: registerForm.contact_type,
      // 类型空着就必须回 null（整组留空的唯一表达方式）。空串在库里
      // 和「填了个空白」分不开，而已选的类型配空号码后端会直接判 400。
      contact: registerForm.contact_type ? registerForm.contact.trim() : null,
      password: registerForm.password,
      confirm_password: registerForm.confirm_password,
    })
    message.success('注册成功')
    await router.replace('/upload')
  } catch (error) {
    // 学号不在名单上时后端回 409 + need_audit，意思是「这次不行，但有正经出路」。
    // 坐实这个标记（ApiError.needAudit）而不是比对那句话的意思：
    // 拿中文提示当开关的话，后端改一个标点，这个入口就静默消失了。
    if (error instanceof ApiError && error.needAudit) {
      // 先把被拦下的原因说清楚，否则用户看到的就只是一个没来由的弹窗
      message.warning(error.message)
      auditOpen.value = true
    } else {
      message.error(error instanceof ApiError ? error.message : '注册失败 · 稍后重试')
    }
  } finally {
    submitting.value = false
  }
}

/** 审核申请弹窗。预填注册表单里的四样东西 —— 用户刚要提交的正是这些，
 *  让他重新输一遍没有道理（尤其学号，输错一位就得等管理员打回来）。
 *
 *  ⚠️ 这里**不能带 QQ 那一段**：申请表单走的是老的「联系方式三选一」
 *  （微信 / QQ / 邮箱，见 AuditRequestDialog 与 utils.validate_contact），
 *  因为它服务的是「名单里根本没有的人」，那种人完全可能只有微信号。
 *  所以只把用户已经选好的那一组带过去；没选就留空、让他自己定 ——
 *  硬塞一个空的 contact_type 会把申请表单的下拉框顶成空白选项。 */
const auditOpen = ref(false)
const auditPrefill = computed(() => ({
  student_id: registerForm.student_id.trim(),
  real_name: registerForm.real_name.trim(),
  ...(registerForm.contact_type
    ? {
        contact_type: registerForm.contact_type as ContactType,
        contact: registerForm.contact.trim(),
      }
    : {}),
}))

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
  <!-- 图纸底图：整页那么大，框住四边，内容浮在它上面。
       它是 position:absolute 的，所以这一层容器必须是 relative（下面的 relative 不能删）。 -->
  <BlueprintSheet />
  <!-- min-h-dvh 而不是 min-h-full：min-h-full 是 min-height:100%，而它的父链上
       （.route-stage）高度是 auto，百分比解析不出结果 —— 实测外壳只有 673px 高、
       内容贴在顶上，下面留一大片空。dvh 直接对视口取高度，不依赖父链，
       且移动端地址栏收放时不会像 vh 那样跳（换场覆盖层用的是同一个单位）。 -->
  <div class="login-shell relative grid min-h-dvh place-items-center overflow-hidden px-4 py-8 sm:px-6">
    <!-- 两块内容板也各是一层：左栏（品牌）8px、右栏（终端面板）10px。
         它们比图纸的纸（3）与画（5）更近，所以指针一动，纸上的图会"从板子下面滑过"。 -->
    <div class="relative z-10 grid w-full max-w-[960px] items-center gap-10 lg:grid-cols-[1fr_440px] lg:gap-16">
      <!-- 宽屏保留一块品牌区：登录不是普通表单，先让用户确认自己到了对的服务。
           这一版把它做成**核验告示**（实验/临床设备那套语汇）：一枚目镜（同心环 +
           准星 + 六边形）、一行密级铭牌、三条读数列、底部斜切色带与刻度尺。
           与右侧"凭据核验"面板是同一件事的两半：左边说明这是哪里、能拿到什么，
           右边才是那道闸门。

           配色上这里刻意让**青色当主角**（--secondary），黄色留给"动作"（登录按钮）。
           这是全站唯一一处这样分工的地方，理由写在面板顶部：认证这件事本身是
           "仪器在读数"，不是"按钮在喊"；而一旦进入业务区，动作仍然只有一种颜色。 -->
      <section class="hidden lg:block" data-parallax style="--depth: 8px">
        <div
          class="flex items-center justify-between gap-4 border-b pb-1.5"
          style="border-color: var(--border)"
        >
          <span class="readout">NEKO PRINT // 校园打印服务</span>
          <span class="readout">REV 2.006 / AUTH</span>
        </div>

        <div class="mt-7">
          <p class="max-w-md font-heading text-4xl leading-[1.08] font-bold tracking-[-0.04em]">
            从文件到取件，<br />
            <span style="color: var(--accent-text)">只隔一张单</span>。
          </p>
          <p class="mt-4 max-w-sm text-base leading-7 text-ink-3">
            上传文件 → 接单打印 → 凭码取件。
          </p>
        </div>

        <!-- 三条流程说明用**字段行**排（等宽标签 + 点线引导），而不是三个格子：
             它是"这份服务的规格表"，不是三块卖点卡片 —— 页面里的信息越像记录，
             越不像广告。 -->
        <div class="mt-7 grid max-w-md gap-2.5">
          <span v-for="item in flowRows" :key="item.code" class="field">
            <span class="field__k">{{ item.code }}</span>
            <span class="field__lead" />
            <span class="field__v">{{ item.label }}</span>
          </span>
        </div>

        <!-- 核验范围读数：这三行说的是"这道闸门后面是什么"，用的都是真话 ——
             本页只开放普通用户权限（页面底部也写着同一件事），这里是同一信息的
             机读版本。**刻意不写"机密/绝密"分级**：这个系统没有分级制度，
             编一个出来是扮演，不是设计；学它的版式就够了，密级那一栏留空。 -->
        <div class="mt-6 grid max-w-md gap-2.5 border-t pt-4" style="border-color: var(--border)">
          <span v-for="row in scopeRows" :key="row.key" class="field">
            <span class="field__k">{{ row.key }}</span>
            <span class="field__lead" />
            <span class="field__v">{{ row.value }}</span>
          </span>
        </div>

        <!-- 收尾：斜切色带 + 刻度尺 + 大号读数。告示底部那一排印刷标记。 -->
        <div class="mt-8 flex items-end gap-5" aria-hidden="true">
          <span class="decor-band h-10 w-36 shrink-0" />
          <span class="ticks mb-1 flex-1" />
        </div>
        <!-- 只写名字，不写营业时间或取件点：那些是管理员在公告里维护的内容，
             写死在海报上就等于抄了一份会过期的副本。 -->
        <p class="readout-lg mt-3">NEKO PRINT SERVICE / CAMPUS</p>
      </section>

      <div class="w-full">
      <div class="mb-5 flex items-center justify-between">
        <span class="flex items-center gap-2.5">
          <span
            class="grid size-9 place-items-center border"
            style="
              background-color: var(--accent-tint-soft);
              border-color: var(--accent-tint-border);
              color: var(--accent-text);
            "
            aria-hidden="true"
          >
            <Printer :size="18" />
          </span>
          <span class="flex flex-col leading-none">
            <span class="font-heading text-base font-bold">猫娘打印服务</span>
            <span class="tech-label mt-0.5 text-ink-3 text-2xs">Neko Print</span>
          </span>
        </span>
      </div>

      <!-- 表单面板做成一块**凭据核验终端**：顶部铭牌行（编号 + 服务状态）、
           一条"需要授权"的斜纹提示带、中部表单、底部状态行（会话灯 + 同步时钟 + 光标）。
           三行的存在理由不是装饰 —— 登录页是唯一一个"什么都还没发生"的页面，
           它需要自己说明"这块屏在跑、服务在、你接下来要做的是核验身份"。

           配色分工（全站唯一一处）：这里让青色主导（仪器/核验语汇），
           黄色只留给**动作**（登录按钮、强调数）。进到业务区仍然只有一种强调色，
           所以这条分工不会渗出去。 -->
      <div class="panel login-card" data-parallax style="--depth: 10px">
        <div
          class="flex items-center justify-between gap-3 border-b px-5 py-2"
          style="border-color: var(--border)"
        >
          <span class="readout">00 // 凭据核验</span>
          <!-- 服务状态：直接打后端的 /hello，让用户一眼看出是不是服务没起来。
               它属于铭牌行：这是"终端"自己的状态，不是表单的一部分。 -->
          <span
            class="tech-label inline-flex items-center gap-1.5 px-2 py-0.5 tech-label--cn text-xs"
            :style="{
              color: online === false ? 'var(--err)' : 'var(--secondary)',
              backgroundColor: online === false ? 'var(--err-bg)' : 'var(--role-user-bg)',
            }"
          >
            <component
              :is="online === null ? Loader2 : online ? CircleCheck : CircleAlert"
              :size="12"
              :class="online === null && 'animate-spin'"
            />
            {{ online === null ? '正在连接' : online ? '服务在线' : '服务不可达' }}
          </span>
        </div>

        <!-- 授权提示带：斜纹只占 5px 窄条，文字用 padding 让开 ——
             这一条是整页唯一"有攻击性"的记号，它标的是"这里是一道闸门"。
             文案只说真实的事：本页需要凭据，未通过核验就进不去后面的页面。 -->
        <div
          class="hazard-left flex items-center gap-2 border-b py-1.5 pr-5 pl-5"
          style="border-color: var(--border)"
        >
          <span class="readout">AUTHORIZATION REQUIRED</span>
          <span class="readout ml-auto hidden sm:inline">凭据核验后方可进入</span>
        </div>

        <div class="p-5 sm:p-6">
        <h1 class="font-heading text-2xl leading-tight font-bold">
          {{ tab === 'login' ? '登录你的账号' : '注册新账号' }}
        </h1>
        <p class="mt-1.5 mb-5 text-sm text-ink-3">
          {{
            tab === 'login'
              ? '用学号登录。提交文件后凭单号取件。'
              : '注册后即可下单。学号与名单不一致时，会引导你提交审核申请。'
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
              <NFormItem label="学号" path="identifier">
                <NInput
                  v-model:value="loginForm.identifier"
                  placeholder="4-20 位数字"
                  autocomplete="username"
                  :input-props="{ autocapitalize: 'off', autocorrect: 'off' }"
                />
              </NFormItem>
              <NFormItem label="密码" path="password">
                <NInput
                  v-model:value="loginForm.password"
                  type="password"
                  show-password-on="click"
                  placeholder="登录密码"
                  autocomplete="current-password"
                  @keydown.enter="submitLogin"
                />
              </NFormItem>
              <NButton
                type="primary"
                block
                size="large"
                :loading="submitting"
                class="mt-1 !font-bold"
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

              <!-- QQ 号单列、必填、放在联系方式上面：取件提醒是发邮件到
                   <QQ号>@qq.com，缺了它这个账号一条通知都收不到。
                   所以它跟「姓名 / 学号」是一个级别的东西，不该混在选填的那一组里。 -->
              <NFormItem label="QQ 号（取件提醒用）" path="qq">
                <NInput
                  v-model:value="registerForm.qq"
                  :maxlength="12"
                  placeholder="5-12 位数字，不能以 0 开头"
                />
              </NFormItem>
              <p class="-mt-3 mb-3 text-xs text-ink-3">
                打印完成后系统会往这个 QQ 邮箱发取件提醒；微信号推不出邮箱地址，所以不能替代。
              </p>

              <NFormItem label="其他联系方式（选填）" path="contact">
                <div class="flex w-full gap-2">
                  <!-- 可以清空回「不填」：这一组整组选填，没有退路的必选下拉
                       会让「只留 QQ」变成存不进来的状态。 -->
                  <NSelect
                    v-model:value="registerForm.contact_type"
                    :options="contactOptions"
                    class="!w-[112px] shrink-0"
                    clearable
                    placeholder="不填"
                    :consistent-menu-width="false"
                  />
                  <NInput
                    v-model:value="registerForm.contact"
                    :disabled="!registerForm.contact_type"
                    :placeholder="
                      registerForm.contact_type
                        ? OTHER_CONTACT_PLACEHOLDER[registerForm.contact_type]
                        : '先选类型，或留空'
                    "
                    class="min-w-0 flex-1"
                  />
                </div>
              </NFormItem>
              <p class="-mt-3 mb-3 text-xs text-ink-3">
                <template v-if="registerForm.contact_type">
                  {{ OTHER_CONTACT_HINT[registerForm.contact_type] }}
                </template>
                <template v-else>微信 / 邮箱只是备用线索，可以留空；QQ 号必填。</template>
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
                class="!font-bold"
                @click="submitRegister"
              >
                注册并登录
              </NButton>
            </NForm>
          </NTabPane>
        </NTabs>
        </div>

        <!-- 面板底行：一只会话灯 + 同步时钟 + 页码范围读数。
             登录页没有页面头部，这一行就是"这块屏在跑"的唯一证据。 -->
        <div
          class="flex items-center gap-3 border-t px-5 py-2"
          style="border-color: var(--border)"
          aria-hidden="true"
        >
          <span class="flex shrink-0 items-center gap-1.5">
            <span class="status-led" />
            <span class="readout">SESSION —</span>
          </span>
          <span class="ticks min-w-8 flex-1" />
          <span class="readout shrink-0">SYNC {{ clock || '--:--:--' }}</span>
          <span class="caret" />
        </div>
      </div>

      <p class="mt-4 text-center text-xs text-ink-3">
        管理员账号由管理端开通，注册一律为普通用户。
      </p>
      <!-- 这里曾经还有一个「换个界面」链接。全站已经锁死新版（app.py 的
           UI_SWITCH_ENABLED），点过去也只会回到同一套外壳，留着反而像是坏了。 -->
      <p class="mt-2 text-center text-xs text-ink-3">
        <button
          type="button"
          class="underline decoration-dotted underline-offset-2 hover:text-ink-2"
          @click="auditOpen = true"
        >
          学号不在名单上？申请人工审核 →
        </button>
      </p>
      </div>
    </div>
  </div>

  <AuditRequestDialog v-model:show="auditOpen" :prefill="auditPrefill" />
</template>
