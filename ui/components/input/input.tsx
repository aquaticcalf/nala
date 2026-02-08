import { forwardRef } from "react"
import { Input as BaseInput } from "@base-ui/react/input"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { fontSizes, fonts } from "@/tokens/typography.ts"
import { spacing } from "@/tokens/spacing.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

export type InputProps = Omit<React.ComponentPropsWithRef<typeof BaseInput>, "className"> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  base: {
    display: "flex",
    width: "100%",
    height: spacing[10],
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    color: colors.foreground,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.input,
    borderRadius: radii.md,
    outline: "none",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    "::placeholder": {
      color: colors.mutedForeground,
    },
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    ":read-only": {
      cursor: "default",
    },
  },
})

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { sx, ...props },
  ref,
) {
  return <BaseInput ref={ref} {...props} {...stylex.props(shared.reset, styles.base, sx)} />
})
