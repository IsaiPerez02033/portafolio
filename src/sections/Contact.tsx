'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/SectionTitle'
import { personalInfo } from '@/data/portfolio'
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'

interface FormState {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Demo: simulate send — wire to Formspree/EmailJS for production
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
  }

  const inputClass =
    'w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 transition-all duration-200'

  return (
    <section
      id="contact"
      className="py-24 bg-[#0a0a0a] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 100%, #00f5ff06 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          label="contacto"
          title="¿Hablamos?"
          subtitle="Estoy abierto a colaboraciones, proyectos y oportunidades"
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-12">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-gray-400 leading-relaxed">
                Si tienes un proyecto en mente, una oportunidad interesante o simplemente
                quieres conectar — escríbeme. Respondo lo antes posible.
              </p>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-4">
              {[
                { icon: FiMail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { icon: FiPhone, label: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                { icon: FiMapPin, label: personalInfo.location, href: undefined },
              ].map(({ icon: Icon, label, href }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111] border border-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Icon size={16} />
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">{label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex gap-4">
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
                  className="w-11 h-11 rounded-xl bg-[#111] border border-white/10 flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-200 hover:scale-110 transform"
                  style={
                    {
                      /* individual hover shadow handled inline */
                    }
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px #00f5ff25'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-[#111] p-6 sm:p-8 flex flex-col gap-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-mono">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-2 font-mono">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-500 mb-2 font-mono">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Cuéntame sobre tu proyecto o propuesta..."
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full py-3 rounded-xl text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                  boxShadow: '0 0 20px #00f5ff30',
                }}
              >
                {status === 'sending'
                  ? 'Enviando...'
                  : status === 'sent'
                  ? '✓ ¡Mensaje enviado!'
                  : 'Enviar mensaje'}
              </button>

              {status === 'sent' && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-sm text-cyan-400"
                >
                  Gracias por escribir. Te responderé pronto 🚀
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
