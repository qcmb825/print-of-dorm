/** 读出公告纸面令牌的**具体值**。
 *
 *  为什么要在 JS 里读值：公告正文颜色是管理员在后台选的，而纸面颜色由令牌决定，
 *  两者会撞车（亮黄写在白纸上会看不见）。要不要回落到主题文字色得靠 WCAG 对比度算，
 *  而 CSS 做不了这个判断 —— 所以必须在 JS 里拿到纸面的 hex。
 *
 *  **界面锁定亮色**（2026-09-21 的产品决定），所以只有一套纸面令牌，直接从
 *  <html> 上读即可。这里曾经用探针元素同时探两套（`.light` / `.dark` 子树），
 *  那是为「同一页里预览深浅两种纸面」服务的 —— 暗色废弃后那套机制没有消费者了。
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

let cache: PaperTokens | null = null

/** 读一次就缓存：这三支只由 tokens.css 决定，运行期不会变。 */
export function readPaperTokens(): PaperTokens {
  if (cache) return cache
  const style = getComputedStyle(document.documentElement)
  const out = {} as PaperTokens
  for (const [key, cssVar] of Object.entries(VAR_MAP)) {
    ;(out as unknown as Record<string, string>)[key] = style.getPropertyValue(cssVar).trim()
  }
  cache = out
  return out
}
