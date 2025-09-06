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
  MessageSquare,
  User,
  Phone,
  Mail,
  Star,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { toast } from "sonner"

interface CustomerComplaint {
  id: string
  complaintNumber: string
  customerName: string
  customerContact: {
    email: string
    phone: string
    company: string
  }
  complaintType: string
  priority: string
  status: string
  receivedDate: string
  dueDate: string
  resolvedDate: string
  subject: string
  description: string
  category: string
  severity: string
  assignedTo: string
  department: string
  investigation: {
    investigator: string
    investigationDate: string
    findings: string
    rootCause: string
    evidence: string[]
  }
  resolution: {
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
    followUpDate: string
  }
  customerSatisfaction: {
    rating: number
    feedback: string
    followUpDate: string
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

export default function CustomerComplaintsPage() {
  const [complaints, setComplaints] = useState<CustomerComplaint[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("complaints")

  // Dialog states
  const [isComplaintDialogOpen, setIsComplaintDialogOpen] = useState(false)
  const [editingComplaint, setEditingComplaint] = useState<CustomerComplaint | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([])

  // Form data
  const [complaintFormData, setComplaintFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    company: "",
    complaintType: "",
    priority: "Normal",
    subject: "",
    description: "",
    category: "",
    severity: "Orta",
    assignedTo: "",
    department: "",
    dueDate: "",
    notes: "",
  })

  useEffect(() => {
    fetchComplaints()
  }, [])

  const fetchComplaints = async () => {
    try {
      setIsLoading(true)
      // Mock data for customer complaints
      const mockData: CustomerComplaint[] = [
        {
          id: "cc-001",
          complaintNumber: "CC-2024-001",
          customerName: "ABC Gıda Sanayi A.Ş.",
          customerContact: {
            email: "kalite@abcgida.com",
            phone: "+90 212 555 0101",
            company: "ABC Gıda Sanayi A.Ş."
          },
          complaintType: "Test Sonucu",
          priority: "Yüksek",
          status: "Çözüldü",
          receivedDate: "2024-01-15",
          dueDate: "2024-01-30",
          resolvedDate: "2024-01-25",
          subject: "Mikrobiyoloji test sonuçlarında tutarsızlık",
          description: "Gönderilen numunelerin mikrobiyoloji test sonuçlarında önceki testlerle tutarsızlık tespit edildi. Aynı numuneler farklı sonuçlar veriyor.",
          category: "Test Sonucu",
          severity: "Yüksek",
          assignedTo: "Dr. Mehmet Kaya",
          department: "Mikrobiyoloji Laboratuvarı",
          investigation: {
            investigator: "Dr. Mehmet Kaya",
            investigationDate: "2024-01-16",
            findings: "Test metodu ve cihaz kalibrasyonu kontrol edildi. Cihaz kalibrasyonunda sapma tespit edildi.",
            rootCause: "Spektrofotometre cihazının kalibrasyonu güncel değildi",
            evidence: ["Kalibrasyon sertifikası", "Test kayıtları", "Cihaz logları"]
          },
          resolution: {
            action: "Cihaz yeniden kalibre edildi ve test tekrarlandı",
            responsible: "Dr. Mehmet Kaya",
            dueDate: "2024-01-25",
            status: "Tamamlandı",
            effectiveness: "Müşteri memnun",
            followUpDate: "2024-02-15"
          },
          customerSatisfaction: {
            rating: 4,
            feedback: "Sorun hızlı çözüldü, memnunuz",
            followUpDate: "2024-02-15",
            status: "Tamamlandı"
          },
          attachments: [
            { name: "sikayet_cc001.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-01-15" },
            { name: "test_sonuclari_cc001.xlsx", type: "Excel", size: "0.8 MB", uploadDate: "2024-01-16" },
          ],
          notes: "Müşteri şikayeti başarıyla çözüldü. Cihaz kalibrasyonu düzenlendi.",
          createdAt: "2024-01-15",
          updatedAt: "2024-01-25",
        },
        {
          id: "cc-002",
          complaintNumber: "CC-2024-002",
          customerName: "XYZ Kimya Ltd.",
          customerContact: {
            email: "info@xyzkimya.com",
            phone: "+90 216 555 0202",
            company: "XYZ Kimya Ltd."
          },
          complaintType: "Hizmet Kalitesi",
          priority: "Normal",
          status: "İnceleniyor",
          receivedDate: "2024-02-10",
          dueDate: "2024-02-25",
          resolvedDate: "",
          subject: "Rapor teslim süresinde gecikme",
          description: "Kimyasal analiz raporunun teslim süresinde 3 gün gecikme yaşandı. Acil ihtiyaç duyduğumuz için sorun yaratıyor.",
          category: "Hizmet Kalitesi",
          severity: "Orta",
          assignedTo: "Dr. Fatma Demir",
          department: "Kimya Laboratuvarı",
          investigation: {
            investigator: "Dr. Fatma Demir",
            investigationDate: "2024-02-11",
            findings: "Analiz sürecinde beklenmeyen teknik sorun yaşandı",
            rootCause: "Analiz cihazında arıza ve yedek parça bekleme süresi",
            evidence: ["Cihaz arıza raporu", "Yedek parça siparişi", "Analiz kayıtları"]
          },
          resolution: {
            action: "Yedek parça temin edildi, analiz tamamlandı",
            responsible: "Dr. Fatma Demir",
            dueDate: "2024-02-20",
            status: "Devam Ediyor",
            effectiveness: "",
            followUpDate: ""
          },
          customerSatisfaction: {
            rating: 0,
            feedback: "",
            followUpDate: "",
            status: "Beklemede"
          },
          attachments: [
            { name: "sikayet_cc002.pdf", type: "PDF", size: "0.9 MB", uploadDate: "2024-02-10" },
          ],
          notes: "Şikayet inceleniyor. Çözüm süreci devam ediyor.",
          createdAt: "2024-02-10",
          updatedAt: "2024-02-11",
        },
        {
          id: "cc-003",
          complaintNumber: "CC-2024-003",
          customerName: "DEF Tekstil A.Ş.",
          customerContact: {
            email: "kalite@deftekstil.com",
            phone: "+90 232 555 0303",
            company: "DEF Tekstil A.Ş."
          },
          complaintType: "Fatura",
          priority: "Düşük",
          status: "Çözüldü",
          receivedDate: "2024-01-20",
          dueDate: "2024-02-05",
          resolvedDate: "2024-01-28",
          subject: "Fatura tutarında hata",
          description: "Faturada yanlış test sayısı gösterilmiş. 5 test yapıldı ama 7 test ücreti alınmış.",
          category: "Fatura",
          severity: "Düşük",
          assignedTo: "Muhasebe Müdürü",
          department: "Muhasebe",
          investigation: {
            investigator: "Muhasebe Müdürü",
            investigationDate: "2024-01-21",
            findings: "Fatura oluşturma sürecinde manuel hata yapılmış",
            rootCause: "Fatura oluşturma sırasında test sayısı yanlış girilmiş",
            evidence: ["Test kayıtları", "Fatura kayıtları", "Sistem logları"]
          },
          resolution: {
            action: "Düzeltilmiş fatura gönderildi ve fark iade edildi",
            responsible: "Muhasebe Müdürü",
            dueDate: "2024-01-28",
            status: "Tamamlandı",
            effectiveness: "Müşteri memnun",
            followUpDate: "2024-02-15"
          },
          customerSatisfaction: {
            rating: 5,
            feedback: "Hızlı çözüm için teşekkürler",
            followUpDate: "2024-02-15",
            status: "Tamamlandı"
          },
          attachments: [
            { name: "sikayet_cc003.pdf", type: "PDF", size: "0.7 MB", uploadDate: "2024-01-20" },
            { name: "duzeltilmis_fatura_cc003.pdf", type: "PDF", size: "0.5 MB", uploadDate: "2024-01-28" },
          ],
          notes: "Fatura hatası düzeltildi ve müşteri memnuniyeti sağlandı.",
          createdAt: "2024-01-20",
          updatedAt: "2024-01-28",
        },
      ]
      setComplaints(mockData)
    } catch (error) {
      console.error("Complaints fetch error:", error)
      toast.error("Müşteri şikayeti verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Yeni": "bg-blue-100 text-blue-800",
      "İnceleniyor": "bg-yellow-100 text-yellow-800",
      "Çözüldü": "bg-green-100 text-green-800",
      "Kapatıldı": "bg-green-100 text-green-800",
      "İptal Edildi": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Orta": "bg-yellow-100 text-yellow-800",
      "Düşük": "bg-green-100 text-green-800",
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

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch = 
      complaint.complaintNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || complaint.status === statusFilter
    const matchesType = typeFilter === "all" || complaint.complaintType === typeFilter
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
          <h1 className="text-3xl font-bold text-foreground">Müşteri Şikayetleri</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu müşteri geri bildirimleri ve şikayet yönetimi</p>
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
            <CardTitle className="text-sm font-medium">Toplam Şikayet</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.length}</div>
            <p className="text-xs text-muted-foreground">Kayıtlı şikayet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Çözüldü</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "Çözüldü").length}</div>
            <p className="text-xs text-muted-foreground">Çözülen şikayetler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">İnceleniyor</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complaints.filter((c) => c.status === "İnceleniyor").length}</div>
            <p className="text-xs text-muted-foreground">Açık şikayetler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Memnuniyet</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complaints.filter(c => c.customerSatisfaction.rating > 0).length > 0 ? 
                (complaints
                  .filter(c => c.customerSatisfaction.rating > 0)
                  .reduce((sum, c) => sum + c.customerSatisfaction.rating, 0) / 
                  complaints.filter(c => c.customerSatisfaction.rating > 0).length
                ).toFixed(1) 
                : "0.0"
              }
            </div>
            <p className="text-xs text-muted-foreground">Müşteri memnuniyeti</p>
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
                placeholder="Şikayet no, müşteri, konu ara..."
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
                <SelectItem value="Yeni">Yeni</SelectItem>
                <SelectItem value="İnceleniyor">İnceleniyor</SelectItem>
                <SelectItem value="Çözüldü">Çözüldü</SelectItem>
                <SelectItem value="Kapatıldı">Kapatıldı</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="Test Sonucu">Test Sonucu</SelectItem>
                <SelectItem value="Hizmet Kalitesi">Hizmet Kalitesi</SelectItem>
                <SelectItem value="Fatura">Fatura</SelectItem>
                <SelectItem value="Rapor">Rapor</SelectItem>
                <SelectItem value="Diğer">Diğer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="complaints">Şikayetler</TabsTrigger>
          <TabsTrigger value="satisfaction">Memnuniyet</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="complaints" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Müşteri Şikayetleri</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Yeni Şikayet
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Şikayet Listesi</CardTitle>
              <CardDescription>Tüm müşteri şikayetleri ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Şikayet No</TableHead>
                    <TableHead>Müşteri</TableHead>
                    <TableHead>Konu</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Öncelik</TableHead>
                    <TableHead>Atanan</TableHead>
                    <TableHead>Tarihler</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.map((complaint) => (
                    <TableRow key={complaint.id}>
                      <TableCell className="font-medium">{complaint.complaintNumber}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{complaint.customerName}</div>
                          <div className="text-sm text-muted-foreground">{complaint.customerContact.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{complaint.subject}</div>
                          <div className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{complaint.complaintType}</TableCell>
                      <TableCell>{getStatusBadge(complaint.status)}</TableCell>
                      <TableCell>{getPriorityBadge(complaint.priority)}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{complaint.assignedTo}</div>
                          <div className="text-sm text-muted-foreground">{complaint.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>Alınan: {complaint.receivedDate}</div>
                          <div>Beklenen: {complaint.dueDate}</div>
                          {complaint.resolvedDate && <div>Çözülen: {complaint.resolvedDate}</div>}
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

        <TabsContent value="satisfaction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Müşteri Memnuniyeti</CardTitle>
              <CardDescription>Şikayet çözümü sonrası müşteri geri bildirimleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complaints.filter(c => c.customerSatisfaction.rating > 0).map((complaint) => (
                  <Card key={complaint.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="font-medium">{complaint.complaintNumber} - {complaint.customerName}</div>
                        <div className="text-sm text-muted-foreground">{complaint.subject}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex">{getRatingStars(complaint.customerSatisfaction.rating)}</div>
                        <Badge className="bg-green-100 text-green-800">{complaint.customerSatisfaction.status}</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <div className="font-medium">Geri Bildirim:</div>
                        <div className="text-muted-foreground">{complaint.customerSatisfaction.feedback}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Takip Tarihi: {complaint.customerSatisfaction.followUpDate}
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
                  {Array.from(new Set(complaints.map(c => c.status))).map(status => {
                    const count = complaints.filter(c => c.status === status).length
                    const percentage = (count / complaints.length) * 100
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
                <CardTitle>Şikayet Tipleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array.from(new Set(complaints.map(c => c.complaintType))).map(type => {
                    const count = complaints.filter(c => c.complaintType === type).length
                    const percentage = (count / complaints.length) * 100
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
