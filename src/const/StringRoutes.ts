/**
 * Every route path in the app, in one place. `src/router.tsx` declares the tree
 * from these values and the rest of the app navigates with them, so a path is
 * only ever spelled out here.
 *
 * `as const` rather than an `enum`: `erasableSyntaxOnly` rules out enums, and
 * the literal types it preserves are what keep TanStack Router's typed `to`
 * and `path` working.
 */
export const StringRoutes = {
  login: '/login',
  index: '/',
  dashboard: '/dashboard',

  POCLandDev: '/POCLandDev',

  users: '/users',
  /** Parameterised — pass `params: { slug }`, or build a URL with `projectPath`. */
  project: '/projects/$slug',
  settings: '/settings',
} as const

export type StringRoute = (typeof StringRoutes)[keyof typeof StringRoutes]

/** The resolved URL of a project, for comparing against `location.pathname`. */
export function projectPath(slug: string) {
  return StringRoutes.project.replace('$slug', slug)
}
