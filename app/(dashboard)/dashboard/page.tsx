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
import { EnhancedOverview } from "@/components/dashboard/enhanced-dashboard-cards"
// Ana modül tabları için import'lar (mevcut ISO tab'ları korundu)
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
        {/* Enhanced Dashboard Overview - Unified Design */}
        <EnhancedOverview dashboardData={dashboardData} />
        <LiveMonitoring data={dashboardData} />

      {/* Tab Navigation */}
      <Tabs value={state.activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 gap-2 bg-muted p-1 h-12">
          <TabsTrigger 
            value={DASHBOARD_TABS.OVERVIEW}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            Genel Bakış
          </TabsTrigger>
          <TabsTrigger 
            value={DASHBOARD_TABS.ISO_MAPPING}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            ISO 17025
          </TabsTrigger>
          <TabsTrigger 
            value={DASHBOARD_TABS.QUALITY}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            Kalite
          </TabsTrigger>
          <TabsTrigger 
            value={DASHBOARD_TABS.OPERATIONS}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            Operasyonel
          </TabsTrigger>
          <TabsTrigger 
            value={DASHBOARD_TABS.COMPLIANCE}
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200 font-medium"
          >
            Uyumluluk
          </TabsTrigger>
        </TabsList>

        <TabsContent value={DASHBOARD_TABS.OVERVIEW} className="space-y-6">
          <InteractiveAnalytics data={dashboardData} />
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
