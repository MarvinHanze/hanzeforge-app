'use client'

import dynamic from 'next/dynamic'
import { BarChart3 } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

// recharts (~650KB) is code-split into its own chunk and only fetched once a
// visitor actually selects this section — see chart-panel-preview.tsx.
const ChartPanelPreview = dynamic(() => import('./chart-panel-preview'), {
  ssr: false,
  loading: () => (
    <Card>
      <CardHeader>
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-64 w-full animate-pulse rounded-md bg-muted/50" />
      </CardContent>
    </Card>
  ),
})

export const chartPanelOption: ConfiguratorOption = {
  id: 'chart-panel',
  label: 'Grafiekpaneel',
  description: 'Lijngrafiek met omzet versus doelstelling over de afgelopen zeven maanden.',
  thumbnailIcon: BarChart3,
  category: 'section',
  PreviewComponent: ChartPanelPreview,
}
