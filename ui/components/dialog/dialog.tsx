import { forwardRef } from "react"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Dialog ──────────────────────────────────────────────────────────────────
// Re-export Root directly — it renders no DOM element, so no styling needed.

export const Dialog = BaseDialog.Root

export type DialogProps = React.ComponentProps<typeof BaseDialog.Root>

// ─── DialogTrigger ───────────────────────────────────────────────────────────

export type DialogTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseDialog.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

export const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
  function DialogTrigger({ sx, ...props }, ref) {
    return <BaseDialog.Trigger ref={ref} {...props} {...stylex.props(sx)} />
  },
)

// ─── DialogPortal ────────────────────────────────────────────────────────────
// Re-export Portal directly — it's a utility, not a styled element.

export const DialogPortal = BaseDialog.Portal

export type DialogPortalProps = React.ComponentProps<typeof BaseDialog.Portal>

// ─── DialogBackdrop ──────────────────────────────────────────────────────────

export type DialogBackdropProps = Omit<
  React.ComponentPropsWithRef<typeof BaseDialog.Backdrop>,
  "className"
> & {
  sx?: StyleXStyles
}

const backdropStyles = stylex.create({
  base: {
    position: "fixed",
    inset: 0,
    backgroundColor: "hsl(0 0% 0% / 0.5)",
    transitionProperty: "opacity",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
})

export const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
  function DialogBackdrop({ sx, ...props }, ref) {
    return <BaseDialog.Backdrop ref={ref} {...props} {...stylex.props(backdropStyles.base, sx)} />
  },
)

// ─── DialogContent (popup panel) ─────────────────────────────────────────────

export type DialogContentProps = Omit<
  React.ComponentPropsWithRef<typeof BaseDialog.Popup>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    gap: spacing[4],
    width: "100%",
    maxWidth: "28rem",
    maxHeight: "85vh",
    padding: spacing[6],
    backgroundColor: colors.popover,
    color: colors.popoverForeground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.lg,
    boxShadow: shadows.lg,
    fontFamily: fonts.sans,
    outline: "none",
    overflowY: "auto",
    transitionProperty: "opacity, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
})

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  { sx, ...props },
  ref,
) {
  return (
    <BaseDialog.Popup
      ref={ref}
      {...props}
      {...stylex.props(shared.reset, contentStyles.base, sx)}
    />
  )
})

// ─── DialogTitle ─────────────────────────────────────────────────────────────

export type DialogTitleProps = Omit<
  React.ComponentPropsWithRef<typeof BaseDialog.Title>,
  "className"
> & {
  sx?: StyleXStyles
}

const titleStyles = stylex.create({
  base: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    fontFamily: fonts.sans,
    color: colors.foreground,
  },
})

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  { sx, ...props },
  ref,
) {
  return (
    <BaseDialog.Title ref={ref} {...props} {...stylex.props(shared.reset, titleStyles.base, sx)} />
  )
})

// ─── DialogDescription ───────────────────────────────────────────────────────

export type DialogDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof BaseDialog.Description>,
  "className"
> & {
  sx?: StyleXStyles
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    color: colors.mutedForeground,
    lineHeight: lineHeights.normal,
    fontFamily: fonts.sans,
  },
})

export const DialogDescription = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  function DialogDescription({ sx, ...props }, ref) {
    return (
      <BaseDialog.Description
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, descriptionStyles.base, sx)}
      />
    )
  },
)

// ─── DialogClose ─────────────────────────────────────────────────────────────

export type DialogCloseProps = Omit<
  React.ComponentPropsWithRef<typeof BaseDialog.Close>,
  "className"
> & {
  sx?: StyleXStyles
}

const closeStyles = stylex.create({
  base: {
    position: "absolute",
    top: spacing[4],
    right: spacing[4],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: spacing[8],
    height: spacing[8],
    padding: 0,
    backgroundColor: "transparent",
    color: colors.mutedForeground,
    borderWidth: 0,
    borderRadius: radii.default,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "color, background-color",
    transitionDuration: "150ms",
    ":hover": {
      color: colors.foreground,
      backgroundColor: colors.accent,
    },
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
  },
})

export const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(function DialogClose(
  { sx, ...props },
  ref,
) {
  return (
    <BaseDialog.Close ref={ref} {...props} {...stylex.props(shared.reset, closeStyles.base, sx)} />
  )
})
