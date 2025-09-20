"use client"

import { Button } from "@/components/ui/button"
import { Download, Trash2, Plus } from "lucide-react"

interface DepartmentsHeaderProps {
  selectedCount: number
  onExport: () => void
  onBulkDelete: () => void
  onAddDepartment: () => void
}

export function DepartmentsHeader({
  selectedCount,
  onExport,
  onBulkDelete,
  onAddDepartment
}: DepartmentsHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Departman Yönetimi</h1>
        <p className="text-muted-foreground">Şirket departmanlarını yönetin ve analiz edin</p>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={onExport}>
          <Download className="mr-2 h-4 w-4" />
          Dışa Aktar
        </Button>
        {selectedCount > 0 && (
          <Button variant="destructive" onClick={onBulkDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Seçilenleri Sil ({selectedCount})
          </Button>
        )}
        <Button onClick={onAddDepartment} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Departman
        </Button>
      </div>
    </div>
  )
}