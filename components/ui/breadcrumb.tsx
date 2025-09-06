"use client"

import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}>
      <a
        href="/dashboard"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Ana Sayfa</span>
      </a>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4" />
          {item.href ? (
            <a
              href={item.href}
              className="flex items-center hover:text-foreground transition-colors"
            >
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.title}
            </a>
          ) : (
            <span className="flex items-center text-foreground font-medium">
              {item.icon && <item.icon className="h-4 w-4 mr-1" />}
              {item.title}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}