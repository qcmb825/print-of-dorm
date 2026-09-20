<script setup lang="ts">
/** 学生端布局：手机优先 —— 顶部栏 + 内容区 + 底部标签栏，宽屏时标签栏挪到顶部。 */
import { computed, onMounted, ref, watch } from 'vue'
import { ClipboardList, LayoutDashboard, MessageSquare, TrendingUp, Upload } from '@lucide/vue'
import { NAlert } from 'naive-ui'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import DecorStrip from '@/components/DecorStrip.vue'
import AnnouncementBar from '@/components/AnnouncementBar.vue'
import BrandMark from '@/components/BrandMark.vue'
import ChromeActions from '@/components/ChromeActions.vue'
import RouteTransition from '@/components/RouteTransition.vue'
import UserMenu from '@/components/UserMenu.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()
const announcement = useAnnouncementStore()
const qqReminderDismissed = ref(false)

const needsQq = computed(
  () => auth.ready && auth.isLoggedIn && !!auth.user && !auth.user.qq?.trim(),
)

function qqReminderKey(userId: number): string {
  return `pod.missing-qq.${userId}`
}

function syncQqReminder(): void {
  const userId = auth.user?.id
  if (!userId) {
    qqReminderDismissed.value = false
    return
  }
  try {
    qqReminderDismissed.value = sessionStorage.getItem(qqReminderKey(userId)) === '1'
  } catch {
    // 隐私模式禁用 sessionStorage 时，提醒仍应正常显示。
    qqReminderDismissed.value = false
  }
}

function dismissQqReminder(): void {
  const userId = auth.user?.id
  if (userId) {
    try {
      sessionStorage.setItem(qqReminderKey(userId), '1')
    } catch {
      // 存储不可用时只在当前渲染周期内关闭，不影响资料保存。
    }
  }
  qqReminderDismissed.value = true
}

const showQqReminder = computed(
  () =>
    needsQq.value &&
    !qqReminderDismissed.value &&
    // 设置页自己有这条提醒（就贴在 QQ 号输入框上面），全站这条在那页是重复的第二遍。
    route.path !== '/settings',
)

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

/** 页码读数：`P.02/05`。它是**导航序号**，不是虚构的文档页码 ——
 *  学生端这一栏就是终端里的五个视图，读数说的是"你在第几个"。
 *  当前路径不在导航里时给 `--/--`（比如从别处落到某个学生路由），
 *  不猜一个数字出来。 */
const pageNo = computed(() => {
  const index = navItems.value.findIndex((item) => item.to === currentPath.value)
  if (index < 0) return '--/--'
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(index + 1)}/${pad(navItems.value.length)}`
})

// 缺 QQ 号的提醒（main 带过来的）：账号一换就重算一次。
watch(() => auth.user?.id, syncQqReminder, { immediate: true })

onMounted(() => {
  void announcement.load()
})
</script>

<template>
  <!-- 安全区：viewport-fit=cover 之下页面会铺到刘海/圆角/home 指示条底下，
       所以顶部与左右两边的内边距交给环境变量。底部标签栏那条在它自己身上。
       data-shell：只有这一端的窄屏有固定底栏，所以「页面底下那一角要留给谁」是按外壳
       分的（见 base.css 的 .watermark）。 -->
  <div
    class="flex min-h-full flex-col"
    data-shell="student"
    style="
      padding-left: env(safe-area-inset-left);
      padding-right: env(safe-area-inset-right);
    "
  >
    <header
      class="sticky top-0 z-20 border-b"
      style="
        background-color: color-mix(in srgb, var(--background) 96%, transparent);
        border-color: var(--border);
        padding-top: env(safe-area-inset-top);
      "
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
            class="nav-link flex items-center gap-1.5 px-3 py-2 text-sm font-semibold no-underline"
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
        <!-- 主题切换原来拆掉过一次（主题跟系统偏好走），2026-09-18 补回来 ——
             系统偏好是对的默认值，但不是所有人都会去改系统设置。 -->
        <div class="ml-auto flex items-center gap-2">
          <ChromeActions />
          <!-- 终端读数：与学生端这一页的编号同源，也是四角装饰里"右上角那一件"。
               窄屏藏起来 —— 顶栏在 375px 上已经很挤。 -->
          <span class="readout hidden lg:inline" aria-hidden="true">STUDENT TERMINAL</span>
          <UserMenu v-if="auth.isLoggedIn" />
        </div>
      </div>
    </header>

    <AnnouncementBar />

    <div v-if="showQqReminder" class="mx-auto w-full max-w-6xl px-3 pt-3 sm:px-5 sm:pt-4">
      <NAlert type="warning" :bordered="false" closable @close="dismissQqReminder">
        这个账号还没有 QQ 号，取件邮件提醒将无法送达；补充 QQ 后，其他资料也才能正常保存。
        <RouterLink
          :to="{ name: 'student-settings' }"
          class="ml-1 font-semibold underline underline-offset-2"
          style="color: var(--warn)"
        >
          去设置补充
        </RouterLink>
      </NAlert>
    </div>

    <!-- min-w-0 不能省：main 是 flex 子项，默认的 min-width:auto 会让它被内部
         min-content 顶宽（窄屏下表现为整页多出 24px 横向滚动），必须显式允许收缩。 -->
    <main class="sheet relative mx-auto w-full min-w-0 max-w-6xl flex-1 overflow-x-clip px-3 pt-4 pb-24 sm:px-5 sm:pt-6 sm:pb-10">
        <!-- 括角与竖向刻度各自独立成层：视差要给它们不同的速率，而背景图没法单独 transform。 -->
        <span
          class="frame-brackets pointer-events-none absolute inset-1.5"
          data-parallax
style="--depth: 4px"
          aria-hidden="true"
        />
        <span
          class="vticks pointer-events-none absolute top-0 bottom-0 left-0"
          data-parallax
style="--depth: 4px"
          aria-hidden="true"
        />
        <!-- 右边是读数沟：左尺右沟，像一块屏的标尺与滚动沟。两件东西分列内容区两缘，
             所以不会像之前括角与竖刻度那样叠在一起。
             （它上一版是"穿孔边"—— 那是装订线的语言，属于纸；沟槽是屏的语言。） -->
        <span
          class="decor-rail pointer-events-none absolute top-2 right-0 bottom-2 w-4"
          data-parallax
style="--depth: 3px"
          aria-hidden="true"
        />
      <span
        class="watermark"
        data-parallax
style="--depth: 20px"
        aria-hidden="true"
      >
        {{ route.meta.code }}
      </span>
      <!-- profile="inline"：这一层 stage 只包 <main> 里的页面组件，本站唯一的 fixed
           （下面那条底部标签栏）与各条 sticky 顶栏都在它之外，所以可以接回横向接入语汇。
           换场覆盖层的档位由它决定：子页档短、缝窄，外壳档（App.vue）拉满。 -->
      <!-- 页面内容本体也是一层：它比纸边刻度更近、比水印更远。
           这一层只加 transform，不动布局；站内没有任何 fixed/sticky 在 views/ 与
           components/ 里（已核对），所以给内容加包含块是安全的。 -->
      <div data-parallax style="--depth: 5px">
        <RouterView v-slot="{ Component }">
          <RouteTransition :transition-key="currentPath" profile="inline">
            <component :is="Component" />
          </RouteTransition>
        </RouterView>
      </div>
          <!-- 底部状态带：一块**状态栏**，不是一行页码装饰。
           三件事各自对上一个真实的量：状态灯对"已登录的会话"（这一整层本来就在
           路由守卫后面，能渲染出来就是活的）、编号对当前页、P.nn/NN 对导航序号。
           之所以把它做成这个形状：纸上的页脚是静止的（页码、版号），
           而屏幕上的页脚是**活的**（连接、进度、时间）—— 一只会呼吸的灯
           比任何纹理都更快地说明"这是一块屏"。 -->
            <!-- 状态带留在文档流里（随页面滚动），但**参与视差** ——
           它与上面的内容同属"这一页的纸"，所以取同一个深度（内容层也是 5）。
           曾经把它做成 sticky 浮在视口底部，那会压住滚动中的内容（要实底），
           而且窄屏还要躲开固定标签栏 —— 代价大于收益，退回文档流。 -->
      <div
        class="mt-8 flex items-center gap-3 border-t pt-1.5"
        style="border-color: var(--border); --depth: 5px"
        data-parallax
      >
        <!-- 灯与它的标签整块 aria-hidden：这是一块**状态栏装饰**，
             不是一条要读的信息（"已登录"从页面本身就看得出）——
             而会呼吸的读数进朗读流只会变成噪声。 -->
        <span class="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span class="status-led" />
          <span class="readout">SESSION ACTIVE</span>
        </span>
        <span class="readout hidden shrink-0 sm:inline">
          {{ route.meta.code ?? '--' }} // PRINT SERVICE
        </span>
        <span class="ticks min-w-8 flex-1" aria-hidden="true" />
        <span class="readout shrink-0" aria-hidden="true">P.{{ pageNo }}</span>
      </div>
      <!-- 装饰条：危险斜纹块 + 半调网点 + 括角坐标框 + 版号读数。
           放在文档流末尾，所以永远不会压到内容上。 -->
      <DecorStrip :code="route.meta.code" />

      <!-- 左下角的斜切色块：四角里唯一"没有功能"的一角，用一块平行四边形压住空处。
           它贴在左下、尺寸很小，且不载任何文字，所以不碰"纹理压文字"那条红线。 -->
      <span
        class="cut pointer-events-none absolute bottom-6 left-0 h-3.5 w-10 bg-[var(--accent-tint)]"
        data-parallax
style="--depth: 6px"
        aria-hidden="true"
      />
    </main>

    <!-- 底部标签栏：窄屏用，与上面横向导航在 md 断点交接。
         列数跟着导航项走，管理员会多一条"管理控制台"

         这一栏的字只有 11px，是全站最小的一档，所以两态都得按小字的 4.5:1 来选色：
         激活态原来读 --primary(#d4a017)，在页面底上只有 2.26:1；未激活态原来读
         --text-quaternary(40% 黑，等效 #9c9c9c)只有 2.61:1。这里换成 --accent-text
         （5.20:1）与 --text-tertiary（等效 #6e6e6e，4.84:1）。
         这一栏没有色条/下划线，激活态本来就只靠颜色区分，因此必须真的过 AA。
         上面那排横向导航不同：它的文字是 --foreground，本来就合格，不动。 -->
    <!-- 高度写死（含安全区），而不是让内容把它撑出来：它读 tokens.css 的 --chrome-tabbar-h，
         页面右下角那枚编号水印的让位距离读的也是它。栏高由内容撑的话，这一对角上的两件
         东西就各自漂了 —— 而漂开的表现只是"水印被切掉半截"，没人会想到是这里。 -->
    <nav
      class="fixed inset-x-0 bottom-0 z-20 grid border-t md:hidden"
      :style="{
        gridTemplateColumns: `repeat(${navItems.length}, minmax(0, 1fr))`,
        backgroundColor: 'color-mix(in srgb, var(--background) 96%, transparent)',
        borderColor: 'var(--border)',
        height: 'calc(var(--chrome-tabbar-h) + env(safe-area-inset-bottom))',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
      }"
      aria-label="主导航"
    >
      <!-- 顶边刻度带：与页面里的刻度尺同一套节奏，让标签栏也属于这份"文件"。 -->
      <span class="ticks pointer-events-none absolute inset-x-0 top-0" aria-hidden="true" />
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="relative flex flex-col items-center gap-1 py-2.5 no-underline"
        :style="
          currentPath === item.to
            ? { color: 'var(--accent-text)' }
            : { color: 'var(--text-tertiary)' }
        "
      >
        <!-- 激活记号：一小段斜切色条，压在格子顶边。
             比"整块填充"轻，但因为它斜着，比一条直线更像"贴上去的标签"。 -->
        <span
          v-if="currentPath === item.to"
          class="cut absolute -top-px h-1 w-7 bg-[var(--accent-text)]"
          aria-hidden="true"
        />
        <component :is="item.icon" :size="19" />
        <!-- w-full + truncate 是给「管理员看学生端」那种情形兜底的：
             他的标签栏比别人多一格（6 列），320px 屏上每列只剩 ~52px，
             「管理控制台」五个字放不下。不加的话是硬溢出，会把整页顶出横向滚动条，
             而截断只是这几个字变成「管理控…」—— 图标还在，认得出是哪个入口。 -->
        <span class="w-full truncate text-center text-xs font-semibold">{{ item.label }}</span>
      </RouterLink>
    </nav>
  </div>
</template>
