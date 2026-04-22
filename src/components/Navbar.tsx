'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrolled } from '@/hooks/useScrollAnimation'
import { scrollToSection } from '@/lib/utils'
import { personalInfo } from '@/data/portfolio'
import { HiMenuAlt3, HiX } from 'react-icons/hi'

const navLinks = [
  { label: 'Inicio',      id: 'hero' },
  { label: 'Sobre mí',    id: 'about' },
  { label: 'Skills',      id: 'skills' },
  { label: 'Proyectos',   id: 'projects' },
  { label: 'Logros',      id: 'achievements' },
  { label: 'Cursos',      id: 'courses' },
  { label: 'Contacto',    id: 'contact' },
]

export default function Navbar() {
  const scrolled = useScrolled(50)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (id: string) => {
    scrollToSection(id)
    setMobileOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="font-mono text-cyan-400 text-lg font-bold tracking-wider hover:text-cyan-300 transition-colors"
          style={{ textShadow: '0 0 20px #00f5ff80' }}
        >
          &lt;Aram Perez /&gt;
        </button>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CV button */}
        <a
          href={personalInfo.cvUrl}
          className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded border border-cyan-400/50 text-cyan-400 text-sm font-mono hover:bg-cyan-400/10 transition-colors duration-200"
          style={{ boxShadow: '0 0 12px #00f5ff20' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          CV
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-gray-400 hover:text-cyan-400 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
          >
            <ul className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNav(link.id)}
                    className="w-full text-left text-gray-300 hover:text-cyan-400 py-2 border-b border-white/5 transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={personalInfo.cvUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded border border-cyan-400/50 text-cyan-400 text-sm font-mono hover:bg-cyan-400/10 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
