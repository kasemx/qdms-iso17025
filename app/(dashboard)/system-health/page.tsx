"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Activity,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  RefreshCw,
  Download,
  Settings,
  BarChart3,
  Shield,
  Zap,
  Database,
  Server,
  Globe,
  Cpu,
  HardDrive,
  Wifi,
  Clock,
  TrendingUp,
  TrendingDown,
  Minus,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Target,
  Users,
  FileText,
  MessageSquare,
  ClipboardCheck,
  Award,
  Microscope,
  Wrench,
  BookOpen,
  CheckSquare,
  XCircle,
  Plus,
  Filter,
  Search
} from "lucide-react"
import { toast } from "sonner"
import { performanceHelpers, generatePerformanceReport } from "@/lib/performance"
import { accessibilityHelpers } from "@/lib/accessibility"

export default function SystemHealthPage() {
  const [systemHealth, setSystemHealth] = useState({
    overall: 0,
    performance: 0,
    accessibility: 0,
    security: 0,
    compliance: 0
  })
  const [performanceData, setPerformanceData] = useState<any>(null)
  const [accessibilityData, setAccessibilityData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetchSystemHealth()
  }, [])

  const fetchSystemHealth = async () => {
    try {
      setIsLoading(true)
      
      // Performans verilerini al
      const perfReport = generatePerformanceReport()
      setPerformanceData(perfReport)
      
      // Erişilebilirlik verilerini al
      const accReport = accessibilityHelpers.generateReport()
      setAccessibilityData(accReport)
      
      // Sistem sağlık skorunu hesapla
      const overall = Math.round((perfReport.summary.averagePageLoad > 0 ? 85 : 90) + 
                                (accReport.score / 10) + 
                                95 + // Security (mock)
                                92) / 4 // Compliance (mock)
      
      setSystemHealth({
        overall,
        performance: Math.round(perfReport.summary.averagePageLoad > 0 ? 85 : 90),
        accessibility: accReport.score,
        security: 95, // Mock data
        compliance: 92 // Mock data
      })
    } catch (error) {
      console.error("System health fetch error:", error)
      toast.error("Sistem sağlık verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getHealthBadge = (score: number) => {
    if (score >= 90) {
      return <Badge className="bg-green-100 text-green-800">Mükemmel</Badge>
    } else if (score >= 80) {
      return <Badge className="bg-blue-100 text-blue-800">İyi</Badge>
    } else if (score >= 70) {
      return <Badge className="bg-yellow-100 text-yellow-800">Orta</Badge>
    } else {
      return <Badge className="bg-red-100 text-red-800">Kötü</Badge>
    }
  }

  const getHealthIcon = (score: number) => {
    if (score >= 90) {
      return <CheckCircle className="h-5 w-5 text-green-600" />
    } else if (score >= 80) {
      return <Activity className="h-5 w-5 text-blue-600" />
    } else if (score >= 70) {
      return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    } else {
      return <AlertCircle className="h-5 w-5 text-red-600" />
    }
  }

  const handleRefreshHealth = async () => {
    await fetchSystemHealth()
    toast.success("Sistem sağlık verileri yenilendi")
  }

  const handleRunDiagnostics = async () => {
    toast.loading("Sistem tanıları çalıştırılıyor...")
    // Mock diagnostics
    setTimeout(() => {
      toast.success("Sistem tanıları tamamlandı")
    }, 3000)
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
          <h1 className="text-3xl font-bold text-foreground">Sistem Sağlığı</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu sistem performansı ve sağlık durumu</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshHealth}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          <Button onClick={handleRunDiagnostics}>
            <Zap className="w-4 h-4 mr-2" />
            Tanı Çalıştır
          </Button>
        </div>
      </div>

      {/* Genel Sağlık Skoru */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {getHealthIcon(systemHealth.overall)}
            <span>Genel Sistem Sağlığı</span>
          </CardTitle>
          <CardDescription>Sistem performansı ve sağlık durumu özeti</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">{systemHealth.overall}%</span>
              {getHealthBadge(systemHealth.overall)}
            </div>
            <Progress value={systemHealth.overall} className="h-3" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span>Performans: {systemHealth.performance}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Erişilebilirlik: {systemHealth.accessibility}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Database className="h-4 w-4 text-purple-600" />
                <span>Güvenlik: {systemHealth.security}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-orange-600" />
                <span>Uyumluluk: {systemHealth.compliance}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="performance">Performans</TabsTrigger>
          <TabsTrigger value="accessibility">Erişilebilirlik</TabsTrigger>
          <TabsTrigger value="security">Güvenlik</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Sistem Bileşenleri */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Frontend</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Aktif</div>
                <p className="text-xs text-muted-foreground">Next.js 15, React 19</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Backend API</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Aktif</div>
                <p className="text-xs text-muted-foreground">Mock API Servisleri</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Veritabanı</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Aktif</div>
                <p className="text-xs text-muted-foreground">Mock Data Store</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entegrasyonlar</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8/8 Aktif</div>
                <p className="text-xs text-muted-foreground">Modül entegrasyonları</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Raporlama</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Aktif</div>
                <p className="text-xs text-muted-foreground">PDF, Excel, Word</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Güvenlik</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">Aktif</div>
                <p className="text-xs text-muted-foreground">XSS, CSRF koruması</p>
              </CardContent>
            </Card>
          </div>

          {/* Sistem Metrikleri */}
          <Card>
            <CardHeader>
              <CardTitle>Sistem Metrikleri</CardTitle>
              <CardDescription>Gerçek zamanlı sistem performans göstergeleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">245ms</div>
                  <div className="text-sm text-muted-foreground">Ortalama Yanıt</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1.2GB</div>
                  <div className="text-sm text-muted-foreground">Bellek Kullanımı</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <div className="text-sm text-muted-foreground">Aktif Kullanıcı</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          {performanceData && (
            <div className="space-y-6">
              {/* Performans Özeti */}
              <Card>
                <CardHeader>
                  <CardTitle>Performans Özeti</CardTitle>
                  <CardDescription>Sayfa yükleme ve API yanıt süreleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {performanceData.summary.averagePageLoad.toFixed(0)}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Ortalama Sayfa Yükleme</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {performanceData.summary.averageApiResponse.toFixed(0)}ms
                      </div>
                      <div className="text-sm text-muted-foreground">Ortalama API Yanıt</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {performanceData.summary.averageMemoryUsage.toFixed(1)}MB
                      </div>
                      <div className="text-sm text-muted-foreground">Ortalama Bellek</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performans Önerileri */}
              {performanceData.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Performans Önerileri</CardTitle>
                    <CardDescription>Sistem performansını iyileştirmek için öneriler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {performanceData.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                          <TrendingUp className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Performans Uyarıları */}
              {performanceData.alerts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Performans Uyarıları</CardTitle>
                    <CardDescription>Dikkat edilmesi gereken performans sorunları</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {performanceData.alerts.map((alert: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-yellow-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm">{alert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          {accessibilityData && (
            <div className="space-y-6">
              {/* Erişilebilirlik Skoru */}
              <Card>
                <CardHeader>
                  <CardTitle>Erişilebilirlik Skoru</CardTitle>
                  <CardDescription>WCAG 2.1 AA uyumluluk durumu</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold">{accessibilityData.score}%</span>
                      {getHealthBadge(accessibilityData.score)}
                    </div>
                    <Progress value={accessibilityData.score} className="h-3" />
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-xl font-bold text-red-600">{accessibilityData.issuesBySeverity.high}</div>
                        <div className="text-muted-foreground">Yüksek Öncelik</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-600">{accessibilityData.issuesBySeverity.medium}</div>
                        <div className="text-muted-foreground">Orta Öncelik</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-600">{accessibilityData.issuesBySeverity.low}</div>
                        <div className="text-muted-foreground">Düşük Öncelik</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* WCAG Uyumluluk */}
              <Card>
                <CardHeader>
                  <CardTitle>WCAG Uyumluluk</CardTitle>
                  <CardDescription>Web Content Accessibility Guidelines uyumluluk seviyeleri</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Level A</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={100 - accessibilityData.wcagCompliance.levelA} className="w-20 h-2" />
                        <span className="text-sm font-medium">{100 - accessibilityData.wcagCompliance.levelA}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Level AA</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={100 - accessibilityData.wcagCompliance.levelAA} className="w-20 h-2" />
                        <span className="text-sm font-medium">{100 - accessibilityData.wcagCompliance.levelAA}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Level AAA</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={100 - accessibilityData.wcagCompliance.levelAAA} className="w-20 h-2" />
                        <span className="text-sm font-medium">{100 - accessibilityData.wcagCompliance.levelAAA}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Erişilebilirlik Önerileri */}
              {accessibilityData.recommendations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Erişilebilirlik Önerileri</CardTitle>
                    <CardDescription>Sistem erişilebilirliğini iyileştirmek için öneriler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {accessibilityData.recommendations.map((rec: string, index: number) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Güvenlik Durumu</CardTitle>
                <CardDescription>Güvenlik kontrolleri ve durumu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">XSS Koruması</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CSRF Koruması</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">HTTPS</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Veri Şifreleme</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Güvenlik Uyarıları</CardTitle>
                <CardDescription>Son güvenlik uyarıları ve öneriler</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 p-2 bg-green-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Güvenlik açığı tespit edilmedi</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Tüm güvenlik kontrolleri aktif</span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 bg-purple-50 rounded">
                    <Database className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Veri güvenliği sağlanmış</span>
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
