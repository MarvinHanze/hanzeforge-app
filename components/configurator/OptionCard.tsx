'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { cn } from '@/lib/utils'

interface OptionCardProps {
  option: ConfiguratorOption
  selected: boolean
  onSelect: (id: string) => void
  /** Radio (single-select) vs checkbox (multi-select) affordance. */
  multi?: boolean
}

export function OptionCard({ option, selected, onSelect, multi = false }: OptionCardProps) {
  const Icon = option.thumbnailIcon
  const isThemeOption = option.category === 'theme'
  const Thumb = option.PreviewComponent

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(option.id)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      aria-pressed={selected}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-xl border bg-card text-left shadow-sm transition-colors',
        selected
          ? 'border-primary ring-2 ring-primary/30'
          : 'border-border hover:border-primary/40'
      )}
    >
      <div
        className={cn(
          'flex h-20 items-center justify-center border-b border-border bg-muted/40',
          isThemeOption ? '' : 'text-muted-foreground'
        )}
      >
        {isThemeOption ? (
          <Thumb />
        ) : (
          <span
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-lg transition-colors',
              selected ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground/70'
            )}
          >
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
      <div className="flex flex-1 items-start gap-2 p-3.5">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{option.label}</p>
          <p className="mt-0.5 text-xs leading-snug text-muted-foreground">{option.description}</p>
        </div>
        <span
          className={cn(
            'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors',
            multi ? 'rounded-md' : 'rounded-full',
            selected
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-background text-transparent'
          )}
        >
          <Check className="h-3.5 w-3.5" />
        </span>
      </div>
    </motion.button>
  )
}
