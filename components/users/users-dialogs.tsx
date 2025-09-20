"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: "active" | "inactive" | "pending" | "suspended"
  lastLogin: string
  avatar: string | null
  roles: string[]
  isActive: boolean
  joinDate: string
  lastActivity: string
  permissions: string[]
  twoFactorEnabled: boolean
  loginAttempts: number
  sessionCount: number
  documentsCreated: number
  documentsApproved: number
  performance: {
    productivity: number
    compliance: number
    training: number
  }
  workload: {
    active: number
    pending: number
    completed: number
  }
}

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  roles: string[]
  isActive: boolean
  twoFactorEnabled: boolean
}

interface UsersDialogsProps {
  isAddUserOpen: boolean
  isEditUserOpen: boolean
  editingUser: User | null
  formData: FormData
  onAddUserOpenChange: (open: boolean) => void
  onEditUserOpenChange: (open: boolean) => void
  onFormDataChange: (data: FormData) => void
  onSaveUser: () => void
}

export function UsersDialogs({
  isAddUserOpen,
  isEditUserOpen,
  editingUser,
  formData,
  onAddUserOpenChange,
  onEditUserOpenChange,
  onFormDataChange,
  onSaveUser,
}: UsersDialogsProps) {
  return (
    <>
      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={onAddUserOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Yeni Kullanıcı Ekle</DialogTitle>
            <DialogDescription>Sisteme yeni kullanıcı ekleyin ve rollerini atayın.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Ad</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => onFormDataChange({ ...formData, firstName: e.target.value })}
                  placeholder="Kullanıcının adı"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => onFormDataChange({ ...formData, lastName: e.target.value })}
                  placeholder="Kullanıcının soyadı"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
                placeholder="kullanici@sirket.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => onFormDataChange({ ...formData, phone: e.target.value })}
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => onFormDataChange({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Departman seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kalite Güvence">Kalite Güvence</SelectItem>
                    <SelectItem value="Üretim">Üretim</SelectItem>
                    <SelectItem value="Laboratuvar">Laboratuvar</SelectItem>
                    <SelectItem value="İnsan Kaynakları">İnsan Kaynakları</SelectItem>
                    <SelectItem value="Bilgi İşlem">Bilgi İşlem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="position">Pozisyon</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => onFormDataChange({ ...formData, position: e.target.value })}
                  placeholder="Kullanıcının pozisyonu"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => onFormDataChange({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Kullanıcı aktif olsun</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onAddUserOpenChange(false)}>
              İptal
            </Button>
            <Button onClick={onSaveUser} className="bg-primary hover:bg-primary/90">
              Kullanıcı Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={onEditUserOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Kullanıcı Düzenle</DialogTitle>
            <DialogDescription>Kullanıcı bilgilerini güncelleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editFirstName">Ad</Label>
                <Input
                  id="editFirstName"
                  value={formData.firstName}
                  onChange={(e) => onFormDataChange({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Soyad</Label>
                <Input
                  id="editLastName"
                  value={formData.lastName}
                  onChange={(e) => onFormDataChange({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">E-posta</Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) => onFormDataChange({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Telefon</Label>
              <Input
                id="editPhone"
                value={formData.phone}
                onChange={(e) => onFormDataChange({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editDepartment">Departman</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => onFormDataChange({ ...formData, department: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kalite Güvence">Kalite Güvence</SelectItem>
                    <SelectItem value="Üretim">Üretim</SelectItem>
                    <SelectItem value="Laboratuvar">Laboratuvar</SelectItem>
                    <SelectItem value="İnsan Kaynakları">İnsan Kaynakları</SelectItem>
                    <SelectItem value="Bilgi İşlem">Bilgi İşlem</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="editPosition">Pozisyon</Label>
                <Input
                  id="editPosition"
                  value={formData.position}
                  onChange={(e) => onFormDataChange({ ...formData, position: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="editIsActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => onFormDataChange({ ...formData, isActive: checked })}
              />
              <Label htmlFor="editIsActive">Kullanıcı aktif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onEditUserOpenChange(false)}>
              İptal
            </Button>
            <Button onClick={onSaveUser} className="bg-primary hover:bg-primary/90">
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}