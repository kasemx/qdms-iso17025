import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Download, 
  Upload, 
  Settings, 
  QrCode,
  Bell,
  Activity,
  Calendar,
  RefreshCw
} from "lucide-react"

interface User {
  id: string
  name: string
  role: string
  permissions: string[]
}

interface EquipmentHeaderProps {
  selectedEquipment: string[]
  onNewEquipment: () => void
  onBulkCalibration: () => void
  onBulkMaintenance: () => void
  onBulkDelete: () => void
  onExport: () => void
  onImport: () => void
  onQRGenerate: () => void
  onRefreshData: () => void
  hasPermission: (permission: string) => boolean
  isRealTimeEnabled: boolean
  onRealTimeToggle: (enabled: boolean) => void
}

export function EquipmentHeader({
  selectedEquipment,
  onNewEquipment,
  onBulkCalibration,
  onBulkMaintenance,
  onBulkDelete,
  onExport,
  onImport,
  onQRGenerate,
  onRefreshData,
  hasPermission,
  isRealTimeEnabled,
  onRealTimeToggle
}: EquipmentHeaderProps) {
  const canWrite = hasPermission("write")
  const canDelete = hasPermission("delete")
  const canExport = hasPermission("export") || hasPermission("read")

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Ekipman Yönetimi</h1>
        <p className="text-muted-foreground">
          ISO 17025 uyumlu ekipman envanteri ve kalibrasyon takibi
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Real-time monitoring toggle */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onRealTimeToggle(!isRealTimeEnabled)}
          className={isRealTimeEnabled ? "bg-green-100 text-green-800" : ""}
        >
          <Activity className="h-4 w-4 mr-2" />
          {isRealTimeEnabled ? "Gerçek Zamanlı Açık" : "Gerçek Zamanlı Kapalı"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={onRefreshData}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenile
        </Button>
        
        {/* Bulk action buttons */}
        {selectedEquipment.length > 0 && (
          <div className="flex gap-2">
            <Badge variant="secondary" className="px-3 py-1">
              {selectedEquipment.length} seçili
            </Badge>
            
            {canWrite && (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBulkCalibration}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Kalibrasyon Planla
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onBulkMaintenance}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Bakım Planla
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onQRGenerate}
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  QR Kod Oluştur
                </Button>
              </>
            )}
            
            {canDelete && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={onBulkDelete}
              >
                Seçilenleri Sil ({selectedEquipment.length})
              </Button>
            )}
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex gap-2">
          {canExport && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={onExport}
            >
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
          )}
          
          {canWrite && (
            <>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onImport}
              >
                <Upload className="h-4 w-4 mr-2" />
                İçe Aktar
              </Button>
              
              <Button 
                size="sm" 
                onClick={onNewEquipment}
              >
                <Plus className="h-4 w-4 mr-2" />
                Yeni Ekipman
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}