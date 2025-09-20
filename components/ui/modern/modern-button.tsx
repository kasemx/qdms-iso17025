/**
 * Modern Button Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun modern button
 */

import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { modernButtonVariants, modernAnimations } from '@/lib/modern-design-utils'
import { Loader2 } from 'lucide-react'

export interface ModernButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof modernButtonVariants
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  children: React.ReactNode
  asChild?: boolean
}

const sizeVariants = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg'
}

export const ModernButton = React.forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md',
    loading = false,
    icon,
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseClasses = "font-medium rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
    
    return (
      <Button
        className={cn(
          baseClasses,
          modernButtonVariants[variant],
          sizeVariants[size],
          modernAnimations.transition,
          className
        )}
        disabled={disabled || loading}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!loading && icon && icon}
        {children}
      </Button>
    )
  }
)

ModernButton.displayName = "ModernButton"