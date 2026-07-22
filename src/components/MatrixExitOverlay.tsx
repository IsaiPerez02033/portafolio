'use client'

import { useEffect, useRef, useState } from 'react'
import { subscribeHoldProgress } from '@/lib/holdProgress'

/**
 * Capa de «salir de la Matrix» a pantalla completa, por encima de TODO el
 * contenido (z-60). Se oscurece y añade interferencia según el progreso del
 * botón de contacto, hasta dejar la pantalla en negro justo antes de navegar.
 *
 * Es el mecanismo principal del oscurecido: al ir sobre el contenido (no detrás,
 * como el shader), afecta también al texto y las tarjetas, y funciona aunque no
 * haya WebGL. Lee el progreso por suscripción, no por props, para no acoplarse
 * al botón que vive dentro de <main>.
 */
export default function MatrixExitOverlay() {
  const [progress, setProgress] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => subscribeHoldProgress(setProgress), [])

  // Inactivo: no pinta nada ni intercepta eventos (pointer-events siempre none).
  if (progress <= 0) return null

  // El velo entra rápido al final (easeIn) para un apagón nítido; la
  // interferencia es fuerte al principio y se disuelve cuando ya está negro.
  const veil = progress * progress
  const interference = Math.sin(Math.min(progress, 1) * Math.PI) // pico al 50%

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60]"
    >
      {/* Velo negro: oscurece la página entera */}
      <div className="absolute inset-0 bg-black" style={{ opacity: veil }} />

      {/* Scanlines en deriva */}
      <div
        className="animate-scanline absolute inset-0 mix-blend-screen"
        style={{
          opacity: interference * 0.5,
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(26,204,128,0.18) 0px, rgba(26,204,128,0.18) 1px, transparent 2px, transparent 4px)',
        }}
      />

      {/* Tinte turquesa que parpadea: la «interferencia» de señal */}
      <div
        className="animate-interference absolute inset-0 mix-blend-screen"
        style={{
          opacity: interference * 0.35,
          background:
            'linear-gradient(180deg, rgba(18,50,96,0.4), rgba(26,204,128,0.15) 50%, rgba(18,50,96,0.4))',
        }}
      />
    </div>
  )
}
