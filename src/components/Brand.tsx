import { Box, ThemeIcon } from '@mantine/core'
import { IconShieldLock } from '@tabler/icons-react'

type BrandMarkProps = {
  size?: number
  iconSize?: number
  radius?: string
}

/**
 * The product mark. One definition, used by the app header, the login screen and
 * the 404 page — swap the icon and gradient here when the project has real branding.
 */
export function BrandMark({ size = 36, iconSize = 20, radius = 'md' }: BrandMarkProps) {
  return (
    <ThemeIcon
      variant="gradient"
      gradient={{ from: 'brand.5', to: 'brand.7', deg: 145 }}
      size={size}
      radius={radius}
    >
      <IconShieldLock size={iconSize} stroke={1.7} />
    </ThemeIcon>
  )
}

/**
 * Soft brand aura for the full-page surfaces that render outside the app shell.
 * Sits on its own layer, so the parent needs `position: relative` and `isolation`.
 * The gradient itself lives in `index.css` — it differs per color scheme.
 */
export function BrandBackdrop() {
  return <Box aria-hidden className="brand-backdrop" />
}
