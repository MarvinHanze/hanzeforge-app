import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  BarChart3,
  CalendarDays,
  Settings,
} from 'lucide-react'

/**
 * Shared building blocks reused by the four navigation option files. This is
 * NOT a registry entry itself (no ConfiguratorOption export) — just plain
 * helpers, so it doesn't break the one-file-per-option convention.
 */
export interface NavItemData {
  label: string
  icon: LucideIcon
  active?: boolean
}

export const NAV_ITEMS: NavItemData[] = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Klanten', icon: Users },
  { label: 'Bestellingen', icon: ShoppingCart },
  { label: 'Rapportages', icon: BarChart3 },
  { label: 'Planning', icon: CalendarDays },
  { label: 'Instellingen', icon: Settings },
]

export function NavLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
        HF
      </div>
      {!compact && (
        <span className="truncate text-sm font-semibold text-foreground">
          Forge Retail B.V.
        </span>
      )}
    </div>
  )
}

export function UserMenu({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2 overflow-hidden">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
        MK
      </div>
      {!compact && (
        <div className="min-w-0 leading-tight">
          <p className="truncate text-xs font-medium text-foreground">Mila Klaassen</p>
          <p className="truncate text-[11px] text-muted-foreground">Beheerder</p>
        </div>
      )}
    </div>
  )
}
