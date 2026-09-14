import { Box, Button, Center, Group, Stack, Text, Title } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { BrandBackdrop, BrandMark } from '../components/Brand.tsx'
import { StringRoutes } from '../const/StringRoutes.ts'

/**
 * Rendered by the root route, so it sits outside `AppLayout` and has to carry its
 * own frame and branding.
 */
export function NotFoundPage() {
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

      <Group p="md" gap="sm" wrap="nowrap">
        <BrandMark />
        <Text fw={650} style={{ letterSpacing: '-0.01em' }}>
          Admin
        </Text>
      </Group>

      <Center px="md" style={{ flex: 1 }} pb={{ base: 'xl', sm: 100 }}>
        <Stack align="center" gap={0} maw={420}>
          <Text fz={{ base: 72, sm: 96 }} fw={720} lh={1} className="tnum display-numeral">
            404
          </Text>
          <Title order={3} mt="lg">
            Page not found
          </Title>
          <Text c="dimmed" size="sm" ta="center" mt={6}>
            The page you requested does not exist or has moved.
          </Text>
          <Button
            component={Link}
            to={StringRoutes.dashboard}
            mt="xl"
            leftSection={<IconArrowLeft size={16} stroke={1.8} />}
          >
            Back to dashboard
          </Button>
        </Stack>
      </Center>
    </Box>
  )
}
