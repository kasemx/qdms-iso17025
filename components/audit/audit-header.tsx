"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface AuditHeaderProps {
  onGenerateReport: () => void | Promise<void>
  exportLoading?: boolean
  totalEntries?: number
  filteredEntries?: number
}

export function AuditHeader({ 
  onGenerateReport, 
  exportLoading = false,
  totalEntries = 0,
  filteredEntries = 0 
}: AuditHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-balance">Audit Trail</h1>
        <p className="text-muted-foreground">
          Sistem aktivitelerini izleyin ve denetleyin
          {totalEntries > 0 && (
            <span className="ml-2 text-sm">
              ({filteredEntries}/{totalEntries} kayıt gösteriliyor)
            </span>
          )}
        </p>
      </div>
      <Button 
        variant="outline" 
        onClick={onGenerateReport}
        disabled={exportLoading}
      >
        <Calendar className="mr-2 h-4 w-4" />
        {exportLoading ? "Oluşturuluyor..." : "Rapor Oluştur"}
      </Button>
    </div>
  )
}