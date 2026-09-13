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
  const tokens = ref<Tokens>(readTokens())

  function apply(): void {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light'
    tokens.value = readTokens()
  }

  watch(isDark, apply, { immediate: true })

  // 用户没手动选过时才跟随系统
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (!localStorage.getItem(STORAGE_KEY)) isDark.value = event.matches
  })

  function toggle(): void {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
  }

  const naiveTheme = computed(() => naiveThemeFor(isDark.value))
  const naiveOverrides = computed(() => buildOverrides(tokens.value, isDark.value))

  return { isDark, tokens, toggle, naiveTheme, naiveOverrides }
})
