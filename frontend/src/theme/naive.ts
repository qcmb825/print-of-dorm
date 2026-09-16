/** 把 CSS 里的设计令牌翻译成 Naive UI 的 themeOverrides。
 *
 *  规则：**唯一事实来源是 tokens.css**。这里不写死任何主题相关的色值，
 *  一律在运行时从 :root 的 computed style 里读出来再映射过去，
 *  这样改令牌只需要动一个文件，也不会出现 CSS 和组件库两边对不上的情况。
 *
 *  只有两类例外，都留在这里算：hover/pressed 这类**派生色**（在 color.ts 里混合），
 *  以及纯 alpha 的**阴影**（不属于令牌体系，深浅两套写在本文件内）。
 */
import { darkTheme, type GlobalTheme, type GlobalThemeOverrides } from 'naive-ui'
import { derive } from './color'

export interface Tokens {
  background: string
  foreground: string
  card: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  border: string
  borderSubtle: string
  textPrimary: string
  textSecondary: string
  textTertiary: string
  textQuaternary: string
  textDisabled: string
  ok: string
  err: string
  warn: string
  info: string
  /** 订单状态色。图表要的是真实色值 —— canvas 里用不了 var()，必须把 hex 取出来。 */
  statusUnpriced: string
  statusPending: string
  statusPrinting: string
  statusReady: string
  statusDone: string
  /** 需要不透明的表面：--card 半透明，浮层/输入框用它会透出底色 */
  surfaceOverlay: string
  surfaceTableHead: string
  surfaceInput: string
  surfaceTooltip: string
  stackBody: string
  stackHeading: string
  stackMono: string
}

const VAR_MAP: Record<
  keyof Omit<Tokens, 'stackBody' | 'stackHeading' | 'stackMono'>,
  string
> = {
  background: '--background',
  foreground: '--foreground',
  card: '--card',
  primary: '--primary',
  primaryForeground: '--primary-foreground',
  secondary: '--secondary',
  secondaryForeground: '--secondary-foreground',
  muted: '--muted',
  mutedForeground: '--muted-foreground',
  border: '--border',
  borderSubtle: '--border-subtle',
  textPrimary: '--text-primary',
  textSecondary: '--text-secondary',
  textTertiary: '--text-tertiary',
  textQuaternary: '--text-quaternary',
  textDisabled: '--text-disabled',
  ok: '--ok',
  err: '--err',
  warn: '--warn',
  info: '--info',
  statusUnpriced: '--status-unpriced',
  statusPending: '--status-pending',
  statusPrinting: '--status-printing',
  statusReady: '--status-ready',
  statusDone: '--status-done',
  surfaceOverlay: '--surface-overlay',
  surfaceTableHead: '--surface-table-head',
  surfaceInput: '--surface-input',
  surfaceTooltip: '--surface-tooltip',
}

export function readTokens(): Tokens {
  const cs = getComputedStyle(document.documentElement)
  const out = {} as Tokens
  for (const [key, cssVar] of Object.entries(VAR_MAP)) {
    ;(out as unknown as Record<string, string>)[key] = cs.getPropertyValue(cssVar).trim()
  }
  out.stackBody = cs.getPropertyValue('--stack-body').trim()
  out.stackHeading = cs.getPropertyValue('--stack-heading').trim()
  out.stackMono = cs.getPropertyValue('--stack-mono').trim()
  return out
}

/** 卡片是半透明的，浮层必须是不透明的，否则底下内容会透上来。
 *  具体值来自 --surface-overlay 令牌（tokens.css 里深浅各一套）。 */

export function buildOverrides(t: Tokens, isDark: boolean): GlobalThemeOverrides {
  const p = derive(t.primary, isDark)
  const panel = t.surfaceOverlay
  const brandFont = '16px'

  return {
    common: {
      primaryColor: p.base,
      primaryColorHover: p.hover,
      primaryColorPressed: p.pressed,
      primaryColorSuppl: p.suppl,
      infoColor: t.info,
      infoColorHover: derive(t.info, isDark).hover,
      infoColorPressed: derive(t.info, isDark).pressed,
      infoColorSuppl: derive(t.info, isDark).suppl,
      successColor: t.ok,
      successColorHover: derive(t.ok, isDark).hover,
      successColorPressed: derive(t.ok, isDark).pressed,
      successColorSuppl: derive(t.ok, isDark).suppl,
      warningColor: t.warn,
      warningColorHover: derive(t.warn, isDark).hover,
      warningColorPressed: derive(t.warn, isDark).pressed,
      warningColorSuppl: derive(t.warn, isDark).suppl,
      errorColor: t.err,
      errorColorHover: derive(t.err, isDark).hover,
      errorColorPressed: derive(t.err, isDark).pressed,
      errorColorSuppl: derive(t.err, isDark).suppl,

      textColorBase: t.foreground,
      textColor1: t.textPrimary,
      textColor2: t.textSecondary,
      textColor3: t.textTertiary,
      textColorDisabled: t.textDisabled,
      placeholderColor: t.textQuaternary,
      placeholderColorDisabled: t.textDisabled,
      iconColor: t.textTertiary,
      iconColorHover: t.textSecondary,
      iconColorPressed: t.textPrimary,
      iconColorDisabled: t.textDisabled,

      bodyColor: t.background,
      cardColor: panel,
      modalColor: panel,
      popoverColor: panel,
      tableColor: 'transparent',
      tableHeaderColor: t.surfaceTableHead,
      tableColorHover: isDark ? '#ffffff0f' : '#00000005',
      tableColorStriped: isDark ? '#ffffff05' : '#00000002',
      inputColor: t.surfaceInput,
      inputColorDisabled: t.muted,
      actionColor: t.muted,
      tagColor: t.muted,
      avatarColor: t.muted,
      progressRailColor: t.muted,
      railColor: t.muted,
      scrollbarColor: isDark ? '#ffffff26' : '#00000026',
      scrollbarColorHover: isDark ? '#ffffff40' : '#00000040',
      dividerColor: t.border,
      borderColor: t.border,
      closeIconColor: t.textTertiary,
      closeIconColorHover: t.textSecondary,
      closeIconColorPressed: t.textPrimary,
      clearColor: t.textTertiary,
      clearColorHover: t.textSecondary,
      clearColorPressed: t.textPrimary,
      hoverColor: t.muted,

      fontFamily: t.stackBody,
      fontFamilyMono: t.stackMono,
      fontSize: '15px',
      fontSizeMini: '12px',
      fontSizeTiny: '12px',
      fontSizeSmall: '13px',
      fontSizeMedium: '15px',
      fontSizeLarge: '16px',
      fontSizeHuge: '18px',
      lineHeight: '1.6',

      // 参考站的面板圆角是 12px、主按钮是方角；这里圆角给中等值，
      // 主按钮的方角在各自组件上单独覆盖。
      borderRadius: '8px',
      borderRadiusSmall: '6px',
      heightMini: '24px',
      heightTiny: '28px',
      heightSmall: '32px',
      heightMedium: '38px',
      heightLarge: '44px',
      heightHuge: '50px',
      boxShadow1: isDark ? '0 8px 24px rgb(0 0 0 / 0.5)' : '0 8px 24px rgb(0 0 0 / 0.08)',
      boxShadow2: isDark ? '0 12px 32px rgb(0 0 0 / 0.55)' : '0 12px 32px rgb(0 0 0 / 0.1)',
      boxShadow3: isDark ? '0 16px 44px rgb(0 0 0 / 0.6)' : '0 16px 44px rgb(0 0 0 / 0.12)',
    },
    Card: {
      borderRadius: '12px',
      color: panel,
      borderColor: t.border,
      titleFontSizeMedium: brandFont,
      titleFontWeight: '700',
    },
    Button: {
      borderRadiusMedium: '8px',
      fontWeight: '700',
      fontWeightStrong: '700',
      textColorPrimary: t.primaryForeground,
      textColorHoverPrimary: t.primaryForeground,
      textColorPressedPrimary: t.primaryForeground,
      textColorFocusPrimary: t.primaryForeground,
      paddingMedium: '0 18px',
    },
    DataTable: {
      borderColor: t.border,
      thColor: t.surfaceTableHead,
      thTextColor: t.textTertiary,
      thFontWeight: '700',
      tdColorHover: isDark ? '#ffffff0d' : '#00000005',
      tdColorStriped: isDark ? '#ffffff05' : '#00000002',
      borderRadius: '12px',
      thPaddingMedium: '10px 14px',
      tdPaddingMedium: '12px 14px',
      fontSizeMedium: '14px',
    },
    Input: {
      borderRadius: '8px',
      color: t.surfaceInput,
      border: `1px solid ${t.border}`,
      borderHover: `1px solid ${derive(t.primary, isDark).hover}`,
      borderFocus: `1px solid ${p.base}`,
      boxShadowFocus: `0 0 0 2px ${isDark ? '#ffd00026' : '#d4a01726'}`,
    },
    InternalSelection: {
      borderRadius: '8px',
      color: t.surfaceInput,
      border: `1px solid ${t.border}`,
      borderHover: `1px solid ${derive(t.primary, isDark).hover}`,
      borderFocus: `1px solid ${p.base}`,
      borderActive: `1px solid ${p.base}`,
      boxShadowFocus: `0 0 0 2px ${isDark ? '#ffd00026' : '#d4a01726'}`,
      boxShadowActive: `0 0 0 2px ${isDark ? '#ffd00026' : '#d4a01726'}`,
    },
    Tag: {
      borderRadius: '999px',
      heightMedium: '26px',
      fontWeightStrong: '700',
      colorBordered: 'transparent',
    },
    Menu: {
      itemTextColorActive: t.primaryForeground,
      itemColorActive: p.base,
      itemColorActiveHover: p.hover,
      itemTextColorActiveHover: t.primaryForeground,
      itemTextColorActiveHoverHorizontal: t.primaryForeground,
      borderRadius: '8px',
      itemHeight: '42px',
    },
    Tabs: {
      tabTextColorActiveLine: t.foreground,
      tabTextColorHoverLine: t.foreground,
      barColor: p.base,
      tabFontWeightActive: '700',
      tabFontWeight: '600',
    },
    Dialog: {
      borderRadius: '12px',
      color: panel,
      titleFontSize: '17px',
      titleFontWeight: '700',
    },
    Upload: {
      draggerColor: 'transparent',
      draggerBorder: `1px dashed ${t.border}`,
      draggerBorderHover: `1px dashed ${p.base}`,
      borderRadius: '12px',
    },
    Statistic: {
      valueFontSize: '28px',
      labelFontSize: '12px',
      labelTextColor: t.textTertiary,
      valueTextColor: t.textPrimary,
    },
    Pagination: {
      itemBorderRadius: '6px',
      itemTextColorActive: t.primaryForeground,
      itemColorActive: p.base,
    },
    Tooltip: {
      color: t.surfaceTooltip,
      // 提示框底在深浅主题下都是深色，所以文字固定用白色，不跟着主题走
      textColor: '#ffffff',
      borderRadius: '6px',
    },
    Alert: {
      borderRadius: '10px',
    },
    Message: {
      borderRadius: '8px',
      colorInfo: panel,
      colorSuccess: panel,
      colorWarning: panel,
      colorError: panel,
      textColorInfo: t.textPrimary,
      textColorSuccess: t.textPrimary,
      textColorWarning: t.textPrimary,
      textColorError: t.textPrimary,
      boxShadow: isDark ? '0 8px 24px rgb(0 0 0 / 0.5)' : '0 8px 24px rgb(0 0 0 / 0.1)',
    },
    Form: {
      labelFontWeight: '600',
      labelTextColor: t.textSecondary,
      feedbackHeightMedium: '22px',
    },
    Empty: {
      iconColor: t.textQuaternary,
      textColor: t.textTertiary,
    },
  }
}

export function naiveThemeFor(isDark: boolean): GlobalTheme | null {
  return isDark ? darkTheme : null
}
