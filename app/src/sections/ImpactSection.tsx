import { motion } from 'framer-motion'
import { Briefcase, Users, Trophy, Rocket } from 'lucide-react'
import { ChapterLabel } from '@/components/ChapterLabel'
import { Card } from '@/components/Card'

const opportunities = [
  {
    icon: Briefcase,
    title: 'Internships',
    description: 'Seeking hands-on experience in AI/ML, product, or full-stack roles. Startups and research labs excite me the most.',
  },
  {
    icon: Users,
    title: 'Collaborations',
    description: "Open to building with others. Whether it's a side project, open-source contribution, or startup idea \u2014 let's talk.",
  },
  {
    icon: Trophy,
    title: 'Hackathons',
    description: 'I thrive under constraints and deadlines. Always looking for competitions that push me to ship fast and think creatively.',
  },
  {
    icon: Rocket,
    title: 'Innovation',
    description: "Interested in research, emerging tech, and experimental projects. If it's at the edge of what's possible, I want in.",
  },
]

export function ImpactSection() {
  return (
    <section className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="max-w-[720px] mx-auto text-center">
          <ChapterLabel number="CHAPTER 04" title="IMPACT" centered />

          <motion.h2
            className="mt-16 font-serif text-[1.75rem] md:text-[3rem] leading-[1.1] tracking-[-0.01em] text-[#FAFAFA]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            What I&apos;m Looking For
          </motion.h2>

          <motion.p
            className="mt-4 text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            I&apos;m not just building projects &mdash; I&apos;m building a path. Every collaboration, every challenge, every late-night debugging session is a step toward something bigger. Here&apos;s how I want to grow next.
          </motion.p>
        </div>

        {/* Opportunity Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {opportunities.map((opp, i) => {
            const Icon = opp.icon
            return (
              <Card key={opp.title} delay={i * 0.1} className="text-center">
                <Icon size={28} className="text-[#A1A1AA] mx-auto mb-4" />
                <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-3">
                  {opp.title}
                </h3>
                <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA]">
                  {opp.description}
                </p>
              </Card>
            )
          })}
        </div>

        {/* Closing Statement */}
        <motion.p
          className="mt-16 max-w-[720px] mx-auto text-center font-serif italic text-[1.25rem] md:text-[1.75rem] leading-[1.4] tracking-[0.01em] text-[#FAFAFA]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          &ldquo;If you&apos;re working on something interesting, I want to hear about it.&rdquo;
        </motion.p>
      </div>
    </section>
  )
}
