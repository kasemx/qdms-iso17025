// Performans Optimizasyonları ve Monitoring
// ISO 17025 uyumlu performans yönetimi

export interface PerformanceMetric {
  id: string
  name: string
  value: number
  unit: string
  timestamp: string
  category: 'page_load' | 'api_response' | 'user_interaction' | 'memory_usage'
  module: string
}

export interface PerformanceConfig {
  enableMonitoring: boolean
  sampleRate: number
  maxMetrics: number
  alertThresholds: {
    pageLoad: number // ms
    apiResponse: number // ms
    memoryUsage: number // MB
  }
}

// Performans konfigürasyonu
export const performanceConfig: PerformanceConfig = {
  enableMonitoring: true,
  sampleRate: 0.1, // %10 örnekleme
  maxMetrics: 1000,
  alertThresholds: {
    pageLoad: 3000, // 3 saniye
    apiResponse: 2000, // 2 saniye
    memoryUsage: 100 // 100 MB
  }
}

// Performans metrikleri
class PerformanceMonitor {
  private metrics: PerformanceMetric[] = []
  private config: PerformanceConfig = performanceConfig

  // Sayfa yükleme süresini ölç
  measurePageLoad(pageName: string): void {
    if (!this.config.enableMonitoring || Math.random() > this.config.sampleRate) {
      return
    }

    const startTime = performance.now()
    
    window.addEventListener('load', () => {
      const endTime = performance.now()
      const loadTime = endTime - startTime
      
      this.addMetric({
        id: `page_load_${Date.now()}`,
        name: 'Page Load Time',
        value: loadTime,
        unit: 'ms',
        timestamp: new Date().toISOString(),
        category: 'page_load',
        module: pageName
      })

      // Eşik kontrolü
      if (loadTime > this.config.alertThresholds.pageLoad) {
        console.warn(`Slow page load detected: ${pageName} took ${loadTime.toFixed(2)}ms`)
      }
    })
  }

  // API yanıt süresini ölç
  async measureApiCall<T>(
    apiName: string,
    apiCall: () => Promise<T>,
    module: string
  ): Promise<T> {
    if (!this.config.enableMonitoring || Math.random() > this.config.sampleRate) {
      return apiCall()
    }

    const startTime = performance.now()
    
    try {
      const result = await apiCall()
      const endTime = performance.now()
      const responseTime = endTime - startTime
      
      this.addMetric({
        id: `api_${Date.now()}`,
        name: `API Call: ${apiName}`,
        value: responseTime,
        unit: 'ms',
        timestamp: new Date().toISOString(),
        category: 'api_response',
        module
      })

      // Eşik kontrolü
      if (responseTime > this.config.alertThresholds.apiResponse) {
        console.warn(`Slow API call detected: ${apiName} took ${responseTime.toFixed(2)}ms`)
      }

      return result
    } catch (error) {
      const endTime = performance.now()
      const responseTime = endTime - startTime
      
      this.addMetric({
        id: `api_error_${Date.now()}`,
        name: `API Error: ${apiName}`,
        value: responseTime,
        unit: 'ms',
        timestamp: new Date().toISOString(),
        category: 'api_response',
        module
      })

      throw error
    }
  }

  // Kullanıcı etkileşim süresini ölç
  measureUserInteraction(interactionName: string, module: string): () => void {
    if (!this.config.enableMonitoring || Math.random() > this.config.sampleRate) {
      return () => {}
    }

    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const interactionTime = endTime - startTime
      
      this.addMetric({
        id: `interaction_${Date.now()}`,
        name: `User Interaction: ${interactionName}`,
        value: interactionTime,
        unit: 'ms',
        timestamp: new Date().toISOString(),
        category: 'user_interaction',
        module
      })
    }
  }

  // Bellek kullanımını ölç
  measureMemoryUsage(module: string): void {
    if (!this.config.enableMonitoring || !('memory' in performance)) {
      return
    }

    const memory = (performance as any).memory
    if (memory) {
      const usedMemory = memory.usedJSHeapSize / 1024 / 1024 // MB'ye çevir
      
      this.addMetric({
        id: `memory_${Date.now()}`,
        name: 'Memory Usage',
        value: usedMemory,
        unit: 'MB',
        timestamp: new Date().toISOString(),
        category: 'memory_usage',
        module
      })

      // Eşik kontrolü
      if (usedMemory > this.config.alertThresholds.memoryUsage) {
        console.warn(`High memory usage detected: ${module} using ${usedMemory.toFixed(2)}MB`)
      }
    }
  }

  // Metrik ekle
  private addMetric(metric: PerformanceMetric): void {
    this.metrics.push(metric)
    
    // Maksimum metrik sayısını kontrol et
    if (this.metrics.length > this.config.maxMetrics) {
      this.metrics = this.metrics.slice(-this.config.maxMetrics)
    }
  }

  // Metrikleri al
  getMetrics(module?: string, category?: string): PerformanceMetric[] {
    let filtered = this.metrics

    if (module) {
      filtered = filtered.filter(m => m.module === module)
    }

    if (category) {
      filtered = filtered.filter(m => m.category === category)
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }

  // Performans özeti al
  getPerformanceSummary(module?: string): {
    averagePageLoad: number
    averageApiResponse: number
    averageMemoryUsage: number
    totalInteractions: number
    slowestOperation: PerformanceMetric | null
  } {
    const metrics = this.getMetrics(module)
    
    const pageLoadMetrics = metrics.filter(m => m.category === 'page_load')
    const apiMetrics = metrics.filter(m => m.category === 'api_response')
    const memoryMetrics = metrics.filter(m => m.category === 'memory_usage')
    const interactionMetrics = metrics.filter(m => m.category === 'user_interaction')

    const averagePageLoad = pageLoadMetrics.length > 0 
      ? pageLoadMetrics.reduce((sum, m) => sum + m.value, 0) / pageLoadMetrics.length 
      : 0

    const averageApiResponse = apiMetrics.length > 0 
      ? apiMetrics.reduce((sum, m) => sum + m.value, 0) / apiMetrics.length 
      : 0

    const averageMemoryUsage = memoryMetrics.length > 0 
      ? memoryMetrics.reduce((sum, m) => sum + m.value, 0) / memoryMetrics.length 
      : 0

    const totalInteractions = interactionMetrics.length

    const slowestOperation = metrics.length > 0 
      ? metrics.reduce((slowest, current) => current.value > slowest.value ? current : slowest)
      : null

    return {
      averagePageLoad,
      averageApiResponse,
      averageMemoryUsage,
      totalInteractions,
      slowestOperation
    }
  }

  // Metrikleri temizle
  clearMetrics(): void {
    this.metrics = []
  }

  // Konfigürasyonu güncelle
  updateConfig(newConfig: Partial<PerformanceConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}

// Global performans monitörü
export const performanceMonitor = new PerformanceMonitor()

// Performans yardımcı fonksiyonları
export const performanceHelpers = {
  // Sayfa yükleme performansını ölç
  measurePageLoad: (pageName: string) => {
    performanceMonitor.measurePageLoad(pageName)
  },

  // API çağrısı performansını ölç
  measureApiCall: <T>(apiName: string, apiCall: () => Promise<T>, module: string) => {
    return performanceMonitor.measureApiCall(apiName, apiCall, module)
  },

  // Kullanıcı etkileşim performansını ölç
  measureUserInteraction: (interactionName: string, module: string) => {
    return performanceMonitor.measureUserInteraction(interactionName, module)
  },

  // Bellek kullanımını ölç
  measureMemoryUsage: (module: string) => {
    performanceMonitor.measureMemoryUsage(module)
  },

  // Performans metriklerini al
  getMetrics: (module?: string, category?: string) => {
    return performanceMonitor.getMetrics(module, category)
  },

  // Performans özetini al
  getPerformanceSummary: (module?: string) => {
    return performanceMonitor.getPerformanceSummary(module)
  },

  // Metrikleri temizle
  clearMetrics: () => {
    performanceMonitor.clearMetrics()
  }
}

// Performans optimizasyon fonksiyonları
export const performanceOptimizations = {
  // Lazy loading için component wrapper
  lazyLoad: <T extends React.ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
    fallback?: React.ComponentType
  ) => {
    return React.lazy(importFunc)
  },

  // Debounce fonksiyonu
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  // Throttle fonksiyonu
  throttle: <T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  },

  // Memoization için useMemo wrapper
  memoize: <T extends (...args: any[]) => any>(func: T): T => {
    const cache = new Map()
    return ((...args: Parameters<T>) => {
      const key = JSON.stringify(args)
      if (cache.has(key)) {
        return cache.get(key)
      }
      const result = func(...args)
      cache.set(key, result)
      return result
    }) as T
  }
}

// Performans raporu oluşturucu
export const generatePerformanceReport = (module?: string): {
  summary: ReturnType<typeof performanceMonitor.getPerformanceSummary>
  recommendations: string[]
  alerts: string[]
} => {
  const summary = performanceMonitor.getPerformanceSummary(module)
  const recommendations: string[] = []
  const alerts: string[] = []

  // Performans önerileri
  if (summary.averagePageLoad > 2000) {
    recommendations.push('Sayfa yükleme süresini iyileştirmek için lazy loading kullanın')
  }

  if (summary.averageApiResponse > 1000) {
    recommendations.push('API yanıt sürelerini iyileştirmek için caching uygulayın')
  }

  if (summary.averageMemoryUsage > 50) {
    recommendations.push('Bellek kullanımını azaltmak için componentları optimize edin')
  }

  // Uyarılar
  if (summary.averagePageLoad > performanceConfig.alertThresholds.pageLoad) {
    alerts.push(`Sayfa yükleme süresi çok yüksek: ${summary.averagePageLoad.toFixed(2)}ms`)
  }

  if (summary.averageApiResponse > performanceConfig.alertThresholds.apiResponse) {
    alerts.push(`API yanıt süresi çok yüksek: ${summary.averageApiResponse.toFixed(2)}ms`)
  }

  if (summary.averageMemoryUsage > performanceConfig.alertThresholds.memoryUsage) {
    alerts.push(`Bellek kullanımı çok yüksek: ${summary.averageMemoryUsage.toFixed(2)}MB`)
  }

  return {
    summary,
    recommendations,
    alerts
  }
}
