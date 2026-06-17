import { cn } from '@/lib/utils'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'ghost'
  href?: string
  onClick?: () => void
  className?: string
  icon?: React.ReactNode
}

export function Button({ children, variant = 'primary', href, onClick, className, icon }: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center gap-2 rounded-lg px-5 py-2.5',
    'text-[0.875rem] font-medium tracking-[0.02em]',
    'transition-all duration-200 ease-smooth',
    className
  )

  const variantClasses = {
    primary: cn(
      'bg-[#FAFAFA] text-[#050505]',
      'hover:bg-[#E5E5E5] hover:shadow-[0_0_20px_rgba(229,229,229,0.15)]'
    ),
    ghost: cn(
      'bg-transparent border border-[#222222] text-[#A1A1AA]',
      'hover:border-[#333333] hover:text-[#FAFAFA]'
    ),
  }

  const classes = cn(baseClasses, variantClasses[variant])

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        {icon}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
      {icon}
    </button>
  )
}
