<script setup lang="ts">
/** 顶部公告条。
 *
 *  文字一律用插值渲染（Vue 默认转义），绝不 v-html —— 公告正文是管理员输入的，
 *  当成 HTML 渲染就是一个存储型 XSS 入口。
 *  字体走后端白名单键 → 前端 CSS 栈的映射，与 config.ANNOUNCE_FONTS 对齐。
 */
import { computed } from 'vue'
import { Megaphone, X } from '@lucide/vue'
import { NButton } from 'naive-ui'
import { ANNOUNCE_FONTS, type AnnounceFont } from '@/api/types'
import { useAnnouncementStore } from '@/stores/announcement'

const store = useAnnouncementStore()

const announcement = computed(() => store.current)

const bodyStyle = computed(() => {
  const item = announcement.value
  if (!item) return {}
  const font = ANNOUNCE_FONTS[item.font_family as AnnounceFont] ?? ANNOUNCE_FONTS.system
  return {
    fontFamily: font.css,
    fontSize: `${Math.min(Math.max(item.font_size, 12), 28)}px`,
    color: item.font_color,
  }
})

const authorLine = computed(() => {
  const item = announcement.value
  if (!item) return ''
  const who = item.author ? `发布人 ${item.author}` : '系统公告'
  return item.update_time ? `${who} · ${item.update_time.slice(0, 16)}` : who
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-2 opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="-translate-y-2 opacity-0"
  >
    <div v-if="store.visible && announcement" class="px-3 pt-3 sm:px-5 sm:pt-4">
      <section
        role="status"
        aria-label="站点公告"
        class="mx-auto flex max-w-6xl items-start gap-3 rounded-[12px] border p-3 sm:p-4"
        :style="{
          backgroundColor: 'var(--paper)',
          borderColor: 'var(--paper-line)',
          color: 'var(--paper-ink)',
        }"
      >
        <span
          class="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md"
          style="background-color: var(--accent-tint-soft); color: var(--paper-accent)"
          aria-hidden="true"
        >
          <Megaphone :size="15" />
        </span>
        <div class="min-w-0 flex-1">
          <p class="whitespace-pre-wrap break-words" :style="bodyStyle">
            {{ announcement.content }}
          </p>
          <p class="tech-label mt-1.5" style="color: var(--paper-muted)">{{ authorLine }}</p>
        </div>
        <NButton
          quaternary
          circle
          size="small"
          aria-label="关闭公告"
          style="color: var(--paper-muted)"
          @click="store.dismiss()"
        >
          <template #icon><X :size="15" /></template>
        </NButton>
      </section>
    </div>
  </Transition>
</template>
