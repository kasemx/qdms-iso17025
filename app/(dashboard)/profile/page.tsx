"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Phone, Building, Briefcase, Calendar, Shield, Edit, Save, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ProfilePage() {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "Sistem",
    lastName: "Yöneticisi",
    email: "admin@company.com",
    phone: "+90 555 123 4567",
    department: "Bilgi İşlem",
    position: "IT Müdürü",
    bio: "QDMS sisteminin yönetimi ve geliştirilmesi konularında sorumlu sistem yöneticisi.",
  })

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Hata",
        description: "Ad alanı zorunludur.",
        variant: "destructive",
      })
      return false
    }
    if (!formData.lastName.trim()) {
      toast({
        title: "Hata",
        description: "Soyad alanı zorunludur.",
        variant: "destructive",
      })
      return false
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      toast({
        title: "Hata",
        description: "Geçerli bir e-posta adresi giriniz.",
        variant: "destructive",
      })
      return false
    }
    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Profil güncellenemedi")
      }

      const result = await response.json()

      toast({
        title: "Başarılı",
        description: "Profil bilgileriniz başarıyla güncellendi.",
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Profil güncelleme hatası:", error)
      toast({
        title: "Hata",
        description: "Profil güncellenirken bir hata oluştu.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Form verilerini sıfırla
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Profil</h1>
          <p className="text-muted-foreground">Kullanıcı profil bilgileri ve ayarları</p>
        </div>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
          disabled={isLoading}
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />
              İptal
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Düzenle
            </>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profil Kartı */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {formData.firstName[0]}
                  {formData.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle>
              {formData.firstName} {formData.lastName}
            </CardTitle>
            <CardDescription>{formData.position}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formData.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formData.phone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Building className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formData.department}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{formData.position}</span>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Roller
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Sistem Yöneticisi</Badge>
                <Badge variant="secondary">Doküman Sahibi</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Üyelik Bilgileri
              </h4>
              <p className="text-xs text-muted-foreground">Kayıt Tarihi: 15 Ocak 2024</p>
              <p className="text-xs text-muted-foreground">Son Giriş: 2 saat önce</p>
            </div>
          </CardContent>
        </Card>

        {/* Profil Düzenleme Formu */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profil Bilgileri</CardTitle>
            <CardDescription>Kişisel bilgilerinizi güncelleyebilirsiniz</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Pozisyon</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Biyografi</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            {isEditing && (
              <div className="flex space-x-2">
                <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Kaydediliyor..." : "Kaydet"}
                </Button>
                <Button onClick={handleCancel} variant="outline" disabled={isLoading}>
                  <X className="mr-2 h-4 w-4" />
                  İptal
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Güvenlik Ayarları */}
      <Card>
        <CardHeader>
          <CardTitle>Güvenlik Ayarları</CardTitle>
          <CardDescription>Hesap güvenliği ve şifre ayarları</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">İki Faktörlü Kimlik Doğrulama</h4>
              <p className="text-sm text-muted-foreground">Hesabınız için ek güvenlik katmanı</p>
            </div>
            <Badge variant="outline" className="text-green-700 border-green-300 bg-green-50">
              Aktif
            </Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Şifre Değiştir</h4>
              <p className="text-sm text-muted-foreground">Son değişiklik: 30 gün önce</p>
            </div>
            <Button variant="outline" size="sm">
              Şifre Değiştir
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
