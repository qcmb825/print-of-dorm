/** 注册/登录字段校验。
 *
 *  **这些规则是后端的镜像，不是安全边界** —— 权威校验在 utils.validate_registration()。
 *  前端这层只是为了少一次往返、给用户即时反馈；两边不一致时以后端为准，改后端记得同步这里。
 */
import type { ContactType } from '@/api/types'

export const NICKNAME_RE = /^[0-9A-Za-z_\u4e00-\u9fa5]{2,20}$/
export const REALNAME_RE = /^[\u4e00-\u9fa5A-Za-z·]{2,20}$/
export const STUDENT_ID_RE = /^\d{4,20}$/
export const WECHAT_RE = /^[A-Za-z][A-Za-z0-9_-]{4,19}$/
export const QQ_RE = /^[1-9]\d{4,11}$/
export const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

export const CONTACT_PLACEHOLDER: Record<ContactType, string> = {
  wechat: '5-20 位，字母开头，可含数字、_ 和 -',
  qq: '5-12 位数字，不能以 0 开头',
  email: '例：name@example.com',
}

export function validateContact(type: ContactType, value: string): boolean {
  if (type === 'wechat') return WECHAT_RE.test(value)
  if (type === 'qq') return QQ_RE.test(value)
  return EMAIL_RE.test(value)
}

export const CONTACT_HINT: Record<ContactType, string> = {
  wechat: '微信号需为 5-20 位、以字母开头（可含字母、数字、_ 和 -）',
  qq: 'QQ 号需为 5-12 位数字，且不能以 0 开头',
  email: '邮箱格式不正确，例：name@example.com',
}

export function passwordIssue(password: string): string | null {
  if (password.length < 8 || password.length > 64) return '密码长度需为 8-64 位'
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return '密码需同时包含字母和数字'
  return null
}
