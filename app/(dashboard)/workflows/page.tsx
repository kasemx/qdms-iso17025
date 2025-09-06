"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Search, Clock, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { mockApi } from "@/lib/mock-data"
import { getPriorityBadge } from "@/lib/priority-utils"

export default function WorkflowsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [workflows, setWorkflows] = useState([])

  useEffect(() => {
    const fetchWorkflows = async () => {
      try {
        setIsLoading(true)
        const data = await mockApi.getWorkflows()
        setWorkflows(data || [])
      } catch (error) {
        console.error("Workflows fetch error:", error)
        toast({
          title: "Hata",
          description: "Onay süreçleri yüklenirken bir hata oluştu.",
          variant: "destructive",
        })
        setWorkflows([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchWorkflows()
  }, [toast])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Beklemede", color: "bg-yellow-100 text-yellow-800", icon: Clock },
      approved: { label: "Onaylandı", color: "bg-green-100 text-green-800", icon: CheckCircle },
      rejected: { label: "Reddedildi", color: "bg-red-100 text-red-800", icon: XCircle },
      active: { label: "Aktif", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
      completed: { label: "Tamamlandı", color: "bg-green-100 text-green-800", icon: CheckCircle },
      cancelled: { label: "İptal Edildi", color: "bg-gray-100 text-gray-800", icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || {
      label: status || "Bilinmiyor",
      color: "bg-gray-100 text-gray-800",
      icon: AlertCircle
    }
    
    const Icon = config.icon

    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }


  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Onay Süreçleri</h1>
            <p className="text-gray-600 mt-1">Yükleniyor...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onay Süreçleri</h1>
          <p className="text-gray-600 mt-1">Doküman onay süreçlerini takip edin ve yönetin</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Yeni Süreç
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bekleyen Onaylar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">8</div>
            <p className="text-xs text-yellow-600 mt-1">
              <AlertCircle className="w-3 h-3 inline mr-1" />3 acil
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Bu Ay Onaylanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">24</div>
            <p className="text-xs text-green-600 mt-1">+15% artış</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Ortalama Süre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3.2</div>
            <p className="text-xs text-gray-500 mt-1">gün</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Onay Oranı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">92%</div>
            <p className="text-xs text-gray-500 mt-1">Son 30 gün</p>
          </CardContent>
        </Card>
      </div>

      {/* Workflows Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Onay Süreçleri</CardTitle>
          <CardDescription>Tüm doküman onay süreçlerini görüntüleyin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Doküman veya süreç ara..." className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Durumlar</SelectItem>
                <SelectItem value="pending">Beklemede</SelectItem>
                <SelectItem value="approved">Onaylandı</SelectItem>
                <SelectItem value="rejected">Reddedildi</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Öncelik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="high">Yüksek</SelectItem>
                <SelectItem value="medium">Orta</SelectItem>
                <SelectItem value="low">Düşük</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doküman</TableHead>
                  <TableHead>Başlatan</TableHead>
                  <TableHead>Mevcut Adım</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Öncelik</TableHead>
                  <TableHead>Son Tarih</TableHead>
                  <TableHead>Onaylayanlar</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workflows.map((workflow) => (
                  <TableRow key={workflow.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{workflow.documentTitle}</div>
                          <div className="text-sm text-gray-500">{workflow.documentCode}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                            {workflow.initiator
                              ?.split(" ")
                              ?.map((n) => n[0])
                              ?.join("") || "??"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-gray-600">{workflow.initiator}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-900">{workflow.currentStep}</span>
                    </TableCell>
                    <TableCell>{getStatusBadge(workflow.status)}</TableCell>
                    <TableCell>{getPriorityBadge(workflow.priority)}</TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">{workflow.dueDate}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex -space-x-1">
                        {workflow.approvers?.slice(0, 3).map((approver, index) => (
                          <Avatar key={index} className="w-6 h-6 border-2 border-white">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {approver
                                ?.split(" ")
                                ?.map((n) => n[0])
                                ?.join("") || "??"}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {workflow.approvers?.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                            <span className="text-xs text-gray-600">+{workflow.approvers?.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
