# QDMS Çalıştırma Talimatları

## 📋 Sistem Gereksinimleri

### Minimum Gereksinimler
- **Node.js**: 18.0.0 veya üzeri (Mevcut: v22.13.0)
- **npm**: 8.0.0 veya üzeri (Mevcut: v10.x)
- **RAM**: 4GB (8GB önerilen)
- **Disk**: 2GB boş alan
- **İşletim Sistemi**: Windows 10+, macOS 10.15+, Linux Ubuntu 18.04+

### Önerilen Gereksinimler
- **Node.js**: 20.x LTS
- **npm**: 10.x
- **RAM**: 8GB+
- **Disk**: 5GB+ boş alan
- **İşlemci**: 4+ çekirdek

## 🚀 Hızlı Başlangıç

### 1. Projeyi Klonlama
```bash
# Projeyi klonla
git clone <repository-url>
cd kys

# Veya mevcut dizinde
cd C:\Users\a_fea\Desktop\kys
```

### 2. Bağımlılıkları Yükleme
```bash
# npm ile bağımlılıkları yükle
npm install

# Alternatif: yarn kullanıyorsanız
yarn install

# Alternatif: pnpm kullanıyorsanız
pnpm install
```

### 3. Geliştirme Sunucusunu Başlatma
```bash
# Geliştirme sunucusunu başlat
npm run dev

# Alternatif komutlar
yarn dev
pnpm dev
```

### 4. Uygulamayı Açma
- Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin
- Ana sayfa yüklenecektir

## 🔧 Geliştirme Komutları

### Temel Komutlar
```bash
# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Production sunucusunu başlat
npm start

# Linting yap
npm run lint
```

### Geliştirme Sunucusu Seçenekleri
```bash
# Farklı port ile çalıştır
npm run dev -- --port 3001

# Host belirle
npm run dev -- --hostname 0.0.0.0

# HTTPS ile çalıştır
npm run dev -- --https
```

## 🌐 Erişim Noktaları

### Ana Sayfalar
- **Landing Page**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Dashboard**: http://localhost:3000/dashboard

### API Endpoints (Mock)
- **Dokümanlar**: Mock data kullanılıyor
- **Kullanıcılar**: Mock authentication
- **Ekipmanlar**: Mock data servisi

## ⚙️ Konfigürasyon

### Environment Variables
```bash
# .env.local dosyası oluşturun
NEXT_PUBLIC_APP_NAME=QDMS
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Next.js Konfigürasyonu
- **Dosya**: `next.config.mjs`
- **ESLint**: Aktif
- **TypeScript**: Strict mode
- **Image Optimization**: Aktif
- **CSS Optimization**: Aktif

### Tailwind CSS Konfigürasyonu
- **Dosya**: `tailwind.config.js` (otomatik)
- **PostCSS**: `postcss.config.mjs`
- **CSS Variables**: Aktif
- **Dark Mode**: Destekleniyor

## 🐛 Sorun Giderme

### Yaygın Sorunlar

#### 1. Port Zaten Kullanımda
```bash
# Port 3000 kullanımda ise
npm run dev -- --port 3001

# Veya mevcut process'i sonlandır
npx kill-port 3000
```

#### 2. Node Modules Hatası
```bash
# node_modules'ı sil ve yeniden yükle
rm -rf node_modules package-lock.json
npm install
```

#### 3. TypeScript Hatası
```bash
# TypeScript cache'i temizle
rm -rf .next
npm run build
```

#### 4. Tailwind CSS Hatası
```bash
# PostCSS cache'i temizle
rm -rf .next
npm run dev
```

### Debug Modu
```bash
# Debug modunda çalıştır
DEBUG=* npm run dev

# Sadece Next.js debug
DEBUG=next:* npm run dev
```

## 📱 Mobil Geliştirme

### Responsive Test
```bash
# Farklı cihaz boyutlarında test
# Chrome DevTools > Device Toolbar
# - Mobile: 375x667
# - Tablet: 768x1024
# - Desktop: 1920x1080
```

### PWA Test
```bash
# Lighthouse ile PWA test
npx lighthouse http://localhost:3000 --view
```

## 🔒 Güvenlik

### Geliştirme Güvenliği
- Hardcoded secret yok
- Environment variables kullanılıyor
- XSS koruması aktif
- CSRF koruması (Next.js)

### Production Hazırlığı
```bash
# Security audit
npm audit

# Vulnerabilities fix
npm audit fix

# Outdated packages check
npm outdated
```

## 📊 Performans

### Build Analizi
```bash
# Bundle analizi
npm run build
npx @next/bundle-analyzer

# Performance test
npm run build
npm start
# Lighthouse ile test
```

### Optimizasyon
- **Code Splitting**: Otomatik
- **Image Optimization**: Next.js Image
- **CSS Optimization**: Tailwind CSS
- **Tree Shaking**: Webpack

## 🧪 Test

### Test Komutları
```bash
# Linting
npm run lint

# Type checking
npx tsc --noEmit

# Build test
npm run build
```

### Test Coverage (Gelecek)
```bash
# Unit testler (henüz yok)
npm run test

# E2E testler (henüz yok)
npm run test:e2e
```

## 🚀 Production Deployment

### Build ve Start
```bash
# Production build
npm run build

# Production start
npm start

# PM2 ile çalıştır
pm2 start npm --name "qdms" -- start
```

### Docker (Gelecek)
```dockerfile
# Dockerfile örneği
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Geliştirme Notları

### Hot Reload
- Dosya değişikliklerinde otomatik yenileme
- State korunur
- CSS değişiklikleri anında yansır

### Mock Data
- `lib/mock-data.ts` dosyasında tanımlı
- Gerçek API entegrasyonu yok
- Frontend testleri için yeterli

### TypeScript
- Strict mode aktif
- Tip güvenliği %100
- IntelliSense desteği

## 🆘 Yardım ve Destek

### Log Dosyaları
- **Next.js Logs**: Terminal çıktısı
- **Browser Console**: F12 > Console
- **Network**: F12 > Network

### Debug Araçları
- **React DevTools**: Browser extension
- **Next.js DevTools**: Built-in
- **Tailwind CSS IntelliSense**: VS Code extension

### Yaygın Hatalar
1. **Module not found**: `npm install` çalıştırın
2. **Port in use**: Farklı port kullanın
3. **Build failed**: TypeScript hatalarını kontrol edin
4. **CSS not loading**: Tailwind CSS cache'i temizleyin
