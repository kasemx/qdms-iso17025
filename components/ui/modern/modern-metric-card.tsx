/**
 * Modern Metric Card Component
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun metric card
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { ModernCard } from './modern-card'
import { metricCardColors, modernAnimations } from '@/lib/modern-design-utils'
import { TrendingUp, TrendingDown } from 'lucide-react'

export interface ModernMetricCardProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string | number
  change?: string
  changeType?: 'increase' | 'decrease' | 'neutral'
  color?: keyof typeof metricCardColors
  className?: string
}

export const ModernMetricCard: React.FC<ModernMetricCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  changeType = 'neutral',
  color = 'blue',
  className
}) => {
  const colorVariant = metricCardColors[color]
  
  const getTrendIcon = () => {
    if (changeType === 'increase') return <TrendingUp className="h-4 w-4" />
    if (changeType === 'decrease') return <TrendingDown className="h-4 w-4" />
    return null
  }

  const getTrendColor = () => {
    if (changeType === 'increase') return 'text-green-600 dark:text-green-400'
    if (changeType === 'decrease') return 'text-red-600 dark:text-red-400'
    return 'text-gray-600 dark:text-gray-400'
  }

  return (
    <ModernCard 
      className={cn(
        "p-6 group transition-all duration-300",
        modernAnimations.hover.scale,
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={cn("text-sm font-medium", getTrendColor())}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-full transition-all duration-300 group-hover:scale-110",
          colorVariant.bg,
          colorVariant.text
        )}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </ModernCard>
  )
}