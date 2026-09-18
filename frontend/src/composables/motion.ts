/** 微动态：指针视差。
 *
 *  三条纪律，每一条都是这类效果最常翻车的地方：
 *
 *  1. **减少动效下完全不启动。** 不是把位移调小，是不装监听器、不写变量。
 *     视差是"大面积缓慢位移"，正是前庭敏感最主要的一类触发器 ——
 *     MDN 与 A List Apart 都点名了它（"moves an object across a large amount of space"）。
 *  2. **触屏不出视差。** 只在 `(hover: hover) and (pointer: fine)` 上装：触屏没有指针悬停，
 *     装了只会在点按时抖一下，纯属噪声。
 *  3. **JS 只写 CSS 变量，位移交给 CSS 的 calc()。** 全程 transform（合成属性），
 *     不触发重排重绘；每帧最多两次 setProperty，用 rAF 合并。
 */

import { onBeforeUnmount, ref } from 'vue'

/** 系统是否要求减少动效。**响应式**：用户可以在会话中途改系统设置，
 *  所以必须监听 change，不能只读一次 .matches（那会让设置改了也不生效）。 */
export const prefersReducedMotion = ref(false)

if (typeof window !== 'undefined') {
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = mq.matches
  mq.addEventListener('change', (e) => {
    prefersReducedMotion.value = e.matches
    // 从"减少"切回"正常"时把变量归零，避免残留一个非零位移冻在那里
    if (e.matches) {
      document.documentElement.style.removeProperty('--px')
      document.documentElement.style.removeProperty('--py')
    }
  })
}

/** 把指针位置归一化成 -1~1 写进 `--px` / `--py`。
 *  元素侧的位移幅度由各自的 `--depth` 决定（见 base.css 的 [data-parallax]）——
 *  这样"谁动多少"是 CSS 的事，JS 只管"指针在哪"。 */
export function usePointerParallax(): void {
  if (typeof window === 'undefined') return
  // 减少动效 / 触屏：直接不装（纪律 1、2）
  if (prefersReducedMotion.value || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return
  }

  const root = document.documentElement
  let raf = 0
  let nx = 0
  let ny = 0

  function flush(): void {
    raf = 0
    root.style.setProperty('--px', nx.toFixed(4))
    root.style.setProperty('--py', ny.toFixed(4))
  }

  function onMove(e: PointerEvent): void {
    nx = (e.clientX / window.innerWidth) * 2 - 1
    ny = (e.clientY / window.innerHeight) * 2 - 1
    if (raf) return // 一帧只写一次
    raf = requestAnimationFrame(flush)
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  onBeforeUnmount(() => {
    window.removeEventListener('pointermove', onMove)
    if (raf) cancelAnimationFrame(raf)
    root.style.removeProperty('--px')
    root.style.removeProperty('--py')
  })
}
