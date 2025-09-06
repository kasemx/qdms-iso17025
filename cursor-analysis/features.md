# QDMS Özellik Haritası ve Dosya Eşlemeleri

## 📁 Proje Yapısı

### 🏠 Ana Sayfalar
- **`/`** → `app/page.tsx` - Landing page ve giriş
- **`/login`** → `app/login/page.tsx` - Kullanıcı girişi
- **`/dashboard`** → `app/(dashboard)/dashboard/page.tsx` - Ana dashboard

### 📋 Doküman Yönetimi
- **`/documents`** → `app/(dashboard)/documents/page.tsx` - Doküman listesi
- **`/documents/schema`** → `app/(dashboard)/documents/schema/page.tsx` - Doküman şeması
- **`/documents/create`** → `app/(dashboard)/documents/create/page.tsx` - Yeni doküman oluşturma
- **`/documents/[id]`** → `app/(dashboard)/documents/[id]/page.tsx` - Doküman detayı
- **`/documents/[id]/edit`** → `app/(dashboard)/documents/[id]/edit/page.tsx` - Doküman düzenleme
- **`/documents/[id]/compare`** → `app/(dashboard)/documents/[id]/compare/page.tsx` - Versiyon karşılaştırma

### 🏢 ISO 17025 Modülleri

#### ✅ Tamamlanmış Modüller
- **`/iso/management`** → `app/(dashboard)/iso/management/page.tsx` - ISO Yönetim Sistemi
- **`/iso/personnel`** → `app/(dashboard)/iso/personnel/page.tsx` - Personel Yönetimi
- **`/iso/equipment`** → `app/(dashboard)/iso/equipment/page.tsx` - Ekipman Yönetimi
- **`/iso/equipment/[id]`** → `app/(dashboard)/iso/equipment/[id]/page.tsx` - Ekipman detayı
- **`/iso/equipment-inventory`** → `app/(dashboard)/iso/equipment-inventory/page.tsx` - Ekipman Envanteri
- **`/iso/management-review`** → `app/(dashboard)/iso/management-review/page.tsx` - Yönetim Gözden Geçirme
- **`/iso/sample-management`** → `app/(dashboard)/iso/sample-management/page.tsx` - Numune Yönetimi
- **`/iso/test-methods`** → `app/(dashboard)/iso/test-methods/page.tsx` - Test Metotları
- **`/iso/test-jobs`** → `app/(dashboard)/iso/test-jobs/page.tsx` - Test İşleri
- **`/iso/risk-management`** → `app/(dashboard)/iso/risk-management/page.tsx` - Risk Yönetimi
- **`/iso/capa-system`** → `app/(dashboard)/iso/capa-system/page.tsx` - CAPA Sistemi
- **`/iso/internal-audit`** → `app/(dashboard)/iso/internal-audit/page.tsx` - İç Denetim
- **`/iso/proficiency-tests`** → `app/(dashboard)/iso/proficiency-tests/page.tsx` - Yeterlilik Testleri
- **`/iso/customer-complaints`** → `app/(dashboard)/iso/customer-complaints/page.tsx` - Müşteri Şikayetleri

#### ✅ Son Tamamlanan Modüller (Aralık 2024)
- **`/iso/calibration-program`** → `app/(dashboard)/iso/calibration-program/page.tsx` - Kalibrasyon Programı ✅
- **`/iso/calibration-records`** → `app/(dashboard)/iso/calibration-records/page.tsx` - Kalibrasyon Kayıtları ✅
- **`/iso/confidentiality`** → `app/(dashboard)/iso/confidentiality/page.tsx` - Gizlilik Anlaşmaları ✅
- **`/iso/impartiality`** → `app/(dashboard)/iso/impartiality/page.tsx` - Tarafsızlık Yönetimi ✅
- **`/iso/organization`** → `app/(dashboard)/iso/organization/page.tsx` - Organizasyon Şeması ✅
- **`/iso/personnel-competency`** → `app/(dashboard)/iso/personnel-competency/page.tsx` - Personel Yetkinlik ✅
- **`/iso/training-plans`** → `app/(dashboard)/iso/training-plans/page.tsx` - Eğitim Planları ✅

### 🔄 İş Akışları ve Onaylar
- **`/workflows`** → `app/(dashboard)/workflows/page.tsx` - İş akışları yönetimi
- **`/approvals`** → `app/(dashboard)/approvals/page.tsx` - Onay bekleyenler
- **`/reminders`** → `app/(dashboard)/reminders/page.tsx` - Hatırlatıcılar

### 👥 Kullanıcı ve Organizasyon
- **`/users`** → `app/(dashboard)/users/page.tsx` - Kullanıcı yönetimi
- **`/departments`** → `app/(dashboard)/departments/page.tsx` - Departman yönetimi
- **`/roles`** → `app/(dashboard)/roles/page.tsx` - Rol yönetimi
- **`/profile`** → `app/(dashboard)/profile/page.tsx` - Kullanıcı profili

### 🎓 Eğitim Sistemi
- **`/training`** → `app/(dashboard)/training/page.tsx` - Eğitim ana sayfası
- **`/training/all`** → `app/(dashboard)/training/all/page.tsx` - Tüm eğitimler
- **`/training/assignments`** → `app/(dashboard)/training/assignments/page.tsx` - Eğitim atamaları
- **`/training/reports`** → `app/(dashboard)/training/reports/page.tsx` - Eğitim raporları

### 📊 Raporlama ve Analiz
- **`/reports`** → `app/(dashboard)/reports/page.tsx` - Raporlar
- **`/audit`** → `app/(dashboard)/audit/page.tsx` - Audit trail
- **`/search`** → `app/(dashboard)/search/page.tsx` - Arama
- **`/system-health`** → `app/(dashboard)/system-health/page.tsx` - Sistem sağlığı

### ⚙️ Sistem ve Entegrasyonlar
- **`/settings`** → `app/(dashboard)/settings/page.tsx` - Sistem ayarları
- **`/integrations`** → `app/(dashboard)/integrations/page.tsx` - Entegrasyonlar

## 🧩 Bileşen Yapısı

### 📱 Layout Bileşenleri
- **`components/layout/header.tsx`** - Ana header bileşeni
- **`components/layout/sidebar.tsx`** - Yan menü bileşeni
- **`components/theme-provider.tsx`** - Tema yönetimi

### 🎨 UI Bileşenleri (Radix UI)
- **`components/ui/`** - 40+ UI bileşeni
  - `button.tsx`, `card.tsx`, `dialog.tsx`, `form.tsx`
  - `table.tsx`, `tabs.tsx`, `toast.tsx`, `tooltip.tsx`
  - `data-table.tsx`, `file-upload.tsx`, `chart.tsx`

### 🔧 QDMS Özel Bileşenleri
- **`components/qdms/approval-workflow.tsx`** - Onay iş akışı
- **`components/qdms/document-viewer.tsx`** - Doküman görüntüleyici

## 📚 Kütüphane ve Yardımcılar

### 📁 Lib Klasörü
- **`lib/types.ts`** - TypeScript tip tanımları
- **`lib/mock-data.ts`** - Mock veri servisi
- **`lib/utils.ts`** - Yardımcı fonksiyonlar
- **`lib/accessibility.ts`** - Erişilebilirlik yardımcıları
- **`lib/integrations.ts`** - Entegrasyon yardımcıları
- **`lib/performance.ts`** - Performans yardımcıları
- **`lib/priority-utils.tsx`** - Öncelik yardımcıları

### 🎣 Hooks
- **`hooks/use-mobile.ts`** - Mobil cihaz algılama
- **`hooks/use-toast.ts`** - Toast bildirimleri

## 🎯 Özellik Kategorileri

### 📋 Doküman Yönetimi
- Doküman oluşturma, düzenleme, silme
- Versiyon kontrolü ve karşılaştırma
- Kategori bazlı organizasyon
- Arama ve filtreleme
- Onay süreçleri

### 🏢 ISO 17025 Uyumluluğu
- Laboratuvar yeterlilik gereksinimleri
- Ekipman kalibrasyon takibi
- Personel yetkinlik yönetimi
- Test metotları ve validasyon
- Risk ve fırsat yönetimi

### 👥 Kullanıcı Yönetimi
- Rol tabanlı erişim kontrolü
- Departman organizasyonu
- Kullanıcı profilleri
- Yetki yönetimi

### 📊 Raporlama ve Analiz
- Dashboard ve metrikler
- Audit trail ve loglar
- Sistem sağlığı izleme
- Performans analizi

### 🔄 İş Akışları
- Onay süreçleri
- Hatırlatıcılar
- Bildirim sistemi
- Durum takibi

## 🚀 Geliştirme Durumu

### ✅ Tamamlanan (%100)
- 22+ ana modül (tüm ISO 17025 modülleri)
- 50+ UI bileşeni
- Mock data sistemi
- Responsive tasarım
- TypeScript tip güvenliği
- Akıl yürütme muhakemesi ile geliştirme
- ISO 17025 uyumluluğu

### 🔄 Devam Eden Geliştirme
- Production environment setup
- Gerçek authentication sistemi
- Backend entegrasyonu
- Test coverage

## 📈 Teknik Özellikler

### 🎨 Frontend
- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19 + Radix UI
- **Styling**: Tailwind CSS 4.1.9
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React

### 🔧 Geliştirme
- **Language**: TypeScript 5
- **Package Manager**: npm
- **Build Tool**: Next.js
- **CSS Processing**: PostCSS
- **Code Quality**: ESLint + Prettier

### 📱 Responsive Design
- Mobile-first approach
- Tablet ve desktop uyumlu
- Touch-friendly interface
- Accessible design patterns
