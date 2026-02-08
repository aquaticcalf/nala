import type * as stylex from "@stylexjs/stylex"

/**
 * A StyleX style or array of styles that can be passed to components.
 * This is the public type consumers use to override component styles.
 */
export type StyleXStyles = stylex.StyleXStyles

/**
 * Props that support StyleX style overrides.
 * Components accepting style overrides should extend this.
 */
export type StyleProps = {
  sx?: StyleXStyles
}
