import { forwardRef } from "react"
import { AlertDialog as BaseAlert } from "@base-ui/react/alert-dialog"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Alert ──────────────────────────────────────────────────────────────

export const Alert = BaseAlert.Root

export type AlertProps = React.ComponentProps<typeof BaseAlert.Root>

// ─── AlertTrigger ───────────────────────────────────────────────────────

export type AlertTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAlert.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

export const AlertTrigger = forwardRef<HTMLButtonElement, AlertTriggerProps>(function AlertTrigger(
  { sx, ...props },
  ref,
) {
  return <BaseAlert.Trigger ref={ref} {...props} {...stylex.props(sx)} />
})

// ─── AlertPortal ────────────────────────────────────────────────────────

export const AlertPortal = BaseAlert.Portal

export type AlertPortalProps = React.ComponentProps<typeof BaseAlert.Portal>

// ─── AlertBackdrop ──────────────────────────────────────────────────────

export type AlertBackdropProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAlert.Backdrop>,
  "className"
> & {
  sx?: StyleXStyles
}

const backdropStyles = stylex.create({
  base: {
    position: "fixed",
    inset: 0,
    zIndex: 50,
    backgroundColor: "rgb(0 0 0 / 0.5)",
  },
})

export const AlertBackdrop = forwardRef<HTMLDivElement, AlertBackdropProps>(function AlertBackdrop(
  { sx, ...props },
  ref,
) {
  return <BaseAlert.Backdrop ref={ref} {...props} {...stylex.props(backdropStyles.base, sx)} />
})

// ─── AlertContent ───────────────────────────────────────────────────────

export type AlertContentProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAlert.Popup>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 50,
    display: "grid",
    width: "100%",
    maxWidth: "512px",
    gap: spacing[4],
    padding: spacing[6],
    backgroundColor: colors.background,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.xl,
    boxShadow: shadows.lg,
    fontFamily: fonts.sans,
    outline: "none",
  },
})

export const AlertContent = forwardRef<HTMLDivElement, AlertContentProps>(function AlertContent(
  { sx, ...props },
  ref,
) {
  return (
    <BaseAlert.Popup ref={ref} {...props} {...stylex.props(shared.reset, contentStyles.base, sx)} />
  )
})

// ─── AlertTitle ─────────────────────────────────────────────────────────

export type AlertTitleProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAlert.Title>,
  "className"
> & {
  sx?: StyleXStyles
}

const titleStyles = stylex.create({
  base: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.sans,
    color: colors.foreground,
  },
})

export const AlertTitle = forwardRef<HTMLHeadingElement, AlertTitleProps>(function AlertTitle(
  { sx, ...props },
  ref,
) {
  return (
    <BaseAlert.Title ref={ref} {...props} {...stylex.props(shared.reset, titleStyles.base, sx)} />
  )
})

// ─── AlertDescription ───────────────────────────────────────────────────

export type AlertDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAlert.Description>,
  "className"
> & {
  sx?: StyleXStyles
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    color: colors.mutedForeground,
    lineHeight: lineHeights.normal,
  },
})

export const AlertDescription = forwardRef<HTMLParagraphElement, AlertDescriptionProps>(
  function AlertDescription({ sx, ...props }, ref) {
    return (
      <BaseAlert.Description
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, descriptionStyles.base, sx)}
      />
    )
  },
)

// ─── AlertClose ─────────────────────────────────────────────────────────

export type AlertCloseProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAlert.Close>,
  "className"
> & {
  sx?: StyleXStyles
}

export const AlertClose = forwardRef<HTMLButtonElement, AlertCloseProps>(function AlertClose(
  { sx, ...props },
  ref,
) {
  return <BaseAlert.Close ref={ref} {...props} {...stylex.props(sx)} />
})
