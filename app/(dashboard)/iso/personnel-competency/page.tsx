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
  Users,
  UserCheck,
  UserX,
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
  BookOpen,
  Target,
  Star,
  Brain,
  Zap,
  Shield,
  Activity,
} from "lucide-react"
import { mockApi } from "@/lib/mock-data"

interface Competency {
  id: string
  personId: string
  personName: string
  department: string
  position: string
  competencyType: string
  skillName: string
  currentLevel: number
  targetLevel: number
  assessmentDate: string
  nextAssessmentDate: string
  assessor: string
  status: string
  evidence: string[]
  certifications: string[]
  trainingHistory: {
    courseName: string
    completionDate: string
    score: number
    provider: string
  }[]
  performanceMetrics: {
    accuracy: number
    efficiency: number
    quality: number
    innovation: number
  }
  developmentPlan: string
  mentorId?: string
  mentorName?: string
  notes: string
}

export default function PersonnelCompetencyPage() {
  const [competencies, setCompetencies] = useState<Competency[]>([])
  const [filteredCompetencies, setFilteredCompetencies] = useState<Competency[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedCompetencyType, setSelectedCompetencyType] = useState("all")
  const [sortBy, setSortBy] = useState("personName")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedCompetency, setSelectedCompetency] = useState<Competency | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 45 },
    { id: "competent", name: "Yeterli", count: 28, color: "#10B981" },
    { id: "developing", name: "Gelişiyor", count: 12, color: "#F59E0B" },
    { id: "needs_improvement", name: "Gelişim Gerekli", count: 5, color: "#EF4444" }
  ]

  // Yetkinlik türü filtreleri
  const competencyTypeFilters = [
    { id: "all", name: "Tümü", count: 45 },
    { id: "technical", name: "Teknik", count: 20, color: "#3B82F6" },
    { id: "soft_skills", name: "Yumuşak Beceriler", count: 15, color: "#8B5CF6" },
    { id: "leadership", name: "Liderlik", count: 6, color: "#F59E0B" },
    { id: "compliance", name: "Uyumluluk", count: 4, color: "#10B981" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterCompetencies()
  }, [competencies, searchTerm, selectedStatus, selectedCompetencyType, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getPersonnelCompetencies()
      setCompetencies(data)
    } catch (error) {
      console.error("Error fetching personnel competencies:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterCompetencies = () => {
    let filtered = [...competencies]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(competency =>
        competency.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competency.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competency.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competency.skillName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        competency.competencyType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(competency => competency.status === selectedStatus)
    }

    // Yetkinlik türü filtresi
    if (selectedCompetencyType !== "all") {
      filtered = filtered.filter(competency => competency.competencyType === selectedCompetencyType)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "personName":
          aValue = a.personName
          bValue = b.personName
          break
        case "skillName":
          aValue = a.skillName
          bValue = b.skillName
          break
        case "currentLevel":
          aValue = a.currentLevel
          bValue = b.currentLevel
          break
        case "assessmentDate":
          aValue = new Date(a.assessmentDate)
          bValue = new Date(b.assessmentDate)
          break
        case "department":
          aValue = a.department
          bValue = b.department
          break
        default:
          aValue = a.personName
          bValue = b.personName
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredCompetencies(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "competent":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "developing":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "needs_improvement":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "competent":
        return "bg-green-100 text-green-800"
      case "developing":
        return "bg-yellow-100 text-yellow-800"
      case "needs_improvement":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "competent":
        return "Yeterli"
      case "developing":
        return "Gelişiyor"
      case "needs_improvement":
        return "Gelişim Gerekli"
      default:
        return status
    }
  }

  const getCompetencyTypeColor = (type: string) => {
    switch (type) {
      case "technical":
        return "bg-blue-100 text-blue-800"
      case "soft_skills":
        return "bg-purple-100 text-purple-800"
      case "leadership":
        return "bg-yellow-100 text-yellow-800"
      case "compliance":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCompetencyTypeText = (type: string) => {
    switch (type) {
      case "technical":
        return "Teknik"
      case "soft_skills":
        return "Yumuşak Beceriler"
      case "leadership":
        return "Liderlik"
      case "compliance":
        return "Uyumluluk"
      default:
        return type
    }
  }

  const getLevelColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 100) return "text-green-600"
    if (percentage >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getDaysUntilAssessment = (dateString: string) => {
    const today = new Date()
    const assessmentDate = new Date(dateString)
    const diffTime = assessmentDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCompetencyProgress = (current: number, target: number) => {
    return Math.min(100, (current / target) * 100)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Personel Yetkinlik</h1>
            <p className="text-muted-foreground">Personel yetkinlik değerlendirmesi ve gelişim takibi</p>
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
          <h1 className="text-3xl font-bold text-foreground">Personel Yetkinlik</h1>
          <p className="text-muted-foreground">Personel yetkinlik değerlendirmesi ve gelişim takibi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Değerlendirme
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Yetkinlik</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competencies.length}</div>
            <p className="text-xs text-muted-foreground">
              {competencies.filter(c => c.status === "competent").length} yeterli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gelişim Gerekli</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {competencies.filter(c => c.status === "needs_improvement").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Acil gelişim planı gerekli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gelişiyor</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {competencies.filter(c => c.status === "developing").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Gelişim sürecinde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Seviye</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(competencies.reduce((sum, c) => sum + c.currentLevel, 0) / competencies.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">
              /5.0 hedef seviye
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Yetkinlik Filtreleme</CardTitle>
          <CardDescription>Personel yetkinliklerini durum, tür ve personel bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Personel, beceri ara..."
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
              <label className="text-sm font-medium">Yetkinlik Türü</label>
              <Select value={selectedCompetencyType} onValueChange={setSelectedCompetencyType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tür seçin" />
                </SelectTrigger>
                <SelectContent>
                  {competencyTypeFilters.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: type.color }}
                        />
                        {type.name} ({type.count})
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

      {/* Yetkinlik Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Personel Yetkinlikleri ({filteredCompetencies.length})</CardTitle>
              <CardDescription>
                {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
                {selectedCompetencyType !== "all" && ` | Tür: ${competencyTypeFilters.find(t => t.id === selectedCompetencyType)?.name}`}
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
                  <SelectItem value="skillName">Beceri</SelectItem>
                  <SelectItem value="currentLevel">Mevcut Seviye</SelectItem>
                  <SelectItem value="assessmentDate">Değerlendirme Tarihi</SelectItem>
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
                  <TableHead>Beceri</TableHead>
                  <TableHead>Tür</TableHead>
                  <TableHead>Mevcut Seviye</TableHead>
                  <TableHead>Hedef Seviye</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Son Değerlendirme</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCompetencies.map((competency) => {
                  const progress = getCompetencyProgress(competency.currentLevel, competency.targetLevel)
                  const daysUntil = getDaysUntilAssessment(competency.nextAssessmentDate)
                  
                  return (
                    <TableRow key={competency.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{competency.personName}</div>
                          <div className="text-sm text-muted-foreground">{competency.position}</div>
                          <div className="text-xs text-muted-foreground">{competency.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{competency.skillName}</div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCompetencyTypeColor(competency.competencyType)}>
                          {getCompetencyTypeText(competency.competencyType)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className={`text-sm font-medium ${getLevelColor(competency.currentLevel, competency.targetLevel)}`}>
                            {competency.currentLevel}/5
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">{competency.targetLevel}/5</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(competency.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(competency.status)}`}>
                            {getStatusText(competency.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(competency.assessmentDate)}</div>
                        <div className="text-xs text-muted-foreground">
                          {daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedCompetency(competency)
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
              {filteredCompetencies.map((competency) => {
                const progress = getCompetencyProgress(competency.currentLevel, competency.targetLevel)
                const daysUntil = getDaysUntilAssessment(competency.nextAssessmentDate)
                
                return (
                  <Card key={competency.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{competency.personName}</CardTitle>
                          <CardDescription>{competency.position} - {competency.department}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <Badge className={getCompetencyTypeColor(competency.competencyType)}>
                            {getCompetencyTypeText(competency.competencyType)}
                          </Badge>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(competency.status)}`}>
                            {getStatusText(competency.status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Beceri:</span>
                          <span className="font-medium">{competency.skillName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Mevcut Seviye:</span>
                          <span className={`font-medium ${getLevelColor(competency.currentLevel, competency.targetLevel)}`}>
                            {competency.currentLevel}/5
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Hedef Seviye:</span>
                          <span className="font-medium">{competency.targetLevel}/5</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Son Değerlendirme:</span>
                          <span>{formatDate(competency.assessmentDate)}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>İlerleme</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedCompetency(competency)
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

      {/* Yetkinlik Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedCompetency && getStatusIcon(selectedCompetency.status)}
              {selectedCompetency?.personName}
            </DialogTitle>
            <DialogDescription>
              {selectedCompetency?.position} - {selectedCompetency?.department}
            </DialogDescription>
          </DialogHeader>
          {selectedCompetency && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Personel Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ad Soyad:</strong> {selectedCompetency.personName}</div>
                    <div><strong>Pozisyon:</strong> {selectedCompetency.position}</div>
                    <div><strong>Departman:</strong> {selectedCompetency.department}</div>
                    <div><strong>Değerlendirme Tarihi:</strong> {formatDate(selectedCompetency.assessmentDate)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Yetkinlik Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Beceri:</strong> {selectedCompetency.skillName}</div>
                    <div><strong>Tür:</strong> {getCompetencyTypeText(selectedCompetency.competencyType)}</div>
                    <div><strong>Mevcut Seviye:</strong> {selectedCompetency.currentLevel}/5</div>
                    <div><strong>Hedef Seviye:</strong> {selectedCompetency.targetLevel}/5</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Seviye İlerlemesi</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mevcut Seviye: {selectedCompetency.currentLevel}/5</span>
                    <span>Hedef Seviye: {selectedCompetency.targetLevel}/5</span>
                  </div>
                  <Progress value={getCompetencyProgress(selectedCompetency.currentLevel, selectedCompetency.targetLevel)} className="h-3" />
                  <div className="text-xs text-muted-foreground">
                    {Math.round(getCompetencyProgress(selectedCompetency.currentLevel, selectedCompetency.targetLevel))}% hedefe ulaşma oranı
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Performans Metrikleri</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Doğruluk:</span>
                      <span>{selectedCompetency.performanceMetrics.accuracy}%</span>
                    </div>
                    <Progress value={selectedCompetency.performanceMetrics.accuracy} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Verimlilik:</span>
                      <span>{selectedCompetency.performanceMetrics.efficiency}%</span>
                    </div>
                    <Progress value={selectedCompetency.performanceMetrics.efficiency} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Kalite:</span>
                      <span>{selectedCompetency.performanceMetrics.quality}%</span>
                    </div>
                    <Progress value={selectedCompetency.performanceMetrics.quality} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>İnovasyon:</span>
                      <span>{selectedCompetency.performanceMetrics.innovation}%</span>
                    </div>
                    <Progress value={selectedCompetency.performanceMetrics.innovation} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Eğitim Geçmişi</h4>
                  <div className="space-y-2">
                    {selectedCompetency.trainingHistory.map((training, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        <div className="font-medium">{training.courseName}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(training.completionDate)} - {training.provider} - Skor: {training.score}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Sertifikalar</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompetency.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline">{cert}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kanıtlar</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCompetency.evidence.map((evidence, index) => (
                      <Badge key={index} variant="secondary">{evidence}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Gelişim Planı</h4>
                <p className="text-sm text-muted-foreground">{selectedCompetency.developmentPlan}</p>
              </div>

              {selectedCompetency.mentorName && (
                <div className="space-y-2">
                  <h4 className="font-medium">Mentor Bilgileri</h4>
                  <div className="text-sm">
                    <div><strong>Mentor:</strong> {selectedCompetency.mentorName}</div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-medium">Notlar</h4>
                <p className="text-sm text-muted-foreground">{selectedCompetency.notes}</p>
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