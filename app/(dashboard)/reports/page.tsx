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
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
import {
  FileText,
  Download,
  Calendar as CalendarIcon,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  TrendingUp,
  Users,
  Settings,
  TestTube,
  Shield,
  MessageSquare,
  ClipboardCheck,
  Award,
  Microscope,
  Wrench,
  BookOpen,
  FileSpreadsheet,
  FileImage,
  Mail,
  Share2,
  RefreshCw,
  Zap,
  Target,
  Activity,
  CheckSquare,
  AlertCircle,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  X
} from "lucide-react"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { toast } from "sonner"

interface Report {
  id: string
  name: string
  type: string
  category: string
  status: string
  createdBy: string
  createdAt: string
  lastGenerated: string
  frequency: string
  recipients: string[]
  description: string
  parameters: Record<string, any>
  data: any[]
  attachments: Array<{
    name: string
    type: string
    size: string
    url: string
  }>
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("reports")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState<{from: Date | undefined, to: Date | undefined}>({
    from: undefined,
    to: undefined
  })

  // Form data
  const [reportFormData, setReportFormData] = useState({
    name: "",
    type: "",
    category: "",
    description: "",
    frequency: "Manuel",
    recipients: [] as string[],
    parameters: {} as Record<string, any>
  })

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      setIsLoading(true)
      // Mock data for reports
      const mockData: Report[] = [
        {
          id: "rpt-001",
          name: "ISO 17025 Uyumluluk Raporu",
          type: "Uyumluluk",
          category: "Kalite",
          status: "Aktif",
          createdBy: "Kalite Müdürü",
          createdAt: "2024-01-15",
          lastGenerated: "2024-03-15",
          frequency: "Aylık",
          recipients: ["kalite@lab.com", "yonetim@lab.com"],
          description: "ISO 17025 standardına uyumluluk durumunu gösteren kapsamlı rapor",
          parameters: {
            dateRange: "2024-03-01 to 2024-03-31",
            includeAudits: true,
            includeCAPAs: true,
            includeRisks: true
          },
          data: [],
          attachments: [
            { name: "iso_uyumluluk_raporu_2024_03.pdf", type: "PDF", size: "2.1 MB", url: "/reports/iso_uyumluluk_2024_03.pdf" }
          ]
        },
        {
          id: "rpt-002",
          name: "Ekipman Kalibrasyon Durumu",
          type: "Operasyonel",
          category: "Ekipman",
          status: "Aktif",
          createdBy: "Teknik Müdür",
          createdAt: "2024-01-20",
          lastGenerated: "2024-03-20",
          frequency: "Haftalık",
          recipients: ["teknik@lab.com", "kalite@lab.com"],
          description: "Ekipman kalibrasyon durumu ve yaklaşan kalibrasyonlar",
          parameters: {
            equipmentType: "Tümü",
            status: "Aktif",
            includeOverdue: true
          },
          data: [],
          attachments: [
            { name: "ekipman_kalibrasyon_2024_03_20.pdf", type: "PDF", size: "1.8 MB", url: "/reports/ekipman_kalibrasyon_2024_03_20.pdf" }
          ]
        },
        {
          id: "rpt-003",
          name: "Müşteri Memnuniyet Raporu",
          type: "Müşteri",
          category: "Memnuniyet",
          status: "Aktif",
          createdBy: "Müşteri Hizmetleri",
          createdAt: "2024-02-01",
          lastGenerated: "2024-03-01",
          frequency: "Aylık",
          recipients: ["musteri@lab.com", "yonetim@lab.com"],
          description: "Müşteri şikayetleri ve memnuniyet değerlendirmeleri",
          parameters: {
            dateRange: "2024-02-01 to 2024-02-29",
            includeComplaints: true,
            includeSatisfaction: true
          },
          data: [],
          attachments: [
            { name: "musteri_memnuniyet_2024_02.pdf", type: "PDF", size: "1.5 MB", url: "/reports/musteri_memnuniyet_2024_02.pdf" }
          ]
        }
      ]
      setReports(mockData)
    } catch (error) {
      console.error("Reports fetch error:", error)
      toast.error("Rapor verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Aktif": "bg-green-100 text-green-800",
      "Pasif": "bg-gray-100 text-gray-800",
      "Hazırlanıyor": "bg-blue-100 text-blue-800",
      "Hata": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      "Uyumluluk": <Shield className="h-4 w-4" />,
      "Operasyonel": <Settings className="h-4 w-4" />,
      "Müşteri": <MessageSquare className="h-4 w-4" />,
      "Kalite": <Award className="h-4 w-4" />,
      "Finansal": <BarChart3 className="h-4 w-4" />,
      "Personel": <Users className="h-4 w-4" />,
    }
    return icons[type] || <FileText className="h-4 w-4" />
  }

  const handleGenerateReport = async (reportId: string) => {
    try {
      toast.loading("Rapor oluşturuluyor...")
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success("Rapor başarıyla oluşturuldu")
    } catch (error) {
      toast.error("Rapor oluşturulurken hata oluştu")
    }
  }

  const handleCreateReport = async () => {
    try {
      const newReport: Report = {
        id: `rpt-${Date.now()}`,
        name: reportFormData.name,
        type: reportFormData.type,
        category: reportFormData.category,
        status: "Aktif",
        createdBy: "Mevcut Kullanıcı",
        createdAt: new Date().toISOString().split('T')[0],
        lastGenerated: "",
        frequency: reportFormData.frequency,
        recipients: reportFormData.recipients,
        description: reportFormData.description,
        parameters: reportFormData.parameters,
        data: [],
        attachments: []
      }
      
      setReports(prev => [...prev, newReport])
      setIsCreateDialogOpen(false)
      setReportFormData({
        name: "",
        type: "",
        category: "",
        description: "",
        frequency: "Manuel",
        recipients: [],
        parameters: {}
      })
      toast.success("Rapor şablonu oluşturuldu")
    } catch (error) {
      toast.error("Rapor oluşturulurken hata oluştu")
    }
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
          <h1 className="text-3xl font-bold text-foreground">Raporlama Modülü</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu raporlar ve analitik görünümler</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Rapor
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Rapor</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı rapor şablonu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Raporlar</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter(r => r.status === "Aktif").length}</div>
            <p className="text-xs text-muted-foreground">Çalışır durumda</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bu Ay Oluşturulan</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Rapor oluşturuldu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Otomatik Raporlar</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.filter(r => r.frequency !== "Manuel").length}</div>
            <p className="text-xs text-muted-foreground">Zamanlanmış raporlar</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="reports">Raporlar</TabsTrigger>
          <TabsTrigger value="templates">Şablonlar</TabsTrigger>
          <TabsTrigger value="scheduled">Zamanlanmış</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rapor Listesi</CardTitle>
              <CardDescription>Tüm raporlar ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rapor Adı</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Oluşturan</TableHead>
                    <TableHead>Son Oluşturma</TableHead>
                    <TableHead>Sıklık</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(report.type)}
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-sm text-muted-foreground">{report.description}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.category}</TableCell>
                      <TableCell>{getStatusBadge(report.status)}</TableCell>
                      <TableCell>{report.createdBy}</TableCell>
                      <TableCell>
                        {report.lastGenerated ? format(new Date(report.lastGenerated), "dd.MM.yyyy") : "Henüz oluşturulmadı"}
                      </TableCell>
                      <TableCell>{report.frequency}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleGenerateReport(report.id)}
                            title="Rapor Oluştur"
                          >
                            <Zap className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Görüntüle">
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

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* ISO 17025 Uyumluluk Raporu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>ISO 17025 Uyumluluk</span>
                </CardTitle>
                <CardDescription>Kapsamlı uyumluluk değerlendirmesi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>İçerik:</strong> Tüm modüller, riskler, CAPA'lar
                  </div>
                  <div className="text-sm">
                    <strong>Format:</strong> PDF, Excel
                  </div>
                  <div className="text-sm">
                    <strong>Sıklık:</strong> Aylık
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Şablon Oluştur
                </Button>
              </CardContent>
            </Card>

            {/* Ekipman Raporu */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Ekipman Durumu</span>
                </CardTitle>
                <CardDescription>Kalibrasyon ve bakım durumu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>İçerik:</strong> Kalibrasyon, bakım, durum
                  </div>
                  <div className="text-sm">
                    <strong>Format:</strong> PDF, Excel
                  </div>
                  <div className="text-sm">
                    <strong>Sıklık:</strong> Haftalık
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Şablon Oluştur
                </Button>
              </CardContent>
            </Card>

            {/* Müşteri Memnuniyeti */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Müşteri Memnuniyeti</span>
                </CardTitle>
                <CardDescription>Şikayetler ve memnuniyet analizi</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-sm">
                    <strong>İçerik:</strong> Şikayetler, memnuniyet, çözümler
                  </div>
                  <div className="text-sm">
                    <strong>Format:</strong> PDF, Excel
                  </div>
                  <div className="text-sm">
                    <strong>Sıklık:</strong> Aylık
                  </div>
                </div>
                <Button className="w-full mt-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Şablon Oluştur
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zamanlanmış Raporlar</CardTitle>
              <CardDescription>Otomatik oluşturulan raporlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reports.filter(r => r.frequency !== "Manuel").map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getTypeIcon(report.type)}
                      <div>
                        <div className="font-medium">{report.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {report.frequency} • Son: {report.lastGenerated ? format(new Date(report.lastGenerated), "dd.MM.yyyy") : "Henüz oluşturulmadı"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{report.frequency}</Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rapor Kullanım İstatistikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">En Çok Kullanılan</span>
                    <span className="text-sm font-medium">ISO 17025 Uyumluluk</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam Oluşturulan</span>
                    <span className="text-sm font-medium">47 rapor</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bu Ay</span>
                    <span className="text-sm font-medium">12 rapor</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rapor Format Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">PDF</span>
                    <span className="text-sm font-medium">65%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Excel</span>
                    <span className="text-sm font-medium">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Word</span>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Report Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Rapor Şablonu Oluştur</DialogTitle>
            <DialogDescription>
              ISO 17025 uyumlu yeni rapor şablonu oluşturun
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Rapor Adı</Label>
                <Input
                  id="name"
                  value={reportFormData.name}
                  onChange={(e) => setReportFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Rapor adını girin"
                />
              </div>
              <div>
                <Label htmlFor="type">Rapor Tipi</Label>
                <Select value={reportFormData.type} onValueChange={(value) => setReportFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Tip seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Uyumluluk">Uyumluluk</SelectItem>
                    <SelectItem value="Operasyonel">Operasyonel</SelectItem>
                    <SelectItem value="Müşteri">Müşteri</SelectItem>
                    <SelectItem value="Kalite">Kalite</SelectItem>
                    <SelectItem value="Finansal">Finansal</SelectItem>
                    <SelectItem value="Personel">Personel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Input
                  id="category"
                  value={reportFormData.category}
                  onChange={(e) => setReportFormData(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="Kategori girin"
                />
              </div>
              <div>
                <Label htmlFor="frequency">Sıklık</Label>
                <Select value={reportFormData.frequency} onValueChange={(value) => setReportFormData(prev => ({ ...prev, frequency: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sıklık seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Manuel">Manuel</SelectItem>
                    <SelectItem value="Günlük">Günlük</SelectItem>
                    <SelectItem value="Haftalık">Haftalık</SelectItem>
                    <SelectItem value="Aylık">Aylık</SelectItem>
                    <SelectItem value="Üç Aylık">Üç Aylık</SelectItem>
                    <SelectItem value="Yıllık">Yıllık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={reportFormData.description}
                onChange={(e) => setReportFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Rapor açıklamasını girin"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleCreateReport}>
              Oluştur
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}