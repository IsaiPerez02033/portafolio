'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import LogoImage from '@/components/LogoImage'
import { aboutParagraphs, education, softSkills } from '@/data/portfolio'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12 },
  }),
}

export default function AboutMe() {
  return (
    <section
      id="about"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #7c3aed12 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="sobre mí"
          title="¿Quién soy?"
          subtitle="Un poco de contexto sobre mi historia y lo que me apasiona"
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12 items-start">
          {/* Text */}
          <div className="flex flex-col gap-5">
            {aboutParagraphs.map((para, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-40px' }}
                className="text-gray-400 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: para
                    .replace('URBANIA', '<strong class="text-white">URBANIA</strong>')
                    .replace('XOLUM', '<strong class="text-white">XOLUM</strong>')
                    .replace('IBM Watsonx', '<strong class="text-cyan-400">IBM Watsonx</strong>')
                    .replace('PostGIS', '<strong class="text-cyan-400">PostGIS</strong>')
                    .replace('2do lugar en Talent Land 2026', '<strong class="text-cyan-400">2do lugar en Talent Land 2026</strong>')
                    .replace('IPN ESCOM', '<strong class="text-white">IPN ESCOM</strong>'),
                }}
              />
            ))}

            {/* Soft skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-4 flex flex-wrap gap-2.5"
            >
              {softSkills.map((s) => (
                <span
                  key={s.label}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111] border border-white/10 text-sm text-gray-300 hover:border-cyan-400/40 transition-colors"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Education + Stats */}
          <div className="flex flex-col gap-6">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-mono text-sm text-cyan-400 tracking-widest uppercase"
            >
              {'// educación'}
            </motion.h3>

            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl border border-white/10 bg-[#111] p-6 hover:border-cyan-400/30 transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 30px #00f5ff10'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div className="flex items-start gap-4">
                  {edu.logoImage ? (
                    <LogoImage
                      src={edu.logoImage}
                      alt={`Logo ${edu.institution}`}
                      size={44}
                      variant={edu.logoVariant}
                      accentColor="#00f5ff"
                    />
                  ) : (
                    <span className="text-3xl flex-shrink-0">{edu.logoEmoji}</span>
                  )}
                  <div>
                    <p className="text-white font-semibold leading-snug">
                      {edu.institution}
                    </p>
                    <p className="text-cyan-400 text-sm mt-1">{edu.degree}</p>
                    <p className="text-gray-500 text-xs mt-1">{edu.location}</p>
                    <span className="inline-block mt-3 font-mono text-xs text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded border border-violet-500/20">
                      {edu.period}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: '🥈', label: 'Talent Land 2026' },
                { value: '4', label: 'certificaciones' },
                { value: '3', label: 'proyectos reales' },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center rounded-xl bg-[#111] border border-white/10 py-5 hover:border-cyan-400/30 transition-colors cursor-default"
                >
                  <span
                    className="text-2xl font-bold text-transparent bg-clip-text"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-gray-500 text-xs mt-1 text-center px-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
