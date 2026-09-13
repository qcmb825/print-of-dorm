/** ECharts 按需注册 —— 只引看板真正用到的图表与组件，
 *  别整包 import('echarts')，那会把所有图表类型都打进产物，弱网下很吃亏。
 */
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, LineChart, PieChart } from 'echarts/charts'
import { GridComponent, LegendComponent, TooltipComponent } from 'echarts/components'

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

/** 图表配色全部从令牌推导，所以深浅主题切换时图表跟着变。 */
export function baseOption(palette: ChartPalette) {
  return {
    backgroundColor: 'transparent',
    textStyle: { color: palette.text, fontFamily: 'inherit' },
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
      icon: 'roundRect',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: palette.textMuted, fontSize: 11 },
    },
  }
}
