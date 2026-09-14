import { RouterProvider } from '@tanstack/react-router'
import { router } from './router.tsx'
import { useAuthStore } from './stores/authStore.ts'

/**
 * Bridges the auth store into the router. Subscribing here is what re-supplies
 * router context on sign in/out, so `beforeLoad` guards never read stale state.
 */
export default function App() {
  const auth = useAuthStore()
  return <RouterProvider router={router} context={{ auth }} />
}
