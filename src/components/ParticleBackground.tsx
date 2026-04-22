'use client'

import { useEffect, useState } from 'react'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import type { ISourceOptions } from '@tsparticles/engine'

const particleOptions: ISourceOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: 'grab' },
      onClick: { enable: true, mode: 'push' },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 0.5 } },
      push: { quantity: 2 },
    },
  },
  particles: {
    color: { value: ['#00f5ff', '#7c3aed', '#ffffff'] },
    links: {
      color: '#00f5ff',
      distance: 130,
      enable: true,
      opacity: 0.12,
      width: 1,
    },
    move: {
      direction: 'none',
      enable: true,
      outModes: { default: 'bounce' },
      random: true,
      speed: 0.6,
      straight: false,
    },
    number: { density: { enable: true }, value: 90 },
    opacity: { value: { min: 0.1, max: 0.4 } },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 2.5 } },
  },
  detectRetina: true,
}

export default function ParticleBackground() {
  const [engineReady, setEngineReady] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setEngineReady(true)
    })
  }, [])

  if (!engineReady) return null

  return (
    <Particles
      id="tsparticles"
      options={particleOptions}
      className="absolute inset-0 w-full h-full"
    />
  )
}
