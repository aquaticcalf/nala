import * as stylex from "@stylexjs/stylex"

export const fonts = stylex.defineVars({
  sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
})

export const fontSizes = stylex.defineVars({
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
})

export const lineHeights = stylex.defineVars({
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
})

export const fontWeights = stylex.defineVars({
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
})

export const letterSpacings = stylex.defineVars({
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0em",
  wide: "0.025em",
})
