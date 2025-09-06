"use client"

import { Label } from "@/components/ui/label"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Shield, Search, Calendar, User, Activity, AlertTriangle, Eye } from "lucide-react"

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

export default function AuditTrailPage() {
  const [auditEntries, setAuditEntries] = useState<AuditEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [entityTypeFilter, setEntityTypeFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const mockEntries: AuditEntry[] = [
      {
        id: "1",
        entityType: "document",
        entityId: "doc-123",
        action: "document_update",
        userName: "Ahmet Yılmaz",
        changeSummary: "PR-001 prosedürü güncellendi - versiyon 2.1",
        ipAddress: "192.168.1.100",
        createdAt: "2024-01-20T10:30:00Z",
      },
      {
        id: "2",
        entityType: "user",
        entityId: "user-456",
        action: "role_change",
        userName: "Sistem Yöneticisi",
        changeSummary: "Kullanıcı rolü 'reviewer' olarak değiştirildi",
        ipAddress: "192.168.1.50",
        createdAt: "2024-01-20T09:15:00Z",
      },
      {
        id: "3",
        entityType: "document",
        entityId: "doc-789",
        action: "document_rollback",
        userName: "Kalite Müdürü",
        changeSummary: "TL-001 talimatı v2.0'dan v1.5'e geri alındı",
        ipAddress: "192.168.1.75",
        createdAt: "2024-01-19T16:45:00Z",
      },
      {
        id: "4",
        entityType: "training",
        entityId: "training-321",
        action: "training_completed",
        userName: "Mehmet Demir",
        changeSummary: "PR-001 eğitimi tamamlandı - Puan: 85",
        ipAddress: "192.168.1.120",
        createdAt: "2024-01-19T14:20:00Z",
      },
      {
        id: "5",
        entityType: "reminder",
        entityId: "reminder-654",
        action: "reminder_created",
        userName: "İK Müdürü",
        changeSummary: "Yeni eğitim hatırlatıcısı oluşturuldu",
        ipAddress: "192.168.1.90",
        createdAt: "2024-01-19T11:10:00Z",
      },
    ]

    setTimeout(() => {
      setAuditEntries(mockEntries)
      setLoading(false)
    }, 1000)
  }, [])

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

  const isCriticalAction = (action: string) => {
    const criticalActions = ["document_delete", "document_rollback", "role_change", "user_delete"]
    return criticalActions.includes(action)
  }

  const filteredEntries = auditEntries.filter((entry) => {
    const matchesSearch =
      entry.changeSummary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEntityType = entityTypeFilter === "all" || entry.entityType === entityTypeFilter
    const matchesAction = actionFilter === "all" || entry.action === actionFilter

    return matchesSearch && matchesEntityType && matchesAction
  })

  const handleViewDetails = (entry: AuditEntry) => {
    setSelectedEntry(entry)
    setShowDetailDialog(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Audit Trail</h1>
          <p className="text-muted-foreground">Sistem aktivitelerini izleyin ve denetleyin</p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Rapor Oluştur
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Aktivite</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditEntries.length}</div>
            <p className="text-xs text-muted-foreground">Son 30 gün</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kritik İşlem</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {auditEntries.filter((e) => isCriticalAction(e.action)).length}
            </div>
            <p className="text-xs text-muted-foreground">Dikkat gerektirir</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Kullanıcı</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(auditEntries.map((e) => e.userName)).size}</div>
            <p className="text-xs text-muted-foreground">Benzersiz kullanıcı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doküman İşlemi</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditEntries.filter((e) => e.entityType === "document").length}</div>
            <p className="text-xs text-muted-foreground">Doküman aktivitesi</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Audit kayıtlarında ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={entityTypeFilter} onValueChange={setEntityTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Entity tipi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Tipler</SelectItem>
            <SelectItem value="document">Doküman</SelectItem>
            <SelectItem value="user">Kullanıcı</SelectItem>
            <SelectItem value="training">Eğitim</SelectItem>
            <SelectItem value="reminder">Hatırlatıcı</SelectItem>
            <SelectItem value="workflow">İş Akışı</SelectItem>
          </SelectContent>
        </Select>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="İşlem tipi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm İşlemler</SelectItem>
            <SelectItem value="document_create">Doküman Oluşturma</SelectItem>
            <SelectItem value="document_update">Doküman Güncelleme</SelectItem>
            <SelectItem value="document_rollback">Doküman Geri Alma</SelectItem>
            <SelectItem value="role_change">Rol Değişikliği</SelectItem>
            <SelectItem value="training_completed">Eğitim Tamamlama</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Trail Table */}
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
              {filteredEntries.map((entry) => (
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
                    <Button variant="ghost" size="sm" onClick={() => handleViewDetails(entry)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
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

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <Shield className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Audit kaydı bulunamadı</h3>
          <p className="mt-2 text-muted-foreground">Arama kriterlerinize uygun audit kaydı bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}
