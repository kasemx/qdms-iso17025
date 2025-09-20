"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  BarChart3, 
  PieChart, 
  LineChart,
  TrendingUp,
  TrendingDown,
  Target,
  Filter,
  Download,
  Maximize2,
  RefreshCw
} from "lucide-react"

interface AnalyticsData {
  testPerformance: {
    thisMonth: number
    lastMonth: number
    trend: 'up' | 'down' | 'stable'
  }
  equipmentUtilization: {
    active: number
    maintenance: number
    calibration: number
  }
  qualityMetrics: {
    passRate: number
    complianceScore: number
    customerSatisfaction: number
  }
  departmentPerformance: Array<{
    name: string
    score: number
    tests: number
    trend: 'up' | 'down' | 'stable'
  }>
}

interface InteractiveAnalyticsProps {
  data: {
    tests: { total: number; running: number; completed: number; failed: number }
    equipment: { total: number; calibrated: number; due: number; critical: number }
    risks: { total: number; high: number; medium: number; low: number }
  }
}

export function InteractiveAnalytics({ data }: InteractiveAnalyticsProps) {
  const [selectedChart, setSelectedChart] = useState<'overview' | 'performance' | 'trends'>('overview')
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('month')

  // Mock analytics data - gerçek uygulamada API'den gelecek
  const analyticsData: AnalyticsData = {
    testPerformance: {
      thisMonth: data.tests.completed,
      lastMonth: Math.floor(data.tests.completed * 0.85),
      trend: 'up'
    },
    equipmentUtilization: {
      active: data.equipment.calibrated,
      maintenance: data.equipment.due,
      calibration: data.equipment.critical
    },
    qualityMetrics: {
      passRate: Math.round((data.tests.completed / (data.tests.completed + data.tests.failed)) * 100),
      complianceScore: 92,
      customerSatisfaction: 95
    },
    departmentPerformance: [
      { name: 'Kimya Lab', score: 95, tests: 156, trend: 'up' },
      { name: 'Mikrobiyoloji', score: 89, tests: 142, trend: 'stable' },
      { name: 'Fiziksel Test', score: 92, tests: 98, trend: 'up' },
      { name: 'Kalibrasyon', score: 88, tests: 76, trend: 'down' }
    ]
  }

  const performanceIncrease = analyticsData.testPerformance.thisMonth - analyticsData.testPerformance.lastMonth
  const performancePercentage = Math.round((performanceIncrease / analyticsData.testPerformance.lastMonth) * 100)

  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-foreground">📈 İnteraktif Analitik Dashboard</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Gerçek zamanlı performans metrikleri ve detaylı trendler
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtrele
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Yenile
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Dışa Aktar
          </Button>
        </div>
      </div>

      {/* Chart Navigation */}
      <div className="flex space-x-1 p-1 bg-muted rounded-lg">
        <Button
          variant={selectedChart === 'overview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedChart('overview')}
          className="flex-1 h-10"
        >
          <BarChart3 className="h-4 w-4 mr-2" />
          Genel Bakış
        </Button>
        <Button
          variant={selectedChart === 'performance' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedChart('performance')}
          className="flex-1 h-10"
        >
          <PieChart className="h-4 w-4 mr-2" />
          Performans
        </Button>
        <Button
          variant={selectedChart === 'trends' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setSelectedChart('trends')}
          className="flex-1 h-10"
        >
          <LineChart className="h-4 w-4 mr-2" />
          Trendler
        </Button>
      </div>

      {/* Time Range Selector */}
      <div className="flex space-x-1 p-1 bg-muted rounded-lg w-fit">
        <Button
          variant={timeRange === 'week' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTimeRange('week')}
          className="h-9"
        >
          Haftalık
        </Button>
        <Button
          variant={timeRange === 'month' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTimeRange('month')}
          className="h-9"
        >
          Aylık
        </Button>
        <Button
          variant={timeRange === 'quarter' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTimeRange('quarter')}
          className="h-9"
        >
          Üç Aylık
        </Button>
      </div>

      {/* Chart Content */}
      {selectedChart === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Test Performansı */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Test Performansı</CardTitle>
              <Button variant="ghost" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{analyticsData.testPerformance.thisMonth}</div>
                    <p className="text-sm text-muted-foreground">Bu ay tamamlanan test</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1">
                      {analyticsData.testPerformance.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className={`text-sm font-medium ${
                        analyticsData.testPerformance.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {performanceIncrease > 0 ? '+' : ''}{performancePercentage}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">Geçen aya göre</p>
                  </div>
                </div>
                
                {/* Mock Chart Data */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Hafta 1</span>
                    <span>25</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Hafta 2</span>
                    <span>32</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Hafta 3</span>
                    <span>28</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>Hafta 4</span>
                    <span>35</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ekipman Kullanımı */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Ekipman Kullanım Analizi</CardTitle>
              <Button variant="ghost" size="sm">
                <Maximize2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round((analyticsData.equipmentUtilization.active / data.equipment.total) * 100)}%
                  </div>
                  <p className="text-sm text-muted-foreground">Aktif Kullanım Oranı</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Aktif</span>
                    </div>
                    <span className="text-sm font-medium">{analyticsData.equipmentUtilization.active}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Bakım</span>
                    </div>
                    <span className="text-sm font-medium">{analyticsData.equipmentUtilization.maintenance}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm">Kalibrasyon</span>
                    </div>
                    <span className="text-sm font-medium">{analyticsData.equipmentUtilization.calibration}</span>
                  </div>
                </div>

                {/* Mock Pie Chart Representation */}
                <div className="relative w-32 h-32 mx-auto">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="transparent"
                      className="text-gray-200"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="transparent"
                      strokeDasharray={`${(analyticsData.equipmentUtilization.active / data.equipment.total) * 351.86} 351.86`}
                      className="text-green-500"
                    />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {selectedChart === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kalite Metrikleri */}
          {Object.entries(analyticsData.qualityMetrics).map(([key, value]) => (
            <Card key={key}>
              <CardHeader>
                <CardTitle className="text-base capitalize">
                  {key === 'passRate' ? 'Başarı Oranı' :
                   key === 'complianceScore' ? 'Uyumluluk Skoru' :
                   'Müşteri Memnuniyeti'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">{value}%</div>
                  <Progress value={value} className="h-3" />
                  <Badge variant="secondary" className="text-xs">
                    {value >= 90 ? 'Mükemmel' : value >= 80 ? 'İyi' : 'Geliştirilmeli'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {selectedChart === 'trends' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Departman Performans Trendleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.departmentPerformance.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-medium">{dept.name}</div>
                      <div className="text-sm text-muted-foreground">{dept.tests} test</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="font-medium">{dept.score}%</div>
                      <div className="text-xs text-muted-foreground">Performans</div>
                    </div>
                    <div className="flex items-center">
                      {dept.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                      {dept.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                      {dept.trend === 'stable' && <Target className="h-4 w-4 text-gray-600" />}
                    </div>
                    <Progress value={dept.score} className="w-20 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}