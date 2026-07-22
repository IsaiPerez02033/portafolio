import Image from 'next/image'
import { marqueeImages } from '@/data/portfolio'

/**
 * Tira infinita de capturas. El set se repite 3 veces y la animación recorre
 * -33.333% (el ancho de un set), así el siguiente queda exactamente donde
 * arrancó el anterior.
 *
 * Con sólo 2 copias el bucle exige que un set sea más ancho que el viewport;
 * con las capturas ya reducidas eso dejaba de cumplirse en pantallas anchas y
 * asomaba un hueco. Con 3 copias basta con la mitad, y sobra margen.
 */
export default function Marquee() {
  const strip = [...marqueeImages, ...marqueeImages, ...marqueeImages]

  return (
    <section
      className="mt-12 md:mt-20 mb-12 md:mb-16 w-full overflow-hidden"
      aria-label="Capturas de proyectos"
    >
      <div className="flex w-max animate-marquee">
        {strip.map((img, i) => (
          <Image
            key={`${img.src}-${i}`}
            src={img.src}
            alt={i < marqueeImages.length ? img.alt : ''}
            aria-hidden={i >= marqueeImages.length}
            width={1600}
            height={1000}
            priority={i === 0}
            sizes="(max-width: 768px) 224px, 384px"
            className="h-[130px] sm:h-[160px] md:h-[240px] w-auto max-w-none object-cover mx-2 md:mx-3 rounded-xl md:rounded-2xl shadow-lg"
          />
        ))}
      </div>
    </section>
  )
}
