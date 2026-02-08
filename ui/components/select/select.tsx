import { forwardRef } from "react"
import { Select as BaseSelect } from "@base-ui/react/select"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Select ──────────────────────────────────────────────────────────────────

export const Select = BaseSelect.Root

export type SelectProps = React.ComponentProps<typeof BaseSelect.Root>

// ─── SelectTrigger ───────────────────────────────────────────────────────────

export type SelectTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

const triggerStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[2],
    width: "100%",
    height: spacing[10],
    paddingInline: spacing[3],
    paddingBlock: spacing[2],
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    color: colors.foreground,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.input,
    borderRadius: radii.md,
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

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  function SelectTrigger({ sx, ...props }, ref) {
    return (
      <BaseSelect.Trigger
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, triggerStyles.base, sx)}
      />
    )
  },
)

// ─── SelectValue ─────────────────────────────────────────────────────────────

export type SelectValueProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Value>,
  "className"
> & {
  sx?: StyleXStyles
}

const valueStyles = stylex.create({
  base: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  placeholder: {
    color: colors.mutedForeground,
  },
})

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueProps>(function SelectValue(
  { sx, ...props },
  ref,
) {
  return <BaseSelect.Value ref={ref} {...props} {...stylex.props(valueStyles.base, sx)} />
})

// ─── SelectIcon ──────────────────────────────────────────────────────────────

export type SelectIconProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Icon>,
  "className"
> & {
  sx?: StyleXStyles
}

const iconStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: colors.mutedForeground,
  },
})

// Hoisted static SVG
const defaultChevronIcon = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 4.5L6 7.5L9 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const SelectIcon = forwardRef<HTMLSpanElement, SelectIconProps>(function SelectIcon(
  { sx, children, ...props },
  ref,
) {
  return (
    <BaseSelect.Icon ref={ref} {...props} {...stylex.props(iconStyles.base, sx)}>
      {children ?? defaultChevronIcon}
    </BaseSelect.Icon>
  )
})

// ─── SelectPortal ────────────────────────────────────────────────────────────

export const SelectPortal = BaseSelect.Portal

export type SelectPortalProps = React.ComponentProps<typeof BaseSelect.Portal>

// ─── SelectPositioner ────────────────────────────────────────────────────────

export type SelectPositionerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Positioner>,
  "className"
> & {
  sx?: StyleXStyles
}

const positionerStyles = stylex.create({
  base: {
    zIndex: 50,
  },
})

export const SelectPositioner = forwardRef<HTMLDivElement, SelectPositionerProps>(
  function SelectPositioner({ sx, ...props }, ref) {
    return (
      <BaseSelect.Positioner ref={ref} {...props} {...stylex.props(positionerStyles.base, sx)} />
    )
  },
)

// ─── SelectPopup ─────────────────────────────────────────────────────────────

export type SelectPopupProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Popup>,
  "className"
> & {
  sx?: StyleXStyles
}

const popupStyles = stylex.create({
  base: {
    overflow: "hidden",
    minWidth: "8rem",
    padding: spacing[1],
    backgroundColor: colors.popover,
    color: colors.popoverForeground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.md,
    boxShadow: shadows.md,
    fontFamily: fonts.sans,
    outline: "none",
  },
})

export const SelectPopup = forwardRef<HTMLDivElement, SelectPopupProps>(function SelectPopup(
  { sx, ...props },
  ref,
) {
  return (
    <BaseSelect.Popup ref={ref} {...props} {...stylex.props(shared.reset, popupStyles.base, sx)} />
  )
})

// ─── SelectItem ──────────────────────────────────────────────────────────────

export type SelectItemProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Item>,
  "className"
> & {
  sx?: StyleXStyles
}

const itemStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    paddingInline: spacing[2],
    paddingBlock: spacing[1.5],
    fontSize: fontSizes.sm,
    fontFamily: fonts.sans,
    borderRadius: radii.sm,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "background-color, color",
    transitionDuration: "100ms",
    userSelect: "none",
  },
  highlighted: {
    backgroundColor: colors.accent,
    color: colors.accentForeground,
  },
  disabled: {
    cursor: "not-allowed",
    opacity: 0.5,
  },
})

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { sx, ...props },
  ref,
) {
  return (
    <BaseSelect.Item
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          shared.reset,
          itemStyles.base,
          state.highlighted && itemStyles.highlighted,
          state.disabled && itemStyles.disabled,
          sx,
        ).className
      }
    />
  )
})

// ─── SelectItemIndicator ─────────────────────────────────────────────────────

export type SelectItemIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.ItemIndicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const itemIndicatorStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: spacing[3.5],
    height: spacing[3.5],
  },
})

// Hoisted static SVG
const defaultCheckIcon = (
  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 3L4.5 8.5L2 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const SelectItemIndicator = forwardRef<HTMLSpanElement, SelectItemIndicatorProps>(
  function SelectItemIndicator({ sx, children, ...props }, ref) {
    return (
      <BaseSelect.ItemIndicator
        ref={ref}
        keepMounted
        {...props}
        {...stylex.props(itemIndicatorStyles.base, sx)}
      >
        {children ?? defaultCheckIcon}
      </BaseSelect.ItemIndicator>
    )
  },
)

// ─── SelectItemText ──────────────────────────────────────────────────────────

export const SelectItemText = BaseSelect.ItemText

export type SelectItemTextProps = React.ComponentProps<typeof BaseSelect.ItemText>

// ─── SelectGroup ─────────────────────────────────────────────────────────────

export const SelectGroup = BaseSelect.Group

export type SelectGroupProps = React.ComponentProps<typeof BaseSelect.Group>

// ─── SelectGroupLabel ────────────────────────────────────────────────────────

export type SelectGroupLabelProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.GroupLabel>,
  "className"
> & {
  sx?: StyleXStyles
}

const groupLabelStyles = stylex.create({
  base: {
    paddingInline: spacing[2],
    paddingBlock: spacing[1.5],
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    color: colors.mutedForeground,
    fontFamily: fonts.sans,
  },
})

export const SelectGroupLabel = forwardRef<HTMLDivElement, SelectGroupLabelProps>(
  function SelectGroupLabel({ sx, ...props }, ref) {
    return (
      <BaseSelect.GroupLabel
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, groupLabelStyles.base, sx)}
      />
    )
  },
)

// ─── SelectSeparator ─────────────────────────────────────────────────────────

export type SelectSeparatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSelect.Separator>,
  "className"
> & {
  sx?: StyleXStyles
}

const selectSeparatorStyles = stylex.create({
  base: {
    height: "1px",
    marginBlock: spacing[1],
    backgroundColor: colors.border,
  },
})

export const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  function SelectSeparator({ sx, ...props }, ref) {
    return (
      <BaseSelect.Separator
        ref={ref}
        {...props}
        {...stylex.props(selectSeparatorStyles.base, sx)}
      />
    )
  },
)
