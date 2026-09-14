import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  ActionIcon,
  AppShell,
  Avatar,
  Box,
  Burger,
  Group,
  Menu,
  ScrollArea,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core'
import {
  IconBell,
  IconChevronDown,
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconLogout,
  IconMail,
  IconSearch,
  IconSettings,
} from '@tabler/icons-react'
import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { BrandMark } from './Brand.tsx'
import { ColorSchemeToggle } from './ColorSchemeToggle.tsx'
import { SidebarNav } from './SidebarNav.tsx'
import { StringRoutes } from '../const/StringRoutes.ts'
import { useAuthStore } from '../stores/authStore.ts'
import { useUiStore } from '../stores/uiStore.ts'

export function AppLayout() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const signOut = useAuthStore((state) => state.signOut)
  const navCollapsed = useUiStore((state) => state.navCollapsed)
  const mobileNavOpen = useUiStore((state) => state.mobileNavOpen)
  const toggleNavCollapsed = useUiStore((state) => state.toggleNavCollapsed)
  const toggleMobileNav = useUiStore((state) => state.toggleMobileNav)
  const closeMobileNav = useUiStore((state) => state.closeMobileNav)

  const [term, setTerm] = useState('')

  function handleSignOut() {
    signOut()
    void navigate({ to: StringRoutes.login, replace: true })
  }

  /** The only searchable collection in the app, so the field says so and goes there. */
  function handleSearch(event: FormEvent) {
    event.preventDefault()
    void navigate({ to: StringRoutes.users, search: { q: term.trim() || undefined } })
  }

  return (
    <AppShell
      layout="alt"
      header={{ height: 68 }}
      navbar={{
        width: navCollapsed ? 84 : 248,
        // Below this the sidebar becomes a drawer — a docked rail plus a table
        // leaves the content column too narrow to read on small laptops.
        breakpoint: 'md',
        collapsed: { mobile: !mobileNavOpen },
      }}
      padding="lg"
    >
      <AppShell.Header>
        <Group h="100%" px="lg" justify="space-between" wrap="nowrap" gap="md">
          <Group gap="sm" wrap="nowrap" hiddenFrom="md">
            <Burger
              opened={mobileNavOpen}
              onClick={toggleMobileNav}
              size="sm"
              aria-label="Toggle navigation"
            />
            <BrandMark size={32} iconSize={18} />
          </Group>

          <Box
            component="form"
            onSubmit={handleSearch}
            flex="1 1 auto"
            maw={460}
            visibleFrom="xs"
          >
            <TextInput
              className="navbar-search"
              placeholder="Search users by name or email…"
              aria-label="Search users by name or email"
              leftSection={<IconSearch size={17} stroke={1.7} />}
              value={term}
              onChange={(event) => setTerm(event.currentTarget.value)}
            />
            {/* Gives the form a default button so Enter submits deterministically. */}
            <button type="submit" hidden tabIndex={-1} aria-hidden />
          </Box>

          <Group gap={6} wrap="nowrap">
            <Tooltip label="Messages" position="bottom" withArrow>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                aria-label="Messages"
                visibleFrom="sm"
              >
                <IconMail size={19} stroke={1.7} />
              </ActionIcon>
            </Tooltip>

            <Tooltip label="Notifications" position="bottom" withArrow>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="lg"
                aria-label="Notifications"
                visibleFrom="sm"
              >
                <IconBell size={19} stroke={1.7} />
              </ActionIcon>
            </Tooltip>

            <ColorSchemeToggle />

            <Menu width={230} position="bottom-end" withArrow>
              <Menu.Target>
                <UnstyledButton
                  aria-label="Account menu"
                  style={{ borderRadius: 999 }}
                  p={4}
                  pr={8}
                >
                  <Group gap="xs" wrap="nowrap">
                    <Avatar color="brand" radius="xl" size={34} name={user?.name} />
                    <Box visibleFrom="sm">
                      <Text size="md" fw={600} lh={1.15}>
                        {user?.name ?? 'Account'}
                      </Text>
                      <Text size="xs" c="dimmed" lh={1.2}>
                        {user?.role ?? '—'}
                      </Text>
                    </Box>
                    <IconChevronDown size={15} stroke={1.8} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user?.email ?? 'Not signed in'}</Menu.Label>
                <Menu.Item
                  component={Link}
                  to={StringRoutes.settings}
                  leftSection={<IconSettings size={16} stroke={1.7} />}
                >
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  onClick={handleSignOut}
                  leftSection={<IconLogout size={16} stroke={1.7} />}
                >
                  Sign out
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section mb="lg">
          <Group gap="sm" wrap="nowrap" justify={navCollapsed ? 'center' : 'flex-start'} h={36}>
            <BrandMark size={36} iconSize={20} />
            {navCollapsed ? null : (
              <Text fz="xl" fw={700} lh={1.1} style={{ letterSpacing: '-0.02em' }}>
                Admin
              </Text>
            )}
          </Group>
        </AppShell.Section>

        <AppShell.Section grow component={ScrollArea}>
          {navCollapsed ? null : <div className="nav-label">Menu</div>}
          <SidebarNav collapsed={navCollapsed} onNavigate={closeMobileNav} />
        </AppShell.Section>

        <AppShell.Section visibleFrom="md">
          <UnstyledButton
            onClick={toggleNavCollapsed}
            className="nav-item"
            data-collapsed={navCollapsed || undefined}
            aria-label={navCollapsed ? 'Expand navigation' : 'Collapse navigation'}
          >
            <span className="nav-item__icon">
              {navCollapsed ? (
                <IconLayoutSidebarLeftExpand size={20} stroke={1.7} />
              ) : (
                <IconLayoutSidebarLeftCollapse size={20} stroke={1.7} />
              )}
            </span>
            {navCollapsed ? null : <span>Collapse</span>}
          </UnstyledButton>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Box w="100%">
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  )
}
