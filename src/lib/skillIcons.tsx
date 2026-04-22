/**
 * skillIcons.tsx
 * ──────────────────────────────────────────────────────────────────────────────
 * Mapa centralizado: nombre de skill → { icono de react-icons + color oficial }
 *
 * CÓMO PERSONALIZAR:
 *  1. Busca el nombre exacto del icono en https://react-icons.github.io/react-icons
 *     (usa la búsqueda, ej. "python", "figma", etc.)
 *  2. Copia el nombre del componente (ej. SiPython)
 *  3. Agrega/modifica la línea en el objeto SKILL_ICONS de abajo
 *  4. Cambia el `color` por el hex oficial de la marca que prefieras
 *
 * Si un skill NO tiene entrada aquí, Skills.tsx mostrará el punto de color
 * de la categoría como fallback — nunca se rompe nada.
 * ──────────────────────────────────────────────────────────────────────────────
 */
import type { IconType } from 'react-icons'

// ── Simple Icons (logos de tecnologías) ──────────────────────────────────────
import {
  SiPython,
  SiJavascript,
  SiPhp,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiMysql,
  SiSqlite,
  SiGit,
  SiGithub,
  SiGooglecloud,
  SiFigma,
  SiNotion,
  SiJupyter,
  SiPandas,
  SiNumpy,
  SiC,
  SiJson,
} from 'react-icons/si'

// ── Font Awesome (complementos) ───────────────────────────────────────────────
import { FaJava, FaDatabase } from 'react-icons/fa'

// ── Tabler Icons (IA/ML sin Si disponible) ────────────────────────────────────
import { TbBrain, TbApi, TbCloudComputing } from 'react-icons/tb'

// ── Iconos de banderas (idiomas) ──────────────────────────────────────────────
import { MdLanguage } from 'react-icons/md'

// ─────────────────────────────────────────────────────────────────────────────
// Tipo del mapa
// ─────────────────────────────────────────────────────────────────────────────
export interface SkillIconEntry {
  Icon: IconType
  color: string      // color oficial de la marca / lo que prefieras
}

// ─────────────────────────────────────────────────────────────────────────────
// ¡EDITA AQUÍ! — agrega, cambia o quita entradas libremente
// La clave debe coincidir EXACTAMENTE con el string en portfolio.ts
// ─────────────────────────────────────────────────────────────────────────────
export const SKILL_ICONS: Record<string, SkillIconEntry> = {

  // ── Lenguajes ──────────────────────────────────────────────────────────────
  'Python':                 { Icon: SiPython,       color: '#3776AB' },
  'JavaScript':             { Icon: SiJavascript,   color: '#F7DF1E' },
  'JavaScript (ES6+)':      { Icon: SiJavascript,   color: '#F7DF1E' },
  'SQL':                    { Icon: FaDatabase,      color: '#00758F' },
  'Java':                   { Icon: FaJava,          color: '#ED8B00' },
  'C':                      { Icon: SiC,             color: '#A8B9CC' },
  'PHP':                    { Icon: SiPhp,           color: '#777BB4' },

  // ── Desarrollo Web ─────────────────────────────────────────────────────────
  'HTML5':                  { Icon: SiHtml5,         color: '#E34F26' },
  'CSS3':                   { Icon: SiCss,           color: '#1572B6' },

  // ── IA / Machine Learning ──────────────────────────────────────────────────
  'IBM Watsonx':            { Icon: TbCloudComputing, color: '#006699' },
  'scikit-learn':           { Icon: TbBrain,         color: '#F7931E' },
  'pandas':                 { Icon: SiPandas,        color: '#150458' },
  'numpy':                  { Icon: SiNumpy,         color: '#013243' },
  'Jupyter Notebook':       { Icon: SiJupyter,       color: '#F37626' },

  // ── Bases de datos ─────────────────────────────────────────────────────────
  'PostgreSQL':             { Icon: SiPostgresql,    color: '#4169E1' },
  'PostGIS':                { Icon: SiPostgresql,    color: '#336791' },  // usa el logo de Postgres
  'MySQL':                  { Icon: SiMysql,         color: '#4479A1' },
  'SQLite':                 { Icon: SiSqlite,        color: '#003B57' },

  // ── Herramientas ───────────────────────────────────────────────────────────
  'Git':                    { Icon: SiGit,           color: '#F05032' },
  'GitHub':                 { Icon: SiGithub,        color: '#ffffff' },
  'APIs REST':              { Icon: TbApi,           color: '#10b981' },
  'GeoJSON':                { Icon: SiJson,          color: '#f59e0b' },
  'Google Cloud':           { Icon: SiGooglecloud,   color: '#4285F4' },
  'Figma':                  { Icon: SiFigma,         color: '#F24E1E' },
  'Notion':                 { Icon: SiNotion,        color: '#ffffff' },

  // ── Idiomas ────────────────────────────────────────────────────────────────
  'Español (nativo)':       { Icon: MdLanguage,      color: '#c0392b' },
  'Inglés (B1 intermedio)': { Icon: MdLanguage,      color: '#1d6fa4' },
}
