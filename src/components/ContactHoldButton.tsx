'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { setHoldProgress } from '@/lib/holdProgress'
import { isMobile } from '@/lib/isMobile'
import { personalInfo, mailtoHref, gmailComposeHref } from '@/data/portfolio'

// Tiempo de carga hasta disparar. Deliberado, para que el gesto se sienta
// intencional y dé tiempo a que la interferencia se lea.
const HOLD_MS = 1200
// Al llegar al 100% se sostiene el negro un instante antes de navegar.
const BLACKOUT_MS = 220
// Al soltar antes de tiempo, la rampa de vuelta a 0 (más rápida que la subida).
const RELEASE_MS = 320

/** Misma pestaña: la pantalla ya está en negro, navegar es la salida natural. */
const go = () => {
  window.location.href = isMobile() ? mailtoHref : gmailComposeHref
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function ContactHoldButton() {
  // progreso local sólo para el anillo del botón; el global va al store
  const [progress, setProgress] = useState(0)
  const [prompt, setPrompt] = useState('Mantén presionado')

  const raf = useRef<number | null>(null)
  const holding = useRef(false)
  const done = useRef(false)
  // Espejo del progreso, para leerlo dentro de los callbacks sin recrearlos.
  const progressRef = useRef(0)
  progressRef.current = progress

  const publish = useCallback((v: number) => {
    setProgress(v)
    setHoldProgress(v)
  }, [])

  const stopRaf = () => {
    if (raf.current !== null) cancelAnimationFrame(raf.current)
    raf.current = null
  }

  // Rampa de subida mientras se mantiene; al 100% dispara la navegación.
  const ramp = useCallback(
    (from: number) => {
      const startT = performance.now()
      const startV = from
      const tick = (now: number) => {
        const v = startV + (now - startT) / HOLD_MS
        if (v >= 1) {
          publish(1)
          done.current = true
          stopRaf()
          window.setTimeout(go, BLACKOUT_MS)
          return
        }
        publish(v)
        raf.current = requestAnimationFrame(tick)
      }
      raf.current = requestAnimationFrame(tick)
    },
    [publish]
  )

  // Rampa de bajada al soltar antes de tiempo.
  const release = useCallback(() => {
    if (done.current) return
    stopRaf()
    const startT = performance.now()
    const startV = progressRef.current
    const tick = (now: number) => {
      const v = startV * (1 - (now - startT) / RELEASE_MS)
      if (v <= 0) {
        publish(0)
        stopRaf()
        return
      }
      publish(v)
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
  }, [publish])

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return
      e.preventDefault()
      if (done.current) return
      // Sin animación para quien pide menos movimiento: navega directo.
      if (prefersReducedMotion()) {
        go()
        return
      }
      holding.current = true
      setPrompt('Sigue presionando…')
      ramp(progressRef.current)
    },
    [ramp]
  )

  const onPointerUp = useCallback(() => {
    if (!holding.current) return
    holding.current = false
    setPrompt('Mantén presionado')
    release()
  }, [release])

  // Teclado y accesibilidad: sin gesto de mantener, envío directo.
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      go()
    }
  }, [])

  // El clic del ratón no navega por sí solo: el gesto lo manejan los pointer
  // events (o el teclado). Evita que el href mailto dispare en un tap rápido.
  const onClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    return () => {
      stopRaf()
      setHoldProgress(0)
    }
  }, [])

  const pct = Math.round(progress * 100)

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={mailtoHref}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onContextMenu={(e) => e.preventDefault()}
        aria-label={`Habla con ${personalInfo.firstName} — mantén presionado para escribirle`}
        className="group relative inline-flex select-none items-center gap-3 overflow-hidden rounded-full bg-paper-1 pl-2 pr-7 py-2 text-sm font-medium text-ink shadow-primary transition-transform duration-200 [touch-action:none] [-webkit-touch-callout:none] hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pulse"
      >
        {/* Relleno de progreso: barre la píldora de izquierda a derecha */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-beam/30 to-pulse/40"
          style={{ width: `${pct}%` }}
        />

        <Image
          src={personalInfo.profileImage}
          alt=""
          aria-hidden
          width={80}
          height={80}
          className="relative z-10 h-10 w-10 rounded-full object-cover"
        />
        <span className="relative z-10">Habla con {personalInfo.firstName}</span>
      </a>

      <span
        aria-hidden
        className="font-mono text-[11px] text-paper-2/50 transition-opacity duration-200"
      >
        {prompt}
      </span>
    </div>
  )
}
