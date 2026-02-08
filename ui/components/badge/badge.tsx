import { forwardRef } from "react"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

type Variant = "default" | "secondary" | "destructive" | "outline"

export type BadgeProps = Omit<React.ComponentPropsWithRef<"span">, "className"> & {
  variant?: Variant
  sx?: StyleXStyles
}

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    paddingInline: "10px",
    paddingBlock: "2px",
    fontFamily: fonts.sans,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    lineHeight: 1,
    borderRadius: radii.full,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    whiteSpace: "nowrap",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "150ms",
  },
})

const variantStyles = stylex.create({
  default: {
    backgroundColor: colors.primary,
    color: colors.primaryForeground,
    borderColor: "transparent",
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryForeground,
    borderColor: "transparent",
  },
  destructive: {
    backgroundColor: colors.destructive,
    color: colors.destructiveForeground,
    borderColor: "transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.foreground,
    borderColor: colors.border,
  },
})

const variantMap = {
  default: variantStyles.default,
  secondary: variantStyles.secondary,
  destructive: variantStyles.destructive,
  outline: variantStyles.outline,
} as const

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant = "default", sx, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      {...props}
      {...stylex.props(shared.reset, styles.base, variantMap[variant], sx)}
    />
  )
})
