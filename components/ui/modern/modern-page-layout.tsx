/**
 * Modern Page Layout Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun sayfa layout
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { modernPageBackground, modernPageHeader, modernTypography } from '@/lib/modern-design-utils'

export interface ModernPageLayoutProps {
  title: string
  description?: string
  actions?: React.ReactNode
  children: React.ReactNode
  className?: string
  headerClassName?: string
}

export const ModernPageLayout: React.FC<ModernPageLayoutProps> = ({
  title,
  description,
  actions,
  children,
  className,
  headerClassName
}) => {
  return (
    <div className={cn(modernPageBackground, className)}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl" />
      
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className={cn(modernPageHeader, headerClassName)}>
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className={modernTypography.hero}>
                  {title}
                </h1>
                {description && (
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
              {actions && (
                <div className="flex items-center space-x-3">
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  )
}