import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    /** 需要登录 */
    auth?: boolean
    /** 需要管理员或超管 */
    staff?: boolean
    /** 只有超管能进 */
    super?: boolean
    /** 未登录才能进（登录页） */
    guest?: boolean
    title?: string
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { guest: true, title: '登录' },
  },
  {
    // 学生端：手机优先
    path: '/',
    component: () => import('@/layouts/StudentLayout.vue'),
    meta: { auth: true },
    children: [
      { path: '', redirect: '/upload' },
      {
        path: 'upload',
        name: 'student-upload',
        component: () => import('@/views/student/UploadView.vue'),
        meta: { title: '下单打印' },
      },
      {
        path: 'my-orders',
        name: 'student-orders',
        component: () => import('@/views/student/MyOrdersView.vue'),
        meta: { title: '我的订单' },
      },
      {
        path: 'tickets',
        name: 'student-tickets',
        component: () => import('@/views/student/TicketsView.vue'),
        meta: { title: '问题反馈' },
      },
    ],
  },
  {
    // 管理端：桌面优先的控制台
    path: '/staff',
    component: () => import('@/layouts/StaffLayout.vue'),
    meta: { auth: true, staff: true },
    children: [
      { path: '', redirect: '/staff/orders' },
      {
        path: 'orders',
        name: 'staff-orders',
        component: () => import('@/views/staff/OrdersView.vue'),
        meta: { title: '订单台' },
      },
      {
        path: 'dashboard',
        name: 'staff-dashboard',
        component: () => import('@/views/staff/DashboardView.vue'),
        meta: { title: '数据看板' },
      },
      {
        path: 'users',
        name: 'staff-users',
        component: () => import('@/views/staff/UsersView.vue'),
        meta: { title: '账号管理' },
      },
      {
        path: 'announcements',
        name: 'staff-announcements',
        component: () => import('@/views/staff/AnnouncementsView.vue'),
        meta: { title: '公告管理' },
      },
      {
        path: 'tickets',
        name: 'staff-tickets',
        component: () => import('@/views/staff/TicketsView.vue'),
        meta: { title: '工单处理' },
      },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

// 后端把 SPA 挂在站点根路径上，所以 history 的 base 固定是 '/'，
// 不能跟着 Vite 的 base（/static/app/）走。
export const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

router.beforeEach(async (to) => {
  const auth = useAuthStore()
  if (!auth.ready) await auth.bootstrap()

  if (to.meta.guest) {
    if (auth.isLoggedIn) return auth.isStaff ? '/staff/orders' : '/upload'
    return true
  }
  if (to.meta.auth && !auth.isLoggedIn) {
    return { name: 'login', query: to.fullPath === '/' ? {} : { redirect: to.fullPath } }
  }
  // 学生进不了管理端；管理员进非超管页也拦掉
  if (to.meta.staff && !auth.isStaff) return '/upload'
  if (to.meta.super && !auth.isSuper) return '/staff/orders'
  return true
})
