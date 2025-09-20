import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  FileText,
  Calendar,
  MoreHorizontal,
  Download,
  Plus
} from "lucide-react"

interface CalibrationRecord {
  id: string
  equipmentId: string
  equipmentName: string
  calibrationDate: string
  calibratedBy: string
  certificateNumber: string
  nextDueDate: string
  status: string
  results: string
  notes: string
  calibrationType: 'internal' | 'external' | 'self'
  uncertainty: string
  traceability: string
  cost: number
  accreditationBody: string
  environmentalConditions: {
    temperature: string
    humidity: string
    pressure: string
  }
}

interface CalibrationRecordsProps {
  calibrationRecords: CalibrationRecord[]
  onViewDetails: (record: CalibrationRecord) => void
  onEdit: (record: CalibrationRecord) => void
  onGenerateReport: (record: CalibrationRecord) => void
  onScheduleNext: (record: CalibrationRecord) => void
  onDownloadCertificate: (record: CalibrationRecord) => void
  onNewCalibration: () => void
  hasPermission: (permission: string) => boolean
}

export function CalibrationRecords({
  calibrationRecords,
  onViewDetails,
  onEdit,
  onGenerateReport,
  onScheduleNext,
  onDownloadCertificate,
  onNewCalibration,
  hasPermission
}: CalibrationRecordsProps) {
  
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      valid: { text: "Geçerli", className: "bg-green-100 text-green-800" },
      expired: { text: "Süresi Dolmuş", className: "bg-red-100 text-red-800" },
      pending: { text: "Beklemede", className: "bg-yellow-100 text-yellow-800" },
      scheduled: { text: "Planlandı", className: "bg-blue-100 text-blue-800" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || { text: status, className: "bg-gray-100 text-gray-800" }
    return (
      <Badge className={config.className}>
        {config.text}
      </Badge>
    )
  }

  const getCalibrationTypeBadge = (type: 'internal' | 'external' | 'self') => {
    const typeConfig = {
      internal: { text: "İç Kalibrasyon", className: "bg-blue-100 text-blue-800" },
      external: { text: "Dış Kalibrasyon", className: "bg-purple-100 text-purple-800" },
      self: { text: "Öz Kalibrasyon", className: "bg-orange-100 text-orange-800" }
    }
    
    const config = typeConfig[type]
    return (
      <Badge className={config.className}>
        {config.text}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  const getDaysUntilDue = (nextDueDate: string) => {
    const today = new Date()
    const dueDate = new Date(nextDueDate)
    const diffTime = dueDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const canWrite = hasPermission("write")

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Kalibrasyon Kayıtları</CardTitle>
          {canWrite && (
            <Button onClick={onNewCalibration}>
              <Plus className="h-4 w-4 mr-2" />
              Yeni Kalibrasyon
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ekipman</TableHead>
                <TableHead>Kalibrasyon Tarihi</TableHead>
                <TableHead>Kalibre Eden</TableHead>
                <TableHead>Tip</TableHead>
                <TableHead>Sertifika No</TableHead>
                <TableHead>Sonraki Vade</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Maliyet</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {calibrationRecords.map((record) => {
                const daysUntilDue = getDaysUntilDue(record.nextDueDate)
                const isDueSoon = daysUntilDue <= 30
                
                return (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.equipmentName}</div>
                        <div className="text-sm text-muted-foreground">ID: {record.equipmentId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(record.calibrationDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{record.calibratedBy}</div>
                        {record.accreditationBody && (
                          <div className="text-xs text-muted-foreground">{record.accreditationBody}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCalibrationTypeBadge(record.calibrationType)}
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">{record.certificateNumber}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className={`text-sm ${isDueSoon ? 'text-red-600 font-medium' : ''}`}>
                          {formatDate(record.nextDueDate)}
                        </div>
                        {isDueSoon && (
                          <div className="text-xs text-red-600">
                            {daysUntilDue > 0 ? `${daysUntilDue} gün kaldı` : 'Vadesi geçmiş'}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(record.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">
                        {formatCurrency(record.cost)}
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
                          <DropdownMenuItem onClick={() => onViewDetails(record)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Detayları Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDownloadCertificate(record)}>
                            <Download className="mr-2 h-4 w-4" />
                            Sertifika İndir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onGenerateReport(record)}>
                            <FileText className="mr-2 h-4 w-4" />
                            Rapor Oluştur
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {canWrite && (
                            <>
                              <DropdownMenuItem onClick={() => onEdit(record)}>
                                <Edit className="mr-2 h-4 w-4" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => onScheduleNext(record)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                Sonraki Kalibrasyonu Planla
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
        
        {calibrationRecords.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Henüz kalibrasyon kaydı bulunmuyor.</p>
            {canWrite && (
              <Button onClick={onNewCalibration} className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                İlk Kalibrasyonu Ekle
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}