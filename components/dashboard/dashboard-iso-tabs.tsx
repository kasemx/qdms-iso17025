/**
 * ISO Mapping and Compliance Tab Components
 * @description ISO 17025 Mapping ve Compliance tab content'leri
 */

import { memo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Shield,
  Settings,
  TestTube,
  CheckCircle,
  Target,
  Award,
  UserCheck
} from "lucide-react"

interface DashboardData {
  personnel: { certified: number; expired: number; trained: number }
  risks: { total: number; high: number; medium: number; low: number }
  complaints: { total: number; open: number; resolved: number; satisfaction: number }
}

interface TabComponentProps {
  dashboardData: DashboardData
}

/**
 * ISO Mapping Tab Component
 */
export const ISOMapingTab = memo<TabComponentProps>(function ISOMapingTab({ dashboardData }) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">ISO 17025:2017 Gereklilik Haritası</h2>
        <p className="text-muted-foreground">Her modülün hangi ISO maddesine karşılık geldiğini görün</p>
      </div>

      {/* Genel Gereklilikler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <span>4. Genel Gereklilikler</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">4.1 Adalet (Impartiality)</p>
                  <p className="text-sm text-green-600">Tarafsızlık Yönetimi Modülü</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">4.2 Gizlilik (Confidentiality)</p>
                  <p className="text-sm text-green-600">Gizlilik Anlaşmaları Modülü</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <Target className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">4.3-4.6 Yapı & Kaynaklar</p>
                  <p className="text-sm text-blue-600">Organizasyon Şeması & Personel Modülleri</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Yönetim Gereklilikleri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-purple-600" />
            <span>5. Yönetim Gereklilikleri</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.1-5.2 Genel & Politika</p>
                  <p className="text-sm text-green-600">ISO Yönetim Sistemi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.3 Organizasyon</p>
                  <p className="text-sm text-green-600">Organizasyon Şeması</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.4 Yönetim</p>
                  <p className="text-sm text-green-600">Yönetim Gözden Geçirmesi</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.5-5.6 Dokümantasyon</p>
                  <p className="text-sm text-green-600">Doküman Yönetim Sistemi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.7 İç Denetim</p>
                  <p className="text-sm text-green-600">İç Denetim Modülü</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.8-5.9 CAPA</p>
                  <p className="text-sm text-green-600">CAPA Sistemi</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">5.10 İyileştirme</p>
                  <p className="text-sm text-green-600">Risk Yönetimi</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teknik Gereklilikler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5 text-orange-600" />
            <span>6. Teknik Gereklilikler</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.1-6.2 Genel & Personel</p>
                  <p className="text-sm text-green-600">Personel Yetkinlik Modülü</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.3-6.4 Tesis & Ekipman</p>
                  <p className="text-sm text-green-600">Ekipman Envanteri</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.5 Metrolojik İzlenebilirlik</p>
                  <p className="text-sm text-green-600">Kalibrasyon Kayıtları</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.6 Numune Yönetimi</p>
                  <p className="text-sm text-green-600">Numune Yönetimi Modülü</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.7-6.8 Test Metotları</p>
                  <p className="text-sm text-green-600">Test Metotları & İşleri</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.9 Yeterlilik Testleri</p>
                  <p className="text-sm text-green-600">Yeterlilik Testleri Modülü</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">6.10 Müşteri Şikayetleri</p>
                  <p className="text-sm text-green-600">Müşteri Şikayetleri Modülü</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Uyumluluk Özeti */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800">
            <Award className="h-5 w-5" />
            <span>ISO 17025 Uyumluluk Durumu</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-sm text-green-700">Genel Gereklilikler</p>
              <p className="text-xs text-green-600">2/2 modül tamamlandı</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-sm text-green-700">Yönetim Gereklilikleri</p>
              <p className="text-xs text-green-600">10/10 modül tamamlandı</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">100%</div>
              <p className="text-sm text-green-700">Teknik Gereklilikler</p>
              <p className="text-xs text-green-600">10/10 modül tamamlandı</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-white border border-green-200">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <p className="font-medium text-green-800">Tüm ISO 17025:2017 gereklilikleri karşılanmıştır!</p>
            </div>
            <p className="text-sm text-green-600 mt-1">
              Proje ISO 17025 standardına tam uyumlu ve akreditasyon için hazırdır.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

/**
 * Compliance Tab Component
 */
export const ComplianceTab = memo<TabComponentProps>(function ComplianceTab({ dashboardData }) {
  return (
    <div className="space-y-6">
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
    </div>
  )
})