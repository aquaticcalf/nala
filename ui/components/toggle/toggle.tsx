import { forwardRef } from "react"
import { Toggle as BaseToggle } from "@base-ui/react/toggle"
import { ToggleGroup as BaseToggleGroup } from "@base-ui/react/toggle-group"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

export type ToggleGroupProps = Omit<
  React.ComponentPropsWithRef<typeof BaseToggleGroup>,
  "className"
> & {
  sx?: StyleXStyles
}

const groupStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[1],
  },
})

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(function ToggleGroup(
  { sx, ...props },
  ref,
) {
  return <BaseToggleGroup ref={ref} {...props} {...stylex.props(groupStyles.base, sx)} />
})

// ─── Toggle ───────────────────────────────────────────────────────────────────

export type ToggleProps = Omit<React.ComponentPropsWithRef<typeof BaseToggle>, "className"> & {
  sx?: StyleXStyles
}

const toggleStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing[2],
    height: spacing[10],
    paddingInline: spacing[3],
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.mutedForeground,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    borderRadius: radii.md,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "background-color, color, border-color",
    transitionDuration: "150ms",
    ":hover": {
      backgroundColor: colors.muted,
      color: colors.foreground,
    },
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  pressed: {
    backgroundColor: colors.accent,
    color: colors.accentForeground,
  },
})

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { sx, ...props },
  ref,
) {
  return (
    <BaseToggle
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(shared.reset, toggleStyles.base, state.pressed && toggleStyles.pressed, sx)
          .className
      }
    />
  )
})
