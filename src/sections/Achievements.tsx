'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { achievements } from '@/data/portfolio'

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-24 bg-[#0d0d0d] relative overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, #00f5ff08 0%, transparent 100%)',
        }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <SectionTitle
          label="logros"
          title="Logros y Reconocimientos"
          subtitle="Resultados obtenidos en competencias y hackathons a nivel nacional"
        />

        <div className="mt-14 flex flex-col gap-8">
          {achievements.map((achievement, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55 }}
              className="relative rounded-2xl border bg-[#111] overflow-hidden"
              style={{ borderColor: `${achievement.color}30` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 50px ${achievement.color}12`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Glowing left border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-0.5"
                style={{
                  background: `linear-gradient(to bottom, transparent, ${achievement.color}, transparent)`,
                }}
              />

              <div className="p-6 sm:p-8">
                {/* Top row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                  <div className="flex items-center gap-4">
                    {/* Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, delay: 0.15 }}
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}08)`,
                        border: `1px solid ${achievement.color}40`,
                        boxShadow: `0 0 20px ${achievement.color}20`,
                      }}
                    >
                      {achievement.badge}
                    </motion.div>

                    <div>
                      <h3 className="text-white font-bold text-xl leading-tight">
                        {achievement.title}
                      </h3>
                      <p style={{ color: achievement.color }} className="text-sm font-medium mt-0.5">
                        {achievement.organization}
                      </p>
                    </div>
                  </div>

                  {/* Date */}
                  <span
                    className="font-mono text-xs px-3 py-1.5 rounded-full border"
                    style={{
                      color: achievement.color,
                      background: `${achievement.color}10`,
                      borderColor: `${achievement.color}30`,
                    }}
                  >
                    {achievement.date}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-3">
                  {achievement.bullets.map((bullet, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + j * 0.1, duration: 0.4 }}
                      className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed"
                    >
                      <span
                        className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: achievement.color }}
                      />
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
