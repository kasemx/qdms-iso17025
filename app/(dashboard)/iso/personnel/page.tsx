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
import { Plus, Edit, Eye, Users, GraduationCap, Calendar, Award } from "lucide-react"
import { toast } from "sonner"

interface PersonnelCompetency {
  id: string
  employeeName: string
  position: string
  department: string
  requiredCompetencies: string[]
  currentCompetencies: string[]
  competencyGap: string[]
  lastAssessment: string
  nextAssessment: string
  status: string
}

interface TrainingPlan {
  id: string
  title: string
  description: string
  targetAudience: string
  trainer: string
  plannedDate: string
  duration: string
  type: string
  status: string
  participants: number
  maxParticipants: number
}

export default function PersonnelPage() {
  const [competencies, setCompetencies] = useState<PersonnelCompetency[]>([])
  const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("competency")

  // Dialog states
  const [isCompetencyDialogOpen, setIsCompetencyDialogOpen] = useState(false)
  const [isTrainingDialogOpen, setIsTrainingDialogOpen] = useState(false)

  // Form data states
  const [competencyFormData, setCompetencyFormData] = useState({
    employeeName: "",
    position: "",
    department: "",
    requiredCompetencies: "",
    currentCompetencies: "",
    nextAssessment: "",
  })

  const [trainingFormData, setTrainingFormData] = useState({
    title: "",
    description: "",
    targetAudience: "",
    trainer: "",
    plannedDate: "",
    duration: "",
    type: "",
    maxParticipants: "",
  })

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setIsLoading(true)
      await Promise.all([fetchCompetencies(), fetchTrainingPlans()])
    } catch (error) {
      toast.error("Veriler yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCompetencies = async () => {
    try {
      // Mock data for now
      const mockData: PersonnelCompetency[] = [
        {
          id: "1",
          employeeName: "Ahmet Yılmaz",
          position: "Kalite Müdürü",
          department: "Kalite Güvence",
          requiredCompetencies: ["ISO 17025", "Kalite Yönetimi", "Risk Analizi"],
          currentCompetencies: ["ISO 17025", "Kalite Yönetimi"],
          competencyGap: ["Risk Analizi"],
          lastAssessment: "2024-01-15",
          nextAssessment: "2024-07-15",
          status: "needs_training",
        },
        {
          id: "2",
          employeeName: "Fatma Demir",
          position: "Laboratuvar Uzmanı",
          department: "Laboratuvar",
          requiredCompetencies: ["Analitik Kimya", "Cihaz Kalibrasyonu", "Veri Analizi"],
          currentCompetencies: ["Analitik Kimya", "Cihaz Kalibrasyonu", "Veri Analizi"],
          competencyGap: [],
          lastAssessment: "2024-01-10",
          nextAssessment: "2024-07-10",
          status: "competent",
        },
      ]
      setCompetencies(mockData)
    } catch (error) {
      console.error("Competency fetch error:", error)
    }
  }

  const fetchTrainingPlans = async () => {
    try {
      // Mock data for now
      const mockData: TrainingPlan[] = [
        {
          id: "1",
          title: "ISO 17025:2017 Temel Eğitimi",
          description: "ISO 17025 standardının temel gereksinimlerini kapsayan eğitim",
          targetAudience: "Tüm laboratuvar personeli",
          trainer: "Dış Eğitmen - ABC Danışmanlık",
          plannedDate: "2024-02-15",
          duration: "16 saat",
          type: "external",
          status: "planned",
          participants: 12,
          maxParticipants: 20,
        },
        {
          id: "2",
          title: "Risk Analizi ve Yönetimi",
          description: "Laboratuvar süreçlerinde risk analizi metodolojileri",
          targetAudience: "Yönetici ve uzman personel",
          trainer: "Mehmet Kaya - İç Eğitmen",
          plannedDate: "2024-03-01",
          duration: "8 saat",
          type: "internal",
          status: "scheduled",
          participants: 8,
          maxParticipants: 15,
        },
      ]
      setTrainingPlans(mockData)
    } catch (error) {
      console.error("Training plans fetch error:", error)
    }
  }

  const handleCompetencySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Yetkinlik kaydı başarıyla oluşturuldu")
      setIsCompetencyDialogOpen(false)
      setCompetencyFormData({
        employeeName: "",
        position: "",
        department: "",
        requiredCompetencies: "",
        currentCompetencies: "",
        nextAssessment: "",
      })
      fetchCompetencies()
    } catch (error) {
      toast.error("Kayıt oluşturulurken hata oluştu")
    }
  }

  const handleTrainingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Eğitim planı başarıyla oluşturuldu")
      setIsTrainingDialogOpen(false)
      setTrainingFormData({
        title: "",
        description: "",
        targetAudience: "",
        trainer: "",
        plannedDate: "",
        duration: "",
        type: "",
        maxParticipants: "",
      })
      fetchTrainingPlans()
    } catch (error) {
      toast.error("Plan oluşturulurken hata oluştu")
    }
  }

  const getStatusBadge = (status: string, type = "competency") => {
    const variants: Record<string, Record<string, string>> = {
      competency: {
        competent: "bg-green-100 text-green-800",
        needs_training: "bg-yellow-100 text-yellow-800",
        under_review: "bg-blue-100 text-blue-800",
      },
      training: {
        planned: "bg-blue-100 text-blue-800",
        scheduled: "bg-green-100 text-green-800",
        completed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-100 text-red-800",
      },
    }

    const variant = variants[type]?.[status] || "bg-gray-100 text-gray-800"
    return <Badge className={variant}>{status.replace("_", " ").toUpperCase()}</Badge>
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
          <h1 className="text-3xl font-bold text-foreground">Personel ve Eğitim</h1>
          <p className="text-muted-foreground">Personel yetkinlikleri ve eğitim planları</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Personel</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competencies.length}</div>
            <p className="text-xs text-muted-foreground">Değerlendirilen personel</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yetkin Personel</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{competencies.filter((c) => c.status === "competent").length}</div>
            <p className="text-xs text-muted-foreground">Tam yetkin personel sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eğitim Planları</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingPlans.length}</div>
            <p className="text-xs text-muted-foreground">Aktif eğitim planı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yaklaşan Eğitimler</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{trainingPlans.filter((t) => t.status === "scheduled").length}</div>
            <p className="text-xs text-muted-foreground">Bu ay planlanmış</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="competency">Personel Yetkinlikleri</TabsTrigger>
          <TabsTrigger value="training">Eğitim Planları</TabsTrigger>
        </TabsList>

        <TabsContent value="competency" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Personel Yetkinlikleri</h2>
            <Dialog open={isCompetencyDialogOpen} onOpenChange={setIsCompetencyDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Değerlendirme
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Yetkinlik Değerlendirmesi</DialogTitle>
                  <DialogDescription>Personel yetkinlik değerlendirmesi oluşturun</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCompetencySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="employeeName">Personel Adı</Label>
                      <Input
                        id="employeeName"
                        value={competencyFormData.employeeName}
                        onChange={(e) => setCompetencyFormData({ ...competencyFormData, employeeName: e.target.value })}
                        placeholder="Personel adı"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="position">Pozisyon</Label>
                      <Input
                        id="position"
                        value={competencyFormData.position}
                        onChange={(e) => setCompetencyFormData({ ...competencyFormData, position: e.target.value })}
                        placeholder="Pozisyon"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Departman</Label>
                    <Select
                      value={competencyFormData.department}
                      onValueChange={(value) => setCompetencyFormData({ ...competencyFormData, department: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Departman seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="laboratory">Laboratuvar</SelectItem>
                        <SelectItem value="quality">Kalite Güvence</SelectItem>
                        <SelectItem value="management">Yönetim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requiredCompetencies">Gerekli Yetkinlikler</Label>
                    <Textarea
                      id="requiredCompetencies"
                      value={competencyFormData.requiredCompetencies}
                      onChange={(e) =>
                        setCompetencyFormData({ ...competencyFormData, requiredCompetencies: e.target.value })
                      }
                      placeholder="Pozisyon için gerekli yetkinlikler (virgülle ayırın)"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentCompetencies">Mevcut Yetkinlikler</Label>
                    <Textarea
                      id="currentCompetencies"
                      value={competencyFormData.currentCompetencies}
                      onChange={(e) =>
                        setCompetencyFormData({ ...competencyFormData, currentCompetencies: e.target.value })
                      }
                      placeholder="Personelin mevcut yetkinlikleri (virgülle ayırın)"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextAssessment">Sonraki Değerlendirme</Label>
                    <Input
                      id="nextAssessment"
                      type="date"
                      value={competencyFormData.nextAssessment}
                      onChange={(e) => setCompetencyFormData({ ...competencyFormData, nextAssessment: e.target.value })}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsCompetencyDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button type="submit">Kaydet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Personel Yetkinlik Listesi</CardTitle>
              <CardDescription>Tüm personelin yetkinlik durumu ve değerlendirmeleri</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Personel</TableHead>
                    <TableHead>Pozisyon</TableHead>
                    <TableHead>Departman</TableHead>
                    <TableHead>Yetkinlik Durumu</TableHead>
                    <TableHead>Son Değerlendirme</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {competencies.map((competency) => (
                    <TableRow key={competency.id}>
                      <TableCell className="font-medium">{competency.employeeName}</TableCell>
                      <TableCell>{competency.position}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{competency.department}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(competency.status, "competency")}</TableCell>
                      <TableCell>{competency.lastAssessment}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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

        <TabsContent value="training" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Eğitim Planları</h2>
            <Dialog open={isTrainingDialogOpen} onOpenChange={setIsTrainingDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Eğitim Planı
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Eğitim Planı</DialogTitle>
                  <DialogDescription>Yeni bir eğitim planı oluşturun</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleTrainingSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Eğitim Başlığı</Label>
                    <Input
                      id="title"
                      value={trainingFormData.title}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, title: e.target.value })}
                      placeholder="Eğitim başlığı"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      value={trainingFormData.description}
                      onChange={(e) => setTrainingFormData({ ...trainingFormData, description: e.target.value })}
                      placeholder="Eğitim içeriği ve hedefleri"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">Hedef Kitle</Label>
                      <Input
                        id="targetAudience"
                        value={trainingFormData.targetAudience}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, targetAudience: e.target.value })}
                        placeholder="Hedef kitle"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="trainer">Eğitmen</Label>
                      <Input
                        id="trainer"
                        value={trainingFormData.trainer}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, trainer: e.target.value })}
                        placeholder="Eğitmen adı"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="plannedDate">Planlanan Tarih</Label>
                      <Input
                        id="plannedDate"
                        type="date"
                        value={trainingFormData.plannedDate}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, plannedDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Süre</Label>
                      <Input
                        id="duration"
                        value={trainingFormData.duration}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, duration: e.target.value })}
                        placeholder="8 saat"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxParticipants">Max Katılımcı</Label>
                      <Input
                        id="maxParticipants"
                        type="number"
                        value={trainingFormData.maxParticipants}
                        onChange={(e) => setTrainingFormData({ ...trainingFormData, maxParticipants: e.target.value })}
                        placeholder="20"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Eğitim Türü</Label>
                    <Select
                      value={trainingFormData.type}
                      onValueChange={(value) => setTrainingFormData({ ...trainingFormData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Eğitim türü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internal">İç Eğitim</SelectItem>
                        <SelectItem value="external">Dış Eğitim</SelectItem>
                        <SelectItem value="online">Online Eğitim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsTrainingDialogOpen(false)}>
                      İptal
                    </Button>
                    <Button type="submit">Kaydet</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Eğitim Planları Listesi</CardTitle>
              <CardDescription>Tüm eğitim planları ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Eğitim Başlığı</TableHead>
                    <TableHead>Hedef Kitle</TableHead>
                    <TableHead>Eğitmen</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Katılımcı</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.title}</TableCell>
                      <TableCell>{plan.targetAudience}</TableCell>
                      <TableCell>{plan.trainer}</TableCell>
                      <TableCell>{plan.plannedDate}</TableCell>
                      <TableCell>{getStatusBadge(plan.status, "training")}</TableCell>
                      <TableCell>
                        {plan.participants}/{plan.maxParticipants}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
      </Tabs>
    </div>
  )
}
