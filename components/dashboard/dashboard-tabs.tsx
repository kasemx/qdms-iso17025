/**
 * Dashboard Tab Components
 * @description Dashboard sayfasındaki tab content'leri - Component size kuralına uygun
 */

import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText, 
  Settings,
  Users,
  CheckCircle,
  Shield,
  TestTube,
  Target,
  Award,
  Microscope,
  ClipboardCheck,
  MessageSquare
} from "lucide-react"

interface DashboardData {
  documents: { total: number; pending: number; approved: number; revisions: number }
  equipment: { total: number; calibrated: number; due: number; critical: number }
  personnel: { total: number; trained: number; certified: number; expired: number }
  samples: { total: number; pending: number; completed: number; rejected: number }
  tests: { total: number; running: number; completed: number; failed: number }
  risks: { total: number; high: number; medium: number; low: number }
  capas: { total: number; open: number; closed: number; overdue: number }
  audits: { total: number; planned: number; completed: number; findings: number }
  proficiency: { total: number; passed: number; failed: number; pending: number }
  complaints: { total: number; open: number; resolved: number; satisfaction: number }
}

interface TabComponentProps {
  dashboardData: DashboardData
}

/**
 * Overview Tab Component
 */
export const OverviewTab = memo<TabComponentProps>(function OverviewTab({ dashboardData }) {
  return (
    <div className="space-y-6">
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
    </div>
  )
})

/**
 * Quality Tab Component
 */
export const QualityTab = memo<TabComponentProps>(function QualityTab({ dashboardData }) {
  return (
    <div className="space-y-6">
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
    </div>
  )
})

/**
 * Operations Tab Component
 */
export const OperationsTab = memo<TabComponentProps>(function OperationsTab({ dashboardData }) {
  return (
    <div className="space-y-6">
      {/* Operasyonel Metrikler */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* CAPA Sistemi */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CAPA Sistemi</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
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
    </div>
  )
})