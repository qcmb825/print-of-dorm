<script setup lang="ts">
/** 账号下拉：昵称、角色、退出登录。学生端顶栏与管理端侧栏共用。
 *
 *  stacked：侧栏那种窄容器用两行（昵称一行、角色一行）。
 *  侧栏可用宽度只有 182px 左右，塞不下「头像 + 全名 + 角色标签 + 箭头」，硬塞就会
 *  溢出到侧栏外面去，所以这里换成堆叠而不是靠截断硬挤。
 */
import { computed, h } from 'vue'
import { ChevronDown, LogOut } from '@lucide/vue'
import { NButton, NDropdown } from 'naive-ui'
import { useRouter } from 'vue-router'
import RoleTag from '@/components/RoleTag.vue'
import { confirmAction } from '@/composables/feedback'
import { useAuthStore } from '@/stores/auth'

const props = withDefaults(defineProps<{ stacked?: boolean }>(), { stacked: false })

const auth = useAuthStore()
const router = useRouter()

const initial = computed(() => auth.displayName.slice(0, 1).toUpperCase() || '?')

const options = [
  {
    key: 'header',
    type: 'render' as const,
    render: () =>
      h('div', { class: 'px-3 py-2' }, [
        h('div', { class: 'text-[13px] font-bold' }, auth.user?.real_name || auth.displayName),
        h(
          'div',
          { class: 'tnum mt-0.5 text-[11px] opacity-60' },
          `学号 ${auth.user?.student_id || '—'}`,
        ),
      ]),
  },
  { key: 'divider', type: 'divider' as const },
  // 这里曾经还有一个「换个界面」—— 全站已经锁死新版了（app.py 的 UI_SWITCH_ENABLED），
  // 留着入口只会把用户送去一个打不开的经典版，所以连同它的图标一起拆了。
  {
    key: 'logout',
    label: '退出登录',
    icon: () => h(LogOut, { size: 15 }),
  },
]

async function onSelect(key: string): Promise<void> {
  if (key !== 'logout') return
  const ok = await confirmAction({
    title: '退出登录',
    content: '确定要退出当前账号吗？',
    positiveText: '退出',
  })
  if (!ok) return
  await auth.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <NDropdown :options="options" trigger="click" placement="bottom-end" @select="onSelect">
    <!-- 堆叠模式要能放下两行，所以要覆盖 Naive 的固定高度，并把内容靠左对齐 -->
    <NButton
      quaternary
      :class="props.stacked ? '!h-auto !justify-start !px-2 !py-1.5' : '!px-2'"
    >
      <span class="flex w-full min-w-0 items-center gap-2">
        <span
          class="grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold"
          style="background-color: var(--muted); color: var(--primary)"
          aria-hidden="true"
        >
          {{ initial }}
        </span>

        <template v-if="props.stacked">
          <span class="flex min-w-0 flex-col items-start gap-0.5">
            <span class="block w-full truncate text-[13px] leading-tight font-semibold">
              {{ auth.displayName }}
            </span>
            <RoleTag v-if="auth.user" :role="auth.user.role" />
          </span>
        </template>

        <template v-else>
          <!-- truncate 要求元素是块级/行内块，inline 上不生效；
               外层还要有 min-w-0，否则 flex 子项不肯收缩，长昵称会顶破布局。
               昵称在 md 出现、角色标签到 lg 才出现：两者同时挤进顶栏会和导航打架。 -->
          <span class="hidden min-w-0 truncate text-[13px] font-semibold md:block">
            {{ auth.displayName }}
          </span>
          <!-- 包一层来控制显隐：RoleTag 根节点自带 inline-flex，
               直接给它加 hidden 会因为两条 display 工具类冲突而失效。 -->
          <span v-if="auth.user" class="hidden shrink-0 lg:inline-flex">
            <RoleTag :role="auth.user.role" />
          </span>
        </template>

        <ChevronDown
          :size="14"
          class="shrink-0 opacity-50"
          :class="props.stacked && 'ml-auto'"
        />
      </span>
    </NButton>
  </NDropdown>
</template>
