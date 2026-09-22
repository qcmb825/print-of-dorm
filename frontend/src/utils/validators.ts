/** 注册/登录字段校验。
 *
 *  **这些规则是后端的镜像，不是安全边界** —— 权威校验在 utils.validate_registration()。
 *  前端这层只是为了少一次往返、给用户即时反馈；两边不一致时以后端为准，改后端记得同步这里。
 */
import type { ContactType, OtherContactType } from '@/api/types'

export const NICKNAME_RE = /^[0-9A-Za-z_\u4e00-\u9fa5]{2,20}$/
export const REALNAME_RE = /^[\u4e00-\u9fa5A-Za-z·]{2,20}$/
export const STUDENT_ID_RE = /^\d{4,20}$/
export const WECHAT_RE = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/
export const QQ_RE = /^[1-9]\d{4,11}$/
export const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

/** 联系方式的长度上限，镜像后端那两处 `len(contact) > 50`。 */
export const CONTACT_MAX = 50

export const CONTACT_PLACEHOLDER: Record<ContactType, string> = {
  wechat: '5-20 位 · 字母开头 · 可含数字 _ -',
  qq: '5-12 位数字 · 不以 0 开头',
  email: '例 name@example.com',
}

export function validateContact(type: ContactType, value: string): boolean {
  if (type === 'wechat') return WECHAT_RE.test(value)
  if (type === 'qq') return QQ_RE.test(value)
  return EMAIL_RE.test(value)
}

export const CONTACT_HINT: Record<ContactType, string> = {
  wechat: '微信号 5-20 位 · 字母开头 · 可含数字 _ -',
  qq: 'QQ 号 5-12 位数字 · 不以 0 开头',
  email: '邮箱格式无效 · 例 name@example.com',
}

/* ---- QQ 号（必填）与其他联系方式（整组选填） ----
 *
 *  这一层的分工和后端 utils.validate_qq / validate_other_contact 完全一致：
 *  QQ 是**必填**的那一栏（取件提醒要发到 `<QQ号>@qq.com`），
 *  wechat/email 是选填的补充线索，整组留空合法、填一半不行。
 *
 *  审核申请弹窗仍然用上面那套三选一（CONTACT_HINT / validateContact）：
 *  申请人还没有账号，他完全可能只有微信号，硬套「QQ 必填」等于先把他挡在门外。
 *  所以两套规则都要留着，别图省事合并 —— 合并之后必然有一边是错的。
 */

/** QQ 号校验，返回错误信息；合规时返回 null。 */
export function qqIssue(value: string): string | null {
  const v = value.trim()
  if (!v) return 'QQ 号为必填 · 用于取件提醒'
  if (!QQ_RE.test(v)) return CONTACT_HINT.qq
  return null
}

export const OTHER_CONTACT_TYPES: OtherContactType[] = ['wechat', 'email']

export const OTHER_CONTACT_PLACEHOLDER: Record<OtherContactType, string> = {
  wechat: CONTACT_PLACEHOLDER.wechat,
  email: CONTACT_PLACEHOLDER.email,
}

export const OTHER_CONTACT_HINT: Record<OtherContactType, string> = {
  wechat: CONTACT_HINT.wechat,
  email: CONTACT_HINT.email,
}

/** 报错文案里用的类型名。单独一份、不从 CONTACT_LABELS 取：
 *  CONTACT_LABELS 要显示「QQ 号」，而这一栏根本不含 QQ —— 从它取的话，
 *  哪天有人给 CONTACT_LABELS 加一项，这里的文案会跟着多出一个不该有的说法，
 *  而且不报错（Record 的键是联合类型，只有类型检查能提醒）。 */
const OTHER_CONTACT_LABEL_TEXT: Record<OtherContactType, string> = {
  wechat: '微信号',
  email: '邮箱地址',
}

/** 校验「其他联系方式」（微信 / 邮箱），返回错误信息；合规时返回 null。
 *
 *  整组留空是合法的（type 与 value 都为空）—— 返回 null 而不是报「请填写」。
 *  这是这一栏的定位决定的：保证学生能收到提醒的是上面那个必填的 QQ 号，
 *  微信和邮箱只是备用线索。但它和 qqIssue 不一样，**没有底线的必填**，
 *  所以别把它俩写成同一个函数。 */
export function otherContactIssue(
  type: OtherContactType | null | undefined,
  value: string,
): string | null {
  const v = value.trim()
  const t = type ?? null
  if (t === null && !v) return null
  if (t === null) return '选择类型（微信 / 邮箱）· 或整组留空'
  if (!v) return `填写${OTHER_CONTACT_LABEL_TEXT[t]} · 或整组留空`
  if (v.length > CONTACT_MAX) return `联系方式上限 ${CONTACT_MAX} 字`
  if (t === 'wechat' && !WECHAT_RE.test(v)) return OTHER_CONTACT_HINT.wechat
  if (t === 'email' && !EMAIL_RE.test(v)) return OTHER_CONTACT_HINT.email
  return null
}

export function passwordIssue(password: string): string | null {
  if (password.length < 8 || password.length > 64) return '密码 8-64 位'
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return '需同时含字母与数字'
  return null
}

/* ---- 下单打印选项 ---- */

/** 份数范围，与后端 config.COPIES_MIN / COPIES_MAX / COPIES_DEFAULT 对齐。
 *
 *  这三条**必须和后端一致**，而且前端这层不是边界：学生把 input 的 min/max 改掉
 *  照样能提交，真正拦住的是 utils.parse_copies（那里先挡 bool、再限定范围）。
 *  但范围写小了会很难看 —— 后端收 50 份、前端只让填 10 份，
 *  学生只会以为「这系统不支持我要的量」。 */
export const COPIES_MIN = 1
export const COPIES_MAX = 50
export const COPIES_DEFAULT = 1

/** 预设正文长度上限，镜像 config.PRESET_CONTENT_MAX。管理端输入框用它做 maxlength。 */
export const PRESET_CONTENT_MAX = 300
/** 纸张名 / 备注长度上限，镜像 config.PAPER_NAME_MAX / PAPER_REMARK_MAX。 */
export const PAPER_NAME_MAX = 20
export const PAPER_REMARK_MAX = 120
