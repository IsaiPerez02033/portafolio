import Button from '@/components/Button'
import { mailtoHref } from '@/data/portfolio'

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
      aria-label="Acciones rápidas"
    >
      <div className="flex items-center gap-5 rounded-full bg-white px-8 py-2 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_10px_0_rgba(5,26,36,0.08),0_12px_30px_0_rgba(5,26,36,0.08),inset_0_1px_0_0_rgba(255,255,255,0.9)]">
        <a
          href="#inicio"
          className="font-serif text-2xl font-semibold text-ink leading-none"
          aria-label="Ir al inicio"
        >
          I
        </a>
        <Button href={mailtoHref}>Hablemos</Button>
      </div>
    </nav>
  )
}
