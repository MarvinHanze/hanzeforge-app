'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronUp, ChevronDown } from 'lucide-react'

import { sectionOptions } from '@/lib/registry'
import { OptionCard } from './OptionCard'

interface SectionPickerProps {
  sectionIds: string[]
  onToggle: (id: string) => void
  onMove: (id: string, direction: 'up' | 'down') => void
}

export function SectionPicker({ sectionIds, onToggle, onMove }: SectionPickerProps) {
  const orderedEnabled = sectionIds
    .map((id) => sectionOptions.find((o) => o.id === id))
    .filter((o): o is (typeof sectionOptions)[number] => Boolean(o))

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {sectionOptions.map((option) => (
          <OptionCard
            key={option.id}
            option={option}
            selected={sectionIds.includes(option.id)}
            onSelect={onToggle}
            multi
          />
        ))}
      </div>

      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">
          Volgorde in de live preview (bovenaan = eerst getoond)
        </p>
        <div className="flex min-h-[44px] flex-wrap items-center gap-2 rounded-lg border border-dashed border-border p-3">
          <AnimatePresence initial={false}>
            {orderedEnabled.map((section, index) => (
              <motion.div
                key={section.id}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.16 }}
                className="flex items-center gap-1 rounded-full bg-accent pl-3 pr-1.5 py-1 text-xs font-medium text-accent-foreground"
              >
                <span>{section.label}</span>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => onMove(section.id, 'up')}
                    disabled={index === 0}
                    aria-label={`${section.label} een plek naar voren`}
                    className="rounded-full p-0.5 hover:bg-accent-foreground/10 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronUp className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onMove(section.id, 'down')}
                    disabled={index === orderedEnabled.length - 1}
                    aria-label={`${section.label} een plek naar achteren`}
                    className="rounded-full p-0.5 hover:bg-accent-foreground/10 disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggle(section.id)}
                    aria-label={`${section.label} verwijderen`}
                    className="rounded-full p-0.5 hover:bg-accent-foreground/10"
                  >
                    <X className="h-3 w-3 opacity-60" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {orderedEnabled.length === 0 && (
            <span className="text-xs text-muted-foreground">
              Selecteer hierboven minstens één sectie.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
