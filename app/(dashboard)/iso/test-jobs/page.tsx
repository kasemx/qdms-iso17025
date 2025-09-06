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
  FlaskConical,
  ClipboardList,
  Activity,
  Zap,
  Settings,
  Play,
  Pause,
  Stop,
} from "lucide-react"
import { toast } from "sonner"

interface TestJob {
  id: string
  jobNumber: string
  sampleId: string
  sampleNumber: string
  clientName: string
  testMethod: string
  methodCode: string
  status: string
  priority: string
  assignedTo: string
  startDate: string
  dueDate: string
  completionDate: string
  progress: number
  parameters: Array<{
    parameter: string
    method: string
    limit: string
    unit: string
    result: string
    status: string
    analyst: string
    date: string
  }>
  qualityControl: {
    blankResult: string
    spikeRecovery: string
    duplicateResult: string
    status: string
  }
  equipment: Array<{
    name: string
    id: string
    calibration: string
    status: string
  }>
  reagents: Array<{
    name: string
    batch: string
    expiry: string
    status: string
  }>
  environmental: {
    temperature: string
    humidity: string
    pressure: string
    date: string
  }
  results: {
    overallStatus: string
    compliance: string
    uncertainty: string
    remarks: string
  }
  review: {
    reviewedBy: string
    reviewDate: string
    status: string
    comments: string
  }
  approval: {
    approvedBy: string
    approvalDate: string
    status: string
    comments: string
  }
  report: {
    generated: boolean
    reportNumber: string
    reportDate: string
    sentToClient: boolean
    sentDate: string
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

export default function TestJobsPage() {
  const [jobs, setJobs] = useState<TestJob[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("jobs")

  // Dialog states
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<TestJob | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedJobs, setSelectedJobs] = useState<string[]>([])

  // Form data
  const [jobFormData, setJobFormData] = useState({
    jobNumber: "",
    sampleId: "",
    sampleNumber: "",
    clientName: "",
    testMethod: "",
    methodCode: "",
    priority: "Normal",
    assignedTo: "",
    startDate: "",
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      setIsLoading(true)
      // Mock data for test jobs
      const mockData: TestJob[] = [
        {
          id: "tj-001",
          jobNumber: "TJ-2024-001",
          sampleId: "smp-001",
          sampleNumber: "SMP-2024-001",
          clientName: "ABC Gıda San. Tic. Ltd. Şti.",
          testMethod: "Toplam Mezofil Aerobik Bakteri Sayımı",
          methodCode: "TM-001",
          status: "Tamamlandı",
          priority: "Normal",
          assignedTo: "Dr. Mehmet Kaya",
          startDate: "2024-03-16",
          dueDate: "2024-03-20",
          completionDate: "2024-03-20",
          progress: 100,
          parameters: [
            { parameter: "Toplam Mezofil Aerobik Bakteri", method: "TS EN ISO 4833-1", limit: "<10⁴", unit: "CFU/g", result: "2.3x10³", status: "Uygun", analyst: "Dr. Mehmet Kaya", date: "2024-03-18" },
            { parameter: "E.coli", method: "TS EN ISO 16649-2", limit: "<10²", unit: "CFU/g", result: "<10", status: "Uygun", analyst: "Dr. Mehmet Kaya", date: "2024-03-18" },
            { parameter: "Salmonella", method: "TS EN ISO 6579-1", limit: "Yok", unit: "25g", result: "Yok", status: "Uygun", analyst: "Dr. Mehmet Kaya", date: "2024-03-20" },
          ],
          qualityControl: {
            blankResult: "Negatif",
            spikeRecovery: "95%",
            duplicateResult: "Uyumlu",
            status: "Başarılı"
          },
          equipment: [
            { name: "İnkübatör", id: "INC-001", calibration: "2024-02-15", status: "Geçerli" },
            { name: "Analitik Terazi", id: "BAL-001", calibration: "2024-01-20", status: "Geçerli" },
          ],
          reagents: [
            { name: "Plate Count Agar", batch: "PCA-2024-001", expiry: "2024-12-31", status: "Geçerli" },
            { name: "Peptone Water", batch: "PW-2024-001", expiry: "2024-12-31", status: "Geçerli" },
          ],
          environmental: {
            temperature: "22±1°C",
            humidity: "60±5% RH",
            pressure: "1013±10 hPa",
            date: "2024-03-16"
          },
          results: {
            overallStatus: "Uygun",
            compliance: "Tüm parametreler limit değerlerin altında",
            uncertainty: "±0.3 log CFU/g",
            remarks: "Analiz başarıyla tamamlandı"
          },
          review: {
            reviewedBy: "Dr. Fatma Demir",
            reviewDate: "2024-03-21",
            status: "Onaylandı",
            comments: "Analiz sonuçları doğru ve güvenilir"
          },
          approval: {
            approvedBy: "Dr. Ahmet Yılmaz",
            approvalDate: "2024-03-22",
            status: "Onaylandı",
            comments: "Rapor onaylandı"
          },
          report: {
            generated: true,
            reportNumber: "RPT-2024-001",
            reportDate: "2024-03-22",
            sentToClient: true,
            sentDate: "2024-03-22"
          },
          attachments: [
            { name: "analiz_raporu_tj001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-03-22" },
            { name: "kalite_kontrol_tj001.pdf", type: "PDF", size: "0.8 MB", uploadDate: "2024-03-20" },
          ],
          notes: "Analiz başarıyla tamamlandı. Tüm kalite kontrol kriterleri karşılandı.",
          createdAt: "2024-03-15",
          updatedAt: "2024-03-22",
        },
        {
          id: "tj-002",
          jobNumber: "TJ-2024-002",
          sampleId: "smp-002",
          sampleNumber: "SMP-2024-002",
          clientName: "XYZ Kimya A.Ş.",
          testMethod: "pH Tayini",
          methodCode: "TM-002",
          status: "Devam Ediyor",
          priority: "Yüksek",
          assignedTo: "Dr. Fatma Demir",
          startDate: "2024-03-19",
          dueDate: "2024-03-22",
          completionDate: "",
          progress: 60,
          parameters: [
            { parameter: "pH", method: "TS 266", limit: "6.5-8.5", unit: "-", result: "7.2", status: "Uygun", analyst: "Dr. Fatma Demir", date: "2024-03-19" },
            { parameter: "Toplam Sertlik", method: "TS 266", limit: "<15", unit: "°F", result: "12.5", status: "Uygun", analyst: "Dr. Fatma Demir", date: "2024-03-20" },
            { parameter: "Klorür", method: "TS 266", limit: "<250", unit: "mg/L", result: "Analiz devam ediyor", status: "Beklemede", analyst: "Dr. Fatma Demir", date: "" },
            { parameter: "Sülfat", method: "TS 266", limit: "<250", unit: "mg/L", result: "Analiz devam ediyor", status: "Beklemede", analyst: "Dr. Fatma Demir", date: "" },
          ],
          qualityControl: {
            blankResult: "Negatif",
            spikeRecovery: "98%",
            duplicateResult: "Uyumlu",
            status: "Devam Ediyor"
          },
          equipment: [
            { name: "pH Metre", id: "PHM-001", calibration: "2024-02-20", status: "Geçerli" },
            { name: "Magnetik Karıştırıcı", id: "MAG-001", calibration: "2024-01-15", status: "Geçerli" },
          ],
          reagents: [
            { name: "pH 4.0 Buffer", batch: "BUF-2024-001", expiry: "2024-12-31", status: "Geçerli" },
            { name: "pH 7.0 Buffer", batch: "BUF-2024-002", expiry: "2024-12-31", status: "Geçerli" },
          ],
          environmental: {
            temperature: "20±1°C",
            humidity: "55±3% RH",
            pressure: "1015±5 hPa",
            date: "2024-03-19"
          },
          results: {
            overallStatus: "Kısmen Tamamlandı",
            compliance: "Tamamlanan parametreler uygun",
            uncertainty: "±0.01 pH",
            remarks: "Analiz devam ediyor"
          },
          review: {
            reviewedBy: "",
            reviewDate: "",
            status: "Beklemede",
            comments: ""
          },
          approval: {
            approvedBy: "",
            approvalDate: "",
            status: "Beklemede",
            comments: ""
          },
          report: {
            generated: false,
            reportNumber: "",
            reportDate: "",
            sentToClient: false,
            sentDate: ""
          },
          attachments: [],
          notes: "Analiz devam ediyor. pH ve sertlik analizleri tamamlandı.",
          createdAt: "2024-03-18",
          updatedAt: "2024-03-20",
        },
      ]
      setJobs(mockData)
    } catch (error) {
      console.error("Jobs fetch error:", error)
      toast.error("Test işleri verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditJob = (job: TestJob) => {
    setEditingJob(job)
    setJobFormData({
      jobNumber: job.jobNumber,
      sampleId: job.sampleId,
      sampleNumber: job.sampleNumber,
      clientName: job.clientName,
      testMethod: job.testMethod,
      methodCode: job.methodCode,
      priority: job.priority,
      assignedTo: job.assignedTo,
      startDate: job.startDate,
      dueDate: job.dueDate,
      notes: job.notes,
    })
    setIsJobDialogOpen(true)
  }

  const handleJobSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingJob) {
        toast.success("Test işi başarıyla güncellendi")
      } else {
        toast.success("Test işi başarıyla oluşturuldu")
      }
      setIsJobDialogOpen(false)
      setEditingJob(null)
      resetForm()
      fetchJobs()
    } catch (error) {
      toast.error("Test işi kaydedilirken hata oluştu")
    }
  }

  const resetForm = () => {
    setJobFormData({
      jobNumber: "",
      sampleId: "",
      sampleNumber: "",
      clientName: "",
      testMethod: "",
      methodCode: "",
      priority: "Normal",
      assignedTo: "",
      startDate: "",
      dueDate: "",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Planlandı": "bg-blue-100 text-blue-800",
      "Başladı": "bg-yellow-100 text-yellow-800",
      "Devam Ediyor": "bg-orange-100 text-orange-800",
      "Tamamlandı": "bg-green-100 text-green-800",
      "İnceleme Bekliyor": "bg-purple-100 text-purple-800",
      "Onay Bekliyor": "bg-indigo-100 text-indigo-800",
      "Rapor Hazırlandı": "bg-green-100 text-green-800",
      "İptal Edildi": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Normal": "bg-blue-100 text-blue-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
  }

  const getResultStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Uygun": "bg-green-100 text-green-800",
      "Uygun Değil": "bg-red-100 text-red-800",
      "Beklemede": "bg-yellow-100 text-yellow-800",
      "Devam Ediyor": "bg-orange-100 text-orange-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.jobNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.sampleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.testMethod.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    const matchesPriority = priorityFilter === "all" || job.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(filteredJobs.map((job) => job.id))
    } else {
      setSelectedJobs([])
    }
  }

  const handleSelectJob = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId])
    } else {
      setSelectedJobs(selectedJobs.filter((id) => id !== jobId))
    }
  }

  const exportJobReport = () => {
    toast.success("Test işleri raporu indiriliyor...")
  }

  const startJob = (jobId: string) => {
    toast.success("Test işi başlatıldı")
  }

  const pauseJob = (jobId: string) => {
    toast.success("Test işi duraklatıldı")
  }

  const completeJob = (jobId: string) => {
    toast.success("Test işi tamamlandı")
  }

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
          <h1 className="text-3xl font-bold text-foreground">Test İşleri ve Sonuçları</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu test işleri yönetimi ve sonuç takibi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportJobReport}>
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam İş</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı test işi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlandı</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.filter((j) => j.status === "Tamamlandı").length}</div>
            <p className="text-xs text-muted-foreground">Tamamlanan işler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Devam Eden</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.filter((j) => j.status.includes("Devam")).length}</div>
            <p className="text-xs text-muted-foreground">Aktif işler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yüksek Öncelik</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobs.filter((j) => j.priority === "Yüksek").length}</div>
            <p className="text-xs text-muted-foreground">Acil işler</p>
          </CardContent>
        </Card>
      </div>

      {/* Arama ve Filtreleme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Arama ve Filtreleme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="İş no, numune no, müşteri veya metot ara..."
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
                <SelectItem value="Başladı">Başladı</SelectItem>
                <SelectItem value="Devam Ediyor">Devam Ediyor</SelectItem>
                <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                <SelectItem value="İnceleme Bekliyor">İnceleme Bekliyor</SelectItem>
                <SelectItem value="Onay Bekliyor">Onay Bekliyor</SelectItem>
                <SelectItem value="Rapor Hazırlandı">Rapor Hazırlandı</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Öncelik filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Öncelikler</SelectItem>
                <SelectItem value="Yüksek">Yüksek</SelectItem>
                <SelectItem value="Normal">Normal</SelectItem>
                <SelectItem value="Düşük">Düşük</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="jobs">Test İşleri</TabsTrigger>
          <TabsTrigger value="results">Sonuçlar</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Test İşleri</h2>
            <div className="flex gap-2">
              <Dialog
                open={isJobDialogOpen}
                onOpenChange={(open) => {
                  setIsJobDialogOpen(open)
                  if (!open) {
                    setEditingJob(null)
                    resetForm()
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni İş
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingJob ? "İş Düzenle" : "Yeni Test İşi"}</DialogTitle>
                    <DialogDescription>
                      {editingJob ? "Test işi bilgilerini güncelleyin" : "Yeni test işi oluşturun"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleJobSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="jobNumber">İş Numarası *</Label>
                        <Input
                          id="jobNumber"
                          value={jobFormData.jobNumber}
                          onChange={(e) => setJobFormData({ ...jobFormData, jobNumber: e.target.value })}
                          placeholder="TJ-2024-XXX"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sampleNumber">Numune Numarası *</Label>
                        <Input
                          id="sampleNumber"
                          value={jobFormData.sampleNumber}
                          onChange={(e) => setJobFormData({ ...jobFormData, sampleNumber: e.target.value })}
                          placeholder="SMP-2024-XXX"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="clientName">Müşteri Adı *</Label>
                        <Input
                          id="clientName"
                          value={jobFormData.clientName}
                          onChange={(e) => setJobFormData({ ...jobFormData, clientName: e.target.value })}
                          placeholder="Müşteri firma adı"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="testMethod">Test Metodu *</Label>
                        <Input
                          id="testMethod"
                          value={jobFormData.testMethod}
                          onChange={(e) => setJobFormData({ ...jobFormData, testMethod: e.target.value })}
                          placeholder="Test metodu adı"
                          required
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="methodCode">Metot Kodu</Label>
                        <Input
                          id="methodCode"
                          value={jobFormData.methodCode}
                          onChange={(e) => setJobFormData({ ...jobFormData, methodCode: e.target.value })}
                          placeholder="TM-XXX"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Öncelik *</Label>
                        <Select
                          value={jobFormData.priority}
                          onValueChange={(value) => setJobFormData({ ...jobFormData, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Öncelik seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yüksek">Yüksek</SelectItem>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Düşük">Düşük</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="assignedTo">Atanan Personel</Label>
                        <Input
                          id="assignedTo"
                          value={jobFormData.assignedTo}
                          onChange={(e) => setJobFormData({ ...jobFormData, assignedTo: e.target.value })}
                          placeholder="Sorumlu personel"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={jobFormData.startDate}
                          onChange={(e) => setJobFormData({ ...jobFormData, startDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dueDate">Bitiş Tarihi</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={jobFormData.dueDate}
                        onChange={(e) => setJobFormData({ ...jobFormData, dueDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea
                        id="notes"
                        value={jobFormData.notes}
                        onChange={(e) => setJobFormData({ ...jobFormData, notes: e.target.value })}
                        placeholder="Özel notlar"
                        rows={3}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsJobDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button type="submit">{editingJob ? "Güncelle" : "Oluştur"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Test İşleri Listesi</CardTitle>
              <CardDescription>
                Tüm test işleri ve durumları
                {searchTerm && ` - "${searchTerm}" için ${filteredJobs.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedJobs.length === filteredJobs.length && filteredJobs.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>İş No</TableHead>
                    <TableHead>Numune/Müşteri</TableHead>
                    <TableHead>Test Metodu</TableHead>
                    <TableHead>Durum/İlerleme</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Atanan</TableHead>
                    <TableHead>Tarihler</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedJobs.includes(job.id)}
                          onCheckedChange={(checked) => handleSelectJob(job.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{job.jobNumber}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.sampleNumber}</div>
                          <div className="text-sm text-muted-foreground">{job.clientName}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{job.testMethod}</div>
                          <div className="text-sm text-muted-foreground">{job.methodCode}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div>{getStatusBadge(job.status)}</div>
                          <div className="flex items-center space-x-2">
                            <Progress value={job.progress} className="w-16 h-2" />
                            <span className="text-xs text-muted-foreground">{job.progress}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(job.priority)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{job.assignedTo}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Başlangıç: {job.startDate}</div>
                          <div>Bitiş: {job.dueDate}</div>
                          {job.completionDate && <div>Tamamlanma: {job.completionDate}</div>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditJob(job)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          {job.status === "Planlandı" && (
                            <Button variant="ghost" size="sm" title="Başlat" onClick={() => startJob(job.id)}>
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          {job.status === "Devam Ediyor" && (
                            <Button variant="ghost" size="sm" title="Duraklat" onClick={() => pauseJob(job.id)}>
                              <Pause className="w-4 h-4" />
                            </Button>
                          )}
                          {job.status === "Devam Ediyor" && (
                            <Button variant="ghost" size="sm" title="Tamamla" onClick={() => completeJob(job.id)}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
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
              <CardDescription>Tüm test işlerinin sonuçları ve kalite kontrol durumu</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobs.map((job) => (
                  <Card key={job.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium">{job.jobNumber} - {job.sampleNumber}</div>
                        <div className="text-sm text-muted-foreground">{job.clientName} - {job.testMethod}</div>
                      </div>
                      <div className="flex space-x-2">
                        {getStatusBadge(job.status)}
                        {getResultStatusBadge(job.results.overallStatus)}
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Parametre Sonuçları</h4>
                        <div className="space-y-2">
                          {job.parameters.map((param, index) => (
                            <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                              <div className="flex-1">
                                <div className="font-medium">{param.parameter}</div>
                                <div className="text-sm text-muted-foreground">{param.method}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{param.result} {param.unit}</div>
                                <div className="text-sm">{getResultStatusBadge(param.status)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Kalite Kontrol:</div>
                          <div className="font-medium">{job.qualityControl.status}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Belirsizlik:</div>
                          <div className="font-medium">{job.results.uncertainty}</div>
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
                  {Array.from(new Set(jobs.map(j => j.status))).map(status => {
                    const count = jobs.filter(j => j.status === status).length
                    const percentage = (count / jobs.length) * 100
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
                <CardTitle>Öncelik Dağılımı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(jobs.map(j => j.priority))).map(priority => {
                    const count = jobs.filter(j => j.priority === priority).length
                    const percentage = (count / jobs.length) * 100
                    return (
                      <div key={priority} className="flex justify-between items-center">
                        <span className="text-sm">{priority}</span>
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
