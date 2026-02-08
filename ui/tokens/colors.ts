import * as stylex from "@stylexjs/stylex"

// Semantic color tokens for the design system.
// Override these with stylex.createTheme() for custom palettes.

export const colors = stylex.defineVars({
  // Backgrounds
  background: "hsl(0 0% 100%)",
  foreground: "hsl(240 10% 3.9%)",

  // Muted surfaces (disabled, subtle backgrounds)
  muted: "hsl(240 4.8% 95.9%)",
  mutedForeground: "hsl(240 3.8% 46.1%)",

  // Cards and elevated surfaces
  card: "hsl(0 0% 100%)",
  cardForeground: "hsl(240 10% 3.9%)",

  // Popovers, dropdowns, tooltips
  popover: "hsl(0 0% 100%)",
  popoverForeground: "hsl(240 10% 3.9%)",

  // Borders and dividers
  border: "hsl(240 5.9% 90%)",
  input: "hsl(240 5.9% 90%)",

  // Primary action color
  primary: "hsl(240 5.9% 10%)",
  primaryForeground: "hsl(0 0% 98%)",

  // Secondary action color
  secondary: "hsl(240 4.8% 95.9%)",
  secondaryForeground: "hsl(240 5.9% 10%)",

  // Accent (hover highlights, subtle selections)
  accent: "hsl(240 4.8% 95.9%)",
  accentForeground: "hsl(240 5.9% 10%)",

  // Destructive actions
  destructive: "hsl(0 84.2% 60.2%)",
  destructiveForeground: "hsl(0 0% 98%)",

  // Focus rings
  ring: "hsl(240 5.9% 10%)",
})

// Dark theme override
export const darkTheme = stylex.createTheme(colors, {
  background: "hsl(240 10% 3.9%)",
  foreground: "hsl(0 0% 98%)",

  muted: "hsl(240 3.7% 15.9%)",
  mutedForeground: "hsl(240 5% 64.9%)",

  card: "hsl(240 10% 3.9%)",
  cardForeground: "hsl(0 0% 98%)",

  popover: "hsl(240 10% 3.9%)",
  popoverForeground: "hsl(0 0% 98%)",

  border: "hsl(240 3.7% 15.9%)",
  input: "hsl(240 3.7% 15.9%)",

  primary: "hsl(0 0% 98%)",
  primaryForeground: "hsl(240 5.9% 10%)",

  secondary: "hsl(240 3.7% 15.9%)",
  secondaryForeground: "hsl(0 0% 98%)",

  accent: "hsl(240 3.7% 15.9%)",
  accentForeground: "hsl(0 0% 98%)",

  destructive: "hsl(0 62.8% 30.6%)",
  destructiveForeground: "hsl(0 0% 98%)",

  ring: "hsl(240 4.9% 83.9%)",
})
