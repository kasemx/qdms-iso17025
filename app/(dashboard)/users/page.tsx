"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { UserPlus, Search, MoreHorizontal, Mail, Phone, Edit, Trash2, Key, UserCheck, Shield } from "lucide-react"
import { toast } from "react-toastify"

interface User {
  id: number
  name: string
  email: string
  phone: string
  role: string
  department: string
  status: "active" | "inactive"
  lastLogin: string
  avatar: string | null
  roles: string[]
  isActive: boolean
}

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    roles: [] as string[],
    isActive: true,
  })

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Ahmet Yılmaz",
      email: "ahmet.yilmaz@sirket.com",
      phone: "+90 532 123 4567",
      role: "Kalite Müdürü",
      department: "Kalite Güvence",
      status: "active",
      lastLogin: "2024-01-15 14:30",
      avatar: null,
      roles: ["Kalite Sorumlusu", "Onaylayan"],
      isActive: true,
    },
    {
      id: 2,
      name: "Fatma Demir",
      email: "fatma.demir@sirket.com",
      phone: "+90 533 987 6543",
      role: "Doküman Uzmanı",
      department: "Kalite Güvence",
      status: "active",
      lastLogin: "2024-01-15 09:15",
      avatar: null,
      roles: ["Doküman Sahibi", "İnceleyen"],
      isActive: true,
    },
    {
      id: 3,
      name: "Mehmet Kaya",
      email: "mehmet.kaya@sirket.com",
      phone: "+90 534 456 7890",
      role: "Operasyon Müdürü",
      department: "Üretim",
      status: "inactive",
      lastLogin: "2024-01-10 16:45",
      avatar: null,
      roles: ["Okuyucu"],
      isActive: false,
    },
    {
      id: 4,
      name: "Ayşe Özkan",
      email: "ayse.ozkan@sirket.com",
      phone: "+90 535 111 2233",
      role: "Laboratuvar Uzmanı",
      department: "Laboratuvar",
      status: "active",
      lastLogin: "2024-01-15 11:20",
      avatar: null,
      roles: ["Doküman Sahibi", "İnceleyen"],
      isActive: true,
    },
    {
      id: 5,
      name: "Sistem Yöneticisi",
      email: "admin@company.com",
      phone: "+90 536 999 8877",
      role: "IT Müdürü",
      department: "Bilgi İşlem",
      status: "active",
      lastLogin: "2024-01-15 16:45",
      avatar: null,
      roles: ["Sistem Yöneticisi"],
      isActive: true,
    },
  ])

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || user.department === selectedDepartment
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const handleAddUser = () => {
    setEditingUser(null)
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      roles: [],
      isActive: true,
    })
    setIsAddUserOpen(true)
  }

  const handleEditUser = (user: User) => {
    setEditingUser(user)
    const [firstName, ...lastNameParts] = user.name.split(" ")
    setFormData({
      firstName,
      lastName: lastNameParts.join(" "),
      email: user.email,
      phone: user.phone,
      department: user.department,
      position: user.role,
      roles: user.roles,
      isActive: user.isActive,
    })
    setIsEditUserOpen(true)
  }

  const handleSaveUser = () => {
    // API çağrısı burada yapılacak
    console.log("Kullanıcı kaydedildi:", formData)
    setIsAddUserOpen(false)
    setIsEditUserOpen(false)
  }

  const handleToggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, isActive: !user.isActive, status: user.isActive ? "inactive" : "active" }
          : user,
      ),
    )
  }

  const handleViewPermissions = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}/permissions`)
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success("Kullanıcı yetkileri görüntülendi")
          // Yetkileri gösterecek dialog açılabilir
          console.log("Kullanıcı yetkileri:", result.data)
        }
      }
    } catch (error) {
      toast.error("Yetkiler yüklenirken hata oluştu")
    }
  }

  const handleResetPassword = async (userId: number) => {
    try {
      const response = await fetch(`/api/users/${userId}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          toast.success("Şifre sıfırlama e-postası gönderildi")
        }
      }
    } catch (error) {
      toast.error("Şifre sıfırlanırken hata oluştu")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kullanıcı Yönetimi</h1>
          <p className="text-muted-foreground mt-1">Sistem kullanıcılarını ve rollerini yönetin</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <a href="/roles">
              <Shield className="w-4 h-4 mr-2" />
              Rol Yönetimi
            </a>
          </Button>
          <Button onClick={handleAddUser} className="bg-primary hover:bg-primary/90">
            <UserPlus className="w-4 h-4 mr-2" />
            Yeni Kullanıcı
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Toplam Kullanıcı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{users.length}</div>
            <p className="text-xs text-green-600 mt-1">+2 bu ay</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Aktif Kullanıcı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{users.filter((u) => u.isActive).length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              %{Math.round((users.filter((u) => u.isActive).length / users.length) * 100)} aktif oran
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Yönetici</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {users.filter((u) => u.roles.some((r) => r.includes("Yönetici") || r.includes("Müdür"))).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Yönetici rolü</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Son Giriş</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {users.filter((u) => u.lastLogin.includes("2024-01-15")).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Bugün giriş yapan</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Kullanıcı Listesi</CardTitle>
          <CardDescription>Tüm sistem kullanıcılarını görüntüleyin ve yönetin</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Kullanıcı ara..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Departman" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Departmanlar</SelectItem>
                <SelectItem value="Kalite Güvence">Kalite Güvence</SelectItem>
                <SelectItem value="Üretim">Üretim</SelectItem>
                <SelectItem value="Laboratuvar">Laboratuvar</SelectItem>
                <SelectItem value="Bilgi İşlem">Bilgi İşlem</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full sm:w-32">
                <SelectValue placeholder="Durum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>İletişim</TableHead>
                  <TableHead>Roller</TableHead>
                  <TableHead>Departman</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Son Giriş</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar || ""} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-foreground">{user.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="w-3 h-3 mr-1" />
                          {user.email}
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Phone className="w-3 h-3 mr-1" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {user.roles.slice(0, 2).map((role, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {role}
                          </Badge>
                        ))}
                        {user.roles.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{user.roles.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{user.department}</span>
                    </TableCell>
                    <TableCell>
                      {user.isActive ? (
                        <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Aktif
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Pasif
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{user.lastLogin}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditUser(user)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Düzenle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleViewPermissions(user.id)}>
                            <UserCheck className="w-4 h-4 mr-2" />
                            Yetkileri Görüntüle
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                            <Key className="w-4 h-4 mr-2" />
                            Şifre Sıfırla
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleToggleUserStatus(user.id)}
                            className={user.isActive ? "text-red-600" : "text-green-600"}
                          >
                            {user.isActive ? (
                              <>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Devre Dışı Bırak
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Aktif Et
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
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
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Kullanıcının adı"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Soyad</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="kullanici@sirket.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+90 5XX XXX XX XX"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department">Departman</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
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
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Kullanıcının pozisyonu"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="isActive">Kullanıcı aktif olsun</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveUser} className="bg-primary hover:bg-primary/90">
              Kullanıcı Ekle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
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
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLastName">Soyad</Label>
                <Input
                  id="editLastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">E-posta</Label>
              <Input
                id="editEmail"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Telefon</Label>
              <Input
                id="editPhone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="editDepartment">Departman</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) => setFormData({ ...formData, department: value })}
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
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="editIsActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <Label htmlFor="editIsActive">Kullanıcı aktif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              İptal
            </Button>
            <Button onClick={handleSaveUser} className="bg-primary hover:bg-primary/90">
              Güncelle
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
