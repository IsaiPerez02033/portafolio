'use client'

import { clsx } from 'clsx'
import Button from '@/components/Button'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { workModes } from '@/data/portfolio'

const CARD = 'rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10'

export default function ServicesSection() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()
  const { dark, light } = workModes

  return (
    <section id="servicios" ref={ref} className="w-full py-12">
      {/* Misma columna de 1200px que el resto de la página, ocupándola entera:
          con max-w-4xl + ml-auto las tarjetas quedaban pegadas a la derecha. */}
      <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Freelance */}
        <article
          className={clsx(
            anim,
            CARD,
            // Antes se distinguían por claro/oscuro. Sobre fondo oscuro eso ya no
            // sirve: la principal se marca con el acento, la otra queda neutra.
            'bg-ink-2/80 backdrop-blur-md border border-pulse/25 shadow-glow'
          )}
          style={delay(0.1)}
        >
          <h3 className="text-[22px] font-medium text-paper-1 pt-7">{dark.title}</h3>
          <p className="mt-3 text-sm text-paper-2/70 leading-relaxed">
            {dark.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <p className="mt-8 text-2xl text-paper-1">{dark.value}</p>
          <p className="text-sm text-paper-2/60">{dark.valueLabel}</p>

          <div className="mt-8">
            <Button href="#proyectos" variant="ghost">
              Ver proyectos
            </Button>
          </div>
        </article>

        {/* Colaboración */}
        <article
          className={clsx(anim, CARD, 'bg-ink-2/50 backdrop-blur-md border border-paper-1/10 shadow-card')}
          style={delay(0.2)}
        >
          <h3 className="text-[22px] font-medium text-paper-1 pt-7">{light.title}</h3>
          <p className="mt-3 text-sm text-paper-2/60 leading-relaxed">
            {light.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <p className="mt-8 text-2xl text-paper-1">{light.value}</p>
          <p className="text-sm text-paper-2/65">{light.valueLabel}</p>
        </article>
      </div>
      </div>
    </section>
  )
}
