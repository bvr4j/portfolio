import { motion } from 'framer-motion'

interface TimelineItem {
  label?: string
  title: string
  description: string
  status?: 'active' | 'upcoming' | 'future'
}

interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className = '' }: TimelineProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Vertical connector line */}
      <motion.div
        className="absolute left-[5px] top-0 bottom-0 w-px origin-top"
        style={{
          background: 'linear-gradient(to bottom, transparent, #222222, transparent)',
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className="flex flex-col gap-12">
        {items.map((item, i) => (
          <motion.div
            key={i}
            className="flex gap-6 items-start"
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: i * 0.2,
            }}
          >
            {/* Node */}
            <div className="relative flex-shrink-0 mt-1.5">
              <div
                className={`w-3 h-3 rounded-full border-2 ${
                  item.status === 'active'
                    ? 'bg-[#FAFAFA] border-[#FAFAFA]'
                    : item.status === 'upcoming'
                    ? 'bg-transparent border-[#222222]'
                    : 'bg-transparent border-[#222222] border-dashed'
                }`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {item.label && (
                <span className="text-[0.6875rem] tracking-[0.04em] text-[#52525B] block mb-1">
                  {item.label}
                </span>
              )}
              <h4 className="text-[0.8125rem] font-medium tracking-[0.02em] text-[#FAFAFA] mb-1">
                {item.title}
              </h4>
              <p className="text-[0.8125rem] leading-relaxed text-[#A1A1AA]">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
