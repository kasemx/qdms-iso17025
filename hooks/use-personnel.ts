"use client"

import { useState, useMemo } from "react"

export interface PersonnelCompetency {
  id: number
  name: string
  position: string
  department: string
  email: string
  phoneNumber?: string
  hireDate: string
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
  status: "active" | "inactive" | "training" | "on_leave"
  supervisor?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  salary?: {
    base: number
    bonuses: number
    lastReview: string
  }
}

export interface TrainingPlan {
  id: number
  title: string
  description: string
  category: "technical" | "compliance" | "leadership" | "safety" | "soft_skills"
  trainer: string
  plannedDate: string
  duration: string
  targetAudience: string
  participants: number
  maxParticipants: number
  status: "planned" | "ongoing" | "completed" | "cancelled" | "postponed"
  priority: "low" | "medium" | "high" | "critical"
  budget: {
    allocated: number
    spent: number
  }
  venue: string
  type: "internal" | "external" | "online" | "hybrid"
  materials?: string[]
  prerequisites?: string[]
  feedback?: {
    rating: number
    comments: string[]
  }
}

const mockPersonnelData: PersonnelCompetency[] = [
  {
    id: 1,
    name: "Ahmet Yılmaz",
    position: "Kalite Uzmanı",
    department: "Kalite",
    email: "ahmet.yilmaz@lab.com",
    phoneNumber: "+90 532 123 4567",
    hireDate: "2020-03-15",
    competencyLevel: 4,
    skills: ["ISO 17025", "Kalibrasyon", "Validasyon", "Risk Yönetimi", "İç Denetim"],
    certifications: ["ISO 17025 Lead Auditor", "Kalite Yönetim Sistemi", "Risk Analizi"],
    trainingProgress: 85,
    lastEvaluation: "2024-01-15",
    nextEvaluation: "2024-07-15",
    performance: {
      overall: 4.2,
      technical: 4.5,
      communication: 4.0,
      leadership: 3.8
    },
    developmentPlan: {
      goals: ["İleri seviye risk analizi", "Takım liderliği becerileri", "Dijital kalite araçları"],
      targetDate: "2024-12-31",
      progress: 65
    },
    status: "active",
    supervisor: "Dr. Zeynep Acar",
    emergencyContact: {
      name: "Emine Yılmaz",
      phone: "+90 532 987 6543",
      relationship: "Eş"
    }
  },
  {
    id: 2,
    name: "Fatma Kaya",
    position: "Laboratuvar Teknisyeni",
    department: "Laboratuvar",
    email: "fatma.kaya@lab.com",
    phoneNumber: "+90 533 234 5678",
    hireDate: "2021-06-01",
    competencyLevel: 3,
    skills: ["Kimyasal Analiz", "Spektrofotometri", "HPLC", "GC-MS", "Örnek Hazırlama"],
    certifications: ["Laboratuvar Güvenliği", "Kimyasal Analiz", "Cihaz Kalibrasyonu"],
    trainingProgress: 70,
    lastEvaluation: "2024-02-01",
    nextEvaluation: "2024-08-01",
    performance: {
      overall: 3.8,
      technical: 4.2,
      communication: 3.5,
      leadership: 3.0
    },
    developmentPlan: {
      goals: ["İleri kromatografi teknikleri", "Metot geliştirme", "Kalite kontrol"],
      targetDate: "2024-11-30",
      progress: 45
    },
    status: "training",
    supervisor: "Mehmet Demir"
  },
  {
    id: 3,
    name: "Mehmet Demir",
    position: "Kalibrasyon Uzmanı",
    department: "Teknik",
    email: "mehmet.demir@lab.com",
    phoneNumber: "+90 534 345 6789",
    hireDate: "2019-01-20",
    competencyLevel: 5,
    skills: ["Elektriksel Kalibrasyon", "Mekanik Kalibrasyon", "Termal Analiz", "Belirsizlik Hesabı", "Metroloji"],
    certifications: ["Kalibrasyon Uzmanı", "Ölçüm Belirsizliği", "ISO 17025", "Metroloji Uzmanı"],
    trainingProgress: 95,
    lastEvaluation: "2024-01-10",
    nextEvaluation: "2024-07-10",
    performance: {
      overall: 4.8,
      technical: 5.0,
      communication: 4.5,
      leadership: 4.8
    },
    developmentPlan: {
      goals: ["Yeni kalibrasyon teknolojileri", "Eğitmen sertifikası", "Ar-Ge projeleri"],
      targetDate: "2024-10-31",
      progress: 80
    },
    status: "active",
    supervisor: "Dr. Ali Veli"
  },
  {
    id: 4,
    name: "Ayşe Özkan",
    position: "İnsan Kaynakları Uzmanı",
    department: "İK",
    email: "ayse.ozkan@lab.com",
    phoneNumber: "+90 535 456 7890",
    hireDate: "2022-09-10",
    competencyLevel: 3,
    skills: ["İK Yönetimi", "Eğitim Planlama", "Performance Değerlendirme", "İş Hukuku"],
    certifications: ["İK Uzmanı", "Eğitim Uzmanı", "İş Sağlığı ve Güvenliği"],
    trainingProgress: 60,
    lastEvaluation: "2024-03-01",
    nextEvaluation: "2024-09-01",
    performance: {
      overall: 4.0,
      technical: 3.8,
      communication: 4.5,
      leadership: 4.2
    },
    developmentPlan: {
      goals: ["Dijital İK araçları", "Çalışan memnuniyeti", "Yetenek yönetimi"],
      targetDate: "2024-12-15",
      progress: 30
    },
    status: "active"
  }
]

const mockTrainingPlans: TrainingPlan[] = [
  {
    id: 1,
    title: "ISO 17025:2017 Temel Eğitimi",
    description: "Laboratuvar yönetim sistemi temelleri ve uygulama prensipleri",
    category: "compliance",
    trainer: "Dr. Ali Veli",
    plannedDate: "2024-04-15",
    duration: "2 gün",
    targetAudience: "Tüm laboratuvar personeli",
    participants: 15,
    maxParticipants: 20,
    status: "planned",
    priority: "high",
    budget: {
      allocated: 25000,
      spent: 12000
    },
    venue: "Eğitim Salonu A",
    type: "internal",
    materials: ["ISO 17025 Standardı", "Uygulama Kılavuzu", "Örnek Prosedürler"],
    prerequisites: ["Temel laboratuvar bilgisi"]
  },
  {
    id: 2,
    title: "İleri Kromatografi Teknikleri",
    description: "HPLC, GC-MS ve LC-MS/MS uygulamaları",
    category: "technical",
    trainer: "Prof. Dr. Zeynep Acar",
    plannedDate: "2024-05-20",
    duration: "3 gün",
    targetAudience: "Analiz uzmanları",
    participants: 8,
    maxParticipants: 12,
    status: "ongoing",
    priority: "medium",
    budget: {
      allocated: 35000,
      spent: 28000
    },
    venue: "Laboratuvar 2",
    type: "external",
    materials: ["Kromatografi kitabı", "Praktik notları"],
    prerequisites: ["Temel kromatografi bilgisi", "En az 1 yıl deneyim"]
  },
  {
    id: 3,
    title: "Liderlik ve İletişim Becerileri",
    description: "Takım liderliği, etkili iletişim ve çatışma yönetimi",
    category: "leadership",
    trainer: "Uzm. Psk. Murat Kaya",
    plannedDate: "2024-06-10",
    duration: "1 gün",
    targetAudience: "Departman yöneticileri ve kıdemli uzmanlar",
    participants: 0,
    maxParticipants: 15,
    status: "planned",
    priority: "medium",
    budget: {
      allocated: 15000,
      spent: 0
    },
    venue: "Online",
    type: "online",
    materials: ["Liderlik kitabı", "Pratik alıştırmalar"]
  }
]

export function usePersonnel() {
  const [personnel, setPersonnel] = useState<PersonnelCompetency[]>(mockPersonnelData)
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>(mockTrainingPlans)
  const [isLoading, setIsLoading] = useState(false)

  // Filtre state'leri
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [competencyFilter, setCompetencyFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [viewMode, setViewMode] = useState("all")

  // Filtrelenmiş personnel listesi
  const filteredPersonnel = useMemo(() => {
    return personnel.filter(person => {
      const matchesSearch = person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           person.department.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = !departmentFilter || person.department === departmentFilter
      
      const matchesCompetency = !competencyFilter || 
        (competencyFilter === "beginner" && person.competencyLevel <= 2) ||
        (competencyFilter === "intermediate" && person.competencyLevel === 3) ||
        (competencyFilter === "advanced" && person.competencyLevel >= 4)
      
      const matchesStatus = !statusFilter || person.status === statusFilter
      
      return matchesSearch && matchesDepartment && matchesCompetency && matchesStatus
    })
  }, [personnel, searchTerm, departmentFilter, competencyFilter, statusFilter])

  // Filtrelenmiş training plans
  const filteredTrainingPlans = useMemo(() => {
    return trainingPlans.filter(plan => {
      const matchesSearch = plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plan.trainer.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesSearch
    })
  }, [trainingPlans, searchTerm])

  // CRUD operasyonları
  const addPersonnel = (newPersonnel: Omit<PersonnelCompetency, 'id'>) => {
    const id = Math.max(...personnel.map(p => p.id)) + 1
    setPersonnel(prev => [...prev, { ...newPersonnel, id }])
  }

  const updatePersonnel = (id: number, updates: Partial<PersonnelCompetency>) => {
    setPersonnel(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deletePersonnel = (id: number) => {
    setPersonnel(prev => prev.filter(p => p.id !== id))
  }

  const addTrainingPlan = (newPlan: Omit<TrainingPlan, 'id'>) => {
    const id = Math.max(...trainingPlans.map(p => p.id)) + 1
    setTrainingPlans(prev => [...prev, { ...newPlan, id }])
  }

  const updateTrainingPlan = (id: number, updates: Partial<TrainingPlan>) => {
    setTrainingPlans(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p))
  }

  const deleteTrainingPlan = (id: number) => {
    setTrainingPlans(prev => prev.filter(p => p.id !== id))
  }

  // Filtreleri temizle
  const clearFilters = () => {
    setSearchTerm("")
    setDepartmentFilter("")
    setCompetencyFilter("")
    setStatusFilter("")
  }

  // İstatistikler
  const stats = useMemo(() => {
    return {
      totalPersonnel: personnel.length,
      activePersonnel: personnel.filter(p => p.status === "active").length,
      inTraining: personnel.filter(p => p.status === "training").length,
      averageCompetency: personnel.reduce((acc, p) => acc + p.competencyLevel, 0) / personnel.length,
      totalTrainingPlans: trainingPlans.length,
      ongoingTraining: trainingPlans.filter(t => t.status === "ongoing").length,
      completedTraining: trainingPlans.filter(t => t.status === "completed").length,
      averageTrainingProgress: personnel.reduce((acc, p) => acc + p.trainingProgress, 0) / personnel.length
    }
  }, [personnel, trainingPlans])

  return {
    // Data
    personnel: filteredPersonnel,
    trainingPlans: filteredTrainingPlans,
    allPersonnel: personnel,
    allTrainingPlans: trainingPlans,
    stats,
    isLoading,

    // Filters
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

    // Actions
    addPersonnel,
    updatePersonnel,
    deletePersonnel,
    addTrainingPlan,
    updateTrainingPlan,
    deleteTrainingPlan
  }
}