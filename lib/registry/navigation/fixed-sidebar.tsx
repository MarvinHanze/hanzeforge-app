'use client'

import { PanelLeft } from 'lucide-react'

import type { ConfiguratorOption, ConfiguratorPreviewProps } from '@/lib/registry/types'
import { NAV_ITEMS, NavLogo, UserMenu } from './_shared'
import { cn } from '@/lib/utils'

function FixedSidebarPreview({ children, searchBarSlot }: ConfiguratorPreviewProps) {
  return (
    <div className="flex h-full w-full bg-background">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-card">
        <div className="border-b border-border px-4 py-3">
          <NavLogo />
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {NAV_ITEMS.map((item) => (
            <span
              key={item.label}
              className={cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                item.active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </span>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <UserMenu />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-end border-b border-border bg-card px-4 py-2.5 @sm:px-6">
          {searchBarSlot}
        </header>
        <div className="preview-scroll flex-1 overflow-y-auto bg-background p-4 @sm:p-6">
          <div className="@container flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const fixedSidebarOption: ConfiguratorOption = {
  id: 'fixed-sidebar',
  label: 'Fixed sidebar',
  description: 'Altijd zichtbare verticale zijbalk met alle navigatie-items en gebruikersmenu.',
  thumbnailIcon: PanelLeft,
  category: 'navigation',
  PreviewComponent: FixedSidebarPreview,
}
