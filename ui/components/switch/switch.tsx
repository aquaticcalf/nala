import { forwardRef } from "react"
import { Switch as BaseSwitch } from "@base-ui/react/switch"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Switch ──────────────────────────────────────────────────────────────────

export type SwitchProps = Omit<React.ComponentPropsWithRef<typeof BaseSwitch.Root>, "className"> & {
  sx?: StyleXStyles
}

const rootStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    width: "44px",
    height: "24px",
    flexShrink: 0,
    padding: "2px",
    borderWidth: 0,
    borderRadius: radii.full,
    backgroundColor: colors.input,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "background-color, box-shadow",
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
  },
})

export const Switch = forwardRef<HTMLSpanElement, SwitchProps>(function Switch(
  { sx, ...props },
  ref,
) {
  return (
    <BaseSwitch.Root
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(shared.reset, rootStyles.base, state.checked && rootStyles.checked, sx)
          .className
      }
    />
  )
})

// ─── SwitchThumb ─────────────────────────────────────────────────────────────

export type SwitchThumbProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSwitch.Thumb>,
  "className"
> & {
  sx?: StyleXStyles
}

const thumbStyles = stylex.create({
  base: {
    display: "block",
    width: "20px",
    height: "20px",
    borderRadius: radii.full,
    backgroundColor: colors.background,
    transitionProperty: "transform",
    transitionDuration: "150ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transform: "translateX(0)",
  },
  checked: {
    transform: "translateX(20px)",
  },
})

export const SwitchThumb = forwardRef<HTMLSpanElement, SwitchThumbProps>(function SwitchThumb(
  { sx, ...props },
  ref,
) {
  return (
    <BaseSwitch.Thumb
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(shared.reset, thumbStyles.base, state.checked && thumbStyles.checked, sx)
          .className
      }
    />
  )
})
