import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { fonts } from "@/tokens/typography.ts"

/**
 * Shared base styles applied across all components for consistency.
 * These establish the foundation: border-box, font family, and color inheritance.
 */
export const shared = stylex.create({
  reset: {
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
  },
  base: {
    fontFamily: fonts.sans,
    color: colors.foreground,
  },
  focusRing: {
    outline: "none",
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
})
