# QDMS - Kalite Doküman Yönetim Sistemi

Bu proje, ISO 9001, ISO 17025 ve ISO 14001 standartlarına uyumlu bir Kalite Doküman Yönetim Sistemi (QDMS) uygulamasıdır.

> 📋 **Detaylı proje takip ve geliştirme planı için [`PROJECT_TRACKING.md`](./PROJECT_TRACKING.md) dosyasını inceleyiniz.**

## 🚀 Özellikler

- **Doküman Yönetimi**: Doküman oluşturma, düzenleme, versiyonlama ve onay süreçleri
- **Kullanıcı Yönetimi**: Rol tabanlı erişim kontrolü ve kullanıcı yönetimi
- **Departman Yönetimi**: Organizasyon yapısı ve departman yönetimi
- **Eğitim Yönetimi**: Eğitim planları, atamaları ve raporları
- **ISO Uyumluluğu**: ISO standartlarına uygun süreç yönetimi
- **Audit İzleme**: Tüm işlemlerin izlenebilirliği
- **Raporlama**: Kapsamlı raporlama ve analiz araçları

## 🛠️ Teknolojiler

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Kütüphanesi**: Radix UI, Tailwind CSS
- **Paket Yöneticisi**: npm
- **Form Yönetimi**: React Hook Form, Zod
- **Grafikler**: Recharts
- **Mock Data**: Frontend için örnek veriler

## 📋 Gereksinimler

- Node.js 18+ (Mevcut: v22.13.0)
- npm (Mevcut: v10.x)

## 🚀 Kurulum

1. **Projeyi klonlayın:**
   ```bash
   git clone <repository-url>
   cd kys
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Uygulamayı açın:**
   Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router sayfaları
│   ├── (dashboard)/       # Dashboard sayfaları
│   │   ├── iso/          # ISO 17025 modülleri
│   │   │   ├── calibration-program/     # Kalibrasyon Programı
│   │   │   ├── calibration-records/     # Kalibrasyon Kayıtları
│   │   │   ├── confidentiality/         # Gizlilik Anlaşmaları
│   │   │   ├── equipment/               # Ekipman Yönetimi
│   │   │   ├── equipment-inventory/     # Ekipman Envanteri
│   │   │   ├── impartiality/            # Tarafsızlık Yönetimi
│   │   │   ├── management/              # ISO Yönetim Sistemi
│   │   │   ├── organization/            # Organizasyon Şeması
│   │   │   ├── personnel/               # Personel Yönetimi
│   │   │   ├── personnel-competency/    # Personel Yetkinlik
│   │   │   └── training-plans/          # Eğitim Planları
│   │   ├── documents/    # Doküman Yönetimi
│   │   ├── users/        # Kullanıcı Yönetimi
│   │   └── departments/  # Departman Yönetimi
│   └── login/            # Giriş sayfası
├── components/            # React bileşenleri
│   ├── ui/               # UI bileşenleri (Radix UI)
│   └── qdms/             # QDMS özel bileşenleri
├── lib/                  # Yardımcı kütüphaneler ve mock data
│   ├── mock-data.ts      # Mock veri servisi
│   ├── types.ts          # TypeScript tip tanımları
│   └── utils.ts          # Yardımcı fonksiyonlar
└── public/               # Statik dosyalar
```

## 🔧 Geliştirme Komutları

```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production sunucusunu başlat
npm start

# Linting
npm run lint
```

## 📊 Mock Data Yapısı

Proje, frontend testleri için aşağıdaki mock verileri içerir:

- **Departmanlar**: Organizasyon yapısı ve departman bilgileri
- **Dokümanlar**: Doküman listesi ve detayları (ISO 17025 uyumlu)
- **Kullanıcılar**: Kullanıcı bilgileri ve rolleri
- **Onaylar**: Doküman onay süreçleri
- **İş Akışları**: Süreç tanımları
- **Ekipman Envanteri**: Laboratuvar ekipmanları ve kalibrasyon bilgileri
- **Kalibrasyon Programı**: Kalibrasyon planlama ve takip
- **Kalibrasyon Kayıtları**: Kalibrasyon geçmişi ve sertifikalar
- **Tarafsızlık Yönetimi**: Çıkar çakışması ve etik yönetim
- **Gizlilik Anlaşmaları**: Personel gizlilik sözleşmeleri
- **Organizasyon Şeması**: Şirket yapısı ve pozisyonlar
- **Personel Yetkinlik**: Personel beceri ve sertifikaları
- **Eğitim Planları**: Eğitim programları ve katılımcılar

Mock data `lib/mock-data.ts` dosyasında tanımlanmıştır.

## 🔐 Güvenlik (Frontend)

- Mock authentication sistemi
- Rol tabanlı UI kontrolü
- XSS koruması
- Güvenli form validasyonu

## 📝 Lisans

Bu proje özel kullanım içindir.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 Destek

Herhangi bir sorun yaşarsanız, lütfen issue oluşturun veya iletişime geçin.

---

**Not**: Bu proje v0.dev platformunda geliştirilmiştir ve Next.js 15 ile modern React özelliklerini kullanmaktadır. Backend bileşenleri kaldırılmış olup, sadece frontend odaklı bir uygulamadır.

## 📋 Proje Dokümantasyonu

- **📊 [Project Tracking](./PROJECT_TRACKING.md)**: Kapsamlı proje takip, geliştirme planı ve ilerleme durumu
- **📁 [Mock Data](./lib/mock-data.ts)**: Frontend için örnek veri yapısı
- **🔧 [Types](./lib/types.ts)**: TypeScript tip tanımları
- **⚙️ [Package Configuration](./package.json)**: Proje bağımlılıkları ve scriptler

## 🎯 Geliştirme Durumu

### ✅ Tamamlanan Modüller (FASE 1, 2, 3, 4 & 5)
- **Doküman Yönetim Sistemi**: ISO 17025 uyumlu doküman şeması
- **Ekipman Yönetimi**: Ekipman kayıtları ve kalibrasyon takibi
- **Ekipman Envanteri**: Kapsamlı envanter yönetimi ve analitik görünüm
- **Yönetim Gözden Geçirmesi**: Yönetim gözden geçirme süreçleri ve raporları
- **Numune Yönetimi**: Numune kabul, takip ve analiz süreçleri
- **Test Metotları**: Test metotları ve validasyon süreçleri
- **Test İşleri**: Test işleri yönetimi ve sonuç takibi
- **Risk Yönetimi**: Risk ve fırsat yönetimi süreçleri
- **CAPA Sistemi**: Düzeltici ve önleyici aksiyon yönetimi
- **İç Denetim**: ISO 17025 uyumlu iç denetim süreçleri
- **Yeterlilik Testleri**: Laboratuvar yeterlilik testleri ve değerlendirme
- **Müşteri Şikayetleri**: Müşteri geri bildirimleri ve şikayet yönetimi
- **Kalibrasyon Programı**: Kalibrasyon planlama ve takip ✅ **YENİ**
- **Kalibrasyon Kayıtları**: Kalibrasyon geçmişi ve sertifikalar ✅ **YENİ**
- **Tarafsızlık Yönetimi**: Çıkar çakışması ve etik yönetim ✅ **YENİ**
- **Gizlilik Anlaşmaları**: Personel gizlilik sözleşmeleri ✅ **YENİ**
- **Organizasyon Şeması**: Şirket yapısı ve pozisyonlar ✅ **YENİ**
- **Personel Yönetimi**: Personel bilgileri ve rolleri
- **Personel Yetkinlik**: Personel beceri ve sertifikaları ✅ **YENİ**
- **Eğitim Planları**: Eğitim programları ve katılımcılar ✅ **YENİ**

### ✅ Son Güncellemeler (Aralık 2024)
- **7 Eksik ISO Modülü Tamamlandı**: Kalibrasyon Kayıtları, Tarafsızlık Yönetimi, Gizlilik Anlaşmaları, Organizasyon Şeması, Personel Yetkinlik, Eğitim Planları
- **Akıl Yürütme Muhakemesi**: Her modül için detaylı analiz ve pattern uyumlu geliştirme
- **ISO 17025 Uyumluluğu**: Tüm modüller laboratuvar akreditasyon standartlarına uygun
- **Modern UI/UX**: Responsive tasarım, filtreleme, arama, sıralama özellikleri
- **Mock Data Entegrasyonu**: Gerçekçi test verileri ve API simülasyonu

### ⏳ Devam Eden Geliştirme
- **FASE 6**: Backend entegrasyonu ve production deployment
- **Raporlama Modülü**: Gelişmiş analitik ve raporlama özellikleri
- **Real-time Notifications**: Canlı bildirim sistemi
- **Mobile App**: React Native ile mobil uygulama
