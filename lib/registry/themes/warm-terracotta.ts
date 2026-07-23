import { Flame } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { makeThemeSwatchPreview } from './_shared'

export const warmTerracottaTheme: ConfiguratorOption = {
  id: 'warm-terracotta',
  label: 'Warm Terracotta',
  description: 'Ambachtelijk en warm, terracotta met een zachte salie-groen ondertoon.',
  thumbnailIcon: Flame,
  category: 'theme',
  PreviewComponent: makeThemeSwatchPreview(['#d2582e', '#6b8a6f', '#fbf3ea', '#2e2013']),
}
