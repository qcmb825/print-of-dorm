import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { buildOverrides, naiveThemeFor, readTokens, type Tokens } from '@/theme/naive'

const STORAGE_KEY = 'pod-theme'

/** 主题：html.dark 是唯一开关，令牌和 Naive UI 的覆盖都从 CSS 变量反读，
 *  所以切换主题只要改这一个 class，两边同时生效。 */
export const useThemeStore = defineStore('theme', () => {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
  const systemDark =
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches

  const isDark = ref(saved ? saved === 'dark' : systemDark)

  /** 只负责落 class。必须先落 class 再读令牌 —— readTokens() 读的就是 CSS 变量，
   *  顺序反了会把上一套主题的颜色当成当前主题的。 */
  function applyShell(): void {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
  }

  // 首屏只读一次令牌。原来是构造时读一次、watch 的 immediate 再读一次：
  // readTokens() 是 30 次 getPropertyValue 加一次强制样式解析，重复跑纯属浪费；
  // 而且第一次读的时候 class 还没落，读到的本来就是错的，等于白读。
  applyShell()
  const tokens = ref<Tokens>(readTokens())

  watch(isDark, () => {
    applyShell()
    tokens.value = readTokens()
  })

  // 用户没手动选过时才跟随系统
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) isDark.value = event.matches
  })

  /** 手动切换主题。**目前没有调用方**：界面上的 ThemeToggle 已经拆掉，主题
   *  跟着系统偏好走（下面那个 matchMedia 监听）。这个函数留着是因为深色令牌
   *  和这套反读逻辑都还在正常服务图表与公告，将来想加回入口时不必重写。 */
  function toggle(): void {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  const naiveTheme = computed(() => naiveThemeFor(isDark.value))
  const naiveOverrides = computed(() => buildOverrides(tokens.value, isDark.value))

  return { isDark, tokens, toggle, naiveTheme, naiveOverrides }
})
