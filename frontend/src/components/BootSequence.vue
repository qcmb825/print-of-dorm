<script setup lang="ts">
/** 开机自检（POST）：登录成功的那一刻，先让机器自报一遍再进站。
 *
 *  为什么是这一场：这个产品的全部界面都在描述一台机器（仪表、单据、刻度），
 *  而登录是**整站唯一一次"上电"**——之后所有换场都是这台机器内部的事。
 *  用它替代原来那条"AUTHORIZATION SUCCESS"回执：回执说的是"你登录成功了"，
 *  自检说的是"这台机器认得你了"，后者才是这套语言该说的话。
 *
 *  五条纪律，每一条都对着已有的坑：
 *  1. **不锁用户**。自带看门狗：超过 HARD_LIMIT_MS 一律强制完成，组件异常也走
 *     同一条出口（与开屏层的"不能把用户锁在里面"同一条）。
 *  2. **读数不进朗读流**。视觉整块 aria-hidden，另给一句 sr-only —— 屏幕上
 *     逐行"敲出来"的字，读屏用户听到的应该是一句完整的结论，不是十几条碎片。
 *  3. **进度来自真实事件**，不编百分比。这里没有百分比：四行自检是四个**已经
 *     发生完的事实**（凭据已收下、会话已建立），只是在依次报出来。
 *  4. **减少动效下整层不出现**，直接进站（不看这块屏也是完整的）。
 *  5. **不覆盖换场面板**：z-index 比 RouteVeil 低一档，且同一次登录之后
 *     紧跟着的 router.replace 会照常触发外壳换场 —— 自检退场、面板接上，
 *     两段动作是接力的，不是叠着的。
 *
 *  这一层只做"报"，不做"决定"：它演完就 emit done，跳转的目标由调用方算。
 *  样式在 base.css 的「开机自检」段（全站组件都不带 <style>）。
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /** 目标外壳名，显示在右下角（与学生端/管理端一致的口径）。 */
    target?: string
    /** 每行的字间节奏（ms）。 */
    typeMs?: number
  }>(),
  { target: 'STUDENT', typeMs: 18 },
)

const emit = defineEmits<{ done: [] }>()

/** 自检行。`value` 是要"敲出来"的那一段；前缀是等宽标签，一直亮着。 */
const LINES = [
  { label: 'MEM CHECK', value: 'OK' },
  { label: 'NET LINK', value: 'OK' },
  { label: 'SESSION', value: 'ESTABLISHED' },
  { label: 'AUTH', value: 'ACCEPTED' },
] as const

/** 每一行停留多久再起下一行（等上一行打完 + 一口气）。 */
const LINE_GAP_MS = 90

/** 硬上限：超过它无条件放行。四行满打满算不到 2s，3s 是"一定出了事"。 */
const HARD_LIMIT_MS = 3000

const visible = ref(false)
const printed = ref<string[]>([])
const current = ref(0)
const finished = ref(false)

let timers: ReturnType<typeof setTimeout>[] = []
/** 收尾之后那一拍的交棒定时器（与 timers 分开，理由见 finish()）。 */
let handoff: ReturnType<typeof setTimeout> | undefined

function clearTimers(): void {
  for (const timer of timers) clearTimeout(timer)
  timers = []
}

/** 收尾只做一次。finished 是幂等的闸门 —— 看门狗和正常路径可能同时到。 */
function finish(): void {
  if (finished.value) return
  finished.value = true
  clearTimers()
  // 让最后一帧（AUTH ACCEPTED 亮起）被看见，再交棒。
  // 这个 timer **不进 timers 数组**：它属于"已经收尾之后"的那一拍，
  // 而 clearTimers() 是给"中途取消"用的 —— 放进数组会被卸载一起清掉，
  // done 就永远不发、调用方的 Promise 悬住。
  handoff = setTimeout(() => {
    handoff = undefined
    visible.value = false
    emit('done')
  }, 220)
}

/** 逐字打一行。**链式 setTimeout** 而不是 setInterval：页面被挂起时不积压回调，
 *  切标签页回来不会一次性喷完（与 motion.ts 里指数阻尼要封 dt 是同一类考虑）。 */
function typeLine(index: number): void {
  const line = LINES[index]
  if (!line) {
    finish()
    return
  }
  current.value = index
  let i = 0
  const step = (): void => {
    i += 1
    printed.value = [...printed.value.slice(0, index), line.value.slice(0, i)]
    if (i < line.value.length) {
      timers.push(setTimeout(step, props.typeMs))
    } else {
      const next = index + 1
      if (next < LINES.length) {
        timers.push(setTimeout(() => typeLine(next), LINE_GAP_MS))
      } else {
        timers.push(setTimeout(finish, 260))
      }
    }
  }
  timers.push(setTimeout(step, props.typeMs))
}

/** 已经"报完"的行在视觉上保持满亮；正在打的那一行才显示打字进度。 */
const rows = computed(() =>
  LINES.map((line, index) => {
    const value = printed.value[index] ?? ''
    return {
      label: line.label,
      value,
      complete: index < current.value || (index === current.value && value === line.value),
      active: index === current.value,
    }
  }),
)

onMounted(() => {
  // 减少动效：整层不出现，直接交棒。调用方那边也在等 emit，链路一致。
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish()
    return
  }
  visible.value = true
  timers.push(setTimeout(() => typeLine(0), 160))
  timers.push(setTimeout(finish, HARD_LIMIT_MS))
})

onBeforeUnmount(() => {
  clearTimers()
  // 已经收尾、还没交棒就卸载了：当场兑现，别让调用方的 Promise 悬住。
  // （这不是理论情况：登录后如果用户在这 220ms 里按了浏览器后退，
  //   LoginView 会被换掉，组件随之卸载。）
  if (handoff !== undefined) {
    clearTimeout(handoff)
    handoff = undefined
    emit('done')
  }
})
</script>

<template>
  <Teleport to="body">
    <div v-if="visible" class="post" :data-finished="finished ? '' : undefined">
      <!-- 视觉整块不进朗读流：读屏听到的是一句结论，不是十几条逐字碎片。 -->
      <div class="post__mat" aria-hidden="true">
        <div class="post__grid" />
        <div class="post__head">
          <span class="readout">POST / SEQUENCE</span>
          <span class="readout">SELF TEST</span>
        </div>

        <ul class="post__lines">
          <li
            v-for="row in rows"
            :key="row.label"
            class="post__line"
            :class="row.complete && 'post__line--ok'"
          >
            <span class="post__label">{{ row.label }}</span>
            <span class="post__dots" />
            <span class="post__value">
              {{ row.value }}<span v-if="row.active && !finished" class="caret" />
            </span>
          </li>
        </ul>

        <div class="post__foot">
          <span class="readout">AUTH OK</span>
          <span class="readout">{{ target }}</span>
        </div>
      </div>
      <p class="sr-only" role="status">登录成功，正在进入</p>
    </div>
  </Teleport>
</template>
