"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ManagementDialogsProps {
  // Organization Dialog
  isOrgDialogOpen: boolean
  setIsOrgDialogOpen: (open: boolean) => void
  orgFormData: any
  setOrgFormData: (data: any) => void
  onOrgSubmit: (e: React.FormEvent) => void

  // Impartiality Dialog
  isImpartialityDialogOpen: boolean
  setIsImpartialityDialogOpen: (open: boolean) => void
  impartialityFormData: any
  setImpartialityFormData: (data: any) => void
  onImpartialitySubmit: (e: React.FormEvent) => void

  // Confidentiality Dialog
  isConfidentialityDialogOpen: boolean
  setIsConfidentialityDialogOpen: (open: boolean) => void
  confidentialityFormData: any
  setConfidentialityFormData: (data: any) => void
  onConfidentialitySubmit: (e: React.FormEvent) => void

  // Review Dialog
  isReviewDialogOpen: boolean
  setIsReviewDialogOpen: (open: boolean) => void
  reviewFormData: any
  setReviewFormData: (data: any) => void
  onReviewSubmit: (e: React.FormEvent) => void
}

export function ManagementDialogs({
  isOrgDialogOpen,
  setIsOrgDialogOpen,
  orgFormData,
  setOrgFormData,
  onOrgSubmit,
  isImpartialityDialogOpen,
  setIsImpartialityDialogOpen,
  impartialityFormData,
  setImpartialityFormData,
  onImpartialitySubmit,
  isConfidentialityDialogOpen,
  setIsConfidentialityDialogOpen,
  confidentialityFormData,
  setConfidentialityFormData,
  onConfidentialitySubmit,
  isReviewDialogOpen,
  setIsReviewDialogOpen,
  reviewFormData,
  setReviewFormData,
  onReviewSubmit
}: ManagementDialogsProps) {
  return (
    <>
      {/* Organization Dialog */}
      <Dialog open={isOrgDialogOpen} onOpenChange={setIsOrgDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Pozisyon Tanımı</DialogTitle>
            <DialogDescription>Organizasyon yapısına yeni pozisyon ekleyin</DialogDescription>
          </DialogHeader>
          <form onSubmit={onOrgSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="positionTitle">Pozisyon Başlığı</Label>
                <Input
                  id="positionTitle"
                  value={orgFormData.positionTitle}
                  onChange={(e) => setOrgFormData({ ...orgFormData, positionTitle: e.target.value })}
                  placeholder="Pozisyon başlığı"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Select
                  value={orgFormData.department}
                  onValueChange={(value) => setOrgFormData({ ...orgFormData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Departman seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laboratory">Laboratuvar</SelectItem>
                    <SelectItem value="quality">Kalite Güvence</SelectItem>
                    <SelectItem value="management">Yönetim</SelectItem>
                    <SelectItem value="technical">Teknik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reportingTo">Bağlı Olduğu Pozisyon</Label>
              <Input
                id="reportingTo"
                value={orgFormData.reportingTo}
                onChange={(e) => setOrgFormData({ ...orgFormData, reportingTo: e.target.value })}
                placeholder="Raporlama yapacağı pozisyon"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">Sorumluluklar</Label>
              <Textarea
                id="responsibilities"
                value={orgFormData.responsibilities}
                onChange={(e) => setOrgFormData({ ...orgFormData, responsibilities: e.target.value })}
                placeholder="Pozisyon sorumlulukları"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualifications">Gerekli Nitelikler</Label>
              <Textarea
                id="qualifications"
                value={orgFormData.qualifications}
                onChange={(e) => setOrgFormData({ ...orgFormData, qualifications: e.target.value })}
                placeholder="Eğitim, deneyim ve sertifika gereksinimleri"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentHolder">Mevcut Görevli</Label>
              <Input
                id="currentHolder"
                value={orgFormData.currentHolder}
                onChange={(e) => setOrgFormData({ ...orgFormData, currentHolder: e.target.value })}
                placeholder="Pozisyonu dolduran kişi"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOrgDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Impartiality Dialog */}
      <Dialog open={isImpartialityDialogOpen} onOpenChange={setIsImpartialityDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Tarafsızlık Kaydı</DialogTitle>
            <DialogDescription>Tarafsızlık ile ilgili yeni bir kayıt oluşturun</DialogDescription>
          </DialogHeader>
          <form onSubmit={onImpartialitySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="declarationType">Kayıt Türü</Label>
                <Select
                  value={impartialityFormData.declarationType}
                  onValueChange={(value) =>
                    setImpartialityFormData({ ...impartialityFormData, declarationType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Kayıt türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conflict_of_interest">Çıkar Çatışması</SelectItem>
                    <SelectItem value="impartiality_policy">Tarafsızlık Politikası</SelectItem>
                    <SelectItem value="committee_decision">Komite Kararı</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="riskLevel">Risk Seviyesi</Label>
                <Select
                  value={impartialityFormData.riskLevel}
                  onValueChange={(value) =>
                    setImpartialityFormData({ ...impartialityFormData, riskLevel: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Düşük</SelectItem>
                    <SelectItem value="medium">Orta</SelectItem>
                    <SelectItem value="high">Yüksek</SelectItem>
                    <SelectItem value="critical">Kritik</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Başlık</Label>
              <Input
                id="title"
                value={impartialityFormData.title}
                onChange={(e) => setImpartialityFormData({ ...impartialityFormData, title: e.target.value })}
                placeholder="Kayıt başlığı"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={impartialityFormData.description}
                onChange={(e) =>
                  setImpartialityFormData({ ...impartialityFormData, description: e.target.value })
                }
                placeholder="Detaylı açıklama"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewDate">Gözden Geçirme Tarihi</Label>
              <Input
                id="reviewDate"
                type="date"
                value={impartialityFormData.reviewDate}
                onChange={(e) => setImpartialityFormData({ ...impartialityFormData, reviewDate: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsImpartialityDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confidentiality Dialog */}
      <Dialog open={isConfidentialityDialogOpen} onOpenChange={setIsConfidentialityDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Gizlilik Anlaşması</DialogTitle>
            <DialogDescription>Yeni bir gizlilik anlaşması oluşturun</DialogDescription>
          </DialogHeader>
          <form onSubmit={onConfidentialitySubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agreementType">Anlaşma Türü</Label>
                <Select
                  value={confidentialityFormData.agreementType}
                  onValueChange={(value) =>
                    setConfidentialityFormData({ ...confidentialityFormData, agreementType: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Anlaşma türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee_nda">Personel Gizlilik Anlaşması</SelectItem>
                    <SelectItem value="client_confidentiality">Müşteri Gizlilik Protokolü</SelectItem>
                    <SelectItem value="supplier_nda">Tedarikçi Gizlilik Anlaşması</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Select
                  value={confidentialityFormData.department}
                  onValueChange={(value) =>
                    setConfidentialityFormData({ ...confidentialityFormData, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Departman seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laboratory">Laboratuvar</SelectItem>
                    <SelectItem value="quality">Kalite Güvence</SelectItem>
                    <SelectItem value="management">Yönetim</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Anlaşma Başlığı</Label>
              <Input
                id="title"
                value={confidentialityFormData.title}
                onChange={(e) =>
                  setConfidentialityFormData({ ...confidentialityFormData, title: e.target.value })
                }
                placeholder="Anlaşma başlığı"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signedBy">İmzalayan</Label>
              <Input
                id="signedBy"
                value={confidentialityFormData.signedBy}
                onChange={(e) =>
                  setConfidentialityFormData({ ...confidentialityFormData, signedBy: e.target.value })
                }
                placeholder="İmzalayan kişi/kurum"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={confidentialityFormData.description}
                onChange={(e) =>
                  setConfidentialityFormData({ ...confidentialityFormData, description: e.target.value })
                }
                placeholder="Anlaşma kapsamı ve detayları"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Bitiş Tarihi</Label>
              <Input
                id="expiryDate"
                type="date"
                value={confidentialityFormData.expiryDate}
                onChange={(e) =>
                  setConfidentialityFormData({ ...confidentialityFormData, expiryDate: e.target.value })
                }
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsConfidentialityDialogOpen(false)}>
                İptal
              </Button>
              <Button type="submit">Kaydet</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Yeni Yönetim Gözden Geçirme</DialogTitle>
            <DialogDescription>Yeni bir yönetim gözden geçirme toplantısı planlayın</DialogDescription>
          </DialogHeader>
          <form onSubmit={onReviewSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="reviewDate">Toplantı Tarihi</Label>
                <Input
                  id="reviewDate"
                  type="date"
                  value={reviewFormData.reviewDate}
                  onChange={(e) => setReviewFormData({ ...reviewFormData, reviewDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewType">Toplantı Türü</Label>
                <Select
                  value={reviewFormData.reviewType}
                  onValueChange={(value) => setReviewFormData({ ...reviewFormData, reviewType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toplantı türü seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quarterly">Üç Aylık</SelectItem>
                    <SelectItem value="annual">Yıllık</SelectItem>
                    <SelectItem value="extraordinary">Olağanüstü</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chairperson">Toplantı Başkanı</Label>
              <Input
                id="chairperson"
                value={reviewFormData.chairperson}
                onChange={(e) => setReviewFormData({ ...reviewFormData, chairperson: e.target.value })}
                placeholder="Toplantı başkanı"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="agenda">Gündem</Label>
              <Textarea
                id="agenda"
                value={reviewFormData.agenda}
                onChange={(e) => setReviewFormData({ ...reviewFormData, agenda: e.target.value })}
                placeholder="Toplantı gündemi"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nextReviewDate">Sonraki Toplantı Tarihi</Label>
              <Input
                id="nextReviewDate"
                type="date"
                value={reviewFormData.nextReviewDate}
                onChange={(e) => setReviewFormData({ ...reviewFormData, nextReviewDate: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
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