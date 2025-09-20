/**
 * Modern Filter Sidebar Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun filter sidebar
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { ModernCard } from './modern-card'
import { ModernButton } from './modern-button'
import { X } from 'lucide-react'

export interface ModernFilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  className?: string
}

export const ModernFilterSidebar: React.FC<ModernFilterSidebarProps> = ({
  isOpen,
  onClose,
  title = "Filtreler",
  children,
  className
}) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <ModernCard className={cn(
          "h-full rounded-none rounded-l-2xl p-6 space-y-6 overflow-y-auto",
          className
        )}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <ModernButton 
              variant="glass" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
            </ModernButton>
          </div>
          
          {/* Content */}
          <div className="space-y-4">
            {children}
          </div>
        </ModernCard>
      </div>
    </>
  )
}

// Filter Group Component
export interface ModernFilterGroupProps {
  title: string
  children: React.ReactNode
  className?: string
}

export const ModernFilterGroup: React.FC<ModernFilterGroupProps> = ({
  title,
  children,
  className
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {title}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  )
}