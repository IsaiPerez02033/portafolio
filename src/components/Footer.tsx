import { ArrowUpRight } from 'lucide-react'
import Button from '@/components/Button'
import { footerLinks, mailtoHref } from '@/data/portfolio'

const linkClass = 'text-base text-ink hover:opacity-70 transition-opacity'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <Button href={mailtoHref}>Hablemos</Button>

        <div className="flex items-start gap-6">
          <ArrowUpRight className="w-5 h-5 text-ink mt-0.5 shrink-0" aria-hidden />

          <nav className="flex gap-16" aria-label="Enlaces del pie">
            <ul className="flex flex-col gap-2">
              {footerLinks.internal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-2">
              {footerLinks.external.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {l.label}
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
