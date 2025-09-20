/**
 * Modern Loading Spinner Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun loading component
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ModernLoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

const sizeVariants = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8'
}

const textSizeVariants = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
}

export const ModernLoadingSpinner: React.FC<ModernLoadingSpinnerProps> = ({
  size = 'md',
  className,
  text
}) => {
  return (
    <div className={cn("flex items-center justify-center space-x-2", className)}>
      <Loader2 className={cn("animate-spin text-blue-600", sizeVariants[size])} />
      {text && (
        <span className={cn("text-gray-600 dark:text-gray-400", textSizeVariants[size])}>
          {text}
        </span>
      )}
    </div>
  )
}

// Shimmer Loading Component
export interface ModernShimmerProps {
  className?: string
  lines?: number
}

export const ModernShimmer: React.FC<ModernShimmerProps> = ({
  className,
  lines = 3
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-lg animate-pulse"
          style={{
            width: `${Math.random() * 40 + 60}%`
          }}
        />
      ))}
    </div>
  )
}

// Loading Dots Component
export const ModernLoadingDots: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("flex space-x-1", className)}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-2 w-2 bg-blue-600 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  )
}