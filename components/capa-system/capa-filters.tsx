"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

interface CAPAFiltersProps {
  searchTerm: string
  statusFilter: string
  typeFilter: string
  priorityFilter: string
  selectedCAPAs: string[]
  onSearchChange: (value: string) => void
  onStatusFilterChange: (value: string) => void
  onTypeFilterChange: (value: string) => void
  onPriorityFilterChange: (value: string) => void
  onBulkDelete: () => void
}

export function CAPAFilters({
  searchTerm,
  statusFilter,
  typeFilter,
  priorityFilter,
  selectedCAPAs,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange,
  onPriorityFilterChange,
  onBulkDelete,
}: CAPAFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedCAPAs.length > 0 && (
        <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selectedCAPAs.length} CAPA seçildi
          </span>
          <Button 
            variant="destructive" 
            size="sm"
            onClick={onBulkDelete}
          >
            <X className="w-4 h-4 mr-2" />
            Seçilenleri Sil
          </Button>
        </div>
      )}

      {/* Main Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Arama ve Filtreleme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Arama</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="CAPA no, başlık veya açıklama ara..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="statusFilter">Durum</Label>
              <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="Planlandı">Planlandı</SelectItem>
                  <SelectItem value="open">Açık</SelectItem>
                  <SelectItem value="Uygulanıyor">Uygulanıyor</SelectItem>
                  <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                  <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="closed">Kapatıldı</SelectItem>
                  <SelectItem value="İptal Edildi">İptal Edildi</SelectItem>
                  <SelectItem value="cancelled">İptal Edildi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="typeFilter">Tip</Label>
              <Select value={typeFilter} onValueChange={onTypeFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Tip seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Tipler</SelectItem>
                  <SelectItem value="Düzeltici">Düzeltici</SelectItem>
                  <SelectItem value="corrective">Düzeltici</SelectItem>
                  <SelectItem value="Önleyici">Önleyici</SelectItem>
                  <SelectItem value="preventive">Önleyici</SelectItem>
                  <SelectItem value="both">Her İkisi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priorityFilter">Öncelik</Label>
              <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Öncelik seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Öncelikler</SelectItem>
                  <SelectItem value="Düşük">Düşük</SelectItem>
                  <SelectItem value="low">Düşük</SelectItem>
                  <SelectItem value="Orta">Orta</SelectItem>
                  <SelectItem value="medium">Orta</SelectItem>
                  <SelectItem value="Yüksek">Yüksek</SelectItem>
                  <SelectItem value="high">Yüksek</SelectItem>
                  <SelectItem value="critical">Kritik</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}