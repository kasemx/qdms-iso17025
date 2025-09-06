"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Shield, Plus, Search, Edit, Trash2, Users, MoreHorizontal, Settings } from "lucide-react"

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: string[]
  createdAt: string
  isSystem: boolean
}

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [] as string[],
  })

  // Örnek rol verileri
  const [roles] = useState<Role[]>([
    {
      id: "1",
      name: "Sistem Yöneticisi",
      description: "Tüm sistem yetkilerine sahip kullanıcı",
      userCount: 1,
      permissions: ["admin", "user_management", "system_settings", "all_documents"],
      createdAt: "2024-01-15",
      isSystem: true,
    },
    {
      id: "2",
      name: "Doküman Sahibi",
      description: "Doküman oluşturma ve düzenleme yetkisi",
      userCount: 8,
      permissions: ["create_document", "edit_own_documents", "submit_for_review"],
      createdAt: "2024-01-15",
      isSystem: true,
    },
    {
      id: "3",
      name: "İnceleyen",
      description: "Dokümanları inceleme yetkisi",
      userCount: 5,
      permissions: ["review_documents", "comment_documents", "request_changes"],
      createdAt: "2024-01-15",
      isSystem: true,
    },
    {
      id: "4",
      name: "Onaylayan",
      description: "Dokümanları onaylama yetkisi",
      userCount: 3,
      permissions: ["approve_documents", "reject_documents", "publish_documents"],
      createdAt: "2024-01-15",
      isSystem: true,
    },
    {
      id: "5",
      name: "Okuyucu",
      description: "Sadece okuma yetkisi",
      userCount: 12,
      permissions: ["read_documents", "download_documents"],
      createdAt: "2024-01-15",
      isSystem: true,
    },
    {
      id: "6",
      name: "Kalite Sorumlusu",
      description: "Kalite süreçlerini yönetme yetkisi",
      userCount: 2,
      permissions: ["quality_management", "audit_reports", "training_management"],
      createdAt: "2024-01-15",
      isSystem: true,
    },
  ])

  // İzin kategorileri
  const permissions: Permission[] = [
    // Doküman İzinleri
    { id: "read_documents", name: "Doküman Okuma", description: "Dokümanları görüntüleme", category: "Doküman" },
    { id: "create_document", name: "Doküman Oluşturma", description: "Yeni doküman oluşturma", category: "Doküman" },
    {
      id: "edit_own_documents",
      name: "Kendi Dokümanlarını Düzenleme",
      description: "Sahip olunan dokümanları düzenleme",
      category: "Doküman",
    },
    {
      id: "edit_all_documents",
      name: "Tüm Dokümanları Düzenleme",
      description: "Tüm dokümanları düzenleme",
      category: "Doküman",
    },
    { id: "download_documents", name: "Doküman İndirme", description: "Dokümanları indirme", category: "Doküman" },
    { id: "delete_documents", name: "Doküman Silme", description: "Dokümanları silme", category: "Doküman" },

    // İş Akışı İzinleri
    { id: "review_documents", name: "Doküman İnceleme", description: "Dokümanları inceleme", category: "İş Akışı" },
    { id: "approve_documents", name: "Doküman Onaylama", description: "Dokümanları onaylama", category: "İş Akışı" },
    { id: "reject_documents", name: "Doküman Reddetme", description: "Dokümanları reddetme", category: "İş Akışı" },
    { id: "publish_documents", name: "Doküman Yayınlama", description: "Dokümanları yayınlama", category: "İş Akışı" },
    {
      id: "submit_for_review",
      name: "İncelemeye Gönderme",
      description: "Dokümanları incelemeye gönderme",
      category: "İş Akışı",
    },

    // Kullanıcı Yönetimi
    { id: "user_management", name: "Kullanıcı Yönetimi", description: "Kullanıcıları yönetme", category: "Yönetim" },
    { id: "role_management", name: "Rol Yönetimi", description: "Rolleri yönetme", category: "Yönetim" },
    {
      id: "department_management",
      name: "Departman Yönetimi",
      description: "Departmanları yönetme",
      category: "Yönetim",
    },

    // Sistem Yönetimi
    { id: "system_settings", name: "Sistem Ayarları", description: "Sistem ayarlarını değiştirme", category: "Sistem" },
    {
      id: "audit_reports",
      name: "Denetim Raporları",
      description: "Denetim raporlarını görüntüleme",
      category: "Sistem",
    },
    {
      id: "backup_restore",
      name: "Yedekleme/Geri Yükleme",
      description: "Sistem yedekleme işlemleri",
      category: "Sistem",
    },
    { id: "admin", name: "Tam Yönetici", description: "Tüm sistem yetkilerine erişim", category: "Sistem" },

    // Kalite Yönetimi
    {
      id: "quality_management",
      name: "Kalite Yönetimi",
      description: "Kalite süreçlerini yönetme",
      category: "Kalite",
    },
    {
      id: "training_management",
      name: "Eğitim Yönetimi",
      description: "Eğitim süreçlerini yönetme",
      category: "Kalite",
    },
    { id: "iso_compliance", name: "ISO Uyumluluk", description: "ISO standartları yönetimi", category: "Kalite" },
  ]

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddRole = () => {
    setEditingRole(null)
    setFormData({ name: "", description: "", permissions: [] })
    setIsAddRoleOpen(true)
  }

  const handleEditRole = (role: Role) => {
    setEditingRole(role)
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    })
    setIsEditRoleOpen(true)
  }

  const handleSaveRole = () => {
    // API çağrısı burada yapılacak
    console.log("Rol kaydedildi:", formData)
    setIsAddRoleOpen(false)
    setIsEditRoleOpen(false)
  }

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, permissions: [...formData.permissions, permissionId] })
    } else {
      setFormData({ ...formData, permissions: formData.permissions.filter((p) => p !== permissionId) })
    }
  }

  const getPermissionsByCategory = () => {
    const categories = permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.category]) {
          acc[permission.category] = []
        }
        acc[permission.category].push(permission)
        return acc
      },
      {} as Record<string, Permission[]>,
    )
    return categories
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Rol Yönetimi</h1>
          <p className="text-muted-foreground">Sistem rollerini ve izinlerini yönetin</p>
        </div>
        <Button onClick={handleAddRole} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Rol
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{roles.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Rol</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{roles.reduce((sum, role) => sum + role.userCount, 0)}</p>
                <p className="text-sm text-muted-foreground">Atanmış Kullanıcı</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Settings className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{permissions.length}</p>
                <p className="text-sm text-muted-foreground">Toplam İzin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{roles.filter((r) => r.isSystem).length}</p>
                <p className="text-sm text-muted-foreground">Sistem Rolü</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rol ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Roles Table */}
      <Card>
        <CardHeader>
          <CardTitle>Roller</CardTitle>
          <CardDescription>Sistem rollerinin listesi ve detayları</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rol Adı</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Kullanıcı Sayısı</TableHead>
                <TableHead>İzin Sayısı</TableHead>
                <TableHead>Tür</TableHead>
                <TableHead>Oluşturma Tarihi</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRoles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{role.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{role.userCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{role.permissions.length}</Badge>
                  </TableCell>
                  <TableCell>
                    {role.isSystem ? (
                      <Badge className="bg-blue-100 text-blue-800 border-blue-300">Sistem</Badge>
                    ) : (
                      <Badge variant="secondary">Özel</Badge>
                    )}
                  </TableCell>
                  <TableCell>{new Date(role.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditRole(role)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Users className="mr-2 h-4 w-4" />
                          Kullanıcıları Görüntüle
                        </DropdownMenuItem>
                        {!role.isSystem && (
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Sil
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Yeni Rol Ekle</DialogTitle>
            <DialogDescription>Yeni bir rol oluşturun ve izinlerini belirleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Rol Adı</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Rol adını girin"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Rol açıklamasını girin"
                rows={3}
              />
            </div>
            <div className="space-y-4">
              <Label>İzinler</Label>
              {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {categoryPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={permission.id} className="text-sm font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveRole} className="bg-primary hover:bg-primary/90">
              Rol Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Rol Düzenle</DialogTitle>
            <DialogDescription>Rol bilgilerini ve izinlerini güncelleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="editName">Rol Adı</Label>
              <Input
                id="editName"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={editingRole?.isSystem}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editDescription">Açıklama</Label>
              <Textarea
                id="editDescription"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-4">
              <Label>İzinler</Label>
              {Object.entries(getPermissionsByCategory()).map(([category, categoryPermissions]) => (
                <div key={category} className="space-y-2">
                  <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
                  <div className="grid grid-cols-1 gap-2 pl-4">
                    {categoryPermissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`edit-${permission.id}`}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                        />
                        <div className="flex-1">
                          <Label htmlFor={`edit-${permission.id}`} className="text-sm font-medium">
                            {permission.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRoleOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveRole} className="bg-primary hover:bg-primary/90">
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
