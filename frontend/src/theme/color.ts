/** 颜色小工具：把十六进制颜色按比例和另一个颜色混合，用来算 hover / pressed 变体。
 *  不引第三方颜色库，这十几行够用了。支持 #rgb / #rrggbb / #rrggbbaa。
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
