import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { buildOverrides, naiveThemeFor, readTokens, type Tokens } from '@/theme/naive'

const STORAGE_KEY = 'pod-theme'

/** 主题：html.dark 是唯一开关，令牌和 Naive UI 的覆盖都从 CSS 变量反读，
 *  所以切换主题只要改这一个 class，两边同时生效。
 *
 *  ⚠️ **2026-09-21 起界面锁定为亮色**（业主的要求：网页一律亮色，不跟系统走）。
 *  这里的 isDark 因此恒为 false，但它**仍然存在**：公告取色（theme/paper.ts）、
 *  看板图表取色（DashboardView）都读它来决定用哪一套令牌 —— 删掉它那两处会编译不过，
 *  而"删掉之后到处改成常量"只会把同一个事实散到三个文件里。
 *  真正保证亮色的地方是三处，缺一处就会漏：
 *    ① frontend/index.html 的首屏脚本（它在 CSS 之前跑，负责防闪）；
 *    ② 这里（applyShell 落 class）；
 *    ③ 下面 isDark 的初值（不读 localStorage、不读系统偏好）。
 *  想恢复暗色时把这三处一起改回来，并记得把 ChromeActions 里的切换按钮也加回来。 */
export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

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

  // 老版本留下的 pod-theme 键（那时用户可以手动选暗色）：清掉。
  // 留着它没有任何用（现在没人读），而它会让下一个读这份代码的人以为
  // "主题偏好还存着、只是暂时没用上" —— 于是去实现一个已经不存在的能力。
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    /* 隐私模式下 localStorage 会抛，忽略即可 —— 主题是锁定的，本来也不需要它 */
  }

  /** 切换主题。**现在是空实现**：界面锁定亮色，切换入口（ChromeActions）也拆掉了。
   *  保留这个函数是为了不改 App/布局里的引用，而且它是"以后要放开暗色"时唯一的落点 ——
   *  到时候把 isDark 的初值与这里一起改回来即可。 */
  function toggle(): void {
    /* 锁定亮色：不响应 */
  }

  const naiveTheme = computed(() => naiveThemeFor(isDark.value))
  const naiveOverrides = computed(() => buildOverrides(tokens.value, isDark.value))

  return { isDark, tokens, toggle, naiveTheme, naiveOverrides }
})
