"use client"
import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Edit,
  Calendar,
  Download,
  Upload,
  QrCode,
  FileText,
  MapPin,
  User,
  Clock,
  Activity,
  Settings,
  Shield,
  Thermometer,
  Plus,
  Eye,
} from "lucide-react"
import { toast } from "sonner"

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
  purchaseDate: string
  warrantyExpiry: string
  specifications: Record<string, string>
  operatingConditions: {
    temperature: string
    humidity: string
    voltage: string
    frequency: string
  }
  measurementUncertainty: string
  referenceStandards: string[]
  authorizedOperators: string[]
}

interface CalibrationRecord {
  id: string
  date: string
  calibratedBy: string
  certificateNumber: string
  nextDueDate: string
  status: string
  results: string
  notes: string
  uncertainty: string
  environmentalConditions: {
    temperature: string
    humidity: string
  }
  attachments: string[]
}

interface MaintenanceRecord {
  id: string
  date: string
  type: string
  description: string
  performedBy: string
  cost: number
  nextMaintenanceDate: string
  status: string
}

interface ValidationRecord {
  id: string
  date: string
  validationType: string
  performedBy: string
  results: string
  status: string
  nextValidationDate: string
}

export default function EquipmentDetailPage() {
  const params = useParams()
  const router = useRouter()
  const equipmentId = params.id as string

  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [calibrationRecords, setCalibrationRecords] = useState<CalibrationRecord[]>([])
  const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([])
  const [validationRecords, setValidationRecords] = useState<ValidationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Dialog states
  const [isCalibrationDialogOpen, setIsCalibrationDialogOpen] = useState(false)
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false)
  const [isValidationDialogOpen, setIsValidationDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  useEffect(() => {
    fetchEquipmentDetails()
  }, [equipmentId])

  const fetchEquipmentDetails = async () => {
    try {
      setIsLoading(true)
      // Mock data - ISO 17025 compliant equipment details
      const mockEquipment: Equipment = {
        id: equipmentId,
        name: "Analitik Terazi",
        model: "XS205",
        serialNumber: "B123456789",
        manufacturer: "Mettler Toledo",
        location: "Laboratuvar A - Raf 1",
        status: "active",
        lastCalibration: "2024-01-15",
        nextCalibration: "2024-07-15",
        calibrationInterval: "6 ay",
        responsible: "Ahmet Yılmaz",
        category: "measurement",
        purchaseDate: "2022-03-15",
        warrantyExpiry: "2025-03-15",
        specifications: {
          "Maksimum Kapasite": "220 g",
          Okunabilirlik: "0.1 mg",
          Tekrarlanabilirlik: "0.1 mg",
          Doğrusallık: "±0.2 mg",
          "Çalışma Sıcaklığı": "10-30°C",
        },
        operatingConditions: {
          temperature: "20±2°C",
          humidity: "45-75% RH",
          voltage: "230V ±10%",
          frequency: "50/60 Hz",
        },
        measurementUncertainty: "±0.15 mg (k=2)",
        referenceStandards: ["OIML R76", "EN 45501"],
        authorizedOperators: ["Ahmet Yılmaz", "Fatma Demir", "Mehmet Kaya"],
      }

      const mockCalibrationRecords: CalibrationRecord[] = [
        {
          id: "1",
          date: "2024-01-15",
          calibratedBy: "ABC Kalibrasyon Ltd.",
          certificateNumber: "CAL-2024-001",
          nextDueDate: "2024-07-15",
          status: "valid",
          results: "Tüm ölçümler tolerans içinde",
          notes: "Rutin kalibrasyon tamamlandı",
          uncertainty: "±0.12 mg (k=2)",
          environmentalConditions: {
            temperature: "20.5°C",
            humidity: "52% RH",
          },
          attachments: ["kalibrasyon-sertifikasi.pdf"],
        },
      ]

      const mockMaintenanceRecords: MaintenanceRecord[] = [
        {
          id: "1",
          date: "2023-12-10",
          type: "Preventive",
          description: "Genel temizlik ve kontrol",
          performedBy: "Teknik Servis",
          cost: 250,
          nextMaintenanceDate: "2024-06-10",
          status: "completed",
        },
      ]

      const mockValidationRecords: ValidationRecord[] = [
        {
          id: "1",
          date: "2024-01-16",
          validationType: "Performance Verification",
          performedBy: "Kalite Kontrol",
          results: "Performans kriterleri karşılandı",
          status: "passed",
          nextValidationDate: "2024-07-16",
        },
      ]

      setEquipment(mockEquipment)
      setCalibrationRecords(mockCalibrationRecords)
      setMaintenanceRecords(mockMaintenanceRecords)
      setValidationRecords(mockValidationRecords)
    } catch (error) {
      toast.error("Ekipman detayları yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      calibration_due: "bg-yellow-100 text-yellow-800",
      out_of_service: "bg-red-100 text-red-800",
      maintenance: "bg-blue-100 text-blue-800",
      valid: "bg-green-100 text-green-800",
      expired: "bg-red-100 text-red-800",
      due_soon: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      passed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
    }

    const variant = variants[status] || "bg-gray-100 text-gray-800"
    return <Badge className={variant}>{status.replace("_", " ").toUpperCase()}</Badge>
  }

  const generateQRCode = () => {
    toast.success("QR kod oluşturuldu ve panoya kopyalandı")
  }

  const downloadCertificate = (certificateNumber: string) => {
    toast.success(`${certificateNumber} sertifikası indiriliyor...`)
  }

  const viewCalibrationDetails = (recordId: string) => {
    const record = calibrationRecords.find((r) => r.id === recordId)
    if (record) {
      toast.success(`Kalibrasyon detayları: ${record.certificateNumber}`)
      // Here you would typically open a detailed view modal
    }
  }

  const handleDocumentUpload = () => {
    if (selectedFile) {
      toast.success(`${selectedFile.name} dosyası yüklendi`)
      setSelectedFile(null)
      setIsDocumentDialogOpen(false)
    } else {
      toast.error("Lütfen bir dosya seçin")
    }
  }

  const downloadDocument = (fileName: string) => {
    toast.success(`${fileName} indiriliyor...`)
    // Here you would implement actual file download
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!equipment) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Ekipman bulunamadı</h2>
          <p className="text-muted-foreground">Belirtilen ekipman mevcut değil</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{equipment.name}</h1>
            <p className="text-muted-foreground">
              {equipment.manufacturer} - {equipment.model}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateQRCode}>
            <QrCode className="w-4 h-4 mr-2" />
            QR Kod
          </Button>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Düzenle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Ekipman Bilgilerini Düzenle</DialogTitle>
                <DialogDescription>ISO 17025 uyumlu ekipman bilgilerini güncelleyin</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Ekipman Adı</Label>
                    <Input defaultValue={equipment.name} />
                  </div>
                  <div className="space-y-2">
                    <Label>Model</Label>
                    <Input defaultValue={equipment.model} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Seri Numarası</Label>
                    <Input defaultValue={equipment.serialNumber} />
                  </div>
                  <div className="space-y-2">
                    <Label>Üretici</Label>
                    <Input defaultValue={equipment.manufacturer} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Ölçüm Belirsizliği</Label>
                  <Input defaultValue={equipment.measurementUncertainty} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  İptal
                </Button>
                <Button
                  onClick={() => {
                    setIsEditDialogOpen(false)
                    toast.success("Ekipman bilgileri güncellendi")
                  }}
                >
                  Kaydet
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durum</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getStatusBadge(equipment.status)}</div>
            <p className="text-xs text-muted-foreground">Mevcut durum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sonraki Kalibrasyon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(() => {
                const daysUntil = Math.ceil(
                  (new Date(equipment.nextCalibration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )
                return `${daysUntil} gün`
              })()}
            </div>
            <p className="text-xs text-muted-foreground">{equipment.nextCalibration}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kalibrasyon Aralığı</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.calibrationInterval}</div>
            <p className="text-xs text-muted-foreground">Periyot</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sorumlu</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-bold">{equipment.responsible}</div>
            <p className="text-xs text-muted-foreground">Sorumlu personel</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Genel Bilgiler</TabsTrigger>
          <TabsTrigger value="calibration">Kalibrasyon</TabsTrigger>
          <TabsTrigger value="maintenance">Bakım</TabsTrigger>
          <TabsTrigger value="validation">Doğrulama</TabsTrigger>
          <TabsTrigger value="documents">Dokümanlar</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Teknik Özellikler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(equipment.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm text-muted-foreground">{key}:</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Ölçüm Belirsizliği:</span>
                  <span className="text-sm font-medium">{equipment.measurementUncertainty}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Thermometer className="w-5 h-5 mr-2" />
                  Çalışma Koşulları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Sıcaklık:</span>
                  <span className="text-sm font-medium">{equipment.operatingConditions.temperature}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Nem:</span>
                  <span className="text-sm font-medium">{equipment.operatingConditions.humidity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Voltaj:</span>
                  <span className="text-sm font-medium">{equipment.operatingConditions.voltage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Frekans:</span>
                  <span className="text-sm font-medium">{equipment.operatingConditions.frequency}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Konum ve Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Konum:</span>
                  <span className="text-sm font-medium">{equipment.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Satın Alma:</span>
                  <span className="text-sm font-medium">{equipment.purchaseDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Garanti Bitiş:</span>
                  <span className="text-sm font-medium">{equipment.warrantyExpiry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Kategori:</span>
                  <span className="text-sm font-medium">{equipment.category}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Yetkilendirme ve Standartlar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Yetkili Operatörler:</span>
                  <div className="mt-1 space-y-1">
                    {equipment.authorizedOperators.map((operator, index) => (
                      <Badge key={index} variant="secondary" className="mr-1">
                        {operator}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <span className="text-sm text-muted-foreground">Referans Standartlar:</span>
                  <div className="mt-1 space-y-1">
                    {equipment.referenceStandards.map((standard, index) => (
                      <Badge key={index} variant="outline" className="mr-1">
                        {standard}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calibration" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Kalibrasyon Kayıtları</h2>
            <Dialog open={isCalibrationDialogOpen} onOpenChange={setIsCalibrationDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Kalibrasyon
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Kalibrasyon Kaydı</DialogTitle>
                  <DialogDescription>ISO 17025 uyumlu kalibrasyon kaydı oluşturun</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Kalibrasyon Tarihi</Label>
                      <Input type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label>Sonraki Kalibrasyon</Label>
                      <Input type="date" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Ölçüm Belirsizliği</Label>
                    <Input placeholder="±0.15 mg (k=2)" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Çevresel Sıcaklık</Label>
                      <Input placeholder="20.5°C" />
                    </div>
                    <div className="space-y-2">
                      <Label>Çevresel Nem</Label>
                      <Input placeholder="52% RH" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCalibrationDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button
                    onClick={() => {
                      setIsCalibrationDialogOpen(false)
                      toast.success("Kalibrasyon kaydı oluşturuldu")
                    }}
                  >
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Kalibre Eden</TableHead>
                    <TableHead>Sertifika No</TableHead>
                    <TableHead>Belirsizlik</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {calibrationRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.calibratedBy}</TableCell>
                      <TableCell>{record.certificateNumber}</TableCell>
                      <TableCell>{record.uncertainty}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Detayları Görüntüle"
                            onClick={() => viewCalibrationDetails(record.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Sertifika İndir"
                            onClick={() => downloadCertificate(record.certificateNumber)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Bakım Kayıtları</h2>
            <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Bakım
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Bakım Kaydı</DialogTitle>
                  <DialogDescription>Ekipman bakım kaydı oluşturun</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bakım Türü</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Bakım türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="preventive">Önleyici Bakım</SelectItem>
                        <SelectItem value="corrective">Düzeltici Bakım</SelectItem>
                        <SelectItem value="emergency">Acil Bakım</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Açıklama</Label>
                    <Textarea placeholder="Yapılan bakım işlemleri..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button
                    onClick={() => {
                      setIsMaintenanceDialogOpen(false)
                      toast.success("Bakım kaydı oluşturuldu")
                    }}
                  >
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Yapan</TableHead>
                    <TableHead>Maliyet</TableHead>
                    <TableHead>Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.performedBy}</TableCell>
                      <TableCell>₺{record.cost}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Doğrulama Kayıtları</h2>
            <Dialog open={isValidationDialogOpen} onOpenChange={setIsValidationDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Doğrulama
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Yeni Doğrulama Kaydı</DialogTitle>
                  <DialogDescription>Ekipman performans doğrulaması kaydet</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Doğrulama Türü</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Doğrulama türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="performance">Performans Doğrulaması</SelectItem>
                        <SelectItem value="intermediate">Ara Kontrol</SelectItem>
                        <SelectItem value="reference">Referans Kontrol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Sonuçlar</Label>
                    <Textarea placeholder="Doğrulama sonuçları..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsValidationDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button
                    onClick={() => {
                      setIsValidationDialogOpen(false)
                      toast.success("Doğrulama kaydı oluşturuldu")
                    }}
                  >
                    Kaydet
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Yapan</TableHead>
                    <TableHead>Sonuç</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Sonraki Tarih</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {validationRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.validationType}</TableCell>
                      <TableCell>{record.performedBy}</TableCell>
                      <TableCell>{record.results}</TableCell>
                      <TableCell>{getStatusBadge(record.status)}</TableCell>
                      <TableCell>{record.nextValidationDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">İlgili Dokümanlar</h2>
            <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Doküman Yükle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Doküman Yükle</DialogTitle>
                  <DialogDescription>Ekipman ile ilgili doküman yükleyin</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Doküman Türü</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Doküman türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calibration">Kalibrasyon Sertifikası</SelectItem>
                        <SelectItem value="manual">Kullanım Talimatı</SelectItem>
                        <SelectItem value="maintenance">Bakım Kılavuzu</SelectItem>
                        <SelectItem value="certificate">Uygunluk Sertifikası</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Dosya Seç</Label>
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Açıklama</Label>
                    <Textarea placeholder="Doküman açıklaması..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDocumentDialogOpen(false)}>
                    İptal
                  </Button>
                  <Button onClick={handleDocumentUpload}>Yükle</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Kalibrasyon Sertifikaları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-sm">kalibrasyon-sertifikasi.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => downloadDocument("kalibrasyon-sertifikasi.pdf")}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kullanım Talimatları</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      <span className="text-sm">kullanim-talimati.pdf</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => downloadDocument("kullanim-talimati.pdf")}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
