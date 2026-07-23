import { Sparkles } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { makeThemeSwatchPreview } from './_shared'

export const indigoVioletTheme: ConfiguratorOption = {
  id: 'indigo-violet',
  label: 'Indigo / Violet',
  description: 'Fris en modern, met een indigo-naar-violet accent — energiek en digitaal.',
  thumbnailIcon: Sparkles,
  category: 'theme',
  PreviewComponent: makeThemeSwatchPreview(['#4f46e5', '#8b5cf6', '#fdfcff', '#1e1b3a']),
}
