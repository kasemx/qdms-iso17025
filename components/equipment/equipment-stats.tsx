import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { 
  Wrench,
  TrendingUp,
  ShieldCheck,
  Activity,
  AlertTriangle,
  BarChart3,
  MapPin,
  Clock
} from "lucide-react"

interface Equipment {
  id: string
  name: string
  status: string
  location: string
  nextCalibration: string
  nextMaintenanceDate: string
  maintenanceStatus: 'current' | 'due' | 'overdue'
  utilizationRate: number
  performanceMetrics: {
    uptime: number
    reliability: number
    efficiency: number
  }
  compliance: {
    iso17025: boolean
    gmp: boolean
    fda: boolean
    lastAuditDate: string
  }
}

interface MaintenanceRecord {
  cost: number
}

interface EquipmentStatsProps {
  equipment: Equipment[]
  maintenanceRecords: MaintenanceRecord[]
}

export function EquipmentStats({ equipment, maintenanceRecords }: EquipmentStatsProps) {
  // Calculate statistics
  const activeCount = equipment.filter(e => e.status === 'active').length
  const maintenanceDueCount = equipment.filter(e => e.maintenanceStatus === 'due' || e.maintenanceStatus === 'overdue').length
  const calibrationDueCount = equipment.filter(e => {
    const nextDate = new Date(e.nextCalibration)
    const today = new Date()
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 30
  }).length
  
  const avgUptime = equipment.length > 0 
    ? Math.round(equipment.reduce((sum, e) => sum + e.performanceMetrics.uptime, 0) / equipment.length)
    : 0
  
  const totalCost = maintenanceRecords.reduce((sum, m) => sum + m.cost, 0)
  const complianceCount = equipment.filter(e => e.compliance.iso17025).length
  const complianceRate = equipment.length > 0 ? Math.round((complianceCount / equipment.length) * 100) : 0
  
  const avgUtilization = equipment.length > 0
    ? Math.round(equipment.reduce((sum, e) => sum + e.utilizationRate, 0) / equipment.length)
    : 0

  const upcomingCalibrations = equipment.filter((item) => {
    const nextDate = new Date(item.nextCalibration)
    const today = new Date()
    const daysUntil = Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 30 && daysUntil >= 0
  })

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ekipman</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{equipment.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı ekipman sayısı</p>
            <div className="mt-2">
              <Progress value={(activeCount / equipment.length) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((activeCount / equipment.length) * 100)}% aktif
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Çalışma Süresi</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUptime}%</div>
            <p className="text-xs text-muted-foreground">Sistem çalışma süresi</p>
            <div className="mt-2">
              <Progress value={avgUptime} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uyumluluk Oranı</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceRate}%</div>
            <p className="text-xs text-muted-foreground">ISO 17025 uyumluluğu</p>
            <div className="mt-2">
              <Progress value={complianceRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kullanım Oranı</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground">Ortalama kullanım oranı</p>
            <div className="mt-2">
              <Progress value={avgUtilization} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Analytics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Bakım Durumu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Bakım Gerekli</span>
                <div className="flex items-center gap-2">
                  <Progress value={(maintenanceDueCount / equipment.length) * 100} className="h-1 w-12" />
                  <span className="text-xs font-medium">{maintenanceDueCount}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Kalibrasyon Gerekli</span>
                <div className="flex items-center gap-2">
                  <Progress value={(calibrationDueCount / equipment.length) * 100} className="h-1 w-12" />
                  <span className="text-xs font-medium">{calibrationDueCount}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Maliyet Analizi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-lg font-bold">₺{totalCost.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Toplam bakım maliyeti</div>
              <div className="text-xs">
                Ekipman başına: ₺{equipment.length > 0 ? Math.round(totalCost / equipment.length).toLocaleString() : 0}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Konum Dağılımı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {Array.from(new Set(equipment.map(e => e.location))).slice(0, 3).map((location) => {
                const count = equipment.filter(e => e.location === location).length
                const percentage = (count / equipment.length) * 100
                return (
                  <div key={location} className="flex items-center justify-between">
                    <span className="text-xs truncate">{location}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={percentage} className="h-1 w-12" />
                      <span className="text-xs font-medium">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Yaklaşan Görevler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span>Bu Hafta</span>
                <span className="font-medium">{upcomingCalibrations.filter(e => {
                  const days = Math.ceil((new Date(e.nextCalibration).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
                  return days <= 7
                }).length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Bu Ay</span>
                <span className="font-medium">{upcomingCalibrations.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>Kritik</span>
                <span className="font-medium text-red-600">{equipment.filter(e => e.maintenanceStatus === 'overdue').length}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}