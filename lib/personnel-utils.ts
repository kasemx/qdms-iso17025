import { PersonnelCompetency, TrainingPlan } from "@/hooks/use-personnel"

// Yetkinlik seviyesi utils
export const getCompetencyLevelText = (level: number): string => {
  switch (level) {
    case 1:
      return "Başlangıç"
    case 2:
      return "Temel"
    case 3:
      return "Orta"
    case 4:
      return "İleri"
    case 5:
      return "Uzman"
    default:
      return "Belirsiz"
  }
}

export const getCompetencyLevelColor = (level: number): string => {
  switch (level) {
    case 1:
      return "bg-red-100 text-red-800"
    case 2:
      return "bg-orange-100 text-orange-800"
    case 3:
      return "bg-yellow-100 text-yellow-800"
    case 4:
      return "bg-blue-100 text-blue-800"
    case 5:
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Durum utils
export const getStatusText = (status: PersonnelCompetency['status']): string => {
  switch (status) {
    case "active":
      return "Aktif"
    case "inactive":
      return "Pasif"
    case "training":
      return "Eğitimde"
    case "on_leave":
      return "İzinli"
    default:
      return "Belirsiz"
  }
}

export const getStatusColor = (status: PersonnelCompetency['status']): string => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800"
    case "inactive":
      return "bg-gray-100 text-gray-800"
    case "training":
      return "bg-blue-100 text-blue-800"
    case "on_leave":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Training status utils
export const getTrainingStatusText = (status: TrainingPlan['status']): string => {
  switch (status) {
    case "planned":
      return "Planlandı"
    case "ongoing":
      return "Devam Ediyor"
    case "completed":
      return "Tamamlandı"
    case "cancelled":
      return "İptal Edildi"
    case "postponed":
      return "Ertelendi"
    default:
      return "Belirsiz"
  }
}

export const getTrainingStatusColor = (status: TrainingPlan['status']): string => {
  switch (status) {
    case "planned":
      return "bg-blue-100 text-blue-800"
    case "ongoing":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "postponed":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Priority utils
export const getPriorityText = (priority: TrainingPlan['priority']): string => {
  switch (priority) {
    case "low":
      return "Düşük"
    case "medium":
      return "Orta"
    case "high":
      return "Yüksek"
    case "critical":
      return "Kritik"
    default:
      return "Belirsiz"
  }
}

export const getPriorityColor = (priority: TrainingPlan['priority']): string => {
  switch (priority) {
    case "low":
      return "bg-gray-100 text-gray-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "high":
      return "bg-orange-100 text-orange-800"
    case "critical":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Performance utils
export const getPerformanceColor = (score: number): string => {
  if (score >= 4.5) return "text-green-600"
  if (score >= 4.0) return "text-blue-600"
  if (score >= 3.5) return "text-yellow-600"
  if (score >= 3.0) return "text-orange-600"
  return "text-red-600"
}

export const getPerformanceText = (score: number): string => {
  if (score >= 4.5) return "Mükemmel"
  if (score >= 4.0) return "İyi"
  if (score >= 3.5) return "Orta"
  if (score >= 3.0) return "Geliştirilmeli"
  return "Yetersiz"
}

// Progress utils
export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return "bg-green-500"
  if (progress >= 60) return "bg-blue-500"
  if (progress >= 40) return "bg-yellow-500"
  if (progress >= 20) return "bg-orange-500"
  return "bg-red-500"
}

// Date utils
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('tr-TR')
}

export const isDateOverdue = (dateString: string): boolean => {
  return new Date(dateString) < new Date()
}

export const getDaysUntil = (dateString: string): number => {
  const today = new Date()
  const targetDate = new Date(dateString)
  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// Department utils
export const getDepartmentColor = (department: string): string => {
  switch (department.toLowerCase()) {
    case "kalite":
      return "bg-blue-100 text-blue-800"
    case "laboratuvar":
      return "bg-green-100 text-green-800"
    case "teknik":
      return "bg-purple-100 text-purple-800"
    case "ik":
    case "insan kaynakları":
      return "bg-pink-100 text-pink-800"
    case "yönetim":
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Training category utils
export const getCategoryText = (category: TrainingPlan['category']): string => {
  switch (category) {
    case "technical":
      return "Teknik"
    case "compliance":
      return "Uyumluluk"
    case "leadership":
      return "Liderlik"
    case "safety":
      return "Güvenlik"
    case "soft_skills":
      return "Yumuşak Beceriler"
    default:
      return "Diğer"
  }
}

export const getCategoryColor = (category: TrainingPlan['category']): string => {
  switch (category) {
    case "technical":
      return "bg-blue-100 text-blue-800"
    case "compliance":
      return "bg-green-100 text-green-800"
    case "leadership":
      return "bg-purple-100 text-purple-800"
    case "safety":
      return "bg-red-100 text-red-800"
    case "soft_skills":
      return "bg-yellow-100 text-yellow-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

// Validation utils
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+90|0)?[0-9]{10}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Search utils
export const searchPersonnel = (personnel: PersonnelCompetency[], searchTerm: string): PersonnelCompetency[] => {
  if (!searchTerm) return personnel
  
  const term = searchTerm.toLowerCase()
  return personnel.filter(person => 
    person.name.toLowerCase().includes(term) ||
    person.position.toLowerCase().includes(term) ||
    person.department.toLowerCase().includes(term) ||
    person.email.toLowerCase().includes(term) ||
    person.skills.some(skill => skill.toLowerCase().includes(term)) ||
    person.certifications.some(cert => cert.toLowerCase().includes(term))
  )
}

export const searchTrainingPlans = (plans: TrainingPlan[], searchTerm: string): TrainingPlan[] => {
  if (!searchTerm) return plans
  
  const term = searchTerm.toLowerCase()
  return plans.filter(plan => 
    plan.title.toLowerCase().includes(term) ||
    plan.description.toLowerCase().includes(term) ||
    plan.trainer.toLowerCase().includes(term) ||
    plan.targetAudience.toLowerCase().includes(term) ||
    getCategoryText(plan.category).toLowerCase().includes(term)
  )
}

// Export utils
export const exportPersonnelToCSV = (personnel: PersonnelCompetency[]): string => {
  const headers = [
    'Ad Soyad',
    'Pozisyon',
    'Departman',
    'E-posta',
    'Telefon',
    'İşe Başlama',
    'Yetkinlik Seviyesi',
    'Durum',
    'Genel Performans',
    'Eğitim İlerlemesi'
  ]
  
  const rows = personnel.map(person => [
    person.name,
    person.position,
    person.department,
    person.email,
    person.phoneNumber || '',
    formatDate(person.hireDate),
    getCompetencyLevelText(person.competencyLevel),
    getStatusText(person.status),
    person.performance.overall.toString(),
    `${person.trainingProgress}%`
  ])
  
  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')
}

export const exportTrainingPlansToCSV = (plans: TrainingPlan[]): string => {
  const headers = [
    'Eğitim Adı',
    'Kategori',
    'Eğitmen',
    'Planlanan Tarih',
    'Süre',
    'Durum',
    'Öncelik',
    'Katılımcı Sayısı',
    'Maksimum Katılımcı',
    'Bütçe',
    'Mekan'
  ]
  
  const rows = plans.map(plan => [
    plan.title,
    getCategoryText(plan.category),
    plan.trainer,
    formatDate(plan.plannedDate),
    plan.duration,
    getTrainingStatusText(plan.status),
    getPriorityText(plan.priority),
    plan.participants.toString(),
    plan.maxParticipants.toString(),
    `${plan.budget.allocated} TL`,
    plan.venue
  ])
  
  return [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')
}