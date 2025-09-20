"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal, Eye, Edit, FileText, Users, TrendingUp, Award, Calendar } from "lucide-react"

interface PersonnelCompetency {
  id: number
  name: string
  position: string
  department: string
  email: string
  competencyLevel: number
  skills: string[]
  certifications: string[]
  trainingProgress: number
  lastEvaluation: string
  nextEvaluation: string
  performance: {
    overall: number
    technical: number
    communication: number
    leadership: number
  }
  developmentPlan: {
    goals: string[]
    targetDate: string
    progress: number
  }
  status: "active" | "inactive" | "training"
}

interface TrainingPlan {
  id: number
  title: string
  description: string
  category: "technical" | "compliance" | "leadership" | "safety"
  trainer: string
  plannedDate: string
  duration: string
  targetAudience: string
  participants: number
  maxParticipants: number
  status: "planned" | "ongoing" | "completed" | "cancelled"
  priority: "low" | "medium" | "high" | "critical"
  budget: {
    allocated: number
    spent: number
  }
  venue: string
  type: "internal" | "external" | "online"
}

interface PersonnelListProps {
  personnel: PersonnelCompetency[]
  trainingPlans: TrainingPlan[]
  viewMode: string
  selectedItems: number[]
  onSelectionChange: (selected: number[]) => void
  onEdit: (id: number) => void
  onView: (id: number) => void
}

export function PersonnelList({
  personnel,
  trainingPlans,
  viewMode,
  selectedItems,
  onSelectionChange,
  onEdit,
  onView
}: PersonnelListProps) {
  const getStatusBadge = (status: string, type: "personnel" | "training") => {
    const styles = {
      personnel: {
        active: "bg-green-50 text-green-700 border-green-200",
        inactive: "bg-gray-50 text-gray-700 border-gray-200",
        training: "bg-blue-50 text-blue-700 border-blue-200"
      },
      training: {
        planned: "bg-blue-50 text-blue-700 border-blue-200",
        ongoing: "bg-yellow-50 text-yellow-700 border-yellow-200",
        completed: "bg-green-50 text-green-700 border-green-200",
        cancelled: "bg-red-50 text-red-700 border-red-200"
      }
    }
    
    return (
      <Badge variant="outline" className={styles[type][status as keyof typeof styles[typeof type]]}>
        {status}
      </Badge>
    )
  }

  const getCompetencyColor = (level: number) => {
    if (level >= 4) return "text-green-600"
    if (level >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectionChange(personnel.map(p => p.id))
    } else {
      onSelectionChange([])
    }
  }

  const handleSelectItem = (id: number, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedItems, id])
    } else {
      onSelectionChange(selectedItems.filter(item => item !== id))
    }
  }

  if (viewMode === "training") {
    return (
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
                <TableHead>Kategori</TableHead>
                <TableHead>Hedef Kitle</TableHead>
                <TableHead>Eğitmen</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Katılımcı</TableHead>
                <TableHead>Bütçe</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainingPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{plan.title}</div>
                      <div className="text-xs text-muted-foreground">{plan.duration}</div>
                      <Badge 
                        variant="outline" 
                        className={
                          plan.priority === 'critical' ? 'border-red-200 text-red-700' :
                          plan.priority === 'high' ? 'border-orange-200 text-orange-700' :
                          plan.priority === 'medium' ? 'border-yellow-200 text-yellow-700' :
                          'border-gray-200 text-gray-700'
                        }
                      >
                        {plan.priority}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        plan.category === 'technical' ? 'border-blue-200 text-blue-700' :
                        plan.category === 'compliance' ? 'border-green-200 text-green-700' :
                        plan.category === 'leadership' ? 'border-purple-200 text-purple-700' :
                        'border-red-200 text-red-700'
                      }
                    >
                      {plan.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{plan.targetAudience}</TableCell>
                  <TableCell>{plan.trainer}</TableCell>
                  <TableCell>{plan.plannedDate}</TableCell>
                  <TableCell>{getStatusBadge(plan.status, "training")}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div>{plan.participants}/{plan.maxParticipants}</div>
                      <Progress value={(plan.participants / plan.maxParticipants) * 100} className="h-1" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{plan.budget.spent.toLocaleString()} ₺</div>
                      <div className="text-xs text-muted-foreground">
                        /{plan.budget.allocated.toLocaleString()} ₺
                      </div>
                      <Progress 
                        value={(plan.budget.spent / plan.budget.allocated) * 100} 
                        className="h-1" 
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onView(plan.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Detayları Gör
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit(plan.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="h-4 w-4 mr-2" />
                          Katılımcılar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="h-4 w-4 mr-2" />
                          Rapor Oluştur
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personel Listesi</CardTitle>
        <CardDescription>
          {viewMode === "competency" ? "Yetkinlik odaklı görünüm" : "Genel personel listesi"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
            <TabsTrigger value="competency">Yetkinlikler</TabsTrigger>
            <TabsTrigger value="performance">Performans</TabsTrigger>
            <TabsTrigger value="development">Gelişim</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedItems.length === personnel.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Personel</TableHead>
                  <TableHead>Pozisyon</TableHead>
                  <TableHead>Departman</TableHead>
                  <TableHead>Yetkinlik</TableHead>
                  <TableHead>Eğitim İlerlemesi</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(person.id)}
                        onCheckedChange={(checked) => handleSelectItem(person.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{person.position}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{person.department}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getCompetencyColor(person.competencyLevel)}`}>
                          {person.competencyLevel}/5
                        </span>
                        <Progress value={person.competencyLevel * 20} className="h-2 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{person.trainingProgress}%</div>
                        <Progress value={person.trainingProgress} className="h-1" />
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(person.status, "personnel")}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => onView(person.id)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Profili Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(person.id)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Performans Raporu
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Award className="h-4 w-4 mr-2" />
                            Yetkinlik Değerlendirmesi
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="competency" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personel</TableHead>
                  <TableHead>Temel Beceriler</TableHead>
                  <TableHead>Sertifikalar</TableHead>
                  <TableHead>Son Değerlendirme</TableHead>
                  <TableHead>Sonraki Değerlendirme</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {person.skills.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {person.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{person.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {person.certifications.slice(0, 2).map((cert, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {cert}
                          </Badge>
                        ))}
                        {person.certifications.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{person.certifications.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{person.lastEvaluation}</TableCell>
                    <TableCell>{person.nextEvaluation}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Award className="h-4 w-4 mr-2" />
                        Değerlendir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personel</TableHead>
                  <TableHead>Genel Performans</TableHead>
                  <TableHead>Teknik Beceri</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Liderlik</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{person.performance.overall}/5</span>
                        <Progress value={person.performance.overall * 20} className="h-2 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{person.performance.technical}/5</span>
                        <Progress value={person.performance.technical * 20} className="h-2 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{person.performance.communication}/5</span>
                        <Progress value={person.performance.communication * 20} className="h-2 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{person.performance.leadership}/5</span>
                        <Progress value={person.performance.leadership * 20} className="h-2 w-20" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Detay
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="development" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Personel</TableHead>
                  <TableHead>Gelişim Hedefleri</TableHead>
                  <TableHead>Hedef Tarih</TableHead>
                  <TableHead>İlerleme</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {personnel.map((person) => (
                  <TableRow key={person.id}>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{person.name}</div>
                        <div className="text-sm text-muted-foreground">{person.position}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {person.developmentPlan.goals.slice(0, 2).map((goal, index) => (
                          <div key={index} className="text-sm">• {goal}</div>
                        ))}
                        {person.developmentPlan.goals.length > 2 && (
                          <div className="text-xs text-muted-foreground">
                            +{person.developmentPlan.goals.length - 2} daha
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{person.developmentPlan.targetDate}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{person.developmentPlan.progress}%</div>
                        <Progress value={person.developmentPlan.progress} className="h-1" />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        Plan Güncelle
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}