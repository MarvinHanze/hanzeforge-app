'use client'

import { PanelTop } from 'lucide-react'

import type { ConfiguratorOption, ConfiguratorPreviewProps } from '@/lib/registry/types'
import { NAV_ITEMS, NavLogo, UserMenu } from './_shared'
import { cn } from '@/lib/utils'

function TopNavbarPreview({ children, searchBarSlot }: ConfiguratorPreviewProps) {
  return (
    <div className="flex h-full w-full flex-col bg-background">
      <header className="flex min-w-0 shrink-0 items-center gap-4 border-b border-border bg-card px-4 py-2.5 @sm:px-6">
        <NavLogo />
        <nav className="hidden min-w-0 flex-1 items-center gap-1 overflow-x-auto @md:flex">
          {NAV_ITEMS.slice(0, 5).map((item) => (
            <span
              key={item.label}
              className={cn(
                'flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
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
        <div className="ml-auto flex shrink-0 items-center gap-3">
          {searchBarSlot}
          <UserMenu compact />
        </div>
      </header>
      <div className="preview-scroll flex-1 overflow-y-auto bg-background p-4 @sm:p-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">{children}</div>
      </div>
    </div>
  )
}

export const topNavbarOption: ConfiguratorOption = {
  id: 'top-navbar',
  label: 'Top navbar',
  description: 'Horizontale navigatiebalk bovenaan met logo, menu en zoekbalk in één rij.',
  thumbnailIcon: PanelTop,
  category: 'navigation',
  PreviewComponent: TopNavbarPreview,
}
