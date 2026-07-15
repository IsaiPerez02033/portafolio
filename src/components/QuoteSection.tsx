'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { Quote } from 'lucide-react'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { quote, personalInfo } from '@/data/portfolio'

// El diseño original pedía 200px, pero con el alto de esta sección la foto se
// montaba sobre las tarjetas de abajo. 80px mantiene la deriva sin invadir.
const MAX_OFFSET = 80

export default function QuoteSection() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()
  const imageRef = useRef<HTMLDivElement>(null)

  // Parallax: sólo escuchamos scroll mientras la imagen está en pantalla, y el
  // trabajo real ocurre dentro de un rAF para no bloquear el hilo de scroll.
  useEffect(() => {
    const el = imageRef.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let visible = false
    let ticking = false

    const update = () => {
      ticking = false
      const rect = el.getBoundingClientRect()
      const progress = 1 - (rect.top + rect.height / 2) / window.innerHeight
      const offset = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, progress * MAX_OFFSET))
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`
    }

    const onScroll = () => {
      if (!visible || ticking) return
      ticking = true
      requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) update()
    })

    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <section ref={ref} className="pt-12 pb-32 px-6 max-w-2xl mx-auto">
      <div className={anim} style={delay(0.1)}>
        <Quote className="w-6 h-6 text-slate-900" aria-hidden />
      </div>

      <blockquote
        className={clsx(
          anim,
          'mt-4 text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink-2 tracking-tight'
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

      <div className={clsx(anim, 'mt-12 flex justify-center')} style={delay(0.5)}>
        <div ref={imageRef} className="will-change-transform">
          <Image
            src={personalInfo.profileImage}
            alt={`${personalInfo.name} — ${personalInfo.title}`}
            width={800}
            height={1139}
            className="w-full max-w-xs rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
