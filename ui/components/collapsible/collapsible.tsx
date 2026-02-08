import { forwardRef } from "react"
import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible"
import * as stylex from "@stylexjs/stylex"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Collapsible ──────────────────────────────────────────────────────────────

export const Collapsible = BaseCollapsible.Root

export type CollapsibleProps = React.ComponentProps<typeof BaseCollapsible.Root>

// ─── CollapsibleTrigger ───────────────────────────────────────────────────────

export type CollapsibleTriggerProps = Omit<
  React.ComponentPropsWithRef<typeof BaseCollapsible.Trigger>,
  "className"
> & {
  sx?: StyleXStyles
}

export const CollapsibleTrigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
  function CollapsibleTrigger({ sx, ...props }, ref) {
    return <BaseCollapsible.Trigger ref={ref} {...props} {...stylex.props(shared.reset, sx)} />
  },
)

// ─── CollapsibleContent ───────────────────────────────────────────────────────

export type CollapsibleContentProps = Omit<
  React.ComponentPropsWithRef<typeof BaseCollapsible.Panel>,
  "className"
> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    overflow: "hidden",
  },
})

export const CollapsibleContent = forwardRef<HTMLDivElement, CollapsibleContentProps>(
  function CollapsibleContent({ sx, ...props }, ref) {
    return <BaseCollapsible.Panel ref={ref} {...props} {...stylex.props(contentStyles.base, sx)} />
  },
)
