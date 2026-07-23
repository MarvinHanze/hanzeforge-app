'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, Send, PartyPopper } from 'lucide-react'

import { navigationOptions, themeOptions, searchBarOptions, sectionOptions } from '@/lib/registry'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

interface SummaryPanelProps {
  navigationId: string
  themeId: string
  searchBarId: string
  sectionIds: string[]
}

export function SummaryPanel({
  navigationId,
  themeId,
  searchBarId,
  sectionIds,
}: SummaryPanelProps) {
  const [submitted, setSubmitted] = useState(false)

  const navOption = navigationOptions.find((o) => o.id === navigationId)
  const themeOption = themeOptions.find((o) => o.id === themeId)
  const searchBarOption = searchBarOptions.find((o) => o.id === searchBarId)
  const enabledSections = sectionIds
    .map((id) => sectionOptions.find((o) => o.id === id))
    .filter((o): o is (typeof sectionOptions)[number] => Boolean(o))

  const rows: { label: string; value: string }[] = [
    { label: 'Navigatie', value: navOption?.label ?? '—' },
    { label: 'Kleurthema', value: themeOption?.label ?? '—' },
    { label: 'Zoekbalk', value: searchBarOption?.label ?? '—' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Jouw configuratie</CardTitle>
        <CardDescription>
          Controleer je keuzes en vraag vrijblijvend een voorstel aan op basis van deze configuratie.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {rows.map((row) => (
            <div key={row.label} className="rounded-lg border border-border bg-muted/30 p-3">
              <dt className="text-xs text-muted-foreground">{row.label}</dt>
              <dd className="mt-0.5 text-sm font-semibold text-foreground">{row.value}</dd>
            </div>
          ))}
        </dl>

        <Separator />

        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">
            Secties, in weergavevolgorde ({enabledSections.length})
          </p>
          {enabledSections.length > 0 ? (
            <ol className="flex flex-wrap gap-2">
              {enabledSections.map((section, index) => (
                <li key={section.id}>
                  <Badge variant="secondary" className="gap-1.5 font-normal">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
                      {index + 1}
                    </span>
                    {section.label}
                  </Badge>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-muted-foreground">Geen secties geselecteerd.</p>
          )}
        </div>

        <Separator />

        <div className="flex flex-col items-start gap-3 rounded-lg bg-accent/60 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Klaar om verder te gaan?</p>
            <p className="text-xs text-muted-foreground">
              We nemen contact op met een vrijblijvend voorstel op basis van deze configuratie.
            </p>
          </div>
          <span className="sr-only" aria-live="polite">
            {submitted ? 'Aanvraag verstuurd.' : ''}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            {submitted ? (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex shrink-0 items-center gap-2 rounded-md bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-600 dark:text-emerald-400"
              >
                <PartyPopper className="h-4 w-4" />
                Aanvraag verstuurd — we nemen snel contact op!
              </motion.div>
            ) : (
              <motion.div
                key="cta"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Button size="lg" className="shrink-0 gap-2" onClick={() => setSubmitted(true)}>
                  <Send className="h-4 w-4" />
                  Vraag dit voorstel aan
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {submitted && (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Dit is een demo — er is geen echte aanvraag verzonden of opgeslagen.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
