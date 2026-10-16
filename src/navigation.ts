import {
  IconFolders,
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
  IconHomeDown,
} from '@tabler/icons-react'
import { StringRoutes } from './const/StringRoutes.ts'

export type NavIcon = typeof IconLayoutDashboard

/** A leaf entry that maps straight onto a static route. */
export type NavLeaf = {
  kind: 'link'
  to: string,
  label: string
  icon: NavIcon
}

/** One child of a collapsible group. Children resolve to `StringRoutes.project`. */
export type NavChild = {
  slug: string
  label: string
}

/**
 * A collapsible parent. The parent itself is a toggle rather than a link, so
 * opening the section never navigates away from what you are looking at.
 */
export type NavGroup = {
  kind: 'group'
  id: string
  label: string
  icon: NavIcon
  children: NavChild[]
}

export type NavEntry = NavLeaf | NavGroup

/**
 * Placeholder projects, in the same spirit as the placeholder rows on the Users
 * and Dashboard pages. Replace with the project's real collection — the nav and
 * the project route read from this one list.
 */
export const PROJECTS: NavChild[] = [
  { slug: 'mindlax', label: 'Mindlax' },
  { slug: 'sintech', label: 'SinTech' },
  { slug: 'shopicia', label: 'Shopicia' },
  { slug: 'byscape', label: 'Byscape' },
]

export const NAV_ENTRIES: NavEntry[] = [
  {
    kind: 'link',
    to: StringRoutes.dashboard,
    label: 'Dashboard',
    icon: IconLayoutDashboard,
  },
  {
    kind: 'link',
    to: `${StringRoutes.project_selection}/poc-landev`,
    label: 'POC Land Dev',
    icon: IconHomeDown
  },
  // {
  //   kind: 'link',
  //   to: StringRoutes.POCLandDev,
  //   label: "POC Land Dev",
  //   icon: IconHomeDown
  // },
  { kind: 'group', id: 'projects', label: 'Projects', icon: IconFolders, children: PROJECTS },
  { kind: 'link', to: StringRoutes.users, label: 'Users', icon: IconUsers },
  { kind: 'link', to: StringRoutes.settings, label: 'Settings', icon: IconSettings },
]
