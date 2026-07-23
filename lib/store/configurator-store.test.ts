import { beforeEach, describe, expect, it } from 'vitest'

import { useConfiguratorStore, TOTAL_STEPS } from './configurator-store'
import { navigationOptions, themeOptions, searchBarOptions, sectionOptions } from '@/lib/registry'

/** Zustand stores are module-level singletons — reset to the store's own initial
 *  shape before every test so tests can't leak state into one another. */
function resetStore() {
  useConfiguratorStore.setState({
    currentStep: 0,
    navigationId: navigationOptions[0].id,
    themeId: themeOptions[0].id,
    searchBarId: searchBarOptions[0].id,
    sectionIds: sectionOptions.slice(0, 3).map((s) => s.id),
    requestSubmitted: false,
  })
}

beforeEach(resetStore)

describe('configurator-store: step navigation', () => {
  it('starts on step 0', () => {
    expect(useConfiguratorStore.getState().currentStep).toBe(0)
  })

  it('nextStep advances by one', () => {
    useConfiguratorStore.getState().nextStep()
    expect(useConfiguratorStore.getState().currentStep).toBe(1)
  })

  it('nextStep never exceeds TOTAL_STEPS - 1', () => {
    const { setStep, nextStep } = useConfiguratorStore.getState()
    setStep(TOTAL_STEPS - 1)
    nextStep()
    expect(useConfiguratorStore.getState().currentStep).toBe(TOTAL_STEPS - 1)
  })

  it('prevStep never goes below 0', () => {
    useConfiguratorStore.getState().prevStep()
    expect(useConfiguratorStore.getState().currentStep).toBe(0)
  })

  it('setStep clamps out-of-range values into [0, TOTAL_STEPS - 1]', () => {
    const { setStep } = useConfiguratorStore.getState()
    setStep(999)
    expect(useConfiguratorStore.getState().currentStep).toBe(TOTAL_STEPS - 1)
    setStep(-999)
    expect(useConfiguratorStore.getState().currentStep).toBe(0)
  })
})

describe('configurator-store: single-select setters', () => {
  it('setNavigation/setTheme/setSearchBar overwrite the current id', () => {
    const { setNavigation, setTheme, setSearchBar } = useConfiguratorStore.getState()
    setNavigation('fixed-sidebar')
    setTheme('emerald-slate')
    setSearchBar('command-palette')
    const state = useConfiguratorStore.getState()
    expect(state.navigationId).toBe('fixed-sidebar')
    expect(state.themeId).toBe('emerald-slate')
    expect(state.searchBarId).toBe('command-palette')
  })
})

describe('configurator-store: toggleSection', () => {
  it('adds a section id that is not yet enabled, appended at the end', () => {
    const startIds = useConfiguratorStore.getState().sectionIds
    const newId = sectionOptions.find((s) => !startIds.includes(s.id))!.id
    useConfiguratorStore.getState().toggleSection(newId)
    const ids = useConfiguratorStore.getState().sectionIds
    expect(ids[ids.length - 1]).toBe(newId)
    expect(ids).toHaveLength(startIds.length + 1)
  })

  it('removes a section id that is already enabled', () => {
    const startIds = useConfiguratorStore.getState().sectionIds
    const existingId = startIds[0]
    useConfiguratorStore.getState().toggleSection(existingId)
    const ids = useConfiguratorStore.getState().sectionIds
    expect(ids).not.toContain(existingId)
    expect(ids).toHaveLength(startIds.length - 1)
  })

  it('toggling the same id twice is a no-op overall (add then remove)', () => {
    const startIds = useConfiguratorStore.getState().sectionIds
    const newId = sectionOptions.find((s) => !startIds.includes(s.id))!.id
    useConfiguratorStore.getState().toggleSection(newId)
    useConfiguratorStore.getState().toggleSection(newId)
    expect(useConfiguratorStore.getState().sectionIds).toEqual(startIds)
  })
})

describe('configurator-store: moveSection', () => {
  it('swaps a section one position up', () => {
    const [first, second, third] = useConfiguratorStore.getState().sectionIds
    useConfiguratorStore.getState().moveSection(second, 'up')
    expect(useConfiguratorStore.getState().sectionIds).toEqual([second, first, third])
  })

  it('swaps a section one position down', () => {
    const [first, second, third] = useConfiguratorStore.getState().sectionIds
    useConfiguratorStore.getState().moveSection(second, 'down')
    expect(useConfiguratorStore.getState().sectionIds).toEqual([first, third, second])
  })

  it('is a no-op moving the first item up', () => {
    const startIds = useConfiguratorStore.getState().sectionIds
    useConfiguratorStore.getState().moveSection(startIds[0], 'up')
    expect(useConfiguratorStore.getState().sectionIds).toEqual(startIds)
  })

  it('is a no-op moving the last item down', () => {
    const startIds = useConfiguratorStore.getState().sectionIds
    useConfiguratorStore.getState().moveSection(startIds[startIds.length - 1], 'down')
    expect(useConfiguratorStore.getState().sectionIds).toEqual(startIds)
  })

  it('is a no-op for an id that is not currently enabled', () => {
    const startIds = useConfiguratorStore.getState().sectionIds
    const disabledId = sectionOptions.find((s) => !startIds.includes(s.id))!.id
    useConfiguratorStore.getState().moveSection(disabledId, 'up')
    expect(useConfiguratorStore.getState().sectionIds).toEqual(startIds)
  })
})

describe('configurator-store: submit flow', () => {
  it('submitRequest / resetSubmit toggle requestSubmitted', () => {
    expect(useConfiguratorStore.getState().requestSubmitted).toBe(false)
    useConfiguratorStore.getState().submitRequest()
    expect(useConfiguratorStore.getState().requestSubmitted).toBe(true)
    useConfiguratorStore.getState().resetSubmit()
    expect(useConfiguratorStore.getState().requestSubmitted).toBe(false)
  })
})
