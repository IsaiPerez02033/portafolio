'use client'

import dynamic from 'next/dynamic'

/**
 * Carga diferida del shader. `three` pesa ~145 kB y es puramente decorativo: si
 * entrara en el bundle inicial retrasaría el primer pintado del texto, que es lo
 * que un reclutador viene a leer. Con `ssr: false` tampoco se renderiza en
 * servidor, donde no hay WebGL que valga.
 *
 * Mientras llega, el fondo lo cubre el ink de `html` en globals.css.
 */
const MatrixShader = dynamic(() => import('@/components/MatrixShader'), {
  ssr: false,
})

export default function MatrixBackground() {
  return <MatrixShader />
}
