"use client"

import { useState } from "react"
import { PersonnelHeader } from "@/components/personnel/personnel-header"
import { PersonnelStatsEnhanced } from "@/components/personnel/personnel-stats-enhanced"
import { PersonnelFilters } from "@/components/personnel/personnel-filters"
import { PersonnelList } from "@/components/personnel/personnel-list"
import { PersonnelDialogs } from "@/components/personnel/personnel-dialogs"
import { usePersonnel } from "@/hooks/use-personnel"
import { PageLayout } from "@/components/common/page-layout"

// Mevcut komponentlerle uyumlu interface'ler
interface PersonnelCompetency {
  id: number
  name: string
  position: string
  department: string
  email: string
  competencyLevel: number
  skills: string[]
  certifications: string[]
  trainingProgress: number
  lastEvaluation: string
  nextEvaluation: string
  performance: {
    overall: number
    technical: number
    communication: number
    leadership: number
  }
  developmentPlan: {
    goals: string[]
    targetDate: string
    progress: number
  }
  status: "active" | "inactive" | "training"
}

interface TrainingPlan {
  id: number
  title: string
  description: string
  category: "technical" | "compliance" | "leadership" | "safety"
  trainer: string
  plannedDate: string
  duration: string
  targetAudience: string
  participants: number
  maxParticipants: number
  status: "planned" | "ongoing" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "critical"
  budget: {
    allocated: number
    spent: number
  }
  venue: string
  type: "internal" | "external" | "online"
}

interface PersonnelContentProps {
  className?: string
}

export function PersonnelContent({ className }: PersonnelContentProps) {
  const {
    personnel: allPersonnel,
    trainingPlans: allTrainingPlans,
    searchTerm,
    setSearchTerm,
    departmentFilter,
    setDepartmentFilter,
    competencyFilter,
    setCompetencyFilter,
    statusFilter,
    setStatusFilter,
    viewMode,
    setViewMode,
    clearFilters,
    addPersonnel,
    deletePersonnel,
    addTrainingPlan
  } = usePersonnel()

  // Mevcut komponentlerle uyumlu hale getir
  const personnel: PersonnelCompetency[] = allPersonnel.map(p => ({
    ...p,
    status: p.status === "on_leave" ? "inactive" : p.status as "active" | "inactive" | "training"
  }))

  const trainingPlans: TrainingPlan[] = allTrainingPlans.map(t => ({
    ...t,
    category: t.category === "soft_skills" ? "leadership" : t.category as "technical" | "compliance" | "leadership" | "safety",
    status: t.status === "postponed" ? "planned" : t.status as "planned" | "ongoing" | "completed" | "cancelled",
    type: t.type === "hybrid" ? "online" : t.type as "internal" | "external" | "online"
  }))

  // Dialog states
  const [isPersonnelDialogOpen, setIsPersonnelDialogOpen] = useState(false)
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false)
  const [selectedPersonnel, setSelectedPersonnel] = useState<number[]>([])
  
  // Form states
  const [personnelFormData, setPersonnelFormData] = useState({
    name: "",
    email: "",
    position: "",
    department: "",
    competencyLevel: "1",
    skills: "",
    certifications: "",
    status: "active",
    developmentGoals: ""
  })
  
  const [trainingFormData, setTrainingFormData] = useState({
    title: "",
    description: "",
    category: "technical",
    trainer: "",
    targetAudience: "",
    plannedDate: "",
    duration: "",
    maxParticipants: "",
    cost: "",
    venue: "",
    priority: "medium",
    type: "internal"
  })

  // Handlers
  const handleNewPersonnel = () => {
    resetPersonnelForm()
    setIsPersonnelDialogOpen(true)
  }

  const handleEditPersonnel = (id: number) => {
    const person = personnel.find(p => p.id === id)
    if (person) {
      setPersonnelFormData({
        name: person.name,
        email: person.email,
        position: person.position,
        department: person.department,
        competencyLevel: person.competencyLevel.toString(),
        skills: person.skills.join(", "),
        certifications: person.certifications.join(", "),
        status: person.status,
        developmentGoals: person.developmentPlan.goals.join(", ")
      })
      setIsPersonnelDialogOpen(true)
    }
  }

  const handleViewPersonnel = (id: number) => {
    handleEditPersonnel(id)
  }

  const handlePersonnelSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const skillsArray = personnelFormData.skills.split(",").map(s => s.trim()).filter(Boolean)
    const certificationsArray = personnelFormData.certifications.split(",").map(s => s.trim()).filter(Boolean)
    const goalsArray = personnelFormData.developmentGoals.split(",").map(s => s.trim()).filter(Boolean)

    const personnelData = {
      name: personnelFormData.name,
      email: personnelFormData.email,
      position: personnelFormData.position,
      department: personnelFormData.department,
      hireDate: new Date().toISOString().split('T')[0],
      competencyLevel: parseInt(personnelFormData.competencyLevel),
      skills: skillsArray,
      certifications: certificationsArray,
      status: personnelFormData.status as "active" | "inactive" | "training" | "on_leave",
      trainingProgress: 0,
      lastEvaluation: new Date().toISOString().split('T')[0],
      nextEvaluation: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      performance: {
        overall: 3.0,
        technical: 3.0,
        communication: 3.0,
        leadership: 3.0
      },
      developmentPlan: {
        goals: goalsArray,
        targetDate: new Date(Date.now() + 12 * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        progress: 0
      }
    }

    addPersonnel(personnelData)
    setIsPersonnelDialogOpen(false)
    resetPersonnelForm()
  }

  const handleTrainingSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const trainingData = {
      title: trainingFormData.title,
      description: trainingFormData.description,
      category: trainingFormData.category as "technical" | "compliance" | "leadership" | "safety" | "soft_skills",
      trainer: trainingFormData.trainer,
      targetAudience: trainingFormData.targetAudience,
      plannedDate: trainingFormData.plannedDate,
      duration: trainingFormData.duration,
      maxParticipants: parseInt(trainingFormData.maxParticipants),
      participants: 0,
      status: "planned" as const,
      priority: trainingFormData.priority as "low" | "medium" | "high" | "critical",
      budget: {
        allocated: parseInt(trainingFormData.cost) || 0,
        spent: 0
      },
      venue: trainingFormData.venue,
      type: trainingFormData.type as "internal" | "external" | "online" | "hybrid"
    }

    addTrainingPlan(trainingData)
    setIsTrainingDialogOpen(false)
    resetTrainingForm()
  }

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "delete":
        if (confirm(`Seçili ${selectedPersonnel.length} personeli silmek istediğinizden emin misiniz?`)) {
          selectedPersonnel.forEach(id => deletePersonnel(id))
          setSelectedPersonnel([])
        }
        break
      case "export":
        console.log("Exporting personnel:", selectedPersonnel)
        break
      case "assign_training":
        console.log("Assigning training to:", selectedPersonnel)
        break
    }
  }

  const resetPersonnelForm = () => {
    setPersonnelFormData({
      name: "",
      email: "",
      position: "",
      department: "",
      competencyLevel: "1",
      skills: "",
      certifications: "",
      status: "active",
      developmentGoals: ""
    })
  }

  const resetTrainingForm = () => {
    setTrainingFormData({
      title: "",
      description: "",
      category: "technical",
      trainer: "",
      targetAudience: "",
      plannedDate: "",
      duration: "",
      maxParticipants: "",
      cost: "",
      venue: "",
      priority: "medium",
      type: "internal"
    })
  }

  return (
    <PageLayout
      title="Personel Yönetimi"
      description="ISO 17025 uyumlu personel yetkinlik ve eğitim yönetimi"
      className={className}
    >
      <div className="space-y-6">
        <PersonnelHeader
          onNewPersonnel={handleNewPersonnel}
          onNewTraining={() => setIsTrainingDialogOpen(true)}
          selectedCount={selectedPersonnel.length}
          onBulkAction={handleBulkAction}
        />

        <PersonnelStatsEnhanced
          totalPersonnel={allPersonnel.length}
          activePersonnel={allPersonnel.filter(p => p.status === "active").length}
          inTraining={allPersonnel.filter(p => p.status === "training").length}
          averageCompetency={allPersonnel.reduce((acc, p) => acc + p.competencyLevel, 0) / allPersonnel.length || 0}
          totalTrainingPlans={allTrainingPlans.length}
          ongoingTraining={allTrainingPlans.filter(t => t.status === "ongoing").length}
          completedTraining={allTrainingPlans.filter(t => t.status === "completed").length}
          averageTrainingProgress={allPersonnel.reduce((acc, p) => acc + p.trainingProgress, 0) / allPersonnel.length || 0}
        />

        <PersonnelFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          departmentFilter={departmentFilter}
          onDepartmentChange={setDepartmentFilter}
          competencyFilter={competencyFilter}
          onCompetencyChange={setCompetencyFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onClearFilters={clearFilters}
        />

        <PersonnelList
          personnel={personnel}
          trainingPlans={trainingPlans}
          viewMode={viewMode}
          selectedItems={selectedPersonnel}
          onSelectionChange={setSelectedPersonnel}
          onEdit={handleEditPersonnel}
          onView={handleViewPersonnel}
        />

        <PersonnelDialogs
          isPersonnelDialogOpen={isPersonnelDialogOpen}
          setIsPersonnelDialogOpen={setIsPersonnelDialogOpen}
          isTrainingDialogOpen={isTrainingDialogOpen}
          setIsTrainingDialogOpen={setIsTrainingDialogOpen}
          personnelFormData={personnelFormData}
          setPersonnelFormData={setPersonnelFormData}
          trainingFormData={trainingFormData}
          setTrainingFormData={setTrainingFormData}
          onPersonnelSubmit={handlePersonnelSubmit}
          onTrainingSubmit={handleTrainingSubmit}
        />
      </div>
    </PageLayout>
  )
}