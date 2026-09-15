import type { ColorType, Duplex, OrderStatus, Role, TicketStatus } from '@/api/types'

/** 后端给的时间已经是 datetime(col,'localtime') 的 'YYYY-MM-DD HH:MM:SS'，不用再转换区。 */
export function shortTime(value: string | null | undefined): string {
  if (!value) return '—'
  const match = /^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})/.exec(value)
  if (!match) return value
  const [, , month, day, hour, minute] = match
  return `${month}-${day} ${hour}:${minute}`
}

export function fullTime(value: string | null | undefined): string {
  if (!value) return '—'
  return value.replace('T', ' ').slice(0, 19)
}

export function fileExtension(filename: string): string {
  const index = filename.lastIndexOf('.')
  return index > 0 ? filename.slice(index + 1).toUpperCase() : '文件'
}

/** 订单状态 → 令牌色（对应 tokens.css 里的 --status-*）。 */
export const STATUS_COLOR_VAR: Record<OrderStatus, string> = {
  待打印: 'var(--status-pending)',
  打印中: 'var(--status-printing)',
  可取了: 'var(--status-ready)',
  已取件: 'var(--status-done)',
}

export const STATUS_BG_VAR: Record<OrderStatus, string> = {
  待打印: 'var(--status-pending-bg)',
  打印中: 'var(--status-printing-bg)',
  可取了: 'var(--status-ready-bg)',
  已取件: 'var(--status-done-bg)',
}

export const ROLE_COLOR_VAR: Record<Role, string> = {
  user: 'var(--role-user)',
  admin: 'var(--role-admin)',
  super: 'var(--role-super)',
}

export const ROLE_BG_VAR: Record<Role, string> = {
  user: 'var(--role-user-bg)',
  admin: 'var(--role-admin-bg)',
  super: 'var(--role-super-bg)',
}

export const COLOR_TYPE_LABEL: Record<ColorType, string> = { black: '黑白', color: '彩色' }
export const DUPLEX_LABEL: Record<Duplex, string> = { single: '单面', double: '双面' }

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  open: '进行中',
  closed: '已关闭',
}

/** 取件码在后端是数字，前端固定 4 位展示（兼容退化成短码的情况）。 */
export function pickupCodeLabel(code: string | null): string {
  if (!code) return '—'
  return /^\d+$/.test(code) ? code.padStart(4, '0') : code
}
