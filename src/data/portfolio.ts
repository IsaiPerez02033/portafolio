// ============================================================
// portfolio.ts — Fuente única de verdad para todo el contenido
// Edita este archivo para personalizar la página sin tocar JSX
// ============================================================

export const personalInfo = {
  name: 'Isai Aram Pérez Flores',
  firstName: 'Isai Aram',
  lastName: 'Pérez Flores',
  title: 'AI Engineer & Backend Developer',
  location: 'Ciudad de México, México',
  email: 'isaipz0510@gmail.com',
  phone: '+52 56 4591 5734',
  linkedin: 'https://linkedin.com/in/isai-aram-perez-604b67298',
  github: 'https://github.com/IsaiPerez02033',
  profileImage: '/profile.jpg',
  cvUrl: 'https://drive.google.com/file/d/1nB3MoChfnI781m3fiLysxFMiumb_o9WQ/view?usp=sharing',
} as const

export const typingTexts: string[] = [
  'AI Engineer',
  'Backend Developer',
  'ML Developer',
]

export const aboutParagraphs: string[] = [
  'Soy estudiante de Ingeniería en Inteligencia Artificial en la ESCOM del Instituto Politécnico Nacional (IPN), Ciudad de México. Me especializo en construir soluciones de software inteligentes que integran IA generativa, bases de datos geoespaciales y desarrollo web fullstack.',
  'Creo en aprender haciendo, en la colaboración y en que la tecnología puede resolver problemas reales a escala.',
]

export type LogoVariant = 'invert' | 'light-bg' | 'default'

export interface Education {
  institution: string
  degree: string
  period: string
  location: string
  logoEmoji: string
  logoImage?: string
  logoVariant?: LogoVariant  // 'invert'=logo negro→blanco | 'light-bg'=fondo blanco | 'default'
  highlight: string
}

export const education: Education[] = [
  {
    institution: 'ESCOM – Instituto Politécnico Nacional (IPN)',
    degree: 'Ingeniería en Inteligencia Artificial',
    period: '2023 – Presente',
    location: 'Ciudad de México, México',
    logoEmoji: '🎓',
    logoImage: '/logos/escom.jpg',
    logoVariant: 'light-bg',
    highlight: 'Escuela Superior de Cómputo · IPN',
  },
]

// ─── Proyectos ────────────────────────────────────────────────────────────────
export interface Project {
  name: string
  period: string
  highlight?: string
  description: string
  bullets: string[]
  tags: string[]
  icon: string
  logoImage?: string
  logoVariant?: LogoVariant
  githubUrl?: string
  color: string
}

export const projects: Project[] = [
  {
    name: 'ICEMEX',
    period: '2026',
    highlight: '🌐 Sitio corporativo en producción — icemex.mx',
    description:
      'Sitio corporativo y plataforma comercial para ICEMEX S.A. de C.V., fabricante con +20 años en iluminación pública, postería y material eléctrico en México.',
    bullets: [
      'Desarrollé como freelance el sitio corporativo completo (Next.js 15 + React 19 + TypeScript) desplegado en producción en icemex.mx.',
      'Construí un Hero 3D interactivo con React Three Fiber, drei y postprocessing (bloom), animado de forma scrubeable con GSAP ScrollTrigger.',
      'Integré "ICEMEXbot", un asistente conversacional con IA (Vercel AI SDK + Groq) con tool calling sobre un catálogo de 38 productos y 9 proyectos reales de la empresa.',
      'Implementé catálogo dinámico, páginas de servicios, nosotros y proyectos, showcase de marcas (Philips, Schneider, IUSA, Tecnolite…), formulario lead-magnet e integración con WhatsApp.',
      'SEO técnico completo: metadata, Open Graph, sitemap y robots automáticos, verificación de Google y soporte de modo claro/oscuro con variables CSS.',
    ],
    tags: ['Next.js 15', 'React 19', 'TypeScript', 'React Three Fiber', 'GSAP', 'Tailwind CSS', 'Vercel AI SDK', 'Groq'],
    icon: '⚡',
    logoImage: '/logos/icemex.png',
    logoVariant: 'default',
    color: '#fb923c',
  },
  {
    name: 'URBANIA',
    period: '2026',
    highlight: '🥈 2do Lugar — Talent Land 2026, Track IBM Ciudades Inteligentes',
    description:
      'Plataforma SaaS B2B de inteligencia urbana para decisiones de inversión en infraestructura.',
    bullets: [
      'Plataforma SaaS B2B desarrollada bajo la empresa XOLUM en equipo de 4 ingenieros del IPN.',
      'Diseñé e integré 3 agentes de IA generativa con IBM Watsonx que calculan scores de demanda, riesgo operativo y viabilidad financiera sobre zonas urbanas.',
      'Construí una base de datos geoespacial propietaria (PostGIS + GeoJSON) con inventario verificado de luminarias, cámaras, terrenos y telecomunicaciones.',
      'Implementé pipeline de validación automática en Python y API REST con autenticación por API key para exposición de datos a clientes externos.',
      'Proyecto seleccionado en Fase 2 del hackathon; track "Ciudades Resilientes: IA Generativa para Ciudades Inteligentes y Sostenibles".',
    ],
    tags: ['Python', 'JavaScript', 'IBM Watsonx', 'PostGIS', 'APIs REST', 'GeoJSON'],
    icon: '🏙️',
    logoImage: '/logos/urbania.png',
    logoVariant: 'light-bg',
    color: '#00f5ff',
  },
  {
    name: 'Kinara',
    period: '2024 – Presente',
    description:
      'Tienda de e-commerce completa para una marca de luminarias diseñadas e impresas en 3D.',
    bullets: [
      'Desarrollé de manera independiente una tienda de e-commerce completa para una marca de luminarias diseñadas e impresas en 3D.',
      'Implementé sistema de pagos en línea, catálogo de productos dinámico y diseño responsivo adaptado a la identidad de marca (branding propio).',
      'Gestioné el proyecto de inicio a fin: diseño de producto físico (impresión 3D), identidad visual y desarrollo web fullstack.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'E-commerce', 'Fullstack'],
    icon: '💡',
    logoImage: '/logos/kinara.png',
    logoVariant: 'invert',
    color: '#f59e0b',
  },
  {
    name: 'Predicción de Enfermedades Cardiovasculares',
    period: '2024',
    description:
      'Modelo de Machine Learning supervisado para predicción de enfermedades cardiovasculares.',
    bullets: [
      'Desarrollé en equipo un modelo de Machine Learning supervisado en el marco del programa Samsung Innovation Campus AI.',
      'Implementé técnicas de preprocesamiento de datos, selección de características y evaluación de modelos (precisión, recall, F1) con scikit-learn y pandas.',
      'Presenté resultados y documentación técnica del modelo ante evaluadores del programa.',
    ],
    tags: ['Python', 'scikit-learn', 'pandas', 'numpy', 'Jupyter Notebook', 'ML'],
    icon: '🫀',
    color: '#7c3aed',
  },
]

// ─── Certificaciones ──────────────────────────────────────────────────────────
export interface Course {
  name: string
  issuer: string
  year: string
  description: string
  icon: string
  gradientFrom: string
  gradientTo: string
  category: string
}

export const courses: Course[] = [
  {
    name: 'Samsung Innovation Campus – Artificial Intelligence',
    issuer: 'Samsung',
    year: '2024',
    description:
      'Desarrollo de modelos de ML y fundamentos de IA aplicada. Proyecto final: predicción de enfermedades cardiovasculares.',
    icon: '🤖',
    gradientFrom: '#1428A0',
    gradientTo: '#5C7AFF',
    category: 'Inteligencia Artificial',
  },
  {
    name: 'Oracle Next Education – Backend Development',
    issuer: 'Oracle',
    year: '2024',
    description:
      'Formación en desarrollo backend: APIs REST, bases de datos relacionales y lógica de servidor.',
    icon: '🔴',
    gradientFrom: '#C74634',
    gradientTo: '#F4821F',
    category: 'Backend',
  },
  {
    name: 'Google Cloud Computing Foundations Academy',
    issuer: 'Google Cloud',
    year: '2024',
    description:
      'Fundamentos de infraestructura cloud, servicios de Google Cloud Platform y arquitecturas escalables.',
    icon: '☁️',
    gradientFrom: '#4285F4',
    gradientTo: '#34A853',
    category: 'Cloud',
  },
  {
    name: 'Google Cloud Cybersecurity',
    issuer: 'Google Cloud',
    year: '2024',
    description:
      'Principios de seguridad en la nube, gestión de identidades y protección de infraestructuras digitales.',
    icon: '🔐',
    gradientFrom: '#0F9D58',
    gradientTo: '#00BFA5',
    category: 'Seguridad',
  },
]

// ─── Logros y Reconocimientos ─────────────────────────────────────────────────
export interface Achievement {
  title: string
  date: string
  organization: string
  bullets: string[]
  badge: string
  color: string
}

export const achievements: Achievement[] = [
  {
    title: '2do Lugar – Talent Land 2026',
    date: 'Abril 2026',
    organization: 'Track IBM Ciudades Inteligentes',
    badge: '🥈',
    color: '#00f5ff',
    bullets: [
      'Equipo XOLUM obtuvo el 2do lugar en el track "Ciudades Resilientes: IA Generativa para Diseñar Ciudades más Inteligentes y Sostenibles" con la plataforma URBANIA.',
      'Competencia a nivel nacional con participación de equipos de múltiples universidades del país.',
    ],
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface SkillGroup {
  category: string
  icon: string
  color: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Lenguajes',
    icon: '💻',
    color: '#00f5ff',
    skills: ['Python', 'JavaScript', 'SQL', 'Java', 'C', 'PHP'],
  },
  {
    category: 'Desarrollo Web',
    icon: '🌐',
    color: '#7c3aed',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'PHP'],
  },
  {
    category: 'IA / Machine Learning',
    icon: '🤖',
    color: '#ec4899',
    skills: ['IBM Watsonx', 'scikit-learn', 'pandas', 'numpy', 'Jupyter Notebook'],
  },
  {
    category: 'Bases de datos',
    icon: '🗄️',
    color: '#10b981',
    skills: ['PostgreSQL', 'PostGIS', 'MySQL', 'SQLite'],
  },
  {
    category: 'Herramientas',
    icon: '🛠️',
    color: '#f59e0b',
    skills: ['Git', 'GitHub', 'APIs REST', 'GeoJSON', 'Google Cloud', 'Figma', 'Notion'],
  },
  {
    category: 'Idiomas',
    icon: '🗣️',
    color: '#a78bfa',
    skills: ['Español (nativo)', 'Inglés (B1 intermedio)'],
  },
]

export interface SoftSkill {
  label: string
  icon: string
}

export const softSkills: SoftSkill[] = [
  { label: 'Liderazgo', icon: '🎯' },
  { label: 'Comunicación', icon: '💬' },
  { label: 'Análisis', icon: '🔍' },
  { label: 'Resolución de problemas', icon: '🧩' },
  { label: 'Trabajo en equipo', icon: '🤝' },
]

// ─── SEO (seo-optimizer skill) ────────────────────────────────────────────────
export const seoData = {
  title: 'Isai Aram Pérez — AI Engineer & Backend Developer',
  description:
    'Estudiante de IA en IPN ESCOM · 2do Lugar Talent Land 2026 · Desarrollador backend y fullstack en México. Especialista en Python, IBM Watsonx, PostGIS y APIs REST.',
  keywords: [
    'AI engineer México',
    'machine learning',
    'Python developer',
    'IPN ESCOM',
    'backend developer',
    'Isai Aram Pérez',
    'inteligencia artificial',
    'IBM Watsonx',
    'Talent Land 2026',
    'desarrollador México',
    'PostGIS',
    'URBANIA',
  ],
  canonicalUrl: 'https://isaiaram.dev',
  ogImage: '/profile.jpg',
}
