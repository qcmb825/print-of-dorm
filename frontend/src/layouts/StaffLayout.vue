<script setup lang="ts">
/** 管理端布局：桌面用左侧固定导航，窄屏收进抽屉（管理员也可能拿手机用）。 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import {
  ClipboardCheck,
  LayoutDashboard,
  Megaphone,
  Menu,
  MessageSquare,
  Package,
  Printer,
  ShieldCheck,
  Users,
} from '@lucide/vue'
import { NDrawer, NDrawerContent, useMessage } from 'naive-ui'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import DecorStrip from '@/components/DecorStrip.vue'
import AnnouncementBar from '@/components/AnnouncementBar.vue'
import BrandMark from '@/components/BrandMark.vue'
import ChromeActions from '@/components/ChromeActions.vue'
import RouteTransition from '@/components/RouteTransition.vue'
import UserMenu from '@/components/UserMenu.vue'
import { useAnnouncementStore } from '@/stores/announcement'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const announcement = useAnnouncementStore()
const message = useMessage()

const drawerOpen = ref(false)

/** 账号管理对**所有管理员**开放。
 *
 *  普通管理员也看得到这份名单（服务端已经把默认管理员那一行滤掉了），
 *  只是看不到密码、也没有任何改动入口 —— 那些入口在高级视图里。
 *  这里原本写的是 show: auth.isSuper，而对外角色早就收敛成 admin 和 user 两种，
 *  那个判断永远为假，于是整栏入口静默消失。用户看到的就是「新版界面少了一栏」。 */
const navItems = computed(() =>
  [
    { to: '/staff/orders', label: '订单台', icon: Package, show: true },
    { to: '/staff/dashboard', label: '数据看板', icon: LayoutDashboard, show: true },
    { to: '/staff/audits', label: '身份审核', icon: ClipboardCheck, show: true },
    { to: '/staff/tickets', label: '工单处理', icon: MessageSquare, show: true },
    { to: '/staff/announcements', label: '公告管理', icon: Megaphone, show: true },
    // 打印选项在公告管理后面、账号管理前面：它也是「内容维护」那一类，
    // 而账号管理涉及权限，习惯上放最后。这里对所有管理员可见，理由见该页顶部注释。
    { to: '/staff/print-options', label: '打印选项', icon: Printer, show: true },
    { to: '/staff/users', label: '账号管理', icon: Users, show: true },
  ].filter((item) => item.show),
)

/** 高级视图的隐藏入口：连点品牌图标 5 次。
 *
 *  为什么用这种入口：它既不该被误触，也不该在界面上留任何痕迹 ——
 *  摆一个按钮出来，等于告诉所有人「这里还藏着个高级视图」。
 *
 *  五下必须**连续**（每两下间隔不超过 CLICK_GAP）：否则一天里分五次点 logo 回首页，
 *  也会把高级视图打开，而当事人根本不知道发生了这件事。
 *  入口没有任何提示和动画，这也正意味着写错了不会有人来报错。 */
const CLICK_TARGET = 5
const CLICK_GAP = 700
let brandClicks = 0
let brandTimer: number | undefined

function onBrandClick(event: MouseEvent): void {
  // 一下都不放行 —— 以前写的是「点满五下才拦」，于是前四下照旧跳首页：
  // 导航一完成 StaffLayout 就卸载了，计数跟着归零，人手几乎点不到第五下，
  // 中途还会莫名其妙被弹去首页（浏览器里真点过一次才看见）。
  // 所以改成全拦，要不要走、走去哪都由这里自己定。
  // 只能在**捕获**阶段拦 —— RouterLink 自己的 click 处理跑在目标阶段。
  // 副作用是窄屏抽屉里那句「点一下收起抽屉」也拦掉了，抽屉改在下面的超时分支里收。
  event.preventDefault()
  event.stopPropagation()

  window.clearTimeout(brandTimer)
  brandClicks += 1
  if (brandClicks >= CLICK_TARGET) {
    brandClicks = 0
    if (!auth.toggleAdvanced()) return
    // 没资格的人连点五下什么都不给（连提示都不给）：一句「你没有更多视图」
    // 等于承认这里有个按权限开放的东西，反倒把入口卖了。
    message.success(auth.advanced ? '已切换到高级视图' : '已切回普通视图')
    return
  }
  // 还没点满：先等一小会儿再当普通点击处理。要是不等就立刻跳走，
  // 后面几下的落点就变成了新页面 —— 入口等于只有一只手能摸到。
  brandTimer = window.setTimeout(() => {
    brandClicks = 0
    drawerOpen.value = false
    // 回「首页」交给路由守卫按角色分流：管理员的首页是控制台，学生才去下单页。
    void router.push('/')
  }, CLICK_GAP)
}

/** 高级视图提示条上的退出按钮走同一条路。 */
function exitAdvanced(): void {
  auth.toggleAdvanced()
}


const currentPath = computed(() => route.path)

/** 导航高亮只认「当前在哪一栏」，而不是「当前在哪一个地址」。
 *
 *  订单详情页（/staff/orders/12）挂在订单台底下，用整段字符串比对的话，
 *  点进详情页整栏里一个都不亮 —— 看起来像「这一页不属于任何地方」，
 *  而且不报错、类型检查也查不出来。
 *  前缀匹配必须带上斜杠：只比 `startsWith(path)` 的话，
 *  将来多一个 /staff/orders-archive 就会被顺手点亮。 */
const activeNav = computed(() => {
  const path = currentPath.value
  if (navItems.value.some((item) => item.to === path)) return path
  const parent = path.slice(0, path.lastIndexOf('/'))
  return navItems.value.some((item) => item.to === parent) ? parent : path
})

/** 页码读数：`P.03/07`。取的是**当前栏位在导航里的序号**（activeNav 已经把
 *  "详情页算在它所属的栏目下"这件事处理掉了），不是路由序号 ——
 *  订单详情那种子页面如果按路由序号走，序号会跟着订单 id 变，那就不是页码了。
 *  不在任何栏目下时给 `--/--`，不猜一个数字出来。 */
const pageNo = computed(() => {
  const index = navItems.value.findIndex((item) => item.to === activeNav.value)
  if (index < 0) return '--/--'
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${pad(index + 1)}/${pad(navItems.value.length)}`
})

/** 导航成功就清掉品牌连点定时器：连点 logo 1-4 下之后立刻点侧栏导航，
 *  那个 700ms 的 setTimeout 并不会因为换了页就失效 —— 到点仍会把用户拽回首页。
 *  这里用路由变化当作「导航成功」的信号，侧栏、抽屉、程序化跳转都能覆盖到。 */
watch(currentPath, () => {
  window.clearTimeout(brandTimer)
  brandTimer = undefined
})

/** 卸载时再清一道：定时器到点会 push('/')，组件都没了还留着它，
 *  等于给一个已经不存在的页面留了一次跳转。 */
onBeforeUnmount(() => {
  window.clearTimeout(brandTimer)
})

const currentTitle = computed(() => (route.meta.title as string | undefined) ?? '管理控制台')

onMounted(() => {
  void announcement.load()
})
</script>

<template>
  <div class="flex min-h-full">
    <!-- 侧栏同样去掉了卡底（原先是 60% 的 --card 半透明底）。现在全站的区块都只有
         细线与留白，侧栏也只剩右侧那一条描边 —— 它是页面 chrome 的一部分，不再是一块面板。 -->
    <aside
      class="sticky top-0 hidden h-screen w-[236px] shrink-0 flex-col border-r lg:flex"
      style="border-color: var(--border)"
    >
      <span class="vticks pointer-events-none absolute top-0 right-0 bottom-0" aria-hidden="true" />
      <!-- 品牌图标上挂着高级视图的隐藏入口（连点 5 次，见 onBrandClick）。
           .capture 是必须的：要在 RouterLink 自己处理之前决定这一下要不要放行。 -->
      <div class="px-5 pt-5 pb-4" @click.capture="onBrandClick">
        <BrandMark />
        <!-- 状态牌：纯装饰的技术读数，与页面标题下那行同一套字（.readout）。 -->
        <p class="readout mt-3">STAFF CONSOLE</p>
      </div>
      <!-- 导航一项的文字：激活态走 --accent-text 而不是 --primary ——
           --primary 是给色条/色块用的，#d4a017 铺在 --muted 上只有 2.16:1，
           13px 读不清。左边那根色条（.nav-link--active::before）仍是 --primary，
           所以激活态本来就不止颜色一条线索，这里换的只是「文字」这一层。
           未激活态用 --text-tertiary（60% 黑，等效 #6e6e6e，在 --muted 上 4.77:1）。 -->
      <nav class="flex flex-col gap-1 px-3" aria-label="管理导航">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="nav-link flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold no-underline"
          :class="activeNav === item.to && 'nav-link--active'"
          :style="
            activeNav === item.to
              ? { backgroundColor: 'var(--muted)', color: 'var(--accent-text)' }
              : { color: 'var(--text-tertiary)' }
          "
        >
          <component :is="item.icon" :size="16" />
          {{ item.label }}
        </RouterLink>
      </nav>
      <!-- 账号区下面一行是外壳动作（主题、去学生端）。原来这里只有账号那一个按钮，
           主题入口拆掉过一次；现在两个都回来了 —— 管理端还有一个反方向的缺口：
           学生端那边早就有一项「管理控制台」，管理端却只能手敲 URL 才能过去。 -->
      <!-- 高级视图开着的时候给一条可见的提示。不给提示的话，管理员会分不清
           自己看到的界面是不是别人也这样 —— 而这两个界面恰恰是不同的。
           退出按钮只对已经打开的人可见，所以它不算泄露入口。
           文字同样走 --accent-text：这行只有 11px，铺在 accent-tint-soft 上
           --primary 只有 2.09:1，而小字要 4.5:1（--accent-text 在同底上 4.82:1）。 -->
      <div
        v-if="auth.advanced"
        class="mx-3 mb-2 flex items-center gap-2 border px-3 py-2 text-xs"
        style="
          border-color: var(--accent-tint-border);
          background-color: var(--accent-tint-soft);
          color: var(--accent-text);
        "
      >
        <ShieldCheck :size="14" aria-hidden="true" />
        <span class="flex-1 font-semibold leading-tight">高级视图已开启</span>
        <button type="button" class="font-semibold underline" @click="exitAdvanced">
          退出
        </button>
      </div>
      <div
        class="mt-auto flex flex-col gap-1 border-t px-3 py-3"
        style="border-color: var(--border)"
      >
        <UserMenu stacked class="min-w-0" />
        <ChromeActions student-switch />
      </div>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <header
        class="hazard-bottom sticky top-0 z-20 flex h-14 items-center gap-2 border-b px-3 lg:hidden"
        style="
          background-color: color-mix(in srgb, var(--background) 96%, transparent);
          border-color: var(--border);
          padding-top: env(safe-area-inset-top);
          padding-left: calc(0.75rem + env(safe-area-inset-left));
          padding-right: calc(0.75rem + env(safe-area-inset-right));
        "
      >
        <NDrawer v-model:show="drawerOpen" :width="248" placement="left">
          <NDrawerContent :native-scrollbar="false" body-content-style="padding: 0">
            <!-- 窄屏也要有那个隐藏入口：管理员同样会拿手机用。
                 抽屉里原本没有品牌图标，这里补一个，两套布局的入口就都在同一处。
                 这里刻意没有「点一下收起抽屉」：捕获阶段已经 stopPropagation，写了也不会执行，
                 而且连点期间抽屉必须留着 —— 收起来就等于第一下把自己的后续点击关掉了。
                 收抽屉在 onBrandClick 的超时分支里做。 -->
            <div class="px-5 py-4" @click.capture="onBrandClick">
              <BrandMark />
            </div>
            <!-- 窄屏抽屉里的导航跟侧栏同一套配色，理由见上面侧栏那处注释。 -->
            <div class="flex flex-col gap-1 px-3 py-2">
              <RouterLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="nav-link flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold no-underline"
                :class="activeNav === item.to && 'nav-link--active'"
                :style="
                  activeNav === item.to
                    ? { backgroundColor: 'var(--muted)', color: 'var(--accent-text)' }
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
          class="grid size-9 place-items-center"
          style="color: var(--text-secondary)"
          aria-label="打开导航菜单"
          @click="drawerOpen = true"
        >
          <Menu :size="19" />
        </button>
        <span class="flex items-center gap-2">
          <Printer :size="16" style="color: var(--accent-text)" aria-hidden="true" />
          <span class="font-heading text-base font-bold">{{ currentTitle }}</span>
        </span>
        <div class="ml-auto flex items-center gap-1">
          <ChromeActions student-switch />
          <!-- 窄屏没有侧栏那条提示带，所以把标识收成一颗图标 —— 点它就退出。 -->
          <button
            v-if="auth.advanced"
            type="button"
            class="grid size-9 place-items-center"
            style="color: var(--accent-text)"
            title="退出高级视图"
            aria-label="退出高级视图"
            @click="exitAdvanced"
          >
            <ShieldCheck :size="18" />
          </button>
          <UserMenu />
        </div>
      </header>

      <AnnouncementBar />

      <main class="sheet relative min-w-0 flex-1 overflow-x-clip px-3 py-4 sm:px-5 sm:py-6 lg:pl-8">
        <!-- 括角与竖向刻度各自独立成层：视差要给它们不同的速率，而背景图没法单独 transform。 -->
        <span
          class="frame-brackets pointer-events-none absolute inset-1.5"
          data-parallax
style="--depth: 4px"
          aria-hidden="true"
        />
        <span
          class="vticks pointer-events-none absolute top-0 bottom-0 left-0 lg:left-2"
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
        <!-- profile="inline"：这层 stage 只包 <main> 里的页面组件，左侧 sticky 侧栏、
             窄屏 sticky 顶栏与站内唯一的 fixed 底栏都在它之外，所以可以接回横向接入语汇。 -->
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
            <!-- 底部状态带：与用户端同一块状态栏 —— 活的灯 + 当前栏位 + 导航序号。
           两侧共用同一件东西是有意的：它是这套界面的"外壳"，而外壳在两端应当是同一个。 -->
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
        class="cut pointer-events-none absolute bottom-6 left-0 h-3.5 w-10 bg-[var(--accent-tint)] lg:left-2.5"
        data-parallax
style="--depth: 6px"
        aria-hidden="true"
      />
    </main>
    </div>
  </div>
</template>
