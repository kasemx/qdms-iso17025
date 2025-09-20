"use client"

import { StatsGrid, type StatItem } from "@/components/common/stats-grid"
import { Building, Shield, Calendar } from "lucide-react"

interface ManagementStatsProps {
  positionsCount: number
  impartialityRecordsCount: number
  confidentialityAgreementsCount: number
  managementReviewsCount: number
}

export function ManagementStats({
  positionsCount,
  impartialityRecordsCount,
  confidentialityAgreementsCount,
  managementReviewsCount
}: ManagementStatsProps) {
  const stats: StatItem[] = [
    {
      id: "positions",
      title: "Organizasyon Pozisyonları",
      value: positionsCount,
      description: "Tanımlı pozisyon sayısı",
      icon: Building,
      color: "blue"
    },
    {
      id: "impartiality",
      title: "Tarafsızlık Kayıtları",
      value: impartialityRecordsCount,
      description: "Aktif kayıt sayısı",
      icon: Shield,
      color: "green"
    },
    {
      id: "confidentiality",
      title: "Gizlilik Anlaşmaları",
      value: confidentialityAgreementsCount,
      description: "Aktif anlaşma sayısı",
      icon: Shield,
      color: "orange"
    },
    {
      id: "reviews",
      title: "Yönetim Toplantıları",
      value: managementReviewsCount,
      description: "Bu yıl yapılan toplantı",
      icon: Calendar,
      color: "purple"
    }
  ]

  return (
    <StatsGrid
      stats={stats}
      columns={{ default: 1, md: 2, lg: 4 }}
    />
  )
}