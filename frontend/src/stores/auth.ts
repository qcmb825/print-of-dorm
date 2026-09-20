import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authApi } from '@/api/endpoints'
import { setUnauthorizedHandler } from '@/api/client'
import type { ProfileUpdateResponse, Role, User } from '@/api/types'

/** 高级视图开关记忆在 sessionStorage 里，不是 localStorage：
 *  浏览器一关就忘，正好对上「本人盯着这一会儿屏幕」的意思。
 *  它只记界面状态、不含任何数据 —— 丢了顶多要重新连点五次。 */
const ADVANCED_KEY = 'pod-staff-advanced'

/** 登录态。角色决定界面：学生看到上传与我的订单，管理员看到订单台与看板。 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  /** 启动握手是否已完成 —— 未完成前不要渲染任何依赖登录态的东西 */
  const ready = ref(false)

  const isLoggedIn = computed(() => user.value !== null)
  const role = computed<Role>(() => user.value?.role ?? 'user')
  const isStaff = computed(() => role.value === 'admin' || role.value === 'super')

  /** 这个账号有没有资格进高级视图。
   *
   *  看的是后端给的 advanced 布尔值，**不是 role === 'super'** ——
   *  对外角色已经收敛成 user / admin 两种，'super' 这个字符串永远不会出现在
   *  响应里，照它写的分支只会静默失效：界面少一栏、按钮不渲染，
   *  控制台一个错都没有。「新版界面找不到账号管理」的直接原因就是它，别改回去。
   *
   *  名字里不带「超管」字样也是这个道理：界面上只承认两种角色叫法。 */
  const advancedAllowed = computed(() => user.value?.advanced === true)

  /** 高级视图开关。纯界面状态，**不参与任何鉴权**：
   *  真正拦人的是服务端的 @roles_required(ROLE_SUPER)；
   *  这里关掉只是把入口藏起来，代码本身照样发到浏览器（F12 能读也能自己敲）。 */
  const advanced = ref(false)

  const displayName = computed(() => user.value?.nickname ?? '')

  /** 写开关。所有赋值都必须走这里，免得某处直接改 advanced.value
   *  导致内存和 sessionStorage 对不上 —— 那种不一致只在刷新后才看得出来。 */
  function applyAdvanced(on: boolean): void {
    advanced.value = advancedAllowed.value && on
    try {
      if (advanced.value) sessionStorage.setItem(ADVANCED_KEY, '1')
      else sessionStorage.removeItem(ADVANCED_KEY)
    } catch {
      // 隐私模式 / 禁用存储时 sessionStorage 会直接抛异常。
      // 界面开关丢了不影响任何功能，所以吞掉 —— 但绝不能让它把 store 带崩。
    }
  }

  /** 登录后按记忆恢复。没资格的人（普通管理员、学生）一律恢复成 false：
   *  同一个浏览器里换个人登录，不该继承上一个人留下的界面状态。 */
  function restoreAdvanced(): void {
    let remembered = false
    try {
      remembered = sessionStorage.getItem(ADVANCED_KEY) === '1'
    } catch {
      remembered = false
    }
    applyAdvanced(remembered)
  }

  /** 切换高级视图。返回有没有真的切 —— 没资格时返回 false，好让调用方给一句提示。 */
  function toggleAdvanced(): boolean {
    if (!advancedAllowed.value) return false
    applyAdvanced(!advanced.value)
    return true
  }

  /** 会话失效（后端返回 401）时立刻清空本地状态，并跳转到登录页。
   *
   *  路由守卫只在「导航触发」时执行，无法响应静默轮询/定时请求里的 401。
   *  这里自己跳转，并带上 redirect 让用户登录后回到原页面。
   *  已在登录页时不再跳转，避免无限重定向。 */
  setUnauthorizedHandler(async () => {
    user.value = null
    // 只清内存里的开关，不动 sessionStorage：同一个人重新登录还能接着用，
    // 换个人登录时 restoreAdvanced() 会按他的资格把开关压回去。
    advanced.value = false
    // 动态导入路由实例，避免 client.ts ↔ stores/auth.ts 循环依赖。
    // 此时 router/index.ts 已初始化完成（auth store 是守卫里首次 use 的，
    // 在 router.afterEach 之前就已经存在），懒导入只为了突破编译时的循环引用。
    const { router } = await import('@/router')
    const currentPath = router.currentRoute.value.fullPath
    if (currentPath === '/login') return
    await router.replace({ name: 'login', query: { redirect: currentPath } })
  })

  /** 启动握手：未登录时后端返回 401，这里当正常分支处理，不当错误。 */
  async function bootstrap(): Promise<void> {
    try {
      const data = await authApi.me()
      user.value = data.user
    } catch {
      user.value = null
    } finally {
      restoreAdvanced()
      ready.value = true
    }
  }

  async function login(identifier: string, password: string): Promise<void> {
    const data = await authApi.login(identifier, password)
    user.value = data.user
    restoreAdvanced()
  }

  async function register(payload: Record<string, unknown>): Promise<void> {
    const data = await authApi.register(payload)
    user.value = data.user
    restoreAdvanced()
  }

  async function logout(): Promise<void> {
    try {
      await authApi.logout()
    } finally {
      user.value = null
      advanced.value = false
    }
  }

  /** 收款码换过（上传或删除）之后更新本地状态。
   *
   *  改这两个字段就够了，**不重新拉一遍 /api/me**：那要多一次往返，
   *  而且会把 user 整个换掉 —— 界面上所有读 user 的地方都会跟着重渲染一次，
   *  看起来就是打开收款码弹窗顺手闪了一下。
   *  传空串表示删掉了。 */
  function setPayQr(version: string): void {
    if (!user.value) return
    user.value.has_pay_qr = Boolean(version)
    user.value.pay_qr_version = version
  }

  /** 保存资料成功后把这几个字段并回本地 user。
   *
   *  后端 PUT /api/me/profile 的响应里只带回昵称/宿舍/QQ/联系方式这几项
   *  （学号、姓名、角色不可改，服务端也不回），所以合并而不是整体替换。
   *  不更新的话，顶栏和账号菜单里的昵称还是旧的 —— 保存成功却看不出变化，
   *  用户会以为没保存上再点一次，而他点的第二次是往已经改好的值上再写一遍。 */
  function applyProfile(patch: ProfileUpdateResponse['user']): void {
    if (!user.value) return
    user.value.nickname = patch.nickname
    user.value.dorm = patch.dorm
    user.value.qq = patch.qq
    user.value.contact_type = patch.contact_type
    user.value.contact = patch.contact
  }

  return {
    user,
    ready,
    isLoggedIn,
    role,
    isStaff,
    advancedAllowed,
    advanced,
    displayName,
    toggleAdvanced,
    bootstrap,
    login,
    register,
    logout,
    setPayQr,
    applyProfile,
  }
})
