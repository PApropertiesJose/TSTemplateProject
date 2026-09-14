import { Card, Stack, Text, ThemeIcon } from '@mantine/core'
import { IconFolderOpen } from '@tabler/icons-react'
import { useParams } from '@tanstack/react-router'
import { PageHeader } from '../components/PageHeader.tsx'
import { PROJECTS } from '../navigation.ts'

/**
 * Placeholder detail route behind the collapsible Projects group. It exists so
 * the nested navigation resolves to something real — replace the body with the
 * project's own view.
 */
export function ProjectPage() {
  const { slug } = useParams({ from: '/authenticated/projects/$slug' })
  const project = PROJECTS.find((entry) => entry.slug === slug)
  const label = project?.label ?? slug

  return (
    <>
      <PageHeader
        breadcrumbs={['Home', 'Projects', label]}
        title={label}
        description="Placeholder project route — replace with this project's real view."
      />

      <Card padding="xl">
        <Stack align="center" gap="sm" py={56}>
          <ThemeIcon variant="light" color="gray" size={48} radius="xl">
            <IconFolderOpen size={24} stroke={1.6} />
          </ThemeIcon>
          <Text c="dimmed" size="md">
            Nothing to show for {label} yet.
          </Text>
        </Stack>
      </Card>
    </>
  )
}
