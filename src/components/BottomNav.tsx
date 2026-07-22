'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import ContactHoldButton from '@/components/ContactHoldButton'

/**
 * Píldora flotante de contacto, idéntica al CTA de «Trabajemos juntos».
 *
 * Se esconde en cuanto ese CTA (#contacto-cta) entra en pantalla: da la
 * sensación de que la flotante se funde con la que ya está en la sección, en
 * vez de quedar duplicada frente a ella.
 */
export default function BottomNav() {
  const [merged, setMerged] = useState(false)
  const observed = useRef(false)

  useEffect(() => {
    const target = document.getElementById('contacto-cta')
    if (!target) return
    observed.current = true
    const io = new IntersectionObserver(
      ([entry]) => setMerged(entry.isIntersecting),
      { rootMargin: '-20% 0px' } // que desaparezca cuando el CTA está bien a la vista
    )
    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <div
      className={clsx(
        'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out',
        merged
          ? 'pointer-events-none translate-y-6 opacity-0 scale-95'
          : 'opacity-100'
      )}
      aria-hidden={merged}
    >
      <ContactHoldButton showHint={false} />
    </div>
  )
}
