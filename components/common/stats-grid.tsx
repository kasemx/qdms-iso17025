"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { LucideIcon } from "lucide-react"

export interface StatItem {
  id: string
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down' | 'neutral'
  }
  color?: string
  href?: string
}

export interface StatsGridProps {
  stats: StatItem[]
  loading?: boolean
  columns?: {
    default: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }
  className?: string
}

export function StatsGrid({ 
  stats, 
  loading = false, 
  columns = { default: 1, md: 2, lg: 4 },
  className 
}: StatsGridProps) {
  const getGridClasses = () => {
    let classes = [`grid-cols-${columns.default}`]
    
    if (columns.sm) classes.push(`sm:grid-cols-${columns.sm}`)
    if (columns.md) classes.push(`md:grid-cols-${columns.md}`)
    if (columns.lg) classes.push(`lg:grid-cols-${columns.lg}`)
    if (columns.xl) classes.push(`xl:grid-cols-${columns.xl}`)
    
    return classes.join(' ')
  }

  if (loading) {
    return (
      <div className={cn("grid gap-4", getGridClasses(), className)}>
        {Array.from({ length: Math.max(stats.length, 4) }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("grid gap-4", getGridClasses(), className)}>
      {stats.map((stat) => {
        const Icon = stat.icon
        const trendColor = stat.trend?.direction === 'up' 
          ? 'text-green-600' 
          : stat.trend?.direction === 'down' 
          ? 'text-red-600' 
          : 'text-gray-600'

        const CardWrapper = stat.href ? 'a' : 'div'
        const cardProps = stat.href ? { href: stat.href } : {}

        return (
          <Card key={stat.id} className={stat.href ? "hover:shadow-md transition-shadow cursor-pointer" : ""}>
            <CardWrapper {...cardProps}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <div className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center",
                    stat.color ? `bg-${stat.color}-100` : "bg-primary/10"
                  )}>
                    <Icon className={cn(
                      "h-4 w-4",
                      stat.color ? `text-${stat.color}-600` : "text-primary"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className={cn(
                        "text-2xl font-bold",
                        stat.color ? `text-${stat.color}-600` : "text-foreground"
                      )}>
                        {stat.value}
                      </p>
                      {stat.trend && (
                        <span className={cn("text-xs font-medium", trendColor)}>
                          {stat.trend.direction === 'up' ? '↗' : stat.trend.direction === 'down' ? '↘' : '→'} {stat.trend.value}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    {stat.description && (
                      <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                    )}
                    {stat.trend?.label && (
                      <p className={cn("text-xs mt-1", trendColor)}>
                        {stat.trend.label}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </CardWrapper>
          </Card>
        )
      })}
    </div>
  )
}