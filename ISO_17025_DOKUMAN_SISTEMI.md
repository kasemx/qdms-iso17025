# 📋 ISO 17025 Doküman Yönetim Sistemi

## 🎯 Doküman Kategorileri ve Kodlama Sistemi

### **Ana Kategoriler**

#### 1. **Politikalar (POL)**
```
POL-001: Kalite Politikası
POL-002: Tarafsızlık Politikası
POL-003: Gizlilik Politikası
POL-004: Sürekli İyileştirme Politikası
```

#### 2. **Prosedürler (PRO)**
```
PRO-001: Doküman Kontrol Prosedürü
PRO-002: Kayıt Kontrol Prosedürü
PRO-003: İç Denetim Prosedürü
PRO-004: Düzeltici ve Önleyici Aksiyon Prosedürü
PRO-005: Müşteri Şikayetleri Prosedürü
PRO-006: Personel Yönetimi Prosedürü
PRO-007: Ekipman Yönetimi Prosedürü
PRO-008: Numune Yönetimi Prosedürü
PRO-009: Test Metotları Prosedürü
PRO-010: Kalibrasyon Prosedürü
```

#### 3. **Talimatlar (TAL)**
```
TAL-001: Laboratuvar Güvenlik Talimatı
TAL-002: Çevresel Koşul Kontrol Talimatı
TAL-003: Ölçüm Belirsizliği Hesaplama Talimatı
TAL-004: Test Sonuç Raporlama Talimatı
TAL-005: Kalibrasyon Sertifikası Talimatı
```

#### 4. **Formlar (FOR)**
```
FOR-001: Numune Kabul Formu
FOR-002: Test Talep Formu
FOR-003: Kalibrasyon Kayıt Formu
FOR-004: İç Denetim Formu
FOR-005: Müşteri Şikayet Formu
FOR-006: Personel Yetkinlik Değerlendirme Formu
FOR-007: Ekipman Bakım Formu
FOR-008: Risk Değerlendirme Formu
```

#### 5. **Kayıtlar (KAY)**
```
KAY-001: Kalite Yönetim Sistemi Kayıtları
KAY-002: Personel Eğitim Kayıtları
KAY-003: Ekipman Kalibrasyon Kayıtları
KAY-004: Test Sonuç Kayıtları
KAY-005: İç Denetim Kayıtları
KAY-006: Müşteri Şikayet Kayıtları
KAY-007: Yönetim Gözden Geçirme Kayıtları
```

#### 6. **Test Metotları (MET)**
```
MET-001: Kimyasal Analiz Metotları
MET-002: Fiziksel Test Metotları
MET-003: Mikrobiyolojik Test Metotları
MET-004: Spektroskopik Analiz Metotları
MET-005: Kromatografik Analiz Metotları
```

#### 7. **Kalibrasyon Dokümanları (KAL)**
```
KAL-001: Kalibrasyon Prosedürleri
KAL-002: Kalibrasyon Sertifikaları
KAL-003: Kalibrasyon Kayıtları
KAL-004: Kalibrasyon Programları
KAL-005: Kalibrasyon Raporları
```

## 🔢 Versiyonlama Sistemi

### **Versiyon Numarası Formatı**
```
v[Major].[Minor].[Patch]
```

### **Versiyon Artırma Kuralları**
- **Major (X.0.0)**: Büyük değişiklikler, yeni bölümler
- **Minor (X.Y.0)**: Yeni içerik, küçük değişiklikler
- **Patch (X.Y.Z)**: Düzeltmeler, format değişiklikleri

### **Örnek Versiyonlama**
```
v1.0.0: İlk yayın
v1.1.0: Yeni bölüm eklendi
v1.1.1: Yazım hatası düzeltildi
v2.0.0: Büyük revizyon
```

## 📊 Doküman Durumları

### **Yaşam Döngüsü Durumları**
1. **Taslak (Draft)**: Düzenleme aşamasında
2. **İnceleme (Review)**: Onay bekliyor
3. **Onaylandı (Approved)**: Aktif kullanımda
4. **Arşiv (Archived)**: Kullanımdan kaldırıldı
5. **İptal (Cancelled)**: İptal edildi

### **Durum Geçişleri**
```
Taslak → İnceleme → Onaylandı → Arşiv
  ↓         ↓
İptal ← İnceleme
```

## 🔍 Doküman Şeması Özellikleri

### **Arama ve Filtreleme**
- **Kategori Bazlı**: POL, PRO, TAL, FOR, KAY, MET, KAL
- **Kod Bazlı**: Doküman koduna göre arama
- **Versiyon Bazlı**: Belirli versiyon arama
- **Durum Bazlı**: Aktif, arşiv, taslak
- **Tarih Bazlı**: Oluşturma, güncelleme tarihi
- **Anahtar Kelime**: İçerik bazlı arama

### **Görsel Şema Özellikleri**
- **Hiyerarşik Görünüm**: Kategori → Alt kategori → Doküman
- **İlişki Haritası**: Dokümanlar arası referanslar
- **Durum Göstergeleri**: Renk kodlu durum işaretleri
- **İstatistik Paneli**: Doküman sayıları ve dağılımı

### **Doküman İçerik Özellikleri**
- **Önizleme**: Doküman içeriğini hızlı görüntüleme
- **Versiyon Karşılaştırma**: Farklı versiyonları karşılaştırma
- **Değişiklik Geçmişi**: Revizyon takibi
- **İmza Sistemi**: Dijital imza ve onay
- **Dağıtım Listesi**: Erişim kontrolü

## 📋 Doküman Şablonları

### **Politika Şablonu**
```
DOKÜMAN BİLGİLERİ
- Doküman Kodu: POL-XXX
- Versiyon: vX.X
- Tarih: YYYY-MM-DD
- Onaylayan: [İsim]
- Dağıtım: [Liste]

İÇERİK
1. Amaç
2. Kapsam
3. Sorumluluklar
4. Uygulama
5. İlgili Dokümanlar
```

### **Prosedür Şablonu**
```
DOKÜMAN BİLGİLERİ
- Doküman Kodu: PRO-XXX
- Versiyon: vX.X
- Tarih: YYYY-MM-DD
- Hazırlayan: [İsim]
- Onaylayan: [İsim]

İÇERİK
1. Amaç
2. Kapsam
3. Tanımlar
4. Sorumluluklar
5. Prosedür Adımları
6. Kayıtlar
7. İlgili Dokümanlar
```

## 🔄 Güncelleme ve Revizyon Süreci

### **Revizyon Tetikleyicileri**
- ISO 17025 standardı değişiklikleri
- İç denetim bulguları
- Müşteri geri bildirimleri
- Sürekli iyileştirme gereksinimleri
- Yasal değişiklikler

### **Revizyon Süreci**
1. **Revizyon Talebi**: Gerekçe ve kapsam
2. **İçerik Güncelleme**: Doküman düzenleme
3. **İnceleme**: Uzman incelemesi
4. **Onay**: Yetkili onayı
5. **Dağıtım**: Güncellenmiş doküman dağıtımı
6. **Eğitim**: Personel bilgilendirme

## 📊 Raporlama ve İstatistikler

### **Doküman İstatistikleri**
- Toplam doküman sayısı
- Kategori bazlı dağılım
- Durum bazlı dağılım
- Versiyon güncelleme sıklığı
- Onay süreç süreleri

### **Uyumluluk Raporları**
- ISO 17025 gereksinim karşılıkları
- Eksik dokümanlar
- Güncellenmesi gereken dokümanlar
- Onay süreci gecikmeleri

## 🎯 Hedefler

### **Kısa Vadeli (1-3 ay)**
- Doküman şeması sistemi kurulumu
- Temel doküman kategorileri oluşturma
- Arama ve filtreleme sistemi
- Versiyonlama sistemi

### **Orta Vadeli (3-6 ay)**
- Tüm ISO 17025 dokümanlarının sisteme aktarımı
- Gelişmiş arama ve raporlama
- Doküman ilişki haritası
- Otomatik uyarı sistemi

### **Uzun Vadeli (6-12 ay)**
- AI destekli doküman önerileri
- Otomatik versiyonlama
- Entegre eğitim sistemi
- Mobil erişim
