"use client"

import { StatsGrid, type StatItem } from "@/components/common/stats-grid"
import { Users, CheckCircle2, TrendingUp, Activity } from "lucide-react"

interface UserStats {
  totalUsers: number
  activeUsers: number
  inactiveUsers: number
  pendingUsers: number
  adminUsers: number
  averageProductivity: number
  loginRate: number
  userGrowth: number
}

interface UsersStatsProps {
  stats: UserStats
  isLoading?: boolean
}

export function UsersStats({ stats, isLoading = false }: UsersStatsProps) {
  const statsData: StatItem[] = [
    {
      id: "total-users",
      title: "Toplam Kullanıcı",
      value: stats.totalUsers,
      description: "Bu ay",
      icon: Users,
      color: "blue",
      trend: {
        value: stats.userGrowth,
        label: "Bu ay",
        direction: stats.userGrowth > 0 ? 'up' : stats.userGrowth < 0 ? 'down' : 'neutral'
      }
    },
    {
      id: "active-users",
      title: "Aktif Kullanıcı",
      value: stats.activeUsers,
      description: `%${Math.round((stats.activeUsers / stats.totalUsers) * 100)} aktif oran`,
      icon: CheckCircle2,
      color: "green"
    },
    {
      id: "productivity",
      title: "Ortalama Verimlilik",
      value: `${stats.averageProductivity}%`,
      description: "Performans skoru",
      icon: TrendingUp,
      color: "purple"
    },
    {
      id: "login-rate",
      title: "Giriş Oranı",
      value: `${stats.loginRate}%`,
      description: `${Math.round((stats.loginRate / 100) * stats.totalUsers)} bugün`,
      icon: Activity,
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