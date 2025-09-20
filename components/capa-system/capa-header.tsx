"use client"

import { Button } from "@/components/ui/button"
import { Download, Plus } from "lucide-react"

interface CAPAHeaderProps {
  onNewCAPA: () => void
  onDownloadReport: () => void
}

export function CAPAHeader({ onNewCAPA, onDownloadReport }: CAPAHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">CAPA Sistemi</h1>
        <p className="text-muted-foreground">ISO 17025 uyumlu düzeltici ve önleyici aksiyon yönetimi</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onDownloadReport}>
          <Download className="w-4 h-4 mr-2" />
          Rapor İndir
        </Button>
        <Button onClick={onNewCAPA}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni CAPA
        </Button>
      </div>
    </div>
  )
}