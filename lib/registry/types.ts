import type { LucideIcon } from 'lucide-react'
import type { ComponentType, ReactNode } from 'react'

/**
 * The four wizard steps that collect a single-select or multi-select choice.
 * ('overview' is the summary step and has no registry of its own.)
 */
export type OptionCategory = 'navigation' | 'theme' | 'searchBar' | 'section'

export interface ConfiguratorPreviewProps {
  /**
   * Page content to render inside the chosen navigation shell.
   * Only consumed by `navigation` options.
   */
  children?: ReactNode
  /**
   * The currently selected search bar's own rendered preview, slotted into
   * the navigation shell whatever layout it uses. Only consumed by
   * `navigation` options.
   */
  searchBarSlot?: ReactNode
}

/**
 * The single shape every configurator option must satisfy, no matter which
 * category it belongs to. This is the entire contract the rest of the app
 * relies on — the wizard, the OptionCard thumbnails, and the live preview
 * compositor all iterate arrays of this type, never anything category-specific.
 */
export interface ConfiguratorOption {
  /** Stable, URL/attribute-safe identifier, e.g. "indigo-violet". */
  id: string
  /** Short human label shown on the option card, e.g. "Indigo / Violet". */
  label: string
  /** One-sentence description shown under the label on the option card. */
  description: string
  /** Icon used on the option card thumbnail. */
  thumbnailIcon: LucideIcon
  category: OptionCategory
  /** The component that renders this option's actual visual preview. */
  PreviewComponent: ComponentType<ConfiguratorPreviewProps>
}
