"use client"

import { Button } from "@/components/ui/button"
import {
  BarChart3,
  Download,
  Plus,
  Upload,
  Zap
} from "lucide-react"

interface CalibrationHeaderProps {
  onNewProgram: () => void
  onWorkflowSetup: () => void
  onAnalyticsReport: () => void
  onDownloadReport: () => void
  onImportProgram: () => void
}

export function CalibrationHeader({
  onNewProgram,
  onWorkflowSetup,
  onAnalyticsReport,
  onDownloadReport,
  onImportProgram
}: CalibrationHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Kalibrasyon Programı</h1>
        <p className="text-muted-foreground">Ekipman kalibrasyon planlaması ve takibi</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onWorkflowSetup}
        >
          <Zap className="h-4 w-4 mr-2" />
          İş Akışı Kurulumu
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onAnalyticsReport}
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Analitik Rapor
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onDownloadReport}
        >
          <Download className="h-4 w-4 mr-2" />
          Rapor İndir
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={onImportProgram}
        >
          <Upload className="h-4 w-4 mr-2" />
          Program İçe Aktar
        </Button>
        <Button 
          size="sm"
          onClick={onNewProgram}
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Program
        </Button>
      </div>
    </div>
  )
}