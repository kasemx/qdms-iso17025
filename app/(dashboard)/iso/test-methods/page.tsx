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
  FlaskConical,
  BookOpen,
  Shield,
  Activity,
  Zap,
  Settings,
} from "lucide-react"
import { toast } from "sonner"

interface TestMethod {
  id: string
  methodCode: string
  methodName: string
  category: string
  subCategory: string
  version: string
  status: string
  scope: string
  principle: string
  equipment: Array<{
    name: string
    model: string
    required: boolean
  }>
  reagents: Array<{
    name: string
    purity: string
    supplier: string
    required: boolean
  }>
  parameters: Array<{
    parameter: string
    range: string
    unit: string
    limit: string
    uncertainty: string
  }>
  validation: {
    accuracy: string
    precision: string
    linearity: string
    limitOfDetection: string
    limitOfQuantification: string
    robustness: string
    status: string
    validatedBy: string
    validationDate: string
    nextValidation: string
  }
  qualityControl: {
    frequency: string
    criteria: string
    action: string
  }
  safety: {
    hazards: string[]
    precautions: string[]
    ppe: string[]
    wasteDisposal: string
  }
  references: Array<{
    type: string
    code: string
    title: string
    year: string
  }>
  attachments: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  responsible: string
  reviewer: string
  approver: string
  effectiveDate: string
  reviewDate: string
  notes: string
  createdAt: string
  updatedAt: string
}

export default function TestMethodsPage() {
  const [methods, setMethods] = useState<TestMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("methods")

  // Dialog states
  const [isMethodDialogOpen, setIsMethodDialogOpen] = useState(false)
  const [editingMethod, setEditingMethod] = useState<TestMethod | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedMethods, setSelectedMethods] = useState<string[]>([])

  // Form data
  const [methodFormData, setMethodFormData] = useState({
    methodCode: "",
    methodName: "",
    category: "",
    subCategory: "",
    version: "1.0",
    status: "Aktif",
    scope: "",
    principle: "",
    responsible: "",
    reviewer: "",
    approver: "",
    effectiveDate: "",
    reviewDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchMethods()
  }, [])

  const fetchMethods = async () => {
    try {
      setIsLoading(true)
      // Mock data for test methods
      const mockData: TestMethod[] = [
        {
          id: "tm-001",
          methodCode: "TM-001",
          methodName: "Toplam Mezofil Aerobik Bakteri Sayımı",
          category: "Mikrobiyoloji",
          subCategory: "Gıda Mikrobiyolojisi",
          version: "2.1",
          status: "Aktif",
          scope: "Gıda maddelerinde toplam mezofil aerobik bakteri sayısının tayini",
          principle: "Numune homojenizasyonu sonrası uygun seyreltme yapılarak Plate Count Agar besiyerinde 30°C'de 72±3 saat inkübasyon",
          equipment: [
            { name: "Otoklav", model: "Tuttnauer 3870EA", required: true },
            { name: "İnkübatör", model: "Memmert INB 400", required: true },
            { name: "Analitik Terazi", model: "Sartorius Quintix 224-1S", required: true },
            { name: "Vortex", model: "IKA MS 3", required: false },
          ],
          reagents: [
            { name: "Plate Count Agar", purity: "Analitik", supplier: "Merck", required: true },
            { name: "Peptone Water", purity: "Analitik", supplier: "Merck", required: true },
            { name: "Steril Distile Su", purity: "Analitik", supplier: "Merck", required: true },
          ],
          parameters: [
            { parameter: "İnkübasyon Sıcaklığı", range: "30±1°C", unit: "°C", limit: "30±1°C", uncertainty: "±0.5°C" },
            { parameter: "İnkübasyon Süresi", range: "72±3 saat", unit: "saat", limit: "72±3 saat", uncertainty: "±1 saat" },
            { parameter: "pH", range: "7.0±0.2", unit: "-", limit: "7.0±0.2", uncertainty: "±0.1" },
          ],
          validation: {
            accuracy: "95-105%",
            precision: "CV <10%",
            linearity: "R² >0.99",
            limitOfDetection: "10 CFU/g",
            limitOfQuantification: "100 CFU/g",
            robustness: "Uygun",
            status: "Geçerli",
            validatedBy: "Dr. Mehmet Kaya",
            validationDate: "2024-01-15",
            nextValidation: "2025-01-15",
          },
          qualityControl: {
            frequency: "Her analiz serisinde",
            criteria: "Negatif kontrol negatif, pozitif kontrol pozitif",
            action: "Kriterler karşılanmazsa analiz tekrarlanır",
          },
          safety: {
            hazards: ["Mikrobiyolojik kontaminasyon", "Kimyasal maruziyet"],
            precautions: ["Steril teknik kullanımı", "Kişisel hijyen"],
            ppe: ["Laboratuvar önlüğü", "Eldiven", "Maske"],
            wasteDisposal: "Otoklav + Atık",
          },
          references: [
            { type: "Standart", code: "TS EN ISO 4833-1", title: "Mikrobiyoloji - Genel rehber", year: "2013" },
            { type: "Standart", code: "TS EN ISO 7218", title: "Mikrobiyoloji - Genel kurallar", year: "2007" },
          ],
          attachments: [
            { name: "tm001_prosedur.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-01-15" },
            { name: "tm001_validasyon_raporu.pdf", type: "PDF", size: "1.8 MB", uploadDate: "2024-01-15" },
          ],
          responsible: "Dr. Mehmet Kaya",
          reviewer: "Dr. Fatma Demir",
          approver: "Dr. Ahmet Yılmaz",
          effectiveDate: "2024-01-20",
          reviewDate: "2025-01-20",
          notes: "Metot başarıyla validasyonu tamamlandı ve aktif kullanıma alındı.",
          createdAt: "2024-01-10",
          updatedAt: "2024-01-20",
        },
        {
          id: "tm-002",
          methodCode: "TM-002",
          methodName: "pH Tayini",
          category: "Kimyasal Analiz",
          subCategory: "Fizikokimyasal Analiz",
          version: "1.3",
          status: "Aktif",
          scope: "Sıvı numunelerde pH değerinin tayini",
          principle: "pH elektrodu ile numunenin pH değerinin ölçülmesi",
          equipment: [
            { name: "pH Metre", model: "Mettler Toledo SevenCompact", required: true },
            { name: "pH Elektrodu", model: "InLab Expert Pro", required: true },
            { name: "Magnetik Karıştırıcı", model: "IKA RCT", required: false },
          ],
          reagents: [
            { name: "pH 4.0 Buffer", purity: "Analitik", supplier: "Merck", required: true },
            { name: "pH 7.0 Buffer", purity: "Analitik", supplier: "Merck", required: true },
            { name: "pH 9.0 Buffer", purity: "Analitik", supplier: "Merck", required: true },
          ],
          parameters: [
            { parameter: "Ölçüm Sıcaklığı", range: "20±2°C", unit: "°C", limit: "20±2°C", uncertainty: "±0.1°C" },
            { parameter: "Hassasiyet", range: "±0.01 pH", unit: "pH", limit: "±0.01 pH", uncertainty: "±0.005 pH" },
          ],
          validation: {
            accuracy: "98-102%",
            precision: "CV <2%",
            linearity: "R² >0.999",
            limitOfDetection: "0.01 pH",
            limitOfQuantification: "0.1 pH",
            robustness: "Uygun",
            status: "Geçerli",
            validatedBy: "Dr. Fatma Demir",
            validationDate: "2024-02-10",
            nextValidation: "2025-02-10",
          },
          qualityControl: {
            frequency: "Her ölçüm öncesi",
            criteria: "Buffer değerleri ±0.05 pH içinde",
            action: "Kalibrasyon tekrarlanır",
          },
          safety: {
            hazards: ["Kimyasal maruziyet"],
            precautions: ["Güvenli çalışma teknikleri"],
            ppe: ["Laboratuvar önlüğü", "Eldiven", "Gözlük"],
            wasteDisposal: "Nötralizasyon + Atık",
          },
          references: [
            { type: "Standart", code: "TS 266", title: "İçme suları", year: "2005" },
            { type: "Standart", code: "TS EN ISO 10523", title: "Su kalitesi - pH tayini", year: "2012" },
          ],
          attachments: [
            { name: "tm002_prosedur.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-02-10" },
            { name: "tm002_validasyon_raporu.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-02-10" },
          ],
          responsible: "Dr. Fatma Demir",
          reviewer: "Dr. Mehmet Kaya",
          approver: "Dr. Ahmet Yılmaz",
          effectiveDate: "2024-02-15",
          reviewDate: "2025-02-15",
          notes: "Metot güncellenmiş ve yeniden validasyonu yapıldı.",
          createdAt: "2024-02-05",
          updatedAt: "2024-02-15",
        },
      ]
      setMethods(mockData)
    } catch (error) {
      console.error("Methods fetch error:", error)
      toast.error("Test metotları verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditMethod = (method: TestMethod) => {
    setEditingMethod(method)
    setMethodFormData({
      methodCode: method.methodCode,
      methodName: method.methodName,
      category: method.category,
      subCategory: method.subCategory,
      version: method.version,
      status: method.status,
      scope: method.scope,
      principle: method.principle,
      responsible: method.responsible,
      reviewer: method.reviewer,
      approver: method.approver,
      effectiveDate: method.effectiveDate,
      reviewDate: method.reviewDate,
      notes: method.notes,
    })
    setIsMethodDialogOpen(true)
  }

  const handleMethodSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingMethod) {
        toast.success("Test metodu başarıyla güncellendi")
      } else {
        toast.success("Test metodu başarıyla oluşturuldu")
      }
      setIsMethodDialogOpen(false)
      setEditingMethod(null)
      resetForm()
      fetchMethods()
    } catch (error) {
      toast.error("Test metodu kaydedilirken hata oluştu")
    }
  }

  const resetForm = () => {
    setMethodFormData({
      methodCode: "",
      methodName: "",
      category: "",
      subCategory: "",
      version: "1.0",
      status: "Aktif",
      scope: "",
      principle: "",
      responsible: "",
      reviewer: "",
      approver: "",
      effectiveDate: "",
      reviewDate: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Aktif": "bg-green-100 text-green-800",
      "Validasyon Bekliyor": "bg-yellow-100 text-yellow-800",
      "Güncelleme Bekliyor": "bg-orange-100 text-orange-800",
      "Pasif": "bg-gray-100 text-gray-800",
      "İptal Edildi": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getValidationStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Geçerli": "bg-green-100 text-green-800",
      "Süresi Dolmuş": "bg-red-100 text-red-800",
      "Beklemede": "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const filteredMethods = methods.filter((method) => {
    const matchesSearch = 
      method.methodCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.methodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || method.status === statusFilter
    const matchesCategory = categoryFilter === "all" || method.category === categoryFilter
    return matchesSearch && matchesStatus && matchesCategory
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMethods(filteredMethods.map((method) => method.id))
    } else {
      setSelectedMethods([])
    }
  }

  const handleSelectMethod = (methodId: string, checked: boolean) => {
    if (checked) {
      setSelectedMethods([...selectedMethods, methodId])
    } else {
      setSelectedMethods(selectedMethods.filter((id) => id !== methodId))
    }
  }

  const exportMethodReport = () => {
    toast.success("Test metotları raporu indiriliyor...")
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
          <h1 className="text-3xl font-bold text-foreground">Test Metotları ve Validasyon</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu test metotları ve validasyon süreçleri</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportMethodReport}>
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Metot</CardTitle>
            <FlaskConical className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{methods.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı test metodu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Metotlar</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{methods.filter((m) => m.status === "Aktif").length}</div>
            <p className="text-xs text-muted-foreground">Kullanımda olan metotlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Validasyon Geçerli</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{methods.filter((m) => m.validation.status === "Geçerli").length}</div>
            <p className="text-xs text-muted-foreground">Validasyonu geçerli metotlar</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kategoriler</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Array.from(new Set(methods.map(m => m.category))).length}</div>
            <p className="text-xs text-muted-foreground">Farklı analiz kategorisi</p>
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
                placeholder="Metot kodu, adı veya kategori ara..."
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
                <SelectItem value="Validasyon Bekliyor">Validasyon Bekliyor</SelectItem>
                <SelectItem value="Güncelleme Bekliyor">Güncelleme Bekliyor</SelectItem>
                <SelectItem value="Pasif">Pasif</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                <SelectItem value="Mikrobiyoloji">Mikrobiyoloji</SelectItem>
                <SelectItem value="Kimyasal Analiz">Kimyasal Analiz</SelectItem>
                <SelectItem value="Fizikokimyasal">Fizikokimyasal</SelectItem>
                <SelectItem value="Spektroskopik">Spektroskopik</SelectItem>
                <SelectItem value="Kromatografik">Kromatografik</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="methods">Test Metotları</TabsTrigger>
          <TabsTrigger value="validation">Validasyon</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="methods" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Test Metotları</h2>
            <div className="flex gap-2">
              <Dialog
                open={isMethodDialogOpen}
                onOpenChange={(open) => {
                  setIsMethodDialogOpen(open)
                  if (!open) {
                    setEditingMethod(null)
                    resetForm()
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Metot
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingMethod ? "Metot Düzenle" : "Yeni Test Metodu"}</DialogTitle>
                    <DialogDescription>
                      {editingMethod ? "Test metodu bilgilerini güncelleyin" : "Yeni test metodu oluşturun"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleMethodSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="methodCode">Metot Kodu *</Label>
                        <Input
                          id="methodCode"
                          value={methodFormData.methodCode}
                          onChange={(e) => setMethodFormData({ ...methodFormData, methodCode: e.target.value })}
                          placeholder="TM-XXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="methodName">Metot Adı *</Label>
                        <Input
                          id="methodName"
                          value={methodFormData.methodName}
                          onChange={(e) => setMethodFormData({ ...methodFormData, methodName: e.target.value })}
                          placeholder="Test metodu adı"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori *</Label>
                        <Select
                          value={methodFormData.category}
                          onValueChange={(value) => setMethodFormData({ ...methodFormData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mikrobiyoloji">Mikrobiyoloji</SelectItem>
                            <SelectItem value="Kimyasal Analiz">Kimyasal Analiz</SelectItem>
                            <SelectItem value="Fizikokimyasal">Fizikokimyasal</SelectItem>
                            <SelectItem value="Spektroskopik">Spektroskopik</SelectItem>
                            <SelectItem value="Kromatografik">Kromatografik</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subCategory">Alt Kategori</Label>
                        <Input
                          id="subCategory"
                          value={methodFormData.subCategory}
                          onChange={(e) => setMethodFormData({ ...methodFormData, subCategory: e.target.value })}
                          placeholder="Alt kategori"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="version">Versiyon *</Label>
                        <Input
                          id="version"
                          value={methodFormData.version}
                          onChange={(e) => setMethodFormData({ ...methodFormData, version: e.target.value })}
                          placeholder="1.0"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Durum *</Label>
                        <Select
                          value={methodFormData.status}
                          onValueChange={(value) => setMethodFormData({ ...methodFormData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Durum seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Aktif">Aktif</SelectItem>
                            <SelectItem value="Validasyon Bekliyor">Validasyon Bekliyor</SelectItem>
                            <SelectItem value="Güncelleme Bekliyor">Güncelleme Bekliyor</SelectItem>
                            <SelectItem value="Pasif">Pasif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="scope">Kapsam *</Label>
                      <Textarea
                        id="scope"
                        value={methodFormData.scope}
                        onChange={(e) => setMethodFormData({ ...methodFormData, scope: e.target.value })}
                        placeholder="Metodun kapsamı ve uygulama alanı"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="principle">Prensip *</Label>
                      <Textarea
                        id="principle"
                        value={methodFormData.principle}
                        onChange={(e) => setMethodFormData({ ...methodFormData, principle: e.target.value })}
                        placeholder="Metodun temel prensibi"
                        rows={3}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="responsible">Sorumlu</Label>
                        <Input
                          id="responsible"
                          value={methodFormData.responsible}
                          onChange={(e) => setMethodFormData({ ...methodFormData, responsible: e.target.value })}
                          placeholder="Sorumlu personel"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reviewer">İnceleyen</Label>
                        <Input
                          id="reviewer"
                          value={methodFormData.reviewer}
                          onChange={(e) => setMethodFormData({ ...methodFormData, reviewer: e.target.value })}
                          placeholder="İnceleyen personel"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="approver">Onaylayan</Label>
                        <Input
                          id="approver"
                          value={methodFormData.approver}
                          onChange={(e) => setMethodFormData({ ...methodFormData, approver: e.target.value })}
                          placeholder="Onaylayan personel"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="effectiveDate">Yürürlük Tarihi</Label>
                        <Input
                          id="effectiveDate"
                          type="date"
                          value={methodFormData.effectiveDate}
                          onChange={(e) => setMethodFormData({ ...methodFormData, effectiveDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reviewDate">İnceleme Tarihi</Label>
                        <Input
                          id="reviewDate"
                          type="date"
                          value={methodFormData.reviewDate}
                          onChange={(e) => setMethodFormData({ ...methodFormData, reviewDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea
                        id="notes"
                        value={methodFormData.notes}
                        onChange={(e) => setMethodFormData({ ...methodFormData, notes: e.target.value })}
                        placeholder="Özel notlar"
                        rows={2}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsMethodDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button type="submit">{editingMethod ? "Güncelle" : "Oluştur"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Metotları Listesi</CardTitle>
              <CardDescription>
                Tüm test metotları ve validasyon durumları
                {searchTerm && ` - "${searchTerm}" için ${filteredMethods.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedMethods.length === filteredMethods.length && filteredMethods.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Metot Kodu</TableHead>
                    <TableHead>Metot Adı</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Versiyon</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Validasyon</TableHead>
                    <TableHead>Sorumlu</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMethods.map((method) => (
                    <TableRow key={method.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMethods.includes(method.id)}
                          onCheckedChange={(checked) => handleSelectMethod(method.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{method.methodCode}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{method.methodName}</div>
                          <div className="text-sm text-muted-foreground">{method.scope}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-sm">{method.category}</div>
                          <div className="text-xs text-muted-foreground">{method.subCategory}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{method.version}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(method.status)}</TableCell>
                      <TableCell>{getValidationStatusBadge(method.validation.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{method.responsible}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditMethod(method)}>
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

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Validasyon Durumu</CardTitle>
              <CardDescription>Tüm metotların validasyon durumu ve geçerlilik tarihleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {methods.map((method) => (
                  <Card key={method.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium">{method.methodCode} - {method.methodName}</div>
                        <div className="text-sm text-muted-foreground">{method.category} - v{method.version}</div>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(method.status)}
                        {getValidationStatusBadge(method.validation.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Validasyon Tarihi:</div>
                        <div className="font-medium">{method.validation.validationDate}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Sonraki Validasyon:</div>
                        <div className="font-medium">{method.validation.nextValidation}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Validasyon Yapan:</div>
                        <div className="font-medium">{method.validation.validatedBy}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Doğruluk:</div>
                        <div className="font-medium">{method.validation.accuracy}</div>
                      </div>
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
                <CardTitle>Kategori Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(methods.map(m => m.category))).map(category => {
                    const count = methods.filter(m => m.category === category).length
                    const percentage = (count / methods.length) * 100
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
                <CardTitle>Validasyon Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(methods.map(m => m.validation.status))).map(status => {
                    const count = methods.filter(m => m.validation.status === status).length
                    const percentage = (count / methods.length) * 100
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
