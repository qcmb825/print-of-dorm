import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { announcementApi } from '@/api/endpoints'
import type { Announcement } from '@/api/types'

/** 当前生效的公告。
 *
 *  单独放一个 store 是因为它被两处用到：布局里的悬浮条，和后台的公告管理页。
 *  后台发完新公告直接 setCurrent() 就能让悬浮条立刻更新，不需要整页重绘。
 */
export const useAnnouncementStore = defineStore('announcement', () => {
  const current = ref<Announcement | null>(null)
  /** 被用户手动关掉的那条公告 id */
  const dismissedId = ref<number | null>(null)
  const loading = ref(false)

  const visible = computed(
    () => current.value !== null && current.value.id !== dismissedId.value,
  )

  async function load(): Promise<void> {
    loading.value = true
    try {
      const data = await announcementApi.current()
      current.value = data.announcement
    } catch {
      current.value = null
    } finally {
      loading.value = false
    }
  }

  function dismiss(): void {
    dismissedId.value = current.value?.id ?? null
  }

  function setCurrent(announcement: Announcement | null): void {
    current.value = announcement
    if (announcement && announcement.id !== dismissedId.value) dismissedId.value = null
  }

  return { current, dismissedId, loading, visible, load, dismiss, setCurrent }
})
