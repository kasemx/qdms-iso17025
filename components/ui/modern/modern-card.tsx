/**
 * Modern Card Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun glass morphism card
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { modernCardVariants, modernAnimations } from '@/lib/modern-design-utils'

export interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof modernCardVariants
  hover?: boolean
  children: React.ReactNode
}

export const ModernCard = React.forwardRef<HTMLDivElement, ModernCardProps>(
  ({ className, variant = 'glass', hover = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          modernCardVariants[variant],
          hover && "hover:transform hover:scale-102",
          modernAnimations.transition,
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

ModernCard.displayName = "ModernCard"