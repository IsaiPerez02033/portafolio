'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import { Award, ChevronLeft, ChevronRight } from 'lucide-react'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { achievements } from '@/data/portfolio'

const CARD_DESKTOP = 427.5
const GAP = 24
const AUTOPLAY_MS = 3000
const TRANSITION_MS = 800
const LEN = achievements.length
/** Recorrido horizontal mínimo, en px, para que un arrastre cuente como cambio. */
const SWIPE_PX = 45

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
      className="text-paper-2/25"
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

  // Ancho de tarjeta según viewport. Se mide el contenedor real y no
  // window.innerWidth: así el px del padding lateral sale de una sola fuente y
  // no hay que replicarlo aquí cada vez que cambie.
  const windowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const measure = () => {
      const el = windowRef.current
      if (!el) return
      // clientWidth incluye el padding, así que hay que descontarlo para saber
      // cuánto mide de verdad la ventana visible del carrusel.
      const cs = getComputedStyle(el)
      const inner =
        el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
      setCardWidth(window.innerWidth < 768 ? inner : CARD_DESKTOP)
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  const next = useCallback(() => {
    setAnimating(true)
    setIndex((i) => i + 1)
  }, [])

  const prev = useCallback(() => {
    setAnimating(true)
    setIndex((i) => i - 1)
  }, [])

  // ── Deslizar con el dedo ───────────────────────────────────────────────────
  // En móvil los dos botones quedan debajo del carrusel; el gesto natural es
  // arrastrar la tarjeta. Se sigue el dedo en el eje X y sólo al soltar se
  // decide si el recorrido dio para cambiar de tarjeta.
  const dragStart = useRef<{ x: number; y: number } | null>(null)
  // Espejo en ref del desplazamiento: al soltar hay que leerlo fuera del render
  const dragRef = useRef(0)
  const [dragX, setDragX] = useState(0)

  const setDrag = useCallback((v: number) => {
    dragRef.current = v
    setDragX(v)
  }, [])

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.pointerType === 'mouse') return // en escritorio manda el hover/autoplay
    dragStart.current = { x: e.clientX, y: e.clientY }
    setPaused(true)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const from = dragStart.current
      if (!from) return
      const dx = e.clientX - from.x
      // Si el gesto es claramente vertical, es scroll de la página: lo soltamos
      if (Math.abs(e.clientY - from.y) > Math.abs(dx)) {
        dragStart.current = null
        setDrag(0)
        setPaused(false)
        return
      }
      setDrag(dx)
    },
    [setDrag]
  )

  const onPointerUp = useCallback(() => {
    const from = dragStart.current
    const dx = dragRef.current
    dragStart.current = null
    setDrag(0)
    setPaused(false)
    if (!from) return
    if (dx <= -SWIPE_PX) next()
    else if (dx >= SWIPE_PX) prev()
  }, [next, prev, setDrag])

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
    <section ref={ref} className="w-full py-16 md:py-20 overflow-hidden">
      {/* Misma columna de 1200px que el resto de la página, ocupándola entera.
          El encabezado, la ventana del carrusel y los controles comparten el
          mismo padding lateral para que sus bordes izquierdos coincidan. */}
      <div className="max-w-[1200px] mx-auto">
      {/* Encabezado */}
      <div className="px-5 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
          <h2
            className={clsx(
              anim,
              'text-[30px] sm:text-[36px] md:text-[40px] lg:text-[44px] leading-[1.1] text-paper-1 tracking-tight'
            )}
            style={delay(0.1)}
          >
            Logros y <span className="font-serif">reconocimientos</span>
          </h2>

          <div
            className={clsx(anim, 'flex items-center gap-2 shrink-0')}
            style={delay(0.2)}
          >
            <Award className="w-5 h-5 text-paper-1" aria-hidden />
            <span className="text-sm text-paper-1">2º lugar · Talent Land 2026</span>
          </div>
        </div>
      </div>

      {/* Carrusel */}
      <div
        className={clsx(anim, 'mt-8 md:mt-10')}
        style={delay(0.3)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* pan-y deja pasar el scroll vertical y nos reserva el eje X para el swipe */}
        <div
          ref={windowRef}
          className="px-5 sm:px-6 overflow-hidden touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(${dragX - index * step}px)`,
              // Mientras el dedo arrastra no hay transición: la tarjeta sigue al
              // dedo 1:1. Al soltar vuelve la curva de siempre.
              transition:
                animating && dragX === 0
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
                    'shrink-0 bg-ink-2/70 backdrop-blur-md rounded-[28px] md:rounded-[40px] shadow-card',
                    'select-none px-6 md:pl-10 md:pr-24 py-7 md:py-8'
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

                  <p className="mt-4 text-[15px] md:text-base text-paper-1 leading-relaxed">
                    {a.text}
                  </p>

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
                      <p className="font-semibold text-sm text-paper-1">{a.name}</p>
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
        <div className="px-5 sm:px-6 mt-6 md:mt-8 flex gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Logro anterior"
            className="w-12 h-12 rounded-full border border-paper-1/20 flex items-center justify-center text-paper-1 hover:bg-paper-1/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Siguiente logro"
            className="w-12 h-12 rounded-full border border-paper-1/20 flex items-center justify-center text-paper-1 hover:bg-paper-1/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </div>
      </div>
      </div>
    </section>
  )
}
