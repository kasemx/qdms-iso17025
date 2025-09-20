import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  Eye, 
  Edit, 
  MoreHorizontal,
  Calendar,
  Users,
  Star,
  TrendingUp,
  CheckCircle,
  Play,
  Pause,
  UserX,
  Settings,
  Grid3X3,
  List,
  BookOpen
} from "lucide-react"

interface TrainingPlan {
  id: string
  title: string
  description: string
  category: string
  type: string
  level: string
  duration: number
  startDate: string
  endDate: string
  status: string
  instructor: string
  location: string
  maxParticipants: number
  currentParticipants: number
  objectives: string[]
  prerequisites: string
  materials: string[]
  assessmentMethod: string
  passingScore: number
  certificateIssued: boolean
  cost: number
  budget: number
  department: string
  priority: string
  createdBy: string
  createdDate: string
  lastModified: string
  completionRate: number
  satisfactionScore: number
  effectivenessScore: number
  notes: string
}

interface TrainingPlansListProps {
  plans: TrainingPlan[]
  selectedPlans: string[]
  viewMode: "grid" | "list"
  setViewMode: (mode: "grid" | "list") => void
  onSelectPlan: (planId: string, checked: boolean) => void
  onSelectAllPlans: (checked: boolean) => void
  onViewDetails: (plan: TrainingPlan) => void
  onEditPlan: (plan: TrainingPlan) => void
  onDeletePlan: (plan: TrainingPlan) => void
  hasPermission: (permission: string) => boolean
  currentPage: number
  itemsPerPage: number
  onPageChange: (page: number) => void
  onItemsPerPageChange: (items: number) => void
}

export function TrainingPlansList({
  plans,
  selectedPlans,
  viewMode,
  setViewMode,
  onSelectPlan,
  onSelectAllPlans,
  onViewDetails,
  onEditPlan,
  onDeletePlan,
  hasPermission,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: TrainingPlansListProps) {
  
  const totalPages = Math.ceil(plans.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPlans = plans.slice(startIndex, endIndex)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "ongoing":
        return <Play className="h-4 w-4 text-blue-500" />
      case "planned":
        return <Calendar className="h-4 w-4 text-gray-500" />
      case "cancelled":
        return <UserX className="h-4 w-4 text-red-500" />
      case "postponed":
        return <Pause className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "ongoing":
        return "bg-blue-100 text-blue-800"
      case "planned":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "postponed":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed": return "Tamamlandı"
      case "ongoing": return "Devam Ediyor"
      case "planned": return "Planlandı"
      case "cancelled": return "İptal Edildi"
      case "postponed": return "Ertelendi"
      default: return status
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical": return "bg-blue-100 text-blue-800"
      case "safety": return "bg-red-100 text-red-800"
      case "compliance": return "bg-green-100 text-green-800"
      case "soft_skills": return "bg-purple-100 text-purple-800"
      case "leadership": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "technical": return "Teknik"
      case "safety": return "Güvenlik"
      case "compliance": return "Uyumluluk"
      case "soft_skills": return "Yumuşak Beceriler"
      case "leadership": return "Liderlik"
      default: return category
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800"
      case "medium": return "bg-yellow-100 text-yellow-800"
      case "low": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high": return "Yüksek"
      case "medium": return "Orta"
      case "low": return "Düşük"
      default: return priority
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

  const getDaysUntilStart = (dateString: string) => {
    const today = new Date()
    const startDate = new Date(dateString)
    const diffTime = startDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="space-y-4">
      {/* View Mode Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-2" />
            Liste
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4 mr-2" />
            Kart
          </Button>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sayfa başına:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Önceki
            </Button>
            <span className="text-sm text-muted-foreground">
              Sayfa {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Sonraki
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "list" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPlans.length === paginatedPlans.length && paginatedPlans.length > 0}
                    onCheckedChange={onSelectAllPlans}
                  />
                </TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Eğitmen</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Katılımcı</TableHead>
                <TableHead>Maliyet</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedPlans.includes(plan.id)}
                      onCheckedChange={(checked) => onSelectPlan(plan.id, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{plan.title}</div>
                      <div className="text-sm text-muted-foreground">{plan.description}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(plan.priority)}>
                          {getPriorityText(plan.priority)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{plan.duration}h</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(plan.category)}>
                      {getCategoryText(plan.category)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(plan.status)}
                      <Badge className={getStatusColor(plan.status)}>
                        {getStatusText(plan.status)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{plan.instructor}</div>
                      <div className="text-sm text-muted-foreground">{plan.location}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{formatDate(plan.startDate)}</div>
                      <div className="text-xs text-muted-foreground">
                        {getDaysUntilStart(plan.startDate) > 0 
                          ? `${getDaysUntilStart(plan.startDate)} gün kaldı`
                          : "Başladı"
                        }
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm">{plan.currentParticipants}/{plan.maxParticipants}</div>
                      <Progress 
                        value={(plan.currentParticipants / plan.maxParticipants) * 100} 
                        className="h-1"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{formatCurrency(plan.cost)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(plan)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {hasPermission("write") && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditPlan(plan)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPlans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-start gap-2">
                      <Checkbox
                        checked={selectedPlans.includes(plan.id)}
                        onCheckedChange={(checked) => onSelectPlan(plan.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{plan.title}</CardTitle>
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge className={getCategoryColor(plan.category)}>
                        {getCategoryText(plan.category)}
                      </Badge>
                      <Badge className={getPriorityColor(plan.priority)}>
                        {getPriorityText(plan.priority)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  {getStatusIcon(plan.status)}
                  <Badge className={getStatusColor(plan.status)}>
                    {getStatusText(plan.status)}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(plan.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{plan.currentParticipants}/{plan.maxParticipants} katılımcı</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Tamamlanma</span>
                    <span>{plan.completionRate}%</span>
                  </div>
                  <Progress value={plan.completionRate} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-green-600">
                    {formatCurrency(plan.cost)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{plan.satisfactionScore.toFixed(1)}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onViewDetails(plan)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Görüntüle
                  </Button>
                  {hasPermission("write") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {paginatedPlans.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="text-muted-foreground">
              <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">Eğitim planı bulunamadı</h3>
              <p>Filtrelerinizi değiştirmeyi deneyin veya yeni bir plan oluşturun.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}