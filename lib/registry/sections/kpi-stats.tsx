import { Euro, Users, ListChecks, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface Stat {
  label: string
  value: string
  delta: string
  trend: 'up' | 'down'
  icon: LucideIcon
  sparkline: number[]
}

const STATS: Stat[] = [
  {
    label: 'Omzet deze maand',
    value: '€ 84.320',
    delta: '+12,4%',
    trend: 'up',
    icon: Euro,
    sparkline: [4, 6, 5, 8, 7, 9, 11],
  },
  {
    label: 'Actieve gebruikers',
    value: '2.847',
    delta: '+6,1%',
    trend: 'up',
    icon: Users,
    sparkline: [6, 7, 6, 8, 9, 8, 10],
  },
  {
    label: 'Openstaande taken',
    value: '18',
    delta: '-3,0%',
    trend: 'down',
    icon: ListChecks,
    sparkline: [11, 9, 10, 8, 7, 8, 6],
  },
  {
    label: 'Conversie',
    value: '4,8%',
    delta: '+0,6%',
    trend: 'up',
    icon: TrendingUp,
    sparkline: [5, 5, 6, 6, 7, 7, 8],
  },
]

function Sparkline({ values, trend }: { values: number[]; trend: 'up' | 'down' }) {
  const max = Math.max(...values)
  return (
    <div className="flex h-6 items-end gap-0.5">
      {values.map((v, i) => (
        <span
          key={i}
          className={cn(
            'w-1.5 rounded-sm',
            i === values.length - 1
              ? trend === 'up'
                ? 'bg-primary'
                : 'bg-destructive'
              : 'bg-primary/25'
          )}
          style={{ height: `${Math.max(15, (v / max) * 100)}%` }}
        />
      ))}
    </div>
  )
}

function KpiStatsPreview() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {STATS.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <stat.icon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  'flex items-center gap-0.5 text-xs font-medium',
                  stat.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-destructive'
                )}
              >
                {stat.trend === 'up' ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {stat.delta}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <div className="mt-1 flex items-end justify-between gap-2">
              <p className="text-xl font-semibold text-foreground">{stat.value}</p>
              <Sparkline values={stat.sparkline} trend={stat.trend} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export const kpiStatsOption: ConfiguratorOption = {
  id: 'kpi-stats',
  label: 'KPI stat-cards',
  description: 'Rij van vier kerncijfers met trendindicator: omzet, gebruikers, taken en conversie.',
  thumbnailIcon: TrendingUp,
  category: 'section',
  PreviewComponent: KpiStatsPreview,
}
