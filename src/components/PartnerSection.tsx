'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import ContactHoldButton from '@/components/ContactHoldButton'
import { marqueeImages } from '@/data/portfolio'

const SPAWN_EVERY_MS = 80
const LIFETIME_MS = 1000

interface Trail {
  id: number
  x: number
  y: number
  rot: number
  src: string
}

export default function PartnerSection() {
  const { ref, anim } = useInViewAnimation<HTMLElement>()
  const boxRef = useRef<HTMLDivElement>(null)
  const [trails, setTrails] = useState<Trail[]>([])

  const lastSpawn = useRef(0)
  const seq = useRef(0)
  const timers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now()
    if (now - lastSpawn.current < SPAWN_EVERY_MS) return
    lastSpawn.current = now

    const box = boxRef.current
    if (!box) return
    const rect = box.getBoundingClientRect()

    const id = seq.current++
    const trail: Trail = {
      id,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      rot: Math.random() * 20 - 10,
      src: marqueeImages[id % marqueeImages.length].src,
    }

    setTrails((t) => [...t, trail])

    const timer = setTimeout(() => {
      setTrails((t) => t.filter((item) => item.id !== id))
      timers.current.delete(timer)
    }, LIFETIME_MS)
    timers.current.add(timer)
  }, [])

  // Si desmontamos a media estela, no dejamos timers colgando
  useEffect(() => {
    const pending = timers.current
    return () => {
      pending.forEach(clearTimeout)
      pending.clear()
    }
  }, [])

  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div
        ref={boxRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setTrails([])}
        className={clsx(
          anim,
          'relative max-w-7xl mx-auto py-48 rounded-[40px] bg-ink-2/40 backdrop-blur-md border border-paper-1/10 shadow-secondary overflow-hidden'
        )}
        style={delay(0.1)}
      >
        {/* Estela de miniaturas */}
        {trails.map((t) => (
          <Image
            key={t.id}
            src={t.src}
            alt=""
            aria-hidden
            width={320}
            height={200}
            className="pointer-events-none absolute w-[180px] h-auto rounded-xl shadow-lg animate-trail-out"
            style={
              {
                left: t.x,
                top: t.y,
                '--rot': `${t.rot}deg`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Contenido */}
        <div className="relative z-10 flex flex-col items-center pointer-events-none">
          <h2 className="font-serif text-[48px] md:text-[64px] lg:text-[80px] leading-none text-paper-1 text-center mb-12">
            Trabajemos juntos
          </h2>

          <div id="contacto-cta" className="pointer-events-auto">
            <ContactHoldButton />
          </div>
        </div>
      </div>
    </section>
  )
}
