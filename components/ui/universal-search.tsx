"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Search, 
  Filter, 
  Calendar as CalendarIcon, 
  X, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  FileText,
  Users,
  Building,
  TestTube,
  Wrench,
  Shield,
  Target,
  BookOpen,
  Settings,
  ArrowRight,
  Loader2
} from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { cn } from "@/lib/utils"

export interface SearchFilter {
  id: string
  label: string
  type: "text" | "select" | "date" | "checkbox" | "multiselect"
  options?: { value: string; label: string }[]
  placeholder?: string
}

export interface SearchSuggestion {
  id: string
  title: string
  description?: string
  type: "document" | "user" | "department" | "equipment" | "calibration" | "training" | "audit"
  icon: React.ElementType
  url: string
  metadata?: Record<string, any>
}

export interface UniversalSearchProps {
  placeholder?: string
  onSearch?: (query: string, filters: Record<string, any>) => void
  onSuggestionSelect?: (suggestion: SearchSuggestion) => void
  suggestions?: SearchSuggestion[]
  filters?: SearchFilter[]
  showFilters?: boolean
  showSuggestions?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  loading?: boolean
}

export function UniversalSearch({
  placeholder = "Ara...",
  onSearch,
  onSuggestionSelect,
  suggestions = [],
  filters = [],
  showFilters = true,
  showSuggestions = true,
  className,
  size = "md",
  disabled = false,
  loading = false
}: UniversalSearchProps) {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({})
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState<SearchSuggestion[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (query.trim()) {
        const filtered = suggestions.filter(suggestion =>
          suggestion.title.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.description?.toLowerCase().includes(query.toLowerCase())
        )
        setFilteredSuggestions(filtered)
      } else {
        setFilteredSuggestions(suggestions.slice(0, 5)) // Show recent suggestions
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [query, suggestions])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
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

  const handleSearch = useCallback(() => {
    if (onSearch) {
      onSearch(query, activeFilters)
    }
    setIsOpen(false)
  }, [query, activeFilters, onSearch])

  const handleSuggestionSelect = useCallback((suggestion: SearchSuggestion) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion)
    }
    setIsOpen(false)
    setQuery("")
  }, [onSuggestionSelect])

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
                sizeClasses[size],
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
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
                Ctrl+K
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
              
              {!loading && filteredSuggestions.length === 0 && query && (
                <CommandEmpty>
                  <div className="text-center p-4">
                    <Search className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      "{query}" için sonuç bulunamadı
                    </p>
                  </div>
                </CommandEmpty>
              )}

              {!loading && filteredSuggestions.length > 0 && (
                <CommandGroup>
                  {filteredSuggestions.map((suggestion) => (
                    <CommandItem
                      key={suggestion.id}
                      onSelect={() => handleSuggestionSelect(suggestion)}
                      className="flex items-center space-x-3 p-3"
                    >
                      <suggestion.icon className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {suggestion.title}
                        </p>
                        {suggestion.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {suggestion.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-3 w-3 text-muted-foreground" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}

              {!loading && query && (
                <CommandGroup>
                  <CommandItem onSelect={handleSearch} className="flex items-center space-x-2 p-3">
                    <Search className="h-4 w-4" />
                    <span className="text-sm">
                      "{query}" için tüm sonuçları göster
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
                  
                  {filter.type === "text" && (
                    <Input
                      placeholder={filter.placeholder}
                      value={activeFilters[filter.id] || ""}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      className="h-8 text-xs"
                    />
                  )}
                  
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
                    <div className="relative">
                      <Input
                        type="date"
                        value={activeFilters[filter.id] || ""}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
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
