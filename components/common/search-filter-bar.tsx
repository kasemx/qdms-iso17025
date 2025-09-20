"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, X, ChevronDown } from "lucide-react"

export interface FilterOption {
  label: string
  value: string
}

export interface FilterConfig {
  id: string
  label: string
  type: 'select' | 'multi-select' | 'date' | 'text'
  options?: FilterOption[]
  placeholder?: string
  value?: string | string[]
  onChange: (value: string | string[]) => void
}

export interface SearchFilterBarProps {
  searchTerm: string
  onSearchChange: (term: string) => void
  searchPlaceholder?: string
  filters?: FilterConfig[]
  showFilters?: boolean
  onToggleFilters?: () => void
  className?: string
  size?: 'sm' | 'default' | 'lg'
}

export function SearchFilterBar({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  showFilters = false,
  onToggleFilters,
  className,
  size = 'default'
}: SearchFilterBarProps) {
  const sizeClasses = {
    sm: 'text-sm',
    default: '',
    lg: 'text-lg'
  }

  const inputSizeClasses = {
    sm: 'h-8',
    default: 'h-9',
    lg: 'h-10'
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filter Toggle Row */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className={cn("pl-10", inputSizeClasses[size], sizeClasses[size])}
          />
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
              onClick={() => onSearchChange('')}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Filter Toggle Button */}
        {filters.length > 0 && onToggleFilters && (
          <Button
            variant="outline"
            size={size}
            onClick={onToggleFilters}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform",
              showFilters && "rotate-180"
            )} />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      {showFilters && filters.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
          {filters.map((filter) => (
            <div key={filter.id} className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                {filter.label}
              </label>
              
              {filter.type === 'select' && (
                <Select
                  value={filter.value as string}
                  onValueChange={(value) => filter.onChange(value)}
                >
                  <SelectTrigger className={inputSizeClasses[size]}>
                    <SelectValue placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {filter.label}</SelectItem>
                    {filter.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              {filter.type === 'text' && (
                <Input
                  placeholder={filter.placeholder || `Enter ${filter.label.toLowerCase()}`}
                  value={filter.value as string || ''}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className={inputSizeClasses[size]}
                />
              )}

              {filter.type === 'date' && (
                <Input
                  type="date"
                  value={filter.value as string || ''}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className={inputSizeClasses[size]}
                />
              )}
            </div>
          ))}
          
          {/* Clear Filters Button */}
          <div className="flex items-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onSearchChange('')
                filters.forEach(filter => filter.onChange(''))
              }}
              className="w-full"
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}