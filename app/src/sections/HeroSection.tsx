import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Bot, Plane, Shield, BrainCircuit } from 'lucide-react'
import { ScrollIndicator } from '@/components/ScrollIndicator'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCanvasVisibility } from '@/hooks/useCanvasVisibility'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import tanishPhoto from '@/assets/images/tanish-sec.jpeg'

gsap.registerPlugin(ScrollTrigger)

/* ─── 3D Particle Field ─── */
function Particles({ count = 250 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)
  const reduced = useReducedMotion()

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 200
      pos[i * 3 + 1] = (Math.random() - 0.5) * 200
      pos[i * 3 + 2] = (Math.random() - 0.5) * 200
      vel[i * 3] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }
    return { positions: pos, velocities: vel }
  }, [count])

  useFrame(() => {
    if (reduced || !pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArray = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      posArray[i * 3] += velocities[i * 3]
      posArray[i * 3 + 1] += velocities[i * 3 + 1]
      posArray[i * 3 + 2] += velocities[i * 3 + 2]
      if (Math.abs(posArray[i * 3]) > 100) velocities[i * 3] *= -1
      if (Math.abs(posArray[i * 3 + 1]) > 100) velocities[i * 3 + 1] *= -1
      if (Math.abs(posArray[i * 3 + 2]) > 100) velocities[i * 3 + 2] *= -1
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        color="#ffffff"
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Interest Card in 3D ─── */
interface CardData {
  position: [number, number, number]
  icon: React.ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  meta: string
  glowColor: string
  phase: number
}

const cardsData: CardData[] = [
  {
    position: [-10, 5, 8],
    icon: Bot,
    title: 'Robotics',
    description: 'Building mechanical systems that bridge the gap between digital intelligence and physical action.',
    meta: 'HARDWARE \u00B7 CONTROL SYSTEMS',
    glowColor: 'rgba(250, 250, 250, 0.06)',
    phase: 0,
  },
  {
    position: [10, 5, 8],
    icon: Plane,
    title: 'Drones',
    description: 'Exploring autonomous flight, navigation systems, and aerial robotics for real-world applications.',
    meta: 'AUTONOMY \u00B7 FLIGHT SYSTEMS',
    glowColor: 'rgba(161, 161, 170, 0.04)',
    phase: Math.PI * 0.5,
  },
  {
    position: [-10, -5, 8],
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Understanding the defense of digital systems \u2014 from network security to ethical hacking.',
    meta: 'SECURITY \u00B7 NETWORKS',
    glowColor: 'rgba(82, 82, 91, 0.05)',
    phase: Math.PI,
  },
  {
    position: [10, -5, 8],
    icon: BrainCircuit,
    title: 'Agentic AI',
    description: 'Creating autonomous AI agents that can reason, plan, and execute tasks independently.',
    meta: 'LLMS \u00B7 AGENTS \u00B7 WORKFLOWS',
    glowColor: 'rgba(229, 229, 229, 0.05)',
    phase: Math.PI * 1.5,
  },
]

function InterestCard3D({ data, index }: { data: CardData; index: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePosition()
  const reduced = useReducedMotion()
  const Icon = data.icon

  useFrame(({ clock }) => {
    if (reduced || !groupRef.current) return

    const t = clock.getElapsedTime()

    // Float animation
    const floatY = Math.sin(t * 0.8 + data.phase) * 0.08
    groupRef.current.position.y = data.position[1] + floatY

    // Mouse parallax
    const targetX = data.position[0] + mouseRef.current.x * 15 * (1 - data.position[2] / 200)
    const targetY = data.position[1] + floatY + mouseRef.current.y * 15 * (1 - data.position[2] / 200)
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05
  })

  return (
    <group ref={groupRef} position={data.position}>
      <Html
        center
        zIndexRange={[10, 20]}
        style={{ pointerEvents: 'auto' }}
      >
        <motion.div
          className="w-[280px] bg-[rgba(17,17,17,0.9)] backdrop-blur-lg border border-[rgba(34,34,34,0.8)] rounded-2xl p-7 transition-all duration-300 ease-smooth hover:border-[rgba(250,250,250,0.15)] hover:shadow-[0_0_40px_rgba(250,250,250,0.05)]"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: `radial-gradient(200px circle at 50% 50%, ${data.glowColor}, transparent)`,
              animation: 'pulse-glow 4s ease-in-out infinite',
              animationDelay: `${index * 0.5}s`,
            }}
          />
          <div className="relative z-10">
            <Icon size={24} className={`text-[#FAFAFA] mb-4 ${data.title === 'Drones' ? 'rotate-[-45deg]' : ''}`} />
            <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-2">
              {data.title}
            </h3>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA] mb-3">
              {data.description}
            </p>
            <span className="text-[0.6875rem] tracking-[0.04em] text-[#52525B]">
              {data.meta}
            </span>
          </div>
        </motion.div>
      </Html>
    </group>
  )
}

/* ─── Hero 3D Scene ─── */
function HeroScene() {
  return (
    <>
      <fogExp2 attach="fog" args={['#050505', 0.025]} />
      <ambientLight intensity={0.3} />
      <Particles count={250} />
      {cardsData.map((card, i) => (
        <InterestCard3D key={card.title} data={card} index={i} />
      ))}
    </>
  )
}

/* ─── Main Hero Section ─── */
const textLines = [
  { text: "Hi, I'm Tanish Panwar.", sub: false },
  { text: 'A builder.', sub: false },
  { text: 'A student exploring intelligent systems.', sub: true },
  { text: 'From code... to machines... to autonomous systems.', sub: true },
  { text: 'What happens when intelligence leaves the screen and enters the real world?', sub: false },
  { text: 'This is my story.', sub: false },
]

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const { ref: canvasContainerRef } = useCanvasVisibility()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Pin the hero
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=300%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    })

    return () => st.kill()
  }, [])

  // Calculate which text line is visible based on scroll
  const getLineOpacity = (lineIndex: number) => {
    const vh = window.innerHeight
    const scrollInVh = scrollY / vh

    // Text sequence occupies scroll 0-100vh (first third of 300vh pin)
    // Distribute 6 lines across 0-90vh
    const lineStart = lineIndex * 35
    const lineEnd = lineStart + 45
    if (lineIndex === 0) {
  const fadeInEnd = 5
  const holdEnd = 40
  const fadeOutEnd = 48

  if (scrollInVh < fadeInEnd) {
    return scrollInVh / fadeInEnd
  }

  if (scrollInVh < holdEnd) {
    return 1
  }

  if (scrollInVh < fadeOutEnd) {
    return 1 - (scrollInVh - holdEnd) / (fadeOutEnd - holdEnd)
  }

  return 0
}
    const fadeInEnd = lineStart + 5
    const fadeOutStart = lineEnd - 5

    if (scrollInVh < lineStart) return 0
    if (scrollInVh < fadeInEnd) return (scrollInVh - lineStart) / 5
    if (scrollInVh < fadeOutStart) return 1
    if (scrollInVh < lineEnd) return 1 - (scrollInVh - fadeOutStart) / 5
    return 0
  }

  // Background transition
  const bgProgress = Math.min(scrollY / window.innerHeight / 0.5, 1)
  const bgColor = `rgb(${Math.round(bgProgress * 5)}, ${Math.round(bgProgress * 5)}, ${Math.round(bgProgress * 5)})`

  // 3D scene opacity
  const sceneOpacity = scrollY > window.innerHeight * 0.8
    ? Math.min((scrollY - window.innerHeight * 0.8) / (window.innerHeight * 0.4), 1)
    : 0

  // Text container opacity fades out as 3D scene fades in
  const textOpacity = scrollY > window.innerHeight * 0.7
    ? 1 - Math.min((scrollY - window.innerHeight * 0.7) / (window.innerHeight * 0.3), 1)
    : 1

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: bgColor }}
      />

      {/* 3D Canvas */}
     {/* Hero Layout */}
<div className="absolute inset-0 z-[1] flex items-center justify-center">
  <div className="w-full max-w-7xl px-12 flex items-center justify-between gap-16">

    {/* Left Photo */}
    <div className="flex-shrink-0">
    <img
  src={tanishPhoto}
  alt="Tanish Panwar"
  className="
    w-[380px]
    h-[500px]
    object-cover
    rounded-[32px]
    border border-white/10
    shadow-[0_0_60px_rgba(255,255,255,0.08)]
    animate-[float_6s_ease-in-out_infinite]
  "
/>
    </div>

    {/* Right Cards */}
    <div
      ref={canvasContainerRef}
      className="relative w-[700px] h-[600px]"
      style={{ opacity: sceneOpacity }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 50 }}
      >
        <HeroScene />
      </Canvas>
    </div>

  </div>
</div>

      {/* Text Overlay */}
      <div
        ref={textContainerRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <div className="max-w-[720px] mx-auto px-6 text-center">
          {textLines.map((line, i) => {
            const opacity = getLineOpacity(i)
            if (opacity <= 0) return null
            return (
              <p
  key={i}
  className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 px-6 transition-all duration-700 ease-out ${
    line.sub
      ? 'font-sans text-[0.875rem] md:text-[1.0625rem] leading-relaxed tracking-[0.02em] text-[#A1A1AA]'
      : 'font-serif text-[4rem] md:text-[7rem] leading-[1.15] tracking-[-0.02em] text-white drop-shadow-[0_0_80px_rgba(255,255,255,1)]'
  }`}
style={{
  opacity,
  transform: `translateY(${(1 - opacity) * 45}px) scale(${0.90 + opacity * 0.10})`,
  filter: `blur(${(1 - opacity) * 8}px)`,
  letterSpacing: `${opacity * 0.02}em`,
  pointerEvents: opacity > 0.5 ? 'auto' : 'none'
}}
/>
                {line.text}
              </p>
            )
          })}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
        <ScrollIndicator visible={scrollY < 100} />
      </div>
    </section>
  )
}