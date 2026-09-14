import {
  Box,
  Card,
  Divider,
  Group,
  SegmentedControl,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react'
import type { MantineColorScheme } from '@mantine/core'
import { PageHeader } from '../components/PageHeader.tsx'
import { useAuthStore } from '../stores/authStore.ts'
import { useUiStore } from '../stores/uiStore.ts'

const SCHEME_OPTIONS = [
  { value: 'light', label: 'Light', icon: IconSun },
  { value: 'dark', label: 'Dark', icon: IconMoon },
  { value: 'auto', label: 'System', icon: IconDeviceDesktop },
]

export function SettingsPage() {
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const computed = useComputedColorScheme('light', {
    getInitialValueInEffect: false,
  })
  const user = useAuthStore((state) => state.user)
  const navCollapsed = useUiStore((state) => state.navCollapsed)
  const toggleNavCollapsed = useUiStore((state) => state.toggleNavCollapsed)

  return (
    <Box maw={720}>
      <PageHeader
        breadcrumbs={['Home', 'Settings']}
        title="Settings"
        description="Preferences are stored in this browser."
      />

      <Stack gap="lg">
        <Card padding="lg">
          <Title order={4}>Appearance</Title>
          <Text c="dimmed" size="md" mt={4}>
            <b>System</b> follows the operating system setting — currently resolving to{' '}
            {computed}.
          </Text>
          <SegmentedControl
            mt="md"
            fullWidth
            radius="md"
            value={colorScheme}
            onChange={(value) => setColorScheme(value as MantineColorScheme)}
            data={SCHEME_OPTIONS.map(({ value, label, icon: Icon }) => ({
              value,
              label: (
                <Group gap={6} justify="center" wrap="nowrap">
                  <Icon size={16} stroke={1.7} />
                  <span>{label}</span>
                </Group>
              ),
            }))}
          />

          <Divider my="lg" />

          <Group justify="space-between" wrap="nowrap">
            <div>
              <Text size="md" fw={600}>
                Collapsed sidebar
              </Text>
              <Text size="sm" c="dimmed">
                Show the navigation as an icon rail on wide screens.
              </Text>
            </div>
            <Switch
              checked={navCollapsed}
              onChange={toggleNavCollapsed}
              aria-label="Collapsed sidebar"
            />
          </Group>
        </Card>

        <Card padding="lg">
          <Title order={4} mb="md">
            Profile
          </Title>
          <Stack gap="md">
            <TextInput label="Name" defaultValue={user?.name ?? ''} />
            <TextInput label="Email" defaultValue={user?.email ?? ''} disabled />
            <TextInput label="Role" defaultValue={user?.role ?? ''} disabled />
          </Stack>
        </Card>
      </Stack>
    </Box>
  )
}
