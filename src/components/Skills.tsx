'use client'

import { clsx } from 'clsx'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { skillGroups } from '@/data/portfolio'

export default function Skills() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 sm:px-6 py-12">
      <h2
        className={clsx(
          anim,
          'text-[30px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[1.1] text-paper-1 tracking-tight'
        )}
        style={delay(0.1)}
      >
        Lo que <span className="font-serif">uso</span>
      </h2>

      <dl className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-7 md:gap-y-8">
        {skillGroups.map((g, i) => (
          <div
            key={g.category}
            className={clsx(anim, 'border-t border-paper-1/12 pt-5')}
            style={delay(0.15 + i * 0.05)}
          >
            <dt className="font-mono text-[11px] uppercase tracking-widest text-paper-2/60">
              {g.category}
            </dt>
            <dd className="mt-3 text-base text-paper-2/80 leading-relaxed">
              {g.skills.join(' · ')}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
