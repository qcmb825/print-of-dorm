import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authApi } from '@/api/endpoints'
import { setUnauthorizedHandler } from '@/api/client'
import type { Role, User } from '@/api/types'

/** 登录态。角色决定界面：学生看到上传与我的订单，管理员/超管看到订单台与看板。 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  /** 启动握手是否已完成 —— 未完成前不要渲染任何依赖登录态的东西 */
  const ready = ref(false)

  const isLoggedIn = computed(() => user.value !== null)
  const role = computed<Role>(() => user.value?.role ?? 'user')
  const isStaff = computed(() => role.value === 'admin' || role.value === 'super')
  const isSuper = computed(() => role.value === 'super')
  const displayName = computed(() => user.value?.nickname ?? '')

  /** 会话失效（后端返回 401）时立刻清空本地状态，路由守卫会把页面送回登录页。 */
  setUnauthorizedHandler(() => {
    user.value = null
  })

  /** 启动握手：未登录时后端返回 401，这里当正常分支处理，不当错误。 */
  async function bootstrap(): Promise<void> {
    try {
      const data = await authApi.me()
      user.value = data.user
    } catch {
      user.value = null
    } finally {
      ready.value = true
    }
  }

  async function login(identifier: string, password: string): Promise<void> {
    const data = await authApi.login(identifier, password)
    user.value = data.user
  }

  async function register(payload: Record<string, unknown>): Promise<void> {
    const data = await authApi.register(payload)
    user.value = data.user
  }

  async function logout(): Promise<void> {
    try {
      await authApi.logout()
    } finally {
      user.value = null
    }
  }

  return {
    user,
    ready,
    isLoggedIn,
    role,
    isStaff,
    isSuper,
    displayName,
    bootstrap,
    login,
    register,
    logout,
  }
})
