'use client'

import { clsx } from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { otherProjects } from '@/data/portfolio'

export default function OtherProjects() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-6 py-12">
      <h2
        className={clsx(
          anim,
          'text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-paper-1 tracking-tight'
        )}
        style={delay(0.1)}
      >
        Más <span className="font-serif">trabajo</span>
      </h2>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
        {otherProjects.map((p, i) => (
          <article
            key={p.name}
            className={clsx(anim, 'border-t border-paper-1/12 pt-5')}
            style={delay(0.15 + i * 0.05)}
          >
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-serif text-xl font-semibold text-paper-1">{p.name}</h3>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-0.5 text-xs font-mono text-paper-2/65 hover:text-paper-1 transition-colors"
                >
                  {p.hrefLabel}
                  <ArrowUpRight className="w-3 h-3" aria-hidden />
                </a>
              )}
            </div>
            <p className="mt-2 text-sm text-paper-2/70 leading-relaxed">{p.description}</p>
            <p className="mt-3 font-mono text-[11px] text-paper-2/60">{p.stack}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
