"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  FileText,
  Settings,
  Users,
  TestTube,
  Shield,
  Building,
  Scale,
  Target,
  BookOpen,
  Play,
  Skip,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  content: React.ReactNode
  isCompleted: boolean
  isOptional: boolean
}

interface OnboardingWizardProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

export function OnboardingWizard({ isOpen, onClose, onComplete }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [skippedSteps, setSkippedSteps] = useState<Set<string>>(new Set())

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Hoş Geldiniz!",
      description: "ISO 17025 Kalite Doküman Yönetim Sistemine hoş geldiniz",
      icon: BookOpen,
      isCompleted: false,
      isOptional: false,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold">ISO 17025 Kalite Doküman Yönetim Sistemi</h3>
            <p className="text-muted-foreground">
              Bu rehber size sistemin temel özelliklerini tanıtacak ve ISO 17025 gerekliliklerini 
              nasıl karşıladığını gösterecektir.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold">Doküman Yönetimi</h4>
                <p className="text-sm text-muted-foreground">Tüm ISO dokümanlarınızı merkezi olarak yönetin</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <TestTube className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold">Test Süreçleri</h4>
                <p className="text-sm text-muted-foreground">Numune ve test işlemlerini takip edin</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold">Kalite Güvencesi</h4>
                <p className="text-sm text-muted-foreground">ISO 17025 uyumluluğunu sağlayın</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "iso-overview",
      title: "ISO 17025 Gereklilikleri",
      description: "Sisteminizin ISO 17025 standardına nasıl uyduğunu öğrenin",
      icon: Scale,
      isCompleted: false,
      isOptional: false,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Scale className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold">ISO 17025:2017 Uyumluluk</h3>
            <p className="text-muted-foreground">
              Sistemimiz ISO 17025 standardının tüm gerekliliklerini karşılar
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <span>4. Genel Gereklilikler</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">4.1 Adalet (Impartiality)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">4.2 Gizlilik (Confidentiality)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">4.3-4.6 Yapı & Kaynaklar</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span>5. Yönetim Gereklilikleri</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">5.1-5.2 Genel & Politika</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">5.3-5.4 Organizasyon & Yönetim</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">5.5-5.10 Dokümantasyon & İyileştirme</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TestTube className="w-5 h-5 text-orange-600" />
                  <span>6. Teknik Gereklilikler</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">6.1-6.2 Genel & Personel</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">6.3-6.5 Tesis & Ekipman</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">6.6-6.10 Test Süreçleri</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-800">
                  <Target className="w-5 h-5" />
                  <span>Uyumluluk Durumu</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                  <p className="text-sm text-green-700">Tüm ISO 17025 gereklilikleri karşılanmıştır</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "modules-overview",
      title: "Sistem Modülleri",
      description: "Ana modülleri ve işlevlerini keşfedin",
      icon: Building,
      isCompleted: false,
      isOptional: false,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
              <Building className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold">Sistem Modülleri</h3>
            <p className="text-muted-foreground">
              ISO 17025 gerekliliklerini karşılayan kapsamlı modül yapısı
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Doküman Yönetimi", icon: FileText, color: "blue", desc: "Tüm ISO dokümanlarını merkezi yönetim" },
              { name: "Organizasyon Yapısı", icon: Users, color: "green", desc: "Organizasyon şeması ve pozisyonlar" },
              { name: "Ekipman Envanteri", icon: Settings, color: "orange", desc: "Ekipman takibi ve kalibrasyon" },
              { name: "Personel Yetkinlik", icon: Users, color: "purple", desc: "Eğitim ve sertifikasyon takibi" },
              { name: "Test Süreçleri", icon: TestTube, color: "red", desc: "Numune ve test işlemleri" },
              { name: "Risk Yönetimi", icon: Shield, color: "yellow", desc: "Risk değerlendirme ve yönetimi" },
              { name: "CAPA Sistemi", icon: Target, color: "indigo", desc: "Düzeltici ve önleyici faaliyetler" },
              { name: "İç Denetim", icon: Shield, color: "pink", desc: "İç denetim planlama ve takibi" },
              { name: "Yeterlilik Testleri", icon: TestTube, color: "teal", desc: "Yeterlilik testi yönetimi" },
            ].map((module, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${module.color}-100 rounded-lg flex items-center justify-center`}>
                      <module.icon className={`w-5 h-5 text-${module.color}-600`} />
                    </div>
                    <div>
                      <h4 className="font-semibold">{module.name}</h4>
                      <p className="text-sm text-muted-foreground">{module.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    },
    {
      id: "dashboard-tour",
      title: "Dashboard Turu",
      description: "Ana dashboard'u keşfedin ve temel işlevleri öğrenin",
      icon: Target,
      isCompleted: false,
      isOptional: false,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold">Dashboard Özellikleri</h3>
            <p className="text-muted-foreground">
              Ana dashboard'dan sistemin genel durumunu takip edebilirsiniz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span>Genel Bakış</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Modül durumları ve istatistikler</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Kritik uyarılar ve bildirimler</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Performans göstergeleri</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-green-600" />
                  <span>ISO 17025 Haritası</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Modül-ISO madde eşleştirmesi</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Uyumluluk durumu gösterimi</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Gereklilik takibi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">💡 İpucu</h4>
            <p className="text-sm text-blue-700">
              Dashboard'da her modülün yanındaki renkli göstergeler, o modülün durumunu gösterir. 
              Yeşil: Aktif, Sarı: Uyarı, Kırmızı: Hata, Mavi: Beklemede
            </p>
          </div>
        </div>
      )
    },
    {
      id: "navigation-guide",
      title: "Navigasyon Rehberi",
      description: "Sistemde nasıl gezinileceğini öğrenin",
      icon: ArrowRight,
      isCompleted: false,
      isOptional: false,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <ArrowRight className="w-8 h-8 text-cyan-600" />
            </div>
            <h3 className="text-2xl font-bold">Navigasyon Sistemi</h3>
            <p className="text-muted-foreground">
              Sol menüden tüm modüllere erişebilir, breadcrumb ile konumunuzu takip edebilirsiniz
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  <span>Sol Menü</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Ana modüllere hızlı erişim</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Durum göstergeleri</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Bildirim sayıları</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ArrowRight className="w-5 h-5 text-green-600" />
                  <span>Breadcrumb</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Mevcut konumunuzu gösterir</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Önceki sayfalara dönüş</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Hiyerarşik yapı gösterimi</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">🎯 Önemli</h4>
            <p className="text-sm text-yellow-700">
              Her sayfada tutarlı navigasyon yapısı bulunur. Sayfa başlığı, breadcrumb, 
              durum göstergesi ve aksiyon butonları her zaman aynı konumdadır.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "completion",
      title: "Hoş Geldiniz!",
      description: "Onboarding tamamlandı, sistemi kullanmaya başlayabilirsiniz",
      icon: CheckCircle,
      isCompleted: false,
      isOptional: false,
      content: (
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-3xl font-bold text-green-800">Tebrikler!</h3>
            <p className="text-muted-foreground text-lg">
              Onboarding sürecini başarıyla tamamladınız
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Sistem Hazır</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>ISO 17025 uyumluluğu sağlandı</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Tüm modüller aktif</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Navigasyon sistemi hazır</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-800">Sonraki Adımlar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    <span>Dashboard'u keşfedin</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    <span>Modülleri inceleyin</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                    <span>Veri girişi yapın</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🆘 Yardım</h4>
            <p className="text-sm text-blue-700">
              Herhangi bir sorunuz olursa, sayfa başlığındaki "Yardım" butonuna tıklayabilir 
              veya sistem yöneticinizle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      )
    }
  ]

  const progress = ((currentStep + 1) / steps.length) * 100
  const isLastStep = currentStep === steps.length - 1
  const isFirstStep = currentStep === 0

  const handleNext = () => {
    if (isLastStep) {
      onComplete()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSkip = () => {
    const currentStepData = steps[currentStep]
    if (currentStepData.isOptional) {
      setSkippedSteps(prev => new Set([...prev, currentStepData.id]))
      handleNext()
    }
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  const currentStepData = steps[currentStep]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5" />
            <span>ISO 17025 Sistem Rehberi</span>
          </DialogTitle>
          <DialogDescription>
            Adım {currentStep + 1} / {steps.length}: {currentStepData.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>İlerleme</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Navigation */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={cn(
                  "flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  index === currentStep
                    ? "bg-blue-100 text-blue-800"
                    : completedSteps.has(step.id)
                    ? "bg-green-100 text-green-800"
                    : skippedSteps.has(step.id)
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <div className="flex items-center space-x-2">
                  {completedSteps.has(step.id) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : skippedSteps.has(step.id) ? (
                    <Skip className="w-4 h-4" />
                  ) : (
                    <step.icon className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">{step.title}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Step Content */}
          <div className="min-h-[400px]">
            {currentStepData.content}
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstStep}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Önceki
            </Button>
            
            {currentStepData.isOptional && (
              <Button
                variant="ghost"
                onClick={handleSkip}
              >
                <Skip className="w-4 h-4 mr-2" />
                Atla
              </Button>
            )}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Kapat
            </Button>
            
            <Button onClick={handleNext}>
              {isLastStep ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tamamla
                </>
              ) : (
                <>
                  {isLastStep ? "Tamamla" : "Sonraki"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
