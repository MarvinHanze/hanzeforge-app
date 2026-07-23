'use client'

import { useEffect, useState } from 'react'
import { Search, Users, ShoppingCart, FileText, Settings, BarChart3 } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command'

function CommandPalettePreview() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'k' && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-9 gap-2 text-muted-foreground"
      >
        <Search className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Zoeken...</span>
        <CommandShortcut className="ml-1 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">
          ⌘K
        </CommandShortcut>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Typ een opdracht of zoekterm..." />
        <CommandList>
          <CommandEmpty>Geen resultaten gevonden.</CommandEmpty>
          <CommandGroup heading="Klanten">
            <CommandItem>
              <Users className="mr-2 h-4 w-4" />
              Van der Berg Logistiek B.V.
            </CommandItem>
            <CommandItem>
              <Users className="mr-2 h-4 w-4" />
              De Groot Interieurbouw
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Bestellingen">
            <CommandItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Order #48213 — in behandeling
            </CommandItem>
            <CommandItem>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Order #48198 — verzonden
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Snelkoppelingen">
            <CommandItem>
              <BarChart3 className="mr-2 h-4 w-4" />
              Ga naar Rapportages
            </CommandItem>
            <CommandItem>
              <FileText className="mr-2 h-4 w-4" />
              Nieuwe factuur aanmaken
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              Instellingen openen
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export const commandPaletteOption: ConfiguratorOption = {
  id: 'command-palette',
  label: '⌘K command palette',
  description: 'Toetsenbord-gedreven zoekvenster dat overal in de app opent met ⌘K.',
  thumbnailIcon: Search,
  category: 'searchBar',
  PreviewComponent: CommandPalettePreview,
}
