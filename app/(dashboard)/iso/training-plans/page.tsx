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
  BookOpen,
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
  Award,
  Target,
  Star,
  Brain,
  Zap,
  Shield,
  Activity,
  GraduationCap,
  UserCheck,
  UserX,
  Play,
  Pause,
  RotateCcw,
  X,
} from "lucide-react"
import { mockApi } from "@/lib/mock-data"

interface TrainingPlan {
  id: string
  title: string
  description: string
  category: string
  type: string
  level: string
  duration: number
  startDate: string
  endDate: string
  status: string
  instructor: string
  location: string
  maxParticipants: number
  currentParticipants: number
  objectives: string[]
  prerequisites: string[]
  materials: string[]
  assessmentMethod: string
  passingScore: number
  certificateIssued: boolean
  cost: number
  budget: number
  department: string
  priority: string
  createdBy: string
  createdDate: string
  lastModified: string
  completionRate: number
  satisfactionScore: number
  effectivenessScore: number
  notes: string
}

export default function TrainingPlansPage() {
  const [plans, setPlans] = useState<TrainingPlan[]>([])
  const [filteredPlans, setFilteredPlans] = useState<TrainingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("startDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isNewPlanDialogOpen, setIsNewPlanDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<TrainingPlan | null>(null)
  const [deletingPlan, setDeletingPlan] = useState<TrainingPlan | null>(null)

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 18 },
    { id: "planned", name: "Planlandı", count: 6, color: "#3B82F6" },
    { id: "ongoing", name: "Devam Ediyor", count: 4, color: "#F59E0B" },
    { id: "completed", name: "Tamamlandı", count: 5, color: "#10B981" },
    { id: "cancelled", name: "İptal Edildi", count: 2, color: "#EF4444" },
    { id: "postponed", name: "Ertelendi", count: 1, color: "#8B5CF6" }
  ]

  // Kategori filtreleri
  const categoryFilters = [
    { id: "all", name: "Tümü", count: 18 },
    { id: "technical", name: "Teknik", count: 8, color: "#3B82F6" },
    { id: "safety", name: "Güvenlik", count: 4, color: "#EF4444" },
    { id: "compliance", name: "Uyumluluk", count: 3, color: "#10B981" },
    { id: "soft_skills", name: "Yumuşak Beceriler", count: 2, color: "#8B5CF6" },
    { id: "leadership", name: "Liderlik", count: 1, color: "#F59E0B" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterPlans()
  }, [plans, searchTerm, selectedStatus, selectedCategory, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getTrainingPlans()
      setPlans(data)
    } catch (error) {
      console.error("Error fetching training plans:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPlans = () => {
    let filtered = [...plans]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(plan =>
        plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(plan => plan.status === selectedStatus)
    }

    // Kategori filtresi
    if (selectedCategory !== "all") {
      filtered = filtered.filter(plan => plan.category === selectedCategory)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "title":
          aValue = a.title
          bValue = b.title
          break
        case "startDate":
          aValue = new Date(a.startDate)
          bValue = new Date(b.startDate)
          break
        case "endDate":
          aValue = new Date(a.endDate)
          bValue = new Date(b.endDate)
          break
        case "completionRate":
          aValue = a.completionRate
          bValue = b.completionRate
          break
        case "satisfactionScore":
          aValue = a.satisfactionScore
          bValue = b.satisfactionScore
          break
        case "cost":
          aValue = a.cost
          bValue = b.cost
          break
        default:
          aValue = a.startDate
          bValue = b.startDate
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredPlans(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "ongoing":
        return <Play className="h-4 w-4 text-blue-500" />
      case "planned":
        return <Calendar className="h-4 w-4 text-gray-500" />
      case "cancelled":
        return <UserX className="h-4 w-4 text-red-500" />
      case "postponed":
        return <Pause className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "postponed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "ongoing":
        return "Devam Ediyor"
      case "planned":
        return "Planlandı"
      case "cancelled":
        return "İptal Edildi"
      case "postponed":
        return "Ertelendi"
      default:
        return status
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-800"
      case "safety":
        return "bg-red-100 text-red-800"
      case "compliance":
        return "bg-green-100 text-green-800"
      case "soft_skills":
        return "bg-purple-100 text-purple-800"
      case "leadership":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "technical":
        return "Teknik"
      case "safety":
        return "Güvenlik"
      case "compliance":
        return "Uyumluluk"
      case "soft_skills":
        return "Yumuşak Beceriler"
      case "leadership":
        return "Liderlik"
      default:
        return category
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getPriorityText = (priority: string) => {
    switch (priority) {
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

  const getDaysUntilStart = (dateString: string) => {
    const today = new Date()
    const startDate = new Date(dateString)
    const diffTime = startDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getDaysUntilEnd = (dateString: string) => {
    const today = new Date()
    const endDate = new Date(dateString)
    const diffTime = endDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // CRUD Fonksiyonları
  const handleNewPlan = () => {
    setEditingPlan(null)
    setIsNewPlanDialogOpen(true)
  }

  const handleEditPlan = (plan: TrainingPlan) => {
    setEditingPlan(plan)
    setIsEditDialogOpen(true)
  }

  const handleDeletePlan = (plan: TrainingPlan) => {
    setDeletingPlan(plan)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deletingPlan) {
      setPlans(prev => prev.filter(p => p.id !== deletingPlan.id))
      setDeletingPlan(null)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleSavePlan = (planData: Partial<TrainingPlan>) => {
    if (editingPlan) {
      // Güncelleme
      setPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...p, ...planData } : p))
    } else {
      // Yeni ekleme
      const newPlan: TrainingPlan = {
        id: `plan-${Date.now()}`,
        title: planData.title || "",
        description: planData.description || "",
        category: planData.category || "technical",
        type: planData.type || "İç Eğitim",
        level: planData.level || "Başlangıç",
        duration: planData.duration || 8,
        startDate: planData.startDate || new Date().toISOString().split('T')[0],
        endDate: planData.endDate || new Date().toISOString().split('T')[0],
        status: planData.status || "planned",
        instructor: planData.instructor || "",
        location: planData.location || "",
        maxParticipants: planData.maxParticipants || 20,
        currentParticipants: 0,
        objectives: planData.objectives || [],
        prerequisites: planData.prerequisites || [],
        materials: planData.materials || [],
        assessmentMethod: planData.assessmentMethod || "Sınav",
        passingScore: planData.passingScore || 70,
        certificateIssued: planData.certificateIssued || true,
        cost: planData.cost || 0,
        budget: planData.budget || 0,
        department: planData.department || "",
        priority: planData.priority || "medium",
        createdBy: "Mevcut Kullanıcı",
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        completionRate: 0,
        satisfactionScore: 0,
        effectivenessScore: 0,
        notes: planData.notes || "",
      }
      setPlans(prev => [...prev, newPlan])
    }
    setEditingPlan(null)
    setIsEditDialogOpen(false)
    setIsNewPlanDialogOpen(false)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Eğitim Planları</h1>
            <p className="text-muted-foreground">Personel eğitim planlaması ve takibi</p>
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
          <h1 className="text-3xl font-bold text-foreground">Eğitim Planları</h1>
          <p className="text-muted-foreground">Personel eğitim planlaması ve takibi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm" onClick={handleNewPlan}>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Plan
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Plan</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plans.length}</div>
            <p className="text-xs text-muted-foreground">
              {plans.filter(p => p.status === "ongoing").length} devam ediyor
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
              {plans.filter(p => p.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Bu ay tamamlanan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Memnuniyet</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(plans.reduce((sum, p) => sum + p.satisfactionScore, 0) / plans.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              /5.0 puan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Maliyet</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(plans.reduce((sum, p) => sum + p.cost, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Yıllık eğitim bütçesi
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Eğitim Filtreleme</CardTitle>
          <CardDescription>Eğitim planlarını durum, kategori ve tarih bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Eğitim, eğitmen ara..."
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
              <label className="text-sm font-medium">Kategori</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {categoryFilters.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name} ({category.count})
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

      {/* Eğitim Planları Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Eğitim Planları ({filteredPlans.length})</CardTitle>
              <CardDescription>
                {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
                {selectedCategory !== "all" && ` | Kategori: ${categoryFilters.find(c => c.id === selectedCategory)?.name}`}
                {searchTerm && ` | Arama: "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Başlık</SelectItem>
                  <SelectItem value="startDate">Başlangıç Tarihi</SelectItem>
                  <SelectItem value="endDate">Bitiş Tarihi</SelectItem>
                  <SelectItem value="completionRate">Tamamlanma Oranı</SelectItem>
                  <SelectItem value="satisfactionScore">Memnuniyet Skoru</SelectItem>
                  <SelectItem value="cost">Maliyet</SelectItem>
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
                  <TableHead>Eğitim</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Başlangıç</TableHead>
                  <TableHead>Bitiş</TableHead>
                  <TableHead>Katılımcı</TableHead>
                  <TableHead>Maliyet</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlans.map((plan) => {
                  const daysUntilStart = getDaysUntilStart(plan.startDate)
                  const daysUntilEnd = getDaysUntilEnd(plan.endDate)
                  
                  return (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{plan.title}</div>
                          <div className="text-sm text-muted-foreground">{plan.instructor}</div>
                          <div className="text-xs text-muted-foreground">{plan.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(plan.category)}>
                          {getCategoryText(plan.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(plan.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(plan.status)}`}>
                            {getStatusText(plan.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(plan.startDate)}</div>
                        <div className="text-xs text-muted-foreground">
                          {daysUntilStart > 0 ? `${daysUntilStart} gün kaldı` : `${Math.abs(daysUntilStart)} gün geçti`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(plan.endDate)}</div>
                        <div className="text-xs text-muted-foreground">
                          {daysUntilEnd > 0 ? `${daysUntilEnd} gün kaldı` : `${Math.abs(daysUntilEnd)} gün geçti`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{plan.currentParticipants}/{plan.maxParticipants}</div>
                        <Progress value={(plan.currentParticipants / plan.maxParticipants) * 100} className="h-2" />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{formatCurrency(plan.cost)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedPlan(plan)
                              setIsDetailDialogOpen(true)
                            }}
                            title="Detayları Görüntüle"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleEditPlan(plan)}
                            title="Düzenle"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeletePlan(plan)}
                            title="Sil"
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
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
              {filteredPlans.map((plan) => {
                const daysUntilStart = getDaysUntilStart(plan.startDate)
                const daysUntilEnd = getDaysUntilEnd(plan.endDate)
                
                return (
                  <Card key={plan.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{plan.title}</CardTitle>
                          <CardDescription>{plan.instructor} - {plan.department}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Badge className={getCategoryColor(plan.category)}>
                            {getCategoryText(plan.category)}
                          </Badge>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(plan.status)}`}>
                            {getStatusText(plan.status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Başlangıç:</span>
                          <span>{formatDate(plan.startDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bitiş:</span>
                          <span>{formatDate(plan.endDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Süre:</span>
                          <span>{plan.duration} saat</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Katılımcı:</span>
                          <span>{plan.currentParticipants}/{plan.maxParticipants}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Maliyet:</span>
                          <span className="font-medium">{formatCurrency(plan.cost)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Tamamlanma Oranı</span>
                          <span>{plan.completionRate}%</span>
                        </div>
                        <Progress value={plan.completionRate} className="h-2" />
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedPlan(plan)
                            setIsDetailDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Görüntüle
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditPlan(plan)}
                          title="Düzenle"
                        >
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

      {/* Eğitim Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedPlan && getStatusIcon(selectedPlan.status)}
              {selectedPlan?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedPlan?.instructor} - {selectedPlan?.department}
            </DialogDescription>
          </DialogHeader>
          {selectedPlan && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Eğitim Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Başlık:</strong> {selectedPlan.title}</div>
                    <div><strong>Kategori:</strong> {getCategoryText(selectedPlan.category)}</div>
                    <div><strong>Tür:</strong> {selectedPlan.type}</div>
                    <div><strong>Seviye:</strong> {selectedPlan.level}</div>
                    <div><strong>Süre:</strong> {selectedPlan.duration} saat</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Tarih ve Konum</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Başlangıç:</strong> {formatDate(selectedPlan.startDate)}</div>
                    <div><strong>Bitiş:</strong> {formatDate(selectedPlan.endDate)}</div>
                    <div><strong>Konum:</strong> {selectedPlan.location}</div>
                    <div><strong>Eğitmen:</strong> {selectedPlan.instructor}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedPlan.status)}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Açıklama</h4>
                <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Hedefler</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedPlan.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Önkoşullar</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedPlan.prerequisites.map((prerequisite, index) => (
                      <li key={index}>{prerequisite}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Katılımcı Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Mevcut Katılımcı:</strong> {selectedPlan.currentParticipants}</div>
                    <div><strong>Maksimum Katılımcı:</strong> {selectedPlan.maxParticipants}</div>
                    <div><strong>Doluluk Oranı:</strong> {Math.round((selectedPlan.currentParticipants / selectedPlan.maxParticipants) * 100)}%</div>
                    <Progress value={(selectedPlan.currentParticipants / selectedPlan.maxParticipants) * 100} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Değerlendirme</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Değerlendirme Yöntemi:</strong> {selectedPlan.assessmentMethod}</div>
                    <div><strong>Geçme Notu:</strong> {selectedPlan.passingScore}</div>
                    <div><strong>Sertifika Veriliyor:</strong> {selectedPlan.certificateIssued ? "Evet" : "Hayır"}</div>
                    <div><strong>Memnuniyet Skoru:</strong> {selectedPlan.satisfactionScore}/5</div>
                    <div><strong>Etkinlik Skoru:</strong> {selectedPlan.effectivenessScore}/5</div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Mali Bilgiler</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Maliyet:</strong> {formatCurrency(selectedPlan.cost)}</div>
                    <div><strong>Bütçe:</strong> {formatCurrency(selectedPlan.budget)}</div>
                    <div><strong>Öncelik:</strong> {getPriorityText(selectedPlan.priority)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Performans Metrikleri</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tamamlanma Oranı:</span>
                      <span>{selectedPlan.completionRate}%</span>
                    </div>
                    <Progress value={selectedPlan.completionRate} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Memnuniyet:</span>
                      <span>{selectedPlan.satisfactionScore}/5</span>
                    </div>
                    <Progress value={(selectedPlan.satisfactionScore / 5) * 100} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Eğitim Materyalleri</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedPlan.materials.map((material, index) => (
                    <Badge key={index} variant="outline">{material}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notlar</h4>
                <p className="text-sm text-muted-foreground">{selectedPlan.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Kapat
            </Button>
            <Button onClick={() => {
              if (selectedPlan) {
                handleEditPlan(selectedPlan)
                setIsDetailDialogOpen(false)
              }
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Silme Onay Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Eğitim Planını Sil</DialogTitle>
            <DialogDescription>
              "{deletingPlan?.title}" eğitim planını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              <X className="h-4 w-4 mr-2" />
              Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}