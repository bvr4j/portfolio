import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { ChapterLabel } from '@/components/ChapterLabel'
import { SimpleIcon } from '@/components/SimpleIcon'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useCanvasVisibility } from '@/hooks/useCanvasVisibility'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ─── Skill Node Data ─── */
interface SkillNode {
  name: string
  slug: string
  radius: number
  category: string
}

interface RingData {
  radius: number
  tiltX: number
  tiltZ: number
  speed: number
  nodes: SkillNode[]
  category: string
}

const rings: RingData[] = [
  {
    radius: 4,
    tiltX: 0.3,
    tiltZ: 0.1,
    speed: 0.15,
    category: 'Core',
    nodes: [
      { name: 'React', slug: 'react', radius: 0.35, category: 'Core' },
      { name: 'Python', slug: 'python', radius: 0.35, category: 'Core' },
      { name: 'TypeScript', slug: 'typescript', radius: 0.3, category: 'Core' },
    ],
  },
  {
    radius: 7,
    tiltX: -0.2,
    tiltZ: 0.4,
    speed: 0.1,
    category: 'Frameworks',
    nodes: [
      { name: 'Next.js', slug: 'nextdotjs', radius: 0.3, category: 'Frameworks' },
      { name: 'Tailwind', slug: 'tailwindcss', radius: 0.25, category: 'Frameworks' },
      { name: 'Node.js', slug: 'nodedotjs', radius: 0.28, category: 'Frameworks' },
      { name: 'Git', slug: 'git', radius: 0.28, category: 'Frameworks' },
    ],
  },
  {
    radius: 10,
    tiltX: 0.4,
    tiltZ: -0.3,
    speed: 0.07,
    category: 'Data & Infra',
    nodes: [
      { name: 'PostgreSQL', slug: 'postgresql', radius: 0.3, category: 'Data' },
      { name: 'Docker', slug: 'docker', radius: 0.28, category: 'Infra' },
      { name: 'AWS', slug: 'amazonaws', radius: 0.3, category: 'Infra' },
      { name: 'TensorFlow', slug: 'tensorflow', radius: 0.3, category: 'ML' },
    ],
  },
  {
    radius: 13,
    tiltX: -0.3,
    tiltZ: 0.2,
    speed: 0.04,
    category: 'Design & Exploration',
    nodes: [
      { name: 'Figma', slug: 'figma', radius: 0.25, category: 'Design' },
      { name: 'PyTorch', slug: 'pytorch', radius: 0.28, category: 'ML' },
      { name: 'Linux', slug: 'linux', radius: 0.25, category: 'Systems' },
      { name: 'GitHub', slug: 'github', radius: 0.28, category: 'Tools' },
    ],
  },
]

/* ─── Orbital Ring Component ─── */
function OrbitalRing({ ring }: { ring: RingData; ringIndex: number }) {
  const ringRef = useRef<THREE.Group>(null)
  const reduced = useReducedMotion()

  useFrame(({ clock }) => {
    if (reduced || !ringRef.current) return
    ringRef.current.rotation.y = clock.getElapsedTime() * ring.speed
  })

  const nodePositions = useMemo(() => {
    return ring.nodes.map((_, i) => {
      const angle = (i / ring.nodes.length) * Math.PI * 2
      return {
        x: Math.cos(angle) * ring.radius,
        z: Math.sin(angle) * ring.radius,
        angle,
      }
    })
  }, [ring])

  return (
    <group
      ref={ringRef}
      rotation={[ring.tiltX, 0, ring.tiltZ]}
    >
      {/* Ring line */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[ring.radius, 0.015, 16, 128]} />
        <meshBasicMaterial color="#FAFAFA" transparent opacity={0.06} />
      </mesh>

      {/* Skill Nodes */}
      {ring.nodes.map((node, i) => (
        <group
          key={node.name}
          position={[nodePositions[i].x, 0, nodePositions[i].z]}
        >
          {/* Glow halo */}
          <mesh>
            <sphereGeometry args={[node.radius * 2.5, 16, 16]} />
            <meshBasicMaterial color="#FAFAFA" transparent opacity={0.04} />
          </mesh>

          {/* Core sphere */}
          <mesh>
            <sphereGeometry args={[node.radius, 16, 16]} />
            <meshBasicMaterial color="#FAFAFA" transparent opacity={0.85} />
          </mesh>

          {/* Icon */}
          <Html center zIndexRange={[10, 20]} style={{ pointerEvents: 'none' }}>
            <div className="flex flex-col items-center gap-1">
              <SimpleIcon
                slug={node.slug}
                size={20}
                className="text-[#FAFAFA] opacity-85"
              />
              <span className="text-[0.625rem] font-medium tracking-[0.04em] text-[#FAFAFA] opacity-70 whitespace-nowrap">
                {node.name}
              </span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}

/* ─── Central Hub ─── */
function CentralHub() {
  const meshRef = useRef<THREE.Mesh>(null)
  const reduced = useReducedMotion()

  useFrame(({ clock }) => {
    if (reduced || !meshRef.current) return
    const material = meshRef.current.material as THREE.MeshBasicMaterial
    material.opacity = 0.6 + 0.1 * Math.sin(clock.getElapsedTime() * 2)
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial color="#FAFAFA" transparent opacity={0.6} />
    </mesh>
  )
}

/* ─── Star Field ─── */
function StarField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 30 + Math.random() * 20
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [count])

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#A1A1AA"
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Galaxy Scene ─── */
function GalaxyScene() {
  const groupRef = useRef<THREE.Group>(null)
  const mouseRef = useMousePosition()
  const reduced = useReducedMotion()

  useFrame(() => {
    if (reduced || !groupRef.current) return
    // Mouse influence
    const targetRotX = mouseRef.current.y * 0.15
    const targetRotY = mouseRef.current.x * 0.15
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03
  })

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <CentralHub />
      {rings.map((ring, i) => (
        <OrbitalRing key={i} ring={ring} ringIndex={i} />
      ))}
      <StarField count={200} />
    </group>
  )
}

/* ─── Main Skills Galaxy Section ─── */
export function SkillsGalaxySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { ref: canvasContainerRef, visible } = useCanvasVisibility()

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    })

    return () => st.kill()
  }, [])

  return (
    <section ref={sectionRef} id="universe" className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas */}
      <div ref={canvasContainerRef} className="absolute inset-0 z-[1]">
        <Canvas
          camera={{ position: [0, 8, 25], fov: 50, near: 0.1, far: 1000 }}
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
          frameloop={visible ? 'always' : 'demand'}
          style={{ background: 'transparent' }}
        >
          <GalaxyScene />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="h-full max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 py-12">
          <ChapterLabel number="CHAPTER 02" title="THE EXPLORER" />

          <motion.h2
            className="mt-6 font-serif text-[1.75rem] md:text-[3rem] leading-[1.1] tracking-[-0.01em] text-[#FAFAFA]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            My Universe
          </motion.h2>

          <motion.p
            className="mt-4 max-w-[400px] text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            Technologies I&apos;ve explored, tools I&apos;ve wielded, and the ever-expanding ecosystem of my curiosity.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
