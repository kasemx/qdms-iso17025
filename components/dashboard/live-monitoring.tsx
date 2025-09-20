"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Activity, 
  AlertCircle, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  Bell,
  RefreshCw
} from "lucide-react"

interface RealTimeData {
  activeTests: number
  pendingApprovals: number
  systemLoad: number
  lastUpdate: string
  alerts: Array<{
    id: string
    type: 'warning' | 'error' | 'info'
    message: string
    timestamp: string
  }>
}

interface LiveMonitoringProps {
  data: {
    tests: { running: number; completed: number; failed: number }
    equipment: { due: number; critical: number }
    documents: { pending: number }
    risks: { high: number }
  }
}

export function LiveMonitoring({ data }: LiveMonitoringProps) {
  const [realTimeData, setRealTimeData] = useState<RealTimeData>({
    activeTests: data.tests.running,
    pendingApprovals: data.documents.pending,
    systemLoad: 45,
    lastUpdate: new Date().toLocaleTimeString('tr-TR'),
    alerts: [
      {
        id: '1',
        type: 'warning',
        message: 'EKP-001 kalibrasyonu 3 gün içinde yapılmalı',
        timestamp: '10:30'
      },
      {
        id: '2',
        type: 'error',
        message: 'Test laboratuvarı sıcaklık uyarısı',
        timestamp: '10:25'
      },
      {
        id: '3',
        type: 'info',
        message: 'Yeni doküman onaya sunuldu',
        timestamp: '10:20'
      }
    ]
  })

  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeTests: prev.activeTests + Math.floor(Math.random() * 3) - 1,
        systemLoad: Math.max(20, Math.min(90, prev.systemLoad + Math.floor(Math.random() * 10) - 5)),
        lastUpdate: new Date().toLocaleTimeString('tr-TR')
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Canlı Sistem Durumu */}
      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Canlı Sistem Durumu</span>
              {isLive && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">CANLI</span>
                </div>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Son güncelleme: {realTimeData.lastUpdate}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLive(!isLive)}
          >
            {isLive ? (
              <>
                <Clock className="h-4 w-4 mr-2" />
                Duraklat
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Başlat
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Gerçek Zamanlı Metrikler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{realTimeData.activeTests}</div>
                <p className="text-xs text-blue-700">Aktif Test</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">+2</span>
                </div>
              </div>
              
              <div className="text-center p-3 rounded-lg bg-orange-50 border border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{realTimeData.pendingApprovals}</div>
                <p className="text-xs text-orange-700">Bekleyen Onay</p>
                <div className="flex items-center justify-center mt-1">
                  <TrendingDown className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">-1</span>
                </div>
              </div>

              <div className="text-center p-3 rounded-lg bg-purple-50 border border-purple-200">
                <div className="text-2xl font-bold text-purple-600">{realTimeData.systemLoad}%</div>
                <p className="text-xs text-purple-700">Sistem Yükü</p>
                <div className="w-full bg-purple-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${realTimeData.systemLoad}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="text-2xl font-bold text-green-600">98.5%</div>
                <p className="text-xs text-green-700">Uptime</p>
                <div className="flex items-center justify-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                  <span className="text-xs text-green-600">Stabil</span>
                </div>
              </div>
            </div>

            {/* Kritik Göstergeler */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border border-red-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800">Kritik Uyarılar</span>
                </div>
                <div className="text-2xl font-bold text-red-600 mt-1">{data.equipment.critical + data.risks.high}</div>
                <p className="text-xs text-red-700">Acil müdahale gerekli</p>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Süresi Yaklaşan</span>
                </div>
                <div className="text-2xl font-bold text-yellow-600 mt-1">{data.equipment.due}</div>
                <p className="text-xs text-yellow-700">30 gün içinde</p>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Hedef Performans</span>
                </div>
                <div className="text-2xl font-bold text-blue-600 mt-1">92%</div>
                <p className="text-xs text-blue-700">ISO 17025 uyumluluk</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Canlı Bildirimler */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-orange-500" />
            <span>Canlı Bildirimler</span>
            <Badge variant="secondary" className="ml-auto">
              {realTimeData.alerts.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {realTimeData.alerts.map((alert) => (
              <div 
                key={alert.id}
                className={`p-3 rounded-lg border ${
                  alert.type === 'error' ? 'bg-red-50 border-red-200' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                  'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-start space-x-2">
                  {alert.type === 'error' && <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />}
                  {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />}
                  {alert.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />}
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${
                      alert.type === 'error' ? 'text-red-800' :
                      alert.type === 'warning' ? 'text-yellow-800' :
                      'text-blue-800'
                    }`}>
                      {alert.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t">
            <Button variant="outline" size="sm" className="w-full">
              <Bell className="h-4 w-4 mr-2" />
              Tüm Bildirimleri Görüntüle
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}