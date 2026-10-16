import {
  Outlet, createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
} from '@tanstack/react-router'
import { AppLayout } from './components/AppLayout.tsx'
import { StringRoutes } from './const/StringRoutes.ts'
import { DashboardPage } from './pages/DashboardPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { ProjectPage } from './pages/ProjectPage.tsx'
import { SettingsPage } from './pages/SettingsPage.tsx'
import { UsersPage } from './pages/UsersPage.tsx'
import type { AuthState } from './stores/authStore.ts'
import POCLandDev from './pages/POCLandDev/index.tsx'
import ProjectSelection, { projectSelectionRoute } from './pages/ProjectSelection/index.tsx'
import { userRoute } from './pages/Users/index.tsx'

/**
 * Auth reaches route guards through router context rather than by importing the
 * store: `RouterProvider` re-supplies it on every auth change, so `beforeLoad`
 * always sees current state.
 */
export type RouterContext = {
  auth: AuthState
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Outlet,
  notFoundComponent: NotFoundPage,
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: StringRoutes.login,
  validateSearch: (search: Record<string, unknown>): { redirect?: string } => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      // `redirect` is a free-form string from the URL, so it goes through `href`.
      throw search.redirect
        ? redirect({ href: search.redirect })
        : redirect({ to: StringRoutes.dashboard })
    }
  },
  component: LoginPage,
})

/** Pathless layout route: everything below it requires a session. */
export const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: StringRoutes.login, search: { redirect: location.href } })
    }
  },
  component: AppLayout,
})

const indexRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: StringRoutes.index,
  beforeLoad: () => {
    throw redirect({ to: StringRoutes.dashboard })
  },
})

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: StringRoutes.dashboard,
  component: DashboardPage,
})



const pocLandDevRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: StringRoutes.POCLandDev,
  component: POCLandDev,
})


// const usersRoute = createRoute({
//   getParentRoute: () => authenticatedRoute,
//   path: StringRoutes.users,
//   /** `q` is owned by the URL so the navbar search can deep-link into this page. */
//   validateSearch: (search: Record<string, unknown>): { q?: string } => ({
//     q: typeof search.q === 'string' && search.q ? search.q : undefined,
//   }),
//   component: UsersPage,
// })

/** Detail route behind the collapsible Projects group in the sidebar. */
const projectRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: StringRoutes.project,
  component: ProjectPage,
})

const settingsRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: StringRoutes.settings,
  component: SettingsPage,
})

const routeTree = rootRoute.addChildren([
  loginRoute,
  authenticatedRoute.addChildren([
    indexRoute,
    dashboardRoute,
    projectSelectionRoute,
    pocLandDevRoute,
    projectRoute,
    userRoute,
    settingsRoute,
  ]),
])

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  // Supplied for real by RouterProvider in main.tsx.
  context: { auth: undefined! },
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
