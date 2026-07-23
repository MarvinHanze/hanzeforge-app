import type { ConfiguratorOption } from './types'

// --- Navigation (single-select, step 1) ---------------------------------
import { topNavbarOption } from './navigation/top-navbar'
import { fixedSidebarOption } from './navigation/fixed-sidebar'
import { collapsibleSidebarOption } from './navigation/collapsible-sidebar'
import { sidebarTopbarHybridOption } from './navigation/sidebar-topbar-hybrid'

// --- Kleurthema (single-select, step 2) ---------------------------------
import { indigoVioletTheme } from './themes/indigo-violet'
import { emeraldSlateTheme } from './themes/emerald-slate'
import { warmTerracottaTheme } from './themes/warm-terracotta'
import { darkAmberTheme } from './themes/dark-amber'
import { corporateBlueTheme } from './themes/corporate-blue'

// --- Zoekbalk (single-select, step 3) -----------------------------------
import { inlineSearchOption } from './searchbars/inline'
import { commandPaletteOption } from './searchbars/command-palette'
import { iconExpandSearchOption } from './searchbars/icon-expand'

// --- Secties (multi-select, order-preserving, step 4) -------------------
import { kpiStatsOption } from './sections/kpi-stats'
import { chartPanelOption } from './sections/chart-panel'
import { dataTableOption } from './sections/data-table'
import { formBlockOption } from './sections/form-block'
import { calendarWidgetOption } from './sections/calendar-widget'
import { activityFeedOption } from './sections/activity-feed'

/**
 * ---------------------------------------------------------------------------
 * REGISTRY PATTERN — how to add option #101 (or #19, or #500)
 * ---------------------------------------------------------------------------
 * This file is the ONLY place that assembles the four option arrays the rest
 * of the app iterates over (StepNav, OptionCard, SectionPicker, PreviewFrame
 * all loop these arrays — none of them contain a switch/if-else naming
 * specific option ids). To add a brand new option later:
 *
 *   1. Create ONE new file under lib/registry/{navigation,themes,searchbars,sections}/
 *      that exports a single `ConfiguratorOption` object (see lib/registry/types.ts
 *      for the exact shape, and any existing file in that folder for a template).
 *   2. Add ONE import line for it above, and ONE entry to the matching array below.
 *
 * That's it — no other file in the codebase needs to change. Wizard steps,
 * option cards, thumbnails, the live preview compositor, and the summary
 * panel all just render whatever is in these arrays.
 */

export const navigationOptions: ConfiguratorOption[] = [
  topNavbarOption,
  fixedSidebarOption,
  collapsibleSidebarOption,
  sidebarTopbarHybridOption,
]

export const themeOptions: ConfiguratorOption[] = [
  indigoVioletTheme,
  emeraldSlateTheme,
  warmTerracottaTheme,
  darkAmberTheme,
  corporateBlueTheme,
]

export const searchBarOptions: ConfiguratorOption[] = [
  inlineSearchOption,
  commandPaletteOption,
  iconExpandSearchOption,
]

export const sectionOptions: ConfiguratorOption[] = [
  kpiStatsOption,
  chartPanelOption,
  dataTableOption,
  formBlockOption,
  calendarWidgetOption,
  activityFeedOption,
]
