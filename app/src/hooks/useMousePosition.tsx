import { useRef, useEffect, createContext, useContext } from 'react'

interface MousePosition {
  x: number
  y: number
}

const MousePositionContext = createContext<React.MutableRefObject<MousePosition> | null>(null)

export function MousePositionProvider({ children }: { children: React.ReactNode }) {
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <MousePositionContext.Provider value={mouseRef}>
      {children}
    </MousePositionContext.Provider>
  )
}

export function useMousePosition() {
  const context = useContext(MousePositionContext)
  if (!context) {
    throw new Error('useMousePosition must be used within MousePositionProvider')
  }
  return context
}
