'use client'

import { clsx } from 'clsx'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { otherProjects } from '@/data/portfolio'

export default function OtherProjects() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-6 py-12">
      <h2
        className={clsx(
          anim,
          'text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink-2 tracking-tight'
        )}
        style={delay(0.1)}
      >
        Más <span className="font-serif">trabajo</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {otherProjects.map((p, i) => (
          <article
            key={p.name}
            className={clsx(anim, 'border-t border-ink/10 pt-5')}
            style={delay(0.15 + i * 0.05)}
          >
            <h3 className="font-serif text-xl font-semibold text-ink">{p.name}</h3>
            <p className="mt-2 text-sm text-ink/70 leading-relaxed">{p.description}</p>
            <p className="mt-3 font-mono text-[11px] text-ink/40">{p.stack}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
