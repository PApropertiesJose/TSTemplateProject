import {
  Badge,
  Card,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconCoin,
  IconEye,
  IconUserPlus,
  IconUsers,
} from '@tabler/icons-react'
import { PageHeader } from '../components/PageHeader.tsx'
import { useAuthStore } from '../stores/authStore.ts'

/** Placeholder figures. Replace with the project's real data source. */
const STATS = [
  { label: 'Active users', value: '2,481', delta: 12.4, icon: IconUsers },
  { label: 'New signups', value: '316', delta: 4.1, icon: IconUserPlus },
  { label: 'Revenue', value: '$48.2k', delta: -2.6, icon: IconCoin },
  { label: 'Page views', value: '91,204', delta: 8.9, icon: IconEye },
]

const RECENT = [
  { id: 'INV-1041', person: 'Ada Lovelace', status: 'Paid', amount: '$1,200' },
  { id: 'INV-1040', person: 'Grace Hopper', status: 'Pending', amount: '$860' },
  { id: 'INV-1039', person: 'Alan Turing', status: 'Paid', amount: '$2,140' },
  { id: 'INV-1038', person: 'Katherine Johnson', status: 'Failed', amount: '$430' },
  { id: 'INV-1037', person: 'Edsger Dijkstra', status: 'Paid', amount: '$980' },
]

const STATUS_COLOR: Record<string, string> = {
  Paid: 'teal',
  Pending: 'yellow',
  Failed: 'red',
}

const CAPACITY = [
  { label: 'Storage', used: 68 },
  { label: 'API quota', used: 41 },
  { label: 'Seats', used: 86 },
]

export function DashboardPage() {
  const user = useAuthStore((state) => state.user)

  return (
    <>
      <PageHeader
        breadcrumbs={['Home', 'Dashboard']}
        title={`Welcome back${user ? `, ${user.name}` : ''}`}
        description="Here is what changed across the workspace in the last 30 days."
      />

      <Stack gap="lg">
        <SimpleGrid cols={{ base: 1, xs: 2, lg: 4 }} spacing="md">
          {STATS.map((stat) => {
            const Icon = stat.icon
            const up = stat.delta >= 0
            const DeltaIcon = up ? IconArrowUpRight : IconArrowDownRight

            return (
              <Paper key={stat.label} p="lg" radius="lg">
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                  <Stack gap={6}>
                    <Text size="md" c="dimmed" fw={500}>
                      {stat.label}
                    </Text>
                    <Text fz={30} fw={700} lh={1.1} className="tnum">
                      {stat.value}
                    </Text>
                  </Stack>
                  <ThemeIcon variant="light" size={40} radius="md">
                    <Icon size={20} stroke={1.7} />
                  </ThemeIcon>
                </Group>
                {/* Wraps as whole units: the context line never breaks mid-phrase. */}
                <Group gap={8} mt="md">
                  <Badge
                    color={up ? 'teal' : 'red'}
                    variant="light"
                    leftSection={<DeltaIcon size={12} stroke={2.4} />}
                    className="tnum"
                  >
                    {Math.abs(stat.delta)}%
                  </Badge>
                  <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
                    vs. previous period
                  </Text>
                </Group>
              </Paper>
            )
          })}
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 2 }} spacing="md">
          <Card padding="lg">
            <Title order={4} mb="sm">
              Recent invoices
            </Title>
            <Table.ScrollContainer minWidth={420}>
              <Table highlightOnHover verticalSpacing="sm">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Invoice</Table.Th>
                    <Table.Th>Customer</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th ta="right">Amount</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {RECENT.map((row) => (
                    <Table.Tr key={row.id}>
                      <Table.Td>
                        <Text size="sm" ff="monospace">
                          {row.id}
                        </Text>
                      </Table.Td>
                      <Table.Td>{row.person}</Table.Td>
                      <Table.Td>
                        <Badge color={STATUS_COLOR[row.status]} variant="light">
                          {row.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td ta="right">{row.amount}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>

          <Card padding="lg">
            <Title order={4} mb="md">
              Capacity
            </Title>
            <Stack gap="lg">
              {CAPACITY.map((item) => (
                <div key={item.label}>
                  <Group justify="space-between" mb={8}>
                    <Text size="md" fw={500}>
                      {item.label}
                    </Text>
                    <Text size="md" c="dimmed" className="tnum">
                      {item.used}%
                    </Text>
                  </Group>
                  <Progress
                    value={item.used}
                    color={item.used > 80 ? 'red' : undefined}
                    radius="xl"
                    size="sm"
                  />
                </div>
              ))}
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </>
  )
}
