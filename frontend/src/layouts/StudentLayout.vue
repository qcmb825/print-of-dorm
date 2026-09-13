<script setup lang="ts">
/** 学生端布局：手机优先 —— 顶部栏 + 内容区 + 底部标签栏，宽屏时标签栏挪到顶部。 */
import { computed, onMounted } from 'vue'
import { ClipboardList, LayoutDashboard, MessageSquare, Upload } from '@lucide/vue'
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

const navItems = computed(() => [
  { to: '/upload', label: '下单打印', icon: Upload },
  { to: '/my-orders', label: '我的订单', icon: ClipboardList },
  { to: '/tickets', label: '问题反馈', icon: MessageSquare },
  // 管理员/超管也会走到学生端（比如自己下单测试），给他们一条回控制台的入口
  ...(auth.isStaff ? [{ to: '/staff/orders', label: '管理控制台', icon: LayoutDashboard }] : []),
])

const currentPath = computed(() => route.path)

onMounted(() => {
  void announcement.load()
})
</script>

<template>
  <div class="flex min-h-full flex-col">
    <header
      class="sticky top-0 z-20 border-b backdrop-blur-xl"
      style="background-color: color-mix(in srgb, var(--background) 82%, transparent); border-color: var(--border)"
    >
      <div class="mx-auto flex h-14 max-w-6xl items-center gap-3 px-3 sm:h-16 sm:px-5">
        <BrandMark />
        <!-- 横向导航放到 md：sm(640) 就显示的话，staff 的 4 个导航项会和品牌、
             账号区挤在一行，实测在 640px 会溢出 31px。窄屏继续用底部标签栏。 -->
        <nav class="ml-4 hidden items-center gap-1 md:flex" aria-label="主导航">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold no-underline transition-colors"
            :style="
              currentPath === item.to
                ? { backgroundColor: 'var(--muted)', color: 'var(--foreground)' }
                : { color: 'var(--text-tertiary)' }
            "
          >
            <component :is="item.icon" :size="15" />
            {{ item.label }}
          </RouterLink>
        </nav>
        <div class="ml-auto flex items-center gap-1">
          <ThemeToggle />
          <UserMenu v-if="auth.isLoggedIn" />
        </div>
      </div>
    </header>

    <AnnouncementBar />

    <!-- min-w-0 不能省：main 是 flex 子项，默认的 min-width:auto 会让它被内部
         min-content 顶宽（窄屏下表现为整页多出 24px 横向滚动），必须显式允许收缩。 -->
    <main class="mx-auto w-full min-w-0 max-w-6xl flex-1 px-3 pt-4 pb-24 sm:px-5 sm:pt-6 sm:pb-10">
      <RouterView />
    </main>

    <!-- 底部标签栏：窄屏用，与上面横向导航在 md 断点交接。
         列数跟着导航项走，管理员会多一条"管理控制台" -->
    <nav
      class="fixed inset-x-0 bottom-0 z-20 grid border-t backdrop-blur-xl md:hidden"
      :style="{
        gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
        backgroundColor: 'color-mix(in srgb, var(--background) 88%, transparent)',
        borderColor: 'var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }"
      aria-label="主导航"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex flex-col items-center gap-1 py-2.5 no-underline"
        :style="currentPath === item.to ? { color: 'var(--primary)' } : { color: 'var(--text-quaternary)' }"
      >
        <component :is="item.icon" :size="19" />
        <span class="text-[11px] font-semibold">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
