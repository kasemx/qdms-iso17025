/**
 * Enhanced Dashboard Cards
 * @description Improved card designs with better visual hierarchy and spacing
 */

import { memo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  FileText,
  Settings,
  Users,
  TestTube,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  MoreVertical,
  Calendar,
  Clock
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

interface EnhancedOverviewProps {
  dashboardData: DashboardData
}

/**
 * Enhanced Overview Section with Priority-based Layout
 */
export const EnhancedOverview = memo<EnhancedOverviewProps>(function EnhancedOverview({ dashboardData }) {
  return (
    <div className="space-y-8">
      {/* Critical Alerts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">⚠️ Kritik Uyarılar</h3>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Tümünü Gör
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Kalibrasyon Uyarıları */}
          {dashboardData.equipment.due > 0 && (
            <Card className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Settings className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                        Kalibrasyon Gerekli
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {dashboardData.equipment.due}
                    </p>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      30 gün içinde yapılmalı
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Acil
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Yüksek Risk Uyarıları */}
          {dashboardData.risks.high > 0 && (
            <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-950/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm font-medium text-red-800 dark:text-red-200">
                        Yüksek Risk
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-red-700 dark:text-red-300">
                      {dashboardData.risks.high}
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      Müdahale gerekli
                    </p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    Kritik
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Süresi Dolan Sertifikalar */}
          {dashboardData.personnel.expired > 0 && (
            <Card className="border-l-4 border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        Süresi Dolan Sertifika
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                      {dashboardData.personnel.expired}
                    </p>
                    <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      Yenileme gerekli
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs bg-yellow-200 text-yellow-800">
                    Uyarı
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">📊 Ana Performans Göstergeleri</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Doküman Durumu */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Dokümanlar</CardTitle>
              <FileText className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {dashboardData.documents.total}
                  </div>
                  <p className="text-xs text-muted-foreground">Toplam doküman</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Onay Oranı</span>
                    <span className="font-medium">
                      {Math.round((dashboardData.documents.approved / dashboardData.documents.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(dashboardData.documents.approved / dashboardData.documents.total) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dashboardData.documents.pending} bekleyen</span>
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +5.2%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ekipman Durumu */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Ekipmanlar</CardTitle>
              <Settings className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {dashboardData.equipment.total}
                  </div>
                  <p className="text-xs text-muted-foreground">Toplam ekipman</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aktif Oran</span>
                    <span className="font-medium">
                      {Math.round((dashboardData.equipment.calibrated / dashboardData.equipment.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(dashboardData.equipment.calibrated / dashboardData.equipment.total) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dashboardData.equipment.due} kalibrasyon</span>
                  <span className="flex items-center text-orange-600">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    -2.1%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Durumu */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Test İşleri</CardTitle>
              <TestTube className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {dashboardData.tests.running}
                  </div>
                  <p className="text-xs text-muted-foreground">Devam eden testler</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Başarı Oranı</span>
                    <span className="font-medium">
                      {Math.round((dashboardData.tests.completed / dashboardData.tests.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(dashboardData.tests.completed / dashboardData.tests.total) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dashboardData.tests.completed} tamamlandı</span>
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +8.7%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personel Durumu */}
          <Card className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <CardTitle className="text-sm font-medium">Personel</CardTitle>
              <Users className="h-5 w-5 text-indigo-600" />
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">
                    {dashboardData.personnel.total}
                  </div>
                  <p className="text-xs text-muted-foreground">Toplam personel</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Yetkinlik Oranı</span>
                    <span className="font-medium">
                      {Math.round((dashboardData.personnel.trained / dashboardData.personnel.total) * 100)}%
                    </span>
                  </div>
                  <Progress 
                    value={(dashboardData.personnel.trained / dashboardData.personnel.total) * 100} 
                    className="h-2"
                  />
                </div>

                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{dashboardData.personnel.certified} sertifikalı</span>
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +3.4%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">⚡ Hızlı İşlemler</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Yeni Doküman</span>
          </Button>
          
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <Settings className="w-5 h-5" />
            <span className="text-sm">Kalibrasyon Planla</span>
          </Button>
          
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <TestTube className="w-5 h-5" />
            <span className="text-sm">Test Başlat</span>
          </Button>
          
          <Button variant="outline" className="h-16 flex-col space-y-1">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Denetim Planla</span>
          </Button>
        </div>
      </div>
    </div>
  )
})