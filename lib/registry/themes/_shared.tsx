/**
 * Shared thumbnail renderer for theme options. Not a registry entry itself.
 * Themes aren't really "components" — the actual color application happens
 * via the `[data-preview-theme]` CSS variable blocks in app/globals.css that
 * PreviewFrame switches between. This just gives each OptionCard a small,
 * honest swatch preview of the palette using the same hex values.
 */
export function makeThemeSwatchPreview(colors: readonly string[]) {
  function ThemeSwatchPreview() {
    return (
      <div className="flex h-full w-full items-center justify-center gap-1 p-2">
        {colors.map((color, i) => (
          <span
            key={i}
            className="h-6 w-6 rounded-full border border-black/10 shadow-sm"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    )
  }
  return ThemeSwatchPreview
}
