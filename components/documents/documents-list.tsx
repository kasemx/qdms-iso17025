"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Activity,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit,
  ExternalLink,
  Eye,
  GitCompare,
  History,
  MoreHorizontal,
  RotateCcw,
  Shield,
  SortAsc,
  SortDesc,
  User
} from "lucide-react"
import Link from "next/link"

interface Document {
  id: string
  title: string
  code: string
  description: string
  author: string
  version: string
  status: "draft" | "review" | "approved" | "published" | "obsolete" | "active"
  securityLevel: "public" | "internal" | "confidential"
  category: {
    name: string
    code: string
    color: string
  }
  fileSize: number
  fileType: string
  tags: string[]
  createdAt: string
  updatedAt: string
  isExternal: boolean
  digitalSignature: {
    signed: boolean
    signedBy?: string
    signedAt?: string
  }
}

interface CategoryStat {
  category: string
  count: number
  color: string
}

interface DocumentsListProps {
  documents: Document[]
  selectedDocuments: string[]
  onSelectDocument: (id: string) => void
  onSelectAll: () => void
  viewMode: "list" | "grid" | "tree" | "timeline"
  sortBy: string
  setSortBy: (field: string) => void
  sortOrder: "asc" | "desc"
  setSortOrder: (order: "asc" | "desc") => void
  currentPage: number
  totalPages: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
  filteredCount: number
  totalCount: number
  categoryStats: CategoryStat[]
  onShowVersionHistory: (document: Document) => void
  onShowWorkflow: (document: Document) => void
  onShowChangeControl: (document: Document) => void
  onDownload: (document: Document) => void
  canEdit: (document: Document) => boolean
}

export function DocumentsList({
  documents,
  selectedDocuments,
  onSelectDocument,
  onSelectAll,
  viewMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  currentPage,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  filteredCount,
  totalCount,
  categoryStats,
  onShowVersionHistory,
  onShowWorkflow,
  onShowChangeControl,
  onDownload,
  canEdit
}: DocumentsListProps) {

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const getStatusIcon = (status: string) => {
    const statusColors = {
      "draft": "bg-gray-400",
      "review": "bg-yellow-400", 
      "approved": "bg-green-400",
      "published": "bg-blue-400",
      "obsolete": "bg-red-400",
      "active": "bg-emerald-400"
    }
    return <div className={`w-2 h-2 rounded-full ${statusColors[status as keyof typeof statusColors] || "bg-gray-400"}`}></div>
  }

  const getStatusVariant = (status: string) => {
    const variants = {
      "draft": "secondary",
      "review": "outline", 
      "approved": "default",
      "published": "default",
      "obsolete": "destructive",
      "active": "default"
    }
    return variants[status as keyof typeof variants] || "secondary"
  }

  const getStatusText = (status: string) => {
    const texts = {
      "draft": "Taslak",
      "review": "İnceleme",
      "approved": "Onaylandı", 
      "published": "Yayınlandı",
      "obsolete": "Eski",
      "active": "Aktif"
    }
    return texts[status as keyof typeof texts] || status
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Doküman Listesi</CardTitle>
            <CardDescription>
              {filteredCount} doküman bulundu
              {selectedDocuments.length > 0 && ` (${selectedDocuments.length} seçili)`}
            </CardDescription>
          </div>
          
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
            
            <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(parseInt(value))}>
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
        {/* List View */}
        {viewMode === "list" && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedDocuments.length === documents.length && documents.length > 0}
                      onCheckedChange={onSelectAll}
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
                {documents.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedDocuments.includes(document.id)}
                        onCheckedChange={() => onSelectDocument(document.id)}
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
                        onClick={() => onShowVersionHistory(document)}
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
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShowWorkflow(document)}
                          className="h-8 w-8 p-0"
                          title="Workflow Durumu"
                        >
                          <Activity className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShowChangeControl(document)}
                          className="h-8 w-8 p-0"
                          title="Değişiklik Kontrolü"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onShowVersionHistory(document)}
                          className="h-8 w-8 p-0"
                          title="Versiyon Geçmişi"
                        >
                          <History className="h-4 w-4" />
                        </Button>
                        
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
                            <DropdownMenuItem onClick={() => onDownload(document)}>
                              <Download className="mr-2 h-4 w-4" />
                              İndir
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onShowVersionHistory(document)}>
                              <History className="mr-2 h-4 w-4" />
                              Versiyon Geçmişi
                            </DropdownMenuItem>
                            {canEdit(document) && (
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

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
              <Card key={document.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedDocuments.includes(document.id)}
                        onCheckedChange={() => onSelectDocument(document.id)}
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
                      <DropdownMenuItem onClick={() => onDownload(document)}>
                        <Download className="h-4 w-4 mr-2" />
                        İndir
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onShowVersionHistory(document)}>
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

        {/* Pagination */}
        <div className="pt-2">
          <div className="flex justify-end">
            <div className="flex items-center gap-2 bg-white/50 border border-gray-100 rounded-md px-3 py-1.5 text-xs">
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Sayfa:</span>
                <Select value={itemsPerPage.toString()} onValueChange={(value) => onItemsPerPageChange(parseInt(value))}>
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

              <div className="text-muted-foreground hidden sm:block">
                {startIndex + 1}-{Math.min(endIndex, filteredCount)}/{filteredCount}
              </div>

              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPageChange(currentPage - 1)}
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
                        onClick={() => onPageChange(pageNumber)}
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
                  onClick={() => onPageChange(currentPage + 1)}
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
  )
}