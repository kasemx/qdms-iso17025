"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, Search, Users, BookOpen, CheckCircle, AlertTriangle } from "lucide-react"

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

export default function AllTrainingsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Örnek eğitim verileri
  const [trainings] = useState<Training[]>([
    {
      id: "1",
      documentCode: "PR-KG-001",
      documentTitle: "Doküman Kontrol Prosedürü",
      assignedUsers: 25,
      completedUsers: 23,
      overdueUsers: 0,
      completionRate: 92,
      dueDate: "2024-02-15",
      status: "active",
    },
    {
      id: "2",
      documentCode: "TL-LAB-001",
      documentTitle: "Laboratuvar Cihaz Kalibrasyonu Talimatı",
      assignedUsers: 8,
      completedUsers: 8,
      overdueUsers: 0,
      completionRate: 100,
      dueDate: "2024-01-30",
      status: "completed",
    },
    {
      id: "3",
      documentCode: "PR-GV-002",
      documentTitle: "Güvenlik Prosedürleri",
      assignedUsers: 45,
      completedUsers: 32,
      overdueUsers: 5,
      completionRate: 71,
      dueDate: "2024-01-25",
      status: "overdue",
    },
    {
      id: "4",
      documentCode: "TL-UR-003",
      documentTitle: "Üretim Hattı Güvenlik Talimatı",
      assignedUsers: 18,
      completedUsers: 15,
      overdueUsers: 1,
      completionRate: 83,
      dueDate: "2024-02-10",
      status: "active",
    },
  ])

  const filteredTrainings = trainings.filter(
    (training) =>
      training.documentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-300">Tamamlandı</Badge>
      case "overdue":
        return <Badge className="bg-red-100 text-red-800 border-red-300">Süresi Geçti</Badge>
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300">Aktif</Badge>
    }
  }

  const totalAssigned = trainings.reduce((sum, t) => sum + t.assignedUsers, 0)
  const totalCompleted = trainings.reduce((sum, t) => sum + t.completedUsers, 0)
  const totalOverdue = trainings.reduce((sum, t) => sum + t.overdueUsers, 0)
  const overallCompletionRate = Math.round((totalCompleted / totalAssigned) * 100)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tüm Eğitimler</h1>
          <p className="text-muted-foreground">Sistem genelindeki tüm eğitim atamaları ve durumları</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{trainings.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Eğitim</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{totalAssigned}</p>
                <p className="text-sm text-muted-foreground">Toplam Atama</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{totalCompleted}</p>
                <p className="text-sm text-muted-foreground">Tamamlanan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{totalOverdue}</p>
                <p className="text-sm text-muted-foreground">Süresi Geçen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trainings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Eğitim Listesi</CardTitle>
          <CardDescription>Tüm eğitim atamaları ve tamamlanma durumları</CardDescription>
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
                    <Badge className="bg-green-100 text-green-800 border-green-300">{training.completedUsers}</Badge>
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
