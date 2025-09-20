"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BookOpen,
  Users,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

interface TrainingStatsProps {
  totalTrainings: number
  totalAssigned: number
  totalCompleted: number
  totalOverdue: number
}

export function TrainingStats({
  totalTrainings,
  totalAssigned,
  totalCompleted,
  totalOverdue,
}: TrainingStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Eğitim</CardTitle>
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalTrainings}</div>
          <p className="text-xs text-muted-foreground">Aktif eğitim sayısı</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Toplam Atama</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalAssigned}</div>
          <p className="text-xs text-muted-foreground">Personel ataması</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{totalCompleted}</div>
          <p className="text-xs text-muted-foreground">Başarılı tamamlama</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Süresi Geçen</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{totalOverdue}</div>
          <p className="text-xs text-muted-foreground">Acil eylem gerekli</p>
        </CardContent>
      </Card>
    </div>
  )
}