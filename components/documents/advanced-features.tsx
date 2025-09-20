/**
 * Advanced Document Features Components
 * @description ISO 17025 uyumlu gelişmiş doküman yönetim özellikleri
 */

"use client"

import { useState, useCallback, memo } from "react"
import { ModernCard, ModernButton, ModernBadge } from "@/components/ui/modern"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  QrCode, 
  MessageSquare, 
  Workflow, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Download,
  Share2,
  FileText,
  Eye,
  Edit,
  Star,
  Flag,
  Tag,
  History,
  Sparkles,
  Mic,
  Search,
  Bell,
  Settings,
  BarChart3,
  Target,
  Shield,
  Lock,
  Unlock,
  UserCheck
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Advanced Search Component
export const AdvancedSearchBox = memo(function AdvancedSearchBox({ 
  onSearch, 
  className 
}: {
  onSearch: (term: string) => void
  className?: string
}) {
  const [searchValue, setSearchValue] = useState("")
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [suggestions] = useState([
    "ISO 17025 prosedürleri",
    "Kalibrasyon kayıtları", 
    "Test raporları",
    "Onay bekleyen dokümanlar"
  ])

  const handleVoiceSearch = () => {
    setIsVoiceActive(true)
    toast.success("Sesli arama aktif")
    setTimeout(() => setIsVoiceActive(false), 3000)
  }

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            onSearch(e.target.value)
          }}
          placeholder="Akıllı arama: içerik, yazar, etiket, ISO kodu..."
          className="w-full pl-12 pr-20 py-4 text-lg border-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl focus:bg-white dark:focus:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          <ModernButton
            variant="glass"
            size="sm"
            onClick={handleVoiceSearch}
            className={cn(
              "h-8 w-8 p-0 rounded-full shadow-sm hover:shadow-md",
              isVoiceActive && "bg-red-500 text-white animate-pulse"
            )}
          >
            <Mic className="h-4 w-4" />
          </ModernButton>
          <ModernButton variant="glass" size="sm" className="h-8 w-8 p-0 rounded-full shadow-sm hover:shadow-md">
            <Sparkles className="h-4 w-4" />
          </ModernButton>
        </div>
      </div>

      {/* Quick Suggestions */}
      {searchValue.length > 0 && (
        <ModernCard className="absolute top-full left-0 right-0 z-50 mt-2 p-4">
          <div className="space-y-2">
            {suggestions
              .filter(s => s.toLowerCase().includes(searchValue.toLowerCase()))
              .map((suggestion, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                  onClick={() => {
                    setSearchValue(suggestion)
                    onSearch(suggestion)
                  }}
                >
                  <Tag className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">{suggestion}</span>
                </div>
              ))}
          </div>
        </ModernCard>
      )}
    </div>
  )
})

// Bulk Operations Component
export const BulkOperationsPanel = memo(function BulkOperationsPanel({ 
  selectedCount, 
  onOperation 
}: {
  selectedCount: number
  onOperation: (operation: string) => void
}) {
  const [operation, setOperation] = useState("")
  const [progress, setProgress] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleOperation = async () => {
    if (!operation) return

    setIsProcessing(true)
    setProgress(0)

    // Simulate progress
    for (let i = 0; i <= 100; i += 20) {
      setProgress(i)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    setIsProcessing(false)
    toast.success(`${operation} işlemi ${selectedCount} doküman için tamamlandı`)
    onOperation(operation)
  }

  if (selectedCount === 0) return null

  return (
    <ModernCard className="p-4 mb-6 border-l-4 border-l-blue-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <span className="text-sm font-bold text-blue-600">{selectedCount}</span>
          </div>
          <span className="font-medium">doküman seçili</span>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="İşlem seçin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="approve">✅ Toplu Onay</SelectItem>
              <SelectItem value="archive">📦 Toplu Arşiv</SelectItem>
              <SelectItem value="export">📄 Dışa Aktar</SelectItem>
              <SelectItem value="categorize">🏷️ Kategorize</SelectItem>
              <SelectItem value="notify">🔔 Bildirim Gönder</SelectItem>
              <SelectItem value="qr">📱 QR Kod Oluştur</SelectItem>
            </SelectContent>
          </Select>
          <ModernButton
            variant="primary"
            onClick={handleOperation}
            disabled={!operation || isProcessing}
          >
            {isProcessing ? "İşleniyor..." : "Uygula"}
          </ModernButton>
        </div>
      </div>
      {isProcessing && (
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-gray-500 mt-1">İşlem devam ediyor...</p>
        </div>
      )}
    </ModernCard>
  )
})

// Document Workflow Component
export const DocumentWorkflowPanel = memo(function DocumentWorkflowPanel({ 
  document 
}: {
  document: any
}) {
  const workflowSteps = [
    { id: 1, name: "Taslak Oluşturma", status: "completed", user: "Ahmet Yılmaz" },
    { id: 2, name: "Teknik İnceleme", status: "completed", user: "Fatma Kaya" },
    { id: 3, name: "Kalite Kontrolü", status: "in_progress", user: "Mehmet Öz" },
    { id: 4, name: "Son Onay", status: "pending", user: "Dr. Ali Veli" },
    { id: 5, name: "Yayınlama", status: "pending", user: "Sistem" }
  ]

  return (
    <ModernCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">İş Akışı</h3>
          <ModernBadge variant="info">
            {workflowSteps.filter(s => s.status === "completed").length}/{workflowSteps.length}
          </ModernBadge>
        </div>
        
        <div className="space-y-3">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                step.status === "completed" && "bg-green-100 text-green-600",
                step.status === "in_progress" && "bg-blue-100 text-blue-600 animate-pulse",
                step.status === "pending" && "bg-gray-100 text-gray-600"
              )}>
                {step.status === "completed" && <CheckCircle className="h-4 w-4" />}
                {step.status === "in_progress" && <Clock className="h-4 w-4" />}
                {step.status === "pending" && index + 1}
              </div>
              <div className="flex-1">
                <p className={cn(
                  "text-sm font-medium",
                  step.status === "completed" && "text-green-700",
                  step.status === "in_progress" && "text-blue-700"
                )}>{step.name}</p>
                <p className="text-xs text-gray-500">{step.user}</p>
              </div>
              {step.status === "in_progress" && (
                <ModernButton variant="glass" size="sm">
                  <Edit className="h-4 w-4" />
                </ModernButton>
              )}
            </div>
          ))}
        </div>
      </div>
    </ModernCard>
  )
})

// Collaboration Panel Component
export const CollaborationPanel = memo(function CollaborationPanel({ 
  document 
}: {
  document: any
}) {
  const collaborators = [
    { id: 1, name: "Ahmet Y.", isOnline: true, lastAction: "Görüntüledi", time: "2 dk önce" },
    { id: 2, name: "Fatma K.", isOnline: true, lastAction: "Yorum ekledi", time: "5 dk önce" },
    { id: 3, name: "Mehmet Ö.", isOnline: false, lastAction: "Düzenledi", time: "1 saat önce" }
  ]

  return (
    <ModernCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Gerçek Zamanlı İşbirliği</h3>
          <div className="flex -space-x-2">
            {collaborators.slice(0, 3).map((collab) => (
              <div
                key={collab.id}
                className={cn(
                  "w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-medium",
                  collab.isOnline ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
                )}
              >
                {collab.name.charAt(0)}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {collaborators.map((collab) => (
            <div key={collab.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
              <div className={cn(
                "w-2 h-2 rounded-full",
                collab.isOnline ? "bg-green-500 animate-pulse" : "bg-gray-300"
              )} />
              <div className="flex-1">
                <p className="text-sm font-medium">{collab.name}</p>
                <p className="text-xs text-gray-500">{collab.lastAction} • {collab.time}</p>
              </div>
              {collab.isOnline && (
                <ModernBadge variant="success" size="sm">Çevrimiçi</ModernBadge>
              )}
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <ModernButton variant="glass" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Yorum Ekle
          </ModernButton>
        </div>
      </div>
    </ModernCard>
  )
})

// Analytics Dashboard Component
export const AnalyticsDashboard = memo(function AnalyticsDashboard({ 
  document 
}: {
  document: any
}) {
  const analytics = {
    views: 1247,
    downloads: 89,
    shares: 23,
    avgReadTime: 8.5,
    engagement: 92
  }

  return (
    <ModernCard className="p-6">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Doküman Analitikleri</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{analytics.views}</p>
            <p className="text-sm text-gray-500">Görüntüleme</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{analytics.downloads}</p>
            <p className="text-sm text-gray-500">İndirme</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">{analytics.shares}</p>
            <p className="text-sm text-gray-500">Paylaşım</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">{analytics.avgReadTime}dk</p>
            <p className="text-sm text-gray-500">Ort. Okuma</p>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">Kullanıcı Etkileşimi</p>
            <span className="text-sm text-gray-500">{analytics.engagement}%</span>
          </div>
          <Progress value={analytics.engagement} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <ModernButton variant="glass" size="sm">
            <BarChart3 className="h-4 w-4" />
          </ModernButton>
          <ModernButton variant="glass" size="sm">
            <Target className="h-4 w-4" />
          </ModernButton>
          <ModernButton variant="glass" size="sm">
            <Share2 className="h-4 w-4" />
          </ModernButton>
        </div>
      </div>
    </ModernCard>
  )
})

// QR Code Generator Component
export const QRCodeGenerator = memo(function QRCodeGenerator({ 
  document 
}: {
  document: any
}) {
  const [showQR, setShowQR] = useState(false)

  return (
    <Dialog open={showQR} onOpenChange={setShowQR}>
      <DialogTrigger asChild>
        <ModernButton variant="glass" size="sm">
          <QrCode className="h-4 w-4" />
          QR Kod
        </ModernButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Kod Oluştur</DialogTitle>
          <DialogDescription>
            Doküman için QR kod oluşturun ve paylaşın
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-6">
          <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <QrCode className="h-24 w-24 text-gray-400" />
          </div>
        </div>
        <div className="flex justify-between">
          <ModernButton variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            İndir
          </ModernButton>
          <ModernButton variant="primary">
            <Share2 className="mr-2 h-4 w-4" />
            Paylaş
          </ModernButton>
        </div>
      </DialogContent>
    </Dialog>
  )
})

// Compliance Tracker Component
export const ComplianceTracker = memo(function ComplianceTracker({ 
  document 
}: {
  document: any
}) {
  const complianceItems = [
    { name: "ISO 17025:2017", status: "compliant", score: 98 },
    { name: "Doküman Formatı", status: "compliant", score: 95 },
    { name: "İçerik Kontrolü", status: "warning", score: 87 },
    { name: "Onay Süreci", status: "compliant", score: 100 }
  ]

  const overallScore = Math.round(complianceItems.reduce((acc, item) => acc + item.score, 0) / complianceItems.length)

  return (
    <ModernCard className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Uygunluk Kontrolü</h3>
          <ModernBadge 
            variant={overallScore >= 95 ? "success" : overallScore >= 85 ? "warning" : "danger"}
          >
            {overallScore}%
          </ModernBadge>
        </div>

        <div className="space-y-3">
          {complianceItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {item.status === "compliant" && <CheckCircle className="h-4 w-4 text-green-600" />}
                {item.status === "warning" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                <span className="text-sm">{item.name}</span>
              </div>
              <span className="text-sm font-medium">{item.score}%</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t">
          <ModernButton variant="glass" className="w-full">
            <Shield className="mr-2 h-4 w-4" />
            Detaylı Rapor
          </ModernButton>
        </div>
      </div>
    </ModernCard>
  )
})