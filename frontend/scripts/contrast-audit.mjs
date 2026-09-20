#!/usr/bin/env node
/**
 * 对比度断言 —— 把 tokens.css 里的真实令牌按 WCAG 2.x 算一遍。
 *
 * 为什么需要它：这个项目没有自动化测试，`npm run build` 只跑 `vue-tsc --noEmit`，
 * 而外观分散在 30 个 .vue 的 102 处内联 style + 161 处 var() 引用 + 137 处 Tailwind
 * 颜色类里，且没有任何 scoped style。改一个色值，靠肉眼是核不完 30 个文件的。
 *
 * 用法（在 frontend/ 下）：
 *   node scripts/contrast-audit.mjs          打印全部结果
 *   node scripts/contrast-audit.mjs --quiet  只打印不达标项与汇总
 * 退出码：0 = 没有未登记的不达标；1 = 出现未登记的不达标（可用于 CI / 提交前钩子）
 *
 * 判定级别：
 *   must  不达标就是错，必须修
 *   known 已知并接受的例外，会打印出来但不影响退出码。
 *         **每条 known 都必须在清单里写明为什么可以接受** ——
 *         否则它只是把问题藏起来。
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const TOKENS_PATH = fileURLToPath(new URL('../src/styles/tokens.css', import.meta.url))
const QUIET = process.argv.includes('--quiet')

/* ------------------------------------------------------------------ *
 * 一、从 tokens.css 里读令牌
 * ------------------------------------------------------------------ */

/** 剥掉 CSS 块注释。令牌值里不会出现注释，整体剥掉是安全的。 */
function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '')
}

/** 从 header 之后找到配对的右花括号，返回块内文本。 */
function readBlock(css, header) {
  const start = css.indexOf(header)
  if (start < 0) throw new Error(`在 tokens.css 里找不到块：${header}`)
  const open = css.indexOf('{', start)
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}') {
      depth--
      if (depth === 0) return css.slice(open + 1, i)
    }
  }
  throw new Error(`块没有配对的右花括号：${header}`)
}

function parseDeclarations(blockText) {
  const out = new Map()
  const re = /--([\w-]+)\s*:\s*([^;]+);/g
  let m
  while ((m = re.exec(blockText)) !== null) {
    out.set(m[1], m[2].trim().replace(/\s+/g, ' '))
  }
  return out
}

/* ------------------------------------------------------------------ *
 * 二、颜色解析与合成
 * ------------------------------------------------------------------ */

const clamp = (v) => Math.max(0, Math.min(255, v))

/** 支持 #rgb / #rgba / #rrggbb / #rrggbbaa。 */
function parseHex(raw) {
  let h = raw.slice(1)
  if (h.length === 3 || h.length === 4) h = h.split('').map((c) => c + c).join('')
  if (h.length !== 6 && h.length !== 8) return null
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
  if ([r, g, b].some(Number.isNaN)) return null
  const a = h.length === 8 ? parseInt(h.slice(6, 8), 16) / 255 : 1
  return { r, g, b, a }
}

/** 支持 rgb(r g b) / rgb(r g b / a) / rgb(r, g, b)。 */
function parseRgbFn(raw) {
  const m = /^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/.exec(raw)
  if (!m) return null
  let a = 1
  if (m[4] !== undefined) a = m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4])
  return { r: Number(m[1]), g: Number(m[2]), b: Number(m[3]), a }
}

/** 把 fg 盖在 bg 上；bg 必须不透明。 */
function over(fg, bg) {
  const mix = (f, c) => clamp(f * fg.a + c * (1 - fg.a))
  return { r: mix(fg.r, bg.r), g: mix(fg.g, bg.g), b: mix(fg.b, bg.b), a: 1 }
}

/** 相对亮度（WCAG 2.x 定义）。要求输入不透明。 */
function luminance({ r, g, b }) {
  const lin = (v) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

const toCss = (c) =>
  `#${[c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}` +
  (c.a < 1 ? `(a=${c.a.toFixed(2)})` : '')

/* ------------------------------------------------------------------ *
 * 三、令牌解析（var() / color-mix / 跨主题共用）
 * ------------------------------------------------------------------ */

/**
 * @param decls    当前主题的声明
 * @param fallback 另一主题的声明。tokens.css 里有少数令牌（--veil-grid /
 *                 --veil-hairline / --veil-accent-tint）刻意只在浅色块声明一次、
 *                 两主题共用，因为它们脚下永远是暗面板。这里允许回落到另一主题，
 *                 但会把回落过的名字记进 shared，最后提示出来 ——
 *                 「缺失就悄悄用对面的值」正是本项目最怕的那类静默错位。
 */
function makeResolver(decls, fallback, shared) {
  const cache = new Map()

  function resolve(name, seen = new Set()) {
    if (cache.has(name)) return cache.get(name)
    if (seen.has(name)) throw new Error(`令牌自引用：--${name}`)
    seen.add(name)
    let raw = decls.get(name)
    if (raw === undefined && fallback) {
      raw = fallback.get(name)
      if (raw !== undefined) shared.add(name)
    }
    if (raw === undefined) return null
    const val = resolveValue(raw, seen)
    cache.set(name, val)
    return val
  }

  function resolveValue(raw, seen) {
    const trimmed = raw.trim()

    const soleVar = /^var\(\s*--([\w-]+)\s*\)$/.exec(trimmed)
    if (soleVar) return resolve(soleVar[1], seen)

    const mix = /^color-mix\(in srgb,\s*(.+?)\s+([\d.]+)%,\s*(.+)\)$/.exec(trimmed)
    if (mix) {
      const left = resolveValue(mix[1], seen)
      const p = parseFloat(mix[2]) / 100
      const rightRaw = mix[3].trim()
      const right =
        rightRaw === 'transparent' ? { r: 0, g: 0, b: 0, a: 0 } : resolveValue(rightRaw, seen)
      if (!left || !right) return null
      if (right.a === 0) return { r: left.r, g: left.g, b: left.b, a: left.a * p }
      if (left.a === 0) return { r: right.r, g: right.g, b: right.b, a: right.a * (1 - p) }
      const q = 1 - p
      return {
        r: left.r * p + right.r * q,
        g: left.g * p + right.g * q,
        b: left.b * p + right.b * q,
        a: left.a * p + right.a * q,
      }
    }

    if (trimmed.startsWith('#')) return parseHex(trimmed)
    if (trimmed.startsWith('rgb')) return parseRgbFn(trimmed)
    return null
  }

  return resolve
}

/* ------------------------------------------------------------------ *
 * 四、检查清单
 *
 * 背景列可以直接写令牌名，也可以用下面这几个「合成底」记号：
 *   @panel              --card 叠在页底上（面板的实际观感）
 *   @tint               --accent-tint 叠在页底上
 *   @tint-soft          --accent-tint-soft 叠在页底上
 *   @tint-soft-muted    --accent-tint-soft 叠在 --muted 上
 *   @tint-border        --accent-tint-border 叠在页底上
 * 带 alpha 的令牌（如 -bg 系列）会自动先合成到页底。
 * ------------------------------------------------------------------ */

const CHECKS = [
  // —— 正文与文字层次 ——
  ['text-primary', 'background', 4.5, 'must', '正文'],
  ['text-secondary', 'background', 4.5, 'must', '次要正文'],
  ['text-tertiary', 'background', 4.5, 'must', '三级文字（小标签、说明）'],
  ['muted-foreground', 'background', 4.5, 'must', '占位符与次要说明'],
  [
    'text-quaternary',
    'background',
    4.5,
    'known',
    '40% 透明度，实测约 2.6:1。它现在只作纯装饰（空值占位、时间戳底纹）；' +
      '凡是承担信息的用法都已改走 text-tertiary 或 accent-text。' +
      '想往这个桶里继续丢「要读的字」之前，先把它改成一条 must。',
  ],
  ['text-disabled', 'background', 4.5, 'known', '失效控件豁免（WCAG 1.4.3 不要求）。仅用于 disabled 态。'],
  [
    'muted-foreground',
    'muted',
    4.5,
    'known',
    'muted 底上的次要说明，贴着 4.4:1。要在 muted 底上放小字就换 text-tertiary。',
  ],

  // —— 强调色的「线 / 文字」一侧 ——
  ['accent-text', 'background', 4.5, 'must', '强调色当文字（侧栏激活项、指标值、取件码）'],
  [
    'text-primary',
    '@blueprint',
    4.5,
    'must',
    '登录页图纸底图上的正文（兜底）。真正的防线在构图上：图纸的笔画不进内容区' +
      '（BlueprintSheet.vue 顶部算了那块包络），文字脚下本来就没有线。' +
      '这条断言防的是"哪天有人把线画进了包络"—— 它按最不利情况算：' +
      '常规笔画整块压在页底上。三级文字（11px 小标签）在这个最不利底上不达 4.5，' +
      '所以**别把小字挪到图纸的线上**；构图规则破了的话，调透明度也救不回来。',
  ],
  ['accent-text', '@panel', 4.5, 'must', '面板内的强调色文字'],
  ['accent-text', 'muted', 4.5, 'must', 'muted 底上的强调文字'],
  ['accent-text', '@tint', 4.5, 'must', 'accent-tint 底上的强调文字（图标底、spec-chip）'],
  ['accent-text', '@tint-soft', 4.5, 'must', 'accent-tint-soft 底上的强调文字'],
  ['accent-text', '@tint-soft-muted', 4.5, 'must', '同上，叠在 muted 底上'],
  ['accent-text', 'background', 3, 'must', '非文本用途：焦点轮廓、激活色条、图表线（WCAG 1.4.11）'],

  // —— 强调色的「填充」一侧 ——
  [
    'primary-foreground',
    'primary',
    4.5,
    'must',
    '填充与它承载的内容（主按钮、菜单/分页激活块上的文字）。' +
      '荧光黄本身在浅底上只有 1.05:1，**只允许出现在这一条检查里当背景**。',
  ],

  // —— 次级强调色 ——
  [
    'secondary',
    'background',
    4.5,
    'known',
    '浅色下 3.64:1：够图形（3:1）不够正文（4.5:1）。当前用法都是图标、状态点、图表序列。',
  ],
  ['secondary', 'background', 3, 'must', '次级强调色当图形（图标、图表线）'],

  // —— 状态与角色标签（前景压在各自的 -bg 上）——
  ['status-pending', 'status-pending-bg', 4.5, 'must', '「待打印」标签'],
  ['status-printing', 'status-printing-bg', 4.5, 'must', '「打印中」标签'],
  ['status-ready', 'status-ready-bg', 4.5, 'must', '「可取了」标签'],
  ['status-done', 'status-done-bg', 4.5, 'must', '「已取件」标签'],
  ['status-done', 'background', 4.5, 'must', '认证回执条上的 AUTH OK（压在页底上）'],
  ['status-unpriced', 'status-unpriced-bg', 4.5, 'must', '「待计费」标签'],
  ['role-user', 'role-user-bg', 4.5, 'must', '普通用户徽章'],
  ['role-admin', 'role-admin-bg', 4.5, 'must', '管理员徽章'],

  // —— 反馈色 ——
  ['err', 'err-bg', 4.5, 'must', '错误（驳回标签、失败提示）'],
  ['warn', 'background', 4.5, 'must', '警告文字'],
  ['warn', 'muted', 4.5, 'must', '警告文字压在下沉面上'],
  ['ok', 'background', 4.5, 'must', '成功文字'],
  ['info', 'background', 4.5, 'must', '信息文字'],

  // —— 公告纸面 ——
  ['paper-ink', 'paper', 4.5, 'must', '公告兜底墨色'],
  ['paper-muted', 'paper', 4.5, 'must', '公告发布人行'],
  ['paper-accent', 'paper', 3, 'must', '公告条上的小图标（图形，3:1）'],

  // —— 换场覆盖层（脚下永远是暗面板，所以按暗底检查）——
  ['veil-ink-code', 'veil-mat', 4.5, 'must', '中心读数里的英文引导行与页名代号'],
  ['primary', 'veil-mat', 4.5, 'must', '中心读数的页名与三角阵列（这里刻意用 primary 而非 accent-text）'],
  [
    'veil-accent-tint',
    'veil-mat',
    1.2,
    'known',
    '面板前缘扫描边的光晕，纯装饰、不承载信息，只要求「看得见」。',
  ],

  // —— 非文本分隔 ——
  [
    'border',
    'background',
    3,
    'known',
    '分隔线与面板描边，浅色下约 1.23:1。它按设计就是极淡的分隔，' +
      '而且从不作为「唯一的语义边界」：状态一律另配颜色 + 文字。',
  ],
  [
    'accent-tint-border',
    'background',
    3,
    'known',
    '淡黄描边（spec-chip 边框、拖拽区描边）。刻意保持低对比，只作「有这块东西」的暗示；' +
      '承载信息的一侧由 accent-text 那条 must 兜底。',
  ],
]

/* ------------------------------------------------------------------ *
 * 五、跑检查
 * ------------------------------------------------------------------ */

/* 行尾先归一化成 LF：仓库里有 .gitattributes，不同机器取出来的可能是 CRLF，
 * 而下面按 `:root,\n.light` 这种带换行的字符串找块，用 CRLF 会一个都找不到。 */
const css = stripComments(readFileSync(TOKENS_PATH, 'utf8')).replace(/\r\n?/g, '\n')
const lightDecls = parseDeclarations(readBlock(css, ':root,\n.light'))
const darkDecls = parseDeclarations(readBlock(css, '\n.dark'))

const sharedAcrossThemes = new Set()
let failures = 0
const rows = []

for (const [themeName, decls, fallback] of [
  ['light', lightDecls, darkDecls],
  ['dark', darkDecls, lightDecls],
]) {
  const resolve = makeResolver(decls, fallback, sharedAcrossThemes)
  const page = resolve('background')

  /** 解析背景；带 alpha 的先合成到页底。 */
  const bgOf = (key) => {
    let c
    if (!key.startsWith('@')) c = resolve(key)
    else if (key === '@panel') c = over(resolve('card'), page)
    else if (key === '@tint') c = over(resolve('accent-tint'), page)
    else if (key === '@tint-soft') c = over(resolve('accent-tint-soft'), page)
    else if (key === '@tint-soft-muted') c = over(resolve('accent-tint-soft'), resolve('muted'))
    else if (key === '@tint-border') c = over(resolve('accent-tint-border'), page)
    /** 登录页的图纸底图：最不利的一档是常规笔画（--blueprint-ink）压在页底上。
     *  注意这只是**兜底**：那张图的构图规则是笔画不进内容区（见 BlueprintSheet.vue），
     *  正常情况下文字脚下根本没有图纸的线。 */
    else if (key === '@blueprint') c = over(resolve('blueprint-ink'), page)
    else throw new Error(`未知的背景记号：${key}`)
    if (!c) return null
    return c.a < 1 ? over(c, page) : c
  }

  for (const [fgName, bgName, threshold, level, note] of CHECKS) {
    let fg = resolve(fgName)
    const bg = bgOf(bgName)
    if (!fg || !bg) {
      rows.push({ themeName, fgName, bgName, threshold, level, note, unresolved: true })
      continue
    }
    if (fg.a < 1) fg = over(fg, bg)
    const ratio = contrast(fg, bg)
    const ok = ratio >= threshold
    if (!ok && level === 'must') failures++
    rows.push({ themeName, fgName, bgName, ratio, threshold, level, note, ok, bgCss: toCss(bg) })
  }
}

const pad = (s, n) => String(s).padEnd(n)
const fmt = (r) => (Number.isNaN(r) || r === undefined ? '   n/a' : r.toFixed(2).padStart(6))

console.log('\n对比度断言 —— tokens.css')
console.log(`令牌文件：${TOKENS_PATH}\n`)
console.log(
  `${pad('主题', 6)} ${pad('前景', 20)} ${pad('背景', 20)} ${pad('实测', 7)} ${pad('门槛', 5)} 判定`,
)
console.log('-'.repeat(86))

for (const r of rows) {
  if (QUIET && r.ok !== false) continue
  const verdict = r.unresolved
    ? '无法解析'
    : r.ok
      ? 'ok'
      : r.level === 'must'
        ? '**不达标**'
        : '已知例外'
  console.log(
    `${pad(r.themeName, 6)} ${pad(r.fgName, 20)} ${pad(r.bgName, 20)} ${fmt(r.ratio)} ${pad(
      r.threshold.toFixed(1),
      5,
    )} ${verdict}`,
  )
}

if (!QUIET) {
  const known = rows.filter((r) => r.ok === false && r.level === 'known')
  if (known.length) {
    console.log('\n—— 已登记的例外（不阻断，但每一条都要有人负责）——')
    for (const r of known) {
      console.log(`\n  [${r.themeName}] ${r.fgName} / ${r.bgName}  实测 ${r.ratio.toFixed(2)}:1`)
      console.log(`  ${r.note}`)
    }
  }
}

const mustRows = rows.filter((r) => r.level === 'must')
const knownGroups = rows.filter((r) => r.level === 'known' && r.ok === false).length
console.log(
  `\n汇总：must ${mustRows.length} 条，通过 ${mustRows.filter((r) => r.ok).length} 条；` +
    `已登记例外 ${knownGroups} 条（深浅各算一次）。`,
)
if (sharedAcrossThemes.size) {
  console.log(
    `\n跨主题共用（只在浅色块声明、深色回落到它）：${[...sharedAcrossThemes].sort().join(', ')}`,
  )
  console.log('  这几支脚下永远是暗面板，所以刻意不跟随主题 —— 是本文件的既定写法，不是漏写。')
}

if (failures > 0) {
  console.error(`\n出现 ${failures} 条未达标且未登记的检查，需要修。`)
  process.exit(1)
}
console.log('\n全部 must 检查通过。\n')
