<script setup lang="ts">
/** 认证回执横幅：登录成功后从**右侧**滑进来的一条回执，跨换场留在屏幕上。
 *
 *  为什么是"回执"而不是"提示"：登录是一次**身份被接收**的动作，这条横幅是它的回执 ——
 *  所以它有编号读数（AUTH OK）、有时间戳、有一根会排空的进度条，形状与站内其他
 *  单据（工单条、取件回执）同源；而不是一个"操作成功"的吐司。
 *
 *  三条与位置/时序有关的取舍：
 *  1. **压在场记幕布之上**（base.css 里的 z-index 300，幕布是 100）。
 *     登录成功后立刻发生外壳换场，如果横幅藏在幕布后面等 830ms 再露脸，
 *     它读起来就变成了"新页面的一个提示"，而不是"你刚被认出来的回执"。
 *  2. **挂在 App.vue 上（Teleport 到 body）**：换场会换掉整棵布局树，
 *     挂在登录页里的横幅会在换手那一帧跟着旧树被卸载。状态在 composables/auth-banner.ts。
 *  3. **垂直居中在右缘**，不是顶部：顶部 64px 是 sticky 顶栏、底部 60px 是窄屏标签栏，
 *     中间那条空带是唯一不与 chrome 抢位置的地方。
 *
 *  无障碍：整块 role="status"（读屏会播报"认证成功 / 昵称 角色 / 正在进入 X"），
 *  但整层 pointer-events: none —— 它永远不吃点击，也不需要用户回应。
 *  减少动效由 base.css 末尾那段全局兜底接管（位移被压掉，退成原地出现）。
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
    <div class="auth-banner-layer" aria-live="polite">
      <Transition name="auth-banner">
        <section v-if="authBanner.open.value && info" class="auth-banner" role="status">
          <!-- 左缘状态色条：与工单条（.wo）同源 —— 这套界面里"状态"一律给一条竖色条。 -->
          <span class="auth-banner__bar" aria-hidden="true" />

          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <span
                class="grid size-6 shrink-0 place-items-center"
                style="background-color: var(--status-done-bg); color: var(--status-done)"
                aria-hidden="true"
              >
                <CircleCheck :size="14" />
              </span>
              <span class="readout">AUTH OK</span>
              <span class="readout ml-auto shrink-0">{{ stamp }}</span>
            </div>

            <p class="mt-2 font-heading text-base font-bold">认证成功</p>
            <p class="mt-1 truncate text-xs text-ink-3">
              {{ info.nickname }}（{{ info.role }}）· 正在进入{{ info.target }}
            </p>
          </div>

          <!-- 排空条：一条 2px 的状态色线，在停留时长里从左排到右。
               它把"这条回执还剩多久"画出来 —— 回执自己会退场，这件事不该让用户猜。
               只动 transform（合成属性），不是 width。 -->
          <span class="auth-banner__drain" aria-hidden="true" />
        </section>
      </Transition>
    </div>
  </Teleport>
</template>
