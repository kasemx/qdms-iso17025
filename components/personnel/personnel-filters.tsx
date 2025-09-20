"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { useState } from "react"

interface PersonnelFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  departmentFilter: string
  onDepartmentChange: (value: string) => void
  competencyFilter: string
  onCompetencyChange: (value: string) => void
  viewMode: string
  onViewModeChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  onClearFilters: () => void
}

export function PersonnelFilters({
  searchTerm,
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  competencyFilter,
  onCompetencyChange,
  viewMode,
  onViewModeChange,
  statusFilter,
  onStatusChange,
  onClearFilters
}: PersonnelFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const hasActiveFilters = departmentFilter || competencyFilter || statusFilter || searchTerm

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5" />
          Arama ve Filtreler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Personel ara..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full"
            />
          </div>
          <Select value={viewMode} onValueChange={onViewModeChange}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Görünüm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Personel</SelectItem>
              <SelectItem value="competency">Yetkinlik Görünümü</SelectItem>
              <SelectItem value="training">Eğitim Görünümü</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Gelişmiş Filtreler
                {hasActiveFilters && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    Aktif
                  </span>
                )}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Departman</label>
                <Select value={departmentFilter} onValueChange={onDepartmentChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Departman seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    <SelectItem value="quality">Kalite</SelectItem>
                    <SelectItem value="lab">Laboratuvar</SelectItem>
                    <SelectItem value="admin">Yönetim</SelectItem>
                    <SelectItem value="technical">Teknik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Yetkinlik Seviyesi</label>
                <Select value={competencyFilter} onValueChange={onCompetencyChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seviye seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    <SelectItem value="beginner">Başlangıç (1-2)</SelectItem>
                    <SelectItem value="intermediate">Orta (3)</SelectItem>
                    <SelectItem value="advanced">İleri (4-5)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Durum</label>
                <Select value={statusFilter} onValueChange={onStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Tümü</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="training">Eğitimde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {hasActiveFilters && (
              <div className="flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onClearFilters}
                  className="text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-2" />
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}