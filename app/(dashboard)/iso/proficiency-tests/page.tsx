"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  Edit,
  Eye,
  Search,
  Download,
  Calendar,
  CheckCircle,
  AlertTriangle,
  FileText,
  Users,
  Target,
  TrendingUp,
  BarChart3,
  Clock,
  CheckSquare,
  XCircle,
  AlertCircle,
  Shield,
  Activity,
  Zap,
  Settings,
  ClipboardCheck,
  Search as SearchIcon,
  Filter,
  FileSearch,
  UserCheck,
  AlertCircle as AlertCircleIcon,
  TestTube,
  Award,
  TrendingUp as TrendingUpIcon,
} from "lucide-react"
import { toast } from "sonner"

interface ProficiencyTest {
  id: string
  testNumber: string
  testName: string
  provider: string
  testType: string
  status: string
  priority: string
  participant: string
  department: string
  registrationDate: string
  testDate: string
  resultDate: string
  parameters: Array<{
    parameter: string
    method: string
    unit: string
    assignedValue: string
    uncertainty: string
    participantResult: string
    zScore: number
    evaluation: string
  }>
  evaluation: {
    overallResult: string
    performance: string
    comments: string
    recommendations: string
    evaluator: string
    evaluationDate: string
  }
  correctiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
  }>
  attachments: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  notes: string
  createdAt: string
  updatedAt: string
}

export default function ProficiencyTestsPage() {
  const [tests, setTests] = useState<ProficiencyTest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("tests")

  // Dialog states
  const [isTestDialogOpen, setIsTestDialogOpen] = useState(false)
  const [editingTest, setEditingTest] = useState<ProficiencyTest | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedTests, setSelectedTests] = useState<string[]>([])

  // Form data
  const [testFormData, setTestFormData] = useState({
    testNumber: "",
    testName: "",
    provider: "",
    testType: "",
    priority: "Normal",
    participant: "",
    department: "",
    registrationDate: "",
    testDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchTests()
  }, [])

  const fetchTests = async () => {
    try {
      setIsLoading(true)
      // Mock data for proficiency tests
      const mockData: ProficiencyTest[] = [
        {
          id: "pt-001",
          testNumber: "PT-2024-001",
          testName: "Mikrobiyolojik Analiz Yeterlilik Testi",
          provider: "TÜRKAK",
          testType: "Mikrobiyoloji",
          status: "Tamamlandı",
          priority: "Yüksek",
          participant: "Dr. Mehmet Kaya",
          department: "Mikrobiyoloji Laboratuvarı",
          registrationDate: "2024-01-15",
          testDate: "2024-02-15",
          resultDate: "2024-03-01",
          parameters: [
            {
              parameter: "Toplam Mezofil Aerobik Bakteri",
              method: "TS EN ISO 4833-1",
              unit: "CFU/g",
              assignedValue: "2.5x10³",
              uncertainty: "±0.3 log",
              participantResult: "2.3x10³",
              zScore: 0.67,
              evaluation: "Uygun"
            },
            {
              parameter: "E.coli",
              method: "TS EN ISO 16649-2",
              unit: "CFU/g",
              assignedValue: "<10",
              uncertainty: "±0.5 log",
              participantResult: "<10",
              zScore: 0.0,
              evaluation: "Mükemmel"
            }
          ],
          evaluation: {
            overallResult: "Başarılı",
            performance: "Mükemmel",
            comments: "Tüm parametrelerde başarılı sonuçlar alındı",
            recommendations: "Mevcut performansı koruyun",
            evaluator: "TÜRKAK Uzmanı",
            evaluationDate: "2024-03-01"
          },
          correctiveActions: [],
          attachments: [
            { name: "yeterlilik_testi_raporu_pt001.pdf", type: "PDF", size: "1.8 MB", uploadDate: "2024-03-01" },
            { name: "test_sonuclari_pt001.xlsx", type: "Excel", size: "0.5 MB", uploadDate: "2024-02-15" },
          ],
          notes: "Yeterlilik testi başarıyla tamamlandı. Tüm parametrelerde uygun sonuçlar alındı.",
          createdAt: "2024-01-10",
          updatedAt: "2024-03-01",
        },
        {
          id: "pt-002",
          testNumber: "PT-2024-002",
          testName: "Kimyasal Analiz Yeterlilik Testi",
          provider: "LGC Standards",
          testType: "Kimyasal",
          status: "Devam Ediyor",
          priority: "Normal",
          participant: "Dr. Fatma Demir",
          department: "Kimya Laboratuvarı",
          registrationDate: "2024-02-01",
          testDate: "2024-03-15",
          resultDate: "",
          parameters: [
            {
              parameter: "pH",
              method: "TS 266",
              unit: "-",
              assignedValue: "7.2",
              uncertainty: "±0.1",
              participantResult: "7.1",
              zScore: 1.0,
              evaluation: "Uygun"
            },
            {
              parameter: "Toplam Sertlik",
              method: "TS 266",
              unit: "°F",
              assignedValue: "12.5",
              uncertainty: "±0.5",
              participantResult: "Analiz devam ediyor",
              zScore: 0,
              evaluation: "Beklemede"
            }
          ],
          evaluation: {
            overallResult: "Değerlendiriliyor",
            performance: "Değerlendiriliyor",
            comments: "Analiz devam ediyor",
            recommendations: "",
            evaluator: "",
            evaluationDate: ""
          },
          correctiveActions: [],
          attachments: [],
          notes: "Yeterlilik testi devam ediyor. Analiz sonuçları bekleniyor.",
          createdAt: "2024-01-25",
          updatedAt: "2024-03-15",
        },
        {
          id: "pt-003",
          testNumber: "PT-2024-003",
          testName: "Fizikokimyasal Analiz Yeterlilik Testi",
          provider: "FAPAS",
          testType: "Fizikokimyasal",
          status: "Başarısız",
          priority: "Yüksek",
          participant: "Dr. Ahmet Yılmaz",
          department: "Fizikokimyasal Laboratuvar",
          registrationDate: "2024-01-20",
          testDate: "2024-02-20",
          resultDate: "2024-03-10",
          parameters: [
            {
              parameter: "Nem",
              method: "TS 266",
              unit: "%",
              assignedValue: "15.2",
              uncertainty: "±0.5",
              participantResult: "16.8",
              zScore: 3.2,
              evaluation: "Uygun Değil"
            },
            {
              parameter: "Protein",
              method: "TS 266",
              unit: "%",
              assignedValue: "12.5",
              uncertainty: "±0.3",
              participantResult: "11.8",
              zScore: 2.3,
              evaluation: "Uygun Değil"
            }
          ],
          evaluation: {
            overallResult: "Başarısız",
            performance: "Yetersiz",
            comments: "Bazı parametrelerde uygun olmayan sonuçlar alındı",
            recommendations: "Metot validasyonu ve personel eğitimi gerekli",
            evaluator: "FAPAS Uzmanı",
            evaluationDate: "2024-03-10"
          },
          correctiveActions: [
            {
              action: "Metot validasyonu tekrarlanacak",
              responsible: "Dr. Ahmet Yılmaz",
              dueDate: "2024-04-30",
              status: "Planlandı"
            },
            {
              action: "Personel eğitimi düzenlenecek",
              responsible: "Eğitim Müdürü",
              dueDate: "2024-04-15",
              status: "Planlandı"
            }
          ],
          attachments: [
            { name: "yeterlilik_testi_raporu_pt003.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-03-10" },
            { name: "duzeltici_eylem_pt003.pdf", type: "PDF", size: "0.8 MB", uploadDate: "2024-03-15" },
          ],
          notes: "Yeterlilik testi başarısız. Düzeltici eylemler planlandı.",
          createdAt: "2024-01-15",
          updatedAt: "2024-03-15",
        },
      ]
      setTests(mockData)
    } catch (error) {
      console.error("Tests fetch error:", error)
      toast.error("Yeterlilik testi verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Planlandı": "bg-blue-100 text-blue-800",
      "Devam Ediyor": "bg-yellow-100 text-yellow-800",
      "Tamamlandı": "bg-green-100 text-green-800",
      "Başarılı": "bg-green-100 text-green-800",
      "Başarısız": "bg-red-100 text-red-800",
      "Değerlendiriliyor": "bg-orange-100 text-orange-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getEvaluationBadge = (evaluation: string) => {
    const variants: Record<string, string> = {
      "Mükemmel": "bg-green-100 text-green-800",
      "Uygun": "bg-blue-100 text-blue-800",
      "Uygun Değil": "bg-red-100 text-red-800",
      "Beklemede": "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={variants[evaluation] || "bg-gray-100 text-gray-800"}>{evaluation}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Normal": "bg-blue-100 text-blue-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
  }

  const getZScoreColor = (zScore: number) => {
    if (Math.abs(zScore) <= 1) return "text-green-600"
    if (Math.abs(zScore) <= 2) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredTests = tests.filter((test) => {
    const matchesSearch = 
      test.testNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.participant.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || test.status === statusFilter
    const matchesType = typeFilter === "all" || test.testType === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

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
          <h1 className="text-3xl font-bold text-foreground">Yeterlilik Testleri</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu laboratuvar yeterlilik testleri ve değerlendirme</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Test</CardTitle>
            <TestTube className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı yeterlilik testi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Başarılı</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter((t) => t.status === "Başarılı" || t.status === "Tamamlandı").length}</div>
            <p className="text-xs text-muted-foreground">Başarılı testler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Başarısız</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tests.filter((t) => t.status === "Başarısız").length}</div>
            <p className="text-xs text-muted-foreground">Başarısız testler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Z-Score</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tests.length > 0 ? 
                (tests.reduce((sum, t) => sum + t.parameters.reduce((pSum, p) => pSum + Math.abs(p.zScore), 0) / t.parameters.length, 0) / tests.length).toFixed(2) 
                : "0.00"
              }
            </div>
            <p className="text-xs text-muted-foreground">Ortalama performans</p>
          </CardContent>
        </Card>
      </div>

      {/* Arama ve Filtreleme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <SearchIcon className="w-5 h-5 mr-2" />
            Arama ve Filtreleme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Test no, adı, sağlayıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Durum filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="Planlandı">Planlandı</SelectItem>
                <SelectItem value="Devam Ediyor">Devam Ediyor</SelectItem>
                <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                <SelectItem value="Başarılı">Başarılı</SelectItem>
                <SelectItem value="Başarısız">Başarısız</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="Mikrobiyoloji">Mikrobiyoloji</SelectItem>
                <SelectItem value="Kimyasal">Kimyasal</SelectItem>
                <SelectItem value="Fizikokimyasal">Fizikokimyasal</SelectItem>
                <SelectItem value="Spektroskopik">Spektroskopik</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tests">Yeterlilik Testleri</TabsTrigger>
          <TabsTrigger value="results">Sonuçlar</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Yeterlilik Testleri</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Test
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test Listesi</CardTitle>
              <CardDescription>Tüm yeterlilik testleri ve sonuçları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test No</TableHead>
                    <TableHead>Test Adı</TableHead>
                    <TableHead>Sağlayıcı</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Katılımcı</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Tarihler</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell className="font-medium">{test.testNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{test.testName}</div>
                          <div className="text-sm text-muted-foreground">{test.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>{test.provider}</TableCell>
                      <TableCell>{test.testType}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{test.participant}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(test.status)}</TableCell>
                      <TableCell>{getPriorityBadge(test.priority)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Kayıt: {test.registrationDate}</div>
                          <div>Test: {test.testDate}</div>
                          {test.resultDate && <div>Sonuç: {test.resultDate}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Test Sonuçları</CardTitle>
              <CardDescription>Tüm yeterlilik testi sonuçları ve değerlendirmeleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tests.map((test) => (
                  <Card key={test.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium">{test.testNumber} - {test.testName}</div>
                        <div className="text-sm text-muted-foreground">{test.provider} - {test.testType}</div>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(test.status)}
                        {getPriorityBadge(test.priority)}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Parametre Sonuçları</h4>
                        <div className="space-y-2">
                          {test.parameters.map((param, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <div className="flex-1">
                                <div className="font-medium">{param.parameter}</div>
                                <div className="text-sm text-muted-foreground">{param.method}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{param.participantResult} {param.unit}</div>
                                <div className="text-sm">
                                  Z-Score: <span className={getZScoreColor(param.zScore)}>{param.zScore}</span>
                                </div>
                                <div className="text-sm">{getEvaluationBadge(param.evaluation)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Genel Sonuç:</div>
                          <div className="font-medium">{test.evaluation.overallResult}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Performans:</div>
                          <div className="font-medium">{test.evaluation.performance}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Durum Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(tests.map(t => t.status))).map(status => {
                    const count = tests.filter(t => t.status === status).length
                    const percentage = (count / tests.length) * 100
                    return (
                      <div key={status} className="flex justify-between items-center">
                        <span className="text-sm">{status}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Test Tipi Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(tests.map(t => t.testType))).map(type => {
                    const count = tests.filter(t => t.testType === type).length
                    const percentage = (count / tests.length) * 100
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-sm">{type}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium w-12 text-right">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
