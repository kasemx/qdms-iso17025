"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Building, Users, Plus, Edit, Trash2, Search, UserCheck } from "lucide-react"
import { mockApi } from "@/lib/mock-data"

interface Department {
  id: string
  name: string
  description: string
  managerName: string
  userCount: number
  documentCount: number
  createdAt: string
}

export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    managerId: "",
  })

  const [departments, setDepartments] = useState<Department[]>([])
  const [isLoadingData, setIsLoadingData] = useState(true)

  const fetchDepartments = async () => {
    try {
      setIsLoadingData(true)
      const data = await mockApi.getDepartments()
      setDepartments(data)
    } catch (error) {
      console.error("API hatası:", error)
      alert("Departmanlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.")
    } finally {
      setIsLoadingData(false)
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddDepartment = () => {
    setEditingDepartment(null)
    setFormData({ name: "", description: "", managerId: "" })
    setIsDialogOpen(true)
  }

  const handleEditDepartment = (department: Department) => {
    setEditingDepartment(department)
    setFormData({
      name: department.name,
      description: department.description,
      managerId: "",
    })
    setIsDialogOpen(true)
  }

  const handleSave = async () => {
    try {
      setIsLoading(true)

      const url = editingDepartment ? `/api/departments/${editingDepartment.id}` : "/api/departments"
      const method = editingDepartment ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error("API hatası:", response.status, errorText)
        throw new Error(`API hatası: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setIsDialogOpen(false)
        fetchDepartments() // Listeyi yenile
      } else {
        console.error("Kaydetme hatası:", data.error)
        alert(data.error || "Kaydetme sırasında bir hata oluştu")
      }
    } catch (error) {
      console.error("API hatası:", error)
      alert("Kaydetme sırasında bir hata oluştu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteDepartment = async (departmentId: string) => {
    if (!confirm("Bu departmanı silmek istediğinizden emin misiniz?")) {
      return
    }

    try {
      await mockApi.deleteDepartment(departmentId)
      fetchDepartments() // Listeyi yenile
    } catch (error) {
      console.error("Silme hatası:", error)
      alert("Silme sırasında bir hata oluştu")
    }
  }

  if (isLoadingData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Departman Yönetimi</h1>
            <p className="text-muted-foreground">Yükleniyor...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Departman Yönetimi</h1>
          <p className="text-muted-foreground">Şirket departmanlarını yönetin ve düzenleyin</p>
        </div>
        <Button onClick={handleAddDepartment} className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Yeni Departman
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{departments.length}</p>
                <p className="text-sm text-muted-foreground">Toplam Departman</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{departments.reduce((sum, dept) => sum + dept.userCount, 0)}</p>
                <p className="text-sm text-muted-foreground">Toplam Kullanıcı</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <UserCheck className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{departments.filter((d) => d.managerName !== "Atanmamış").length}</p>
                <p className="text-sm text-muted-foreground">Departman Müdürü</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Building className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">
                  {departments.length > 0
                    ? Math.round(departments.reduce((sum, dept) => sum + dept.userCount, 0) / departments.length)
                    : 0}
                </p>
                <p className="text-sm text-muted-foreground">Ortalama Personel</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Departman ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Departmanlar</CardTitle>
          <CardDescription>Tüm departmanların listesi ve detayları</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Departman Adı</TableHead>
                <TableHead>Açıklama</TableHead>
                <TableHead>Müdür</TableHead>
                <TableHead>Personel</TableHead>
                <TableHead>Doküman</TableHead>
                <TableHead>Oluşturma Tarihi</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDepartments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell className="font-medium">{department.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{department.description}</TableCell>
                  <TableCell>{department.managerName}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{department.userCount}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{department.documentCount}</Badge>
                  </TableCell>
                  <TableCell>{new Date(department.createdAt).toLocaleDateString("tr-TR")}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditDepartment(department)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteDepartment(department.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? "Kaydediliyor..." : editingDepartment ? "Güncelle" : "Ekle"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
