"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export interface LoadingStateProps {
  type?: 'page' | 'grid' | 'table' | 'stats' | 'custom'
  rows?: number
  columns?: number
  className?: string
  children?: React.ReactNode
}

export function LoadingState({ 
  type = 'page', 
  rows = 4, 
  columns = 4,
  className,
  children 
}: LoadingStateProps) {
  if (children) {
    return <div className={cn("animate-pulse", className)}>{children}</div>
  }

  const renderPageLoading = () => (
    <div className={cn("space-y-6", className)}>
      {/* Header Loading */}
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Stats Grid Loading */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8 rounded" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Loading */}
      <Skeleton className="h-96 w-full rounded-lg" />
    </div>
  )

  const renderGridLoading = () => (
    <div className={cn(`grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-${Math.min(columns, 4)}`, className)}>
      {Array.from({ length: rows * columns }).map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-lg" />
      ))}
    </div>
  )

  const renderTableLoading = () => (
    <div className={cn("space-y-4", className)}>
      {/* Search/Filter Loading */}
      <div className="flex gap-4">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-24" />
      </div>
      
      {/* Table Header Loading */}
      <div className="border rounded-lg">
        <div className="p-4 border-b">
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-20" />
            ))}
          </div>
        </div>
        
        {/* Table Rows Loading */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="p-4 border-b last:border-b-0">
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderStatsLoading = () => (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-4", className)}>
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-8 rounded" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  switch (type) {
    case 'page':
      return renderPageLoading()
    case 'grid':
      return renderGridLoading()
    case 'table':
      return renderTableLoading()
    case 'stats':
      return renderStatsLoading()
    default:
      return renderPageLoading()
  }
}