import {
  ActionIcon,
  Tooltip,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconMoon, IconSun } from '@tabler/icons-react'

/**
 * Flips between light and dark. `useComputedColorScheme` resolves the `auto`
 * setting to the value actually rendered, so the icon never disagrees with the UI.
 */
export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme()
  const computed = useComputedColorScheme('light', {
    getInitialValueInEffect: false,
  })
  const next = computed === 'dark' ? 'light' : 'dark'

  return (
    <Tooltip label={`Switch to ${next} theme`} position="bottom" withArrow>
      <ActionIcon
        onClick={() => setColorScheme(next)}
        variant="subtle"
        color="gray"
        size="lg"
        aria-label={`Switch to ${next} theme`}
      >
        {computed === 'dark' ? (
          <IconSun size={19} stroke={1.7} />
        ) : (
          <IconMoon size={19} stroke={1.7} />
        )}
      </ActionIcon>
    </Tooltip>
  )
}
