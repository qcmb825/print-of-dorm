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
  /** 强调色**当文字、图标、描边、细线、图表序列用**的深度。
   *
   *  与 primary 的分工不是审美选择，是测量结果：浅色下 primary 是荧光黄 #fffa00，
   *  压在浅底上只有 1.01~1.10:1 —— 当文字、当描边、当图表线全都看不见（整条黄谱都救不回来，
   *  最深的 #a89a00 也只有 2.74:1，到不了非文本图形的 3:1）。深色下 primary 本身有 18.37:1，
   *  这支就等于 primary。
   *
   *  **凡是「线」而不是「面」的用途都读它，不要读 primary。** primary 只用于
   *  可承载 primaryForeground 的大面积填充（主按钮、菜单/分页激活块）。 */
  accentText: string
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
  accentText: '--accent-text',
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
  /* 「线」用途的派生色。强调色的描边/细线一律走 --accent-text，不走 primary —— 理由见
   * Tokens.accentText 的注释。 */
  const at = derive(t.accentText, isDark)
  const panel = t.surfaceOverlay
  const brandFont = '17px'
  /* 聚焦光晕。原先是写死的 #d4a01726 / #ffd00026，等于把 primary 的 hex 抄了一份 ——
   * 强调色一换它就静默漂移。改成从令牌派生的 color-mix。 */
  /* 聚焦提示：**2px 实心环**，不是柔和光晕。
   * 这套语言里没有模糊光晕，但焦点指示属于必须保留的无障碍信号（WCAG 2.4.11 要 3:1）。
   * 实心环既符合硬边语汇，实测又够：浅色 #756a00 压白底 5.22:1、深色 #fffa00 压 #050505 18.4:1。 */
  const focusRing = `0 0 0 2px ${t.accentText}`

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
      /* 输入框占位符原先是 t.textQuaternary（40% 黑，2.61:1）—— 占位符是**要读的**
       * 提示文字，不是装饰。mutedForeground 是现成的合格值（#71717a，4.59:1）。 */
      placeholderColor: t.mutedForeground,
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
      /* 字号对齐 tokens.css 的 --text-* 阶梯（正文收窄、标题放大，拉开落差）。
       * 改这里之前先看 tokens.css 里那张阶梯表。 */
      fontSize: '15px',
      fontSizeMini: '11px',
      fontSizeTiny: '12px',
      fontSizeSmall: '13px',
      fontSizeMedium: '15px',
      fontSizeLarge: '17px',
      fontSizeHuge: '20px',
      lineHeight: '1.6',

      // 参考站的面板圆角是 12px、主按钮是方角；这里圆角给中等值，
      // 主按钮的方角在各自组件上单独覆盖。
      /* 圆角全局归零。这一条与下一行足够 —— 已验证 button / card / dialog / input /
       * tag / tooltip / popover / menu / alert / upload / drawer / switch / pagination /
       * tabs / notification / message / radio / slider 的圆角都从这两个 common 变量派生，
       * 所以各组件块里那些重复的 borderRadius 键已一并删除。
       * 例外只有三处，都不归 common 管、必须单独处理：checkbox 走 borderRadiusSmall（这里也归零了）、
       * NProgress 是组件 prop（UploadView 里两处已改 0）、NBadge 的计数泡硬编码 9px（见 base.css 末尾）。 */
      borderRadius: '0',
      borderRadiusSmall: '0',
      heightMini: '24px',
      heightTiny: '28px',
      heightSmall: '32px',
      heightMedium: '38px',
      heightLarge: '44px',
      heightHuge: '50px',
      /* 三级投影全部置 none。这套语言用黑色半透明遮罩（--scrim-*）压暗下层来分层，
       * 不给上层加投影 —— 实测鹰角官网主 CSS 里 box-shadow 总共只出现一次。
       * 弹层因此失去与背景的分离手段，所以 base.css 末尾给它们补了 1px 硬描边。 */
      boxShadow1: 'none',
      boxShadow2: 'none',
      boxShadow3: 'none',
    },
    Card: {
      color: panel,
      borderColor: t.border,
      titleFontSizeMedium: brandFont,
      titleFontWeight: '700',
    },
    Button: {
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
      thPaddingMedium: '10px 14px',
      tdPaddingMedium: '12px 14px',
      fontSizeMedium: '13px',
    },
    Input: {
      color: t.surfaceInput,
      border: `1px solid ${t.border}`,
      borderHover: `1px solid ${at.hover}`,
      borderFocus: `1px solid ${t.accentText}`,
      boxShadowFocus: focusRing,
    },
    InternalSelection: {
      color: t.surfaceInput,
      border: `1px solid ${t.border}`,
      borderHover: `1px solid ${at.hover}`,
      borderFocus: `1px solid ${t.accentText}`,
      borderActive: `1px solid ${t.accentText}`,
      boxShadowFocus: focusRing,
      boxShadowActive: focusRing,
    },
    Tag: {
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
      itemHeight: '42px',
    },
    Tabs: {
      tabTextColorActiveLine: t.foreground,
      tabTextColorHoverLine: t.foreground,
      /* 标签指示条是「线」不是「面」，走 accentText —— 荧光黄当线在浅色下 1.05:1，会消失。 */
      barColor: t.accentText,
      tabFontWeightActive: '700',
      tabFontWeight: '600',
    },
    Dialog: {
      color: panel,
      titleFontSize: '17px',
      titleFontWeight: '700',
    },
    Upload: {
      draggerColor: 'transparent',
      draggerBorder: `1px dashed ${t.border}`,
      draggerBorderHover: `1px dashed ${t.accentText}`,
    },
    Statistic: {
      /* 指标值是全站字号落差的顶端（正文 13、面板小标题 11，这里是 44）。
       * 目标风格靠这种极端落差建立层级，而不是靠卡片与阴影。 */
      valueFontSize: '44px',
      labelFontSize: '12px',
      labelTextColor: t.textTertiary,
      valueTextColor: t.textPrimary,
    },
    Switch: {
      /* 轨道与按钮的圆角**默认是从轨道高度算出来的**（18/2=9px、14/2=7px），走的是
       * 「round 为真则取高度一半」那条路 —— 和 Button 的 circle 属性同一个机制，
       * 所以光把 common.borderRadius 置 0 不够，每个 <NSwitch> 还得显式传 :round="false"
       * （界面上的 7 处已经都传了）。
       * 这里再显式置 0 是为了让「圆角归零」在主题里也留个痕 —— 否则后人看到 Switch 没有
       * 任何圆角配置，会以为我们漏了它。 */
      railBorderRadiusSmall: '0',
      railBorderRadiusMedium: '0',
      railBorderRadiusLarge: '0',
      buttonBorderRadiusSmall: '0',
      buttonBorderRadiusMedium: '0',
      buttonBorderRadiusLarge: '0',
      /* 旋钮的投影是 naive 里**硬编码**的 `0 1px 4px rgba(0,0,0,.3)`，
       * 不派生自 boxShadow1/2/3 —— 所以只把那三支置 none 是不够的，实测这处会漏网。 */
      buttonBoxShadow: 'none',
      /* 聚焦同样改成 2px 实心环，与 Input / InternalSelection 一致。 */
      boxShadowFocus: focusRing,
    },
    Pagination: {
      itemTextColorActive: t.primaryForeground,
      itemColorActive: p.base,
    },
    Tooltip: {
      color: t.surfaceTooltip,
      // 提示框底在深浅主题下都是深色，所以文字固定用白色，不跟着主题走
      textColor: '#ffffff',
    },
    Alert: {
    },
    Message: {
      colorInfo: panel,
      colorSuccess: panel,
      colorWarning: panel,
      colorError: panel,
      textColorInfo: t.textPrimary,
      textColorSuccess: t.textPrimary,
      textColorWarning: t.textPrimary,
      textColorError: t.textPrimary,
      boxShadow: 'none',
    },
    Form: {
      labelFontWeight: '600',
      labelTextColor: t.textSecondary,
      feedbackHeightMedium: '22px',
    },
    Empty: {
      /* 空态的插图是「图形」，WCAG 要 3:1；textQuaternary 只有 2.61:1。 */
      iconColor: t.textTertiary,
      textColor: t.textTertiary,
    },
  }
}

export function naiveThemeFor(isDark: boolean): GlobalTheme | null {
  return isDark ? darkTheme : null
}
