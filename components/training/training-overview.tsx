"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  GraduationCap,
  Search,
} from "lucide-react"

interface Training {
  id: string
  documentCode: string
  documentTitle: string
  assignedUsers: number
  completedUsers: number
  overdueUsers: number
  completionRate: number
  dueDate: string
  status: "active" | "completed" | "overdue"
}

interface TrainingOverviewProps {
  trainings: Training[]
  searchTerm: string
  onSearchChange: (value: string) => void
  totalAssigned: number
  totalCompleted: number
  totalOverdue: number
  overallCompletionRate: number
}

export function TrainingOverview({
  trainings,
  searchTerm,
  onSearchChange,
  totalAssigned,
  totalCompleted,
  totalOverdue,
  overallCompletionRate,
}: TrainingOverviewProps) {
  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
      overdue: "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status.toUpperCase()}</Badge>
  }

  const filteredTrainings = trainings.filter(
    (training) =>
      training.documentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Genel Eğitim Durumu</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Genel Tamamlanma Oranı</span>
              <span className="text-sm font-bold">{overallCompletionRate}%</span>
            </div>
            <Progress value={overallCompletionRate} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-blue-600">{totalAssigned}</p>
                <p className="text-xs text-muted-foreground">Toplam Atama</p>
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">{totalCompleted}</p>
                <p className="text-xs text-muted-foreground">Tamamlanan</p>
              </div>
              <div>
                <p className="text-lg font-bold text-red-600">{totalOverdue}</p>
                <p className="text-xs text-muted-foreground">Süresi Geçen</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Eğitim ara..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trainings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tüm Eğitimler</CardTitle>
          <CardDescription>Sistem genelindeki tüm eğitim atamaları ve durumları</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doküman Kodu</TableHead>
                <TableHead>Eğitim Başlığı</TableHead>
                <TableHead>Atanan</TableHead>
                <TableHead>Tamamlanan</TableHead>
                <TableHead>Süresi Geçen</TableHead>
                <TableHead>Tamamlanma Oranı</TableHead>
                <TableHead>Son Tarih</TableHead>
                <TableHead>Durum</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrainings.map((training) => (
                <TableRow key={training.id}>
                  <TableCell className="font-medium">{training.documentCode}</TableCell>
                  <TableCell className="max-w-xs truncate">{training.documentTitle}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{training.assignedUsers}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800 border-green-300">
                      {training.completedUsers}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {training.overdueUsers > 0 ? (
                      <Badge className="bg-red-100 text-red-800 border-red-300">{training.overdueUsers}</Badge>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={training.completionRate} className="w-16 h-2" />
                      <span className="text-sm font-medium">{training.completionRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(training.dueDate).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell>{getStatusBadge(training.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}