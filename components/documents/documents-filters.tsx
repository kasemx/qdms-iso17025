import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  X,
  Calendar,
  Shield,
  FileText,
  Clock,
  Grid3X3,
  List,
  TreePine,
  Clock3,
  SortAsc,
  SortDesc
} from "lucide-react"

interface QuickFilter {
  id: string
  name: string
  icon: string
  color: string
}

interface DocumentsFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  searchSuggestions: string[]
  searchHistory: string[]
  popularSearches: string[]
  showSuggestions: boolean
  setShowSuggestions: (show: boolean) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
  dateRange: { start: string; end: string }
  setDateRange: (range: { start: string; end: string }) => void
  fileSizeRange: { min: string; max: string }
  setFileSizeRange: (range: { min: string; max: string }) => void
  fileTypeFilter: string
  setFileTypeFilter: (type: string) => void
  securityLevelFilter: string
  setSecurityLevelFilter: (level: string) => void
  authorFilter: string
  setAuthorFilter: (author: string) => void
  viewMode: "list" | "grid" | "tree" | "timeline"
  setViewMode: (mode: "list" | "grid" | "tree" | "timeline") => void
  sortBy: string
  setSortBy: (field: string) => void
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
  quickFilters: QuickFilter[]
  onQuickFilter: (filterId: string) => void
  onClearFilters: () => void
  onSearch: (term: string) => void
  filteredCount: number
  totalCount: number
}

export function DocumentsFilters({
  searchTerm,
  setSearchTerm,
  searchSuggestions,
  searchHistory,
  popularSearches,
  showSuggestions,
  setShowSuggestions,
  showFilters,
  setShowFilters,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  dateRange,
  setDateRange,
  fileSizeRange,
  setFileSizeRange,
  fileTypeFilter,
  setFileTypeFilter,
  securityLevelFilter,
  setSecurityLevelFilter,
  authorFilter,
  setAuthorFilter,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  quickFilters,
  onQuickFilter,
  onClearFilters,
  onSearch,
  filteredCount,
  totalCount
}: DocumentsFiltersProps) {

  const hasActiveFilters = () => {
    return searchTerm || 
           statusFilter !== "all" || 
           categoryFilter !== "all" ||
           dateRange.start || 
           dateRange.end ||
           fileSizeRange.min || 
           fileSizeRange.max ||
           fileTypeFilter !== "all" ||
           securityLevelFilter !== "all" ||
           authorFilter
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setShowSuggestions(value.length > 0)
    onSearch(value)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    onSearch(suggestion)
  }

  const getViewModeIcon = (mode: string) => {
    switch (mode) {
      case "list": return <List className="h-4 w-4" />
      case "grid": return <Grid3X3 className="h-4 w-4" />
      case "tree": return <TreePine className="h-4 w-4" />
      case "timeline": return <Clock3 className="h-4 w-4" />
      default: return <List className="h-4 w-4" />
    }
  }

  const getSortIcon = () => {
    return sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
  }

  return (
    <div className="space-y-4">
      {/* Hızlı Filtreler */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <Button
            key={filter.id}
            variant="outline"
            size="sm"
            onClick={() => onQuickFilter(filter.id)}
            className="flex items-center gap-2"
            style={{ borderColor: filter.color }}
          >
            {filter.icon === "Clock" && <Clock className="h-4 w-4" />}
            {filter.icon === "AlertTriangle" && <Calendar className="h-4 w-4" />}
            {filter.icon === "ExternalLink" && <FileText className="h-4 w-4" />}
            {filter.icon === "Archive" && <FileText className="h-4 w-4" />}
            {filter.icon === "Shield" && <Shield className="h-4 w-4" />}
            {filter.name}
          </Button>
        ))}
      </div>

      {/* Ana Arama ve Filtreler */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Arama ve Filtreleme
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredCount} / {totalCount} doküman
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Ana Arama */}
          <div className="space-y-4">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Doküman adı, kod, açıklama, yazar veya etiket ara..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-10"
                  onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    onClick={() => {
                      setSearchTerm("")
                      setShowSuggestions(false)
                      onSearch("")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              {/* Arama Önerileri */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
                  {searchSuggestions.length > 0 && (
                    <div className="p-2">
                      <div className="text-xs font-medium text-gray-500 mb-2">Öneriler</div>
                      {searchSuggestions.slice(0, 5).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {searchHistory.length > 0 && (
                    <div className="p-2 border-t">
                      <div className="text-xs font-medium text-gray-500 mb-2">Son Aramalar</div>
                      {searchHistory.slice(0, 3).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {popularSearches.length > 0 && (
                    <div className="p-2 border-t">
                      <div className="text-xs font-medium text-gray-500 mb-2">Popüler Aramalar</div>
                      {popularSearches.slice(0, 3).map((item, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(item)}
                          className="w-full text-left px-2 py-1 text-sm hover:bg-gray-100 rounded"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hızlı Filtreler */}
            <div className="flex flex-wrap gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="review">İnceleme</SelectItem>
                  <SelectItem value="approved">Onaylandı</SelectItem>
                  <SelectItem value="published">Yayınlandı</SelectItem>
                  <SelectItem value="obsolete">Eski</SelectItem>
                </SelectContent>
              </Select>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Kategoriler</SelectItem>
                  <SelectItem value="policy">Politika</SelectItem>
                  <SelectItem value="procedure">Prosedür</SelectItem>
                  <SelectItem value="instruction">Talimat</SelectItem>
                  <SelectItem value="form">Form</SelectItem>
                  <SelectItem value="record">Kayıt</SelectItem>
                </SelectContent>
              </Select>

              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-')
                setSortBy(field)
                setSortOrder(order as "asc" | "desc")
              }}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title-asc">Başlık (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Başlık (Z-A)</SelectItem>
                  <SelectItem value="updatedAt-desc">Yeni Güncelleme</SelectItem>
                  <SelectItem value="updatedAt-asc">Eski Güncelleme</SelectItem>
                  <SelectItem value="createdAt-desc">Yeni Oluşturma</SelectItem>
                  <SelectItem value="createdAt-asc">Eski Oluşturma</SelectItem>
                </SelectContent>
              </Select>

              {/* Görünüm Modu */}
              <div className="flex border rounded-md">
                {(["list", "grid", "tree", "timeline"] as const).map((mode) => (
                  <Button
                    key={mode}
                    variant={viewMode === mode ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode(mode)}
                    className="rounded-none first:rounded-l-md last:rounded-r-md"
                  >
                    {getViewModeIcon(mode)}
                  </Button>
                ))}
              </div>

              {hasActiveFilters() && (
                <Button variant="outline" size="sm" onClick={onClearFilters}>
                  <X className="h-4 w-4 mr-2" />
                  Temizle
                </Button>
              )}
            </div>

            {/* Aktif Filtreler */}
            {hasActiveFilters() && (
              <div className="flex flex-wrap gap-2">
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Arama: "{searchTerm}"
                    <X className="h-3 w-3 cursor-pointer" onClick={() => {
                      setSearchTerm("")
                      onSearch("")
                    }} />
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Durum: {statusFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                  </Badge>
                )}
                {categoryFilter !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Kategori: {categoryFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setCategoryFilter("all")} />
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Gelişmiş Filtreler */}
          {showFilters && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/50">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Tarih Aralığı</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <Input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dosya Boyutu (MB)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={fileSizeRange.min}
                      onChange={(e) => setFileSizeRange({ ...fileSizeRange, min: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={fileSizeRange.max}
                      onChange={(e) => setFileSizeRange({ ...fileSizeRange, max: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Dosya Türü</Label>
                  <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Dosya türü" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Türler</SelectItem>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Word</SelectItem>
                      <SelectItem value="xlsx">Excel</SelectItem>
                      <SelectItem value="pptx">PowerPoint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Güvenlik Seviyesi</Label>
                  <Select value={securityLevelFilter} onValueChange={setSecurityLevelFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Güvenlik seviyesi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Seviyeler</SelectItem>
                      <SelectItem value="public">Genel</SelectItem>
                      <SelectItem value="internal">İç Kullanım</SelectItem>
                      <SelectItem value="confidential">Gizli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Yazar</Label>
                  <Input
                    placeholder="Yazar adı ara..."
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                  />
                </div>

                <div className="flex items-end">
                  <Button variant="outline" onClick={onClearFilters} className="w-full">
                    Filtreleri Temizle
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}