"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  GraduationCap,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react"

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

interface TrainingAssignmentsProps {
  assignments: TrainingAssignment[]
  searchTerm: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusFilterChange: (value: string) => void
  onCompleteTraining: (assignment: TrainingAssignment) => void
}

export function TrainingAssignments({
  assignments,
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onCompleteTraining,
}: TrainingAssignmentsProps) {
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

  const getAssignmentTypeLabel = (type: string) => {
    const types = {
      read_acknowledge: "Okudum ve Anladım",
      quiz: "Quiz",
      training_session: "Eğitim Oturumu",
    }
    return types[type as keyof typeof types] || type
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-100 text-green-800",
      assigned: "bg-blue-100 text-blue-800",
      in_progress: "bg-yellow-100 text-yellow-800",
      overdue: "bg-red-100 text-red-800",
      skipped: "bg-gray-100 text-gray-800",
    }
    return <Badge className={variants[status as keyof typeof variants]}>{getStatusLabel(status)}</Badge>
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch =
      assignment.documentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.documentCode.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || assignment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Eğitim ara..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={onStatusFilterChange}>
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
                    {getStatusBadge(assignment.status)}
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
                  <Button onClick={() => onCompleteTraining(assignment)}>Eğitimi Tamamla</Button>
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
    </div>
  )
}