import { forwardRef } from "react"
import { Separator as BaseSeparator } from "@base-ui/react/separator"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

export type SeparatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSeparator>,
  "className"
> & {
  sx?: StyleXStyles
}

const styles = stylex.create({
  base: {
    flexShrink: 0,
    backgroundColor: colors.border,
  },
  horizontal: {
    height: "1px",
    width: "100%",
  },
  vertical: {
    width: "1px",
    height: "100%",
  },
})

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = "horizontal", sx, ...props },
  ref,
) {
  return (
    <BaseSeparator
      ref={ref}
      orientation={orientation}
      {...props}
      {...stylex.props(
        shared.reset,
        styles.base,
        orientation === "vertical" ? styles.vertical : styles.horizontal,
        sx,
      )}
    />
  )
})
