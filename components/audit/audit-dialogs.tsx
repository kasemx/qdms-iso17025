"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface AuditEntry {
  id: string
  entityType: string
  entityId: string
  action: string
  userName: string
  changeSummary?: string
  ipAddress?: string
  createdAt: string
}

interface AuditDialogsProps {
  showDetailDialog: boolean
  onCloseDetailDialog: () => void
  selectedEntry: AuditEntry | null
}

export function AuditDialogs({
  showDetailDialog,
  onCloseDetailDialog,
  selectedEntry,
}: AuditDialogsProps) {
  const getEntityTypeLabel = (type: string) => {
    const types = {
      document: "Doküman",
      user: "Kullanıcı",
      training: "Eğitim",
      reminder: "Hatırlatıcı",
      workflow: "İş Akışı",
      security: "Güvenlik",
    }
    return types[type as keyof typeof types] || type
  }

  const getActionLabel = (action: string) => {
    const actions = {
      document_create: "Doküman Oluşturma",
      document_update: "Doküman Güncelleme",
      document_delete: "Doküman Silme",
      document_rollback: "Doküman Geri Alma",
      user_create: "Kullanıcı Oluşturma",
      user_update: "Kullanıcı Güncelleme",
      role_change: "Rol Değişikliği",
      training_completed: "Eğitim Tamamlama",
      reminder_created: "Hatırlatıcı Oluşturma",
      login: "Giriş",
      logout: "Çıkış",
    }
    return actions[action as keyof typeof actions] || action
  }

  const getActionColor = (action: string) => {
    if (action.includes("delete") || action.includes("rollback")) {
      return "bg-red-100 text-red-800"
    }
    if (action.includes("create") || action.includes("completed")) {
      return "bg-green-100 text-green-800"
    }
    if (action.includes("update") || action.includes("change")) {
      return "bg-yellow-100 text-yellow-800"
    }
    return "bg-blue-100 text-blue-800"
  }

  return (
    <Dialog open={showDetailDialog} onOpenChange={onCloseDetailDialog}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Audit Kaydı Detayları</DialogTitle>
          <DialogDescription>Seçilen audit kaydının detaylı bilgileri</DialogDescription>
        </DialogHeader>
        {selectedEntry && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Tarih/Saat</Label>
                <p className="font-mono">{new Date(selectedEntry.createdAt).toLocaleString("tr-TR")}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Kullanıcı</Label>
                <p className="font-medium">{selectedEntry.userName}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">İşlem</Label>
                <Badge className={getActionColor(selectedEntry.action)}>{getActionLabel(selectedEntry.action)}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Entity Tipi</Label>
                <Badge variant="outline">{getEntityTypeLabel(selectedEntry.entityType)}</Badge>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Entity ID</Label>
                <p className="font-mono text-sm">{selectedEntry.entityId}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">IP Adresi</Label>
                <p className="font-mono text-sm">{selectedEntry.ipAddress || "-"}</p>
              </div>
            </div>
            {selectedEntry.changeSummary && (
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Değişiklik Özeti</Label>
                <p className="mt-1 p-3 bg-muted rounded-md">{selectedEntry.changeSummary}</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}