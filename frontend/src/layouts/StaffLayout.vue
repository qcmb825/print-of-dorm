<script setup lang="ts">
/** 管理端布局：桌面用左侧固定导航，窄屏收进抽屉（管理员也可能拿手机用）。 */
import { computed, onMounted, ref } from 'vue'
import {
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquare,
  Package,
  Printer,
  Users,
} from '@lucide/vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AnnouncementBar from '@/components/AnnouncementBar.vue'
import BrandMark from '@/components/BrandMark.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import UserMenu from '@/components/UserMenu.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const announcement = useAnnouncementStore()

const drawerOpen = ref(false)

/** 账号管理只有超管能做，普通管理员看不到入口（后端也会再挡一次）。 */
const navItems = computed(() =>
  [
    { to: '/staff/orders', label: '订单台', icon: Package, show: true },
    { to: '/staff/dashboard', label: '数据看板', icon: LayoutDashboard, show: true },
    { to: '/staff/tickets', label: '工单处理', icon: MessageSquare, show: true },
    { to: '/staff/announcements', label: '公告管理', icon: Megaphone, show: true },
    { to: '/staff/users', label: '账号管理', icon: Users, show: auth.isSuper },
  ].filter((item) => item.show),
)

const currentPath = computed(() => route.path)
const currentTitle = computed(() => (route.meta.title as string | undefined) ?? '管理控制台')

onMounted(() => {
  void announcement.load()
})
</script>

<template>
  <div class="flex min-h-full">
    <aside
      class="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col border-r lg:flex"
      style="border-color: var(--border); background-color: color-mix(in srgb, var(--card) 60%, transparent)"
    >
      <div class="px-5 py-5">
        <BrandMark />
      </div>
      <nav class="flex flex-col gap-1 px-3" aria-label="管理导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold no-underline transition-colors"
          :style="
            currentPath === item.to
              ? { backgroundColor: 'var(--muted)', color: 'var(--primary)' }
              : { color: 'var(--text-tertiary)' }
          "
        >
          <component :is="item.icon" :size="16" />
          {{ item.label }}
        </RouterLink>
      </nav>
      <div class="mt-auto flex items-center gap-1 border-t px-3 py-3" style="border-color: var(--border)">
        <ThemeToggle />
        <UserMenu />
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="sticky top-0 z-20 flex h-14 items-center gap-2 border-b px-3 backdrop-blur-xl lg:hidden"
        style="
          background-color: color-mix(in srgb, var(--background) 85%, transparent);
          border-color: var(--border);
        "
      >
        <NDrawer v-model:show="drawerOpen" :width="248" placement="left">
          <NDrawerContent :native-scrollbar="false" body-content-style="padding: 0">
            <div class="flex flex-col gap-1 px-3 py-2">
              <RouterLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold no-underline"
                :style="
                  currentPath === item.to
                    ? { backgroundColor: 'var(--muted)', color: 'var(--primary)' }
                    : { color: 'var(--text-tertiary)' }
                "
                @click="drawerOpen = false"
              >
                <component :is="item.icon" :size="16" />
                {{ item.label }}
              </RouterLink>
            </div>
          </NDrawerContent>
        </NDrawer>

        <button
          type="button"
          class="grid size-9 place-items-center rounded-lg"
          style="color: var(--text-secondary)"
          aria-label="打开导航菜单"
          @click="drawerOpen = true"
        >
          <Menu :size="19" />
        </button>
        <span class="flex items-center gap-2">
          <Printer :size="16" style="color: var(--primary)" aria-hidden="true" />
          <span class="font-heading text-[15px] font-bold">{{ currentTitle }}</span>
        </span>
        <div class="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>

      <AnnouncementBar />

      <main class="min-w-0 flex-1 px-3 py-4 sm:px-5 sm:py-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>
