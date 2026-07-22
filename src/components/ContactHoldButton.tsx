'use client'

import Image from 'next/image'
import { useHoldToContact } from '@/hooks/useHoldToContact'
import { personalInfo, mailtoHref } from '@/data/portfolio'

/** CTA grande de la sección «Trabajemos juntos»: avatar + nombre + pista. */
export default function ContactHoldButton() {
  const { progress, handlers } = useHoldToContact()
  const pct = Math.round(progress * 100)

  return (
    <div className="flex flex-col items-center gap-3">
      <a
        href={mailtoHref}
        {...handlers}
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
        {progress > 0 ? 'Sigue presionando…' : 'Mantén presionado'}
      </span>
    </div>
  )
}
