"use client"

import { SearchFilterBar, type FilterConfig } from "@/components/common/search-filter-bar"

interface DepartmentsFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function DepartmentsFilters({ searchTerm, onSearchChange }: DepartmentsFiltersProps) {
  const filters: FilterConfig[] = [
    {
      id: "status",
      label: "Durum",
      type: "select",
      options: [
        { value: "active", label: "Aktif" },
        { value: "inactive", label: "Pasif" },
        { value: "archived", label: "Arşivlenmiş" }
      ],
      onChange: (value) => {}
    },
    {
      id: "type",
      label: "Departman Tipi",
      type: "select",
      options: [
        { value: "main", label: "Ana Departman" },
        { value: "sub", label: "Alt Departman" },
        { value: "support", label: "Destek Birimi" }
      ],
      onChange: (value) => {}
    }
  ]

  return (
    <SearchFilterBar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Departman ara..."
      filters={filters}
      showFilters={false}
      onToggleFilters={() => {}}
    />
  )
}