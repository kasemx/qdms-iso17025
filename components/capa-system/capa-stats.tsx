"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardCheck, CheckCircle, Activity, AlertTriangle } from "lucide-react"

interface CAPA {
  id: string
  status: string
  priority: string
  createdAt: string
  updatedAt: string
}

interface CAPAStatsProps {
  capas: CAPA[]
  isLoading?: boolean
}

export function CAPAStats({ capas, isLoading = false }: CAPAStatsProps) {
  const totalCAPAs = capas.length
  const completedCAPAs = capas.filter((c) => c.status === "Tamamlandı" || c.status === "completed").length
  const inProgressCAPAs = capas.filter((c) => c.status === "Uygulanıyor" || c.status === "in_progress").length
  const highPriorityCAPAs = capas.filter((c) => c.priority === "Yüksek" || c.priority === "high" || c.priority === "critical").length

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded animate-pulse w-20" />
              <div className="h-4 w-4 bg-muted rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded animate-pulse w-16 mb-1" />
              <div className="h-3 bg-muted rounded animate-pulse w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam CAPA</CardTitle>
          <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCAPAs}</div>
          <p className="text-xs text-muted-foreground">Kayıtlı CAPA</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tamamlandı</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedCAPAs}</div>
          <p className="text-xs text-muted-foreground">Tamamlanan CAPA</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uygulanıyor</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressCAPAs}</div>
          <p className="text-xs text-muted-foreground">Aktif CAPA</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Yüksek Öncelik</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highPriorityCAPAs}</div>
          <p className="text-xs text-muted-foreground">Kritik CAPA</p>
        </CardContent>
      </Card>
    </div>
  )
}