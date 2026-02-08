import { forwardRef } from "react"
import { Toast as BaseToast } from "@base-ui/react/toast"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// Re-export manager utilities from the namespace
export const createToastManager = BaseToast.createToastManager
export const useToastManager = BaseToast.useToastManager

// ─── ToastProvider ────────────────────────────────────────────────────────────

export const ToastProvider = BaseToast.Provider

export type ToastProviderProps = React.ComponentProps<typeof BaseToast.Provider>

// ─── ToastViewport ────────────────────────────────────────────────────────────

export type ToastViewportProps = Omit<
  React.ComponentPropsWithRef<typeof BaseToast.Viewport>,
  "className"
> & {
  sx?: StyleXStyles
}

const viewportStyles = stylex.create({
  base: {
    position: "fixed",
    bottom: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
    maxHeight: "100vh",
    width: "100%",
    maxWidth: "420px",
    padding: spacing[4],
    outline: "none",
  },
})

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(function ToastViewport(
  { sx, ...props },
  ref,
) {
  return <BaseToast.Viewport ref={ref} {...props} {...stylex.props(viewportStyles.base, sx)} />
})

// ─── Toast ────────────────────────────────────────────────────────────────────

export type ToastProps = Omit<React.ComponentPropsWithRef<typeof BaseToast.Root>, "className"> & {
  sx?: StyleXStyles
}

const toastStyles = stylex.create({
  base: {
    display: "flex",
    width: "100%",
    padding: spacing[4],
    backgroundColor: colors.background,
    color: colors.foreground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.lg,
    boxShadow: shadows.lg,
    fontFamily: fonts.sans,
    outline: "none",
  },
})

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast({ sx, ...props }, ref) {
  return (
    <BaseToast.Root ref={ref} {...props} {...stylex.props(shared.reset, toastStyles.base, sx)} />
  )
})

// ─── ToastTitle ───────────────────────────────────────────────────────────────

export type ToastTitleProps = Omit<
  React.ComponentPropsWithRef<typeof BaseToast.Title>,
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

export const ToastTitle = forwardRef<HTMLDivElement, ToastTitleProps>(function ToastTitle(
  { sx, ...props },
  ref,
) {
  return (
    <BaseToast.Title ref={ref} {...props} {...stylex.props(shared.reset, titleStyles.base, sx)} />
  )
})

// ─── ToastDescription ─────────────────────────────────────────────────────────

export type ToastDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof BaseToast.Description>,
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

export const ToastDescription = forwardRef<HTMLDivElement, ToastDescriptionProps>(
  function ToastDescription({ sx, ...props }, ref) {
    return (
      <BaseToast.Description
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, descriptionStyles.base, sx)}
      />
    )
  },
)

// ─── ToastClose ───────────────────────────────────────────────────────────────

export type ToastCloseProps = Omit<
  React.ComponentPropsWithRef<typeof BaseToast.Close>,
  "className"
> & {
  sx?: StyleXStyles
}

const closeStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    backgroundColor: "transparent",
    color: colors.mutedForeground,
    cursor: "pointer",
    outline: "none",
    padding: spacing[1],
    borderRadius: radii.sm,
    transitionProperty: "color, opacity",
    transitionDuration: "150ms",
    opacity: 0.7,
    ":hover": {
      opacity: 1,
    },
  },
})

export const ToastClose = forwardRef<HTMLButtonElement, ToastCloseProps>(function ToastClose(
  { sx, ...props },
  ref,
) {
  return (
    <BaseToast.Close ref={ref} {...props} {...stylex.props(shared.reset, closeStyles.base, sx)} />
  )
})

// ─── ToastAction ──────────────────────────────────────────────────────────────

export type ToastActionProps = Omit<
  React.ComponentPropsWithRef<typeof BaseToast.Action>,
  "className"
> & {
  sx?: StyleXStyles
}

const actionStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: spacing[3],
    paddingBlock: spacing[1],
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.sans,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.md,
    backgroundColor: "transparent",
    color: colors.foreground,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "background-color, border-color",
    transitionDuration: "150ms",
    ":hover": {
      backgroundColor: colors.muted,
    },
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
  },
})

export const ToastAction = forwardRef<HTMLButtonElement, ToastActionProps>(function ToastAction(
  { sx, ...props },
  ref,
) {
  return (
    <BaseToast.Action ref={ref} {...props} {...stylex.props(shared.reset, actionStyles.base, sx)} />
  )
})
