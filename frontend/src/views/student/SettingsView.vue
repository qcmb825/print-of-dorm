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
 *  这一页调**两个**接口：/api/me/overview（资料 + 单数 + 用量）与 /api/me/prefs
 *  （通知 / 免打扰 / 默认打印参数 / 订单列表显示）。偏好刻意不并进 overview ——
 *  它是另一份真相（服务端 prefs.py，机器人「设置」命令读的也是它），
 *  并进去的结果是两个接口以后每次加字段都要一起改。
 *  除此之外仍然不拉别的东西：底部的工单入口只是个跳转，不顺手拉一遍工单数
 *  （未读回复在工单页自己带徽标），纸张列表也只在点开「默认纸张」那一栏时才拉。
 */
import { computed, onMounted, reactive, ref } from 'vue'
import {
  BellRing,
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
import {
  NAlert,
  NButton,
  NInput,
  NInputNumber,
  NSelect,
  NSkeleton,
  NSwitch,
  NTimePicker,
} from 'naive-ui'
import { useRouter } from 'vue-router'
import { ApiError } from '@/api/client'
import { authApi, printOptionsApi } from '@/api/endpoints'
import { OTHER_CONTACT_LABELS } from '@/api/types'
import type { MeOverviewResponse, OtherContactType, UserPrefs } from '@/api/types'
import { confirmAction, notify } from '@/composables/feedback'
import { useAuthStore } from '@/stores/auth'
import { formatBytes, priceLabel, shortTime } from '@/utils/format'
import {
  COPIES_MAX,
  COPIES_MIN,
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
  if (!prefsDirty.value) void loadPrefs()
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

/* ---------- 偏好（通知 / 免打扰 / 默认打印参数 / 订单列表） ----------
 *
 *  这份与机器人「设置」命令读写的是**同一份**（服务端 prefs.py）。所以：
 *  ① 页面不再自己拼解释文案，`prefsLines` 直接显示服务端翻好的那几句 ——
 *     两边各写一套话术的话，改一处另一处就留在旧说法上，而且不报错；
 *  ② 保存走**整块一起提交**（和上面的「账号资料」一样有脏值判定），
 *     而不是每个开关立刻发一次请求：开关多了以后那种「点一下一个请求」的写法
 *     一旦有一发失败，界面上那颗开关已经翻过去了，用户看到的是假状态。
 */

/** 表单里的形状：时间用两个独立字段，但界面上是一个「免打扰」开关 + 两个时间。
 *  只给一头时间是**非法**的（后端会 400）—— 那一头等于没设，用户却以为设上了。 */
const prefsForm = reactive({
  notify_qq: true,
  notify_mail: true,
  quietOn: false,
  quiet_from: '22:00',
  quiet_to: '08:00',
  hide_done_orders: false,
  card_replies: true,
  orders_page_size: 5,
  default_color: '',
  default_duplex: '',
  default_copies: null as number | null,
  default_paper_type_id: null as number | null,
})

/** 服务端当前那份（已归一化）。脏值判定与回填都以它为准。 */
const savedPrefs = ref<UserPrefs | null>(null)
const prefsLines = ref<string[]>([])
const savingPrefs = ref(false)
/** 偏好没拉到（网络/接口错）。区分「正在载入」与「没拉到」——
 *  两者在界面上长得一样的话，用户只能干等一个永远不会来的响应。 */
const prefsError = ref(false)

function fillPrefs(next: UserPrefs): void {
  savedPrefs.value = next
  prefsForm.notify_qq = next.notify_qq
  prefsForm.notify_mail = next.notify_mail
  // 两头都有才算「开着免打扰」。数据库里存的是空串（不是 NULL），
  // 所以这里判空串 —— 判 null 会永远判不出关闭状态。
  prefsForm.quietOn = !!(next.quiet_from && next.quiet_to)
  prefsForm.quiet_from = next.quiet_from || '22:00'
  prefsForm.quiet_to = next.quiet_to || '08:00'
  prefsForm.hide_done_orders = next.hide_done_orders
  prefsForm.card_replies = next.card_replies
  prefsForm.orders_page_size = next.orders_page_size
  prefsForm.default_color = next.default_color
  prefsForm.default_duplex = next.default_duplex
  prefsForm.default_copies = next.default_copies
  prefsForm.default_paper_type_id = next.default_paper_type_id
}

async function loadPrefs(): Promise<void> {
  prefsError.value = false
  try {
    const response = await authApi.prefs()
    fillPrefs(response.prefs)
    prefsLines.value = response.lines
  } catch (error) {
    prefsError.value = true
    notify.error(error instanceof ApiError ? error.message : '加载偏好失败 · 稍后重试')
  }
}

/** 要提交的那一份。免打扰关掉时**必须回空串**（而不是把两个时间留在表单里）——
 *  留着的话用户以为关了，服务端那边还开着，夜里照旧不推送。 */
function prefsPayload(): Partial<UserPrefs> {
  return {
    notify_qq: prefsForm.notify_qq,
    notify_mail: prefsForm.notify_mail,
    quiet_from: prefsForm.quietOn ? prefsForm.quiet_from : '',
    quiet_to: prefsForm.quietOn ? prefsForm.quiet_to : '',
    hide_done_orders: prefsForm.hide_done_orders,
    card_replies: prefsForm.card_replies,
    orders_page_size: prefsForm.orders_page_size,
    default_color: prefsForm.default_color,
    default_duplex: prefsForm.default_duplex,
    default_copies: prefsForm.default_copies,
    default_paper_type_id: prefsForm.default_paper_type_id,
  }
}

const prefsDirty = computed(() => {
  const saved = savedPrefs.value
  if (!saved) return false
  const next = prefsPayload()
  return (Object.keys(next) as (keyof UserPrefs)[]).some((key) => {
    const mine = next[key]
    const theirs = saved[key]
    // 份数那一栏空着时是 null，而输入框清空给的是 null —— 但比较前再归一一次
    // （'' 与 null 都算「没设」），免得清空后按钮一直亮着、点了又说没变化。
    const norm = (v: unknown) => (v === '' || v === undefined ? null : v)
    return norm(mine) !== norm(theirs)
  })
})

/** 免打扰的两个时间点必须是 'HH:MM' —— 后端也校验，这里提前拦是为了
 *  不让用户点了保存才知道格式不对（NTimePicker 基本只会给出合法值，
 *  但它是可清空的：清空后是 null，直接发过去会被后端 400）。 */
const quietIssue = computed<string | null>(() => {
  if (!prefsForm.quietOn) return null
  const ok = (v: unknown) => typeof v === 'string' && /^\d{2}:\d{2}$/.test(v)
  if (!ok(prefsForm.quiet_from) || !ok(prefsForm.quiet_to)) {
    return '免打扰的两个时间都要选（或整个关掉）'
  }
  if (prefsForm.quiet_from === prefsForm.quiet_to) {
    return '开始与结束时间不能一样 —— 那等于没有免打扰时段'
  }
  return null
})

async function savePrefs(): Promise<void> {
  if (savingPrefs.value || quietIssue.value || !prefsDirty.value) return
  savingPrefs.value = true
  try {
    const response = await authApi.savePrefs(prefsPayload())
    // 用服务端回来的那一份回填，而不是拿本地表单当结果：份数/每页条数
    // 服务端会**夹到范围内**，不回填的话界面显示 25、库里存的是 20。
    fillPrefs(response.prefs)
    prefsLines.value = response.lines
    notify.success('偏好已保存')
  } catch (error) {
    notify.error(error instanceof ApiError ? error.message : '保存失败 · 稍后重试')
  } finally {
    savingPrefs.value = false
  }
}

/** 纸张列表按需拉：设置页平时只调两个接口，而纸张列表只在**点开那一栏**时
 *  才有用。不点就不拉，省掉一次没人看的往返（纸张是管理员维护的，改得很少）。 */
const paperOptions = ref<{ label: string; value: number }[]>([])
const paperLoading = ref(false)
async function loadPapers(): Promise<void> {
  if (paperOptions.value.length || paperLoading.value) {
    return
  }
  paperLoading.value = true
  try {
    const response = await printOptionsApi.load()
    paperOptions.value = response.paper_types.map((item) => ({
      label: item.remark ? `${item.name}（${item.remark}）` : item.name,
      value: item.id,
    }))
  } catch {
    // 拉不到就当这一栏没有可选项：默认纸张本来就是个可选项，
    // 为它弹一个错误反而像是下单失败了。
    paperOptions.value = []
  } finally {
    paperLoading.value = false
  }
}

/** 「每次问我」与「没设过」是同一个状态：空串 / null。 */
const colorOptions = [
  { label: '每次问我', value: '' },
  { label: '黑白', value: 'black' },
  { label: '彩色', value: 'color' },
]
const duplexOptions = [
  { label: '每次问我', value: '' },
  { label: '单面', value: 'single' },
  { label: '双面', value: 'double' },
]

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
  // 偏好单独一次请求：它与 /api/me/overview 是两份真相（服务端 prefs.py 是权威），
  // 硬塞进 overview 会让两个接口以后都要改。这一页因此是**两个**请求，
  // 但仍不拉工单数 / 打印选项那些「顺手就能拿」的东西（纸张列表只在点开时按需拉）。
  void loadPrefs()
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <header class="mb-4 flex items-center justify-between gap-3">
      <div>
        <h1 class="font-heading text-lg font-bold sm:text-xl">设置</h1>
        <p class="mt-0.5 text-sm text-ink-3">账号资料 · 密码 · 取件提醒 · 通知与默认参数 · 存储用量</p>
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
          状态变成「可取件」时自动发一封邮件：标题带单号，正文带取件地点与付款方式。
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
              订单变成「可取件」的时刻
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

      <!-- 通知与偏好。放在「取件提醒」后面是有意的顺序：上一块讲「信怎么发」，
           这一块讲「要不要发、什么时候发、列表给我看什么」——
           两个问题挨着，人才不会以为上一块那些设置改不了。 -->
      <section class="panel panel-raised mb-3 p-3.5 sm:p-4">
        <h2 class="mb-1 flex items-center gap-1.5 font-heading text-base font-bold">
          <BellRing :size="15" />
          通知与偏好
        </h2>
        <p class="mb-3 text-xs leading-5 text-ink-3">
          QQ 机器人里的「设置」命令改的是<strong>同一份</strong>（改一边另一边跟着变）。
        </p>

        <div v-if="!savedPrefs && prefsError" class="flex flex-wrap items-center gap-2 text-xs">
          <span style="color: var(--warn)">偏好没拉到 —— 可能是网络或服务器临时的问题。</span>
          <NButton size="tiny" @click="loadPrefs">重试</NButton>
        </div>
        <div v-else-if="!savedPrefs" class="text-xs text-ink-3">正在载入偏好…</div>

        <template v-else>
          <!-- ① 通知渠道 -->
          <div class="grid gap-2 sm:grid-cols-2">
            <div
              class="flex cursor-pointer items-center justify-between gap-3 px-2.5 py-2"
              style="background-color: var(--muted)"
              @click="prefsForm.notify_qq = !prefsForm.notify_qq"
            >
              <span>
                <span class="block text-sm font-semibold">QQ 推送</span>
                <span class="mt-0.5 block text-xs text-ink-3">可取了在 QQ 里戳你一下（要先绑定 QQ 号）</span>
              </span>
              <NSwitch v-model:value="prefsForm.notify_qq" size="small" aria-label="QQ 推送" />
            </div>
            <!-- 整行可点：Naive 的 NSwitch 不渲染原生 input，包在 <label> 里
                 点文字是没反应的（光标却显示可点） -->
            <div
              class="flex cursor-pointer items-center justify-between gap-3 px-2.5 py-2"
              style="background-color: var(--muted)"
              @click="prefsForm.notify_mail = !prefsForm.notify_mail"
            >
              <span>
                <span class="block text-sm font-semibold">邮件提醒</span>
                <span class="mt-0.5 block text-xs text-ink-3">同时发一封邮件到 &lt;QQ号&gt;@qq.com</span>
              </span>
              <NSwitch v-model:value="prefsForm.notify_mail" size="small" aria-label="邮件提醒" />
            </div>
            <!-- 整行可点：Naive 的 NSwitch 不渲染原生 input，包在 <label> 里
                 点文字是没反应的（光标却显示可点） -->
            <div
              class="flex cursor-pointer items-center justify-between gap-3 px-2.5 py-2"
              style="background-color: var(--muted)"
              @click="prefsForm.hide_done_orders = !prefsForm.hide_done_orders"
            >
              <span>
                <span class="block text-sm font-semibold">隐藏已取件的单</span>
                <span class="mt-0.5 block text-xs text-ink-3">「我的订单」与机器人「订单」都不再列它们</span>
              </span>
              <NSwitch v-model:value="prefsForm.hide_done_orders" size="small" aria-label="隐藏已取件的单" />
            </div>
            <!-- 整行可点：Naive 的 NSwitch 不渲染原生 input，包在 <label> 里
                 点文字是没反应的（光标却显示可点） -->
            <div
              class="flex cursor-pointer items-center justify-between gap-3 px-2.5 py-2"
              style="background-color: var(--muted)"
              @click="prefsForm.card_replies = !prefsForm.card_replies"
            >
              <span>
                <span class="block text-sm font-semibold">机器人用卡片回</span>
                <span class="mt-0.5 block text-xs text-ink-3">关掉后订单/工单这类查询改用纯文字，省流量</span>
              </span>
              <NSwitch v-model:value="prefsForm.card_replies" size="small" aria-label="机器人用卡片回" />
            </div>
          </div>

          <!-- ② 免打扰。跨零点（22:00-08:00）是常态，所以两个时间点不设约束：
               谁前谁后由服务端判定（见 prefs.in_quiet_hours）。 -->
          <div class="mt-3 px-2.5 py-2.5" style="background-color: var(--muted)">
            <div
              class="flex cursor-pointer items-center justify-between gap-3"
              @click="prefsForm.quietOn = !prefsForm.quietOn"
            >
              <span>
                <span class="block text-sm font-semibold">免打扰时段</span>
                <span class="mt-0.5 block text-xs text-ink-3">
                  这段时间的提醒<strong>不丢</strong>，攒到时段结束再推 ——
                  单号有时效，夜里静音不等于不要了
                </span>
              </span>
              <NSwitch v-model:value="prefsForm.quietOn" size="small" aria-label="免打扰时段" />
            </div>
            <div v-if="prefsForm.quietOn" class="mt-2.5 flex flex-wrap items-center gap-2">
              <NTimePicker
                v-model:formatted-value="prefsForm.quiet_from"
                format="HH:mm"
                value-format="HH:mm"
                size="small"
                class="w-28"
                :clearable="false"
              />
              <span class="text-xs text-ink-3">到</span>
              <NTimePicker
                v-model:formatted-value="prefsForm.quiet_to"
                format="HH:mm"
                value-format="HH:mm"
                size="small"
                class="w-28"
                :clearable="false"
              />
              <span class="text-xs text-ink-3">（跨零点没问题，22:00 → 08:00 就是一夜）</span>
            </div>
          </div>

          <!-- ③ 默认打印参数与订单每页条数 -->
          <div class="mt-3 grid gap-2.5 sm:grid-cols-2">
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn">默认打印方式</span>
              <NSelect v-model:value="prefsForm.default_color" :options="colorOptions" size="small" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn">默认单双面</span>
              <NSelect v-model:value="prefsForm.default_duplex" :options="duplexOptions" size="small" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn">默认份数</span>
              <!-- 清空 = 「没设过」= 每次下单都问。不写 1 当兜底：
                   1 是个**决定**，代替用户决定「就打一份」是最不该做的默认值。 -->
              <!-- 上下限与下单接口同一套常量：这里放宽到 99 的话，
                   存进去的默认值会把下单页预填成一个「提交必被 400」的数 -->
              <NInputNumber
                v-model:value="prefsForm.default_copies"
                size="small"
                :min="COPIES_MIN"
                :max="COPIES_MAX"
                clearable
                placeholder="每次问我"
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn">默认纸张</span>
              <NSelect
                v-model:value="prefsForm.default_paper_type_id"
                :options="paperOptions"
                :loading="paperLoading"
                size="small"
                clearable
                placeholder="每次问我"
                @update:show="(shown: boolean) => shown && loadPapers()"
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn">机器人「订单」每页条数</span>
              <NInputNumber
                v-model:value="prefsForm.orders_page_size"
                size="small"
                :min="3"
                :max="20"
              />
            </label>
          </div>

          <!-- 服务端翻好的那几句：不在这里另写一套解释，否则改一处就与机器人那边对不上。 -->
          <ul v-if="prefsLines.length" class="mt-3 mb-0 list-none space-y-1 p-0 text-xs text-ink-3">
            <li v-for="line in prefsLines" :key="line" class="flex gap-1.5">
              <span aria-hidden="true">·</span>
              <span>{{ line }}</span>
            </li>
          </ul>

          <div class="mt-3 flex flex-wrap items-center justify-between gap-2">
            <p class="m-0 text-xs leading-5" :class="quietIssue && 'text-[var(--err)]'">
              <template v-if="quietIssue">{{ quietIssue }}</template>
              <template v-else-if="prefsDirty">有改动还没保存。</template>
              <template v-else>默认参数只用来预填下单表单，随时能在下单时改。</template>
            </p>
            <NButton
              type="primary"
              size="small"
              :loading="savingPrefs"
              :disabled="!prefsDirty || !!quietIssue"
              @click="savePrefs"
            >
              <template #icon><Save :size="15" /></template>
              保存偏好
            </NButton>
          </div>
        </template>
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
