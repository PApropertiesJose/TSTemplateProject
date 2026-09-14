import type { ReactNode } from 'react'
import { Box, Group, Stack, Text, Title  } from '@mantine/core'

type PageHeaderProps = {
  /** Trail for the current page; the last entry is the page itself. */
  breadcrumbs: string[]
  title: string
  description?: string
  /** Primary action for the page, rendered opposite the title. */
  actions?: ReactNode
}

/**
 * Shared page opening: trail, title, supporting line, primary action. Keeping it
 * in one place is what makes every route feel like the same product.
 */
export function PageHeader({ breadcrumbs, title, description, actions }: PageHeaderProps) {
  return (
    <Stack gap="sm" mb="xl">
      <Group gap={8} wrap="wrap">
        {breadcrumbs.map((crumb, index) => {
          const isCurrent = index === breadcrumbs.length - 1

          return (
            <Group key={crumb} gap={8} wrap="nowrap">
              {index > 0 ? (
                <Text size="sm" c="dimmed" aria-hidden>
                  /
                </Text>
              ) : null}
              <Text size="sm" c={isCurrent ? undefined : 'dimmed'} fw={isCurrent ? 500 : 400}>
                {crumb}
              </Text>
            </Group>
          )
        })}
      </Group>

      <Group justify="space-between" align="flex-end" wrap="wrap" gap="md">
        <Box>
          <Title order={2}>{title}</Title>
          {description ? (
            <Text c="dimmed" size="md" mt={6}>
              {description}
            </Text>
          ) : null}
        </Box>
        {actions}
      </Group>
    </Stack>
  )
}
