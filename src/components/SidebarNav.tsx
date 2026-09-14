import { Collapse, Menu, Tooltip, UnstyledButton } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { StringRoutes, projectPath } from '../const/StringRoutes.ts'
import { NAV_ENTRIES } from '../navigation.ts'
import type { NavChild, NavGroup, NavLeaf } from '../navigation.ts'
import { useUiStore } from '../stores/uiStore.ts'

type LeafProps = {
  entry: NavLeaf
  active: boolean
  collapsed: boolean
  onNavigate: () => void
}

function NavItem({ entry, active, collapsed, onNavigate }: LeafProps) {
  const Icon = entry.icon

  const link = (
    <Link
      to={entry.to}
      onClick={onNavigate}
      className="nav-item"
      data-active={active || undefined}
      data-collapsed={collapsed || undefined}
      aria-label={entry.label}
    >
      <span className="nav-item__icon">
        <Icon size={20} stroke={1.7} />
      </span>
      {collapsed ? null : <span>{entry.label}</span>}
    </Link>
  )

  return collapsed ? (
    <Tooltip label={entry.label} position="right" withArrow>
      {link}
    </Tooltip>
  ) : (
    link
  )
}

type ChildLinkProps = {
  child: NavChild
  active: boolean
  onNavigate: () => void
}

function NavChildLink({ child, active, onNavigate }: ChildLinkProps) {
  return (
    <div className="nav-child">
      <Link
        to={StringRoutes.project}
        params={{ slug: child.slug }}
        onClick={onNavigate}
        className="nav-item nav-item--child"
        data-active={active || undefined}
      >
        <span>{child.label}</span>
      </Link>
    </div>
  )
}

type GroupProps = {
  group: NavGroup
  pathname: string
  collapsed: boolean
  onNavigate: () => void
}

function NavGroupItem({ group, pathname, collapsed, onNavigate }: GroupProps) {
  const openNavGroups = useUiStore((state) => state.openNavGroups)
  const setNavGroupOpen = useUiStore((state) => state.setNavGroupOpen)
  const navigate = useNavigate()

  const Icon = group.icon
  const isChildActive = (child: NavChild) => pathname === projectPath(child.slug)
  const childActive = group.children.some(isChildActive)

  // Derived, never synced through an effect: an untouched group opens itself
  // when one of its children is the current route.
  const open = openNavGroups[group.id] ?? childActive

  // On the icon rail there is nowhere to expand into, so the children become a
  // flyout instead of an inline list.
  if (collapsed) {
    return (
      <Menu position="right-start" withArrow offset={12} width={190}>
        <Menu.Target>
          <UnstyledButton
            className="nav-item"
            data-active={childActive || undefined}
            data-collapsed
            aria-label={group.label}
          >
            <span className="nav-item__icon">
              <Icon size={20} stroke={1.7} />
            </span>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{group.label}</Menu.Label>
          {group.children.map((child) => (
            <Menu.Item
              key={child.slug}
              onClick={() => {
                onNavigate()
                void navigate({
                  to: StringRoutes.project,
                  params: { slug: child.slug },
                })
              }}
            >
              {child.label}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    )
  }

  return (
    <>
      <UnstyledButton
        className="nav-item"
        // Not `data-active`: the parent contains the current route, it isn't it.
        data-within={childActive || undefined}
        onClick={() => setNavGroupOpen(group.id, !open)}
        aria-expanded={open}
        aria-controls={`nav-group-${group.id}`}
      >
        <span className="nav-item__icon">
          <Icon size={20} stroke={1.7} />
        </span>
        <span>{group.label}</span>
        <span className="nav-group__chevron" data-open={open || undefined} aria-hidden>
          <IconChevronRight size={15} stroke={2} />
        </span>
      </UnstyledButton>

      <Collapse expanded={open} id={`nav-group-${group.id}`}>
        <div className="nav-children">
          {group.children.map((child) => (
            <NavChildLink
              key={child.slug}
              child={child}
              active={isChildActive(child)}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </Collapse>
    </>
  )
}

type SidebarNavProps = {
  collapsed: boolean
  onNavigate: () => void
}

export function SidebarNav({ collapsed, onNavigate }: SidebarNavProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })

  return (
    <>
      {NAV_ENTRIES.map((entry) =>
        entry.kind === 'group' ? (
          <NavGroupItem
            key={entry.id}
            group={entry}
            pathname={pathname}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ) : (
          <NavItem
            key={entry.to}
            entry={entry}
            active={pathname.startsWith(entry.to)}
            collapsed={collapsed}
            onNavigate={onNavigate}
          />
        ),
      )}
    </>
  )
}
