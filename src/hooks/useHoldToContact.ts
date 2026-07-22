'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { setHoldProgress } from '@/lib/holdProgress'
import { isMobile } from '@/lib/isMobile'
import { mailtoHref, gmailComposeHref } from '@/data/portfolio'

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

/**
 * Lógica del gesto «mantener presionado» → salir de la Matrix → Gmail.
 *
 * Escribe el progreso 0..1 en el store compartido (que alimenta el overlay y el
 * shader) y devuelve ese progreso más los handlers para pegarlos a cualquier
 * botón. La presentación la decide cada componente: el CTA grande de la sección
 * de contacto y la píldora flotante comparten esta misma mecánica.
 */
export function useHoldToContact() {
  const [progress, setProgress] = useState(0)

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
      ramp(progressRef.current)
    },
    [ramp]
  )

  const onPointerUp = useCallback(() => {
    if (!holding.current) return
    holding.current = false
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

  const onContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
  }, [])

  useEffect(() => {
    return () => {
      stopRaf()
      setHoldProgress(0)
    }
  }, [])

  return {
    progress,
    handlers: {
      onPointerDown,
      onPointerUp,
      onPointerLeave: onPointerUp,
      onPointerCancel: onPointerUp,
      onKeyDown,
      onClick,
      onContextMenu,
    },
  }
}
