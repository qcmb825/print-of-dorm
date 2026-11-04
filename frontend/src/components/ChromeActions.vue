<script setup lang="ts">
/** 外壳上的小动作：（管理端才有的）去学生端的入口。
 *
 *  为什么做成一个组件、而不是各写各的：它在三个地方出现 —— 学生端顶栏、管理端侧栏底部、
 *  管理端窄屏顶栏 —— 而"外壳在两端应当是同一个"是这套界面的既定规矩（见两个布局里状态带
 *  那处注释）。分开写三遍，下一次调尺寸或换图标就一定会漏掉一个。
 *
 *  形态：36px 方框、颜色走 --text-secondary。**无边框、无底色不是这里写的** ——
 *  那是 base.css 里对裸 <button> 的外观重置（这条注释原来写着"无边框"，
 *  但样式从没落地，浏览器默认的那层灰斜面一直都在，直到被截图报出来）。
 *  不写圆角也不写阴影 —— 这套界面里所有圆形与投影都已经清掉了（见 DESIGN_RULES）。
 *
 *  ⚠️ 亮暗切换那颗按钮**曾经**被拆掉（2026-09-21，业主要求网页一律亮色）。
 *  2026-11 恢复：切主题要过一次换场面板（见 stores/theme.ts 的 toggle）——
 *  它不是"翻一下颜色"那么轻的动作，同一台机器换档就该有换挡的动作。
 *
 *  去学生端那一个只给管理端：学生端通往管理端的入口早就有了（导航里那一项
 *  「管理控制台」，只对 isStaff 出现），反方向却只能手敲 URL。
 */
import { GraduationCap, Moon, Sun } from '@lucide/vue'
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

withDefaults(
  defineProps<{
    /** 出不出"去学生端"那颗。管理端三处都传 true，学生端不传（他已经在学生端了）。 */
    studentSwitch?: boolean
  }>(),
  { studentSwitch: false },
)

const theme = useThemeStore()
/** 提示语说的是"点下去会变成什么"，不是"现在是什么"。 */
const themeLabel = computed(() => (theme.isDark ? '切换到亮色' : '切换到暗色'))
</script>

<template>
  <div class="flex items-center">
    <!-- 亮暗切换。图标给的是**下一步**：亮着出月亮、暗着出太阳，
         两个图标都是这套界面里已有的（lucide 线性图标），不另引入风格。 -->
    <button
      type="button"
      class="tap-area icon-btn grid size-9 place-items-center"
      style="color: var(--text-secondary)"
      :title="themeLabel"
      :aria-label="themeLabel"
      @click="theme.toggle()"
    >
      <Moon v-if="!theme.isDark" :size="18" aria-hidden="true" />
      <Sun v-else :size="18" aria-hidden="true" />
    </button>
    <!-- 去学生端。落点就是学生端的首页（/upload，路由表里 '' 重定向到它），
         不猜"他上次待在哪一页"——那个状态没有存过，猜出来的多半是错的。 -->
    <RouterLink
      v-if="studentSwitch"
      to="/upload"
      class="tap-area icon-btn grid size-9 place-items-center no-underline"
      style="color: var(--text-secondary)"
      title="切换到学生端"
      aria-label="切换到学生端"
    >
      <GraduationCap :size="18" aria-hidden="true" />
    </RouterLink>
  </div>
</template>
