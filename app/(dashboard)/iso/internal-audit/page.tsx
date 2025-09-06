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
} from "lucide-react"
import { toast } from "sonner"

interface InternalAudit {
  id: string
  auditNumber: string
  title: string
  scope: string
  type: string
  status: string
  priority: string
  auditor: string
  auditee: string
  department: string
  plannedDate: string
  actualDate: string
  duration: number
  objectives: Array<{
    objective: string
    criteria: string
    status: string
  }>
  findings: Array<{
    id: string
    finding: string
    severity: string
    category: string
    evidence: string
    clause: string
    status: string
  }>
  nonConformities: Array<{
    id: string
    description: string
    severity: string
    clause: string
    rootCause: string
    correctiveAction: string
    responsible: string
    dueDate: string
    status: string
  }>
  observations: Array<{
    id: string
    observation: string
    category: string
    recommendation: string
    status: string
  }>
  recommendations: Array<{
    id: string
    recommendation: string
    priority: string
    responsible: string
    dueDate: string
    status: string
  }>
  report: {
    generated: boolean
    reportNumber: string
    reportDate: string
    approvedBy: string
    approvalDate: string
    status: string
  }
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

export default function InternalAuditPage() {
  const [audits, setAudits] = useState<InternalAudit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("audits")

  // Dialog states
  const [isAuditDialogOpen, setIsAuditDialogOpen] = useState(false)
  const [editingAudit, setEditingAudit] = useState<InternalAudit | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedAudits, setSelectedAudits] = useState<string[]>([])

  // Form data
  const [auditFormData, setAuditFormData] = useState({
    auditNumber: "",
    title: "",
    scope: "",
    type: "",
    priority: "Normal",
    auditor: "",
    auditee: "",
    department: "",
    plannedDate: "",
    duration: "",
    notes: "",
  })

  useEffect(() => {
    fetchAudits()
  }, [])

  const fetchAudits = async () => {
    try {
      setIsLoading(true)
      // Mock data for internal audits
      const mockData: InternalAudit[] = [
        {
          id: "ia-001",
          auditNumber: "IA-2024-001",
          title: "2024 Yıllık Kalite Sistemi İç Denetimi",
          scope: "ISO 17025 Kalite Yönetim Sistemi - Tüm süreçler ve departmanlar",
          type: "Yıllık",
          status: "Tamamlandı",
          priority: "Yüksek",
          auditor: "Dr. Ahmet Yılmaz",
          auditee: "Kalite Müdürü",
          department: "Kalite Yönetimi",
          plannedDate: "2024-03-15",
          actualDate: "2024-03-15",
          duration: 2,
          objectives: [
            { objective: "ISO 17025 uyumluluğunun değerlendirilmesi", criteria: "ISO 17025:2017", status: "Tamamlandı" },
            { objective: "Süreç etkinliğinin değerlendirilmesi", criteria: "İç prosedürler", status: "Tamamlandı" },
            { objective: "İyileştirme fırsatlarının belirlenmesi", criteria: "Sürekli iyileştirme", status: "Tamamlandı" },
          ],
          findings: [
            {
              id: "f1",
              finding: "Kalibrasyon takip sisteminde eksiklikler tespit edildi",
              severity: "Majör",
              category: "Süreç",
              evidence: "Kalibrasyon kayıtları incelendi",
              clause: "5.5.2",
              status: "Kapatıldı"
            },
            {
              id: "f2",
              finding: "Personel eğitim kayıtları eksik",
              severity: "Minör",
              category: "Kayıt",
              evidence: "Eğitim dosyaları kontrol edildi",
              clause: "6.2.2",
              status: "Açık"
            }
          ],
          nonConformities: [
            {
              id: "nc1",
              description: "Kalibrasyon takip sisteminde otomatik hatırlatma yok",
              severity: "Majör",
              clause: "5.5.2",
              rootCause: "Sistem tasarımında eksiklik",
              correctiveAction: "Otomatik hatırlatma sistemi kurulacak",
              responsible: "IT Müdürü",
              dueDate: "2024-04-30",
              status: "Tamamlandı"
            }
          ],
          observations: [
            {
              id: "obs1",
              observation: "Doküman kontrol süreci iyi çalışıyor",
              category: "Olumlu",
              recommendation: "Diğer süreçlere örnek olarak kullanılabilir",
              status: "Değerlendirildi"
            }
          ],
          recommendations: [
            {
              id: "rec1",
              recommendation: "Personel eğitim planı güncellenmeli",
              priority: "Orta",
              responsible: "Eğitim Müdürü",
              dueDate: "2024-05-31",
              status: "Planlandı"
            }
          ],
          report: {
            generated: true,
            reportNumber: "IAR-2024-001",
            reportDate: "2024-03-20",
            approvedBy: "Genel Müdür",
            approvalDate: "2024-03-22",
            status: "Onaylandı"
          },
          attachments: [
            { name: "ic_denetim_raporu_ia001.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-03-20" },
            { name: "denetim_checklist_ia001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-03-15" },
          ],
          notes: "Denetim başarıyla tamamlandı. Tüm bulgular değerlendirildi ve aksiyon planları oluşturuldu.",
          createdAt: "2024-03-01",
          updatedAt: "2024-03-22",
        },
        {
          id: "ia-002",
          auditNumber: "IA-2024-002",
          title: "Mikrobiyoloji Laboratuvarı İç Denetimi",
          scope: "Mikrobiyoloji laboratuvarı süreçleri ve test metotları",
          type: "Departman",
          status: "Planlandı",
          priority: "Normal",
          auditor: "Dr. Fatma Demir",
          auditee: "Laboratuvar Müdürü",
          department: "Laboratuvar Hizmetleri",
          plannedDate: "2024-04-15",
          actualDate: "",
          duration: 1,
          objectives: [
            { objective: "Test metotlarının uygunluğunun değerlendirilmesi", criteria: "ISO 17025", status: "Planlandı" },
            { objective: "Kalite kontrol süreçlerinin incelenmesi", criteria: "İç prosedürler", status: "Planlandı" },
          ],
          findings: [],
          nonConformities: [],
          observations: [],
          recommendations: [],
          report: {
            generated: false,
            reportNumber: "",
            reportDate: "",
            approvedBy: "",
            approvalDate: "",
            status: "Beklemede"
          },
          attachments: [],
          notes: "Denetim planlanıyor. Hazırlık çalışmaları devam ediyor.",
          createdAt: "2024-03-25",
          updatedAt: "2024-03-25",
        },
      ]
      setAudits(mockData)
    } catch (error) {
      console.error("Audits fetch error:", error)
      toast.error("İç denetim verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Planlandı": "bg-blue-100 text-blue-800",
      "Devam Ediyor": "bg-yellow-100 text-yellow-800",
      "Tamamlandı": "bg-green-100 text-green-800",
      "Rapor Hazırlandı": "bg-green-100 text-green-800",
      "Onaylandı": "bg-green-100 text-green-800",
      "İptal Edildi": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, string> = {
      "Majör": "bg-red-100 text-red-800",
      "Minör": "bg-yellow-100 text-yellow-800",
      "Gözlem": "bg-blue-100 text-blue-800",
    }
    return <Badge className={variants[severity] || "bg-gray-100 text-gray-800"}>{severity}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Normal": "bg-blue-100 text-blue-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
  }

  const filteredAudits = audits.filter((audit) => {
    const matchesSearch = 
      audit.auditNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.scope.toLowerCase().includes(searchTerm.toLowerCase()) ||
      audit.auditor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || audit.status === statusFilter
    const matchesType = typeFilter === "all" || audit.type === typeFilter
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
          <h1 className="text-3xl font-bold text-foreground">İç Denetim</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu iç denetim süreçleri ve raporları</p>
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
            <CardTitle className="text-sm font-medium">Toplam Denetim</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı denetim</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlandı</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{audits.filter((a) => a.status === "Tamamlandı").length}</div>
            <p className="text-xs text-muted-foreground">Tamamlanan denetimler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Açık Bulgular</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {audits.reduce((sum, a) => sum + a.findings.filter(f => f.status === "Açık").length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Kapatılmayan bulgular</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uyumsuzluklar</CardTitle>
            <AlertCircleIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {audits.reduce((sum, a) => sum + a.nonConformities.length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Tespit edilen uyumsuzluklar</p>
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
                placeholder="Denetim no, başlık, denetçi ara..."
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
                <SelectItem value="Rapor Hazırlandı">Rapor Hazırlandı</SelectItem>
                <SelectItem value="Onaylandı">Onaylandı</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="Yıllık">Yıllık</SelectItem>
                <SelectItem value="Departman">Departman</SelectItem>
                <SelectItem value="Süreç">Süreç</SelectItem>
                <SelectItem value="Takip">Takip</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="audits">Denetimler</TabsTrigger>
          <TabsTrigger value="findings">Bulgular</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="audits" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">İç Denetimler</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Denetim
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Denetim Listesi</CardTitle>
              <CardDescription>Tüm iç denetimler ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Denetim No</TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Denetçi</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Tarihler</TableHead>
                    <TableHead>Bulgular</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAudits.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell className="font-medium">{audit.auditNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{audit.title}</div>
                          <div className="text-sm text-muted-foreground">{audit.scope}</div>
                        </div>
                      </TableCell>
                      <TableCell>{audit.type}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{audit.auditor}</div>
                          <div className="text-sm text-muted-foreground">{audit.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(audit.status)}</TableCell>
                      <TableCell>{getPriorityBadge(audit.priority)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Planlanan: {audit.plannedDate}</div>
                          {audit.actualDate && <div>Gerçekleşen: {audit.actualDate}</div>}
                          <div>Süre: {audit.duration} gün</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Toplam: {audit.findings.length}</div>
                          <div>Açık: {audit.findings.filter(f => f.status === "Açık").length}</div>
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

        <TabsContent value="findings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Denetim Bulguları</CardTitle>
              <CardDescription>Tüm denetimlerden çıkan bulgular ve uyumsuzluklar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {audits.map((audit) => 
                  audit.findings.map((finding) => (
                    <Card key={finding.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-medium">{audit.auditNumber} - {finding.finding}</div>
                          <div className="text-sm text-muted-foreground">Madde: {finding.clause} | Kategori: {finding.category}</div>
                        </div>
                        <div className="flex space-x-2">
                          {getSeverityBadge(finding.severity)}
                          {getStatusBadge(finding.status)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <div>Kanıt: {finding.evidence}</div>
                        <div>Denetçi: {audit.auditor}</div>
                      </div>
                    </Card>
                  ))
                )}
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
                  {Array.from(new Set(audits.map(a => a.status))).map(status => {
                    const count = audits.filter(a => a.status === status).length
                    const percentage = (count / audits.length) * 100
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
                <CardTitle>Bulguların Şiddeti</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(audits.flatMap(a => a.findings.map(f => f.severity)))).map(severity => {
                    const count = audits.flatMap(a => a.findings).filter(f => f.severity === severity).length
                    const totalFindings = audits.flatMap(a => a.findings).length
                    const percentage = totalFindings > 0 ? (count / totalFindings) * 100 : 0
                    return (
                      <div key={severity} className="flex justify-between items-center">
                        <span className="text-sm">{severity}</span>
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
