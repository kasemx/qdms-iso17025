"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Settings, Bell, BarChart3 } from "lucide-react"

interface DashboardHeaderProps {
  onRefresh: () => void
  onDownloadReport: () => void
  notifications: number
}

export function DashboardHeader({ onRefresh, onDownloadReport, notifications }: DashboardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          ISO 17025 Kalite Doküman Yönetim Sistemi - Kapsamlı Analitik Görünüm
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onRefresh}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Yenile
        </Button>
        <Button variant="outline" size="sm">
          <BarChart3 className="w-4 h-4 mr-2" />
          Canlı Analitik
        </Button>
        <Button variant="outline" size="sm" className="relative">
          <Bell className="w-4 h-4 mr-2" />
          Bildirimler
          {notifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1 min-w-[16px] h-4 flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Button>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Ayarlar
        </Button>
        <Button variant="outline" size="sm" onClick={onDownloadReport}>
          <Download className="w-4 h-4 mr-2" />
          Rapor İndir
        </Button>
      </div>
    </div>
  )
}