import { forwardRef } from "react"
import { Popover as BasePopover } from "@base-ui/react/popover"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Popover ──────────────────────────────────────────────────────────────────

export const Popover = BasePopover.Root

export type PopoverProps = React.ComponentProps<typeof BasePopover.Root>

// ─── PopoverTrigger ───────────────────────────────────────────────────────────

export type PopoverTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

export const PopoverTrigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  function PopoverTrigger({ sx, ...props }, ref) {
    return <BasePopover.Trigger ref={ref} {...props} {...stylex.props(sx)} />
  },
)

// ─── PopoverPortal ────────────────────────────────────────────────────────────

export const PopoverPortal = BasePopover.Portal

export type PopoverPortalProps = React.ComponentProps<typeof BasePopover.Portal>

// ─── PopoverPositioner ────────────────────────────────────────────────────────

export type PopoverPositionerProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Positioner>,
  "className"
> & {
  sx?: StyleXStyles
}

const positionerStyles = stylex.create({
  base: {
    zIndex: 50,
  },
})

export const PopoverPositioner = forwardRef<HTMLDivElement, PopoverPositionerProps>(
  function PopoverPositioner({ sx, ...props }, ref) {
    return (
      <BasePopover.Positioner ref={ref} {...props} {...stylex.props(positionerStyles.base, sx)} />
    )
  },
)

// ─── PopoverContent ───────────────────────────────────────────────────────────

export type PopoverContentProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Popup>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    width: "18rem",
    padding: spacing[4],
    backgroundColor: colors.popover,
    color: colors.popoverForeground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.lg,
    boxShadow: shadows.md,
    fontFamily: fonts.sans,
    outline: "none",
  },
})

export const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  function PopoverContent({ sx, ...props }, ref) {
    return (
      <BasePopover.Popup
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, contentStyles.base, sx)}
      />
    )
  },
)

// ─── PopoverArrow ─────────────────────────────────────────────────────────────

export type PopoverArrowProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Arrow>,
  "className"
> & {
  sx?: StyleXStyles
}

const arrowStyles = stylex.create({
  base: {
    width: "10px",
    height: "5px",
    backgroundColor: colors.popover,
  },
})

export const PopoverArrow = forwardRef<HTMLDivElement, PopoverArrowProps>(function PopoverArrow(
  { sx, ...props },
  ref,
) {
  return <BasePopover.Arrow ref={ref} {...props} {...stylex.props(arrowStyles.base, sx)} />
})

// ─── PopoverClose ─────────────────────────────────────────────────────────────

export type PopoverCloseProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Close>,
  "className"
> & {
  sx?: StyleXStyles
}

export const PopoverClose = forwardRef<HTMLButtonElement, PopoverCloseProps>(function PopoverClose(
  { sx, ...props },
  ref,
) {
  return <BasePopover.Close ref={ref} {...props} {...stylex.props(sx)} />
})

// ─── PopoverTitle ─────────────────────────────────────────────────────────────

export type PopoverTitleProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Title>,
  "className"
> & {
  sx?: StyleXStyles
}

const titleStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.sans,
    color: colors.foreground,
  },
})

export const PopoverTitle = forwardRef<HTMLHeadingElement, PopoverTitleProps>(function PopoverTitle(
  { sx, ...props },
  ref,
) {
  return (
    <BasePopover.Title ref={ref} {...props} {...stylex.props(shared.reset, titleStyles.base, sx)} />
  )
})

// ─── PopoverDescription ───────────────────────────────────────────────────────

export type PopoverDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof BasePopover.Description>,
  "className"
> & {
  sx?: StyleXStyles
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.sans,
    color: colors.mutedForeground,
    lineHeight: lineHeights.normal,
  },
})

export const PopoverDescription = forwardRef<HTMLParagraphElement, PopoverDescriptionProps>(
  function PopoverDescription({ sx, ...props }, ref) {
    return (
      <BasePopover.Description
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, descriptionStyles.base, sx)}
      />
    )
  },
)
