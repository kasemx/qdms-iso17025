"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Department {
  id: string
  name: string
  description: string
  managerName: string
  managerId?: string
  userCount: number
  documentCount: number
  createdAt: string
  updatedAt?: string
  status: 'active' | 'inactive' | 'archived'
  parentId?: string | null
  children?: Department[]
  level: number
  budget?: number
  costCenter?: string
  location?: string
  phone?: string
  email?: string
  headCount: {
    current: number
    approved: number
    variance: number
  }
  performance: {
    efficiency: number
    satisfaction: number
    compliance: number
  }
  projects: {
    active: number
    completed: number
    pending: number
  }
  isExpanded?: boolean
}

interface DepartmentsDialogsProps {
  // Add/Edit Dialog
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
  editingDepartment: Department | null
  formData: {
    name: string
    description: string
    managerId: string
    budget: string
    location: string
    phone: string
    email: string
  }
  setFormData: (data: any) => void
  onSave: () => void
  isLoading: boolean

  // Delete Dialog
  isDeleteDialogOpen: boolean
  setIsDeleteDialogOpen: (open: boolean) => void
  onConfirmDelete: () => void
}

export function DepartmentsDialogs({
  isDialogOpen,
  setIsDialogOpen,
  editingDepartment,
  formData,
  setFormData,
  onSave,
  isLoading,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  onConfirmDelete
}: DepartmentsDialogsProps) {
  return (
    <>
      {/* Add/Edit Department Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingDepartment ? "Departman Düzenle" : "Yeni Departman Ekle"}</DialogTitle>
            <DialogDescription>Departman bilgilerini girin ve kaydedin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Departman Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Departman adını girin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Departman açıklamasını girin"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Bütçe</Label>
                <Input
                  id="budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Lokasyon</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Bina/Kat"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+90 212 xxx xx xx"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-posta</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="dept@company.com"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              İptal
            </Button>
            <Button onClick={onSave} className="bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Kaydediliyor..." : editingDepartment ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Departman Silme Onayı</AlertDialogTitle>
            <AlertDialogDescription>
              Bu departmanı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>İptal</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmDelete} className="bg-destructive hover:bg-destructive/90">
              Sil
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}