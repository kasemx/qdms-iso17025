"use client"

import { useState, memo, useMemo, useCallback } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard"
import { useOnboarding } from "@/hooks/use-onboarding"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { LiveMonitoring } from "@/components/dashboard/live-monitoring"
import { InteractiveAnalytics } from "@/components/dashboard/interactive-analytics"
import { PageLayout, LoadingState } from "@/components/common"
import { ErrorBoundary } from "@/components/common/error-boundary"
import { DashboardProvider, useDashboard, useDashboardData, useDashboardActions } from "@/contexts/dashboard-context"
import { NOTIFICATION_CONSTANTS, DASHBOARD_TABS } from "@/lib/constants/dashboard"
import { OverviewTab, QualityTab, OperationsTab } from "@/components/dashboard/dashboard-tabs"
import { ISOMapingTab, ComplianceTab } from "@/components/dashboard/dashboard-iso-tabs"
// Ana modül tabları için import'lar (mevcut ISO tab'ları korundu)
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
  Minus,
  Bell
} from "lucide-react"

/**
 * Dashboard Page Component
 * @description ISO 17025 uyumlu dashboard sayfası - Error Boundary ve Context ile
 */
const DashboardPageContent = memo(function DashboardPageContent() {
  const { showWizard, showAgain, completeOnboarding, closeWizard, onShowAgainChange } = useOnboarding()
  const { state } = useDashboard()
  const { data: dashboardData, isLoading } = useDashboardData()
  const { refreshData, setActiveTab, setNotifications } = useDashboardActions()
  
  const [notifications] = useState(NOTIFICATION_CONSTANTS.DEFAULT_COUNT) // Constants kullanımı

  // Data fetching artık Context tarafından yönetiliyor

  const handleDownloadReport = useCallback(() => {
    try {
      // Implement report download functionality
      toast.success("Rapor indiriliyor...")
      // Gerçek implementasyon eklenecek
    } catch (error) {
      console.error("Report download error:", error)
      toast.error("Rapor indirme sırasında hata oluştu")
    }
  }, [])

  if (isLoading) {
    return (
      <PageLayout
        title="Dashboard"
        description="ISO 17025 Kalite Doküman Yönetim Sistemi - Kapsamlı Analitik Görünüm"
      >
        <LoadingState type="page" />
      </PageLayout>
    )
  }

  return (
    <>
      <OnboardingWizard
        isOpen={showWizard}
        onClose={closeWizard}
        onComplete={completeOnboarding}
        showAgain={showAgain}
        onShowAgainChange={onShowAgainChange}
      />
      
      <PageLayout
        title="Dashboard"
        description="ISO 17025 Kalite Doküman Yönetim Sistemi - Kapsamlı Analitik Görünüm"
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refreshData}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Canlı Analitik
            </Button>
            <Button variant="outline" size="sm" className="relative">
              <Bell className="w-4 h-4 mr-2" />
              Bildirimler
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1 min-w-[16px] h-4 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReport}>
              <Download className="w-4 h-4 mr-2" />
              Rapor İndir
            </Button>
          </div>
        }
      >
        {/* Dashboard Components */}
        <DashboardStats data={dashboardData} />
        <LiveMonitoring data={dashboardData} />
        <InteractiveAnalytics data={dashboardData} />

      {/* Tab Navigation */}
      <Tabs value={state.activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value={DASHBOARD_TABS.OVERVIEW}>Genel Bakış</TabsTrigger>
          <TabsTrigger value={DASHBOARD_TABS.ISO_MAPPING}>ISO 17025 Haritası</TabsTrigger>
          <TabsTrigger value={DASHBOARD_TABS.QUALITY}>Kalite Metrikleri</TabsTrigger>
          <TabsTrigger value={DASHBOARD_TABS.OPERATIONS}>Operasyonel</TabsTrigger>
          <TabsTrigger value={DASHBOARD_TABS.COMPLIANCE}>Uyumluluk</TabsTrigger>
        </TabsList>

        <TabsContent value={DASHBOARD_TABS.OVERVIEW} className="space-y-6">
          <OverviewTab dashboardData={dashboardData} />
        </TabsContent>

        <TabsContent value={DASHBOARD_TABS.ISO_MAPPING} className="space-y-6">
          <ISOMapingTab dashboardData={dashboardData} />
        </TabsContent>

        <TabsContent value={DASHBOARD_TABS.QUALITY} className="space-y-6">
          <QualityTab dashboardData={dashboardData} />
        </TabsContent>

        <TabsContent value={DASHBOARD_TABS.OPERATIONS} className="space-y-6">
          <OperationsTab dashboardData={dashboardData} />
        </TabsContent>

        <TabsContent value={DASHBOARD_TABS.COMPLIANCE} className="space-y-6">
          <ComplianceTab dashboardData={dashboardData} />
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
      </PageLayout>
    </>
  )
})

/**
 * Main Dashboard Page Export
 * @description ErrorBoundary ve DashboardProvider ile wrap edilmiş ana dashboard sayfası
 */
export default function DashboardPage() {
  return (
    <ErrorBoundary>
      <DashboardProvider>
        <DashboardPageContent />
      </DashboardProvider>
    </ErrorBoundary>
  )
}
