"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Breadcrumb, BreadcrumbItem } from "./breadcrumb"
import { Button } from "./button"
import { Badge } from "./badge"

export interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb?: BreadcrumbItem[]
  actions?: React.ReactNode
  status?: {
    label: string
    variant: "default" | "secondary" | "destructive" | "outline"
  }
  className?: string
}

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
  status,
  className
}: PageHeaderProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* Breadcrumb */}
      {breadcrumb && breadcrumb.length > 0 && (
        <Breadcrumb items={breadcrumb} />
      )}
      
      {/* Header Content */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            {status && (
              <Badge variant={status.variant}>
                {status.label}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
        
        {/* Actions */}
        {actions && (
          <div className="flex items-center space-x-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  )
}
