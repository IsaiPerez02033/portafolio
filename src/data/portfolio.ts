// ============================================================
// portfolio.ts — Fuente única de verdad para todo el contenido
// Edita este archivo para personalizar la página sin tocar JSX
// ============================================================

export const personalInfo = {
  name: 'Aram Pérez',
  // Nombre legal completo: sólo para datos estructurados (alternateName), no se
  // muestra. Conserva el vínculo con quien lo busque por su nombre completo.
  legalName: 'Isai Aram Pérez Flores',
  shortName: 'Aram Pérez',
  firstName: 'Aram',
  lastName: 'Pérez',
  studio: 'XOLUM',
  title: 'AI Engineer & Backend Developer',
  location: 'Ciudad de México, México',
  email: 'isaipz0510@gmail.com',
  phone: '+52 56 4591 5734',
  linkedin: 'https://www.linkedin.com/in/isai-aram-perez-604b67298/',
  github: 'https://github.com/IsaiPerez02033',
  instagram: 'https://www.instagram.com/_aramperez/',
  profileImage: '/profile.webp',
  cvUrl: 'https://drive.google.com/file/d/1pgUDKkR3rwAnI0jIfzM7bCIrAwB9J3D1/view?usp=drive_link',
} as const

const emailSubject = 'Hablemos de un proyecto'

export const mailtoHref = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
  emailSubject
)}`

// Ventana de redacción de Gmail. En escritorio un `mailto:` depende de que el
// visitante tenga configurado un cliente de correo; si no lo tiene, el clic no
// hace nada. useContactClick usa esta URL ahí y deja el mailto para el móvil,
// donde sí abre la app de correo nativa.
export const gmailComposeHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  personalInfo.email
)}&su=${encodeURIComponent(emailSubject)}`

// ─── Hero ─────────────────────────────────────────────────────────────────────
export const hero = {
  tagline: 'El estudio de software de Aram Pérez',
  // Cada línea se parte en dos: la segunda mitad va en la serif de acento
  headingLines: [
    { plain: 'Del ', accent: 'prototipo,' },
    { plain: 'a ', accent: 'producción.' },
  ],
  paragraphs: [
    'Estudio Ingeniería en Inteligencia Artificial en la ESCOM del IPN. Trabajo bajo el nombre de XOLUM, llevando ese trabajo hasta producto real: sitios, plataformas SaaS y sistemas con IA que hoy usan empresas en México.',
    'Me encargo de la parte técnica de cada proyecto, del primer boceto hasta que está en producción y en uso.',
    'Disponible para proyectos freelance y oportunidades de medio tiempo.',
  ],
}

// ─── Marquee (capturas reales de proyectos) ──────────────────────────────────
export const marqueeImages: { src: string; alt: string }[] = [
  { src: '/projects/icemex.webp', alt: 'Hero 3D del sitio corporativo de ICEMEX' },
  {
    src: '/projects/susvi.webp',
    alt: 'Mapa de intervención de SUSVI con capas de senderos, luminarias y puntos clave',
  },
  { src: '/projects/carhema.webp', alt: 'Landing 3D de CARHEMA con la casa procedural construida' },
  { src: '/projects/nicte.webp', alt: 'Pantalla de bienvenida de la plataforma legal Nicté' },
  { src: '/projects/beel.webp', alt: 'Marketplace de hospedaje Beel' },
]

// ─── Cita ─────────────────────────────────────────────────────────────────────
export const quote = {
  // Habla del trabajo, no del logro personal: el problema llevaba ahí desde
  // antes, y lo que cuenta es haberse puesto a resolverlo.
  plain: 'Trabajo bajo el nombre de ',
  accent: 'XOLUM',
  rest: ' para construir soluciones reales a problemas que llevaban años esperando a alguien',
  author: 'Aram Pérez',
  // Formación y programas — NO son clientes. La etiqueta lo deja explícito.
  affiliationsLabel: 'Formación y programas',
  affiliations: [
    { name: 'IPN ESCOM', width: 110 },
    { name: 'Samsung', width: 100 },
    { name: 'Google Cloud', width: 130 },
  ],
}

// ─── Cómo trabajo ─────────────────────────────────────────────────────────────
export interface WorkMode {
  title: string
  description: string[]
  value: string
  valueLabel: string
}

export const workModes: { dark: WorkMode; light: WorkMode } = {
  dark: {
    title: 'Proyecto freelance',
    description: ['Sitio o plataforma a medida.', 'Trabajas directo conmigo.'],
    value: 'A medida',
    valueLabel: 'Por proyecto',
  },
  light: {
    title: 'Colaboración',
    description: ['Equipo, prácticas o tesis.', 'Mismo estándar de siempre.'],
    value: 'Medio tiempo',
    valueLabel: 'Disponible',
  },
}

// ─── Proyectos destacados ─────────────────────────────────────────────────────
export interface Project {
  name: string
  description: string
  image: string
  href?: string
  hrefLabel?: string
}

export const featuredProjects: Project[] = [
  {
    name: 'ICEMEX',
    description:
      'Sitio corporativo y asistente con IA para un fabricante de iluminación pública con más de 20 años. En producción.',
    image: '/projects/icemex.webp',
    href: 'https://icemex.mx',
    hrefLabel: 'icemex.mx',
  },
  {
    name: 'Beel',
    description:
      'Marketplace de hospedaje con anfitriones locales en México y Kukul, un planificador de viajes con IA.',
    image: '/projects/beel.webp',
    href: 'https://www.beel-mx.com/',
    hrefLabel: 'beel-mx.com',
  },
  {
    name: 'Nicté',
    description:
      'Plataforma legal con RAG sobre la ley mexicana, con capa de seguridad contra alucinación de citas.',
    image: '/projects/nicte.webp',
    href: 'https://nicte.net/',
    hrefLabel: 'nicte.net',
  },
]

// ─── Otros proyectos ──────────────────────────────────────────────────────────
export interface OtherProject {
  name: string
  description: string
  stack: string
  href?: string
  hrefLabel?: string
}

export const otherProjects: OtherProject[] = [
  {
    name: 'CARHEMA',
    description: 'Landing inmersiva donde una residencia se construye en 3D al hacer scroll.',
    stack: 'Three.js · GSAP',
    href: 'https://carhema-page.vercel.app/',
    hrefLabel: 'Ver demo',
  },
  {
    name: 'SUSVI',
    description:
      'IA generativa que convierte datos urbanos en planes de senderos peatonales seguros. 2º lugar en Talent Land 2026.',
    stack: 'React · IBM Watsonx · Leaflet · FastAPI',
    href: 'https://isaiperez02033.github.io/xolum/',
    hrefLabel: 'Ver demo',
  },
  {
    name: 'ICEMEX Almacén',
    description: 'SaaS multi-tenant de almacén: préstamo de herramienta, inventario y compras.',
    stack: 'NestJS · Prisma · Supabase',
  },
  {
    name: 'XOLUM Platform',
    description: 'SaaS multi-vertical con reservas públicas y recordatorios automáticos.',
    stack: 'NestJS · Prisma · Next.js',
  },
  {
    name: 'Kinara',
    description: 'E-commerce de luminarias diseñadas e impresas en 3D, de la marca al checkout.',
    stack: 'PHP · JavaScript',
    href: 'https://kinaramx.com/',
    hrefLabel: 'kinaramx.com',
  },
  {
    name: 'Predicción cardiovascular',
    description: 'Modelo de ML supervisado del programa Samsung Innovation Campus AI.',
    stack: 'scikit-learn · pandas',
  },
]

// ─── Logros y reconocimientos (carrusel) ─────────────────────────────────────
export interface Achievement {
  text: string
  name: string
  issuer: string
  year: string
  icon: string
  gradientFrom: string
  gradientTo: string
}

export const achievements: Achievement[] = [
  {
    text: 'Con el equipo XOLUM obtuvimos el 2º lugar en el track "Ciudades Resilientes: IA Generativa para Ciudades Inteligentes y Sostenibles", compitiendo con equipos de todo el país.',
    name: '2º Lugar — Talent Land 2026',
    issuer: 'Track IBM Ciudades Resilientes',
    year: '2026',
    icon: '🥈',
    gradientFrom: '#00f5ff',
    gradientTo: '#0066ff',
  },
  {
    text: 'Formación en modelos de Machine Learning y fundamentos de IA aplicada. Como proyecto final entrenamos un modelo de predicción de enfermedades cardiovasculares.',
    name: 'Samsung Innovation Campus',
    issuer: 'Artificial Intelligence',
    year: '2024',
    icon: '🤖',
    gradientFrom: '#1428A0',
    gradientTo: '#5C7AFF',
  },
  {
    text: 'Formación en desarrollo backend: APIs REST, bases de datos relacionales y lógica de servidor — la base de las plataformas que construyo hoy.',
    name: 'Oracle Next Education',
    issuer: 'Backend Development',
    year: '2024',
    icon: '🔴',
    gradientFrom: '#C74634',
    gradientTo: '#F4821F',
  },
  {
    text: 'Fundamentos de infraestructura cloud, servicios de Google Cloud Platform y diseño de arquitecturas escalables.',
    name: 'Google Cloud Computing Foundations',
    issuer: 'Google Cloud Academy',
    year: '2024',
    icon: '☁️',
    gradientFrom: '#4285F4',
    gradientTo: '#34A853',
  },
  {
    text: 'Principios de seguridad en la nube, gestión de identidades y protección de infraestructuras digitales.',
    name: 'Google Cloud Cybersecurity',
    issuer: 'Google Cloud Academy',
    year: '2024',
    icon: '🔐',
    gradientFrom: '#0F9D58',
    gradientTo: '#00BFA5',
  },
]

// ─── Skills ───────────────────────────────────────────────────────────────────
export interface SkillGroup {
  category: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  { category: 'Lenguajes', skills: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'Java', 'C', 'PHP'] },
  { category: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'GSAP'] },
  { category: 'Backend', skills: ['NestJS', 'FastAPI', 'Prisma', 'APIs REST', 'Supabase'] },
  { category: 'IA / ML', skills: ['IBM Watsonx', 'RAG', 'Vercel AI SDK', 'scikit-learn', 'pandas'] },
  { category: 'Datos', skills: ['PostgreSQL', 'PostGIS', 'MySQL', 'GeoJSON'] },
  { category: 'Herramientas', skills: ['Git', 'Docker', 'Vercel', 'Google Cloud', 'Figma'] },
]

// ─── Footer ───────────────────────────────────────────────────────────────────
export const footerLinks = {
  internal: [
    { label: 'Cómo trabajo', href: '#servicios' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Sobre mí', href: '#inicio' },
  ],
}

// ─── Redes sociales ───────────────────────────────────────────────────────────
// `icon` empareja con el mapa de SocialIcons.tsx
export interface Social {
  label: string
  href: string
  icon: 'github' | 'linkedin' | 'instagram'
}

export const socials: Social[] = [
  { label: 'GitHub', href: personalInfo.github, icon: 'github' },
  { label: 'LinkedIn', href: personalInfo.linkedin, icon: 'linkedin' },
  { label: 'Instagram', href: personalInfo.instagram, icon: 'instagram' },
]

// ─── SEO ──────────────────────────────────────────────────────────────────────
export const seoData = {
  title: 'Aram Pérez — AI Engineer & Backend Developer',
  description:
    'Estudiante de IA en IPN ESCOM y fundador de XOLUM · 2º lugar Talent Land 2026 · Construyo sitios, plataformas SaaS y sistemas con IA en producción. Python, Next.js, NestJS, IBM Watsonx.',
  keywords: [
    'AI engineer México',
    'machine learning',
    'Python developer',
    'IPN ESCOM',
    'backend developer',
    'Aram Pérez',
    // Nombre completo como término de búsqueda, aunque ya no se muestre
    'Isai Aram Pérez',
    'inteligencia artificial',
    'IBM Watsonx',
    'Talent Land 2026',
    'desarrollador México',
    'XOLUM',
    'SUSVI',
  ],
  // OJO: isaiaram.dev no existe (NXDOMAIN). Apunta al despliegue real para que
  // Google pueda indexar el sitio. Cámbialo si registras el dominio propio.
  canonicalUrl: 'https://portafolio-chi-tawny-37.vercel.app',
}
