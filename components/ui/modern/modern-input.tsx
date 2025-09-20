/**
 * Modern Input Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun modern input
 */

import React from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { modernAnimations, modernFocusRing } from '@/lib/modern-design-utils'

export interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
  error?: string
}

export const ModernInput = React.forwardRef<HTMLInputElement, ModernInputProps>(
  ({ className, icon, error, ...props }, ref) => {
    const baseClasses = "border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl focus:bg-white dark:focus:bg-gray-800 px-4 py-3 placeholder:text-gray-400"
    
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <Input
          ref={ref}
          className={cn(
            baseClasses,
            modernAnimations.transition,
            modernFocusRing,
            icon && "pl-12",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
)

ModernInput.displayName = "ModernInput"