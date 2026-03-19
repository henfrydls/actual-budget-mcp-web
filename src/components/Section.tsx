import { useReveal } from '../hooks/useReveal'
import type { ReactNode, HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export function Section({ children, className = '', ...props }: SectionProps) {
  const ref = useReveal()
  return (
    <section
      ref={ref}
      className={`reveal max-w-[680px] mx-auto px-6 ${className}`}
      {...props}
    >
      {children}
    </section>
  )
}
