import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface ScrollIndicatorProps {
  visible: boolean
}

export function ScrollIndicator({ visible }: ScrollIndicatorProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
      >
        <ChevronDown size={12} className="text-[#52525B]" />
      </motion.div>
      <span className="text-[0.625rem] tracking-[0.1em] uppercase text-[#52525B]">
        Scroll
      </span>
    </motion.div>
  )
}
