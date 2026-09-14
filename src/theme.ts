import { createTheme } from '@mantine/core'
import type { MantineColorsTuple } from '@mantine/core'

/** Brand ramp. Replace these ten shades when the downstream project has a real palette. */
const brand: MantineColorsTuple = [
  '#eff5ff',
  '#dbe8ff',
  '#bcd5ff',
  '#93baff',
  '#699bff',
  '#4a80f8',
  '#1566f0',
  '#0f52c9',
  '#0e44a3',
  '#0d3a85',
]

/**
 * Single source of truth for design tokens. Both color schemes read from here —
 * light/dark specific values come from Mantine's own variables, so a component
 * should almost never branch on the color scheme by hand.
 */
export const theme = createTheme({
  colors: { brand },
  primaryColor: 'brand',
  primaryShade: { light: 6, dark: 4 },
  autoContrast: true,
  luminanceThreshold: 0.35,
  defaultRadius: 'md',
  focusRing: 'auto',
  cursorType: 'pointer',
  fontFamily:
    '"Inter Variable", Inter, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  fontFamilyMonospace:
    'ui-monospace, "SF Mono", SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
  /** Soft and low-contrast — surfaces are separated by ground color first, shadow second. */
  shadows: {
    xs: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.04)',
    sm: '0 1px 2px rgba(16, 24, 40, 0.04), 0 4px 10px -2px rgba(16, 24, 40, 0.06)',
    md: '0 4px 12px -2px rgba(16, 24, 40, 0.07), 0 12px 28px -8px rgba(16, 24, 40, 0.10)',
    lg: '0 8px 24px -6px rgba(16, 24, 40, 0.10), 0 24px 52px -12px rgba(16, 24, 40, 0.14)',
    xl: '0 12px 32px -8px rgba(16, 24, 40, 0.12), 0 40px 76px -16px rgba(16, 24, 40, 0.18)',
  },
  radius: {
    xs: '6px',
    sm: '8px',
    md: '10px',
    lg: '14px',
    xl: '20px',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.8125rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem',
  },
  headings: {
    fontWeight: '650',
    sizes: {
      h1: { fontSize: '2rem', lineHeight: '1.2', fontWeight: '720' },
      h2: { fontSize: '1.75rem', lineHeight: '1.22', fontWeight: '700' },
      h3: { fontSize: '1.25rem', lineHeight: '1.35' },
      h4: { fontSize: '1rem', lineHeight: '1.4' },
      h5: { fontSize: '0.875rem', lineHeight: '1.45' },
      h6: { fontSize: '0.8125rem', lineHeight: '1.45' },
    },
  },
  components: {
    Paper: {
      defaultProps: { withBorder: true, radius: 'lg' },
    },
    Card: {
      defaultProps: { withBorder: true, radius: 'lg', shadow: 'xs' },
    },
    Button: {
      defaultProps: { size: 'md', radius: 'xl' },
    },
    ActionIcon: {
      defaultProps: { radius: 'md' },
    },
    TextInput: {
      defaultProps: { size: 'md' },
    },
    PasswordInput: {
      defaultProps: { size: 'md' },
    },
    Select: {
      defaultProps: { size: 'md' },
    },
    Badge: {
      // Render the label as authored — uppercasing micro-text costs legibility.
      defaultProps: { radius: 'xl', tt: 'none' },
    },
    Tooltip: {
      defaultProps: { radius: 'md', openDelay: 200 },
    },
    ThemeIcon: {
      defaultProps: { variant: 'light', radius: 'md' },
    },
  },
})
