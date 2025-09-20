import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Eye,
  Edit,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  QrCode,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  Trash2
} from "lucide-react"

interface Equipment {
  id: string
  name: string
  model: string
  serialNumber: string
  manufacturer: string
  location: string
  status: string
  lastCalibration: string
  nextCalibration: string
  calibrationInterval: string
  responsible: string
  category: string
  purchaseDate?: string
  maintenanceHistory: MaintenanceRecord[]
  utilizationRate: number
  lastMaintenanceDate: string
  nextMaintenanceDate: string
  maintenanceStatus: 'current' | 'due' | 'overdue'
  costCenter: string
  assetValue: number
  depreciation: number
  warrantyCoverage: {
    isActive: boolean
    expiryDate: string
    provider: string
  }
  performanceMetrics: {
    uptime: number
    reliability: number
    efficiency: number
  }
  compliance: {
    iso17025: boolean
    gmp: boolean
    fda: boolean
    lastAuditDate: string
  }
}

interface MaintenanceRecord {
  id: string
  equipmentId: string
  maintenanceDate: string
  maintenanceType: 'preventive' | 'corrective' | 'calibration' | 'validation'
  description: string
  performedBy: string
  duration: number
  cost: number
  partsReplaced: string[]
  nextMaintenanceDate: string
  status: 'completed' | 'in_progress' | 'scheduled' | 'cancelled'
  notes: string
}

type SortField = 'name' | 'status' | 'nextCalibration' | 'nextMaintenance' | 'utilizationRate' | 'location'
type SortDirection = 'asc' | 'desc'

interface EquipmentListProps {
  equipment: Equipment[]
  selectedEquipment: string[]
  sortField: SortField
  sortDirection: SortDirection
  onSort: (field: SortField) => void
  onSelectEquipment: (equipmentId: string, checked: boolean) => void
  onSelectAll: (checked: boolean) => void
  onViewDetails: (equipment: Equipment) => void
  onEdit: (equipment: Equipment) => void
  onDelete: (equipment: Equipment) => void
  onScheduleCalibration: (equipment: Equipment) => void
  onScheduleMaintenance: (equipment: Equipment) => void
  onGenerateQR: (equipment: Equipment) => void
  hasPermission: (permission: string) => boolean
}

export function EquipmentList({
  equipment,
  selectedEquipment,
  sortField,
  sortDirection,
  onSort,
  onSelectEquipment,
  onSelectAll,
  onViewDetails,
  onEdit,
  onDelete,
  onScheduleCalibration,
  onScheduleMaintenance,
  onGenerateQR,
  hasPermission
}: EquipmentListProps) {
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: "default", text: "Aktif", className: "bg-green-100 text-green-800" },
      inactive: { variant: "secondary", text: "Pasif", className: "bg-gray-100 text-gray-800" },
      maintenance: { variant: "destructive", text: "Bakımda", className: "bg-orange-100 text-orange-800" },
      calibration: { variant: "outline", text: "Kalibrasyonda", className: "bg-blue-100 text-blue-800" },
      out_of_service: { variant: "destructive", text: "Hizmet Dışı", className: "bg-red-100 text-red-800" },
      calibration_due: { variant: "destructive", text: "Kalibrasyon Gerekli", className: "bg-yellow-100 text-yellow-800" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return (
      <Badge className={config.className}>
        {config.text}
      </Badge>
    )
  }

  const getMaintenanceStatusIcon = (status: 'current' | 'due' | 'overdue') => {
    switch (status) {
      case 'current':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'due':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case 'overdue':
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getDaysUntilCalibration = (nextCalibration: string) => {
    const today = new Date()
    const nextDate = new Date(nextCalibration)
    const diffTime = nextDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null
    return sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
  }

  const canWrite = hasPermission("write")
  const canDelete = hasPermission("delete")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Ekipman Envanteri</CardTitle>
          <div className="text-sm text-muted-foreground">
            {equipment.length} ekipman, {selectedEquipment.length} seçili
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedEquipment.length === equipment.length && equipment.length > 0}
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                  />
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSort('name')}
                >
                  <div className="flex items-center gap-2">
                    Ekipman Adı
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead>Model / Seri No</TableHead>
                <TableHead>Konum</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Durum
                    {getSortIcon('status')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSort('nextCalibration')}
                >
                  <div className="flex items-center gap-2">
                    Sonraki Kalibrasyon
                    {getSortIcon('nextCalibration')}
                  </div>
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => onSort('utilizationRate')}
                >
                  <div className="flex items-center gap-2">
                    Kullanım Oranı
                    {getSortIcon('utilizationRate')}
                  </div>
                </TableHead>
                <TableHead>Bakım Durumu</TableHead>
                <TableHead className="w-12">İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {equipment.map((item) => {
                const daysUntilCalibration = getDaysUntilCalibration(item.nextCalibration)
                const isCalibrationDue = daysUntilCalibration <= 30
                
                return (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedEquipment.includes(item.id)}
                        onCheckedChange={(checked) => onSelectEquipment(item.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.manufacturer}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.model}</div>
                        <div className="text-sm text-muted-foreground">{item.serialNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`text-sm ${isCalibrationDue ? 'text-red-600 font-medium' : ''}`}>
                          {formatDate(item.nextCalibration)}
                        </div>
                        {isCalibrationDue && (
                          <div className="text-xs text-red-600">
                            {daysUntilCalibration > 0 ? `${daysUntilCalibration} gün` : 'Gecikmiş'}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <Progress value={item.utilizationRate} className="h-2 w-16" />
                        <div className="text-xs text-muted-foreground">
                          {item.utilizationRate}%
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMaintenanceStatusIcon(item.maintenanceStatus)}
                        <span className="text-xs">
                          {item.maintenanceStatus === 'current' && 'Güncel'}
                          {item.maintenanceStatus === 'due' && 'Gerekli'}
                          {item.maintenanceStatus === 'overdue' && 'Gecikmiş'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>İşlemler</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => onViewDetails(item)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Detayları Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onGenerateQR(item)}>
                            <QrCode className="mr-2 h-4 w-4" />
                            QR Kod Oluştur
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {canWrite && (
                            <>
                              <DropdownMenuItem onClick={() => onEdit(item)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onScheduleCalibration(item)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Kalibrasyon Planla
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onScheduleMaintenance(item)}>
                                <Wrench className="mr-2 h-4 w-4" />
                                Bakım Planla
                              </DropdownMenuItem>
                            </>
                          )}
                          {canDelete && (
                            <>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => onDelete(item)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                              </DropdownMenuItem>
                            </>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        
        {equipment.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Henüz ekipman bulunmuyor.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}