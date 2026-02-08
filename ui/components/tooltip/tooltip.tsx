import { forwardRef } from "react"
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── TooltipProvider ─────────────────────────────────────────────────────────

export const TooltipProvider = BaseTooltip.Provider

export type TooltipProviderProps = React.ComponentProps<typeof BaseTooltip.Provider>

// ─── Tooltip ─────────────────────────────────────────────────────────────────

export const Tooltip = BaseTooltip.Root

export type TooltipProps = React.ComponentProps<typeof BaseTooltip.Root>

// ─── TooltipTrigger ──────────────────────────────────────────────────────────

export type TooltipTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseTooltip.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(
  function TooltipTrigger({ sx, ...props }, ref) {
    return <BaseTooltip.Trigger ref={ref} {...props} {...stylex.props(sx)} />
  },
)

// ─── TooltipPortal ───────────────────────────────────────────────────────────

export const TooltipPortal = BaseTooltip.Portal

export type TooltipPortalProps = React.ComponentProps<typeof BaseTooltip.Portal>

// ─── TooltipPositioner ───────────────────────────────────────────────────────

export type TooltipPositionerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseTooltip.Positioner>,
  "className"
> & {
  sx?: StyleXStyles
}

const positionerStyles = stylex.create({
  base: {
    zIndex: 50,
  },
})

export const TooltipPositioner = forwardRef<HTMLDivElement, TooltipPositionerProps>(
  function TooltipPositioner({ sx, ...props }, ref) {
    return (
      <BaseTooltip.Positioner ref={ref} {...props} {...stylex.props(positionerStyles.base, sx)} />
    )
  },
)

// ─── TooltipContent ──────────────────────────────────────────────────────────

export type TooltipContentProps = Omit<
  React.ComponentPropsWithRef<typeof BaseTooltip.Popup>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    paddingInline: spacing[3],
    paddingBlock: spacing[1.5],
    fontSize: fontSizes.xs,
    fontFamily: fonts.sans,
    color: colors.primaryForeground,
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    boxShadow: shadows.md,
    outline: "none",
    transitionProperty: "opacity",
    transitionDuration: "150ms",
  },
})

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  function TooltipContent({ sx, ...props }, ref) {
    return (
      <BaseTooltip.Popup
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, contentStyles.base, sx)}
      />
    )
  },
)

// ─── TooltipArrow ────────────────────────────────────────────────────────────

export type TooltipArrowProps = Omit<
  React.ComponentPropsWithRef<typeof BaseTooltip.Arrow>,
  "className"
> & {
  sx?: StyleXStyles
}

const arrowStyles = stylex.create({
  base: {
    width: "10px",
    height: "5px",
    backgroundColor: colors.primary,
  },
})

export const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(function TooltipArrow(
  { sx, ...props },
  ref,
) {
  return <BaseTooltip.Arrow ref={ref} {...props} {...stylex.props(arrowStyles.base, sx)} />
})
