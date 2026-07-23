'use client'

import { Lock, LayoutGrid } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import {
  navigationOptions,
  themeOptions,
  searchBarOptions,
  sectionOptions,
} from '@/lib/registry'
import type { ConfiguratorOption } from '@/lib/registry/types'

interface PreviewFrameProps {
  navigationId: string
  themeId: string
  searchBarId: string
  sectionIds: string[]
}

/**
 * Renders the actual composed mini web-app: the selected navigation shell
 * wrapping the selected search bar and the selected content sections (in the
 * chosen order), all inside a fake macOS-style browser-chrome frame. This is
 * the single place the four registries get COMPOSED together — everything
 * else in the app only ever picks IDs, this component looks the options up
 * and stitches their PreviewComponents together.
 */
export function PreviewFrame({
  navigationId,
  themeId,
  searchBarId,
  sectionIds,
}: PreviewFrameProps) {
  const navOption = navigationOptions.find((o) => o.id === navigationId) ?? navigationOptions[0]
  const themeOption = themeOptions.find((o) => o.id === themeId) ?? themeOptions[0]
  const searchBarOption =
    searchBarOptions.find((o) => o.id === searchBarId) ?? searchBarOptions[0]
  const enabledSections = sectionIds
    .map((id) => sectionOptions.find((o) => o.id === id))
    .filter((o): o is ConfiguratorOption => Boolean(o))

  const NavComponent = navOption.PreviewComponent
  const SearchBarComponent = searchBarOption.PreviewComponent

  return (
    <div className="w-full overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl ring-1 ring-black/5">
      {/* Fake browser chrome (purely decorative) */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-2.5" aria-hidden="true">
        <div className="flex shrink-0 gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex flex-1 items-center gap-2 truncate rounded-md bg-white px-3 py-1 text-xs text-slate-500 shadow-inner">
          <Lock className="h-3 w-3 shrink-0 text-slate-400" />
          <span className="truncate">jouwbedrijf.hanzeonline-demo.nl</span>
        </div>
      </div>

      {/* Composed mini web-app. This wrapper is @container too (a harmless fallback), but the
          container query that actually matters for section components lives INSIDE each
          navigation option's own content wrapper (the div rendering {children}), not here —
          because navigation layouts with a fixed sidebar (e.g. fixed-sidebar's 224px-wide
          <aside>) permanently consume width that this outer div's measurement wouldn't account
          for. Querying against THIS width would make a @lg: breakpoint fire even though the
          actual content area is 224px narrower, causing overflow specifically in wide-sidebar
          layouts. Always add @container to the content wrapper in NEW navigation options too. */}
      <div
        data-preview-theme={themeOption.id}
        className="@container h-[560px] bg-background sm:h-[620px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${navigationId}-${themeId}-${searchBarId}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="h-full w-full"
          >
            <NavComponent searchBarSlot={<SearchBarComponent />}>
              <AnimatePresence initial={false}>
                {enabledSections.map((section) => (
                  <motion.div
                    key={section.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <section.PreviewComponent />
                  </motion.div>
                ))}
              </AnimatePresence>
              {enabledSections.length === 0 && (
                <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border text-center text-muted-foreground">
                  <LayoutGrid className="h-8 w-8" />
                  <p className="max-w-xs text-sm">
                    Nog geen secties geselecteerd. Kies hieronder welke onderdelen dit dashboard
                    moet tonen.
                  </p>
                </div>
              )}
            </NavComponent>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
