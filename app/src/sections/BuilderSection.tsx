import { motion } from 'framer-motion'
import { ExternalLink, Search, Lightbulb, Zap } from 'lucide-react'
import { ChapterLabel } from '@/components/ChapterLabel'
import { Card } from '@/components/Card'
import { Tag } from '@/components/Tag'
import { Button } from '@/components/Button'
import { Timeline } from '@/components/Timeline'

const roadmapItems = [
  {
    label: 'PHASE 01',
    title: 'Core Platform',
    description: 'Resume parsing, skill extraction, candidate-job matching algorithm, basic recruiter dashboard.',
    status: 'active' as const,
  },
  {
    label: 'PHASE 02',
    title: 'Intelligence Layer',
    description: 'LLM-powered candidate scoring, automated interview scheduling, feedback loop for match quality.',
    status: 'upcoming' as const,
  },
  {
    label: 'PHASE 03',
    title: 'Autonomous Recruitment',
    description: 'End-to-end autonomous hiring agent. Sourcing, screening, interviewing, and onboarding \u2014 orchestrated by AI.',
    status: 'future' as const,
  },
]

export function BuilderSection() {
  return (
    <section id="builds" className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <ChapterLabel number="CHAPTER 03" title="THE BUILDER" />

        {/* Hero Block */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">
          {/* Text */}
          <div className="order-2 lg:order-1">
            <motion.span
              className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#52525B] block"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              FEATURED PROJECT
            </motion.span>

            <motion.h2
              className="mt-3 font-serif text-[2rem] md:text-[2.75rem] leading-[1.15] tracking-[-0.01em] text-[#FAFAFA]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              TalentIQ
            </motion.h2>

            <motion.p
              className="mt-2 text-[1.125rem] md:text-[1.375rem] font-medium text-[#A1A1AA]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              AI-Powered Recruitment Intelligence
            </motion.p>

            <motion.p
              className="mt-4 text-[0.875rem] md:text-[1rem] leading-[1.65] text-[#A1A1AA] max-w-[520px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              TalentIQ is an intelligent recruitment platform that uses AI to match candidates with opportunities. It analyzes resumes, evaluates skill fit, and streamlines the hiring process &mdash; helping recruiters find the right talent faster and helping candidates discover roles where they&apos;ll truly thrive.
            </motion.p>

            <motion.div
              className="mt-6 flex items-center gap-4 flex-wrap"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#222222] bg-[rgba(250,250,250,0.05)]">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-[#FAFAFA]"
                  style={{ animation: 'status-pulse 2s ease-in-out infinite' }}
                />
                <span className="text-[0.75rem] tracking-[0.04em] text-[#A1A1AA]">IN DEVELOPMENT</span>
              </div>

              <Button variant="ghost" href="https://github.com/bvr4j/TalentIQ" icon={<ExternalLink size={14} />}>
                View on GitHub
              </Button>
            </motion.div>
          </div>

          {/* Product Mockup Placeholder */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="relative border border-[#222222] rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A0A0A to-[#111111] shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_72px_rgba(0,0,0,0.6)] hover:-translate-y-1 transition-all duration-400 ease-smooth aspect-[16/10] flex items-center justify-center group">
              {/* Abstract dashboard UI */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-1/4 h-full border-r border-[#222222]">
                  <div className="p-4 space-y-3">
                    <div className="w-16 h-2 bg-[#222222] rounded" />
                    <div className="w-20 h-2 bg-[#222222] rounded" />
                    <div className="w-14 h-2 bg-[#222222] rounded" />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-3/4 h-full p-4">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#111111] rounded-lg p-3 border border-[#222222]">
                        <div className="w-8 h-8 rounded-full bg-[#222222] mb-2" />
                        <div className="w-12 h-2 bg-[#222222] rounded mb-1" />
                        <div className="w-8 h-2 bg-[#222222] rounded" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3 bg-[#111111] rounded-lg p-3 border border-[#222222]">
                        <div className="w-8 h-8 rounded-full bg-[#222222]" />
                        <div className="flex-1">
                          <div className="w-20 h-2 bg-[#222222] rounded mb-1" />
                          <div className="w-12 h-2 bg-[#222222] rounded" />
                        </div>
                        <div className="w-10 h-6 rounded-full bg-[#222222]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center branding */}
              <div className="relative z-10 text-center">
                <h3 className="font-serif text-3xl md:text-4xl text-[#FAFAFA] mb-2">TalentIQ</h3>
                <p className="text-[0.75rem] tracking-[0.1em] uppercase text-[#52525B]">Improving Recruitment Processes With AI</p>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(250,250,250,0.02)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            </div>
          </motion.div>
        </div>

        {/* Info Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card delay={0}>
            <Search size={24} className="text-[#52525B] mb-4" />
            <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-3">The Problem</h3>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA]">
              Recruitment is broken. Recipients drown in applications. Candidates never hear back. The best matches are missed because keyword filters can&apos;t understand potential. Hiring becomes a numbers game instead of a human connection.
            </p>
          </Card>

          <Card delay={0.15}>
            <Lightbulb size={24} className="text-[#52525B] mb-4" />
            <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-3">The Vision</h3>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA]">
              What if AI could understand not just what a candidate has done, but what they&apos;re capable of? What if recruitment felt less like filtering and more like matchmaking? TalentIQ was born from this question.
            </p>
          </Card>

          <Card delay={0.3}>
            <Zap size={24} className="text-[#52525B] mb-4" />
            <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-3">The Solution</h3>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA]">
              An AI recruitment agent that reads between the lines of resumes, understands job requirements contextually, and surfaces matches based on potential &mdash; not just keywords. Built with modern AI/ML and a focus on real-world hiring workflows.
            </p>
          </Card>
        </div>

        {/* Tech Stack */}
        <div className="mt-20">
          <motion.span
            className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#52525B] block text-center mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            BUILT WITH
          </motion.span>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {['React', 'Next.js', 'TypeScript', 'Python', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'AWS'].map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
              >
                <Tag>{tech}</Tag>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Roadmap */}
        <div className="mt-24 max-w-[600px] mx-auto">
          <motion.h3
            className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Where It&apos;s Headed
          </motion.h3>
          <Timeline items={roadmapItems} />
        </div>
      </div>
    </section>
  )
}
