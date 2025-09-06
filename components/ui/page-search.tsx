"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter, 
  X, 
  ArrowRight,
  Loader2,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"

export interface PageSearchFilter {
  id: string
  label: string
  type: "select" | "checkbox" | "date"
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface PageSearchItem {
  id: string
  title: string
  description?: string
  status?: string
  date?: string
  metadata?: Record<string, any>
}

export interface PageSearchProps {
  items: PageSearchItem[]
  onSearch?: (query: string, filters: Record<string, any>) => void
  onItemSelect?: (item: PageSearchItem) => void
  filters?: PageSearchFilter[]
  placeholder?: string
  className?: string
  size?: "sm" | "md" | "lg"
  showFilters?: boolean
  loading?: boolean
}

export function PageSearch({
  items,
  onSearch,
  onItemSelect,
  filters = [],
  placeholder = "Bu sayfada ara...",
  className,
  size = "md",
  showFilters = true,
  loading = false
}: PageSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [filteredItems, setFilteredItems] = useState<PageSearchItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Filter items based on query and filters
  useEffect(() => {
    let filtered = items

    // Apply text search
    if (query.trim()) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Apply filters
    Object.entries(activeFilters).forEach(([filterId, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const filter = filters.find(f => f.id === filterId)
        if (filter) {
          if (filter.type === "select") {
            filtered = filtered.filter(item => {
              const itemValue = item.metadata?.[filterId] || item[filterId as keyof PageSearchItem]
              return itemValue === value
            })
          } else if (filter.type === "checkbox") {
            filtered = filtered.filter(item => {
              const itemValue = item.metadata?.[filterId] || item[filterId as keyof PageSearchItem]
              return Array.isArray(value) ? value.includes(itemValue) : itemValue === value
            })
          } else if (filter.type === "date") {
            filtered = filtered.filter(item => {
              const itemDate = item.metadata?.[filterId] || item[filterId as keyof PageSearchItem]
              if (!itemDate) return false
              return new Date(itemDate).toDateString() === new Date(value).toDateString()
            })
          }
        }
      }
    })

    setFilteredItems(filtered)
  }, [query, activeFilters, items, filters])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        e.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      if (e.key === "Escape") {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query, activeFilters)
    }
    setIsOpen(false)
  }

  const handleItemSelect = (item: PageSearchItem) => {
    if (onItemSelect) {
      onItemSelect(item)
    }
    setIsOpen(false)
    setQuery("")
  }

  const handleFilterChange = (filterId: string, value: any) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: value
    }))
  }

  const clearFilters = () => {
    setActiveFilters({})
  }

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value !== undefined && value !== null && value !== ""
    ).length
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
      case "completed":
      case "approved":
        return <CheckCircle className="h-3 w-3 text-green-600" />
      case "pending":
      case "in_progress":
        return <Clock className="h-3 w-3 text-yellow-600" />
      case "error":
      case "failed":
      case "rejected":
        return <AlertTriangle className="h-3 w-3 text-red-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      completed: "bg-green-100 text-green-800",
      approved: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      error: "bg-red-100 text-red-800",
      failed: "bg-red-100 text-red-800",
      rejected: "bg-red-100 text-red-800"
    }

    return (
      <Badge 
        variant="outline" 
        className={cn(
          "text-xs",
          statusColors[status?.toLowerCase() as keyof typeof statusColors] || "bg-gray-100 text-gray-800"
        )}
      >
        {status}
      </Badge>
    )
  }

  const sizeClasses = {
    sm: "h-8 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base"
  }

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  }

  return (
    <div className={cn("relative", className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              iconSizes[size]
            )} />
            <Input
              ref={inputRef}
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleSearch()
                }
              }}
              className={cn(
                "pl-10 pr-20",
                sizeClasses[size]
              )}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-1">
              {showFilters && filters.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className="h-6 px-2"
                >
                  <Filter className="h-3 w-3 mr-1" />
                  {getActiveFilterCount() > 0 && (
                    <Badge variant="secondary" className="ml-1 h-4 w-4 p-0 text-xs">
                      {getActiveFilterCount()}
                    </Badge>
                  )}
                </Button>
              )}
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                Ctrl+F
              </Badge>
            </div>
          </div>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Ara..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {loading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-muted-foreground">Aranıyor...</span>
                </div>
              )}
              
              {!loading && filteredItems.length === 0 && query && (
                <CommandEmpty>
                  <div className="text-center p-4">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      "{query}" için sonuç bulunamadı
                    </p>
                  </div>
                </CommandEmpty>
              )}

              {!loading && filteredItems.length > 0 && (
                <CommandGroup>
                  {filteredItems.slice(0, 10).map((item) => (
                    <CommandItem
                      key={item.id}
                      onSelect={() => handleItemSelect(item)}
                      className="flex items-center space-x-3 p-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="text-sm font-medium truncate">
                            {item.title}
                          </p>
                          {item.status && getStatusIcon(item.status)}
                        </div>
                        {item.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {item.description}
                          </p>
                        )}
                        <div className="flex items-center space-x-2 mt-1">
                          {item.status && getStatusBadge(item.status)}
                          {item.date && (
                            <span className="text-xs text-muted-foreground">
                              {new Date(item.date).toLocaleDateString("tr-TR")}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && query && filteredItems.length > 10 && (
                <CommandGroup>
                  <CommandItem disabled className="text-center p-2">
                    <span className="text-xs text-muted-foreground">
                      {filteredItems.length - 10} sonuç daha...
                    </span>
                  </CommandItem>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Filter Panel */}
      {showFilterPanel && filters.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium">Filtreler</h3>
              <div className="flex items-center space-x-2">
                {getActiveFilterCount() > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-6 px-2 text-xs"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Temizle
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilterPanel(false)}
                  className="h-6 px-2 text-xs"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filters.map((filter) => (
                <div key={filter.id} className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">
                    {filter.label}
                  </label>
                  
                  {filter.type === "select" && filter.options && (
                    <Select
                      value={activeFilters[filter.id] || ""}
                      onValueChange={(value) => handleFilterChange(filter.id, value)}
                    >
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder={filter.placeholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  {filter.type === "date" && (
                    <Input
                      type="date"
                      value={activeFilters[filter.id] || ""}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="h-8 text-xs"
                    />
                  )}
                  
                  {filter.type === "checkbox" && filter.options && (
                    <div className="space-y-1">
                      {filter.options.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`${filter.id}-${option.value}`}
                            checked={activeFilters[filter.id]?.includes(option.value) || false}
                            onCheckedChange={(checked) => {
                              const currentValues = activeFilters[filter.id] || []
                              if (checked) {
                                handleFilterChange(filter.id, [...currentValues, option.value])
                              } else {
                                handleFilterChange(filter.id, currentValues.filter((v: string) => v !== option.value))
                              }
                            }}
                          />
                          <label
                            htmlFor={`${filter.id}-${option.value}`}
                            className="text-xs text-muted-foreground"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
