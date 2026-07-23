'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  type TooltipProps,
} from 'recharts'
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const MONTHLY_DATA = [
  { month: 'jan', omzet: 52100, doel: 50000 },
  { month: 'feb', omzet: 58400, doel: 52000 },
  { month: 'mrt', omzet: 55200, doel: 54000 },
  { month: 'apr', omzet: 61800, doel: 56000 },
  { month: 'mei', omzet: 67300, doel: 58000 },
  { month: 'jun', omzet: 71950, doel: 60000 },
  { month: 'jul', omzet: 84320, doel: 62000 },
]

function ChartTooltip({ active, payload, label }: TooltipProps<ValueType, NameType>) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-md border border-border bg-popover px-3 py-2 text-xs shadow-md">
      <p className="mb-1 font-medium capitalize text-popover-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="text-muted-foreground">
          {p.dataKey === 'omzet' ? 'Omzet' : 'Doel'}:{' '}
          <span className="font-medium text-popover-foreground">
            € {Number(p.value).toLocaleString('nl-NL')}
          </span>
        </p>
      ))}
    </div>
  )
}

/**
 * The actual chart rendering, kept in its own file so `chart-panel.tsx` can
 * `next/dynamic()`-import it — recharts is one of the heaviest deps in this
 * app and should only ever be downloaded by visitors who actually select
 * the "Grafiekpaneel" section, not bundled into everyone's initial load.
 */
export default function ChartPanelPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Omzet per maand</CardTitle>
        <CardDescription>Realtime omzet versus maandelijks doel, lopend jaar</CardDescription>
      </CardHeader>
      <CardContent className="pl-0">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_DATA} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="hf-omzet-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={48}
                tickFormatter={(v) => `€${Math.round(v / 1000)}k`}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
              />
              <Tooltip content={<ChartTooltip />} />
              <Area
                type="monotone"
                dataKey="doel"
                stroke="hsl(var(--chart-3))"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="none"
              />
              <Area
                type="monotone"
                dataKey="omzet"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2.5}
                fill="url(#hf-omzet-fill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
