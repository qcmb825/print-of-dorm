import { CONTACT_LABELS } from '@/api/types'
import type {
  ColorType,
  ContactType,
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

/** 份数。null **不等于** 1 —— 本次升级前的老订单后端刻意没回填，
 *  因为分不清「当时真的要 1 份」和「我们猜的 1 份」。
 *  写成 `copies ?? 1` 会让一条没有记录的单显示成「1 份」，
 *  而这正是它不该说的那句话（对账时会按 1 份去收钱）。 */
export function copiesLabel(copies: number | null | undefined): string {
  if (copies === null || copies === undefined) return '未记录'
  return `${copies} 份`
}

/** 纸张名。null 是「下单时没选」，不是「没查到」——
 *  不要回落到某个默认纸张名，那等于替学生做了个我们并不知道的选择。 */
export function paperLabel(name: string | null | undefined): string {
  if (!name) return '未指定'
  return name
}

/** 下单人的联系方式，拼成一行：`QQ 号 12345678` / `微信号 zhang*`。
 *
 *  没填时回一个短横而不是空串：空串会让这一行塔掉，管理员看不出到底是
 *  「他没填」还是「模板没渲染出来」，而这两种情况的处理完全不同。
 *
 *  这里同时服务订单台和柜台的取件核对弹窗 —— 两处各写一遍的话，
 *  哪天改成「微信联系」这种说法，只会改到其中一处，
 *  而两屏上看到的不一致没人会发现（都不报错）。 */
export function contactLabel(
  contactType: ContactType | null | undefined,
  contact: string | null | undefined,
): string {
  if (!contact) return '—'
  const kind = contactType ? CONTACT_LABELS[contactType] : ''
  return kind ? `${kind} ${contact}` : contact
}

/** 这一单是不是预设单（用预设打印服务下的、没有文件的那种）。
 *
 *  判据用 preset_content 而不是 preset_id：预设被删掉之后 id 就没意义了，
 *  而内容还在（订单里存的是快照），页面要显示的也正是那句话。
 *  两边前端、以及详情页与列表，都走这一个函数 —— 各自判各自的话，
 *  迟早出现「列表认得这是预设单、详情页认不出来」这种没人能解释的差异。 */
export function isPresetOrder(order: { preset_content?: string | null }): boolean {
  return !!order.preset_content
}

/** 列表里「这一单打印的是什么」的短标签。
 *
 *  预设单没有文件，后台给它的 `filename` 是**空字符串**（见 db.insert_order_row
 *  那段哨兵值的说明）。直接渲染 `row.filename` 的话，那一列是空的、可点区域也没了
 *  —— 而文件名本身就是进详情页的入口，于是整列变成一排点不动的空气，
 *  不报错、类型检查也查不出来。所以统一从这里取。 */
export function orderFileLabel(order: {
  filename?: string | null
  preset_content?: string | null
}): string {
  if (order.filename) return order.filename
  return isPresetOrder(order) ? '预设打印服务' : '（无文件）'
}

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
  /* 取件用「完成」色：它是这一单的终点，跟 download（同样表示「已经交付」）
     归一类。与 status 那个信息色分开是有意的 —— 时间线上要能一眼看出
     「柜台核对过码才交的件」和「管理员随手把状态改成已取件」是两回事。 */
  pickup: 'var(--ok)',
  /* 归类是整理台账的动作，不改变订单本身的进度，所以取中性的三级文字色：
     它出现在时间线上时不该比「计费」「接单」更显眼。 */
  group: 'var(--text-tertiary)',
}

/** 文件大小。打印店的场景里没人关心它是 12.3 KB 还是 12.4 KB，
 *  所以到 KB / MB 就到头了，不做到字节。null 是「文件已经不在了」。
 *
 *  GB 那一档是给配额显示用的（配额已经放宽到 5GB）：只到 MB 的话，
 *  5GB 的额度会写成「5120.0 MB」，设置页上没人能一眼看出还剩多少。
 *  这里刻意**不做成两个函数** —— 同一份字节数在两处显示成不同的写法，
 *  以后调精度就得记着改两处，漏一处的症状只是数字不好看，没人会去查。 */
export function formatBytes(bytes: number | null | undefined): string {
  if (bytes === null || bytes === undefined) return '—'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`
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
 *  转了就轮到 0.1+0.2 那类误差来接管了。
 *
 *  上限对齐后端的 config.PRICE_MAX_YUAN（= 99999.99）：PRICE_RE 本身是 6 位整数
 *  正则，只管位数不管大小，超过上限那一步由 utils.parse_price 里的显式比较挡下。
 *  这里照着做同一件事 —— 只收窄正则会跟后端分叉（例如 "099999" 后端收、前端拒）。 */
export function normalizePrice(input: string): string | null {
  const text = input.trim().replace(/^¥/, '')
  if (!/^\d{1,6}(\.\d{1,2})?$/.test(text)) return null
  const amount = Number(text)
  if (!(amount > 0) || amount > 99999.99) return null
  return text
}
