// Mock data servisi - Frontend için örnek veriler

// Interface tanımları
export interface OrganizationUnit {
  id: string
  name: string
  code: string
  parentId?: string
  level: number
  type: string
  managerId: string
  managerName: string
  description: string
  responsibilities: string[]
  objectives: string[]
  kpis: string[]
  budget: number
  employeeCount: number
  status: string
  establishedDate: string
  lastReviewDate: string
  nextReviewDate: string
  reportingStructure: string
  decisionMakingAuthority: string
  resourceAllocation: string
  performanceMetrics: {
    efficiency: number
    quality: number
    compliance: number
    innovation: number
  }
}

export interface Employee {
  id: string
  name: string
  position: string
  department: string
  level: number
  managerId?: string
  managerName?: string
  responsibilities: string[]
  skills: string[]
  performance: number
  status: string
  joinDate: string
  lastPromotion?: string
  nextReview?: string
}

export interface CalibrationRecord {
  id: string
  equipmentId: string
  equipmentName: string
  calibrationDate: string
  calibratedBy: string
  certificateNumber: string
  nextDueDate: string
  status: string
  results: string
  uncertainty: string
  environmentalConditions: {
    temperature: string
    humidity: string
  }
  attachments: string[]
  cost: number
  responsible: string
}

export interface ImpartialityRecord {
  id: string
  type: string
  title: string
  description: string
  riskLevel: string
  status: string
  reportedBy: string
  reportedDate: string
  assignedTo: string
  dueDate: string
  resolution: string
  mitigationMeasures: string[]
  attachments: string[]
  isResolved: boolean
  resolvedDate?: string
}

export const mockData = {
  departments: [
    {
      id: "dept-001",
      name: "Genel Müdürlük",
      code: "GM",
      level: 1,
      parentId: null,
      manager: "Dr. Mehmet Özkan",
      managerId: "emp-001",
      description: "Şirket genel yönetimi ve stratejik planlama",
      responsibilities: [
        "Stratejik planlama ve yönetim",
        "Genel müdürlük kararları",
        "Dış ilişkiler ve ortaklıklar"
      ],
      employees: 3,
      budget: 5000000,
      color: "#3B82F6"
    },
    {
      id: "dept-002",
      name: "Kalite Yönetimi",
      code: "KY",
      level: 2,
      parentId: "dept-001",
      manager: "Ahmet Yılmaz",
      managerId: "emp-002",
      description: "Kalite sistem yönetimi ve ISO 17025 uyumluluğu",
      responsibilities: [
        "Kalite sistem yönetimi",
        "ISO 17025 uyumluluk",
        "Doküman kontrolü",
        "İç denetim"
      ],
      employees: 8,
      budget: 1200000,
      color: "#10B981"
    },
    {
      id: "dept-003",
      name: "Laboratuvar Hizmetleri",
      code: "LH",
      level: 2,
      parentId: "dept-001",
      manager: "Fatma Demir",
      managerId: "emp-003",
      description: "Test hizmetleri ve laboratuvar operasyonları",
      responsibilities: [
        "Test hizmetleri sunumu",
        "Numune yönetimi",
        "Test metotları geliştirme",
        "Kalite kontrol"
      ],
      employees: 15,
      budget: 2500000,
      color: "#8B5CF6"
    },
    {
      id: "dept-004",
      name: "Teknik Hizmetler",
      code: "TH",
      level: 2,
      parentId: "dept-001",
      manager: "Mehmet Kaya",
      managerId: "emp-004",
      description: "Teknik destek ve ekipman yönetimi",
      responsibilities: [
        "Ekipman bakım ve kalibrasyon",
        "Teknik destek",
        "Metot validasyonu",
        "AR-GE projeleri"
      ],
      employees: 6,
      budget: 800000,
      color: "#F59E0B"
    },
    {
      id: "dept-005",
      name: "İnsan Kaynakları",
      code: "İK",
      level: 2,
      parentId: "dept-001",
      manager: "Ali Çelik",
      managerId: "emp-005",
      description: "Personel yönetimi ve eğitim",
      responsibilities: [
        "Personel yönetimi",
        "Eğitim planlama",
        "Performans değerlendirme",
        "İşe alım süreçleri"
      ],
      employees: 4,
      budget: 600000,
      color: "#EF4444"
    },
    {
      id: "dept-006",
      name: "Mali İşler",
      code: "Mİ",
      level: 2,
      parentId: "dept-001",
      manager: "Ayşe Yıldız",
      managerId: "emp-006",
      description: "Mali yönetim ve muhasebe",
      responsibilities: [
        "Mali raporlama",
        "Bütçe yönetimi",
        "Muhasebe işlemleri",
        "Mali analiz"
      ],
      employees: 3,
      budget: 400000,
      color: "#06B6D4"
    }
  ],

  documents: [
    {
      id: "doc-001",
      code: "POL-001",
      title: "Kalite Politikası",
      category: { id: "pol", code: "POL", name: "Politikalar", color: "#3B82F6", icon: "Shield" },
      version: "v2.1",
      status: "approved",
      description: "Laboratuvar kalite politikası ve hedefleri",
      content: "Kalite politikası içeriği...",
      author: "Ahmet Yılmaz",
      reviewer: "Fatma Demir",
      approver: "Genel Müdür",
      createdAt: "2024-01-15",
      updatedAt: "2024-03-15",
      publishedAt: "2024-03-20",
      nextReviewDate: "2025-03-15",
      distributionList: ["Tüm Personel"],
      relatedDocuments: ["PRO-001", "PRO-002"],
      tags: ["kalite", "politika", "yönetim"],
      fileSize: 245760,
      fileType: "pdf",
      isActive: true
    },
    {
      id: "doc-002",
      code: "PRO-001",
      title: "Doküman Kontrol Prosedürü",
      category: { id: "pro", code: "PRO", name: "Prosedürler", color: "#10B981", icon: "FileText" },
      version: "v3.2",
      status: "approved",
      description: "Doküman oluşturma, onaylama ve dağıtım prosedürü",
      content: "Doküman kontrol prosedürü içeriği...",
      author: "Fatma Demir",
      reviewer: "Ahmet Yılmaz",
      approver: "Kalite Müdürü",
      createdAt: "2024-01-10",
      updatedAt: "2024-03-20",
      publishedAt: "2024-03-25",
      nextReviewDate: "2025-03-20",
      distributionList: ["Kalite Ekibi", "Yönetim"],
      relatedDocuments: ["POL-001", "FOR-001"],
      tags: ["doküman", "kontrol", "prosedür"],
      fileSize: 456320,
      fileType: "pdf",
      isActive: true
    },
    {
      id: "doc-003",
      code: "TAL-001",
      title: "Test Metodu Talimatı",
      category: { id: "tal", code: "TAL", name: "Talimatlar", color: "#F59E0B", icon: "BookOpen" },
      version: "v1.5",
      status: "approved",
      description: "Laboratuvar test metotları ve uygulama talimatı",
      content: "Test metodu talimatı içeriği...",
      author: "Mehmet Kaya",
      reviewer: "Ahmet Yılmaz",
      approver: "Teknik Müdür",
      createdAt: "2024-02-01",
      updatedAt: "2024-03-18",
      publishedAt: "2024-03-22",
      nextReviewDate: "2025-03-18",
      distributionList: ["Teknik Ekip", "Test Personeli"],
      relatedDocuments: ["PRO-001", "FOR-002"],
      tags: ["test", "metod", "talimat"],
      fileSize: 678912,
      fileType: "pdf",
      isActive: true
    }
  ],

  users: [
    {
      id: "user-001",
      firstName: "Ahmet",
      lastName: "Yılmaz",
      email: "ahmet.yilmaz@company.com",
      department: "Kalite Yönetimi",
      position: "Kalite Müdürü",
      role: "Admin",
      status: "pending",
      lastLogin: "2024-03-15T10:30:00Z"
    },
    {
      id: "user-002",
      firstName: "Fatma",
      lastName: "Demir", 
      email: "fatma.demir@company.com",
      department: "Laboratuvar Hizmetleri",
      position: "Laboratuvar Müdürü",
      role: "Editor",
      status: "pending",
      lastLogin: "2024-03-14T14:20:00Z"
    },
    {
      id: "user-003",
      firstName: "Mehmet",
      lastName: "Kaya",
      email: "mehmet.kaya@company.com", 
      department: "Teknik Hizmetler",
      position: "Teknik Müdür",
      role: "Viewer",
      status: "pending",
      lastLogin: "2024-03-15T09:15:00Z"
    }
  ],

  approvals: [
    {
      id: "app-001",
      documentTitle: "Kalite El Kitabı",
      documentType: "Politika",
      requester: "Ahmet Yılmaz",
      department: "Kalite Yönetimi",
      submittedDate: "2024-03-10",
      status: "Onaylandı",
      approver: "Dr. Mehmet Özkan",
      approvedDate: "2024-03-12"
    },
    {
      id: "app-002",
      documentTitle: "Eğitim Planı 2024",
      documentType: "Prosedür", 
      requester: "Fatma Demir",
      department: "Laboratuvar Hizmetleri",
      submittedDate: "2024-03-08",
      status: "Beklemede",
      approver: "İK Müdürü",
      approvedDate: null
    }
  ],

  workflows: [
    {
      id: "wf-001",
      name: "Doküman Onay Süreci",
      description: "Yeni dokümanların onay süreci",
      status: "pending",
      steps: 3,
      averageTime: "2 gün",
      lastUsed: "2024-03-15",
      initiator: "Ahmet Yılmaz",
      currentStep: "Kalite Müdürü Onayı",
      priority: "high",
      createdAt: "2024-01-15 10:30",
      dueDate: "2024-01-20 17:00",
      approvers: ["Fatma Demir", "Mehmet Kaya"]
    },
    {
      id: "wf-002", 
      name: "Eğitim Planı Onayı",
      description: "Eğitim planlarının onay süreci",
      status: "pending",
      steps: 2,
      averageTime: "1 gün",
      lastUsed: "2024-03-10",
      initiator: "Fatma Demir",
      currentStep: "İK Müdürü Onayı",
      priority: "medium",
      createdAt: "2024-01-10 14:20",
      dueDate: "2024-01-15 16:00",
      approvers: ["Ahmet Yılmaz", "Dr. Mehmet Özkan"]
    },
    {
      id: "wf-003",
      name: "Üretim Prosedürü Onayı",
      description: "Üretim prosedürlerinin onay süreci",
      status: "pending",
      steps: 4,
      averageTime: "3 gün",
      lastUsed: "2024-03-12",
      initiator: "Mehmet Kaya",
      currentStep: "Teknik Müdür Onayı",
      priority: "high",
      createdAt: "2024-01-12 09:15",
      dueDate: "2024-01-18 12:00",
      approvers: ["Ahmet Yılmaz", "Fatma Demir", "Dr. Mehmet Özkan"]
    }
  ],


  // Doküman İstatistikleri
  documentStats: {
    totalDocuments: 156,
    activeDocuments: 125,
    draftDocuments: 12,
    reviewDocuments: 8,
    archivedDocuments: 9,
    cancelledDocuments: 2,
    totalCategories: 8,
    totalVersions: 342,
    averageReviewTime: "3.2 gün",
    complianceRate: 94.2
  },

  // Kategori İstatistikleri
  categoryStats: [
    { category: "Politikalar", count: 8, percentage: 5.1, trend: "stable" },
    { category: "Prosedürler", count: 24, percentage: 15.4, trend: "up" },
    { category: "Talimatlar", count: 18, percentage: 11.5, trend: "stable" },
    { category: "Formlar", count: 32, percentage: 20.5, trend: "up" },
    { category: "Kayıtlar", count: 45, percentage: 28.8, trend: "up" },
    { category: "Test Metotları", count: 15, percentage: 9.6, trend: "stable" },
    { category: "Kalibrasyon", count: 14, percentage: 9.0, trend: "down" }
  ],

  // Arama Önerileri
  searchSuggestions: [
    "kalite politikası",
    "doküman kontrol",
    "numune yönetimi",
    "kalibrasyon prosedürü",
    "test metotları",
    "iç denetim",
    "müşteri şikayetleri",
    "risk yönetimi",
    "personel eğitimi",
    "ekipman yönetimi"
  ],

  // Kalibrasyon Programı Verileri
  calibrationPrograms: [
    {
      id: "cal-001",
      equipmentId: "eq-001",
      equipmentName: "Analitik Terazi",
      equipmentCode: "EQ-001",
      calibrationType: "Rutin Kalibrasyon",
      frequency: "6 ay",
      lastCalibration: "2024-01-15",
      nextCalibration: "2024-07-15",
      status: "scheduled",
      responsible: "Ahmet Yılmaz",
      supplier: "ABC Kalibrasyon Ltd.",
      cost: 2500,
      priority: "high",
      notes: "Kritik ekipman - öncelikli kalibrasyon"
    },
    {
      id: "cal-002",
      equipmentId: "eq-002",
      equipmentName: "pH Metre",
      equipmentCode: "EQ-002",
      calibrationType: "Rutin Kalibrasyon",
      frequency: "3 ay",
      lastCalibration: "2024-02-20",
      nextCalibration: "2024-05-20",
      status: "overdue",
      responsible: "Fatma Demir",
      supplier: "XYZ Kalibrasyon A.Ş.",
      cost: 1800,
      priority: "critical",
      notes: "Süresi geçti - acil kalibrasyon gerekli"
    },
    {
      id: "cal-003",
      equipmentId: "eq-003",
      equipmentName: "Spektrofotometre",
      equipmentCode: "EQ-003",
      calibrationType: "Yıllık Kalibrasyon",
      frequency: "12 ay",
      lastCalibration: "2023-12-10",
      nextCalibration: "2024-12-10",
      status: "completed",
      responsible: "Mehmet Kaya",
      supplier: "DEF Kalibrasyon Ltd.",
      cost: 3500,
      priority: "medium",
      notes: "Yıllık kapsamlı kalibrasyon tamamlandı"
    }
  ],

  // Kalibrasyon Kayıtları Verileri
  calibrationRecords: [
    {
      id: "rec-001",
      equipmentId: "eq-001",
      equipmentName: "Analitik Terazi",
      calibrationDate: "2024-01-15",
      calibratedBy: "ABC Kalibrasyon Ltd.",
      certificateNumber: "CAL-2024-001",
      nextDueDate: "2024-07-15",
      status: "valid",
      results: "Tüm ölçümler tolerans içinde",
      uncertainty: "±0.12 mg (k=2)",
      environmentalConditions: {
        temperature: "20.5°C",
        humidity: "52% RH"
      },
      attachments: ["kalibrasyon-sertifikasi.pdf"],
      cost: 2500,
      responsible: "Ahmet Yılmaz"
    },
    {
      id: "rec-002",
      equipmentId: "eq-002",
      equipmentName: "pH Metre",
      calibrationDate: "2024-02-20",
      calibratedBy: "XYZ Kalibrasyon A.Ş.",
      certificateNumber: "CAL-2024-002",
      nextDueDate: "2024-05-20",
      status: "expired",
      results: "pH 4.0 ve 7.0 noktalarında doğrulama yapıldı",
      uncertainty: "±0.02 pH (k=2)",
      environmentalConditions: {
        temperature: "22.0°C",
        humidity: "48% RH"
      },
      attachments: ["ph-kalibrasyon-sertifikasi.pdf"],
      cost: 1800,
      responsible: "Fatma Demir"
    }
  ],

  // Tarafsızlık Yönetimi Verileri
  impartialityRecords: [
    {
      id: "imp-001",
      type: "Çıkar Çakışması",
      title: "Müşteri X ile Ticari İlişki",
      description: "Laboratuvar yöneticisinin Müşteri X firmasında hisse sahibi olması",
      riskLevel: "Yüksek",
      status: "pending",
      reportedBy: "Ahmet Yılmaz",
      reportedDate: "2024-01-15",
      assignedTo: "Kalite Müdürü",
      dueDate: "2024-02-15",
      resolution: "Yönetici hisselerini satarak çıkar çakışmasını giderdi",
      mitigationMeasures: [
        "Hisse satışı tamamlandı",
        "Yönetici bu müşteri ile ilgili kararlardan çekildi",
        "Bağımsız denetim yapıldı"
      ],
      attachments: ["hisse-satis-belgesi.pdf", "denetim-raporu.pdf"],
      isResolved: true,
      resolvedDate: "2024-02-10"
    },
    {
      id: "imp-002",
      type: "Gizlilik İhlali",
      title: "Rakip Firma Bilgi Sızıntısı",
      description: "Personelin rakip firmaya müşteri bilgilerini sızdırması",
      riskLevel: "Kritik",
      status: "İnceleme",
      reportedBy: "Fatma Demir",
      reportedDate: "2024-03-01",
      assignedTo: "İnsan Kaynakları",
      dueDate: "2024-03-15",
      resolution: "",
      mitigationMeasures: [
        "Personel işten çıkarıldı",
        "Gizlilik anlaşması ihlali için yasal işlem başlatıldı",
        "Bilgi güvenliği prosedürleri gözden geçirildi"
      ],
      attachments: ["ihlal-raporu.pdf"],
      isResolved: false,
      resolvedDate: null
    },
    {
      id: "imp-003",
      type: "Mali Çıkar",
      title: "Tedarikçi Komisyonu",
      description: "Laboratuvar personelinin tedarikçiden komisyon alması",
      riskLevel: "Orta",
      status: "Çözüldü",
      reportedBy: "Mehmet Kaya",
      reportedDate: "2024-02-20",
      assignedTo: "Kalite Müdürü",
      dueDate: "2024-03-20",
      resolution: "Personel uyarıldı ve komisyon iade edildi",
      mitigationMeasures: [
        "Komisyon iade edildi",
        "Personel eğitimi verildi",
        "Tedarikçi değiştirildi"
      ],
      attachments: ["komisyon-iade-belgesi.pdf"],
      isResolved: true,
      resolvedDate: "2024-03-15"
    }
  ],

  // Gizlilik Anlaşmaları Verileri
  confidentialityAgreements: [
    {
      id: "conf-001",
      employeeId: "emp-001",
      employeeName: "Ahmet Yılmaz",
      department: "Kalite",
      position: "Kalite Müdürü",
      agreementDate: "2024-01-01",
      expiryDate: "2025-01-01",
      status: "pending",
      signedBy: "Ahmet Yılmaz",
      witness: "İK Müdürü",
      scope: "Tüm laboratuvar işlemleri",
      restrictions: [
        "Müşteri bilgilerinin gizliliği",
        "Test sonuçlarının korunması",
        "Ticari sırların korunması"
      ],
      attachments: ["gizlilik-anlasmasi.pdf"],
      isDigital: true
    },
    {
      id: "conf-002",
      employeeId: "emp-002",
      employeeName: "Fatma Demir",
      department: "Laboratuvar",
      position: "Laboratuvar Uzmanı",
      agreementDate: "2024-01-15",
      expiryDate: "2025-01-15",
      status: "pending",
      signedBy: "Fatma Demir",
      witness: "Laboratuvar Müdürü",
      scope: "Laboratuvar işlemleri",
      restrictions: [
        "Test metotlarının gizliliği",
        "Numune bilgilerinin korunması",
        "Kalite sistem bilgilerinin gizliliği"
      ],
      attachments: ["gizlilik-anlasmasi.pdf"],
      isDigital: true
    }
  ],

  // Organizasyon Şeması Verileri
  organizationStructure: {
    company: {
      name: "ABC Laboratuvar Hizmetleri A.Ş.",
      type: "Anonim Şirket",
      founded: "2015",
      address: "Teknoloji Geliştirme Bölgesi, İstanbul",
      phone: "+90 212 555 0123",
      email: "info@abclab.com",
      website: "www.abclab.com",
      license: "ISO 17025:2017",
      accreditation: "TÜRKAK"
    },
    positions: [
      {
        id: "pos-001",
        title: "Genel Müdür",
        department: "Genel Müdürlük",
        level: "Üst Yönetim",
        requirements: "Doktora, 10+ yıl deneyim",
        responsibilities: ["Genel yönetim", "Stratejik planlama"],
        salaryRange: "15000-25000 TL"
      },
      {
        id: "pos-002",
        title: "Kalite Müdürü",
        department: "Kalite Yönetimi",
        level: "Orta Yönetim",
        requirements: "Yüksek Lisans, 5+ yıl deneyim",
        responsibilities: ["Kalite sistem yönetimi", "ISO uyumluluk"],
        salaryRange: "12000-18000 TL"
      },
      {
        id: "pos-003",
        title: "Laboratuvar Müdürü",
        department: "Laboratuvar Hizmetleri",
        level: "Orta Yönetim",
        requirements: "Yüksek Lisans, 7+ yıl deneyim",
        responsibilities: ["Laboratuvar operasyonları", "Test yönetimi"],
        salaryRange: "13000-20000 TL"
      }
    ]
  },

  // Personel Yetkinlik Verileri
  personnelCompetencies: [
    {
      id: "comp-001",
      employeeId: "emp-001",
      employeeName: "Ahmet Yılmaz",
      department: "Kalite Yönetimi",
      position: "Kalite Müdürü",
      competencyArea: "Kalite Yönetimi",
      competencyLevel: "Uzman",
      score: 95,
      lastAssessment: "2024-01-15",
      nextAssessment: "2024-07-15",
      status: "pending",
      skills: [
        {
          name: "ISO 17025 Uygulama",
          level: "Uzman",
          score: 98,
          lastUpdated: "2024-01-10"
        },
        {
          name: "Doküman Kontrolü",
          level: "Uzman",
          score: 95,
          lastUpdated: "2024-01-12"
        },
        {
          name: "İç Denetim",
          level: "Uzman",
          score: 92,
          lastUpdated: "2024-01-08"
        },
        {
          name: "Risk Yönetimi",
          level: "İleri",
          score: 88,
          lastUpdated: "2024-01-05"
        }
      ],
      certifications: [
        {
          name: "ISO 17025 Lead Auditor",
          issuer: "TÜRKAK",
          issueDate: "2023-06-15",
          expiryDate: "2026-06-15",
          status: "Geçerli"
        },
        {
          name: "Kalite Yönetim Sistemi Uzmanı",
          issuer: "TSE",
          issueDate: "2023-03-20",
          expiryDate: "2025-03-20",
          status: "Geçerli"
        }
      ],
      trainingHistory: [
        {
          course: "ISO 17025:2017 Güncelleme Eğitimi",
          provider: "TÜRKAK",
          date: "2024-01-10",
          duration: "2 gün",
          status: "Tamamlandı"
        },
        {
          course: "Risk Yönetimi Eğitimi",
          provider: "Kalite Derneği",
          date: "2023-11-15",
          duration: "1 gün",
          status: "Tamamlandı"
        }
      ],
      performance: {
        overall: 95,
        technical: 98,
        management: 92,
        communication: 88,
        leadership: 90
      },
      developmentPlan: [
        "Risk yönetimi konusunda ileri seviye eğitim",
        "Liderlik becerilerini geliştirme",
        "Yeni ISO standartları takibi"
      ]
    },
    {
      id: "comp-002",
      employeeId: "emp-002",
      employeeName: "Fatma Demir",
      department: "Laboratuvar Hizmetleri",
      position: "Laboratuvar Uzmanı",
      competencyArea: "Analitik Kimya",
      competencyLevel: "Uzman",
      score: 92,
      lastAssessment: "2024-02-01",
      nextAssessment: "2024-08-01",
      status: "pending",
      skills: [
        {
          name: "Spektrofotometri",
          level: "Uzman",
          score: 96,
          lastUpdated: "2024-01-20"
        },
        {
          name: "Kromatografi",
          level: "Uzman",
          score: 94,
          lastUpdated: "2024-01-18"
        },
        {
          name: "Numune Hazırlama",
          level: "Uzman",
          score: 90,
          lastUpdated: "2024-01-15"
        },
        {
          name: "Metot Validasyonu",
          level: "İleri",
          score: 85,
          lastUpdated: "2024-01-12"
        }
      ],
      certifications: [
        {
          name: "Analitik Kimya Uzmanı",
          issuer: "Kimya Derneği",
          issueDate: "2023-08-10",
          expiryDate: "2025-08-10",
          status: "Geçerli"
        }
      ],
      trainingHistory: [
        {
          course: "Metot Validasyonu Eğitimi",
          provider: "Analitik Kimya Enstitüsü",
          date: "2024-01-25",
          duration: "3 gün",
          status: "Tamamlandı"
        },
        {
          course: "Yeni Analitik Teknikler",
          provider: "Teknoloji Üniversitesi",
          date: "2023-12-05",
          duration: "2 gün",
          status: "Tamamlandı"
        }
      ],
      performance: {
        overall: 92,
        technical: 95,
        management: 85,
        communication: 88,
        leadership: 82
      },
      developmentPlan: [
        "Metot validasyonu konusunda uzmanlaşma",
        "Yönetim becerilerini geliştirme",
        "Yeni analitik teknikler öğrenme"
      ]
    },
    {
      id: "comp-003",
      employeeId: "emp-003",
      employeeName: "Mehmet Kaya",
      department: "Teknik Hizmetler",
      position: "Teknik Uzman",
      competencyArea: "Ekipman Yönetimi",
      competencyLevel: "İleri",
      score: 88,
      lastAssessment: "2024-01-20",
      nextAssessment: "2024-07-20",
      status: "pending",
      skills: [
        {
          name: "Ekipman Kalibrasyonu",
          level: "Uzman",
          score: 92,
          lastUpdated: "2024-01-15"
        },
        {
          name: "Bakım ve Onarım",
          level: "İleri",
          score: 90,
          lastUpdated: "2024-01-10"
        },
        {
          name: "Teknik Dokümantasyon",
          level: "İleri",
          score: 85,
          lastUpdated: "2024-01-08"
        },
        {
          name: "Proje Yönetimi",
          level: "Orta",
          score: 75,
          lastUpdated: "2024-01-05"
        }
      ],
      certifications: [
        {
          name: "Ekipman Kalibrasyon Uzmanı",
          issuer: "Kalibrasyon Derneği",
          issueDate: "2023-09-15",
          expiryDate: "2025-09-15",
          status: "Geçerli"
        }
      ],
      trainingHistory: [
        {
          course: "Proje Yönetimi Temelleri",
          provider: "Proje Yönetimi Enstitüsü",
          date: "2024-02-01",
          duration: "2 gün",
          status: "Devam Ediyor"
        },
        {
          course: "Yeni Kalibrasyon Teknikleri",
          provider: "Teknik Eğitim Merkezi",
          date: "2023-10-20",
          duration: "1 gün",
          status: "Tamamlandı"
        }
      ],
      performance: {
        overall: 88,
        technical: 92,
        management: 75,
        communication: 82,
        leadership: 78
      },
      developmentPlan: [
        "Proje yönetimi becerilerini geliştirme",
        "Liderlik eğitimi alma",
        "Yeni teknolojileri takip etme"
      ]
    }
  ],

  // Eğitim Planları Verileri
  trainingPlans: [
    {
      id: "train-001",
      title: "ISO 17025:2017 Temel Eğitimi",
      description: "ISO 17025 standardının temel prensipleri ve uygulama yöntemleri",
      category: "Kalite Yönetimi",
      level: "Temel",
      duration: "2 gün",
      startDate: "2024-04-15",
      endDate: "2024-04-16",
      status: "Planlandı",
      instructor: "Dr. Ahmet Yılmaz",
      location: "Konferans Salonu A",
      maxParticipants: 20,
      currentParticipants: 15,
      cost: 2500,
      objectives: [
        "ISO 17025 standardını anlama",
        "Laboratuvar yeterlilik gereksinimlerini öğrenme",
        "Kalite sistem kurma becerisi kazanma"
      ],
      targetAudience: [
        "Kalite ekibi",
        "Laboratuvar personeli",
        "Yönetim kadrosu"
      ],
      prerequisites: "Temel kalite bilgisi",
      materials: [
        "ISO 17025:2017 Standardı",
        "Eğitim sunumları",
        "Uygulama örnekleri"
      ],
      assessment: {
        type: "Yazılı sınav + Uygulama",
        passingScore: 70,
        certificate: "Katılım Sertifikası"
      },
      participants: [
        {
          id: "emp-001",
          name: "Ahmet Yılmaz",
          department: "Kalite Yönetimi",
          status: "Kayıtlı",
          registrationDate: "2024-03-15"
        },
        {
          id: "emp-002",
          name: "Fatma Demir",
          department: "Laboratuvar Hizmetleri",
          status: "Kayıtlı",
          registrationDate: "2024-03-16"
        }
      ],
      feedback: [],
      isRecurring: false,
      recurringFrequency: null,
      nextOccurrence: null
    },
    {
      id: "train-002",
      title: "Analitik Kimya Teknikleri",
      description: "Modern analitik kimya teknikleri ve uygulamaları",
      category: "Teknik Eğitim",
      level: "İleri",
      duration: "3 gün",
      startDate: "2024-05-10",
      endDate: "2024-05-12",
      status: "pending",
      instructor: "Prof. Dr. Mehmet Kaya",
      location: "Laboratuvar B",
      maxParticipants: 12,
      currentParticipants: 10,
      cost: 3500,
      objectives: [
        "Spektrofotometri tekniklerini öğrenme",
        "Kromatografi uygulamaları",
        "Metot validasyonu yapma"
      ],
      targetAudience: [
        "Laboratuvar uzmanları",
        "Teknik personel",
        "Kalite kontrol ekibi"
      ],
      prerequisites: "Kimya lisansı veya eşdeğer deneyim",
      materials: [
        "Analitik kimya kitabı",
        "Laboratuvar rehberi",
        "Uygulama protokolleri"
      ],
      assessment: {
        type: "Pratik sınav + Rapor",
        passingScore: 80,
        certificate: "Uzmanlık Sertifikası"
      },
      participants: [
        {
          id: "emp-003",
          name: "Mehmet Kaya",
          department: "Teknik Hizmetler",
          status: "Katıldı",
          registrationDate: "2024-04-01"
        }
      ],
      feedback: [
        {
          participant: "Mehmet Kaya",
          rating: 5,
          comment: "Çok faydalı bir eğitimdi, pratik uygulamalar çok iyiydi",
          date: "2024-05-12"
        }
      ],
      isRecurring: true,
      recurringFrequency: "6 ay",
      nextOccurrence: "2024-11-10"
    },
    {
      id: "train-003",
      title: "Güvenlik ve İş Sağlığı",
      description: "Laboratuvar güvenliği ve iş sağlığı kuralları",
      category: "Güvenlik",
      level: "Temel",
      duration: "1 gün",
      startDate: "2024-03-20",
      endDate: "2024-03-20",
      status: "Tamamlandı",
      instructor: "Güvenlik Uzmanı",
      location: "Eğitim Salonu",
      maxParticipants: 30,
      currentParticipants: 25,
      cost: 1500,
      objectives: [
        "Laboratuvar güvenlik kurallarını öğrenme",
        "Kimyasal madde güvenliği",
        "Acil durum prosedürleri"
      ],
      targetAudience: [
        "Tüm personel",
        "Yeni işe başlayanlar",
        "Güvenlik sorumluları"
      ],
      prerequisites: "Yok",
      materials: [
        "Güvenlik rehberi",
        "MSDS formları",
        "Acil durum planı"
      ],
      assessment: {
        type: "Yazılı sınav",
        passingScore: 60,
        certificate: "Güvenlik Sertifikası"
      },
      participants: [
        {
          id: "emp-001",
          name: "Ahmet Yılmaz",
          department: "Kalite Yönetimi",
          status: "Tamamladı",
          registrationDate: "2024-03-01"
        },
        {
          id: "emp-002",
          name: "Fatma Demir",
          department: "Laboratuvar Hizmetleri",
          status: "Tamamladı",
          registrationDate: "2024-03-01"
        }
      ],
      feedback: [
        {
          participant: "Ahmet Yılmaz",
          rating: 4,
          comment: "Güvenlik konularında farkındalık arttı",
          date: "2024-03-20"
        },
        {
          participant: "Fatma Demir",
          rating: 5,
          comment: "Çok önemli bilgiler öğrendik",
          date: "2024-03-20"
        }
      ],
      isRecurring: true,
      recurringFrequency: "1 yıl",
      nextOccurrence: "2025-03-20"
    },
    {
      id: "train-004",
      title: "Liderlik ve Yönetim Becerileri",
      description: "Orta ve üst düzey yöneticiler için liderlik eğitimi",
      category: "Yönetim",
      level: "İleri",
      duration: "2 gün",
      startDate: "2024-06-05",
      endDate: "2024-06-06",
      status: "Planlandı",
      instructor: "İK Uzmanı",
      location: "Yönetim Ofisi",
      maxParticipants: 8,
      currentParticipants: 5,
      cost: 4000,
      objectives: [
        "Liderlik stillerini öğrenme",
        "Takım yönetimi becerileri",
        "Çatışma yönetimi"
      ],
      targetAudience: [
        "Müdürler",
        "Takım liderleri",
        "Üst düzey personel"
      ],
      prerequisites: "Yönetim deneyimi",
      materials: [
        "Liderlik kitabı",
        "Vaka çalışmaları",
        "Değerlendirme formları"
      ],
      assessment: {
        type: "360 derece değerlendirme",
        passingScore: 75,
        certificate: "Liderlik Sertifikası"
      },
      participants: [],
      feedback: [],
      isRecurring: false,
      recurringFrequency: null,
      nextOccurrence: null
    }
  ],

  // Yönetim Gözden Geçirmesi Verileri
  managementReviews: [
    {
      id: "mr-001",
      title: "2024 Yıllık Yönetim Gözden Geçirmesi",
      reviewDate: "2024-03-15",
      nextReviewDate: "2025-03-15",
      status: "Tamamlandı",
      type: "Yıllık",
      participants: [
        { id: "p1", name: "Dr. Mehmet Özkan", role: "Genel Müdür", department: "Genel Müdürlük", attendance: true },
        { id: "p2", name: "Ahmet Yılmaz", role: "Kalite Müdürü", department: "Kalite Yönetimi", attendance: true },
        { id: "p3", name: "Fatma Demir", role: "Laboratuvar Müdürü", department: "Laboratuvar Hizmetleri", attendance: true },
        { id: "p4", name: "Mehmet Kaya", role: "Teknik Müdür", department: "Teknik Hizmetler", attendance: true },
      ],
      agenda: [
        { id: "a1", topic: "Kalite Hedefleri Değerlendirmesi", presenter: "Ahmet Yılmaz", duration: "30 dk", status: "Tamamlandı" },
        { id: "a2", topic: "Müşteri Memnuniyeti Analizi", presenter: "Fatma Demir", duration: "25 dk", status: "Tamamlandı" },
        { id: "a3", topic: "İç Denetim Sonuçları", presenter: "Ahmet Yılmaz", duration: "20 dk", status: "Tamamlandı" },
        { id: "a4", topic: "Ekipman Durumu ve Kalibrasyon", presenter: "Mehmet Kaya", duration: "15 dk", status: "Tamamlandı" },
      ],
      objectives: [
        { id: "o1", objective: "Müşteri Memnuniyeti", target: "95%", actual: "97%", status: "Başarılı" },
        { id: "o2", objective: "Kalite Hedefleri Ulaşımı", target: "90%", actual: "92%", status: "Başarılı" },
        { id: "o3", objective: "Eğitim Tamamlama Oranı", target: "100%", actual: "98%", status: "Kısmen Başarılı" },
        { id: "o4", objective: "İç Denetim Uyumluluğu", target: "100%", actual: "100%", status: "Başarılı" },
      ],
      actionItems: [
        { id: "ai1", item: "Eğitim planını gözden geçir ve güncelle", responsible: "İK Müdürü", dueDate: "2024-04-30", status: "Devam Ediyor", priority: "Yüksek" },
        { id: "ai2", item: "Yeni ekipman alım planı hazırla", responsible: "Teknik Müdür", dueDate: "2024-05-15", status: "Planlandı", priority: "Orta" },
        { id: "ai3", item: "Müşteri geri bildirim sistemi iyileştir", responsible: "Kalite Müdürü", dueDate: "2024-06-30", status: "Planlandı", priority: "Düşük" },
      ],
      decisions: [
        { id: "d1", decision: "Yeni laboratuvar alanı kiralanacak", rationale: "Kapasite artışı ihtiyacı", impact: "Yüksek" },
        { id: "d2", decision: "Personel sayısı %20 artırılacak", rationale: "İş yükü artışı", impact: "Orta" },
      ],
      risks: [
        { id: "r1", risk: "Ekipman arızası riski", level: "Orta", mitigation: "Önleyici bakım programı", status: "Aktif" },
        { id: "r2", risk: "Personel devir oranı", level: "Düşük", mitigation: "Motivasyon programları", status: "İzleniyor" },
      ],
      opportunities: [
        { id: "op1", opportunity: "Yeni test metotları geliştirme", potential: "Yüksek", action: "AR-GE projesi başlat", status: "Değerlendiriliyor" },
        { id: "op2", opportunity: "Dijitalleşme projeleri", potential: "Orta", action: "Teknoloji yatırımı", status: "Planlanıyor" },
      ],
      budget: {
        planned: 5000000,
        actual: 4800000,
        variance: -200000,
      },
      qualityMetrics: {
        customerSatisfaction: 97,
        processEfficiency: 92,
        complianceRate: 100,
        trainingCompletion: 98,
      },
      notes: "Genel olarak başarılı bir yıl geçirdik. Kalite hedeflerimizi aştık ve müşteri memnuniyetimiz yüksek seviyede.",
      attachments: [
        { name: "2024_yillik_rapor.pdf", type: "PDF", size: "2.5 MB", uploadDate: "2024-03-15" },
        { name: "musteri_anket_sonuclari.xlsx", type: "Excel", size: "1.2 MB", uploadDate: "2024-03-10" },
      ],
      createdBy: "Ahmet Yılmaz",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-15",
    },
    {
      id: "mr-002",
      title: "2024 Q1 Çeyrek Gözden Geçirmesi",
      reviewDate: "2024-04-15",
      nextReviewDate: "2024-07-15",
      status: "Planlandı",
      type: "Çeyrek",
      participants: [
        { id: "p1", name: "Dr. Mehmet Özkan", role: "Genel Müdür", department: "Genel Müdürlük", attendance: false },
        { id: "p2", name: "Ahmet Yılmaz", role: "Kalite Müdürü", department: "Kalite Yönetimi", attendance: false },
        { id: "p3", name: "Fatma Demir", role: "Laboratuvar Müdürü", department: "Laboratuvar Hizmetleri", attendance: false },
      ],
      agenda: [
        { id: "a1", topic: "Q1 Performans Değerlendirmesi", presenter: "Ahmet Yılmaz", duration: "30 dk", status: "Planlandı" },
        { id: "a2", topic: "Mali Durum Analizi", presenter: "Mali İşler Müdürü", duration: "20 dk", status: "Planlandı" },
      ],
      objectives: [],
      actionItems: [],
      decisions: [],
      risks: [],
      opportunities: [],
      budget: {
        planned: 1250000,
        actual: 0,
        variance: 0,
      },
      qualityMetrics: {
        customerSatisfaction: 0,
        processEfficiency: 0,
        complianceRate: 0,
        trainingCompletion: 0,
      },
      notes: "",
      attachments: [],
      createdBy: "Ahmet Yılmaz",
      createdAt: "2024-04-01",
      updatedAt: "2024-04-01",
    },
  ],

  // Numune Yönetimi Verileri
  samples: [
    {
      id: "smp-001",
      sampleNumber: "SMP-2024-001",
      clientName: "ABC Gıda San. Tic. Ltd. Şti.",
      clientCode: "CL-001",
      sampleType: "Gıda",
      testType: "Mikrobiyolojik Analiz",
      receivedDate: "2024-03-15",
      analysisStartDate: "2024-03-16",
      analysisEndDate: "2024-03-20",
      status: "Analiz Tamamlandı",
      priority: "normal",
      location: "Soğuk Oda A-1",
      storageConditions: {
        temperature: "2-8°C",
        humidity: "60-70% RH",
        light: "Karanlık",
        other: "Havalandırmalı"
      },
      quantity: "250",
      unit: "g",
      description: "Tavuk eti örneği - mikrobiyolojik analiz için",
      appearance: "Taze, normal renk",
      packaging: "Steril plastik torba",
      preservationMethod: "Soğuk zincir",
      chainOfCustody: [
        { date: "2024-03-15 09:00", person: "Ahmet Yılmaz", action: "Numune kabul", location: "Kabul Masası" },
        { date: "2024-03-15 09:30", person: "Fatma Demir", action: "Soğuk odaya transfer", location: "Soğuk Oda A-1" },
        { date: "2024-03-16 08:00", person: "Mehmet Kaya", action: "Analiz başlatıldı", location: "Mikrobiyoloji Lab" },
      ],
      testParameters: [
        { parameter: "Toplam Mezofil Aerobik Bakteri", method: "TS EN ISO 4833-1", limit: "<10⁴", unit: "CFU/g" },
        { parameter: "E.coli", method: "TS EN ISO 16649-2", limit: "<10²", unit: "CFU/g" },
        { parameter: "Salmonella", method: "TS EN ISO 6579-1", limit: "Yok", unit: "25g" },
      ],
      results: [
        { parameter: "Toplam Mezofil Aerobik Bakteri", result: "2.3x10³", unit: "CFU/g", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-18" },
        { parameter: "E.coli", result: "<10", unit: "CFU/g", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-18" },
        { parameter: "Salmonella", result: "Yok", unit: "25g", status: "Uygun", analyst: "Mehmet Kaya", date: "2024-03-20" },
      ],
      qualityControl: {
        blankResult: "Negatif",
        spikeRecovery: "95%",
        duplicateResult: "Uyumlu",
        status: "Başarılı"
      },
      disposalMethod: "Otoklav + Atık",
      disposalDate: "2024-04-15",
      retentionPeriod: "30 gün",
      responsible: "Mehmet Kaya",
      notes: "Numune analizi başarıyla tamamlandı. Tüm parametreler limit değerlerin altında.",
      attachments: [
        { name: "analiz_raporu_smp001.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-03-20" },
        { name: "kalite_kontrol_smp001.pdf", type: "PDF", size: "0.8 MB", uploadDate: "2024-03-20" },
      ],
      createdAt: "2024-03-15",
      updatedAt: "2024-03-20",
    }
  ],

  // Test Metotları Verileri
  testMethods: [
    {
      id: "tm-001",
      methodCode: "TM-001",
      methodName: "Toplam Mezofil Aerobik Bakteri Sayımı",
      category: "Mikrobiyoloji",
      subCategory: "Gıda Mikrobiyolojisi",
      version: "2.1",
      status: "pending",
      scope: "Gıda maddelerinde toplam mezofil aerobik bakteri sayısının tayini",
      principle: "Numune homojenizasyonu sonrası uygun seyreltme yapılarak Plate Count Agar besiyerinde 30°C'de 72±3 saat inkübasyon",
      equipment: [
        { name: "Otoklav", model: "Tuttnauer 3870EA", required: true },
        { name: "İnkübatör", model: "Memmert INB 400", required: true },
        { name: "Analitik Terazi", model: "Sartorius Quintix 224-1S", required: true },
      ],
      reagents: [
        { name: "Plate Count Agar", purity: "Analitik", supplier: "Merck", required: true },
        { name: "Peptone Water", purity: "Analitik", supplier: "Merck", required: true },
      ],
      parameters: [
        { parameter: "İnkübasyon Sıcaklığı", range: "30±1°C", unit: "°C", limit: "30±1°C", uncertainty: "±0.5°C" },
        { parameter: "İnkübasyon Süresi", range: "72±3 saat", unit: "saat", limit: "72±3 saat", uncertainty: "±1 saat" },
      ],
      validation: {
        accuracy: "95-105%",
        precision: "CV <10%",
        linearity: "R² >0.99",
        limitOfDetection: "10 CFU/g",
        limitOfQuantification: "100 CFU/g",
        robustness: "Uygun",
        status: "Geçerli",
        validatedBy: "Dr. Mehmet Kaya",
        validationDate: "2024-01-15",
        nextValidation: "2025-01-15",
      },
      qualityControl: {
        frequency: "Her analiz serisinde",
        criteria: "Negatif kontrol negatif, pozitif kontrol pozitif",
        action: "Kriterler karşılanmazsa analiz tekrarlanır",
      },
      safety: {
        hazards: ["Mikrobiyolojik kontaminasyon", "Kimyasal maruziyet"],
        precautions: ["Steril teknik kullanımı", "Kişisel hijyen"],
        ppe: ["Laboratuvar önlüğü", "Eldiven", "Maske"],
        wasteDisposal: "Otoklav + Atık",
      },
      references: [
        { type: "Standart", code: "TS EN ISO 4833-1", title: "Mikrobiyoloji - Genel rehber", year: "2013" },
      ],
      attachments: [
        { name: "tm001_prosedur.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-01-15" },
      ],
      responsible: "Mehmet Kaya",
      reviewer: "Dr. Fatma Demir",
      approver: "Dr. Ahmet Yılmaz",
      effectiveDate: "2024-01-20",
      reviewDate: "2025-01-20",
      notes: "Metot başarıyla validasyonu tamamlandı ve aktif kullanıma alındı.",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-20",
    }
  ],

  // Test İşleri Verileri
  testJobs: [
    {
      id: "tj-001",
      jobNumber: "TJ-2024-001",
      sampleId: "smp-001",
      sampleNumber: "SMP-2024-001",
      clientName: "ABC Gıda San. Tic. Ltd. Şti.",
      testMethod: "Toplam Mezofil Aerobik Bakteri Sayımı",
      methodCode: "TM-001",
      status: "Tamamlandı",
      priority: "normal",
      assignedTo: "Dr. Mehmet Kaya",
      startDate: "2024-03-16",
      dueDate: "2024-03-20",
      completionDate: "2024-03-20",
      progress: 100,
      parameters: [
        { parameter: "Toplam Mezofil Aerobik Bakteri", method: "TS EN ISO 4833-1", limit: "<10⁴", unit: "CFU/g", result: "2.3x10³", status: "Uygun", analyst: "Dr. Mehmet Kaya", date: "2024-03-18" },
      ],
      qualityControl: {
        blankResult: "Negatif",
        spikeRecovery: "95%",
        duplicateResult: "Uyumlu",
        status: "Başarılı"
      },
      equipment: [
        { name: "İnkübatör", id: "INC-001", calibration: "2024-02-15", status: "Geçerli" },
      ],
      reagents: [
        { name: "Plate Count Agar", batch: "PCA-2024-001", expiry: "2024-12-31", status: "Geçerli" },
      ],
      environmental: {
        temperature: "22±1°C",
        humidity: "60±5% RH",
        pressure: "1013±10 hPa",
        date: "2024-03-16"
      },
      results: {
        overallStatus: "Uygun",
        compliance: "Tüm parametreler limit değerlerin altında",
        uncertainty: "±0.3 log CFU/g",
        remarks: "Analiz başarıyla tamamlandı"
      },
      review: {
        reviewedBy: "Dr. Fatma Demir",
        reviewDate: "2024-03-21",
        status: "Onaylandı",
        comments: "Analiz sonuçları doğru ve güvenilir"
      },
      approval: {
        approvedBy: "Dr. Ahmet Yılmaz",
        approvalDate: "2024-03-22",
        status: "Onaylandı",
        comments: "Rapor onaylandı"
      },
      report: {
        generated: true,
        reportNumber: "RPT-2024-001",
        reportDate: "2024-03-22",
        sentToClient: true,
        sentDate: "2024-03-22"
      },
      attachments: [
        { name: "analiz_raporu_tj001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-03-22" },
      ],
      notes: "Analiz başarıyla tamamlandı. Tüm kalite kontrol kriterleri karşılandı.",
      createdAt: "2024-03-15",
      updatedAt: "2024-03-22",
    }
  ],

  // Risk Yönetimi Verileri
  risks: [
    {
      id: "risk-001",
      riskNumber: "R-2024-001",
      title: "Ekipman Arızası Riski",
      description: "Kritik ekipmanların arızalanması durumunda analiz süreçlerinin aksaması",
      category: "Teknik",
      type: "Operasyonel",
      level: "Yüksek",
      probability: "Orta",
      impact: "Yüksek",
      riskScore: 16,
      status: "pending",
      owner: "Dr. Mehmet Kaya",
      identifiedDate: "2024-01-15",
      dueDate: "2024-06-15",
      mitigation: {
        strategy: "Önleyici bakım programı ve yedek ekipman bulundurma",
        actions: [
          { action: "Aylık önleyici bakım programı oluştur", responsible: "Teknik Müdür", dueDate: "2024-02-15", status: "Tamamlandı" },
          { action: "Yedek ekipman alımı", responsible: "Satın Alma Müdürü", dueDate: "2024-03-30", status: "Devam Ediyor" },
        ],
        effectiveness: "Yüksek",
        cost: 50000,
      },
      monitoring: {
        frequency: "Aylık",
        method: "Ekipman performans raporları",
        nextReview: "2024-04-15",
        lastReview: "2024-03-15",
      },
      attachments: [
        { name: "risk_analizi_r001.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-01-15" },
      ],
      notes: "Risk yönetimi planı uygulanıyor. Düzenli takip yapılıyor.",
      createdAt: "2024-01-10",
      updatedAt: "2024-03-15",
    }
  ],

  opportunities: [
    {
      id: "opp-001",
      opportunityNumber: "O-2024-001",
      title: "Dijitalleşme Projesi",
      description: "Laboratuvar süreçlerinin dijitalleştirilmesi ile verimlilik artışı",
      category: "Teknoloji",
      potential: "Yüksek",
      impact: "Yüksek",
              priority: "high",
      status: "Değerlendiriliyor",
      owner: "IT Müdürü",
      identifiedDate: "2024-01-20",
      dueDate: "2024-12-31",
      actionPlan: {
        strategy: "Laboratuvar bilgi yönetim sistemi kurulumu",
        actions: [
          { action: "Sistem analizi ve gereksinim belirleme", responsible: "IT Müdürü", dueDate: "2024-03-31", status: "Tamamlandı" },
          { action: "Yazılım seçimi ve satın alma", responsible: "IT Müdürü", dueDate: "2024-05-31", status: "Devam Ediyor" },
        ],
        expectedBenefit: "Süreç verimliliği %30 artış",
        investment: 200000,
      },
      monitoring: {
        frequency: "Aylık",
        method: "Proje ilerleme raporları",
        nextReview: "2024-04-20",
        lastReview: "2024-03-20",
      },
      attachments: [
        { name: "dijitallesme_analizi_o001.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-01-20" },
      ],
      notes: "Fırsat değerlendiriliyor. Detaylı analiz yapılıyor.",
      createdAt: "2024-01-15",
      updatedAt: "2024-03-20",
    }
  ],

  // CAPA Sistemi Verileri
  capas: [
    {
      id: "capa-001",
      capaNumber: "CAPA-2024-001",
      title: "Ekipman Kalibrasyon Gecikmesi",
      description: "Kritik ekipmanların kalibrasyon sürelerinin aşılması durumunda analiz sonuçlarının güvenilirliğinin azalması",
      type: "Düzeltici",
      source: "İç Denetim",
              priority: "high",
      status: "Uygulanıyor",
      owner: "Dr. Mehmet Kaya",
      identifiedDate: "2024-01-15",
      dueDate: "2024-04-15",
      completionDate: "",
      rootCause: {
        analysis: "Kalibrasyon takip sisteminin yetersizliği ve personel farkındalığının düşük olması",
        causes: [
          { cause: "Otomatik hatırlatma sistemi yok", category: "Sistem", impact: "Yüksek" },
          { cause: "Personel eğitimi eksik", category: "İnsan", impact: "Orta" },
        ],
        method: "5 Neden Analizi",
        analyst: "Dr. Fatma Demir",
        date: "2024-01-20",
      },
      correctiveActions: [
        { action: "Otomatik hatırlatma sistemi kurulumu", responsible: "IT Müdürü", dueDate: "2024-02-28", status: "Tamamlandı", effectiveness: "Yüksek" },
        { action: "Personel eğitimi düzenleme", responsible: "Eğitim Müdürü", dueDate: "2024-03-15", status: "Devam Ediyor", effectiveness: "Yüksek" },
      ],
      preventiveActions: [
        { action: "Kalibrasyon prosedürü güncelleme", responsible: "Kalite Müdürü", dueDate: "2024-03-31", status: "Planlandı", effectiveness: "Yüksek" },
      ],
      verification: {
        method: "Kalibrasyon kayıtları inceleme",
        criteria: "Tüm ekipmanların güncel kalibrasyonu",
        results: "Sistem kuruldu, eğitim devam ediyor",
        verifier: "Dr. Ahmet Yılmaz",
        date: "2024-03-01",
        status: "Kısmen Başarılı",
      },
      effectiveness: {
        method: "Kalibrasyon gecikme oranı analizi",
        criteria: "Gecikme oranı %5'in altında",
        results: "Henüz değerlendirme yapılmadı",
        evaluator: "",
        date: "",
        status: "Beklemede",
      },
      cost: {
        estimated: 25000,
        actual: 18000,
        variance: -7000,
      },
      attachments: [
        { name: "koku_analizi_capa001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-01-20" },
      ],
      notes: "CAPA başarıyla uygulanıyor. Düzenli takip yapılıyor.",
      createdAt: "2024-01-10",
      updatedAt: "2024-03-01",
    }
  ],

  // FASE 4 - Destek Modülleri Mock Data

  // İç Denetim
  internalAudits: [
    {
      id: "ia-001",
      auditNumber: "IA-2024-001",
      title: "2024 Yıllık Kalite Sistemi İç Denetimi",
      scope: "ISO 17025 Kalite Yönetim Sistemi - Tüm süreçler ve departmanlar",
      type: "Yıllık",
      status: "Tamamlandı",
              priority: "high",
      auditor: "Dr. Ahmet Yılmaz",
      auditee: "Kalite Müdürü",
      department: "Kalite Yönetimi",
      plannedDate: "2024-03-15",
      actualDate: "2024-03-15",
      duration: 2,
      objectives: [
        { objective: "ISO 17025 uyumluluğunun değerlendirilmesi", criteria: "ISO 17025:2017", status: "Tamamlandı" },
        { objective: "Süreç etkinliğinin değerlendirilmesi", criteria: "İç prosedürler", status: "Tamamlandı" },
        { objective: "İyileştirme fırsatlarının belirlenmesi", criteria: "Sürekli iyileştirme", status: "Tamamlandı" },
      ],
      findings: [
        {
          id: "f1",
          finding: "Kalibrasyon takip sisteminde eksiklikler tespit edildi",
          severity: "Majör",
          category: "Süreç",
          evidence: "Kalibrasyon kayıtları incelendi",
          clause: "5.5.2",
          status: "Kapatıldı"
        },
        {
          id: "f2",
          finding: "Personel eğitim kayıtları eksik",
          severity: "Minör",
          category: "Kayıt",
          evidence: "Eğitim dosyaları kontrol edildi",
          clause: "6.2.2",
          status: "Açık"
        }
      ],
      nonConformities: [
        {
          id: "nc1",
          description: "Kalibrasyon takip sisteminde otomatik hatırlatma yok",
          severity: "Majör",
          clause: "5.5.2",
          rootCause: "Sistem tasarımında eksiklik",
          correctiveAction: "Otomatik hatırlatma sistemi kurulacak",
          responsible: "IT Müdürü",
          dueDate: "2024-04-30",
          status: "Tamamlandı"
        }
      ],
      observations: [
        {
          id: "obs1",
          observation: "Doküman kontrol süreci iyi çalışıyor",
          category: "Olumlu",
          recommendation: "Diğer süreçlere örnek olarak kullanılabilir",
          status: "Değerlendirildi"
        }
      ],
      recommendations: [
        {
          id: "rec1",
          recommendation: "Personel eğitim planı güncellenmeli",
          priority: "medium",
          responsible: "Eğitim Müdürü",
          dueDate: "2024-05-31",
          status: "Planlandı"
        }
      ],
      report: {
        generated: true,
        reportNumber: "IAR-2024-001",
        reportDate: "2024-03-20",
        approvedBy: "Genel Müdür",
        approvalDate: "2024-03-22",
        status: "Onaylandı"
      },
      attachments: [
        { name: "ic_denetim_raporu_ia001.pdf", type: "PDF", size: "2.1 MB", uploadDate: "2024-03-20" },
        { name: "denetim_checklist_ia001.pdf", type: "PDF", size: "1.5 MB", uploadDate: "2024-03-15" },
      ],
      notes: "Denetim başarıyla tamamlandı. Tüm bulgular değerlendirildi ve aksiyon planları oluşturuldu.",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-22",
    }
  ],

  // Yeterlilik Testleri
  proficiencyTests: [
    {
      id: "pt-001",
      testNumber: "PT-2024-001",
      testName: "Mikrobiyolojik Analiz Yeterlilik Testi",
      provider: "TÜRKAK",
      testType: "Mikrobiyoloji",
      status: "Tamamlandı",
              priority: "high",
      participant: "Dr. Mehmet Kaya",
      department: "Mikrobiyoloji Laboratuvarı",
      registrationDate: "2024-01-15",
      testDate: "2024-02-15",
      resultDate: "2024-03-01",
      parameters: [
        {
          parameter: "Toplam Mezofil Aerobik Bakteri",
          method: "TS EN ISO 4833-1",
          unit: "CFU/g",
          assignedValue: "2.5x10³",
          uncertainty: "±0.3 log",
          participantResult: "2.3x10³",
          zScore: 0.67,
          evaluation: "Uygun"
        },
        {
          parameter: "E.coli",
          method: "TS EN ISO 16649-2",
          unit: "CFU/g",
          assignedValue: "<10",
          uncertainty: "±0.5 log",
          participantResult: "<10",
          zScore: 0.0,
          evaluation: "Mükemmel"
        }
      ],
      evaluation: {
        overallResult: "Başarılı",
        performance: "Mükemmel",
        comments: "Tüm parametrelerde başarılı sonuçlar alındı",
        recommendations: "Mevcut performansı koruyun",
        evaluator: "TÜRKAK Uzmanı",
        evaluationDate: "2024-03-01"
      },
      correctiveActions: [],
      attachments: [
        { name: "yeterlilik_testi_raporu_pt001.pdf", type: "PDF", size: "1.8 MB", uploadDate: "2024-03-01" },
        { name: "test_sonuclari_pt001.xlsx", type: "Excel", size: "0.5 MB", uploadDate: "2024-02-15" },
      ],
      notes: "Yeterlilik testi başarıyla tamamlandı. Tüm parametrelerde uygun sonuçlar alındı.",
      createdAt: "2024-01-10",
      updatedAt: "2024-03-01",
    }
  ],

  // Müşteri Şikayetleri
  customerComplaints: [
    {
      id: "cc-001",
      complaintNumber: "CC-2024-001",
      customerName: "ABC Gıda Sanayi A.Ş.",
      customerContact: {
        email: "kalite@abcgida.com",
        phone: "+90 212 555 0101",
        company: "ABC Gıda Sanayi A.Ş."
      },
      complaintType: "Test Sonucu",
              priority: "high",
      status: "Çözüldü",
      receivedDate: "2024-01-15",
      dueDate: "2024-01-30",
      resolvedDate: "2024-01-25",
      subject: "Mikrobiyoloji test sonuçlarında tutarsızlık",
      description: "Gönderilen numunelerin mikrobiyoloji test sonuçlarında önceki testlerle tutarsızlık tespit edildi. Aynı numuneler farklı sonuçlar veriyor.",
      category: "Test Sonucu",
      severity: "Yüksek",
      assignedTo: "Dr. Mehmet Kaya",
      department: "Mikrobiyoloji Laboratuvarı",
      investigation: {
        investigator: "Dr. Mehmet Kaya",
        investigationDate: "2024-01-16",
        findings: "Test metodu ve cihaz kalibrasyonu kontrol edildi. Cihaz kalibrasyonunda sapma tespit edildi.",
        rootCause: "Spektrofotometre cihazının kalibrasyonu güncel değildi",
        evidence: ["Kalibrasyon sertifikası", "Test kayıtları", "Cihaz logları"]
      },
      resolution: {
        action: "Cihaz yeniden kalibre edildi ve test tekrarlandı",
        responsible: "Mehmet Kaya",
        dueDate: "2024-01-25",
        status: "Tamamlandı",
        effectiveness: "Müşteri memnun",
        followUpDate: "2024-02-15"
      },
      customerSatisfaction: {
        rating: 4,
        feedback: "Sorun hızlı çözüldü, memnunuz",
        followUpDate: "2024-02-15",
        status: "Tamamlandı"
      },
      attachments: [
        { name: "sikayet_cc001.pdf", type: "PDF", size: "1.2 MB", uploadDate: "2024-01-15" },
        { name: "test_sonuclari_cc001.xlsx", type: "Excel", size: "0.8 MB", uploadDate: "2024-01-16" },
      ],
      notes: "Müşteri şikayeti başarıyla çözüldü. Cihaz kalibrasyonu düzenlendi.",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-25",
    }
  ],

  // Organizasyon Birimleri Verileri
  organizationUnits: [
    {
      id: "unit-001",
      name: "Genel Müdürlük",
      code: "GM",
      parentId: null,
      level: 1,
      type: "department",
      managerId: "emp-001",
      managerName: "Dr. Mehmet Özkan",
      description: "Şirket genel yönetimi ve stratejik planlama",
      responsibilities: [
        "Stratejik planlama ve yönetim",
        "Genel müdürlük kararları",
        "Dış ilişkiler ve ortaklıklar"
      ],
      objectives: [
        "Şirket büyümesini sağlama",
        "Stratejik hedeflere ulaşma",
        "Müşteri memnuniyetini artırma"
      ],
      kpis: [
        "Yıllık büyüme oranı",
        "Müşteri memnuniyet skoru",
        "Finansal performans"
      ],
      budget: 5000000,
      employeeCount: 3,
      status: "active",
      establishedDate: "2015-01-01",
      lastReviewDate: "2024-01-15",
      nextReviewDate: "2025-01-15",
      reportingStructure: "Doğrudan Yönetim Kurulu'na raporlama",
      decisionMakingAuthority: "Tam yetki",
      resourceAllocation: "Merkezi kaynak yönetimi",
      performanceMetrics: {
        efficiency: 95,
        quality: 98,
        compliance: 100,
        innovation: 90
      }
    },
    {
      id: "unit-002",
      name: "Kalite Yönetimi",
      code: "KY",
      parentId: "unit-001",
      level: 2,
      type: "department",
      managerId: "emp-002",
      managerName: "Ahmet Yılmaz",
      description: "Kalite sistem yönetimi ve ISO 17025 uyumluluğu",
      responsibilities: [
        "Kalite sistem yönetimi",
        "ISO 17025 uyumluluk",
        "Doküman kontrolü",
        "İç denetim"
      ],
      objectives: [
        "ISO 17025 uyumluluğunu sürdürme",
        "Kalite hedeflerine ulaşma",
        "Sürekli iyileştirme"
      ],
      kpis: [
        "ISO uyumluluk skoru",
        "Doküman güncellik oranı",
        "İç denetim başarı oranı"
      ],
      budget: 1200000,
      employeeCount: 8,
      status: "active",
      establishedDate: "2015-02-01",
      lastReviewDate: "2024-02-15",
      nextReviewDate: "2025-02-15",
      reportingStructure: "Genel Müdürlük'e raporlama",
      decisionMakingAuthority: "Kalite konularında tam yetki",
      resourceAllocation: "Departman bütçesi",
      performanceMetrics: {
        efficiency: 92,
        quality: 96,
        compliance: 100,
        innovation: 85
      }
    },
    {
      id: "unit-003",
      name: "Laboratuvar Hizmetleri",
      code: "LH",
      parentId: "unit-001",
      level: 2,
      type: "department",
      managerId: "emp-003",
      managerName: "Fatma Demir",
      description: "Test hizmetleri ve laboratuvar operasyonları",
      responsibilities: [
        "Test hizmetleri",
        "Numune analizi",
        "Raporlama",
        "Metot validasyonu"
      ],
      objectives: [
        "Test kalitesini artırma",
        "Müşteri beklentilerini karşılama",
        "Operasyonel verimliliği artırma"
      ],
      kpis: [
        "Test tamamlama süresi",
        "Müşteri memnuniyet skoru",
        "Test doğruluk oranı"
      ],
      budget: 2500000,
      employeeCount: 15,
      status: "active",
      establishedDate: "2015-03-01",
      lastReviewDate: "2024-03-15",
      nextReviewDate: "2025-03-15",
      reportingStructure: "Genel Müdürlük'e raporlama",
      decisionMakingAuthority: "Operasyonel konularda tam yetki",
      resourceAllocation: "Departman bütçesi",
      performanceMetrics: {
        efficiency: 88,
        quality: 94,
        compliance: 98,
        innovation: 92
      }
    },
    {
      id: "unit-004",
      name: "Teknik Hizmetler",
      code: "TH",
      parentId: "unit-001",
      level: 2,
      type: "department",
      managerId: "emp-004",
      managerName: "Mehmet Kaya",
      description: "Ekipman yönetimi ve teknik destek",
      responsibilities: [
        "Ekipman yönetimi",
        "Kalibrasyon",
        "Bakım ve onarım",
        "Teknik destek"
      ],
      objectives: [
        "Ekipman verimliliğini artırma",
        "Bakım maliyetlerini azaltma",
        "Teknik destek kalitesini artırma"
      ],
      kpis: [
        "Ekipman kullanılabilirlik oranı",
        "Bakım maliyet oranı",
        "Teknik destek memnuniyet skoru"
      ],
      budget: 800000,
      employeeCount: 6,
      status: "active",
      establishedDate: "2015-04-01",
      lastReviewDate: "2024-04-15",
      nextReviewDate: "2025-04-15",
      reportingStructure: "Genel Müdürlük'e raporlama",
      decisionMakingAuthority: "Teknik konularda tam yetki",
      resourceAllocation: "Departman bütçesi",
      performanceMetrics: {
        efficiency: 90,
        quality: 92,
        compliance: 95,
        innovation: 88
      }
    },
    {
      id: "unit-005",
      name: "İnsan Kaynakları",
      code: "İK",
      parentId: "unit-001",
      level: 2,
      type: "department",
      managerId: "emp-005",
      managerName: "Ayşe Yıldız",
      description: "Personel yönetimi ve eğitim",
      responsibilities: [
        "Personel yönetimi",
        "Eğitim planlama",
        "Performans değerlendirme",
        "İşe alım"
      ],
      objectives: [
        "Personel memnuniyetini artırma",
        "Eğitim etkinliğini artırma",
        "Yetenek yönetimini geliştirme"
      ],
      kpis: [
        "Personel memnuniyet skoru",
        "Eğitim tamamlama oranı",
        "İşe alım başarı oranı"
      ],
      budget: 600000,
      employeeCount: 4,
      status: "active",
      establishedDate: "2015-05-01",
      lastReviewDate: "2024-05-15",
      nextReviewDate: "2025-05-15",
      reportingStructure: "Genel Müdürlük'e raporlama",
      decisionMakingAuthority: "İK konularında tam yetki",
      resourceAllocation: "Departman bütçesi",
      performanceMetrics: {
        efficiency: 85,
        quality: 90,
        compliance: 95,
        innovation: 80
      }
    },
    {
      id: "unit-006",
      name: "Mali İşler",
      code: "Mİ",
      parentId: "unit-001",
      level: 2,
      type: "department",
      managerId: "emp-006",
      managerName: "Ali Çelik",
      description: "Mali yönetim ve muhasebe",
      responsibilities: [
        "Mali yönetim",
        "Muhasebe",
        "Bütçe planlama",
        "Mali raporlama"
      ],
      objectives: [
        "Mali kontrolü sağlama",
        "Bütçe hedeflerine ulaşma",
        "Mali raporlama kalitesini artırma"
      ],
      kpis: [
        "Bütçe uyum oranı",
        "Mali raporlama doğruluğu",
        "Maliyet kontrol etkinliği"
      ],
      budget: 400000,
      employeeCount: 3,
      status: "active",
      establishedDate: "2015-06-01",
      lastReviewDate: "2024-06-15",
      nextReviewDate: "2025-06-15",
      reportingStructure: "Genel Müdürlük'e raporlama",
      decisionMakingAuthority: "Mali konularda tam yetki",
      resourceAllocation: "Departman bütçesi",
      performanceMetrics: {
        efficiency: 92,
        quality: 95,
        compliance: 100,
        innovation: 75
      }
    }
  ],

  // Çalışan Verileri
  employees: [
    {
      id: "emp-001",
      name: "Dr. Mehmet Özkan",
      position: "Genel Müdür",
      department: "Genel Müdürlük",
      level: 1,
      managerId: null,
      managerName: null,
      responsibilities: [
        "Genel yönetim",
        "Stratejik planlama",
        "Dış ilişkiler"
      ],
      skills: [
        "Stratejik Yönetim",
        "Liderlik",
        "İş Geliştirme"
      ],
      performance: 95,
      status: "active",
      joinDate: "2015-01-01",
      lastPromotion: "2015-01-01",
      nextReview: "2025-01-01"
    },
    {
      id: "emp-002",
      name: "Ahmet Yılmaz",
      position: "Kalite Müdürü",
      department: "Kalite Yönetimi",
      level: 2,
      managerId: "emp-001",
      managerName: "Dr. Mehmet Özkan",
      responsibilities: [
        "Kalite sistem yönetimi",
        "ISO 17025 uyumluluk",
        "Doküman kontrolü"
      ],
      skills: [
        "Kalite Yönetimi",
        "ISO 17025",
        "Doküman Kontrolü"
      ],
      performance: 92,
      status: "active",
      joinDate: "2015-02-01",
      lastPromotion: "2018-06-01",
      nextReview: "2025-02-01"
    },
    {
      id: "emp-003",
      name: "Fatma Demir",
      position: "Laboratuvar Müdürü",
      department: "Laboratuvar Hizmetleri",
      level: 2,
      managerId: "emp-001",
      managerName: "Dr. Mehmet Özkan",
      responsibilities: [
        "Laboratuvar operasyonları",
        "Test yönetimi",
        "Personel yönetimi"
      ],
      skills: [
        "Laboratuvar Yönetimi",
        "Test Teknikleri",
        "Personel Yönetimi"
      ],
      performance: 88,
      status: "active",
      joinDate: "2015-03-01",
      lastPromotion: "2019-03-01",
      nextReview: "2025-03-01"
    },
    {
      id: "emp-004",
      name: "Mehmet Kaya",
      position: "Teknik Müdür",
      department: "Teknik Hizmetler",
      level: 2,
      managerId: "emp-001",
      managerName: "Dr. Mehmet Özkan",
      responsibilities: [
        "Ekipman yönetimi",
        "Kalibrasyon",
        "Teknik destek"
      ],
      skills: [
        "Ekipman Yönetimi",
        "Kalibrasyon",
        "Teknik Destek"
      ],
      performance: 90,
      status: "active",
      joinDate: "2015-04-01",
      lastPromotion: "2020-04-01",
      nextReview: "2025-04-01"
    },
    {
      id: "emp-005",
      name: "Ayşe Yıldız",
      position: "İK Müdürü",
      department: "İnsan Kaynakları",
      level: 2,
      managerId: "emp-001",
      managerName: "Dr. Mehmet Özkan",
      responsibilities: [
        "Personel yönetimi",
        "Eğitim planlama",
        "Performans değerlendirme"
      ],
      skills: [
        "İnsan Kaynakları",
        "Eğitim Yönetimi",
        "Performans Değerlendirme"
      ],
      performance: 85,
      status: "active",
      joinDate: "2015-05-01",
      lastPromotion: "2021-05-01",
      nextReview: "2025-05-01"
    },
    {
      id: "emp-006",
      name: "Ali Çelik",
      position: "Mali İşler Müdürü",
      department: "Mali İşler",
      level: 2,
      managerId: "emp-001",
      managerName: "Dr. Mehmet Özkan",
      responsibilities: [
        "Mali yönetim",
        "Muhasebe",
        "Bütçe planlama"
      ],
      skills: [
        "Mali Yönetim",
        "Muhasebe",
        "Bütçe Planlama"
      ],
      performance: 92,
      status: "active",
      joinDate: "2015-06-01",
      lastPromotion: "2022-06-01",
      nextReview: "2025-06-01"
    }
  ],

  // Ekipman Envanteri Verileri
  equipmentInventory: [
    {
      id: "eq-001",
      name: "Analitik Terazi",
      model: "Sartorius Quintix 224-1S",
      serialNumber: "AT-2024-001",
      manufacturer: "Sartorius",
      category: "Analitik Cihazlar",
      subCategory: "Terazi",
      location: "Laboratuvar A - Kimya Bölümü",
      department: "Kimya Laboratuvarı",
      status: "pending",
      condition: "Mükemmel",
      purchaseDate: "2024-01-15",
      warrantyExpiry: "2027-01-15",
      lastCalibration: "2024-03-15",
      nextCalibration: "2024-09-15",
      calibrationFrequency: "6 ay",
      responsible: "Ahmet Yılmaz",
      cost: 45000,
      supplier: "Sartorius Türkiye",
      specifications: {
        capacity: "220g",
        readability: "0.1mg",
        accuracy: "±0.1mg",
        temperature: "15-40°C",
        humidity: "≤80% RH"
      },
      maintenance: {
        lastMaintenance: "2024-03-10",
        nextMaintenance: "2024-09-10",
        frequency: "6 ay",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-03-15",
          file: "calibration_cert_at001.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2024-01-15",
          file: "manual_at001.pdf"
        }
      ],
      history: [
        {
          date: "2024-03-15",
          action: "Kalibrasyon",
          description: "Yıllık kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        },
        {
          date: "2024-03-10",
          action: "Bakım",
          description: "Rutin bakım yapıldı",
          performedBy: "Teknik Servis"
        }
      ],
      isCritical: true,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Kritik analitik cihaz, günlük kontroller yapılmalı"
    },
    {
      id: "eq-002",
      name: "UV-Vis Spektrofotometre",
      model: "PerkinElmer Lambda 25",
      serialNumber: "UV-2024-002",
      manufacturer: "PerkinElmer",
      category: "Spektroskopik Cihazlar",
      subCategory: "UV-Vis",
      location: "Laboratuvar B - Fizikokimya Bölümü",
      department: "Fizikokimya Laboratuvarı",
      status: "pending",
      condition: "İyi",
      purchaseDate: "2023-06-20",
      warrantyExpiry: "2026-06-20",
      lastCalibration: "2024-02-10",
      nextCalibration: "2024-08-10",
      calibrationFrequency: "6 ay",
      responsible: "Fatma Demir",
      cost: 125000,
      supplier: "PerkinElmer Türkiye",
      specifications: {
        wavelengthRange: "190-1100 nm",
        accuracy: "±0.1 nm",
        resolution: "0.1 nm",
        scanSpeed: "60-3000 nm/min",
        temperature: "15-35°C"
      },
      maintenance: {
        lastMaintenance: "2024-02-05",
        nextMaintenance: "2024-08-05",
        frequency: "6 ay",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-02-10",
          file: "calibration_cert_uv002.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2023-06-20",
          file: "manual_uv002.pdf"
        }
      ],
      history: [
        {
          date: "2024-02-10",
          action: "Kalibrasyon",
          description: "Yıllık kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        },
        {
          date: "2024-02-05",
          action: "Bakım",
          description: "Rutin bakım ve temizlik",
          performedBy: "Teknik Servis"
        }
      ],
      isCritical: true,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Spektral analizler için kritik cihaz"
    },
    {
      id: "eq-003",
      name: "HPLC Sistemi",
      model: "Agilent 1260 Infinity II",
      serialNumber: "HPLC-2024-003",
      manufacturer: "Agilent",
      category: "Kromatografik Cihazlar",
      subCategory: "HPLC",
      location: "Laboratuvar C - Analitik Kimya Bölümü",
      department: "Analitik Kimya Laboratuvarı",
      status: "pending",
      condition: "Mükemmel",
      purchaseDate: "2024-02-10",
      warrantyExpiry: "2027-02-10",
      lastCalibration: "2024-04-20",
      nextCalibration: "2024-10-20",
      calibrationFrequency: "6 ay",
      responsible: "Mehmet Kaya",
      cost: 180000,
      supplier: "Agilent Türkiye",
      specifications: {
        pressure: "0-600 bar",
        flowRate: "0.001-10 mL/min",
        temperature: "4-80°C",
        wavelength: "190-950 nm",
        accuracy: "±0.1%"
      },
      maintenance: {
        lastMaintenance: "2024-04-15",
        nextMaintenance: "2024-10-15",
        frequency: "6 ay",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-04-20",
          file: "calibration_cert_hplc003.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2024-02-10",
          file: "manual_hplc003.pdf"
        }
      ],
      history: [
        {
          date: "2024-04-20",
          action: "Kalibrasyon",
          description: "Yıllık kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        },
        {
          date: "2024-04-15",
          action: "Bakım",
          description: "Rutin bakım ve kolon değişimi",
          performedBy: "Teknik Servis"
        }
      ],
      isCritical: true,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Yüksek performanslı sıvı kromatografi sistemi"
    },
    {
      id: "eq-004",
      name: "pH Metre",
      model: "Mettler Toledo SevenCompact",
      serialNumber: "PH-2024-004",
      manufacturer: "Mettler Toledo",
      category: "Elektrokimyasal Cihazlar",
      subCategory: "pH Metre",
      location: "Laboratuvar A - Kimya Bölümü",
      department: "Kimya Laboratuvarı",
      status: "pending",
      condition: "İyi",
      purchaseDate: "2023-09-15",
      warrantyExpiry: "2026-09-15",
      lastCalibration: "2024-01-20",
      nextCalibration: "2024-07-20",
      calibrationFrequency: "6 ay",
      responsible: "Ahmet Yılmaz",
      cost: 8500,
      supplier: "Mettler Toledo Türkiye",
      specifications: {
        range: "0-14 pH",
        accuracy: "±0.01 pH",
        resolution: "0.001 pH",
        temperature: "0-100°C",
        compensation: "ATC"
      },
      maintenance: {
        lastMaintenance: "2024-01-15",
        nextMaintenance: "2024-07-15",
        frequency: "6 ay",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-01-20",
          file: "calibration_cert_ph004.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2023-09-15",
          file: "manual_ph004.pdf"
        }
      ],
      history: [
        {
          date: "2024-01-20",
          action: "Kalibrasyon",
          description: "Yıllık kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        },
        {
          date: "2024-01-15",
          action: "Bakım",
          description: "Rutin bakım ve elektrot temizliği",
          performedBy: "Teknik Servis"
        }
      ],
      isCritical: false,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Rutin pH ölçümleri için kullanılıyor"
    },
    {
      id: "eq-005",
      name: "Santrifüj",
      model: "Eppendorf 5424",
      serialNumber: "CF-2024-005",
      manufacturer: "Eppendorf",
      category: "Genel Laboratuvar Cihazları",
      subCategory: "Santrifüj",
      location: "Laboratuvar B - Biyokimya Bölümü",
      department: "Biyokimya Laboratuvarı",
      status: "pending",
      condition: "Mükemmel",
      purchaseDate: "2024-03-01",
      warrantyExpiry: "2027-03-01",
      lastCalibration: "2024-03-01",
      nextCalibration: "2025-03-01",
      calibrationFrequency: "1 yıl",
      responsible: "Ayşe Yıldız",
      cost: 12000,
      supplier: "Eppendorf Türkiye",
      specifications: {
        maxSpeed: "15000 rpm",
        maxRCF: "20800 x g",
        capacity: "24 x 1.5/2.0 mL",
        temperature: "4-40°C",
        timer: "1-99 min"
      },
      maintenance: {
        lastMaintenance: "2024-03-01",
        nextMaintenance: "2025-03-01",
        frequency: "1 yıl",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-03-01",
          file: "calibration_cert_cf005.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2024-03-01",
          file: "manual_cf005.pdf"
        }
      ],
      history: [
        {
          date: "2024-03-01",
          action: "Kalibrasyon",
          description: "İlk kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        }
      ],
      isCritical: false,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Yeni alınan cihaz, biyokimya analizleri için"
    },
    {
      id: "eq-006",
      name: "Mikroskop",
      model: "Olympus BX53",
      serialNumber: "MS-2024-006",
      manufacturer: "Olympus",
      category: "Görüntüleme Cihazları",
      subCategory: "Mikroskop",
      location: "Laboratuvar C - Mikrobiyoloji Bölümü",
      department: "Mikrobiyoloji Laboratuvarı",
      status: "pending",
      condition: "İyi",
      purchaseDate: "2023-11-10",
      warrantyExpiry: "2026-11-10",
      lastCalibration: "2024-02-15",
      nextCalibration: "2025-02-15",
      calibrationFrequency: "1 yıl",
      responsible: "Ali Çelik",
      cost: 35000,
      supplier: "Olympus Türkiye",
      specifications: {
        magnification: "40x-1000x",
        illumination: "LED",
        camera: "5 MP",
        software: "cellSens",
        temperature: "15-35°C"
      },
      maintenance: {
        lastMaintenance: "2024-02-10",
        nextMaintenance: "2025-02-10",
        frequency: "1 yıl",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-02-15",
          file: "calibration_cert_ms006.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2023-11-10",
          file: "manual_ms006.pdf"
        }
      ],
      history: [
        {
          date: "2024-02-15",
          action: "Kalibrasyon",
          description: "Yıllık kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        },
        {
          date: "2024-02-10",
          action: "Bakım",
          description: "Rutin bakım ve lens temizliği",
          performedBy: "Teknik Servis"
        }
      ],
      isCritical: false,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Mikrobiyolojik analizler için kullanılıyor"
    },
    {
      id: "eq-007",
      name: "İnkübatör",
      model: "Memmert INB 400",
      serialNumber: "INC-2024-007",
      manufacturer: "Memmert",
      category: "İnkübatör ve Fırınlar",
      subCategory: "İnkübatör",
      location: "Laboratuvar B - Mikrobiyoloji Bölümü",
      department: "Mikrobiyoloji Laboratuvarı",
      status: "pending",
      condition: "Mükemmel",
      purchaseDate: "2024-01-20",
      warrantyExpiry: "2027-01-20",
      lastCalibration: "2024-01-20",
      nextCalibration: "2025-01-20",
      calibrationFrequency: "1 yıl",
      responsible: "Ali Çelik",
      cost: 18000,
      supplier: "Memmert Türkiye",
      specifications: {
        temperature: "5-100°C",
        accuracy: "±0.1°C",
        uniformity: "±0.5°C",
        capacity: "400L",
        humidity: "10-95% RH"
      },
      maintenance: {
        lastMaintenance: "2024-01-20",
        nextMaintenance: "2025-01-20",
        frequency: "1 yıl",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-01-20",
          file: "calibration_cert_inc007.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2024-01-20",
          file: "manual_inc007.pdf"
        }
      ],
      history: [
        {
          date: "2024-01-20",
          action: "Kalibrasyon",
          description: "İlk kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        }
      ],
      isCritical: false,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Mikrobiyolojik kültürler için kullanılıyor"
    },
    {
      id: "eq-008",
      name: "Buzdolabı",
      model: "Samsung RF28K9070SG",
      serialNumber: "RF-2024-008",
      manufacturer: "Samsung",
      category: "Soğutma Cihazları",
      subCategory: "Buzdolabı",
      location: "Laboratuvar A - Kimya Bölümü",
      department: "Kimya Laboratuvarı",
      status: "pending",
      condition: "İyi",
      purchaseDate: "2023-08-15",
      warrantyExpiry: "2026-08-15",
      lastCalibration: "2024-01-10",
      nextCalibration: "2025-01-10",
      calibrationFrequency: "1 yıl",
      responsible: "Ahmet Yılmaz",
      cost: 8500,
      supplier: "Samsung Türkiye",
      specifications: {
        temperature: "2-8°C",
        capacity: "28 cu ft",
        energy: "A++",
        features: "Frost Free"
      },
      maintenance: {
        lastMaintenance: "2024-01-05",
        nextMaintenance: "2025-01-05",
        frequency: "1 yıl",
        responsible: "Teknik Servis"
      },
      documents: [
        {
          type: "Sertifika",
          name: "Kalibrasyon Sertifikası",
          date: "2024-01-10",
          file: "calibration_cert_rf008.pdf"
        },
        {
          type: "Manuel",
          name: "Kullanım Kılavuzu",
          date: "2023-08-15",
          file: "manual_rf008.pdf"
        }
      ],
      history: [
        {
          date: "2024-01-10",
          action: "Kalibrasyon",
          description: "Yıllık kalibrasyon tamamlandı",
          performedBy: "Kalibrasyon Servisi"
        },
        {
          date: "2024-01-05",
          action: "Bakım",
          description: "Rutin bakım ve temizlik",
          performedBy: "Teknik Servis"
        }
      ],
      isCritical: false,
      requiresCalibration: true,
      requiresMaintenance: true,
      notes: "Numune saklama için kullanılıyor"
    }
  ]
}

// Mock API fonksiyonları
export const mockApi = {
  // Departmanlar
  getDepartments: () => Promise.resolve(mockData.departments),
  createDepartment: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateDepartment: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteDepartment: (id: string) => Promise.resolve({ success: true }),

  // Dokümanlar
  getDocuments: (filters?: any) => Promise.resolve(mockData.documents),
  getDocument: (id: string) => Promise.resolve(mockData.documents.find(d => d.id === id)),
  createDocument: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateDocument: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteDocument: (id: string) => Promise.resolve({ success: true }),

  // Kullanıcılar
  getUsers: () => Promise.resolve(mockData.users),
  getUser: (id: string) => Promise.resolve(mockData.users.find(u => u.id === id)),

  // Workflows
  getWorkflows: () => Promise.resolve(mockData.workflows),
  getWorkflow: (id: string) => Promise.resolve(mockData.workflows.find(w => w.id === id)),
  createUser: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateUser: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteUser: (id: string) => Promise.resolve({ success: true }),

  // Onaylar
  getApprovals: () => Promise.resolve(mockData.approvals),
  approveDocument: (id: string) => Promise.resolve({ success: true }),
  rejectDocument: (id: string) => Promise.resolve({ success: true }),

  // İş Akışları - Ek Fonksiyonlar
  createWorkflow: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateWorkflow: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteWorkflow: (id: string) => Promise.resolve({ success: true }),

  // Bulk Operations
  bulkOperation: (operation: string, documentIds: string[], comment?: string) => {
    console.log(`Bulk operation: ${operation}`, { documentIds, comment })
    return Promise.resolve({ success: true, message: `${operation} işlemi başarıyla tamamlandı` })
  },

  // Doküman Yönetimi - Ek Fonksiyonlar
  searchDocuments: (query: string) => Promise.resolve(mockData.documents.filter(d => 
    d.title.toLowerCase().includes(query.toLowerCase()) ||
    d.code.toLowerCase().includes(query.toLowerCase()) ||
    d.description.toLowerCase().includes(query.toLowerCase())
  )),
  getDocumentsByCategory: (categoryId: string) => Promise.resolve(mockData.documents.filter(d => d.category.id === categoryId)),
  getDocumentsByStatus: (status: string) => Promise.resolve(mockData.documents.filter(d => d.status === status)),
  getDocumentStats: () => Promise.resolve(mockData.documentStats),
  getCategoryStats: () => Promise.resolve(mockData.categoryStats),
  getSearchSuggestions: (query: string) => Promise.resolve(mockData.searchSuggestions.filter(s => 
    s.toLowerCase().includes(query.toLowerCase())
  )),

  // Kalibrasyon Programı
  getCalibrationPrograms: () => Promise.resolve(mockData.calibrationPrograms),
  getCalibrationProgram: (id: string) => Promise.resolve(mockData.calibrationPrograms.find(c => c.id === id)),
  createCalibrationProgram: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateCalibrationProgram: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteCalibrationProgram: (id: string) => Promise.resolve({ success: true }),

  // Kalibrasyon Kayıtları
  getCalibrationRecords: () => Promise.resolve(mockData.calibrationRecords),
  getCalibrationRecord: (id: string) => Promise.resolve(mockData.calibrationRecords.find(r => r.id === id)),
  createCalibrationRecord: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateCalibrationRecord: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteCalibrationRecord: (id: string) => Promise.resolve({ success: true }),

  // Tarafsızlık Yönetimi
  getImpartialityRecords: () => Promise.resolve(mockData.impartialityRecords),
  getImpartialityRecord: (id: string) => Promise.resolve(mockData.impartialityRecords.find(r => r.id === id)),
  createImpartialityRecord: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateImpartialityRecord: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteImpartialityRecord: (id: string) => Promise.resolve({ success: true }),

  // Gizlilik Anlaşmaları
  getConfidentialityAgreements: () => Promise.resolve(mockData.confidentialityAgreements),
  getConfidentialityAgreement: (id: string) => Promise.resolve(mockData.confidentialityAgreements.find(a => a.id === id)),
  createConfidentialityAgreement: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateConfidentialityAgreement: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteConfidentialityAgreement: (id: string) => Promise.resolve({ success: true }),

  // Organizasyon Şeması
  getOrganizationStructure: () => Promise.resolve(mockData.organizationStructure),
  getOrganizationDepartments: () => Promise.resolve(mockData.departments),
  getDepartment: (id: string) => Promise.resolve(mockData.departments.find((d: any) => d.id === id)),
  getPositions: () => Promise.resolve(mockData.organizationStructure.positions),
  getPosition: (id: string) => Promise.resolve(mockData.organizationStructure.positions.find((p: any) => p.id === id)),

  // Organizasyon Birimleri
  getOrganizationUnits: () => Promise.resolve(mockData.organizationUnits),
  getOrganizationUnit: (id: string) => Promise.resolve(mockData.organizationUnits.find(u => u.id === id)),
  createOrganizationUnit: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateOrganizationUnit: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteOrganizationUnit: (id: string) => Promise.resolve({ success: true }),

  // Çalışanlar
  getEmployees: () => Promise.resolve(mockData.employees),
  getEmployee: (id: string) => Promise.resolve(mockData.employees.find(e => e.id === id)),
  createEmployee: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateEmployee: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteEmployee: (id: string) => Promise.resolve({ success: true }),

  // Personel Yetkinlik
  getPersonnel: () => Promise.resolve(mockData.personnelCompetencies),
  getPersonnelCompetencies: () => Promise.resolve(mockData.personnelCompetencies),
  getPersonnelCompetency: (id: string) => Promise.resolve(mockData.personnelCompetencies.find(c => c.id === id)),
  createPersonnelCompetency: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updatePersonnelCompetency: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deletePersonnelCompetency: (id: string) => Promise.resolve({ success: true }),

  // Eğitim Planları
  getTrainingPlans: () => Promise.resolve(mockData.trainingPlans),
  getTrainingPlan: (id: string) => Promise.resolve(mockData.trainingPlans.find(p => p.id === id)),
  createTrainingPlan: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateTrainingPlan: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteTrainingPlan: (id: string) => Promise.resolve({ success: true }),

  // Ekipman Envanteri
  getEquipmentInventory: () => Promise.resolve(mockData.equipmentInventory),
  getEquipment: (id: string) => Promise.resolve(mockData.equipmentInventory.find(e => e.id === id)),
  createEquipment: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateEquipment: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteEquipment: (id: string) => Promise.resolve({ success: true }),

  // Yönetim Gözden Geçirmesi
  getManagementReviews: () => Promise.resolve(mockData.managementReviews),
  getManagementReview: (id: string) => Promise.resolve(mockData.managementReviews.find(r => r.id === id)),
  createManagementReview: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateManagementReview: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteManagementReview: (id: string) => Promise.resolve({ success: true }),

  // Numune Yönetimi
  getSamples: () => Promise.resolve(mockData.samples),
  getSample: (id: string) => Promise.resolve(mockData.samples.find(s => s.id === id)),
  createSample: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateSample: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteSample: (id: string) => Promise.resolve({ success: true }),

  // Test Metotları
  getTestMethods: () => Promise.resolve(mockData.testMethods),
  getTestMethod: (id: string) => Promise.resolve(mockData.testMethods.find(tm => tm.id === id)),
  createTestMethod: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateTestMethod: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteTestMethod: (id: string) => Promise.resolve({ success: true }),

  // Test İşleri
  getTestJobs: () => Promise.resolve(mockData.testJobs),
  getTestJob: (id: string) => Promise.resolve(mockData.testJobs.find(tj => tj.id === id)),
  createTestJob: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateTestJob: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteTestJob: (id: string) => Promise.resolve({ success: true }),

  // Risk Yönetimi
  getRisks: () => Promise.resolve(mockData.risks),
  getRisk: (id: string) => Promise.resolve(mockData.risks.find(r => r.id === id)),
  createRisk: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateRisk: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteRisk: (id: string) => Promise.resolve({ success: true }),

  getOpportunities: () => Promise.resolve(mockData.opportunities),
  getOpportunity: (id: string) => Promise.resolve(mockData.opportunities.find(o => o.id === id)),
  createOpportunity: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateOpportunity: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteOpportunity: (id: string) => Promise.resolve({ success: true }),

  // CAPA Sistemi
  getCAPAs: () => Promise.resolve(mockData.capas),
  getCAPA: (id: string) => Promise.resolve(mockData.capas.find(c => c.id === id)),
  createCAPA: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateCAPA: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteCAPA: (id: string) => Promise.resolve({ success: true }),

  // FASE 4 - Destek Modülleri

  // İç Denetim
  getInternalAudits: () => Promise.resolve(mockData.internalAudits),
  getInternalAudit: (id: string) => Promise.resolve(mockData.internalAudits.find(a => a.id === id)),
  createInternalAudit: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateInternalAudit: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteInternalAudit: (id: string) => Promise.resolve({ success: true }),

  // Yeterlilik Testleri
  getProficiencyTests: () => Promise.resolve(mockData.proficiencyTests),
  getProficiencyTest: (id: string) => Promise.resolve(mockData.proficiencyTests.find(t => t.id === id)),
  createProficiencyTest: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateProficiencyTest: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteProficiencyTest: (id: string) => Promise.resolve({ success: true }),

  // Müşteri Şikayetleri
  getCustomerComplaints: () => Promise.resolve(mockData.customerComplaints),
  getCustomerComplaint: (id: string) => Promise.resolve(mockData.customerComplaints.find(c => c.id === id)),
  createCustomerComplaint: (data: any) => Promise.resolve({ id: Date.now().toString(), ...data }),
  updateCustomerComplaint: (id: string, data: any) => Promise.resolve({ id, ...data }),
  deleteCustomerComplaint: (id: string) => Promise.resolve({ success: true })
}
