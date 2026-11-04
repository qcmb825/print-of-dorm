#!/usr/bin/env node
/** 界面锁定亮色的**防回潮检查**。
 *
 *  背景：暗色模式是 2026-09-21 的产品决定要丢弃的（网页一律亮色、不跟系统走、
 *  不提供切换入口）。2026-11 有一次把它当成"待恢复的功能"又加了回来，之后才清理掉。
 *  清理本身不难，难的是**三个月后又有人"顺手"加一个 dark: 变体** —— 那时没有测试会红。
 *
 *  这个脚本就是那道红。它扫源码里的暗色痕迹，命中即以非零码退出。
 *
 *  为什么不用 ESLint：仓库里没有 ESLint（也不想为一个检查引整套工具链），
 *  而且 Tailwind 的 `dark:` 写在 Vue 模板的 class 字符串里，
 *  Stylelint 管不到、ESLint 要配 parser + plugin。和 contrast-audit.mjs 一样
 *  用零依赖的 Node 脚本最省。
 *
 *  ⚠️ **Tailwind v4 的一个坑**：删掉 `@custom-variant dark` 之后，内置的 `dark:`
 *  变体会退回 `prefers-color-scheme` 语义 —— 也就是说删定义**不等于**禁止。
 *  所以这个 grep 型检查不是可选项。
 *
 *  用法：`node scripts/check-theme-lock.mjs`（已接进 `npm run build`）
 */

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SRC = join(ROOT, 'src')
const HTML = join(ROOT, 'index.html')

/** 要扫的扩展名。字体样张 html 不扫（它们有自己的 .light-blue 类名，与主题无关）。 */
const EXT = new Set(['.vue', '.ts', '.css', '.mjs'])

/** 禁止出现的模式。每条都给出**为什么**，命中时一起打出来 ——
 *  报错信息里没有理由的检查，下一个人只会把它注释掉。 */
const RULES = [
  {
    // Tailwind 的暗色变体。写成 \bdark: 是为了不误伤 "dark:" 之外的词。
    re: /(?<![\w-])dark:/,
    why: 'Tailwind 暗色变体。锁定亮色后它不该存在；Tailwind v4 会把它退回 prefers-color-scheme。',
  },
  {
    // CSS 里的 .dark 选择器 / className 里的 .dark
    re: /\.dark\b/,
    why: '暗色选择器或类名。tokens.css 里已经没有 .dark 块，任何匹配都意味着有人又建了一套。',
  },
  {
    re: /\bdarkTheme\b/,
    why: 'Naive UI 的内置暗色主题对象。buildOverrides 已只输出亮色，接上它会出现两套配色。',
  },
  {
    re: /\bisDark\b/,
    why: '主题判断变量。锁定亮色后它恒为 false，留一个只会让后来的人以为还能切。',
  },
  {
    re: /prefers-color-scheme\s*:\s*dark/,
    why: '系统暗色媒体查询。本站在任何系统设置下都应该是亮的。',
  },
  {
    re: /pod-theme/,
    why: '主题偏好的 localStorage 键。已删除；再出现意味着有人恢复了主题持久化。',
  },
  {
    re: /classList[\s\S]{0,40}\bdark\b/,
    why: '往 <html> 上挂 dark 类。这是主题开关的唯一落点，必须为空。',
  },
]

/** 文件级豁免：注释里出现这些词是允许的（说明"不要再加回来"）。
 *
 *  豁免是**按行**判断的：只有整行都是注释、或行内注释里出现关键词时跳过。
 *  这一条很重要 —— 本文件自己、stores/theme.ts 的说明注释、DESIGN 文档都会
 *  提到 `isDark` / `.dark`，不豁免的话检查会自己咬自己。 */
function stripComments(source) {
  // 块注释、行注释（//）、HTML 注释。保留字符串字面量 —— 那正是要抓的地方。
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/[^\n]*/g, (m, p1) => p1 + ' '.repeat(m.length - p1.length))
    .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '))
}

/** 递归收集要扫的文件。跳过 node_modules 与构建产物（产物由 build 自己重新生成）。 */
function collect(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === 'static') continue
    const full = join(dir, name)
    const st = statSync(full)
    if (st.isDirectory()) collect(full, out)
    else if (EXT.has(name.slice(name.lastIndexOf('.')))) out.push(full)
  }
  return out
}

const failures = []

function scan(file) {
  const raw = readFileSync(file, 'utf8')
  const clean = stripComments(raw)
  const rawLines = raw.split('\n')
  const cleanLines = clean.split('\n')

  cleanLines.forEach((line, i) => {
    for (const rule of RULES) {
      if (!rule.re.test(line)) continue
      // 二次确认：原始行里这段如果落在注释内，说明只是说明文字，放行。
      const rawLine = rawLines[i] ?? ''
      const hit = rule.re.exec(line)
      if (!hit) continue
      // 若在原始行里，命中位置之前已经出现 `//` 且其后没有字符串结束，
      // 视为行内注释 —— 这种情况 stripComments 应已抹掉，兜底一次。
      const commentAt = rawLine.indexOf('//')
      if (commentAt >= 0 && commentAt < hit.index) continue
      failures.push({
        file: relative(ROOT, file).replace(/\\/g, '/'),
        line: i + 1,
        text: rawLine.trim().slice(0, 120),
        why: rule.why,
      })
    }
  })
}

for (const file of collect(SRC)) scan(file)
scan(HTML)

if (failures.length) {
  console.error('\n✗ 检测到暗色模式残留 —— 界面锁定亮色是 2026-09-21 的产品决定。\n')
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}`)
    console.error(`    ${f.text}`)
    console.error(`    为什么不行：${f.why}\n`)
  }
  console.error(`共 ${failures.length} 处。理由见 frontend/src/stores/theme.ts 顶部注释。\n`)
  process.exit(1)
}

console.log('✓ 亮色锁定检查通过：源码里没有暗色模式痕迹。')
