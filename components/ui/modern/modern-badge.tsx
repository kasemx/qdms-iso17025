/**
 * Modern Badge Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun badge
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { statusBadgeVariants, modernAnimations } from '@/lib/modern-design-utils'

export interface ModernBadgeProps {
  children: React.ReactNode
  variant?: keyof typeof statusBadgeVariants
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeVariants = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base'
}

export const ModernBadge: React.FC<ModernBadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        statusBadgeVariants[variant],
        sizeVariants[size],
        modernAnimations.transition,
        "hover:scale-105",
        className
      )}
    >
      {children}
    </span>
  )
}