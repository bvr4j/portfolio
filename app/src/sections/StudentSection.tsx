import { motion } from 'framer-motion'
import { ChapterLabel } from '@/components/ChapterLabel'
import { Card } from '@/components/Card'
import { Tag } from '@/components/Tag'
import { Timeline } from '@/components/Timeline'

const journeyItems = [
  {
    title: 'Curiosity',
    description: 'The questions came first. Why do machines learn? How do drones navigate? What makes AI autonomous?',
  },
  {
    title: 'Learning',
    description: 'Formal education at Marwadi University provided the foundation. Algorithms, data structures, neural networks.',
  },
  {
    title: 'Experimentation',
    description: 'Beyond the classroom \u2014 workshops, hackathons, late-night builds. Applying theory to real problems.',
  },
  {
    title: 'Building',
    description: 'TalentIQ and beyond. Turning curiosity into products. Learning by shipping, failing, and iterating.',
  },
]

export function StudentSection() {
  return (
    <section id="journey" className="relative w-full py-24 md:py-32 lg:py-40">
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Chapter Label */}
        <ChapterLabel number="CHAPTER 01" title="THE STUDENT" />

        {/* Opening Quote */}
        <motion.blockquote
          className="mt-16 max-w-[720px] mx-auto text-center font-serif italic text-[1.25rem] md:text-[1.75rem] leading-[1.4] tracking-[0.01em] text-[#FAFAFA]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          &ldquo;I didn&rsquo;t choose technology. I chose the questions that led me to it.&rdquo;
        </motion.blockquote>

        {/* Narrative Body */}
        <div className="mt-12 max-w-[720px] mx-auto flex flex-col gap-4">
          {[
            "My journey started at Marwadi University, where I'm pursuing a B.Tech in Computer Science with a specialization in AI and Machine Learning. But classrooms and lectures were never the destination \u2014 they were the starting point.",
            "What fascinated me wasn't just writing code or training models. It was watching intelligence take shape \u2014 seeing algorithms learn, adapt, and eventually make decisions. That curiosity pulled me beyond the curriculum into workshops, competitions, and late-night experiments.",
            "I realized that true learning doesn't happen in syllabi. It happens when you take what you know, apply it to something you don't, and wrestle with the gap between them.",
          ].map((text, i) => (
            <motion.p
              key={i}
              className="text-[1rem] leading-[1.7] text-[#A1A1AA]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
            >
              {text}
            </motion.p>
          ))}
        </div>

        {/* Education Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card delay={0}>
            <span className="text-[0.6875rem] tracking-[0.04em] text-[#52525B] block mb-3">
              B.TECH &middot; 2022 &mdash; PRESENT
            </span>
            <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-2">
              Marwadi University
            </h3>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA] mb-2">
              B.Tech in Computer Science and Engineering (AI &amp; ML)
            </p>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA] mb-4">
              Core foundations in computer science with deep specialization in artificial intelligence, machine learning, and intelligent systems.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'Machine Learning', 'Deep Learning', 'Data Structures'].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card>

          <Card delay={0.15}>
            <span className="text-[0.6875rem] tracking-[0.04em] text-[#52525B] block mb-3">
              SPECIALIZED PROGRAM
            </span>
            <h3 className="text-[1.125rem] md:text-[1.375rem] font-medium text-[#FAFAFA] mb-2">
              Product Management &amp; Agentic AI
            </h3>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA] italic mb-2">
              Vishlesan I-Hub, IIT Patna &times; Masai
            </p>
            <p className="text-[0.8125rem] md:text-[0.9375rem] leading-relaxed text-[#A1A1AA] mb-4">
              An intensive program bridging product thinking with cutting-edge AI. Learning to build products that leverage LLMs, autonomous agents, and intelligent workflows.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Product Management', 'Agentic AI', 'LLMs', 'Product Strategy'].map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          </Card>
        </div>

        {/* Journey Timeline */}
        <div className="mt-24 max-w-[600px] mx-auto">
          <Timeline items={journeyItems} />
        </div>
      </div>
    </section>
  )
}
