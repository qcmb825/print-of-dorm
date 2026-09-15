/** 读出公告纸面两套令牌的**具体值**（浅色 / 深色）。
 *
 *  为什么要在 JS 里读值：公告正文颜色是管理员在后台选的，而纸面颜色由主题决定，
 *  两者会撞车（亮黄写在白纸上、深墨写在深纸上都会看不见）。要不要回落到主题文字色
 *  得靠 WCAG 对比度算，而 CSS 做不了这个判断 —— 所以必须在 JS 里拿到纸面的 hex。
 *
 *  为什么用探针元素：令牌挂在 :root 和 .dark 上，而 :root 就是 <html> 本身，
 *  在它下面再套一个元素只会**继承当前主题那一套**。要在一个页面里同时拿到两套，
 *  只能给子树加上对应的类（tokens.css 里浅色那套同时挂在 :root 和 .light 上），
 *  本模块借的就是这个机制。
 *
 *  两套值只由 tokens.css 决定、与当前主题无关，所以读到就缓存，不必跟着主题重算。
 */

export interface PaperTokens {
  /** 纸面底色 */
  paper: string
  /** 纸面描边 */
  line: string
  /** 与纸面同属一套、必然可读的文字色，用作对比度不足时的兜底 */
  ink: string
}

const VAR_MAP = {
  paper: '--paper',
  line: '--paper-line',
  ink: '--paper-ink',
} as const

let cache: { light: PaperTokens; dark: PaperTokens } | null = null

function probe(themeClass: 'light' | 'dark'): PaperTokens {
  const el = document.createElement('div')
  el.className = themeClass
  el.setAttribute('aria-hidden', 'true')
  // 摆进 DOM 才拿得到计算值，但不能影响布局，也不能被读屏念到
  el.style.cssText = 'position:absolute;left:-9999px;top:0;width:0;height:0;visibility:hidden'
  document.body.appendChild(el)
  const style = getComputedStyle(el)
  const out = {} as PaperTokens
  for (const [key, cssVar] of Object.entries(VAR_MAP)) {
    ;(out as unknown as Record<string, string>)[key] = style.getPropertyValue(cssVar).trim()
  }
  el.remove()
  return out
}

export function readPaperTokens(): { light: PaperTokens; dark: PaperTokens } {
  cache ??= { light: probe('light'), dark: probe('dark') }
  return cache
}

export function paperFor(isDark: boolean): PaperTokens {
  const all = readPaperTokens()
  return isDark ? all.dark : all.light
}
