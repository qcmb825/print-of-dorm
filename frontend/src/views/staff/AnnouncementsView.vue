<script setup lang="ts">
/** 公告管理：发布、编辑、启停、删除。
 *  正文按纯文本渲染（Vue 插值默认转义），字体只收后端白名单里的键 —— 绝不把管理员输入当 HTML。 */
import { computed, onMounted, reactive, ref } from 'vue'
import { Eye, Megaphone, Pencil, Plus, RefreshCw, Trash2 } from '@lucide/vue'
import {
  NButton,
  NColorPicker,
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
import EmptyState from '@/components/EmptyState.vue'
import PageHeader from '@/components/PageHeader.vue'
import { confirmAction } from '@/composables/feedback'
import { useAnnouncementStore } from '@/stores/announcement'
import { needsInkFallback } from '@/theme/color'
import { readPaperTokens } from '@/theme/paper'
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

const previewFont = computed(() => ({
  fontFamily: ANNOUNCE_FONTS[form.font_family].css,
  fontSize: `${form.font_size}px`,
}))

/** 预览要同时给出深浅两套。
 *  正文颜色是管理员选的、纸面颜色跟主题走，只预览当前主题的话，落在另一套主题上
 *  被对比度兜底换掉的颜色就成了「惊喜」—— 所见即所得才算数。 */
const previews = computed(() =>
  (['light', 'dark'] as const).map((key) => {
    const tokens = readPaperTokens()[key]
    const overridden = needsInkFallback(tokens.paper, form.font_color, form.font_size)
    return {
      key,
      label: key === 'dark' ? '深色主题' : '浅色主题',
      paper: tokens.paper,
      line: tokens.line,
      ink: overridden ? tokens.ink : form.font_color,
      overridden,
    }
  }),
)

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
    content: '这条公告会被删除，不可恢复。',
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
        <h3 class="mb-3 flex items-center gap-2 font-heading text-base font-bold">
          <component :is="editingId === null ? Plus : Pencil" :size="15" style="color: var(--accent-text)" />
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

        <!-- 实时预览：深浅两套都给出，与顶部公告条共用同一套字体映射和同一道对比度判定 -->
        <div class="mb-3">
          <div class="tech-label mb-1.5 flex items-center gap-1.5 text-ink-3 tech-label--cn text-xs">
            <Eye :size="12" />
            预览
          </div>
          <div class="grid gap-2 sm:grid-cols-2">
            <div v-for="item in previews" :key="item.key">
              <div class="tech-label mb-1 text-ink-3 tech-label--cn text-xs">{{ item.label }}</div>
              <div
                class="border p-3"
                :style="{ backgroundColor: item.paper, borderColor: item.line }"
              >
                <p class="whitespace-pre-wrap break-words" :style="[previewFont, { color: item.ink }]">
                  {{ form.content.trim() || '公告内容会显示在这里' }}
                </p>
              </div>
              <p v-if="item.overridden" class="mt-1 text-xs text-ink-3">
                对比度不足 · 会回落到主题文字色
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <NButton
            type="primary"
            class="!font-bold"
            :loading="saving"
            :disabled="!canSubmit"
            @click="submit"
          >
            <template #icon><Megaphone :size="15" /></template>
            {{ editingId === null ? '发布公告' : '保存修改' }}
          </NButton>
          <NButton v-if="editingId !== null" quaternary @click="resetForm">取消编辑</NButton>
        </div>
        <p v-if="editingId === null" class="mt-3 text-xs text-ink-3">
          保存后立即生效，并停用上一条公告。
        </p>
      </section>

      <!-- 历史列表 -->
      <!-- 分栏线：两块并排时只靠间隙分不出"这是一栏还是两块"，有了这条 1px 线，它们读成一份双栏的文件。 -->
      <section class="lg:border-l lg:border-[var(--border)] lg:pl-4">
        <h3 class="mb-3 font-heading text-base font-bold">
          历史公告
          <span class="tech-label ml-2 text-ink-3 tech-label--cn text-xs">最近 50 条</span>
        </h3>

        <div v-if="loading && !list.length" class="flex flex-col gap-2">
          <NSkeleton v-for="index in 3" :key="index" height="92px" :sharp="false" />
        </div>

        <div v-else-if="!list.length" class="panel grid place-items-center py-12">
          <EmptyState code="00 / NO NOTICE" title="还没有发布过公告" hint="左侧写完保存，就会出现在这里">
            <template #icon><Megaphone :size="28" /></template>
          </EmptyState>
        </div>

        <!-- 列表按「生效中 > id 倒序」排：新公告从上方落下，启停后那位「生效中」挪到顶部
             也看得见。每次保存都会整表重拉，按 key 打补丁，所以只有真正变化的项会动。 -->
        <TransitionGroup
          v-else
          tag="ul"
          class="flex list-none flex-col gap-3 p-0"
          enter-active-class="transition duration-[var(--motion-dur-base)] ease-out"
          enter-from-class="opacity-0 translate-x-1"
          leave-active-class="transition duration-[var(--motion-dur-fast)] ease-out"
          leave-to-class="opacity-0"
          move-class="transition duration-[var(--motion-dur-base)] ease-out"
        >
          <li
            v-for="item in list"
            :key="item.id"
            class="panel p-3.5"
            :class="item.is_active === 1 && 'border-[var(--accent-tint-border)]'"
          >
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0 flex-1">
                <p class="line-clamp-2 text-sm" :style="{ fontFamily: ANNOUNCE_FONTS[item.font_family]?.css }">
                  {{ item.content }}
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    class="tech-label px-2 py-0.5 tech-label--cn text-xs"
                    :style="
                      item.is_active === 1
                        ? { backgroundColor: 'var(--status-ready-bg)', color: 'var(--status-ready)' }
                        : { backgroundColor: 'var(--muted)', color: 'var(--text-tertiary)' }
                    "
                  >
                    {{ item.is_active === 1 ? '生效中' : '已停用' }}
                  </span>
                  <span class="tnum text-xs text-ink-3">
                    #{{ item.id }} · {{ ANNOUNCE_FONTS[item.font_family]?.label ?? item.font_family }}
                    {{ item.font_size }}px ·
                    <span :style="{ color: item.font_color }">{{ item.font_color }}</span>
                  </span>
                  <span class="text-xs text-ink-3">
                    {{ item.author ?? '系统' }} · {{ shortTime(item.update_time) }}
                  </span>
                </div>
              </div>
              <NSwitch :round="false"
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
        </TransitionGroup>
      </section>
    </div>
  </div>
</template>
