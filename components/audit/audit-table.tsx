"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, AlertTriangle, Eye } from "lucide-react"

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

interface AuditTableProps {
  auditEntries: AuditEntry[]
  onViewDetails: (entry: AuditEntry) => void
}

export function AuditTable({ auditEntries, onViewDetails }: AuditTableProps) {
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
      document_archive: "Doküman Arşivleme",
      document_rollback: "Doküman Geri Alma",
      user_create: "Kullanıcı Oluşturma",
      user_update: "Kullanıcı Güncelleme",
      account_created: "Hesap Oluşturma",
      role_change: "Rol Değişikliği",
      training_completed: "Eğitim Tamamlama",
      training_failed: "Eğitim Başarısızlık",
      reminder_created: "Hatırlatıcı Oluşturma",
      workflow_approved: "İş Akışı Onayı",
      password_change: "Şifre Değişikliği",
      login: "Giriş",
      logout: "Çıkış",
    }
    return actions[action as keyof typeof actions] || action
  }

  const getActionColor = (action: string) => {
    if (action.includes("delete") || action.includes("rollback") || action.includes("failed")) {
      return "bg-red-100 text-red-800"
    }
    if (action.includes("create") || action.includes("completed") || action.includes("approved")) {
      return "bg-green-100 text-green-800"
    }
    if (action.includes("update") || action.includes("change") || action.includes("archive")) {
      return "bg-yellow-100 text-yellow-800"
    }
    if (action.includes("login") || action.includes("logout")) {
      return "bg-blue-100 text-blue-800"
    }
    return "bg-gray-100 text-gray-800"
  }

  const isCriticalAction = (action: string) => {
    const criticalActions = [
      "document_delete", 
      "document_rollback", 
      "role_change", 
      "user_delete", 
      "account_created",
      "password_change",
      "training_failed"
    ]
    return criticalActions.includes(action)
  }

  if (auditEntries.length === 0) {
    return (
      <div className="text-center py-12">
        <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Audit kaydı bulunamadı</h3>
        <p className="mt-2 text-muted-foreground">Arama kriterlerinize uygun audit kaydı bulunmuyor.</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Kayıtları</CardTitle>
        <CardDescription>Sistem aktivitelerinin detaylı kayıtları</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tarih/Saat</TableHead>
              <TableHead>Kullanıcı</TableHead>
              <TableHead>İşlem</TableHead>
              <TableHead>Entity</TableHead>
              <TableHead>Açıklama</TableHead>
              <TableHead>IP Adresi</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-mono text-sm">
                  {new Date(entry.createdAt).toLocaleString("tr-TR")}
                </TableCell>
                <TableCell className="font-medium">{entry.userName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge className={getActionColor(entry.action)}>{getActionLabel(entry.action)}</Badge>
                    {isCriticalAction(entry.action) && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{getEntityTypeLabel(entry.entityType)}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate">{entry.changeSummary || "-"}</TableCell>
                <TableCell className="font-mono text-sm">{entry.ipAddress || "-"}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => onViewDetails(entry)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}