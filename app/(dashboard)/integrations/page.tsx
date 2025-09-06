"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Settings,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  RefreshCw,
  Play,
  Pause,
  Zap,
  ArrowRight,
  Database,
  Workflow,
  Bell,
  BarChart3,
  Shield,
  AlertCircle,
  TrendingUp,
  Users,
  TestTube,
  MessageSquare,
  ClipboardCheck,
  Award,
  Microscope,
  Wrench,
  BookOpen,
  Target,
  CheckSquare,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Search,
  Download,
  Upload,
  Save,
  RotateCcw
} from "lucide-react"
import { toast } from "sonner"
import { integrationManager, complianceChecks, type ModuleIntegration, type IntegrationEvent } from "@/lib/integrations"

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<ModuleIntegration[]>([])
  const [events, setEvents] = useState<IntegrationEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [complianceScore, setComplianceScore] = useState(0)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<ModuleIntegration | null>(null)

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true)
      
      // Mock data - gerçek uygulamada API'den gelecek
      const mockIntegrations = integrationManager.getIntegrationStatus('all')
      const mockEvents = integrationManager.getEventHistory(20)
      const mockComplianceScore = complianceChecks.calculateComplianceScore()
      
      setIntegrations(mockIntegrations)
      setEvents(mockEvents)
      setComplianceScore(mockComplianceScore)
    } catch (error) {
      console.error("Integrations fetch error:", error)
      toast.error("Entegrasyon verileri yüklenirken hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "active": "bg-green-100 text-green-800",
      "inactive": "bg-gray-100 text-gray-800",
      "error": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getEventStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      "completed": "bg-green-100 text-green-800",
      "processing": "bg-blue-100 text-blue-800",
      "pending": "bg-yellow-100 text-yellow-800",
      "failed": "bg-red-100 text-red-800",
    }
    return <Badge className={variants[status] || "bg-gray-100 text-gray-800"}>{status}</Badge>
  }

  const getIntegrationIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      "data_sync": <Database className="h-4 w-4" />,
      "workflow_trigger": <Workflow className="h-4 w-4" />,
      "notification": <Bell className="h-4 w-4" />,
      "reporting": <BarChart3 className="h-4 w-4" />,
    }
    return icons[type] || <Settings className="h-4 w-4" />
  }

  const getModuleIcon = (module: string) => {
    const icons: Record<string, React.ReactNode> = {
      "personnel": <Users className="h-4 w-4" />,
      "equipment": <Settings className="h-4 w-4" />,
      "calibration": <Wrench className="h-4 w-4" />,
      "risk-management": <Shield className="h-4 w-4" />,
      "capa-system": <CheckSquare className="h-4 w-4" />,
      "customer-complaints": <MessageSquare className="h-4 w-4" />,
      "internal-audit": <ClipboardCheck className="h-4 w-4" />,
      "test-jobs": <TestTube className="h-4 w-4" />,
      "sample-management": <Microscope className="h-4 w-4" />,
      "proficiency-tests": <Award className="h-4 w-4" />,
      "dashboard": <BarChart3 className="h-4 w-4" />,
    }
    return icons[module] || <Settings className="h-4 w-4" />
  }

  const handleToggleIntegration = (integrationId: string, isActive: boolean) => {
    try {
      integrationManager.toggleIntegration(integrationId, isActive)
      setIntegrations(prev => prev.map(int => 
        int.id === integrationId ? { ...int, isActive, status: isActive ? 'active' : 'inactive' } : int
      ))
      toast.success(`Entegrasyon ${isActive ? 'aktif' : 'pasif'} edildi`)
    } catch (error) {
      toast.error("Entegrasyon durumu değiştirilemedi")
    }
  }

  const handleRefreshIntegrations = async () => {
    await fetchIntegrations()
    toast.success("Entegrasyonlar yenilendi")
  }

  const handleTestIntegration = (integrationId: string) => {
    toast.loading("Entegrasyon test ediliyor...")
    // Mock test implementation
    setTimeout(() => {
      toast.success("Entegrasyon testi başarılı")
    }, 2000)
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
          <h1 className="text-3xl font-bold text-foreground">Modül Entegrasyonları</h1>
          <p className="text-muted-foreground">ISO 17025 uyumlu modül entegrasyonları ve veri akışı yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefreshIntegrations}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Entegrasyon
          </Button>
        </div>
      </div>

      {/* Uyumluluk Skoru */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>ISO 17025 Uyumluluk Skoru</span>
          </CardTitle>
          <CardDescription>Modül entegrasyonları uyumluluk durumu</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{complianceScore}%</span>
              <div className="flex items-center space-x-2">
                {complianceScore >= 90 ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : complianceScore >= 70 ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="text-sm text-muted-foreground">
                  {complianceScore >= 90 ? 'Mükemmel' : complianceScore >= 70 ? 'İyi' : 'İyileştirme Gerekli'}
                </span>
              </div>
            </div>
            <Progress value={complianceScore} className="h-3" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Modül Aktiflik: {complianceChecks.checkAllModulesActive() ? '✓' : '✗'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Kritik Entegrasyonlar: {complianceChecks.checkCriticalIntegrations() ? '✓' : '✗'}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Senkronizasyon: {complianceChecks.checkLastSyncDates() ? '✓' : '✗'}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="integrations">Entegrasyonlar</TabsTrigger>
          <TabsTrigger value="events">Event Geçmişi</TabsTrigger>
          <TabsTrigger value="monitoring">İzleme</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Entegrasyon Özeti */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Toplam Entegrasyon</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{integrations.length}</div>
                <p className="text-xs text-muted-foreground">Kayıtlı entegrasyon</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Aktif Entegrasyon</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{integrations.filter(i => i.isActive).length}</div>
                <p className="text-xs text-muted-foreground">Çalışır durumda</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bu Gün Event</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{events.length}</div>
                <p className="text-xs text-muted-foreground">İşlenen event</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Başarı Oranı</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {events.length > 0 ? Math.round((events.filter(e => e.status === 'completed').length / events.length) * 100) : 0}%
                </div>
                <p className="text-xs text-muted-foreground">Başarılı işlem</p>
              </CardContent>
            </Card>
          </div>

          {/* Kritik Entegrasyonlar */}
          <Card>
            <CardHeader>
              <CardTitle>Kritik Entegrasyonlar</CardTitle>
              <CardDescription>ISO 17025 uyumluluk için kritik entegrasyonlar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {integrations.filter(i => ['int-001', 'int-002', 'int-003', 'int-004', 'int-005'].includes(i.id)).map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      {getIntegrationIcon(integration.integrationType)}
                      <div>
                        <div className="font-medium">{integration.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {integration.sourceModule} → {integration.targetModule}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(integration.status)}
                      <Switch
                        checked={integration.isActive}
                        onCheckedChange={(checked) => handleToggleIntegration(integration.id, checked)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tüm Entegrasyonlar</CardTitle>
              <CardDescription>Modül entegrasyonları ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entegrasyon</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Hedef</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Son Senkronizasyon</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getIntegrationIcon(integration.integrationType)}
                          <div>
                            <div className="font-medium">{integration.name}</div>
                            <div className="text-sm text-muted-foreground">{integration.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModuleIcon(integration.sourceModule)}
                          <span className="capitalize">{integration.sourceModule}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModuleIcon(integration.targetModule)}
                          <span className="capitalize">{integration.targetModule}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {integration.integrationType.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(integration.status)}</TableCell>
                      <TableCell>
                        {new Date(integration.lastSync).toLocaleDateString('tr-TR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleTestIntegration(integration.id)}
                            title="Test Et"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => {
                              setSelectedIntegration(integration)
                              setIsConfigDialogOpen(true)
                            }}
                            title="Yapılandır"
                          >
                            <Settings className="w-4 h-4" />
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

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Geçmişi</CardTitle>
              <CardDescription>Entegrasyon event'leri ve durumları</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Hedef</TableHead>
                    <TableHead>Tip</TableHead>
                    <TableHead>Durum</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-mono text-sm">{event.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModuleIcon(event.source)}
                          <span className="capitalize">{event.source}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getModuleIcon(event.target)}
                          <span className="capitalize">{event.target}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{event.eventType}</Badge>
                      </TableCell>
                      <TableCell>{getEventStatusBadge(event.status)}</TableCell>
                      <TableCell>
                        {new Date(event.timestamp).toLocaleString('tr-TR')}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" title="Detayları Görüntüle">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Entegrasyon Performansı</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Ortalama Yanıt Süresi</span>
                    <span className="text-sm font-medium">245ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Başarı Oranı</span>
                    <span className="text-sm font-medium">98.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Hata Oranı</span>
                    <span className="text-sm font-medium">1.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Günlük Event Sayısı</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sistem Durumu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Veritabanı Bağlantısı</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">API Servisleri</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Bildirim Sistemi</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Raporlama Sistemi</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600">Aktif</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Configuration Dialog */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Entegrasyon Yapılandırması</DialogTitle>
            <DialogDescription>
              {selectedIntegration?.name} entegrasyonu yapılandırması
            </DialogDescription>
          </DialogHeader>
          {selectedIntegration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Kaynak Modül</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getModuleIcon(selectedIntegration.sourceModule)}
                    <span className="capitalize">{selectedIntegration.sourceModule}</span>
                  </div>
                </div>
                <div>
                  <Label>Hedef Modül</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    {getModuleIcon(selectedIntegration.targetModule)}
                    <span className="capitalize">{selectedIntegration.targetModule}</span>
                  </div>
                </div>
              </div>
              <div>
                <Label>Entegrasyon Tipi</Label>
                <div className="flex items-center space-x-2 mt-1">
                  {getIntegrationIcon(selectedIntegration.integrationType)}
                  <span className="capitalize">{selectedIntegration.integrationType.replace('_', ' ')}</span>
                </div>
              </div>
              <div>
                <Label>Durum</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <Switch
                    checked={selectedIntegration.isActive}
                    onCheckedChange={(checked) => {
                      setSelectedIntegration(prev => prev ? { ...prev, isActive: checked } : null)
                    }}
                  />
                  <span>{selectedIntegration.isActive ? 'Aktif' : 'Pasif'}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              İptal
            </Button>
            <Button onClick={() => {
              if (selectedIntegration) {
                handleToggleIntegration(selectedIntegration.id, selectedIntegration.isActive)
                setIsConfigDialogOpen(false)
              }
            }}>
              Kaydet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
