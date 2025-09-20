"use client"

import { useState, useEffect, useMemo } from "react"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
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
  ChevronDown,
  ChevronUp,
  Bell,
  RefreshCw,
  Upload,
  Target,
  Shield,
  Zap,
  FileText,
  Users,
  MapPin,
  Calendar as CalendarIcon,
  Trash2,
  Copy,
  Send
} from "lucide-react"
import { toast } from "sonner"
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
  // Enhanced properties for 9/10 level
  automationEnabled: boolean
  complianceStandards: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  workflowStage: 'planning' | 'approval' | 'execution' | 'verification' | 'complete'
  approvalChain: {
    requiredBy: string
    approvedBy?: string
    approvedDate?: string
    status: 'pending' | 'approved' | 'rejected'
  }[]
  dependencies: string[]
  estimatedDuration: number
  actualDuration?: number
  qualityChecks: {
    preCalibration: boolean
    postCalibration: boolean
    documentation: boolean
    traceability: boolean
  }
  environmentalRequirements: {
    temperature: string
    humidity: string
    vibration: string
    cleanliness: string
  }
  competencyRequirements: string[]
  documentLinks: string[]
  lastModified: string
  modifiedBy: string
}

interface CalibrationStats {
  totalPrograms: number
  activePrograms: number
  overduePrograms: number
  completedThisMonth: number
  totalCost: number
  averageCompletionTime: number
  complianceRate: number
  automationRate: number
  riskDistribution: Record<string, number>
  upcomingCalibrations: number
}

type SortField = 'equipmentName' | 'nextCalibration' | 'cost' | 'priority' | 'status' | 'riskLevel' | 'lastCalibration' | 'responsible'
type SortDirection = 'asc' | 'desc'

export default function CalibrationProgramPage() {
  const [programs, setPrograms] = useState<CalibrationProgram[]>([])
  const [filteredPrograms, setFilteredPrograms] = useState<CalibrationProgram[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedRiskLevel, setSelectedRiskLevel] = useState("all")
  const [selectedWorkflowStage, setSelectedWorkflowStage] = useState("all")
  const [sortBy, setSortBy] = useState<SortField>("nextCalibration")
  const [sortOrder, setSortOrder] = useState<SortDirection>("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedProgram, setSelectedProgram] = useState<CalibrationProgram | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>([])
  const [bulkActionDialogOpen, setBulkActionDialogOpen] = useState(false)
  const [workflowDialogOpen, setWorkflowDialogOpen] = useState(false)

  // Enhanced analytics and automation features
  const stats = useMemo((): CalibrationStats => {
    const activeCount = programs.filter(p => p.status === 'scheduled' || p.status === 'in_progress').length
    const overdueCount = programs.filter(p => p.status === 'overdue').length
    const completedThisMonth = programs.filter(p => p.status === 'completed').length
    const totalCost = programs.reduce((sum, p) => sum + p.cost, 0)
    const avgCompletionTime = programs.length > 0
      ? Math.round(programs.reduce((sum, p) => sum + (p.actualDuration || p.estimatedDuration), 0) / programs.length)
      : 0
    const automatedCount = programs.filter(p => p.automationEnabled).length
    const automationRate = programs.length > 0 ? Math.round((automatedCount / programs.length) * 100) : 0
    const complianceCount = programs.filter(p => p.qualityChecks.documentation && p.qualityChecks.traceability).length
    const complianceRate = programs.length > 0 ? Math.round((complianceCount / programs.length) * 100) : 0
    
    const riskDistribution = programs.reduce((acc, p) => {
      acc[p.riskLevel] = (acc[p.riskLevel] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const upcomingCount = programs.filter(p => {
      const nextDate = new Date(p.nextCalibration)
      const today = new Date()
      const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntil <= 30 && daysUntil > 0
    }).length

    return {
      totalPrograms: programs.length,
      activePrograms: activeCount,
      overduePrograms: overdueCount,
      completedThisMonth,
      totalCost,
      averageCompletionTime: avgCompletionTime,
      complianceRate,
      automationRate,
      riskDistribution,
      upcomingCalibrations: upcomingCount
    }
  }, [programs])

  const handleBulkAction = async (action: string) => {
    if (selectedPrograms.length === 0) {
      toast.error("Lütfen en az bir program seçin")
      return
    }

    try {
      switch (action) {
        case 'schedule':
          toast.success(`${selectedPrograms.length} program için kalibrasyon planlandı`)
          break
        case 'approve':
          toast.success(`${selectedPrograms.length} program onaylandı`)
          break
        case 'export':
          toast.success(`${selectedPrograms.length} program raporu dışa aktarıldı`)
          break
        case 'automate':
          toast.success(`${selectedPrograms.length} program için otomasyon aktifleştirildi`)
          break
        default:
          break
      }
      setSelectedPrograms([])
      setBulkActionDialogOpen(false)
    } catch (error) {
      toast.error("İşlem gerçekleştirilirken hata oluştu")
    }
  }

  const getRiskLevelColor = (risk: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    }
    return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getWorkflowStageColor = (stage: string) => {
    const colors = {
      'planning': 'bg-blue-100 text-blue-800',
      'approval': 'bg-yellow-100 text-yellow-800',
      'execution': 'bg-purple-100 text-purple-800',
      'verification': 'bg-orange-100 text-orange-800',
      'complete': 'bg-green-100 text-green-800'
    }
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: programs.length },
    { id: "scheduled", name: "Planlandı", count: programs.filter(p => p.status === "scheduled").length, color: "#3B82F6" },
    { id: "in_progress", name: "Devam Ediyor", count: programs.filter(p => p.status === "in_progress").length, color: "#F59E0B" },
    { id: "completed", name: "Tamamlandı", count: programs.filter(p => p.status === "completed").length, color: "#10B981" },
    { id: "overdue", name: "Süresi Geçti", count: programs.filter(p => p.status === "overdue").length, color: "#EF4444" }
  ]

  // Öncelik filtreleri
  const priorityFilters = [
    { id: "all", name: "Tümü", count: programs.length },
    { id: "critical", name: "Kritik", count: programs.filter(p => p.priority === "critical").length, color: "#EF4444" },
    { id: "high", name: "Yüksek", count: programs.filter(p => p.priority === "high").length, color: "#F59E0B" },
    { id: "medium", name: "Orta", count: programs.filter(p => p.priority === "medium").length, color: "#3B82F6" },
    { id: "low", name: "Düşük", count: programs.filter(p => p.priority === "low").length, color: "#10B981" }
  ]

  // Risk seviyesi filtreleri
  const riskLevelFilters = [
    { id: "all", name: "Tümü", count: programs.length },
    { id: "critical", name: "Kritik Risk", count: programs.filter(p => p.riskLevel === "critical").length, color: "#EF4444" },
    { id: "high", name: "Yüksek Risk", count: programs.filter(p => p.riskLevel === "high").length, color: "#F59E0B" },
    { id: "medium", name: "Orta Risk", count: programs.filter(p => p.riskLevel === "medium").length, color: "#3B82F6" },
    { id: "low", name: "Düşük Risk", count: programs.filter(p => p.riskLevel === "low").length, color: "#10B981" }
  ]

  // İş akışı aşaması filtreleri
  const workflowStageFilters = [
    { id: "all", name: "Tümü", count: programs.length },
    { id: "planning", name: "Planlama", count: programs.filter(p => p.workflowStage === "planning").length, color: "#3B82F6" },
    { id: "approval", name: "Onay", count: programs.filter(p => p.workflowStage === "approval").length, color: "#F59E0B" },
    { id: "execution", name: "Uygulama", count: programs.filter(p => p.workflowStage === "execution").length, color: "#8B5CF6" },
    { id: "verification", name: "Doğrulama", count: programs.filter(p => p.workflowStage === "verification").length, color: "#F97316" },
    { id: "complete", name: "Tamamlandı", count: programs.filter(p => p.workflowStage === "complete").length, color: "#10B981" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterPrograms()
  }, [programs, searchTerm, selectedStatus, selectedPriority, selectedRiskLevel, selectedWorkflowStage, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getCalibrationPrograms()
      // Transform data to match enhanced interface
      const enhancedData = data.map((program: any) => ({
        ...program,
        // Enhanced properties with default values
        automationEnabled: Math.random() > 0.5,
        complianceStandards: ['ISO 17025', 'ISO 9001'],
        riskLevel: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as 'low' | 'medium' | 'high' | 'critical',
        workflowStage: ['planning', 'approval', 'execution', 'verification', 'complete'][Math.floor(Math.random() * 5)] as 'planning' | 'approval' | 'execution' | 'verification' | 'complete',
        approvalChain: [
          {
            requiredBy: 'Quality Manager',
            approvedBy: 'Dr. Mehmet Özkan',
            approvedDate: '2024-01-10',
            status: 'approved' as const
          }
        ],
        dependencies: [],
        estimatedDuration: Math.floor(Math.random() * 240) + 60, // 60-300 minutes
        actualDuration: Math.floor(Math.random() * 180) + 90,
        qualityChecks: {
          preCalibration: true,
          postCalibration: true,
          documentation: true,
          traceability: true
        },
        environmentalRequirements: {
          temperature: '20±2°C',
          humidity: '50±10%',
          vibration: '<0.1 m/s²',
          cleanliness: 'ISO 14644-1 Class 7'
        },
        competencyRequirements: ['Calibration Technician Level 2', 'ISO 17025 Training'],
        documentLinks: ['SOP-CAL-001', 'WI-CAL-' + program.id],
        lastModified: '2024-01-15',
        modifiedBy: 'System Admin'
      }))
      setPrograms(enhancedData)
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

    // Risk seviyesi filtresi
    if (selectedRiskLevel !== "all") {
      filtered = filtered.filter(program => program.riskLevel === selectedRiskLevel)
    }

    // İş akışı aşaması filtresi
    if (selectedWorkflowStage !== "all") {
      filtered = filtered.filter(program => program.workflowStage === selectedWorkflowStage)
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
        case "riskLevel":
          const riskOrder = { 'low': 1, 'medium': 2, 'high': 3, 'critical': 4 }
          aValue = riskOrder[a.riskLevel]
          bValue = riskOrder[b.riskLevel]
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => setWorkflowDialogOpen(true)}
          >
            <Zap className="h-4 w-4 mr-2" />
            İş Akışı Kurulumu
          </Button>
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analitik Rapor
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Program İçe Aktar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Program
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Program</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPrograms}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activePrograms} aktif program
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
              {stats.overduePrograms}
            </div>
            <p className="text-xs text-muted-foreground">
              Acil müdahale gerekli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otomasyon Oranı</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              %{stats.automationRate}
            </div>
            <p className="text-xs text-muted-foreground">
              Otomatik iş akışı
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uygunluk Oranı</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              %{stats.complianceRate}
            </div>
            <p className="text-xs text-muted-foreground">
              ISO 17025 uyumluluğu
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
              {formatCurrency(stats.totalCost)}
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
          <div className="grid gap-4 md:grid-cols-5">
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
                        {status.color && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: status.color }}
                          />
                        )}
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
                        {priority.color && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: priority.color }}
                          />
                        )}
                        {priority.name} ({priority.count})
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
                  <SelectValue placeholder="Risk seçin" />
                </SelectTrigger>
                <SelectContent>
                  {riskLevelFilters.map((risk) => (
                    <SelectItem key={risk.id} value={risk.id}>
                      <div className="flex items-center gap-2">
                        {risk.color && (
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: risk.color }}
                          />
                        )}
                        {risk.name} ({risk.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {showAdvancedFilters && (
            <div className="grid gap-4 md:grid-cols-4 border-t pt-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">İş Akışı Aşaması</label>
                <Select value={selectedWorkflowStage} onValueChange={setSelectedWorkflowStage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Aşama seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {workflowStageFilters.map((stage) => (
                      <SelectItem key={stage.id} value={stage.id}>
                        <div className="flex items-center gap-2">
                          {stage.color && (
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: stage.color }}
                            />
                          )}
                          {stage.name} ({stage.count})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Otomasyon Durumu</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Otomasyon seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="enabled">Otomatik</SelectItem>
                    <SelectItem value="disabled">Manuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Uygunluk Durumu</label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Uygunluk seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="compliant">Uygun</SelectItem>
                    <SelectItem value="non-compliant">Uygunsuz</SelectItem>
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
          )}
          
          <div className="flex justify-between items-center pt-4">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Gelişmiş Filtreler
                {showAdvancedFilters ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
              </Button>
              {selectedPrograms.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setBulkActionDialogOpen(true)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Toplu İşlem ({selectedPrograms.length})
                </Button>
              )}
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredPrograms.length} sonuç listeleniyor
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
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortField)}>
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
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedPrograms.length === filteredPrograms.length && filteredPrograms.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPrograms(filteredPrograms.map(p => p.id))
                        } else {
                          setSelectedPrograms([])
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>Ekipman</TableHead>
                  <TableHead>Kalibrasyon Türü</TableHead>
                  <TableHead>Sıklık</TableHead>
                  <TableHead>Son Kalibrasyon</TableHead>
                  <TableHead>Sonraki Kalibrasyon</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Aşama</TableHead>
                  <TableHead>Otomasyon</TableHead>
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
                        <Checkbox
                          checked={selectedPrograms.includes(program.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedPrograms([...selectedPrograms, program.id])
                            } else {
                              setSelectedPrograms(selectedPrograms.filter(id => id !== program.id))
                            }
                          }}
                        />
                      </TableCell>
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
                        <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(program.riskLevel)}`}>
                          {program.riskLevel === 'low' ? 'Düşük' : 
                           program.riskLevel === 'medium' ? 'Orta' :
                           program.riskLevel === 'high' ? 'Yüksek' : 'Kritik'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getWorkflowStageColor(program.workflowStage)}`}>
                          {program.workflowStage === 'planning' ? 'Planlama' :
                           program.workflowStage === 'approval' ? 'Onay' :
                           program.workflowStage === 'execution' ? 'Uygulama' :
                           program.workflowStage === 'verification' ? 'Doğrulama' : 'Tamamlandı'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {program.automationEnabled ? (
                            <>
                              <Zap className="h-4 w-4 text-blue-500" />
                              <span className="text-xs text-blue-600">Otomatik</span>
                            </>
                          ) : (
                            <>
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-xs text-gray-600">Manuel</span>
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{formatCurrency(program.cost)}</div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProgram(program)
                                setIsDetailDialogOpen(true)
                              }}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Düzenle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="h-4 w-4 mr-2" />
                              Kopyala
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              İş Akışını Başlat
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Sil
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

      {/* Toplu İşlem Dialog */}
      <AlertDialog open={bulkActionDialogOpen} onOpenChange={setBulkActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Toplu İşlem</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPrograms.length} program için hangi işlemi gerçekleştirmek istiyorsunuz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('schedule')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Kalibrasyon Planla
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('approve')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Onayla
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('automate')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Otomasyonu Aktifleştir
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('export')}
            >
              <Download className="h-4 w-4 mr-2" />
              Rapor İndir
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* İş Akışı Dialog */}
      <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Otomatik İş Akışı Kurulumu</DialogTitle>
            <DialogDescription>
              Kalibrasyon programları için otomatik iş akışını yapılandırın
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tetikleyici Olay</label>
                <Select defaultValue="due_date">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due_date">Kalibrasyon Tarihi Yaklaşınca</SelectItem>
                    <SelectItem value="overdue">Süresi Geçince</SelectItem>
                    <SelectItem value="manual">Manuel Tetikleme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bildirim Süresi</label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 gün önce</SelectItem>
                    <SelectItem value="7">7 gün önce</SelectItem>
                    <SelectItem value="14">14 gün önce</SelectItem>
                    <SelectItem value="30">30 gün önce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Onay Zinciiri</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="quality-manager" defaultChecked />
                  <label htmlFor="quality-manager" className="text-sm">
                    Kalite Yöneticisi Onayı
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="technical-manager" defaultChecked />
                  <label htmlFor="technical-manager" className="text-sm">
                    Teknik Yönetici Onayı
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lab-manager" />
                  <label htmlFor="lab-manager" className="text-sm">
                    Laboratuvar Müdürü Onayı
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Otomatik Eylemler</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-schedule" defaultChecked />
                  <label htmlFor="auto-schedule" className="text-sm">
                    Otomatik Randevu Oluşturma
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-notification" defaultChecked />
                  <label htmlFor="auto-notification" className="text-sm">
                    Otomatik Bildirim Gönderme
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-documentation" />
                  <label htmlFor="auto-documentation" className="text-sm">
                    Otomatik Dokümentasyon
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkflowDialogOpen(false)}>
              Vazgeç
            </Button>
            <Button onClick={() => {
              toast.success('İş akışı kurulumu tamamlandı')
              setWorkflowDialogOpen(false)
            }}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
