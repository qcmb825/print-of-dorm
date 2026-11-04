import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { buildOverrides, readTokens, type Tokens } from '@/theme/naive'

/** 令牌 store：把 CSS 变量反读成 JS 对象，给 Naive UI 的覆盖与图表配色用。
 *
 *  **界面锁定亮色**（2026-09-21 的产品决定：网页一律亮色，不跟随系统、
 *  也不提供切换入口）。所以这里没有 isDark、没有 toggle、没有持久化 ——
 *  只有一套令牌。
 *
 *  这条决定历史上有过反复（曾短暂放开过暗色），所以三个地方曾经各有一份
 *  "锁"：index.html 的首屏脚本、这里的 applyShell、isDark 的初值。
 *  现在暗色代码已整簇删除，`scripts/check-theme-lock.mjs` 会在构建时拦住
 *  任何重新引入（`isDark` / `darkTheme` / `.dark` / `pod-theme` / `dark:`）。
 *
 *  删掉的东西别再凭印象加回来：暗色令牌块、Naive 的 darkTheme、首屏防闪脚本。
 *  如果哪天真的要做暗色，那不是"把开关打开"，而是重新论证一遍
 *  「同一间屋子里几台机器的明暗不该随各自系统分家」这条前提还成不成立。 */
export const useThemeStore = defineStore('theme', () => {
  /** 启动时读一次。readTokens() 是 30 次 getPropertyValue 加一次强制样式解析，
   *  而令牌在运行期不会变（没有主题切换），所以没有任何 watch。 */
  const tokens = ref<Tokens>(readTokens())

  const naiveOverrides = computed(() => buildOverrides(tokens.value))

  return { tokens, naiveOverrides }
})
