'use client'

import { useEffect, useRef } from 'react'

/**
 * Custom cursor: small dot that tracks instantly +
 * a larger ring that follows with a smooth delay.
 * Hidden on mobile/touch devices.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't render on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
        dotRef.current.style.opacity = '1'
      }
    }

    const animate = () => {
      // Ring lags behind with lerp
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
        ringRef.current.style.opacity = '1'
      }

      rafId = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const onLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }

    // Scale ring on hover over interactive elements
    const onLinkEnter = () => {
      if (ringRef.current) ringRef.current.classList.add('scale-150')
      if (dotRef.current) dotRef.current.classList.add('scale-0')
    }
    const onLinkLeave = () => {
      if (ringRef.current) ringRef.current.classList.remove('scale-150')
      if (dotRef.current) dotRef.current.classList.remove('scale-0')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    const interactives = document.querySelectorAll('a, button, [data-cursor]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onLinkEnter)
      el.addEventListener('mouseleave', onLinkLeave)
    })

    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onLinkEnter)
        el.removeEventListener('mouseleave', onLinkLeave)
      })
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] opacity-0 transition-[opacity,transform] duration-100"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-2 h-2 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100"
          style={{ boxShadow: '0 0 8px #00f5ff' }}
        />
      </div>

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] opacity-0 transition-[opacity,transform] duration-100"
        style={{ willChange: 'transform' }}
      >
        <div
          className="w-8 h-8 rounded-full border border-cyan-400/60 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300"
          style={{ boxShadow: '0 0 12px #00f5ff40' }}
        />
      </div>
    </>
  )
}
