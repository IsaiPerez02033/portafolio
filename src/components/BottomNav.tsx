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
        // El bottom sale del safe-area para no quedar bajo la barra de gestos
        // del iPhone; en pantallas sin muesca env() vale 0 y quedan los 24px.
        'fixed left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ease-out',
        '[bottom:calc(1.5rem+env(safe-area-inset-bottom))]',
        // w-max es obligatorio: en un fixed con left-1/2 el ancho automático se
        // limita a 100vw-50vw, o sea media pantalla, y en móvil eso partía
        // «Habla con Aram» en dos líneas. El max-w sigue de tope por si acaso.
        'w-max max-w-[calc(100vw-2rem)]',
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
