"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface CAPA {
  id: string
  capaNumber: string
  title: string
  description: string
  type: string
  source: string
  priority: string
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  completionDate: string
  rootCause?: {
    analysis: string
    causes: Array<{
      cause: string
      category: string
      impact: string
    }>
    method: string
    analyst: string
    date: string
  }
  correctiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  preventiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  verification?: {
    method: string
    criteria: string
    results: string
    verifier: string
    date: string
    status: string
  }
  effectiveness?: {
    method: string
    criteria: string
    results: string
    evaluator: string
    date: string
    status: string
  }
  cost?: {
    estimated: number
    actual: number
    variance: number
  }
  attachments?: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  notes?: string
  createdAt: string
  updatedAt: string
}

interface CAPAFormData {
  capaNumber: string
  title: string
  description: string
  type: string
  source: string
  priority: string
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  completionDate: string
  notes: string
}

interface CAPADialogsProps {
  isCAPADialogOpen: boolean
  isViewDialogOpen: boolean
  editingCAPA: CAPA | null
  viewingCAPA: CAPA | null
  capaFormData: CAPAFormData
  onCAPADialogChange: (open: boolean) => void
  onViewDialogChange: (open: boolean) => void
  onFormDataChange: (data: CAPAFormData) => void
  onSubmit: (e: React.FormEvent) => void
  onEdit: (capa: CAPA) => void
}

export function CAPADialogs({
  isCAPADialogOpen,
  isViewDialogOpen,
  editingCAPA,
  viewingCAPA,
  capaFormData,
  onCAPADialogChange,
  onViewDialogChange,
  onFormDataChange,
  onSubmit,
  onEdit,
}: CAPADialogsProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Planlandı": "bg-blue-100 text-blue-800",
      "Uygulanıyor": "bg-yellow-100 text-yellow-800",
      "Tamamlandı": "bg-green-100 text-green-800",
      "İptal Edildi": "bg-red-100 text-red-800",
      "Beklemede": "bg-gray-100 text-gray-800",
      "open": "bg-blue-100 text-blue-800",
      "in_progress": "bg-yellow-100 text-yellow-800",
      "completed": "bg-green-100 text-green-800",
      "cancelled": "bg-red-100 text-red-800",
      "closed": "bg-gray-100 text-gray-800",
    }
    
    const statusMap: Record<string, string> = {
      "Planlandı": "Planlandı",
      "Uygulanıyor": "Uygulanıyor", 
      "Tamamlandı": "Tamamlandı",
      "İptal Edildi": "İptal Edildi",
      "Beklemede": "Beklemede",
      "open": "Planlandı",
      "in_progress": "Uygulanıyor",
      "completed": "Tamamlandı",
      "cancelled": "İptal Edildi",
      "closed": "Kapatıldı",
    }
    
    const displayStatus = statusMap[status] || status
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{displayStatus}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Orta": "bg-yellow-100 text-yellow-800",
      "Düşük": "bg-green-100 text-green-800",
      "high": "bg-red-100 text-red-800",
      "medium": "bg-yellow-100 text-yellow-800",
      "low": "bg-green-100 text-green-800",
      "critical": "bg-red-100 text-red-800",
    }
    
    const priorityMap: Record<string, string> = {
      "Yüksek": "Yüksek",
      "Orta": "Orta",
      "Düşük": "Düşük",
      "high": "Yüksek",
      "medium": "Orta",
      "low": "Düşük",
      "critical": "Kritik",
    }
    
    const displayPriority = priorityMap[priority] || priority
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{displayPriority}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      "Düzeltici": "bg-red-100 text-red-800",
      "Önleyici": "bg-blue-100 text-blue-800",
      "corrective": "bg-red-100 text-red-800",
      "preventive": "bg-blue-100 text-blue-800",
      "both": "bg-purple-100 text-purple-800",
    }
    
    const typeMap: Record<string, string> = {
      "Düzeltici": "Düzeltici",
      "Önleyici": "Önleyici",
      "corrective": "Düzeltici",
      "preventive": "Önleyici",
      "both": "Her İkisi",
    }
    
    const displayType = typeMap[type] || type
    return <Badge className={variants[type] || "bg-gray-100 text-gray-800"}>{displayType}</Badge>
  }

  return (
    <>
      {/* CAPA Create/Edit Dialog */}
      <Dialog open={isCAPADialogOpen} onOpenChange={onCAPADialogChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCAPA ? "CAPA Düzenle" : "Yeni CAPA Oluştur"}
            </DialogTitle>
            <DialogDescription>
              {editingCAPA ? "Mevcut CAPA kaydını düzenleyin" : "Yeni bir CAPA kaydı oluşturun"}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capaNumber">CAPA Numarası *</Label>
                <Input
                  id="capaNumber"
                  value={capaFormData.capaNumber}
                  onChange={(e) => onFormDataChange({ ...capaFormData, capaNumber: e.target.value })}
                  placeholder="CAPA-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={capaFormData.title}
                  onChange={(e) => onFormDataChange({ ...capaFormData, title: e.target.value })}
                  placeholder="CAPA başlığı"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama *</Label>
              <Textarea
                id="description"
                value={capaFormData.description}
                onChange={(e) => onFormDataChange({ ...capaFormData, description: e.target.value })}
                placeholder="CAPA açıklaması"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tür *</Label>
                <Select
                  value={capaFormData.type}
                  onValueChange={(value) => onFormDataChange({ ...capaFormData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tür seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrective">Düzeltici</SelectItem>
                    <SelectItem value="preventive">Önleyici</SelectItem>
                    <SelectItem value="both">Her İkisi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Kaynak *</Label>
                <Select
                  value={capaFormData.source}
                  onValueChange={(value) => onFormDataChange({ ...capaFormData, source: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kaynak seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audit">Denetim</SelectItem>
                    <SelectItem value="complaint">Şikayet</SelectItem>
                    <SelectItem value="nonconformity">Uygunsuzluk</SelectItem>
                    <SelectItem value="management_review">Yönetim Gözden Geçirme</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Öncelik *</Label>
                <Select
                  value={capaFormData.priority}
                  onValueChange={(value) => onFormDataChange({ ...capaFormData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="critical">Kritik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Sorumlu *</Label>
                <Input
                  id="owner"
                  value={capaFormData.owner}
                  onChange={(e) => onFormDataChange({ ...capaFormData, owner: e.target.value })}
                  placeholder="Sorumlu kişi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Durum *</Label>
                <Select
                  value={capaFormData.status}
                  onValueChange={(value) => onFormDataChange({ ...capaFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Açık</SelectItem>
                    <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                    <SelectItem value="completed">Tamamlandı</SelectItem>
                    <SelectItem value="closed">Kapatıldı</SelectItem>
                    <SelectItem value="cancelled">İptal Edildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="identifiedDate">Tespit Tarihi *</Label>
                <Input
                  id="identifiedDate"
                  type="date"
                  value={capaFormData.identifiedDate}
                  onChange={(e) => onFormDataChange({ ...capaFormData, identifiedDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Bitiş Tarihi *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={capaFormData.dueDate}
                  onChange={(e) => onFormDataChange({ ...capaFormData, dueDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completionDate">Tamamlanma Tarihi</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={capaFormData.completionDate}
                  onChange={(e) => onFormDataChange({ ...capaFormData, completionDate: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notlar</Label>
              <Textarea
                id="notes"
                value={capaFormData.notes}
                onChange={(e) => onFormDataChange({ ...capaFormData, notes: e.target.value })}
                placeholder="Ek notlar ve açıklamalar"
                rows={2}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onCAPADialogChange(false)}>
                İptal
              </Button>
              <Button type="submit">
                {editingCAPA ? "Güncelle" : "Oluştur"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* CAPA Detail View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={onViewDialogChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CAPA Detayları</DialogTitle>
            <DialogDescription>
              {viewingCAPA?.capaNumber} - {viewingCAPA?.title}
            </DialogDescription>
          </DialogHeader>
          
          {viewingCAPA && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">CAPA Numarası</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.capaNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Durum</Label>
                  <div>{getStatusBadge(viewingCAPA.status)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Tip</Label>
                  <div>{getTypeBadge(viewingCAPA.type)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Öncelik</Label>
                  <div>{getPriorityBadge(viewingCAPA.priority)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Sorumlu</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.owner}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Kaynak</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.source}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Açıklama</Label>
                <p className="text-sm text-muted-foreground">{viewingCAPA.description}</p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Tespit Tarihi</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.identifiedDate}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Bitiş Tarihi</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.dueDate}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Tamamlanma Tarihi</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.completionDate || "Henüz tamamlanmadı"}</p>
                </div>
              </div>

              {/* Root Cause Analysis */}
              {viewingCAPA.rootCause && (
                <div className="space-y-2">
                  <Label className="font-medium">Kök Neden Analizi</Label>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">{viewingCAPA.rootCause.analysis}</p>
                    <div className="text-xs text-muted-foreground">
                      <p>Analist: {viewingCAPA.rootCause.analyst}</p>
                      <p>Tarih: {viewingCAPA.rootCause.date}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Corrective Actions */}
              {viewingCAPA.correctiveActions && viewingCAPA.correctiveActions.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-medium">Düzeltici Aksiyonlar</Label>
                  <div className="space-y-2">
                    {viewingCAPA.correctiveActions.map((action, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">{action.action}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <p>Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</p>
                          <p>Durum: {action.status} | Etkinlik: {action.effectiveness}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preventive Actions */}
              {viewingCAPA.preventiveActions && viewingCAPA.preventiveActions.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-medium">Önleyici Aksiyonlar</Label>
                  <div className="space-y-2">
                    {viewingCAPA.preventiveActions.map((action, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">{action.action}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <p>Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</p>
                          <p>Durum: {action.status} | Etkinlik: {action.effectiveness}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {viewingCAPA.notes && (
                <div className="space-y-2">
                  <Label className="font-medium">Notlar</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => onViewDialogChange(false)}>
              Kapat
            </Button>
            {viewingCAPA && (
              <Button onClick={() => {
                onViewDialogChange(false)
                onEdit(viewingCAPA)
              }}>
                Düzenle
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}