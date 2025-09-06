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
  FileText,
  Certificate,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react"
import { mockApi, CalibrationRecord } from "@/lib/mock-data"

export default function CalibrationRecordsPage() {
  const [records, setRecords] = useState<CalibrationRecord[]>([])
  const [filteredRecords, setFilteredRecords] = useState<CalibrationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedSupplier, setSelectedSupplier] = useState("all")
  const [sortBy, setSortBy] = useState("calibrationDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedRecord, setSelectedRecord] = useState<CalibrationRecord | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 24 },
    { id: "valid", name: "Geçerli", count: 18, color: "#10B981" },
    { id: "expired", name: "Süresi Dolmuş", count: 3, color: "#EF4444" },
    { id: "expiring_soon", name: "Süresi Dolmak Üzere", count: 3, color: "#F59E0B" }
  ]

  // Tedarikçi filtreleri
  const supplierFilters = [
    { id: "all", name: "Tümü", count: 24 },
    { id: "internal", name: "İç Kalibrasyon", count: 12, color: "#3B82F6" },
    { id: "external", name: "Dış Kalibrasyon", count: 12, color: "#8B5CF6" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterRecords()
  }, [records, searchTerm, selectedStatus, selectedSupplier, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      console.log("Fetching calibration records...")
      const data = await mockApi.getCalibrationRecords()
      console.log("Calibration records data:", data)
      setRecords(data)
    } catch (error) {
      console.error("Error fetching calibration records:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterRecords = () => {
    let filtered = [...records]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(record =>
        record.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.calibratedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.responsible.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(record => record.status === selectedStatus)
    }

    // Tedarikçi filtresi
    if (selectedSupplier !== "all") {
      filtered = filtered.filter(record => record.calibratedBy === selectedSupplier)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "equipmentName":
          aValue = a.equipmentName
          bValue = b.equipmentName
          break
        case "calibrationDate":
          aValue = new Date(a.calibrationDate)
          bValue = new Date(b.calibrationDate)
          break
        case "nextDueDate":
          aValue = new Date(a.nextDueDate)
          bValue = new Date(b.nextDueDate)
          break
        case "cost":
          aValue = a.cost
          bValue = b.cost
          break
        case "certificateNumber":
          aValue = a.certificateNumber
          bValue = b.certificateNumber
          break
        default:
          aValue = a.calibrationDate
          bValue = b.calibrationDate
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
      case "valid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "expiring_soon":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "expiring_soon":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "valid":
        return "Geçerli"
      case "expired":
        return "Süresi Dolmuş"
      case "expiring_soon":
        return "Süresi Dolmak Üzere"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  const getDaysUntilExpiry = (dateString: string) => {
    const today = new Date()
    const expiryDate = new Date(dateString)
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getValidityProgress = (calibrationDate: string, nextDueDate: string) => {
    const today = new Date()
    const calib = new Date(calibrationDate)
    const next = new Date(nextDueDate)
    const totalDays = (next.getTime() - calib.getTime()) / (1000 * 60 * 60 * 24)
    const passedDays = (today.getTime() - calib.getTime()) / (1000 * 60 * 60 * 24)
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kalibrasyon Kayıtları</h1>
            <p className="text-muted-foreground">Ekipman kalibrasyon sertifikaları ve kayıtları</p>
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
          <h1 className="text-3xl font-bold text-foreground">Kalibrasyon Kayıtları</h1>
          <p className="text-muted-foreground">Ekipman kalibrasyon sertifikaları ve kayıtları</p>
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
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{records.length}</div>
            <p className="text-xs text-muted-foreground">
              {records.filter(r => r.status === "valid").length} geçerli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Süresi Dolmuş</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {records.filter(r => r.status === "expired").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Acil yenileme gerekli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Süresi Dolmak Üzere</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {records.filter(r => r.status === "expiring_soon").length}
            </div>
            <p className="text-xs text-muted-foreground">
              30 gün içinde yenileme
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Maliyet</CardTitle>
            <Certificate className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(records.reduce((sum, r) => sum + r.cost, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Yıllık kalibrasyon maliyeti
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Kalibrasyon Filtreleme</CardTitle>
          <CardDescription>Kalibrasyon kayıtlarını durum, tedarikçi ve ekipman bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ekipman, sertifika ara..."
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
              <label className="text-sm font-medium">Tedarikçi</label>
              <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                <SelectTrigger>
                  <SelectValue placeholder="Tedarikçi seçin" />
                </SelectTrigger>
                <SelectContent>
                  {supplierFilters.map((supplier) => (
                    <SelectItem key={supplier.id} value={supplier.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: supplier.color }}
                        />
                        {supplier.name} ({supplier.count})
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

      {/* Kalibrasyon Kayıtları Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Kalibrasyon Kayıtları ({filteredRecords.length})</CardTitle>
              <CardDescription>
                {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
                {selectedSupplier !== "all" && ` | Tedarikçi: ${supplierFilters.find(s => s.id === selectedSupplier)?.name}`}
                {searchTerm && ` | Arama: "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="equipmentName">Ekipman</SelectItem>
                  <SelectItem value="calibrationDate">Kalibrasyon Tarihi</SelectItem>
                  <SelectItem value="nextDueDate">Son Geçerlilik</SelectItem>
                  <SelectItem value="cost">Maliyet</SelectItem>
                  <SelectItem value="certificateNumber">Sertifika No</SelectItem>
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
                  <TableHead>Ekipman</TableHead>
                  <TableHead>Sertifika No</TableHead>
                  <TableHead>Kalibrasyon Tarihi</TableHead>
                  <TableHead>Son Geçerlilik</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tedarikçi</TableHead>
                  <TableHead>Maliyet</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => {
                  const daysUntil = getDaysUntilExpiry(record.nextDueDate)
                  const progress = getValidityProgress(record.calibrationDate, record.nextDueDate)
                  
                  return (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{record.equipmentName}</div>
                          <div className="text-sm text-muted-foreground">{record.equipmentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-mono">{record.certificateNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(record.calibrationDate)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{formatDate(record.nextDueDate)}</div>
                          <div className="text-xs text-muted-foreground">
                            {daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
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
                        <div className="text-sm">{record.calibratedBy}</div>
                        <div className="text-xs text-muted-foreground">{record.responsible}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{formatCurrency(record.cost)}</div>
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
                const daysUntil = getDaysUntilExpiry(record.nextDueDate)
                const progress = getValidityProgress(record.calibrationDate, record.nextDueDate)
                
                return (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{record.equipmentName}</CardTitle>
                          <CardDescription>{record.equipmentId}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(record.status)}`}>
                            {getStatusText(record.status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sertifika No:</span>
                          <span className="font-mono">{record.certificateNumber}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Kalibrasyon Tarihi:</span>
                          <span>{formatDate(record.calibrationDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Son Geçerlilik:</span>
                          <span>{formatDate(record.nextDueDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Maliyet:</span>
                          <span className="font-medium">{formatCurrency(record.cost)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Geçerlilik İlerlemesi</span>
                          <span>{daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
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

      {/* Kalibrasyon Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedRecord && getStatusIcon(selectedRecord.status)}
              {selectedRecord?.equipmentName}
            </DialogTitle>
            <DialogDescription>
              {selectedRecord?.equipmentId} - {selectedRecord?.certificateNumber}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Ekipman Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ekipman Adı:</strong> {selectedRecord.equipmentName}</div>
                    <div><strong>Ekipman ID:</strong> {selectedRecord.equipmentId}</div>
                    <div><strong>Sertifika No:</strong> {selectedRecord.certificateNumber}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kalibrasyon Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Kalibrasyon Tarihi:</strong> {formatDate(selectedRecord.calibrationDate)}</div>
                    <div><strong>Son Geçerlilik:</strong> {formatDate(selectedRecord.nextDueDate)}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedRecord.status)}</div>
                    <div><strong>Maliyet:</strong> {formatCurrency(selectedRecord.cost)}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Tedarikçi Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Tedarikçi:</strong> {selectedRecord.calibratedBy}</div>
                    <div><strong>Sorumlu:</strong> {selectedRecord.responsible}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Teknik Bilgiler</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ölçüm Belirsizliği:</strong> {selectedRecord.uncertainty}</div>
                    <div><strong>Çevresel Koşullar:</strong> {selectedRecord.environmentalConditions.temperature}, {selectedRecord.environmentalConditions.humidity}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Kalibrasyon Sonuçları</h4>
                <p className="text-sm text-muted-foreground">{selectedRecord.results}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Ekler</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecord.attachments.map((attachment, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded text-sm">
                      {attachment}
                    </span>
                  ))}
                </div>
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