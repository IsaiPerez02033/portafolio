'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Dispara una sola vez cuando el elemento entra al viewport.
 *
 * Devuelve el `ref` a montar en el contenedor y `anim`, la clase que cada hijo
 * combina con las suyas; el escalonado se hace con `style={{animationDelay}}`.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1
) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Sin IntersectionObserver mostramos el contenido en vez de esconderlo
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView, anim: inView ? 'animate-fade-in-up' : 'opacity-0' }
}

/** Delay escalonado, en el orden en que aparece cada hijo. */
export const delay = (seconds: number) => ({ animationDelay: `${seconds}s` })
