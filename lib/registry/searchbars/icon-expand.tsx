'use client'

import { useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { cn } from '@/lib/utils'

function IconExpandSearchPreview() {
  const [expanded, setExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-center justify-end">
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.input
            ref={inputRef}
            key="search-input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 176, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onBlur={() => setExpanded(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setExpanded(false)
                inputRef.current?.blur()
              }
            }}
            placeholder="Zoeken..."
            className="mr-2 h-9 rounded-md border border-input bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
          />
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => {
          setExpanded((prev) => !prev)
          requestAnimationFrame(() => inputRef.current?.focus())
        }}
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
          expanded && 'bg-muted text-foreground'
        )}
        aria-label="Zoeken openen"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  )
}

export const iconExpandSearchOption: ConfiguratorOption = {
  id: 'icon-expand-search',
  label: 'Icoon expand-zoekveld',
  description: 'Compact vergrootglas-icoon dat bij een klik uitklapt tot een zoekveld.',
  thumbnailIcon: Search,
  category: 'searchBar',
  PreviewComponent: IconExpandSearchPreview,
}
