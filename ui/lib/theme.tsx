import { createContext, use, type ReactNode } from "react"
import * as stylex from "@stylexjs/stylex"
import { darkTheme } from "@/tokens/colors.ts"

type Theme = "light" | "dark"

const ThemeContext = createContext<Theme>("light")

const themeMap = {
  light: undefined,
  dark: darkTheme,
} as const

type ThemeProviderProps = {
  theme?: Theme
  children: ReactNode
}

/**
 * Provides the current theme to all descendant components via context,
 * and applies the corresponding StyleX theme variables to the wrapper element.
 *
 * Usage:
 * ```tsx
 * <ThemeProvider theme="dark">
 *   <App />
 * </ThemeProvider>
 * ```
 */
export function ThemeProvider({ theme = "light", children }: ThemeProviderProps) {
  const themeStyle = themeMap[theme]
  return (
    <ThemeContext value={theme}>
      <div {...stylex.props(themeStyle)}>{children}</div>
    </ThemeContext>
  )
}

/**
 * Returns the current theme value from the nearest ThemeProvider.
 */
export function useTheme(): Theme {
  return use(ThemeContext)
}

export type { Theme }
