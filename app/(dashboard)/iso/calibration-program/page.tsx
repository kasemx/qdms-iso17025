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
  Wrench,
  Thermometer,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react"
import { mockApi } from "@/lib/mock-data"

interface CalibrationProgram {
  id: string
  equipmentId: string
  equipmentName: string
  equipmentCode: string
  calibrationType: string
  frequency: string
  lastCalibration: string
  nextCalibration: string
  status: string
  responsible: string
  supplier: string
  cost: number
  priority: string
  notes: string
}

export default function CalibrationProgramPage() {
  const [programs, setPrograms] = useState<CalibrationProgram[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<CalibrationProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [sortBy, setSortBy] = useState("nextCalibration")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedProgram, setSelectedProgram] = useState<CalibrationProgram | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 12 },
    { id: "scheduled", name: "Planlandı", count: 5, color: "#3B82F6" },
    { id: "overdue", name: "Süresi Geçti", count: 2, color: "#EF4444" },
    { id: "completed", name: "Tamamlandı", count: 3, color: "#10B981" },
    { id: "in_progress", name: "Devam Ediyor", count: 2, color: "#F59E0B" }
  ]

  // Öncelik filtreleri
  const priorityFilters = [
    { id: "all", name: "Tümü", count: 12 },
    { id: "critical", name: "Kritik", count: 2, color: "#EF4444" },
    { id: "high", name: "Yüksek", count: 4, color: "#F59E0B" },
    { id: "medium", name: "Orta", count: 4, color: "#3B82F6" },
    { id: "low", name: "Düşük", count: 2, color: "#10B981" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterPrograms()
  }, [programs, searchTerm, selectedStatus, selectedPriority, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getCalibrationPrograms()
      setPrograms(data)
    } catch (error) {
      console.error("Error fetching calibration programs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPrograms = () => {
    let filtered = [...programs]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(program =>
        program.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.calibrationType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.responsible.toLowerCase().includes(searchTerm.toLowerCase()) ||
        program.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(program => program.status === selectedStatus)
    }

    // Öncelik filtresi
    if (selectedPriority !== "all") {
      filtered = filtered.filter(program => program.priority === selectedPriority)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "equipmentName":
          aValue = a.equipmentName
          bValue = b.equipmentName
          break
        case "nextCalibration":
          aValue = new Date(a.nextCalibration)
          bValue = new Date(b.nextCalibration)
          break
        case "lastCalibration":
          aValue = new Date(a.lastCalibration)
          bValue = new Date(b.lastCalibration)
          break
        case "cost":
          aValue = a.cost
          bValue = b.cost
          break
        case "responsible":
          aValue = a.responsible
          bValue = b.responsible
          break
        default:
          aValue = a.nextCalibration
          bValue = b.nextCalibration
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredPrograms(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "overdue":
        return "Süresi Geçti"
      case "scheduled":
        return "Planlandı"
      case "in_progress":
        return "Devam Ediyor"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "critical":
        return "Kritik"
      case "high":
        return "Yüksek"
      case "medium":
        return "Orta"
      case "low":
        return "Düşük"
      default:
        return priority
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

  const getDaysUntilCalibration = (dateString: string) => {
    const today = new Date()
    const calibrationDate = new Date(dateString)
    const diffTime = calibrationDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCalibrationProgress = (lastCalibration: string, nextCalibration: string) => {
    const today = new Date()
    const last = new Date(lastCalibration)
    const next = new Date(nextCalibration)
    const totalDays = (next.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    const passedDays = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kalibrasyon Programı</h1>
            <p className="text-muted-foreground">Ekipman kalibrasyon planlaması ve takibi</p>
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
          <h1 className="text-3xl font-bold text-foreground">Kalibrasyon Programı</h1>
          <p className="text-muted-foreground">Ekipman kalibrasyon planlaması ve takibi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Program
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Program</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{programs.length}</div>
            <p className="text-xs text-muted-foreground">
              {programs.filter(p => p.status === "scheduled").length} planlandı
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Süresi Geçen</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {programs.filter(p => p.status === "overdue").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Acil müdahale gerekli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {programs.filter(p => p.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Bu ay tamamlanan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Maliyet</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(programs.reduce((sum, p) => sum + p.cost, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Yıllık kalibrasyon bütçesi
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Kalibrasyon Filtreleme</CardTitle>
          <CardDescription>Kalibrasyon programlarını durum, öncelik ve ekipman bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Ekipman ara..."
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
              <label className="text-sm font-medium">Öncelik</label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Öncelik seçin" />
                </SelectTrigger>
                <SelectContent>
                  {priorityFilters.map((priority) => (
                    <SelectItem key={priority.id} value={priority.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: priority.color }}
                        />
                        {priority.name} ({priority.count})
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

      {/* Kalibrasyon Programları Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Kalibrasyon Programları ({filteredPrograms.length})</CardTitle>
              <CardDescription>
                {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
                {selectedPriority !== "all" && ` | Öncelik: ${priorityFilters.find(p => p.id === selectedPriority)?.name}`}
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
                  <SelectItem value="nextCalibration">Sonraki Kalibrasyon</SelectItem>
                  <SelectItem value="lastCalibration">Son Kalibrasyon</SelectItem>
                  <SelectItem value="cost">Maliyet</SelectItem>
                  <SelectItem value="responsible">Sorumlu</SelectItem>
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
                  <TableHead>Kalibrasyon Türü</TableHead>
                  <TableHead>Sıklık</TableHead>
                  <TableHead>Son Kalibrasyon</TableHead>
                  <TableHead>Sonraki Kalibrasyon</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Maliyet</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrograms.map((program) => {
                  const daysUntil = getDaysUntilCalibration(program.nextCalibration)
                  const progress = getCalibrationProgress(program.lastCalibration, program.nextCalibration)
                  
                  return (
                    <TableRow key={program.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{program.equipmentName}</div>
                          <div className="text-sm text-muted-foreground">{program.equipmentCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{program.calibrationType}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{program.frequency}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(program.lastCalibration)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{formatDate(program.nextCalibration)}</div>
                          <div className="text-xs text-muted-foreground">
                            {daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(program.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                            {getStatusText(program.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                          {getPriorityText(program.priority)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{formatCurrency(program.cost)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedProgram(program)
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
              {filteredPrograms.map((program) => {
                const daysUntil = getDaysUntilCalibration(program.nextCalibration)
                const progress = getCalibrationProgress(program.lastCalibration, program.nextCalibration)
                
                return (
                  <Card key={program.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{program.equipmentName}</CardTitle>
                          <CardDescription>{program.equipmentCode}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                            {getStatusText(program.status)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                            {getPriorityText(program.priority)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Kalibrasyon Türü:</span>
                          <span>{program.calibrationType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sıklık:</span>
                          <span>{program.frequency}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Sonraki Kalibrasyon:</span>
                          <span>{formatDate(program.nextCalibration)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Maliyet:</span>
                          <span className="font-medium">{formatCurrency(program.cost)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>İlerleme</span>
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
                            setSelectedProgram(program)
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
              {selectedProgram && getStatusIcon(selectedProgram.status)}
              {selectedProgram?.equipmentName}
            </DialogTitle>
            <DialogDescription>
              {selectedProgram?.equipmentCode} - {selectedProgram?.calibrationType}
            </DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Ekipman Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ekipman Adı:</strong> {selectedProgram.equipmentName}</div>
                    <div><strong>Ekipman Kodu:</strong> {selectedProgram.equipmentCode}</div>
                    <div><strong>Kalibrasyon Türü:</strong> {selectedProgram.calibrationType}</div>
                    <div><strong>Sıklık:</strong> {selectedProgram.frequency}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kalibrasyon Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Son Kalibrasyon:</strong> {formatDate(selectedProgram.lastCalibration)}</div>
                    <div><strong>Sonraki Kalibrasyon:</strong> {formatDate(selectedProgram.nextCalibration)}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedProgram.status)}</div>
                    <div><strong>Öncelik:</strong> {getPriorityText(selectedProgram.priority)}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Sorumluluk Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Sorumlu:</strong> {selectedProgram.responsible}</div>
                    <div><strong>Tedarikçi:</strong> {selectedProgram.supplier}</div>
                    <div><strong>Maliyet:</strong> {formatCurrency(selectedProgram.cost)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">İlerleme</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kalibrasyon İlerlemesi</span>
                      <span>{Math.round(getCalibrationProgress(selectedProgram.lastCalibration, selectedProgram.nextCalibration))}%</span>
                    </div>
                    <Progress value={getCalibrationProgress(selectedProgram.lastCalibration, selectedProgram.nextCalibration)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {getDaysUntilCalibration(selectedProgram.nextCalibration) > 0 
                        ? `${getDaysUntilCalibration(selectedProgram.nextCalibration)} gün kaldı`
                        : `${Math.abs(getDaysUntilCalibration(selectedProgram.nextCalibration))} gün geçti`
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notlar</h4>
                <p className="text-sm text-muted-foreground">{selectedProgram.notes}</p>
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
