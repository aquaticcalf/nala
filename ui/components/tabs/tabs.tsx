import { forwardRef } from "react"
import { Tabs as BaseTabs } from "@base-ui/react/tabs"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Tabs ────────────────────────────────────────────────────────────────────

export type TabsProps = Omit<React.ComponentPropsWithRef<typeof BaseTabs.Root>, "className"> & {
  sx?: StyleXStyles
}

const tabsStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
  },
})

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs({ sx, ...props }, ref) {
  return <BaseTabs.Root ref={ref} {...props} {...stylex.props(tabsStyles.base, sx)} />
})

// ─── TabsList ────────────────────────────────────────────────────────────────

export type TabsListProps = Omit<React.ComponentPropsWithRef<typeof BaseTabs.List>, "className"> & {
  sx?: StyleXStyles
}

const listStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    gap: spacing[1],
    padding: spacing[1],
    backgroundColor: colors.muted,
    borderRadius: radii.lg,
    fontFamily: fonts.sans,
  },
})

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { sx, ...props },
  ref,
) {
  return <BaseTabs.List ref={ref} {...props} {...stylex.props(shared.reset, listStyles.base, sx)} />
})

// ─── TabsTrigger ─────────────────────────────────────────────────────────────

export type TabsTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseTabs.Tab>,
  "className"
> & {
  sx?: StyleXStyles
}

const triggerStyles = stylex.create({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    paddingInline: spacing[3],
    paddingBlock: spacing[1.5],
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    fontFamily: fonts.sans,
    color: colors.mutedForeground,
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: radii.md,
    cursor: "pointer",
    outline: "none",
    whiteSpace: "nowrap",
    transitionProperty: "background-color, color, box-shadow",
    transitionDuration: "150ms",
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
    ":disabled": {
      cursor: "not-allowed",
      opacity: 0.5,
    },
  },
  active: {
    backgroundColor: colors.background,
    color: colors.foreground,
    boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  },
})

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(function TabsTrigger(
  { sx, ...props },
  ref,
) {
  return (
    <BaseTabs.Tab
      ref={ref}
      {...props}
      className={(state) =>
        stylex.props(shared.reset, triggerStyles.base, state.active && triggerStyles.active, sx)
          .className
      }
    />
  )
})

// ─── TabsContent ─────────────────────────────────────────────────────────────

export type TabsContentProps = Omit<
  React.ComponentPropsWithRef<typeof BaseTabs.Panel>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    padding: spacing[4],
    outline: "none",
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
  },
})

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(function TabsContent(
  { sx, ...props },
  ref,
) {
  return <BaseTabs.Panel ref={ref} {...props} {...stylex.props(contentStyles.base, sx)} />
})
