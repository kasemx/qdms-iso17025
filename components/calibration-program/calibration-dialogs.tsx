"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Calendar,
  CheckCircle,
  Download,
  Edit,
  Zap
} from "lucide-react"
import { toast } from "sonner"

interface CalibrationProgram {
  id: string
  equipmentId: string
  equipmentName: string
  equipmentCode: string
  calibrationType: string
  frequency: string
  lastCalibration: string
  nextCalibration: string
  status: string
  responsible: string
  supplier: string
  cost: number
  priority: string
  notes: string
  automationEnabled: boolean
  complianceStandards: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  workflowStage: 'planning' | 'approval' | 'execution' | 'verification' | 'complete'
  approvalChain: {
    requiredBy: string
    approvedBy?: string
    approvedDate?: string
    status: 'pending' | 'approved' | 'rejected'
  }[]
  dependencies: string[]
  estimatedDuration: number
  actualDuration?: number
  qualityChecks: {
    preCalibration: boolean
    postCalibration: boolean
    documentation: boolean
    traceability: boolean
  }
  environmentalRequirements: {
    temperature: string
    humidity: string
    vibration: string
    cleanliness: string
  }
  competencyRequirements: string[]
  documentLinks: string[]
  lastModified: string
  modifiedBy: string
}

interface CalibrationDialogsProps {
  // Detail Dialog
  isDetailDialogOpen: boolean
  setIsDetailDialogOpen: (open: boolean) => void
  selectedProgram: CalibrationProgram | null
  
  // Bulk Action Dialog
  bulkActionDialogOpen: boolean
  setBulkActionDialogOpen: (open: boolean) => void
  selectedPrograms: string[]
  setSelectedPrograms: (programs: string[]) => void
  onBulkAction: (action: string) => void
  
  // Workflow Dialog
  workflowDialogOpen: boolean
  setWorkflowDialogOpen: (open: boolean) => void
}

export function CalibrationDialogs({
  isDetailDialogOpen,
  setIsDetailDialogOpen,
  selectedProgram,
  bulkActionDialogOpen,
  setBulkActionDialogOpen,
  selectedPrograms,
  setSelectedPrograms,
  onBulkAction,
  workflowDialogOpen,
  setWorkflowDialogOpen
}: CalibrationDialogsProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  const getDaysUntilCalibration = (dateString: string) => {
    const today = new Date()
    const calibrationDate = new Date(dateString)
    const diffTime = calibrationDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCalibrationProgress = (lastCalibration: string, nextCalibration: string) => {
    const today = new Date()
    const last = new Date(lastCalibration)
    const next = new Date(nextCalibration)
    const totalDays = (next.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    const passedDays = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100))
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "overdue":
        return "Süresi Geçti"
      case "scheduled":
        return "Planlandı"
      case "in_progress":
        return "Devam Ediyor"
      default:
        return status
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "critical":
        return "Kritik"
      case "high":
        return "Yüksek"
      case "medium":
        return "Orta"
      case "low":
        return "Düşük"
      default:
        return priority
    }
  }

  const handleBulkAction = async (action: string) => {
    if (selectedPrograms.length === 0) {
      toast.error("Lütfen en az bir program seçin")
      return
    }

    try {
      switch (action) {
        case 'schedule':
          toast.success(`${selectedPrograms.length} program için kalibrasyon planlandı`)
          break
        case 'approve':
          toast.success(`${selectedPrograms.length} program onaylandı`)
          break
        case 'export':
          toast.success(`${selectedPrograms.length} program raporu dışa aktarıldı`)
          break
        case 'automate':
          toast.success(`${selectedPrograms.length} program için otomasyon aktifleştirildi`)
          break
        default:
          break
      }
      setSelectedPrograms([])
      setBulkActionDialogOpen(false)
      onBulkAction(action)
    } catch (error) {
      toast.error("İşlem gerçekleştirilirken hata oluştu")
    }
  }

  return (
    <>
      {/* Kalibrasyon Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProgram?.equipmentName}
            </DialogTitle>
            <DialogDescription>
              {selectedProgram?.equipmentCode} - {selectedProgram?.calibrationType}
            </DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Ekipman Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ekipman Adı:</strong> {selectedProgram.equipmentName}</div>
                    <div><strong>Ekipman Kodu:</strong> {selectedProgram.equipmentCode}</div>
                    <div><strong>Kalibrasyon Türü:</strong> {selectedProgram.calibrationType}</div>
                    <div><strong>Sıklık:</strong> {selectedProgram.frequency}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kalibrasyon Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Son Kalibrasyon:</strong> {formatDate(selectedProgram.lastCalibration)}</div>
                    <div><strong>Sonraki Kalibrasyon:</strong> {formatDate(selectedProgram.nextCalibration)}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedProgram.status)}</div>
                    <div><strong>Öncelik:</strong> {getPriorityText(selectedProgram.priority)}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Sorumluluk Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Sorumlu:</strong> {selectedProgram.responsible}</div>
                    <div><strong>Tedarikçi:</strong> {selectedProgram.supplier}</div>
                    <div><strong>Maliyet:</strong> {formatCurrency(selectedProgram.cost)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">İlerleme</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Kalibrasyon İlerlemesi</span>
                      <span>{Math.round(getCalibrationProgress(selectedProgram.lastCalibration, selectedProgram.nextCalibration))}%</span>
                    </div>
                    <Progress value={getCalibrationProgress(selectedProgram.lastCalibration, selectedProgram.nextCalibration)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {getDaysUntilCalibration(selectedProgram.nextCalibration) > 0 
                        ? `${getDaysUntilCalibration(selectedProgram.nextCalibration)} gün kaldı`
                        : `${Math.abs(getDaysUntilCalibration(selectedProgram.nextCalibration))} gün geçti`
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notlar</h4>
                <p className="text-sm text-muted-foreground">{selectedProgram.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Kapat
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Toplu İşlem Dialog */}
      <AlertDialog open={bulkActionDialogOpen} onOpenChange={setBulkActionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Toplu İşlem</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedPrograms.length} program için hangi işlemi gerçekleştirmek istiyorsunuz?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-2">
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('schedule')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Kalibrasyon Planla
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('approve')}
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Onayla
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('automate')}
            >
              <Zap className="h-4 w-4 mr-2" />
              Otomasyonu Aktifleştir
            </Button>
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => handleBulkAction('export')}
            >
              <Download className="h-4 w-4 mr-2" />
              Rapor İndir
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Vazgeç</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* İş Akışı Dialog */}
      <Dialog open={workflowDialogOpen} onOpenChange={setWorkflowDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Otomatik İş Akışı Kurulumu</DialogTitle>
            <DialogDescription>
              Kalibrasyon programları için otomatik iş akışını yapılandırın
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tetikleyici Olay</label>
                <Select defaultValue="due_date">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due_date">Kalibrasyon Tarihi Yaklaşınca</SelectItem>
                    <SelectItem value="overdue">Süresi Geçince</SelectItem>
                    <SelectItem value="manual">Manuel Tetikleme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Bildirim Süresi</label>
                <Select defaultValue="7">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 gün önce</SelectItem>
                    <SelectItem value="7">7 gün önce</SelectItem>
                    <SelectItem value="14">14 gün önce</SelectItem>
                    <SelectItem value="30">30 gün önce</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Onay Zinciiri</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="quality-manager" defaultChecked />
                  <label htmlFor="quality-manager" className="text-sm">
                    Kalite Yöneticisi Onayı
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="technical-manager" defaultChecked />
                  <label htmlFor="technical-manager" className="text-sm">
                    Teknik Yönetici Onayı
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="lab-manager" />
                  <label htmlFor="lab-manager" className="text-sm">
                    Laboratuvar Müdürü Onayı
                  </label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Otomatik Eylemler</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-schedule" defaultChecked />
                  <label htmlFor="auto-schedule" className="text-sm">
                    Otomatik Randevu Oluşturma
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-notification" defaultChecked />
                  <label htmlFor="auto-notification" className="text-sm">
                    Otomatik Bildirim Gönderme
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="auto-documentation" />
                  <label htmlFor="auto-documentation" className="text-sm">
                    Otomatik Dokümentasyon
                  </label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWorkflowDialogOpen(false)}>
              Vazgeç
            </Button>
            <Button onClick={() => {
              toast.success('İş akışı kurulumu tamamlandı')
              setWorkflowDialogOpen(false)
            }}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}