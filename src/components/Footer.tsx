import { ArrowUpRight } from 'lucide-react'
import SocialIcon from '@/components/SocialIcons'
import { footerLinks, socials, personalInfo } from '@/data/portfolio'

const linkClass = 'text-base text-paper-1 hover:opacity-70 transition-opacity'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-5 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-start gap-4 sm:gap-6">
          <ArrowUpRight className="w-5 h-5 text-paper-1 mt-0.5 shrink-0" aria-hidden />

          <nav className="flex flex-col gap-8" aria-label="Enlaces del pie">
            <ul className="flex flex-col gap-2">
              {footerLinks.internal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={personalInfo.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Ver CV
                </a>
              </li>
            </ul>

            <ul className="flex items-center gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={[
                      'group relative flex items-center justify-center w-11 h-11 rounded-full',
                      'border border-paper-1/15 text-paper-2/60',
                      'transition-all duration-200 ease-out',
                      'hover:bg-paper-1 hover:border-paper-1 hover:text-ink',
                      'hover:-translate-y-0.5 hover:shadow-glow motion-reduce:transform-none',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pulse focus-visible:ring-offset-2 focus-visible:ring-offset-ink',
                    ].join(' ')}
                  >
                    <SocialIcon icon={s.icon} className="w-[18px] h-[18px]" />
                    {/* Etiqueta al pasar el cursor; oculta al lector de pantalla
                        porque el aria-label del enlace ya la dice */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] text-paper-2/65 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    >
                      {s.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
