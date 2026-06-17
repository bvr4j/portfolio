import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Card({ children, className, delay = 0 }: CardProps) {
  return (
    <motion.div
      className={cn(
        'bg-[#111111] border border-[#222222] rounded-2xl p-6',
        'transition-all duration-200 ease-smooth',
        'hover:border-[#333333] hover:bg-[#1A1A1A]',
        'hover:shadow-[0_0_40px_rgba(250,250,250,0.03)]',
        className
      )}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  )
}
