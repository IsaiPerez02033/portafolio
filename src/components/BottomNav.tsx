'use client'

import { useHoldToContact } from '@/hooks/useHoldToContact'
import { mailtoHref } from '@/data/portfolio'

/**
 * Píldora flotante fija abajo: la inicial vuelve al inicio y «Hablemos» es un
 * mantener-presionado que dispara la salida tipo Matrix y navega a Gmail —
 * misma mecánica que el CTA grande, vía useHoldToContact.
 */
export default function BottomNav() {
  const { progress, handlers } = useHoldToContact()
  const pct = Math.round(progress * 100)

  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      aria-label="Acciones rápidas"
    >
      <div className="flex items-center gap-5 rounded-full bg-white px-8 py-2 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_10px_0_rgba(5,26,36,0.08),0_12px_30px_0_rgba(5,26,36,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)]">
        <a
          href="#inicio"
          className="font-serif text-2xl font-semibold text-ink leading-none"
          aria-label="Ir al inicio"
        >
          I
        </a>

        <a
          href={mailtoHref}
          {...handlers}
          aria-label="Hablemos — mantén presionado para escribirme"
          className="group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-ink px-7 py-3 text-sm font-medium text-paper-1 [touch-action:none] [-webkit-touch-callout:none] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pulse"
        >
          {/* Relleno de progreso: barre la píldora de izquierda a derecha */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 bg-gradient-to-r from-beam/50 to-pulse/60"
            style={{ width: `${pct}%` }}
          />
          <span className="relative z-10">Hablemos</span>
        </a>
      </div>
    </nav>
  )
}
