"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"
import Link from "next/link"
import { mockApi } from "@/lib/mock-data"

// Mock data - gerçek uygulamada API'den gelecek
const documents = [
  {
    id: "1",
    documentCode: "PR-KG-001",
    title: "Doküman Kontrol Prosedürü",
    description: "Şirket içi dokümanların oluşturulması, onaylanması ve kontrolü için prosedür",
    category: { name: "Prosedür", code: "PR" },
    department: { name: "Kalite Güvence" },
    owner: { name: "Sistem Yöneticisi" },
    currentVersion: 2,
    status: "published",
    effectiveDate: "2024-01-15",
    nextReviewDate: "2025-01-15",
    fileType: "pdf",
    fileSize: 245760,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    documentCode: "TL-LAB-001",
    title: "Laboratuvar Cihaz Kalibrasyonu Talimatı",
    description: "Laboratuvar cihazlarının kalibrasyon işlemleri için detaylı talimat",
    category: { name: "Talimat", code: "TL" },
    department: { name: "Laboratuvar" },
    owner: { name: "Ahmet Yılmaz" },
    currentVersion: 1,
    status: "review",
    effectiveDate: null,
    nextReviewDate: "2024-07-15",
    fileType: "docx",
    fileSize: 156432,
    createdAt: "2024-01-05",
    updatedAt: "2024-01-12",
  },
  {
    id: "3",
    documentCode: "FR-IK-001",
    title: "Personel Eğitim Kayıt Formu",
    description: "Personel eğitimlerinin kaydedilmesi için kullanılan form",
    category: { name: "Form", code: "FR" },
    department: { name: "İnsan Kaynakları" },
    owner: { name: "Fatma Demir" },
    currentVersion: 3,
    status: "published",
    effectiveDate: "2024-01-01",
    nextReviewDate: "2026-01-01",
    fileType: "xlsx",
    fileSize: 89123,
    createdAt: "2023-12-15",
    updatedAt: "2024-01-01",
  },
  {
    id: "4",
    documentCode: "EK-KG-001",
    title: "Kalite El Kitabı",
    description: "Şirket kalite yönetim sistemi el kitabı",
    category: { name: "El Kitabı", code: "EK" },
    department: { name: "Kalite Güvence" },
    owner: { name: "Mehmet Kaya" },
    currentVersion: 1,
    status: "draft",
    effectiveDate: null,
    nextReviewDate: null,
    fileType: "pdf",
    fileSize: 1245760,
    createdAt: "2024-01-20",
    updatedAt: "2024-01-22",
  },
]

const statusColors = {
  draft: "bg-gray-100 text-gray-800 border-gray-300",
  review: "bg-blue-100 text-blue-800 border-blue-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  published: "bg-green-100 text-green-800 border-green-300",
  archived: "bg-yellow-100 text-yellow-800 border-yellow-300",
  obsolete: "bg-red-100 text-red-800 border-red-300",
}

const statusLabels = {
  draft: "Taslak",
  review: "İncelemede",
  approved: "Onaylandı",
  published: "Yayınlandı",
  archived: "Arşivlendi",
  obsolete: "Geçersiz",
}

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false)
  const [selectedDocumentForHistory, setSelectedDocumentForHistory] = useState<any>(null)

  const [isBulkOperationOpen, setIsBulkOperationOpen] = useState(false)
  const [bulkOperationType, setBulkOperationType] = useState<
    "approve" | "reject" | "archive" | "delete" | "download" | null
  >(null)
  const [bulkComment, setBulkComment] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.documentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || doc.status === statusFilter
    const matchesCategory = categoryFilter === "all" || doc.category.code === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const handleSelectAll = () => {
    if (selectedDocuments.length === filteredDocuments.length) {
      setSelectedDocuments([])
    } else {
      setSelectedDocuments(filteredDocuments.map((doc) => doc.id))
    }
  }

  const handleSelectDocument = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
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
        return doc ? { id: doc.id, title: doc.title, code: doc.documentCode, status: doc.status } : null
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
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dokümanlar</h1>
          <p className="text-muted-foreground">Tüm kalite dokümanlarını yönetin</p>
        </div>
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
      </div>

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

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filtreler ve Arama</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Doküman ara (başlık, kod, açıklama)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Durum filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="draft">Taslak</SelectItem>
                <SelectItem value="review">İncelemede</SelectItem>
                <SelectItem value="approved">Onaylandı</SelectItem>
                <SelectItem value="published">Yayınlandı</SelectItem>
                <SelectItem value="archived">Arşivlendi</SelectItem>
                <SelectItem value="obsolete">Geçersiz</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Kategori filtresi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="PR">Prosedür</SelectItem>
                <SelectItem value="TL">Talimat</SelectItem>
                <SelectItem value="FR">Form</SelectItem>
                <SelectItem value="EK">El Kitabı</SelectItem>
                <SelectItem value="KY">Kayıt</SelectItem>
                <SelectItem value="PL">Politika</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Doküman Listesi</CardTitle>
          <CardDescription>
            {filteredDocuments.length} doküman bulundu
            {searchTerm && ` "${searchTerm}" araması için`}
            {selectedDocuments.length > 0 && ` (${selectedDocuments.length} seçili)`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedDocuments.length === filteredDocuments.length && filteredDocuments.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Doküman</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Sahibi</TableHead>
                  <TableHead>Versiyon</TableHead>
                  <TableHead>Son Güncelleme</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.map((document) => (
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
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{document.documentCode}</span>
                        </div>
                        <Link href={`/documents/${document.id}`} className="hover:underline">
                          <p className="text-sm font-medium text-foreground hover:text-primary cursor-pointer">
                            {document.title}
                          </p>
                        </Link>
                        <p className="text-xs text-muted-foreground line-clamp-2">{document.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center space-x-1">
                            <Building className="h-3 w-3" />
                            <span>{document.department.name}</span>
                          </span>
                          <span>{formatFileSize(document.fileSize)}</span>
                          <span className="uppercase">{document.fileType}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {document.category.code}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[document.status as keyof typeof statusColors]}>
                        {statusLabels[document.status as keyof typeof statusLabels]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{document.owner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => showVersionHistory(document)}
                        className="font-mono hover:text-primary hover:underline cursor-pointer"
                      >
                        v{document.currentVersion}
                      </button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{formatDate(document.updatedAt)}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
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
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
                    <Badge variant="outline" className={statusColors[doc?.status as keyof typeof statusColors]}>
                      {statusLabels[doc?.status as keyof typeof statusLabels]}
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
    </div>
  )
}
