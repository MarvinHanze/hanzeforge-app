import { Moon } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { makeThemeSwatchPreview } from './_shared'

export const darkAmberTheme: ConfiguratorOption = {
  id: 'dark-amber',
  label: 'Dark / Amber',
  description: 'Premium donker thema met goud-amber accenten — luxe en exclusief.',
  thumbnailIcon: Moon,
  category: 'theme',
  PreviewComponent: makeThemeSwatchPreview(['#17161c', '#e0b64a', '#2a2832', '#f0e8d8']),
}
