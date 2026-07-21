import { personalInfo } from '@/data/portfolio'

export default function CopyrightBar() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-4 pb-28">
      <div className="flex justify-between items-center text-sm text-paper-1">
        <span>
          {personalInfo.studio} · {new Date().getFullYear()}
        </span>
        <span>{personalInfo.location}</span>
      </div>
    </div>
  )
}
