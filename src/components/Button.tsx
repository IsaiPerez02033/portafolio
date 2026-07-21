'use client'

import { clsx } from 'clsx'
import type { ReactNode } from 'react'
import { useContactClick } from '@/hooks/useContactClick'

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

interface ButtonProps {
  children: ReactNode
  href: string
  variant?: Variant
  external?: boolean
  className?: string
}

// Invertidos: sobre el fondo oscuro el botón sólido va en claro, y los
// secundarios son vidrio para que la lluvia se siga viendo por detrás.
const variants: Record<Variant, string> = {
  primary: 'bg-paper-1 text-ink shadow-primary hover:shadow-glow',
  secondary:
    'bg-paper-1/10 text-paper-1 border border-paper-1/25 backdrop-blur-sm hover:bg-paper-1/20',
  tertiary: 'bg-ink-2/70 text-paper-1 border border-paper-1/15 backdrop-blur-sm hover:border-pulse/50',
  ghost: 'bg-transparent text-paper-2 border border-paper-1/20 hover:border-paper-1/40',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  external = false,
  className,
}: ButtonProps) {
  const onContactClick = useContactClick()

  return (
    <a
      href={href}
      {...(href.startsWith('mailto:') ? { onClick: onContactClick } : {})}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3',
        'text-sm font-medium whitespace-nowrap',
        'transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pulse',
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  )
}
