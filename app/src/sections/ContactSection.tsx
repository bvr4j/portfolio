import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChapterLabel } from '@/components/ChapterLabel'
import { SocialLinksBar } from '@/components/SocialLinksBar'
import { useClipboard } from '@/hooks/useClipboard'

export function ContactSection() {
  const { copy } = useClipboard()
  const [showTooltip, setShowTooltip] = useState(false)

  const handleEmailClick = () => {
    copy('panwartanish@outlook.com')
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 1500)
  }

  return (
    <section
      id="connect"
      className="relative w-full min-h-[60vh] py-24 md:py-32 lg:py-40"
      style={{
        background: 'radial-gradient(ellipse at center, #0A0A0A 0%, #050505 70%)',
        animation: 'ambientDrift 20s ease-in-out infinite',
      }}
    >
      <div className="max-w-[600px] mx-auto px-5 md:px-8 lg:px-12 text-center">
        <ChapterLabel number="CHAPTER 06" title="THE JOURNEY CONTINUES" centered />

        <motion.h2
          className="mt-16 font-serif text-[1.75rem] md:text-[2.5rem] leading-[1.15] tracking-[-0.01em] text-[#FAFAFA]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          Let&apos;s Build Something
        </motion.h2>

        <motion.p
          className="mt-4 text-[0.875rem] md:text-[1rem] leading-[1.65] text-[#A1A1AA] max-w-[480px] mx-auto"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        >
          Whether it&apos;s a project, an idea, or just a conversation &mdash; I&apos;d love to hear from you.
        </motion.p>

        {/* Social Links */}
        <div className="mt-10 flex justify-center">
          <SocialLinksBar delayOffset={0.5} />
        </div>

        {/* Email */}
        <motion.div
          className="mt-6 relative inline-block"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
        >
          <button
            onClick={handleEmailClick}
            className="text-[0.8125rem] md:text-[0.9375rem] text-[#52525B] hover:text-[#A1A1AA] transition-colors duration-200 cursor-pointer"
          >
            panwartanish@outlook.com
          </button>

          <AnimatePresence>
            {showTooltip && (
              <motion.span
                className="absolute -top-8 left-1/2 -translate-x-1/2 text-[0.6875rem] text-[#FAFAFA] bg-[#1A1A1A] border border-[#222222] px-2 py-1 rounded whitespace-nowrap"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Final Message */}
        <motion.p
          className="mt-12 text-[0.875rem] md:text-[1.0625rem] tracking-[0.02em] text-[#52525B]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1], delay: 1 }}
        >
          The journey continues.
        </motion.p>
      </div>
    </section>
  )
}
