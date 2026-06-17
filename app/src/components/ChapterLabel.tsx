import { motion } from 'framer-motion'

interface ChapterLabelProps {
  number: string
  title: string
  centered?: boolean
}

export function ChapterLabel({ number, title, centered = false }: ChapterLabelProps) {
  return (
    <motion.div
      className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-1.5 h-1.5 rounded-sm bg-[#222222]"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.4, ease: [0.68, -0.15, 0.265, 1.15] }}
      />
      <motion.span
        className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#52525B]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        {number}
      </motion.span>
      <motion.span
        className="text-[0.6875rem] tracking-[0.12em] uppercase text-[#A1A1AA]"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-15%' }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      >
        {title}
      </motion.span>
    </motion.div>
  )
}
