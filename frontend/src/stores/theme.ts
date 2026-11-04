import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { buildOverrides, naiveThemeFor, readTokens, type Tokens } from '@/theme/naive'
import { useRouteVeil } from '@/composables/route-veil'

const STORAGE_KEY = 'pod-theme'

/** 读存下来的主题偏好。读不到（首次访问、隐私模式、值不合法）一律亮色。 */
function readStoredTheme(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark'
  } catch {
    return false
  }
}

/** 借换场面板翻主题（见 stores/theme.ts 顶部注释与 route-veil.ts 的 pulse）。
 *  放在模块级而不是 store 内部：pulse 不依赖 store 的任何状态。 */
const veil = useRouteVeil()

function pulseTheme(applyTheme: () => void): boolean {
  return veil.pulse(
    { code: 'THEME', title: '配色切换', lead: 'RECONFIGURING:' },
    applyTheme,
  )
}

/** 主题：html.dark 是唯一开关，令牌和 Naive UI 的覆盖都从 CSS 变量反读，
 *  所以切换主题只要改这一个 class，两边同时生效。
 *
 *  **2026-11 起放开暗色**（此前 2026-09-21 曾按业主要求锁定亮色，那一版留了
 *  三处锁：index.html 的首屏脚本、applyShell、isDark 初值 —— 现在三处一起恢复，
 *  少改一处就会漏：首屏脚本漏了，暗色用户整页加载时会先白闪一下再变黑）。
 *
 *  切换主题走**换场面板**（见 composables/route-veil.ts 的 pulse）：
 *  面板扫到盖住的那一帧才落 class，全黑的那一瞬换完，用户看不到任何中间态。
 *  直接瞬切会把整页颜色在一帧里翻过去 —— 那是这套界面里唯一一次"闪"，
 *  而它恰好落在闪阈附近，也破坏"机器在换挡"的叙事。
 *
 *  与导航换场撞车时（pulse 返回 false）退回瞬切：主题是高频小动作，
 *  排队等一场换场结束会让人以为按钮没反应。 */
export const useThemeStore = defineStore('theme', () => {
  /** 初值读 localStorage；没有就**固定亮色**，不跟随系统。
   *  不跟系统是刻意的：这套界面是给柜台和学生看的一块屏，
   *  同一间屋子里几台机器的明暗不该随各自的夜间模式分家。 */
  const isDark = ref(readStoredTheme())

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

  /** 切换主题。面板盖住的那一帧才真正翻 class。 */
  function toggle(): void {
    const next = !isDark.value
    const wrote = pulseTheme(() => {
      isDark.value = next
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      } catch {
        /* 隐私模式下写不进去：主题只在本次会话有效，不影响可用性 */
      }
    })
    // 换场进行中 / 减少动效（pulse 内部会拒绝）：就地瞬切。
    // 减少动效下"面板扫过"整层不出现，pulse 里那条 setTimeout 仍然会到点执行，
    // 所以这里其实只需要处理"正在换场"这一种；两种情况都写进同一个兜底。
    if (!wrote) {
      isDark.value = next
      try {
        localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
      } catch {
        /* 同上 */
      }
    }
  }

  const naiveTheme = computed(() => naiveThemeFor(isDark.value))
  const naiveOverrides = computed(() => buildOverrides(tokens.value, isDark.value))

  return { isDark, tokens, toggle, naiveTheme, naiveOverrides }
})
