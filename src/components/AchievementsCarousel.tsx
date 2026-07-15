'use client'

import { useCallback, useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { achievements } from '@/data/portfolio'

const CARD_DESKTOP = 427.5
const GAP = 24
const AUTOPLAY_MS = 3000
const TRANSITION_MS = 800
const LEN = achievements.length

/** Devuelve el índice equivalente dentro del set central, en [LEN, LEN*2). */
const normalize = (i: number) => (((i - LEN) % LEN) + LEN) % LEN + LEN

function QuoteMark() {
  return (
    <svg
      width="28"
      height="22"
      viewBox="0 0 28 22"
      fill="none"
      aria-hidden
      className="text-ink-2/15"
    >
      <path
        d="M0 22V13.2C0 5.9 4.2 1.1 11.5 0l1.3 3.6C8.4 4.7 6 7.2 6 10.6h5.2V22H0Zm16.5 0V13.2C16.5 5.9 20.7 1.1 28 0l1.3 3.6c-4.4 1.1-6.8 3.6-6.8 7h5.2V22H16.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function AchievementsCarousel() {
  const { ref, inView, anim } = useInViewAnimation<HTMLElement>()

  // Triplicamos para poder saltar de set sin que se note el corte
  const items = [...achievements, ...achievements, ...achievements]

  const [index, setIndex] = useState(LEN)
  const [cardWidth, setCardWidth] = useState(CARD_DESKTOP)
  const [animating, setAnimating] = useState(true)
  const [paused, setPaused] = useState(false)
  const step = cardWidth + GAP

  // Ancho de tarjeta según viewport
  useEffect(() => {
    const measure = () =>
      setCardWidth(window.innerWidth < 768 ? window.innerWidth - 48 : CARD_DESKTOP)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const next = useCallback(() => {
    setAnimating(true)
    setIndex((i) => i + 1)
  }, [])

  const prev = useCallback(() => {
    setAnimating(true)
    setIndex((i) => i - 1)
  }, [])

  // Autoplay — sólo con la sección a la vista: fuera de pantalla no aporta nada
  // y el navegador ni siquiera ejecuta las transiciones.
  useEffect(() => {
    if (paused || !inView) return
    const id = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, inView, next])

  // Cuando salimos del set central, saltamos de vuelta a su equivalente sin animar.
  // El disparador es un temporizador y no `transitionend`: el navegador no arranca
  // transiciones sobre contenido fuera de pantalla, así que ese evento podía no
  // llegar nunca y el índice crecía sin límite hasta dejar el carrusel en blanco.
  useEffect(() => {
    if (index >= LEN * 2 || index < LEN) {
      const t = setTimeout(() => {
        setAnimating(false)
        setIndex(normalize)
      }, TRANSITION_MS)
      return () => clearTimeout(t)
    }
  }, [index])

  // Rehabilita la animación en el frame siguiente al salto, para que el salto en sí
  // no se vea.
  useEffect(() => {
    if (animating) return
    const raf = requestAnimationFrame(() => setAnimating(true))
    return () => cancelAnimationFrame(raf)
  }, [animating])

  return (
    <section ref={ref} className="w-full py-20 overflow-hidden">
      {/* Encabezado */}
      <div className="px-6 md:max-w-4xl md:ml-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className={clsx(
              anim,
              'text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-ink-2 tracking-tight'
            )}
            style={delay(0.1)}
          >
            Logros y <span className="font-serif">reconocimientos</span>
          </h2>

          <div
            className={clsx(anim, 'flex items-center gap-2 shrink-0')}
            style={delay(0.2)}
          >
            <Award className="w-5 h-5 text-ink-2" aria-hidden />
            <span className="text-sm text-ink-2">2º lugar · Talent Land 2026</span>
          </div>
        </div>
      </div>

      {/* Carrusel */}
      <div
        className={clsx(anim, 'mt-10')}
        style={delay(0.3)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="px-6 md:max-w-4xl md:ml-auto overflow-hidden">
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${index * step}px)`,
              transition: animating
                ? `transform ${TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`
                : 'none',
            }}
          >
            {items.map((a, i) => {
              const exiting = i < index
              return (
                <article
                  key={`${a.name}-${i}`}
                  aria-hidden={i < LEN || i >= LEN * 2}
                  className={clsx(
                    'shrink-0 bg-white rounded-[32px] md:rounded-[40px] shadow-card',
                    'px-6 md:pl-10 md:pr-24 py-8'
                  )}
                  style={{
                    width: `${cardWidth}px`,
                    opacity: exiting ? 0 : 1,
                    transform: exiting ? 'scale(0.9)' : 'scale(1)',
                    // En el frame del salto no animamos: si no, las tarjetas del set
                    // nuevo se verían aparecer con un fundido delator.
                    transition: animating
                      ? 'opacity 700ms ease, transform 700ms ease'
                      : 'none',
                  }}
                >
                  <QuoteMark />

                  <p className="mt-4 text-base text-ink-2 leading-relaxed">{a.text}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <span
                      className="w-12 h-12 rounded-full flex items-center justify-center text-lg shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${a.gradientFrom}, ${a.gradientTo})`,
                      }}
                      aria-hidden
                    >
                      {a.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-ink-2">{a.name}</p>
                      <p className="text-xs text-muted truncate">
                        <span aria-hidden>→ </span>
                        {a.issuer} · {a.year}
                      </p>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Controles */}
        <div className="px-6 md:max-w-4xl md:ml-auto mt-8 flex gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Logro anterior"
            className="w-12 h-12 rounded-full border border-ink-2/20 flex items-center justify-center text-ink-2 hover:bg-ink-2/5 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente logro"
            className="w-12 h-12 rounded-full border border-ink-2/20 flex items-center justify-center text-ink-2 hover:bg-ink-2/5 transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}
