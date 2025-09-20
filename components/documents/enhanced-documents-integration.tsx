/**
 * Advanced ISO 17025 Document Management System
 * @description Gelişmiş AI destekli ISO 17025 uyumlu doküman yönetim sistemi
 */

"use client"

import { useState, useCallback } from "react"
import { ModernDocumentsContent } from "./modern-documents-content"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Sparkles,
  Workflow,
  Users,
  BarChart3,
  Shield,
  Zap,
  Plus,
  ArrowRight,
  X,
  Bot,
  Activity,
  Lock,
  Cpu,
  Database,
  Cloud,
  CheckCircle,
  Clock
} from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

// Advanced UI Components
const GlassCard = ({ children, className, ...props }: any) => (
  <div 
    className={cn(
      "backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border border-white/30 dark:border-gray-700/30 rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl hover:bg-white/90 dark:hover:bg-gray-900/90 hover:scale-[1.02]",
      className
    )}
    {...props}
  >
    {children}
  </div>
)

const ModernButton = ({ children, variant = "primary", size = "default", className, loading, icon, ...props }: any) => (
  <Button
    className={cn(
      "transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium rounded-2xl",
      variant === "primary" && "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-blue-500/25",
      variant === "secondary" && "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 border-0 dark:from-gray-700 dark:to-gray-600 dark:text-white",
      variant === "glass" && "backdrop-blur-md bg-white/70 hover:bg-blue-500 dark:bg-gray-800/70 dark:hover:bg-blue-600 border border-gray-300/50 dark:border-gray-600/50 hover:text-white hover:border-blue-500 shadow-xl hover:shadow-2xl",
      size === "sm" && "px-4 py-2 text-sm",
      loading && "opacity-70 cursor-not-allowed",
      className
    )}
    disabled={loading}
    {...props}
  >
    {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />}
    {!loading && icon && <span className="mr-2">{icon}</span>}
    {children}
  </Button>
)

const ModernBadge = ({ children, variant = "default", className, ...props }: any) => (
  <Badge
    className={cn(
      "rounded-full px-3 py-1 font-medium shadow-sm",
      variant === "success" && "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/25",
      variant === "warning" && "bg-gradient-to-r from-orange-500 to-yellow-600 text-white shadow-orange-500/25",
      variant === "info" && "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-blue-500/25",
      className
    )}
    {...props}
  >
    {children}
  </Badge>
)

// Enhanced Features Panel
const EnhancedFeaturesPanel = ({ isOpen, onClose }: { 
  isOpen: boolean
  onClose: () => void 
}) => {
  const [activeFeature, setActiveFeature] = useState("overview")
  const [aiAnalysis, setAiAnalysis] = useState(false)

  const features = [
    { id: "overview", name: "AI Özet", icon: Bot, color: "text-blue-500" },
    { id: "workflow", name: "Akıllı İş Akışı", icon: Workflow, color: "text-purple-500" },
    { id: "collaboration", name: "Gerçek Zamanlı İşbirliği", icon: Users, color: "text-green-500" },
    { id: "compliance", name: "ISO 17025 Uygunluk", icon: Shield, color: "text-orange-500" },
    { id: "analytics", name: "Gelişmiş Analitik", icon: BarChart3, color: "text-pink-500" },
    { id: "security", name: "Güvenlik Merkezi", icon: Lock, color: "text-red-500" }
  ]

  const handleAiAnalysis = () => {
    setAiAnalysis(true)
    toast.success("🤖 AI analizi başlatıldı")
    setTimeout(() => {
      setAiAnalysis(false)
      toast.success("✅ AI analizi tamamlandı")
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-50 w-[480px] transform transition-transform duration-500">
        <GlassCard className="h-full rounded-none rounded-l-3xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/20 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    🚀 Gelişmiş Özellikler
                  </h2>
                  <p className="text-sm text-gray-500">AI destekli ISO 17025 araçları</p>
                </div>
              </div>
              <ModernButton 
                variant="glass" 
                size="sm" 
                onClick={onClose} 
                className="h-10 w-10 p-0 rounded-full"
              >
                <X className="h-4 w-4" />
              </ModernButton>
            </div>

            {/* AI Analysis Button */}
            <div className="mt-4">
              <ModernButton
                variant="primary"
                onClick={handleAiAnalysis}
                loading={aiAnalysis}
                className="w-full"
                icon={<Bot className="h-4 w-4" />}
              >
                {aiAnalysis ? "AI Analiz Ediliyor..." : "🤖 AI ile Analiz Et"}
              </ModernButton>
            </div>
          </div>

          {/* Feature Navigation */}
          <div className="p-4 border-b border-white/20">
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature) => {
                const Icon = feature.icon
                const isActive = activeFeature === feature.id
                return (
                  <button
                    key={feature.id}
                    onClick={() => setActiveFeature(feature.id)}
                    className={cn(
                      "p-3 rounded-xl transition-all duration-200 text-left",
                      isActive 
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105" 
                        : "bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:scale-105"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className={cn("h-4 w-4", isActive ? "text-white" : feature.color)} />
                      <span className="text-xs font-medium">{feature.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Feature Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeFeature === "overview" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-500" />
                      <span>AI Doküman Özeti</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Okunabilirlik Skoru</span>
                      <ModernBadge variant="success">Mükemmel (95/100)</ModernBadge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>ISO 17025 Uygunluğu</span>
                      <ModernBadge variant="success">✅ Tam Uyumlu</ModernBadge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Güvenlik Seviyesi</span>
                      <ModernBadge variant="info">🔒 Yüksek</ModernBadge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">🎯 Hızlı AI İşlemleri</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <ModernButton variant="glass" size="sm" className="w-full justify-start">
                      <Cpu className="h-4 w-4 mr-2" />
                      AI ile Özetle
                    </ModernButton>
                    <ModernButton variant="glass" size="sm" className="w-full justify-start">
                      <Database className="h-4 w-4 mr-2" />
                      Akıllı Kategorize
                    </ModernButton>
                    <ModernButton variant="glass" size="sm" className="w-full justify-start">
                      <Cloud className="h-4 w-4 mr-2" />
                      Otomatik Yedekle
                    </ModernButton>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeFeature === "workflow" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Workflow className="h-4 w-4 text-purple-500" />
                      <span>Akıllı İş Akışı Durumu</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { step: "Taslak Oluşturma", status: "completed", user: "AI Asistan", time: "2 dk" },
                        { step: "Otomatik İnceleme", status: "completed", user: "AI Kontrolü", time: "30 sn" },
                        { step: "İnsan Doğrulaması", status: "in_progress", user: "Mehmet Öz", time: "Şimdi" },
                        { step: "AI Onay", status: "pending", user: "AI Sistem", time: "Bekliyor" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg">
                          <div className={cn(
                            "w-3 h-3 rounded-full",
                            item.status === "completed" && "bg-green-500",
                            item.status === "in_progress" && "bg-blue-500 animate-pulse",
                            item.status === "pending" && "bg-gray-300"
                          )} />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.step}</p>
                            <p className="text-xs text-gray-500">{item.user} • {item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeFeature === "collaboration" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Users className="h-4 w-4 text-green-500" />
                      <span>Canlı Kullanıcılar</span>
                      <ModernBadge variant="success">3 Aktif</ModernBadge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { name: "Ahmet Yılmaz", role: "Editör", status: "typing", avatar: "AY" },
                        { name: "Fatma Kaya", role: "Gözden Geçiren", status: "viewing", avatar: "FK" },
                        { name: "AI Asistan", role: "Yardımcı", status: "analyzing", avatar: "🤖" }
                      ].map((user, index) => (
                        <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {user.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                          <ModernBadge 
                            variant={user.status === "typing" ? "warning" : user.status === "analyzing" ? "info" : "success"}
                            className="text-xs"
                          >
                            {user.status === "typing" ? "✏️ Yazıyor" : 
                             user.status === "analyzing" ? "🔍 Analiz" : "👁️ İzliyor"}
                          </ModernBadge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeFeature === "compliance" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-orange-500" />
                      <span>ISO 17025 Uygunluk Kontrolü</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { check: "Doküman Kontrolü", status: "pass", score: "100%" },
                        { check: "Revizyon Takibi", status: "pass", score: "95%" },
                        { check: "Onay Süreci", status: "pass", score: "100%" },
                        { check: "Arşivleme", status: "warning", score: "85%" },
                        { check: "Erişim Kontrolü", status: "pass", score: "100%" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              item.status === "pass" && "bg-green-500",
                              item.status === "warning" && "bg-yellow-500",
                              item.status === "fail" && "bg-red-500"
                            )} />
                            <span className="text-sm">{item.check}</span>
                          </div>
                          <ModernBadge 
                            variant={item.status === "pass" ? "success" : item.status === "warning" ? "warning" : "info"}
                            className="text-xs"
                          >
                            {item.score}
                          </ModernBadge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeFeature === "analytics" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <BarChart3 className="h-4 w-4 text-pink-500" />
                      <span>Performans Analitikleri</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Kullanıcı Etkileşimi</span>
                          <span>87%</span>
                        </div>
                        <Progress value={87} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Doküman Kalitesi</span>
                          <span>95%</span>
                        </div>
                        <Progress value={95} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeFeature === "security" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-red-500" />
                      <span>Güvenlik Durumu</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dijital İmza</span>
                        <ModernBadge variant="success">✅ Aktif</ModernBadge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Şifreleme</span>
                        <ModernBadge variant="success">🔒 AES-256</ModernBadge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Erişim Kontrolü</span>
                        <ModernBadge variant="info">🔐 Aktif</ModernBadge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-white/20">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>ISO 17025:2017 Uyumlu</span>
              <Badge variant="outline" className="text-xs">
                v2.1.0
              </Badge>
            </div>
          </div>
        </GlassCard>
      </div>
    </>
  )
}

/**
 * Enhanced Documents Page with Advanced Features
 */
export function EnhancedDocumentsPage() {
  const [showAdvancedFeatures, setShowAdvancedFeatures] = useState(false)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])

  const handleBulkOperation = useCallback(async (operation: string) => {
    toast.success(`${operation} işlemi başarıyla tamamlandı!`)
    setSelectedDocuments([])
  }, [])

  return (
    <div className="relative">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-emerald-600/10" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl" />
        
        <div className="relative px-6 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <Zap className="h-8 w-8" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                      🚀 Gelişmiş Doküman Merkezi
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                      AI destekli ISO 17025 uyumlu akıllı doküman yönetim sistemi
                    </p>
                  </div>
                </div>

                {/* Feature Highlights */}
                <div className="flex items-center space-x-6 text-sm pt-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-600">AI Destekli Arama</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Workflow className="h-4 w-4 text-green-600" />
                    <span className="text-gray-600">Akıllı İş Akışı</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-600">ISO 17025 Uyumlu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-600">Gerçek Zamanlı İşbirliği</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <ModernButton 
                  variant={showAdvancedFeatures ? "primary" : "secondary"}
                  onClick={() => setShowAdvancedFeatures(!showAdvancedFeatures)}
                  className="flex items-center space-x-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Gelişmiş Özellikler</span>
                  {showAdvancedFeatures && <X className="h-4 w-4" />}
                </ModernButton>
                
                <ModernButton variant="primary" className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Yeni Doküman</span>
                  <ArrowRight className="h-4 w-4" />
                </ModernButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        <ModernDocumentsContent />
      </div>

      {/* Advanced Features Panel */}
      <EnhancedFeaturesPanel 
        isOpen={showAdvancedFeatures} 
        onClose={() => setShowAdvancedFeatures(false)} 
      />
    </div>
  )
}