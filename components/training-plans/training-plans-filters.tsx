import { SearchFilterBar, type FilterConfig } from "@/components/common/search-filter-bar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SortAsc, SortDesc, X, Search, Filter, ChevronUp, ChevronDown, Calendar } from "lucide-react"

interface TrainingPlansFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedStatus: string
  setSelectedStatus: (status: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
  dateRange: { start: string; end: string }
  setDateRange: (range: { start: string; end: string }) => void
  costRange: { min: string; max: string }
  setCostRange: (range: { min: string; max: string }) => void
  participantRange: { min: string; max: string }
  setParticipantRange: (range: { min: string; max: string }) => void
  priorityFilter: string
  setPriorityFilter: (priority: string) => void
  instructorFilter: string
  setInstructorFilter: (instructor: string) => void
  showFilters: boolean
  setShowFilters: (show: boolean) => void
  filteredCount: number
  totalCount: number
  onClearFilters: () => void
}

export function TrainingPlansFilters({
  searchTerm,
  setSearchTerm,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  dateRange,
  setDateRange,
  costRange,
  setCostRange,
  participantRange,
  setParticipantRange,
  priorityFilter,
  setPriorityFilter,
  instructorFilter,
  setInstructorFilter,
  showFilters,
  setShowFilters,
  filteredCount,
  totalCount,
  onClearFilters
}: TrainingPlansFiltersProps) {
  
  const statusFilters = [
    { id: "all", name: "Tümü" },
    { id: "planned", name: "Planlandı" },
    { id: "ongoing", name: "Devam Ediyor" },
    { id: "completed", name: "Tamamlandı" },
    { id: "cancelled", name: "İptal Edildi" },
    { id: "postponed", name: "Ertelendi" }
  ]

  const categoryFilters = [
    { id: "all", name: "Tümü" },
    { id: "technical", name: "Teknik" },
    { id: "safety", name: "Güvenlik" },
    { id: "compliance", name: "Uyumluluk" },
    { id: "soft_skills", name: "Yumuşak Beceriler" },
    { id: "leadership", name: "Liderlik" }
  ]

  const filters: FilterConfig[] = [
    {
      id: "status",
      label: "Durum",
      type: "select",
      value: selectedStatus,
      options: statusFilters.map(status => ({ value: status.id, label: status.name })),
      onChange: (value) => setSelectedStatus(value as string)
    },
    {
      id: "category",
      label: "Kategori",
      type: "select",
      value: selectedCategory,
      options: categoryFilters.map(category => ({ value: category.id, label: category.name })),
      onChange: (value) => setSelectedCategory(value as string)
    },
    {
      id: "priority",
      label: "Öncelik",
      type: "select",
      value: priorityFilter,
      options: [
        { value: "all", label: "Tümü" },
        { value: "high", label: "Yüksek" },
        { value: "medium", label: "Orta" },
        { value: "low", label: "Düşük" }
      ],
      onChange: (value) => setPriorityFilter(value as string)
    },
    {
      id: "instructor",
      label: "Eğitmen",
      type: "text",
      value: instructorFilter,
      placeholder: "Eğitmen adı ara...",
      onChange: (value) => setInstructorFilter(value as string)
    },
    {
      id: "startDate",
      label: "Başlangıç Tarihi",
      type: "date",
      value: dateRange.start,
      onChange: (value) => setDateRange({ ...dateRange, start: value as string })
    },
    {
      id: "endDate",
      label: "Bitiş Tarihi",
      type: "date",
      value: dateRange.end,
      onChange: (value) => setDateRange({ ...dateRange, end: value as string })
    }
  ]

  const hasActiveFilters = () => {
    return searchTerm || 
           selectedStatus !== "all" || 
           selectedCategory !== "all" ||
           dateRange.start || 
           dateRange.end ||
           costRange.min || 
           costRange.max ||
           participantRange.min || 
           participantRange.max ||
           priorityFilter !== "all" ||
           instructorFilter
  }

  return (
    <div className="space-y-4">
      {/* Ana Arama ve Filtreler */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Arama ve Filtreleme
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredCount} / {totalCount} plan
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
          <div className="space-y-4">
            {/* Ana Arama */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Plan adı, eğitmen, açıklama ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
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

            {/* Hızlı Filtreler */}
            <div className="flex flex-wrap gap-2">
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Durum" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilters.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categoryFilters.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
                const [field, order] = value.split('-')
                setSortBy(field)
                setSortOrder(order as "asc" | "desc")
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sıralama" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="startDate-asc">Başlangıç Tarihi (Eski)</SelectItem>
                  <SelectItem value="startDate-desc">Başlangıç Tarihi (Yeni)</SelectItem>
                  <SelectItem value="title-asc">Plan Adı (A-Z)</SelectItem>
                  <SelectItem value="title-desc">Plan Adı (Z-A)</SelectItem>
                  <SelectItem value="completionRate-desc">Tamamlanma Oranı (%)</SelectItem>
                  <SelectItem value="satisfactionScore-desc">Memnuniyet Puanı</SelectItem>
                  <SelectItem value="cost-asc">Maliyet (Düşük-Yüksek)</SelectItem>
                  <SelectItem value="cost-desc">Maliyet (Yüksek-Düşük)</SelectItem>
                </SelectContent>
              </Select>

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
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {selectedStatus !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Durum: {statusFilters.find(s => s.id === selectedStatus)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedStatus("all")} />
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Kategori: {categoryFilters.find(c => c.id === selectedCategory)?.name}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory("all")} />
                  </Badge>
                )}
                {priorityFilter !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Öncelik: {priorityFilter === "high" ? "Yüksek" : priorityFilter === "medium" ? "Orta" : "Düşük"}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setPriorityFilter("all")} />
                  </Badge>
                )}
                {instructorFilter && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Eğitmen: {instructorFilter}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setInstructorFilter("")} />
                  </Badge>
                )}
                {(dateRange.start || dateRange.end) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Tarih: {dateRange.start || "..."} - {dateRange.end || "..."}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => setDateRange({ start: "", end: "" })} />
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Gelişmiş Filtreler */}
          {showFilters && (
            <div className="mt-6 p-4 border rounded-lg bg-muted/30">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Tarih Aralığı
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      placeholder="Başlangıç"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                    <Input
                      type="date"
                      placeholder="Bitiş"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Maliyet Aralığı (TL)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={costRange.min}
                      onChange={(e) => setCostRange({ ...costRange, min: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={costRange.max}
                      onChange={(e) => setCostRange({ ...costRange, max: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Katılımcı Sayısı</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={participantRange.min}
                      onChange={(e) => setParticipantRange({ ...participantRange, min: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={participantRange.max}
                      onChange={(e) => setParticipantRange({ ...participantRange, max: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" onClick={onClearFilters}>
                  Tüm Filtreleri Temizle
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
