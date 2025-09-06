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
  Shield,
  Activity,
  Zap,
  Settings,
  AlertCircle as AlertCircleIcon,
  TrendingUp as TrendingUpIcon,
  Wrench,
  ClipboardCheck,
  X,
} from "lucide-react"
import { toast } from "sonner"

interface CAPA {
  id: string
  capaNumber: string
  title: string
  description: string
  type: string
  source: string
  priority: string
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  completionDate: string
  rootCause: {
    analysis: string
    causes: Array<{
      cause: string
      category: string
      impact: string
    }>
    method: string
    analyst: string
    date: string
  }
  correctiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  preventiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  verification: {
    method: string
    criteria: string
    results: string
    verifier: string
    date: string
    status: string
  }
  effectiveness: {
    method: string
    criteria: string
    results: string
    evaluator: string
    date: string
    status: string
  }
  cost: {
    estimated: number
    actual: number
    variance: number
  }
  attachments: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  notes: string
  createdAt: string
  updatedAt: string
}

export default function CAPASystemPage() {
  const [capas, setCapas] = useState<CAPA[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("capas")

  // Dialog states
  const [isCAPADialogOpen, setIsCAPADialogOpen] = useState(false)
  const [editingCAPA, setEditingCAPA] = useState<CAPA | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedCAPAs, setSelectedCAPAs] = useState<string[]>([])
  
  // View and detail states
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [viewingCAPA, setViewingCAPA] = useState<CAPA | null>(null)

  // Form data
  const [capaFormData, setCapaFormData] = useState({
    capaNumber: "",
    title: "",
    description: "",
    type: "",
    source: "",
    priority: "Orta",
    owner: "",
    identifiedDate: "",
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchCAPAs()
  }, [])

  const fetchCAPAs = async () => {
    try {
      setIsLoading(true)
      // Mock data for CAPAs
      const mockData: CAPA[] = [
        {
          id: "capa-001",
          capaNumber: "CAPA-2024-001",
          title: "Ekipman Kalibrasyon Gecikmesi",
          description: "Kritik ekipmanların kalibrasyon sürelerinin aşılması durumunda analiz sonuçlarının güvenilirliğinin azalması",
          type: "Düzeltici",
          source: "İç Denetim",
          priority: "Yüksek",
          status: "Uygulanıyor",
          owner: "Dr. Mehmet Kaya",
          identifiedDate: "2024-01-15",
          dueDate: "2024-04-15",
          completionDate: "",
          rootCause: {
            analysis: "Kalibrasyon takip sisteminin yetersizliği ve personel farkındalığının düşük olması",
            causes: [
              { cause: "Otomatik hatırlatma sistemi yok", category: "Sistem", impact: "Yüksek" },
              { cause: "Personel eğitimi eksik", category: "İnsan", impact: "Orta" },
              { cause: "Kalibrasyon planı net değil", category: "Süreç", impact: "Orta" },
            ],
            method: "5 Neden Analizi",
            analyst: "Dr. Fatma Demir",
            date: "2024-01-20",
          },
          correctiveActions: [
            { action: "Otomatik hatırlatma sistemi kurulumu", responsible: "IT Müdürü", dueDate: "2024-02-28", status: "Tamamlandı", effectiveness: "Yüksek" },
            { action: "Kalibrasyon takip tablosu oluşturma", responsible: "Kalite Müdürü", dueDate: "2024-02-15", status: "Tamamlandı", effectiveness: "Orta" },
            { action: "Personel eğitimi düzenleme", responsible: "Eğitim Müdürü", dueDate: "2024-03-15", status: "Devam Ediyor", effectiveness: "Yüksek" },
          ],
          preventiveActions: [
            { action: "Kalibrasyon prosedürü güncelleme", responsible: "Kalite Müdürü", dueDate: "2024-03-31", status: "Planlandı", effectiveness: "Yüksek" },
            { action: "Aylık kalibrasyon raporu sistemi", responsible: "Kalite Müdürü", dueDate: "2024-04-15", status: "Planlandı", effectiveness: "Orta" },
          ],
          verification: {
            method: "Kalibrasyon kayıtları inceleme",
            criteria: "Tüm ekipmanların güncel kalibrasyonu",
            results: "Sistem kuruldu, eğitim devam ediyor",
            verifier: "Dr. Ahmet Yılmaz",
            date: "2024-03-01",
            status: "Kısmen Başarılı",
          },
          effectiveness: {
            method: "Kalibrasyon gecikme oranı analizi",
            criteria: "Gecikme oranı %5'in altında",
            results: "Henüz değerlendirme yapılmadı",
            evaluator: "",
            date: "",
            status: "Beklemede",
          },
          cost: {
            estimated: 25000,
            actual: 18000,
            variance: -7000,
          },
          attachments: [
            { name: "koku_analizi_capa001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-01-20" },
            { name: "eylem_plani_capa001.pdf", type: "PDF", size: "0.9 MB", uploadDate: "2024-01-25" },
          ],
          notes: "CAPA başarıyla uygulanıyor. Düzenli takip yapılıyor.",
          createdAt: "2024-01-10",
          updatedAt: "2024-03-01",
        },
        {
          id: "capa-002",
          capaNumber: "CAPA-2024-002",
          title: "Numune Kabul Sürecinde Eksiklikler",
          description: "Numune kabul sürecinde gerekli bilgilerin eksik alınması ve dokümantasyon hataları",
          type: "Düzeltici",
          source: "Müşteri Şikayeti",
          priority: "Orta",
          status: "Tamamlandı",
          owner: "Dr. Fatma Demir",
          identifiedDate: "2024-02-01",
          dueDate: "2024-03-31",
          completionDate: "2024-03-25",
          rootCause: {
            analysis: "Numune kabul formunun yetersizliği ve personel eğitim eksikliği",
            causes: [
              { cause: "Kabul formu eksik alanlar içeriyor", category: "Sistem", impact: "Yüksek" },
              { cause: "Personel eğitimi yetersiz", category: "İnsan", impact: "Orta" },
              { cause: "Kontrol listesi yok", category: "Süreç", impact: "Orta" },
            ],
            method: "Balık Kılçığı Diyagramı",
            analyst: "Dr. Mehmet Kaya",
            date: "2024-02-05",
          },
          correctiveActions: [
            { action: "Numune kabul formu güncelleme", responsible: "Kalite Müdürü", dueDate: "2024-02-28", status: "Tamamlandı", effectiveness: "Yüksek" },
            { action: "Kontrol listesi oluşturma", responsible: "Kalite Müdürü", dueDate: "2024-02-20", status: "Tamamlandı", effectiveness: "Yüksek" },
            { action: "Personel eğitimi", responsible: "Eğitim Müdürü", dueDate: "2024-03-15", status: "Tamamlandı", effectiveness: "Yüksek" },
          ],
          preventiveActions: [
            { action: "Aylık kabul süreci denetimi", responsible: "Kalite Müdürü", dueDate: "2024-04-01", status: "Tamamlandı", effectiveness: "Orta" },
            { action: "Müşteri geri bildirim sistemi", responsible: "Kalite Müdürü", dueDate: "2024-03-31", status: "Tamamlandı", effectiveness: "Yüksek" },
          ],
          verification: {
            method: "Numune kabul kayıtları inceleme",
            criteria: "Tüm gerekli bilgilerin doldurulması",
            results: "Form güncellendi, eğitim tamamlandı",
            verifier: "Dr. Ahmet Yılmaz",
            date: "2024-03-20",
            status: "Başarılı",
          },
          effectiveness: {
            method: "Müşteri şikayet oranı analizi",
            criteria: "Şikayet oranı %2'nin altında",
            results: "Şikayet oranı %1.5'e düştü",
            evaluator: "Dr. Ahmet Yılmaz",
            date: "2024-03-25",
            status: "Başarılı",
          },
          cost: {
            estimated: 8000,
            actual: 7500,
            variance: -500,
          },
          attachments: [
            { name: "koku_analizi_capa002.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-02-05" },
            { name: "eylem_plani_capa002.pdf", type: "PDF", size: "0.7 MB", uploadDate: "2024-02-10" },
            { name: "etkinlik_raporu_capa002.pdf", type: "PDF", size: "0.9 MB", uploadDate: "2024-03-25" },
          ],
          notes: "CAPA başarıyla tamamlandı. Etkinlik değerlendirmesi yapıldı.",
          createdAt: "2024-01-28",
          updatedAt: "2024-03-25",
        },
      ]
      setCapas(mockData)
    } catch (error) {
      console.error("CAPAs fetch error:", error)
      toast.error("CAPA verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Planlandı": "bg-blue-100 text-blue-800",
      "Uygulanıyor": "bg-yellow-100 text-yellow-800",
      "Tamamlandı": "bg-green-100 text-green-800",
      "İptal Edildi": "bg-red-100 text-red-800",
      "Beklemede": "bg-gray-100 text-gray-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Orta": "bg-yellow-100 text-yellow-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      "Düzeltici": "bg-red-100 text-red-800",
      "Önleyici": "bg-blue-100 text-blue-800",
    }
    return <Badge className={variants[type] || "bg-gray-100 text-gray-800"}>{type}</Badge>
  }

  const handleCAPASubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!capaFormData.capaNumber || !capaFormData.title || !capaFormData.description) {
      toast.error("Lütfen tüm zorunlu alanları doldurun")
      return
    }

    try {
      if (editingCAPA) {
        // Update existing CAPA
        const updatedCAPA = {
          ...editingCAPA,
          ...capaFormData,
          updatedAt: new Date().toISOString()
        }
        setCapas(prev => prev.map(capa => capa.id === editingCAPA.id ? updatedCAPA : capa))
        toast.success("CAPA başarıyla güncellendi")
      } else {
        // Create new CAPA
        const newCAPA: CAPA = {
          id: `capa-${Date.now()}`,
          ...capaFormData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        setCapas(prev => [...prev, newCAPA])
        toast.success("CAPA başarıyla oluşturuldu")
      }
      
      setIsCAPADialogOpen(false)
      setEditingCAPA(null)
    } catch (error) {
      console.error("CAPA save error:", error)
      toast.error("CAPA kaydedilirken hata oluştu")
    }
  }

  const handleViewCAPA = (capa: CAPA) => {
    setViewingCAPA(capa)
    setIsViewDialogOpen(true)
  }

  const handleEditCAPA = (capa: CAPA) => {
    setEditingCAPA(capa)
    setCapaFormData({
      capaNumber: capa.capaNumber,
      title: capa.title,
      description: capa.description,
      type: capa.type,
      source: capa.source,
      priority: capa.priority,
      status: capa.status,
      owner: capa.owner,
      identifiedDate: capa.identifiedDate,
      dueDate: capa.dueDate,
      completionDate: capa.completionDate,
      rootCause: capa.rootCause,
      correctiveActions: capa.correctiveActions,
      preventiveActions: capa.preventiveActions,
      verification: capa.verification,
      effectiveness: capa.effectiveness,
      closure: capa.closure,
      documents: capa.documents,
      comments: capa.comments
    })
    setIsCAPADialogOpen(true)
  }

  const handleDeleteCAPA = async (capaId: string) => {
    if (window.confirm("Bu CAPA kaydını silmek istediğinizden emin misiniz?")) {
      try {
        setCapas(prev => prev.filter(capa => capa.id !== capaId))
        toast.success("CAPA başarıyla silindi")
      } catch (error) {
        console.error("CAPA delete error:", error)
        toast.error("CAPA silinirken hata oluştu")
      }
    }
  }

  const handleSelectCAPA = (capaId: string, checked: boolean) => {
    if (checked) {
      setSelectedCAPAs(prev => [...prev, capaId])
    } else {
      setSelectedCAPAs(prev => prev.filter(id => id !== capaId))
    }
  }

  const handleSelectAllCAPAs = (checked: boolean) => {
    if (checked) {
      setSelectedCAPAs(filteredCAPAs.map(capa => capa.id))
    } else {
      setSelectedCAPAs([])
    }
  }

  const handleBulkDelete = () => {
    if (selectedCAPAs.length === 0) {
      toast.error("Lütfen silinecek CAPA'ları seçin")
      return
    }
    
    if (window.confirm(`${selectedCAPAs.length} CAPA kaydını silmek istediğinizden emin misiniz?`)) {
      try {
        setCapas(prev => prev.filter(capa => !selectedCAPAs.includes(capa.id)))
        setSelectedCAPAs([])
        toast.success(`${selectedCAPAs.length} CAPA başarıyla silindi`)
      } catch (error) {
        console.error("Bulk delete error:", error)
        toast.error("CAPA'lar silinirken hata oluştu")
      }
    }
  }

  const filteredCAPAs = capas.filter((capa) => {
    const matchesSearch = 
      capa.capaNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capa.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capa.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capa.owner.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || capa.status === statusFilter
    const matchesType = typeFilter === "all" || capa.type === typeFilter
    const matchesPriority = priorityFilter === "all" || capa.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesPriority
  })

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
          <h1 className="text-3xl font-bold text-foreground">CAPA Sistemi</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu düzeltici ve önleyici aksiyon yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam CAPA</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capas.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı CAPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlandı</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capas.filter((c) => c.status === "Tamamlandı").length}</div>
            <p className="text-xs text-muted-foreground">Tamamlanan CAPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uygulanıyor</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capas.filter((c) => c.status === "Uygulanıyor").length}</div>
            <p className="text-xs text-muted-foreground">Aktif CAPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yüksek Öncelik</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{capas.filter((c) => c.priority === "Yüksek").length}</div>
            <p className="text-xs text-muted-foreground">Kritik CAPA</p>
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
                placeholder="CAPA no, başlık veya açıklama ara..."
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
                <SelectItem value="Planlandı">Planlandı</SelectItem>
                <SelectItem value="Uygulanıyor">Uygulanıyor</SelectItem>
                <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                <SelectItem value="İptal Edildi">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="Düzeltici">Düzeltici</SelectItem>
                <SelectItem value="Önleyici">Önleyici</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="capas">CAPA Listesi</TabsTrigger>
          <TabsTrigger value="actions">Aksiyonlar</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="capas" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">CAPA Listesi</h2>
            <div className="flex gap-2">
              {selectedCAPAs.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleBulkDelete}
                >
                  <X className="w-4 h-4 mr-2" />
                  Seçilenleri Sil ({selectedCAPAs.length})
                </Button>
              )}
              <Dialog open={isCAPADialogOpen} onOpenChange={setIsCAPADialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => {
                  setEditingCAPA(null)
                  setCapaFormData({
                    capaNumber: "",
                    title: "",
                    description: "",
                    type: "",
                    source: "",
                    priority: "",
                    status: "open",
                    owner: "",
                    identifiedDate: "",
                    dueDate: "",
                    completionDate: "",
                    rootCause: {
                      analysis: "",
                      causes: [],
                      method: "",
                      analyst: "",
                      date: ""
                    },
                    correctiveActions: [],
                    preventiveActions: [],
                    verification: {
                      method: "",
                      criteria: "",
                      results: "",
                      verifier: "",
                      date: "",
                      status: ""
                    },
                    effectiveness: {
                      evaluation: "",
                      metrics: "",
                      results: "",
                      evaluator: "",
                      date: "",
                      status: ""
                    },
                    closure: {
                      criteria: "",
                      approval: "",
                      approver: "",
                      date: "",
                      status: ""
                    },
                    documents: [],
                    comments: []
                  })
                }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni CAPA
                </Button>
              </DialogTrigger>
            </Dialog>
            </div>
          </div>

          {/* Search and Filter Section */}
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Arama ve Filtreleme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Arama</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="CAPA ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="statusFilter">Durum</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Durum seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="open">Açık</SelectItem>
                      <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                      <SelectItem value="completed">Tamamlandı</SelectItem>
                      <SelectItem value="closed">Kapatıldı</SelectItem>
                      <SelectItem value="cancelled">İptal Edildi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="typeFilter">Tip</Label>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Tip seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="corrective">Düzeltici</SelectItem>
                      <SelectItem value="preventive">Önleyici</SelectItem>
                      <SelectItem value="both">Her İkisi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priorityFilter">Öncelik</Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Öncelik seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="low">Düşük</SelectItem>
                      <SelectItem value="medium">Orta</SelectItem>
                      <SelectItem value="high">Yüksek</SelectItem>
                      <SelectItem value="critical">Kritik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CAPA Kayıtları</CardTitle>
              <CardDescription>Tüm CAPA kayıtları ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedCAPAs.length === filteredCAPAs.length && filteredCAPAs.length > 0}
                        onCheckedChange={handleSelectAllCAPAs}
                      />
                    </TableHead>
                    <TableHead>CAPA No</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Sorumlu</TableHead>
                    <TableHead>Tarihler</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCAPAs.map((capa) => (
                    <TableRow key={capa.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedCAPAs.includes(capa.id)}
                          onCheckedChange={(checked) => handleSelectCAPA(capa.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{capa.capaNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{capa.title}</div>
                          <div className="text-sm text-muted-foreground">{capa.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getTypeBadge(capa.type)}</TableCell>
                      <TableCell>{capa.source}</TableCell>
                      <TableCell>{getPriorityBadge(capa.priority)}</TableCell>
                      <TableCell>
                        <Select
                          value={capa.status}
                          onValueChange={(value) => {
                            setCapas(prev => prev.map(c => 
                              c.id === capa.id 
                                ? { 
                                    ...c, 
                                    status: value as 'open' | 'in_progress' | 'completed' | 'cancelled',
                                    completionDate: value === 'completed' ? new Date().toLocaleDateString('tr-TR') : c.completionDate
                                  }
                                : c
                            ))
                            toast.success(`CAPA durumu "${value === 'open' ? 'Açık' : value === 'in_progress' ? 'Devam Ediyor' : value === 'completed' ? 'Tamamlandı' : 'İptal Edildi'}" olarak güncellendi`)
                          }}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="open">Açık</SelectItem>
                            <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                            <SelectItem value="completed">Tamamlandı</SelectItem>
                            <SelectItem value="cancelled">İptal Edildi</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>{capa.owner}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Belirlenme: {capa.identifiedDate}</div>
                          <div>Bitiş: {capa.dueDate}</div>
                          {capa.completionDate && <div>Tamamlanma: {capa.completionDate}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Detayları Görüntüle"
                            onClick={() => handleViewCAPA(capa)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Düzenle"
                            onClick={() => handleEditCAPA(capa)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Sil"
                            onClick={() => handleDeleteCAPA(capa.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
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

        <TabsContent value="actions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aksiyon Maddeleri</CardTitle>
              <CardDescription>Tüm CAPA aksiyon maddeleri ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {capas.map((capa) => (
                  <Card key={capa.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium">{capa.capaNumber} - {capa.title}</div>
                        <div className="text-sm text-muted-foreground">{capa.type} CAPA</div>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(capa.status)}
                        {getPriorityBadge(capa.priority)}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Düzeltici Aksiyonlar</h4>
                        <div className="space-y-2">
                          {capa.correctiveActions.map((action, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <div className="flex-1">
                                <div className="font-medium">{action.action}</div>
                                <div className="text-sm text-muted-foreground">Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</div>
                              </div>
                              <div className="flex space-x-2">
                                {getStatusBadge(action.status)}
                                <Badge variant="outline">{action.effectiveness}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Önleyici Aksiyonlar</h4>
                        <div className="space-y-2">
                          {capa.preventiveActions.map((action, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <div className="flex-1">
                                <div className="font-medium">{action.action}</div>
                                <div className="text-sm text-muted-foreground">Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</div>
                              </div>
                              <div className="flex space-x-2">
                                {getStatusBadge(action.status)}
                                <Badge variant="outline">{action.effectiveness}</Badge>
                              </div>
                            </div>
                          ))}
                        </div>
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
                <CardTitle>Durum Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(capas.map(c => c.status))).map(status => {
                    const count = capas.filter(c => c.status === status).length
                    const percentage = (count / capas.length) * 100
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
            <Card>
              <CardHeader>
                <CardTitle>Tip Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(capas.map(c => c.type))).map(type => {
                    const count = capas.filter(c => c.type === type).length
                    const percentage = (count / capas.length) * 100
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
          </div>
        </TabsContent>
      </Tabs>

      {/* CAPA Dialog */}
      <Dialog open={isCAPADialogOpen} onOpenChange={setIsCAPADialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCAPA ? "CAPA Düzenle" : "Yeni CAPA Oluştur"}
            </DialogTitle>
            <DialogDescription>
              {editingCAPA ? "Mevcut CAPA kaydını düzenleyin" : "Yeni bir CAPA kaydı oluşturun"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="capaNumber">CAPA Numarası *</Label>
                <Input
                  id="capaNumber"
                  value={capaFormData.capaNumber}
                  onChange={(e) => setCapaFormData(prev => ({ ...prev, capaNumber: e.target.value }))}
                  placeholder="CAPA-2024-001"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={capaFormData.title}
                  onChange={(e) => setCapaFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="CAPA başlığı"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama *</Label>
              <Textarea
                id="description"
                value={capaFormData.description}
                onChange={(e) => setCapaFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="CAPA açıklaması"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tür *</Label>
                <Select
                  value={capaFormData.type}
                  onValueChange={(value) => setCapaFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tür seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrective">Düzeltici</SelectItem>
                    <SelectItem value="preventive">Önleyici</SelectItem>
                    <SelectItem value="both">Her İkisi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">Kaynak *</Label>
                <Select
                  value={capaFormData.source}
                  onValueChange={(value) => setCapaFormData(prev => ({ ...prev, source: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kaynak seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audit">Denetim</SelectItem>
                    <SelectItem value="complaint">Şikayet</SelectItem>
                    <SelectItem value="nonconformity">Uygunsuzluk</SelectItem>
                    <SelectItem value="management_review">Yönetim Gözden Geçirme</SelectItem>
                    <SelectItem value="other">Diğer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Öncelik *</Label>
                <Select
                  value={capaFormData.priority}
                  onValueChange={(value) => setCapaFormData(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="critical">Kritik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Sorumlu *</Label>
                <Input
                  id="owner"
                  value={capaFormData.owner}
                  onChange={(e) => setCapaFormData(prev => ({ ...prev, owner: e.target.value }))}
                  placeholder="Sorumlu kişi"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Durum *</Label>
                <Select
                  value={capaFormData.status}
                  onValueChange={(value) => setCapaFormData(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Açık</SelectItem>
                    <SelectItem value="in_progress">Devam Ediyor</SelectItem>
                    <SelectItem value="completed">Tamamlandı</SelectItem>
                    <SelectItem value="closed">Kapatıldı</SelectItem>
                    <SelectItem value="cancelled">İptal Edildi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="identifiedDate">Tespit Tarihi *</Label>
                <Input
                  id="identifiedDate"
                  type="date"
                  value={capaFormData.identifiedDate}
                  onChange={(e) => setCapaFormData(prev => ({ ...prev, identifiedDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Bitiş Tarihi *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={capaFormData.dueDate}
                  onChange={(e) => setCapaFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="completionDate">Tamamlanma Tarihi</Label>
                <Input
                  id="completionDate"
                  type="date"
                  value={capaFormData.completionDate}
                  onChange={(e) => setCapaFormData(prev => ({ ...prev, completionDate: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCAPADialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleCAPASubmit}>
              {editingCAPA ? "Güncelle" : "Oluştur"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* CAPA Detail View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>CAPA Detayları</DialogTitle>
            <DialogDescription>
              {viewingCAPA?.capaNumber} - {viewingCAPA?.title}
            </DialogDescription>
          </DialogHeader>
          
          {viewingCAPA && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">CAPA Numarası</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.capaNumber}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Durum</Label>
                  <div>{getStatusBadge(viewingCAPA.status)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Tip</Label>
                  <div>{getTypeBadge(viewingCAPA.type)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Öncelik</Label>
                  <div>{getPriorityBadge(viewingCAPA.priority)}</div>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Sorumlu</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.owner}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Kaynak</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.source}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-medium">Açıklama</Label>
                <p className="text-sm text-muted-foreground">{viewingCAPA.description}</p>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="font-medium">Tespit Tarihi</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.identifiedDate}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Bitiş Tarihi</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.dueDate}</p>
                </div>
                <div className="space-y-2">
                  <Label className="font-medium">Tamamlanma Tarihi</Label>
                  <p className="text-sm text-muted-foreground">{viewingCAPA.completionDate || "Henüz tamamlanmadı"}</p>
                </div>
              </div>

              {/* Root Cause Analysis */}
              {viewingCAPA.rootCause && (
                <div className="space-y-2">
                  <Label className="font-medium">Kök Neden Analizi</Label>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">{viewingCAPA.rootCause.analysis}</p>
                    <div className="text-xs text-muted-foreground">
                      <p>Analist: {viewingCAPA.rootCause.analyst}</p>
                      <p>Tarih: {viewingCAPA.rootCause.date}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Corrective Actions */}
              {viewingCAPA.correctiveActions && viewingCAPA.correctiveActions.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-medium">Düzeltici Aksiyonlar</Label>
                  <div className="space-y-2">
                    {viewingCAPA.correctiveActions.map((action, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">{action.action}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <p>Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</p>
                          <p>Durum: {action.status} | Etkinlik: {action.effectiveness}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Preventive Actions */}
              {viewingCAPA.preventiveActions && viewingCAPA.preventiveActions.length > 0 && (
                <div className="space-y-2">
                  <Label className="font-medium">Önleyici Aksiyonlar</Label>
                  <div className="space-y-2">
                    {viewingCAPA.preventiveActions.map((action, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium">{action.action}</p>
                        <div className="text-xs text-muted-foreground mt-1">
                          <p>Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</p>
                          <p>Durum: {action.status} | Etkinlik: {action.effectiveness}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Kapat
            </Button>
            {viewingCAPA && (
              <Button onClick={() => {
                setIsViewDialogOpen(false)
                handleEditCAPA(viewingCAPA)
              }}>
                Düzenle
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
