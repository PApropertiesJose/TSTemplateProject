import { useMemo, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core'
import { IconPlus, IconSearch, IconSearchOff } from '@tabler/icons-react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { PageHeader } from '../components/PageHeader.tsx'
import { StringRoutes } from '../const/StringRoutes.ts'
import type { UserRole } from '../stores/authStore.ts'

type Row = {
  id: string
  name: string
  email: string
  role: UserRole
  active: boolean
}

/** Placeholder rows. Replace with the project's real data source. */
const ROWS: Row[] = [
  { id: '1', name: 'Ada Lovelace', email: 'ada@example.com', role: 'admin', active: true },
  { id: '2', name: 'Grace Hopper', email: 'grace@example.com', role: 'admin', active: true },
  { id: '3', name: 'Alan Turing', email: 'alan@example.com', role: 'editor', active: true },
  { id: '4', name: 'Katherine Johnson', email: 'kj@example.com', role: 'editor', active: false },
  { id: '5', name: 'Edsger Dijkstra', email: 'edsger@example.com', role: 'viewer', active: true },
  { id: '6', name: 'Barbara Liskov', email: 'barbara@example.com', role: 'viewer', active: false },
]

const ROLE_COLOR: Record<UserRole, string> = {
  admin: 'brand',
  editor: 'grape',
  viewer: 'gray',
}

/** Small status dot that rides inside a pill badge. */
function Dot({ color }: { color: string }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: 999,
        display: 'block',
        backgroundColor: `var(--mantine-color-${color}-6)`,
      }}
    />
  )
}

export function UsersPage() {
  // The URL owns the query so the navbar search can deep-link straight into a
  // filtered view. Children of the pathless `authenticated` route use route ids.
  const { q } = useSearch({ from: '/authenticated/users' })
  const navigate = useNavigate()
  const query = q ?? ''
  const [role, setRole] = useState<string | null>(null)

  function setQuery(value: string) {
    void navigate({
      to: StringRoutes.users,
      search: { q: value || undefined },
      replace: true,
    })
  }

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return ROWS.filter((row) => {
      const matchesQuery =
        !needle ||
        row.name.toLowerCase().includes(needle) ||
        row.email.toLowerCase().includes(needle)
      return matchesQuery && (!role || row.role === role)
    })
  }, [query, role])

  return (
    <>
      <PageHeader
        breadcrumbs={['Home', 'Users']}
        title="Users"
        description={`${rows.length} of ${ROWS.length} accounts`}
        actions={
          <Button leftSection={<IconPlus size={16} stroke={2} />}>Invite user</Button>
        }
      />

      <Card padding="lg">
        <Group mb="md" wrap="wrap" gap="sm">
          <TextInput
            placeholder="Search name or email"
            leftSection={<IconSearch size={16} stroke={1.7} />}
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            flex="1 1 240px"
            aria-label="Search users"
          />
          <Select
            placeholder="All roles"
            data={['admin', 'editor', 'viewer']}
            value={role}
            onChange={setRole}
            clearable
            w={160}
            aria-label="Filter by role"
          />
        </Group>

        <Table.ScrollContainer minWidth={560}>
          <Table highlightOnHover verticalSpacing="md">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {rows.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>
                    <Group gap="sm" wrap="nowrap">
                      <Avatar name={row.name} color="initials" radius="xl" size={36} />
                      <div>
                        <Text size="md" fw={600} lh={1.25}>
                          {row.name}
                        </Text>
                        <Text size="sm" c="dimmed" lh={1.3}>
                          {row.email}
                        </Text>
                      </div>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge color={ROLE_COLOR[row.role]} variant="light" tt="capitalize">
                      {row.role}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={row.active ? 'teal' : 'gray'}
                      variant="light"
                      leftSection={<Dot color={row.active ? 'teal' : 'gray'} />}
                    >
                      {row.active ? 'Active' : 'Suspended'}
                    </Badge>
                  </Table.Td>
                </Table.Tr>
              ))}
              {rows.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={3}>
                    <Stack align="center" gap="sm" py={48}>
                      <ThemeIcon variant="light" color="gray" size={48} radius="xl">
                        <IconSearchOff size={24} stroke={1.6} />
                      </ThemeIcon>
                      <Text c="dimmed" size="md">
                        No users match those filters.
                      </Text>
                      <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => {
                          setQuery('')
                          setRole(null)
                        }}
                      >
                        Clear filters
                      </Button>
                    </Stack>
                  </Table.Td>
                </Table.Tr>
              ) : null}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Card>
    </>
  )
}
