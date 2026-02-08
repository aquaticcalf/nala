import { forwardRef } from "react"
import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { spacing } from "@/tokens/spacing.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Checkbox ────────────────────────────────────────────────────────────────

export type CheckboxProps = Omit<
  React.ComponentPropsWithRef<typeof BaseCheckbox.Root>,
  "className"
> & {
  sx?: StyleXStyles
}

const rootStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: spacing[4],
    height: spacing[4],
    flexShrink: 0,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.primary,
    borderRadius: radii.sm,
    backgroundColor: "transparent",
    color: colors.primaryForeground,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "background-color, border-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  checked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
})

export const Checkbox = forwardRef<HTMLSpanElement, CheckboxProps>(function Checkbox(
  { sx, ...props },
  ref,
) {
  return (
    <BaseCheckbox.Root
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          shared.reset,
          rootStyles.base,
          (state.checked || state.indeterminate) && rootStyles.checked,
          sx,
        ).className
      }
    />
  )
})

// ─── CheckboxIndicator ───────────────────────────────────────────────────────

export type CheckboxIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseCheckbox.Indicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const indicatorStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    color: "currentcolor",
  },
})

// Hoisted static JSX — avoids re-creation on every render (rendering-hoist-jsx)
const defaultCheckIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CheckboxIndicator = forwardRef<HTMLSpanElement, CheckboxIndicatorProps>(
  function CheckboxIndicator({ sx, children, ...props }, ref) {
    return (
      <BaseCheckbox.Indicator
        ref={ref}
        keepMounted
        {...props}
        {...stylex.props(indicatorStyles.base, sx)}
      >
        {children ?? defaultCheckIcon}
      </BaseCheckbox.Indicator>
    )
  },
)
