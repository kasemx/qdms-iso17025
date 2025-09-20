"use client"

import { StatsGrid, type StatItem } from "@/components/common/stats-grid"
import { Building, Users, TrendingUp, Shield } from "lucide-react"

interface DepartmentStats {
  totalDepartments: number
  activeDepartments: number
  inactiveDepartments: number
  totalUsers: number
  totalBudget: number
  averageEfficiency: number
  complianceRate: number
  departmentGrowth: number
}

interface DepartmentsStatsProps {
  stats: DepartmentStats
  isLoading?: boolean
}

export function DepartmentsStats({ stats, isLoading }: DepartmentsStatsProps) {
  const averagePersonnel = Math.round(stats.totalUsers / stats.totalDepartments)

  const statsData: StatItem[] = [
    {
      id: "total-departments",
      title: "Toplam Departman",
      value: stats.totalDepartments,
      description: "Bu yıl",
      icon: Building,
      color: "blue",
      trend: {
        value: stats.departmentGrowth,
        label: "Bu yıl",
        direction: stats.departmentGrowth > 0 ? 'up' : stats.departmentGrowth < 0 ? 'down' : 'neutral'
      }
    },
    {
      id: "total-personnel",
      title: "Toplam Personel",
      value: stats.totalUsers,
      description: `Ortalama ${averagePersonnel}`,
      icon: Users,
      color: "green"
    },
    {
      id: "average-efficiency",
      title: "Ortalama Verimlilik",
      value: `${stats.averageEfficiency}%`,
      description: "Performans skoru",
      icon: TrendingUp,
      color: "purple"
    },
    {
      id: "compliance-rate",
      title: "Uyumluluk Oranı",
      value: `${stats.complianceRate}%`,
      description: "ISO 17025 uyumluluk",
      icon: Shield,
      color: "amber"
    }
  ]

  return (
    <StatsGrid
      stats={statsData}
      loading={isLoading}
      columns={{ default: 1, md: 2, lg: 4 }}
    />
  )
}