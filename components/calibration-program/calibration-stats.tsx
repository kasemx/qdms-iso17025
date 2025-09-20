"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Activity,
  AlertTriangle,
  Shield,
  Wrench,
  Zap
} from "lucide-react"

interface CalibrationStats {
  totalPrograms: number
  activePrograms: number
  overduePrograms: number
  completedThisMonth: number
  totalCost: number
  averageCompletionTime: number
  complianceRate: number
  automationRate: number
  riskDistribution: Record<string, number>
  upcomingCalibrations: number
}

interface CalibrationStatsProps {
  stats: CalibrationStats
  isLoading?: boolean
}

export function CalibrationStats({ stats, isLoading }: CalibrationStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i}>
            <CardHeader className="space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Program</CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPrograms}</div>
          <p className="text-xs text-muted-foreground">
            {stats.activePrograms} aktif program
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Süresi Geçen</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.overduePrograms}
          </div>
          <p className="text-xs text-muted-foreground">
            Acil müdahale gerekli
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Otomasyon Oranı</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            %{stats.automationRate}
          </div>
          <p className="text-xs text-muted-foreground">
            Otomatik iş akışı
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uygunluk Oranı</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            %{stats.complianceRate}
          </div>
          <p className="text-xs text-muted-foreground">
            ISO 17025 uyumluluğu
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Maliyet</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(stats.totalCost)}
          </div>
          <p className="text-xs text-muted-foreground">
            Yıllık kalibrasyon bütçesi
          </p>
        </CardContent>
      </Card>
    </div>
  )
}