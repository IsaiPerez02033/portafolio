'use client'

import { useCallback } from 'react'
import { gmailComposeHref } from '@/data/portfolio'

/** Móviles y tablets, donde `mailto:` abre la app de correo del sistema */
const isMobile = () =>
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

/**
 * Hace que los enlaces `mailto:` abran de verdad una ventana de mensaje.
 *
 * En escritorio un `mailto:` sólo funciona si el visitante tiene configurado un
 * cliente de correo; sin él, el clic no hace nada y el botón parece roto. Ahí
 * abrimos la ventana de redacción de Gmail. En móvil no hace falta: el mailto
 * abre la app nativa, que además respeta la cuenta que use cada quien.
 *
 * El `href` del enlace sigue siendo el mailto, así que copiar la dirección,
 * abrir en otra pestaña o navegar sin JS siguen funcionando.
 */
export function useContactClick() {
  return useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Respeta cmd/ctrl+clic, clic central y demás gestos del navegador
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    if (isMobile()) return

    e.preventDefault()
    window.open(gmailComposeHref, '_blank', 'noopener,noreferrer')
  }, [])
}
