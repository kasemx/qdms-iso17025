"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrainingHeader } from "@/components/training/training-header"
import { TrainingStats } from "@/components/training/training-stats"
import { TrainingOverview } from "@/components/training/training-overview"
import { TrainingAssignments } from "@/components/training/training-assignments"
import { TrainingReports } from "@/components/training/training-reports"
import { TrainingDialogs } from "@/components/training/training-dialogs"
import { PageLayout, LoadingState } from "@/components/common"

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
      <PageLayout
        title="Eğitim Yönetimi"
        description="Personel eğitimlerini ve atamalarını yönetin"
      >
        <LoadingState type="page" />
      </PageLayout>
    )
  }

  return (
    <PageLayout
      title="Eğitim Yönetimi"
      description="Personel eğitimlerini ve atamalarını yönetin"
    >
      <TrainingStats
        totalTrainings={trainings.length}
        totalAssigned={totalAssigned}
        totalCompleted={totalCompleted}
        totalOverdue={totalOverdue}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="assignments">Eğitim Atamalarım</TabsTrigger>
          <TabsTrigger value="reports">Raporlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <TrainingOverview
            trainings={trainings}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            totalAssigned={totalAssigned}
            totalCompleted={totalCompleted}
            totalOverdue={totalOverdue}
            overallCompletionRate={overallCompletionRate}
          />
        </TabsContent>

        <TabsContent value="assignments">
          <TrainingAssignments
            assignments={assignments}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onCompleteTraining={handleCompleteTraining}
          />
        </TabsContent>

        <TabsContent value="reports">
          <TrainingReports
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={setSelectedDepartment}
          />
        </TabsContent>
      </Tabs>

      <TrainingDialogs
        showCompleteDialog={showCompleteDialog}
        onCloseCompleteDialog={() => setShowCompleteDialog(false)}
        selectedAssignment={selectedAssignment}
      />
    </PageLayout>
  )
}