"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { PageHeader, PageHeaderProps } from "@/components/ui/page-header"

export interface PageLayoutProps {
  title: string
  description?: string
  breadcrumb?: PageHeaderProps['breadcrumb']
  actions?: React.ReactNode
  status?: PageHeaderProps['status']
  children: React.ReactNode
  className?: string
  spacing?: 'default' | 'compact' | 'relaxed'
}

export function PageLayout({
  title,
  description,
  breadcrumb,
  actions,
  status,
  children,
  className,
  spacing = 'default'
}: PageLayoutProps) {
  const spacingClasses = {
    compact: 'space-y-4',
    default: 'space-y-6',
    relaxed: 'space-y-8'
  }

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      <PageHeader
        title={title}
        description={description}
        breadcrumb={breadcrumb}
        actions={actions}
        status={status}
      />
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}