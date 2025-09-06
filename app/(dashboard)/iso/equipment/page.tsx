"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Edit,
  Eye,
  Wrench,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Search,
  Download,
  QrCode,
  Bell,
  CalendarDays,
  Trash2,
  RefreshCw,
  Settings,
} from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/ui/page-header"
import { PageSearch } from "@/components/ui/page-search"
// Lazy load mock data for better performance
const getMockData = () => import("@/lib/mock-data").then(module => module.mockData)

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
  specifications?: string
  operatingConditions?: string
  measurementUncertainty?: string
  referenceStandards?: string
  maintenanceSchedule?: string
  operatorAuthorizations?: string
  environmentalRequirements?: string
  validationStatus?: string
  softwareVersion?: string
}

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
}

export default function EquipmentPage() {
  const router = useRouter()
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [calibrationRecords, setCalibrationRecords] = useState<CalibrationRecord[]>([])
  const [displayedEquipment, setDisplayedEquipment] = useState<Equipment[]>([])
  const [displayedCalibrationRecords, setDisplayedCalibrationRecords] = useState<CalibrationRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("inventory")
  const [searchQuery, setSearchQuery] = useState("")

  // Dialog states
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false)
  const [isCalibrationDialogOpen, setIsCalibrationDialogOpen] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)

  const [equipmentFormData, setEquipmentFormData] = useState({
    name: "",
    model: "",
    serialNumber: "",
    manufacturer: "",
    location: "",
    category: "",
    calibrationInterval: "",
    responsible: "",
    purchaseDate: "",
    specifications: "",
    operatingConditions: "",
    measurementUncertainty: "",
    referenceStandards: "",
    maintenanceSchedule: "",
    operatorAuthorizations: "",
    environmentalRequirements: "",
    validationStatus: "",
    softwareVersion: "",
  })

  const [calibrationFormData, setCalibrationFormData] = useState({
    equipmentId: "",
    calibrationDate: "",
    calibratedBy: "",
    certificateNumber: "",
    nextDueDate: "",
    results: "",
    notes: "",
  })

  // New state'ler eklendi - arama, filtreleme ve seçim için
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])
  const [showCalendarView, setShowCalendarView] = useState(false)
  const [showUpcomingCalibrations, setShowUpcomingCalibrations] = useState(false)

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setIsLoading(true)
      // Debug logs removed for production performance
      await Promise.all([fetchEquipment(), fetchCalibrationRecords()])
    } catch (error) {
      console.error("Veri yükleme hatası:", error)
      toast.error("Veriler yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchEquipment = async () => {
    try {
      // Lazy load mock data
      const mockData = await getMockData()
      const equipmentData = mockData.equipmentInventory || []
      const transformedData = equipmentData.map((item: any) => ({
        id: item.id,
        name: item.name,
        model: item.model,
        serialNumber: item.serialNumber,
        manufacturer: item.manufacturer,
        location: item.location,
        status: item.status === "pending" ? "active" : item.status,
        lastCalibration: item.lastCalibration || "2024-01-01",
        nextCalibration: item.nextCalibration || "2024-07-01",
        calibrationInterval: item.calibrationFrequency || "6 ay",
        responsible: item.responsible,
        category: item.subCategory?.toLowerCase() || "measurement",
        purchaseDate: item.purchaseDate,
        specifications: item.specifications ? JSON.stringify(item.specifications) : "",
        operatingConditions: item.specifications ? `Sıcaklık: ${item.specifications.temperature}, Nem: ${item.specifications.humidity}` : "",
        measurementUncertainty: item.specifications?.accuracy || "",
        referenceStandards: "",
        maintenanceSchedule: item.maintenance ? JSON.stringify(item.maintenance) : "",
        operatorAuthorizations: "",
        environmentalRequirements: item.specifications ? `Sıcaklık: ${item.specifications.temperature}, Nem: ${item.specifications.humidity}` : "",
        validationStatus: item.condition === "Mükemmel" ? "validated" : "pending",
        softwareVersion: "",
      }))
      
      setEquipment(transformedData)
      setDisplayedEquipment(transformedData)
    } catch (error) {
      console.error("Equipment fetch error:", error)
    }
  }

  const fetchCalibrationRecords = async () => {
    try {
      // Lazy load mock data
      const mockData = await getMockData()
      const calibrationData = mockData.calibrationRecords || []
      const transformedData = calibrationData.map((item: any) => ({
        id: item.id,
        equipmentId: item.equipmentId,
        equipmentName: item.equipmentName,
        calibrationDate: item.calibrationDate,
        calibratedBy: item.calibratedBy,
        certificateNumber: item.certificateNumber,
        nextDueDate: item.nextDueDate,
        status: item.status,
        results: item.results,
        notes: item.notes || "",
      }))
      
      setCalibrationRecords(transformedData)
      setDisplayedCalibrationRecords(transformedData)
    } catch (error) {
      console.error("Calibration records fetch error:", error)
    }
  }

  // Search functionality
  const handleSearch = (query: string, filters: Record<string, any>) => {
    setSearchQuery(query)
    
    let filtered = equipment
    
    // Apply text search
    if (query.trim()) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.model.toLowerCase().includes(query.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(query.toLowerCase()) ||
        item.manufacturer.toLowerCase().includes(query.toLowerCase()) ||
        item.location.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(item => item.status === filters.status)
    }
    
    if (filters.category) {
      filtered = filtered.filter(item => item.category === filters.category)
    }
    
    if (filters.location) {
      filtered = filtered.filter(item => item.location === filters.location)
    }
    
    setDisplayedEquipment(filtered)
  }

  const handleCalibrationSearch = (query: string, filters: Record<string, any>) => {
    let filtered = calibrationRecords
    
    // Apply text search
    if (query.trim()) {
      filtered = filtered.filter(record =>
        record.equipmentName.toLowerCase().includes(query.toLowerCase()) ||
        record.certificateNumber.toLowerCase().includes(query.toLowerCase()) ||
        record.calibratedBy.toLowerCase().includes(query.toLowerCase()) ||
        record.results.toLowerCase().includes(query.toLowerCase())
      )
    }
    
    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(record => record.status === filters.status)
    }
    
    if (filters.dateFrom) {
      filtered = filtered.filter(record => new Date(record.calibrationDate) >= new Date(filters.dateFrom))
    }
    
    if (filters.dateTo) {
      filtered = filtered.filter(record => new Date(record.calibrationDate) <= new Date(filters.dateTo))
    }
    
    setDisplayedCalibrationRecords(filtered)
  }

  const handleEditEquipment = (equipment: Equipment) => {
    setEditingEquipment(equipment)
    setEquipmentFormData({
      name: equipment.name,
      model: equipment.model,
      serialNumber: equipment.serialNumber,
      manufacturer: equipment.manufacturer,
      location: equipment.location,
      category: equipment.category,
      calibrationInterval: equipment.calibrationInterval,
      responsible: equipment.responsible,
      purchaseDate: equipment.purchaseDate || "",
      specifications: equipment.specifications || "",
      operatingConditions: equipment.operatingConditions || "",
      measurementUncertainty: equipment.measurementUncertainty || "",
      referenceStandards: equipment.referenceStandards || "",
      maintenanceSchedule: equipment.maintenanceSchedule || "",
      operatorAuthorizations: equipment.operatorAuthorizations || "",
      environmentalRequirements: equipment.environmentalRequirements || "",
      validationStatus: equipment.validationStatus || "",
      softwareVersion: equipment.softwareVersion || "",
    })
    setIsEquipmentDialogOpen(true)
  }

  const handleEquipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingEquipment) {
        toast.success("Ekipman başarıyla güncellendi")
      } else {
        toast.success("Ekipman başarıyla eklendi")
      }
      setIsEquipmentDialogOpen(false)
      setEditingEquipment(null)
      setEquipmentFormData({
        name: "",
        model: "",
        serialNumber: "",
        manufacturer: "",
        location: "",
        category: "",
        calibrationInterval: "",
        responsible: "",
        purchaseDate: "",
        specifications: "",
        operatingConditions: "",
        measurementUncertainty: "",
        referenceStandards: "",
        maintenanceSchedule: "",
        operatorAuthorizations: "",
        environmentalRequirements: "",
        validationStatus: "",
        softwareVersion: "",
      })
      fetchEquipment()
    } catch (error) {
      toast.error("Ekipman kaydedilirken hata oluştu")
    }
  }

  const handleCalibrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Kalibrasyon kaydı başarıyla oluşturuldu")
      setIsCalibrationDialogOpen(false)
      setCalibrationFormData({
        equipmentId: "",
        calibrationDate: "",
        calibratedBy: "",
        certificateNumber: "",
        nextDueDate: "",
        results: "",
        notes: "",
      })
      fetchCalibrationRecords()
    } catch (error) {
      toast.error("Kalibrasyon kaydı oluşturulurken hata oluştu")
    }
  }

  const getStatusBadge = (status: string, type = "equipment") => {
    const variants: Record<string, Record<string, string>> = {
      equipment: {
        active: "bg-green-100 text-green-800",
        calibration_due: "bg-yellow-100 text-yellow-800",
        out_of_service: "bg-red-100 text-red-800",
        maintenance: "bg-blue-100 text-blue-800",
      },
      calibration: {
        valid: "bg-green-100 text-green-800",
        expired: "bg-red-100 text-red-800",
        due_soon: "bg-yellow-100 text-yellow-800",
      },
    }

    const variant = variants[type]?.[status] || "bg-gray-100 text-gray-800"
    return <Badge className={variant}>{status.replace("_", " ").toUpperCase()}</Badge>
  }

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const filteredCalibrationRecords = calibrationRecords.filter((record) => {
    const matchesSearch =
      record.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const upcomingCalibrations = equipment.filter((item) => {
    const nextDate = new Date(item.nextCalibration)
    const today = new Date()
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 30 && daysUntil >= 0
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEquipment(filteredEquipment.map((item) => item.id))
    } else {
      setSelectedEquipment([])
    }
  }

  const handleSelectEquipment = (equipmentId: string, checked: boolean) => {
    if (checked) {
      setSelectedEquipment([...selectedEquipment, equipmentId])
    } else {
      setSelectedEquipment(selectedEquipment.filter((id) => id !== equipmentId))
    }
  }

  const handleBulkCalibrationSchedule = () => {
    if (selectedEquipment.length === 0) {
      toast.error("Lütfen en az bir ekipman seçin")
      return
    }
    toast.success(`${selectedEquipment.length} ekipman için kalibrasyon planlandı`)
    setSelectedEquipment([])
  }

  const generateQRCode = (equipmentId: string) => {
    toast.success("QR kod oluşturuldu ve panoya kopyalandı")
  }

  const exportCalibrationReport = () => {
    toast.success("Kalibrasyon raporu indiriliyor...")
  }

  const getCalibrationProgress = (lastCalibration: string, nextCalibration: string) => {
    const last = new Date(lastCalibration)
    const next = new Date(nextCalibration)
    const today = new Date()
    const total = next.getTime() - last.getTime()
    const elapsed = today.getTime() - last.getTime()
    return Math.min(Math.max((elapsed / total) * 100, 0), 100)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="Ekipman ve Kalibrasyon"
        description="Ekipman envanteri ve kalibrasyon kayıtları"
        breadcrumb={[
          { title: "ISO Yönetim Sistemi", href: "/iso" },
          { title: "Ekipman ve Kalibrasyon", icon: Wrench }
        ]}
        status={{
          label: "Aktif",
          variant: "default"
        }}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowUpcomingCalibrations(!showUpcomingCalibrations)}>
              <Bell className="w-4 h-4 mr-2" />
              Yaklaşan Kalibrasyonlar ({upcomingCalibrations.length})
            </Button>
            <Button variant="outline" onClick={() => setShowCalendarView(!showCalendarView)}>
              <CalendarDays className="w-4 h-4 mr-2" />
              Takvim Görünümü
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
            <Button variant="outline" onClick={exportCalibrationReport}>
              <Download className="w-4 h-4 mr-2" />
              Rapor İndir
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Ekipman
            </Button>
          </div>
        }
      />

      {showUpcomingCalibrations && upcomingCalibrations.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Yaklaşan Kalibrasyonlar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {upcomingCalibrations.map((item) => {
                const daysUntil = Math.ceil(
                  (new Date(item.nextCalibration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                )
                return (
                  <div key={item.id} className="flex justify-between items-center p-2 bg-white rounded border">
                    <div>
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({item.model})</span>
                    </div>
                    <Badge variant={daysUntil <= 7 ? "destructive" : "secondary"}>{daysUntil} gün kaldı</Badge>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ekipman</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı ekipman sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Ekipman</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.filter((e) => e.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Kullanımda olan ekipman</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kalibrasyon Gerekli</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.filter((e) => e.status === "calibration_due").length}</div>
            <p className="text-xs text-muted-foreground">Kalibrasyon süresi dolan</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay Kalibre Edilen</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {calibrationRecords.filter((c) => c.calibrationDate.includes("2024-01")).length}
            </div>
            <p className="text-xs text-muted-foreground">Ocak ayında kalibre edilen</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Arama ve Filtreleme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Ekipman adı, model veya seri numarası ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="calibration_due">Kalibrasyon Gerekli</SelectItem>
                <SelectItem value="out_of_service">Hizmet Dışı</SelectItem>
                <SelectItem value="maintenance">Bakımda</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="measurement">Ölçüm Cihazı</SelectItem>
                <SelectItem value="analysis">Analiz Cihazı</SelectItem>
                <SelectItem value="preparation">Hazırlık Ekipmanı</SelectItem>
                <SelectItem value="safety">Güvenlik Ekipmanı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Ekipman Envanteri</TabsTrigger>
          <TabsTrigger value="calibration">Kalibrasyon Kayıtları</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          {/* Search Component */}
          <PageSearch
            items={equipment.map(item => ({
              id: item.id,
              title: item.name,
              description: `${item.model} - ${item.serialNumber}`,
              status: item.status,
              date: item.purchaseDate,
              metadata: {
                manufacturer: item.manufacturer,
                location: item.location,
                category: item.category,
                responsible: item.responsible
              }
            }))}
            onSearch={handleSearch}
            onItemSelect={(item) => {
              const equipmentItem = equipment.find(e => e.id === item.id)
              if (equipmentItem) {
                handleEditEquipment(equipmentItem)
              }
            }}
            filters={[
              {
                id: "status",
                label: "Durum",
                type: "select",
                options: [
                  { value: "active", label: "Aktif" },
                  { value: "inactive", label: "Pasif" },
                  { value: "maintenance", label: "Bakımda" },
                  { value: "calibration", label: "Kalibrasyonda" }
                ]
              },
              {
                id: "category",
                label: "Kategori",
                type: "select",
                options: [
                  { value: "measurement", label: "Ölçüm" },
                  { value: "test", label: "Test" },
                  { value: "calibration", label: "Kalibrasyon" }
                ]
              },
              {
                id: "location",
                label: "Konum",
                type: "select",
                options: [
                  { value: "Laboratuvar A", label: "Laboratuvar A" },
                  { value: "Laboratuvar B", label: "Laboratuvar B" },
                  { value: "Depo", label: "Depo" }
                ]
              }
            ]}
            placeholder="Ekipman ara... (Ctrl+F)"
            className="mb-4"
          />
          
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ekipman Envanteri</h2>
            <div className="flex gap-2">
              {selectedEquipment.length > 0 && (
                <>
                  <Button variant="outline" onClick={handleBulkCalibrationSchedule}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Toplu Kalibrasyon Planla ({selectedEquipment.length})
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedEquipment([])}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Seçimi Temizle
                  </Button>
                </>
              )}
              <Dialog
                open={isEquipmentDialogOpen}
                onOpenChange={(open) => {
                  setIsEquipmentDialogOpen(open)
                  if (!open) {
                    setEditingEquipment(null)
                    setEquipmentFormData({
                      name: "",
                      model: "",
                      serialNumber: "",
                      manufacturer: "",
                      location: "",
                      category: "",
                      calibrationInterval: "",
                      responsible: "",
                      purchaseDate: "",
                      specifications: "",
                      operatingConditions: "",
                      measurementUncertainty: "",
                      referenceStandards: "",
                      maintenanceSchedule: "",
                      operatorAuthorizations: "",
                      environmentalRequirements: "",
                      validationStatus: "",
                      softwareVersion: "",
                    })
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Ekipman
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingEquipment ? "Ekipman Düzenle" : "Yeni Ekipman Kaydı"}</DialogTitle>
                    <DialogDescription>
                      {editingEquipment ? "Ekipman bilgilerini güncelleyin" : "Envantere yeni ekipman ekleyin"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleEquipmentSubmit} className="space-y-6">
                    <Tabs defaultValue="general" className="w-full">
                      <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
                        <TabsTrigger value="calibration">Kalibrasyon</TabsTrigger>
                        <TabsTrigger value="maintenance">Bakım</TabsTrigger>
                        <TabsTrigger value="validation">Doğrulama</TabsTrigger>
                      </TabsList>

                      <TabsContent value="general" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Ekipman Adı *</Label>
                            <Input
                              id="name"
                              value={equipmentFormData.name}
                              onChange={(e) => setEquipmentFormData({ ...equipmentFormData, name: e.target.value })}
                              placeholder="Ekipman adı"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="model">Model *</Label>
                            <Input
                              id="model"
                              value={equipmentFormData.model}
                              onChange={(e) => setEquipmentFormData({ ...equipmentFormData, model: e.target.value })}
                              placeholder="Model numarası"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="serialNumber">Seri Numarası *</Label>
                            <Input
                              id="serialNumber"
                              value={equipmentFormData.serialNumber}
                              onChange={(e) =>
                                setEquipmentFormData({ ...equipmentFormData, serialNumber: e.target.value })
                              }
                              placeholder="Seri numarası"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="manufacturer">Üretici *</Label>
                            <Input
                              id="manufacturer"
                              value={equipmentFormData.manufacturer}
                              onChange={(e) =>
                                setEquipmentFormData({ ...equipmentFormData, manufacturer: e.target.value })
                              }
                              placeholder="Üretici firma"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Konum *</Label>
                            <Input
                              id="location"
                              value={equipmentFormData.location}
                              onChange={(e) => setEquipmentFormData({ ...equipmentFormData, location: e.target.value })}
                              placeholder="Ekipmanın bulunduğu konum"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="purchaseDate">Satın Alma Tarihi</Label>
                            <Input
                              id="purchaseDate"
                              type="date"
                              value={equipmentFormData.purchaseDate}
                              onChange={(e) =>
                                setEquipmentFormData({ ...equipmentFormData, purchaseDate: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category">Kategori *</Label>
                            <Select
                              value={equipmentFormData.category}
                              onValueChange={(value) => setEquipmentFormData({ ...equipmentFormData, category: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Kategori seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="measurement">Ölçüm Cihazı</SelectItem>
                                <SelectItem value="analysis">Analiz Cihazı</SelectItem>
                                <SelectItem value="preparation">Hazırlık Ekipmanı</SelectItem>
                                <SelectItem value="safety">Güvenlik Ekipmanı</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="responsible">Sorumlu Kişi *</Label>
                            <Input
                              id="responsible"
                              value={equipmentFormData.responsible}
                              onChange={(e) =>
                                setEquipmentFormData({ ...equipmentFormData, responsible: e.target.value })
                              }
                              placeholder="Sorumlu personel"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specifications">Teknik Özellikler</Label>
                          <Textarea
                            id="specifications"
                            value={equipmentFormData.specifications}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, specifications: e.target.value })
                            }
                            placeholder="Ekipmanın teknik özellikleri, ölçüm aralığı, hassasiyet vb."
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="softwareVersion">Yazılım Versiyonu</Label>
                          <Input
                            id="softwareVersion"
                            value={equipmentFormData.softwareVersion}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, softwareVersion: e.target.value })
                            }
                            placeholder="Yazılım/firmware versiyonu"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="calibration" className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="calibrationInterval">Kalibrasyon Aralığı *</Label>
                            <Select
                              value={equipmentFormData.calibrationInterval}
                              onValueChange={(value) =>
                                setEquipmentFormData({ ...equipmentFormData, calibrationInterval: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Aralık seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1 ay">1 Ay</SelectItem>
                                <SelectItem value="3 ay">3 Ay</SelectItem>
                                <SelectItem value="6 ay">6 Ay</SelectItem>
                                <SelectItem value="1 yıl">1 Yıl</SelectItem>
                                <SelectItem value="2 yıl">2 Yıl</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="measurementUncertainty">Ölçüm Belirsizliği</Label>
                            <Input
                              id="measurementUncertainty"
                              value={equipmentFormData.measurementUncertainty}
                              onChange={(e) =>
                                setEquipmentFormData({ ...equipmentFormData, measurementUncertainty: e.target.value })
                              }
                              placeholder="±0.1 mg, ±0.01 pH vb."
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="referenceStandards">Referans Standartlar</Label>
                          <Textarea
                            id="referenceStandards"
                            value={equipmentFormData.referenceStandards}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, referenceStandards: e.target.value })
                            }
                            placeholder="Kalibrasyonda kullanılan referans standartlar ve sertifika numaraları"
                            rows={3}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="operatingConditions">Çalışma Koşulları</Label>
                          <Textarea
                            id="operatingConditions"
                            value={equipmentFormData.operatingConditions}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, operatingConditions: e.target.value })
                            }
                            placeholder="Sıcaklık: 20±2°C, Nem: %45-65, Titreşim: <0.1 m/s² vb."
                            rows={2}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="maintenance" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="maintenanceSchedule">Bakım Programı</Label>
                          <Textarea
                            id="maintenanceSchedule"
                            value={equipmentFormData.maintenanceSchedule}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, maintenanceSchedule: e.target.value })
                            }
                            placeholder="Günlük, haftalık, aylık bakım işlemleri ve periyotları"
                            rows={4}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="environmentalRequirements">Çevresel Gereksinimler</Label>
                          <Textarea
                            id="environmentalRequirements"
                            value={equipmentFormData.environmentalRequirements}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, environmentalRequirements: e.target.value })
                            }
                            placeholder="Temizlik, havalandırma, elektrik kalitesi vb. gereksinimler"
                            rows={3}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="validation" className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="validationStatus">Doğrulama Durumu</Label>
                          <Select
                            value={equipmentFormData.validationStatus}
                            onValueChange={(value) =>
                              setEquipmentFormData({ ...equipmentFormData, validationStatus: value })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Durum seçin" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="validated">Doğrulanmış</SelectItem>
                              <SelectItem value="pending">Doğrulama Bekliyor</SelectItem>
                              <SelectItem value="not_required">Doğrulama Gerekli Değil</SelectItem>
                              <SelectItem value="expired">Doğrulama Süresi Dolmuş</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="operatorAuthorizations">Operatör Yetkilendirmeleri</Label>
                          <Textarea
                            id="operatorAuthorizations"
                            value={equipmentFormData.operatorAuthorizations}
                            onChange={(e) =>
                              setEquipmentFormData({ ...equipmentFormData, operatorAuthorizations: e.target.value })
                            }
                            placeholder="Ekipmanı kullanmaya yetkili personel listesi ve eğitim durumları"
                            rows={3}
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsEquipmentDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button type="submit">{editingEquipment ? "Güncelle" : "Kaydet"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Ekipman Listesi</CardTitle>
              <CardDescription>
                Tüm laboratuvar ekipmanları ve durumları
                {searchTerm && ` - "${searchTerm}" için ${filteredEquipment.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedEquipment.length === filteredEquipment.length && filteredEquipment.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Ekipman</TableHead>
                    <TableHead>Model/Seri No</TableHead>
                    <TableHead>Konum</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Kalibrasyon Durumu</TableHead>
                    <TableHead>Sonraki Kalibrasyon</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedEquipment.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedEquipment.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectEquipment(item.id, checked as boolean)}
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
                          <div className="text-sm">{item.model}</div>
                          <div className="text-xs text-muted-foreground">{item.serialNumber}</div>
                        </div>
                      </TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>{getStatusBadge(item.status, "equipment")}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress
                            value={getCalibrationProgress(item.lastCalibration, item.nextCalibration)}
                            className="h-2"
                          />
                          <div className="text-xs text-muted-foreground">Son: {item.lastCalibration}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {item.nextCalibration}
                          {(() => {
                            const daysUntil = Math.ceil(
                              (new Date(item.nextCalibration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                            )
                            if (daysUntil <= 30 && daysUntil >= 0) {
                              return (
                                <Badge variant="secondary" className="ml-1 text-xs">
                                  {daysUntil}g
                                </Badge>
                              )
                            }
                            return null
                          })()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            title="Detayları Görüntüle"
                            onClick={() => router.push(`/iso/equipment/${item.id}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditEquipment(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            title="QR Kod Oluştur"
                            onClick={() => generateQRCode(item.id)}
                          >
                            <QrCode className="w-4 h-4" />
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

        <TabsContent value="calibration" className="space-y-4">
          {/* Search Component for Calibration Records */}
          <PageSearch
            items={calibrationRecords.map(record => ({
              id: record.id,
              title: record.equipmentName,
              description: `Sertifika: ${record.certificateNumber}`,
              status: record.status,
              date: record.calibrationDate,
              metadata: {
                calibratedBy: record.calibratedBy,
                nextDueDate: record.nextDueDate,
                results: record.results
              }
            }))}
            onSearch={handleCalibrationSearch}
            onItemSelect={(item) => {
              // Navigate to calibration record or show details
              console.log("Selected calibration record:", item)
            }}
            filters={[
              {
                id: "status",
                label: "Durum",
                type: "select",
                options: [
                  { value: "valid", label: "Geçerli" },
                  { value: "expired", label: "Süresi Dolmuş" },
                  { value: "pending", label: "Beklemede" }
                ]
              },
              {
                id: "dateFrom",
                label: "Başlangıç Tarihi",
                type: "date"
              },
              {
                id: "dateTo",
                label: "Bitiş Tarihi",
                type: "date"
              }
            ]}
            placeholder="Kalibrasyon kaydı ara... (Ctrl+F)"
            className="mb-4"
          />
          
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
                  <DialogDescription>Ekipman için yeni kalibrasyon kaydı oluşturun</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCalibrationSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="equipmentId">Ekipman</Label>
                      <Select
                        value={calibrationFormData.equipmentId}
                        onValueChange={(value) => setCalibrationFormData({ ...calibrationFormData, equipmentId: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Ekipman seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          {equipment.map((eq) => (
                            <SelectItem key={eq.id} value={eq.id}>
                              {eq.name} - {eq.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calibrationDate">Kalibrasyon Tarihi</Label>
                      <Input
                        id="calibrationDate"
                        type="date"
                        value={calibrationFormData.calibrationDate}
                        onChange={(e) => setCalibrationFormData({ ...calibrationFormData, calibrationDate: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="calibratedBy">Kalibre Eden</Label>
                      <Input
                        id="calibratedBy"
                        value={calibrationFormData.calibratedBy}
                        onChange={(e) => setCalibrationFormData({ ...calibrationFormData, calibratedBy: e.target.value })}
                        placeholder="Kalibrasyon yapan kişi/firma"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certificateNumber">Sertifika Numarası</Label>
                      <Input
                        id="certificateNumber"
                        value={calibrationFormData.certificateNumber}
                        onChange={(e) => setCalibrationFormData({ ...calibrationFormData, certificateNumber: e.target.value })}
                        placeholder="Sertifika numarası"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextDueDate">Sonraki Kalibrasyon Tarihi</Label>
                    <Input
                      id="nextDueDate"
                      type="date"
                      value={calibrationFormData.nextDueDate}
                      onChange={(e) => setCalibrationFormData({ ...calibrationFormData, nextDueDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="results">Kalibrasyon Sonuçları</Label>
                    <Textarea
                      id="results"
                      value={calibrationFormData.results}
                      onChange={(e) => setCalibrationFormData({ ...calibrationFormData, results: e.target.value })}
                      placeholder="Kalibrasyon sonuçları ve değerlendirme"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notlar</Label>
                    <Textarea
                      id="notes"
                      value={calibrationFormData.notes}
                      onChange={(e) => setCalibrationFormData({ ...calibrationFormData, notes: e.target.value })}
                      placeholder="Ek notlar ve gözlemler"
                      rows={2}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCalibrationDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button type="submit">Kaydet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kalibrasyon Kayıtları</CardTitle>
              <CardDescription>
                Tüm ekipman kalibrasyon kayıtları ve durumları
                {searchTerm && ` - "${searchTerm}" için ${filteredCalibrationRecords.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ekipman</TableHead>
                    <TableHead>Kalibrasyon Tarihi</TableHead>
                    <TableHead>Kalibre Eden</TableHead>
                    <TableHead>Sertifika No</TableHead>
                    <TableHead>Sonraki Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayedCalibrationRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.equipmentName}</TableCell>
                      <TableCell>{new Date(record.calibrationDate).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>{record.calibratedBy}</TableCell>
                      <TableCell>{record.certificateNumber}</TableCell>
                      <TableCell>{new Date(record.nextDueDate).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>{getStatusBadge(record.status, "calibration")}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
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
      </Tabs>
    </div>
  )
}
