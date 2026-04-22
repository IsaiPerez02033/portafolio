'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { motion } from 'framer-motion'
import TypingEffect from '@/components/TypingEffect'
import { personalInfo, typingTexts } from '@/data/portfolio'
import { scrollToSection } from '@/lib/utils'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground'),
  { ssr: false }
)

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Particle layer */}
      <ParticleBackground />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, #00f5ff0a 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 70% 30%, #7c3aed08 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 pt-28 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="font-mono text-cyan-400 text-sm tracking-widest">
              {'> Hola, soy'}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight"
          >
            {personalInfo.firstName}
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #00f5ff, #7c3aed)',
              }}
            >
              {personalInfo.lastName}
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-mono text-xl sm:text-2xl text-gray-300 h-8 flex items-center"
          >
            <TypingEffect
              texts={typingTexts}
              className="text-cyan-400 font-semibold"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-gray-400 max-w-md leading-relaxed"
          >
            Estudiante de IA en{' '}
            <span className="text-white font-medium">IPN ESCOM</span> · Desarrollador
            backend · Desarrollador fullstack en{' '}
            <span className="text-white font-medium">México</span>.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={() => scrollToSection('courses')}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-black transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                boxShadow: '0 0 20px #00f5ff40',
              }}
            >
              Ver proyectos
            </button>
            <a
              href={personalInfo.cvUrl}
              className="px-6 py-3 rounded-lg border border-cyan-400/40 text-cyan-400 text-sm font-semibold hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-200 hover:scale-105 active:scale-95"
              target="_blank"
              rel="noopener noreferrer"
            >
              Descargar CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex gap-5 pt-2"
          >
            {[
              { href: personalInfo.github, Icon: FiGithub, label: 'GitHub' },
              { href: personalInfo.linkedin, Icon: FiLinkedin, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.email}`, Icon: FiMail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-200 hover:scale-110 transform"
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Glow ring */}
            <div
              className="absolute inset-0 rounded-full animate-glow"
              style={{
                background:
                  'conic-gradient(from 0deg, #00f5ff, #7c3aed, #00f5ff)',
                padding: '3px',
                borderRadius: '50%',
              }}
            />
            <div
              className="relative rounded-full overflow-hidden border-2 border-transparent"
              style={{
                width: 280,
                height: 280,
                background: '#0a0a0a',
              }}
            >
              <Image
                src={personalInfo.profileImage}
                alt={`Foto de perfil de ${personalInfo.name}`}
                fill
                sizes="(max-width: 768px) 240px, 280px"
                className="object-cover rounded-full"
                priority
              />
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 bg-[#111] border border-cyan-400/30 rounded-xl px-3 py-2 text-xs font-mono text-cyan-400 shadow-lg"
              style={{ boxShadow: '0 0 20px #00f5ff20' }}
            >
              <span className="text-green-400">▶</span> IPN · ESCOM
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-gray-600 text-xs font-mono">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-0.5 h-6 bg-gradient-to-b from-cyan-400/60 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  )
}
