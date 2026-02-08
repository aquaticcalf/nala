import { forwardRef } from "react"
import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── ScrollArea ───────────────────────────────────────────────────────────────

export type ScrollAreaProps = Omit<
  React.ComponentPropsWithRef<typeof BaseScrollArea.Root>,
  "className"
> & {
  sx?: StyleXStyles
}

const rootStyles = stylex.create({
  base: {
    position: "relative",
    overflow: "hidden",
  },
})

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(function ScrollArea(
  { sx, ...props },
  ref,
) {
  return <BaseScrollArea.Root ref={ref} {...props} {...stylex.props(rootStyles.base, sx)} />
})

// ─── ScrollAreaViewport ───────────────────────────────────────────────────────

export type ScrollAreaViewportProps = Omit<
  React.ComponentPropsWithRef<typeof BaseScrollArea.Viewport>,
  "className"
> & {
  sx?: StyleXStyles
}

const viewportStyles = stylex.create({
  base: {
    width: "100%",
    height: "100%",
    overflowY: "scroll",
    overflowX: "hidden",
  },
})

export const ScrollAreaViewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>(
  function ScrollAreaViewport({ sx, ...props }, ref) {
    return (
      <BaseScrollArea.Viewport ref={ref} {...props} {...stylex.props(viewportStyles.base, sx)} />
    )
  },
)

// ─── ScrollAreaScrollbar ──────────────────────────────────────────────────────

export type ScrollAreaScrollbarProps = Omit<
  React.ComponentPropsWithRef<typeof BaseScrollArea.Scrollbar>,
  "className"
> & {
  sx?: StyleXStyles
}

const scrollbarStyles = stylex.create({
  base: {
    display: "flex",
    touchAction: "none",
    userSelect: "none",
    transitionProperty: "opacity",
    transitionDuration: "150ms",
    padding: "1px",
  },
  vertical: {
    width: "10px",
    height: "100%",
    borderLeftWidth: 1,
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
    paddingInline: "1px",
  },
  horizontal: {
    height: "10px",
    flexDirection: "column",
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "transparent",
    paddingBlock: "1px",
  },
})

export const ScrollAreaScrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>(
  function ScrollAreaScrollbar({ orientation = "vertical", sx, ...props }, ref) {
    return (
      <BaseScrollArea.Scrollbar
        ref={ref}
        orientation={orientation}
        {...props}
        {...stylex.props(
          scrollbarStyles.base,
          orientation === "horizontal" ? scrollbarStyles.horizontal : scrollbarStyles.vertical,
          sx,
        )}
      />
    )
  },
)

// ─── ScrollAreaThumb ──────────────────────────────────────────────────────────

export type ScrollAreaThumbProps = Omit<
  React.ComponentPropsWithRef<typeof BaseScrollArea.Thumb>,
  "className"
> & {
  sx?: StyleXStyles
}

const thumbStyles = stylex.create({
  base: {
    position: "relative",
    flex: 1,
    borderRadius: radii.full,
    backgroundColor: colors.border,
  },
})

export const ScrollAreaThumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>(
  function ScrollAreaThumb({ sx, ...props }, ref) {
    return <BaseScrollArea.Thumb ref={ref} {...props} {...stylex.props(thumbStyles.base, sx)} />
  },
)

// ─── ScrollAreaCorner ─────────────────────────────────────────────────────────

export const ScrollAreaCorner = BaseScrollArea.Corner

export type ScrollAreaCornerProps = React.ComponentProps<typeof BaseScrollArea.Corner>
