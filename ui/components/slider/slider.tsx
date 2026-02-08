import { forwardRef } from "react"
import { Slider as BaseSlider } from "@base-ui/react/slider"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { fontSizes, fonts } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Slider ───────────────────────────────────────────────────────────────────

export type SliderProps = Omit<React.ComponentPropsWithRef<typeof BaseSlider.Root>, "className"> & {
  sx?: StyleXStyles
}

const rootStyles = stylex.create({
  base: {
    position: "relative",
    display: "flex",
    width: "100%",
    alignItems: "center",
    touchAction: "none",
    userSelect: "none",
  },
})

export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  { sx, ...props },
  ref,
) {
  return <BaseSlider.Root ref={ref} {...props} {...stylex.props(rootStyles.base, sx)} />
})

// ─── SliderControl ────────────────────────────────────────────────────────────

export type SliderControlProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSlider.Control>,
  "className"
> & {
  sx?: StyleXStyles
}

const controlStyles = stylex.create({
  base: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
})

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>(function SliderControl(
  { sx, ...props },
  ref,
) {
  return <BaseSlider.Control ref={ref} {...props} {...stylex.props(controlStyles.base, sx)} />
})

// ─── SliderTrack ──────────────────────────────────────────────────────────────

export type SliderTrackProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSlider.Track>,
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

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(function SliderTrack(
  { sx, ...props },
  ref,
) {
  return (
    <BaseSlider.Track ref={ref} {...props} {...stylex.props(shared.reset, trackStyles.base, sx)} />
  )
})

// ─── SliderIndicator ──────────────────────────────────────────────────────────

export type SliderIndicatorProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSlider.Indicator>,
  "className"
> & {
  sx?: StyleXStyles
}

const indicatorStyles = stylex.create({
  base: {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: radii.full,
  },
})

export const SliderIndicator = forwardRef<HTMLDivElement, SliderIndicatorProps>(
  function SliderIndicator({ sx, ...props }, ref) {
    return <BaseSlider.Indicator ref={ref} {...props} {...stylex.props(indicatorStyles.base, sx)} />
  },
)

// ─── SliderThumb ──────────────────────────────────────────────────────────────

export type SliderThumbProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSlider.Thumb>,
  "className"
> & {
  sx?: StyleXStyles
}

const thumbStyles = stylex.create({
  base: {
    display: "block",
    width: "20px",
    height: "20px",
    borderRadius: radii.full,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.primary,
    backgroundColor: colors.background,
    cursor: "pointer",
    outline: "none",
    transitionProperty: "box-shadow",
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

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(function SliderThumb(
  { sx, ...props },
  ref,
) {
  return (
    <BaseSlider.Thumb ref={ref} {...props} {...stylex.props(shared.reset, thumbStyles.base, sx)} />
  )
})

// ─── SliderValue ──────────────────────────────────────────────────────────────

export type SliderValueProps = Omit<
  React.ComponentPropsWithRef<typeof BaseSlider.Value>,
  "className"
> & {
  sx?: StyleXStyles
}

const valueStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    fontFamily: fonts.sans,
    color: colors.mutedForeground,
  },
})

export const SliderValue = forwardRef<HTMLOutputElement, SliderValueProps>(function SliderValue(
  { sx, ...props },
  ref,
) {
  return <BaseSlider.Value ref={ref} {...props} {...stylex.props(valueStyles.base, sx)} />
})
