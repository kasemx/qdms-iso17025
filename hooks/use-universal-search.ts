"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { SearchSuggestion } from "@/components/ui/universal-search"
import { mockData } from "@/lib/mock-data"

export interface SearchResult {
  id: string
  title: string
  description?: string
  type: string
  url: string
  metadata?: Record<string, any>
}

export interface SearchFilters {
  dateFrom?: string
  dateTo?: string
  status?: string[]
  category?: string[]
  department?: string[]
  type?: string[]
}

export function useUniversalSearch() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({})

  // Generate suggestions from mock data
  const generateSuggestions = useCallback(() => {
    const suggestions: SearchSuggestion[] = []

    // Documents
    mockData.documents.forEach(doc => {
      suggestions.push({
        id: `doc-${doc.id}`,
        title: doc.title,
        description: doc.description,
        type: "document",
        icon: require("lucide-react").FileText,
        url: `/documents/${doc.id}`,
        metadata: {
          code: doc.documentCode,
          status: doc.status,
          department: doc.department
        }
      })
    })

    // Users
    mockData.users.forEach(user => {
      suggestions.push({
        id: `user-${user.id}`,
        title: user.name,
        description: user.position,
        type: "user",
        icon: require("lucide-react").Users,
        url: `/users/${user.id}`,
        metadata: {
          department: user.department,
          email: user.email
        }
      })
    })

    // Equipment
    mockData.equipmentInventory.forEach(equipment => {
      suggestions.push({
        id: `equipment-${equipment.id}`,
        title: equipment.name,
        description: equipment.model,
        type: "equipment",
        icon: require("lucide-react").Wrench,
        url: `/iso/equipment/${equipment.id}`,
        metadata: {
          status: equipment.status,
          location: equipment.location
        }
      })
    })

    // Calibration Records
    mockData.calibrationRecords.forEach(record => {
      suggestions.push({
        id: `calibration-${record.id}`,
        title: record.equipmentName,
        description: `Kalibrasyon - ${record.certificateNumber}`,
        type: "calibration",
        icon: require("lucide-react").TestTube,
        url: `/iso/calibration-records`,
        metadata: {
          certificateNumber: record.certificateNumber,
          status: record.status,
          nextCalibration: record.nextCalibrationDate
        }
      })
    })

    // Training Plans
    mockData.trainingPlans.forEach(plan => {
      suggestions.push({
        id: `training-${plan.id}`,
        title: plan.title,
        description: plan.description,
        type: "training",
        icon: require("lucide-react").BookOpen,
        url: `/iso/training-plans`,
        metadata: {
          category: plan.category,
          status: plan.status,
          startDate: plan.startDate
        }
      })
    })

    // Audit Records
    mockData.auditRecords.forEach(audit => {
      suggestions.push({
        id: `audit-${audit.id}`,
        title: audit.auditTitle,
        description: audit.auditType,
        type: "audit",
        icon: require("lucide-react").Shield,
        url: `/iso/internal-audit`,
        metadata: {
          type: audit.auditType,
          status: audit.status,
          date: audit.auditDate
        }
      })
    })

    return suggestions
  }, [])

  // Search function
  const search = useCallback(async (searchQuery: string, searchFilters: Record<string, any> = {}) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setLoading(true)
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const allSuggestions = generateSuggestions()
      const filtered = allSuggestions.filter(suggestion => {
        const matchesQuery = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           suggestion.description?.toLowerCase().includes(searchQuery.toLowerCase())
        
        if (!matchesQuery) return false
        
        // Apply filters
        if (searchFilters.status && searchFilters.status.length > 0) {
          const suggestionStatus = suggestion.metadata?.status
          if (!suggestionStatus || !searchFilters.status.includes(suggestionStatus)) {
            return false
          }
        }
        
        if (searchFilters.category && searchFilters.category.length > 0) {
          const suggestionCategory = suggestion.metadata?.category
          if (!suggestionCategory || !searchFilters.category.includes(suggestionCategory)) {
            return false
          }
        }
        
        if (searchFilters.department && searchFilters.department.length > 0) {
          const suggestionDepartment = suggestion.metadata?.department
          if (!suggestionDepartment || !searchFilters.department.includes(suggestionDepartment)) {
            return false
          }
        }
        
        if (searchFilters.type && searchFilters.type.length > 0) {
          if (!searchFilters.type.includes(suggestion.type)) {
            return false
          }
        }
        
        if (searchFilters.dateFrom) {
          const suggestionDate = suggestion.metadata?.date || suggestion.metadata?.startDate
          if (suggestionDate && new Date(suggestionDate) < new Date(searchFilters.dateFrom)) {
            return false
          }
        }
        
        if (searchFilters.dateTo) {
          const suggestionDate = suggestion.metadata?.date || suggestion.metadata?.startDate
          if (suggestionDate && new Date(suggestionDate) > new Date(searchFilters.dateTo)) {
            return false
          }
        }
        
        return true
      })
      
      setResults(filtered.map(suggestion => ({
        id: suggestion.id,
        title: suggestion.title,
        description: suggestion.description,
        type: suggestion.type,
        url: suggestion.url,
        metadata: suggestion.metadata
      })))
      
    } catch (error) {
      console.error("Search error:", error)
      setResults([])
    } finally {
      setLoading(false)
    }
  }, [generateSuggestions])

  // Get suggestions for current query
  const getSuggestions = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions(generateSuggestions().slice(0, 5)) // Show recent suggestions
      return
    }
    
    const allSuggestions = generateSuggestions()
    const filtered = allSuggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.description?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setSuggestions(filtered.slice(0, 8)) // Limit suggestions
  }, [generateSuggestions])

  // Navigate to result
  const navigateToResult = useCallback((result: SearchResult) => {
    router.push(result.url)
  }, [router])

  // Get filter options
  const getFilterOptions = useMemo(() => {
    const allSuggestions = generateSuggestions()
    
    const statuses = [...new Set(allSuggestions.map(s => s.metadata?.status).filter(Boolean))]
    const categories = [...new Set(allSuggestions.map(s => s.metadata?.category).filter(Boolean))]
    const departments = [...new Set(allSuggestions.map(s => s.metadata?.department).filter(Boolean))]
    const types = [...new Set(allSuggestions.map(s => s.type))]
    
    return {
      status: statuses.map(status => ({ value: status, label: status })),
      category: categories.map(category => ({ value: category, label: category })),
      department: departments.map(department => ({ value: department, label: department })),
      type: types.map(type => ({ value: type, label: type }))
    }
  }, [generateSuggestions])

  return {
    query,
    setQuery,
    results,
    suggestions,
    loading,
    filters,
    setFilters,
    search,
    getSuggestions,
    navigateToResult,
    getFilterOptions
  }
}
