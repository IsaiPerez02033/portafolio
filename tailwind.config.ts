import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#051A24', // primario oscuro
        'ink-2': '#0D212C', // secundario oscuro
        'paper-1': '#F6FCFF', // texto claro sobre oscuro
        'paper-2': '#E0EBF0',
        muted: '#273C46',
      },
      fontFamily: {
        // Las PP van primero: si algún día existen sus @font-face, ganan solas
        sans: ['PP Neue Montreal', 'var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        serif: ['PP Mondwest', 'var(--font-serif)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        primary:
          '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)',
        secondary: '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)',
        card: '0 4px 16px rgba(0,0,0,0.08)',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
