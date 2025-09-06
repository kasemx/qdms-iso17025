"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Bell, Plus, Search, Calendar, Users, AlertCircle } from "lucide-react"

interface Reminder {
  id: string
  title: string
  description?: string
  reminderType: "document_based" | "periodic_control" | "training" | "custom"
  frequency?: "once" | "daily" | "weekly" | "monthly" | "yearly"
  frequencyValue: number
  startDate: string
  endDate?: string
  nextReminderDate?: string
  isActive: boolean
  createdByName: string
  recipientCount: number
  createdAt: string
}

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showCreateDialog, setShowCreateDialog] = useState(false)

  // Mock data - gerçek uygulamada API'den gelecek
  useEffect(() => {
    const mockReminders: Reminder[] = [
      {
        id: "1",
        title: "Doküman Gözden Geçirme Hatırlatıcısı",
        description: "PR-001 prosedürünün gözden geçirme tarihi yaklaşıyor",
        reminderType: "document_based",
        frequency: "monthly",
        frequencyValue: 1,
        startDate: "2024-01-15",
        nextReminderDate: "2024-02-15",
        isActive: true,
        createdByName: "Sistem Yöneticisi",
        recipientCount: 5,
        createdAt: "2024-01-01",
      },
      {
        id: "2",
        title: "Periyodik Kontrol Hatırlatıcısı",
        description: "Çevre şartları kontrolü zamanı",
        reminderType: "periodic_control",
        frequency: "weekly",
        frequencyValue: 1,
        startDate: "2024-01-01",
        nextReminderDate: "2024-01-22",
        isActive: true,
        createdByName: "Kalite Müdürü",
        recipientCount: 3,
        createdAt: "2024-01-01",
      },
      {
        id: "3",
        title: "Eğitim Tamamlama Hatırlatıcısı",
        description: "Atanan eğitimleri tamamlamayı unutmayın",
        reminderType: "training",
        frequency: "daily",
        frequencyValue: 2,
        startDate: "2024-01-10",
        nextReminderDate: "2024-01-24",
        isActive: true,
        createdByName: "İK Müdürü",
        recipientCount: 12,
        createdAt: "2024-01-10",
      },
    ]

    setTimeout(() => {
      setReminders(mockReminders)
      setLoading(false)
    }, 1000)
  }, [])

  const getReminderTypeLabel = (type: string) => {
    const types = {
      document_based: "Doküman Bazlı",
      periodic_control: "Periyodik Kontrol",
      training: "Eğitim",
      custom: "Özel",
    }
    return types[type as keyof typeof types] || type
  }

  const getReminderTypeColor = (type: string) => {
    const colors = {
      document_based: "bg-blue-100 text-blue-800",
      periodic_control: "bg-green-100 text-green-800",
      training: "bg-purple-100 text-purple-800",
      custom: "bg-gray-100 text-gray-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  const getFrequencyLabel = (frequency?: string, value?: number) => {
    if (!frequency || frequency === "once") return "Tek Seferlik"

    const labels = {
      daily: "Günlük",
      weekly: "Haftalık",
      monthly: "Aylık",
      yearly: "Yıllık",
    }

    const label = labels[frequency as keyof typeof labels]
    return value && value > 1 ? `Her ${value} ${label}` : label
  }

  const filteredReminders = reminders.filter((reminder) => {
    const matchesSearch =
      reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reminder.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || reminder.reminderType === typeFilter
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && reminder.isActive) ||
      (statusFilter === "inactive" && !reminder.isActive)

    return matchesSearch && matchesType && matchesStatus
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Hatırlatıcılar</h1>
          <p className="text-muted-foreground">Sistem hatırlatıcılarını yönetin ve takip edin</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Yeni Hatırlatıcı
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Yeni Hatırlatıcı Oluştur</DialogTitle>
              <DialogDescription>Sistem kullanıcıları için yeni bir hatırlatıcı oluşturun</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Başlık</Label>
                  <Input id="title" placeholder="Hatırlatıcı başlığı" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tip</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Hatırlatıcı tipi seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document_based">Doküman Bazlı</SelectItem>
                      <SelectItem value="periodic_control">Periyodik Kontrol</SelectItem>
                      <SelectItem value="training">Eğitim</SelectItem>
                      <SelectItem value="custom">Özel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Açıklama</Label>
                <Textarea id="description" placeholder="Hatırlatıcı açıklaması" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Sıklık</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Tek Seferlik</SelectItem>
                      <SelectItem value="daily">Günlük</SelectItem>
                      <SelectItem value="weekly">Haftalık</SelectItem>
                      <SelectItem value="monthly">Aylık</SelectItem>
                      <SelectItem value="yearly">Yıllık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Bitiş Tarihi</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bildirim Kanalları</Label>
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="system" defaultChecked />
                    <Label htmlFor="system">Sistem İçi</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="email" />
                    <Label htmlFor="email">E-posta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="push" />
                    <Label htmlFor="push">Push Bildirim</Label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  İptal
                </Button>
                <Button onClick={() => setShowCreateDialog(false)}>Oluştur</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Hatırlatıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Tip filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Tipler</SelectItem>
            <SelectItem value="document_based">Doküman Bazlı</SelectItem>
            <SelectItem value="periodic_control">Periyodik Kontrol</SelectItem>
            <SelectItem value="training">Eğitim</SelectItem>
            <SelectItem value="custom">Özel</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Durum filtrele" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Durumlar</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Pasif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reminders Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredReminders.map((reminder) => (
          <Card key={reminder.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg leading-tight">{reminder.title}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge className={getReminderTypeColor(reminder.reminderType)}>
                      {getReminderTypeLabel(reminder.reminderType)}
                    </Badge>
                    <Badge variant={reminder.isActive ? "default" : "secondary"}>
                      {reminder.isActive ? "Aktif" : "Pasif"}
                    </Badge>
                  </div>
                </div>
                <Bell className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {reminder.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">{reminder.description}</p>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Sıklık: {getFrequencyLabel(reminder.frequency, reminder.frequencyValue)}</span>
                </div>

                {reminder.nextReminderDate && (
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                    <span>Sonraki: {new Date(reminder.nextReminderDate).toLocaleDateString("tr-TR")}</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{reminder.recipientCount} alıcı</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-xs text-muted-foreground">{reminder.createdByName}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Düzenle
                  </Button>
                  <Button variant="outline" size="sm">
                    Detay
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredReminders.length === 0 && (
        <div className="text-center py-12">
          <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Hatırlatıcı bulunamadı</h3>
          <p className="mt-2 text-muted-foreground">Arama kriterlerinize uygun hatırlatıcı bulunmuyor.</p>
        </div>
      )}
    </div>
  )
}
