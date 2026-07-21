import { ImageResponse } from 'next/og'
import { personalInfo, seoData } from '@/data/portfolio'

export const runtime = 'edge'
export const alt = `${personalInfo.name} — ${personalInfo.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Imagen para compartir en redes. Se genera aquí en vez de recortar la foto de
 * perfil, que es vertical (899x1280) y quedaba mal encuadrada en 1200x630.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #051A24 0%, #0D212C 100%)',
          padding: '80px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, color: '#7E97A3' }}>
          {personalInfo.studio} · {personalInfo.location}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 600,
            color: '#F6FCFF',
            letterSpacing: '-0.03em',
            marginTop: 24,
          }}
        >
          {personalInfo.name}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 40,
            color: '#E0EBF0',
            marginTop: 12,
          }}
        >
          {personalInfo.title}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 26,
            color: '#7E97A3',
            marginTop: 40,
          }}
        >
          IPN ESCOM · 2º lugar Talent Land 2026 · {seoData.canonicalUrl.replace('https://', '')}
        </div>

        <div
          style={{
            display: 'flex',
            width: 120,
            height: 6,
            background: 'linear-gradient(90deg, #1A4DE6, #1ACC80)',
            borderRadius: 3,
            marginTop: 48,
          }}
        />
      </div>
    ),
    size
  )
}
