<div align="center">

# Isai Aram Pérez — Portfolio Personal

**AI Engineer & Backend Developer · IPN ESCOM · Ciudad de México**

[![Next.js](https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Deployed_on_Vercel-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

[![Live Demo](https://img.shields.io/badge/🌐_Ver_sitio_en_vivo-00f5ff?style=for-the-badge)](https://isaiaram.dev)

</div>

---

## ✨ Vista general

Portfolio profesional con diseño **dark cyberpunk**, optimizado para SEO y con animaciones fluidas. Construido con arquitectura **data-driven**: todo el contenido vive en un solo archivo TypeScript, sin tocar JSX para actualizar datos.

**Secciones incluidas:**

- **Hero** — Presentación con efecto de escritura animado y fondo de red neuronal (tsParticles)
- **Sobre mí** — Perfil, educación y highlights
- **Skills** — 6 categorías con íconos tecnológicos reales (react-icons)
- **Proyectos** — Cards expandibles con logos, insignias de premios y tags
- **Logros** — Reconocimientos y hackathons
- **Cursos** — Certificaciones con logos de emisores (Samsung, Oracle, Google Cloud)
- **Contacto** — Formulario funcional integrado con Formspree

---

## 🏆 Destacado

> 🥈 **2do Lugar — Talent Land 2026** · Track IBM Ciudades Inteligentes  
> Proyecto **URBANIA** — Plataforma SaaS B2B de inteligencia urbana con IA generativa (IBM Watsonx + PostGIS)

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 14 (App Router) |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS |
| Animaciones | Framer Motion |
| Partículas | tsParticles (red neuronal animada) |
| Iconos | react-icons (Simple Icons, Feather, Tabler) |
| Formulario | Formspree |
| Deploy | Vercel |
| SEO | Next.js Metadata API + JSON-LD |

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Metadata SEO + JSON-LD Person Schema
│   ├── page.tsx            # Composición de secciones
│   ├── globals.css         # Estilos globales + cursor personalizado
│   ├── sitemap.ts          # XML Sitemap automático
│   └── robots.ts           # robots.txt
├── components/
│   ├── CustomCursor.tsx    # Cursor dot + ring con efecto lerp
│   ├── LogoImage.tsx       # Logos con soporte de variantes (invert/light-bg)
│   ├── Navbar.tsx          # Navegación sticky con menú responsive
│   ├── ParticleBackground.tsx  # Fondo de red neuronal animada
│   ├── SectionTitle.tsx    # Encabezado reutilizable por sección
│   └── TypingEffect.tsx    # Efecto de escritura cíclico
├── sections/
│   ├── Hero.tsx            # Sección principal (CTA + animaciones)
│   ├── AboutMe.tsx         # Perfil, educación y estadísticas
│   ├── Skills.tsx          # Grid de habilidades con íconos
│   ├── Projects.tsx        # Proyectos con logos y badges
│   ├── Achievements.tsx    # Logros y reconocimientos
│   ├── Courses.tsx         # Certificaciones con logos de emisores
│   └── Contact.tsx         # Formulario funcional (Formspree)
├── data/
│   └── portfolio.ts        # ← Fuente única de verdad (edita aquí)
├── lib/
│   ├── skillIcons.tsx      # Mapa skill → ícono + color
│   └── utils.ts            # scrollToSection y helpers
└── hooks/
    └── useScrollAnimation.ts
```

---

## 🚀 Instalación y desarrollo local

```bash
# 1. Clonar el repositorio
git clone https://github.com/IsaiPerez02033/portafolio.git
cd portafolio

# 2. Instalar dependencias
npm install

# 3. Ejecutar en modo desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

```bash
# Build de producción
npm run build
npm start
```

**Requisitos:** Node.js 18+

---

## ✏️ Personalización

Todo el contenido está centralizado en **`src/data/portfolio.ts`** — edita ese archivo para actualizar cualquier dato sin tocar JSX.

```ts
// src/data/portfolio.ts
export const personalInfo = {
  name: 'Tu Nombre',
  title: 'Tu título profesional',
  email: 'tu@email.com',
  cvUrl: 'https://...',
  // ...
}
```

Para agregar proyectos, cursos o logros, modifica los arreglos `projects`, `courses` y `achievements` en el mismo archivo.

**Logos de proyectos/educación:** coloca las imágenes en `public/logos/` y referencia la ruta en `portfolio.ts` con `logoImage: '/logos/archivo.png'`.

---

## 🔍 SEO

- ✅ Metadata optimizada (title, description, keywords)
- ✅ Open Graph (LinkedIn, Facebook)
- ✅ Twitter Cards
- ✅ JSON-LD Person Schema
- ✅ Sitemap XML automático (`/sitemap.xml`)
- ✅ robots.txt (`/robots.txt`)
- ✅ Canonical URL
- ✅ Imágenes optimizadas con `next/image`

---

## 📬 Formulario de contacto

El formulario está conectado a [Formspree](https://formspree.io). Para usar tu propio endpoint, cambia la URL en `src/sections/Contact.tsx`:

```ts
const res = await fetch('https://formspree.io/f/TU_ID', { ... })
```

---

## 📄 Licencia

Este proyecto es de uso personal. Si lo usas como base para tu propio portfolio, se agradece un crédito o estrella ⭐ al repositorio.

---

<div align="center">
  <sub>Hecho con ☕ y TypeScript · <a href="https://isaiaram.dev">isaiaram.dev</a></sub>
</div>
