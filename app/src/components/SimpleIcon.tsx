import * as icons from 'simple-icons'

interface SimpleIconProps {
  slug: string
  size?: number
  className?: string
}

export function SimpleIcon({ slug, size = 24, className = '' }: SimpleIconProps) {
  const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())}` as keyof typeof icons
  const icon = icons[iconKey]

  if (!icon) {
    return <span className={className}>{slug}</span>
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  )
}
