<script setup lang="ts">
/** 外壳上的两颗小动作：亮暗切换，以及（管理端才有的）去学生端的入口。
 *
 *  为什么做成一个组件、而不是各写各的：它在三个地方出现 —— 学生端顶栏、管理端侧栏底部、
 *  管理端窄屏顶栏 —— 而"外壳在两端应当是同一个"是这套界面的既定规矩（见两个布局里状态带
 *  那处注释）。分开写三遍，下一次调尺寸或换图标就一定会漏掉一个。
 *
 *  形态跟着站内既有的那颗图标按钮走：36px 方框、无边框、颜色走 --text-secondary。
 *  不写圆角也不写阴影 —— 这套界面里所有圆形与投影都已经清掉了（见 DESIGN_RULES）。
 *
 *  主题那一个**两个端都出**：它原本在两端都有一份，阶段 2 连同圆形按钮一起被拆掉，
 *  之后主题只跟系统偏好走。现在补回来的是入口，不是机制 —— stores/theme.ts 的
 *  toggle() 一直在那儿等着，这次只是终于有了调用方。
 *
 *  去学生端那一个只给管理端：学生端通往管理端的入口早就有了（导航里那一项
 *  「管理控制台」，只对 isStaff 出现），反方向却只能手敲 URL。
 */
import { GraduationCap, Moon, Sun } from '@lucide/vue'
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
</script>

<template>
  <div class="flex items-center">
    <!-- 主题只有两个状态，所以用一颗按钮来回切（保留原 ThemeToggle 的做法）。
         图标与提示都跟着**当前状态**说"点了会变成什么"，不是"现在是什么" ——
         月亮图标配"切换到深色主题"，这是按钮的读法。 -->
    <button
      type="button"
      class="tap-area grid size-9 place-items-center"
      style="color: var(--text-secondary)"
      :title="theme.isDark ? '切换到浅色主题' : '切换到深色主题'"
      :aria-label="theme.isDark ? '切换到浅色主题' : '切换到深色主题'"
      @click="theme.toggle()"
    >
      <Sun v-if="theme.isDark" :size="17" aria-hidden="true" />
      <Moon v-else :size="17" aria-hidden="true" />
    </button>

    <!-- 去学生端。落点就是学生端的首页（/upload，路由表里 '' 重定向到它），
         不猜"他上次待在哪一页"——那个状态没有存过，猜出来的多半是错的。 -->
    <RouterLink
      v-if="studentSwitch"
      to="/upload"
      class="tap-area grid size-9 place-items-center no-underline"
      style="color: var(--text-secondary)"
      title="切换到学生端"
      aria-label="切换到学生端"
    >
      <GraduationCap :size="18" aria-hidden="true" />
    </RouterLink>
  </div>
</template>
