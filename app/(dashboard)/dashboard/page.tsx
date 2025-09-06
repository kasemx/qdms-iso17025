"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  Eye, 
  Plus,
  Users,
  Settings,
  TestTube,
  Shield,
  BarChart3,
  Activity,
  Target,
  AlertCircle,
  CheckSquare,
  FileSearch,
  Download,
  RefreshCw,
  Zap,
  Award,
  MessageSquare,
  ClipboardCheck,
  UserCheck,
  Microscope,
  Wrench,
  BookOpen,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Minus
} from "lucide-react"
import { useState, useEffect } from "react"
import { mockApi } from "@/lib/mock-data"

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({
    documents: { total: 0, pending: 0, approved: 0, revisions: 0 },
    equipment: { total: 0, calibrated: 0, due: 0, critical: 0 },
    personnel: { total: 0, trained: 0, certified: 0, expired: 0 },
    samples: { total: 0, pending: 0, completed: 0, rejected: 0 },
    tests: { total: 0, running: 0, completed: 0, failed: 0 },
    risks: { total: 0, high: 0, medium: 0, low: 0 },
    capas: { total: 0, open: 0, closed: 0, overdue: 0 },
    audits: { total: 0, planned: 0, completed: 0, findings: 0 },
    proficiency: { total: 0, passed: 0, failed: 0, pending: 0 },
    complaints: { total: 0, open: 0, resolved: 0, satisfaction: 0 }
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Tüm modüllerden veri çek
      const [
        documents,
        equipment,
        personnel,
        samples,
        testMethods,
        testJobs,
        risks,
        opportunities,
        capas,
        audits,
        proficiencyTests,
        complaints
      ] = await Promise.all([
        mockApi.getDocuments(),
        mockApi.getEquipmentInventory(),
        mockApi.getPersonnel(),
        mockApi.getSamples(),
        mockApi.getTestMethods(),
        mockApi.getTestJobs(),
        mockApi.getRisks(),
        mockApi.getOpportunities(),
        mockApi.getCAPAs(),
        mockApi.getInternalAudits(),
        mockApi.getProficiencyTests(),
        mockApi.getCustomerComplaints()
      ])

      // Dashboard verilerini hesapla
      setDashboardData({
        documents: {
          total: documents.length,
          pending: documents.filter(d => d.status === "İncelemede").length,
          approved: documents.filter(d => d.status === "Yayınlanan").length,
          revisions: documents.filter(d => d.status === "Revizyon Gerekli").length
        },
        equipment: {
          total: equipment.length,
          calibrated: equipment.filter(e => e.status === "Aktif").length,
          due: equipment.filter(e => e.nextCalibration && new Date(e.nextCalibration) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)).length,
          critical: equipment.filter(e => e.isCritical).length
        },
        personnel: {
          total: personnel.length,
          trained: personnel.filter(p => p.trainingRecords && p.trainingRecords.length > 0).length,
          certified: personnel.filter(p => p.certifications && p.certifications.length > 0).length,
          expired: personnel.filter(p => p.certifications?.some(c => new Date(c.expiryDate) < new Date())).length
        },
        samples: {
          total: samples.length,
          pending: samples.filter(s => s.status === "Kabul Edildi").length,
          completed: samples.filter(s => s.status === "Analiz Tamamlandı").length,
          rejected: samples.filter(s => s.status === "Reddedildi").length
        },
        tests: {
          total: testJobs.length,
          running: testJobs.filter(t => t.status === "Devam Ediyor").length,
          completed: testJobs.filter(t => t.status === "Tamamlandı").length,
          failed: testJobs.filter(t => t.status === "Başarısız").length
        },
        risks: {
          total: risks.length,
          high: risks.filter(r => r.level === "Yüksek").length,
          medium: risks.filter(r => r.level === "Orta").length,
          low: risks.filter(r => r.level === "Düşük").length
        },
        capas: {
          total: capas.length,
          open: capas.filter(c => c.status === "Uygulanıyor").length,
          closed: capas.filter(c => c.status === "Tamamlandı").length,
          overdue: capas.filter(c => c.dueDate && new Date(c.dueDate) < new Date()).length
        },
        audits: {
          total: audits.length,
          planned: audits.filter(a => a.status === "Planlandı").length,
          completed: audits.filter(a => a.status === "Tamamlandı").length,
          findings: audits.reduce((sum, a) => sum + a.findings.length, 0)
        },
        proficiency: {
          total: proficiencyTests.length,
          passed: proficiencyTests.filter(p => p.status === "Başarılı" || p.status === "Tamamlandı").length,
          failed: proficiencyTests.filter(p => p.status === "Başarısız").length,
          pending: proficiencyTests.filter(p => p.status === "Devam Ediyor").length
        },
        complaints: {
          total: complaints.length,
          open: complaints.filter(c => c.status === "İnceleniyor").length,
          resolved: complaints.filter(c => c.status === "Çözüldü").length,
          satisfaction: complaints.filter(c => c.customerSatisfaction.rating > 0).length
        }
      })
    } catch (error) {
      console.error("Dashboard data fetch error:", error)
    } finally {
      setIsLoading(false)
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
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">ISO 17025 Kalite Doküman Yönetim Sistemi - Kapsamlı Analitik Görünüm</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Ana İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Doküman</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{dashboardData.documents.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">{dashboardData.documents.pending}</span> bekleyen onay
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ekipman Durumu</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dashboardData.equipment.total}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-orange-600">{dashboardData.equipment.due}</span> kalibrasyon gerekli
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Testler</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{dashboardData.tests.running}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">{dashboardData.tests.completed}</span> tamamlandı
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Durumu</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{dashboardData.risks.high}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">{dashboardData.risks.total}</span> toplam risk
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="quality">Kalite Metrikleri</TabsTrigger>
          <TabsTrigger value="operations">Operasyonel</TabsTrigger>
          <TabsTrigger value="compliance">Uyumluluk</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Modül Özet Kartları */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Doküman Yönetimi */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Doküman Yönetimi</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.documents.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bekleyen</span>
                    <span className="font-medium text-orange-600">{dashboardData.documents.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Onaylanan</span>
                    <span className="font-medium text-green-600">{dashboardData.documents.approved}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ekipman Yönetimi */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ekipman Yönetimi</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.equipment.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Aktif</span>
                    <span className="font-medium text-green-600">{dashboardData.equipment.calibrated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kalibrasyon Gerekli</span>
                    <span className="font-medium text-orange-600">{dashboardData.equipment.due}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personel Yönetimi */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Personel Yönetimi</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.personnel.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Eğitimli</span>
                    <span className="font-medium text-green-600">{dashboardData.personnel.trained}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sertifikalı</span>
                    <span className="font-medium text-blue-600">{dashboardData.personnel.certified}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6">
          {/* Kalite Metrikleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Numune Yönetimi */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Numune Yönetimi</CardTitle>
                <Microscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.samples.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bekleyen</span>
                    <span className="font-medium text-orange-600">{dashboardData.samples.pending}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tamamlandı</span>
                    <span className="font-medium text-green-600">{dashboardData.samples.completed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Test İşleri */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Test İşleri</CardTitle>
                <TestTube className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.tests.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Devam Ediyor</span>
                    <span className="font-medium text-blue-600">{dashboardData.tests.running}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tamamlandı</span>
                    <span className="font-medium text-green-600">{dashboardData.tests.completed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Yeterlilik Testleri */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Yeterlilik Testleri</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.proficiency.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Başarılı</span>
                    <span className="font-medium text-green-600">{dashboardData.proficiency.passed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Başarısız</span>
                    <span className="font-medium text-red-600">{dashboardData.proficiency.failed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="operations" className="space-y-6">
          {/* Operasyonel Metrikler */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* CAPA Sistemi */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CAPA Sistemi</CardTitle>
                <CheckSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.capas.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Açık</span>
                    <span className="font-medium text-orange-600">{dashboardData.capas.open}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kapatıldı</span>
                    <span className="font-medium text-green-600">{dashboardData.capas.closed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* İç Denetim */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">İç Denetim</CardTitle>
                <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.audits.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Planlandı</span>
                    <span className="font-medium text-blue-600">{dashboardData.audits.planned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Tamamlandı</span>
                    <span className="font-medium text-green-600">{dashboardData.audits.completed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Müşteri Şikayetleri */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Müşteri Şikayetleri</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.complaints.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Açık</span>
                    <span className="font-medium text-orange-600">{dashboardData.complaints.open}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Çözüldü</span>
                    <span className="font-medium text-green-600">{dashboardData.complaints.resolved}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          {/* Uyumluluk Metrikleri */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Risk Yönetimi */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Risk Yönetimi</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Toplam</span>
                    <span className="font-medium">{dashboardData.risks.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Yüksek</span>
                    <span className="font-medium text-red-600">{dashboardData.risks.high}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Orta</span>
                    <span className="font-medium text-orange-600">{dashboardData.risks.medium}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Düşük</span>
                    <span className="font-medium text-green-600">{dashboardData.risks.low}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personel Sertifikaları */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Personel Sertifikaları</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Sertifikalı</span>
                    <span className="font-medium text-green-600">{dashboardData.personnel.certified}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Süresi Dolmuş</span>
                    <span className="font-medium text-red-600">{dashboardData.personnel.expired}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Eğitimli</span>
                    <span className="font-medium text-blue-600">{dashboardData.personnel.trained}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Müşteri Memnuniyeti */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Müşteri Memnuniyeti</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Değerlendirilen</span>
                    <span className="font-medium text-green-600">{dashboardData.complaints.satisfaction}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Çözülen</span>
                    <span className="font-medium text-blue-600">{dashboardData.complaints.resolved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Açık</span>
                    <span className="font-medium text-orange-600">{dashboardData.complaints.open}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Hızlı Erişim ve Özet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sistem Durumu Özeti */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Sistem Durumu Özeti</span>
            </CardTitle>
            <CardDescription>ISO 17025 uyumluluk durumu ve kritik göstergeler</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Uyumluluk Skoru */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">ISO 17025 Uyumluluk Skoru</h3>
                  <Badge className="bg-green-100 text-green-800">%92</Badge>
                </div>
                <Progress value={92} className="h-3" />
                <p className="text-sm text-muted-foreground mt-2">
                  Tüm modüller aktif ve güncel durumda
                </p>
              </div>

              {/* Kritik Uyarılar */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-muted-foreground">Kritik Uyarılar</h4>
                {dashboardData.equipment.due > 0 && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">
                        {dashboardData.equipment.due} ekipman kalibrasyon gerektiriyor
                      </p>
                      <p className="text-xs text-orange-600">30 gün içinde kalibre edilmeli</p>
                    </div>
                  </div>
                )}
                
                {dashboardData.risks.high > 0 && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-red-50 border border-red-200">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        {dashboardData.risks.high} yüksek riskli durum tespit edildi
                      </p>
                      <p className="text-xs text-red-600">Acil müdahale gerekli</p>
                    </div>
                  </div>
                )}

                {dashboardData.personnel.expired > 0 && (
                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                    <Clock className="h-5 w-5 text-yellow-600" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        {dashboardData.personnel.expired} personel sertifikası süresi dolmuş
                      </p>
                      <p className="text-xs text-yellow-600">Yenileme işlemi gerekli</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hızlı İstatistikler */}
        <div className="space-y-6">
          {/* Bu Ay Özeti */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Bu Ay Özeti</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Onaylanan Dokümanlar</span>
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{dashboardData.documents.approved}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tamamlanan Testler</span>
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{dashboardData.tests.completed}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Çözülen Şikayetler</span>
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{dashboardData.complaints.resolved}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Kapatılan CAPA'lar</span>
                  <div className="flex items-center space-x-2">
                    <ArrowUpRight className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-600">{dashboardData.capas.closed}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performans Göstergeleri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Performans</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Test Başarı Oranı</span>
                  <span className="text-sm font-medium text-green-600">
                    {dashboardData.tests.total > 0 ? 
                      Math.round((dashboardData.tests.completed / dashboardData.tests.total) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Yeterlilik Başarı Oranı</span>
                  <span className="text-sm font-medium text-green-600">
                    {dashboardData.proficiency.total > 0 ? 
                      Math.round((dashboardData.proficiency.passed / dashboardData.proficiency.total) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Şikayet Çözüm Oranı</span>
                  <span className="text-sm font-medium text-green-600">
                    {dashboardData.complaints.total > 0 ? 
                      Math.round((dashboardData.complaints.resolved / dashboardData.complaints.total) * 100) : 0}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Ekipman Aktif Oranı</span>
                  <span className="text-sm font-medium text-green-600">
                    {dashboardData.equipment.total > 0 ? 
                      Math.round((dashboardData.equipment.calibrated / dashboardData.equipment.total) * 100) : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
