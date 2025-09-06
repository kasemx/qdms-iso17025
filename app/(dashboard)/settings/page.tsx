"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, Bell, Globe, Shield, Database, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [settings, setSettings] = useState({
    companyName: "ABC Şirketi",
    systemLanguage: "tr",
    emailNotifications: true,
    pushNotifications: true,
    documentRetention: "60",
    reviewReminderDays: "30",
    maxFileSize: "50",
    autoBackup: true,
    backupRetention: "90",
  })

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      })

      if (!response.ok) {
        throw new Error("Ayarlar kaydedilemedi")
      }

      const result = await response.json()

      toast({
        title: "Başarılı",
        description: "Sistem ayarları başarıyla kaydedildi.",
      })

      console.log("Ayarlar kaydedildi:", result)
    } catch (error) {
      console.error("Ayar kaydetme hatası:", error)
      toast({
        title: "Hata",
        description: "Ayarlar kaydedilirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistem Ayarları</h1>
          <p className="text-muted-foreground">QDMS sistem yapılandırması ve tercihler</p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Kaydediliyor..." : "Ayarları Kaydet"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Genel Ayarlar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Genel Ayarlar</span>
            </CardTitle>
            <CardDescription>Temel sistem yapılandırması</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Şirket Adı</Label>
              <Input
                id="companyName"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="systemLanguage">Sistem Dili</Label>
              <Select
                value={settings.systemLanguage}
                onValueChange={(value) => setSettings({ ...settings, systemLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">ISO Standartları</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                  ISO 9001:2015
                </Badge>
                <Badge variant="outline" className="text-blue-700 border-blue-300 bg-blue-50">
                  ISO 17025:2017
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">
                  ISO 14001:2015
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bildirim Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Bildirim Ayarları</span>
            </CardTitle>
            <CardDescription>E-posta ve sistem bildirimleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>E-posta Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">
                  Onay, hatırlatma ve sistem bildirimlerini e-posta ile al
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Bildirimleri</Label>
                <p className="text-sm text-muted-foreground">Tarayıcı üzerinden anlık bildirimler</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, pushNotifications: checked })}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="reviewReminderDays">Revizyon Hatırlatma (Gün)</Label>
              <Input
                id="reviewReminderDays"
                type="number"
                value={settings.reviewReminderDays}
                onChange={(e) => setSettings({ ...settings, reviewReminderDays: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Doküman revizyon tarihinden kaç gün önce hatırlatma gönderilsin
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Doküman Ayarları */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Doküman Ayarları</span>
            </CardTitle>
            <CardDescription>Doküman yönetimi yapılandırması</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="documentRetention">Varsayılan Saklama Süresi (Ay)</Label>
              <Input
                id="documentRetention"
                type="number"
                value={settings.documentRetention}
                onChange={(e) => setSettings({ ...settings, documentRetention: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxFileSize">Maksimum Dosya Boyutu (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => setSettings({ ...settings, maxFileSize: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>İzin Verilen Dosya Türleri</Label>
              <div className="flex flex-wrap gap-2">
                {["PDF", "DOC", "DOCX", "XLS", "XLSX", "PPT", "PPTX"].map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik ve Yedekleme */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Güvenlik ve Yedekleme</span>
            </CardTitle>
            <CardDescription>Sistem güvenliği ve veri koruması</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Otomatik Yedekleme</Label>
                <p className="text-sm text-muted-foreground">Günlük otomatik sistem yedeklemesi</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings({ ...settings, autoBackup: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backupRetention">Yedek Saklama Süresi (Gün)</Label>
              <Input
                id="backupRetention"
                type="number"
                value={settings.backupRetention}
                onChange={(e) => setSettings({ ...settings, backupRetention: e.target.value })}
              />
            </div>

            <Separator />

            <div className="space-y-2">
              <Label>Güvenlik Durumu</Label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">SSL Sertifikası</span>
                  <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                    Aktif
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Firewall Koruması</span>
                  <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
                    Aktif
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Son Güvenlik Taraması</span>
                  <span className="text-sm text-muted-foreground">2 saat önce</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sistem Bilgileri */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Sistem Bilgileri</span>
          </CardTitle>
          <CardDescription>QDMS sistem durumu ve istatistikleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">v2.1.0</div>
              <div className="text-sm text-muted-foreground">Sistem Sürümü</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">99.9%</div>
              <div className="text-sm text-muted-foreground">Sistem Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">247</div>
              <div className="text-sm text-muted-foreground">Toplam Doküman</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
