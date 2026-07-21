'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import Button from '@/components/Button'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { hero, personalInfo, mailtoHref } from '@/data/portfolio'

export default function Hero() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()

  return (
    <section id="inicio" ref={ref} className="max-w-[1200px] mx-auto px-6 pt-12 md:pt-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-10 md:gap-16">
        {/* Texto — conserva la columna angosta del diseño original */}
        <div className="w-full max-w-[440px]">
          <h1
            className={clsx(
              anim,
              'font-serif text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-ink tracking-tight mb-4'
            )}
            style={delay(0.1)}
          >
            {personalInfo.shortName}
          </h1>

          <p
            className={clsx(anim, 'font-mono text-xs md:text-sm text-ink mb-2')}
            style={delay(0.2)}
          >
            {hero.tagline}
          </p>

          <p
            className={clsx(
              anim,
              'text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink-2 tracking-tight whitespace-nowrap'
            )}
            style={delay(0.3)}
          >
            {hero.headingLines.map((line) => (
              <span key={line.accent} className="block">
                {line.plain}
                <span className="font-serif">{line.accent}</span>
              </span>
            ))}
          </p>

          <div
            className={clsx(
              anim,
              'flex flex-col gap-6 mt-5 md:mt-6 text-sm md:text-base text-ink leading-relaxed'
            )}
            style={delay(0.4)}
          >
            {hero.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <div
            className={clsx(anim, 'flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6')}
            style={delay(0.5)}
          >
            <Button href={mailtoHref}>Hablemos</Button>
            <Button href="#proyectos" variant="secondary">
              Ver proyectos
            </Button>
          </div>
        </div>

        {/* Foto */}
        <div className={clsx(anim, 'w-full max-w-xs shrink-0')} style={delay(0.6)}>
          <Image
            src={personalInfo.profileImage}
            alt={`${personalInfo.name} — ${personalInfo.title}`}
            width={800}
            height={1139}
            priority
            sizes="(max-width: 768px) 100vw, 320px"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}
