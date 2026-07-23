import { create } from 'zustand'

import {
  navigationOptions,
  themeOptions,
  searchBarOptions,
  sectionOptions,
} from '@/lib/registry'

export const TOTAL_STEPS = 5

interface ConfiguratorState {
  currentStep: number
  navigationId: string
  themeId: string
  searchBarId: string
  /** Ordered list of enabled section ids — order is the render order in the preview. */
  sectionIds: string[]
  requestSubmitted: boolean

  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  setNavigation: (id: string) => void
  setTheme: (id: string) => void
  setSearchBar: (id: string) => void
  toggleSection: (id: string) => void
  submitRequest: () => void
  resetSubmit: () => void
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 0,
  navigationId: navigationOptions[0].id,
  themeId: themeOptions[0].id,
  searchBarId: searchBarOptions[0].id,
  sectionIds: sectionOptions.slice(0, 3).map((s) => s.id),
  requestSubmitted: false,

  setStep: (step) =>
    set({ currentStep: Math.max(0, Math.min(TOTAL_STEPS - 1, step)) }),
  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(TOTAL_STEPS - 1, state.currentStep + 1),
    })),
  prevStep: () =>
    set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

  setNavigation: (id) => set({ navigationId: id }),
  setTheme: (id) => set({ themeId: id }),
  setSearchBar: (id) => set({ searchBarId: id }),

  toggleSection: (id) =>
    set((state) => {
      const exists = state.sectionIds.includes(id)
      return {
        sectionIds: exists
          ? state.sectionIds.filter((s) => s !== id)
          : [...state.sectionIds, id],
      }
    }),

  submitRequest: () => set({ requestSubmitted: true }),
  resetSubmit: () => set({ requestSubmitted: false }),
}))
