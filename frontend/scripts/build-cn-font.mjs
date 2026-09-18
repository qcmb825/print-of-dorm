#!/usr/bin/env node
/**
 * 把思源黑体切成 unicode-range 分片，产物入库。
 *
 * 为什么需要这个脚本
 * ─────────────────
 * 项目要在界面里真正用上中文字体（`tokens.css` 的 --stack-body / --stack-heading 里列了
 * 思源黑体），但中文字体整包太大：@fontsource 的 Noto Sans SC 是 101 个 woff2、合计 4.3MB，
 * 而且它只有 index.css / wght.css 两个入口，**没法按片 import** —— 引进来就是全量。
 *
 * 所以走「开发机切片 + 产物入库」这条路：本脚本在有 Node 的开发机上跑一次，把切好的分片提交进
 * 仓库；部署机不装 Node 也能直接用（项目本来就是这么约束的，见 README 的部署一节）。
 *
 * 字体源
 * ─────
 * 用 `@reogrid/font-sc` 的 NotoSansSC-Regular.ttf / Bold.ttf（各 2.3MB）。选它是因为它的
 * cmap 精确覆盖 6763 个 CJK 统一汉字 —— 正是我们要的「常用字集」，不用自己维护字表。
 * 包内自带 OFL.txt，授权清楚。
 *
 * 已知怪癖（别被吓到）
 * ──────────────────
 * `cn-font-split` 的原生库在**输出写完之后**的清理阶段会段错误，进程退出码 139。产物是完整的
 * （分片数与 result.css 都齐），所以本脚本**不把退出码当作失败依据**，改为校验产物本身。
 *
 * 用法（在 frontend/ 下）
 * ──────────────────────
 *   npm run fonts:build
 *
 * 产物
 * ────
 *   src/assets/fonts/<weight>/<hash>.woff2   ← 分片，由 Vite 加 hash 后进 static/app/assets
 *   src/assets/fonts/<weight>/<weight>.css   ← 该字重的 @font-face（已去掉 local()）
 *   src/assets/fonts/index.css               ← 两个字重的汇总入口，由 main.ts 导入
 */

import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const FRONTEND = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
/** 分片大小上限（字节）。切片是按码位连续区间切的，而一个页面用到的汉字散布在这些区间里，
 *  所以「总分片体积」才是每页的真实成本 —— 分片越少，文件头开销越小。实测各档的合计体积：
 *  600k→1444KB(10 片) / 1200k→1416KB(6 片) / 2400k→1392KB(4 片) / 4800k→1388KB(2 片)。
 *  再往上只能省 4%，但单片会涨到 650KB —— 取 600k 兼顾请求数与单片体积。 */
const CHUNK_SIZE = 600000
const FAMILY = 'Noto Sans SC'
const FONT_SRC = path.join(FRONTEND, 'node_modules', '@reogrid', 'font-sc')
const OUT_ROOT = path.join(FRONTEND, 'src', 'assets', 'fonts')
const CLI = path.join(FRONTEND, 'node_modules', 'cn-font-split', 'dist', 'cli.js')

const WEIGHTS = [
  { dir: 'regular', weight: '400', file: 'NotoSansSC-Regular.ttf', label: 'Regular' },
  { dir: 'bold', weight: '700', file: 'NotoSansSC-Bold.ttf', label: 'Bold' },
]

/** Git Bash / Node 在 Windows 上都能吃正斜杠，而 cn-font-split 的内部拼路径只保证对正斜杠正确。 */
const posix = (p) => p.split(path.sep).join('/')

function slice({ dir, weight, file, label }) {
  const input = path.join(FONT_SRC, file)
  if (!existsSync(input)) {
    throw new Error(
      `找不到字体源：${input}\n` +
        `先装开发依赖：npm install --save-dev @reogrid/font-sc cn-font-split`,
    )
  }
  const outDir = path.join(OUT_ROOT, dir)
  // 先清空：改 chunkSize 或字集后分片名会变，不清会留下上一版的孤儿文件一起入库。
  rmSync(outDir, { recursive: true, force: true })
  mkdirSync(outDir, { recursive: true })

  let exitCode = 0
  try {
    execFileSync(
      process.execPath,
      [
        CLI, 'run',
        '-i', posix(input),
        '-o', posix(outDir),
        '--css.fontFamily', FAMILY,
        '--css.fontWeight', weight,
        '--css.fontDisplay', 'swap',
        // false：让它按码位切连续区间。true 会按语言区域额外拆一层，实测分片更多、合计更大。
        '--languageAreas', 'false',
        '-c', String(CHUNK_SIZE),
      ],
      { stdio: 'pipe' },
    )
  } catch (err) {
    exitCode = err.status ?? -1
  }

  // 退出码不作数（原生库清理阶段段错误，见文件头），校验产物本身。
  const woff2 = readdirSync(outDir).filter((f) => f.endsWith('.woff2'))
  const cssName = readdirSync(outDir).find((f) => f.endsWith('.css'))
  if (woff2.length === 0 || !cssName) {
    throw new Error(
      `${label} 切片失败：退出码 ${exitCode}，产物不完整（woff2 ${woff2.length} 个，css ${cssName ?? '无'}）`,
    )
  }

  // 去掉 src 里的 local("Noto Sans SC")。留着的话，本机装过 Noto Sans SC 的浏览器会直接用系统那份，
  // 版本与我们切的这份未必一致 —— 验收截图会因此不可复现，线上也会因机器而异。
  const cssPath = path.join(outDir, cssName)
  const cleaned = readFileSync(cssPath, 'utf8').replace(/local\([^)]*\),\s*/g, '')
  const finalName = `${dir}.css`
  writeFileSync(path.join(outDir, finalName), cleaned)
  if (cssName !== finalName) rmSync(cssPath)

  const bytes = woff2.reduce((s, f) => s + statSync(path.join(outDir, f)).size, 0)
  console.log(
    `  ${label.padEnd(8)} ${String(woff2.length).padStart(3)} 片  ` +
      `${String(Math.round(bytes / 1024)).padStart(5)} KB  ` +
      `最大单片 ${Math.round(Math.max(...woff2.map((f) => statSync(path.join(outDir, f)).size)) / 1024)} KB` +
      (exitCode === 139 ? '  （退出码 139：原生库清理阶段段错误，产物完整）' : ''),
  )
  return { dir, files: woff2.length, bytes }
}

console.log(`切片：${FAMILY}  →  ${posix(path.relative(FRONTEND, OUT_ROOT))}`)
const results = WEIGHTS.map(slice)

// 汇总入口。@import 必须写在文件最前面，而 tokens.css 顶部已经被 tailwind 的 @import 占了，
// 所以这份 CSS 由 main.ts 单独导入，不挂到 tokens.css 上。
writeFileSync(
  path.join(OUT_ROOT, 'index.css'),
  `/* 由 scripts/build-cn-font.mjs 生成，不要手改。重新生成：npm run fonts:build */\n` +
    WEIGHTS.map((w) => `@import './${w.dir}/${w.dir}.css';`).join('\n') +
    '\n',
)

const total = results.reduce((s, r) => s + r.bytes, 0)
console.log(
  `\n合计 ${results.reduce((s, r) => s + r.files, 0)} 片、${Math.round(total / 1024)} KB（两个字重）。` +
    `\n产物入库，部署端不需要 Node。`,
)
