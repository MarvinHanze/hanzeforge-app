import { CalendarDays } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

const WEEKDAYS = ['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo']
// 22 juli 2026 valt op een woensdag; kalender toont juli 2026, beginnend op ma 29 juni.
const DAYS = [
  29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30, 31, 1, 2,
]
const MARKED_DAYS = new Set([14, 22, 28])
const TODAY = 22

const EVENTS = [
  { day: '22 jul', title: 'Klantdemo — Van der Berg Logistiek', time: '10:00 - 11:00' },
  { day: '24 jul', title: 'Kwartaalreview marketing', time: '13:30 - 14:30' },
  { day: '28 jul', title: 'Facturatie deadline Q3', time: 'hele dag' },
]

function CalendarWidgetPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Agenda</CardTitle>
        <CardDescription>Juli 2026 — aankomende afspraken en deadlines</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 @sm:grid-cols-2">
        <div>
          <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-muted-foreground">
            {WEEKDAYS.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {DAYS.map((day, i) => {
              const isCurrentMonth = i >= 2 && i <= 32
              return (
                <span
                  key={i}
                  className={cn(
                    'relative flex h-7 items-center justify-center rounded-md text-xs',
                    isCurrentMonth ? 'text-foreground' : 'text-muted-foreground/40',
                    day === TODAY && isCurrentMonth && 'bg-primary font-semibold text-primary-foreground'
                  )}
                >
                  {day}
                  {MARKED_DAYS.has(day) && isCurrentMonth && day !== TODAY && (
                    <span className="absolute bottom-0.5 h-1 w-1 rounded-full bg-primary" />
                  )}
                </span>
              )
            })}
          </div>
        </div>
        <div>
          <p className="mb-2 text-xs font-medium text-muted-foreground">Komende afspraken</p>
          <ul className="space-y-3">
            {EVENTS.map((event, i) => (
              <li key={event.title}>
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-11 shrink-0 flex-col items-center justify-center rounded-md bg-accent text-accent-foreground">
                    <span className="text-[10px] font-medium leading-none">
                      {event.day.split(' ')[0]}
                    </span>
                    <span className="text-[9px] leading-none">{event.day.split(' ')[1]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                {i < EVENTS.length - 1 && <Separator className="mt-3" />}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

export const calendarWidgetOption: ConfiguratorOption = {
  id: 'calendar-widget',
  label: 'Kalenderwidget',
  description: 'Maandoverzicht gecombineerd met een lijst van aankomende afspraken.',
  thumbnailIcon: CalendarDays,
  category: 'section',
  PreviewComponent: CalendarWidgetPreview,
}
