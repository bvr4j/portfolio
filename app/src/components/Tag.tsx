import { cn } from '@/lib/utils'

interface TagProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function Tag({ children, className, size = 'sm' }: TagProps) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-[0.6875rem]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-2 text-sm',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-[#222222]',
        'bg-[rgba(34,34,34,0.5)] text-[#A1A1AA]',
        'transition-all duration-200 ease-smooth',
        'hover:border-[#333333] hover:text-[#FAFAFA]',
        sizeClasses[size],
        className
      )}
    >
      {children}
    </span>
  )
}
