import { forwardRef } from "react"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

export type TextareaProps = Omit<React.ComponentPropsWithRef<"textarea">, "className"> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  base: {
    display: "flex",
    width: "100%",
    minHeight: "80px",
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    lineHeight: lineHeights.normal,
    color: colors.foreground,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.input,
    borderRadius: radii.md,
    outline: "none",
    resize: "vertical",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "150ms",
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
  },
})

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { sx, ...props },
  ref,
) {
  return <textarea ref={ref} {...props} {...stylex.props(shared.reset, styles.base, sx)} />
})
