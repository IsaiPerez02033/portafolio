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

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white shadow-primary',
  secondary: 'bg-white text-ink shadow-secondary',
  tertiary: 'bg-white text-ink shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.08)]',
  // sobre la tarjeta oscura, donde un botón #051A24 se perdería contra el fondo
  ghost: 'bg-transparent text-paper-2 border border-white/20 hover:border-white/40',
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
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink',
        variants[variant],
        className
      )}
    >
      {children}
    </a>
  )
}
