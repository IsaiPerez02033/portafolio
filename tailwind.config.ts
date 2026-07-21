import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // useInViewAnimation devuelve 'opacity-0'; sin este glob Tailwind no genera
    // esa clase y el fade-in deja de ocultar nada antes de entrar al viewport
    './src/hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // El fondo lo pinta el shader; `ink` es su color base, replicado en CSS
        // para el arranque y para cuando no hay WebGL.
        ink: '#051A24',
        'ink-2': '#0D212C', // superficies elevadas (tarjetas)
        'paper-1': '#F6FCFF', // texto principal
        'paper-2': '#E0EBF0', // texto secundario
        muted: '#7E97A3', // texto terciario, legible sobre ink (AA a 14px)
        // Los dos colores de la lluvia del shader, ya como acentos de marca
        beam: '#1A4DE6',
        pulse: '#1ACC80',
      },
      fontFamily: {
        // Las PP van primero: si algún día existen sus @font-face, ganan solas
        sans: ['PP Neue Montreal', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['PP Mondwest', 'var(--font-serif)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      // Sobre fondo oscuro una sombra negra no se ve: la profundidad la dan un
      // filo claro por dentro y un halo negro amplio por fuera.
      boxShadow: {
        primary:
          '0 1px 2px 0 rgba(0,0,0,0.5), 0 8px 24px 0 rgba(0,0,0,0.45), inset 0 1px 0 0 rgba(255,255,255,0.6)',
        secondary:
          '0 0 0 0.5px rgba(246,252,255,0.12), 0 8px 40px rgba(0,0,0,0.5)',
        card: '0 0 0 0.5px rgba(246,252,255,0.10), 0 12px 32px rgba(0,0,0,0.45)',
        glow: '0 0 0 0.5px rgba(26,204,128,0.35), 0 0 28px -6px rgba(26,204,128,0.35)',
      },
      // `animate-marquee` y sus keyframes viven sólo en globals.css: ahí la
      // duración cambia con el breakpoint. Definirlos también aquí creaba una
      // clase duplicada, con un desplazamiento distinto al real.
    },
  },
  plugins: [],
}

export default config
