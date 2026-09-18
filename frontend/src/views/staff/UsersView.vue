<script setup lang="ts">
/** 账号管理。
 *
 *  同一份代码承担两种视图，区别只在界面渲染：
 *  - 普通管理员：只看得到名单（昵称/资料/角色/状态/单量），密码列和一切改动入口都不渲染；
 *  - 高级视图（默认管理员）：多出明文密码列，以及改角色、改资料、重置密码、
 *    代发工单、禁用·启用、注销、恢复七个动作。
 *
 *  「高级视图」不是一个页面，而是布局里连点品牌图标换来的一个开关（见 layouts/StaffLayout.vue）。
 *  它只把入口藏起来，拦人在服务端：所有写接口上都有 @roles_required(ROLE_SUPER)。
 *  所以这里少渲染一个按钮属于界面礼貌，多渲染一个也不会真的多出权限。
 *
 *  列表能看到哪些行同样是后端在 SQL 层定的：普通管理员的响应里根本没有默认管理员那一行，
 *  拿都拿不到，也就无从泄露。 */
import { computed, h, onMounted, reactive, ref, watch } from 'vue'
import {
  Eye,
  KeyRound,
  MessageSquare,
  Pencil,
  RefreshCw,
  Search,
} from '@lucide/vue'
import {
  NAlert,
  NButton,
  NDataTable,
  NDropdown,
  NEmpty,
  NInput,
  NModal,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
  type DataTableColumns,
  type DropdownOption,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { adminApi, type AdminProfilePayload } from '@/api/endpoints'
import {
  ACCOUNT_STATUS_LABELS,
  CONTACT_LABELS,
  ROLE_LABELS,
  type AccountStatus,
  type AdminUser,
  type ContactType,
  type RestoreConflict,
  type Role,
} from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import RoleTag from '@/components/RoleTag.vue'
import { confirmAction } from '@/composables/feedback'
import { useAuthStore } from '@/stores/auth'
import { shortTime } from '@/utils/format'
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
const message = useMessage()

const users = ref<AdminUser[]>([])
const loading = ref(true)
const keyword = ref('')
const roleFilter = ref<'all' | Role>('all')
/** 明文密码列。默认关着，要显式请求一次（服务端会强制记一条审计）。 */
const withPassword = ref(false)
/** 已注销的账号默认不进列表：他们只是历史，没必要天天占着一屏地方。 */
const includeClosed = ref(false)
const closedTotal = ref(0)

/** 高级视图开关（连点品牌图标）。它**不是**权限判断：
 *  关掉它的人仍然是默认管理员，只是界面收了回去。
 *  所以下面的请求参数要 AND 上它，否则关掉之后行动照样在发生。 */
const advanced = computed(() => auth.advanced)

/** 状态颜色。注销用 ini-3（灰），不是 err —— 注销是走完了的流程，
 *  和「被禁用」不是一回事，同色会让人误以为出了什么问题。 */
const STATUS_COLOR: Record<AccountStatus, string> = {
  active: 'var(--ok)',
  disabled: 'var(--err)',
  /* 注销态。原先写的是 var(--ink-3) —— 那支不存在（见 tokens.css 里 --color-ink-* 的说明），
     声明静默失效、落到行文字色，跟「正常」看着一样。这里是状态标签，要读，走三级文字色。 */
  closed: 'var(--text-tertiary)',
}

/* 筛选只列两种：列表接口在 SQL 层就把第三种角色挡在外面了，
 * 留着那一项等于给用户一个必然查出 0 条的选项。 */
const roleOptions = [
  { label: '全部角色', value: 'all' },
  { label: ROLE_LABELS.user, value: 'user' },
  { label: ROLE_LABELS.admin, value: 'admin' },
]

/** 联系方式类型的下拉选项。从 CONTACT_LABELS 反推，
 *  不另写一份中文 —— 两份迟早会对不上。 */
const contactOptions = (Object.keys(CONTACT_LABELS) as ContactType[]).map((value) => ({
  label: CONTACT_LABELS[value],
  value,
}))

const filtered = computed(() => {
  const needle = keyword.value.trim().toLowerCase()
  return users.value.filter((user) => {
    if (roleFilter.value !== 'all' && user.role !== roleFilter.value) return false
    if (!needle) return true
    return [user.nickname, user.real_name, user.student_id, user.dorm, user.contact ?? '']
      .join(' ')
      .toLowerCase()
      .includes(needle)
  })
})

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    // 两个参数都 AND 上 advanced：退出高级视图后残留的开关状态
    // 不该继续跟着请求发出去 —— 那等于界面收起来了，行动照旧。
    const data = await adminApi.users(
      advanced.value && withPassword.value,
      advanced.value && includeClosed.value,
    )
    users.value = data.users
    closedTotal.value = data.closed_total
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载账号列表失败')
  } finally {
    loading.value = false
  }
}

/** 点标签文字也要能切换。Naive 的 NSwitch 只管它自己那颗开关，
 *  文字点上去毫无反应，用户会以为功能坏了（浏览器里真点过一次才发现）。 */
function toggleWithPassword(): void {
  withPassword.value = !withPassword.value
  void load()
}

function toggleIncludeClosed(): void {
  includeClosed.value = !includeClosed.value
  void load()
}

/** 切回普通视图立刻重拉，并把两个开关拨回去。
 *  不重拉的话明细还留在内存里：界面已经不渲染密码列了，
 *  但整个响应体还在 JS 变量里，翻 devtools 一样看得见。
 *  藏东西得靠「没拿过」，不能靠「没画出来」。 */
watch(advanced, () => {
  withPassword.value = false
  includeClosed.value = false
  void load(true)
})

async function setRole(user: AdminUser, role: Role): Promise<void> {
  try {
    await adminApi.setRole(user.id, role)
    message.success(`已将「${user.nickname}」设为${ROLE_LABELS[role]}`)
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '修改角色失败')
  }
}

async function toggleStatus(user: AdminUser): Promise<void> {
  const next = user.status === 'active' ? 'disabled' : 'active'
  try {
    await adminApi.setStatus(user.id, next)
    message.success(next === 'active' ? '账号已启用' : '账号已禁用')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '修改状态失败')
  }
}

/** 注销。数据一条都不会少 —— 账号只是登不进来了，订单与工单原样留着，
 *  而昵称和学号会被让出去（数据库那两条部分唯一索引的条件就是 status <> closed）。
 *  所以文案刻意不写「删除」：界面上出现「删除」二字，管理员就会以为数据没了，
 *  而这里恰恰相反 —— 之后还能从这一页恢复。 */
async function closeUser(user: AdminUser): Promise<void> {
  const ok = await confirmAction({
    title: '注销账号',
    content: `确定注销「${user.nickname}」吗？该账号会立刻失去登录资格，昵称和学号也会被让出来（别人可以注册同名）。订单与工单全部保留，之后可以从这里恢复。`,
    positiveText: '注销',
  })
  if (!ok) return
  try {
    await adminApi.closeUser(user.id)
    message.success('账号已注销')
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '注销失败')
  }
}

/** 恢复已注销的账号。撞名时后端整体拒绝，这里把占位者列出来。 */
async function restoreUser(user: AdminUser): Promise<void> {
  const ok = await confirmAction({
    title: '恢复账号',
    content: `确定恢复「${user.nickname}」吗？恢复后这个账号重新可以登录。若昵称或学号已被别人占用，本次恢复会被拒绝。`,
    positiveText: '恢复',
  })
  if (!ok) return
  try {
    await adminApi.restoreUser(user.id)
    message.success('账号已恢复，现在可以用原学号登录')
    await load(true)
  } catch (error) {
    if (error instanceof ApiError) {
      // 撞名是 409 + 结构化的 conflicts。只说「被占用」的话，管理员除了
      // 挨个翻列表没有别的办法 —— 而那件事最终也只能由人来定夺。
      const items = (error.detail.conflicts ?? []) as RestoreConflict[]
      if (items.length) {
        conflicts.target = user
        conflicts.items = items
        conflicts.show = true
        return
      }
      message.error(error.message)
    } else {
      message.error('恢复失败')
    }
  }
}

/** 恢复失败（撞名）时单独弹一个窗：挤在一行 message 里的话，
 *  两个学号一条昵称会连成一串，管理员还得自己断句。 */
const conflicts = reactive<{ show: boolean; target: AdminUser | null; items: RestoreConflict[] }>({
  show: false,
  target: null,
  items: [],
})

/** 把占位的那行找出来：搜索框能按昵称匹配，填进去就等于「跳过去看一眼」。 */
function locateOwner(name: string): void {
  keyword.value = name
  conflicts.show = false
}

type DialogKind = 'profile' | 'password' | 'ticket'

const DIALOG_TITLES: Record<DialogKind, string> = {
  profile: '修改资料',
  password: '重置密码',
  ticket: '代发工单',
}

/** 三个弹窗共用一层壳（标题、目标行、页脚都一样，只有表单不同）。 */
const dialog = reactive<{ show: boolean; kind: DialogKind; target: AdminUser | null }>({
  show: false,
  kind: 'profile',
  target: null,
})
const submitting = ref(false)

/** 资料表单。后端是全量覆盖，所以打开时必须把当前值填满 ——
 *  漏填一个字段不等于「这个字段不动」，等于把它清空了。 */
const profileForm = reactive<AdminProfilePayload>({
  nickname: '',
  real_name: '',
  student_id: '',
  dorm: '',
  contact_type: 'wechat',
  contact: '',
})

const newPassword = ref('')

/** 代发工单。上限跟学生端共用同一份数（后端 config.TICKET_SUBJECT_MAX / BODY_MAX），
 *  前端卡住是为了让计数条先停住，而不是打完 1000 字才被后端打回。 */
const SUBJECT_MAX = 60
const BODY_MAX = 1000
const ticketForm = reactive({ subject: '', body: '' })

function openDialog(user: AdminUser, kind: DialogKind): void {
  dialog.target = user
  dialog.kind = kind
  if (kind === 'profile') {
    // 用 ?? 而不是 ||：这些字段都可能是 null（老账号资料不全），
    // 直接塞进 v-model 会在输入框里显示成「null」四个字母。
    profileForm.nickname = user.nickname ?? ''
    profileForm.real_name = user.real_name ?? ''
    profileForm.student_id = user.student_id ?? ''
    profileForm.dorm = user.dorm ?? ''
    profileForm.contact_type = user.contact_type ?? 'wechat'
    profileForm.contact = user.contact ?? ''
  } else if (kind === 'password') {
    // 每次打开都清空：上一次打的密码留在框里，容易被顺手再提交一遍。
    newPassword.value = ''
  } else {
    ticketForm.subject = ''
    ticketForm.body = ''
  }
  dialog.show = true
}

/** 资料校验，规则抄自 utils.validate_identity_fields（权威版本在后端）。
 *  两边不一致时以后端为准，但前端先拦一道能省一次往返。 */
const profileIssue = computed<string | null>(() => {
  if (!NICKNAME_RE.test(profileForm.nickname.trim()))
    return '昵称需为 2-20 位中文、字母、数字或下划线'
  if (!REALNAME_RE.test(profileForm.real_name.trim())) return '姓名需为 2-20 位中文或字母'
  if (!STUDENT_ID_RE.test(profileForm.student_id.trim())) return '学号需为 4-20 位数字'
  const dorm = profileForm.dorm.trim()
  if (dorm.length < 2 || dorm.length > 50) return '宿舍位置需为 2-50 个可见字符（请写到门牌号）'
  if (!validateContact(profileForm.contact_type, profileForm.contact.trim()))
    return CONTACT_HINT[profileForm.contact_type]
  return null
})

/** 新密码的校验。这里**不比「确认密码」**，是跟着后端走的：
 *  确认框是注册（自己打字）防手滑用的，管理员重置是打一串临时密码交给本人。 */
const passwordIssueText = computed<string | null>(() => {
  const pwd = newPassword.value
  if (!pwd) return '请填写新密码'
  const issue = passwordIssue(pwd)
  if (issue) return issue
  const target = dialog.target
  // 后端 password_error 还挡着「密码等于昵称或学号」（别一眼就被猜到）。
  // 这里先拦，免得填完才被打回。
  if (target && (pwd === target.nickname || pwd === target.student_id))
    return '密码不能与昵称或学号相同'
  return null
})

const ticketIssue = computed<string | null>(() => {
  if (ticketForm.subject.trim().length < 2) return '标题至少 2 个字'
  if (ticketForm.body.trim().length < 2) return '内容至少 2 个字'
  return null
})

/** 当前弹窗的校验结论。三个弹窗共用一层壳，所以这里按 kind 分派。 */
const dialogIssue = computed<string | null>(() => {
  if (!dialog.target) return null
  if (dialog.kind === 'profile') return profileIssue.value
  if (dialog.kind === 'password') return passwordIssueText.value
  return ticketIssue.value
})
const canConfirm = computed(() => dialog.target !== null && dialogIssue.value === null)

async function confirmDialog(): Promise<void> {
  const target = dialog.target
  if (!target || !canConfirm.value) return
  submitting.value = true
  try {
    if (dialog.kind === 'profile') await saveProfile(target)
    else if (dialog.kind === 'password') await savePassword(target)
    else await sendTicket(target)
    dialog.show = false
    await load(true)
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '操作失败')
  } finally {
    submitting.value = false
  }
}

async function saveProfile(target: AdminUser): Promise<void> {
  await adminApi.setProfile(target.id, {
    nickname: profileForm.nickname.trim(),
    real_name: profileForm.real_name.trim(),
    student_id: profileForm.student_id.trim(),
    dorm: profileForm.dorm.trim(),
    contact_type: profileForm.contact_type,
    contact: profileForm.contact.trim(),
  })
  message.success('资料已更新')
}

async function savePassword(target: AdminUser): Promise<void> {
  await adminApi.resetPassword(target.id, newPassword.value)
  // 回执里绝不重复密码本身：提示会挂在屏幕上，密码就跟着被截图了。
  message.success(`已重置「${target.nickname}」的密码，请把新密码转告本人`)
}

async function sendTicket(target: AdminUser): Promise<void> {
  await adminApi.ticketFor(target.id, ticketForm.subject.trim(), ticketForm.body.trim())
  message.success(`已替「${target.nickname}」提交工单`)
}

/** 某一行的动作菜单。已注销的那行只留一个出口 —— 其余动作对一个登不进来的
 *  账号本来就没有意义，列出来只会让人点了一遍再吃一个 4xx。 */
function rowActions(user: AdminUser): DropdownOption[] {
  if (user.status === 'closed') return [{ label: '恢复账号', key: 'restore' }]
  const self = user.is_self
  return [
    { label: `设为${ROLE_LABELS.user}`, key: 'role:user', disabled: self || user.role === 'user' },
    {
      label: `设为${ROLE_LABELS.admin}`,
      key: 'role:admin',
      disabled: self || user.role === 'admin',
    },
    { type: 'divider', key: 'd1' },
    { label: '修改资料', key: 'profile' },
    { label: '重置密码', key: 'password' },
    // 给自己代发工单没有意义：那条路是以学生的名义入库的，
    // 自己给自己发只会在自己的会话里多出一条自己写的消息。
    { label: '代发工单', key: 'ticket', disabled: self },
    { type: 'divider', key: 'd2' },
    { label: user.status === 'active' ? '禁用账号' : '启用账号', key: 'toggle', disabled: self },
    { label: '注销账号', key: 'close', disabled: self },
  ]
}

/** 行内动作分派。key 拼成 `role:xxx` 这种串，因为下拉菜单的 key 只能是字符串。 */
async function onRowAction(user: AdminUser, key: string): Promise<void> {
  if (key.startsWith('role:')) return setRole(user, key.slice(5) as Role)
  if (key === 'profile') return openDialog(user, 'profile')
  if (key === 'password') return openDialog(user, 'password')
  if (key === 'ticket') return openDialog(user, 'ticket')
  if (key === 'toggle') return toggleStatus(user)
  if (key === 'close') return closeUser(user)
  if (key === 'restore') return restoreUser(user)
}

const columns = computed<DataTableColumns<AdminUser>>(() => {
  const base: DataTableColumns<AdminUser> = [
    {
      title: '账号',
      key: 'nickname',
      width: 150,
      render: (row) =>
        h('div', { class: 'min-w-0' }, [
          h('div', { class: 'truncate text-sm font-semibold' }, [
            row.nickname,
            // 标注自己那一行不是装饰：对自己，改角色/禁用/注销在菜单里都是灰的
            // （后端一律 400），不标出来会让人以为是页面坏了。
            row.is_self ? h('span', { class: 'ml-1 text-xs opacity-60' }, '（你自己）') : null,
          ]),
          h('div', { class: 'tnum text-2xs opacity-60' }, `#${row.id}`),
        ]),
    },
    {
      title: '姓名 / 学号',
      key: 'real_name',
      width: 150,
      render: (row) =>
        h('div', { class: 'min-w-0' }, [
          h('div', { class: 'truncate text-sm' }, row.real_name || '—'),
          h('div', { class: 'tnum truncate text-2xs opacity-60' }, row.student_id || '—'),
        ]),
    },
    {
      title: '宿舍',
      key: 'dorm',
      width: 118,
      render: (row) => h('span', { class: 'truncate text-xs' }, row.dorm || '—'),
    },
    {
      title: '联系方式',
      key: 'contact',
      width: 168,
      render: (row) =>
        h(
          'span',
          { class: 'truncate text-xs opacity-80' },
          row.contact ? `${row.contact_type === 'wechat' ? '微信' : row.contact_type === 'qq' ? 'QQ' : '邮箱'} ${row.contact}` : '—',
        ),
    },
    {
      title: '角色',
      key: 'role',
      width: 100,
      render: (row) => h(RoleTag, { role: row.role }),
    },
    {
      title: '状态',
      key: 'status',
      width: 82,
      render: (row) =>
        h(
          'span',
          { class: 'tech-label', style: { color: STATUS_COLOR[row.status] } },
          ACCOUNT_STATUS_LABELS[row.status],
        ),
    },
    {
      title: '订单 / 接单',
      key: 'order_count',
      width: 96,
      render: (row) =>
        h('span', { class: 'tnum text-xs' }, `${row.order_count} / ${row.claimed_count}`),
    },
    {
      title: '注册 / 最后登录',
      key: 'last_login',
      width: 140,
      render: (row) =>
        h('div', { class: 'tnum text-2xs opacity-70' }, [
          h('div', {}, shortTime(row.create_time)),
          h('div', {}, shortTime(row.last_login)),
        ]),
    },
  ]

  if (advanced.value && withPassword.value) {
    base.push({
      title: '明文密码',
      key: 'password',
      width: 130,
      render: (row) =>
        h(
          'span',
          { class: 'tnum text-xs', style: { color: 'var(--warn)' } },
          row.password ?? '—',
        ),
    })
  }

  if (advanced.value) {
    base.push({
      title: '操作',
      key: 'actions',
      width: 158,
      render: (row) => {
        // 三个高频动作做成快捷图标，其余收进「更多」。
        // 已注销的行上三个图标全灰：后端对注销账号一律拒绝，
        // 何况那行连资料都不该改（昵称/学号已经让给别人了），只能恢复。
        const closed = row.status === 'closed'
        const why = '已注销账号，先恢复再操作'
        return h('div', { class: 'flex items-center gap-0.5' }, [
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              disabled: closed,
              title: closed ? why : '修改资料',
              onClick: () => openDialog(row, 'profile'),
            },
            { icon: () => h(Pencil, { size: 13 }) },
          ),
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              disabled: closed,
              title: closed ? why : '重置密码',
              onClick: () => openDialog(row, 'password'),
            },
            { icon: () => h(KeyRound, { size: 13 }) },
          ),
          h(
            NButton,
            {
              size: 'tiny',
              quaternary: true,
              disabled: closed || row.is_self,
              title: row.is_self ? '这一条就是你自己' : closed ? why : '代发工单',
              onClick: () => openDialog(row, 'ticket'),
            },
            { icon: () => h(MessageSquare, { size: 13 }) },
          ),
          h(
            NDropdown,
            {
              options: rowActions(row),
              trigger: 'click',
              placement: 'bottom-end',
              onSelect: (key: string) => void onRowAction(row, key),
            },
            {
              default: () =>
                h(
                  NButton,
                  { size: 'tiny', quaternary: true, title: '更多操作' },
                  { default: () => '更多' },
                ),
            },
          ),
        ])
      },
    })
  }

  return base
})

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader
      title="账号管理"
      subtitle="名单对所有管理员可见；改角色、禁用、注销等操作会写入审计日志"
    >
      <template #actions>
        <span v-if="advanced" class="flex items-center gap-2">
          <NSwitch v-model:value="withPassword" size="small" @update:value="load()" />
          <button
            type="button"
            class="tech-label flex cursor-pointer select-none items-center gap-1 text-ink-3 tech-label--cn text-xs"
            @click="toggleWithPassword"
          >
            <Eye :size="12" />
            显示明文密码
          </button>
        </span>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div class="panel mb-3 flex flex-wrap items-center gap-2 p-2.5">
      <NInput v-model:value="keyword" placeholder="搜索昵称 / 姓名 / 学号 / 宿舍" size="small" class="!w-[260px]">
        <template #prefix><Search :size="14" /></template>
      </NInput>
      <NSelect
        v-model:value="roleFilter"
        :options="roleOptions"
        size="small"
        class="!w-[128px]"
        :consistent-menu-width="false"
        aria-label="角色筛选"
      />
      <span v-if="advanced" class="flex items-center gap-2">
        <NSwitch v-model:value="includeClosed" size="small" @update:value="load()" />
        <span
          class="tech-label cursor-pointer select-none text-ink-3 tech-label--cn text-xs"
          @click="toggleIncludeClosed"
        >
          含已注销
        </span>
      </span>
      <!-- 隐藏了几个要说出来，否则「名单里明明有这个人」和「列表里找不到」
           会变成一场谁也说不清的争执。
           开关打开时不能再报这条：那些账号此刻就在列表里，
           再说一句「未列出」等于自己打自己（浏览器里看到过这条自相矛盾的文案）。 -->
      <span class="tech-label ml-auto text-ink-4 tech-label--cn text-xs">
        显示 {{ filtered.length }} / {{ users.length }} 个账号<span
          v-if="closedTotal && !includeClosed"
        >
          · 另有 {{ closedTotal }} 个已注销未列出</span
        >
      </span>
    </div>

    <p
      v-if="withPassword"
      class="mb-3 rounded-lg border px-3 py-2 text-xs"
      style="
        border-color: var(--warn-tint-border);
        background-color: var(--warn-tint);
        color: var(--warn);
      "
    >
      正在显示全部账号的明文密码。此操作已被记录到安全日志，请勿截图或外传。
    </p>

    <div class="panel overflow-hidden">
      <div v-if="loading && !users.length" class="flex flex-col gap-2 p-3">
        <NSkeleton v-for="index in 6" :key="index" height="48px" :sharp="false" />
      </div>
      <div v-else-if="!filtered.length" class="grid place-items-center py-14">
        <NEmpty description="没有匹配的账号" />
      </div>
      <NDataTable
        v-else
        :columns="columns"
        :data="filtered"
        :bordered="false"
        :single-line="false"
        size="small"
        :scroll-x="advanced ? 1400 : 1180"
        :row-key="(row: AdminUser) => row.id"
      />
    </div>

    <!-- 三个动作共用这一层壳：标题、目标账号、页脚按钮都一样，只有中间的表单不同。 -->
    <NModal
      v-model:show="dialog.show"
      preset="card"
      class="max-w-[520px]"
      :title="DIALOG_TITLES[dialog.kind]"
      :bordered="false"
      :mask-closable="false"
    >
      <template v-if="dialog.target">
        <p class="mb-3 text-sm leading-6 text-ink-3">
          目标账号
          <span class="font-heading font-bold text-ink">{{ dialog.target.nickname }}</span>
          <span class="ml-1 font-mono">#{{ dialog.target.id }}</span>
        </p>

        <template v-if="dialog.kind === 'profile'">
          <div class="flex flex-col gap-3">
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn text-xs">昵称</span>
              <NInput
                v-model:value="profileForm.nickname"
                :maxlength="20"
                placeholder="2-20 位中文、字母、数字或下划线"
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn text-xs">姓名</span>
              <NInput
                v-model:value="profileForm.real_name"
                :maxlength="20"
                placeholder="2-20 位中文或字母"
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn text-xs">学号（登录名）</span>
              <NInput v-model:value="profileForm.student_id" :maxlength="20" placeholder="4-20 位数字" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn text-xs">宿舍</span>
              <NInput v-model:value="profileForm.dorm" :maxlength="50" placeholder="请写到门牌号" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="tech-label text-ink-3 tech-label--cn text-xs">联系方式</span>
              <div class="flex gap-2">
                <NSelect
                  v-model:value="profileForm.contact_type"
                  :options="contactOptions"
                  class="!w-[120px]"
                  :consistent-menu-width="false"
                />
                <NInput
                  v-model:value="profileForm.contact"
                  :placeholder="CONTACT_PLACEHOLDER[profileForm.contact_type]"
                />
              </div>
            </label>
          </div>
          <p class="mt-3 text-xs leading-5 text-ink-4">
            学号是登录名，改完本人必须用新学号登录。这里不核对学生名单 ——
            名单是注册的闸门，而改资料是人工介入，名单本身就可能落后于现实。
          </p>
        </template>

        <template v-else-if="dialog.kind === 'password'">
          <NAlert type="warning" :bordered="false" class="mb-3">
            新密码立即生效，请当面或通过可靠方式转告本人。此操作会记入审计日志，
            但日志里不会出现密码本身。
          </NAlert>
          <NInput
            v-model:value="newPassword"
            type="password"
            show-password-on="click"
            :maxlength="64"
            placeholder="8-64 位，同时包含字母和数字"
            autocomplete="new-password"
          />
        </template>

        <template v-else>
          <NAlert type="info" :bordered="false" class="mb-3">
            工单归属这个学生，第一条消息以他的名义发出 ——
            学生端打开会话看到的就是自己提的问题，接着回复即可。
          </NAlert>
          <div class="flex flex-col gap-3">
            <NInput
              v-model:value="ticketForm.subject"
              :maxlength="SUBJECT_MAX"
              show-count
              placeholder="一句话说明问题"
            />
            <NInput
              v-model:value="ticketForm.body"
              type="textarea"
              :rows="4"
              :maxlength="BODY_MAX"
              show-count
              placeholder="把情况写清楚：订单号、文件名、时间……"
            />
          </div>
        </template>

        <p v-if="dialogIssue" class="mt-2 text-xs" style="color: var(--err)">
          {{ dialogIssue }}
        </p>
      </template>

      <template #footer>
        <div class="flex justify-end gap-2">
          <NButton quaternary @click="dialog.show = false">取消</NButton>
          <NButton type="primary" :disabled="!canConfirm" :loading="submitting" @click="confirmDialog">
            {{ DIALOG_TITLES[dialog.kind] }}
          </NButton>
        </div>
      </template>
    </NModal>

    <!-- 恢复撞名时的说明窗。系统不自动改名：让谁改，只能由人来定 -->
    <NModal
      v-model:show="conflicts.show"
      preset="card"
      class="max-w-[520px]"
      title="无法恢复：昵称或学号已被占用"
      :bordered="false"
    >
      <NAlert v-if="conflicts.target" type="warning" :bordered="false" class="mb-3">
        「{{ conflicts.target.nickname }}」注销时把昵称和学号让了出去，现在被下面这些账号占着。
        请先和对方确认怎么处理（改名，或者就这样算了），系统不会替任何人改名。
      </NAlert>
      <ul class="flex flex-col gap-2">
        <li
          v-for="item in conflicts.items"
          :key="`${item.label}:${item.value}`"
          class="flex flex-wrap items-center gap-x-2 rounded-[10px] border px-3 py-2 text-sm"
          style="border-color: var(--border)"
        >
          <span class="tech-label text-ink-4 tech-label--cn text-xs">{{ item.label }}</span>
          <span class="font-mono">{{ item.value }}</span>
          <span class="text-ink-4">已被</span>
          <span class="font-semibold">{{ item.owner_nickname }}</span>
          <span class="font-mono text-xs text-ink-4">#{{ item.owner_id }}</span>
          <NButton size="tiny" quaternary class="!ml-auto" @click="locateOwner(item.owner_nickname)">
            在列表里找它
          </NButton>
        </li>
      </ul>
      <template #footer>
        <div class="flex justify-end">
          <NButton quaternary @click="conflicts.show = false">知道了</NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>
