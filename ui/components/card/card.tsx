import { forwardRef } from "react"
import * as stylex from "@stylexjs/stylex"
import { colors } from "@/tokens/colors.ts"
import { radii } from "@/tokens/radii.ts"
import { shadows } from "@/tokens/shadows.ts"
import { spacing } from "@/tokens/spacing.ts"
import { fontSizes, fontWeights, fonts, lineHeights } from "@/tokens/typography.ts"
import { shared } from "@/lib/shared.ts"
import type { StyleXStyles } from "@/lib/types.ts"

// ─── Card ─────────────────────────────────────────────────────────────────────

export type CardProps = Omit<React.ComponentPropsWithRef<"div">, "className"> & {
  sx?: StyleXStyles
}

const cardStyles = stylex.create({
  base: {
    backgroundColor: colors.card,
    color: colors.cardForeground,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border,
    borderRadius: radii.xl,
    boxShadow: shadows.sm,
    fontFamily: fonts.sans,
  },
})

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ sx, ...props }, ref) {
  return <div ref={ref} {...props} {...stylex.props(shared.reset, cardStyles.base, sx)} />
})

// ─── CardHeader ───────────────────────────────────────────────────────────────

export type CardHeaderProps = Omit<React.ComponentPropsWithRef<"div">, "className"> & {
  sx?: StyleXStyles
}

const headerStyles = stylex.create({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: spacing[1.5],
    padding: spacing[6],
  },
})

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { sx, ...props },
  ref,
) {
  return <div ref={ref} {...props} {...stylex.props(headerStyles.base, sx)} />
})

// ─── CardTitle ────────────────────────────────────────────────────────────────

export type CardTitleProps = Omit<React.ComponentPropsWithRef<"h3">, "className"> & {
  sx?: StyleXStyles
}

const titleStyles = stylex.create({
  base: {
    fontSize: fontSizes["2xl"],
    fontWeight: fontWeights.semibold,
    lineHeight: lineHeights.tight,
    letterSpacing: "-0.025em",
  },
})

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(function CardTitle(
  { sx, ...props },
  ref,
) {
  return <h3 ref={ref} {...props} {...stylex.props(shared.reset, titleStyles.base, sx)} />
})

// ─── CardDescription ──────────────────────────────────────────────────────────

export type CardDescriptionProps = Omit<React.ComponentPropsWithRef<"p">, "className"> & {
  sx?: StyleXStyles
}

const descriptionStyles = stylex.create({
  base: {
    fontSize: fontSizes.sm,
    color: colors.mutedForeground,
    lineHeight: lineHeights.normal,
  },
})

export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  function CardDescription({ sx, ...props }, ref) {
    return <p ref={ref} {...props} {...stylex.props(shared.reset, descriptionStyles.base, sx)} />
  },
)

// ─── CardContent ──────────────────────────────────────────────────────────────

export type CardContentProps = Omit<React.ComponentPropsWithRef<"div">, "className"> & {
  sx?: StyleXStyles
}

const contentStyles = stylex.create({
  base: {
    padding: spacing[6],
    paddingTop: spacing[0],
  },
})

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(function CardContent(
  { sx, ...props },
  ref,
) {
  return <div ref={ref} {...props} {...stylex.props(contentStyles.base, sx)} />
})

// ─── CardFooter ───────────────────────────────────────────────────────────────

export type CardFooterProps = Omit<React.ComponentPropsWithRef<"div">, "className"> & {
  sx?: StyleXStyles
}

const footerStyles = stylex.create({
  base: {
    display: "flex",
    alignItems: "center",
    padding: spacing[6],
    paddingTop: spacing[0],
  },
})

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { sx, ...props },
  ref,
) {
  return <div ref={ref} {...props} {...stylex.props(footerStyles.base, sx)} />
})
