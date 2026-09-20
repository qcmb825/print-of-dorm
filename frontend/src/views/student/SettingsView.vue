<script setup lang="ts">
/** 设置：账号资料、密码、存储用量、我的下单概况 —— 全部只关于自己。
 *
 *  数据来自 `GET /api/me/overview` 一个接口（见 routes/account.py: api_me_overview）：
 *  账号资料 + 我的订单概况 + 在盘用量。刻意不复用别的接口 ——
 *  /api/my-stats 是柱状图 + 分布的形状，挂进设置页等于多出一屏图表；
 *  /api/board 是公开口径，里面**没有金额**，而这里要显示「我自己花了多少」。
 *
 *  两处必须写清楚的地方：
 *  1. **学号和姓名不可改**。服务端从会话里取它们（PUT /api/me/profile 根本不读请求里
 *     这两个字段），所以这里做成只读文本而不是禁用输入框 ——
 *     灰掉的输入框会让人以为「充个值就能改」。
 *  2. **QQ 号必填**。取件提醒只能发到 <QQ 号>@qq.com，缺了它这个账号收不到任何通知。
 *     老库里当年填的是微信/邮箱，qq 列是空的（v14 才加的这一列），
 *     所以他们**改任何一个字段都会被这一栏挡住** —— 这是有意的，
 *     页面上必须显式说明，否则就成了「改个宿舍为什么老是保存失败」。
 *
 *  这一页始终**只调一个接口**（/api/me/overview）。底部的工单入口只是个跳转，
 *  不在这里顺手拉一遍工单数：那会多一次往返，而未读回复在工单页自己带徽标 ——
 *  设置页是「查自己资料」的地方，不该为了一个红点多跑一趟。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import {
  HardDrive,
  KeyRound,
  LogOut,
  Mail,
  MessageSquare,
  RefreshCw,
  Save,
  TriangleAlert,
  UserCog,
} from '@lucide/vue'
import { NAlert, NButton, NInput, NSelect, NSkeleton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { ApiError } from '@/api/client'
import { authApi } from '@/api/endpoints'
import { OTHER_CONTACT_LABELS } from '@/api/types'
import type { MeOverviewResponse, OtherContactType } from '@/api/types'
import { confirmAction, notify } from '@/composables/feedback'
import { useAuthStore } from '@/stores/auth'
import { formatBytes, priceLabel, shortTime } from '@/utils/format'
import {
  NICKNAME_RE,
  OTHER_CONTACT_PLACEHOLDER,
  OTHER_CONTACT_TYPES,
  otherContactIssue,
  passwordIssue,
  qqIssue,
} from '@/utils/validators'

const auth = useAuthStore()
// 退出登录之后要回登录页。留在 SPA 里跳转就够了 —— 会话已经在服务端清掉了，
// 不需要 location.assign 那种整页重载。
const router = useRouter()

const overview = ref<MeOverviewResponse | null>(null)
const loading = ref(true)
const savingProfile = ref(false)
const savingPassword = ref(false)
const loggingOut = ref(false)

const account = computed(() => overview.value?.account)
const orders = computed(() => overview.value?.orders)
const usage = computed(() => overview.value?.usage)

/** 表单里的类型只能是微信 / 邮箱 —— QQ 已经独立成一栏了。
 *  选项**不**从 CONTACT_LABELS 反推：那份里含 QQ，
 *  两个地方都能填 QQ 的话，两边值不一样时谁也说不清信该发给哪一个。 */
const contactOptions = OTHER_CONTACT_TYPES.map((value) => ({
  label: OTHER_CONTACT_LABELS[value],
  value,
}))

const profileForm = reactive({
  nickname: '',
  dorm: '',
  qq: '',
  contact_type: null as OtherContactType | null,
  contact: '',
})

const passwordForm = reactive({ current: '', next: '', confirm: '' })

/** 后端那条记录 → 表单看到的形状。
 *
 *  老库里的旧值是 `contact_type='qq'` + `contact='123456'`（v14 之前 QQ 就是这么存的），
 *  迁移时已经把它抄进了 qq 列。读到这一组表单里就会出现「其他联系方式：QQ 号 123456」，
 *  而那一栏现在只认微信 / 邮箱 —— 用户会以为自己填的是微信。
 *  所以碰到旧值一律归到 QQ 那一栏、把这一组留空；保存时也就顺带把它清掉了。 */
function toForm(record: MeOverviewResponse['account']) {
  const legacyQq = record.contact_type === 'qq' ? (record.contact ?? '') : ''
  const otherType =
    record.contact_type === 'qq' ? null : (record.contact_type ?? null)
  return {
    nickname: record.nickname ?? '',
    dorm: record.dorm ?? '',
    qq: record.qq || legacyQq,
    contact_type: otherType as OtherContactType | null,
    contact: record.contact_type === 'qq' ? '' : (record.contact ?? ''),
  }
}

/** 服务端当前那份（已归一化）。脏值判定和回填都以它为准 ——
 *  两处各写一遍归一化，改一处漏一处就会出现「什么都没改，保存按钮却是亮的」。 */
const savedForm = computed(() => (account.value ? toForm(account.value) : null))

function fillForm(): void {
  const saved = savedForm.value
  if (!saved) return
  profileForm.nickname = saved.nickname
  profileForm.dorm = saved.dorm
  profileForm.qq = saved.qq
  profileForm.contact_type = saved.contact_type
  profileForm.contact = saved.contact
}

const profileIssue = computed<string | null>(() => {
  if (!NICKNAME_RE.test(profileForm.nickname.trim())) {
    return '昵称需为 2-20 位中文、字母、数字或下划线'
  }
  const dorm = profileForm.dorm.trim()
  if (dorm.length < 2 || dorm.length > 50) return '宿舍位置需为 2-50 个字符（写到门牌号）'
  const qqBad = qqIssue(profileForm.qq)
  if (qqBad) return qqBad
  return otherContactIssue(profileForm.contact_type, profileForm.contact)
})

/** 有没有真的改动。没改就不发请求：空跑一次写接口会在审计日志里留一条
 *  「变更=(无变化)」，翻日志的人得先读懂这句才知道没出事。 */
const profileDirty = computed(() => {
  const saved = savedForm.value
  if (!saved) return false
  return (
    profileForm.nickname.trim() !== saved.nickname ||
    profileForm.dorm.trim() !== saved.dorm ||
    profileForm.qq.trim() !== saved.qq ||
    profileForm.contact_type !== saved.contact_type ||
    profileForm.contact.trim() !== saved.contact
  )
})

const passwordIssueText = computed<string | null>(() => {
  if (!passwordForm.current) return '请输入当前密码'
  const bad = passwordIssue(passwordForm.next)
  if (bad) return bad
  const current = account.value
  // 和后端 password_error(newpw, nickname, student_id) 是同一套规则：
  // 新密码不能等于昵称或学号（那样等于把登录名当密码用）。
  if (current && (passwordForm.next === current.nickname || passwordForm.next === current.student_id)) {
    return '新密码不能与昵称或学号相同'
  }
  if (passwordForm.next !== passwordForm.confirm) return '两次输入的新密码不一致'
  return null
})

/** 三个框全空时不提示 —— 一进页面就红着一条「请输入当前密码」，
 *  看着像出了错，其实只是还没开始填。 */
const passwordTouched = computed(
  () => !!(passwordForm.current || passwordForm.next || passwordForm.confirm),
)

const passwordReady = computed(
  () => !!(passwordForm.current && passwordForm.next && passwordForm.confirm),
)

/** 配额占用百分比。quota_bytes 为 0 时回 0 而不是除出 NaN ——
 *  NaN 会让那根进度条的 width 变成 `NaN%`，浏览器静默忽略，
 *  于是条子永远空着，看起来像「一点没用」，而真相是没读到配额。 */
const quotaPercent = computed(() => {
  const snapshot = usage.value
  if (!snapshot || !snapshot.quota_bytes) return 0
  return Math.min(100, Math.round((snapshot.used_bytes / snapshot.quota_bytes) * 100))
})

/** 快满了要变色：这根条子是「还能不能传文件」的唯一提示，
 *  一直用主色的话，剩 100MB 和剩 5GB 长得一模一样。 */
const quotaColor = computed(() => {
  const percent = quotaPercent.value
  if (percent >= 95) return 'var(--err)'
  if (percent >= 80) return 'var(--warn)'
  return 'var(--accent-text)'
})

/** 老账号没补 QQ：这条提示比别的都靠前，因为它直接决定收不收得到取件邮件。 */
const needsQq = computed(() => !!account.value && !account.value.qq)

async function load(resetForm = true): Promise<void> {
  loading.value = true
  try {
    overview.value = await authApi.overview()
    if (resetForm) fillForm()
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '加载设置失败 · 稍后重试')
  } finally {
    loading.value = false
  }
}

/** 手点刷新只为了看用量和单数。表单里有没保存的改动时**不回填** ——
 *  把用户正改着的东西悄悄冲掉，比不刷新难受得多。 */
function refresh(): void {
  void load(!profileDirty.value)
}

async function saveProfile(): Promise<void> {
  if (profileIssue.value || savingProfile.value) return
  savingProfile.value = true
  try {
    const otherType = profileForm.contact_type
    const otherValue = profileForm.contact.trim()
    const response = await authApi.updateProfile({
      nickname: profileForm.nickname.trim(),
      dorm: profileForm.dorm.trim(),
      qq: profileForm.qq.trim(),
      contact_type: otherType,
      // 类型空着就必须回 null，不能回空串：空串在库里和「填了个空白」分不开，
      // 而且会让「这一组留空」变成第三种状态。
      contact: otherType ? otherValue : null,
    })
    auth.applyProfile(response.user)
    // 本地那份 overview 也要跟着更新：脏值判定拿它当基准，
    // 不更新的话保存按钮一直亮着，用户会以为没保存上、再点一次。
    if (overview.value) {
      overview.value.account.nickname = response.user.nickname
      overview.value.account.dorm = response.user.dorm
      overview.value.account.qq = response.user.qq
      overview.value.account.contact_type = response.user.contact_type
      overview.value.account.contact = response.user.contact
    }
    notify.success('资料已更新')
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '保存失败 · 稍后重试')
  } finally {
    savingProfile.value = false
  }
}

async function changePassword(): Promise<void> {
  if (passwordIssueText.value || savingPassword.value) return
  savingPassword.value = true
  try {
    const response = await authApi.changePassword(passwordForm.current, passwordForm.next)
    passwordForm.current = ''
    passwordForm.next = ''
    passwordForm.confirm = ''
    notify.success(response.msg || '密码已修改')
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '修改密码失败 · 稍后重试')
  } finally {
    savingPassword.value = false
  }
}

/** 去「问题反馈」页。用路由名而不是写死 /tickets：路径改了这里跟着走，
 *  写死的字符串只会静默掉进 404 兜底页（而兜底页会把人送回首页）。 */
function goTickets(): void {
  void router.push({ name: 'student-tickets' })
}

/** 退出登录。
 *
 *  **必须走 auth.logout()，不能直接调 authApi.logout()**：store 那一步除了清 user，
 *  还要把「高级视图」复位（它存在 sessionStorage，登出不会自己消失）——
 *  少了它，换个账号登进来会带着上一个账号的高级视图状态。
 *
 *  新令牌由 client.ts 的响应拦截器统一收下（/api/logout 的响应体里带 csrf），
 *  这里不用手动处理，否则「退出后再登录」这条最短路径必定 403。 */
async function doLogout(): Promise<void> {
  if (loggingOut.value) return
  const ok = await confirmAction({
    title: '退出登录',
    content: '退出后需要重新用学号和密码登录。',
    positiveText: '退出',
  })
  if (!ok) return
  loggingOut.value = true
  try {
    await auth.logout()
  } catch (error) {
    // auth.logout() 的 finally 一定会把本地 user 清掉，所以走到这里时
    // 界面其实已经算「未登录」了，只是服务端那个会话可能没断干净。
    // 提示一句再照常回登录页 —— 停在这一页更糟：用户会看到一个已经登出、
    // 却还显示着设置页的界面，比直接走更让人困惑。
    notify.error(error instanceof ApiError ? error.message : '退出登录没成功 · 重新登录确认')
  } finally {
    loggingOut.value = false
    // replace 而不是 push：退出之后按浏览器后退键不该再回到设置页。
    // 路由守卫会把它弹回登录页，但地址栏闪一下 /settings 仍会让人以为没退干净。
    await router.replace({ name: 'login' })
  }
}

onMounted(() => {
  void load()
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <header class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h1 class="font-heading text-lg font-bold sm:text-xl">设置</h1>
        <p class="mt-0.5 text-sm text-ink-3">账号资料 · 密码 · 取件提醒 · 存储用量</p>
      </div>
      <NButton size="small" quaternary :loading="loading" @click="refresh()">
        <template #icon><RefreshCw :size="15" /></template>
        刷新
      </NButton>
    </header>

    <div v-if="loading && !overview" class="flex flex-col gap-3">
      <NSkeleton v-for="index in 4" :key="index" height="120px" :sharp="false" />
    </div>

    <template v-else-if="overview">
      <!-- 缺 QQ 的提醒排在最前：它决定这个人收不收得到取件邮件，
           而缺了它连「改个宿舍」都保存不了（见下面那句说明）。 -->
      <NAlert v-if="needsQq" type="warning" :bordered="false" class="mb-3">
        <template #icon><TriangleAlert :size="16" /></template>
        还没有 QQ 号：<strong>收不到取件邮件提醒</strong>，资料也保存不了。
        在下面「QQ 号」那一栏补上（5-12 位数字）。
      </NAlert>

      <!-- 我的下单概况 -->
      <section class="mb-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-3 tech-label--cn">我的单数</div>
          <div class="tnum font-heading text-xl font-bold">{{ orders?.total ?? 0 }}</div>
        </div>
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-3 tech-label--cn">进行中</div>
          <div class="tnum font-heading text-xl font-bold">{{ orders?.in_progress ?? 0 }}</div>
        </div>
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-3 tech-label--cn">待取件</div>
          <div class="tnum font-heading text-xl font-bold" style="color: var(--accent-text)">
            {{ orders?.ready ?? 0 }}
          </div>
        </div>
        <div class="panel panel-raised px-3 py-2.5">
          <div class="tech-label text-ink-3 tech-label--cn">累计花费</div>
          <!-- 金额走 format.ts 的 priceLabel，不在模板里 toFixed：
               同一个数在别处显示成另一种写法时，没人会去查是哪一处写的。 -->
          <div class="tnum font-heading text-xl font-bold">
            {{ orders ? priceLabel(orders.spent) : '—' }}
          </div>
        </div>
      </section>

      <!-- 存储用量 -->
      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 class="flex items-center gap-1.5 font-heading text-base font-bold">
            <HardDrive :size="15"  />
            存储用量
          </h2>
          <span class="tnum text-xs text-ink-3">
            {{ usage ? formatBytes(usage.used_bytes) : '—' }} /
            {{ usage ? formatBytes(usage.quota_bytes) : '—' }}
          </span>
        </div>

        <div class="mt-2.5 h-2 w-full overflow-hidden" style="background-color: var(--muted)">
          <!-- 宽度条：重新拉取数据时会从旧值滑到新值，所以这条 transition 不能省。
               时长/曲线一律走 --motion-* 令牌（项目规矩：组件里不写裸毫秒和 cubic-bezier）；
               .transitions 这种工具类本仓并不存在 —— 写了不报错，只是没有任何效果。
               减少动效的兜底由 base.css 里那条全局 `* { transition-duration: .001ms !important }` 负责。 -->
          <div
            class="h-full"
            :style="{
              width: `${quotaPercent}%`,
              backgroundColor: quotaColor,
              transition: 'width var(--motion-dur-slow) var(--motion-ease-out), background-color var(--motion-dur-base) var(--motion-ease-out)',
            }"
          />
        </div>

        <dl class="mt-3 grid gap-2 text-xs sm:grid-cols-2">
          <div class="px-2.5 py-2" style="background-color: var(--muted)">
            <dt class="tech-label text-ink-3 tech-label--cn">订单里的文件</dt>
            <dd class="mt-1 mb-0 text-ink-2">
              {{ usage?.orders_count ?? 0 }} 个 ·
              <span class="tnum">{{ usage ? formatBytes(usage.orders_bytes) : '—' }}</span>
              <span class="mt-0.5 block text-ink-3">还没打完的单，文件要留着给打印员</span>
            </dd>
          </div>
          <div class="px-2.5 py-2" style="background-color: var(--muted)">
            <dt class="tech-label text-ink-3 tech-label--cn">没传完的上传</dt>
            <dd class="mt-1 mb-0 text-ink-2">
              {{ usage?.chunks_count ?? 0 }} / {{ usage?.chunks_max ?? 0 }} 个 ·
              <span class="tnum">{{ usage ? formatBytes(usage.chunks_bytes) : '—' }}</span>
              <span class="mt-0.5 block text-ink-3">上传中断留下的临时数据，重传或放弃即可</span>
            </dd>
          </div>
        </dl>

        <p class="mt-3 mb-0 text-xs leading-5 text-ink-3">
          两类都算进配额：它们在磁盘上一样占地方。快满时先看第二类 ——
          没传完的临时文件，取消掉就回来了。
        </p>
      </section>

      <!-- 账号资料 -->
      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <h2 class="mb-3 flex items-center gap-1.5 font-heading text-base font-bold">
          <UserCog :size="15"  />
          账号资料
        </h2>

        <dl class="mb-3 grid gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
          <div class="flex items-baseline justify-between gap-2 border-b pb-1.5" style="border-color: var(--border)">
            <dt class="tech-label text-ink-3 tech-label--cn">学号（登录名）</dt>
            <dd class="tnum m-0 font-semibold">{{ account?.student_id }}</dd>
          </div>
          <div class="flex items-baseline justify-between gap-2 border-b pb-1.5" style="border-color: var(--border)">
            <dt class="tech-label text-ink-3 tech-label--cn">姓名</dt>
            <dd class="m-0 font-semibold">{{ account?.real_name }}</dd>
          </div>
          <div class="flex items-baseline justify-between gap-2 border-b pb-1.5" style="border-color: var(--border)">
            <dt class="tech-label text-ink-3 tech-label--cn">注册时间</dt>
            <dd class="tnum m-0 text-ink-2">{{ shortTime(account?.create_time) }}</dd>
          </div>
          <div class="flex items-baseline justify-between gap-2 border-b pb-1.5" style="border-color: var(--border)">
            <dt class="tech-label text-ink-3 tech-label--cn">上次登录</dt>
            <dd class="tnum m-0 text-ink-2">{{ shortTime(account?.last_login) }}</dd>
          </div>
        </dl>

        <div class="flex flex-col gap-3">
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">昵称</span>
            <NInput
              v-model:value="profileForm.nickname"
              :maxlength="20"
              placeholder="2-20 位中文、字母、数字或下划线"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">宿舍</span>
            <NInput
              v-model:value="profileForm.dorm"
              :maxlength="50"
              placeholder="写到门牌号，例：3 号楼 502"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">
              QQ 号
              <span class="ml-1 font-normal">（取件提醒用，必填）</span>
            </span>
            <NInput
              v-model:value="profileForm.qq"
              :maxlength="12"
              placeholder="5-12 位数字，不能以 0 开头"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">
              其他联系方式
              <span class="ml-1 font-normal">（选填，可整组留空）</span>
            </span>
            <div class="flex gap-2">
              <!-- 类型可以清空回「不填」：这一组是整组选填的，
                   没有退路的必选下拉会让「这人只留了 QQ」变成存不进来的状态。 -->
              <NSelect
                v-model:value="profileForm.contact_type"
                :options="contactOptions"
                class="!w-[110px] shrink-0"
                clearable
                placeholder="不填"
                :consistent-menu-width="false"
              />
              <NInput
                v-model:value="profileForm.contact"
                class="min-w-0 flex-1"
                :disabled="!profileForm.contact_type"
                :placeholder="
                  profileForm.contact_type
                    ? OTHER_CONTACT_PLACEHOLDER[profileForm.contact_type]
                    : '—'
                "
              />
            </div>
          </label>
        </div>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p class="m-0 text-xs leading-5 text-ink-3">
            <template v-if="profileIssue">{{ profileIssue }}</template>
            <template v-else-if="profileDirty">改完点保存。</template>
            <template v-else>学号和姓名由管理员核实，本人改不了；其余随改随生效。</template>
          </p>
          <NButton
            type="primary"
            :loading="savingProfile"
            :disabled="!!profileIssue || !profileDirty"
            @click="saveProfile"
          >
            <template #icon><Save :size="15" /></template>
            保存资料
          </NButton>
        </div>
      </section>

      <!-- 取件提醒。单独成块而不是塞在「账号资料」末尾一行小字：
           这一栏是学生唯一会关心的通知渠道，而他要知道的是
           「信发到哪、什么时候发、没收到找谁」这三件事，
           塞在表单底下会被当成又一段免责声明直接跳过去。 -->
      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <h2 class="mb-1 flex items-center gap-1.5 font-heading text-base font-bold">
          <Mail :size="15"  />
          取件提醒
        </h2>
        <p class="mb-3 text-xs leading-5 text-ink-3">
          状态变成「可取了」时自动发一封邮件：标题带取件码，正文带取件地点与付款方式。
          不用一直回网页刷。
        </p>

        <dl class="grid gap-2 text-sm sm:grid-cols-2">
          <div class="px-2.5 py-2" style="background-color: var(--muted)">
            <dt class="tech-label text-ink-3 tech-label--cn">发到哪个邮箱</dt>
            <dd class="mt-1 mb-0 text-ink-2">
              <template v-if="account?.qq">
                <span class="tnum font-semibold">&lt;{{ account.qq }}&gt;@qq.com</span>
                <span class="mt-0.5 block text-ink-3">
                  由上面「QQ 号」那一栏自动拼出来，不用单独填邮箱
                </span>
              </template>
              <template v-else>
                <span style="color: var(--warn)">还没有 QQ 号，暂时收不到提醒</span>
                <span class="mt-0.5 block text-ink-3">在上面「QQ 号」那一栏补上即可</span>
              </template>
            </dd>
          </div>
          <div class="px-2.5 py-2" style="background-color: var(--muted)">
            <dt class="tech-label text-ink-3 tech-label--cn">什么时候发</dt>
            <dd class="mt-1 mb-0 text-ink-2">
              订单变成「可取了」的时刻
              <span class="mt-0.5 block text-ink-3">
                每单只发一次 · 改价、改状态不会重复打扰
              </span>
            </dd>
          </div>
        </dl>

        <p class="mt-3 mb-0 text-xs leading-5 text-ink-3">
          只认 QQ：微信号推不出邮箱，「其他联系方式」里的邮箱<strong>只是备用</strong>。
          没收到就按这个顺序查 ——
          ① 翻 QQ 邮箱的<strong>垃圾箱</strong>与「未读邮件」；
          ② 核对上面那栏 QQ 号（地址是
          <span class="tnum">&lt;QQ号&gt;@qq.com</span>，填错一位就寄给别人了）；
          ③ 还没有就在「问题反馈」里留言，管理员能看到订单。
        </p>
      </section>

      <!-- 密码 -->
      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <h2 class="mb-3 flex items-center gap-1.5 font-heading text-base font-bold">
          <KeyRound :size="15"  />
          修改密码
        </h2>

        <div class="grid gap-3 sm:grid-cols-3">
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">当前密码</span>
            <NInput
              v-model:value="passwordForm.current"
              type="password"
              show-password-on="click"
              :maxlength="64"
              placeholder="当前密码"
              autocomplete="current-password"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">新密码</span>
            <NInput
              v-model:value="passwordForm.next"
              type="password"
              show-password-on="click"
              :maxlength="64"
              placeholder="8-64 位，含字母和数字"
              autocomplete="new-password"
            />
          </label>
          <label class="flex flex-col gap-1">
            <span class="tech-label text-ink-3 tech-label--cn">确认新密码</span>
            <NInput
              v-model:value="passwordForm.confirm"
              type="password"
              show-password-on="click"
              :maxlength="64"
              placeholder="再输一次"
              autocomplete="new-password"
              @keydown.enter="changePassword"
            />
          </label>
        </div>

        <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
          <p class="m-0 text-xs leading-5 text-ink-3">
            <template v-if="passwordTouched && passwordIssueText">{{ passwordIssueText }}</template>
            <template v-else>改完当前这台设备保持登录，别处会被踢下线。</template>
          </p>
          <NButton
            type="primary"
            :loading="savingPassword"
            :disabled="!!passwordIssueText || !passwordReady"
            @click="changePassword"
          >
            修改密码
          </NButton>
        </div>

        <p class="mt-3 mb-0 text-xs leading-5 text-ink-3">
          其它设备（含之前复制出去的登录状态）会一起登出 ——
          改密码的意义本来就是「怀疑别人也能进来」。密码只存哈希，管理员也看不到原文。
        </p>
      </section>

      <!-- 账号与其他。收尾的一块：前四块都是「改自己的东西」，
           这一块是「离开 / 找人说事」，混进上面任何一块都会让那一块的标题变味。 -->
      <section class="panel panel-raised p-3.5 sm:p-4">
        <h2 class="mb-1 flex items-center gap-1.5 font-heading text-base font-bold">
          <MessageSquare :size="15"  />
          账号与其他
        </h2>
        <p class="mb-3 text-xs leading-5 text-ink-3">
          与订单无关的问题（打印出错、退款、账号异常）走工单，管理员能看到订单情况。
          退出登录只影响当前这台设备；其它设备要改密码才会下线。
        </p>

        <div class="flex flex-wrap items-center gap-2">
          <!-- 工单入口用普通按钮而不是 RouterLink：这里是「设置页里的一个动作」，
               和旁边那颗退出登录长得一致更清楚；用 <a> 还要自己处理键盘与样式。 -->
          <NButton size="small" @click="goTickets">
            <template #icon><MessageSquare :size="15" /></template>
            我的工单
          </NButton>
          <NButton size="small" :loading="loggingOut" @click="doLogout">
            <template #icon><LogOut :size="15" /></template>
            退出登录
          </NButton>
        </div>

        <p class="mt-3 mb-0 text-xs leading-5 text-ink-3">
          <strong>注销账号（退学、毕业不再使用）不在这里</strong> ——
          注销会让昵称与学号被让出来、别人可以注册同名，必须由管理员在账号管理里确认，
          本人做不了。真要注销就在「我的工单」里说明学号，管理员核实后处理；
          注销后订单与工单记录都会保留，需要时可以恢复。
        </p>
      </section>
    </template>
  </div>
</template>
