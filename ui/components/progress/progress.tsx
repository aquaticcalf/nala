import { forwardRef } from "react"
import { Progress as BaseProgress } from "@base-ui/react/progress"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Progress ─────────────────────────────────────────────────────────────────

export const Progress = BaseProgress.Root

export type ProgressProps = React.ComponentProps<typeof BaseProgress.Root>

// ─── ProgressTrack ────────────────────────────────────────────────────────────

export type ProgressTrackProps = Omit<
  React.ComponentPropsWithRef<typeof BaseProgress.Track>,
  "className"
> & {
  sx?: StyleXStyles
}

const trackStyles = stylex.create({
  base: {
    position: "relative",
    width: "100%",
    height: "8px",
    overflow: "hidden",
    borderRadius: radii.full,
    backgroundColor: colors.muted,
  },
})

export const ProgressTrack = forwardRef<HTMLDivElement, ProgressTrackProps>(function ProgressTrack(
  { sx, ...props },
  ref,
) {
  return (
    <BaseProgress.Track
      ref={ref}
      {...props}
      {...stylex.props(shared.reset, trackStyles.base, sx)}
    />
  )
})

// ─── ProgressIndicator ────────────────────────────────────────────────────────

export type ProgressIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseProgress.Indicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const indicatorStyles = stylex.create({
  base: {
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: radii.full,
    transitionProperty: "width",
    transitionDuration: "300ms",
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
})

export const ProgressIndicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  function ProgressIndicator({ sx, ...props }, ref) {
    return (
      <BaseProgress.Indicator ref={ref} {...props} {...stylex.props(indicatorStyles.base, sx)} />
    )
  },
)
