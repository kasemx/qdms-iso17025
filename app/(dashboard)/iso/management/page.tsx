"use client"

import type React from "react"
import { useState, useEffect, lazy, Suspense, memo, useMemo, useCallback } from "react"
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
import { Plus, Edit, Eye, Building, Shield, Calendar, RefreshCw, Download, Settings } from "lucide-react"
import { toast } from "sonner"
import { PageHeader } from "@/components/ui/page-header"
// Lazy load mock data for better performance
const getMockData = () => import("@/lib/mock-data").then(module => module.mockData)

interface OrganizationStructure {
  id: string
  positionTitle: string
  department: string
  reportingTo: string
  responsibilities: string
  qualifications: string
  currentHolder: string
  status: string
  lastUpdated: string
}

interface ImpartialityRecord {
  id: string
  declarationType: string
  title: string
  description: string
  declaredBy: string
  riskLevel: string
  status: string
  createdAt: string
  reviewDate: string
}

interface ConfidentialityAgreement {
  id: string
  agreementType: string
  title: string
  signedBy: string
  signedDate: string
  expiryDate: string
  status: string
  department: string
  description: string
}

interface ManagementReview {
  id: string
  reviewDate: string
  reviewType: string
  chairperson: string
  attendees: string[]
  agenda: string
  decisions: string
  actionItems: string
  nextReviewDate: string
  status: string
}

export default function ManagementPage() {
  const [positions, setPositions] = useState<OrganizationStructure[]>([])
  const [impartialityRecords, setImpartialityRecords] = useState<ImpartialityRecord[]>([])
  const [confidentialityAgreements, setConfidentialityAgreements] = useState<ConfidentialityAgreement[]>([])
  const [managementReviews, setManagementReviews] = useState<ManagementReview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("organization")

  // Dialog states
  const [isOrgDialogOpen, setIsOrgDialogOpen] = useState(false)
  const [isImpartialityDialogOpen, setIsImpartialityDialogOpen] = useState(false)
  const [isConfidentialityDialogOpen, setIsConfidentialityDialogOpen] = useState(false)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)

  // Form data states
  const [orgFormData, setOrgFormData] = useState({
    positionTitle: "",
    department: "",
    reportingTo: "",
    responsibilities: "",
    qualifications: "",
    currentHolder: "",
  })

  const [impartialityFormData, setImpartialityFormData] = useState({
    declarationType: "",
    title: "",
    description: "",
    riskLevel: "low",
    mitigationActions: "",
    reviewDate: "",
  })

  const [confidentialityFormData, setConfidentialityFormData] = useState({
    agreementType: "",
    title: "",
    signedBy: "",
    department: "",
    description: "",
    expiryDate: "",
  })

  const [reviewFormData, setReviewFormData] = useState({
    reviewDate: "",
    reviewType: "",
    chairperson: "",
    agenda: "",
    decisions: "",
    actionItems: "",
    nextReviewDate: "",
  })

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    try {
      setIsLoading(true)
      // Debug logs removed for production performance
      await Promise.all([
        fetchPositions(),
        fetchImpartialityRecords(),
        fetchConfidentialityAgreements(),
        fetchManagementReviews(),
      ])
    } catch (error) {
      console.error("Veri yükleme hatası:", error)
      toast.error("Veriler yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPositions = async () => {
    try {
      // Lazy load mock data
      const mockData = await getMockData()
      const positions = mockData.organizationStructure?.positions || []
      setPositions(
        positions.map((item: any) => ({
          id: item.id,
          positionTitle: item.title,
          department: item.department,
          reportingTo: "Üst Yönetim",
          responsibilities: item.responsibilities?.join(", ") || "",
          qualifications: item.requirements || "",
          currentHolder: "Boş",
          status: "filled",
          lastUpdated: new Date().toISOString().split('T')[0],
        })),
      )
    } catch (error) {
      console.error("Organization fetch error:", error)
    }
  }

  const fetchImpartialityRecords = async () => {
    try {
      // Lazy load mock data
      const mockData = await getMockData()
      const impartialityRecords = mockData.impartialityRecords || []
      setImpartialityRecords(
        impartialityRecords.map((item: any) => ({
          id: item.id,
          declarationType: item.type,
          title: item.title,
          description: item.description,
          declaredBy: item.reportedBy,
          riskLevel: item.riskLevel,
          status: item.status,
          createdAt: item.reportedDate,
          reviewDate: item.dueDate,
        })),
      )
    } catch (error) {
      console.error("Impartiality fetch error:", error)
    }
  }

  const fetchConfidentialityAgreements = async () => {
    try {
      // Lazy load mock data
      const mockData = await getMockData()
      const confidentialityAgreements = mockData.confidentialityAgreements || []
      setConfidentialityAgreements(
        confidentialityAgreements.map((item: any) => ({
          id: item.id,
          agreementType: "employee_nda",
          title: `${item.employeeName} - Gizlilik Anlaşması`,
          signedBy: item.employeeName,
          signedDate: item.agreementDate || new Date().toISOString().split('T')[0],
          expiryDate: item.expiryDate || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: item.status || "active",
          department: item.department,
          description: item.scope || "Personel gizlilik anlaşması",
        })),
      )
    } catch (error) {
      console.error("Confidentiality fetch error:", error)
    }
  }

  const fetchManagementReviews = async () => {
    try {
      // Lazy load mock data
      const mockData = await getMockData()
      const managementReviews = mockData.managementReviews || []
      setManagementReviews(
        managementReviews.map((item: any) => ({
          id: item.id,
          reviewDate: item.reviewDate,
          reviewType: item.type || "annual",
          chairperson: item.participants?.[0]?.name || "Dr. Mehmet Özkan",
          attendees: item.participants?.map((p: any) => p.name) || [],
          agenda: item.agenda?.map((a: any) => a.topic).join(", ") || "",
          decisions: item.decisions?.map((d: any) => d.decision).join(", ") || "",
          actionItems: item.actionItems?.map((ai: any) => ai.item).join(", ") || "",
          nextReviewDate: item.nextReviewDate,
          status: item.status || "completed",
        })),
      )
    } catch (error) {
      console.error("Management review fetch error:", error)
    }
  }

  const handleOrgSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/iso/organization", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orgFormData),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success("Pozisyon başarıyla oluşturuldu")
          setIsOrgDialogOpen(false)
          setOrgFormData({
            positionTitle: "",
            department: "",
            reportingTo: "",
            responsibilities: "",
            qualifications: "",
            currentHolder: "",
          })
          fetchPositions()
        }
      }
    } catch (error) {
      toast.error("Pozisyon oluşturulurken hata oluştu")
    }
  }

  const handleImpartialitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      toast.success("Tarafsızlık kaydı başarıyla oluşturuldu")
      setIsImpartialityDialogOpen(false)
      setImpartialityFormData({
        declarationType: "",
        title: "",
        description: "",
        riskLevel: "low",
        mitigationActions: "",
        reviewDate: "",
      })
      fetchImpartialityRecords()
    } catch (error) {
      toast.error("Kayıt oluşturulurken hata oluştu")
    }
  }

  const handleConfidentialitySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/iso/confidentiality", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(confidentialityFormData),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success("Gizlilik anlaşması başarıyla oluşturuldu")
          setIsConfidentialityDialogOpen(false)
          setConfidentialityFormData({
            agreementType: "",
            title: "",
            signedBy: "",
            department: "",
            description: "",
            expiryDate: "",
          })
          fetchConfidentialityAgreements()
        }
      }
    } catch (error) {
      toast.error("Anlaşma oluşturulurken hata oluştu")
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch("/api/iso/management-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewFormData),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success("Yönetim gözden geçirmesi başarıyla oluşturuldu")
          setIsReviewDialogOpen(false)
          setReviewFormData({
            reviewDate: "",
            reviewType: "",
            chairperson: "",
            agenda: "",
            decisions: "",
            actionItems: "",
            nextReviewDate: "",
          })
          fetchManagementReviews()
        }
      }
    } catch (error) {
      toast.error("Gözden geçirme oluşturulurken hata oluştu")
    }
  }

  const getStatusBadge = useCallback((status: string, type = "default") => {
    const variants: Record<string, Record<string, string>> = {
      organization: {
        filled: "bg-green-100 text-green-800",
        vacant: "bg-red-100 text-red-800",
        temporary: "bg-yellow-100 text-yellow-800",
      },
      impartiality: {
        active: "bg-blue-100 text-blue-800",
        monitoring: "bg-yellow-100 text-yellow-800",
        resolved: "bg-green-100 text-green-800",
      },
      confidentiality: {
        active: "bg-green-100 text-green-800",
        expired: "bg-red-100 text-red-800",
        pending: "bg-yellow-100 text-yellow-800",
      },
      review: {
        completed: "bg-green-100 text-green-800",
        scheduled: "bg-blue-100 text-blue-800",
        cancelled: "bg-red-100 text-red-800",
      },
    }

    const variant = variants[type]?.[status] || "bg-gray-100 text-gray-800"
    return <Badge className={variant}>{status.toUpperCase()}</Badge>
  }, [])

  const getRiskLevelBadge = useCallback((level: string) => {
    const variants = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800",
      critical: "bg-red-200 text-red-900",
    }
    return <Badge className={variants[level as keyof typeof variants]}>{level.toUpperCase()}</Badge>
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <PageHeader
        title="ISO Yönetim Sistemi"
        description="Organizasyon, tarafsızlık, gizlilik ve yönetim gözden geçirme"
        breadcrumb={[
          { title: "ISO Yönetim Sistemi", href: "/iso" },
          { title: "Yönetim ve Organizasyon", icon: Building }
        ]}
        status={{
          label: "Aktif",
          variant: "default"
        }}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Dışa Aktar
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Yeni Kayıt
            </Button>
          </div>
        }
      />

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizasyon Pozisyonları</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{positions.length}</div>
            <p className="text-xs text-muted-foreground">Tanımlı pozisyon sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tarafsızlık Kayıtları</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{impartialityRecords.length}</div>
            <p className="text-xs text-muted-foreground">Aktif kayıt sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gizlilik Anlaşmaları</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{confidentialityAgreements.length}</div>
            <p className="text-xs text-muted-foreground">Aktif anlaşma sayısı</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yönetim Toplantıları</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{managementReviews.length}</div>
            <p className="text-xs text-muted-foreground">Bu yıl yapılan toplantı</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="organization">Organizasyon Yapısı</TabsTrigger>
          <TabsTrigger value="impartiality">Tarafsızlık Yönetimi</TabsTrigger>
          <TabsTrigger value="confidentiality">Gizlilik Anlaşmaları</TabsTrigger>
          <TabsTrigger value="reviews">Yönetim Gözden Geçirme</TabsTrigger>
        </TabsList>

        <TabsContent value="organization" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Organizasyon Yapısı</h2>
            <Dialog open={isOrgDialogOpen} onOpenChange={setIsOrgDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Pozisyon
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Pozisyon Tanımı</DialogTitle>
                  <DialogDescription>Organizasyon yapısına yeni pozisyon ekleyin</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleOrgSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="positionTitle">Pozisyon Başlığı</Label>
                      <Input
                        id="positionTitle"
                        value={orgFormData.positionTitle}
                        onChange={(e) => setOrgFormData({ ...orgFormData, positionTitle: e.target.value })}
                        placeholder="Pozisyon başlığı"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Departman</Label>
                      <Select
                        value={orgFormData.department}
                        onValueChange={(value) => setOrgFormData({ ...orgFormData, department: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Departman seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laboratory">Laboratuvar</SelectItem>
                          <SelectItem value="quality">Kalite Güvence</SelectItem>
                          <SelectItem value="management">Yönetim</SelectItem>
                          <SelectItem value="technical">Teknik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportingTo">Bağlı Olduğu Pozisyon</Label>
                    <Input
                      id="reportingTo"
                      value={orgFormData.reportingTo}
                      onChange={(e) => setOrgFormData({ ...orgFormData, reportingTo: e.target.value })}
                      placeholder="Raporlama yapacağı pozisyon"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="responsibilities">Sorumluluklar</Label>
                    <Textarea
                      id="responsibilities"
                      value={orgFormData.responsibilities}
                      onChange={(e) => setOrgFormData({ ...orgFormData, responsibilities: e.target.value })}
                      placeholder="Pozisyon sorumlulukları"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="qualifications">Gerekli Nitelikler</Label>
                    <Textarea
                      id="qualifications"
                      value={orgFormData.qualifications}
                      onChange={(e) => setOrgFormData({ ...orgFormData, qualifications: e.target.value })}
                      placeholder="Eğitim, deneyim ve sertifika gereksinimleri"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentHolder">Mevcut Görevli</Label>
                    <Input
                      id="currentHolder"
                      value={orgFormData.currentHolder}
                      onChange={(e) => setOrgFormData({ ...orgFormData, currentHolder: e.target.value })}
                      placeholder="Pozisyonu dolduran kişi"
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOrgDialogOpen(false)}>
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
              <CardTitle>Organizasyon Pozisyonları</CardTitle>
              <CardDescription>Tüm organizasyon pozisyonları ve sorumlulukları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pozisyon</TableHead>
                    <TableHead>Departman</TableHead>
                    <TableHead>Bağlı Olduğu Pozisyon</TableHead>
                    <TableHead>Mevcut Görevli</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {positions.map((position) => (
                    <TableRow key={position.id}>
                      <TableCell className="font-medium">{position.positionTitle}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{position.department}</Badge>
                      </TableCell>
                      <TableCell>{position.reportingTo}</TableCell>
                      <TableCell>{position.currentHolder || "Boş"}</TableCell>
                      <TableCell>{getStatusBadge(position.status, "organization")}</TableCell>
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

        <TabsContent value="impartiality" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tarafsızlık Yönetimi</h2>
            <Dialog open={isImpartialityDialogOpen} onOpenChange={setIsImpartialityDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Kayıt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Tarafsızlık Kaydı</DialogTitle>
                  <DialogDescription>Tarafsızlık ile ilgili yeni bir kayıt oluşturun</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleImpartialitySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="declarationType">Kayıt Türü</Label>
                      <Select
                        value={impartialityFormData.declarationType}
                        onValueChange={(value) =>
                          setImpartialityFormData({ ...impartialityFormData, declarationType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kayıt türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="conflict_of_interest">Çıkar Çatışması</SelectItem>
                          <SelectItem value="impartiality_policy">Tarafsızlık Politikası</SelectItem>
                          <SelectItem value="committee_decision">Komite Kararı</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="riskLevel">Risk Seviyesi</Label>
                      <Select
                        value={impartialityFormData.riskLevel}
                        onValueChange={(value) =>
                          setImpartialityFormData({ ...impartialityFormData, riskLevel: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Düşük</SelectItem>
                          <SelectItem value="medium">Orta</SelectItem>
                          <SelectItem value="high">Yüksek</SelectItem>
                          <SelectItem value="critical">Kritik</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Başlık</Label>
                    <Input
                      id="title"
                      value={impartialityFormData.title}
                      onChange={(e) => setImpartialityFormData({ ...impartialityFormData, title: e.target.value })}
                      placeholder="Kayıt başlığı"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      value={impartialityFormData.description}
                      onChange={(e) =>
                        setImpartialityFormData({ ...impartialityFormData, description: e.target.value })
                      }
                      placeholder="Detaylı açıklama"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reviewDate">Gözden Geçirme Tarihi</Label>
                    <Input
                      id="reviewDate"
                      type="date"
                      value={impartialityFormData.reviewDate}
                      onChange={(e) => setImpartialityFormData({ ...impartialityFormData, reviewDate: e.target.value })}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsImpartialityDialogOpen(false)}>
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
              <CardTitle>Tarafsızlık Kayıtları</CardTitle>
              <CardDescription>Tüm tarafsızlık beyanları ve risk değerlendirmeleri</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Risk Seviyesi</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Beyan Eden</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {impartialityRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.declarationType.replace("_", " ").toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>{getRiskLevelBadge(record.riskLevel)}</TableCell>
                      <TableCell>{getStatusBadge(record.status, "impartiality")}</TableCell>
                      <TableCell>{record.declaredBy}</TableCell>
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

        <TabsContent value="confidentiality" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Gizlilik Anlaşmaları</h2>
            <Dialog open={isConfidentialityDialogOpen} onOpenChange={setIsConfidentialityDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Anlaşma
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Gizlilik Anlaşması</DialogTitle>
                  <DialogDescription>Yeni bir gizlilik anlaşması oluşturun</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleConfidentialitySubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="agreementType">Anlaşma Türü</Label>
                      <Select
                        value={confidentialityFormData.agreementType}
                        onValueChange={(value) =>
                          setConfidentialityFormData({ ...confidentialityFormData, agreementType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Anlaşma türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="employee_nda">Personel Gizlilik Anlaşması</SelectItem>
                          <SelectItem value="client_confidentiality">Müşteri Gizlilik Protokolü</SelectItem>
                          <SelectItem value="supplier_nda">Tedarikçi Gizlilik Anlaşması</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Departman</Label>
                      <Select
                        value={confidentialityFormData.department}
                        onValueChange={(value) =>
                          setConfidentialityFormData({ ...confidentialityFormData, department: value })
                        }
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Anlaşma Başlığı</Label>
                    <Input
                      id="title"
                      value={confidentialityFormData.title}
                      onChange={(e) =>
                        setConfidentialityFormData({ ...confidentialityFormData, title: e.target.value })
                      }
                      placeholder="Anlaşma başlığı"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signedBy">İmzalayan</Label>
                    <Input
                      id="signedBy"
                      value={confidentialityFormData.signedBy}
                      onChange={(e) =>
                        setConfidentialityFormData({ ...confidentialityFormData, signedBy: e.target.value })
                      }
                      placeholder="İmzalayan kişi/kurum"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Açıklama</Label>
                    <Textarea
                      id="description"
                      value={confidentialityFormData.description}
                      onChange={(e) =>
                        setConfidentialityFormData({ ...confidentialityFormData, description: e.target.value })
                      }
                      placeholder="Anlaşma kapsamı ve detayları"
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Bitiş Tarihi</Label>
                    <Input
                      id="expiryDate"
                      type="date"
                      value={confidentialityFormData.expiryDate}
                      onChange={(e) =>
                        setConfidentialityFormData({ ...confidentialityFormData, expiryDate: e.target.value })
                      }
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsConfidentialityDialogOpen(false)}>
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
              <CardTitle>Gizlilik Anlaşmaları Listesi</CardTitle>
              <CardDescription>Tüm gizlilik anlaşmaları ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anlaşma Başlığı</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>İmzalayan</TableHead>
                    <TableHead>Departman</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {confidentialityAgreements.map((agreement) => (
                    <TableRow key={agreement.id}>
                      <TableCell className="font-medium">{agreement.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{agreement.agreementType.replace("_", " ").toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>{agreement.signedBy}</TableCell>
                      <TableCell>{agreement.department}</TableCell>
                      <TableCell>{getStatusBadge(agreement.status, "confidentiality")}</TableCell>
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

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Yönetim Gözden Geçirme</h2>
            <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Yeni Toplantı
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Yeni Yönetim Gözden Geçirme</DialogTitle>
                  <DialogDescription>Yeni bir yönetim gözden geçirme toplantısı planlayın</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="reviewDate">Toplantı Tarihi</Label>
                      <Input
                        id="reviewDate"
                        type="date"
                        value={reviewFormData.reviewDate}
                        onChange={(e) => setReviewFormData({ ...reviewFormData, reviewDate: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reviewType">Toplantı Türü</Label>
                      <Select
                        value={reviewFormData.reviewType}
                        onValueChange={(value) => setReviewFormData({ ...reviewFormData, reviewType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Toplantı türü seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quarterly">Üç Aylık</SelectItem>
                          <SelectItem value="annual">Yıllık</SelectItem>
                          <SelectItem value="extraordinary">Olağanüstü</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chairperson">Toplantı Başkanı</Label>
                    <Input
                      id="chairperson"
                      value={reviewFormData.chairperson}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, chairperson: e.target.value })}
                      placeholder="Toplantı başkanı"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agenda">Gündem</Label>
                    <Textarea
                      id="agenda"
                      value={reviewFormData.agenda}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, agenda: e.target.value })}
                      placeholder="Toplantı gündemi"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nextReviewDate">Sonraki Toplantı Tarihi</Label>
                    <Input
                      id="nextReviewDate"
                      type="date"
                      value={reviewFormData.nextReviewDate}
                      onChange={(e) => setReviewFormData({ ...reviewFormData, nextReviewDate: e.target.value })}
                    />
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
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
              <CardTitle>Yönetim Gözden Geçirme Toplantıları</CardTitle>
              <CardDescription>Tüm yönetim gözden geçirme toplantıları ve kararları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Toplantı Tarihi</TableHead>
                    <TableHead>Tür</TableHead>
                    <TableHead>Başkan</TableHead>
                    <TableHead>Sonraki Toplantı</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {managementReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell className="font-medium">
                        {new Date(review.reviewDate).toLocaleDateString("tr-TR")}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{review.reviewType.toUpperCase()}</Badge>
                      </TableCell>
                      <TableCell>{review.chairperson}</TableCell>
                      <TableCell>{new Date(review.nextReviewDate).toLocaleDateString("tr-TR")}</TableCell>
                      <TableCell>{getStatusBadge(review.status, "review")}</TableCell>
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
