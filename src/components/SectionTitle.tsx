'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  label: string        // small tag above
  title: string        // main heading
  subtitle?: string    // optional sub-line
  align?: 'left' | 'center'
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = 'center',
}: SectionTitleProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <motion.div
      className={`flex flex-col gap-3 ${alignment}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <span className="font-mono text-cyan-400 text-sm tracking-widest uppercase">
        {`// ${label}`}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 max-w-xl">{subtitle}</p>
      )}
      <div
        className={`flex gap-2 mt-1 ${align === 'center' ? 'justify-center' : ''}`}
      >
        <div className="h-0.5 w-12 bg-cyan-400 rounded-full" />
        <div className="h-0.5 w-4 bg-violet-500 rounded-full" />
      </div>
    </motion.div>
  )
}
