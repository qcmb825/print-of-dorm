<script setup lang="ts">
/** QQ 机器人引导：**屏幕正中的模态弹窗**。
 *
 *  为什么不再是右下角那块悬浮卡片（2026-09-24 改）：主人要的是「更显眼」——
 *  右下角那一小块在宽屏上太容易被当成长广告划过去，而它要传达的
 *  「不用打开网页也能下单」这件事，恰恰是没试过机器人的人最该知道的。
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
 *  **未登录也要有二维码**：这一版把图从「登录后才取」改成无条件渲染那张
 *  `/api/bot-qr`（它本来就不要求登录）。引导要拉的是还没用过机器人的人，
 *  对陌生人只给一句「注册后再说」而不给码，等于什么都没给。
 *  图裂了（管理员还没上传）时显示一个占位方框 —— 绝不显示裂图。
 *
 *  按钮分两档是刻意的：主按钮「知道了」只关这一次，下面那行小字才说明
 *  「点几次之后就不再自动出现」—— 把「永久别看」做成主按钮，
 *  等于替用户做了他没想过的决定；写清楚规则，让他自己点几次。
 */
import { onMounted, ref } from 'vue'
import { Check, QrCode } from '@lucide/vue'
import { NButton, NModal } from 'naive-ui'
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
/** 刚刚点满最后一次：弹窗里换成一句「已收进设置页」，等用户点掉再关。
 *  不用定时器自动消失 —— 那句话正是要给人看的，一闪而过还不如不说。 */
const justClosed = ref(false)

/** 已登录时的那句规则说明（次数由服务端给，前端不自己比数字）。 */
const dismissRule = ref('')

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
    dismissRule.value = `关闭 ${data.max_clicks} 次后不再自动出现 · 可在「设置」里重新打开`
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
    } else {
      visible.value = false
    }
  } catch (error) {
    if (!(error instanceof ApiError)) throw error
    // 连不上就先关掉：用户点的是「关闭」，跟他对着干（不关）更没道理
    visible.value = false
  } finally {
    closing.value = false
  }
}

/** 弹窗关闭的三个入口（右上角 X、Esc、点遮罩）都会走到这里 ——
 *  它们和点「知道了」是同一件事，所以同样要计一次数。 */
function onShowChange(value: boolean): void {
  if (!value) void dismiss()
}
</script>

<template>
  <!-- 居中模态：z-index 交给 Naive（它自带 2000+，盖得住站内一切），
       所以这一块不再自己定 z。宽度封在 520：再宽，二维码与三行说明之间
       会空出一大片，读起来反而更散。 -->
  <NModal
    :show="visible"
    preset="card"
    :bordered="false"
    class="max-w-[520px]"
    :mask-closable="true"
    :close-on-esc="true"
    @update:show="onShowChange"
  >
    <template #header>
      <div class="flex items-center gap-2.5">
        <span
          class="grid size-9 shrink-0 place-items-center border"
          style="
            background-color: var(--accent-tint);
            border-color: var(--accent-tint-border);
            color: var(--accent-text);
          "
          aria-hidden="true"
        >
          <QrCode :size="18" />
        </span>
        <span class="flex flex-col leading-tight">
          <span class="font-heading text-lg font-bold">用 QQ 机器人下单</span>
          <span class="tech-label text-ink-3 tech-label--cn text-xs">
            {{ guest ? '网页端与 QQ 是同一个账号体系' : '不必打开网页 · 在 QQ 里发文件即可' }}
          </span>
        </span>
      </div>
    </template>

    <!-- 点满之后：先说清「去哪找」，再让用户点掉 -->
    <div v-if="justClosed" class="flex flex-col items-start gap-3 py-2">
      <p class="text-sm leading-6 font-semibold">引导已收进「设置 → QQ 机器人」</p>
      <p class="text-sm leading-6 text-ink-3">
        二维码与这段说明都在那一块，随时可以重新打开。
      </p>
      <NButton type="primary" class="!font-bold" @click="visible = false">知道了</NButton>
    </div>

    <div v-else class="flex flex-col items-center gap-4 py-1">
      <!-- 二维码：无条件渲染那一张图，加载失败才落到占位框。
           尺寸给到 176px（手机上约 44mm）—— 扫得动的最小值里取了个舒服的档，
           右下角那张卡片上的 80px 在别人举着手机隔一张桌子时是真的扫不出来。 -->
      <div
        class="flex size-44 shrink-0 items-center justify-center border p-2"
        style="border-color: var(--border-strong); background-color: var(--paper)"
      >
        <img
          v-if="qrOk"
          :src="BOT_QR_URL"
          alt="QQ 机器人二维码"
          class="size-full object-contain"
          @error="qrOk = false"
        />
        <span
          v-else
          class="flex flex-col items-center gap-2 px-3 text-center"
          style="color: var(--text-tertiary)"
        >
          <QrCode :size="40" aria-hidden="true" />
          <span class="text-xs leading-5">管理员尚未上传机器人二维码</span>
        </span>
      </div>

      <ul class="flex w-full list-none flex-col gap-2 p-0 text-sm leading-6">
        <li class="flex items-start gap-2">
          <Check :size="15" class="mt-1 shrink-0" style="color: var(--secondary)" aria-hidden="true" />
          <span>扫码加机器人好友后，直接在 QQ 里发文件下单</span>
        </li>
        <li class="flex items-start gap-2">
          <Check :size="15" class="mt-1 shrink-0" style="color: var(--secondary)" aria-hidden="true" />
          <span>选档位与份数即可，单号当场给出</span>
        </li>
        <li class="flex items-start gap-2">
          <Check :size="15" class="mt-1 shrink-0" style="color: var(--secondary)" aria-hidden="true" />
          <span>打印完成会在 QQ 里推送 · 凭单号取件</span>
        </li>
      </ul>

      <!-- 未登录：说清「这个码现在就能扫，但下单要先有账号」——
           不说的话，陌生人扫完进到 QQ 里被服务端顶回来，只会以为机器人坏了。 -->
      <p
        v-if="guest"
        class="w-full border-t pt-3 text-xs leading-5 text-ink-3"
        style="border-color: var(--border)"
      >
        现在就可以扫码看看。真正下单需要先在网页端注册账号（QQ 号即账号凭证），
        注册后回到 QQ 里发文件即可。
      </p>

      <div class="flex w-full flex-wrap items-center justify-between gap-3 border-t pt-3"
           style="border-color: var(--border)">
        <span class="text-xs leading-5 text-ink-3">
          {{ guest ? '本次会话关闭后不再弹出 · 换一次刷新还会看到' : dismissRule }}
        </span>
        <NButton type="primary" class="!font-bold" :loading="closing" @click="dismiss">
          知道了
        </NButton>
      </div>
    </div>
  </NModal>
</template>
