'use client'

import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import { SiSamsung, SiGooglecloud } from 'react-icons/si'
import { TbDatabase } from 'react-icons/tb'
import SectionTitle from '@/components/SectionTitle'
import { courses } from '@/data/portfolio'

// ──────────────────────────────────────────────────────────────────────────────
// PERSONALIZA AQUÍ: cambia el icono o color de cada empresa emisora.
// Busca más iconos en https://react-icons.github.io/react-icons
// ──────────────────────────────────────────────────────────────────────────────
interface IssuerIcon {
  Icon: IconType
  color: string   // color de la marca (o el que prefieras)
  size?: number
}

const ISSUER_ICONS: Record<string, IssuerIcon> = {
  'Samsung':      { Icon: SiSamsung,      color: '#1428A0', size: 28 },
  'Oracle':       { Icon: TbDatabase,     color: '#C74634', size: 28 },   // SiOracle no existe en react-icons
  'Google Cloud': { Icon: SiGooglecloud,  color: '#4285F4', size: 26 },
}

export default function Courses() {
  return (
    <section
      id="courses"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div
        className="absolute right-0 bottom-0 w-80 h-80 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed08 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="certificaciones"
          title="Cursos & Certificados"
          subtitle="Formación complementaria en IA, Backend, Cloud y Ciberseguridad · 2024"
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course, i) => {
            const issuer = ISSUER_ICONS[course.issuer]

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative rounded-2xl border border-white/10 bg-[#111] p-6 overflow-hidden cursor-default hover:border-white/20 transition-all duration-300 flex flex-col"
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
                  style={{
                    background: `linear-gradient(90deg, ${course.gradientFrom}, ${course.gradientTo})`,
                  }}
                />

                {/* Hover background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${course.gradientFrom}10, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col flex-1">
                  {/* Logo de la empresa emisora */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: issuer
                        ? `${issuer.color}18`
                        : `linear-gradient(135deg, ${course.gradientFrom}20, ${course.gradientTo}20)`,
                      border: issuer
                        ? `1px solid ${issuer.color}35`
                        : `1px solid ${course.gradientFrom}30`,
                    }}
                  >
                    {issuer ? (
                      <issuer.Icon
                        size={issuer.size ?? 26}
                        style={{ color: issuer.color }}
                      />
                    ) : (
                      /* Fallback emoji si el emisor no tiene icono en el mapa */
                      <span className="text-2xl">{course.icon}</span>
                    )}
                  </div>

                  {/* Category + year */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="font-mono text-xs px-2.5 py-0.5 rounded-full"
                      style={{
                        color: course.gradientFrom,
                        background: `${course.gradientFrom}15`,
                        border: `1px solid ${course.gradientFrom}30`,
                      }}
                    >
                      {course.category}
                    </span>
                    <span className="font-mono text-xs text-gray-600">{course.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-sm font-semibold leading-snug mb-3">
                    {course.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-xs leading-relaxed flex-1">
                    {course.description}
                  </p>

                  {/* Issuer con icono inline */}
                  <div
                    className="flex items-center gap-1.5 mt-4 pt-3 border-t border-white/5"
                    style={{ color: `${course.gradientFrom}cc` }}
                  >
                    {issuer && (
                      <issuer.Icon size={12} style={{ color: issuer.color, flexShrink: 0 }} />
                    )}
                    <p className="text-xs font-semibold">{course.issuer}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
