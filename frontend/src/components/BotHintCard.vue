<script setup lang="ts">
/** QQ 机器人引导：右下角的悬浮提示，引导学生用 QQ 发文件下单。
 *
 *  **出现规则**（与 routes/bot_hint.py 开头那段是同一套，改一处要改两处）：
 *    · 已登录：服务端记「点掉过几次」，点满 `max_clicks` 次就永久收起；
 *      收起之后**收进设置页**（那一块能重新打开、也能扫二维码），
 *      所以这里收起时要说一句「已在设置里」，不能只是默默消失 ——
 *      默默消失的用户下次想找机器人号会找不到。
 *    · 未登录（登录页 / 注册页）：没有账号可记，**不设永久关闭**，
 *      只用 sessionStorage 记「这一屏会话里别再挡我」，退出重进还会看到。
 *      引导的目的正是把「还没用机器人下单的人」拉过去，对陌生人关掉它没意义。
 *
 *  为什么放右下角、且在窄屏往上抬：学生端底部有一条固定标签栏，
 *  贴在 `bottom-4` 会正好压住「我的订单」那一个按钮（点了没反应，最像坏了）。
 */
import { onMounted, ref } from 'vue'
import { QrCode, X } from '@lucide/vue'
import { ApiError } from '@/api/client'
import { BOT_QR_URL, botHintApi } from '@/api/endpoints'
import type { BotHint } from '@/api/types'

const props = withDefaults(
  defineProps<{
    /** 未登录场景（登录页 / 注册页）：关闭只记在本次会话里，不做永久关闭 */
    guest?: boolean
  }>(),
  { guest: false },
)

const SESSION_KEY = 'pod-bot-hint-hidden'

const visible = ref(false)
const hint = ref<BotHint | null>(null)
const qrOk = ref(true)
const closing = ref(false)
/** 刚刚点满最后一次：卡片上换一句「已收进设置页」再消失 */
const justClosed = ref(false)

onMounted(async () => {
  // 未登录：只看这一屏会话关没关过（不碰服务端，也没有账号可记）
  if (props.guest) {
    try {
      visible.value = sessionStorage.getItem(SESSION_KEY) !== '1'
    } catch {
      visible.value = true        // 隐私模式下 sessionStorage 会抛，那就照常显示
    }
    return
  }
  try {
    const data = await botHintApi.get()
    hint.value = data
    visible.value = !data.closed
  } catch (error) {
    //    拿不到就不显示。这是**引导**，不是功能：为它弹一个错误提示
    //    （「偏好没拉到」那种）只会让页面看起来像坏了，而用户什么都没做错。
    if (!(error instanceof ApiError)) throw error
    visible.value = false
  }
})

async function dismiss(): Promise<void> {
  if (closing.value) return
  closing.value = true
  try {
    if (props.guest) {
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* 存不下就算了：这一屏不显示，下次进来还会看到（本来就不设永久关闭） */
      }
      visible.value = false
      return
    }
    const data = await botHintApi.dismiss()
    hint.value = data
    if (data.closed) {
      //    点满了：先说一句「去哪找」，再收起来。直接消失的话，用户下次
      //    想找机器人号会以为这功能没了。
      justClosed.value = true
      window.setTimeout(() => {
        visible.value = false
      }, 2600)
    } else {
      visible.value = false
    }
  } catch (error) {
    if (!(error instanceof ApiError)) throw error
    // 连不上就先藏起来：用户点的是「关闭」，跟他对着干（不关）更没道理
    visible.value = false
  } finally {
    closing.value = false
  }
}
</script>

<template>
  <!--    位置：右下角。窄屏往上抬一档 —— 学生端底部有固定标签栏，
        bottom-4 正好压住「我的订单」，点了没反应最像坏了。
       z-40：低于 Naive 的弹窗/抽屉（50+），别盖住真正要用户操作的浮层。 -->
  <Transition
    enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
    enter-from-class="opacity-0 translate-y-2"
    leave-active-class="transition duration-[var(--motion-dur-fast)] ease-out"
    leave-to-class="opacity-0 translate-y-2"
  >
    <aside
      v-if="visible"
      class="fixed right-3 bottom-20 z-40 w-[min(320px,calc(100vw-1.5rem))] sm:right-5 sm:bottom-5"
      role="complementary"
      aria-label="QQ 机器人下单引导"
      style="background-color: var(--paper); border: 1px solid var(--border-strong)"
    >
      <!-- 顶部一条信号黄：与站内「这一块要你看一眼」的记号同一套语言 -->
      <span class="block h-1 w-full" style="background-color: var(--accent)"></span>

      <div class="p-3">
        <div class="flex items-start justify-between gap-2">
          <h2 class="font-heading text-sm font-bold">用 QQ 机器人下单更快</h2>
          <button
            type="button"
            class="icon-btn -mt-0.5 -mr-1 grid size-7 shrink-0 place-items-center"
            style="color: var(--text-secondary)"
            title="关闭 · 点满几次后不再自动出现 · 可在设置里找回"
            aria-label="关闭引导"
            :disabled="closing"
            @click="dismiss"
          >
            <X :size="15" aria-hidden="true" />
          </button>
        </div>

        <p v-if="justClosed" class="mt-2 text-xs leading-5" style="color: var(--secondary)">
          引导已收进「设置 → QQ 机器人」· 二维码在那一块，可重新打开。
        </p>
        <template v-else>
          <ul class="mt-1.5 flex list-none flex-col gap-0.5 p-0 text-xs leading-5 text-ink-3">
            <li>· 在 QQ 里发文件，选档位与份数下单</li>
            <li>· 打印完成即在 QQ 推送 · 凭单号取件</li>
            <li>· 网页端同样可下单 · 订单是同一份</li>
          </ul>

          <div class="mt-2 flex items-center gap-3">
            <img
              v-if="hint?.has_qr && qrOk"
              :src="BOT_QR_URL"
              alt="QQ 机器人二维码"
              class="size-20 shrink-0 border object-contain"
              style="border-color: var(--border)"
              @error="qrOk = false"
            />
            <span
              v-else
              class="grid size-20 shrink-0 place-items-center border"
              style="border-color: var(--border); color: var(--text-tertiary)"
              aria-hidden="true"
            >
              <QrCode :size="28" />
            </span>
            <p class="min-w-0 text-xs leading-5 text-ink-3">
              <template v-if="guest">
                注册后即可使用 · 二维码在设置里随时可查。
              </template>
              <template v-else-if="hint?.has_qr">
                手机 QQ 扫码加机器人 · 之后直接在 QQ 里发文件。
              </template>
              <template v-else>
                管理员尚未上传机器人二维码 · 可先在网页端下单。
              </template>
            </p>
          </div>
        </template>
      </div>
    </aside>
  </Transition>
</template>
