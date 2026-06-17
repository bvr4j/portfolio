import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MousePositionProvider } from '@/hooks/useMousePosition'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { HeroSection } from '@/sections/HeroSection'
import { StudentSection } from '@/sections/StudentSection'
import { SkillsGalaxySection } from '@/sections/SkillsGalaxySection'
import { BuilderSection } from '@/sections/BuilderSection'
import { ImpactSection } from '@/sections/ImpactSection'
import { VisionSection } from '@/sections/VisionSection'
import { ContactSection } from '@/sections/ContactSection'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 0.8,
    })

    lenisRef.current = lenis

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf as any)
    }
  }, [])

  return (
    <MousePositionProvider>
      <div className="relative min-h-screen bg-[#050505]">
        <Navigation />

        <main>
          <HeroSection />
          <StudentSection />
          <SkillsGalaxySection />
          <BuilderSection />
          <ImpactSection />
          <VisionSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </MousePositionProvider>
  )
}

export default App
