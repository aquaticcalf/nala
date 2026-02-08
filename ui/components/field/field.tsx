import { forwardRef } from "react"
import { Field as BaseField } from "@base-ui/react/field"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Field ────────────────────────────────────────────────────────────────────

export type FieldProps = Omit<React.ComponentPropsWithRef<typeof BaseField.Root>, "className"> & {
  sx?: StyleXStyles
}

const fieldStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[2],
  },
})

export const Field = forwardRef<HTMLDivElement, FieldProps>(function Field({ sx, ...props }, ref) {
  return <BaseField.Root ref={ref} {...props} {...stylex.props(fieldStyles.base, sx)} />
})

// ─── FieldLabel ───────────────────────────────────────────────────────────────

export type FieldLabelProps = Omit<
  React.ComponentPropsWithRef<typeof BaseField.Label>,
  "className"
> & {
  sx?: StyleXStyles
}

const labelStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.sans,
    color: colors.foreground,
    lineHeight: lineHeights.tight,
  },
})

export const FieldLabel = forwardRef<HTMLLabelElement, FieldLabelProps>(function FieldLabel(
  { sx, ...props },
  ref,
) {
  return (
    <BaseField.Label ref={ref} {...props} {...stylex.props(shared.reset, labelStyles.base, sx)} />
  )
})

// ─── FieldDescription ─────────────────────────────────────────────────────────

export type FieldDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof BaseField.Description>,
  "className"
> & {
  sx?: StyleXStyles
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.sans,
    color: colors.mutedForeground,
    lineHeight: lineHeights.normal,
  },
})

export const FieldDescription = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  function FieldDescription({ sx, ...props }, ref) {
    return (
      <BaseField.Description
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, descriptionStyles.base, sx)}
      />
    )
  },
)

// ─── FieldError ───────────────────────────────────────────────────────────────

export type FieldErrorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseField.Error>,
  "className"
> & {
  sx?: StyleXStyles
}

const errorStyles = stylex.create({
  base: {
    fontSize: fontSizes.xs,
    fontFamily: fonts.sans,
    fontWeight: fontWeights.medium,
    color: colors.destructive,
    lineHeight: lineHeights.normal,
  },
})

export const FieldError = forwardRef<HTMLParagraphElement, FieldErrorProps>(function FieldError(
  { sx, ...props },
  ref,
) {
  return (
    <BaseField.Error ref={ref} {...props} {...stylex.props(shared.reset, errorStyles.base, sx)} />
  )
})

// ─── FieldControl ─────────────────────────────────────────────────────────────

export const FieldControl = BaseField.Control

export type FieldControlProps = React.ComponentProps<typeof BaseField.Control>
