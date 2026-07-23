'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

export interface StepDefinition {
  label: string
  description: string
}

interface StepNavProps {
  steps: StepDefinition[]
  currentStep: number
  onStepClick: (index: number) => void
}

export function StepNav({ steps, currentStep, onStepClick }: StepNavProps) {
  return (
    <nav aria-label="Configuratiestappen" className="w-full">
      <ol className="flex w-full items-stretch gap-1 sm:gap-2">
        {steps.map((step, index) => {
          const isActive = index === currentStep
          const isComplete = index < currentStep
          return (
            <li key={step.label} className="flex-1">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className="group flex w-full flex-col items-start gap-2 pb-3 pt-1 text-left"
              >
                <span
                  className={cn(
                    'flex items-center gap-2 text-xs font-semibold transition-colors sm:text-sm',
                    isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] transition-colors',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : isComplete
                          ? 'bg-primary/15 text-primary'
                          : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {isComplete ? <Check className="h-3 w-3" /> : index + 1}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </span>
                <span className="relative h-1 w-full overflow-hidden rounded-full bg-muted">
                  {isActive ? (
                    <motion.span
                      layoutId="step-underline"
                      className="absolute inset-0 rounded-full bg-primary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  ) : isComplete ? (
                    <span className="absolute inset-0 rounded-full bg-primary/40" />
                  ) : null}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
