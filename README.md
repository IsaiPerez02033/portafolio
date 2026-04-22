# Isai Aram Pérez — Portfolio Personal

Página web personal construida con **Next.js 14**, **TypeScript**, **Tailwind CSS** y **Framer Motion**.

## Stack

- **Framework**: Next.js 14 con App Router
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Animaciones**: Framer Motion
- **Partículas**: tsParticles (red neuronal animada)
- **Iconos**: react-icons

## Requisitos

- Node.js 18+
- npm o yarn

## Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Build de producción
npm run build
npm start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # SEO metadata + JSON-LD
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos globales
│   ├── sitemap.ts          # XML Sitemap automático
│   └── robots.ts           # robots.txt
├── components/
│   ├── CustomCursor.tsx    # Cursor personalizado
│   ├── Navbar.tsx          # Navegación sticky
│   ├── ParticleBackground.tsx  # Fondo de partículas
│   ├── SectionTitle.tsx    # Título reutilizable
│   └── TypingEffect.tsx    # Efecto de escritura
├── sections/
│   ├── Hero.tsx            # Sección principal
│   ├── AboutMe.tsx         # Sobre mí
│   ├── Skills.tsx          # Habilidades
│   ├── Experience.tsx      # Experiencia (timeline)
│   ├── Courses.tsx         # Certificaciones
│   └── Contact.tsx         # Formulario de contacto
├── data/
│   └── portfolio.ts        # ← EDITA AQUÍ TUS DATOS
├── hooks/
│   └── useScrollAnimation.ts
└── lib/
    └── utils.ts
```

## Personalización

**Todo el contenido está centralizado en `src/data/portfolio.ts`.**

Para actualizar tus datos:
1. Abre `src/data/portfolio.ts`
2. Modifica los valores de `personalInfo`, `experience`, `courses`, etc.
3. El sitio se actualiza automáticamente

### Agregar tu CV
En `personalInfo.cvUrl` cambia `'#'` por la URL de tu CV (Google Drive, Dropbox, etc.).

### Cambiar la foto
Reemplaza `public/profile.jpg` con tu nueva foto de perfil.

### Formulario de contacto
El formulario está listo para conectar con [Formspree](https://formspree.io) o EmailJS.
En `sections/Contact.tsx` cambia el `handleSubmit` para enviar los datos reales.

## SEO

- ✅ Metadata optimizada (title, description, keywords)
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Cards
- ✅ JSON-LD Person Schema
- ✅ Sitemap XML automático
- ✅ robots.txt
- ✅ Canonical URL
- ✅ Imágenes optimizadas con next/image

## Deploy

Recomendado: **Vercel** (zero-config para Next.js)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```
