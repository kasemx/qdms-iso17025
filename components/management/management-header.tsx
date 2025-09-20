"use client"

import { Button } from "@/components/ui/button"
import { RefreshCw, Download, Settings, Plus } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { Building } from "lucide-react"

interface ManagementHeaderProps {
  onRefresh: () => void
  onExport: () => void
  onSettings: () => void
  onNewRecord: () => void
}

export function ManagementHeader({ 
  onRefresh, 
  onExport, 
  onSettings, 
  onNewRecord 
}: ManagementHeaderProps) {
  return (
    <PageHeader
      title="ISO Yönetim Sistemi"
      description="Organizasyon, tarafsızlık, gizlilik ve yönetim gözden geçirme"
      breadcrumb={[
        { title: "ISO Yönetim Sistemi", href: "/iso" },
        { title: "Yönetim ve Organizasyon", icon: Building }
      ]}
      status={{
        label: "Aktif",
        variant: "default"
      }}
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="w-4 h-4 mr-2" />
            Dışa Aktar
          </Button>
          <Button variant="outline" size="sm" onClick={onSettings}>
            <Settings className="w-4 h-4 mr-2" />
            Ayarlar
          </Button>
          <Button size="sm" onClick={onNewRecord}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Kayıt
          </Button>
        </div>
      }
    />
  )
}