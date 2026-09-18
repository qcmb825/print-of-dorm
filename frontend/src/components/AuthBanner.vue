<script setup lang="ts">
/** 认证回执条：登录成功后**从右缘滑入的一条贯穿屏幕的横条**，跨换场留在屏幕上。
 *
 *  为什么是"横条"而不是右上角的小卡片：
 *  这一下发生在外壳换场期间 —— 屏幕上正有一块擦除面板横着切过去。
 *  一条横贯全宽的条子和那块面板是**同一套语汇**（都是"截断屏幕的一道"），
 *  角落里的小卡片在那个语境里会显得是另一个系统弹出来的东西。
 *
 *  为什么压在顶栏之上（而不是贴在顶栏下面）：
 *  顶栏高度会变（公告条有无、sm 断点 56/64px），要"贴在某条下面"就得让布局把
 *  chrome 高度报上来 —— 为一个 2.4 秒的回执不值得引入这条耦合。
 *  它整条 pointer-events: none，所以盖着也点得到下面的一切，而且到点自己退场。
 *
 *  内容排成一行（机能风的做法：一条横向读数带）：状态块 → AUTH OK → 认证成功 →
 *  昵称（角色）· 正在进入 X → 右侧刻度与时间戳；底边一条会排空的进度线。
 *  窄屏砍掉"正在进入…"与时间戳，只留一条能一眼扫过的读数。
 *
 *  无障碍：整条 role="status"（读屏播报"认证成功 / 昵称 角色 / 正在进入 X"），
 *  装饰件（状态块、刻度、进度线）各自 aria-hidden。减少动效由 base.css 末尾的
 *  全局兜底接管（位移被压掉，退成原地出现）。
 */
import { computed } from 'vue'
import { CircleCheck } from '@lucide/vue'
import { authBanner } from '@/composables/auth-banner'

const info = computed(() => authBanner.receipt.value)

/** 回执上的时间戳：本机时间，与页面头部的 SYNC 同一套读数。 */
const stamp = computed(() => {
  const d = new Date()
  const p = (n: number) => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
})
</script>

<template>
  <Teleport to="body">
    <Transition name="auth-band">
      <div v-if="authBanner.open.value && info" class="auth-band" role="status">
        <span
          class="grid size-6 shrink-0 place-items-center"
          style="background-color: var(--status-done-bg); color: var(--status-done)"
          aria-hidden="true"
        >
          <CircleCheck :size="15" />
        </span>

        <span class="readout shrink-0" style="color: var(--status-done)">AUTH OK</span>
        <span class="shrink-0 font-heading text-sm font-bold">认证成功</span>

        <span class="min-w-0 truncate text-xs text-ink-3">
          {{ info.nickname }}（{{ info.role }}）
          <span class="hidden sm:inline">· 正在进入{{ info.target }}</span>
        </span>

        <!-- 右侧读数带：刻度 + 时间戳。机能风里"这一条是系统自己报的"靠这截收尾。 -->
        <span class="ml-auto hidden shrink-0 items-center gap-3 sm:flex" aria-hidden="true">
          <span class="ticks w-24" />
          <span class="readout">{{ stamp }}</span>
        </span>

        <!-- 排空线：贴着底边，在停留时长里从左排到右。
             它把"这条回执还剩多久"画出来 —— 到点自己退场这件事不该让用户猜。
             只动 transform（合成属性），不是 width。 -->
        <span class="auth-band__drain" aria-hidden="true" />
      </div>
    </Transition>
  </Teleport>
</template>
