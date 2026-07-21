'use client'

import { clsx } from 'clsx'
import { Quote } from 'lucide-react'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { quote } from '@/data/portfolio'

export default function QuoteSection() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()

  return (
    <section ref={ref} className="py-12 px-6 max-w-2xl mx-auto">
      <div className={anim} style={delay(0.1)}>
        <Quote className="w-6 h-6 text-slate-900" aria-hidden />
      </div>

      <blockquote
        className={clsx(
          anim,
          'mt-4 text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-paper-1 tracking-tight'
        )}
        style={delay(0.2)}
      >
        {quote.plain}
        <span className="font-serif">{quote.accent}</span>
        {quote.rest}
      </blockquote>

      <p className={clsx(anim, 'mt-5 italic text-sm text-muted')} style={delay(0.3)}>
        {quote.author}
      </p>

      <div className={clsx(anim, 'mt-10')} style={delay(0.4)}>
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted/70 mb-4">
          {quote.affiliationsLabel}
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {quote.affiliations.map((a) => (
            <span
              key={a.name}
              className="text-[24px] font-medium text-slate-900"
              style={{ minWidth: a.width }}
            >
              {a.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
