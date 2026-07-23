'use client'

import { LayoutPanelLeft } from 'lucide-react'

import type { ConfiguratorOption, ConfiguratorPreviewProps } from '@/lib/registry/types'
import { NAV_ITEMS, NavLogo, UserMenu } from './_shared'
import { cn } from '@/lib/utils'

function HybridPreview({ children, searchBarSlot }: ConfiguratorPreviewProps) {
  return (
    <div className="flex h-full w-full bg-background">
      <aside className="flex w-16 shrink-0 flex-col items-center border-r border-border bg-card py-3">
        <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-bold text-primary-foreground">
          HF
        </div>
        <nav className="flex flex-1 flex-col items-center gap-1.5">
          {NAV_ITEMS.map((item) => (
            <span
              key={item.label}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-md transition-colors',
                item.active
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
              title={item.label}
            >
              <item.icon className="h-4 w-4" />
            </span>
          ))}
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center gap-4 border-b border-border bg-card px-4 py-2.5 sm:px-6">
          <span className="truncate text-sm font-semibold text-foreground">Dashboard</span>
          <div className="ml-auto flex items-center gap-3">
            {searchBarSlot}
            <UserMenu compact />
          </div>
        </header>
        <div className="preview-scroll flex-1 overflow-y-auto bg-background p-4 sm:p-6">
          <div className="flex flex-col gap-6">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const sidebarTopbarHybridOption: ConfiguratorOption = {
  id: 'sidebar-topbar-hybrid',
  label: 'Sidebar + Topbar hybrid',
  description: 'Smalle icoon-zijbalk gecombineerd met een topbar voor zoeken en gebruikersmenu.',
  thumbnailIcon: LayoutPanelLeft,
  category: 'navigation',
  PreviewComponent: HybridPreview,
}
