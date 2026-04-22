'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { skillGroups } from '@/data/portfolio'
import { SKILL_ICONS } from '@/lib/skillIcons'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 bg-[#0d0d0d] relative overflow-hidden"
    >
      <div
        className="absolute right-0 top-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00f5ff07 0%, transparent 70%)' }}
      />
      <div
        className="absolute left-0 bottom-0 w-72 h-72 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7c3aed07 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="habilidades"
          title="Stack Técnico"
          subtitle="Lenguajes, frameworks, bases de datos y herramientas de mi día a día"
        />

        {/* Grid de 6 categorías */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: gi * 0.07 }}
              className="group rounded-2xl border border-white/10 bg-[#111] p-5 cursor-default transition-all duration-300"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${group.color}40`
                e.currentTarget.style.boxShadow = `0 0 25px ${group.color}12`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Emoji de categoría + título */}
              <div className="flex flex-col gap-2 mb-4">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${group.color}15` }}
                >
                  {group.icon}
                </div>
                <h3
                  className="text-xs font-semibold tracking-wide uppercase"
                  style={{ color: group.color }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Lista de skills con iconos */}
              <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-2.5"
              >
                {group.skills.map((skill) => {
                  const entry = SKILL_ICONS[skill]
                  return (
                    <motion.li
                      key={skill}
                      variants={item}
                      className="flex items-center gap-2 group/skill"
                    >
                      {entry ? (
                        /* Icono real */
                        <span
                          className="flex-shrink-0 transition-transform duration-200 group-hover/skill:scale-110"
                          style={{ color: entry.color, lineHeight: 1 }}
                        >
                          <entry.Icon size={14} />
                        </span>
                      ) : (
                        /* Fallback: punto de color de categoría */
                        <span
                          className="w-1 h-1 rounded-full flex-shrink-0"
                          style={{ background: group.color }}
                        />
                      )}
                      <span className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors leading-tight">
                        {skill}
                      </span>
                    </motion.li>
                  )
                })}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {/* Tag cloud con iconos inline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2.5"
        >
          {[
            'IBM Watsonx', 'PostGIS', 'scikit-learn', 'APIs REST',
            'Git', 'Google Cloud', 'Figma', 'PostgreSQL', 'GeoJSON',
          ].map((tech) => {
            const entry = SKILL_ICONS[tech]
            return (
              <span
                key={tech}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111] border border-white/10 text-sm text-gray-400 hover:border-cyan-400/30 hover:text-cyan-400 transition-colors cursor-default"
              >
                {entry && (
                  <entry.Icon
                    size={13}
                    style={{ color: entry.color, flexShrink: 0 }}
                  />
                )}
                {tech}
              </span>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
