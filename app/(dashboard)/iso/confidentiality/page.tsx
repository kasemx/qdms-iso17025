"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Search,
  Filter,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Download,
  Eye,
  Edit,
  MoreHorizontal,
  Shield,
  Users,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Lock,
  UserCheck,
  UserX,
  FileSignature,
  AlertCircle,
} from "lucide-react"
import { mockApi } from "@/lib/mock-data"

interface ConfidentialityAgreement {
  id: string
  personId: string
  personName: string
  department: string
  position: string
  agreementType: string
  signedDate: string
  expiryDate: string
  status: string
  confidentialityLevel: string
  accessLevel: string
  dataTypes: string[]
  restrictions: string[]
  obligations: string[]
  penalties: string
  reviewer: string
  notes: string
  renewalRequired: boolean
  lastReviewDate: string
  nextReviewDate: string
  trainingCompleted: boolean
  trainingDate?: string
  acknowledgmentDate: string
}

export default function ConfidentialityPage() {
  const [agreements, setAgreements] = useState<ConfidentialityAgreement[]>([])
  const [filteredAgreements, setFilteredAgreements] = useState<ConfidentialityAgreement[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedConfidentialityLevel, setSelectedConfidentialityLevel] = useState("all")
  const [sortBy, setSortBy] = useState("signedDate")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedAgreement, setSelectedAgreement] = useState<ConfidentialityAgreement | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Durum filtreleri
  const statusFilters = [
    { id: "all", name: "Tümü", count: 28 },
    { id: "active", name: "Aktif", count: 22, color: "#10B981" },
    { id: "expired", name: "Süresi Dolmuş", count: 3, color: "#EF4444" },
    { id: "expiring_soon", name: "Süresi Dolmak Üzere", count: 3, color: "#F59E0B" }
  ]

  // Gizlilik seviyesi filtreleri
  const confidentialityLevelFilters = [
    { id: "all", name: "Tümü", count: 28 },
    { id: "public", name: "Genel", count: 8, color: "#10B981" },
    { id: "internal", name: "İç Kullanım", count: 12, color: "#3B82F6" },
    { id: "confidential", name: "Gizli", count: 6, color: "#F59E0B" },
    { id: "restricted", name: "Kısıtlı", count: 2, color: "#EF4444" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterAgreements()
  }, [agreements, searchTerm, selectedStatus, selectedConfidentialityLevel, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await mockApi.getConfidentialityAgreements()
      setAgreements(data)
    } catch (error) {
      console.error("Error fetching confidentiality agreements:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAgreements = () => {
    let filtered = [...agreements]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(agreement =>
        agreement.personName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agreement.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agreement.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agreement.agreementType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Durum filtresi
    if (selectedStatus !== "all") {
      filtered = filtered.filter(agreement => agreement.status === selectedStatus)
    }

    // Gizlilik seviyesi filtresi
    if (selectedConfidentialityLevel !== "all") {
      filtered = filtered.filter(agreement => agreement.confidentialityLevel === selectedConfidentialityLevel)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "personName":
          aValue = a.personName
          bValue = b.personName
          break
        case "signedDate":
          aValue = new Date(a.signedDate)
          bValue = new Date(b.signedDate)
          break
        case "expiryDate":
          aValue = new Date(a.expiryDate)
          bValue = new Date(b.expiryDate)
          break
        case "confidentialityLevel":
          const levelOrder = { restricted: 4, confidential: 3, internal: 2, public: 1 }
          aValue = levelOrder[a.confidentialityLevel as keyof typeof levelOrder] || 0
          bValue = levelOrder[b.confidentialityLevel as keyof typeof levelOrder] || 0
          break
        case "department":
          aValue = a.department
          bValue = b.department
          break
        default:
          aValue = a.signedDate
          bValue = b.signedDate
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredAgreements(filtered)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "expired":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "expiring_soon":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "expiring_soon":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "expired":
        return "Süresi Dolmuş"
      case "expiring_soon":
        return "Süresi Dolmak Üzere"
      default:
        return status
    }
  }

  const getConfidentialityLevelColor = (level: string) => {
    switch (level) {
      case "restricted":
        return "bg-red-100 text-red-800"
      case "confidential":
        return "bg-yellow-100 text-yellow-800"
      case "internal":
        return "bg-blue-100 text-blue-800"
      case "public":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getConfidentialityLevelText = (level: string) => {
    switch (level) {
      case "restricted":
        return "Kısıtlı"
      case "confidential":
        return "Gizli"
      case "internal":
        return "İç Kullanım"
      case "public":
        return "Genel"
      default:
        return level
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const getDaysUntilExpiry = (dateString: string) => {
    const today = new Date()
    const expiryDate = new Date(dateString)
    const diffTime = expiryDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getValidityProgress = (signedDate: string, expiryDate: string) => {
    const today = new Date()
    const signed = new Date(signedDate)
    const expiry = new Date(expiryDate)
    const totalDays = (expiry.getTime() - signed.getTime()) / (1000 * 60 * 60 * 24)
    const passedDays = (today.getTime() - signed.getTime()) / (1000 * 60 * 60 * 24)
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100))
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gizlilik Anlaşmaları</h1>
            <p className="text-muted-foreground">Personel gizlilik sözleşmeleri ve veri koruma yönetimi</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gizlilik Anlaşmaları</h1>
          <p className="text-muted-foreground">Personel gizlilik sözleşmeleri ve veri koruma yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Anlaşma
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Anlaşma</CardTitle>
            <FileSignature className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agreements.length}</div>
            <p className="text-xs text-muted-foreground">
              {agreements.filter(a => a.status === "active").length} aktif
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Süresi Dolmuş</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {agreements.filter(a => a.status === "expired").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Acil yenileme gerekli
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Süresi Dolmak Üzere</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {agreements.filter(a => a.status === "expiring_soon").length}
            </div>
            <p className="text-xs text-muted-foreground">
              30 gün içinde yenileme
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eğitim Tamamlayan</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {agreements.filter(a => a.trainingCompleted).length}
            </div>
            <p className="text-xs text-muted-foreground">
              Gizlilik eğitimi almış
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Gizlilik Filtreleme</CardTitle>
          <CardDescription>Gizlilik anlaşmalarını durum, gizlilik seviyesi ve personel bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Personel, departman ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Durum</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Durum seçin" />
                </SelectTrigger>
                <SelectContent>
                  {statusFilters.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: status.color }}
                        />
                        {status.name} ({status.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Gizlilik Seviyesi</label>
              <Select value={selectedConfidentialityLevel} onValueChange={setSelectedConfidentialityLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Gizlilik seviyesi seçin" />
                </SelectTrigger>
                <SelectContent>
                  {confidentialityLevelFilters.map((level) => (
                    <SelectItem key={level.id} value={level.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: level.color }}
                        />
                        {level.name} ({level.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Görünüm</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gizlilik Anlaşmaları Listesi */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Gizlilik Anlaşmaları ({filteredAgreements.length})</CardTitle>
              <CardDescription>
                {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
                {selectedConfidentialityLevel !== "all" && ` | Gizlilik: ${confidentialityLevelFilters.find(l => l.id === selectedConfidentialityLevel)?.name}`}
                {searchTerm && ` | Arama: "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personName">Personel</SelectItem>
                  <SelectItem value="signedDate">İmza Tarihi</SelectItem>
                  <SelectItem value="expiryDate">Son Geçerlilik</SelectItem>
                  <SelectItem value="confidentialityLevel">Gizlilik Seviyesi</SelectItem>
                  <SelectItem value="department">Departman</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personel</TableHead>
                  <TableHead>Anlaşma Türü</TableHead>
                  <TableHead>Gizlilik Seviyesi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İmza Tarihi</TableHead>
                  <TableHead>Son Geçerlilik</TableHead>
                  <TableHead>Eğitim</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgreements.map((agreement) => {
                  const daysUntil = getDaysUntilExpiry(agreement.expiryDate)
                  const progress = getValidityProgress(agreement.signedDate, agreement.expiryDate)
                  
                  return (
                    <TableRow key={agreement.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{agreement.personName}</div>
                          <div className="text-sm text-muted-foreground">{agreement.position}</div>
                          <div className="text-xs text-muted-foreground">{agreement.department}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{agreement.agreementType}</div>
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getConfidentialityLevelColor(agreement.confidentialityLevel)}`}>
                          {getConfidentialityLevelText(agreement.confidentialityLevel)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(agreement.status)}
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agreement.status)}`}>
                            {getStatusText(agreement.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{formatDate(agreement.signedDate)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{formatDate(agreement.expiryDate)}</div>
                          <div className="text-xs text-muted-foreground">
                            {daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}
                          </div>
                          <Progress value={progress} className="h-2" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {agreement.trainingCompleted ? (
                            <UserCheck className="h-4 w-4 text-green-500" />
                          ) : (
                            <UserX className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-sm">
                            {agreement.trainingCompleted ? "Tamamlandı" : "Bekliyor"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedAgreement(agreement)
                              setIsDetailDialogOpen(true)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredAgreements.map((agreement) => {
                const daysUntil = getDaysUntilExpiry(agreement.expiryDate)
                const progress = getValidityProgress(agreement.signedDate, agreement.expiryDate)
                
                return (
                  <Card key={agreement.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{agreement.personName}</CardTitle>
                          <CardDescription>{agreement.position} - {agreement.department}</CardDescription>
                        </div>
                        <div className="flex gap-1">
                          <span className={`px-2 py-1 rounded-full text-xs ${getConfidentialityLevelColor(agreement.confidentialityLevel)}`}>
                            {getConfidentialityLevelText(agreement.confidentialityLevel)}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(agreement.status)}`}>
                            {getStatusText(agreement.status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Anlaşma Türü:</span>
                          <span>{agreement.agreementType}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">İmza Tarihi:</span>
                          <span>{formatDate(agreement.signedDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Son Geçerlilik:</span>
                          <span>{formatDate(agreement.expiryDate)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Eğitim:</span>
                          <span className="flex items-center gap-1">
                            {agreement.trainingCompleted ? (
                              <UserCheck className="h-3 w-3 text-green-500" />
                            ) : (
                              <UserX className="h-3 w-3 text-red-500" />
                            )}
                            {agreement.trainingCompleted ? "Tamamlandı" : "Bekliyor"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Geçerlilik İlerlemesi</span>
                          <span>{daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            setSelectedAgreement(agreement)
                            setIsDetailDialogOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Görüntüle
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Gizlilik Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAgreement && getStatusIcon(selectedAgreement.status)}
              {selectedAgreement?.personName}
            </DialogTitle>
            <DialogDescription>
              {selectedAgreement?.position} - {selectedAgreement?.department}
            </DialogDescription>
          </DialogHeader>
          {selectedAgreement && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Personel Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Ad Soyad:</strong> {selectedAgreement.personName}</div>
                    <div><strong>Pozisyon:</strong> {selectedAgreement.position}</div>
                    <div><strong>Departman:</strong> {selectedAgreement.department}</div>
                    <div><strong>İmza Tarihi:</strong> {formatDate(selectedAgreement.signedDate)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Anlaşma Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Anlaşma Türü:</strong> {selectedAgreement.agreementType}</div>
                    <div><strong>Gizlilik Seviyesi:</strong> {getConfidentialityLevelText(selectedAgreement.confidentialityLevel)}</div>
                    <div><strong>Erişim Seviyesi:</strong> {selectedAgreement.accessLevel}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedAgreement.status)}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Veri Türleri</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgreement.dataTypes.map((type, index) => (
                      <Badge key={index} variant="outline">{type}</Badge>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kısıtlamalar</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgreement.restrictions.map((restriction, index) => (
                      <Badge key={index} variant="destructive">{restriction}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Yükümlülükler</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {selectedAgreement.obligations.map((obligation, index) => (
                    <li key={index}>{obligation}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Cezai Yaptırımlar</h4>
                <p className="text-sm text-muted-foreground">{selectedAgreement.penalties}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Eğitim Durumu</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      {selectedAgreement.trainingCompleted ? (
                        <UserCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <UserX className="h-4 w-4 text-red-500" />
                      )}
                      <span>{selectedAgreement.trainingCompleted ? "Eğitim Tamamlandı" : "Eğitim Bekliyor"}</span>
                    </div>
                    {selectedAgreement.trainingDate && (
                      <div><strong>Eğitim Tarihi:</strong> {formatDate(selectedAgreement.trainingDate)}</div>
                    )}
                    <div><strong>Son İnceleme:</strong> {formatDate(selectedAgreement.lastReviewDate)}</div>
                    <div><strong>Sonraki İnceleme:</strong> {formatDate(selectedAgreement.nextReviewDate)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Yenileme Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Yenileme Gerekli:</strong> {selectedAgreement.renewalRequired ? "Evet" : "Hayır"}</div>
                    <div><strong>İnceleyici:</strong> {selectedAgreement.reviewer}</div>
                    <div><strong>Kabul Tarihi:</strong> {formatDate(selectedAgreement.acknowledgmentDate)}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Notlar</h4>
                <p className="text-sm text-muted-foreground">{selectedAgreement.notes}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
              Kapat
            </Button>
            <Button>
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
