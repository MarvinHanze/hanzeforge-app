import { ImageResponse } from 'next/og'

export const alt = 'HanzeForge — Configureer jouw dashboard'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 24,
          padding: '80px 96px',
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 88,
            height: 88,
            borderRadius: 20,
            background: 'rgba(255,255,255,0.15)',
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          HF
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1 }}>HanzeForge</div>
        <div style={{ fontSize: 30, opacity: 0.9, maxWidth: 900, lineHeight: 1.4 }}>
          Configureer live het dashboard van jouw demo-webapp — kies, bekijk, herhaal.
        </div>
      </div>
    ),
    { ...size }
  )
}
