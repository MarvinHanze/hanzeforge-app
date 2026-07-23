'use client'

import { useState } from 'react'
import { FileEdit, CheckCircle2 } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function FormBlockPreview() {
  const [sent, setSent] = useState(false)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Nieuw contact toevoegen</CardTitle>
        <CardDescription>Gegevens worden direct gesynchroniseerd met je klantenlijst</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid grid-cols-1 gap-4 @sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
            window.setTimeout(() => setSent(false), 2200)
          }}
        >
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">Naam</span>
            <input
              defaultValue="Sanne de Vries"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">E-mail</span>
            <input
              defaultValue="sanne@vriesconsult.nl"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">Bedrijf</span>
            <input
              defaultValue="Vries Consultancy"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm">
            <span className="font-medium text-foreground">Telefoon</span>
            <input
              defaultValue="06 12 34 56 78"
              className="h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm @sm:col-span-2">
            <span className="font-medium text-foreground">Bericht</span>
            <textarea
              rows={3}
              defaultValue="Graag een offerte voor de jaarlijkse onderhoudscontracten."
              className="resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none ring-ring focus:ring-2"
            />
          </label>
          <div className="@sm:col-span-2">
            <Button type="submit" className="gap-2">
              {sent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" /> Verzonden
                </>
              ) : (
                'Contact opslaan'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export const formBlockOption: ConfiguratorOption = {
  id: 'form-block',
  label: 'Formulierblok',
  description: 'Multi-veld formulier voor contactgegevens, gestyled volgens het gekozen thema.',
  thumbnailIcon: FileEdit,
  category: 'section',
  PreviewComponent: FormBlockPreview,
}
