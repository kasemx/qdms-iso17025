"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { GraduationCap, Search, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react"

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

export default function TrainingAssignmentsPage() {
  const [assignments, setAssignments] = useState<TrainingAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showCompleteDialog, setShowCompleteDialog] = useState(false)
  const [selectedAssignment, setSelectedAssignment] = useState<TrainingAssignment | null>(null)

  // Mock data - gerçek uygulamada API'den gelecek
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

  const getStatusLabel = (status: string) => {
    const labels = {
      assigned: "Atandı",
      in_progress: "Devam Ediyor",
      completed: "Tamamlandı",
      overdue: "Vadesi Geçti",
      skipped: "Atlandı",
    }
    return labels[status as keyof typeof labels] || status
  }

  const getStatusColor = (status: string) => {
    const colors = {
      assigned: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      overdue: "bg-red-100 text-red-800",
      skipped: "bg-gray-100 text-gray-800",
    }
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getAssignmentTypeLabel = (type: string) => {
    const types = {
      read_acknowledge: "Okudum ve Anladım",
      quiz: "Quiz",
      training_session: "Eğitim Oturumu",
    }
    return types[type as keyof typeof types] || type
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Eğitim Atamalarım</h1>
          <p className="text-muted-foreground">Size atanan eğitimleri görüntüleyin ve tamamlayın</p>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Assignments List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{assignment.documentCode}</CardTitle>
                    <Badge className={getStatusColor(assignment.status)}>{getStatusLabel(assignment.status)}</Badge>
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

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Eğitim ataması bulunamadı</h3>
          <p className="mt-2 text-muted-foreground">Arama kriterlerinize uygun eğitim ataması bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}
