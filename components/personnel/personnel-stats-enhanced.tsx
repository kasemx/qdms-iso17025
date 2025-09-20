"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  Award, 
  TrendingUp, 
  Calendar, 
  Target, 
  BookOpen,
  CheckCircle,
  AlertTriangle
} from "lucide-react"

interface PersonnelStatsEnhancedProps {
  totalPersonnel?: number
  activePersonnel?: number
  inTraining?: number
  averageCompetency?: number
  totalTrainingPlans?: number
  ongoingTraining?: number
  completedTraining?: number
  averageTrainingProgress?: number
  loading?: boolean
}

export function PersonnelStatsEnhanced({
  totalPersonnel = 0,
  activePersonnel = 0,
  inTraining = 0,
  averageCompetency = 0,
  totalTrainingPlans = 0,
  ongoingTraining = 0,
  completedTraining = 0,
  averageTrainingProgress = 0,
  loading = false
}: PersonnelStatsEnhancedProps) {

  const getCompetencyLevel = (level: number) => {
    if (level >= 4.5) return { text: "Mükemmel", color: "text-green-600" }
    if (level >= 4.0) return { text: "İyi", color: "text-blue-600" }
    if (level >= 3.5) return { text: "Orta", color: "text-yellow-600" }
    if (level >= 3.0) return { text: "Geliştirilmeli", color: "text-orange-600" }
    return { text: "Yetersiz", color: "text-red-600" }
  }

  const competencyInfo = getCompetencyLevel(averageCompetency)

  const stats = [
    {
      title: "Toplam Personel",
      value: totalPersonnel.toString(),
      description: `${activePersonnel} aktif, ${totalPersonnel - activePersonnel} pasif`,
      icon: Users,
      color: "text-blue-600",
      progress: totalPersonnel > 0 ? (activePersonnel / totalPersonnel) * 100 : 0,
      trend: "+12% geçen aya göre",
      badges: [
        { label: "Aktif", value: activePersonnel, variant: "default" as const },
        { label: "Eğitimde", value: inTraining, variant: "secondary" as const }
      ]
    },
    {
      title: "Ortalama Yetkinlik",
      value: `${averageCompetency.toFixed(1)}/5`,
      description: competencyInfo.text,
      icon: Award,
      color: competencyInfo.color,
      progress: (averageCompetency / 5) * 100,
      trend: "+0.3 geçen döneme göre",
      badges: [
        { label: competencyInfo.text, value: "", variant: "outline" as const }
      ]
    },
    {
      title: "Eğitim İlerlemesi",
      value: `${averageTrainingProgress.toFixed(0)}%`,
      description: `Ortalama tamamlanma oranı`,
      icon: TrendingUp,
      color: averageTrainingProgress >= 80 ? "text-green-600" : 
             averageTrainingProgress >= 60 ? "text-blue-600" :
             averageTrainingProgress >= 40 ? "text-yellow-600" : "text-red-600",
      progress: averageTrainingProgress,
      trend: "Bu ay %25 artış",
      badges: [
        { label: "Tamamlanan", value: completedTraining, variant: "default" as const }
      ]
    },
    {
      title: "Eğitim Planları",
      value: totalTrainingPlans.toString(),
      description: `${ongoingTraining} devam ediyor`,
      icon: Calendar,
      color: "text-purple-600",
      progress: totalTrainingPlans > 0 ? (completedTraining / totalTrainingPlans) * 100 : 0,
      trend: "Gelecek 30 gün",
      badges: [
        { label: "Devam Eden", value: ongoingTraining, variant: "secondary" as const },
        { label: "Tamamlanan", value: completedTraining, variant: "default" as const }
      ]
    }
  ]

  // Ek istatistikler
  const additionalStats = [
    {
      icon: Target,
      title: "Hedef Tamamlama",
      value: `${Math.round((completedTraining / Math.max(totalTrainingPlans, 1)) * 100)}%`,
      color: "text-green-600"
    },
    {
      icon: BookOpen,
      title: "Aktif Sertifikalar",
      value: "89",
      color: "text-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Başarı Oranı",
      value: "94%",
      color: "text-green-600"
    },
    {
      icon: AlertTriangle,
      title: "Kritik Durumlar",
      value: "3",
      color: "text-red-600"
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-1 w-full bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Ana İstatistikler */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs mt-1 ${stat.color}`}>
                  {stat.description}
                </p>
                
                {/* Badges */}
                <div className="flex gap-2 mt-2 mb-3">
                  {stat.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex} variant={badge.variant} className="text-xs">
                      {badge.label} {badge.value && badge.value}
                    </Badge>
                  ))}
                </div>
                
                {/* Progress */}
                <div className="space-y-1">
                  <Progress value={stat.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {stat.trend}
                  </p>
                </div>
              </CardContent>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </Card>
          )
        })}
      </div>

      {/* Ek İstatistikler */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detaylı İstatistikler</CardTitle>
          <CardDescription>
            Personel yönetimi ana performans göstergeleri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {additionalStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                  <div>
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Yetkinlik Dağılımı */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Yetkinlik Seviye Dağılımı</CardTitle>
          <CardDescription>
            Personel yetkinlik seviyelerinin genel dağılımı
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            {[
              { level: "Uzman (5)", count: Math.round(totalPersonnel * 0.15), color: "bg-green-500" },
              { level: "İleri (4)", count: Math.round(totalPersonnel * 0.25), color: "bg-blue-500" },
              { level: "Orta (3)", count: Math.round(totalPersonnel * 0.35), color: "bg-yellow-500" },
              { level: "Temel (2)", count: Math.round(totalPersonnel * 0.20), color: "bg-orange-500" },
              { level: "Başlangıç (1)", count: Math.round(totalPersonnel * 0.05), color: "bg-red-500" }
            ].map((item, index) => (
              <div key={index} className="text-center space-y-2">
                <div className={`h-20 ${item.color} rounded-lg flex items-end justify-center text-white font-bold text-lg`}>
                  {item.count}
                </div>
                <p className="text-sm font-medium">{item.level}</p>
                <p className="text-xs text-muted-foreground">
                  {totalPersonnel > 0 ? Math.round((item.count / totalPersonnel) * 100) : 0}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}