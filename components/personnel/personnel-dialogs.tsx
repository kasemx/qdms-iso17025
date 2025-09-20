"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface PersonnelDialogsProps {
  isPersonnelDialogOpen: boolean
  setIsPersonnelDialogOpen: (open: boolean) => void
  isTrainingDialogOpen: boolean
  setIsTrainingDialogOpen: (open: boolean) => void
  personnelFormData: any
  setPersonnelFormData: (data: any) => void
  trainingFormData: any
  setTrainingFormData: (data: any) => void
  onPersonnelSubmit: (e: React.FormEvent) => void
  onTrainingSubmit: (e: React.FormEvent) => void
}

export function PersonnelDialogs({
  isPersonnelDialogOpen,
  setIsPersonnelDialogOpen,
  isTrainingDialogOpen,
  setIsTrainingDialogOpen,
  personnelFormData,
  setPersonnelFormData,
  trainingFormData,
  setTrainingFormData,
  onPersonnelSubmit,
  onTrainingSubmit
}: PersonnelDialogsProps) {
  return (
    <>
      {/* Personnel Dialog */}
      <Dialog open={isPersonnelDialogOpen} onOpenChange={setIsPersonnelDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yeni Personel Ekle</DialogTitle>
            <DialogDescription>
              Yeni personel bilgilerini girin ve yetkinlik değerlendirmesi yapın.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onPersonnelSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Ad Soyad</Label>
                <Input
                  id="name"
                  value={personnelFormData.name}
                  onChange={(e) => setPersonnelFormData({ ...personnelFormData, name: e.target.value })}
                  placeholder="Personel adı"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={personnelFormData.email}
                  onChange={(e) => setPersonnelFormData({ ...personnelFormData, email: e.target.value })}
                  placeholder="email@example.com"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Pozisyon</Label>
                <Input
                  id="position"
                  value={personnelFormData.position}
                  onChange={(e) => setPersonnelFormData({ ...personnelFormData, position: e.target.value })}
                  placeholder="Kalite Uzmanı"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Select
                  value={personnelFormData.department}
                  onValueChange={(value) => setPersonnelFormData({ ...personnelFormData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Departman seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quality">Kalite</SelectItem>
                    <SelectItem value="lab">Laboratuvar</SelectItem>
                    <SelectItem value="admin">Yönetim</SelectItem>
                    <SelectItem value="technical">Teknik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="competencyLevel">Yetkinlik Seviyesi</Label>
                <Select
                  value={personnelFormData.competencyLevel}
                  onValueChange={(value) => setPersonnelFormData({ ...personnelFormData, competencyLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seviye seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 - Başlangıç</SelectItem>
                    <SelectItem value="2">2 - Temel</SelectItem>
                    <SelectItem value="3">3 - Orta</SelectItem>
                    <SelectItem value="4">4 - İleri</SelectItem>
                    <SelectItem value="5">5 - Uzman</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Durum</Label>
                <Select
                  value={personnelFormData.status}
                  onValueChange={(value) => setPersonnelFormData({ ...personnelFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Durum seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Pasif</SelectItem>
                    <SelectItem value="training">Eğitimde</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Beceriler</Label>
              <Input
                id="skills"
                value={personnelFormData.skills}
                onChange={(e) => setPersonnelFormData({ ...personnelFormData, skills: e.target.value })}
                placeholder="Beceriler (virgülle ayırın)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="certifications">Sertifikalar</Label>
              <Input
                id="certifications"
                value={personnelFormData.certifications}
                onChange={(e) => setPersonnelFormData({ ...personnelFormData, certifications: e.target.value })}
                placeholder="Sertifikalar (virgülle ayırın)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="developmentGoals">Gelişim Hedefleri</Label>
              <Textarea
                id="developmentGoals"
                value={personnelFormData.developmentGoals}
                onChange={(e) => setPersonnelFormData({ ...personnelFormData, developmentGoals: e.target.value })}
                placeholder="Gelişim hedeflerini girin (her satıra bir hedef)"
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsPersonnelDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Training Dialog */}
      <Dialog open={isTrainingDialogOpen} onOpenChange={setIsTrainingDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yeni Eğitim Planı</DialogTitle>
            <DialogDescription>
              Eğitim planı detaylarını girin ve hedef kitle belirleyin.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onTrainingSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Eğitim Başlığı</Label>
                <Input
                  id="title"
                  value={trainingFormData.title}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, title: e.target.value })}
                  placeholder="İSO 17025 Temel Eğitimi"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Kategori</Label>
                <Select
                  value={trainingFormData.category}
                  onValueChange={(value) => setTrainingFormData({ ...trainingFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kategori seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Teknik</SelectItem>
                    <SelectItem value="compliance">Uygunluk</SelectItem>
                    <SelectItem value="leadership">Liderlik</SelectItem>
                    <SelectItem value="safety">Güvenlik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={trainingFormData.description}
                onChange={(e) => setTrainingFormData({ ...trainingFormData, description: e.target.value })}
                placeholder="Eğitim içeriği ve hedefleri"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="trainer">Eğitmen</Label>
                <Input
                  id="trainer"
                  value={trainingFormData.trainer}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, trainer: e.target.value })}
                  placeholder="Dr. Ali Veli"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetAudience">Hedef Kitle</Label>
                <Input
                  id="targetAudience"
                  value={trainingFormData.targetAudience}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, targetAudience: e.target.value })}
                  placeholder="Laboratuvar Teknisyenleri"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="plannedDate">Planlanan Tarih</Label>
                <Input
                  id="plannedDate"
                  type="date"
                  value={trainingFormData.plannedDate}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, plannedDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Süre</Label>
                <Input
                  id="duration"
                  value={trainingFormData.duration}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, duration: e.target.value })}
                  placeholder="8 saat"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">Max Katılımcı</Label>
                <Input
                  id="maxParticipants"
                  type="number"
                  value={trainingFormData.maxParticipants}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, maxParticipants: e.target.value })}
                  placeholder="20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cost">Maliyet</Label>
                <Input
                  id="cost"
                  type="number"
                  value={trainingFormData.cost}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, cost: e.target.value })}
                  placeholder="25000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Mekan</Label>
                <Input
                  id="venue"
                  value={trainingFormData.venue}
                  onChange={(e) => setTrainingFormData({ ...trainingFormData, venue: e.target.value })}
                  placeholder="Eğitim salonı"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="priority">Öncelik</Label>
                <Select
                  value={trainingFormData.priority}
                  onValueChange={(value) => setTrainingFormData({ ...trainingFormData, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Öncelik seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="critical">Kritik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Eğitim Türü</Label>
                <Select
                  value={trainingFormData.type}
                  onValueChange={(value) => setTrainingFormData({ ...trainingFormData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Eğitim türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="internal">İç Eğitim</SelectItem>
                    <SelectItem value="external">Dış Eğitim</SelectItem>
                    <SelectItem value="online">Online Eğitim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsTrainingDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}