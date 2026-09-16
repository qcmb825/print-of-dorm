import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

declare module 'vue-router' {
  interface RouteMeta {
    /** 需要登录 */
    auth?: boolean
    /** 需要管理员 */
    staff?: boolean
    /** 只对默认管理员开放的页面 */
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
        path: 'board',
        name: 'student-board',
        component: () => import('@/views/student/BoardView.vue'),
        meta: { title: '服务数据' },
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
        // 详情页是订单台的子页面，所以 `staff: true` 从父级继承，这里不用再写一遍。
        // 单独一条路由而不是弹窗：详情要能被分享、被刷新、被浏览器后退键退出 ——
        // 弹窗这三样都做不到（刷新一下就回到了列表，链接发给同事也只看到列表）。
        path: 'orders/:id',
        name: 'staff-order-detail',
        component: () => import('@/views/staff/OrderDetailView.vue'),
        meta: { title: '订单详情' },
      },
      {
        path: 'dashboard',
        name: 'staff-dashboard',
        component: () => import('@/views/staff/DashboardView.vue'),
        meta: { title: '数据看板' },
      },
      {
        path: 'audits',
        name: 'staff-audits',
        component: () => import('@/views/staff/AuditView.vue'),
        meta: { title: '身份审核' },
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
        // 打印选项对所有管理员开放，**不是** `super: true`：
        // 「楼里现在有哪种纸」是打印员自己最清楚的事。这条与后端
        // routes/order_options.py 里那几个 ROLE_ADMIN 写接口一一对应 ——
        // 路由放开而接口收着（或反过来）都会变成「能点，点了 403」。
        path: 'print-options',
        name: 'staff-print-options',
        component: () => import('@/views/staff/PrintOptionsView.vue'),
        meta: { title: '打印选项' },
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

  // 站点根路径按角色分流。路由表里 '' 那条 redirect 会**先于守卫**把 '/' 解析成 '/upload'，
  // 所以这里只能认 redirectedFrom —— 写 `to.path === '/'` 是一句永远不执行的死代码
  // （原先就是这么写的，表现是管理员点品牌 logo 掉进学生端；类型检查和一个「点五下」
  // 的动作都看不出来，因为第五下直接切换视图、根本没发生导航）。
  // 直接点进 /upload 的管理员**不拦**：学生端顶栏本来就给他留了「管理控制台」入口。
  if (to.path === '/upload' && to.redirectedFrom && auth.isLoggedIn && auth.isStaff) {
    return '/staff/orders'
  }

  if (to.meta.guest) {
    if (auth.isLoggedIn) return auth.isStaff ? '/staff/orders' : '/upload'
    return true
  }
  if (to.meta.auth && !auth.isLoggedIn) {
    return { name: 'login', query: to.fullPath === '/' ? {} : { redirect: to.fullPath } }
  }
  // 学生进不了管理端；管理端里那几页只对默认管理员开放的也一并拦掉
  if (to.meta.staff && !auth.isStaff) return '/upload'
  if (to.meta.super && !auth.advancedAllowed) return '/staff/orders'
  return true
})
