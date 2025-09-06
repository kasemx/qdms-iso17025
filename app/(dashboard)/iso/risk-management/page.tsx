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
} from "lucide-react"
import { toast } from "sonner"

interface Risk {
  id: string
  riskNumber: string
  title: string
  description: string
  category: string
  type: string
  level: string
  probability: string
  impact: string
  riskScore: number
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  mitigation: {
    strategy: string
    actions: Array<{
      action: string
      responsible: string
      dueDate: string
      status: string
    }>
    effectiveness: string
    cost: number
  }
  monitoring: {
    frequency: string
    method: string
    nextReview: string
    lastReview: string
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

interface Opportunity {
  id: string
  opportunityNumber: string
  title: string
  description: string
  category: string
  potential: string
  impact: string
  priority: string
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  actionPlan: {
    strategy: string
    actions: Array<{
      action: string
      responsible: string
      dueDate: string
      status: string
    }>
    expectedBenefit: string
    investment: number
  }
  monitoring: {
    frequency: string
    method: string
    nextReview: string
    lastReview: string
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

export default function RiskManagementPage() {
  const [risks, setRisks] = useState<Risk[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("risks")

  // Dialog states
  const [isRiskDialogOpen, setIsRiskDialogOpen] = useState(false)
  const [isOpportunityDialogOpen, setIsOpportunityDialogOpen] = useState(false)
  const [editingRisk, setEditingRisk] = useState<Risk | null>(null)
  const [editingOpportunity, setEditingOpportunity] = useState<Opportunity | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Form data
  const [riskFormData, setRiskFormData] = useState({
    riskNumber: "",
    title: "",
    description: "",
    category: "",
    type: "",
    level: "",
    probability: "",
    impact: "",
    owner: "",
    identifiedDate: "",
    dueDate: "",
    notes: "",
  })

  const [opportunityFormData, setOpportunityFormData] = useState({
    opportunityNumber: "",
    title: "",
    description: "",
    category: "",
    potential: "",
    impact: "",
    priority: "",
    owner: "",
    identifiedDate: "",
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      // Mock data for risks and opportunities
      const mockRisks: Risk[] = [
        {
          id: "risk-001",
          riskNumber: "R-2024-001",
          title: "Ekipman Arızası Riski",
          description: "Kritik ekipmanların arızalanması durumunda analiz süreçlerinin aksaması",
          category: "Teknik",
          type: "Operasyonel",
          level: "Yüksek",
          probability: "Orta",
          impact: "Yüksek",
          riskScore: 16,
          status: "Aktif",
          owner: "Dr. Mehmet Kaya",
          identifiedDate: "2024-01-15",
          dueDate: "2024-06-15",
          mitigation: {
            strategy: "Önleyici bakım programı ve yedek ekipman bulundurma",
            actions: [
              { action: "Aylık önleyici bakım programı oluştur", responsible: "Teknik Müdür", dueDate: "2024-02-15", status: "Tamamlandı" },
              { action: "Yedek ekipman alımı", responsible: "Satın Alma Müdürü", dueDate: "2024-03-30", status: "Devam Ediyor" },
              { action: "Ekipman izleme sistemi kurulumu", responsible: "IT Müdürü", dueDate: "2024-04-30", status: "Planlandı" },
            ],
            effectiveness: "Yüksek",
            cost: 50000,
          },
          monitoring: {
            frequency: "Aylık",
            method: "Ekipman performans raporları",
            nextReview: "2024-04-15",
            lastReview: "2024-03-15",
          },
          attachments: [
            { name: "risk_analizi_r001.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-01-15" },
            { name: "mitigation_plan_r001.pdf", type: "PDF", size: "0.8 MB", uploadDate: "2024-01-20" },
          ],
          notes: "Risk yönetimi planı uygulanıyor. Düzenli takip yapılıyor.",
          createdAt: "2024-01-10",
          updatedAt: "2024-03-15",
        },
        {
          id: "risk-002",
          riskNumber: "R-2024-002",
          title: "Personel Devir Oranı",
          description: "Deneyimli personelin işten ayrılması durumunda bilgi kaybı ve süreç aksaması",
          category: "İnsan Kaynakları",
          type: "Stratejik",
          level: "Orta",
          probability: "Düşük",
          impact: "Orta",
          riskScore: 6,
          status: "İzleniyor",
          owner: "İK Müdürü",
          identifiedDate: "2024-02-01",
          dueDate: "2024-12-31",
          mitigation: {
            strategy: "Personel motivasyonu ve bilgi transferi programları",
            actions: [
              { action: "Personel memnuniyet anketi", responsible: "İK Müdürü", dueDate: "2024-03-31", status: "Tamamlandı" },
              { action: "Mentorluk programı başlat", responsible: "İK Müdürü", dueDate: "2024-04-30", status: "Planlandı" },
              { action: "Bilgi dokümantasyonu güncelle", responsible: "Kalite Müdürü", dueDate: "2024-05-31", status: "Planlandı" },
            ],
            effectiveness: "Orta",
            cost: 15000,
          },
          monitoring: {
            frequency: "Çeyrek",
            method: "Personel devir oranı analizi",
            nextReview: "2024-06-01",
            lastReview: "2024-03-01",
          },
          attachments: [],
          notes: "Risk düşük seviyede. Düzenli izleme yapılıyor.",
          createdAt: "2024-01-25",
          updatedAt: "2024-03-01",
        },
      ]

      const mockOpportunities: Opportunity[] = [
        {
          id: "opp-001",
          opportunityNumber: "O-2024-001",
          title: "Dijitalleşme Projesi",
          description: "Laboratuvar süreçlerinin dijitalleştirilmesi ile verimlilik artışı",
          category: "Teknoloji",
          potential: "Yüksek",
          impact: "Yüksek",
          priority: "Yüksek",
          status: "Değerlendiriliyor",
          owner: "IT Müdürü",
          identifiedDate: "2024-01-20",
          dueDate: "2024-12-31",
          actionPlan: {
            strategy: "Laboratuvar bilgi yönetim sistemi kurulumu",
            actions: [
              { action: "Sistem analizi ve gereksinim belirleme", responsible: "IT Müdürü", dueDate: "2024-03-31", status: "Tamamlandı" },
              { action: "Yazılım seçimi ve satın alma", responsible: "IT Müdürü", dueDate: "2024-05-31", status: "Devam Ediyor" },
              { action: "Personel eğitimi", responsible: "Eğitim Müdürü", dueDate: "2024-08-31", status: "Planlandı" },
            ],
            expectedBenefit: "Süreç verimliliği %30 artış",
            investment: 200000,
          },
          monitoring: {
            frequency: "Aylık",
            method: "Proje ilerleme raporları",
            nextReview: "2024-04-20",
            lastReview: "2024-03-20",
          },
          attachments: [
            { name: "dijitallesme_analizi_o001.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-01-20" },
            { name: "maliyet_analizi_o001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-02-01" },
          ],
          notes: "Fırsat değerlendiriliyor. Detaylı analiz yapılıyor.",
          createdAt: "2024-01-15",
          updatedAt: "2024-03-20",
        },
        {
          id: "opp-002",
          opportunityNumber: "O-2024-002",
          title: "Yeni Test Metotları Geliştirme",
          description: "Mevcut test kapasitesini genişleterek yeni hizmet alanları oluşturma",
          category: "AR-GE",
          potential: "Orta",
          impact: "Orta",
          priority: "Orta",
          status: "Planlanıyor",
          owner: "AR-GE Müdürü",
          identifiedDate: "2024-02-15",
          dueDate: "2024-09-30",
          actionPlan: {
            strategy: "Yeni test metotları araştırma ve geliştirme",
            actions: [
              { action: "Pazar araştırması", responsible: "AR-GE Müdürü", dueDate: "2024-04-30", status: "Devam Ediyor" },
              { action: "Metot geliştirme", responsible: "AR-GE Müdürü", dueDate: "2024-07-31", status: "Planlandı" },
              { action: "Validasyon çalışmaları", responsible: "Kalite Müdürü", dueDate: "2024-09-30", status: "Planlandı" },
            ],
            expectedBenefit: "Yeni gelir kaynağı oluşturma",
            investment: 75000,
          },
          monitoring: {
            frequency: "Aylık",
            method: "AR-GE raporları",
            nextReview: "2024-04-15",
            lastReview: "2024-03-15",
          },
          attachments: [],
          notes: "Fırsat planlanıyor. Detaylı çalışma yapılacak.",
          createdAt: "2024-02-10",
          updatedAt: "2024-03-15",
        },
      ]

      setRisks(mockRisks)
      setOpportunities(mockOpportunities)
    } catch (error) {
      console.error("Data fetch error:", error)
      toast.error("Risk ve fırsat verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getLevelBadge = (level: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Orta": "bg-yellow-100 text-yellow-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[level] || "bg-gray-100 text-gray-800"}>{level}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Aktif": "bg-red-100 text-red-800",
      "İzleniyor": "bg-yellow-100 text-yellow-800",
      "Kontrol Altında": "bg-blue-100 text-blue-800",
      "Kapatıldı": "bg-green-100 text-green-800",
      "Değerlendiriliyor": "bg-orange-100 text-orange-800",
      "Planlanıyor": "bg-purple-100 text-purple-800",
      "Uygulanıyor": "bg-indigo-100 text-indigo-800",
      "Tamamlandı": "bg-green-100 text-green-800",
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
          <h1 className="text-3xl font-bold text-foreground">Risk ve Fırsat Yönetimi</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu risk ve fırsat yönetimi süreçleri</p>
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
            <CardTitle className="text-sm font-medium">Toplam Risk</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risks.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı risk</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yüksek Risk</CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{risks.filter((r) => r.level === "Yüksek").length}</div>
            <p className="text-xs text-muted-foreground">Kritik riskler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Fırsat</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı fırsat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Fırsat</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.filter((o) => o.status === "Uygulanıyor").length}</div>
            <p className="text-xs text-muted-foreground">Uygulanan fırsatlar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="risks">Riskler</TabsTrigger>
          <TabsTrigger value="opportunities">Fırsatlar</TabsTrigger>
        </TabsList>

        <TabsContent value="risks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Risk Yönetimi</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Risk
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Risk Listesi</CardTitle>
              <CardDescription>Tüm riskler ve yönetim durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Risk No</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Seviye</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Sorumlu</TableHead>
                    <TableHead>Risk Skoru</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {risks.map((risk) => (
                    <TableRow key={risk.id}>
                      <TableCell className="font-medium">{risk.riskNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{risk.title}</div>
                          <div className="text-sm text-muted-foreground">{risk.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{risk.category}</TableCell>
                      <TableCell>{getLevelBadge(risk.level)}</TableCell>
                      <TableCell>{getStatusBadge(risk.status)}</TableCell>
                      <TableCell>{risk.owner}</TableCell>
                      <TableCell>
                        <div className="text-center font-bold text-lg">{risk.riskScore}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle">
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

        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Fırsat Yönetimi</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Fırsat
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Fırsat Listesi</CardTitle>
              <CardDescription>Tüm fırsatlar ve uygulama durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fırsat No</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Potansiyel</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Sorumlu</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {opportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell className="font-medium">{opportunity.opportunityNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{opportunity.title}</div>
                          <div className="text-sm text-muted-foreground">{opportunity.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{opportunity.category}</TableCell>
                      <TableCell>{getLevelBadge(opportunity.potential)}</TableCell>
                      <TableCell>{getPriorityBadge(opportunity.priority)}</TableCell>
                      <TableCell>{getStatusBadge(opportunity.status)}</TableCell>
                      <TableCell>{opportunity.owner}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle">
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
