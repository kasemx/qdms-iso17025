"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import {
  BookOpen,
  Users,
  TrendingUp,
  Calendar,
  Download,
} from "lucide-react"

interface TrainingReportsProps {
  selectedPeriod: string
  onPeriodChange: (value: string) => void
  selectedDepartment: string
  onDepartmentChange: (value: string) => void
}

export function TrainingReports({
  selectedPeriod,
  onPeriodChange,
  selectedDepartment,
  onDepartmentChange,
}: TrainingReportsProps) {
  // Report data
  const departmentData = [
    { name: "Kalite Güvence", completed: 23, total: 25, rate: 92 },
    { name: "Üretim", completed: 32, total: 45, rate: 71 },
    { name: "Laboratuvar", completed: 8, total: 8, rate: 100 },
    { name: "İnsan Kaynakları", completed: 15, total: 18, rate: 83 },
    { name: "Satış", completed: 12, total: 15, rate: 80 },
    { name: "Bilgi İşlem", completed: 3, total: 3, rate: 100 },
  ]

  const monthlyData = [
    { month: "Oca", completed: 45, assigned: 52 },
    { month: "Şub", completed: 38, assigned: 41 },
    { month: "Mar", completed: 62, assigned: 68 },
    { month: "Nis", completed: 55, assigned: 59 },
    { month: "May", completed: 71, assigned: 78 },
    { month: "Haz", completed: 48, assigned: 53 },
  ]

  const statusData = [
    { name: "Tamamlanan", value: 93, color: "#10B981" },
    { name: "Devam Eden", value: 28, color: "#3B82F6" },
    { name: "Süresi Geçen", value: 12, color: "#EF4444" },
  ]

  const topDocuments = [
    { code: "PR-KG-001", title: "Doküman Kontrol Prosedürü", completions: 25 },
    { code: "TL-GV-001", title: "Güvenlik Talimatları", completions: 23 },
    { code: "PR-UR-002", title: "Üretim Prosedürleri", completions: 21 },
    { code: "TL-LAB-001", title: "Laboratuvar Kalibrasyonu", completions: 18 },
    { code: "FR-IK-001", title: "İnsan Kaynakları Formları", completions: 15 },
  ]

  return (
    <div className="space-y-4">
      {/* Report Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Dönem</label>
                <Select value={selectedPeriod} onValueChange={onPeriodChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="last_week">Son Hafta</SelectItem>
                    <SelectItem value="last_month">Son Ay</SelectItem>
                    <SelectItem value="last_quarter">Son Çeyrek</SelectItem>
                    <SelectItem value="last_year">Son Yıl</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Departman</label>
                <Select value={selectedDepartment} onValueChange={onDepartmentChange}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Departmanlar</SelectItem>
                    <SelectItem value="quality">Kalite Güvence</SelectItem>
                    <SelectItem value="production">Üretim</SelectItem>
                    <SelectItem value="lab">Laboratuvar</SelectItem>
                    <SelectItem value="hr">İnsan Kaynakları</SelectItem>
                    <SelectItem value="sales">Satış</SelectItem>
                    <SelectItem value="it">Bilgi İşlem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                PDF İndir
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Excel İndir
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">133</p>
                <p className="text-sm text-muted-foreground">Toplam Eğitim</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">93</p>
                <p className="text-sm text-muted-foreground">Tamamlanan</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">87%</p>
                <p className="text-sm text-muted-foreground">Başarı Oranı</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Süresi Geçen</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Completion Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aylık Eğitim Tamamlama Trendi</CardTitle>
            <CardDescription>Son 6 ayın eğitim tamamlama performansı</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="assigned" fill="#E5E7EB" name="Atanan" />
                <Bar dataKey="completed" fill="#3B82F6" name="Tamamlanan" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Eğitim Durumu Dağılımı</CardTitle>
            <CardDescription>Mevcut eğitim durumlarının oransal dağılımı</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Departman Performansı</CardTitle>
            <CardDescription>Departmanlara göre eğitim tamamlama oranları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentData.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{dept.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">
                        {dept.completed}/{dept.total}
                      </span>
                      <Badge variant={dept.rate >= 90 ? "default" : dept.rate >= 70 ? "secondary" : "destructive"}>
                        {dept.rate}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={dept.rate} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Documents */}
        <Card>
          <CardHeader>
            <CardTitle>En Çok Tamamlanan Eğitimler</CardTitle>
            <CardDescription>En yüksek tamamlanma sayısına sahip dokümanlar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{doc.code}</p>
                    <p className="text-xs text-muted-foreground truncate">{doc.title}</p>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {doc.completions}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}