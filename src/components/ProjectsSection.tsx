'use client'

import Image from 'next/image'
import { clsx } from 'clsx'
import { ArrowUpRight } from 'lucide-react'
import { useInViewAnimation, delay } from '@/hooks/useInViewAnimation'
import { featuredProjects, type Project } from '@/data/portfolio'

function ProjectItem({ project }: { project: Project }) {
  // Cada proyecto observa por su cuenta, así entra cuando le toca y no en bloque
  const { ref, anim } = useInViewAnimation<HTMLElement>()

  return (
    <article ref={ref}>
      <div className={clsx(anim, 'ml-20 md:ml-28')} style={delay(0.1)}>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-paper-1">
            {project.name}
          </h3>
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-xs font-mono text-paper-2/65 hover:text-paper-1 transition-colors"
            >
              {project.hrefLabel}
              <ArrowUpRight className="w-3 h-3" aria-hidden />
            </a>
          )}
        </div>
        <p className="mt-2 max-w-xl text-sm md:text-base text-paper-2/70 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Misma sangría que el texto, para que captura y título compartan eje */}
      <div className={clsx(anim, 'mt-6 ml-20 md:ml-28 max-w-3xl')} style={delay(0.2)}>
        <Image
          src={project.image}
          alt={`Captura del proyecto ${project.name}`}
          width={1600}
          height={1000}
          sizes="(max-width: 768px) 100vw, 768px"
          className="w-full rounded-2xl shadow-lg object-cover"
        />
      </div>
    </article>
  )
}

export default function ProjectsSection() {
  return (
    <section
      id="proyectos"
      className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-16 md:gap-20"
    >
      {featuredProjects.map((p) => (
        <ProjectItem key={p.name} project={p} />
      ))}
    </section>
  )
}
