# 📋 Doküman Şeması Mock Data Yapısı

## 🎯 Doküman Veri Modeli

### **Doküman Ana Yapısı**
```typescript
interface Document {
  id: string
  code: string              // POL-001, PRO-001, vb.
  title: string
  category: DocumentCategory
  version: string           // v1.0, v1.1, vb.
  status: DocumentStatus
  description: string
  content: string
  author: string
  reviewer: string
  approver: string
  createdAt: string
  updatedAt: string
  publishedAt?: string
  archivedAt?: string
  nextReviewDate: string
  distributionList: string[]
  relatedDocuments: string[]
  tags: string[]
  fileSize: number
  fileType: string
  isActive: boolean
}
```

### **Doküman Kategorileri**
```typescript
interface DocumentCategory {
  id: string
  code: string              // POL, PRO, TAL, FOR, KAY, MET, KAL
  name: string
  description: string
  color: string
  icon: string
  parentCategoryId?: string
  sortOrder: number
}
```

### **Doküman Durumları**
```typescript
type DocumentStatus = 
  | 'draft'        // Taslak
  | 'review'       // İnceleme
  | 'approved'     // Onaylandı
  | 'archived'     // Arşiv
  | 'cancelled'    // İptal
```

## 📊 Mock Data Örnekleri

### **Politikalar (POL)**
```typescript
const policies: Document[] = [
  {
    id: "pol-001",
    code: "POL-001",
    title: "Kalite Politikası",
    category: { id: "pol", code: "POL", name: "Politikalar", color: "#3B82F6" },
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
    id: "pol-002",
    code: "POL-002",
    title: "Tarafsızlık Politikası",
    category: { id: "pol", code: "POL", name: "Politikalar", color: "#3B82F6" },
    version: "v1.3",
    status: "approved",
    description: "Laboratuvar tarafsızlık ve bağımsızlık politikası",
    content: "Tarafsızlık politikası içeriği...",
    author: "Mehmet Kaya",
    reviewer: "Ahmet Yılmaz",
    approver: "Kalite Müdürü",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-10",
    publishedAt: "2024-03-15",
    nextReviewDate: "2025-03-10",
    distributionList: ["Tüm Personel", "Yönetim"],
    relatedDocuments: ["PRO-003", "TAL-001"],
    tags: ["tarafsızlık", "etik", "bağımsızlık"],
    fileSize: 189440,
    fileType: "pdf",
    isActive: true
  }
]
```

### **Prosedürler (PRO)**
```typescript
const procedures: Document[] = [
  {
    id: "pro-001",
    code: "PRO-001",
    title: "Doküman Kontrol Prosedürü",
    category: { id: "pro", code: "PRO", name: "Prosedürler", color: "#10B981" },
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
    id: "pro-002",
    code: "PRO-002",
    title: "Numune Yönetimi Prosedürü",
    category: { id: "pro", code: "PRO", name: "Prosedürler", color: "#10B981" },
    version: "v2.0",
    status: "review",
    description: "Numune alım, saklama ve imha prosedürü",
    content: "Numune yönetimi prosedürü içeriği...",
    author: "Mehmet Kaya",
    reviewer: "Fatma Demir",
    approver: "Laboratuvar Müdürü",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-28",
    nextReviewDate: "2025-03-28",
    distributionList: ["Laboratuvar Ekibi"],
    relatedDocuments: ["PRO-001", "TAL-002"],
    tags: ["numune", "yönetim", "prosedür"],
    fileSize: 378880,
    fileType: "pdf",
    isActive: true
  }
]
```

### **Test Metotları (MET)**
```typescript
const testMethods: Document[] = [
  {
    id: "met-001",
    code: "MET-001",
    title: "Kimyasal Analiz Metotları",
    category: { id: "met", code: "MET", name: "Test Metotları", color: "#F59E0B" },
    version: "v4.1",
    status: "approved",
    description: "Kimyasal analiz için standart test metotları",
    content: "Kimyasal analiz metotları içeriği...",
    author: "Laboratuvar Uzmanı",
    reviewer: "Metot Validasyon Uzmanı",
    approver: "Teknik Müdür",
    createdAt: "2024-01-05",
    updatedAt: "2024-03-15",
    publishedAt: "2024-03-20",
    nextReviewDate: "2025-03-15",
    distributionList: ["Laboratuvar Ekibi", "Teknik Ekibi"],
    relatedDocuments: ["PRO-009", "KAL-001"],
    tags: ["kimyasal", "analiz", "metot", "validasyon"],
    fileSize: 892160,
    fileType: "pdf",
    isActive: true
  }
]
```

## 🔍 Arama ve Filtreleme Verileri

### **Kategori Filtreleri**
```typescript
const categoryFilters = [
  { id: "all", name: "Tümü", count: 156 },
  { id: "pol", name: "Politikalar", count: 8, color: "#3B82F6" },
  { id: "pro", name: "Prosedürler", count: 24, color: "#10B981" },
  { id: "tal", name: "Talimatlar", count: 18, color: "#8B5CF6" },
  { id: "for", name: "Formlar", count: 32, color: "#EF4444" },
  { id: "kay", name: "Kayıtlar", count: 45, color: "#06B6D4" },
  { id: "met", name: "Test Metotları", count: 15, color: "#F59E0B" },
  { id: "kal", name: "Kalibrasyon", count: 14, color: "#84CC16" }
]
```

### **Durum Filtreleri**
```typescript
const statusFilters = [
  { id: "all", name: "Tümü", count: 156 },
  { id: "draft", name: "Taslak", count: 12, color: "#6B7280" },
  { id: "review", name: "İnceleme", count: 8, color: "#F59E0B" },
  { id: "approved", name: "Onaylandı", count: 125, color: "#10B981" },
  { id: "archived", name: "Arşiv", count: 9, color: "#6B7280" },
  { id: "cancelled", name: "İptal", count: 2, color: "#EF4444" }
]
```

### **Arama Önerileri**
```typescript
const searchSuggestions = [
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
]
```

## 📊 İstatistik Verileri

### **Genel İstatistikler**
```typescript
const documentStats = {
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
}
```

### **Kategori Bazlı İstatistikler**
```typescript
const categoryStats = [
  { category: "Politikalar", count: 8, percentage: 5.1, trend: "stable" },
  { category: "Prosedürler", count: 24, percentage: 15.4, trend: "up" },
  { category: "Talimatlar", count: 18, percentage: 11.5, trend: "stable" },
  { category: "Formlar", count: 32, percentage: 20.5, trend: "up" },
  { category: "Kayıtlar", count: 45, percentage: 28.8, trend: "up" },
  { category: "Test Metotları", count: 15, percentage: 9.6, trend: "stable" },
  { category: "Kalibrasyon", count: 14, percentage: 9.0, trend: "down" }
]
```

### **Versiyon İstatistikleri**
```typescript
const versionStats = {
  totalVersions: 342,
  averageVersionsPerDocument: 2.2,
  mostUpdatedDocument: "PRO-001 - Doküman Kontrol Prosedürü (v3.2)",
  oldestDocument: "POL-001 - Kalite Politikası (v2.1)",
  recentUpdates: 23,
  pendingUpdates: 5
}
```

## 🔗 Doküman İlişkileri

### **İlişki Matrisi**
```typescript
const documentRelations = [
  {
    from: "POL-001",
    to: "PRO-001",
    type: "references",
    description: "Kalite Politikası, Doküman Kontrol Prosedürünü referans verir"
  },
  {
    from: "PRO-001",
    to: "FOR-001",
    type: "implements",
    description: "Doküman Kontrol Prosedürü, Doküman Kontrol Formunu uygular"
  },
  {
    from: "PRO-002",
    to: "TAL-002",
    type: "supports",
    description: "Numune Yönetimi Prosedürü, Numune Saklama Talimatını destekler"
  }
]
```

## 📈 Trend Verileri

### **Aylık Güncelleme Trendi**
```typescript
const monthlyUpdateTrend = [
  { month: "2024-01", updates: 15, newDocuments: 8 },
  { month: "2024-02", updates: 23, newDocuments: 12 },
  { month: "2024-03", updates: 18, newDocuments: 6 },
  { month: "2024-04", updates: 25, newDocuments: 10 },
  { month: "2024-05", updates: 20, newDocuments: 7 },
  { month: "2024-06", updates: 28, newDocuments: 14 }
]
```

### **Kategori Güncelleme Sıklığı**
```typescript
const categoryUpdateFrequency = [
  { category: "Prosedürler", frequency: "Aylık", lastUpdate: "2024-03-20" },
  { category: "Formlar", frequency: "Haftalık", lastUpdate: "2024-03-28" },
  { category: "Politikalar", frequency: "Yıllık", lastUpdate: "2024-03-15" },
  { category: "Test Metotları", frequency: "6 Aylık", lastUpdate: "2024-03-15" }
]
```

## 🎯 Mock API Fonksiyonları

### **Doküman Yönetimi API**
```typescript
export const documentApi = {
  // Doküman listesi
  getDocuments: (filters?: DocumentFilters) => Promise<Document[]>,
  
  // Doküman detayı
  getDocument: (id: string) => Promise<Document>,
  
  // Doküman arama
  searchDocuments: (query: string) => Promise<Document[]>,
  
  // Kategori bazlı filtreleme
  getDocumentsByCategory: (categoryId: string) => Promise<Document[]>,
  
  // Durum bazlı filtreleme
  getDocumentsByStatus: (status: DocumentStatus) => Promise<Document[]>,
  
  // Doküman oluşturma
  createDocument: (data: CreateDocumentRequest) => Promise<Document>,
  
  // Doküman güncelleme
  updateDocument: (id: string, data: UpdateDocumentRequest) => Promise<Document>,
  
  // Doküman silme
  deleteDocument: (id: string) => Promise<boolean>,
  
  // Doküman onaylama
  approveDocument: (id: string, approver: string) => Promise<Document>,
  
  // Doküman arşivleme
  archiveDocument: (id: string) => Promise<Document>,
  
  // Doküman versiyonlama
  createVersion: (id: string, version: string) => Promise<Document>,
  
  // İlişkili dokümanlar
  getRelatedDocuments: (id: string) => Promise<Document[]>,
  
  // Doküman istatistikleri
  getDocumentStats: () => Promise<DocumentStats>,
  
  // Kategori istatistikleri
  getCategoryStats: () => Promise<CategoryStats[]>,
  
  // Arama önerileri
  getSearchSuggestions: (query: string) => Promise<string[]>
}
```

Bu mock data yapısı, doküman şeması sisteminin tüm ihtiyaçlarını karşılayacak şekilde tasarlanmıştır ve ISO 17025 standartlarına uygun doküman yönetim sistemi için gerekli tüm veri modellerini içermektedir.
