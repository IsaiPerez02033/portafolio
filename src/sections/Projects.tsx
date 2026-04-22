'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import LogoImage from '@/components/LogoImage'
import { projects } from '@/data/portfolio'
import { FiGithub } from 'react-icons/fi'

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Decorative line */}
      <div
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px hidden lg:block pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, #00f5ff20 20%, #7c3aed20 80%, transparent)',
        }}
      />

      <div className="max-w-5xl mx-auto px-6">
        <SectionTitle
          label="proyectos"
          title="Proyectos Destacados"
          subtitle="Soluciones reales construidas con IA generativa, fullstack web y machine learning"
        />

        <div className="mt-14 flex flex-col gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative rounded-2xl border border-white/10 bg-[#111] overflow-hidden"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${project.color}40`
                e.currentTarget.style.boxShadow = `0 0 40px ${project.color}10`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Colored top bar */}
              <div
                className="h-0.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, ${project.color}40)`,
                }}
              />

              <div className="p-6 sm:p-8">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {project.logoImage ? (
                      <LogoImage
                        src={project.logoImage}
                        alt={`Logo ${project.name}`}
                        size={44}
                        variant={project.logoVariant}
                        accentColor={project.color}
                      />
                    ) : (
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                        style={{ background: `${project.color}15`, border: `1px solid ${project.color}30` }}
                      >
                        {project.icon}
                      </div>
                    )}
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">
                        {project.name}
                      </h3>
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded mt-0.5 inline-block"
                        style={{
                          color: project.color,
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}25`,
                        }}
                      >
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-cyan-400 transition-colors"
                      aria-label="Ver código"
                    >
                      <FiGithub size={20} />
                    </a>
                  )}
                </div>

                {/* Award badge */}
                {project.highlight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border"
                    style={{
                      background: `${project.color}12`,
                      borderColor: `${project.color}40`,
                      color: project.color,
                    }}
                  >
                    {project.highlight}
                  </motion.div>
                )}

                {/* One-liner */}
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  {project.description}
                </p>

                {/* Bullets */}
                <ul className="flex flex-col gap-2.5 mb-6">
                  {project.bullets.map((bullet, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.06, duration: 0.3 }}
                      className="flex items-start gap-2.5 text-sm text-gray-400"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: project.color }}
                      />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: bullet
                            .replace(/IBM Watsonx/g, '<strong class="text-gray-200">IBM Watsonx</strong>')
                            .replace(/PostGIS/g, '<strong class="text-gray-200">PostGIS</strong>')
                            .replace(/API REST/g, '<strong class="text-gray-200">API REST</strong>')
                            .replace(/scikit-learn/g, '<strong class="text-gray-200">scikit-learn</strong>')
                            .replace(/XOLUM/g, '<strong class="text-gray-200">XOLUM</strong>')
                            .replace(/Fase 2/g, '<strong class="text-gray-200">Fase 2</strong>'),
                        }}
                      />
                    </motion.li>
                  ))}
                </ul>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full bg-[#1a1a1a] border border-white/10 text-xs text-gray-400 hover:border-white/20 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
