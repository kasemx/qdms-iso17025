import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

export const getPriorityBadge = (priority: string) => {
  const priorityConfig = {
    high: { label: "Yüksek", color: "bg-red-100 text-red-800" },
    medium: { label: "Orta", color: "bg-orange-100 text-orange-800" },
    low: { label: "Düşük", color: "bg-blue-100 text-blue-800" },
    critical: { label: "Kritik", color: "bg-red-200 text-red-900" },
    urgent: { label: "Acil", color: "bg-red-100 text-red-800" },
    normal: { label: "Normal", color: "bg-green-100 text-green-800" },
  }

  const config = priorityConfig[priority as keyof typeof priorityConfig] || {
    label: priority || "Bilinmiyor",
    color: "bg-gray-100 text-gray-800"
  }

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  )
}

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: "Beklemede", color: "bg-yellow-100 text-yellow-800" },
    approved: { label: "Onaylandı", color: "bg-green-100 text-green-800" },
    rejected: { label: "Reddedildi", color: "bg-red-100 text-red-800" },
    active: { label: "Aktif", color: "bg-blue-100 text-blue-800" },
    completed: { label: "Tamamlandı", color: "bg-green-100 text-green-800" },
    cancelled: { label: "İptal Edildi", color: "bg-gray-100 text-gray-800" },
    in_progress: { label: "Devam Ediyor", color: "bg-blue-100 text-blue-800" },
    failed: { label: "Başarısız", color: "bg-red-100 text-red-800" },
    success: { label: "Başarılı", color: "bg-green-100 text-green-800" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status || "Bilinmiyor",
    color: "bg-gray-100 text-gray-800"
  }

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  )
}
