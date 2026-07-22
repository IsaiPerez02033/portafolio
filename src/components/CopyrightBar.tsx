import { personalInfo } from '@/data/portfolio'

export default function CopyrightBar() {
  return (
    // pb-28: hueco para que la píldora flotante no tape la última línea
    <div className="max-w-[1200px] mx-auto px-5 sm:px-6 py-4 pb-28">
      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:items-center text-sm text-paper-1">
        <span>
          {personalInfo.studio} · {new Date().getFullYear()}
        </span>
        <span>{personalInfo.location}</span>
      </div>
    </div>
  )
}
