"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Award, TrendingUp, Calendar } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface PersonnelStatsProps {
  loading?: boolean
}

export function PersonnelStats({ loading }: PersonnelStatsProps) {
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const stats = [
    {
      title: "Toplam Personel",
      value: "247",
      description: "+12% geçen aya göre",
      icon: Users,
      color: "text-blue-600",
      progress: 85
    },
    {
      title: "Ortalama Yetkinlik",
      value: "4.2/5",
      description: "+0.3 geçen döneme göre",
      icon: Award,
      color: "text-green-600",
      progress: 84
    },
    {
      title: "Tamamlanan Eğitimler",
      value: "156",
      description: "Bu ay %25 artış",
      icon: TrendingUp,
      color: "text-orange-600",
      progress: 78
    },
    {
      title: "Planlanan Eğitimler",
      value: "32",
      description: "Gelecek 30 gün",
      icon: Calendar,
      color: "text-purple-600",
      progress: 65
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
              <div className="mt-3">
                <Progress value={stat.progress} className="h-1" />
              </div>
            </CardContent>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
          </Card>
        )
      })}
    </div>
  )
}