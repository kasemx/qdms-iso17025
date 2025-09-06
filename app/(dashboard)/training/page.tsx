"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  GraduationCap,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  BookOpen,
  Download,
  Calendar,
  TrendingUp,
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

interface TrainingAssignment {
  id: string
  documentCode: string
  documentTitle: string
  categoryName: string
  assignmentType: "read_acknowledge" | "quiz" | "training_session"
  assignedByName: string
  assignedAt: string
  dueDate?: string
  completedAt?: string
  status: "assigned" | "in_progress" | "completed" | "overdue" | "skipped"
  score?: number
  passingScore: number
  attemptsCount: number
  maxAttempts: number
}

export default function TrainingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedPeriod, setSelectedPeriod] = useState("last_month")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<TrainingAssignment | null>(null)

  // Mock data
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
  ])

  const [assignments, setAssignments] = useState<TrainingAssignment[]>([])

  // Report data
  const departmentData = [
    { name: "Kalite Güvence", completed: 23, total: 25, rate: 92 },
    { name: "Üretim", completed: 32, total: 45, rate: 71 },
    { name: "Laboratuvar", completed: 8, total: 8, rate: 100 },
    { name: "İnsan Kaynakları", completed: 15, total: 18, rate: 83 },
    { name: "Satış", completed: 12, total: 15, rate: 80 },
    { name: "Bilgi İşlem", completed: 3, total: 3, rate: 100 },
  ]

  const monthlyData = [
    { month: "Oca", completed: 45, assigned: 52 },
    { month: "Şub", completed: 38, assigned: 41 },
    { month: "Mar", completed: 62, assigned: 68 },
    { month: "Nis", completed: 55, assigned: 59 },
    { month: "May", completed: 71, assigned: 78 },
    { month: "Haz", completed: 48, assigned: 53 },
  ]

  const statusData = [
    { name: "Tamamlanan", value: 93, color: "#10B981" },
    { name: "Devam Eden", value: 28, color: "#3B82F6" },
    { name: "Süresi Geçen", value: 12, color: "#EF4444" },
  ]

  const topDocuments = [
    { code: "PR-KG-001", title: "Doküman Kontrol Prosedürü", completions: 25 },
    { code: "TL-GV-001", title: "Güvenlik Talimatları", completions: 23 },
    { code: "PR-UR-002", title: "Üretim Prosedürleri", completions: 21 },
    { code: "TL-LAB-001", title: "Laboratuvar Kalibrasyonu", completions: 18 },
    { code: "FR-IK-001", title: "İnsan Kaynakları Formları", completions: 15 },
  ]

  useEffect(() => {
    const mockAssignments: TrainingAssignment[] = [
      {
        id: "1",
        documentCode: "PR-001",
        documentTitle: "Kalite Yönetim Sistemi Prosedürü",
        categoryName: "Prosedür",
        assignmentType: "read_acknowledge",
        assignedByName: "Kalite Müdürü",
        assignedAt: "2024-01-15",
        dueDate: "2024-01-29",
        status: "assigned",
        passingScore: 70,
        attemptsCount: 0,
        maxAttempts: 3,
      },
      {
        id: "2",
        documentCode: "TL-HR-001",
        documentTitle: "Personel İşe Alım Talimatı",
        categoryName: "Talimat",
        assignmentType: "read_acknowledge",
        assignedByName: "İK Müdürü",
        assignedAt: "2024-01-10",
        dueDate: "2024-01-20",
        completedAt: "2024-01-18",
        status: "completed",
        score: 85,
        passingScore: 70,
        attemptsCount: 1,
        maxAttempts: 3,
      },
      {
        id: "3",
        documentCode: "FR-QC-001",
        documentTitle: "Kalite Kontrol Formu",
        categoryName: "Form",
        assignmentType: "quiz",
        assignedByName: "Kalite Müdürü",
        assignedAt: "2024-01-05",
        dueDate: "2024-01-12",
        status: "overdue",
        passingScore: 80,
        attemptsCount: 2,
        maxAttempts: 3,
      },
    ]

    setTimeout(() => {
      setAssignments(mockAssignments)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      active: "bg-blue-100 text-blue-800",
      overdue: "bg-red-100 text-red-800",
      assigned: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      skipped: "bg-gray-100 text-gray-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{status.toUpperCase()}</Badge>
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      assigned: "Atandı",
      in_progress: "Devam Ediyor",
      completed: "Tamamlandı",
      overdue: "Vadesi Geçti",
      skipped: "Atlandı",
      active: "Aktif",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getAssignmentTypeLabel = (type: string) => {
    const types = {
      read_acknowledge: "Okudum ve Anladım",
      quiz: "Quiz",
      training_session: "Eğitim Oturumu",
    }
    return types[type as keyof typeof types] || type
  }

  const filteredTrainings = trainings.filter(
    (training) =>
      training.documentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.documentCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleCompleteTraining = (assignment: TrainingAssignment) => {
    setSelectedAssignment(assignment)
    setShowCompleteDialog(true)
  }

  const totalAssigned = trainings.reduce((sum, t) => sum + t.assignedUsers, 0)
  const totalCompleted = trainings.reduce((sum, t) => sum + t.completedUsers, 0)
  const totalOverdue = trainings.reduce((sum, t) => sum + t.overdueUsers, 0)
  const overallCompletionRate = Math.round((totalCompleted / totalAssigned) * 100)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Eğitim Takibi</h1>
          <p className="text-muted-foreground">Eğitim atamaları, tamamlama durumu ve raporlar</p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Eğitim</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainings.length}</div>
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="assignments">Eğitim Atamalarım</TabsTrigger>
          <TabsTrigger value="reports">Raporlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Eğitim ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="assigned">Atandı</SelectItem>
                <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                <SelectItem value="completed">Tamamlandı</SelectItem>
                <SelectItem value="overdue">Vadesi Geçti</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* My Assignments Stats */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Eğitim</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{assignments.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {assignments.filter((a) => a.status === "completed").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bekleyen</CardTitle>
                <Clock className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {assignments.filter((a) => a.status === "assigned").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vadesi Geçen</CardTitle>
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {assignments.filter((a) => a.status === "overdue").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Assignments List */}
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <Card key={assignment.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{assignment.documentCode}</CardTitle>
                        <Badge className={getStatusBadge(assignment.status).props.className}>
                          {getStatusLabel(assignment.status)}
                        </Badge>
                      </div>
                      <CardDescription className="text-base font-medium">{assignment.documentTitle}</CardDescription>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Kategori: {assignment.categoryName}</span>
                        <span>Tip: {getAssignmentTypeLabel(assignment.assignmentType)}</span>
                        <span>Atayan: {assignment.assignedByName}</span>
                      </div>
                    </div>
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Atanma Tarihi:</span>
                      <p className="font-medium">{new Date(assignment.assignedAt).toLocaleDateString("tr-TR")}</p>
                    </div>
                    {assignment.dueDate && (
                      <div>
                        <span className="text-muted-foreground">Son Tarih:</span>
                        <p className="font-medium">{new Date(assignment.dueDate).toLocaleDateString("tr-TR")}</p>
                      </div>
                    )}
                    {assignment.completedAt && (
                      <div>
                        <span className="text-muted-foreground">Tamamlanma:</span>
                        <p className="font-medium">{new Date(assignment.completedAt).toLocaleDateString("tr-TR")}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Deneme:</span>
                      <p className="font-medium">
                        {assignment.attemptsCount}/{assignment.maxAttempts}
                      </p>
                    </div>
                  </div>

                  {assignment.score !== undefined && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          Puan: {assignment.score}/{assignment.passingScore}
                        </span>
                        <span>{assignment.score >= assignment.passingScore ? "Başarılı" : "Başarısız"}</span>
                      </div>
                      <Progress value={(assignment.score / 100) * 100} className="h-2" />
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    {assignment.status === "assigned" && (
                      <Button onClick={() => handleCompleteTraining(assignment)}>Eğitimi Tamamla</Button>
                    )}
                    {assignment.status === "completed" && <Button variant="outline">Sertifikayı Görüntüle</Button>}
                    <Button variant="outline">Dokümanı Görüntüle</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAssignments.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">Eğitim ataması bulunamadı</h3>
              <p className="mt-2 text-muted-foreground">Arama kriterlerinize uygun eğitim ataması bulunmuyor.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          {/* Report Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dönem</label>
                    <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="last_week">Son Hafta</SelectItem>
                        <SelectItem value="last_month">Son Ay</SelectItem>
                        <SelectItem value="last_quarter">Son Çeyrek</SelectItem>
                        <SelectItem value="last_year">Son Yıl</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Departman</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Tüm Departmanlar</SelectItem>
                        <SelectItem value="quality">Kalite Güvence</SelectItem>
                        <SelectItem value="production">Üretim</SelectItem>
                        <SelectItem value="lab">Laboratuvar</SelectItem>
                        <SelectItem value="hr">İnsan Kaynakları</SelectItem>
                        <SelectItem value="sales">Satış</SelectItem>
                        <SelectItem value="it">Bilgi İşlem</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    PDF İndir
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Excel İndir
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">133</p>
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
                    <p className="text-2xl font-bold">93</p>
                    <p className="text-sm text-muted-foreground">Tamamlanan</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-sm text-muted-foreground">Başarı Oranı</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-muted-foreground">Süresi Geçen</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Completion Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Aylık Eğitim Tamamlama Trendi</CardTitle>
                <CardDescription>Son 6 ayın eğitim tamamlama performansı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="assigned" fill="#E5E7EB" name="Atanan" />
                    <Bar dataKey="completed" fill="#3B82F6" name="Tamamlanan" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Eğitim Durumu Dağılımı</CardTitle>
                <CardDescription>Mevcut eğitim durumlarının oransal dağılımı</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center space-x-4 mt-4">
                  {statusData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">
                        {item.name}: {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Department Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Departman Performansı</CardTitle>
                <CardDescription>Departmanlara göre eğitim tamamlama oranları</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departmentData.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{dept.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">
                            {dept.completed}/{dept.total}
                          </span>
                          <Badge variant={dept.rate >= 90 ? "default" : dept.rate >= 70 ? "secondary" : "destructive"}>
                            {dept.rate}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={dept.rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Documents */}
            <Card>
              <CardHeader>
                <CardTitle>En Çok Tamamlanan Eğitimler</CardTitle>
                <CardDescription>En yüksek tamamlanma sayısına sahip dokümanlar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{doc.code}</p>
                        <p className="text-xs text-muted-foreground truncate">{doc.title}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {doc.completions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Complete Training Dialog */}
      <Dialog open={showCompleteDialog} onOpenChange={setShowCompleteDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Eğitimi Tamamla</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.documentTitle} eğitimini tamamlamak için aşağıdaki formu doldurun
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="acknowledgment">Onay Metni</Label>
              <Textarea
                id="acknowledgment"
                defaultValue="Bu dokümanı okudum, anladım ve uygulamaya hazırım."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notlar (İsteğe bağlı)</Label>
              <Textarea id="notes" placeholder="Eğitim hakkında notlarınız..." rows={2} />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCompleteDialog(false)}>
                İptal
              </Button>
              <Button onClick={() => setShowCompleteDialog(false)}>Eğitimi Tamamla</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
