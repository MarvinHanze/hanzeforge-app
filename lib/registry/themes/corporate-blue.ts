import { Building2 } from 'lucide-react'

import type { ConfiguratorOption } from '@/lib/registry/types'
import { makeThemeSwatchPreview } from './_shared'

export const corporateBlueTheme: ConfiguratorOption = {
  id: 'corporate-blue',
  label: 'Corporate Blue',
  description: 'Strak en betrouwbaar blauw — klassiek zakelijk, ideaal voor B2B-dashboards.',
  thumbnailIcon: Building2,
  category: 'theme',
  PreviewComponent: makeThemeSwatchPreview(['#2f6fed', '#f5f8fe', '#dce6f9', '#0f1b2d']),
}
