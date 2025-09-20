"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  FileText, 
  Settings, 
  TestTube, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Shield,
  Users,
  Zap
} from "lucide-react"

interface DashboardStatsProps {
  data: {
    documents: { total: number; pending: number; approved: number; revisions: number }
    equipment: { total: number; calibrated: number; due: number; critical: number }
    tests: { total: number; running: number; completed: number; failed: number }
    risks: { total: number; high: number; medium: number; low: number }
    personnel: { total: number; trained: number; certified: number; expired: number }
  }
}

export function DashboardStats({ data }: DashboardStatsProps) {
  // Trend hesaplamaları (mock data)
  const calculateTrend = (current: number, previous: number = current * 0.9) => {
    const change = ((current - previous) / previous) * 100
    return {
      percentage: Math.abs(change).toFixed(1),
      isPositive: change > 0,
      isNeutral: Math.abs(change) < 1
    }
  }

  const documentTrend = calculateTrend(data.documents.approved)
  const equipmentTrend = calculateTrend(data.equipment.calibrated)
  const testTrend = calculateTrend(data.tests.completed)
  const riskTrend = calculateTrend(data.risks.high, data.risks.high * 1.2) // Risk azalması pozitif

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Toplam Doküman */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Doküman</CardTitle>
          <FileText className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{data.documents.total}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">{data.documents.pending}</span> bekleyen onay
            </p>
            <div className="flex items-center text-xs">
              {documentTrend.isPositive ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={documentTrend.isPositive ? "text-green-600" : "text-red-600"}>
                %{documentTrend.percentage}
              </span>
            </div>
          </div>
          <Progress value={(data.documents.approved / data.documents.total) * 100} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Ekipman Durumu */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ekipman Durumu</CardTitle>
          <Settings className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{data.equipment.total}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">{data.equipment.due}</span> kalibrasyon gerekli
            </p>
            <div className="flex items-center text-xs">
              {equipmentTrend.isPositive ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={equipmentTrend.isPositive ? "text-green-600" : "text-red-600"}>
                %{equipmentTrend.percentage}
              </span>
            </div>
          </div>
          <Progress value={(data.equipment.calibrated / data.equipment.total) * 100} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Aktif Testler */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Aktif Testler</CardTitle>
          <TestTube className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">{data.tests.running}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{data.tests.completed}</span> tamamlandı
            </p>
            <div className="flex items-center text-xs">
              {testTrend.isPositive ? (
                <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={testTrend.isPositive ? "text-green-600" : "text-red-600"}>
                %{testTrend.percentage}
              </span>
            </div>
          </div>
          <Progress value={(data.tests.completed / data.tests.total) * 100} className="h-2 mt-2" />
        </CardContent>
      </Card>

      {/* Risk Durumu */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Risk Durumu</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{data.risks.high}</div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">{data.risks.total}</span> toplam risk
            </p>
            <div className="flex items-center text-xs">
              {!riskTrend.isPositive ? (
                <ArrowDownRight className="h-3 w-3 text-green-600 mr-1" />
              ) : (
                <ArrowUpRight className="h-3 w-3 text-red-600 mr-1" />
              )}
              <span className={!riskTrend.isPositive ? "text-green-600" : "text-red-600"}>
                %{riskTrend.percentage}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-2">
            <div className="bg-red-200 h-2 rounded" style={{ width: `${(data.risks.high / data.risks.total) * 100}%` }}></div>
            <div className="bg-yellow-200 h-2 rounded" style={{ width: `${(data.risks.medium / data.risks.total) * 100}%` }}></div>
            <div className="bg-green-200 h-2 rounded" style={{ width: `${(data.risks.low / data.risks.total) * 100}%` }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}