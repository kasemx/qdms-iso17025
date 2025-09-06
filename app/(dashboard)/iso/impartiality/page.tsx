"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Shield,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Scale,
  AlertCircle,
  UserCheck,
  UserX,
} from "lucide-react"
import { mockApi, ImpartialityRecord } from "@/lib/mock-data"

export default function ImpartialityPage() {
  const [records, setRecords] = useState<ImpartialityRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<ImpartialityRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")
  const [sortBy, setSortBy] = useState("reportedDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedRecord, setSelectedRecord] = useState<ImpartialityRecord | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 15 },
    { id: "active", name: "Aktif", count: 8, color: "#3B82F6" },
    { id: "resolved", name: "Çözüldü", count: 5, color: "#10B981" },
    { id: "under_review", name: "İnceleme Altında", count: 2, color: "#F59E0B" }
  ]

  // Risk seviyesi filtreleri
  const riskLevelFilters = [
    { id: "all", name: "Tümü", count: 15 },
    { id: "low", name: "Düşük", count: 8, color: "#10B981" },
    { id: "medium", name: "Orta", count: 5, color: "#F59E0B" },
    { id: "high", name: "Yüksek", count: 2, color: "#EF4444" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterRecords()
  }, [records, searchTerm, selectedStatus, selectedRiskLevel, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getImpartialityRecords()
      setRecords(data)
    } catch (error) {
      console.error("Error fetching impartiality records:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterRecords = () => {
    let filtered = [...records]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.conflictType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.conflictDescription.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(record => record.status === selectedStatus)
    }

    // Risk seviyesi filtresi
    if (selectedRiskLevel !== "all") {
      filtered = filtered.filter(record => record.riskLevel === selectedRiskLevel)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "personName":
          aValue = a.personName
          bValue = b.personName
          break
        case "reportedDate":
          aValue = new Date(a.reportedDate)
          bValue = new Date(b.reportedDate)
          break
        case "riskLevel":
          const riskOrder = { high: 3, medium: 2, low: 1 }
          aValue = riskOrder[a.riskLevel as keyof typeof riskOrder] || 0
          bValue = riskOrder[b.riskLevel as keyof typeof riskOrder] || 0
          break
        case "department":
          aValue = a.department
          bValue = b.department
          break
        default:
          aValue = a.reportedDate
          bValue = b.reportedDate
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredRecords(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "active":
        return <AlertCircle className="h-4 w-4 text-blue-500" />
      case "under_review":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved":
        return "Çözüldü"
      case "active":
        return "Aktif"
      case "under_review":
        return "İnceleme Altında"
      default:
        return status
    }
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getRiskLevelText = (riskLevel: string) => {
    switch (riskLevel) {
      case "high":
        return "Yüksek"
      case "medium":
        return "Orta"
      case "low":
        return "Düşük"
      default:
        return riskLevel
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getDaysUntilReview = (dateString: string) => {
    const today = new Date()
    const reviewDate = new Date(dateString)
    const diffTime = reviewDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tarafsızlık Yönetimi</h1>
            <p className="text-muted-foreground">Çıkar çakışması yönetimi ve tarafsızlık değerlendirmesi</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tarafsızlık Yönetimi</h1>
          <p className="text-muted-foreground">Çıkar çakışması yönetimi ve tarafsızlık değerlendirmesi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Kayıt
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Kayıt</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground">
              {records.filter(r => r.status === "active").length} aktif
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yüksek Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {records.filter(r => r.riskLevel === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Acil müdahale gerekli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Çözülen</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {records.filter(r => r.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Bu ay çözülen
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnceleme Bekleyen</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {records.filter(r => r.status === "under_review").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Değerlendirme bekliyor
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Tarafsızlık Filtreleme</CardTitle>
          <CardDescription>Çıkar çakışması kayıtlarını durum, risk seviyesi ve personel bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Personel, departman ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Durum</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilters.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: status.color }}
                        />
                        {status.name} ({status.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Risk Seviyesi</label>
              <Select value={selectedRiskLevel} onValueChange={setSelectedRiskLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk seviyesi seçin" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevelFilters.map((risk) => (
                    <SelectItem key={risk.id} value={risk.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: risk.color }}
                        />
                        {risk.name} ({risk.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Görünüm</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tarafsızlık Kayıtları Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Tarafsızlık Kayıtları ({filteredRecords.length})</CardTitle>
              <CardDescription>
                {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
                {selectedRiskLevel !== "all" && ` | Risk: ${riskLevelFilters.find(r => r.id === selectedRiskLevel)?.name}`}
                {searchTerm && ` | Arama: "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personName">Personel</SelectItem>
                  <SelectItem value="reportedDate">Rapor Tarihi</SelectItem>
                  <SelectItem value="riskLevel">Risk Seviyesi</SelectItem>
                  <SelectItem value="department">Departman</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personel</TableHead>
                  <TableHead>Çakışma Türü</TableHead>
                  <TableHead>Risk Seviyesi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Rapor Tarihi</TableHead>
                  <TableHead>Sonraki İnceleme</TableHead>
                  <TableHead>İnceleyici</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const daysUntil = getDaysUntilReview(record.nextReviewDate)
                  
                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{record.personName}</div>
                          <div className="text-sm text-muted-foreground">{record.position}</div>
                          <div className="text-xs text-muted-foreground">{record.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{record.conflictType}</div>
                        <div className="text-xs text-muted-foreground max-w-xs truncate">
                          {record.conflictDescription}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(record.riskLevel)}`}>
                          {getRiskLevelText(record.riskLevel)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(record.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                            {getStatusText(record.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(record.reportedDate)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(record.nextReviewDate)}</div>
                        <div className="text-xs text-muted-foreground">
                          {daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{record.reviewer}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedRecord(record)
                              setIsDetailDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredRecords.map((record) => {
                const daysUntil = getDaysUntilReview(record.nextReviewDate)
                
                return (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{record.personName}</CardTitle>
                          <CardDescription>{record.position} - {record.department}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(record.riskLevel)}`}>
                            {getRiskLevelText(record.riskLevel)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                            {getStatusText(record.status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Çakışma Türü:</span>
                          <span>{record.conflictType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Rapor Tarihi:</span>
                          <span>{formatDate(record.reportedDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sonraki İnceleme:</span>
                          <span>{formatDate(record.nextReviewDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">İnceleyici:</span>
                          <span>{record.reviewer}</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-muted-foreground">
                        <strong>Açıklama:</strong> {record.conflictDescription}
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedRecord(record)
                            setIsDetailDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Görüntüle
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tarafsızlık Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRecord && getStatusIcon(selectedRecord.status)}
              {selectedRecord?.personName}
            </DialogTitle>
            <DialogDescription>
              {selectedRecord?.position} - {selectedRecord?.department}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Personel Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ad Soyad:</strong> {selectedRecord.personName}</div>
                    <div><strong>Pozisyon:</strong> {selectedRecord.position}</div>
                    <div><strong>Departman:</strong> {selectedRecord.department}</div>
                    <div><strong>Rapor Tarihi:</strong> {formatDate(selectedRecord.reportedDate)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Çakışma Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Çakışma Türü:</strong> {selectedRecord.conflictType}</div>
                    <div><strong>Risk Seviyesi:</strong> {getRiskLevelText(selectedRecord.riskLevel)}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedRecord.status)}</div>
                    <div><strong>İnceleyici:</strong> {selectedRecord.reviewer}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Çakışma Açıklaması</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.conflictDescription}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Mali Çıkarlar</h4>
                  <p className="text-sm text-muted-foreground">{selectedRecord.financialInterests}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kişisel İlişkiler</h4>
                  <p className="text-sm text-muted-foreground">{selectedRecord.personalRelationships}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Önceki İstihdam</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.previousEmployment}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Azaltma Önlemleri</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.mitigationMeasures}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">İlgili Projeler</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.relatedProjects.map((project, index) => (
                    <Badge key={index} variant="outline">{project}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notlar</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Kapat
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}