/** ECharts 按需注册 —— 只引看板真正用到的图表与组件，
 *  别整包 import('echarts')，那会把所有图表类型都打进产物，弱网下很吃亏。
 */
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'
import { prefersReducedMotion } from '@/composables/motion'

use([CanvasRenderer, BarChart, LineChart, PieChart, GridComponent, TooltipComponent, LegendComponent])

export interface ChartPalette {
  text: string
  textMuted: string
  border: string
  primary: string
  secondary: string
  ok: string
  err: string
  warn: string
  info: string
  surface: string
}

/** 从 CSS 令牌读一档毫秒值。ECharts 的时长是 JS 数字，拿不到 CSS 变量 ——
 *  所以这里**读一次**，读完就用，不在组件里另写一个数。
 *  读不到（SSR、令牌还没解析）时回落到 300：那个值等于 --motion-dur-decor。 */
function motionMs(name: string, fallback: number): number {
  if (typeof document === 'undefined') return fallback
  const value = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue(name))
  return Number.isFinite(value) ? value : fallback
}

/** 图表配色全部从令牌推导，改配色时只需要动 tokens.css。 */
export function baseOption(palette: ChartPalette) {
  return {
    backgroundColor: 'transparent',
    textStyle: { color: palette.text, fontFamily: 'inherit' },
    // 入场动画从默认的约 1000ms 压到 --motion-dur-decor 那一档：看板一次要初始化 4 张图，
    // 这段绘制正好和页面过场、骨架屏收尾抢同一个窗口。
    // 不整个关掉，是因为 ChartBox 用的是响应式 :option —— 重新算 option 时也会重放一遍，
    // 全关掉会让数据刷新显得"跳"。
    // 减少动效下整段关掉：柱/线/扇区的"生长"是整片区域的缩放与位移，
    // 与视差、换场面板同类，属于该撤的那一类。这里是**一处覆盖五张图**的地方 ——
    // 看板上的图全部从 baseOption 派生，不用逐张改。
    // 它读的是模块级的 prefersReducedMotion（不是每张图各自 matchMedia 一次）：
    // 会话中途改系统设置时，已经建好的 option 要等调用方重算才会跟上。
    animation: !prefersReducedMotion.value,
    // 时长走令牌：图表的"生长"和装饰回响是同一档节奏（--motion-dur-decor）。
    // 曲线名是 ECharts 自己的枚举，没有对应的 CSS 曲线可读；cubicOut 与
    // --motion-ease-out 同为"起步快、尾段长"，所以这一项留在 ECharts 的词汇里。
    animationDuration: motionMs('--motion-dur-decor', 300),
    animationEasing: 'cubicOut' as const,
    grid: { left: 8, right: 12, top: 28, bottom: 4, containLabel: true },
    tooltip: {
      trigger: 'axis' as const,
      backgroundColor: palette.surface,
      borderColor: palette.border,
      borderWidth: 1,
      textStyle: { color: palette.text, fontSize: 12 },
      axisPointer: { type: 'line' as const, lineStyle: { color: palette.border } },
    },
    legend: {
      top: 0,
      right: 0,
      // rect 而不是 roundRect：全站圆角归零之后，图例里那块小色块是唯一还带圆角的
      // 方形记号（ECharts 的默认值跟 CSS 无关，themeOverrides 也管不到它）。
      icon: 'rect',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: palette.textMuted, fontSize: 11 },
    },
  }
}
