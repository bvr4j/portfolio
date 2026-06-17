import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChapterLabel } from '@/components/ChapterLabel'
import { Tag } from '@/components/Tag'

const focusAreas = [
  'Artificial Intelligence',
  'Robotics',
  'Agentic Systems',
  'Product Innovation',
  'Cybersecurity',
  'Real-World Technology',
]

export function VisionSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section
      ref={sectionRef}
      id="vision"
      className="relative w-full min-h-[80vh] py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Background with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <div className="absolute inset-0 scale-110">
          {/* Abstract future-horizon background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#050505] to-[#050505]" />
          
          {/* Subtle horizon line and geometric structures */}
          <div className="absolute bottom-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1A1A1A] to-transparent" />
          
          {/* Faint geometric towers */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute bottom-[30%] bg-[#0F0F0F] border border-[#1A1A1A]"
              style={{
                left: `${10 + i * 16}%`,
                width: `${2 + Math.random() * 3}px`,
                height: `${40 + Math.random() * 80}px`,
                opacity: 0.3 + Math.random() * 0.2,
              }}
            />
          ))}

          {/* Constellation dots */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full bg-[#333333]"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${10 + Math.random() * 40}%`,
                opacity: 0.2 + Math.random() * 0.3,
              }}
            />
          ))}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-[720px] mx-auto px-5 md:px-8 lg:px-12 text-center">
        <ChapterLabel number="CHAPTER 05" title="FUTURE VISION" centered />

        <motion.h2
          className="mt-16 font-serif text-[1.75rem] md:text-[3rem] leading-[1.1] tracking-[-0.01em] text-[#FAFAFA]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The Horizon Ahead
        </motion.h2>

        <motion.p
          className="mt-6 text-[1rem] md:text-[1.0625rem] leading-[1.7] text-[#A1A1AA]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          I don&apos;t have a five-year plan. I have a five-year question: how do we build intelligent systems that genuinely serve humanity? The answer will unfold through projects, collaborations, failures, and breakthroughs. What I know for certain is this &mdash; I want to be at the intersection of AI, robotics, and products that matter.
        </motion.p>

        {/* Focus Areas */}
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {focusAreas.map((area, i) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <Tag size="lg">{area}</Tag>
            </motion.div>
          ))}
        </motion.div>

        {/* Ambition Text */}
        <motion.p
          className="mt-12 font-serif italic text-[1.25rem] md:text-[1.75rem] leading-[1.4] tracking-[0.01em] text-[#FAFAFA]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          &ldquo;The future isn&apos;t something that happens to you. It&apos;s something you build.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
