import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HanzeForge — Configureer jouw dashboard',
  description:
    'HanzeForge is een interactieve configurator waarmee je in een paar stappen de navigatie, het kleurthema, de zoekbalk en de secties van een demo-webapp samenstelt, met een live preview van het eindresultaat.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  )
}
