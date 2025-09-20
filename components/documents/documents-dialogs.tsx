"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertTriangle,
  Archive,
  CheckCircle,
  Download,
  Eye,
  Trash2,
  User,
  XCircle
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

interface VersionHistoryItem {
  version: number
  date: string
  author: string
  changes: string
  status: string
  isCurrent: boolean
}

interface DocumentsDialogsProps {
  // Version History Dialog
  isVersionHistoryOpen: boolean
  setIsVersionHistoryOpen: (open: boolean) => void
  selectedDocumentForHistory: Document | null
  
  // Workflow Dialog
  isWorkflowDialogOpen: boolean
  setIsWorkflowDialogOpen: (open: boolean) => void
  selectedDocumentForWorkflow: Document | null
  
  // Change Control Dialog
  isChangeControlDialogOpen: boolean
  setIsChangeControlDialogOpen: (open: boolean) => void
  selectedDocumentForChange: Document | null
  
  // Bulk Operation Dialog
  isBulkOperationOpen: boolean
  setIsBulkOperationOpen: (open: boolean) => void
  bulkOperationType: "approve" | "reject" | "archive" | "delete" | "download" | null
  selectedDocuments: string[]
  documents: Document[]
  bulkComment: string
  setBulkComment: (comment: string) => void
  isProcessing: boolean
  onProcessBulkOperation: () => void
}

export function DocumentsDialogs({
  isVersionHistoryOpen,
  setIsVersionHistoryOpen,
  selectedDocumentForHistory,
  isWorkflowDialogOpen,
  setIsWorkflowDialogOpen,
  selectedDocumentForWorkflow,
  isChangeControlDialogOpen,
  setIsChangeControlDialogOpen,
  selectedDocumentForChange,
  isBulkOperationOpen,
  setIsBulkOperationOpen,
  bulkOperationType,
  selectedDocuments,
  documents,
  bulkComment,
  setBulkComment,
  isProcessing,
  onProcessBulkOperation
}: DocumentsDialogsProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
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

  const getSelectedDocumentsInfo = () => {
    return selectedDocuments.map(id => documents.find(doc => doc.id === id)).filter(Boolean)
  }

  const getBulkOperationIcon = () => {
    switch (bulkOperationType) {
      case "approve": return <CheckCircle className="h-5 w-5 text-green-600" />
      case "reject": return <XCircle className="h-5 w-5 text-red-600" />
      case "archive": return <Archive className="h-5 w-5 text-blue-600" />
      case "delete": return <Trash2 className="h-5 w-5 text-red-600" />
      case "download": return <Download className="h-5 w-5 text-blue-600" />
      default: return null
    }
  }

  const getBulkOperationTitle = () => {
    switch (bulkOperationType) {
      case "approve": return "Dokümanları Onayla"
      case "reject": return "Dokümanları Reddet"
      case "archive": return "Dokümanları Arşivle"
      case "delete": return "Dokümanları Sil"
      case "download": return "Dokümanları İndir"
      default: return "Toplu İşlem"
    }
  }

  const getBulkOperationDescription = () => {
    const count = selectedDocuments.length
    switch (bulkOperationType) {
      case "approve": return `${count} dokümanı onaylamak istediğinizden emin misiniz?`
      case "reject": return `${count} dokümanı reddetmek istediğinizden emin misiniz?`
      case "archive": return `${count} dokümanı arşivlemek istediğinizden emin misiniz?`
      case "delete": return `${count} dokümanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
      case "download": return `${count} dokümanı indirmek istediğinizden emin misiniz?`
      default: return `${count} doküman üzerinde işlem yapmak istediğinizden emin misiniz?`
    }
  }

  // Mock version history data
  const getVersionHistory = (): VersionHistoryItem[] => {
    if (!selectedDocumentForHistory) return []
    
    const currentVersion = parseInt(selectedDocumentForHistory.version) || 2
    return [
      {
        version: currentVersion,
        date: "2024-01-15",
        author: "Sistem Yöneticisi",
        changes: "Revizyon süreçleri güncellendi, yeni onay akışı eklendi",
        status: "published",
        isCurrent: true,
      },
      {
        version: currentVersion - 1,
        date: "2024-01-10",
        author: "Sistem Yöneticisi",
        changes: "İlk versiyon oluşturuldu",
        status: "archived",
        isCurrent: false,
      },
    ]
  }

  return (
    <>
      {/* Version History Dialog */}
      <Dialog open={isVersionHistoryOpen} onOpenChange={setIsVersionHistoryOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Versiyon Geçmişi</DialogTitle>
            <DialogDescription>
              {selectedDocumentForHistory?.title} dokümanının tüm versiyonları
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {getVersionHistory().map((version) => (
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

      {/* Workflow Dialog */}
      <Dialog open={isWorkflowDialogOpen} onOpenChange={setIsWorkflowDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Workflow Durumu</DialogTitle>
            <DialogDescription>
              {selectedDocumentForWorkflow?.title} dokümanının onay süreç durumu
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Workflow özellikleri yakında eklenecek...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Change Control Dialog */}
      <Dialog open={isChangeControlDialogOpen} onOpenChange={setIsChangeControlDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Değişiklik Kontrolü</DialogTitle>
            <DialogDescription>
              {selectedDocumentForChange?.title} dokümanının değişiklik kayıtları
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Değişiklik kontrolü özellikleri yakında eklenecek...</p>
            </div>
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
                    <Badge variant={getStatusVariant(doc?.status || "") as any}>
                      {getStatusText(doc?.status || "")}
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
              onClick={onProcessBulkOperation}
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
    </>
  )
}