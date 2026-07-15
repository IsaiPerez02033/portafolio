<div align="center">

# Isai Aram Pérez — Portfolio Personal

**AI Engineer & Backend Developer · IPN ESCOM · Ciudad de México**

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Live Demo](https://img.shields.io/badge/🌐_Ver_sitio_en_vivo-051A24?style=for-the-badge)](https://portafolio-chi-tawny-37.vercel.app/)

</div>

---

## ✨ Vista general

Portfolio editorial sobre fondo blanco, con tipografía de gran escala, marquee infinito de
capturas reales y micro-interacciones. Arquitectura **data-driven**: todo el contenido vive
en un solo archivo TypeScript, sin tocar JSX para actualizar datos.

**Secciones:**

- **Hero** — Columna angosta con presentación y CTA
- **Marquee** — Tira infinita con capturas reales de proyectos
- **Cita** — Frase de marca + formación, con foto en parallax
- **Cómo trabajo** — Dos modalidades: freelance y colaboración
- **Logros** — Carrusel auto-scroll con premios y certificaciones
- **Proyectos** — Los tres destacados, con captura a ancho completo
- **Más trabajo** — El resto del portafolio, en formato compacto
- **Lo que uso** — Stack agrupado por categoría
- **Partner** — CTA con rastro de miniaturas siguiendo el cursor

---

## 🏆 Destacado

> 🥈 **2º Lugar — Talent Land 2026** · Track IBM Ciudades Resilientes
> Proyecto **SUSVI** — Senderos Urbanos Seguros, Verdes e Inteligentes.
> IA generativa (IBM Watsonx Granite) que convierte datos urbanos en planes de intervención.
> [Demo en vivo](https://isaiperez02033.github.io/xolum/)

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | CSS keyframes + IntersectionObserver |
| Iconos | lucide-react |
| Tipografías | Geist + Instrument Serif |
| Deploy | Vercel |
| SEO | Next.js Metadata API + JSON-LD + OG dinámica |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx             # Metadata SEO + JSON-LD + fuentes
│   ├── page.tsx               # Composición de secciones
│   ├── globals.css            # Base, fuentes y animaciones
│   ├── icon.svg               # Favicon
│   ├── opengraph-image.tsx    # Imagen 1200x630 generada en runtime
│   ├── sitemap.ts             # XML Sitemap automático
│   └── robots.ts              # robots.txt
├── components/
│   ├── Hero.tsx               # Columna de presentación
│   ├── Marquee.tsx            # Tira infinita de capturas
│   ├── QuoteSection.tsx       # Cita + formación + foto en parallax
│   ├── ServicesSection.tsx    # Tarjetas de "cómo trabajo"
│   ├── AchievementsCarousel.tsx  # Carrusel infinito de logros
│   ├── ProjectsSection.tsx    # Proyectos destacados
│   ├── OtherProjects.tsx      # Resto del portafolio
│   ├── Skills.tsx             # Stack por categoría
│   ├── PartnerSection.tsx     # CTA con rastro de cursor
│   ├── Footer.tsx             # Enlaces
│   ├── CopyrightBar.tsx       # Línea final
│   ├── BottomNav.tsx          # Píldora flotante
│   └── Button.tsx             # 4 variantes reutilizables
├── data/
│   └── portfolio.ts           # ← Fuente única de verdad (edita aquí)
└── hooks/
    └── useInViewAnimation.ts  # Scroll-trigger con IntersectionObserver
```

---

## 🚀 Instalación y desarrollo local

```bash
git clone https://github.com/IsaiPerez02033/portafolio.git
cd portafolio
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start
```

**Requisitos:** Node.js 18+

---

## ✏️ Personalización

Todo el contenido está centralizado en **`src/data/portfolio.ts`**.

```ts
export const personalInfo = {
  name: 'Tu Nombre',
  title: 'Tu título profesional',
  email: 'tu@email.com',
  // ...
}
```

Para cambiar proyectos, logros o skills, edita los arreglos `featuredProjects`,
`otherProjects`, `achievements` y `skillGroups` en ese mismo archivo.

**Capturas de proyectos:** van en `public/projects/` en `.webp`, referenciadas desde
`marqueeImages` y `featuredProjects`.

---

## 🔤 Tipografías

El diseño se concibió con **PP Neue Montreal** y **PP Mondwest** (Pangram Pangram, de pago).
No están incluidas: son comerciales y el CDN público que las servía responde 403.

En su lugar se usan dos equivalentes libres — **Geist** (auto-hospedada) e **Instrument
Serif**. Si compras la licencia, deja los `.woff2` en `public/` y descomenta el bloque
`@font-face` de `globals.css`: las pilas de `tailwind.config.ts` ya listan las PP primero,
así que toman prioridad automáticamente.

---

## 🔍 SEO

- ✅ Metadata optimizada (title, description, keywords)
- ✅ Open Graph con imagen 1200×630 generada en runtime
- ✅ Twitter Cards
- ✅ JSON-LD Person Schema
- ✅ Sitemap XML automático (`/sitemap.xml`)
- ✅ robots.txt (`/robots.txt`)
- ✅ Canonical URL
- ✅ Imágenes optimizadas con `next/image`

> El canonical vive en `seoData.canonicalUrl` (`src/data/portfolio.ts`) y apunta al
> despliegue de Vercel. Si registras un dominio propio, cámbialo ahí: alimenta el canonical,
> el sitemap, el robots.txt y la metadata de Open Graph.

---

## 📬 Contacto

Los botones "Hablemos" abren el cliente de correo vía `mailto:`, construido en
`mailtoHref` (`src/data/portfolio.ts`).

---

## 📄 Licencia

Este proyecto es de uso personal. Si lo usas como base para tu propio portfolio, se agradece
un crédito o estrella ⭐ al repositorio.

---

<div align="center">
  <sub>Hecho con ☕ y TypeScript</sub>
</div>
