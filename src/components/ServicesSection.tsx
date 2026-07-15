'use client'

import { clsx } from 'clsx'
import Button from '@/components/Button'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { workModes, mailtoHref } from '@/data/portfolio'

const CARD = 'rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10'

export default function ServicesSection() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()
  const { dark, light } = workModes

  return (
    <section id="servicios" ref={ref} className="w-full py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl md:ml-auto">
        {/* Freelance */}
        <article
          className={clsx(
            anim,
            CARD,
            'bg-ink shadow-[inset_0_2px_20px_0_rgba(255,255,255,0.06)]'
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

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={mailtoHref} variant="secondary">
              Hablemos
            </Button>
            <Button href="#proyectos" variant="ghost">
              Ver proyectos
            </Button>
          </div>
        </article>

        {/* Colaboración */}
        <article
          className={clsx(anim, CARD, 'bg-white shadow-card')}
          style={delay(0.2)}
        >
          <h3 className="text-[22px] font-medium text-ink pt-7">{light.title}</h3>
          <p className="mt-3 text-sm text-ink/60 leading-relaxed">
            {light.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>

          <p className="mt-8 text-2xl text-ink-2">{light.value}</p>
          <p className="text-sm text-ink/50">{light.valueLabel}</p>

          <div className="mt-8">
            <Button href={mailtoHref} variant="tertiary">
              Hablemos
            </Button>
          </div>
        </article>
      </div>
    </section>
  )
}
