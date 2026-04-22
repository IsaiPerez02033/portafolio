import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/sections/Hero'
import AboutMe from '@/sections/AboutMe'
import Skills from '@/sections/Skills'
import Projects from '@/sections/Projects'
import Achievements from '@/sections/Achievements'
import Courses from '@/sections/Courses'
import Contact from '@/sections/Contact'
import { personalInfo } from '@/data/portfolio'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

// Custom cursor is client-only
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <AboutMe />
        <Skills />
        <Projects />
        <Achievements />
        <Courses />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-sm text-gray-600">
            <span className="text-cyan-400">&lt;</span>
            {personalInfo.name}
            <span className="text-cyan-400"> /&gt;</span>
            <span className="ml-2">© {new Date().getFullYear()}</span>
          </p>

          <div className="flex gap-5">
            {[
              { href: personalInfo.github, Icon: FiGithub, label: 'GitHub' },
              { href: personalInfo.linkedin, Icon: FiLinkedin, label: 'LinkedIn' },
              { href: `mailto:${personalInfo.email}`, Icon: FiMail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-gray-600 hover:text-cyan-400 transition-colors duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-700 font-mono">
            Built with Next.js 14 · TypeScript · Tailwind
          </p>
        </div>
      </footer>
    </>
  )
}
