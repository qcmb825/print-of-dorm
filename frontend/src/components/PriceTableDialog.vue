<script setup lang="ts">
/** 价目表弹窗：完整那张表 + 管理员写的说明（「注」）。
 *
 *  为什么是弹窗、不是单独一页：**看价目表这件事总是发生在一个具体的下单动作里**
 *  （「这一档多少钱」「相纸能不能双面」）。跳到另一页再跳回来，表单填的东西
 *  和选好的文件都可能丢，而它要回答的问题只需要一眼。
 *  机器人那边同样有这个入口（发「价目表」给一张卡），两边取的是同一份数据。
 *
 *  数据**每次打开都重新拉**：价格是管理员随时会改的东西，缓存一份在页面上，
 *  最坏的情况是学生按着旧价下单 —— 而这一屏存在的意义就是"别让价格对不上"。
 *  拉不到时明确说一句，不要显示一张空表（空表会被读成"免费"）。
 */
import { ref, watch } from 'vue'
import { RefreshCw } from '@lucide/vue'
import { NButton, NModal, NSkeleton } from 'naive-ui'
import { ApiError } from '@/api/client'
import { printOptionsApi } from '@/api/endpoints'
import type { PriceItem } from '@/api/types'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ 'update:show': [boolean] }>()

const items = ref<PriceItem[]>([])
const notes = ref('')
const loading = ref(false)
const error = ref('')

async function load(): Promise<void> {
  loading.value = true
  error.value = ''
  try {
    const data = await printOptionsApi.priceTable()
    items.value = data.items ?? []
    notes.value = data.notes ?? ''
  } catch (err) {
    error.value = err instanceof ApiError ? err.message : '价目表加载失败'
  } finally {
    loading.value = false
  }
}

// 打开时才拉（关闭状态下不占一次请求）
watch(
  () => props.show,
  (open) => {
    if (open) void load()
  },
)

/** 金额显示成两位小数。与站内 priceLabel 同一个口径。 */
function money(value: number): string {
  return `¥${value.toFixed(2)}`
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    class="max-w-[720px]"
    title="价目表"
    :bordered="false"
    @update:show="(value: boolean) => emit('update:show', value)"
  >
    <div v-if="loading" class="flex flex-col gap-2">
      <NSkeleton text :repeat="6" />
    </div>

    <div v-else-if="error" class="flex flex-col items-start gap-3">
      <p class="text-sm" style="color: var(--warn)">{{ error }}</p>
      <NButton size="small" quaternary :loading="loading" @click="load()">
        <template #icon><RefreshCw :size="15" /></template>
        重试
      </NButton>
    </div>

    <template v-else>
      <p v-if="!items.length" class="text-sm text-ink-3">
        管理员还没配置价目表。下单时直接提交就行，金额由管理员核定。
      </p>

      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <thead>
            <tr class="text-left text-xs text-ink-3">
              <th class="border-b py-2 pr-3 font-normal" style="border-color: var(--border)">纸张</th>
              <th class="border-b py-2 pr-3 font-normal" style="border-color: var(--border)">类型</th>
              <th class="border-b py-2 pr-3 text-right font-normal" style="border-color: var(--border)">
                单面（元/张）
              </th>
              <th class="border-b py-2 text-right font-normal" style="border-color: var(--border)">
                双面（元/张）
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td class="border-b py-2 pr-3 align-top" style="border-color: var(--border)">
                {{ item.paper }}
              </td>
              <td class="border-b py-2 pr-3 align-top" style="border-color: var(--border)">
                {{ item.kind }}
                <!-- 备注单独一行：它是「塑封 +2.61 · 量大价优」这类附加说明，
                     挤在类型名后面会把两件事读成一件。 -->
                <span v-if="item.note" class="block text-xs text-ink-3">{{ item.note }}</span>
              </td>
              <td class="tnum border-b py-2 pr-3 text-right align-top font-semibold"
                  style="border-color: var(--border)">
                {{ money(item.price_single) }}
              </td>
              <td class="tnum border-b py-2 text-right align-top" style="border-color: var(--border)">
                <span v-if="item.price_double !== null">{{ money(item.price_double) }}</span>
                <span v-else class="text-xs text-ink-3">不支持</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 说明（管理员维护的那几条「注」）。按行渲染：它在库里是一段多行文本，
           原样 whitespace-pre-line 保留换行 —— 分成几条本来就是作者的排版意图。 -->
      <div v-if="notes" class="mt-4 border-t pt-3" style="border-color: var(--border)">
        <p class="mb-1.5 text-xs font-semibold text-ink-2">说明</p>
        <p class="text-xs leading-6 whitespace-pre-line text-ink-3">{{ notes }}</p>
      </div>

      <p class="mt-3 text-xs text-ink-3">
        价格由管理员维护。下单时选一档，系统按页数与份数算出<strong>预估</strong>价，
        最终金额以管理员核定为准。
      </p>
    </template>
  </NModal>
</template>
