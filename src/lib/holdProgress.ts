/**
 * Progreso del gesto «mantener presionado» del botón de contacto (0 → 1).
 *
 * Vive a nivel de módulo, no en un Context de React, porque tiene dos lectores
 * con necesidades opuestas: el shader lo consulta 60 veces por segundo en su
 * animation loop (sin querer re-renderizar nada) y el overlay se suscribe para
 * pintar el oscurecido. Un singleton con get / set / subscribe cubre ambos sin
 * arrastrar re-renders por frame a todo el árbol.
 */
let value = 0
const subscribers = new Set<(v: number) => void>()

export function getHoldProgress() {
  return value
}

export function setHoldProgress(v: number) {
  const next = Math.min(1, Math.max(0, v))
  if (next === value) return
  value = next
  subscribers.forEach((cb) => cb(next))
}

export function subscribeHoldProgress(cb: (v: number) => void) {
  subscribers.add(cb)
  return () => {
    subscribers.delete(cb)
  }
}
