import { forwardRef } from "react"
import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group"
import { Radio as BaseRadio } from "@base-ui/react/radio"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { spacing } from "@/tokens/spacing.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── RadioGroup ───────────────────────────────────────────────────────────────

export type RadioGroupProps = Omit<
  React.ComponentPropsWithRef<typeof BaseRadioGroup>,
  "className"
> & {
  sx?: StyleXStyles
}

const groupStyles = stylex.create({
  base: {
    display: "grid",
    gap: spacing[2],
  },
})

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { sx, ...props },
  ref,
) {
  return <BaseRadioGroup ref={ref} {...props} {...stylex.props(groupStyles.base, sx)} />
})

// ─── Radio ────────────────────────────────────────────────────────────────────

export type RadioProps = Omit<React.ComponentPropsWithRef<typeof BaseRadio.Root>, "className"> & {
  sx?: StyleXStyles
}

const radioStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "16px",
    height: "16px",
    flexShrink: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primary,
    borderRadius: radii.full,
    backgroundColor: "transparent",
    padding: 0,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "border-color, box-shadow",
    transitionDuration: "150ms",
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
})

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(function Radio(
  { sx, ...props },
  ref,
) {
  return (
    <BaseRadio.Root ref={ref} {...props} {...stylex.props(shared.reset, radioStyles.base, sx)} />
  )
})

// ─── RadioIndicator ───────────────────────────────────────────────────────────

export type RadioIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseRadio.Indicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const indicatorStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
})

const dotStyles = stylex.create({
  base: {
    width: "8px",
    height: "8px",
    borderRadius: radii.full,
    backgroundColor: colors.primary,
  },
})

// Hoisted static indicator dot
const indicatorDot = <div {...stylex.props(dotStyles.base)} />

export const RadioIndicator = forwardRef<HTMLSpanElement, RadioIndicatorProps>(
  function RadioIndicator({ sx, children, ...props }, ref) {
    return (
      <BaseRadio.Indicator ref={ref} {...props} {...stylex.props(indicatorStyles.base, sx)}>
        {children ?? indicatorDot}
      </BaseRadio.Indicator>
    )
  },
)
