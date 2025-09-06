// Modül Entegrasyonları ve Veri Akışı Yönetimi
// ISO 17025 uyumlu modül entegrasyonları

export interface IntegrationEvent {
  id: string
  source: string
  target: string
  eventType: string
  data: any
  timestamp: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
}

export interface ModuleIntegration {
  id: string
  name: string
  sourceModule: string
  targetModule: string
  integrationType: 'data_sync' | 'workflow_trigger' | 'notification' | 'reporting'
  isActive: boolean
  config: Record<string, any>
  lastSync: string
  status: 'active' | 'inactive' | 'error'
}

// Modül Entegrasyon Konfigürasyonları
export const moduleIntegrations: ModuleIntegration[] = [
  {
    id: 'int-001',
    name: 'Personel-Ekipman Entegrasyonu',
    sourceModule: 'personnel',
    targetModule: 'equipment',
    integrationType: 'data_sync',
    isActive: true,
    config: {
      syncPersonnelToEquipment: true,
      updateEquipmentResponsible: true,
      syncTrainingRecords: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-002',
    name: 'Ekipman-Kalibrasyon Entegrasyonu',
    sourceModule: 'equipment',
    targetModule: 'calibration',
    integrationType: 'workflow_trigger',
    isActive: true,
    config: {
      autoCreateCalibrationSchedule: true,
      notifyBeforeExpiry: 30, // days
      autoGenerateCalibrationRecords: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-003',
    name: 'Risk-CAPA Entegrasyonu',
    sourceModule: 'risk-management',
    targetModule: 'capa-system',
    integrationType: 'workflow_trigger',
    isActive: true,
    config: {
      autoCreateCAPAFromHighRisk: true,
      riskLevelThreshold: 'high',
      includeRiskDetails: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-004',
    name: 'Şikayet-CAPA Entegrasyonu',
    sourceModule: 'customer-complaints',
    targetModule: 'capa-system',
    integrationType: 'workflow_trigger',
    isActive: true,
    config: {
      autoCreateCAPAFromComplaints: true,
      complaintSeverityThreshold: 'high',
      includeComplaintDetails: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-005',
    name: 'Denetim-CAPA Entegrasyonu',
    sourceModule: 'internal-audit',
    targetModule: 'capa-system',
    integrationType: 'workflow_trigger',
    isActive: true,
    config: {
      autoCreateCAPAFromFindings: true,
      findingSeverityThreshold: 'majör',
      includeAuditDetails: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-006',
    name: 'Test-Numune Entegrasyonu',
    sourceModule: 'test-jobs',
    targetModule: 'sample-management',
    integrationType: 'data_sync',
    isActive: true,
    config: {
      syncTestResults: true,
      updateSampleStatus: true,
      linkTestToSample: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-007',
    name: 'Yeterlilik Test-Personel Entegrasyonu',
    sourceModule: 'proficiency-tests',
    targetModule: 'personnel',
    integrationType: 'data_sync',
    isActive: true,
    config: {
      updatePersonnelCompetency: true,
      syncTestResults: true,
      updateTrainingRecords: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  },
  {
    id: 'int-008',
    name: 'Dashboard-All Modules Entegrasyonu',
    sourceModule: 'all',
    targetModule: 'dashboard',
    integrationType: 'reporting',
    isActive: true,
    config: {
      realTimeDataSync: true,
      autoRefreshInterval: 300, // seconds
      includeAllMetrics: true
    },
    lastSync: '2024-03-15T10:30:00Z',
    status: 'active'
  }
]

// Entegrasyon Event Yönetimi
export class IntegrationManager {
  private events: IntegrationEvent[] = []
  private integrations: ModuleIntegration[] = moduleIntegrations

  // Event oluştur
  createEvent(source: string, target: string, eventType: string, data: any): IntegrationEvent {
    const event: IntegrationEvent = {
      id: `evt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      source,
      target,
      eventType,
      data,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }
    
    this.events.push(event)
    this.processEvent(event)
    return event
  }

  // Event işle
  private async processEvent(event: IntegrationEvent): Promise<void> {
    try {
      event.status = 'processing'
      
      const integration = this.integrations.find(
        int => int.sourceModule === event.source && int.targetModule === event.target
      )

      if (!integration || !integration.isActive) {
        throw new Error(`Integration not found or inactive: ${event.source} -> ${event.target}`)
      }

      // Event tipine göre işlem yap
      switch (integration.integrationType) {
        case 'data_sync':
          await this.handleDataSync(event, integration)
          break
        case 'workflow_trigger':
          await this.handleWorkflowTrigger(event, integration)
          break
        case 'notification':
          await this.handleNotification(event, integration)
          break
        case 'reporting':
          await this.handleReporting(event, integration)
          break
      }

      event.status = 'completed'
      integration.lastSync = new Date().toISOString()
    } catch (error) {
      event.status = 'failed'
      console.error('Integration event processing failed:', error)
    }
  }

  // Veri senkronizasyonu
  private async handleDataSync(event: IntegrationEvent, integration: ModuleIntegration): Promise<void> {
    console.log(`Data sync: ${event.source} -> ${event.target}`, event.data)
    
    // Mock data sync implementation
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  // İş akışı tetikleme
  private async handleWorkflowTrigger(event: IntegrationEvent, integration: ModuleIntegration): Promise<void> {
    console.log(`Workflow trigger: ${event.source} -> ${event.target}`, event.data)
    
    // Mock workflow trigger implementation
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  // Bildirim gönderme
  private async handleNotification(event: IntegrationEvent, integration: ModuleIntegration): Promise<void> {
    console.log(`Notification: ${event.source} -> ${event.target}`, event.data)
    
    // Mock notification implementation
    await new Promise(resolve => setTimeout(resolve, 150))
  }

  // Raporlama
  private async handleReporting(event: IntegrationEvent, integration: ModuleIntegration): Promise<void> {
    console.log(`Reporting: ${event.source} -> ${event.target}`, event.data)
    
    // Mock reporting implementation
    await new Promise(resolve => setTimeout(resolve, 300))
  }

  // Entegrasyon durumunu al
  getIntegrationStatus(moduleId: string): ModuleIntegration[] {
    return this.integrations.filter(int => 
      int.sourceModule === moduleId || int.targetModule === moduleId
    )
  }

  // Event geçmişini al
  getEventHistory(limit: number = 50): IntegrationEvent[] {
    return this.events
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit)
  }

  // Entegrasyonu aktif/pasif yap
  toggleIntegration(integrationId: string, isActive: boolean): void {
    const integration = this.integrations.find(int => int.id === integrationId)
    if (integration) {
      integration.isActive = isActive
      integration.status = isActive ? 'active' : 'inactive'
    }
  }

  // Entegrasyon konfigürasyonunu güncelle
  updateIntegrationConfig(integrationId: string, config: Record<string, any>): void {
    const integration = this.integrations.find(int => int.id === integrationId)
    if (integration) {
      integration.config = { ...integration.config, ...config }
    }
  }
}

// Global entegrasyon yöneticisi
export const integrationManager = new IntegrationManager()

// Entegrasyon yardımcı fonksiyonları
export const integrationHelpers = {
  // Personel değişikliğinde ekipman güncelle
  onPersonnelUpdate: (personnelId: string, data: any) => {
    integrationManager.createEvent('personnel', 'equipment', 'personnel_updated', {
      personnelId,
      data
    })
  },

  // Ekipman kalibrasyon süresi dolduğunda bildirim
  onEquipmentCalibrationDue: (equipmentId: string, dueDate: string) => {
    integrationManager.createEvent('equipment', 'calibration', 'calibration_due', {
      equipmentId,
      dueDate
    })
  },

  // Yüksek risk tespit edildiğinde CAPA oluştur
  onHighRiskDetected: (riskId: string, riskData: any) => {
    integrationManager.createEvent('risk-management', 'capa-system', 'high_risk_detected', {
      riskId,
      riskData
    })
  },

  // Şikayet çözüldüğünde CAPA oluştur
  onComplaintResolved: (complaintId: string, complaintData: any) => {
    integrationManager.createEvent('customer-complaints', 'capa-system', 'complaint_resolved', {
      complaintId,
      complaintData
    })
  },

  // Denetim bulgusu tespit edildiğinde CAPA oluştur
  onAuditFinding: (auditId: string, findingData: any) => {
    integrationManager.createEvent('internal-audit', 'capa-system', 'audit_finding', {
      auditId,
      findingData
    })
  },

  // Test tamamlandığında numune durumunu güncelle
  onTestCompleted: (testId: string, sampleId: string, results: any) => {
    integrationManager.createEvent('test-jobs', 'sample-management', 'test_completed', {
      testId,
      sampleId,
      results
    })
  },

  // Yeterlilik testi sonucunda personel güncelle
  onProficiencyTestCompleted: (testId: string, participantId: string, results: any) => {
    integrationManager.createEvent('proficiency-tests', 'personnel', 'proficiency_completed', {
      testId,
      participantId,
      results
    })
  },

  // Dashboard verilerini güncelle
  onDataChange: (moduleId: string, data: any) => {
    integrationManager.createEvent(moduleId, 'dashboard', 'data_changed', {
      moduleId,
      data
    })
  }
}

// ISO 17025 uyumluluk kontrolleri
export const complianceChecks = {
  // Tüm modüllerin aktif olup olmadığını kontrol et
  checkAllModulesActive: (): boolean => {
    return moduleIntegrations.every(int => int.isActive && int.status === 'active')
  },

  // Kritik entegrasyonların çalışıp çalışmadığını kontrol et
  checkCriticalIntegrations: (): boolean => {
    const criticalIntegrations = ['int-001', 'int-002', 'int-003', 'int-004', 'int-005']
    return criticalIntegrations.every(id => {
      const integration = moduleIntegrations.find(int => int.id === id)
      return integration?.isActive && integration?.status === 'active'
    })
  },

  // Son senkronizasyon tarihlerini kontrol et
  checkLastSyncDates: (maxHours: number = 24): boolean => {
    const maxTime = maxHours * 60 * 60 * 1000 // Convert to milliseconds
    const now = new Date().getTime()
    
    return moduleIntegrations.every(int => {
      const lastSync = new Date(int.lastSync).getTime()
      return (now - lastSync) <= maxTime
    })
  },

  // Genel uyumluluk skoru hesapla
  calculateComplianceScore: (): number => {
    let score = 0
    let totalChecks = 0

    // Modül aktiflik kontrolü
    totalChecks++
    if (complianceChecks.checkAllModulesActive()) score++

    // Kritik entegrasyon kontrolü
    totalChecks++
    if (complianceChecks.checkCriticalIntegrations()) score++

    // Senkronizasyon kontrolü
    totalChecks++
    if (complianceChecks.checkLastSyncDates()) score++

    return Math.round((score / totalChecks) * 100)
  }
}
