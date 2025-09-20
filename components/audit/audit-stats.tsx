"use client"

import { StatsGrid, type StatItem } from "@/components/common/stats-grid"
import { Activity, AlertTriangle, User, Shield } from "lucide-react"

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

interface AuditStatsProps {
  auditEntries: AuditEntry[]
}

export function AuditStats({ auditEntries }: AuditStatsProps) {
  const isCriticalAction = (action: string) => {
    const criticalActions = ["document_delete", "document_rollback", "role_change", "user_delete"]
    return criticalActions.includes(action)
  }

  const criticalActionsCount = auditEntries.filter((e) => isCriticalAction(e.action)).length
  const uniqueUsersCount = new Set(auditEntries.map((e) => e.userName)).size
  const documentActionsCount = auditEntries.filter((e) => e.entityType === "document").length

  const stats: StatItem[] = [
    {
      id: "total-activity",
      title: "Toplam Aktivite",
      value: auditEntries.length,
      description: "Son 30 gün",
      icon: Activity,
      color: "blue"
    },
    {
      id: "critical-actions",
      title: "Kritik İşlem",
      value: criticalActionsCount,
      description: "Dikkat gerektirir",
      icon: AlertTriangle,
      color: "red"
    },
    {
      id: "active-users",
      title: "Aktif Kullanıcı",
      value: uniqueUsersCount,
      description: "Benzersiz kullanıcı",
      icon: User,
      color: "green"
    },
    {
      id: "document-actions",
      title: "Doküman İşlemi",
      value: documentActionsCount,
      description: "Doküman aktivitesi",
      icon: Shield,
      color: "purple"
    }
  ]

  return (
    <StatsGrid
      stats={stats}
      columns={{ default: 1, md: 2, lg: 4 }}
    />
  )
}