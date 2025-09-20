"use client"

import { useState, useEffect, useMemo } from "react"
import { toast } from "sonner"
import { AuditHeader } from "@/components/audit/audit-header"
import { AuditStats } from "@/components/audit/audit-stats"
import { AuditFilters } from "@/components/audit/audit-filters"
import { AuditTable } from "@/components/audit/audit-table"
import { AuditDialogs } from "@/components/audit/audit-dialogs"
import { PageLayout, LoadingState } from "@/components/common"

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
  const [dateFilter, setDateFilter] = useState<string>("all")
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)

  // Enhanced mock data with more comprehensive audit entries
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
      {
        id: "6",
        entityType: "security",
        entityId: "sec-001",
        action: "login",
        userName: "Ayşe Kaya",
        changeSummary: "Başarılı giriş yapıldı",
        ipAddress: "192.168.1.105",
        createdAt: "2024-01-18T08:30:00Z",
      },
      {
        id: "7",
        entityType: "document",
        entityId: "doc-456",
        action: "document_delete",
        userName: "Admin",
        changeSummary: "Eski prosedür dokümanı silindi - TL-002",
        ipAddress: "192.168.1.1",
        createdAt: "2024-01-17T15:22:00Z",
      },
      {
        id: "8",
        entityType: "workflow",
        entityId: "workflow-888",
        action: "workflow_approved",
        userName: "Kalite Sorumlusu",
        changeSummary: "Doküman onay iş akışı tamamlandı - DOC-2024-001",
        ipAddress: "192.168.1.88",
        createdAt: "2024-01-16T13:45:00Z",
      },
      {
        id: "9",
        entityType: "security",
        entityId: "sec-002",
        action: "password_change",
        userName: "Fatma Öztürk",
        changeSummary: "Kullanıcı şifresini değiştirdi",
        ipAddress: "192.168.1.111",
        createdAt: "2024-01-15T17:30:00Z",
      },
      {
        id: "10",
        entityType: "document",
        entityId: "doc-777",
        action: "document_archive",
        userName: "Arşiv Sorumlusu",
        changeSummary: "Eski sürüm dokümanı arşivlendi - PR-005 v1.2",
        ipAddress: "192.168.1.200",
        createdAt: "2024-01-15T10:15:00Z",
      },
      {
        id: "11",
        entityType: "user",
        entityId: "user-999",
        action: "account_created",
        userName: "Sistem Yöneticisi",
        changeSummary: "Yeni kullanıcı hesabı oluşturuldu - Can Yıldız",
        ipAddress: "192.168.1.50",
        createdAt: "2024-01-14T09:20:00Z",
      },
      {
        id: "12",
        entityType: "training",
        entityId: "training-555",
        action: "training_failed",
        userName: "Ali Vural",
        changeSummary: "TL-003 eğitimi başarısız - Puan: 45 (Min: 70)",
        ipAddress: "192.168.1.130",
        createdAt: "2024-01-13T16:40:00Z",
      },
    ]

    setTimeout(() => {
      setAuditEntries(mockEntries)
      setLoading(false)
    }, 1000)
  }, [])

  // Enhanced filtering with useMemo for better performance
  const filteredEntries = useMemo(() => {
    return auditEntries.filter((entry) => {
      const matchesSearch =
        entry.changeSummary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.entityId.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesEntityType = entityTypeFilter === "all" || entry.entityType === entityTypeFilter
      const matchesAction = actionFilter === "all" || entry.action === actionFilter
      
      // Date filtering
      let matchesDate = true
      if (dateFilter !== "all") {
        const entryDate = new Date(entry.createdAt)
        const today = new Date()
        
        switch (dateFilter) {
          case "today":
            matchesDate = entryDate.toDateString() === today.toDateString()
            break
          case "week":
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
            matchesDate = entryDate >= weekAgo
            break
          case "month":
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
            matchesDate = entryDate >= monthAgo
            break
        }
      }

      return matchesSearch && matchesEntityType && matchesAction && matchesDate
    })
  }, [auditEntries, searchTerm, entityTypeFilter, actionFilter, dateFilter])

  const handleViewDetails = (entry: AuditEntry) => {
    setSelectedEntry(entry)
    setShowDetailDialog(true)
  }

  const handleGenerateReport = async () => {
    try {
      setExportLoading(true)
      
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create CSV content
      const csvContent = [
        ['Tarih/Saat', 'Kullanıcı', 'İşlem', 'Entity Tipi', 'Açıklama', 'IP Adresi'].join(','),
        ...filteredEntries.map(entry => [
          new Date(entry.createdAt).toLocaleString('tr-TR'),
          entry.userName,
          entry.action,
          entry.entityType,
          `"${entry.changeSummary || '-'}"`,
          entry.ipAddress || '-'
        ].join(','))
      ].join('\n')
      
      // Download CSV file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', `audit-trail-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast.success('Audit raporu başarıyla oluşturuldu ve indirildi')
    } catch (error) {
      console.error('Report generation error:', error)
      toast.error('Rapor oluşturulurken hata oluştu')
    } finally {
      setExportLoading(false)
    }
  }

  if (loading) {
    return (
      <PageLayout
        title="Audit Trail"
        description="Sistem aktivitelerini ve değişikliklerini takip edin"
      >
        <LoadingState type="page" />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Audit Trail"
      description="Sistem aktivitelerini ve değişikliklerini takip edin"
      actions={
        <AuditHeader 
          onGenerateReport={handleGenerateReport}
          exportLoading={exportLoading}
          totalEntries={auditEntries.length}
          filteredEntries={filteredEntries.length}
        />
      }
    >
      <AuditStats auditEntries={auditEntries} />

      <AuditFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        entityTypeFilter={entityTypeFilter}
        onEntityTypeFilterChange={setEntityTypeFilter}
        actionFilter={actionFilter}
        onActionFilterChange={setActionFilter}
        dateFilter={dateFilter}
        onDateFilterChange={setDateFilter}
      />

      <AuditTable
        auditEntries={filteredEntries}
        onViewDetails={handleViewDetails}
      />

      <AuditDialogs
        showDetailDialog={showDetailDialog}
        onCloseDetailDialog={() => setShowDetailDialog(false)}
        selectedEntry={selectedEntry}
      />
    </PageLayout>
  )
}