import { forwardRef } from "react"
import { Button as BaseButton } from "@base-ui/react/button"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { spacing } from "@/tokens/spacing.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
type Size = "default" | "sm" | "lg" | "icon"

export type ButtonProps = Omit<React.ComponentPropsWithRef<typeof BaseButton>, "className"> & {
  variant?: Variant
  size?: Size
  sx?: StyleXStyles
}

const styles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    whiteSpace: "nowrap",
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    borderRadius: radii.md,
    borderWidth: 0,
    borderStyle: "solid",
    cursor: "pointer",
    transitionProperty: "background-color, color, border-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    textDecorationLine: "none",
    outline: "none",
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
})

const variantStyles = stylex.create({
  default: {
    backgroundColor: colors.primary,
    color: colors.primaryForeground,
    ":hover": {
      backgroundColor: {
        default: null,
        ":not(:disabled)": "hsl(240 5.9% 20%)",
      },
    },
  },
  destructive: {
    backgroundColor: colors.destructive,
    color: colors.destructiveForeground,
    ":hover": {
      backgroundColor: {
        default: null,
        ":not(:disabled)": "hsl(0 84.2% 50%)",
      },
    },
  },
  outline: {
    backgroundColor: "transparent",
    color: colors.foreground,
    borderWidth: 1,
    borderColor: colors.border,
    ":hover": {
      backgroundColor: {
        default: null,
        ":not(:disabled)": colors.accent,
      },
    },
  },
  secondary: {
    backgroundColor: colors.secondary,
    color: colors.secondaryForeground,
    ":hover": {
      backgroundColor: {
        default: null,
        ":not(:disabled)": "hsl(240 4.8% 90%)",
      },
    },
  },
  ghost: {
    backgroundColor: "transparent",
    color: colors.foreground,
    ":hover": {
      backgroundColor: {
        default: null,
        ":not(:disabled)": colors.accent,
      },
    },
  },
  link: {
    backgroundColor: "transparent",
    color: colors.primary,
    textDecorationLine: {
      default: "none",
      ":hover": "underline",
    },
    textUnderlineOffset: "4px",
  },
})

const sizeStyles = stylex.create({
  default: {
    height: spacing[10],
    paddingInline: spacing[4],
    paddingBlock: spacing[2],
  },
  sm: {
    height: spacing[9],
    paddingInline: spacing[3],
    fontSize: fontSizes.xs,
    borderRadius: radii.default,
  },
  lg: {
    height: spacing[11],
    paddingInline: spacing[8],
    fontSize: fontSizes.base,
  },
  icon: {
    height: spacing[10],
    width: spacing[10],
    paddingInline: 0,
    paddingBlock: 0,
  },
})

const variantMap = {
  default: variantStyles.default,
  destructive: variantStyles.destructive,
  outline: variantStyles.outline,
  secondary: variantStyles.secondary,
  ghost: variantStyles.ghost,
  link: variantStyles.link,
} as const

const sizeMap = {
  default: sizeStyles.default,
  sm: sizeStyles.sm,
  lg: sizeStyles.lg,
  icon: sizeStyles.icon,
} as const

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "default", size = "default", sx, ...props },
  ref,
) {
  return (
    <BaseButton
      ref={ref}
      {...props}
      {...stylex.props(shared.reset, styles.base, variantMap[variant], sizeMap[size], sx)}
    />
  )
})
