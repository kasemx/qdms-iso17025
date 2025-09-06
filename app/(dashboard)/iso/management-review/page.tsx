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
} from "lucide-react"
import { toast } from "sonner"

interface ManagementReview {
  id: string
  title: string
  reviewDate: string
  nextReviewDate: string
  status: string
  type: string
  participants: Array<{
    id: string
    name: string
    role: string
    department: string
    attendance: boolean
  }>
  agenda: Array<{
    id: string
    topic: string
    presenter: string
    duration: string
    status: string
  }>
  objectives: Array<{
    id: string
    objective: string
    target: string
    actual: string
    status: string
  }>
  actionItems: Array<{
    id: string
    item: string
    responsible: string
    dueDate: string
    status: string
    priority: string
  }>
  decisions: Array<{
    id: string
    decision: string
    rationale: string
    impact: string
  }>
  risks: Array<{
    id: string
    risk: string
    level: string
    mitigation: string
    status: string
  }>
  opportunities: Array<{
    id: string
    opportunity: string
    potential: string
    action: string
    status: string
  }>
  budget: {
    planned: number
    actual: number
    variance: number
  }
  qualityMetrics: {
    customerSatisfaction: number
    processEfficiency: number
    complianceRate: number
    trainingCompletion: number
  }
  notes: string
  attachments: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  createdBy: string
  createdAt: string
  updatedAt: string
}

export default function ManagementReviewPage() {
  const [reviews, setReviews] = useState<ManagementReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("reviews")

  // Dialog states
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [editingReview, setEditingReview] = useState<ManagementReview | null>(null)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedReviews, setSelectedReviews] = useState<string[]>([])

  // Form data
  const [reviewFormData, setReviewFormData] = useState({
    title: "",
    reviewDate: "",
    nextReviewDate: "",
    type: "Yıllık",
    notes: "",
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setIsLoading(true)
      // Mock data for management reviews
      const mockData: ManagementReview[] = [
        {
          id: "mr-001",
          title: "2024 Yıllık Yönetim Gözden Geçirmesi",
          reviewDate: "2024-03-15",
          nextReviewDate: "2025-03-15",
          status: "Tamamlandı",
          type: "Yıllık",
          participants: [
            { id: "p1", name: "Dr. Mehmet Özkan", role: "Genel Müdür", department: "Genel Müdürlük", attendance: true },
            { id: "p2", name: "Ahmet Yılmaz", role: "Kalite Müdürü", department: "Kalite Yönetimi", attendance: true },
            { id: "p3", name: "Fatma Demir", role: "Laboratuvar Müdürü", department: "Laboratuvar Hizmetleri", attendance: true },
            { id: "p4", name: "Mehmet Kaya", role: "Teknik Müdür", department: "Teknik Hizmetler", attendance: true },
          ],
          agenda: [
            { id: "a1", topic: "Kalite Hedefleri Değerlendirmesi", presenter: "Ahmet Yılmaz", duration: "30 dk", status: "Tamamlandı" },
            { id: "a2", topic: "Müşteri Memnuniyeti Analizi", presenter: "Fatma Demir", duration: "25 dk", status: "Tamamlandı" },
            { id: "a3", topic: "İç Denetim Sonuçları", presenter: "Ahmet Yılmaz", duration: "20 dk", status: "Tamamlandı" },
            { id: "a4", topic: "Ekipman Durumu ve Kalibrasyon", presenter: "Mehmet Kaya", duration: "15 dk", status: "Tamamlandı" },
          ],
          objectives: [
            { id: "o1", objective: "Müşteri Memnuniyeti", target: "95%", actual: "97%", status: "Başarılı" },
            { id: "o2", objective: "Kalite Hedefleri Ulaşımı", target: "90%", actual: "92%", status: "Başarılı" },
            { id: "o3", objective: "Eğitim Tamamlama Oranı", target: "100%", actual: "98%", status: "Kısmen Başarılı" },
            { id: "o4", objective: "İç Denetim Uyumluluğu", target: "100%", actual: "100%", status: "Başarılı" },
          ],
          actionItems: [
            { id: "ai1", item: "Eğitim planını gözden geçir ve güncelle", responsible: "İK Müdürü", dueDate: "2024-04-30", status: "Devam Ediyor", priority: "Yüksek" },
            { id: "ai2", item: "Yeni ekipman alım planı hazırla", responsible: "Teknik Müdür", dueDate: "2024-05-15", status: "Planlandı", priority: "Orta" },
            { id: "ai3", item: "Müşteri geri bildirim sistemi iyileştir", responsible: "Kalite Müdürü", dueDate: "2024-06-30", status: "Planlandı", priority: "Düşük" },
          ],
          decisions: [
            { id: "d1", decision: "Yeni laboratuvar alanı kiralanacak", rationale: "Kapasite artışı ihtiyacı", impact: "Yüksek" },
            { id: "d2", decision: "Personel sayısı %20 artırılacak", rationale: "İş yükü artışı", impact: "Orta" },
          ],
          risks: [
            { id: "r1", risk: "Ekipman arızası riski", level: "Orta", mitigation: "Önleyici bakım programı", status: "Aktif" },
            { id: "r2", risk: "Personel devir oranı", level: "Düşük", mitigation: "Motivasyon programları", status: "İzleniyor" },
          ],
          opportunities: [
            { id: "op1", opportunity: "Yeni test metotları geliştirme", potential: "Yüksek", action: "AR-GE projesi başlat", status: "Değerlendiriliyor" },
            { id: "op2", opportunity: "Dijitalleşme projeleri", potential: "Orta", action: "Teknoloji yatırımı", status: "Planlanıyor" },
          ],
          budget: {
            planned: 5000000,
            actual: 4800000,
            variance: -200000,
          },
          qualityMetrics: {
            customerSatisfaction: 97,
            processEfficiency: 92,
            complianceRate: 100,
            trainingCompletion: 98,
          },
          notes: "Genel olarak başarılı bir yıl geçirdik. Kalite hedeflerimizi aştık ve müşteri memnuniyetimiz yüksek seviyede.",
          attachments: [
            { name: "2024_yillik_rapor.pdf", type: "PDF", size: "2.5 MB", uploadDate: "2024-03-15" },
            { name: "musteri_anket_sonuclari.xlsx", type: "Excel", size: "1.2 MB", uploadDate: "2024-03-10" },
          ],
          createdBy: "Ahmet Yılmaz",
          createdAt: "2024-03-01",
          updatedAt: "2024-03-15",
        },
        {
          id: "mr-002",
          title: "2024 Q1 Çeyrek Gözden Geçirmesi",
          reviewDate: "2024-04-15",
          nextReviewDate: "2024-07-15",
          status: "Planlandı",
          type: "Çeyrek",
          participants: [
            { id: "p1", name: "Dr. Mehmet Özkan", role: "Genel Müdür", department: "Genel Müdürlük", attendance: false },
            { id: "p2", name: "Ahmet Yılmaz", role: "Kalite Müdürü", department: "Kalite Yönetimi", attendance: false },
            { id: "p3", name: "Fatma Demir", role: "Laboratuvar Müdürü", department: "Laboratuvar Hizmetleri", attendance: false },
          ],
          agenda: [
            { id: "a1", topic: "Q1 Performans Değerlendirmesi", presenter: "Ahmet Yılmaz", duration: "30 dk", status: "Planlandı" },
            { id: "a2", topic: "Mali Durum Analizi", presenter: "Mali İşler Müdürü", duration: "20 dk", status: "Planlandı" },
          ],
          objectives: [],
          actionItems: [],
          decisions: [],
          risks: [],
          opportunities: [],
          budget: {
            planned: 1250000,
            actual: 0,
            variance: 0,
          },
          qualityMetrics: {
            customerSatisfaction: 0,
            processEfficiency: 0,
            complianceRate: 0,
            trainingCompletion: 0,
          },
          notes: "",
          attachments: [],
          createdBy: "Ahmet Yılmaz",
          createdAt: "2024-04-01",
          updatedAt: "2024-04-01",
        },
      ]
      setReviews(mockData)
    } catch (error) {
      console.error("Reviews fetch error:", error)
      toast.error("Yönetim gözden geçirme verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditReview = (review: ManagementReview) => {
    setEditingReview(review)
    setReviewFormData({
      title: review.title,
      reviewDate: review.reviewDate,
      nextReviewDate: review.nextReviewDate,
      type: review.type,
      notes: review.notes,
    })
    setIsReviewDialogOpen(true)
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (editingReview) {
        toast.success("Yönetim gözden geçirmesi başarıyla güncellendi")
      } else {
        toast.success("Yönetim gözden geçirmesi başarıyla oluşturuldu")
      }
      setIsReviewDialogOpen(false)
      setEditingReview(null)
      resetForm()
      fetchReviews()
    } catch (error) {
      toast.error("Yönetim gözden geçirmesi kaydedilirken hata oluştu")
    }
  }

  const resetForm = () => {
    setReviewFormData({
      title: "",
      reviewDate: "",
      nextReviewDate: "",
      type: "Yıllık",
      notes: "",
    })
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Tamamlandı": "bg-green-100 text-green-800",
      "Planlandı": "bg-blue-100 text-blue-800",
      "Devam Ediyor": "bg-yellow-100 text-yellow-800",
      "İptal Edildi": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Orta": "bg-yellow-100 text-yellow-800",
      "Düşük": "bg-green-100 text-green-800",
    }
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{priority}</Badge>
  }

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesType = typeFilter === "all" || review.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedReviews(filteredReviews.map((review) => review.id))
    } else {
      setSelectedReviews([])
    }
  }

  const handleSelectReview = (reviewId: string, checked: boolean) => {
    if (checked) {
      setSelectedReviews([...selectedReviews, reviewId])
    } else {
      setSelectedReviews(selectedReviews.filter((id) => id !== reviewId))
    }
  }

  const exportReviewReport = () => {
    toast.success("Yönetim gözden geçirme raporu indiriliyor...")
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
          <h1 className="text-3xl font-bold text-foreground">Yönetim Gözden Geçirmesi</h1>
          <p className="text-muted-foreground">ISO 17025 yönetim gözden geçirme süreçleri ve raporları</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReviewReport}>
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Gözden Geçirme</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">Toplam gözden geçirme sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tamamlanan</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.filter((r) => r.status === "Tamamlandı").length}</div>
            <p className="text-xs text-muted-foreground">Tamamlanan gözden geçirmeler</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktif Aksiyonlar</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {reviews.reduce((sum, r) => sum + r.actionItems.filter(ai => ai.status === "Devam Ediyor").length, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Devam eden aksiyon maddeleri</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Memnuniyet</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(reviews.reduce((sum, r) => sum + r.qualityMetrics.customerSatisfaction, 0) / reviews.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Müşteri memnuniyet oranı</p>
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
                placeholder="Gözden geçirme başlığı ara..."
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
                <SelectItem value="Tamamlandı">Tamamlandı</SelectItem>
                <SelectItem value="Planlandı">Planlandı</SelectItem>
                <SelectItem value="Devam Ediyor">Devam Ediyor</SelectItem>
                <SelectItem value="İptal Edildi">İptal Edildi</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tip filtrele" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Tipler</SelectItem>
                <SelectItem value="Yıllık">Yıllık</SelectItem>
                <SelectItem value="Çeyrek">Çeyrek</SelectItem>
                <SelectItem value="Aylık">Aylık</SelectItem>
                <SelectItem value="Özel">Özel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reviews">Gözden Geçirmeler</TabsTrigger>
          <TabsTrigger value="action-items">Aksiyon Maddeleri</TabsTrigger>
          <TabsTrigger value="analytics">Analitik</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Yönetim Gözden Geçirmeleri</h2>
            <div className="flex gap-2">
              <Dialog
                open={isReviewDialogOpen}
                onOpenChange={(open) => {
                  setIsReviewDialogOpen(open)
                  if (!open) {
                    setEditingReview(null)
                    resetForm()
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Yeni Gözden Geçirme
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingReview ? "Gözden Geçirme Düzenle" : "Yeni Gözden Geçirme"}</DialogTitle>
                    <DialogDescription>
                      {editingReview ? "Gözden geçirme bilgilerini güncelleyin" : "Yeni yönetim gözden geçirmesi oluşturun"}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Başlık *</Label>
                        <Input
                          id="title"
                          value={reviewFormData.title}
                          onChange={(e) => setReviewFormData({ ...reviewFormData, title: e.target.value })}
                          placeholder="Gözden geçirme başlığı"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tip *</Label>
                        <Select
                          value={reviewFormData.type}
                          onValueChange={(value) => setReviewFormData({ ...reviewFormData, type: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Tip seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Yıllık">Yıllık</SelectItem>
                            <SelectItem value="Çeyrek">Çeyrek</SelectItem>
                            <SelectItem value="Aylık">Aylık</SelectItem>
                            <SelectItem value="Özel">Özel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="reviewDate">Gözden Geçirme Tarihi *</Label>
                        <Input
                          id="reviewDate"
                          type="date"
                          value={reviewFormData.reviewDate}
                          onChange={(e) => setReviewFormData({ ...reviewFormData, reviewDate: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nextReviewDate">Sonraki Gözden Geçirme Tarihi *</Label>
                        <Input
                          id="nextReviewDate"
                          type="date"
                          value={reviewFormData.nextReviewDate}
                          onChange={(e) => setReviewFormData({ ...reviewFormData, nextReviewDate: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notlar</Label>
                      <Textarea
                        id="notes"
                        value={reviewFormData.notes}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, notes: e.target.value })}
                        placeholder="Gözden geçirme notları"
                        rows={4}
                      />
                    </div>

                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
                        İptal
                      </Button>
                      <Button type="submit">{editingReview ? "Güncelle" : "Oluştur"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Gözden Geçirme Listesi</CardTitle>
              <CardDescription>
                Tüm yönetim gözden geçirmeleri ve durumları
                {searchTerm && ` - "${searchTerm}" için ${filteredReviews.length} sonuç`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedReviews.length === filteredReviews.length && filteredReviews.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Katılımcılar</TableHead>
                    <TableHead>Aksiyonlar</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedReviews.includes(review.id)}
                          onCheckedChange={(checked) => handleSelectReview(review.id, checked as boolean)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{review.title}</div>
                          <div className="text-sm text-muted-foreground">
                            Sonraki: {review.nextReviewDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{review.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{review.reviewDate}</div>
                      </TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {review.participants.filter(p => p.attendance).length}/{review.participants.length} katıldı
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {review.actionItems.length} aksiyon maddesi
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" title="Düzenle" onClick={() => handleEditReview(review)}>
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

        <TabsContent value="action-items" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Aksiyon Maddeleri</CardTitle>
              <CardDescription>Tüm gözden geçirmelerden çıkan aksiyon maddeleri</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reviews.map((review) => 
                  review.actionItems.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <div className="font-medium">{item.item}</div>
                          <div className="text-sm text-muted-foreground">
                            Sorumlu: {item.responsible} | Bitiş: {item.dueDate}
                          </div>
                          <div className="text-sm">Gözden Geçirme: {review.title}</div>
                        </div>
                        <div className="flex space-x-2">
                          {getStatusBadge(item.status)}
                          {getPriorityBadge(item.priority)}
                        </div>
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
                <CardTitle>Kalite Metrikleri</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="font-medium">{review.title}</div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Müşteri Memnuniyeti</div>
                          <div className="font-medium">{review.qualityMetrics.customerSatisfaction}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Süreç Verimliliği</div>
                          <div className="font-medium">{review.qualityMetrics.processEfficiency}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Uyumluluk Oranı</div>
                          <div className="font-medium">{review.qualityMetrics.complianceRate}%</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Eğitim Tamamlama</div>
                          <div className="font-medium">{review.qualityMetrics.trainingCompletion}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Bütçe Analizi</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="font-medium">{review.title}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Planlanan:</span>
                          <span>{review.budget.planned.toLocaleString("tr-TR")} ₺</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Gerçekleşen:</span>
                          <span>{review.budget.actual.toLocaleString("tr-TR")} ₺</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Fark:</span>
                          <span className={review.budget.variance < 0 ? "text-red-600" : "text-green-600"}>
                            {review.budget.variance.toLocaleString("tr-TR")} ₺
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
