import { forwardRef } from "react"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

export type SkeletonProps = Omit<React.ComponentPropsWithRef<"div">, "className"> & {
  sx?: StyleXStyles
}

const pulse = stylex.keyframes({
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
})

const styles = stylex.create({
  base: {
    backgroundColor: colors.muted,
    borderRadius: radii.md,
    animationName: pulse,
    animationDuration: "2s",
    animationTimingFunction: "cubic-bezier(0.4, 0, 0.6, 1)",
    animationIterationCount: "infinite",
  },
})

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  { sx, ...props },
  ref,
) {
  return <div ref={ref} {...props} {...stylex.props(shared.reset, styles.base, sx)} />
})
