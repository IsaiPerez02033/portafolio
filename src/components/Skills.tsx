'use client'

import { clsx } from 'clsx'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { skillGroups } from '@/data/portfolio'

export default function Skills() {
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
        Lo que <span className="font-serif">uso</span>
      </h2>

      <dl className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {skillGroups.map((g, i) => (
          <div
            key={g.category}
            className={clsx(anim, 'border-t border-ink/10 pt-5')}
            style={delay(0.15 + i * 0.05)}
          >
            <dt className="font-mono text-[11px] uppercase tracking-widest text-ink/40">
              {g.category}
            </dt>
            <dd className="mt-3 text-base text-ink/80 leading-relaxed">
              {g.skills.join(' · ')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
