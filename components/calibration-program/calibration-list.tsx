"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Edit,
  Eye,
  MoreHorizontal,
  Send,
  Settings,
  SortAsc,
  SortDesc,
  Trash2,
  Users,
  Zap
} from "lucide-react"

interface CalibrationProgram {
  id: string
  equipmentId: string
  equipmentName: string
  equipmentCode: string
  calibrationType: string
  frequency: string
  lastCalibration: string
  nextCalibration: string
  status: string
  responsible: string
  supplier: string
  cost: number
  priority: string
  notes: string
  automationEnabled: boolean
  complianceStandards: string[]
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  workflowStage: 'planning' | 'approval' | 'execution' | 'verification' | 'complete'
  approvalChain: {
    requiredBy: string
    approvedBy?: string
    approvedDate?: string
    status: 'pending' | 'approved' | 'rejected'
  }[]
  dependencies: string[]
  estimatedDuration: number
  actualDuration?: number
  qualityChecks: {
    preCalibration: boolean
    postCalibration: boolean
    documentation: boolean
    traceability: boolean
  }
  environmentalRequirements: {
    temperature: string
    humidity: string
    vibration: string
    cleanliness: string
  }
  competencyRequirements: string[]
  documentLinks: string[]
  lastModified: string
  modifiedBy: string
}

type SortField = 'equipmentName' | 'nextCalibration' | 'cost' | 'priority' | 'status' | 'riskLevel' | 'lastCalibration' | 'responsible'
type SortDirection = 'asc' | 'desc'

interface CalibrationListProps {
  programs: CalibrationProgram[]
  viewMode: "grid" | "list"
  sortBy: SortField
  setSortBy: (field: SortField) => void
  sortOrder: SortDirection
  setSortOrder: (order: SortDirection) => void
  selectedPrograms: string[]
  setSelectedPrograms: (programs: string[]) => void
  onProgramSelect: (program: CalibrationProgram) => void
  selectedStatus: string
  selectedPriority: string
  searchTerm: string
  statusFilters: Array<{id: string, name: string}>
  priorityFilters: Array<{id: string, name: string}>
}

export function CalibrationList({
  programs,
  viewMode,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  selectedPrograms,
  setSelectedPrograms,
  onProgramSelect,
  selectedStatus,
  selectedPriority,
  searchTerm,
  statusFilters,
  priorityFilters
}: CalibrationListProps) {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR")
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY"
    }).format(amount)
  }

  const getDaysUntilCalibration = (dateString: string) => {
    const today = new Date()
    const calibrationDate = new Date(dateString)
    const diffTime = calibrationDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getCalibrationProgress = (lastCalibration: string, nextCalibration: string) => {
    const today = new Date()
    const last = new Date(lastCalibration)
    const next = new Date(nextCalibration)
    const totalDays = (next.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    const passedDays = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
    return Math.min(100, Math.max(0, (passedDays / totalDays) * 100))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "overdue":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "scheduled":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <Settings className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in_progress":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Tamamlandı"
      case "overdue":
        return "Süresi Geçti"
      case "scheduled":
        return "Planlandı"
      case "in_progress":
        return "Devam Ediyor"
      default:
        return status
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-blue-100 text-blue-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "critical":
        return "Kritik"
      case "high":
        return "Yüksek"
      case "medium":
        return "Orta"
      case "low":
        return "Düşük"
      default:
        return priority
    }
  }

  const getRiskLevelColor = (risk: string) => {
    const colors = {
      'low': 'bg-green-100 text-green-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-orange-100 text-orange-800',
      'critical': 'bg-red-100 text-red-800'
    }
    return colors[risk as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getWorkflowStageColor = (stage: string) => {
    const colors = {
      'planning': 'bg-blue-100 text-blue-800',
      'approval': 'bg-yellow-100 text-yellow-800',
      'execution': 'bg-purple-100 text-purple-800',
      'verification': 'bg-orange-100 text-orange-800',
      'complete': 'bg-green-100 text-green-800'
    }
    return colors[stage as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Kalibrasyon Programları ({programs.length})</CardTitle>
            <CardDescription>
              {selectedStatus !== "all" && `Durum: ${statusFilters.find(s => s.id === selectedStatus)?.name}`}
              {selectedPriority !== "all" && ` | Öncelik: ${priorityFilters.find(p => p.id === selectedPriority)?.name}`}
              {searchTerm && ` | Arama: "${searchTerm}"`}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortField)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sırala" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="equipmentName">Ekipman</SelectItem>
                <SelectItem value="nextCalibration">Sonraki Kalibrasyon</SelectItem>
                <SelectItem value="lastCalibration">Son Kalibrasyon</SelectItem>
                <SelectItem value="cost">Maliyet</SelectItem>
                <SelectItem value="responsible">Sorumlu</SelectItem>
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
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedPrograms.length === programs.length && programs.length > 0}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedPrograms(programs.map(p => p.id))
                      } else {
                        setSelectedPrograms([])
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Ekipman</TableHead>
                <TableHead>Kalibrasyon Türü</TableHead>
                <TableHead>Sıklık</TableHead>
                <TableHead>Son Kalibrasyon</TableHead>
                <TableHead>Sonraki Kalibrasyon</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Öncelik</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Aşama</TableHead>
                <TableHead>Otomasyon</TableHead>
                <TableHead>Maliyet</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programs.map((program) => {
                const daysUntil = getDaysUntilCalibration(program.nextCalibration)
                const progress = getCalibrationProgress(program.lastCalibration, program.nextCalibration)
                
                return (
                  <TableRow key={program.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedPrograms.includes(program.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPrograms([...selectedPrograms, program.id])
                          } else {
                            setSelectedPrograms(selectedPrograms.filter(id => id !== program.id))
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{program.equipmentName}</div>
                        <div className="text-sm text-muted-foreground">{program.equipmentCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{program.calibrationType}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{program.frequency}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{formatDate(program.lastCalibration)}</div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{formatDate(program.nextCalibration)}</div>
                        <div className="text-xs text-muted-foreground">
                          {daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(program.status)}
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                          {getStatusText(program.status)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                        {getPriorityText(program.priority)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getRiskLevelColor(program.riskLevel)}`}>
                        {program.riskLevel === 'low' ? 'Düşük' : 
                         program.riskLevel === 'medium' ? 'Orta' :
                         program.riskLevel === 'high' ? 'Yüksek' : 'Kritik'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${getWorkflowStageColor(program.workflowStage)}`}>
                        {program.workflowStage === 'planning' ? 'Planlama' :
                         program.workflowStage === 'approval' ? 'Onay' :
                         program.workflowStage === 'execution' ? 'Uygulama' :
                         program.workflowStage === 'verification' ? 'Doğrulama' : 'Tamamlandı'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        {program.automationEnabled ? (
                          <>
                            <Zap className="h-4 w-4 text-blue-500" />
                            <span className="text-xs text-blue-600">Otomatik</span>
                          </>
                        ) : (
                          <>
                            <Users className="h-4 w-4 text-gray-500" />
                            <span className="text-xs text-gray-600">Manuel</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{formatCurrency(program.cost)}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Eylemler</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => onProgramSelect(program)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Kopyala
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="h-4 w-4 mr-2" />
                            İş Akışını Başlat
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Sil
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => {
              const daysUntil = getDaysUntilCalibration(program.nextCalibration)
              const progress = getCalibrationProgress(program.lastCalibration, program.nextCalibration)
              
              return (
                <Card key={program.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">{program.equipmentName}</CardTitle>
                        <CardDescription>{program.equipmentCode}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(program.status)}`}>
                          {getStatusText(program.status)}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(program.priority)}`}>
                          {getPriorityText(program.priority)}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Kalibrasyon Türü:</span>
                        <span>{program.calibrationType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sıklık:</span>
                        <span>{program.frequency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Sonraki Kalibrasyon:</span>
                        <span>{formatDate(program.nextCalibration)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Maliyet:</span>
                        <span className="font-medium">{formatCurrency(program.cost)}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>İlerleme</span>
                        <span>{daysUntil > 0 ? `${daysUntil} gün kaldı` : `${Math.abs(daysUntil)} gün geçti`}</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1"
                        onClick={() => onProgramSelect(program)}
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
  )
}