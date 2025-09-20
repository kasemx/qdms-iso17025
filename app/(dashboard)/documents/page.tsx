"use client"

import { useState, useEffect, memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Search,
  Filter,
  Plus,
  FileText,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  Building,
  History,
  XCircle,
  Archive,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Shield,
  BookOpen,
  FileCheck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  TreePine,
  Clock3,
  SortAsc,
  SortDesc,
  TrendingUp,
  TrendingDown,
  Activity,
  Bell,
  Settings,
  Upload,
  Mail,
  Send,
  GitCompare
} from "lucide-react"
import Link from "next/link"
import { mockApi } from "@/lib/mock-data"
import { toast } from "sonner"
import { PageLayout, LoadingState } from "@/components/common"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { DOCUMENT_CONSTANTS } from "@/lib/constants/dashboard"

// Interface tanımları
interface Document {
  id: string
  code: string
  title: string
  category: {
    id: string
    code: string
    name: string
    color: string
    icon: string
  }
  version: string
  status: string
  description: string
  content: string
  author: string
  reviewer: string
  approver: string | null
  createdAt: string
  updatedAt: string
  publishedAt?: string | null
  nextReviewDate: string | null
  distributionList: string[]
  relatedDocuments: string[]
  tags: string[]
  fileSize: number
  fileType: string
  isActive: boolean
  workflow: {
    currentStep: string
    steps: Array<{
      step: string
      user: string
      date: string
      comment: string
    }>
  }
  changeControl: {
    changeRequestId: string | null
    changeReason: string
    impactAnalysis: string
    changeApprovedBy: string | null
    changeApprovedDate: string | null
  }
  retentionPeriod: number
  securityLevel: string
  isExternal: boolean
  externalSource: string | null
  digitalSignature: {
    signed: boolean
    signer: string | null
    signatureDate: string | null
    certificateValid: boolean
  }
  // Çoklu Seviye Hiyerarşi için Ek Alanlar
  parentId?: string | null
  children?: Document[]
  level: number
  isExpanded?: boolean
  sortOrder: number
  // Drag & Drop için
  isDragging?: boolean
  isDropTarget?: boolean
}

interface DocumentStats {
  totalDocuments: number
  activeDocuments: number
  draftDocuments: number
  reviewDocuments: number
  approvedDocuments: number
  obsoleteDocuments: number
  externalDocuments: number
  totalCategories: number
  totalVersions: number
  averageReviewTime: string
  complianceRate: number
  workflowStats: {
    pendingReview: number
    pendingApproval: number
    published: number
    obsolete: number
    external: number
  }
  retentionStats: {
    expiringSoon: number
    expired: number
    archived: number
  }
  securityStats: {
    confidential: number
    internal: number
    public: number
  }
}

interface CategoryStats {
  category: string
  count: number
  percentage: number
  trend: string
  color: string
}

interface QuickFilter {
  id: string
  name: string
  icon: string
  color: string
}

// Utility fonksiyonları
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = DOCUMENT_CONSTANTS.FILE_SIZE.CONVERSION_FACTOR
    const sizes = DOCUMENT_CONSTANTS.FILE_SIZE.UNITS
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("tr-TR")
}

const getDaysAgo = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "draft":
      return <FileText className="h-4 w-4 text-gray-500" />
    case "review":
      return <Clock className="h-4 w-4 text-yellow-500" />
    case "approved":
    case "published":
      return <CheckCircle className="h-4 w-4 text-green-500" />
    case "obsolete":
      return <Archive className="h-4 w-4 text-gray-500" />
    case "active":
      return <Activity className="h-4 w-4 text-blue-500" />
    default:
      return <FileText className="h-4 w-4 text-gray-500" />
  }
}

const getStatusVariant = (status: string | undefined) => {
  if (!status) return "secondary"
  switch (status) {
    case "draft":
      return "secondary"
    case "review":
      return "default"
    case "approved":
    case "published":
      return "default"
    case "obsolete":
      return "destructive"
    case "active":
      return "default"
    default:
      return "secondary"
  }
}

const getStatusText = (status: string | undefined) => {
  if (!status) return "Bilinmiyor"
  switch (status) {
    case "draft":
      return "Taslak"
    case "review":
      return "İnceleme"
    case "approved":
      return "Onaylandı"
    case "published":
      return "Yayınlandı"
    case "obsolete":
      return "Eski"
    case "active":
      return "Aktif"
    default:
      return status
  }
}

export default function DocumentsPage() {
  // Ana state'ler
  const [documents, setDocuments] = useState<Document[]>([])
  const [documentStats, setDocumentStats] = useState<DocumentStats | null>(null)
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [popularSearches, setPopularSearches] = useState<string[]>([])
  const [quickFilters, setQuickFilters] = useState<QuickFilter[]>([])
  
  // Çoklu Seviye Hiyerarşi için State'ler
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [draggedDocument, setDraggedDocument] = useState<Document | null>(null)
  const [dropTarget, setDropTarget] = useState<string | null>(null)
  const [hierarchicalDocuments, setHierarchicalDocuments] = useState<Document[]>([])
  
  // Arama ve filtreleme
  const [searchTerm, setSearchTerm] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [fileSizeRange, setFileSizeRange] = useState({ min: "", max: "" })
  const [fileTypeFilter, setFileTypeFilter] = useState("all")
  const [securityLevelFilter, setSecurityLevelFilter] = useState("all")
  const [authorFilter, setAuthorFilter] = useState("")
  
  // Görünüm ve sıralama
  const [viewMode, setViewMode] = useState<"list" | "grid" | "tree" | "timeline">("list")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(DOCUMENT_CONSTANTS.PAGINATION.DEFAULT_ITEMS_PER_PAGE as number)
  
  // Seçim ve toplu işlemler
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [isBulkOperationOpen, setIsBulkOperationOpen] = useState(false)
  const [bulkOperationType, setBulkOperationType] = useState<
    "approve" | "reject" | "archive" | "delete" | "download" | null
  >(null)
  const [bulkComment, setBulkComment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Dialog'lar
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false)
  const [selectedDocumentForHistory, setSelectedDocumentForHistory] = useState<any>(null)
  const [isWorkflowDialogOpen, setIsWorkflowDialogOpen] = useState(false)
  const [selectedDocumentForWorkflow, setSelectedDocumentForWorkflow] = useState<any>(null)
  const [isChangeControlDialogOpen, setIsChangeControlDialogOpen] = useState(false)
  const [selectedDocumentForChange, setSelectedDocumentForChange] = useState<any>(null)
  
  // Real-time updates
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(false)
  const [updateNotifications, setUpdateNotifications] = useState<any[]>([])
  const [showUpdateNotification, setShowUpdateNotification] = useState(false)
  
  // Role-based access
  const [currentUser, setCurrentUser] = useState({
    id: "user-001",
    name: "Ahmet Yılmaz",
    role: "admin",
    permissions: ["read", "write", "delete", "approve", "export"]
  })

  // Data loading
  useEffect(() => {
    const loadData = async () => {
      try {
        const [docsData, statsData, categoriesData, suggestionsData, historyData, popularData, filtersData] = await Promise.all([
          mockApi.getDocuments(),
          mockApi.getDocumentStats(),
          mockApi.getCategoryStats(),
          mockApi.getSearchSuggestions(""),
          Promise.resolve(JSON.parse(localStorage.getItem("documentSearchHistory") || "[]")),
          Promise.resolve(["kalite politikası", "doküman kontrol", "ISO 17025", "test metodu", "prosedür"]),
          Promise.resolve([
            { id: "pending_review", name: "İnceleme Bekleyen", icon: "Clock", color: "#F59E0B" },
            { id: "expiring_soon", name: "Süresi Dolacak", icon: "AlertTriangle", color: "#EF4444" },
            { id: "external_docs", name: "Dış Dokümanlar", icon: "ExternalLink", color: "#8B5CF6" },
            { id: "obsolete_docs", name: "Eski Dokümanlar", icon: "Archive", color: "#6B7280" },
            { id: "confidential", name: "Gizli Dokümanlar", icon: "Shield", color: "#EF4444" }
          ])
        ])
        
        setDocuments(docsData)
        setDocumentStats(statsData)
        setCategoryStats(categoriesData as CategoryStats[])
        setSearchSuggestions(suggestionsData)
        setSearchHistory(historyData)
        setPopularSearches(popularData)
        setQuickFilters(filtersData)
      } catch (error) {
        console.error("Error loading data:", error)
        toast.error("Veriler yüklenirken hata oluştu")
      }
    }
    
    loadData()
  }, [])

  // Filtreleme fonksiyonu
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = searchTerm === "" || 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesCategory = categoryFilter === "all" || doc.category.id === categoryFilter
    const matchesFileType = fileTypeFilter === "all" || doc.fileType === fileTypeFilter
    const matchesSecurityLevel = securityLevelFilter === "all" || doc.securityLevel === securityLevelFilter
    const matchesAuthor = authorFilter === "" || doc.author.toLowerCase().includes(authorFilter.toLowerCase())
    
    // Tarih aralığı filtresi
    const matchesDateRange = (() => {
      if (!dateRange.start && !dateRange.end) return true
      const docDate = new Date(doc.createdAt)
      const startDate = dateRange.start ? new Date(dateRange.start) : new Date(0)
      const endDate = dateRange.end ? new Date(dateRange.end) : new Date()
      return docDate >= startDate && docDate <= endDate
    })()
    
    // Dosya boyutu filtresi
    const matchesFileSize = (() => {
      if (!fileSizeRange.min && !fileSizeRange.max) return true
      const minSize = fileSizeRange.min ? parseInt(fileSizeRange.min) * 1024 * 1024 : 0
      const maxSize = fileSizeRange.max ? parseInt(fileSizeRange.max) * 1024 * 1024 : Infinity
      return doc.fileSize >= minSize && doc.fileSize <= maxSize
    })()

    return matchesSearch && matchesStatus && matchesCategory && matchesFileType && 
           matchesSecurityLevel && matchesAuthor && matchesDateRange && matchesFileSize
  })

  // Sıralama fonksiyonu
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case "title":
        aValue = a.title
        bValue = b.title
        break
      case "code":
        aValue = a.code
        bValue = b.code
        break
      case "createdAt":
        aValue = new Date(a.createdAt)
        bValue = new Date(b.createdAt)
        break
      case "updatedAt":
        aValue = new Date(a.updatedAt)
        bValue = new Date(b.updatedAt)
        break
      case "fileSize":
        aValue = a.fileSize
        bValue = b.fileSize
        break
      case "author":
        aValue = a.author
        bValue = b.author
        break
      case "status":
        aValue = a.status
        bValue = b.status
        break
      default:
        aValue = a.title
        bValue = b.title
    }
    
    if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
    if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  // Pagination hesaplamaları
  const totalPages = Math.ceil(sortedDocuments.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedDocuments = sortedDocuments.slice(startIndex, endIndex)

  // Arama önerileri oluşturma
  const generateSearchSuggestions = (query: string) => {
    if (query.length < DOCUMENT_CONSTANTS.SEARCH.MIN_LENGTH) return []
    
    const suggestions: string[] = []
    const lowerQuery = query.toLowerCase()
    
    documents.forEach(doc => {
      if (doc.title.toLowerCase().includes(lowerQuery)) {
        suggestions.push(doc.title)
      }
      if (doc.author.toLowerCase().includes(lowerQuery)) {
        suggestions.push(doc.author)
      }
      if (doc.category.name.toLowerCase().includes(lowerQuery)) {
        suggestions.push(doc.category.name)
      }
      doc.tags.forEach(tag => {
        if (tag.toLowerCase().includes(lowerQuery)) {
          suggestions.push(tag)
        }
      })
    })
    
    return [...new Set(suggestions)].slice(0, DOCUMENT_CONSTANTS.SEARCH.SUGGESTIONS_LIMIT)
  }

  // Arama geçmişi yönetimi
  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return
    
    const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, DOCUMENT_CONSTANTS.SEARCH.HISTORY_LIMIT)
    setSearchHistory(newHistory)
    localStorage.setItem("documentSearchHistory", JSON.stringify(newHistory))
  }

  const clearSearchHistory = () => {
    setSearchHistory([])
    localStorage.removeItem("documentSearchHistory")
  }

  // Hızlı filtreler
  const getQuickFilters = () => [
    {
      label: "İnceleme Bekleyen",
      filter: () => setStatusFilter("review")
    },
    {
      label: "Süresi Dolacak",
      filter: () => {
        const thirtyDaysFromNow = new Date()
        thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30)
        setDateRange({ start: "", end: thirtyDaysFromNow.toISOString().split('T')[0] })
      }
    },
    {
      label: "Dış Dokümanlar",
      filter: () => setCategoryFilter("ext")
    },
    {
      label: "Eski Dokümanlar",
      filter: () => setStatusFilter("obsolete")
    },
    {
      label: "Gizli Dokümanlar",
      filter: () => setSecurityLevelFilter("confidential")
    }
  ]

  // Seçim fonksiyonları
  const handleSelectAll = () => {
    if (selectedDocuments.length === paginatedDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(paginatedDocuments.map(doc => doc.id))
    }
  }

  const handleSelectDocument = (documentId: string) => {
    setSelectedDocuments(prev => 
      prev.includes(documentId) 
        ? prev.filter(id => id !== documentId)
        : [...prev, documentId]
    )
  }

  // Arama fonksiyonları
  const handleSearchInputChange = (value: string) => {
    setSearchTerm(value)
    setShowSuggestions(value.length > 0)
    
    if (value.length >= 2) {
      const suggestions = generateSearchSuggestions(value)
      setSearchSuggestions(suggestions)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion)
    setShowSuggestions(false)
    addToSearchHistory(suggestion)
  }

  // Sayfa değiştirme
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items)
    setCurrentPage(1)
  }

  // Yetki kontrolü
  const hasPermission = (permission: string) => {
    return currentUser.permissions.includes(permission)
  }

  const canEdit = (doc: Document) => {
    return hasPermission("write") && (doc.status === "draft" || doc.status === "review")
  }

  const canDelete = (doc: Document) => {
    return hasPermission("delete") && (doc.status === "draft" || doc.status === "obsolete")
  }

  const canApprove = (doc: Document) => {
    return hasPermission("approve") && doc.status === "review"
  }

  const handlePDFDownload = async (document: any) => {
    try {
      const response = await fetch(`/api/documents/${document.id}/download-pdf`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${document.code}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast.success("Doküman indirildi")
      } else {
        toast.error("İndirme hatası")
      }
    } catch (error) {
      console.error("PDF indirme hatası:", error)
      toast.error("İndirme hatası")
    }
  }


  const handleBulkDownload = async () => {
    setBulkOperationType("download")
    setIsBulkOperationOpen(true)
  }

  const handleBulkApprove = () => {
    setBulkOperationType("approve")
    setIsBulkOperationOpen(true)
  }

  const handleBulkReject = () => {
    setBulkOperationType("reject")
    setIsBulkOperationOpen(true)
  }

  const handleBulkArchive = () => {
    setBulkOperationType("archive")
    setIsBulkOperationOpen(true)
  }

  const handleBulkDelete = () => {
    setBulkOperationType("delete")
    setIsBulkOperationOpen(true)
  }

  const processBulkOperation = async () => {
    if (!bulkOperationType) return

    setIsProcessing(true)

    try {
      const result = await mockApi.bulkOperation(bulkOperationType, selectedDocuments, bulkComment)
      
      if (bulkOperationType === "download") {
        // Mock download - gerçek uygulamada dosya indirilecek
        alert("Dokümanlar indiriliyor... (Mock)")
      } else {
        alert(result.message || "İşlem başarıyla tamamlandı")
      }

      setSelectedDocuments([])
      setIsBulkOperationOpen(false)
      setBulkComment("")
    } catch (error) {
      console.error("Bulk operation error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const getBulkOperationTitle = () => {
    switch (bulkOperationType) {
      case "approve":
        return "Toplu Onaylama"
      case "reject":
        return "Toplu Reddetme"
      case "archive":
        return "Toplu Arşivleme"
      case "delete":
        return "Toplu Silme"
      case "download":
        return "Toplu İndirme"
      default:
        return "Toplu İşlem"
    }
  }

  const getBulkOperationDescription = () => {
    const count = selectedDocuments.length
    switch (bulkOperationType) {
      case "approve":
        return `${count} dokümanı onaylamak istediğinizden emin misiniz?`
      case "reject":
        return `${count} dokümanı reddetmek istediğinizden emin misiniz?`
      case "archive":
        return `${count} dokümanı arşivlemek istediğinizden emin misiniz?`
      case "delete":
        return `${count} dokümanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
      case "download":
        return `${count} dokümanı ZIP dosyası olarak indirmek istediğinizden emin misiniz?`
      default:
        return "Bu işlemi gerçekleştirmek istediğinizden emin misiniz?"
    }
  }

  const getBulkOperationIcon = () => {
    switch (bulkOperationType) {
      case "approve":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "reject":
        return <XCircle className="h-5 w-5 text-red-600" />
      case "archive":
        return <Archive className="h-5 w-5 text-yellow-600" />
      case "delete":
        return <Trash2 className="h-5 w-5 text-red-600" />
      case "download":
        return <Download className="h-5 w-5 text-blue-600" />
      default:
        return <AlertTriangle className="h-5 w-5" />
    }
  }

  const getSelectedDocumentsInfo = () => {
    return selectedDocuments
      .map((id) => {
        const doc = documents.find((d) => d.id === id)
        return doc ? { id: doc.id, title: doc.title, code: doc.code, status: doc.status } : null
      })
      .filter(Boolean)
  }

  const canPerformBulkOperation = (operation: string) => {
    const selectedDocs = getSelectedDocumentsInfo()

    switch (operation) {
      case "approve":
        return selectedDocs.every((doc) => doc?.status === "review")
      case "reject":
        return selectedDocs.every((doc) => doc?.status === "review")
      case "archive":
        return selectedDocs.every((doc) => doc?.status === "published")
      case "delete":
        return selectedDocs.every((doc) => doc?.status === "draft" || doc?.status === "obsolete")
      case "download":
        return true // Always allowed
      default:
        return false
    }
  }

  const showVersionHistory = (document: any) => {
    setSelectedDocumentForHistory(document)
    setIsVersionHistoryOpen(true)
  }

  return (
    <PageLayout
      title="Dokümanlar"
      description="ISO 17025 uyumlu doküman yönetim sistemi"
      actions={
        <div className="flex items-center space-x-2">
          {selectedDocuments.length > 0 && (
            <>
              <Button variant="outline" onClick={handleBulkDownload}>
                <Download className="mr-2 h-4 w-4" />
                Toplu İndir ({selectedDocuments.length})
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    Toplu İşlemler ({selectedDocuments.length})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Toplu İşlemler</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={handleBulkApprove} disabled={!canPerformBulkOperation("approve")}>
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    Toplu Onayla
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleBulkReject} disabled={!canPerformBulkOperation("reject")}>
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    Toplu Reddet
                  </DropdownMenuItem>

                  <DropdownMenuItem onClick={handleBulkArchive} disabled={!canPerformBulkOperation("archive")}>
                    <Archive className="mr-2 h-4 w-4 text-yellow-600" />
                    Toplu Arşivle
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleBulkDelete}
                    disabled={!canPerformBulkOperation("delete")}
                    className="text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Toplu Sil
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/documents/create">
              <Plus className="mr-2 h-4 w-4" />
              Yeni Doküman
            </Link>
          </Button>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{documents.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Doküman</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-600 font-bold text-sm">
                  {documents.filter((d) => d.status === "published").length}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">
                  {documents.filter((d) => d.status === "published").length}
                </p>
                <p className="text-sm text-muted-foreground">Yayınlanan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">
                  {documents.filter((d) => d.status === "review").length}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  {documents.filter((d) => d.status === "review").length}
                </p>
                <p className="text-sm text-muted-foreground">İncelemede</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-sm">
                  {documents.filter((d) => d.status === "draft").length}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-600">
                  {documents.filter((d) => d.status === "draft").length}
                </p>
                <p className="text-sm text-muted-foreground">Taslak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Arama ve Filtreleme */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Arama Kutusu */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Doküman ara (başlık, kod, açıklama, yazar, etiket)..."
                  value={searchTerm}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="pl-10"
                />
                
                {/* Arama Önerileri */}
                {showSuggestions && (searchSuggestions.length > 0 || searchHistory.length > 0) && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    {searchSuggestions.length > 0 && (
                      <div className="p-2">
                        <div className="text-xs font-medium text-gray-500 mb-2">Öneriler</div>
                        {searchSuggestions.map((suggestion, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                          >
                            <Search className="inline h-3 w-3 mr-2 text-gray-400" />
                            {suggestion}
              </div>
                        ))}
            </div>
                    )}
                    
                    {searchHistory.length > 0 && (
                      <div className="p-2 border-t">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs font-medium text-gray-500">Son Aramalar</div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearSearchHistory}
                            className="h-6 px-2 text-xs"
                          >
                            Temizle
                          </Button>
                        </div>
                        {searchHistory.slice(0, 5).map((item, index) => (
                          <div
                            key={index}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer rounded text-sm"
                            onClick={() => handleSuggestionClick(item)}
                          >
                            <History className="inline h-3 w-3 mr-2 text-gray-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Görünüm Modları ve Filtreler */}
            <div className="flex items-center gap-2">
              {/* Görünüm Modları */}
              <div className="flex items-center border rounded-md">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-r-none"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-none border-x"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "tree" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("tree")}
                  className="rounded-none border-x"
                >
                  <TreePine className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "timeline" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("timeline")}
                  className="rounded-l-none"
                >
                  <Clock3 className="h-4 w-4" />
                </Button>
              </div>

              {/* Filtreler Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filtreler
                {showFilters && <ChevronLeft className="h-4 w-4" />}
                {!showFilters && <ChevronRight className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Gelişmiş Filtreler */}
          <div className={`mt-4 transition-all duration-300 ease-in-out ${
            showFilters ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
              {/* Durum Filtresi */}
              <div>
                <Label className="text-sm font-medium">Durum</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
                    <SelectItem value="review">İnceleme</SelectItem>
                <SelectItem value="approved">Onaylandı</SelectItem>
                <SelectItem value="published">Yayınlandı</SelectItem>
                    <SelectItem value="obsolete">Eski</SelectItem>
                    <SelectItem value="active">Aktif</SelectItem>
              </SelectContent>
            </Select>
              </div>

              {/* Kategori Filtresi */}
              <div>
                <Label className="text-sm font-medium">Kategori</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                    <SelectItem value="pol">Politikalar</SelectItem>
                    <SelectItem value="pro">Prosedürler</SelectItem>
                    <SelectItem value="tal">Talimatlar</SelectItem>
                    <SelectItem value="ext">Dış Dokümanlar</SelectItem>
                    <SelectItem value="obs">Eski Dokümanlar</SelectItem>
                    <SelectItem value="rev">İnceleme Raporları</SelectItem>
              </SelectContent>
            </Select>
              </div>

              {/* Dosya Türü Filtresi */}
              <div>
                <Label className="text-sm font-medium">Dosya Türü</Label>
                <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Dosya türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Türler</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="docx">DOCX</SelectItem>
                    <SelectItem value="xlsx">XLSX</SelectItem>
                    <SelectItem value="pptx">PPTX</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Güvenlik Seviyesi Filtresi */}
              <div>
                <Label className="text-sm font-medium">Güvenlik Seviyesi</Label>
                <Select value={securityLevelFilter} onValueChange={setSecurityLevelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Güvenlik seviyesi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Seviyeler</SelectItem>
                    <SelectItem value="public">Genel</SelectItem>
                    <SelectItem value="internal">İç Kullanım</SelectItem>
                    <SelectItem value="confidential">Gizli</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tarih Aralığı */}
              <div>
                <Label className="text-sm font-medium">Oluşturma Tarihi</Label>
                <div className="flex gap-2">
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="text-sm"
                  />
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Dosya Boyutu */}
              <div>
                <Label className="text-sm font-medium">Dosya Boyutu (MB)</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={fileSizeRange.min}
                    onChange={(e) => setFileSizeRange(prev => ({ ...prev, min: e.target.value }))}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={fileSizeRange.max}
                    onChange={(e) => setFileSizeRange(prev => ({ ...prev, max: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Yazar Filtresi */}
              <div>
                <Label className="text-sm font-medium">Yazar</Label>
                <Input
                  placeholder="Yazar ara..."
                  value={authorFilter}
                  onChange={(e) => setAuthorFilter(e.target.value)}
                  className="text-sm"
                />
              </div>

              {/* Hızlı Filtreler */}
              <div>
                <Label className="text-sm font-medium">Hızlı Filtreler</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getQuickFilters().map((filter, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={filter.filter}
                      className="text-xs h-7"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Doküman Listesi */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
          <CardTitle>Doküman Listesi</CardTitle>
          <CardDescription>
                {sortedDocuments.length} doküman bulundu
            {searchTerm && ` "${searchTerm}" araması için`}
            {selectedDocuments.length > 0 && ` (${selectedDocuments.length} seçili)`}
          </CardDescription>
            </div>
            
            {/* Sıralama ve Sayfa Başına Kayıt */}
            <div className="flex items-center gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Başlık</SelectItem>
                  <SelectItem value="code">Kod</SelectItem>
                  <SelectItem value="createdAt">Oluşturma Tarihi</SelectItem>
                  <SelectItem value="updatedAt">Güncelleme Tarihi</SelectItem>
                  <SelectItem value="fileSize">Dosya Boyutu</SelectItem>
                  <SelectItem value="author">Yazar</SelectItem>
                  <SelectItem value="status">Durum</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
              
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
          </div>
        </CardHeader>
        <CardContent>
          {/* Görünüm Modlarına Göre İçerik */}
          {viewMode === "list" && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedDocuments.length === paginatedDocuments.length && paginatedDocuments.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Doküman</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Yazar</TableHead>
                  <TableHead>Versiyon</TableHead>
                  <TableHead>Güvenlik</TableHead>
                  <TableHead>Son Güncelleme</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedDocuments.includes(document.id)}
                        onCheckedChange={() => handleSelectDocument(document.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(document.status)}
                          <span className="font-medium">{document.code}</span>
                          {document.isExternal && <ExternalLink className="h-3 w-3 text-blue-500" />}
                        </div>
                        <Link href={`/documents/${document.id}`} className="hover:underline">
                          <p className="text-sm font-medium text-foreground hover:text-primary cursor-pointer">
                            {document.title}
                          </p>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-2">{document.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>{formatFileSize(document.fileSize)}</span>
                          <span className="uppercase">{document.fileType}</span>
                          {document.digitalSignature.signed && (
                            <span className="flex items-center space-x-1 text-green-600">
                              <Shield className="h-3 w-3" />
                              <span>İmzalı</span>
                            </span>
                          )}
                        </div>
                        {document.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {document.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {document.tags.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{document.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className="font-mono"
                        style={{ borderColor: document.category.color, color: document.category.color }}
                      >
                        {document.category.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(document.status) as any}>
                        {getStatusText(document.status)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{document.author}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => showVersionHistory(document)}
                        className="font-mono hover:text-primary hover:underline cursor-pointer"
                      >
                        {document.version}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm capitalize">{document.securityLevel}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(document.updatedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {/* Workflow Durumu */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDocumentForWorkflow(document)
                            setIsWorkflowDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0"
                          title="Workflow Durumu"
                        >
                          <Activity className="h-4 w-4" />
                        </Button>
                        
                        {/* Değişiklik Kontrolü */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDocumentForChange(document)
                            setIsChangeControlDialogOpen(true)
                          }}
                          className="h-8 w-8 p-0"
                          title="Değişiklik Kontrolü"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        
                        {/* Versiyon Geçmişi */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => showVersionHistory(document)}
                          className="h-8 w-8 p-0"
                          title="Versiyon Geçmişi"
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        
                        {/* İşlemler Menüsü */}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link href={`/documents/${document.id}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              Görüntüle
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            İndir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => showVersionHistory(document)}>
                            <History className="mr-2 h-4 w-4" />
                            Versiyon Geçmişi
                          </DropdownMenuItem>
                          {(document.status === "draft" || document.status === "review") && (
                            <DropdownMenuItem asChild>
                              <Link href={`/documents/${document.id}/edit`}>
                                <Edit className="mr-2 h-4 w-4" />
                                Düzenle
                              </Link>
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          )}

          {/* Grid Görünümü */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedDocuments.map((document) => (
                <Card key={document.id} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={selectedDocuments.includes(document.id)}
                          onCheckedChange={() => handleSelectDocument(document.id)}
                        />
                        {getStatusIcon(document.status)}
                        <span className="font-medium text-sm">{document.code}</span>
                        {document.isExternal && <ExternalLink className="h-3 w-3 text-blue-500" />}
                      </div>
                      <Badge 
                        variant="outline" 
                        className="font-mono text-xs"
                        style={{ borderColor: document.category.color, color: document.category.color }}
                      >
                        {document.category.code}
                      </Badge>
                    </div>
                    <CardTitle className="text-base">
                      <Link href={`/documents/${document.id}`} className="hover:underline">
                        {document.title}
                      </Link>
                    </CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {document.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3 text-muted-foreground" />
                          <span>{document.author}</span>
                        </div>
                        <Badge variant={getStatusVariant(document.status) as any} className="text-xs">
                          {getStatusText(document.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(document.updatedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span className="capitalize">{document.securityLevel}</span>
                        </div>
                      </div>
                      
                      {document.tags && document.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {document.tags.slice(0, 2).map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {document.tags.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{document.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
          </div>
        </CardContent>
                  <div className="absolute top-2 right-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => window.open(`/documents/${document.id}`, '_blank')}>
                          <Eye className="h-4 w-4 mr-2" />
                          Görüntüle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handlePDFDownload(document)}>
                          <Download className="h-4 w-4 mr-2" />
                          İndir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => showVersionHistory(document)}>
                          <GitCompare className="h-4 w-4 mr-2" />
                          Versiyon Geçmişi
                        </DropdownMenuItem>
                        {canEdit(document) && (
                          <DropdownMenuItem onClick={() => window.open(`/documents/${document.id}/edit`, '_blank')}>
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Tree Görünümü - Gerçek Hiyerarşik Yapı */}
          {viewMode === "tree" && (
            <div className="space-y-1">
              {categoryStats.map((category) => {
                const categoryDocuments = paginatedDocuments.filter(doc => doc.category.name === category.category)
                if (categoryDocuments.length === 0) return null
                
                return (
                  <div key={category.category} className="border rounded-lg">
                    {/* Kategori Header */}
                    <div className="flex items-center justify-between p-3 bg-gray-50 border-b">
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="font-medium text-sm">{category.category}</span>
                        <Badge variant="secondary" className="text-xs">
                          {categoryDocuments.length}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {categoryDocuments.filter(doc => doc.status === "approved").length} onaylandı
                        </span>
                      </div>
                    </div>
                    
                    {/* Kategori Altındaki Dokümanlar */}
                    <div className="divide-y">
                      {categoryDocuments.map((document, index) => (
                        <div key={document.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50">
                          {/* Tree Line */}
                          <div className="flex items-center space-x-1">
                            {index === categoryDocuments.length - 1 ? (
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-px h-3 bg-gray-300"></div>
                                <div className="w-2 h-px bg-gray-300"></div>
                              </div>
                            ) : (
                              <div className="w-4 h-4 flex items-center justify-center">
                                <div className="w-px h-6 bg-gray-300"></div>
                                <div className="w-2 h-px bg-gray-300"></div>
                              </div>
                            )}
                          </div>
                          
                          <Checkbox
                            checked={selectedDocuments.includes(document.id)}
                            onCheckedChange={() => handleSelectDocument(document.id)}
                          />
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(document.status)}
                              <span className="font-medium text-sm">{document.code}</span>
                              {document.isExternal && <ExternalLink className="h-3 w-3 text-blue-500" />}
                            </div>
                            <Link href={`/documents/${document.id}`} className="hover:underline">
                              <p className="text-sm font-medium text-foreground hover:text-primary cursor-pointer">
                                {document.title}
                              </p>
                            </Link>
                            <p className="text-xs text-muted-foreground line-clamp-1">{document.description}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusVariant(document.status) as any} className="text-xs">
                              {getStatusText(document.status)}
                            </Badge>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => window.open(`/documents/${document.id}`, '_blank')}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Görüntüle
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handlePDFDownload(document)}>
                                  <Download className="h-4 w-4 mr-2" />
                                  İndir
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => showVersionHistory(document)}>
                                  <GitCompare className="h-4 w-4 mr-2" />
                                  Versiyon Geçmişi
                                </DropdownMenuItem>
                                {canEdit(document) && (
                                  <DropdownMenuItem onClick={() => window.open(`/documents/${document.id}/edit`, '_blank')}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Düzenle
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Timeline Görünümü */}
          {viewMode === "timeline" && (
            <div className="space-y-4">
              {paginatedDocuments.map((document, index) => (
                <div key={document.id} className="relative flex items-start space-x-4">
                  {/* Timeline Line */}
                  {index < paginatedDocuments.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-16 bg-gray-200"></div>
                  )}
                  
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: document.category.color }}
                    ></div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        checked={selectedDocuments.includes(document.id)}
                        onCheckedChange={() => handleSelectDocument(document.id)}
                      />
                      {getStatusIcon(document.status)}
                      <span className="font-medium text-sm">{document.code}</span>
                      {document.isExternal && <ExternalLink className="h-3 w-3 text-blue-500" />}
                      <Badge 
                        variant="outline" 
                        className="font-mono text-xs"
                        style={{ borderColor: document.category.color, color: document.category.color }}
                      >
                        {document.category.code}
                      </Badge>
                    </div>
                    
                    <Link href={`/documents/${document.id}`} className="hover:underline">
                      <h3 className="text-base font-medium text-foreground hover:text-primary cursor-pointer">
                        {document.title}
                      </h3>
                    </Link>
                    
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {document.description}
                    </p>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{document.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(document.updatedAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Shield className="h-3 w-3" />
                          <span className="capitalize">{document.securityLevel}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusVariant(document.status) as any} className="text-xs">
                          {getStatusText(document.status)}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => window.open(`/documents/${document.id}`, '_blank')}>
                              <Eye className="h-4 w-4 mr-2" />
                              Görüntüle
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handlePDFDownload(document)}>
                              <Download className="h-4 w-4 mr-2" />
                              İndir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => showVersionHistory(document)}>
                              <GitCompare className="h-4 w-4 mr-2" />
                              Versiyon Geçmişi
                            </DropdownMenuItem>
                            {canEdit(document) && (
                              <DropdownMenuItem onClick={() => window.open(`/documents/${document.id}/edit`, '_blank')}>
                                <Edit className="h-4 w-4 mr-2" />
                                Düzenle
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination - Subtle ve Kompakt */}
          <div className="pt-2">
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-white/50 border border-gray-100 rounded-md px-3 py-1.5 text-xs">
                {/* Sayfa Başına Kayıt */}
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">Sayfa:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(value) => handleItemsPerPageChange(parseInt(value))}>
                    <SelectTrigger className="w-12 h-6 text-xs border-0 bg-transparent p-0 h-auto">
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

                {/* Kayıt Bilgisi */}
                <div className="text-muted-foreground hidden sm:block">
                  {startIndex + 1}-{Math.min(endIndex, sortedDocuments.length)}/{sortedDocuments.length}
                </div>

                {/* Pagination Butonları */}
                <div className="flex items-center gap-0.5">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-3 w-3" />
                  </Button>
                  
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                      let pageNumber
                      if (totalPages <= 3) {
                        pageNumber = i + 1
                      } else if (currentPage <= 2) {
                        pageNumber = i + 1
                      } else if (currentPage >= totalPages - 1) {
                        pageNumber = totalPages - 2 + i
                      } else {
                        pageNumber = currentPage - 1 + i
                      }
                      
                      const isActive = pageNumber === currentPage
                      
                      return (
                        <Button
                          key={pageNumber}
                          variant={isActive ? "default" : "ghost"}
                          size="sm"
                          onClick={() => handlePageChange(pageNumber)}
                          className={`h-6 w-6 p-0 text-xs ${
                            isActive 
                              ? "bg-gray-900 text-white hover:bg-gray-800" 
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {pageNumber}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-6 w-6 p-0 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Version History Dialog */}
      <Dialog open={isVersionHistoryOpen} onOpenChange={setIsVersionHistoryOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Versiyon Geçmişi</DialogTitle>
            <DialogDescription>{selectedDocumentForHistory?.title} dokümanının tüm versiyonları</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {[
              {
                version: selectedDocumentForHistory?.currentVersion || 2,
                date: "2024-01-15",
                author: "Sistem Yöneticisi",
                changes: "Revizyon süreçleri güncellendi, yeni onay akışı eklendi",
                status: "published",
                isCurrent: true,
              },
              {
                version: (selectedDocumentForHistory?.currentVersion || 2) - 1,
                date: "2024-01-10",
                author: "Sistem Yöneticisi",
                changes: "İlk versiyon oluşturuldu",
                status: "archived",
                isCurrent: false,
              },
            ].map((version) => (
              <div key={version.version} className="flex items-start space-x-4 p-4 rounded-lg border">
                <div className="flex-shrink-0">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      version.isCurrent ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-bold">v{version.version}</span>
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Versiyon {version.version}</span>
                      {version.isCurrent && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                          Güncel
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{formatDate(version.date)}</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/documents/${selectedDocumentForHistory?.id}?version=${version.version}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          Görüntüle
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{version.changes}</p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{version.author}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Bulk Operation Dialog */}
      <Dialog open={isBulkOperationOpen} onOpenChange={setIsBulkOperationOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              {getBulkOperationIcon()}
              <span>{getBulkOperationTitle()}</span>
            </DialogTitle>
            <DialogDescription>{getBulkOperationDescription()}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Selected Documents List */}
            <div className="max-h-48 overflow-y-auto border rounded-lg p-3">
              <h4 className="font-medium mb-2">Seçili Dokümanlar:</h4>
              <div className="space-y-2">
                {getSelectedDocumentsInfo().map((doc) => (
                  <div key={doc?.id} className="flex items-center justify-between text-sm p-2 bg-muted rounded">
                    <div>
                      <span className="font-medium">{doc?.code}</span>
                      <span className="text-muted-foreground ml-2">{doc?.title}</span>
                    </div>
                    <Badge variant={getStatusVariant(doc?.status) as any}>
                      {getStatusText(doc?.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Comment Field */}
            {(bulkOperationType === "approve" || bulkOperationType === "reject" || bulkOperationType === "archive") && (
              <div className="space-y-2">
                <Label htmlFor="bulk-comment">
                  {bulkOperationType === "reject" ? "Red Sebebi *" : "Yorum (İsteğe bağlı)"}
                </Label>
                <Textarea
                  id="bulk-comment"
                  placeholder={
                    bulkOperationType === "reject"
                      ? "Dokümanları neden reddettiğinizi açıklayın..."
                      : "İşlemle ilgili notlarınızı yazın..."
                  }
                  value={bulkComment}
                  onChange={(e) => setBulkComment(e.target.value)}
                  required={bulkOperationType === "reject"}
                />
              </div>
            )}

            {/* Warning for destructive operations */}
            {bulkOperationType === "delete" && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">Dikkat!</p>
                  <p>Bu işlem geri alınamaz. Dokümanlar kalıcı olarak silinecektir.</p>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkOperationOpen(false)} disabled={isProcessing}>
              İptal
            </Button>
            <Button
              onClick={processBulkOperation}
              disabled={isProcessing || (bulkOperationType === "reject" && !bulkComment.trim())}
              className={
                bulkOperationType === "approve"
                  ? "bg-green-600 hover:bg-green-700"
                  : bulkOperationType === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : ""
              }
              variant={bulkOperationType === "reject" || bulkOperationType === "delete" ? "destructive" : "default"}
            >
              {isProcessing
                ? "İşleniyor..."
                : bulkOperationType === "approve"
                  ? "Onayla"
                  : bulkOperationType === "reject"
                    ? "Reddet"
                    : bulkOperationType === "archive"
                      ? "Arşivle"
                      : bulkOperationType === "delete"
                        ? "Sil"
                        : bulkOperationType === "download"
                          ? "İndir"
                          : "Tamam"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  )
}

// Çoklu Seviye Hiyerarşi Fonksiyonları
const toggleCategoryExpansion = (categoryId: string, expandedCategories: Set<string>, setExpandedCategories: React.Dispatch<React.SetStateAction<Set<string>>>) => {
  setExpandedCategories(prev => {
    const newSet = new Set(prev)
    if (newSet.has(categoryId)) {
      newSet.delete(categoryId)
    } else {
      newSet.add(categoryId)
    }
    return newSet
  })
}

const handleDragStart = (document: Document, setDraggedDocument: React.Dispatch<React.SetStateAction<Document | null>>) => {
  setDraggedDocument(document)
}

const handleDragOver = (e: React.DragEvent, targetId: string, setDropTarget: React.Dispatch<React.SetStateAction<string | null>>) => {
  e.preventDefault()
  setDropTarget(targetId)
}

const handleDragLeave = (setDropTarget: React.Dispatch<React.SetStateAction<string | null>>) => {
  setDropTarget(null)
}

const handleDrop = (e: React.DragEvent, targetCategory: string, draggedDocument: Document | null, documents: Document[], setDocuments: React.Dispatch<React.SetStateAction<Document[]>>, setDraggedDocument: React.Dispatch<React.SetStateAction<Document | null>>, setDropTarget: React.Dispatch<React.SetStateAction<string | null>>) => {
  e.preventDefault()
  if (draggedDocument) {
    // Dokümanı yeni kategoriye taşı
    const updatedDocuments = documents.map(doc => 
      doc.id === draggedDocument.id 
        ? { ...doc, category: { ...doc.category, name: targetCategory } }
        : doc
    )
    setDocuments(updatedDocuments)
  }
  setDraggedDocument(null)
  setDropTarget(null)
}

const buildHierarchicalStructure = (docs: Document[], expandedCategories: Set<string>) => {
  // Kategorilere göre grupla
  const categoryGroups = docs.reduce((acc, doc) => {
    const categoryName = doc.category.name
    if (!acc[categoryName]) {
      acc[categoryName] = []
    }
    acc[categoryName].push(doc)
    return acc
  }, {} as Record<string, Document[]>)

  // Hiyerarşik yapı oluştur
  const hierarchical: Document[] = []
  Object.entries(categoryGroups).forEach(([categoryName, categoryDocs]) => {
    // Kategori başlığı oluştur
    const categoryHeader: Document = {
      id: `category-${categoryName}`,
      code: categoryName,
      title: categoryName,
      category: { id: categoryName, code: categoryName, name: categoryName, color: "#6B7280", icon: "Folder" },
      version: "",
      status: "category",
      description: `${categoryDocs.length} doküman`,
      content: "",
      author: "",
      reviewer: "",
      approver: null,
      createdAt: "",
      updatedAt: "",
      publishedAt: null,
      nextReviewDate: null,
      distributionList: [],
      relatedDocuments: [],
      tags: [],
      fileSize: 0,
      fileType: "",
      isActive: true,
      workflow: { currentStep: "category", steps: [] },
      changeControl: { changeRequestId: "", changeReason: "", impactAnalysis: "", changeApprovedBy: "", changeApprovedDate: "" },
      retentionPeriod: 0,
      securityLevel: "internal",
      isExternal: false,
      externalSource: null,
      digitalSignature: { signed: false, signer: null, signatureDate: null, certificateValid: false },
      parentId: null,
      children: categoryDocs,
      level: 0,
      isExpanded: expandedCategories.has(categoryName),
      sortOrder: 0,
      isDragging: false,
      isDropTarget: false
    }
    hierarchical.push(categoryHeader)
  })

  return hierarchical
}

/**
 * Documents Page Content Component
 */
const DocumentsPageContent = memo(function DocumentsPageContent() {
  // State'ler buraya taşınacak...
  // Ana logic buraya taşınacak...
  return (
    <div>Documents page content will be implemented</div>
  )
})

/**
 * Main Documents Page Export with ErrorBoundary
 */
export default function DocumentsPage() {
  return (
    <ErrorBoundary>
      <DocumentsPageContent />
    </ErrorBoundary>
  )
}
