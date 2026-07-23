import {
  History,
  UserPlus,
  FileCheck2,
  MessageSquare,
  ShoppingCart,
  AlertTriangle,
  Truck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ActivityEntry {
  icon: LucideIcon
  text: string
  meta: string
  time: string
  tone: 'default' | 'success' | 'warning'
}

const ACTIVITIES: ActivityEntry[] = [
  {
    icon: ShoppingCart,
    text: 'Nieuwe bestelling #48213 ontvangen',
    meta: 'Van der Berg Logistiek B.V.',
    time: '5 min geleden',
    tone: 'default',
  },
  {
    icon: UserPlus,
    text: 'Nieuwe gebruiker toegevoegd aan team',
    meta: 'Sanne de Vries (Sales)',
    time: '32 min geleden',
    tone: 'success',
  },
  {
    icon: FileCheck2,
    text: 'Factuur #INV-2291 gemarkeerd als betaald',
    meta: '€ 1.960,50 · De Groot Interieurbouw',
    time: '1 uur geleden',
    tone: 'success',
  },
  {
    icon: MessageSquare,
    text: 'Nieuwe reactie op ticket #772',
    meta: 'Bakker & Zonen Techniek',
    time: '2 uur geleden',
    tone: 'default',
  },
  {
    icon: AlertTriangle,
    text: 'Voorraad laag: Kabelgoot 60mm',
    meta: 'Nog 4 stuks op locatie Utrecht',
    time: '3 uur geleden',
    tone: 'warning',
  },
  {
    icon: Truck,
    text: 'Order #48190 onderweg naar klant',
    meta: 'Verwachte levering: morgen 12:00',
    time: '5 uur geleden',
    tone: 'default',
  },
]

const TONE_CLASSES: Record<ActivityEntry['tone'], string> = {
  default: 'bg-accent text-accent-foreground',
  success: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
}

function ActivityFeedPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recente activiteit</CardTitle>
        <CardDescription>Live logboek van gebeurtenissen in je organisatie</CardDescription>
      </CardHeader>
      <CardContent>
        <ol className="relative space-y-5 border-l border-border pl-6">
          {ACTIVITIES.map((activity) => (
            <li key={activity.text} className="relative">
              <span
                className={cn(
                  'absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-background',
                  TONE_CLASSES[activity.tone]
                )}
              >
                <activity.icon className="h-3.5 w-3.5" />
              </span>
              <p className="text-sm font-medium text-foreground">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.meta}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground/70">{activity.time}</p>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

export const activityFeedOption: ConfiguratorOption = {
  id: 'activity-feed',
  label: 'Activiteitenfeed',
  description: 'Verticale tijdlijn met de laatste gebeurtenissen, statussen en tijdstippen.',
  thumbnailIcon: History,
  category: 'section',
  PreviewComponent: ActivityFeedPreview,
}
