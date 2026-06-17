import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const links = [
  { name: 'GitHub', href: 'https://github.com/bvr4j', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tanish-panwar-706734381', icon: Linkedin },
  { name: 'Email', href: 'mailto:panwartanish@outlook.com', icon: Mail },
]

interface SocialLinksBarProps {
  className?: string
  iconSize?: number
  delayOffset?: number
}

export function SocialLinksBar({ className = '', iconSize = 20, delayOffset = 0 }: SocialLinksBarProps) {
  return (
    <div className={`flex items-center gap-8 ${className}`}>
      {links.map((link, i) => (
        <motion.a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-[#A1A1AA] transition-colors duration-200 hover:text-[#FAFAFA]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: delayOffset + i * 0.1 }}
        >
          <link.icon size={iconSize} className="transition-colors duration-200" />
          <span className="text-[0.8125rem] tracking-[0.02em] relative">
            {link.name}
            <span className="absolute left-0 bottom-0 w-full h-px bg-[#333333] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
          </span>
        </motion.a>
      ))}
    </div>
  )
}
