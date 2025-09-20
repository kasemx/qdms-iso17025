import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  X
} from "lucide-react"

interface Equipment {
  location: string
}

interface EquipmentFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  locationFilter?: string
  setLocationFilter?: (location: string) => void
  utilizationFilter?: string
  setUtilizationFilter?: (utilization: string) => void
  maintenanceFilter?: string
  setMaintenanceFilter?: (maintenance: string) => void
  warrantyFilter?: string
  setWarrantyFilter?: (warranty: string) => void
  showAdvancedFilters: boolean
  setShowAdvancedFilters: (show: boolean) => void
  equipment: Equipment[]
  onClearFilters: () => void
}

export function EquipmentFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  locationFilter = "all",
  setLocationFilter = () => {},
  utilizationFilter = "all",
  setUtilizationFilter = () => {},
  maintenanceFilter = "all",
  setMaintenanceFilter = () => {},
  warrantyFilter = "all",
  setWarrantyFilter = () => {},
  showAdvancedFilters,
  setShowAdvancedFilters,
  equipment,
  onClearFilters
}: EquipmentFiltersProps) {
  
  const hasActiveFilters = () => {
    return searchTerm || 
           statusFilter !== "all" || 
           categoryFilter !== "all" ||
           locationFilter !== "all" ||
           utilizationFilter !== "all" ||
           maintenanceFilter !== "all" ||
           warrantyFilter !== "all"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Arama ve Filtreleme
          </CardTitle>
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showAdvancedFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          {/* Main search input */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Input
                placeholder="Ekipman adı, model veya seri numarası ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Quick filters */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Durum filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Durumlar</SelectItem>
              <SelectItem value="active">Aktif</SelectItem>
              <SelectItem value="calibration_due">Kalibrasyon Gerekli</SelectItem>
              <SelectItem value="out_of_service">Hizmet Dışı</SelectItem>
              <SelectItem value="maintenance">Bakımda</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategori filtrele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tüm Kategoriler</SelectItem>
              <SelectItem value="measurement">Ölçüm Cihazı</SelectItem>
              <SelectItem value="analysis">Analiz Cihazı</SelectItem>
              <SelectItem value="preparation">Hazırlık Ekipmanı</SelectItem>
              <SelectItem value="safety">Güvenlik Ekipmanı</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters() && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
            >
              <X className="h-4 w-4 mr-2" />
              Temizle
            </Button>
          )}
        </div>
        
        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/50">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label>Konum</Label>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Konum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Konumlar</SelectItem>
                    {Array.from(new Set(equipment.map(e => e.location))).map((location) => (
                      <SelectItem key={location} value={location}>{location}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Kullanım Oranı</Label>
                <Select value={utilizationFilter} onValueChange={setUtilizationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Oran aralığı" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Oranlar</SelectItem>
                    <SelectItem value="90-100">90-100%</SelectItem>
                    <SelectItem value="80-89">80-89%</SelectItem>
                    <SelectItem value="70-79">70-79%</SelectItem>
                    <SelectItem value="0-69">69% ve altı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Bakım Durumu</Label>
                <Select value={maintenanceFilter} onValueChange={setMaintenanceFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Bakım durumu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="current">Güncel</SelectItem>
                    <SelectItem value="due">Vadesi Gelmiş</SelectItem>
                    <SelectItem value="overdue">Gecikmiş</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Garanti Durumu</Label>
                <Select value={warrantyFilter} onValueChange={setWarrantyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Garanti" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Durumlar</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="expired">Süresi Dolmuş</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                Filtreleri Temizle
              </Button>
              <Button size="sm">
                Filtreleri Uygula
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}