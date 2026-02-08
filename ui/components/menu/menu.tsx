import { forwardRef } from "react"
import { Menu as BaseMenu } from "@base-ui/react/menu"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Menu ─────────────────────────────────────────────────────────────────────

export const Menu = BaseMenu.Root

export type MenuProps = React.ComponentProps<typeof BaseMenu.Root>

// ─── MenuTrigger ──────────────────────────────────────────────────────────────

export type MenuTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

export const MenuTrigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(function MenuTrigger(
  { sx, ...props },
  ref,
) {
  return <BaseMenu.Trigger ref={ref} {...props} {...stylex.props(sx)} />
})

// ─── MenuPortal ───────────────────────────────────────────────────────────────

export const MenuPortal = BaseMenu.Portal

export type MenuPortalProps = React.ComponentProps<typeof BaseMenu.Portal>

// ─── MenuPositioner ───────────────────────────────────────────────────────────

export type MenuPositionerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.Positioner>,
  "className"
> & {
  sx?: StyleXStyles
}

const positionerStyles = stylex.create({
  base: {
    zIndex: 50,
  },
})

export const MenuPositioner = forwardRef<HTMLDivElement, MenuPositionerProps>(
  function MenuPositioner({ sx, ...props }, ref) {
    return <BaseMenu.Positioner ref={ref} {...props} {...stylex.props(positionerStyles.base, sx)} />
  },
)

// ─── MenuPopup ────────────────────────────────────────────────────────────────

export type MenuPopupProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.Popup>,
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

export const MenuPopup = forwardRef<HTMLDivElement, MenuPopupProps>(function MenuPopup(
  { sx, ...props },
  ref,
) {
  return (
    <BaseMenu.Popup ref={ref} {...props} {...stylex.props(shared.reset, popupStyles.base, sx)} />
  )
})

// ─── MenuItem ─────────────────────────────────────────────────────────────────

export type MenuItemProps = Omit<React.ComponentPropsWithRef<typeof BaseMenu.Item>, "className"> & {
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

export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { sx, ...props },
  ref,
) {
  return (
    <BaseMenu.Item
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

// ─── MenuCheckboxItem ─────────────────────────────────────────────────────────

export type MenuCheckboxItemProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.CheckboxItem>,
  "className"
> & {
  sx?: StyleXStyles
}

const checkboxItemStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    paddingInlineStart: spacing[8],
    paddingInlineEnd: spacing[2],
    paddingBlock: spacing[1.5],
    fontSize: fontSizes.sm,
    fontFamily: fonts.sans,
    borderRadius: radii.sm,
    cursor: "pointer",
    outline: "none",
    position: "relative",
    transitionProperty: "background-color, color",
    transitionDuration: "100ms",
    userSelect: "none",
  },
  highlighted: {
    backgroundColor: colors.accent,
    color: colors.accentForeground,
  },
})

export const MenuCheckboxItem = forwardRef<HTMLDivElement, MenuCheckboxItemProps>(
  function MenuCheckboxItem({ sx, ...props }, ref) {
    return (
      <BaseMenu.CheckboxItem
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            shared.reset,
            checkboxItemStyles.base,
            state.highlighted && checkboxItemStyles.highlighted,
            sx,
          ).className
        }
      />
    )
  },
)

// ─── MenuCheckboxItemIndicator ────────────────────────────────────────────────

export type MenuCheckboxItemIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.CheckboxItemIndicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const checkboxIndicatorStyles = stylex.create({
  base: {
    position: "absolute",
    left: spacing[2],
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

export const MenuCheckboxItemIndicator = forwardRef<
  HTMLSpanElement,
  MenuCheckboxItemIndicatorProps
>(function MenuCheckboxItemIndicator({ sx, children, ...props }, ref) {
  return (
    <BaseMenu.CheckboxItemIndicator
      ref={ref}
      keepMounted
      {...props}
      {...stylex.props(checkboxIndicatorStyles.base, sx)}
    >
      {children ?? defaultCheckIcon}
    </BaseMenu.CheckboxItemIndicator>
  )
})

// ─── MenuRadioGroup ───────────────────────────────────────────────────────────

export const MenuRadioGroup = BaseMenu.RadioGroup

export type MenuRadioGroupProps = React.ComponentProps<typeof BaseMenu.RadioGroup>

// ─── MenuRadioItem ────────────────────────────────────────────────────────────

export type MenuRadioItemProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.RadioItem>,
  "className"
> & {
  sx?: StyleXStyles
}

const radioItemStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    gap: spacing[2],
    width: "100%",
    paddingInlineStart: spacing[8],
    paddingInlineEnd: spacing[2],
    paddingBlock: spacing[1.5],
    fontSize: fontSizes.sm,
    fontFamily: fonts.sans,
    borderRadius: radii.sm,
    cursor: "pointer",
    outline: "none",
    position: "relative",
    transitionProperty: "background-color, color",
    transitionDuration: "100ms",
    userSelect: "none",
  },
  highlighted: {
    backgroundColor: colors.accent,
    color: colors.accentForeground,
  },
})

export const MenuRadioItem = forwardRef<HTMLDivElement, MenuRadioItemProps>(function MenuRadioItem(
  { sx, ...props },
  ref,
) {
  return (
    <BaseMenu.RadioItem
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(
          shared.reset,
          radioItemStyles.base,
          state.highlighted && radioItemStyles.highlighted,
          sx,
        ).className
      }
    />
  )
})

// ─── MenuRadioItemIndicator ───────────────────────────────────────────────────

export type MenuRadioItemIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.RadioItemIndicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const radioIndicatorStyles = stylex.create({
  base: {
    position: "absolute",
    left: spacing[2],
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: spacing[3.5],
    height: spacing[3.5],
  },
})

// Hoisted static SVG for radio dot
const defaultRadioDot = (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="4" cy="4" r="4" fill="currentColor" />
  </svg>
)

export const MenuRadioItemIndicator = forwardRef<HTMLSpanElement, MenuRadioItemIndicatorProps>(
  function MenuRadioItemIndicator({ sx, children, ...props }, ref) {
    return (
      <BaseMenu.RadioItemIndicator
        ref={ref}
        keepMounted
        {...props}
        {...stylex.props(radioIndicatorStyles.base, sx)}
      >
        {children ?? defaultRadioDot}
      </BaseMenu.RadioItemIndicator>
    )
  },
)

// ─── MenuGroup ────────────────────────────────────────────────────────────────

export const MenuGroup = BaseMenu.Group

export type MenuGroupProps = React.ComponentProps<typeof BaseMenu.Group>

// ─── MenuGroupLabel ───────────────────────────────────────────────────────────

export type MenuGroupLabelProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.GroupLabel>,
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

export const MenuGroupLabel = forwardRef<HTMLDivElement, MenuGroupLabelProps>(
  function MenuGroupLabel({ sx, ...props }, ref) {
    return (
      <BaseMenu.GroupLabel
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, groupLabelStyles.base, sx)}
      />
    )
  },
)

// ─── MenuSeparator ────────────────────────────────────────────────────────────

export type MenuSeparatorProps = Omit<React.ComponentPropsWithRef<"div">, "className"> & {
  sx?: StyleXStyles
}

const separatorStyles = stylex.create({
  base: {
    height: "1px",
    marginBlock: spacing[1],
    backgroundColor: colors.border,
  },
})

export const MenuSeparator = forwardRef<HTMLDivElement, MenuSeparatorProps>(function MenuSeparator(
  { sx, ...props },
  ref,
) {
  return <div ref={ref} role="separator" {...props} {...stylex.props(separatorStyles.base, sx)} />
})

// ─── MenuSubmenu ──────────────────────────────────────────────────────────────

export const MenuSubmenu = BaseMenu.SubmenuRoot

export type MenuSubmenuProps = React.ComponentProps<typeof BaseMenu.SubmenuRoot>

// ─── MenuSubmenuTrigger ───────────────────────────────────────────────────────

export type MenuSubmenuTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseMenu.SubmenuTrigger>,
  "className"
> & {
  sx?: StyleXStyles
}

const submenuTriggerStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
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
})

// Hoisted static chevron for submenu
const submenuChevron = (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.5 3L7.5 6L4.5 9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const MenuSubmenuTrigger = forwardRef<HTMLDivElement, MenuSubmenuTriggerProps>(
  function MenuSubmenuTrigger({ sx, children, ...props }, ref) {
    return (
      <BaseMenu.SubmenuTrigger
        ref={ref}
        {...props}
        className={(state) =>
          stylex.props(
            shared.reset,
            submenuTriggerStyles.base,
            state.highlighted && submenuTriggerStyles.highlighted,
            sx,
          ).className
        }
      >
        {children}
        {submenuChevron}
      </BaseMenu.SubmenuTrigger>
    )
  },
)
