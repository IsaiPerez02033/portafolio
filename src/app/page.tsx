import MatrixBackground from '@/components/MatrixBackground'
import ScreenOverlay from '@/components/ScreenOverlay'
import MatrixExitOverlay from '@/components/MatrixExitOverlay'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import QuoteSection from '@/components/QuoteSection'
import ServicesSection from '@/components/ServicesSection'
import AchievementsCarousel from '@/components/AchievementsCarousel'
import ProjectsSection from '@/components/ProjectsSection'
import OtherProjects from '@/components/OtherProjects'
import Skills from '@/components/Skills'
import PartnerSection from '@/components/PartnerSection'
import Footer from '@/components/Footer'
import CopyrightBar from '@/components/CopyrightBar'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  return (
    <>
      <MatrixBackground />
      {/* Cristal mate entre la lluvia y el contenido */}
      <ScreenOverlay />

      <main>
        <Hero />
        <Marquee />
        <QuoteSection />
        <ServicesSection />
        <AchievementsCarousel />
        <ProjectsSection />
        <OtherProjects />
        <Skills />
        <PartnerSection />
      </main>

      <Footer />
      <CopyrightBar />

      <BottomNav />
      <MatrixExitOverlay />
    </>
  )
}
