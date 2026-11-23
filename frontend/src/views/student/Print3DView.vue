<script setup lang="ts">
/** 3D 打印：纯广告页 —— 指路 MakerWorld、留下联系方式，站内不下 3D 单。
 *
 *  为什么不做下单：这条线的报价跟着材料、克重和机时走，套不进「纸张 × 页数」
 *  的现有计费；在能报价之前，把「怎么开始」说清楚，比做一个残缺的下单框有用。
 *  页面因此不调任何接口：内容只有部署者自己改得动，写在前端就够 ——
 *  没有加载态、没有骨架屏、没有错误分支，也没有要轮询的东西。
 *  联系方式与登录页共用 config/contact.ts 的同一个号，别在这里抄第二份。 */
import { onBeforeUnmount, ref } from 'vue'
import { Check, Copy, ExternalLink } from '@lucide/vue'
import { NButton } from 'naive-ui'
import PageHeader from '@/components/PageHeader.vue'
import StageHead from '@/components/StageHead.vue'
import { ADMIN_QQ } from '@/config/contact'
import { copyText } from '@/composables/clipboard'
import { notify } from '@/composables/feedback'

const MAKERWORLD_URL = 'https://makerworld.com/'

const copied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | null = null

async function copyQq(): Promise<void> {
  const ok = await copyText(ADMIN_QQ)
  if (!ok) {
    notify.error('复制失败 · 选中号码手动复制')
    return
  }
  copied.value = true
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = setTimeout(() => { copied.value = false }, 2200)
}

// 与 LoginView / LotteryView 同一条口径：计时器在卸载时清掉。
// 漏了这一句的表现是「离开页面后 2.2 秒仍往一个已卸载的 ref 写值」——
// 不报错、也看不出来，但全站只有这一处不守规矩。
onBeforeUnmount(() => {
  if (copiedTimer) clearTimeout(copiedTimer)
  copiedTimer = null
})
</script>

<template>
  <div class="mx-auto max-w-3xl">
    <PageHeader
      heading="md"
      title="3D 打印"
      subtitle="模型去 MakerWorld 找 · 材料、价格、工期在 QQ 上确认"
    >
      <template #title-append>
        <span class="tech-label text-xs" style="color: var(--accent-text)">NEW</span>
      </template>
    </PageHeader>

    <!-- ① 找模型。外链用 NButton tag="a"：渲染出来是真 <a>，新标签 + noopener
         都由属性直达，不需要为一条链接发明新样式。 -->
    <StageHead code="01" title="找模型" step="STEP 1/3" class="mb-3" />
    <section class="panel panel-raised mb-4 p-4 sm:p-5">
      <p class="text-sm text-ink-2">
        MakerWorld 上现成的模型，直接发链接；没有现成的，把想法说清楚。
      </p>
      <div class="mt-3">
        <NButton
          tag="a"
          secondary
          :href="MAKERWORLD_URL"
          target="_blank"
          rel="noopener noreferrer"
        >
          <template #icon><ExternalLink :size="15" /></template>
          打开 MakerWorld
        </NButton>
      </div>
    </section>

    <!-- ② 发给我。号码用长臂角标框起来 —— 和下单回执里的单号同一套「这是要
         被记住的东西」的记号。复制失败时 toast 给动作，号码本身就在旁边可选中。 -->
    <StageHead code="02" title="发给我" step="STEP 2/3" class="mb-3" />
    <section class="panel panel-raised mb-4 p-4 sm:p-5">
      <p class="text-sm text-ink-2">
        模型链接或文件、尺寸、颜色、数量，一起发。
      </p>
      <div
        class="bracket-lg mt-3 inline-flex flex-wrap items-center gap-x-5 gap-y-3 px-5 py-3"
        style="--bracket-arm: 22px"
      >
        <div>
          <div class="tech-label tech-label--cn text-xs text-ink-3">站长 QQ</div>
          <div class="tnum font-heading text-2xl leading-tight font-bold" style="color: var(--accent-text)">
            {{ ADMIN_QQ }}
          </div>
        </div>
        <NButton
          size="small"
          secondary
          aria-live="polite"
          @click="copyQq"
        >
          <template #icon>
            <Check v-if="copied" :size="14" />
            <Copy v-else :size="14" />
          </template>
          {{ copied ? '已复制' : '复制 QQ 号' }}
        </NButton>
      </div>
    </section>

    <!-- ③ 确认开打。最后一句把「站内不下单」挑明：这页只有指路和联系方式，
         不给人留下「能在这里下单」的错误预期。 -->
    <StageHead code="03" title="确认开打" step="STEP 3/3" class="mb-3" />
    <section class="panel panel-raised mb-4 p-4 sm:p-5">
      <p class="text-sm text-ink-2">
        材料、价格、工期、取件时间在 QQ 上定。站内不下 3D 单。
      </p>
    </section>

    <!-- 洞洞板套件：不是流程的一步，用产品面板而不是 StageHead。 -->
    <section class="panel panel-raised mb-4 p-4 sm:p-5">
      <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <h2 class="font-heading text-base font-bold">拼装式洞洞板 + 上墙套件</h2>
        <span class="readout">EXTRA / KIT</span>
      </div>
      <p class="mt-2 text-sm text-ink-2">尺寸、孔距、配色按墙面来，QQ 上说。</p>
    </section>

    <p class="readout">3D 打印是新增服务 · 目前只走 QQ</p>
  </div>
</template>
