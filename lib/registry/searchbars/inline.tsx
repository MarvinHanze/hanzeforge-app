'use client'

import { Search } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'

function InlineSearchPreview() {
  return (
    <div className="flex h-9 w-40 items-center gap-2 rounded-md border border-input bg-muted/60 px-2.5 text-muted-foreground sm:w-56">
      <Search className="h-3.5 w-3.5 shrink-0" />
      <span className="truncate text-xs">Zoek klanten, orders...</span>
    </div>
  )
}

export const inlineSearchOption: ConfiguratorOption = {
  id: 'inline-search',
  label: 'Inline zoekveld',
  description: 'Altijd zichtbaar zoekveld direct in de topbar, zonder extra klik.',
  thumbnailIcon: Search,
  category: 'searchBar',
  PreviewComponent: InlineSearchPreview,
}
