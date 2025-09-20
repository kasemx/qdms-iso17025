/**
 * Modern Page Template
 * @description .qoder/rules/modern-design-standardi.md kurallarına uygun sayfa template'i
 * Bu template tüm yeni sayfalar için kullanılmalıdır
 */

"use client"

import { useState, useEffect } from 'react'
import { 
  ModernPageLayout, 
  ModernButton, 
  ModernCard, 
  ModernMetricCard,
  ModernSearchBox,
  ModernLoadingSpinner,
  ModernBadge
} from '@/components/ui/modern'
import { Plus, FileText, Users, Activity, TrendingUp } from 'lucide-react'

interface TemplatePageProps {
  title: string
  description: string
}

export default function ModernPageTemplate({ 
  title = "Modern Sayfa",
  description = "Modern tasarım sistemi ile oluşturulmuş sayfa" 
}: TemplatePageProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setData([
        { id: 1, name: "Örnek Veri 1", status: "active" },
        { id: 2, name: "Örnek Veri 2", status: "pending" },
        { id: 3, name: "Örnek Veri 3", status: "completed" }
      ])
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ModernPageLayout
      title={title}
      description={description}
      actions={
        <div className="flex items-center space-x-3">
          <ModernButton variant="secondary">
            İkincil Buton
          </ModernButton>
          <ModernButton variant="primary" icon={<Plus className="h-4 w-4" />}>
            Ana Eylem
          </ModernButton>
        </div>
      }
    >
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <ModernMetricCard
          icon={FileText}
          title="Toplam Öğe"
          value="1,234"
          change="+12%"
          changeType="increase"
          color="blue"
        />
        <ModernMetricCard
          icon={Users}
          title="Aktif Kullanıcı"
          value="856"
          change="+8%"
          changeType="increase"
          color="green"
        />
        <ModernMetricCard
          icon={Activity}
          title="İşlem Sayısı"
          value="456"
          change="-3%"
          changeType="decrease"
          color="orange"
        />
        <ModernMetricCard
          icon={TrendingUp}
          title="Başarı Oranı"
          value="98.5%"
          change="+2%"
          changeType="increase"
          color="purple"
        />
      </div>

      {/* Search and Filters */}
      <ModernCard className="p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <ModernSearchBox
            placeholder="Arama yapın..."
            className="flex-1 max-w-md"
            onSearch={(value) => console.log("Search:", value)}
          />
          <div className="flex items-center space-x-3">
            <ModernBadge variant="info">
              {data.length} Sonuç
            </ModernBadge>
            <ModernButton variant="glass" size="sm">
              Filtreler
            </ModernButton>
          </div>
        </div>
      </ModernCard>

      {/* Content Section */}
      <ModernCard className="p-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              İçerik Bölümü
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Bu bölümde sayfa içeriği yer alır. Modern tasarım kurallarına uygun olarak hazırlanmıştır.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <ModernLoadingSpinner size="lg" text="Yükleniyor..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((item) => (
                <ModernCard key={item.id} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h3>
                      <ModernBadge 
                        variant={
                          item.status === 'active' ? 'success' :
                          item.status === 'pending' ? 'warning' : 'info'
                        }
                        size="sm"
                      >
                        {item.status}
                      </ModernBadge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Örnek açıklama metni. Modern tasarım kurallarına uygun typography.
                    </p>
                    <div className="flex items-center space-x-2">
                      <ModernButton variant="primary" size="sm">
                        Görüntüle
                      </ModernButton>
                      <ModernButton variant="secondary" size="sm">
                        Düzenle
                      </ModernButton>
                    </div>
                  </div>
                </ModernCard>
              ))}
            </div>
          )}
        </div>
      </ModernCard>

      {/* Additional Info */}
      <ModernCard className="p-6 mt-8">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Modern Tasarım Kuralları
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Bu sayfa .qoder/rules/modern-design-standardi.md kurallarına uygun olarak oluşturulmuştur. 
            Tüm yeni sayfalar bu template'i baz alarak geliştirilmelidir.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <ModernBadge variant="success">Glass Morphism ✓</ModernBadge>
            <ModernBadge variant="info">Modern Animations ✓</ModernBadge>
            <ModernBadge variant="success">Responsive Design ✓</ModernBadge>
            <ModernBadge variant="info">Dark Mode ✓</ModernBadge>
          </div>
        </div>
      </ModernCard>
    </ModernPageLayout>
  )
}