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
  Building,
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
  User,
  UserPlus,
  UserMinus,
  Building2,
  Network,
  TreePine,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { mockApi, OrganizationUnit, Employee } from "@/lib/mock-data"

export default function OrganizationPage() {
  const [units, setUnits] = useState<OrganizationUnit[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [filteredUnits, setFilteredUnits] = useState<OrganizationUnit[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"hierarchy" | "grid" | "list">("hierarchy")
  const [selectedUnit, setSelectedUnit] = useState<OrganizationUnit | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)

  // Tip filtreleri
  const typeFilters = [
    { id: "all", name: "Tümü", count: 12 },
    { id: "department", name: "Departman", count: 6, color: "#3B82F6" },
    { id: "division", name: "Bölüm", count: 4, color: "#8B5CF6" },
    { id: "team", name: "Takım", count: 2, color: "#10B981" }
  ]

  // Seviye filtreleri
  const levelFilters = [
    { id: "all", name: "Tümü", count: 12 },
    { id: "1", name: "Seviye 1", count: 1, color: "#EF4444" },
    { id: "2", name: "Seviye 2", count: 3, color: "#F59E0B" },
    { id: "3", name: "Seviye 3", count: 5, color: "#3B82F6" },
    { id: "4", name: "Seviye 4", count: 3, color: "#10B981" }
  ]

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    filterUnits()
  }, [units, searchTerm, selectedType, selectedLevel, sortBy, sortOrder])

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const [unitsData, employeesData] = await Promise.all([
        mockApi.getOrganizationUnits(),
        mockApi.getEmployees()
      ])
      setUnits(unitsData)
      setEmployees(employeesData)
    } catch (error) {
      console.error("Error fetching organization data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterUnits = () => {
    let filtered = [...units]

    // Arama filtresi
    if (searchTerm) {
      filtered = filtered.filter(unit =>
        unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.managerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unit.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Tip filtresi
    if (selectedType !== "all") {
      filtered = filtered.filter(unit => unit.type === selectedType)
    }

    // Seviye filtresi
    if (selectedLevel !== "all") {
      filtered = filtered.filter(unit => unit.level.toString() === selectedLevel)
    }

    // Sıralama
    filtered.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "level":
          aValue = a.level
          bValue = b.level
          break
        case "employeeCount":
          aValue = a.employeeCount
          bValue = b.employeeCount
          break
        case "budget":
          aValue = a.budget
          bValue = b.budget
          break
        case "managerName":
          aValue = a.managerName
          bValue = b.managerName
          break
        default:
          aValue = a.name
          bValue = b.name
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredUnits(filtered)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "department":
        return "bg-blue-100 text-blue-800"
      case "division":
        return "bg-purple-100 text-purple-800"
      case "team":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "department":
        return "Departman"
      case "division":
        return "Bölüm"
      case "team":
        return "Takım"
      default:
        return type
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-red-100 text-red-800"
      case "restructuring":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Aktif"
      case "inactive":
        return "Pasif"
      case "restructuring":
        return "Yeniden Yapılanma"
      default:
        return status
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  const getHierarchyLevel = (unit: OrganizationUnit) => {
    return Array(unit.level).fill(0).map((_, i) => (
      <div key={i} className="w-4 h-4 border-l border-b border-gray-300"></div>
    ))
  }

  const renderHierarchyView = () => {
    const rootUnits = filteredUnits.filter(unit => !unit.parentId)
    
    const renderUnit = (unit: OrganizationUnit, level = 0) => {
      const children = filteredUnits.filter(u => u.parentId === unit.id)
      
      return (
        <div key={unit.id} className="ml-4">
          <Card className="mb-2 hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {getHierarchyLevel(unit)}
                    {unit.name}
                    <Badge className={getTypeColor(unit.type)}>
                      {getTypeText(unit.type)}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{unit.code} - {unit.managerName}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(unit.status)}`}>
                    {getStatusText(unit.status)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedUnit(unit)
                      setIsDetailDialogOpen(true)
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Çalışan Sayısı:</span>
                  <div className="font-medium">{unit.employeeCount}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Bütçe:</span>
                  <div className="font-medium">{formatCurrency(unit.budget)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Verimlilik:</span>
                  <div className="font-medium">{unit.performanceMetrics.efficiency}%</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Kalite:</span>
                  <div className="font-medium">{unit.performanceMetrics.quality}%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          {children.map(child => renderUnit(child, level + 1))}
        </div>
      )
    }

    return (
      <div className="space-y-4">
        {rootUnits.map(unit => renderUnit(unit))}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Organizasyon Şeması</h1>
            <p className="text-muted-foreground">Kurumsal yapı ve hiyerarşi yönetimi</p>
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
          <h1 className="text-3xl font-bold text-foreground">Organizasyon Şeması</h1>
          <p className="text-muted-foreground">Kurumsal yapı ve hiyerarşi yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Rapor İndir
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Birim
          </Button>
        </div>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Birim</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{units.length}</div>
            <p className="text-xs text-muted-foreground">
              {units.filter(u => u.status === "active").length} aktif
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Çalışan</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{employees.length}</div>
            <p className="text-xs text-muted-foreground">
              Tüm departmanlarda
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ortalama Verimlilik</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(units.reduce((sum, u) => sum + u.performanceMetrics.efficiency, 0) / units.length)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Tüm birimlerde
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Bütçe</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(units.reduce((sum, u) => sum + u.budget, 0))}
            </div>
            <p className="text-xs text-muted-foreground">
              Yıllık bütçe
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <CardHeader>
          <CardTitle>Organizasyon Filtreleme</CardTitle>
          <CardDescription>Organizasyon birimlerini tip, seviye ve personel bazında filtreleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-2">
              <label className="text-sm font-medium">Arama</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Birim, yönetici ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tip</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tip seçin" />
                </SelectTrigger>
                <SelectContent>
                  {typeFilters.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: type.color }}
                        />
                        {type.name} ({type.count})
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Seviye</label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Seviye seçin" />
                </SelectTrigger>
                <SelectContent>
                  {levelFilters.map((level) => (
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
              <label className="text-sm font-medium">Sırala</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">İsim</SelectItem>
                  <SelectItem value="level">Seviye</SelectItem>
                  <SelectItem value="employeeCount">Çalışan Sayısı</SelectItem>
                  <SelectItem value="budget">Bütçe</SelectItem>
                  <SelectItem value="managerName">Yönetici</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Görünüm</label>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "hierarchy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("hierarchy")}
                >
                  <TreePine className="h-4 w-4" />
                </Button>
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

      {/* Organizasyon Görünümü */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Organizasyon Yapısı ({filteredUnits.length})</CardTitle>
              <CardDescription>
                {selectedType !== "all" && `Tip: ${typeFilters.find(t => t.id === selectedType)?.name}`}
                {selectedLevel !== "all" && ` | Seviye: ${levelFilters.find(l => l.id === selectedLevel)?.name}`}
                {searchTerm && ` | Arama: "${searchTerm}"`}
              </CardDescription>
            </div>
            <div className="flex gap-2">
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
          {viewMode === "hierarchy" ? (
            renderHierarchyView()
          ) : viewMode === "list" ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Birim</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Seviye</TableHead>
                  <TableHead>Yönetici</TableHead>
                  <TableHead>Çalışan Sayısı</TableHead>
                  <TableHead>Bütçe</TableHead>
                  <TableHead>Verimlilik</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUnits.map((unit) => (
                  <TableRow key={unit.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{unit.name}</div>
                        <div className="text-sm text-muted-foreground">{unit.code}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTypeColor(unit.type)}>
                        {getTypeText(unit.type)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {Array(unit.level).fill(0).map((_, i) => (
                          <div key={i} className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        ))}
                        <span className="text-sm">Seviye {unit.level}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{unit.managerName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{unit.employeeCount}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{formatCurrency(unit.budget)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{unit.performanceMetrics.efficiency}%</div>
                        <Progress value={unit.performanceMetrics.efficiency} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUnit(unit)
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
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredUnits.map((unit) => (
                <Card key={unit.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{unit.name}</CardTitle>
                        <CardDescription>{unit.code} - {unit.managerName}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Badge className={getTypeColor(unit.type)}>
                          {getTypeText(unit.type)}
                        </Badge>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(unit.status)}`}>
                          {getStatusText(unit.status)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Seviye:</span>
                        <span>Seviye {unit.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Çalışan Sayısı:</span>
                        <span className="font-medium">{unit.employeeCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Bütçe:</span>
                        <span className="font-medium">{formatCurrency(unit.budget)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Verimlilik</span>
                        <span>{unit.performanceMetrics.efficiency}%</span>
                      </div>
                      <Progress value={unit.performanceMetrics.efficiency} className="h-2" />
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          setSelectedUnit(unit)
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
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Organizasyon Detay Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              {selectedUnit?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedUnit?.code} - {selectedUnit?.managerName}
            </DialogDescription>
          </DialogHeader>
          {selectedUnit && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Birim Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Birim Adı:</strong> {selectedUnit.name}</div>
                    <div><strong>Birim Kodu:</strong> {selectedUnit.code}</div>
                    <div><strong>Tip:</strong> {getTypeText(selectedUnit.type)}</div>
                    <div><strong>Seviye:</strong> Seviye {selectedUnit.level}</div>
                    <div><strong>Durum:</strong> {getStatusText(selectedUnit.status)}</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Yönetim Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Yönetici:</strong> {selectedUnit.managerName}</div>
                    <div><strong>Kuruluş Tarihi:</strong> {formatDate(selectedUnit.establishedDate)}</div>
                    <div><strong>Son İnceleme:</strong> {formatDate(selectedUnit.lastReviewDate)}</div>
                    <div><strong>Sonraki İnceleme:</strong> {formatDate(selectedUnit.nextReviewDate)}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Açıklama</h4>
                <p className="text-sm text-muted-foreground">{selectedUnit.description}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Sorumluluklar</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedUnit.responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Hedefler</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {selectedUnit.objectives.map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-medium">Performans Metrikleri</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Verimlilik:</span>
                      <span>{selectedUnit.performanceMetrics.efficiency}%</span>
                    </div>
                    <Progress value={selectedUnit.performanceMetrics.efficiency} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Kalite:</span>
                      <span>{selectedUnit.performanceMetrics.quality}%</span>
                    </div>
                    <Progress value={selectedUnit.performanceMetrics.quality} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Uyumluluk:</span>
                      <span>{selectedUnit.performanceMetrics.compliance}%</span>
                    </div>
                    <Progress value={selectedUnit.performanceMetrics.compliance} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>İnovasyon:</span>
                      <span>{selectedUnit.performanceMetrics.innovation}%</span>
                    </div>
                    <Progress value={selectedUnit.performanceMetrics.innovation} className="h-2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Kaynak Bilgileri</h4>
                  <div className="space-y-1 text-sm">
                    <div><strong>Çalışan Sayısı:</strong> {selectedUnit.employeeCount}</div>
                    <div><strong>Bütçe:</strong> {formatCurrency(selectedUnit.budget)}</div>
                    <div><strong>Raporlama Yapısı:</strong> {selectedUnit.reportingStructure}</div>
                    <div><strong>Karar Verme Yetkisi:</strong> {selectedUnit.decisionMakingAuthority}</div>
                    <div><strong>Kaynak Tahsisi:</strong> {selectedUnit.resourceAllocation}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">KPI'lar</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedUnit.kpis.map((kpi, index) => (
                    <Badge key={index} variant="outline">{kpi}</Badge>
                  ))}
                </div>
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