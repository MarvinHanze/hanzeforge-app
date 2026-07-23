'use client'

import { useState } from 'react'
import { PanelLeftClose, PanelLeftOpen, ChevronsLeft, ChevronsRight } from 'lucide-react'

import type { ConfiguratorOption, ConfiguratorPreviewProps } from '@/lib/registry/types'
import { NAV_ITEMS, NavLogo, UserMenu } from './_shared'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

function CollapsibleSidebarPreview({ children, searchBarSlot }: ConfiguratorPreviewProps) {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-full w-full bg-background">
        <aside
          className={cn(
            'flex shrink-0 flex-col border-r border-border bg-card transition-all duration-300',
            collapsed ? 'w-16' : 'w-56'
          )}
        >
          <div
            className={cn(
              'flex items-center border-b border-border px-3 py-3',
              collapsed ? 'justify-center' : 'justify-between'
            )}
          >
            <NavLogo compact={collapsed} />
          </div>
          <nav className="flex-1 space-y-1 p-2.5">
            {NAV_ITEMS.map((item) =>
              collapsed ? (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <span
                      className={cn(
                        'flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                        item.active
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
              ) : (
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
              )
            )}
          </nav>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              'flex items-center gap-2 border-t border-border px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
              collapsed ? 'justify-center' : 'justify-start'
            )}
          >
            {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            {!collapsed && 'Inklappen'}
          </button>
          <div className={cn('border-t border-border p-3', collapsed && 'flex justify-center')}>
            <UserMenu compact={collapsed} />
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between border-b border-border bg-card px-4 py-2.5 @sm:px-6">
            <span className="hidden items-center gap-1.5 text-xs text-muted-foreground @sm:flex">
              {collapsed ? <PanelLeftOpen className="h-3.5 w-3.5" /> : <PanelLeftClose className="h-3.5 w-3.5" />}
              Klik het pijltje onderaan de zijbalk om uit/in te klappen
            </span>
            {searchBarSlot}
          </header>
          <div className="preview-scroll flex-1 overflow-y-auto bg-background p-4 @sm:p-6">
            <div className="flex flex-col gap-6">{children}</div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}

export const collapsibleSidebarOption: ConfiguratorOption = {
  id: 'collapsible-sidebar',
  label: 'Collapsible sidebar',
  description: 'Inklapbare zijbalk die tot een smalle iconenbalk terugvouwt, met tooltips.',
  thumbnailIcon: PanelLeftClose,
  category: 'navigation',
  PreviewComponent: CollapsibleSidebarPreview,
}
