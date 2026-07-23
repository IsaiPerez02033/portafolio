/**
 * Cristal antirreflejos sobre el digital rain.
 *
 * Va en z-index -9: justo por encima del canvas del shader (-10) y por debajo de
 * absolutamente todo el contenido, que vive en flujo normal. Por el orden de
 * pintado de CSS, los elementos con z-index negativo se pintan antes que los
 * fondos de los bloques en flujo, así que las tarjetas, las imágenes y el texto
 * quedan sobre esta capa sin necesidad de darles z-index propio.
 *
 * Lo que imita es el recubrimiento mate de un monitor: sube el nivel de negro,
 * baja el contraste y añade el grano fino característico. Nada de esto se anima
 * ni usa backdrop-filter, así que se compone una sola vez y no añade trabajo por
 * fotograma al shader, que ya corre en bucle.
 *
 * Sin 'use client' a propósito: no tiene estado, así se renderiza en servidor y
 * está desde el primer pintado, antes incluso de que cargue el shader diferido.
 */
export default function ScreenOverlay() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[-9]">
      {/* Velo mate: lo que de verdad «apaga» la lluvia. Sube el #03090A del
          fondo a un ~#0A1011, que es justo lo que hace un antirreflejos. */}
      <div className="absolute inset-0 bg-paper-1/[0.025]" />

      {/* Grano del recubrimiento */}
      <div className="screen-grain absolute inset-0" />

      {/* Viñeta: el panel se apaga hacia los bordes */}
      <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_45%,transparent_60%,rgba(0,0,0,0.35)_100%)]" />
    </div>
  )
}
