import { Leaf } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { makeThemeSwatchPreview } from './_shared'

export const emeraldSlateTheme: ConfiguratorOption = {
  id: 'emerald-slate',
  label: 'Emerald / Slate',
  description: 'Rustig en zakelijk, groene status-accenten op een neutrale slate-ondergrond.',
  thumbnailIcon: Leaf,
  category: 'theme',
  PreviewComponent: makeThemeSwatchPreview(['#0f9d6a', '#f8fafc', '#e2e8f0', '#0f172a']),
}
