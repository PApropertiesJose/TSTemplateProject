import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UiState = {
  /** Desktop navbar collapsed into an icon rail. */
  navCollapsed: boolean
  /** Mobile navbar drawer. Never persisted — it should always start closed. */
  mobileNavOpen: boolean
  /**
   * Explicit open/closed choices for collapsible nav groups, keyed by group id.
   * A group with no entry here falls back to "open when one of its children is
   * the current route", so the sidebar opens itself on a deep link.
   */
  openNavGroups: Record<string, boolean>
  toggleNavCollapsed: () => void
  toggleMobileNav: () => void
  closeMobileNav: () => void
  setNavGroupOpen: (id: string, open: boolean) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      navCollapsed: false,
      mobileNavOpen: false,
      openNavGroups: {},
      toggleNavCollapsed: () =>
        set((state) => ({ navCollapsed: !state.navCollapsed })),
      toggleMobileNav: () =>
        set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
      closeMobileNav: () => set({ mobileNavOpen: false }),
      setNavGroupOpen: (id, open) =>
        set((state) => ({ openNavGroups: { ...state.openNavGroups, [id]: open } })),
    }),
    {
      name: 'app-ui',
      partialize: (state) => ({
        navCollapsed: state.navCollapsed,
        openNavGroups: state.openNavGroups,
      }),
    },
  ),
)
