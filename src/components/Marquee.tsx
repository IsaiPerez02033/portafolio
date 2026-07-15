import Image from 'next/image'
import { marqueeImages } from '@/data/portfolio'

/**
 * Tira infinita de capturas. El set se duplica y la animación recorre -50%,
 * de modo que el segundo set queda exactamente donde arrancó el primero.
 */
export default function Marquee() {
  const strip = [...marqueeImages, ...marqueeImages]

  return (
    <section
      className="mt-16 md:mt-20 mb-16 w-full overflow-hidden"
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
            className="h-[280px] md:h-[500px] w-auto max-w-none object-cover mx-3 rounded-2xl shadow-lg"
          />
        ))}
      </div>
    </section>
  )
}
