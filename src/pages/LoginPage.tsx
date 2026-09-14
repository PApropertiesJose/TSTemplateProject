import {
  Alert,
  Anchor,
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconAlertCircle } from '@tabler/icons-react'
import { useNavigate, useRouter, useSearch } from '@tanstack/react-router'
import { BrandBackdrop, BrandMark } from '../components/Brand.tsx'
import { ColorSchemeToggle } from '../components/ColorSchemeToggle.tsx'
import { StringRoutes } from '../const/StringRoutes.ts'
import { useAuthStore } from '../stores/authStore.ts'

export function LoginPage() {
  const navigate = useNavigate()
  const router = useRouter()
  const search = useSearch({ from: StringRoutes.login })
  const signIn = useAuthStore((state) => state.signIn)
  const isSubmitting = useAuthStore((state) => state.isSubmitting)
  const error = useAuthStore((state) => state.error)

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { email: '', password: '', remember: true },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : 'Enter a valid email'),
      password: (value) =>
        value.length < 6 ? 'Password must be at least 6 characters' : null,
    },
  })

  async function handleSubmit(values: typeof form.values) {
    try {
      await signIn({ email: values.email, password: values.password })
      if (search.redirect) {
        // Free-form string from the URL, so it cannot go through the typed `to`.
        router.history.replace(search.redirect)
      } else {
        await navigate({ to: StringRoutes.dashboard, replace: true })
      }
    } catch {
      // The store already holds the message; the Alert below renders it.
    }
  }

  return (
    <Box
      mih="100vh"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        isolation: 'isolate',
        backgroundColor: 'var(--mantine-color-body)',
      }}
    >
      <BrandBackdrop />

      <Group justify="flex-end" p="md">
        <ColorSchemeToggle />
      </Group>

      <Center px="md" style={{ flex: 1 }} pb={{ base: 'xl', sm: 100 }}>
        <Stack w={430} maw="100%" gap="xl">
          <Stack gap={8} align="center">
            <BrandMark size={54} iconSize={28} radius="lg" />
            <Title order={2} ta="center" mt={4}>
              Sign in
            </Title>
            <Text c="dimmed" size="sm" ta="center">
              Use your administrator account to continue.
            </Text>
          </Stack>

          <Card padding="xl" shadow="md" radius="lg">
            <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
              <Stack gap="md">
                {error ? (
                  <Alert
                    color="red"
                    variant="light"
                    icon={<IconAlertCircle size={18} stroke={1.6} />}
                    title="Sign in failed"
                  >
                    {error}
                  </Alert>
                ) : null}

                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="username"
                  withAsterisk
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                />

                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  autoComplete="current-password"
                  withAsterisk
                  key={form.key('password')}
                  {...form.getInputProps('password')}
                />

                <Group justify="space-between" wrap="nowrap">
                  <Checkbox
                    label="Remember me"
                    key={form.key('remember')}
                    {...form.getInputProps('remember', { type: 'checkbox' })}
                  />
                  <Anchor component="button" type="button" size="sm" c="dimmed">
                    Forgot password?
                  </Anchor>
                </Group>

                <Button type="submit" fullWidth loading={isSubmitting}>
                  Sign in
                </Button>
              </Stack>
            </form>
          </Card>

          <Text size="xs" c="dimmed" ta="center">
            Demo build — any valid email with a 6+ character password signs in.
          </Text>
        </Stack>
      </Center>
    </Box>
  )
}
