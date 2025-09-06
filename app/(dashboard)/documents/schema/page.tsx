"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
  Shield,
  Clipboard,
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
} from "lucide-react"
import Link from "next/link"
import { mockApi } from "@/lib/mock-data"

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
  author: string
  reviewer: string
  approver: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  nextReviewDate: string
  distributionList: string[]
  relatedDocuments: string[]
  tags: string[]
  fileSize: number
  fileType: string
  isActive: boolean
}

interface DocumentStats {
  totalDocuments: number
  activeDocuments: number
  draftDocuments: number
  reviewDocuments: number
  archivedDocuments: number
  cancelledDocuments: number
  totalCategories: number
  totalVersions: number
  averageReviewTime: string
  complianceRate: number
}

interface CategoryStats {
  category: string
  count: number
  percentage: number
  trend: string
}

export default function DocumentSchemaPage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([])
  const [stats, setStats] = useState<DocumentStats | null>(null)
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [sortBy, setSortBy] = useState("title")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Kategori filtreleri
  const categoryFilters = [
    { id: "all", name: "Tümü", count: 156 },
    { id: "pol", name: "Politikalar", count: 8, color: "#3B82F6" },
    { id: "pro", name: "Prosedürler", count: 24, color: "#10B981" },
    { id: "tal", name: "Talimatlar", count: 18, color: "#8B5CF6" },
    { id: "for", name: "Formlar", count: 32, color: "#EF4444" },
    { id: "kay", name: "Kayıtlar", count: 45, color: "#06B6D4" },
    { id: "met", name: "Test Metotları", count: 15, color: "#F59E0B" },
    { id: "kal", name: "Kalibrasyon", count: 14, color: "#84CC16" }
  ]

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 156 },
    { id: "draft", name: "Taslak", count: 12, color: "#6B7280" },
    { id: "review", name: "İnceleme", count: 8, color: "#F59E0B" },
    { id: "approved", name: "Onaylandı", count: 125, color: "#10B981" },
    { id: "archived", name: "Arşiv", count: 9, color: "#6B7280" },
    { id: "cancelled", name: "İptal", count: 2, color: "#EF4444" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterDocuments()
  }, [documents, searchTerm, selectedCategory, selectedStatus, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [documentsData, statsData, categoryStatsData] = await Promise.all([
        mockApi.getDocuments(),
        mockApi.getDocumentStats(),
        mockApi.getCategoryStats()
      ])
      
      setDocuments(documentsData)
      setStats(statsData)
      setCategoryStats(categoryStatsData)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterDocuments = () => {
    let filtered = [...documents]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Kategori filtresi
    if (selectedCategory !== "all") {
      filtered = filtered.filter(doc => doc.category.id === selectedCategory)
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(doc => doc.status === selectedStatus)
    }

    // Sıralama
    filtered.sort((a, b) => {
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
        case "version":
          aValue = a.version
          bValue = b.version
          break
        case "updatedAt":
          aValue = new Date(a.updatedAt)
          bValue = new Date(b.updatedAt)
          break
        case "author":
          aValue = a.author
          bValue = b.author
          break
        default:
          aValue = a.title
          bValue = b.title
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredDocuments(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "review":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "draft":
        return <Edit className="h-4 w-4 text-gray-500" />
      case "archived":
        return <Archive className="h-4 w-4 text-gray-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <FileText className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Onaylandı"
      case "review":
        return "İnceleme"
      case "draft":
        return "Taslak"
      case "archived":
        return "Arşiv"
      case "cancelled":
        return "İptal"
      default:
        return status
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Doküman Şeması</h1>
            <p className="text-muted-foreground">ISO 17025 uyumlu doküman yönetim sistemi</p>
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
          <h1 className="text-3xl font-bold text-foreground">Doküman Şeması</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu doküman yönetim sistemi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Doküman
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      {stats && (
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Doküman</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDocuments}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeDocuments} aktif doküman
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Onay Bekleyen</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reviewDocuments}</div>
              <p className="text-xs text-muted-foreground">
                Ortalama {stats.averageReviewTime} süre
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Uyumluluk Oranı</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">%{stats.complianceRate}</div>
              <p className="text-xs text-muted-foreground">
                ISO 17025 uyumluluğu
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Versiyon</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVersions}</div>
              <p className="text-xs text-muted-foreground">
                {stats.totalCategories} kategori
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Doküman Filtreleme</CardTitle>
          <CardDescription>Dokümanları kategorilere, durumlara ve anahtar kelimelere göre filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Doküman ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
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

      {/* Doküman Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Dokümanlar ({filteredDocuments.length})</CardTitle>
              <CardDescription>
                {selectedCategory !== "all" && `Kategori: ${categoryFilters.find(c => c.id === selectedCategory)?.name}`}
                {selectedStatus !== "all" && ` | Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
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
                  <SelectItem value="code">Kod</SelectItem>
                  <SelectItem value="version">Versiyon</SelectItem>
                  <SelectItem value="updatedAt">Güncelleme</SelectItem>
                  <SelectItem value="author">Yazar</SelectItem>
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
                  <TableHead>Doküman</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Versiyon</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Yazar</TableHead>
                  <TableHead>Güncelleme</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{document.title}</div>
                        <div className="text-sm text-muted-foreground">{document.code}</div>
                        <div className="text-xs text-muted-foreground">{document.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        style={{ backgroundColor: document.category.color + "20", color: document.category.color }}
                      >
                        {document.category.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{document.version}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(document.status)}
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(document.status)}`}>
                          {getStatusText(document.status)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{document.author}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(document.updatedAt)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedDocument(document)
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
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredDocuments.map((document) => (
                <Card key={document.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{document.title}</CardTitle>
                        <CardDescription>{document.code}</CardDescription>
                      </div>
                      <Badge 
                        variant="secondary" 
                        style={{ backgroundColor: document.category.color + "20", color: document.category.color }}
                      >
                        {document.category.name}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">{document.description}</p>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(document.status)}
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(document.status)}`}>
                        {getStatusText(document.status)}
                      </span>
                      <Badge variant="outline">{document.version}</Badge>
                    </div>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{document.author}</span>
                      <span>{formatDate(document.updatedAt)}</span>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedDocument(document)
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Doküman Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedDocument && getStatusIcon(selectedDocument.status)}
              {selectedDocument?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedDocument?.code} - {selectedDocument?.version}
            </DialogDescription>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Doküman Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Kategori:</strong> {selectedDocument.category.name}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedDocument.status)}</div>
                    <div><strong>Dosya Boyutu:</strong> {formatFileSize(selectedDocument.fileSize)}</div>
                    <div><strong>Dosya Türü:</strong> {selectedDocument.fileType.toUpperCase()}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Süreç Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Yazar:</strong> {selectedDocument.author}</div>
                    <div><strong>İnceleyen:</strong> {selectedDocument.reviewer}</div>
                    <div><strong>Onaylayan:</strong> {selectedDocument.approver}</div>
                    <div><strong>Son Güncelleme:</strong> {formatDate(selectedDocument.updatedAt)}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Açıklama</h4>
                <p className="text-sm text-muted-foreground">{selectedDocument.description}</p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Etiketler</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedDocument.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Dağıtım Listesi</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedDocument.distributionList.map((item, index) => (
                    <Badge key={index} variant="secondary">{item}</Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">İlgili Dokümanlar</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedDocument.relatedDocuments.map((doc, index) => (
                    <Badge key={index} variant="outline">{doc}</Badge>
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
