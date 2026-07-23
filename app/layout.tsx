import type { Metadata, Viewport } from 'next'
import './globals.css'

const title = 'HanzeForge — Configureer jouw dashboard'
const description =
  'HanzeForge is een interactieve configurator waarmee je in een paar stappen de navigatie, het kleurthema, de zoekbalk en de secties van een demo-webapp samenstelt, met een live preview van het eindresultaat.'

export const metadata: Metadata = {
  metadataBase: new URL('https://demo.hanzeonline.nl'),
  title,
  description,
  applicationName: 'HanzeForge',
  keywords: [
    'HanzeForge',
    'webapp configurator',
    'dashboard configurator',
    'HanzeOnline',
    'demo',
  ],
  authors: [{ name: 'HanzeOnline' }],
  alternates: {
    canonical: '/hanzeforge',
  },
  openGraph: {
    title,
    description,
    url: '/hanzeforge',
    siteName: 'HanzeForge',
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4f46e5',
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
