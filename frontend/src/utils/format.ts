import type {
  ColorType,
  Duplex,
  OrderLogAction,
  OrderStatus,
  Role,
  TicketStatus,
} from '@/api/types'

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

/** 订单状态 → 令牌色（对应 tokens.css 里的 --status-*）。
 *  新增状态时这里必须一起加：漏了不会报错（后端发的中文本来就是个 string），
 *  只是那个标签会拿不到颜色 —— 静默的、只有肉眼能看出来的那种坏。 */
export const STATUS_COLOR_VAR: Record<OrderStatus, string> = {
  待计费: 'var(--status-unpriced)',
  待打印: 'var(--status-pending)',
  打印中: 'var(--status-printing)',
  可取了: 'var(--status-ready)',
  已取件: 'var(--status-done)',
}

export const STATUS_BG_VAR: Record<OrderStatus, string> = {
  待计费: 'var(--status-unpriced-bg)',
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

/** 订单操作留痕的动作 → 令牌色（时间线上的圆点）。
 *
 *  配色不是装饰：「谁把单撤了、谁释放了别人的单」这类要一眼看见（err / warn），
 *  日常推进（接单、改状态）用信息色和中性别，否则一整屏都在喊叫。
 *
 *  类型写成 Record<OrderLogAction, string> 而不是松散对象：后端一旦新增动作，
 *  TS 会在这里报「少了一项」—— 写成 `string` 键的话，新动作只会拿不到颜色，
 *  而那种错不报异常，只是时间线上那一行光秃秃的。 */
export const LOG_ACTION_COLOR: Record<OrderLogAction, string> = {
  create: 'var(--text-tertiary)',
  claim: 'var(--info)',
  release: 'var(--warn)',
  price: 'var(--primary)',
  reprice: 'var(--warn)',
  status: 'var(--info)',
  withdraw: 'var(--err)',
  download: 'var(--ok)',
}

/** 文件大小。打印店的场景里没人关心它是 12.3 KB 还是 12.4 KB，
 *  所以到 KB / MB 就到头了，不做到字节。null 是「文件已经不在了」。 */
export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

export const TICKET_STATUS_LABEL: Record<TicketStatus, string> = {
  open: '进行中',
  closed: '已关闭',
}

/** 取件码在后端是数字，前端固定 4 位展示（兼容退化成短码的情况）。 */
export function pickupCodeLabel(code: string | null): string {
  if (!code) return '—'
  return /^\d+$/.test(code) ? code.padStart(4, '0') : code
}

/** 金额展示。`null` 和 `undefined` 都是「还没计费」——
 *  不能用 `price || '未计费'` 简写：0 元是合法金额（自己宿舍内部打印不算钱），
 *  那种单会在界面上被显示成「未计费」，学生看不出到底要不要交钱。 */
export function priceLabel(price: number | null | undefined): string {
  if (price === null || price === undefined) return '未计费'
  return `¥${price.toFixed(2)}`
}

/** 金额输入框里的原始文本 → 后端能接受的十进制字符串，或 null（明显不合法）。
 *  校验规则是后端 config.PRICE_RE 的镜像，永远以后端为准；
 *  这里只负责在按提交之前拦住一眼就能看出的错，少跑一趟网络。
 *  注意返回的是**字符串**：金额全程按十进制文本传，不经过 float 转一道 ——
 *  转了就轮到 0.1+0.2 那类误差来接管了。 */
export function normalizePrice(input: string): string | null {
  const text = input.trim().replace(/^¥/, '')
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(text)) return null
  const amount = Number(text)
  if (!(amount > 0)) return null
  return text
}
