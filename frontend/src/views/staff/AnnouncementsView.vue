<script setup lang="ts">
/** 公告管理：发布、编辑、启停、删除。
 *  正文按纯文本渲染（Vue 插值默认转义），字体只收后端白名单里的键 —— 绝不把管理员输入当 HTML。 */
import { computed, onMounted, reactive, ref } from 'vue'
import { Eye, Megaphone, Pencil, Plus, RefreshCw, Trash2 } from '@lucide/vue'
import {
  NButton,
  NColorPicker,
  NEmpty,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSkeleton,
  NSwitch,
  useMessage,
} from 'naive-ui'
import { ApiError } from '@/api/client'
import { announcementApi, type AnnouncementPayload } from '@/api/endpoints'
import { ANNOUNCE_FONTS, type AnnounceFont, type Announcement } from '@/api/types'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { useAnnouncementStore } from '@/stores/announcement'
import { shortTime } from '@/utils/format'

const message = useMessage()
const announcementStore = useAnnouncementStore()

const list = ref<Announcement[]>([])
const loading = ref(true)
const saving = ref(false)
const editingId = ref<number | null>(null)

const form = reactive<AnnouncementPayload>({
  content: '',
  font_family: 'system',
  font_size: 15,
  // 与后端 _parse_announcement() 的默认值保持一致（那边也是 #1f2328）
  font_color: '#1f2328',
})

const fontOptions = (Object.keys(ANNOUNCE_FONTS) as AnnounceFont[]).map((key) => ({
  label: ANNOUNCE_FONTS[key].label,
  value: key,
}))

const previewStyle = computed(() => ({
  fontFamily: ANNOUNCE_FONTS[form.font_family].css,
  fontSize: `${form.font_size}px`,
  color: form.font_color,
}))

const canSubmit = computed(() => form.content.trim().length > 0 && !saving.value)

function resetForm(): void {
  editingId.value = null
  form.content = ''
  form.font_family = 'system'
  form.font_size = 15
  form.font_color = '#1f2328'
}

async function load(silent = false): Promise<void> {
  if (!silent) loading.value = true
  try {
    const data = await announcementApi.list()
    list.value = data.announcements
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '加载公告失败')
  } finally {
    loading.value = false
  }
}

/** 发布或保存编辑，然后同步顶部公告条 */
async function submit(): Promise<void> {
  if (!canSubmit.value) return
  saving.value = true
  const payload: AnnouncementPayload = {
    content: form.content.trim(),
    font_family: form.font_family,
    font_size: form.font_size,
    font_color: form.font_color,
  }
  try {
    if (editingId.value === null) {
      await announcementApi.create(payload)
      message.success('公告已发布')
    } else {
      await announcementApi.update(editingId.value, payload)
      message.success('公告已更新')
    }
    resetForm()
    await load(true)
    await announcementStore.load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '保存失败')
  } finally {
    saving.value = false
  }
}

function startEdit(item: Announcement): void {
  editingId.value = item.id
  form.content = item.content
  form.font_family = item.font_family
  form.font_size = item.font_size
  form.font_color = item.font_color
}

async function toggleActive(item: Announcement): Promise<void> {
  const next = item.is_active !== 1
  try {
    await announcementApi.setActive(item.id, next)
    message.success(next ? '公告已启用' : '公告已停用')
    await load(true)
    await announcementStore.load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '操作失败')
  }
}

async function remove(item: Announcement): Promise<void> {
  const ok = await confirmAction({
    title: '删除公告',
    content: '确定删除这条公告吗？删除后不可恢复。',
    positiveText: '删除',
  })
  if (!ok) return
  try {
    await announcementApi.remove(item.id)
    message.success('公告已删除')
    if (editingId.value === item.id) resetForm()
    await load(true)
    await announcementStore.load()
  } catch (error) {
    message.error(error instanceof ApiError ? error.message : '删除失败')
  }
}

onMounted(load)
</script>

<template>
  <div class="mx-auto max-w-[1400px]">
    <PageHeader title="公告管理" subtitle="同一时间只有一条生效，发布新公告会自动停用旧的">
      <template #actions>
        <NButton size="small" quaternary :loading="loading" @click="load()">
          <template #icon><RefreshCw :size="15" /></template>
          刷新
        </NButton>
      </template>
    </PageHeader>

    <div class="grid gap-4 lg:grid-cols-[minmax(320px,420px)_1fr]">
      <!-- 编辑区 -->
      <section class="panel h-fit p-4">
        <h3 class="mb-3 flex items-center gap-2 font-heading text-[15px] font-bold">
          <component :is="editingId === null ? Plus : Pencil" :size="15" style="color: var(--primary)" />
          {{ editingId === null ? '发布新公告' : `编辑公告 #${editingId}` }}
        </h3>

        <NFormItem label="公告内容" :show-feedback="false">
          <NInput
            v-model:value="form.content"
            type="textarea"
            :maxlength="500"
            show-count
            :autosize="{ minRows: 3, maxRows: 6 }"
            placeholder="例：今晚 22:00-23:00 打印点维护，暂停取件。"
          />
        </NFormItem>

        <div class="grid grid-cols-2 gap-3">
          <NFormItem label="字体" :show-feedback="false">
            <NSelect
              v-model:value="form.font_family"
              :options="fontOptions"
              :consistent-menu-width="false"
            />
          </NFormItem>
          <NFormItem label="字号" :show-feedback="false">
            <NInputNumber v-model:value="form.font_size" :min="12" :max="28" class="!w-full" />
          </NFormItem>
        </div>

        <NFormItem label="文字颜色" :show-feedback="false">
          <NColorPicker v-model:value="form.font_color" :show-alpha="false" :modes="['hex']" />
        </NFormItem>

        <!-- 实时预览：与顶部公告条用同一套字体映射和纸面配色 -->
        <div class="mb-3">
          <div class="tech-label mb-1.5 flex items-center gap-1.5 text-ink-4">
            <Eye :size="12" />
            预览
          </div>
          <div
            class="rounded-[12px] border p-3"
            :style="{ backgroundColor: 'var(--paper)', borderColor: 'var(--paper-line)' }"
          >
            <p class="whitespace-pre-wrap break-words" :style="previewStyle">
              {{ form.content.trim() || '公告内容会显示在这里' }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <NButton
            type="primary"
            class="!font-bold shadow-[var(--glow-primary)]"
            :loading="saving"
            :disabled="!canSubmit"
            @click="submit"
          >
            <template #icon><Megaphone :size="15" /></template>
            {{ editingId === null ? '发布公告' : '保存修改' }}
          </NButton>
          <NButton v-if="editingId !== null" quaternary @click="resetForm">取消编辑</NButton>
        </div>
        <p v-if="editingId === null" class="mt-3 text-[11px] text-ink-4">
          保存后立即对所有用户生效，并自动停用上一条公告。
        </p>
      </section>

      <!-- 历史列表 -->
      <section>
        <h3 class="mb-3 font-heading text-[15px] font-bold">
          历史公告
          <span class="tech-label ml-2 text-ink-4">最近 50 条</span>
        </h3>

        <div v-if="loading && !list.length" class="flex flex-col gap-2">
          <NSkeleton v-for="index in 3" :key="index" height="92px" :sharp="false" />
        </div>

        <div v-else-if="!list.length" class="panel grid place-items-center py-12">
          <NEmpty description="还没有发布过公告" size="small">
            <template #icon><Megaphone :size="30" /></template>
          </NEmpty>
        </div>

        <ul v-else class="flex list-none flex-col gap-3 p-0">
          <li
            v-for="item in list"
            :key="item.id"
            class="panel p-3.5"
            :class="item.is_active === 1 && 'border-primary/40'"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <p class="line-clamp-2 text-[13px]" :style="{ fontFamily: ANNOUNCE_FONTS[item.font_family]?.css }">
                  {{ item.content }}
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    class="tech-label rounded-full px-2 py-0.5"
                    :style="
                      item.is_active === 1
                        ? { backgroundColor: 'var(--status-ready-bg)', color: 'var(--status-ready)' }
                        : { backgroundColor: 'var(--muted)', color: 'var(--text-quaternary)' }
                    "
                  >
                    {{ item.is_active === 1 ? '生效中' : '已停用' }}
                  </span>
                  <span class="tnum text-[11px] text-ink-4">
                    #{{ item.id }} · {{ ANNOUNCE_FONTS[item.font_family]?.label ?? item.font_family }}
                    {{ item.font_size }}px ·
                    <span :style="{ color: item.font_color }">{{ item.font_color }}</span>
                  </span>
                  <span class="text-[11px] text-ink-4">
                    {{ item.author ?? '系统' }} · {{ shortTime(item.update_time) }}
                  </span>
                </div>
              </div>
              <NSwitch
                :value="item.is_active === 1"
                size="small"
                @update:value="toggleActive(item)"
              />
            </div>

            <div class="mt-3 flex items-center gap-1.5 border-t pt-2.5" style="border-color: var(--border)">
              <NButton size="tiny" quaternary @click="startEdit(item)">
                <template #icon><Pencil :size="12" /></template>
                编辑
              </NButton>
              <NButton size="tiny" quaternary @click="remove(item)">
                <template #icon><Trash2 :size="12" /></template>
                删除
              </NButton>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
