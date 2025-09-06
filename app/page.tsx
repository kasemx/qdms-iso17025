import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Users, Shield, BarChart3, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">QDMS</h1>
                <p className="text-sm text-muted-foreground">Kalite Doküman Yönetim Sistemi</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                  ISO 9001
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                  ISO 17025
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">
                  ISO 14001
                </Badge>
              </div>
              <Button asChild>
                <Link href="/login">Giriş Yap</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Bölümü */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            ISO Standartlarına Uyumlu
            <span className="block text-primary">Doküman Yönetim Sistemi</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
            Şirketinizin kalite dokümanlarını ISO 9001, ISO 17025 ve ISO 14001 standartlarına uygun şekilde yönetin.
            Modüler, ölçeklenebilir ve geleceğe hazır çözüm.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <Link href="/login">Sisteme Giriş Yap</Link>
            </Button>
            <Button size="lg" variant="outline">
              Demo İzle
            </Button>
          </div>
        </div>

        {/* Özellikler Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-primary" />
                <CardTitle>Doküman Yönetimi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Prosedür, talimat, form ve kayıtlarınızı merkezi olarak yönetin. Versiyon kontrolü ve tam revizyon
                geçmişi ile.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Standart şablonlar</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Otomatik versiyon kontrolü</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Bağlantılı dokümanlar</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-8 w-8 text-green-600" />
                <CardTitle>Onay Süreçleri</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Taslak → İnceleme → Onay → Yayın iş akışı ile dokümanlarınızın kontrollü şekilde yayınlanmasını
                sağlayın.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Rol bazlı görevler</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Elektronik imza desteği</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Otomatik bildirimler</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-purple-600" />
                <CardTitle>Erişim Yönetimi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Rol Bazlı Erişim Kontrolü (RBAC) ile dokümanlarınıza kimlerin erişebileceğini departman ve rol bazında
                belirleyin.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Departman bazlı izinler</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>2FA güvenlik</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>LDAP entegrasyonu</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Clock className="h-8 w-8 text-orange-600" />
                <CardTitle>Bildirim Sistemi</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Onay bekleyen, revizyon tarihi yaklaşan ve süresi dolan dokümanlar için otomatik e-posta ve sistem
                bildirimleri.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>E-posta hatırlatmaları</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Dashboard bildirimleri</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Özelleştirilebilir süreler</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BarChart3 className="h-8 w-8 text-red-600" />
                <CardTitle>Denetim İzleri</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Her erişim, indirme, düzenleme ve onayın detaylı kaydını tutun. ISO denetimlerine hazır raporlama.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Tam aktivite logları</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Denetim raporları</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Kullanıcı aktivite analizi</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <FileText className="h-8 w-8 text-indigo-600" />
                <CardTitle>ISO Uyumluluk</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Her dokümanı ilgili ISO maddelerine bağlayın. Standart uyumluluk haritalama ile denetim süreçlerinizi
                kolaylaştırın.
              </CardDescription>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ISO madde haritalama</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Uyumluluk raporları</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Denetim hazırlık desteği</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* İstatistikler */}
        <div className="bg-card rounded-lg p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8 text-card-foreground">Sistem Özellikleri</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Doküman Türü</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">6</div>
              <div className="text-muted-foreground">Kullanıcı Rolü</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
              <div className="text-muted-foreground">ISO Standardı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-muted-foreground">Sistem Erişimi</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card text-card-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2024 QDMS - Kalite Doküman Yönetim Sistemi. Tüm hakları saklıdır.</p>
          <p className="text-sm text-muted-foreground mt-2">
            ISO 9001, ISO 17025 ve ISO 14001 standartlarına uyumlu çözüm
          </p>
        </div>
      </footer>
    </div>
  )
}
