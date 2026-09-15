/** 颜色小工具：把十六进制颜色按比例和另一个颜色混合，用来算 hover / pressed 变体；
 *  以及算 WCAG 对比度，用来判断管理员选的公告正文色在给定纸面上读不读得出来。
 *  不引第三方颜色库，这几十行够用了。支持 #rgb / #rrggbb / #rrggbbaa。
 */

type Rgb = [number, number, number]

export function parseHex(hex: string): Rgb | null {
  let h = hex.trim().replace('#', '')
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  if (h.length !== 6 && h.length !== 8) return null
  const n = Number.parseInt(h.slice(0, 6), 16)
  if (Number.isNaN(n)) return null
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function toHex([r, g, b]: Rgb): string {
  const p = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')
  return `#${p(r)}${p(g)}${p(b)}`
}

/** 把 a 向 b 靠拢 ratio（0~1）。ratio 越大越接近 b。 */
export function mix(a: string, b: string, ratio: number): string {
  const ca = parseHex(a)
  const cb = parseHex(b)
  if (!ca || !cb) return a
  return toHex([
    ca[0] + (cb[0] - ca[0]) * ratio,
    ca[1] + (cb[1] - ca[1]) * ratio,
    ca[2] + (cb[2] - ca[2]) * ratio,
  ])
}

/** 主题色派生：浅色主题下 hover 变暗，深色主题下 hover 变亮。 */
export function derive(color: string, isDark: boolean) {
  const toward = isDark ? '#ffffff' : '#000000'
  return {
    base: color,
    hover: mix(color, toward, isDark ? 0.16 : 0.12),
    pressed: mix(color, toward, isDark ? 0.3 : 0.24),
    suppl: mix(color, toward, isDark ? 0.1 : 0.08),
  }
}

/** 相对亮度（WCAG 2.x 的定义），对比度的唯一输入。 */
function relativeLuminance(hex: string): number | null {
  const rgb = parseHex(hex)
  if (!rgb) return null
  const [r, g, b] = rgb.map((value) => {
    const c = value / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** 对比度，1~21。任一侧解析不出来就返回 21（视作"够用"）：
 *  宁可尊重管理员选的颜色，也不要在数据异常时擅自把他选的颜色换掉。 */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a)
  const lb = relativeLuminance(b)
  if (la === null || lb === null) return 21
  const [hi, lo] = la > lb ? [la, lb] : [lb, la]
  return (hi + 0.05) / (lo + 0.05)
}

/** 正文的最低对比度门槛。WCAG 对"大号文字"放宽到 3:1，其余 4.5:1。
 *  公告正文是常规字重，所以大号的界线取 24px；公告字号本来就是管理员在 12–28px 之间调的，
 *  跟着字号松绑才不至于把 28px 的亮黄色也判成读不了。 */
export function minContrastForText(fontSizePx: number): number {
  return fontSizePx >= 24 ? 3 : 4.5
}

/** 这个正文色在给定纸面上是不是读不了、需要回落。 */
export function needsInkFallback(paper: string, ink: string, fontSizePx: number): boolean {
  return contrastRatio(paper, ink) < minContrastForText(fontSizePx)
}

/** 在给定纸面上挑一个读得出来的正文色：够对比就原样用管理员选的，不够才回落。
 *  fallback 传纸面那一套的文字令牌（--paper-ink），它与纸面必然可读。 */
export function readableInk(
  paper: string,
  ink: string,
  fallback: string,
  fontSizePx: number,
): string {
  return needsInkFallback(paper, ink, fontSizePx) ? fallback : ink
}
