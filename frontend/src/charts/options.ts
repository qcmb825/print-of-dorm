/** 看板图表的 option 构造函数。放在组件外，纯函数，方便单测和复用。
 *  每张图都接收调色板，因此天然跟随明暗主题。 */
import type { EChartsOption } from 'echarts'
import { baseOption, type ChartPalette } from './setup'

/** 近 14 天订单量：面积折线。 */
export function trendOption(daily: { date: string; count: number }[], p: ChartPalette): EChartsOption {
  const labels = daily.map((item) => item.date.slice(5))
  const values = daily.map((item) => item.count)
  return {
    ...baseOption(p),
    grid: { left: 4, right: 12, top: 16, bottom: 4, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: p.surface,
      borderColor: p.border,
      borderWidth: 1,
      textStyle: { color: p.text, fontSize: 12 },
      formatter: (params: unknown) => {
        const list = params as { axisValue: string; value: number }[]
        const first = list[0]
        return first ? `${first.axisValue}<br/><b>${first.value}</b> 单` : ''
      },
    },
    xAxis: {
      type: 'category',
      data: labels,
      boundaryGap: false,
      axisLine: { lineStyle: { color: p.border } },
      axisTick: { show: false },
      axisLabel: { color: p.textMuted, fontSize: 11, interval: Math.max(0, Math.ceil(labels.length / 7) - 1) },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: p.border, type: 'dashed' } },
      axisLabel: { color: p.textMuted, fontSize: 11 },
    },
    series: [
      {
        type: 'line',
        data: values,
        smooth: true,
        showSymbol: false,
        lineStyle: { width: 2, color: p.primary },
        itemStyle: { color: p.primary },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: `${p.primary}59` },
              { offset: 1, color: `${p.primary}00` },
            ],
          },
        },
      },
    ],
  }
}

/** 订单状态分布：环形图，颜色按实体绑定（不随筛选变）。 */
export function statusOption(
  byStatus: Record<string, number>,
  palette: ChartPalette,
  colorOf: (status: string) => string,
): EChartsOption {
  const data = Object.entries(byStatus).map(([name, value]) => ({
    name,
    value,
    itemStyle: { color: colorOf(name) },
  }))
  return {
    ...baseOption(palette),
    tooltip: {
      trigger: 'item',
      backgroundColor: palette.surface,
      borderColor: palette.border,
      borderWidth: 1,
      textStyle: { color: palette.text, fontSize: 12 },
      formatter: '{b}<br/><b>{c}</b> 单（{d}%）',
    },
    legend: {
      orient: 'vertical',
      right: 0,
      top: 'center',
      icon: 'roundRect',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: palette.textMuted, fontSize: 11 },
    },
    series: [
      {
        type: 'pie',
        radius: ['52%', '76%'],
        center: ['36%', '52%'],
        avoidLabelOverlap: true,
        label: { show: false },
        labelLine: { show: false },
        itemStyle: { borderColor: palette.surface, borderWidth: 2 },
        data,
      },
    ],
  }
}

/** 黑白 / 彩色、单面 / 双面：并排条形。 */
export function splitBarOption(
  groups: { label: string; data: { name: string; value: number }[] }[],
  palette: ChartPalette,
): EChartsOption {
  const categories = Array.from(new Set(groups.flatMap((g) => g.data.map((d) => d.name))))
  const colors = [palette.primary, palette.secondary]
  return {
    ...baseOption(palette),
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: palette.surface,
      borderColor: palette.border,
      borderWidth: 1,
      textStyle: { color: palette.text, fontSize: 12 },
    },
    legend: {
      top: 0,
      right: 0,
      icon: 'roundRect',
      itemWidth: 8,
      itemHeight: 8,
      textStyle: { color: palette.textMuted, fontSize: 11 },
    },
    grid: { left: 4, right: 12, top: 28, bottom: 4, containLabel: true },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: palette.border } },
      axisTick: { show: false },
      axisLabel: { color: palette.textMuted, fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: palette.border, type: 'dashed' } },
      axisLabel: { color: palette.textMuted, fontSize: 11 },
    },
    series: groups.map((group, index) => ({
      name: group.label,
      type: 'bar' as const,
      barMaxWidth: 34,
      itemStyle: {
        color: colors[index % colors.length],
        borderRadius: [4, 4, 0, 0],
      },
      data: categories.map((name) => group.data.find((d) => d.name === name)?.value ?? 0),
    })),
  }
}

/** 接单排行：横向条形。 */
export function rankOption(
  rows: { nickname: string; count: number }[],
  palette: ChartPalette,
): EChartsOption {
  const sorted = [...rows].sort((a, b) => a.count - b.count)
  return {
    ...baseOption(palette),
    grid: { left: 4, right: 24, top: 8, bottom: 4, containLabel: true },
    tooltip: {
      trigger: 'item',
      backgroundColor: palette.surface,
      borderColor: palette.border,
      borderWidth: 1,
      textStyle: { color: palette.text, fontSize: 12 },
      formatter: '{b}<br/><b>{c}</b> 单',
    },
    xAxis: {
      type: 'value',
      minInterval: 1,
      splitLine: { lineStyle: { color: palette.border, type: 'dashed' } },
      axisLabel: { color: palette.textMuted, fontSize: 11 },
    },
    yAxis: {
      type: 'category',
      data: sorted.map((row) => row.nickname),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: palette.textMuted, fontSize: 11 },
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 16,
        itemStyle: { color: palette.secondary, borderRadius: [0, 4, 4, 0] },
        label: {
          show: true,
          position: 'right',
          color: palette.textMuted,
          fontSize: 11,
        },
        data: sorted.map((row) => row.count),
      },
    ],
  }
}
