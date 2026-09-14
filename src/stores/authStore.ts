import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'admin' | 'editor' | 'viewer'

export type User = {
  id: string
  name: string
  email: string
  role: UserRole
}

export type Credentials = {
  email: string
  password: string
}

export type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isSubmitting: boolean
  error: string | null
  signIn: (credentials: Credentials) => Promise<void>
  signOut: () => void
  clearError: () => void
}

/**
 * PLACEHOLDER. There is no backend wired to this scaffold yet, so this stands in
 * for the real call. Swap the body for the project's auth endpoint and delete the
 * rest of this comment — the store's shape is what the rest of the app depends on.
 */
async function requestSession({ email, password }: Credentials) {
  await new Promise((resolve) => setTimeout(resolve, 600))

  if (password.length < 6) {
    throw new Error('Invalid email or password.')
  }

  const name = email
    .split('@')[0]
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(' ')

  return {
    token: `demo-token-${Date.now()}`,
    user: {
      id: 'u_1',
      name: name || 'Signed-in user',
      email,
      role: 'admin' as UserRole,
    },
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isSubmitting: false,
      error: null,

      signIn: async (credentials) => {
        set({ isSubmitting: true, error: null })
        try {
          const { user, token } = await requestSession(credentials)
          set({ user, token, isAuthenticated: true, isSubmitting: false })
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isSubmitting: false,
            error: error instanceof Error ? error.message : 'Sign in failed.',
          })
          throw error
        }
      },

      signOut: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null })
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'app-auth',
      // Only the session itself survives a reload — never transient UI state.
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)
