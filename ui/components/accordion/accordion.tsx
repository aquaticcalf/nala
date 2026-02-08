import { forwardRef } from "react"
import { Accordion as BaseAccordion } from "@base-ui/react/accordion"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Accordion ────────────────────────────────────────────────────────────────

export type AccordionProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAccordion.Root>,
  "className"
> & {
  sx?: StyleXStyles
}

const accordionStyles = stylex.create({
  base: {
    width: "100%",
  },
})

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { sx, ...props },
  ref,
) {
  return <BaseAccordion.Root ref={ref} {...props} {...stylex.props(accordionStyles.base, sx)} />
})

// ─── AccordionItem ────────────────────────────────────────────────────────────

export type AccordionItemProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAccordion.Item>,
  "className"
> & {
  sx?: StyleXStyles
}

const itemStyles = stylex.create({
  base: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: colors.border,
  },
})

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { sx, ...props },
  ref,
) {
  return <BaseAccordion.Item ref={ref} {...props} {...stylex.props(itemStyles.base, sx)} />
})

// ─── AccordionHeader ──────────────────────────────────────────────────────────

export type AccordionHeaderProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAccordion.Header>,
  "className"
> & {
  sx?: StyleXStyles
}

const headerStyles = stylex.create({
  base: {
    display: "flex",
  },
})

export const AccordionHeader = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
  function AccordionHeader({ sx, ...props }, ref) {
    return (
      <BaseAccordion.Header
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, headerStyles.base, sx)}
      />
    )
  },
)

// ─── AccordionTrigger ─────────────────────────────────────────────────────────

export type AccordionTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAccordion.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

const triggerStyles = stylex.create({
  base: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBlock: spacing[4],
    fontFamily: fonts.sans,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.foreground,
    backgroundColor: "transparent",
    borderWidth: 0,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "text-decoration-color",
    transitionDuration: "150ms",
    textDecorationLine: "underline",
    textDecorationColor: "transparent",
    textUnderlineOffset: "4px",
    ":hover": {
      textDecorationColor: "currentColor",
    },
    ":focus-visible": {
      boxShadow: `0 0 0 2px ${colors.background}, 0 0 0 4px ${colors.ring}`,
    },
  },
})

// Hoisted static SVG for chevron
const chevronIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transition: "transform 200ms", flexShrink: 0 }}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  function AccordionTrigger({ sx, children, ...props }, ref) {
    return (
      <BaseAccordion.Trigger
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, triggerStyles.base, sx)}
      >
        {children}
        {chevronIcon}
      </BaseAccordion.Trigger>
    )
  },
)

// ─── AccordionContent ─────────────────────────────────────────────────────────

export type AccordionContentProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAccordion.Panel>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    overflow: "hidden",
    fontSize: fontSizes.sm,
    fontFamily: fonts.sans,
    color: colors.foreground,
    paddingBottom: spacing[4],
  },
})

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ sx, ...props }, ref) {
    return <BaseAccordion.Panel ref={ref} {...props} {...stylex.props(contentStyles.base, sx)} />
  },
)
