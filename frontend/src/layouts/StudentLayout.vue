<script setup lang="ts">
/** 学生端布局：手机优先 —— 顶部栏 + 内容区 + 底部标签栏，宽屏时标签栏挪到顶部。 */
import { computed, onMounted } from 'vue'
import { ClipboardList, LayoutDashboard, MessageSquare, TrendingUp, Upload } from '@lucide/vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import AnnouncementBar from '@/components/AnnouncementBar.vue'
import BrandMark from '@/components/BrandMark.vue'
import RouteTransition from '@/components/RouteTransition.vue'
import UserMenu from '@/components/UserMenu.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const announcement = useAnnouncementStore()

const navItems = computed(() => [
  { to: '/upload', label: '下单打印', icon: Upload },
  { to: '/my-orders', label: '我的订单', icon: ClipboardList },
  // 「服务数据」排在中间：它是「看看大家的」那一类，跟两头的「我的」和「管理」分开
  { to: '/board', label: '服务数据', icon: TrendingUp },
  { to: '/tickets', label: '问题反馈', icon: MessageSquare },
  // 管理员也会走到学生端（比如自己下单测试），给他们一条回控制台的入口
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
            class="nav-link flex items-center gap-1.5 rounded-lg px-3 py-2 text-[13px] font-semibold no-underline"
            :class="currentPath === item.to && 'nav-link--active'"
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
        <!-- 这里原本还有一个主题切换按钮，已经拆掉：主题跟着系统偏好走。
             少了一个固定宽度的按钮，账号区在窄屏上也不那么挤了。 -->
        <div class="ml-auto flex items-center gap-1">
          <UserMenu v-if="auth.isLoggedIn" />
        </div>
      </div>
    </header>

    <AnnouncementBar />

    <!-- min-w-0 不能省：main 是 flex 子项，默认的 min-width:auto 会让它被内部
         min-content 顶宽（窄屏下表现为整页多出 24px 横向滚动），必须显式允许收缩。 -->
    <main class="mx-auto w-full min-w-0 max-w-6xl flex-1 px-3 pt-4 pb-24 sm:px-5 sm:pt-6 sm:pb-10">
      <!-- profile="inline"：这一层 stage 只包 <main> 里的页面组件，本站唯一的 fixed
           （下面那条底部标签栏）与各条 sticky 顶栏都在它之外，所以可以接回横向接入语汇。
           换场覆盖层的档位由它决定：子页档短、缝窄，外壳档（App.vue）拉满。 -->
      <RouterView v-slot="{ Component }">
        <RouteTransition :transition-key="currentPath" profile="inline">
          <component :is="Component" />
        </RouteTransition>
      </RouterView>
    </main>

    <!-- 底部标签栏：窄屏用，与上面横向导航在 md 断点交接。
         列数跟着导航项走，管理员会多一条"管理控制台"

         这一栏的字只有 11px，是全站最小的一档，所以两态都得按小字的 4.5:1 来选色：
         激活态原来读 --primary(#d4a017)，在页面底上只有 2.26:1；未激活态原来读
         --text-quaternary(40% 黑，等效 #9c9c9c)只有 2.61:1。这里换成 --accent-text
         （5.20:1）与 --text-tertiary（等效 #6e6e6e，4.84:1）。
         这一栏没有色条/下划线，激活态本来就只靠颜色区分，因此必须真的过 AA。
         上面那排横向导航不同：它的文字是 --foreground，本来就合格，不动。 -->
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
        :style="
          currentPath === item.to
            ? { color: 'var(--accent-text)' }
            : { color: 'var(--text-tertiary)' }
        "
      >
        <component :is="item.icon" :size="19" />
        <!-- w-full + truncate 是给「管理员看学生端」那种情形兜底的：
             他的标签栏比别人多一格（6 列），320px 屏上每列只剩 ~52px，
             「管理控制台」五个字放不下。不加的话是硬溢出，会把整页顶出横向滚动条，
             而截断只是这几个字变成「管理控…」—— 图标还在，认得出是哪个入口。 -->
        <span class="w-full truncate text-center text-[11px] font-semibold">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
