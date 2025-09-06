"use client"

import type React from "react"
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
  Search,
  Download,
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Wrench,
  FileText,
  QrCode,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  Trash2,
  BarChart3,
  Grid3X3,
  List,
} from "lucide-react"
import { toast } from "sonner"
import { mockApi } from "@/lib/mock-data"

interface EquipmentInventory {
  id: string
  name: string
  model: string
  serialNumber: string
  manufacturer: string
  category: string
  subCategory: string
  location: string
  department: string
  status: string
  condition: string
  purchaseDate: string
  warrantyExpiry: string
  lastCalibration: string
  nextCalibration: string
  calibrationFrequency: string
  responsible: string
  cost: number
  supplier: string
  specifications: {
    [key: string]: string
  }
  maintenance: {
    lastMaintenance: string
    nextMaintenance: string
    frequency: string
    responsible: string
  }
  documents: Array<{
    type: string
    name: string
    date: string
    file: string
  }>
  history: Array<{
    date: string
    action: string
    description: string
    performedBy: string
  }>
  isCritical: boolean
  requiresCalibration: boolean
  requiresMaintenance: boolean
  notes: string
}

export default function EquipmentInventoryPage() {
  const [equipment, setEquipment] = useState<EquipmentInventory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("inventory")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  // Dialog states
  const [isEquipmentDialogOpen, setIsEquipmentDialogOpen] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<EquipmentInventory | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [selectedEquipment, setSelectedEquipment] = useState<string[]>([])

  // Form data
  const [equipmentFormData, setEquipmentFormData] = useState({
    name: "",
    model: "",
    serialNumber: "",
    manufacturer: "",
    category: "",
    subCategory: "",
    location: "",
    department: "",
    status: "Aktif",
    condition: "Mükemmel",
    purchaseDate: "",
    warrantyExpiry: "",
    calibrationFrequency: "",
    responsible: "",
    cost: "",
    supplier: "",
    notes: "",
  })

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getEquipmentInventory()
      setEquipment(data)
    } catch (error) {
      console.error("Equipment fetch error:", error)
      toast.error("Ekipman verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditEquipment = (equipment: EquipmentInventory) => {
    setEditingEquipment(equipment)
    setEquipmentFormData({
      name: equipment.name,
      model: equipment.model,
      serialNumber: equipment.serialNumber,
      manufacturer: equipment.manufacturer,
      category: equipment.category,
      subCategory: equipment.subCategory,
      location: equipment.location,
      department: equipment.department,
      status: equipment.status,
      condition: equipment.condition,
      purchaseDate: equipment.purchaseDate,
      warrantyExpiry: equipment.warrantyExpiry,
      calibrationFrequency: equipment.calibrationFrequency,
      responsible: equipment.responsible,
      cost: equipment.cost.toString(),
      supplier: equipment.supplier,
      notes: equipment.notes,
    })
    setIsEquipmentDialogOpen(true)
  }

  const handleEquipmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingEquipment) {
        await mockApi.updateEquipment(editingEquipment.id, equipmentFormData)
        toast.success("Ekipman başarıyla güncellendi")
      } else {
        await mockApi.createEquipment(equipmentFormData)
        toast.success("Ekipman başarıyla eklendi")
      }
      setIsEquipmentDialogOpen(false)
      setEditingEquipment(null)
      resetForm()
      fetchEquipment()
    } catch (error) {
      toast.error("Ekipman kaydedilirken hata oluştu")
    }
  }

  const resetForm = () => {
    setEquipmentFormData({
      name: "",
      model: "",
      serialNumber: "",
      manufacturer: "",
      category: "",
      subCategory: "",
      location: "",
      department: "",
      status: "Aktif",
      condition: "Mükemmel",
      purchaseDate: "",
      warrantyExpiry: "",
      calibrationFrequency: "",
      responsible: "",
      cost: "",
      supplier: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      Aktif: "bg-green-100 text-green-800",
      "Bakımda": "bg-blue-100 text-blue-800",
      "Hizmet Dışı": "bg-red-100 text-red-800",
      "Kalibrasyon Gerekli": "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getConditionBadge = (condition: string) => {
    const variants: Record<string, string> = {
      Mükemmel: "bg-green-100 text-green-800",
      İyi: "bg-blue-100 text-blue-800",
      Orta: "bg-yellow-100 text-yellow-800",
      Kötü: "bg-red-100 text-red-800",
    }
    return <Badge className={variants[condition] || "bg-gray-100 text-gray-800"}>{condition}</Badge>
  }

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesDepartment = departmentFilter === "all" || item.department === departmentFilter
    return matchesSearch && matchesStatus && matchesCategory && matchesDepartment
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

  const handleBulkAction = (action: string) => {
    if (selectedEquipment.length === 0) {
      toast.error("Lütfen en az bir ekipman seçin")
      return
    }
    toast.success(`${selectedEquipment.length} ekipman için ${action} işlemi başlatıldı`)
    setSelectedEquipment([])
  }

  const exportInventoryReport = () => {
    toast.success("Envanter raporu indiriliyor...")
  }

  const generateQRCode = (equipmentId: string) => {
    toast.success("QR kod oluşturuldu ve panoya kopyalandı")
  }

  const getCalibrationProgress = (lastCalibration: string, nextCalibration: string) => {
    const last = new Date(lastCalibration)
    const next = new Date(nextCalibration)
    const today = new Date()
    const total = next.getTime() - last.getTime()
    const elapsed = today.getTime() - last.getTime()
    return Math.min(Math.max((elapsed / total) * 100, 0), 100)
  }

  const getDaysUntilCalibration = (nextCalibration: string) => {
    const next = new Date(nextCalibration)
    const today = new Date()
    return Math.ceil((next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  }

  const getWarrantyStatus = (warrantyExpiry: string) => {
    const expiry = new Date(warrantyExpiry)
    const today = new Date()
    const daysLeft = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    
    if (daysLeft < 0) return { status: "Süresi Dolmuş", color: "text-red-600" }
    if (daysLeft <= 30) return { status: `${daysLeft} gün kaldı`, color: "text-yellow-600" }
    return { status: "Geçerli", color: "text-green-600" }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Ekipman Envanteri</h1>
          <p className="text-muted-foreground">Laboratuvar ekipmanlarının detaylı envanter yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? <List className="w-4 h-4 mr-2" /> : <Grid3X3 className="w-4 h-4 mr-2" />}
            {viewMode === "grid" ? "Liste" : "Grid"} Görünümü
          </Button>
          <Button variant="outline" onClick={exportInventoryReport}>
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
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
            <div className="text-2xl font-bold">{equipment.filter((e) => e.status === "Aktif").length}</div>
            <p className="text-xs text-muted-foreground">Kullanımda olan ekipman</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kritik Ekipman</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.filter((e) => e.isCritical).length}</div>
            <p className="text-xs text-muted-foreground">Kritik öneme sahip</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Değer</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {equipment.reduce((sum, e) => sum + e.cost, 0).toLocaleString("tr-TR")} ₺
            </div>
            <p className="text-xs text-muted-foreground">Ekipman toplam değeri</p>
          </CardContent>
        </Card>
      </div>

      {/* Arama ve Filtreleme */}
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
                placeholder="Ekipman adı, model, seri no veya üretici ara..."
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
                <SelectItem value="Aktif">Aktif</SelectItem>
                <SelectItem value="Bakımda">Bakımda</SelectItem>
                <SelectItem value="Hizmet Dışı">Hizmet Dışı</SelectItem>
                <SelectItem value="Kalibrasyon Gerekli">Kalibrasyon Gerekli</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="Analitik Cihazlar">Analitik Cihazlar</SelectItem>
                <SelectItem value="Spektroskopik Cihazlar">Spektroskopik Cihazlar</SelectItem>
                <SelectItem value="Kromatografik Cihazlar">Kromatografik Cihazlar</SelectItem>
                <SelectItem value="Elektrokimyasal Cihazlar">Elektrokimyasal Cihazlar</SelectItem>
                <SelectItem value="Genel Laboratuvar Cihazları">Genel Laboratuvar Cihazları</SelectItem>
                <SelectItem value="Görüntüleme Cihazları">Görüntüleme Cihazları</SelectItem>
                <SelectItem value="İnkübatör ve Fırınlar">İnkübatör ve Fırınlar</SelectItem>
                <SelectItem value="Soğutma Cihazları">Soğutma Cihazları</SelectItem>
              </SelectContent>
            </Select>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Departman filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Departmanlar</SelectItem>
                <SelectItem value="Kimya Laboratuvarı">Kimya Laboratuvarı</SelectItem>
                <SelectItem value="Fizikokimya Laboratuvarı">Fizikokimya Laboratuvarı</SelectItem>
                <SelectItem value="Analitik Kimya Laboratuvarı">Analitik Kimya Laboratuvarı</SelectItem>
                <SelectItem value="Biyokimya Laboratuvarı">Biyokimya Laboratuvarı</SelectItem>
                <SelectItem value="Mikrobiyoloji Laboratuvarı">Mikrobiyoloji Laboratuvarı</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Toplu İşlemler */}
      {selectedEquipment.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Toplu İşlemler ({selectedEquipment.length} ekipman seçildi)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleBulkAction("Kalibrasyon Planla")}>
                <Calendar className="w-4 h-4 mr-2" />
                Kalibrasyon Planla
              </Button>
              <Button variant="outline" onClick={() => handleBulkAction("Bakım Planla")}>
                <Wrench className="w-4 h-4 mr-2" />
                Bakım Planla
              </Button>
              <Button variant="outline" onClick={() => handleBulkAction("QR Kod Oluştur")}>
                <QrCode className="w-4 h-4 mr-2" />
                QR Kod Oluştur
              </Button>
              <Button variant="outline" onClick={() => handleBulkAction("Rapor Oluştur")}>
                <FileText className="w-4 h-4 mr-2" />
                Rapor Oluştur
              </Button>
              <Button variant="outline" onClick={() => setSelectedEquipment([])}>
                <Trash2 className="w-4 h-4 mr-2" />
                Seçimi Temizle
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Envanter Listesi</TabsTrigger>
          <TabsTrigger value="analytics">Analitik Görünüm</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ekipman Envanteri</h2>
            <div className="flex gap-2">
              <Dialog
                open={isEquipmentDialogOpen}
                onOpenChange={(open) => {
                  setIsEquipmentDialogOpen(open)
                  if (!open) {
                    setEditingEquipment(null)
                    resetForm()
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
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, serialNumber: e.target.value })}
                          placeholder="Seri numarası"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="manufacturer">Üretici *</Label>
                        <Input
                          id="manufacturer"
                          value={equipmentFormData.manufacturer}
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, manufacturer: e.target.value })}
                          placeholder="Üretici firma"
                          required
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
                            <SelectItem value="Analitik Cihazlar">Analitik Cihazlar</SelectItem>
                            <SelectItem value="Spektroskopik Cihazlar">Spektroskopik Cihazlar</SelectItem>
                            <SelectItem value="Kromatografik Cihazlar">Kromatografik Cihazlar</SelectItem>
                            <SelectItem value="Elektrokimyasal Cihazlar">Elektrokimyasal Cihazlar</SelectItem>
                            <SelectItem value="Genel Laboratuvar Cihazları">Genel Laboratuvar Cihazları</SelectItem>
                            <SelectItem value="Görüntüleme Cihazları">Görüntüleme Cihazları</SelectItem>
                            <SelectItem value="İnkübatör ve Fırınlar">İnkübatör ve Fırınlar</SelectItem>
                            <SelectItem value="Soğutma Cihazları">Soğutma Cihazları</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subCategory">Alt Kategori</Label>
                        <Input
                          id="subCategory"
                          value={equipmentFormData.subCategory}
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, subCategory: e.target.value })}
                          placeholder="Alt kategori"
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
                        <Label htmlFor="department">Departman *</Label>
                        <Select
                          value={equipmentFormData.department}
                          onValueChange={(value) => setEquipmentFormData({ ...equipmentFormData, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Departman seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Kimya Laboratuvarı">Kimya Laboratuvarı</SelectItem>
                            <SelectItem value="Fizikokimya Laboratuvarı">Fizikokimya Laboratuvarı</SelectItem>
                            <SelectItem value="Analitik Kimya Laboratuvarı">Analitik Kimya Laboratuvarı</SelectItem>
                            <SelectItem value="Biyokimya Laboratuvarı">Biyokimya Laboratuvarı</SelectItem>
                            <SelectItem value="Mikrobiyoloji Laboratuvarı">Mikrobiyoloji Laboratuvarı</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Durum *</Label>
                        <Select
                          value={equipmentFormData.status}
                          onValueChange={(value) => setEquipmentFormData({ ...equipmentFormData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Bakımda">Bakımda</SelectItem>
                            <SelectItem value="Hizmet Dışı">Hizmet Dışı</SelectItem>
                            <SelectItem value="Kalibrasyon Gerekli">Kalibrasyon Gerekli</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="condition">Durum *</Label>
                        <Select
                          value={equipmentFormData.condition}
                          onValueChange={(value) => setEquipmentFormData({ ...equipmentFormData, condition: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mükemmel">Mükemmel</SelectItem>
                            <SelectItem value="İyi">İyi</SelectItem>
                            <SelectItem value="Orta">Orta</SelectItem>
                            <SelectItem value="Kötü">Kötü</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="purchaseDate">Satın Alma Tarihi</Label>
                        <Input
                          id="purchaseDate"
                          type="date"
                          value={equipmentFormData.purchaseDate}
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, purchaseDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="warrantyExpiry">Garanti Bitiş Tarihi</Label>
                        <Input
                          id="warrantyExpiry"
                          type="date"
                          value={equipmentFormData.warrantyExpiry}
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, warrantyExpiry: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="responsible">Sorumlu Kişi *</Label>
                        <Input
                          id="responsible"
                          value={equipmentFormData.responsible}
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, responsible: e.target.value })}
                          placeholder="Sorumlu personel"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cost">Maliyet (₺)</Label>
                        <Input
                          id="cost"
                          type="number"
                          value={equipmentFormData.cost}
                          onChange={(e) => setEquipmentFormData({ ...equipmentFormData, cost: e.target.value })}
                          placeholder="Ekipman maliyeti"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supplier">Tedarikçi</Label>
                      <Input
                        id="supplier"
                        value={equipmentFormData.supplier}
                        onChange={(e) => setEquipmentFormData({ ...equipmentFormData, supplier: e.target.value })}
                        placeholder="Tedarikçi firma"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea
                        id="notes"
                        value={equipmentFormData.notes}
                        onChange={(e) => setEquipmentFormData({ ...equipmentFormData, notes: e.target.value })}
                        placeholder="Ekipman hakkında özel notlar"
                        rows={3}
                      />
                    </div>

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

          {/* Ekipman Listesi */}
          <Card>
            <CardHeader>
              <CardTitle>Ekipman Listesi</CardTitle>
              <CardDescription>
                Tüm laboratuvar ekipmanları ve detaylı bilgileri
                {searchTerm && ` - "${searchTerm}" için ${filteredEquipment.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "list" ? (
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
                      <TableHead>Kategori</TableHead>
                      <TableHead>Konum</TableHead>
                      <TableHead>Durum</TableHead>
                      <TableHead>Kalibrasyon</TableHead>
                      <TableHead>Garanti</TableHead>
                      <TableHead>Maliyet</TableHead>
                      <TableHead>İşlemler</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEquipment.map((item) => {
                      const daysUntilCalibration = getDaysUntilCalibration(item.nextCalibration)
                      const warrantyStatus = getWarrantyStatus(item.warrantyExpiry)
                      return (
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
                              <div className="text-sm text-muted-foreground">{item.manufacturer} {item.model}</div>
                              <div className="text-xs text-muted-foreground">SN: {item.serialNumber}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{item.category}</div>
                              <div className="text-xs text-muted-foreground">{item.subCategory}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="text-sm">{item.location}</div>
                              <div className="text-xs text-muted-foreground">{item.department}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {getStatusBadge(item.status)}
                              {getConditionBadge(item.condition)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <Progress
                                value={getCalibrationProgress(item.lastCalibration, item.nextCalibration)}
                                className="h-2"
                              />
                              <div className="text-xs text-muted-foreground">
                                Son: {item.lastCalibration}
                              </div>
                              <div className="text-xs">
                                Sonraki: {item.nextCalibration}
                                {daysUntilCalibration <= 30 && daysUntilCalibration >= 0 && (
                                  <Badge variant="secondary" className="ml-1 text-xs">
                                    {daysUntilCalibration}g
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className={`text-sm ${warrantyStatus.color}`}>
                              {warrantyStatus.status}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Bitiş: {item.warrantyExpiry}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm font-medium">
                              {item.cost.toLocaleString("tr-TR")} ₺
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.supplier}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditEquipment(item)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="QR Kod Oluştur" onClick={() => generateQRCode(item.id)}>
                                <QrCode className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEquipment.map((item) => {
                    const daysUntilCalibration = getDaysUntilCalibration(item.nextCalibration)
                    const warrantyStatus = getWarrantyStatus(item.warrantyExpiry)
                    return (
                      <Card key={item.id} className="relative">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{item.name}</CardTitle>
                              <CardDescription>{item.manufacturer} {item.model}</CardDescription>
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditEquipment(item)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center">
                            {getStatusBadge(item.status)}
                            {getConditionBadge(item.condition)}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Kategori:</span>
                              <span>{item.category}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Konum:</span>
                              <span>{item.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Sorumlu:</span>
                              <span>{item.responsible}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Maliyet:</span>
                              <span className="font-medium">{item.cost.toLocaleString("tr-TR")} ₺</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="text-sm">
                              <div className="flex justify-between text-muted-foreground mb-1">
                                <span>Kalibrasyon</span>
                                <span>{daysUntilCalibration}g kaldı</span>
                              </div>
                              <Progress
                                value={getCalibrationProgress(item.lastCalibration, item.nextCalibration)}
                                className="h-2"
                              />
                            </div>
                            <div className="text-sm">
                              <div className="flex justify-between text-muted-foreground mb-1">
                                <span>Garanti</span>
                                <span className={warrantyStatus.color}>{warrantyStatus.status}</span>
                              </div>
                            </div>
                          </div>
                          {item.isCritical && (
                            <Badge variant="destructive" className="w-full justify-center">
                              <Shield className="w-3 h-3 mr-1" />
                              Kritik Ekipman
                            </Badge>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Kategori Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(equipment.map(e => e.category))).map(category => {
                    const count = equipment.filter(e => e.category === category).length
                    const percentage = (count / equipment.length) * 100
                    return (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm">{category}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Durum Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(equipment.map(e => e.status))).map(status => {
                    const count = equipment.filter(e => e.status === status).length
                    const percentage = (count / equipment.length) * 100
                    return (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-sm">{status}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Maliyet Analizi</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {equipment.reduce((sum, e) => sum + e.cost, 0).toLocaleString("tr-TR")} ₺
                  </div>
                  <div className="text-sm text-muted-foreground">Toplam Değer</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(equipment.reduce((sum, e) => sum + e.cost, 0) / equipment.length).toLocaleString("tr-TR")} ₺
                  </div>
                  <div className="text-sm text-muted-foreground">Ortalama Değer</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {equipment.filter(e => e.isCritical).reduce((sum, e) => sum + e.cost, 0).toLocaleString("tr-TR")} ₺
                  </div>
                  <div className="text-sm text-muted-foreground">Kritik Ekipman Değeri</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
