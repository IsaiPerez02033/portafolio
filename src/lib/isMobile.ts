/** Móviles y tablets, donde `mailto:` abre la app de correo del sistema. */
export const isMobile = () =>
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
