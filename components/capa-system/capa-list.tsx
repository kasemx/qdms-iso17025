"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Edit, Eye, CheckCircle, X } from "lucide-react"
import { toast } from "sonner"

interface CAPA {
  id: string
  capaNumber: string
  title: string
  description: string
  type: string
  source: string
  priority: string
  status: string
  owner: string
  identifiedDate: string
  dueDate: string
  completionDate: string
  rootCause?: {
    analysis: string
    causes: Array<{
      cause: string
      category: string
      impact: string
    }>
    method: string
    analyst: string
    date: string
  }
  correctiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  preventiveActions: Array<{
    action: string
    responsible: string
    dueDate: string
    status: string
    effectiveness: string
  }>
  verification?: {
    method: string
    criteria: string
    results: string
    verifier: string
    date: string
    status: string
  }
  effectiveness?: {
    method: string
    criteria: string
    results: string
    evaluator: string
    date: string
    status: string
  }
  cost?: {
    estimated: number
    actual: number
    variance: number
  }
  attachments?: Array<{
    name: string
    type: string
    size: string
    uploadDate: string
  }>
  notes?: string
  createdAt: string
  updatedAt: string
}

interface CAPAListProps {
  capas: CAPA[]
  filteredCAPAs: CAPA[]
  selectedCAPAs: string[]
  activeTab: string
  onTabChange: (value: string) => void
  onSelectCAPA: (capaId: string, checked: boolean) => void
  onSelectAllCAPAs: (checked: boolean) => void
  onViewCAPA: (capa: CAPA) => void
  onEditCAPA: (capa: CAPA) => void
  onDeleteCAPA: (capaId: string) => void
  onCompleteCAPA: (capaId: string) => void
}

export function CAPAList({
  capas,
  filteredCAPAs,
  selectedCAPAs,
  activeTab,
  onTabChange,
  onSelectCAPA,
  onSelectAllCAPAs,
  onViewCAPA,
  onEditCAPA,
  onDeleteCAPA,
  onCompleteCAPA,
}: CAPAListProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "Planlandı": "bg-blue-100 text-blue-800",
      "Uygulanıyor": "bg-yellow-100 text-yellow-800",
      "Tamamlandı": "bg-green-100 text-green-800",
      "İptal Edildi": "bg-red-100 text-red-800",
      "Beklemede": "bg-gray-100 text-gray-800",
      "open": "bg-blue-100 text-blue-800",
      "in_progress": "bg-yellow-100 text-yellow-800",
      "completed": "bg-green-100 text-green-800",
      "cancelled": "bg-red-100 text-red-800",
      "closed": "bg-gray-100 text-gray-800",
    }
    
    const statusMap: Record<string, string> = {
      "Planlandı": "Planlandı",
      "Uygulanıyor": "Uygulanıyor", 
      "Tamamlandı": "Tamamlandı",
      "İptal Edildi": "İptal Edildi",
      "Beklemede": "Beklemede",
      "open": "Planlandı",
      "in_progress": "Uygulanıyor",
      "completed": "Tamamlandı",
      "cancelled": "İptal Edildi",
      "closed": "Kapatıldı",
    }
    
    const displayStatus = statusMap[status] || status
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{displayStatus}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, string> = {
      "Yüksek": "bg-red-100 text-red-800",
      "Orta": "bg-yellow-100 text-yellow-800",
      "Düşük": "bg-green-100 text-green-800",
      "high": "bg-red-100 text-red-800",
      "medium": "bg-yellow-100 text-yellow-800",
      "low": "bg-green-100 text-green-800",
      "critical": "bg-red-100 text-red-800",
    }
    
    const priorityMap: Record<string, string> = {
      "Yüksek": "Yüksek",
      "Orta": "Orta",
      "Düşük": "Düşük",
      "high": "Yüksek",
      "medium": "Orta",
      "low": "Düşük",
      "critical": "Kritik",
    }
    
    const displayPriority = priorityMap[priority] || priority
    return <Badge className={variants[priority] || "bg-gray-100 text-gray-800"}>{displayPriority}</Badge>
  }

  const getTypeBadge = (type: string) => {
    const variants: Record<string, string> = {
      "Düzeltici": "bg-red-100 text-red-800",
      "Önleyici": "bg-blue-100 text-blue-800",
      "corrective": "bg-red-100 text-red-800",
      "preventive": "bg-blue-100 text-blue-800",
      "both": "bg-purple-100 text-purple-800",
    }
    
    const typeMap: Record<string, string> = {
      "Düzeltici": "Düzeltici",
      "Önleyici": "Önleyici",
      "corrective": "Düzeltici",
      "preventive": "Önleyici",
      "both": "Her İkisi",
    }
    
    const displayType = typeMap[type] || type
    return <Badge className={variants[type] || "bg-gray-100 text-gray-800"}>{displayType}</Badge>
  }

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="capas">CAPA Listesi</TabsTrigger>
        <TabsTrigger value="actions">Aksiyonlar</TabsTrigger>
        <TabsTrigger value="analytics">Analitik</TabsTrigger>
      </TabsList>

      <TabsContent value="capas" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>CAPA Kayıtları</CardTitle>
            <CardDescription>Tüm CAPA kayıtları ve durumları</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCAPAs.length === filteredCAPAs.length && filteredCAPAs.length > 0}
                      onCheckedChange={onSelectAllCAPAs}
                    />
                  </TableHead>
                  <TableHead>CAPA No</TableHead>
                  <TableHead>Başlık</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Kaynak</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Sorumlu</TableHead>
                  <TableHead>Tarihler</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCAPAs.map((capa) => (
                  <TableRow key={capa.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCAPAs.includes(capa.id)}
                        onCheckedChange={(checked) => onSelectCAPA(capa.id, checked as boolean)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{capa.capaNumber}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{capa.title}</div>
                        <div className="text-sm text-muted-foreground truncate max-w-xs">{capa.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(capa.type)}</TableCell>
                    <TableCell>{capa.source}</TableCell>
                    <TableCell>{getPriorityBadge(capa.priority)}</TableCell>
                    <TableCell>{getStatusBadge(capa.status)}</TableCell>
                    <TableCell>{capa.owner}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>Belirlenme: {capa.identifiedDate}</div>
                        <div>Bitiş: {capa.dueDate}</div>
                        {capa.completionDate && <div>Tamamlanma: {capa.completionDate}</div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Detayları Görüntüle"
                          onClick={() => onViewCAPA(capa)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Düzenle"
                          onClick={() => onEditCAPA(capa)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        {capa.status !== 'completed' && capa.status !== 'Tamamlandı' && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            title="Tamamlandı olarak işaretle"
                            onClick={() => onCompleteCAPA(capa.id)}
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          title="Sil"
                          onClick={() => onDeleteCAPA(capa.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
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

      <TabsContent value="actions" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Aksiyon Maddeleri</CardTitle>
            <CardDescription>Tüm CAPA aksiyon maddeleri ve durumları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {capas.map((capa) => (
                <Card key={capa.id} className="p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="font-medium">{capa.capaNumber} - {capa.title}</div>
                      <div className="text-sm text-muted-foreground">{getTypeBadge(capa.type)} CAPA</div>
                    </div>
                    <div className="flex space-x-2">
                      {getStatusBadge(capa.status)}
                      {getPriorityBadge(capa.priority)}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Düzeltici Aksiyonlar</h4>
                      <div className="space-y-2">
                        {capa.correctiveActions.map((action, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                            <div className="flex-1">
                              <div className="font-medium">{action.action}</div>
                              <div className="text-sm text-muted-foreground">Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</div>
                            </div>
                            <div className="flex space-x-2">
                              {getStatusBadge(action.status)}
                              <Badge variant="outline">{action.effectiveness}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Önleyici Aksiyonlar</h4>
                      <div className="space-y-2">
                        {capa.preventiveActions.map((action, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                            <div className="flex-1">
                              <div className="font-medium">{action.action}</div>
                              <div className="text-sm text-muted-foreground">Sorumlu: {action.responsible} | Bitiş: {action.dueDate}</div>
                            </div>
                            <div className="flex space-x-2">
                              {getStatusBadge(action.status)}
                              <Badge variant="outline">{action.effectiveness}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
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
                {Array.from(new Set(capas.map(c => c.status))).map(status => {
                  const count = capas.filter(c => c.status === status).length
                  const percentage = capas.length > 0 ? (count / capas.length) * 100 : 0
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
              <CardTitle>Tip Dağılımı</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Array.from(new Set(capas.map(c => c.type))).map(type => {
                  const count = capas.filter(c => c.type === type).length
                  const percentage = capas.length > 0 ? (count / capas.length) * 100 : 0
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
  )
}