"use client"

import { useState } from "react"
import { SearchFilterBar, type FilterConfig } from "@/components/common/search-filter-bar"

interface AuditFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  entityTypeFilter: string
  onEntityTypeFilterChange: (value: string) => void
  actionFilter: string
  onActionFilterChange: (value: string) => void
  dateFilter?: string
  onDateFilterChange?: (value: string) => void
}

export function AuditFilters({
  searchTerm,
  onSearchChange,
  entityTypeFilter,
  onEntityTypeFilterChange,
  actionFilter,
  onActionFilterChange,
  dateFilter = "all",
  onDateFilterChange,
}: AuditFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  const filters: FilterConfig[] = [
    {
      id: "entityType",
      label: "Entity Tipi",
      type: "select",
      value: entityTypeFilter,
      options: [
        { value: "document", label: "Doküman" },
        { value: "user", label: "Kullanıcı" },
        { value: "training", label: "Eğitim" },
        { value: "reminder", label: "Hatırlatıcı" },
        { value: "workflow", label: "İş Akışı" },
        { value: "security", label: "Güvenlik" }
      ],
      onChange: (value) => onEntityTypeFilterChange(value as string)
    },
    {
      id: "action",
      label: "İşlem Tipi",
      type: "select",
      value: actionFilter,
      options: [
        { value: "document_create", label: "Doküman Oluşturma" },
        { value: "document_update", label: "Doküman Güncelleme" },
        { value: "document_delete", label: "Doküman Silme" },
        { value: "document_archive", label: "Doküman Arşivleme" },
        { value: "document_rollback", label: "Doküman Geri Alma" },
        { value: "role_change", label: "Rol Değişikliği" },
        { value: "account_created", label: "Hesap Oluşturma" },
        { value: "training_completed", label: "Eğitim Tamamlama" },
        { value: "training_failed", label: "Eğitim Başarısızlık" },
        { value: "workflow_approved", label: "İş Akışı Onayı" },
        { value: "password_change", label: "Şifre Değişikliği" },
        { value: "login", label: "Giriş" },
        { value: "logout", label: "Çıkış" }
      ],
      onChange: (value) => onActionFilterChange(value as string)
    }
  ]

  // Add date filter if callback is provided
  if (onDateFilterChange) {
    filters.push({
      id: "date",
      label: "Tarih Filtresi",
      type: "select",
      value: dateFilter,
      options: [
        { value: "today", label: "Bugün" },
        { value: "week", label: "Son Hafta" },
        { value: "month", label: "Son Ay" }
      ],
      onChange: (value) => onDateFilterChange(value as string)
    })
  }

  return (
    <SearchFilterBar
      searchTerm={searchTerm}
      onSearchChange={onSearchChange}
      searchPlaceholder="Audit kayıtlarında ara..."
      filters={filters}
      showFilters={showFilters}
      onToggleFilters={() => setShowFilters(!showFilters)}
    />
  )
}