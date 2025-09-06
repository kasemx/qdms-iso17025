"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import {
  FileText,
  Download,
  Share,
  Edit,
  CheckCircle,
  XCircle,
  User,
  Clock,
  MessageSquare,
  Eye,
  GitCompare,
  AlertCircle,
  ArrowLeft,
  BookOpen,
  Paperclip,
} from "lucide-react"

// Mock data - gerçek uygulamada API'den gelecek
const documentData = {
  id: "1",
  documentCode: "PR-KG-001",
  title: "Doküman Kontrol Prosedürü",
  description:
    "Şirket içi dokümanların oluşturulması, onaylanması ve kontrolü için prosedür. Bu prosedür, kalite yönetim sistemi kapsamındaki tüm dokümanların yaşam döngüsünü kapsar.",
  category: { name: "Prosedür", code: "PR" },
  department: { name: "Kalite Güvence", id: "1" },
  owner: { name: "Sistem Yöneticisi", email: "admin@company.com" },
  currentVersion: 2,
  status: "published",
  effectiveDate: "2024-01-15",
  reviewDate: "2024-01-15",
  nextReviewDate: "2025-01-15",
  retentionPeriod: 60,
  isControlled: true,
  isConfidential: false,
  fileType: "system", // Changed from PDF to system content
  fileSize: 245760,
  filePath: "/documents/PR-KG-001-v2.pdf",
  language: "tr",
  createdAt: "2024-01-10",
  updatedAt: "2024-01-15",
  purpose:
    "Bu prosedür, organizasyondaki tüm dokümanların kontrollü bir şekilde oluşturulması, gözden geçirilmesi, onaylanması, dağıtılması ve güncellenmesi için gerekli süreçleri tanımlar.",
  scope:
    "Bu prosedür, kalite yönetim sistemi kapsamındaki tüm dokümanlar için geçerlidir. Buna prosedürler, talimatlar, formlar, kayıtlar ve dış kaynaklı dokümanlar dahildir.",
  procedure: `1. DOKÜMAN OLUŞTURMA
   1.1. Doküman ihtiyacı belirlenir
   1.2. Doküman hazırlayıcısı atanır
   1.3. Doküman taslağı hazırlanır
   1.4. Doküman kodu atanır

2. DOKÜMAN İNCELEME
   2.1. Teknik inceleme yapılır
   2.2. Dil ve format kontrolü yapılır
   2.3. Gerekli düzeltmeler yapılır

3. DOKÜMAN ONAY
   3.1. Yetkili kişi tarafından onaylanır
   3.2. Yürürlük tarihi belirlenir
   3.3. Dağıtım listesi oluşturulur

4. DOKÜMAN DAĞITIM
   4.1. Kontrollü kopyalar dağıtılır
   4.2. Eski versiyonlar toplanır
   4.3. Dağıtım kayıtları tutulur`,
  references: ["ISO 9001:2015 - Kalite Yönetim Sistemleri", "ISO 17025:2017 - Test ve Kalibrasyon Laboratuvarları"],
  keywords: ["doküman kontrol", "prosedür", "kalite", "onay", "versiyon"],
  preparedBy: "Ahmet Yılmaz",
  reviewedBy: "Fatma Demir",
  approvedBy: "Mehmet Kaya",
  standardClauses: ["4.3 - Doküman Kontrolü", "4.13 - Kayıtların Kontrolü"],
  measurementUncertainty: "Uygulanamaz",
  validationMethod: "Doküman içeriğinin teknik inceleme ile doğrulanması",
  competencyRequirements: "Doküman hazırlayıcıları ilgili konuda yetkin olmalıdır",
  isoMappings: [
    { clause: "4.2.3", title: "Dokümante Edilmiş Prosedürlerin Kontrolü", standard: "ISO 9001:2015" },
    { clause: "7.5.2", title: "Kayıtların Kontrolü", standard: "ISO 9001:2015" },
  ],
}

const versions = [
  {
    version: 2,
    createdBy: "Sistem Yöneticisi",
    createdAt: "2024-01-15",
    changesSummary: "Revizyon süreçleri güncellendi, yeni onay akışı eklendi",
    status: "published",
  },
  {
    version: 1,
    createdBy: "Sistem Yöneticisi",
    createdAt: "2024-01-10",
    changesSummary: "İlk versiyon oluşturuldu",
    status: "archived",
  },
]

const accessLogs = [
  {
    id: "1",
    user: "Ahmet Yılmaz",
    action: "view",
    timestamp: "2024-01-22 14:30:00",
    ipAddress: "192.168.1.100",
  },
  {
    id: "2",
    user: "Fatma Demir",
    action: "download",
    timestamp: "2024-01-22 10:15:00",
    ipAddress: "192.168.1.101",
  },
  {
    id: "3",
    user: "Mehmet Kaya",
    action: "view",
    timestamp: "2024-01-21 16:45:00",
    ipAddress: "192.168.1.102",
  },
]

const relatedDocuments = [
  {
    id: "2",
    documentCode: "TL-KG-001",
    title: "Doküman Hazırlama Talimatı",
    relationship: "references",
  },
  {
    id: "3",
    documentCode: "FR-KG-001",
    title: "Doküman Onay Formu",
    relationship: "related_to",
  },
]

const statusColors = {
  draft: "bg-gray-100 text-gray-800 border-gray-300",
  review: "bg-blue-100 text-blue-800 border-blue-300",
  approved: "bg-green-100 text-green-800 border-green-300",
  published: "bg-green-100 text-green-800 border-green-300",
  archived: "bg-yellow-100 text-yellow-800 border-yellow-300",
  obsolete: "bg-red-100 text-red-800 border-red-300",
}

const statusLabels = {
  draft: "Taslak",
  review: "İncelemede",
  approved: "Onaylandı",
  published: "Yayınlandı",
  archived: "Arşivlendi",
  obsolete: "Geçersiz",
}

const actionLabels = {
  view: "Görüntüleme",
  download: "İndirme",
  edit: "Düzenleme",
  approve: "Onaylama",
  reject: "Reddetme",
}

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("content")
  const [showVersionComparison, setShowVersionComparison] = useState(false)
  const [selectedVersions, setSelectedVersions] = useState<string[]>([])
  const [showISOAssessment, setShowISOAssessment] = useState(false)
  const [showRelatedDocs, setShowRelatedDocs] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject" | null>(null)
  const [document, setDocument] = useState({
    ...documentData,
    references: documentData.references || [],
    keywords: documentData.keywords || [],
    distributionList: documentData.distributionList || [],
    trainingRequirements: documentData.trainingRequirements || [],
    isoMappings: documentData.isoMappings || [],
    attachments: documentData.attachments || [],
    versions: documentData.versions || [],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDocument = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/documents/${params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setDocument(data)
        }
      } catch (error) {
        console.error("Doküman yükleme hatası:", error)
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      fetchDocument()
    }
  }, [params.id])

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("tr-TR")
  }

  const handlePDFDownload = async () => {
    try {
      const response = await fetch(`/api/documents/${params.id}/download-pdf`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${document.documentCode}-v${document.currentVersion}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("PDF indirme hatası:", error)
    }
  }

  const handleApproval = async (action: "approve" | "reject", comment?: string) => {
    try {
      const response = await fetch(`/api/documents/${params.id}/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          action,
          comment,
        }),
      })

      if (response.ok) {
        // Refresh page or update state
        window.location.reload()
      }
    } catch (error) {
      console.error("Onay işlemi hatası:", error)
    }
  }

  const handleVersionCompare = (version1: number, version2: number) => {
    toast({
      title: "Versiyon Karşılaştırması",
      description: `Versiyon ${version1} ile ${version2} karşılaştırılıyor...`,
    })
    // Gerçek karşılaştırma mantığı burada olacak
  }

  const handleVersionView = (version: number) => {
    toast({
      title: "Versiyon Görüntüleme",
      description: `Versiyon ${version} görüntüleniyor...`,
    })
    // Gerçek versiyon görüntüleme mantığı burada olacak
  }

  const handleComplianceAssessment = () => {
    toast({
      title: "Uyumluluk Değerlendirmesi",
      description: "ISO 17025 uyumluluk değerlendirmesi başlatılıyor...",
    })
  }

  const handleComplianceReport = () => {
    toast({
      title: "Uyumluluk Raporu",
      description: "Uyumluluk raporu oluşturuluyor...",
    })
  }

  const handleGapAnalysis = () => {
    toast({
      title: "Gap Analizi",
      description: "Gap analizi başlatılıyor...",
    })
  }

  const handleAddRelation = () => {
    toast({
      title: "Yeni İlişki",
      description: "Yeni doküman ilişkisi ekleme formu açılıyor...",
    })
  }

  const handleRelationMap = () => {
    toast({
      title: "İlişki Haritası",
      description: "Doküman ilişki haritası görüntüleniyor...",
    })
  }

  const handleAddComment = () => {
    toast({
      title: "Yorum Ekle",
      description: "Yorum ekleme formu açılıyor...",
    })
  }

  const handleScheduleRevision = () => {
    toast({
      title: "Revizyon Planla",
      description: "Revizyon planlama formu açılıyor...",
    })
  }

  const handleAssignTraining = () => {
    toast({
      title: "Eğitim Ata",
      description: "Eğitim atama formu açılıyor...",
    })
  }

  const handleShare = () => {
    toast({
      title: "Paylaşım",
      description: "Doküman paylaşım seçenekleri açılıyor...",
    })
  }

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild className="shrink-0">
            <Link href="/documents">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Geri
            </Link>
          </Button>
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground truncate">{document.title}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge variant="outline">{document.documentCode}</Badge>
              <Badge
                variant={
                  document.status === "published" ? "default" : document.status === "review" ? "secondary" : "outline"
                }
              >
                {document.status === "published"
                  ? "Yayınlandı"
                  : document.status === "review"
                    ? "İncelemede"
                    : "Taslak"}
              </Badge>
              <span className="text-sm text-muted-foreground">v{document.currentVersion}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" onClick={handlePDFDownload} size="sm">
            <Download className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">PDF İndir</span>
          </Button>
          <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={handleShare} size="sm">
                <Share className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Paylaş</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Doküman Paylaş</DialogTitle>
                <DialogDescription>Bu dokümanı diğer kullanıcılarla paylaşın.</DialogDescription>
              </DialogHeader>
              <div className="p-4 text-center text-muted-foreground">Paylaşım özellikleri yakında eklenecek...</div>
            </DialogContent>
          </Dialog>
          {document.status === "review" && (
            <>
              <Button
                className="bg-green-600 hover:bg-green-700"
                size="sm"
                onClick={() => {
                  setApprovalAction("approve")
                  setIsApprovalDialogOpen(true)
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Onayla</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                onClick={() => {
                  setApprovalAction("reject")
                  setIsApprovalDialogOpen(true)
                }}
              >
                <XCircle className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Reddet</span>
              </Button>
            </>
          )}
          {(document.status === "draft" || document.status === "review") && (
            <Button asChild size="sm">
              <Link href={`/documents/${document.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Düzenle</span>
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          {/* Document Viewer */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Doküman İçeriği</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="content" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1">
                  <TabsTrigger value="content" className="text-xs sm:text-sm">
                    İçerik
                  </TabsTrigger>
                  <TabsTrigger value="approval" className="text-xs sm:text-sm">
                    Onay
                  </TabsTrigger>
                  <TabsTrigger value="distribution" className="text-xs sm:text-sm">
                    Dağıtım
                  </TabsTrigger>
                  <TabsTrigger value="iso17025" className="text-xs sm:text-sm">
                    ISO
                  </TabsTrigger>
                  <TabsTrigger value="attachments" className="text-xs sm:text-sm">
                    Ekler
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="content" className="space-y-6 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Amaç</h3>
                      <p className="text-muted-foreground leading-relaxed">{document.purpose}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Kapsam</h3>
                      <p className="text-muted-foreground leading-relaxed">{document.scope}</p>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Prosedür</h3>
                      <div className="bg-muted/50 p-4 rounded-lg overflow-x-auto">
                        <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-mono leading-relaxed">
                          {document.procedure}
                        </pre>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Referanslar</h3>
                      <ul className="space-y-2">
                        {(document.references || []).map((reference, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground break-words">{reference}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-2">Anahtar Kelimeler</h3>
                      <div className="flex flex-wrap gap-2">
                        {(document.keywords || []).map((keyword, index) => (
                          <Badge key={index} variant="secondary">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="approval" className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Hazırlayan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{document.preparedBy}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(document.preparedDate)}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">İnceleyen</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{document.reviewedBy}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(document.reviewDate)}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm">Onaylayan</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">{document.approvedBy}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{formatDate(document.approvalDate)}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="distribution" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Dağıtım Listesi</h3>
                      <div className="space-y-2">
                        {(document.distributionList || []).map((user, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center space-x-3">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <div>
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.department}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {user.role}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Eğitim Gereksinimleri</h3>
                      <div className="space-y-2">
                        {(document.trainingRequirements || []).map((requirement, index) => (
                          <div key={index} className="flex items-start space-x-3 p-3 rounded-lg border bg-card">
                            <BookOpen className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{requirement.title}</p>
                              <p className="text-xs text-muted-foreground mt-1">{requirement.description}</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {requirement.duration}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {requirement.frequency}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="iso17025" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">ISO 17025 Standart Maddeleri</h3>
                      <div className="space-y-3">
                        {(document.isoMappings || []).map((mapping, index) => (
                          <div key={index} className="p-4 rounded-lg border bg-card">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Badge variant="outline" className="text-xs font-mono">
                                    {mapping.clause}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {mapping.standard}
                                  </Badge>
                                </div>
                                <h4 className="font-medium text-sm mb-1">{mapping.title}</h4>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-medium mb-2">ISO Uyumluluk Aksiyonları</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        ISO 17025 uyumluluğunu değerlendirmek ve raporlamak için araçlar
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" onClick={handleComplianceAssessment}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Uyumluluk Değerlendirmesi</span>
                          <span className="sm:hidden">Değerlendirme</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleComplianceReport}>
                          <FileText className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Uyumluluk Raporu</span>
                          <span className="sm:hidden">Rapor</span>
                        </Button>
                        <Button variant="outline" size="sm" onClick={handleGapAnalysis}>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          <span className="hidden sm:inline">Gap Analizi</span>
                          <span className="sm:hidden">Gap</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Ek Dosyalar</h3>
                      <div className="space-y-2">
                        {(document.attachments || []).map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                            <div className="flex items-center space-x-3 min-w-0 flex-1">
                              <Paperclip className="h-4 w-4 text-muted-foreground shrink-0" />
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium truncate">{attachment.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatFileSize(attachment.size)} • {formatDate(attachment.uploadedAt)}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="shrink-0">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Versions */}
          <Card>
            <CardHeader>
              <CardTitle>Versiyon Geçmişi</CardTitle>
              <CardDescription>Bu dokümanın tüm versiyonları ve değişiklik geçmişi</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(document.versions || []).map((version, index) => (
                  <div key={version.id} className="border rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant={version.version === document.currentVersion ? "default" : "outline"}>
                            v{version.version}
                          </Badge>
                          {version.version === document.currentVersion && (
                            <Badge variant="secondary" className="text-xs">
                              Güncel
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{formatDate(version.createdAt)}</span>
                          {version.version > 1 && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleVersionCompare(version.version - 1, version.version)}
                            >
                              <GitCompare className="h-4 w-4 mr-1" />
                              <span className="hidden sm:inline">Karşılaştır</span>
                            </Button>
                          )}
                          <Button variant="outline" size="sm" onClick={() => handleVersionView(version.version)}>
                            <Eye className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Görüntüle</span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{version.changesSummary}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{version.createdBy}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {version.version === 1 ? "İlk Versiyon" : "Revizyon"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Versiyon Karşılaştırma</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  İki farklı versiyon arasındaki sistem içeriği değişikliklerini detaylı olarak görüntüleyin
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleVersionCompare(document.currentVersion - 1, document.currentVersion)}
                  >
                    <GitCompare className="h-4 w-4 mr-2" />
                    İçerik Karşılaştırma
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Değişiklik Raporu",
                        description: "Değişiklik raporu oluşturuluyor...",
                      })
                    }}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Değişiklik Raporu
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Documents */}
          <Card>
            <CardHeader>
              <CardTitle>İlişkili Dokümanlar</CardTitle>
              <CardDescription>Bu dokümanla ilişkili diğer sistem dokümanları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Button variant="outline" size="sm" className="bg-blue-50 text-blue-700 border-blue-300">
                  Tümü ({relatedDocuments.length})
                </Button>
                <Button variant="ghost" size="sm">
                  Referanslar ({relatedDocuments.filter((d) => d.relationship === "references").length})
                </Button>
                <Button variant="ghost" size="sm">
                  İlişkili ({relatedDocuments.filter((d) => d.relationship === "related_to").length})
                </Button>
              </div>

              <div className="space-y-3">
                {(relatedDocuments || []).map((doc) => (
                  <div
                    key={doc.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border bg-card"
                  >
                    <div className="flex items-start space-x-3 min-w-0 flex-1">
                      <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-sm">{doc.documentCode}</p>
                          <Badge variant="outline" className="text-xs">
                            {doc.relationship === "references" ? "Referans Alınan" : "İlişkili Doküman"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground break-words">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {doc.relationship === "references"
                            ? "Bu doküman tarafından referans alınmaktadır"
                            : "Bu dokümanla ilişkili süreçleri içermektedir"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 shrink-0">
                      <Button variant="ghost" size="sm">
                        <GitCompare className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/documents/${doc.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-medium mb-2">Doküman İlişkileri Yönetimi</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Bu dokümanla ilişkili diğer dokümanları yönetin ve yeni ilişkiler ekleyin
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={handleAddRelation}>
                    <FileText className="h-4 w-4 mr-2" />
                    Yeni İlişki Ekle
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRelationMap}>
                    <GitCompare className="h-4 w-4 mr-2" />
                    İlişki Haritası
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Document Info */}
          <Card>
            <CardHeader>
              <CardTitle>Doküman Bilgileri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Doküman Kodu</span>
                  <span className="text-sm font-medium">{document.documentCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Versiyon</span>
                  <span className="text-sm font-medium">v{document.currentVersion}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Durum</span>
                  <Badge
                    variant={
                      document.status === "published"
                        ? "default"
                        : document.status === "review"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {document.status === "published"
                      ? "Yayınlandı"
                      : document.status === "review"
                        ? "İncelemede"
                        : "Taslak"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Kategori</span>
                  <span className="text-sm font-medium">{document.category.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Yürürlük Tarihi</span>
                  <span className="text-sm font-medium">{formatDate(document.effectiveDate)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Gözden Geçirme</span>
                  <span className="text-sm font-medium">{formatDate(document.nextReviewDate)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={handleAddComment}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Yorum Ekle
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={handleScheduleRevision}
              >
                <Clock className="mr-2 h-4 w-4" />
                Revizyon Planla
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent"
                onClick={handleAssignTraining}
              >
                <Share className="mr-2 h-4 w-4" />
                Eğitim Ata
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{approvalAction === "approve" ? "Dokümanı Onayla" : "Dokümanı Reddet"}</DialogTitle>
            <DialogDescription>
              {document.title} dokümanını {approvalAction === "approve" ? "onaylamak" : "reddetmek"} istediğinizden emin
              misiniz?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="approval-comment">
                {approvalAction === "approve" ? "Onay Notu (İsteğe bağlı)" : "Red Sebebi *"}
              </Label>
              <Textarea
                id="approval-comment"
                placeholder={
                  approvalAction === "approve"
                    ? "Onay ile ilgili notlarınızı yazın..."
                    : "Dokümanı neden reddettiğinizi açıklayın..."
                }
                className="mt-1"
                required={approvalAction === "reject"}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              İptal
            </Button>
            <Button
              className={approvalAction === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
              variant={approvalAction === "reject" ? "destructive" : "default"}
              onClick={() => {
                const comment = (document.getElementById("approval-comment") as HTMLTextAreaElement)?.value
                handleApproval(approvalAction!, comment)
                setIsApprovalDialogOpen(false)
              }}
            >
              {approvalAction === "approve" ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Onayla
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reddet
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
