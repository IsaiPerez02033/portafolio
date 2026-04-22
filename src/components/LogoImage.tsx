'use client'

import Image from 'next/image'
import type { LogoVariant } from '@/data/portfolio'

interface LogoImageProps {
  src: string
  alt: string
  size?: number          // tamaño del contenedor (px)
  variant?: LogoVariant
  accentColor?: string   // color de borde/glow del contenedor
  fallbackEmoji?: string
}

/**
 * Renderiza un logo con el tratamiento correcto según su variante:
 *  - 'light-bg'  → contenedor blanco (para logos con fondo blanco)
 *  - 'invert'    → filtro CSS invert (logo negro → blanco en dark mode)
 *  - 'default'   → sin tratamiento (logo con fondo transparente y colores claros)
 */
export default function LogoImage({
  src,
  alt,
  size = 44,
  variant = 'default',
  accentColor,
  fallbackEmoji,
}: LogoImageProps) {
  if (variant === 'light-bg') {
    return (
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center bg-white p-1.5"
        style={{
          width: size,
          height: size,
          border: accentColor ? `1px solid ${accentColor}40` : '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size - 12}
          height={size - 12}
          className="object-contain"
        />
      </div>
    )
  }

  if (variant === 'invert') {
    return (
      <div
        className="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: accentColor ? `${accentColor}15` : 'rgba(255,255,255,0.06)',
          border: accentColor ? `1px solid ${accentColor}35` : '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={size - 10}
          height={size - 10}
          className="object-contain"
          style={{ filter: 'invert(1) brightness(0.9)' }}
        />
      </div>
    )
  }

  // 'default' — fondo transparente con colores propios del logo
  return (
    <div
      className="flex-shrink-0 rounded-xl overflow-hidden flex items-center justify-center"
      style={{
        width: size,
        height: size,
        background: accentColor ? `${accentColor}15` : 'rgba(255,255,255,0.06)',
        border: accentColor ? `1px solid ${accentColor}35` : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={size - 10}
        height={size - 10}
        className="object-contain"
      />
    </div>
  )
}
