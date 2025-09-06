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
  ChevronLeft,
  ChevronRight,
  Upload,
  ChevronUp,
  ChevronDown,
} from "lucide-react"
import { mockApi } from "@/lib/mock-data"
import { toast } from "sonner"

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
  prerequisites: string
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
  const [formData, setFormData] = useState<Partial<TrainingPlan>>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [selectedPlans, setSelectedPlans] = useState<string[]>([])
  const [isBulkDeleteDialogOpen, setIsBulkDeleteDialogOpen] = useState(false)
  const [isBulkStatusDialogOpen, setIsBulkStatusDialogOpen] = useState(false)
  const [bulkStatus, setBulkStatus] = useState("")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [costRange, setCostRange] = useState({ min: "", max: "" })
  const [participantRange, setParticipantRange] = useState({ min: "", max: "" })
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [instructorFilter, setInstructorFilter] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [attachments, setAttachments] = useState<Record<string, File[]>>({})
  const [isAttachmentDialogOpen, setIsAttachmentDialogOpen] = useState(false)
  const [selectedPlanForAttachment, setSelectedPlanForAttachment] = useState<TrainingPlan | null>(null)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false)
  const [exportFormat, setExportFormat] = useState("excel")
  const [exportRange, setExportRange] = useState("all")
  const [calendarView, setCalendarView] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [calendarMode, setCalendarMode] = useState<"month" | "week" | "day">("month")

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
  }, [plans, searchTerm, selectedStatus, selectedCategory, sortBy, sortOrder, dateRange, costRange, participantRange, priorityFilter, instructorFilter])

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

    // Tarih aralığı filtresi
    if (dateRange.start) {
      filtered = filtered.filter(plan => new Date(plan.startDate) >= new Date(dateRange.start))
    }
    if (dateRange.end) {
      filtered = filtered.filter(plan => new Date(plan.startDate) <= new Date(dateRange.end))
    }

    // Maliyet aralığı filtresi
    if (costRange.min) {
      filtered = filtered.filter(plan => plan.cost >= parseFloat(costRange.min))
    }
    if (costRange.max) {
      filtered = filtered.filter(plan => plan.cost <= parseFloat(costRange.max))
    }

    // Katılımcı aralığı filtresi
    if (participantRange.min) {
      filtered = filtered.filter(plan => plan.maxParticipants >= parseInt(participantRange.min))
    }
    if (participantRange.max) {
      filtered = filtered.filter(plan => plan.maxParticipants <= parseInt(participantRange.max))
    }

    // Öncelik filtresi
    if (priorityFilter !== "all") {
      filtered = filtered.filter(plan => plan.priority === priorityFilter)
    }

    // Eğitmen filtresi
    if (instructorFilter) {
      filtered = filtered.filter(plan => 
        plan.instructor.toLowerCase().includes(instructorFilter.toLowerCase())
      )
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

  // Pagination Logic
  const totalPages = Math.ceil(filteredPlans.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPlans = filteredPlans.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSelectedPlans([]) // Seçimleri temizle
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // İlk sayfaya dön
    setSelectedPlans([]) // Seçimleri temizle
  }

  // Sayfa değiştiğinde seçimleri temizle
  useEffect(() => {
    setSelectedPlans([])
  }, [currentPage, itemsPerPage])

  // File Attachment Functions
  const handleFileUpload = (planId: string, files: FileList | null) => {
    if (!files) return
    
    const fileArray = Array.from(files)
    setAttachments(prev => ({
      ...prev,
      [planId]: [...(prev[planId] || []), ...fileArray]
    }))
    toast.success(`${fileArray.length} dosya başarıyla yüklendi`)
  }

  const handleFileRemove = (planId: string, fileIndex: number) => {
    setAttachments(prev => ({
      ...prev,
      [planId]: prev[planId]?.filter((_, index) => index !== fileIndex) || []
    }))
    toast.success("Dosya başarıyla silindi")
  }

  const handleAttachmentDialog = (plan: TrainingPlan) => {
    setSelectedPlanForAttachment(plan)
    setIsAttachmentDialogOpen(true)
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-500" />
      case 'doc':
      case 'docx':
        return <FileText className="h-4 w-4 text-blue-500" />
      case 'xls':
      case 'xlsx':
        return <FileText className="h-4 w-4 text-green-500" />
      case 'ppt':
      case 'pptx':
        return <FileText className="h-4 w-4 text-orange-500" />
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileText className="h-4 w-4 text-purple-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  // Export/Import Functions
  const handleExport = () => {
    const dataToExport = exportRange === "all" ? filteredPlans : paginatedPlans
    
    if (exportFormat === "excel") {
      exportToExcel(dataToExport)
    } else if (exportFormat === "pdf") {
      exportToPDF(dataToExport)
    } else if (exportFormat === "csv") {
      exportToCSV(dataToExport)
    }
    
    setIsExportDialogOpen(false)
  }

  const exportToExcel = (data: TrainingPlan[]) => {
    // Excel export simulation
    const headers = [
      "Başlık", "Açıklama", "Kategori", "Tür", "Seviye", "Durum",
      "Başlangıç Tarihi", "Bitiş Tarihi", "Süre (Saat)", "Eğitmen",
      "Konum", "Maksimum Katılımcı", "Mevcut Katılımcı", "Maliyet",
      "Departman", "Öncelik", "Oluşturan", "Oluşturma Tarihi"
    ]
    
    const csvContent = [
      headers.join(","),
      ...data.map(plan => [
        `"${plan.title}"`,
        `"${plan.description}"`,
        `"${getCategoryText(plan.category)}"`,
        `"${plan.type}"`,
        `"${plan.level}"`,
        `"${getStatusText(plan.status)}"`,
        `"${plan.startDate}"`,
        `"${plan.endDate}"`,
        plan.duration,
        `"${plan.instructor}"`,
        `"${plan.location}"`,
        plan.maxParticipants,
        plan.currentParticipants,
        plan.cost,
        `"${plan.department}"`,
        `"${plan.priority}"`,
        `"${plan.createdBy}"`,
        `"${plan.createdDate}"`
      ].join(","))
    ].join("\n")
    
    downloadFile(csvContent, "egitim-planlari.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    toast.success("Excel dosyası başarıyla indirildi")
  }

  const exportToPDF = (data: TrainingPlan[]) => {
    // PDF export simulation
    const content = `
      EĞİTİM PLANLARI RAPORU
      =====================
      
      Toplam Kayıt: ${data.length}
      Oluşturma Tarihi: ${new Date().toLocaleDateString('tr-TR')}
      
      ${data.map((plan, index) => `
      ${index + 1}. ${plan.title}
         - Eğitmen: ${plan.instructor}
         - Tarih: ${plan.startDate} - ${plan.endDate}
         - Durum: ${getStatusText(plan.status)}
         - Katılımcı: ${plan.currentParticipants}/${plan.maxParticipants}
         - Maliyet: ${plan.cost}₺
      `).join('\n')}
    `
    
    downloadFile(content, "egitim-planlari.pdf", "application/pdf")
    toast.success("PDF dosyası başarıyla indirildi")
  }

  const exportToCSV = (data: TrainingPlan[]) => {
    const headers = [
      "Başlık", "Açıklama", "Kategori", "Tür", "Seviye", "Durum",
      "Başlangıç Tarihi", "Bitiş Tarihi", "Süre (Saat)", "Eğitmen",
      "Konum", "Maksimum Katılımcı", "Mevcut Katılımcı", "Maliyet",
      "Departman", "Öncelik", "Oluşturan", "Oluşturma Tarihi"
    ]
    
    const csvContent = [
      headers.join(","),
      ...data.map(plan => [
        `"${plan.title}"`,
        `"${plan.description}"`,
        `"${getCategoryText(plan.category)}"`,
        `"${plan.type}"`,
        `"${plan.level}"`,
        `"${getStatusText(plan.status)}"`,
        `"${plan.startDate}"`,
        `"${plan.endDate}"`,
        plan.duration,
        `"${plan.instructor}"`,
        `"${plan.location}"`,
        plan.maxParticipants,
        plan.currentParticipants,
        plan.cost,
        `"${plan.department}"`,
        `"${plan.priority}"`,
        `"${plan.createdBy}"`,
        `"${plan.createdDate}"`
      ].join(","))
    ].join("\n")
    
    downloadFile(csvContent, "egitim-planlari.csv", "text/csv")
    toast.success("CSV dosyası başarıyla indirildi")
  }

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string
        if (file.name.endsWith('.csv')) {
          parseCSVImport(content)
        } else {
          toast.error("Sadece CSV dosyaları desteklenmektedir")
        }
      } catch (error) {
        toast.error("Dosya okunurken hata oluştu")
      }
    }
    reader.readAsText(file)
  }

  const parseCSVImport = (content: string) => {
    const lines = content.split('\n')
    const headers = lines[0].split(',').map(h => h.replace(/"/g, ''))
    
    const importedPlans: TrainingPlan[] = []
    
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim()) {
        const values = lines[i].split(',').map(v => v.replace(/"/g, ''))
        if (values.length >= headers.length) {
          const newPlan: TrainingPlan = {
            id: `imported-${Date.now()}-${i}`,
            title: values[0] || "",
            description: values[1] || "",
            category: values[2]?.toLowerCase() || "technical",
            type: values[3] || "İç Eğitim",
            level: values[4] || "Başlangıç",
            duration: parseInt(values[8]) || 8,
            startDate: values[6] || new Date().toISOString().split('T')[0],
            endDate: values[7] || new Date().toISOString().split('T')[0],
            status: values[5]?.toLowerCase() || "planned",
            instructor: values[9] || "",
            location: values[10] || "",
            maxParticipants: parseInt(values[11]) || 20,
            currentParticipants: parseInt(values[12]) || 0,
            objectives: [],
            prerequisites: "",
            materials: [],
            assessmentMethod: "Sınav",
            passingScore: 70,
            certificateIssued: true,
            cost: parseFloat(values[13]) || 0,
            budget: 0,
            department: values[14] || "",
            priority: values[15]?.toLowerCase() || "medium",
            createdBy: values[16] || "İçe Aktarılan",
            createdDate: values[17] || new Date().toISOString().split('T')[0],
            lastModified: new Date().toISOString().split('T')[0],
            completionRate: 0,
            satisfactionScore: 0,
            effectivenessScore: 0,
            notes: "",
          }
          importedPlans.push(newPlan)
        }
      }
    }
    
    if (importedPlans.length > 0) {
      setPlans(prev => [...prev, ...importedPlans])
      toast.success(`${importedPlans.length} eğitim planı başarıyla içe aktarıldı`)
    } else {
      toast.error("İçe aktarılacak geçerli veri bulunamadı")
    }
  }

  // Calendar Functions
  const getPlansForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0]
    return filteredPlans.filter(plan => 
      plan.startDate === dateStr || 
      (new Date(plan.startDate) <= date && new Date(plan.endDate) >= date)
    )
  }

  const getPlansForMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return filteredPlans.filter(plan => {
      const planStart = new Date(plan.startDate)
      const planEnd = new Date(plan.endDate)
      return (
        (planStart.getFullYear() === year && planStart.getMonth() === month) ||
        (planEnd.getFullYear() === year && planEnd.getMonth() === month) ||
        (planStart <= new Date(year, month, 1) && planEnd >= new Date(year, month + 1, 0))
      )
    })
  }

  const getPlansForWeek = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    
    return filteredPlans.filter(plan => {
      const planStart = new Date(plan.startDate)
      const planEnd = new Date(plan.endDate)
      return (
        (planStart >= startOfWeek && planStart <= endOfWeek) ||
        (planEnd >= startOfWeek && planEnd <= endOfWeek) ||
        (planStart <= startOfWeek && planEnd >= endOfWeek)
      )
    })
  }

  const checkForConflicts = (plan: TrainingPlan) => {
    const planStart = new Date(plan.startDate)
    const planEnd = new Date(plan.endDate)
    
    return filteredPlans.filter(otherPlan => {
      if (otherPlan.id === plan.id) return false
      
      const otherStart = new Date(otherPlan.startDate)
      const otherEnd = new Date(otherPlan.endDate)
      
      return (
        (planStart >= otherStart && planStart <= otherEnd) ||
        (planEnd >= otherStart && planEnd <= otherEnd) ||
        (planStart <= otherStart && planEnd >= otherEnd)
      )
    })
  }

  const getCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())
    
    const days = []
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate)
      day.setDate(startDate.getDate() + i)
      days.push(day)
    }
    return days
  }

  const getWeekDays = (date: Date) => {
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay())
    
    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const formatCalendarDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
    setFormData({})
    setFormErrors({})
    setIsNewPlanDialogOpen(true)
  }

  const handleEditPlan = (plan: TrainingPlan) => {
    setEditingPlan(plan)
    setFormData(plan)
    setFormErrors({})
    setIsEditDialogOpen(true)
  }

  const handleDeletePlan = (plan: TrainingPlan) => {
    setDeletingPlan(plan)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (deletingPlan) {
      setPlans(prev => prev.filter(p => p.id !== deletingPlan.id))
      toast.success("Eğitim planı başarıyla silindi")
      setDeletingPlan(null)
      setIsDeleteDialogOpen(false)
    }
  }

  // Form Validation
  const validateForm = (data: Partial<TrainingPlan>) => {
    const errors: Record<string, string> = {}
    
    if (!data.title?.trim()) errors.title = "Başlık zorunludur"
    if (!data.description?.trim()) errors.description = "Açıklama zorunludur"
    if (!data.instructor?.trim()) errors.instructor = "Eğitmen zorunludur"
    if (!data.location?.trim()) errors.location = "Konum zorunludur"
    if (!data.startDate) errors.startDate = "Başlangıç tarihi zorunludur"
    if (!data.endDate) errors.endDate = "Bitiş tarihi zorunludur"
    if (data.startDate && data.endDate && new Date(data.startDate) >= new Date(data.endDate)) {
      errors.endDate = "Bitiş tarihi başlangıç tarihinden sonra olmalıdır"
    }
    if (!data.maxParticipants || data.maxParticipants < 1) errors.maxParticipants = "Maksimum katılımcı sayısı 1'den büyük olmalıdır"
    if (!data.duration || data.duration < 1) errors.duration = "Süre 1 saatten fazla olmalıdır"
    if (!data.cost || data.cost < 0) errors.cost = "Maliyet 0'dan küçük olamaz"
    
    return errors
  }

  const handleSavePlan = (planData: Partial<TrainingPlan>) => {
    const errors = validateForm(planData)
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      toast.error("Lütfen tüm zorunlu alanları doldurun")
      return
    }

    setFormErrors({})
    
    if (editingPlan) {
      // Güncelleme
      setPlans(prev => prev.map(p => p.id === editingPlan.id ? { ...p, ...planData } : p))
      toast.success("Eğitim planı başarıyla güncellendi")
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
        prerequisites: planData.prerequisites || "",
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
      toast.success("Yeni eğitim planı başarıyla oluşturuldu")
    }
    setEditingPlan(null)
    setFormData({})
    setIsEditDialogOpen(false)
    setIsNewPlanDialogOpen(false)
  }

  // Bulk Operations
  const handleSelectPlan = (planId: string, checked: boolean) => {
    if (checked) {
      setSelectedPlans(prev => [...prev, planId])
    } else {
      setSelectedPlans(prev => prev.filter(id => id !== planId))
    }
  }

  const handleSelectAllPlans = (checked: boolean) => {
    if (checked) {
      setSelectedPlans(filteredPlans.map(plan => plan.id))
    } else {
      setSelectedPlans([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedPlans.length === 0) {
      toast.error("Lütfen silinecek eğitim planlarını seçin")
      return
    }
    setIsBulkDeleteDialogOpen(true)
  }

  const confirmBulkDelete = () => {
    setPlans(prev => prev.filter(plan => !selectedPlans.includes(plan.id)))
    toast.success(`${selectedPlans.length} eğitim planı başarıyla silindi`)
    setSelectedPlans([])
    setIsBulkDeleteDialogOpen(false)
  }

  const handleBulkStatusChange = () => {
    if (selectedPlans.length === 0) {
      toast.error("Lütfen durumu değiştirilecek eğitim planlarını seçin")
      return
    }
    if (!bulkStatus) {
      toast.error("Lütfen yeni durumu seçin")
      return
    }
    setIsBulkStatusDialogOpen(true)
  }

  const confirmBulkStatusChange = () => {
    setPlans(prev => prev.map(plan => 
      selectedPlans.includes(plan.id) 
        ? { ...plan, status: bulkStatus }
        : plan
    ))
    toast.success(`${selectedPlans.length} eğitim planının durumu "${getStatusText(bulkStatus)}" olarak güncellendi`)
    setSelectedPlans([])
    setBulkStatus("")
    setIsBulkStatusDialogOpen(false)
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
          {selectedPlans.length > 0 && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleBulkStatusChange}
              >
                <Settings className="h-4 w-4 mr-2" />
                Durum Değiştir ({selectedPlans.length})
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={handleBulkDelete}
              >
                <X className="h-4 w-4 mr-2" />
                Seçilenleri Sil ({selectedPlans.length})
              </Button>
            </>
          )}
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsExportDialogOpen(true)}
          >
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsImportDialogOpen(true)}
          >
            <Upload className="h-4 w-4 mr-2" />
            İçe Aktar
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
          <div className="space-y-6">
            {/* Temel Filtreler */}
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
                  <Button
                    variant={calendarView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCalendarView(!calendarView)}
                  >
                    <Calendar className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Gelişmiş Filtreler */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-4">Gelişmiş Filtreler</h4>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarih Aralığı</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      placeholder="Başlangıç"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    />
                    <Input
                      type="date"
                      placeholder="Bitiş"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Maliyet Aralığı (₺)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={costRange.min}
                      onChange={(e) => setCostRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={costRange.max}
                      onChange={(e) => setCostRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Katılımcı Sayısı</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={participantRange.min}
                      onChange={(e) => setParticipantRange(prev => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={participantRange.max}
                      onChange={(e) => setParticipantRange(prev => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Öncelik</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="high">Yüksek</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="low">Düşük</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Eğitmen</label>
                  <Input
                    placeholder="Eğitmen ara..."
                    value={instructorFilter}
                    onChange={(e) => setInstructorFilter(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Filtreleri Temizle</label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setDateRange({ start: "", end: "" })
                      setCostRange({ min: "", max: "" })
                      setParticipantRange({ min: "", max: "" })
                      setPriorityFilter("all")
                      setInstructorFilter("")
                      setSearchTerm("")
                      setSelectedStatus("all")
                      setSelectedCategory("all")
                    }}
                    className="w-full"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Temizle
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar View */}
      {calendarView ? (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Takvim Görünümü</CardTitle>
                <CardDescription>
                  Eğitim planlarını takvim formatında görüntüleyin
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={calendarMode} onValueChange={(value: "month" | "week" | "day") => setCalendarMode(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Ay</SelectItem>
                    <SelectItem value="week">Hafta</SelectItem>
                    <SelectItem value="day">Gün</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDate(new Date())}
                >
                  Bugün
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {calendarMode === "month" && (
              <div className="space-y-4">
                {/* Month Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {selectedDate.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' })}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Month Calendar */}
                <div className="grid grid-cols-7 gap-1">
                  {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {getCalendarDays(selectedDate).map((day, index) => {
                    const dayPlans = getPlansForDate(day)
                    const isCurrentMonth = day.getMonth() === selectedDate.getMonth()
                    const isToday = day.toDateString() === new Date().toDateString()
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[100px] p-2 border rounded-lg ${
                          isCurrentMonth ? 'bg-background' : 'bg-muted/50'
                        } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
                      >
                        <div className={`text-sm font-medium ${isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {day.getDate()}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayPlans.slice(0, 3).map(plan => (
                            <div
                              key={plan.id}
                              className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate cursor-pointer hover:bg-blue-200"
                              onClick={() => {
                                setSelectedPlan(plan)
                                setIsDetailDialogOpen(true)
                              }}
                              title={plan.title}
                            >
                              {plan.title}
                            </div>
                          ))}
                          {dayPlans.length > 3 && (
                            <div className="text-xs text-muted-foreground">
                              +{dayPlans.length - 3} daha
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {calendarMode === "week" && (
              <div className="space-y-4">
                {/* Week Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {formatCalendarDate(getWeekDays(selectedDate)[0])} - {formatCalendarDate(getWeekDays(selectedDate)[6])}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Week Calendar */}
                <div className="grid grid-cols-7 gap-4">
                  {getWeekDays(selectedDate).map((day, index) => {
                    const dayPlans = getPlansForDate(day)
                    const isToday = day.toDateString() === new Date().toDateString()
                    
                    return (
                      <div key={index} className="space-y-2">
                        <div className={`text-center font-medium ${isToday ? 'text-blue-600' : 'text-foreground'}`}>
                          {day.toLocaleDateString('tr-TR', { weekday: 'short' })}
                          <div className="text-sm">{day.getDate()}</div>
                        </div>
                        <div className="space-y-1 min-h-[200px]">
                          {dayPlans.map(plan => (
                            <div
                              key={plan.id}
                              className="text-xs p-2 bg-blue-100 text-blue-800 rounded cursor-pointer hover:bg-blue-200"
                              onClick={() => {
                                setSelectedPlan(plan)
                                setIsDetailDialogOpen(true)
                              }}
                            >
                              <div className="font-medium truncate">{plan.title}</div>
                              <div className="text-blue-600">{plan.instructor}</div>
                              <div className="text-blue-500">{plan.startDate}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {calendarMode === "day" && (
              <div className="space-y-4">
                {/* Day Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {formatCalendarDate(selectedDate)}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Day Calendar */}
                <div className="space-y-2">
                  {getPlansForDate(selectedDate).map(plan => {
                    const conflicts = checkForConflicts(plan)
                    return (
                      <Card key={plan.id} className={`${conflicts.length > 0 ? 'border-red-200 bg-red-50' : ''}`}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <h4 className="font-medium">{plan.title}</h4>
                              <p className="text-sm text-muted-foreground">{plan.instructor}</p>
                              <p className="text-sm text-muted-foreground">
                                {plan.startDate} - {plan.endDate}
                              </p>
                              {conflicts.length > 0 && (
                                <div className="text-sm text-red-600">
                                  ⚠️ {conflicts.length} çakışma tespit edildi
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedPlan(plan)
                                  setIsDetailDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditPlan(plan)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                  {getPlansForDate(selectedDate).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>Bu tarihte eğitim planı bulunmuyor</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
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
                  <TableHead>
                    <Checkbox
                      checked={selectedPlans.length === filteredPlans.length && filteredPlans.length > 0}
                      onCheckedChange={handleSelectAllPlans}
                    />
                  </TableHead>
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
                {paginatedPlans.map((plan) => {
                  const daysUntilStart = getDaysUntilStart(plan.startDate)
                  const daysUntilEnd = getDaysUntilEnd(plan.endDate)
                  
                  return (
                    <TableRow key={plan.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedPlans.includes(plan.id)}
                          onCheckedChange={(checked) => handleSelectPlan(plan.id, checked as boolean)}
                        />
                      </TableCell>
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
                            onClick={() => handleAttachmentDialog(plan)}
                            title="Dosya Yönetimi"
                          >
                            <FileText className="h-4 w-4" />
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
              {paginatedPlans.map((plan) => {
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
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAttachmentDialog(plan)}
                          title="Dosya Yönetimi"
                        >
                          <FileText className="h-4 w-4" />
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

      {/* Pagination */}
      <Card>
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">Sayfa başına:</label>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => handleItemsPerPageChange(parseInt(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-muted-foreground">
                {startIndex + 1}-{Math.min(endIndex, filteredPlans.length)} / {filteredPlans.length} kayıt
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber
                  if (totalPages <= 5) {
                    pageNumber = i + 1
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i
                  } else {
                    pageNumber = currentPage - 2 + i
                  }
                  
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNumber)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  )
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Sonraki
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
                  <p className="text-sm text-muted-foreground">{selectedPlan.prerequisites}</p>
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

      {/* Düzenleme Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPlan ? "Eğitim Planını Düzenle" : "Yeni Eğitim Planı"}
            </DialogTitle>
            <DialogDescription>
              Eğitim planı bilgilerini düzenleyin veya yeni plan oluşturun
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={formData.title || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className={formErrors.title ? "border-red-500" : ""}
                />
                {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="instructor">Eğitmen *</Label>
                <Input
                  id="instructor"
                  value={formData.instructor || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  className={formErrors.instructor ? "border-red-500" : ""}
                />
                {formErrors.instructor && <p className="text-sm text-red-500">{formErrors.instructor}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama *</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className={formErrors.description ? "border-red-500" : ""}
                rows={3}
              />
              {formErrors.description && <p className="text-sm text-red-500">{formErrors.description}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={formData.category || "technical"}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Teknik</SelectItem>
                    <SelectItem value="safety">Güvenlik</SelectItem>
                    <SelectItem value="compliance">Uyumluluk</SelectItem>
                    <SelectItem value="soft_skills">Yumuşak Beceriler</SelectItem>
                    <SelectItem value="leadership">Liderlik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Tür</Label>
                <Select
                  value={formData.type || "İç Eğitim"}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="İç Eğitim">İç Eğitim</SelectItem>
                    <SelectItem value="Dış Eğitim">Dış Eğitim</SelectItem>
                    <SelectItem value="Online Eğitim">Online Eğitim</SelectItem>
                    <SelectItem value="Sertifikalı Eğitim">Sertifikalı Eğitim</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Seviye</Label>
                <Select
                  value={formData.level || "Başlangıç"}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, level: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Başlangıç">Başlangıç</SelectItem>
                    <SelectItem value="Orta">Orta</SelectItem>
                    <SelectItem value="İleri">İleri</SelectItem>
                    <SelectItem value="Uzman">Uzman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="startDate">Başlangıç Tarihi *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                  className={formErrors.startDate ? "border-red-500" : ""}
                />
                {formErrors.startDate && <p className="text-sm text-red-500">{formErrors.startDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Bitiş Tarihi *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className={formErrors.endDate ? "border-red-500" : ""}
                />
                {formErrors.endDate && <p className="text-sm text-red-500">{formErrors.endDate}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="duration">Süre (Saat) *</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                  className={formErrors.duration ? "border-red-500" : ""}
                />
                {formErrors.duration && <p className="text-sm text-red-500">{formErrors.duration}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Maksimum Katılımcı *</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={formData.maxParticipants || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) || 0 }))}
                  className={formErrors.maxParticipants ? "border-red-500" : ""}
                />
                {formErrors.maxParticipants && <p className="text-sm text-red-500">{formErrors.maxParticipants}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cost">Maliyet (₺) *</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.cost || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                  className={formErrors.cost ? "border-red-500" : ""}
                />
                {formErrors.cost && <p className="text-sm text-red-500">{formErrors.cost}</p>}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Konum *</Label>
                <Input
                  id="location"
                  value={formData.location || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className={formErrors.location ? "border-red-500" : ""}
                />
                {formErrors.location && <p className="text-sm text-red-500">{formErrors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Input
                  id="department"
                  value={formData.department || ""}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prerequisites">Önkoşullar</Label>
              <Textarea
                id="prerequisites"
                value={formData.prerequisites || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, prerequisites: e.target.value }))}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notlar</Label>
              <Textarea
                id="notes"
                value={formData.notes || ""}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false)
              setFormData({})
              setFormErrors({})
            }}>
              İptal
            </Button>
            <Button onClick={() => handleSavePlan(formData)}>
              {editingPlan ? "Güncelle" : "Oluştur"}
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

      {/* Bulk Delete Dialog */}
      <Dialog open={isBulkDeleteDialogOpen} onOpenChange={setIsBulkDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seçilen Eğitim Planlarını Sil</DialogTitle>
            <DialogDescription>
              {selectedPlans.length} eğitim planını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkDeleteDialogOpen(false)}>
              İptal
            </Button>
            <Button variant="destructive" onClick={confirmBulkDelete}>
              <X className="h-4 w-4 mr-2" />
              Sil ({selectedPlans.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Status Change Dialog */}
      <Dialog open={isBulkStatusDialogOpen} onOpenChange={setIsBulkStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Seçilen Eğitim Planlarının Durumunu Değiştir</DialogTitle>
            <DialogDescription>
              {selectedPlans.length} eğitim planının durumunu değiştirin
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bulkStatus">Yeni Durum</Label>
              <Select value={bulkStatus} onValueChange={setBulkStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planlandı</SelectItem>
                  <SelectItem value="ongoing">Devam Ediyor</SelectItem>
                  <SelectItem value="completed">Tamamlandı</SelectItem>
                  <SelectItem value="cancelled">İptal Edildi</SelectItem>
                  <SelectItem value="postponed">Ertelendi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkStatusDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={confirmBulkStatusChange}>
              <Settings className="h-4 w-4 mr-2" />
              Durumu Değiştir ({selectedPlans.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Attachment Dialog */}
      <Dialog open={isAttachmentDialogOpen} onOpenChange={setIsAttachmentDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Dosya Yönetimi</DialogTitle>
            <DialogDescription>
              {selectedPlanForAttachment?.title} eğitim planına dosya ekleyin veya yönetin
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="file-upload">Dosya Yükle</Label>
              <Input
                id="file-upload"
                type="file"
                multiple
                onChange={(e) => selectedPlanForAttachment && handleFileUpload(selectedPlanForAttachment.id, e.target.files)}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                PDF, DOC, XLS, PPT, JPG, PNG dosyalarını yükleyebilirsiniz (Max: 10MB)
              </p>
            </div>

            {/* File List */}
            <div className="space-y-2">
              <Label>Yüklenen Dosyalar</Label>
              {selectedPlanForAttachment && attachments[selectedPlanForAttachment.id]?.length > 0 ? (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {attachments[selectedPlanForAttachment.id].map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getFileIcon(file.name)}
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => selectedPlanForAttachment && handleFileRemove(selectedPlanForAttachment.id, index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Henüz dosya yüklenmemiş</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAttachmentDialogOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dışa Aktar</DialogTitle>
            <DialogDescription>
              Eğitim planlarını farklı formatlarda dışa aktarın
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exportFormat">Dosya Formatı</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                  <SelectItem value="csv">CSV (.csv)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exportRange">Aktarılacak Veri</Label>
              <Select value={exportRange} onValueChange={setExportRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Filtrelenmiş Veriler ({filteredPlans.length} kayıt)</SelectItem>
                  <SelectItem value="current">Mevcut Sayfa ({paginatedPlans.length} kayıt)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Dışa Aktarılacak Veriler:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Başlık, Açıklama, Kategori, Tür, Seviye</li>
                <li>• Durum, Tarihler, Süre, Eğitmen</li>
                <li>• Konum, Katılımcı Sayıları, Maliyet</li>
                <li>• Departman, Öncelik, Oluşturan Bilgileri</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>İçe Aktar</DialogTitle>
            <DialogDescription>
              CSV dosyasından eğitim planlarını içe aktarın
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="importFile">CSV Dosyası Seçin</Label>
              <Input
                id="importFile"
                type="file"
                accept=".csv"
                onChange={handleImport}
                className="cursor-pointer"
              />
              <p className="text-sm text-muted-foreground">
                Sadece CSV dosyaları desteklenmektedir
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">CSV Format Gereksinimleri:</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• İlk satır başlık satırı olmalıdır</li>
                <li>• Virgül (,) ile ayrılmış değerler</li>
                <li>• Metin değerleri çift tırnak içinde</li>
                <li>• Desteklenen sütunlar: Başlık, Açıklama, Kategori, vb.</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Örnek CSV Formatı:</h4>
              <pre className="text-xs text-green-800 bg-white p-2 rounded border overflow-x-auto">
{`"Başlık","Açıklama","Kategori","Tür","Seviye","Durum"
"ISO 17025 Eğitimi","Kalite yönetim sistemi eğitimi","compliance","İç Eğitim","Orta","planned"`}
              </pre>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)}>
              Kapat
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
        </>
      )}
    </div>
  )
}