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
  Calendar,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Target,
  TrendingUp,
  BarChart3,
  Clock,
  CheckSquare,
  XCircle,
  AlertCircle,
  Package,
  MapPin,
  Thermometer,
  Droplets,
  Shield,
  Activity,
} from "lucide-react"
import { toast } from "sonner"

interface Sample {
  id: string
  sampleNumber: string
  clientName: string
  clientCode: string
  sampleType: string
  testType: string
  receivedDate: string
  analysisStartDate: string
  analysisEndDate: string
  status: string
  priority: string
  location: string
  storageConditions: {
    temperature: string
    humidity: string
    light: string
    other: string
  }
  quantity: string
  unit: string
  description: string
  appearance: string
  packaging: string
  preservationMethod: string
  chainOfCustody: Array<{
    date: string
    person: string
    action: string
    location: string
  }>
  testParameters: Array<{
    parameter: string
    method: string
    limit: string
    unit: string
  }>
  results: Array<{
    parameter: string
    result: string
    unit: string
    status: string
    analyst: string
    date: string
  }>
  qualityControl: {
    blankResult: string
    spikeRecovery: string
    duplicateResult: string
    status: string
  }
  disposalMethod: string
  disposalDate: string
  retentionPeriod: string
  responsible: string
  notes: string
  attachments: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  createdAt: string
  updatedAt: string
}

export default function SampleManagementPage() {
  const [samples, setSamples] = useState<Sample[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("samples")

  // Dialog states
  const [isSampleDialogOpen, setIsSampleDialogOpen] = useState(false)
  const [editingSample, setEditingSample] = useState<Sample | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedSamples, setSelectedSamples] = useState<string[]>([])

  // Form data
  const [sampleFormData, setSampleFormData] = useState({
    sampleNumber: "",
    clientName: "",
    clientCode: "",
    sampleType: "",
    testType: "",
    receivedDate: "",
    analysisStartDate: "",
    analysisEndDate: "",
    priority: "Normal",
    location: "",
    quantity: "",
    unit: "g",
    description: "",
    appearance: "",
    packaging: "",
    preservationMethod: "",
    disposalMethod: "",
    retentionPeriod: "",
    responsible: "",
    notes: "",
  })

  useEffect(() => {
    fetchSamples()
  }, [])

  const fetchSamples = async () => {
    try {
      setIsLoading(true)
      // Mock data for samples
      const mockData: Sample[] = [
        {
          id: "smp-001",
          sampleNumber: "SMP-2024-001",
          clientName: "ABC Gıda San. Tic. Ltd. Şti.",
          clientCode: "CL-001",
          sampleType: "Gıda",
          testType: "Mikrobiyolojik Analiz",
          receivedDate: "2024-03-15",
          analysisStartDate: "2024-03-16",
          analysisEndDate: "2024-03-20",
          status: "Analiz Tamamlandı",
          priority: "Normal",
          location: "Soğuk Oda A-1",
          storageConditions: {
            temperature: "2-8°C",
            humidity: "60-70% RH",
            light: "Karanlık",
            other: "Havalandırmalı"
          },
          quantity: "250",
          unit: "g",
          description: "Tavuk eti örneği - mikrobiyolojik analiz için",
          appearance: "Taze, normal renk",
          packaging: "Steril plastik torba",
          preservationMethod: "Soğuk zincir",
          chainOfCustody: [
            { date: "2024-03-15 09:00", person: "Ahmet Yılmaz", action: "Numune kabul", location: "Kabul Masası" },
            { date: "2024-03-15 09:30", person: "Fatma Demir", action: "Soğuk odaya transfer", location: "Soğuk Oda A-1" },
            { date: "2024-03-16 08:00", person: "Mehmet Kaya", action: "Analiz başlatıldı", location: "Mikrobiyoloji Lab" },
          ],
          testParameters: [
            { parameter: "Toplam Mezofil Aerobik Bakteri", method: "TS EN ISO 4833-1", limit: "<10⁴", unit: "CFU/g" },
            { parameter: "E.coli", method: "TS EN ISO 16649-2", limit: "<10²", unit: "CFU/g" },
            { parameter: "Salmonella", method: "TS EN ISO 6579-1", limit: "Yok", unit: "25g" },
          ],
          results: [
            { parameter: "Toplam Mezofil Aerobik Bakteri", result: "2.3x10³", unit: "CFU/g", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-18" },
            { parameter: "E.coli", result: "<10", unit: "CFU/g", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-18" },
            { parameter: "Salmonella", result: "Yok", unit: "25g", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-20" },
          ],
          qualityControl: {
            blankResult: "Negatif",
            spikeRecovery: "95%",
            duplicateResult: "Uyumlu",
            status: "Başarılı"
          },
          disposalMethod: "Otoklav + Atık",
          disposalDate: "2024-04-15",
          retentionPeriod: "30 gün",
          responsible: "Mehmet Kaya",
          notes: "Numune analizi başarıyla tamamlandı. Tüm parametreler limit değerlerin altında.",
          attachments: [
            { name: "analiz_raporu_smp001.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-03-20" },
            { name: "kalite_kontrol_smp001.pdf", type: "PDF", size: "0.8 MB", uploadDate: "2024-03-20" },
          ],
          createdAt: "2024-03-15",
          updatedAt: "2024-03-20",
        },
        {
          id: "smp-002",
          sampleNumber: "SMP-2024-002",
          clientName: "XYZ Kimya A.Ş.",
          clientCode: "CL-002",
          sampleType: "Su",
          testType: "Kimyasal Analiz",
          receivedDate: "2024-03-18",
          analysisStartDate: "2024-03-19",
          analysisEndDate: "2024-03-22",
          status: "Analiz Devam Ediyor",
          priority: "Yüksek",
          location: "Oda Sıcaklığı B-2",
          storageConditions: {
            temperature: "20±2°C",
            humidity: "50-60% RH",
            light: "Normal",
            other: "Havalandırmalı"
          },
          quantity: "1000",
          unit: "mL",
          description: "İçme suyu örneği - kimyasal parametreler analizi",
          appearance: "Berrak, renksiz",
          packaging: "Cam şişe",
          preservationMethod: "Asitlendirme",
          chainOfCustody: [
            { date: "2024-03-18 14:00", person: "Ahmet Yılmaz", action: "Numune kabul", location: "Kabul Masası" },
            { date: "2024-03-18 14:30", person: "Fatma Demir", action: "Depolama", location: "Oda Sıcaklığı B-2" },
            { date: "2024-03-19 09:00", person: "Mehmet Kaya", action: "Analiz başlatıldı", location: "Kimya Lab" },
          ],
          testParameters: [
            { parameter: "pH", method: "TS 266", limit: "6.5-8.5", unit: "-" },
            { parameter: "Toplam Sertlik", method: "TS 266", limit: "<15", unit: "°F" },
            { parameter: "Klorür", method: "TS 266", limit: "<250", unit: "mg/L" },
            { parameter: "Sülfat", method: "TS 266", limit: "<250", unit: "mg/L" },
          ],
          results: [
            { parameter: "pH", result: "7.2", unit: "-", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-19" },
            { parameter: "Toplam Sertlik", result: "12.5", unit: "°F", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-20" },
            { parameter: "Klorür", result: "Analiz devam ediyor", unit: "mg/L", status: "Beklemede", analyst: "Mehmet Kaya", date: "" },
            { parameter: "Sülfat", result: "Analiz devam ediyor", unit: "mg/L", status: "Beklemede", analyst: "Mehmet Kaya", date: "" },
          ],
          qualityControl: {
            blankResult: "Negatif",
            spikeRecovery: "98%",
            duplicateResult: "Uyumlu",
            status: "Devam Ediyor"
          },
          disposalMethod: "Nötralizasyon + Atık",
          disposalDate: "",
          retentionPeriod: "30 gün",
          responsible: "Mehmet Kaya",
          notes: "Analiz devam ediyor. pH ve sertlik analizleri tamamlandı.",
          attachments: [],
          createdAt: "2024-03-18",
          updatedAt: "2024-03-20",
        },
      ]
      setSamples(mockData)
    } catch (error) {
      console.error("Samples fetch error:", error)
      toast.error("Numune verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditSample = (sample: Sample) => {
    setEditingSample(sample)
    setSampleFormData({
      sampleNumber: sample.sampleNumber,
      clientName: sample.clientName,
      clientCode: sample.clientCode,
      sampleType: sample.sampleType,
      testType: sample.testType,
      receivedDate: sample.receivedDate,
      analysisStartDate: sample.analysisStartDate,
      analysisEndDate: sample.analysisEndDate,
      priority: sample.priority,
      location: sample.location,
      quantity: sample.quantity,
      unit: sample.unit,
      description: sample.description,
      appearance: sample.appearance,
      packaging: sample.packaging,
      preservationMethod: sample.preservationMethod,
      disposalMethod: sample.disposalMethod,
      retentionPeriod: sample.retentionPeriod,
      responsible: sample.responsible,
      notes: sample.notes,
    })
    setIsSampleDialogOpen(true)
  }

  const handleSampleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingSample) {
        toast.success("Numune başarıyla güncellendi")
      } else {
        toast.success("Numune başarıyla kaydedildi")
      }
      setIsSampleDialogOpen(false)
      setEditingSample(null)
      resetForm()
      fetchSamples()
    } catch (error) {
      toast.error("Numune kaydedilirken hata oluştu")
    }
  }

  const resetForm = () => {
    setSampleFormData({
      sampleNumber: "",
      clientName: "",
      clientCode: "",
      sampleType: "",
      testType: "",
      receivedDate: "",
      analysisStartDate: "",
      analysisEndDate: "",
      priority: "Normal",
      location: "",
      quantity: "",
      unit: "g",
      description: "",
      appearance: "",
      packaging: "",
      preservationMethod: "",
      disposalMethod: "",
      retentionPeriod: "",
      responsible: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Numune Kabul Edildi": "bg-blue-100 text-blue-800",
      "Analiz Başladı": "bg-yellow-100 text-yellow-800",
      "Analiz Devam Ediyor": "bg-orange-100 text-orange-800",
      "Analiz Tamamlandı": "bg-green-100 text-green-800",
      "Rapor Hazırlandı": "bg-green-100 text-green-800",
      "Numune İmha Edildi": "bg-gray-100 text-gray-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Normal": "bg-blue-100 text-blue-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
  }

  const filteredSamples = samples.filter((sample) => {
    const matchesSearch = 
      sample.sampleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.clientCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.sampleType.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sample.status === statusFilter
    const matchesType = typeFilter === "all" || sample.sampleType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedSamples(filteredSamples.map((sample) => sample.id))
    } else {
      setSelectedSamples([])
    }
  }

  const handleSelectSample = (sampleId: string, checked: boolean) => {
    if (checked) {
      setSelectedSamples([...selectedSamples, sampleId])
    } else {
      setSelectedSamples(selectedSamples.filter((id) => id !== sampleId))
    }
  }

  const exportSampleReport = () => {
    toast.success("Numune raporu indiriliyor...")
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
          <h1 className="text-3xl font-bold text-foreground">Numune Yönetimi</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu numune kabul, takip ve analiz süreçleri</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportSampleReport}>
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Numune</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{samples.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı numune sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analiz Tamamlandı</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{samples.filter((s) => s.status === "Analiz Tamamlandı").length}</div>
            <p className="text-xs text-muted-foreground">Tamamlanan analizler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devam Eden</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{samples.filter((s) => s.status.includes("Devam")).length}</div>
            <p className="text-xs text-muted-foreground">Aktif analizler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yüksek Öncelik</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{samples.filter((s) => s.priority === "Yüksek").length}</div>
            <p className="text-xs text-muted-foreground">Acil numuneler</p>
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
                placeholder="Numune no, müşteri adı veya kod ara..."
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
                <SelectItem value="Numune Kabul Edildi">Numune Kabul Edildi</SelectItem>
                <SelectItem value="Analiz Başladı">Analiz Başladı</SelectItem>
                <SelectItem value="Analiz Devam Ediyor">Analiz Devam Ediyor</SelectItem>
                <SelectItem value="Analiz Tamamlandı">Analiz Tamamlandı</SelectItem>
                <SelectItem value="Rapor Hazırlandı">Rapor Hazırlandı</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="Gıda">Gıda</SelectItem>
                <SelectItem value="Su">Su</SelectItem>
                <SelectItem value="Toprak">Toprak</SelectItem>
                <SelectItem value="Hava">Hava</SelectItem>
                <SelectItem value="Atık">Atık</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="samples">Numuneler</TabsTrigger>
          <TabsTrigger value="chain-of-custody">Zincir Sorumluluğu</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="samples" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Numune Listesi</h2>
            <div className="flex gap-2">
              <Dialog
                open={isSampleDialogOpen}
                onOpenChange={(open) => {
                  setIsSampleDialogOpen(open)
                  if (!open) {
                    setEditingSample(null)
                    resetForm()
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Numune
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingSample ? "Numune Düzenle" : "Yeni Numune Kaydı"}</DialogTitle>
                    <DialogDescription>
                      {editingSample ? "Numune bilgilerini güncelleyin" : "Yeni numune kaydı oluşturun"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSampleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="sampleNumber">Numune Numarası *</Label>
                        <Input
                          id="sampleNumber"
                          value={sampleFormData.sampleNumber}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, sampleNumber: e.target.value })}
                          placeholder="SMP-2024-XXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="clientName">Müşteri Adı *</Label>
                        <Input
                          id="clientName"
                          value={sampleFormData.clientName}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, clientName: e.target.value })}
                          placeholder="Müşteri firma adı"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientCode">Müşteri Kodu</Label>
                        <Input
                          id="clientCode"
                          value={sampleFormData.clientCode}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, clientCode: e.target.value })}
                          placeholder="CL-XXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sampleType">Numune Tipi *</Label>
                        <Select
                          value={sampleFormData.sampleType}
                          onValueChange={(value) => setSampleFormData({ ...sampleFormData, sampleType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tip seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Gıda">Gıda</SelectItem>
                            <SelectItem value="Su">Su</SelectItem>
                            <SelectItem value="Toprak">Toprak</SelectItem>
                            <SelectItem value="Hava">Hava</SelectItem>
                            <SelectItem value="Atık">Atık</SelectItem>
                            <SelectItem value="Diğer">Diğer</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="testType">Analiz Tipi *</Label>
                        <Input
                          id="testType"
                          value={sampleFormData.testType}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, testType: e.target.value })}
                          placeholder="Mikrobiyolojik, Kimyasal, vb."
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Öncelik *</Label>
                        <Select
                          value={sampleFormData.priority}
                          onValueChange={(value) => setSampleFormData({ ...sampleFormData, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Öncelik seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yüksek">Yüksek</SelectItem>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Düşük">Düşük</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="receivedDate">Kabul Tarihi *</Label>
                        <Input
                          id="receivedDate"
                          type="date"
                          value={sampleFormData.receivedDate}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, receivedDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="analysisStartDate">Analiz Başlangıç</Label>
                        <Input
                          id="analysisStartDate"
                          type="date"
                          value={sampleFormData.analysisStartDate}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, analysisStartDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="analysisEndDate">Analiz Bitiş</Label>
                        <Input
                          id="analysisEndDate"
                          type="date"
                          value={sampleFormData.analysisEndDate}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, analysisEndDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Depolama Konumu</Label>
                        <Input
                          id="location"
                          value={sampleFormData.location}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, location: e.target.value })}
                          placeholder="Soğuk Oda A-1"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="responsible">Sorumlu</Label>
                        <Input
                          id="responsible"
                          value={sampleFormData.responsible}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, responsible: e.target.value })}
                          placeholder="Sorumlu personel"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="quantity">Miktar</Label>
                        <Input
                          id="quantity"
                          value={sampleFormData.quantity}
                          onChange={(e) => setSampleFormData({ ...sampleFormData, quantity: e.target.value })}
                          placeholder="250"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="unit">Birim</Label>
                        <Select
                          value={sampleFormData.unit}
                          onValueChange={(value) => setSampleFormData({ ...sampleFormData, unit: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Birim seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="g">g (gram)</SelectItem>
                            <SelectItem value="kg">kg (kilogram)</SelectItem>
                            <SelectItem value="mL">mL (mililitre)</SelectItem>
                            <SelectItem value="L">L (litre)</SelectItem>
                            <SelectItem value="adet">adet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Açıklama</Label>
                      <Textarea
                        id="description"
                        value={sampleFormData.description}
                        onChange={(e) => setSampleFormData({ ...sampleFormData, description: e.target.value })}
                        placeholder="Numune hakkında detaylı açıklama"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea
                        id="notes"
                        value={sampleFormData.notes}
                        onChange={(e) => setSampleFormData({ ...sampleFormData, notes: e.target.value })}
                        placeholder="Özel notlar"
                        rows={2}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsSampleDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button type="submit">{editingSample ? "Güncelle" : "Kaydet"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Numune Listesi</CardTitle>
              <CardDescription>
                Tüm numuneler ve analiz durumları
                {searchTerm && ` - "${searchTerm}" için ${filteredSamples.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedSamples.length === filteredSamples.length && filteredSamples.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Numune No</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Tip/Analiz</TableHead>
                    <TableHead>Tarihler</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Konum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSamples.map((sample) => (
                    <TableRow key={sample.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedSamples.includes(sample.id)}
                          onCheckedChange={(checked) => handleSelectSample(sample.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{sample.sampleNumber}</div>
                        <div className="text-sm text-muted-foreground">{sample.clientCode}</div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{sample.clientName}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{sample.sampleType}</div>
                          <div className="text-xs text-muted-foreground">{sample.testType}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Kabul: {sample.receivedDate}</div>
                          <div>Başlangıç: {sample.analysisStartDate}</div>
                          <div>Bitiş: {sample.analysisEndDate}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(sample.status)}</TableCell>
                      <TableCell>{getPriorityBadge(sample.priority)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{sample.location}</div>
                        <div className="text-xs text-muted-foreground">{sample.quantity} {sample.unit}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditSample(sample)}>
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

        <TabsContent value="chain-of-custody" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zincir Sorumluluğu</CardTitle>
              <CardDescription>Numunelerin el değiştirme geçmişi ve sorumluluk zinciri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {samples.map((sample) => (
                  <Card key={sample.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium">{sample.sampleNumber}</div>
                        <div className="text-sm text-muted-foreground">{sample.clientName} - {sample.sampleType}</div>
                      </div>
                      <Badge variant="outline">{sample.status}</Badge>
                    </div>
                    <div className="space-y-2">
                      {sample.chainOfCustody.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-4 p-2 bg-muted rounded">
                          <div className="text-sm font-medium">{entry.date}</div>
                          <div className="text-sm">{entry.person}</div>
                          <div className="text-sm">{entry.action}</div>
                          <div className="text-sm text-muted-foreground">{entry.location}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Numune Tipi Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(samples.map(s => s.sampleType))).map(type => {
                    const count = samples.filter(s => s.sampleType === type).length
                    const percentage = (count / samples.length) * 100
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-sm">{type}</span>
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
                  {Array.from(new Set(samples.map(s => s.status))).map(status => {
                    const count = samples.filter(s => s.status === status).length
                    const percentage = (count / samples.length) * 100
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
        </TabsContent>
      </Tabs>
    </div>
  )
}
