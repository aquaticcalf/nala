import { forwardRef } from "react"
import { Avatar as BaseAvatar } from "@base-ui/react/avatar"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { fontSizes, fontWeights, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Avatar ──────────────────────────────────────────────────────────────────

export type AvatarProps = Omit<React.ComponentPropsWithRef<typeof BaseAvatar.Root>, "className"> & {
  sx?: StyleXStyles
}

const rootStyles = stylex.create({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    flexShrink: 0,
    overflow: "hidden",
    borderRadius: radii.full,
    backgroundColor: colors.muted,
    fontFamily: fonts.sans,
  },
})

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { sx, ...props },
  ref,
) {
  return (
    <BaseAvatar.Root ref={ref} {...props} {...stylex.props(shared.reset, rootStyles.base, sx)} />
  )
})

// ─── AvatarImage ─────────────────────────────────────────────────────────────

export type AvatarImageProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAvatar.Image>,
  "className"
> & {
  sx?: StyleXStyles
}

const imageStyles = stylex.create({
  base: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "inherit",
  },
})

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage(
  { sx, ...props },
  ref,
) {
  return <BaseAvatar.Image ref={ref} {...props} {...stylex.props(imageStyles.base, sx)} />
})

// ─── AvatarFallback ──────────────────────────────────────────────────────────

export type AvatarFallbackProps = Omit<
  React.ComponentPropsWithRef<typeof BaseAvatar.Fallback>,
  "className"
> & {
  sx?: StyleXStyles
}

const fallbackStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.mutedForeground,
    backgroundColor: colors.muted,
    borderRadius: "inherit",
  },
})

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  function AvatarFallback({ sx, ...props }, ref) {
    return (
      <BaseAvatar.Fallback
        ref={ref}
        {...props}
        {...stylex.props(shared.reset, fallbackStyles.base, sx)}
      />
    )
  },
)
